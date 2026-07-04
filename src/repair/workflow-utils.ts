#!/usr/bin/env node
import type { JsonValue, LooseRecord } from "./json-types.js";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "./lib.js";
import { isJsonObject } from "./json-types.js";
import { AUTOMATION_LIMITS, WORKER_CONFIG, workerLimit, type WorkerLane } from "./limits.js";

type ApplyAction = {
  action: string;
  number?: number;
  reason?: string;
};

type ApplyReportSummaryOptions = {
  reportPath: string;
  targetRepo: string;
  mode: string;
  processedLimit: number;
  closeLimit: number | null;
  cursorPath: string;
  cursorRequired: boolean;
};

type ApplyReportSummary = {
  schema_version: 1;
  generated_at: string;
  target_repo: string;
  mode: string;
  status: "ok" | "idle" | "needs_attention";
  summary: string;
  processed: number;
  processed_limit: number | null;
  close_limit: number | null;
  closed: number;
  comment_synced: number;
  skipped: number;
  skip_reasons: Record<string, number>;
  attention_reasons: string[];
  cursor_required: boolean;
  cursor: {
    path: string;
    next_after_number: number;
    next_after_apply_checked_at: string | null;
    updated_at: string | null;
  } | null;
};

const args = parseArgs(process.argv.slice(2));

function runCli(): void {
  const command = args._[0];
  if (!command) throw new Error("workflow utility command is required");

  switch (command) {
    case "plan-output":
      printPlanOutput();
      break;
    case "classify-output":
      printClassifyOutput();
      break;
    case "artifact-item-numbers":
      process.stdout.write(artifactItemNumbers(requiredString("artifact-dir")).join(","));
      break;
    case "count-csv":
      console.log(csvItems(optionalString("items")).length);
      break;
    case "count-report":
      console.log(countActions(requiredString("report"), ""));
      break;
    case "count-actions":
      console.log(countActions(requiredString("report"), requiredString("action")));
      break;
    case "summarize-apply-report":
      process.stdout.write(
        `${JSON.stringify(
          summarizeApplyReport({
            reportPath: requiredString("report"),
            targetRepo: requiredString("target-repo"),
            mode: optionalString("mode") || "close",
            processedLimit: numberArg("processed-limit", 0),
            closeLimit: optionalString("close-limit") ? numberArg("close-limit", 0) : null,
            cursorPath: optionalString("cursor-path"),
            cursorRequired: booleanArg("cursor-required", false),
          }),
          null,
          2,
        )}\n`,
      );
      break;
    case "count-command-actions":
      console.log(
        countCommandActions(
          requiredString("report"),
          requiredString("action"),
          optionalString("status"),
        ),
      );
      break;
    case "count-requeue-required":
      console.log(countRequeueRequired(requiredString("dir")));
      break;
    case "limit":
      process.stdout.write(String(automationLimit(optionalString("path") || positionalString(1))));
      break;
    case "worker-limit":
      process.stdout.write(
        String(
          workerLimit(requiredWorkerLane(optionalString("lane") || positionalString(1)), {
            activeCritical: numberArg("active-critical", 0),
            activeBackground: numberArg("active-background", 0),
          }),
        ),
      );
      break;
    case "worker-config":
      process.stdout.write(JSON.stringify(WORKER_CONFIG, null, 2));
      break;
    case "proposed-item-numbers":
      process.stdout.write(proposedItemNumbers(proposedItemOptions()).join(","));
      break;
    case "proposed-pr-close-coverage-item-numbers":
      process.stdout.write(proposedPrCloseCoverageItemNumbers(proposedItemOptions()).join(","));
      break;
    case "comment-sync-batch":
      printOutput(commentSyncBatchOutput(commentSyncBatchOptions()));
      break;
    case "write-comment-sync-cursor":
      writeCommentSyncCursor(
        requiredString("cursor-path"),
        numberArg("next-cursor", 0),
        requiredString("target-repo"),
      );
      break;
    case "write-apply-cursor":
      writeApplyCursor(
        requiredString("cursor-path"),
        requiredString("report"),
        requiredString("target-repo"),
        optionalString("item-numbers"),
      );
      break;
    case "merge-apply-reports":
      mergeApplyReports(requiredString("dir"), requiredString("output"));
      break;
    default:
      throw new Error(`unknown workflow utility command: ${command}`);
  }
}

function requiredWorkerLane(value: string): WorkerLane {
  const allowed = new Set<WorkerLane>([
    "normal_review",
    "hot_intake",
    "commit_review",
    "repair",
    "automerge_repair",
    "issue_implementation",
    "cluster_repair",
    "exact_item",
    "assist",
  ]);
  if (allowed.has(value as WorkerLane)) return value as WorkerLane;
  throw new Error(`unknown worker lane: ${value}`);
}

