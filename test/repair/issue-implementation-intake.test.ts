import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { readFileSync } from "node:fs";

import {
  parseReviewReport,
  reportOnlyDecision,
  viableReviewedStateBlockers,
} from "../../dist/repair/issue-implementation-intake.js";
import {
  renderIssueImplementationJob,
  REVIEW_REPRODUCIBLE_BUG_TRIGGER_SOURCE,
  REVIEW_VIABLE_ISSUE_TRIGGER_SOURCE,
  REVIEW_VISION_FIT_TRIGGER_SOURCE,
} from "../../dist/repair/comment-router-core.js";

function report(overrides = {}) {
  const fields = {
    number: "123",
    repository: "openclaw/openclaw",
    type: "issue",
    title: JSON.stringify("Narrow issue"),
    state_at_review: "open",
    item_updated_at: "2026-06-10T00:00:00Z",
    item_body_sha256: createHash("sha256").update("").digest("hex"),
    reviewed_at: "2026-06-10T00:01:00Z",
    review_issue_body_truncated: "false",
    review_comments_truncated: "false",
    review_timeline_truncated: "false",
    review_status: "complete",
    decision: "keep_open",
    close_reason: "none",
    confidence: "high",
    work_candidate: "queue_fix_pr",
    work_confidence: "high",
    work_validation: JSON.stringify(["pnpm test src/example.test.ts"]),
    work_likely_files: JSON.stringify(["src/example.ts", "src/example.test.ts"]),
    work_cluster_refs: JSON.stringify(["#123"]),
    labels: JSON.stringify(["bug"]),
    item_category: "bug",
    reproduction_status: "reproduced",
    reproduction_confidence: "high",
    requires_new_feature: "false",
    requires_new_config_option: "false",
    requires_product_decision: "false",
    ...overrides,
  };
  const frontmatter = Object.entries(fields)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  return `---\n${frontmatter}\n---\n\n## Security Review\n\nStatus: not_applicable\n\nSummary: No patch security review is needed for this issue.\n\n## Repair Work Prompt\n\nFix the reproduced existing-behavior bug and add a regression test.\n`;
}

test("strict reproducible bug reports are eligible for implementation intake", () => {
  const markdown = report();
  const parsed = parseReviewReport(markdown);
  const decision = reportOnlyDecision({
    targetRepo: "openclaw/openclaw",
    report: parsed,
    reportMarkdown: markdown,
  });

  assert.equal(decision.shouldRepair, true);
  assert.equal(decision.status, "queued_for_repair");
});

test("implementation intake rejects feature and config-option work", () => {
  for (const overrides of [
    { item_category: "feature" },
    { requires_new_feature: "true" },
    { requires_new_config_option: "true" },
    { requires_product_decision: "true" },
    { reproduction_status: "source_reproducible" },
  ]) {
    const markdown = report(overrides);
    const decision = reportOnlyDecision({
      targetRepo: "openclaw/openclaw",
      report: parseReviewReport(markdown),
      reportMarkdown: markdown,
    });

    assert.equal(decision.shouldRepair, false);
  }
});

test("implementation intake override permits soft blockers", () => {
  const markdown = report({
    item_category: "feature",
    requires_new_feature: "true",
    work_validation: JSON.stringify([]),
  });
  const decision = reportOnlyDecision({
    targetRepo: "openclaw/openclaw",
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    operatorOverride: true,
  });

  assert.equal(decision.shouldRepair, true);
  assert.equal(decision.status, "override_queued_for_repair");
  assert.equal(decision.blockerClass, "soft");
  assert.equal(decision.operatorOverride, true);
  assert.match(decision.reason, /item category is feature/);
});

test("implementation intake override routes hard blockers to handoff", () => {
  const markdown = report({
    labels: JSON.stringify(["security"]),
  });
  const decision = reportOnlyDecision({
    targetRepo: "openclaw/openclaw",
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    operatorOverride: true,
  });

  assert.equal(decision.shouldRepair, true);
  assert.equal(decision.status, "override_handoff");
  assert.equal(decision.blockerClass, "hard");
  assert.equal(decision.operatorOverride, true);
  assert.match(decision.reason, /protected label present/);
});

