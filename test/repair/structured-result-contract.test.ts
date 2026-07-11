import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import {
  DEFAULT_RESULT_MAX_BYTES,
  parseAndValidateResultContract,
  parseExactJsonObject,
  validateResultContract,
  type ResultContractName,
} from "../../dist/result-contracts.js";

const FIXTURE_ROOT = join(process.cwd(), "test/fixtures/result-contracts");
const REVIEW_RESULTS = join(process.cwd(), "dist/repair/review-results.js");

function loadFixture(rel: string): unknown {
  return JSON.parse(readFileSync(join(FIXTURE_ROOT, rel), "utf8"));
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function firstError(
  contract: ResultContractName,
  value: unknown,
): { code: string; instancePath: string; keyword?: string } {
  const result = validateResultContract(contract, value);
  assert.equal(result.ok, false);
  assert.ok(result.errors.length > 0);
  const err = result.errors[0]!;
  return {
    code: err.code,
    instancePath: err.instancePath,
    ...(err.keyword !== undefined ? { keyword: err.keyword } : {}),
  };
}

function runReviewResults(dir: string): {
  status: number | null;
  stdout: string;
  stderr: string;
} {
  const child = spawnSync(process.execPath, [REVIEW_RESULTS, dir], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: {
      ...process.env,
      CODEX_BIN: "/nonexistent/codex-must-not-run",
      OPENAI_API_KEY: "",
    },
  });
  return {
    status: child.status,
    stdout: child.stdout ?? "",
    stderr: child.stderr ?? "",
  };
}

test("parseExactJsonObject accepts a valid object and surrounding whitespace", () => {
  const parsed = parseExactJsonObject('  \n{"a":1}\n  ');
  assert.equal(parsed.ok, true);
  if (parsed.ok) assert.deepEqual(parsed.value, { a: 1 });
});

test("parseExactJsonObject rejects empty, fenced, prose, multi-value, array, and primitive", () => {
  assert.equal(parseExactJsonObject("").ok, false);
  assert.equal(parseExactJsonObject("   ").ok, false);
  assert.equal(parseExactJsonObject("").error?.code, "E_RESULT_EMPTY");

  const fenced = parseExactJsonObject('```json\n{"a":1}\n```');
  assert.equal(fenced.ok, false);
  assert.equal(fenced.error?.code, "E_RESULT_EXTRA_TEXT");

  const leading = parseExactJsonObject('note {"a":1}');
  assert.equal(leading.ok, false);
  assert.equal(leading.error?.code, "E_RESULT_EXTRA_TEXT");

  const trailing = parseExactJsonObject('{"a":1} trailing');
  assert.equal(trailing.ok, false);
  assert.equal(trailing.error?.code, "E_RESULT_EXTRA_TEXT");

  const two = parseExactJsonObject('{"a":1}{"b":2}');
  assert.equal(two.ok, false);
  assert.equal(two.error?.code, "E_RESULT_EXTRA_TEXT");

  const arr = parseExactJsonObject("[1]");
  assert.equal(arr.ok, false);
  assert.equal(arr.error?.code, "E_RESULT_NOT_OBJECT");

  const prim = parseExactJsonObject('"x"');
  assert.equal(prim.ok, false);
  assert.equal(prim.error?.code, "E_RESULT_NOT_OBJECT");
});

test("parseExactJsonObject enforces UTF-8 byte cap", () => {
  const emoji = "😀"; // 4 UTF-8 bytes
  const oversized = parseExactJsonObject(`{"x":"${emoji}"}`, { maxBytes: 8 });
  assert.equal(oversized.ok, false);
  assert.equal(oversized.error?.code, "E_RESULT_TOO_LARGE");

  const within = parseExactJsonObject(`{"x":1}`, { maxBytes: 16 });
  assert.equal(within.ok, true);

  assert.equal(DEFAULT_RESULT_MAX_BYTES, 1_048_576);
});

test("decision schema accepts complete valid fixture", () => {
  const value = loadFixture("decision.valid.json");
  const result = validateResultContract("clawsweeper-decision", value);
  assert.equal(result.ok, true);

  const roundTrip = parseAndValidateResultContract("clawsweeper-decision", JSON.stringify(value));
  assert.equal(roundTrip.ok, true);
});

