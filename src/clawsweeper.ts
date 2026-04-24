#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type ItemKind = "issue" | "pull_request";
type DecisionKind = "close" | "keep_open";
type CloseReason =
  | "implemented_on_main"
  | "cannot_reproduce"
  | "clawhub"
  | "incoherent"
  | "stale_insufficient_info"
  | "none";
type Confidence = "high" | "medium" | "low";
type ActionTaken =
  | "closed"
  | "kept_open"
  | "proposed_close"
  | "skipped_changed_since_review"
  | "skipped_already_closed";

interface Args {
  _: string[];
  [key: string]: string | boolean | string[];
}

interface GitHubUser {
  login?: string;
}

interface GitHubIssueListItem {
  number: number;
  title: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  user?: GitHubUser;
  labels?: string[];
  pull_request?: unknown;
}

interface Item {
  number: number;
  kind: ItemKind;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  labels: string[];
}

interface ExistingReview {
  path: string;
  markdown: string;
  reviewedAt: string | undefined;
  decision: string | undefined;
  reviewStatus: string | undefined;
  reviewPolicy: string | undefined;
}

interface LatestRelease {
  tagName?: string;
  name?: string;
  publishedAt?: string;
  targetCommitish?: string;
  sha?: string | null;
}

interface GitInfo {
  mainSha: string;
  latestRelease: LatestRelease | null;
}

interface Evidence {
  label: string;
  detail: string;
  file?: string | null;
  line?: number | null;
  command?: string | null;
  sha?: string | null;
}

interface Decision {
  decision: DecisionKind;
  closeReason: CloseReason;
  confidence: Confidence;
  summary: string;
  evidence: Evidence[];
  risks: string[];
  fixedRelease?: string | null;
  fixedSha?: string | null;
  closeComment: string;
}

interface ItemContext {
  issue: unknown;
  comments: unknown[];
  timeline: unknown[];
  pullRequest?: unknown;
  pullFiles?: unknown[];
  pullCommits?: unknown[];
  pullReviewComments?: unknown[];
  counts?: {
    comments: number;
    timeline: number;
    pullFiles?: number;
    pullCommits?: number;
    pullReviewComments?: number;
  };
}

interface Action {
  actionTaken: ActionTaken;
  closeComment: string;
}

interface DashboardItem {
  number: number;
  kind: ItemKind;
  title: string;
  reviewedAt: string | undefined;
  decision: string;
  action: string;
  reviewStatus: string;
}

interface RepoOpenCountsQuery {
  data?: {
    repository?: {
      issues?: {
        totalCount?: number;
      };
      pullRequests?: {
        totalCount?: number;
      };
    };
  };
}

interface OpenItemCounts {
  issues: number;
  pullRequests: number;
  total: number;
}

interface DashboardKindStats {
  fresh: number;
  proposedClose: number;
}

interface PlanShard {
  shard: number;
  itemNumbers: number[];
}

interface ApplyResult {
  number: number;
  action: ActionTaken;
  reason: string;
}

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TARGET_REPO = "openclaw/openclaw";
const REPORT_REPO = "openclaw/clawsweeper";
const FRESH_DAYS = 7;
const DEFAULT_CODEX_MODEL = "gpt-5.4";
const DEFAULT_REASONING_EFFORT = "medium";
const DEFAULT_SERVICE_TIER = "fast";
const REVIEW_POLICY_VERSION = "2026-04-24-policy-v1";
const ALLOWED_REASONS = new Set<CloseReason>([
  "implemented_on_main",
  "cannot_reproduce",
  "clawhub",
  "incoherent",
  "stale_insufficient_info",
]);

function parseArgs(argv: string[]): Args {
  const args: Args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      args._.push(arg);
      continue;
    }
    const key = arg.slice(2).replaceAll("-", "_");
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function stringArg(value: string | boolean | string[] | undefined, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function numberArg(value: string | boolean | string[] | undefined, fallback: number): number {
  if (typeof value !== "string") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function boolArg(value: string | boolean | string[] | undefined): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return false;
  return value === "1" || value === "true" || value === "yes";
}

function run(
  command: string,
  args: string[],
  options: { cwd?: string; env?: NodeJS.ProcessEnv } = {},
): string {
  return execFileSync(command, args, {
    cwd: options.cwd ?? ROOT,
    encoding: "utf8",
    env: { ...process.env, ...options.env },
    maxBuffer: 128 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function gh(args: string[]): string {
  if (args[0] === "api") return run("gh", args);
  return run("gh", ["--repo", TARGET_REPO, ...args]);
}

function ghJson<T>(args: string[]): T {
  const text = gh(args);
  return JSON.parse(text) as T;
}

function ghJsonLines<T>(args: string[]): T[] {
  const text = gh(args);
  if (!text) return [];
  return text
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as T);
}

function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

function stableJson(value: unknown): string {
  return JSON.stringify(sortStable(value));
}

function sortStable(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortStable);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => [key, sortStable(item)]),
  );
}

function itemSnapshotHash(item: Item, context: ItemContext): string {
  return sha256(stableJson({ item, context }));
}

