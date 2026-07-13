import { Auth0LoopAuthenticator } from "../src/loop/auth0.ts";
import { handleLoopSdkMcpRequest } from "../src/loop/mcp-sdk.ts";
import { D1LoopTaskEventStore, type LoopD1Database } from "../src/loop/d1-event-store.ts";
import { D1LoopBoxAllocationStore } from "../src/loop/box-allocation.ts";
import { D1LoopRunStore } from "../src/loop/run-record.ts";
import { D1LoopRunnerRegistrationStore } from "../src/loop/runner-registration.ts";
import {
  acquireLoopRepositoryLease,
  createLoopRepositoryLeaseState,
  releaseLoopRepositoryLease,
  renewLoopRepositoryLease,
  type LoopRepositoryLeaseState,
} from "../src/loop/repository-leases.ts";
import { reconcileLoopRuntime } from "../src/loop/reconciliation.ts";
import { planLoopSelfHealing } from "../src/loop/self-healing.ts";
import { parseLoopGitHubCommand, parseLoopGitHubIssue } from "../src/loop/github-intake.ts";
import {
  createLoopGitHubAppClient,
  GitHubLoopIssuePublisher,
  GitHubLoopPublicationAdapter,
} from "../src/loop/github-adapter.ts";
import {
  acquireLoopProviderSlot,
  configureLoopProviderCapacityState,
  createLoopProviderCapacityState,
  releaseLoopProviderSlot,
  renewLoopProviderSlot,
  recordLoopProviderSuccess,
  setLoopProviderCooldown,
  type LoopProviderCapacityState,
} from "../src/loop/provider-capacity.ts";
import {
  createLoopGateway,
  type LoopGatewayRequest,
  type LoopGatewayResponse,
} from "../src/loop/gateway.ts";
import { LoopApplication } from "../src/loop/application.ts";
import { D1R2LoopEvidenceStore, type LoopR2Bucket } from "../src/loop/evidence.ts";
import {
  D1LoopWebhookDedupStore,
  LOOP_MAX_WEBHOOK_BODY_BYTES,
  verifyGithubWebhookSignature,
  verifyGithubWebhookSignatureBytes,
} from "../src/loop/webhook.ts";
import type {
  LoopCapacityReader,
  LoopPrincipal,
  LoopRunDispatcher,
} from "../src/loop/tool-router.ts";
import type { LoopFinding, LoopGate } from "../src/loop/task-state.ts";
import { LOOP_DEVIN_MODEL } from "../src/loop-runner/model.ts";
import {
  assertLoopWorkflowAllowed,
  loopDispatchPolicy,
  parseLoopRolloutMode,
} from "../src/loop/rollout-policy.ts";
import { WorkflowEntrypoint, type WorkflowEvent, type WorkflowStep } from "cloudflare:workers";

type LoopGatewayEnv = Readonly<{
  LOOP_DB: LoopD1Database;
  LOOP_EVIDENCE: LoopR2Bucket;
  LOOP_WEBHOOK_QUEUE: LoopWebhookQueue;
  REPO_COORDINATOR: LoopCoordinatorNamespace;
  PROVIDER_CAPACITY: LoopCapacityNamespace;
  TASK_RUN_WORKFLOW?: LoopWorkflowBinding;
  LOOP_RESOURCE_URL?: string;
  LOOP_DOCUMENTATION_URL?: string;
  AUTH0_ISSUER?: string;
  AUTH0_AUDIENCE?: string;
  LOOP_ALLOWED_SUBJECT?: string;
  LOOP_ALLOWED_EMAIL?: string;
  LOOP_REQUIRE_VERIFIED_EMAIL?: string;
  LOOP_ROLLOUT_MODE?: string;
  LOOP_DEVIN_MAX_CONCURRENT?: string;
  LOOP_ALLOWED_GITHUB_ACTOR?: string;
  GITHUB_WEBHOOK_SECRET?: string;
  LOOP_WORKFLOW_EVENT_SECRET?: string;
  LOOP_GITHUB_APP_ID?: string;
  LOOP_GITHUB_INSTALLATION_ID?: string;
  LOOP_GITHUB_APP_PRIVATE_KEY?: string;
}>;

type LoopWebhookQueueBody = Readonly<{
  deliveryId: string;
  eventName: string;
  payload: unknown;
  receivedAt: string;
}>;

interface LoopWebhookQueue {
  send(body: LoopWebhookQueueBody, options?: Readonly<{ contentType: "json" }>): Promise<void>;
}

interface LoopWebhookMessage {
  readonly body: LoopWebhookQueueBody;
  ack(): void;
  retry(options?: Readonly<{ delaySeconds?: number }>): void;
}

interface LoopWebhookBatch {
  readonly messages: readonly LoopWebhookMessage[];
}

interface LoopCoordinatorNamespace {
  idFromName(name: string): unknown;
  get(id: unknown): LoopCoordinatorStub;
}

interface LoopCoordinatorStub {
  fetch(request: Request): Promise<Response>;
}

interface LoopCapacityNamespace {
  idFromName(name: string): unknown;
  get(id: unknown): LoopCapacityStub;
}

interface LoopCapacityStub {
  fetch(request: Request): Promise<Response>;
}

interface LoopDurableObjectState {
  blockConcurrencyWhile<T>(callback: () => Promise<T>): Promise<T>;
  storage: Readonly<{
    get<T>(key: string): Promise<T | undefined>;
    put<T>(key: string, value: T): Promise<void>;
  }>;
}

interface LoopScheduledEvent {
  readonly scheduledTime: number;
}

type LoopTaskWorkflowParams = Readonly<{ taskId: string; expectedVersion: number }>;

interface LoopWorkflowBinding {
  create(
    options: Readonly<{ id: string; params: LoopTaskWorkflowParams }>,
  ): Promise<Readonly<{ id: string }>>;
  get(id: string): Promise<LoopWorkflowInstance>;
}

interface LoopWorkflowInstance {
  sendEvent(input: Readonly<{ type: string; payload: unknown }>): Promise<void>;
}

type LoopTaskWorkflowEnv = Readonly<{
  LOOP_DB: LoopD1Database;
  LOOP_EVIDENCE: LoopR2Bucket;
  REPO_COORDINATOR: LoopCoordinatorNamespace;
  PROVIDER_CAPACITY: LoopCapacityNamespace;
  LOOP_ROLLOUT_MODE?: string;
  LOOP_DEVIN_MAX_CONCURRENT?: string;
  LOOP_GITHUB_APP_ID?: string;
  LOOP_GITHUB_INSTALLATION_ID?: string;
  LOOP_GITHUB_APP_PRIVATE_KEY?: string;
}>;

type LoopBoxReadyEvent = Readonly<{
  taskId: string;
  runId: string;
  allocationId?: string;
  boxId?: string;
  kind?: "cancelled";
  cancellationGeneration?: number;
  reason?: string;
}>;
type LoopAgentResultEvent = Readonly<{
  taskId: string;
  runId: string;
  headSha: string;
  gates: readonly LoopGate[];
}>;
type LoopVerificationResultEvent = Readonly<{
  taskId: string;
  runId: string;
  headSha: string;
  gates: readonly LoopGate[];
}>;
type LoopAgentOutcomeEvent = Readonly<{
  taskId: string;
  runId?: string;
  boxId?: string;
  generation?: number;
  cancellationGeneration: number;
  model?: typeof LOOP_DEVIN_MODEL;
  kind: "complete" | "rate_limited" | "failed" | "cancelled";
  taskRevision?: number;
  contractHash?: string;
  resultStatus?: string;
  checkpointId?: string;
  headSha?: string;
  gates?: readonly LoopGate[];
  headBranch?: string;
  pullRequestNumber?: number;
  pullRequestUrl?: string;
  reason?: string;
  retryAt?: string;
  sessionIdDigest?: string;
  repositoryLeaseId?: string;
}>;
type LoopReviewResultEvent = Readonly<{
  taskId: string;
  runId: string;
  verdict: "approved" | "changes_requested" | "replan_required";
  findings: readonly LoopFinding[];
}>;

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };
const LOOP_AUTO_DISPATCH_LIMIT = 20;

function requestHeaders(request: Request): Readonly<Record<string, string>> {
  return Object.fromEntries(request.headers.entries());
}

function responseFromGateway(result: LoopGatewayResponse): Response {
  return new Response(result.body === null ? null : JSON.stringify(result.body), {
    status: result.status,
    headers: { ...JSON_HEADERS, ...result.headers },
  });
}

function authenticatorFor(
  env: LoopGatewayEnv,
): Auth0LoopAuthenticator | { authenticate(): Promise<null> } {
  if (!env.AUTH0_ISSUER || !env.AUTH0_AUDIENCE)
    return {
      async authenticate() {
        return null;
      },
    };
  return new Auth0LoopAuthenticator({
    issuer: env.AUTH0_ISSUER,
    audience: env.AUTH0_AUDIENCE,
    ...(env.LOOP_ALLOWED_SUBJECT ? { allowedSubject: env.LOOP_ALLOWED_SUBJECT } : {}),
    ...(env.LOOP_ALLOWED_EMAIL ? { allowedEmail: env.LOOP_ALLOWED_EMAIL } : {}),
    requireVerifiedEmail: env.LOOP_REQUIRE_VERIFIED_EMAIL !== "false",
  });
}

