import assert from "node:assert/strict";
import test from "node:test";

import {
  hasDeterministicSecuritySignal,
  hasSecuritySignalText,
  normalizeRepoRelativePath,
  parseArgs,
  parseSimpleYaml,
  renderPrompt,
  validateJob,
} from "../../dist/repair/lib.js";

test("parseArgs ignores package-manager double dash separators", () => {
  assert.deepEqual(parseArgs(["--", "jobs/openclaw/inbox/example.md"]), {
    _: ["jobs/openclaw/inbox/example.md"],
  });
  assert.deepEqual(parseArgs(["--mode", "autonomous", "--", "job.md", "--latest"]), {
    _: ["job.md"],
    latest: true,
    mode: "autonomous",
  });
});

test("job paths use portable workflow separators", () => {
  assert.equal(
    normalizeRepoRelativePath("jobs\\openclaw\\inbox\\issue-openclaw-example-1.md"),
    "jobs/openclaw/inbox/issue-openclaw-example-1.md",
  );
});

test("renderPrompt loads tracked repair prompt templates", () => {
  const prompt = renderPrompt(
    {
      raw: "---\nrepo: openclaw/clawsweeper\ncluster_id: smoke\nmode: autonomous\nrefs:\n  - 1\n---\nRepair smoke.",
      frontmatter: {
        repo: "openclaw/clawsweeper",
        cluster_id: "smoke",
        mode: "autonomous",
        refs: [1],
      },
    },
    "autonomous",
  );
  assert.match(prompt, /## Job file/);
  assert.match(prompt, /Repair smoke\./);
});

test("renderPrompt explains the read-only planner and writable executor handoff", () => {
  const prompt = renderPrompt(
    {
      raw: "---\nrepo: openclaw/example\ncluster_id: issue-example-1\nmode: autonomous\n---\nImplement issue.",
      frontmatter: {
        repo: "openclaw/example",
        cluster_id: "issue-example-1",
        mode: "autonomous",
      },
    },
    "autonomous",
    { targetCheckout: "/tmp/example" },
  );

  assert.match(prompt, /planning worker is intentionally read-only/i);
  assert.match(prompt, /not an implementation blocker/i);
  assert.match(prompt, /separate executor receives a writable checkout/i);
});

test("validateJob rejects unknown canonical job intents", () => {
  const frontmatter = parseSimpleYaml(`repo: openclaw/openclaw
cluster_id: smoke
mode: autonomous
job_intent: surprise
allowed_actions:
  - comment
candidates:
  - "#1"
`);
  assert.deepEqual(validateJob({ frontmatter }), ["unsupported job_intent: surprise"]);
});

test("security signal detection ignores non-security advisory wording", () => {
  assert.equal(
    hasSecuritySignalText(
      "pnpm lint:tmp:dynamic-import-warts (advisory-only; no new run-loop.ts advisory)",
    ),
    false,
  );
});

test("security signal detection keeps explicit security advisory wording", () => {
  assert.equal(hasSecuritySignalText("security advisory triage for GHSA-1234-5678-abcd"), true);
  assert.equal(hasSecuritySignalText("CVE-2026-12345 is routed to the security lane"), true);
  assert.equal(hasSecuritySignalText({ name: "security:sensitive" }), true);
});

test("deterministic security signals ignore prose credential wording", () => {
  assert.equal(
    hasDeterministicSecuritySignal({
      comments: [
        "Current main's Codex credential reader types expose codexHome, platform, and execSync, but no allowKeychainPrompt.",
      ],
    }),
    false,
  );
});

test("deterministic security signals accept labels and structured ClawSweeper markers", () => {
  assert.equal(hasDeterministicSecuritySignal({ labels: ["security:sensitive"] }), true);
  assert.equal(
    hasDeterministicSecuritySignal({
      comments: ["<!-- clawsweeper-security:security-sensitive item=123 sha=abc -->"],
    }),
    true,
  );
});