function reviewPolicyHash(options: {
  model?: string;
  reasoningEffort?: string;
  serviceTier?: string;
}): string {
  return sha256(
    stableJson({
      version: REVIEW_POLICY_VERSION,
      freshDays: FRESH_DAYS,
      model: options.model ?? DEFAULT_CODEX_MODEL,
      reasoningEffort: options.reasoningEffort ?? DEFAULT_REASONING_EFFORT,
      serviceTier: options.serviceTier ?? DEFAULT_SERVICE_TIER,
      prompt: readFileSync(join(ROOT, "prompts", "review-item.md"), "utf8"),
      schema: readFileSync(join(ROOT, "schema", "clawsweeper-decision.schema.json"), "utf8"),
    }),
  ).slice(0, 16);
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function truncateText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength)}\n\n[truncated ${value.length - maxLength} chars]`;
}

function login(value: unknown): string | undefined {
  const user = asRecord(value);
  const name = user.login;
  return typeof name === "string" ? name : undefined;
}

function labelNames(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((label) => {
      if (typeof label === "string") return label;
      const name = asRecord(label).name;
      return typeof name === "string" ? name : null;
    })
    .filter((name): name is string => Boolean(name));
}

function compactSlice<T>(items: T[], limit: number): unknown[] {
  if (items.length <= limit) return items as unknown[];
  const keepStart = Math.floor(limit / 2);
  const keepEnd = Math.max(0, limit - keepStart);
  return [
    ...items.slice(0, keepStart),
    { omitted: items.length - limit, note: "middle entries omitted from prompt context" },
    ...items.slice(items.length - keepEnd),
  ];
}

function compactIssue(value: unknown): unknown {
  const issue = asRecord(value);
  return {
    number: issue.number,
    title: issue.title,
    state: issue.state,
    url: issue.html_url,
    author: login(issue.user),
    labels: labelNames(issue.labels),
    createdAt: issue.created_at,
    updatedAt: issue.updated_at,
    closedAt: issue.closed_at,
    body: truncateText(issue.body, 12000),
  };
}

function compactComment(value: unknown): unknown {
  const comment = asRecord(value);
  return {
    id: comment.id,
    author: login(comment.user),
    createdAt: comment.created_at,
    updatedAt: comment.updated_at,
    body: truncateText(comment.body, 6000),
  };
}

function compactTimelineEvent(value: unknown): unknown {
  const event = asRecord(value);
  const sourceIssue = asRecord(asRecord(event.source).issue);
  return {
    id: event.id,
    event: event.event,
    createdAt: event.created_at,
    actor: login(event.actor),
    commitId: event.commit_id,
    label: asRecord(event.label).name,
    rename: event.rename,
    sourceIssue:
      Object.keys(sourceIssue).length > 0
        ? {
            number: sourceIssue.number,
            title: sourceIssue.title,
            url: sourceIssue.html_url,
            state: sourceIssue.state,
          }
        : undefined,
  };
}

function compactPullRequest(value: unknown): unknown {
  const pull = asRecord(value);
  const head = asRecord(pull.head);
  const base = asRecord(pull.base);
  return {
    number: pull.number,
    title: pull.title,
    state: pull.state,
    draft: pull.draft,
    merged: pull.merged,
    mergeable: pull.mergeable,
    author: login(pull.user),
    head: {
      ref: head.ref,
      sha: head.sha,
    },
    base: {
      ref: base.ref,
      sha: base.sha,
    },
    additions: pull.additions,
    deletions: pull.deletions,
    changedFiles: pull.changed_files,
    createdAt: pull.created_at,
    updatedAt: pull.updated_at,
    body: truncateText(pull.body, 12000),
  };
}

function compactPullFile(value: unknown): unknown {
  const file = asRecord(value);
  return {
    filename: file.filename,
    status: file.status,
    additions: file.additions,
    deletions: file.deletions,
    changes: file.changes,
    patch: truncateText(file.patch, 2000),
  };
}

function compactPullCommit(value: unknown): unknown {
  const commit = asRecord(value);
  const commitInfo = asRecord(commit.commit);
  return {
    sha: commit.sha,
    author: login(commit.author),
    message: truncateText(commitInfo.message, 1000),
  };
}

function ghPaged<T>(path: string): T[] {
  const pages = ghJson<unknown[]>(["api", path, "--paginate", "--slurp"]);
  if (!Array.isArray(pages)) return [];
  return pages.flatMap((page) => (Array.isArray(page) ? (page as T[]) : []));
}

function ensureDir(path: string): void {
  mkdirSync(path, { recursive: true });
}

function frontMatterValue(markdown: string, key: string): string | undefined {
  const match = markdown.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return match?.[1]?.trim().replace(/^"|"$/g, "");
}

function replaceFrontMatterValue(markdown: string, key: string, value: string): string {
  const line = `${key}: ${value}`;
  const pattern = new RegExp(`^${key}:\\s*.*$`, "m");
  if (pattern.test(markdown)) return markdown.replace(pattern, line);
  return markdown.replace(/^---\n/, `---\n${line}\n`);
}

function sectionValue(markdown: string, heading: string): string {
  const match = markdown.match(new RegExp(`^## ${heading}\\n\\n([\\s\\S]*?)(?=\\n## |\\n?$)`, "m"));
  return match?.[1]?.trim() ?? "";
}

function replaceSectionValue(markdown: string, heading: string, value: string): string {
  const pattern = new RegExp(`(^## ${heading}\\n\\n)([\\s\\S]*?)(?=\\n## |\\n?$)`, "m");
  if (pattern.test(markdown)) return markdown.replace(pattern, `$1${value.trim()}\n`);
  return `${markdown.trimEnd()}\n\n## ${heading}\n\n${value.trim()}\n`;
}

function existingReview(number: number, itemsDir: string): ExistingReview | null {
  const path = join(itemsDir, `${number}.md`);
  if (!existsSync(path)) return null;
  const markdown = readFileSync(path, "utf8");
  return {
    path,
    markdown,
    reviewedAt: frontMatterValue(markdown, "reviewed_at"),
    decision: frontMatterValue(markdown, "decision"),
    reviewStatus: effectiveReviewStatus(markdown),
    reviewPolicy: frontMatterValue(markdown, "review_policy"),
  };
}

function inferReviewStatus(markdown: string): string {
  return markdown.includes("Codex review failed") ? "failed" : "complete";
}

function hasBlockedLocalCheckoutAccess(markdown: string): boolean {
  return /bwrap: loopback|sandbox wrapper|sandbox startup failed|sandboxed shell failed|local shell (?:access|commands|inspection).*unavailable|local shell .*blocked|local terminal commands were unavailable|could not run local shell/i.test(
    markdown,
  );
}

function hasVerifiedLocalCheckoutAccess(markdown: string): boolean {
  return frontMatterValue(markdown, "local_checkout_access") === "verified";
}

function effectiveReviewStatus(markdown: string): string {
  const status = frontMatterValue(markdown, "review_status") ?? inferReviewStatus(markdown);
  if (status === "complete") {
    if (hasBlockedLocalCheckoutAccess(markdown)) return "stale_local_checkout_blocked";
    if (!hasVerifiedLocalCheckoutAccess(markdown)) return "stale_local_checkout_unverified";
  }
  return status;
}

function isFresh(
  review: { reviewedAt: string | undefined; reviewStatus: string | undefined } | null,
): boolean {
  if (review?.reviewStatus !== "complete") return false;
  if (!review?.reviewedAt) return false;
  const reviewedAt = Date.parse(review.reviewedAt);
  if (!Number.isFinite(reviewedAt)) return false;
  return Date.now() - reviewedAt < FRESH_DAYS * 24 * 60 * 60 * 1000;
}

function fetchOpenItemPage(page: number): Item[] {
  const items = ghJsonLines<GitHubIssueListItem>([
    "api",
    `repos/${TARGET_REPO}/issues?state=open&sort=created&direction=asc&per_page=100&page=${page}`,
    "--jq",
    ".[] | {number,title,html_url,created_at,updated_at,user:{login:.user.login},labels:[.labels[].name],pull_request:(.pull_request // null)}",
  ]);
  return items
    .map((item) => ({
      number: item.number,
      kind: item.pull_request ? ("pull_request" as const) : ("issue" as const),
      title: item.title,
      url: item.html_url,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      author: item.user?.login ?? "unknown",
      labels: item.labels ?? [],
    }))
    .sort((a, b) => a.number - b.number);
}

function fetchItem(number: number): { item: Item; state: string } {
  const issue = ghJson<GitHubIssueListItem & { state?: string }>([
    "api",
    `repos/${TARGET_REPO}/issues/${number}`,
    "--jq",
    "{number,title,html_url,created_at,updated_at,state,user:{login:.user.login},labels:[.labels[].name],pull_request:(.pull_request // null)}",
  ]);
  return {
    item: {
      number: issue.number,
      kind: issue.pull_request ? "pull_request" : "issue",
      title: issue.title,
      url: issue.html_url,
      createdAt: issue.created_at,
      updatedAt: issue.updated_at,
      author: issue.user?.login ?? "unknown",
      labels: issue.labels ?? [],
    },
    state: issue.state ?? "unknown",
  };
}

function fetchOpenItemCounts(): OpenItemCounts {
  const [owner, name] = TARGET_REPO.split("/");
  if (!owner || !name) throw new Error(`Invalid target repo: ${TARGET_REPO}`);
  const result = ghJson<RepoOpenCountsQuery>([
    "api",
    "graphql",
    "-f",
    `query=query { repository(owner: "${owner}", name: "${name}") { issues(states: OPEN) { totalCount } pullRequests(states: OPEN) { totalCount } } }`,
  ]);
  const repository = result.data?.repository;
  const issues = repository?.issues?.totalCount ?? 0;
  const pullRequests = repository?.pullRequests?.totalCount ?? 0;
  return {
    issues,
    pullRequests,
    total: issues + pullRequests,
  };
}