test("vision-fit reports are eligible for sibling implementation intake", () => {
  const markdown = report({
    item_category: "feature",
    reproduction_status: "not_applicable",
    reproduction_confidence: "low",
    requires_new_feature: "true",
    auto_implementation_candidate: "vision_fit",
    vision_fit: "aligned",
    vision_fit_evidence: JSON.stringify([
      "VISION.md lists setup reliability and first-run UX as current priorities.",
    ]),
    implementation_complexity: "small",
  });
  const decision = reportOnlyDecision({
    targetRepo: "openclaw/openclaw",
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "vision_fit",
  });

  assert.equal(decision.shouldRepair, true);
  assert.equal(decision.status, "queued_for_repair");
});

test("vision-fit intake rejects broad or unaligned issue work", () => {
  for (const overrides of [
    { auto_implementation_candidate: "none" },
    { vision_fit: "rejected" },
    { implementation_complexity: "medium" },
    { requires_product_decision: "true" },
    { vision_fit_evidence: JSON.stringify([]) },
  ]) {
    const markdown = report({
      item_category: "feature",
      reproduction_status: "not_applicable",
      reproduction_confidence: "low",
      requires_new_feature: "true",
      auto_implementation_candidate: "vision_fit",
      vision_fit: "aligned",
      vision_fit_evidence: JSON.stringify(["VISION.md supports this narrow direction."]),
      implementation_complexity: "small",
      ...overrides,
    });
    const decision = reportOnlyDecision({
      targetRepo: "openclaw/openclaw",
      report: parseReviewReport(markdown),
      reportMarkdown: markdown,
      candidateKind: "vision_fit",
    });

    assert.equal(decision.shouldRepair, false);
  }
});

test("viable generic-repository issues are eligible for autonomous implementation", () => {
  const markdown = report({
    repository: "openclaw/clawsweeper",
    item_category: "cleanup",
    reproduction_status: "not_applicable",
    reproduction_confidence: "low",
    implementation_complexity: "small",
    vision_fit: "unknown",
  });
  const decision = reportOnlyDecision({
    targetRepo: "openclaw/clawsweeper",
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
    itemNumber: 123,
  });

  assert.equal(decision.shouldRepair, true);
  assert.equal(decision.status, "queued_for_repair");
});

test("viable intake binds the live issue to the reviewed state", () => {
  const markdown = report({
    repository: "openclaw/clawsweeper",
    item_category: "cleanup",
    reproduction_status: "not_applicable",
    reproduction_confidence: "low",
    implementation_complexity: "small",
    vision_fit: "unknown",
  });
  const parsed = parseReviewReport(markdown);
  const issue = {
    title: "Narrow issue",
    body: "",
    labels: [{ name: "bug" }],
    updated_at: "2026-06-10T00:00:00Z",
  };

  assert.deepEqual(
    viableReviewedStateBlockers({
      report: parsed,
      issue,
      comments: [],
      itemNumber: 123,
    }),
    [],
  );
  assert.deepEqual(
    viableReviewedStateBlockers({
      report: parsed,
      issue: { ...issue, updated_at: "2026-06-10T00:02:00Z" },
      comments: [
        {
          body: "<!-- clawsweeper-review item=123 -->",
          user: { login: "clawsweeper[bot]" },
          updated_at: "2026-06-10T00:02:00Z",
        },
      ],
      itemNumber: 123,
    }),
    [],
  );
  assert.match(
    viableReviewedStateBlockers({
      report: parsed,
      issue: { ...issue, updated_at: "2026-06-10T00:03:00Z" },
      comments: [
        {
          body: "Please implement a different behavior.",
          user: { login: "reporter" },
          updated_at: "2026-06-10T00:03:00Z",
        },
      ],
      itemNumber: 123,
    }).join("; "),
    /changed since review/,
  );
  assert.match(
    viableReviewedStateBlockers({
      report: parsed,
      issue: { ...issue, body: "Changed request" },
      comments: [],
      itemNumber: 123,
    }).join("; "),
    /body changed since review/,
  );
});

