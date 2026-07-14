import type { LoopApplication } from "./application.js";
import type { LoopTaskContract } from "./task-contract.js";
import type { LoopFinding, LoopGate, LoopTaskState } from "./task-state.js";

export type LoopWorkspaceRef = Readonly<{
  id: string;
  slug?: string;
  provider: "ascii-box";
}>;

export type LoopArtifactDownload = Readonly<{
  remotePath: string;
  localPath: string;
  required: true;
}>;

type LoopCommandOutcome = Readonly<{ exitCode: number; stdout: string; stderr: string }>;

interface LoopCrabboxHost {
  acquire(input: Readonly<{ requestedSlug: string; sourceDir: string }>): Promise<
    | Readonly<{ status: "acquired"; workspace: LoopWorkspaceRef; outcome: LoopCommandOutcome }>
    | Readonly<{
        status: "failed";
        workspace: null;
        outcome: LoopCommandOutcome;
        reason: "command_failed" | "identity_unavailable";
      }>
  >;
  sync(
    input: Readonly<{ workspace: LoopWorkspaceRef; sourceDir: string }>,
  ): Promise<LoopCommandOutcome>;
  collect(
    input: Readonly<{
      workspace: LoopWorkspaceRef;
      sourceDir: string;
      artifacts: readonly LoopArtifactDownload[];
    }>,
  ): Promise<LoopCommandOutcome>;
  stop(input: Readonly<{ workspace: LoopWorkspaceRef }>): Promise<LoopCommandOutcome>;
}

export type LoopRepositorySnapshot = Readonly<{
  baseSha: string;
  currentHeadSha?: string;
}>;

export type LoopPublishedChange = Readonly<{
  headSha: string;
  headBranch: string;
  pullRequestNumber?: number;
  pullRequestUrl?: string;
}>;

export interface LoopRepositoryAdapter {
  resolveSnapshot(contract: LoopTaskContract): Promise<LoopRepositorySnapshot>;
  publish(
    input: Readonly<{
      contract: LoopTaskContract;
      headBranch: string;
    }>,
  ): Promise<LoopPublishedChange>;
}

export type LoopWorkspaceLease = Readonly<{
  workspace: LoopWorkspaceRef;
  sourceDir: string;
}>;

export interface LoopWorkspaceAdapter {
  acquire(
    input: Readonly<{ contract: LoopTaskContract; sourceDir: string }>,
  ): Promise<LoopWorkspaceLease>;
  sync(lease: LoopWorkspaceLease): Promise<void>;
  collect(lease: LoopWorkspaceLease, artifacts: readonly LoopArtifactDownload[]): Promise<void>;
  stop(lease: LoopWorkspaceLease): Promise<void>;
}

/**
 * Adapts the proven Crabbox lifecycle transport to the Loop execution model.
 * Agent protocol traffic remains inside the Box; this adapter only owns the
 * workspace lease and artifact boundary.
 */
export class CrabboxLoopWorkspaceAdapter implements LoopWorkspaceAdapter {
  readonly #host: LoopCrabboxHost;
  readonly #slugPrefix: string;

  constructor(options: Readonly<{ host: LoopCrabboxHost; slugPrefix?: string }>) {
    this.#host = options.host;
    this.#slugPrefix = options.slugPrefix ?? "loop";
  }