function emptyDashboardKindStats(): DashboardKindStats {
  return {
    fresh: 0,
    proposedClose: 0,
  };
}

function formatPercent(numerator: number, denominator: number): string {
  if (denominator <= 0) return "-";
  return `${((numerator / denominator) * 100).toFixed(1).replace(/\.0$/, "")}%`;
}

function selectCandidates(options: {
  batchSize: number;
  maxPages: number;
  shardIndex: number;
  shardCount: number;
  itemsDir: string;
  itemNumber?: number;
  itemNumbers?: number[];
  reviewPolicy?: string;
}): { candidates: Item[]; scannedPages: number } {
  if (options.itemNumbers) {
    const candidates = options.itemNumbers.flatMap((number) => {
      const { item, state } = fetchItem(number);
      return state === "open" ? [item] : [];
    });
    return { candidates, scannedPages: 0 };
  }
  if (options.itemNumber) {
    if (options.shardIndex !== 0) return { candidates: [], scannedPages: 0 };
    const { item, state } = fetchItem(options.itemNumber);
    if (state !== "open") return { candidates: [], scannedPages: 0 };
    return { candidates: [item], scannedPages: 0 };
  }
  const candidates: Item[] = [];
  let scannedPages = 0;
  for (let page = 1; page <= options.maxPages && candidates.length < options.batchSize; page += 1) {
    const items = fetchOpenItemPage(page);
    scannedPages = page;
    if (items.length === 0) break;
    for (const item of items) {
      if (item.number % options.shardCount !== options.shardIndex) continue;
      if (isFresh(existingReview(item.number, options.itemsDir))) continue;
      candidates.push(item);
      if (candidates.length >= options.batchSize) break;
    }
  }
  return { candidates, scannedPages };
}

function planCandidates(options: {
  batchSize: number;
  maxPages: number;
  shardCount: number;
  itemsDir: string;
  itemNumber?: number;
  reviewPolicy: string;
}): { shards: PlanShard[]; scannedPages: number; candidates: Item[] } {
  if (options.itemNumber) {
    const { item, state } = fetchItem(options.itemNumber);
    return {
      shards: [{ shard: 0, itemNumbers: state === "open" ? [item.number] : [] }],
      scannedPages: 0,
      candidates: state === "open" ? [item] : [],
    };
  }

  const candidates: Item[] = [];
  let scannedPages = 0;
  const limit = Math.max(1, options.batchSize) * Math.max(1, options.shardCount);
  for (let page = 1; page <= options.maxPages && candidates.length < limit; page += 1) {
    const items = fetchOpenItemPage(page);
    scannedPages = page;
    if (items.length === 0) break;
    for (const item of items) {
      if (isFresh(existingReview(item.number, options.itemsDir))) continue;
      candidates.push(item);
      if (candidates.length >= limit) break;
    }
  }

  const shards = Array.from(
    { length: Math.max(1, Math.min(options.shardCount, candidates.length || 1)) },
    (_, shard) => ({ shard, itemNumbers: [] as number[] }),
  );
  candidates.forEach((item, index) => {
    shards[index % shards.length]?.itemNumbers.push(item.number);
  });
  return { shards, scannedPages, candidates };
}

function collectItemContext(item: Item): ItemContext {
  const issue = ghJson<unknown>(["api", `repos/${TARGET_REPO}/issues/${item.number}`]);
  const comments = ghPaged<unknown>(`repos/${TARGET_REPO}/issues/${item.number}/comments`);
  const timeline = ghPaged<unknown>(`repos/${TARGET_REPO}/issues/${item.number}/timeline`);
  const context: ItemContext = {
    issue: compactIssue(issue),
    comments: compactSlice(comments.map(compactComment), 24),
    timeline: compactSlice(timeline.map(compactTimelineEvent), 80),
    counts: {
      comments: comments.length,
      timeline: timeline.length,
    },
  };
  if (item.kind === "pull_request") {
    const pullRequest = ghJson<unknown>(["api", `repos/${TARGET_REPO}/pulls/${item.number}`]);
    const pullFiles = ghPaged<unknown>(`repos/${TARGET_REPO}/pulls/${item.number}/files`);
    const pullCommits = ghPaged<unknown>(`repos/${TARGET_REPO}/pulls/${item.number}/commits`);
    const pullReviewComments = ghPaged<unknown>(
      `repos/${TARGET_REPO}/pulls/${item.number}/comments`,
    );
    context.pullRequest = compactPullRequest(pullRequest);
    context.pullFiles = compactSlice(pullFiles.map(compactPullFile), 80);
    context.pullCommits = compactSlice(pullCommits.map(compactPullCommit), 80);
    context.pullReviewComments = compactSlice(pullReviewComments.map(compactComment), 40);
    context.counts = {
      ...context.counts,
      comments: comments.length,
      timeline: timeline.length,
      pullFiles: pullFiles.length,
      pullCommits: pullCommits.length,
      pullReviewComments: pullReviewComments.length,
    };
  }
  return context;
}

function gitInfo(openclawDir: string): GitInfo {
  run("git", ["fetch", "origin", "main", "--depth=50"], { cwd: openclawDir });
  const mainSha = run("git", ["rev-parse", "origin/main"], { cwd: openclawDir });
  let latestRelease: LatestRelease | null = null;
  try {
    latestRelease = ghJson<LatestRelease>([
      "release",
      "view",
      "--json",
      "tagName,name,publishedAt,targetCommitish",
    ]);
  } catch {
    latestRelease = null;
  }
  if (latestRelease?.tagName) {
    try {
      run("git", ["fetch", "--force", "origin", "tag", latestRelease.tagName, "--depth=1"], {
        cwd: openclawDir,
      });
      latestRelease.sha = run("git", ["rev-list", "-n", "1", latestRelease.tagName], {
        cwd: openclawDir,
      });
    } catch {
      latestRelease.sha = null;
    }
  }
  return { mainSha, latestRelease };
}

function promptFor(item: Item, context: ItemContext, git: GitInfo): string {
  const prompt = readFileSync(join(ROOT, "prompts", "review-item.md"), "utf8");
  return `${prompt}

## Repository State

- Target repo: ${TARGET_REPO}
- Item: #${item.number}
- Type: ${item.kind}
- Title: ${item.title}
- URL: ${item.url}
- Created at: ${item.createdAt}
- Updated at: ${item.updatedAt}
- Current main SHA: ${git.mainSha}
- Latest release: ${git.latestRelease?.tagName ?? "unknown"} (${git.latestRelease?.sha ?? "unknown sha"})

## GitHub Context

\`\`\`json
${JSON.stringify(context, null, 2)}
\`\`\`
`;
}

function trimMiddle(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const edge = Math.floor((maxLength - 120) / 2);
  return `${text.slice(0, edge)}\n\n... truncated ${text.length - edge * 2} chars ...\n\n${text.slice(-edge)}`;
}

function codexFailureReason(detail: string): string {
  if (detail.includes("Codex dirtied the OpenClaw checkout")) return "dirty checkout";
  if (detail.includes("did not produce output")) return "missing structured output";
  if (detail.includes("invalid JSON")) return "invalid structured output";
  if (detail.includes("ENOBUFS") || detail.includes("maxBuffer")) return "output buffer overflow";
  if (detail.includes("timed out") || detail.includes("ETIMEDOUT")) return "timeout";
  return "codex execution failed";
}

