import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const referenceRoots = [".github", "docs"];
const appTokenRef =
  "actions/create-github-app-token@bcd2ba49218906704ab6c1aa796996da409d3eb1 # v3.2.0";

function referenceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return referenceFiles(path);
    return /\.(?:md|ya?ml)$/.test(entry.name) ? [path] : [];
  });
}

test("GitHub App token creation uses the approved immutable action pin everywhere", () => {
  const references = referenceRoots.flatMap(referenceFiles).flatMap((path) =>
    readFileSync(path, "utf8")
      .split("\n")
      .filter((line) => line.includes("actions/create-github-app-token@"))
      .map((line) => ({ path, reference: line.trim().replace(/^uses:\s*/, "") })),
  );

  assert.ok(references.length > 0, "expected GitHub App token action references");
  assert.deepEqual(
    [...new Set(references.map(({ reference }) => reference))],
    [appTokenRef],
    references.map(({ path, reference }) => `${path}: ${reference}`).join("\n"),
  );
});

test("cache actions use one runtime generation everywhere", () => {
  const references = referenceRoots.flatMap(referenceFiles).flatMap((path) =>
    readFileSync(path, "utf8")
      .split("\n")
      .flatMap((line) => line.match(/actions\/cache(?:\/(?:restore|save))?@[0-9a-f]{40}/g) ?? []),
  );

  assert.deepEqual(
    [...new Set(references)].sort(),
    [
      "actions/cache@55cc8345863c7cc4c66a329aec7e433d2d1c52a9",
      "actions/cache/restore@55cc8345863c7cc4c66a329aec7e433d2d1c52a9",
      "actions/cache/save@55cc8345863c7cc4c66a329aec7e433d2d1c52a9",
    ].sort(),
  );
});
