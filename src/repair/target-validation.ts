import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { runCommand as run } from "./command-runner.js";
import {
  ensureFullHistory,
  ensureMergeBaseAvailable,
  gitChangedFiles,
  gitLsFiles,
  isAncestor,
} from "./git-repo-utils.js";
import { parsePullRequestUrl } from "./github-ref.js";
import type { JsonValue, LooseRecord } from "./json-types.js";
import {
  resolveTargetRepoToolchain,
  type TargetChangedGate,
  type TargetRepoToolchain,
} from "./target-toolchain-config.js";
import { compactText } from "./text-utils.js";
import { sleepMs } from "./timing.js";
import {
  isExpensivePnpmValidation,
  isTestFile,
  looksLikePathArgument,
  packageScriptRequirement,
  parseAllowedValidationCommand,
  renderValidationCommand,
  stripEnvPrefix,
  uniqueStrings,
} from "./validation-command-utils.js";

const DEFAULT_BASE_BRANCH = "main";
const DEFAULT_TARGET_PNPM_SPEC = "pnpm@10.33.2";
const DEFAULT_TARGET_SETUP_TIMEOUT_MS = 2 * 60 * 1000;
const DEFAULT_TARGET_INSTALL_TIMEOUT_MS = 12 * 60 * 1000;
const DEFAULT_TARGET_VALIDATION_TIMEOUT_MS = 12 * 60 * 1000;
const DEFAULT_TARGET_SNAPSHOT_MAX_BYTES = 256 * 1024 * 1024;
const DEFAULT_TARGET_SNAPSHOT_MAX_FILES = 10_000;
const MAX_REPOSITORY_DEFINITION_BYTES = 4 * 1024 * 1024;
const MAKEFILE_NAMES = ["GNUmakefile", "makefile", "Makefile"] as const;
const TARGET_SANDBOX_PROFILE = "clawsweeper-target";
const JAVASCRIPT_VALIDATION_EXTENSIONS = [
  ".js",
  ".cjs",
  ".mjs",
  ".jsx",
  ".ts",
  ".cts",
  ".mts",
  ".tsx",
] as const;
const PACKAGE_DEPENDENCY_EXECUTABLES = [
  "ava",
  "biome",
  "bun",
  "corepack",
  "eslint",
  "jest",
  "mocha",
  "node",
  "node.exe",
  "npm",
  "npx",
  "oxlint",
  "pnpm",
  "ts-node",
  "tsc",
  "tsx",
  "vite",
  "vitest",
] as const;

type TargetValidationState = {
  cacheRoot: string;
  packageDependencyBaseSha: string | null;
  packageDependencyFingerprint: string | null;
  packageDependencyVerificationRequired: boolean;
  preparedIgnoredEntries: string[];
  preparedStateStale: boolean;
  trustedIgnoredEntries: string[];
};

type DotnetRestoreSpec = {
  args: string[];
  target: string;
};

const targetValidationStates = new Map<string, TargetValidationState>();

process.once("exit", () => {
  for (const state of targetValidationStates.values()) {
    fs.rmSync(state.cacheRoot, { recursive: true, force: true });
  }
});

export type TargetValidationOptions = {
  additionalValidationCommands?: string[];
  allowExpensiveValidation: boolean;
  installTimeoutMs?: number;
  installTargetDeps: boolean;
  sandboxTargetCommands?: boolean;
  requireTrustedValidationBaseline?: boolean;
  skipOpenClawChangedGate?: boolean;
  strictTargetValidation: boolean;
  targetRepo: string;
  setupTimeoutMs?: number;
  validationTimeoutMs?: number;
  /**
   * Optional override of the per-repo toolchain (package manager, base validation
   * commands, changed gate). If omitted, it is resolved from
   * config/target-repositories.json via `resolveTargetRepoToolchain(targetRepo)`.
   * Tests inject this directly to avoid touching the config file.
   */
  toolchain?: TargetRepoToolchain;
};

export type RepairDeltaValidationPlan = {
  commands: string[];
  options: TargetValidationOptions;
  scope: "changed-surface" | "repair-delta-docs";
  changed_files: string[];
  reason: string;
};

type TargetCommittableSnapshot = {
  allowNewIgnored: boolean;
  allowedMutationPaths: Set<string>;
  backupDir: string;
  backups: Map<string, string>;
  ignoredEntries: Set<string>;
  indexBackup: string | null;
  indexFingerprint: string;
  state: Map<string, string>;
  trackedPaths: Set<string>;
};

export function prepareTargetToolchain(
  cwd: string,
  options: TargetValidationOptions,
  {
    allowLifecycleScripts = false,
    reuseExistingInstall = false,
  }: { allowLifecycleScripts?: boolean; reuseExistingInstall?: boolean } = {},
) {
  const toolchain = getToolchain(options);
  if (toolchain.requiresFullHistory) ensureFullHistory(cwd);
  if (!options.installTargetDeps) return;
  const packageJsonText = readRepositoryRegularFile(path.join(cwd, "package.json"), "utf8");
  if (packageJsonText == null) return;
  const packageJson = JSON.parse(packageJsonText);
  const packageManager = targetPackageManager(cwd, toolchain);
  if (!packageManager) {
    throw new Error("validation_package_manager_unsupported: unsupported target package manager");
  }
  const validationEnv = targetValidationEnv(cwd);
  const setupTimeoutMs = targetValidationTimeoutMs(
    "CLAWSWEEPER_TARGET_SETUP_TIMEOUT_MS",
    options.setupTimeoutMs ?? DEFAULT_TARGET_SETUP_TIMEOUT_MS,
    options.setupTimeoutMs,
  );
  const installTimeoutMs = targetValidationTimeoutMs(
    "CLAWSWEEPER_TARGET_INSTALL_TIMEOUT_MS",
    options.installTimeoutMs ?? DEFAULT_TARGET_INSTALL_TIMEOUT_MS,
    options.installTimeoutMs,
  );
  const sandboxHome =
    options.sandboxTargetCommands === false ? null : createTargetValidationSandboxHome(cwd, true);
  const runSetup = (
    executable: string,
    args: string[],
    timeoutMs: number,
    commandEnv: NodeJS.ProcessEnv = validationEnv,
  ) =>
    runTargetSandboxCommand([executable, ...args], {
      cwd,
      env: commandEnv,
      sandboxHome,
      timeoutMs,
    });
  try {
    assertTargetSandboxAvailable({
      cwd,
      env: validationEnv,
      sandboxHome,
      timeoutMs: setupTimeoutMs,
    });
    runSetup(
      "node",
      [
        "-e",
        "const major = Number(process.versions.node.split('.')[0]); if (major < 22) { console.error(`Node ${process.version} is too old for target validation`); process.exit(1); }",
      ],
      setupTimeoutMs,
    );

    if (packageManager === "bun") {
      prepareBunToolchain({
        validationEnv,
        setupTimeoutMs,
        installTimeoutMs,
        allowLifecycleScripts,
        runSetup,
      });
      return;
    }
    if (packageManager === "npm") {
      prepareNpmToolchain({
        cwd,
        installTimeoutMs,
        allowLifecycleScripts,
        reuseExistingInstall,
        runSetup,
      });
      return;
    }
    preparePnpmToolchain({
      cwd,
      packageJson,
      setupTimeoutMs,
      installTimeoutMs,
      allowLifecycleScripts,
      runSetup,
    });
  } finally {
    if (sandboxHome) fs.rmSync(sandboxHome, { recursive: true, force: true });
  }
}

export function prepareTrustedTargetDependencies(
  cwd: string,
  options: TargetValidationOptions,
  baseBranch: string = DEFAULT_BASE_BRANCH,
  validationCommands: LooseRecord[] = [],
) {
  if (getToolchain(options).requiresFullHistory) ensureFullHistory(cwd);
  if (!options.installTargetDeps) return;
  resetStalePreparedTargetState(cwd);
  const head = run("git", ["rev-parse", "HEAD"], { cwd }).trim();
  const base = run("git", ["rev-parse", `origin/${baseBranch}`], { cwd }).trim();
  if (head !== base) return;

  const ignoredBeforePreparation = ignoredRepositoryEntries(cwd);
  const validationEnv = targetValidationEnv(cwd);
  const requiredCommands = requiredValidationCommands(validationCommands, cwd, options);
  const preparePackageDependencies =
    getToolchain(options).preparePackageDependencies === true ||
    validationCommandsUsePackageToolchain(requiredCommands, cwd);
  const prepareGoDependencies = validationCommandsUseGoToolchain(requiredCommands, cwd);
  const installTimeoutMs = targetValidationTimeoutMs(
    "CLAWSWEEPER_TARGET_INSTALL_TIMEOUT_MS",
    options.installTimeoutMs ?? DEFAULT_TARGET_INSTALL_TIMEOUT_MS,
    options.installTimeoutMs,
  );
  const before = captureTargetCommittableSnapshot(cwd, [], true);
  const sandboxHome =
    options.sandboxTargetCommands === false ? null : createTargetValidationSandboxHome(cwd, true);
  let prepareError: Error | null = null;
  try {
    assertTargetSandboxAvailable({
      cwd,
      env: validationEnv,
      sandboxHome,
      timeoutMs: installTimeoutMs,
    });
    if (preparePackageDependencies) {
      prepareTargetToolchain(cwd, options, { allowLifecycleScripts: true });
      removeIgnoredPackageLifecycleOutputs(cwd, ignoredBeforePreparation);
    }
    if (prepareGoDependencies && fs.existsSync(path.join(cwd, "go.mod"))) {
      runTargetSandboxCommand(["go", "version"], {
        cwd,
        env: validationEnv,
        sandboxHome,
        timeoutMs: installTimeoutMs,
      });
      prepareGoModules({
        cwd,
        env: validationEnv,
        sandboxHome,
        timeoutMs: installTimeoutMs,
      });
    }
    for (const target of trustedMakePreparationTargets(cwd, options, requiredCommands)) {
      runTargetSandboxCommand(["make", target], {
        cwd,
        env: validationEnv,
        sandboxHome,
        timeoutMs: installTimeoutMs,
      });
    }
    for (const spec of dotnetRestoreSpecs(cwd, getToolchain(options), requiredCommands)) {
      runTargetSandboxCommand(
        [
          "dotnet",
          "restore",
          spec.target,
          ...spec.args,
          "--packages",
          targetValidationCachePath(cwd, "nuget"),
        ],
        {
          cwd,
          env: validationEnv,
          sandboxHome,
          timeoutMs: installTimeoutMs,
        },
      );
      markDotnetTargetPrepared(cwd, spec);
    }
  } catch (error) {
    prepareError = error instanceof Error ? error : new Error(String(error));
  } finally {
    try {
      assertTargetCommittableStateUnchanged(cwd, before, "validation_setup_side_effect_detected");
    } finally {
      if (sandboxHome) fs.rmSync(sandboxHome, { recursive: true, force: true });
    }
  }
  if (prepareError) {
    throw new Error(`validation_dependency_prepare_failed: ${prepareError.message}`);
  }
  const state = targetValidationState(cwd);
  state.preparedIgnoredEntries = [...ignoredRepositoryEntries(cwd)].filter(
    (relativePath) =>
      !ignoredBeforePreparation.has(relativePath) && !isPackageDependencyPath(cwd, relativePath),
  );
  state.trustedIgnoredEntries = [...ignoredBeforePreparation];
  if (preparePackageDependencies) {
    clearMutablePackageValidationCaches(cwd);
    state.packageDependencyBaseSha = base;
    state.packageDependencyFingerprint = packageDependencyStateFingerprint(cwd);
    state.packageDependencyVerificationRequired = true;
  }
}

export function invalidatePreparedTargetDependencies(cwd: string) {
  let key: string;
  try {
    key = fs.realpathSync(cwd);
  } catch {
    return;
  }
  const state = targetValidationStates.get(key);
  if (!state) return;
  state.packageDependencyVerificationRequired = true;
  state.preparedStateStale = true;
}

export function invalidatePreparedPackageDependencyVerification(cwd: string) {
  let key: string;
  try {
    key = fs.realpathSync(cwd);
  } catch {
    return;
  }
  const state = targetValidationStates.get(key);
  if (state) state.packageDependencyVerificationRequired = true;
}

function resetStalePreparedTargetState(cwd: string) {
  const state = targetValidationState(cwd);
  if (!state.preparedStateStale) return;
  const trustedIgnoredEntries = new Set(state.trustedIgnoredEntries);
  const ignoredEntriesToRemove = uniqueStrings([
    ...state.preparedIgnoredEntries,
    ...[...ignoredRepositoryEntries(cwd)].filter(
      (relativePath) => !trustedIgnoredEntries.has(relativePath),
    ),
  ]);
  for (const relativePath of ignoredEntriesToRemove) {
    fs.rmSync(safeTargetPath(cwd, relativePath), { recursive: true, force: true });
  }
  for (const packageRoot of targetPackageRoots(cwd)) {
    const nodeModules =
      packageRoot === "." ? "node_modules" : `${packageRoot.replace(/\/+$/, "")}/node_modules`;
    fs.rmSync(safeTargetPath(cwd, nodeModules), { recursive: true, force: true });
  }
  for (const entry of fs.readdirSync(state.cacheRoot)) {
    fs.rmSync(path.join(state.cacheRoot, entry), { recursive: true, force: true });
  }
  state.packageDependencyBaseSha = null;
  state.packageDependencyFingerprint = null;
  state.packageDependencyVerificationRequired = true;
  state.preparedIgnoredEntries = [];
  state.preparedStateStale = false;
  state.trustedIgnoredEntries = [];
}

function isPackageDependencyPath(cwd: string, relativePath: string) {
  return targetPackageRoots(cwd).some((packageRoot) => {
    const nodeModules =
      packageRoot === "." ? "node_modules" : `${packageRoot.replace(/\/+$/, "")}/node_modules`;
    return relativePath === nodeModules || relativePath.startsWith(`${nodeModules}/`);
  });
}

export function prepareBranchTargetDependencies(
  cwd: string,
  options: TargetValidationOptions,
  baseBranch: string = DEFAULT_BASE_BRANCH,
  validationCommands: LooseRecord[] = [],
) {
  if (getToolchain(options).requiresFullHistory) ensureFullHistory(cwd);
  const requiredCommands = requiredValidationCommands(validationCommands, cwd, options);
  assertTrustedValidationDefinitions(cwd, baseBranch, requiredCommands);
  const preparePackageDependencies =
    getToolchain(options).preparePackageDependencies === true ||
    validationCommandsUsePackageToolchain(requiredCommands, cwd);
  const prepareGoDependencies = validationCommandsUseGoToolchain(requiredCommands, cwd);
  if (preparePackageDependencies) {
    assertTrustedDependencyPreparationDefinitions(cwd, baseBranch, getToolchain(options));
  }
  if (prepareGoDependencies) {
    assertTrustedGoDependencyDefinitions(cwd, baseBranch);
  }
  if (!options.installTargetDeps) return;
  if (preparePackageDependencies) {
    clearMutablePackageValidationCaches(cwd);
    assertPreparedPackageDependencyState(cwd, baseBranch);
  }
  const validationEnv = targetValidationEnv(cwd);
  const installTimeoutMs = targetValidationTimeoutMs(
    "CLAWSWEEPER_TARGET_INSTALL_TIMEOUT_MS",
    options.installTimeoutMs ?? DEFAULT_TARGET_INSTALL_TIMEOUT_MS,
    options.installTimeoutMs,
  );
  const before = captureTargetCommittableSnapshot(cwd, [], true);
  const sandboxHome =
    options.sandboxTargetCommands === false ? null : createTargetValidationSandboxHome(cwd);
  let prepareError: Error | null = null;
  try {
    assertTargetSandboxAvailable({
      cwd,
      env: validationEnv,
      sandboxHome,
      timeoutMs: installTimeoutMs,
    });
    const dotnetSpecs = dotnetRestoreSpecs(cwd, getToolchain(options), requiredCommands);
    for (const spec of dotnetSpecs) {
      if (isDotnetTargetPrepared(cwd, spec)) continue;
      throw new Error(
        `validation_definition_changed: .NET restore inputs for ${spec.target} differ from origin/${baseBranch}`,
      );
    }
    if (dotnetSpecs.length > 0) {
      removeDotnetIntermediateState(cwd);
      for (const spec of dotnetSpecs) {
        runTargetSandboxCommand(
          [
            "dotnet",
            "restore",
            spec.target,
            ...spec.args,
            "--packages",
            targetValidationCachePath(cwd, "nuget"),
          ],
          {
            cwd,
            env: validationEnv,
            sandboxHome,
            timeoutMs: installTimeoutMs,
          },
        );
      }
    }
  } catch (error) {
    prepareError = error instanceof Error ? error : new Error(String(error));
  } finally {
    try {
      assertTargetCommittableStateUnchanged(cwd, before, "validation_setup_side_effect_detected");
    } finally {
      if (sandboxHome) fs.rmSync(sandboxHome, { recursive: true, force: true });
    }
  }
  if (prepareError) {
    throw new Error(`validation_dependency_prepare_failed: ${prepareError.message}`);
  }
}

function prepareGoModules({
  cwd,
  env,
  sandboxHome,
  timeoutMs,
}: {
  cwd: string;
  env: NodeJS.ProcessEnv;
  sandboxHome: string | null;
  timeoutMs: number;
}) {
  const attempts = 3;
  const configuredDelayMs = Number.parseInt(
    process.env.CLAWSWEEPER_GO_DEPENDENCY_RETRY_DELAY_MS ?? "1000",
    10,
  );
  const baseDelayMs = Number.isFinite(configuredDelayMs) ? Math.max(0, configuredDelayMs) : 1000;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      runTargetSandboxCommand(["go", "mod", "download", "all"], {
        cwd,
        env,
        sandboxHome,
        timeoutMs,
      });
      return;
    } catch (error) {
      if (attempt === attempts || !isTransientGoDependencyError(error)) throw error;
      sleepMs(baseDelayMs * 2 ** (attempt - 1));
    }
  }
}

function isTransientGoDependencyError(error: unknown) {
  return /\b(?:429|500|502|503|504|ECONNRESET|ECONNREFUSED|ETIMEDOUT|EAI_AGAIN)\b|connection reset|connection refused|unexpected EOF|i\/o timeout|network is unreachable|proxyconnect tcp|TLS handshake timeout|stream error|temporar(?:y|ily)|timeout/i.test(
    String(error instanceof Error ? error.message : error),
  );
}

function preparePnpmToolchain({
  cwd,
  packageJson,
  setupTimeoutMs,
  installTimeoutMs,
  allowLifecycleScripts,
  runSetup,
}: {
  cwd: string;
  packageJson: LooseRecord;
  setupTimeoutMs: number;
  installTimeoutMs: number;
  allowLifecycleScripts: boolean;
  runSetup: (
    executable: string,
    args: string[],
    timeoutMs: number,
    commandEnv?: NodeJS.ProcessEnv,
  ) => void;
}) {
  const declaredPackageManager = String(packageJson.packageManager ?? "");
  const packageManager = /^pnpm@\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(declaredPackageManager)
    ? declaredPackageManager
    : DEFAULT_TARGET_PNPM_SPEC;
  runSetup("corepack", ["prepare", packageManager, "--activate"], setupTimeoutMs);
  const corepackBin = targetValidationCachePath(cwd, "corepack-bin");
  runSetup("corepack", ["enable", "--install-directory", corepackBin, "pnpm"], setupTimeoutMs);
  const installArgs = [
    "install",
    "--frozen-lockfile",
    "--prefer-offline",
    "--config.engine-strict=false",
    ...(allowLifecycleScripts ? [] : ["--ignore-scripts", "--config.ignore-pnpmfile=true"]),
  ];
  runSetup("corepack", [packageManager, ...installArgs], installTimeoutMs);
}

function prepareBunToolchain({
  validationEnv,
  setupTimeoutMs,
  installTimeoutMs,
  allowLifecycleScripts,
  runSetup,
}: {
  validationEnv: NodeJS.ProcessEnv;
  setupTimeoutMs: number;
  installTimeoutMs: number;
  allowLifecycleScripts: boolean;
  runSetup: (
    executable: string,
    args: string[],
    timeoutMs: number,
    commandEnv?: NodeJS.ProcessEnv,
  ) => void;
}) {
  // The repair execution workflow provisions pinned Bun before this path runs.
  // Keep a clear fail-fast probe so local/manual runners surface setup gaps early.
  //
  // ClawSweeper itself runs under pnpm (e.g. `pnpm run repair:execute-fix`), so
  // process.env carries pnpm-injected `npm_config_user_agent=pnpm/...`. When we
  // shell out to `bun install`. Strip caller identity/lifecycle metadata from
  // pnpm. Non-secret npm-compatible registry, proxy, and cache settings remain
  // available after the shared target environment removes credentials.
  const bunEnv = sanitizeEnvForBun(validationEnv);
  const bunRunSetup = (args: string[], timeoutMs: number) =>
    runSetup("bun", args, timeoutMs, bunEnv);
  bunRunSetup(["--version"], setupTimeoutMs);
  const installArgs = [
    "install",
    "--frozen-lockfile",
    ...(allowLifecycleScripts ? [] : ["--ignore-scripts"]),
  ];
  bunRunSetup(installArgs, installTimeoutMs);
}

function sanitizeEnvForBun(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const out: NodeJS.ProcessEnv = {};
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) continue;
    if (shouldStripBunInstallEnv(key)) continue;
    out[key] = value;
  }
  // Keep subprocess metadata consistent even though lifecycle scripts are
  // disabled; bun may still inspect npm-compatible package-manager metadata.
  out.npm_config_user_agent = `bun/unknown npm/? node/${process.versions.node} ${process.platform} ${process.arch}`;
  return out;
}

function shouldStripBunInstallEnv(key: string): boolean {
  return (
    /^PNPM_/i.test(key) ||
    /^npm_config_user_agent$/i.test(key) ||
    /^npm_execpath$/i.test(key) ||
    /^npm_node_execpath$/i.test(key) ||
    /^npm_lifecycle_/i.test(key) ||
    /^npm_package_/i.test(key)
  );
}