function codexFailureDecision(status: number | null, stderr: string, stdout = ""): Decision {
  const detail = stderr || "No stderr.";
  const reason = codexFailureReason(detail);
  return {
    decision: "keep_open",
    closeReason: "none",
    confidence: "low",
    summary: `Codex review failed: ${reason}${status === null ? "" : ` (exit ${status})`}.`,
    evidence: [
      { label: "failure reason", detail: reason },
      { label: "codex failure detail", detail: trimMiddle(detail, 4000) },
      { label: "codex stdout", detail: trimMiddle(stdout || "No stdout.", 2000) },
    ],
    risks: ["No close action taken because the review did not complete."],
    fixedRelease: null,
    fixedSha: null,
    closeComment: "",
  };
}

function codexEnv(): NodeJS.ProcessEnv {
  const env = { ...process.env };
  delete env.GH_TOKEN;
  delete env.GITHUB_TOKEN;
  delete env.OPENCLAW_GH_TOKEN;
  env.GIT_OPTIONAL_LOCKS = "0";
  return env;
}

function openclawDirtyStatus(openclawDir: string): string {
  return run("git", ["status", "--porcelain=v1", "--untracked-files=all"], {
    cwd: openclawDir,
    env: { GIT_OPTIONAL_LOCKS: "0" },
  });
}

function makeTreeReadOnly(path: string): void {
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const child = join(path, entry.name);
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) makeTreeReadOnly(child);
    else chmodSync(child, statSync(child).mode & 0o111 ? 0o555 : 0o444);
  }
  chmodSync(path, 0o555);
}

function runCodex(options: {
  item: Item;
  context: ItemContext;
  git: GitInfo;
  model: string;
  openclawDir: string;
  reasoningEffort: string;
  serviceTier: string;
  timeoutMs: number;
  workDir: string;
}): Decision {
  ensureDir(options.workDir);
  const promptPath = join(options.workDir, `${options.item.number}.prompt.md`);
  const outputPath = join(options.workDir, `${options.item.number}.json`);
  writeFileSync(promptPath, promptFor(options.item, options.context, options.git), "utf8");
  const dirtyBefore = openclawDirtyStatus(options.openclawDir);
  if (dirtyBefore) {
    throw new Error(
      `OpenClaw checkout is dirty before reviewing #${options.item.number}:\n${dirtyBefore}`,
    );
  }
  const result = spawnSync(
    "codex",
    [
      "exec",
      "-m",
      options.model,
      "-c",
      `model_reasoning_effort="${options.reasoningEffort}"`,
      "-c",
      `service_tier="${options.serviceTier}"`,
      "-c",
      'forced_login_method="api"',
      "-c",
      'approval_policy="never"',
      "--sandbox",
      "danger-full-access",
      "-C",
      options.openclawDir,
      "--output-schema",
      join(ROOT, "schema", "clawsweeper-decision.schema.json"),
      "--output-last-message",
      outputPath,
      "-",
    ],
    {
      cwd: options.openclawDir,
      encoding: "utf8",
      env: codexEnv(),
      input: readFileSync(promptPath, "utf8"),
      maxBuffer: 128 * 1024 * 1024,
      timeout: options.timeoutMs,
    },
  );
  const dirtyAfter = openclawDirtyStatus(options.openclawDir);
  if (dirtyAfter) {
    throw new Error(
      `Codex dirtied the OpenClaw checkout while reviewing #${options.item.number}:\n${dirtyAfter}`,
    );
  }
  if (result.error) {
    throw new Error(
      `Codex review failed for #${options.item.number}: ${result.error.message}\n${
        result.stderr.slice(-6000) || result.stdout.slice(-6000) || "No output."
      }`,
    );
  }
  if (result.status !== 0) {
    throw new Error(
      `Codex review failed for #${options.item.number} with exit ${
        result.status ?? "unknown"
      }.\n${result.stderr.slice(-6000) || result.stdout.slice(-6000) || "No output."}`,
    );
  }
  if (!existsSync(outputPath)) {
    const decision = codexFailureDecision(
      result.status,
      `Codex exited successfully but did not write ${outputPath}.`,
      result.stdout,
    );
    throw new Error(
      `Codex review did not produce output for #${options.item.number}: ${decision.evidence
        .map((entry) => entry.detail)
        .join("\n")}`,
    );
  }
  try {
    return JSON.parse(readFileSync(outputPath, "utf8").trim()) as Decision;
  } catch (error) {
    const decision = codexFailureDecision(
      result.status,
      `Codex wrote invalid JSON to ${outputPath}: ${error instanceof Error ? error.message : String(error)}`,
      result.stdout,
    );
    throw new Error(
      `Codex review wrote invalid JSON for #${options.item.number}: ${decision.evidence
        .map((entry) => entry.detail)
        .join("\n")}`,
    );
  }
}

function closeReasonText(reason: CloseReason): string {
  switch (reason) {
    case "implemented_on_main":
      return "already implemented on main";
    case "cannot_reproduce":
      return "cannot reproduce on current main";
    case "clawhub":
      return "belongs on ClawHub";
    case "incoherent":
      return "not actionable";
    case "stale_insufficient_info":
      return "stale with insufficient information";
    case "none":
      return "kept open";
  }
}

function repoUrl(path = ""): string {
  return `https://github.com/${TARGET_REPO}${path}`;
}

function reportUrl(path = ""): string {
  return `https://github.com/${REPORT_REPO}${path}`;
}

function commitUrl(sha: string): string {
  return repoUrl(`/commit/${sha}`);
}

function shortSha(sha: string): string {
  return sha.slice(0, 12);
}

function releaseUrl(tag: string): string {
  return repoUrl(`/releases/tag/${encodeURIComponent(tag)}`);
}

function itemUrl(number: number, kind: ItemKind = "issue"): string {
  return repoUrl(`/${kind === "pull_request" ? "pull" : "issues"}/${number}`);
}

function reportFileUrl(number: number): string {
  return reportUrl(`/blob/main/items/${number}.md`);
}

function githubPath(path: string): string {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function splitFileAndLine(
  file: string,
  explicitLine?: number | null,
): { file: string; line?: number } {
  const match = file.match(/^(.*?):(\d+)$/);
  if (match?.[1] && match[2]) return { file: match[1], line: Number(match[2]) };
  if (explicitLine) return { file, line: explicitLine };
  return { file };
}

function fileUrl(file: string, sha: string, line?: number): string {
  return repoUrl(`/blob/${sha}/${githubPath(file)}${line ? `#L${line}` : ""}`);
}

function markdownLink(label: string, url: string): string {
  return `[${label.replaceAll("|", "\\|")}](${url})`;
}

function linkedSha(sha: string): string {
  return markdownLink(shortSha(sha), commitUrl(sha));
}

function linkedRelease(tag: string): string {
  return markdownLink(tag, releaseUrl(tag));
}

function formatTimestamp(iso: string | undefined): string {
  if (!iso) return "unknown";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(date);
}

function displayTitle(title: string): string {
  try {
    const parsed = JSON.parse(title) as unknown;
    if (typeof parsed === "string") return parsed;
  } catch {
    // Front matter from older files may be a plain string.
  }
  return title.replace(/^"|"$/g, "");
}

function fixedInText(decision: Decision): string {
  const parts: string[] = [];
  if (decision.fixedRelease) parts.push(`release ${linkedRelease(decision.fixedRelease)}`);
  if (decision.fixedSha) parts.push(`commit ${linkedSha(decision.fixedSha)}`);
  return parts.length ? parts.join(", ") : "not determined";
}

function fixedInReportText(markdown: string): string {
  const parts: string[] = [];
  const fixedRelease = frontMatterValue(markdown, "fixed_release");
  const fixedSha = frontMatterValue(markdown, "fixed_sha");
  if (fixedRelease && fixedRelease !== "unknown")
    parts.push(`release ${linkedRelease(fixedRelease)}`);
  if (fixedSha && fixedSha !== "unknown") parts.push(`commit ${linkedSha(fixedSha)}`);
  return parts.length ? parts.join(", ") : "not determined";
}

function sentence(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /[.!?)]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function isLinkableSourceRef(file: string): boolean {
  if (file.includes("/")) return true;
  return ["AGENTS.md", "CHANGELOG.md", "README.md", "VISION.md"].includes(file);
}

function linkInlineSourceRefs(value: string, sha?: string | null): string {
  if (!sha) return value;
  return value.replace(
    /`([^`]+\.(?:css|js|json|jsx|md|mdx|mjs|sh|ts|tsx|yaml|yml)(?::\d+)?)`/g,
    (match, ref: string) => {
      const { file, line } = splitFileAndLine(ref);
      if (!isLinkableSourceRef(file)) return match;
      return markdownLink(`\`${ref}\``, fileUrl(file, sha, line));
    },
  );
}

