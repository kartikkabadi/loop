import type { LoopD1Database } from "./d1-event-store.js";

export type LoopBoxAllocationStatus =
  | "intent"
  | "allocated"
  | "stopping"
  | "stopped"
  | "deleted"
  | "orphaned"
  | "ambiguous"
  | "failed";

export type LoopBoxAllocationRecord = Readonly<{
  allocationId: string;
  taskId: string;
  runId: string;
  attempt: number;
  provider: "ascii-box";
  deterministicName: string;
  boxId?: string;
  status: LoopBoxAllocationStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  errorMessage?: string;
}>;

export type LoopBoxAllocationIntent = Readonly<{
  allocationId: string;
  taskId: string;
  runId: string;
  attempt: number;
  deterministicName: string;
  createdAt: string;
  expiresAt: string;
}>;

export type LoopBoxResource = Readonly<{
  boxId: string;
  deterministicName: string;
  status: "running" | "stopped" | "unknown";
}>;

export interface LoopBoxAllocationStore {
  get(allocationId: string): Promise<LoopBoxAllocationRecord | undefined>;
  putIntent(input: LoopBoxAllocationIntent): Promise<LoopBoxAllocationRecord>;
  update(
    allocationId: string,
    input: Readonly<{
      status: LoopBoxAllocationStatus;
      updatedAt: string;
      boxId?: string;
      errorMessage?: string;
    }>,
  ): Promise<LoopBoxAllocationRecord>;
  list(): Promise<readonly LoopBoxAllocationRecord[]>;
}

export interface LoopBoxControlClient {
  create(
    input: Readonly<{ deterministicName: string; ttlSeconds: number }>,
  ): Promise<Readonly<{ boxId: string; deterministicName: string }>>;
  list(): Promise<readonly LoopBoxResource[]>;
  stop(boxId: string): Promise<void>;
  delete(boxId: string): Promise<void>;
}

export type LoopBoxReconciliation = Readonly<{
  owned: readonly LoopBoxResource[];
  stale: readonly LoopBoxAllocationRecord[];
  orphaned: readonly LoopBoxResource[];
  ambiguous: readonly LoopBoxResource[];
}>;

