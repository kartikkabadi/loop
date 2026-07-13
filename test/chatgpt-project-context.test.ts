import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

const generator = join(process.cwd(), "scripts/generate-chatgpt-project-context.mjs");

function runGenerator(repo: string, output: string): string {
  execFileSync(process.execPath, [generator, "--repo", repo, "--output", output], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  return readFileSync(output, "utf8");
}

test("ChatGPT Project context generator emits a bounded safe repository inventory", () => {
  const output = join(mkdtempSync(join(tmpdir(), "loop-project-context-")), "context.md");
  try {
    const context = runGenerator(process.cwd(), output);
    assert.match(context, /Loop Repository Context/);
    assert.match(context, /AGENTS\.md/);
    assert.match(context, /pnpm run check/);
    assert.ok(context.length < 24_000);
    assert.doesNotMatch(context, /OPENAI_API_KEY|AUTH0_CLIENT_SECRET|BEGIN PRIVATE KEY/);
  } finally {
    rmSync(join(output, ".."), { recursive: true, force: true });
  }
});

test("ChatGPT Project context generator redacts secret-looking command values", () => {
  const repo = mkdtempSync(join(tmpdir(), "loop-project-repo-"));
  const output = join(repo, "context.md");
  try {
    writeFileSync(
      join(repo, "package.json"),
      JSON.stringify(
        {
          packageManager: "pnpm@11.10.0",
          scripts: {
            check: "API_TOKEN=do-not-leak pnpm run test",
            test: "node --test",
          },
        },
        null,
        2,
      ),
    );
    const context = runGenerator(repo, output);
    assert.match(context, /API_TOKEN=<redacted>/);
    assert.doesNotMatch(context, /do-not-leak/);
  } finally {
    rmSync(repo, { recursive: true, force: true });
  }
});
