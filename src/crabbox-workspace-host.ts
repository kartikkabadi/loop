/**
 * CrabboxWorkspaceHost — ASCII Box lifecycle transport only.
 *
 * Crabbox lifecycle commands are coordinator-to-Box operations.
 * Observed `run` transport is one-shot, not persistent bidirectional RPC.
 * Any ACP client must run locally inside the Box.
 * This host launches the Box worker and collects artifacts only.
 * No method accepts protocol stdin or exposes a stream writer.
 *
 * Not an AgentSessionRuntime. Not an ACP client. Not a Devin / credentials /
 * GitHub / workflow owner. Executor injection only — no live spawn.
 */

export type CrabboxWorkspaceRef = Readonly<{
  id: string;
  provider: "ascii-box";
}>;

export type CrabboxCommandOutcome = Readonly<{
  exitCode: number;
  stdout: string;
  stderr: string;
}>;

export type CrabboxArtifactDownload = Readonly<{
  remotePath: string;
  localPath: string;
  required: boolean;
}>;

export type CrabboxCommandInvocation = Readonly<{
  command: string;
  args: readonly string[];
  cwd?: string;
}>;

export interface CrabboxCommandExecutor {
  execute(invocation: CrabboxCommandInvocation): Promise<CrabboxCommandOutcome>;
}

export type AcquireCrabboxWorkspaceInput = Readonly<{
  workspaceId: string;
}>;

export type AcquireCrabboxWorkspaceResult = Readonly<{
  workspace: CrabboxWorkspaceRef;
  outcome: CrabboxCommandOutcome;
}>;

export type SyncCrabboxWorkspaceInput = Readonly<{
  workspace: CrabboxWorkspaceRef;
  sourceDir: string;
}>;

/**
 * Launch a one-shot Box-local worker command.
 *
 * Crabbox command transport is not a duplex ACP transport.
 * The launched command must start and manage any local ACP subprocess inside
 * the Box. Results return through command output and collected artifacts.
 */
export type LaunchCrabboxWorkspaceInput = Readonly<{
  workspace: CrabboxWorkspaceRef;
  sourceDir: string;
  command: string;
}>;

export type ObserveCrabboxWorkspaceInput = Readonly<{
  workspace: CrabboxWorkspaceRef;
}>;

/**
 * Collect artifacts via `crabbox run` with require/download flags and a POSIX
 * no-op shell command (`true`). There is no standalone collect subcommand.
 */
export type CollectCrabboxWorkspaceInput = Readonly<{
  workspace: CrabboxWorkspaceRef;
  sourceDir: string;
  artifacts: readonly CrabboxArtifactDownload[];
}>;

export type StopCrabboxWorkspaceInput = Readonly<{
  workspace: CrabboxWorkspaceRef;
}>;

