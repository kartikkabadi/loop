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
  /** Canonical Crabbox lease ID (`cbx_` + 12 hex). */
  id: string;
  /** Actual lease slug after Crabbox normalization / collision suffix. */
  slug?: string;
  provider: "ascii-box";
}>;

export type CrabboxCommandOutcome = Readonly<{
  exitCode: number;
  stdout: string;
  stderr: string;
}>;

/**
 * Every declared download is required. Crabbox 0.37.1 `--download` fails when
 * the remote file is missing, so `required: false` is not expressible here.
 */
export type CrabboxArtifactDownload = Readonly<{
  remotePath: string;
  localPath: string;
  required: true;
}>;

export type CrabboxCommandInvocation = Readonly<{
  command: string;
  args: readonly string[];
  cwd?: string;
}>;

export interface CrabboxCommandExecutor {
  execute(invocation: CrabboxCommandInvocation): Promise<CrabboxCommandOutcome>;
}

/**
 * `requestedSlug` is passed to Crabbox `--slug` and may be normalized or
 * collision-suffixed. The returned workspace identity is the canonical lease ID.
 */
export type AcquireCrabboxWorkspaceInput = Readonly<{
  requestedSlug: string;
  sourceDir: string;
}>;

export type AcquireCrabboxWorkspaceResult =
  | Readonly<{
      status: "acquired";
      workspace: CrabboxWorkspaceRef;
      outcome: CrabboxCommandOutcome;
    }>
  | Readonly<{
      status: "failed";
      workspace: null;
      outcome: CrabboxCommandOutcome;
      reason: "command_failed" | "identity_unavailable";
    }>;

export type SyncCrabboxWorkspaceInput = Readonly<{
  workspace: CrabboxWorkspaceRef;
  sourceDir: string;
}>;

/**
 * Launch a one-shot Box-local worker command.
 *
 * Assumes the caller has already completed synchronization (`sync()`).
 * Launch uses `--no-sync` so it does not silently re-sync after that step.
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
 * Collect artifacts via `crabbox run --no-sync` with require/download flags and
 * a POSIX no-op shell command (`true`). There is no standalone collect subcommand.
 * `--no-sync` prevents re-sync from deleting remote-only worker outputs.
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
   * Do not pass `--no-sync` here — sync is the purpose of this method.
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
const CANONICAL_LEASE_ID = /^cbx_[a-f0-9]{12}$/;

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

function assertRequestedSlug(requestedSlug: string): void {
  assertNonEmpty(requestedSlug, "Requested slug must be non-empty");
  assertNoNul(requestedSlug, "Requested slug");
}

function assertSourceDir(sourceDir: string): void {
  assertNonEmpty(sourceDir, "Source directory must be non-empty");
  assertNoNul(sourceDir, "Source directory");
}

function assertCanonicalLeaseId(workspaceId: string): void {
  assertNonEmpty(workspaceId, "Workspace ID must be non-empty");
  assertNoNul(workspaceId, "Workspace ID");
  if (!CANONICAL_LEASE_ID.test(workspaceId)) {
    reject("Workspace ID must be a canonical cbx_ lease ID");
  }
}

function assertWorkspaceRef(workspace: CrabboxWorkspaceRef): void {
  if (workspace.provider !== PROVIDER) {
    reject('Workspace provider must be "ascii-box"');
  }
  assertCanonicalLeaseId(workspace.id);
  if (workspace.slug !== undefined) {
    assertNonEmpty(workspace.slug, "Workspace slug must be non-empty when present");
    assertNoNul(workspace.slug, "Workspace slug");
  }
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
  const seenRemote = new Set<string>();
  const seenLocal = new Set<string>();
  for (const artifact of artifacts) {
    if (artifact.required !== true) {
      reject("Artifact downloads must be required");
    }
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
    if (seenRemote.has(artifact.remotePath)) {
      reject("Duplicate artifact remote path");
    }
    if (seenLocal.has(artifact.localPath)) {
      reject("Duplicate artifact local path");
    }
    seenRemote.add(artifact.remotePath);
    seenLocal.add(artifact.localPath);
  }
}

function providerCliArgs(asciiBoxCliPath: string): string[] {
  return ["--provider", PROVIDER, "--ascii-box-cli", asciiBoxCliPath];
}

function workspaceIdArgs(workspaceId: string): string[] {
  return ["--id", workspaceId];
}

/**
 * Parse Crabbox `--timing-json` identity from stderr.
 * Tolerates unrelated non-JSON diagnostic lines; selects the final valid
 * timing object. Never exposes raw stderr in returned errors.
 */
