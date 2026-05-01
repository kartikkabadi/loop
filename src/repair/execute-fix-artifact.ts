#!/usr/bin/env node
import type { JsonValue, LooseRecord } from "./json-types.js";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { assertAllowedOwner, parseArgs, parseJob, repoRoot, validateJob } from "./lib.js";
import {
  automergeRepairOutcomeComment,
  externalMessageProvenance,
  repairContributorBranchComment,
  replacementPrBody,
  replacementSourceCloseComment,
  replacementSourceLinkComment,
} from "./external-messages.js";
import { runCommand as run } from "./command-runner.js";
import {
  branchHasBaseDiff,
  completeRebaseIfResolved,
  currentHead,
  ensureMergeBaseAvailable,
  isAncestor,
  rebaseOntoBase,
  remoteBranchExists,
  remoteBranchSha,
} from "./git-repo-utils.js";
import { parsePullRequestUrl, pullRequestNumberFromUrl } from "./github-ref.js";
import {
  clawsweeperGitUserEmail,
  clawsweeperGitUserName,
  codexSubprocessEnv as codexEnv,
  repairGhEnv as ghEnv,
} from "./process-env.js";
import {
  CLAWSWEEPER_LABEL,
  CLAWSWEEPER_LABEL_COLOR,
  CLAWSWEEPER_LABEL_DESCRIPTION,
  COMMIT_FINDING_LABEL,
  COMMIT_FINDING_LABEL_COLOR,
  COMMIT_FINDING_LABEL_DESCRIPTION,
} from "./constants.js";
import { buildFixPrompt, buildRepositoryContext } from "./fix-prompt-builder.js";
import { applyMechanicalChangelogFix } from "./mechanical-changelog.js";
import { compactText } from "./text-utils.js";
import {
  shouldCloseSupersededSourcePrs,
  shouldSeedReplacementBranchFromSource,
} from "./execute-fix-policy.js";
import { replacementLabelsToCopy } from "./replacement-labels.js";
import {
  checkoutSourcePullRequestHead,
  fetchSourcePullRequestHead,
  firstTargetSourcePullRequest,
} from "./source-pr-checkout.js";
import { mergeAutomergeTimelineSection } from "./automerge-status-timeline.js";
import {
  prepareTargetToolchain,
  preflightTargetValidationPlan,
  repairDeltaValidationPlan,
  runAllowedValidationCommands,
  type TargetValidationOptions,
} from "./target-validation.js";
import { uniqueStrings } from "./validation-command-utils.js";
import { validateActivePrAreaCapacity } from "./execute-fix-area-capacity.js";
import {
  validateAutonomousFixScope,
  validateFixArtifact,
  validateFixSecurityScope,
} from "./execute-fix-validation.js";
import {
  coAuthorTrailers,
  fetchPullRequest,
  fetchSourcePullRequestView,
  prepareReviewThreadsForMerge,
  publicContributorCredit,
  sourceContributorCredits,
  supersededReplacementSources,
} from "./execute-fix-github.js";

const FIX_ACTIONS = new Set(["fix_needed", "build_fix_artifact", "open_fix_pr"]);
const NON_EXECUTABLE_REPAIR_STRATEGIES = new Set(["already_fixed_on_main", "needs_human"]);
const DEFAULT_BASE_BRANCH = "main";

const args = parseArgs(process.argv.slice(2));
const jobPath = args._[0];
const resultPathArg = args._[1];
const latest = Boolean(args.latest);
const dryRun = Boolean(args["dry-run"] || process.env.CLAWSWEEPER_FIX_DRY_RUN === "1");
const model = String(args.model ?? process.env.CLAWSWEEPER_MODEL ?? "gpt-5.5");
const requestedCodexTimeoutMs = Number(
  process.env.CLAWSWEEPER_FIX_CODEX_TIMEOUT_MS ?? 25 * 60 * 1000,
);
const fixStepTimeoutMs = Number(process.env.CLAWSWEEPER_FIX_STEP_TIMEOUT_MS ?? 30 * 60 * 1000);
const fixTimeoutReserveMs = Number(process.env.CLAWSWEEPER_FIX_TIMEOUT_RESERVE_MS ?? 5 * 60 * 1000);
const codexTimeoutMs = Math.min(
  requestedCodexTimeoutMs,
  Math.max(60 * 1000, fixStepTimeoutMs - fixTimeoutReserveMs),
);
const codexPreflightTimeoutMs = Number(
  process.env.CLAWSWEEPER_FIX_PREFLIGHT_TIMEOUT_MS ?? 2 * 60 * 1000,
);
const codexReasoningEffort = String(process.env.CLAWSWEEPER_CODEX_REASONING_EFFORT ?? "high");
const scriptStartedAt = new Date();
const codexServiceTier = String(process.env.CLAWSWEEPER_CODEX_SERVICE_TIER ?? "fast").trim();
const codexStdioMaxBuffer =
  Math.max(1, Number(process.env.CLAWSWEEPER_CODEX_STDIO_MAX_BUFFER_MB ?? 128)) * 1024 * 1024;
const maxEditAttempts = Math.max(1, Number(process.env.CLAWSWEEPER_FIX_EDIT_ATTEMPTS ?? 3));
const maxReviewAttempts = Math.max(1, Number(process.env.CLAWSWEEPER_CODEX_REVIEW_ATTEMPTS ?? 2));
const resolveReviewThreads = process.env.CLAWSWEEPER_RESOLVE_REVIEW_THREADS !== "0";
const skipCodexWritePreflight = process.env.CLAWSWEEPER_SKIP_CODEX_WRITE_PREFLIGHT === "1";
const allowExpensiveValidation = process.env.CLAWSWEEPER_ALLOW_EXPENSIVE_VALIDATION === "1";
const installTargetDeps = process.env.CLAWSWEEPER_INSTALL_TARGET_DEPS !== "0";
const allowBroadFixArtifacts = process.env.CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS === "1";
const closeSupersededSourcePrs = shouldCloseSupersededSourcePrs(
  process.env.CLAWSWEEPER_CLOSE_SUPERSEDED_SOURCE_PRS,
);
const maxAutonomousFixFiles = Math.max(
  1,
  Number(process.env.CLAWSWEEPER_MAX_AUTONOMOUS_FIX_FILES ?? 8),
);
const maxAutonomousFixSurfaces = Math.max(
  1,
  Number(process.env.CLAWSWEEPER_MAX_AUTONOMOUS_FIX_SURFACES ?? 4),
);
const maxActivePrsPerArea = Number(process.env.CLAWSWEEPER_MAX_ACTIVE_PRS_PER_AREA ?? 50);
const strictTargetValidation =
  process.env.CLAWSWEEPER_STRICT_TARGET_VALIDATION === "1" ||
  String(process.env.CLAWSWEEPER_TARGET_VALIDATION_MODE ?? "changed-only") === "strict";
const defaultCodexWriteSandbox =
  process.env.GITHUB_ACTIONS === "true" ? "danger-full-access" : "workspace-write";
const codexWriteSandbox = String(
  process.env.CLAWSWEEPER_CODEX_WRITE_SANDBOX ?? defaultCodexWriteSandbox,
);
const defaultCodexReviewSandbox =
  process.env.GITHUB_ACTIONS === "true" ? "danger-full-access" : "read-only";
const codexReviewSandbox = String(
  process.env.CLAWSWEEPER_CODEX_REVIEW_SANDBOX ?? defaultCodexReviewSandbox,
);
const codexWriteNetworkAccess = parseBooleanEnv(
  process.env.CLAWSWEEPER_CODEX_WRITE_NETWORK_ACCESS,
  process.env.GITHUB_ACTIONS === "true",
);
const codexReviewNetworkAccess = parseBooleanEnv(
  process.env.CLAWSWEEPER_CODEX_REVIEW_NETWORK_ACCESS,
  false,
);
let workRoot = "";
let targetDir = "";

if (!jobPath) {
  console.error(
    "usage: node scripts/execute-fix-artifact.ts <job.md> [result.json] [--latest] [--dry-run]",
  );
  process.exit(2);
}
if (!resultPathArg && !latest) {
  console.error("result path is required unless --latest is set");
  process.exit(2);
}

const job = parseJob(jobPath);
const jobErrors = validateJob(job);
if (jobErrors.length > 0) {
  console.error(jobErrors.join("\n"));
  process.exit(1);
}

assertAllowedOwner(job.frontmatter.repo, process.env.CLAWSWEEPER_ALLOWED_OWNER);

if (!["execute", "autonomous"].includes(job.frontmatter.mode)) {
  throw new Error("refusing fix execution: job frontmatter mode is not execute or autonomous");
}
if (process.env.CLAWSWEEPER_ALLOW_EXECUTE !== "1") {
  throw new Error("refusing fix execution: CLAWSWEEPER_ALLOW_EXECUTE must be 1");
}

const resultPath = resultPathArg ? path.resolve(resultPathArg) : findLatestResultPath();
const result = JSON.parse(fs.readFileSync(resultPath, "utf8"));
if (result.repo !== job.frontmatter.repo) {
  throw new Error(`result repo ${result.repo} does not match job repo ${job.frontmatter.repo}`);
}
if (result.cluster_id !== job.frontmatter.cluster_id) {
  throw new Error(
    `result cluster ${result.cluster_id} does not match job cluster ${job.frontmatter.cluster_id}`,
  );
}
if (result.mode !== job.frontmatter.mode) {
  throw new Error(`result mode ${result.mode} does not match job mode ${job.frontmatter.mode}`);
}

const targetValidationOptions: TargetValidationOptions = {
  allowExpensiveValidation,
  installTargetDeps,
  strictTargetValidation,
  targetRepo: result.repo,
};
const rawFixArtifact = result.fix_artifact;
const executableFixArtifact = executableReplacementFixArtifact(rawFixArtifact, result);
const promotedReplacement = executableFixArtifact !== rawFixArtifact;
const plannedFixActions = (result.actions ?? []).filter((action: JsonValue) =>
  isExecutableFixAction(action, promotedReplacement),
);
const report: LooseRecord = {
  repo: result.repo,
  cluster_id: result.cluster_id,
  dry_run: dryRun,
  result_path: path.relative(repoRoot(), resultPath),
  executed_at: new Date().toISOString(),
  policy_override: promotedReplacement
    ? "promoted needs_human uneditable-source fix artifact to replace_uneditable_branch"
    : null,
  actions: [],
};

