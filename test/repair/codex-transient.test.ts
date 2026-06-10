import assert from "node:assert/strict";
import test from "node:test";
import {
  isCodexContextLimitError,
  isRetryableCodexTransportError,
} from "../../dist/repair/codex-transient.js";

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

test("Codex TPM rate-limit errors are retryable transport failures", () => {
  const message =
    "stream disconnected before completion: Rate limit reached for internal-test-model on tokens per min (TPM): Limit 40000000, Used 40000000, Requested 126092. Please try again in 189ms.";
  assert.equal(isRetryableCodexTransportError(message), true);
  assert.equal(isCodexContextLimitError(message), false);
});

test("Codex context-limit errors are blocked automation outcomes", () => {
  assert.equal(
    isCodexContextLimitError("Error: Requested 142470. Please try again with a smaller input."),
    true,
  );
  assert.equal(isCodexContextLimitError("maximum context length exceeded"), true);
  assert.equal(isCodexContextLimitError("validation command failed: pnpm check:changed"), false);
});
