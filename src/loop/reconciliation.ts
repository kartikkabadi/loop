import type { LoopBoxAllocationRecord, LoopBoxAllocationStore } from "./box-allocation.js";
import type { LoopRunRecord, LoopRunStore } from "./run-record.js";
import type { LoopRunnerRegistration, LoopRunnerRegistrationStore } from "./runner-registration.js";

export const LOOP_RUN_STALE_AFTER_MS = 13 * 60 * 60 * 1000;
export const LOOP_RUNNER_STALE_AFTER_MS = 2 * 60 * 1000;

export type LoopReconciliationPlan = Readonly<{
  staleRunIds: readonly string[];
  staleRunnerIds: readonly string[];
  expiredAllocationIds: readonly string[];
}>;

type ReconciliationInput = Readonly<{
  now: string;
  runs: readonly LoopRunRecord[];
  runners: readonly LoopRunnerRegistration[];
  allocations: readonly LoopBoxAllocationRecord[];
}>;

const TERMINAL_RUN_STATUSES = new Set<LoopRunRecord["status"]>([
  "completed",
  "awaiting_human",
  "needs_replan",
  "failed",
  "cancelled",
]);

function staleAt(value: string, now: string, ageMs: number): boolean {
  const timestamp = Date.parse(value);
  const current = Date.parse(now);
  return Number.isFinite(timestamp) && Number.isFinite(current) && timestamp + ageMs <= current;
}

export function planLoopReconciliation(input: ReconciliationInput): LoopReconciliationPlan {
  const staleRunnerIds = input.runners
    .filter(
      (runner) =>
        runner.processAlive && staleAt(runner.lastSeenAt, input.now, LOOP_RUNNER_STALE_AFTER_MS),
    )
    .map((runner) => runner.runId);
  const staleRunnerSet = new Set(staleRunnerIds);
  const staleRunIds = input.runs
    .filter((run) => {
      if (TERMINAL_RUN_STATUSES.has(run.status)) return false;
      if (staleRunnerSet.has(run.runId)) return true;
      if (run.status === "waiting_rate_limit" && run.nextAttemptAt) {
        return (
          Date.parse(run.nextAttemptAt) <= Date.parse(input.now) &&
          staleAt(run.updatedAt, input.now, LOOP_RUN_STALE_AFTER_MS)
        );
      }
      return staleAt(run.updatedAt, input.now, LOOP_RUN_STALE_AFTER_MS);
    })
    .map((run) => run.runId);
  const expiredAllocationIds = input.allocations
    .filter(
      (allocation) =>
        allocation.status === "intent" &&
        !allocation.boxId &&
        allocation.expiresAt !== undefined &&
        Date.parse(allocation.expiresAt) <= Date.parse(input.now),
    )
    .map((allocation) => allocation.allocationId);
  return { staleRunIds, staleRunnerIds, expiredAllocationIds };
}

export async function reconcileLoopRuntime(
  input: Readonly<{
    now: string;
    runs: LoopRunStore;
    runners: LoopRunnerRegistrationStore;
    allocations: LoopBoxAllocationStore;
  }>,
): Promise<LoopReconciliationPlan> {
  const [runs, runners, allocations] = await Promise.all([
    input.runs.list(),
    input.runners.list(),
    input.allocations.list(),
  ]);
  const plan = planLoopReconciliation({
    now: input.now,
    runs,
    runners,
    allocations,
  });
  const staleRunSet = new Set(plan.staleRunIds);
  await Promise.all(
    runs
      .filter((run) => staleRunSet.has(run.runId))
      .map(async (run) => {
        const current = await input.runs.get(run.runId);
        if (
          !current ||
          current.updatedAt !== run.updatedAt ||
          current.generation !== run.generation
        )
          return;
        await input.runs.update(run.runId, {
          status: "failed",
          updatedAt: input.now,
          clearProviderLease: true,
          providerReason: "reconciliation found a stale workflow or runner",
        });
      }),
  );
  await Promise.all(
    allocations
      .filter((allocation) => plan.expiredAllocationIds.includes(allocation.allocationId))
      .map((allocation) =>
        input.allocations.update(allocation.allocationId, {
          status: "orphaned",
          updatedAt: input.now,
          errorMessage: "allocation intent expired before a Box was acknowledged",
        }),
      ),
  );
  return plan;
}