function githubIssuePublisherFor(env: LoopGatewayEnv): GitHubLoopIssuePublisher | undefined {
  if (
    !env.LOOP_GITHUB_APP_ID ||
    !env.LOOP_GITHUB_INSTALLATION_ID ||
    !env.LOOP_GITHUB_APP_PRIVATE_KEY
  )
    return undefined;
  return new GitHubLoopIssuePublisher(
    createLoopGitHubAppClient({
      appId: env.LOOP_GITHUB_APP_ID,
      installationId: env.LOOP_GITHUB_INSTALLATION_ID,
      privateKeyPem: env.LOOP_GITHUB_APP_PRIVATE_KEY,
    }),
  );
}

function githubPublicationFor(
  env: Pick<
    LoopGatewayEnv,
    "LOOP_GITHUB_APP_ID" | "LOOP_GITHUB_INSTALLATION_ID" | "LOOP_GITHUB_APP_PRIVATE_KEY"
  >,
): GitHubLoopPublicationAdapter | undefined {
  if (
    !env.LOOP_GITHUB_APP_ID ||
    !env.LOOP_GITHUB_INSTALLATION_ID ||
    !env.LOOP_GITHUB_APP_PRIVATE_KEY
  )
    return undefined;
  return new GitHubLoopPublicationAdapter(
    createLoopGitHubAppClient({
      appId: env.LOOP_GITHUB_APP_ID,
      installationId: env.LOOP_GITHUB_INSTALLATION_ID,
      privateKeyPem: env.LOOP_GITHUB_APP_PRIVATE_KEY,
    }),
  );
}

function workflowDispatcherFor(env: LoopGatewayEnv): LoopRunDispatcher | undefined {
  if (!env.TASK_RUN_WORKFLOW) return undefined;
  const workflow = env.TASK_RUN_WORKFLOW;
  return {
    async start(input) {
      const workflowId = `loop-${input.taskId}-v${input.expectedVersion}`;
      try {
        const instance = await workflow.create({
          id: workflowId,
          params: { taskId: input.taskId, expectedVersion: input.expectedVersion },
        });
        return { workflowId: instance.id };
      } catch {
        await workflow.get(workflowId);
        return { workflowId };
      }
    },
    async signal(input) {
      const runs = await new D1LoopRunStore(env.LOOP_DB).list(input.taskId);
      const current = runs
        .filter(
          (run) =>
            !["completed", "awaiting_human", "needs_replan", "failed", "cancelled"].includes(
              run.status,
            ),
        )
        .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))[0];
      if (!current) return;
      const workflowId = current.runId;
      const instance = await workflow.get(workflowId);
      await instance.sendEvent({
        type: "box-ready",
        payload: {
          taskId: input.taskId,
          runId: workflowId,
          kind: input.type,
          cancellationGeneration: input.cancellationGeneration,
          reason: input.reason,
        },
      });
      await instance.sendEvent({
        type: "agent-outcome",
        payload: {
          taskId: input.taskId,
          runId: workflowId,
          kind: input.type,
          cancellationGeneration: input.cancellationGeneration,
          reason: input.reason,
        },
      });
    },
  };
}

async function gatewayRequest(request: Request, env: LoopGatewayEnv): Promise<LoopGatewayResponse> {
  if (request.method === "OPTIONS") {
    return {
      status: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET,POST,OPTIONS",
        "access-control-allow-headers": "authorization,content-type,mcp-session-id",
      },
      body: null,
    };
  }
  if (request.method !== "GET" && request.method !== "POST") {
    return {
      status: 405,
      headers: { allow: "GET,POST,OPTIONS" },
      body: { error: "method_not_allowed" },
    };
  }
  const url = new URL(request.url);
  let body: unknown;
  if (request.method === "POST") {
    try {
      body = await request.json();
    } catch {
      body = null;
    }
  }
  const input: LoopGatewayRequest = {
    method: request.method,
    path: url.pathname,
    headers: requestHeaders(request),
    ...(request.method === "POST" ? { body } : {}),
  };
  const application = new LoopApplication({
    store: new D1LoopTaskEventStore(env.LOOP_DB),
    evidence: new D1R2LoopEvidenceStore(env.LOOP_DB, env.LOOP_EVIDENCE),
  });
  const dispatcher = workflowDispatcherFor(env);
  const githubIssues = githubIssuePublisherFor(env);
  const gatewayOptions = {
    application,
    authenticator: authenticatorFor(env),
    metadata: {
      resource: env.LOOP_RESOURCE_URL ?? `${url.origin}/mcp`,
      resource_metadata: `${url.origin}/.well-known/oauth-protected-resource`,
      authorization_servers: env.AUTH0_ISSUER ? [env.AUTH0_ISSUER] : [],
      scopes_supported: ["loop:read", "loop:plan", "loop:dispatch", "loop:repair", "loop:approve"],
      resource_documentation: env.LOOP_DOCUMENTATION_URL ?? `${url.origin}/docs/mcp`,
    },
    rolloutMode: parseLoopRolloutMode(env.LOOP_ROLLOUT_MODE),
    capacity: providerCapacityReaderFor(env),
    ...(githubIssues ? { githubIssues } : {}),
  } as const;
  const gateway = dispatcher
    ? createLoopGateway({ ...gatewayOptions, dispatcher })
    : createLoopGateway(gatewayOptions);
  return gateway.handle(input);
}

async function gatewayRequestForPrincipal(
  request: Request,
  env: LoopGatewayEnv,
  principal: LoopPrincipal,
): Promise<LoopGatewayResponse> {
  const url = new URL(request.url);
  if (request.method === "POST" && url.pathname === "/mcp") {
    const body = await request.json().catch(() => null);
    const headers = new Headers(request.headers);
    headers.set("content-type", "application/json");
    headers.set("accept", "application/json, text/event-stream");
    if (!headers.has("MCP-Protocol-Version")) headers.set("MCP-Protocol-Version", "2025-03-26");
    const application = new LoopApplication({
      store: new D1LoopTaskEventStore(env.LOOP_DB),
      evidence: new D1R2LoopEvidenceStore(env.LOOP_DB, env.LOOP_EVIDENCE),
    });
    const dispatcher = workflowDispatcherFor(env);
    const githubIssues = githubIssuePublisherFor(env);
    const sdkResponse = await handleLoopSdkMcpRequest(
      new Request(request.url, { method: "POST", headers, body: JSON.stringify(body) }),
      {
        application,
        principal,
        ...(dispatcher ? { dispatcher } : {}),
        rolloutMode: parseLoopRolloutMode(env.LOOP_ROLLOUT_MODE),
        capacity: providerCapacityReaderFor(env),
        resourceMetadata: `${url.origin}/.well-known/oauth-protected-resource`,
        ...(githubIssues ? { githubIssues } : {}),
      },
    );
    const sdkBody = await sdkResponse.json().catch(() => null);
    return {
      status: sdkResponse.status,
      headers: Object.fromEntries(sdkResponse.headers.entries()),
      body: sdkBody,
    };
  }
  const body = request.method === "POST" ? await request.json().catch(() => null) : undefined;
  const application = new LoopApplication({
    store: new D1LoopTaskEventStore(env.LOOP_DB),
    evidence: new D1R2LoopEvidenceStore(env.LOOP_DB, env.LOOP_EVIDENCE),
  });
  const dispatcher = workflowDispatcherFor(env);
  const githubIssues = githubIssuePublisherFor(env);
  const gatewayOptions = {
    application,
    authenticator: {
      async authenticate() {
        return principal;
      },
    },
    metadata: {
      resource: env.LOOP_RESOURCE_URL ?? `${url.origin}/mcp`,
      resource_metadata: `${url.origin}/.well-known/oauth-protected-resource`,
      authorization_servers: env.AUTH0_ISSUER ? [env.AUTH0_ISSUER] : [],
      scopes_supported: ["loop:read", "loop:plan", "loop:dispatch", "loop:repair", "loop:approve"],
      resource_documentation: env.LOOP_DOCUMENTATION_URL ?? `${url.origin}/docs/mcp`,
    },
    rolloutMode: parseLoopRolloutMode(env.LOOP_ROLLOUT_MODE),
    capacity: providerCapacityReaderFor(env),
    ...(githubIssues ? { githubIssues } : {}),
  } as const;
  const gateway = dispatcher
    ? createLoopGateway({ ...gatewayOptions, dispatcher })
    : createLoopGateway(gatewayOptions);
  return gateway.handle({
    method: request.method as "GET" | "POST",
    path: url.pathname,
    headers: Object.fromEntries(request.headers.entries()),
    ...(request.method === "POST" ? { body } : {}),
  });
}

async function repositoryKeyForBody(body: unknown, env: LoopGatewayEnv): Promise<string> {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "global";
  const payload = body as Record<string, unknown>;
  const args = payload.arguments;
  if (args && typeof args === "object" && !Array.isArray(args)) {
    const contract = (args as Record<string, unknown>).contract;
    if (contract && typeof contract === "object" && !Array.isArray(contract)) {
      const repository = (contract as Record<string, unknown>).repository;
      if (repository && typeof repository === "object" && !Array.isArray(repository)) {
        const owner = (repository as Record<string, unknown>).owner;
        const name = (repository as Record<string, unknown>).name;
        if (typeof owner === "string" && typeof name === "string") return `${owner}/${name}`;
      }
    }
    const taskId = (args as Record<string, unknown>).taskId;
    if (typeof taskId === "string") {
      const row = await env.LOOP_DB.prepare(
        "SELECT state_json FROM loop_task_events WHERE task_id = ?1 ORDER BY sequence DESC LIMIT 1",
      )
        .bind(taskId)
        .first<{ state_json: string }>();
      if (row) {
        try {
          const state = JSON.parse(row.state_json) as {
            contract?: { repository?: { owner?: string; name?: string } };
          };
          const owner = state.contract?.repository?.owner;
          const name = state.contract?.repository?.name;
          if (owner && name) return `${owner}/${name}`;
        } catch {
          return "global";
        }
      }
    }
  }
  return "global";
}

