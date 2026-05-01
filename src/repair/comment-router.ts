#!/usr/bin/env node
import type { JsonValue, LooseRecord } from "./json-types.js";
import fs from "node:fs";
import path from "node:path";
import {
  assertLiveWorkerCapacity,
  parseArgs,
  parseJob,
  repoRoot,
  validateJob,
  waitForLiveWorkerCapacity,
} from "./lib.js";
import {
  AUTOFIX_LABEL,
  AUTOMERGE_LABEL,
  AUTOCLOSE_INTENTS,
  HUMAN_REVIEW_LABEL,
  MERGE_READY_LABEL,
  MERGE_INTENTS,
  REPAIR_INTENTS,
  autocloseReasonFromCommand,
  autoRepairBlockReason,
  autoRepairHeadKey,
  automergeChangelogBlockReason,
  automergeGateBlockReason,
  automergeClusterId,
  automergeJobPath,
  automergeMergeFailureRepairReason,
  automergeRebaseRepairReason,
  automergeTransientWaitConfig,
  buildAutomergeMergeArgs,
  commandHasAction,
  commandStatusMarker,
  commandStatusMarkerPrefix,
  existingCommandStatusBlocksReplay,
  existingModeStatusBlocksReplay,
  isMaintainerCommandAllowed,
  parseCommand,
  parseTrustedAutomation,
  repairableCheckBlockers,
  reviewedHeadShaBlockReason,
  renderAutomergeJob,
  renderResponse,
  sharedAutomergeStatusMarkerPrefix,
  staleAutomergeActivationReason,
  usesSharedAutomergeStatus,
} from "./comment-router-core.js";
import { mergeAutomergeTimelineSection } from "./automerge-status-timeline.js";
import {
  appendLedger,
  issueNumberFromUrl,
  isAllowedMutationActor,
  isGitHubAppIntegrationAuthError,
  readLedger,
  selectCommentsForRouting,
  shouldSuppressProcessedCommentVersion,
  stripAnsi,
  summarizeChecks,
  writeLedger,
  writePayload,
  writeReportFile,
} from "./comment-router-utils.js";
import { readCommentRouterConfig } from "./config.js";
import {
  ghBestEffort,
  ghErrorText,
  ghJsonWithRetry as ghJson,
  ghJsonWithRetryAsync as ghJsonAsync,
  ghPagedWithRetry as ghPaged,
  ghPagedWithRetryAsync as ghPagedAsync,
  ghSpawn,
  ghTextWithRetry as ghText,
} from "./github-cli.js";
import { compactText, escapeRegExp } from "./text-utils.js";

const args = parseArgs(process.argv.slice(2));
const config = readCommentRouterConfig(args);
const {
  targetRepo,
  repairRepo,
  workflow,
  reviewRepo,
  reviewWorkflow,
  runner,
  executionRunner,
  model,
  headPrefix,
  execute,
  forceReprocess,
  writeReport,
  waitForCapacity,
  maxLiveWorkers,
  automergeMaxLiveWorkers,
  automergeRunNamePrefix,
  maxComments,
  maxAutocloseTargets,
  maxAutoRepairsPerHead,
  maxAutoRepairsPerPr,
  lookupConcurrency,
  since,
  itemNumbers,
  commentIds,
  allowedAssociations,
  allowedRepositoryPermissions,
  trustedBots,
} = config;

const startedAtMs = Date.now();
const timings: LooseRecord[] = [];
const ledger = readLedger(ledgerPath());
const TARGET_LOOKUP_RETRY_ATTEMPTS = 3;
const processedCommentVersions = forceReprocess
  ? new Set()
  : new Set(
      (ledger.commands ?? [])
        .filter((entry: JsonValue) => shouldSuppressProcessedCommentVersion(entry))
        .map(commentVersionKey)
        .filter(Boolean),
    );
const plannedAutoRepairHeads = new Set<string>();
const collaboratorPermissionCache = new Map();
const liveTargetCache = new Map<number, LooseRecord>();
const issueCommentsCache = new Map<number, JsonValue[]>();
const comments = measure("list_candidate_comments", () => listCandidateComments());
const rawCommands: LooseRecord[] = [];

for (const comment of comments) {
  const parsed: LooseRecord =
    parseCommand(comment.body) ?? parseTrustedAutomation(comment, { trustedAuthors: trustedBots });
  if (!parsed) continue;
  const issueNumber = issueNumberFromUrl(comment.issue_url);
  const command: LooseRecord = {
    idempotency_key: idempotencyKey(parsed, issueNumber, comment.id, comment.updated_at),
    comment_id: String(comment.id),
    comment_version_key: commentVersionKey({
      comment_id: comment.id,
      comment_updated_at: comment.updated_at,
    }),
    comment_url: comment.html_url,
    repo: targetRepo,
    issue_number: issueNumber,
    author: comment.user?.login ?? null,
    author_association: String(comment.author_association ?? "").toUpperCase(),
    comment_created_at: comment.created_at,
    comment_updated_at: comment.updated_at,
    trigger: parsed.trigger,
    command: parsed.command,
    intent: parsed.intent,
    autoclose_message: parsed.autoclose_message ?? null,
    trusted_bot: Boolean(parsed.trusted_bot),
    trusted_bot_author: parsed.trusted_bot_author ?? null,
    automation_source: parsed.automation_source ?? null,
    repair_reason: parsed.repair_reason ?? null,
    review_summary: extractMarkdownSection(comment.body, "What this changes"),
    review_followup: extractMarkdownSection(comment.body, "Automerge follow-up"),
    freeform_prompt: parsed.freeform_prompt ?? null,
    expected_head_sha: parsed.expected_head_sha ?? null,
    finding_id: parsed.finding_id ?? null,
    status: "pending",
    actions: [],
  };
  rawCommands.push(command);
}

await measureAsync("prehydrate_command_lookups", () => prehydrateCommandLookups(rawCommands));
const commands = measure("classify_commands", () =>
  rawCommands.map((command) => classifyCommand(command)),
);

const actionable = commands.filter((command: JsonValue) => command.status === "ready");
const report: LooseRecord = {
  status: execute ? "executed" : "dry_run",
  generated_at: new Date().toISOString(),
  repo: targetRepo,
  repair_repo: repairRepo,
  review_repo: reviewRepo,
  since,
  execute,
  force_reprocess: forceReprocess,
  max_comments: maxComments,
  item_numbers: [...itemNumbers],
  comment_ids: [...commentIds],
  max_autoclose_targets: maxAutocloseTargets,
  scanned_comments: comments.length,
  commands_seen: commands.length,
  actionable: actionable.length,
  trusted_bots: [...trustedBots],
  allowed_repository_permissions: [...allowedRepositoryPermissions],
  max_auto_repairs_per_head: maxAutoRepairsPerHead,
  max_auto_repairs_per_pr: maxAutoRepairsPerPr,
  lookup_concurrency: lookupConcurrency,
  commands,
};

if (execute) {
  await measureAsync("execute_commands", async () => {
    assertMutationActorIsClawsweeperBot();
    for (const command of commands) acknowledgeSkippedMaintainerCommand(command);
    const capacityRequests = workerCapacityRequests(actionable);
    if (capacityRequests.length > 0) {
      const capacities = capacityRequests.map((request) =>
        waitForCapacity ? waitForLiveWorkerCapacity(request) : assertLiveWorkerCapacity(request),
      );
      report.live_worker_capacity_before_dispatch =
        capacities.length === 1 ? capacities[0] : capacities;
    }
    for (const command of actionable) executeCommand(command);
  });
  report.ledger_changed = measure("append_ledger", () => appendLedger(ledger, commands));
  if (report.ledger_changed) writeLedger(ledgerPath(), ledger);
}

report.timings = {
  total_ms: Date.now() - startedAtMs,
  phases: timings,
};
if (writeReport) writeReportFile(repoRoot(), report);
console.log(JSON.stringify(report, null, 2));

function measure<T>(name: string, fn: () => T): T {
  const start = Date.now();
  try {
    return fn();
  } finally {
    timings.push({ name, ms: Date.now() - start });
  }
}

async function measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = Date.now();
  try {
    return await fn();
  } finally {
    timings.push({ name, ms: Date.now() - start });
  }
}

function assertMutationActorIsClawsweeperBot() {
  try {
    const viewer = ghJson<LooseRecord>(["api", "user"]);
    const login = String(viewer.login ?? "");
    if (isAllowedMutationActor(login, trustedBots)) return;
    throw new Error(
      `refusing to execute ClawSweeper comment-router mutations as ${login || "unknown actor"}; set GH_TOKEN to the Clawsweeper GitHub App installation token`,
    );
  } catch (error) {
    if (isExpectedGitHubAppIntegrationToken(error)) return;
    throw error;
  }
}

function isExpectedGitHubAppIntegrationToken(error: unknown) {
  return (
    process.env.CLAWSWEEPER_MUTATION_TOKEN_SOURCE === "clawsweeper-app" &&
    isGitHubAppIntegrationAuthError(ghErrorText(error))
  );
}

async function prehydrateCommandLookups(commands: LooseRecord[]) {
  const pending = commands.filter(
    (command) =>
      command.issue_number &&
      !(command.comment_version_key && processedCommentVersions.has(command.comment_version_key)),
  );
  const logins = unique(
    pending
      .filter((command) => !command.trusted_bot)
      .map((command) => String(command.author ?? "").trim())
      .filter(Boolean),
  );
  const issueNumbers = unique(
    pending
      .map((command) => Number(command.issue_number))
      .filter((number) => Number.isInteger(number) && number > 0),
  );

  await Promise.all([
    mapLimit(logins, lookupConcurrency, (login) => fetchCollaboratorPermissionAsync(login)),
    mapLimit(issueNumbers, lookupConcurrency, async (number) => {
      liveTargetCache.set(number, await fetchLiveTargetAsync(number));
    }),
    mapLimit(issueNumbers, lookupConcurrency, async (number) => {
      issueCommentsCache.set(number, await fetchIssueCommentsAsync(number));
    }),
  ]);
}

