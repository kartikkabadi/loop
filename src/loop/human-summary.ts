import type { LoopTaskState } from "./task-state.js";

export type LoopHumanTaskDigest = Readonly<{
  taskId: string;
  title: string;
  phase: LoopTaskState["phase"];
  condition: LoopTaskState["condition"];
  updatedAt: string;
  nextAction: string;
  openFindings: number;
  failedGates: number;
}>;

export type LoopWorkdayView = Readonly<{
  generatedAt: string;
  humanSummary: string;
  tasks: readonly LoopHumanTaskDigest[];
  needsAttention: readonly string[];
  reviewQueue: readonly LoopHumanTaskDigest[];
  capacity?: unknown;
}>;

function nextAction(state: LoopTaskState): string {
  if (
    state.condition === "BLOCKED" ||
    state.condition === "FAILED" ||
    state.condition === "ESCALATED"
  )
    return "Resolve the blocker";
  switch (state.phase) {
    case "DRAFT":
    case "AWAITING_APPROVAL":
      return "Review and approve the plan";
    case "REVIEWING":
      return "Review the evidence";
    case "HUMAN_ACCEPTANCE":
      return "Accept the result or request a repair";
    case "COMPLETE":
      return "Done";
    case "TERMINAL":
      return "No action";
    default:
      return state.condition === "PAUSED" ? "Resume or cancel" : "Running";
  }
}

function digest(state: LoopTaskState): LoopHumanTaskDigest {
  return {
    taskId: state.taskId,
    title: state.contract.identity.title,
    phase: state.phase,
    condition: state.condition,
    updatedAt: state.updatedAt,
    nextAction: nextAction(state),
    openFindings: state.findings.filter((finding) => finding.status === "open").length,
    failedGates: Object.values(state.gates).filter((gate) => gate.state === "FAILED").length,
  };
}

export function buildLoopWorkdayView(
  tasks: readonly LoopTaskState[],
  generatedAt: string,
  capacity?: unknown,
): LoopWorkdayView {
  const digests = tasks
    .map(digest)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  const attention = digests.filter(
    (task) =>
      ["DRAFT", "AWAITING_APPROVAL", "REVIEWING", "HUMAN_ACCEPTANCE"].includes(task.phase) ||
      ["BLOCKED", "FAILED", "ESCALATED", "PAUSED"].includes(task.condition),
  );
  const reviewQueue = digests.filter((task) =>
    ["REVIEWING", "HUMAN_ACCEPTANCE"].includes(task.phase),
  );
  const lines = [`Loop workday: ${digests.length} task${digests.length === 1 ? "" : "s"}.`];
  if (attention.length === 0) lines.push("Nothing needs your attention.");
  else {
    lines.push(
      `${attention.length} task${attention.length === 1 ? " needs" : "s need"} your attention:`,
    );
    for (const task of attention.slice(0, 8)) lines.push(`- ${task.title}: ${task.nextAction}.`);
    if (attention.length > 8)
      lines.push(`- ${attention.length - 8} more task(s) are listed in the structured view.`);
  }
  return {
    generatedAt,
    humanSummary: lines.join("\n"),
    tasks: digests,
    needsAttention: attention.map((task) => task.taskId),
    reviewQueue,
    ...(capacity === undefined ? {} : { capacity }),
  };
}
