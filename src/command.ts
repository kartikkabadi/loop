import { execFileSync } from "node:child_process";

export type RunTextOptions = {
  cwd?: string | undefined;
  env?: NodeJS.ProcessEnv | undefined;
  maxBuffer?: number;
  stdio?: ["ignore", "pipe", "pipe"] | ["ignore", "pipe", "ignore"];
  trim?: "both" | "end" | "none";
};

export function runText(
  command: string,
  args: string[],
  {
    cwd,
    env,
    maxBuffer = 64 * 1024 * 1024,
    stdio = ["ignore", "pipe", "pipe"],
    trim = "end",
  }: RunTextOptions = {},
): string {
  const text = execFileSync(resolveExecutable(command), args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, GIT_OPTIONAL_LOCKS: "0", ...env },
    maxBuffer,
    stdio,
  });
  if (trim === "both") return text.trim();
  if (trim === "end") return text.trimEnd();
  return text;
}

function resolveExecutable(command: string): string {
  return command === "git" ? (process.env.GIT_BIN ?? "/usr/bin/git") : command;
}
