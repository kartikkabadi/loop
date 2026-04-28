#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  changedFilesForCommit,
  isReviewableCommitPath,
  skippedNonCodeReport,
} from "./commit-classifier.js";
import { publishCheckFromReport, splitFrontMatter } from "./commit-checks.js";
import { codexEnv, safeOutputTail } from "./clawsweeper.js";
import { DEFAULT_TARGET_REPO, repositoryProfileFor } from "./repository-profiles.js";

export { isReviewableCommitPath } from "./commit-classifier.js";

interface Args {
  _: string[];
  [key: string]: string | boolean | string[];
}

interface CommitMetadata {
  sha: string;
  parents: string[];
  authorName: string;
  authorEmail: string;
  committerName: string;
  committerEmail: string;
  authoredAt: string;
  committedAt: string;
  subject: string;
  coAuthors: string[];
  githubAuthor: string;
  githubCommitter: string;
}

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_CODEX_MODEL = "gpt-5.5";
const DEFAULT_REASONING_EFFORT = "high";
const DEFAULT_SERVICE_TIER = "fast";
const COMMIT_REVIEW_CHECK_NAME = "ClawSweeper Commit Review";

function parseArgs(argv: string[]): Args {
  const args: Args = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      args._.push(arg);
      continue;
    }
    const key = arg.slice(2).replaceAll("-", "_");
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      index += 1;
    }
  }
  return args;
}

function stringArg(args: Args, key: string, fallback: string): string {
  const value = args[key];
  return typeof value === "string" && value.length ? value : fallback;
}

function numberArg(args: Args, key: string, fallback: number): number {
  const value = Number(stringArg(args, key, String(fallback)));
  if (!Number.isFinite(value) || value < 0)
    throw new Error(`Invalid --${key.replaceAll("_", "-")}`);
  return value;
}

function boolArg(args: Args, key: string): boolean {
  const value = args[key];
  return value === true || value === "true" || value === "1" || value === "yes";
}

function run(command: string, commandArgs: string[], options: { cwd?: string } = {}): string {
  return execFileSync(command, commandArgs, {
    cwd: options.cwd,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" },
  }).trimEnd();
}

function ensureDir(path: string): void {
  mkdirSync(path, { recursive: true });
}

function assertSha(value: string, label = "sha"): string {
  const sha = value.trim();
  if (!/^[0-9a-f]{40}$/i.test(sha)) throw new Error(`Invalid ${label}: ${value}`);
  return sha.toLowerCase();
}

function repoSlug(targetRepo: string): string {
  return repositoryProfileFor(targetRepo).slug;
}

export function commitReportRelativePath(targetRepo: string, sha: string): string {
  return join("records", repoSlug(targetRepo), "commits", `${assertSha(sha)}.md`);
}

function artifactReportRelativePath(targetRepo: string, sha: string): string {
  return join(repoSlug(targetRepo), "commits", `${assertSha(sha)}.md`);
}

export function parseCoAuthors(body: string): string[] {
  const coAuthors: string[] = [];
  for (const match of body.matchAll(/^Co-authored-by:\s*(.+?)\s*$/gim)) {
    const value = match[1]?.trim();
    if (value && !coAuthors.includes(value)) coAuthors.push(value);
  }
  return coAuthors;
}

function optionalGhJson(path: string, jq: string): string {
  try {
    return execFileSync("gh", ["api", path, "--jq", jq], {
      encoding: "utf8",
      maxBuffer: 1024 * 1024,
      env: process.env,
    }).trim();
  } catch {
    return "";
  }
}

