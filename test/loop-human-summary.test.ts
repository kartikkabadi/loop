import assert from "node:assert/strict";
import test from "node:test";
import { buildLoopWorkdayView } from "../dist/loop/human-summary.js";
import { createLoopTaskState } from "../dist/loop/task-state.js";
import type { LoopTaskContract } from "../dist/loop/task-contract.js";

function contract(taskId: string, title: string): LoopTaskContract {
  return {
    version: 1,
    identity: { taskId, project: "loop", title, revision: 1 },
    repository: {
      owner: "owner",
      name: "repo",
      baseBranch: "main",
      baseSha: "a".repeat(40),
      mode: "owned",
    },
    problem: { statement: "problem", desiredOutcome: "outcome" },
    authority: { documents: ["README.md"] },
    context: { decisions: [], openQuestions: [], relevantPaths: ["src"] },
    scope: { include: ["src"], exclude: [] },
    constraints: { required: [], forbidden: [] },
    expectedPaths: ["src"],
    forbiddenPaths: [],
    acceptanceCriteria: [{ id: "tests", statement: "tests pass", proof: ["unit_test"] }],
    risk: { declared: "R1", reasons: [] },
    verification: { profile: "feature", runtimeFlows: [] },
    rollback: { strategy: "revert" },
    budget: {
      maxBoxSeconds: 60,
      maxBuilderAttempts: 1,
      maxRepairRounds: 1,
      maxVerifierAttempts: 1,
      maximumLifetimeHours: 1,
    },
    approval: { solReview: true, humanAcceptance: true, automaticMerge: false },
  };
}

test("workday view keeps ChatGPT's first read compact and actionable", () => {
  const draft = createLoopTaskState(
    contract("draft", "Draft plan"),
    "hash",
    "2026-07-13T01:00:00Z",
  );
  const review = {
    ...createLoopTaskState(contract("review", "Review change"), "hash", "2026-07-13T02:00:00Z"),
    phase: "REVIEWING" as const,
    condition: "WAITING" as const,
    headSha: "b".repeat(40),
  };
  const view = buildLoopWorkdayView([draft, review], "2026-07-13T03:00:00Z");
  assert.match(view.humanSummary, /2 tasks/);
  assert.match(view.humanSummary, /Review change: Review the evidence\./);
  assert.deepEqual(view.needsAttention, ["review", "draft"]);
  assert.deepEqual(
    view.reviewQueue.map((task) => task.taskId),
    ["review"],
  );
  assert.equal(view.tasks[0]?.taskId, "review");
});
