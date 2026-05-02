import type { LooseRecord } from "./json-types.js";

export function isDeterministicRebaseOnly(fixArtifact: LooseRecord | null | undefined): boolean {
  return fixArtifact?.deterministic_rebase_only === true;
}

export function canTreatRebaseAsCompleteRepair({
  fixArtifact,
  rebaseResult,
  hasUnmergedPaths = false,
}: {
  fixArtifact: LooseRecord | null | undefined;
  rebaseResult: LooseRecord | null | undefined;
  hasUnmergedPaths?: boolean;
}): boolean {
  if (!isDeterministicRebaseOnly(fixArtifact)) return false;
  if (
    rebaseResult?.status === "rebased" &&
    rebaseResult.previous_head !== rebaseResult.current_head
  ) {
    return true;
  }
  return rebaseResult?.status === "conflicts" && !hasUnmergedPaths;
}
