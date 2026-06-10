import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const repoRoot = process.cwd();

test("run-worker starts Codex in the target checkout when one is available", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-run-worker-"));
  const fakeBin = path.join(tmp, "bin");
  const targetCheckout = path.join(tmp, "target-openclaw");
  const cwdFile = path.join(tmp, "codex-cwd.txt");
  const argsFile = path.join(tmp, "codex-args.json");
  const jobPath = path.join(tmp, "run-worker-target-checkout.md");

  fs.mkdirSync(fakeBin, { recursive: true });
  fs.mkdirSync(targetCheckout, { recursive: true });
  fs.writeFileSync(path.join(targetCheckout, "target-marker.txt"), "target\n");
  fs.writeFileSync(
    path.join(fakeBin, "gh"),
    [
      "#!/usr/bin/env node",
      "const args = process.argv.slice(2);",
      "if (args[0] === 'api' && args[1] === 'repos/openclaw/openclaw/branches/main') {",
      "  process.stdout.write(JSON.stringify({ commit: { sha: '1111111111111111111111111111111111111111' } }));",
      "  process.exit(0);",
      "}",
      "process.stderr.write(`unexpected gh args: ${args.join(' ')}\\n`);",
      "process.exit(1);",
    ].join("\n"),
    { mode: 0o755 },
  );
  fs.writeFileSync(
    path.join(fakeBin, "codex"),
    [
      "#!/usr/bin/env node",
      "const fs = require('node:fs');",
      "fs.writeFileSync(process.env.FAKE_CODEX_CWD_FILE, process.cwd());",
      "fs.writeFileSync(process.env.FAKE_CODEX_ARGS_FILE, JSON.stringify(process.argv.slice(2)));",
      "const outputIndex = process.argv.indexOf('--output-last-message');",
      "const outputPath = process.argv[outputIndex + 1];",
      "const result = {",
      "  status: 'planned',",
      "  repo: 'openclaw/openclaw',",
      "  cluster_id: 'clawsweeper-run-worker-target-checkout',",
      "  mode: 'plan',",
      "  summary: 'fake codex result',",
      "  actions: [],",
      "  needs_human: [],",
      "  canonical: null,",
      "  canonical_issue: null,",
      "  canonical_pr: null,",
      "  merge_preflight: [],",
      "  fix_artifact: null,",
      "};",
      "fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\\n`);",
      'process.stdout.write(\'{"type":"fake"}\\n\');',
    ].join("\n"),
    { mode: 0o755 },
  );

  fs.writeFileSync(
    jobPath,
    [
      "---",
      "repo: openclaw/openclaw",
      "cluster_id: clawsweeper-run-worker-target-checkout",
      "mode: plan",
      "allowed_actions:",
      "  - fix",
      "source: clawsweeper_commit",
      "commit_sha: 1111111111111111111111111111111111111111",
      "security_policy: central_security_only",
      "security_sensitive: false",
      "---",
      "Plan only.",
      "",
    ].join("\n"),
  );

  try {
    execFileSync(process.execPath, ["dist/repair/run-worker.js", jobPath, "--mode", "plan"], {
      cwd: repoRoot,
      env: {
        ...process.env,
        CLAWSWEEPER_TARGET_CHECKOUT: targetCheckout,
        FAKE_CODEX_CWD_FILE: cwdFile,
        FAKE_CODEX_ARGS_FILE: argsFile,
        PATH: `${fakeBin}${path.delimiter}${process.env.PATH ?? ""}`,
      },
      stdio: "pipe",
    });

    assert.equal(fs.readFileSync(cwdFile, "utf8"), fs.realpathSync(targetCheckout));
    const args = JSON.parse(fs.readFileSync(argsFile, "utf8"));
    assert.equal(args[args.indexOf("--cd") + 1], targetCheckout);
  } finally {
    for (const runDir of fs.globSync(
      path.join(repoRoot, ".clawsweeper-repair/runs/run-worker-target-checkout-plan-*"),
    )) {
      fs.rmSync(runDir, { recursive: true, force: true });
    }
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("run-worker retries transient Codex failures before accepting a result", () => {
  const outcome = runRetryScenario({
    clusterId: "clawsweeper-run-worker-retry-success",
    failures: 2,
    attempts: 3,
  });

  assert.equal(outcome.invocations, 3);
  assert.equal(outcome.result.status, "planned");
  assert.equal(outcome.result.summary, "fake codex result");
});

test("run-worker leaves exhausted transient failures eligible for requeue", () => {
  const outcome = runRetryScenario({
    clusterId: "clawsweeper-run-worker-retry-exhausted",
    failures: 3,
    attempts: 2,
  });

  assert.equal(outcome.invocations, 2);
  assert.equal(outcome.result.status, "blocked");
  assert.match(String(outcome.result.summary), /rate limit reached/i);
  assert.deepEqual(outcome.result.needs_human, []);
  assert.equal(outcome.requeueRequired, true);
});

test("run-worker requeues transient failures while repairing invalid results", () => {
  const outcome = runRetryScenario({
    clusterId: "clawsweeper-run-worker-repair-retry-exhausted",
    failures: 0,
    attempts: 2,
    initialInvalidResult: true,
  });

  assert.equal(outcome.invocations, 3);
  assert.equal(outcome.result.status, "blocked");
  assert.match(String(outcome.result.summary), /rate limit reached/i);
  assert.equal(outcome.requeueRequired, true);
});

test("run-worker does not retry arbitrary model output mentioning issue 429", () => {
  const outcome = runRetryScenario({
    clusterId: "clawsweeper-run-worker-no-stdout-retry",
    failures: 3,
    attempts: 3,
    failureStream: "stdout",
    failureText: '{"type":"item.completed","text":"Issue #429 discusses HTTP retry behavior"}\n',
  });

  assert.equal(outcome.invocations, 1);
  assert.equal(outcome.result.status, "blocked");
  assert.equal(outcome.requeueRequired, false);
});

test("run-worker requeues before its shared Codex budget can exceed the workflow deadline", () => {
  const outcome = runRetryScenario({
    clusterId: "clawsweeper-run-worker-budget-exhausted",
    failures: 0,
    attempts: 4,
    codexTimeoutMs: 1_000,
    codexTotalTimeoutMs: 100,
  });

  assert.equal(outcome.invocations, 0);
  assert.equal(outcome.result.status, "blocked");
  assert.match(String(outcome.result.summary), /retry budget exhausted/i);
  assert.equal(outcome.requeueRequired, true);
});

function runRetryScenario({
  clusterId,
  failures,
  attempts,
  initialInvalidResult = false,
  failureStream = "stderr",
  failureText = "Rate limit reached for tokens per min (TPM). Please try again in 1ms.\n",
  codexTimeoutMs,
  codexTotalTimeoutMs,
}: {
  clusterId: string;
  failures: number;
  attempts: number;
  initialInvalidResult?: boolean;
  failureStream?: "stdout" | "stderr";
  failureText?: string;
  codexTimeoutMs?: number;
  codexTotalTimeoutMs?: number;
}) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-run-worker-retry-"));
  const fakeBin = path.join(tmp, "bin");
  const targetCheckout = path.join(tmp, "target-openclaw");
  const counterPath = path.join(tmp, "codex-invocations.txt");
  const jobPath = path.join(tmp, `${clusterId}.md`);

  fs.mkdirSync(fakeBin, { recursive: true });
  fs.mkdirSync(targetCheckout, { recursive: true });
  fs.writeFileSync(path.join(targetCheckout, "target-marker.txt"), "target\n");
  fs.writeFileSync(
    path.join(fakeBin, "gh"),
    [
      "#!/usr/bin/env node",
      "const args = process.argv.slice(2);",
      "if (args[0] === 'api' && args[1] === 'repos/openclaw/openclaw/branches/main') {",
      "  process.stdout.write(JSON.stringify({ commit: { sha: '1111111111111111111111111111111111111111' } }));",
      "  process.exit(0);",
      "}",
      "process.stderr.write(`unexpected gh args: ${args.join(' ')}\\n`);",
      "process.exit(1);",
    ].join("\n"),
    { mode: 0o755 },
  );
  fs.writeFileSync(
    path.join(fakeBin, "codex"),
    [
      "#!/usr/bin/env node",
      "const fs = require('node:fs');",
      "let count = 0;",
      "try { count = Number(fs.readFileSync(process.env.FAKE_CODEX_COUNTER, 'utf8')); } catch {}",
      "count += 1;",
      "fs.writeFileSync(process.env.FAKE_CODEX_COUNTER, String(count));",
      "const outputIndex = process.argv.indexOf('--output-last-message');",
      "const outputPath = process.argv[outputIndex + 1];",
      "if (process.env.FAKE_INITIAL_INVALID_RESULT === '1' && count === 1) {",
      '  fs.writeFileSync(outputPath, \'{"status":"planned"}\\n\');',
      '  process.stdout.write(\'{"type":"fake-invalid"}\\n\');',
      "  process.exit(0);",
      "}",
      "if ((process.env.FAKE_INITIAL_INVALID_RESULT === '1' && count > 1) || count <= Number(process.env.FAKE_CODEX_FAILURES)) {",
      "  const staleResult = {",
      "    status: 'planned',",
      "    repo: 'openclaw/openclaw',",
      "    cluster_id: process.env.FAKE_CLUSTER_ID,",
      "    mode: 'plan',",
      "    summary: 'stale result from failed attempt',",
      "    actions: [],",
      "    needs_human: [],",
      "    canonical: null,",
      "    canonical_issue: null,",
      "    canonical_pr: null,",
      "    merge_preflight: [],",
      "    fix_artifact: null,",
      "  };",
      "  fs.writeFileSync(outputPath, `${JSON.stringify(staleResult, null, 2)}\\n`);",
      "  process[process.env.FAKE_CODEX_FAILURE_STREAM].write(process.env.FAKE_CODEX_FAILURE_TEXT);",
      "  process.exit(1);",
      "}",
      "const result = {",
      "  status: 'planned',",
      "  repo: 'openclaw/openclaw',",
      "  cluster_id: process.env.FAKE_CLUSTER_ID,",
      "  mode: 'plan',",
      "  summary: 'fake codex result',",
      "  actions: [],",
      "  needs_human: [],",
      "  canonical: null,",
      "  canonical_issue: null,",
      "  canonical_pr: null,",
      "  merge_preflight: [],",
      "  fix_artifact: null,",
      "};",
      "fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\\n`);",
      'process.stdout.write(\'{"type":"fake"}\\n\');',
    ].join("\n"),
    { mode: 0o755 },
  );
  fs.writeFileSync(
    jobPath,
    [
      "---",
      "repo: openclaw/openclaw",
      `cluster_id: ${clusterId}`,
      "mode: plan",
      "allowed_actions:",
      "  - fix",
      "source: clawsweeper_commit",
      "commit_sha: 1111111111111111111111111111111111111111",
      "security_policy: central_security_only",
      "security_sensitive: false",
      "---",
      "Plan only.",
      "",
    ].join("\n"),
  );

  try {
    execFileSync(process.execPath, ["dist/repair/run-worker.js", jobPath, "--mode", "plan"], {
      cwd: repoRoot,
      env: {
        ...process.env,
        CLAWSWEEPER_TARGET_CHECKOUT: targetCheckout,
        CLAWSWEEPER_CODEX_TRANSPORT_ATTEMPTS: String(attempts),
        CLAWSWEEPER_CODEX_RETRY_DELAY_MS: "1",
        CLAWSWEEPER_CODEX_RETRY_JITTER_MS: "0",
        ...(codexTimeoutMs ? { CLAWSWEEPER_CODEX_TIMEOUT_MS: String(codexTimeoutMs) } : {}),
        ...(codexTotalTimeoutMs
          ? { CLAWSWEEPER_CODEX_TOTAL_TIMEOUT_MS: String(codexTotalTimeoutMs) }
          : {}),
        CLAWSWEEPER_CODEX_DEADLINE_RESERVE_MS: "0",
        CLAWSWEEPER_RESULT_REPAIR_ATTEMPTS: "1",
        FAKE_CLUSTER_ID: clusterId,
        FAKE_CODEX_COUNTER: counterPath,
        FAKE_CODEX_FAILURES: String(failures),
        FAKE_CODEX_FAILURE_STREAM: failureStream,
        FAKE_CODEX_FAILURE_TEXT: failureText,
        FAKE_INITIAL_INVALID_RESULT: initialInvalidResult ? "1" : "0",
        PATH: `${fakeBin}${path.delimiter}${process.env.PATH ?? ""}`,
      },
      stdio: "pipe",
    });

    const runDirs = fs.globSync(
      path.join(repoRoot, `.clawsweeper-repair/runs/${clusterId}-plan-*`),
    );
    assert.equal(runDirs.length, 1);
    return {
      invocations: fs.existsSync(counterPath) ? Number(fs.readFileSync(counterPath, "utf8")) : 0,
      result: JSON.parse(fs.readFileSync(path.join(runDirs[0], "result.json"), "utf8")),
      requeueRequired: fs.existsSync(path.join(runDirs[0], "worker-requeue.json")),
    };
  } finally {
    for (const runDir of fs.globSync(
      path.join(repoRoot, `.clawsweeper-repair/runs/${clusterId}-plan-*`),
    )) {
      fs.rmSync(runDir, { recursive: true, force: true });
    }
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}
