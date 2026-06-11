import assert from "node:assert/strict";
import test from "node:test";

import { buildRepairSquashMergeMessage } from "../../dist/repair/repair-merge-message.js";

test("buildRepairSquashMergeMessage summarizes repair validation and fixups", () => {
  const message = buildRepairSquashMergeMessage({
    target: 75423,
    title: "fix(gateway): refresh stale channel health cache",
    headSha: "abc123",
    reason: "merged by ClawSweeper Repair",
    preflight: {
      comments_status: "resolved",
      bot_comments_status: "resolved",
      final_base_sync: { status: "already-current" },
      codex_review: {
        evidence: ["Codex /review passed after the agentic fix loop."],
      },
      validation_commands: ["pnpm check:changed"],
    },
  });

  assert.equal(message.subject, "fix(gateway): refresh stale channel health cache (#75423)");
  assert.match(message.body, /Summary:/);
  assert.match(message.body, /Codex \/review passed/);
  assert.match(message.body, /ClawSweeper fixups:/);
  assert.match(message.body, /Synced the branch with latest main before merge/);
  assert.match(message.body, /Validated with pnpm check:changed/);
});
