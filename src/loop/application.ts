import {
  hashLoopTaskContract,
  validateLoopTaskContract,
  type LoopTaskContract,
} from "./task-contract.js";
import { InMemoryLoopTaskEventStore, type LoopTaskEventStore } from "./event-store.js";
import {
  encodeBase64,
  InMemoryLoopEvidenceStore,
  type LoopEvidenceStore,
  type LoopEvidenceView,
} from "./evidence.js";
import { buildLoopReviewPacket, type LoopReviewPacket } from "./review-packet.js";
import {
  createLoopTaskState,
  transitionLoopTask,
  type LoopTaskCommand,
  type LoopTaskState,
} from "./task-state.js";

export type LoopWriteOptions = Readonly<{
  expectedVersion?: number;
  idempotencyKey?: string;
  actorSubject?: string;
}>;
export type LoopValidationResult = Readonly<{
  state: LoopTaskState;
  ok: boolean;
  diagnostics: ReturnType<typeof validateLoopTaskContract>["diagnostics"];
}>;

/** Async application service so the same domain runs on Node, D1, or a Worker. */
export class LoopApplication {
  readonly #store: LoopTaskEventStore;
  readonly #evidence: LoopEvidenceStore;
  readonly #now: () => string;

  constructor(
    options: Readonly<{
      store?: LoopTaskEventStore;
      evidence?: LoopEvidenceStore;
      now?: () => string;
    }> = {},
  ) {
    this.#store = options.store ?? new InMemoryLoopTaskEventStore();
    this.#evidence = options.evidence ?? new InMemoryLoopEvidenceStore();
    this.#now = options.now ?? (() => new Date().toISOString());
  }

