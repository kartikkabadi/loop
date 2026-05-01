import assert from "node:assert/strict";
import test from "node:test";

import { mergeAutomergeTimelineSection } from "../../dist/repair/automerge-status-timeline.js";

test("mergeAutomergeTimelineSection appends and updates progress rows", () => {
  const first = mergeAutomergeTimelineSection({
    body: "status body",
    existingBody: "",
    events: [
      {
        id: "review-queued:abc123:1",
        label: "review queued",
        at: "2026-05-01T05:00:00Z",
        headSha: "abcdef1234567890",
        status: "queued",
        runUrl: "https://github.com/openclaw/clawsweeper/actions/runs/123",
      },
    ],
  });

  assert.match(first, /Automerge progress:/);
  assert.match(first, /review queued/);
  assert.match(first, /2026-05-01 05:00:00 UTC/);
  assert.match(first, /`abcdef123456`/);
  assert.match(first, /actions\/runs\/123/);

  const second = mergeAutomergeTimelineSection({
    body: "updated body",
    existingBody: first,
    events: [
      {
        id: "review-queued:abc123:1",
        label: "review queued",
        at: "2026-05-01T05:00:00Z",
        headSha: "abcdef1234567890",
        status: "queued",
      },
      {
        id: "repair-completed:456",
        label: "repair completed",
        at: "2026-05-01T05:45:00Z",
        completedAt: "2026-05-01T06:01:00Z",
        durationMs: 960000,
        headSha: "fe7f373a972151da3db6c0805af98f55b4741406",
        status: "branch updated",
      },
    ],
  });

  assert.match(second, /^updated body/);
  assert.equal((second.match(/review queued/g) ?? []).length, 1);
  assert.match(second, /repair completed/);
  assert.match(second, /in 16m/);
  assert.match(second, /`fe7f373a9721`/);
});
