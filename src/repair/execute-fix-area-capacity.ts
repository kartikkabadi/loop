import type { JsonValue, LooseRecord } from "./json-types.js";
import { runCommand as run } from "./command-runner.js";
import { repairGhEnv as ghEnv } from "./process-env.js";
import { compactText } from "./text-utils.js";
import { uniqueStrings } from "./validation-command-utils.js";

type ActivePrAreaCapacityOptions = {
  fixArtifact: LooseRecord;
  targetDir: string;
  branch: string;
  repo: string;
  maxActivePrsPerArea: number;
};

export function validateActivePrAreaCapacity({
  fixArtifact,
  targetDir,
  branch,
  repo,
  maxActivePrsPerArea,
}: ActivePrAreaCapacityOptions): LooseRecord | null {
  if (!Number.isFinite(maxActivePrsPerArea) || maxActivePrsPerArea < 1) return null;
  const areas = affectedAreasForFiles(fixArtifact.likely_files ?? []);
  if (areas.length === 0) return null;

  let activePrs;
  try {
    activePrs = listOpenClawSweeperPrAreas({ targetDir, repo }).filter(
      (pull: JsonValue) => pull.branch !== branch,
    );
  } catch (error) {
    return {
      code: "active_area_pr_cap_unverified",
      reason: `could not verify active ClawSweeper PR area capacity: ${compactText(error.message, 500)}`,
      areas,
      max_active_prs_per_area: maxActivePrsPerArea,
    };
  }
  const blockedAreas = areas
    .map((area: JsonValue) => ({
      area,
      active: activePrs.filter((pull: JsonValue) => pull.areas.includes(area)),
    }))
    .filter((entry: JsonValue) => entry.active.length >= maxActivePrsPerArea);

  if (blockedAreas.length === 0) return null;
  const first = blockedAreas[0];
  if (!first) return null;
  return {
    code: "active_area_pr_cap",
    reason: `active ClawSweeper PR cap reached for ${first.area}: ${first.active.length}/${maxActivePrsPerArea} open PRs`,
    areas,
    max_active_prs_per_area: maxActivePrsPerArea,
    active_area_prs: first.active.slice(0, 10).map((pull: JsonValue) => ({
      pr: `#${pull.number}`,
      url: pull.url,
      title: pull.title,
      branch: pull.branch,
      areas: pull.areas,
    })),
  };
}

function listOpenClawSweeperPrAreas({
  targetDir,
  repo,
}: {
  targetDir: string;
  repo: string;
}): LooseRecord[] {
  const pulls = JSON.parse(
    run(
      "gh",
      [
        "pr",
        "list",
        "--repo",
        repo,
        "--state",
        "open",
        "--limit",
        "500",
        "--json",
        "number,title,url,headRefName,labels",
      ],
      { cwd: targetDir, env: ghEnv() },
    ),
  );
  return pulls
    .filter((pull: JsonValue) => {
      const branch = String(pull.headRefName ?? "");
      const labels = (pull.labels ?? []).map((label: JsonValue) => String(label.name ?? label));
      return branch.startsWith("clawsweeper/") || labels.includes("clawsweeper");
    })
    .map((pull: JsonValue) => {
      const files = fetchPullRequestFilePaths({ targetDir, repo, number: pull.number });
      return {
        number: pull.number,
        title: pull.title,
        url: pull.url,
        branch: String(pull.headRefName ?? ""),
        areas: affectedAreasForFiles(files),
      };
    });
}

function fetchPullRequestFilePaths({
  targetDir,
  repo,
  number,
}: {
  targetDir: string;
  repo: string;
  number: JsonValue;
}): string[] {
  const view = JSON.parse(
    run("gh", ["pr", "view", String(number), "--repo", repo, "--json", "files"], {
      cwd: targetDir,
      env: ghEnv(),
    }),
  );
  return (view.files ?? []).map((file: JsonValue) => String(file.path ?? "")).filter(Boolean);
}

function affectedAreasForFiles(files: LooseRecord[]): string[] {
  return uniqueStrings(files.map(affectedAreaForFile).filter(Boolean));
}

function affectedAreaForFile(file: JsonValue): string {
  const normalized = String(file ?? "")
    .replaceAll("\\", "/")
    .replace(/^\.\/+/, "");
  if (!normalized || normalized.includes("*")) return "";
  if (isBackpressureIgnoredFile(normalized)) return "";
  const parts = normalized.split("/").filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0] ?? "";
  if (["apps", "extensions", "packages"].includes(first) && parts[1]) return `${first}/${parts[1]}`;
  if (first === "src" && parts[1]) return `src/${parts[1]}`;
  if (first === "test" || first === "tests") return first;
  if (first === "docs" || first === ".github" || first === "scripts") return first;
  return parts[0] ?? "";
}

function isBackpressureIgnoredFile(file: JsonValue): boolean {
  return /(^|\/)(CHANGELOG|CHANGES|HISTORY|RELEASES|RELEASE_NOTES)(\.[A-Za-z0-9_-]+)?$/i.test(
    String(file ?? ""),
  );
}
