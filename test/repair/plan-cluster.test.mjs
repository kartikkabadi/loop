import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

test("plan-cluster carries worker target checkout into artifacts", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-plan-cluster-"));
  const jobPath = path.join(tmp, "job.md");
  const runDir = path.join(tmp, "run");
  const targetCheckout = path.join(tmp, "target-openclaw");

  fs.writeFileSync(
    jobPath,
    [
      "---",
      "repo: openclaw/openclaw",
      "cluster_id: clawsweeper-commit-openclaw-openclaw-deadbeef0000",
      "mode: autonomous",
      "allowed_actions:",
      "  - fix",
      "  - raise_pr",
      "source: clawsweeper_commit",
      "commit_sha: deadbeef00000000000000000000000000000000",
      "allow_fix_pr: true",
      "security_policy: central_security_only",
      "security_sensitive: false",
      "---",
      "Repair the finding.",
      "",
    ].join("\n"),
  );

  execFileSync(
    process.execPath,
    ["dist/repair/plan-cluster.js", jobPath, "--run-dir", runDir, "--offline"],
    {
      cwd: process.cwd(),
      env: { ...process.env, CLAWSWEEPER_TARGET_CHECKOUT: targetCheckout },
      stdio: "pipe",
    },
  );

  const clusterPlan = JSON.parse(fs.readFileSync(path.join(runDir, "cluster-plan.json"), "utf8"));
  const fixArtifact = JSON.parse(fs.readFileSync(path.join(runDir, "fix-artifact.json"), "utf8"));

  assert.equal(clusterPlan.target_checkout, targetCheckout);
  assert.equal(fixArtifact.target_checkout, targetCheckout);
});

test("plan-cluster allows security repair for adopted PR autofix jobs", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-plan-security-autofix-"));
  const jobPath = path.join(tmp, "job.md");
  const runDir = path.join(tmp, "run");

  fs.writeFileSync(
    jobPath,
    [
      "---",
      "repo: openclaw/openclaw",
      "cluster_id: automerge-openclaw-openclaw-74134",
      "mode: autonomous",
      "allowed_actions:",
      "  - comment",
      "  - fix",
      "  - raise_pr",
      "blocked_actions:",
      "  - close",
      "  - merge",
      "source: pr_automerge",
      "canonical:",
      "  - #74134",
      "candidates:",
      "  - #74134",
      "allow_fix_pr: true",
      "allow_merge: false",
      "security_policy: central_security_only",
      "security_sensitive: false",
      "---",
      "Maintainer opted #74134 into ClawSweeper autofix.",
      "<!-- clawsweeper-security:security-sensitive item=74134 sha=abc123 -->",
      "",
    ].join("\n"),
  );

  execFileSync(
    process.execPath,
    ["dist/repair/plan-cluster.js", jobPath, "--run-dir", runDir, "--offline"],
    {
      cwd: process.cwd(),
      stdio: "pipe",
    },
  );

  const clusterPlan = JSON.parse(fs.readFileSync(path.join(runDir, "cluster-plan.json"), "utf8"));
  const fixArtifact = JSON.parse(fs.readFileSync(path.join(runDir, "fix-artifact.json"), "utf8"));

  assert.deepEqual(clusterPlan.security_boundary.security_sensitive_items, []);
  assert.deepEqual(clusterPlan.security_boundary.security_repair_allowed_items, ["#74134"]);
  assert.equal(clusterPlan.items[0].security_sensitive, false);
  assert.equal(clusterPlan.items[0].security_repair_allowed, true);
  assert.equal(
    clusterPlan.items[0].classification_hint,
    "security_sensitive_fix_allowed_by_opt_in",
  );
  assert.equal(fixArtifact.item_matrix[0].security_repair_allowed, true);
});
