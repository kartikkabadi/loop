import type { LoopContractDiagnostic, LoopTaskContract } from "./task-contract.js";

export const LOOP_PHASES = [
  "DRAFT",
  "VALIDATING",
  "AWAITING_APPROVAL",
  "QUEUED",
  "ALLOCATING",
  "PREPARING",
  "EXECUTING",
  "PUBLISHING",
  "VERIFYING",
  "REVIEWING",
  "HUMAN_ACCEPTANCE",
  "MERGE_READY",
  "COMPLETE",
  "TERMINAL",
] as const;
export type LoopPhase = (typeof LOOP_PHASES)[number];

export const LOOP_CONDITIONS = [
  "IDLE",
  "RUNNING",
  "WAITING",
  "BLOCKED",
  "REPAIRING",
  "PAUSED",
  "ESCALATED",
  "FAILED",
  "CANCELLED",
  "SUPERSEDED",
] as const;
export type LoopCondition = (typeof LOOP_CONDITIONS)[number];

export const LOOP_GATE_STATES = [
  "NOT_REQUIRED",
  "PENDING",
  "RUNNING",
  "PASSED",
  "FAILED",
  "STALE",
  "WAIVED",
  "ERROR",
] as const;
export type LoopGateState = (typeof LOOP_GATE_STATES)[number];

export type LoopGate = Readonly<{
  name: string;
  state: LoopGateState;
  taskRevision: number;
  contractHash: string;
  baseSha: string;
  headSha: string;
  evidenceDigest?: string;
  summary?: string;
  updatedAt: string;
}>;

export type LoopFinding = Readonly<{
  id: string;
  severity: "P0" | "P1" | "P2" | "P3";
  title: string;
  body: string;
  status: "open" | "addressed" | "rejected";
}>;

export type LoopPublishedChangeState = Readonly<{
  headSha: string;
  headBranch: string;
  pullRequestNumber?: number;
  pullRequestUrl?: string;
}>;

export type LoopTaskActors = Readonly<{
  createdBy?: string;
  approvedBy?: string;
  reviewedBy?: string;
  acceptedBy?: string;
  completedBy?: string;
}>;

export type LoopTaskState = Readonly<{
  taskId: string;
  contract: LoopTaskContract;
  contractHash: string;
  phase: LoopPhase;
  condition: LoopCondition;
  version: number;
  actors: LoopTaskActors;
  /**
   * Monotonic control generation. A runner must echo the generation it was
   * admitted under; pause/cancel increments it so delayed host events cannot
   * affect a replacement or stopped run.
   */
  cancellationGeneration: number;
  baseSha: string | null;
  headSha: string | null;
  publishedChange?: LoopPublishedChangeState;
  requiredGateNames: readonly string[];
  gates: Readonly<Record<string, LoopGate>>;
  findings: readonly LoopFinding[];
  validation: Readonly<{
    status: "unknown" | "passed" | "failed";
    diagnostics: readonly LoopContractDiagnostic[];
  }>;
  updatedAt: string;
}>;

export type LoopTaskCommand =
  | Readonly<{ type: "validated"; baseSha: string }>
  | Readonly<{ type: "approved" }>
  | Readonly<{ type: "advance"; phase: Exclude<LoopPhase, "DRAFT" | "VALIDATING" | "TERMINAL"> }>
  | Readonly<{ type: "pause" }>
  | Readonly<{ type: "resume" }>
  | Readonly<{ type: "cancel"; reason?: string }>
  | Readonly<{ type: "recover"; reason: string }>
  | Readonly<{ type: "escalate"; reason: string }>
  | Readonly<{ type: "repair"; reason: string }>
  | Readonly<{ type: "set-head"; headSha: string }>
  | Readonly<{ type: "record-publication"; publication: LoopPublishedChangeState }>
  | Readonly<{ type: "record-gate"; gate: LoopGate }>
  | Readonly<{
      type: "submit-review";
      verdict: "approved" | "changes_requested" | "replan_required";
      findings: readonly LoopFinding[];
    }>
  | Readonly<{ type: "approve-completion" }>;

export type LoopTaskTransition = Readonly<{
  state: LoopTaskState;
  event: Readonly<{ type: string; message: string }>;
}>;

