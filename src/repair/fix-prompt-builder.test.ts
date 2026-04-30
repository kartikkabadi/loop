import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { buildFixPrompt, buildRepositoryContext } from "./fix-prompt-builder.js";
import type { LooseRecord } from "./json-types.js";

function promptFor(fixArtifact: LooseRecord): string {
  return buildFixPrompt({
    fixArtifact,
    branch: "clawsweeper/automerge-openclaw-openclaw-74506",
    mode: "replacement",
    attempt: 1,
    maxEditAttempts: 3,
    repositoryContext: "candidate_files (1):\nCHANGELOG.md (100)",
  });
}

test("fix prompt treats changelog-required artifacts as required edits", () => {
  const prompt = promptFor({
    repair_strategy: "replace_uneditable_branch",
    pr_title: "fix(discord): document mention formatting guidance",
    summary: "Add Discord mention formatting guidance.",
    source_prs: ["https://github.com/openclaw/openclaw/pull/74506"],
    changelog_required: true,
    likely_files: ["CHANGELOG.md"],
    credit_notes: ["Preserve @steipete as source PR author."],
  });

  assert.match(prompt, /changelog_required is true/);
  assert.match(prompt, /must inspect CHANGELOG\.md and add or repair the required entry/);
  assert.match(
    prompt,
    /never add forbidden `Thanks @codex`, `Thanks @openclaw`, or `Thanks @steipete`/,
  );
  assert.match(prompt, /preserve those source authors in PR body\/history\/source links instead/);
  assert.match(prompt, /keep the changelog entry without a `Thanks @\.\.\.` line/);
  assert.match(prompt, /do not leave the changelog for the automerge gate or a later repair pass/);
});

test("fix prompt still asks Codex to add discovered changelog requirements", () => {
  const prompt = promptFor({
    repair_strategy: "repair_contributor_branch",
    pr_title: "fix(discord): document mention formatting guidance",
    summary: "Add Discord mention formatting guidance.",
    source_prs: ["https://github.com/openclaw/openclaw/pull/74506"],
    changelog_required: false,
    likely_files: ["extensions/discord/src/message.ts"],
  });

  assert.match(prompt, /if you discover the target repository requires a changelog/);
});

test("fix prompt includes rebase and previous no-diff recovery details", () => {
  const prompt = buildFixPrompt({
    fixArtifact: {
      summary: "Repair the stuck automerge branch.",
      changelog_required: false,
    },
    branch: "clawsweeper/automerge-openclaw-openclaw-74506",
    mode: "repair",
    fallbackReason: "source branch is stale",
    previousNoDiff: true,
    previousSummary: "Analyzed without editing files.".repeat(100),
    repositoryContext: "candidate_files (0):\nnone matched",
    reconcileWithBase: true,
    sourceHead: "abc123",
    rebaseResult: {
      status: "conflicts",
      base_ref: "origin/main",
      base_sha: "def456",
      detail: "CONFLICT (content): CHANGELOG.md",
    },
    maxEditAttempts: 5,
  });

  assert.match(prompt, /Edit attempt: 1 of 5/);
  assert.match(prompt, /Existing repair branch detected/);
  assert.match(prompt, /Source head before edit: abc123/);
  assert.match(prompt, /Deterministic pre-edit rebase: conflicts onto origin\/main \(def456\)/);
  assert.match(prompt, /Resolve the active rebase conflicts/);
  assert.match(prompt, /Rebase output: CONFLICT \(content\): CHANGELOG\.md/);
  assert.match(prompt, /Previous attempt produced no target repo diff/);
  assert.match(prompt, /Previous no-diff summary: Analyzed without editing files/);
  assert.match(prompt, /Fallback reason: source branch is stale/);
});

test("repository context ranks likely files and renders focused excerpts", () => {
  const tmp = makeGitRepo({
    "package.json": JSON.stringify({
      scripts: {
        test: "node --test",
        build: "tsgo -p tsconfig.json",
      },
    }),
    "src/discord-message.ts": [
      "export function renderMention(id: string) {",
      "  return `<@${id}>`;",
      "}",
    ].join("\n"),
    "src/discord-message.test.ts": "renderMention('123');\n",
    "docs/mentions.md": "Discord mention formatting guidance.\n",
    "ignored.bin": "binary-ish\n",
  });

  const context = buildRepositoryContext({
    targetDir: tmp,
    fixArtifact: {
      summary: "Fix Discord mention formatting.",
      pr_title: "fix(discord): document mention formatting guidance",
      affected_surfaces: ["discord messages"],
      likely_files: ["src/discord-message.ts", "src/**/*.test.ts"],
      validation_commands: ["pnpm test:repair"],
    },
  });

  assert.match(context, /candidate_files \(\d+\):/);
  assert.match(context, /src\/discord-message\.ts \(\d+\)/);
  assert.match(context, /src\/discord-message\.test\.ts/);
  assert.match(context, /candidate_file_excerpts:/);
  assert.match(context, /--- src\/discord-message\.ts ---/);
  assert.match(context, /renderMention/);
  assert.match(context, /validation_commands: pnpm test:repair/);
  assert.match(context, /package_scripts: build, test/);
});

test("repository context handles missing candidates, huge files, and invalid packages", () => {
  const tmp = makeGitRepo({
    "package.json": "{not json",
    "notes.bin": "no supported extension\n",
    "docs/huge.md": "mention\n".repeat(40_000),
  });

  const context = buildRepositoryContext({
    targetDir: tmp,
    fixArtifact: {
      summary: "",
      pr_title: "",
      likely_files: ["docs/huge.md"],
    },
  });

  assert.match(context, /candidate_files \(2\):/);
  assert.match(context, /docs\/huge\.md \(\d+\)/);
  assert.match(context, /package\.json \(1\)/);
  assert.doesNotMatch(context, /--- docs\/huge\.md ---/);
  assert.match(context, /--- package\.json ---/);
  assert.match(context, /package_scripts: none/);
});

test("repository context reports no candidates when nothing scores", () => {
  const tmp = makeGitRepo({
    "notes.bin": "no supported extension\n",
  });

  const context = buildRepositoryContext({
    targetDir: tmp,
    fixArtifact: {},
  });

  assert.match(context, /candidate_files \(0\):/);
  assert.match(
    context,
    /none matched; use rg across the repo to find the real implementation files/,
  );
});

function makeGitRepo(files: Record<string, string>): string {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-fix-prompt-"));
  execFileSync("git", ["init", "-q"], { cwd: tmp });
  for (const [relativePath, content] of Object.entries(files)) {
    const filePath = path.join(tmp, relativePath);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
  }
  execFileSync("git", ["add", "."], { cwd: tmp });
  return tmp;
}
