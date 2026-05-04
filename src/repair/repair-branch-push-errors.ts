import type { JsonValue } from "./json-types.js";

export function repairBranchPushBlockedReason(error: JsonValue) {
  const message = String((error as Error)?.message ?? error);
  if (!message) return null;
  if (
    /refusing to allow a GitHub App to create or update workflow/i.test(message) &&
    /\.github\/workflows\//i.test(message) &&
    /without [`']?workflows[`']? permission/i.test(message)
  ) {
    return "GitHub rejected the repair branch push because it updates workflow files and the ClawSweeper app token does not have workflows permission";
  }
  return null;
}

export function isRepairBranchPushBlocked(error: JsonValue) {
  return repairBranchPushBlockedReason(error) !== null;
}

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
