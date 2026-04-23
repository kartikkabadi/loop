#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
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
type ActionTaken = "closed" | "kept_open" | "dry_run_close_candidate";

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
  file?: string;
  line?: number;
  command?: string;
  sha?: string;
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
}

interface RepoSummary {
  open_issues_count?: number;
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

function existingReview(number: number, itemsDir: string): ExistingReview | null {
  const path = join(itemsDir, `${number}.md`);
  if (!existsSync(path)) return null;
  const markdown = readFileSync(path, "utf8");
  return {
    path,
    markdown,
    reviewedAt: frontMatterValue(markdown, "reviewed_at"),
    decision: frontMatterValue(markdown, "decision"),
  };
}

function isFresh(review: { reviewedAt: string | undefined } | null): boolean {
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
  const context: ItemContext = {
    issue: ghJson<unknown>(["api", `repos/${TARGET_REPO}/issues/${item.number}`]),
    comments: ghPaged<unknown>(`repos/${TARGET_REPO}/issues/${item.number}/comments`),
    timeline: ghPaged<unknown>(`repos/${TARGET_REPO}/issues/${item.number}/timeline`),
  };
  if (item.kind === "pull_request") {
    context.pullRequest = ghJson<unknown>(["api", `repos/${TARGET_REPO}/pulls/${item.number}`]);
    context.pullFiles = ghPaged<unknown>(`repos/${TARGET_REPO}/pulls/${item.number}/files`);
    context.pullCommits = ghPaged<unknown>(`repos/${TARGET_REPO}/pulls/${item.number}/commits`);
    context.pullReviewComments = ghPaged<unknown>(
      `repos/${TARGET_REPO}/pulls/${item.number}/comments`,
    );
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

function fallbackDecision(status: number | null, stderr: string): Decision {
  return {
    decision: "keep_open",
    closeReason: "none",
    confidence: "low",
    summary: `Codex review failed with exit ${status ?? "unknown"}.`,
    evidence: [{ label: "codex stderr", detail: stderr.slice(-4000) || "No stderr." }],
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
      "--dangerously-bypass-approvals-and-sandbox",
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
    return fallbackDecision(result.status, result.stderr);
  }
  return JSON.parse(readFileSync(outputPath, "utf8").trim()) as Decision;
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

function maybeClose(options: {
  item: Item;
  decision: Decision;
  git: GitInfo;
  dryRun: boolean;
}): Action {
  const canClose =
    options.decision.decision === "close" &&
    options.decision.confidence === "high" &&
    ALLOWED_REASONS.has(options.decision.closeReason);
  if (!canClose) return { actionTaken: "kept_open", closeComment: "" };
  const closeComment = normalizeComment(options.decision, options.git);
  if (options.dryRun) return { actionTaken: "dry_run_close_candidate", closeComment };
  const commentFile = join(ROOT, ".artifacts", `comment-${options.item.number}.md`);
  ensureDir(dirname(commentFile));
  writeFileSync(commentFile, closeComment, "utf8");
  gh(["issue", "comment", String(options.item.number), "-F", commentFile]);
  if (options.item.kind === "pull_request") {
    gh(["pr", "close", String(options.item.number)]);
  } else {
    const reason =
      options.decision.closeReason === "implemented_on_main" ? "completed" : "not_planned";
    gh(["issue", "close", String(options.item.number), "--reason", reason]);
  }
  return { actionTaken: "closed", closeComment };
}

function markdownFor(options: {
  item: Item;
  context: ItemContext;
  decision: Decision;
  git: GitInfo;
  action: Action;
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
author: ${options.item.author}
labels: ${JSON.stringify(options.item.labels)}
reviewed_at: ${new Date().toISOString()}
main_sha: ${options.git.mainSha}
latest_release: ${options.git.latestRelease?.tagName ?? "unknown"}
latest_release_sha: ${options.git.latestRelease?.sha ?? "unknown"}
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

- comments: ${options.context.comments.length}
- timeline events: ${options.context.timeline.length}
- PR files: ${options.context.pullFiles?.length ?? 0}
- PR commits: ${options.context.pullCommits?.length ?? 0}
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
  const dryRun = boolArg(args.dry_run) || process.env.CLAWSWEEPER_DRY_RUN === "true";
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
    const decision = runCodex({
      item,
      context,
      git,
      model,
      openclawDir,
      reasoningEffort,
      serviceTier,
      workDir: join(artifactDir, "codex"),
    });
    const action = maybeClose({ item, decision, git, dryRun });
    writeFileSync(
      join(artifactDir, `${item.number}.md`),
      markdownFor({ item, context, decision, git, action }),
      "utf8",
    );
  }
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
    if (isFresh({ reviewedAt })) fresh += 1;
    recent.push({
      number,
      title: frontMatterValue(markdown, "title") ?? "",
      reviewedAt,
      decision: frontMatterValue(markdown, "decision") ?? "unknown",
      action: frontMatterValue(markdown, "action_taken") ?? "unknown",
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
        return `- #${item.number}: ${title} - ${item.decision}, ${item.action}, ${item.reviewedAt ?? "unknown"}`;
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
else if (command === "dashboard")
  updateDashboard(resolve(stringArg(args.items_dir, join(ROOT, "items"))));
else if (command === "check") checkCommand();
else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
