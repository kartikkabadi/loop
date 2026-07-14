import type { LoopD1Database } from "./d1-event-store.js";
import { LOOP_DEVIN_MODEL, type LoopDevinModel } from "../loop-runner/model.js";

export type LoopRunStatus =
  | "admitted"
  | "waiting_capacity"
  | "waiting_box"
  | "waiting_rate_limit"
  | "resuming"
  | "preparing"
  | "executing"
  | "repairing"
  | "publishing"
  | "verifying"
  | "reviewing"
  | "awaiting_human"
  | "needs_replan"
  | "completed"
  | "failed"
  | "cancelled";

export type LoopRunRecord = Readonly<{
  runId: string;
  taskId: string;
  attempt: number;
  generation: number;
  cancellationGeneration: number;
  expectedVersion: number;
  model: LoopDevinModel;
  status: LoopRunStatus;
  startedAt: string;
  updatedAt: string;
  providerLeaseId?: string;
  nextAttemptAt?: string;
  providerReason?: string;
  errorMessage?: string;
}>;

export interface LoopRunStore {
  get(runId: string): Promise<LoopRunRecord | undefined>;
  create(
    input: Readonly<
      Omit<LoopRunRecord, "model" | "status" | "updatedAt" | "cancellationGeneration"> & {
        cancellationGeneration?: number;
        model?: LoopDevinModel;
        status?: LoopRunStatus;
        updatedAt?: string;
      }
    >,
  ): Promise<LoopRunRecord>;
  update(
    runId: string,
    input: Readonly<{
      status: LoopRunStatus;
      updatedAt: string;
      attempt?: number;
      generation?: number;
      cancellationGeneration?: number;
      providerLeaseId?: string | null;
      clearProviderLease?: boolean;
      nextAttemptAt?: string | null;
      clearNextAttemptAt?: boolean;
      providerReason?: string | null;
      clearProviderReason?: boolean;
      errorMessage?: string;
    }>,
  ): Promise<LoopRunRecord>;
  list(taskId?: string): Promise<readonly LoopRunRecord[]>;
}

const STATUSES: readonly LoopRunStatus[] = [
  "admitted",
  "waiting_capacity",
  "waiting_box",
  "waiting_rate_limit",
  "resuming",
  "preparing",
  "executing",
  "repairing",
  "publishing",
  "verifying",
  "reviewing",
  "awaiting_human",
  "needs_replan",
  "completed",
  "failed",
  "cancelled",
];

