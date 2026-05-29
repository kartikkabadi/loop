import assert from "node:assert/strict";
import test from "node:test";

import {
  lockedConversationReason,
  lockedConversationSkip,
  lockedConversationSkipIfLocked,
} from "./apply-locks.js";

test("locked apply skip includes live lock state and active reason", () => {
  assert.deepEqual(
    lockedConversationSkip(
      { target: "#123", action: "close_duplicate" },
      {
        locked: true,
        state: "open",
        updated_at: "2026-05-29T12:00:00Z",
        active_lock_reason: "resolved",
      },
    ),
    {
      target: "#123",
      action: "close_duplicate",
      status: "skipped",
      reason: "target is locked (resolved)",
      live_state: "open",
      live_updated_at: "2026-05-29T12:00:00Z",
      active_lock_reason: "resolved",
    },
  );
});

test("locked apply skip marks terminal GitHub write errors", () => {
  assert.equal(
    lockedConversationReason(
      { locked: true, active_lock_reason: "spam" },
      { terminalWriteError: true },
    ),
    "target is locked (spam); GitHub rejected the write",
  );
});

test("locked apply skip helper ignores unlocked targets", () => {
  assert.equal(
    lockedConversationSkipIfLocked({ target: "#123" }, { locked: false, state: "open" }),
    null,
  );
});
