import assert from "node:assert/strict";
import test from "node:test";

import {
  MAX_LIVE_WORKERS,
  readMaxLiveWorkers,
  repairRunNameForJob,
  repairRunNamePrefixForJob,
} from "../../dist/repair/live-worker-capacity.js";

test("live worker capacity refuses limits above the global Codex cap", () => {
  assert.equal(MAX_LIVE_WORKERS, 100);
  assert.equal(readMaxLiveWorkers({ "max-live-workers": "100" }), 100);
  assert.throws(
    () => readMaxLiveWorkers({ "max-live-workers": "101" }),
    /max-live-workers must be <= 100/,
  );
});

test("live worker capacity accepts env default within the global Codex cap", () => {
  const previous = process.env.CLAWSWEEPER_MAX_LIVE_WORKERS;
  process.env.CLAWSWEEPER_MAX_LIVE_WORKERS = "75";
  try {
    assert.equal(readMaxLiveWorkers(), 75);
  } finally {
    if (previous === undefined) delete process.env.CLAWSWEEPER_MAX_LIVE_WORKERS;
    else process.env.CLAWSWEEPER_MAX_LIVE_WORKERS = previous;
  }
});

test("repair run names match workflow dispatch titles", () => {
  assert.equal(
    repairRunNameForJob("jobs/openclaw/inbox/automerge-openclaw-openclaw-75363.md"),
    "automerge repair jobs/openclaw/inbox/automerge-openclaw-openclaw-75363.md",
  );
  assert.equal(repairRunNamePrefixForJob("jobs/openclaw/inbox/cluster-abc.md"), "repair cluster ");
  assert.equal(
    repairRunNameForJob("jobs/openclaw/inbox/automerge-openclaw-openclaw-75363.md", "auto "),
    "auto jobs/openclaw/inbox/automerge-openclaw-openclaw-75363.md",
  );
  assert.equal(
    repairRunNameForJob(
      "jobs/openclaw/inbox/automerge-openclaw-openclaw-75363.md",
      "automerge repair",
    ),
    "automerge repair jobs/openclaw/inbox/automerge-openclaw-openclaw-75363.md",
  );
});
