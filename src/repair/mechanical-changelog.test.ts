import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { applyMechanicalChangelogFix } from "./mechanical-changelog.js";

test("mechanical changelog fix inserts a scoped entry into Unreleased Fixes", () => {
  const targetDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-changelog-"));
  fs.writeFileSync(
    path.join(targetDir, "CHANGELOG.md"),
    [
      "# Changelog",
      "",
      "## Unreleased",
      "",
      "### Changes",
      "",
      "- Existing change.",
      "",
      "### Fixes",
      "",
      "- Existing fix.",
      "",
      "## 2026.4.29",
      "",
    ].join("\n"),
  );

  const result = applyMechanicalChangelogFix({
    targetDir,
    fixArtifact: {
      changelog_required: true,
      likely_files: ["CHANGELOG.md"],
      pr_title: "fix(gateway): refresh stale channel health cache",
    },
  });

  assert.deepEqual(result, {
    status: "applied",
    file: "CHANGELOG.md",
    entry: "- Gateway: refresh stale channel health cache.",
  });
  assert.match(
    fs.readFileSync(path.join(targetDir, "CHANGELOG.md"), "utf8"),
    /### Fixes\n\n- Gateway: refresh stale channel health cache\.\n- Existing fix\./,
  );
});

test("mechanical changelog fix ignores non-changelog-only artifacts", () => {
  const targetDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-changelog-"));
  fs.writeFileSync(path.join(targetDir, "CHANGELOG.md"), "# Changelog\n");

  assert.equal(
    applyMechanicalChangelogFix({
      targetDir,
      fixArtifact: {
        changelog_required: true,
        likely_files: ["CHANGELOG.md", "src/runtime.ts"],
        pr_title: "fix(runtime): repair status",
      },
    }),
    null,
  );
});
