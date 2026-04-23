#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type ItemKind = "issue" | "pull_request";
type DecisionKind = "close" | "keep_open";
type CloseReason = "implemented_on_main" | "cannot_reproduce" | "clawhub" | "incoherent" | "none";
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
  title: string;
  reviewedAt: string | undefined;
  decision: string;
  action: string;
  reviewStatus: string;
}

interface RepoSummary {
  open_issues_count?: number;
}

interface ApplyResult {
  number: number;
  action: ActionTaken;
  reason: string;
}

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TARGET_REPO = "openclaw/openclaw";
const FRESH_DAYS = 7;
const ALLOWED_REASONS = new Set<CloseReason>([
  "implemented_on_main",
  "cannot_reproduce",
  "clawhub",
  "incoherent",
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

function existingReview(number: number, itemsDir: string): ExistingReview | null {
  const path = join(itemsDir, `${number}.md`);
  if (!existsSync(path)) return null;
  const markdown = readFileSync(path, "utf8");
  return {
    path,
    markdown,
    reviewedAt: frontMatterValue(markdown, "reviewed_at"),
    decision: frontMatterValue(markdown, "decision"),
    reviewStatus: frontMatterValue(markdown, "review_status") ?? inferReviewStatus(markdown),
  };
}

function inferReviewStatus(markdown: string): string {
  return markdown.includes("Codex review failed") ? "failed" : "complete";
}

function isFresh(
  review: { reviewedAt: string | undefined; reviewStatus: string | undefined } | null,
): boolean {
  if (review?.reviewStatus === "failed") return false;
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
    ".[] | {number,title,html_url,updated_at,user:{login:.user.login},labels:[.labels[].name],pull_request:(.pull_request // null)}",
  ]);
  return items
    .map((item) => ({
      number: item.number,
      kind: item.pull_request ? ("pull_request" as const) : ("issue" as const),
      title: item.title,
      url: item.html_url,
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
    "{number,title,html_url,updated_at,state,user:{login:.user.login},labels:[.labels[].name],pull_request:(.pull_request // null)}",
  ]);
  return {
    item: {
      number: issue.number,
      kind: issue.pull_request ? "pull_request" : "issue",
      title: issue.title,
      url: issue.html_url,
      updatedAt: issue.updated_at,
      author: issue.user?.login ?? "unknown",
      labels: issue.labels ?? [],
    },
    state: issue.state ?? "unknown",
  };
}

function fetchOpenItemCount(): number {
  const summary = ghJson<RepoSummary>([
    "api",
    `repos/${TARGET_REPO}`,
    "--jq",
    "{open_issues_count}",
  ]);
  return summary.open_issues_count ?? 0;
}

function selectCandidates(options: {
  batchSize: number;
  maxPages: number;
  shardIndex: number;
  shardCount: number;
  itemsDir: string;
}): { candidates: Item[]; scannedPages: number } {
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
- Current main SHA: ${git.mainSha}
- Latest release: ${git.latestRelease?.tagName ?? "unknown"} (${git.latestRelease?.sha ?? "unknown sha"})

## GitHub Context

\`\`\`json
${JSON.stringify(context, null, 2)}
\`\`\`
`;
}

function codexFailureDecision(status: number | null, stderr: string, stdout = ""): Decision {
  return {
    decision: "keep_open",
    closeReason: "none",
    confidence: "low",
    summary: `Codex review failed with exit ${status ?? "unknown"}.`,
    evidence: [
      { label: "codex stderr", detail: stderr.slice(-4000) || "No stderr." },
      { label: "codex stdout", detail: stdout.slice(-4000) || "No stdout." },
    ],
    risks: ["No close action taken because the review did not complete."],
    closeComment: "",
  };
}

function runCodex(options: {
  item: Item;
  context: ItemContext;
  git: GitInfo;
  model: string;
  openclawDir: string;
  reasoningEffort: string;
  serviceTier: string;
  workDir: string;
}): Decision {
  ensureDir(options.workDir);
  const promptPath = join(options.workDir, `${options.item.number}.prompt.md`);
  const outputPath = join(options.workDir, `${options.item.number}.json`);
  writeFileSync(promptPath, promptFor(options.item, options.context, options.git), "utf8");
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
      "read-only",
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
      env: process.env,
      input: readFileSync(promptPath, "utf8"),
    },
  );
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
    case "none":
      return "kept open";
  }
}

function normalizeComment(decision: Decision, git: GitInfo): string {
  const base = decision.closeComment.trim();
  const release = git.latestRelease?.tagName
    ? `Latest release seen during review: ${git.latestRelease.tagName}${
        git.latestRelease.sha ? ` (${git.latestRelease.sha.slice(0, 12)})` : ""
      }.`
    : "Latest release could not be resolved during review.";
  const main = `Reviewed against main ${git.mainSha.slice(0, 12)}.`;
  return [base, "", `ClawSweeper/Codex evidence: ${main} ${release}`].filter(Boolean).join("\n");
}

