#!/usr/bin/env node
import type { JsonValue, LooseRecord } from "./json-types.js";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import {
  assertAllowedOwner,
  makeRunDir,
  parseArgs,
  parseJob,
  renderPrompt,
  repoRoot,
  validateJob,
} from "./lib.js";
import { codexSubprocessEnv } from "./process-env.js";

const args = parseArgs(process.argv.slice(2));
const jobPath = args._[0];
const mode = args.mode ?? "plan";
const dryRun = Boolean(args["dry-run"] || process.env.CLAWSWEEPER_REPAIR_DRY_RUN === "1");
const model = args.model ?? process.env.CLAWSWEEPER_REPAIR_MODEL ?? "gpt-5.5";
const codexTimeoutMs = Number(process.env.CLAWSWEEPER_REPAIR_CODEX_TIMEOUT_MS ?? 30 * 60 * 1000);
const resultRepairAttempts = Math.max(
  0,
  Number(process.env.CLAWSWEEPER_REPAIR_RESULT_REPAIR_ATTEMPTS ?? 1),
);
const resultRepairTimeoutMs = Number(
  process.env.CLAWSWEEPER_REPAIR_RESULT_REPAIR_TIMEOUT_MS ?? 10 * 60 * 1000,
);
const codexReasoningEffort = String(
  process.env.CLAWSWEEPER_REPAIR_CODEX_REASONING_EFFORT ?? "medium",
);
const codexServiceTier = String(process.env.CLAWSWEEPER_REPAIR_CODEX_SERVICE_TIER ?? "fast").trim();

if (!jobPath) {
  console.error(
    "usage: node scripts/run-worker.ts <job.md> --mode plan|execute|autonomous [--dry-run]",
  );
  process.exit(2);
}
if (!["plan", "execute", "autonomous"].includes(mode)) {
  console.error("mode must be plan, execute, or autonomous");
  process.exit(2);
}

const job = parseJob(jobPath);
const errors = validateJob(job);
if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

assertAllowedOwner(job.frontmatter.repo, process.env.CLAWSWEEPER_REPAIR_ALLOWED_OWNER);

if ((mode === "execute" || mode === "autonomous") && !dryRun) {
  if (job.frontmatter.mode !== mode) {
    throw new Error(`refusing ${mode}: job frontmatter mode is not ${mode}`);
  }
  if (process.env.CLAWSWEEPER_REPAIR_ALLOW_EXECUTE !== "1") {
    throw new Error(`refusing ${mode}: CLAWSWEEPER_REPAIR_ALLOW_EXECUTE must be 1`);
  }
}

const runDir = makeRunDir(job, mode);
const promptPath = path.join(runDir, "prompt.md");
const resultPath = path.join(runDir, "result.json");
const transcriptPath = path.join(runDir, "codex.jsonl");
const promptContext: Record<string, string> = {};

if (!dryRun) {
  const plannerArgs = [
    path.join(repoRoot(), "dist/repair/plan-cluster.js"),
    jobPath,
    "--run-dir",
    runDir,
  ];
  const planner = spawnSync(process.execPath, plannerArgs, {
    cwd: repoRoot(),
    encoding: "utf8",
    env: process.env,
  });
  if (planner.status !== 0) {
    console.error(planner.stderr || planner.stdout);
    process.exit(planner.status ?? 1);
  }
  promptContext.clusterPlanPath = path.join(runDir, "cluster-plan.json");
  promptContext.fixArtifactPath = path.join(runDir, "fix-artifact.json");
} else if (mode === "autonomous") {
  const plannerArgs = [
    path.join(repoRoot(), "dist/repair/plan-cluster.js"),
    jobPath,
    "--run-dir",
    runDir,
    "--offline",
  ];
  const planner = spawnSync(process.execPath, plannerArgs, {
    cwd: repoRoot(),
    encoding: "utf8",
    env: process.env,
  });
  if (planner.status !== 0) {
    console.error(planner.stderr || planner.stdout);
    process.exit(planner.status ?? 1);
  }
  promptContext.clusterPlanPath = path.join(runDir, "cluster-plan.json");
  promptContext.fixArtifactPath = path.join(runDir, "fix-artifact.json");
}

const prompt = renderPrompt(job, mode, promptContext);

fs.writeFileSync(promptPath, prompt);

if (dryRun) {
  const dryResult = {
    status: "planned",
    repo: job.frontmatter.repo,
    cluster_id: job.frontmatter.cluster_id,
    mode,
    summary: "dry run only; prompt rendered but Codex was not invoked",
    actions: [],
    prompt_path: path.relative(repoRoot(), promptPath),
  };
  fs.writeFileSync(resultPath, `${JSON.stringify(dryResult, null, 2)}\n`);
  console.log(JSON.stringify(dryResult, null, 2));
  process.exit(0);
}

const child = runCodex({
  input: prompt,
  outputPath: resultPath,
  transcriptPath,
  stderrPath: path.join(runDir, "codex.stderr.log"),
  timeoutMs: codexTimeoutMs,
});

