export type LoopRunnerFailureKind =
  | "rate_limited"
  | "quota_exhausted"
  | "provider_unavailable"
  | "failed";

export type LoopRunnerFailure = Readonly<{
  kind: LoopRunnerFailureKind;
  reason: string;
  retryAt?: string;
}>;

function messageOf(error: unknown): string {
  if (error instanceof Error) return error.message;
  return typeof error === "string" ? error : "runner execution failed";
}

function retryAtFrom(message: string, now: string, fallbackSeconds: number): string {
  const match = message.match(/(?:retry[- ]after|retry in)\s*[:=]?\s*(\d+)\s*(?:s|sec|seconds)?/i);
  const seconds = match?.[1]
    ? Math.min(Math.max(Number(match[1]), 1), 24 * 60 * 60)
    : fallbackSeconds;
  return new Date(Date.parse(now) + seconds * 1000).toISOString();
}

export function classifyLoopRunnerFailure(
  error: unknown,
  now = new Date().toISOString(),
): LoopRunnerFailure {
  const reason = messageOf(error).slice(0, 512);
  if (/quota|usage\s+limit|credit|exhausted/i.test(reason)) {
    return { kind: "quota_exhausted", reason, retryAt: retryAtFrom(reason, now, 60 * 60) };
  }
  if (/429|rate[ -]?limit|too many requests|throttl|resource exhausted/i.test(reason)) {
    return { kind: "rate_limited", reason, retryAt: retryAtFrom(reason, now, 5 * 60) };
  }
  if (/temporar|unavailable|service\s+down|\b503\b|\b502\b/i.test(reason)) {
    return { kind: "provider_unavailable", reason, retryAt: retryAtFrom(reason, now, 60) };
  }
  return { kind: "failed", reason };
}
