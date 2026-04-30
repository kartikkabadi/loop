import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  preflightTargetValidationPlan,
  requiredValidationCommands,
} from "../../dist/repair/target-validation.js";

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
            "env QA_PARITY_CONCURRENCY=1 OPENCLAW_BUILD_PRIVATE_QA=1 OPENAI_API_KEY= pnpm openclaw qa suite --provider-mode mock-openai --parity-pack agentic",
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

function packageFixture(scripts) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-"));
  fs.writeFileSync(path.join(cwd, "package.json"), `${JSON.stringify({ scripts }, null, 2)}\n`);
  return cwd;
}

function validationOptions(targetRepo) {
  return {
    allowExpensiveValidation: false,
    installTargetDeps: false,
    strictTargetValidation: false,
    targetRepo,
  };
}