if ((child.error as JsonValue)?.code === "ETIMEDOUT") {
  writeBlockedResult(`Codex worker timed out after ${codexTimeoutMs}ms`);
  console.error(`Codex worker timed out after ${codexTimeoutMs}ms`);
  process.exit(0);
}

if (child.status !== 0) {
  const detail = child.stderr || child.stdout || `Codex worker exited ${child.status}`;
  writeBlockedResult(detail.trim());
  console.error(detail);
  process.exit(0);
}

repairResultIfNeeded();

console.log(`result: ${path.relative(repoRoot(), resultPath)}`);

function runCodex({
  input,
  outputPath,
  transcriptPath: codexTranscriptPath,
  stderrPath,
  timeoutMs,
}: LooseRecord) {
  const codexArgs = [
    "exec",
    "--cd",
    repoRoot(),
    "--model",
    model,
    "--sandbox",
    "read-only",
    ...codexConfigArgs(),
    "--output-schema",
    path.join(repoRoot(), "schema", "repair", "codex-result.schema.json"),
    "--output-last-message",
    outputPath,
    "--ephemeral",
    "--json",
    "-",
  ];

  const child = spawnSync("codex", codexArgs, {
    cwd: repoRoot(),
    input,
    encoding: "utf8",
    env: codexEnv(),
    timeout: timeoutMs,
  });

  fs.writeFileSync(codexTranscriptPath, child.stdout ?? "");
  if (child.stderr) fs.writeFileSync(stderrPath, child.stderr);
  return child;
}

function codexConfigArgs() {
  const configs = [
    'approval_policy="never"',
    `model_reasoning_effort=${JSON.stringify(codexReasoningEffort)}`,
  ];
  if (codexServiceTier) configs.push(`service_tier=${JSON.stringify(codexServiceTier)}`);
  return configs.flatMap((config: JsonValue) => ["-c", config]);
}

function repairResultIfNeeded() {
  for (let attempt = 1; attempt <= resultRepairAttempts; attempt += 1) {
    const review = reviewResult();
    if (review.status === 0) return;
    fs.writeFileSync(
      path.join(runDir, `review-results-failed-${attempt}.json`),
      review.stdout || review.stderr || "",
    );
    if (!fs.existsSync(resultPath)) return;

    const beforePath = path.join(runDir, `result.before-repair-${attempt}.json`);
    fs.copyFileSync(resultPath, beforePath);
    const repairPrompt = [
      "You are repairing a ClawSweeper Repair structured JSON result that failed deterministic validation.",
      "",
      "Do not mutate GitHub. Do not change the job scope. Return a complete replacement JSON result only.",
      "Fix the validation failures with the narrowest safe changes. If a PR closeout comment is missing contributor credit, update that action comment to explicitly preserve credit, including wording such as `credit`, `attribution`, `thanks @user`, or `source PR`, and keep the canonical/fix links intact.",
      "If a validator failure reveals that an action is not safely repairable from the provided artifacts, downgrade only that action to a non-mutating `keep_related`, `keep_independent`, blocked fix-first action, or `needs_human` with exact evidence.",
      "",
      "## Validator output",
      "```json",
      (review.stdout || review.stderr || "").trim(),
      "```",
      "",
      "## Current result JSON",
      "```json",
      fs.readFileSync(beforePath, "utf8").trim(),
      "```",
      "",
      "## Original worker prompt",
      "```md",
      prompt,
      "```",
    ].join("\n");

    const repair = runCodex({
      input: repairPrompt,
      outputPath: resultPath,
      transcriptPath: path.join(runDir, `codex-repair-${attempt}.jsonl`),
      stderrPath: path.join(runDir, `codex-repair-${attempt}.stderr.log`),
      timeoutMs: resultRepairTimeoutMs,
    });
    if ((repair.error as JsonValue)?.code === "ETIMEDOUT") {
      console.error(`Codex result repair timed out after ${resultRepairTimeoutMs}ms`);
      return;
    }
    if (repair.status !== 0) {
      console.error(
        repair.stderr || repair.stdout || `Codex result repair exited ${repair.status}`,
      );
      return;
    }
  }
}

function reviewResult() {
  return spawnSync(
    process.execPath,
    [path.join(repoRoot(), "dist/repair/review-results.js"), runDir],
    {
      cwd: repoRoot(),
      encoding: "utf8",
      env: process.env,
    },
  );
}

function codexEnv() {
  return codexSubprocessEnv();
}

function writeBlockedResult(summary: LooseRecord) {
  if (fs.existsSync(resultPath)) return;
  const result = {
    status: "blocked",
    repo: job.frontmatter.repo,
    cluster_id: job.frontmatter.cluster_id,
    mode,
    summary,
    actions: [],
    needs_human: [summary],
    canonical: null,
    canonical_issue: null,
    canonical_pr: null,
    fix_artifact: null,
  };
  fs.writeFileSync(resultPath, `${JSON.stringify(result, null, 2)}\n`);
}
