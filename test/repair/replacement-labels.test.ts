import assert from "node:assert/strict";
import test from "node:test";

import {
  replacementAutomationLabel,
  replacementLabelsToCopy,
} from "../../dist/repair/replacement-labels.js";

test("replacement PRs inherit autofix intent from source PR labels", () => {
  assert.equal(
    replacementAutomationLabel([["docs", "clawsweeper:autofix"]]),
    "clawsweeper:autofix",
  );
});

test("replacement PRs prefer automerge intent over autofix", () => {
  assert.equal(
    replacementAutomationLabel([["clawsweeper:autofix"], ["clawsweeper:automerge"]]),
    "clawsweeper:automerge",
  );
});

test("replacement PRs without source automation labels stay unlabeled", () => {
  assert.equal(replacementAutomationLabel([["docs"], ["clawsweeper"]]), null);
});

test("replacement PRs preserve source labels and required labels without duplicates", () => {
  assert.deepEqual(
    replacementLabelsToCopy(
      [
        ["gateway", "maintainer", "size: S", "clawsweeper:automerge"],
        ["Gateway", "bug"],
      ],
      ["clawsweeper"],
    ),
    ["gateway", "maintainer", "size: S", "clawsweeper:automerge", "bug", "clawsweeper"],
  );
});