test("decision schema rejects missing, unknown, enum, nested, and type errors", () => {
  const base = loadFixture("decision.valid.json") as Record<string, unknown>;

  {
    const mut = cloneJson(base);
    delete mut.summary;
    const err = firstError("clawsweeper-decision", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_REQUIRED");
    assert.equal(err.keyword, "required");
    assert.match(err.instancePath, /^\/?$/);
  }

  {
    const mut = cloneJson(base);
    mut.extraTop = true;
    const err = firstError("clawsweeper-decision", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_ADDITIONAL");
    assert.equal(err.keyword, "additionalProperties");
  }

  {
    const mut = cloneJson(base);
    mut.decision = "ship_it";
    const err = firstError("clawsweeper-decision", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_ENUM");
    assert.equal(err.instancePath, "/decision");
    assert.equal(err.keyword, "enum");
  }

  {
    const mut = cloneJson(base);
    const security = mut.securityReview as Record<string, unknown>;
    delete security.summary;
    const err = firstError("clawsweeper-decision", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_REQUIRED");
    assert.equal(err.instancePath, "/securityReview");
    assert.equal(err.keyword, "required");
  }

  {
    const mut = cloneJson(base);
    const security = mut.securityReview as Record<string, unknown>;
    security.unexpected = "nope";
    const err = firstError("clawsweeper-decision", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_ADDITIONAL");
    assert.equal(err.instancePath, "/securityReview");
    assert.equal(err.keyword, "additionalProperties");
  }

  {
    const mut = cloneJson(base);
    mut.overallConfidenceScore = "high";
    const err = firstError("clawsweeper-decision", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_TYPE");
    assert.equal(err.instancePath, "/overallConfidenceScore");
    assert.equal(err.keyword, "type");
  }
});

test("repair schema accepts actionless and planned-merge fixtures", () => {
  const actionless = loadFixture("repair-actionless.valid.json");
  assert.equal(validateResultContract("repair-result", actionless).ok, true);

  const merge = loadFixture("repair-merge/result.json");
  assert.equal(validateResultContract("repair-result", merge).ok, true);
});

test("repair schema rejects required, unknown, enums, and merge_preflight.codex_review failures", () => {
  const base = loadFixture("repair-merge/result.json") as Record<string, unknown>;

  {
    const mut = cloneJson(base);
    delete mut.summary;
    const err = firstError("repair-result", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_REQUIRED");
    assert.equal(err.keyword, "required");
  }

  {
    const mut = cloneJson(base);
    mut.unexpected = 1;
    const err = firstError("repair-result", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_ADDITIONAL");
    assert.equal(err.keyword, "additionalProperties");
  }

  {
    const mut = cloneJson(base);
    mut.status = "executed";
    const err = firstError("repair-result", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_ENUM");
    assert.equal(err.instancePath, "/status");
  }

  {
    const mut = cloneJson(base);
    const actions = mut.actions as Record<string, unknown>[];
    actions[0]!.action = "teleport";
    const err = firstError("repair-result", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_ENUM");
    assert.equal(err.instancePath, "/actions/0/action");
  }

  {
    const mut = cloneJson(base);
    const preflight = (mut.merge_preflight as Record<string, unknown>[])[0]!;
    preflight.security_status = "unknown";
    const err = firstError("repair-result", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_ENUM");
    assert.equal(err.instancePath, "/merge_preflight/0/security_status");
  }

  {
    const mut = cloneJson(base);
    const preflight = (mut.merge_preflight as Record<string, unknown>[])[0]!;
    delete preflight.codex_review;
    const err = firstError("repair-result", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_REQUIRED");
    assert.equal(err.instancePath, "/merge_preflight/0");
    assert.equal(err.keyword, "required");
  }

  {
    const mut = cloneJson(base);
    const review = (mut.merge_preflight as Record<string, unknown>[])[0]!.codex_review as Record<
      string,
      unknown
    >;
    review.command = "/ship";
    const err = firstError("repair-result", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_ENUM");
    assert.equal(err.instancePath, "/merge_preflight/0/codex_review/command");
    assert.equal(err.keyword, "const");
  }

  {
    const mut = cloneJson(base);
    const review = (mut.merge_preflight as Record<string, unknown>[])[0]!.codex_review as Record<
      string,
      unknown
    >;
    review.status = "failed";
    const err = firstError("repair-result", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_ENUM");
    assert.equal(err.instancePath, "/merge_preflight/0/codex_review/status");
  }

  {
    const mut = cloneJson(base);
    const review = (mut.merge_preflight as Record<string, unknown>[])[0]!.codex_review as Record<
      string,
      unknown
    >;
    review.findings_addressed = false;
    const err = firstError("repair-result", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_ENUM");
    assert.equal(err.instancePath, "/merge_preflight/0/codex_review/findings_addressed");
    assert.equal(err.keyword, "const");
  }

  {
    const mut = cloneJson(base);
    const review = (mut.merge_preflight as Record<string, unknown>[])[0]!.codex_review as Record<
      string,
      unknown
    >;
    review.extra = true;
    const err = firstError("repair-result", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_ADDITIONAL");
    assert.equal(err.instancePath, "/merge_preflight/0/codex_review");
  }
});

test("review-results accepts valid merge fixture", () => {
  const tmp = mkdtempSync(join(tmpdir(), "result-contract-merge-ok-"));
  try {
    copyFileSync(join(FIXTURE_ROOT, "repair-merge/result.json"), join(tmp, "result.json"));
    copyFileSync(
      join(FIXTURE_ROOT, "repair-merge/cluster-plan.json"),
      join(tmp, "cluster-plan.json"),
    );
    const run = runReviewResults(tmp);
    assert.equal(run.status, 0, run.stdout + run.stderr);
    const payload = JSON.parse(run.stdout);
    assert.equal(payload.status, "passed");
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test("review-results fails when cluster-plan is missing for actions", () => {
  const tmp = mkdtempSync(join(tmpdir(), "result-contract-missing-plan-"));
  try {
    copyFileSync(join(FIXTURE_ROOT, "repair-merge/result.json"), join(tmp, "result.json"));
    const run = runReviewResults(tmp);
    assert.equal(run.status, 1);
    assert.match(run.stdout, /missing cluster-plan\.json preflight artifact/);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test("review-results fails invalid /review evidence", () => {
  const tmp = mkdtempSync(join(tmpdir(), "result-contract-bad-review-"));
  try {
    const result = cloneJson(loadFixture("repair-merge/result.json") as Record<string, unknown>);
    const review = (result.merge_preflight as Record<string, unknown>[])[0]!.codex_review as Record<
      string,
      unknown
    >;
    review.evidence = ["green CI only"];
    writeFileSync(join(tmp, "result.json"), JSON.stringify(result, null, 2));
    copyFileSync(
      join(FIXTURE_ROOT, "repair-merge/cluster-plan.json"),
      join(tmp, "cluster-plan.json"),
    );
    const run = runReviewResults(tmp);
    assert.equal(run.status, 1);
    assert.match(
      run.stdout,
      /merge_preflight\.codex_review\.evidence must mention \/review or Codex review/,
    );
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test("review-results fails target/preflight updated_at mismatch", () => {
  const tmp = mkdtempSync(join(tmpdir(), "result-contract-mismatch-"));
  try {
    const result = cloneJson(loadFixture("repair-merge/result.json") as Record<string, unknown>);
    const action = (result.actions as Record<string, unknown>[])[0]!;
    action.target_updated_at = "1999-01-01T00:00:00Z";
    writeFileSync(join(tmp, "result.json"), JSON.stringify(result, null, 2));
    copyFileSync(
      join(FIXTURE_ROOT, "repair-merge/cluster-plan.json"),
      join(tmp, "cluster-plan.json"),
    );
    const run = runReviewResults(tmp);
    assert.equal(run.status, 1);
    assert.match(run.stdout, /target_updated_at does not match preflight/);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test("review-results actionless fixture warns and passes", () => {
  const tmp = mkdtempSync(join(tmpdir(), "result-contract-actionless-"));
  try {
    mkdirSync(tmp, { recursive: true });
    copyFileSync(join(FIXTURE_ROOT, "repair-actionless.valid.json"), join(tmp, "result.json"));
    const run = runReviewResults(tmp);
    assert.equal(run.status, 0, run.stdout + run.stderr);
    const payload = JSON.parse(run.stdout);
    assert.equal(payload.status, "passed");
    const report = payload.reports[0];
    assert.ok(
      report.warnings.some((w: string) =>
        w.includes("missing cluster-plan.json preflight artifact for actionless result"),
      ),
    );
    assert.deepEqual(report.failures, []);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});
