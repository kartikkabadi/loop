import assert from "node:assert/strict";
import test from "node:test";
import {
  automergeShepherdReadiness,
  automergeShepherdWaitConfig,
  canUseAutomergeFastRebase,
  hasTrustedPassForHead,
} from "../../dist/repair/automerge-shepherd.js";

test("automerge fast rebase is limited to adopted branch repairs", () => {
  assert.equal(
    canUseAutomergeFastRebase({
      isAutomergeRepair: true,
      repairStrategy: "repair_contributor_branch",
      env: {},
    }),
    true,
  );
  assert.equal(
    canUseAutomergeFastRebase({
      isAutomergeRepair: true,
      repairStrategy: "replace_uneditable_branch",
      env: {},
    }),
    false,
  );
  assert.equal(
    canUseAutomergeFastRebase({
      isAutomergeRepair: true,
      repairStrategy: "repair_contributor_branch",
      env: { CLAWSWEEPER_AUTOMERGE_FAST_REBASE: "0" },
    }),
    false,
  );
});

test("automerge shepherd waits for an exact-head trusted pass", () => {
  const headSha = "abc123";
  const view = {
    state: "OPEN",
    headRefOid: headSha,
    mergeable: "MERGEABLE",
    mergeStateStatus: "CLEAN",
    statusCheckRollup: [{ name: "check", status: "COMPLETED", conclusion: "SUCCESS" }],
  };
  assert.deepEqual(automergeShepherdReadiness({ view, comments: [], headSha }), {
    status: "waiting",
    reason: "waiting for exact-head ClawSweeper review pass",
  });
  assert.equal(
    hasTrustedPassForHead(
      [
        {
          user: { login: "clawsweeper[bot]" },
          body: "passed\n<!-- clawsweeper-verdict:pass sha=abc123 -->",
        },
      ],
      headSha,
    ),
    true,
  );
  assert.deepEqual(
    automergeShepherdReadiness({
      view,
      comments: [
        {
          user: { login: "clawsweeper[bot]" },
          body: "passed\n<!-- clawsweeper-verdict:pass sha=abc123 -->",
        },
      ],
      headSha,
    }),
    { status: "ready", reason: "checks and exact-head review are ready" },
  );
});

test("automerge shepherd treats head movement as terminal for the current repair", () => {
  assert.deepEqual(
    automergeShepherdReadiness({
      view: { state: "OPEN", headRefOid: "def456" },
      comments: [],
      headSha: "abc123",
    }),
    { status: "stopped", reason: "head changed from abc123 to def456" },
  );
});

test("automerge shepherd stops on terminal check failures before review pass", () => {
  const headSha = "abc123";
  assert.deepEqual(
    automergeShepherdReadiness({
      view: {
        state: "OPEN",
        headRefOid: headSha,
        statusCheckRollup: [
          { name: "check-lint", status: "COMPLETED", conclusion: "FAILURE" },
          { name: "slow-check", status: "IN_PROGRESS", conclusion: "" },
        ],
      },
      comments: [],
      headSha,
    }),
    { status: "blocked", reason: "GitHub checks failed: check-lint:FAILURE" },
  );
});

test("automerge shepherd wait config is bounded and configurable", () => {
  assert.deepEqual(
    automergeShepherdWaitConfig({
      CLAWSWEEPER_AUTOMERGE_SHEPHERD_WAIT_MS: "30000",
      CLAWSWEEPER_AUTOMERGE_SHEPHERD_POLL_MS: "5000",
    }),
    { maxWaitMs: 30000, intervalMs: 5000 },
  );
});
