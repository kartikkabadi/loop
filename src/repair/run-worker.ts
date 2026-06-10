#!/usr/bin/env node
import type { JsonValue, LooseRecord } from "./json-types.js";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { deterministicAutomergeResult } from "./deterministic-automerge-result.js";
import {
  assertAllowedOwner,
  makeRunDir,
  parseArgs,
  parseJob,
  renderPrompt,
  repoRoot,
  validateJob,
} from "./lib.js";
import {
  codexSubprocessEnv,
  repairCodexReasoningEffort,
  repairCodexServiceTier,
} from "./process-env.js";
import { redactSecrets } from "./collect-codex-debug.js";
import { isRetryableCodexTransportError } from "./codex-transient.js";
import { sleepMs } from "./timing.js";
import { sanitizeResultEvidence } from "./url-safety.js";

const args = parseArgs(process.argv.slice(2));
const jobPath = args._[0];
const mode = args.mode ?? "plan";
const dryRun = Boolean(args["dry-run"] || process.env.CLAWSWEEPER_DRY_RUN === "1");
const model = args.model ?? "internal";
const codexTimeoutMs = Number(process.env.CLAWSWEEPER_CODEX_TIMEOUT_MS ?? 30 * 60 * 1000);
const resultRepairAttempts = Math.max(
  0,
  Number(process.env.CLAWSWEEPER_RESULT_REPAIR_ATTEMPTS ?? 1),
);
const resultRepairTimeoutMs = Number(
  process.env.CLAWSWEEPER_RESULT_REPAIR_TIMEOUT_MS ?? 10 * 60 * 1000,
);
const codexReasoningEffort = repairCodexReasoningEffort();
const codexServiceTier = repairCodexServiceTier();
const codexStdioMaxBuffer =
  Math.max(1, Number(process.env.CLAWSWEEPER_CODEX_STDIO_MAX_BUFFER_MB ?? 128)) * 1024 * 1024;
const codexHeartbeatMs = Math.max(
  10_000,
  Number(process.env.CLAWSWEEPER_CODEX_HEARTBEAT_MS ?? 60_000),
);
const codexTransportAttempts = Math.max(
  1,
  Number(process.env.CLAWSWEEPER_CODEX_TRANSPORT_ATTEMPTS ?? 4),
);
const codexRetryBaseDelayMs = Math.max(
  1,
  Number(process.env.CLAWSWEEPER_CODEX_RETRY_DELAY_MS ?? 30_000),
);
const codexRetryJitterMs = Math.max(
  0,
  Number(process.env.CLAWSWEEPER_CODEX_RETRY_JITTER_MS ?? 10_000),
);
const codexTotalTimeoutMs = Math.max(
  1,
  Number(process.env.CLAWSWEEPER_CODEX_TOTAL_TIMEOUT_MS ?? 75 * 60 * 1000),
);
const codexDeadlineReserveMs = Math.max(
  0,
  Number(process.env.CLAWSWEEPER_CODEX_DEADLINE_RESERVE_MS ?? 5 * 60 * 1000),
);
const codexDeadlineAt = Date.now() + codexTotalTimeoutMs;

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

assertAllowedOwner(job.frontmatter.repo, process.env.CLAWSWEEPER_ALLOWED_OWNER);

if ((mode === "execute" || mode === "autonomous") && !dryRun) {
  if (job.frontmatter.mode !== mode) {
    throw new Error(`refusing ${mode}: job frontmatter mode is not ${mode}`);
  }
  if (process.env.CLAWSWEEPER_ALLOW_EXECUTE !== "1") {
    throw new Error(`refusing ${mode}: CLAWSWEEPER_ALLOW_EXECUTE must be 1`);
  }
}

const runDir = makeRunDir(job, mode);
const promptPath = path.join(runDir, "prompt.md");
const resultPath = path.join(runDir, "result.json");
const requeueMarkerPath = path.join(runDir, "worker-requeue.json");
const transcriptPath = path.join(runDir, "codex.jsonl");
const promptContext: Record<string, string> = {};
const targetCheckout = dryRun ? "" : prepareTargetCheckout(job);
if (targetCheckout) {
  process.env.CLAWSWEEPER_TARGET_CHECKOUT = targetCheckout;
  promptContext.targetCheckout = targetCheckout;
}

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
  const deterministicResult = readDeterministicResultIfAvailable({
    job,
    mode,
    clusterPlanPath: promptContext.clusterPlanPath,
  });
  if (deterministicResult) {
    sanitizeResultEvidence(deterministicResult);
    fs.writeFileSync(resultPath, `${JSON.stringify(deterministicResult, null, 2)}\n`);
    console.log(`result: ${path.relative(repoRoot(), resultPath)}`);
    process.exit(0);
  }
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
  sanitizeResultEvidence(dryResult);
  fs.writeFileSync(resultPath, `${JSON.stringify(dryResult, null, 2)}\n`);
  console.log(JSON.stringify(dryResult, null, 2));
  process.exit(0);
}

