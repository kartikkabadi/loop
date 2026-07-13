import type { LoopTaskEvent, LoopTaskEventStore } from "./event-store.js";
import type { LoopTaskState } from "./task-state.js";

export interface LoopD1Statement {
  bind(...values: readonly unknown[]): LoopD1Statement;
  first<T extends Record<string, unknown>>(): Promise<T | null>;
  all<T extends Record<string, unknown>>(): Promise<{ results: T[] }>;
  run(): Promise<unknown>;
}

export interface LoopD1Database {
  prepare(query: string): LoopD1Statement;
}

type StoredEventRow = Readonly<{
  task_id: string;
  sequence: number;
  type: string;
  message: string;
  idempotency_key: string | null;
  state_json: string;
}>;

function eventFromRow(row: StoredEventRow): LoopTaskEvent {
  const state = JSON.parse(row.state_json) as LoopTaskState & {
    cancellationGeneration?: number;
  };
  return {
    taskId: row.task_id,
    sequence: row.sequence,
    type: row.type,
    message: row.message,
    state: {
      ...state,
      // States written before cancellation-generation fencing are admitted
      // under generation one. New writes always persist the explicit field.
      cancellationGeneration: state.cancellationGeneration ?? 1,
    },
    ...(row.idempotency_key === null ? {} : { idempotencyKey: row.idempotency_key }),
  };
}

/** D1 adapter. Serialize writes per task with a Durable Object or workflow lease. */
export class D1LoopTaskEventStore implements LoopTaskEventStore {
  constructor(readonly database: LoopD1Database) {}

  async append(event: Omit<LoopTaskEvent, "sequence">): Promise<LoopTaskEvent> {
    const idempotencyKey = event.idempotencyKey ?? null;
    if (idempotencyKey !== null) {
      const existing = await this.database
        .prepare(
          "SELECT task_id, sequence, type, message, idempotency_key, state_json FROM loop_task_events WHERE task_id = ?1 AND idempotency_key = ?2 LIMIT 1",
        )
        .bind(event.taskId, idempotencyKey)
        .first<StoredEventRow>();
      if (existing) return eventFromRow(existing);
    }

    await this.database
      .prepare(
        "INSERT INTO loop_task_events (task_id, sequence, type, message, idempotency_key, state_json) SELECT ?1, COALESCE(MAX(sequence), 0) + 1, ?2, ?3, ?4, ?5 FROM loop_task_events WHERE task_id = ?1",
      )
      .bind(event.taskId, event.type, event.message, idempotencyKey, JSON.stringify(event.state))
      .run();

    const inserted = idempotencyKey
      ? await this.database
          .prepare(
            "SELECT task_id, sequence, type, message, idempotency_key, state_json FROM loop_task_events WHERE task_id = ?1 AND idempotency_key = ?2 LIMIT 1",
          )
          .bind(event.taskId, idempotencyKey)
          .first<StoredEventRow>()
      : await this.database
          .prepare(
            "SELECT task_id, sequence, type, message, idempotency_key, state_json FROM loop_task_events WHERE task_id = ?1 ORDER BY sequence DESC LIMIT 1",
          )
          .bind(event.taskId)
          .first<StoredEventRow>();
    if (!inserted) throw new Error(`D1 event insert did not persist task ${event.taskId}`);
    return eventFromRow(inserted);
  }

  async events(taskId: string): Promise<readonly LoopTaskEvent[]> {
    const result = await this.database
      .prepare(
        "SELECT task_id, sequence, type, message, idempotency_key, state_json FROM loop_task_events WHERE task_id = ?1 ORDER BY sequence ASC",
      )
      .bind(taskId)
      .all<StoredEventRow>();
    return result.results.map(eventFromRow);
  }

  async latest(taskId: string): Promise<LoopTaskState | undefined> {
    const row = await this.database
      .prepare(
        "SELECT task_id, sequence, type, message, idempotency_key, state_json FROM loop_task_events WHERE task_id = ?1 ORDER BY sequence DESC LIMIT 1",
      )
      .bind(taskId)
      .first<StoredEventRow>();
    return row ? eventFromRow(row).state : undefined;
  }

  async taskIds(): Promise<readonly string[]> {
    const result = await this.database
      .prepare("SELECT DISTINCT task_id FROM loop_task_events ORDER BY task_id ASC")
      .all<Readonly<{ task_id: string }>>();
    return result.results.map((row) => row.task_id);
  }
}