if (plannedFixActions.length === 0) {
  report.status = "skipped";
  report.reason = "no planned fix actions";
  writeReport(report, resultPath);
  process.exit(0);
}

if (process.env.CLAWSWEEPER_ALLOW_FIX_PR !== "1") {
  throw new Error("refusing fix execution: CLAWSWEEPER_ALLOW_FIX_PR must be 1");
}
if (
  !job.frontmatter.allowed_actions.includes("fix") ||
  !job.frontmatter.allowed_actions.includes("raise_pr")
) {
  throw new Error("refusing fix execution: job must allow fix and raise_pr");
}
if (
  (job.frontmatter.blocked_actions ?? []).includes("fix") ||
  job.frontmatter.allow_fix_pr !== true
) {
  throw new Error("refusing fix execution: fix is blocked by job frontmatter");
}

const repairStrategy = String(executableFixArtifact?.repair_strategy ?? "");
if (NON_EXECUTABLE_REPAIR_STRATEGIES.has(repairStrategy)) {
  report.status = "skipped";
  report.reason = `fix_artifact.repair_strategy ${repairStrategy} is not executable`;
  report.actions.push({
    action: "execute_fix",
    status: "skipped",
    repair_strategy: repairStrategy,
    reason: "worker marked the fix path as non-executable; closure actions may still apply",
  });
  writeReport(report, resultPath);
  process.exit(0);
}

const fixArtifact = validateFixArtifact(executableFixArtifact);
const securityBlock = validateFixSecurityScope({ job, resultPath, fixArtifact, plannedFixActions });
if (securityBlock) {
  report.status = "skipped";
  report.reason = securityBlock.reason;
  report.actions.push({
    action: "execute_fix",
    status: "skipped",
    repair_strategy: fixArtifact.repair_strategy,
    reason: securityBlock.reason,
    evidence: securityBlock.evidence,
  });
  writeReport(report, resultPath);
  process.exit(0);
}
const scopeBlock = validateAutonomousFixScope({
  job,
  fixArtifact,
  allowBroadFixArtifacts,
  maxAutonomousFixFiles,
  maxAutonomousFixSurfaces,
});
if (scopeBlock) {
  report.status = "blocked";
  report.reason = scopeBlock.reason;
  report.actions.push({
    action: "execute_fix",
    status: "blocked",
    repair_strategy: fixArtifact.repair_strategy,
    reason: scopeBlock.reason,
    evidence: scopeBlock.evidence,
  });
  writeReport(report, resultPath);
  process.exit(0);
}

workRoot =
  typeof args["work-dir"] === "string"
    ? path.resolve(args["work-dir"])
    : fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-repair-fix-"));
targetDir =
  typeof args["target-dir"] === "string"
    ? path.resolve(args["target-dir"])
    : path.join(workRoot, result.repo.replace("/", "-"));
fs.mkdirSync(workRoot, { recursive: true });

ensureTargetCheckout(result.repo, targetDir);
setupGitIdentity(targetDir);

const validationPreflight = preflightTargetValidationPlan(
  {
    fixArtifact,
    targetDir,
    baseBranch: DEFAULT_BASE_BRANCH,
  },
  targetValidationOptions,
);
report.validation_preflight = validationPreflight;
if (validationPreflight.status === "blocked") {
  report.status = "blocked";
  report.reason = validationPreflight.reason;
  report.actions.push({
    action: "execute_fix",
    status: "blocked",
    code: validationPreflight.code,
    repair_strategy: fixArtifact.repair_strategy,
    reason: validationPreflight.reason,
    required: validationPreflight.required,
    available_scripts: validationPreflight.available_scripts,
    target_branch: validationPreflight.target_branch,
    source_pr: validationPreflight.source_pr,
  });
  writeReport(report, resultPath);
  process.exit(0);
}

const writePreflight = runCodexWritePreflight();
report.preflight = writePreflight;
if (writePreflight.status === "blocked") {
  report.status = "blocked";
  report.reason = writePreflight.reason;
  report.actions.push({
    action: "execute_fix",
    status: "blocked",
    repair_strategy: fixArtifact.repair_strategy,
    reason: writePreflight.reason,
    evidence: writePreflight.evidence,
  });
  writeReport(report, resultPath);
  process.exit(0);
}

let outcome: JsonValue;
try {
  if (fixArtifact.repair_strategy === "repair_contributor_branch") {
    try {
      outcome = executeRepairBranch({ fixArtifact, targetDir });
    } catch (error) {
      report.actions.push({
        action: "repair_contributor_branch",
        status: "failed",
        reason: error.message,
      });
      if (!shouldFallbackToReplacementAfterRepairError(error)) throw error;
      const fallbackTargetDir = prepareFallbackReplacementCheckout(targetDir);
      outcome = executeReplacementBranch({
        fixArtifact,
        targetDir: fallbackTargetDir,
        supersedeSources: true,
        fallbackReason: error.message,
      });
    }
  } else {
    outcome = executeReplacementBranch({
      fixArtifact,
      targetDir,
      supersedeSources: fixArtifact.repair_strategy === "replace_uneditable_branch",
      fallbackReason: null,
    });
  }
} catch (error) {
  if (
    fixArtifact.allow_no_pr === true &&
    /Codex produced no target repo changes/i.test(String(error?.message ?? error))
  ) {
    outcome = {
      action: "open_fix_pr",
      status: "skipped",
      repair_strategy: fixArtifact.repair_strategy,
      reason:
        "Codex produced no target repo changes; treating this allow_no_pr artifact as an audited no-PR outcome",
    };
  } else {
    if (!isBlockedFixError(error)) throw error;
    outcome = {
      action: "execute_fix",
      status: "blocked",
      repair_strategy: fixArtifact.repair_strategy,
      reason: error.message,
    };
  }
}

report.status = outcome.status;
if (outcome.reason && !report.reason) report.reason = outcome.reason;
report.actions.push(outcome);
writeReport(report, resultPath);

function isBlockedFixError(error: JsonValue) {
  return /Codex produced no target repo changes|Codex \/review did not pass|Codex (?:fix worker|review-fix worker|\/review) timed out|Codex (?:fix worker|review-fix worker|\/review) failed|validation command failed|rebase (?:conflicts remain unresolved|produced additional conflicts)/i.test(
    String(error?.message ?? error),
  );
}

function shouldFallbackToReplacementAfterRepairError(error: JsonValue) {
  const message = String(error?.message ?? error);
  if (/validation command failed|Codex |no merge base/i.test(message)) return false;
  return /maintainer_can_modify=false|missing head repo\/ref|source PR #\d+ is (?:closed|merged)|permission denied|permission to [^\s]+ denied|remote rejected|could not push|repository not found|not found/i.test(
    message,
  );
}

function isExecutableFixAction(action: LooseRecord, promotedReplacement: JsonValue) {
  if (!FIX_ACTIONS.has(String(action.action ?? ""))) return false;
  if (action.status === "planned") return true;
  if (!promotedReplacement || action.status !== "blocked") return false;
  return ["fix_needed", "build_fix_artifact", "open_fix_pr"].includes(String(action.action ?? ""));
}

function executableReplacementFixArtifact(fixArtifact: LooseRecord, workerResult: JsonValue) {
  if (!shouldPromoteNeedsHumanReplacement(fixArtifact, workerResult)) return fixArtifact;
  return {
    ...fixArtifact,
    repair_strategy: "replace_uneditable_branch",
    branch_update_blockers: uniqueStrings([
      ...(fixArtifact.branch_update_blockers ?? []),
      "ClawSweeper policy: useful uneditable or unsafe source PRs are replaced with a narrow credited PR when fix execution is explicitly enabled.",
    ]),
    credit_notes: uniqueStrings([
      ...(fixArtifact.credit_notes ?? []),
      ...fixArtifact.source_prs.map(
        (source: JsonValue) => `Replacement preserves source PR credit: ${source}`,
      ),
    ]),
  };
}

function shouldPromoteNeedsHumanReplacement(fixArtifact: LooseRecord, workerResult: JsonValue) {
  if (!fixArtifact || typeof fixArtifact !== "object") return false;
  if (fixArtifact.repair_strategy !== "needs_human") return false;
  if (!Array.isArray(fixArtifact.source_prs) || fixArtifact.source_prs.length === 0) return false;
  if (
    !fixArtifact.source_prs.every(
      (source: JsonValue) => parsePullRequestUrl(source)?.repo === workerResult.repo,
    )
  )
    return false;

  const text = [
    fixArtifact.summary,
    fixArtifact.pr_body,
    ...(fixArtifact.branch_update_blockers ?? []),
    ...(fixArtifact.credit_notes ?? []),
    ...(workerResult.needs_human ?? []),
    ...(workerResult.actions ?? []).map(
      (action: JsonValue) => `${action.action ?? ""} ${action.status ?? ""} ${action.reason ?? ""}`,
    ),
  ].join("\n");
  const hasReplacementDecision =
    /replace(?:ment)?(?: PR| fix| path)?|open a replacement|cannot safely update/i.test(text);
  const hasUneditableOrUnsafeSource =
    /maintainer_can_modify\s*=\s*false|uneditable|cannot safely update|branch is unsafe|draft|mergeability unknown|checks? (?:are )?(?:skipped|failing)/i.test(
      text,
    );
  const hasBlockedFixAction = (workerResult.actions ?? []).some(
    (action: JsonValue) =>
      ["fix_needed", "build_fix_artifact", "open_fix_pr"].includes(String(action.action ?? "")) &&
      action.status === "blocked",
  );
  return hasReplacementDecision && hasUneditableOrUnsafeSource && hasBlockedFixAction;
}

