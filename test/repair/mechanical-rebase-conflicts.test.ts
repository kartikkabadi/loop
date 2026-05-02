import assert from "node:assert/strict";
import test from "node:test";
import {
  resolveChangelogConflictText,
  resolveGeneratedSha256ConflictText,
} from "../../dist/repair/mechanical-rebase-conflicts.js";

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

test("resolveGeneratedSha256ConflictText preserves replayed checksum entries", () => {
  const resolved = resolveGeneratedSha256ConflictText(
    [
      `${"<".repeat(7)} HEAD`,
      "1d9157a39ad18841d666af90c58e0539d6427cbd2ad0c1ce29047a5a2131ba7e  config-baseline.json",
      "80e6e8dce647aef2d1310de55a81d27de52cca47fc24bd7ad81b80f43a72b84c  config-baseline.core.json",
      "1cec599c3d27c258b9df3446baa547cb164e502afa9b30c052bba8737183f551  config-baseline.channel.json",
      "8346667910d2b3a3884efce8f96591adebc4f7ea99ce18337b80e4d70bf8e4d2  config-baseline.plugin.json",
      `${"|".repeat(7)} parent of repair`,
      "8bbb620e445cba64aa8a451cfc1a7142ac24e8c80088d74a2fc813ee9e221680  config-baseline.json",
      "d145a87759d16d5f58873db337a25cb134ab25e776cd454812dca99bb9cb12a7  config-baseline.core.json",
      "c401cd3450f1737bc92418cfea301d20b54b7fbef9e6049834acc01af338e538  config-baseline.channel.json",
      "7731a0b93cb335b56fac4c807447ba659fea51ea7a6cd844dc0ef5616669ee75  config-baseline.plugin.json",
      "=".repeat(7),
      "ae25cb1d397f1ea9642047ef13d35300c807cb1cd67f681c0b5af83b572b3638  config-baseline.json",
      "0a1907d595765b8bb7a41348d14323920ab50e402be49a19a45a4e2499306407  config-baseline.core.json",
      "c401cd3450f1737bc92418cfea301d20b54b7fbef9e6049834acc01af338e538  config-baseline.channel.json",
      "7731a0b93cb335b56fac4c807447ba659fea51ea7a6cd844dc0ef5616669ee75  config-baseline.plugin.json",
      `${">".repeat(7)} repair`,
      "",
    ].join("\n"),
  );

  assert.equal(
    resolved,
    `ae25cb1d397f1ea9642047ef13d35300c807cb1cd67f681c0b5af83b572b3638  config-baseline.json
0a1907d595765b8bb7a41348d14323920ab50e402be49a19a45a4e2499306407  config-baseline.core.json
1cec599c3d27c258b9df3446baa547cb164e502afa9b30c052bba8737183f551  config-baseline.channel.json
8346667910d2b3a3884efce8f96591adebc4f7ea99ce18337b80e4d70bf8e4d2  config-baseline.plugin.json
`,
  );
});
