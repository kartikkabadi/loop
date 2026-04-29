import { execFileSync } from "node:child_process";

import { repoRoot } from "./paths.js";

export function currentProjectRepo() {
  return (
    process.env.CLAWSWEEPER_REPAIR_REPO ||
    process.env.GITHUB_REPOSITORY ||
    repoFromOriginRemote() ||
    "openclaw/clawsweeper"
  );
}

export function githubActionsRunUrl(runId: string) {
  return `https://github.com/${currentProjectRepo()}/actions/runs/${runId}`;
}

function repoFromOriginRemote() {
  try {
    const remote = execFileSync("git", ["config", "--get", "remote.origin.url"], {
      cwd: repoRoot(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const sshMatch = remote.match(/^git@github\.com:([^/]+\/[^/.]+)(?:\.git)?$/);
    if (sshMatch) return sshMatch[1];
    const httpsMatch = remote.match(/^https:\/\/github\.com\/([^/]+\/[^/.]+)(?:\.git)?$/);
    if (httpsMatch) return httpsMatch[1];
  } catch {
    return null;
  }
  return null;
}
