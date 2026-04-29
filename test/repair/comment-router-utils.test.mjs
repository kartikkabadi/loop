import assert from "node:assert/strict";
import test from "node:test";

import {
  appendLedger,
  isGitHubAppIntegrationAuthError,
  isAllowedMutationActor,
  normalizeGitHubActor,
  shouldSuppressProcessedCommentVersion,
  summarizeChecks,
} from "../../dist/repair/comment-router-utils.js";

test("appendLedger keeps edited comment versions separate", () => {
  const ledger = { updated_at: null, commands: [] };

  appendLedger(ledger, [
    {
      idempotency_key: "first",
      comment_id: "123",
      comment_version_key: "123:2026-04-29T01:00:00Z",
      comment_updated_at: "2026-04-29T01:00:00Z",
      status: "executed",
      intent: "clawsweeper_auto_repair",
      issue_number: 74075,
      repo: "openclaw/openclaw",
    },
    {
      idempotency_key: "second",
      comment_id: "123",
      comment_version_key: "123:2026-04-29T02:00:00Z",
      comment_updated_at: "2026-04-29T02:00:00Z",
      status: "executed",
      intent: "clawsweeper_auto_repair",
      issue_number: 74075,
      repo: "openclaw/openclaw",
    },
  ]);

  assert.equal(ledger.commands.length, 2);
  assert.deepEqual(
    ledger.commands.map((entry) => entry.comment_version_key),
    ["123:2026-04-29T01:00:00Z", "123:2026-04-29T02:00:00Z"],
  );
});

test("appendLedger leaves waiting commands retryable", () => {
  const ledger = { updated_at: null, commands: [] };

  appendLedger(ledger, [
    {
      idempotency_key: "transient",
      comment_id: "124",
      comment_version_key: "124:2026-04-29T03:00:00Z",
      comment_updated_at: "2026-04-29T03:00:00Z",
      status: "waiting",
      intent: "clawsweeper_re_review",
      issue_number: 74499,
      repo: "openclaw/openclaw",
    },
  ]);

  assert.equal(ledger.commands.length, 0);
});

test("summarizeChecks ignores cancelled default non-gating checks", () => {
  const checks = summarizeChecks([
    {
      name: "auto-response",
      workflowName: "Auto response",
      status: "COMPLETED",
      conclusion: "CANCELLED",
    },
    {
      name: "CI",
      workflowName: "CI",
      status: "COMPLETED",
      conclusion: "SUCCESS",
    },
  ]);

  assert.equal(checks.total, 2);
  assert.deepEqual(checks.blockers, []);
  assert.equal(checks.counts.CANCELLED, 1);
});

test("summarizeChecks still blocks cancelled required checks", () => {
  const checks = summarizeChecks([
    {
      name: "required-build",
      workflowName: "CI",
      status: "COMPLETED",
      conclusion: "CANCELLED",
    },
  ]);

  assert.deepEqual(checks.blockers, ["required-build:CANCELLED"]);
});

test("skipped automerge ledger entries stay retryable", () => {
  assert.equal(
    shouldSuppressProcessedCommentVersion({
      status: "skipped",
      intent: "clawsweeper_auto_merge",
    }),
    false,
  );
  assert.equal(
    shouldSuppressProcessedCommentVersion({
      status: "skipped",
      intent: "maintainer_approve_automerge",
    }),
    false,
  );
  assert.equal(
    shouldSuppressProcessedCommentVersion({
      status: "executed",
      intent: "clawsweeper_auto_merge",
    }),
    true,
  );
  assert.equal(
    shouldSuppressProcessedCommentVersion({
      status: "skipped",
      intent: "clawsweeper_re_review",
    }),
    true,
  );
});

test("mutation actor guard accepts only trusted bot identities", () => {
  const trustedBots = new Set(["clawsweeper[bot]", "openclaw-clawsweeper[bot]"]);

  assert.equal(normalizeGitHubActor("ClawSweeper[bot]"), "clawsweeper");
  assert.equal(isAllowedMutationActor("clawsweeper[bot]", trustedBots), true);
  assert.equal(isAllowedMutationActor("clawsweeper", trustedBots), true);
  assert.equal(isAllowedMutationActor("openclaw-clawsweeper[bot]", trustedBots), true);
  assert.equal(isAllowedMutationActor("steipete", trustedBots), false);
  assert.equal(isAllowedMutationActor("github-actions[bot]", trustedBots), false);
});

test("mutation actor guard recognizes GitHub App integration auth shape", () => {
  assert.equal(
    isGitHubAppIntegrationAuthError("gh: Resource not accessible by integration (HTTP 403)"),
    true,
  );
  assert.equal(
    isGitHubAppIntegrationAuthError(
      '{"message":"Resource not accessible by integration","status":"403"}',
    ),
    true,
  );
  assert.equal(isGitHubAppIntegrationAuthError("gh: Resource not accessible (HTTP 403)"), false);
  assert.equal(isGitHubAppIntegrationAuthError("Resource not accessible by integration"), false);
});
