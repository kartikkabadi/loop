import assert from "node:assert/strict";
import test from "node:test";

import {
  isRepairBranchPushBlocked,
  isRepairBranchPushRace,
  repairBranchPushBlockedReason,
  repairBranchPushRaceReason,
} from "../../dist/repair/repair-branch-push-errors.js";

test("detects stale repair branch push races", () => {
  const error = new Error(
    "To https://github.com/Conan-Scott/openclaw.git\n" +
      " ! [rejected] HEAD -> fix/discord-secretref-action-discovery (stale info)\n" +
      "error: failed to push some refs to 'https://github.com/Conan-Scott/openclaw.git'",
  );

  assert.equal(isRepairBranchPushRace(error), true);
  assert.match(repairBranchPushRaceReason(error) ?? "", /requeue against the latest head/);
});

test("does not classify unrelated validation failures as push races", () => {
  const error = new Error("validation command failed (pnpm check:changed)");

  assert.equal(isRepairBranchPushRace(error), false);
  assert.equal(repairBranchPushRaceReason(error), null);
});

test("detects GitHub App workflow permission push denials", () => {
  const error = new Error(
    "To https://github.com/openclaw/openclaw.git\n" +
      " ! [remote rejected] HEAD -> clawsweeper/automerge-openclaw-openclaw-74905 " +
      "(refusing to allow a GitHub App to create or update workflow " +
      "`.github/workflows/openclaw-live-and-e2e-checks-reusable.yml` without `workflows` permission)\n" +
      "error: failed to push some refs to 'https://github.com/openclaw/openclaw.git'",
  );

  assert.equal(isRepairBranchPushBlocked(error), true);
  assert.match(repairBranchPushBlockedReason(error) ?? "", /workflows permission/);
  assert.equal(isRepairBranchPushRace(error), false);
});
