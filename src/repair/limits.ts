import { readFileSync } from "node:fs";
import { join } from "node:path";
import { repoRoot } from "./paths.js";

export type AutomationLimits = {
  review_shards: {
    normal_default: number;
    normal_active_floor: number;
    hot_intake_default: number;
    exact_item_default: number;
    hard_cap: number;
  };
  commit_review: {
    page_size_default: number;
    page_size_hard_cap: number;
  };
  repair_live_runs: {
    default: number;
    hard_cap: number;
    automerge_default: number;
    issue_implementation_default: number;
  };
  issue_implementation: {
    dispatches_per_sweep_default: number;
  };
};

export const AUTOMATION_LIMITS = readAutomationLimits();

export function readAutomationLimits(
  filePath = join(repoRoot(), "config", "automation-limits.json"),
): AutomationLimits {
  const parsed = JSON.parse(readFileSync(filePath, "utf8")) as unknown;
  return validateAutomationLimits(parsed);
}

function validateAutomationLimits(value: unknown): AutomationLimits {
  if (!isRecord(value)) throw new Error("automation limits must be an object");
  const limits = value as Record<string, unknown>;
  return {
    review_shards: {
      normal_default: positiveInteger(limits, "review_shards.normal_default"),
      normal_active_floor: positiveInteger(limits, "review_shards.normal_active_floor"),
      hot_intake_default: positiveInteger(limits, "review_shards.hot_intake_default"),
      exact_item_default: positiveInteger(limits, "review_shards.exact_item_default"),
      hard_cap: positiveInteger(limits, "review_shards.hard_cap"),
    },
    commit_review: {
      page_size_default: positiveInteger(limits, "commit_review.page_size_default"),
      page_size_hard_cap: positiveInteger(limits, "commit_review.page_size_hard_cap"),
    },
    repair_live_runs: {
      default: positiveInteger(limits, "repair_live_runs.default"),
      hard_cap: positiveInteger(limits, "repair_live_runs.hard_cap"),
      automerge_default: positiveInteger(limits, "repair_live_runs.automerge_default"),
      issue_implementation_default: positiveInteger(
        limits,
        "repair_live_runs.issue_implementation_default",
      ),
    },
    issue_implementation: {
      dispatches_per_sweep_default: positiveInteger(
        limits,
        "issue_implementation.dispatches_per_sweep_default",
      ),
    },
  };
}

function positiveInteger(root: Record<string, unknown>, path: string): number {
  const value = getPath(root, path);
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    throw new Error(`automation limit ${path} must be a positive integer`);
  }
  return value;
}

function getPath(root: Record<string, unknown>, path: string): unknown {
  let cursor: unknown = root;
  for (const segment of path.split(".")) {
    if (!isRecord(cursor) || !(segment in cursor)) {
      throw new Error(`automation limit ${path} is missing`);
    }
    cursor = cursor[segment];
  }
  return cursor;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