const PHASE_INDEX = new Map(LOOP_PHASES.map((phase, index) => [phase, index]));
function assertHexSha(label: string, value: string): void {
  if (!/^[0-9a-f]{7,64}$/i.test(value)) throw new Error(`${label} must be a git SHA`);
}

function transition(
  state: LoopTaskState,
  patch: Partial<LoopTaskState>,
  type: string,
  message: string,
): LoopTaskTransition {
  return {
    state: { ...state, ...patch, version: state.version + 1, updatedAt: new Date().toISOString() },
    event: { type, message },
  };
}

function assertMutable(state: LoopTaskState): void {
  if (state.phase === "COMPLETE" || state.phase === "TERMINAL")
    throw new Error(`task ${state.taskId} is terminal`);
  if (state.condition === "CANCELLED") throw new Error(`task ${state.taskId} is cancelled`);
}

export function createLoopTaskState(
  contract: LoopTaskContract,
  contractHash: string,
  now: string,
): LoopTaskState {
  return {
    taskId: contract.identity.taskId,
    contract,
    contractHash,
    phase: "DRAFT",
    condition: "IDLE",
    version: 0,
    actors: {},
    cancellationGeneration: 1,
    baseSha: contract.repository.baseSha ?? null,
    headSha: null,
    requiredGateNames: contract.acceptanceCriteria.map((criterion) => criterion.id),
    gates: {},
    findings: [],
    validation: { status: "unknown", diagnostics: [] },
    updatedAt: now,
  };
}

