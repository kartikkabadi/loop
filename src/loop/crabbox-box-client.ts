import type { LoopBoxControlClient, LoopBoxResource } from "./box-allocation.js";
import type { LoopBoxBootstrapExecutor, LoopBoxCommandResult } from "./box-bootstrap.js";

export type CrabboxCommandOutcome = Readonly<LoopBoxCommandResult & { cwd?: string }>;
export type CrabboxCommandExecutor = Readonly<{
  execute(
    input: Readonly<{ command: string; args: readonly string[]; cwd?: string }>,
  ): Promise<CrabboxCommandOutcome>;
}>;

export type CrabboxLoopBoxClientOptions = Readonly<{
  executor: CrabboxCommandExecutor;
  asciiBoxCliPath: string;
  crabboxCommand?: string;
  boxCommand?: string;
}>;

const LOOP_BOOTSTRAP_COMMANDS = new Set([
  "node",
  "npm",
  "pnpm",
  "sfw",
  "git",
  "devin",
  "agent-browser",
  "test",
  "mkdir",
  "ln",
  "curl",
  "sha256sum",
  "bash",
  "uname",
  "chmod",
  "mv",
]);

const LOOP_BOOTSTRAP_PATHS: Readonly<Record<string, string>> = {
  node: "/home/user/.nvm/versions/node/v24.15.0/bin/node",
  npm: "/home/user/.nvm/versions/node/v24.15.0/bin/npm",
  pnpm: "/home/user/.nvm/versions/node/v24.15.0/bin/pnpm",
  sfw: "/home/user/.local/bin/sfw",
  "agent-browser": "/home/user/.nvm/versions/node/v24.15.0/bin/agent-browser",
  devin: "/home/user/.local/bin/devin",
  git: "/usr/bin/git",
  test: "/usr/bin/test",
  mkdir: "/usr/bin/mkdir",
  ln: "/usr/bin/ln",
  curl: "/usr/bin/curl",
  sha256sum: "/usr/bin/sha256sum",
  bash: "/usr/bin/bash",
  uname: "/usr/bin/uname",
  chmod: "/usr/bin/chmod",
  mv: "/usr/bin/mv",
};

function safeBootstrapArgument(value: string): string {
  if (!value || value.includes("\0") || value.includes("\n") || value.includes("\r"))
    throw new Error("Box bootstrap arguments must be non-empty and single-line");
  return value;
}

/**
 * Restricts Box bootstrap to a fixed executable set. The remote command is
 * never a shell string, so a task or agent cannot turn this adapter into a
 * general-purpose SSH escape hatch.
 */
export function createCrabboxLoopBoxBootstrapExecutor(
  options: Readonly<{
    executor: CrabboxCommandExecutor;
    boxId: string;
    boxCommand?: string;
  }>,
): LoopBoxBootstrapExecutor {
  const boxIdValue = nonEmpty(options.boxId, "boxId");
  const boxCommand = nonEmpty(options.boxCommand ?? "box", "Box command");
  return {
    async execute(input) {
      const command = safeBootstrapArgument(input.command);
      if (!LOOP_BOOTSTRAP_COMMANDS.has(command))
        throw new Error(`bootstrap command is not allowlisted: ${command}`);
      const args = input.args.map(safeBootstrapArgument);
      return options.executor.execute({
        command: boxCommand,
        args: [
          "ssh",
          "--no-update",
          boxIdValue,
          "bash",
          "-lc",
          'exec "$@"',
          "loop-bootstrap",
          LOOP_BOOTSTRAP_PATHS[command]!,
          ...args,
        ],
      });
    },
  };
}

type JsonRecord = Record<string, unknown>;

