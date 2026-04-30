import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  artifactItemNumbers,
  countActions,
  mergeApplyReports,
  plannedItemNumberCsv,
  proposedItemNumbers,
} from "../../dist/repair/workflow-utils.js";

test("workflow utilities derive artifact item numbers and action counts", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-workflow-"));
  write(path.join(root, "artifacts/shard-a/openclaw-openclaw-42.md"), "report\n");
  write(path.join(root, "artifacts/shard-b/7.md"), "report\n");
  write(
    path.join(root, "apply-report.json"),
    JSON.stringify([{ action: "closed" }, { action: "review_comment_synced" }]),
  );

  assert.deepEqual(artifactItemNumbers(path.join(root, "artifacts")), [7, 42]);
  assert.equal(countActions(path.join(root, "apply-report.json"), ""), 2);
  assert.equal(countActions(path.join(root, "apply-report.json"), "closed"), 1);
});

test("workflow utilities merge checkpoint reports in numeric order", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-workflow-"));
  const reports = path.join(root, "reports");
  write(path.join(reports, "apply-report-10.json"), JSON.stringify([{ action: "tenth" }]));
  write(path.join(reports, "apply-report-2.json"), JSON.stringify([{ action: "second" }]));

  const output = path.join(root, "combined.json");
  mergeApplyReports(reports, output);

  assert.deepEqual(JSON.parse(fs.readFileSync(output, "utf8")), [
    { action: "second" },
    { action: "tenth" },
  ]);
});

test("workflow utilities expose planned item numbers for recovery dispatches", () => {
  assert.equal(
    plannedItemNumberCsv({
      candidates: [{ number: 42 }, { number: "7" }, { number: 0 }, { title: "missing" }],
    }),
    "42,7",
  );
});

test("workflow utilities select eligible proposed close records", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-workflow-"));
  const oldDate = "2024-01-01T00:00:00Z";
  write(
    path.join(root, "records/openclaw-openclaw/items/openclaw-openclaw-5.md"),
    [
      "---",
      "repository: openclaw/openclaw",
      "type: issue",
      "decision: close",
      "confidence: high",
      "action_taken: proposed_close",
      "close_reason: implemented_on_main",
      `item_created_at: ${oldDate}`,
      "---",
      "",
    ].join("\n"),
  );
  write(
    path.join(root, "records/openclaw-openclaw/items/openclaw-openclaw-9.md"),
    [
      "---",
      "repository: openclaw/openclaw",
      "type: pull_request",
      "decision: close",
      "confidence: high",
      "action_taken: proposed_close",
      "close_reason: stale_insufficient_info",
      `item_created_at: ${oldDate}`,
      "---",
      "",
    ].join("\n"),
  );

  const selected = withCwd(root, () =>
    proposedItemNumbers({
      targetRepo: "openclaw/openclaw",
      applyKind: "all",
      applyCloseReasons: "all",
      staleMinAgeDays: 30,
      minAgeDays: 0,
      minAgeMinutes: null,
    }),
  );

  assert.deepEqual(selected, [5]);
});

function withCwd(cwd, callback) {
  const previous = process.cwd();
  process.chdir(cwd);
  try {
    return callback();
  } finally {
    process.chdir(previous);
  }
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}
