import assert from "node:assert/strict";
import test from "node:test";
import {
  buildSpamModelInput,
  deterministicSpamSignals,
  isProtectedSpamAuthor,
  normalizeModelResults,
  shouldSendToCheapModel,
  type SpamScanComment,
} from "../../dist/repair/spam-scanner-core.js";

function comment(overrides: Partial<SpamScanComment> = {}): SpamScanComment {
  return {
    kind: "issue_comment",
    id: "123",
    node_id: "IC_123",
    html_url: "https://github.com/openclaw/openclaw/issues/1#issuecomment-123",
    issue_url: "https://api.github.com/repos/openclaw/openclaw/issues/1",
    pull_request_url: null,
    body: "I specialize in web scraping & data extraction. Fast turnaround, clean output.\n\n$5 flash sale -> https://tinyurl.com/example",
    author: "matisaar",
    author_association: "NONE",
    created_at: "2026-05-11T00:00:00Z",
    updated_at: "2026-05-11T00:00:00Z",
    ...overrides,
  };
}

test("deterministic spam signals catch solicitation shortener comments", () => {
  const signals = deterministicSpamSignals(comment());
  assert.equal(signals.candidate, true);
  assert.ok(signals.signals.includes("url_shortener"));
  assert.ok(signals.signals.includes("solicitation_language"));
  assert.ok(signals.signals.includes("priced_service_pitch"));
});

test("protected authors are not sent to cheap spam model", () => {
  const owner = comment({ author: "maintainer", author_association: "OWNER" });
  assert.equal(isProtectedSpamAuthor(owner), true);
  assert.equal(shouldSendToCheapModel(owner), false);
});

test("model input is compact and keeps deterministic hints", () => {
  const input = buildSpamModelInput([comment()]);
  assert.equal(input.comments.length, 1);
  assert.equal(input.comments[0]?.comment_id, "123");
  assert.ok(input.comments[0]?.deterministic_signals.includes("url_shortener"));
});

test("model results are normalized and clamped", () => {
  const results = normalizeModelResults({
    results: [
      {
        comment_id: 123,
        spam_signal: "high",
        confidence: 2,
        reasons: ["solicitation"],
        should_investigate: true,
      },
    ],
  });
  assert.deepEqual(results, [
    {
      comment_id: "123",
      spam_signal: "high",
      confidence: 1,
      reasons: ["solicitation"],
      should_investigate: true,
    },
  ]);
});
