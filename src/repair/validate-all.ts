#!/usr/bin/env node
import type { LooseRecord } from "./json-types.js";
import fs from "node:fs";
import path from "node:path";
import { parseJob, repoRoot, validateJob } from "./lib.js";

const root = repoRoot();
const jobsDir = path.join(root, "jobs");
const files: LooseRecord[] = [];

function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name === "closed") continue;
    if (entry.isDirectory()) walk(full);
    if (entry.isFile() && entry.name.endsWith(".md")) files.push(full);
  }
}

walk(jobsDir);

let failed = false;
for (const file of files) {
  const job = parseJob(file);
  const errors = validateJob(job);
  if (errors.length > 0) {
    failed = true;
    console.error(`invalid job: ${job.relativePath}`);
    for (const error of errors) console.error(`- ${error}`);
  } else {
    console.log(`valid job: ${job.relativePath}`);
  }
}

if (failed) process.exit(1);
console.log(`validated ${files.length} job(s)`);
