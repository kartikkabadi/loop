/**
 * Serializable repository writer/path leases.
 *
 * The repository Durable Object owns this state.  The domain functions are
 * deliberately pure so the same conflict rules can be exercised without a
 * Cloudflare runtime and replayed during reconciliation.
 */

export type LoopRepositoryLease = Readonly<{
  leaseId: string;
  taskId: string;
  runId: string;
  generation: number;
  paths: readonly string[];
  acquiredAt: string;
  renewedAt: string;
  expiresAt: string;
}>;

export type LoopRepositoryLeaseState = Readonly<{
  writer: LoopRepositoryLease | null;
}>;

export type LoopRepositoryLeaseConflict = Readonly<{
  leaseId: string;
  taskId: string;
  runId: string;
  retryAt: string;
  conflictingPaths: readonly string[];
}>;

export type LoopRepositoryLeaseTransition = Readonly<{
  state: LoopRepositoryLeaseState;
  result:
    | Readonly<{ status: "acquired"; lease: LoopRepositoryLease }>
    | Readonly<{ status: "renewed"; lease: LoopRepositoryLease }>
    | Readonly<{ status: "released" }>
    | Readonly<{ status: "stale" }>
    | Readonly<{ status: "conflict"; conflict: LoopRepositoryLeaseConflict }>;
}>;

const DEFAULT_LEASE_SECONDS = 15 * 60;

function nonEmpty(value: string, label: string): string {
  if (!value || value.includes("\0")) throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1)
    throw new Error(`${label} must be a positive safe integer`);
  return value;
}

function iso(value: string, label: string): number {
  nonEmpty(value, label);
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) throw new Error(`${label} must be an ISO timestamp`);
  return timestamp;
}

