export function isRetryableCodexTransportError(value: unknown): boolean {
  const message = String(value ?? "");
  return /write_stdin failed: stdin is closed|stdin is closed for this session/i.test(message);
}

export function isCodexContextLimitError(value: unknown): boolean {
  const message = String(value ?? "");
  return /Requested \d+\. Please try again|context (?:length|window)|maximum context|too many tokens|token limit/i.test(
    message,
  );
}