function linkPrimaryEvidenceFile(value: string, evidence: Evidence): string {
  if (evidence.file !== "VISION.md" || !evidence.sha || value.includes("VISION.md")) return value;
  const link = markdownLink(
    "`VISION.md`",
    fileUrl(evidence.file, evidence.sha, evidence.line ?? undefined),
  );
  const linked = value
    .replace(/\b(?:the project vision|project vision|the vision|VISION)\b/i, link)
    .replace(/^Current main says\b/, `${link} says`)
    .replace(/^The roadmap guardrails explicitly list\b/, `${link} guardrails explicitly list`);
  return linked === value ? `${link}: ${value}` : linked;
}

function evidenceLocation(evidence: Evidence): string {
  const parts: string[] = [];
  if (evidence.file) {
    const location = evidence.line ? `${evidence.file}:${evidence.line}` : evidence.file;
    parts.push(
      evidence.sha
        ? markdownLink(
            `\`${location}\``,
            fileUrl(evidence.file, evidence.sha, evidence.line ?? undefined),
          )
        : `\`${location}\``,
    );
  }
  if (evidence.sha) parts.push(linkedSha(evidence.sha));
  return parts.length ? ` (${parts.join(", ")})` : "";
}

function closeEvidenceLine(evidence: Evidence): string {
  const label = evidence.label.trim();
  const detail = linkPrimaryEvidenceFile(
    linkInlineSourceRefs(sentence(evidence.detail), evidence.sha),
    evidence,
  );
  const prefix = label ? `**${label}:** ` : "";
  return `- ${prefix}${detail}${evidenceLocation(evidence)}`;
}

function closeIntro(reason: CloseReason): string {
  switch (reason) {
    case "implemented_on_main":
      return "Closing this as implemented after Codex review.";
    case "cannot_reproduce":
      return "Closing this as not reproducible on current `main` after Codex review.";
    case "clawhub":
      return "Closing this as better suited for ClawHub/community plugin work after Codex review.";
    case "incoherent":
      return "Closing this as not actionable after Codex review.";
    case "stale_insufficient_info":
      return "Closing this as stale with insufficient information after Codex review.";
    case "none":
      return "Closing this after Codex review.";
  }
}

function closeOutro(reason: CloseReason): string {
  switch (reason) {
    case "implemented_on_main":
      return "So I’m closing this as already implemented rather than keeping a duplicate issue open.";
    case "clawhub":
      return "So I’m closing this as a scope-fit item for the plugin/community path rather than keeping it open as an OpenClaw core request.";
    default:
      return "";
  }
}

function reportEvidence(markdown: string): Evidence[] {
  const evidence = sectionValue(markdown, "Evidence");
  const entries: Evidence[] = [];
  let current: Evidence | null = null;
  for (const line of evidence.split("\n")) {
    const heading = line.match(/^- \*\*(.*?):\*\*\s*(.*)$/);
    if (heading) {
      if (current) entries.push(current);
      current = {
        label: heading[1] ?? "",
        detail: heading[2] ?? "",
      };
      continue;
    }
    if (!current) continue;
    const file = line.match(/^\s+- file: \[([^\]]+)\]/);
    if (file?.[1]) {
      const location = splitFileAndLine(file[1]);
      current.file = location.file;
      current.line = location.line ?? null;
      continue;
    }
    const sha = line.match(/^\s+- sha: \[([^\]]+)\]/);
    if (sha?.[1]) current.sha = sha[1];
  }
  if (current) entries.push(current);
  return entries;
}

function closeReviewLineFromDecision(decision: Decision, git: GitInfo): string {
  const fixed = fixedInText(decision);
  const parts = [`reviewed against ${linkedSha(git.mainSha)}`];
  if (fixed !== "not determined") parts.push(`fix evidence: ${fixed}`);
  return `Review notes: ${parts.join("; ")}.`;
}

function closeReviewLineFromReport(markdown: string): string {
  const mainSha = frontMatterValue(markdown, "main_sha");
  const fixed = fixedInReportText(markdown);
  const parts: string[] = [];
  if (mainSha && mainSha !== "unknown") parts.push(`reviewed against ${linkedSha(mainSha)}`);
  if (fixed !== "not determined") parts.push(`fix evidence: ${fixed}`);
  return parts.length ? `Review notes: ${parts.join("; ")}.` : "";
}

function renderCloseComment(options: {
  reason: CloseReason;
  summary: string;
  evidence: Evidence[];
  reviewLine: string;
}): string {
  const evidence = options.evidence.slice(0, 6).map(closeEvidenceLine);
  return [
    closeIntro(options.reason),
    "",
    sentence(options.summary),
    "",
    evidence.length ? "What I checked:" : "",
    ...evidence,
    "",
    closeOutro(options.reason),
    "",
    options.reviewLine,
  ]
    .filter(Boolean)
    .join("\n");
}

function renderCloseCommentFromReport(markdown: string, reason: CloseReason): string {
  return renderCloseComment({
    reason,
    summary: sectionValue(markdown, "Summary"),
    evidence: reportEvidence(markdown),
    reviewLine: closeReviewLineFromReport(markdown),
  });
}

function normalizeComment(decision: Decision, git: GitInfo): string {
  return renderCloseComment({
    reason: decision.closeReason,
    summary: decision.summary,
    evidence: decision.evidence,
    reviewLine: closeReviewLineFromDecision(decision, git),
  });
}

function canClose(decision: Decision): boolean {
  return (
    decision.decision === "close" &&
    decision.confidence === "high" &&
    ALLOWED_REASONS.has(decision.closeReason)
  );
}

function issueMatchingComment(number: number, body: string): Record<string, unknown> | undefined {
  const comment = ghPaged<unknown>(`repos/${TARGET_REPO}/issues/${number}/comments`).find(
    (candidate) => asRecord(candidate).body === body,
  );
  return comment ? asRecord(comment) : undefined;
}

function issueCommentExists(number: number, body: string): boolean {
  return Boolean(issueMatchingComment(number, body));
}

function commentUpdatedAt(comment: Record<string, unknown> | undefined): string | undefined {
  const updatedAt = comment?.updated_at;
  if (typeof updatedAt === "string") return updatedAt;
  const createdAt = comment?.created_at;
  return typeof createdAt === "string" ? createdAt : undefined;
}