export function automationLimit(limitPath: string): number {
  let cursor: unknown = AUTOMATION_LIMITS;
  for (const segment of limitPath.split(".")) {
    if (!segment) throw new Error(`invalid automation limit path: ${limitPath}`);
    if (!isJsonObject(cursor) || !(segment in cursor)) {
      throw new Error(`unknown automation limit: ${limitPath}`);
    }
    cursor = cursor[segment];
  }
  if (typeof cursor !== "number" || !Number.isInteger(cursor) || cursor < 1) {
    throw new Error(`automation limit ${limitPath} must resolve to a positive integer`);
  }
  return cursor;
}

function printPlanOutput(): void {
  const plan = readJsonObject(requiredString("plan"));
  const batchSize = positiveNumber(optionalString("batch-size"), 5);
  const shardCount = positiveNumber(
    optionalString("shard-count"),
    AUTOMATION_LIMITS.review_shards.normal_default,
  );
  printOutput(planOutputFields(plan, { batchSize, shardCount }));
}

export function planOutputFields(
  plan: LooseRecord,
  options: { batchSize: number; shardCount: number },
): Record<string, string> {
  const matrix = Array.isArray(plan.matrix) ? plan.matrix : [];
  const candidates = Array.isArray(plan.candidates) ? plan.candidates : [];
  const planCapacity = Number(plan.capacity);
  const capacity = Number.isFinite(planCapacity)
    ? planCapacity
    : options.batchSize * options.shardCount;
  return {
    matrix: JSON.stringify(matrix),
    planned_count: String(candidates.length),
    planned_capacity: String(capacity),
    planned_item_numbers: plannedItemNumberCsv(plan),
    planned_shards: String(matrix.length),
    active_codex_target: String(numberFromPlan(plan.activeCodexTarget, matrix.length)),
    due_backlog: String(numberFromPlan(plan.dueBacklog, candidates.length)),
    oldest_unreviewed_at:
      typeof plan.oldestUnreviewedAt === "string" ? plan.oldestUnreviewedAt : "",
    capacity_reason:
      typeof plan.capacityReason === "string" && plan.capacityReason.trim()
        ? plan.capacityReason
        : defaultCapacityReason(
            candidates.length,
            numberFromPlan(plan.dueBacklog, candidates.length),
            capacity,
          ),
  };
}

