import { mkdir } from "node:fs/promises";
import { realpathSync } from "node:fs";
import { execFile as execFileCallback } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import type { AgentPromptResult } from "../agent-session-runtime.js";
import {
  createLoopRunnerHostServices,
  type LoopRunnerCommandPolicy,
  type LoopRunnerHostOptions,
} from "./host-services.js";
import { LOOP_DEVIN_MODEL, normalizeLoopDevinArgs } from "./model.js";
import {
  checkpointHandoff,
  createLoopRunnerCheckpoint,
  loopRunnerSessionIdDigest,
  readLoopRunnerCheckpoint,
  writeLoopRunnerCheckpoint,
  type LoopRunnerCheckpointFile,
} from "./checkpoint.js";
import { classifyLoopRunnerFailure } from "./failure.js";
import { readLoopRunnerResult, type LoopRunnerResult } from "./result.js";
import type { LoopRunnerPublication } from "./publication.js";
import type { LoopGate } from "../loop/task-state.js";
import type { LoopBoxBootstrapReport } from "../loop/box-bootstrap.js";

const execFile = promisify(execFileCallback);

export type LoopRunnerEvent =
  | Readonly<{
      type: "runner-registered";
      taskId: string;
      runId: string;
      boxId: string;
      generation: number;
      cancellationGeneration: number;
      model: typeof LOOP_DEVIN_MODEL;
      providerLeaseId?: string;
      repositoryLeaseId?: string;
      phase: "starting";
      processAlive: true;
    }>
  | Readonly<{
      type: "runner-heartbeat";
      taskId: string;
      runId: string;
      boxId: string;
      generation: number;
      cancellationGeneration: number;
      model: typeof LOOP_DEVIN_MODEL;
      providerLeaseId?: string;
      repositoryLeaseId?: string;
      phase: string;
      processAlive: boolean;
    }>
  | Readonly<{
      type: "agent-result";
      taskId: string;
      runId: string;
      boxId: string;
      generation: number;
      cancellationGeneration: number;
      model: typeof LOOP_DEVIN_MODEL;
      taskRevision: number;
      contractHash: string;
      resultStatus: LoopRunnerResult["status"];
      checkpointId?: string;
      repositoryLeaseId?: string;
      headSha: string;
      gates: readonly LoopGate[];
      headBranch?: string;
      pullRequestNumber?: number;
      pullRequestUrl?: string;
    }>
  | Readonly<{
      type: "agent-rate-limited";
      taskId: string;
      runId: string;
      boxId: string;
      generation: number;
      cancellationGeneration: number;
      model: typeof LOOP_DEVIN_MODEL;
      reason: string;
      retryAt: string;
      checkpointId?: string;
      sessionIdDigest?: string;
      repositoryLeaseId?: string;
    }>
  | Readonly<{
      type: "agent-failed";
      taskId: string;
      runId: string;
      boxId: string;
      generation: number;
      cancellationGeneration: number;
      model: typeof LOOP_DEVIN_MODEL;
      reason: string;
      retryAt?: string;
      checkpointId?: string;
      sessionIdDigest?: string;
      repositoryLeaseId?: string;
    }>;

export type LoopRunnerOptions = Readonly<{
  workspaceRoot: string;
  taskId: string;
  runId: string;
  boxId: string;
  generation: number;
  cancellationGeneration?: number;
  taskRevision: number;
  contractHash: string;
  /** The contract's resolved base SHA, needed for commit-bound builder gates. */
  baseSha?: string;
  /** Required gate IDs copied from the immutable contract. */
  requiredGateNames?: readonly string[];
  prompt: string;
  resultPath: string;
  checkpointPath?: string;
  resumeSessionId?: string;
  providerLeaseId?: string;
  repositoryLeaseId?: string;
  publish?: () => Promise<LoopRunnerPublication>;
  /** Verify and repair the managed Box before starting Devin. */
  bootstrap?: () => Promise<LoopBoxBootstrapReport>;
  commandPolicy?: LoopRunnerCommandPolicy;
  devinCommand?: string;
  devinArgs?: readonly string[];
  runtimeFactory: (
    input: Readonly<{
      workspaceRoot: string;
      hostServices: ReturnType<typeof createLoopRunnerHostServices>;
      devinCommand?: string;
      devinArgs?: readonly string[];
    }>,
  ) => LoopRunnerRuntimeController;
  emit?: (event: LoopRunnerEvent) => Promise<void> | void;
}>;

