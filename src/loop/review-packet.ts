import { stableJson } from "../stable-json.js";
import { sha256Hex } from "./sha256.js";
import type { LoopGate, LoopTaskState } from "./task-state.js";

export type LoopReviewPacket = Readonly<{
  taskId: string;
  revision: number;
  contractHash: string;
  repository: Readonly<{ owner: string; name: string; baseBranch: string }>;
  baseSha: string;
  headSha: string;
  publishedChange?: LoopTaskState["publishedChange"];
  phase: LoopTaskState["phase"];
  condition: LoopTaskState["condition"];
  gates: readonly LoopGate[];
  findings: LoopTaskState["findings"];
  packetDigest: string;
}>;

export function buildLoopReviewPacket(state: LoopTaskState): LoopReviewPacket {
  if (!state.baseSha || !state.headSha)
    throw new Error("review packet requires resolved base and head SHAs");
  const packetWithoutDigest = {
    taskId: state.taskId,
    revision: state.contract.identity.revision,
    contractHash: state.contractHash,
    repository: state.contract.repository,
    baseSha: state.baseSha,
    headSha: state.headSha,
    ...(state.publishedChange ? { publishedChange: state.publishedChange } : {}),
    phase: state.phase,
    condition: state.condition,
    gates: Object.values(state.gates),
    findings: state.findings,
  };
  return {
    ...packetWithoutDigest,
    packetDigest: sha256Hex(stableJson(packetWithoutDigest)),
  };
}