test("viable intake decodes quoted report titles before live-state comparison", () => {
  const title = 'Fix "quoted" output on C:\\temp';
  const markdown = report({
    repository: "openclaw/clawsweeper",
    title: JSON.stringify(title),
    item_category: "cleanup",
    reproduction_status: "not_applicable",
    reproduction_confidence: "low",
    implementation_complexity: "small",
    vision_fit: "unknown",
  });

  assert.deepEqual(
    viableReviewedStateBlockers({
      report: parseReviewReport(markdown),
      issue: {
        title,
        body: "",
        labels: [{ name: "bug" }],
        updated_at: "2026-06-10T00:00:00Z",
      },
      comments: [],
      itemNumber: 123,
    }),
    [],
  );
});

test("implementation intake binds the report to the requested issue number", () => {
  const markdown = report({
    number: "999",
    repository: "openclaw/clawsweeper",
    item_category: "cleanup",
    reproduction_status: "not_applicable",
    reproduction_confidence: "low",
    implementation_complexity: "small",
    vision_fit: "unknown",
  });
  const decision = reportOnlyDecision({
    targetRepo: "openclaw/clawsweeper",
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
    itemNumber: 123,
  });

  assert.equal(decision.shouldRepair, false);
  assert.match(decision.reason, /report item number is 999/);
});

test("viable intake blocks structured security concerns", () => {
  const markdown = report({
    repository: "openclaw/clawsweeper",
    item_category: "bug",
    implementation_complexity: "small",
    vision_fit: "unknown",
  }).replace("Status: not_applicable", "Status: needs_attention");
  const decision = reportOnlyDecision({
    targetRepo: "openclaw/clawsweeper",
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
  });

  assert.equal(decision.shouldRepair, false);
  assert.match(decision.reason, /security-sensitive signal/);
});

test("structured non-security review summaries do not trigger the fallback scanner", () => {
  const markdown = report({
    repository: "openclaw/clawsweeper",
    item_category: "cleanup",
    reproduction_status: "not_applicable",
    reproduction_confidence: "low",
    implementation_complexity: "small",
    vision_fit: "unknown",
  }).replace(
    "Summary: No patch security review is needed for this issue.",
    "Summary: No patch security review is needed for this issue cleanup decision.",
  );
  const decision = reportOnlyDecision({
    targetRepo: "openclaw/clawsweeper",
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
  });

  assert.equal(decision.shouldRepair, true);
});

test("viable intake cannot bypass protected repository lanes", () => {
  for (const targetRepo of [
    "openclaw/openclaw",
    "openclaw/clawhub",
    "OpenClaw/OpenClaw",
    "OPENCLAW/CLAWHUB",
  ]) {
    const markdown = report({
      repository: targetRepo,
      item_category: "cleanup",
      reproduction_status: "not_applicable",
      reproduction_confidence: "low",
      implementation_complexity: "small",
      vision_fit: "unknown",
    });
    const decision = reportOnlyDecision({
      targetRepo,
      report: parseReviewReport(markdown),
      reportMarkdown: markdown,
      candidateKind: "viable",
      operatorOverride: true,
    });

    assert.equal(decision.shouldRepair, false);
    assert.equal(decision.status, "not_eligible");
    assert.match(decision.reason, /general viable implementation is disabled/);
  }
});

test("viable generic-repository intake rejects broad or incoherent work", () => {
  for (const overrides of [
    { implementation_complexity: "medium" },
    { requires_product_decision: "true" },
    { vision_fit: "rejected" },
    { work_likely_files: JSON.stringify([]) },
    { item_category: "security" },
    { review_issue_body_truncated: "true" },
    { review_comments_truncated: "true" },
    { review_timeline_truncated: "true" },
  ]) {
    const markdown = report({
      repository: "openclaw/clawsweeper",
      item_category: "cleanup",
      reproduction_status: "not_applicable",
      reproduction_confidence: "low",
      implementation_complexity: "small",
      vision_fit: "unknown",
      ...overrides,
    });
    const decision = reportOnlyDecision({
      targetRepo: "openclaw/clawsweeper",
      report: parseReviewReport(markdown),
      reportMarkdown: markdown,
      candidateKind: "viable",
    });

    assert.equal(decision.shouldRepair, false);
  }
});

