import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync, realpathSync } from "node:fs";
import path from "node:path";
import { spawn, type ChildProcessByStdio } from "node:child_process";
import type { Readable } from "node:stream";

const RUNNER_ENV_PREFIXES = [
  "GITHUB_",
  "CLAWSWEEPER_",
  "CRABBOX_",
  "ASCII_BOX_",
  "CLOUDFLARE_",
  "CF_",
  "AWS_",
  "OPENAI_",
  "CODEX_",
] as const;

const RUNNER_ENV_KEYS = new Set([
  "PATH",
  "HOME",
  "USER",
  "LOGNAME",
  "SHELL",
  "TMPDIR",
  "TMP",
  "TEMP",
  "LANG",
  "LC_ALL",
  "LC_CTYPE",
  "TERM",
  "COLORTERM",
  "XDG_DATA_HOME",
  "XDG_CONFIG_HOME",
  "XDG_STATE_HOME",
  "XDG_CACHE_HOME",
  "XDG_RUNTIME_DIR",
]);

function scrubRunnerChildEnv(parentEnv: Readonly<NodeJS.ProcessEnv>): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const key of Object.keys(parentEnv)) {
    if (RUNNER_ENV_PREFIXES.some((prefix) => key.startsWith(prefix))) continue;
    if (!RUNNER_ENV_KEYS.has(key)) continue;
    const value = parentEnv[key];
    if (value !== undefined) env[key] = value;
  }
  if (!env.PATH && parentEnv.PATH) env.PATH = parentEnv.PATH;
  if (!env.HOME && parentEnv.HOME) env.HOME = parentEnv.HOME;
  return env;
}

type RunnerHostRequest =
  | Readonly<{
      kind: "permission";
      params: Readonly<{
        options: readonly Readonly<{ optionId: string; kind: string }>[];
        toolCall: Readonly<Record<string, unknown>>;
      }>;
    }>
  | Readonly<{
      kind: "filesystem-read";
      params: Readonly<{ path: string; limit?: number }>;
    }>
  | Readonly<{
      kind: "filesystem-write";
      params: Readonly<{ path: string; content: string }>;
    }>
  | Readonly<{
      kind: "terminal-create";
      params: Readonly<{
        command: string;
        args: readonly string[];
        cwd?: string;
        outputByteLimit?: number;
      }>;
    }>
  | Readonly<{
      kind: "terminal-output" | "terminal-wait-for-exit" | "terminal-kill" | "terminal-release";
      params: Readonly<{ terminalId: string }>;
    }>;

export type LoopRunnerHostServices = Readonly<{
  capabilities: Readonly<{ readTextFile: boolean; writeTextFile: boolean; terminal: boolean }>;
  handle(request: RunnerHostRequest): Promise<unknown>;
}>;

export type LoopRunnerCommandPolicy = Readonly<{
  allowTerminal(
    input: Readonly<{ command: string; args: readonly string[]; cwd: string }>,
  ): boolean;
}>;

export type LoopRunnerHostOptions = Readonly<{
  workspaceRoot: string;
  commandPolicy?: LoopRunnerCommandPolicy;
  maxOutputBytes?: number;
}>;

type Terminal = {
  child: ChildProcessByStdio<null, Readable, Readable>;
  output: string;
  truncated: boolean;
  exited: boolean;
  exitCode: number | null;
  signal: string | null;
  byteLimit: number;
  exit: Promise<void>;
};

function safeString(value: unknown, label: string): string {
  if (typeof value !== "string" || !value || value.includes("\0"))
    throw new Error(`${label} is invalid`);
  return value;
}

function resolveInside(root: string, candidate: string): string {
  const input = safeString(candidate, "path");
  const absolute = path.isAbsolute(input) ? path.resolve(input) : path.resolve(root, input);
  let resolved = absolute;
  try {
    if (existsSync(absolute)) resolved = realpathSync(absolute);
    else {
      let parent = absolute;
      const missing: string[] = [];
      while (!existsSync(parent) && path.dirname(parent) !== parent) {
        missing.unshift(path.basename(parent));
        parent = path.dirname(parent);
      }
      resolved = path.join(realpathSync(parent), ...missing);
    }
  } catch {
    throw new Error("path cannot be resolved");
  }
  const prefix = root.endsWith(path.sep) ? root : `${root}${path.sep}`;
  if (resolved !== root && !resolved.startsWith(prefix))
    throw new Error("path escapes runner workspace");
  return resolved;
}

function hostRequestFailedError(): Error {
  return new Error("Host request failed");
}

function denyPermission(request: Extract<RunnerHostRequest, { kind: "permission" }>): unknown {
  const option = request.params.options.find(
    (entry) => entry.kind === "reject_once" || entry.kind === "reject_always",
  );
  return option
    ? { outcome: { outcome: "selected", optionId: option.optionId } }
    : { outcome: { outcome: "cancelled" } };
}

