import type { JsonValue } from "./json-types.js";

export function repairBranchPushRaceReason(error: JsonValue) {
  const message = String((error as Error)?.message ?? error);
  if (!message) return null;
  if (
    /stale info|stale ref|fetch first|non-fast-forward|tip of your current branch is behind/i.test(
      message,
    ) &&
    /push|failed to push|rejected/i.test(message)
  ) {
    return "source PR branch changed while the repair worker was preparing its push; requeue against the latest head";
  }
  return null;
}

export function isRepairBranchPushRace(error: JsonValue) {
  return repairBranchPushRaceReason(error) !== null;
}