function numberFromPlan(value: JsonValue | undefined, fallback: number): number {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function defaultCapacityReason(
  selectedCount: number,
  dueBacklog: number,
  capacity: number,
): string {
  if (selectedCount === 0) return "idle: no due candidates found";
  if (dueBacklog >= capacity) return "saturated: due backlog filled planned capacity";
  return "under capacity: due backlog below planned capacity";
}

export function plannedItemNumberCsv(plan: LooseRecord): string {
  const candidates: JsonValue[] = Array.isArray(plan.candidates) ? plan.candidates : [];
  return candidates
    .map((candidate) => candidateItemNumber(candidate))
    .filter((number): number is number => typeof number === "number")
    .join(",");
}

function candidateItemNumber(candidate: JsonValue): number | null {
  if (!isJsonObject(candidate)) return null;
  const number = Number(candidate.number);
  return Number.isInteger(number) && number > 0 ? number : null;
}

function printClassifyOutput(): void {
  const classified = readJsonObject(requiredString("classify"));
  const review = stringArray(classified.review);
  const skipped = Array.isArray(classified.skipped) ? classified.skipped : [];
  printOutput({
    matrix: JSON.stringify(review.map((sha) => ({ sha }))),
    planned_count: String(review.length),
    skipped_count: String(skipped.length),
    has_more: optionalString("has-more") || "false",
    next_offset: optionalString("next-offset") || "0",
  });
}

export function artifactItemNumbers(artifactDir: string): number[] {
  if (!fs.existsSync(artifactDir)) return [];
  return fs
    .readdirSync(artifactDir, { recursive: true })
    .map((name) => path.basename(String(name), ".md").match(/(\d+)$/)?.[1])
    .filter((value): value is string => Boolean(value))
    .map(Number)
    .filter((value) => Number.isInteger(value) && value > 0)
    .sort((left, right) => left - right);
}

export function countActions(reportPath: string, action: string): number {
  if (!action) return readApplyActions(reportPath).length;
  return readApplyActions(reportPath).filter((entry) => entry.action === action).length;
}

export function summarizeApplyReport(options: ApplyReportSummaryOptions): ApplyReportSummary {
  const actions = readApplyActions(options.reportPath);
  const skipReasons: Record<string, number> = {};
  let closed = 0;
  let commentSynced = 0;
  let skipped = 0;
  for (const entry of actions) {
    if (entry.action === "closed") closed += 1;
    if (reportsReviewCommentSync(entry)) commentSynced += 1;
    const productive =
      entry.action === "closed" ||
      entry.action === "review_comment_synced" ||
      (entry.action === "kept_open" && isSuccessfulLabelSyncReason(entry.reason));
    if (!productive) {
      skipped += 1;
      skipReasons[entry.action] = (skipReasons[entry.action] || 0) + 1;
    }
  }

  const cursor = readApplyCursorForSummary(options.cursorPath);
  const processedLimit = options.processedLimit > 0 ? options.processedLimit : null;
  const attentionReasons: string[] = [];
  if (
    options.cursorRequired &&
    processedLimit !== null &&
    actions.length >= processedLimit &&
    !cursor
  ) {
    attentionReasons.push("cursor_required_but_missing_after_full_window");
  }
  for (const reason of ["skipped_runtime_budget", "skipped_live_fetch_failed"]) {
    if ((skipReasons[reason] || 0) > 0) attentionReasons.push(reason);
  }
  if (actions.length > 0 && skipped === actions.length) {
    const benignSkipReasons = new Set([
      "skipped_already_closed",
      "skipped_closed",
      "skipped_not_open",
    ]);
    for (const reason of Object.keys(skipReasons).sort()) {
      if (!benignSkipReasons.has(reason) && !attentionReasons.includes(reason)) {
        attentionReasons.push(reason);
      }
    }
  }

  const status =
    actions.length === 0 ? "idle" : attentionReasons.length > 0 ? "needs_attention" : "ok";
  const summary = applyReportHealthSummary({
    status,
    processed: actions.length,
    processedLimit,
    closed,
    commentSynced,
    skipped,
    cursor,
    attentionReasons,
  });

  return {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    target_repo: options.targetRepo,
    mode: options.mode,
    status,
    summary,
    processed: actions.length,
    processed_limit: processedLimit,
    close_limit: options.closeLimit,
    closed,
    comment_synced: commentSynced,
    skipped,
    skip_reasons: Object.fromEntries(
      Object.entries(skipReasons).sort(([left], [right]) => left.localeCompare(right)),
    ),
    attention_reasons: attentionReasons,
    cursor_required: options.cursorRequired,
    cursor,
  };
}

function applyReportHealthSummary(options: {
  status: ApplyReportSummary["status"];
  processed: number;
  processedLimit: number | null;
  closed: number;
  commentSynced: number;
  skipped: number;
  cursor: ApplyReportSummary["cursor"];
  attentionReasons: string[];
}): string {
  if (options.status === "idle") return "Apply processed no records in this run.";
  const budget =
    options.processedLimit === null
      ? `${options.processed} processed`
      : `${options.processed}/${options.processedLimit} processed`;
  const cursorText = options.cursor
    ? `cursor at #${options.cursor.next_after_number}`
    : "no cursor recorded";
  const base = `${budget}; ${options.closed} closed, ${options.commentSynced} comments synced, ${options.skipped} skipped; ${cursorText}.`;
  if (options.attentionReasons.length === 0) return base;
  return `${base} Attention: ${options.attentionReasons.join(", ")}.`;
}

export function countCommandActions(reportPath: string, action: string, status = ""): number {
  const report = readJsonObject(reportPath);
  const commands: JsonValue[] = Array.isArray(report.commands) ? report.commands : [];
  const statuses = new Set(
    status
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );
  return commands
    .flatMap((command: JsonValue): JsonValue[] =>
      isJsonObject(command) && Array.isArray(command.actions) ? command.actions : [],
    )
    .filter((entry: JsonValue): entry is LooseRecord => isJsonObject(entry))
    .filter((entry: LooseRecord) => entry.action === action)
    .filter((entry: LooseRecord) => statuses.size === 0 || statuses.has(String(entry.status)))
    .length;
}

export function countRequeueRequired(reportDir: string): number {
  return resultFiles(reportDir)
    .flatMap((file) => resultActions(file))
    .filter((action) => action.requeue_required === true).length;
}

export function mergeApplyReports(reportDir: string, outputPath: string): void {
  const reports = fs.existsSync(reportDir)
    ? fs
        .readdirSync(reportDir)
        .filter((name) => /^apply-report-\d+\.json$/.test(name))
        .sort((left, right) => checkpointNumber(left) - checkpointNumber(right))
    : [];
  const combined = reports.flatMap((name) => readApplyActions(path.join(reportDir, name)));
  fs.writeFileSync(outputPath, `${JSON.stringify(combined, null, 2)}\n`);
}

type ProposedItemOptions = {
  targetRepo: string;
  applyKind: string;
  applyCloseReasons: string;
  staleMinAgeDays: number;
  minAgeDays: number;
  minAgeMinutes: number | null;
  batchSize?: number | null;
  cursorPath?: string | null;
  itemNumbers?: ReadonlySet<number> | null;
};

type CommentSyncBatchOptions = {
  targetRepo: string;
  applyKind: string;
  batchSize: number;
  cursorPath: string;
};

export function proposedItemNumbers(options: ProposedItemOptions): number[] {
  return selectedProposedItemCandidates(options, "all").map((candidate) => candidate.number);
}

export function proposedPrCloseCoverageItemNumbers(options: ProposedItemOptions): number[] {
  return selectedProposedItemCandidates(options, "pr-close-coverage-proof").map(
    (candidate) => candidate.number,
  );
}

type ProposedItemSelection = "all" | "pr-close-coverage-proof";

type ProposedItemCandidate = {
  number: number;
  applyCheckedAt: string;
};

function selectedProposedItemCandidates(
  options: ProposedItemOptions,
  selection: ProposedItemSelection,
): ProposedItemCandidate[] {
  const itemsDir = path.join("records", targetSlug(options.targetRepo), "items");
  if (!fs.existsSync(itemsDir)) return [];

  const allowedReasons = new Set([
    "cannot_reproduce",
    "clawhub",
    "duplicate_or_superseded",
    "incoherent",
    "implemented_on_main",
    "low_signal_unmergeable_pr",
    "mostly_implemented_on_main",
    "not_actionable_in_repo",
    "stale_insufficient_info",
    "unconfirmed_product_direction",
  ]);
  const allowedCloseReasons =
    options.applyCloseReasons === "all"
      ? null
      : new Set(
          options.applyCloseReasons
            .split(",")
            .map((reason) => reason.trim())
            .filter(Boolean),
        );
  const minAgeMs =
    options.minAgeMinutes === null
      ? options.minAgeDays * 24 * 60 * 60 * 1000
      : options.minAgeMinutes * 60 * 1000;

  const candidates = fs
    .readdirSync(itemsDir)
    .filter((name) => /(?:^|[a-z0-9-]-)\d+\.md$/.test(name))
    .flatMap((name) => {
      const number = numberFor(name);
      if (options.itemNumbers && !options.itemNumbers.has(number)) return [];
      const markdown = fs.readFileSync(path.join(itemsDir, name), "utf8");
      if (repoFor(markdown, name) !== options.targetRepo) return [];
      const type = frontMatterValue(markdown, "type");
      if (options.applyKind !== "all" && type && type !== options.applyKind) return [];
      const decision = frontMatterValue(markdown, "decision");
      const action = frontMatterValue(markdown, "action_taken");
      const confidence = frontMatterValue(markdown, "confidence");
      const reason = frontMatterValue(markdown, "close_reason");
      const selectableClose =
        decision === "close" &&
        confidence === "high" &&
        isSelectableCloseAction(action, reason) &&
        allowedForTarget(options.targetRepo, type, reason, allowedReasons) &&
        (!allowedCloseReasons || allowedCloseReasons.has(reason));
      const selectablePromotion =
        decision === "keep_open" &&
        action === "kept_open" &&
        type === "pull_request" &&
        frontMatterValue(markdown, "review_status") === "complete" &&
        frontMatterValue(markdown, "local_checkout_access") === "verified" &&
        hasPullRequestClosePromotionSignal(markdown, options.targetRepo, {
          staleMinAgeMs: options.staleMinAgeDays * 24 * 60 * 60 * 1000,
        }) &&
        allowedForTarget(options.targetRepo, type, "duplicate_or_superseded", allowedReasons) &&
        (!allowedCloseReasons || allowedCloseReasons.has("duplicate_or_superseded"));
      const selectableProofPromotion =
        selectablePromotion && hasLinkedPullRequestSupersessionSignal(markdown, options.targetRepo);
      if (!selectableClose && !selectablePromotion) return [];
      const prCloseCoverageProofCanRun =
        type === "pull_request" &&
        ((selectableClose && reason === "duplicate_or_superseded") || selectableProofPromotion);
      if (selection === "pr-close-coverage-proof" && !prCloseCoverageProofCanRun) return [];
      if (
        (reason === "stale_insufficient_info" || reason === "mostly_implemented_on_main") &&
        !olderThan(
          frontMatterValue(markdown, "item_created_at"),
          options.staleMinAgeDays * 24 * 60 * 60 * 1000,
        )
      ) {
        return [];
      }
      if (!olderThan(frontMatterValue(markdown, "item_created_at"), minAgeMs)) return [];
      return [{ number, applyCheckedAt: frontMatterValue(markdown, "apply_checked_at") }];
    })
    .sort((left, right) => left.number - right.number);
  const batchSize = options.batchSize ?? null;
  if (!batchSize || batchSize <= 0) return candidates;
  const sorted = [...candidates].sort(compareApplyCursorCandidate);
  const cursor = options.cursorPath ? readApplyCursor(options.cursorPath) : null;
  if (!cursor) return sorted.slice(0, batchSize);
  const afterCursor = sorted.filter(
    (candidate) => compareCandidateToApplyCursor(candidate, cursor) > 0,
  );
  return [
    ...afterCursor,
    ...sorted.filter((candidate) => compareCandidateToApplyCursor(candidate, cursor) <= 0),
  ].slice(0, batchSize);
}

function compareApplyCursorCandidate(
  left: ProposedItemCandidate,
  right: ProposedItemCandidate,
): number {
  return (
    compareApplyCheckedAt(left.applyCheckedAt, right.applyCheckedAt) || left.number - right.number
  );
}

function compareCandidateToApplyCursor(
  candidate: ProposedItemCandidate,
  cursor: ApplyCursor,
): number {
  return (
    compareApplyCheckedAt(candidate.applyCheckedAt, cursor.applyCheckedAt) ||
    candidate.number - cursor.number
  );
}

function compareApplyCheckedAt(left: string, right: string): number {
  const leftMs = timestampValue(left);
  const rightMs = timestampValue(right);
  return leftMs - rightMs;
}

function timestampValue(value: string): number {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

const SELECTABLE_CLOSE_ACTIONS = new Set([
  "proposed_close",
  "retry_pr_close_coverage_proof",
  "kept_open",
  "skipped_open_closing_pr",
  "skipped_same_author_pair",
]);

const RETRYABLE_CLOSE_SKIP_ACTIONS = new Set([
  "skipped_maintainer_authored",
  "skipped_invalid_decision",
]);

function isSelectableCloseAction(action: string, reason: string): boolean {
  if (RETRYABLE_CLOSE_SKIP_ACTIONS.has(action)) return reason === "implemented_on_main";
  return SELECTABLE_CLOSE_ACTIONS.has(action);
}

function hasPullRequestClosePromotionSignal(
  markdown: string,
  targetRepo: string,
  options: { staleMinAgeMs: number },
): boolean {
  return (
    hasLinkedPullRequestSupersessionSignal(markdown, targetRepo) ||
    ((hasRecommendedPauseOrCloseOption(markdown) || hasStaleFRatedPullRequestSignal(markdown)) &&
      olderThan(frontMatterValue(markdown, "item_created_at"), options.staleMinAgeMs))
  );
}

function hasLinkedPullRequestSupersessionSignal(markdown: string, targetRepo: string): boolean {
  const pullRef = sameRepoPullRequestRefRegex(targetRepo);
  if (!pullRef) return false;
  const signal =
    /\b(supersed(?:e|ed|es|ing)|replace(?:s|d|ment)?|duplicate|duplicated|canonical|covered by|landed in)\b/i;
  return closePromotionSignalTexts(markdown).some(
    (text) =>
      pullRef.test(normalizePullRequestMarkdownLinks(text, targetRepo)) && signal.test(text),
  );
}

function normalizePullRequestMarkdownLinks(value: string, targetRepo: string): string {
  const sameRepoPullRequestUrl = sameRepoPullRequestUrlRegex(targetRepo);
  if (!sameRepoPullRequestUrl) return value;
  return value.replace(markdownLinkRegex(), (_link, target: string) =>
    sameRepoPullRequestUrl.test(target) ? target : " ",
  );
}

function markdownLinkRegex(): RegExp {
  return /\[[^\]\n]{1,200}\]\(([^\s)]{1,1000})\)/gi;
}

