#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

type AutomationLimits = {
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

const root = process.cwd();
const limits = JSON.parse(
  fs.readFileSync(path.join(root, "config", "automation-limits.json"), "utf8"),
) as AutomationLimits;

const expectations: { file: string; label: string; pattern: RegExp }[] = [
  {
    file: ".github/workflows/sweep.yml",
    label: "manual workflow_dispatch shard_count default",
    pattern: new RegExp(
      `shard_count:[\\s\\S]{0,180}default: "${limits.review_shards.normal_default}"`,
    ),
  },
  {
    file: "README.md",
    label: "manual plan shard-count example",
    pattern: new RegExp(`--shard-count ${limits.review_shards.normal_default}\\b`),
  },
  {
    file: "docs/commit-dispatcher.md",
    label: "commit review page size env example",
    pattern: new RegExp(
      `CLAWSWEEPER_COMMIT_REVIEW_PAGE_SIZE=${limits.commit_review.page_size_default}\\b`,
    ),
  },
  {
    file: "docs/commit-sweeper.md",
    label: "commit review page size default",
    pattern: new RegExp(`defaults to ${limits.commit_review.page_size_default}\\b`),
  },
  {
    file: "docs/repair/README.md",
    label: "repair live run default",
    pattern: new RegExp(`CLAWSWEEPER_MAX_LIVE_WORKERS=${limits.repair_live_runs.default}\\b`),
  },
  {
    file: "docs/scheduler.md",
    label: "normal review shard default",
    pattern: new RegExp(`${limits.review_shards.normal_default} concurrent Codex\\s+review shards`),
  },
  {
    file: "docs/scheduler.md",
    label: "normal active shard floor",
    pattern: new RegExp(`fewer than ${limits.review_shards.normal_active_floor} items are due`),
  },
  {
    file: "docs/scheduler.md",
    label: "hot intake shard default",
    pattern: new RegExp(`broad hot intake: ${limits.review_shards.hot_intake_default} shards`),
  },
  {
    file: "docs/limits.md",
    label: "limits documentation references source file",
    pattern: /config\/automation-limits\.json/,
  },
];

for (const [limitPath, value] of Object.entries(flattenLimits(limits))) {
  expectations.push({
    file: "docs/limits.md",
    label: `${limitPath} documented current value`,
    pattern: new RegExp(`\\| \`${escapeRegExp(limitPath)}\` \\| ${value} \\|`),
  });
}

const missing: string[] = [];
for (const expectation of expectations) {
  const text = fs.readFileSync(path.join(root, expectation.file), "utf8");
  if (!expectation.pattern.test(text)) {
    missing.push(`${expectation.file}: ${expectation.label}`);
  }
}

if (missing.length > 0) {
  console.error("Automation limits drift check failed:");
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

function flattenLimits(value: unknown, prefix = ""): Record<string, number> {
  const out: Record<string, number> = {};
  if (!isRecord(value)) return out;
  for (const [key, child] of Object.entries(value)) {
    const childPath = prefix ? `${prefix}.${key}` : key;
    if (Number.isInteger(child)) {
      out[childPath] = child;
    } else {
      Object.assign(out, flattenLimits(child, childPath));
    }
  }
  return out;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
