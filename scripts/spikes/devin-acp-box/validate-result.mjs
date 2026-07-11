#!/usr/bin/env node
/**
 * Loop Phase 0C — deterministic host validator for reviewer result JSON.
 * Node built-ins only. Exit 0 only when the document is valid.
 *
 * Usage:
 *   node validate-result.mjs <path-to-result.json>
 *   node validate-result.mjs --self-test
 */

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";

const MAX_FILE_BYTES = 64 * 1024;
const MAX_FINDINGS = 32;
const MAX_STRING = 4_000;
const MAX_SUMMARY = 8_000;
const SHA_RE = /^[0-9a-f]{40}$/;
const SEVERITIES = new Set(["P0", "P1", "P2", "P3"]);
const OUTCOMES = new Set(["pass", "fail"]);
const REQUIRED_TOP = [
  "schemaVersion",
  "taskId",
  "role",
  "baseSha",
  "headSha",
  "outcome",
  "summary",
  "findings",
];

export function validateResultObject(doc) {
  const errors = [];
  const err = (code, message) => errors.push({ code, message });

  if (doc === null || typeof doc !== "object" || Array.isArray(doc)) {
    return { ok: false, errors: [{ code: "E_NOT_OBJECT", message: "root must be object" }] };
  }

  for (const key of Object.keys(doc)) {
    if (!REQUIRED_TOP.includes(key)) err("E_UNKNOWN_FIELD", `unknown top-level field: ${key}`);
  }
  for (const key of REQUIRED_TOP) {
    if (!Object.prototype.hasOwnProperty.call(doc, key)) {
      err("E_MISSING_FIELD", `missing required field: ${key}`);
    }
  }
  if (errors.length) return { ok: false, errors };

  if (doc.schemaVersion !== 1) err("E_SCHEMA_VERSION", "schemaVersion must be 1");
  if (typeof doc.taskId !== "string" || !doc.taskId.trim() || doc.taskId.length > MAX_STRING) {
    err("E_TASK_ID", "taskId must be non-empty string within length bound");
  }
  if (doc.role !== "reviewer") err("E_ROLE", 'role must be "reviewer"');
  if (typeof doc.baseSha !== "string" || !SHA_RE.test(doc.baseSha)) {
    err("E_BASE_SHA", "baseSha must be 40-hex");
  }
  if (typeof doc.headSha !== "string" || !SHA_RE.test(doc.headSha)) {
    err("E_HEAD_SHA", "headSha must be 40-hex");
  }
  if (!OUTCOMES.has(doc.outcome)) err("E_OUTCOME", 'outcome must be "pass" or "fail"');
  if (typeof doc.summary !== "string" || !doc.summary.trim() || doc.summary.length > MAX_SUMMARY) {
    err("E_SUMMARY", "summary must be non-empty within length bound");
  }
  if (!Array.isArray(doc.findings)) {
    err("E_FINDINGS_TYPE", "findings must be an array");
  } else {
    if (doc.findings.length > MAX_FINDINGS)
      err("E_FINDINGS_CAP", `findings exceeds ${MAX_FINDINGS}`);
    doc.findings.forEach((f, i) => {
      const p = `findings[${i}]`;
      if (!f || typeof f !== "object" || Array.isArray(f)) {
        err("E_FINDING_OBJECT", `${p} must be object`);
        return;
      }
      for (const k of Object.keys(f)) {
        if (!["severity", "path", "line", "message", "evidence"].includes(k)) {
          err("E_FINDING_UNKNOWN_FIELD", `${p} unknown field: ${k}`);
        }
      }
      if (!SEVERITIES.has(f.severity)) err("E_SEVERITY", `${p}.severity invalid`);
      if (typeof f.path !== "string" || !f.path.trim()) {
        err("E_PATH", `${p}.path must be non-empty string`);
      } else {
        if (path.isAbsolute(f.path) || f.path.includes("\\")) {
          err("E_PATH_ESCAPE", `${p}.path must be repo-relative POSIX`);
        }
        const norm = path.posix.normalize(f.path);
        if (norm.startsWith("../") || norm === ".." || norm.startsWith("/")) {
          err("E_PATH_ESCAPE", `${p}.path escapes repository root`);
        }
      }
      if (!Number.isInteger(f.line) || f.line < 1) {
        err("E_LINE", `${p}.line must be integer >= 1`);
      }
      if (typeof f.message !== "string" || !f.message.trim() || f.message.length > MAX_STRING) {
        err("E_MESSAGE", `${p}.message must be non-empty within bound`);
      }
      if (typeof f.evidence !== "string" || !f.evidence.trim() || f.evidence.length > MAX_STRING) {
        err("E_EVIDENCE", `${p}.evidence must be non-empty within bound`);
      }
    });
  }

  return { ok: errors.length === 0, errors };
}