function canClose(decision: Decision): boolean {
  return (
    decision.decision === "close" &&
    decision.confidence === "high" &&
    ALLOWED_REASONS.has(decision.closeReason)
  );
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
  gh(["issue", "comment", String(options.number), "-F", commentFile]);
  if (options.kind === "pull_request") {
    gh(["pr", "close", String(options.number)]);
  } else {
    const reason = options.reason === "implemented_on_main" ? "completed" : "not_planned";
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
}): string {
  const labels = options.item.labels.length ? options.item.labels.join(", ") : "none";
  const evidence = options.decision.evidence.length
    ? options.decision.evidence
        .map((entry) => {
          const bits = [`- **${entry.label}:** ${entry.detail}`];
          if (entry.file)
            bits.push(`  - file: \`${entry.file}${entry.line ? `:${entry.line}` : ""}\``);
          if (entry.command) bits.push(`  - command: \`${entry.command}\``);
          if (entry.sha) bits.push(`  - sha: \`${entry.sha}\``);
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
item_updated_at: ${options.item.updatedAt}
author: ${options.item.author}
labels: ${JSON.stringify(options.item.labels)}
reviewed_at: ${new Date().toISOString()}
main_sha: ${options.git.mainSha}
latest_release: ${options.git.latestRelease?.tagName ?? "unknown"}
latest_release_sha: ${options.git.latestRelease?.sha ?? "unknown"}
review_mode: ${options.reviewMode}
review_status: ${options.decision.summary.startsWith("Codex review failed") ? "failed" : "complete"}
item_snapshot_hash: ${options.snapshotHash}
close_comment_sha256: ${options.action.closeComment ? sha256(options.action.closeComment) : "none"}
decision: ${options.decision.decision}
close_reason: ${options.decision.closeReason}
confidence: ${options.decision.confidence}
action_taken: ${options.action.actionTaken}
---

# #${options.item.number}: ${options.item.title}

Type: ${options.item.kind}

URL: ${options.item.url}

Author: ${options.item.author}

Labels: ${labels}

Updated at: ${options.item.updatedAt}

Reviewed against: \`${options.git.mainSha}\`

Latest release: ${options.git.latestRelease?.tagName ?? "unknown"}${
    options.git.latestRelease?.sha ? ` (\`${options.git.latestRelease.sha}\`)` : ""
  }

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

function reviewCommand(args: Args): void {
  const openclawDir = resolve(stringArg(args.openclaw_dir, "../openclaw"));
  const artifactDir = resolve(stringArg(args.artifact_dir, "artifacts/reviews"));
  const itemsDir = resolve(stringArg(args.items_dir, join(ROOT, "items")));
  const batchSize = numberArg(args.batch_size, 4);
  const maxPages = numberArg(args.max_pages, 250);
  const model = stringArg(args.codex_model, "gpt-5.4");
  const reasoningEffort = stringArg(args.codex_reasoning_effort, "high");
  const serviceTier = stringArg(args.codex_service_tier, "fast");
  const shardIndex = numberArg(args.shard_index, 0);
  const shardCount = numberArg(args.shard_count, 1);
  const applyClosures =
    boolArg(args.apply_closures) || process.env.CLAWSWEEPER_APPLY_CLOSURES === "true";
  ensureDir(artifactDir);
  const git = gitInfo(openclawDir);
  const { candidates, scannedPages } = selectCandidates({
    batchSize,
    maxPages,
    shardIndex,
    shardCount,
    itemsDir,
  });
  writeFileSync(
    join(artifactDir, "selection.json"),
    JSON.stringify({ shardIndex, shardCount, scannedPages, candidates }, null, 2),
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
      }),
      "utf8",
    );
  }
}