function postClose(options: {
  number: number;
  kind: ItemKind;
  reason: CloseReason;
  closeComment: string;
}): void {
  const commentFile = join(ROOT, ".artifacts", `comment-${options.number}.md`);
  ensureDir(dirname(commentFile));
  writeFileSync(commentFile, options.closeComment, "utf8");
  if (!issueCommentExists(options.number, options.closeComment)) {
    gh(["issue", "comment", String(options.number), "-F", commentFile]);
  }
  if (options.kind === "pull_request") {
    gh(["pr", "close", String(options.number)]);
  } else {
    const reason = options.reason === "implemented_on_main" ? "completed" : "not planned";
    gh(["issue", "close", String(options.number), "--reason", reason]);
  }
}

function maybeApplyClose(options: {
  item: Item;
  decision: Decision;
  git: GitInfo;
  applyClosures: boolean;
}): Action {
  if (!canClose(options.decision)) return { actionTaken: "kept_open", closeComment: "" };
  const closeComment = normalizeComment(options.decision, options.git);
  if (!options.applyClosures) return { actionTaken: "proposed_close", closeComment };
  postClose({
    number: options.item.number,
    kind: options.item.kind,
    reason: options.decision.closeReason,
    closeComment,
  });
  return { actionTaken: "closed", closeComment };
}