function sameRepoPullRequestUrlRegex(targetRepo: string): RegExp | null {
  const [owner, repo] = targetRepo.split("/");
  if (!owner || !repo) return null;
  const escapedRepo = `${escapeRegExp(owner)}\\/${escapeRegExp(repo)}`;
  return new RegExp(`^https:\\/\\/github\\.com\\/${escapedRepo}\\/pull\\/\\d+\\b`, "i");
}

function sameRepoPullRequestRefRegex(targetRepo: string): RegExp | null {
  const [owner, repo] = targetRepo.split("/");
  if (!owner || !repo) return null;
  const escapedRepo = `${escapeRegExp(owner)}\\/${escapeRegExp(repo)}`;
  return new RegExp(
    [
      `https:\\/\\/github\\.com\\/${escapedRepo}\\/pull\\/\\d+\\b`,
      `(?:^|[^\\w/.-])${escapedRepo}#\\d+\\b`,
      "(?:^|[^\\w/#-])#\\d+\\b",
    ].join("|"),
    "i",
  );
}

function hasRecommendedPauseOrCloseOption(markdown: string): boolean {
  return jsonArrayFrontMatter(markdown, "merge_risk_options").some((entry) => {
    if (!isJsonObject(entry)) return false;
    return entry.category === "pause_or_close" && entry.recommended === true;
  });
}

