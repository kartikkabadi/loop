import { spawnSync } from "node:child_process";

const DEFAULT_COMMAND_MAX_BUFFER = 64 * 1024 * 1024;

export type CommandRunOptions = {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  input?: string;
  maxBuffer?: number;
};

export function runCommand(
  command: string,
  commandArgs: string[],
  options: CommandRunOptions = {},
): string {
  const child = spawnSync(command, commandArgs, {
    cwd: options.cwd,
    env: options.env ?? process.env,
    input: options.input,
    encoding: "utf8",
    maxBuffer: options.maxBuffer ?? DEFAULT_COMMAND_MAX_BUFFER,
  });
  const detail = [child.stderr, child.stdout].filter(Boolean).join("\n").trim();
  if (child.error) {
    throw new Error(detail ? `${child.error.message}\n${detail}` : child.error.message);
  }
  if (child.status !== 0) {
    throw new Error(detail || `${command} exited ${child.status ?? `with signal ${child.signal}`}`);
  }
  return child.stdout ?? "";
}
