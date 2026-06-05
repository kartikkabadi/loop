import assert from "node:assert/strict";
import test from "node:test";

import {
  renderSelfHealJob,
  renderSelfHealStatusComment,
  selfHealEligibility,
  selfHealJobPath,
  selfHealMergeStateReason,
} from "../../dist/repair/conflict-self-heal-core.js";
import { parseSimpleYaml, validateJob } from "../../dist/repair/lib.js";

test("self-heal eligibility accepts ClawSweeper-owned dirty same-repo PRs", () => {
  const result = selfHealEligibility({
    repo: "openclaw/openclaw",
    pull: {
      state: "OPEN",
      author: { __typename: "App", login: "clawsweeper" },
      headRefName: "clawsweeper/repair-123",
      headRefOid: "abc123",
      headRepository: { nameWithOwner: "openclaw/openclaw" },
      mergeStateStatus: "DIRTY",
      labels: [],
    },
  });

  assert.equal(result.eligible, true);
  assert.equal(result.reason, "mergeStateStatus is DIRTY");
});

test("self-heal eligibility accepts conflicting mergeable state", () => {
  assert.equal(
    selfHealMergeStateReason({ mergeable: "CONFLICTING", mergeStateStatus: "CLEAN" }),
    "mergeable is CONFLICTING",
  );
});

test("self-heal eligibility skips paused, stale-owned, and fork PRs", () => {
  const base = {
    state: "OPEN",
    author: { __typename: "App", login: "clawsweeper" },
    headRefName: "clawsweeper/repair-123",
    headRefOid: "abc123",
    headRepository: { nameWithOwner: "openclaw/openclaw" },
    mergeStateStatus: "BEHIND",
  };

  assert.match(
    selfHealEligibility({
      repo: "openclaw/openclaw",
      pull: { ...base, labels: [{ name: "clawsweeper:human-review" }] },
    }).reason,
    /paused/,
  );
  assert.match(
    selfHealEligibility({
      repo: "openclaw/openclaw",
      pull: { ...base, author: { __typename: "User", login: "octocat" }, labels: [] },
    }).reason,
    /author/,
  );
  assert.match(
    selfHealEligibility({
      repo: "openclaw/openclaw",
      pull: { ...base, headRepository: { nameWithOwner: "octocat/openclaw" }, labels: [] },
    }).reason,
    /head repo/,
  );
});

test("self-heal job path and rendered job validate with exact-head frontmatter", () => {
  assert.equal(
    selfHealJobPath("openclaw/openclaw", 89790),
    "jobs/openclaw/inbox/self-heal-openclaw-openclaw-89790.md",
  );
  const job = renderSelfHealJob({
    repo: "openclaw/openclaw",
    issueNumber: 89790,
    title: "fix conflict",
    branch: "clawsweeper/fix-conflict",
    headSha: "abc123",
    mergeState: "mergeStateStatus is DIRTY",
    runUrl: "https://github.com/openclaw/clawsweeper/actions/runs/1",
  });
  const frontmatter = parseSimpleYaml(job.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "");

  assert.equal(frontmatter.job_intent, "clawsweeper_self_rebase");
  assert.equal(frontmatter.source, "clawsweeper_self_rebase");
  assert.equal(frontmatter.expected_head_sha, "abc123");
  assert.equal(frontmatter.allow_merge, false);
  assert.deepEqual(validateJob({ frontmatter }), []);
  assert.match(job, /Do not merge or close this PR/);
  assert.match(job, /clawsweeper:automerge/);
});

test("self-heal status comment is durable and says merge is not attempted", () => {
  const body = renderSelfHealStatusComment({
    repo: "openclaw/openclaw",
    issueNumber: 90284,
    headSha: "def456",
    mergeState: "mergeable is CONFLICTING",
    jobPath: "jobs/openclaw/inbox/self-heal-openclaw-openclaw-90284.md",
    status: "dispatching",
  });

  assert.match(body, /clawsweeper-command-status:90284:clawsweeper_self_rebase:def456/);
  assert.match(body, /mergeable is CONFLICTING/);
  assert.match(body, /will not merge the PR/);
  assert.match(body, /automerge\/merge-ready labels/);
});
