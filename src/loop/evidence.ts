import type { LoopD1Database } from "./d1-event-store.js";
import { sha256Hex } from "./sha256.js";

export type LoopEvidenceRecord = Readonly<{
  evidenceId: string;
  taskId: string;
  revision: number;
  contractHash: string;
  baseSha: string;
  headSha: string;
  kind: string;
  objectKey: string;
  digest: string;
  byteLength: number;
  contentType: string;
  summary: string;
  createdAt: string;
  expiresAt: string;
}>;

export type LoopEvidenceContent = string | ArrayBuffer | Uint8Array;

export type LoopEvidencePutInput = Readonly<{
  evidenceId: string;
  taskId: string;
  revision: number;
  contractHash: string;
  baseSha: string;
  headSha: string;
  kind: string;
  content: LoopEvidenceContent;
  contentType: string;
  summary: string;
  createdAt: string;
  expiresAt: string;
}>;

export type LoopEvidenceObject = Readonly<{
  record: LoopEvidenceRecord;
  content: ArrayBuffer;
}>;

export type LoopEvidenceView = Readonly<{
  record: LoopEvidenceRecord;
  contentBase64?: string;
  contentTruncated: boolean;
}>;

const BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

export function encodeBase64(bytesValue: Uint8Array): string {
  let output = "";
  for (let index = 0; index < bytesValue.length; index += 3) {
    const first = bytesValue[index]!;
    const second = bytesValue[index + 1];
    const third = bytesValue[index + 2];
    output += BASE64[first >> 2];
    output += BASE64[((first & 0x03) << 4) | ((second ?? 0) >> 4)];
    output += second === undefined ? "=" : BASE64[((second & 0x0f) << 2) | ((third ?? 0) >> 6)];
    output += third === undefined ? "=" : BASE64[third & 0x3f];
  }
  return output;
}

export interface LoopEvidenceStore {
  put(input: LoopEvidencePutInput): Promise<LoopEvidenceRecord>;
  get(objectKey: string): Promise<LoopEvidenceObject | undefined>;
  list(taskId: string): Promise<readonly LoopEvidenceRecord[]>;
}