  async createDraft(
    contract: LoopTaskContract,
    options: LoopWriteOptions = {},
  ): Promise<LoopTaskState> {
    const existing = await this.#store.latest(contract.identity.taskId);
    if (existing) {
      if (
        options.idempotencyKey &&
        (await this.#store.events(existing.taskId)).some(
          (event) => event.idempotencyKey === options.idempotencyKey,
        )
      )
        return existing;
      throw new Error(`task already exists: ${contract.identity.taskId}`);
    }
    const contractHash = hashLoopTaskContract(contract);
    const state = {
      ...createLoopTaskState(contract, contractHash, this.#now()),
      ...(options.actorSubject ? { actors: { createdBy: options.actorSubject } } : {}),
    };
    await this.#store.append({
      taskId: state.taskId,
      type: "task.created",
      message: "draft created",
      state,
      ...(options.idempotencyKey ? { idempotencyKey: options.idempotencyKey } : {}),
    });
    return state;
  }

  async getTask(taskId: string): Promise<LoopTaskState> {
    const state = await this.#store.latest(taskId);
    if (!state) throw new Error(`task not found: ${taskId}`);
    return state;
  }

  async listTasks(): Promise<readonly LoopTaskState[]> {
    const states = await Promise.all(
      (await this.#store.taskIds()).map((taskId) => this.#store.latest(taskId)),
    );
    return states.filter((state): state is LoopTaskState => state !== undefined);
  }

  async validate(taskId: string, options: LoopWriteOptions = {}): Promise<LoopValidationResult> {
    const prior = await this.idempotentState(taskId, options.idempotencyKey);
    if (prior)
      return {
        state: prior,
        ok: prior.validation.status === "passed",
        diagnostics: prior.validation.diagnostics,
      };
    const state = await this.getTask(taskId);
    this.assertVersion(state, options.expectedVersion);
    this.assertActorMayTransition(state, "validate", options.actorSubject);
    const result = validateLoopTaskContract(state.contract);
    if (!state.baseSha) {
      const diagnostics = [
        ...result.diagnostics,
        {
          severity: "error" as const,
          code: "E_BASE_SHA_REQUIRED",
          path: "repository.baseSha",
          message: "resolve the repository base SHA before validation",
        },
      ];
      const failed = {
        ...state,
        version: state.version + 1,
        condition: "BLOCKED" as const,
        validation: { status: "failed" as const, diagnostics },
        updatedAt: this.#now(),
      };
      await this.#store.append({
        taskId,
        type: "task.validation_failed",
        message: "base SHA is unresolved",
        state: failed,
        ...(options.idempotencyKey ? { idempotencyKey: options.idempotencyKey } : {}),
      });
      return { state: failed, ok: false, diagnostics };
    }
    if (!result.ok) {
      const failed = {
        ...state,
        version: state.version + 1,
        condition: "BLOCKED" as const,
        validation: { status: "failed" as const, diagnostics: result.diagnostics },
        updatedAt: this.#now(),
      };
      await this.#store.append({
        taskId,
        type: "task.validation_failed",
        message: "contract validation failed",
        state: failed,
        ...(options.idempotencyKey ? { idempotencyKey: options.idempotencyKey } : {}),
      });
      return { state: failed, ok: false, diagnostics: result.diagnostics };
    }
    const taskTransition = transitionLoopTask(state, { type: "validated", baseSha: state.baseSha });
    const validated = { ...taskTransition.state, updatedAt: this.#now() };
    await this.#store.append({
      taskId,
      type: taskTransition.event.type,
      message: taskTransition.event.message,
      state: validated,
      ...(options.idempotencyKey ? { idempotencyKey: options.idempotencyKey } : {}),
    });
    return { state: validated, ok: true, diagnostics: result.diagnostics };
  }

  async approve(taskId: string, options: LoopWriteOptions = {}): Promise<LoopTaskState> {
    return this.apply(taskId, { type: "approved" }, options);
  }

  async advance(
    taskId: string,
    phase: Extract<LoopTaskCommand, { type: "advance" }>["phase"],
    options: LoopWriteOptions = {},
  ): Promise<LoopTaskState> {
    return this.apply(taskId, { type: "advance", phase }, options);
  }

  async pause(taskId: string, options: LoopWriteOptions = {}): Promise<LoopTaskState> {
    return this.apply(taskId, { type: "pause" }, options);
  }

  async resume(taskId: string, options: LoopWriteOptions = {}): Promise<LoopTaskState> {
    return this.apply(taskId, { type: "resume" }, options);
  }

  async cancel(
    taskId: string,
    reason: string,
    options: LoopWriteOptions = {},
  ): Promise<LoopTaskState> {
    return this.apply(taskId, { type: "cancel", reason }, options);
  }

  async recover(
    taskId: string,
    reason: string,
    options: LoopWriteOptions = {},
  ): Promise<LoopTaskState> {
    return this.apply(taskId, { type: "recover", reason }, options);
  }

  async escalate(
    taskId: string,
    reason: string,
    options: LoopWriteOptions = {},
  ): Promise<LoopTaskState> {
    return this.apply(taskId, { type: "escalate", reason }, options);
  }

  async setHead(
    taskId: string,
    headSha: string,
    options: LoopWriteOptions = {},
  ): Promise<LoopTaskState> {
    return this.apply(taskId, { type: "set-head", headSha }, options);
  }

  async recordPublication(
    taskId: string,
    publication: Extract<LoopTaskCommand, { type: "record-publication" }>["publication"],
    options: LoopWriteOptions = {},
  ): Promise<LoopTaskState> {
    return this.apply(taskId, { type: "record-publication", publication }, options);
  }

  async recordGate(
    taskId: string,
    gate: Extract<LoopTaskCommand, { type: "record-gate" }>["gate"],
    options: LoopWriteOptions = {},
  ): Promise<LoopTaskState> {
    return this.apply(taskId, { type: "record-gate", gate }, options);
  }

  async requestRepair(
    taskId: string,
    reason: string,
    options: LoopWriteOptions = {},
  ): Promise<LoopTaskState> {
    return this.apply(taskId, { type: "repair", reason }, options);
  }

  async submitReview(
    taskId: string,
    verdict: Extract<LoopTaskCommand, { type: "submit-review" }>["verdict"],
    findings: Extract<LoopTaskCommand, { type: "submit-review" }>["findings"],
    options: LoopWriteOptions = {},
  ): Promise<LoopTaskState> {
    return this.apply(taskId, { type: "submit-review", verdict, findings }, options);
  }

  async approveCompletion(taskId: string, options: LoopWriteOptions = {}): Promise<LoopTaskState> {
    return this.apply(taskId, { type: "approve-completion" }, options);
  }

  async completeTask(taskId: string, options: LoopWriteOptions = {}): Promise<LoopTaskState> {
    return this.advance(taskId, "COMPLETE", options);
  }

  async getReviewPacket(taskId: string): Promise<LoopReviewPacket> {
    return buildLoopReviewPacket(await this.getTask(taskId));
  }

  async listEvidence(taskId: string) {
    await this.getTask(taskId);
    return this.#evidence.list(taskId);
  }

  async getEvidence(taskId: string, objectKey: string): Promise<LoopEvidenceView> {
    await this.getTask(taskId);
    const evidence = await this.#evidence.get(objectKey);
    if (!evidence || evidence.record.taskId !== taskId)
      throw new Error(`evidence not found: ${objectKey}`);
    const MAX_INLINE_BYTES = 256 * 1024;
    return {
      record: evidence.record,
      ...(evidence.content.byteLength <= MAX_INLINE_BYTES
        ? { contentBase64: encodeBase64(new Uint8Array(evidence.content)) }
        : {}),
      contentTruncated: evidence.content.byteLength > MAX_INLINE_BYTES,
    };
  }

  private async apply(
    taskId: string,
    command: LoopTaskCommand,
    options: LoopWriteOptions,
  ): Promise<LoopTaskState> {
    const prior = await this.idempotentState(taskId, options.idempotencyKey);
    if (prior) return prior;
    const state = await this.getTask(taskId);
    this.assertVersion(state, options.expectedVersion);
    this.assertActorMayTransition(state, command.type, options.actorSubject);
    const taskTransition = transitionLoopTask(state, command);
    const priorActors = state.actors ?? {};
    const actors =
      options.actorSubject && command.type === "approved"
        ? { ...priorActors, approvedBy: options.actorSubject }
        : options.actorSubject && command.type === "submit-review"
          ? { ...priorActors, reviewedBy: options.actorSubject }
          : options.actorSubject && command.type === "approve-completion"
            ? { ...priorActors, acceptedBy: options.actorSubject }
            : options.actorSubject && command.type === "advance" && command.phase === "COMPLETE"
              ? { ...priorActors, completedBy: options.actorSubject }
              : priorActors;
    const next = { ...taskTransition.state, actors, updatedAt: this.#now() };
    await this.#store.append({
      taskId,
      type: taskTransition.event.type,
      message: taskTransition.event.message,
      state: next,
      ...(options.idempotencyKey ? { idempotencyKey: options.idempotencyKey } : {}),
    });
    return next;
  }

  private assertVersion(state: LoopTaskState, expectedVersion: number | undefined): void {
    if (expectedVersion !== undefined && state.version !== expectedVersion)
      throw new Error(
        `task ${state.taskId} version conflict: expected ${expectedVersion}, current ${state.version}`,
      );
  }

  private assertActorMayTransition(
    state: LoopTaskState,
    action: string,
    actorSubject: string | undefined,
  ): void {
    if (!actorSubject) return;
    if (!actorSubject || actorSubject.includes("\0"))
      throw new Error("actorSubject must be non-empty and NUL-free");
    const actors = state.actors ?? {};
    if (action === "submit-review" && actors.approvedBy === actorSubject)
      throw new Error("the approving actor cannot submit the task review");
    if (action === "approve-completion" && actors.reviewedBy === actorSubject)
      throw new Error("the reviewing actor cannot approve completion");
    if (action === "advance" && actors.reviewedBy === actorSubject)
      throw new Error("the reviewing actor cannot complete the task");
  }

  private async idempotentState(
    taskId: string,
    idempotencyKey: string | undefined,
  ): Promise<LoopTaskState | undefined> {
    if (!idempotencyKey) return undefined;
    return (await this.#store.events(taskId)).find(
      (event) => event.idempotencyKey === idempotencyKey,
    )?.state;
  }
}