async function repositoryKeyForTask(env: LoopGatewayEnv, taskId: string): Promise<string> {
  const row = await env.LOOP_DB.prepare(
    "SELECT state_json FROM loop_task_events WHERE task_id = ?1 ORDER BY sequence DESC LIMIT 1",
  )
    .bind(taskId)
    .first<{ state_json: string }>();
  if (!row) throw new Error("task not found for repository lease");
  const state = JSON.parse(row.state_json) as {
    contract?: { repository?: { owner?: string; name?: string } };
  };
  const owner = state.contract?.repository?.owner;
  const name = state.contract?.repository?.name;
  if (typeof owner !== "string" || typeof name !== "string")
    throw new Error("task repository identity is missing");
  return `${owner}/${name}`;
}

export class RepoCoordinator {
  constructor(
    private readonly state: LoopDurableObjectState,
    private readonly env: LoopGatewayEnv,
  ) {}

  async fetch(request: Request): Promise<Response> {
    return this.state.blockConcurrencyWhile(async () => {
      const envelope = (await request.json()) as {
        body?: unknown;
        principal?: LoopPrincipal;
        op?: string;
        input?: Record<string, unknown>;
      };
      if (envelope.op === "repository-lease") {
        return this.repositoryLease(envelope.input ?? {});
      }
      if (!envelope.principal || !envelope.body)
        return new Response(JSON.stringify({ error: "invalid_coordinator_request" }), {
          status: 400,
          headers: JSON_HEADERS,
        });
      const internal = new Request("https://loop-coordinator/mcp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(envelope.body),
      });
      return responseFromGateway(
        await gatewayRequestForPrincipal(internal, this.env, envelope.principal),
      );
    });
  }

  private async repositoryLease(input: Record<string, unknown>): Promise<Response> {
    const stored =
      (await this.state.storage.get<LoopRepositoryLeaseState>("repository-leases")) ??
      createLoopRepositoryLeaseState();
    const now = typeof input.now === "string" ? input.now : new Date().toISOString();
    try {
      const operation = input.operation;
      const common = {
        leaseId: String(input.leaseId ?? ""),
        taskId: String(input.taskId ?? ""),
        runId: String(input.runId ?? ""),
        generation: Number(input.generation),
        now,
      };
      const transition =
        operation === "acquire"
          ? acquireLoopRepositoryLease(stored, {
              ...common,
              paths: Array.isArray(input.paths) ? input.paths.map(String) : [],
              ...(input.leaseSeconds === undefined
                ? {}
                : { leaseSeconds: Number(input.leaseSeconds) }),
            })
          : operation === "renew"
            ? renewLoopRepositoryLease(stored, {
                ...common,
                ...(input.leaseSeconds === undefined
                  ? {}
                  : { leaseSeconds: Number(input.leaseSeconds) }),
              })
            : operation === "release"
              ? releaseLoopRepositoryLease(stored, common)
              : undefined;
      if (!transition) return capacityResponse({ error: "unsupported_lease_operation" }, 400);
      await this.state.storage.put("repository-leases", transition.state);
      return capacityResponse(
        transition.result,
        transition.result.status === "conflict" ? 409 : 200,
      );
    } catch {
      return capacityResponse({ error: "invalid_repository_lease_request" }, 400);
    }
  }
}

const PROVIDER_CAPACITY_STATE_KEY = "provider-capacity";

function capacityResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

export class ProviderCapacityCoordinator {
  constructor(
    private readonly state: LoopDurableObjectState,
    private readonly env: Readonly<{ LOOP_DEVIN_MAX_CONCURRENT?: string }>,
  ) {}

  async fetch(request: Request): Promise<Response> {
    return this.state.blockConcurrencyWhile(async () => {
      let state =
        (await this.state.storage.get<LoopProviderCapacityState>(PROVIDER_CAPACITY_STATE_KEY)) ??
        createLoopProviderCapacityState(
          this.env.LOOP_DEVIN_MAX_CONCURRENT
            ? { maxConcurrent: this.env.LOOP_DEVIN_MAX_CONCURRENT }
            : {},
        );
      state = configureLoopProviderCapacityState(
        state,
        this.env.LOOP_DEVIN_MAX_CONCURRENT
          ? { maxConcurrent: this.env.LOOP_DEVIN_MAX_CONCURRENT }
          : {},
      );
      if (request.method === "GET") return capacityResponse(state);
      if (request.method !== "POST") return capacityResponse({ error: "method_not_allowed" }, 405);
      const input = (await request.json().catch(() => null)) as Record<string, unknown> | null;
      if (!input || typeof input.op !== "string")
        return capacityResponse({ error: "capacity_operation_required" }, 400);
      const now = typeof input.now === "string" ? input.now : new Date().toISOString();
      try {
        if (input.op === "acquire") {
          if (input.model !== LOOP_DEVIN_MODEL)
            return capacityResponse({ error: "unsupported_provider_model" }, 400);
          const result = acquireLoopProviderSlot(state, {
            taskId: String(input.taskId ?? ""),
            runId: String(input.runId ?? ""),
            generation: Number(input.generation),
            model: LOOP_DEVIN_MODEL,
            now,
            ...(input.leaseSeconds === undefined
              ? {}
              : { leaseSeconds: Number(input.leaseSeconds) }),
          });
          state = result.state;
          await this.state.storage.put(PROVIDER_CAPACITY_STATE_KEY, state);
          return capacityResponse(result.result, result.result.status === "acquired" ? 200 : 409);
        }
        if (input.op === "renew") {
          const result = renewLoopProviderSlot(state, {
            leaseId: String(input.leaseId ?? ""),
            runId: String(input.runId ?? ""),
            generation: Number(input.generation),
            now,
            ...(input.leaseSeconds === undefined
              ? {}
              : { leaseSeconds: Number(input.leaseSeconds) }),
          });
          state = result.state;
          await this.state.storage.put(PROVIDER_CAPACITY_STATE_KEY, state);
          return capacityResponse(
            { status: result.result },
            result.result === "accepted" ? 200 : 409,
          );
        }
        if (input.op === "release") {
          const result = releaseLoopProviderSlot(state, {
            leaseId: String(input.leaseId ?? ""),
            runId: String(input.runId ?? ""),
            generation: Number(input.generation),
            now,
          });
          state = result.state;
          await this.state.storage.put(PROVIDER_CAPACITY_STATE_KEY, state);
          return capacityResponse(
            { status: result.result },
            result.result === "released" ? 200 : 409,
          );
        }
        if (input.op === "cooldown") {
          if (typeof input.until !== "string" || typeof input.reason !== "string")
            return capacityResponse({ error: "cooldown_fields_required" }, 400);
          state = setLoopProviderCooldown(state, {
            until: input.until,
            reason: input.reason as Parameters<typeof setLoopProviderCooldown>[1]["reason"],
          });
          await this.state.storage.put(PROVIDER_CAPACITY_STATE_KEY, state);
          return capacityResponse({ status: "accepted", cooldownUntil: state.cooldownUntil });
        }
        if (input.op === "success") {
          state = recordLoopProviderSuccess(state, { now });
          await this.state.storage.put(PROVIDER_CAPACITY_STATE_KEY, state);
          return capacityResponse({
            status: "accepted",
            admissionLimit: state.admissionLimit,
            maxConcurrent: state.maxConcurrent,
          });
        }
        return capacityResponse({ error: "unsupported_capacity_operation" }, 400);
      } catch {
        return capacityResponse({ error: "invalid_capacity_request" }, 400);
      }
    });
  }
}

type ProviderCapacityAcquireResponse = Readonly<{
  status: "acquired" | "waiting" | "accepted" | "released" | "stale";
  lease?: Readonly<{ leaseId: string; expiresAt: string }>;
  retryAt?: string;
  reason?: "capacity" | "rate_limit" | "quota_exhausted" | "provider_unavailable";
}>;

type RepositoryLeaseResponse = Readonly<{
  status: "acquired" | "renewed" | "released" | "stale" | "conflict";
  lease?: Readonly<{ leaseId: string; expiresAt: string }>;
  conflict?: Readonly<{ retryAt: string; conflictingPaths: readonly string[] }>;
}>;

function providerCapacityStub(env: LoopTaskWorkflowEnv): LoopCapacityStub {
  return env.PROVIDER_CAPACITY.get(env.PROVIDER_CAPACITY.idFromName("devin:SWE-1.7"));
}

function providerCapacityReaderFor(env: LoopGatewayEnv): LoopCapacityReader {
  return {
    async get(): Promise<unknown> {
      const response = await env.PROVIDER_CAPACITY.get(
        env.PROVIDER_CAPACITY.idFromName("devin:SWE-1.7"),
      ).fetch(new Request("https://loop-capacity/", { method: "GET" }));
      if (!response.ok)
        throw new Error(`provider capacity request failed with HTTP ${response.status}`);
      return response.json();
    },
  };
}