function classifyCommand(command: LooseRecord): JsonValue {
  if (command.comment_version_key && processedCommentVersions.has(command.comment_version_key)) {
    return { ...command, status: "skipped", reason: "comment version already processed in ledger" };
  }
  if (command.trusted_bot) {
    if (!trustedBots.has(String(command.author ?? "").toLowerCase())) {
      return { ...command, status: "ignored", reason: "trusted automation author is not allowed" };
    }
  } else {
    const authorization = resolveMaintainerCommandAuthorization(command);
    command.author_repository_permission = authorization.repositoryPermission;
    if (!authorization.allowed) {
      return {
        ...command,
        status: "ignored",
        reason: authorization.reason,
      };
    }
  }
  if (!command.issue_number) {
    return { ...command, status: "ignored", reason: "could not resolve issue or PR number" };
  }

  const liveTarget = fetchLiveTarget(command);
  if (liveTarget.status === "waiting") return liveTarget;
  const { issue, pull } = liveTarget;
  const target = pull ? classifyPullTarget(pull, command.issue_number) : classifyIssueTarget(issue);
  const next = { ...command, target };

  if (
    existingCommandStatusBlocksReplay({
      hasExistingResponse: hasExistingResponse(
        command.issue_number,
        command.comment_version_key ?? command.comment_id,
        command.intent,
        target.head_sha,
      ),
      forceReprocess,
    })
  ) {
    return {
      ...next,
      status: "skipped",
      reason: "matching ClawSweeper response comment already exists",
    };
  }

  if (["status", "explain", "help"].includes(command.intent)) {
    return {
      ...next,
      status: "ready",
      actions: [{ action: "comment", status: execute ? "pending" : "planned" }],
    };
  }
  if (command.intent === "freeform_assist") {
    if (String(issue.state ?? "").toLowerCase() !== "open") {
      return {
        ...next,
        status: "ready",
        reason: "freeform assist requires an open issue or PR",
        actions: [{ action: "comment", status: execute ? "pending" : "planned" }],
      };
    }
    return {
      ...next,
      status: "ready",
      actions: [
        {
          action: "dispatch_clawsweeper",
          workflow: reviewWorkflow,
          status: execute ? "pending" : "planned",
        },
        { action: "comment", status: execute ? "pending" : "planned" },
      ],
    };
  }
  if (command.intent === "re_review") {
    if (String(issue.state ?? "").toLowerCase() !== "open") {
      return {
        ...next,
        status: "ready",
        reason: "re-review requires an open issue or PR",
        actions: [{ action: "comment", status: execute ? "pending" : "planned" }],
      };
    }
    return {
      ...next,
      status: "ready",
      actions: [
        {
          action: "dispatch_clawsweeper",
          workflow: reviewWorkflow,
          status: execute ? "pending" : "planned",
        },
        { action: "comment", status: execute ? "pending" : "planned" },
      ],
    };
  }
  if (["autofix", "automerge"].includes(command.intent)) {
    const mode = command.intent === "autofix" ? "autofix" : "automerge";
    const modeLabel = command.intent === "autofix" ? AUTOFIX_LABEL : AUTOMERGE_LABEL;
    const oppositeModeLabel = command.intent === "autofix" ? AUTOMERGE_LABEL : AUTOFIX_LABEL;
    if (String(issue.state ?? "").toLowerCase() !== "open") {
      const staleReason = staleAutomergeActivationReason({ command: next, issue, pull });
      if (staleReason) return { ...next, status: "skipped", reason: staleReason };
      return automergeBlocked(next, `${mode} requires an open PR`);
    }
    if (!pull) {
      return automergeBlocked(next, `${mode} requires a pull request`);
    }
    const pauseLabels = pauseLabelsOn(target);
    if (
      existingModeStatusBlocksReplay({
        hasModeLabel: hasLabel(target, modeLabel),
        hasJobPath: Boolean(target.job_path),
        hasPauseLabels: pauseLabels.length > 0,
        hasOppositeModeLabel: hasLabel(target, oppositeModeLabel),
        hasExistingModeStatusResponse: hasExistingModeStatusResponse(
          command.issue_number,
          command.intent,
        ),
        forceReprocess,
      })
    ) {
      return { ...next, status: "skipped", reason: `${mode} already enabled for this PR` };
    }
    const actions: LooseRecord[] = [];
    if (!target.job_path) {
      actions.push({
        action: "ensure_automerge_job",
        job_path: target.automerge_job_path,
        status: execute ? "pending" : "planned",
      });
    }
    if (hasLabel(target, oppositeModeLabel)) {
      actions.push({
        action: "remove_label",
        label: oppositeModeLabel,
        status: execute ? "pending" : "planned",
      });
    }
    for (const pausedLabel of pauseLabels) {
      actions.push({
        action: "remove_label",
        label: pausedLabel,
        status: execute ? "pending" : "planned",
      });
    }
    return {
      ...next,
      status: "ready",
      actions: [
        ...actions,
        { action: "label", label: modeLabel, status: execute ? "pending" : "planned" },
        {
          action: "dispatch_clawsweeper",
          workflow: reviewWorkflow,
          status: execute ? "pending" : "planned",
        },
        { action: "comment", status: execute ? "pending" : "planned" },
      ],
    };
  }
  if (AUTOCLOSE_INTENTS.has(command.intent)) {
    return classifyAutoclose(next, issue, pull);
  }

  if (command.intent === "stop") {
    return {
      ...next,
      status: "ready",
      actions: [
        { action: "label", label: HUMAN_REVIEW_LABEL, status: execute ? "pending" : "planned" },
        { action: "comment", status: execute ? "pending" : "planned" },
      ],
    };
  }
  if (!REPAIR_INTENTS.has(command.intent)) {
    if (command.intent === "maintainer_approve_automerge")
      return classifyMaintainerApprovedAutomerge(next, issue, pull);
    if (MERGE_INTENTS.has(command.intent)) return classifyAutomergePass(next, issue, pull);
    if (command.intent === "clawsweeper_needs_human") return classifyNeedsHuman(next, issue, pull);
    return {
      ...next,
      status: "ready",
      actions: [{ action: "comment", status: execute ? "pending" : "planned" }],
    };
  }
  if (String(issue.state ?? "").toLowerCase() !== "open") {
    return repairBlocked(next, "repair commands require an open issue or PR");
  }
  if (!pull) {
    return repairBlocked(next, "repair commands require a pull request");
  }
  if (!canRepairPullTarget(target)) {
    return repairBlocked(
      next,
      "repair commands require a ClawSweeper PR or a PR opted into ClawSweeper autofix or automerge",
    );
  }
  if (command.trusted_bot && hasLabel(target, HUMAN_REVIEW_LABEL)) {
    return { ...next, status: "skipped", reason: "PR is paused for human review" };
  }
  if (command.intent === "clawsweeper_auto_repair") {
    if (
      command.expected_head_sha &&
      command.expected_head_sha !== "unknown" &&
      target.head_sha &&
      command.expected_head_sha !== target.head_sha
    ) {
      return {
        ...next,
        status: "skipped",
        reason: "ClawSweeper repair marker targets a stale PR head SHA",
      };
    }
    const alreadyPlanned = autoRepairAlreadyPlanned(next);
    if (alreadyPlanned) return { ...next, status: "skipped", reason: alreadyPlanned };
  }
  const actions: LooseRecord[] = [];
  const repairJobPath = target.job_path ?? target.automerge_job_path;
  if (!target.job_path) {
    actions.push({
      action: "ensure_automerge_job",
      job_path: repairJobPath,
      status: execute ? "pending" : "planned",
    });
  }
  if (!command.trusted_bot) {
    for (const pausedLabel of pauseLabelsOn(target)) {
      actions.push({
        action: "remove_label",
        label: pausedLabel,
        status: execute ? "pending" : "planned",
      });
    }
  }

  return {
    ...next,
    status: "ready",
    actions: [
      ...actions,
      {
        action: "dispatch_repair",
        workflow,
        job_path: repairJobPath,
        mode: target.mode,
        status: execute ? "pending" : "planned",
      },
      { action: "comment", status: execute ? "pending" : "planned" },
    ],
  };
}

function classifyAutoclose(command: LooseRecord, issue: LooseRecord, pull: LooseRecord): JsonValue {
  const reason = autocloseReason(command);
  if (!reason) {
    return {
      ...command,
      status: "ready",
      reason: "autoclose requires a maintainer close reason",
      actions: [{ action: "comment", status: execute ? "pending" : "planned" }],
    };
  }
  if (String(issue.state ?? "").toLowerCase() !== "open") {
    return {
      ...command,
      autoclose_reason: reason,
      status: "ready",
      reason: "autoclose requires an open issue or PR",
      actions: [{ action: "comment", status: execute ? "pending" : "planned" }],
    };
  }
  const targets = discoverAutocloseTargets({ command, issue, pull });
  if (targets.length === 0) {
    return {
      ...command,
      autoclose_reason: reason,
      status: "ready",
      reason: "autoclose found no open same-repo targets",
      actions: [{ action: "comment", status: execute ? "pending" : "planned" }],
    };
  }
  return {
    ...command,
    autoclose_reason: reason,
    autoclose_targets: targets,
    status: "ready",
    actions: [
      {
        action: "autoclose",
        reason,
        targets: targets.map((target: JsonValue) => ({
          ref: target.ref,
          kind: target.kind,
          title: target.title,
        })),
        status: execute ? "pending" : "planned",
      },
      { action: "comment", status: execute ? "pending" : "planned" },
    ],
  };
}

function classifyAutomergePass(
  command: LooseRecord,
  issue: LooseRecord,
  pull: LooseRecord,
): JsonValue {
  if (String(issue.state ?? "").toLowerCase() !== "open")
    return { ...command, status: "skipped", reason: "PR is not open" };
  if (!pull)
    return { ...command, status: "skipped", reason: "ClawSweeper pass marker is not on a PR" };
  if (!hasRepairLoopLabel(command.target))
    return {
      ...command,
      status: "skipped",
      reason: "PR is not opted into ClawSweeper autofix or automerge",
    };
  const headBlock = reviewedHeadShaBlockReason({
    expectedHeadSha: command.expected_head_sha,
    currentHeadSha: command.target?.head_sha,
    markerName: "pass",
  });
  if (headBlock) return { ...command, status: "skipped", reason: headBlock };
  const pauseLabelActions = pauseLabelsOn(command.target).map((label) => ({
    action: "remove_label",
    label,
    status: execute ? "pending" : "planned",
  }));
  const failedCheckBlockers = repairableCheckBlockers(command.target?.checks);
  if (failedCheckBlockers.length > 0) {
    return classifyPassedAutomergeRepair(
      command,
      pauseLabelActions,
      `${command.repair_reason ?? "structured ClawSweeper verdict: pass"}; current checks are failing: ${failedCheckBlockers.slice(0, 5).join(", ")}`,
    );
  }
  const rebaseRepairReason = automergeRebaseRepairReason(command.target);
  if (rebaseRepairReason) {
    return classifyPassedAutomergeRepair(
      command,
      pauseLabelActions,
      `${command.repair_reason ?? "structured ClawSweeper verdict: pass"}; ${rebaseRepairReason}`,
    );
  }
  return {
    ...command,
    status: "ready",
    actions: [
      ...pauseLabelActions,
      { action: "merge", status: execute ? "pending" : "planned" },
      { action: "comment", status: execute ? "pending" : "planned" },
    ],
  };
}

