import assert from "node:assert/strict";
import test from "node:test";

import {
  firstTargetSourcePullRequest,
  pullRequestHeadSha,
  sourcePullRequestFetchSpec,
  sourcePullRequestRemoteRef,
} from "../../dist/repair/source-pr-checkout.js";

test("selects the first source PR from the target repo", () => {
  assert.deepEqual(
    firstTargetSourcePullRequest(
      ["https://github.com/other/repo/pull/9", "https://github.com/openclaw/openclaw/pull/74134"],
      "openclaw/openclaw",
    ),
    {
      repo: "openclaw/openclaw",
      number: 74134,
      url: "https://github.com/openclaw/openclaw/pull/74134",
    },
  );
});

test("ignores missing and cross-repo source PRs", () => {
  assert.equal(
    firstTargetSourcePullRequest(
      ["#74134", "https://github.com/other/repo/pull/74134"],
      "openclaw/openclaw",
    ),
    null,
  );
});

test("builds a forced pull-head fetch ref for replacement branches", () => {
  assert.equal(
    sourcePullRequestFetchSpec(74134, sourcePullRequestRemoteRef(74134)),
    "+refs/pull/74134/head:refs/remotes/clawsweeper/source-pr-74134",
  );
});

test("extracts only full pull request head SHAs", () => {
  assert.equal(
    pullRequestHeadSha({
      head: { sha: "0123456789abcdef0123456789abcdef01234567" },
    }),
    "0123456789abcdef0123456789abcdef01234567",
  );
  assert.equal(pullRequestHeadSha({ head: { sha: "abc" } }), "");
  assert.equal(pullRequestHeadSha({}), "");
});