export function transitionLoopTask(
  state: LoopTaskState,
  command: LoopTaskCommand,
): LoopTaskTransition {
  assertMutable(state);
  switch (command.type) {
    case "validated": {
      if (state.phase !== "DRAFT" && state.phase !== "VALIDATING")
        throw new Error("task must be draft before validation");
      assertHexSha("baseSha", command.baseSha);
      return transition(
        state,
        {
          phase: "AWAITING_APPROVAL",
          condition: "WAITING",
          baseSha: command.baseSha,
          validation: { status: "passed", diagnostics: [] },
        },
        "task.validated",
        "contract validated and awaiting approval",
      );
    }
    case "approved":
      if (state.phase !== "AWAITING_APPROVAL")
        throw new Error("task must await approval before approval");
      return transition(
        state,
        { phase: "QUEUED", condition: "IDLE" },
        "task.approved",
        "task approved and queued",
      );
    case "advance": {
      if (state.condition === "PAUSED")
        throw new Error("paused task must be resumed before advancing");
      const current = PHASE_INDEX.get(state.phase) ?? -1;
      const next = PHASE_INDEX.get(command.phase) ?? -1;
      if (next !== current + 1)
        throw new Error(`invalid phase transition ${state.phase} -> ${command.phase}`);
      const condition: LoopCondition =
        command.phase === "HUMAN_ACCEPTANCE"
          ? "WAITING"
          : command.phase === "COMPLETE"
            ? "IDLE"
            : "RUNNING";
      return transition(
        state,
        { phase: command.phase, condition },
        "task.phase_advanced",
        `task entered ${command.phase}`,
      );
    }
    case "pause":
      if (state.condition === "PAUSED")
        return transition(state, {}, "task.pause_idempotent", "task was already paused");
      return transition(
        state,
        { condition: "PAUSED", cancellationGeneration: state.cancellationGeneration + 1 },
        "task.paused",
        "task paused by operator",
      );
    case "resume":
      if (state.condition !== "PAUSED") throw new Error("only paused tasks can be resumed");
      return transition(
        state,
        { condition: state.phase === "HUMAN_ACCEPTANCE" ? "WAITING" : "RUNNING" },
        "task.resumed",
        "task resumed by operator",
      );
    case "cancel":
      return transition(
        state,
        {
          phase: "TERMINAL",
          condition: "CANCELLED",
          cancellationGeneration: state.cancellationGeneration + 1,
        },
        "task.cancelled",
        command.reason ?? "task cancelled by operator",
      );
    case "recover":
      if (
        !["ALLOCATING", "PREPARING", "EXECUTING", "PUBLISHING", "VERIFYING", "REVIEWING"].includes(
          state.phase,
        )
      )
        throw new Error("only an active execution task can be recovered");
      return transition(
        state,
        {
          phase: "QUEUED",
          condition: "IDLE",
          cancellationGeneration: state.cancellationGeneration + 1,
        },
        "task.recovered",
        command.reason,
      );
    case "escalate":
      if (state.phase === "DRAFT" || state.phase === "VALIDATING")
        throw new Error("draft tasks cannot be escalated by runtime recovery");
      return transition(
        state,
        {
          phase: "TERMINAL",
          condition: "ESCALATED",
          cancellationGeneration: state.cancellationGeneration + 1,
        },
        "task.escalated",
        command.reason,
      );
    case "repair":
      if (!["VERIFYING", "REVIEWING"].includes(state.phase))
        throw new Error("repair can only be requested after verification or review");
      return transition(
        state,
        { phase: "EXECUTING", condition: "REPAIRING" },
        "task.repair_requested",
        command.reason,
      );
    case "set-head": {
      assertHexSha("headSha", command.headSha);
      if (state.headSha === command.headSha)
        return transition(state, {}, "task.head_unchanged", "head SHA was unchanged");
      const gates = Object.fromEntries(
        Object.entries(state.gates).map(([name, gate]) => [
          name,
          { ...gate, state: gate.state === "PASSED" ? "STALE" : gate.state },
        ]),
      );
      return transition(
        state,
        { headSha: command.headSha, gates },
        "task.head_changed",
        "new head invalidated prior passing gates",
      );
    }
    case "record-publication": {
      const publication = command.publication;
      assertHexSha("published head SHA", publication.headSha);
      if (!publication.headBranch || publication.headBranch.includes("\0"))
        throw new Error("published head branch is required");
      if (state.headSha !== publication.headSha)
        throw new Error("published change is bound to a different head SHA");
      if (
        publication.pullRequestNumber !== undefined &&
        (!Number.isSafeInteger(publication.pullRequestNumber) || publication.pullRequestNumber < 1)
      )
        throw new Error("published pull request number must be positive");
      return transition(
        state,
        { publishedChange: publication },
        "task.publication_recorded",
        `published ${publication.headBranch} at ${publication.headSha}`,
      );
    }
    case "record-gate": {
      const gate = command.gate;
      if (
        gate.taskRevision !== state.contract.identity.revision ||
        gate.contractHash !== state.contractHash
      )
        throw new Error("gate is bound to a different task revision");
      if (state.baseSha !== gate.baseSha || state.headSha !== gate.headSha)
        throw new Error("gate is bound to stale repository SHAs");
      return transition(
        state,
        { gates: { ...state.gates, [gate.name]: gate } },
        "task.gate_recorded",
        `gate ${gate.name} recorded as ${gate.state}`,
      );
    }
    case "submit-review":
      if (state.phase !== "REVIEWING")
        throw new Error("review can only be submitted in REVIEWING phase");
      if (command.verdict === "changes_requested")
        return transition(
          state,
          { phase: "EXECUTING", condition: "REPAIRING", findings: command.findings },
          "task.review_changes_requested",
          "review requested changes",
        );
      if (command.verdict === "replan_required")
        return transition(
          state,
          { phase: "AWAITING_APPROVAL", condition: "WAITING", findings: command.findings },
          "task.review_replan_required",
          "review requires a new approved plan",
        );
      if (state.requiredGateNames.some((name) => state.gates[name]?.state !== "PASSED"))
        throw new Error("approved review requires every required gate to pass");
      return transition(
        state,
        { phase: "HUMAN_ACCEPTANCE", condition: "WAITING", findings: command.findings },
        "task.review_approved",
        "review approved and awaiting human acceptance",
      );
    case "approve-completion":
      if (state.phase !== "HUMAN_ACCEPTANCE") throw new Error("task must await human acceptance");
      if (state.requiredGateNames.some((name) => state.gates[name]?.state !== "PASSED"))
        throw new Error("all required gates must pass before completion");
      return transition(
        state,
        { phase: "MERGE_READY", condition: "IDLE" },
        "task.merge_ready",
        "human accepted verified task; completion is ready",
      );
    default: {
      const _exhaustive: never = command;
      return _exhaustive;
    }
  }
}