  async acquire(
    input: Readonly<{ contract: LoopTaskContract; sourceDir: string }>,
  ): Promise<LoopWorkspaceLease> {
    const result = await this.#host.acquire({
      requestedSlug: `${this.#slugPrefix}-${input.contract.identity.taskId}`,
      sourceDir: input.sourceDir,
    });
    if (result.status !== "acquired") {
      throw new Error(`workspace acquisition failed: ${result.reason}`);
    }
    return { workspace: result.workspace, sourceDir: input.sourceDir };
  }

  async sync(lease: LoopWorkspaceLease): Promise<void> {
    const outcome = await this.#host.sync({
      workspace: lease.workspace,
      sourceDir: lease.sourceDir,
    });
    if (outcome.exitCode !== 0)
      throw new Error(`workspace sync failed: ${outcome.stderr || outcome.stdout}`);
  }

  async collect(
    lease: LoopWorkspaceLease,
    artifacts: readonly LoopArtifactDownload[],
  ): Promise<void> {
    const outcome = await this.#host.collect({
      workspace: lease.workspace,
      sourceDir: lease.sourceDir,
      artifacts,
    });
    if (outcome.exitCode !== 0)
      throw new Error(`workspace artifact collection failed: ${outcome.stderr || outcome.stdout}`);
  }

  async stop(lease: LoopWorkspaceLease): Promise<void> {
    const outcome = await this.#host.stop({ workspace: lease.workspace });
    if (outcome.exitCode !== 0)
      throw new Error(`workspace stop failed: ${outcome.stderr || outcome.stdout}`);
  }
}

export type LoopAgentExecution = Readonly<{
  headBranch: string;
  summary: string;
  artifacts: readonly LoopArtifactDownload[];
}>;

export interface LoopAgentAdapter {
  execute(
    input: Readonly<{ contract: LoopTaskContract; lease: LoopWorkspaceLease }>,
  ): Promise<LoopAgentExecution>;
}

export type LoopVerificationEvidence = Readonly<{
  criterionId: string;
  passed: boolean;
  summary: string;
  evidenceDigest?: string;
}>;

export interface LoopVerificationAdapter {
  verify(
    input: Readonly<{ contract: LoopTaskContract; lease: LoopWorkspaceLease; headSha: string }>,
  ): Promise<readonly LoopVerificationEvidence[]>;
}

export type LoopReviewResult = Readonly<{
  verdict: "approved" | "changes_requested" | "replan_required";
  findings: readonly LoopFinding[];
}>;

export interface LoopReviewAdapter {
  review(
    input: Readonly<{ contract: LoopTaskContract; headSha: string }>,
  ): Promise<LoopReviewResult>;
}

export type LoopExecutionResult = Readonly<{
  state: LoopTaskState;
  published?: LoopPublishedChange;
  review?: LoopReviewResult;
}>;

