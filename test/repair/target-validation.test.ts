import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  canSkipInternalCodexReviewForRepairDelta,
  invalidatePreparedPackageDependencyVerification,
  invalidatePreparedTargetDependencies,
  preflightTargetValidationPlan,
  prepareBranchTargetDependencies,
  prepareTargetToolchain,
  prepareTrustedTargetDependencies,
  repairDeltaValidationPlan,
  requiredValidationCommands,
  runAllowedValidationCommands,
} from "../../dist/repair/target-validation.js";
import { ensureMergeBaseAvailable } from "../../dist/repair/git-repo-utils.js";
import { compactText } from "../../dist/repair/text-utils.js";
import {
  __resetTargetRepoToolchainCache,
  resolveTargetRepoToolchain,
} from "../../dist/repair/target-toolchain-config.js";
import {
  parseAllowedValidationCommand,
  renderValidationCommand,
} from "../../dist/repair/validation-command-utils.js";

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
  // The target repo's checkout happens to expose a `check:changed` script,
  // but the per-repo toolchain (resolved from config/target-repositories.json)
  // declares ClawHub as bun-based with `changed_gate: null`, so the executor
  // must NOT inject `pnpm check:changed`. It is fine — and expected — that
  // ClawHub's own declared validation commands (e.g. `bun run check`) appear;
  // the invariant under test here is purely "no pnpm check:changed leakage".
  const cwd = packageFixture({ "check:changed": "node check.js" });

  const resolved = requiredValidationCommands([], cwd, validationOptions("openclaw/clawhub"));
  assert.ok(
    !resolved.includes("pnpm check:changed"),
    `expected no pnpm check:changed leakage for non-OpenClaw repo, got ${JSON.stringify(resolved)}`,
  );
});

test("ClawSweeper repairs preserve their configured changed gate from the real config", () => {
  const cwd = packageFixture({ "check:changed": "node check.js" });

  __resetTargetRepoToolchainCache();
  try {
    assert.deepEqual(
      requiredValidationCommands(
        ["pnpm check:changed"],
        cwd,
        validationOptions("openclaw/clawsweeper"),
      ),
      ["pnpm check:changed"],
    );
  } finally {
    __resetTargetRepoToolchainCache();
  }
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

test("OpenClaw automerge repairs can require CI-parity validation commands", () => {
  const cwd = packageFixture({
    "check:changed": "node check.js",
    "check:test-types": "node types.js",
    lint: "node lint.js",
  });
  const options = {
    ...validationOptions("openclaw/openclaw"),
    additionalValidationCommands: ["pnpm lint", "pnpm check:test-types"],
    strictTargetValidation: true,
  };

  assert.deepEqual(requiredValidationCommands(["pnpm check:changed"], cwd, options), [
    "pnpm check:changed",
    "pnpm lint",
    "pnpm check:test-types",
  ]);
  assert.deepEqual(
    preflightTargetValidationPlan(
      { fixArtifact: { validation_commands: ["pnpm check:changed"] }, targetDir: cwd },
      options,
    ),
    {
      status: "passed",
      resolved_commands: ["pnpm check:changed", "pnpm lint", "pnpm check:test-types"],
      available_scripts: ["check:changed", "check:test-types", "lint"],
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

test("validation preflight accepts assignment-prefixed OpenClaw test commands", () => {
  const cwd = packageFixture({ "check:changed": "node check.js" });

  assert.deepEqual(
    preflightTargetValidationPlan(
      {
        fixArtifact: {
          validation_commands: [
            "OPENCLAW_VITEST_FS_MODULE_CACHE_PATH=.vitest-cache-pairing pnpm test:serial src/pairing/pairing-store.test.ts",
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

test("validation preflight accepts leading env assignment commands", () => {
  const cwd = gitPackageFixture({ "test:serial": "node test.js" });
  fs.mkdirSync(path.join(cwd, "src", "pairing"), { recursive: true });
  fs.writeFileSync(path.join(cwd, "src", "pairing", "pairing-store.test.ts"), "");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  const command =
    "OPENCLAW_VITEST_FS_MODULE_CACHE_PATH=.vitest-cache-pairing pnpm test:serial src/pairing/pairing-store.test.ts";

  assert.deepEqual(
    preflightTargetValidationPlan(
      {
        fixArtifact: {
          validation_commands: [command],
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
      resolved_commands: [`env ${command}`],
      available_scripts: ["test:serial"],
    },
  );
});

test("validation parser requires env assignments before env command", () => {
  assert.deepEqual(parseAllowedValidationCommand("FOO=1 pnpm test:serial src/foo.test.ts"), [
    "env",
    "FOO=1",
    "pnpm",
    "test:serial",
    "src/foo.test.ts",
  ]);
  assert.throws(
    () => parseAllowedValidationCommand("env pnpm test:serial src/foo.test.ts"),
    /unsupported validation command/,
  );
});

test("validation parser accepts quoted Go test filters without a shell", () => {
  const parts = parseAllowedValidationCommand(
    "go test ./internal/cmd -run 'TestParseMarkdown.*Table|TestDocsWrite.*Markdown'",
  );
  assert.deepEqual(parts, [
    "go",
    "test",
    "./internal/cmd",
    "-run",
    "TestParseMarkdown.*Table|TestDocsWrite.*Markdown",
  ]);
  assert.equal(
    renderValidationCommand(parts),
    "go test ./internal/cmd -run 'TestParseMarkdown.*Table|TestDocsWrite.*Markdown'",
  );
  assert.throws(() => parseAllowedValidationCommand("go run ./cmd/tool"), /unsupported/);
  assert.throws(
    () => parseAllowedValidationCommand("go test -exec ./scripts/wrapper ./..."),
    /unsupported/,
  );
  assert.throws(
    () => parseAllowedValidationCommand("go test -toolexec ./scripts/wrapper ./..."),
    /unsupported/,
  );
  assert.throws(
    () => parseAllowedValidationCommand("go test -coverprofile=coverage.out ./..."),
    /unsupported/,
  );
  assert.throws(
    () => parseAllowedValidationCommand("go test -coverprofile coverage.out ./..."),
    /unsupported/,
  );
  assert.throws(() => parseAllowedValidationCommand("go test ./...; git push"), /unsafe/);
  assert.throws(
    () => parseAllowedValidationCommand('node -e "process.env.GH_TOKEN"'),
    /unsupported/,
  );
  assert.deepEqual(parseAllowedValidationCommand("node --test test/example.test.ts"), [
    "node",
    "--test",
    "test/example.test.ts",
  ]);
});

test("validation parser accepts Make targets without Make execution overrides", () => {
  assert.deepEqual(parseAllowedValidationCommand("make fmt"), ["make", "fmt"]);
  assert.deepEqual(parseAllowedValidationCommand("make fmt-check test docs-check"), [
    "make",
    "fmt-check",
    "test",
    "docs-check",
  ]);
  assert.throws(() => parseAllowedValidationCommand("make"), /unsupported/);
  assert.throws(() => parseAllowedValidationCommand("make -f scripts/Makefile fmt"), /unsupported/);
  assert.throws(
    () => parseAllowedValidationCommand("make SHELL=./scripts/run.sh fmt"),
    /unsupported/,
  );
  assert.throws(() => parseAllowedValidationCommand("make ../deploy"), /unsupported/);
  assert.throws(() => parseAllowedValidationCommand("make deploy"), /unsupported/);
  assert.throws(() => parseAllowedValidationCommand("make publish"), /unsupported/);
  assert.throws(() => parseAllowedValidationCommand("make install"), /unsupported/);
  assert.throws(() => parseAllowedValidationCommand("make clean"), /unsupported/);
  assert.throws(() => parseAllowedValidationCommand("MAKEFLAGS=-i make test"), /unsupported/);
  assert.throws(
    () => parseAllowedValidationCommand("env MAKEFILES=./scripts/Makefile make test"),
    /unsupported/,
  );
});

test("validation parser normalizes local PowerShell scripts for direct execution", () => {
  assert.deepEqual(parseAllowedValidationCommand("./build.ps1 -Project WinUI"), [
    "pwsh",
    "-File",
    "./build.ps1",
    "-Project",
    "WinUI",
  ]);
  assert.deepEqual(parseAllowedValidationCommand(".\\build.ps1 -Project WinUI"), [
    "pwsh",
    "-File",
    ".\\build.ps1",
    "-Project",
    "WinUI",
  ]);
  assert.deepEqual(
    parseAllowedValidationCommand('dotnet test ".\\tests\\OpenClaw.Shared.Tests.csproj"'),
    ["dotnet", "test", ".\\tests\\OpenClaw.Shared.Tests.csproj"],
  );
  assert.throws(() => parseAllowedValidationCommand("pwsh -Command ./build.ps1"), /unsupported/);
});

test("validation preflight accepts scoped OpenGrep commands", () => {
  const cwd = packageFixture({ "check:changed": "node check.js" });
  const command =
    "scripts/run-opengrep.sh --error -- src/infra/net/http-connect-tunnel.ts src/infra/push-apns-http2.ts src/infra/push-apns.ts";

  assert.deepEqual(parseAllowedValidationCommand(command), [
    "scripts/run-opengrep.sh",
    "--error",
    "--",
    "src/infra/net/http-connect-tunnel.ts",
    "src/infra/push-apns-http2.ts",
    "src/infra/push-apns.ts",
  ]);
  assert.deepEqual(
    preflightTargetValidationPlan(
      {
        fixArtifact: {
          validation_commands: [command],
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
  assert.equal(canSkipInternalCodexReviewForRepairDelta(plan), true);
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
  assert.equal(canSkipInternalCodexReviewForRepairDelta(plan), false);
});

test("bun-based target repos do not get pnpm check:changed injected", () => {
  const cwd = bunPackageFixture({ check: "bun x tsc --noEmit" });

  assert.deepEqual(
    requiredValidationCommands([], cwd, validationOptions("openclaw/clawhub", clawhubToolchain())),
    ["bun run check"],
  );
});

test("bun-based target repos pass preflight when their script exists", () => {
  const cwd = bunPackageFixture({ check: "bun x tsc --noEmit" });

  assert.deepEqual(
    preflightTargetValidationPlan(
      { fixArtifact: { validation_commands: ["bun run check"] }, targetDir: cwd },
      validationOptions("openclaw/clawhub", clawhubToolchain()),
    ),
    {
      status: "passed",
      resolved_commands: ["bun run check"],
      available_scripts: ["check"],
    },
  );
});

test("repair branch preparation treats bun run paths as direct validation files", () => {
  const cwd = gitBunPackageFixture({});
  fs.writeFileSync(path.join(cwd, "validate.ts"), "process.exit(1);\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "validate.ts"), "process.exit(0);\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/bun-file", {
          ...clawhubToolchain(),
          installTargetDeps: false,
        }),
        "main",
        ["bun run ./validate.ts"],
      ),
    /validation_definition_changed: direct validation script validate\.ts/,
  );
});

test("bun-based target repos drop stale pnpm check:changed and pass on their real validation command", () => {
  // Regression guard for the stale-deterministic-artifact path: an automerge
  // artifact authored before per-repo toolchain config (or any future caller
  // that still ships `pnpm check:changed` for a non-pnpm target) must not be
  // able to terminally preflight ClawHub on `validation_script_missing`.
  // Instead the bun toolchain's baseValidationCommands (`bun run check`)
  // should drive preflight to `passed`.
  const cwd = bunPackageFixture({ check: "bun x tsc --noEmit" });

  const result = preflightTargetValidationPlan(
    { fixArtifact: { validation_commands: ["pnpm check:changed"] }, targetDir: cwd },
    validationOptions("openclaw/clawhub", clawhubToolchain()),
  );

  assert.equal(result.status, "passed");
  assert.deepEqual(result.resolved_commands, ["bun run check"]);
  assert.deepEqual(result.available_scripts, ["check"]);
});

test("non-gated package repos report the stale gate when inferred full-suite tests are disallowed", () => {
  const cwd = packageFixture({ test: "node test.js" });

  const result = preflightTargetValidationPlan(
    { fixArtifact: { validation_commands: ["pnpm check:changed"] }, targetDir: cwd },
    validationOptions("openclaw/fs-safe", {
      toolchain: {
        packageManager: "pnpm",
        packageManagerExplicit: false,
        baseValidationCommands: [],
        changedGate: null,
        requiresFullHistory: false,
        executionRunner: null,
        baseBranch: null,
      },
    }),
  );

  // Native inference finds `pnpm run test`, but the default expensive-validation
  // policy rejects an unscoped full suite and reports the stale requested gate.
  assert.equal(result.status, "blocked");
  assert.equal(result.code, "validation_script_missing");
  assert.deepEqual(result.resolved_commands, ["pnpm check:changed"]);
  assert.deepEqual(result.available_scripts, ["test"]);
});

test("non-gated Go repos replace stale pnpm fallback with go test", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-go-"));
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");

  const result = preflightTargetValidationPlan(
    { fixArtifact: { validation_commands: ["pnpm check:changed"] }, targetDir: cwd },
    validationOptions("openclaw/gogcli"),
  );

  assert.equal(result.status, "passed");
  assert.deepEqual(result.resolved_commands, ["go test ./..."]);
});

test("mixed Go and package repos infer both validation gates", () => {
  const cwd = packageFixture({ check: "node check.js" });
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");

  assert.deepEqual(requiredValidationCommands([], cwd, validationOptions("openclaw/mixed")), [
    "go test ./...",
    "pnpm run check",
  ]);
});

test("generic package repos infer every independent validation gate", () => {
  const cwd = packageFixture({
    check: "tsc --noEmit",
    lint: "eslint .",
    test: "node --test",
  });

  assert.deepEqual(requiredValidationCommands([], cwd, validationOptions("openclaw/package")), [
    "pnpm run check",
    "pnpm run test",
    "pnpm run lint",
  ]);
});

test("generic Make repos infer every independent validation gate", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-gates-"));
  fs.writeFileSync(path.join(cwd, "Makefile"), "check:\n\t@true\ntest:\n\t@true\nlint:\n\t@true\n");

  assert.deepEqual(requiredValidationCommands([], cwd, validationOptions("openclaw/make")), [
    "make check",
    "make test",
    "make lint",
  ]);
});

test("generic validation adds repository-native gates introduced by the repair branch", () => {
  const cwd = packageFixture({ check: "node check.js" });
  const frozen = requiredValidationCommands([], cwd, validationOptions("openclaw/mixed"));
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");

  assert.deepEqual(frozen, ["pnpm run check"]);
  assert.deepEqual(requiredValidationCommands(frozen, cwd, validationOptions("openclaw/mixed")), [
    "pnpm run check",
    "go test ./...",
  ]);
});

test("generic validation rejects a branch-created validation baseline", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-branch-baseline-"));
  const options = validationOptions("openclaw/unknown", {
    requireTrustedValidationBaseline: true,
  });
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");

  assert.deepEqual(requiredValidationCommands([], cwd, options), []);
});

test("generic Go repos keep native tests alongside their Make CI gate", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-go-make-"));
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");
  fs.writeFileSync(path.join(cwd, "Makefile"), "ci: fmt-check lint test docs-check\n");

  assert.deepEqual(requiredValidationCommands([], cwd, validationOptions("openclaw/gogcli")), [
    "go test ./...",
    "make ci",
  ]);
});

test(
  "validation inference does not follow symlinked Makefiles",
  { skip: process.platform === "win32" },
  () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-symlink-"));
    const outside = path.join(
      fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-outside-")),
      "Makefile",
    );
    fs.writeFileSync(outside, "ci:\n\t@echo outside\n");
    fs.symlinkSync(outside, path.join(cwd, "Makefile"));

    assert.deepEqual(
      requiredValidationCommands([], cwd, validationOptions("openclaw/symlink")),
      [],
    );
  },
);

test("trusted base preparation prewarms tools required by an inferred Make CI gate", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-prepare-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(
    path.join(cwd, "Makefile"),
    "ci: test\nci: fmt-check\nfmt-check: tools\ntools:\n",
  );
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeMakeFixture(cwd);

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(
      cwd,
      validationOptions("openclaw/gogcli", { installTargetDeps: true }),
      "main",
    );
  });

  assert.equal(fs.readFileSync(logPath, "utf8").trim(), "tools");
});

test("trusted preparation inspects every target in multi-target Make commands", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-multi-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "Makefile"), "lint test: tools\ntools:\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeMakeFixture(cwd);

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(
      cwd,
      validationOptions("openclaw/make-multi", { installTargetDeps: true }),
      "main",
      ["make lint test"],
    );
  });

  assert.equal(fs.readFileSync(logPath, "utf8").trim(), "tools");
});

test("multi-target Make validation detects package and Go toolchains", () => {
  const packageCwd = gitPackageFixture({});
  fs.writeFileSync(
    path.join(packageCwd, "Makefile"),
    "lint:\n\t@echo lint\ntest:\n\t@pnpm run test\n",
  );
  git(packageCwd, "add", ".");
  git(packageCwd, "commit", "-m", "initial");
  attachOrigin(packageCwd);
  const packageFixture = fakePnpmFixture(packageCwd);

  withPathPrefix(packageFixture.binDir, () => {
    prepareTrustedTargetDependencies(
      packageCwd,
      validationOptions("openclaw/make-package", { installTargetDeps: true }),
      "main",
      ["make lint test"],
    );
  });
  assert.match(fs.readFileSync(packageFixture.logPath, "utf8"), / install /);

  const goCwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-go-"));
  git(goCwd, "init", "-b", "main");
  git(goCwd, "config", "user.email", "clawsweeper@example.invalid");
  git(goCwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(goCwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");
  fs.writeFileSync(path.join(goCwd, "Makefile"), "lint:\n\t@echo lint\ntest:\n\t@go test ./...\n");
  git(goCwd, "add", ".");
  git(goCwd, "commit", "-m", "initial");
  attachOrigin(goCwd);
  const goFixture = fakeGoFixture(goCwd);

  withPathPrefix(goFixture.binDir, () => {
    prepareTrustedTargetDependencies(
      goCwd,
      validationOptions("openclaw/make-go", { installTargetDeps: true }),
      "main",
      ["make lint test"],
    );
  });
  assert.deepEqual(fs.readFileSync(goFixture.logPath, "utf8").trim().split(/\r?\n/), [
    "version",
    "mod download all",
  ]);
});

test("repair branch preparation rejects branch-controlled Make setup", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-branch-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "Makefile"), "ci: test\ntest:\n\t@echo test\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "Makefile"), "ci: tools\ntools:\n\t@curl example.invalid\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/gogcli", { installTargetDeps: true }),
        "main",
        ["make ci"],
      ),
    /validation_definition_changed: Makefile/,
  );
});

test("repair branch preparation trusts GNU make precedence", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-precedence-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "Makefile"), "ci:\n\t@echo test\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "GNUmakefile"), "ci:\n\t@true\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/gogcli", { installTargetDeps: true }),
        "main",
        ["make ci"],
      ),
    /validation_definition_changed: GNUmakefile/,
  );
});

