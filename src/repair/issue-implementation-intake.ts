#!/usr/bin/env node
import type { JsonValue, LooseRecord } from "./json-types.js";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs, parseJob, repoRoot, validateJob } from "./lib.js";
import { ghErrorText, ghJsonWithRetry, ghPagedWithRetry } from "./github-cli.js";
import {
  issueImplementationJobBranch,
  issueImplementationJobPath,
  issueImplementationBlockerClass,
  issueImplementationOverrideAction,
  renderIssueImplementationJob,
  REVIEW_REPRODUCIBLE_BUG_TRIGGER_SOURCE,
  REVIEW_VIABLE_ISSUE_TRIGGER_SOURCE,
  REVIEW_VISION_FIT_TRIGGER_SOURCE,
} from "./comment-router-core.js";
import {
  isClawSweeperAutomationComment,
  issueImplementationSnapshotSha256,
  sourceIssueHasSecuritySignal,
} from "./issue-snapshot.js";

type CandidateKind = "strict_bug" | "vision_fit" | "viable";

type IntakeDecision = {
  status: string;
  shouldRepair: boolean;
  reason: string;
  blockers: string[];
  blockerClass?: "soft" | "hard";
  operatorOverride?: boolean;
};

type ReviewReport = {
  frontmatter: Record<string, string>;
  body: string;
};

const args = parseArgs(process.argv.slice(2));

function main() {
  const command = String(args._[0] ?? "prepare");
  if (command === "prepare") prepare();
  else if (command === "candidates") candidates();
  else die(`unknown command: ${command}`);
}

function prepare() {
  const enabled = stringArg("enabled", "true");
  const candidateKind = candidateKindArg();
  const operatorOverride = truthy(
    stringArg("operator-override", stringArg("operator_override", "")),
  );
  const overrideRequestedBy = stringArg(
    "override-requested-by",
    stringArg("override_requested_by", ""),
  );
  const targetRepo = stringArg("target-repo", stringArg("target_repo", "openclaw/openclaw"));
  const reportRepo = stringArg(
    "report-repo",
    stringArg("report_repo", "openclaw/clawsweeper-state"),
  );
  const itemNumber = positiveInteger(
    stringArg("item-number", stringArg("item_number", "")),
    "item number",
  );
  const reportPath = stringArg(
    "report-path",
    stringArg("report_path", `records/${repoSlug(targetRepo)}/items/${itemNumber}.md`),
  );
  const reportUrl =
    stringArg("report-url", stringArg("report_url", "")) ||
    `https://github.com/${reportRepo}/blob/${reportBranch(reportRepo)}/${reportPath}`;
  const reportMarkdown = readReport({ reportRepo, reportPath });
  const report = parseReviewReport(reportMarkdown);
  const live = truthy(enabled)
    ? liveIssueContext({ repo: targetRepo, number: itemNumber })
    : { issue: null, comments: [], existingPrs: [], existingBranchPrs: [] };
  const decision = intakeDecision({
    enabled,
    targetRepo,
    itemNumber,
    candidateKind,
    report,
    reportMarkdown,
    live,
    operatorOverride,
  });
  const jobPath = path.join(repoRoot(), issueImplementationJobPath(targetRepo, itemNumber));
  const auditPath = path.join(
    repoRoot(),
    "results",
    "issue-implementation-intake",
    repoSlug(targetRepo),
    `${itemNumber}.md`,
  );
  const preparedAt = new Date().toISOString();
  const context = {
    targetRepo,
    reportRepo,
    itemNumber,
    reportPath,
    reportUrl,
    report,
    reportMarkdown,
    live,
    decision,
    candidateKind,
    jobPath,
    auditPath,
    preparedAt,
    operatorOverride,
    overrideRequestedBy,
  };

  if (decision.shouldRepair) writeJob(context);
  writeAudit(context);

  const out = {
    status: decision.status,
    should_repair: decision.shouldRepair,
    reason: decision.reason,
    blockers: decision.blockers.join("; "),
    blocker_class: decision.blockerClass ?? "",
    operator_override: decision.operatorOverride === true ? "true" : "false",
    target_repo: targetRepo,
    item_number: itemNumber,
    candidate_kind: candidateKind,
    report_path: reportPath,
    report_url: reportUrl,
    audit_path: relative(auditPath),
    job_path: decision.shouldRepair ? relative(jobPath) : "",
  };
  writeStepOutputs(out);
  console.log(JSON.stringify(out, null, 2));
}

