export function isRetryableCodexTransportError(value: unknown): boolean {
  const message = String(value ?? "");
  return /write_stdin failed: stdin is closed|stdin is closed for this session|rate limit reached|tokens per min|\bTPM\b|requests per min|\b429\b|temporarily unavailable|overloaded|please try again in \d+(?:ms|s)/i.test(
    message,
  );
}

export function isCodexContextLimitError(value: unknown): boolean {
  const message = String(value ?? "");
  return /Requested \d+\. Please try again with a smaller input|context (?:length|window)|maximum context|too many tokens|token limit|input is too large/i.test(
    message,
  );
}