test("repair branch preparation rejects deleted higher-precedence Makefiles", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-deleted-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "GNUmakefile"), "ci:\n\t@echo trusted\n");
  fs.writeFileSync(path.join(cwd, "Makefile"), "ci:\n\t@echo lower-precedence\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.rmSync(path.join(cwd, "GNUmakefile"));

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/gogcli", { installTargetDeps: true }),
        "main",
        ["make ci"],
      ),
    /validation_definition_changed: Makefile/,
  );
});

test("repair branch preparation rejects changed PowerShell validation scripts", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-pwsh-branch-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "build.ps1"), "dotnet build ./App.csproj\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "build.ps1"), "exit 0\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/windows", { installTargetDeps: true }),
        "main",
        ["./build.ps1"],
      ),
    /validation_definition_changed: build\.ps1/,
  );
});

test("repair branch preparation rejects changed PowerShell validation helpers", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-pwsh-helper-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "build.ps1"), '. "$PSScriptRoot/helper.ps1"\n');
  fs.writeFileSync(path.join(cwd, "helper.ps1"), "dotnet build ./App.csproj\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "helper.ps1"), "exit 0\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/windows", { installTargetDeps: false }),
        "main",
        ["./build.ps1"],
      ),
    /validation_definition_changed: referenced validation file helper\.ps1/,
  );
});

test("PowerShell process-relative helpers resolve from the repository root", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-pwsh-relative-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "build.ps1"), ". ./helper.ps1\n");
  fs.writeFileSync(path.join(cwd, "helper.ps1"), "dotnet build ./App.csproj\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "helper.ps1"), "exit 0\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/windows", { installTargetDeps: false }),
        "main",
        ["./scripts/build.ps1"],
      ),
    /validation_definition_changed: referenced validation file helper\.ps1/,
  );
});

test("repair branch preparation resolves deterministic PowerShell Join-Path helpers", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-pwsh-join-path-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(
    path.join(cwd, "build.ps1"),
    '& (Join-Path $PSScriptRoot "scripts/check.ps1")\n',
  );
  fs.writeFileSync(path.join(cwd, "scripts", "check.ps1"), "dotnet build ./App.csproj\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "scripts", "check.ps1"), "exit 0\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/windows", { installTargetDeps: false }),
        "main",
        ["./build.ps1"],
      ),
    /validation_definition_changed: referenced validation file scripts\/check\.ps1/,
  );
});

test("repair branch preparation rejects dynamic PowerShell helper invocation", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-pwsh-dynamic-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "build.ps1"), "param([string]$Helper)\n& $Helper\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/windows", { installTargetDeps: false }),
        "main",
        ["./build.ps1"],
      ),
    /validation_definition_untrusted: dynamic PowerShell validation reference/,
  );
});

test("repair branch preparation validates PowerShell path arguments", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-pwsh-argument-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "build.ps1"), "param([string]$Helper)\nWrite-Output ok\n");
  fs.writeFileSync(path.join(cwd, "helper.ps1"), "dotnet build ./App.csproj\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "helper.ps1"), "exit 0\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/windows", { installTargetDeps: false }),
        "main",
        ["./build.ps1 -Helper ./helper.ps1"],
      ),
    /validation_definition_changed: direct validation script helper\.ps1/,
  );
});

test("repair branch preparation rejects changed package validation scripts", () => {
  const cwd = gitPackageFixture({ check: "node check.js" });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify({ scripts: { check: "node noop.js" } }, null, 2)}\n`,
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: true }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: package script check/,
  );
});

test("repair branch preparation rejects changed npm test aliases", () => {
  const cwd = gitPackageFixture({ test: "node scripts/test.js" });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "test.js"), "process.exit(0);\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify({ scripts: { test: 'node -e "process.exit(0)"' } }, null, 2)}\n`,
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["npm test"],
      ),
    /validation_definition_changed: package script test/,
  );
});

test("repair branch preparation rejects changed package validation helpers", () => {
  const cwd = gitPackageFixture({ check: "node scripts/check.js" });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "check.js"), "process.exit(0);\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "scripts", "check.js"), "process.exit(0); // bypass\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: referenced validation file scripts\/check\.js/,
  );
});

test("repair branch preparation rejects changed imported JavaScript validation helpers", () => {
  const cwd = gitPackageFixture({ check: "node scripts/check.js" });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(
    path.join(cwd, "scripts", "check.js"),
    'import { validate } from "./helper.js";\nvalidate();\n',
  );
  fs.writeFileSync(path.join(cwd, "scripts", "helper.js"), "export function validate() {}\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, "scripts", "helper.js"),
    "export function validate() { process.exit(0); }\n",
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: referenced validation file scripts\/helper\.js/,
  );
});

test("repair branch preparation follows commented JavaScript module calls", () => {
  const cwd = gitPackageFixture({ check: "node scripts/check.cjs" });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(
    path.join(cwd, "scripts", "check.cjs"),
    'require /* trusted comment */ ("./helper.cjs");\n',
  );
  fs.writeFileSync(path.join(cwd, "scripts", "helper.cjs"), "module.exports = true;\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "scripts", "helper.cjs"), "module.exports = false;\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: referenced validation file scripts\/helper\.cjs/,
  );
});

test("repair branch preparation rejects changed package import maps used by validators", () => {
  const cwd = gitPackageFixture({ check: "node scripts/check.js" });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify(
      {
        imports: { "#validator": "./scripts/helper.js" },
        scripts: { check: "node scripts/check.js" },
      },
      null,
      2,
    )}\n`,
  );
  fs.writeFileSync(
    path.join(cwd, "scripts", "check.js"),
    'import { validate } from "#validator";\nvalidate();\n',
  );
  fs.writeFileSync(path.join(cwd, "scripts", "helper.js"), "export function validate() {}\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const packageJson = JSON.parse(fs.readFileSync(path.join(cwd, "package.json"), "utf8"));
  packageJson.imports["#validator"] = "./scripts/noop.js";
  fs.writeFileSync(path.join(cwd, "package.json"), `${JSON.stringify(packageJson, null, 2)}\n`);
  fs.writeFileSync(path.join(cwd, "scripts", "noop.js"), "export function validate() {}\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: package import map package\.json/,
  );
});

test("repair branch preparation checks workspace package import maps", () => {
  const cwd = gitPackageFixture({ check: "node packages/app/check.js" });
  fs.mkdirSync(path.join(cwd, "packages", "app"), { recursive: true });
  fs.writeFileSync(
    path.join(cwd, "packages", "app", "package.json"),
    `${JSON.stringify({ imports: { "#validator": "./helper.js" } }, null, 2)}\n`,
  );
  fs.writeFileSync(
    path.join(cwd, "packages", "app", "check.js"),
    'import { validate } from "#validator";\nvalidate();\n',
  );
  fs.writeFileSync(
    path.join(cwd, "packages", "app", "helper.js"),
    "export function validate() {}\n",
  );
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const packageJsonPath = path.join(cwd, "packages", "app", "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.imports["#validator"] = "./noop.js";
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
  fs.writeFileSync(path.join(cwd, "packages", "app", "noop.js"), "export function validate() {}\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: package import map packages\/app\/package\.json/,
  );
});

test("repair branch preparation rejects package scripts delegated by JavaScript helpers", () => {
  const cwd = gitPackageFixture({
    check: "node scripts/check.js",
    delegated: "node scripts/delegated.js",
  });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(
    path.join(cwd, "scripts", "check.js"),
    'import { execSync } from "node:child_process";\nexecSync("pnpm run delegated");\n',
  );
  fs.writeFileSync(path.join(cwd, "scripts", "delegated.js"), "process.exit(0);\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const packageJson = JSON.parse(fs.readFileSync(path.join(cwd, "package.json"), "utf8"));
  packageJson.scripts.delegated = 'node -e "process.exit(0)"';
  fs.writeFileSync(path.join(cwd, "package.json"), `${JSON.stringify(packageJson, null, 2)}\n`);

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: package script delegated/,
  );
});

test("repair branch preparation rejects dynamic JavaScript validation imports", () => {
  const cwd = gitPackageFixture({ check: "node scripts/check.js" });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(
    path.join(cwd, "scripts", "check.js"),
    "const helper = process.env.CHECK_HELPER;\nawait import(helper);\n",
  );
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_untrusted: dynamic JavaScript validation reference/,
  );
});

test("repair branch preparation rejects changed implicit Vitest configuration", () => {
  const cwd = gitPackageFixture({ check: "vitest run" });
  fs.writeFileSync(path.join(cwd, "vitest.config.ts"), "export default {};\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, "vitest.config.ts"),
    "export default { test: { passWithNoTests: true } };\n",
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: implicit validator config vitest\.config\.ts/,
  );
});

test("repair branch preparation rejects changed implicit Oxlint configuration", () => {
  const cwd = gitPackageFixture({ check: "oxlint" });
  fs.writeFileSync(path.join(cwd, ".oxlintrc.json"), '{"rules":{}}\n');
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, ".oxlintrc.json"), '{"rules":{"no-debugger":"off"}}\n');

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: implicit validator config \.oxlintrc\.json/,
  );
});

test("repair branch preparation rejects nested auto-loaded validator configuration", () => {
  const cwd = gitPackageFixture({ check: "eslint ." });
  fs.mkdirSync(path.join(cwd, "packages", "app"), { recursive: true });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "packages", "app", "eslint.config.js"), "export default [];\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: implicit validator config packages\/app\/eslint\.config\.js/,
  );
});

test("repair branch preparation rejects changed explicit validator configuration", () => {
  const cwd = gitPackageFixture({ check: "oxlint --tsconfig ./tsconfig.oxlint.json" });
  fs.writeFileSync(path.join(cwd, "tsconfig.oxlint.json"), '{"compilerOptions":{}}\n');
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, "tsconfig.oxlint.json"),
    '{"compilerOptions":{"skipLibCheck":true}}\n',
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: referenced validation file tsconfig\.oxlint\.json/,
  );
});

test("repair branch preparation rejects config injected through package script arguments", () => {
  const cwd = gitPackageFixture({ check: "vitest" });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, "branch-vitest.config.ts"),
    "export default { test: { passWithNoTests: true } };\n",
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check -- --config ./branch-vitest.config.ts"],
      ),
    /validation_definition_changed: referenced validation file branch-vitest\.config\.ts/,
  );
});

test("repair branch preparation resolves directory-valued TypeScript projects", () => {
  const cwd = gitPackageFixture({ check: "tsc -p packages/app" });
  fs.mkdirSync(path.join(cwd, "packages", "app"), { recursive: true });
  fs.writeFileSync(
    path.join(cwd, "packages", "app", "tsconfig.json"),
    '{"compilerOptions":{"strict":true}}\n',
  );
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, "packages", "app", "tsconfig.json"),
    '{"compilerOptions":{"strict":false}}\n',
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: referenced validation file packages\/app\/tsconfig\.json/,
  );
});

test("repair branch preparation rejects changed referenced TypeScript configuration", () => {
  const cwd = gitPackageFixture({ check: "tsc -b" });
  fs.mkdirSync(path.join(cwd, "packages", "app"), { recursive: true });
  fs.writeFileSync(
    path.join(cwd, "tsconfig.json"),
    '{\n  // project graph\n  "files": [],\n  "references": [{ "path": "./packages/app" }],\n}\n',
  );
  fs.writeFileSync(
    path.join(cwd, "packages", "app", "tsconfig.json"),
    '{"compilerOptions":{"strict":true}}\n',
  );
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, "packages", "app", "tsconfig.json"),
    '{"compilerOptions":{"strict":false}}\n',
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: TypeScript config packages\/app\/tsconfig\.json/,
  );
});

test(
  "repair branch preparation rejects symlinked implicit Vitest configuration",
  { skip: process.platform === "win32" },
  () => {
    const cwd = gitPackageFixture({ check: "vitest run" });
    git(cwd, "add", ".");
    git(cwd, "commit", "-m", "initial");
    attachOrigin(cwd);
    fs.writeFileSync(path.join(cwd, "branch-vitest.config.ts"), "export default {};\n");
    fs.symlinkSync("branch-vitest.config.ts", path.join(cwd, "vitest.config.ts"));

    assert.throws(
      () =>
        prepareBranchTargetDependencies(
          cwd,
          validationOptions("openclaw/package", { installTargetDeps: false }),
          "main",
          ["pnpm run check"],
        ),
      /validation_definition_changed: implicit validator config vitest\.config\.ts/,
    );
  },
);

test("repair branch preparation unwraps package executors before checking helpers", () => {
  const cwd = gitPackageFixture({ check: "npx --yes tsx scripts/check.ts" });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "check.ts"), "process.exit(0);\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "scripts", "check.ts"), "process.exit(0); // bypass\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: referenced validation file scripts\/check\.ts/,
  );
});

test("repair branch preparation checks helpers referenced through shell eval wrappers", () => {
  const cwd = gitPackageFixture({ check: "bash -c './scripts/check.sh'" });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "check.sh"), "#!/bin/sh\nexit 0\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "scripts", "check.sh"), "#!/bin/sh\ntrue\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: referenced validation file scripts\/check\.sh/,
  );
});

test("repair branch preparation follows package scripts through cross-env wrappers", () => {
  const cwd = gitPackageFixture({
    check: "cross-env CI=1 pnpm run lint",
    lint: "node scripts/lint.js",
  });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "lint.js"), "process.exit(0);\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const packageJson = JSON.parse(fs.readFileSync(path.join(cwd, "package.json"), "utf8"));
  packageJson.scripts.lint = 'node -e "process.exit(0)"';
  fs.writeFileSync(path.join(cwd, "package.json"), `${JSON.stringify(packageJson, null, 2)}\n`);

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: package script lint/,
  );
});

test("repair branch preparation rejects stateful package-script delegation", () => {
  const cwd = gitPackageFixture({ check: "cd packages/app && npm test" });
  fs.mkdirSync(path.join(cwd, "packages", "app"), { recursive: true });
  fs.writeFileSync(
    path.join(cwd, "packages", "app", "package.json"),
    `${JSON.stringify({ scripts: { test: "node test.js" } }, null, 2)}\n`,
  );
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, "packages", "app", "package.json"),
    `${JSON.stringify({ scripts: { test: 'node -e "process.exit(0)"' } }, null, 2)}\n`,
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_untrusted: stateful shell delegation cd/,
  );
});

test("repair branch preparation rejects shell-sourced validation helpers", () => {
  const cwd = gitPackageFixture({ check: ". ./scripts/check.sh" });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "check.sh"), "#!/bin/sh\nexit 0\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "scripts", "check.sh"), "#!/bin/sh\ntrue\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_untrusted: stateful shell delegation \./,
  );
});

test("repair branch preparation rejects workspace package validation delegation", () => {
  const cwd = gitPackageFixture({ check: "pnpm --filter pkg run test" });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_untrusted: workspace package validation delegation is unsupported/,
  );
});

test("repair branch preparation rejects workspace-routed validation commands", () => {
  const cwd = gitPackageFixture({ test: "node --test" });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const options = validationOptions("openclaw/package", { installTargetDeps: false });

  for (const command of [
    "npm run test --workspace packages/foo",
    "npm test --workspace=packages/foo",
    "npm run test --prefix packages/foo",
  ]) {
    assert.throws(
      () => prepareBranchTargetDependencies(cwd, options, "main", [command]),
      /validation_definition_untrusted: workspace package validation delegation is unsupported/,
    );
  }
});

test("repair branch preparation allows workspace-like forwarded arguments", () => {
  const cwd = gitPackageFixture({ test: "node --test" });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const options = validationOptions("openclaw/package", { installTargetDeps: false });

  for (const command of ["pnpm run test -- --filter foo", "npm run test -- --workspace fixture"]) {
    assert.doesNotThrow(() => prepareBranchTargetDependencies(cwd, options, "main", [command]));
  }
});

test("repair branch preparation rejects changed nested package validation scripts", () => {
  const cwd = gitPackageFixture({
    check: "pnpm run lint",
    lint: "node scripts/lint.js",
  });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "lint.js"), "process.exit(0);\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify(
      {
        scripts: {
          check: "pnpm run lint",
          lint: 'node -e "process.exit(0)"',
        },
      },
      null,
      2,
    )}\n`,
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: package script lint/,
  );
});

