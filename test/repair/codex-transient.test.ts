import assert from "node:assert/strict";
import test from "node:test";
import { isRetryableCodexTransportError } from "../../dist/repair/codex-transient.js";

test("Codex closed-stdin tool transport errors are retryable", () => {
  assert.equal(
    isRetryableCodexTransportError(
      "ERROR codex_core::tools::router: error=write_stdin failed: stdin is closed for this session; rerun exec_command with tty=true",
    ),
    true,
  );
});

test("ordinary Codex failures are not classified as transient transport", () => {
  assert.equal(isRetryableCodexTransportError("Codex /review found an actionable bug"), false);
  assert.equal(
    isRetryableCodexTransportError("validation command failed: pnpm check:changed"),
    false,
  );
});
