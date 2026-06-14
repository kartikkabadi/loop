import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import {
  parseReviewReport,
  referencedIssueNumbers,
  referencedPullRequestCoordinates,
  reportOnlyDecision,
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
    state_at_review: "open",
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
  return `---\n${frontmatter}\n---\n\n## Repair Work Prompt\n\nFix the reproduced existing-behavior bug and add a regression test.\n`;
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

test("viable reviews queue autonomous implementation outside protected repositories", () => {
  const markdown = report({
    number: "244",
    repository: "steipete/summarize",
    item_category: "feature",
    reproduction_status: "not_applicable",
    reproduction_confidence: "low",
  });
  const decision = reportOnlyDecision({
    targetRepo: "steipete/summarize",
    itemNumber: 244,
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
  });

  assert.equal(decision.shouldRepair, true);
  assert.equal(decision.status, "queued_for_repair");
});

test("viable reviews let Codex discover the implementation and validation strategy", () => {
  const markdown = report({
    number: "244",
    repository: "steipete/summarize",
    confidence: "low",
    work_candidate: "none",
    work_confidence: "low",
    work_validation: JSON.stringify([]),
    requires_product_decision: "true",
  }).replace(/## Repair Work Prompt[\s\S]*$/, "");
  const decision = reportOnlyDecision({
    targetRepo: "steipete/summarize",
    itemNumber: 244,
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
  });

  assert.equal(decision.shouldRepair, true);
  assert.equal(decision.status, "queued_for_repair");
});

test("viable review routing resolves pull request context during live intake", () => {
  const markdown = report({
    number: "244",
    repository: "steipete/summarize",
    item_category: "feature",
    reproduction_status: "not_applicable",
    reproduction_confidence: "low",
    work_cluster_refs: JSON.stringify(["https://github.com/other/project/pull/12"]),
  });
  const decision = reportOnlyDecision({
    targetRepo: "steipete/summarize",
    itemNumber: 244,
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
  });
  const openDecision = reportOnlyDecision({
    targetRepo: "steipete/summarize",
    itemNumber: 244,
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
    live: {
      issue: { state: "open", locked: false, labels: [], title: "Feature", body: "" },
      existingPrs: [],
      existingBranchPrs: [],
      referencedPrs: [{ state: "open" }],
    },
  });
  const closedDecision = reportOnlyDecision({
    targetRepo: "steipete/summarize",
    itemNumber: 244,
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
    live: {
      issue: { state: "open", locked: false, labels: [], title: "Feature", body: "" },
      existingPrs: [],
      existingBranchPrs: [],
      referencedPrs: [{ state: "closed" }],
    },
  });

  assert.equal(decision.shouldRepair, true);
  assert.equal(decision.status, "queued_for_repair");
  assert.equal(openDecision.shouldRepair, false);
  assert.match(openDecision.reason, /references an open or unverifiable pull request/);
  assert.equal(closedDecision.shouldRepair, true);
  assert.equal(closedDecision.status, "queued_for_repair");
});

test("viable review routing resolves full and shorthand pull request references", () => {
  assert.deepEqual(
    referencedPullRequestCoordinates({
      targetRepo: "steipete/oracle",
      itemNumber: 241,
      references: [
        "#241",
        "Superseded by #216",
        "See steipete/oracle#217",
        "https://github.com/other/project/pull/12",
        "https://github.com/steipete/oracle/issues/218",
        "Superseded by [PR #13](https://github.com/other/project/pull/13)",
      ],
    }),
    [
      { owner: "steipete", name: "oracle", number: 216, knownPullRequest: false },
      { owner: "steipete", name: "oracle", number: 217, knownPullRequest: false },
      { owner: "other", name: "project", number: 12, knownPullRequest: true },
      { owner: "other", name: "project", number: 13, knownPullRequest: true },
    ],
  );
});

test("issue implementation deduplicates work across related issue references", () => {
  assert.deepEqual(
    referencedIssueNumbers({
      targetRepo: "steipete/oracle",
      itemNumber: 241,
      references: [
        "#241",
        "Duplicate of #216",
        "See steipete/oracle#217",
        "https://github.com/steipete/oracle/issues/218",
        "https://github.com/other/project/issues/219",
      ],
    }),
    [216, 217, 218],
  );

  const markdown = report();
  const decision = reportOnlyDecision({
    targetRepo: "openclaw/openclaw",
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    live: {
      issue: { state: "open", locked: false, labels: [], title: "Bug", body: "" },
      existingPrs: [],
      existingBranchPrs: [],
      referencedPrs: [],
      clusterExistingPrs: [{ number: 456, state: "open" }],
    },
  });
  assert.equal(decision.shouldRepair, false);
  assert.match(decision.reason, /related issue in this work cluster/);
});

test("viable live intake allows auth-provider prose but blocks explicit security signals", () => {
  const markdown = report({
    number: "241",
    repository: "steipete/oracle",
    labels: JSON.stringify(["impact:auth-provider"]),
  });
  const live = {
    issue: {
      state: "open",
      locked: false,
      labels: [{ name: "impact:auth-provider" }],
      title: "Bearer-token login probe rejects authenticated users",
      body: "The access token is attached by the browser SPA.",
    },
    comments: [],
    existingPrs: [],
    existingBranchPrs: [],
    referencedPrs: [],
  };
  const viable = reportOnlyDecision({
    targetRepo: "steipete/oracle",
    itemNumber: 241,
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
    live,
  });
  const security = reportOnlyDecision({
    targetRepo: "steipete/oracle",
    itemNumber: 241,
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
    live: {
      ...live,
      issue: { ...live.issue, labels: [{ name: "security:sensitive" }] },
    },
  });
  const vulnerability = reportOnlyDecision({
    targetRepo: "steipete/oracle",
    itemNumber: 241,
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
    live: {
      ...live,
      issue: { ...live.issue, title: "Stored XSS in browser output", body: "" },
    },
  });
  const credentialExposure = reportOnlyDecision({
    targetRepo: "steipete/oracle",
    itemNumber: 241,
    report: parseReviewReport(markdown),
    reportMarkdown: markdown,
    candidateKind: "viable",
    live: {
      ...live,
      issue: { ...live.issue, title: "Leaked access token in browser output", body: "" },
    },
  });

  assert.equal(viable.shouldRepair, true);
  assert.equal(viable.status, "queued_for_repair");
  assert.equal(security.shouldRepair, false);
  assert.match(security.reason, /security-sensitive signal/);
  assert.equal(vulnerability.shouldRepair, false);
  assert.match(vulnerability.reason, /security-sensitive signal/);
  assert.equal(credentialExposure.shouldRepair, false);
  assert.match(credentialExposure.reason, /security-sensitive signal/);
});

test("viable review routing excludes protected repositories and invalid review identity", () => {
  const base = {
    number: "244",
    repository: "steipete/summarize",
    item_category: "feature",
    reproduction_status: "not_applicable",
    reproduction_confidence: "low",
  };
  const cases = [
    { targetRepo: "openclaw/openclaw", overrides: { repository: "openclaw/openclaw" } },
    { targetRepo: "openclaw/clawhub", overrides: { repository: "openclaw/clawhub" } },
    { targetRepo: "steipete/summarize", overrides: { review_status: "incomplete" } },
    { targetRepo: "steipete/summarize", overrides: { decision: "close" } },
    { targetRepo: "steipete/summarize", overrides: { number: "245" } },
  ];

  for (const { targetRepo, overrides } of cases) {
    const markdown = report({ ...base, ...overrides });
    const decision = reportOnlyDecision({
      targetRepo,
      itemNumber: 244,
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

test("viable issue implementation jobs enter the existing automerge loop", () => {
  const job = renderIssueImplementationJob({
    repo: "steipete/summarize",
    issueNumber: 244,
    title: "Implement reviewed issue",
    triggerSource: REVIEW_VIABLE_ISSUE_TRIGGER_SOURCE,
    reviewReportPath: "records/steipete-summarize/items/244.md",
    automerge: true,
    sourceIssueRevision: "a".repeat(64),
  });

  assert.match(job, /trigger_source: review_viable_issue/);
  assert.match(job, /source_issue_repo: "steipete\/summarize"/);
  assert.match(job, /source_issue_number: 244/);
  assert.match(job, new RegExp(`source_issue_revision_sha256: "${"a".repeat(64)}"`));
  assert.match(
    job,
    /required_pr_labels:\n  - clawsweeper:autogenerated\n  - clawsweeper:automerge/,
  );
  assert.match(job, /Use a closing reference/);
});

test("issue implementation PR executor applies autogenerated label", () => {
  const source = readFileSync("src/repair/execute-fix-artifact.ts", "utf8");

  assert.match(source, /AUTOGENERATED_LABEL/);
  assert.match(source, /required_pr_labels \?\? \[\]\)\.includes\(AUTOMERGE_LABEL\)/);
  assert.match(source, /job\.frontmatter\.source === "issue_implementation"/);
});

test("automerge revalidates generated PRs against their source issue", () => {
  const source = readFileSync("src/repair/comment-router.ts", "utf8");
  const validation = source.indexOf("generatedIssueSourceMergeBlockReason(command, view)");
  const mergeGate = source.indexOf("automergeGateBlockReason(process.env)", validation);

  assert.ok(validation >= 0);
  assert.ok(mergeGate > validation);
  assert.match(source, /source_issue_revision_sha256/);
  assert.match(source, /closingIssuesReferences/);
  assert.match(source, /timeline\?per_page=100/);
});

test("issue implementation intake checks generated branches through REST", () => {
  const source = readFileSync("src/repair/issue-implementation-intake.ts", "utf8");

  assert.match(source, /repos\/\$\{owner\}\/\$\{name\}\/pulls/);
  assert.match(source, /head=\$\{owner\}:\$\{branch\}/);
  assert.match(source, /open PR already mentions this issue/);
  assert.match(source, /existing ClawSweeper issue implementation PR is open/);
  assert.match(source, /open PR already covers a related issue in this work cluster/);
  assert.match(source, /review report references an open or unverifiable pull request/);
  assert.match(source, /repos\/\$\{owner\}\/\$\{name\}\/issues\/\$\{number\}/);
  assert.match(source, /"search\/issues",\s+"--method",\s+"GET"/);
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
  assert.match(source, /"search\/issues",\s+"--method",\s+"GET"/);
  assert.match(source, /target\.body/);
  assert.match(source, /target\.locked === true/);
  assert.match(source, /labels\.some\(isIssueImplementationProtectedLabel\)/);
  assert.match(source, /overrideBlockerClass,\n\s+overrideAction: command\.operator_override/);
  assert.match(source, /prepare a non-mutating handoff for this issue/);
});