test("repair branch preparation rejects changed package lifecycle validation hooks", () => {
  const cwd = gitPackageFixture({
    precheck: "node scripts/setup.js",
    check: "node scripts/check.js",
  });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "setup.js"), "process.exit(0);\n");
  fs.writeFileSync(path.join(cwd, "scripts", "check.js"), "process.exit(0);\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify(
      {
        scripts: {
          precheck: 'node -e "process.exit(0)"',
          check: "node scripts/check.js",
        },
      },
      null,
      2,
    )}\n`,
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: package script precheck/,
  );
});

test("repair branch preparation rejects changed direct Node validation scripts", () => {
  const cwd = gitPackageFixture({});
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "validate.js"), "process.exit(0);\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "scripts", "validate.js"), "process.exit(0); // bypass\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["node scripts/validate.js"],
      ),
    /validation_definition_changed: direct validation script scripts\/validate\.js/,
  );
});

test("repair branch preparation rejects changed imports from direct Node validation scripts", () => {
  const cwd = gitPackageFixture({});
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(
    path.join(cwd, "scripts", "validate.js"),
    'import { validate } from "./helper.js";\nvalidate();\n',
  );
  fs.writeFileSync(path.join(cwd, "scripts", "helper.js"), "export function validate() {}\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, "scripts", "helper.js"),
    "export function validate() { process.exit(0); }\n",
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["node scripts/validate.js"],
      ),
    /validation_definition_changed: referenced validation file scripts\/helper\.js/,
  );
});

test("repair branch preparation checks every Node validation script argument", () => {
  const cwd = gitPackageFixture({
    check: "node --require ./scripts/bootstrap.js ./scripts/validate.js",
  });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "bootstrap.js"), "process.exitCode = 0;\n");
  fs.writeFileSync(path.join(cwd, "scripts", "validate.js"), "process.exit(0);\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "scripts", "validate.js"), "process.exit(0); // bypass\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: referenced validation file scripts\/validate\.js/,
  );
});

test("repair branch preparation rejects execution-routing environment assignments", () => {
  const cwd = gitPackageFixture({
    check: "cross-env NODE_OPTIONS=--require=./scripts/bootstrap.cjs node scripts/validate.js",
  });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "bootstrap.cjs"), "module.exports = {};\n");
  fs.writeFileSync(path.join(cwd, "scripts", "validate.js"), "process.exit(0);\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_untrusted: environment assignment NODE_OPTIONS/,
  );
});

test("repair branch preparation rejects package-manager shell aliases", () => {
  const cwd = gitPackageFixture({
    check: "npm_config_script_shell=./scripts/pass pnpm run validate",
    validate: "node scripts/validate.js",
  });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "pass"), "#!/bin/sh\nexit 0\n");
  fs.writeFileSync(path.join(cwd, "scripts", "validate.js"), "process.exit(1);\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_untrusted: environment assignment NPM_CONFIG_SCRIPT_SHELL/,
  );
});

test("repair branch preparation rejects dynamic package-script command substitution", () => {
  const cwd = gitPackageFixture({ check: 'node "$(cat .validator)"' });
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, ".validator"), "scripts/validate.js\n");
  fs.writeFileSync(path.join(cwd, "scripts", "validate.js"), "process.exit(1);\n");
  fs.writeFileSync(path.join(cwd, "scripts", "pass.js"), "process.exit(0);\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, ".validator"), "scripts/pass.js\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_untrusted: dynamic shell substitution/,
  );
});

test("repair branch preparation rejects changed direct OpenGrep validation scripts", () => {
  const cwd = gitPackageFixture({});
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "run-opengrep.sh"), "#!/bin/sh\nexit 0\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "scripts", "run-opengrep.sh"), "#!/bin/sh\ntrue\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["scripts/run-opengrep.sh --error -- src/index.ts"],
      ),
    /validation_definition_changed: direct validation script scripts\/run-opengrep\.sh/,
  );
});

test("repair branch preparation rejects changed included Make definitions", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-include-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.mkdirSync(path.join(cwd, "tools"));
  fs.writeFileSync(path.join(cwd, "Makefile"), "include tools/ci.mk\nci: check\n");
  fs.writeFileSync(path.join(cwd, "tools", "ci.mk"), "check:\n\t@echo check\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "tools", "ci.mk"), "check:\n\t@true\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/make", { installTargetDeps: false }),
        "main",
        ["make ci"],
      ),
    /validation_definition_changed: referenced validation file tools\/ci\.mk/,
  );
});

test("repair branch preparation rejects changed recursive Make definitions", () => {
  const cwd = gitPackageFixture({});
  fs.mkdirSync(path.join(cwd, "tools"));
  fs.writeFileSync(path.join(cwd, "Makefile"), "ci:\n\tmake -f tools/ci.mk test\n");
  fs.writeFileSync(path.join(cwd, "tools", "ci.mk"), "test:\n\t@echo tested\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "tools", "ci.mk"), "test:\n\t@true\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/make", { installTargetDeps: false }),
        "main",
        ["make ci"],
      ),
    /validation_definition_changed: referenced validation file tools\/ci\.mk/,
  );
});

test("repair branch preparation resolves static Make helper variables", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-helper-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "Makefile"), "CHECK := ./scripts/check.sh\nci:\n\t@$(CHECK)\n");
  fs.writeFileSync(path.join(cwd, "scripts", "check.sh"), "#!/bin/sh\nexit 0\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "scripts", "check.sh"), "#!/bin/sh\ntrue\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/make", { installTargetDeps: false }),
        "main",
        ["make ci"],
      ),
    /validation_definition_changed: referenced validation file scripts\/check\.sh/,
  );
});

test("repair branch preparation resolves deterministic Make built-ins", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-builtins-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(
    path.join(cwd, "Makefile"),
    "TOOLS_DIR := $(CURDIR)/scripts\nci:\n\t@$(TOOLS_DIR)/check.sh\n",
  );
  fs.writeFileSync(path.join(cwd, "scripts", "check.sh"), "#!/bin/sh\nexit 0\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "scripts", "check.sh"), "#!/bin/sh\ntrue\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/make", { installTargetDeps: false }),
        "main",
        ["make ci"],
      ),
    /validation_definition_changed: referenced validation file scripts\/check\.sh/,
  );
});

test("repair branch preparation rejects unresolved Make recipe variables", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-dynamic-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "Makefile"), "ci:\n\t@$(CHECK)\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/make", { installTargetDeps: false }),
        "main",
        ["make ci"],
      ),
    /validation_definition_untrusted: dynamic Make recipe \$\(CHECK\)/,
  );
});

test("repair branch preparation rejects automatic Make variables in helper paths", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-automatic-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "Makefile"), "ci: scripts/check.sh\n\t@bash $<\n");
  fs.writeFileSync(path.join(cwd, "scripts", "check.sh"), "#!/bin/sh\nexit 0\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/make", { installTargetDeps: false }),
        "main",
        ["make ci"],
      ),
    /validation_definition_untrusted: automatic Make variable \$</,
  );
});

test("repair branch preparation rejects paths shadowing non-phony Make targets", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-shadow-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "Makefile"), "check:\n\t@echo checked\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "check"), "shadow\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/make", { installTargetDeps: false }),
        "main",
        ["make check"],
      ),
    /validation_definition_untrusted: Make target check is shadowed by a repository path/,
  );
});

test("repair branch preparation ignores dynamic recipes outside the selected Make graph", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-unrelated-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(
    path.join(cwd, "Makefile"),
    "ci:\n\t@./scripts/check.sh\nrelease:\n\t@echo $(VERSION)\n",
  );
  fs.writeFileSync(path.join(cwd, "scripts", "check.sh"), "#!/bin/sh\nexit 0\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  assert.doesNotThrow(() =>
    prepareBranchTargetDependencies(
      cwd,
      validationOptions("openclaw/make", { installTargetDeps: false }),
      "main",
      ["make ci"],
    ),
  );
});

test("repair branch preparation resolves nested Make includes from the repository root", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-nested-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.mkdirSync(path.join(cwd, "tools"));
  fs.writeFileSync(path.join(cwd, "Makefile"), "include tools/ci.mk\nci: check\n");
  fs.writeFileSync(path.join(cwd, "tools", "ci.mk"), "include shared.mk\n");
  fs.writeFileSync(path.join(cwd, "shared.mk"), "check:\n\t@echo check\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "shared.mk"), "check:\n\t@true\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/make", { installTargetDeps: false }),
        "main",
        ["make ci"],
      ),
    /validation_definition_changed: referenced validation file shared\.mk/,
  );
});

test(
  "repair branch preparation compares validation files through Git normalization",
  { skip: process.platform === "win32" },
  () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-eol-"));
    git(cwd, "init", "-b", "main");
    git(cwd, "config", "user.email", "clawsweeper@example.invalid");
    git(cwd, "config", "user.name", "ClawSweeper Test");
    fs.writeFileSync(path.join(cwd, ".gitattributes"), "build.ps1 text eol=crlf\n");
    fs.writeFileSync(path.join(cwd, "build.ps1"), "dotnet build\n");
    git(cwd, "add", ".");
    git(cwd, "commit", "-m", "initial");
    attachOrigin(cwd);
    fs.writeFileSync(path.join(cwd, "build.ps1"), "dotnet build\r\n");

    assert.doesNotThrow(() =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/windows", { installTargetDeps: false }),
        "main",
        ["./build.ps1"],
      ),
    );
  },
);

test("repair branch trust checks remain active when dependency installs are disabled", () => {
  const cwd = gitPackageFixture({ check: "node check.js" });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify({ scripts: { check: "node noop.js" } }, null, 2)}\n`,
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: false }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: package script check/,
  );
});

test("repair branch preparation rejects executable package-manager config changes", () => {
  const cwd = gitPackageFixture({ check: "node check.js" });
  fs.writeFileSync(path.join(cwd, ".pnpmfile.cjs"), "module.exports = {};\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, ".pnpmfile.cjs"),
    "module.exports = { hooks: { readPackage(pkg) { return pkg; } } };\n",
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: true }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: \.pnpmfile\.cjs/,
  );
});

test(
  "repair branch preparation rejects symlinked package-manager config",
  { skip: process.platform === "win32" },
  () => {
    const cwd = gitPackageFixture({ check: "node check.js" });
    git(cwd, "add", ".");
    git(cwd, "commit", "-m", "initial");
    attachOrigin(cwd);
    fs.writeFileSync(path.join(cwd, "branch-npmrc"), "script-shell=/bin/false\n");
    fs.symlinkSync("branch-npmrc", path.join(cwd, ".npmrc"));

    assert.throws(
      () =>
        prepareBranchTargetDependencies(
          cwd,
          validationOptions("openclaw/package", { installTargetDeps: true }),
          "main",
          ["pnpm run check"],
        ),
      /validation_definition_changed: \.npmrc is not a trusted regular file/,
    );
  },
);

test("repair branch preparation rejects pnpm 11 module hooks", () => {
  const cwd = gitPackageFixture({ check: "node check.js" });
  fs.writeFileSync(path.join(cwd, ".pnpmfile.mjs"), "export const hooks = {};\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(
    path.join(cwd, ".pnpmfile.mjs"),
    "export const hooks = { readPackage(pkg) { return pkg; } };\n",
  );

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: true }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: \.pnpmfile\.mjs/,
  );
});

test("Go-only branch validation ignores unrelated package metadata changes", () => {
  const cwd = packageFixture({});
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");
  fs.writeFileSync(path.join(cwd, ".npmrc"), "registry=https://registry.npmjs.org/\n");
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, ".npmrc"), "registry=https://example.invalid/\n");

  assert.doesNotThrow(() =>
    prepareBranchTargetDependencies(
      cwd,
      validationOptions("openclaw/go-only", { installTargetDeps: false }),
      "main",
      ["go test ./..."],
    ),
  );
});

test("narrow Make targets supplement repository-native validation", () => {
  const cwd = packageFixture({ check: "node check.js" });
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");
  fs.writeFileSync(path.join(cwd, "Makefile"), "lint:\n\t@echo lint\n");

  assert.deepEqual(requiredValidationCommands([], cwd, validationOptions("openclaw/mixed")), [
    "go test ./...",
    "pnpm run check",
    "make lint",
  ]);
});

test("Make check targets supplement repository-native validation", () => {
  const cwd = packageFixture({ test: "node test.js" });
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");
  fs.writeFileSync(path.join(cwd, "Makefile"), "check: fmt lint\n");

  assert.deepEqual(requiredValidationCommands([], cwd, validationOptions("openclaw/mixed")), [
    "go test ./...",
    "pnpm run test",
    "make check",
  ]);
});

test("Make variable assignments are not inferred as validation targets", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-make-variable-"));
  fs.writeFileSync(
    path.join(cwd, "Makefile"),
    "check := ./scripts/check\ntest := ./scripts/test\n",
  );

  assert.deepEqual(
    requiredValidationCommands([], cwd, validationOptions("openclaw/make-vars")),
    [],
  );
});

test("dotnet inference addresses every root solution explicitly", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-dotnet-"));
  fs.writeFileSync(path.join(cwd, "Zeta.sln"), "");
  fs.writeFileSync(path.join(cwd, "Alpha.sln"), "");
  fs.writeFileSync(path.join(cwd, "Future.slnx"), "");

  assert.deepEqual(requiredValidationCommands([], cwd, validationOptions("openclaw/dotnet")), [
    "dotnet test ./Alpha.sln",
    "dotnet test ./Future.slnx",
    "dotnet test ./Zeta.sln",
  ]);
});

test("generic validation replaces ambiguous bare dotnet test with explicit solutions", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-dotnet-many-"));
  fs.writeFileSync(path.join(cwd, "Alpha.sln"), "");
  fs.writeFileSync(path.join(cwd, "Beta.sln"), "");

  assert.deepEqual(
    requiredValidationCommands(["dotnet test"], cwd, validationOptions("openclaw/dotnet")),
    ["dotnet test ./Alpha.sln", "dotnet test ./Beta.sln"],
  );
});

test("dotnet inference addresses a root project when no solution exists", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-dotnet-project-"));
  fs.writeFileSync(path.join(cwd, "App.csproj"), "<Project />\n");

  assert.deepEqual(requiredValidationCommands([], cwd, validationOptions("openclaw/dotnet")), [
    "dotnet test ./App.csproj",
  ]);
});

test("unknown target layouts fail closed without a validation command", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-unknown-"));

  const result = preflightTargetValidationPlan(
    { fixArtifact: { validation_commands: [] }, targetDir: cwd },
    validationOptions("openclaw/unknown"),
  );

  assert.equal(result.status, "deferred");
  assert.equal(result.code, "validation_command_deferred");
  assert.deepEqual(result.resolved_commands, []);
});

test("unsupported package managers defer until branch checkout instead of guessing pnpm", () => {
  const cwd = packageFixture({ test: "node test.js" });
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify(
      {
        scripts: { test: "node test.js" },
        packageManager: "yarn@4.9.2",
      },
      null,
      2,
    )}\n`,
  );
  fs.writeFileSync(path.join(cwd, "yarn.lock"), "");

  const result = preflightTargetValidationPlan(
    { fixArtifact: { validation_commands: [] }, targetDir: cwd },
    validationOptions("openclaw/yarn-only"),
  );

  assert.equal(result.status, "deferred");
  assert.equal(result.code, "validation_command_deferred");
  assert.deepEqual(result.resolved_commands, []);
});

test("validation execution fails closed when branch contents remove every inferred gate", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-removed-"));

  assert.throws(
    () => runAllowedValidationCommands([], cwd, validationOptions("openclaw/unknown")),
    /validation_command_missing/,
  );
});

test("repair execution provisions pinned Bun before target validation can invoke it", () => {
  const workflow = fs.readFileSync(".github/workflows/repair-cluster-worker.yml", "utf8");
  const setupBunIndex = workflow.indexOf("- name: Setup pinned Bun for target validation");
  const executeFixIndex = workflow.indexOf("- name: Execute credited fix artifact");

  assert.ok(setupBunIndex >= 0, "expected repair execution workflow to set up Bun");
  assert.ok(executeFixIndex >= 0, "expected repair execution workflow to execute fix artifacts");
  assert.ok(setupBunIndex < executeFixIndex, "expected Bun setup before repair:execute-fix");

  const setupBunStep = workflow.slice(setupBunIndex, executeFixIndex);
  assert.match(setupBunStep, /uses: oven-sh\/setup-bun@0c5077e51419868618aeaa5fe8019c62421857d6/);
  assert.match(setupBunStep, /bun-version: 1\.3\.10/);
});

test("repair workflow resolves the execution runner from the restored target job", () => {
  const workflow = fs.readFileSync(".github/workflows/repair-cluster-worker.yml", "utf8");

  assert.match(workflow, /name: Resolve target execution runner/);
  assert.match(workflow, /repair:resolve-execution-runner/);
  assert.match(
    workflow,
    /runs-on: \$\{\{ needs\.cluster\.outputs\.execution_runner \|\| inputs\.execution_runner \}\}/,
  );
  assert.match(
    workflow,
    /--execution-runner "\$\{\{ needs\.cluster\.outputs\.execution_runner \|\| inputs\.execution_runner \}\}"/,
  );
  assert.match(workflow, /uses: actions\/setup-go@v6/);
  assert.match(workflow, /go-version: stable/);
  assert.match(workflow, /Setup supported \.NET SDKs for target validation/);
  assert.match(workflow, /8\.0\.x/);
  assert.match(workflow, /9\.0\.x/);
  assert.match(workflow, /10\.0\.x/);
});

test("bun-based target toolchain installs deps and runs configured validation", () => {
  const cwd = gitBunPackageFixture({ check: "bun x tsc --noEmit" });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  const { binDir, logPath } = fakeBunFixture(cwd);
  withPathPrefix(binDir, () => {
    prepareTargetToolchain(cwd, {
      ...validationOptions("openclaw/clawhub", clawhubToolchain()),
      installTargetDeps: true,
      installTimeoutMs: 5000,
      setupTimeoutMs: 5000,
    });
    assert.deepEqual(
      runAllowedValidationCommands(
        ["bun run check"],
        cwd,
        validationOptions("openclaw/clawhub", clawhubToolchain()),
      ),
      ["bun run check"],
    );
  });

  assert.deepEqual(fs.readFileSync(logPath, "utf8").trim().split(/\r?\n/), [
    "--version",
    "install --frozen-lockfile --ignore-scripts",
    "run check",
  ]);
});

test("generic target setup uses the package manager inferred from the checkout", () => {
  const cwd = gitBunPackageFixture({ check: "bun x tsc --noEmit" });
  const { binDir, logPath } = fakeBunFixture(cwd);

  withPathPrefix(binDir, () => {
    prepareTargetToolchain(cwd, {
      ...validationOptions("openclaw/generic-bun"),
      installTargetDeps: true,
      installTimeoutMs: 5000,
      setupTimeoutMs: 5000,
    });
  });

  assert.deepEqual(fs.readFileSync(logPath, "utf8").trim().split(/\r?\n/), [
    "--version",
    "install --frozen-lockfile --ignore-scripts",
  ]);
});

test("repository-specific setup ignores checkout package-manager overrides", () => {
  const cwd = gitBunPackageFixture({ check: "bun x tsc --noEmit" });
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify(
      {
        scripts: { check: "bun x tsc --noEmit" },
        packageManager: "npm@11.0.0",
      },
      null,
      2,
    )}\n`,
  );
  const { binDir, logPath } = fakeBunFixture(cwd);

  withPathPrefix(binDir, () => {
    prepareTargetToolchain(cwd, {
      ...validationOptions("openclaw/clawhub", clawhubToolchain()),
      installTargetDeps: true,
      installTimeoutMs: 5000,
      setupTimeoutMs: 5000,
    });
  });

  assert.deepEqual(fs.readFileSync(logPath, "utf8").trim().split(/\r?\n/), [
    "--version",
    "install --frozen-lockfile --ignore-scripts",
  ]);
});