function prepareNpmToolchain({
  cwd,
  installTimeoutMs,
  allowLifecycleScripts,
  reuseExistingInstall,
  runSetup,
}: {
  cwd: string;
  installTimeoutMs: number;
  allowLifecycleScripts: boolean;
  reuseExistingInstall: boolean;
  runSetup: (
    executable: string,
    args: string[],
    timeoutMs: number,
    commandEnv?: NodeJS.ProcessEnv,
  ) => void;
}) {
  const hasPackageLock = ["package-lock.json", "npm-shrinkwrap.json"].some((name) =>
    fs.existsSync(path.join(cwd, name)),
  );
  const installCommand = hasPackageLock && !reuseExistingInstall ? "ci" : "install";
  const installArgs = [
    installCommand,
    ...(installCommand === "install" ? ["--no-save"] : []),
    ...(installCommand === "install" && !hasPackageLock ? ["--package-lock=false"] : []),
    ...(reuseExistingInstall ? ["--offline"] : []),
    ...(allowLifecycleScripts ? [] : ["--ignore-scripts"]),
  ];
  runSetup("npm", installArgs, installTimeoutMs);
}

export function runAllowedValidationCommands(
  commands: LooseRecord[],
  cwd: string,
  options: TargetValidationOptions,
  baseBranch: string = DEFAULT_BASE_BRANCH,
) {
  const required = requiredValidationCommands(commands, cwd, options);
  if (required.length === 0) {
    throw new Error(
      "validation_command_missing: no configured or repository-native validation command is available",
    );
  }
  ensureMergeBaseAvailable({ targetDir: cwd, baseBranch, fetchBase: false });
  const validationRunDir = createTargetValidationRunDirectory(cwd);
  const validationTimeoutMs = targetValidationTimeoutMs(
    "CLAWSWEEPER_TARGET_VALIDATION_TIMEOUT_MS",
    options.validationTimeoutMs ?? DEFAULT_TARGET_VALIDATION_TIMEOUT_MS,
    options.validationTimeoutMs,
  );
  const executed: string[] = [];
  const attempts = new Map<string, number>();
  let sandboxHome: string | null = null;
  try {
    const validationEnv = targetValidationEnv(cwd, validationRunDir);
    sandboxHome =
      options.sandboxTargetCommands === false
        ? null
        : createTargetValidationSandboxHome(cwd, false, validationRunDir);
    assertTargetSandboxAvailable({
      cwd,
      env: validationEnv,
      sandboxHome,
      timeoutMs: validationTimeoutMs,
    });
    for (const command of required) {
      const resolvedCommands = resolveAllowedValidationCommands(command, cwd, baseBranch, options);
      for (const parts of resolvedCommands) {
        const rendered = renderValidationCommand(parts);
        if (executed.includes(rendered)) continue;
        while (true) {
          try {
            runTargetValidationCommand(parts, {
              cwd,
              env: validationEnv,
              sandboxHome,
              timeoutMs: validationTimeoutMs,
            });
            executed.push(rendered);
            break;
          } catch (error) {
            if (/validation_side_effect_detected/i.test(String(error?.message ?? error))) {
              throw error;
            }
            const fallbackCommands = validationFallbackCommands({
              parts,
              error,
              cwd,
              baseBranch,
              options,
            });
            if (fallbackCommands.length > 0) {
              for (const fallbackParts of fallbackCommands) {
                const fallbackRendered = renderValidationCommand(fallbackParts);
                if (executed.includes(fallbackRendered)) continue;
                runTargetValidationCommand(fallbackParts, {
                  cwd,
                  env: validationEnv,
                  sandboxHome,
                  timeoutMs: validationTimeoutMs,
                });
                executed.push(fallbackRendered);
              }
              break;
            }
            if (shouldRetryValidationCommand({ parts, error, attempts, options })) continue;
            throw new Error(
              `validation command failed (${rendered}): ${compactText(error.message, 12000)}`,
            );
          }
        }
      }
    }
  } finally {
    if (sandboxHome) fs.rmSync(sandboxHome, { recursive: true, force: true });
    fs.rmSync(validationRunDir, { recursive: true, force: true });
  }
  return executed;
}

export function preflightTargetValidationPlan(
  { fixArtifact, targetDir, baseBranch = DEFAULT_BASE_BRANCH }: LooseRecord,
  options: TargetValidationOptions,
) {
  const scripts = readPackageScriptSet(targetDir);
  const availableScripts = [...scripts].sort();
  const resolved: string[] = [];
  const requiredScripts: LooseRecord[] = [];
  for (const command of requiredValidationCommands(
    fixArtifact.validation_commands ?? [],
    targetDir,
    options,
  )) {
    const resolvedCommands = resolveAllowedValidationCommands(
      command,
      targetDir,
      baseBranch,
      options,
    );
    for (const parts of resolvedCommands) {
      const rendered = renderValidationCommand(parts);
      if (!resolved.includes(rendered)) resolved.push(rendered);
      const script = packageScriptRequirement(parts);
      if (script) requiredScripts.push(script);
    }
  }

  if (resolved.length === 0) {
    return {
      status: "deferred",
      code: "validation_command_deferred",
      available_scripts: availableScripts,
      target_branch: fixArtifact.branch ?? fixArtifact.head_branch ?? null,
      resolved_commands: resolved,
      reason: "validation commands will be inferred from the checked-out repair branch",
    };
  }

  const missing = requiredScripts.find((script: JsonValue) => !scripts.has(script.name));
  if (!missing) {
    return {
      status: "passed",
      resolved_commands: resolved,
      available_scripts: availableScripts,
    };
  }

  const sourcePr =
    (fixArtifact.source_prs ?? []).find(
      (source: JsonValue) => parsePullRequestUrl(source)?.repo === options.targetRepo,
    ) ?? null;
  return {
    status: "blocked",
    code: "validation_script_missing",
    required: missing.command,
    missing_script: missing.name,
    available_scripts: availableScripts,
    target_branch: fixArtifact.branch ?? fixArtifact.head_branch ?? null,
    source_pr: sourcePr,
    resolved_commands: resolved,
    reason: `validation_script_missing: required ${missing.command} is unavailable in target checkout`,
  };
}

export function requiredValidationCommands(
  commands: LooseRecord[] | undefined,
  cwd: string,
  options: TargetValidationOptions,
) {
  const toolchain = getToolchain(options);
  const replacementCommands = [
    ...(options.additionalValidationCommands ?? []),
    ...toolchain.baseValidationCommands,
  ];
  const sanitized = sanitizeStaleChangedGateCommands(commands ?? [], toolchain);
  const out = [...sanitized, ...replacementCommands];
  const gate = toolchain.changedGate;
  if (gate && !options.skipOpenClawChangedGate && requiresChangedGate(cwd, toolchain)) {
    out.push(gate.command);
  }
  const required = uniqueStrings(out);
  const inferred = inferTargetValidationCommands(cwd, toolchain);
  if (isGenericTargetToolchain(toolchain)) {
    if (options.requireTrustedValidationBaseline && required.length === 0) return [];
    const unambiguousRequired = required.filter(
      (command) => !isAmbiguousImplicitDotnetCommand(command, cwd),
    );
    return uniqueStrings([
      ...unambiguousRequired,
      ...inferred.filter(
        (command) =>
          !unambiguousRequired.some((requiredCommand) =>
            validationCommandCovers(requiredCommand, command, cwd),
          ),
      ),
    ]);
  }
  return required.length > 0 ? required : inferred;
}

function isGenericTargetToolchain(toolchain: TargetRepoToolchain) {
  return (
    !toolchain.packageManagerExplicit &&
    toolchain.baseValidationCommands.length === 0 &&
    toolchain.changedGate == null
  );
}

function validationCommandCovers(required: string, inferred: string, cwd: string) {
  if (required === inferred) return true;
  try {
    const requiredParts = stripEnvPrefix(parseAllowedValidationCommand(required));
    const inferredParts = stripEnvPrefix(parseAllowedValidationCommand(inferred));
    return (
      requiredParts[0] === "dotnet" &&
      requiredParts[1] === "test" &&
      inferredParts[0] === "dotnet" &&
      inferredParts[1] === "test" &&
      dotnetCommandTarget(requiredParts, cwd) === "." &&
      rootDotnetTargets(cwd).length <= 1
    );
  } catch {
    return false;
  }
}

function isAmbiguousImplicitDotnetCommand(command: string, cwd: string) {
  if (rootDotnetTargets(cwd).length <= 1) return false;
  try {
    const parts = stripEnvPrefix(parseAllowedValidationCommand(command));
    return parts[0] === "dotnet" && parts[1] === "test" && dotnetCommandTarget(parts, cwd) === ".";
  } catch {
    return false;
  }
}

/**
 * Drop validation commands that look like "some other repo's changed gate"
 * when the current target repo does not have one. This protects against stale
 * fixArtifacts (most notably deterministic automerge artifacts authored before
 * per-repo toolchain config landed) that ship `pnpm check:changed` for a target
 * with no changed gate. Repository-native inference replaces the stale command
 * when no configured validation remains.
 *
 * We are deliberately conservative: we only drop commands that match the
 * fingerprint of a known changed-gate command and only when the active
 * toolchain has no gate of its own. Other unrelated commands are passed
 * through untouched so `validation_script_missing` still fires for genuinely
 * missing scripts (e.g. a typo'd `pnpm test:repair-typo`).
 */
function sanitizeStaleChangedGateCommands(
  commands: readonly LooseRecord[],
  toolchain: TargetRepoToolchain,
): LooseRecord[] {
  if (toolchain.changedGate) return [...commands];
  return commands.filter((command) => !looksLikeStaleChangedGateCommand(command));
}

function looksLikeStaleChangedGateCommand(command: LooseRecord): boolean {
  const text = String(command ?? "").trim();
  if (!text) return false;
  // Matches the canonical openclaw/openclaw changed gate verbatim, with or
  // without a leading `env` wrapper. Kept narrow on purpose so we only
  // discard things we are confident are the stale gate.
  return /^(?:env\s+(?:[A-Za-z_][A-Za-z0-9_]*=\S+\s+)*)?pnpm\s+(?:-s\s+|--silent\s+)?(?:run\s+)?check:changed$/.test(
    text,
  );
}

function inferTargetValidationCommands(cwd: string, toolchain: TargetRepoToolchain): string[] {
  const makefile = findRepositoryRegularFile(cwd, MAKEFILE_NAMES);
  let makeTargets: string[] = [];
  if (makefile) {
    const contents = readRepositoryRegularFile(makefile, "utf8") ?? "";
    const hasTarget = (name: string) => new RegExp(`^${name}\\s*:(?![=])`, "m").test(contents);
    makeTargets = inferValidationGateNames(hasTarget, ["ci", "check", "verify"], ["test", "lint"]);
  }

  const inferred: string[] = [];
  if (fs.existsSync(path.join(cwd, "go.mod"))) inferred.push("go test ./...");

  const scripts = readPackageScriptSet(cwd);
  const packageScripts = inferValidationGateNames(
    (name) => scripts.has(name),
    ["check:changed", "check", "validate"],
    ["test", "lint"],
  );
  const packageManager = targetPackageManager(cwd, toolchain);
  if (packageManager) {
    inferred.push(...packageScripts.map((script) => `${packageManager} run ${script}`));
  }

  inferred.push(
    ...rootDotnetTargets(cwd).map((target) => renderValidationCommand(["dotnet", "test", target])),
  );

  inferred.push(...makeTargets.map((target) => `make ${target}`));
  return uniqueStrings(inferred);
}

function inferValidationGateNames(
  hasGate: (name: string) => boolean,
  aggregateGates: string[],
  independentGates: string[],
) {
  const aggregate = aggregateGates.find(hasGate);
  return [...(aggregate ? [aggregate] : []), ...independentGates.filter(hasGate)];
}

function validationCommandsUsePackageToolchain(commands: readonly LooseRecord[], cwd: string) {
  const makefile = findRepositoryRegularFile(cwd, MAKEFILE_NAMES);
  const hasPackageManifest =
    readRepositoryRegularFile(path.join(cwd, "package.json"), "utf8") != null;
  const makeContents = makefile
    ? (readRepositoryRegularFile(makefile, "utf8") ?? "").replace(/\\\r?\n/g, " ")
    : "";
  return commands.some((command) => {
    try {
      const parts = stripEnvPrefix(parseAllowedValidationCommand(command));
      const executable = parts[0];
      if (executable != null && ["bun", "corepack", "npm", "npx", "pnpm"].includes(executable)) {
        return true;
      }
      if (
        hasPackageManifest &&
        executable != null &&
        PACKAGE_DEPENDENCY_EXECUTABLES.includes(
          executable as (typeof PACKAGE_DEPENDENCY_EXECUTABLES)[number],
        )
      ) {
        return true;
      }
      return (
        executable === "make" &&
        parts
          .slice(1)
          .some((target) =>
            makeTargetUsesToolchain(
              makeContents,
              target,
              hasPackageManifest
                ? [...PACKAGE_DEPENDENCY_EXECUTABLES]
                : ["bun", "corepack", "npm", "npx", "pnpm"],
            ),
          )
      );
    } catch {
      return false;
    }
  });
}

function validationCommandsUseGoToolchain(commands: readonly LooseRecord[], cwd: string) {
  const makefile = findRepositoryRegularFile(cwd, MAKEFILE_NAMES);
  const makeContents = makefile
    ? (readRepositoryRegularFile(makefile, "utf8") ?? "").replace(/\\\r?\n/g, " ")
    : "";
  return commands.some((command) => {
    try {
      const parts = stripEnvPrefix(parseAllowedValidationCommand(command));
      return (
        parts[0] === "go" ||
        (parts[0] === "make" &&
          parts.slice(1).some((target) => makeTargetUsesToolchain(makeContents, target, ["go"])))
      );
    } catch {
      return false;
    }
  });
}

function makeTargetUsesToolchain(contents: string, target: string, executables: string[]) {
  const lines = contents.split(/\r?\n/);
  const variables = staticMakeVariables(contents);
  const pending = [target];
  const seen = new Set<string>();
  while (pending.length > 0) {
    const current = pending.shift()!;
    if (seen.has(current)) continue;
    seen.add(current);
    for (let index = 0; index < lines.length; index += 1) {
      const match = lines[index]!.match(/^([A-Za-z0-9_. -]+)\s*:(?![=])([^#]*)/);
      if (!match) continue;
      const targets = match[1]!.trim().split(/\s+/);
      if (!targets.includes(current)) continue;
      const [dependenciesText, ...inlineRecipeParts] = match[2]!.split(";");
      pending.push(
        ...dependenciesText!
          .trim()
          .split(/\s+/)
          .filter((candidate) => /^[A-Za-z0-9_.-]+$/.test(candidate)),
      );
      if (
        inlineRecipeParts.length > 0 &&
        makeRecipeUsesToolchain(inlineRecipeParts.join(";"), executables, variables)
      ) {
        return true;
      }
      for (let recipeIndex = index + 1; recipeIndex < lines.length; recipeIndex += 1) {
        const recipe = lines[recipeIndex]!;
        if (!recipe.startsWith("\t")) break;
        if (makeRecipeUsesToolchain(recipe, executables, variables)) return true;
      }
    }
  }
  return false;
}

function makeRecipeUsesToolchain(
  recipe: string,
  executables: string[],
  variables: Map<string, string>,
) {
  const expanded = expandStaticMakeVariables(recipe, variables);
  const executablePattern = executables.map(escapeRegExp).join("|");
  return new RegExp(`(?:^|[\\s;&|()])[@+-]*(?:${executablePattern})(?=$|[\\s;&|()])`).test(
    expanded,
  );
}

function staticMakeVariables(contents: string) {
  const variables = new Map<string, string>([["CURDIR", "."]]);
  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::=|\?=|=)\s*(.*?)\s*$/);
    if (match) variables.set(match[1]!, match[2]!);
  }
  return variables;
}

function expandStaticMakeVariables(recipe: string, variables: Map<string, string>) {
  let expanded = recipe;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const next = expanded.replace(
      /\$\(([\w]+)\)|\$\{([\w]+)\}/g,
      (match, parenName, braceName) => variables.get(parenName ?? braceName) ?? match,
    );
    if (next === expanded) break;
    expanded = next;
  }
  return expanded;
}

function trustedMakePreparationTargets(
  cwd: string,
  options: TargetValidationOptions,
  validationCommands: LooseRecord[],
) {
  const makefile = findRepositoryRegularFile(cwd, MAKEFILE_NAMES);
  if (!makefile) return [];
  let commands: string[];
  try {
    commands = requiredValidationCommands(validationCommands, cwd, options);
  } catch {
    return [];
  }
  const contents = (readRepositoryRegularFile(makefile, "utf8") ?? "").replace(/\\\r?\n/g, " ");
  const targets = commands.flatMap((command) => {
    try {
      const parts = stripEnvPrefix(parseAllowedValidationCommand(command));
      return parts[0] === "make" ? parts.slice(1) : [];
    } catch {
      return [];
    }
  });
  return targets.some((target) => makeTargetDependsOn(contents, target, "tools")) ? ["tools"] : [];
}