type LoopRunnerRuntimeController = Readonly<{
  runtime: Readonly<{
    initialize(): Promise<LoopRunnerInitializedRuntime>;
  }>;
  shutdown(): Promise<void>;
}>;

type LoopRunnerInitializedRuntime = Readonly<{
  createSession(input: Readonly<{ cwd: string }>): Promise<Readonly<{ id: string; cwd: string }>>;
  loadSession?: (
    input: Readonly<{ sessionId: string; cwd: string }>,
  ) => Promise<Readonly<{ id: string; cwd: string }>>;
  prompt(input: Readonly<{ sessionId: string; text: string }>): Promise<AgentPromptResult>;
}>;

export type LoopRunnerExecution = Readonly<{
  result: LoopRunnerResult;
  prompt: AgentPromptResult;
  sessionId: string;
}>;

function nonEmpty(value: string, label: string): string {
  if (!value || value.includes("\0")) throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function positive(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${label} must be positive`);
  return value;
}

function resultPathInsideWorkspace(workspaceRoot: string, resultPath: string): string {
  const lexicalRoot = path.resolve(workspaceRoot);
  const lexicalResult = path.isAbsolute(resultPath)
    ? path.resolve(resultPath)
    : path.resolve(lexicalRoot, resultPath);
  const relative = path.relative(lexicalRoot, lexicalResult);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative))
    throw new Error("resultPath escapes runner workspace");
  return path.resolve(realpathSync(workspaceRoot), relative);
}

async function gitHeadSha(workspaceRoot: string): Promise<string> {
  const result = await execFile("git", ["rev-parse", "HEAD"], {
    cwd: workspaceRoot,
    maxBuffer: 1024,
  });
  const headSha = result.stdout.trim();
  if (!/^[0-9a-f]{7,64}$/i.test(headSha)) throw new Error("git HEAD is not a valid SHA");
  return headSha;
}

function builderGates(
  result: LoopRunnerResult,
  input: Readonly<{
    taskRevision: number;
    contractHash: string;
    baseSha: string;
    headSha: string;
    requiredGateNames?: readonly string[];
  }>,
): readonly LoopGate[] {
  const byName = new Map(result.acceptanceCriteria.map((criterion) => [criterion.id, criterion]));
  const names =
    input.requiredGateNames ?? result.acceptanceCriteria.map((criterion) => criterion.id);
  return names.map((name) => {
    const criterion = byName.get(name);
    const state =
      result.status === "candidate_complete" && criterion?.claimedStatus === "satisfied"
        ? "PENDING"
        : "FAILED";
    return {
      name,
      state,
      taskRevision: input.taskRevision,
      contractHash: input.contractHash,
      baseSha: input.baseSha,
      headSha: input.headSha,
      summary:
        state === "PENDING"
          ? "Builder evidence is present; independent verification is still required."
          : criterion
            ? `Builder did not claim ${criterion.claimedStatus} for this criterion.`
            : "Builder result omitted this required acceptance criterion.",
      updatedAt: new Date().toISOString(),
    } satisfies LoopGate;
  });
}

function checkpointIdentityMatches(
  checkpoint: LoopRunnerCheckpointFile,
  options: LoopRunnerOptions,
): boolean {
  return (
    checkpoint.taskId === options.taskId &&
    checkpoint.runId === options.runId &&
    checkpoint.taskRevision === options.taskRevision &&
    checkpoint.contractHash === options.contractHash &&
    checkpoint.cancellationGeneration === (options.cancellationGeneration ?? 1) &&
    checkpoint.model === LOOP_DEVIN_MODEL
  );
}

export class LoopRunner {
  readonly #options: LoopRunnerOptions;

  constructor(options: LoopRunnerOptions) {
    const resultPath = resultPathInsideWorkspace(options.workspaceRoot, options.resultPath);
    const checkpointPath =
      options.checkpointPath === undefined
        ? undefined
        : resultPathInsideWorkspace(options.workspaceRoot, options.checkpointPath);
    this.#options = { ...options, resultPath, ...(checkpointPath ? { checkpointPath } : {}) };
    nonEmpty(options.workspaceRoot, "workspaceRoot");
    nonEmpty(options.taskId, "taskId");
    nonEmpty(options.runId, "runId");
    nonEmpty(options.boxId, "boxId");
    positive(options.generation, "generation");
    if (options.cancellationGeneration !== undefined)
      positive(options.cancellationGeneration, "cancellationGeneration");
    positive(options.taskRevision, "taskRevision");
    nonEmpty(options.contractHash, "contractHash");
    if (options.baseSha !== undefined) {
      nonEmpty(options.baseSha, "baseSha");
      if (!/^[0-9a-f]{7,64}$/i.test(options.baseSha)) throw new Error("baseSha must be a git SHA");
    }
    if (options.requiredGateNames !== undefined) {
      if (!Array.isArray(options.requiredGateNames) || options.requiredGateNames.length === 0)
        throw new Error("requiredGateNames must contain at least one gate");
      options.requiredGateNames.forEach((name) => nonEmpty(name, "required gate name"));
    }
    nonEmpty(options.prompt, "prompt");
    nonEmpty(options.resultPath, "resultPath");
    if (options.checkpointPath !== undefined) nonEmpty(options.checkpointPath, "checkpointPath");
    if (options.resumeSessionId !== undefined) nonEmpty(options.resumeSessionId, "resumeSessionId");
  }

  async run(): Promise<LoopRunnerExecution> {
    const options = this.#options;
    const cancellationGeneration = options.cancellationGeneration ?? 1;
    const hostOptions: LoopRunnerHostOptions = {
      workspaceRoot: options.workspaceRoot,
      ...(options.commandPolicy ? { commandPolicy: options.commandPolicy } : {}),
    };
    const hostServices = createLoopRunnerHostServices(hostOptions);
    const devinArgs = normalizeLoopDevinArgs(options.devinArgs);
    const priorCheckpoint = options.checkpointPath
      ? await readLoopRunnerCheckpoint(options.checkpointPath)
      : undefined;
    if (priorCheckpoint && !checkpointIdentityMatches(priorCheckpoint, options))
      throw new Error("runner checkpoint belongs to a different task or contract");
    let controller: LoopRunnerRuntimeController | undefined;
    let activeSession: Readonly<{ id: string; cwd: string }> | undefined;
    let checkpoint: LoopRunnerCheckpointFile | undefined;
    const saveCheckpoint = async (
      status: "active" | "completed" | "rate_limited" | "failed",
      phase: string,
      handoff: string,
      failure?: Readonly<{ reason: string; retryAt?: string }>,
    ): Promise<void> => {
      if (!options.checkpointPath || !activeSession) return;
      checkpoint = createLoopRunnerCheckpoint({
        taskId: options.taskId,
        runId: options.runId,
        generation: options.generation,
        cancellationGeneration,
        taskRevision: options.taskRevision,
        contractHash: options.contractHash,
        sessionId: activeSession.id,
        status,
        phase,
        handoff,
        ...(failure?.reason ? { providerReason: failure.reason } : {}),
        ...(failure?.retryAt ? { retryAt: failure.retryAt } : {}),
      });
      await writeLoopRunnerCheckpoint(options.checkpointPath, checkpoint);
    };
    try {
      if (options.bootstrap) {
        await options.emit?.({
          type: "runner-heartbeat",
          taskId: options.taskId,
          runId: options.runId,
          boxId: options.boxId,
          generation: options.generation,
          cancellationGeneration,
          model: LOOP_DEVIN_MODEL,
          ...(options.providerLeaseId ? { providerLeaseId: options.providerLeaseId } : {}),
          ...(options.repositoryLeaseId ? { repositoryLeaseId: options.repositoryLeaseId } : {}),
          phase: "bootstrap",
          processAlive: true,
        });
        const report = await options.bootstrap();
        if (!report.ready)
          throw new Error(
            `Loop Box bootstrap failed: ${report.tools
              .filter((tool) => tool.status === "failed")
              .map((tool) => `${tool.name}: ${tool.detail ?? "verification failed"}`)
              .join("; ")}`,
          );
      }
      controller = options.runtimeFactory({
        workspaceRoot: options.workspaceRoot,
        hostServices,
        ...(options.devinCommand ? { devinCommand: options.devinCommand } : {}),
        devinArgs,
      });
      await options.emit?.({
        type: "runner-registered",
        taskId: options.taskId,
        runId: options.runId,
        boxId: options.boxId,
        generation: options.generation,
        cancellationGeneration,
        model: LOOP_DEVIN_MODEL,
        ...(options.providerLeaseId ? { providerLeaseId: options.providerLeaseId } : {}),
        ...(options.repositoryLeaseId ? { repositoryLeaseId: options.repositoryLeaseId } : {}),
        phase: "starting",
        processAlive: true,
      });
      await options.emit?.({
        type: "runner-heartbeat",
        taskId: options.taskId,
        runId: options.runId,
        boxId: options.boxId,
        generation: options.generation,
        cancellationGeneration,
        model: LOOP_DEVIN_MODEL,
        ...(options.providerLeaseId ? { providerLeaseId: options.providerLeaseId } : {}),
        ...(options.repositoryLeaseId ? { repositoryLeaseId: options.repositoryLeaseId } : {}),
        phase: "starting",
        processAlive: true,
      });
      await mkdir(path.dirname(options.resultPath), { recursive: true });
      const initialized = await controller.runtime.initialize();
      const requestedResumeSessionId = options.resumeSessionId;
      let resumed = false;
      const session =
        requestedResumeSessionId && initialized.loadSession
          ? await initialized
              .loadSession({
                sessionId: requestedResumeSessionId,
                cwd: options.workspaceRoot,
              })
              .then((value) => {
                resumed = true;
                return value;
              })
          : await initialized.createSession({ cwd: options.workspaceRoot });
      activeSession = session;
      await saveCheckpoint(
        "active",
        resumed ? "resumed" : "initialized",
        priorCheckpoint?.handoff ?? "ACP session initialized; work has not completed yet.",
      );
      await options.emit?.({
        type: "runner-heartbeat",
        taskId: options.taskId,
        runId: options.runId,
        boxId: options.boxId,
        generation: options.generation,
        cancellationGeneration,
        model: LOOP_DEVIN_MODEL,
        ...(options.providerLeaseId ? { providerLeaseId: options.providerLeaseId } : {}),
        ...(options.repositoryLeaseId ? { repositoryLeaseId: options.repositoryLeaseId } : {}),
        phase: "devin",
        processAlive: true,
      });
      const promptText =
        requestedResumeSessionId && !resumed && priorCheckpoint
          ? `${options.prompt}\n\nResume handoff from the previous runner:\n${priorCheckpoint.handoff}`
          : options.prompt;
      const heartbeat = setInterval(() => {
        void Promise.resolve(
          options.emit?.({
            type: "runner-heartbeat",
            taskId: options.taskId,
            runId: options.runId,
            boxId: options.boxId,
            generation: options.generation,
            cancellationGeneration,
            model: LOOP_DEVIN_MODEL,
            ...(options.providerLeaseId ? { providerLeaseId: options.providerLeaseId } : {}),
            ...(options.repositoryLeaseId ? { repositoryLeaseId: options.repositoryLeaseId } : {}),
            phase: "devin",
            processAlive: true,
          }),
        ).catch(() => undefined);
      }, 30_000);
      heartbeat.unref?.();
      let prompt: AgentPromptResult;
      try {
        prompt = await initialized.prompt({ sessionId: session.id, text: promptText });
      } finally {
        clearInterval(heartbeat);
      }
      const result = await readLoopRunnerResult(options.resultPath, {
        taskRevision: options.taskRevision,
        contractHash: options.contractHash,
      });
      await saveCheckpoint(
        "completed",
        "result",
        checkpointHandoff(
          prompt.outputText,
          `Runner completed with result status ${result.status}.`,
        ),
      );
      if (result.status !== "candidate_complete") {
        await options.emit?.({
          type: "agent-failed",
          taskId: options.taskId,
          runId: options.runId,
          boxId: options.boxId,
          generation: options.generation,
          cancellationGeneration,
          model: LOOP_DEVIN_MODEL,
          reason: `runner result status is ${result.status}; candidate evidence is not publishable`,
          ...(checkpoint ? { checkpointId: checkpoint.checkpointId } : {}),
          ...(activeSession
            ? { sessionIdDigest: loopRunnerSessionIdDigest(activeSession.id) }
            : {}),
          ...(options.repositoryLeaseId ? { repositoryLeaseId: options.repositoryLeaseId } : {}),
        });
        return { result, prompt, sessionId: session.id };
      }
      if (!options.baseSha)
        throw new Error("baseSha is required before a candidate can be published");
      if (options.publish && controller) {
        await controller.shutdown();
        controller = undefined;
      }
      const published = await options.publish?.();
      const headSha = published?.headSha ?? (await gitHeadSha(options.workspaceRoot));
      const gates = builderGates(result, {
        taskRevision: options.taskRevision,
        contractHash: options.contractHash,
        baseSha: options.baseSha,
        headSha,
        ...(options.requiredGateNames ? { requiredGateNames: options.requiredGateNames } : {}),
      });
      await options.emit?.({
        type: "agent-result",
        taskId: options.taskId,
        runId: options.runId,
        boxId: options.boxId,
        generation: options.generation,
        cancellationGeneration,
        model: LOOP_DEVIN_MODEL,
        taskRevision: options.taskRevision,
        contractHash: options.contractHash,
        resultStatus: result.status,
        ...(checkpoint ? { checkpointId: checkpoint.checkpointId } : {}),
        ...(options.repositoryLeaseId ? { repositoryLeaseId: options.repositoryLeaseId } : {}),
        headSha,
        gates,
        ...(published?.headBranch ? { headBranch: published.headBranch } : {}),
        ...(published?.pullRequestNumber === undefined
          ? {}
          : { pullRequestNumber: published.pullRequestNumber }),
        ...(published?.pullRequestUrl ? { pullRequestUrl: published.pullRequestUrl } : {}),
      });
      return { result, prompt, sessionId: session.id };
    } catch (error) {
      const failure = classifyLoopRunnerFailure(error);
      try {
        await saveCheckpoint(
          failure.kind === "rate_limited" || failure.kind === "quota_exhausted"
            ? "rate_limited"
            : "failed",
          "devin",
          failure.reason,
          failure.retryAt
            ? { reason: failure.reason, retryAt: failure.retryAt }
            : { reason: failure.reason },
        );
      } catch {
        // Preserve the provider failure if local checkpoint storage is unavailable.
      }
      try {
        if (failure.kind === "rate_limited" || failure.kind === "quota_exhausted") {
          await options.emit?.({
            type: "agent-rate-limited",
            taskId: options.taskId,
            runId: options.runId,
            boxId: options.boxId,
            generation: options.generation,
            cancellationGeneration,
            model: LOOP_DEVIN_MODEL,
            reason: failure.reason,
            ...(failure.retryAt ? { retryAt: failure.retryAt } : {}),
            retryAt: failure.retryAt ?? new Date(Date.now() + 5 * 60 * 1000).toISOString(),
            ...(checkpoint ? { checkpointId: checkpoint.checkpointId } : {}),
            ...(activeSession
              ? { sessionIdDigest: loopRunnerSessionIdDigest(activeSession.id) }
              : {}),
          });
        } else {
          await options.emit?.({
            type: "agent-failed",
            taskId: options.taskId,
            runId: options.runId,
            boxId: options.boxId,
            generation: options.generation,
            cancellationGeneration,
            model: LOOP_DEVIN_MODEL,
            reason: failure.reason,
            ...(checkpoint ? { checkpointId: checkpoint.checkpointId } : {}),
            ...(activeSession
              ? { sessionIdDigest: loopRunnerSessionIdDigest(activeSession.id) }
              : {}),
          });
        }
      } catch {
        // The original ACP failure remains authoritative if the event sink is unavailable.
      }
      throw error;
    } finally {
      await hostServices.close();
      await controller?.shutdown();
    }
  }
}