function nonEmpty(value: string, label: string): string {
  if (!value || value.includes("\0")) throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function record(value: unknown, label: string): JsonRecord {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label} must be an object`);
  return value as JsonRecord;
}

function json(value: string, label: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`${label} returned invalid JSON`);
  }
}

function successful(outcome: CrabboxCommandOutcome, operation: string): string {
  if (outcome.exitCode !== 0) throw new Error(`${operation} failed`);
  return outcome.stdout;
}

function nestedString(value: unknown, keys: readonly string[]): string | undefined {
  let current: unknown = value;
  for (const key of keys) {
    if (!current || typeof current !== "object" || Array.isArray(current)) return undefined;
    current = (current as JsonRecord)[key];
  }
  return typeof current === "string" && current.length > 0 && !current.includes("\0")
    ? current
    : undefined;
}

function timingObject(outcome: CrabboxCommandOutcome): JsonRecord {
  const lines = `${outcome.stderr}\n${outcome.stdout}`.split(/\r?\n/).reverse();
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) continue;
    try {
      return record(JSON.parse(trimmed), "Crabbox warmup timing");
    } catch {
      continue;
    }
  }
  throw new Error("Crabbox warmup did not return a JSON identity");
}

function boxId(value: unknown): string | undefined {
  return (
    nestedString(value, ["boxId"]) ??
    nestedString(value, ["box_id"]) ??
    nestedString(value, ["box", "id"]) ??
    nestedString(value, ["box", "boxId"])
  );
}

function boxStatus(value: unknown): LoopBoxResource["status"] {
  const state = typeof value === "string" ? value : "";
  if (["provisioned", "cloning", "ready", "idle", "running"].includes(state)) return "running";
  if (["stopped", "deleted", "archived"].includes(state)) return "stopped";
  return "unknown";
}

function listRecords(value: unknown): readonly JsonRecord[] {
  if (Array.isArray(value))
    return value.filter((entry): entry is JsonRecord =>
      Boolean(entry && typeof entry === "object" && !Array.isArray(entry)),
    );
  const root = record(value, "Box list response");
  if (!Array.isArray(root.boxes)) throw new Error("Box list response is missing boxes");
  return root.boxes.filter((entry): entry is JsonRecord =>
    Boolean(entry && typeof entry === "object" && !Array.isArray(entry)),
  );
}

/** Node-side adapter for the proven Crabbox + ASCII Box CLI boundary. */
export function createCrabboxLoopBoxClient(
  options: CrabboxLoopBoxClientOptions,
): LoopBoxControlClient {
  const executor = options.executor;
  const asciiBoxCliPath = nonEmpty(options.asciiBoxCliPath, "ASCII Box CLI path");
  const crabboxCommand = nonEmpty(options.crabboxCommand ?? "crabbox", "Crabbox command");
  const boxCommand = nonEmpty(options.boxCommand ?? asciiBoxCliPath, "Box command");

  return {
    async create(input) {
      const deterministicName = nonEmpty(input.deterministicName, "deterministicName");
      if (!Number.isSafeInteger(input.ttlSeconds) || input.ttlSeconds < 1)
        throw new Error("ttlSeconds must be positive");
      const outcome = await executor.execute({
        command: crabboxCommand,
        args: [
          "warmup",
          "--provider",
          "ascii-box",
          "--ascii-box-cli",
          asciiBoxCliPath,
          "--browser",
          "--slug",
          deterministicName,
          "--timing-json",
        ],
      });
      const identity = timingObject(outcome);
      const id = boxId(identity);
      if (!id) throw new Error("Crabbox warmup did not return a Box ID");
      return { boxId: id, deterministicName };
    },

    async list() {
      const outcome = await executor.execute({
        command: boxCommand,
        args: ["list", "--json", "--no-update"],
      });
      const entries = listRecords(json(successful(outcome, "Box list"), "Box list"));
      return entries.flatMap((entry) => {
        const id = nestedString(entry, ["id"]);
        if (!id) return [];
        const name =
          nestedString(entry, ["name"]) ??
          nestedString(entry, ["slug"]) ??
          nestedString(entry, ["subdomain"]) ??
          id;
        return [{ boxId: id, deterministicName: name, status: boxStatus(entry.state) }];
      });
    },

    async stop(boxIdValue) {
      const id = nonEmpty(boxIdValue, "boxId");
      successful(
        await executor.execute({
          command: boxCommand,
          args: ["stop", id, "--json", "--no-update"],
        }),
        "Box stop",
      );
    },

    async delete(boxIdValue) {
      const id = nonEmpty(boxIdValue, "boxId");
      successful(
        await executor.execute({
          command: boxCommand,
          args: ["delete", id, "--json", "--no-update"],
        }),
        "Box delete",
      );
    },
  };
}