function makeTargetDependsOn(contents: string, target: string, dependency: string) {
  const lines = contents.split(/\r?\n/);
  const pending = [target];
  const seen = new Set<string>();
  while (pending.length > 0) {
    const current = pending.shift()!;
    if (seen.has(current)) continue;
    seen.add(current);
    for (const line of lines) {
      const rule = line.match(/^([A-Za-z0-9_. -]+)\s*:(?![=])([^#;]*)/);
      if (!rule) continue;
      const targets = rule[1]!.trim().split(/\s+/);
      if (!targets.includes(current)) continue;
      const dependencies = rule[2]!.trim().split(/\s+/).filter(Boolean);
      if (dependencies.includes(dependency)) return true;
      pending.push(...dependencies.filter((candidate) => /^[A-Za-z0-9_.-]+$/.test(candidate)));
    }
  }
  return false;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertTrustedValidationDefinitions(
  cwd: string,
  baseBranch: string,
  validationCommands: LooseRecord[],
) {
  for (const command of validationCommands) {
    const parsed = parseAllowedValidationCommand(command);
    assertTrustedValidationEnvironment(parsed);
    const parts = stripEnvPrefix(parsed);
    if (parts[0] === "dotnet" && parts[1] === "test") {
      assertTrustedDotnetValidationInputs(cwd, baseBranch, parts);
    }
    if (parts[0] === "make") {
      const makefile = findRepositoryPath(cwd, MAKEFILE_NAMES);
      const currentRelativePath = makefile ? path.basename(makefile) : null;
      const trustedRelativePath = findTrustedBasePath(cwd, baseBranch, MAKEFILE_NAMES);
      const relativePath = currentRelativePath ?? trustedRelativePath ?? "Makefile";
      const current = makefile ? readRepositoryRegularFile(makefile, "utf8") : null;
      const trusted = trustedRelativePath
        ? readTrustedBaseFile(cwd, baseBranch, trustedRelativePath)
        : null;
      if (
        currentRelativePath !== trustedRelativePath ||
        repositoryDefinitionDiffersFromBase(cwd, baseBranch, relativePath, current, trusted)
      ) {
        throw new Error(
          `validation_definition_changed: ${relativePath} differs from origin/${baseBranch}`,
        );
      }
      if (current != null) {
        const selectedTargets = makeValidationTargets(parts.slice(1));
        assertMakeTargetsNotShadowed(cwd, current, selectedTargets);
        assertTrustedMakeValidationReferences(
          cwd,
          baseBranch,
          current,
          relativePath,
          selectedTargets,
        );
      }
    }
    if (parts[0] === "pwsh" && parts[1] === "-File" && parts[2]) {
      const relativePath = parts[2].replaceAll("\\", "/").replace(/^\.\//, "");
      const current = readRepositoryRegularFile(path.join(cwd, relativePath), "utf8");
      const trusted = readTrustedBaseFile(cwd, baseBranch, relativePath);
      if (repositoryDefinitionDiffersFromBase(cwd, baseBranch, relativePath, current, trusted)) {
        throw new Error(
          `validation_definition_changed: ${relativePath} differs from origin/${baseBranch}`,
        );
      }
      if (current != null) {
        assertTrustedValidationReferences(cwd, baseBranch, current, relativePath, "powershell");
      }
    }
    if (isWorkspacePackageInvocation(parts)) {
      throw new Error(
        "validation_definition_untrusted: workspace package validation delegation is unsupported",
      );
    }
    const requirement = packageScriptRequirement(parts);
    const currentPackageScript = requirement ? readPackageScript(cwd, requirement.name) : null;
    const trustedPackageScript = requirement
      ? readTrustedPackageScript(cwd, baseBranch, requirement.name)
      : null;
    if (requirement && (currentPackageScript != null || trustedPackageScript != null)) {
      assertTrustedPackageScriptGraph(cwd, baseBranch, requirement.name);
      assertTrustedPackageScriptArguments(
        cwd,
        baseBranch,
        requirement.name,
        packageScriptForwardedArguments(parts),
      );
      continue;
    }
    if (requirement && parts[0] !== "bun") {
      throw new Error(
        `validation_definition_untrusted: package script ${requirement.name} is not defined on the trusted base`,
      );
    }
    assertTrustedImplicitValidationConfig(cwd, baseBranch, String(command ?? ""));
    for (const directReference of directValidationDefinitionPaths(parts)) {
      const directScript = resolveValidationReferencePath(cwd, baseBranch, directReference);
      const current = readRepositoryRegularFile(path.join(cwd, directScript), "utf8");
      const trusted = readTrustedBaseFile(cwd, baseBranch, directScript);
      if (repositoryDefinitionDiffersFromBase(cwd, baseBranch, directScript, current, trusted)) {
        throw new Error(
          `validation_definition_changed: direct validation script ${directScript} differs from origin/${baseBranch}`,
        );
      }
      if (current != null && isTypeScriptConfigPath(directScript)) {
        assertTrustedTypeScriptConfigGraph(cwd, baseBranch, directScript);
      } else if (current != null && isJavaScriptValidationPath(directScript)) {
        assertTrustedJavaScriptValidationGraph(
          cwd,
          baseBranch,
          current,
          directScript,
          new Set([directScript]),
        );
      }
    }
  }
}

function assertMakeTargetsNotShadowed(cwd: string, contents: string, words: string[]) {
  const phonyTargets = new Set<string>();
  for (const match of contents.matchAll(/^\.PHONY\s*:(?![=])([^#\n]*)/gm)) {
    for (const target of match[1]!.trim().split(/\s+/).filter(Boolean)) {
      phonyTargets.add(target);
    }
  }
  for (const target of words.filter(
    (word) => !word.startsWith("-") && !word.includes("=") && /^[A-Za-z0-9_.%/-]+$/.test(word),
  )) {
    if (phonyTargets.has(target) || !repositoryPathExists(path.join(cwd, target))) continue;
    throw new Error(
      `validation_definition_untrusted: Make target ${target} is shadowed by a repository path`,
    );
  }
}

function makeValidationTargets(words: string[]) {
  const targets: string[] = [];
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index]!;
    if (word === "--") {
      targets.push(...words.slice(index + 1));
      break;
    }
    if (["-f", "--file", "--makefile"].includes(word)) {
      index += 1;
      continue;
    }
    if (/^(?:-f|--file=|--makefile=)/.test(word) || word.startsWith("-") || word.includes("=")) {
      continue;
    }
    targets.push(word);
  }
  return targets;
}

function assertTrustedDotnetValidationInputs(cwd: string, baseBranch: string, parts: string[]) {
  for (const relativePath of dotnetValidationInputPaths(parts)) {
    assertTrustedRepositoryPath(cwd, baseBranch, relativePath, ".NET validation input");
  }
}

function dotnetValidationInputPaths(parts: string[]) {
  const references = new Set<string>();
  const args = parts.slice(2);
  const pathOptions = new Set(["--settings", "--test-adapter-path", "-s"]);
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]!;
    if (argument === "--") break;
    const optionValue = argument.match(/^(--settings|--test-adapter-path|-s)(?:=|:)(.+)$/i);
    if (optionValue) {
      addDotnetValidationInputReferences(references, optionValue[2]!);
      continue;
    }
    if (pathOptions.has(argument.toLowerCase())) {
      if (args[index + 1]) addDotnetValidationInputReferences(references, args[index + 1]!);
      index += 1;
      continue;
    }
    if (argument.startsWith("@")) {
      addDotnetValidationInputReferences(references, argument.slice(1));
      continue;
    }
    if (/\.(?:sln|slnf|slnx|csproj|fsproj|vbproj|runsettings)$/i.test(argument)) {
      addDotnetValidationInputReferences(references, argument);
    }
  }
  return [...references];
}

function addDotnetValidationInputReferences(references: Set<string>, value: string) {
  for (const candidate of value.split(";")) {
    const normalized = normalizeDirectValidationPath(candidate);
    if (!normalized) {
      throw new Error(`validation_definition_untrusted: invalid .NET validation input ${value}`);
    }
    references.add(normalized);
  }
}

function assertTrustedRepositoryPath(
  cwd: string,
  baseBranch: string,
  relativePath: string,
  label: string,
) {
  const absolutePath = safeTargetPath(cwd, relativePath);
  let currentStat: fs.Stats | null = null;
  try {
    currentStat = fs.lstatSync(absolutePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  if (
    currentStat?.isSymbolicLink() ||
    (currentStat && !currentStat.isFile() && !currentStat.isDirectory())
  ) {
    throw new Error(`validation_definition_changed: ${label} ${relativePath} is not trusted`);
  }
  if (!currentStat?.isDirectory()) {
    const current = readRepositoryRegularFile(absolutePath, "utf8");
    const trusted = readTrustedBaseFile(cwd, baseBranch, relativePath);
    if (repositoryDefinitionDiffersFromBase(cwd, baseBranch, relativePath, current, trusted)) {
      throw new Error(
        `validation_definition_changed: ${label} ${relativePath} differs from origin/${baseBranch}`,
      );
    }
    return;
  }

  const prefix = `${relativePath.replace(/\/+$/, "")}/`;
  const trustedPaths = run(
    "git",
    ["ls-tree", "-r", "--name-only", `origin/${baseBranch}`, "--", relativePath],
    {
      cwd,
    },
  )
    .split(/\r?\n/)
    .filter(Boolean);
  const currentPaths = uniqueStrings([
    ...gitLsFiles(cwd),
    ...targetCommittableState(cwd).keys(),
  ]).filter((candidate) => candidate.startsWith(prefix));
  for (const candidate of uniqueStrings([...trustedPaths, ...currentPaths]).sort()) {
    const current = readRepositoryRegularFile(path.join(cwd, candidate), "utf8");
    const trusted = readTrustedBaseFile(cwd, baseBranch, candidate);
    if (repositoryDefinitionDiffersFromBase(cwd, baseBranch, candidate, current, trusted)) {
      throw new Error(
        `validation_definition_changed: ${label} ${relativePath} differs from origin/${baseBranch}`,
      );
    }
  }
}

function directValidationDefinitionPaths(parts: string[]) {
  const commandParts = stripEnvPrefix(parts);
  if (
    commandParts[0] === "scripts/run-opengrep.sh" ||
    commandParts[0] === "./scripts/run-opengrep.sh"
  ) {
    return [normalizeDirectValidationPath(commandParts[0])].filter(
      (value): value is string => value != null,
    );
  }
  return uniqueStrings(commandWordsValidationReferences(commandParts))
    .map(normalizeDirectValidationPath)
    .filter((value): value is string => value != null);
}

function normalizeDirectValidationPath(value: string) {
  const normalized = path.posix.normalize(value.trim().replaceAll("\\", "/").replace(/^\.\//, ""));
  if (
    !normalized ||
    normalized === "." ||
    path.posix.isAbsolute(normalized) ||
    /^[A-Za-z]:\//.test(normalized) ||
    normalized === ".." ||
    normalized.startsWith("../")
  ) {
    return null;
  }
  return normalized;
}

function assertTrustedPackageScriptGraph(
  cwd: string,
  baseBranch: string,
  name: string,
  seen = new Set<string>(),
) {
  if (seen.has(name)) return;
  seen.add(name);
  for (const candidate of [`pre${name}`, name, `post${name}`]) {
    const current = readPackageScript(cwd, candidate);
    const trusted = readTrustedPackageScript(cwd, baseBranch, candidate);
    if (current !== trusted) {
      throw new Error(
        `validation_definition_changed: package script ${candidate} differs from origin/${baseBranch}`,
      );
    }
    if (!current) continue;
    assertTrustedValidationReferences(cwd, baseBranch, current, "package.json", "package");
    assertTrustedImplicitValidationConfig(cwd, baseBranch, current, candidate);
    for (const referencedScript of packageScriptReferences(current)) {
      assertTrustedPackageScriptGraph(cwd, baseBranch, referencedScript, seen);
    }
  }
}

function assertTrustedPackageScriptArguments(
  cwd: string,
  baseBranch: string,
  name: string,
  args: string[],
) {
  if (args.length === 0) return;
  const script = readPackageScript(cwd, name);
  if (!script) return;
  const command = `${script} ${renderValidationCommand(args)}`;
  assertTrustedValidationReferences(cwd, baseBranch, command, "package.json", "package");
  assertTrustedImplicitValidationConfig(cwd, baseBranch, command, name);
}

function packageScriptForwardedArguments(parts: string[]) {
  const commandParts = stripEnvPrefix(parts);
  if (commandParts[0] === "npm") {
    if (commandParts[1] === "run") return commandParts.slice(3);
    if (commandParts[1] === "test") return commandParts.slice(2);
    return [];
  }
  if (commandParts[0] === "bun" && commandParts[1] === "run") {
    return commandParts.slice(3);
  }
  if (commandParts[0] !== "pnpm") return [];
  let scriptIndex = 1;
  if (commandParts[scriptIndex] === "-s" || commandParts[scriptIndex] === "--silent") {
    scriptIndex += 1;
  }
  if (commandParts[scriptIndex] === "run") scriptIndex += 1;
  return commandParts.slice(scriptIndex + 1);
}

function assertTrustedImplicitValidationConfig(
  cwd: string,
  baseBranch: string,
  command: string,
  scriptName = "",
) {
  const normalized = `${scriptName} ${command}`.toLowerCase();
  const checksPackageValidation =
    scriptName !== "" ||
    /\b(?:ava|biome|eslint|jest|mocha|oxlint|tsc|typescript|vite|vitest)\b/.test(normalized);
  if (!checksPackageValidation) return;

  const configNames = [
    ".eslintrc",
    ".eslintrc.cjs",
    ".eslintrc.js",
    ".eslintrc.json",
    ".eslintrc.yaml",
    ".eslintrc.yml",
    ".mocharc.cjs",
    ".mocharc.js",
    ".mocharc.json",
    ".mocharc.jsonc",
    ".mocharc.mjs",
    ".mocharc.yaml",
    ".mocharc.yml",
    "ava.config.cjs",
    "ava.config.js",
    "ava.config.mjs",
    "biome.json",
    "biome.jsonc",
    "eslint.config.cjs",
    "eslint.config.cts",
    "eslint.config.js",
    "eslint.config.mjs",
    "eslint.config.mts",
    "eslint.config.ts",
    "jest.config.cjs",
    "jest.config.cts",
    "jest.config.js",
    "jest.config.json",
    "jest.config.mjs",
    "jest.config.mts",
    "jest.config.ts",
    "mocha.opts",
    ".oxlintrc.json",
    "oxlint.config.ts",
    "vite.config.cjs",
    "vite.config.cts",
    "vite.config.js",
    "vite.config.mjs",
    "vite.config.mts",
    "vite.config.ts",
    "vitest.config.cjs",
    "vitest.config.cts",
    "vitest.config.js",
    "vitest.config.mjs",
    "vitest.config.mts",
    "vitest.config.ts",
  ];
  if (/\b(?:tsc|typescript|typecheck)\b/.test(normalized)) {
    configNames.push("tsconfig.json");
  }
  const configNameSet = new Set(configNames);
  const repositoryPaths = uniqueStrings([
    ...gitLsFiles(cwd),
    ...targetCommittableState(cwd).keys(),
    ...run("git", ["ls-tree", "-r", "--name-only", `origin/${baseBranch}`], { cwd })
      .split(/\r?\n/)
      .filter(Boolean),
  ]);
  const configPaths = uniqueStrings([
    ...configNames,
    ...repositoryPaths.filter((relativePath) => {
      const name = path.posix.basename(relativePath.replaceAll("\\", "/"));
      return name !== "tsconfig.json" && configNameSet.has(name);
    }),
  ]).sort();
  for (const relativePath of configPaths) {
    const current = readRepositoryRegularFile(path.join(cwd, relativePath), "utf8");
    const trusted = readTrustedBaseFile(cwd, baseBranch, relativePath);
    if (repositoryDefinitionDiffersFromBase(cwd, baseBranch, relativePath, current, trusted)) {
      throw new Error(
        `validation_definition_changed: implicit validator config ${relativePath} differs from origin/${baseBranch}`,
      );
    }
    if (current != null && isTypeScriptConfigPath(relativePath)) {
      assertTrustedTypeScriptConfigGraph(cwd, baseBranch, relativePath);
    } else if (current != null && isJavaScriptValidationPath(relativePath)) {
      assertTrustedJavaScriptValidationGraph(
        cwd,
        baseBranch,
        current,
        relativePath,
        new Set([relativePath]),
      );
    }
  }

  const packageJsonPaths = uniqueStrings([
    "package.json",
    ...repositoryPaths.filter(
      (relativePath) => path.posix.basename(relativePath.replaceAll("\\", "/")) === "package.json",
    ),
  ]).sort();
  for (const relativePath of packageJsonPaths) {
    const currentPackageJson = readRepositoryRegularFile(path.join(cwd, relativePath), "utf8");
    const trustedPackageJson = readTrustedBaseFile(cwd, baseBranch, relativePath);
    if (
      implicitPackageValidationConfig(currentPackageJson) !==
      implicitPackageValidationConfig(trustedPackageJson)
    ) {
      throw new Error(
        `validation_definition_changed: implicit validator config ${relativePath} differs from origin/${baseBranch}`,
      );
    }
  }
}

function implicitPackageValidationConfig(contents: string | null) {
  if (contents == null) return "";
  try {
    const packageJson = JSON.parse(contents);
    return JSON.stringify({
      ava: packageJson.ava ?? null,
      eslintConfig: packageJson.eslintConfig ?? null,
      jest: packageJson.jest ?? null,
      mocha: packageJson.mocha ?? null,
      vitest: packageJson.vitest ?? null,
    });
  } catch {
    return "invalid";
  }
}

function assertTrustedTypeScriptConfigGraph(
  cwd: string,
  baseBranch: string,
  relativePath: string,
  seen = new Set<string>(),
) {
  const normalizedPath = relativePath.replaceAll("\\", "/").replace(/^\.\//, "");
  if (seen.has(normalizedPath)) return;
  seen.add(normalizedPath);
  const current = readRepositoryRegularFile(path.join(cwd, normalizedPath), "utf8");
  const trusted = readTrustedBaseFile(cwd, baseBranch, normalizedPath);
  if (repositoryDefinitionDiffersFromBase(cwd, baseBranch, normalizedPath, current, trusted)) {
    throw new Error(
      `validation_definition_changed: TypeScript config ${normalizedPath} differs from origin/${baseBranch}`,
    );
  }
  if (current == null) {
    throw new Error(`validation_definition_untrusted: missing TypeScript config ${normalizedPath}`);
  }

  let config: LooseRecord;
  try {
    config = parseJsonc(current);
  } catch {
    throw new Error(
      `validation_definition_untrusted: cannot parse TypeScript config ${normalizedPath}`,
    );
  }
  const references: string[] = [];
  const extended = Array.isArray(config.extends) ? config.extends : [config.extends];
  for (const value of extended) {
    if (typeof value === "string" && isLocalTypeScriptConfigReference(value)) {
      references.push(resolveTypeScriptConfigReference(cwd, normalizedPath, value, "extends"));
    }
  }
  if (Array.isArray(config.references)) {
    for (const reference of config.references) {
      if (!reference || typeof reference !== "object" || Array.isArray(reference)) continue;
      const value = reference.path;
      if (typeof value !== "string") continue;
      references.push(resolveTypeScriptConfigReference(cwd, normalizedPath, value, "reference"));
    }
  }
  for (const reference of uniqueStrings(references)) {
    assertTrustedTypeScriptConfigGraph(cwd, baseBranch, reference, seen);
  }
}

function isTypeScriptConfigPath(relativePath: string) {
  return /(?:^|\/)tsconfig(?:\.[A-Za-z0-9_.-]+)?\.json$/i.test(relativePath);
}

function isLocalTypeScriptConfigReference(reference: string) {
  return reference.startsWith(".");
}

function resolveTypeScriptConfigReference(
  cwd: string,
  originPath: string,
  reference: string,
  kind: "extends" | "reference",
) {
  const normalizedReference = reference.replaceAll("\\", "/");
  if (path.posix.isAbsolute(normalizedReference)) {
    throw new Error(
      `validation_definition_untrusted: TypeScript config ${originPath} has absolute ${kind} ${reference}`,
    );
  }
  const originDirectory = path.posix.dirname(originPath);
  const normalized = path.posix.normalize(path.posix.join(originDirectory, normalizedReference));
  if (normalized === ".." || normalized.startsWith("../")) {
    throw new Error(
      `validation_definition_untrusted: TypeScript config ${originPath} has outside ${kind} ${reference}`,
    );
  }
  const candidates = normalizedReference.toLowerCase().endsWith(".json")
    ? [normalized]
    : kind === "reference"
      ? [path.posix.join(normalized, "tsconfig.json"), `${normalized}.json`]
      : [`${normalized}.json`, path.posix.join(normalized, "tsconfig.json")];
  const resolved = candidates.find((candidate) => repositoryPathExists(path.join(cwd, candidate)));
  if (!resolved) {
    throw new Error(
      `validation_definition_untrusted: unresolved TypeScript config ${kind} ${reference} from ${originPath}`,
    );
  }
  return resolved;
}

function parseJsonc(contents: string): LooseRecord {
  let withoutComments = "";
  let inString = false;
  let escaped = false;
  for (let index = 0; index < contents.length; index += 1) {
    const character = contents[index]!;
    const next = contents[index + 1];
    if (inString) {
      withoutComments += character;
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') {
      inString = true;
      withoutComments += character;
      continue;
    }
    if (character === "/" && next === "/") {
      while (index < contents.length && contents[index] !== "\n") index += 1;
      withoutComments += "\n";
      continue;
    }
    if (character === "/" && next === "*") {
      index += 2;
      while (index < contents.length && !(contents[index] === "*" && contents[index + 1] === "/")) {
        if (contents[index] === "\n") withoutComments += "\n";
        index += 1;
      }
      index += 1;
      continue;
    }
    withoutComments += character;
  }

  let normalized = "";
  inString = false;
  escaped = false;
  for (let index = 0; index < withoutComments.length; index += 1) {
    const character = withoutComments[index]!;
    if (inString) {
      normalized += character;
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') {
      inString = true;
      normalized += character;
      continue;
    }
    if (character === ",") {
      let lookahead = index + 1;
      while (/\s/.test(withoutComments[lookahead] ?? "")) lookahead += 1;
      if (withoutComments[lookahead] === "}" || withoutComments[lookahead] === "]") continue;
    }
    normalized += character;
  }
  const parsed = JSON.parse(normalized);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("expected object");
  }
  return parsed;
}

function assertTrustedMakeValidationReferences(
  cwd: string,
  baseBranch: string,
  contents: string,
  originPath: string,
  selectedTargets: string[],
) {
  const definitions = new Map<string, string>();
  const collect = (relativePath: string, definition: string) => {
    if (definitions.has(relativePath)) return;
    definitions.set(relativePath, definition);
    for (const includePath of makeIncludePaths(definition)) {
      const current = readRepositoryRegularFile(path.join(cwd, includePath), "utf8");
      const trusted = readTrustedBaseFile(cwd, baseBranch, includePath);
      if (repositoryDefinitionDiffersFromBase(cwd, baseBranch, includePath, current, trusted)) {
        throw new Error(
          `validation_definition_changed: referenced validation file ${includePath} differs from origin/${baseBranch}`,
        );
      }
      if (current != null) collect(includePath, current);
    }
  };
  collect(originPath, contents);

  const variables = staticMakeVariables([...definitions.values()].join("\n"));
  const rules = new Map<string, { dependencies: string[]; recipes: string[] }>();
  for (const definition of definitions.values()) {
    const lines = definition.replace(/\\\r?\n/g, " ").split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      const match = lines[index]!.match(/^([A-Za-z0-9_.%/ -]+)\s*:(?![=])([^#]*)/);
      if (!match) continue;
      const [dependenciesText, ...inlineRecipeParts] = match[2]!.split(";");
      const recipes = inlineRecipeParts.length > 0 ? [inlineRecipeParts.join(";")] : [];
      for (let recipeIndex = index + 1; recipeIndex < lines.length; recipeIndex += 1) {
        const recipe = lines[recipeIndex]!;
        if (!recipe.startsWith("\t")) break;
        recipes.push(recipe.slice(1));
      }
      for (const target of match[1]!.trim().split(/\s+/)) {
        const rule = rules.get(target) ?? { dependencies: [], recipes: [] };
        rule.dependencies.push(...dependenciesText!.trim().split(/\s+/).filter(Boolean));
        rule.recipes.push(...recipes);
        rules.set(target, rule);
      }
    }
  }

  const pending = [...selectedTargets];
  const seenTargets = new Set<string>();
  const seenReferences = new Set<string>();
  while (pending.length > 0) {
    const target = pending.shift()!;
    if (seenTargets.has(target)) continue;
    seenTargets.add(target);
    const rule = rules.get(target);
    if (!rule) continue;
    for (const dependency of rule.dependencies) {
      const expanded = expandStaticMakeVariables(dependency, variables);
      if (/\$\([^)]+\)|\$\{[^}]+\}/.test(expanded)) {
        throw new Error(`validation_definition_untrusted: dynamic Make dependency ${dependency}`);
      }
      if (/^[A-Za-z0-9_.%/-]+$/.test(expanded)) pending.push(expanded);
    }
    for (const recipe of rule.recipes) {
      const expanded = expandStaticMakeVariables(recipe, variables);
      const unresolved = expanded.match(/\$\([^)]+\)|\$\{[^}]+\}/);
      if (unresolved) {
        throw new Error(`validation_definition_untrusted: dynamic Make recipe ${unresolved[0]}`);
      }
      const automatic = expanded.match(/(?:^|[^$])(\$[@%<?^+*|])/);
      if (automatic) {
        throw new Error(`validation_definition_untrusted: automatic Make variable ${automatic[1]}`);
      }
      assertTrustedValidationReferences(
        cwd,
        baseBranch,
        expanded,
        originPath,
        "package",
        seenReferences,
      );
    }
  }
}

function makeIncludePaths(contents: string) {
  const paths: string[] = [];
  for (const match of contents.matchAll(/^(?:-?include|sinclude)\s+([^#\n]+)/gm)) {
    for (const token of match[1]!.trim().split(/\s+/)) {
      if (/[$%*?[\]]/.test(token)) {
        throw new Error(`validation_definition_untrusted: dynamic Make include ${token}`);
      }
      const normalized = normalizeValidationReference(".", token);
      if (normalized) paths.push(normalized);
    }
  }
  return uniqueStrings(paths);
}

function assertTrustedValidationReferences(
  cwd: string,
  baseBranch: string,
  contents: string,
  originPath: string,
  kind: "make" | "package" | "powershell",
  seen = new Set<string>(),
) {
  for (const referencePath of validationReferencePaths(contents, originPath, kind)) {
    const relativePath = resolveValidationReferencePath(cwd, baseBranch, referencePath);
    if (seen.has(relativePath)) continue;
    seen.add(relativePath);
    const current = readRepositoryRegularFile(path.join(cwd, relativePath), "utf8");
    const trusted = readTrustedBaseFile(cwd, baseBranch, relativePath);
    if (current == null && trusted == null) continue;
    if (repositoryDefinitionDiffersFromBase(cwd, baseBranch, relativePath, current, trusted)) {
      throw new Error(
        `validation_definition_changed: referenced validation file ${relativePath} differs from origin/${baseBranch}`,
      );
    }
    if (current == null) continue;
    if (isTypeScriptConfigPath(relativePath)) {
      assertTrustedTypeScriptConfigGraph(cwd, baseBranch, relativePath);
    } else if (isJavaScriptValidationPath(relativePath)) {
      assertTrustedJavaScriptValidationGraph(cwd, baseBranch, current, relativePath, seen);
    } else if (/\.(?:ps1|psd1|psm1)$/i.test(relativePath)) {
      assertTrustedValidationReferences(cwd, baseBranch, current, relativePath, "powershell", seen);
    } else if (isMakeValidationPath(relativePath)) {
      assertTrustedValidationReferences(cwd, baseBranch, current, relativePath, "make", seen);
    }
  }
}

function isMakeValidationPath(relativePath: string) {
  return (
    /\.(?:mk|make)$/i.test(relativePath) ||
    MAKEFILE_NAMES.includes(path.posix.basename(relativePath) as (typeof MAKEFILE_NAMES)[number])
  );
}

function resolveValidationReferencePath(cwd: string, baseBranch: string, relativePath: string) {
  if (isTypeScriptConfigPath(relativePath) || path.posix.extname(relativePath) !== "") {
    return relativePath;
  }
  const candidate = path.posix.join(relativePath.replace(/\/+$/, ""), "tsconfig.json");
  let currentIsDirectory = false;
  try {
    const stat = fs.lstatSync(path.join(cwd, relativePath));
    currentIsDirectory = stat.isDirectory() && !stat.isSymbolicLink();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  if (currentIsDirectory || readTrustedBaseFile(cwd, baseBranch, candidate) != null) {
    return candidate;
  }
  return relativePath;
}

function isJavaScriptValidationPath(relativePath: string) {
  return JAVASCRIPT_VALIDATION_EXTENSIONS.includes(
    path.posix
      .extname(relativePath)
      .toLowerCase() as (typeof JAVASCRIPT_VALIDATION_EXTENSIONS)[number],
  );
}

function assertTrustedJavaScriptValidationGraph(
  cwd: string,
  baseBranch: string,
  contents: string,
  originPath: string,
  seen: Set<string>,
) {
  for (const specifier of javaScriptModuleReferences(contents)) {
    const relativePath = specifier.startsWith(".")
      ? resolveJavaScriptValidationReference(cwd, originPath, specifier)
      : specifier.startsWith("#")
        ? resolvePackageImportValidationReference(cwd, baseBranch, originPath, specifier)
        : null;
    if (!specifier.startsWith(".") && !specifier.startsWith("#")) continue;
    if (!relativePath) {
      throw new Error(
        `validation_definition_untrusted: unresolved JavaScript validation reference ${specifier}`,
      );
    }
    if (seen.has(relativePath)) continue;
    seen.add(relativePath);
    const current = readRepositoryRegularFile(path.join(cwd, relativePath), "utf8");
    const trusted = readTrustedBaseFile(cwd, baseBranch, relativePath);
    if (repositoryDefinitionDiffersFromBase(cwd, baseBranch, relativePath, current, trusted)) {
      throw new Error(
        `validation_definition_changed: referenced validation file ${relativePath} differs from origin/${baseBranch}`,
      );
    }
    if (current != null && isJavaScriptValidationPath(relativePath)) {
      assertTrustedJavaScriptValidationGraph(cwd, baseBranch, current, relativePath, seen);
    }
  }
  for (const script of javaScriptPackageScriptReferences(contents)) {
    assertTrustedPackageScriptGraph(cwd, baseBranch, script);
  }
}

function resolvePackageImportValidationReference(
  cwd: string,
  baseBranch: string,
  originPath: string,
  specifier: string,
) {
  const packageJsonPath = nearestValidationPackageJson(cwd, baseBranch, originPath);
  if (!packageJsonPath) return null;
  const current = readRepositoryRegularFile(path.join(cwd, packageJsonPath), "utf8");
  const trusted = readTrustedBaseFile(cwd, baseBranch, packageJsonPath);
  if (packageImportDefinition(current) !== packageImportDefinition(trusted)) {
    throw new Error(
      `validation_definition_changed: package import map ${packageJsonPath} differs from origin/${baseBranch}`,
    );
  }
  if (current == null) return null;
  let target: unknown;
  try {
    target = JSON.parse(current).imports?.[specifier];
  } catch {
    return null;
  }
  if (typeof target !== "string" || !target.startsWith(".")) return null;
  return resolveJavaScriptValidationReference(cwd, packageJsonPath, target);
}

function nearestValidationPackageJson(
  cwd: string,
  baseBranch: string,
  originPath: string,
): string | null {
  let directory = path.posix.dirname(originPath.replaceAll("\\", "/"));
  while (true) {
    const candidate = directory === "." ? "package.json" : `${directory}/package.json`;
    if (
      readRepositoryRegularFile(path.join(cwd, candidate), "utf8") != null ||
      readTrustedBaseFile(cwd, baseBranch, candidate) != null
    ) {
      return candidate;
    }
    if (directory === ".") return null;
    directory = path.posix.dirname(directory);
  }
}

function packageImportDefinition(contents: string | null) {
  if (contents == null) return null;
  try {
    return stableJson(JSON.parse(contents).imports ?? null);
  } catch {
    return "invalid";
  }
}

function javaScriptModuleReferences(contents: string) {
  const references = new Set<string>();
  for (const match of contents.matchAll(
    /\b(?:import|export)\s+(?:[^"'`]*?\s+from\s+)?["']([^"']+)["']/g,
  )) {
    references.add(match[1]!);
  }
  for (const reference of javaScriptCallModuleReferences(contents)) {
    references.add(reference);
  }
  return references;
}

function javaScriptCallModuleReferences(contents: string) {
  const references = new Set<string>();
  let index = 0;
  while (index < contents.length) {
    const character = contents[index]!;
    if (character === "'" || character === '"') {
      index = skipJavaScriptQuotedString(contents, index);
      continue;
    }
    if (character === "`") {
      index = skipJavaScriptTemplateLiteral(contents, index);
      continue;
    }
    if (character === "/" && contents[index + 1] === "/") {
      index = skipJavaScriptLineComment(contents, index);
      continue;
    }
    if (character === "/" && contents[index + 1] === "*") {
      index = skipJavaScriptBlockComment(contents, index);
      continue;
    }
    const identifier = contents.slice(index).match(/^[A-Za-z_$][A-Za-z0-9_$]*/)?.[0];
    if (!identifier) {
      index += 1;
      continue;
    }
    const identifierStart = index;
    index += identifier.length;
    if (!["import", "require"].includes(identifier)) continue;
    if (identifierStart > 0 && /[A-Za-z0-9_$.]/.test(contents[identifierStart - 1]!)) continue;
    let cursor = skipJavaScriptTrivia(contents, index);
    if (contents[cursor] !== "(") continue;
    cursor = skipJavaScriptTrivia(contents, cursor + 1);
    const quote = contents[cursor];
    if (quote !== "'" && quote !== '"') {
      throw new Error("validation_definition_untrusted: dynamic JavaScript validation reference");
    }
    const parsed = readJavaScriptModuleString(contents, cursor);
    cursor = skipJavaScriptTrivia(contents, parsed.end);
    if (contents[cursor] !== ")") {
      throw new Error("validation_definition_untrusted: dynamic JavaScript validation reference");
    }
    references.add(parsed.value);
    index = cursor + 1;
  }
  return references;
}

function skipJavaScriptTrivia(contents: string, start: number) {
  let index = start;
  while (index < contents.length) {
    if (/\s/.test(contents[index]!)) {
      index += 1;
      continue;
    }
    if (contents[index] === "/" && contents[index + 1] === "/") {
      index = skipJavaScriptLineComment(contents, index);
      continue;
    }
    if (contents[index] === "/" && contents[index + 1] === "*") {
      index = skipJavaScriptBlockComment(contents, index);
      continue;
    }
    break;
  }
  return index;
}

function skipJavaScriptLineComment(contents: string, start: number) {
  const newline = contents.indexOf("\n", start + 2);
  return newline < 0 ? contents.length : newline + 1;
}

function skipJavaScriptBlockComment(contents: string, start: number) {
  const end = contents.indexOf("*/", start + 2);
  if (end < 0) {
    throw new Error("validation_definition_untrusted: unterminated JavaScript comment");
  }
  return end + 2;
}

function skipJavaScriptQuotedString(contents: string, start: number) {
  const quote = contents[start]!;
  for (let index = start + 1; index < contents.length; index += 1) {
    if (contents[index] === "\\") {
      index += 1;
      continue;
    }
    if (contents[index] === quote) return index + 1;
  }
  throw new Error("validation_definition_untrusted: unterminated JavaScript string");
}

function skipJavaScriptTemplateLiteral(contents: string, start: number) {
  for (let index = start + 1; index < contents.length; index += 1) {
    if (contents[index] === "\\") {
      index += 1;
      continue;
    }
    if (contents[index] === "`") return index + 1;
    if (contents[index] === "$" && contents[index + 1] === "{") {
      throw new Error("validation_definition_untrusted: dynamic JavaScript template expression");
    }
  }
  throw new Error("validation_definition_untrusted: unterminated JavaScript template");
}

function readJavaScriptModuleString(contents: string, start: number) {
  const quote = contents[start]!;
  let value = "";
  for (let index = start + 1; index < contents.length; index += 1) {
    const character = contents[index]!;
    if (character === "\\") {
      throw new Error(
        "validation_definition_untrusted: escaped JavaScript module specifier is unsupported",
      );
    }
    if (character === quote) return { end: index + 1, value };
    value += character;
  }
  throw new Error("validation_definition_untrusted: unterminated JavaScript module specifier");
}

function resolveJavaScriptValidationReference(cwd: string, originPath: string, specifier: string) {
  const originDirectory = path.posix.dirname(originPath.replaceAll("\\", "/"));
  const normalized = path.posix.normalize(path.posix.join(originDirectory, specifier));
  if (normalized === ".." || normalized.startsWith("../") || path.posix.isAbsolute(normalized)) {
    return null;
  }
  const candidates = uniqueStrings([
    normalized,
    ...JAVASCRIPT_VALIDATION_EXTENSIONS.map((extension) => `${normalized}${extension}`),
    ...JAVASCRIPT_VALIDATION_EXTENSIONS.map((extension) =>
      path.posix.join(normalized, `index${extension}`),
    ),
    `${normalized}.json`,
  ]);
  return (
    candidates.find((candidate) => {
      try {
        const stat = fs.lstatSync(path.join(cwd, candidate));
        return stat.isFile() && !stat.isSymbolicLink();
      } catch {
        return false;
      }
    }) ?? null
  );
}

function javaScriptPackageScriptReferences(contents: string) {
  const references = new Set<string>();
  for (const match of contents.matchAll(
    /["'`](?:npm|pnpm|bun)(?:\.cmd)?\s+(?:run(?:-script)?\s+)?([A-Za-z0-9:_.-]+)(?:\s|["'`])/g,
  )) {
    const command = match[0]!.slice(1, -1);
    for (const reference of packageScriptReferences(command)) references.add(reference);
  }
  return references;
}

function validationReferencePaths(
  contents: string,
  originPath: string,
  kind: "make" | "package" | "powershell",
) {
  const references = new Set<string>();
  const addCommand = (command: string) => {
    for (const reference of commandValidationReferences(command)) {
      const normalized = normalizeValidationReference(
        kind === "make" ? "." : originPath,
        reference,
      );
      if (normalized) {
        references.add(normalized);
      } else if (/[$*?[\]]/.test(reference) && looksLikeLocalValidationPath(reference)) {
        throw new Error(
          `validation_definition_untrusted: unresolved dynamic validation reference ${reference}`,
        );
      }
    }
  };
  if (kind === "package") {
    assertNoStatefulShellDelegation(contents);
    const substitution = dynamicShellSubstitution(contents);
    if (substitution) {
      throw new Error(
        `validation_definition_untrusted: dynamic shell substitution ${substitution} in package validation script`,
      );
    }
    for (const command of contents.split(/&&|\|\||[;|\n]/)) addCommand(command);
  }
  if (kind === "make") {
    const variables = staticMakeVariables(contents);
    const addMakeRecipe = (recipe: string) => {
      const expanded = expandStaticMakeVariables(recipe, variables);
      const unresolved = expanded.match(/\$\([^)]+\)|\$\{[^}]+\}/);
      if (unresolved) {
        throw new Error(`validation_definition_untrusted: dynamic Make recipe ${unresolved[0]}`);
      }
      addCommand(expanded);
    };
    for (const match of contents.matchAll(/^(?:-?include|sinclude)\s+([^#\n]+)/gm)) {
      for (const token of match[1]!.trim().split(/\s+/)) {
        if (/[$%*?[\]]/.test(token)) {
          throw new Error(`validation_definition_untrusted: dynamic Make include ${token}`);
        }
        const normalized = normalizeValidationReference(".", token);
        if (normalized) references.add(normalized);
      }
    }
    for (const line of contents.split(/\r?\n/)) {
      if (line.startsWith("\t")) {
        addMakeRecipe(line.slice(1));
        continue;
      }
      const inlineRecipe = line.match(/^[A-Za-z0-9_.%/ -]+\s*:(?![=])[^#;]*;(.*)$/);
      if (inlineRecipe?.[1]) addMakeRecipe(inlineRecipe[1]);
    }
  }
  if (kind === "powershell") {
    const deterministicJoinPath =
      /\bJoin-Path\s+\$PSScriptRoot\s+["']([^"']+\.(?:ps1|psd1|psm1))["']/gi;
    for (const match of contents.matchAll(deterministicJoinPath)) {
      const normalized = normalizeValidationReference(originPath, `$PSScriptRoot/${match[1]}`);
      if (normalized) references.add(normalized);
    }
    for (const match of contents.matchAll(
      /(?:\$PSScriptRoot|\.{1,2})[\\/][A-Za-z0-9_.\-/\\]+\.(?:ps1|psd1|psm1)/gi,
    )) {
      const normalized = normalizeValidationReference(
        match[0].toLowerCase().startsWith("$psscriptroot") ? originPath : ".",
        match[0],
      );
      if (normalized) references.add(normalized);
    }
    const dynamicContents = contents.replace(deterministicJoinPath, '"trusted-helper.ps1"');
    const dynamicReference = dynamicContents.match(
      /\bJoin-Path\b|(?:^|[;\n])\s*(?:&|\.)\s+\$[A-Za-z_][A-Za-z0-9_:]*|\b(?:Import-Module|Start-Process)\s+\$[A-Za-z_][A-Za-z0-9_:]*|\b(?:powershell|pwsh)(?:\.exe)?\b[^\r\n]*\s-File\s+\$[A-Za-z_][A-Za-z0-9_:]*|&\s*\([^)\r\n]*\$[A-Za-z_][A-Za-z0-9_:]*/im,
    );
    if (dynamicReference) {
      throw new Error(
        `validation_definition_untrusted: dynamic PowerShell validation reference ${dynamicReference[0].trim()}`,
      );
    }
  }
  return [...references];
}

function assertNoStatefulShellDelegation(contents: string) {
  const stateful = new Set([
    ".",
    "alias",
    "cd",
    "export",
    "popd",
    "pushd",
    "set",
    "source",
    "unset",
  ]);
  for (const command of contents.split(/&&|\|\||[;\n]/)) {
    const words = shellCommandWords(command);
    while (words[0]?.startsWith("@") || words[0]?.startsWith("-")) {
      words[0] = words[0]!.slice(1);
      if (!words[0]) words.shift();
    }
    if (
      stateful.has(words[0] ?? "") ||
      (words.length === 1 && /^[A-Za-z_][A-Za-z0-9_]*=/.test(words[0] ?? ""))
    ) {
      throw new Error(`validation_definition_untrusted: stateful shell delegation ${words[0]}`);
    }
  }
}

function dynamicShellSubstitution(contents: string) {
  let quote: "'" | '"' | null = null;
  for (let index = 0; index < contents.length; index += 1) {
    const character = contents[index]!;
    if (character === "\\" && quote !== "'") {
      index += 1;
      continue;
    }
    if (character === "'" && quote !== '"') {
      quote = quote === "'" ? null : "'";
      continue;
    }
    if (character === '"' && quote !== "'") {
      quote = quote === '"' ? null : '"';
      continue;
    }
    if (quote === "'") continue;
    if (character === "`") return "`...`";
    if (character === "$" && contents[index + 1] === "(") return "$(...)";
  }
  return null;
}

function commandValidationReferences(command: string): string[] {
  return commandWordsValidationReferences(shellCommandWords(command));
}

function commandWordsValidationReferences(input: string[]): string[] {
  const words = [...input];
  while (words[0]?.startsWith("@") || words[0]?.startsWith("-")) {
    words[0] = words[0]!.slice(1);
    if (!words[0]) words.shift();
  }
  assertTrustedValidationEnvironment(words);
  while (/^[A-Za-z_][A-Za-z0-9_]*=/.test(words[0] ?? "")) words.shift();
  if (words[0] === "env") {
    words.shift();
    while (/^[A-Za-z_][A-Za-z0-9_]*=/.test(words[0] ?? "")) words.shift();
  }
  const rawExecutable = (words.shift() ?? "").replaceAll("\\", "/");
  const executable = path.posix.basename(rawExecutable).toLowerCase();
  if (!executable) return [];
  if (["cross-env", "cross-env-shell"].includes(executable)) {
    return commandWordsValidationReferences(words);
  }
  if (executable === "." || executable === "source") {
    const dynamicReference = words.find((word) => /[$*?[\]]/.test(word));
    if (dynamicReference) {
      throw new Error(
        `validation_definition_untrusted: dynamic sourced validation helper ${dynamicReference}`,
      );
    }
    return interpreterArgumentValidationReferences(words);
  }
  const wrapped = unwrapPackageExecutor(executable, words);
  if (wrapped) return commandWordsValidationReferences(wrapped);
  if (
    ["bun", "bun.exe"].includes(executable) &&
    words[0] === "run" &&
    words[1] &&
    looksLikeLocalValidationPath(words[1])
  ) {
    return [words[1]!];
  }
  if (["node", "node.exe"].includes(executable)) {
    const evalIndex = words.findIndex((word) => ["-e", "--eval", "-p", "--print"].includes(word));
    return uniqueStrings([
      ...(evalIndex >= 0 ? inlineValidationReferences(words[evalIndex + 1] ?? "") : []),
      ...interpreterArgumentValidationReferences(words),
    ]);
  }
  if (["bash", "sh", "zsh", "python", "python3", "ruby", "tsx", "ts-node"].includes(executable)) {
    const evalIndex = words.findIndex((word) => ["-c", "-e"].includes(word));
    const argumentReferences = interpreterArgumentValidationReferences(words);
    if (evalIndex >= 0) {
      const body = words[evalIndex + 1] ?? "";
      if (["bash", "sh", "zsh"].includes(executable)) {
        assertNoStatefulShellDelegation(body);
        return uniqueStrings([
          ...argumentReferences,
          ...body.split(/&&|\|\||[;\n]/).flatMap((command) => commandValidationReferences(command)),
        ]);
      }
      return uniqueStrings([...argumentReferences, ...inlineValidationReferences(body)]);
    }
    return argumentReferences;
  }
  if (["powershell", "powershell.exe", "pwsh", "pwsh.exe"].includes(executable)) {
    const fileIndex = words.findIndex((word) => word.toLowerCase() === "-file");
    return uniqueStrings([
      ...(fileIndex >= 0 && words[fileIndex + 1] ? [words[fileIndex + 1]!] : []),
      ...interpreterArgumentValidationReferences(words),
    ]);
  }
  if (["make", "gmake"].includes(executable)) {
    return makefileArgumentValidationReferences(words);
  }
  return uniqueStrings([
    ...(looksLikeLocalValidationPath(rawExecutable) ? [rawExecutable] : []),
    ...validatorConfigArgumentReferences(executable, words),
  ]);
}

function makefileArgumentValidationReferences(words: string[]) {
  const references: string[] = [];
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index]!;
    const inline = word.match(/^(?:--file|--makefile)=(.+)$/)?.[1] ?? word.match(/^-f(.+)$/)?.[1];
    const candidate =
      inline ??
      (["-f", "--file", "--makefile"].includes(word) && words[index + 1] ? words[++index] : null);
    if (!candidate) continue;
    if (/[$*?[\]]/.test(candidate)) {
      throw new Error(
        `validation_definition_untrusted: dynamic recursive Make definition ${candidate}`,
      );
    }
    if (looksLikeLocalValidationPath(candidate)) references.push(candidate);
  }
  return uniqueStrings(references);
}

function validatorConfigArgumentReferences(executable: string, words: string[]) {
  const normalizedExecutable = executable.replace(/\.cmd$/i, "");
  const optionsByExecutable: Record<string, Set<string>> = {
    ava: new Set(["--config"]),
    biome: new Set(["--config-path"]),
    eslint: new Set(["-c", "--config"]),
    jest: new Set(["-c", "--config"]),
    mocha: new Set(["--config", "--package"]),
    oxlint: new Set(["-c", "--config", "--tsconfig"]),
    tsc: new Set(["-p", "--project"]),
    typescript: new Set(["-p", "--project"]),
    vite: new Set(["-c", "--config"]),
    vitest: new Set(["-c", "--config"]),
  };
  const options = optionsByExecutable[normalizedExecutable];
  if (!options) return [];
  const references: string[] = [];
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index]!;
    const equals = word.match(/^([^=]+)=(.+)$/);
    if (equals && options.has(equals[1]!) && looksLikeLocalValidationPath(equals[2]!)) {
      references.push(equals[2]!);
      continue;
    }
    if (options.has(word) && words[index + 1] && looksLikeLocalValidationPath(words[index + 1]!)) {
      references.push(words[index + 1]!);
      index += 1;
    }
  }
  return uniqueStrings(references);
}

function assertTrustedValidationEnvironment(words: readonly string[]) {
  let index = words[0] === "env" ? 1 : 0;
  while (index < words.length) {
    const match = words[index]!.match(/^([A-Za-z_][A-Za-z0-9_]*)=/);
    if (!match) break;
    const name = match[1]!.toUpperCase();
    if (isExecutionRoutingEnvironmentName(name)) {
      throw new Error(
        `validation_definition_untrusted: environment assignment ${name} can alter validation execution`,
      );
    }
    index += 1;
  }
}

function isExecutionRoutingEnvironmentName(name: string) {
  const exact = new Set([
    "BASHOPTS",
    "BASH_ENV",
    "CDPATH",
    "CC",
    "COMSPEC",
    "CXX",
    "DYLD_INSERT_LIBRARIES",
    "ENV",
    "GOENV",
    "GOFLAGS",
    "GOMOD",
    "GOMODCACHE",
    "GOPROXY",
    "GOROOT",
    "GOTOOLCHAIN",
    "GOWORK",
    "IFS",
    "JAVA_TOOL_OPTIONS",
    "JDK_JAVA_OPTIONS",
    "LD_PRELOAD",
    "MAKEFLAGS",
    "MFLAGS",
    "NODE_OPTIONS",
    "NODE_PATH",
    "PATH",
    "PATHEXT",
    "PERL5LIB",
    "PERL5OPT",
    "PYTHONHOME",
    "PYTHONPATH",
    "RUBYLIB",
    "RUBYOPT",
    "RUSTC",
    "RUSTC_WRAPPER",
    "RUSTC_WORKSPACE_WRAPPER",
    "RUSTFLAGS",
    "SHELL",
    "SHELLOPTS",
    "_JAVA_OPTIONS",
  ]);
  return (
    exact.has(name) ||
    [
      "BUN_CONFIG_",
      "BUN_INSTALL",
      "CARGO_",
      "COMPLUS_",
      "COREPACK_",
      "DOTNET_",
      "GIT_",
      "GRADLE_",
      "MAVEN_",
      "MSBUILD",
      "NPM_",
      "PNPM_",
      "YARN_",
    ].some((prefix) => name.startsWith(prefix))
  );
}

function interpreterArgumentValidationReferences(words: string[]) {
  const references: string[] = [];
  for (const word of words) {
    const optionValue = word.match(/^--(?:experimental-loader|import|loader|require)=(.+)$/)?.[1];
    if (optionValue && looksLikeLocalValidationPath(optionValue)) references.push(optionValue);
    if (looksLikeLocalValidationPath(word)) references.push(word);
  }
  return uniqueStrings(references);
}

function inlineValidationReferences(contents: string) {
  const references = [
    ...contents.matchAll(
      /["'`](\.{1,2}[\\/][^"'`]+|[A-Za-z0-9_.-]+(?:[\\/][A-Za-z0-9_.-]+)+\.(?:bash|cjs|js|mjs|ps1|py|rb|sh|ts|tsx))["'`]/gi,
    ),
  ]
    .map((match) => match[1]!)
    .filter(looksLikeLocalValidationPath);
  if (references.length === 0 && /(?:^|[^A-Za-z0-9_])\.{1,2}[\\/]/.test(contents)) {
    throw new Error("validation_definition_untrusted: unresolved dynamic validation reference");
  }
  return uniqueStrings(references);
}

function unwrapPackageExecutor(executable: string, words: string[]) {
  if (["npx", "npx.cmd"].includes(executable)) {
    return stripPackageExecutorOptions(words);
  }
  if (["npm", "npm.cmd"].includes(executable) && words[0] === "exec") {
    return stripPackageExecutorOptions(words.slice(1));
  }
  if (["pnpm", "pnpm.cmd"].includes(executable) && words[0] === "exec") {
    return stripPackageExecutorOptions(words.slice(1));
  }
  if (["bun", "bun.exe"].includes(executable) && words[0] === "x") {
    return stripPackageExecutorOptions(words.slice(1));
  }
  return null;
}

function stripPackageExecutorOptions(input: string[]) {
  const words = [...input];
  const valueOptions = new Set(["-p", "--package", "--cache", "--call", "-c"]);
  while (words.length > 0) {
    const word = words[0]!;
    if (word === "--") {
      words.shift();
      break;
    }
    if (!word.startsWith("-")) break;
    words.shift();
    if (valueOptions.has(word) && words.length > 0) words.shift();
  }
  return words;
}

function packageScriptReferences(contents: string) {
  const references = new Set<string>();
  for (const command of contents.split(/&&|\|\||[;|\n]/)) {
    for (const reference of packageScriptReferencesFromWords(shellCommandWords(command))) {
      references.add(reference);
    }
  }
  return references;
}

function packageScriptReferencesFromWords(input: string[]): string[] {
  assertTrustedValidationEnvironment(input);
  let words = stripEnvPrefix(input);
  while (words[0]?.startsWith("@") || words[0]?.startsWith("-")) {
    words[0] = words[0]!.slice(1);
    if (!words[0]) words.shift();
  }
  if (["cross-env", "cross-env-shell"].includes(words[0] ?? "")) {
    words = words.slice(1);
    assertTrustedValidationEnvironment(words);
    while (/^[A-Za-z_][A-Za-z0-9_]*=/.test(words[0] ?? "")) words.shift();
    if (words.length === 1) return [...packageScriptReferences(words[0]!)];
    return packageScriptReferencesFromWords(words);
  }
  if (["bash", "sh", "zsh"].includes(words[0] ?? "")) {
    const commandIndex = words.findIndex((word) => word === "-c");
    if (commandIndex >= 0) return [...packageScriptReferences(words[commandIndex + 1] ?? "")];
  }
  if (isWorkspacePackageInvocation(words)) {
    throw new Error(
      "validation_definition_untrusted: workspace package validation delegation is unsupported",
    );
  }
  const requirement = packageScriptRequirement(words);
  if (requirement) return [requirement.name];
  if (words[0] === "npm" && ["test", "start", "stop", "restart"].includes(words[1] ?? "")) {
    return [words[1]!];
  }
  if (words[0] === "npm" && words[1] === "run-script" && words[2]) {
    return [words[2]];
  }
  if (words[0] === "yarn") {
    const index = words[1] === "run" ? 2 : 1;
    const script = words[index];
    if (script && !["add", "install", "remove", "upgrade"].includes(script)) return [script];
  }
  return [];
}

function isWorkspacePackageInvocation(words: string[]) {
  const executable = words[0];
  const separator = words.indexOf("--");
  const packageManagerWords = separator >= 0 ? words.slice(0, separator) : words;
  if (executable === "pnpm") {
    return packageManagerWords
      .slice(1)
      .some(
        (word) =>
          /^(?:--filter|--dir)(?:=|$)/.test(word) ||
          /^(?:-F|-C).+/.test(word) ||
          ["-F", "-C", "--recursive", "-r", "--workspace-root", "-w"].includes(word),
      );
  }
  if (executable === "npm") {
    return packageManagerWords
      .slice(1)
      .some(
        (word) =>
          /^(?:--workspace|--prefix)(?:=|$)/.test(word) ||
          /^-w(?:=|.+)/.test(word) ||
          word === "-w" ||
          word === "--workspaces",
      );
  }
  if (executable === "bun") {
    return packageManagerWords.slice(1).some((word) => /^--filter(?:=|$)/.test(word));
  }
  if (executable === "yarn") {
    return packageManagerWords
      .slice(1)
      .some((word) => /^(?:workspace|workspaces)$|^--cwd(?:=|$)/.test(word));
  }
  return false;
}

function shellCommandWords(command: string) {
  return command.match(/"(?:\\.|[^"])*"|'[^']*'|[^\s;&|()<>]+/g)?.map(unquoteShellWord) ?? [];
}

function unquoteShellWord(word: string) {
  if (
    word.length >= 2 &&
    ((word.startsWith('"') && word.endsWith('"')) || (word.startsWith("'") && word.endsWith("'")))
  ) {
    return word.slice(1, -1);
  }
  return word;
}

function looksLikeLocalValidationPath(value: string) {
  if (value.startsWith("-")) return false;
  const normalized = value.replaceAll("\\", "/");
  return (
    normalized.startsWith("./") ||
    normalized.startsWith("../") ||
    normalized.includes("/") ||
    /\.(?:bash|cjs|js|mjs|ps1|py|rb|sh|ts|tsx)$/i.test(normalized)
  );
}

function normalizeValidationReference(originPath: string, reference: string) {
  const originDirectory = path.posix.dirname(originPath.replaceAll("\\", "/"));
  const expanded = reference
    .replace(/^["']|["',;)]+$/g, "")
    .replaceAll("\\", "/")
    .replace(/\$PSScriptRoot/gi, ".");
  if (!expanded || /[$*?[\]]/.test(expanded) || path.posix.isAbsolute(expanded)) return null;
  const normalized = path.posix.normalize(path.posix.join(originDirectory, expanded));
  if (normalized === ".." || normalized.startsWith("../")) return null;
  return normalized.replace(/^\.\//, "");
}

function assertTrustedDependencyPreparationDefinitions(
  cwd: string,
  baseBranch: string,
  toolchain: TargetRepoToolchain,
) {
  const currentPackageManager = targetPackageManager(cwd, toolchain);
  const trustedPackageManager = trustedBasePackageManager(cwd, baseBranch, toolchain);
  if (currentPackageManager !== trustedPackageManager) {
    throw new Error(
      `validation_definition_changed: package manager differs from origin/${baseBranch}`,
    );
  }
  const currentPackageManagerSpec = readCurrentPackageManagerSpec(cwd);
  const trustedPackageManagerSpec = readTrustedPackageManagerSpec(cwd, baseBranch);
  if (currentPackageManagerSpec !== trustedPackageManagerSpec) {
    throw new Error(
      `validation_definition_changed: packageManager differs from origin/${baseBranch}`,
    );
  }
  assertTrustedPackageDependencyGraph(cwd, baseBranch);
  for (const relativePath of [
    ".npmrc",
    ".pnpmfile.cjs",
    ".pnpmfile.js",
    ".pnpmfile.mjs",
    ".pnpmrc",
    "bunfig.toml",
    "pnpm-workspace.yaml",
    "pnpmfile.cjs",
    "pnpmfile.js",
    "pnpmfile.mjs",
  ]) {
    const absolutePath = path.join(cwd, relativePath);
    const current = readRepositoryRegularFile(absolutePath, "utf8");
    const trusted = readTrustedBaseFile(cwd, baseBranch, relativePath);
    if (current == null && repositoryPathExists(absolutePath)) {
      throw new Error(
        `validation_definition_changed: ${relativePath} is not a trusted regular file`,
      );
    }
    if (repositoryDefinitionDiffersFromBase(cwd, baseBranch, relativePath, current, trusted)) {
      throw new Error(
        `validation_definition_changed: ${relativePath} differs from origin/${baseBranch}`,
      );
    }
  }
}

function assertTrustedGoDependencyDefinitions(cwd: string, baseBranch: string) {
  for (const relativePath of ["go.mod", "go.sum", "go.work", "go.work.sum"]) {
    const current = readRepositoryRegularFile(path.join(cwd, relativePath), "utf8");
    const trusted = readTrustedBaseFile(cwd, baseBranch, relativePath);
    if (repositoryDefinitionDiffersFromBase(cwd, baseBranch, relativePath, current, trusted)) {
      throw new Error(
        `validation_definition_changed: Go dependency definition ${relativePath} differs from origin/${baseBranch}`,
      );
    }
  }
}

function assertTrustedPackageDependencyGraph(cwd: string, baseBranch: string) {
  const trustedPaths = run("git", ["ls-tree", "-r", "--name-only", `origin/${baseBranch}`], {
    cwd,
  })
    .split(/\r?\n/)
    .filter(Boolean);
  const repositoryPaths = uniqueStrings([...gitLsFiles(cwd), ...trustedPaths]);
  for (const relativePath of repositoryPaths.filter(
    (candidate) => path.posix.basename(candidate.replaceAll("\\", "/")) === "package.json",
  )) {
    const current = readRepositoryRegularFile(path.join(cwd, relativePath), "utf8");
    const trusted = readTrustedBaseFile(cwd, baseBranch, relativePath);
    if (
      packageInstallDefinition(current) !== packageInstallDefinition(trusted) ||
      repositoryDefinitionDiffersFromBaseForMissingFile(cwd, relativePath, current, trusted)
    ) {
      throw new Error(
        `validation_definition_changed: package dependency definition ${relativePath} differs from origin/${baseBranch}`,
      );
    }
  }

  const lockfileNames = new Set([
    "bun.lock",
    "bun.lockb",
    "npm-shrinkwrap.json",
    "package-lock.json",
    "pnpm-lock.yaml",
  ]);
  for (const relativePath of repositoryPaths.filter((candidate) =>
    lockfileNames.has(path.posix.basename(candidate.replaceAll("\\", "/"))),
  )) {
    const absolutePath = path.join(cwd, relativePath);
    if (repositoryPathExists(absolutePath) && !isRepositoryRegularFile(absolutePath)) {
      throw new Error(
        `validation_definition_changed: package lockfile ${relativePath} is not a trusted regular file`,
      );
    }
    const currentBlob = repositoryFileBlobId(cwd, relativePath);
    const trustedBlob = trustedBaseBlobId(cwd, baseBranch, relativePath);
    if (currentBlob !== trustedBlob) {
      throw new Error(
        `validation_definition_changed: package lockfile ${relativePath} differs from origin/${baseBranch}`,
      );
    }
  }
}

function repositoryDefinitionDiffersFromBaseForMissingFile(
  cwd: string,
  relativePath: string,
  current: string | null,
  trusted: string | null,
) {
  return (
    (current == null && repositoryPathExists(path.join(cwd, relativePath))) ||
    (current == null) !== (trusted == null)
  );
}

function packageInstallDefinition(contents: string | null) {
  if (contents == null) return null;
  try {
    const packageJson = JSON.parse(contents);
    return stableJson({
      bundleDependencies: packageJson.bundleDependencies ?? null,
      bundledDependencies: packageJson.bundledDependencies ?? null,
      cpu: packageJson.cpu ?? null,
      dependencies: packageJson.dependencies ?? null,
      devDependencies: packageJson.devDependencies ?? null,
      engines: packageJson.engines ?? null,
      libc: packageJson.libc ?? null,
      optionalDependencies: packageJson.optionalDependencies ?? null,
      os: packageJson.os ?? null,
      overrides: packageJson.overrides ?? null,
      peerDependencies: packageJson.peerDependencies ?? null,
      peerDependenciesMeta: packageJson.peerDependenciesMeta ?? null,
      pnpm: packageJson.pnpm ?? null,
      resolutions: packageJson.resolutions ?? null,
      trustedDependencies: packageJson.trustedDependencies ?? null,
      workspaces: packageJson.workspaces ?? null,
    });
  } catch {
    return null;
  }
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => `${JSON.stringify(key)}:${stableJson(entry)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function readCurrentPackageManagerSpec(cwd: string) {
  try {
    const contents = readRepositoryRegularFile(path.join(cwd, "package.json"), "utf8");
    if (contents == null) return null;
    return String(JSON.parse(contents).packageManager ?? "");
  } catch {
    return null;
  }
}

function readTrustedPackageManagerSpec(cwd: string, baseBranch: string) {
  const packageJson = readTrustedBaseFile(cwd, baseBranch, "package.json");
  if (packageJson == null) return null;
  try {
    return String(JSON.parse(packageJson).packageManager ?? "");
  } catch {
    return null;
  }
}

function trustedBasePackageManager(
  cwd: string,
  baseBranch: string,
  toolchain: TargetRepoToolchain,
): TargetRepoToolchain["packageManager"] | null {
  if (toolchain.packageManagerExplicit) return toolchain.packageManager;
  const packageJson = readTrustedBaseFile(cwd, baseBranch, "package.json");
  if (packageJson != null) {
    try {
      const declared = String(JSON.parse(packageJson).packageManager ?? "")
        .trim()
        .split("@")[0];
      if (declared === "pnpm" || declared === "bun" || declared === "npm") return declared;
      if (declared) return null;
    } catch {
      return null;
    }
  }
  if (readTrustedBaseFile(cwd, baseBranch, "bun.lock") != null) return "bun";
  if (readTrustedBaseFile(cwd, baseBranch, "bun.lockb") != null) return "bun";
  if (readTrustedBaseFile(cwd, baseBranch, "pnpm-lock.yaml") != null) return "pnpm";
  if (readTrustedBaseFile(cwd, baseBranch, "package-lock.json") != null) return "npm";
  if (readTrustedBaseFile(cwd, baseBranch, "npm-shrinkwrap.json") != null) return "npm";
  if (readTrustedBaseFile(cwd, baseBranch, "yarn.lock") != null) return null;
  return toolchain.packageManager;
}

function readTrustedBaseFile(cwd: string, baseBranch: string, relativePath: string) {
  try {
    return run("git", ["show", `origin/${baseBranch}:${relativePath}`], { cwd });
  } catch {
    return null;
  }
}

function repositoryDefinitionDiffersFromBase(
  cwd: string,
  baseBranch: string,
  relativePath: string,
  current: string | null,
  trusted: string | null,
) {
  if (current == null && repositoryPathExists(path.join(cwd, relativePath))) return true;
  if ((current == null) !== (trusted == null)) return true;
  if (current == null) return false;
  return (
    run(
      "git",
      [
        "diff",
        "--no-ext-diff",
        "--no-textconv",
        "--name-only",
        `origin/${baseBranch}`,
        "--",
        relativePath,
      ],
      { cwd },
    ).trim() !== ""
  );
}

function findTrustedBasePath(
  cwd: string,
  baseBranch: string,
  names: readonly string[],
): string | null {
  const exactEntries = new Set(
    run("git", ["ls-tree", "--name-only", `origin/${baseBranch}`], { cwd })
      .split(/\r?\n/)
      .filter(Boolean),
  );
  return names.find((name) => exactEntries.has(name)) ?? null;
}

function readTrustedPackageScript(cwd: string, baseBranch: string, name: string) {
  const packageJson = readTrustedBaseFile(cwd, baseBranch, "package.json");
  if (packageJson == null) return null;
  try {
    const scripts = JSON.parse(packageJson).scripts;
    if (!scripts || !Object.hasOwn(scripts, name)) return null;
    return String(scripts[name] ?? "");
  } catch {
    return null;
  }
}

function readPackageScript(cwd: string, name: string) {
  try {
    const contents = readRepositoryRegularFile(path.join(cwd, "package.json"), "utf8");
    if (contents == null) return null;
    const scripts = JSON.parse(contents).scripts;
    if (!scripts || !Object.hasOwn(scripts, name)) return null;
    return String(scripts[name] ?? "");
  } catch {
    return null;
  }
}

function dotnetRestoreSpecs(
  cwd: string,
  toolchain: TargetRepoToolchain,
  validationCommands: LooseRecord[],
): DotnetRestoreSpec[] {
  const commands = [...toolchain.baseValidationCommands, ...validationCommands];
  const configured = commands.flatMap((command) => {
    try {
      const parts = stripEnvPrefix(parseAllowedValidationCommand(command));
      if (parts[0] !== "dotnet" || !["build", "restore", "test"].includes(parts[1] ?? "")) {
        return [];
      }
      return [dotnetRestoreSpec(parts, cwd)];
    } catch {
      return [];
    }
  });
  const scriptDriven = commands.some((command) => {
    try {
      const parts = stripEnvPrefix(parseAllowedValidationCommand(command));
      return parts[0] === "pwsh" && parts[1] === "-File";
    } catch {
      return false;
    }
  });
  const dotnetTargets = rootDotnetTargets(cwd);
  const specs = [
    ...configured,
    ...(scriptDriven ? dotnetTargets.map((target) => ({ args: [], target })) : []),
  ].filter((spec) => fs.existsSync(path.resolve(cwd, spec.target)));
  return [
    ...new Map(specs.map((spec) => [dotnetRestoreSpecKey(cwd, spec), spec] as const)).values(),
  ];
}

function isDotnetSolution(name: string) {
  return name.endsWith(".sln") || name.endsWith(".slnf") || name.endsWith(".slnx");
}

function isDotnetProject(name: string) {
  return /\.(?:csproj|fsproj|vbproj)$/i.test(name);
}

function rootDotnetTargets(cwd: string) {
  const rootEntries = fs
    .readdirSync(cwd, { withFileTypes: true })
    .filter((entry) => entry.isFile());
  const solutions = rootEntries.filter((entry) => isDotnetSolution(entry.name));
  const projects = rootEntries.filter((entry) => isDotnetProject(entry.name));
  return (solutions.length > 0 ? solutions : projects).map((entry) => `./${entry.name}`).sort();
}

function dotnetCommandTarget(parts: string[], cwd: string) {
  const args = parts.slice(2);
  const explicitProject = args.find((part) =>
    /\.(?:sln|slnf|slnx|csproj|fsproj|vbproj)$/i.test(part),
  );
  if (explicitProject) return explicitProject;
  const valueOptions = new Set([
    "--arch",
    "--artifacts-path",
    "--blame-crash-dump-type",
    "--blame-hang-dump-type",
    "--blame-hang-timeout",
    "--collect",
    "--configuration",
    "--diag",
    "--environment",
    "--filter",
    "--framework",
    "--logger",
    "--maxcpucount",
    "--os",
    "--property",
    "--results-directory",
    "--runtime",
    "--settings",
    "--test-adapter-path",
    "--tl",
    "--verbosity",
    "-c",
    "-f",
    "-l",
    "-m",
    "-p",
    "-r",
    "-s",
    "-v",
  ]);
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]!;
    if (argument.startsWith("-")) {
      if (!argument.includes("=") && valueOptions.has(argument)) index += 1;
      continue;
    }
    if (fs.existsSync(path.resolve(cwd, argument))) return argument;
  }
  return ".";
}

function dotnetRestoreSpec(parts: string[], cwd: string): DotnetRestoreSpec {
  return {
    target: dotnetCommandTarget(parts, cwd),
    args: dotnetRestoreArguments(parts),
  };
}

function dotnetRestoreArguments(parts: string[]) {
  const args: string[] = [];
  const mappings = new Map<string, { option?: string; property?: string }>([
    ["--arch", { option: "--arch" }],
    ["--configuration", { property: "Configuration" }],
    ["--framework", { property: "TargetFramework" }],
    ["--os", { option: "--os" }],
    ["--property", { option: "--property" }],
    ["--runtime", { option: "--runtime" }],
    ["-c", { property: "Configuration" }],
    ["-f", { property: "TargetFramework" }],
    ["-p", { option: "--property" }],
    ["-r", { option: "--runtime" }],
  ]);
  const commandArgs = parts.slice(2);
  for (let index = 0; index < commandArgs.length; index += 1) {
    const argument = commandArgs[index]!;
    if (argument === "--") break;
    if (argument === "--self-contained") {
      args.push("--property", "SelfContained=true");
      continue;
    }
    if (argument === "--no-self-contained") {
      args.push("--property", "SelfContained=false");
      continue;
    }
    if (argument === "--use-current-runtime") {
      args.push("--use-current-runtime");
      continue;
    }
    const optionValue = argument.match(/^([^=:]+)(?:=|:)(.+)$/);
    const option = optionValue?.[1] ?? argument;
    const mapping = mappings.get(option.toLowerCase());
    if (!mapping) continue;
    const value = optionValue?.[2] ?? commandArgs[index + 1];
    if (!value) continue;
    if (!optionValue) index += 1;
    args.push(
      mapping.option ?? "--property",
      mapping.property ? `${mapping.property}=${value}` : value,
    );
  }
  return args;
}

function markDotnetTargetPrepared(cwd: string, spec: DotnetRestoreSpec) {
  const markerPath = targetValidationCachePath(cwd, "dotnet-restored-targets.json");
  const targets = readPreparedDotnetTargets(markerPath);
  targets.set(dotnetRestoreSpecKey(cwd, spec), dotnetRestoreInputFingerprint(cwd));
  fs.writeFileSync(
    markerPath,
    `${JSON.stringify(Object.fromEntries([...targets.entries()].sort()), null, 2)}\n`,
  );
}

function isDotnetTargetPrepared(cwd: string, spec: DotnetRestoreSpec | null) {
  if (!spec) return false;
  const markerPath = targetValidationCachePath(cwd, "dotnet-restored-targets.json");
  return (
    readPreparedDotnetTargets(markerPath).get(dotnetRestoreSpecKey(cwd, spec)) ===
    dotnetRestoreInputFingerprint(cwd)
  );
}

function dotnetRestoreSpecKey(cwd: string, spec: DotnetRestoreSpec) {
  return `${normalizeDotnetTarget(cwd, spec.target)}\0${renderValidationCommand(spec.args)}`;
}

function readPreparedDotnetTargets(markerPath: string) {
  try {
    const parsed = JSON.parse(fs.readFileSync(markerPath, "utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return new Map<string, string>();
    }
    return new Map(
      Object.entries(parsed)
        .filter((entry): entry is [string, string] => typeof entry[1] === "string")
        .map(([target, fingerprint]) => [target, fingerprint]),
    );
  } catch {
    return new Map<string, string>();
  }
}

function dotnetRestoreInputFingerprint(cwd: string) {
  const hash = crypto.createHash("sha256");
  const repositoryPaths = uniqueStrings([
    ...gitLsFiles(cwd),
    ...targetCommittableState(cwd).keys(),
  ]).sort();
  const paths = dotnetRestoreInputPaths(cwd, repositoryPaths);
  for (const relativePath of paths) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(repositoryPathFingerprint(cwd, relativePath));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function dotnetRestoreInputPaths(cwd: string, repositoryPaths: string[]) {
  const repositoryPathSet = new Set(repositoryPaths);
  const inputs = new Set(repositoryPaths.filter(isDotnetRestoreInput));
  const pending = [...inputs].filter(isMsbuildImportContainer);
  while (pending.length > 0) {
    const relativePath = pending.shift()!;
    const contents = readRepositoryRegularFile(path.join(cwd, relativePath), "utf8");
    if (contents == null) continue;
    for (const importedPath of resolveRepositoryMsbuildImports(
      relativePath,
      contents,
      repositoryPathSet,
    )) {
      if (inputs.has(importedPath)) continue;
      inputs.add(importedPath);
      if (isMsbuildImportContainer(importedPath)) pending.push(importedPath);
    }
  }
  return [...inputs].sort();
}

function isDotnetRestoreInput(relativePath: string) {
  const name = path.basename(relativePath).toLowerCase();
  return (
    /\.(?:cs|fs|vb)proj$/i.test(relativePath) ||
    /\.(?:proj|projitems)$/i.test(relativePath) ||
    /\.(?:sln|slnf|slnx)$/i.test(relativePath) ||
    /\.runsettings$/i.test(relativePath) ||
    /\.(?:props|targets)$/i.test(relativePath) ||
    /\.rsp$/i.test(relativePath) ||
    name === "global.json" ||
    name === "nuget.config" ||
    name === "packages.config" ||
    name === "packages.lock.json" ||
    name === "project.json"
  );
}

function isMsbuildImportContainer(relativePath: string) {
  return /\.(?:csproj|fsproj|vbproj|proj|projitems|props|targets)$/i.test(relativePath);
}

function resolveRepositoryMsbuildImports(
  importerPath: string,
  contents: string,
  repositoryPaths: Set<string>,
) {
  const importerDirectory = path.posix.dirname(importerPath);
  const imports = new Set<string>();
  for (const match of contents.matchAll(/<Import\b[^>]*\bProject\s*=\s*["']([^"']+)["']/gi)) {
    const originalExpression = match[1]!.replaceAll("\\", "/");
    const expression = originalExpression
      .replaceAll("$(MSBuildThisFileDirectory)", "")
      .replaceAll("$(MSBuildProjectDirectory)", ".");
    if (path.posix.isAbsolute(expression)) continue;
    if (/[$*?[\]]/.test(expression)) {
      const candidates = dynamicRepositoryMsbuildImportCandidates(
        importerDirectory,
        expression,
        repositoryPaths,
      );
      if (candidates.length === 0 && !isExternalMsbuildImportExpression(expression)) {
        throw new Error(
          `validation_definition_untrusted: unresolved MSBuild import ${originalExpression}`,
        );
      }
      for (const candidate of candidates) imports.add(candidate);
      continue;
    }
    const normalized = path.posix.normalize(path.posix.join(importerDirectory, expression));
    if (normalized.startsWith("../") || path.posix.isAbsolute(normalized)) continue;
    if (repositoryPaths.has(normalized)) imports.add(normalized);
  }
  return imports;
}

function dynamicRepositoryMsbuildImportCandidates(
  importerDirectory: string,
  expression: string,
  repositoryPaths: Set<string>,
) {
  const staticTail = expression.replace(/^.*\$\([^)]+\)/, "").replace(/^\/+/, "");
  if (!staticTail) return [];
  const normalizedPattern = path.posix.normalize(path.posix.join(importerDirectory, staticTail));
  const suffixPattern = path.posix.normalize(staticTail);
  const pattern = new RegExp(
    `(?:^|/)${globPatternToRegExpSource(
      normalizedPattern.startsWith("../") ? suffixPattern : normalizedPattern,
    )}$`,
  );
  return [...repositoryPaths].filter((relativePath) => pattern.test(relativePath));
}

function isExternalMsbuildImportExpression(expression: string) {
  return /^\$\((?:MSBuildBinPath|MSBuildExtensionsPath(?:32|64)?|MSBuildSDKsPath|MSBuildToolsPath|NETCoreSdkBundledVersionsProps|NuGetPackageRoot)\)(?:\/|$)/i.test(
    expression,
  );
}

function globPatternToRegExpSource(value: string) {
  return value
    .split("")
    .map((character) => {
      if (character === "*") return "[^/]*";
      if (character === "?") return "[^/]";
      return escapeRegExp(character);
    })
    .join("");
}

function normalizeDotnetTarget(cwd: string, target: string) {
  const normalized = path.resolve(cwd, target);
  return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}

function targetPackageManager(
  cwd: string,
  toolchain: TargetRepoToolchain,
): TargetRepoToolchain["packageManager"] | null {
  return toolchain.packageManagerExplicit
    ? toolchain.packageManager
    : detectTargetPackageManager(cwd, toolchain.packageManager);
}

function detectTargetPackageManager(
  cwd: string,
  configured: TargetRepoToolchain["packageManager"],
): TargetRepoToolchain["packageManager"] | null {
  const packagePath = path.join(cwd, "package.json");
  try {
    const contents = readRepositoryRegularFile(packagePath, "utf8");
    if (contents != null) {
      const pkg = JSON.parse(contents);
      const packageManager = String(pkg.packageManager ?? "").trim();
      if (packageManager) {
        const declared = packageManager.split("@")[0];
        if (declared === "pnpm" || declared === "bun" || declared === "npm") return declared;
        return null;
      }
    } else if (repositoryPathExists(packagePath)) {
      return null;
    }
  } catch {
    // Lockfiles and configured toolchain remain sufficient.
  }
  if (fs.existsSync(path.join(cwd, "bun.lock")) || fs.existsSync(path.join(cwd, "bun.lockb"))) {
    return "bun";
  }
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (
    fs.existsSync(path.join(cwd, "package-lock.json")) ||
    fs.existsSync(path.join(cwd, "npm-shrinkwrap.json"))
  ) {
    return "npm";
  }
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return null;
  return configured;
}

export function repairDeltaValidationPlan(
  { fixArtifact, targetDir, sourceHead }: LooseRecord,
  options: TargetValidationOptions,
): RepairDeltaValidationPlan {
  const commands = fixArtifact.validation_commands ?? [];
  const changedSurface = {
    commands,
    options: { ...options, requireTrustedValidationBaseline: true },
    scope: "changed-surface" as const,
    changed_files: [],
    reason: "validate the full changed surface against the target base branch",
  };
  if (options.targetRepo !== "openclaw/openclaw") return changedSurface;
  if (fixArtifact.repair_strategy !== "repair_contributor_branch") return changedSurface;
  const sourceRef = String(sourceHead ?? "");
  if (!/^[0-9a-f]{40}$/i.test(sourceRef)) return changedSurface;
  if (!isAncestor({ targetDir, ancestor: sourceRef, descendant: "HEAD" })) return changedSurface;

  const changedFiles = changedFilesSinceRef(targetDir, sourceRef);
  if (changedFiles.length === 0 || !changedFiles.every(isDocsOnlyRepairDeltaFile)) {
    return { ...changedSurface, changed_files: changedFiles };
  }

  return {
    commands: [`git diff --check ${sourceRef}..HEAD`],
    options: { ...options, skipOpenClawChangedGate: true },
    scope: "repair-delta-docs",
    changed_files: changedFiles,
    reason:
      "adopted PR repair changed only docs/changelog files since the source head; validate the repair delta and let PR checks gate the existing source diff",
  };
}

export function canSkipInternalCodexReviewForRepairDelta(plan: LooseRecord) {
  return String(plan?.scope ?? "") === "repair-delta-docs";
}

function validationFallbackCommands({ parts, error, cwd, baseBranch, options }: LooseRecord) {
  if (options.strictTargetValidation) return [];
  if (!isChangedGateCommand(parts, options)) return [];
  if (/no merge base/i.test(String(error?.message ?? ""))) {
    ensureMergeBaseAvailable({ targetDir: cwd, baseBranch, fetchBase: false });
    return [parts];
  }
  if (!isChangedGateStall(error)) return [];
  const changedTests = changedTestFiles(cwd, baseBranch);
  return [
    ["git", "diff", "--check", `origin/${baseBranch}...HEAD`],
    ...(changedTests.length > 0 ? [["pnpm", "test:serial", ...changedTests]] : []),
  ];
}

function isChangedGateStall(error: JsonValue) {
  return /no output for \d+ms|terminating stalled Vitest|stalled Vitest process/i.test(
    String(error?.message ?? ""),
  );
}

function shouldRetryValidationCommand({ parts, error, attempts, options }: LooseRecord) {
  if (options.strictTargetValidation) return false;
  if (!isChangedGateCommand(parts, options)) return false;
  if (isChangedGateStall(error)) return false;

  const configuredRetries = Number.parseInt(process.env.CLAWSWEEPER_VALIDATION_RETRIES ?? "1", 10);
  const maxRetries = Number.isFinite(configuredRetries) ? Math.max(0, configuredRetries) : 1;
  const rendered = renderValidationCommand(parts);
  const used = attempts.get(rendered) ?? 0;
  if (used >= maxRetries) return false;
  attempts.set(rendered, used + 1);
  return true;
}

function targetValidationEnv(cwd: string, validationRunDir: string | null = null) {
  const cacheDir = targetValidationCachePath(cwd);
  const pnpmStoreDir = targetValidationCachePath(cwd, "pnpm-store");
  const nullDevice = process.platform === "win32" ? "NUL" : "/dev/null";
  ensureTrustedValidationCacheDirectory(cwd, pnpmStoreDir);
  for (const name of [
    "go-build",
    "go-mod",
    "nuget",
    "dotnet-home",
    "tmp",
    "xdg-cache",
    "pnpm-store",
    "npm-cache",
    "bun-cache",
    "corepack-home",
    "corepack-bin",
  ]) {
    ensureTrustedValidationCacheDirectory(cwd, path.join(cacheDir, name));
  }
  const gitConfigPath = targetValidationCachePath(cwd, "gitconfig");
  writeTrustedValidationCacheFile(cwd, gitConfigPath, "");
  run("git", ["config", "--file", gitConfigPath, "--add", "safe.directory", cwd], { cwd });
  const writableCacheRoot = validationRunDir ?? cacheDir;
  if (validationRunDir) {
    for (const name of ["go-build", "dotnet-home", "tmp", "xdg-cache", "npm-cache", "bun-cache"]) {
      ensureTrustedValidationCacheDirectory(cwd, path.join(validationRunDir, name));
    }
  }
  const tempDir = path.join(writableCacheRoot, "tmp");
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    CI: process.env.CI ?? "true",
    COREPACK_ENABLE_STRICT: "0",
    COREPACK_HOME: targetValidationCachePath(cwd, "corepack-home"),
    DOTNET_CLI_HOME: path.join(writableCacheRoot, "dotnet-home"),
    GIT_CONFIG_GLOBAL: gitConfigPath,
    GIT_CONFIG_NOSYSTEM: "1",
    GOCACHE: path.join(writableCacheRoot, "go-build"),
    GOMODCACHE: targetValidationCachePath(cwd, "go-mod"),
    GOTOOLCHAIN: "local",
    NUGET_PACKAGES: targetValidationCachePath(cwd, "nuget"),
    OPENCLAW_LOCAL_CHECK: process.env.OPENCLAW_LOCAL_CHECK ?? "0",
    BUN_INSTALL_CACHE_DIR: path.join(writableCacheRoot, "bun-cache"),
    npm_config_cache: path.join(writableCacheRoot, "npm-cache"),
    npm_config_store_dir: pnpmStoreDir,
    PATH: process.env.PATH,
    TEMP: tempDir,
    TMP: tempDir,
    TMPDIR: tempDir,
    XDG_CACHE_HOME: path.join(writableCacheRoot, "xdg-cache"),
  };
  for (const key of Object.keys(env)) {
    if (isSensitiveTargetEnvName(key)) delete env[key];
  }
  env.NPM_CONFIG_CACHE = path.join(writableCacheRoot, "npm-cache");
  env.NPM_CONFIG_STORE_DIR = pnpmStoreDir;
  env.NPM_CONFIG_USERCONFIG = nullDevice;
  env.PNPM_STORE_DIR = pnpmStoreDir;
  env.npm_config_userconfig = nullDevice;
  return env;
}

function createTargetValidationRunDirectory(cwd: string) {
  return fs.mkdtempSync(path.join(targetValidationCachePath(cwd), "run-"));
}

function targetValidationCachePath(cwd: string, ...parts: string[]) {
  return path.join(targetValidationState(cwd).cacheRoot, ...parts);
}

function targetValidationState(cwd: string) {
  const key = fs.realpathSync(cwd);
  let state = targetValidationStates.get(key);
  if (!state) {
    const cacheRoot = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-validation-cache-"));
    fs.chmodSync(cacheRoot, 0o700);
    state = {
      cacheRoot,
      packageDependencyBaseSha: null,
      packageDependencyFingerprint: null,
      packageDependencyVerificationRequired: true,
      preparedIgnoredEntries: [],
      preparedStateStale: false,
      trustedIgnoredEntries: [],
    };
    targetValidationStates.set(key, state);
  }
  return state;
}

function assertPreparedPackageDependencyState(cwd: string, baseBranch: string) {
  const state = targetValidationState(cwd);
  const expected = state.packageDependencyFingerprint;
  if (expected == null) return;
  const currentBaseSha = run("git", ["rev-parse", `origin/${baseBranch}`], { cwd }).trim();
  if (state.packageDependencyBaseSha !== currentBaseSha) {
    throw new Error(
      `validation_dependency_base_changed: package dependencies were prepared for ${state.packageDependencyBaseSha ?? "no base"} instead of ${currentBaseSha}`,
    );
  }
  if (!state.packageDependencyVerificationRequired) return;
  const actual = packageDependencyStateFingerprint(cwd);
  if (actual !== expected) {
    throw new Error(
      "validation_dependency_state_changed: prepared package dependencies changed after trusted setup",
    );
  }
  state.packageDependencyVerificationRequired = false;
}

function packageDependencyStateFingerprint(cwd: string) {
  const hash = crypto.createHash("sha256");
  for (const packageRoot of targetPackageRoots(cwd)) {
    const relativePath = packageRoot === "." ? "node_modules" : `${packageRoot}/node_modules`;
    hash.update(relativePath);
    hash.update("\0");
    updatePathFingerprint(hash, path.join(cwd, relativePath));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function updatePathFingerprint(hash: crypto.Hash, absolutePath: string) {
  let stat: fs.Stats;
  try {
    stat = fs.lstatSync(absolutePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      hash.update("missing");
      return;
    }
    throw error;
  }
  hash.update(
    `${stat.mode}:${stat.dev}:${stat.ino}:${stat.size}:${stat.mtimeMs}:${stat.ctimeMs}:${stat.nlink}:`,
  );
  if (stat.isSymbolicLink()) {
    hash.update(`symlink:${fs.readlinkSync(absolutePath)}`);
    return;
  }
  if (stat.isFile()) {
    hash.update("file");
    return;
  }
  if (!stat.isDirectory()) {
    hash.update(`other:${stat.size}`);
    return;
  }
  hash.update("directory:");
  for (const entry of fs.readdirSync(absolutePath).sort()) {
    hash.update(entry);
    hash.update("\0");
    updatePathFingerprint(hash, path.join(absolutePath, entry));
    hash.update("\0");
  }
}

function removeIgnoredPackageLifecycleOutputs(cwd: string, ignoredBefore: Set<string>) {
  const dependencyPaths = targetPackageRoots(cwd).map((packageRoot) =>
    packageRoot === "." ? "node_modules" : `${packageRoot.replace(/\/+$/, "")}/node_modules`,
  );
  for (const relativePath of ignoredRepositoryEntries(cwd)) {
    const normalized = relativePath.replaceAll("\\", "/").replace(/\/+$/, "");
    if (
      !normalized ||
      ignoredBefore.has(relativePath) ||
      dependencyPaths.some(
        (nodeModules) => normalized === nodeModules || normalized.startsWith(`${nodeModules}/`),
      )
    ) {
      continue;
    }
    fs.rmSync(safeTargetPath(cwd, normalized), { recursive: true, force: true });
  }
}

function clearMutablePackageValidationCaches(cwd: string) {
  for (const packageRoot of targetPackageRoots(cwd)) {
    const nodeModules =
      packageRoot === "."
        ? path.join(cwd, "node_modules")
        : path.join(cwd, packageRoot, "node_modules");
    let stat: fs.Stats;
    try {
      stat = fs.lstatSync(nodeModules);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw error;
    }
    if (!stat.isDirectory() || stat.isSymbolicLink()) continue;
    for (const name of [".vite", ".vite-temp"]) {
      fs.rmSync(path.join(nodeModules, name), { recursive: true, force: true });
    }
  }
}

function removeDotnetIntermediateState(cwd: string) {
  const trackedPaths = gitLsFiles(cwd);
  const visit = (directory: string, relativeDirectory: string) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name === ".git" || entry.name === "node_modules") continue;
      const relativePath = relativeDirectory ? `${relativeDirectory}/${entry.name}` : entry.name;
      const absolutePath = path.join(directory, entry.name);
      if (entry.name === "obj" || entry.name === "bin") {
        const prefix = `${relativePath}/`;
        if (
          !trackedPaths.some(
            (trackedPath) => trackedPath === relativePath || trackedPath.startsWith(prefix),
          )
        ) {
          fs.rmSync(absolutePath, { recursive: true, force: true });
          continue;
        }
      }
      if (entry.isDirectory() && !entry.isSymbolicLink()) visit(absolutePath, relativePath);
    }
  };
  visit(cwd, "");
}

function ensureTrustedValidationCacheDirectory(cwd: string, directory: string) {
  const root = path.resolve(targetValidationState(cwd).cacheRoot);
  const absoluteDirectory = path.resolve(directory);
  const relative = path.relative(root, absoluteDirectory);
  if (relative === ".." || relative.startsWith(`..${path.sep}`)) {
    throw new Error(`validation_cache_path_untrusted: invalid cache path ${directory}`);
  }
  if (!relative) return;
  let current = root;
  for (const part of relative.split(path.sep)) {
    current = path.join(current, part);
    try {
      const stat = fs.lstatSync(current);
      if (!stat.isDirectory() || stat.isSymbolicLink()) {
        throw new Error(`validation_cache_path_untrusted: ${current} is not a trusted directory`);
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      fs.mkdirSync(current);
      const stat = fs.lstatSync(current);
      if (!stat.isDirectory() || stat.isSymbolicLink()) {
        throw new Error(`validation_cache_path_untrusted: ${current} is not a trusted directory`);
      }
    }
  }
}

function writeTrustedValidationCacheFile(cwd: string, file: string, contents: string) {
  ensureTrustedValidationCacheDirectory(cwd, path.dirname(file));
  let initial: fs.Stats | null = null;
  try {
    initial = fs.lstatSync(file);
    if (!initial.isFile() || initial.isSymbolicLink() || initial.nlink !== 1) {
      throw new Error(`validation_cache_path_untrusted: ${file} is not a trusted regular file`);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  const noFollow =
    ("O_NOFOLLOW" in fs.constants ? (fs.constants as Record<string, number>).O_NOFOLLOW : 0) ?? 0;
  let descriptor: number;
  try {
    descriptor = fs.openSync(file, fs.constants.O_WRONLY | fs.constants.O_CREAT | noFollow, 0o600);
  } catch (error) {
    if (String((error as NodeJS.ErrnoException).code) === "ELOOP") {
      throw new Error(`validation_cache_path_untrusted: ${file} is not a trusted regular file`);
    }
    throw error;
  }
  try {
    const opened = fs.fstatSync(descriptor);
    if (
      !opened.isFile() ||
      opened.nlink !== 1 ||
      (initial != null && (opened.dev !== initial.dev || opened.ino !== initial.ino))
    ) {
      throw new Error(`validation_cache_path_untrusted: ${file} is not a trusted regular file`);
    }
    fs.ftruncateSync(descriptor, 0);
    fs.writeFileSync(descriptor, contents);
  } finally {
    fs.closeSync(descriptor);
  }
}

function targetCommittableState(cwd: string, allowUnsafeAncestors = false) {
  return targetCommittableStateForPaths(cwd, targetCommittablePaths(cwd), allowUnsafeAncestors);
}

function targetCommittablePaths(cwd: string) {
  return uniqueStrings([
    ...splitNul(run("git", ["diff", "--no-ext-diff", "--name-only", "-z", "HEAD", "--"], { cwd })),
    ...splitNul(run("git", ["ls-files", "--others", "--exclude-standard", "-z"], { cwd })),
    ...targetExecutionControlPaths(cwd),
  ]).sort();
}

function targetExecutionControlPaths(cwd: string) {
  const names = [
    ".npmrc",
    ".pnpmfile.cjs",
    ".pnpmfile.js",
    ".pnpmfile.mjs",
    ".pnpmrc",
    ".yarnrc",
    ".yarnrc.yml",
    "bunfig.toml",
    "pnpmfile.cjs",
    "pnpmfile.js",
    "pnpmfile.mjs",
  ];
  const packageRoots = targetPackageManifestRoots(cwd);
  return uniqueStrings([
    ...packageRoots.flatMap((packageRoot) =>
      names.map((name) => (packageRoot === "." ? name : `${packageRoot}/${name}`)),
    ),
    ".cargo/config",
    ".cargo/config.toml",
  ]).sort();
}

function targetPackageManifestRoots(cwd: string) {
  return uniqueStrings([
    ".",
    ...uniqueStrings([
      ...gitLsFiles(cwd),
      ...splitNul(run("git", ["ls-files", "--others", "--exclude-standard", "-z"], { cwd })),
    ])
      .filter(
        (relativePath) =>
          path.posix.basename(relativePath.replaceAll("\\", "/")) === "package.json",
      )
      .map((relativePath) => path.posix.dirname(relativePath.replaceAll("\\", "/"))),
  ]);
}

function ignoredRepositoryEntries(cwd: string) {
  return new Set(
    splitNul(
      run("git", ["ls-files", "--others", "--ignored", "--exclude-standard", "--directory", "-z"], {
        cwd,
      }),
    )
      .map((relativePath) => relativePath.replaceAll("\\", "/").replace(/\/+$/, ""))
      .filter(Boolean),
  );
}

function snapshotIgnoredRepositoryEntries(cwd: string) {
  const dependencyPaths = targetPackageManifestRoots(cwd).map((packageRoot) =>
    packageRoot === "." ? "node_modules" : `${packageRoot.replace(/\/+$/, "")}/node_modules`,
  );
  return [...ignoredRepositoryEntries(cwd)].filter(
    (relativePath) =>
      relativePath !== ".clawsweeper-validation-cache" &&
      !relativePath.startsWith(".clawsweeper-validation-cache/") &&
      !dependencyPaths.some(
        (nodeModules) => relativePath === nodeModules || relativePath.startsWith(`${nodeModules}/`),
      ),
  );
}

function targetCommittableStateForPaths(
  cwd: string,
  paths: string[],
  allowUnsafeAncestors = false,
) {
  return new Map(
    paths.map((relativePath) => [
      relativePath,
      targetPathFingerprint(cwd, relativePath, allowUnsafeAncestors),
    ]),
  );
}

function captureTargetCommittableSnapshot(
  cwd: string,
  allowedMutationPaths: string[] = [],
  allowNewIgnored = false,
): TargetCommittableSnapshot {
  const paths = uniqueStrings([
    ...targetCommittablePaths(cwd),
    ...snapshotIgnoredRepositoryEntries(cwd),
    ...allowedMutationPaths,
  ]).sort();
  assertTargetSnapshotWithinBudget(cwd, paths);
  const state = targetCommittableStateForPaths(cwd, paths);
  const backupDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-target-state-"));
  const backups = new Map<string, string>();
  try {
    let backupIndex = 0;
    for (const [relativePath, fingerprint] of state) {
      if (fingerprint === "missing") continue;
      const source = safeTargetPath(cwd, relativePath);
      const destination = path.join(backupDir, `path-${backupIndex}`);
      backupIndex += 1;
      fs.cpSync(source, destination, {
        dereference: false,
        preserveTimestamps: true,
        recursive: true,
      });
      backups.set(relativePath, destination);
    }

    const indexPath = targetGitIndexPath(cwd);
    const indexFingerprint = targetGitIndexFingerprint(cwd);
    const indexBackup = fs.existsSync(indexPath) ? path.join(backupDir, "git-index") : null;
    if (indexBackup) fs.copyFileSync(indexPath, indexBackup);

    return {
      allowNewIgnored,
      allowedMutationPaths: new Set(allowedMutationPaths),
      backupDir,
      backups,
      ignoredEntries: ignoredRepositoryEntries(cwd),
      indexBackup,
      indexFingerprint,
      state,
      trackedPaths: new Set(splitNul(run("git", ["ls-files", "-z"], { cwd }))),
    };
  } catch (error) {
    fs.rmSync(backupDir, { recursive: true, force: true });
    throw error;
  }
}

function assertTargetSnapshotWithinBudget(cwd: string, relativePaths: string[]) {
  const maxBytes = boundedSnapshotLimit(
    "CLAWSWEEPER_TARGET_SNAPSHOT_MAX_BYTES",
    DEFAULT_TARGET_SNAPSHOT_MAX_BYTES,
  );
  const maxFiles = boundedSnapshotLimit(
    "CLAWSWEEPER_TARGET_SNAPSHOT_MAX_FILES",
    DEFAULT_TARGET_SNAPSHOT_MAX_FILES,
  );
  let bytes = 0;
  let files = 0;
  const account = (absolutePath: string) => {
    const stat = fs.lstatSync(absolutePath);
    files += 1;
    bytes += stat.isSymbolicLink()
      ? Buffer.byteLength(fs.readlinkSync(absolutePath))
      : stat.isFile()
        ? stat.size
        : 0;
    if (files > maxFiles || bytes > maxBytes) {
      throw new Error(
        `validation_snapshot_budget_exceeded: changed state exceeds ${maxFiles} files or ${maxBytes} bytes`,
      );
    }
    if (!stat.isDirectory() || stat.isSymbolicLink()) return;
    for (const entry of fs.readdirSync(absolutePath)) account(path.join(absolutePath, entry));
  };
  for (const relativePath of relativePaths) {
    const absolutePath = safeTargetPath(cwd, relativePath);
    try {
      account(absolutePath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  const indexPath = targetGitIndexPath(cwd);
  if (fs.existsSync(indexPath)) account(indexPath);
}

function boundedSnapshotLimit(name: string, defaultValue: number) {
  const configured = Number.parseInt(process.env[name] ?? "", 10);
  if (!Number.isFinite(configured) || configured <= 0) return defaultValue;
  return Math.min(configured, defaultValue);
}

function splitNul(value: string) {
  return value.split("\0").filter(Boolean);
}

function targetPathFingerprint(cwd: string, relativePath: string, allowUnsafeAncestors = false) {
  try {
    assertTrustedTargetPathAncestors(cwd, relativePath);
  } catch (error) {
    if (allowUnsafeAncestors && /validation_path_untrusted/i.test(String(error))) {
      return "untrusted-ancestor";
    }
    throw error;
  }
  const absolutePath = path.join(cwd, relativePath);
  try {
    const stat = fs.lstatSync(absolutePath);
    if (stat.isSymbolicLink()) return `symlink:${stat.mode}:${fs.readlinkSync(absolutePath)}`;
    if (stat.isFile()) {
      const digest = crypto
        .createHash("sha256")
        .update(fs.readFileSync(absolutePath))
        .digest("hex");
      return `file:${stat.mode}:${digest}`;
    }
    if (stat.isDirectory()) {
      const digest = crypto.createHash("sha256");
      updateTargetTreeFingerprint(digest, absolutePath);
      return `directory:${stat.mode}:${digest.digest("hex")}`;
    }
    return `other:${stat.mode}:${stat.size}`;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return "missing";
    throw error;
  }
}

function updateTargetTreeFingerprint(hash: crypto.Hash, absolutePath: string) {
  const stat = fs.lstatSync(absolutePath);
  hash.update(`${stat.mode}:`);
  if (stat.isSymbolicLink()) {
    hash.update(`symlink:${fs.readlinkSync(absolutePath)}`);
    return;
  }
  if (stat.isFile()) {
    hash.update("file:");
    hash.update(fs.readFileSync(absolutePath));
    return;
  }
  if (!stat.isDirectory()) {
    hash.update(`other:${stat.size}`);
    return;
  }
  hash.update("directory:");
  for (const entry of fs.readdirSync(absolutePath).sort()) {
    hash.update(entry);
    hash.update("\0");
    updateTargetTreeFingerprint(hash, path.join(absolutePath, entry));
    hash.update("\0");
  }
}

function assertTrustedTargetPathAncestors(cwd: string, relativePath: string) {
  safeTargetPath(cwd, relativePath);
  let current = path.resolve(cwd);
  for (const part of relativePath.split("/").slice(0, -1)) {
    current = path.join(current, part);
    try {
      const stat = fs.lstatSync(current);
      if (!stat.isDirectory() || stat.isSymbolicLink()) {
        throw new Error(`validation_path_untrusted: ${relativePath}`);
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
      throw error;
    }
  }
}

function assertTargetCommittableStateUnchanged(
  cwd: string,
  before: TargetCommittableSnapshot,
  code: string,
) {
  try {
    const paths = uniqueStrings([...before.state.keys(), ...targetCommittablePaths(cwd)]).sort();
    const after = targetCommittableStateForPaths(cwd, paths, true);
    const stateChanged = paths.filter(
      (relativePath) => before.state.get(relativePath) !== after.get(relativePath),
    );
    const newlyIgnored = before.allowNewIgnored
      ? []
      : [...ignoredRepositoryEntries(cwd)].filter(
          (relativePath) => !before.ignoredEntries.has(relativePath),
        );
    const changed = uniqueStrings([...stateChanged, ...newlyIgnored]).sort();
    const indexChanged = before.indexFingerprint !== targetGitIndexFingerprint(cwd);
    if (changed.length === 0 && !indexChanged) return;

    restoreTargetCommittableSnapshot(cwd, before, changed, indexChanged);
    const restoredPaths = uniqueStrings([
      ...before.state.keys(),
      ...targetCommittablePaths(cwd),
    ]).sort();
    const restored = targetCommittableStateForPaths(cwd, restoredPaths);
    const restoreFailed =
      !targetStateEquals(before.state, restored) ||
      before.indexFingerprint !== targetGitIndexFingerprint(cwd);
    const disallowedChanged = changed.filter(
      (relativePath) => !before.allowedMutationPaths.has(relativePath),
    );
    const changedPaths = [...disallowedChanged, ...(indexChanged ? [".git/index"] : [])].slice(
      0,
      20,
    );
    if (restoreFailed) {
      throw new Error(
        `${code}_restore_failed: validation checkout could not be restored after changes to ${[...changed, ...(indexChanged ? [".git/index"] : [])].slice(0, 20).join(", ")}`,
      );
    }
    if (changedPaths.length === 0) return;
    throw new Error(`${code}: validation changed committable files: ${changedPaths.join(", ")}`);
  } finally {
    fs.rmSync(before.backupDir, { recursive: true, force: true });
  }
}

function restoreTargetCommittableSnapshot(
  cwd: string,
  snapshot: TargetCommittableSnapshot,
  changed: string[],
  indexChanged: boolean,
) {
  const indexPath = targetGitIndexPath(cwd);
  if (indexChanged) {
    if (snapshot.indexBackup) {
      fs.mkdirSync(path.dirname(indexPath), { recursive: true });
      fs.copyFileSync(snapshot.indexBackup, indexPath);
    } else {
      fs.rmSync(indexPath, { force: true });
    }
  }

  for (const relativePath of changed) {
    const targetPath = prepareTargetPathForRestore(cwd, relativePath);
    fs.rmSync(targetPath, { recursive: true, force: true });
    const backup = snapshot.backups.get(relativePath);
    if (backup) {
      ensureTargetRestoreDirectory(cwd, path.dirname(relativePath));
      fs.cpSync(backup, targetPath, {
        dereference: false,
        preserveTimestamps: true,
        recursive: true,
      });
      continue;
    }
    if (!snapshot.state.has(relativePath) && snapshot.trackedPaths.has(relativePath)) {
      ensureTargetRestoreDirectory(cwd, path.dirname(relativePath));
      run("git", ["checkout-index", "--force", "--", relativePath], { cwd });
    }
  }
}

function prepareTargetPathForRestore(cwd: string, relativePath: string) {
  const targetPath = safeTargetPath(cwd, relativePath);
  const root = path.resolve(cwd);
  const parts = relativePath.split("/").slice(0, -1);
  let current = root;
  for (const part of parts) {
    current = path.join(current, part);
    try {
      const stat = fs.lstatSync(current);
      if (stat.isDirectory() && !stat.isSymbolicLink()) continue;
      fs.rmSync(current, { recursive: true, force: true });
      break;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") break;
      throw error;
    }
  }
  return targetPath;
}

function ensureTargetRestoreDirectory(cwd: string, relativeDirectory: string) {
  if (!relativeDirectory || relativeDirectory === ".") return;
  const root = path.resolve(cwd);
  let current = root;
  for (const part of relativeDirectory.split(path.sep)) {
    if (!part || part === ".") continue;
    current = path.join(current, part);
    try {
      const stat = fs.lstatSync(current);
      if (!stat.isDirectory() || stat.isSymbolicLink()) {
        throw new Error(`validation_path_untrusted: ${relativeDirectory}`);
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      fs.mkdirSync(current);
    }
  }
}

function targetStateEquals(left: Map<string, string>, right: Map<string, string>) {
  if (left.size !== right.size) return false;
  return [...left].every(([relativePath, fingerprint]) => right.get(relativePath) === fingerprint);
}

function safeTargetPath(cwd: string, relativePath: string) {
  if (
    path.isAbsolute(relativePath) ||
    relativePath.split("/").some((part) => part === "" || part === "..")
  ) {
    throw new Error(`validation_path_invalid: ${relativePath}`);
  }
  const root = path.resolve(cwd);
  const absolutePath = path.resolve(root, relativePath);
  const normalizedRoot = process.platform === "win32" ? root.toLowerCase() : root;
  const normalizedPath = process.platform === "win32" ? absolutePath.toLowerCase() : absolutePath;
  if (!normalizedPath.startsWith(`${normalizedRoot}${path.sep}`)) {
    throw new Error(`validation_path_invalid: ${relativePath}`);
  }
  return absolutePath;
}

function targetGitIndexPath(cwd: string) {
  return path.resolve(cwd, run("git", ["rev-parse", "--git-path", "index"], { cwd }).trim());
}

function targetGitIndexFingerprint(cwd: string) {
  return crypto
    .createHash("sha256")
    .update(run("git", ["ls-files", "--stage", "-z"], { cwd }))
    .digest("hex");
}

function createTargetValidationSandboxHome(
  cwd: string,
  externalNetworkEnabled = false,
  validationRunDir: string | null = null,
) {
  const sandboxHome = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-target-sandbox-"));
  fs.chmodSync(sandboxHome, 0o700);
  const toolReadRules = targetSandboxToolReadRoots(cwd)
    .map((root) => `${JSON.stringify(`${root}/**`)} = "read"`)
    .join("\n");
  const cacheRoot = targetValidationCachePath(cwd).split(path.sep).join("/");
  const cacheAccess = externalNetworkEnabled ? "write" : "read";
  const cacheRules = [
    `${JSON.stringify(cacheRoot)} = "${cacheAccess}"`,
    `${JSON.stringify(`${cacheRoot}/**`)} = "${cacheAccess}"`,
    ...(validationRunDir
      ? [
          `${JSON.stringify(validationRunDir.split(path.sep).join("/"))} = "write"`,
          `${JSON.stringify(`${validationRunDir.split(path.sep).join("/")}/**`)} = "write"`,
        ]
      : []),
  ].join("\n");
  const windowsSandboxConfig =
    process.platform === "win32"
      ? `
[windows]
sandbox = "elevated"
`
      : "";
  const validationReadOnlyRules = externalNetworkEnabled ? "" : targetSandboxNodeModulesRules(cwd);
  const networkRules = externalNetworkEnabled
    ? `enabled = true
mode = "full"`
    : `enabled = true
mode = "limited"
allow_local_binding = true

[permissions.${TARGET_SANDBOX_PROFILE}.network.domains]
"localhost" = "allow"
"127.0.0.1" = "allow"
"::1" = "allow"`;
  fs.writeFileSync(
    path.join(sandboxHome, "config.toml"),
    `default_permissions = "${TARGET_SANDBOX_PROFILE}"

[features]
network_proxy = true

[permissions.${TARGET_SANDBOX_PROFILE}]
extends = ":workspace"

[permissions.${TARGET_SANDBOX_PROFILE}.filesystem]
":root" = "deny"
":minimal" = "read"
":tmpdir" = "deny"
":slash_tmp" = "deny"
${toolReadRules}
${cacheRules}

[permissions.${TARGET_SANDBOX_PROFILE}.filesystem.":workspace_roots"]
"." = "write"
".git" = "read"
${validationReadOnlyRules}
"**/*.env" = "deny"

[permissions.${TARGET_SANDBOX_PROFILE}.network]
${networkRules}
${windowsSandboxConfig}
`,
    { mode: 0o600 },
  );
  return sandboxHome;
}

function targetSandboxNodeModulesRules(cwd: string) {
  return targetPackageRoots(cwd)
    .flatMap((packageRoot) => {
      const nodeModules =
        packageRoot === "." ? "node_modules" : `${packageRoot.replace(/\/+$/, "")}/node_modules`;
      return [
        `${JSON.stringify(nodeModules)} = "read"`,
        `${JSON.stringify(`${nodeModules}/**`)} = "read"`,
        `${JSON.stringify(`${nodeModules}/.vite`)} = "write"`,
        `${JSON.stringify(`${nodeModules}/.vite/**`)} = "write"`,
        `${JSON.stringify(`${nodeModules}/.vite-temp`)} = "write"`,
        `${JSON.stringify(`${nodeModules}/.vite-temp/**`)} = "write"`,
      ];
    })
    .join("\n");
}

function targetPackageRoots(cwd: string) {
  const repositoryPaths = uniqueStrings([
    ...gitLsFiles(cwd),
    ...targetCommittableState(cwd).keys(),
  ]);
  return uniqueStrings([
    ".",
    ...repositoryPaths
      .filter(
        (relativePath) =>
          path.posix.basename(relativePath.replaceAll("\\", "/")) === "package.json",
      )
      .map((relativePath) => path.posix.dirname(relativePath.replaceAll("\\", "/"))),
  ]);
}

function targetSandboxToolReadRoots(cwd: string) {
  const candidates = resolvedTargetToolRoots();
  const normalizedCwd = path.resolve(cwd);
  const roots = new Set<string>();
  for (const candidate of candidates) {
    if (!candidate || !path.isAbsolute(candidate)) continue;
    let root = path.resolve(candidate);
    try {
      if (!fs.statSync(root).isDirectory()) continue;
      root = fs.realpathSync(root);
    } catch {
      continue;
    }
    if (root === path.parse(root).root) continue;
    if (root === normalizedCwd || root.startsWith(`${normalizedCwd}${path.sep}`)) continue;
    roots.add(root.split(path.sep).join("/"));
  }
  return [...roots].sort();
}

function resolvedTargetToolRoots() {
  return [
    "node",
    "npm",
    "npx",
    "pnpm",
    "corepack",
    "bun",
    "go",
    "dotnet",
    "pwsh",
    "powershell",
    "make",
    "git",
    "codex",
  ].flatMap((command) => {
    const executable = findPathExecutable(command);
    if (!executable) return [];
    const realExecutable = fs.realpathSync(executable);
    return uniqueStrings([
      path.dirname(realExecutable),
      targetToolInstallationRoot(realExecutable),
      ...targetToolDependencyRoots(realExecutable),
    ]);
  });
}

function findPathExecutable(command: string) {
  const extensions =
    process.platform === "win32"
      ? (process.env.PATHEXT ?? ".COM;.EXE;.BAT;.CMD")
          .split(";")
          .filter(Boolean)
          .map((extension) => extension.toLowerCase())
      : [""];
  for (const directory of (process.env.PATH ?? "").split(path.delimiter)) {
    if (!directory || !path.isAbsolute(directory)) continue;
    for (const extension of extensions) {
      const candidate = path.join(directory, `${command}${extension}`);
      try {
        if (fs.statSync(candidate).isFile()) return candidate;
      } catch {
        // Missing PATH entries and command variants are normal.
      }
    }
  }
  return null;
}

function targetToolInstallationRoot(executable: string) {
  const normalized = executable.split(path.sep).join("/");
  const cellar = normalized.match(/^(.*\/Cellar\/[^/]+\/[^/]+)/);
  if (cellar) return cellar[1]!;
  const nodeModule = normalized.match(/^(.*\/node_modules\/(?:@[^/]+\/)?[^/]+)/);
  if (nodeModule) return nodeModule[1]!;
  const executableName = path.basename(executable).toLowerCase();
  if (
    (executableName === "go" || executableName === "go.exe") &&
    path.basename(path.dirname(executable)).toLowerCase() === "bin"
  ) {
    const goRoot = path.dirname(path.dirname(executable));
    if (
      fs.existsSync(path.join(goRoot, "src", "runtime")) &&
      fs.existsSync(path.join(goRoot, "pkg", "tool"))
    ) {
      return goRoot;
    }
  }
  return path.dirname(executable);
}

function targetToolDependencyRoots(executable: string) {
  const roots = new Set<string>();
  const pending = [executable];
  const seen = new Set<string>();
  while (pending.length > 0 && seen.size < 256) {
    const current = pending.shift()!;
    if (seen.has(current)) continue;
    seen.add(current);
    for (const library of linkedRuntimeLibraries(current)) {
      if (!library.includes(`${path.sep}Cellar${path.sep}`)) continue;
      let resolved = library;
      try {
        resolved = fs.realpathSync(library);
      } catch {
        continue;
      }
      roots.add(targetToolInstallationRoot(resolved));
      pending.push(resolved);
    }
  }
  return [...roots];
}

function linkedRuntimeLibraries(executable: string) {
  const invocation =
    process.platform === "darwin"
      ? { command: "otool", args: ["-L", executable] }
      : process.platform === "linux"
        ? { command: "ldd", args: [executable] }
        : null;
  if (!invocation) return [];
  try {
    return run(invocation.command, invocation.args)
      .split(/\r?\n/)
      .flatMap((line) => {
        const match = line.match(/(?:=>\s*)?(\/[^\s(]+)/);
        return match?.[1] ? [match[1]] : [];
      });
  } catch {
    return [];
  }
}

function runTargetValidationCommand(
  parts: string[],
  {
    cwd,
    env,
    sandboxHome,
    timeoutMs,
  }: {
    cwd: string;
    env: NodeJS.ProcessEnv;
    sandboxHome: string | null;
    timeoutMs: number;
  },
) {
  const executable = parts[0]!;
  const args = parts.slice(1);
  const before = captureTargetCommittableSnapshot(cwd, allowedValidationMutationPaths(parts, cwd));
  let commandError: Error | null = null;
  try {
    runTargetSandboxCommand([executable, ...args], {
      cwd,
      env,
      sandboxHome,
      timeoutMs,
    });
  } catch (error) {
    commandError = error instanceof Error ? error : new Error(String(error));
  } finally {
    assertTargetCommittableStateUnchanged(cwd, before, "validation_side_effect_detected");
  }
  if (commandError) throw commandError;
}

function allowedValidationMutationPaths(parts: string[], cwd: string) {
  const commandParts = stripEnvPrefix(parts);
  const executable = path.basename(commandParts[0] ?? "").toLowerCase();
  if (executable !== "dotnet" || !["build", "restore", "test"].includes(commandParts[1] ?? "")) {
    return [];
  }
  const repositoryPaths = uniqueStrings([
    ...gitLsFiles(cwd),
    ...splitNul(run("git", ["ls-files", "--others", "--exclude-standard", "-z"], { cwd })),
  ]);
  const projectDirectories = uniqueStrings(
    repositoryPaths
      .filter((relativePath) => /\.(?:cs|fs|vb)proj$/i.test(relativePath))
      .map((relativePath) => path.posix.dirname(relativePath.replaceAll("\\", "/"))),
  );
  return projectDirectories.flatMap((directory) =>
    ["bin", "obj"].map((name) => (directory === "." ? name : `${directory}/${name}`)),
  );
}

function runTargetSandboxCommand(
  parts: string[],
  {
    cwd,
    env,
    sandboxHome,
    timeoutMs,
  }: {
    cwd: string;
    env: NodeJS.ProcessEnv;
    sandboxHome: string | null;
    timeoutMs: number;
  },
) {
  const invocation = trustedTargetCommandInvocation(parts[0]!, parts.slice(1), cwd);
  if (!sandboxHome) {
    run(invocation.command, invocation.args, { cwd, env, timeoutMs });
    return;
  }
  try {
    const launcher = trustedTargetSandboxLauncher(cwd);
    run(
      launcher.command,
      [
        ...launcher.args,
        "sandbox",
        "--permissions-profile",
        TARGET_SANDBOX_PROFILE,
        "--cd",
        cwd,
        "--",
        invocation.command,
        ...invocation.args,
      ],
      {
        cwd,
        env: { ...env, CODEX_HOME: sandboxHome },
        timeoutMs,
      },
    );
  } catch (error) {
    const message = String(error instanceof Error ? error.message : error);
    if (!isTargetSandboxStartupFailure(message)) throw error;
    throw targetSandboxUnavailableError(message);
  }
}

function trustedTargetCommandInvocation(executable: string, args: string[], cwd: string) {
  if (path.isAbsolute(executable) || /[\\/]/.test(executable)) {
    return { command: executable, args };
  }
  const resolved = findTrustedPathExecutable(executable, cwd);
  if (!resolved) {
    throw new Error(
      `validation_tool_unavailable: trusted ${executable} executable not found on the original PATH`,
    );
  }
  if (
    process.platform === "win32" &&
    [".bat", ".cmd"].includes(path.extname(resolved).toLowerCase())
  ) {
    const commandInterpreter = trustedWindowsCommandInterpreter(cwd);
    const commandLine = `"${[resolved, ...args].map(renderWindowsBatchArgument).join(" ")}"`;
    return {
      command: commandInterpreter,
      args: ["/d", "/s", "/v:off", "/c", commandLine],
    };
  }
  return { command: resolved, args };
}

function trustedWindowsCommandInterpreter(cwd: string) {
  const configured = process.env.ComSpec ?? process.env.COMSPEC;
  if (configured && path.isAbsolute(configured)) {
    try {
      const resolved = fs.realpathSync(configured);
      const checkout = fs.realpathSync(cwd);
      if (
        fs.statSync(resolved).isFile() &&
        resolved !== checkout &&
        !resolved.startsWith(`${checkout}${path.sep}`)
      ) {
        return resolved;
      }
    } catch {
      // Fall through to the original PATH.
    }
  }
  const commandInterpreter = findTrustedPathExecutable("cmd", cwd);
  if (!commandInterpreter) {
    throw new Error(
      "validation_tool_unavailable: trusted cmd.exe executable not found for Windows batch shim",
    );
  }
  return commandInterpreter;
}

function renderWindowsBatchArgument(value: string) {
  if (
    value.includes('"') ||
    value.includes("%") ||
    value.includes("\r") ||
    value.includes("\n") ||
    value.includes("\u0000")
  ) {
    throw new Error(
      "validation_definition_untrusted: Windows batch arguments cannot contain quotes, percent expansion, or newlines",
    );
  }
  return `"${value}"`;
}

function trustedTargetSandboxLauncher(cwd: string) {
  const executable = findTrustedPathExecutable("codex", cwd, process.platform === "win32");
  if (!executable) {
    throw targetSandboxUnavailableError("trusted Codex launcher not found on the original PATH");
  }
  if (process.platform !== "win32" || path.extname(executable).toLowerCase() === ".exe") {
    return { command: executable, args: [] as string[] };
  }
  if (path.extname(executable) === "" && fileStartsWithShebang(executable)) {
    const bash = findTrustedPathExecutable("bash", cwd);
    if (bash) return { command: bash, args: [executable] };
  }
  throw targetSandboxUnavailableError(
    `trusted Codex launcher is not directly executable: ${path.basename(executable)}`,
  );
}

function findTrustedPathExecutable(command: string, cwd: string, preferExtensionless = false) {
  const extensions =
    process.platform === "win32"
      ? [
          ...(preferExtensionless ? [""] : []),
          ...(process.env.PATHEXT ?? ".COM;.EXE;.BAT;.CMD")
            .split(";")
            .filter(Boolean)
            .map((extension) => extension.toLowerCase()),
        ]
      : [""];
  const normalizedCwd = fs.realpathSync(cwd);
  for (const directory of (process.env.PATH ?? "").split(path.delimiter)) {
    if (!directory || !path.isAbsolute(directory)) continue;
    for (const extension of extensions) {
      const candidate = path.join(directory, `${command}${extension}`);
      try {
        if (!fs.statSync(candidate).isFile()) continue;
        const realCandidate = fs.realpathSync(candidate);
        if (
          realCandidate === normalizedCwd ||
          realCandidate.startsWith(`${normalizedCwd}${path.sep}`)
        ) {
          continue;
        }
        return realCandidate;
      } catch {
        // Missing and unreadable PATH entries and command variants are normal.
      }
    }
  }
  return null;
}

function fileStartsWithShebang(filePath: string) {
  try {
    const file = fs.openSync(filePath, "r");
    try {
      const prefix = Buffer.alloc(2);
      return fs.readSync(file, prefix, 0, prefix.length, 0) === 2 && prefix.toString() === "#!";
    } finally {
      fs.closeSync(file);
    }
  } catch {
    return false;
  }
}

function assertTargetSandboxAvailable({
  cwd,
  env,
  sandboxHome,
  timeoutMs,
}: {
  cwd: string;
  env: NodeJS.ProcessEnv;
  sandboxHome: string | null;
  timeoutMs: number;
}) {
  if (!sandboxHome) return;
  try {
    runTargetSandboxCommand(["node", "-e", "process.exit(0)"], {
      cwd,
      env,
      sandboxHome,
      timeoutMs,
    });
  } catch (error) {
    const message = String(error instanceof Error ? error.message : error);
    if (/validation_sandbox_unavailable/i.test(message)) throw error;
    if (!isTargetSandboxStartupFailure(message)) throw error;
    throw targetSandboxUnavailableError(message);
  }
}

function targetSandboxUnavailableError(message: string) {
  return new Error(
    `validation_sandbox_unavailable: target runner cannot start the Codex sandbox: ${compactText(message, 4000)}`,
  );
}

function isTargetSandboxStartupFailure(message: string) {
  return (
    /\b(?:bwrap|bubblewrap)\b.*(?:loopback|RTM_NEWADDR|namespace|operation not permitted)/is.test(
      message,
    ) ||
    /sandbox (?:wrapper|startup).*(?:failed|unavailable|operation not permitted)/is.test(message) ||
    /(?:windows sandbox failed|CreateProcessAsUserW failed)/i.test(message) ||
    /(?:writable|write access).*(?:descendant|nested|beneath|under).*(?:read[- ]only|read access)/is.test(
      message,
    )
  );
}

function isSensitiveTargetEnvName(key: string) {
  return (
    /^(?:CLAWSWEEPER_MODEL|CLAWSWEEPER_INTERNAL_MODEL|CODEX_HOME|RUNNER_TEMP)$/i.test(key) ||
    /^(?:BASH_ENV|DYLD_INSERT_LIBRARIES|ENV|LD_PRELOAD|NODE_OPTIONS|NODE_PATH|PERL5LIB|PERL5OPT|PYTHONHOME|PYTHONPATH|RUBYLIB|RUBYOPT)$/i.test(
      key,
    ) ||
    /^(?:GITHUB_ENV|GITHUB_OUTPUT|GITHUB_PATH|GITHUB_STATE|GITHUB_STEP_SUMMARY)$/i.test(key) ||
    /(?:^|_)AUTH(?:ORIZATION|TOKEN)?(?:_|$)/i.test(key) ||
    /^npm_config_.*auth/i.test(key) ||
    /(?:^|_)(?:TOKEN|SECRET|PASSWORD|PASSWD|API_KEY|ACCESS_KEY|PRIVATE_KEY|CLIENT_SECRET|CREDENTIALS?)(?:_|$)/i.test(
      key,
    ) ||
    /^(?:SSH_AUTH_SOCK|GIT_ASKPASS|SSH_ASKPASS|KUBECONFIG|NETRC)$/i.test(key) ||
    /^npm_config_userconfig$/i.test(key)
  );
}

function targetValidationTimeoutMs(name: string, fallback: number, cap?: number) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  const timeout = Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
  return cap ? Math.min(timeout, cap) : timeout;
}

function resolveAllowedValidationCommands(
  command: LooseRecord,
  cwd: string,
  baseBranch: string = DEFAULT_BASE_BRANCH,
  options: TargetValidationOptions,
) {
  const parts = parseAllowedValidationCommand(command);
  const commandParts = stripEnvPrefix(parts);
  const envPrefix = parts[0] === "env" ? parts.slice(0, parts.length - commandParts.length) : [];
  const scripts = readPackageScriptSet(cwd);
  const toolchain = getToolchain(options);
  const gate = toolchain.changedGate;
  if (
    !options.strictTargetValidation &&
    gate &&
    scripts.has(gate.requiredScript) &&
    commandParts[0] !== "git"
  ) {
    return [gate.command.split(" ")];
  }
  if (commandParts[0] === "npm" && commandParts[1] === "run" && commandParts[2] === "validate") {
    if (!scripts.has("validate") && gate && scripts.has(gate.requiredScript)) {
      return [gate.command.split(" ")];
    }
  }
  if (toolchain.packageManager === "pnpm" && commandParts[0] === "pnpm") {
    let commandStart = commandParts[1] === "-s" || commandParts[1] === "--silent" ? 2 : 1;
    if (commandParts[commandStart] === "run") commandStart += 1;
    const pnpmScript = commandParts[commandStart];
    if (isExpensivePnpmValidation(commandParts, commandStart, options.allowExpensiveValidation)) {
      return [["pnpm", "check:changed"]];
    }
    if (pnpmScript === "vitest" && commandParts[commandStart + 1] === "run") {
      return withEnvPrefix(
        envPrefix,
        normalizePathValidationCommand(
          ["pnpm", "test:serial", ...commandParts.slice(commandStart + 2)],
          cwd,
          baseBranch,
        ),
      );
    }
    if (pnpmScript === "test" || pnpmScript === "test:serial") {
      return withEnvPrefix(
        envPrefix,
        normalizePathValidationCommand(
          ["pnpm", pnpmScript, ...commandParts.slice(commandStart + 1)],
          cwd,
          baseBranch,
        ),
      );
    }
  }
  if (
    commandParts[0] === "dotnet" &&
    commandParts[1] === "test" &&
    !commandParts.includes("--no-restore") &&
    isDotnetTargetPrepared(cwd, dotnetRestoreSpec(commandParts, cwd))
  ) {
    const normalized = [...commandParts];
    const separatorIndex = normalized.indexOf("--");
    normalized.splice(
      separatorIndex === -1 ? normalized.length : separatorIndex,
      0,
      "--no-restore",
    );
    return [[...envPrefix, ...normalized]];
  }
  return [parts];
}

function withEnvPrefix(envPrefix: string[], commands: string[][]) {
  if (envPrefix.length === 0) return commands;
  return commands.map((command) => [...envPrefix, ...command]);
}

function normalizePathValidationCommand(
  parts: string[],
  cwd: string,
  baseBranch: string = DEFAULT_BASE_BRANCH,
) {
  const pathArgStart = 2;
  const pathArgs = parts.slice(pathArgStart).filter(looksLikePathArgument);
  if (pathArgs.length === 0) return [parts];

  const normalized: string[] = [];
  const missing: string[] = [];
  for (const arg of pathArgs) {
    const mapped = resolveRepoPathArgument(arg, cwd);
    if (mapped) normalized.push(mapped);
    else missing.push(arg);
  }

  if (missing.length === 0) {
    return [[...parts.slice(0, pathArgStart), ...uniqueStrings(normalized)]];
  }

  const changedTests = changedTestFiles(cwd, baseBranch);
  if (changedTests.length > 0) {
    return [["pnpm", "test:serial", ...changedTests]];
  }

  const scripts = readPackageScriptSet(cwd);
  if (scripts.has("check:changed")) {
    return [["pnpm", "check:changed"]];
  }

  return [[...parts.slice(0, pathArgStart), ...uniqueStrings(normalized)]];
}

function resolveRepoPathArgument(arg: JsonValue, cwd: string): string {
  const clean = String(arg ?? "").trim();
  if (!clean || clean.startsWith("-")) return clean;
  if (fs.existsSync(path.join(cwd, clean))) return clean;

  const candidates = candidateRepoPaths(clean, cwd).filter((candidate) =>
    fs.existsSync(path.join(cwd, candidate)),
  );
  return candidates[0] ?? "";
}

function candidateRepoPaths(filePath: string, cwd: string): string[] {
  const out: string[] = [];
  if (filePath.startsWith("src/web/")) {
    out.push(`extensions/whatsapp/src/${filePath.slice("src/web/".length)}`);
  }
  const basename = path.basename(filePath);
  if (basename) {
    const files = gitLsFiles(cwd);
    out.push(...files.filter((file) => path.basename(file) === basename));
  }
  return uniqueStrings(out);
}

function changedTestFiles(cwd: string, baseBranch: string = DEFAULT_BASE_BRANCH) {
  return gitChangedFiles(cwd, baseBranch).filter(
    (file) => isTestFile(file) && fs.existsSync(path.join(cwd, file)),
  );
}

function findRepositoryRegularFile(cwd: string, names: readonly string[]) {
  const exactEntries = new Set(fs.readdirSync(cwd));
  return names
    .filter((name) => exactEntries.has(name))
    .map((name) => path.join(cwd, name))
    .find((file) => readRepositoryRegularFile(file) != null);
}

function findRepositoryPath(cwd: string, names: readonly string[]) {
  const exactEntries = new Set(fs.readdirSync(cwd));
  const name = names.find((candidate) => exactEntries.has(candidate));
  return name ? path.join(cwd, name) : null;
}

function repositoryPathExists(file: string) {
  try {
    fs.lstatSync(file);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
}

function isRepositoryRegularFile(file: string) {
  let initial: fs.Stats;
  try {
    initial = fs.lstatSync(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
  if (!initial.isFile()) return false;
  const noFollow =
    ("O_NOFOLLOW" in fs.constants ? (fs.constants as Record<string, number>).O_NOFOLLOW : 0) ?? 0;
  let descriptor: number;
  try {
    descriptor = fs.openSync(file, fs.constants.O_RDONLY | noFollow);
  } catch (error) {
    if (["ELOOP", "ENOENT"].includes(String((error as NodeJS.ErrnoException).code))) return false;
    throw error;
  }
  try {
    const opened = fs.fstatSync(descriptor);
    return opened.isFile() && opened.dev === initial.dev && opened.ino === initial.ino;
  } finally {
    fs.closeSync(descriptor);
  }
}

function repositoryFileBlobId(cwd: string, relativePath: string) {
  if (!repositoryPathExists(path.join(cwd, relativePath))) return null;
  return run("git", ["hash-object", `--path=${relativePath}`, "--", relativePath], { cwd }).trim();
}

function trustedBaseBlobId(cwd: string, baseBranch: string, relativePath: string) {
  try {
    return run("git", ["rev-parse", `origin/${baseBranch}:${relativePath}`], { cwd }).trim();
  } catch {
    return null;
  }
}

function readRepositoryRegularFile(file: string): Buffer | null;
function readRepositoryRegularFile(file: string, encoding: BufferEncoding): string | null;
function readRepositoryRegularFile(
  file: string,
  encoding?: BufferEncoding,
): Buffer | string | null {
  let initial: fs.Stats;
  try {
    initial = fs.lstatSync(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
  if (!initial.isFile() || initial.size > MAX_REPOSITORY_DEFINITION_BYTES) return null;
  const noFollow =
    ("O_NOFOLLOW" in fs.constants ? (fs.constants as Record<string, number>).O_NOFOLLOW : 0) ?? 0;
  let descriptor: number;
  try {
    descriptor = fs.openSync(file, fs.constants.O_RDONLY | noFollow);
  } catch (error) {
    if (["ELOOP", "ENOENT"].includes(String((error as NodeJS.ErrnoException).code))) return null;
    throw error;
  }
  try {
    const opened = fs.fstatSync(descriptor);
    if (
      !opened.isFile() ||
      opened.size > MAX_REPOSITORY_DEFINITION_BYTES ||
      opened.dev !== initial.dev ||
      opened.ino !== initial.ino
    ) {
      return null;
    }
    return encoding ? fs.readFileSync(descriptor, encoding) : fs.readFileSync(descriptor);
  } finally {
    fs.closeSync(descriptor);
  }
}

function repositoryPathFingerprint(cwd: string, relativePath: string) {
  const absolutePath = path.join(cwd, relativePath);
  try {
    const stat = fs.lstatSync(absolutePath);
    if (stat.isSymbolicLink()) return `symlink:${fs.readlinkSync(absolutePath)}`;
    if (!stat.isFile()) return `non-file:${stat.mode}:${stat.size}`;
    const contents = readRepositoryRegularFile(absolutePath);
    if (contents == null) return `unsafe-file:${stat.mode}:${stat.size}`;
    return `file:${stat.mode}:${crypto.createHash("sha256").update(contents).digest("hex")}`;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return "missing";
    throw error;
  }
}

function readPackageScriptSet(cwd: string) {
  try {
    const contents = readRepositoryRegularFile(path.join(cwd, "package.json"), "utf8");
    if (contents == null) return new Set<string>();
    const pkg = JSON.parse(contents);
    return new Set<string>(Object.keys(pkg.scripts ?? {}));
  } catch {
    return new Set<string>();
  }
}

function requiresChangedGate(cwd: string, toolchain: TargetRepoToolchain) {
  if (!toolchain.changedGate) return false;
  return readPackageScriptSet(cwd).has(toolchain.changedGate.requiredScript);
}

function getToolchain(options: TargetValidationOptions): TargetRepoToolchain {
  return options.toolchain ?? resolveTargetRepoToolchain(options.targetRepo);
}

function isChangedGateCommand(parts: readonly string[], options: TargetValidationOptions) {
  return changedGateCommandParts(getToolchain(options).changedGate, parts) !== null;
}

function changedGateCommandParts(
  gate: TargetChangedGate | null,
  parts: readonly string[],
): readonly string[] | null {
  if (!gate) return null;
  const gateParts = gate.command.split(/\s+/).filter(Boolean);
  if (gateParts.length !== parts.length) return null;
  for (let i = 0; i < gateParts.length; i += 1) {
    if (gateParts[i] !== parts[i]) return null;
  }
  return gateParts;
}

function changedFilesSinceRef(cwd: string, sourceRef: string) {
  const committed = run("git", ["diff", "--name-only", `${sourceRef}..HEAD`], { cwd })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const uncommitted = run("git", ["status", "--porcelain"], { cwd })
    .split("\n")
    .map((line) => line.trim())
    .map((line) => line.replace(/^.. /, ""))
    .map((line) => line.split(" -> ").pop())
    .filter(Boolean);
  return uniqueStrings([...committed, ...uncommitted]);
}

function isDocsOnlyRepairDeltaFile(filePath: string) {
  const file = String(filePath ?? "").trim();
  if (!file) return false;
  if (file === "CHANGELOG.md") return true;
  if (file.startsWith("docs/")) return true;
  if (/^(?:README|CONTRIBUTING|SECURITY|SUPPORT|CODE_OF_CONDUCT)\.md$/i.test(file)) return true;
  return /\.(?:md|mdx|txt)$/i.test(file);
}