function executeRepairBranch({ fixArtifact, targetDir }: LooseRecord) {
  const baseBranch = String(process.env.CLAWSWEEPER_FIX_BASE_BRANCH ?? DEFAULT_BASE_BRANCH);
  const sourcePr = firstSourcePullRequest(fixArtifact);
  const pull = fetchPullRequest(result.repo, sourcePr.number);
  if (pull.state !== "open") throw new Error(`source PR #${sourcePr.number} is ${pull.state}`);
  if (!pull.head?.repo?.full_name || !pull.head?.ref)
    throw new Error(`source PR #${sourcePr.number} is missing head repo/ref`);
  const sameRepoBranch = pull.head.repo.full_name === result.repo;
  if (pull.maintainer_can_modify !== true && !sameRepoBranch) {
    throw new Error(`source PR #${sourcePr.number} has maintainer_can_modify=false`);
  }

  const branch = safeBranchName(
    `clawsweeper-repair/repair-${result.cluster_id}-${sourcePr.number}`,
  );
  run("git", ["fetch", "origin", `${baseBranch}:refs/remotes/origin/${baseBranch}`], {
    cwd: targetDir,
  });
  run(
    "git",
    ["fetch", `https://github.com/${pull.head.repo.full_name}.git`, `${pull.head.ref}:${branch}`],
    { cwd: targetDir },
  );
  run("git", ["checkout", branch], { cwd: targetDir });
  ensureMergeBaseAvailable({ targetDir, baseBranch });
  const sourceHead = currentHead(targetDir);
  prepareTargetToolchain(targetDir, targetValidationOptions);
  const rebaseResult = rebaseOntoBase({ targetDir, baseBranch });

  const prep = editValidatePrepareMerge({
    fixArtifact,
    targetDir,
    branch,
    mode: "repair",
    baseBranch,
    fallbackReason: null,
    sourceHead,
    rebaseResult,
  });
  (prep.merge_preflight as JsonValue).target = `#${sourcePr.number}`;
  const branchUpdate = branchUpdateState({ targetDir, sourceHead });
  if (dryRun) {
    return {
      action: "repair_contributor_branch",
      status: "planned",
      target: sourcePr.url,
      commit: prep.commit,
      branch_rewritten: branchUpdate.rewritten,
      merge_preflight: prep.merge_preflight,
    };
  }

  ghAuthSetupGit(targetDir);
  if (!sameRepoBranch) {
    assertRepairBranchWritable({ targetDir, pull, rewritten: branchUpdate.rewritten });
  }
  const pushArgs = repairBranchPushArgs({ pull, rewritten: branchUpdate.rewritten });
  run("git", pushArgs, { cwd: targetDir });
  const threadResolution = prepareReviewThreadsForMerge({
    repo: result.repo,
    number: sourcePr.number,
    targetDir,
    resolveThreads: resolveReviewThreads,
  });
  const statusCommentUpdated = updateAutomergeStatusCommentForBranchRepair({
    target: sourcePr.number,
    validationCommands: prep.merge_preflight.validation_commands,
    commit: prep.commit,
  });
  if (!statusCommentUpdated) {
    const comment = repairContributorBranchComment({
      sourcePrUrl: sourcePr.url,
      validationCommands: prep.merge_preflight.validation_commands,
      provenance: externalMessageProvenance({
        model,
        reasoning: codexReasoningEffort,
        reviewedSha: prep.commit,
      }),
    });
    run(
      "gh",
      ["pr", "comment", String(sourcePr.number), "--repo", result.repo, "--body", comment],
      {
        cwd: targetDir,
        env: ghEnv(),
      },
    );
  }
  return {
    action: "repair_contributor_branch",
    status: "pushed",
    target: sourcePr.url,
    head_repo: pull.head.repo.full_name,
    head_ref: pull.head.ref,
    branch_rewritten: branchUpdate.rewritten,
    commit: prep.commit,
    status_comment_updated: statusCommentUpdated,
    merge_preflight: prep.merge_preflight,
    review_threads: threadResolution,
  };
}

function branchUpdateState({ targetDir, sourceHead }: LooseRecord) {
  const rewritten =
    /^[0-9a-f]{40}$/i.test(String(sourceHead ?? "")) &&
    !isAncestor({ targetDir, ancestor: sourceHead, descendant: "HEAD" });
  return { rewritten };
}

function repairBranchPushArgs({ pull, rewritten }: LooseRecord) {
  const remote = `https://github.com/${pull.head.repo.full_name}.git`;
  if (!rewritten) return ["push", remote, `HEAD:${pull.head.ref}`];
  const headSha = String(pull.head?.sha ?? "");
  if (!/^[0-9a-f]{40}$/i.test(headSha)) {
    throw new Error(
      `cannot force-with-lease repair branch ${pull.head.ref}: source head sha is missing`,
    );
  }
  return [
    "push",
    `--force-with-lease=refs/heads/${pull.head.ref}:${headSha}`,
    remote,
    `HEAD:${pull.head.ref}`,
  ];
}

function assertRepairBranchWritable({ targetDir, pull, rewritten }: LooseRecord) {
  const args = repairBranchPushArgs({ pull, rewritten });
  run("git", ["push", "--dry-run", ...args.slice(1)], { cwd: targetDir });
}

function prepareFallbackReplacementCheckout(sourceTargetDir: string) {
  const fallbackTargetDir = path.join(
    workRoot,
    `${path.basename(sourceTargetDir)}-replacement-${Date.now()}`,
  );
  ensureTargetCheckout(result.repo, fallbackTargetDir);
  setupGitIdentity(fallbackTargetDir);
  return fallbackTargetDir;
}

function executeReplacementBranch({
  fixArtifact,
  targetDir,
  supersedeSources,
  fallbackReason,
}: LooseRecord) {
  const baseBranch = String(process.env.CLAWSWEEPER_FIX_BASE_BRANCH ?? DEFAULT_BASE_BRANCH);
  const contributorCredits = sourceContributorCredits({
    fixArtifact,
    targetDir,
    repo: result.repo,
  });
  const branch = replacementBranchName(result.cluster_id);
  const areaCapacityBlock = validateActivePrAreaCapacity({
    fixArtifact,
    targetDir,
    branch,
    repo: result.repo,
    maxActivePrsPerArea,
  });
  if (areaCapacityBlock) {
    return {
      action: "open_fix_pr",
      status: "blocked",
      branch,
      repair_strategy: fixArtifact.repair_strategy,
      ...areaCapacityBlock,
    };
  }
  run("git", ["fetch", "origin", baseBranch], { cwd: targetDir });
  const branchState = checkoutRecoverableReplacementBranch({
    targetDir,
    branch,
    baseBranch,
    fixArtifact,
  });
  prepareTargetToolchain(targetDir, targetValidationOptions);
  const rebaseResult = rebaseOntoBase({ targetDir, baseBranch });

  if (!dryRun) ghAuthSetupGit(targetDir);
  const prep = editValidatePrepareMerge({
    fixArtifact,
    targetDir,
    branch,
    mode: "replacement",
    fallbackReason,
    baseBranch,
    contributorCredits,
    allowExistingChanges: branchState.resumed && branchHasBaseDiff({ targetDir, baseBranch }),
    reconcileWithBase: branchState.resumed,
    pushCheckpoint: dryRun ? null : () => pushRecoverableBranch({ targetDir, branch }),
    rebaseResult,
  });
  const provenance = externalMessageProvenance({
    model,
    reasoning: codexReasoningEffort,
    reviewedSha: prep.commit,
  });
  const body = replacementPrBody({
    fixArtifact,
    fallbackReason,
    clusterId: result.cluster_id,
    provenance,
  });
  if (dryRun) {
    return {
      action: "open_fix_pr",
      status: "planned",
      branch,
      resumed_branch: branchState.resumed,
      commit: prep.commit,
      checkpoint_commits: prep.checkpoint_commits,
      merge_preflight: prep.merge_preflight,
      supersede_sources: supersedeSources ? (fixArtifact.source_prs ?? []) : [],
      contributor_credit: contributorCredits.map(publicContributorCredit),
    };
  }

  pushRecoverableBranch({ targetDir, branch });
  const bodyPath = path.join(workRoot, "replacement-pr-body.md");
  fs.writeFileSync(bodyPath, body);
  const prUrl =
    findOpenPullRequestForBranch(branch, targetDir) ||
    run(
      "gh",
      [
        "pr",
        "create",
        "--repo",
        result.repo,
        "--base",
        baseBranch,
        "--head",
        branch,
        "--title",
        fixArtifact.pr_title,
        "--body-file",
        bodyPath,
      ],
      { cwd: targetDir, env: ghEnv() },
    ).trim();
  const prNumber = pullRequestNumberFromUrl(prUrl);
  if (prNumber) ensurePullRequestOpen({ number: prNumber, targetDir });
  if (prNumber) labelReplacementPullRequest({ number: prNumber, targetDir, fixArtifact });
  if (prNumber) (prep.merge_preflight as JsonValue).target = `#${prNumber}`;
  const threadResolution = prNumber
    ? prepareReviewThreadsForMerge({
        repo: result.repo,
        number: prNumber,
        targetDir,
        resolveThreads: resolveReviewThreads,
      })
    : { status: "blocked", reason: "replacement PR URL did not include a PR number" };

  const supersededSources = supersedeSources
    ? supersededReplacementSources({ fixArtifact, repo: result.repo }).filter(
        (source: JsonValue) => pullRequestNumberFromUrl(source) !== prNumber,
      )
    : [];
  const supersededSourceActions: JsonValue[] = [];
  if (supersededSources.length > 0) {
    for (const source of supersededSources) {
      const parsed = parsePullRequestUrl(source);
      if (!parsed || parsed.repo !== result.repo) continue;
      supersededSourceActions.push(
        closeSupersededSourcePrs
          ? closeSupersededSourcePr({
              source,
              parsed,
              replacementPrUrl: prUrl,
              targetDir,
              contributorCredits,
              provenance,
            })
          : linkReplacementSourcePr({
              source,
              parsed,
              replacementPrUrl: prUrl,
              targetDir,
              provenance,
            }),
      );
    }
  }

  return {
    action: "open_fix_pr",
    status: "opened",
    pr_url: prUrl,
    branch,
    resumed_branch: branchState.resumed,
    commit: prep.commit,
    checkpoint_commits: prep.checkpoint_commits,
    merge_preflight: prep.merge_preflight,
    review_threads: threadResolution,
    superseded_sources: supersededSources,
    superseded_source_actions: supersededSourceActions,
    contributor_credit: contributorCredits.map(publicContributorCredit),
  };
}

