import assert from "node:assert/strict";
import test from "node:test";

import { shouldCloseSupersededSourcePrs } from "../../dist/repair/execute-fix-policy.js";

test("superseded source PR closeout defaults on for replacement PRs", () => {
  assert.equal(shouldCloseSupersededSourcePrs(undefined), true);
  assert.equal(shouldCloseSupersededSourcePrs(""), true);
  assert.equal(shouldCloseSupersededSourcePrs("1"), true);
  assert.equal(shouldCloseSupersededSourcePrs("true"), true);
});

test("superseded source PR closeout can be explicitly disabled", () => {
  assert.equal(shouldCloseSupersededSourcePrs("0"), false);
  assert.equal(shouldCloseSupersededSourcePrs("false"), false);
});