async function providerCapacityCall(
  env: LoopTaskWorkflowEnv,
  input: Readonly<Record<string, unknown>>,
): Promise<ProviderCapacityAcquireResponse> {
  const response = await providerCapacityStub(env).fetch(
    new Request("https://loop-capacity/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    }),
  );
  const body = (await response.json().catch(() => null)) as ProviderCapacityAcquireResponse | null;
  if (!response.ok && response.status !== 409)
    throw new Error(`provider capacity request failed with HTTP ${response.status}`);
  if (!body) throw new Error("provider capacity returned an empty response");
  return body;
}

function repositoryCoordinatorStub(
  env: LoopTaskWorkflowEnv,
  repositoryKey: string,
): LoopCoordinatorStub {
  return env.REPO_COORDINATOR.get(env.REPO_COORDINATOR.idFromName(repositoryKey));
}

async function repositoryLeaseCall(
  env: LoopTaskWorkflowEnv,
  repositoryKey: string,
  input: Readonly<Record<string, unknown>>,
): Promise<RepositoryLeaseResponse> {
  const response = await repositoryCoordinatorStub(env, repositoryKey).fetch(
    new Request("https://loop-repository/lease", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ op: "repository-lease", input }),
    }),
  );
  const body = (await response.json().catch(() => null)) as RepositoryLeaseResponse | null;
  if (!response.ok && response.status !== 409)
    throw new Error(`repository lease request failed with HTTP ${response.status}`);
  if (!body) throw new Error("repository lease returned an empty response");
  return body;
}

function taskIdFromEvent(payload: unknown, expectedTaskId: string): void {
  if (!payload || typeof payload !== "object" || Array.isArray(payload))
    throw new Error("workflow event payload must be an object");
  const taskId = (payload as { taskId?: unknown }).taskId;
  if (taskId !== expectedTaskId) throw new Error("workflow event belongs to a different task");
}

export class TaskRunWorkflow extends WorkflowEntrypoint<
  LoopTaskWorkflowEnv,
  LoopTaskWorkflowParams
