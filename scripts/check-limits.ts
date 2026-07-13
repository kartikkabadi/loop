#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

/**
 * Loop's limits guard deliberately checks the active product surface only.
 * The retained ClawSweeper source/test lane has its own historical fixtures;
 * it must not silently become the source of Loop capacity or workflow policy.
 */
const root = process.cwd();
const expectations: readonly Readonly<{ file: string; label: string; pattern: RegExp }>[] = [
  {
    file: ".github/workflows/loop-ci.yml",
    label: "Loop CI runs the authoritative check suite",
    pattern: /pnpm run check/,
  },
  {
    file: ".github/workflows/loop-security.yml",
    label: "Loop security audits production dependencies",
    pattern: /pnpm audit --prod --audit-level=high/,
  },
  {
    file: "gateway/wrangler.toml",
    label: "provider ceiling is ten",
    pattern: /LOOP_DEVIN_MAX_CONCURRENT\s*=\s*"10"/,
  },
  {
    file: "README.md",
    label: "README documents the two-start adaptive policy",
    pattern: /starts at two active SWE-1\.7 admissions/,
  },
  {
    file: "docs/WORKFLOW-OPERATIONS.md",
    label: "review-ready state is documented",
    pattern: /loop:review-ready/,
  },
];

const missing: string[] = [];
for (const expectation of expectations) {
  const file = path.join(root, expectation.file);
  if (!fs.existsSync(file)) {
    missing.push(`${expectation.file}: ${expectation.label} (file missing)`);
    continue;
  }
  if (!expectation.pattern.test(fs.readFileSync(file, "utf8")))
    missing.push(`${expectation.file}: ${expectation.label}`);
}

if (missing.length > 0) {
  console.error("Loop limits/workflow drift check failed:");
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}
