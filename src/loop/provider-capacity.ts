import { LOOP_DEVIN_MODEL, type LoopDevinModel } from "../loop-runner/model.js";

/**
 * Devin does not expose a stable account-wide concurrency value to the CLI.
 * Start with the empirically safe floor and let the durable coordinator probe
 * a configured ceiling from observed completions instead of guessing.
 */
export const LOOP_DEVIN_DEFAULT_MAX_CONCURRENT = 2 as const;
export const LOOP_DEVIN_MAX_CONCURRENT_CEILING = 10 as const;
export const LOOP_DEVIN_MAX_CONCURRENT = LOOP_DEVIN_DEFAULT_MAX_CONCURRENT;
const SUCCESSFUL_COMPLETIONS_PER_RAMP = 4;

export type LoopProviderSlot = Readonly<{
  slotId: string;
  lease: LoopProviderLease | null;
}>;

export type LoopProviderLease = Readonly<{
  leaseId: string;
  taskId: string;
  runId: string;
  generation: number;
  model: LoopDevinModel;
  acquiredAt: string;
  expiresAt: string;
}>;

export type LoopProviderCapacityState = Readonly<{
  provider: "devin";
  model: LoopDevinModel;
  /** Configured safety ceiling. It is not the current admission count. */
  maxConcurrent: number;
  /** Current observed-safe admission count, initially two. */
  admissionLimit: number;
  slots: readonly LoopProviderSlot[];
  cooldownUntil: string | null;
  cooldownReason: "rate_limited" | "quota_exhausted" | "provider_unavailable" | null;
  successfulCompletionsSinceRamp: number;
  rateLimitCount: number;
  lastRateLimitAt: string | null;
}>;

export type LoopProviderCapacityWait = Readonly<{
  status: "waiting";
  retryAt: string;
  reason: "capacity" | "rate_limit" | "quota_exhausted" | "provider_unavailable";
}>;

export type LoopProviderCapacityAcquireResult =
  | Readonly<{ status: "acquired"; lease: LoopProviderLease }>
  | LoopProviderCapacityWait;

export type LoopProviderCapacityTransition<T> = Readonly<{
  state: LoopProviderCapacityState;
  result: T;
}>;

