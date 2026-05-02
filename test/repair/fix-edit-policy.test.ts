import assert from "node:assert/strict";
import test from "node:test";

import { canTreatRebaseAsCompleteRepair } from "../../src/repair/fix-edit-policy.ts";

test("substantive fix artifacts cannot skip Codex edit just because rebase moved head", () => {
  assert.equal(
    canTreatRebaseAsCompleteRepair({
      fixArtifact: {
        summary: "fix a review finding",
      },
      rebaseResult: {
        status: "rebased",
        previous_head: "1111111111111111111111111111111111111111",
        current_head: "2222222222222222222222222222222222222222",
      },
    }),
    false,
  );
});

test("explicit deterministic rebase artifacts can skip Codex edit after head moves", () => {
  assert.equal(
    canTreatRebaseAsCompleteRepair({
      fixArtifact: {
        deterministic_rebase_only: true,
      },
      rebaseResult: {
        status: "rebased",
        previous_head: "1111111111111111111111111111111111111111",
        current_head: "2222222222222222222222222222222222222222",
      },
    }),
    true,
  );
});

test("mechanically resolved conflict rebase is complete only for deterministic rebase artifacts", () => {
  assert.equal(
    canTreatRebaseAsCompleteRepair({
      fixArtifact: { deterministic_rebase_only: true },
      rebaseResult: { status: "conflicts" },
      hasUnmergedPaths: false,
    }),
    true,
  );
  assert.equal(
    canTreatRebaseAsCompleteRepair({
      fixArtifact: { deterministic_rebase_only: true },
      rebaseResult: { status: "conflicts" },
      hasUnmergedPaths: true,
    }),
    false,
  );
});