test("review-triggered issue implementation jobs require autogenerated PR labels", () => {
  const job = renderIssueImplementationJob({
    repo: "openclaw/openclaw",
    issueNumber: 123,
    title: "Crash on existing command",
    triggerSource: REVIEW_REPRODUCIBLE_BUG_TRIGGER_SOURCE,
    reviewReportPath: "records/openclaw-openclaw/items/123.md",
    strictBugOnly: true,
  });

  assert.match(job, /trigger_source: review_reproducible_bug/);
  assert.match(job, /required_pr_labels:\n  - clawsweeper:autogenerated/);
  assert.match(job, /Treat it as bug-only/);
  assert.match(job, /new config\s+option/);
});

test("vision-fit issue implementation jobs carry vision guardrails", () => {
  const job = renderIssueImplementationJob({
    repo: "openclaw/openclaw",
    issueNumber: 124,
    title: "Improve first-run setup",
    triggerSource: REVIEW_VISION_FIT_TRIGGER_SOURCE,
    reviewReportPath: "records/openclaw-openclaw/items/124.md",
    visionFit: true,
  });

  assert.match(job, /trigger_source: review_vision_fit/);
  assert.match(job, /vision-fit issue lane/);
  assert.match(job, /target repository VISION\.md/);
  assert.match(job, /clawsweeper:autogenerated/);
});

test("viable issue jobs arm generated PRs for bounded automerge", () => {
  const job = renderIssueImplementationJob({
    repo: "openclaw/clawsweeper",
    issueNumber: 125,
    title: "Narrow viable improvement",
    triggerSource: REVIEW_VIABLE_ISSUE_TRIGGER_SOURCE,
    reviewReportPath: "records/openclaw-clawsweeper/items/125.md",
    generalViable: true,
    automergeGeneratedPr: true,
    sourceIssueSnapshotSha256: "a".repeat(64),
    sourceIssueUpdatedAt: "2026-06-10T00:00:00Z",
  });

  assert.match(job, /trigger_source: review_viable_issue/);
  assert.match(job, /automerge_generated_pr: true/);
  assert.match(job, /source_issue_repo: openclaw\/clawsweeper/);
  assert.match(job, /source_issue_number: 125/);
  assert.match(job, /source_issue_snapshot_sha256: a{64}/);
  assert.match(job, /source_issue_updated_at: "2026-06-10T00:00:00Z"/);
  const requiredLabels = job.match(/required_pr_labels:\n((?:  - .+\n)+)/)?.[1] ?? "";
  assert.doesNotMatch(requiredLabels, /clawsweeper:automerge/);
  assert.match(job, /coherent, useful, and still applicable/);
  assert.match(job, /Closes https:\/\/github\.com\/openclaw\/clawsweeper\/issues\/125/);
  assert.match(job, /bounded exact-head ClawSweeper\s+automerge loop/);
});

test("viable intake blocks malformed reports with deterministic security text", () => {
  const markdown = report({
    repository: "openclaw/clawsweeper",
    item_category: "bug",
    implementation_complexity: "small",
    vision_fit: "unknown",
  }).replace(
    "Status: not_applicable\n\nSummary: No patch security review is needed for this issue.",
    "Summary: Investigate CVE-2026-12345 before implementation.",
  );
  const decision = reportOnlyDecision({
    targetRepo: "openclaw/clawsweeper",
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
  });

  assert.equal(decision.shouldRepair, false);
  assert.match(decision.reason, /security-sensitive signal/);
});

test("issue implementation PR executor applies autogenerated label", () => {
  const source = readFileSync("src/repair/execute-fix-artifact.ts", "utf8");

  assert.match(source, /AUTOGENERATED_LABEL/);
  assert.match(source, /job\.frontmatter\.source === "issue_implementation"/);
  assert.match(
    source,
    /existingPrUrl && job\.frontmatter\.automerge_generated_pr === true[\s\S]*?"pr",\s*"edit"/,
  );
  assert.match(source, /sourceIssueMarker: generatedIssueSourceMarker\(\)/);
  assert.match(source, /renderGeneratedIssueSourceMarker/);
});