> {
  async run(event: WorkflowEvent<LoopTaskWorkflowParams>, step: WorkflowStep) {
    const application = new LoopApplication({
      store: new D1LoopTaskEventStore(this.env.LOOP_DB),
      evidence: new D1R2LoopEvidenceStore(this.env.LOOP_DB, this.env.LOOP_EVIDENCE),
    });
    const allocations = new D1LoopBoxAllocationStore(this.env.LOOP_DB);
    const runs = new D1LoopRunStore(this.env.LOOP_DB);
    const runId = event.instanceId;
    const allocationId = `allocation-${encodeURIComponent(event.payload.taskId)}-${encodeURIComponent(runId)}`;
    const deterministicName = `loop-${encodeURIComponent(event.payload.taskId)}-${encodeURIComponent(runId)}`;
    let attempt = 1;
    let generation = 1;
    let cancellationGeneration = 1;
    let providerLeaseId: string | undefined;
    let repositoryLeaseId: string | undefined;
    let boxId: string | undefined;
    let state = await step.do("admit-approved-task", async () => {
      const current = await application.getTask(event.payload.taskId);
      assertLoopWorkflowAllowed(current.contract, parseLoopRolloutMode(this.env.LOOP_ROLLOUT_MODE));
      if (current.phase !== "QUEUED") throw new Error("task is not queued for a new workflow");
      return application.advance(current.taskId, "ALLOCATING", {
        expectedVersion: event.payload.expectedVersion,
      });
    });
    cancellationGeneration = state.cancellationGeneration;
    const repositoryKey = `${state.contract.repository.owner}/${state.contract.repository.name}`;
    const repositoryLeasePaths = state.contract.expectedPaths;
    const repositoryLeaseSeconds = Math.max(
      900,
      Math.min(24 * 60 * 60, state.contract.budget.maximumLifetimeHours * 60 * 60),
    );
    const ensureRepositoryLease = async (label: string): Promise<void> => {
      let wait = 0;
      while (true) {
        const result = await step.do(`${label}-${wait}`, () =>
          repositoryLeaseCall(this.env, repositoryKey, {
            operation: "acquire",
            leaseId: `writer-${event.payload.taskId}-${runId}`,
            taskId: event.payload.taskId,
            runId,
            generation,
            paths: repositoryLeasePaths,
            leaseSeconds: repositoryLeaseSeconds,
            now: new Date().toISOString(),
          }),
        );
        if (result.status === "acquired" || result.status === "renewed") {
          repositoryLeaseId = result.lease?.leaseId;
          if (!repositoryLeaseId) throw new Error("repository lease response omitted lease id");
          return;
        }
        if (result.status !== "conflict") throw new Error("repository lease was not acquired");
        const retryAt = result.conflict?.retryAt;
        if (!retryAt) throw new Error("repository lease conflict omitted retry time");
        await step.sleepUntil(`${label}-wait-${wait}`, Date.parse(retryAt));
        wait += 1;
      }
    };
    const releaseRepositoryLease = async (label: string): Promise<void> => {
      if (!repositoryLeaseId) return;
      const leaseId = repositoryLeaseId;
      await step.do(label, () =>
        repositoryLeaseCall(this.env, repositoryKey, {
          operation: "release",
          leaseId,
          taskId: event.payload.taskId,
          runId,
          generation,
          now: new Date().toISOString(),
        }),
      );
      repositoryLeaseId = undefined;
    };
    await ensureRepositoryLease("acquire-repository-lease");
    await step.do("register-run", async () => {
      const run = await runs.create({
        runId,
        taskId: event.payload.taskId,
        attempt: 1,
        generation: 1,
        cancellationGeneration,
        expectedVersion: event.payload.expectedVersion,
        startedAt: new Date().toISOString(),
      });
      return runs.update(run.runId, {
        status: "waiting_capacity",
        updatedAt: new Date().toISOString(),
      });
    });
    // Allocate the disposable workspace before reserving scarce Devin
    // capacity. A 12-hour box wait must not strand either SWE-1.7 slot.
    await step.do("persist-box-allocation-intent", async () =>
      allocations.putIntent({
        allocationId,
        taskId: event.payload.taskId,
        runId: event.instanceId,
        attempt: 1,
        deterministicName,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      }),
    );
    const boxReady = await step.waitForEvent<LoopBoxReadyEvent>("wait-for-box", {
      type: "box-ready",
      timeout: "12 hours",
    });
    if (boxReady.kind === "cancelled") {
      const cancelled = await step.do("confirm-cancel-before-box", () =>
        application.getTask(event.payload.taskId),
      );
      if (
        cancelled.condition !== "CANCELLED" ||
        boxReady.cancellationGeneration !== cancelled.cancellationGeneration
      )
        throw new Error("cancel event does not match the current task control generation");
      await runs.update(runId, {
        status: "cancelled",
        updatedAt: new Date().toISOString(),
        cancellationGeneration: cancelled.cancellationGeneration,
        providerReason: boxReady.reason ?? "task cancelled",
      });
      await releaseRepositoryLease("release-repository-lease-cancelled-before-box");
      return cancelled;
    }
    boxId = await step.do("record-box-ready", async () => {
      taskIdFromEvent(boxReady, event.payload.taskId);
      if (boxReady.runId !== runId)
        throw new Error("box-ready event does not match the workflow run");
      if (!boxReady.allocationId || !boxReady.boxId)
        throw new Error("box-ready event is missing allocation identity");
      if (boxReady.allocationId !== allocationId)
        throw new Error("box-ready event does not match the allocation intent");
      await allocations.update(allocationId, {
        status: "allocated",
        boxId: boxReady.boxId,
        updatedAt: new Date().toISOString(),
      });
      await runs.update(runId, { status: "preparing", updatedAt: new Date().toISOString() });
      state = await application.advance(state.taskId, "PREPARING", {
        expectedVersion: state.version,
      });
      return boxReady.boxId;
    });

    let repairRounds = 0;
    reviewLoop: while (true) {
      agentLoop: while (true) {
        await ensureRepositoryLease(`ensure-repository-lease-${generation}`);
        const activeTask = await step.do(`check-run-control-${attempt}`, () =>
          application.getTask(event.payload.taskId),
        );
        if (
          activeTask.condition === "CANCELLED" ||
          activeTask.cancellationGeneration !== cancellationGeneration
        ) {
          await runs.update(runId, {
            status: "cancelled",
            updatedAt: new Date().toISOString(),
            clearProviderLease: true,
            cancellationGeneration: activeTask.cancellationGeneration,
          });
          return activeTask;
        }
        let capacityWait = 0;
        while (true) {
          const capacity = await step.do(
            `acquire-provider-capacity-${attempt}-${capacityWait}`,
            async () =>
              providerCapacityCall(this.env, {
                op: "acquire",
                taskId: event.payload.taskId,
                runId,
                generation,
                model: LOOP_DEVIN_MODEL,
                now: new Date().toISOString(),
              }),
          );
          if (capacity.status === "waiting") {
            const retryAt = capacity.retryAt ?? new Date(Date.now() + 60_000).toISOString();
            await step.do(`record-capacity-wait-${attempt}-${capacityWait}`, () =>
              runs.update(runId, {
                status:
                  capacity.reason === "rate_limit" || capacity.reason === "quota_exhausted"
                    ? "waiting_rate_limit"
                    : "waiting_capacity",
                updatedAt: new Date().toISOString(),
                nextAttemptAt: retryAt,
                providerReason: capacity.reason ?? "capacity",
              }),
            );
            await step.sleepUntil(
              `wait-provider-capacity-${attempt}-${capacityWait}`,
              Date.parse(retryAt),
            );
            capacityWait += 1;
            continue;
          }
          const leaseId = capacity.lease?.leaseId;
          if (!leaseId) throw new Error("provider capacity granted a lease without an id");
          providerLeaseId = leaseId;
          await step.do(`record-provider-lease-${attempt}`, () =>
            runs.update(runId, {
              status: "preparing",
              updatedAt: new Date().toISOString(),
              providerLeaseId: leaseId,
              clearNextAttemptAt: true,
              clearProviderReason: true,
            }),
          );
          break;
        }
        state = await step.do(`start-agent-attempt-${generation}`, async () => {
          await runs.update(runId, { status: "executing", updatedAt: new Date().toISOString() });
          if (state.phase === "PREPARING")
            return application.advance(state.taskId, "EXECUTING", {
              expectedVersion: state.version,
            });
          return state;
        });
        const agentOutcome = await step.waitForEvent<LoopAgentOutcomeEvent>(
          `wait-for-agent-${generation}`,
          { type: "agent-outcome", timeout: "12 hours" },
        );
        taskIdFromEvent(agentOutcome, event.payload.taskId);
        if (agentOutcome.kind === "cancelled") {
          if (agentOutcome.cancellationGeneration !== cancellationGeneration)
            throw new Error("cancel event does not match the active cancellation generation");
          const cancelled = await step.do(`confirm-cancel-${generation}`, () =>
            application.getTask(event.payload.taskId),
          );
          if (cancelled.condition !== "CANCELLED")
            throw new Error("cancel event arrived before the task was cancelled");
          if (providerLeaseId)
            await providerCapacityCall(this.env, {
              op: "release",
              leaseId: providerLeaseId,
              runId,
              generation,
              now: new Date().toISOString(),
            });
          await runs.update(runId, {
            status: "cancelled",
            updatedAt: new Date().toISOString(),
            clearProviderLease: true,
            cancellationGeneration: cancelled.cancellationGeneration,
            providerReason: agentOutcome.reason ?? "task cancelled",
          });
          await releaseRepositoryLease(`release-repository-lease-cancelled-${generation}`);
          return cancelled;
        }
        if (
          agentOutcome.runId !== runId ||
          agentOutcome.boxId !== boxId ||
          agentOutcome.generation !== generation ||
          agentOutcome.cancellationGeneration !== cancellationGeneration ||
          agentOutcome.model !== LOOP_DEVIN_MODEL
        )
          throw new Error("agent outcome does not match the active run generation");
        const currentTask = await step.do(`confirm-run-control-${generation}`, () =>
          application.getTask(event.payload.taskId),
        );
        if (
          currentTask.condition === "CANCELLED" ||
          currentTask.cancellationGeneration !== cancellationGeneration
        ) {
          if (providerLeaseId)
            await providerCapacityCall(this.env, {
              op: "release",
              leaseId: providerLeaseId,
              runId,
              generation,
              now: new Date().toISOString(),
            });
          await runs.update(runId, {
            status: "cancelled",
            updatedAt: new Date().toISOString(),
            clearProviderLease: true,
            cancellationGeneration: currentTask.cancellationGeneration,
            providerReason: "task cancelled before agent outcome was accepted",
          });
          await releaseRepositoryLease(
            `release-repository-lease-cancelled-before-result-${generation}`,
          );
          return currentTask;
        }
        if (
          agentOutcome.kind === "rate_limited" ||
          (agentOutcome.kind === "failed" && agentOutcome.retryAt)
        ) {
          const retryAt = agentOutcome.retryAt ?? new Date(Date.now() + 60_000).toISOString();
          const reason =
            agentOutcome.kind === "rate_limited" ? "rate_limited" : "provider_unavailable";
          await step.do(`release-provider-capacity-${generation}`, async () => {
            await providerCapacityCall(this.env, {
              op: "release",
              leaseId: providerLeaseId,
              runId,
              generation,
              now: new Date().toISOString(),
            });
            if (agentOutcome.kind === "rate_limited")
              await providerCapacityCall(this.env, {
                op: "cooldown",
                until: retryAt,
                reason: /quota|usage\s+limit|credit/i.test(agentOutcome.reason ?? "")
                  ? "quota_exhausted"
                  : "rate_limited",
              });
            await runs.update(runId, {
              status: "waiting_rate_limit",
              updatedAt: new Date().toISOString(),
              clearProviderLease: true,
              nextAttemptAt: retryAt,
              providerReason: agentOutcome.reason ?? reason,
              attempt: attempt + 1,
              generation: generation + 1,
            });
          });
          await releaseRepositoryLease(`release-repository-lease-rate-limit-${generation}`);
          attempt += 1;
          generation += 1;
          await step.sleepUntil(`wait-agent-retry-${generation}`, Date.parse(retryAt));
          continue agentLoop;
        }
        if (agentOutcome.kind === "failed") {
          await step.do(`record-agent-failure-${generation}`, async () => {
            if (providerLeaseId)
              await providerCapacityCall(this.env, {
                op: "release",
                leaseId: providerLeaseId,
                runId,
                generation,
                now: new Date().toISOString(),
              });
            await runs.update(runId, {
              status: "failed",
              updatedAt: new Date().toISOString(),
              clearProviderLease: true,
              providerReason: agentOutcome.reason ?? "agent failed",
            });
          });
          await releaseRepositoryLease(`release-repository-lease-failed-${generation}`);
          throw new Error(agentOutcome.reason ?? "agent failed");
        }
        if (!providerLeaseId) throw new Error("completed agent outcome has no provider lease");
        const leaseCheck = await step.do(`confirm-provider-lease-${generation}`, () =>
          providerCapacityCall(this.env, {
            op: "renew",
            leaseId: providerLeaseId,
            runId,
            generation,
            now: new Date().toISOString(),
          }),
        );
        if (leaseCheck.status === "stale") {
          await runs.update(runId, {
            status: "failed",
            updatedAt: new Date().toISOString(),
            clearProviderLease: true,
            providerReason: "provider lease expired before result acceptance",
          });
          throw new Error("provider lease expired before result acceptance");
        }
        const agentResult = agentOutcome;
        if (!agentResult.headSha || !agentResult.gates) {
          await step.do(`record-incomplete-agent-result-${generation}`, async () => {
            if (providerLeaseId)
              await providerCapacityCall(this.env, {
                op: "release",
                leaseId: providerLeaseId,
                runId,
                generation,
                now: new Date().toISOString(),
              });
            await runs.update(runId, {
              status: "failed",
              updatedAt: new Date().toISOString(),
              clearProviderLease: true,
              providerReason: "completed agent outcome is missing publication evidence",
            });
          });
          throw new Error("completed agent outcome is missing publication evidence");
        }
        await step.do(`release-provider-capacity-${generation}`, async () => {
          await providerCapacityCall(this.env, {
            op: "release",
            leaseId: providerLeaseId,
            runId,
            generation,
            now: new Date().toISOString(),
          });
          await providerCapacityCall(this.env, {
            op: "success",
            now: new Date().toISOString(),
          });
          await runs.update(runId, {
            status: "publishing",
            updatedAt: new Date().toISOString(),
            clearProviderLease: true,
          });
        });
        state = await step.do(`record-agent-result-${generation}`, async () => {
          state = await application.advance(state.taskId, "PUBLISHING", {
            expectedVersion: state.version,
          });
          state = await application.setHead(state.taskId, agentResult.headSha!, {
            expectedVersion: state.version,
          });
          if (agentResult.headBranch) {
            state = await application.recordPublication(
              state.taskId,
              {
                headSha: agentResult.headSha!,
                headBranch: agentResult.headBranch,
                ...(agentResult.pullRequestNumber === undefined
                  ? {}
                  : { pullRequestNumber: agentResult.pullRequestNumber }),
                ...(agentResult.pullRequestUrl === undefined
                  ? {}
                  : { pullRequestUrl: agentResult.pullRequestUrl }),
              },
              { expectedVersion: state.version },
            );
          }
          state = await application.advance(state.taskId, "VERIFYING", {
            expectedVersion: state.version,
          });
          for (const gate of agentResult.gates!) {
            state = await application.recordGate(state.taskId, gate, {
              expectedVersion: state.version,
            });
          }
          await runs.update(runId, { status: "verifying", updatedAt: new Date().toISOString() });
          return state;
        });
        await releaseRepositoryLease(`release-repository-lease-published-${generation}`);
        break agentLoop;
      }
      const verification = await step.waitForEvent<LoopVerificationResultEvent>(
        `wait-for-verification-${repairRounds}`,
        {
          type: "verification-result",
          timeout: "7 days",
        },
      );
      state = await step.do(`record-verification-${repairRounds}`, async () => {
        taskIdFromEvent(verification, event.payload.taskId);
        if (verification.runId !== runId)
          throw new Error("verification event does not match the workflow run");
        if (verification.headSha !== state.headSha)
          throw new Error("verification event is bound to a different head SHA");
        const recordedNames = new Set(verification.gates.map((gate) => gate.name));
        if (state.requiredGateNames.some((name) => !recordedNames.has(name)))
          throw new Error("verification result is missing a required gate");
        let verified = state;
        for (const gate of verification.gates) {
          verified = await application.recordGate(verified.taskId, gate, {
            expectedVersion: verified.version,
          });
        }
        verified = await application.advance(verified.taskId, "REVIEWING", {
          expectedVersion: verified.version,
        });
        await runs.update(runId, { status: "reviewing", updatedAt: new Date().toISOString() });
        return verified;
      });
      const review = await step.waitForEvent<LoopReviewResultEvent>(
        `wait-for-review-${repairRounds}`,
        {
          type: "review-result",
          timeout: "7 days",
        },
      );
      await step.do(`mark-run-reviewing-${repairRounds}`, async () =>
        runs.update(runId, { status: "reviewing", updatedAt: new Date().toISOString() }),
      );
      const result = await step.do(`record-review-${repairRounds}`, async () => {
        taskIdFromEvent(review, event.payload.taskId);
        if (review.runId !== runId) throw new Error("review event does not match the workflow run");
        return application.submitReview(state.taskId, review.verdict, review.findings, {
          expectedVersion: state.version,
        });
      });
      state = result;
      const publication = state.publishedChange;
      const githubPublication = githubPublicationFor(this.env);
      if (publication?.pullRequestNumber && state.headSha && githubPublication) {
        const status =
          review.verdict === "approved"
            ? "ready for human review"
            : review.verdict === "changes_requested"
              ? "changes requested"
              : "replan required";
        await step.do(`publish-review-surface-${repairRounds}`, () =>
          githubPublication.updatePullRequestReviewSurface(state.contract, {
            pullRequestNumber: publication.pullRequestNumber!,
            status,
            headSha: state.headSha!,
            gates: Object.values(state.gates),
            findings: review.findings,
            agentDetails: [
              `Review verdict: ${review.verdict}`,
              `Run ID: ${runId}`,
              `Generation: ${generation}`,
            ],
          }),
        );
        if (review.verdict === "approved") {
          await step.do(`mark-pull-request-review-ready-${repairRounds}`, () =>
            githubPublication.markPullRequestReviewReady(state.contract, {
              pullRequestNumber: publication.pullRequestNumber!,
              headSha: state.headSha!,
            }),
          );
        }
      }
      if (review.verdict === "changes_requested") {
        if (repairRounds >= state.contract.budget.maxRepairRounds) {
          await runs.update(runId, {
            status: "failed",
            updatedAt: new Date().toISOString(),
            errorMessage: "review repair budget exhausted",
          });
          return result;
        }
        repairRounds += 1;
        attempt += 1;
        generation += 1;
        await runs.update(runId, {
          status: "repairing",
          updatedAt: new Date().toISOString(),
          attempt,
          generation,
          providerReason: "review requested changes",
        });
        continue reviewLoop;
      }
      if (review.verdict === "replan_required") {
        await runs.update(runId, {
          status: "needs_replan",
          updatedAt: new Date().toISOString(),
          providerReason: "review requires a new approved plan",
        });
        return result;
      }
      await runs.update(runId, {
        status: "awaiting_human",
        updatedAt: new Date().toISOString(),
      });
      return result;
    }
  }
}