function nonEmpty(value: string, label: string): string {
  if (!value || value.includes("\0")) throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function positive(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${label} must be positive`);
  return value;
}

function timestamp(value: string, label: string): string {
  nonEmpty(value, label);
  if (!Number.isFinite(Date.parse(value))) throw new Error(`${label} must be an ISO timestamp`);
  return value;
}

function later(left: string, right: string): string {
  return Date.parse(left) >= Date.parse(right) ? left : right;
}

export function parseLoopDevinMaxConcurrent(
  value: string | number | undefined,
  fallback = LOOP_DEVIN_DEFAULT_MAX_CONCURRENT,
): number {
  const candidate =
    typeof value === "number" ? value : value === undefined ? fallback : Number(value);
  if (!Number.isSafeInteger(candidate) || candidate < 1) return fallback;
  return Math.min(candidate, LOOP_DEVIN_MAX_CONCURRENT_CEILING);
}

function slot(slotId: string): LoopProviderSlot {
  return { slotId, lease: null };
}

function normalizeState(
  state: LoopProviderCapacityState,
  configuredMaxConcurrent: string | number = state.maxConcurrent,
): LoopProviderCapacityState {
  const maxConcurrent = parseLoopDevinMaxConcurrent(configuredMaxConcurrent);
  const existing = [...state.slots];
  for (let index = existing.length; index < maxConcurrent; index += 1) {
    existing.push(slot(`devin-swe-1.7-${index + 1}`));
  }
  return {
    ...state,
    maxConcurrent,
    admissionLimit: Math.min(
      parseLoopDevinMaxConcurrent(state.admissionLimit, LOOP_DEVIN_DEFAULT_MAX_CONCURRENT),
      maxConcurrent,
    ),
    slots: existing.slice(0, maxConcurrent),
    successfulCompletionsSinceRamp: state.successfulCompletionsSinceRamp ?? 0,
    rateLimitCount: state.rateLimitCount ?? 0,
    lastRateLimitAt: state.lastRateLimitAt ?? null,
  };
}

/** Apply a deployment ceiling to an existing Durable Object state. */
export function configureLoopProviderCapacityState(
  state: LoopProviderCapacityState,
  options: Readonly<{ maxConcurrent?: string | number }> = {},
): LoopProviderCapacityState {
  return normalizeState(state, options.maxConcurrent ?? state.maxConcurrent);
}

function pruneExpired(state: LoopProviderCapacityState, now: string): LoopProviderCapacityState {
  return normalizeState({
    ...state,
    slots: state.slots.map((slot) =>
      slot.lease && Date.parse(slot.lease.expiresAt) <= Date.parse(now)
        ? { ...slot, lease: null }
        : slot,
    ),
    ...(state.cooldownUntil && Date.parse(state.cooldownUntil) <= Date.parse(now)
      ? { cooldownUntil: null, cooldownReason: null }
      : {}),
  });
}

export function createLoopProviderCapacityState(
  options: Readonly<{ maxConcurrent?: string | number }> = {},
): LoopProviderCapacityState {
  const maxConcurrent = parseLoopDevinMaxConcurrent(options.maxConcurrent);
  return {
    provider: "devin",
    model: LOOP_DEVIN_MODEL,
    maxConcurrent,
    admissionLimit: Math.min(LOOP_DEVIN_DEFAULT_MAX_CONCURRENT, maxConcurrent),
    slots: Array.from({ length: maxConcurrent }, (_, index) => slot(`devin-swe-1.7-${index + 1}`)),
    cooldownUntil: null,
    cooldownReason: null,
    successfulCompletionsSinceRamp: 0,
    rateLimitCount: 0,
    lastRateLimitAt: null,
  };
}

export function acquireLoopProviderSlot(
  state: LoopProviderCapacityState,
  input: Readonly<{
    taskId: string;
    runId: string;
    generation: number;
    model: LoopDevinModel;
    now: string;
    leaseSeconds?: number;
  }>,
): LoopProviderCapacityTransition<LoopProviderCapacityAcquireResult> {
  nonEmpty(input.taskId, "taskId");
  nonEmpty(input.runId, "runId");
  positive(input.generation, "generation");
  timestamp(input.now, "now");
  if (input.model !== LOOP_DEVIN_MODEL)
    throw new Error(`Loop only permits Devin model ${String(LOOP_DEVIN_MODEL)}`);
  const leaseSeconds = input.leaseSeconds ?? 90;
  positive(leaseSeconds, "leaseSeconds");
  const current = pruneExpired(state, input.now);
  const existing = current.slots.find(
    (slot) => slot.lease?.runId === input.runId && slot.lease.generation === input.generation,
  );
  if (existing?.lease) {
    const renewed: LoopProviderLease = {
      ...existing.lease,
      expiresAt: new Date(Date.parse(input.now) + leaseSeconds * 1000).toISOString(),
    };
    return {
      state: {
        ...current,
        slots: current.slots.map((slot) =>
          slot.slotId === existing.slotId ? { ...slot, lease: renewed } : slot,
        ),
      },
      result: { status: "acquired", lease: renewed },
    };
  }

  if (current.cooldownUntil && Date.parse(current.cooldownUntil) > Date.parse(input.now)) {
    return {
      state: current,
      result: {
        status: "waiting",
        retryAt: current.cooldownUntil,
        reason:
          current.cooldownReason === "quota_exhausted"
            ? "quota_exhausted"
            : current.cooldownReason === "provider_unavailable"
              ? "provider_unavailable"
              : "rate_limit",
      },
    };
  }

  const free = current.slots.slice(0, current.admissionLimit).find((slot) => slot.lease === null);
  if (!free) {
    const retryAt = current.slots
      .slice(0, current.admissionLimit)
      .map((slot) => slot.lease?.expiresAt)
      .filter((value): value is string => value !== undefined)
      .reduce((earliest, value) => (Date.parse(value) < Date.parse(earliest) ? value : earliest));
    return { state: current, result: { status: "waiting", retryAt, reason: "capacity" } };
  }

  const lease: LoopProviderLease = {
    leaseId: `lease-${input.runId}-${input.generation}`,
    taskId: input.taskId,
    runId: input.runId,
    generation: input.generation,
    model: LOOP_DEVIN_MODEL,
    acquiredAt: input.now,
    expiresAt: new Date(Date.parse(input.now) + leaseSeconds * 1000).toISOString(),
  };
  return {
    state: {
      ...current,
      slots: current.slots.map((slot) => (slot.slotId === free.slotId ? { ...slot, lease } : slot)),
    },
    result: { status: "acquired", lease },
  };
}

export function renewLoopProviderSlot(
  state: LoopProviderCapacityState,
  input: Readonly<{
    leaseId: string;
    runId: string;
    generation: number;
    now: string;
    leaseSeconds?: number;
  }>,
): LoopProviderCapacityTransition<"accepted" | "stale"> {
  nonEmpty(input.leaseId, "leaseId");
  nonEmpty(input.runId, "runId");
  positive(input.generation, "generation");
  timestamp(input.now, "now");
  const current = pruneExpired(state, input.now);
  const leaseSeconds = input.leaseSeconds ?? 90;
  positive(leaseSeconds, "leaseSeconds");
  const match = current.slots.find(
    (slot) =>
      slot.lease?.leaseId === input.leaseId &&
      slot.lease.runId === input.runId &&
      slot.lease.generation === input.generation,
  );
  if (!match?.lease) return { state: current, result: "stale" };
  const lease = {
    ...match.lease,
    expiresAt: new Date(Date.parse(input.now) + leaseSeconds * 1000).toISOString(),
  };
  return {
    state: {
      ...current,
      slots: current.slots.map((slot) =>
        slot.slotId === match.slotId ? { ...slot, lease } : slot,
      ),
    },
    result: "accepted",
  };
}

export function releaseLoopProviderSlot(
  state: LoopProviderCapacityState,
  input: Readonly<{ leaseId: string; runId: string; generation: number; now: string }>,
): LoopProviderCapacityTransition<"released" | "stale"> {
  nonEmpty(input.leaseId, "leaseId");
  nonEmpty(input.runId, "runId");
  positive(input.generation, "generation");
  timestamp(input.now, "now");
  const current = pruneExpired(state, input.now);
  const match = current.slots.find(
    (slot) =>
      slot.lease?.leaseId === input.leaseId &&
      slot.lease.runId === input.runId &&
      slot.lease.generation === input.generation,
  );
  if (!match?.lease) return { state: current, result: "stale" };
  return {
    state: {
      ...current,
      slots: current.slots.map((slot) =>
        slot.slotId === match.slotId ? { ...slot, lease: null } : slot,
      ),
    },
    result: "released",
  };
}

export function setLoopProviderCooldown(
  state: LoopProviderCapacityState,
  input: Readonly<{
    until: string;
    reason: NonNullable<LoopProviderCapacityState["cooldownReason"]>;
  }>,
): LoopProviderCapacityState {
  timestamp(input.until, "until");
  if (
    input.reason !== "rate_limited" &&
    input.reason !== "quota_exhausted" &&
    input.reason !== "provider_unavailable"
  )
    throw new Error("invalid provider cooldown reason");
  const cooldownUntil = state.cooldownUntil ? later(state.cooldownUntil, input.until) : input.until;
  const current = normalizeState(state);
  return {
    ...current,
    cooldownUntil,
    cooldownReason: input.reason,
    admissionLimit: Math.max(1, Math.floor(current.admissionLimit / 2)),
    successfulCompletionsSinceRamp: 0,
    rateLimitCount: current.rateLimitCount + 1,
    lastRateLimitAt: new Date().toISOString(),
  };
}

/** Record a completed run and cautiously probe one more admission slot. */
export function recordLoopProviderSuccess(
  state: LoopProviderCapacityState,
  input: Readonly<{ now: string }>,
): LoopProviderCapacityState {
  timestamp(input.now, "now");
  const current = normalizeState(state);
  const successfulCompletionsSinceRamp = current.successfulCompletionsSinceRamp + 1;
  if (
    successfulCompletionsSinceRamp < SUCCESSFUL_COMPLETIONS_PER_RAMP ||
    current.admissionLimit >= current.maxConcurrent
  ) {
    return { ...current, successfulCompletionsSinceRamp };
  }
  return {
    ...current,
    admissionLimit: current.admissionLimit + 1,
    successfulCompletionsSinceRamp: 0,
  };
}

export class InMemoryLoopProviderCapacityCoordinator {
  #state: LoopProviderCapacityState;

  constructor(options: Readonly<{ maxConcurrent?: string | number }> = {}) {
    this.#state = createLoopProviderCapacityState(options);
  }

  get state(): LoopProviderCapacityState {
    return this.#state;
  }

  acquire(input: Parameters<typeof acquireLoopProviderSlot>[1]): LoopProviderCapacityAcquireResult {
    const transition = acquireLoopProviderSlot(this.#state, input);
    this.#state = transition.state;
    return transition.result;
  }

  renew(input: Parameters<typeof renewLoopProviderSlot>[1]): "accepted" | "stale" {
    const transition = renewLoopProviderSlot(this.#state, input);
    this.#state = transition.state;
    return transition.result;
  }

  release(input: Parameters<typeof releaseLoopProviderSlot>[1]): "released" | "stale" {
    const transition = releaseLoopProviderSlot(this.#state, input);
    this.#state = transition.state;
    return transition.result;
  }

  cooldown(input: Parameters<typeof setLoopProviderCooldown>[1]): void {
    this.#state = setLoopProviderCooldown(this.#state, input);
  }

  success(input: Parameters<typeof recordLoopProviderSuccess>[1]): void {
    this.#state = recordLoopProviderSuccess(this.#state, input);
  }
}
