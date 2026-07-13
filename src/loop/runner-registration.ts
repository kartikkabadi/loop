import type { LoopD1Database } from "./d1-event-store.js";

export type LoopRunnerRegistration = Readonly<{
  runId: string;
  taskId: string;
  boxId: string;
  generation: number;
  phase: string;
  processAlive: boolean;
  registeredAt: string;
  lastSeenAt: string;
}>;

export type LoopRunnerRegistrationResult = "accepted" | "stale";

export interface LoopRunnerRegistrationStore {
  register(
    input: Readonly<Omit<LoopRunnerRegistration, "lastSeenAt">>,
  ): Promise<LoopRunnerRegistrationResult>;
  heartbeat(
    input: Readonly<{
      runId: string;
      taskId: string;
      boxId: string;
      generation: number;
      phase: string;
      processAlive: boolean;
      timestamp: string;
    }>,
  ): Promise<LoopRunnerRegistrationResult>;
  get(runId: string): Promise<LoopRunnerRegistration | undefined>;
  list(): Promise<readonly LoopRunnerRegistration[]>;
}

function nonEmpty(value: string, label: string): string {
  if (!value || value.includes("\0")) throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function generation(value: number): number {
  if (!Number.isSafeInteger(value) || value < 1)
    throw new Error("runner generation must be positive");
  return value;
}

function validate(
  input: Readonly<{
    runId: string;
    taskId: string;
    boxId: string;
    generation: number;
    phase: string;
    processAlive: boolean;
    timestamp?: string;
    registeredAt?: string;
  }>,
): void {
  nonEmpty(input.runId, "runId");
  nonEmpty(input.taskId, "taskId");
  nonEmpty(input.boxId, "boxId");
  generation(input.generation);
  nonEmpty(input.phase, "phase");
  if (typeof input.processAlive !== "boolean") throw new Error("processAlive must be boolean");
  if (input.timestamp !== undefined) nonEmpty(input.timestamp, "timestamp");
  if (input.registeredAt !== undefined) nonEmpty(input.registeredAt, "registeredAt");
}

export class InMemoryLoopRunnerRegistrationStore implements LoopRunnerRegistrationStore {
  readonly #records = new Map<string, LoopRunnerRegistration>();

  async register(
    input: Readonly<Omit<LoopRunnerRegistration, "lastSeenAt">>,
  ): Promise<LoopRunnerRegistrationResult> {
    validate({ ...input, timestamp: input.registeredAt });
    const existing = this.#records.get(input.runId);
    if (existing && existing.generation > input.generation) return "stale";
    this.#records.set(input.runId, { ...input, lastSeenAt: input.registeredAt });
    return "accepted";
  }

  async heartbeat(
    input: Readonly<{
      runId: string;
      taskId: string;
      boxId: string;
      generation: number;
      phase: string;
      processAlive: boolean;
      timestamp: string;
    }>,
  ): Promise<LoopRunnerRegistrationResult> {
    validate(input);
    const existing = this.#records.get(input.runId);
    if (
      !existing ||
      existing.generation !== input.generation ||
      existing.taskId !== input.taskId ||
      existing.boxId !== input.boxId
    )
      return "stale";
    this.#records.set(input.runId, {
      ...existing,
      phase: input.phase,
      processAlive: input.processAlive,
      lastSeenAt: input.timestamp,
    });
    return "accepted";
  }

  async get(runId: string): Promise<LoopRunnerRegistration | undefined> {
    return this.#records.get(nonEmpty(runId, "runId"));
  }

  async list(): Promise<readonly LoopRunnerRegistration[]> {
    return [...this.#records.values()].sort((left, right) => left.runId.localeCompare(right.runId));
  }
}

type RunnerRow = Readonly<{
  run_id: string;
  task_id: string;
  box_id: string;
  generation: number;
  phase: string;
  process_alive: number;
  registered_at: string;
  last_seen_at: string;
}>;

function fromRow(row: RunnerRow): LoopRunnerRegistration {
  return {
    runId: row.run_id,
    taskId: row.task_id,
    boxId: row.box_id,
    generation: generation(row.generation),
    phase: nonEmpty(row.phase, "phase"),
    processAlive: row.process_alive === 1,
    registeredAt: row.registered_at,
    lastSeenAt: row.last_seen_at,
  };
}

const COLUMNS =
  "run_id, task_id, box_id, generation, phase, process_alive, registered_at, last_seen_at";

export class D1LoopRunnerRegistrationStore implements LoopRunnerRegistrationStore {
  constructor(readonly database: LoopD1Database) {}

  async register(
    input: Readonly<Omit<LoopRunnerRegistration, "lastSeenAt">>,
  ): Promise<LoopRunnerRegistrationResult> {
    validate({ ...input, timestamp: input.registeredAt });
    const existing = await this.get(input.runId);
    if (existing && existing.generation > input.generation) return "stale";
    await this.database
      .prepare(
        "INSERT INTO loop_runner_registrations (run_id, task_id, box_id, generation, phase, process_alive, registered_at, last_seen_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?7) ON CONFLICT(run_id) DO UPDATE SET task_id = excluded.task_id, box_id = excluded.box_id, generation = excluded.generation, phase = excluded.phase, process_alive = excluded.process_alive, registered_at = excluded.registered_at, last_seen_at = excluded.last_seen_at WHERE excluded.generation >= loop_runner_registrations.generation",
      )
      .bind(
        input.runId,
        input.taskId,
        input.boxId,
        input.generation,
        input.phase,
        input.processAlive ? 1 : 0,
        input.registeredAt,
      )
      .run();
    return "accepted";
  }

  async heartbeat(
    input: Readonly<{
      runId: string;
      taskId: string;
      boxId: string;
      generation: number;
      phase: string;
      processAlive: boolean;
      timestamp: string;
    }>,
  ): Promise<LoopRunnerRegistrationResult> {
    validate(input);
    const existing = await this.get(input.runId);
    if (
      !existing ||
      existing.generation !== input.generation ||
      existing.taskId !== input.taskId ||
      existing.boxId !== input.boxId
    )
      return "stale";
    await this.database
      .prepare(
        "UPDATE loop_runner_registrations SET phase = ?2, process_alive = ?3, last_seen_at = ?4 WHERE run_id = ?1 AND generation = ?5",
      )
      .bind(input.runId, input.phase, input.processAlive ? 1 : 0, input.timestamp, input.generation)
      .run();
    return "accepted";
  }

  async get(runId: string): Promise<LoopRunnerRegistration | undefined> {
    const row = await this.database
      .prepare(`SELECT ${COLUMNS} FROM loop_runner_registrations WHERE run_id = ?1`)
      .bind(nonEmpty(runId, "runId"))
      .first<RunnerRow>();
    return row ? fromRow(row) : undefined;
  }

  async list(): Promise<readonly LoopRunnerRegistration[]> {
    const result = await this.database
      .prepare(`SELECT ${COLUMNS} FROM loop_runner_registrations ORDER BY run_id ASC`)
      .all<RunnerRow>();
    return result.results.map(fromRow);
  }
}