function hasStaleFRatedPullRequestSignal(markdown: string): boolean {
  return (
    frontMatterValue(markdown, "pr_rating_overall") === "F" ||
    frontMatterValue(markdown, "pr_rating_proof") === "F" ||
    sectionLineValue(markdown, "Overall tier") === "F" ||
    sectionLineValue(markdown, "Proof tier") === "F"
  );
}

function closePromotionSignalTexts(markdown: string): string[] {
  return [
    ...stringArrayFrontMatter(markdown, "work_cluster_refs"),
    ...jsonArrayFrontMatter(markdown, "merge_risk_options").flatMap((entry) =>
      isJsonObject(entry) ? [stringValue(entry.title), stringValue(entry.body)] : [],
    ),
    sectionValue(markdown, "Best Possible Solution"),
    sectionValue(markdown, "Evidence"),
    sectionValue(markdown, "Close Comment"),
  ].filter(Boolean);
}

export function commentSyncBatchOutput(options: CommentSyncBatchOptions): Record<string, string> {
  const candidates = commentSyncCandidates(options.targetRepo, options.applyKind);
  const cursor = readCommentSyncCursor(options.cursorPath);
  const afterCursor = candidates.filter((number) => number > cursor).slice(0, options.batchSize);
  const selected =
    afterCursor.length > 0
      ? afterCursor
      : candidates.filter((number) => number > 0).slice(0, options.batchSize);
  const nextCursor = selected.length > 0 ? selected[selected.length - 1] : cursor;
  return {
    item_numbers: selected.join(","),
    count: String(selected.length),
    cursor: String(cursor),
    next_cursor: String(nextCursor),
    wrapped: String(candidates.length > 0 && afterCursor.length === 0),
  };
}

