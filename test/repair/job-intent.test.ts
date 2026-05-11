import assert from "node:assert/strict";
import test from "node:test";

import {
  repairJobIntentForFrontmatter,
  repairJobIntentFromSource,
  workerLaneForRepairJobIntent,
} from "../../dist/repair/job-intent.js";

test("repair job intents normalize old source-specific jobs", () => {
  assert.equal(repairJobIntentFromSource("pr_automerge"), "automerge_pr");
  assert.equal(repairJobIntentFromSource("issue_implementation"), "implement_issue");
  assert.equal(repairJobIntentFromSource("clawsweeper_commit"), "commit_finding");
  assert.equal(repairJobIntentFromSource("manual_cluster"), "repair_cluster");
});

test("frontmatter job intent owns worker lane selection", () => {
  assert.equal(
    repairJobIntentForFrontmatter({ source: "pr_automerge", job_intent: "repair_cluster" }),
    "repair_cluster",
  );
  assert.equal(
    repairJobIntentForFrontmatter({ triage_policy: "low_signal_prs" }),
    "low_signal_pr_cleanup",
  );
  assert.equal(workerLaneForRepairJobIntent("automerge_pr"), "automerge_repair");
  assert.equal(workerLaneForRepairJobIntent("implement_issue"), "issue_implementation");
  assert.equal(workerLaneForRepairJobIntent("low_signal_pr_cleanup"), "repair");
});