async function githubWebhookRequest(
  request: Request,
  env: LoopGatewayEnv,
): Promise<LoopGatewayResponse> {
  if (!env.GITHUB_WEBHOOK_SECRET) {
    return {
      status: 503,
      headers: {},
      body: { error: "webhook_not_configured" },
    };
  }
  const deliveryId = request.headers.get("x-github-delivery");
  if (!deliveryId || !/^[A-Za-z0-9._:-]{1,256}$/.test(deliveryId)) {
    return { status: 400, headers: {}, body: { error: "delivery_id_required" } };
  }
  const contentLength = request.headers.get("content-length");
  if (
    contentLength &&
    (!/^\d+$/.test(contentLength) || Number(contentLength) > LOOP_MAX_WEBHOOK_BODY_BYTES)
  )
    return { status: 413, headers: {}, body: { error: "payload_too_large" } };
  const bodyBytes = await request.arrayBuffer();
  if (bodyBytes.byteLength > LOOP_MAX_WEBHOOK_BODY_BYTES)
    return { status: 413, headers: {}, body: { error: "payload_too_large" } };
  const verified = await verifyGithubWebhookSignatureBytes(
    env.GITHUB_WEBHOOK_SECRET,
    bodyBytes,
    request.headers.get("x-hub-signature-256") ?? undefined,
  );
  if (!verified) return { status: 401, headers: {}, body: { error: "invalid_signature" } };
  const body = new TextDecoder("utf-8", { fatal: true });
  let bodyText: string;
  try {
    bodyText = body.decode(bodyBytes);
  } catch {
    return { status: 400, headers: {}, body: { error: "invalid_utf8" } };
  }
  let payload: unknown;
  try {
    payload = JSON.parse(bodyText);
  } catch {
    return { status: 400, headers: {}, body: { error: "invalid_json" } };
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload))
    return { status: 400, headers: {}, body: { error: "payload_object_required" } };
  const receivedAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const claim = await new D1LoopWebhookDedupStore(env.LOOP_DB).claim({
    deliveryId,
    receivedAt,
    expiresAt,
  });
  if (claim === "duplicate") return { status: 202, headers: {}, body: { status: "duplicate" } };
  await env.LOOP_WEBHOOK_QUEUE.send(
    {
      deliveryId,
      eventName: request.headers.get("x-github-event") ?? "unknown",
      payload,
      receivedAt,
    },
    { contentType: "json" },
  );
  return {
    status: 202,
    headers: {},
    body: {
      status: "accepted",
      deliveryId,
      event: request.headers.get("x-github-event") ?? "unknown",
      payloadType: payload && typeof payload === "object" ? "object" : typeof payload,
    },
  };
}