export function writeCommentSyncCursor(
  cursorPath: string,
  nextCursor: number,
  targetRepo: string,
): void {
  if (!Number.isInteger(nextCursor) || nextCursor < 0) {
    throw new Error("--next-cursor must be a non-negative integer");
  }
  fs.mkdirSync(path.dirname(cursorPath), { recursive: true });
  fs.writeFileSync(
    cursorPath,
    `${JSON.stringify(
      {
        target_repo: targetRepo,
        next_after_number: nextCursor,
        updated_at: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
  );
}

type ApplyCursor = {
  applyCheckedAt: string;
  number: number;
  updatedAt: string | null;
};

function readApplyCursor(cursorPath: string): ApplyCursor | null {
  if (!fs.existsSync(cursorPath)) return null;
  const parsed: unknown = JSON.parse(fs.readFileSync(cursorPath, "utf8"));
  if (!isJsonObject(parsed)) return null;
  const number = Number(parsed.next_after_number);
  if (!Number.isInteger(number) || number < 0) return null;
  const applyCheckedAt =
    typeof parsed.next_after_apply_checked_at === "string"
      ? parsed.next_after_apply_checked_at
      : "";
  const updatedAt = typeof parsed.updated_at === "string" ? parsed.updated_at : null;
  return { number, applyCheckedAt, updatedAt };
}

function readApplyCursorForSummary(cursorPath: string): ApplyReportSummary["cursor"] {
  if (!cursorPath) return null;
  const cursor = readApplyCursor(cursorPath);
  if (!cursor) return null;
  return {
    path: cursorPath,
    next_after_number: cursor.number,
    next_after_apply_checked_at: cursor.applyCheckedAt || null,
    updated_at: cursor.updatedAt,
  };
}

export function writeApplyCursor(
  cursorPath: string,
  reportPath: string,
  targetRepo: string,
  itemNumbers = "",
): void {
  const actions = readApplyActions(reportPath);
  const processed = actions.flatMap((action) =>
    typeof action.number === "number" ? [action.number] : [],
  );
  const selected = csvItems(itemNumbers)
    .map((item) => Number(item))
    .filter((number) => Number.isInteger(number) && number > 0);
  const processedSet = new Set(processed);
  const number =
    selected.filter((itemNumber) => processedSet.has(itemNumber)).at(-1) ??
    selected.at(-1) ??
    processed.at(-1) ??
    0;
  const applyCheckedAt = number > 0 ? applyCheckedAtForItem(targetRepo, number) : "";
  fs.mkdirSync(path.dirname(cursorPath), { recursive: true });
  fs.writeFileSync(
    cursorPath,
    `${JSON.stringify(
      {
        target_repo: targetRepo,
        next_after_number: number,
        next_after_apply_checked_at: applyCheckedAt,
        updated_at: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
  );
}

function applyCheckedAtForItem(targetRepo: string, itemNumber: number): string {
  const baseDir = path.join("records", targetSlug(targetRepo));
  for (const stateDir of ["items", "closed"]) {
    const dir = path.join(baseDir, stateDir);
    if (!fs.existsSync(dir)) continue;
    const name = fs
      .readdirSync(dir)
      .find((entry) => /(?:^|[a-z0-9-]-)\d+\.md$/.test(entry) && numberFor(entry) === itemNumber);
    if (!name) continue;
    return frontMatterValue(fs.readFileSync(path.join(dir, name), "utf8"), "apply_checked_at");
  }
  return "";
}

function proposedItemOptions(): ProposedItemOptions {
  const batchSizeText = optionalString("batch-size");
  return {
    targetRepo: requiredString("target-repo"),
    applyKind: optionalString("apply-kind") || "all",
    applyCloseReasons: optionalString("apply-close-reasons") || "all",
    staleMinAgeDays: numberArg("stale-min-age-days", 60),
    minAgeDays: numberArg("min-age-days", 0),
    minAgeMinutes: optionalString("min-age-minutes") ? numberArg("min-age-minutes", 0) : null,
    batchSize: batchSizeText ? numberArg("batch-size", 0) : null,
    cursorPath: optionalString("cursor-path") || null,
    itemNumbers: itemNumberSet(optionalString("item-numbers")),
  };
}

function commentSyncBatchOptions(): CommentSyncBatchOptions {
  return {
    targetRepo: requiredString("target-repo"),
    applyKind: optionalString("apply-kind") || "pull_request",
    batchSize: numberArg("batch-size", 25),
    cursorPath: requiredString("cursor-path"),
  };
}

function commentSyncCandidates(targetRepo: string, applyKind: string): number[] {
  const targetSlug = targetRepo
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const itemsDir = path.join("records", targetSlug, "items");
  if (!fs.existsSync(itemsDir)) return [];

  return fs
    .readdirSync(itemsDir)
    .filter((name) => /(?:^|[a-z0-9-]-)\d+\.md$/.test(name))
    .flatMap((name) => {
      const markdown = fs.readFileSync(path.join(itemsDir, name), "utf8");
      if (repoFor(markdown, name) !== targetRepo) return [];
      const type = frontMatterValue(markdown, "type");
      if (applyKind !== "all" && type !== applyKind) return [];
      if (frontMatterValue(markdown, "review_status") !== "complete") return [];
      if (!frontMatterValue(markdown, "item_snapshot_hash")) return [];
      const actionTaken = frontMatterValue(markdown, "action_taken");
      if (
        actionTaken !== "kept_open" &&
        actionTaken !== "proposed_close" &&
        actionTaken !== "skipped_pr_close_coverage_proof"
      ) {
        return [];
      }
      return [numberFor(name)];
    })
    .sort((left, right) => left - right);
}

function readCommentSyncCursor(cursorPath: string): number {
  if (!fs.existsSync(cursorPath)) return 0;
  const parsed: unknown = JSON.parse(fs.readFileSync(cursorPath, "utf8"));
  if (!isJsonObject(parsed)) return 0;
  const cursor = Number(parsed.next_after_number);
  return Number.isInteger(cursor) && cursor >= 0 ? cursor : 0;
}

function readApplyActions(reportPath: string): ApplyAction[] {
  const parsed: unknown = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  if (!Array.isArray(parsed)) throw new Error(`${reportPath} must contain an array`);
  return parsed.map((entry) => {
    if (!isJsonObject(entry) || typeof entry.action !== "string") return { action: "" };
    const action: ApplyAction = { action: entry.action };
    if (typeof entry.reason === "string") action.reason = entry.reason;
    const number = Number(entry.number);
    if (Number.isInteger(number) && number > 0) action.number = number;
    return action;
  });
}

function isSuccessfulLabelSyncReason(reason: string | undefined): boolean {
  return /^(?:synced|dry-run: would sync) (?:advisory issue|ClawSweeper) labels$/.test(
    reason || "",
  );
}

function reportsReviewCommentSync(entry: ApplyAction): boolean {
  return (
    entry.action === "review_comment_synced" ||
    (entry.reason || "").split("; ").includes("updated durable Codex review comment")
  );
}

function resultFiles(reportDir: string): string[] {
  if (!fs.existsSync(reportDir)) return [];
  return fs
    .readdirSync(reportDir, { recursive: true })
    .map((entry) => path.join(reportDir, String(entry)))
    .filter((candidate) => ["apply-report.json", "result.json"].includes(path.basename(candidate)))
    .filter((candidate) => fs.statSync(candidate).isFile());
}

function resultActions(reportPath: string): LooseRecord[] {
  const parsed = readJsonObject(reportPath);
  const actions: JsonValue[] = Array.isArray(parsed.actions) ? parsed.actions : [];
  return actions.filter((action): action is LooseRecord => isJsonObject(action));
}

function readJsonObject(filePath: string): LooseRecord {
  const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!isJsonObject(parsed)) throw new Error(`${filePath} must contain a JSON object`);
  return parsed;
}

function printOutput(values: Record<string, string>): void {
  for (const [key, value] of Object.entries(values)) console.log(`${key}=${value}`);
}

function requiredString(name: string): string {
  const value = optionalString(name);
  if (!value) throw new Error(`--${name} is required`);
  return value;
}

function optionalString(name: string): string {
  const value = args[name];
  return typeof value === "string" ? value : "";
}

function positionalString(index: number): string {
  const value = args._[index];
  return typeof value === "string" ? value : "";
}

function numberArg(name: string, fallback: number): number {
  const value = optionalString(name);
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) throw new Error(`--${name} must be numeric`);
  return parsed;
}

function booleanArg(name: string, fallback: boolean): boolean {
  const value = optionalString(name).toLowerCase();
  if (!value) return fallback;
  if (["1", "true", "yes", "on"].includes(value)) return true;
  if (["0", "false", "no", "off"].includes(value)) return false;
  throw new Error(`--${name} must be boolean`);
}

function positiveNumber(value: string, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function stringArray(value: JsonValue): string[] {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string")
    : [];
}

function csvItems(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function itemNumberSet(value: string): ReadonlySet<number> | null {
  if (!value) return null;
  const numbers = csvItems(value).map((item) => Number(item));
  if (numbers.some((number) => !Number.isInteger(number) || number <= 0)) {
    throw new Error("--item-numbers must be comma-separated positive integers");
  }
  return new Set(numbers);
}

function checkpointNumber(name: string): number {
  return Number(name.match(/\d+/)?.[0] ?? 0);
}

function frontMatterValue(markdown: string, key: string): string {
  return (
    markdown
      .match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]
      ?.trim()
      .replace(/^"|"$/g, "") ?? ""
  );
}

function jsonArrayFrontMatter(markdown: string, key: string): JsonValue[] {
  const raw = frontMatterValue(markdown, key);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function stringArrayFrontMatter(markdown: string, key: string): string[] {
  return jsonArrayFrontMatter(markdown, key).filter(
    (entry): entry is string => typeof entry === "string",
  );
}

function sectionValue(markdown: string, heading: string): string {
  const match = markdown.match(
    new RegExp(`(?:^|\\n)## ${escapeRegExp(heading)}\\n\\n([\\s\\S]*?)(?=\\n## |\\n?$)`),
  );
  return match?.[1]?.trim() ?? "";
}

function sectionLineValue(markdown: string, key: string): string {
  const match = markdown.match(new RegExp(`^${escapeRegExp(key)}:\\s*(.+)$`, "m"));
  return match?.[1]?.trim() ?? "";
}

function stringValue(value: JsonValue): string {
  return typeof value === "string" ? value : "";
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function repoFor(markdown: string, name: string): string {
  return (
    frontMatterValue(markdown, "repository") || (/^\d+\.md$/.test(name) ? "openclaw/openclaw" : "")
  );
}

function targetSlug(targetRepo: string): string {
  return targetRepo
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function numberFor(name: string): number {
  return Number(name.match(/(\d+)\.md$/)?.[1] || 0);
}

function allowedForTarget(
  targetRepo: string,
  type: string,
  reason: string,
  allowedReasons: ReadonlySet<string>,
): boolean {
  if (targetRepo === "openclaw/clawhub")
    return (
      reason === "implemented_on_main" ||
      (type === "pull_request" && reason === "mostly_implemented_on_main")
    );
  if (type !== "pull_request" && reason === "unconfirmed_product_direction") return false;
  if (type === "pull_request" && reason === "stale_insufficient_info") return false;
  if (type !== "pull_request" && reason === "mostly_implemented_on_main") return false;
  if (type !== "pull_request" && reason === "low_signal_unmergeable_pr") return false;
  return allowedReasons.has(reason);
}

function olderThan(iso: string, milliseconds: number): boolean {
  if (milliseconds <= 0) return true;
  const parsed = Date.parse(iso);
  return Number.isFinite(parsed) && Date.now() - parsed > milliseconds;
}

function isCliEntrypoint(): boolean {
  const entrypoint = process.argv[1];
  return Boolean(entrypoint && import.meta.url === pathToFileURL(entrypoint).href);
}

if (isCliEntrypoint()) runCli();
