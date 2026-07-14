export type LoopRepairAttempt = Readonly<{
  round: number;
  failureClass: string;
  diffDigest: string;
}>;

export type LoopRepairDecision = Readonly<{
  action: "retry" | "escalate";
  nextRound: number;
  reason: "within_budget" | "repair_budget_exhausted" | "same_diff" | "repeated_failure";
}>;

function nonEmpty(value: string, label: string): string {
  if (!value || value.includes("\0")) throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${label} must be positive`);
  return value;
}

/** Pure repair convergence policy. It never decides whether a finding is valid. */
export function decideLoopRepair(
  input: Readonly<{
    maxRepairRounds: number;
    history: readonly LoopRepairAttempt[];
    failureClass: string;
    diffDigest: string;
  }>,
): LoopRepairDecision {
  const maxRepairRounds = positiveInteger(input.maxRepairRounds, "maxRepairRounds");
  const failureClass = nonEmpty(input.failureClass, "failureClass");
  const diffDigest = nonEmpty(input.diffDigest, "diffDigest");
  const nextRound = input.history.length + 1;
  if (input.history.length >= maxRepairRounds)
    return { action: "escalate", nextRound, reason: "repair_budget_exhausted" };
  if (input.history.some((attempt) => attempt.diffDigest === diffDigest))
    return { action: "escalate", nextRound, reason: "same_diff" };
  if (input.history.filter((attempt) => attempt.failureClass === failureClass).length >= 2)
    return { action: "escalate", nextRound, reason: "repeated_failure" };
  return { action: "retry", nextRound, reason: "within_budget" };
}