function commitMetadata(targetDir: string, targetRepo: string, sha: string): CommitMetadata {
  const separator = "\x1f";
  const raw = run(
    "git",
    [
      "show",
      "-s",
      `--format=%H${separator}%P${separator}%an${separator}%ae${separator}%cn${separator}%ce${separator}%aI${separator}%cI${separator}%s${separator}%B`,
      sha,
    ],
    { cwd: targetDir },
  );
  const parts = raw.split(separator);
  const body = parts.slice(9).join(separator);
  const githubAuthor = optionalGhJson(
    `repos/${targetRepo}/commits/${sha}`,
    ".author.login // empty",
  );
  const githubCommitter = optionalGhJson(
    `repos/${targetRepo}/commits/${sha}`,
    ".committer.login // empty",
  );
  return {
    sha: assertSha(parts[0] ?? sha),
    parents: (parts[1] ?? "")
      .split(/\s+/)
      .map((parent) => parent.trim())
      .filter(Boolean),
    authorName: parts[2] ?? "",
    authorEmail: parts[3] ?? "",
    committerName: parts[4] ?? "",
    committerEmail: parts[5] ?? "",
    authoredAt: parts[6] ?? "",
    committedAt: parts[7] ?? "",
    subject: parts[8] ?? "",
    coAuthors: parseCoAuthors(body),
    githubAuthor,
    githubCommitter,
  };
}

function yamlScalar(value: string): string {
  return JSON.stringify(value);
}

function yamlArray(values: string[]): string {
  if (!values.length) return "[]";
  return values.map((value) => `\n  - ${yamlScalar(value)}`).join("");
}

function commitDiffSummary(targetDir: string, baseSha: string, sha: string): string {
  const stat = run("git", ["diff", "--stat", "--summary", `${baseSha}..${sha}`], {
    cwd: targetDir,
  });
  const names = run("git", ["diff", "--name-status", `${baseSha}..${sha}`], { cwd: targetDir });
  return `## Diff Summary

\`\`\`
${stat || "(no stat output)"}
\`\`\`

## Changed Files

\`\`\`
${names || "(no changed files)"}
\`\`\``;
}

function promptForCommit(options: {
  targetDir: string;
  targetRepo: string;
  sha: string;
  baseSha: string;
  metadata: CommitMetadata;
  additionalPrompt: string;
}): string {
  const prompt = readFileSync(join(ROOT, "prompts", "review-commit.md"), "utf8");
  const coAuthors = options.metadata.coAuthors.length
    ? options.metadata.coAuthors.map((value) => `- ${value}`).join("\n")
    : "- none";
  const additionalPrompt = options.additionalPrompt.trim()
    ? `\n## Additional Manual Prompt\n\n${options.additionalPrompt.trim()}\n`
    : "";
  return `${prompt}

## Commit Under Review

- Target repo: ${options.targetRepo}
- Commit SHA: ${options.sha}
- Base SHA: ${options.baseSha}
- Range: ${options.baseSha}..${options.sha}
- Subject: ${options.metadata.subject}
- Author: ${options.metadata.authorName} <${options.metadata.authorEmail}>
- Committer: ${options.metadata.committerName} <${options.metadata.committerEmail}>
- GitHub author: ${options.metadata.githubAuthor || "unknown"}
- GitHub committer: ${options.metadata.githubCommitter || "unknown"}
- Authored at: ${options.metadata.authoredAt}
- Committed at: ${options.metadata.committedAt}
- Co-authors:
${coAuthors}

${commitDiffSummary(options.targetDir, options.baseSha, options.sha)}
${additionalPrompt}`;
}

function stripMarkdownFence(markdown: string): string {
  const trimmed = markdown.trim();
  const match = trimmed.match(/^```(?:markdown|md)?\s*\n([\s\S]*?)\n```\s*$/i);
  return match ? (match[1]?.trim() ?? trimmed) : trimmed;
}

function failureReport(options: {
  targetRepo: string;
  sha: string;
  baseSha: string;
  metadata: CommitMetadata;
  detail: string;
  timeout: boolean;
}): string {
  return `---
sha: ${options.sha}
parent: ${options.baseSha}
repository: ${options.targetRepo}
author: ${yamlScalar(`${options.metadata.authorName} <${options.metadata.authorEmail}>`)}
committer: ${yamlScalar(`${options.metadata.committerName} <${options.metadata.committerEmail}>`)}
github_author: ${yamlScalar(options.metadata.githubAuthor || "unknown")}
github_committer: ${yamlScalar(options.metadata.githubCommitter || "unknown")}
co_authors: ${options.metadata.coAuthors.length ? yamlArray(options.metadata.coAuthors) : "[]"}
result: failed
confidence: low
highest_severity: none
check_conclusion: ${options.timeout ? "timed_out" : "neutral"}
reviewed_at: ${new Date().toISOString()}
---

# Commit ${options.sha.slice(0, 12)}

Commit review failed before a reliable report could be produced.

## Failure

\`\`\`
${options.detail}
\`\`\`
`;
}