function appendBounded(terminal: Terminal, chunk: Buffer): void {
  const remaining = terminal.byteLimit - Buffer.byteLength(terminal.output, "utf8");
  if (remaining <= 0) {
    terminal.truncated = true;
    return;
  }
  if (chunk.byteLength <= remaining) terminal.output += chunk.toString("utf8");
  else {
    terminal.output += chunk.subarray(0, remaining).toString("utf8");
    terminal.truncated = true;
  }
}

export function createLoopRunnerHostServices(
  options: LoopRunnerHostOptions,
): LoopRunnerHostServices & Readonly<{ close(): Promise<void> }> {
  const root = realpathSync(safeString(options.workspaceRoot, "workspaceRoot"));
  const policy = options.commandPolicy;
  const maxOutputBytes = options.maxOutputBytes ?? 256 * 1024;
  if (!Number.isSafeInteger(maxOutputBytes) || maxOutputBytes < 1024)
    throw new Error("maxOutputBytes is invalid");
  const terminals = new Map<string, Terminal>();
  const baseEnv = scrubRunnerChildEnv(process.env);

  async function closeTerminal(id: string, terminate: boolean): Promise<void> {
    const terminal = terminals.get(id);
    if (!terminal) return;
    if (terminate && !terminal.exited) terminal.child.kill("SIGTERM");
    await terminal.exit;
    terminals.delete(id);
  }

  const services: LoopRunnerHostServices & Readonly<{ close(): Promise<void> }> = {
    capabilities: { readTextFile: true, writeTextFile: true, terminal: Boolean(policy) },
    async handle(request) {
      if (request.kind === "permission") {
        if (!policy) return denyPermission(request);
        const toolCall = request.params.toolCall;
        const command =
          typeof toolCall.command === "string"
            ? toolCall.command
            : typeof toolCall.title === "string"
              ? toolCall.title
              : "";
        const args = Array.isArray(toolCall.args)
          ? toolCall.args.filter((entry): entry is string => typeof entry === "string")
          : [];
        const cwd = resolveInside(root, typeof toolCall.cwd === "string" ? toolCall.cwd : root);
        if (policy.allowTerminal({ command, args, cwd })) {
          const option = request.params.options.find(
            (entry) => entry.kind === "allow_once" || entry.kind === "allow_always",
          );
          if (option) return { outcome: { outcome: "selected", optionId: option.optionId } };
        }
        return denyPermission(request);
      }
      if (request.kind === "filesystem-read") {
        const file = resolveInside(root, request.params.path);
        const text = await readFile(file, "utf8");
        if (request.params.limit === undefined) return { content: text };
        return { content: text.split(/\r?\n/).slice(0, request.params.limit).join("\n") };
      }
      if (request.kind === "filesystem-write") {
        const file = resolveInside(root, request.params.path);
        await writeFile(file, request.params.content, "utf8");
        return {};
      }
      if (request.kind === "terminal-create") {
        if (!policy) throw hostRequestFailedError();
        const cwd = resolveInside(root, request.params.cwd ?? root);
        if (
          !policy.allowTerminal({ command: request.params.command, args: request.params.args, cwd })
        )
          throw hostRequestFailedError();
        const byteLimit = Math.min(
          maxOutputBytes,
          request.params.outputByteLimit || maxOutputBytes,
        );
        const child = spawn(request.params.command, [...request.params.args], {
          cwd,
          env: { ...baseEnv },
          shell: false,
          stdio: ["ignore", "pipe", "pipe"],
        });
        const terminal: Terminal = {
          child,
          output: "",
          truncated: false,
          exited: false,
          exitCode: null,
          signal: null,
          byteLimit,
          exit: Promise.resolve(),
        };
        child.stdout.on("data", (chunk: Buffer) => appendBounded(terminal, chunk));
        child.stderr.on("data", (chunk: Buffer) => appendBounded(terminal, chunk));
        terminal.exit = new Promise<void>((resolve) => {
          child.once("exit", (code, signal) => {
            terminal.exited = true;
            terminal.exitCode = code;
            terminal.signal = signal;
            resolve();
          });
        });
        const id = `term_${randomUUID().slice(0, 8)}`;
        terminals.set(id, terminal);
        return { terminalId: id };
      }
      const terminalId = request.params.terminalId;
      const terminal = terminals.get(terminalId);
      if (!terminal) throw hostRequestFailedError();
      if (request.kind === "terminal-output")
        return {
          output: terminal.output,
          truncated: terminal.truncated,
          ...(terminal.exited
            ? { exitStatus: { exitCode: terminal.exitCode, signal: terminal.signal } }
            : {}),
        };
      if (request.kind === "terminal-wait-for-exit") {
        await terminal.exit;
        return { exitCode: terminal.exitCode, signal: terminal.signal };
      }
      if (request.kind === "terminal-kill") {
        await closeTerminal(terminalId, true);
        return {};
      }
      if (request.kind === "terminal-release") {
        await closeTerminal(terminalId, true);
        return {};
      }
      throw hostRequestFailedError();
    },
    async close() {
      await Promise.all([...terminals.keys()].map((id) => closeTerminal(id, true)));
    },
  };
  return services;
}
