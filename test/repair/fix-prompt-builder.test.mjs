import assert from "node:assert/strict";
import test from "node:test";

import { buildFixPrompt } from "../../dist/repair/fix-prompt-builder.js";

function promptFor(fixArtifact) {
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