function candidates() {
  const enabled = stringArg("enabled", "true");
  const candidateKind = candidateKindArg();
  const artifactDir = path.resolve(
    stringArg("artifact-dir", stringArg("artifact_dir", "artifacts")),
  );
  const targetRepo = stringArg("target-repo", stringArg("target_repo", "openclaw/openclaw"));
  const reportRepo = stringArg(
    "report-repo",
    stringArg("report_repo", "openclaw/clawsweeper-state"),
  );
  const out: LooseRecord[] = [];
  if (truthy(enabled) && fs.existsSync(artifactDir)) {
    for (const file of findMarkdownFiles(artifactDir)) {
      const markdown = fs.readFileSync(file, "utf8");
      const report = parseReviewReport(markdown);
      const number = Number(report.frontmatter.number);
      const repository = report.frontmatter.repository || targetRepo;
      const reportPath = `records/${repoSlug(repository)}/items/${number}.md`;
      const reportUrl = `https://github.com/${reportRepo}/blob/${reportBranch(reportRepo)}/${reportPath}`;
      const decision = reportOnlyDecision({
        targetRepo,
        report,
        reportMarkdown: markdown,
        candidateKind,
      });
      if (!decision.shouldRepair) continue;
      out.push({ item_number: number, report_path: reportPath, report_url: reportUrl });
    }
  }
  const itemNumbers = out.map((entry: LooseRecord) => String(entry.item_number)).join(",");
  writeStepOutputs({
    count: out.length,
    item_numbers: itemNumbers,
    candidates_json: JSON.stringify(out),
  });
  console.log(JSON.stringify({ count: out.length, item_numbers: itemNumbers, candidates: out }));
}

export function parseReviewReport(markdown: string): ReviewReport {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?/);
  const frontmatter: Record<string, string> = {};
  if (match) {
    for (const line of (match[1] ?? "").split(/\r?\n/)) {
      const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (!kv) continue;
      frontmatter[kv[1] ?? ""] = parseFrontmatterScalar(kv[2] ?? "");
    }
  }
  return { frontmatter, body: match ? markdown.slice(match[0].length) : markdown };
}

export function reportOnlyDecision({
  targetRepo,
  report,
  reportMarkdown,
  candidateKind = "strict_bug",
  operatorOverride = false,
  itemNumber = Number(report.frontmatter.number),
}: {
  targetRepo: string;
  report: ReviewReport;
  reportMarkdown: string;
  candidateKind?: CandidateKind;
  operatorOverride?: boolean;
  itemNumber?: number;
}): IntakeDecision {
  return eligibilityDecision({
    targetRepo,
    report,
    reportMarkdown,
    live: null,
    enabled: "true",
    candidateKind,
    operatorOverride,
    itemNumber,
  });
}

function intakeDecision({
  enabled,
  targetRepo,
  itemNumber,
  candidateKind,
  report,
  reportMarkdown,
  live,
  operatorOverride,
}: {
  enabled: string;
  targetRepo: string;
  itemNumber: number;
  candidateKind: CandidateKind;
  report: ReviewReport;
  reportMarkdown: string;
  live: LooseRecord;
  operatorOverride: boolean;
}): IntakeDecision {
  return eligibilityDecision({
    enabled,
    targetRepo,
    itemNumber,
    candidateKind,
    report,
    reportMarkdown,
    live,
    operatorOverride,
  });
}

