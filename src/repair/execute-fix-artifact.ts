#!/usr/bin/env node
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
  currentHead,
  ensureMergeBaseAvailable,
  gitChangedFiles,
  gitLsFiles,
  isAncestor,
  remoteBranchExists,
  remoteBranchSha,
} from "./git-repo-utils.js";
import { parsePullRequestUrl, pullRequestNumberFromUrl } from "./github-ref.js";
import { codexSubprocessEnv as codexEnv, repairGhEnv as ghEnv } from "./process-env.js";
import {
  isExpensivePnpmValidation,
  isTestFile,
  looksLikePathArgument,
  packageScriptRequirement,
  parseAllowedValidationCommand,
  uniqueStrings,
} from "./validation-command-utils.js";

const FIX_ACTIONS = new Set(["fix_needed", "build_fix_artifact", "open_fix_pr"]);
const REPAIR_STRATEGIES = new Set([
  "repair_contributor_branch",
  "replace_uneditable_branch",
  "new_fix_pr",
]);
const NON_EXECUTABLE_REPAIR_STRATEGIES = new Set(["already_fixed_on_main", "needs_human"]);
const DEFAULT_BASE_BRANCH = "main";

const args = parseArgs(process.argv.slice(2));
const jobPath = args._[0];
const resultPathArg = args._[1];
const latest = Boolean(args.latest);
const dryRun = Boolean(args["dry-run"] || process.env.CLAWSWEEPER_REPAIR_FIX_DRY_RUN === "1");
const model = String(args.model ?? process.env.CLAWSWEEPER_REPAIR_MODEL ?? "gpt-5.5");
const requestedCodexTimeoutMs = Number(
  process.env.CLAWSWEEPER_REPAIR_FIX_CODEX_TIMEOUT_MS ?? 25 * 60 * 1000,
);
const fixStepTimeoutMs = Number(
  process.env.CLAWSWEEPER_REPAIR_FIX_STEP_TIMEOUT_MS ?? 30 * 60 * 1000,
);
const fixTimeoutReserveMs = Number(
  process.env.CLAWSWEEPER_REPAIR_FIX_TIMEOUT_RESERVE_MS ?? 5 * 60 * 1000,
);
const codexTimeoutMs = Math.min(
  requestedCodexTimeoutMs,
  Math.max(60 * 1000, fixStepTimeoutMs - fixTimeoutReserveMs),
);
const codexPreflightTimeoutMs = Number(
  process.env.CLAWSWEEPER_REPAIR_FIX_PREFLIGHT_TIMEOUT_MS ?? 2 * 60 * 1000,
);
const codexReasoningEffort = String(
  process.env.CLAWSWEEPER_REPAIR_CODEX_REASONING_EFFORT ?? "medium",
);
const codexServiceTier = String(process.env.CLAWSWEEPER_REPAIR_CODEX_SERVICE_TIER ?? "fast").trim();
const maxEditAttempts = Math.max(1, Number(process.env.CLAWSWEEPER_REPAIR_FIX_EDIT_ATTEMPTS ?? 3));
const maxReviewAttempts = Math.max(
  1,
  Number(process.env.CLAWSWEEPER_REPAIR_CODEX_REVIEW_ATTEMPTS ?? 2),
);
const resolveReviewThreads = process.env.CLAWSWEEPER_REPAIR_RESOLVE_REVIEW_THREADS !== "0";
const skipCodexWritePreflight = process.env.CLAWSWEEPER_REPAIR_SKIP_CODEX_WRITE_PREFLIGHT === "1";
const allowExpensiveValidation = process.env.CLAWSWEEPER_REPAIR_ALLOW_EXPENSIVE_VALIDATION === "1";
const installTargetDeps = process.env.CLAWSWEEPER_REPAIR_INSTALL_TARGET_DEPS !== "0";
const allowBroadFixArtifacts = process.env.CLAWSWEEPER_REPAIR_ALLOW_BROAD_FIX_ARTIFACTS === "1";
const closeSupersededSourcePrs = process.env.CLAWSWEEPER_REPAIR_CLOSE_SUPERSEDED_SOURCE_PRS === "1";
const maxAutonomousFixFiles = Math.max(
  1,
  Number(process.env.CLAWSWEEPER_REPAIR_MAX_AUTONOMOUS_FIX_FILES ?? 8),
);
const maxAutonomousFixSurfaces = Math.max(
  1,
  Number(process.env.CLAWSWEEPER_REPAIR_MAX_AUTONOMOUS_FIX_SURFACES ?? 4),
);
const maxActivePrsPerArea = Number(process.env.CLAWSWEEPER_REPAIR_MAX_ACTIVE_PRS_PER_AREA ?? 50);
const CLAWSWEEPER_REPAIR_LABEL = "clawsweeper";
const CLAWSWEEPER_REPAIR_LABEL_COLOR = "F97316";
const CLAWSWEEPER_REPAIR_LABEL_DESCRIPTION = "Tracked by ClawSweeper automation";
const COMMIT_FINDING_LABEL = "clawsweeper:commit-finding";
const COMMIT_FINDING_LABEL_COLOR = "1D76DB";
const COMMIT_FINDING_LABEL_DESCRIPTION = "PR created from a ClawSweeper commit finding";
const strictTargetValidation =
  process.env.CLAWSWEEPER_REPAIR_STRICT_TARGET_VALIDATION === "1" ||
  String(process.env.CLAWSWEEPER_REPAIR_TARGET_VALIDATION_MODE ?? "changed-only") === "strict";
const defaultCodexWriteSandbox =
  process.env.GITHUB_ACTIONS === "true" ? "danger-full-access" : "workspace-write";
const codexWriteSandbox = String(
  process.env.CLAWSWEEPER_REPAIR_CODEX_WRITE_SANDBOX ?? defaultCodexWriteSandbox,
);
const defaultCodexReviewSandbox =
  process.env.GITHUB_ACTIONS === "true" ? "danger-full-access" : "read-only";
