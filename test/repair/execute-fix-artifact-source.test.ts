import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

test("no-op automerge repair updates outcome and re-enters router before exit", () => {
  const sourcePath = path.join(process.cwd(), "src/repair/execute-fix-artifact.ts");
  const source = fs.readFileSync(sourcePath, "utf8");
  const noPlannedBranch = source.match(
    /if \(plannedFixActions\.length === 0\) \{(?<body>[\s\S]*?)\n\}/,
  )?.groups?.body;

  assert.ok(noPlannedBranch, "expected no planned fix actions branch");
  assert.match(noPlannedBranch, /report\.reason = "no planned fix actions";/);

  const continuationIndex = noPlannedBranch.indexOf(
    "appendAutomergeRepairOutcomeComment(report, resultPath);",
  );
  const writeReportIndex = noPlannedBranch.indexOf("writeReport(report, resultPath);");
  const exitIndex = noPlannedBranch.indexOf("process.exit(0);");

  assert.notEqual(continuationIndex, -1);
  assert.notEqual(writeReportIndex, -1);
  assert.notEqual(exitIndex, -1);
  assert.ok(
    continuationIndex < writeReportIndex && writeReportIndex < exitIndex,
    "no-op repair must update automerge continuation before writing the terminal report and exiting",
  );
});

