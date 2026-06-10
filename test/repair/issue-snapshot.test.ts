import assert from "node:assert/strict";
import test from "node:test";
import {
  generatedIssueClosingReferenceBlockReason,
  generatedIssueSourceBlockReason,
  issueImplementationSnapshotSha256,
  parseGeneratedIssueSourceMarker,
  pullRequestsCrossReferencedByIssueTimeline,
  renderGeneratedIssueSourceMarker,
  sourceIssueHasSecuritySignal,
} from "../../dist/repair/issue-snapshot.js";

test("issue implementation snapshots track request changes but ignore ClawSweeper comments", () => {
  const issue = {
    title: "Narrow request",
    body: "Implement one focused behavior.",
    labels: [{ name: "bug" }],
    updated_at: "2026-06-10T00:00:00Z",
  };
  const baseline = issueImplementationSnapshotSha256(issue, [
    {
      id: 1,
      body: "Maintainer clarification.",
      updated_at: "2026-06-10T00:00:00Z",
      user: { login: "maintainer", type: "User" },
    },
  ]);

  assert.equal(
    issueImplementationSnapshotSha256(issue, [
      {
        id: 1,
        body: "Maintainer clarification.",
        updated_at: "2026-06-10T00:00:00Z",
        user: { login: "maintainer", type: "User" },
      },
      {
        id: 2,
        body: "ClawSweeper progress.",
        updated_at: "2026-06-10T00:05:00Z",
        user: { login: "clawsweeper[bot]", type: "Bot" },
      },
    ]),
    baseline,
  );
  assert.notEqual(
    issueImplementationSnapshotSha256({ ...issue, body: "Changed request." }, []),
    baseline,
  );
  assert.equal(
    issueImplementationSnapshotSha256({ ...issue, updated_at: "2026-06-10T00:10:00Z" }, [
      {
        id: 1,
        body: "Maintainer clarification.",
        updated_at: "2026-06-10T00:00:00Z",
        user: { login: "maintainer", type: "User" },
      },
    ]),
    baseline,
  );
  assert.notEqual(
    issueImplementationSnapshotSha256(issue, [
      {
        id: 1,
        body: "Maintainer clarification.",
        updated_at: "2026-06-10T00:00:00Z",
        user: { login: "maintainer", type: "User" },
      },
      {
        id: 3,
        body: "Another automation found competing work.",
        updated_at: "2026-06-10T00:06:00Z",
        user: { login: "other-app[bot]", type: "Bot" },
      },
    ]),
    baseline,
  );
});

test("generated issue source markers round-trip exactly and reject ambiguity", () => {
  const metadata = {
    repo: "openclaw/lobster",
    issueNumber: 112,
    snapshotSha256: "a".repeat(64),
    updatedAt: "2026-06-10T00:00:00Z",
  };
  const marker = renderGeneratedIssueSourceMarker(metadata);

  assert.deepEqual(parseGeneratedIssueSourceMarker(marker), metadata);
  assert.equal(parseGeneratedIssueSourceMarker(`${marker}\n${marker}`), null);
  assert.equal(
    parseGeneratedIssueSourceMarker(
      "<!-- clawsweeper-source-issue repo=openclaw/lobster number=112 snapshot=short -->",
    ),
    null,
  );
});