function eligibilityDecision({
  enabled,
  targetRepo,
  itemNumber,
  candidateKind,
  report,
  reportMarkdown,
  live,
  operatorOverride = false,
}: {
  enabled: string;
  targetRepo: string;
  itemNumber: number;
  candidateKind: CandidateKind;
  report: ReviewReport;
  reportMarkdown: string;
  live: LooseRecord | null;
  operatorOverride?: boolean;
}): IntakeDecision {
  const normalizedTargetRepo = targetRepo.trim().toLowerCase();
  if (!truthy(enabled)) {
    return decision("disabled", false, "issue implementation intake disabled");
  }
  if (
    candidateKind === "viable" &&
    (normalizedTargetRepo === "openclaw/openclaw" || normalizedTargetRepo === "openclaw/clawhub")
  ) {
    return decision(
      "not_eligible",
      false,
      `general viable implementation is disabled for ${targetRepo}`,
    );
  }
  const fm = report.frontmatter;
  const blockers: string[] = [];
  if (Number(fm.number) !== itemNumber) {
    blockers.push(`report item number is ${fm.number || "unknown"}`);
  }
  if (
    String(fm.repository ?? "")
      .trim()
      .toLowerCase() !== normalizedTargetRepo
  )
    blockers.push(`report repository is ${fm.repository || "unknown"}`);
  if (fm.type !== "issue") blockers.push(`report type is ${fm.type || "unknown"}`);
  if (fm.state_at_review !== "open") blockers.push("item was not open at review");
  if (fm.review_status !== "complete")
    blockers.push(`review status is ${fm.review_status || "unknown"}`);
  if (fm.decision !== "keep_open") blockers.push(`decision is ${fm.decision || "unknown"}`);
  if (fm.close_reason !== "none") blockers.push(`close reason is ${fm.close_reason || "unknown"}`);
  if (fm.confidence !== "high") blockers.push(`review confidence is ${fm.confidence || "unknown"}`);
  if (fm.work_candidate !== "queue_fix_pr")
    blockers.push(`work candidate is ${fm.work_candidate || "unknown"}`);
  if (fm.work_confidence !== "high")
    blockers.push(`work confidence is ${fm.work_confidence || "unknown"}`);
  if (candidateKind === "strict_bug") {
    if (fm.auto_implementation_candidate && fm.auto_implementation_candidate !== "strict_bug")
      blockers.push(`auto implementation candidate is ${fm.auto_implementation_candidate}`);
    if (fm.item_category !== "bug")
      blockers.push(`item category is ${fm.item_category || "unknown"}`);
    if (fm.reproduction_status !== "reproduced")
      blockers.push(`reproduction status is ${fm.reproduction_status || "unknown"}`);
    if (fm.reproduction_confidence !== "high")
      blockers.push(`reproduction confidence is ${fm.reproduction_confidence || "unknown"}`);
    if (fm.requires_new_feature === "true") blockers.push("requires a new feature");
    if (fm.requires_new_config_option === "true") blockers.push("requires a new config option");
    if (fm.requires_product_decision === "true") blockers.push("requires a product decision");
  } else if (candidateKind === "vision_fit") {
    if (fm.auto_implementation_candidate !== "vision_fit")
      blockers.push(
        `auto implementation candidate is ${fm.auto_implementation_candidate || "unknown"}`,
      );
    if (fm.vision_fit !== "aligned") blockers.push(`vision fit is ${fm.vision_fit || "unknown"}`);
    if (fm.implementation_complexity !== "small")
      blockers.push(`implementation complexity is ${fm.implementation_complexity || "unknown"}`);
    if (!visionFitItemCategoryAllowed(fm.item_category))
      blockers.push(`item category is ${fm.item_category || "unknown"}`);
    if (fm.requires_product_decision === "true") blockers.push("requires a product decision");
    if (frontMatterStringArray(fm.vision_fit_evidence).length === 0)
      blockers.push("missing vision-fit evidence");
  } else {
    if (!visionFitItemCategoryAllowed(fm.item_category))
      blockers.push(`item category is ${fm.item_category || "unknown"}`);
    if (fm.implementation_complexity !== "small")
      blockers.push(`implementation complexity is ${fm.implementation_complexity || "unknown"}`);
    if (fm.requires_product_decision === "true") blockers.push("requires a product decision");
    if (fm.vision_fit === "rejected") blockers.push("repository fit was rejected");
    if (frontMatterStringArray(fm.work_likely_files).length === 0)
      blockers.push("missing likely implementation files");
    if (fm.review_issue_body_truncated !== "false")
      blockers.push("issue body was truncated during review");
    if (fm.review_comments_truncated !== "false")
      blockers.push("issue comments were truncated during review");
    if (fm.review_timeline_truncated !== "false")
      blockers.push("issue timeline was truncated during review");
  }
  if (frontMatterStringArray(fm.labels).some(isProtectedLabel))
    blockers.push("protected label present");
  if (reportSecurityNeedsAttention(reportMarkdown))
    blockers.push("security-sensitive signal present");
  if (!section(report.body, "Repair Work Prompt").trim())
    blockers.push("missing repair work prompt");
  if (frontMatterStringArray(fm.work_validation).length === 0)
    blockers.push("missing validation commands");
  if (
    frontMatterStringArray(fm.work_cluster_refs).some((ref) =>
      /\/pull\/\d+|^pr[#:\s-]*\d+$/i.test(ref),
    )
  )
    blockers.push("work cluster references a PR");

  if (live) {
    const issue = asRecord(live.issue);
    const labels = (issue.labels ?? []).map((label: JsonValue) => String(label?.name ?? label));
    if (candidateKind === "viable") {
      blockers.push(
        ...viableReviewedStateBlockers({
          report,
          issue,
          comments: Array.isArray(live.comments) ? live.comments : [],
          itemNumber: Number(fm.number),
        }),
      );
    }
    if (issue.state !== "open") blockers.push(`live issue state is ${issue.state || "unknown"}`);
    if (issue.locked === true) blockers.push("live issue is locked");
    if (labels.some(isProtectedLabel)) blockers.push("live issue has protected label");
    if (
      sourceIssueHasSecuritySignal(
        issue,
        Array.isArray(live.comments) ? live.comments.map(asRecord) : [],
      )
    ) {
      blockers.push("live issue has security-sensitive signal");
    }
    if (attachedPrText(live)) blockers.push("issue already has a PR reference attached");
    if (Array.isArray(live.existingPrs) && live.existingPrs.length > 0) {
      blockers.push("open PR already mentions this issue");
    }
    if (Array.isArray(live.existingBranchPrs) && live.existingBranchPrs.length > 0) {
      blockers.push("existing ClawSweeper issue implementation PR is open");
    }
  }

  if (blockers.length) {
    const blockerClass = strongestBlockerClass(blockers);
    if (operatorOverride) {
      return {
        status: blockerClass === "hard" ? "override_handoff" : "override_queued_for_repair",
        shouldRepair: true,
        reason: blockers[0] ?? "not eligible",
        blockers,
        blockerClass,
        operatorOverride: true,
      };
    }
    return {
      status: "not_eligible",
      shouldRepair: false,
      reason: blockers[0] ?? "not eligible",
      blockers,
      blockerClass,
    };
  }
  return decision(
    "queued_for_repair",
    true,
    candidateKind === "vision_fit"
      ? "vision-fit issue is eligible for ClawSweeper implementation"
      : candidateKind === "viable"
        ? "viable issue is eligible for autonomous ClawSweeper implementation"
        : "strict reproducible bug is eligible for ClawSweeper implementation",
  );
}

function writeJob(context: LooseRecord) {
  const fm = context.report.frontmatter as Record<string, string>;
  const issue = asRecord(context.live.issue);
  const comments = Array.isArray(context.live.comments) ? context.live.comments : [];
  const candidateKind = context.candidateKind as CandidateKind;
  const body = renderIssueImplementationJob({
    repo: context.targetRepo,
    issueNumber: context.itemNumber,
    title: issue.title || displayTitle(fm.title ?? "") || `Issue #${context.itemNumber}`,
    implementationPrompt:
      candidateKind === "vision_fit"
        ? visionFitImplementationPrompt(context)
        : candidateKind === "viable"
          ? viableImplementationPrompt(context)
          : strictImplementationPrompt(context),
    triggerSource:
      candidateKind === "vision_fit"
        ? REVIEW_VISION_FIT_TRIGGER_SOURCE
        : candidateKind === "viable"
          ? REVIEW_VIABLE_ISSUE_TRIGGER_SOURCE
          : REVIEW_REPRODUCIBLE_BUG_TRIGGER_SOURCE,
    reviewReportUrl: context.reportUrl,
    reviewReportPath: context.reportPath,
    strictBugOnly: candidateKind === "strict_bug",
    visionFit: candidateKind === "vision_fit",
    generalViable: candidateKind === "viable",
    automergeGeneratedPr: candidateKind === "viable",
    sourceIssueSnapshotSha256:
      candidateKind === "viable" ? issueImplementationSnapshotSha256(issue, comments) : null,
    sourceIssueUpdatedAt: candidateKind === "viable" ? issue.updated_at : null,
    operatorOverride: context.operatorOverride === true,
    overrideRequestedBy: context.overrideRequestedBy,
    overrideReason:
      context.operatorOverride === true ? "maintainer requested /clawsweeper build override" : null,
    overrideBlockerClass: context.decision.blockerClass,
    overrideAction:
      context.operatorOverride === true
        ? issueImplementationOverrideAction(context.decision.reason)
        : null,
  });
  fs.mkdirSync(path.dirname(context.jobPath), { recursive: true });
  fs.writeFileSync(context.jobPath, body, "utf8");
  const errors = validateJob(parseJob(context.jobPath));
  if (errors.length) die(errors.join("\n"));
}

function viableImplementationPrompt(context: LooseRecord) {
  const fm = context.report.frontmatter as Record<string, string>;
  const validation = frontMatterStringArray(fm.work_validation);
  const likelyFiles = frontMatterStringArray(fm.work_likely_files);
  const workPrompt = section(context.report.body, "Repair Work Prompt");
  return [
    "This was selected by ClawSweeper's general viable-issue lane.",
    "",
    `Review report: ${context.reportUrl}`,
    `Category: ${fm.item_category}`,
    `Implementation complexity: ${fm.implementation_complexity}`,
    "",
    "Implementation boundary:",
    "",
    "- verify the issue is coherent, useful, and still applicable on the latest default branch",
    "- keep one small focused PR",
    "- stop for nonsense, security-sensitive work, product decisions, or broad scope",
    "- follow the repository's AGENTS.md and contribution rules",
    "- include the source issue closing reference in the PR body",
    "- leave merge to the exact-head ClawSweeper automerge loop",
    "",
    "Review work prompt:",
    "",
    workPrompt.trim() || fm.work_reason_sha256 || "Implement the narrow viable issue.",
    "",
    "Likely files:",
    "",
    ...likelyFiles.map((file) => `- ${file}`),
    "",
    "Validation:",
    "",
    ...validation.map((command) => `- ${command}`),
  ].join("\n");
}

function strictImplementationPrompt(context: LooseRecord) {
  const fm = context.report.frontmatter as Record<string, string>;
  const validation = frontMatterStringArray(fm.work_validation);
  const likelyFiles = frontMatterStringArray(fm.work_likely_files);
  const workPrompt = section(context.report.body, "Repair Work Prompt");
  return [
    "This was selected by ClawSweeper's strict reproducible-bug lane.",
    "",
    `Review report: ${context.reportUrl}`,
    `Category: ${fm.item_category}`,
    `Reproduction: ${fm.reproduction_status} (${fm.reproduction_confidence})`,
    "Feature/config/product blockers: false.",
    "",
    "Bug-fix boundary:",
    "",
    "- fix broken existing behavior only",
    "- do not add config options, feature modes, providers, broad UX changes, or product policy",
    "- reproduce first; if reproduction fails on the latest default branch, stop and report that blocker",
    "",
    "Review work prompt:",
    "",
    workPrompt.trim() || fm.work_reason_sha256 || "Fix the narrow reproduced bug.",
    "",
    "Likely files:",
    "",
    ...(likelyFiles.length ? likelyFiles.map((file) => `- ${file}`) : ["- unknown"]),
    "",
    "Validation:",
    "",
    ...(validation.length ? validation.map((command) => `- ${command}`) : ["- pnpm check:changed"]),
  ].join("\n");
}

function visionFitImplementationPrompt(context: LooseRecord) {
  const fm = context.report.frontmatter as Record<string, string>;
  const validation = frontMatterStringArray(fm.work_validation);
  const likelyFiles = frontMatterStringArray(fm.work_likely_files);
  const visionEvidence = frontMatterStringArray(fm.vision_fit_evidence);
  const workPrompt = section(context.report.body, "Repair Work Prompt");
  return [
    "This was selected by ClawSweeper's vision-fit issue lane.",
    "",
    `Review report: ${context.reportUrl}`,
    `Category: ${fm.item_category}`,
    `Vision fit: ${fm.vision_fit}`,
    `Implementation complexity: ${fm.implementation_complexity}`,
    "",
    "Vision evidence:",
    "",
    ...(visionEvidence.length ? visionEvidence.map((entry) => `- ${entry}`) : ["- unknown"]),
    "",
    "Implementation boundary:",
    "",
    "- read VISION.md before editing and stop if the issue no longer fits it",
    "- keep one small focused PR",
    "- stop if the work expands into medium/large scope or needs a product decision",
    "- preserve plugin, ClawHub, extension, config, and docs boundaries from VISION.md",
    "",
    "Review work prompt:",
    "",
    workPrompt.trim() || fm.work_reason_sha256 || "Implement the narrow vision-fit issue.",
    "",
    "Likely files:",
    "",
    ...(likelyFiles.length ? likelyFiles.map((file) => `- ${file}`) : ["- unknown"]),
    "",
    "Validation:",
    "",
    ...(validation.length ? validation.map((command) => `- ${command}`) : ["- pnpm check:changed"]),
  ].join("\n");
}

function writeAudit(context: LooseRecord) {
  fs.mkdirSync(path.dirname(context.auditPath), { recursive: true });
  const jobLine = context.decision.shouldRepair
    ? `- Job: \`${relative(context.jobPath)}\``
    : "- Job: none";
  const body = `---
repo: ${context.targetRepo}
number: ${context.itemNumber}
report_repo: ${context.reportRepo}
report_path: ${context.reportPath}
decision: ${context.decision.status}
prepared_at: ${context.preparedAt}
---

# Issue Implementation Intake ${context.itemNumber}

- Decision: \`${context.decision.status}\`
- Candidate kind: \`${context.candidateKind}\`
- Reason: ${context.decision.reason}
- Blocker class: ${context.decision.blockerClass ?? "none"}
- Operator override: ${context.operatorOverride === true ? "true" : "false"}
- Report: ${context.reportUrl}
- Branch: \`${issueImplementationJobBranch(context.targetRepo, context.itemNumber)}\`
${jobLine}

## Blockers

${context.decision.blockers.length ? context.decision.blockers.map((blocker: string) => `- ${blocker}`).join("\n") : "- none"}
`;
  fs.writeFileSync(context.auditPath, body, "utf8");
}

function liveIssueContext({ repo, number }: { repo: string; number: number }) {
  const [owner, name] = repo.split("/");
  const issue = ghJsonWithRetry([
    "api",
    `repos/${owner}/${name}/issues/${number}`,
    "--method",
    "GET",
  ]);
  const comments = ghPagedWithRetry<LooseRecord>(
    `repos/${owner}/${name}/issues/${number}/comments`,
  );
  const branch = issueImplementationJobBranch(repo, number);
  const existingBranchPrs = ghJsonWithRetry(
    [
      "api",
      `repos/${owner}/${name}/pulls`,
      "--method",
      "GET",
      "-f",
      `head=${owner}:${branch}`,
      "-f",
      "state=open",
      "--jq",
      "[.[] | {number, url: .html_url}]",
    ],
    { attempts: 3 },
  );
  const existingPrs = searchOpenPullRequestsMentioningIssue(repo, number);
  return { issue, comments, existingPrs, existingBranchPrs };
}

function searchOpenPullRequestsMentioningIssue(repo: string, number: number): LooseRecord[] {
  try {
    const result = ghJsonWithRetry(
      [
        "api",
        "search/issues",
        "--method",
        "GET",
        "-f",
        `q=repo:${repo} is:pr is:open "${number}"`,
        "--jq",
        ".items",
      ],
      { attempts: 3 },
    );
    return Array.isArray(result) ? result : [];
  } catch (error) {
    throw new Error(`failed to search open PRs mentioning issue: ${ghErrorText(error)}`);
  }
}

function attachedPrText(live: LooseRecord): boolean {
  const issue = asRecord(live.issue);
  const comments = Array.isArray(live.comments) ? live.comments : [];
  const text = [issue.body, ...comments.map((comment: JsonValue) => asRecord(comment).body)]
    .map((part) => String(part ?? ""))
    .join("\n");
  return /\/pull\/\d+\b|\b(?:PR|pull request)\s+#?\d+\b/i.test(text);
}

export function viableReviewedStateBlockers({
  report,
  issue,
  comments,
  itemNumber,
}: {
  report: ReviewReport;
  issue: Record<string, JsonValue>;
  comments: LooseRecord[];
  itemNumber: number;
}): string[] {
  const blockers: string[] = [];
  const reviewedUpdatedAt = report.frontmatter.item_updated_at ?? "";
  const reviewedAt = report.frontmatter.reviewed_at ?? "";
  const reviewedBodySha256 = report.frontmatter.item_body_sha256 ?? "";
  if (!reviewedUpdatedAt) blockers.push("review report is missing item_updated_at");
  if (!reviewedAt) blockers.push("review report is missing reviewed_at");
  if (!/^[a-f0-9]{64}$/i.test(reviewedBodySha256)) {
    blockers.push("review report is missing item_body_sha256");
  } else if (
    sha256(typeof issue.body === "string" ? issue.body : "") !== reviewedBodySha256.toLowerCase()
  ) {
    blockers.push("live issue body changed since review");
  }

  const reviewedLabels = frontMatterStringArray(report.frontmatter.labels)
    .map(normalizedLabel)
    .sort();
  const liveLabels = (issue.labels ?? [])
    .map((label: JsonValue) => normalizedLabel(String(label?.name ?? label)))
    .sort();
  if (JSON.stringify(reviewedLabels) !== JSON.stringify(liveLabels)) {
    blockers.push("live issue labels changed since review");
  }
  if (displayTitle(report.frontmatter.title ?? "") !== String(issue.title ?? "")) {
    blockers.push("live issue title changed since review");
  }

  const liveUpdatedAt = String(issue.updated_at ?? "");
  if (reviewedUpdatedAt && liveUpdatedAt && liveUpdatedAt !== reviewedUpdatedAt) {
    const durableReviewUpdate = comments.some((comment) => {
      const record = asRecord(comment);
      return (
        isClawSweeperAutomationComment(record) &&
        String(record.body ?? "").includes(`<!-- clawsweeper-review item=${itemNumber} -->`) &&
        String(record.updated_at ?? record.created_at ?? "") === liveUpdatedAt
      );
    });
    if (!durableReviewUpdate) blockers.push("live issue updated_at changed since review");
  }

  const reviewedUpdatedAtMs = Date.parse(reviewedUpdatedAt);
  const reviewedAtMs = Date.parse(reviewedAt);
  for (const comment of comments) {
    if (isClawSweeperAutomationComment(comment)) continue;
    const timestamp = Date.parse(String(comment.updated_at ?? comment.created_at ?? ""));
    if (
      Number.isFinite(timestamp) &&
      ((Number.isFinite(reviewedUpdatedAtMs) && timestamp > reviewedUpdatedAtMs) ||
        (Number.isFinite(reviewedAtMs) && timestamp > reviewedAtMs))
    ) {
      blockers.push("non-automation issue comment changed since review");
      break;
    }
  }
  return blockers;
}

function normalizedLabel(value: string) {
  return value.trim().toLowerCase();
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function readReport({ reportRepo, reportPath }: { reportRepo: string; reportPath: string }) {
  const local = args["report-file"] ?? args.report_file;
  if (typeof local === "string") return fs.readFileSync(path.resolve(local), "utf8");
  const reportToken = String(process.env.CLAWSWEEPER_REPORT_GH_TOKEN ?? "").trim();
  const content = ghJsonWithRetry<{ content?: string }>(
    [
      "api",
      `repos/${reportRepo}/contents/${reportPath}`,
      "--method",
      "GET",
      "-f",
      `ref=${reportBranch(reportRepo)}`,
    ],
    reportToken ? { env: { GH_TOKEN: reportToken } } : {},
  );
  return Buffer.from(String(content.content ?? "").replace(/\s+/g, ""), "base64").toString("utf8");
}

function findMarkdownFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findMarkdownFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function section(markdown: string, heading: string) {
  const match = markdown.match(
    new RegExp(`(?:^|\\n)## ${escapeRegExp(heading)}\\n\\n([\\s\\S]*?)(?=\\n## |\\n?$)`, "i"),
  );
  return match?.[1]?.trim() ?? "";
}

function frontMatterStringArray(value: string | undefined): string[] {
  if (!value || value === "none") return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    if (Array.isArray(parsed))
      return parsed.filter((entry): entry is string => typeof entry === "string");
  } catch {
    // Legacy comma-separated reports.
  }
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function decision(status: string, shouldRepair: boolean, reason: string): IntakeDecision {
  return { status, shouldRepair, reason, blockers: shouldRepair ? [] : [reason] };
}

function strongestBlockerClass(blockers: string[]): "soft" | "hard" {
  return blockers.some((blocker) => issueImplementationBlockerClass(blocker) === "hard")
    ? "hard"
    : "soft";
}

function writeStepOutputs(values: Record<string, JsonValue>) {
  const output = process.env.GITHUB_OUTPUT;
  if (!output) return;
  const lines: string[] = [];
  for (const [key, value] of Object.entries(values)) {
    const text = typeof value === "string" ? value : JSON.stringify(value);
    lines.push(`${key}=${text}`);
  }
  fs.appendFileSync(output, `${lines.join("\n")}\n`);
}

function isProtectedLabel(label: string): boolean {
  return ["security", "beta-blocker", "release-blocker", "maintainer"].includes(
    label.trim().toLowerCase(),
  );
}

function visionFitItemCategoryAllowed(value: string | undefined): boolean {
  return ["bug", "regression", "feature", "skill", "docs", "cleanup"].includes(value ?? "");
}

function securitySensitiveText(text: string): boolean {
  return /\b(?:security|vulnerability|cve|ghsa|secret|credential|token|exploit|xss|csrf|ssrf|rce)\b/i.test(
    text,
  );
}

function reportSecurityNeedsAttention(markdown: string): boolean {
  const securityReview = section(markdown, "Security Review");
  const status = securityReview.match(/^Status:\s*([a-z_]+)\s*$/im)?.[1]?.toLowerCase();
  if (status === "needs_attention") return true;
  if (["not_applicable", "clear", "cleared", "none"].includes(status ?? "")) return false;
  return securitySensitiveText(securityReview || markdown);
}

function asRecord(value: unknown): Record<string, JsonValue> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, JsonValue>)
    : {};
}

