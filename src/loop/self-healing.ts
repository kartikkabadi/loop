import type { LoopRunRecord } from "./run-record.js";
import type { LoopTaskState } from "./task-state.js";
import { parseLoopRolloutMode, type LoopRolloutMode } from "./rollout-policy.js";
import { planLoopReconciliation, type LoopReconciliationPlan } from "./reconciliation.js";
import type { LoopRunnerRegistration } from "./runner-registration.js";
import type { LoopBoxAllocationRecord } from "./box-allocation.js";

export type LoopHealingAction = Readonly<{
  taskId: string;
  runId: string;
  action: "retry" | "escalate";
  reason: string;
  expectedVersion: number;
  attempt: number;
}>;

export type LoopSelfHealingPlan = Readonly<{
  mode: LoopRolloutMode;
  reconciliation: LoopReconciliationPlan;
  actions: readonly LoopHealingAction[];
  observedOnly: boolean;
}>;

function active(task: LoopTaskState): boolean {
  return ["ALLOCATING", "PREPARING", "EXECUTING", "PUBLISHING", "VERIFYING", "REVIEWING"].includes(
    task.phase,
  );
}

/**
 * Turns stale runtime evidence into bounded decisions. This is intentionally
 * pure: the scheduled worker can persist the old run, recover the task, and
 * dispatch a new version only after this plan has been inspected.
 */
export function planLoopSelfHealing(
  input: Readonly<{
    now: string;
    tasks: readonly LoopTaskState[];
    runs: readonly LoopRunRecord[];
    runners: readonly LoopRunnerRegistration[];
    allocations: readonly LoopBoxAllocationRecord[];
    rolloutMode?: string;
    maxActions?: number;
  }>,
): LoopSelfHealingPlan {
  const mode = parseLoopRolloutMode(input.rolloutMode);
  const reconciliation = planLoopReconciliation({
    now: input.now,
    runs: input.runs,
    runners: input.runners,
    allocations: input.allocations,
  });
  const tasks = new Map(input.tasks.map((task) => [task.taskId, task]));
  const runs = new Map(input.runs.map((run) => [run.runId, run]));
  const maxActions = Math.max(0, Math.min(input.maxActions ?? 10, 20));
  const actions: LoopHealingAction[] = [];
  for (const runId of reconciliation.staleRunIds) {
    if (actions.length >= maxActions) break;
    const run = runs.get(runId);
    const task = run ? tasks.get(run.taskId) : undefined;
    if (!run || !task || !active(task) || task.condition === "PAUSED") continue;
    const canRetry = run.attempt < task.contract.budget.maxBuilderAttempts;
    actions.push({
      taskId: task.taskId,
      runId: run.runId,
      action: canRetry && mode !== "shadow" ? "retry" : "escalate",
      reason: canRetry
        ? `stale Loop runtime detected at ${run.status}; the next attempt will resume from the durable task contract`
        : `stale Loop runtime exceeded maxBuilderAttempts (${task.contract.budget.maxBuilderAttempts})`,
      expectedVersion: task.version,
      attempt: run.attempt,
    });
  }
  return { mode, reconciliation, actions, observedOnly: mode === "shadow" };
}
