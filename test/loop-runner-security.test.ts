import assert from "node:assert/strict";
import { test } from "node:test";
import { assertSafeLoopEventUrl } from "../dist/loop-runner/network.js";

test("workflow event URLs require public HTTPS without embedded credentials", () => {
  assert.equal(
    assertSafeLoopEventUrl("https://events.example.test/hook"),
    "https://events.example.test/hook",
  );
  for (const value of [
    "http://events.example.test/hook",
    "https://localhost/hook",
    "https://127.0.0.1/hook",
    "https://10.0.0.4/hook",
    "https://[::1]/hook",
    "https://user:pass@events.example.test/hook",
  ]) {
    assert.throws(() => assertSafeLoopEventUrl(value));
  }
});
