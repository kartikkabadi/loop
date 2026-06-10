import crypto from "node:crypto";
import type { JsonValue, LooseRecord } from "./json-types.js";

export type GeneratedIssueSourceMetadata = {
  repo: string;
  issueNumber: number;
  snapshotSha256: string;
  updatedAt: string;
};

export function issueImplementationSnapshotSha256(
  issue: LooseRecord,
  comments: LooseRecord[] = [],
): string {
  const snapshot = {
    title: String(issue.title ?? ""),
    body: String(issue.body ?? ""),
    labels: normalizedLabels(issue.labels ?? []),
    comments: comments
      .filter((comment) => !isClawSweeperAutomationComment(comment))
      .map((comment) => ({
        id: String(comment.id ?? ""),
        author: String(comment.user?.login ?? comment.author?.login ?? comment.author ?? ""),
        body: String(comment.body ?? ""),
        updated_at: String(comment.updated_at ?? comment.created_at ?? ""),
      }))
      .sort((left, right) =>
        `${left.id}:${left.updated_at}`.localeCompare(`${right.id}:${right.updated_at}`),
      ),
  };
  return crypto.createHash("sha256").update(JSON.stringify(snapshot)).digest("hex");
}

export function renderGeneratedIssueSourceMarker({
  repo,
  issueNumber,
  snapshotSha256,
  updatedAt,
}: GeneratedIssueSourceMetadata): string {
  return `<!-- clawsweeper-source-issue repo=${repo} number=${issueNumber} snapshot=${snapshotSha256} updated=${encodeURIComponent(updatedAt)} -->`;
}

