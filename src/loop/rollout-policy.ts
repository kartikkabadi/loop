import type { LoopRiskLevel, LoopTaskContract } from "./task-contract.js";

export type LoopRolloutMode = "shadow" | "assisted" | "controlled" | "normal";

export const LOOP_ROLLOUT_MODES: readonly LoopRolloutMode[] = [
  "shadow",
  "assisted",
  "controlled",
  "normal",
] as const;

export const DEFAULT_LOOP_ROLLOUT_MODE: LoopRolloutMode = "shadow";

export type LoopDispatchPolicy = Readonly<{
  mode: LoopRolloutMode;
  risk: LoopRiskLevel;
  explicitStartAllowed: boolean;
  automaticOnApproval: boolean;
  reason: string;
}>;

const RISK_ORDER: Record<LoopRiskLevel, number> = { R0: 0, R1: 1, R2: 2, R3: 3, R4: 4 };

export function parseLoopRolloutMode(value: string | undefined): LoopRolloutMode {
  return LOOP_ROLLOUT_MODES.includes(value as LoopRolloutMode)
    ? (value as LoopRolloutMode)
    : DEFAULT_LOOP_ROLLOUT_MODE;
}

/**
 * Rollout is an admission policy, not a prompt instruction. Unknown modes
 * fail closed, R3/R4 never enter the automatic path, and shadow mode never
 * starts a workflow. A queued task is already contract-approved, so the
 * automatic path can be retried safely by the scheduled dispatcher.
 */
export function loopDispatchPolicy(
  contract: LoopTaskContract,
  mode: LoopRolloutMode,
): LoopDispatchPolicy {
  const risk = contract.risk.declared;
  if (mode === "shadow") {
    return {
      mode,
      risk,
      explicitStartAllowed: false,
      automaticOnApproval: false,
      reason: "shadow mode observes approved work but starts no workflows",
    };
  }
  if (risk === "R3" || risk === "R4") {
    return {
      mode,
      risk,
      explicitStartAllowed: false,
      automaticOnApproval: false,
      reason: `${risk} requires a separate human-gate surface before execution`,
    };
  }
  if (mode === "assisted") {
    return {
      mode,
      risk,
      explicitStartAllowed: RISK_ORDER[risk] <= RISK_ORDER.R1,
      automaticOnApproval: false,
      reason: "assisted mode prepares work; an operator explicitly dispatches R0/R1",
    };
  }
  return {
    mode,
    risk,
    explicitStartAllowed: true,
    automaticOnApproval: true,
    reason:
      mode === "normal"
        ? "normal mode automatically dispatches approved R0/R1/R2 work"
        : "controlled mode automatically dispatches approved R0/R1/R2 work",
  };
}

export function assertLoopWorkflowAllowed(
  contract: LoopTaskContract,
  mode: LoopRolloutMode,
): LoopDispatchPolicy {
  const policy = loopDispatchPolicy(contract, mode);
  if (!policy.explicitStartAllowed) throw new Error(`workflow admission denied: ${policy.reason}`);
  return policy;
}