function runCodex(options: {
  targetDir: string;
  targetRepo: string;
  sha: string;
  baseSha: string;
  metadata: CommitMetadata;
  model: string;
  reasoningEffort: string;
  sandboxMode: string;
  serviceTier: string;
  timeoutMs: number;
  workDir: string;
  additionalPrompt: string;
}): string {
  ensureDir(options.workDir);
  const promptPath = join(options.workDir, `${options.sha}.prompt.md`);
  const outputPath = join(options.workDir, `${options.sha}.md`);
  writeFileSync(
    promptPath,
    promptForCommit({
      targetDir: options.targetDir,
      targetRepo: options.targetRepo,
      sha: options.sha,
      baseSha: options.baseSha,
      metadata: options.metadata,
      additionalPrompt: options.additionalPrompt,
    }),
    "utf8",
  );
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
      "-C",
      options.targetDir,
      "--output-last-message",
      outputPath,
      "--sandbox",
      options.sandboxMode,
      "-",
    ],
    {
      cwd: options.targetDir,
      encoding: "utf8",
      env: codexEnv(),
      input: readFileSync(promptPath, "utf8"),
      maxBuffer: 128 * 1024 * 1024,
      timeout: options.timeoutMs,
    },
  );
  if (result.error || result.status !== 0 || !existsSync(outputPath)) {
    const timeout = Boolean(
      result.error &&
      "code" in result.error &&
      (result.error as NodeJS.ErrnoException).code === "ETIMEDOUT",
    );
    const detail =
      result.error instanceof Error
        ? `${result.error.message}\n${safeOutputTail(result.stderr) || safeOutputTail(result.stdout)}`
        : `exit ${result.status ?? "unknown"}\n${
            safeOutputTail(result.stderr) || safeOutputTail(result.stdout) || "No output."
          }`;
    return failureReport({
      targetRepo: options.targetRepo,
      sha: options.sha,
      baseSha: options.baseSha,
      metadata: options.metadata,
      detail: detail.trim(),
      timeout,
    });
  }
  return stripMarkdownFence(readFileSync(outputPath, "utf8"));
}

function reviewCommand(args: Args): void {
  const targetRepo = stringArg(args, "target_repo", DEFAULT_TARGET_REPO);
  const targetDir = resolve(
    stringArg(args, "target_dir", repositoryProfileFor(targetRepo).checkoutDir),
  );
  const sha = assertSha(stringArg(args, "commit_sha", ""));
  const metadata = commitMetadata(targetDir, targetRepo, sha);
  const baseSha = assertSha(stringArg(args, "base_sha", metadata.parents[0] ?? ""), "base sha");
  const reportDir = resolve(stringArg(args, "report_dir", "records"));
  const artifactMode = boolArg(args, "artifact_mode");
  const outputPath = artifactMode
    ? join(reportDir, artifactReportRelativePath(targetRepo, sha))
    : resolve(commitReportRelativePath(targetRepo, sha));
  const additionalPrompt = stringArg(
    args,
    "additional_prompt",
    process.env.COMMIT_SWEEPER_ADDITIONAL_PROMPT ?? "",
  );
  const markdown = runCodex({
    targetDir,
    targetRepo,
    sha,
    baseSha,
    metadata,
    model: stringArg(args, "codex_model", DEFAULT_CODEX_MODEL),
    reasoningEffort: stringArg(args, "codex_reasoning_effort", DEFAULT_REASONING_EFFORT),
    sandboxMode: stringArg(args, "codex_sandbox", "danger-full-access"),
    serviceTier: stringArg(args, "codex_service_tier", DEFAULT_SERVICE_TIER),
    timeoutMs: numberArg(args, "codex_timeout_ms", 1_800_000),
    workDir: resolve(stringArg(args, "work_dir", join(reportDir, ".codex"))),
    additionalPrompt,
  });
  ensureDir(dirname(outputPath));
  writeFileSync(outputPath, markdown.endsWith("\n") ? markdown : `${markdown}\n`, "utf8");
  console.log(outputPath);
}