export function parseGeneratedIssueSourceMarker(
  body: JsonValue,
): GeneratedIssueSourceMetadata | null {
  const matches = [
    ...String(body ?? "").matchAll(
      /<!--\s*clawsweeper-source-issue\s+repo=([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)\s+number=(\d+)\s+snapshot=([a-f0-9]{64})\s+updated=([^\s]+)\s*-->/gi,
    ),
  ];
  if (matches.length !== 1) return null;
  const match = matches[0];
  const issueNumber = Number(match?.[2]);
  const updatedAt = safeDecodeURIComponent(String(match?.[4] ?? ""));
  if (!Number.isInteger(issueNumber) || issueNumber <= 0) return null;
  if (!validTimestamp(updatedAt)) return null;
  return {
    repo: String(match?.[1] ?? "").toLowerCase(),
    issueNumber,
    snapshotSha256: String(match?.[3] ?? "").toLowerCase(),
    updatedAt,
  };
}

export function generatedIssueSourceBlockReason({
  metadata,
  issue,
  comments = [],
  competingPullRequests = [],
  currentPullNumber,
}: {
  metadata: GeneratedIssueSourceMetadata;
  issue: LooseRecord;
  comments?: LooseRecord[];
  competingPullRequests?: LooseRecord[];
  currentPullNumber: number;
}): string {
  if (String(issue.state ?? "").toLowerCase() !== "open") {
    return `source issue is ${issue.state ?? "not open"}`;
  }
  if (issue.locked === true) return "source issue is locked";
  const protectedLabel = sourceIssueProtectedLabel(issue.labels ?? []);
  if (protectedLabel) return `source issue has protected label: ${protectedLabel}`;
  if (sourceIssueHasSecuritySignal(issue, comments)) {
    return "source issue has a security-sensitive signal";
  }
  if (issueImplementationSnapshotSha256(issue, comments) !== metadata.snapshotSha256) {
    return "source issue changed since ClawSweeper review";
  }
  if (!sourceIssueRevisionMatches(metadata.updatedAt, issue, comments)) {
    return "source issue revision changed since ClawSweeper review";
  }
  const competing = competingPullRequests.find(
    (pull) => Number(pull.number) !== Number(currentPullNumber),
  );
  if (competing) {
    return `source issue acquired another open PR: #${competing.number ?? "unknown"}`;
  }
  return "";
}

export function pullRequestsCrossReferencedByIssueTimeline(
  timeline: LooseRecord[],
  repository: string,
): LooseRecord[] {
  const wantedRepository = repository.trim().toLowerCase();
  const found = new Map<number, LooseRecord>();
  for (const event of timeline) {
    if (String(event.event ?? "").toLowerCase() !== "cross-referenced") continue;
    const source = asRecord(event.source);
    const issue = asRecord(source.issue ?? source);
    if (!issue.pull_request) continue;
    const sourceRepository = timelineSourceRepository(issue);
    const number = Number(issue.number);
    if (sourceRepository !== wantedRepository || !Number.isInteger(number) || number <= 0) continue;
    found.set(number, issue);
  }
  return [...found.values()];
}

export function generatedIssueClosingReferenceBlockReason({
  body,
  closingIssuesReferences,
  metadata,
}: {
  body: JsonValue;
  closingIssuesReferences: JsonValue;
  metadata: GeneratedIssueSourceMetadata;
}): string {
  const issueUrl = `https://github.com/${metadata.repo}/issues/${metadata.issueNumber}`;
  if (!hasStandaloneIssueClosingReference(body, issueUrl)) {
    return "generated PR no longer contains the source issue closing reference";
  }
  const references = Array.isArray(closingIssuesReferences) ? closingIssuesReferences : [];
  if (!references.some((reference) => closingIssueReferenceMatches(reference, metadata))) {
    return "GitHub no longer recognizes the source issue closing reference";
  }
  const unexpected = references.find(
    (reference) => !closingIssueReferenceMatches(reference, metadata),
  );
  if (unexpected) {
    return `generated PR would close an unexpected issue: ${closingIssueReferenceLabel(unexpected)}`;
  }
  return "";
}

export function hasStandaloneIssueClosingReference(body: JsonValue, issueUrl: string): boolean {
  const visibleBody = String(body ?? "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^[ \t]*(```|~~~)[^\n]*\n[\s\S]*?^[ \t]*\1[ \t]*$/gm, "");
  const expected = `closes ${issueUrl}`.toLowerCase();
  return visibleBody.split(/\r?\n/).some((line) => {
    if (/^(?: {4}|\t)/.test(line)) return false;
    const trimmed = line.trim();
    return !trimmed.startsWith(">") && trimmed.toLowerCase() === expected;
  });
}

function normalizedLabels(labels: JsonValue[]): string[] {
  return labels
    .map((label) =>
      String(label?.name ?? label)
        .trim()
        .toLowerCase(),
    )
    .filter(Boolean)
    .sort();
}

function timelineSourceRepository(issue: LooseRecord): string {
  const explicit = String(
    issue.repository?.full_name ??
      issue.repository?.nameWithOwner ??
      issue.repository?.name_with_owner ??
      "",
  )
    .trim()
    .toLowerCase();
  if (explicit) return explicit;
  const match = String(issue.repository_url ?? "").match(/\/repos\/([^/]+\/[^/]+)$/i);
  return String(match?.[1] ?? "").toLowerCase();
}

function asRecord(value: JsonValue): LooseRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

export function isClawSweeperAutomationComment(comment: LooseRecord): boolean {
  const login = String(comment.user?.login ?? comment.author?.login ?? comment.author ?? "")
    .trim()
    .toLowerCase();
  return ["clawsweeper", "clawsweeper[bot]", "openclaw-clawsweeper[bot]"].includes(login);
}

function sourceIssueProtectedLabel(labels: JsonValue[]): string {
  const protectedLabels = new Set(["security", "beta-blocker", "release-blocker", "maintainer"]);
  return (
    labels
      .map((label) =>
        String(label?.name ?? label)
          .trim()
          .toLowerCase(),
      )
      .find((label) => protectedLabels.has(label)) ?? ""
  );
}

export function sourceIssueHasSecuritySignal(
  issue: LooseRecord,
  comments: LooseRecord[] = [],
): boolean {
  const labels = (issue.labels ?? []).map((label: JsonValue) => String(label?.name ?? label));
  const humanCommentBodies = comments
    .filter((comment) => !isClawSweeperAutomationComment(comment))
    .map((comment) => String(comment.body ?? ""));
  return /\b(?:security|vulnerability|cve|ghsa|secret|credential|token|exploit|xss|csrf|ssrf|rce)\b/i.test(
    [issue.title, issue.body, labels.join("\n"), ...humanCommentBodies].join("\n"),
  );
}

function sourceIssueRevisionMatches(
  reviewedUpdatedAt: string,
  issue: LooseRecord,
  comments: LooseRecord[],
): boolean {
  const currentUpdatedAt = String(issue.updated_at ?? "");
  if (currentUpdatedAt === reviewedUpdatedAt) return true;
  const reviewedTime = Date.parse(reviewedUpdatedAt);
  const currentTime = Date.parse(currentUpdatedAt);
  if (
    !Number.isFinite(reviewedTime) ||
    !Number.isFinite(currentTime) ||
    currentTime <= reviewedTime
  ) {
    return false;
  }
  return comments.some((comment) => {
    if (!isClawSweeperAutomationComment(comment)) return false;
    const commentTime = Date.parse(String(comment.updated_at ?? comment.created_at ?? ""));
    return Number.isFinite(commentTime) && Math.abs(commentTime - currentTime) <= 2_000;
  });
}

function validTimestamp(value: string): boolean {
  return value.length > 0 && Number.isFinite(Date.parse(value));
}

function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return "";
  }
}

function closingIssueReferenceMatches(
  reference: LooseRecord,
  metadata: GeneratedIssueSourceMetadata,
): boolean {
  const url = String(reference?.url ?? "")
    .trim()
    .toLowerCase();
  if (url) {
    return url === `https://github.com/${metadata.repo}/issues/${metadata.issueNumber}`;
  }
  const repo = String(
    reference?.repository?.nameWithOwner ??
      reference?.repository?.name_with_owner ??
      reference?.repository?.full_name ??
      "",
  )
    .trim()
    .toLowerCase();
  return Number(reference?.number) === metadata.issueNumber && (!repo || repo === metadata.repo);
}

function closingIssueReferenceLabel(reference: LooseRecord): string {
  const url = String(reference?.url ?? "").trim();
  if (url) return url;
  const number = Number(reference?.number);
  return Number.isInteger(number) && number > 0 ? `#${number}` : "unknown";
}
