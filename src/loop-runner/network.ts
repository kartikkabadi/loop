const PRIVATE_IPV4 = /^(?:0|10|127|169\.254|192\.168|172\.(?:1[6-9]|2\d|3[01]))(?:\.|$)/;

/** Validate the externally supplied workflow callback before any signed event is sent. */
export function assertSafeLoopEventUrl(value: string): string {
  if (!value || value.includes("\0")) throw new Error("event URL is invalid");
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error("event URL is invalid");
  }
  const hostname = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (parsed.protocol !== "https:") throw new Error("event URL must use HTTPS");
  if (parsed.username || parsed.password) throw new Error("event URL must not contain credentials");
  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".home.arpa") ||
    hostname === "::1" ||
    hostname.startsWith("fc") ||
    hostname.startsWith("fd") ||
    hostname.startsWith("fe80:") ||
    PRIVATE_IPV4.test(hostname)
  ) {
    throw new Error("event URL targets a private or local host");
  }
  return parsed.toString();
}