function stringArg(key: string, fallback = ""): string {
  const value = args[key];
  return typeof value === "string" ? value : fallback;
}

function candidateKindArg(): CandidateKind {
  const value = stringArg("candidate-kind", stringArg("candidate_kind", "strict_bug")).trim();
  if (value === "strict_bug" || value === "vision_fit" || value === "viable") return value;
  die(`invalid candidate kind: ${value}`);
}

function positiveInteger(value: string, label: string): number {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) die(`invalid ${label}: ${value}`);
  return number;
}

function truthy(value: JsonValue) {
  return ["1", "true", "yes", "on"].includes(String(value ?? "").toLowerCase());
}

function repoSlug(repo: string) {
  return repo
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_.-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function reportBranch(reportRepo: string) {
  return reportRepo.trim().toLowerCase() === "openclaw/clawsweeper-state" ? "state" : "main";
}

function displayTitle(value: string) {
  return value;
}

function parseFrontmatterScalar(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      const parsed = JSON.parse(trimmed);
      return typeof parsed === "string" ? parsed : trimmed;
    } catch {
      return trimmed;
    }
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replaceAll("''", "'");
  }
  return trimmed;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function relative(filePath: string) {
  return path.relative(repoRoot(), filePath);
}

function die(message: string): never {
  console.error(message);
  process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
