import type { LoopGatewayAuthenticator } from "./gateway.js";
import type { LoopPrincipal, LoopScope } from "./tool-router.js";

const SUPPORTED_SCOPES = new Set<LoopScope>([
  "loop:read",
  "loop:plan",
  "loop:dispatch",
  "loop:repair",
  "loop:approve",
]);

type JsonObject = Record<string, unknown>;
type Auth0Jwk = JsonObject & { kid?: unknown; kty?: unknown; use?: unknown; alg?: unknown };
type LoopSubtleCrypto = Readonly<{
  importKey(
    format: string,
    keyData: unknown,
    algorithm: unknown,
    extractable: boolean,
    keyUsages: readonly string[],
  ): Promise<unknown>;
  verify(algorithm: string, key: unknown, signature: unknown, data: unknown): Promise<boolean>;
}>;

export type Auth0LoopAuthenticatorOptions = Readonly<{
  issuer: string;
  audience: string;
  allowedSubject?: string;
  allowedEmail?: string;
  requireVerifiedEmail?: boolean;
  jwksTtlMs?: number;
  fetcher?: typeof fetch;
  now?: () => number;
}>;

function object(value: unknown, label: string): JsonObject {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label} must be an object`);
  return value as JsonObject;
}

function base64UrlBytes(value: string): Uint8Array {
  const normalized = value
    .replaceAll("-", "+")
    .replaceAll("_", "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");
  const decoded = atob(normalized);
  return Uint8Array.from(decoded, (character) => character.charCodeAt(0));
}

function base64UrlJson(value: string, label: string): JsonObject {
  try {
    return object(JSON.parse(new TextDecoder().decode(base64UrlBytes(value))), label);
  } catch {
    throw new Error(`invalid Auth0 ${label}`);
  }
}

function normalizeIssuer(value: string): string {
  const url = new URL(value);
  if (url.protocol !== "https:") throw new Error("Auth0 issuer must use HTTPS");
  return `${url.toString().replace(/\/$/, "")}/`;
}

function bearerToken(headers: Readonly<Record<string, string | undefined>>): string | null {
  const raw = Object.entries(headers).find(([name]) => name.toLowerCase() === "authorization")?.[1];
  if (!raw?.startsWith("Bearer ")) return null;
  const token = raw.slice("Bearer ".length).trim();
  return token && !/\s/.test(token) && !token.includes("\0") ? token : null;
}

function claimString(claims: JsonObject, name: string): string | undefined {
  const value = claims[name];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function tokenScopes(claims: JsonObject): readonly LoopScope[] {
  const raw = claims.scope;
  if (typeof raw !== "string") return [];
  return raw
    .split(/\s+/)
    .filter((scope): scope is LoopScope => SUPPORTED_SCOPES.has(scope as LoopScope));
}

function audienceContains(claims: JsonObject, audience: string): boolean {
  const value = claims.aud;
  return typeof value === "string"
    ? value === audience
    : Array.isArray(value) && value.includes(audience);
}

export class Auth0LoopAuthenticator implements LoopGatewayAuthenticator {
  readonly #options: Auth0LoopAuthenticatorOptions & {
    issuer: string;
    jwksTtlMs: number;
    fetcher: typeof fetch;
    now: () => number;
  };
  #jwks: readonly Auth0Jwk[] = [];
  #jwksExpiresAt = 0;

  constructor(options: Auth0LoopAuthenticatorOptions) {
    this.#options = {
      ...options,
      issuer: normalizeIssuer(options.issuer),
      jwksTtlMs: options.jwksTtlMs ?? 5 * 60_000,
      fetcher: options.fetcher ?? fetch,
      now: options.now ?? (() => Date.now()),
    };
  }

  async authenticate(
    headers: Readonly<Record<string, string | undefined>>,
  ): Promise<LoopPrincipal | null> {
    const token = bearerToken(headers);
    if (!token) return null;
    try {
      const [encodedHeader, encodedClaims, encodedSignature] = token.split(".");
      if (!encodedHeader || !encodedClaims || !encodedSignature) return null;
      const header = base64UrlJson(encodedHeader, "JWT header");
      const claims = base64UrlJson(encodedClaims, "JWT claims");
      if (header.alg !== "RS256" || typeof header.kid !== "string") return null;
      const key = await this.findKey(header.kid);
      if (!key) return null;
      const subtle = crypto.subtle as unknown as LoopSubtleCrypto;
      const cryptoKey = await subtle.importKey(
        "jwk",
        key,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        false,
        ["verify"],
      );
      const valid = await subtle.verify(
        "RSASSA-PKCS1-v1_5",
        cryptoKey,
        base64UrlBytes(encodedSignature),
        new TextEncoder().encode(`${encodedHeader}.${encodedClaims}`),
      );
      if (!valid) return null;
      if (claims.iss !== this.#options.issuer || !audienceContains(claims, this.#options.audience))
        return null;
      const nowSeconds = Math.floor(this.#options.now() / 1000);
      if (typeof claims.exp !== "number" || claims.exp <= nowSeconds) return null;
      if (typeof claims.nbf === "number" && claims.nbf > nowSeconds) return null;
      const subject = claimString(claims, "sub");
      if (!subject || (this.#options.allowedSubject && subject !== this.#options.allowedSubject))
        return null;
      const email = claimString(claims, "email");
      if (this.#options.allowedEmail && email !== this.#options.allowedEmail) return null;
      if (this.#options.requireVerifiedEmail && claims.email_verified !== true) return null;
      return { subject, scopes: tokenScopes(claims) };
    } catch {
      return null;
    }
  }

  private async findKey(kid: string): Promise<Auth0Jwk | undefined> {
    let key = this.#jwks.find((entry) => entry.kid === kid);
    if (key && this.#jwksExpiresAt > this.#options.now()) return key;
    await this.refreshKeys();
    key = this.#jwks.find((entry) => entry.kid === kid);
    return key;
  }

  private async refreshKeys(): Promise<void> {
    const response = await this.#options.fetcher(`${this.#options.issuer}.well-known/jwks.json`);
    if (!response.ok) throw new Error(`Auth0 JWKS request failed: ${response.status}`);
    const body = object(await response.json(), "Auth0 JWKS response");
    if (!Array.isArray(body.keys)) throw new Error("Auth0 JWKS response has no keys");
    this.#jwks = body.keys.filter((entry): entry is Auth0Jwk => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) return false;
      const jwk = entry as Auth0Jwk;
      return (
        jwk.kty === "RSA" && jwk.use === "sig" && jwk.alg === "RS256" && typeof jwk.kid === "string"
      );
    });
    this.#jwksExpiresAt = this.#options.now() + this.#options.jwksTtlMs;
  }
}