const child = await runCodexWithRetry({
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

if (child.error) {
  const detail = codexChildFailureDetail(child);
  writeBlockedResult(compactCodexFailure(detail), {
    requeueRequired: isRetryableCodexTransportError(codexTransportFailureDetail(child)),
  });
  console.error(detail);
  process.exit(0);
}

if (child.status !== 0) {
  const detail = codexChildFailureDetail(child);
  writeBlockedResult(compactCodexFailure(detail), {
    requeueRequired: isRetryableCodexTransportError(codexTransportFailureDetail(child)),
  });
  console.error(detail);
  process.exit(0);
}

if (!fs.existsSync(resultPath)) {
  writeBlockedResult("Codex worker completed without a structured result.json artifact.");
}
sanitizeResultFile(resultPath);
await repairResultIfNeeded();
sanitizeResultFile(resultPath);

console.log(`result: ${path.relative(repoRoot(), resultPath)}`);

function readDeterministicResultIfAvailable({
  job,
  mode,
  clusterPlanPath,
}: LooseRecord): LooseRecord | null {
  if (process.env.CLAWSWEEPER_DETERMINISTIC_AUTOMERGE_REPAIRS === "0") return null;
  if (!fs.existsSync(String(clusterPlanPath))) return null;
  const clusterPlan = JSON.parse(fs.readFileSync(String(clusterPlanPath), "utf8"));
  return deterministicAutomergeResult({ job, mode, clusterPlan });
}

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
    codexWorkspaceRoot(),
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

  return spawnCodexWithHeartbeat({
    args: codexArgs,
    cwd: codexWorkspaceRoot(),
    input: String(input ?? ""),
    transcriptPath: codexTranscriptPath,
    stderrPath,
    timeoutMs: Number(timeoutMs),
  });
}

async function runCodexWithRetry(options: LooseRecord): Promise<LooseRecord> {
  let child: LooseRecord = {};
  const outputPath = String(options.outputPath);
  for (let attempt = 1; attempt <= codexTransportAttempts; attempt += 1) {
    const requestedTimeoutMs = Math.max(1, Number(options.timeoutMs));
    const remainingTimeoutMs = codexDeadlineAt - Date.now() - codexDeadlineReserveMs;
    if (remainingTimeoutMs < requestedTimeoutMs) {
      return Object.keys(child).length > 0 ? child : codexBudgetExhaustedChild();
    }
    // Every attempt uses an isolated result; only a successful attempt becomes canonical.
    const attemptOutputPath = suffixedAttemptPath(outputPath, attempt);
    fs.rmSync(attemptOutputPath, { force: true });
    child = await runCodex({
      ...options,
      outputPath: attemptOutputPath,
      transcriptPath: attemptPath(String(options.transcriptPath), attempt),
      stderrPath: attemptPath(String(options.stderrPath), attempt),
    });
    const transportDetail = codexTransportFailureDetail(child);
    if (child.status === 0 && !child.error) {
      if (fs.existsSync(attemptOutputPath)) {
        fs.copyFileSync(attemptOutputPath, outputPath);
      }
      return child;
    }
    if (
      (child.error as JsonValue)?.code === "ETIMEDOUT" ||
      !isRetryableCodexTransportError(transportDetail) ||
      attempt === codexTransportAttempts
    ) {
      return child;
    }

    const delayMs = codexRetryDelayMs(transportDetail, attempt);
    console.warn(
      `Codex transport failure on attempt ${attempt}/${codexTransportAttempts}; retrying in ${delayMs}ms`,
    );
    sleepMs(delayMs);
  }
  return child;
}

function codexBudgetExhaustedChild(): LooseRecord {
  return {
    status: 1,
    stderr:
      "Codex transport retry budget exhausted before the workflow deadline; service temporarily unavailable.",
  };
}

function attemptPath(filePath: string, attempt: number): string {
  if (attempt === 1) return filePath;
  return suffixedAttemptPath(filePath, attempt);
}

function suffixedAttemptPath(filePath: string, attempt: number): string {
  const extension = path.extname(filePath);
  if (!extension) return `${filePath}-attempt-${attempt}`;
  return `${filePath.slice(0, -extension.length)}-attempt-${attempt}${extension}`;
}

function codexChildFailureDetail(child: LooseRecord): string {
  return [
    (child.error as LooseRecord | undefined)?.message,
    child.stderr,
    child.stdout,
    child.status === null || child.status === undefined ? "" : `exit code ${child.status}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function codexTransportFailureDetail(child: LooseRecord): string {
  return [
    (child.error as LooseRecord | undefined)?.message,
    child.stderr,
    extractCodexJsonlFailure(child.stdout),
    extractCodexJsonlFailure(child.stderr),
  ]
    .filter(Boolean)
    .join("\n");
}

function extractCodexJsonlFailure(value: JsonValue): string | null {
  const messages: string[] = [];
  for (const line of String(value ?? "").split(/\r?\n/)) {
    if (!line.trim()) continue;
    let event: LooseRecord;
    try {
      event = JSON.parse(line);
    } catch {
      continue;
    }
    if (event.type === "error" && typeof event.message === "string") {
      messages.push(event.message);
    }
    if (
      event.type === "turn.failed" &&
      typeof (event.error as LooseRecord | undefined)?.message === "string"
    ) {
      messages.push(String((event.error as LooseRecord).message));
    }
  }
  return messages.length > 0 ? (messages.at(-1) ?? null) : null;
}

function codexRetryDelayMs(detail: string, attempt: number): number {
  const retryAfterMatch = detail.match(
    /(?:retry|try again)(?: after| in)?\s*(\d+(?:\.\d+)?)\s*(ms|milliseconds?|s|seconds?)/i,
  );
  const parsedRetryMs = retryAfterMatch
    ? Number(retryAfterMatch[1]) * (retryAfterMatch[2]?.toLowerCase().startsWith("m") ? 1 : 1_000)
    : 0;
  const jitterMs = codexRetryJitterMs > 0 ? Math.floor(Math.random() * codexRetryJitterMs) : 0;
  return Math.min(120_000, Math.max(parsedRetryMs, codexRetryBaseDelayMs * attempt + jitterMs));
}

function compactCodexFailure(detail: string): string {
  const publicDetail = sanitizeCodexOutput(detail);
  const maxLength = 4_000;
  const tail =
    publicDetail.length > maxLength
      ? publicDetail.slice(publicDetail.length - maxLength)
      : publicDetail;
  return `Codex worker failed:\n${tail}`;
}

function spawnCodexWithHeartbeat({
  args: commandArgs,
  cwd,
  input,
  transcriptPath: codexTranscriptPath,
  stderrPath,
  timeoutMs,
}: LooseRecord): Promise<LooseRecord> {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    let stdout = "";
    let stderr = "";
    let stdoutBytes = 0;
    let stderrBytes = 0;
    let settled = false;
    let timeoutError: Error | null = null;
    let bufferError: Error | null = null;

    const child = spawn("codex", commandArgs, {
      cwd,
      env: codexEnv(),
      stdio: ["pipe", "pipe", "pipe"],
    });

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");

    const heartbeat = setInterval(() => {
      const elapsedSeconds = Math.round((Date.now() - startedAt) / 1000);
      console.log(
        `[clawsweeper repair] ${new Date().toISOString()} Codex worker still running (${elapsedSeconds}s elapsed)`,
      );
    }, codexHeartbeatMs);
    const timeout = setTimeout(() => {
      timeoutError = new Error(`Codex worker timed out after ${timeoutMs}ms`);
      (timeoutError as LooseRecord).code = "ETIMEDOUT";
      child.kill("SIGTERM");
      setTimeout(() => {
        if (!settled) child.kill("SIGKILL");
      }, 5_000).unref();
    }, timeoutMs);

    const finish = (result: LooseRecord) => {
      if (settled) return;
      settled = true;
      clearInterval(heartbeat);
      clearTimeout(timeout);
      const publicStdout = sanitizeCodexOutput(stdout);
      const publicStderr = sanitizeCodexOutput(stderr);
      fs.writeFileSync(codexTranscriptPath, publicStdout);
      if (publicStderr) fs.writeFileSync(stderrPath, publicStderr);
      resolve({ ...result, stdout: publicStdout, stderr: publicStderr });
    };

    const append = (stream: "stdout" | "stderr", chunk: JsonValue) => {
      const text = String(chunk ?? "");
      const bytes = Buffer.byteLength(text);
      if (stream === "stdout") {
        stdout += text;
        stdoutBytes += bytes;
      } else {
        stderr += text;
        stderrBytes += bytes;
      }
      if (stdoutBytes + stderrBytes > codexStdioMaxBuffer && !bufferError) {
        bufferError = new Error(`Codex output exceeded ${codexStdioMaxBuffer} bytes`);
        (bufferError as LooseRecord).code = "ENOBUFS";
        child.kill("SIGTERM");
      }
    };

    child.stdout.on("data", (chunk) => append("stdout", chunk));
    child.stderr.on("data", (chunk) => append("stderr", chunk));
    child.on("error", (error) => {
      finish({ status: null, stdout, stderr, error });
    });
    child.on("close", (status, signal) => {
      finish({
        status,
        signal,
        stdout,
        stderr,
        error: timeoutError ?? bufferError ?? undefined,
      });
    });
    child.stdin.end(input);
  });
}

function codexWorkspaceRoot(): string {
  return targetCheckout || repoRoot();
}

function codexConfigArgs() {
  const configs = [
    'approval_policy="never"',
    `model_reasoning_effort=${JSON.stringify(codexReasoningEffort)}`,
  ];
  if (codexServiceTier) configs.push(`service_tier=${JSON.stringify(codexServiceTier)}`);
  return configs.flatMap((config: JsonValue) => ["-c", config]);
}

function sanitizeCodexOutput(value: string) {
  return redactSecrets(value);
}

async function repairResultIfNeeded() {
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

    const repair = await runCodexWithRetry({
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
      const detail = codexChildFailureDetail(repair);
      console.error(detail || `Codex result repair exited ${repair.status}`);
      if (isRetryableCodexTransportError(codexTransportFailureDetail(repair))) {
        fs.rmSync(resultPath, { force: true });
        writeBlockedResult(compactCodexFailure(detail), { requeueRequired: true });
      }
      return;
    }
    sanitizeResultFile(resultPath);
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

function prepareTargetCheckout(job: LooseRecord): string {
  const explicit = stringValue(job.frontmatter.target_checkout);
  if (explicit) return explicit;

  const fromEnv = stringValue(process.env.CLAWSWEEPER_TARGET_CHECKOUT);
  if (fromEnv) return fromEnv;

  const targetRepo = String(job.frontmatter.repo ?? "");
  if (process.env.GITHUB_REPOSITORY === targetRepo) return repoRoot();

  const targetRoot = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-target-"));
  const targetDir = path.join(targetRoot, targetRepo.replace(/[^A-Za-z0-9_.-]+/g, "-"));
  runCommand("gh", ["repo", "clone", targetRepo, targetDir, "--", "--depth=1"]);
  return targetDir;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function runCommand(command: string, commandArgs: string[]) {
  const result = spawnSync(command, commandArgs, {
    cwd: repoRoot(),
    encoding: "utf8",
    env: process.env,
  });
  if (result.status !== 0) {
    throw new Error(
      `${command} ${commandArgs.join(" ")} failed: ${result.stderr || result.stdout}`,
    );
  }
}

function writeBlockedResult(
  summary: LooseRecord,
  { requeueRequired = false }: { requeueRequired?: boolean } = {},
) {
  if (fs.existsSync(resultPath)) return;
  const publicSummary = sanitizeCodexOutput(String(summary));
  const result = {
    status: "blocked",
    repo: job.frontmatter.repo,
    cluster_id: job.frontmatter.cluster_id,
    mode,
    summary: publicSummary,
    actions: [],
    needs_human: requeueRequired ? [] : [publicSummary],
    canonical: null,
    canonical_issue: null,
    canonical_pr: null,
    merge_preflight: [],
    fix_artifact: null,
  };
  sanitizeResultEvidence(result);
  fs.writeFileSync(resultPath, `${JSON.stringify(result, null, 2)}\n`);
  if (requeueRequired) {
    fs.writeFileSync(
      requeueMarkerPath,
      `${JSON.stringify({ requeue_required: true, reason: "codex_transport_failure" }, null, 2)}\n`,
    );
  }
}

function sanitizeResultFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return;
  }
  if (!parsed || typeof parsed !== "object") return;
  sanitizeResultEvidence(parsed as LooseRecord);
  fs.writeFileSync(filePath, `${JSON.stringify(parsed, null, 2)}\n`);
}