function classifyPassedAutomergeRepair(
  command: LooseRecord,
  pauseLabelActions: LooseRecord[],
  repairReason: string,
): JsonValue {
  const alreadyPlanned = autoRepairAlreadyPlanned(command);
  if (alreadyPlanned) return { ...command, status: "skipped", reason: alreadyPlanned };
  const repairJobPath = command.target?.job_path ?? command.target?.automerge_job_path;
  return {
    ...command,
    repair_reason: repairReason,
    status: "ready",
    actions: [
      ...pauseLabelActions,
      ...(command.target?.job_path
        ? []
        : [
            {
              action: "ensure_automerge_job",
              job_path: repairJobPath,
              status: execute ? "pending" : "planned",
            },
          ]),
      {
        action: "dispatch_repair",
        workflow,
        job_path: repairJobPath,
        mode: command.target?.mode,
        status: execute ? "pending" : "planned",
      },
      { action: "comment", status: execute ? "pending" : "planned" },
    ],
  };
}

function classifyMaintainerApprovedAutomerge(
  command: LooseRecord,
  issue: LooseRecord,
  pull: LooseRecord,
): JsonValue {
  if (String(issue.state ?? "").toLowerCase() !== "open")
    return { ...command, status: "skipped", reason: "PR is not open" };
  if (!pull) return { ...command, status: "skipped", reason: "maintainer approval is not on a PR" };
  if (!hasLabel(command.target, AUTOMERGE_LABEL))
    return { ...command, status: "skipped", reason: "PR is not opted into ClawSweeper automerge" };
  const pauseLabels = pauseLabelsOn(command.target);
  if (pauseLabels.length === 0) {
    return {
      ...command,
      status: "skipped",
      reason: "maintainer approval requires an active ClawSweeper pause label",
    };
  }
  const expectedHeadSha = command.target?.head_sha ?? null;
  if (!expectedHeadSha) {
    return {
      ...command,
      status: "skipped",
      reason: "maintainer approval could not resolve the current PR head SHA",
    };
  }
  const removePauseLabelActions = pauseLabels.map((label) => ({
    action: "remove_label",
    label,
    status: execute ? "pending" : "planned",
  }));
  return {
    ...command,
    expected_head_sha: expectedHeadSha,
    status: "ready",
    actions: [
      ...removePauseLabelActions,
      { action: "merge", status: execute ? "pending" : "planned" },
      { action: "comment", status: execute ? "pending" : "planned" },
    ],
  };
}

function classifyNeedsHuman(
  command: LooseRecord,
  issue: LooseRecord,
  pull: LooseRecord,
): JsonValue {
  if (String(issue.state ?? "").toLowerCase() !== "open")
    return { ...command, status: "skipped", reason: "target is not open" };
  if (!pull) return { ...command, status: "skipped", reason: "human-review marker is not on a PR" };
  if (!hasRepairLoopLabel(command.target))
    return {
      ...command,
      status: "skipped",
      reason: "PR is not opted into ClawSweeper autofix or automerge",
    };
  const headBlock = reviewedHeadShaBlockReason({
    expectedHeadSha: command.expected_head_sha,
    currentHeadSha: command.target?.head_sha,
    markerName: "human-review",
  });
  if (headBlock) return { ...command, status: "skipped", reason: headBlock };
  return {
    ...command,
    status: "ready",
    actions: [
      { action: "label", label: HUMAN_REVIEW_LABEL, status: execute ? "pending" : "planned" },
      { action: "comment", status: execute ? "pending" : "planned" },
    ],
  };
}

function automergeBlocked(command: LooseRecord, reason: string) {
  return {
    ...command,
    status: "ready",
    actions: [{ action: "comment", status: execute ? "pending" : "planned" }],
    reason,
  };
}

function repairBlocked(command: LooseRecord, reason: string) {
  if (command.trusted_bot) return { ...command, status: "skipped", reason };
  return {
    ...command,
    status: "ready",
    actions: [{ action: "comment", status: execute ? "pending" : "planned" }],
    reason,
  };
}

function canRepairPullTarget(target: LooseRecord) {
  if (target?.kind !== "pull_request") return false;
  return Boolean(target.job_path || target.is_clawsweeper_pr || hasRepairLoopLabel(target));
}

function hasRepairLoopLabel(target: LooseRecord) {
  return hasLabel(target, AUTOFIX_LABEL) || hasLabel(target, AUTOMERGE_LABEL);
}

function autoRepairAlreadyPlanned(command: LooseRecord) {
  const resumeBoundary = latestAutomergeResumeAt(command);
  const block = autoRepairBlockReason({
    entries: ledger.commands ?? [],
    plannedHeads: plannedAutoRepairHeads,
    repo: command.repo,
    issueNumber: command.issue_number,
    headSha: command.target?.head_sha,
    maxRepairsPerPr: maxAutoRepairsPerPr,
    maxRepairsPerHead: maxAutoRepairsPerHead,
    resumeBoundary,
  });
  if (block) return block;

  const headKey = autoRepairHeadKey({
    repo: command.repo,
    issueNumber: command.issue_number,
    headSha: command.target?.head_sha,
  });
  if (headKey) plannedAutoRepairHeads.add(headKey);
  return null;
}

function latestAutomergeResumeAt(command: LooseRecord) {
  let latest = 0;
  for (const entry of ledger.commands ?? []) {
    if (
      entry.repo === command.repo &&
      Number(entry.issue_number) === Number(command.issue_number) &&
      ["autofix", "automerge"].includes(entry.intent) &&
      entry.status === "executed"
    ) {
      latest = Math.max(latest, Date.parse(entry.comment_updated_at ?? "") || 0);
    }
  }
  return latest;
}

