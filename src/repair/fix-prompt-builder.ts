import fs from "node:fs";
import path from "node:path";

import { runCommand as run } from "./command-runner.js";
import type { JsonValue, LooseRecord } from "./json-types.js";
import { compactText } from "./text-utils.js";

export function buildFixPrompt({
  fixArtifact,
  branch,
  mode,
  fallbackReason,
  attempt,
  previousNoDiff,
  previousSummary,
  repositoryContext,
  reconcileWithBase,
  sourceHead,
  rebaseResult,
  maxEditAttempts,
}: LooseRecord) {
  return [
    "You are editing the target repository for ClawSweeper Repair.",
    "",
    "Rules:",
    "- this is a writable checkout; make concrete file edits before returning;",
    "- make the narrowest code change that satisfies the fix artifact;",
    "- start by inspecting the repository paths below with rg/git ls-files/sed;",
    "- if likely_files are stale, missing, or glob-like, discover the real nearby files and edit those;",
    "- you may run local git status/diff/log/rebase/merge commands needed to reconcile this branch with current origin/main;",
    "- when git conflicts exist, resolve every conflict marker and leave the checkout in a normal non-rebasing state;",
    "- preserve contributor credit in changelog/docs when the fix is user-facing;",
    "- address review-bot concerns named in the artifact;",
    "- resolve actionable human review comments, bot comments, and requested changes named in the artifact;",
    "- fix relevant failing CI/check output named in the artifact; do not leave known changed-surface CI failures for a later pass;",
    renderChangelogRule(fixArtifact),
    "- prepare the PR so it can pass the ClawSweeper Repair merge_preflight gate;",
    "- do not push, open PRs, close PRs, or call gh;",
    "- do not create a final commit unless git rebase/merge conflict resolution requires it; ClawSweeper Repair checkpoints ordinary edits after you return;",
    "- ClawSweeper Repair will checkpoint and push your edits to the recovery branch after you return;",
    "- do not inspect or print environment variables, credentials, tokens, or secrets;",
    "- do not change auth, approval, sandbox, or trust-boundary semantics unless the artifact explicitly asks for that boundary change;",
    "- exec-adjacent bugs are allowed when the fix is ordinary correctness or hardening and does not redefine the security boundary;",
    "- before returning, verify git status/diff/log show a merge-ready branch state.",
    "",
    `Mode: ${mode}`,
    `Branch: ${branch}`,
    `Edit attempt: ${attempt ?? 1} of ${maxEditAttempts}`,
    reconcileWithBase
      ? "Existing repair branch detected. Reconcile the existing branch diff with the deterministic pre-edit rebase result before touching new code."
      : "",
    sourceHead ? `Source head before edit: ${sourceHead}` : "",
    rebaseResult ? renderRebaseResult(rebaseResult) : "",
    previousNoDiff
      ? "Previous attempt produced no target repo diff. This time make the smallest concrete code/test change that satisfies the artifact; do not return analysis only."
      : "",
    previousSummary ? `Previous no-diff summary: ${compactText(previousSummary, 1200)}` : "",
    fallbackReason ? `Fallback reason: ${fallbackReason}` : "",
    "",
    "Repository discovery context:",
    "```text",
    repositoryContext,
    "```",
    "",
    "Fix artifact:",
    "```json",
    JSON.stringify(fixArtifact, null, 2),
    "```",
  ]
    .filter(Boolean)
    .join("\n");
}

function renderChangelogRule(fixArtifact: LooseRecord) {
  const policyRule =
    "- target repository changelog policy wins over fix artifact credit notes: for openclaw/openclaw, never add forbidden `Thanks @codex`, `Thanks @openclaw`, or `Thanks @steipete` changelog attribution; preserve those source authors in PR body/history/source links instead, and use only allowed external GitHub usernames when a changelog thanks line is required;";
  if (fixArtifact.changelog_required !== true) {
    return [
      "- if you discover the target repository requires a changelog for this user-facing repair, add or repair that changelog entry before returning;",
      policyRule,
    ].join("\n");
  }
  return [
    "- changelog_required is true: you must inspect CHANGELOG.md and add or repair the required entry before returning;",
    "- the changelog entry must describe the user-facing change and preserve contributor/source PR attribution when available;",
    policyRule,
    "- do not leave the changelog for the automerge gate or a later repair pass.",
  ].join("\n");
}