const codexReviewSandbox = String(
  process.env.CLAWSWEEPER_REPAIR_CODEX_REVIEW_SANDBOX ?? defaultCodexReviewSandbox,
);
const codexWriteNetworkAccess = parseBooleanEnv(
  process.env.CLAWSWEEPER_REPAIR_CODEX_WRITE_NETWORK_ACCESS,
  process.env.GITHUB_ACTIONS === "true",
);
const codexReviewNetworkAccess = parseBooleanEnv(
  process.env.CLAWSWEEPER_REPAIR_CODEX_REVIEW_NETWORK_ACCESS,
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

assertAllowedOwner(job.frontmatter.repo, process.env.CLAWSWEEPER_REPAIR_ALLOWED_OWNER);

if (!["execute", "autonomous"].includes(job.frontmatter.mode)) {
  throw new Error("refusing fix execution: job frontmatter mode is not execute or autonomous");
}
if (process.env.CLAWSWEEPER_REPAIR_ALLOW_EXECUTE !== "1") {
  throw new Error("refusing fix execution: CLAWSWEEPER_REPAIR_ALLOW_EXECUTE must be 1");
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

if (process.env.CLAWSWEEPER_REPAIR_ALLOW_FIX_PR !== "1") {
  throw new Error("refusing fix execution: CLAWSWEEPER_REPAIR_ALLOW_FIX_PR must be 1");
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
const scopeBlock = validateAutonomousFixScope({ job, fixArtifact });
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

const validationPreflight = preflightTargetValidationPlan({
  fixArtifact,
  targetDir,
  baseBranch: DEFAULT_BASE_BRANCH,
});
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
  return /Codex produced no target repo changes|Codex \/review did not pass|Codex (?:fix worker|review-fix worker|\/review) timed out|Codex (?:fix worker|review-fix worker|\/review) failed|validation command failed/i.test(
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
  const baseBranch = String(process.env.CLAWSWEEPER_REPAIR_FIX_BASE_BRANCH ?? DEFAULT_BASE_BRANCH);
  const sourcePr = firstSourcePullRequest(fixArtifact);
  const pull = fetchPullRequest(sourcePr.number);
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
  prepareTargetToolchain(targetDir);

  const prep = editValidatePrepareMerge({
    fixArtifact,
    targetDir,
    branch,
    mode: "repair",
    baseBranch,
    fallbackReason: null,
    sourceHead,
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
  });
  const comment = repairContributorBranchComment({
    sourcePrUrl: sourcePr.url,
    validationCommands: fixArtifact.validation_commands,
    provenance: externalMessageProvenance({
      model,
      reasoning: codexReasoningEffort,
      reviewedSha: prep.commit,
    }),
  });
  run("gh", ["pr", "comment", String(sourcePr.number), "--repo", result.repo, "--body", comment], {
    cwd: targetDir,
    env: ghEnv(),
  });
  return {
    action: "repair_contributor_branch",
    status: "pushed",
    target: sourcePr.url,
    head_repo: pull.head.repo.full_name,
    head_ref: pull.head.ref,
    branch_rewritten: branchUpdate.rewritten,
    commit: prep.commit,
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
  const baseBranch = String(process.env.CLAWSWEEPER_REPAIR_FIX_BASE_BRANCH ?? DEFAULT_BASE_BRANCH);
  const contributorCredits = sourceContributorCredits({ fixArtifact, targetDir });
  const branch = replacementBranchName(result.cluster_id);
  const areaCapacityBlock = validateActivePrAreaCapacity({ fixArtifact, targetDir, branch });
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
  const branchState = checkoutRecoverableReplacementBranch({ targetDir, branch, baseBranch });
  prepareTargetToolchain(targetDir);

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
  if (prNumber) labelReplacementPullRequest({ number: prNumber, targetDir });
  if (prNumber) (prep.merge_preflight as JsonValue).target = `#${prNumber}`;
  const threadResolution = prNumber
    ? prepareReviewThreadsForMerge({ repo: result.repo, number: prNumber, targetDir })
    : { status: "blocked", reason: "replacement PR URL did not include a PR number" };

  const supersededSources = supersedeSources
    ? supersededReplacementSources(fixArtifact).filter(
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

function labelReplacementPullRequest({ number, targetDir }: LooseRecord) {
  ensureLabel(
    result.repo,
    CLAWSWEEPER_REPAIR_LABEL,
    CLAWSWEEPER_REPAIR_LABEL_COLOR,
    CLAWSWEEPER_REPAIR_LABEL_DESCRIPTION,
    targetDir,
  );
  addLabel(result.repo, number, CLAWSWEEPER_REPAIR_LABEL, targetDir);
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

function fetchSourcePullRequestView({ repo, number, targetDir }: LooseRecord) {
  return JSON.parse(
    run(
      "gh",
      ["pr", "view", String(number), "--repo", repo, "--json", "author,state,mergedAt,title,url"],
      {
        cwd: targetDir,
        env: ghEnv(),
      },
    ),
  );
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
}: LooseRecord) {
  let producedChanges = allowExistingChanges;
  let previousSummary = "";
  const checkpointCommits: JsonValue[] = [];
  const repositoryContext = buildRepositoryContext({ fixArtifact, targetDir });
  const shouldRunCodexEdit = !producedChanges || reconcileWithBase;
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

  const firstCheckpoint = commitCheckpointIfNeeded({
    targetDir,
    message: fixArtifact.pr_title,
    trailers: mode === "replacement" ? coAuthorTrailers(contributorCredits) : [],
  });
  if (firstCheckpoint) {
    checkpointCommits.push(firstCheckpoint);
    pushCheckpoint?.();
  }

  const codexReview = validateAndReviewLoop({
    fixArtifact,
    targetDir,
    mode,
    baseBranch,
    onReviewFix: (attempt: JsonValue) => {
      const checkpoint = commitCheckpointIfNeeded({
        targetDir,
        message: `fix(clawsweeper): address review for ${result.cluster_id} (${attempt})`,
        trailers: mode === "replacement" ? coAuthorTrailers(contributorCredits) : [],
      });
      if (checkpoint) {
        checkpointCommits.push(checkpoint);
        pushCheckpoint?.();
      }
    },
  });
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

function buildFixPrompt({
  fixArtifact,
  branch,
  mode,
  fallbackReason,
  attempt,
  previousNoDiff,
  previousSummary,
  repositoryContext,
  reconcileWithBase,
  sourceHead,
}: LooseRecord) {
  return [
    "You are editing the target repository for ClawSweeper Repair.",
    "",
    "Rules:",
    "- this is a writable checkout; make concrete file edits before returning;",
    "- make the narrowest code change that satisfies the fix artifact;",
    "- start by inspecting the repository paths below with rg/git ls-files/sed;",
    "- if likely_files are stale, missing, or glob-like, discover the real nearby files and edit those;",
    "- you may run local git status/diff/log/rebase/merge commands needed to reconcile this branch with current origin/main;",
    "- when git conflicts exist, resolve every conflict marker and leave the checkout in a normal non-rebasing state;",
    "- preserve contributor credit in changelog/docs when the fix is user-facing;",
    "- address review-bot concerns named in the artifact;",
    "- resolve actionable human review comments, bot comments, and requested changes named in the artifact;",
    "- prepare the PR so it can pass the ClawSweeper Repair merge_preflight gate;",
    "- do not push, open PRs, close PRs, or call gh;",
    "- do not create a final commit unless git rebase/merge conflict resolution requires it; ClawSweeper Repair checkpoints ordinary edits after you return;",
    "- ClawSweeper Repair will checkpoint and push your edits to the recovery branch after you return;",
    "- do not inspect or print environment variables, credentials, tokens, or secrets;",
    "- do not change auth, approval, sandbox, or trust-boundary semantics unless the artifact explicitly asks for that boundary change;",
    "- exec-adjacent bugs are allowed when the fix is ordinary correctness or hardening and does not redefine the security boundary;",
    "- before returning, verify git status/diff/log show a merge-ready branch state.",
    "",
    `Mode: ${mode}`,
    `Branch: ${branch}`,
    `Edit attempt: ${attempt ?? 1} of ${maxEditAttempts}`,
    reconcileWithBase
      ? "Existing repair branch detected. Reconcile the existing branch diff with current origin/main before touching new code; rebase locally only when that is the cleanest path."
      : "",
    sourceHead ? `Source head before edit: ${sourceHead}` : "",
    previousNoDiff
      ? "Previous attempt produced no target repo diff. This time make the smallest concrete code/test change that satisfies the artifact; do not return analysis only."
      : "",
    previousSummary ? `Previous no-diff summary: ${compactText(previousSummary, 1200)}` : "",
    fallbackReason ? `Fallback reason: ${fallbackReason}` : "",
    "",
    "Repository discovery context:",
    "```text",
    repositoryContext,
    "```",
    "",
    "Fix artifact:",
    "```json",
    JSON.stringify(fixArtifact, null, 2),
    "```",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildRepositoryContext({ fixArtifact, targetDir }: LooseRecord) {
  const files = run("git", ["ls-files"], { cwd: targetDir })
    .split("\n")
    .map((line: JsonValue) => line.trim())
    .filter(Boolean);
  const scoredCandidates = scoreRepositoryFiles({ files, fixArtifact }).slice(0, 80);
  const candidates = scoredCandidates.map((entry: JsonValue) => `${entry.file} (${entry.score})`);
  const snippets = buildRepositorySnippets({
    targetDir,
    candidates: scoredCandidates.slice(0, 12),
    fixArtifact,
  });
  const packageScripts = readPackageScripts(targetDir);
  return [
    `candidate_files (${candidates.length}):`,
    ...(candidates.length > 0
      ? candidates
      : ["none matched; use rg across the repo to find the real implementation files"]),
    "",
    "candidate_file_excerpts:",
    snippets || "none; inspect candidate files directly before editing",
    "",
    `validation_commands: ${(fixArtifact.validation_commands ?? []).join(" ; ")}`,
    `package_scripts: ${packageScripts.join(", ") || "none"}`,
  ].join("\n");
}

function buildRepositorySnippets({ targetDir, candidates, fixArtifact }: LooseRecord) {
  const tokens = discoveryTokens(fixArtifact).slice(0, 40);
  const out: JsonValue[] = [];
  for (const candidate of candidates) {
    const pathname = path.join(targetDir, candidate.file);
    if (!fs.existsSync(pathname)) continue;
    const stat = fs.statSync(pathname);
    if (!stat.isFile() || stat.size > 220_000) continue;
    const content = fs.readFileSync(pathname, "utf8");
    const excerpt = focusedFileExcerpt(content, tokens);
    if (!excerpt) continue;
    out.push(`--- ${candidate.file} ---\n${excerpt}`);
    if (out.join("\n\n").length > 18_000) break;
  }
  return out.join("\n\n").slice(0, 18_000);
}

function focusedFileExcerpt(content: JsonValue, tokens: JsonValue) {
  const lines = content.split(/\r?\n/);
  const matched = new Set<number>();
  const lowerTokens = tokens
    .map((token: JsonValue) => token.toLowerCase())
    .filter((token: JsonValue) => token.length >= 4);
  for (let index = 0; index < lines.length; index += 1) {
    const lower = lines[index].toLowerCase();
    if (lowerTokens.some((token: JsonValue) => lower.includes(token))) {
      for (
        let line = Math.max(0, index - 8);
        line <= Math.min(lines.length - 1, index + 18);
        line += 1
      ) {
        matched.add(line);
      }
    }
  }
  const selected =
    matched.size > 0
      ? [...matched].sort((a: JsonValue, b: JsonValue) => a - b)
      : lines.map((_: JsonValue, index: JsonValue) => index).slice(0, 80);
  const rendered: JsonValue[] = [];
  let previous = -2;
  for (const line of selected) {
    if (line !== previous + 1) rendered.push("...");
    rendered.push(`${line + 1}: ${lines[line]}`);
    previous = line;
    if (rendered.join("\n").length > 3_200) break;
  }
  return rendered.join("\n");
}

function scoreRepositoryFiles({ files, fixArtifact }: LooseRecord) {
  const likelyFiles = (fixArtifact.likely_files ?? [])
    .map((entry: JsonValue) => String(entry).trim())
    .filter(Boolean);
  const exactLikely = new Set(likelyFiles.filter((entry: JsonValue) => !entry.includes("*")));
  const literalHints = likelyFiles
    .map(literalPathHint)
    .filter((entry: JsonValue) => entry.length >= 4);
  const tokens = discoveryTokens(fixArtifact);
  const out: JsonValue[] = [];
  for (const file of files) {
    const lower = file.toLowerCase();
    let score = 0;
    if (exactLikely.has(file)) score += 100;
    for (const hint of literalHints) {
      if (lower.includes(hint)) score += 15;
    }
    for (const token of tokens) {
      if (lower.includes(token)) score += 3;
    }
    if (/\.(test|spec)\.[cm]?[jt]sx?$/i.test(file)) score += 2;
    if (/\.(ts|tsx|js|jsx|mjs|cjs|md|mdx|json)$/i.test(file)) score += 1;
    if (score > 0) out.push({ file, score });
  }
  out.sort(
    (left: JsonValue, right: JsonValue) =>
      right.score - left.score || left.file.localeCompare(right.file),
  );
  return out;
}

function literalPathHint(value: JsonValue) {
  return String(value)
    .toLowerCase()
    .replace(/\*\*?.*$/, "")
    .replace(/\/+$/, "");
}

function discoveryTokens(fixArtifact: LooseRecord) {
  const common = new Set([
    "support",
    "supported",
    "current",
    "existing",
    "validation",
    "commands",
    "summary",
    "scope",
    "error",
    "errors",
  ]);
  const text = [
    fixArtifact.summary,
    fixArtifact.pr_title,
    fixArtifact.pr_body,
    ...(fixArtifact.affected_surfaces ?? []),
    ...(fixArtifact.likely_files ?? []),
  ].join("\n");
  const tokens = new Set();
  for (const match of text.toLowerCase().matchAll(/[a-z][a-z0-9_-]{3,}/g)) {
    const token = match[0].replace(/[-_]/g, "");
    if (token.length >= 4 && !common.has(token)) tokens.add(token);
  }
  return [...tokens].slice(0, 80);
}

function readPackageScripts(targetDir: string) {
  const packagePath = path.join(targetDir, "package.json");
  if (!fs.existsSync(packagePath)) return [];
  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    return Object.keys(pkg.scripts ?? {})
      .sort()
      .slice(0, 80);
  } catch {
    return [];
  }
}

function readTextIfExists(filePath: string) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function compactText(value: JsonValue, maxLength: number) {
  const text = String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
}

function runCodexWritePreflight() {
  if (skipCodexWritePreflight) {
    return {
      status: "skipped",
      reason: "CLAWSWEEPER_REPAIR_SKIP_CODEX_WRITE_PREFLIGHT=1",
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
}: LooseRecord) {
  let lastReview = null;
  let validationCommands: LooseRecord[] = [];
  for (let attempt = 1; attempt <= maxReviewAttempts; attempt += 1) {
    validationCommands = runAllowedValidationCommands(
      fixArtifact.validation_commands,
      targetDir,
      baseBranch,
    );
    runDiffCheck({ targetDir, baseBranch });
    lastReview = runCodexReview({
      fixArtifact,
      targetDir,
      mode,
      attempt,
      baseBranch,
      validationCommands,
    });
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
    "",
    `Validation commands actually run: ${validationCommands.join("; ") || "none"}`,
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

function sourceContributorCredits({ fixArtifact, targetDir }: LooseRecord) {
  const byLogin = new Map();
  for (const source of fixArtifact.source_prs ?? []) {
    const parsed = parsePullRequestUrl(source);
    if (!parsed || parsed.repo !== result.repo) continue;
    const view = fetchSourcePullRequestView({
      repo: result.repo,
      number: parsed.number,
      targetDir,
    });
    const login = String(view.author?.login ?? "").trim();
    if (!login || view.author?.is_bot || isBotLogin(login)) continue;
    const key = login.toLowerCase();
    const existing = byLogin.get(key) ?? {
      login,
      name: safeTrailerName(login, login),
      email: `${login}@users.noreply.github.com`,
      sources: [],
    };
    const user = fetchGitHubUser(login, targetDir);
    if (user) {
      existing.name = safeTrailerName(user.name || user.login || login, login);
      existing.email = `${user.id}+${user.login}@users.noreply.github.com`;
    }
    existing.sources = uniqueStrings([...existing.sources, parsed.url]);
    byLogin.set(key, existing);
  }
  return [...byLogin.values()];
}

function fetchGitHubUser(login: JsonValue, targetDir: string) {
  try {
    const user = JSON.parse(run("gh", ["api", `users/${login}`], { cwd: targetDir, env: ghEnv() }));
    if (!user?.id || !user?.login) return null;
    return user;
  } catch {
    return null;
  }
}

function coAuthorTrailers(contributorCredits: LooseRecord[]) {
  return contributorCredits.map(
    (credit: JsonValue) => `Co-authored-by: ${credit.name} <${credit.email}>`,
  );
}

function publicContributorCredit(credit: JsonValue) {
  return {
    login: credit.login,
    name: credit.name,
    sources: credit.sources,
    co_authored_by: `Co-authored-by: ${credit.name} <${credit.email}>`,
  };
}

function safeTrailerName(value: JsonValue, fallback: JsonValue = "Contributor") {
  const name = String(value ?? "")
    .replace(/[<>\r\n]/g, "")
    .trim();
  return name || fallback;
}

function isBotLogin(login: JsonValue) {
  return /\[bot\]$|bot$/i.test(String(login ?? ""));
}

function validateActivePrAreaCapacity({ fixArtifact, targetDir, branch }: LooseRecord) {
  if (!Number.isFinite(maxActivePrsPerArea) || maxActivePrsPerArea < 1) return null;
  const areas = affectedAreasForFiles(fixArtifact.likely_files ?? []);
  if (areas.length === 0) return null;

  let activePrs;
  try {
    activePrs = listOpenClawSweeperPrAreas({ targetDir }).filter(
      (pull: JsonValue) => pull.branch !== branch,
    );
  } catch (error) {
    return {
      code: "active_area_pr_cap_unverified",
      reason: `could not verify active ClawSweeper PR area capacity: ${compactText(error.message, 500)}`,
      areas,
      max_active_prs_per_area: maxActivePrsPerArea,
    };
  }
  const blockedAreas = areas
    .map((area: JsonValue) => ({
      area,
      active: activePrs.filter((pull: JsonValue) => pull.areas.includes(area)),
    }))
    .filter((entry: JsonValue) => entry.active.length >= maxActivePrsPerArea);

  if (blockedAreas.length === 0) return null;
  const first = blockedAreas[0];
  if (!first) return null;
  return {
    code: "active_area_pr_cap",
    reason: `active ClawSweeper PR cap reached for ${first.area}: ${first.active.length}/${maxActivePrsPerArea} open PRs`,
    areas,
    max_active_prs_per_area: maxActivePrsPerArea,
    active_area_prs: first.active.slice(0, 10).map((pull: JsonValue) => ({
      pr: `#${pull.number}`,
      url: pull.url,
      title: pull.title,
      branch: pull.branch,
      areas: pull.areas,
    })),
  };
}

function listOpenClawSweeperPrAreas({ targetDir }: LooseRecord) {
  const pulls = JSON.parse(
    run(
      "gh",
      [
        "pr",
        "list",
        "--repo",
        result.repo,
        "--state",
        "open",
        "--limit",
        "500",
        "--json",
        "number,title,url,headRefName,labels",
      ],
      { cwd: targetDir, env: ghEnv() },
    ),
  );
  return pulls
    .filter((pull: JsonValue) => {
      const branch = String(pull.headRefName ?? "");
      const labels = (pull.labels ?? []).map((label: JsonValue) => String(label.name ?? label));
      return branch.startsWith("clawsweeper/") || labels.includes("clawsweeper");
    })
    .map((pull: JsonValue) => {
      const files = fetchPullRequestFilePaths({ targetDir, number: pull.number });
      return {
        number: pull.number,
        title: pull.title,
        url: pull.url,
        branch: String(pull.headRefName ?? ""),
        areas: affectedAreasForFiles(files),
      };
    });
}

function fetchPullRequestFilePaths({ targetDir, number }: LooseRecord) {
  const view = JSON.parse(
    run("gh", ["pr", "view", String(number), "--repo", result.repo, "--json", "files"], {
      cwd: targetDir,
      env: ghEnv(),
    }),
  );
  return (view.files ?? []).map((file: JsonValue) => String(file.path ?? "")).filter(Boolean);
}

function affectedAreasForFiles(files: LooseRecord[]) {
  return uniqueStrings(files.map(affectedAreaForFile).filter(Boolean));
}

function affectedAreaForFile(file: JsonValue) {
  const normalized = String(file ?? "")
    .replaceAll("\\", "/")
    .replace(/^\.\/+/, "");
  if (!normalized || normalized.includes("*")) return "";
  if (isBackpressureIgnoredFile(normalized)) return "";
  const parts = normalized.split("/").filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0] ?? "";
  if (["apps", "extensions", "packages"].includes(first) && parts[1]) return `${first}/${parts[1]}`;
  if (first === "src" && parts[1]) return `src/${parts[1]}`;
  if (first === "test" || first === "tests") return first;
  if (first === "docs" || first === ".github" || first === "scripts") return first;
  return parts[0];
}

function isBackpressureIgnoredFile(file: JsonValue) {
  return /(^|\/)(CHANGELOG|CHANGES|HISTORY|RELEASES|RELEASE_NOTES)(\.[A-Za-z0-9_-]+)?$/i.test(
    String(file ?? ""),
  );
}

function supersededReplacementSources(fixArtifact: LooseRecord) {
  if (
    Array.isArray(fixArtifact.supersede_source_prs) &&
    fixArtifact.supersede_source_prs.length > 0
  ) {
    return fixArtifact.supersede_source_prs.filter(
      (source: JsonValue) => parsePullRequestUrl(source)?.repo === result.repo,
    );
  }

  const blockerText = (fixArtifact.branch_update_blockers ?? []).join("\n");
  const directUneditableSources = (fixArtifact.source_prs ?? []).filter((source: JsonValue) => {
    const parsed = parsePullRequestUrl(source);
    if (!parsed || parsed.repo !== result.repo) return false;
    const sourcePattern = new RegExp(`(?:#|pull/)${parsed.number}(?!\\d)[\\s\\S]{0,220}`, "i");
    const sourceBlocker = blockerText.match(sourcePattern)?.[0] ?? "";
    return /maintainer_can_modify\s*=\s*false|uneditable|cannot safely update|branch is unsafe|mergeability unknown/i.test(
      sourceBlocker,
    );
  });
  return directUneditableSources.length > 0
    ? directUneditableSources
    : (fixArtifact.source_prs ?? []).slice(0, 1);
}

function validateFixArtifact(fixArtifact: LooseRecord) {
  if (!fixArtifact || typeof fixArtifact !== "object") {
    throw new Error("fix execution requires fix_artifact");
  }
  for (const key of ["summary", "pr_title", "pr_body"]) {
    if (typeof fixArtifact[key] !== "string" || !fixArtifact[key].trim()) {
      throw new Error(`fix_artifact.${key} is required`);
    }
  }
  for (const key of [
    "affected_surfaces",
    "likely_files",
    "linked_refs",
    "validation_commands",
    "credit_notes",
  ]) {
    if (!Array.isArray(fixArtifact[key]) || fixArtifact[key].length === 0) {
      throw new Error(`fix_artifact.${key} must be a non-empty list`);
    }
  }
  if (typeof fixArtifact.changelog_required !== "boolean") {
    throw new Error("fix_artifact.changelog_required must be boolean");
  }
  if (!REPAIR_STRATEGIES.has(fixArtifact.repair_strategy)) {
    throw new Error("fix_artifact.repair_strategy is not executable");
  }
  if (
    fixArtifact.repair_strategy !== "new_fix_pr" &&
    (!Array.isArray(fixArtifact.source_prs) || fixArtifact.source_prs.length === 0)
  ) {
    throw new Error("repair/replacement fix_artifact must list source_prs");
  }
  return fixArtifact;
}

function validateFixSecurityScope({
  job,
  resultPath,
  fixArtifact,
  plannedFixActions,
}: LooseRecord) {
  if (job.frontmatter.security_sensitive === true) {
    return {
      reason: "job is marked security_sensitive; route to central security handling",
      evidence: ["job.frontmatter.security_sensitive=true"],
    };
  }

  const clusterPlan = readSiblingJson(resultPath, "cluster-plan.json");
  const securityRefs = new Set(
    (clusterPlan?.security_boundary?.security_sensitive_items ?? [])
      .map(normalizeLocalRef)
      .filter(Boolean),
  );

  for (const action of plannedFixActions) {
    const target = normalizeLocalRef(action.target);
    if (target && securityRefs.has(target)) {
      return {
        reason: `fix action targets security-sensitive ref ${target}`,
        evidence: [`${target} appears in cluster-plan.security_boundary.security_sensitive_items`],
      };
    }
  }

  for (const source of fixArtifact.source_prs ?? []) {
    const sourceRef = normalizeLocalRef(source);
    if (sourceRef && securityRefs.has(sourceRef)) {
      return {
        reason: `fix artifact source PR ${sourceRef} is security-sensitive`,
        evidence: [
          `${sourceRef} appears in cluster-plan.security_boundary.security_sensitive_items`,
        ],
      };
    }
  }

  return null;
}

function validateAutonomousFixScope({ job, fixArtifact }: LooseRecord) {
  if (allowBroadFixArtifacts || job.frontmatter.allow_broad_fix_artifacts === true) return null;

  const likelyFiles = fixArtifact.likely_files ?? [];
  const affectedSurfaces = fixArtifact.affected_surfaces ?? [];
  const text = [
    fixArtifact.pr_title,
    fixArtifact.summary,
    fixArtifact.pr_body,
    ...affectedSurfaces,
    ...likelyFiles,
  ].join("\n");
  const featureSignal =
    /\bfeat(?:\(|:)|\bfeature\b|add(?:s|ing)?\s+(?:a |an )?(?:new |explicit )?|new config|configuration surface|public .*docs?|schema/i.test(
      text,
    );
  const crossesDocs = likelyFiles.some((file: JsonValue) => String(file).startsWith("docs/"));
  const crossesConfig = likelyFiles.some((file: JsonValue) =>
    /\bconfig\b|schema|labels|help/i.test(String(file)),
  );
  const crossesTests = likelyFiles.some((file: JsonValue) =>
    /\.test\.[cm]?[jt]s$|\.spec\.[cm]?[jt]s$/i.test(String(file)),
  );
  const crossesCore = likelyFiles.some((file: JsonValue) => String(file).startsWith("src/"));
  const crossSurfaceCount = [crossesDocs, crossesConfig, crossesTests, crossesCore].filter(
    Boolean,
  ).length;
  const tooManyFiles = likelyFiles.length > maxAutonomousFixFiles;
  const tooManySurfaces = affectedSurfaces.length > maxAutonomousFixSurfaces;

  if (!featureSignal || (!tooManyFiles && !tooManySurfaces && crossSurfaceCount < 3)) return null;

  return {
    reason:
      "fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_REPAIR_ALLOW_BROAD_FIX_ARTIFACTS=1",
    evidence: [
      `pr_title=${fixArtifact.pr_title}`,
      `likely_files=${likelyFiles.length}/${maxAutonomousFixFiles}`,
      `affected_surfaces=${affectedSurfaces.length}/${maxAutonomousFixSurfaces}`,
      `cross_surface_count=${crossSurfaceCount}`,
      `sample_files=${likelyFiles.slice(0, 8).join(", ")}`,
    ],
  };
}

function readSiblingJson(resultPath: string, name: string) {
  const file = path.join(path.dirname(resultPath), name);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function normalizeLocalRef(value: JsonValue) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  const githubMatch = text.match(/github\.com\/[^/\s]+\/[^/\s]+\/(?:issues|pull)\/(\d+)/i);
  if (githubMatch) return `#${githubMatch[1]}`;
  const hashMatch = text.match(/^#?(\d+)$/);
  if (hashMatch) return `#${hashMatch[1]}`;
  return "";
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

function prepareTargetToolchain(cwd: JsonValue) {
  if (!installTargetDeps) return;
  const packagePath = path.join(cwd, "package.json");
  if (!fs.existsSync(packagePath)) return;

  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const packageManager = String(packageJson.packageManager ?? "pnpm@10.33.0");
  if (!packageManager.startsWith("pnpm@")) {
    throw new Error(`unsupported target package manager: ${packageManager}`);
  }

  const validationEnv = targetValidationEnv();
  run(
    "node",
    [
      "-e",
      "const major = Number(process.versions.node.split('.')[0]); if (major < 22) { console.error(`Node ${process.version} is too old for target validation`); process.exit(1); }",
    ],
    { cwd, env: validationEnv },
  );
  run("corepack", ["enable"], { cwd, env: validationEnv });
  run("corepack", ["prepare", packageManager, "--activate"], { cwd, env: validationEnv });
  const installArgs = [
    "install",
    "--frozen-lockfile",
    "--prefer-offline",
    "--config.engine-strict=false",
    "--config.enable-pre-post-scripts=true",
  ];
  try {
    run("pnpm", installArgs, { cwd, env: validationEnv });
  } catch (error) {
    if (!/ERR_PNPM_OUTDATED_LOCKFILE/i.test(String(error.message))) throw error;
    run(
      "pnpm",
      installArgs.map((arg: JsonValue) =>
        arg === "--frozen-lockfile" ? "--no-frozen-lockfile" : arg,
      ),
      {
        cwd,
        env: validationEnv,
      },
    );
    restoreTargetLockfile(cwd);
  }
}

function restoreTargetLockfile(cwd: JsonValue) {
  const lockfile = "pnpm-lock.yaml";
  if (!fs.existsSync(path.join(cwd, lockfile))) return;
  run("git", ["checkout", "--", lockfile], { cwd });
}

function setupGitIdentity(cwd: JsonValue) {
  run(
    "git",
    ["config", "user.name", process.env.CLAWSWEEPER_REPAIR_GIT_USER_NAME ?? "clawsweeper-repair"],
    {
      cwd,
    },
  );
  run(
    "git",
    [
      "config",
      "user.email",
      process.env.CLAWSWEEPER_REPAIR_GIT_USER_EMAIL ??
        "clawsweeper-repair@users.noreply.github.com",
    ],
    { cwd },
  );
}

function runAllowedValidationCommands(
  commands: LooseRecord[],
  cwd: JsonValue,
  baseBranch: string = DEFAULT_BASE_BRANCH,
) {
  ensureMergeBaseAvailable({ targetDir: cwd, baseBranch });
  const validationEnv = targetValidationEnv();
  const executed: JsonValue[] = [];
  for (const command of commands) {
    const resolvedCommands = resolveAllowedValidationCommands(command, cwd, baseBranch);
    for (const parts of resolvedCommands) {
      const rendered = parts.join(" ");
      if (executed.includes(rendered)) continue;
      try {
        run(parts[0], parts.slice(1), { cwd, env: validationEnv });
        executed.push(rendered);
      } catch (error) {
        const fallbackCommands = validationFallbackCommands({ parts, error, cwd, baseBranch });
        if (fallbackCommands.length > 0) {
          for (const fallbackParts of fallbackCommands) {
            const fallbackRendered = fallbackParts.join(" ");
            if (executed.includes(fallbackRendered)) continue;
            run(fallbackParts[0], fallbackParts.slice(1), { cwd, env: validationEnv });
            executed.push(fallbackRendered);
          }
          continue;
        }
        throw new Error(
          `validation command failed (${parts.join(" ")}): ${compactText(error.message, 1200)}`,
        );
      }
    }
  }
  return executed;
}

function preflightTargetValidationPlan({
  fixArtifact,
  targetDir,
  baseBranch = DEFAULT_BASE_BRANCH,
}: LooseRecord) {
  const scripts = readPackageScriptSet(targetDir);
  const availableScripts = [...scripts].sort();
  const resolved: JsonValue[] = [];
  const requiredScripts: LooseRecord[] = [];
  for (const command of fixArtifact.validation_commands ?? []) {
    const resolvedCommands = resolveAllowedValidationCommands(command, targetDir, baseBranch);
    for (const parts of resolvedCommands) {
      const rendered = parts.join(" ");
      if (!resolved.includes(rendered)) resolved.push(rendered);
      const script = packageScriptRequirement(parts);
      if (script) requiredScripts.push(script);
    }
  }

  const missing = requiredScripts.find((script: JsonValue) => !scripts.has(script.name));
  if (!missing) {
    return {
      status: "passed",
      resolved_commands: resolved,
      available_scripts: availableScripts,
    };
  }

  const sourcePr =
    (fixArtifact.source_prs ?? []).find(
      (source: JsonValue) => parsePullRequestUrl(source)?.repo === result.repo,
    ) ?? null;
  return {
    status: "blocked",
    code: "validation_script_missing",
    required: missing.command,
    missing_script: missing.name,
    available_scripts: availableScripts,
    target_branch: fixArtifact.branch ?? fixArtifact.head_branch ?? null,
    source_pr: sourcePr,
    resolved_commands: resolved,
    reason: `validation_script_missing: required ${missing.command} is unavailable in target checkout`,
  };
}

function validationFallbackCommands({ parts, error, cwd, baseBranch }: LooseRecord) {
  if (strictTargetValidation) return [];
  if (parts[0] !== "pnpm" || parts[1] !== "check:changed" || parts.length !== 2) return [];
  if (/no merge base/i.test(String(error?.message ?? ""))) {
    ensureMergeBaseAvailable({ targetDir: cwd, baseBranch });
    return [parts];
  }
  if (!isChangedGateStall(error)) return [];
  const changedTests = changedTestFiles(cwd, baseBranch);
  return [
    ["git", "diff", "--check", `origin/${baseBranch}...HEAD`],
    ...(changedTests.length > 0 ? [["pnpm", "test:serial", ...changedTests]] : []),
  ];
}

function isChangedGateStall(error: JsonValue) {
  return /no output for \d+ms|terminating stalled Vitest|stalled Vitest process/i.test(
    String(error?.message ?? ""),
  );
}

function targetValidationEnv() {
  return {
    ...process.env,
    CI: process.env.CI ?? "true",
    OPENCLAW_LOCAL_CHECK: process.env.OPENCLAW_LOCAL_CHECK ?? "0",
  };
}

function resolveAllowedValidationCommands(
  command: LooseRecord,
  cwd: JsonValue,
  baseBranch: string = DEFAULT_BASE_BRANCH,
) {
  const parts = parseAllowedValidationCommand(command);
  const scripts = readPackageScriptSet(cwd);
  if (!strictTargetValidation && scripts.has("check:changed")) {
    return [["pnpm", "check:changed"]];
  }
  if (parts[0] === "npm" && parts[1] === "run" && parts[2] === "validate") {
    if (!scripts.has("validate") && scripts.has("check:changed")) {
      return [["pnpm", "check:changed"]];
    }
  }
  if (parts[0] === "pnpm") {
    const commandStart = parts[1] === "-s" || parts[1] === "--silent" ? 2 : 1;
    const pnpmScript = parts[commandStart];
    if (isExpensivePnpmValidation(parts, commandStart, allowExpensiveValidation)) {
      return [["pnpm", "check:changed"]];
    }
    if (pnpmScript === "vitest" && parts[commandStart + 1] === "run") {
      return normalizePathValidationCommand(
        ["pnpm", "test:serial", ...parts.slice(commandStart + 2)],
        cwd,
        baseBranch,
      );
    }
    if (pnpmScript === "test" || pnpmScript === "test:serial") {
      return normalizePathValidationCommand(
        ["pnpm", pnpmScript, ...parts.slice(commandStart + 1)],
        cwd,
        baseBranch,
      );
    }
  }
  return [parts];
}

function normalizePathValidationCommand(
  parts: JsonValue,
  cwd: JsonValue,
  baseBranch: string = DEFAULT_BASE_BRANCH,
) {
  const pathArgStart = 2;
  const pathArgs = parts.slice(pathArgStart).filter(looksLikePathArgument);
  if (pathArgs.length === 0) return [parts];

  const normalized: JsonValue[] = [];
  const missing: JsonValue[] = [];
  for (const arg of pathArgs) {
    const mapped = resolveRepoPathArgument(arg, cwd);
    if (mapped) normalized.push(mapped);
    else missing.push(arg);
  }

  if (missing.length === 0) {
    return [[...parts.slice(0, pathArgStart), ...uniqueStrings(normalized)]];
  }

  const changedTests = changedTestFiles(cwd, baseBranch);
  if (changedTests.length > 0) {
    return [["pnpm", "test:serial", ...changedTests]];
  }

  const scripts = readPackageScriptSet(cwd);
  if (scripts.has("check:changed")) {
    return [["pnpm", "check:changed"]];
  }

  return [[...parts.slice(0, pathArgStart), ...uniqueStrings(normalized)]];
}

function resolveRepoPathArgument(arg: JsonValue, cwd: string): string {
  const clean = String(arg ?? "").trim();
  if (!clean || clean.startsWith("-")) return clean;
  if (fs.existsSync(path.join(cwd, clean))) return clean;

  const candidates = candidateRepoPaths(clean, cwd).filter((candidate: JsonValue) =>
    fs.existsSync(path.join(cwd, candidate)),
  );
  return candidates[0] ?? "";
}

function candidateRepoPaths(filePath: string, cwd: string): string[] {
  const out: string[] = [];
  if (filePath.startsWith("src/web/")) {
    out.push(`extensions/whatsapp/src/${filePath.slice("src/web/".length)}`);
  }
  const basename = path.basename(filePath);
  if (basename) {
    const files = gitLsFiles(cwd);
    out.push(...files.filter((file: JsonValue) => path.basename(file) === basename));
  }
  return uniqueStrings(out);
}

function changedTestFiles(cwd: string, baseBranch: string = DEFAULT_BASE_BRANCH) {
  return gitChangedFiles(cwd, baseBranch).filter(
    (file: JsonValue) => isTestFile(file) && fs.existsSync(path.join(cwd, file)),
  );
}

function readPackageScriptSet(cwd: JsonValue) {
  const packagePath = path.join(cwd, "package.json");
  if (!fs.existsSync(packagePath)) return new Set();
  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    return new Set(Object.keys(pkg.scripts ?? {}));
  } catch {
    return new Set();
  }
}

function firstSourcePullRequest(fixArtifact: LooseRecord) {
  for (const source of fixArtifact.source_prs ?? []) {
    const parsed = parsePullRequestUrl(source);
    if (parsed && parsed.repo === result.repo) return parsed;
  }
  throw new Error("fix_artifact.source_prs must include a source PR in the target repo");
}

function fetchPullRequest(number: JsonValue) {
  return JSON.parse(
    run("gh", ["api", `repos/${result.repo}/pulls/${number}`], { cwd: repoRoot(), env: ghEnv() }),
  );
}

function prepareReviewThreadsForMerge({ repo, number, targetDir }: LooseRecord) {
  const before = fetchReviewThreads(repo, number);
  if (before.hasNextPage)
    return { status: "blocked", reason: "too many review threads to prove resolved" };
  const unresolved = before.threads.filter((thread: JsonValue) => !thread.isResolved);
  if (unresolved.length === 0) return { status: "resolved", unresolved_before: 0, resolved: 0 };
  if (!resolveReviewThreads) {
    return {
      status: "blocked",
      reason: "unresolved review threads remain and CLAWSWEEPER_REPAIR_RESOLVE_REVIEW_THREADS=0",
      unresolved_before: unresolved.length,
      examples: unresolved.slice(0, 3).map((thread: JsonValue) => thread.url ?? thread.id),
    };
  }
  for (const thread of unresolved) {
    resolveReviewThread(thread.id, targetDir);
  }
  const after = fetchReviewThreads(repo, number);
  const remaining = after.threads.filter((thread: JsonValue) => !thread.isResolved);
  if (remaining.length > 0) {
    return {
      status: "blocked",
      reason: "some review threads remained unresolved after resolution attempt",
      unresolved_before: unresolved.length,
      unresolved_after: remaining.length,
      examples: remaining.slice(0, 3).map((thread: JsonValue) => thread.url ?? thread.id),
    };
  }
  return { status: "resolved", unresolved_before: unresolved.length, resolved: unresolved.length };
}

function fetchReviewThreads(repo: string, number: JsonValue) {
  const [owner, name] = repo.split("/");
  const query = `
    query($owner: String!, $name: String!, $number: Int!) {
      repository(owner: $owner, name: $name) {
        pullRequest(number: $number) {
          reviewThreads(first: 100) {
            pageInfo { hasNextPage }
            nodes {
              id
              isResolved
              path
              line
              comments(first: 1) {
                nodes {
                  url
                  author { login }
                  body
                }
              }
            }
          }
        }
      }
    }
  `;
  const data = JSON.parse(
    run(
      "gh",
      [
        "api",
        "graphql",
        "-f",
        `owner=${owner}`,
        "-f",
        `name=${name}`,
        "-F",
        `number=${number}`,
        "-f",
        `query=${query}`,
      ],
      { cwd: repoRoot(), env: ghEnv() },
    ),
  );
  const threads = data?.data?.repository?.pullRequest?.reviewThreads;
  return {
    hasNextPage: Boolean(threads?.pageInfo?.hasNextPage),
    threads: (threads?.nodes ?? []).map((thread: JsonValue) => ({
      id: thread.id,
      isResolved: Boolean(thread.isResolved),
      path: thread.path,
      line: thread.line,
      url: thread.comments?.nodes?.[0]?.url ?? null,
      author: thread.comments?.nodes?.[0]?.author?.login ?? null,
      body: thread.comments?.nodes?.[0]?.body ?? "",
    })),
  };
}

function resolveReviewThread(threadId: JsonValue, cwd: JsonValue) {
  const mutation = `
    mutation($threadId: ID!) {
      resolveReviewThread(input: {threadId: $threadId}) {
        thread { id isResolved }
      }
    }
  `;
  run("gh", ["api", "graphql", "-f", `threadId=${threadId}`, "-f", `query=${mutation}`], {
    cwd,
    env: ghEnv(),
  });
}

function replacementBranchName(clusterId: string) {
  return safeBranchName(`clawsweeper/${clusterId}`);
}

function checkoutRecoverableReplacementBranch({ targetDir, branch, baseBranch }: LooseRecord) {
  if (remoteBranchExists({ targetDir, branch })) {
    run("git", ["fetch", "origin", `+refs/heads/${branch}:refs/remotes/origin/${branch}`], {
      cwd: targetDir,
    });
    run("git", ["checkout", "-B", branch, `origin/${branch}`], { cwd: targetDir });
    return { resumed: true, branch };
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
  postIssueComment(target, body);
  report.actions.push({
    ...base,
    status: "executed",
    marker,
    commented_at: new Date().toISOString(),
  });
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
  return `<!-- clawsweeper-repair-outcome:${result.cluster_id}:${runName}:#${target} -->`;
}

function issueHasCommentMarker(number: JsonValue, marker: LooseRecord) {
  const bodies = run(
    "gh",
    [
      "api",
      `repos/${result.repo}/issues/${number}/comments?per_page=100`,
      "--paginate",
      "--jq",
      ".[].body",
    ],
    {
      cwd: repoRoot(),
      env: ghEnv(),
    },
  );
  return bodies.includes(marker);
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