function executeCommand(command: LooseRecord) {
  let dispatched = null;
  const shouldDispatchRepair = command.actions?.some(
    (action: JsonValue) => action.action === "dispatch_repair",
  );
  const shouldDispatchClawSweeper = commandHasAction(command, "dispatch_clawsweeper");
  const shouldMerge = commandHasAction(command, "merge");
  const shouldApplyHumanReviewLabel = commandHasAction(command, "label");
  if (!command.trusted_bot) reactToComment(command, "eyes");
  if (shouldDispatchRepair && canRepairPullTarget(command.target)) {
    const job = ensureAutomergeJob(command);
    if (job.status_detail === "written") {
      command.actions = command.actions.map((action: JsonValue) => {
        if (action.action === "ensure_automerge_job")
          return { ...action, status: "executed", ...job };
        if (action.action === "dispatch_repair") {
          return {
            ...action,
            job_path: command.target.job_path,
            mode: command.target.mode,
            status: "waiting",
            reason: "adopted job must be committed before worker dispatch",
          };
        }
        return action;
      });
      command.status = "waiting";
      return;
    }
    const repair = dispatchRepair(command);
    dispatched = REPAIR_INTENTS.has(command.intent) ? repair : { repair };
    const labelsToRemove = command.actions
      .filter((action: JsonValue) => action.action === "remove_label")
      .map((action: JsonValue) => String(action.label ?? ""))
      .filter(Boolean);
    for (const pausedLabel of labelsToRemove) {
      ghBestEffort([
        "issue",
        "edit",
        String(command.issue_number),
        "--repo",
        command.repo,
        "--remove-label",
        pausedLabel,
      ]);
    }
    command.actions = command.actions.map((action: JsonValue) => {
      if (action.action === "ensure_automerge_job")
        return { ...action, status: "executed", ...job };
      if (action.action === "remove_label")
        return { ...action, status: "executed", label: action.label };
      if (action.action === "dispatch_repair") {
        return {
          ...action,
          job_path: command.target.job_path,
          mode: command.target.mode,
          status: "executed",
          dispatched_at: new Date().toISOString(),
          ...(repair.run_url ? { run_url: repair.run_url } : {}),
        };
      }
      return action;
    });
  }
  if (
    ["autofix", "automerge"].includes(command.intent) &&
    command.issue_number &&
    shouldDispatchClawSweeper
  ) {
    const modeLabel = command.intent === "autofix" ? AUTOFIX_LABEL : AUTOMERGE_LABEL;
    const oppositeModeLabel = command.intent === "autofix" ? AUTOMERGE_LABEL : AUTOFIX_LABEL;
    const job = ensureAutomergeJob(command);
    ensureRepairLoopLabel(command.repo, modeLabel);
    for (const pausedLabel of pauseLabelsOn(command.target)) {
      ghBestEffort([
        "issue",
        "edit",
        String(command.issue_number),
        "--repo",
        command.repo,
        "--remove-label",
        pausedLabel,
      ]);
    }
    if (hasLabel(command.target, oppositeModeLabel)) {
      ghBestEffort([
        "issue",
        "edit",
        String(command.issue_number),
        "--repo",
        command.repo,
        "--remove-label",
        oppositeModeLabel,
      ]);
    }
    ghBestEffort([
      "issue",
      "edit",
      String(command.issue_number),
      "--repo",
      command.repo,
      "--add-label",
      modeLabel,
    ]);
    const clawsweeper = dispatchClawSweeperReview(command);
    dispatched = { ...dispatched, clawsweeper };
    command.actions = command.actions.map((action: JsonValue) => {
      if (action.action === "label")
        return { ...action, status: "executed", label: action.label ?? modeLabel };
      if (action.action === "remove_label")
        return { ...action, status: "executed", label: action.label };
      if (action.action === "ensure_automerge_job")
        return { ...action, status: "executed", ...job };
      if (action.action === "dispatch_clawsweeper") {
        return {
          ...action,
          status: "executed",
          dispatched_at: new Date().toISOString(),
          ...clawsweeper,
        };
      }
      return action;
    });
  }
  if (
    ["freeform_assist", "re_review"].includes(command.intent) &&
    command.issue_number &&
    shouldDispatchClawSweeper
  ) {
    const clawsweeper = dispatchClawSweeperReview(command);
    dispatched = { ...dispatched, clawsweeper };
    command.actions = command.actions.map((action: JsonValue) => {
      if (action.action === "dispatch_clawsweeper") {
        return {
          ...action,
          status: "executed",
          dispatched_at: new Date().toISOString(),
          ...clawsweeper,
        };
      }
      return action;
    });
  }
  if (
    AUTOCLOSE_INTENTS.has(command.intent) &&
    command.issue_number &&
    command.autoclose_targets?.length > 0
  ) {
    const autoclose = executeAutoclose(command);
    dispatched = { ...dispatched, autoclose };
    command.actions = command.actions.map((action: JsonValue) =>
      action.action === "autoclose"
        ? { ...action, ...autoclose, completed_at: new Date().toISOString() }
        : action,
    );
  }
  if (
    MERGE_INTENTS.has(command.intent) &&
    !shouldDispatchRepair &&
    command.issue_number &&
    shouldMerge
  ) {
    const pauseLabels = command.actions
      .filter((action: JsonValue) => action.action === "remove_label")
      .map((action: JsonValue) => String(action.label ?? ""))
      .filter(Boolean);
    if (pauseLabels.length > 0) {
      for (const pausedLabel of pauseLabels) {
        ghBestEffort([
          "issue",
          "edit",
          String(command.issue_number),
          "--repo",
          command.repo,
          "--remove-label",
          pausedLabel,
        ]);
      }
      command.target = {
        ...command.target,
        labels: (command.target?.labels ?? []).filter(
          (label: JsonValue) => !pauseLabels.includes(String(label)),
        ),
      };
    }
    const merge = executeAutomerge(command);
    dispatched = { ...dispatched, merge };
    command.actions = command.actions.map((action: JsonValue) =>
      action.action === "remove_label"
        ? { ...action, status: "executed", label: action.label }
        : action.action === "merge"
          ? { ...action, ...merge, completed_at: new Date().toISOString() }
          : action,
    );
    if (merge.status === "waiting") {
      command.status = "waiting";
      return;
    }
    if (merge.status === "repair_needed" && canRepairPullTarget(command.target)) {
      const alreadyPlanned = autoRepairAlreadyPlanned(command);
      if (alreadyPlanned) {
        command.actions = command.actions.map((action: JsonValue) =>
          action.action === "merge"
            ? { ...action, status: "blocked", reason: alreadyPlanned }
            : action,
        );
      } else {
        command.repair_reason = `${command.repair_reason ?? "structured ClawSweeper verdict: pass"}; ${merge.repair_reason ?? merge.reason}`;
        const job = ensureAutomergeJob(command);
        if (job.status_detail === "written") {
          command.actions.push({
            action: "dispatch_repair",
            workflow,
            job_path: command.target.job_path,
            mode: command.target.mode,
            status: "waiting",
            reason: "adopted job must be committed before worker dispatch",
          });
          command.status = "waiting";
          return;
        }
        const repair = dispatchRepair(command);
        dispatched = { ...dispatched, repair };
        command.actions.push({
          action: "dispatch_repair",
          workflow,
          job_path: command.target.job_path,
          mode: command.target.mode,
          status: "executed",
          dispatched_at: new Date().toISOString(),
          ...(repair.run_url ? { run_url: repair.run_url } : {}),
        });
      }
    }
  }
  if (
    command.intent === "clawsweeper_needs_human" &&
    command.issue_number &&
    shouldApplyHumanReviewLabel
  ) {
    ensureHumanReviewLabel(command.repo);
    ghBestEffort([
      "issue",
      "edit",
      String(command.issue_number),
      "--repo",
      command.repo,
      "--add-label",
      HUMAN_REVIEW_LABEL,
    ]);
    command.actions = command.actions.map((action: JsonValue) =>
      action.action === "label"
        ? { ...action, status: "executed", label: HUMAN_REVIEW_LABEL }
        : action,
    );
  }
  if (command.intent === "stop" && command.issue_number && shouldApplyHumanReviewLabel) {
    ensureHumanReviewLabel(command.repo);
    ghBestEffort([
      "issue",
      "edit",
      String(command.issue_number),
      "--repo",
      command.repo,
      "--add-label",
      HUMAN_REVIEW_LABEL,
    ]);
    command.actions = command.actions.map((action: JsonValue) =>
      action.action === "label"
        ? { ...action, status: "executed", label: HUMAN_REVIEW_LABEL }
        : action,
    );
  }

  const commentResult = postComment(command, renderResponse(command, dispatched));
  command.actions = command.actions.map((action: JsonValue) =>
    action.action === "comment"
      ? {
          ...action,
          status: "executed",
          commented_at: new Date().toISOString(),
          response_comment_id: commentResult.comment_id,
          response_comment_mode: commentResult.mode,
        }
      : action,
  );
  command.status = "executed";
}

function workerCapacityRequests(commands: LooseRecord[]) {
  const counts = new Map<string, { count: number; automergeLane: boolean }>();
  for (const command of commands) {
    if (!REPAIR_INTENTS.has(command.intent) && !MERGE_INTENTS.has(command.intent)) continue;
    const automergeLane = usesAutomergeRepairLane(command);
    const key = automergeLane ? "automerge" : "default";
    const entry = counts.get(key) ?? { count: 0, automergeLane };
    entry.count += 1;
    counts.set(key, entry);
  }
  return [...counts.values()].map(({ count, automergeLane }) => ({
    repo: repairRepo,
    workflow,
    requested: count,
    maxLiveWorkers: automergeLane ? automergeMaxLiveWorkers : maxLiveWorkers,
    ...(automergeLane
      ? { runNamePrefix: automergeRunNamePrefix }
      : { excludeRunNamePrefix: automergeRunNamePrefix }),
  }));
}

function usesAutomergeRepairLane(command: LooseRecord) {
  return (
    command.intent === "automerge" ||
    command.intent === "clawsweeper_auto_merge" ||
    hasLabel(command.target, AUTOMERGE_LABEL)
  );
}

function acknowledgeSkippedMaintainerCommand(command: LooseRecord) {
  if (command.trusted_bot || command.status !== "skipped") return;
  const reason = String(command.reason ?? "");
  const targetedProcessedComment =
    itemNumbers.size > 0 && reason === "comment version already processed in ledger";
  if (!targetedProcessedComment && !/already enabled for this PR/i.test(reason)) return;
  reactToComment(command, "eyes");
}

function ensureAutomergeJob(command: LooseRecord) {
  if (command.target?.job_path) {
    return {
      job_path: command.target.job_path,
      mode: command.target.mode ?? dispatchMode(command.target.job_path),
      status_detail: "existing",
    };
  }
  if (command.target?.kind !== "pull_request" || !command.issue_number) {
    throw new Error("automerge repair job requires a pull request target");
  }

  const relative =
    command.target.automerge_job_path ?? automergeJobPath(command.repo, command.issue_number);
  const absolute = path.join(repoRoot(), relative);
  let statusDetail = "existing";
  if (!fs.existsSync(absolute)) {
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(
      absolute,
      renderAutomergeJob({
        repo: command.repo,
        issueNumber: command.issue_number,
        title: command.target.title,
        repairMode: repairJobModeForCommand(command),
      }),
    );
    statusDetail = "written";
  }

  const job = parseJob(relative);
  const errors = validateJob(job);
  if (errors.length > 0) throw new Error(`invalid automerge job ${relative}: ${errors.join("; ")}`);
  command.target = {
    ...command.target,
    cluster_id: job.frontmatter.cluster_id,
    job_path: job.relativePath,
    mode: dispatchMode(job.relativePath),
  };
  return {
    job_path: command.target.job_path,
    mode: command.target.mode,
    cluster_id: command.target.cluster_id,
    status_detail: statusDetail,
  };
}

function repairJobModeForCommand(command: LooseRecord) {
  if (command.intent === "autofix" || hasLabel(command.target, AUTOFIX_LABEL)) return "autofix";
  return "automerge";
}

function dispatchClawSweeperReview(command: LooseRecord) {
  const payload = JSON.stringify({
    event_type: "clawsweeper_item",
    client_payload: {
      target_repo: command.repo,
      item_number: String(command.issue_number),
      item_kind: command.target?.kind ?? "",
      additional_prompt: freeformReviewPrompt(command),
    },
  });
  const result = ghSpawn(
    ["api", `repos/${reviewRepo}/dispatches`, "--method", "POST", "--input", "-"],
    {
      env: dispatchTokenEnv(),
      input: payload,
    },
  );
  if (result.status !== 0) {
    const fallback = ghSpawn(
      [
        "workflow",
        "run",
        reviewWorkflow,
        "--repo",
        reviewRepo,
        "-f",
        `target_repo=${command.repo}`,
        "-f",
        `item_number=${command.issue_number}`,
        "-f",
        `item_numbers=${command.issue_number}`,
        "-f",
        `additional_prompt=${freeformReviewPrompt(command)}`,
        "-f",
        "batch_size=1",
        "-f",
        "shard_count=1",
      ],
      { env: dispatchTokenEnv() },
    );
    if (fallback.status !== 0) {
      throw new Error(
        `failed to dispatch ClawSweeper review for #${command.issue_number}: repository_dispatch=${
          result.stderr || result.stdout
        }; workflow_dispatch=${fallback.stderr || fallback.stdout}`,
      );
    }
    return {
      workflow: reviewWorkflow,
      event: "workflow_dispatch",
      repo: reviewRepo,
      item_number: command.issue_number,
      fallback_reason: stripAnsi(result.stderr || result.stdout).trim(),
    };
  }
  return {
    workflow: reviewWorkflow,
    event: "repository_dispatch",
    repo: reviewRepo,
    item_number: command.issue_number,
  };
}

