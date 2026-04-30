import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { runCommand as run } from "./command-runner.js";
import { uniqueStrings } from "./validation-command-utils.js";

type TargetDir = {
  targetDir: string;
};

type TargetBranch = TargetDir & {
  branch: string;
};

type TargetBaseBranch = TargetDir & {
  baseBranch: string;
};

export type RebaseOntoBaseResult = {
  status: "already-current" | "rebased" | "conflicts";
  base_ref: string;
  base_sha: string;
  previous_head: string;
  current_head: string;
  detail?: string;
};

export type CompleteRebaseResult = {
  status: "not-in-progress" | "continued";
  previous_head: string;
  current_head: string;
  detail?: string;
};

export function currentHead(targetDir: string): string {
  return run("git", ["rev-parse", "HEAD"], { cwd: targetDir }).trim();
}

export function isAncestor({
  targetDir,
  ancestor,
  descendant,
}: TargetDir & { ancestor: string; descendant: string }): boolean {
  const child = spawnSync("git", ["merge-base", "--is-ancestor", ancestor, descendant], {
    cwd: targetDir,
    env: process.env,
    encoding: "utf8",
  });
  return child.status === 0;
}

export function remoteBranchExists(options: TargetBranch): boolean {
  return Boolean(remoteBranchSha(options));
}

export function remoteBranchSha({ targetDir, branch }: TargetBranch): string {
  const child = spawnSync("git", ["ls-remote", "--heads", "origin", branch], {
    cwd: targetDir,
    env: process.env,
    encoding: "utf8",
  });
  if (child.status !== 0) return "";
  const [sha] = child.stdout.trim().split(/\s+/);
  return /^[0-9a-f]{40}$/.test(sha ?? "") ? sha : "";
}

export function branchHasBaseDiff({ targetDir, baseBranch }: TargetBaseBranch): boolean {
  const range = `origin/${baseBranch}...HEAD`;
  const first = spawnSync("git", ["diff", "--name-only", range], {
    cwd: targetDir,
    env: process.env,
    encoding: "utf8",
  });
  if (first.status === 0) return Boolean(first.stdout.trim());
  const detail = `${first.stderr ?? ""}\n${first.stdout ?? ""}`;
  if (!/no merge base/i.test(detail)) throw new Error(detail.trim());

  fetchDeeperHistory({ targetDir, baseBranch });
  const retry = spawnSync("git", ["diff", "--name-only", range], {
    cwd: targetDir,
    env: process.env,
    encoding: "utf8",
  });
  if (retry.status === 0) return Boolean(retry.stdout.trim());
  const retryDetail = `${retry.stderr ?? ""}\n${retry.stdout ?? ""}`;
  if (/no merge base/i.test(retryDetail)) return true;
  throw new Error(retryDetail.trim());
}

export function ensureMergeBaseAvailable({ targetDir, baseBranch }: TargetBaseBranch): string {
  run("git", ["fetch", "origin", `${baseBranch}:refs/remotes/origin/${baseBranch}`], {
    cwd: targetDir,
  });
  const baseRef = `origin/${baseBranch}`;
  const first = spawnSync("git", ["merge-base", baseRef, "HEAD"], {
    cwd: targetDir,
    env: process.env,
    encoding: "utf8",
  });
  if (first.status === 0 && first.stdout.trim()) return first.stdout.trim();

  fetchDeeperHistory({ targetDir, baseBranch });
  const retry = spawnSync("git", ["merge-base", baseRef, "HEAD"], {
    cwd: targetDir,
    env: process.env,
    encoding: "utf8",
  });
  if (retry.status === 0 && retry.stdout.trim()) return retry.stdout.trim();

  const detail = `${retry.stderr ?? ""}\n${retry.stdout ?? ""}`.trim();
  throw new Error(detail || `no merge base between ${baseRef} and HEAD`);
}

export function rebaseOntoBase({ targetDir, baseBranch }: TargetBaseBranch): RebaseOntoBaseResult {
  ensureMergeBaseAvailable({ targetDir, baseBranch });
  const baseRef = `origin/${baseBranch}`;
  const baseSha = run("git", ["rev-parse", baseRef], { cwd: targetDir }).trim();
  const previousHead = currentHead(targetDir);
  if (isAncestor({ targetDir, ancestor: baseRef, descendant: "HEAD" })) {
    return {
      status: "already-current",
      base_ref: baseRef,
      base_sha: baseSha,
      previous_head: previousHead,
      current_head: previousHead,
    };
  }

  const child = spawnSync("git", ["rebase", baseRef], {
    cwd: targetDir,
    env: process.env,
    encoding: "utf8",
  });
  const detail = `${child.stderr ?? ""}\n${child.stdout ?? ""}`.trim();
  if (child.status === 0) {
    return {
      status: "rebased",
      base_ref: baseRef,
      base_sha: baseSha,
      previous_head: previousHead,
      current_head: currentHead(targetDir),
      detail,
    };
  }
  if (hasRebaseInProgress(targetDir) || unmergedPaths(targetDir).length > 0) {
    return {
      status: "conflicts",
      base_ref: baseRef,
      base_sha: baseSha,
      previous_head: previousHead,
      current_head: currentHead(targetDir),
      detail,
    };
  }
  throw new Error(detail || `git rebase ${baseRef} failed`);
}