test("repair source branch writability preflight runs before expensive repair preflights", () => {
  const sourcePath = path.join(process.cwd(), "src/repair/execute-fix-artifact.ts");
  const source = fs.readFileSync(sourcePath, "utf8");

  const branchPreflightIndex = source.indexOf(
    "const sourceBranchPreflight = preflightRepairSourceBranchWrite(fixArtifact);",
  );
  const checkoutIndex = source.indexOf("ensureTargetCheckout(result.repo, targetDir);");
  const baseCheckoutIndex = source.indexOf(
    "checkoutTrustedTargetBase(targetDir, targetBaseBranch);",
  );
  const freezeValidationIndex = source.indexOf("validation_commands: requiredValidationCommands(");
  const trustedDependenciesIndex = source.indexOf("prepareTrustedTargetDependencies(");
  const validationIndex = source.indexOf("preflightTargetValidationPlan(");
  const codexPreflightIndex = source.indexOf("const writePreflight = runCodexWritePreflight();");

  assert.notEqual(branchPreflightIndex, -1);
  assert.notEqual(checkoutIndex, -1);
  assert.notEqual(baseCheckoutIndex, -1);
  assert.notEqual(freezeValidationIndex, -1);
  assert.notEqual(trustedDependenciesIndex, -1);
  assert.notEqual(validationIndex, -1);
  assert.notEqual(codexPreflightIndex, -1);
  assert.ok(
    branchPreflightIndex < checkoutIndex &&
      checkoutIndex < baseCheckoutIndex &&
      baseCheckoutIndex < freezeValidationIndex &&
      freezeValidationIndex < trustedDependenciesIndex &&
      trustedDependenciesIndex < validationIndex &&
      validationIndex < codexPreflightIndex,
    "live source-branch writability must be resolved before checkout, validation planning, and Codex write preflight",
  );
  assert.match(
    source.slice(checkoutIndex, validationIndex),
    /try \{\s+prepareTrustedTargetDependencies\([\s\S]*?if \(!isBlockedFixError\(error\)\) throw error;[\s\S]*?writeReport\(report, resultPath\);/,
  );
});

test("merged source replacement skip runs before publishing replacement PRs", () => {
  const sourcePath = path.join(process.cwd(), "src/repair/execute-fix-artifact.ts");
  const source = fs.readFileSync(sourcePath, "utf8");

  const preparedStart = source.indexOf("function openReplacementPrFromPreparedRepairCheckout(");
  const preparedEnd = source.indexOf("function executeReplacementBranch(", preparedStart);
  assert.notEqual(preparedStart, -1);
  assert.notEqual(preparedEnd, -1);
  const preparedReplacement = source.slice(preparedStart, preparedEnd);
  assert.match(
    preparedReplacement,
    /mergedReplacementSourcePr\(\{ fixArtifact, sourcePr, targetDir \}\)/,
  );
  assert.match(preparedReplacement, /skipMergedSourceReplacementWithoutDiff\(\{/);

  const preparedSkipIndex = preparedReplacement.indexOf("skipMergedSourceReplacementWithoutDiff({");
  const preparedPushIndex = preparedReplacement.indexOf(
    "pushRecoverableBranch({ targetDir, branch });",
  );
  const preparedCreateIndex = preparedReplacement.indexOf('"pr",\n        "create"');
  assert.notEqual(preparedSkipIndex, -1);
  assert.notEqual(preparedPushIndex, -1);
  assert.notEqual(preparedCreateIndex, -1);
  assert.ok(
    preparedSkipIndex < preparedPushIndex && preparedPushIndex < preparedCreateIndex,
    "merged-source no-diff replacement skip must run before branch push and PR creation",
  );

  const helperStart = source.indexOf("function skipMergedSourceReplacementWithoutDiff(");
  const helperEnd = source.indexOf("function labelReplacementPullRequest(", helperStart);
  assert.notEqual(helperStart, -1);
  assert.notEqual(helperEnd, -1);
  const helper = source.slice(helperStart, helperEnd);
  assert.match(helper, /if \(!mergedSource\) return null;/);
  assert.match(helper, /if \(branchHasBaseDiff\(\{ targetDir, baseBranch \}\)\) return null;/);
  assert.match(
    helper,
    /reason: "source PR already merged and replacement branch has no changes versus base"/,
  );
});

test("Codex repair output redacts secrets without corrupting the public model alias", () => {
  const sourcePath = path.join(process.cwd(), "src/repair/execute-fix-artifact.ts");
  const source = fs.readFileSync(sourcePath, "utf8");

  assert.match(source, /result\.stdout = sanitizeCodexOutput/);
  assert.match(source, /result\.stderr = sanitizeCodexOutput/);
  assert.match(source, /result\.error\.message = sanitizeCodexOutput/);
  assert.match(source, /codexOutputLastMessagePath/);
  assert.match(source, /sanitizeCodexOutput\(fs\.readFileSync\(source, "utf8"\)\)/);
  assert.match(source, /return redactSecrets\(String\(value \?\? ""\)\)/);
  assert.doesNotMatch(source, /redactSecrets\(String\(value \?\? ""\), model/);
});

test("explicit fix base branch overrides repository configuration", () => {
  const sourcePath = path.join(process.cwd(), "src/repair/execute-fix-artifact.ts");
  const source = fs.readFileSync(sourcePath, "utf8");

  assert.match(
    source,
    /process\.env\.CLAWSWEEPER_FIX_BASE_BRANCH \?\?\s+resolveTargetBaseBranch\(result\.repo, DEFAULT_BASE_BRANCH\)/,
  );
});

test("executor requeues only transport failures tagged by a Codex subprocess", () => {
  const sourcePath = path.join(process.cwd(), "src/repair/execute-fix-artifact.ts");
  const source = fs.readFileSync(sourcePath, "utf8");

  assert.match(source, /const retryableTransport = isRetryableCodexExecutionError\(error\);/);
  assert.match(source, /codexTransportFailure = true;/);
  assert.doesNotMatch(
    source,
    /const retryableTransport = isRetryableCodexTransportError\(String\(error\?\.message/,
  );
  assert.match(
    source,
    /"retryable_transport" in writePreflight &&\s+writePreflight\.retryable_transport === true/,
  );
});

test("executor records missing validation gates as durable blocked outcomes", () => {
  const sourcePath = path.join(process.cwd(), "src/repair/execute-fix-artifact.ts");
  const source = fs.readFileSync(sourcePath, "utf8");

  assert.ok(
    source.includes(
      "validation_(?:command_missing|script_missing|package_manager_unsupported|side_effect_detected|setup_side_effect_detected|dependency_prepare_failed|dependency_state_changed|dependency_base_changed|definition_changed|definition_untrusted|cache_path_untrusted|path_untrusted|path_invalid|sandbox_unavailable",
    ),
  );
  assert.doesNotMatch(source, /prepareTargetToolchain\(targetDir/);
  assert.match(source, /prepareBranchTargetDependencies\(\s+targetDir/);
});

test("final base synchronization never accepts an unvalidated reconciled head", () => {
  const sourcePath = path.join(process.cwd(), "src/repair/execute-fix-artifact.ts");
  const source = fs.readFileSync(sourcePath, "utf8");
  const loopStart = source.indexOf(
    "for (let attempt = 1; attempt <= maxFinalBaseSyncAttempts; attempt += 1)",
  );
  const loopEnd = source.indexOf("const finalCheckpoint = commitCheckpointIfNeeded(", loopStart);
  const finalSyncLoop = source.slice(loopStart, loopEnd);

  assert.notEqual(loopStart, -1);
  assert.notEqual(loopEnd, -1);
  assert.match(finalSyncLoop, /codexReview = validateAndReviewLoop\(\{/);
  assert.match(finalSyncLoop, /reconcileLatestBaseBeforePush\(\{/);
  assert.match(finalSyncLoop, /validation_base_sync_exhausted/);
  const exhaustionIndex = finalSyncLoop.indexOf("validation_base_sync_exhausted");
  const reconcileCheckpointIndex = finalSyncLoop.indexOf(
    "const checkpoint = commitCheckpointIfNeeded({",
    finalSyncLoop.indexOf("const sync = reconcileLatestBaseBeforePush({"),
  );
  assert.notEqual(exhaustionIndex, -1);
  assert.notEqual(reconcileCheckpointIndex, -1);
  assert.ok(
    exhaustionIndex < reconcileCheckpointIndex,
    "base-sync exhaustion must be detected before committing or pushing the unvalidated head",
  );
  assert.match(
    finalSyncLoop,
    /preparePinnedTrustedTargetBase\(\{\s+fixArtifact,\s+targetDir,\s+baseBranch,\s+fetchBase: false,/,
  );
  assert.doesNotMatch(finalSyncLoop, /accepted_after_final_sync/);
});

test("branch dependency trust checks run only inside post-edit validation", () => {
  const sourcePath = path.join(process.cwd(), "src/repair/execute-fix-artifact.ts");
  const source = fs.readFileSync(sourcePath, "utf8");
  const repairStart = source.indexOf("function executeRepairBranch(");
  const repairEnd = source.indexOf("function pushRepairBranchAndUpdateStatus(", repairStart);
  const replacementStart = source.indexOf("function executeReplacementBranch(");
  const replacementEnd = source.indexOf("function mergedReplacementSourcePr(", replacementStart);

  assert.notEqual(repairStart, -1);
  assert.notEqual(repairEnd, -1);
  assert.notEqual(replacementStart, -1);
  assert.notEqual(replacementEnd, -1);
  assert.doesNotMatch(source.slice(repairStart, repairEnd), /prepareBranchTargetDependencies\(/);
  assert.doesNotMatch(
    source.slice(replacementStart, replacementEnd),
    /prepareBranchTargetDependencies\(/,
  );
});

test("fallback replacement checkouts prepare the trusted base before branch work", () => {
  const sourcePath = path.join(process.cwd(), "src/repair/execute-fix-artifact.ts");
  const source = fs.readFileSync(sourcePath, "utf8");
  const fallbackStart = source.indexOf("function prepareFallbackReplacementCheckout(");
  const fallbackEnd = source.indexOf("function executeReplacementBranch(", fallbackStart);

  assert.notEqual(fallbackStart, -1);
  assert.notEqual(fallbackEnd, -1);
  const fallback = source.slice(fallbackStart, fallbackEnd);
  const checkoutIndex = fallback.indexOf(
    "checkoutTrustedTargetBase(fallbackTargetDir, targetBaseBranch);",
  );
  const preparationIndex = fallback.indexOf("prepareTrustedTargetDependencies(");
  const returnIndex = fallback.indexOf("return fallbackTargetDir;");

  assert.notEqual(checkoutIndex, -1);
  assert.notEqual(preparationIndex, -1);
  assert.notEqual(returnIndex, -1);
  assert.match(
    fallback,
    /requiredValidationCommands\(\s+requestedValidationCommands,\s+fallbackTargetDir,/,
  );
  assert.match(
    fallback,
    /rememberPreparedTrustedTargetBase\(fallbackTargetDir, currentHead\(fallbackTargetDir\)\)/,
  );
  assert.ok(
    checkoutIndex < preparationIndex && preparationIndex < returnIndex,
    "fallback replacement checkout must align to and prepare the trusted base before use",
  );
});

test("repair paths pin trusted preparation to the base used for rebase", () => {
  const sourcePath = path.join(process.cwd(), "src/repair/execute-fix-artifact.ts");
  const source = fs.readFileSync(sourcePath, "utf8");
  const repairStart = source.indexOf("function executeRepairBranch(");
  const repairEnd = source.indexOf("function pushRepairBranchAndUpdateStatus(", repairStart);
  const replacementStart = source.indexOf("function executeReplacementBranch(");
  const replacementEnd = source.indexOf("function mergedReplacementSourcePr(", replacementStart);

  for (const section of [
    source.slice(repairStart, repairEnd),
    source.slice(replacementStart, replacementEnd),
  ]) {
    const preparationIndex = section.indexOf("preparePinnedTrustedTargetBase({");
    const rebaseIndex = section.indexOf(
      "rebaseOntoBase({ targetDir, baseBranch, fetchBase: false })",
    );
    assert.notEqual(preparationIndex, -1);
    assert.notEqual(rebaseIndex, -1);
    assert.ok(preparationIndex < rebaseIndex);
    assert.match(section, /rebaseResult\.base_sha !== preparedBaseSha/);
  }

  const preparationStart = source.indexOf("function preparePinnedTrustedTargetBase(");
  const preparationEnd = source.indexOf("function executeReplacementBranch(", preparationStart);
  const preparation = source.slice(preparationStart, preparationEnd);
  assert.match(
    preparation,
    /if \(resolveTargetRepoToolchain\(result\.repo\)\.requiresFullHistory\) \{\s+ensureFullHistory\(targetDir\);/,
  );
  assert.match(
    preparation,
    /preparedTrustedBaseShas\.get\(path\.resolve\(targetDir\)\) === preparedBaseSha/,
  );
  assert.match(
    preparation,
    /requiredValidationCommands\(\s+requestedValidationCommands,\s+targetDir,/,
  );
  assert.doesNotMatch(
    preparation,
    /requiredValidationCommands\(\s+fixArtifact\.validation_commands/,
  );
});

test("validation loops refresh trusted preparation after Codex writes", () => {
  const sourcePath = path.join(process.cwd(), "src/repair/execute-fix-artifact.ts");
  const source = fs.readFileSync(sourcePath, "utf8");
  const loopStart = source.indexOf("function validateAndReviewLoop(");
  const loopEnd = source.indexOf("function runDiffCheck(", loopStart);
  const section = source.slice(loopStart, loopEnd);

  assert.match(
    section,
    /for \(let attempt = 1; attempt <= maxReviewAttempts; attempt \+= 1\) \{\s+preparePinnedTrustedTargetBase\(\{[\s\S]*?fetchBase: false,[\s\S]*?\}\);\s+const validationPlan/,
  );
  assert.match(
    section,
    /runCodexReviewFix\(\{[\s\S]*?onReviewFix\?\.\(`\$\{attempt\}-final`\);\s+preparePinnedTrustedTargetBase\(\{[\s\S]*?fetchBase: false,/,
  );
});

test("Codex writes invalidate all trusted preparation under restricted sandboxes", () => {
  const sourcePath = path.join(process.cwd(), "src/repair/execute-fix-artifact.ts");
  const source = fs.readFileSync(sourcePath, "utf8");

  assert.match(source, /const defaultCodexWriteSandbox = "workspace-write";/);
  assert.match(source, /const defaultCodexReviewSandbox = "read-only";/);
  assert.match(
    source,
    /function invalidatePreparedTrustedTargetBase\(targetDir: string\) \{\s+invalidatePreparedTargetDependencies\(targetDir\);\s+preparedTrustedBaseShas\.delete\(path\.resolve\(targetDir\)\);/,
  );
  assert.equal(
    [...source.matchAll(/invalidatePreparedTrustedTargetBase\(targetDir\);/g)].length,
    4,
  );
});