test("repository-specific pnpm setup ignores checkout package-manager overrides", () => {
  const cwd = gitPackageFixture({ check: "node check.js" });
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify(
      {
        scripts: { check: "node check.js" },
        packageManager: "npm@11.0.0",
      },
      null,
      2,
    )}\n`,
  );
  const { binDir, logPath } = fakePnpmFixture(cwd);

  withPathPrefix(binDir, () => {
    prepareTargetToolchain(cwd, {
      ...validationOptions("openclaw/explicit-pnpm", {
        toolchain: {
          packageManager: "pnpm",
          packageManagerExplicit: true,
          baseValidationCommands: ["pnpm run check"],
          changedGate: null,
          requiresFullHistory: false,
          executionRunner: null,
          baseBranch: null,
        },
      }),
      installTargetDeps: true,
      installTimeoutMs: 5000,
      setupTimeoutMs: 5000,
    });
  });

  const commands = fs.readFileSync(logPath, "utf8").trim().split(/\r?\n/);
  assert.equal(commands[0], "corepack prepare pnpm@10.33.2 --activate");
  assertExternalValidationPath(
    cwd,
    commands[1]!.slice("corepack enable --install-directory ".length, -" pnpm".length),
    "corepack-bin",
  );
  assert.equal(
    commands[2],
    "corepack pnpm@10.33.2 install --frozen-lockfile --prefer-offline --config.engine-strict=false --ignore-scripts --config.ignore-pnpmfile=true",
  );
});

test("repository-specific pnpm setup honors valid declared pnpm versions", () => {
  const cwd = gitPackageFixture({ check: "node check.js" });
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify(
      {
        scripts: { check: "node check.js" },
        packageManager: "pnpm@11.2.2",
      },
      null,
      2,
    )}\n`,
  );
  const { binDir, logPath } = fakePnpmFixture(cwd);

  withPathPrefix(binDir, () => {
    prepareTargetToolchain(cwd, {
      ...validationOptions("openclaw/explicit-pnpm", {
        toolchain: {
          packageManager: "pnpm",
          packageManagerExplicit: true,
          baseValidationCommands: ["pnpm run check"],
          changedGate: null,
          requiresFullHistory: false,
          executionRunner: null,
          baseBranch: null,
        },
      }),
      installTargetDeps: true,
      installTimeoutMs: 5000,
      setupTimeoutMs: 5000,
    });
  });

  const commands = fs.readFileSync(logPath, "utf8").trim().split(/\r?\n/);
  assert.equal(commands[0], "corepack prepare pnpm@11.2.2 --activate");
  assertExternalValidationPath(
    cwd,
    commands[1]!.slice("corepack enable --install-directory ".length, -" pnpm".length),
    "corepack-bin",
  );
  assert.equal(
    commands[2],
    "corepack pnpm@11.2.2 install --frozen-lockfile --prefer-offline --config.engine-strict=false --ignore-scripts --config.ignore-pnpmfile=true",
  );
});

test("trusted base setup allows package lifecycle hooks", () => {
  const cwd = gitPackageFixture({ check: "node check.js", postinstall: "node postinstall.js" });
  fs.writeFileSync(path.join(cwd, ".gitignore"), ".env\ndist/\nnode_modules/\n");
  fs.writeFileSync(path.join(cwd, ".env"), "local-only=true\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakePnpmFixture(cwd, { createLifecycleOutputs: true });

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(
      cwd,
      validationOptions("openclaw/trusted-package", { installTargetDeps: true }),
      "main",
    );
  });

  const commands = fs.readFileSync(logPath, "utf8").trim().split(/\r?\n/);
  assert.equal(commands[0], "corepack prepare pnpm@10.33.2 --activate");
  assertExternalValidationPath(
    cwd,
    commands[1]!.slice("corepack enable --install-directory ".length, -" pnpm".length),
    "corepack-bin",
  );
  assert.equal(
    commands[2],
    "corepack pnpm@10.33.2 install --frozen-lockfile --prefer-offline --config.engine-strict=false",
  );
  assert.equal(fs.existsSync(path.join(cwd, "dist", "generated.js")), false);
  assert.equal(fs.readFileSync(path.join(cwd, ".env"), "utf8"), "local-only=true\n");
  assert.equal(
    fs.existsSync(path.join(cwd, "node_modules", "native-package", "binding.node")),
    true,
  );
});

test("npm branch setup rejects package state changed after trusted preparation", () => {
  const cwd = gitPackageFixture({ check: "node check.js", postinstall: "node postinstall.js" });
  fs.writeFileSync(path.join(cwd, "package-lock.json"), '{"lockfileVersion":3}\n');
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify(
      {
        packageManager: "npm@11.0.0",
        scripts: { check: "node check.js", postinstall: "node postinstall.js" },
      },
      null,
      2,
    )}\n`,
  );
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeNpmFixture(cwd);
  const options = validationOptions("openclaw/npm-package", { installTargetDeps: true });

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(cwd, options, "main");
    fs.mkdirSync(path.join(cwd, "node_modules", "native-package"), { recursive: true });
    fs.writeFileSync(path.join(cwd, "node_modules", "native-package", "binding.node"), "built\n");
    assert.throws(
      () => prepareBranchTargetDependencies(cwd, options, "main", ["npm run check"]),
      /validation_dependency_state_changed/,
    );
  });

  assert.equal(fs.readFileSync(logPath, "utf8").trim(), "ci");
});

test("package dependency verification reruns only after write invalidation", () => {
  const cwd = gitPackageFixture({ check: "node check.js" });
  fs.writeFileSync(path.join(cwd, ".gitignore"), "node_modules/\n");
  fs.writeFileSync(path.join(cwd, "package-lock.json"), '{"lockfileVersion":3}\n');
  fs.rmSync(path.join(cwd, "pnpm-lock.yaml"));
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify(
      {
        packageManager: "npm@11.0.0",
        scripts: { check: "node check.js" },
      },
      null,
      2,
    )}\n`,
  );
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir } = fakeNpmFixture(cwd);
  const options = validationOptions("openclaw/npm-package", { installTargetDeps: true });

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(cwd, options, "main");
    prepareBranchTargetDependencies(cwd, options, "main", ["npm run check"]);
    fs.mkdirSync(path.join(cwd, "node_modules", "native-package"), { recursive: true });
    fs.writeFileSync(path.join(cwd, "node_modules", "native-package", "binding.node"), "built\n");
    invalidatePreparedPackageDependencyVerification(cwd);
    assert.throws(
      () => prepareBranchTargetDependencies(cwd, options, "main", ["npm run check"]),
      /validation_dependency_state_changed/,
    );
  });
});

test("package dependency verification rejects a newer unprepared base", () => {
  const cwd = gitPackageFixture({ check: "node check.js" });
  fs.writeFileSync(path.join(cwd, ".gitignore"), "node_modules/\n");
  fs.writeFileSync(path.join(cwd, "package-lock.json"), '{"lockfileVersion":3}\n');
  fs.rmSync(path.join(cwd, "pnpm-lock.yaml"));
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify(
      {
        packageManager: "npm@11.0.0",
        scripts: { check: "node check.js" },
      },
      null,
      2,
    )}\n`,
  );
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  const origin = attachOrigin(cwd);
  const { binDir } = fakeNpmFixture(cwd);
  const options = validationOptions("openclaw/npm-package", { installTargetDeps: true });

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(cwd, options, "main");
  });

  const updaterRoot = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-updater-"));
  const updater = path.join(updaterRoot, "checkout");
  git(updaterRoot, "clone", origin, updater);
  git(updater, "config", "user.email", "clawsweeper@example.invalid");
  git(updater, "config", "user.name", "ClawSweeper Test");
  const packageJson = JSON.parse(fs.readFileSync(path.join(updater, "package.json"), "utf8"));
  packageJson.dependencies = { example: "1.0.0" };
  fs.writeFileSync(path.join(updater, "package.json"), `${JSON.stringify(packageJson, null, 2)}\n`);
  fs.writeFileSync(
    path.join(updater, "package-lock.json"),
    '{"lockfileVersion":3,"packages":{"":{"dependencies":{"example":"1.0.0"}}}}\n',
  );
  git(updater, "add", ".");
  git(updater, "commit", "-m", "advance dependencies");
  git(updater, "push", "origin", "main");
  git(cwd, "fetch", "origin", "main:refs/remotes/origin/main");
  git(cwd, "merge", "--ff-only", "origin/main");

  assert.throws(
    () => prepareBranchTargetDependencies(cwd, options, "main", ["npm run check"]),
    /validation_dependency_base_changed/,
  );
});

test("trusted preparation recreates generated tools after write invalidation", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-tools-reset-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, ".gitignore"), "bin/\nbranch-cache/\n");
  fs.writeFileSync(path.join(cwd, "Makefile"), "ci: tools\ntools:\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir } = fakeMakeFixture(cwd, { createToolsOutput: true });
  const options = validationOptions("openclaw/make-tools", { installTargetDeps: true });

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(cwd, options, "main", ["make ci"]);
    assert.equal(fs.readFileSync(path.join(cwd, "bin", "linter"), "utf8"), "trusted\n");
    fs.writeFileSync(path.join(cwd, "bin", "linter"), "branch replacement\n");
    fs.mkdirSync(path.join(cwd, "branch-cache"));
    fs.writeFileSync(path.join(cwd, "branch-cache", "payload"), "branch-only\n");
    invalidatePreparedTargetDependencies(cwd);
    prepareTrustedTargetDependencies(cwd, options, "main", ["make ci"]);
  });

  assert.equal(fs.readFileSync(path.join(cwd, "bin", "linter"), "utf8"), "trusted\n");
  assert.equal(fs.existsSync(path.join(cwd, "branch-cache")), false);
});

test("npm setup detects npm-shrinkwrap.json and uses npm ci", () => {
  const cwd = packageFixture({ check: "node check.js" });
  fs.writeFileSync(path.join(cwd, "npm-shrinkwrap.json"), '{"lockfileVersion":3}\n');
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeNpmFixture(cwd);

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(
      cwd,
      validationOptions("openclaw/npm-shrinkwrap", { installTargetDeps: true }),
      "main",
      ["npm run check"],
    );
  });

  assert.equal(fs.readFileSync(logPath, "utf8").trim(), "ci");
});

test("npm trusted setup does not create a lockfile for lockfile-less repositories", () => {
  const cwd = packageFixture({ check: "node check.js" });
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify(
      {
        packageManager: "npm@11.0.0",
        scripts: { check: "node check.js" },
      },
      null,
      2,
    )}\n`,
  );
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeNpmFixture(cwd);

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(
      cwd,
      validationOptions("openclaw/npm-package", { installTargetDeps: true }),
      "main",
    );
  });

  assert.equal(fs.readFileSync(logPath, "utf8").trim(), "install --no-save --package-lock=false");
  assert.equal(fs.existsSync(path.join(cwd, "package-lock.json")), false);
});

test("repair branch dependency setup rejects changed package dependencies", () => {
  const cwd = gitPackageFixture({ check: "node check.js" });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const packageJson = JSON.parse(fs.readFileSync(path.join(cwd, "package.json"), "utf8"));
  packageJson.dependencies = { example: "1.0.0" };
  fs.writeFileSync(path.join(cwd, "package.json"), `${JSON.stringify(packageJson, null, 2)}\n`);

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: true }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: package dependency definition package\.json/,
  );
});

test("repair branch dependency setup rejects changed package lockfiles", () => {
  const cwd = gitPackageFixture({ check: "node check.js" });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.appendFileSync(path.join(cwd, "pnpm-lock.yaml"), "\n# branch replacement\n");

  assert.throws(
    () =>
      prepareBranchTargetDependencies(
        cwd,
        validationOptions("openclaw/package", { installTargetDeps: true }),
        "main",
        ["pnpm run check"],
      ),
    /validation_definition_changed: package lockfile pnpm-lock\.yaml/,
  );
});

test("repair branch dependency setup accepts unchanged large package lockfiles", () => {
  const cwd = gitPackageFixture({ check: "node check.js" });
  fs.writeFileSync(
    path.join(cwd, "pnpm-lock.yaml"),
    `lockfileVersion: '9.0'\n# ${"x".repeat(4 * 1024 * 1024)}\n`,
  );
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  assert.doesNotThrow(() =>
    prepareBranchTargetDependencies(
      cwd,
      validationOptions("openclaw/package", { installTargetDeps: false }),
      "main",
      ["pnpm run check"],
    ),
  );
});

test("non-package validation skips an unrelated unsupported package manager", () => {
  const cwd = packageFixture({});
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify({ packageManager: "yarn@4.9.2" }, null, 2)}\n`,
  );
  fs.writeFileSync(path.join(cwd, "yarn.lock"), "");
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeGoFixture(cwd);

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(
      cwd,
      validationOptions("openclaw/go-with-yarn", { installTargetDeps: true }),
      "main",
    );
  });

  assert.deepEqual(fs.readFileSync(logPath, "utf8").trim().split(/\r?\n/), [
    "version",
    "mod download all",
  ]);
});

test("script-driven validation can explicitly prepare package dependencies", () => {
  const cwd = packageFixture({});
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify({ packageManager: "npm@11.0.0" }, null, 2)}\n`,
  );
  fs.writeFileSync(path.join(cwd, "package-lock.json"), '{"lockfileVersion":3}\n');
  fs.writeFileSync(path.join(cwd, "build.ps1"), "dotnet build\n");
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeNpmFixture(cwd);

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(
      cwd,
      validationOptions("openclaw/script-package", {
        installTargetDeps: true,
        toolchain: {
          packageManager: "npm",
          packageManagerExplicit: true,
          preparePackageDependencies: true,
          baseValidationCommands: ["./build.ps1"],
          changedGate: null,
          requiresFullHistory: false,
          executionRunner: "windows-latest",
          baseBranch: "main",
        },
      }),
      "main",
    );
  });

  assert.equal(fs.readFileSync(logPath, "utf8").trim(), "ci");
});

test("direct Node validation prepares package dependencies", () => {
  const cwd = packageFixture({});
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify({ packageManager: "npm@11.0.0" }, null, 2)}\n`,
  );
  fs.writeFileSync(path.join(cwd, "package-lock.json"), '{"lockfileVersion":3}\n');
  fs.mkdirSync(path.join(cwd, "scripts"));
  fs.writeFileSync(path.join(cwd, "scripts", "validate.js"), "process.exit(0);\n");
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeNpmFixture(cwd);

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(
      cwd,
      validationOptions("openclaw/node-package", { installTargetDeps: true }),
      "main",
      ["node scripts/validate.js"],
    );
  });

  assert.equal(fs.readFileSync(logPath, "utf8").trim(), "ci");
});

test("Make-wrapped package validation prepares package dependencies", () => {
  const cwd = packageFixture({ check: "node check.js" });
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify(
      {
        packageManager: "npm@11.0.0",
        scripts: { check: "node check.js" },
      },
      null,
      2,
    )}\n`,
  );
  fs.writeFileSync(path.join(cwd, "package-lock.json"), '{"lockfileVersion":3}\n');
  fs.writeFileSync(path.join(cwd, "Makefile"), "ci: ; @node check.js\n");
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeNpmFixture(cwd);

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(
      cwd,
      validationOptions("openclaw/make-package", { installTargetDeps: true }),
      "main",
      ["make ci"],
    );
  });

  assert.equal(fs.readFileSync(logPath, "utf8").trim(), "ci");
});

test(
  "package validation skips incidental Go and .NET dependency preparation",
  { skip: process.platform === "win32" },
  () => {
    const cwd = packageFixture({ check: "node check.js" });
    fs.writeFileSync(
      path.join(cwd, "package.json"),
      `${JSON.stringify(
        {
          packageManager: "npm@11.0.0",
          scripts: { check: "node check.js" },
        },
        null,
        2,
      )}\n`,
    );
    fs.writeFileSync(path.join(cwd, "package-lock.json"), '{"lockfileVersion":3}\n');
    fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/private\n\ngo 1.24\n");
    fs.writeFileSync(path.join(cwd, "App.csproj"), '<Project Sdk="Microsoft.NET.Sdk" />\n');
    git(cwd, "init", "-b", "main");
    git(cwd, "config", "user.email", "clawsweeper@example.invalid");
    git(cwd, "config", "user.name", "ClawSweeper Test");
    git(cwd, "add", ".");
    git(cwd, "commit", "-m", "initial");
    attachOrigin(cwd);
    const { binDir, logPath } = fakeNpmFixture(cwd);
    for (const executable of ["go", "dotnet"]) {
      const executablePath = path.join(binDir, executable);
      fs.writeFileSync(executablePath, "#!/bin/sh\nexit 97\n");
      fs.chmodSync(executablePath, 0o755);
    }

    withPathPrefix(binDir, () => {
      prepareTrustedTargetDependencies(
        cwd,
        validationOptions("openclaw/package-only", {
          installTargetDeps: true,
          toolchain: {
            packageManager: "npm",
            packageManagerExplicit: true,
            baseValidationCommands: ["npm run check"],
            changedGate: null,
            requiresFullHistory: false,
            executionRunner: null,
            baseBranch: "main",
          },
        }),
        "main",
        ["npm run check"],
      );
    });

    assert.equal(fs.readFileSync(logPath, "utf8").trim(), "ci");
  },
);