function freeformReviewPrompt(command: LooseRecord): string {
  const prompt = String(command.freeform_prompt ?? "").trim();
  if (!prompt) return "";
  return [
    "Maintainer freeform @clawsweeper request.",
    "",
    `Author: ${command.author ?? "unknown"}`,
    `Comment: ${command.comment_url ?? "unknown"}`,
    "",
    "Request:",
    prompt.slice(0, 3000),
    "",
    "Answer this request in the public ClawSweeper review comment. Keep the answer concise and evidence-based.",
    "This is a read-only assist pass: do not merge, close, label, or push code from the model. If the request asks for an action, map it to existing ClawSweeper structured recommendations only when the normal evidence, security, review, and repair gates support it.",
  ].join("\n");
}

function dispatchRepair(command: LooseRecord) {
  const result = ghSpawn(
    [
      "workflow",
      "run",
      workflow,
      "--repo",
      repairRepo,
      "-f",
      `job=${command.target.job_path}`,
      "-f",
      `mode=${command.target.mode}`,
      "-f",
      `runner=${runner}`,
      "-f",
      `execution_runner=${executionRunner}`,
      "-f",
      `model=${model}`,
    ],
    { env: dispatchTokenEnv() },
  );
  if (result.status !== 0) {
    throw new Error(
      `failed to dispatch ${command.target.job_path}: ${result.stderr || result.stdout}`,
    );
  }
  const runUrl = githubActionsRunUrlFromDispatchOutput(result.stdout);
  return {
    workflow,
    repair_repo: repairRepo,
    job_path: command.target.job_path,
    mode: command.target.mode,
    runner,
    execution_runner: executionRunner,
    model,
    ...(runUrl ? { run_url: runUrl } : {}),
  };
}

function dispatchTokenEnv(): NodeJS.ProcessEnv {
  const token = process.env.CLAWSWEEPER_DISPATCH_TOKEN?.trim();
  return token ? { GH_TOKEN: token } : {};
}

function githubActionsRunUrlFromDispatchOutput(output: unknown) {
  const text = String(output ?? "");
  return text.match(/https:\/\/github\.com\/[^\s]+\/actions\/runs\/\d+/)?.[0] ?? null;
}

function executeAutoclose(command: LooseRecord) {
  const reason = autocloseReason(command);
  const currentNumber = Number(command.issue_number);
  const targets = [...(command.autoclose_targets ?? [])].sort(
    (left: JsonValue, right: JsonValue) => {
      if (Number(left.number) === currentNumber) return 1;
      if (Number(right.number) === currentNumber) return -1;
      return Number(left.number) - Number(right.number);
    },
  );
  const results: JsonValue[] = [];
  for (const target of targets) {
    let liveTarget = target;
    try {
      liveTarget = issueTargetFromIssue(fetchIssue(target.number));
      if (String(liveTarget.state ?? "").toLowerCase() !== "open") {
        results.push({ ...liveTarget, status: "skipped", reason: "already closed" });
        continue;
      }
      if (Number(liveTarget.number) !== currentNumber) {
        postIssueComment(
          command.repo,
          liveTarget.number,
          renderAutocloseLinkedComment(command, liveTarget, reason),
        );
      }
      closeIssueOrPullRequest(command.repo, liveTarget.number, liveTarget.kind);
      results.push({ ...liveTarget, status: "closed", closed_at: new Date().toISOString() });
    } catch (error) {
      results.push({
        ...liveTarget,
        status: "blocked",
        reason: stripAnsi((error as JsonValue)?.message ?? error).trim() || "close command failed",
      });
    }
  }
  return {
    action: "autoclose",
    status: results.some((target: JsonValue) => target.status === "closed")
      ? "executed"
      : "blocked",
    reason,
    targets: results,
  };
}

function discoverAutocloseTargets({ command, issue, pull }: LooseRecord): JsonValue[] {
  const numbers = collectAutocloseCandidateNumbers({ command, issue, pull });
  const targets: JsonValue[] = [];
  for (const number of numbers) {
    if (targets.length >= maxAutocloseTargets) break;
    try {
      const candidate = Number(number) === Number(issue.number) ? issue : fetchIssue(number);
      const target = issueTargetFromIssue(candidate);
      if (target.state !== "open") continue;
      targets.push(target);
    } catch {
      // Broken or private references should not block the explicit target close.
    }
  }
  return targets;
}

function collectAutocloseCandidateNumbers({ command, issue, pull }: LooseRecord): number[] {
  const numbers = new Set<number>();
  const add = (value: JsonValue) => {
    const number = Number(value);
    if (Number.isInteger(number) && number > 0) numbers.add(number);
  };
  add(command.issue_number);
  addAutocloseNumbersFromText(numbers, command.autoclose_message);
  addAutocloseNumbersFromText(numbers, issue.body);
  addAutocloseNumbersFromText(numbers, pull?.body);
  for (const linked of pull?.closingIssuesReferences ?? []) add(linked.number);
  for (const number of fetchTimelineLinkedNumbers(command.issue_number)) add(number);
  return [...numbers];
}

function fetchTimelineLinkedNumbers(number: JsonValue): number[] {
  try {
    const timeline = ghPaged(`repos/${targetRepo}/issues/${number}/timeline?per_page=100`);
    const numbers = new Set<number>();
    for (const event of timeline) {
      addAutocloseNumbersFromText(numbers, event?.body);
      addAutocloseNumbersFromText(numbers, event?.source?.issue?.html_url);
    }
    return [...numbers];
  } catch {
    return [];
  }
}

