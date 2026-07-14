import assert from "node:assert/strict";
import { test } from "node:test";
import { parseLoopRunnerResult } from "../dist/loop-runner/result.js";
import { renderLoopReviewSurface, type LoopTaskContract } from "../dist/loop/index.js";

const contract: LoopTaskContract = {
  version: 1,
  identity: {
    taskId: "loop_review_surface",
    project: "loop",
    title: "Review surface",
    revision: 2,
  },
  repository: { owner: "example", name: "repo", baseBranch: "main", mode: "owned" },
  problem: {
    statement: "Review output is hard to scan.",
    desiredOutcome: "A human can review the change quickly.",
  },
  authority: { documents: ["VISION.md"] },
  context: { decisions: [], openQuestions: [], relevantPaths: ["src/**"] },
  scope: { include: ["review output"], exclude: [] },
  constraints: { required: [], forbidden: [] },
  expectedPaths: ["src/**"],
  forbiddenPaths: [],
  acceptanceCriteria: [{ id: "AC-1", statement: "The review is readable.", proof: ["unit_test"] }],
  risk: { declared: "R1", reasons: [] },
  verification: { profile: "feature", runtimeFlows: ["review"] },
  rollback: { strategy: "Revert the commit." },
  budget: {
    maxBoxSeconds: 60,
    maxBuilderAttempts: 1,
    maxRepairRounds: 1,
    maxVerifierAttempts: 1,
    maximumLifetimeHours: 1,
  },
  approval: { solReview: true, humanAcceptance: true, automaticMerge: false },
};

test("runner rejects a candidate that has no hard verification proof", () => {
  assert.throws(
    () =>
      parseLoopRunnerResult(
        {
          schema_version: 1,
          status: "candidate_complete",
          task_revision: 2,
          contract_hash: "sha256:contract",
          acceptance_criteria: [{ id: "AC-1", claimed_status: "satisfied", evidence_paths: [] }],
          commands_run: [],
          assumptions: [],
          blockers: [],
          scope_deviations: [],
          risks_discovered: [],
        },
        { taskRevision: 2, contractHash: "sha256:contract" },
      ),
    /at least one verification command/,
  );
});

test("review surface puts human proof first and bounds agent detail", () => {
  const rendered = renderLoopReviewSurface({
    contract,
    status: "ready for human review",
    headSha: "abcdef1",
    humanSummary: "The review is easy to scan.",
    gates: [
      {
        name: "AC-1",
        state: "PASSED",
        taskRevision: 2,
        contractHash: "sha256:contract",
        baseSha: "abc1234",
        headSha: "abcdef1",
        summary: "unit test passed",
        updatedAt: "2026-07-13T00:00:00.000Z",
      },
    ],
    visualProof: [{ kind: "image", url: "docs/before-after.png", alt: "Before and after" }],
    agentDetails: ["Independent verifier: clean workspace", "Run ID: run-1"],
  });
  assert.match(rendered, /^## Loop review/);
  assert.ok(rendered.indexOf("### Proof") < rendered.indexOf("<summary>Agent details</summary>"));
  assert.match(rendered, /\[Before and after\]\(\.\/docs\/before-after\.png\)/);
  assert.match(rendered, /Independent verifier: clean workspace/);
  assert.match(rendered, /flowchart LR/);
});
