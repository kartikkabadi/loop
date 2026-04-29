import assert from "node:assert/strict";
import test from "node:test";

import { parseGithubResponse } from "../../dist/repair/publish-github-info.js";

test("parseGithubResponse ignores non-json GitHub output", () => {
  const warnings = captureWarnings(() => {
    assert.equal(parseGithubResponse("gh: HTTP 502 Bad Gateway", "issue info"), null);
  });

  assert.deepEqual(warnings, ["warning: ignoring non-json GitHub response for issue info"]);
});

test("parseGithubResponse ignores malformed GitHub json", () => {
  const warnings = captureWarnings(() => {
    assert.equal(parseGithubResponse("{", "pull info"), null);
  });

  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /^warning: could not parse GitHub response for pull info:/);
});

test("parseGithubResponse parses GitHub json", () => {
  assert.deepEqual(parseGithubResponse('{"data":{"repository":{}}}', "issue info"), {
    data: { repository: {} },
  });
});

function captureWarnings(callback) {
  const originalWarn = console.warn;
  const warnings = [];
  console.warn = (message) => {
    warnings.push(String(message));
  };
  try {
    callback();
  } finally {
    console.warn = originalWarn;
  }
  return warnings;
}
