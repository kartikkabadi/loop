import assert from "node:assert/strict";
import test from "node:test";

import { appendLedger } from "../../dist/repair/comment-router-utils.js";

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