async function workflowEventRequest(
  request: Request,
  env: LoopGatewayEnv,
): Promise<LoopGatewayResponse> {
  if (!env.LOOP_WORKFLOW_EVENT_SECRET || !env.TASK_RUN_WORKFLOW)
    return { status: 503, headers: {}, body: { error: "workflow_events_not_configured" } };
  if (request.method !== "POST")
    return { status: 405, headers: {}, body: { error: "method_not_allowed" } };
  const body = await request.text();
  if (body.length > 64 * 1024)
    return { status: 413, headers: {}, body: { error: "payload_too_large" } };
  const verified = await verifyGithubWebhookSignature(
    env.LOOP_WORKFLOW_EVENT_SECRET,
    body,
    request.headers.get("x-loop-signature-256") ?? undefined,
  );
  if (!verified) return { status: 401, headers: {}, body: { error: "invalid_signature" } };
  let input: unknown;
  try {
    input = JSON.parse(body);
  } catch {
    return { status: 400, headers: {}, body: { error: "invalid_json" } };
  }
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { status: 400, headers: {}, body: { error: "payload_object_required" } };
  const payload = input as { taskId?: unknown; type?: unknown; payload?: unknown };
  if (typeof payload.taskId !== "string" || payload.taskId.length === 0)
    return { status: 400, headers: {}, body: { error: "task_id_required" } };
  if (
    payload.type !== "box-ready" &&
    payload.type !== "agent-result" &&
    payload.type !== "agent-rate-limited" &&
    payload.type !== "agent-failed" &&
    payload.type !== "review-result" &&
    payload.type !== "verification-result" &&
    payload.type !== "runner-registered" &&
    payload.type !== "runner-heartbeat"
  )
    return { status: 400, headers: {}, body: { error: "unsupported_workflow_event" } };
  if (!payload.payload || typeof payload.payload !== "object" || Array.isArray(payload.payload))
    return { status: 400, headers: {}, body: { error: "event_payload_object_required" } };
  const eventPayload = payload.payload as { taskId?: unknown };
  if (eventPayload.taskId !== payload.taskId)
    return { status: 400, headers: {}, body: { error: "event_task_mismatch" } };
  if (
    [
      "box-ready",
      "agent-result",
      "agent-rate-limited",
      "agent-failed",
      "review-result",
      "verification-result",
    ].includes(payload.type) &&
    typeof (eventPayload as { runId?: unknown }).runId !== "string"
  )
    return { status: 400, headers: {}, body: { error: "run_id_required" } };
  if (payload.type === "runner-registered" || payload.type === "runner-heartbeat") {
    const runner = eventPayload as {
      runId?: unknown;
      boxId?: unknown;
      generation?: unknown;
      cancellationGeneration?: unknown;
      model?: unknown;
      phase?: unknown;
      processAlive?: unknown;
      providerLeaseId?: unknown;
      repositoryLeaseId?: unknown;
    };
    if (
      typeof runner.runId !== "string" ||
      typeof runner.boxId !== "string" ||
      typeof runner.generation !== "number" ||
      !Number.isSafeInteger(runner.cancellationGeneration) ||
      Number(runner.cancellationGeneration) < 1 ||
      runner.model !== "SWE-1.7" ||
      typeof runner.phase !== "string" ||
      typeof runner.processAlive !== "boolean"
    )
      return { status: 400, headers: {}, body: { error: "runner_event_fields_required" } };
    if (runner.providerLeaseId !== undefined && typeof runner.providerLeaseId !== "string")
      return { status: 400, headers: {}, body: { error: "runner_lease_field_invalid" } };
    if (runner.repositoryLeaseId !== undefined && typeof runner.repositoryLeaseId !== "string")
      return { status: 400, headers: {}, body: { error: "repository_lease_field_invalid" } };
    if (runner.repositoryLeaseId) {
      const repositoryKey = await repositoryKeyForTask(env, payload.taskId);
      const renewal = await repositoryLeaseCall(env, repositoryKey, {
        operation: "renew",
        leaseId: runner.repositoryLeaseId,
        taskId: payload.taskId,
        runId: runner.runId,
        generation: runner.generation,
        now: new Date().toISOString(),
      });
      if (renewal.status === "stale")
        return { status: 409, headers: {}, body: { error: "stale_repository_lease" } };
    }
    if (runner.providerLeaseId && payload.type === "runner-heartbeat") {
      const renewal = await providerCapacityCall(env, {
        op: "renew",
        leaseId: runner.providerLeaseId,
        runId: runner.runId,
        generation: runner.generation,
        now: new Date().toISOString(),
      });
      if (renewal.status === "stale")
        return { status: 409, headers: {}, body: { error: "stale_provider_lease" } };
    }
    const store = new D1LoopRunnerRegistrationStore(env.LOOP_DB);
    const timestamp = new Date().toISOString();
    const result =
      payload.type === "runner-registered"
        ? await store.register({
            runId: runner.runId,
            taskId: payload.taskId,
            boxId: runner.boxId,
            generation: runner.generation,
            phase: runner.phase,
            processAlive: runner.processAlive,
            registeredAt: timestamp,
          })
        : await store.heartbeat({
            runId: runner.runId,
            taskId: payload.taskId,
            boxId: runner.boxId,
            generation: runner.generation,
            phase: runner.phase,
            processAlive: runner.processAlive,
            timestamp,
          });
    return {
      status: result === "accepted" ? 202 : 409,
      headers: {},
      body: { status: result, type: payload.type, runId: runner.runId },
    };
  }
  if (payload.type === "box-ready") {
    const boxReady = eventPayload as { runId?: unknown; allocationId?: unknown; boxId?: unknown };
    if (typeof boxReady.allocationId !== "string" || typeof boxReady.boxId !== "string")
      return { status: 400, headers: {}, body: { error: "box_ready_fields_required" } };
  }
  if (
    payload.type === "agent-result" ||
    payload.type === "agent-rate-limited" ||
    payload.type === "agent-failed"
  ) {
    const agent = eventPayload as {
      runId?: unknown;
      boxId?: unknown;
      generation?: unknown;
      cancellationGeneration?: unknown;
      model?: unknown;
      reason?: unknown;
      retryAt?: unknown;
      repositoryLeaseId?: unknown;
      headSha?: unknown;
      gates?: unknown;
      headBranch?: unknown;
      pullRequestNumber?: unknown;
      pullRequestUrl?: unknown;
    };
    if (
      typeof agent.runId !== "string" ||
      typeof agent.boxId !== "string" ||
      typeof agent.generation !== "number" ||
      !Number.isSafeInteger(agent.cancellationGeneration) ||
      Number(agent.cancellationGeneration) < 1 ||
      agent.model !== LOOP_DEVIN_MODEL
    )
      return { status: 400, headers: {}, body: { error: "agent_outcome_fields_required" } };
    if (agent.repositoryLeaseId !== undefined && typeof agent.repositoryLeaseId !== "string")
      return { status: 400, headers: {}, body: { error: "repository_lease_field_invalid" } };
    if (payload.type === "agent-result") {
      if (typeof agent.headSha !== "string" || !Array.isArray(agent.gates))
        return { status: 400, headers: {}, body: { error: "agent_result_evidence_required" } };
      if (agent.headBranch !== undefined && typeof agent.headBranch !== "string")
        return { status: 400, headers: {}, body: { error: "agent_branch_field_invalid" } };
      if (
        agent.pullRequestNumber !== undefined &&
        (typeof agent.pullRequestNumber !== "number" ||
          !Number.isSafeInteger(agent.pullRequestNumber) ||
          agent.pullRequestNumber < 1)
      )
        return { status: 400, headers: {}, body: { error: "agent_pull_request_field_invalid" } };
      if (agent.pullRequestUrl !== undefined && typeof agent.pullRequestUrl !== "string")
        return { status: 400, headers: {}, body: { error: "agent_pull_request_url_invalid" } };
    }
    if (
      payload.type === "agent-rate-limited" &&
      (typeof agent.reason !== "string" || typeof agent.retryAt !== "string")
    )
      return { status: 400, headers: {}, body: { error: "agent_rate_limit_fields_required" } };
    if (payload.type === "agent-failed" && typeof agent.reason !== "string")
      return { status: 400, headers: {}, body: { error: "agent_failure_fields_required" } };
    const kind =
      payload.type === "agent-result"
        ? "complete"
        : payload.type === "agent-rate-limited"
          ? "rate_limited"
          : "failed";
    const workflowId = String((eventPayload as { runId: string }).runId);
    await env.TASK_RUN_WORKFLOW.get(workflowId).then((workflow) =>
      workflow.sendEvent({
        type: "agent-outcome",
        payload: { ...eventPayload, kind },
      }),
    );
    return {
      status: 202,
      headers: {},
      body: { status: "accepted", workflowId, type: "agent-outcome" },
    };
  }
  if (payload.type === "verification-result") {
    const verification = eventPayload as {
      runId?: unknown;
      headSha?: unknown;
      gates?: unknown;
    };
    const validStates = new Set([
      "NOT_REQUIRED",
      "PENDING",
      "RUNNING",
      "PASSED",
      "FAILED",
      "STALE",
      "WAIVED",
      "ERROR",
    ]);
    if (
      typeof verification.runId !== "string" ||
      typeof verification.headSha !== "string" ||
      !Array.isArray(verification.gates) ||
      verification.gates.length === 0
    )
      return { status: 400, headers: {}, body: { error: "verification_result_fields_required" } };
    const validGates = verification.gates.every((entry) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) return false;
      const gate = entry as Record<string, unknown>;
      return (
        typeof gate.name === "string" &&
        typeof gate.state === "string" &&
        validStates.has(gate.state) &&
        typeof gate.taskRevision === "number" &&
        Number.isSafeInteger(gate.taskRevision) &&
        typeof gate.contractHash === "string" &&
        typeof gate.baseSha === "string" &&
        typeof gate.headSha === "string" &&
        typeof gate.updatedAt === "string"
      );
    });
    if (!validGates)
      return { status: 400, headers: {}, body: { error: "verification_gate_invalid" } };
    const workflowId = verification.runId;
    await env.TASK_RUN_WORKFLOW.get(workflowId).then((workflow) =>
      workflow.sendEvent({ type: "verification-result", payload: eventPayload }),
    );
    return {
      status: 202,
      headers: {},
      body: { status: "accepted", workflowId, type: "verification-result" },
    };
  }
  const workflowId = String((eventPayload as { runId: string }).runId);
  const workflow = await env.TASK_RUN_WORKFLOW.get(workflowId);
  await workflow.sendEvent({ type: payload.type, payload: payload.payload });
  return {
    status: 202,
    headers: {},
    body: { status: "accepted", workflowId, type: payload.type },
  };
}

function githubIssueFromWebhook(payload: unknown):
  | Readonly<{
      action: string;
      owner: string;
      repository: string;
      issue: Parameters<typeof parseLoopGitHubIssue>[0];
    }>
  | undefined {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return undefined;
  const value = payload as Record<string, unknown>;
  if (typeof value.action !== "string") return undefined;
  const repository = value.repository;
  const issue = value.issue;
  if (!repository || typeof repository !== "object" || Array.isArray(repository)) return undefined;
  if (!issue || typeof issue !== "object" || Array.isArray(issue)) return undefined;
  const repositoryValue = repository as Record<string, unknown>;
  const issueValue = issue as Record<string, unknown>;
  const ownerValue = repositoryValue.owner;
  const owner =
    ownerValue && typeof ownerValue === "object" && !Array.isArray(ownerValue)
      ? (ownerValue as Record<string, unknown>).login
      : undefined;
  if (typeof owner !== "string" || typeof repositoryValue.name !== "string") return undefined;
  if (
    typeof issueValue.number !== "number" ||
    !Number.isSafeInteger(issueValue.number) ||
    typeof issueValue.title !== "string" ||
    (issueValue.body !== null && typeof issueValue.body !== "string") ||
    (issueValue.state !== "open" && issueValue.state !== "closed") ||
    !Array.isArray(issueValue.labels)
  )
    return undefined;
  const labels = issueValue.labels.filter((label): label is Readonly<{ name?: string }> =>
    Boolean(label && typeof label === "object" && !Array.isArray(label)),
  );
  return {
    action: value.action,
    owner,
    repository: repositoryValue.name,
    issue: {
      number: issueValue.number,
      title: issueValue.title,
      body: issueValue.body,
      state: issueValue.state,
      labels,
    },
  };
}

async function processGitHubWebhookEvent(
  body: LoopWebhookQueueBody,
  env: LoopGatewayEnv,
): Promise<void> {
  if (body.eventName === "issue_comment") {
    await processGitHubCommandEvent(body, env);
    return;
  }
  if (body.eventName !== "issues") return;
  const issue = githubIssueFromWebhook(body.payload);
  if (!issue || !["opened", "edited", "labeled", "reopened"].includes(issue.action)) return;
  const intake = parseLoopGitHubIssue(issue.issue);
  if (!intake.ready || !intake.contract) return;
  if (intake.diagnostics.some((diagnostic) => diagnostic.severity === "error")) return;
  if (
    intake.contract.repository.owner !== issue.owner ||
    intake.contract.repository.name !== issue.repository
  )
    return;
  const application = new LoopApplication({
    store: new D1LoopTaskEventStore(env.LOOP_DB),
    evidence: new D1R2LoopEvidenceStore(env.LOOP_DB, env.LOOP_EVIDENCE),
  });
  await application.createDraft(intake.contract, {
    idempotencyKey: `github-issue:${issue.owner}/${issue.repository}#${intake.issueNumber}:revision-${intake.contract.identity.revision}`,
  });
  await env.LOOP_DB.prepare(
    "INSERT INTO loop_github_task_links (owner, repository, issue_number, task_id, updated_at) VALUES (?1, ?2, ?3, ?4, ?5) ON CONFLICT(owner, repository, issue_number) DO UPDATE SET task_id = excluded.task_id, updated_at = excluded.updated_at",
  )
    .bind(
      issue.owner,
      issue.repository,
      intake.issueNumber,
      intake.contract.identity.taskId,
      new Date().toISOString(),
    )
    .run();
}

type GitHubCommentEvent = Readonly<{
  action?: unknown;
  issue?: unknown;
  comment?: unknown;
  repository?: unknown;
  sender?: unknown;
}>;