function commitShasArg(value: string): string[] {
  return value
    .split(/[\s,]+/)
    .map((sha) => sha.trim())
    .filter(Boolean)
    .map((sha) => assertSha(sha));
}

function classifyCommand(args: Args): void {
  const targetRepo = stringArg(args, "target_repo", DEFAULT_TARGET_REPO);
  const targetDir = resolve(
    stringArg(args, "target_dir", repositoryProfileFor(targetRepo).checkoutDir),
  );
  const artifactDir = resolve(stringArg(args, "artifact_dir", "skipped-commit-artifacts"));
  const commits = commitShasArg(stringArg(args, "commit_shas", ""));
  const review: string[] = [];
  const skipped: string[] = [];
  for (const sha of commits) {
    const metadata = commitMetadata(targetDir, targetRepo, sha);
    const changedFiles = changedFilesForCommit(targetDir, sha, metadata.parents);
    if (changedFiles.some(isReviewableCommitPath)) {
      review.push(sha);
      continue;
    }
    const outputPath = join(artifactDir, artifactReportRelativePath(targetRepo, sha));
    ensureDir(dirname(outputPath));
    writeFileSync(
      outputPath,
      skippedNonCodeReport({ targetRepo, sha, metadata, changedFiles }),
      "utf8",
    );
    skipped.push(sha);
  }
  console.log(JSON.stringify({ review, skipped }, null, 2));
}

function publishCheckCommand(args: Args): void {
  const targetRepo = stringArg(args, "target_repo", DEFAULT_TARGET_REPO);
  const reportRepo = stringArg(
    args,
    "report_repo",
    process.env.GITHUB_REPOSITORY ?? "openclaw/clawsweeper",
  );
  const reportPath = stringArg(args, "report_path", "");
  if (!reportPath) throw new Error("Missing --report-path");
  const markdown = readFileSync(reportPath, "utf8");
  const { frontMatter } = splitFrontMatter(markdown);
  const sha = assertSha(stringArg(args, "commit_sha", frontMatter.sha ?? ""));
  const reportRelativePath =
    stringArg(args, "report_relative_path", "") || commitReportRelativePath(targetRepo, sha);
  publishCheckFromReport({
    targetRepo,
    reportRepo,
    reportPath,
    reportRelativePath,
    sha,
    checkName: stringArg(args, "check_name", COMMIT_REVIEW_CHECK_NAME),
  });
}

function collectMarkdownFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collectMarkdownFiles(path));
    else if (entry.isFile() && path.endsWith(".md")) files.push(path);
  }
  return files;
}

function copyArtifactsCommand(args: Args): void {
  const artifactDir = resolve(stringArg(args, "artifact_dir", "commit-artifacts"));
  const recordsDir = resolve(stringArg(args, "records_dir", "records"));
  let copied = 0;
  for (const file of collectMarkdownFiles(artifactDir)) {
    const relativePath = relative(artifactDir, file);
    const destination = join(recordsDir, relativePath);
    ensureDir(dirname(destination));
    writeFileSync(destination, readFileSync(file, "utf8"), "utf8");
    copied += 1;
  }
  console.log(`copied=${copied}`);
}

export function main(argv = process.argv.slice(2)): void {
  const args = parseArgs(argv);
  const command = args._[0] ?? "review";
  if (command === "review") reviewCommand(args);
  else if (command === "classify") classifyCommand(args);
  else if (command === "publish-check") publishCheckCommand(args);
  else if (command === "copy-artifacts") copyArtifactsCommand(args);
  else {
    console.error(`Unknown command: ${command}`);
    process.exit(1);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