function labelReplacementPullRequest({ number, targetDir, fixArtifact }: LooseRecord) {
  ensureLabel(
    result.repo,
    CLAWSWEEPER_LABEL,
    CLAWSWEEPER_LABEL_COLOR,
    CLAWSWEEPER_LABEL_DESCRIPTION,
    targetDir,
  );
  for (const label of replacementSourceLabels({ fixArtifact, targetDir })) {
    addLabel(result.repo, number, label, targetDir);
  }
  if (job.frontmatter.source === "clawsweeper_commit" || job.frontmatter.commit_sha) {
    ensureLabel(
      result.repo,
      COMMIT_FINDING_LABEL,
      COMMIT_FINDING_LABEL_COLOR,
      COMMIT_FINDING_LABEL_DESCRIPTION,
      targetDir,
    );
    addLabel(result.repo, number, COMMIT_FINDING_LABEL, targetDir);
  }
}

function replacementSourceLabels({ fixArtifact, targetDir }: LooseRecord) {
  const sourceLabelSets = replacementSourceLabelSets({ fixArtifact, targetDir });
  return replacementLabelsToCopy(sourceLabelSets, [CLAWSWEEPER_LABEL]);
}

function replacementSourceLabelSets({ fixArtifact, targetDir }: LooseRecord) {
  const sourceLabelSets: string[][] = [];
  for (const source of fixArtifact.source_prs ?? []) {
    const parsed = parsePullRequestUrl(source);
    if (!parsed || parsed.repo !== result.repo) continue;
    sourceLabelSets.push(sourcePullRequestLabels({ number: parsed.number, targetDir }));
  }
  return sourceLabelSets;
}

function sourcePullRequestLabels({ number, targetDir }: LooseRecord) {
  const view = JSON.parse(
    run("gh", ["pr", "view", String(number), "--repo", result.repo, "--json", "labels"], {
      cwd: targetDir,
      env: ghEnv(),
    }),
  );
  return (view.labels ?? [])
    .map((label: JsonValue) => String(label?.name ?? label ?? "").trim())
    .filter(Boolean);
}

function ensureLabel(
  repo: string,
  name: string,
  color: JsonValue,
  description: JsonValue,
  targetDir: string,
) {
  try {
    run(
      "gh",
      ["label", "create", name, "--repo", repo, "--color", color, "--description", description],
      {
        cwd: targetDir,
        env: ghEnv(),
      },
    );
  } catch (error) {
    if (!/already exists/i.test(String(error?.message ?? error))) throw error;
  }
}

function addLabel(repo: string, number: JsonValue, name: string, targetDir: string) {
  run("gh", ["issue", "edit", String(number), "--repo", repo, "--add-label", name], {
    cwd: targetDir,
    env: ghEnv(),
  });
}

function linkReplacementSourcePr({
  source,
  parsed,
  replacementPrUrl,
  targetDir,
  provenance,
}: LooseRecord) {
  const base = { source, pr: `#${parsed.number}`, action: "link_replacement_source" };
  const view = fetchSourcePullRequestView({ repo: result.repo, number: parsed.number, targetDir });
  if (view.mergedAt || view.state === "MERGED") {
    return {
      ...base,
      status: "skipped",
      reason: "already merged",
      merged_at: view.mergedAt ?? null,
    };
  }
  if (view.state === "CLOSED") {
    return { ...base, status: "skipped", reason: "already closed" };
  }

  const comment = replacementSourceLinkComment({
    replacementPrUrl,
    sourcePrUrl: source,
    provenance,
  });
  run("gh", ["pr", "comment", String(parsed.number), "--repo", result.repo, "--body", comment], {
    cwd: targetDir,
    env: ghEnv(),
  });
  return { ...base, status: "executed", reason: "linked replacement PR without closing source PR" };
}

function closeSupersededSourcePr({
  source,
  parsed,
  replacementPrUrl,
  targetDir,
  contributorCredits,
  provenance,
}: LooseRecord) {
  const base = { source, pr: `#${parsed.number}`, action: "close_superseded_source" };
  const view = fetchSourcePullRequestView({ repo: result.repo, number: parsed.number, targetDir });
  if (view.mergedAt || view.state === "MERGED") {
    return {
      ...base,
      status: "skipped",
      reason: "already merged",
      merged_at: view.mergedAt ?? null,
    };
  }
  if (view.state === "CLOSED") {
    return { ...base, status: "skipped", reason: "already closed" };
  }

  const comment = replacementSourceCloseComment({
    replacementPrUrl,
    sourcePrUrl: source,
    provenance,
  });
  run("gh", ["pr", "comment", String(parsed.number), "--repo", result.repo, "--body", comment], {
    cwd: targetDir,
    env: ghEnv(),
  });

  try {
    run("gh", ["pr", "close", String(parsed.number), "--repo", result.repo], {
      cwd: targetDir,
      env: ghEnv(),
    });
    return {
      ...base,
      status: "executed",
      reason: "closed in favor of credited replacement PR",
      replacement_pr: replacementPrUrl,
      contributor_credit: contributorCredits.map(publicContributorCredit),
    };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    if (/already merged|can't be closed because it was already merged/i.test(detail)) {
      return { ...base, status: "skipped", reason: "already merged during close" };
    }
    throw error;
  }
}

function ensurePullRequestOpen({ number, targetDir }: LooseRecord) {
  const view = fetchSourcePullRequestView({ repo: result.repo, number, targetDir });
  if (view.mergedAt || view.state === "MERGED") {
    throw new Error(`replacement PR #${number} is already merged`);
  }
  if (view.state === "CLOSED") {
    run("gh", ["pr", "reopen", String(number), "--repo", result.repo], {
      cwd: targetDir,
      env: ghEnv(),
    });
  }
}

function editValidatePrepareMerge({
  fixArtifact,
  targetDir,
  branch,
  mode,
  fallbackReason,
  baseBranch = DEFAULT_BASE_BRANCH,
  contributorCredits = [],
  allowExistingChanges = false,
  reconcileWithBase = false,
  pushCheckpoint = null,
  sourceHead = null,
  rebaseResult = null,
}: LooseRecord) {
  let producedChanges = allowExistingChanges;
  let previousSummary = "";
  const checkpointCommits: JsonValue[] = [];
  if (!producedChanges && !reconcileWithBase) {
    const mechanicalFix = applyMechanicalChangelogFix({ fixArtifact, targetDir });
    producedChanges = mechanicalFix?.status === "applied";
  }
  const repositoryContext = buildRepositoryContext({ fixArtifact, targetDir });
  const shouldRunCodexEdit = !producedChanges || reconcileWithBase;
  const repairDeltaBaseHead =
    rebaseResult?.status === "conflicts" ? sourceHead : currentHead(targetDir);
  if (shouldRunCodexEdit) {
    for (let attempt = 1; attempt <= maxEditAttempts; attempt += 1) {
      const headBeforeAttempt = currentHead(targetDir);
      const prompt = buildFixPrompt({
        fixArtifact,
        branch,
        mode,
        fallbackReason,
        attempt,
        previousNoDiff: attempt > 1,
        previousSummary,
        repositoryContext,
        reconcileWithBase,
        sourceHead,
        rebaseResult,
        maxEditAttempts,
      });
      const summaryPath = path.join(workRoot, `${mode}-codex-summary-${attempt}.md`);
      const codexResult = spawnSync(
        "codex",
        [
          "exec",
          "--cd",
          targetDir,
          "--model",
          model,
          "--sandbox",
          codexWriteSandbox,
          ...codexWriteSandboxConfigArgs(),
          ...codexConfigArgs(),
          "--output-last-message",
          summaryPath,
          "--ephemeral",
          "--json",
          "-",
        ],
        {
          cwd: targetDir,
          input: prompt,
          encoding: "utf8",
          env: codexEnv(),
          timeout: codexTimeoutMs,
          maxBuffer: codexStdioMaxBuffer,
        },
      );
      fs.writeFileSync(
        path.join(workRoot, `${mode}-codex-${attempt}.jsonl`),
        codexResult.stdout ?? "",
      );
      if (codexResult.stderr)
        fs.writeFileSync(
          path.join(workRoot, `${mode}-codex-${attempt}.stderr.log`),
          codexResult.stderr,
        );
      if ((codexResult.error as JsonValue)?.code === "ETIMEDOUT") {
        throw new Error(`Codex fix worker timed out after ${codexTimeoutMs}ms`);
      }
      if (codexResult.error) {
        throw new Error(codexResult.error.message || String(codexResult.error));
      }
      if (codexResult.status !== 0) {
        throw new Error(codexResult.stderr || codexResult.stdout || "Codex fix worker failed");
      }

      const hasWorkingTreeChanges = Boolean(
        run("git", ["status", "--porcelain"], { cwd: targetDir }).trim(),
      );
      const hasHeadChanges = currentHead(targetDir) !== headBeforeAttempt;
      producedChanges = producedChanges || hasWorkingTreeChanges || hasHeadChanges;
      if (producedChanges) break;
      previousSummary = readTextIfExists(summaryPath).trim();
    }
  }
  if (!producedChanges) {
    const suffix = previousSummary
      ? ` Last Codex summary: ${compactText(previousSummary, 360)}`
      : "";
    throw new Error(
      `Codex produced no target repo changes after ${maxEditAttempts} edit attempt(s).${suffix}`,
    );
  }

  const completedRebase = completeRebaseIfResolved({ targetDir });
  if (completedRebase.status === "continued") producedChanges = true;

  const firstCheckpoint = commitCheckpointIfNeeded({
    targetDir,
    message: fixArtifact.pr_title,
    trailers: mode === "replacement" ? coAuthorTrailers(contributorCredits) : [],
  });
  if (firstCheckpoint) {
    checkpointCommits.push(firstCheckpoint);
    pushCheckpoint?.();
  }

  let codexReview = null;
  const maxFinalBaseSyncAttempts = Math.max(
    1,
    Number(process.env.CLAWSWEEPER_FINAL_BASE_SYNC_ATTEMPTS ?? 4),
  );
  for (let attempt = 1; attempt <= maxFinalBaseSyncAttempts; attempt += 1) {
    codexReview = validateAndReviewLoop({
      fixArtifact,
      targetDir,
      mode,
      baseBranch,
      sourceHead: repairDeltaBaseHead,
      onReviewFix: (reviewAttempt: JsonValue) => {
        const checkpoint = commitCheckpointIfNeeded({
          targetDir,
          message: `fix(clawsweeper): address review for ${result.cluster_id} (${reviewAttempt})`,
          trailers: mode === "replacement" ? coAuthorTrailers(contributorCredits) : [],
        });
        if (checkpoint) {
          checkpointCommits.push(checkpoint);
          pushCheckpoint?.();
        }
      },
    });
    const sync = reconcileLatestBaseBeforePush({
      fixArtifact,
      targetDir,
      branch,
      mode,
      baseBranch,
      contributorCredits,
      attempt,
      repositoryContext,
      sourceHead,
    });
    if (sync.status === "already-current") break;
    const checkpoint = commitCheckpointIfNeeded({
      targetDir,
      message: `fix(clawsweeper): reconcile ${result.cluster_id} with main (${attempt})`,
      trailers: mode === "replacement" ? coAuthorTrailers(contributorCredits) : [],
    });
    if (checkpoint) {
      checkpointCommits.push(checkpoint);
      pushCheckpoint?.();
    }
    if (attempt === maxFinalBaseSyncAttempts) {
      codexReview.final_base_sync = {
        status: "accepted_after_final_sync",
        reason:
          "origin/main moved during final validation; pushed the branch after the last successful final-base sync and left review/CI/automerge to gate the exact head",
        attempts: maxFinalBaseSyncAttempts,
        sync,
      };
      break;
    }
  }
  const finalCheckpoint = commitCheckpointIfNeeded({
    targetDir,
    message: `fix(clawsweeper): finalize ${result.cluster_id}`,
    trailers: mode === "replacement" ? coAuthorTrailers(contributorCredits) : [],
  });
  if (finalCheckpoint) {
    checkpointCommits.push(finalCheckpoint);
    pushCheckpoint?.();
  }
  const commit = run("git", ["rev-parse", "HEAD"], { cwd: targetDir }).trim();
  return {
    commit,
    checkpoint_commits: checkpointCommits,
    merge_preflight: buildMergePreflight({ fixArtifact, codexReview }),
  };
}

