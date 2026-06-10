#!/usr/bin/env node
import { parseArgs, parseJob, validateJob } from "./lib.js";
import { resolveTargetExecutionRunner } from "./target-toolchain-config.js";

const DEFAULT_EXECUTION_RUNNER = "blacksmith-16vcpu-ubuntu-2404";
const args = parseArgs(process.argv.slice(2));
const jobPath = args._[0];

if (!jobPath) {
  console.error("usage: node dist/repair/resolve-execution-runner.js <job.md> [fallback-runner]");
  process.exit(2);
}

const job = parseJob(jobPath);
const errors = validateJob(job);
if (errors.length > 0) {
  console.error(`invalid job: ${job.relativePath}`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const fallbackRunner = String(args._[1] ?? DEFAULT_EXECUTION_RUNNER).trim();
if (!fallbackRunner) {
  throw new Error("fallback execution runner must not be empty");
}

process.stdout.write(
  `${resolveTargetExecutionRunner(String(job.frontmatter.repo), fallbackRunner)}\n`,
);