function gateFor(state: LoopTaskState, evidence: LoopVerificationEvidence): LoopGate {
  return {
    name: evidence.criterionId,
    state: evidence.passed ? "PASSED" : "FAILED",
    taskRevision: state.contract.identity.revision,
    contractHash: state.contractHash,
    baseSha: state.baseSha ?? "",
    headSha: state.headSha ?? "",
    ...(evidence.evidenceDigest ? { evidenceDigest: evidence.evidenceDigest } : {}),
    summary: evidence.summary,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Durable command orchestrator for the normal build path. Every phase change,
 * head update, gate, and review is committed through LoopApplication. A
 * caller may retry this method with an idempotency key at its transport layer;
 * no progress is inferred from process-local memory.
 */
export class LoopExecutionCoordinator {
  readonly #application: LoopApplication;
  readonly #repository: LoopRepositoryAdapter;
  readonly #workspace: LoopWorkspaceAdapter;
  readonly #agent: LoopAgentAdapter;
  readonly #verifier: LoopVerificationAdapter;
  readonly #reviewer: LoopReviewAdapter;
  readonly #verificationWorkspace: LoopWorkspaceAdapter | undefined;

  constructor(
    options: Readonly<{
      application: LoopApplication;
      repository: LoopRepositoryAdapter;
      workspace: LoopWorkspaceAdapter;
      agent: LoopAgentAdapter;
      verifier: LoopVerificationAdapter;
      reviewer: LoopReviewAdapter;
      verificationWorkspace?: LoopWorkspaceAdapter;
    }>,
  ) {
    this.#application = options.application;
    this.#repository = options.repository;
    this.#workspace = options.workspace;
    this.#agent = options.agent;
    this.#verifier = options.verifier;
    this.#reviewer = options.reviewer;
    this.#verificationWorkspace = options.verificationWorkspace;
  }

  async run(
    input: Readonly<{ contract: LoopTaskContract; sourceDir: string }>,
  ): Promise<LoopExecutionResult> {
    const snapshot = await this.#repository.resolveSnapshot(input.contract);
    const contract: LoopTaskContract = {
      ...input.contract,
      repository: { ...input.contract.repository, baseSha: snapshot.baseSha },
    };
    let state = await this.#application.createDraft(contract, {
      idempotencyKey: `${contract.identity.taskId}:draft`,
    });
    state = (await this.#application.validate(state.taskId, { expectedVersion: state.version }))
      .state;
    state = await this.#application.approve(state.taskId, { expectedVersion: state.version });
    state = await this.#application.advance(state.taskId, "ALLOCATING", {
      expectedVersion: state.version,
    });

    const lease = await this.#workspace.acquire({ contract, sourceDir: input.sourceDir });
    try {
      let repairRounds = 0;
      let published: LoopPublishedChange | undefined;
      let review: LoopReviewResult | undefined;
      while (true) {
        if (state.phase === "ALLOCATING") {
          state = await this.#application.advance(state.taskId, "PREPARING", {
            expectedVersion: state.version,
          });
        }
        await this.#workspace.sync(lease);
        if (state.phase === "PREPARING") {
          state = await this.#application.advance(state.taskId, "EXECUTING", {
            expectedVersion: state.version,
          });
        } else if (state.phase !== "EXECUTING") {
          throw new Error(`task cannot execute from phase ${state.phase}`);
        }
        const execution = await this.#agent.execute({ contract, lease });
        state = await this.#application.advance(state.taskId, "PUBLISHING", {
          expectedVersion: state.version,
        });
        published = await this.#repository.publish({
          contract,
          headBranch: execution.headBranch,
        });
        state = await this.#application.setHead(state.taskId, published.headSha, {
          expectedVersion: state.version,
        });
        state = await this.#application.advance(state.taskId, "VERIFYING", {
          expectedVersion: state.version,
        });
        let verificationLease = lease;
        let ownsVerificationLease = false;
        if (this.#verificationWorkspace) {
          verificationLease = await this.#verificationWorkspace.acquire({
            contract,
            sourceDir: input.sourceDir,
          });
          ownsVerificationLease = true;
          try {
            await this.#verificationWorkspace.sync(verificationLease);
          } catch (error) {
            await this.#verificationWorkspace.stop(verificationLease);
            throw error;
          }
        }
        let evidence: readonly LoopVerificationEvidence[];
        try {
          evidence = await this.#verifier.verify({
            contract,
            lease: verificationLease,
            headSha: published.headSha,
          });
        } finally {
          if (ownsVerificationLease) await this.#verificationWorkspace!.stop(verificationLease);
        }
        for (const criterion of contract.acceptanceCriteria) {
          const criterionEvidence = evidence.find(
            (entry) => entry.criterionId === criterion.id,
          ) ?? {
            criterionId: criterion.id,
            passed: false,
            summary: "no verification evidence was returned for this criterion",
          };
          state = await this.#application.recordGate(
            state.taskId,
            gateFor(state, criterionEvidence),
            {
              expectedVersion: state.version,
            },
          );
        }
        state = await this.#application.advance(state.taskId, "REVIEWING", {
          expectedVersion: state.version,
        });
        review = await this.#reviewer.review({ contract, headSha: published.headSha });
        state = await this.#application.submitReview(
          state.taskId,
          review.verdict,
          review.findings,
          { expectedVersion: state.version },
        );
        if (review.verdict !== "changes_requested") return { state, published, review };
        if (repairRounds >= contract.budget.maxRepairRounds) return { state, published, review };
        repairRounds += 1;
      }
    } finally {
      await this.#workspace.stop(lease);
    }
  }

  async approveAndComplete(taskId: string, expectedVersion: number): Promise<LoopTaskState> {
    let state = await this.#application.approveCompletion(taskId, { expectedVersion });
    state = await this.#application.completeTask(taskId, { expectedVersion: state.version });
    return state;
  }
}