function reconcileLatestBaseBeforePush({
  fixArtifact,
  targetDir,
  branch,
  mode,
  baseBranch,
  attempt,
  repositoryContext,
  sourceHead,
}: LooseRecord) {
  run("git", ["fetch", "origin", `${baseBranch}:refs/remotes/origin/${baseBranch}`], {
    cwd: targetDir,
  });
  const baseRef = `origin/${baseBranch}`;
  if (isAncestor({ targetDir, ancestor: baseRef, descendant: "HEAD" })) {
    return { status: "already-current" };
  }

  const rebaseResult = rebaseOntoBase({ targetDir, baseBranch });
  if (rebaseResult.status !== "conflicts") return rebaseResult;

  runCodexBaseReconcile({
    fixArtifact,
    targetDir,
    branch,
    mode,
    baseBranch,
    attempt,
    repositoryContext,
    sourceHead,
    rebaseResult,
  });
  const completed = completeRebaseIfResolved({ targetDir });
  return {
    status: "codex-reconciled",
    rebase_result: rebaseResult,
    completed_rebase: completed,
  };
}

function runCodexBaseReconcile({
  fixArtifact,
  targetDir,
  branch,
  mode,
  attempt,
  repositoryContext,
  sourceHead,
  rebaseResult,
}: LooseRecord) {
  let previousSummary = "";
  for (let codexAttempt = 1; codexAttempt <= maxEditAttempts; codexAttempt += 1) {
    const prompt = buildFixPrompt({
      fixArtifact,
      branch,
      mode,
      fallbackReason:
        "origin/main advanced after validation. Resolve this final rebase so the branch is mergeable on current main, then leave the checkout in a normal non-rebasing state.",
      attempt: codexAttempt,
      previousNoDiff: codexAttempt > 1,
      previousSummary,
      repositoryContext,
      reconcileWithBase: true,
      sourceHead,
      rebaseResult,
      maxEditAttempts,
    });
    const summaryPath = path.join(
      workRoot,
      `${mode}-final-base-reconcile-summary-${attempt}-${codexAttempt}.md`,
    );
    const codexResult = spawnSync(
      "codex",
      [
        "exec",
        "--cd",
        targetDir,
        "--model",
        model,
        "--sandbox",
        codexWriteSandbox,
        ...codexWriteSandboxConfigArgs(),
        ...codexConfigArgs(),
        "--output-last-message",
        summaryPath,
        "--ephemeral",
        "--json",
        "-",
      ],
      {
        cwd: targetDir,
        input: prompt,
        encoding: "utf8",
        env: codexEnv(),
        timeout: codexTimeoutMs,
        maxBuffer: codexStdioMaxBuffer,
      },
    );
    fs.writeFileSync(
      path.join(workRoot, `${mode}-final-base-reconcile-${attempt}-${codexAttempt}.jsonl`),
      codexResult.stdout ?? "",
    );
    if (codexResult.stderr)
      fs.writeFileSync(
        path.join(workRoot, `${mode}-final-base-reconcile-${attempt}-${codexAttempt}.stderr.log`),
        codexResult.stderr,
      );
    if ((codexResult.error as JsonValue)?.code === "ETIMEDOUT") {
      throw new Error(`Codex final rebase worker timed out after ${codexTimeoutMs}ms`);
    }
    if (codexResult.error) {
      throw new Error(codexResult.error.message || String(codexResult.error));
    }
    if (codexResult.status !== 0) {
      throw new Error(
        codexResult.stderr || codexResult.stdout || "Codex final rebase worker failed",
      );
    }
    try {
      completeRebaseIfResolved({ targetDir });
      return;
    } catch (error) {
      if (codexAttempt === maxEditAttempts) throw error;
      previousSummary = readTextIfExists(summaryPath).trim();
    }
  }
  throw new Error(`Codex did not finish final rebase after ${maxEditAttempts} attempt(s)`);
}

function readTextIfExists(filePath: string) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function runCodexWritePreflight() {
  if (skipCodexWritePreflight) {
    return {
      status: "skipped",
      reason: "CLAWSWEEPER_SKIP_CODEX_WRITE_PREFLIGHT=1",
      sandbox: codexWriteSandbox,
    };
  }

  const smokeDir = fs.mkdtempSync(path.join(workRoot, "codex-write-preflight-"));
  const summaryPath = path.join(workRoot, "codex-write-preflight-summary.md");
  const expectedPath = path.join(smokeDir, "preflight.txt");
  const prompt = [
    "You are running a ClawSweeper Repair Codex write preflight.",
    "",
    "Create or overwrite `preflight.txt` in the current directory with exactly:",
    "",
    "ok",
    "",
    "Do not inspect environment variables, credentials, tokens, or secrets.",
    "Do not call gh, git push, open PRs, or mutate anything outside the current directory.",
  ].join("\n");
  const child = spawnSync(
    "codex",
    [
      "exec",
      "--cd",
      smokeDir,
      "--model",
      model,
      "--sandbox",
      codexWriteSandbox,
      ...codexWriteSandboxConfigArgs(),
      ...codexConfigArgs(),
      "--output-last-message",
      summaryPath,
      "--ephemeral",
      "--json",
      "--skip-git-repo-check",
      "-",
    ],
    {
      cwd: smokeDir,
      input: prompt,
      encoding: "utf8",
      env: codexEnv(),
      timeout: codexPreflightTimeoutMs,
      maxBuffer: 16 * 1024 * 1024,
    },
  );
  fs.writeFileSync(path.join(workRoot, "codex-write-preflight.jsonl"), child.stdout ?? "");
  if (child.stderr)
    fs.writeFileSync(path.join(workRoot, "codex-write-preflight.stderr.log"), child.stderr);

  if ((child.error as JsonValue)?.code === "ETIMEDOUT") {
    return blockedCodexWritePreflight(
      `Codex write preflight timed out after ${codexPreflightTimeoutMs}ms`,
      child.stderr || child.stdout,
    );
  }
  if (child.status !== 0) {
    return blockedCodexWritePreflight("Codex write preflight failed", child.stderr || child.stdout);
  }
  const written = readTextIfExists(expectedPath).trim();
  if (written !== "ok") {
    return blockedCodexWritePreflight(
      "Codex write preflight did not create the expected file",
      readTextIfExists(summaryPath) || child.stderr || child.stdout,
    );
  }
  return {
    status: "passed",
    sandbox: codexWriteSandbox,
    timeout_ms: codexPreflightTimeoutMs,
    evidence: [`Codex wrote ${path.basename(expectedPath)} in an isolated preflight directory.`],
  };
}

function blockedCodexWritePreflight(reason: string, detail: string) {
  const failureClass = classifyCodexFailure(detail);
  return {
    status: "blocked",
    reason: `${reason}: ${compactText(detail || "no Codex output", 900)}`,
    failure_class: failureClass,
    sandbox: codexWriteSandbox,
    timeout_ms: codexPreflightTimeoutMs,
    evidence: [`Codex write preflight failed before target repo mutation; class=${failureClass}`],
  };
}

function classifyCodexFailure(detail: string) {
  const text = String(detail ?? "");
  if (
    /bwrap|loopback|uid map|sandbox wrapper|sandbox startup|operation not permitted/i.test(text)
  ) {
    return "sandbox_unavailable";
  }
  if (/auth|login|api key|401|403|unauthorized|forbidden/i.test(text)) {
    return "auth_unavailable";
  }
  return "codex_unavailable";
}

function codexWriteSandboxConfigArgs() {
  return codexWorkspaceSandboxConfigArgs(codexWriteSandbox, codexWriteNetworkAccess);
}

function codexReviewSandboxConfigArgs() {
  return codexWorkspaceSandboxConfigArgs(codexReviewSandbox, codexReviewNetworkAccess);
}