export interface CrabboxWorkspaceHost {
  acquire(input: AcquireCrabboxWorkspaceInput): Promise<AcquireCrabboxWorkspaceResult>;
  /**
   * Synchronize the workspace source tree.
   * Uses `crabbox run --sync-only` (no standalone sync subcommand).
   */
  sync(input: SyncCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome>;
  launch(input: LaunchCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome>;
  observe(input: ObserveCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome>;
  collect(input: CollectCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome>;
  stop(input: StopCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome>;
}

export type CrabboxCliWorkspaceHostOptions = Readonly<{
  executor: CrabboxCommandExecutor;
  crabboxCommand?: string;
  asciiBoxCliPath: string;
}>;

const PROVIDER = "ascii-box" as const;
const DEFAULT_CRABBOX_COMMAND = "crabbox";
const COLLECT_NOOP = "true";

function reject(message: string): never {
  throw new Error(message);
}

function assertNoNul(value: string, label: string): void {
  if (value.includes("\0")) {
    reject(`${label} must not contain NUL bytes`);
  }
}

function assertNonEmpty(value: string, message: string): void {
  if (value.length === 0) {
    reject(message);
  }
}

function assertWorkspaceId(workspaceId: string): void {
  assertNonEmpty(workspaceId, "Workspace ID must be non-empty");
  assertNoNul(workspaceId, "Workspace ID");
}

function assertSourceDir(sourceDir: string): void {
  assertNonEmpty(sourceDir, "Source directory must be non-empty");
  assertNoNul(sourceDir, "Source directory");
}

function isAbsoluteRemotePath(remotePath: string): boolean {
  return (
    remotePath.startsWith("/") ||
    /^[A-Za-z]:[\\/]/.test(remotePath) ||
    remotePath.startsWith("\\\\")
  );
}

function hasDotSegment(remotePath: string): boolean {
  return remotePath.split(/[/\\]/).some((segment) => segment === "." || segment === "..");
}

function assertArtifacts(artifacts: readonly CrabboxArtifactDownload[]): void {
  if (artifacts.length === 0) {
    reject("Artifact list must be non-empty");
  }
  const seen = new Set<string>();
  for (const artifact of artifacts) {
    assertNonEmpty(artifact.remotePath, "Artifact remote path must be non-empty");
    assertNonEmpty(artifact.localPath, "Artifact local path must be non-empty");
    assertNoNul(artifact.remotePath, "Artifact remote path");
    assertNoNul(artifact.localPath, "Artifact local path");
    if (isAbsoluteRemotePath(artifact.remotePath)) {
      reject("Artifact remote path must be relative");
    }
    if (hasDotSegment(artifact.remotePath)) {
      reject("Artifact remote path must not contain '.' or '..' segments");
    }
    if (artifact.remotePath.includes("=") || artifact.localPath.includes("=")) {
      reject("Artifact path must not contain '='");
    }
    if (seen.has(artifact.remotePath)) {
      reject("Duplicate artifact remote path");
    }
    seen.add(artifact.remotePath);
  }
}

function providerCliArgs(asciiBoxCliPath: string): string[] {
  return ["--provider", PROVIDER, "--ascii-box-cli", asciiBoxCliPath];
}

function workspaceIdArgs(workspaceId: string): string[] {
  return ["--id", workspaceId];
}

/**
 * Thin Crabbox CLI argv builder for ascii-box lifecycle ops.
 * Inject a CrabboxCommandExecutor; this factory never starts processes.
 */
export function createCrabboxCliWorkspaceHost(
  options: CrabboxCliWorkspaceHostOptions,
): CrabboxWorkspaceHost {
  const executor = options.executor;
  const crabboxCommand = options.crabboxCommand ?? DEFAULT_CRABBOX_COMMAND;
  const asciiBoxCliPath = options.asciiBoxCliPath;

  function assertHostOptions(): void {
    assertNonEmpty(crabboxCommand, "Crabbox command must be non-empty");
    assertNoNul(crabboxCommand, "Crabbox command");
    assertNonEmpty(asciiBoxCliPath, "ASCII Box CLI path must be non-empty");
    assertNoNul(asciiBoxCliPath, "ASCII Box CLI path");
  }

  // Validate options without invoking the executor.
  assertHostOptions();

  function commonWithId(workspaceId: string): string[] {
    return [...providerCliArgs(asciiBoxCliPath), ...workspaceIdArgs(workspaceId)];
  }

  return {
    async acquire(input: AcquireCrabboxWorkspaceInput): Promise<AcquireCrabboxWorkspaceResult> {
      assertWorkspaceId(input.workspaceId);
      const outcome = await executor.execute({
        command: crabboxCommand,
        args: ["warmup", ...providerCliArgs(asciiBoxCliPath), "--slug", input.workspaceId],
      });
      return {
        workspace: { id: input.workspaceId, provider: PROVIDER },
        outcome,
      };
    },

    /**
     * Sync uses `run --sync-only` (no standalone sync subcommand).
     */
    async sync(input: SyncCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome> {
      assertWorkspaceId(input.workspace.id);
      assertSourceDir(input.sourceDir);
      return executor.execute({
        command: crabboxCommand,
        args: ["run", ...commonWithId(input.workspace.id), "--sync-only"],
        cwd: input.sourceDir,
      });
    },

    async launch(input: LaunchCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome> {
      assertWorkspaceId(input.workspace.id);
      assertSourceDir(input.sourceDir);
      assertNonEmpty(input.command, "Launch command must be non-empty");
      assertNoNul(input.command, "Launch command");
      return executor.execute({
        command: crabboxCommand,
        args: ["run", ...commonWithId(input.workspace.id), "--shell", "--", input.command],
        cwd: input.sourceDir,
      });
    },

    async observe(input: ObserveCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome> {
      assertWorkspaceId(input.workspace.id);
      return executor.execute({
        command: crabboxCommand,
        args: ["status", ...commonWithId(input.workspace.id)],
      });
    },

    /**
     * Collect maps to a no-op `run` (`--shell -- true`) plus require/download flags.
     * Required artifacts get both `--require-artifact` and `--download`; optional get `--download` only.
     */
    async collect(input: CollectCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome> {
      assertWorkspaceId(input.workspace.id);
      assertSourceDir(input.sourceDir);
      assertArtifacts(input.artifacts);
      const args: string[] = ["run", ...commonWithId(input.workspace.id)];
      for (const artifact of input.artifacts) {
        if (artifact.required) {
          args.push("--require-artifact", artifact.remotePath);
        }
        args.push("--download", `${artifact.remotePath}=${artifact.localPath}`);
      }
      args.push("--shell", "--", COLLECT_NOOP);
      return executor.execute({
        command: crabboxCommand,
        args,
        cwd: input.sourceDir,
      });
    },

    async stop(input: StopCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome> {
      assertWorkspaceId(input.workspace.id);
      return executor.execute({
        command: crabboxCommand,
        args: ["stop", ...commonWithId(input.workspace.id)],
      });
    },
  };
}