test("generated issue final merge validation blocks drift and competing pull requests", () => {
  const issue = {
    title: "Narrow request",
    body: "Implement one focused behavior.",
    labels: [{ name: "enhancement" }],
    state: "open",
    locked: false,
    updated_at: "2026-06-10T00:00:00Z",
  };
  const comments = [
    {
      id: 1,
      body: "Maintainer clarification.",
      updated_at: "2026-06-10T00:00:00Z",
      user: { login: "maintainer" },
    },
  ];
  const metadata = {
    repo: "openclaw/lobster",
    issueNumber: 112,
    snapshotSha256: issueImplementationSnapshotSha256(issue, comments),
    updatedAt: issue.updated_at,
  };

  assert.equal(
    generatedIssueSourceBlockReason({
      metadata,
      issue,
      comments,
      currentPullNumber: 200,
    }),
    "",
  );
  assert.match(
    generatedIssueSourceBlockReason({
      metadata,
      issue: { ...issue, body: "Changed request." },
      comments,
      currentPullNumber: 200,
    }),
    /changed since ClawSweeper review/,
  );
  assert.match(
    generatedIssueSourceBlockReason({
      metadata,
      issue,
      comments,
      competingPullRequests: [{ number: 201 }],
      currentPullNumber: 200,
    }),
    /another open PR: #201/,
  );
  assert.match(
    generatedIssueSourceBlockReason({
      metadata,
      issue: { ...issue, updated_at: "2026-06-10T00:05:00Z" },
      comments,
      currentPullNumber: 200,
    }),
    /revision changed since ClawSweeper review/,
  );
  assert.equal(
    generatedIssueSourceBlockReason({
      metadata,
      issue: { ...issue, updated_at: "2026-06-10T00:05:00Z" },
      comments: [
        ...comments,
        {
          id: 2,
          body: "ClawSweeper review sync.",
          updated_at: "2026-06-10T00:05:00Z",
          user: { login: "clawsweeper[bot]" },
        },
      ],
      currentPullNumber: 200,
    }),
    "",
  );
});

test("generated issue security validation scans human comments only", () => {
  const issue = {
    title: "Narrow request",
    body: "Implement one focused behavior.",
    labels: [{ name: "enhancement" }],
  };

  assert.equal(
    sourceIssueHasSecuritySignal(issue, [
      { body: "This exposes a credential.", user: { login: "maintainer" } },
    ]),
    true,
  );
  assert.equal(
    sourceIssueHasSecuritySignal(issue, [
      { body: "security review complete", user: { login: "clawsweeper[bot]" } },
    ]),
    false,
  );
});

test("generated issue final merge validation derives competing PRs from live timeline", () => {
  assert.deepEqual(
    pullRequestsCrossReferencedByIssueTimeline(
      [
        {
          event: "cross-referenced",
          source: {
            issue: {
              number: 201,
              pull_request: { url: "https://api.github.com/repos/openclaw/lobster/pulls/201" },
              repository_url: "https://api.github.com/repos/openclaw/lobster",
            },
          },
        },
        {
          event: "cross-referenced",
          source: {
            issue: {
              number: 202,
              pull_request: { url: "https://api.github.com/repos/other/repo/pulls/202" },
              repository_url: "https://api.github.com/repos/other/repo",
            },
          },
        },
      ],
      "openclaw/lobster",
    ).map((pull) => pull.number),
    [201],
  );
});

test("generated issue final merge validation binds the exact closing reference", () => {
  const metadata = {
    repo: "openclaw/lobster",
    issueNumber: 112,
    snapshotSha256: "a".repeat(64),
    updatedAt: "2026-06-10T00:00:00Z",
  };
  const issueUrl = "https://github.com/openclaw/lobster/issues/112";

  assert.equal(
    generatedIssueClosingReferenceBlockReason({
      body: `Implementation.\n\nCloses ${issueUrl}`,
      closingIssuesReferences: [{ number: 112, url: issueUrl }],
      metadata,
    }),
    "",
  );
  assert.match(
    generatedIssueClosingReferenceBlockReason({
      body: `<!-- Closes ${issueUrl} -->\n\n\`\`\`md\nCloses ${issueUrl}\n\`\`\``,
      closingIssuesReferences: [{ number: 112, url: issueUrl }],
      metadata,
    }),
    /no longer contains/,
  );
  assert.match(
    generatedIssueClosingReferenceBlockReason({
      body: `Implementation example:\n\n    Closes ${issueUrl}`,
      closingIssuesReferences: [],
      metadata,
    }),
    /no longer contains/,
  );
  assert.match(
    generatedIssueClosingReferenceBlockReason({
      body: `Closes ${issueUrl}`,
      closingIssuesReferences: [
        { number: 112, url: issueUrl },
        { number: 113, url: "https://github.com/openclaw/lobster/issues/113" },
      ],
      metadata,
    }),
    /unexpected issue/,
  );
});
