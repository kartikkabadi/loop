export function isRetryableCodexTransportError(value: unknown): boolean {
  const message = String(value ?? "");
  return /write_stdin failed: stdin is closed|stdin is closed for this session/i.test(message);
}