function nonEmpty(value: string, label: string): string {
  if (!value || value.includes("\0")) throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${label} must be positive`);
  return value;
}

function validateIntent(input: LoopBoxAllocationIntent): void {
  nonEmpty(input.allocationId, "allocationId");
  nonEmpty(input.taskId, "taskId");
  nonEmpty(input.runId, "runId");
  nonEmpty(input.deterministicName, "deterministicName");
  positiveInteger(input.attempt, "attempt");
  nonEmpty(input.createdAt, "createdAt");
  nonEmpty(input.expiresAt, "expiresAt");
  if (Date.parse(input.expiresAt) <= Date.parse(input.createdAt))
    throw new Error("allocation expiry must be after creation");
}

function validateRecordUpdate(
  input: Readonly<{
    status: LoopBoxAllocationStatus;
    updatedAt: string;
    boxId?: string;
    errorMessage?: string;
  }>,
): void {
  nonEmpty(input.updatedAt, "updatedAt");
  if (input.boxId !== undefined) nonEmpty(input.boxId, "boxId");
  if (input.errorMessage !== undefined) nonEmpty(input.errorMessage, "errorMessage");
  if (input.status === "allocated" && input.boxId === undefined)
    throw new Error("allocated records require boxId");
}

export class InMemoryLoopBoxAllocationStore implements LoopBoxAllocationStore {
  readonly #records = new Map<string, LoopBoxAllocationRecord>();

  async get(allocationId: string): Promise<LoopBoxAllocationRecord | undefined> {
    return this.#records.get(nonEmpty(allocationId, "allocationId"));
  }

  async putIntent(input: LoopBoxAllocationIntent): Promise<LoopBoxAllocationRecord> {
    validateIntent(input);
    const existing = this.#records.get(input.allocationId);
    if (existing) {
      if (
        existing.taskId !== input.taskId ||
        existing.runId !== input.runId ||
        existing.deterministicName !== input.deterministicName
      )
        throw new Error(`allocation intent collision: ${input.allocationId}`);
      return existing;
    }
    const record: LoopBoxAllocationRecord = {
      ...input,
      provider: "ascii-box",
      status: "intent",
      updatedAt: input.createdAt,
    };
    this.#records.set(input.allocationId, record);
    return record;
  }

  async update(
    allocationId: string,
    input: Readonly<{
      status: LoopBoxAllocationStatus;
      updatedAt: string;
      boxId?: string;
      errorMessage?: string;
    }>,
  ): Promise<LoopBoxAllocationRecord> {
    validateRecordUpdate(input);
    const existing = this.#records.get(nonEmpty(allocationId, "allocationId"));
    if (!existing) throw new Error(`allocation not found: ${allocationId}`);
    const record: LoopBoxAllocationRecord = {
      ...existing,
      ...input,
      ...(input.boxId === undefined ? {} : { boxId: input.boxId }),
      ...(input.errorMessage === undefined ? {} : { errorMessage: input.errorMessage }),
    };
    this.#records.set(allocationId, record);
    return record;
  }

  async list(): Promise<readonly LoopBoxAllocationRecord[]> {
    return [...this.#records.values()].sort((left, right) =>
      left.allocationId.localeCompare(right.allocationId),
    );
  }
}

type AllocationRow = Readonly<{
  allocation_id: string;
  task_id: string;
  run_id: string;
  attempt: number;
  provider: string;
  deterministic_name: string;
  box_id: string | null;
  status: LoopBoxAllocationStatus;
  created_at: string;
  updated_at: string;
  expires_at: string;
  error_message: string | null;
}>;

function recordFromRow(row: AllocationRow): LoopBoxAllocationRecord {
  if (row.provider !== "ascii-box") throw new Error(`unsupported Box provider: ${row.provider}`);
  return {
    allocationId: row.allocation_id,
    taskId: row.task_id,
    runId: row.run_id,
    attempt: row.attempt,
    provider: "ascii-box",
    deterministicName: row.deterministic_name,
    ...(row.box_id === null ? {} : { boxId: row.box_id }),
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ...(row.expires_at ? { expiresAt: row.expires_at } : {}),
    ...(row.error_message === null ? {} : { errorMessage: row.error_message }),
  };
}

const ALLOCATION_COLUMNS =
  "allocation_id, task_id, run_id, attempt, provider, deterministic_name, box_id, status, created_at, updated_at, expires_at, error_message";

export class D1LoopBoxAllocationStore implements LoopBoxAllocationStore {
  constructor(readonly database: LoopD1Database) {}

  async get(allocationId: string): Promise<LoopBoxAllocationRecord | undefined> {
    const row = await this.database
      .prepare(`SELECT ${ALLOCATION_COLUMNS} FROM loop_box_allocations WHERE allocation_id = ?1`)
      .bind(nonEmpty(allocationId, "allocationId"))
      .first<AllocationRow>();
    return row ? recordFromRow(row) : undefined;
  }

  async putIntent(input: LoopBoxAllocationIntent): Promise<LoopBoxAllocationRecord> {
    validateIntent(input);
    await this.database
      .prepare(
        "INSERT OR IGNORE INTO loop_box_allocations (allocation_id, task_id, run_id, attempt, provider, deterministic_name, status, created_at, updated_at, expires_at) VALUES (?1, ?2, ?3, ?4, 'ascii-box', ?5, 'intent', ?6, ?6, ?7)",
      )
      .bind(
        input.allocationId,
        input.taskId,
        input.runId,
        input.attempt,
        input.deterministicName,
        input.createdAt,
        input.expiresAt,
      )
      .run();
    const result = await this.get(input.allocationId);
    if (!result) throw new Error(`allocation intent did not persist: ${input.allocationId}`);
    if (
      result.taskId !== input.taskId ||
      result.runId !== input.runId ||
      result.deterministicName !== input.deterministicName
    )
      throw new Error(`allocation intent collision: ${input.allocationId}`);
    return result;
  }

  async update(
    allocationId: string,
    input: Readonly<{
      status: LoopBoxAllocationStatus;
      updatedAt: string;
      boxId?: string;
      errorMessage?: string;
    }>,
  ): Promise<LoopBoxAllocationRecord> {
    validateRecordUpdate(input);
    const current = await this.get(allocationId);
    if (!current) throw new Error(`allocation not found: ${allocationId}`);
    await this.database
      .prepare(
        "UPDATE loop_box_allocations SET status = ?2, box_id = COALESCE(?3, box_id), updated_at = ?4, error_message = COALESCE(?5, error_message) WHERE allocation_id = ?1",
      )
      .bind(
        allocationId,
        input.status,
        input.boxId ?? null,
        input.updatedAt,
        input.errorMessage ?? null,
      )
      .run();
    const result = await this.get(allocationId);
    if (!result) throw new Error(`allocation update did not persist: ${allocationId}`);
    return result;
  }

  async list(): Promise<readonly LoopBoxAllocationRecord[]> {
    const result = await this.database
      .prepare(`SELECT ${ALLOCATION_COLUMNS} FROM loop_box_allocations ORDER BY allocation_id ASC`)
      .all<AllocationRow>();
    return result.results.map(recordFromRow);
  }
}

export class LoopBoxAllocationError extends Error {
  readonly code: "allocation_uncertain" | "allocation_ambiguous";

  constructor(code: "allocation_uncertain" | "allocation_ambiguous", message: string) {
    super(message);
    this.name = "LoopBoxAllocationError";
    this.code = code;
  }
}

/** Provider-neutral, idempotent allocator. A failed create is reconciled once. */
export class LoopBoxAllocator {
  readonly #store: LoopBoxAllocationStore;
  readonly #client: LoopBoxControlClient;
  readonly #now: () => string;

  constructor(
    options: Readonly<{
      store: LoopBoxAllocationStore;
      client: LoopBoxControlClient;
      now?: () => string;
    }>,
  ) {
    this.#store = options.store;
    this.#client = options.client;
    this.#now = options.now ?? (() => new Date().toISOString());
  }

  async ensureAllocated(
    input: Readonly<{
      allocationId: string;
      taskId: string;
      runId: string;
      attempt: number;
      deterministicName: string;
      ttlSeconds: number;
      expiresAt: string;
    }>,
  ): Promise<LoopBoxAllocationRecord> {
    const intent: LoopBoxAllocationIntent = {
      allocationId: input.allocationId,
      taskId: input.taskId,
      runId: input.runId,
      attempt: input.attempt,
      deterministicName: input.deterministicName,
      createdAt: this.#now(),
      expiresAt: input.expiresAt,
    };
    const existing = await this.#store.putIntent(intent);
    if (existing.status === "allocated" && existing.boxId) return existing;
    if (existing.status === "ambiguous")
      throw new LoopBoxAllocationError(
        "allocation_ambiguous",
        `allocation is ambiguous: ${input.allocationId}`,
      );

    try {
      const created = await this.#client.create({
        deterministicName: input.deterministicName,
        ttlSeconds: positiveInteger(input.ttlSeconds, "ttlSeconds"),
      });
      if (created.deterministicName !== input.deterministicName)
        throw new Error("Box provider returned a mismatched deterministic name");
      return this.#store.update(input.allocationId, {
        status: "allocated",
        boxId: nonEmpty(created.boxId, "boxId"),
        updatedAt: this.#now(),
      });
    } catch (error) {
      let resources: readonly LoopBoxResource[];
      try {
        resources = await this.#client.list();
      } catch {
        await this.#store.update(input.allocationId, {
          status: "failed",
          updatedAt: this.#now(),
          errorMessage: "Box create failed and reconciliation was unavailable",
        });
        throw new LoopBoxAllocationError(
          "allocation_uncertain",
          `Box allocation is uncertain for ${input.allocationId}: ${String(error)}`,
        );
      }
      const matches = resources.filter(
        (resource) => resource.deterministicName === input.deterministicName,
      );
      if (matches.length === 1) {
        return this.#store.update(input.allocationId, {
          status: "allocated",
          boxId: matches[0]!.boxId,
          updatedAt: this.#now(),
        });
      }
      if (matches.length > 1) {
        await this.#store.update(input.allocationId, {
          status: "ambiguous",
          updatedAt: this.#now(),
          errorMessage: "multiple provider resources share the deterministic name",
        });
        throw new LoopBoxAllocationError(
          "allocation_ambiguous",
          `multiple Boxes match ${input.deterministicName}`,
        );
      }
      await this.#store.update(input.allocationId, {
        status: "failed",
        updatedAt: this.#now(),
        errorMessage: "Box create failed and no matching resource was found",
      });
      throw new LoopBoxAllocationError(
        "allocation_uncertain",
        `Box allocation failed without a reconciled resource: ${input.allocationId}`,
      );
    }
  }

  async stop(allocationId: string): Promise<LoopBoxAllocationRecord> {
    const current = await this.#store.get(allocationId);
    if (!current) throw new Error(`allocation not found: ${allocationId}`);
    if (!current.boxId || current.status === "stopped") return current;
    await this.#store.update(allocationId, { status: "stopping", updatedAt: this.#now() });
    await this.#client.stop(current.boxId);
    return this.#store.update(allocationId, { status: "stopped", updatedAt: this.#now() });
  }

  async delete(allocationId: string): Promise<LoopBoxAllocationRecord> {
    const current = await this.#store.get(allocationId);
    if (!current) throw new Error(`allocation not found: ${allocationId}`);
    if (!current.boxId || current.status === "deleted") return current;
    if (current.status !== "stopped") await this.stop(allocationId);
    const stopped = await this.#store.get(allocationId);
    if (!stopped?.boxId) throw new Error(`allocation lost Box identity: ${allocationId}`);
    await this.#client.delete(stopped.boxId);
    return this.#store.update(allocationId, { status: "deleted", updatedAt: this.#now() });
  }

  async reconcile(): Promise<LoopBoxReconciliation> {
    const [resources, allocations] = await Promise.all([this.#client.list(), this.#store.list()]);
    const byName = new Map<string, LoopBoxAllocationRecord[]>();
    for (const allocation of allocations) {
      const entries = byName.get(allocation.deterministicName) ?? [];
      entries.push(allocation);
      byName.set(allocation.deterministicName, entries);
    }
    const owned: LoopBoxResource[] = [];
    const orphaned: LoopBoxResource[] = [];
    const ambiguous: LoopBoxResource[] = [];
    for (const resource of resources) {
      const matches = byName.get(resource.deterministicName) ?? [];
      if (matches.length === 1) owned.push(resource);
      else if (matches.length > 1) ambiguous.push(resource);
      else orphaned.push(resource);
    }
    const now = this.#now();
    const stale = allocations.filter(
      (allocation) =>
        allocation.status !== "stopped" &&
        allocation.status !== "deleted" &&
        Date.parse(allocation.expiresAt ?? "") <= Date.parse(now) &&
        !owned.some((resource) => resource.deterministicName === allocation.deterministicName),
    );
    for (const allocation of stale) {
      await this.#store.update(allocation.allocationId, {
        status: "orphaned",
        updatedAt: now,
        errorMessage: "allocation expired without a matching provider resource",
      });
    }
    return { owned, stale, orphaned, ambiguous };
  }
}
