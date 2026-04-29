import path from "node:path";

export function repoRoot(): string {
  return path.resolve(import.meta.dirname, "../..");
}