function markdownFor(options: {
  item: Item;
  context: ItemContext;
  decision: Decision;
  git: GitInfo;
  action: Action;
  reviewMode: "propose" | "apply";
  snapshotHash: string;
  reviewPolicy: string;
}): string {
  const labels = options.item.labels.length ? options.item.labels.join(", ") : "none";
  const evidence = options.decision.evidence.length
    ? options.decision.evidence
        .map((entry) => {
          const bits = [`- **${entry.label}:** ${entry.detail}`];
          if (entry.file) {
            const parsed = splitFileAndLine(entry.file, entry.line);
            const label = `${parsed.file}${parsed.line ? `:${parsed.line}` : ""}`;
            bits.push(
              `  - file: ${markdownLink(label, fileUrl(parsed.file, entry.sha ?? options.git.mainSha, parsed.line))}`,
            );
          }
          if (entry.command) bits.push(`  - command: \`${entry.command}\``);
          if (entry.sha) bits.push(`  - sha: ${linkedSha(entry.sha)}`);
          return bits.join("\n");
        })
        .join("\n")
    : "- none";
  const risks = options.decision.risks.length
    ? options.decision.risks.map((risk) => `- ${risk}`).join("\n")
    : "- none";
  return `---
number: ${options.item.number}
type: ${options.item.kind}
title: ${JSON.stringify(options.item.title)}
url: ${options.item.url}
state_at_review: open
item_created_at: ${options.item.createdAt}
item_updated_at: ${options.item.updatedAt}
author: ${options.item.author}
labels: ${JSON.stringify(options.item.labels)}
reviewed_at: ${new Date().toISOString()}
main_sha: ${options.git.mainSha}
latest_release: ${options.git.latestRelease?.tagName ?? "unknown"}
latest_release_sha: ${options.git.latestRelease?.sha ?? "unknown"}
fixed_release: ${options.decision.fixedRelease ?? "unknown"}
fixed_sha: ${options.decision.fixedSha ?? "unknown"}
review_policy: ${options.reviewPolicy}
review_mode: ${options.reviewMode}
review_status: ${options.decision.summary.startsWith("Codex review failed") ? "failed" : "complete"}
local_checkout_access: verified
item_snapshot_hash: ${options.snapshotHash}
close_comment_sha256: ${options.action.closeComment ? sha256(options.action.closeComment) : "none"}
decision: ${options.decision.decision}
close_reason: ${options.decision.closeReason}
confidence: ${options.decision.confidence}
action_taken: ${options.action.actionTaken}
---

# ${markdownLink(`#${options.item.number}: ${options.item.title}`, options.item.url)}

Type: ${options.item.kind}

URL: ${markdownLink(options.item.url, options.item.url)}

Author: ${options.item.author}

Labels: ${labels}

Created at: ${formatTimestamp(options.item.createdAt)}

Updated at: ${formatTimestamp(options.item.updatedAt)}

Reviewed against: ${linkedSha(options.git.mainSha)}

Latest release at review time: ${
    options.git.latestRelease?.tagName
      ? linkedRelease(options.git.latestRelease.tagName)
      : "unknown"
  }${options.git.latestRelease?.sha ? ` (${linkedSha(options.git.latestRelease.sha)})` : ""}

Fixed in: ${fixedInText(options.decision)}

## Decision

${options.decision.decision === "close" ? "Close" : "Keep open"}: ${closeReasonText(options.decision.closeReason)}

Confidence: ${options.decision.confidence}

Action taken: ${options.action.actionTaken}

## Summary

${options.decision.summary}

## Evidence

${evidence}

## Risks / Open Questions

${risks}

## Close Comment

${options.action.closeComment ? options.action.closeComment : "_No close comment posted._"}

## GitHub Snapshot

- comments: ${options.context.counts?.comments ?? options.context.comments.length}
- timeline events: ${options.context.counts?.timeline ?? options.context.timeline.length}
- PR files: ${options.context.counts?.pullFiles ?? options.context.pullFiles?.length ?? 0}
- PR commits: ${options.context.counts?.pullCommits ?? options.context.pullCommits?.length ?? 0}
  `;
}

function planCommand(args: Args): void {
  const itemsDir = resolve(stringArg(args.items_dir, join(ROOT, "items")));
  const batchSize = numberArg(args.batch_size, 5);
  const maxPages = numberArg(args.max_pages, 250);
  const shardCount = numberArg(args.shard_count, 40);
  const itemNumber = numberArg(args.item_number, 0) || undefined;
  const model = stringArg(args.codex_model, DEFAULT_CODEX_MODEL);
  const reasoningEffort = stringArg(args.codex_reasoning_effort, DEFAULT_REASONING_EFFORT);
  const serviceTier = stringArg(args.codex_service_tier, DEFAULT_SERVICE_TIER);
  const reviewPolicy = reviewPolicyHash({ model, reasoningEffort, serviceTier });
  const planOptions: Parameters<typeof planCandidates>[0] = {
    batchSize,
    maxPages,
    shardCount,
    itemsDir,
    reviewPolicy,
  };
  if (itemNumber) planOptions.itemNumber = itemNumber;
  const plan = planCandidates(planOptions);
  console.log(
    JSON.stringify(
      {
        ...plan,
        reviewPolicy,
        matrix: plan.shards.map((shard) => ({
          shard: shard.shard,
          item_numbers: shard.itemNumbers.join(",") || "none",
        })),
      },
      null,
      2,
    ),
  );
}

function reviewCommand(args: Args): void {
  const openclawDir = resolve(stringArg(args.openclaw_dir, "../openclaw"));
  const artifactDir = resolve(stringArg(args.artifact_dir, "artifacts/reviews"));
  const itemsDir = resolve(stringArg(args.items_dir, join(ROOT, "items")));
  const batchSize = numberArg(args.batch_size, 5);
  const maxPages = numberArg(args.max_pages, 250);
  const model = stringArg(args.codex_model, DEFAULT_CODEX_MODEL);
  const reasoningEffort = stringArg(args.codex_reasoning_effort, DEFAULT_REASONING_EFFORT);
  const serviceTier = stringArg(args.codex_service_tier, DEFAULT_SERVICE_TIER);
  const timeoutMs = numberArg(args.codex_timeout_ms, 600_000);
  const shardIndex = numberArg(args.shard_index, 0);
  const shardCount = numberArg(args.shard_count, 1);
  const itemNumber = numberArg(args.item_number, 0) || undefined;
  const itemNumbers =
    typeof args.item_numbers === "string" && args.item_numbers.trim()
      ? args.item_numbers
          .split(",")
          .map((value) => Number(value.trim()))
          .filter((value) => Number.isInteger(value) && value > 0)
      : undefined;
  const readonlyOpenclaw = boolArg(args.readonly_openclaw);
  const applyClosures =
    boolArg(args.apply_closures) || process.env.CLAWSWEEPER_APPLY_CLOSURES === "true";
  ensureDir(artifactDir);
  const git = gitInfo(openclawDir);
  const reviewPolicy = reviewPolicyHash({ model, reasoningEffort, serviceTier });
  if (readonlyOpenclaw) makeTreeReadOnly(openclawDir);
  const selectionOptions: Parameters<typeof selectCandidates>[0] = {
    batchSize,
    maxPages,
    shardIndex,
    shardCount,
    itemsDir,
    reviewPolicy,
  };
  if (itemNumber) selectionOptions.itemNumber = itemNumber;
  if (itemNumbers) selectionOptions.itemNumbers = itemNumbers;
  const { candidates, scannedPages } = selectCandidates(selectionOptions);
  writeFileSync(
    join(artifactDir, "selection.json"),
    JSON.stringify({ shardIndex, shardCount, scannedPages, candidates, reviewPolicy }, null, 2),
  );
  for (const item of candidates) {
    const context = collectItemContext(item);
    const snapshotHash = itemSnapshotHash(item, context);
    let decision: Decision;
    try {
      decision = runCodex({
        item,
        context,
        git,
        model,
        openclawDir,
        reasoningEffort,
        serviceTier,
        timeoutMs,
        workDir: join(artifactDir, "codex"),
      });
    } catch (error) {
      decision = codexFailureDecision(
        null,
        error instanceof Error ? error.message : String(error),
        "Per-item Codex failure; continuing with the rest of the shard.",
      );
    }
    const action = maybeApplyClose({ item, decision, git, applyClosures });
    writeFileSync(
      join(artifactDir, `${item.number}.md`),
      markdownFor({
        item,
        context,
        decision,
        git,
        action,
        reviewMode: applyClosures ? "apply" : "propose",
        snapshotHash,
        reviewPolicy,
      }),
      "utf8",
    );
  }
}

function applyDecisionsCommand(args: Args): void {
  const itemsDir = resolve(stringArg(args.items_dir, join(ROOT, "items")));
  const closedDir = resolve(stringArg(args.closed_dir, join(ROOT, "closed")));
  const limit = numberArg(args.limit, 20);
  const results: ApplyResult[] = [];
  let closedCount = 0;
  if (!existsSync(itemsDir)) {
    console.log("No items directory.");
    return;
  }
  const files = readdirSync(itemsDir)
    .filter((name) => /^\d+\.md$/.test(name))
    .sort((left, right) => Number(left.replace(".md", "")) - Number(right.replace(".md", "")));
  for (const file of files) {
    const path = join(itemsDir, file);
    let markdown = readFileSync(path, "utf8");
    const number = Number(file.replace(/\.md$/, ""));
    const decision = frontMatterValue(markdown, "decision");
    const confidence = frontMatterValue(markdown, "confidence");
    const closeReason = frontMatterValue(markdown, "close_reason") as CloseReason | undefined;
    const action = frontMatterValue(markdown, "action_taken");
    const storedHash = frontMatterValue(markdown, "item_snapshot_hash");
    const storedUpdatedAt = frontMatterValue(markdown, "item_updated_at");
    const archiveClosed = (nextMarkdown: string): void => {
      ensureDir(closedDir);
      writeFileSync(path, nextMarkdown, "utf8");
      renameSync(path, join(closedDir, file));
    };
    if (!hasVerifiedLocalCheckoutAccess(markdown)) {
      results.push({
        number,
        action: "kept_open",
        reason: "review lacks verified local checkout access",
      });
      continue;
    }
    if (
      decision !== "close" ||
      confidence !== "high" ||
      !closeReason ||
      !ALLOWED_REASONS.has(closeReason) ||
      !storedHash ||
      (action !== "proposed_close" && action !== "skipped_changed_since_review")
    ) {
      continue;
    }
    const closeComment = renderCloseCommentFromReport(markdown, closeReason);
    if (!closeComment || closeComment === "_No close comment posted._") {
      results.push({ number, action: "kept_open", reason: "missing close comment" });
      continue;
    }
    const { item, state } = fetchItem(number);
    const existingCloseComment = issueMatchingComment(number, closeComment);
    const closeCommentOnlyUpdate = item.updatedAt === commentUpdatedAt(existingCloseComment);
    if (state !== "open") {
      markdown = replaceFrontMatterValue(markdown, "action_taken", "skipped_already_closed");
      markdown = replaceFrontMatterValue(markdown, "apply_checked_at", new Date().toISOString());
      archiveClosed(markdown);
      results.push({ number, action: "skipped_already_closed", reason: `state is ${state}` });
      continue;
    }
    if (closedCount >= limit) break;
    if (storedUpdatedAt && item.updatedAt !== storedUpdatedAt && !closeCommentOnlyUpdate) {
      markdown = replaceFrontMatterValue(markdown, "action_taken", "skipped_changed_since_review");
      markdown = replaceFrontMatterValue(markdown, "current_item_updated_at", item.updatedAt);
      markdown = replaceFrontMatterValue(markdown, "apply_checked_at", new Date().toISOString());
      writeFileSync(path, markdown, "utf8");
      results.push({
        number,
        action: "skipped_changed_since_review",
        reason: "updated_at changed",
      });
      continue;
    }
    const currentContext = collectItemContext(item);
    const currentHash = itemSnapshotHash(item, currentContext);
    if (currentHash !== storedHash && !closeCommentOnlyUpdate) {
      markdown = replaceFrontMatterValue(markdown, "action_taken", "skipped_changed_since_review");
      markdown = replaceFrontMatterValue(markdown, "current_item_snapshot_hash", currentHash);
      markdown = replaceFrontMatterValue(markdown, "apply_checked_at", new Date().toISOString());
      writeFileSync(path, markdown, "utf8");
      results.push({ number, action: "skipped_changed_since_review", reason: "snapshot changed" });
      continue;
    }
    postClose({ number, kind: item.kind, reason: closeReason, closeComment });
    markdown = replaceSectionValue(markdown, "Close Comment", closeComment);
    markdown = replaceFrontMatterValue(markdown, "close_comment_sha256", sha256(closeComment));
    markdown = replaceFrontMatterValue(markdown, "action_taken", "closed");
    markdown = replaceFrontMatterValue(markdown, "applied_at", new Date().toISOString());
    archiveClosed(markdown);
    closedCount += 1;
    results.push({ number, action: "closed", reason: closeReasonText(closeReason) });
  }
  writeFileSync(join(ROOT, "apply-report.json"), JSON.stringify(results, null, 2), "utf8");
  updateDashboard(itemsDir, closedDir);
  console.log(JSON.stringify(results, null, 2));
}

function applyArtifactsCommand(args: Args): void {
  const artifactDir = resolve(stringArg(args.artifact_dir, "artifacts"));
  const itemsDir = resolve(stringArg(args.items_dir, join(ROOT, "items")));
  const closedDir = resolve(stringArg(args.closed_dir, join(ROOT, "closed")));
  ensureDir(itemsDir);
  ensureDir(closedDir);
  if (existsSync(artifactDir)) {
    for (const entry of readdirSync(artifactDir, { recursive: true })) {
      const name = String(entry);
      if (!name.endsWith(".md")) continue;
      const source = join(artifactDir, name);
      if (!/^\d+\.md$/.test(basename(source))) continue;
      const markdown = readFileSync(source, "utf8");
      const action = frontMatterValue(markdown, "action_taken") ?? "unknown";
      const destinationDir =
        action === "closed" || action === "skipped_already_closed" ? closedDir : itemsDir;
      const stalePath = join(destinationDir === itemsDir ? closedDir : itemsDir, basename(source));
      if (existsSync(stalePath)) unlinkSync(stalePath);
      writeFileSync(join(destinationDir, basename(source)), markdown, "utf8");
    }
  }
  updateDashboard(itemsDir, closedDir);
}

function markdownFiles(dir: string): string[] {
  return existsSync(dir)
    ? readdirSync(dir)
        .filter((name) => /^\d+\.md$/.test(name))
        .sort((left, right) => Number(left.replace(".md", "")) - Number(right.replace(".md", "")))
    : [];
}

function dashboardStats(
  itemsDir: string,
  closedDir = join(ROOT, "closed"),
): {
  open: OpenItemCounts;
  fresh: number;
  todo: number;
  files: number;
  proposedClose: number;
  closed: number;
  archivedFiles: number;
  failed: number;
  stale: number;
  byKind: Record<ItemKind, DashboardKindStats>;
  recent: DashboardItem[];
} {
  const open = fetchOpenItemCounts();
  const files = markdownFiles(itemsDir);
  const closedFiles = markdownFiles(closedDir);
  let fresh = 0;
  let proposedClose = 0;
  let closed = 0;
  let failed = 0;
  let stale = 0;
  const byKind: Record<ItemKind, DashboardKindStats> = {
    issue: emptyDashboardKindStats(),
    pull_request: emptyDashboardKindStats(),
  };
  const recent: DashboardItem[] = [];
  for (const file of files) {
    const markdown = readFileSync(join(itemsDir, file), "utf8");
    const number = Number(file.replace(/\.md$/, ""));
    const reviewedAt = frontMatterValue(markdown, "reviewed_at");
    const reviewStatus = effectiveReviewStatus(markdown);
    const action = frontMatterValue(markdown, "action_taken") ?? "unknown";
    const decision = frontMatterValue(markdown, "decision") ?? "unknown";
    const kind = (frontMatterValue(markdown, "type") as ItemKind | undefined) ?? "issue";
    const freshReview = isFresh({ reviewedAt, reviewStatus });
    if (freshReview) fresh += 1;
    if (freshReview) byKind[kind].fresh += 1;
    if (freshReview && decision === "close" && action === "proposed_close") proposedClose += 1;
    if (freshReview && decision === "close" && action === "proposed_close")
      byKind[kind].proposedClose += 1;
    if (action === "closed") closed += 1;
    if (reviewStatus === "failed") failed += 1;
    if (reviewStatus.startsWith("stale_")) stale += 1;
    recent.push({
      number,
      kind,
      title: frontMatterValue(markdown, "title") ?? "",
      reviewedAt,
      decision,
      action,
      reviewStatus,
    });
  }
  for (const file of closedFiles) {
    const markdown = readFileSync(join(closedDir, file), "utf8");
    const action = frontMatterValue(markdown, "action_taken") ?? "unknown";
    if (action === "closed") closed += 1;
  }
  recent.sort((a, b) => Date.parse(b.reviewedAt ?? "") - Date.parse(a.reviewedAt ?? ""));
  return {
    open,
    fresh,
    todo: Math.max(0, open.total - fresh),
    files: files.length,
    proposedClose,
    closed,
    archivedFiles: closedFiles.length,
    failed,
    stale,
    byKind,
    recent,
  };
}

function updateDashboard(itemsDir = join(ROOT, "items"), closedDir = join(ROOT, "closed")): void {
  const readmePath = join(ROOT, "README.md");
  const readme = readFileSync(readmePath, "utf8");
  const stats = dashboardStats(itemsDir, closedDir);
  const recent =
    stats.recent
      .slice(0, 20)
      .map((item) => {
        const title = displayTitle(item.title);
        const outcome = markdownLink(
          `${item.decision} / ${item.action}`,
          reportFileUrl(item.number),
        );
        return `| ${markdownLink(`#${item.number}`, itemUrl(item.number, item.kind))} | ${title.replaceAll("|", "\\|")} | ${outcome} | ${item.reviewStatus} | ${formatTimestamp(item.reviewedAt)} |`;
      })
      .join("\n") || "| _None_ |  |  |  |  |";
  const dashboard = `## Dashboard

Last dashboard update: ${formatTimestamp(new Date().toISOString())}

| Metric | Count |
| --- | ---: |
| Open issues in ${markdownLink(TARGET_REPO, repoUrl())} | ${stats.open.issues} |
| Fresh reviewed issues in the last ${FRESH_DAYS} days | ${stats.byKind.issue.fresh} |
| Proposed issue closes | ${stats.byKind.issue.proposedClose} (${formatPercent(stats.byKind.issue.proposedClose, stats.byKind.issue.fresh)} of reviewed issues) |
| Open PRs in ${markdownLink(TARGET_REPO, repoUrl())} | ${stats.open.pullRequests} |
| Fresh reviewed PRs in the last ${FRESH_DAYS} days | ${stats.byKind.pull_request.fresh} |
| Proposed PR closes | ${stats.byKind.pull_request.proposedClose} (${formatPercent(stats.byKind.pull_request.proposedClose, stats.byKind.pull_request.fresh)} of reviewed PRs) |
| Open items total | ${stats.open.total} |
| Reviewed files | ${stats.files} |
| Archived closed files | ${stats.archivedFiles} |
| Fresh verified reviews in the last ${FRESH_DAYS} days | ${stats.fresh} |
| Proposed closes awaiting apply | ${stats.proposedClose} (${formatPercent(stats.proposedClose, stats.fresh)} of fresh reviews) |
| Closed by Codex apply | ${stats.closed} |
| Failed or stale reviews | ${stats.failed + stats.stale} |
| Todo for weekly coverage | ${stats.todo} |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
${recent}`;
  const updated = readme.replace(
    /## Dashboard[\s\S]*?## How It Works/,
    `${dashboard}\n\n## How It Works`,
  );
  writeFileSync(readmePath, updated, "utf8");
}

function checkCommand(): void {
  JSON.parse(readFileSync(join(ROOT, "schema", "clawsweeper-decision.schema.json"), "utf8"));
  if (!existsSync(join(ROOT, ".github", "workflows", "sweep.yml")))
    throw new Error("Missing workflow");
  console.log("ok");
}

const args = parseArgs(process.argv.slice(2));
const command = args._[0] ?? "review";
if (command === "plan") planCommand(args);
else if (command === "review") reviewCommand(args);
else if (command === "apply-artifacts") applyArtifactsCommand(args);
else if (command === "apply-decisions") applyDecisionsCommand(args);
else if (command === "dashboard")
  updateDashboard(
    resolve(stringArg(args.items_dir, join(ROOT, "items"))),
    resolve(stringArg(args.closed_dir, join(ROOT, "closed"))),
  );
else if (command === "check") checkCommand();
else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