function addAutocloseNumbersFromText(numbers: Set<number>, text: string) {
  const value = String(text ?? "");
  if (!value) return;
  const urlPattern = new RegExp(
    `https://github\\.com/${escapeRegExp(targetRepo)}/(?:issues|pull)/(\\d+)`,
    "gi",
  );
  for (const match of value.matchAll(urlPattern)) numbers.add(Number(match[1]));
  for (const match of value.matchAll(/(?:^|[\s(])#(\d+)\b/g)) numbers.add(Number(match[1]));
}

function issueTargetFromIssue(issue: LooseRecord) {
  const number = Number(issue.number);
  return {
    number,
    ref: `#${number}`,
    kind: issue.pull_request ? "pull_request" : "issue",
    state: String(issue.state ?? "").toLowerCase(),
    title: issue.title ?? null,
    url:
      issue.html_url ??
      `https://github.com/${targetRepo}/${issue.pull_request ? "pull" : "issues"}/${number}`,
  };
}

function autocloseReason(command: LooseRecord) {
  return String(command.autoclose_message ?? autocloseReasonFromCommand(command.command)).trim();
}

function renderAutocloseLinkedComment(command: LooseRecord, target: LooseRecord, reason: string) {
  return [
    `<!-- clawsweeper-autoclose:${command.comment_version_key ?? command.comment_id}:#${target.number} -->`,
    "🐠 ClawSweeper is closing this as not planned based on maintainer direction on a linked item.",
    "",
    `Source: #${command.issue_number}`,
    "",
    "Maintainer reason:",
    `> ${reason.replace(/\n/g, "\n> ")}`,
  ].join("\n");
}

function postIssueComment(repo: string, number: number, body: string) {
  const payloadPath = writePayload(repoRoot(), `autoclose-comment-${number}`, { body });
  ghText([
    "api",
    `repos/${repo}/issues/${number}/comments`,
    "--method",
    "POST",
    "--input",
    payloadPath,
  ]);
}

function closeIssueOrPullRequest(repo: string, number: number, kind: string) {
  if (kind === "pull_request") {
    ghText(["pr", "close", String(number), "--repo", repo]);
    return;
  }
  const payloadPath = writePayload(repoRoot(), `autoclose-close-${number}`, {
    state: "closed",
    state_reason: "not_planned",
  });
  ghText(["api", `repos/${repo}/issues/${number}`, "--method", "PATCH", "--input", payloadPath]);
}

function executeAutomerge(command: LooseRecord) {
  const transientWait = automergeTransientWaitConfig(process.env);
  const transientObservations: LooseRecord[] = [];
  let waitedMs = 0;
  let view = fetchPullRequestView(command.issue_number);
  let latestTarget = latestAutomergeTarget(command, view);
  let block = validateAutomergeReadiness({ command, view, target: latestTarget });
  while (block && isTransientAutomergeBlock(block, view) && waitedMs < transientWait.maxWaitMs) {
    const waitMs = Math.min(transientWait.intervalMs, transientWait.maxWaitMs - waitedMs);
    transientObservations.push(automergeTransientObservation(block, view, waitedMs, waitMs));
    sleepMs(waitMs);
    waitedMs += waitMs;
    view = fetchPullRequestView(command.issue_number);
    latestTarget = latestAutomergeTarget(command, view);
    block = validateAutomergeReadiness({ command, view, target: latestTarget });
  }
  if (block) {
    if (isAutomergeChangelogBlock(block)) {
      return {
        action: "merge",
        status: "repair_needed",
        reason: block,
        repair_reason:
          "CHANGELOG.md entry is required before automerge; dispatch a focused changelog repair",
        merge_method: "squash",
      };
    }
    if (isTransientAutomergeBlock(block, view)) {
      return {
        action: "merge",
        status: "waiting",
        reason: block,
        merge_method: "squash",
        transient_wait_ms: waitedMs,
        transient_observations: transientObservations,
      };
    }
    return { action: "merge", status: "blocked", reason: block, merge_method: "squash" };
  }
  const gateBlock = automergeGateBlockReason(process.env);
  if (gateBlock) {
    ensureHumanReviewLabel(command.repo);
    ensureMergeReadyLabel(command.repo);
    ghBestEffort([
      "issue",
      "edit",
      String(command.issue_number),
      "--repo",
      command.repo,
      "--add-label",
      HUMAN_REVIEW_LABEL,
      "--add-label",
      MERGE_READY_LABEL,
    ]);
    return { action: "merge", status: "blocked", reason: gateBlock, merge_method: "squash" };
  }
  const mergeMessage = buildAutomergeSquashMessage({
    command,
    view,
    target: latestTarget,
    comments: issueCommentsFor(command.issue_number),
  });
  const bodyFile = writeAutomergeMergeBody(command, latestTarget, mergeMessage.body);
  const result = ghSpawn(
    buildAutomergeMergeArgs({
      issueNumber: command.issue_number,
      repo: command.repo,
      expectedHeadSha: command.expected_head_sha,
      subject: mergeMessage.subject,
      bodyFile,
    }),
  );
  if (result.status !== 0) {
    const failure = stripAnsi(result.stderr || result.stdout).trim();
    const repairReason = automergeMergeFailureRepairReason(failure);
    if (repairReason) {
      return {
        action: "merge",
        status: "repair_needed",
        reason: `merge command failed: ${failure}`,
        repair_reason: repairReason,
        merge_method: "squash",
      };
    }
    ensureMergeReadyLabel(command.repo);
    ghBestEffort([
      "issue",
      "edit",
      String(command.issue_number),
      "--repo",
      command.repo,
      "--add-label",
      MERGE_READY_LABEL,
    ]);
    return {
      action: "merge",
      status: "blocked",
      reason: `merge command failed: ${failure}`,
      merge_method: "squash",
    };
  }
  const merged = fetchPullRequestView(command.issue_number);
  return {
    action: "merge",
    status: "executed",
    reason: "merged by ClawSweeper automerge",
    merged_at: merged.mergedAt ?? new Date().toISOString(),
    merge_commit_sha: merged.mergeCommit?.oid ?? null,
    merge_method: "squash",
    prepared_head_sha: latestTarget.head_sha ?? null,
    commit_subject: mergeMessage.subject,
    summary_lines: mergeMessage.summaryLines,
    fixup_lines: mergeMessage.fixupLines,
    transient_wait_ms: waitedMs,
    transient_observations: transientObservations,
  };
}

function latestAutomergeTarget(command: LooseRecord, view: LooseRecord) {
  const labels = (view.labels ?? []).map((item: JsonValue) => item.name ?? item);
  return {
    ...command.target,
    ...view,
    labels,
    head_sha: view.headRefOid ?? command.target?.head_sha ?? null,
  };
}

function automergeTransientObservation(
  reason: string,
  view: LooseRecord,
  waitedMs: number,
  nextWaitMs: number,
) {
  const checks = summarizeChecks(view.statusCheckRollup ?? []);
  return {
    reason,
    waited_ms: waitedMs,
    next_wait_ms: nextWaitMs,
    mergeable: view.mergeable ?? null,
    merge_state_status: view.mergeStateStatus ?? null,
    review_decision: view.reviewDecision ?? null,
    check_counts: checks.counts,
    check_blockers: checks.blockers.slice(0, 8),
  };
}

function sleepMs(ms: number) {
  if (ms <= 0) return;
  const buffer = new SharedArrayBuffer(4);
  Atomics.wait(new Int32Array(buffer), 0, 0, ms);
}

function buildAutomergeSquashMessage({
  command,
  view,
  target,
  comments,
}: LooseRecord): LooseRecord {
  const number = Number(command.issue_number);
  const rawTitle = String(view.title ?? target.title ?? `PR #${number}`).trim();
  const subject = rawTitle.includes(`#${number}`) ? rawTitle : `${rawTitle} (#${number})`;
  const summaryLines = reviewSummaryLines(command);
  const fixupLines = automergeFixupLines({ view, comments });
  const validationLines = [
    `ClawSweeper review passed for head ${target.head_sha ?? command.expected_head_sha ?? "unknown"}.`,
    "Required merge gates passed before the squash merge.",
  ];
  const body = [
    "Summary:",
    ...summaryLines.map((line: string) => `- ${line}`),
    "",
    "ClawSweeper fixups:",
    ...fixupLines.map((line: string) => `- ${line}`),
    "",
    "Validation:",
    ...validationLines.map((line: string) => `- ${line}`),
    "",
    `Prepared head SHA: ${target.head_sha ?? command.expected_head_sha ?? "unknown"}`,
    ...(command.comment_url ? [`Review: ${command.comment_url}`] : []),
    "",
    ...coAuthorTrailersFromCommits(view.commits ?? []),
  ].join("\n");
  return { subject, body: body.trimEnd(), summaryLines, fixupLines };
}

function reviewSummaryLines(command: LooseRecord): string[] {
  const lines = linesFromMarkdownSection(command.review_summary);
  if (lines.length > 0) return lines.slice(0, 4);
  return [
    `Merged ${command.target?.title ?? `PR #${command.issue_number}`} after ClawSweeper review.`,
  ];
}

function automergeFixupLines({ view, comments }: LooseRecord): string[] {
  const lines: string[] = [];
  const commits = Array.isArray(view.commits) ? view.commits : [];
  const followupCommits = commits.slice(1).map(commitHeadline).filter(Boolean);
  for (const headline of followupCommits.slice(0, 6)) {
    lines.push(`Included follow-up commit: ${headline}`);
  }
  const sawRepair = comments.some((comment: JsonValue) =>
    String(comment.body ?? "").includes("clawsweeper_auto_repair"),
  );
  const sawFinding = comments.some((comment: JsonValue) =>
    /Codex review: found issues before merge|clawsweeper-action:fix-required/i.test(
      String(comment.body ?? ""),
    ),
  );
  if (sawRepair) lines.push("Ran the ClawSweeper repair loop before final review.");
  if (sawFinding) lines.push("Addressed earlier ClawSweeper review findings before merge.");
  const uniqueLines = unique(lines).slice(0, 8);
  return uniqueLines.length > 0
    ? uniqueLines
    : ["No separate fixup commits were needed after automerge opt-in."];
}

function coAuthorTrailersFromCommits(commits: JsonValue): string[] {
  if (!Array.isArray(commits)) return [];
  const trailers: string[] = [];
  const seen = new Set<string>();
  for (const commit of commits) {
    for (const author of commit?.authors ?? []) {
      const name = String(author?.name ?? author?.login ?? "").trim();
      const email = String(author?.email ?? "").trim();
      if (!name || !email) continue;
      const key = `${name.toLowerCase()} <${email.toLowerCase()}>`;
      if (seen.has(key)) continue;
      seen.add(key);
      trailers.push(`Co-authored-by: ${name} <${email}>`);
    }
  }
  return trailers;
}

function commitHeadline(commit: JsonValue): string {
  return compactText(commit?.messageHeadline ?? commit?.headline ?? commit?.message ?? "", 160);
}

function writeAutomergeMergeBody(command: LooseRecord, target: LooseRecord, body: string) {
  const dir = path.join(repoRoot(), ".clawsweeper-repair", "payloads");
  fs.mkdirSync(dir, { recursive: true });
  const name =
    `automerge-merge-body-${command.issue_number}-${target.head_sha ?? command.expected_head_sha ?? "head"}`
      .replace(/[^A-Za-z0-9_.-]+/g, "-")
      .slice(0, 180);
  const file = path.join(dir, `${name}.txt`);
  fs.writeFileSync(file, `${body.trimEnd()}\n`);
  return file;
}

function validateAutomergeReadiness({ command, view, target }: LooseRecord) {
  if (hasLabel(target, AUTOFIX_LABEL))
    return "PR is in ClawSweeper autofix mode; merge is disabled";
  if (!hasLabel(target, AUTOMERGE_LABEL)) {
    return "PR is not opted into ClawSweeper automerge";
  }
  if (hasLabel(target, HUMAN_REVIEW_LABEL)) return "PR is paused for human review";
  if (view.state && view.state !== "OPEN")
    return `pull request is ${String(view.state).toLowerCase()}`;
  if (view.isDraft) return "pull request is draft";
  if (String(view.baseRefName ?? "") !== "main") return "pull request base is not main";
  const headBlock = reviewedHeadShaBlockReason({
    expectedHeadSha: command.expected_head_sha,
    currentHeadSha: view.headRefOid,
    markerName: "pass",
  });
  if (headBlock) return headBlock;
  if (view.mergeable !== "MERGEABLE") return `mergeable state is ${view.mergeable || "unknown"}`;
  if (!["CLEAN", "HAS_HOOKS"].includes(String(view.mergeStateStatus ?? ""))) {
    return `merge state status is ${view.mergeStateStatus || "unknown"}`;
  }
  if (["CHANGES_REQUESTED", "REVIEW_REQUIRED"].includes(String(view.reviewDecision ?? ""))) {
    return `review decision is ${view.reviewDecision}`;
  }
  const checks = summarizeChecks(view.statusCheckRollup ?? []);
  if (checks.blockers.length > 0)
    return `checks are not green: ${checks.blockers.slice(0, 8).join(", ")}`;
  if (checks.total === 0) return "no PR checks found";
  const changelogBlock = automergeChangelogBlockReason({
    repo: command.repo,
    title: view.title,
    files: view.files,
  });
  if (changelogBlock) return changelogBlock;
  return "";
}

function isAutomergeChangelogBlock(reason: string) {
  return /CHANGELOG\.md entry is required/i.test(String(reason ?? ""));
}

function isTransientAutomergeBlock(reason: string, view: LooseRecord) {
  const text = String(reason ?? "").toLowerCase();
  if (text.includes("checks are not green")) return hasPendingChecks(view.statusCheckRollup ?? []);
  return (
    text.includes("mergeable state is unknown") ||
    text.includes("merge state status is unknown") ||
    text.includes("merge state status is unstable") ||
    text.includes("review decision is review_required") ||
    text.includes("no pr checks found")
  );
}

function hasPendingChecks(checks: LooseRecord[]) {
  return (checks ?? []).some((check: JsonValue) => {
    const status = String(check.status ?? check.state ?? "").toUpperCase();
    const conclusion = String(check.conclusion ?? "").toUpperCase();
    return status && !["COMPLETED", "SUCCESS"].includes(status) && !conclusion;
  });
}

function classifyIssueTarget(issue: LooseRecord): JsonValue {
  return {
    kind: "issue",
    state: issue.state ?? null,
    title: issue.title ?? null,
    labels: (issue.labels ?? []).map((item: JsonValue) => item.name ?? item),
  };
}

function classifyPullTarget(pull: LooseRecord, issueNumber: JsonValue): JsonValue {
  const branch = String(pull.headRefName ?? "");
  const labels = (pull.labels ?? []).map((item: JsonValue) => item.name ?? item);
  const author = String(pull.author?.login ?? pull.author?.name ?? "").toLowerCase();
  const clusterId = branch.startsWith(headPrefix) ? branch.slice(headPrefix.length) : null;
  const automergeCluster = automergeClusterId(targetRepo, issueNumber);
  const automergePath = automergeJobPath(targetRepo, issueNumber);
  const clawsweeperJobPath = clusterId ? existingJobPath(clusterId, targetRepo) : null;
  const adoptedJobPath = existingJobPath(automergeCluster, targetRepo);
  const jobPath = clawsweeperJobPath ?? adoptedJobPath;
  return {
    kind: "pull_request",
    title: pull.title ?? null,
    branch,
    head_sha: pull.headRefOid ?? null,
    author,
    labels,
    is_clawsweeper_pr: branch.startsWith(headPrefix),
    cluster_id: clusterId ?? (adoptedJobPath ? automergeCluster : null),
    job_path: jobPath,
    automerge_cluster_id: automergeCluster,
    automerge_job_path: adoptedJobPath ?? automergePath,
    mode: jobPath ? dispatchMode(jobPath) : "autonomous",
    mergeable: pull.mergeable ?? null,
    merge_state_status: pull.mergeStateStatus ?? null,
    review_decision: pull.reviewDecision ?? null,
    checks: summarizeChecks(pull.statusCheckRollup ?? []),
  };
}

function dispatchMode(jobPath: string) {
  const job = parseJob(jobPath);
  const errors = validateJob(job);
  if (errors.length > 0) throw new Error(`invalid job ${jobPath}: ${errors.join("; ")}`);
  return ["execute", "autonomous"].includes(String(job.frontmatter.mode ?? ""))
    ? job.frontmatter.mode
    : "autonomous";
}

function existingJobPath(clusterId: string, repo: string = targetRepo) {
  const owner = String(repo ?? "").split("/")[0] || "openclaw";
  for (const relative of [
    path.join("jobs", owner, "inbox", `${clusterId}.md`),
    path.join("jobs", owner, `${clusterId}.md`),
    path.join("jobs", owner, "outbox", "finalized", `${clusterId}.md`),
    path.join("jobs", owner, "outbox", "stuck", `${clusterId}.md`),
  ]) {
    if (fs.existsSync(path.join(repoRoot(), relative))) return relative;
  }
  return null;
}

function listRecentComments() {
  const list = ghPaged(
    `repos/${targetRepo}/issues/comments?since=${encodeURIComponent(since)}&per_page=100`,
  );
  return list;
}

function listCandidateComments() {
  if (commentIds.size > 0) {
    return selectCommentsForRouting({
      recentComments: [...commentIds].map((commentId) => fetchIssueComment(commentId)),
      durableComments: [],
      maxComments,
    });
  }
  if (itemNumbers.size > 0) {
    return selectCommentsForRouting({
      recentComments: [...itemNumbers].flatMap((number) => issueCommentsFor(number)),
      durableComments: [],
      maxComments,
    });
  }
  return selectCommentsForRouting({
    recentComments: listRecentComments(),
    durableComments: listRepairLoopReviewComments(),
    maxComments,
  });
}

function extractMarkdownSection(body: JsonValue, heading: string): string {
  const text = String(body ?? "");
  const pattern = new RegExp(
    `(?:^|\\n)${escapeRegExp(heading)}:\\s*\\n+([\\s\\S]*?)(?=\\n\\n[A-Z][^\\n:]{0,80}:\\n|\\n<details>|\\n<!--|$)`,
    "i",
  );
  return pattern.exec(text)?.[1]?.trim() ?? "";
}

function linesFromMarkdownSection(section: JsonValue): string[] {
  const text = String(section ?? "").trim();
  if (!text) return [];
  const bulletLines = text
    .split(/\n+/)
    .map((line: string) => line.replace(/^\s*[-*]\s+/, "").trim())
    .filter(Boolean);
  if (bulletLines.length > 1) return bulletLines.map((line) => compactText(line, 220));
  return [compactText(text, 320)];
}

function issueCommentsFor(number: JsonValue): JsonValue[] {
  return (
    issueCommentsCache.get(Number(number)) ??
    ghPaged<JsonValue>(`repos/${targetRepo}/issues/${number}/comments?per_page=100`)
  );
}

function listRepairLoopReviewComments() {
  const numbers = unique([
    ...listOpenIssueNumbersWithLabel(AUTOFIX_LABEL),
    ...listOpenIssueNumbersWithLabel(AUTOMERGE_LABEL),
  ]);
  return numbers.flatMap((number) =>
    ghPaged<JsonValue>(`repos/${targetRepo}/issues/${number}/comments?per_page=100`).filter(
      isClawSweeperReviewMarkerComment,
    ),
  );
}

function fetchIssueComment(commentId: JsonValue) {
  return ghJson(["api", `repos/${targetRepo}/issues/comments/${commentId}`], {
    attempts: TARGET_LOOKUP_RETRY_ATTEMPTS,
  });
}

function listOpenIssueNumbersWithLabel(label: string) {
  return ghPaged<JsonValue>(
    `repos/${targetRepo}/issues?state=open&labels=${encodeURIComponent(label)}&per_page=100`,
  )
    .map((issue: JsonValue) => Number(issue.number))
    .filter((number) => Number.isInteger(number) && number > 0);
}

function isClawSweeperReviewMarkerComment(comment: JsonValue) {
  const body = String(comment.body ?? "");
  return (
    body.includes("clawsweeper-verdict:") ||
    body.includes("clawsweeper-finding:") ||
    body.includes("clawsweeper-review item=")
  );
}

function fetchLiveTarget(command: LooseRecord): LooseRecord {
  const cached = liveTargetCache.get(Number(command.issue_number));
  if (cached) return cached.status === "waiting" ? { ...command, ...cached } : cached;
  try {
    const issue = fetchIssue(command.issue_number);
    const pull = issue.pull_request ? fetchPullRequestView(command.issue_number) : null;
    return { issue, pull };
  } catch (error) {
    return {
      ...command,
      status: "waiting",
      reason: `GitHub lookup failed; will retry later: ${compactGhError(error)}`,
    };
  }
}

async function fetchLiveTargetAsync(number: number): Promise<LooseRecord> {
  try {
    const issue = await fetchIssueAsync(number);
    const pull = issue.pull_request ? await fetchPullRequestViewAsync(number) : null;
    return { issue, pull };
  } catch (error) {
    return {
      issue_number: number,
      status: "waiting",
      reason: `GitHub lookup failed; will retry later: ${compactGhError(error)}`,
    };
  }
}

function fetchIssue(number: JsonValue) {
  return ghJson(["api", `repos/${targetRepo}/issues/${number}`], {
    attempts: TARGET_LOOKUP_RETRY_ATTEMPTS,
  });
}

function fetchIssueAsync(number: JsonValue) {
  return ghJsonAsync<LooseRecord>(["api", `repos/${targetRepo}/issues/${number}`], {
    attempts: TARGET_LOOKUP_RETRY_ATTEMPTS,
  });
}

function fetchPullRequestView(number: JsonValue) {
  return ghJson(
    [
      "pr",
      "view",
      String(number),
      "--repo",
      targetRepo,
      "--json",
      [
        "headRefName",
        "headRefOid",
        "author",
        "baseRefName",
        "body",
        "closingIssuesReferences",
        "commits",
        "files",
        "isDraft",
        "labels",
        "mergeable",
        "mergeCommit",
        "mergeStateStatus",
        "mergedAt",
        "reviewDecision",
        "state",
        "statusCheckRollup",
        "title",
        "url",
      ].join(","),
    ],
    { attempts: TARGET_LOOKUP_RETRY_ATTEMPTS },
  );
}

function fetchPullRequestViewAsync(number: JsonValue) {
  return ghJsonAsync<LooseRecord>(
    [
      "pr",
      "view",
      String(number),
      "--repo",
      targetRepo,
      "--json",
      [
        "headRefName",
        "headRefOid",
        "author",
        "baseRefName",
        "body",
        "closingIssuesReferences",
        "commits",
        "files",
        "isDraft",
        "labels",
        "mergeable",
        "mergeCommit",
        "mergeStateStatus",
        "mergedAt",
        "reviewDecision",
        "state",
        "statusCheckRollup",
        "title",
        "url",
      ].join(","),
    ],
    { attempts: TARGET_LOOKUP_RETRY_ATTEMPTS },
  );
}

function compactGhError(error: unknown): string {
  const text = ghErrorText(error).replace(/\s+/g, " ").trim();
  return text ? text.slice(0, 240) : "unknown GitHub CLI error";
}

function resolveMaintainerCommandAuthorization(command: LooseRecord) {
  const login = String(command.author ?? "").trim();
  const repositoryPermission = login ? fetchCollaboratorPermission(login) : null;
  const allowed = isMaintainerCommandAllowed({
    authorAssociation: command.author_association,
    repositoryPermission,
    allowedAssociations,
    allowedRepositoryPermissions: [...allowedRepositoryPermissions],
  });
  if (allowed) return { allowed: true, repositoryPermission };
  const association = command.author_association || "unknown";
  const permission = repositoryPermission || "unknown";
  return {
    allowed: false,
    repositoryPermission,
    reason: `author association ${association} and repository permission ${permission} are not allowed`,
  };
}

function fetchCollaboratorPermission(login: JsonValue) {
  const key = login.toLowerCase();
  if (collaboratorPermissionCache.has(key)) return collaboratorPermissionCache.get(key);
  let permission = null;
  try {
    const result = ghJson([
      "api",
      `repos/${targetRepo}/collaborators/${encodeURIComponent(login)}/permission`,
    ]);
    permission = result?.permission ? String(result.permission).toLowerCase() : null;
  } catch {
    permission = null;
  }
  collaboratorPermissionCache.set(key, permission);
  return permission;
}

async function fetchCollaboratorPermissionAsync(login: JsonValue) {
  const key = login.toLowerCase();
  if (collaboratorPermissionCache.has(key)) return collaboratorPermissionCache.get(key);
  let permission = null;
  try {
    const result = await ghJsonAsync<LooseRecord>([
      "api",
      `repos/${targetRepo}/collaborators/${encodeURIComponent(login)}/permission`,
    ]);
    permission = result?.permission ? String(result.permission).toLowerCase() : null;
  } catch {
    permission = null;
  }
  collaboratorPermissionCache.set(key, permission);
  return permission;
}

function hasExistingResponse(
  number: JsonValue,
  commentId: JsonValue,
  intent: JsonValue,
  headSha: JsonValue,
) {
  const marker = `<!-- clawsweeper-command:${commentId}:${intent}:${headSha ?? "na"} -->`;
  const comments =
    issueCommentsCache.get(Number(number)) ??
    ghPaged(`repos/${targetRepo}/issues/${number}/comments?per_page=100`);
  return comments.some((comment: JsonValue) => {
    const body = String(comment.body ?? "");
    if (!body.includes(marker)) return false;
    if (
      MERGE_INTENTS.has(String(intent)) &&
      (body.includes("did not merge yet") ||
        body.includes("is not merged yet") ||
        body.includes("I left the PR open for the remaining gate"))
    ) {
      return false;
    }
    if (intent === "maintainer_approve_automerge") {
      return !body.includes("Maintainer-approved ClawSweeper automerge is not merged yet.");
    }
    return true;
  });
}

function hasExistingModeStatusResponse(number: JsonValue, intent: JsonValue) {
  const markerPrefix = commandStatusMarkerPrefix({ issue_number: number, intent });
  const comments =
    issueCommentsCache.get(Number(number)) ??
    ghPaged(`repos/${targetRepo}/issues/${number}/comments?per_page=100`);
  return comments.some((comment: JsonValue) => {
    if (!isTrustedStatusComment(comment)) return false;
    const body = String(comment.body ?? "");
    return body.includes(markerPrefix) && !body.includes("could not enable");
  });
}

async function fetchIssueCommentsAsync(number: JsonValue) {
  return ghPagedAsync<JsonValue>(`repos/${targetRepo}/issues/${number}/comments?per_page=100`);
}

function postComment(command: LooseRecord, body: string) {
  const existing = findExistingCommandStatusComment(command);
  const nextBody = usesSharedAutomergeStatus(command)
    ? mergeAutomergeTimelineSection({
        body,
        existingBody: existing?.body,
        events: automergeTimelineEvents(command, body),
      })
    : body;
  const payloadPath = writePayload(repoRoot(), `comment-router-${command.comment_id}`, {
    body: nextBody,
  });
  if (existing?.id) {
    ghText([
      "api",
      `repos/${command.repo}/issues/comments/${existing.id}`,
      "--method",
      "PATCH",
      "--input",
      payloadPath,
    ]);
    return { mode: "updated", comment_id: String(existing.id) };
  }
  ghText([
    "api",
    `repos/${command.repo}/issues/${command.issue_number}/comments`,
    "--method",
    "POST",
    "--input",
    payloadPath,
  ]);
  return { mode: "created", comment_id: null };
}

function automergeTimelineEvents(command: LooseRecord, body: string) {
  const events: LooseRecord[] = [];
  const head = command.target?.head_sha ?? command.expected_head_sha ?? "unknown";
  const commentTime = command.comment_updated_at ?? command.comment_created_at;
  if (["automerge", "autofix"].includes(String(command.intent ?? ""))) {
    const action = executedAction(command, "dispatch_clawsweeper");
    events.push({
      id: `review-queued:${head}:${command.comment_id ?? commentTime ?? "unknown"}`,
      label: "review queued",
      at: action?.dispatched_at ?? commentTime ?? new Date().toISOString(),
      headSha: head,
      status: "queued",
      runUrl: action?.run_url,
    });
  }
  if (
    ["clawsweeper_auto_repair", "clawsweeper_auto_merge"].includes(String(command.intent ?? ""))
  ) {
    events.push({
      id: `review-result:${head}:${command.comment_id ?? commentTime ?? "unknown"}`,
      label:
        String(command.intent) === "clawsweeper_auto_merge"
          ? "review passed"
          : "review requested repair",
      at: commentTime ?? new Date().toISOString(),
      headSha: head,
      status: compactTimelineStatus(command.repair_reason ?? "verdict received"),
      runUrl: command.comment_url,
    });
  }
  const repairAction = executedAction(command, "dispatch_repair");
  if (repairAction) {
    const runUrl = repairAction.run_url ?? repairRunUrlFromBody(body);
    events.push({
      id: `repair-queued:${head}:${runIdFromUrl(runUrl) || repairAction.dispatched_at || command.comment_id || "unknown"}`,
      label: "repair queued",
      at: repairAction.dispatched_at ?? new Date().toISOString(),
      headSha: head,
      status: repairAction.mode ?? command.target?.mode ?? "queued",
      runUrl,
    });
  }
  const mergeAction = executedAction(command, "merge");
  if (mergeAction) {
    events.push({
      id: `merge:${head}:${mergeAction.merge_commit_sha ?? mergeAction.completed_at ?? command.comment_id ?? "unknown"}`,
      label: mergeAction.status === "executed" ? "merged" : "merge checked",
      at: mergeAction.completed_at ?? mergeAction.merged_at ?? new Date().toISOString(),
      headSha: head,
      status: mergeAction.reason ?? mergeAction.status,
      runUrl: command.comment_url,
    });
  }
  return events;
}

function executedAction(command: LooseRecord, name: string) {
  return (command.actions ?? []).find(
    (action: JsonValue) => action?.action === name && action?.status === "executed",
  );
}

function repairRunUrlFromBody(body: string) {
  return body.match(/https:\/\/github\.com\/[^\s]+\/actions\/runs\/\d+/)?.[0] ?? "";
}

function runIdFromUrl(value: JsonValue) {
  return String(value ?? "").match(/\/actions\/runs\/(\d+)/)?.[1] ?? "";
}

function compactTimelineStatus(value: JsonValue) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 90);
}

function findExistingCommandStatusComment(command: LooseRecord) {
  const marker = commandStatusMarker(command);
  const markerPrefix = usesSharedAutomergeStatus(command)
    ? sharedAutomergeStatusMarkerPrefix(command)
    : ["autofix"].includes(String(command.intent ?? ""))
      ? commandStatusMarkerPrefix(command)
      : null;
  return ghPaged(`repos/${command.repo}/issues/${command.issue_number}/comments?per_page=100`)
    .reverse()
    .find((comment: JsonValue) => {
      if (!isTrustedStatusComment(comment)) return false;
      const body = String(comment.body ?? "");
      if (body.includes(marker)) return true;
      if (!markerPrefix || !body.includes(markerPrefix)) return false;
      if (!usesSharedAutomergeStatus(command)) return true;
      return /clawsweeper-command-status:\d+:(?:automerge|clawsweeper_auto_repair|clawsweeper_auto_merge|maintainer_approve_automerge):/i.test(
        body,
      );
    });
}

function isTrustedStatusComment(comment: LooseRecord) {
  const author = String(comment.user?.login ?? "").toLowerCase();
  return !author || author === "clawsweeper" || trustedBots.has(author);
}

function reactToComment(command: LooseRecord, content: string) {
  if (!command.comment_id) return;
  const payloadPath = writePayload(
    repoRoot(),
    `comment-router-reaction-${command.comment_id}-${content}`,
    { content },
  );
  try {
    ghText([
      "api",
      `repos/${command.repo}/issues/comments/${command.comment_id}/reactions`,
      "--method",
      "POST",
      "--input",
      payloadPath,
    ]);
  } catch (error) {
    const message = stripAnsi(error?.message ?? error);
    if (/already exists/i.test(message) || /\b422\b/.test(message)) return;
    console.warn(
      `warning: failed to add ${content} reaction to comment ${command.comment_id}: ${message}`,
    );
  }
}

function ensureAutomergeLabel(repo: string) {
  ghBestEffort([
    "label",
    "create",
    AUTOMERGE_LABEL,
    "--repo",
    repo,
    "--color",
    "0E8A16",
    "--description",
    "Maintainer opted this ClawSweeper PR into bounded ClawSweeper-reviewed automerge",
  ]);
}

function ensureAutofixLabel(repo: string) {
  ghBestEffort([
    "label",
    "create",
    AUTOFIX_LABEL,
    "--repo",
    repo,
    "--color",
    "1D76DB",
    "--description",
    "Maintainer opted this PR into bounded ClawSweeper-reviewed autofix without merge",
  ]);
}

function ensureRepairLoopLabel(repo: string, label: string) {
  if (label === AUTOFIX_LABEL) {
    ensureAutofixLabel(repo);
    return;
  }
  ensureAutomergeLabel(repo);
}

function ensureHumanReviewLabel(repo: string) {
  ghBestEffort([
    "label",
    "create",
    HUMAN_REVIEW_LABEL,
    "--repo",
    repo,
    "--color",
    "B60205",
    "--description",
    "ClawSweeper automerge is paused for maintainer review",
  ]);
}

function ensureMergeReadyLabel(repo: string) {
  ghBestEffort([
    "label",
    "create",
    MERGE_READY_LABEL,
    "--repo",
    repo,
    "--color",
    "5319E7",
    "--description",
    "ClawSweeper found the PR merge-ready but a human gate is still closed",
  ]);
}

function hasLabel(target: LooseRecord, name: string) {
  return (target?.labels ?? []).some(
    (labelName: JsonValue) => String(labelName).toLowerCase() === String(name).toLowerCase(),
  );
}

function pauseLabelsOn(target: LooseRecord) {
  return [HUMAN_REVIEW_LABEL, MERGE_READY_LABEL].filter((name) => hasLabel(target, name));
}

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

async function mapLimit<T, R>(
  items: T[],
  limit: number,
  mapper: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = Array.from<R>({ length: items.length });
  let next = 0;
  const workers = Array.from({ length: Math.min(Math.max(limit, 1), items.length) }, async () => {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await mapper(items[index]);
    }
  });
  await Promise.all(workers);
  return results;
}

function ledgerPath() {
  return path.join(repoRoot(), "results", "comment-router.json");
}

function idempotencyKey(
  parsed: LooseRecord,
  issueNumber: JsonValue,
  commentId: JsonValue,
  commentUpdatedAt: JsonValue,
) {
  const prefix = parsed.trusted_bot ? "clawsweeper-repair" : "comment-router";
  return `${prefix}:${targetRepo}:${issueNumber}:${commentId}:${commentUpdatedAt ?? "unknown"}:${parsed.intent}`;
}

function commentVersionKey(entry: LooseRecord) {
  const id = entry?.comment_id;
  const updatedAt = entry?.comment_updated_at;
  if (!id || !updatedAt) return null;
  return `${id}:${updatedAt}`;
}
