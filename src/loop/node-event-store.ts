import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";
import type { LoopTaskState } from "./task-state.js";
import type { LoopTaskEvent, LoopTaskEventStore } from "./event-store.js";

/** Node-only JSONL persistence adapter; the domain event store remains Worker-safe. */
export class JsonlLoopTaskEventStore implements LoopTaskEventStore {
  readonly #path: string;

  constructor(path: string) {
    this.#path = path;
    mkdirSync(dirname(path), { recursive: true });
  }

  async append(event: Omit<LoopTaskEvent, "sequence">): Promise<LoopTaskEvent> {
    const entries = await this.events(event.taskId);
    const stored = { ...event, sequence: entries.length + 1 };
    appendFileSync(this.#path, `${JSON.stringify(stored)}\n`, "utf8");
    return stored;
  }

  async events(taskId: string): Promise<readonly LoopTaskEvent[]> {
    if (!existsSync(this.#path)) return [];
    const out: LoopTaskEvent[] = [];
    for (const line of readFileSync(this.#path, "utf8").split(/\r?\n/)) {
      if (!line.trim()) continue;
      const event = JSON.parse(line) as LoopTaskEvent;
      if (event.taskId === taskId) out.push(event);
    }
    return out;
  }

  async latest(taskId: string): Promise<LoopTaskState | undefined> {
    return (await this.events(taskId)).at(-1)?.state;
  }

  async taskIds(): Promise<readonly string[]> {
    if (!existsSync(this.#path)) return [];
    const ids = new Set<string>();
    for (const line of readFileSync(this.#path, "utf8").split(/\r?\n/)) {
      if (!line.trim()) continue;
      ids.add((JSON.parse(line) as LoopTaskEvent).taskId);
    }
    return [...ids];
  }
}