function codexConfigArgs() {
  const configs = [
    'approval_policy="never"',
    `model_reasoning_effort=${JSON.stringify(codexReasoningEffort)}`,
  ];
  if (codexServiceTier) configs.push(`service_tier=${JSON.stringify(codexServiceTier)}`);
  return configs.flatMap((config: JsonValue) => ["-c", config]);
}

function codexWorkspaceSandboxConfigArgs(sandbox: string, networkAccess: string) {
  if (sandbox !== "workspace-write") return [];
  return ["-c", `sandbox_workspace_write.network_access=${networkAccess ? "true" : "false"}`];
}

function parseBooleanEnv(value: JsonValue, fallback: JsonValue) {
  if (value == null || value === "") return fallback;
  if (/^(1|true|yes|on)$/i.test(String(value))) return true;
  if (/^(0|false|no|off)$/i.test(String(value))) return false;
  return fallback;
}

function validateAndReviewLoop({
  fixArtifact,
  targetDir,
  mode,
  baseBranch = DEFAULT_BASE_BRANCH,
  onReviewFix = null,
  sourceHead = null,
}: LooseRecord) {
  let lastReview = null;
  let validationCommands: LooseRecord[] = [];
  for (let attempt = 1; attempt <= maxReviewAttempts; attempt += 1) {
    const validationPlan = repairDeltaValidationPlan(
      { fixArtifact, targetDir, sourceHead },
      targetValidationOptions,
    );
    validationCommands = runAllowedValidationCommands(
      validationPlan.commands,
      targetDir,
      validationPlan.options,
      baseBranch,
    );
    runDiffCheck({ targetDir, baseBranch });
    try {
      lastReview = runCodexReview({
        fixArtifact,
        targetDir,
        mode,
        attempt,
        baseBranch,
        validationCommands,
        validationPlan,
      });
    } catch (error) {
      if (attempt < maxReviewAttempts && isRetryableCodexReviewError(error)) {
        lastReview = {
          status: "retrying",
          summary: String(error?.message ?? error),
          findings: [],
          findings_addressed: false,
          evidence: [],
          validation_commands_run: validationCommands,
        };
        continue;
      }
      throw error;
    }
    lastReview.validation_commands_run = validationCommands;
    if (isCleanCodexReview(lastReview)) return lastReview;
    if (attempt === maxReviewAttempts) break;
    runCodexReviewFix({ fixArtifact, targetDir, mode, review: lastReview, attempt });
    onReviewFix?.(attempt);
  }
  const summary =
    lastReview?.summary ??
    (Array.isArray(lastReview?.findings)
      ? lastReview.findings.map((finding: JsonValue) => finding.summary ?? finding).join("; ")
      : "unknown");
  throw new Error(`Codex /review did not pass after ${maxReviewAttempts} attempt(s): ${summary}`);
}

function isRetryableCodexReviewError(error: JsonValue) {
  return /structured output was not written|invalid structured output/i.test(
    String(error?.message ?? error),
  );
}

function runDiffCheck({ targetDir, baseBranch }: LooseRecord) {
  ensureMergeBaseAvailable({ targetDir, baseBranch });
  run("git", ["diff", "--check", `origin/${baseBranch}...HEAD`], { cwd: targetDir });
  run("git", ["diff", "--check"], { cwd: targetDir });
}

function runCodexReview({
  fixArtifact,
  targetDir,
  mode,
  attempt,
  baseBranch = DEFAULT_BASE_BRANCH,
  validationCommands = [],
  validationPlan = null,
}: LooseRecord) {
  const outputPath = path.join(workRoot, `${mode}-codex-review-${attempt}.json`);
  const schemaPath = codexReviewSchemaPath();
  const prompt = [
    "/review",
    "",
    `Review the current ClawSweeper Repair fix branch diff against origin/${baseBranch} before it can be merged.`,
    "",
    "Required checks:",
    "- security-sensitive issues are resolved or absent;",
    "- human PR/review comments from the artifact are addressed;",
    "- review-bot comments from Greptile, Codex, Asile, CodeRabbit, Copilot, and similar bots are addressed;",
    "- code is narrow, safe, and merge-ready;",
    "- validation commands are sufficient for the changed surface.",
    "",
    "Validation policy:",
    "- `pnpm check:changed` plus git diff checks is sufficient local proof for OpenClaw changed-surface fixes;",
    "- do not require full CI, full test suites, e2e/live/docker lanes, or unrelated flaky main checks to pass;",
    "- block only when the changed-lane proof fails or the current diff plausibly caused the failure.",
    "- repository policy overrides fix artifact credit wording: for openclaw/openclaw changelog entries, do not require or re-add forbidden `Thanks @codex`, `Thanks @openclaw`, or `Thanks @steipete` attribution; PR body/history/source links are acceptable credit for those source authors.",
    "",
    `Validation commands actually run: ${validationCommands.join("; ") || "none"}`,
    validationPlan
      ? `Validation scope: ${validationPlan.scope}; ${validationPlan.reason}; changed files: ${(validationPlan.changed_files ?? []).join(", ") || "none"}`
      : "",
    `Original artifact validation commands: ${(fixArtifact.validation_commands ?? []).join("; ")}`,
    "",
    "Return JSON only. If anything blocks merge, include actionable findings.",
    "",
    "Fix artifact:",
    "```json",
    JSON.stringify(fixArtifact, null, 2),
    "```",
  ].join("\n");
  const child = spawnSync(
    "codex",
    [
      "exec",
      "--cd",
      targetDir,
      "--model",
      model,
      "--sandbox",
      codexReviewSandbox,
      ...codexReviewSandboxConfigArgs(),
      ...codexConfigArgs(),
      "--output-schema",
      schemaPath,
      "--output-last-message",
      outputPath,
      "--ephemeral",
      "--json",
      "-",
    ],
    {
      cwd: targetDir,
      input: prompt,
      encoding: "utf8",
      env: codexEnv(),
      timeout: codexTimeoutMs,
      maxBuffer: codexStdioMaxBuffer,
    },
  );
  fs.writeFileSync(
    path.join(workRoot, `${mode}-codex-review-${attempt}.jsonl`),
    child.stdout ?? "",
  );
  if (child.stderr)
    fs.writeFileSync(
      path.join(workRoot, `${mode}-codex-review-${attempt}.stderr.log`),
      child.stderr,
    );
  if ((child.error as JsonValue)?.code === "ETIMEDOUT")
    throw new Error(`Codex /review timed out after ${codexTimeoutMs}ms`);
  if (child.error) throw new Error(child.error.message || String(child.error));
  if (child.status !== 0) throw new Error(child.stderr || child.stdout || "Codex /review failed");
  if (!fs.existsSync(outputPath)) {
    const fallbackReview = extractCodexReviewFromJsonl(child.stdout);
    if (fallbackReview) {
      fs.writeFileSync(outputPath, `${JSON.stringify(fallbackReview, null, 2)}\n`);
      return fallbackReview;
    }
    const stdout = compactText(child.stdout, 800);
    const stderr = compactText(child.stderr, 800);
    throw new Error(
      `Codex /review failed: structured output was not written to ${path.basename(outputPath)}; stdout=${stdout || "empty"}; stderr=${stderr || "empty"}`,
    );
  }
  try {
    return JSON.parse(fs.readFileSync(outputPath, "utf8"));
  } catch (error) {
    throw new Error(
      `Codex /review failed: invalid structured output in ${path.basename(outputPath)}: ${error.message}`,
    );
  }
}

function extractCodexReviewFromJsonl(stdout: JsonValue) {
  const candidates: LooseRecord[] = [];
  for (const line of String(stdout ?? "").split(/\r?\n/)) {
    if (!line.trim()) continue;
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      continue;
    }
    const text = event?.item?.type === "agent_message" ? event.item.text : undefined;
    if (typeof text === "string" && text.trim().startsWith("{")) candidates.push(text.trim());
  }
  for (const text of candidates.reverse()) {
    try {
      const parsed = JSON.parse(text);
      if (isCodexReview(parsed)) return parsed;
    } catch {
      // Keep scanning older candidate messages.
    }
  }
  return null;
}

function isCodexReview(value: JsonValue) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.status === "string" &&
    typeof value.summary === "string" &&
    Array.isArray(value.findings) &&
    typeof value.findings_addressed === "boolean" &&
    Array.isArray(value.evidence)
  );
}

function runCodexReviewFix({ fixArtifact, targetDir, mode, review, attempt }: LooseRecord) {
  const prompt = [
    "Address every actionable finding from Codex /review.",
    "",
    "Rules:",
    "- keep the patch narrow;",
    "- do not commit, push, open PRs, close PRs, or call gh;",
    "- rerun is handled by ClawSweeper after your edits;",
    "- if a finding is false-positive, adjust comments/tests only when that makes the proof clearer.",
    "",
    "Codex /review findings:",
    "```json",
    JSON.stringify(review, null, 2),
    "```",
    "",
    "Fix artifact:",
    "```json",
    JSON.stringify(fixArtifact, null, 2),
    "```",
  ].join("\n");
  const child = spawnSync(
    "codex",
    [
      "exec",
      "--cd",
      targetDir,
      "--model",
      model,
      "--sandbox",
      codexWriteSandbox,
      ...codexWriteSandboxConfigArgs(),
      ...codexConfigArgs(),
      "--output-last-message",
      path.join(workRoot, `${mode}-codex-review-fix-${attempt}.md`),
      "--ephemeral",
      "--json",
      "-",
    ],
    {
      cwd: targetDir,
      input: prompt,
      encoding: "utf8",
      env: codexEnv(),
      timeout: codexTimeoutMs,
      maxBuffer: codexStdioMaxBuffer,
    },
  );
  fs.writeFileSync(
    path.join(workRoot, `${mode}-codex-review-fix-${attempt}.jsonl`),
    child.stdout ?? "",
  );
  if (child.stderr)
    fs.writeFileSync(
      path.join(workRoot, `${mode}-codex-review-fix-${attempt}.stderr.log`),
      child.stderr,
    );
  if ((child.error as JsonValue)?.code === "ETIMEDOUT")
    throw new Error(`Codex review-fix worker timed out after ${codexTimeoutMs}ms`);
  if (child.error) throw new Error(child.error.message || String(child.error));
  if (child.status !== 0)
    throw new Error(child.stderr || child.stdout || "Codex review-fix worker failed");
}