function required(value: string, label: string): string {
  if (!value || value.includes("\0")) throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function sha(value: string, label: string): string {
  const result = required(value, label);
  if (!/^[0-9a-f]{7,64}$/i.test(result)) throw new Error(`${label} must be a git SHA`);
  return result;
}

function bytes(content: LoopEvidenceContent): Uint8Array {
  if (typeof content === "string") return new TextEncoder().encode(content);
  if (content instanceof Uint8Array) return new Uint8Array(content);
  return new Uint8Array(content.slice(0));
}

function arrayBuffer(content: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(content.byteLength);
  copy.set(content);
  return copy.buffer;
}

function objectKey(input: LoopEvidencePutInput): string {
  return [
    "evidence",
    encodeURIComponent(required(input.taskId, "taskId")),
    String(input.revision),
    sha(input.headSha, "headSha"),
    encodeURIComponent(required(input.evidenceId, "evidenceId")),
  ].join("/");
}

function validateInput(input: LoopEvidencePutInput): void {
  if (!Number.isSafeInteger(input.revision) || input.revision < 1)
    throw new Error("evidence revision must be positive");
  required(input.evidenceId, "evidenceId");
  required(input.taskId, "taskId");
  required(input.contractHash, "contractHash");
  sha(input.baseSha, "baseSha");
  sha(input.headSha, "headSha");
  required(input.kind, "kind");
  required(input.contentType, "contentType");
  required(input.summary, "summary");
  required(input.createdAt, "createdAt");
  required(input.expiresAt, "expiresAt");
  if (Date.parse(input.expiresAt) <= Date.parse(input.createdAt))
    throw new Error("evidence expiry must be after creation");
}

export class InMemoryLoopEvidenceStore implements LoopEvidenceStore {
  readonly #entries = new Map<string, LoopEvidenceObject>();

  async put(input: LoopEvidencePutInput): Promise<LoopEvidenceRecord> {
    validateInput(input);
    const content = bytes(input.content);
    const record: LoopEvidenceRecord = {
      evidenceId: input.evidenceId,
      taskId: input.taskId,
      revision: input.revision,
      contractHash: input.contractHash,
      baseSha: input.baseSha,
      headSha: input.headSha,
      kind: input.kind,
      objectKey: objectKey(input),
      digest: sha256Hex(content),
      byteLength: content.byteLength,
      contentType: input.contentType,
      summary: input.summary,
      createdAt: input.createdAt,
      expiresAt: input.expiresAt,
    };
    const prior = this.#entries.get(record.objectKey);
    if (prior) {
      if (prior.record.digest !== record.digest)
        throw new Error("evidence key already contains different content");
      return prior.record;
    }
    this.#entries.set(record.objectKey, { record, content: arrayBuffer(content) });
    return record;
  }

  async get(objectKeyValue: string): Promise<LoopEvidenceObject | undefined> {
    const result = this.#entries.get(objectKeyValue);
    return result ? { record: result.record, content: result.content.slice(0) } : undefined;
  }

  async list(taskId: string): Promise<readonly LoopEvidenceRecord[]> {
    return [...this.#entries.values()]
      .filter((entry) => entry.record.taskId === taskId)
      .map((entry) => entry.record);
  }
}

export interface LoopR2Object {
  arrayBuffer(): Promise<ArrayBuffer>;
}

export interface LoopR2Bucket {
  put(
    key: string,
    value: ArrayBuffer,
    options?: Readonly<{ httpMetadata?: Readonly<{ contentType?: string }> }>,
  ): Promise<unknown>;
  get(key: string): Promise<LoopR2Object | null>;
  delete(keys: string | readonly string[]): Promise<void>;
}

type EvidenceRow = Readonly<{
  evidence_id: string;
  task_id: string;
  revision: number;
  contract_hash: string;
  base_sha: string;
  head_sha: string;
  kind: string;
  object_key: string;
  digest: string;
  byte_length: number;
  content_type: string;
  summary: string;
  created_at: string;
  expires_at: string;
}>;

function recordFromRow(row: EvidenceRow): LoopEvidenceRecord {
  return {
    evidenceId: row.evidence_id,
    taskId: row.task_id,
    revision: row.revision,
    contractHash: row.contract_hash,
    baseSha: row.base_sha,
    headSha: row.head_sha,
    kind: row.kind,
    objectKey: row.object_key,
    digest: row.digest,
    byteLength: row.byte_length,
    contentType: row.content_type,
    summary: row.summary,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
  };
}

/** R2 content plus D1 metadata, with exact SHA/revision binding. */
export class D1R2LoopEvidenceStore implements LoopEvidenceStore {
  constructor(
    readonly database: LoopD1Database,
    readonly bucket: LoopR2Bucket,
  ) {}

  async put(input: LoopEvidencePutInput): Promise<LoopEvidenceRecord> {
    validateInput(input);
    const content = bytes(input.content);
    const record: LoopEvidenceRecord = {
      evidenceId: input.evidenceId,
      taskId: input.taskId,
      revision: input.revision,
      contractHash: input.contractHash,
      baseSha: input.baseSha,
      headSha: input.headSha,
      kind: input.kind,
      objectKey: objectKey(input),
      digest: sha256Hex(content),
      byteLength: content.byteLength,
      contentType: input.contentType,
      summary: input.summary,
      createdAt: input.createdAt,
      expiresAt: input.expiresAt,
    };
    const prior = await this.database
      .prepare(
        "SELECT evidence_id, task_id, revision, contract_hash, base_sha, head_sha, kind, object_key, digest, byte_length, content_type, summary, created_at, expires_at FROM loop_evidence WHERE object_key = ?1 LIMIT 1",
      )
      .bind(record.objectKey)
      .first<EvidenceRow>();
    if (prior) {
      const existing = recordFromRow(prior);
      if (existing.digest !== record.digest)
        throw new Error("evidence key already contains different content");
      return existing;
    }
    await this.bucket.put(record.objectKey, arrayBuffer(content), {
      httpMetadata: { contentType: record.contentType },
    });
    await this.database
      .prepare(
        "INSERT INTO loop_evidence (evidence_id, task_id, revision, contract_hash, base_sha, head_sha, kind, object_key, digest, byte_length, content_type, summary, created_at, expires_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14)",
      )
      .bind(
        record.evidenceId,
        record.taskId,
        record.revision,
        record.contractHash,
        record.baseSha,
        record.headSha,
        record.kind,
        record.objectKey,
        record.digest,
        record.byteLength,
        record.contentType,
        record.summary,
        record.createdAt,
        record.expiresAt,
      )
      .run();
    return record;
  }

  async get(objectKeyValue: string): Promise<LoopEvidenceObject | undefined> {
    const row = await this.database
      .prepare(
        "SELECT evidence_id, task_id, revision, contract_hash, base_sha, head_sha, kind, object_key, digest, byte_length, content_type, summary, created_at, expires_at FROM loop_evidence WHERE object_key = ?1 LIMIT 1",
      )
      .bind(objectKeyValue)
      .first<EvidenceRow>();
    if (!row) return undefined;
    const object = await this.bucket.get(objectKeyValue);
    if (!object) throw new Error(`evidence object missing from R2: ${objectKeyValue}`);
    const content = await object.arrayBuffer();
    const record = recordFromRow(row);
    if (
      content.byteLength !== record.byteLength ||
      sha256Hex(new Uint8Array(content)) !== record.digest
    )
      throw new Error(`evidence digest mismatch: ${objectKeyValue}`);
    return { record, content };
  }

  async list(taskId: string): Promise<readonly LoopEvidenceRecord[]> {
    const result = await this.database
      .prepare(
        "SELECT evidence_id, task_id, revision, contract_hash, base_sha, head_sha, kind, object_key, digest, byte_length, content_type, summary, created_at, expires_at FROM loop_evidence WHERE task_id = ?1 ORDER BY created_at ASC",
      )
      .bind(taskId)
      .all<EvidenceRow>();
    return result.results.map(recordFromRow);
  }

  async expire(now: string): Promise<number> {
    const rows = await this.database
      .prepare("SELECT object_key FROM loop_evidence WHERE expires_at <= ?1")
      .bind(now)
      .all<Readonly<{ object_key: string }>>();
    for (const row of rows.results) {
      await this.bucket.delete(row.object_key);
      await this.database
        .prepare("DELETE FROM loop_evidence WHERE object_key = ?1")
        .bind(row.object_key)
        .run();
    }
    return rows.results.length;
  }
}
