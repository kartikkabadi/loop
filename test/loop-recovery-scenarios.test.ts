import assert from "node:assert/strict";
import test from "node:test";

import {
  InMemoryLoopProviderCapacityCoordinator,
  InMemoryLoopRunnerRegistrationStore,
  LoopApplication,
  type LoopTaskContract,
} from "../dist/loop/index.js";

const START = "2026-07-13T00:00:00.000Z";

function contract(taskId: string): LoopTaskContract {
  return {
    version: 1,
    identity: { taskId, project: "loop", title: "Recovery scenario", revision: 1 },
    repository: {
      owner: "example",
      name: "repo",
      baseBranch: "main",
      baseSha: "a".repeat(40),
      mode: "owned",
    },
    problem: {
      statement: "A run can need recovery.",
      desiredOutcome: "The recovery is auditable.",
    },
    authority: { documents: ["VISION.md"] },
    context: { decisions: [], openQuestions: [], relevantPaths: ["src/loop/**"] },
    scope: { include: ["runtime recovery"], exclude: ["automatic merge"] },
    constraints: { required: ["deterministic recovery"], forbidden: ["raw shell"] },
    expectedPaths: ["src/loop/**"],
    forbiddenPaths: [],
    acceptanceCriteria: [
      { id: "AC-1", statement: "Recovery remains auditable.", proof: ["unit_test"] },
    ],
    risk: { declared: "R1", reasons: ["runtime state"] },
    verification: { profile: "feature", runtimeFlows: ["recovery"] },
    rollback: { strategy: "Retain the event log and stop the run." },
    budget: {
      maxBoxSeconds: 60,
      maxBuilderAttempts: 2,
      maxRepairRounds: 1,
      maxVerifierAttempts: 1,
      maximumLifetimeHours: 1,
    },
    approval: { solReview: true, humanAcceptance: true, automaticMerge: false },
  };
}

type RecoveryScenario = Readonly<{
  name: string;
  run: () => Promise<void>;
}>;

const scenarios: readonly RecoveryScenario[] = [
  {
    name: "provider rate limits place a run in cooldown before admitting it",
    run: async () => {
      const provider = new InMemoryLoopProviderCapacityCoordinator({ maxConcurrent: 2 });
      const first = provider.acquire({
        taskId: "task-rate-limit",
        runId: "run-1",
        generation: 1,
        model: "SWE-1.7",
        now: START,
        leaseSeconds: 1,
      });
      assert.equal(first.status, "acquired");

      provider.cooldown({ until: "2026-07-13T00:00:05.000Z", reason: "rate_limited" });
      const duringCooldown = provider.acquire({
        taskId: "task-rate-limit",
        runId: "run-2",
        generation: 1,
        model: "SWE-1.7",
        now: "2026-07-13T00:00:01.000Z",
      });
      assert.deepEqual(duringCooldown, {
        status: "waiting",
        retryAt: "2026-07-13T00:00:05.000Z",
        reason: "rate_limit",
      });

      const afterCooldown = provider.acquire({
        taskId: "task-rate-limit",
        runId: "run-2",
        generation: 1,
        model: "SWE-1.7",
        now: "2026-07-13T00:00:05.001Z",
      });
      assert.equal(afterCooldown.status, "acquired");
      assert.equal(provider.state.cooldownUntil, null);
      assert.equal(provider.state.rateLimitCount, 1);
    },
  },
  {
    name: "a Box interruption fences stale runner heartbeats after a fresh generation registers",
    run: async () => {
      const runners = new InMemoryLoopRunnerRegistrationStore();
      assert.equal(
        await runners.register({
          runId: "run-box",
          taskId: "task-box",
          boxId: "box-1",
          generation: 1,
          phase: "EXECUTING",
          processAlive: true,
          registeredAt: START,
        }),
        "accepted",
      );
      assert.equal(
        await runners.heartbeat({
          runId: "run-box",
          taskId: "task-box",
          boxId: "box-1",
          generation: 1,
          phase: "EXECUTING",
          processAlive: false,
          timestamp: "2026-07-13T00:00:02.000Z",
        }),
        "accepted",
      );
      assert.equal(
        await runners.register({
          runId: "run-box",
          taskId: "task-box",
          boxId: "box-2",
          generation: 2,
          phase: "PREPARING",
          processAlive: true,
          registeredAt: "2026-07-13T00:00:03.000Z",
        }),
        "accepted",
      );
      assert.equal(
        await runners.heartbeat({
          runId: "run-box",
          taskId: "task-box",
          boxId: "box-1",
          generation: 1,
          phase: "EXECUTING",
          processAlive: true,
          timestamp: "2026-07-13T00:00:04.000Z",
        }),
        "stale",
      );
      assert.equal(
        await runners.heartbeat({
          runId: "run-box",
          taskId: "task-box",
          boxId: "box-2",
          generation: 2,
          phase: "EXECUTING",
          processAlive: true,
          timestamp: "2026-07-13T00:00:05.000Z",
        }),
        "accepted",
      );
      assert.deepEqual(await runners.get("run-box"), {
        runId: "run-box",
        taskId: "task-box",
        boxId: "box-2",
        generation: 2,
        phase: "EXECUTING",
        processAlive: true,
        registeredAt: "2026-07-13T00:00:03.000Z",
        lastSeenAt: "2026-07-13T00:00:05.000Z",
      });
    },
  },
  {
    name: "duplicate retries return the idempotent task state without another event",
    run: async () => {
      const app = new LoopApplication({ now: () => START });
      const first = await app.createDraft(contract("task-idempotent"), {
        idempotencyKey: "draft-request-1",
      });
      const duplicate = await app.createDraft(contract("task-idempotent"), {
        idempotencyKey: "draft-request-1",
      });
      assert.deepEqual(duplicate, first);

      const validated = await app.validate(first.taskId, {
        expectedVersion: first.version,
        idempotencyKey: "validate-request-1",
      });
      const duplicateValidation = await app.validate(first.taskId, {
        expectedVersion: first.version,
        idempotencyKey: "validate-request-1",
      });
      assert.deepEqual(duplicateValidation, validated);
      assert.equal((await app.listTasks()).length, 1);
    },
  },
  {
    name: "human escalation ends automatic recovery in an auditable terminal state",
    run: async () => {
      const app = new LoopApplication({ now: () => START });
      const draft = await app.createDraft(contract("task-escalation"));
      const validated = (await app.validate(draft.taskId)).state;
      const approved = await app.approve(draft.taskId, { expectedVersion: validated.version });
      const allocating = await app.advance(draft.taskId, "ALLOCATING", {
        expectedVersion: approved.version,
      });
      const escalated = await app.escalate(
        draft.taskId,
        "Box state is ambiguous after repeated interruption",
        { expectedVersion: allocating.version },
      );

      assert.equal(escalated.phase, "TERMINAL");
      assert.equal(escalated.condition, "ESCALATED");
      assert.equal(escalated.cancellationGeneration, 2);
      await assert.rejects(
        app.recover(draft.taskId, "late retry", { expectedVersion: escalated.version }),
        /terminal/,
      );
    },
  },
];

for (const scenario of scenarios) {
  test(scenario.name, scenario.run);
}