function parseWarmupTimingIdentity(stderr: string): CrabboxWorkspaceRef | null {
  let last: CrabboxWorkspaceRef | null = null;
  for (const line of stderr.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.length === 0 || trimmed[0] !== "{") {
      continue;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      continue;
    }
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      continue;
    }
    const record = parsed as Record<string, unknown>;
    if (record.provider !== PROVIDER) {
      continue;
    }
    if (typeof record.leaseId !== "string" || !CANONICAL_LEASE_ID.test(record.leaseId)) {
      continue;
    }
    if (typeof record.exitCode !== "number" || !Number.isInteger(record.exitCode)) {
      continue;
    }
    const ref: { id: string; provider: "ascii-box"; slug?: string } = {
      id: record.leaseId,
      provider: PROVIDER,
    };
    if (typeof record.slug === "string" && record.slug.length > 0 && !record.slug.includes("\0")) {
      ref.slug = record.slug;
    }
    last = ref;
  }
  return last;
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
      assertRequestedSlug(input.requestedSlug);
      assertSourceDir(input.sourceDir);
      const outcome = await executor.execute({
        command: crabboxCommand,
        args: [
          "warmup",
          ...providerCliArgs(asciiBoxCliPath),
          "--slug",
          input.requestedSlug,
          "--timing-json",
        ],
        cwd: input.sourceDir,
      });
      if (outcome.exitCode !== 0) {
        return {
          status: "failed",
          workspace: null,
          outcome,
          reason: "command_failed",
        };
      }
      const workspace = parseWarmupTimingIdentity(outcome.stderr);
      if (workspace === null) {
        return {
          status: "failed",
          workspace: null,
          outcome,
          reason: "identity_unavailable",
        };
      }
      return {
        status: "acquired",
        workspace,
        outcome,
      };
    },

    /**
     * Sync uses `run --sync-only` (no standalone sync subcommand).
     */
    async sync(input: SyncCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome> {
      assertWorkspaceRef(input.workspace);
      assertSourceDir(input.sourceDir);
      return executor.execute({
        command: crabboxCommand,
        args: ["run", ...commonWithId(input.workspace.id), "--sync-only"],
        cwd: input.sourceDir,
      });
    },

    async launch(input: LaunchCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome> {
      assertWorkspaceRef(input.workspace);
      assertSourceDir(input.sourceDir);
      assertNonEmpty(input.command, "Launch command must be non-empty");
      assertNoNul(input.command, "Launch command");
      return executor.execute({
        command: crabboxCommand,
        args: [
          "run",
          ...commonWithId(input.workspace.id),
          "--no-sync",
          "--shell",
          "--",
          input.command,
        ],
        cwd: input.sourceDir,
      });
    },

    async observe(input: ObserveCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome> {
      assertWorkspaceRef(input.workspace);
      return executor.execute({
        command: crabboxCommand,
        args: ["status", ...commonWithId(input.workspace.id)],
      });
    },

    /**
     * Collect maps to a no-op `run --no-sync` (`--shell -- true`) plus
     * require/download flags for every declared (required) artifact.
     */
    async collect(input: CollectCrabboxWorkspaceInput): Promise<CrabboxCommandOutcome> {
      assertWorkspaceRef(input.workspace);
      assertSourceDir(input.sourceDir);
      assertArtifacts(input.artifacts);
      const args: string[] = ["run", ...commonWithId(input.workspace.id), "--no-sync"];
      for (const artifact of input.artifacts) {
        args.push("--require-artifact", artifact.remotePath);
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
      assertWorkspaceRef(input.workspace);
      return executor.execute({
        command: crabboxCommand,
        args: ["stop", ...commonWithId(input.workspace.id)],
      });
    },
  };
}
