import type { LoopTaskContract } from "./task-contract.js";
import type { LoopFinding, LoopGate } from "./task-state.js";

export type LoopReviewSurfaceStatus =
  | "verification pending"
  | "verification blocked"
  | "ready for human review"
  | "changes requested"
  | "replan required";

export type LoopVisualProof = Readonly<{
  kind: "image" | "gif" | "video" | "screenshot";
  url: string;
  alt: string;
  before?: string;
  after?: string;
}>;

export type LoopReviewSurfaceInput = Readonly<{
  contract: LoopTaskContract;
  status: LoopReviewSurfaceStatus;
  headSha?: string;
  humanSummary?: string;
  gates?: readonly LoopGate[];
  findings?: readonly LoopFinding[];
  visualProof?: readonly LoopVisualProof[];
  agentDetails?: readonly string[];
}>;

const MAX_BODY_LENGTH = 24_000;
const MAX_FIELD_LENGTH = 1_200;

function text(value: string, fallback: string): string {
  const trimmed = value.trim().replaceAll("\0", "");
  return (trimmed || fallback).slice(0, MAX_FIELD_LENGTH);
}

function cell(value: string): string {
  return text(value, "not provided").replaceAll("|", "\\|").replaceAll("\n", " ");
}

function statusLabel(status: LoopReviewSurfaceStatus): string {
  return status === "ready for human review" ? "Ready for human review" : status;
}

function safeVisualUrl(value: string): string {
  const url = text(value, "");
  if (/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\/|$)/.test(url)) return url;
  if (/^[A-Za-z0-9._/-]+$/.test(url) && !url.startsWith("/") && !url.includes(".."))
    return `./${url}`;
  throw new Error("visual proof URL must be a GitHub URL or a safe repository-relative path");
}

function visualProofLines(proof: readonly LoopVisualProof[] | undefined): readonly string[] {
  if (!proof || proof.length === 0) return ["No visual proof was attached."];
  return proof.slice(0, 8).map((item) => {
    const link = `[${cell(item.alt)}](${safeVisualUrl(item.url)})`;
    const labels = [
      item.before ? `before: ${cell(item.before)}` : "",
      item.after ? `after: ${cell(item.after)}` : "",
    ]
      .filter(Boolean)
      .join(", ");
    return `- ${item.kind}: ${link}${labels ? ` (${labels})` : ""}`;
  });
}

function gateRows(gates: readonly LoopGate[] | undefined): readonly string[] {
  if (!gates || gates.length === 0)
    return ["| No gates recorded | PENDING | Independent verification has not reported yet. |"];
  return gates.map(
    (gate) =>
      `| ${cell(gate.name)} | ${cell(gate.state)} | ${cell(gate.summary ?? "No summary provided.")} |`,
  );
}

function findingLines(findings: readonly LoopFinding[] | undefined): readonly string[] {
  const open = (findings ?? []).filter((finding) => finding.status === "open");
  if (open.length === 0) return ["No open review findings."];
  return open
    .slice(0, 12)
    .map((finding) => `- **${finding.severity} ${cell(finding.title)}**: ${cell(finding.body)}`);
}

/**
 * Renders the GitHub-facing review contract. Humans get the short path first;
 * agents get bounded implementation details in a collapsible section.
 */
export function renderLoopReviewSurface(input: LoopReviewSurfaceInput): string {
  const contract = input.contract;
  const summary = text(
    input.humanSummary ?? contract.problem.desiredOutcome,
    "No summary provided.",
  );
  const head = input.headSha ? `\`${cell(input.headSha)}\`` : "pending publication";
  const details = [
    `- Task ID: \`${cell(contract.identity.taskId)}\``,
    `- Revision: \`${contract.identity.revision}\``,
    `- Repository: \`${cell(contract.repository.owner)}/${cell(contract.repository.name)}\``,
    `- Head: ${head}`,
    ...(input.agentDetails ?? []).slice(0, 12).map((detail) => `- ${cell(detail)}`),
  ];
  const body = [
    "## Loop review",
    "",
    `**Status:** ${statusLabel(input.status)}`,
    "",
    `**Summary:** ${summary}`,
    "",
    "### What changed",
    "",
    `This task targets **${cell(contract.identity.title)}**. The approved outcome is: ${cell(contract.problem.desiredOutcome)}`,
    "",
    "### Proof",
    "",
    "| Gate | State | Evidence |",
    "| --- | --- | --- |",
    ...gateRows(input.gates),
    "",
    "### Visual proof",
    "",
    ...visualProofLines(input.visualProof),
    "",
    "### Flow",
    "",
    "```mermaid",
    "flowchart LR",
    "  Plan --> Workspace --> Provider --> Verify --> Review --> Human",
    "```",
    "",
    "<details>",
    "<summary>Agent details</summary>",
    "",
    ...details,
    "",
    "### Review findings",
    "",
    ...findingLines(input.findings),
    "",
    "</details>",
    "",
    "Completion remains gated by independent verification and human acceptance.",
  ].join("\n");
  return body.slice(0, MAX_BODY_LENGTH);
}