/** Normalize a contract path for lease overlap checks, without touching disk. */
export function normalizeLoopLeasePath(value: string): string {
  const input = nonEmpty(value, "lease path").replaceAll("\\", "/").trim();
  if (!input || input.startsWith("/") || /^[A-Za-z]:\//.test(input))
    throw new Error("lease paths must be relative");
  const parts = input.split("/").filter(Boolean);
  if (parts.length === 0 || parts.some((part) => part === "." || part === ".."))
    throw new Error(`lease path is not safe: ${value}`);
  return parts.join("/");
}

function paths(value: readonly string[]): readonly string[] {
  if (!Array.isArray(value)) throw new Error("lease paths must be an array");
  return [...new Set(value.map(normalizeLoopLeasePath))].sort();
}

function pathOverlaps(left: string, right: string): boolean {
  return left === right || left.startsWith(`${right}/`) || right.startsWith(`${left}/`);
}

function active(state: LoopRepositoryLeaseState, now: number): LoopRepositoryLease | null {
  return state.writer && Date.parse(state.writer.expiresAt) > now ? state.writer : null;
}

function conflict(
  current: LoopRepositoryLease,
  requestedPaths: readonly string[],
): LoopRepositoryLeaseConflict {
  const conflictingPaths = requestedPaths.filter((requested) =>
    current.paths.some((held) => pathOverlaps(requested, held)),
  );
  return {
    leaseId: current.leaseId,
    taskId: current.taskId,
    runId: current.runId,
    retryAt: current.expiresAt,
    conflictingPaths,
  };
}

function sameOwner(
  current: LoopRepositoryLease,
  input: Readonly<{ taskId: string; runId: string; generation: number }>,
): boolean {
  return (
    current.taskId === input.taskId &&
    current.runId === input.runId &&
    current.generation === input.generation
  );
}

export function createLoopRepositoryLeaseState(): LoopRepositoryLeaseState {
  return { writer: null };
}

export function acquireLoopRepositoryLease(
  current: LoopRepositoryLeaseState,
  input: Readonly<{
    leaseId: string;
    taskId: string;
    runId: string;
    generation: number;
    paths: readonly string[];
    now: string;
    leaseSeconds?: number;
  }>,
): LoopRepositoryLeaseTransition {
  const now = iso(input.now, "now");
  const leaseId = nonEmpty(input.leaseId, "leaseId");
  const taskId = nonEmpty(input.taskId, "taskId");
  const runId = nonEmpty(input.runId, "runId");
  const generation = positiveInteger(input.generation, "generation");
  const requestedPaths = paths(input.paths);
  if (requestedPaths.length === 0) throw new Error("at least one lease path is required");
  const leaseSeconds = input.leaseSeconds ?? DEFAULT_LEASE_SECONDS;
  positiveInteger(leaseSeconds, "leaseSeconds");
  const existing = active(current, now);
  if (existing) {
    if (sameOwner(existing, { taskId, runId, generation }) && existing.leaseId === leaseId) {
      const renewed: LoopRepositoryLease = {
        ...existing,
        paths: requestedPaths,
        renewedAt: input.now,
        expiresAt: new Date(now + leaseSeconds * 1000).toISOString(),
      };
      return { state: { writer: renewed }, result: { status: "renewed", lease: renewed } };
    }
    return {
      state: { writer: existing },
      result: { status: "conflict", conflict: conflict(existing, requestedPaths) },
    };
  }
  const lease: LoopRepositoryLease = {
    leaseId,
    taskId,
    runId,
    generation,
    paths: requestedPaths,
    acquiredAt: input.now,
    renewedAt: input.now,
    expiresAt: new Date(now + leaseSeconds * 1000).toISOString(),
  };
  return { state: { writer: lease }, result: { status: "acquired", lease } };
}

export function renewLoopRepositoryLease(
  current: LoopRepositoryLeaseState,
  input: Readonly<{
    leaseId: string;
    taskId: string;
    runId: string;
    generation: number;
    now: string;
    leaseSeconds?: number;
  }>,
): LoopRepositoryLeaseTransition {
  const now = iso(input.now, "now");
  const leaseId = nonEmpty(input.leaseId, "leaseId");
  const taskId = nonEmpty(input.taskId, "taskId");
  const runId = nonEmpty(input.runId, "runId");
  const generation = positiveInteger(input.generation, "generation");
  const leaseSeconds = input.leaseSeconds ?? DEFAULT_LEASE_SECONDS;
  positiveInteger(leaseSeconds, "leaseSeconds");
  const existing = current.writer;
  if (
    !existing ||
    Date.parse(existing.expiresAt) <= now ||
    existing.leaseId !== leaseId ||
    !sameOwner(existing, { taskId, runId, generation })
  )
    return {
      state: { writer: existing && Date.parse(existing.expiresAt) > now ? existing : null },
      result: { status: "stale" },
    };
  const renewed: LoopRepositoryLease = {
    ...existing,
    renewedAt: input.now,
    expiresAt: new Date(now + leaseSeconds * 1000).toISOString(),
  };
  return { state: { writer: renewed }, result: { status: "renewed", lease: renewed } };
}

export function releaseLoopRepositoryLease(
  current: LoopRepositoryLeaseState,
  input: Readonly<{
    leaseId: string;
    taskId: string;
    runId: string;
    generation: number;
    now: string;
  }>,
): LoopRepositoryLeaseTransition {
  const now = iso(input.now, "now");
  const existing = current.writer;
  if (
    !existing ||
    Date.parse(existing.expiresAt) <= now ||
    existing.leaseId !== nonEmpty(input.leaseId, "leaseId") ||
    !sameOwner(existing, {
      taskId: nonEmpty(input.taskId, "taskId"),
      runId: nonEmpty(input.runId, "runId"),
      generation: positiveInteger(input.generation, "generation"),
    })
  )
    return { state: { writer: null }, result: { status: "stale" } };
  return { state: { writer: null }, result: { status: "released" } };
}

export function expireLoopRepositoryLease(
  current: LoopRepositoryLeaseState,
  now: string,
): LoopRepositoryLeaseState {
  const timestamp = iso(now, "now");
  return current.writer && Date.parse(current.writer.expiresAt) <= timestamp
    ? createLoopRepositoryLeaseState()
    : current;
}
