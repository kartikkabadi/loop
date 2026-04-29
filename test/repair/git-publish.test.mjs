import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import test from "node:test";

import {
  publishMainCommit,
  setTokenOrigin,
  uniqueNonEmpty,
} from "../../dist/repair/git-publish.js";

test("uniqueNonEmpty trims, drops blanks, and deduplicates paths", () => {
  assert.deepEqual(uniqueNonEmpty([" jobs ", "", "results", "jobs", "results "]), [
    "jobs",
    "results",
  ]);
});

test("publishMainCommit commits selected paths and restores volatile tracked files", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-publish-"));
  const origin = path.join(root, "origin.git");
  const work = path.join(root, "work");
  run("git", ["init", "--bare", origin], root);
  run("git", ["clone", origin, work], root);
  configureUser(work);
  fs.mkdirSync(path.join(work, "results"));
  fs.mkdirSync(path.join(work, "docs"));
  fs.writeFileSync(path.join(work, "results", "initial.txt"), "initial\n");
  fs.writeFileSync(path.join(work, "docs", "volatile.txt"), "before\n");
  run("git", ["add", "."], work);
  run("git", ["commit", "-m", "initial"], work);
  run("git", ["push", "origin", "HEAD:main"], work);
  run("git", ["--git-dir", origin, "symbolic-ref", "HEAD", "refs/heads/main"], root);
  run("git", ["checkout", "-B", "main", "origin/main"], work);

  fs.writeFileSync(path.join(work, "results", "ledger.txt"), "ledger\n");
  fs.writeFileSync(path.join(work, "docs", "volatile.txt"), "after\n");
  const result = withCwd(work, () =>
    publishMainCommit({
      message: "chore: publish ledger",
      paths: ["results"],
      restorePaths: ["docs/volatile.txt"],
      maxAttempts: 1,
      pushAttempts: 1,
    }),
  );

  assert.equal(result, "committed");
  assert.equal(fs.readFileSync(path.join(work, "docs", "volatile.txt"), "utf8"), "before\n");
  assert.equal(
    run("git", ["--git-dir", origin, "show", "main:results/ledger.txt"], root),
    "ledger\n",
  );
  assert.equal(
    run("git", ["--git-dir", origin, "show", "main:docs/volatile.txt"], root),
    "before\n",
  );
});

test("publishMainCommit resolves apply record delete conflicts during rebase", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-publish-"));
  const origin = path.join(root, "origin.git");
  const work = path.join(root, "work");
  const other = path.join(root, "other");
  run("git", ["init", "--bare", origin], root);
  run("git", ["clone", origin, work], root);
  configureUser(work);
  write(path.join(work, "records/openclaw-openclaw/items/1.md"), "open old\n");
  write(path.join(work, "apply-report.json"), "[]\n");
  run("git", ["add", "."], work);
  run("git", ["commit", "-m", "initial"], work);
  run("git", ["push", "origin", "HEAD:main"], work);
  run("git", ["--git-dir", origin, "symbolic-ref", "HEAD", "refs/heads/main"], root);
  run("git", ["checkout", "-B", "main", "origin/main"], work);

  run("git", ["clone", origin, other], root);
  configureUser(other);
  write(path.join(other, "records/openclaw-openclaw/items/1.md"), "open remote\n");
  run("git", ["commit", "-am", "remote item update"], other);
  run("git", ["push", "origin", "HEAD:main"], other);

  fs.rmSync(path.join(work, "records/openclaw-openclaw/items/1.md"));
  write(path.join(work, "records/openclaw-openclaw/closed/1.md"), "closed\n");
  write(path.join(work, "apply-report.json"), '[{"action":"closed"}]\n');

  const result = withCwd(work, () =>
    publishMainCommit({
      message: "chore: apply sweep decisions checkpoint 1",
      paths: ["records", "apply-report.json"],
      maxAttempts: 1,
      pushAttempts: 1,
      rebaseStrategy: "apply-records",
    }),
  );

  assert.equal(result, "committed");
  assert.throws(() =>
    run("git", ["--git-dir", origin, "show", "main:records/openclaw-openclaw/items/1.md"], root),
  );
  assert.equal(
    run("git", ["--git-dir", origin, "show", "main:records/openclaw-openclaw/closed/1.md"], root),
    "closed\n",
  );
});

test("setTokenOrigin redacts tokens from command logs", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-publish-"));
  run("git", ["init"], root);
  run("git", ["remote", "add", "origin", "https://github.com/openclaw/clawsweeper.git"], root);
  const lines = captureConsoleLog(() =>
    withCwd(root, () => setTokenOrigin("super-secret-token", "openclaw/clawsweeper")),
  );

  assert.equal(
    lines.some((line) => line.includes("super-secret-token")),
    false,
  );
  assert.equal(
    lines.some((line) => line.includes("x-access-token:***")),
    true,
  );
});

function withCwd(cwd, callback) {
  const previous = process.cwd();
  process.chdir(cwd);
  try {
    return callback();
  } finally {
    process.chdir(previous);
  }
}

function run(command, args, cwd) {
  return execFileSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function configureUser(cwd) {
  run("git", ["config", "user.name", "Tester"], cwd);
  run("git", ["config", "user.email", "tester@example.com"], cwd);
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function captureConsoleLog(callback) {
  const original = console.log;
  const lines = [];
  console.log = (message) => {
    lines.push(String(message));
  };
  try {
    callback();
    return lines;
  } finally {
    console.log = original;
  }
}
