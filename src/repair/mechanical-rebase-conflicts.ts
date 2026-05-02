import fs from "node:fs";
import path from "node:path";
import { runCommand as run } from "./command-runner.js";
import { unmergedPaths, type RebaseOntoBaseResult } from "./git-repo-utils.js";

export type MechanicalRebaseConflictResult =
  | {
      status: "resolved";
      paths: string[];
      reason: string;
    }
  | {
      status: "skipped";
      paths: string[];
      reason: string;
    };

export function tryResolveMechanicalRebaseConflicts({
  targetDir,
  rebaseResult,
}: {
  targetDir: string;
  rebaseResult: RebaseOntoBaseResult;
}): MechanicalRebaseConflictResult {
  if (rebaseResult.status !== "conflicts") {
    return { status: "skipped", paths: [], reason: "rebase did not report conflicts" };
  }

  const paths = unmergedPaths(targetDir);
  if (paths.length !== 1 || paths[0] !== "CHANGELOG.md") {
    return {
      status: "skipped",
      paths,
      reason: "mechanical resolver only handles isolated CHANGELOG.md conflicts",
    };
  }

  const changelogPath = path.join(targetDir, "CHANGELOG.md");
  const original = fs.readFileSync(changelogPath, "utf8");
  const resolved = resolveChangelogConflictText(original);
  if (!resolved) {
    return {
      status: "skipped",
      paths,
      reason: "CHANGELOG.md conflict shape was not mechanically mergeable",
    };
  }

  fs.writeFileSync(changelogPath, resolved);
  run("git", ["add", "CHANGELOG.md"], { cwd: targetDir });
  return {
    status: "resolved",
    paths,
    reason: "merged isolated CHANGELOG.md conflict by preserving both sides",
  };
}

export function resolveChangelogConflictText(text: string): string | null {
  const conflictPattern =
    /^<<<<<<<[^\n]*\n([\s\S]*?)(?:^\|\|\|\|\|\|\|[^\n]*\n([\s\S]*?))?^=======\n([\s\S]*?)^>>>>>>>[^\n]*(?:\n|$)/gm;
  let replaced = false;
  const resolved = text.replace(conflictPattern, (_match, ours, base = "", theirs) => {
    replaced = true;
    return mergeConflictSides(String(ours), String(theirs), String(base));
  });

  if (!replaced) return null;
  if (/^(<<<<<<<|\|\|\|\|\|\||=======|>>>>>>>)/m.test(resolved)) return null;
  return resolved.endsWith("\n") ? resolved : `${resolved}\n`;
}

function mergeConflictSides(ours: string, theirs: string, base: string): string {
  const baseLines = new Set(splitConflictSide(base));
  const seen = new Set<string>();
  const merged: string[] = [];
  for (const line of [...splitConflictSide(ours), ...splitConflictSide(theirs)]) {
    if (baseLines.has(line) || seen.has(line)) continue;
    seen.add(line);
    merged.push(line);
  }
  return `${merged.join("\n")}\n`;
}

function splitConflictSide(text: string): string[] {
  const trimmed = text.replace(/\n+$/g, "");
  if (!trimmed) return [];
  return trimmed.split("\n");
}
