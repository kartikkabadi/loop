import assert from "node:assert/strict";
import test from "node:test";

import { deterministicAutomergeResult } from "../../dist/repair/deterministic-automerge-result.js";

function job() {
  return {
    frontmatter: {
      repo: "openclaw/openclaw",
      cluster_id: "automerge-openclaw-openclaw-71898",
      source: "pr_automerge",
      canonical: ["#71898"],
      allow_fix_pr: true,
      allow_merge: false,
    },
  };
}

function clusterPlan(overrides = {}) {
  return {
    repo: "openclaw/openclaw",
    cluster_id: "automerge-openclaw-openclaw-71898",
    items: [
      {
        number: 71898,
        ref: "#71898",
        kind: "pull_request",
        state: "open",
        title: "fix(memory): preserve session corpus labels",
        updated_at: "2026-05-11T00:00:00Z",
        security_sensitive: false,
        security_repair_allowed: false,
        pull_request: {
          branch_writable: true,
          files_truncated: 0,
          files: [
            { filename: "extensions/memory-core/src/tools.ts" },
            { filename: "extensions/memory-core/src/tools.test.ts" },
          ],
        },
        ...overrides,
      },
    ],
  };
}

test("deterministic automerge result emits generic direct-Codex repair artifact", () => {
  const result = deterministicAutomergeResult({
    job: job(),
    mode: "autonomous",
    clusterPlan: clusterPlan(),
  });

  assert.equal(result?.status, "planned");
  assert.equal(result?.actions[0].action, "build_fix_artifact");
  assert.equal(result?.actions[0].target, "#71898");
  assert.match(result?.actions[0].reason, /direct Codex edit loop/);
  assert.equal(result?.fix_artifact.repair_strategy, "repair_contributor_branch");
  assert.deepEqual(result?.fix_artifact.likely_files, [
    "extensions/memory-core/src/tools.ts",
    "extensions/memory-core/src/tools.test.ts",
    "CHANGELOG.md",
  ]);
  assert.deepEqual(result?.fix_artifact.affected_surfaces, ["extensions/memory-core"]);
  assert.equal(result?.fix_artifact.changelog_required, true);
  assert.deepEqual(result?.fix_artifact.source_prs, [
    "https://github.com/openclaw/openclaw/pull/71898",
  ]);
});

test("deterministic automerge result does not require a changelog blocker", () => {
  const result = deterministicAutomergeResult({
    job: job(),
    mode: "autonomous",
    clusterPlan: clusterPlan({
      title: "docs: refresh memory guide",
      pull_request: {
        branch_writable: false,
        branch_write_reason: "fork branch",
        files_truncated: 4,
        files: [{ filename: "docs/memory.md" }],
      },
    }),
  });

  assert.equal(result?.status, "planned");
  assert.equal(result?.fix_artifact.changelog_required, false);
  assert.deepEqual(result?.fix_artifact.likely_files, ["docs/memory.md"]);
  assert.match(result?.actions[0].evidence.join("\n"), /Branch writable: false/);
  assert.match(result?.actions[0].evidence.join("\n"), /Changed files truncated by 4/);
});

test("deterministic automerge result leaves non-automerge jobs to Codex", () => {
  assert.equal(
    deterministicAutomergeResult({
      job: {
        frontmatter: {
          ...job().frontmatter,
          source: "manual_cluster",
        },
      },
      mode: "autonomous",
      clusterPlan: clusterPlan(),
    }),
    null,
  );
});