test("bun-based target toolchain disables hooks and sanitizes install environment", () => {
  const cwd = gitBunPackageFixture({ check: "bun x tsc --noEmit" });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  const { binDir, logPath, envLogPath } = envLoggingBunFixture(cwd);
  const previousUserAgent = process.env.npm_config_user_agent;
  const previousRegistry = process.env.npm_config_registry;
  const previousCache = process.env.npm_config_cache;
  const previousUserconfig = process.env.npm_config_userconfig;
  const previousNpmExecpath = process.env.npm_execpath;
  const previousNpmNodeExecpath = process.env.npm_node_execpath;
  const previousNpmLifecycleEvent = process.env.npm_lifecycle_event;
  const previousNpmPackageName = process.env.npm_package_name;
  const previousPnpmHome = process.env.PNPM_HOME;
  const previousPnpmStorePath = process.env.PNPM_STORE_PATH;
  process.env.npm_config_user_agent = "pnpm/10.0.0 npm/? node/v22.0.0 linux x64";
  process.env.npm_config_registry = "https://registry.example.invalid/";
  process.env.npm_config_cache = "/tmp/npm-cache";
  process.env.npm_config_userconfig = "/tmp/npmrc";
  process.env.npm_execpath = "/tmp/pnpm";
  process.env.npm_node_execpath = "/tmp/node";
  process.env.npm_lifecycle_event = "repair:execute-fix";
  process.env.npm_package_name = "clawsweeper";
  process.env.PNPM_HOME = "/tmp/pnpm-home";
  process.env.PNPM_STORE_PATH = "/tmp/pnpm-store";
  try {
    withPathPrefix(binDir, () => {
      prepareTargetToolchain(cwd, {
        ...validationOptions("openclaw/clawhub", clawhubToolchain()),
        installTargetDeps: true,
        installTimeoutMs: 5000,
        setupTimeoutMs: 5000,
      });
    });
  } finally {
    restoreEnv("npm_config_user_agent", previousUserAgent);
    restoreEnv("npm_config_registry", previousRegistry);
    restoreEnv("npm_config_cache", previousCache);
    restoreEnv("npm_config_userconfig", previousUserconfig);
    restoreEnv("npm_execpath", previousNpmExecpath);
    restoreEnv("npm_node_execpath", previousNpmNodeExecpath);
    restoreEnv("npm_lifecycle_event", previousNpmLifecycleEvent);
    restoreEnv("npm_package_name", previousNpmPackageName);
    restoreEnv("PNPM_HOME", previousPnpmHome);
    restoreEnv("PNPM_STORE_PATH", previousPnpmStorePath);
  }

  const envEntries = fs
    .readFileSync(envLogPath, "utf8")
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  assert.equal(envEntries.length, 2, "expected --version and install env snapshots");
  assert.match(fs.readFileSync(logPath, "utf8"), /install --frozen-lockfile --ignore-scripts/);
  for (const env of envEntries) {
    assert.match(
      String(env.npm_config_user_agent ?? ""),
      /^bun\//,
      `expected bun user-agent, got ${JSON.stringify(env.npm_config_user_agent)}`,
    );
    assert.equal(
      env.npm_config_registry,
      "https://registry.example.invalid/",
      "npm-compatible registry config must pass through to bun children",
    );
    assertExternalValidationPath(cwd, env.npm_config_cache, "npm-cache");
    assert.equal(
      env.npm_config_userconfig,
      process.platform === "win32" ? "NUL" : "/dev/null",
      "credential-bearing npm userconfig must not pass to target install scripts",
    );
    assertExternalValidationPath(cwd, env.GIT_CONFIG_GLOBAL, "gitconfig");
    assert.equal(
      git(cwd, "config", "--file", env.GIT_CONFIG_GLOBAL, "--get", "safe.directory"),
      cwd,
    );
    assert.equal(env.npm_execpath, undefined, "npm_execpath must not leak to bun children");
    assert.equal(
      env.npm_node_execpath,
      undefined,
      "npm_node_execpath must not leak to bun children",
    );
    assert.equal(
      env.npm_lifecycle_event,
      undefined,
      "npm_lifecycle_event must not leak to bun children",
    );
    assert.equal(env.npm_package_name, undefined, "npm_package_* must not leak to bun children");
    assert.equal(env.PNPM_HOME, undefined, "PNPM_HOME must not leak to bun children");
    assert.equal(env.PNPM_STORE_PATH, undefined, "PNPM_* variables must not leak to bun children");
  }
});

test("bun-based target repos still report unrelated missing scripts as blocked", () => {
  // Sanitize is intentionally narrow: only the canonical `pnpm check:changed`
  // shape gets dropped. Any other genuinely missing script (e.g. a typo) must
  // continue to surface as `validation_script_missing` so callers see real
  // gaps instead of silent passes.
  const cwd = bunPackageFixture({ check: "bun x tsc --noEmit" });

  const result = preflightTargetValidationPlan(
    { fixArtifact: { validation_commands: ["bun run nonexistent-script"] }, targetDir: cwd },
    validationOptions("openclaw/clawhub", clawhubToolchain()),
  );

  assert.equal(result.status, "blocked");
  assert.equal(result.code, "validation_script_missing");
  assert.equal(result.missing_script, "nonexistent-script");
});

test("resolveTargetRepoToolchain reads openclaw/clawhub from the real config without overrides", () => {
  // Real-config integration test: prove that the compiled dist/ artifact still
  // resolves config/target-repositories.json relative to the project root, so
  // the worker actually picks up `bun` for ClawHub at runtime (not just under
  // an injected toolchain in unit tests).
  __resetTargetRepoToolchainCache();
  try {
    const toolchain = resolveTargetRepoToolchain("openclaw/clawhub");
    assert.equal(toolchain.packageManager, "bun");
    assert.deepEqual(toolchain.baseValidationCommands, ["bun run check"]);
    assert.equal(toolchain.changedGate, null);
  } finally {
    __resetTargetRepoToolchainCache();
  }
});

test("Windows target toolchain selects a Windows execution runner", () => {
  __resetTargetRepoToolchainCache();
  try {
    const toolchain = resolveTargetRepoToolchain("openclaw/openclaw-windows-node");
    assert.equal(toolchain.packageManager, "npm");
    assert.deepEqual(toolchain.baseValidationCommands, [
      "./build.ps1",
      "dotnet test ./tests/OpenClaw.Shared.Tests/OpenClaw.Shared.Tests.csproj",
      "dotnet test ./tests/OpenClaw.Tray.Tests/OpenClaw.Tray.Tests.csproj",
    ]);
    assert.equal(toolchain.executionRunner, "windows-latest");
    assert.equal(toolchain.baseBranch, "main");
    assert.equal(toolchain.requiresFullHistory, true);
    assert.equal(toolchain.preparePackageDependencies, true);
  } finally {
    __resetTargetRepoToolchainCache();
  }
});

test("full-history target toolchains unshallow cached checkouts before setup", () => {
  const cwd = shallowGitFixture();
  assert.equal(git(cwd, "rev-parse", "--is-shallow-repository"), "true");

  prepareTargetToolchain(cwd, {
    ...validationOptions("openclaw/openclaw-windows-node", {
      toolchain: {
        packageManager: "npm",
        packageManagerExplicit: true,
        baseValidationCommands: ["./build.ps1"],
        changedGate: null,
        requiresFullHistory: true,
        executionRunner: "windows-latest",
        baseBranch: "main",
      },
    }),
    installTargetDeps: false,
  });

  assert.equal(git(cwd, "rev-parse", "--is-shallow-repository"), "false");
});

test("trusted preparation preserves full-history setup when dependency installs are disabled", () => {
  const cwd = shallowGitFixture();
  const options = {
    ...validationOptions("openclaw/openclaw-windows-node", {
      toolchain: {
        packageManager: "npm",
        packageManagerExplicit: true,
        baseValidationCommands: ["./build.ps1"],
        changedGate: null,
        requiresFullHistory: true,
        executionRunner: "windows-latest",
        baseBranch: "main",
      },
    }),
    installTargetDeps: false,
  };

  prepareTrustedTargetDependencies(cwd, options, "main");

  assert.equal(git(cwd, "rev-parse", "--is-shallow-repository"), "false");
});

test("history deepening preserves a pinned remote base ref", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-pinned-history-"));
  const source = path.join(root, "source");
  const origin = path.join(root, "origin.git");
  const checkout = path.join(root, "checkout");
  fs.mkdirSync(source);
  git(source, "init", "-b", "main");
  git(source, "config", "user.email", "clawsweeper@example.invalid");
  git(source, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(source, "history.txt"), "base\n");
  git(source, "add", ".");
  git(source, "commit", "-m", "base");
  git(source, "branch", "feature");
  fs.appendFileSync(path.join(source, "history.txt"), "main\n");
  git(source, "commit", "-am", "main");
  git(source, "checkout", "feature");
  fs.writeFileSync(path.join(source, "feature.txt"), "feature\n");
  git(source, "add", ".");
  git(source, "commit", "-m", "feature");
  git(root, "init", "--bare", origin);
  git(source, "remote", "add", "origin", origin);
  git(source, "push", "origin", "main:main", "feature:feature");
  git(origin, "symbolic-ref", "HEAD", "refs/heads/main");
  execFileSync("git", ["clone", "--depth=1", "--branch", "feature", `file://${origin}`, checkout], {
    encoding: "utf8",
  });
  git(checkout, "fetch", "--depth=1", "origin", "main:refs/remotes/origin/main");
  const pinnedBase = git(checkout, "rev-parse", "origin/main");

  git(source, "checkout", "main");
  fs.writeFileSync(path.join(source, "advanced.txt"), "advanced\n");
  git(source, "add", ".");
  git(source, "commit", "-m", "advance main");
  git(source, "push", "origin", "main");

  assert.doesNotThrow(() =>
    ensureMergeBaseAvailable({ targetDir: checkout, baseBranch: "main", fetchBase: false }),
  );
  assert.equal(git(checkout, "rev-parse", "--is-shallow-repository"), "false");
  assert.equal(git(checkout, "rev-parse", "origin/main"), pinnedBase);
});

test("resolveTargetRepoToolchain keeps the OpenClaw changed gate even without core_target_overrides", () => {
  // Regression guard for the earlier ordering bug: if core_target_overrides is
  // ever removed but a generic openclaw fallback is kept (changed_gate: null),
  // openclaw/openclaw must still receive the pnpm check:changed gate.
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-toolchain-config-"));
  const configPath = path.join(tmpDir, "target-repositories.json");
  fs.writeFileSync(
    configPath,
    `${JSON.stringify(
      {
        schema_version: 2,
        repositories: [],
        generic_fallbacks: [
          {
            owner: "openclaw",
            deny_repositories: [],
            allow_repo_name_pattern: "^[A-Za-z0-9_.-]+$",
            prompt_note: "generic",
            apply_close_rules: { issue: [], pull_request: [] },
            package_manager: "pnpm",
            validation_commands: [],
            changed_gate: null,
          },
        ],
      },
      null,
      2,
    )}\n`,
  );

  __resetTargetRepoToolchainCache();
  try {
    const toolchain = resolveTargetRepoToolchain("openclaw/openclaw", configPath);
    assert.deepEqual(toolchain.changedGate, {
      command: "pnpm check:changed",
      requiredScript: "check:changed",
    });
    assert.equal(toolchain.packageManager, "pnpm");
  } finally {
    __resetTargetRepoToolchainCache();
  }
});

test("resolveTargetRepoToolchain stays total when the config file is missing", () => {
  // P1 invariant: a missing/unreadable config must NEVER throw out of the
  // resolver, otherwise requiredValidationCommands / prepareTargetToolchain
  // would propagate the error and block automerge across all target repos.
  // The expected fallback is: openclaw/openclaw still gets its hard safety
  // net, every other repo degrades to DEFAULT_TOOLCHAIN (pnpm, no gate) —
  // i.e. pre-PR behavior, never an exception.
  const missingPath = path.join(
    os.tmpdir(),
    `clawsweeper-missing-config-${Date.now()}-${Math.random().toString(36).slice(2)}.json`,
  );
  __resetTargetRepoToolchainCache();
  try {
    const openclaw = resolveTargetRepoToolchain("openclaw/openclaw", missingPath);
    assert.deepEqual(openclaw.changedGate, {
      command: "pnpm check:changed",
      requiredScript: "check:changed",
    });
    const clawhub = resolveTargetRepoToolchain("openclaw/clawhub", missingPath);
    assert.equal(clawhub.packageManager, "pnpm");
    assert.deepEqual(clawhub.baseValidationCommands, []);
    assert.equal(clawhub.changedGate, null);
    const vendor = resolveTargetRepoToolchain("vendor/anything", missingPath);
    assert.equal(vendor.packageManager, "pnpm");
    assert.equal(vendor.changedGate, null);
  } finally {
    __resetTargetRepoToolchainCache();
  }
});

test("resolveTargetRepoToolchain stays total when the config file is malformed JSON", () => {
  // P1 invariant: a corrupt config file must degrade to default behavior, not
  // throw. Same fallback shape as the missing-file case above.
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-bad-config-"));
  const configPath = path.join(tmpDir, "target-repositories.json");
  fs.writeFileSync(configPath, "{not valid json,,,");
  __resetTargetRepoToolchainCache();
  try {
    const warnings = captureWarnings(() => {
      assert.doesNotThrow(() => resolveTargetRepoToolchain("openclaw/openclaw", configPath));
      const openclaw = resolveTargetRepoToolchain("openclaw/openclaw", configPath);
      assert.deepEqual(openclaw.changedGate, {
        command: "pnpm check:changed",
        requiredScript: "check:changed",
      });
      const vendor = resolveTargetRepoToolchain("vendor/anything", configPath);
      assert.equal(vendor.packageManager, "pnpm");
      assert.equal(vendor.changedGate, null);
    });
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /target-toolchain-config: failed to load .*SyntaxError/);
  } finally {
    __resetTargetRepoToolchainCache();
  }
});

