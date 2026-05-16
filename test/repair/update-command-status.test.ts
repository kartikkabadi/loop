import assert from "node:assert/strict";
import test from "node:test";

import {
  mergeCommandProgressSection,
  parseOptions,
  selectCommandStatusComment,
} from "../../dist/repair/update-command-status.js";

test("parseOptions preserves empty string arguments", () => {
  const options = parseOptions([
    "--repo",
    "openclaw/openclaw",
    "--item-number",
    "81564",
    "--marker",
    "",
    "--status-comment-id",
    "",
  ]);

  assert.equal(options.marker, "");
  assert.equal(options.statusCommentId, null);
});

test("empty markers do not target human comments that mention true", () => {
  const options = parseOptions([
    "--repo",
    "openclaw/openclaw",
    "--item-number",
    "81564",
    "--marker",
    "",
  ]);
  const selected = selectCommandStatusComment(
    [
      {
        id: 4465717559,
        user: { login: "hxy91819" },
        body: [
          "## Maintainer additions on top of this PR",
          "",
          "This maintainer note mentions `isError: true` twice.",
        ].join("\n"),
      },
    ],
    {
      marker: options.marker,
      statusCommentId: options.statusCommentId,
    },
  );

  assert.equal(selected, null);
});

test("selectCommandStatusComment prefers exact status comment ids", () => {
  const marker = "<!-- clawsweeper-command-status:81564:re_review:320c867f -->";
  const selected = selectCommandStatusComment(
    [
      {
        id: 4465717559,
        user: { login: "hxy91819" },
        body: marker,
      },
      {
        id: 4466202000,
        user: { login: "clawsweeper[bot]" },
        body: "<!-- clawsweeper-command-ack:4466201487 -->\nClawSweeper picked this up.",
      },
    ],
    {
      marker,
      statusCommentId: 4466202000,
    },
  );

  assert.equal(selected?.id, 4466202000);
});

test("selectCommandStatusComment ignores human comments during marker fallback", () => {
  const marker = "<!-- clawsweeper-command-status:81564:re_review:320c867f -->";
  const selected = selectCommandStatusComment(
    [
      {
        id: 4465717559,
        user: { login: "hxy91819" },
        body: marker,
      },
      {
        id: 4466202000,
        user: { login: "openclaw-clawsweeper[bot]" },
        body: `${marker}\nClawSweeper picked this up.`,
      },
    ],
    {
      marker,
      statusCommentId: null,
    },
  );

  assert.equal(selected?.id, 4466202000);
});

test("mergeCommandProgressSection replaces existing progress blocks in place", () => {
  const body = mergeCommandProgressSection(
    [
      "<!-- clawsweeper-command-ack:4466201487 -->",
      "Queued.",
      "",
      "<!-- clawsweeper-command-progress:start -->",
      "Re-review progress:",
      "- State: Review in progress",
      "- Detail: Old detail",
      "<!-- clawsweeper-command-progress:end -->",
    ].join("\n"),
    {
      state: "Complete",
      detail: "Updated detail",
      runUrl: "https://github.com/openclaw/clawsweeper/actions/runs/25957571980",
    },
  );

  assert.match(body, /- State: Complete/);
  assert.match(body, /- Detail: Updated detail/);
  assert.equal((body.match(/clawsweeper-command-progress:start/g) ?? []).length, 1);
});
