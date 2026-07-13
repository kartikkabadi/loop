import type { LoopTaskState } from "./task-state.js";

export type LoopTaskEvent = Readonly<{
  sequence: number;
  taskId: string;
  type: string;
  message: string;
  state: LoopTaskState;
  idempotencyKey?: string;
}>;

export interface LoopTaskEventStore {
  append(event: Omit<LoopTaskEvent, "sequence">): Promise<LoopTaskEvent>;
  events(taskId: string): Promise<readonly LoopTaskEvent[]>;
  latest(taskId: string): Promise<LoopTaskState | undefined>;
  taskIds(): Promise<readonly string[]>;
}

export class InMemoryLoopTaskEventStore implements LoopTaskEventStore {
  readonly #events = new Map<string, LoopTaskEvent[]>();

  async append(event: Omit<LoopTaskEvent, "sequence">): Promise<LoopTaskEvent> {
    const entries = this.#events.get(event.taskId) ?? [];
    const stored = { ...event, sequence: entries.length + 1 };
    entries.push(stored);
    this.#events.set(event.taskId, entries);
    return stored;
  }

  async events(taskId: string): Promise<readonly LoopTaskEvent[]> {
    return [...(this.#events.get(taskId) ?? [])];
  }

  async latest(taskId: string): Promise<LoopTaskState | undefined> {
    return this.#events.get(taskId)?.at(-1)?.state;
  }

  async taskIds(): Promise<readonly string[]> {
    return [...this.#events.keys()];
  }
}
