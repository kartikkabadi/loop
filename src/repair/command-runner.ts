import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const DEFAULT_COMMAND_MAX_BUFFER = 64 * 1024 * 1024;

export type CommandRunOptions = {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  input?: string;
  maxBuffer?: number;
  timeoutMs?: number;
};

export type CommandInvocation = {
  command: string;
  args: string[];
};

export function resolveCommandInvocation(
  command: string,
  commandArgs: readonly string[],
  options: {
    env?: NodeJS.ProcessEnv | undefined;
    platform?: NodeJS.Platform;
  } = {},
): CommandInvocation {
  const platform = options.platform ?? process.platform;
  const args = [...commandArgs];
  if (platform !== "win32" || path.isAbsolute(command) || /[\\/]/.test(command)) {
    return { command, args };
  }

  const shim = findWindowsShellShim(command, options.env ?? process.env);
  return shim ? { command: "bash", args: [shim, ...args] } : { command, args };
}

export function runCommand(
  command: string,
  commandArgs: string[],
  options: CommandRunOptions = {},
): string {
  const invocation = resolveCommandInvocation(command, commandArgs, { env: options.env });
  const child = spawnSync(invocation.command, invocation.args, {
    cwd: options.cwd,
    env: options.env ?? process.env,
    input: options.input,
    encoding: "utf8",
    maxBuffer: options.maxBuffer ?? DEFAULT_COMMAND_MAX_BUFFER,
    timeout: options.timeoutMs,
  });
  const detail = [child.stderr, child.stdout].filter(Boolean).join("\n").trim();
  if (child.error) {
    if ((child.error as NodeJS.ErrnoException).code === "ETIMEDOUT") {
      const rendered = [command, ...commandArgs].join(" ");
      const message = `command timed out after ${options.timeoutMs}ms: ${rendered}`;
      throw new Error(detail ? `${message}\n${detail}` : message);
    }
    throw new Error(detail ? `${child.error.message}\n${detail}` : child.error.message);
  }
  if (child.status !== 0) {
    throw new Error(detail || `${command} exited ${child.status ?? `with signal ${child.signal}`}`);
  }
  return child.stdout ?? "";
}

function findWindowsShellShim(command: string, env: NodeJS.ProcessEnv): string | null {
  const pathValue = Object.entries(env).find(([key]) => key.toLowerCase() === "path")?.[1] ?? "";
  for (const rawEntry of pathValue.split(";")) {
    const entry = rawEntry.trim().replace(/^"(.*)"$/, "$1");
    if (!entry) continue;
    const candidate = path.join(entry, command);
    try {
      if (fs.statSync(candidate).isFile() && fs.readFileSync(candidate, "utf8").startsWith("#!")) {
        return candidate;
      }
    } catch {
      // Missing and unreadable PATH entries are normal.
    }
  }
  return null;
}