function isCleanCodexReview(review: LooseRecord) {
  const status = String(review?.status ?? "").toLowerCase();
  const findings = Array.isArray(review?.findings) ? review.findings : [];
  return (
    ["passed", "clean"].includes(status) &&
    findings.length === 0 &&
    review?.findings_addressed === true
  );
}

function buildMergePreflight({ fixArtifact, codexReview }: LooseRecord) {
  const validationCommands = codexReview.validation_commands_run?.length
    ? codexReview.validation_commands_run
    : fixArtifact.validation_commands;
  return {
    target: null,
    security_status: "cleared",
    security_evidence: [
      "ClawSweeper Repair scoped security scan found no security-sensitive fix target, source PR, or fix artifact scope.",
    ],
    comments_status: "resolved",
    comments_evidence: [
      "Agentic fix pass addressed human PR/review comments named in the fix artifact.",
    ],
    bot_comments_status: "resolved",
    bot_comments_evidence: [
      "Agentic fix pass addressed Greptile/Codex/Asile/CodeRabbit/Copilot-style findings named in the fix artifact.",
    ],
    codex_review: {
      command: "/review",
      status: codexReview.status === "clean" ? "clean" : "passed",
      findings_addressed: true,
      evidence: codexReview.evidence?.length
        ? codexReview.evidence
        : [`Codex /review passed after agentic fix loop: ${codexReview.summary ?? "clean"}`],
    },
    validation_commands: validationCommands,
    final_base_sync: codexReview.final_base_sync ?? null,
  };
}

function codexReviewSchemaPath() {
  const schemaPath = path.join(workRoot, "codex-review.schema.json");
  if (fs.existsSync(schemaPath)) return schemaPath;
  fs.writeFileSync(
    schemaPath,
    `${JSON.stringify(
      {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        type: "object",
        required: ["status", "summary", "findings", "findings_addressed", "evidence"],
        additionalProperties: false,
        properties: {
          status: { type: "string", enum: ["passed", "clean", "failed", "blocked"] },
          summary: { type: "string" },
          findings: {
            type: "array",
            items: {
              type: "object",
              required: ["severity", "summary", "evidence"],
              additionalProperties: false,
              properties: {
                severity: { type: "string", enum: ["critical", "high", "medium", "low"] },
                summary: { type: "string" },
                evidence: { type: "string" },
              },
            },
          },
          findings_addressed: { type: "boolean" },
          evidence: { type: "array", items: { type: "string" } },
        },
      },
      null,
      2,
    )}\n`,
  );
  return schemaPath;
}

function ensureTargetCheckout(repo: string, targetDir: string) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(path.dirname(targetDir), { recursive: true });
    run("gh", ["repo", "clone", repo, targetDir, "--", "--depth=1"], {
      cwd: repoRoot(),
      env: ghEnv(),
    });
    return;
  }
  if (!fs.existsSync(path.join(targetDir, ".git"))) {
    throw new Error(`target dir is not a git checkout: ${targetDir}`);
  }
  const status = run("git", ["status", "--porcelain"], { cwd: targetDir }).trim();
  if (status) throw new Error(`target checkout has uncommitted changes: ${targetDir}`);
}

function setupGitIdentity(cwd: JsonValue) {
  run("git", ["config", "user.name", clawsweeperGitUserName()], { cwd });
  run("git", ["config", "user.email", clawsweeperGitUserEmail()], { cwd });
}

function firstSourcePullRequest(fixArtifact: LooseRecord) {
  for (const source of fixArtifact.source_prs ?? []) {
    const parsed = parsePullRequestUrl(source);
    if (parsed && parsed.repo === result.repo) return parsed;
  }
  throw new Error("fix_artifact.source_prs must include a source PR in the target repo");
}

function replacementBranchName(clusterId: string) {
  return safeBranchName(`clawsweeper/${clusterId}`);
}

function checkoutRecoverableReplacementBranch({
  targetDir,
  branch,
  baseBranch,
  fixArtifact,
}: LooseRecord) {
  const sourcePr = shouldSeedReplacementBranchFromSource(fixArtifact)
    ? firstTargetSourcePullRequest(fixArtifact.source_prs ?? [], result.repo)
    : null;
  if (remoteBranchExists({ targetDir, branch })) {
    run("git", ["fetch", "origin", `+refs/heads/${branch}:refs/remotes/origin/${branch}`], {
      cwd: targetDir,
    });
    run("git", ["checkout", "-B", branch, `origin/${branch}`], { cwd: targetDir });
    if (sourcePr) {
      const sourceRef = fetchSourcePullRequestHead({ targetDir, sourcePr });
      const sourceHeadSha = run("git", ["rev-parse", sourceRef], { cwd: targetDir }).trim();
      if (!isAncestor({ targetDir, ancestor: sourceHeadSha, descendant: "HEAD" })) {
        const pull = fetchPullRequest(result.repo, sourcePr.number);
        if (pull.state !== "open")
          throw new Error(`source PR #${sourcePr.number} is ${pull.state}`);
        const checkout = checkoutSourcePullRequestHead({
          targetDir,
          repo: result.repo,
          branch,
          sourcePr,
          pull,
        });
        return {
          resumed: false,
          replaced_stale_branch: true,
          branch,
          source_pr: checkout.sourcePr.url,
          source_head_sha: checkout.sourceHeadSha,
        };
      }
    }
    return { resumed: true, branch };
  }
  if (sourcePr) {
    const pull = fetchPullRequest(result.repo, sourcePr.number);
    if (pull.state !== "open") throw new Error(`source PR #${sourcePr.number} is ${pull.state}`);
    const checkout = checkoutSourcePullRequestHead({
      targetDir,
      repo: result.repo,
      branch,
      sourcePr,
      pull,
    });
    return {
      resumed: false,
      branch,
      source_pr: checkout.sourcePr.url,
      source_head_sha: checkout.sourceHeadSha,
    };
  }
  run("git", ["checkout", "-B", branch, `origin/${baseBranch}`], { cwd: targetDir });
  return { resumed: false, branch };
}

function commitCheckpointIfNeeded({ targetDir, message, trailers = [] }: LooseRecord) {
  if (!run("git", ["status", "--porcelain"], { cwd: targetDir }).trim()) return "";
  run("git", ["add", "--all"], { cwd: targetDir });
  const args = ["commit", "-m", message];
  for (const trailer of uniqueStrings(trailers)) args.push("-m", trailer);
  run("git", args, { cwd: targetDir });
  return run("git", ["rev-parse", "HEAD"], { cwd: targetDir }).trim();
}

function pushRecoverableBranch({ targetDir, branch }: LooseRecord) {
  const remoteSha = remoteBranchSha({ targetDir, branch });
  const targetRef = `refs/heads/${branch}`;
  const args = remoteSha
    ? ["push", `--force-with-lease=${targetRef}:${remoteSha}`, "origin", `HEAD:${targetRef}`]
    : ["push", "origin", `HEAD:${targetRef}`];
  run("git", args, { cwd: targetDir });
  if (fetchRemoteRecoverableBranch({ targetDir, branch, required: false })) return;
  throw new Error(`git push reported success, but refs/heads/${branch} was not visible on origin`);
}

function fetchRemoteRecoverableBranch({ targetDir, branch, required = true }: LooseRecord) {
  const child = spawnSync(
    "git",
    ["fetch", "origin", `+refs/heads/${branch}:refs/remotes/origin/${branch}`],
    {
      cwd: targetDir,
      env: process.env,
      encoding: "utf8",
    },
  );
  if (child.status === 0) return true;
  const detail = `${child.stderr ?? ""}\n${child.stdout ?? ""}`.trim();
  if (!required && /couldn't find remote ref|could not find remote ref|not found/i.test(detail))
    return false;
  throw new Error(detail || `failed to fetch remote branch ${branch}`);
}

function findOpenPullRequestForBranch(branch: string, cwd: JsonValue) {
  return run(
    "gh",
    [
      "pr",
      "list",
      "--repo",
      result.repo,
      "--head",
      branch,
      "--state",
      "open",
      "--json",
      "url",
      "--jq",
      '.[0].url // ""',
    ],
    { cwd, env: ghEnv() },
  ).trim();
}

function safeBranchName(value: JsonValue) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9/_-]+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function findLatestResultPath() {
  const runsRoot = path.join(repoRoot(), ".clawsweeper-repair", "runs");
  if (!fs.existsSync(runsRoot)) throw new Error("no run directory exists");
  const candidates: LooseRecord[] = [];
  for (const runName of fs.readdirSync(runsRoot)) {
    const candidate = path.join(runsRoot, runName, "result.json");
    if (fs.existsSync(candidate))
      candidates.push({ path: candidate, mtimeMs: fs.statSync(candidate).mtimeMs });
  }
  candidates.sort((left: JsonValue, right: JsonValue) => right.mtimeMs - left.mtimeMs);
  if (!candidates[0]) throw new Error("no result.json files found");
  return candidates[0].path;
}

function writeReport(report: LooseRecord, resultPath: string) {
  appendAutomergeRepairOutcomeComment(report, resultPath);
  const reportPath =
    typeof args.report === "string"
      ? path.resolve(args.report)
      : path.join(path.dirname(resultPath), "fix-execution-report.json");
  const debugDir = copyFixDebugArtifacts(path.dirname(reportPath));
  if (debugDir) {
    report.debug_artifacts = path.relative(repoRoot(), debugDir);
  }
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
}