function renderRebaseResult(rebaseResult: LooseRecord) {
  const status = String(rebaseResult.status ?? "unknown");
  const baseRef = String(rebaseResult.base_ref ?? "origin/main");
  const baseSha = String(rebaseResult.base_sha ?? "unknown");
  const detail = compactText(String(rebaseResult.detail ?? "").trim(), 800);
  return [
    `Deterministic pre-edit rebase: ${status} onto ${baseRef} (${baseSha}).`,
    status === "conflicts"
      ? "Resolve the active rebase conflicts, continue or finish the rebase, and leave the checkout in a normal non-rebasing state before returning."
      : "",
    detail ? `Rebase output: ${detail}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildRepositoryContext({ fixArtifact, targetDir }: LooseRecord) {
  const files = run("git", ["ls-files"], { cwd: targetDir })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const scoredCandidates = scoreRepositoryFiles({ files, fixArtifact }).slice(0, 80);
  const candidates = scoredCandidates.map((entry: JsonValue) => `${entry.file} (${entry.score})`);
  const snippets = buildRepositorySnippets({
    targetDir,
    candidates: scoredCandidates.slice(0, 12),
    fixArtifact,
  });
  const packageScripts = readPackageScripts(targetDir);
  return [
    `candidate_files (${candidates.length}):`,
    ...(candidates.length > 0
      ? candidates
      : ["none matched; use rg across the repo to find the real implementation files"]),
    "",
    "candidate_file_excerpts:",
    snippets || "none; inspect candidate files directly before editing",
    "",
    `validation_commands: ${(fixArtifact.validation_commands ?? []).join(" ; ")}`,
    `package_scripts: ${packageScripts.join(", ") || "none"}`,
  ].join("\n");
}

function buildRepositorySnippets({ targetDir, candidates, fixArtifact }: LooseRecord) {
  const tokens = discoveryTokens(fixArtifact).slice(0, 40);
  const out: JsonValue[] = [];
  for (const candidate of candidates) {
    const pathname = path.join(targetDir, candidate.file);
    if (!fs.existsSync(pathname)) continue;
    const stat = fs.statSync(pathname);
    if (!stat.isFile() || stat.size > 220_000) continue;
    const content = fs.readFileSync(pathname, "utf8");
    const excerpt = focusedFileExcerpt(content, tokens);
    if (!excerpt) continue;
    out.push(`--- ${candidate.file} ---\n${excerpt}`);
    if (out.join("\n\n").length > 18_000) break;
  }
  return out.join("\n\n").slice(0, 18_000);
}

function focusedFileExcerpt(content: string, tokens: string[]) {
  const lines = content.split(/\r?\n/);
  const matched = new Set<number>();
  const lowerTokens = tokens
    .map((token) => token.toLowerCase())
    .filter((token) => token.length >= 4);
  for (let index = 0; index < lines.length; index += 1) {
    const lower = lines[index].toLowerCase();
    if (lowerTokens.some((token) => lower.includes(token))) {
      for (
        let line = Math.max(0, index - 8);
        line <= Math.min(lines.length - 1, index + 18);
        line += 1
      ) {
        matched.add(line);
      }
    }
  }
  const selected =
    matched.size > 0
      ? [...matched].sort((left, right) => left - right)
      : lines.map((_, index) => index).slice(0, 80);
  const rendered: string[] = [];
  let previous = -2;
  for (const line of selected) {
    if (line !== previous + 1) rendered.push("...");
    rendered.push(`${line + 1}: ${lines[line]}`);
    previous = line;
    if (rendered.join("\n").length > 3_200) break;
  }
  return rendered.join("\n");
}

function scoreRepositoryFiles({ files, fixArtifact }: LooseRecord) {
  const likelyFiles = (fixArtifact.likely_files ?? [])
    .map((entry: JsonValue) => String(entry).trim())
    .filter(Boolean);
  const exactLikely = new Set(likelyFiles.filter((entry: JsonValue) => !entry.includes("*")));
  const literalHints = likelyFiles
    .map(literalPathHint)
    .filter((entry: string) => entry.length >= 4);
  const tokens = discoveryTokens(fixArtifact);
  const out: JsonValue[] = [];
  for (const file of files) {
    const lower = file.toLowerCase();
    let score = 0;
    if (exactLikely.has(file)) score += 100;
    for (const hint of literalHints) {
      if (lower.includes(hint)) score += 15;
    }
    for (const token of tokens) {
      if (lower.includes(token)) score += 3;
    }
    if (/\.(test|spec)\.[cm]?[jt]sx?$/i.test(file)) score += 2;
    if (/\.(ts|tsx|js|jsx|mjs|cjs|md|mdx|json)$/i.test(file)) score += 1;
    if (score > 0) out.push({ file, score });
  }
  out.sort(
    (left: JsonValue, right: JsonValue) =>
      right.score - left.score || left.file.localeCompare(right.file),
  );
  return out;
}

function literalPathHint(value: JsonValue) {
  return String(value)
    .toLowerCase()
    .replace(/\*\*?.*$/, "")
    .replace(/\/+$/, "");
}

function discoveryTokens(fixArtifact: LooseRecord) {
  const common = new Set([
    "support",
    "supported",
    "current",
    "existing",
    "validation",
    "commands",
    "summary",
    "scope",
    "error",
    "errors",
  ]);
  const text = [
    fixArtifact.summary,
    fixArtifact.pr_title,
    fixArtifact.pr_body,
    ...(fixArtifact.affected_surfaces ?? []),
    ...(fixArtifact.likely_files ?? []),
  ].join("\n");
  const tokens = new Set<string>();
  for (const match of text.toLowerCase().matchAll(/[a-z][a-z0-9_-]{3,}/g)) {
    const token = match[0].replace(/[-_]/g, "");
    if (token.length >= 4 && !common.has(token)) tokens.add(token);
  }
  return [...tokens].slice(0, 80);
}

function readPackageScripts(targetDir: string) {
  const packagePath = path.join(targetDir, "package.json");
  if (!fs.existsSync(packagePath)) return [];
  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    return Object.keys(pkg.scripts ?? {})
      .sort()
      .slice(0, 80);
  } catch {
    return [];
  }
}
