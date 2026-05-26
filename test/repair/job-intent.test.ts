import assert from "node:assert/strict";
import test from "node:test";

import {
  repairJobIntentForFrontmatter,
  repairJobIntentFromSource,
  repairJobUsesClusterLane,
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

test("imported cluster jobs use the cluster worker lane", () => {
  assert.equal(
    repairJobUsesClusterLane({ job_intent: "repair_cluster", cluster_id: "gitcrawl-123" }),
    true,
  );
  assert.equal(repairJobUsesClusterLane({ job_intent: "low_signal_pr_cleanup" }), false);
  assert.equal(
    repairJobUsesClusterLane({
      job_intent: "repair_cluster",
      cluster_id: "low-signal-pr-sweep-20260427T0530-01",
    }),
    false,
  );
  assert.equal(
    repairJobUsesClusterLane({ job_intent: "automerge_pr", cluster_id: "automerge-1" }),
    false,
  );
  assert.equal(
    repairJobUsesClusterLane({
      job_intent: "implement_issue",
      source: "issue_implementation",
    }),
    false,
  );
});
