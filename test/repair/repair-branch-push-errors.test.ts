import assert from "node:assert/strict";
import test from "node:test";

import {
  isRepairBranchPushRace,
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