function appendAutomergeRepairOutcomeComment(report: LooseRecord, resultPath: string) {
  if (!isAutomergeRepairJob()) return;
  if (!job.frontmatter.allowed_actions.includes("comment")) return;
  if (
    report.actions?.some(
      (action: JsonValue) => action.action === "automerge_repair_outcome_comment",
    )
  )
    return;
  if (hasSuccessfulFixMutation(report)) return;

  const target = automergeOutcomeTargetPrNumber();
  const base = {
    action: "automerge_repair_outcome_comment",
    target: target ? `#${target}` : null,
  };
  if (!target) {
    report.actions.push({ ...base, status: "skipped", reason: "missing automerge target PR" });
    return;
  }

  const marker = automergeOutcomeMarker({ target, resultPath });
  if (dryRun) {
    report.actions.push({ ...base, status: "planned", marker });
    return;
  }
  if (issueHasCommentMarker(target, marker)) {
    report.actions.push({
      ...base,
      status: "skipped",
      reason: "matching outcome comment already exists",
      marker,
    });
    return;
  }

  const body = automergeRepairOutcomeComment({
    marker,
    result,
    report,
    target,
    provenance: externalMessageProvenance({
      model,
      reasoning: codexReasoningEffort,
      reviewedSha: automergeOutcomeReviewedSha(),
    }),
  });
  const existingStatus = findAutomergeStatusComment(target);
  const bodyWithTimeline = mergeAutomergeTimelineSection({
    body,
    existingBody: existingStatus?.body,
    events: [
      {
        id: `repair-completed:${currentActionsRunId() || path.basename(path.dirname(resultPath))}`,
        label: "repair completed",
        at: scriptStartedAt.toISOString(),
        completedAt: new Date().toISOString(),
        durationMs: Date.now() - scriptStartedAt.getTime(),
        runUrl: currentActionsRunUrl(),
        headSha: automergeOutcomeReviewedSha(),
        status: "no branch change",
        details: report?.reason ?? "no executable fix action",
      },
    ],
  });
  if (existingStatus?.id) {
    patchIssueComment(
      existingStatus.id,
      preserveStatusMarkers(existingStatus.body, bodyWithTimeline),
    );
  } else {
    postIssueComment(target, bodyWithTimeline);
  }
  report.actions.push({
    ...base,
    status: existingStatus?.id ? "updated" : "executed",
    marker,
    comment_id: existingStatus?.id ? String(existingStatus.id) : null,
    commented_at: new Date().toISOString(),
  });
}

function updateAutomergeStatusCommentForBranchRepair({
  target,
  validationCommands,
  commit,
}: LooseRecord) {
  if (!isAutomergeRepairJob()) return false;
  if (Number(target) !== Number(automergeOutcomeTargetPrNumber())) return false;
  const existingStatus = findAutomergeStatusComment(target);
  const runUrl = currentActionsRunUrl();
  const body = [
    "🦞🦞",
    "ClawSweeper applied a repair to this PR branch.",
    "",
    "Repair: kept the fix on this contributor branch instead of opening a replacement PR.",
    `Validation: \`${listOrNone(validationCommands)}\``,
    `Updated head: \`${commit}\``,
    ...(runUrl ? [`Run: ${runUrl}`] : []),
    "",
    "Current state: waiting for GitHub checks on the repaired head before automerge can continue.",
  ].join("\n");
  const bodyWithTimeline = mergeAutomergeTimelineSection({
    body,
    existingBody: existingStatus?.body,
    events: [
      {
        id: `repair-completed:${currentActionsRunId() || commit}`,
        label: "repair completed",
        at: scriptStartedAt.toISOString(),
        completedAt: new Date().toISOString(),
        durationMs: Date.now() - scriptStartedAt.getTime(),
        runUrl,
        headSha: commit,
        status: "branch updated",
      },
    ],
  });
  if (existingStatus?.id) {
    patchIssueComment(
      existingStatus.id,
      preserveStatusMarkers(existingStatus.body, bodyWithTimeline),
    );
  } else {
    postIssueComment(target, bodyWithTimeline);
  }
  return true;
}

function isAutomergeRepairJob() {
  return (
    job.frontmatter.source === "pr_automerge" ||
    String(result.cluster_id ?? "").startsWith("automerge-")
  );
}

function hasSuccessfulFixMutation(report: LooseRecord) {
  return (report.actions ?? []).some((action: JsonValue) => {
    const name = String(action.action ?? "");
    const status = String(action.status ?? "");
    return (
      (name === "repair_contributor_branch" && ["planned", "pushed"].includes(status)) ||
      (name === "open_fix_pr" && ["planned", "opened"].includes(status))
    );
  });
}

function automergeOutcomeTargetPrNumber() {
  const canonicalPr = parsePullRequestUrl(result.canonical_pr);
  if (canonicalPr && canonicalPr.repo === result.repo) return canonicalPr.number;
  for (const source of result.fix_artifact?.source_prs ?? []) {
    const parsed = parsePullRequestUrl(source);
    if (parsed && parsed.repo === result.repo) return parsed.number;
  }
  for (const ref of job.frontmatter.canonical ?? []) {
    const match = String(ref).match(/^#(\d+)$/);
    if (match) return Number(match[1]);
  }
  const clusterMatch = String(result.cluster_id ?? "").match(/-(\d+)$/);
  return clusterMatch ? Number(clusterMatch[1]) : 0;
}

function automergeOutcomeReviewedSha() {
  return (
    result.reviewed_sha ??
    result.head_sha ??
    result.canonical?.pull_request?.head_sha ??
    result.canonical_item?.pull_request?.head_sha ??
    null
  );
}

function automergeOutcomeMarker({ target, resultPath }: LooseRecord) {
  const runName = path.basename(path.dirname(resultPath)).replace(/[^A-Za-z0-9_.-]+/g, "-");
  return `<!-- clawsweeper-repair-outcome:${result.cluster_id}:${runName}:pr-${target} -->`;
}

function issueHasCommentMarker(number: JsonValue, marker: LooseRecord) {
  return issueCommentsFor(number).some((comment: LooseRecord) =>
    String(comment.body ?? "").includes(String(marker ?? "")),
  );
}

function findAutomergeStatusComment(number: JsonValue) {
  return issueCommentsFor(number)
    .reverse()
    .find((comment: LooseRecord) => {
      if (!isTrustedStatusComment(comment)) return false;
      return hasAutomergeStatusMarker(comment.body, number);
    });
}

function issueCommentsFor(number: JsonValue) {
  const raw = run(
    "gh",
    ["api", `repos/${result.repo}/issues/${number}/comments?per_page=100`, "--paginate"],
    {
      cwd: repoRoot(),
      env: ghEnv(),
    },
  );
  const parsed = JSON.parse(raw || "[]");
  return Array.isArray(parsed) ? parsed : [];
}

function isTrustedStatusComment(comment: LooseRecord) {
  const author = String(comment.user?.login ?? "").toLowerCase();
  return (
    !author ||
    author === "clawsweeper" ||
    author === "clawsweeper[bot]" ||
    author === "openclaw-clawsweeper[bot]"
  );
}

function hasAutomergeStatusMarker(body: JsonValue, number: JsonValue) {
  const issueNumber = Number(number);
  const prefix = `<!-- clawsweeper-command-status:${Number.isFinite(issueNumber) ? issueNumber : "unknown"}:`;
  return (
    String(body ?? "").includes(prefix) &&
    /clawsweeper-command-status:\d+:(?:automerge|clawsweeper_auto_repair|clawsweeper_auto_merge|maintainer_approve_automerge):/i.test(
      String(body ?? ""),
    )
  );
}

function preserveStatusMarkers(existingBody: JsonValue, nextBody: string) {
  const markers = String(existingBody ?? "")
    .split(/\r?\n/)
    .filter((line) => /^<!-- clawsweeper-command(?:-status)?:/.test(line.trim()));
  const missingMarkers = markers.filter((marker) => !nextBody.includes(marker));
  return missingMarkers.length > 0 ? `${missingMarkers.join("\n")}\n${nextBody}` : nextBody;
}

function patchIssueComment(id: JsonValue, body: string) {
  const payloadPath = writePayload(`automerge-outcome-${id}`, { body });
  run(
    "gh",
    [
      "api",
      `repos/${result.repo}/issues/comments/${id}`,
      "--method",
      "PATCH",
      "--input",
      payloadPath,
    ],
    {
      cwd: repoRoot(),
      env: ghEnv(),
    },
  );
}

function currentActionsRunId() {
  return String(process.env.GITHUB_RUN_ID ?? "").trim();
}

function currentActionsRunUrl() {
  const runId = currentActionsRunId();
  const repo = String(process.env.GITHUB_REPOSITORY ?? "").trim();
  if (!runId || !repo) return "";
  const server = String(process.env.GITHUB_SERVER_URL ?? "https://github.com").replace(/\/+$/g, "");
  return `${server}/${repo}/actions/runs/${runId}`;
}

function listOrNone(items: LooseRecord[]) {
  return items?.length ? items.join("; ") : "none";
}

function postIssueComment(number: JsonValue, body: string) {
  const payloadPath = writePayload(`automerge-outcome-${number}`, { body });
  run(
    "gh",
    [
      "api",
      `repos/${result.repo}/issues/${number}/comments`,
      "--method",
      "POST",
      "--input",
      payloadPath,
    ],
    {
      cwd: repoRoot(),
      env: ghEnv(),
    },
  );
}

function writePayload(name: string, value: JsonValue) {
  const dir = path.join(repoRoot(), ".clawsweeper-repair", "payloads");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${safeFileName(name)}-${Date.now()}.json`);
  fs.writeFileSync(file, `${JSON.stringify(value)}\n`);
  return file;
}

function safeFileName(value: JsonValue) {
  return String(value)
    .replace(/[^A-Za-z0-9_.-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function copyFixDebugArtifacts(reportDir: JsonValue) {
  if (!workRoot || !fs.existsSync(workRoot)) return "";
  const debugDir = path.join(reportDir, "fix-executor-debug");
  let copied = 0;
  for (const entry of fs.readdirSync(workRoot, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    if (!/\.(jsonl|stderr\.log|md|json)$/i.test(entry.name)) continue;
    if (entry.name === "replacement-pr-body.md") continue;
    fs.mkdirSync(debugDir, { recursive: true });
    fs.copyFileSync(path.join(workRoot, entry.name), path.join(debugDir, entry.name));
    copied += 1;
  }
  return copied > 0 ? debugDir : "";
}

function ghAuthSetupGit(cwd: JsonValue) {
  run("gh", ["auth", "setup-git"], { cwd, env: ghEnv() });
}