export function validateResultFile(filePath) {
  let raw;
  try {
    raw = readFileSync(filePath);
  } catch (e) {
    return {
      ok: false,
      errors: [{ code: "E_READ", message: String(e.message || e) }],
    };
  }
  if (raw.byteLength > MAX_FILE_BYTES) {
    return {
      ok: false,
      errors: [{ code: "E_FILE_SIZE", message: `file exceeds ${MAX_FILE_BYTES} bytes` }],
    };
  }
  let doc;
  try {
    doc = JSON.parse(raw.toString("utf8"));
  } catch (e) {
    return {
      ok: false,
      errors: [{ code: "E_JSON", message: String(e.message || e) }],
    };
  }
  return validateResultObject(doc);
}

function validFixture() {
  return {
    schemaVersion: 1,
    taskId: "phase0c-review-1",
    role: "reviewer",
    baseSha: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    headSha: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    outcome: "fail",
    summary: "Seeded defect found in arithmetic helper.",
    findings: [
      {
        severity: "P1",
        path: "src/math.js",
        line: 3,
        message: "add() returns incorrect sum for positive integers",
        evidence: "expect(add(2,2)).toBe(4) fails because implementation returns a-b",
      },
    ],
  };
}

function runSelfTests() {
  const cases = [];
  const check = (name, mutate, expectCode) => {
    const doc = validFixture();
    mutate(doc);
    const r = validateResultObject(doc);
    const ok = expectCode ? !r.ok && r.errors.some((e) => e.code === expectCode) : r.ok;
    cases.push({ name, ok, errors: r.errors });
  };

  check("valid", () => {}, null);
  check(
    "missing_field",
    (d) => {
      delete d.summary;
    },
    "E_MISSING_FIELD",
  );
  check(
    "extra_field",
    (d) => {
      d.extra = true;
    },
    "E_UNKNOWN_FIELD",
  );
  check(
    "wrong_sha",
    (d) => {
      d.headSha = "not-a-sha";
    },
    "E_HEAD_SHA",
  );
  check(
    "path_escape",
    (d) => {
      d.findings[0].path = "../secret";
    },
    "E_PATH_ESCAPE",
  );
  check(
    "invalid_severity",
    (d) => {
      d.findings[0].severity = "critical";
    },
    "E_SEVERITY",
  );

  const dir = mkdtempSync(path.join(tmpdir(), "loop-0c-val-"));
  try {
    const big = path.join(dir, "big.json");
    writeFileSync(big, "x".repeat(MAX_FILE_BYTES + 1));
    const oversized = validateResultFile(big);
    cases.push({
      name: "oversized_result",
      ok: !oversized.ok && oversized.errors.some((e) => e.code === "E_FILE_SIZE"),
      errors: oversized.errors,
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }

  const failed = cases.filter((c) => !c.ok);
  const report = { ok: failed.length === 0, cases };
  console.log(JSON.stringify(report, null, 2));
  process.exit(failed.length === 0 ? 0 : 1);
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) {
    runSelfTests();
    return;
  }
  if (args.length !== 1 || args[0].startsWith("-")) {
    console.error("Usage: node validate-result.mjs <result.json> | --self-test");
    process.exit(2);
  }
  const result = validateResultFile(args[0]);
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}

main();
