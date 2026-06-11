export function isRetryableCodexTransportError(value: string | null | undefined): boolean {
  const message = value ?? "";
  return /write_stdin failed: stdin is closed|stdin is closed for this session|rate limit reached|tokens per min|\bTPM\b|requests per min|\b429\b|temporarily unavailable|overloaded|stream disconnected|reconnecting|please try again in \d+(?:\.\d+)?(?:ms|s)/i.test(
    message,
  );
}

export function isCodexContextLimitError(value: string | null | undefined): boolean {
  const message = value ?? "";
  return /Requested \d+\. Please try again with a smaller input|context (?:length|window)|maximum context|too many tokens|token limit|input is too large/i.test(
    message,
  );
}

export function codexRetryDelayMs(message: string, attempt: number): number {
  const match = String(message ?? "").match(/try again in\s+(\d+(?:\.\d+)?)(ms|s)\b/i);
  const parsed = match ? Number(match[1]) * (match[2]?.toLowerCase() === "s" ? 1000 : 1) : 0;
  const configured = [
    process.env.CLAWSWEEPER_CODEX_RETRY_DELAY_MS,
    process.env.CLAWSWEEPER_CODEX_REVIEW_RETRY_DELAY_MS,
  ]
    .map((value) => Number(value?.trim()))
    .find((value) => Number.isFinite(value) && value > 0);
  const fallback = configured ?? 15_000;
  return Math.min(
    120_000,
    Math.max(Number.isFinite(parsed) ? Math.ceil(parsed) : 0, fallback * attempt),
  );
}