function recordObject(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function githubCommentEvent(value: unknown):
  | Readonly<{
      owner: string;
      repository: string;
      issueNumber: number;
      commentBody: string | null;
      actor: string;
    }>
  | undefined {
  const root = recordObject(value);
  const repository = recordObject(root?.repository);
  const issue = recordObject(root?.issue);
  const comment = recordObject(root?.comment);
  const sender = recordObject(root?.sender);
  const fullName = typeof repository?.full_name === "string" ? repository.full_name : "";
  const slash = fullName.indexOf("/");
  const issueNumber = issue?.number;
  const actor = sender?.login;
  if (
    slash <= 0 ||
    slash === fullName.length - 1 ||
    typeof issueNumber !== "number" ||
    !Number.isSafeInteger(issueNumber) ||
    issueNumber < 1 ||
    typeof actor !== "string" ||
    actor.length === 0 ||
    (comment?.body !== null && typeof comment?.body !== "string")
  )
    return undefined;
  return {
    owner: fullName.slice(0, slash),
    repository: fullName.slice(slash + 1),
    issueNumber,
    commentBody: (comment?.body as string | null | undefined) ?? null,
    actor,
  };
}

async function processGitHubCommandEvent(
  body: LoopWebhookQueueBody,
  env: LoopGatewayEnv,
): Promise<void> {
  const event = githubCommentEvent(body.payload);
  const command = parseLoopGitHubCommand(event?.commentBody ?? null);
  if (!event || !command) return;
  const receivedAt = body.receivedAt;
  const now = new Date().toISOString();
  const link = await env.LOOP_DB.prepare(
    "SELECT task_id FROM loop_github_task_links WHERE owner = ?1 AND repository = ?2 AND issue_number = ?3",
  )
    .bind(event.owner, event.repository, event.issueNumber)
    .first<{ task_id: string }>();
  const taskId = link?.task_id ?? null;
  const configuredActor = env.LOOP_ALLOWED_GITHUB_ACTOR;
  let status = "ignored";
  let reason: string | null = null;
  if (!taskId) reason = "no Loop task is linked to this GitHub issue";
  else if (!configuredActor || event.actor !== configuredActor) {
    reason = "GitHub actor is not on the Loop command allowlist";
    status = "rejected";
  } else {
    const application = new LoopApplication({
      store: new D1LoopTaskEventStore(env.LOOP_DB),
      evidence: new D1R2LoopEvidenceStore(env.LOOP_DB, env.LOOP_EVIDENCE),
    });
    try {
      const task = await application.getTask(taskId);
      if (
        task.contract.repository.owner !== event.owner ||
        task.contract.repository.name !== event.repository
      ) {
        throw new Error("GitHub command repository does not match the linked Loop task");
      }
      const actorSubject = `github:${event.actor}`;
      switch (command.command) {
        case "dispatch": {
          const policy = loopDispatchPolicy(
            task.contract,
            parseLoopRolloutMode(env.LOOP_ROLLOUT_MODE),
          );
          if (!policy.explicitStartAllowed) throw new Error(policy.reason);
          if (task.phase !== "QUEUED") throw new Error(`task is not queued: ${task.phase}`);
          const dispatcher = workflowDispatcherFor(env);
          if (!dispatcher) throw new Error("workflow dispatcher is not configured");
          await dispatcher.start({ taskId, expectedVersion: task.version });
          status = "accepted";
          break;
        }
        case "stop": {
          const cancelled = await application.cancel(
            taskId,
            command.arguments || "stopped by GitHub operator",
            {
              expectedVersion: task.version,
              actorSubject,
            },
          );
          await workflowDispatcherFor(env)?.signal?.({
            taskId,
            type: "cancelled",
            cancellationGeneration: cancelled.cancellationGeneration,
            reason: command.arguments || "stopped by GitHub operator",
          });
          status = "accepted";
          break;
        }
        case "resume":
          await application.resume(taskId, { expectedVersion: task.version, actorSubject });
          status = "accepted";
          break;
        case "retry":
          await application.requestRepair(
            taskId,
            command.arguments || "retry requested by GitHub operator",
            {
              expectedVersion: task.version,
              actorSubject,
            },
          );
          status = "accepted";
          break;
        default:
          status = "recorded";
          break;
      }
    } catch (error) {
      status = "rejected";
      reason = error instanceof Error ? error.message : "GitHub command failed";
    }
  }
  await env.LOOP_DB.prepare(
    "INSERT OR IGNORE INTO loop_github_commands (delivery_id, owner, repository, issue_number, task_id, actor, command, arguments, status, reason, received_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)",
  )
    .bind(
      body.deliveryId,
      event.owner,
      event.repository,
      event.issueNumber,
      taskId,
      event.actor,
      command.command,
      command.arguments,
      status,
      reason,
      receivedAt,
      now,
    )
    .run();
}

export default {
  async fetch(request: Request, env: LoopGatewayEnv): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === "GET" && (url.pathname === "/healthz" || url.pathname === "/health")) {
      return new Response(
        JSON.stringify({
          status: "ok",
          service: "loop-gateway",
          rolloutMode: parseLoopRolloutMode(env.LOOP_ROLLOUT_MODE),
          time: new Date().toISOString(),
        }),
        { status: 200, headers: { "content-type": "application/json; charset=utf-8" } },
      );
    }
    if (url.pathname === "/workflow-events") {
      return responseFromGateway(await workflowEventRequest(request, env));
    }
    if (request.method === "POST" && url.pathname === "/webhooks/github") {
      return responseFromGateway(await githubWebhookRequest(request, env));
    }
    if (
      request.method === "POST" &&
      (url.pathname === "/mcp" || url.pathname.startsWith("/v1/tools/"))
    ) {
      const principal = await authenticatorFor(env).authenticate(requestHeaders(request));
      if (principal) {
        const body = await request
          .clone()
          .json()
          .catch(() => null);
        const repositoryKey = await repositoryKeyForBody(body, env);
        const coordinator = env.REPO_COORDINATOR.get(
          env.REPO_COORDINATOR.idFromName(repositoryKey),
        );
        return coordinator.fetch(
          new Request("https://repo-coordinator/dispatch", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ body, principal }),
          }),
        );
      }
    }
    return responseFromGateway(await gatewayRequest(request, env));
  },
  async queue(batch: LoopWebhookBatch, env: LoopGatewayEnv): Promise<void> {
    for (const message of batch.messages) {
      try {
        await env.LOOP_DB.prepare(
          "INSERT OR IGNORE INTO loop_webhook_events (delivery_id, event_name, payload_json, received_at, processed_at) VALUES (?1, ?2, ?3, ?4, ?5)",
        )
          .bind(
            message.body.deliveryId,
            message.body.eventName,
            JSON.stringify(message.body.payload),
            message.body.receivedAt,
            new Date().toISOString(),
          )
          .run();
        await processGitHubWebhookEvent(message.body, env);
        await env.LOOP_DB.prepare(
          "UPDATE loop_webhook_events SET processed_at = ?2 WHERE delivery_id = ?1",
        )
          .bind(message.body.deliveryId, new Date().toISOString())
          .run();
        message.ack();
      } catch {
        message.retry({ delaySeconds: 60 });
      }
    }
  },
  async scheduled(_event: LoopScheduledEvent, env: LoopGatewayEnv): Promise<void> {
    const now = new Date().toISOString();
    const rolloutMode = parseLoopRolloutMode(env.LOOP_ROLLOUT_MODE);
    const dispatcher = workflowDispatcherFor(env);
    const application = new LoopApplication({
      store: new D1LoopTaskEventStore(env.LOOP_DB),
      evidence: new D1R2LoopEvidenceStore(env.LOOP_DB, env.LOOP_EVIDENCE),
    });
    if (dispatcher && rolloutMode !== "shadow") {
      const tasks = await application.listTasks();
      await Promise.allSettled(
        tasks
          .filter((task) => task.phase === "QUEUED")
          .filter((task) => loopDispatchPolicy(task.contract, rolloutMode).automaticOnApproval)
          .slice(0, LOOP_AUTO_DISPATCH_LIMIT)
          .map((task) => dispatcher.start({ taskId: task.taskId, expectedVersion: task.version })),
      );
    }
    const runs = new D1LoopRunStore(env.LOOP_DB);
    const runners = new D1LoopRunnerRegistrationStore(env.LOOP_DB);
    const allocations = new D1LoopBoxAllocationStore(env.LOOP_DB);
    const snapshot = {
      tasks: await application.listTasks(),
      runs: await runs.list(),
      runners: await runners.list(),
      allocations: await allocations.list(),
    };
    if (dispatcher) {
      const healing = planLoopSelfHealing({
        now,
        ...snapshot,
        rolloutMode,
        maxActions: LOOP_AUTO_DISPATCH_LIMIT,
      });
      if (!healing.observedOnly) {
        await Promise.allSettled(
          healing.actions.map(async (action) => {
            if (action.action === "retry") {
              const recovered = await application.recover(action.taskId, action.reason, {
                expectedVersion: action.expectedVersion,
                idempotencyKey: `recovery:${action.runId}`,
              });
              await dispatcher.start({ taskId: action.taskId, expectedVersion: recovered.version });
              return;
            }
            await application.escalate(action.taskId, action.reason, {
              expectedVersion: action.expectedVersion,
              idempotencyKey: `escalation:${action.runId}`,
            });
          }),
        );
      }
    }
    const runtimePlan = await reconcileLoopRuntime({ now, runs, runners, allocations });
    await Promise.all([
      new D1LoopWebhookDedupStore(env.LOOP_DB).expire(now),
      new D1R2LoopEvidenceStore(env.LOOP_DB, env.LOOP_EVIDENCE).expire(now),
      Promise.resolve(runtimePlan),
    ]);
  },
};
