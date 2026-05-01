import assert from "node:assert/strict";
import test from "node:test";

import { validateAutonomousFixScope } from "../../dist/repair/execute-fix-validation.js";

function broadBranchRepairArtifact() {
  return {
    repair_strategy: "repair_contributor_branch",
    pr_title: "feat(file-transfer): refresh canonical node policy repair branch",
    summary:
      "Repair existing canonical PR by rebasing it onto current main and resolving stale branch fallout.",
    pr_body: "Refresh a broad existing contributor branch without expanding the requested scope.",
    affected_surfaces: [
      "extensions/file-transfer plugin",
      "Gateway node.invoke plugin policy seam",
      "Agent nodes-tool redirect messaging",
      "Plugin SDK/registry contract exports",
      "Docs, changelog, and labeler entries for the bundled plugin",
    ],
    likely_files: [
      "src/agents/tools/nodes-tool-commands.ts",
      "src/agents/tools/nodes-tool.test.ts",
      "extensions/file-transfer/src/shared/node-invoke-policy.ts",
      "extensions/file-transfer/src/shared/node-invoke-policy.test.ts",
      "extensions/file-transfer/src/tools/dir-fetch-tool.ts",
      "extensions/file-transfer/src/tools/dir-fetch-tool.test.ts",
      "src/gateway/node-invoke-plugin-policy.ts",
      "src/gateway/node-invoke-plugin-policy.test.ts",
    ],
    source_prs: [
      "https://github.com/openclaw/openclaw/pull/74742",
      "https://github.com/openclaw/openclaw/pull/74134",
    ],
  };
}

function validate(job, fixArtifact = broadBranchRepairArtifact()) {
  return validateAutonomousFixScope({
    job,
    fixArtifact,
    allowBroadFixArtifacts: false,
    maxAutonomousFixFiles: 3,
    maxAutonomousFixSurfaces: 3,
  });
}

test("autonomous scope validation blocks broad untrusted repair artifacts", () => {
  const block = validate({
    frontmatter: {
      source: "manual",
      allow_fix_pr: true,
      allowed_actions: ["fix", "raise_pr"],
      target_branch: "clawsweeper/example",
    },
  });

  assert.match(block.reason, /too broad for autonomous execution/);
});

test("autonomous scope validation allows trusted adopted PR branch refreshes", () => {
  const block = validate({
    frontmatter: {
      source: "pr_automerge",
      allow_fix_pr: true,
      allowed_actions: ["fix", "raise_pr"],
      target_branch: "clawsweeper/automerge-openclaw-openclaw-74134",
    },
  });

  assert.equal(block, null);
});

test("autonomous scope validation still blocks adopted repairs outside ClawSweeper branches", () => {
  const block = validate({
    frontmatter: {
      source: "pr_automerge",
      allow_fix_pr: true,
      allowed_actions: ["fix", "raise_pr"],
      target_branch: "contributor/file-transfer",
    },
  });

  assert.match(block.reason, /too broad for autonomous execution/);
});