export function completeRebaseIfResolved({ targetDir }: TargetDir): CompleteRebaseResult {
  const previousHead = currentHead(targetDir);
  if (!hasRebaseInProgress(targetDir)) {
    return {
      status: "not-in-progress",
      previous_head: previousHead,
      current_head: previousHead,
    };
  }

  assertNoConflictMarkers({ targetDir, paths: unmergedPaths(targetDir) });
  run("git", ["add", "--all"], { cwd: targetDir });
  const unresolved = unmergedPaths(targetDir);
  if (unresolved.length > 0) {
    throw new Error(`rebase conflicts remain unresolved: ${unresolved.join(", ")}`);
  }
  let detail = "";
  while (hasRebaseInProgress(targetDir)) {
    const child = spawnSync("git", ["-c", "core.editor=true", "rebase", "--continue"], {
      cwd: targetDir,
      env: process.env,
      encoding: "utf8",
    });
    detail = `${detail}\n${child.stderr ?? ""}\n${child.stdout ?? ""}`.trim();
    if (child.status !== 0) {
      const remaining = unmergedPaths(targetDir);
      if (remaining.length > 0) {
        throw new Error(`rebase produced additional conflicts: ${remaining.join(", ")}`);
      }
      throw new Error(detail || "git rebase --continue failed");
    }
  }

  return {
    status: "continued",
    previous_head: previousHead,
    current_head: currentHead(targetDir),
    detail,
  };
}

function assertNoConflictMarkers({ targetDir, paths }: TargetDir & { paths: string[] }): void {
  const unresolved = paths.filter((filePath) => {
    const absolute = path.join(targetDir, filePath);
    if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) return false;
    const text = fs.readFileSync(absolute, "utf8");
    return /^<{7} |^={7}$|^>{7} /m.test(text);
  });
  if (unresolved.length > 0) {
    throw new Error(`rebase conflicts remain unresolved: ${unresolved.join(", ")}`);
  }
}

export function hasRebaseInProgress(targetDir: string): boolean {
  const gitDir = run("git", ["rev-parse", "--git-dir"], { cwd: targetDir }).trim();
  const absoluteGitDir = path.isAbsolute(gitDir) ? gitDir : path.join(targetDir, gitDir);
  return (
    fs.existsSync(path.join(absoluteGitDir, "rebase-merge")) ||
    fs.existsSync(path.join(absoluteGitDir, "rebase-apply"))
  );
}

export function unmergedPaths(targetDir: string): string[] {
  const child = spawnSync("git", ["diff", "--name-only", "--diff-filter=U"], {
    cwd: targetDir,
    env: process.env,
    encoding: "utf8",
  });
  if (child.status !== 0) return [];
  return child.stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function fetchDeeperHistory({ targetDir, baseBranch }: TargetBaseBranch): void {
  const shallow = spawnSync("git", ["rev-parse", "--is-shallow-repository"], {
    cwd: targetDir,
    env: process.env,
    encoding: "utf8",
  }).stdout.trim();
  if (shallow === "true" || fs.existsSync(path.join(targetDir, ".git", "shallow"))) {
    run("git", ["fetch", "--unshallow", "origin"], { cwd: targetDir });
  } else {
    run("git", ["fetch", "origin", "--prune"], { cwd: targetDir });
  }
  run("git", ["fetch", "origin", `${baseBranch}:refs/remotes/origin/${baseBranch}`], {
    cwd: targetDir,
  });
}

export function gitChangedFiles(targetDir: string, baseBranch: string): string[] {
  const baseRef = `origin/${baseBranch}`;
  const committed = run("git", ["diff", "--name-only", `${baseRef}...HEAD`], { cwd: targetDir })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const uncommitted = run("git", ["status", "--porcelain"], { cwd: targetDir })
    .split("\n")
    .map((line) => line.trim())
    .map((line) => line.replace(/^.. /, ""))
    .map((line) => line.split(" -> ").pop())
    .filter(Boolean);
  return uniqueStrings([...committed, ...uncommitted]);
}

export function gitLsFiles(targetDir: string): string[] {
  return run("git", ["ls-files"], { cwd: targetDir })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
