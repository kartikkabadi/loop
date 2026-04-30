import assert from "node:assert/strict";
import test from "node:test";
import { hasSecurityRepairOptInLabel } from "../../dist/repair/security-boundary.js";

test("security repair opt-in accepts autofix and automerge labels", () => {
  assert.equal(hasSecurityRepairOptInLabel(["docs", "clawsweeper:autofix"]), true);
  assert.equal(hasSecurityRepairOptInLabel(["CLAWSWEEPER:AUTOMERGE"]), true);
});

test("security repair opt-in ignores unrelated labels", () => {
  assert.equal(hasSecurityRepairOptInLabel(["clawsweeper", "size: XL"]), false);
  assert.equal(hasSecurityRepairOptInLabel(null), false);
});