test("changed validation retries one transient check:changed failure", () => {
  const cwd = gitPackageFixture({
    "check:changed":
      "node -e \"const fs=require('fs'); const file='.git/.attempt'; const count=fs.existsSync(file)?Number(fs.readFileSync(file,'utf8')):0; fs.writeFileSync(file, String(count+1)); if (count===0) { console.error('transient changed gate failure'); process.exit(1); }\"",
  });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  markPackageDependenciesPrepared(cwd);

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

test("target validation does not expose the internal model", () => {
  const cwd = gitPackageFixture({
    check: 'node -e "if (process.env.CLAWSWEEPER_MODEL) process.exit(1)"',
  });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  markPackageDependenciesPrepared(cwd);

  const previous = process.env.CLAWSWEEPER_MODEL;
  process.env.CLAWSWEEPER_MODEL = "secret-model";
  try {
    assert.deepEqual(
      runAllowedValidationCommands(
        ["pnpm run check"],
        cwd,
        validationOptions("openclaw/fs-safe", {
          allowExpensiveValidation: true,
          toolchain: {
            packageManager: "pnpm",
            packageManagerExplicit: false,
            baseValidationCommands: [],
            changedGate: null,
            requiresFullHistory: false,
            executionRunner: null,
            baseBranch: null,
          },
        }),
      ),
      ["pnpm run check"],
    );
  } finally {
    if (previous === undefined) delete process.env.CLAWSWEEPER_MODEL;
    else process.env.CLAWSWEEPER_MODEL = previous;
  }
});

test("target validation strips service credentials and credential helpers", () => {
  const sensitiveNames = [
    "GH_TOKEN",
    "GITHUB_TOKEN",
    "OPENAI_API_KEY",
    "CLAWSWEEPER_DISPATCH_TOKEN",
    "AWS_SECRET_ACCESS_KEY",
    "SSH_AUTH_SOCK",
    "GIT_ASKPASS",
    "CODEX_HOME",
    "RUNNER_TEMP",
    "GITHUB_ENV",
    "GITHUB_OUTPUT",
    "GITHUB_PATH",
    "NODE_OPTIONS",
    "BASH_ENV",
    "npm_config__auth",
    "NPM_CONFIG_//registry.npmjs.org/:_authToken",
  ];
  const script = `node -e ${JSON.stringify(
    `const names=${JSON.stringify(sensitiveNames)}; const leaked=names.filter((name)=>process.env[name]); const expected=process.platform==="win32"?"NUL":"/dev/null"; if (process.env.NPM_CONFIG_USERCONFIG!==expected || process.env.npm_config_userconfig==="/tmp/secret-npmrc") leaked.push("npm user config"); if (leaked.length) { console.error(leaked.join(",")); process.exit(1); }`,
  )}`;
  const cwd = gitPackageFixture({ check: script });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  markPackageDependenciesPrepared(cwd);

  withTemporaryEnv(
    {
      ...Object.fromEntries(sensitiveNames.map((name) => [name, "secret-value"])),
      npm_config_userconfig: "/tmp/secret-npmrc",
      NPM_CONFIG_USERCONFIG: "/tmp/secret-npmrc",
    },
    () => {
      assert.deepEqual(
        runAllowedValidationCommands(
          ["pnpm run check"],
          cwd,
          validationOptions("openclaw/fs-safe", { allowExpensiveValidation: true }),
        ),
        ["pnpm run check"],
      );
    },
  );
});

test(
  "target validation ignores checkout-local cache symlinks",
  { skip: process.platform === "win32" },
  () => {
    const cwd = gitPackageFixture({ check: 'node -e ""' });
    git(cwd, "add", ".");
    git(cwd, "commit", "-m", "initial");
    attachOrigin(cwd);
    markPackageDependenciesPrepared(cwd);
    const gitConfigPath = path.join(cwd, ".git", "config");
    const originalGitConfig = fs.readFileSync(gitConfigPath, "utf8");
    fs.mkdirSync(path.join(cwd, ".clawsweeper-validation-cache"));
    fs.symlinkSync("../.git/config", path.join(cwd, ".clawsweeper-validation-cache", "gitconfig"));

    assert.deepEqual(
      runAllowedValidationCommands(
        ["pnpm run check"],
        cwd,
        validationOptions("openclaw/fs-safe", { allowExpensiveValidation: true }),
      ),
      ["pnpm run check"],
    );
    assert.equal(fs.readFileSync(gitConfigPath, "utf8"), originalGitConfig);
  },
);

test("target validation does not use tracked checkout-local cache content", () => {
  const cwd = gitPackageFixture({ check: 'node -e ""' });
  fs.mkdirSync(path.join(cwd, ".clawsweeper-validation-cache"));
  fs.writeFileSync(path.join(cwd, ".clawsweeper-validation-cache", "gitconfig"), "tracked\n");
  git(cwd, "add", ".");
  git(cwd, "add", "-f", ".clawsweeper-validation-cache/gitconfig");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  markPackageDependenciesPrepared(cwd);

  assert.deepEqual(
    runAllowedValidationCommands(
      ["pnpm run check"],
      cwd,
      validationOptions("openclaw/fs-safe", { allowExpensiveValidation: true }),
    ),
    ["pnpm run check"],
  );
  assert.equal(
    fs.readFileSync(path.join(cwd, ".clawsweeper-validation-cache", "gitconfig"), "utf8"),
    "tracked\n",
  );
});

test("target validation leaves Git excludes unchanged for separate Git directories", () => {
  const cwd = packageFixture({});
  fs.writeFileSync(path.join(cwd, "check.js"), "process.exit(0);\n");
  const gitDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-gitdir-"));
  execFileSync("git", ["init", "--separate-git-dir", gitDir, "-b", "main", cwd], {
    encoding: "utf8",
  });
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  const excludePath = path.resolve(cwd, git(cwd, "rev-parse", "--git-path", "info/exclude"));
  const excludesBefore = fs.readFileSync(excludePath, "utf8");
  assert.deepEqual(
    runAllowedValidationCommands(
      ["node check.js"],
      cwd,
      validationOptions("openclaw/separate-git-dir", {
        sandboxTargetCommands: false,
      }),
    ),
    ["node check.js"],
  );
  assert.equal(fs.readFileSync(excludePath, "utf8"), excludesBefore);
});

test("target validation rejects and rolls back committable side effects", () => {
  const cwd = gitPackageFixture({
    check: `node -e ${JSON.stringify(
      'const fs=require("node:fs"); fs.writeFileSync("tracked.txt", "changed\\n"); fs.writeFileSync("draft.txt", "changed\\n"); fs.writeFileSync("injected.txt", "bad\\n")',
    )}`,
  });
  fs.writeFileSync(path.join(cwd, "tracked.txt"), "original\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "draft.txt"), "draft\n");

  assert.throws(
    () =>
      runAllowedValidationCommands(
        ["pnpm run check"],
        cwd,
        validationOptions("openclaw/fs-safe", { allowExpensiveValidation: true }),
      ),
    /validation_side_effect_detected.*draft\.txt.*injected\.txt.*tracked\.txt/,
  );
  assert.equal(fs.readFileSync(path.join(cwd, "tracked.txt"), "utf8"), "original\n");
  assert.equal(fs.readFileSync(path.join(cwd, "draft.txt"), "utf8"), "draft\n");
  assert.equal(fs.existsSync(path.join(cwd, "injected.txt")), false);
  assert.equal(git(cwd, "status", "--porcelain=v1"), "?? draft.txt");
});

test("target validation rejects ignored execution-control side effects", () => {
  const cwd = gitPackageFixture({
    poison: `node -e ${JSON.stringify(
      'const fs=require("node:fs"); fs.mkdirSync(".ignored-bin"); fs.writeFileSync(".ignored-bin/pass", "#!/bin/sh\\nexit 0\\n"); fs.chmodSync(".ignored-bin/pass", 0o755); fs.writeFileSync(".npmrc", "script-shell=.ignored-bin/pass\\n")',
    )}`,
    lint: 'node -e "process.exit(1)"',
  });
  fs.writeFileSync(path.join(cwd, ".gitignore"), ".ignored-bin/\n.npmrc\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  assert.throws(
    () =>
      runAllowedValidationCommands(
        ["pnpm run poison", "npm run lint"],
        cwd,
        validationOptions("openclaw/fs-safe", { allowExpensiveValidation: true }),
      ),
    /validation_side_effect_detected.*\.ignored-bin.*\.npmrc/,
  );
  assert.equal(fs.existsSync(path.join(cwd, ".npmrc")), false);
  assert.equal(fs.existsSync(path.join(cwd, ".ignored-bin")), false);
});

test("target validation restores mutated pre-existing ignored artifacts", () => {
  const cwd = gitPackageFixture({
    check: `node -e ${JSON.stringify(
      'require("node:fs").writeFileSync("bin/linter", "replacement\\n")',
    )}`,
  });
  fs.writeFileSync(path.join(cwd, ".gitignore"), "bin/\n");
  fs.mkdirSync(path.join(cwd, "bin"));
  fs.writeFileSync(path.join(cwd, "bin", "linter"), "trusted\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);

  assert.throws(
    () =>
      runAllowedValidationCommands(
        ["pnpm run check"],
        cwd,
        validationOptions("openclaw/fs-safe", { allowExpensiveValidation: true }),
      ),
    /validation_side_effect_detected.*bin/,
  );
  assert.equal(fs.readFileSync(path.join(cwd, "bin", "linter"), "utf8"), "trusted\n");
});

test("target validation restores expected dotnet build outputs without failing", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-dotnet-output-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, ".gitignore"), "bin/\nobj/\n");
  fs.writeFileSync(path.join(cwd, "App.csproj"), "<Project />\n");
  fs.mkdirSync(path.join(cwd, "bin"));
  fs.mkdirSync(path.join(cwd, "obj"));
  fs.writeFileSync(path.join(cwd, "bin", "App.dll"), "trusted-bin\n");
  fs.writeFileSync(path.join(cwd, "obj", "project.assets.json"), "trusted-obj\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir } = fakeDotnetFixture(cwd, { createBuildOutputs: true });

  withPathPrefix(binDir, () => {
    assert.deepEqual(
      runAllowedValidationCommands(
        ["dotnet test App.csproj --no-restore"],
        cwd,
        validationOptions("openclaw/dotnet", { allowExpensiveValidation: true }),
      ),
      ["dotnet test App.csproj --no-restore", "dotnet test ./App.csproj"],
    );
  });

  assert.equal(fs.readFileSync(path.join(cwd, "bin", "App.dll"), "utf8"), "trusted-bin\n");
  assert.equal(
    fs.readFileSync(path.join(cwd, "obj", "project.assets.json"), "utf8"),
    "trusted-obj\n",
  );
  assert.equal(fs.existsSync(path.join(cwd, "bin", "new.dll")), false);
});

test("target validation rejects oversized snapshots without leaving partial backups", () => {
  const cwd = gitPackageFixture({ check: 'node -e ""' });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.writeFileSync(path.join(cwd, "large.bin"), Buffer.alloc(128, 1));
  const indexPath = path.resolve(cwd, git(cwd, "rev-parse", "--git-path", "index"));
  const snapshotDirs = () =>
    new Set(
      fs.readdirSync(os.tmpdir()).filter((name) => name.startsWith("clawsweeper-target-state-")),
    );
  const before = snapshotDirs();

  withTemporaryEnv(
    {
      CLAWSWEEPER_TARGET_SNAPSHOT_MAX_BYTES: String(fs.statSync(indexPath).size + 64),
    },
    () => {
      assert.throws(
        () =>
          runAllowedValidationCommands(
            ["pnpm run check"],
            cwd,
            validationOptions("openclaw/fs-safe", {
              allowExpensiveValidation: true,
              sandboxTargetCommands: false,
            }),
          ),
        /validation_snapshot_budget_exceeded/,
      );
    },
  );

  assert.deepEqual(snapshotDirs(), before);
});

test(
  "target validation rollback removes symlink ancestors without touching their targets",
  { skip: process.platform === "win32" },
  () => {
    const outside = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-outside-"));
    const outsideFile = path.join(outside, "authorized_keys");
    fs.writeFileSync(outsideFile, "outside\n");
    const script = `node -e ${JSON.stringify(
      `const fs=require("node:fs"); fs.rmSync("payload",{recursive:true,force:true}); fs.symlinkSync(${JSON.stringify(outside)},"payload","dir")`,
    )}`;
    const cwd = gitPackageFixture({ check: script });
    fs.mkdirSync(path.join(cwd, "payload"));
    fs.writeFileSync(path.join(cwd, "payload", "authorized_keys"), "tracked\n");
    fs.writeFileSync(path.join(cwd, ".gitignore"), "/payload/\n");
    git(cwd, "add", ".");
    git(cwd, "add", "-f", "payload/authorized_keys");
    git(cwd, "commit", "-m", "initial");
    attachOrigin(cwd);

    assert.throws(
      () =>
        runAllowedValidationCommands(
          ["pnpm run check"],
          cwd,
          validationOptions("openclaw/fs-safe", { allowExpensiveValidation: true }),
        ),
      /validation_side_effect_detected.*payload\/authorized_keys/,
    );
    assert.equal(fs.readFileSync(outsideFile, "utf8"), "outside\n");
    assert.equal(fs.lstatSync(path.join(cwd, "payload")).isDirectory(), true);
    assert.equal(
      fs.readFileSync(path.join(cwd, "payload", "authorized_keys"), "utf8"),
      "tracked\n",
    );
  },
);

test("target validation uses an isolated loopback-only Codex sandbox", () => {
  const cwd = gitPackageFixture({ check: 'node -e ""' });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  // Production validation runs after trusted dependency preparation. Keep the
  // fake sandbox from making pnpm create its workspace marker outside that path.
  markPackageDependenciesPrepared(cwd);
  const { binDir, logPath } = fakeCodexSandboxFixture(cwd);

  withPathPrefix(binDir, () => {
    assert.deepEqual(
      runAllowedValidationCommands(
        ["pnpm run check"],
        cwd,
        validationOptions("openclaw/fs-safe", {
          allowExpensiveValidation: true,
          sandboxTargetCommands: true,
        }),
      ),
      ["pnpm run check"],
    );
  });

  const invocation = JSON.parse(fs.readFileSync(logPath, "utf8"));
  assert.deepEqual(invocation.args.slice(0, 6), [
    "sandbox",
    "--permissions-profile",
    "clawsweeper-target",
    "--cd",
    cwd,
    "--",
  ]);
  assert.equal(path.isAbsolute(invocation.args[6]), true);
  assert.equal(
    path.resolve(invocation.args[6]).startsWith(`${path.resolve(cwd)}${path.sep}`),
    false,
  );
  assert.match(invocation.config, /extends = ":workspace"/);
  assert.match(invocation.config, /":root" = "deny"/);
  assert.match(invocation.config, /":minimal" = "read"/);
  assert.match(invocation.config, /"\." = "write"/);
  assert.match(invocation.config, /"\.git" = "read"/);
  assert.match(invocation.config, /"[^"]*clawsweeper-validation-cache-[^"]*\/\*\*" = "read"/);
  assert.match(
    invocation.config,
    /"[^"]*clawsweeper-validation-cache-[^"]*\/run-[^"]*\/\*\*" = "write"/,
  );
  assert.match(invocation.config, /"node_modules\/\*\*" = "read"/);
  assert.match(invocation.config, /"node_modules\/\.vite\/\*\*" = "write"/);
  assert.match(invocation.config, /"node_modules\/\.vite-temp\/\*\*" = "write"/);
  assert.doesNotMatch(invocation.config, /"\*\*\/node_modules/);
  assert.match(invocation.config, /"\*\*\/\*\.env" = "deny"/);
  assert.match(invocation.config, /\[features\]\s+network_proxy = true/);
  assert.match(
    invocation.config,
    /\[permissions\.clawsweeper-target\.network\]\s+enabled = true\s+mode = "limited"\s+allow_local_binding = true/,
  );
  assert.match(invocation.config, /"localhost" = "allow"/);
  assert.match(invocation.config, /"127\.0\.0\.1" = "allow"/);
  assert.match(invocation.config, /"::1" = "allow"/);
  const nodeBin = fs.realpathSync(path.dirname(fs.realpathSync(process.execPath)));
  assert.ok(invocation.config.includes(`${JSON.stringify(`${nodeBin}/**`)} = "read"`));
  const homebrewPrefix = fs
    .realpathSync(process.execPath)
    .split(path.sep)
    .join("/")
    .match(/^(.*)\/Cellar\//)?.[1];
  if (homebrewPrefix) {
    assert.ok(!invocation.config.includes(`${JSON.stringify(`${homebrewPrefix}/**`)} = "read"`));
  }
});

test(
  "target validation grants npm-installed Codex package files sandbox read access",
  { skip: process.platform === "win32" },
  () => {
    const cwd = gitPackageFixture({ check: 'node -e ""' });
    git(cwd, "add", ".");
    git(cwd, "commit", "-m", "initial");
    attachOrigin(cwd);
    markPackageDependenciesPrepared(cwd);
    const { binDir, logPath, packageRoot } = packagedCodexSandboxFixture(cwd);

    withPathPrefix(binDir, () => {
      assert.deepEqual(
        runAllowedValidationCommands(
          ["pnpm run check"],
          cwd,
          validationOptions("openclaw/fs-safe", {
            allowExpensiveValidation: true,
            sandboxTargetCommands: true,
          }),
        ),
        ["pnpm run check"],
      );
    });

    const invocation = JSON.parse(fs.readFileSync(logPath, "utf8"));
    const realPackageRoot = fs.realpathSync(packageRoot).split(path.sep).join("/");
    assert.ok(invocation.config.includes(`${JSON.stringify(`${realPackageRoot}/**`)} = "read"`));
  },
);

test(
  "target validation does not resolve Codex from the writable validation cache",
  { skip: process.platform === "win32" },
  () => {
    const cwd = gitPackageFixture({ check: 'node -e ""' });
    git(cwd, "add", ".");
    git(cwd, "commit", "-m", "initial");
    attachOrigin(cwd);
    markPackageDependenciesPrepared(cwd);
    const { binDir, logPath } = fakeCodexSandboxFixture(cwd);
    const cacheBin = path.join(cwd, ".clawsweeper-validation-cache", "corepack-bin");
    const shadowLog = path.join(cwd, ".git", "shadow-codex.log");
    fs.mkdirSync(cacheBin, { recursive: true });
    fs.writeFileSync(
      path.join(cacheBin, "codex"),
      `#!/usr/bin/env node\nrequire("node:fs").writeFileSync(${JSON.stringify(shadowLog)}, "used\\n");\n`,
    );
    fs.chmodSync(path.join(cacheBin, "codex"), 0o755);

    withPathPrefix(binDir, () => {
      assert.deepEqual(
        runAllowedValidationCommands(
          ["pnpm run check"],
          cwd,
          validationOptions("openclaw/fs-safe", {
            allowExpensiveValidation: true,
            sandboxTargetCommands: true,
          }),
        ),
        ["pnpm run check"],
      );
    });

    assert.equal(fs.existsSync(logPath), true);
    assert.equal(fs.existsSync(shadowLog), false);
  },
);

test(
  "target validation does not resolve commands from the writable validation cache",
  { skip: process.platform === "win32" },
  () => {
    const cwd = gitPackageFixture({});
    fs.writeFileSync(path.join(cwd, "check.js"), "process.exit(0);\n");
    git(cwd, "add", ".");
    git(cwd, "commit", "-m", "initial");
    attachOrigin(cwd);
    const cacheBin = path.join(cwd, ".clawsweeper-validation-cache", "corepack-bin");
    const shadowLog = path.join(cwd, ".git", "shadow-node.log");
    fs.mkdirSync(cacheBin, { recursive: true });
    fs.writeFileSync(
      path.join(cacheBin, "node"),
      `#!/bin/sh\nprintf used > ${JSON.stringify(shadowLog)}\nexit 0\n`,
    );
    fs.chmodSync(path.join(cacheBin, "node"), 0o755);

    assert.deepEqual(
      runAllowedValidationCommands(
        ["node check.js"],
        cwd,
        validationOptions("openclaw/fs-safe", { allowExpensiveValidation: true }),
      ),
      ["node check.js"],
    );
    assert.equal(fs.existsSync(shadowLog), false);
  },
);

test(
  "target validation does not resolve commands from the target checkout",
  { skip: process.platform === "win32" },
  () => {
    const cwd = gitPackageFixture({});
    const realLog = path.join(cwd, ".git", "real-node.log");
    const shadowLog = path.join(cwd, ".git", "shadow-node.log");
    fs.writeFileSync(
      path.join(cwd, "check.js"),
      `require("node:fs").writeFileSync(${JSON.stringify(realLog)}, "used\\n");\n`,
    );
    fs.writeFileSync(
      path.join(cwd, "node"),
      `#!/bin/sh\nprintf used > ${JSON.stringify(shadowLog)}\nexit 0\n`,
    );
    fs.chmodSync(path.join(cwd, "node"), 0o755);
    git(cwd, "add", ".");
    git(cwd, "commit", "-m", "initial");
    attachOrigin(cwd);

    withPathPrefix(cwd, () => {
      assert.deepEqual(
        runAllowedValidationCommands(
          ["node check.js"],
          cwd,
          validationOptions("openclaw/fs-safe", { allowExpensiveValidation: true }),
        ),
        ["node check.js"],
      );
    });

    assert.equal(fs.existsSync(realLog), true);
    assert.equal(fs.existsSync(shadowLog), false);
  },
);

test("target validation preserves the already fetched base ref", () => {
  const cwd = gitPackageFixture({ check: 'node -e ""' });
  fs.writeFileSync(path.join(cwd, "source.txt"), "base\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  const origin = attachOrigin(cwd);
  markPackageDependenciesPrepared(cwd);
  const pinnedBase = git(cwd, "rev-parse", "origin/main");
  git(cwd, "checkout", "-b", "repair");
  fs.writeFileSync(path.join(cwd, "source.txt"), "repair\n");
  git(cwd, "commit", "-am", "repair");

  const updater = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-updater-"));
  execFileSync("git", ["clone", origin, updater], { encoding: "utf8" });
  git(updater, "config", "user.email", "clawsweeper@example.invalid");
  git(updater, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(updater, "remote.txt"), "advanced\n");
  git(updater, "add", ".");
  git(updater, "commit", "-m", "advance base");
  git(updater, "push", "origin", "main");

  assert.deepEqual(
    runAllowedValidationCommands(
      ["pnpm run check"],
      cwd,
      validationOptions("openclaw/fs-safe", { allowExpensiveValidation: true }),
    ),
    ["pnpm run check"],
  );
  assert.equal(git(cwd, "rev-parse", "origin/main"), pinnedBase);
});

test("target validation configures the supported elevated Windows sandbox", () => {
  const source = fs.readFileSync("src/repair/target-validation.ts", "utf8");
  assert.match(source, /process\.platform === "win32"/);
  assert.match(source, /\[windows\]\s+sandbox = "elevated"/);
  assert.match(source, /\["\.bat", "\.cmd"\]\.includes/);
  assert.match(source, /args: \["\/d", "\/s", "\/v:off", "\/c", commandLine\]/);
});

test("target validation grants standard Go distributions full sandbox read access", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-go-sandbox-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir: codexBinDir, logPath } = fakeCodexSandboxFixture(cwd);
  const goRoot = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-go-root-"));
  const goBinDir = path.join(goRoot, "bin");
  fs.mkdirSync(path.join(goRoot, "src", "runtime"), { recursive: true });
  fs.mkdirSync(path.join(goRoot, "pkg", "tool"), { recursive: true });
  fs.mkdirSync(goBinDir);
  const goPath = path.join(goBinDir, "go");
  fs.writeFileSync(goPath, "#!/usr/bin/env node\nprocess.exit(0);\n");
  fs.chmodSync(goPath, 0o755);

  withTemporaryEnv(
    {
      PATH: [codexBinDir, goBinDir, process.env.PATH].filter(Boolean).join(path.delimiter),
    },
    () => {
      assert.deepEqual(
        runAllowedValidationCommands(
          ["go test ./..."],
          cwd,
          validationOptions("openclaw/go", { sandboxTargetCommands: true }),
        ),
        ["go test ./..."],
      );
    },
  );

  const invocation = JSON.parse(fs.readFileSync(logPath, "utf8"));
  const realGoRoot = fs.realpathSync(goRoot);
  assert.ok(
    invocation.config.includes(
      `${JSON.stringify(`${realGoRoot.split(path.sep).join("/")}/**`)} = "read"`,
    ),
  );
});

test("target validation reports incompatible sandbox runners before repository commands", () => {
  const cwd = gitPackageFixture({ check: 'node -e ""' });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = failingCodexSandboxFixture(cwd);

  withPathPrefix(binDir, () => {
    assert.throws(
      () =>
        runAllowedValidationCommands(
          ["pnpm run check"],
          cwd,
          validationOptions("openclaw/fs-safe", { sandboxTargetCommands: true }),
        ),
      /validation_sandbox_unavailable.*RTM_NEWADDR/,
    );
  });

  const command = JSON.parse(fs.readFileSync(logPath, "utf8")).command;
  assert.equal(path.isAbsolute(command[0]), true);
  assert.deepEqual(command.slice(1), ["-e", "process.exit(0)"]);
});

test("target validation classifies sandbox startup failures from repository commands", () => {
  const cwd = gitPackageFixture({ check: 'node -e ""' });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = lateFailingCodexSandboxFixture(cwd);

  withPathPrefix(binDir, () => {
    assert.throws(
      () =>
        runAllowedValidationCommands(
          ["pnpm run check"],
          cwd,
          validationOptions("openclaw/fs-safe", { sandboxTargetCommands: true }),
        ),
      /validation_sandbox_unavailable.*RTM_NEWADDR/,
    );
  });

  const commands = fs
    .readFileSync(logPath, "utf8")
    .trim()
    .split(/\r?\n/)
    .map((line) => JSON.parse(line));
  assert.equal(path.isAbsolute(commands[0]?.[0]), true);
  assert.deepEqual(commands[0]?.slice(1), ["-e", "process.exit(0)"]);
  assert.equal(commands.length, 2);
  assert.equal(path.isAbsolute(commands[1]?.[0]), true);
});

test("trusted base preparation keeps the Go module cache outside the checkout", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-go-prepare-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeGoFixture(cwd);

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(
      cwd,
      validationOptions("openclaw/discrawl", { installTargetDeps: true }),
      "main",
    );
  });

  assert.deepEqual(fs.readFileSync(logPath, "utf8").trim().split(/\r?\n/), [
    "version",
    "mod download all",
  ]);
  assert.equal(fs.existsSync(path.join(cwd, ".clawsweeper-validation-cache")), false);
});

test("trusted base preparation retries transient Go module download failures", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-go-retry-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeGoFixture(cwd, {
    downloadFailures: 2,
    failureMessage: "read: connection reset by peer",
  });

  withTemporaryEnv({ CLAWSWEEPER_GO_DEPENDENCY_RETRY_DELAY_MS: "0" }, () =>
    withPathPrefix(binDir, () => {
      prepareTrustedTargetDependencies(
        cwd,
        validationOptions("openclaw/gogcli", { installTargetDeps: true }),
        "main",
      );
    }),
  );

  assert.deepEqual(fs.readFileSync(logPath, "utf8").trim().split(/\r?\n/), [
    "version",
    "mod download all",
    "mod download all",
    "mod download all",
  ]);
});

test("trusted base preparation does not retry deterministic Go module failures", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-go-fail-fast-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeGoFixture(cwd, {
    downloadFailures: 3,
    failureMessage: "verifying module: checksum mismatch",
  });

  withPathPrefix(binDir, () => {
    assert.throws(
      () =>
        prepareTrustedTargetDependencies(
          cwd,
          validationOptions("openclaw/gogcli", { installTargetDeps: true }),
          "main",
        ),
      /validation_dependency_prepare_failed.*checksum mismatch/,
    );
  });

  assert.deepEqual(fs.readFileSync(logPath, "utf8").trim().split(/\r?\n/), [
    "version",
    "mod download all",
  ]);
});

test("repair branch preparation rejects changed Go dependency manifests before network access", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-go-branch-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "go.mod"), "module example.invalid/project\n\ngo 1.24\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  fs.appendFileSync(path.join(cwd, "go.mod"), "\nrequire example.invalid/new v1.0.0\n");
  git(cwd, "commit", "-am", "change dependencies");
  const { binDir, logPath } = fakeGoFixture(cwd);

  withPathPrefix(binDir, () => {
    assert.throws(
      () =>
        prepareBranchTargetDependencies(
          cwd,
          validationOptions("openclaw/discrawl", { installTargetDeps: true }),
        ),
      /validation_definition_changed: Go dependency definition go\.mod/,
    );
  });

  assert.equal(fs.existsSync(logPath), false);
});

test("trusted base preparation restores explicit .NET targets before adding no-restore", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-dotnet-prepare-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.mkdirSync(path.join(cwd, "tests"));
  fs.mkdirSync(path.join(cwd, "build"));
  fs.writeFileSync(
    path.join(cwd, "tests", "Foo.Tests.csproj"),
    '<Project><Import Project="../build/dependencies.custom" /></Project>\n',
  );
  fs.writeFileSync(path.join(cwd, "build", "dependencies.custom"), "base\n");
  fs.writeFileSync(path.join(cwd, "packages.config"), "<packages />\n");
  fs.writeFileSync(path.join(cwd, "Directory.Build.props"), "<Project />\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeDotnetFixture(cwd);
  const command = "dotnet test --configuration Release ./tests/Foo.Tests.csproj";
  const options = validationOptions("openclaw/dotnet", { installTargetDeps: true });

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(cwd, options, "main", [command]);
  });

  const restoreCommand = fs.readFileSync(logPath, "utf8").trim();
  assert.match(
    restoreCommand,
    /^restore \.\/tests\/Foo\.Tests\.csproj --property Configuration=Release --packages /,
  );
  assertExternalValidationPath(
    cwd,
    restoreCommand.replace(
      /^restore \.\/tests\/Foo\.Tests\.csproj --property Configuration=Release --packages /,
      "",
    ),
    "nuget",
  );
  const result = preflightTargetValidationPlan(
    { fixArtifact: { validation_commands: [command] }, targetDir: cwd },
    options,
  );
  assert.deepEqual(result.resolved_commands, [
    "dotnet test --configuration Release ./tests/Foo.Tests.csproj --no-restore",
  ]);
  const runnerArgsCommand =
    "dotnet test --configuration Release ./tests/Foo.Tests.csproj -- --filter Category=Unit";
  assert.deepEqual(
    preflightTargetValidationPlan(
      { fixArtifact: { validation_commands: [runnerArgsCommand] }, targetDir: cwd },
      options,
    ).resolved_commands,
    [
      "dotnet test --configuration Release ./tests/Foo.Tests.csproj --no-restore -- --filter Category=Unit",
    ],
  );

  fs.writeFileSync(path.join(cwd, "build", "dependencies.custom"), "branch\n");
  assert.deepEqual(
    preflightTargetValidationPlan(
      { fixArtifact: { validation_commands: [command] }, targetDir: cwd },
      options,
    ).resolved_commands,
    ["dotnet test --configuration Release ./tests/Foo.Tests.csproj"],
  );
  assert.throws(
    () => prepareBranchTargetDependencies(cwd, options, "main", [command]),
    /validation_definition_changed: \.NET restore inputs/,
  );
  fs.writeFileSync(path.join(cwd, "build", "dependencies.custom"), "base\n");

  fs.writeFileSync(
    path.join(cwd, "packages.config"),
    '<packages><package id="Changed" /></packages>\n',
  );
  assert.deepEqual(
    preflightTargetValidationPlan(
      { fixArtifact: { validation_commands: [command] }, targetDir: cwd },
      options,
    ).resolved_commands,
    ["dotnet test --configuration Release ./tests/Foo.Tests.csproj"],
  );
  assert.throws(
    () => prepareBranchTargetDependencies(cwd, options, "main", [command]),
    /validation_definition_changed: \.NET restore inputs/,
  );
  fs.writeFileSync(path.join(cwd, "packages.config"), "<packages />\n");

  fs.writeFileSync(path.join(cwd, "Directory.Build.rsp"), "-property:BranchValue=true\n");
  assert.deepEqual(
    preflightTargetValidationPlan(
      { fixArtifact: { validation_commands: [command] }, targetDir: cwd },
      options,
    ).resolved_commands,
    ["dotnet test --configuration Release ./tests/Foo.Tests.csproj"],
  );
  assert.throws(
    () => prepareBranchTargetDependencies(cwd, options, "main", [command]),
    /validation_definition_changed: \.NET restore inputs/,
  );
  fs.rmSync(path.join(cwd, "Directory.Build.rsp"));

  fs.writeFileSync(path.join(cwd, "Directory.Build.targets"), "<Project />\n");
  const changedResult = preflightTargetValidationPlan(
    { fixArtifact: { validation_commands: [command] }, targetDir: cwd },
    options,
  );
  assert.deepEqual(changedResult.resolved_commands, [
    "dotnet test --configuration Release ./tests/Foo.Tests.csproj",
  ]);
  assert.throws(
    () => prepareBranchTargetDependencies(cwd, options, "main", [command]),
    /validation_definition_changed: \.NET restore inputs/,
  );

  fs.rmSync(path.join(cwd, "Directory.Build.props"));
  assert.deepEqual(
    preflightTargetValidationPlan(
      { fixArtifact: { validation_commands: [command] }, targetDir: cwd },
      options,
    ).resolved_commands,
    ["dotnet test --configuration Release ./tests/Foo.Tests.csproj"],
  );
});

test("trusted base preparation preserves .NET restore graph options", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-dotnet-options-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.mkdirSync(path.join(cwd, "tests"));
  fs.writeFileSync(path.join(cwd, "tests", "Foo.Tests.csproj"), "<Project />\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeDotnetFixture(cwd);
  const command = "dotnet test ./tests/Foo.Tests.csproj --framework net8.0 --runtime win-x64";
  const options = validationOptions("openclaw/dotnet", { installTargetDeps: true });

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(cwd, options, "main", [command]);
  });

  assert.match(
    fs.readFileSync(logPath, "utf8").trim(),
    /^restore \.\/tests\/Foo\.Tests\.csproj --property TargetFramework=net8\.0 --runtime win-x64 --packages /,
  );
  assert.deepEqual(
    preflightTargetValidationPlan(
      { fixArtifact: { validation_commands: [command] }, targetDir: cwd },
      options,
    ).resolved_commands,
    ["dotnet test ./tests/Foo.Tests.csproj --framework net8.0 --runtime win-x64 --no-restore"],
  );
});

test("target validation classifies native Windows sandbox startup failures", () => {
  const cwd = gitPackageFixture({ check: 'node -e ""' });
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir } = windowsFailingCodexSandboxFixture(cwd);

  withPathPrefix(binDir, () => {
    assert.throws(
      () =>
        runAllowedValidationCommands(
          ["pnpm run check"],
          cwd,
          validationOptions("openclaw/fs-safe", {
            allowExpensiveValidation: true,
            sandboxTargetCommands: true,
          }),
        ),
      /validation_sandbox_unavailable.*CreateProcessAsUserW failed/,
    );
  });
});

test("trusted base preparation restores root .NET solutions for script-driven builds", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-dotnet-script-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "App.slnx"), "<Solution />\n");
  fs.writeFileSync(path.join(cwd, "build.ps1"), "dotnet build ./src/App/App.csproj\n");
  fs.mkdirSync(path.join(cwd, "tests"), { recursive: true });
  fs.writeFileSync(path.join(cwd, "tests", "App.Tests.csproj"), "<Project />\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeDotnetFixture(cwd);
  const options = validationOptions("openclaw/dotnet", {
    installTargetDeps: true,
    toolchain: {
      packageManager: "npm",
      packageManagerExplicit: true,
      baseValidationCommands: ["./build.ps1", "dotnet test ./tests/App.Tests.csproj"],
      changedGate: null,
    },
  });

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(cwd, options, "main", [
      "./build.ps1",
      "dotnet test ./tests/App.Tests.csproj",
    ]);
  });

  const commands = fs.readFileSync(logPath, "utf8").trim().split(/\r?\n/);
  assert.match(commands[0]!, /^restore \.\/tests\/App\.Tests\.csproj --packages /);
  assert.match(commands[1]!, /^restore \.\/App\.slnx --packages /);
  const firstCache = commands[0]!.replace(/^restore \.\/tests\/App\.Tests\.csproj --packages /, "");
  const secondCache = commands[1]!.replace(/^restore \.\/App\.slnx --packages /, "");
  assertExternalValidationPath(cwd, firstCache, "nuget");
  assert.equal(secondCache, firstCache);
});

test(
  "repair branch preparation fingerprints .NET symlinks without following them",
  { skip: process.platform === "win32" },
  () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-dotnet-symlink-"));
    git(cwd, "init", "-b", "main");
    git(cwd, "config", "user.email", "clawsweeper@example.invalid");
    git(cwd, "config", "user.name", "ClawSweeper Test");
    fs.writeFileSync(path.join(cwd, "App.csproj"), "<Project />\n");
    fs.writeFileSync(path.join(cwd, "Directory.Build.props"), "<Project />\n");
    git(cwd, "add", ".");
    git(cwd, "commit", "-m", "initial");
    attachOrigin(cwd);
    const { binDir } = fakeDotnetFixture(cwd);
    const options = validationOptions("openclaw/dotnet", { installTargetDeps: true });

    withPathPrefix(binDir, () => {
      prepareTrustedTargetDependencies(cwd, options, "main", ["dotnet test ./App.csproj"]);
    });
    fs.rmSync(path.join(cwd, "Directory.Build.props"));
    fs.symlinkSync("/dev/zero", path.join(cwd, "Directory.Build.props"));

    assert.throws(
      () => prepareBranchTargetDependencies(cwd, options, "main", ["dotnet test ./App.csproj"]),
      /validation_definition_changed: \.NET restore inputs/,
    );
  },
);

test("repair branch preparation fingerprints dynamic repository MSBuild imports", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-dotnet-import-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.mkdirSync(path.join(cwd, "build"));
  fs.writeFileSync(
    path.join(cwd, "App.csproj"),
    '<Project><Import Project="$(RepoRoot)build/dependencies.custom" /></Project>\n',
  );
  fs.writeFileSync(path.join(cwd, "build", "dependencies.custom"), "<Project />\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir } = fakeDotnetFixture(cwd);
  const options = validationOptions("openclaw/dotnet", { installTargetDeps: true });

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(cwd, options, "main", ["dotnet test ./App.csproj"]);
  });
  fs.writeFileSync(
    path.join(cwd, "build", "dependencies.custom"),
    "<Project><PropertyGroup /></Project>\n",
  );

  assert.throws(
    () => prepareBranchTargetDependencies(cwd, options, "main", ["dotnet test ./App.csproj"]),
    /validation_definition_changed: \.NET restore inputs/,
  );
});

test("repair branch validation rejects changed .NET settings and adapter inputs", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-dotnet-inputs-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "App.csproj"), "<Project />\n");
  fs.writeFileSync(path.join(cwd, "tests.runsettings"), "<RunSettings />\n");
  fs.mkdirSync(path.join(cwd, "adapters"));
  fs.writeFileSync(path.join(cwd, "adapters", "adapter.dll"), "trusted adapter\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const options = validationOptions("openclaw/dotnet", { installTargetDeps: true });
  const command =
    "dotnet test ./App.csproj --settings tests.runsettings --test-adapter-path adapters";

  fs.writeFileSync(path.join(cwd, "tests.runsettings"), "<RunSettings><Filter /></RunSettings>\n");
  assert.throws(
    () => prepareBranchTargetDependencies(cwd, options, "main", [command]),
    /validation_definition_changed: \.NET validation input tests\.runsettings/,
  );

  fs.writeFileSync(path.join(cwd, "tests.runsettings"), "<RunSettings />\n");
  fs.writeFileSync(path.join(cwd, "adapters", "adapter.dll"), "changed adapter\n");
  assert.throws(
    () => prepareBranchTargetDependencies(cwd, options, "main", [command]),
    /validation_definition_changed: \.NET validation input adapters/,
  );
});

test("repair branch validation rejects traversing .NET validation inputs", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-dotnet-traversal-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "App.csproj"), "<Project />\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const options = validationOptions("openclaw/dotnet", { installTargetDeps: true });

  for (const command of [
    "dotnet test ./App.csproj --settings nested/../../outside.runsettings",
    "dotnet test ./App.csproj --test-adapter-path nested/../../adapters",
    "dotnet test ./App.csproj @nested/../../arguments.rsp",
  ]) {
    assert.throws(
      () => prepareBranchTargetDependencies(cwd, options, "main", [command]),
      /validation_definition_untrusted: invalid \.NET validation input/,
    );
  }
});

test("repair branch preparation fingerprints .runsettings and .slnf files", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-dotnet-filter-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "App.csproj"), "<Project />\n");
  fs.mkdirSync(path.join(cwd, "config"));
  fs.writeFileSync(
    path.join(cwd, "config", "App.slnf"),
    '{"solution":{"path":"../App.sln","projects":[]}}\n',
  );
  fs.writeFileSync(path.join(cwd, "tests.runsettings"), "<RunSettings />\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir } = fakeDotnetFixture(cwd);
  const options = validationOptions("openclaw/dotnet", { installTargetDeps: true });

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(cwd, options, "main", ["dotnet test ./App.csproj"]);
  });
  fs.writeFileSync(path.join(cwd, "tests.runsettings"), "<RunSettings><Filter /></RunSettings>\n");
  assert.throws(
    () => prepareBranchTargetDependencies(cwd, options, "main", ["dotnet test ./App.csproj"]),
    /validation_definition_changed: \.NET restore inputs/,
  );

  fs.writeFileSync(path.join(cwd, "tests.runsettings"), "<RunSettings />\n");
  fs.writeFileSync(
    path.join(cwd, "config", "App.slnf"),
    '{"solution":{"path":"../App.sln","projects":["One"]}}\n',
  );
  assert.throws(
    () => prepareBranchTargetDependencies(cwd, options, "main", ["dotnet test ./App.csproj"]),
    /validation_definition_changed: \.NET restore inputs/,
  );
});

test("trusted base preparation restores the implicit dotnet test target", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-dotnet-implicit-"));
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(cwd, "App.csproj"), "<Project />\n");
  git(cwd, "add", ".");
  git(cwd, "commit", "-m", "initial");
  attachOrigin(cwd);
  const { binDir, logPath } = fakeDotnetFixture(cwd);
  const command = "dotnet test";
  const options = validationOptions("openclaw/dotnet", { installTargetDeps: true });

  withPathPrefix(binDir, () => {
    prepareTrustedTargetDependencies(cwd, options, "main", [command]);
  });

  const restoreCommand = fs.readFileSync(logPath, "utf8").trim();
  assert.match(restoreCommand, /^restore \. --packages /);
  assertExternalValidationPath(cwd, restoreCommand.replace(/^restore \. --packages /, ""), "nuget");
  assert.deepEqual(
    preflightTargetValidationPlan(
      { fixArtifact: { validation_commands: [command] }, targetDir: cwd },
      options,
    ).resolved_commands,
    ["dotnet test --no-restore"],
  );
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

function markPackageDependenciesPrepared(cwd) {
  fs.mkdirSync(path.join(cwd, "node_modules"), { recursive: true });
}

function bunPackageFixture(scripts) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-bun-"));
  fs.writeFileSync(
    path.join(cwd, "package.json"),
    `${JSON.stringify({ scripts, packageManager: "bun@1.1.0" }, null, 2)}\n`,
  );
  fs.writeFileSync(path.join(cwd, "bun.lock"), "");
  return cwd;
}

function gitBunPackageFixture(scripts) {
  const cwd = bunPackageFixture(scripts);
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  return cwd;
}

function fakeBunFixture(cwd) {
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-fake-bun-bin-"));
  const logPath = path.join(
    cwd,
    fs.existsSync(path.join(cwd, ".git")) ? ".git/fake-bun.log" : "fake-bun.log",
  );
  const bunPath = path.join(binDir, "bun");
  fs.writeFileSync(
    bunPath,
    `#!/usr/bin/env node
const fs = require("node:fs");
fs.appendFileSync(${JSON.stringify(logPath)}, process.argv.slice(2).join(" ") + "\\n");
if (process.argv[2] === "--version") console.log("1.3.10");
`,
  );
  fs.chmodSync(bunPath, 0o755);
  return { binDir, logPath };
}

function envLoggingBunFixture(cwd) {
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-fake-bun-env-bin-"));
  const logPath = path.join(cwd, "fake-bun.log");
  const envLogPath = path.join(cwd, "fake-bun-env.log");
  const bunPath = path.join(binDir, "bun");
  fs.writeFileSync(
    bunPath,
    `#!/usr/bin/env node
const fs = require("node:fs");
fs.appendFileSync(${JSON.stringify(logPath)}, process.argv.slice(2).join(" ") + "\\n");
fs.appendFileSync(${JSON.stringify(envLogPath)}, JSON.stringify(process.env) + "\\n");
if (process.argv[2] === "--version") console.log("1.3.10");
`,
  );
  fs.chmodSync(bunPath, 0o755);
  return { binDir, logPath, envLogPath };
}

function fakePnpmFixture(cwd, { failFrozen = false, createLifecycleOutputs = false } = {}) {
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-fake-pnpm-bin-"));
  const logPath = path.join(
    cwd,
    fs.existsSync(path.join(cwd, ".git")) ? ".git/fake-pnpm.log" : "fake-pnpm.log",
  );
  const corepackPath = path.join(binDir, "corepack");
  const shimBody = [
    'const fs = require("node:fs");',
    `const args = process.argv.slice(process.platform === "win32" ? 1 : 2);`,
    `fs.appendFileSync(${JSON.stringify(logPath)}, "shim-pnpm " + args.join(" ") + "\\n");`,
    failFrozen
      ? `if (args.includes("--frozen-lockfile")) { console.error("ERR_PNPM_OUTDATED_LOCKFILE"); process.exit(1); }`
      : "",
    createLifecycleOutputs
      ? `if (args.includes("install") && !args.includes("--ignore-scripts")) {
  fs.mkdirSync(${JSON.stringify(path.join(cwd, "dist"))}, { recursive: true });
  fs.writeFileSync(${JSON.stringify(path.join(cwd, "dist", "generated.js"))}, "generated\\n");
  fs.mkdirSync(${JSON.stringify(path.join(cwd, "node_modules", "native-package"))}, { recursive: true });
  fs.writeFileSync(${JSON.stringify(path.join(cwd, "node_modules", "native-package", "binding.node"))}, "built\\n");
}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
  const unixShim = `#!/usr/bin/env node\n${shimBody}\n`;
  const windowsShim = `@echo off\r\nnode -e ${JSON.stringify(shimBody)} -- %*\r\n`;
  fs.writeFileSync(
    corepackPath,
    `#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const args = process.argv.slice(2);
fs.appendFileSync(${JSON.stringify(logPath)}, "corepack " + args.join(" ") + "\\n");
${
  createLifecycleOutputs
    ? `if (args.includes("install") && !args.includes("--ignore-scripts")) {
  fs.mkdirSync(${JSON.stringify(path.join(cwd, "dist"))}, { recursive: true });
  fs.writeFileSync(${JSON.stringify(path.join(cwd, "dist", "generated.js"))}, "generated\\n");
  fs.mkdirSync(${JSON.stringify(path.join(cwd, "node_modules", "native-package"))}, { recursive: true });
  fs.writeFileSync(${JSON.stringify(path.join(cwd, "node_modules", "native-package", "binding.node"))}, "built\\n");
}`
    : ""
}
if (args[0] === "enable") {
  const installDirectory = args[args.indexOf("--install-directory") + 1];
  fs.mkdirSync(installDirectory, { recursive: true });
  const shimPath = path.join(installDirectory, process.platform === "win32" ? "pnpm.cmd" : "pnpm");
	  fs.writeFileSync(
	    shimPath,
	    process.platform === "win32" ? ${JSON.stringify(windowsShim)} : ${JSON.stringify(unixShim)},
	  );
  if (process.platform !== "win32") fs.chmodSync(shimPath, 0o755);
}
`,
  );
  fs.chmodSync(corepackPath, 0o755);
  const pnpmPath = path.join(binDir, "pnpm");
  fs.writeFileSync(
    pnpmPath,
    `#!/usr/bin/env node
require("node:fs").appendFileSync(${JSON.stringify(logPath)}, "standalone-pnpm " + process.argv.slice(2).join(" ") + "\\n");
`,
  );
  fs.chmodSync(pnpmPath, 0o755);
  return { binDir, logPath };
}

function fakeNpmFixture(cwd) {
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-fake-npm-bin-"));
  const logPath = path.join(cwd, ".git", "fake-npm.log");
  const executablePath = path.join(binDir, "npm");
  fs.writeFileSync(
    executablePath,
    `#!/usr/bin/env node
const fs = require("node:fs");
const args = process.argv.slice(2);
fs.appendFileSync(${JSON.stringify(logPath)}, args.join(" ") + "\\n");
if (
  args[0] === "install" &&
  !args.includes("--package-lock=false") &&
  !fs.existsSync(${JSON.stringify(path.join(cwd, "package-lock.json"))})
) {
  fs.writeFileSync(${JSON.stringify(path.join(cwd, "package-lock.json"))}, "{}\\n");
}
`,
  );
  fs.chmodSync(executablePath, 0o755);
  return { binDir, logPath };
}

function fakeCodexSandboxFixture(cwd) {
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-fake-codex-bin-"));
  const logPath = path.join(cwd, ".git", "fake-codex-sandbox.json");
  const executablePath = path.join(binDir, "codex");
  fs.writeFileSync(
    executablePath,
    `#!/usr/bin/env node
const fs = require("node:fs");
const { spawnSync } = require("node:child_process");
const args = process.argv.slice(2);
const separator = args.indexOf("--");
fs.writeFileSync(${JSON.stringify(logPath)}, JSON.stringify({
  args,
  config: fs.readFileSync(process.env.CODEX_HOME + "/config.toml", "utf8"),
}));
const child = spawnSync(args[separator + 1], args.slice(separator + 2), {
  cwd: ${JSON.stringify(cwd)},
  env: process.env,
  encoding: "utf8",
});
process.stdout.write(child.stdout || "");
process.stderr.write(child.stderr || "");
process.exit(child.status ?? 1);
`,
  );
  fs.chmodSync(executablePath, 0o755);
  return { binDir, logPath };
}

function packagedCodexSandboxFixture(cwd) {
  const installRoot = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-packaged-codex-"));
  const binDir = path.join(installRoot, "bin");
  const packageRoot = path.join(installRoot, "lib", "node_modules", "@openai", "codex");
  const packageBinDir = path.join(packageRoot, "bin");
  const logPath = path.join(cwd, ".git", "packaged-codex-sandbox.json");
  const executablePath = path.join(packageBinDir, "codex.js");
  fs.mkdirSync(binDir, { recursive: true });
  fs.mkdirSync(packageBinDir, { recursive: true });
  fs.writeFileSync(
    executablePath,
    `#!/usr/bin/env node
const fs = require("node:fs");
const { spawnSync } = require("node:child_process");
const args = process.argv.slice(2);
const separator = args.indexOf("--");
fs.writeFileSync(${JSON.stringify(logPath)}, JSON.stringify({
  args,
  config: fs.readFileSync(process.env.CODEX_HOME + "/config.toml", "utf8"),
}));
const child = spawnSync(args[separator + 1], args.slice(separator + 2), {
  cwd: ${JSON.stringify(cwd)},
  env: process.env,
  encoding: "utf8",
});
process.stdout.write(child.stdout || "");
process.stderr.write(child.stderr || "");
process.exit(child.status ?? 1);
`,
  );
  fs.chmodSync(executablePath, 0o755);
  fs.symlinkSync(path.relative(binDir, executablePath), path.join(binDir, "codex"));
  return { binDir, logPath, packageRoot };
}

function failingCodexSandboxFixture(cwd) {
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-failing-codex-bin-"));
  const logPath = path.join(cwd, ".git", "failing-codex-sandbox.json");
  const executablePath = path.join(binDir, "codex");
  fs.writeFileSync(
    executablePath,
    `#!/usr/bin/env node
const fs = require("node:fs");
const args = process.argv.slice(2);
const separator = args.indexOf("--");
fs.writeFileSync(${JSON.stringify(logPath)}, JSON.stringify({
  command: args.slice(separator + 1),
}));
console.error("bwrap: loopback: Failed RTM_NEWADDR: Operation not permitted");
process.exit(1);
`,
  );
  fs.chmodSync(executablePath, 0o755);
  return { binDir, logPath };
}

function windowsFailingCodexSandboxFixture(cwd) {
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-windows-codex-bin-"));
  const logPath = path.join(cwd, ".git", "windows-codex-sandbox.json");
  const executablePath = path.join(binDir, "codex");
  fs.writeFileSync(
    executablePath,
    `#!/usr/bin/env node
const fs = require("node:fs");
fs.writeFileSync(${JSON.stringify(logPath)}, JSON.stringify(process.argv.slice(2)));
console.error("windows sandbox failed: CreateProcessAsUserW failed: spawn setup refresh");
process.exit(1);
`,
  );
  fs.chmodSync(executablePath, 0o755);
  return { binDir, logPath };
}

function lateFailingCodexSandboxFixture(cwd) {
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-late-failing-codex-bin-"));
  const logPath = path.join(cwd, ".git", "late-failing-codex-sandbox.jsonl");
  const executablePath = path.join(binDir, "codex");
  fs.writeFileSync(
    executablePath,
    `#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const args = process.argv.slice(2);
const separator = args.indexOf("--");
const command = args.slice(separator + 1);
fs.appendFileSync(${JSON.stringify(logPath)}, JSON.stringify(command) + "\\n");
if (path.basename(command[0]).startsWith("node") && command[1] === "-e" && command[2] === "process.exit(0)") process.exit(0);
console.error("bwrap: loopback: Failed RTM_NEWADDR: Operation not permitted");
process.exit(1);
`,
  );
  fs.chmodSync(executablePath, 0o755);
  return { binDir, logPath };
}

function fakeGoFixture(cwd, { downloadFailures = 0, failureMessage = "" } = {}) {
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-fake-go-bin-"));
  const logPath = path.join(cwd, ".git", "fake-go.log");
  const attemptsPath = path.join(cwd, ".git", "fake-go-attempts");
  const executablePath = path.join(binDir, "go");
  fs.writeFileSync(
    executablePath,
    `#!/usr/bin/env node
const fs = require("node:fs");
const args = process.argv.slice(2);
fs.appendFileSync(${JSON.stringify(logPath)}, args.join(" ") + "\\n");
if (args.join(" ") === "mod download all") {
  const attempts = fs.existsSync(${JSON.stringify(attemptsPath)})
    ? Number(fs.readFileSync(${JSON.stringify(attemptsPath)}, "utf8"))
    : 0;
  fs.writeFileSync(${JSON.stringify(attemptsPath)}, String(attempts + 1));
  if (attempts < ${JSON.stringify(downloadFailures)}) {
    console.error(${JSON.stringify(failureMessage)});
    process.exit(1);
  }
}
`,
  );
  fs.chmodSync(executablePath, 0o755);
  return { binDir, logPath };
}

function fakeDotnetFixture(cwd, { createBuildOutputs = false } = {}) {
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-fake-dotnet-bin-"));
  const logPath = path.join(cwd, ".git", "fake-dotnet.log");
  const executablePath = path.join(binDir, "dotnet");
  fs.writeFileSync(
    executablePath,
    `#!/usr/bin/env node
const fs = require("node:fs");
fs.appendFileSync(${JSON.stringify(logPath)}, process.argv.slice(2).join(" ") + "\\n");
if (${JSON.stringify(createBuildOutputs)} && ["build", "restore", "test"].includes(process.argv[2])) {
  fs.mkdirSync("bin", { recursive: true });
  fs.mkdirSync("obj", { recursive: true });
  fs.writeFileSync("bin/App.dll", "changed-bin\\n");
  fs.writeFileSync("bin/new.dll", "new\\n");
  fs.writeFileSync("obj/project.assets.json", "changed-obj\\n");
}
`,
  );
  fs.chmodSync(executablePath, 0o755);
  return { binDir, logPath };
}

function fakeMakeFixture(cwd, { createToolsOutput = false } = {}) {
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-fake-make-bin-"));
  const logPath = path.join(cwd, ".git", "fake-make.log");
  const executablePath = path.join(binDir, "make");
  fs.writeFileSync(
    executablePath,
    `#!/usr/bin/env node
const fs = require("node:fs");
const args = process.argv.slice(2);
fs.appendFileSync(${JSON.stringify(logPath)}, args.join(" ") + "\\n");
if (${JSON.stringify(createToolsOutput)} && args.includes("tools")) {
  fs.mkdirSync("bin", { recursive: true });
  fs.writeFileSync("bin/linter", "trusted\\n");
}
`,
  );
  fs.chmodSync(executablePath, 0o755);
  return { binDir, logPath };
}

function restoreEnv(key, previous) {
  if (previous === undefined) delete process.env[key];
  else process.env[key] = previous;
}

function assertExternalValidationPath(cwd, value, suffix) {
  const absolutePath = path.resolve(String(value));
  const relative = path.relative(path.resolve(cwd), absolutePath);
  assert.ok(
    relative === ".." || relative.startsWith(`..${path.sep}`),
    `expected validation path outside checkout, got ${absolutePath}`,
  );
  assert.equal(path.basename(absolutePath), suffix);
}

function withTemporaryEnv(values, callback) {
  const previous = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
  try {
    for (const [key, value] of Object.entries(values)) process.env[key] = String(value);
    return callback();
  } finally {
    for (const [key, value] of Object.entries(previous)) restoreEnv(key, value);
  }
}

function withPathPrefix(binDir, callback) {
  const previousPath = process.env.PATH;
  process.env.PATH = [binDir, previousPath].filter(Boolean).join(path.delimiter);
  try {
    callback();
  } finally {
    if (previousPath === undefined) delete process.env.PATH;
    else process.env.PATH = previousPath;
  }
}

function clawhubToolchain() {
  return {
    toolchain: {
      packageManager: "bun",
      packageManagerExplicit: true,
      baseValidationCommands: ["bun run check"],
      changedGate: null,
      requiresFullHistory: false,
      executionRunner: null,
      baseBranch: null,
    },
  };
}

function gitPackageFixture(scripts) {
  const cwd = packageFixture(scripts);
  fs.writeFileSync(
    path.join(cwd, "pnpm-lock.yaml"),
    "lockfileVersion: '9.0'\n\nsettings:\n  autoInstallPeers: true\n  excludeLinksFromLockfile: false\n\nimporters:\n\n  .: {}\n",
  );
  git(cwd, "init", "-b", "main");
  git(cwd, "config", "user.email", "clawsweeper@example.invalid");
  git(cwd, "config", "user.name", "ClawSweeper Test");
  return cwd;
}

function shallowGitFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-shallow-"));
  const source = path.join(root, "source");
  const origin = path.join(root, "origin.git");
  const checkout = path.join(root, "checkout");
  fs.mkdirSync(source);
  git(source, "init", "-b", "main");
  git(source, "config", "user.email", "clawsweeper@example.invalid");
  git(source, "config", "user.name", "ClawSweeper Test");
  fs.writeFileSync(path.join(source, "history.txt"), "first\n");
  git(source, "add", ".");
  git(source, "commit", "-m", "first");
  fs.appendFileSync(path.join(source, "history.txt"), "second\n");
  git(source, "commit", "-am", "second");
  git(root, "init", "--bare", origin);
  git(source, "remote", "add", "origin", origin);
  git(source, "push", "origin", "main:main");
  git(origin, "symbolic-ref", "HEAD", "refs/heads/main");
  execFileSync("git", ["clone", "--depth=1", `file://${origin}`, checkout], {
    encoding: "utf8",
  });
  return checkout;
}

function attachOrigin(cwd) {
  const origin = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-origin-"));
  git(origin, "init", "--bare");
  git(cwd, "remote", "add", "origin", origin);
  git(cwd, "push", "-u", "origin", "main:main");
  git(origin, "symbolic-ref", "HEAD", "refs/heads/main");
  return origin;
}

function git(cwd, ...args) {
  return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
}

function captureWarnings(callback) {
  const originalWarn = console.warn;
  const warnings = [];
  console.warn = (message) => {
    warnings.push(String(message));
  };
  try {
    callback();
    return warnings;
  } finally {
    console.warn = originalWarn;
  }
}

function validationOptions(targetRepo, extra = {}) {
  return {
    allowExpensiveValidation: false,
    installTargetDeps: false,
    sandboxTargetCommands: false,
    strictTargetValidation: false,
    targetRepo,
    ...extra,
  };
}
