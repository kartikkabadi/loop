import { execFileSync, spawnSync } from "node:child_process";
import { repoRoot } from "./lib.js";
import { stripAnsi } from "./comment-router-utils.js";
import { ghCliEnv } from "./process-env.js";

export type GhRunOptions = {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  input?: string;
};

export function ghJson<T = JsonValue>(ghArgs: string[], options: GhRunOptions = {}): T {
  return JSON.parse(ghText(ghArgs, options) || "null") as T;
}

export function ghPaged<T = JsonValue>(apiPath: string, options: GhRunOptions = {}): T[] {
  const pages = ghJson<JsonValue[]>(["api", apiPath, "--paginate", "--slurp"], options);
  if (!Array.isArray(pages)) return [];
  return pages.flatMap((page: JsonValue) => (Array.isArray(page) ? (page as T[]) : []));
}

export function ghText(ghArgs: string[], options: GhRunOptions = {}): string {
  const text = execFileSync("gh", ghArgs, {
    cwd: options.cwd ?? repoRoot(),
    env: ghEnv(options.env),
    encoding: "utf8",
    input: options.input,
    maxBuffer: 64 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });
  return stripAnsi(text).trim();
}

export function ghBestEffort(ghArgs: string[], options: GhRunOptions = {}): void {
  try {
    ghText(ghArgs, options);
  } catch {
    // Helpful metadata should not block the primary command path.
  }
}

export function ghSpawn(ghArgs: string[], options: GhRunOptions = {}) {
  return spawnSync("gh", ghArgs, {
    cwd: options.cwd ?? repoRoot(),
    encoding: "utf8",
    env: ghEnv(options.env),
    input: options.input,
    stdio: "pipe",
  });
}

export function ghEnv(overrides: NodeJS.ProcessEnv = {}): NodeJS.ProcessEnv {
  return ghCliEnv(overrides);
}
