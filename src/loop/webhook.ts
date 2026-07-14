import type { LoopD1Database } from "./d1-event-store.js";

export interface LoopSubtleCrypto {
  importKey(
    format: "raw",
    keyData: ArrayBuffer,
    algorithm: Readonly<{ name: "HMAC"; hash: "SHA-256" }>,
    extractable: false,
    keyUsages: readonly ["sign"],
  ): Promise<unknown>;
  sign(algorithm: "HMAC", key: unknown, data: ArrayBuffer): Promise<ArrayBuffer>;
}

export const LOOP_MAX_WEBHOOK_BODY_BYTES = 128 * 1024;

function bytes(value: ArrayBuffer | Uint8Array): ArrayBuffer {
  if (value instanceof Uint8Array)
    return value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength) as ArrayBuffer;
  return value;
}

function hex(bytes: ArrayBuffer): string {
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function equalHex(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

/** Verify GitHub's X-Hub-Signature-256 without Node-only crypto APIs. */
export async function verifyGithubWebhookSignature(
  secret: string,
  body: string,
  signature: string | undefined,
  subtle: LoopSubtleCrypto = globalThis.crypto.subtle as unknown as LoopSubtleCrypto,
): Promise<boolean> {
  return verifyGithubWebhookSignatureBytes(
    secret,
    new TextEncoder().encode(body),
    signature,
    subtle,
  );
}

/** Verify the signature over the exact bytes received from the network. */
export async function verifyGithubWebhookSignatureBytes(
  secret: string,
  body: ArrayBuffer | Uint8Array,
  signature: string | undefined,
  subtle: LoopSubtleCrypto = globalThis.crypto.subtle as unknown as LoopSubtleCrypto,
): Promise<boolean> {
  if (!secret || !signature?.startsWith("sha256=")) return false;
  const expected = signature.slice("sha256=".length).toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(expected)) return false;
  const encoder = new TextEncoder();
  const key = await subtle.importKey(
    "raw",
    bytes(encoder.encode(secret)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const actual = hex(await subtle.sign("HMAC", key, bytes(body)));
  return equalHex(actual, expected);
}

export type LoopWebhookClaimResult = "claimed" | "duplicate";

export interface LoopWebhookDedupStore {
  claim(
    input: Readonly<{ deliveryId: string; receivedAt: string; expiresAt: string }>,
  ): Promise<LoopWebhookClaimResult>;
}

export class InMemoryLoopWebhookDedupStore implements LoopWebhookDedupStore {
  readonly #deliveries = new Map<string, string>();

  async claim(
    input: Readonly<{ deliveryId: string; receivedAt: string; expiresAt: string }>,
  ): Promise<LoopWebhookClaimResult> {
    if (!/^[A-Za-z0-9._:-]{1,256}$/.test(input.deliveryId))
      throw new Error("delivery ID is invalid");
    if (
      !Number.isFinite(Date.parse(input.receivedAt)) ||
      !Number.isFinite(Date.parse(input.expiresAt))
    )
      throw new Error("delivery timestamps are invalid");
    const existing = this.#deliveries.get(input.deliveryId);
    if (existing && existing > input.receivedAt) return "duplicate";
    this.#deliveries.set(input.deliveryId, input.expiresAt);
    return "claimed";
  }
}

type DedupRow = Readonly<{ delivery_id: string; expires_at: string }>;

/** D1 delivery claim. INSERT OR IGNORE makes duplicate delivery safe. */
export class D1LoopWebhookDedupStore implements LoopWebhookDedupStore {
  constructor(readonly database: LoopD1Database) {}

  async claim(
    input: Readonly<{ deliveryId: string; receivedAt: string; expiresAt: string }>,
  ): Promise<LoopWebhookClaimResult> {
    if (!/^[A-Za-z0-9._:-]{1,256}$/.test(input.deliveryId))
      throw new Error("delivery ID is invalid");
    if (
      !Number.isFinite(Date.parse(input.receivedAt)) ||
      !Number.isFinite(Date.parse(input.expiresAt))
    )
      throw new Error("delivery timestamps are invalid");
    const existing = await this.database
      .prepare(
        "SELECT delivery_id, expires_at FROM loop_webhook_deliveries WHERE delivery_id = ?1 LIMIT 1",
      )
      .bind(input.deliveryId)
      .first<DedupRow>();
    if (existing && existing.expires_at > input.receivedAt) return "duplicate";
    if (existing) {
      await this.database
        .prepare("DELETE FROM loop_webhook_deliveries WHERE delivery_id = ?1")
        .bind(input.deliveryId)
        .run();
    }
    const result = (await this.database
      .prepare(
        "INSERT OR IGNORE INTO loop_webhook_deliveries (delivery_id, received_at, expires_at) VALUES (?1, ?2, ?3)",
      )
      .bind(input.deliveryId, input.receivedAt, input.expiresAt)
      .run()) as { meta?: { changes?: number } };
    if (result.meta?.changes !== 1) return "duplicate";
    return "claimed";
  }

  async expire(now: string): Promise<number> {
    const rows = await this.database
      .prepare("SELECT delivery_id FROM loop_webhook_deliveries WHERE expires_at <= ?1")
      .bind(now)
      .all<Readonly<{ delivery_id: string }>>();
    for (const row of rows.results) {
      await this.database
        .prepare("DELETE FROM loop_webhook_deliveries WHERE delivery_id = ?1")
        .bind(row.delivery_id)
        .run();
    }
    return rows.results.length;
  }
}
