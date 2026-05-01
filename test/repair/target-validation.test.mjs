import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  preflightTargetValidationPlan,
  repairDeltaValidationPlan,
  requiredValidationCommands,
  runAllowedValidationCommands,
} from "../../dist/repair/target-validation.js";
import { compactText } from "../../dist/repair/text-utils.js";

test("OpenClaw repairs require changed-surface validation even when omitted", () => {
  const cwd = packageFixture({ "check:changed": "node check.js" });
  const options = validationOptions("openclaw/openclaw");

  assert.deepEqual(requiredValidationCommands([], cwd, options), ["pnpm check:changed"]);
  assert.deepEqual(requiredValidationCommands(["pnpm test test/foo.test.ts"], cwd, options), [
    "pnpm test test/foo.test.ts",
    "pnpm check:changed",
  ]);
  assert.deepEqual(requiredValidationCommands(["pnpm check:changed"], cwd, options), [
    "pnpm check:changed",
  ]);
});

test("non-OpenClaw repairs do not get OpenClaw changed gate injection", () => {
  const cwd = packageFixture({ "check:changed": "node check.js" });

  assert.deepEqual(requiredValidationCommands([], cwd, validationOptions("openclaw/clawhub")), []);
});

test("validation preflight reports injected OpenClaw changed gate", () => {
  const cwd = packageFixture({ "check:changed": "node check.js" });

  assert.deepEqual(
    preflightTargetValidationPlan(
      { fixArtifact: { validation_commands: [] }, targetDir: cwd },
      validationOptions("openclaw/openclaw"),
    ),
    {
      status: "passed",
      resolved_commands: ["pnpm check:changed"],
      available_scripts: ["check:changed"],
    },
  );
});

test("validation preflight accepts env-prefixed OpenClaw QA commands", () => {
  const cwd = packageFixture({ "check:changed": "node check.js" });

  assert.deepEqual(
    preflightTargetValidationPlan(
      {
        fixArtifact: {
          validation_commands: [
            "env QA_PARITY_CONCURRENCY=1 OPENCLAW_BUILD_PRIVATE_QA=1 OPENCLAW_ENABLE_PRIVATE_QA_CLI=1 OPENAI_API_KEY= ANTHROPIC_API_KEY= OPENCLAW_LIVE_OPENAI_KEY= OPENCLAW_LIVE_ANTHROPIC_KEY= OPENCLAW_LIVE_GEMINI_KEY= OPENCLAW_LIVE_SETUP_TOKEN_VALUE= pnpm openclaw qa suite --provider-mode mock-openai --parity-pack agentic --concurrency 1 --model ${OPENCLAW_CI_OPENAI_MODEL:-openai/gpt-5.5} --alt-model openai/gpt-5.4-alt --output-dir .artifacts/qa-e2e/gpt54",
          ],
        },
        targetDir: cwd,
      },
      validationOptions("openclaw/openclaw"),
    ),
    {
      status: "passed",
      resolved_commands: ["pnpm check:changed"],
      available_scripts: ["check:changed"],
    },
  );
});

test("validation preflight preserves scoped git diff checks", () => {
  const cwd = packageFixture({ "check:changed": "node check.js" });
  const sourceHead = "0123456789abcdef0123456789abcdef01234567";

  assert.deepEqual(
    preflightTargetValidationPlan(
      {
        fixArtifact: {
          validation_commands: [`git diff --check ${sourceHead}..HEAD`],
        },
        targetDir: cwd,
      },
      {
        ...validationOptions("openclaw/openclaw"),
        skipOpenClawChangedGate: true,
      },
    ),
    {
      status: "passed",
      resolved_commands: [`git diff --check ${sourceHead}..HEAD`],
      available_scripts: ["check:changed"],
    },
  );
});