test("issue implementation intake checks generated branches through REST", () => {
  const source = readFileSync("src/repair/issue-implementation-intake.ts", "utf8");

  assert.match(source, /repos\/\$\{owner\}\/\$\{name\}\/pulls/);
  assert.match(source, /head=\$\{owner\}:\$\{branch\}/);
  assert.match(source, /"search\/issues",\s*"--method",\s*"GET"/);
  assert.match(source, /openclaw\/clawsweeper-state"\s*\?\s*"state"\s*:\s*"main"/);
  assert.match(source, /blob\/\$\{reportBranch\(reportRepo\)\}/);
  assert.match(source, /`ref=\$\{reportBranch\(reportRepo\)\}`/);
  assert.doesNotMatch(source, /"pr", "list"/);
});

test("repair executor uses retryable blobless target checkout", () => {
  const source = readFileSync("src/repair/execute-fix-artifact.ts", "utf8");

  assert.match(source, /cloneTargetCheckout/);
  assert.match(source, /--filter=blob:none/);
  assert.match(source, /CLAWSWEEPER_CHECKOUT_CLONE_ATTEMPTS/);
  assert.match(source, /CLAWSWEEPER_CHECKOUT_CLONE_TIMEOUT_MS/);
});

test("comment router default allows one same-head infrastructure retry", () => {
  const source = readFileSync("src/repair/config.ts", "utf8");

  assert.match(source, /CLAWSWEEPER_MAX_REPAIRS_PER_HEAD \?\? 2/);
});

test("comment router rewrites existing issue implementation jobs on override", () => {
  const source = readFileSync("src/repair/comment-router.ts", "utf8");

  assert.match(source, /command\.operator_override === true/);
  assert.match(source, /fs\.writeFileSync\(\s*absolute,\s*renderIssueImplementationJob/s);
  assert.match(source, /issueImplementationJobOptions\(command\)/);
  assert.match(source, /statusDetail = "written"/);
});

test("comment router classifies protected issue build overrides as hard", () => {
  const source = readFileSync("src/repair/comment-router.ts", "utf8");

  assert.match(source, /issueImplementationOverrideBlockerClass\(command\)/);
  assert.match(source, /target\.kind === "issue" && target\.job_path/);
  assert.match(source, /issueImplementationLinkedPrSignal\(target\)/);
  assert.match(source, /issueLinkedOpenPrReferences\(issue, issueNumber\)/);
  assert.match(source, /open_prs: linkedOpenPrs/);
  assert.match(source, /addPullRequestReferenceNumbersFromText/);
  assert.match(source, /searchOpenPullRequestsMentioningIssue\(Number\(issueNumber\)\)/);
  assert.match(source, /target\.body/);
  assert.match(source, /target\.locked === true/);
  assert.match(source, /labels\.some\(isIssueImplementationProtectedLabel\)/);
  assert.match(source, /overrideBlockerClass,\n\s+overrideAction: command\.operator_override/);
  assert.match(source, /prepare a non-mutating handoff for this issue/);
});

test("comment router revalidates generated issue state immediately before merge", () => {
  const source = readFileSync("src/repair/comment-router.ts", "utf8");
  const executeStart = source.indexOf("function executeAutomerge(");
  const executeEnd = source.indexOf("function generatedIssueSourceMergeBlockReason(", executeStart);
  const executeBody = source.slice(executeStart, executeEnd);

  const gateIndex = executeBody.indexOf("automergeGateBlockReason(process.env)");
  const sourceValidationIndex = executeBody.indexOf(
    "generatedIssueSourceMergeBlockReason(command, view)",
  );
  const mergeIndex = executeBody.indexOf("buildAutomergeMergeArgs({");
  assert.ok(gateIndex >= 0);
  assert.ok(sourceValidationIndex >= 0);
  assert.ok(sourceValidationIndex < gateIndex);
  assert.ok(mergeIndex > sourceValidationIndex);
  assert.match(source, /generatedIssueClosingReferenceBlockReason\(\{/);
  assert.match(source, /command\.target\?\.source_issue_job_path/);
  assert.match(source, /effectiveJobPath/);
  assert.match(source, /issues\/\$\{sourceNumber\}\/timeline\?per_page=100/);
  assert.match(source, /pullRequestsCrossReferencedByIssueTimeline/);
  assert.match(source, /"closingIssuesReferences"/);
  assert.match(source, /ghPaged<LooseRecord>\(\s*`repos\/\$\{targetRepo\}\/issues/);
  assert.match(source, /openPullRequestsMentioningSourceIssue\(metadata\.issueNumber\)/);
});

test("general viable and protected OpenClaw issue lanes are mutually exclusive", () => {
  const workflow = readFileSync(".github/workflows/sweep.yml", "utf8");

  assert.match(
    workflow,
    /Dispatch reproducible bug implementation candidates[\s\S]*?target_repo == 'openclaw\/openclaw'/,
  );
  assert.match(
    workflow,
    /Dispatch vision-fit implementation candidates[\s\S]*?target_repo == 'openclaw\/openclaw'/,
  );
  assert.match(
    workflow,
    /Dispatch viable implementation candidates[\s\S]*?normalized_target_repo[\s\S]*?openclaw\/openclaw[\s\S]*?openclaw\/clawhub/,
  );
  assert.match(
    workflow,
    /Dispatch viable issue implementation[\s\S]*?normalized_target_repo[\s\S]*?openclaw\/openclaw[\s\S]*?openclaw\/clawhub/,
  );
});

test("generated issue PRs adopt a dedicated automerge repair job", () => {
  const source = readFileSync("src/repair/comment-router.ts", "utf8");

  assert.match(source, /hasLabel\(\{ labels \}, AUTOMERGE_LABEL\)/);
  assert.match(source, /isGeneratedIssueImplementationJob\(clawsweeperJobPath\)/);
  assert.match(source, /frontmatter\.automerge_generated_pr === true/);
  assert.match(source, /source_issue_snapshot_sha256/);
  assert.match(
    source,
    /const jobPath = generatedIssueAutomerge\s*\?\s*adoptedJobPath\s*:\s*\(clawsweeperJobPath \?\? adoptedJobPath\)/,
  );
  assert.match(
    source,
    /source_issue_job_path: generatedIssueAutomerge \? clawsweeperJobPath : null/,
  );
  assert.match(source, /generatedIssueAutomergeSourceMetadata\(command\)/);
  assert.match(source, /generated_issue_branch: generatedIssueBranch/);
  assert.match(source, /generated PR source issue metadata is unavailable/);
});

test("missing issue implementation recovery is disabled for viable jobs only", () => {
  const source = readFileSync("scripts/restore-repair-job.sh", "utf8");
  const intakeWorkflow = readFileSync(
    ".github/workflows/repair-issue-implementation-intake.yml",
    "utf8",
  );
  const workerWorkflow = readFileSync(".github/workflows/repair-cluster-worker.yml", "utf8");
  const requeueSource = readFileSync("src/repair/requeue-job.ts", "utf8");

  assert.match(source, /restore_issue_implementation_job/);
  assert.match(source, /RESTORE_ISSUE_IMPLEMENTATION_JOB:-true/);
  assert.match(source, /automerge_generated_pr: false/);
  assert.match(
    intakeWorkflow,
    /candidate_kind.*viable[\s\S]*?--restore-issue-implementation-job false/,
  );
  assert.match(workerWorkflow, /restore_issue_implementation_job:[\s\S]*?default: true/);
  assert.match(
    workerWorkflow,
    /RESTORE_ISSUE_IMPLEMENTATION_JOB: \$\{\{ inputs\.restore_issue_implementation_job \}\}/,
  );
  assert.match(
    workerWorkflow,
    /repair:requeue[\s\S]*?--restore-issue-implementation-job "\$\{\{ inputs\.restore_issue_implementation_job \}\}"/,
  );
  assert.match(requeueSource, /job\.frontmatter\.automerge_generated_pr !== true/);
  assert.match(
    requeueSource,
    /restore_issue_implementation_job=\$\{restoreIssueImplementationJob\}/,
  );
  assert.match(requeueSource, /DEFAULT_MAX_REQUEUE_ATTEMPTS = 3/);
  assert.match(requeueSource, /status = "retry_limit_reached"/);
  assert.match(requeueSource, /requeue_attempt=\$\{requeueAttempt \+ 1\}/);
});
