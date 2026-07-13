import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { LOOP_DEVIN_MODEL, type LoopDevinModel } from "./model.js";

export type LoopRunnerCheckpointStatus = "active" | "completed" | "rate_limited" | "failed";

export type LoopRunnerCheckpointFile = Readonly<{
  schemaVersion: 1;
  checkpointId: string;
  taskId: string;
  runId: string;
  generation: number;
  cancellationGeneration: number;
  taskRevision: number;
  model: LoopDevinModel;
  contractHash: string;
  sessionId: string;
  sessionIdDigest: string;
  status: LoopRunnerCheckpointStatus;
  phase: string;
  handoff: string;
  providerReason?: string;
  retryAt?: string;
  updatedAt: string;
}>;

const MAX_HANDOFF_BYTES = 16 * 1024;

function nonEmpty(value: string, label: string): string {
  if (!value || value.includes("\0")) throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function positive(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${label} must be positive`);
  return value;
}

export function loopRunnerSessionIdDigest(sessionId: string): string {
  return createHash("sha256").update(sessionId).digest("hex").slice(0, 16);
}

function validate(value: LoopRunnerCheckpointFile): void {
  if (value.schemaVersion !== 1) throw new Error("unsupported runner checkpoint schema");
  nonEmpty(value.checkpointId, "checkpointId");
  nonEmpty(value.taskId, "taskId");
  nonEmpty(value.runId, "runId");
  positive(value.generation, "generation");
  positive(value.cancellationGeneration, "cancellationGeneration");
  positive(value.taskRevision, "taskRevision");
  if (value.model !== LOOP_DEVIN_MODEL)
    throw new Error(
      `Loop only permits the configured execution provider model ${String(LOOP_DEVIN_MODEL)}`,
    );
  nonEmpty(value.contractHash, "contractHash");
  nonEmpty(value.sessionId, "sessionId");
  if (loopRunnerSessionIdDigest(value.sessionId) !== value.sessionIdDigest)
    throw new Error("runner checkpoint session digest mismatch");
  nonEmpty(value.sessionIdDigest, "sessionIdDigest");
  nonEmpty(value.status, "status");
  nonEmpty(value.phase, "phase");
  nonEmpty(value.handoff, "handoff");
  if (Buffer.byteLength(value.handoff, "utf8") > MAX_HANDOFF_BYTES)
    throw new Error("runner checkpoint handoff is too large");
  nonEmpty(value.updatedAt, "updatedAt");
}

export function createLoopRunnerCheckpoint(
  input: Readonly<{
    taskId: string;
    runId: string;
    generation: number;
    cancellationGeneration?: number;
    taskRevision: number;
    contractHash: string;
    sessionId: string;
    status: LoopRunnerCheckpointStatus;
    phase: string;
    handoff: string;
    providerReason?: string;
    retryAt?: string;
    updatedAt?: string;
  }>,
): LoopRunnerCheckpointFile {
  const sessionId = nonEmpty(input.sessionId, "sessionId");
  const record: LoopRunnerCheckpointFile = {
    schemaVersion: 1,
    checkpointId: `checkpoint-${input.runId}-${input.generation}-${randomUUID().slice(0, 8)}`,
    taskId: nonEmpty(input.taskId, "taskId"),
    runId: nonEmpty(input.runId, "runId"),
    generation: positive(input.generation, "generation"),
    cancellationGeneration: positive(input.cancellationGeneration ?? 1, "cancellationGeneration"),
    taskRevision: positive(input.taskRevision, "taskRevision"),
    model: LOOP_DEVIN_MODEL,
    contractHash: nonEmpty(input.contractHash, "contractHash"),
    sessionId,
    sessionIdDigest: loopRunnerSessionIdDigest(sessionId),
    status: input.status,
    phase: nonEmpty(input.phase, "phase"),
    handoff: nonEmpty(input.handoff.slice(0, MAX_HANDOFF_BYTES), "handoff"),
    ...(input.providerReason ? { providerReason: input.providerReason.slice(0, 512) } : {}),
    ...(input.retryAt ? { retryAt: input.retryAt } : {}),
    updatedAt: input.updatedAt ?? new Date().toISOString(),
  };
  validate(record);
  return record;
}

export async function writeLoopRunnerCheckpoint(
  checkpointPath: string,
  checkpoint: LoopRunnerCheckpointFile,
): Promise<void> {
  validate(checkpoint);
  await mkdir(path.dirname(checkpointPath), { recursive: true });
  const temporaryPath = `${checkpointPath}.${randomUUID()}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(checkpoint)}\n`, {
    encoding: "utf8",
    mode: 0o600,
  });
  await rename(temporaryPath, checkpointPath);
}

export async function readLoopRunnerCheckpoint(
  checkpointPath: string,
): Promise<LoopRunnerCheckpointFile | undefined> {
  try {
    const raw = JSON.parse(
      await readFile(checkpointPath, "utf8"),
    ) as Partial<LoopRunnerCheckpointFile>;
    const value = {
      ...raw,
      // Checkpoints written before cancellation fencing are safe only as the
      // initial generation; new writes always carry the explicit field.
      cancellationGeneration: raw.cancellationGeneration ?? 1,
    } as LoopRunnerCheckpointFile;
    validate(value);
    return value;
  } catch {
    return undefined;
  }
}

export function checkpointHandoff(outputText: string | undefined, fallback: string): string {
  const value = outputText?.trim();
  return (value && value.length > 0 ? value : fallback).slice(0, MAX_HANDOFF_BYTES);
}
