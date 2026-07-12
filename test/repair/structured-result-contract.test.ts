import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { test } from "node:test";
import {
  DEFAULT_RESULT_MAX_BYTES,
  MAX_JSON_NESTING_DEPTH,
  parseAndValidateResultContract,
  parseExactJsonObject,
  validateResultContract,
  type ResultContractName,
} from "../../dist/result-contracts.js";

const FIXTURE_ROOT = join(process.cwd(), "test/fixtures/result-contracts");
const REVIEW_RESULTS = join(process.cwd(), "dist/repair/review-results.js");
const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const SECRET = "LOOP_RESULT_SECRET_DO_NOT_LEAK_7f31";

function loadFixture(rel: string): unknown {
  return JSON.parse(readFileSync(join(FIXTURE_ROOT, rel), "utf8"));
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function firstError(
  contract: ResultContractName,
  value: unknown,
): { code: string; instancePath: string; keyword?: string; message: string } {
  const result = validateResultContract(contract, value);
  assert.equal(result.ok, false);
  assert.ok(result.errors.length > 0);
  const err = result.errors[0]!;
  return {
    code: err.code,
    instancePath: err.instancePath,
    message: err.message,
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

function nestObject(depth: number): string {
  let s = '{"a":1}';
  for (let i = 1; i < depth; i += 1) s = `{"n":${s}}`;
  return s;
}

function nestArray(depth: number): string {
  let s = "1";
  for (let i = 0; i < depth; i += 1) s = `[${s}]`;
  return s;
}

test("parseExactJsonObject accepts a valid object and surrounding whitespace", () => {
  const parsed = parseExactJsonObject('  \n{"a":1}\n  ');
  assert.equal(parsed.ok, true);
  if (parsed.ok) assert.deepEqual(parsed.value, { a: 1 });
});

test("parseExactJsonObject E_RESULT_EXTRA_TEXT matrix", () => {
  const cases: Array<[string, string]> = [
    ['note {"a":1}', "leading non-JSON text"],
    ['{"a":1} trailing', "trailing text or multiple JSON values"],
    ['{"a":1}{"b":2}', "trailing text or multiple JSON values"],
    ["true false", "trailing text or multiple JSON values"],
    ['```json\n{"a":1}\n```', "markdown fence rejected"],
  ];
  for (const [input, message] of cases) {
    const r = parseExactJsonObject(input);
    assert.equal(r.ok, false, input);
    assert.equal(r.error?.code, "E_RESULT_EXTRA_TEXT", input);
    assert.equal(r.error?.message, message, input);
  }
});

test("parseExactJsonObject E_RESULT_JSON matrix", () => {
  const cases = [
    "{",
    '{"a"',
    '{"a":',
    "{not-json",
    '{"a":1,}',
    '"unterminated',
    '"bad\\x"',
    "tru",
    "fals",
    "nul",
    "01",
    "1.",
    "+1",
  ];
  for (const input of cases) {
    const r = parseExactJsonObject(input);
    assert.equal(r.ok, false, input);
    assert.equal(r.error?.code, "E_RESULT_JSON", input);
    assert.equal(r.error?.message, "malformed JSON", input);
    assert.doesNotMatch(String(r.error?.message), /Unexpected|JSON\.parse|position/i);
  }
});

test("parseExactJsonObject E_RESULT_NOT_OBJECT matrix", () => {
  for (const input of ["null", "[1]", '"x"', "12", "true", "false"]) {
    const r = parseExactJsonObject(input);
    assert.equal(r.ok, false, input);
    assert.equal(r.error?.code, "E_RESULT_NOT_OBJECT", input);
  }
});

test("parseExactJsonObject enforces UTF-8 byte cap and safe-integer maxBytes", () => {
  const emoji = "😀";
  const oversized = parseExactJsonObject(`{"x":"${emoji}"}`, { maxBytes: 8 });
  assert.equal(oversized.ok, false);
  assert.equal(oversized.error?.code, "E_RESULT_TOO_LARGE");

  const within = parseExactJsonObject(`{"x":1}`, { maxBytes: 16 });
  assert.equal(within.ok, true);
  assert.equal(DEFAULT_RESULT_MAX_BYTES, 1_048_576);

  for (const maxBytes of [
    0,
    -1,
    1.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.MAX_SAFE_INTEGER + 1,
    "8" as unknown,
  ]) {
    const bad = parseExactJsonObject('{"a":1}', { maxBytes: maxBytes as number });
    assert.equal(bad.ok, false, String(maxBytes));
    assert.equal(bad.error?.code, "E_RESULT_MAX_BYTES", String(maxBytes));
  }
});

test("parseExactJsonObject bounds nesting depth without throwing", () => {
  assert.equal(MAX_JSON_NESTING_DEPTH, 64);

  const atLimitObj = parseExactJsonObject(nestObject(MAX_JSON_NESTING_DEPTH));
  assert.equal(atLimitObj.ok, true);

  const overObj = parseExactJsonObject(nestObject(MAX_JSON_NESTING_DEPTH + 1));
  assert.equal(overObj.ok, false);
  assert.equal(overObj.error?.code, "E_RESULT_TOO_DEEP");

  const atLimitArr = parseExactJsonObject(nestArray(MAX_JSON_NESTING_DEPTH));
  // Deep array root is not an object.
  assert.equal(atLimitArr.ok, false);
  assert.equal(atLimitArr.error?.code, "E_RESULT_NOT_OBJECT");

  const overArrWrapped = parseExactJsonObject(`{"a":${nestArray(MAX_JSON_NESTING_DEPTH)}}`);
  assert.equal(overArrWrapped.ok, false);
  assert.equal(overArrWrapped.error?.code, "E_RESULT_TOO_DEEP");

  const atLimitArrWrapped = parseExactJsonObject(`{"a":${nestArray(MAX_JSON_NESTING_DEPTH - 1)}}`);
  assert.equal(atLimitArrWrapped.ok, true);

  assert.doesNotThrow(() => parseExactJsonObject(nestObject(10_000)));
  const deep = parseExactJsonObject(nestObject(10_000));
  assert.equal(deep.ok, false);
  assert.equal(deep.error?.code, "E_RESULT_TOO_DEEP");
});

test("parse errors never leak the secret sentinel", () => {
  const malformed = parseExactJsonObject(`{${SECRET}`);
  assert.equal(malformed.ok, false);
  assert.equal(malformed.error?.code, "E_RESULT_JSON");
  assert.doesNotMatch(JSON.stringify(malformed), new RegExp(SECRET));
});

test("schema errors never leak the secret sentinel and use host-owned messages", () => {
  const base = loadFixture("decision.valid.json") as Record<string, unknown>;

  {
    const mut = cloneJson(base);
    mut.decision = SECRET;
    const err = firstError("clawsweeper-decision", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_ENUM");
    assert.equal(err.keyword, "enum");
    assert.equal(err.instancePath, "/decision");
    assert.equal(err.message, "value is not in the allowed set");
    assert.doesNotMatch(JSON.stringify(err), new RegExp(SECRET));
  }

  {
    const mut = cloneJson(base);
    mut[SECRET] = true;
    const result = validateResultContract("clawsweeper-decision", mut);
    assert.equal(result.ok, false);
    assert.doesNotMatch(JSON.stringify(result), new RegExp(SECRET));
    const err = result.errors[0]!;
    assert.equal(err.code, "E_RESULT_SCHEMA_ADDITIONAL");
    assert.equal(err.message, "additional property rejected");
  }

  {
    const mut = cloneJson(base);
    mut.overallConfidenceScore = SECRET;
    const err = firstError("clawsweeper-decision", mut);
    assert.equal(err.code, "E_RESULT_SCHEMA_TYPE");
    assert.equal(err.message, "value has the wrong type");
    assert.doesNotMatch(JSON.stringify(err), new RegExp(SECRET));
  }
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
    assert.equal(err.message, "required field missing");
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

test("compiled module loads schemas from a foreign cwd", () => {
  const foreign = mkdtempSync(join(tmpdir(), "result-contract-cwd-dist-"));
  const moduleUrl = pathToFileURL(join(REPO_ROOT, "dist/result-contracts.js")).href;
  const fixturePath = join(REPO_ROOT, "test/fixtures/result-contracts/decision.valid.json");
  const script = `
    import { readFileSync } from "node:fs";
    import { validateResultContract } from ${JSON.stringify(moduleUrl)};
    const value = JSON.parse(readFileSync(${JSON.stringify(fixturePath)}, "utf8"));
    const result = validateResultContract("clawsweeper-decision", value);
    if (!result.ok) {
      console.error(JSON.stringify(result));
      process.exit(1);
    }
    process.exit(0);
  `;
  const child = spawnSync(process.execPath, ["--input-type=module", "-e", script], {
    cwd: foreign,
    encoding: "utf8",
    env: { ...process.env },
  });
  assert.equal(child.status, 0, child.stdout + child.stderr);
  rmSync(foreign, { recursive: true, force: true });
});

test("source module loads schemas from a foreign cwd via Node strip-types", () => {
  // engines.node is >=24; --experimental-strip-types is the supported .ts execution path.
  const foreign = mkdtempSync(join(tmpdir(), "result-contract-cwd-src-"));
  const moduleUrl = pathToFileURL(join(REPO_ROOT, "src/result-contracts.ts")).href;
  const fixturePath = join(
    REPO_ROOT,
    "test/fixtures/result-contracts/repair-actionless.valid.json",
  );
  const script = `
    import { readFileSync } from "node:fs";
    import { validateResultContract } from ${JSON.stringify(moduleUrl)};
    const value = JSON.parse(readFileSync(${JSON.stringify(fixturePath)}, "utf8"));
    const result = validateResultContract("repair-result", value);
    if (!result.ok) {
      console.error(JSON.stringify(result));
      process.exit(1);
    }
    process.exit(0);
  `;
  const child = spawnSync(
    process.execPath,
    ["--experimental-strip-types", "--input-type=module", "-e", script],
    {
      cwd: foreign,
      encoding: "utf8",
      env: { ...process.env },
    },
  );
  assert.equal(child.status, 0, child.stdout + child.stderr);
  rmSync(foreign, { recursive: true, force: true });
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