function nonEmpty(value: string, label: string): string {
  if (!value || value.includes("\0")) throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${label} must be positive`);
  return value;
}

function status(value: LoopRunStatus): LoopRunStatus {
  if (!STATUSES.includes(value)) throw new Error(`invalid run status: ${value}`);
  return value;
}

function model(value: LoopDevinModel | undefined): LoopDevinModel {
  if (value !== undefined && value !== LOOP_DEVIN_MODEL)
    throw new Error(`Loop only permits Devin model ${String(LOOP_DEVIN_MODEL)}`);
  return LOOP_DEVIN_MODEL;
}

function validateCreate(
  input: Readonly<
    Omit<LoopRunRecord, "model" | "status" | "updatedAt" | "cancellationGeneration"> & {
      cancellationGeneration?: number;
      model?: LoopDevinModel;
      status?: LoopRunStatus;
      updatedAt?: string;
    }
  >,
): void {
  nonEmpty(input.runId, "runId");
  nonEmpty(input.taskId, "taskId");
  positiveInteger(input.attempt, "attempt");
  positiveInteger(input.generation, "generation");
  positiveInteger(input.cancellationGeneration ?? 1, "cancellationGeneration");
  if (!Number.isSafeInteger(input.expectedVersion) || input.expectedVersion < 0)
    throw new Error("expectedVersion must be a non-negative safe integer");
  nonEmpty(input.startedAt, "startedAt");
  if (input.updatedAt !== undefined) nonEmpty(input.updatedAt, "updatedAt");
  model(input.model);
  if (input.status !== undefined) status(input.status);
}

export class InMemoryLoopRunStore implements LoopRunStore {
  readonly #runs = new Map<string, LoopRunRecord>();

  async get(runId: string): Promise<LoopRunRecord | undefined> {
    return this.#runs.get(nonEmpty(runId, "runId"));
  }

  async create(
    input: Readonly<
      Omit<LoopRunRecord, "model" | "status" | "updatedAt" | "cancellationGeneration"> & {
        cancellationGeneration?: number;
        model?: LoopDevinModel;
        status?: LoopRunStatus;
        updatedAt?: string;
      }
    >,
  ): Promise<LoopRunRecord> {
    validateCreate(input);
    const existing = this.#runs.get(input.runId);
    if (existing) {
      if (existing.taskId !== input.taskId || existing.attempt !== input.attempt)
        throw new Error(`run identity collision: ${input.runId}`);
      return existing;
    }
    const run: LoopRunRecord = {
      ...input,
      cancellationGeneration: input.cancellationGeneration ?? 1,
      model: model(input.model),
      status: input.status ?? "admitted",
      updatedAt: input.updatedAt ?? input.startedAt,
    };
    this.#runs.set(run.runId, run);
    return run;
  }

  async update(
    runId: string,
    input: Readonly<{
      status: LoopRunStatus;
      updatedAt: string;
      attempt?: number;
      generation?: number;
      cancellationGeneration?: number;
      providerLeaseId?: string | null;
      clearProviderLease?: boolean;
      nextAttemptAt?: string | null;
      clearNextAttemptAt?: boolean;
      providerReason?: string | null;
      clearProviderReason?: boolean;
      errorMessage?: string;
    }>,
  ): Promise<LoopRunRecord> {
    const existing = await this.get(runId);
    if (!existing) throw new Error(`run not found: ${runId}`);
    status(input.status);
    nonEmpty(input.updatedAt, "updatedAt");
    const attempt =
      input.attempt === undefined ? existing.attempt : positiveInteger(input.attempt, "attempt");
    const generation =
      input.generation === undefined
        ? existing.generation
        : positiveInteger(input.generation, "generation");
    const cancellationGeneration =
      input.cancellationGeneration === undefined
        ? existing.cancellationGeneration
        : positiveInteger(input.cancellationGeneration, "cancellationGeneration");
    const providerLeaseId =
      input.clearProviderLease || input.providerLeaseId === null
        ? undefined
        : input.providerLeaseId === undefined
          ? existing.providerLeaseId
          : nonEmpty(input.providerLeaseId, "providerLeaseId");
    const nextAttemptAt =
      input.clearNextAttemptAt || input.nextAttemptAt === null
        ? undefined
        : input.nextAttemptAt === undefined
          ? existing.nextAttemptAt
          : nonEmpty(input.nextAttemptAt, "nextAttemptAt");
    const providerReason =
      input.clearProviderReason || input.providerReason === null
        ? undefined
        : input.providerReason === undefined
          ? existing.providerReason
          : nonEmpty(input.providerReason, "providerReason");
    const errorMessage =
      input.errorMessage === undefined
        ? existing.errorMessage
        : nonEmpty(input.errorMessage, "errorMessage");
    const run: LoopRunRecord = {
      runId: existing.runId,
      taskId: existing.taskId,
      attempt,
      generation,
      cancellationGeneration,
      expectedVersion: existing.expectedVersion,
      model: existing.model,
      status: input.status,
      startedAt: existing.startedAt,
      updatedAt: input.updatedAt,
      ...(providerLeaseId === undefined ? {} : { providerLeaseId }),
      ...(nextAttemptAt === undefined ? {} : { nextAttemptAt }),
      ...(providerReason === undefined ? {} : { providerReason }),
      ...(errorMessage === undefined ? {} : { errorMessage }),
    };
    this.#runs.set(runId, run);
    return run;
  }

  async list(taskId?: string): Promise<readonly LoopRunRecord[]> {
    return [...this.#runs.values()]
      .filter((run) => taskId === undefined || run.taskId === taskId)
      .sort((left, right) => left.runId.localeCompare(right.runId));
  }
}

type RunRow = Readonly<{
  run_id: string;
  task_id: string;
  attempt: number;
  generation: number;
  cancellation_generation: number | null;
  expected_version: number;
  model: string;
  status: LoopRunStatus;
  started_at: string;
  updated_at: string;
  provider_lease_id: string | null;
  next_attempt_at: string | null;
  provider_reason: string | null;
  error_message: string | null;
}>;

function fromRow(row: RunRow): LoopRunRecord {
  if (row.model !== LOOP_DEVIN_MODEL) throw new Error(`unsupported Loop Devin model: ${row.model}`);
  return {
    runId: row.run_id,
    taskId: row.task_id,
    attempt: row.attempt,
    generation: row.generation,
    cancellationGeneration: row.cancellation_generation ?? 1,
    expectedVersion: row.expected_version,
    model: LOOP_DEVIN_MODEL,
    status: status(row.status),
    startedAt: row.started_at,
    updatedAt: row.updated_at,
    ...(row.provider_lease_id === null ? {} : { providerLeaseId: row.provider_lease_id }),
    ...(row.next_attempt_at === null ? {} : { nextAttemptAt: row.next_attempt_at }),
    ...(row.provider_reason === null ? {} : { providerReason: row.provider_reason }),
    ...(row.error_message === null ? {} : { errorMessage: row.error_message }),
  };
}

const COLUMNS =
  "run_id, task_id, attempt, generation, cancellation_generation, expected_version, model, status, started_at, updated_at, provider_lease_id, next_attempt_at, provider_reason, error_message";

export class D1LoopRunStore implements LoopRunStore {
  constructor(readonly database: LoopD1Database) {}

  async get(runId: string): Promise<LoopRunRecord | undefined> {
    const row = await this.database
      .prepare(`SELECT ${COLUMNS} FROM loop_runs WHERE run_id = ?1`)
      .bind(nonEmpty(runId, "runId"))
      .first<RunRow>();
    return row ? fromRow(row) : undefined;
  }

  async create(
    input: Readonly<
      Omit<LoopRunRecord, "model" | "status" | "updatedAt" | "cancellationGeneration"> & {
        cancellationGeneration?: number;
        model?: LoopDevinModel;
        status?: LoopRunStatus;
        updatedAt?: string;
      }
    >,
  ): Promise<LoopRunRecord> {
    validateCreate(input);
    await this.database
      .prepare(
        "INSERT OR IGNORE INTO loop_runs (run_id, task_id, attempt, generation, cancellation_generation, expected_version, model, status, started_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)",
      )
      .bind(
        input.runId,
        input.taskId,
        input.attempt,
        input.generation,
        input.cancellationGeneration ?? 1,
        input.expectedVersion,
        model(input.model),
        input.status ?? "admitted",
        input.startedAt,
        input.updatedAt ?? input.startedAt,
      )
      .run();
    const run = await this.get(input.runId);
    if (!run) throw new Error(`run did not persist: ${input.runId}`);
    if (run.taskId !== input.taskId || run.attempt !== input.attempt)
      throw new Error(`run identity collision: ${input.runId}`);
    return run;
  }

  async update(
    runId: string,
    input: Readonly<{
      status: LoopRunStatus;
      updatedAt: string;
      attempt?: number;
      generation?: number;
      cancellationGeneration?: number;
      providerLeaseId?: string | null;
      clearProviderLease?: boolean;
      nextAttemptAt?: string | null;
      clearNextAttemptAt?: boolean;
      providerReason?: string | null;
      clearProviderReason?: boolean;
      errorMessage?: string;
    }>,
  ): Promise<LoopRunRecord> {
    const current = await this.get(runId);
    if (!current) throw new Error(`run not found: ${runId}`);
    status(input.status);
    nonEmpty(input.updatedAt, "updatedAt");
    if (input.cancellationGeneration !== undefined)
      positiveInteger(input.cancellationGeneration, "cancellationGeneration");
    await this.database
      .prepare(
        "UPDATE loop_runs SET attempt = COALESCE(?2, attempt), generation = COALESCE(?3, generation), cancellation_generation = COALESCE(?4, cancellation_generation), status = ?5, updated_at = ?6, provider_lease_id = CASE WHEN ?8 = 1 THEN NULL WHEN ?7 IS NULL THEN provider_lease_id ELSE ?7 END, next_attempt_at = CASE WHEN ?10 = 1 THEN NULL WHEN ?9 IS NULL THEN next_attempt_at ELSE ?9 END, provider_reason = CASE WHEN ?12 = 1 THEN NULL WHEN ?11 IS NULL THEN provider_reason ELSE ?11 END, error_message = COALESCE(?13, error_message) WHERE run_id = ?1",
      )
      .bind(
        runId,
        input.attempt ?? null,
        input.generation ?? null,
        input.cancellationGeneration ?? null,
        input.status,
        input.updatedAt,
        input.providerLeaseId === undefined ? null : input.providerLeaseId,
        input.clearProviderLease ? 1 : 0,
        input.nextAttemptAt === undefined ? null : input.nextAttemptAt,
        input.clearNextAttemptAt ? 1 : 0,
        input.providerReason === undefined ? null : input.providerReason,
        input.clearProviderReason ? 1 : 0,
        input.errorMessage ?? null,
      )
      .run();
    const run = await this.get(runId);
    if (!run) throw new Error(`run update did not persist: ${runId}`);
    return run;
  }

  async list(taskId?: string): Promise<readonly LoopRunRecord[]> {
    const query =
      taskId === undefined
        ? `SELECT ${COLUMNS} FROM loop_runs ORDER BY run_id ASC`
        : `SELECT ${COLUMNS} FROM loop_runs WHERE task_id = ?1 ORDER BY run_id ASC`;
    const statement = this.database.prepare(query);
    const result =
      taskId === undefined
        ? await statement.all<RunRow>()
        : await statement.bind(taskId).all<RunRow>();
    return result.results.map(fromRow);
  }
}