test("adopted OpenClaw PR repairs validate changelog-only repair deltas without full changed gate", () => {
  const cwd = gitPackageFixture({ "check:changed": "node check.js" });
  fs.writeFileSync(path.join(cwd, "CHANGELOG.md"), "# Changelog\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  const sourceHead = git(cwd, "rev-parse", "HEAD");

  fs.appendFileSync(path.join(cwd, "CHANGELOG.md"), "\n- Fix the Codex plugin bridge.\n");
  git(cwd, "add", "CHANGELOG.md");
  git(cwd, "commit", "-m", "add changelog");

  const plan = repairDeltaValidationPlan(
    {
      fixArtifact: {
        repair_strategy: "repair_contributor_branch",
        validation_commands: ["pnpm check:changed"],
      },
      targetDir: cwd,
      sourceHead,
    },
    validationOptions("openclaw/openclaw"),
  );

  assert.equal(plan.scope, "repair-delta-docs");
  assert.deepEqual(plan.changed_files, ["CHANGELOG.md"]);
  assert.deepEqual(plan.commands, [`git diff --check ${sourceHead}..HEAD`]);
  assert.deepEqual(requiredValidationCommands(plan.commands, cwd, plan.options), [
    `git diff --check ${sourceHead}..HEAD`,
  ]);
});

test("adopted OpenClaw PR repairs keep full changed gate for code repair deltas", () => {
  const cwd = gitPackageFixture({ "check:changed": "node check.js" });
  fs.mkdirSync(path.join(cwd, "src"));
  fs.writeFileSync(path.join(cwd, "src/index.ts"), "export const value = 1;\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  const sourceHead = git(cwd, "rev-parse", "HEAD");

  fs.writeFileSync(path.join(cwd, "src/index.ts"), "export const value = 2;\n");
  git(cwd, "add", "src/index.ts");
  git(cwd, "commit", "-m", "repair code");

  const plan = repairDeltaValidationPlan(
    {
      fixArtifact: {
        repair_strategy: "repair_contributor_branch",
        validation_commands: ["pnpm test src/index.test.ts"],
      },
      targetDir: cwd,
      sourceHead,
    },
    validationOptions("openclaw/openclaw"),
  );

  assert.equal(plan.scope, "changed-surface");
  assert.deepEqual(plan.changed_files, ["src/index.ts"]);
  assert.deepEqual(requiredValidationCommands(plan.commands, cwd, plan.options), [
    "pnpm test src/index.test.ts",
    "pnpm check:changed",
  ]);
});

test("changed validation retries one transient check:changed failure", () => {
  const cwd = gitPackageFixture({
    "check:changed":
      "node -e \"const fs=require('fs'); const file='.attempt'; const count=fs.existsSync(file)?Number(fs.readFileSync(file,'utf8')):0; fs.writeFileSync(file, String(count+1)); if (count===0) { console.error('transient changed gate failure'); process.exit(1); }\"",
  });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  const previous = process.env.CLAWSWEEPER_VALIDATION_RETRIES;
  process.env.CLAWSWEEPER_VALIDATION_RETRIES = "1";
  try {
    assert.deepEqual(
      runAllowedValidationCommands(
        ["pnpm check:changed"],
        cwd,
        validationOptions("openclaw/openclaw"),
      ),
      ["pnpm check:changed"],
    );
  } finally {
    if (previous === undefined) delete process.env.CLAWSWEEPER_VALIDATION_RETRIES;
    else process.env.CLAWSWEEPER_VALIDATION_RETRIES = previous;
  }
});

test("compactText keeps both head and tail for long validation output", () => {
  assert.equal(
    compactText("head ".repeat(20) + "tail failure detail", 64).endsWith("failure detail"),
    true,
  );
});

function packageFixture(scripts) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-"));
  fs.writeFileSync(path.join(cwd, "package.json"), `${JSON.stringify({ scripts }, null, 2)}\n`);
  return cwd;
}

function gitPackageFixture(scripts) {
  const cwd = packageFixture(scripts);
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  return cwd;
}

function attachOrigin(cwd) {
  const origin = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-origin-"));
  git(origin, "init", "--bare");
  git(cwd, "remote", "add", "origin", origin);
  git(cwd, "push", "-u", "origin", "main:main");
}

function git(cwd, ...args) {
  return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
}

function validationOptions(targetRepo) {
  return {
    allowExpensiveValidation: false,
    installTargetDeps: false,
    strictTargetValidation: false,
    targetRepo,
  };
}