function applyDecisionsCommand(args: Args): void {
  const itemsDir = resolve(stringArg(args.items_dir, join(ROOT, "items")));
  const limit = numberArg(args.limit, 20);
  const results: ApplyResult[] = [];
  if (!existsSync(itemsDir)) {
    console.log("No items directory.");
    return;
  }
  const files = readdirSync(itemsDir)
    .filter((name) => /^\d+\.md$/.test(name))
    .sort((left, right) => Number(left.replace(".md", "")) - Number(right.replace(".md", "")));
  for (const file of files) {
    if (results.filter((result) => result.action === "closed").length >= limit) break;
    const path = join(itemsDir, file);
    let markdown = readFileSync(path, "utf8");
    const number = Number(file.replace(/\.md$/, ""));
    const decision = frontMatterValue(markdown, "decision");
    const confidence = frontMatterValue(markdown, "confidence");
    const closeReason = frontMatterValue(markdown, "close_reason") as CloseReason | undefined;
    const action = frontMatterValue(markdown, "action_taken");
    const storedHash = frontMatterValue(markdown, "item_snapshot_hash");
    const storedUpdatedAt = frontMatterValue(markdown, "item_updated_at");
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
    const closeComment = sectionValue(markdown, "Close Comment");
    if (!closeComment || closeComment === "_No close comment posted._") {
      results.push({ number, action: "kept_open", reason: "missing close comment" });
      continue;
    }
    const { item, state } = fetchItem(number);
    if (state !== "open") {
      markdown = replaceFrontMatterValue(markdown, "action_taken", "skipped_already_closed");
      writeFileSync(path, markdown, "utf8");
      results.push({ number, action: "skipped_already_closed", reason: `state is ${state}` });
      continue;
    }
    if (storedUpdatedAt && item.updatedAt !== storedUpdatedAt) {
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
    if (currentHash !== storedHash) {
      markdown = replaceFrontMatterValue(markdown, "action_taken", "skipped_changed_since_review");
      markdown = replaceFrontMatterValue(markdown, "current_item_snapshot_hash", currentHash);
      markdown = replaceFrontMatterValue(markdown, "apply_checked_at", new Date().toISOString());
      writeFileSync(path, markdown, "utf8");
      results.push({ number, action: "skipped_changed_since_review", reason: "snapshot changed" });
      continue;
    }
    postClose({ number, kind: item.kind, reason: closeReason, closeComment });
    markdown = replaceFrontMatterValue(markdown, "action_taken", "closed");
    markdown = replaceFrontMatterValue(markdown, "applied_at", new Date().toISOString());
    writeFileSync(path, markdown, "utf8");
    results.push({ number, action: "closed", reason: closeReasonText(closeReason) });
  }
  writeFileSync(join(ROOT, "apply-report.json"), JSON.stringify(results, null, 2), "utf8");
  updateDashboard(itemsDir);
  console.log(JSON.stringify(results, null, 2));
}

function applyArtifactsCommand(args: Args): void {
  const artifactDir = resolve(stringArg(args.artifact_dir, "artifacts"));
  const itemsDir = resolve(stringArg(args.items_dir, join(ROOT, "items")));
  ensureDir(itemsDir);
  if (existsSync(artifactDir)) {
    for (const entry of readdirSync(artifactDir, { recursive: true })) {
      const name = String(entry);
      if (!name.endsWith(".md")) continue;
      const source = join(artifactDir, name);
      if (!/^\d+\.md$/.test(basename(source))) continue;
      copyFileSync(source, join(itemsDir, basename(source)));
    }
  }
  updateDashboard(itemsDir);
}

function dashboardStats(itemsDir: string): {
  openTotal: number;
  fresh: number;
  todo: number;
  files: number;
  recent: DashboardItem[];
} {
  const openTotal = fetchOpenItemCount();
  const files = existsSync(itemsDir)
    ? readdirSync(itemsDir).filter((name) => /^\d+\.md$/.test(name))
    : [];
  let fresh = 0;
  const recent: DashboardItem[] = [];
  for (const file of files) {
    const markdown = readFileSync(join(itemsDir, file), "utf8");
    const number = Number(file.replace(/\.md$/, ""));
    const reviewedAt = frontMatterValue(markdown, "reviewed_at");
    const reviewStatus = frontMatterValue(markdown, "review_status") ?? inferReviewStatus(markdown);
    if (isFresh({ reviewedAt, reviewStatus })) fresh += 1;
    recent.push({
      number,
      title: frontMatterValue(markdown, "title") ?? "",
      reviewedAt,
      decision: frontMatterValue(markdown, "decision") ?? "unknown",
      action: frontMatterValue(markdown, "action_taken") ?? "unknown",
      reviewStatus,
    });
  }
  recent.sort((a, b) => Date.parse(b.reviewedAt ?? "") - Date.parse(a.reviewedAt ?? ""));
  return {
    openTotal,
    fresh,
    todo: Math.max(0, openTotal - fresh),
    files: files.length,
    recent,
  };
}

function updateDashboard(itemsDir = join(ROOT, "items")): void {
  const readmePath = join(ROOT, "README.md");
  const readme = readFileSync(readmePath, "utf8");
  const stats = dashboardStats(itemsDir);
  const recent =
    stats.recent
      .slice(0, 20)
      .map((item) => {
        const title = item.title.replace(/^"|"$/g, "");
        return `- #${item.number}: ${title} - ${item.decision}, ${item.action}, ${item.reviewStatus}, ${item.reviewedAt ?? "unknown"}`;
      })
      .join("\n") || "_No reviews yet._";
  const dashboard = `## Dashboard

Last dashboard update: ${new Date().toISOString()}

Open items in \`${TARGET_REPO}\`: ${stats.openTotal}

Freshly reviewed in the last ${FRESH_DAYS} days: ${stats.fresh}

Todo for weekly coverage: ${stats.todo}

Total local review files: ${stats.files}

Recently reviewed:

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
if (command === "review") reviewCommand(args);
else if (command === "apply-artifacts") applyArtifactsCommand(args);
else if (command === "apply-decisions") applyDecisionsCommand(args);
else if (command === "dashboard")
  updateDashboard(resolve(stringArg(args.items_dir, join(ROOT, "items"))));
else if (command === "check") checkCommand();
else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
