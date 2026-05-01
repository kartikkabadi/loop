import assert from "node:assert/strict";
import test from "node:test";

import {
  automergeRepairOutcomeComment,
  repairContributorBranchComment,
} from "../../dist/repair/external-messages.js";

test("automergeRepairOutcomeComment explains no-op repair runs", () => {
  const body = automergeRepairOutcomeComment({
    marker: "<!-- marker -->",
    target: 74156,
    report: { reason: "no planned fix actions" },
    result: {
      summary: "Worker found no executable fix artifact for PR #74156.",
      actions: [
        {
          target: "#74156",
          action: "route_security",
          status: "planned",
          reason: "central handling required for #74156",
        },
      ],
    },
    provenance: { model: "gpt-test", reasoning: "medium", reviewedSha: "0123456789abcdef" },
  });

  assert.match(body, /^<!-- marker -->/);
  assert.match(body, /(without changing|no-op|No new branch changes|no safe branch change)/i);
  assert.doesNotMatch(body, /Target: #74156/);
  assert.doesNotMatch(body, /#74156/);
  assert.match(body, /Executor outcome: no planned fix actions\./);
  assert.match(body, /`route_security` on `this PR`: planned - central handling required/);
  assert.match(
    body,
    /(No branch push|No push|left the PR as-is|Nothing moved downstream|observational only)/i,
  );
  assert.match(body, /model gpt-test, reasoning medium; reviewed against 0123456789ab/);
});

test("repairContributorBranchComment avoids self PR references", () => {
  const body = repairContributorBranchComment({
    sourcePrUrl: "https://github.com/openclaw/openclaw/pull/75183",
    validationCommands: ["pnpm check:changed"],
    provenance: { model: "gpt-test", reasoning: "medium", reviewedSha: "abcdef1234567890" },
  });

  assert.match(body, /reef update/);
  assert.match(body, /Validation: pnpm check:changed/);
  assert.doesNotMatch(body, /Source PR:/);
  assert.doesNotMatch(body, /75183/);
});
