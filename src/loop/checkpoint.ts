import { LOOP_DEVIN_MODEL, type LoopDevinModel } from "../loop-runner/model.js";
import type { LoopD1Database } from "./d1-event-store.js";

export type LoopCheckpointStatus = "active" | "completed" | "rate_limited" | "failed" | "handoff";

export type LoopRunCheckpoint = Readonly<{
  checkpointId: string;
  runId: string;
  taskId: string;
  generation: number;
  cancellationGeneration: number;
  taskRevision: number;
  model: LoopDevinModel;
  contractHash: string;
  sessionIdDigest: string;
  status: LoopCheckpointStatus;
  phase: string;
  handoff: string;
  providerReason?: string;
  retryAt?: string;
  updatedAt: string;
}>;

export interface LoopRunCheckpointStore {
  put(record: LoopRunCheckpoint): Promise<LoopRunCheckpoint>;
  get(checkpointId: string): Promise<LoopRunCheckpoint | undefined>;
  latest(runId: string): Promise<LoopRunCheckpoint | undefined>;
  list(runId?: string): Promise<readonly LoopRunCheckpoint[]>;
}

const STATUSES: readonly LoopCheckpointStatus[] = [
  "active",
  "completed",
  "rate_limited",
  "failed",
  "handoff",
];
const MAX_HANDOFF_BYTES = 16 * 1024;

function nonEmpty(value: string, label: string): string {
  if (!value || value.includes("\0")) throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function positive(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${label} must be positive`);
  return value;
}

function status(value: LoopCheckpointStatus): LoopCheckpointStatus {
  if (!STATUSES.includes(value)) throw new Error(`invalid checkpoint status: ${value}`);
  return value;
}

function validate(record: LoopRunCheckpoint): void {
  nonEmpty(record.checkpointId, "checkpointId");
  nonEmpty(record.runId, "runId");
  nonEmpty(record.taskId, "taskId");
  positive(record.generation, "generation");
  positive(record.cancellationGeneration, "cancellationGeneration");
  positive(record.taskRevision, "taskRevision");
  if (record.model !== LOOP_DEVIN_MODEL)
    throw new Error(
      `Loop only permits the configured execution provider model ${String(LOOP_DEVIN_MODEL)}`,
    );
  nonEmpty(record.contractHash, "contractHash");
  nonEmpty(record.sessionIdDigest, "sessionIdDigest");
  status(record.status);
  nonEmpty(record.phase, "phase");
  nonEmpty(record.handoff, "handoff");
  if (Buffer.byteLength(record.handoff, "utf8") > MAX_HANDOFF_BYTES)
    throw new Error("handoff exceeds the checkpoint size limit");
  if (record.providerReason !== undefined) nonEmpty(record.providerReason, "providerReason");
  if (record.retryAt !== undefined) nonEmpty(record.retryAt, "retryAt");
  nonEmpty(record.updatedAt, "updatedAt");
}

export class InMemoryLoopRunCheckpointStore implements LoopRunCheckpointStore {
  readonly #records = new Map<string, LoopRunCheckpoint>();

  async put(record: LoopRunCheckpoint): Promise<LoopRunCheckpoint> {
    validate(record);
    this.#records.set(record.checkpointId, record);
    return record;
  }

  async get(checkpointId: string): Promise<LoopRunCheckpoint | undefined> {
    return this.#records.get(nonEmpty(checkpointId, "checkpointId"));
  }

  async latest(runId: string): Promise<LoopRunCheckpoint | undefined> {
    return (await this.list(runId))[0];
  }

  async list(runId?: string): Promise<readonly LoopRunCheckpoint[]> {
    return [...this.#records.values()]
      .filter((record) => runId === undefined || record.runId === runId)
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  }
}

type CheckpointRow = Readonly<{
  checkpoint_id: string;
  run_id: string;
  task_id: string;
  generation: number;
  cancellation_generation: number;
  task_revision: number;
  model: string;
  contract_hash: string;
  session_id_digest: string;
  status: LoopCheckpointStatus;
  phase: string;
  handoff: string;
  provider_reason: string | null;
  retry_at: string | null;
  updated_at: string;
}>;

function fromRow(row: CheckpointRow): LoopRunCheckpoint {
  const record: LoopRunCheckpoint = {
    checkpointId: row.checkpoint_id,
    runId: row.run_id,
    taskId: row.task_id,
    generation: row.generation,
    cancellationGeneration: row.cancellation_generation,
    taskRevision: row.task_revision,
    model: row.model as LoopDevinModel,
    contractHash: row.contract_hash,
    sessionIdDigest: row.session_id_digest,
    status: row.status,
    phase: row.phase,
    handoff: row.handoff,
    ...(row.provider_reason === null ? {} : { providerReason: row.provider_reason }),
    ...(row.retry_at === null ? {} : { retryAt: row.retry_at }),
    updatedAt: row.updated_at,
  };
  validate(record);
  return record;
}

const COLUMNS =
  "checkpoint_id, run_id, task_id, generation, cancellation_generation, task_revision, model, contract_hash, session_id_digest, status, phase, handoff, provider_reason, retry_at, updated_at";

export class D1LoopRunCheckpointStore implements LoopRunCheckpointStore {
  constructor(readonly database: LoopD1Database) {}

  async put(record: LoopRunCheckpoint): Promise<LoopRunCheckpoint> {
    validate(record);
    await this.database
      .prepare(
        "INSERT OR REPLACE INTO loop_run_checkpoints (checkpoint_id, run_id, task_id, generation, cancellation_generation, task_revision, model, contract_hash, session_id_digest, status, phase, handoff, provider_reason, retry_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15)",
      )
      .bind(
        record.checkpointId,
        record.runId,
        record.taskId,
        record.generation,
        record.cancellationGeneration,
        record.taskRevision,
        record.model,
        record.contractHash,
        record.sessionIdDigest,
        record.status,
        record.phase,
        record.handoff,
        record.providerReason ?? null,
        record.retryAt ?? null,
        record.updatedAt,
      )
      .run();
    const saved = await this.get(record.checkpointId);
    if (!saved) throw new Error(`checkpoint did not persist: ${record.checkpointId}`);
    return saved;
  }

  async get(checkpointId: string): Promise<LoopRunCheckpoint | undefined> {
    const row = await this.database
      .prepare(`SELECT ${COLUMNS} FROM loop_run_checkpoints WHERE checkpoint_id = ?1`)
      .bind(nonEmpty(checkpointId, "checkpointId"))
      .first<CheckpointRow>();
    return row ? fromRow(row) : undefined;
  }

  async latest(runId: string): Promise<LoopRunCheckpoint | undefined> {
    const row = await this.database
      .prepare(
        `SELECT ${COLUMNS} FROM loop_run_checkpoints WHERE run_id = ?1 ORDER BY generation DESC, updated_at DESC LIMIT 1`,
      )
      .bind(nonEmpty(runId, "runId"))
      .first<CheckpointRow>();
    return row ? fromRow(row) : undefined;
  }

  async list(runId?: string): Promise<readonly LoopRunCheckpoint[]> {
    const statement = runId
      ? this.database
          .prepare(
            `SELECT ${COLUMNS} FROM loop_run_checkpoints WHERE run_id = ?1 ORDER BY updated_at DESC`,
          )
          .bind(runId)
      : this.database.prepare(
          `SELECT ${COLUMNS} FROM loop_run_checkpoints ORDER BY updated_at DESC`,
        );
    const result = await statement.all<CheckpointRow>();
    return result.results.map(fromRow);
  }
}
