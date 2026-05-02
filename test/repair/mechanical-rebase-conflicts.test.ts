import assert from "node:assert/strict";
import test from "node:test";
import { resolveChangelogConflictText } from "../../dist/repair/mechanical-rebase-conflicts.js";

test("resolveChangelogConflictText preserves both changelog entries", () => {
  const resolved = resolveChangelogConflictText(`# Changelog

## Unreleased

### Changes

<<<<<<< HEAD
- Plugins/ClawHub: keep current main entry.
||||||| parent of abc123 (feat: add crestodian plugin management)
=======
- Plugins/Crestodian: add plugin management.
>>>>>>> abc123 (feat: add crestodian plugin management)
- Providers/OpenAI: keep following entry.
`);

  assert.equal(
    resolved,
    `# Changelog

## Unreleased

### Changes

- Plugins/ClawHub: keep current main entry.
- Plugins/Crestodian: add plugin management.
- Providers/OpenAI: keep following entry.
`,
  );
});

test("resolveChangelogConflictText rejects unresolved conflict markers", () => {
  const resolved = resolveChangelogConflictText(`# Changelog

<<<<<<< HEAD
- One side
=======
<<<<<<< nested
- Nested marker
>>>>>>> nested
>>>>>>> branch
`);

  assert.equal(resolved, null);
});
