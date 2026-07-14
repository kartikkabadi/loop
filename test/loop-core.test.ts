import assert from "node:assert/strict";
import { createHmac, createSign, generateKeyPairSync } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import {
  InMemoryLoopTaskEventStore,
  InMemoryLoopEvidenceStore,
  JsonlLoopTaskEventStore,
  LoopApplication,
  LoopExecutionCoordinator,
  LoopToolAuthorizationError,
  createLoopToolRouter,
  createLoopGateway,
  handleLoopMcpMessage,
  handleLoopSdkMcpRequest,
  sha256Hex,
  InMemoryLoopWebhookDedupStore,
  verifyGithubWebhookSignature,
  verifyGithubWebhookSignatureBytes,
  GitHubLoopPublicationAdapter,
  createLoopGitHubAppClient,
  InMemoryLoopBoxAllocationStore,
  LoopBoxAllocationError,
  LoopBoxAllocator,
  createCrabboxLoopBoxClient,
  decideLoopRepair,
  InMemoryLoopRunStore,
  InMemoryLoopRunCheckpointStore,
  InMemoryLoopProviderCapacityCoordinator,
  InMemoryLoopRunnerRegistrationStore,
  planLoopReconciliation,
  parseLoopGitHubCommand,
  parseLoopGitHubIssue,
  renderLoopContractBlock,
  GitHubLoopIssuePublisher,
  renderLoopStatusComment,
  type LoopGitHubClient,
  type LoopTaskContract,
  type LoopTaskState,
  validateLoopTaskContract,
  assertLoopWorkflowAllowed,
  loopDispatchPolicy,
  parseLoopRolloutMode,
  acquireLoopRepositoryLease,
  createLoopRepositoryLeaseState,
  normalizeLoopLeasePath,
  releaseLoopRepositoryLease,
  renewLoopRepositoryLease,
  planLoopSelfHealing,
  Auth0LoopAuthenticator,
} from "../dist/loop/index.js";
import {
  LoopRunner,
  LOOP_DEVIN_MODEL,
  normalizeLoopDevinArgs,
  readLoopRunnerCheckpoint,
} from "../dist/loop-runner/index.js";
import { createLoopRunnerPublisher } from "../dist/loop-runner/publication.js";

function contract(overrides: Partial<LoopTaskContract> = {}): LoopTaskContract {
  return {
    version: 1,
    identity: {
      taskId: "loop_test_1",
      project: "loop",
      title: "Add a bounded task flow",
      revision: 1,
    },
    repository: {
      owner: "example",
      name: "repo",
      baseBranch: "main",
      baseSha: "abc1234",
      mode: "owned",
    },
    problem: {
      statement: "The task lifecycle is not represented durably.",
      desiredOutcome: "Operators can advance a task through verified review.",
    },
    authority: { documents: ["VISION.md"] },
    context: {
      decisions: ["Keep automatic merge disabled."],
      openQuestions: [],
      relevantPaths: ["src/loop/**"],
    },
    scope: { include: ["task lifecycle", "state persistence"], exclude: ["automatic merge"] },
    constraints: { required: ["exact SHA binding"], forbidden: ["arbitrary shell"] },
    expectedPaths: ["src/loop/**", "test/loop-core.test.ts"],
    forbiddenPaths: [".github/workflows/**"],
    acceptanceCriteria: [
      {
        id: "AC-1",
        statement: "A valid task advances from approval to review with durable state.",
        proof: ["unit_test", "integration_test"],
      },
      {
        id: "AC-2",
        statement: "A changed head marks previously passing gates stale.",
        proof: ["unit_test"],
      },
    ],
    risk: { declared: "R3", reasons: ["cross-cutting state lifecycle"] },
    verification: { profile: "feature", runtimeFlows: ["approved-task"] },
    rollback: { strategy: "Stop the task and retain its event log for inspection." },
    budget: {
      maxBoxSeconds: 60,
      maxBuilderAttempts: 1,
      maxRepairRounds: 1,
      maxVerifierAttempts: 1,
      maximumLifetimeHours: 1,
    },
    approval: { solReview: true, humanAcceptance: true, automaticMerge: false },
    ...overrides,
  };
}

async function advanceToReview(app: LoopApplication, taskId: string): Promise<LoopTaskState> {
  let state = (await app.validate(taskId)).state;
  state = await app.approve(taskId, { expectedVersion: state.version });
  for (const phase of [
    "ALLOCATING",
    "PREPARING",
    "EXECUTING",
    "PUBLISHING",
    "VERIFYING",
    "REVIEWING",
  ] as const) {
    state = await app.advance(taskId, phase, { expectedVersion: state.version });
  }
  return state;
}

test("contract linter rejects subjective acceptance criteria and low risk floors", () => {
  const result = validateLoopTaskContract(
    contract({
      acceptanceCriteria: [
        { id: "AC-1", statement: "The feature works properly.", proof: ["review"] },
      ],
      problem: {
        statement: "Add authentication permissions.",
        desiredOutcome: "The feature works properly.",
      },
      risk: { declared: "R1", reasons: ["authentication"] },
    }),
  );
  assert.equal(result.ok, false);
  assert.ok(result.diagnostics.some((entry) => entry.code === "E_SUBJECTIVE_ACCEPTANCE"));
  assert.ok(result.diagnostics.some((entry) => entry.code === "E_RISK_BELOW_FLOOR"));
});

test("drafts can be created before validation and retain actionable diagnostics", async () => {
  const app = new LoopApplication();
  const draft = await app.createDraft(
    contract({
      identity: {
        taskId: "loop_invalid_draft",
        project: "loop",
        title: "Needs validation",
        revision: 1,
      },
      acceptanceCriteria: [{ id: "AC-1", statement: "It works properly.", proof: [] }],
    }),
  );
  const result = await app.validate(draft.taskId);
  assert.equal(result.ok, false);
  assert.equal(result.state.phase, "DRAFT");
  assert.equal(result.state.condition, "BLOCKED");
  assert.ok(result.diagnostics.some((entry) => entry.code === "E_SUBJECTIVE_ACCEPTANCE"));
});

test("application drives an approved task to human acceptance and completion", async () => {
  const app = new LoopApplication({
    store: new InMemoryLoopTaskEventStore(),
    now: () => "2026-07-13T00:00:00.000Z",
  });
  const created = await app.createDraft(contract());
  assert.equal(created.phase, "DRAFT");
  const reviewing = await advanceToReview(app, created.taskId);
  const withHead = await app.setHead(created.taskId, "def5678", {
    expectedVersion: reviewing.version,
  });
  const withPublication = await app.recordPublication(
    created.taskId,
    {
      headSha: "def5678",
      headBranch: "loop/loop_test_1-bounded-task-flow",
      pullRequestNumber: 17,
      pullRequestUrl: "https://github.com/example/repo/pull/17",
    },
    { expectedVersion: withHead.version },
  );
  assert.equal(withPublication.publishedChange?.pullRequestNumber, 17);
  const withGate = await app.recordGate(
    created.taskId,
    {
      name: "local-validation",
      state: "PASSED",
      taskRevision: 1,
      contractHash: withHead.contractHash,
      baseSha: "abc1234",
      headSha: "def5678",
      summary: "unit and integration checks passed",
      updatedAt: "2026-07-13T00:00:00.000Z",
    },
    { expectedVersion: withPublication.version },
  );
  const withSecondGate = await app.recordGate(
    created.taskId,
    {
      ...withGate.gates["local-validation"]!,
      name: "AC-1",
    },
    { expectedVersion: withGate.version },
  );
  const withAllGates = await app.recordGate(
    created.taskId,
    {
      ...withGate.gates["local-validation"]!,
      name: "AC-2",
    },
    { expectedVersion: withSecondGate.version },
  );
  const accepted = await app.submitReview(created.taskId, "approved", [], {
    expectedVersion: withAllGates.version,
  });
  assert.equal(accepted.phase, "HUMAN_ACCEPTANCE");
  const mergeReady = await app.approveCompletion(created.taskId, {
    expectedVersion: accepted.version,
  });
  assert.equal(mergeReady.phase, "MERGE_READY");
  const completed = await app.completeTask(created.taskId, { expectedVersion: mergeReady.version });
  assert.equal(completed.phase, "COMPLETE");
  assert.equal((await app.getReviewPacket(created.taskId)).headSha, "def5678");
});

test("durable actor attribution blocks the approving actor from reviewing its own task", async () => {
  const app = new LoopApplication();
  const created = await app.createDraft(
    contract({
      identity: { taskId: "loop_actor_guard", project: "loop", title: "Actor guard", revision: 1 },
    }),
    { actorSubject: "operator-a" },
  );
  const validated = await app.validate(created.taskId, {
    expectedVersion: created.version,
    actorSubject: "operator-a",
  });
  let state = await app.approve(created.taskId, {
    expectedVersion: validated.state.version,
    actorSubject: "operator-a",
  });
  for (const phase of [
    "ALLOCATING",
    "PREPARING",
    "EXECUTING",
    "PUBLISHING",
    "VERIFYING",
    "REVIEWING",
  ] as const) {
    state = await app.advance(state.taskId, phase, {
      expectedVersion: state.version,
      actorSubject: "operator-a",
    });
  }
  await assert.rejects(
    () =>
      app.submitReview(state.taskId, "approved", [], {
        expectedVersion: state.version,
        actorSubject: "operator-a",
      }),
    /approving actor cannot submit/,
  );
  assert.equal(state.actors.approvedBy, "operator-a");
  await assert.rejects(
    () =>
      app.submitReview(state.taskId, "approved", [], {
        expectedVersion: state.version,
        actorSubject: "reviewer-b",
      }),
    /approved review requires every required gate to pass/,
  );
});

test("changing the head invalidates a passing gate and rejects stale gate writes", async () => {
  const app = new LoopApplication();
  const created = await app.createDraft(
    contract({
      identity: { taskId: "loop_test_2", project: "loop", title: "Stale proof", revision: 1 },
    }),
  );
  const reviewing = await advanceToReview(app, created.taskId);
  const withHead = await app.setHead(created.taskId, "def5678", {
    expectedVersion: reviewing.version,
  });
  const gated = await app.recordGate(
    created.taskId,
    {
      name: "checks",
      state: "PASSED",
      taskRevision: 1,
      contractHash: withHead.contractHash,
      baseSha: "abc1234",
      headSha: "def5678",
      updatedAt: new Date().toISOString(),
    },
    { expectedVersion: withHead.version },
  );
  const changed = await app.setHead(created.taskId, "fed7654", { expectedVersion: gated.version });
  assert.equal(changed.gates.checks?.state, "STALE");
  await assert.rejects(
    () =>
      app.recordGate(
        created.taskId,
        {
          ...gated.gates.checks!,
          state: "PASSED",
        },
        { expectedVersion: changed.version },
      ),
    /stale repository SHAs/,
  );
});

test("pause and cancel advance the control generation for stale runner fencing", async () => {
  const app = new LoopApplication();
  const created = await app.createDraft(
    contract({
      identity: {
        taskId: "loop_control_generation",
        project: "loop",
        title: "Fence control",
        revision: 1,
      },
    }),
  );
  const validated = (await app.validate(created.taskId)).state;
  const approved = await app.approve(created.taskId, { expectedVersion: validated.version });
  const paused = await app.pause(created.taskId, { expectedVersion: approved.version });
  assert.equal(paused.condition, "PAUSED");
  assert.equal(paused.cancellationGeneration, 2);
  const resumed = await app.resume(created.taskId, { expectedVersion: paused.version });
  const cancelled = await app.cancel(created.taskId, "operator stop", {
    expectedVersion: resumed.version,
  });
  assert.equal(cancelled.condition, "CANCELLED");
  assert.equal(cancelled.cancellationGeneration, 3);
});

test("JSONL event store reconstructs durable state", async () => {
  const directory = mkdtempSync(join(tmpdir(), "loop-events-"));
  const path = join(directory, "events.jsonl");
  try {
    const first = new LoopApplication({ store: new JsonlLoopTaskEventStore(path) });
    const created = await first.createDraft(
      contract({
        identity: { taskId: "loop_test_3", project: "loop", title: "Persist me", revision: 1 },
      }),
    );
    await first.validate(created.taskId);
    assert.equal(readFileSync(path, "utf8").trim().split("\n").length, 2);
    const second = new LoopApplication({ store: new JsonlLoopTaskEventStore(path) });
    assert.equal((await second.getTask(created.taskId)).phase, "AWAITING_APPROVAL");
    assert.deepEqual(
      (await second.listTasks()).map((state) => state.taskId),
      [created.taskId],
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("intent tool router enforces scopes and exposes no raw execution tool", async () => {
  const app = new LoopApplication();
  const router = createLoopToolRouter(app, {
    subject: "operator-1",
    scopes: ["loop:read", "loop:plan"],
  });
  const created = await router.invoke({
    name: "loop.tasks.create_draft",
    arguments: {
      contract: contract({
        identity: { taskId: "loop_tool_1", project: "loop", title: "Tool task", revision: 1 },
      }),
    },
    idempotencyKey: "create-tool-task",
  });
  assert.equal((created.value as LoopTaskState).taskId, "loop_tool_1");
  const workday = await router.invoke({ name: "loop.workday.get", arguments: {} });
  assert.match((workday.value as { humanSummary: string }).humanSummary, /Loop workday: 1 task\./);
  await assert.rejects(
    () => router.invoke({ name: "loop.tasks.approve", arguments: { taskId: "loop_tool_1" } }),
    LoopToolAuthorizationError,
  );
  await assert.rejects(
    () => router.invoke({ name: "execute_arbitrary_shell", arguments: {} }),
    /unknown Loop tool/,
  );
});

test("write idempotency returns the original result without advancing state twice", async () => {
  const app = new LoopApplication();
  const created = await app.createDraft(
    contract({
      identity: {
        taskId: "loop_idempotent",
        project: "loop",
        title: "Idempotent task",
        revision: 1,
      },
    }),
  );
  const validated = await app.validate(created.taskId, { idempotencyKey: "validate-once" });
  const replay = await app.validate(created.taskId, {
    expectedVersion: 0,
    idempotencyKey: "validate-once",
  });
  assert.deepEqual(replay.state, validated.state);
  assert.equal((await app.getTask(created.taskId)).version, validated.state.version);
});

test("gateway exposes protected-resource metadata and delegates authenticated intent calls", async () => {
  const app = new LoopApplication();
  const gateway = createLoopGateway({
    application: app,
    authenticator: {
      async authenticate() {
        return { subject: "operator-1", scopes: ["loop:read", "loop:plan"] };
      },
    },
    metadata: {
      resource: "https://mcp.loop.example/mcp",
      authorization_servers: ["https://auth.example"],
      scopes_supported: ["loop:read", "loop:plan"],
      resource_documentation: "https://loop.example/docs/mcp",
    },
  });
  const metadata = await gateway.handle({
    method: "GET",
    path: "/.well-known/oauth-protected-resource",
    headers: {},
  });
  assert.equal(metadata.status, 200);
  const created = await gateway.handle({
    method: "POST",
    path: "/mcp",
    headers: { authorization: "Bearer opaque-to-gateway" },
    body: {
      name: "loop.tasks.create_draft",
      arguments: {
        contract: contract({
          identity: {
            taskId: "loop_gateway_1",
            project: "loop",
            title: "Gateway task",
            revision: 1,
          },
        }),
      },
    },
  });
  assert.equal(created.status, 200);
  const listed = await gateway.handle({
    method: "POST",
    path: "/mcp",
    headers: {},
    body: { name: "loop.tasks.list", arguments: {} },
  });
  assert.equal(listed.status, 200);
  const restListed = await gateway.handle({
    method: "POST",
    path: "/v1/tools/loop.tasks.list",
    headers: { authorization: "Bearer opaque-to-gateway" },
    body: { arguments: {} },
  });
  assert.equal(restListed.status, 200);
  const documentation = await gateway.handle({
    method: "GET",
    path: "/docs/mcp",
    headers: {},
  });
  assert.equal(documentation.status, 200);
  assert.equal(
    (documentation.body as { restEndpoint: string }).restEndpoint,
    "/v1/tools/{tool-name}",
  );

  const deniedGateway = createLoopGateway({
    application: app,
    authenticator: {
      async authenticate() {
        return null;
      },
    },
    metadata: {
      resource: "https://mcp.loop.example/mcp",
      resource_metadata: "https://mcp.loop.example/.well-known/oauth-protected-resource",
      authorization_servers: ["https://auth.example"],
      scopes_supported: ["loop:read"],
      resource_documentation: "https://loop.example/docs/mcp",
    },
  });
  const denied = await deniedGateway.handle({
    method: "POST",
    path: "/mcp",
    headers: {},
    body: { jsonrpc: "2.0", id: 1, method: "initialize" },
  });
  assert.equal(denied.status, 401);
  assert.match(denied.headers["www-authenticate"] ?? "", /resource_metadata=/);
});

test("control-plane boundary validates principals, bounds inputs, and redacts failures", async () => {
  const app = new LoopApplication();
  assert.throws(
    () => createLoopToolRouter(app, { subject: "", scopes: ["loop:read"] }),
    /invalid authenticated principal/,
  );
  await assert.rejects(
    createLoopToolRouter(app, { subject: "operator", scopes: ["loop:read"] }).invoke({
      name: "loop.tasks.list",
      arguments: { oversized: "x".repeat(64 * 1024 + 1) },
    }),
    /tool arguments exceed safety limits/,
  );

  const gateway = createLoopGateway({
    application: app,
    authenticator: {
      async authenticate() {
        return { subject: "operator", scopes: ["loop:read"] };
      },
    },
    metadata: {
      resource: "https://loop.test/mcp",
      authorization_servers: ["https://auth.test"],
      scopes_supported: ["loop:read"],
      resource_documentation: "https://loop.test/docs",
    },
  });
  const missing = await gateway.handle({
    method: "POST",
    path: "/mcp",
    headers: {},
    body: { name: "loop.tasks.get", arguments: { taskId: "secret-task-id" } },
  });
  assert.deepEqual(missing.body, {
    error: "invalid_request",
    message: "the request could not be completed",
  });
});

test("Auth0 JWT boundary rejects malformed segments and accepts case-insensitive bearer", async () => {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicExponent: 0x10001,
  });
  const header = { alg: "RS256", kid: "key-1", typ: "JWT" };
  const claims = {
    iss: "https://tenant.auth0.com/",
    aud: ["loop-api"],
    sub: "auth0|operator",
    scope: "loop:read",
    exp: 2_000_000_000,
  };
  const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const signingInput = `${encode(header)}.${encode(claims)}`;
  const signer = createSign("RSA-SHA256");
  signer.update(signingInput);
  const token = `${signingInput}.${signer.sign(privateKey).toString("base64url")}`;
  const jwk = publicKey.export({ format: "jwk" });
  const authenticator = new Auth0LoopAuthenticator({
    issuer: "https://tenant.auth0.com",
    audience: "loop-api",
    now: () => 1_700_000_000_000,
    fetcher: async () =>
      new Response(JSON.stringify({ keys: [{ ...jwk, kid: "key-1", use: "sig", alg: "RS256" }] })),
  });
  const principal = await authenticator.authenticate({ authorization: `bearer ${token}` });
  assert.deepEqual(principal, { subject: "auth0|operator", scopes: ["loop:read"] });
  assert.equal(await authenticator.authenticate({ authorization: `Bearer ${token}.extra` }), null);
});

test("MCP JSON-RPC initialize, tools/list, notifications, and tool calls work", async () => {
  const app = new LoopApplication();
  const principal = { subject: "operator-1", scopes: ["loop:read", "loop:plan"] as const };
  const initialized = await handleLoopMcpMessage(app, principal, {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: { protocolVersion: "2025-03-26" },
  });
  assert.equal(initialized?.jsonrpc, "2.0");
  assert.ok(initialized);
  assert.equal((initialized.result as { serverInfo: { name: string } }).serverInfo.name, "loop");
  assert.match((initialized.result as { instructions: string }).instructions, /intent-level/);
  const listed = await handleLoopMcpMessage(app, principal, {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list",
  });
  assert.ok(listed);
  assert.equal((listed.result as { tools: readonly unknown[] }).tools.length, 24);
  const createTool = (
    listed.result as {
      tools: ReadonlyArray<{
        name: string;
        inputSchema: { required?: readonly string[] };
        annotations: { readOnlyHint?: boolean };
        securitySchemes: ReadonlyArray<{ type: string; scopes: readonly string[] }>;
      }>;
    }
  ).tools.find((tool) => tool.name === "loop.tasks.create_draft");
  assert.ok(createTool);
  assert.deepEqual(createTool.inputSchema.required, ["contract"]);
  assert.equal(createTool.annotations.readOnlyHint, false);
  assert.deepEqual(createTool.securitySchemes, [{ type: "oauth2", scopes: ["loop:plan"] }]);
  const notification = await handleLoopMcpMessage(app, principal, {
    jsonrpc: "2.0",
    method: "notifications/initialized",
  });
  assert.equal(notification, null);
  const called = await handleLoopMcpMessage(app, principal, {
    jsonrpc: "2.0",
    id: 3,
    method: "tools/call",
    params: {
      name: "loop.tasks.create_draft",
      arguments: {
        contract: contract({
          identity: { taskId: "loop_mcp_1", project: "loop", title: "MCP task", revision: 1 },
        }),
      },
    },
  });
  assert.ok(called);
  assert.equal((called.result as { isError: boolean }).isError, false);

  const denied = await handleLoopMcpMessage(
    app,
    { subject: "read-only", scopes: ["loop:read"] },
    {
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: { name: "loop.tasks.create_draft", arguments: { contract: contract() } },
    },
    undefined,
    { resourceMetadata: "https://mcp.loop.example/.well-known/oauth-protected-resource" },
  );
  assert.ok(denied);
  assert.equal((denied.result as { isError: boolean }).isError, true);
  assert.match(
    String(
      (denied.result as { _meta: { "mcp/www_authenticate": string } })._meta[
        "mcp/www_authenticate"
      ],
    ),
    /scope="loop:plan"/,
  );
});

test("official MCP SDK Streamable HTTP transport negotiates tools and scope challenges", async () => {
  const application = new LoopApplication();
  const headers = {
    "content-type": "application/json",
    accept: "application/json, text/event-stream",
    "MCP-Protocol-Version": "2025-03-26",
  };
  const initialize = await handleLoopSdkMcpRequest(
    new Request("https://loop.test/mcp", {
      method: "POST",
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-03-26",
          capabilities: {},
          clientInfo: { name: "test-client", version: "1" },
        },
      }),
    }),
    { application, principal: { subject: "sdk-test", scopes: ["loop:read"] } },
  );
  assert.equal(initialize.status, 200);
  const initializeBody = (await initialize.json()) as {
    result?: { protocolVersion?: string };
  };
  assert.equal(initializeBody.result?.protocolVersion, "2025-03-26");

  const tools = await handleLoopSdkMcpRequest(
    new Request("https://loop.test/mcp", {
      method: "POST",
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 2,
        method: "tools/list",
        params: {},
      }),
    }),
    { application, principal: { subject: "sdk-test", scopes: ["loop:read"] } },
  );
  const toolsBody = (await tools.json()) as { result?: { tools?: readonly unknown[] } };
  assert.equal(tools.status, 200);
  assert.equal(toolsBody.result?.tools?.length, 24);

  const forbidden = await handleLoopSdkMcpRequest(
    new Request("https://loop.test/mcp", {
      method: "POST",
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: { name: "loop.tasks.create_draft", arguments: { contract: {} } },
      }),
    }),
    {
      application,
      principal: { subject: "sdk-test", scopes: ["loop:read"] },
      resourceMetadata: "https://loop.test/.well-known/oauth-protected-resource",
    },
  );
  const forbiddenBody = (await forbidden.json()) as {
    result?: { isError?: boolean; _meta?: { "mcp/www_authenticate"?: string } };
  };
  assert.equal(forbidden.status, 200);
  assert.equal(forbiddenBody.result?.isError, true);
  assert.match(forbiddenBody.result?._meta?.["mcp/www_authenticate"] ?? "", /loop:plan/);
});

test("runtime-neutral SHA-256 produces the standard test vector", () => {
  assert.equal(
    sha256Hex("abc"),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  );
});

test("GitHub webhook signatures verify and delivery claims deduplicate", async () => {
  const secret = "loop-test-secret";
  const body = JSON.stringify({ action: "opened" });
  const signature = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
  assert.equal(await verifyGithubWebhookSignature(secret, body, signature), true);
  assert.equal(await verifyGithubWebhookSignature(secret, `${body}!`, signature), false);
  const store = new InMemoryLoopWebhookDedupStore();
  const first = await store.claim({
    deliveryId: "delivery-1",
    receivedAt: "2026-07-13T00:00:00.000Z",
    expiresAt: "2026-07-20T00:00:00.000Z",
  });
  const second = await store.claim({
    deliveryId: "delivery-1",
    receivedAt: "2026-07-13T00:00:01.000Z",
    expiresAt: "2026-07-20T00:00:00.000Z",
  });
  assert.equal(first, "claimed");
  assert.equal(second, "duplicate");
});

test("GitHub webhook verification signs raw bytes and rejects malformed delivery IDs", async () => {
  const secret = "loop-test-secret";
  const raw = Uint8Array.from([0x7b, 0x22, 0x6f, 0x6b, 0x22, 0x3a, 0x22, 0xc3, 0xa9, 0x22, 0x7d]);
  const signature = `sha256=${createHmac("sha256", secret).update(raw).digest("hex")}`;
  assert.equal(await verifyGithubWebhookSignatureBytes(secret, raw, signature), true);
  assert.equal(await verifyGithubWebhookSignatureBytes(secret, raw.slice(0, -1), signature), false);
  const store = new InMemoryLoopWebhookDedupStore();
  await assert.rejects(
    store.claim({
      deliveryId: "delivery with spaces",
      receivedAt: "2026-07-13T00:00:00.000Z",
      expiresAt: "2026-07-20T00:00:00.000Z",
    }),
    /delivery ID is invalid/,
  );
});

test("GitHub publication updates deterministic checks and one status comment", async () => {
  const calls: Array<{ method: string; path: string; body?: unknown }> = [];
  const check = { id: 41, external_id: "loop:loop_publish_1:Policy" };
  let comment: { id: number; body: string } | null = null;
  const client: LoopGitHubClient = {
    async request(input) {
      calls.push(input);
      if (input.path.includes("/check-runs?") && input.method === "GET")
        return { check_runs: [check] };
      if (input.path.includes("/check-runs/41") && input.method === "PATCH") return { id: 41 };
      if (input.path.includes("/comments?") && input.method === "GET")
        return comment ? [comment] : [];
      if (input.path.endsWith("/comments") && input.method === "POST") {
        comment = { id: 99, body: String((input.body as { body: string }).body) };
        return comment;
      }
      if (input.path.endsWith("/comments/99") && input.method === "PATCH") {
        comment = { id: 99, body: String((input.body as { body: string }).body) };
        return comment;
      }
      throw new Error(`unexpected GitHub request ${input.method} ${input.path}`);
    },
  };
  const publication = new GitHubLoopPublicationAdapter(client);
  const publishContract = contract({
    identity: { taskId: "loop_publish_1", project: "loop", title: "Publish task", revision: 1 },
  });
  const checkResult = await publication.publishCheck(publishContract, {
    name: "Policy",
    headSha: "def5678",
    status: "completed",
    conclusion: "success",
    summary: "policy passed",
  });
  assert.deepEqual(checkResult, { id: 41, action: "updated" });
  const firstComment = await publication.upsertStatusComment(publishContract, {
    issueNumber: 7,
    taskId: "loop_publish_1",
    runId: "run-1",
    generation: 1,
    body: "running",
  });
  assert.deepEqual(firstComment, { id: 99, action: "created" });
  const secondComment = await publication.upsertStatusComment(publishContract, {
    issueNumber: 7,
    taskId: "loop_publish_1",
    runId: "run-1",
    generation: 2,
    body: "complete",
  });
  assert.deepEqual(secondComment, { id: 99, action: "updated" });
  assert.ok(calls.some((call) => call.method === "PATCH" && call.path.endsWith("/check-runs/41")));
  assert.ok(calls.some((call) => call.method === "PATCH" && call.path.endsWith("/comments/99")));
  assert.match(comment?.body ?? "", /loop-status task=loop_publish_1 run=run-1 generation=2/);
});

test("GitHub publication promotes only the exact reviewed PR head", async () => {
  const calls: Array<{ method: string; path: string; body?: unknown }> = [];
  const client: LoopGitHubClient = {
    async request(input) {
      calls.push(input);
      if (input.method === "GET" && input.path.endsWith("/pulls/12")) {
        return {
          number: 12,
          draft: true,
          head: { sha: "def5678" },
          html_url: "https://github.com/example/repo/pull/12",
        };
      }
      if (input.method === "PATCH" && input.path.endsWith("/pulls/12"))
        return { number: 12, draft: false };
      if (input.method === "POST" && input.path.endsWith("/issues/12/labels"))
        return { labels: [] };
      throw new Error(`unexpected GitHub request ${input.method} ${input.path}`);
    },
  };
  const publication = new GitHubLoopPublicationAdapter(client);
  const result = await publication.markPullRequestReviewReady(contract(), {
    pullRequestNumber: 12,
    headSha: "def5678",
  });
  assert.deepEqual(result, {
    number: 12,
    url: "https://github.com/example/repo/pull/12",
  });
  assert.deepEqual(
    calls.map((call) => [call.method, call.path]),
    [
      ["GET", "repos/example/repo/pulls/12"],
      ["PATCH", "repos/example/repo/pulls/12"],
      ["POST", "repos/example/repo/issues/12/labels"],
    ],
  );
  assert.deepEqual(calls[1]?.body, { draft: false });
  assert.deepEqual(calls[2]?.body, { labels: ["loop:review-ready"] });
});

test("GitHub publication refuses a stale PR head before mutation", async () => {
  const calls: Array<{ method: string; path: string; body?: unknown }> = [];
  const client: LoopGitHubClient = {
    async request(input) {
      calls.push(input);
      if (input.method === "GET") return { number: 12, draft: true, head: { sha: "abc1234" } };
      throw new Error(`unexpected mutation ${input.method} ${input.path}`);
    },
  };
  const publication = new GitHubLoopPublicationAdapter(client);
  await assert.rejects(
    publication.markPullRequestReviewReady(contract(), {
      pullRequestNumber: 12,
      headSha: "def5678",
    }),
    /different head SHA/,
  );
  assert.deepEqual(
    calls.map((call) => call.method),
    ["GET"],
  );
});

test("GitHub App publication client mints and caches an installation token", async () => {
  const { privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicExponent: 0x10001,
  });
  const privateKeyPem = privateKey.export({ type: "pkcs8", format: "pem" }).toString();
  const requests: Array<{ url: string; init: RequestInit | undefined }> = [];
  const client = createLoopGitHubAppClient({
    appId: "123",
    installationId: "456",
    privateKeyPem,
    now: () => Date.parse("2026-07-13T00:00:00.000Z"),
    fetch: async (input, init) => {
      requests.push({ url: String(input), init });
      if (String(input).includes("/access_tokens"))
        return new Response(
          JSON.stringify({ token: "installation-token", expires_at: "2026-07-13T01:00:00.000Z" }),
          { status: 201, headers: { "content-type": "application/json" } },
        );
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    },
  });
  await client.request({ method: "GET", path: "repos/example/repo" });
  await client.request({ method: "GET", path: "repos/example/repo" });
  assert.equal(requests.filter((request) => request.url.includes("/access_tokens")).length, 1);
  const tokenRequest = requests.find((request) => request.url.includes("/access_tokens"));
  const authorization = new Headers(tokenRequest?.init?.headers).get("authorization") ?? "";
  const jwt = authorization.replace(/^Bearer /, "");
  assert.equal(jwt.split(".").length, 3);
  assert.deepEqual(JSON.parse(atob(jwt.split(".")[1]!.replaceAll("-", "+").replaceAll("_", "/"))), {
    iat: Math.floor(Date.parse("2026-07-13T00:00:00.000Z") / 1000) - 60,
    exp: Math.floor(Date.parse("2026-07-13T00:00:00.000Z") / 1000) + 8 * 60,
    iss: "123",
  });
  const apiRequests = requests.filter((request) => !request.url.includes("/access_tokens"));
  assert.equal(
    new Headers(apiRequests[0]?.init?.headers).get("authorization"),
    "Bearer installation-token",
  );
  assert.equal(
    new Headers(apiRequests[1]?.init?.headers).get("authorization"),
    "Bearer installation-token",
  );
});

test("rollout policy is explicit, fail-closed, and keeps R3/R4 human-gated", () => {
  assert.equal(parseLoopRolloutMode("unknown"), "shadow");
  const lowRisk = contract({ risk: { declared: "R1", reasons: ["isolated helper"] } });
  const r2 = contract({ risk: { declared: "R2", reasons: ["normal feature"] } });
  assert.equal(loopDispatchPolicy(lowRisk, "shadow").automaticOnApproval, false);
  assert.equal(loopDispatchPolicy(lowRisk, "controlled").automaticOnApproval, true);
  assert.equal(loopDispatchPolicy(r2, "assisted").explicitStartAllowed, false);
  assert.equal(loopDispatchPolicy(r2, "normal").automaticOnApproval, true);
  assert.throws(
    () => assertLoopWorkflowAllowed(contract(), "normal"),
    /R3 requires a separate human-gate surface/,
  );
});

test("evidence is content-addressed and bound to the exact task revision and SHAs", async () => {
  const store = new InMemoryLoopEvidenceStore();
  const input = {
    evidenceId: "checks-1",
    taskId: "loop_evidence_1",
    revision: 2,
    contractHash: "contract-hash-2",
    baseSha: "abc1234",
    headSha: "def5678",
    kind: "test_report",
    content: "all checks passed",
    contentType: "text/plain",
    summary: "unit and integration checks passed",
    createdAt: "2026-07-13T00:00:00.000Z",
    expiresAt: "2026-07-14T00:00:00.000Z",
  } as const;
  const record = await store.put(input);
  assert.equal(record.digest, sha256Hex(input.content));
  assert.equal(record.objectKey, "evidence/loop_evidence_1/2/def5678/checks-1");
  const replay = await store.put(input);
  assert.deepEqual(replay, record);
  await assert.rejects(
    () => store.put({ ...input, content: "different proof" }),
    /different content/,
  );
  const stored = await store.get(record.objectKey);
  assert.equal(new TextDecoder().decode(stored?.content), input.content);
  assert.equal((await store.list(input.taskId)).length, 1);
});

test("Box allocation persists intent, reconciles uncertain creates, and classifies orphans", async () => {
  const store = new InMemoryLoopBoxAllocationStore();
  let createCalls = 0;
  let resources: Array<{
    boxId: string;
    deterministicName: string;
    status: "running" | "stopped" | "unknown";
  }> = [];
  const allocator = new LoopBoxAllocator({
    store,
    now: () => "2026-07-13T00:00:00.000Z",
    client: {
      async create(input) {
        createCalls += 1;
        resources = [
          { boxId: "bx-1", deterministicName: input.deterministicName, status: "running" },
        ];
        return { boxId: "bx-1", deterministicName: input.deterministicName };
      },
      async list() {
        return resources;
      },
      async stop() {},
      async delete() {},
    },
  });
  const input = {
    allocationId: "allocation-loop_box_1-1",
    taskId: "loop_box_1",
    runId: "run-1",
    attempt: 1,
    deterministicName: "loop-loop_box_1-attempt-1",
    ttlSeconds: 600,
    expiresAt: "2026-07-14T00:00:00.000Z",
  } as const;
  const first = await allocator.ensureAllocated(input);
  const replay = await allocator.ensureAllocated(input);
  assert.equal(first.status, "allocated");
  assert.equal(first.boxId, "bx-1");
  assert.deepEqual(replay, first);
  assert.equal(createCalls, 1);
  const deleted = await allocator.delete(input.allocationId);
  assert.equal(deleted.status, "deleted");
  assert.equal((await allocator.delete(input.allocationId)).status, "deleted");

  const uncertainStore = new InMemoryLoopBoxAllocationStore();
  const uncertain = new LoopBoxAllocator({
    store: uncertainStore,
    now: () => "2026-07-13T00:00:00.000Z",
    client: {
      async create() {
        throw new Error("provider timeout");
      },
      async list() {
        return [
          { boxId: "bx-2", deterministicName: "loop-loop_box_2-attempt-1", status: "running" },
        ];
      },
      async stop() {},
      async delete() {},
    },
  });
  const reconciled = await uncertain.ensureAllocated({
    ...input,
    allocationId: "allocation-loop_box_2-1",
    taskId: "loop_box_2",
    deterministicName: "loop-loop_box_2-attempt-1",
  });
  assert.equal(reconciled.boxId, "bx-2");

  const duplicateStore = new InMemoryLoopBoxAllocationStore();
  const duplicate = new LoopBoxAllocator({
    store: duplicateStore,
    now: () => "2026-07-13T00:00:00.000Z",
    client: {
      async create() {
        throw new Error("provider timeout");
      },
      async list() {
        return [
          { boxId: "bx-3", deterministicName: "loop-loop_box_3-attempt-1", status: "running" },
          { boxId: "bx-4", deterministicName: "loop-loop_box_3-attempt-1", status: "running" },
        ];
      },
      async stop() {},
      async delete() {},
    },
  });
  await assert.rejects(
    () =>
      duplicate.ensureAllocated({
        ...input,
        allocationId: "allocation-loop_box_3-1",
        taskId: "loop_box_3",
        deterministicName: "loop-loop_box_3-attempt-1",
      }),
    (error: unknown) =>
      error instanceof LoopBoxAllocationError && error.code === "allocation_ambiguous",
  );
  const reconciliation = await allocator.reconcile();
  assert.equal(reconciliation.orphaned.length, 0);
});

test("Crabbox Box client normalizes warmup, list, stop, and delete commands", async () => {
  const calls: Array<{ command: string; args: readonly string[] }> = [];
  const client = createCrabboxLoopBoxClient({
    asciiBoxCliPath: "box",
    executor: {
      async execute(input) {
        calls.push(input);
        if (input.command === "crabbox")
          return {
            exitCode: 0,
            stdout: "",
            stderr: '{"provider":"ascii-box","leaseId":"cbx_123456789abc","boxId":"bx-1"}\n',
          };
        if (input.args[0] === "list")
          return {
            exitCode: 0,
            stdout: JSON.stringify({
              boxes: [
                { id: "bx-1", name: "loop-task-attempt-1", state: "ready" },
                { id: "bx-2", name: "old-box", state: "stopped" },
              ],
            }),
            stderr: "",
          };
        return { exitCode: 0, stdout: "{}", stderr: "" };
      },
    },
  });
  assert.deepEqual(
    await client.create({ deterministicName: "loop-task-attempt-1", ttlSeconds: 600 }),
    { boxId: "bx-1", deterministicName: "loop-task-attempt-1" },
  );
  assert.deepEqual(await client.list(), [
    { boxId: "bx-1", deterministicName: "loop-task-attempt-1", status: "running" },
    { boxId: "bx-2", deterministicName: "old-box", status: "stopped" },
  ]);
  await client.stop("bx-1");
  await client.delete("bx-1");
  assert.deepEqual(
    calls.map((call) => call.command),
    [
      "crabbox",
      "box",
      "box",
      "box",
    ],
  );
});

test("repair policy stops on budget, repeated failure, and same diff", () => {
  assert.deepEqual(
    decideLoopRepair({ maxRepairRounds: 2, history: [], failureClass: "ci", diffDigest: "d1" }),
    { action: "retry", nextRound: 1, reason: "within_budget" },
  );
  assert.deepEqual(
    decideLoopRepair({
      maxRepairRounds: 2,
      history: [
        { round: 1, failureClass: "ci", diffDigest: "d1" },
        { round: 2, failureClass: "lint", diffDigest: "d2" },
      ],
      failureClass: "ci",
      diffDigest: "d3",
    }),
    { action: "escalate", nextRound: 3, reason: "repair_budget_exhausted" },
  );
  assert.deepEqual(
    decideLoopRepair({
      maxRepairRounds: 4,
      history: [
        { round: 1, failureClass: "ci", diffDigest: "d1" },
        { round: 2, failureClass: "ci", diffDigest: "d2" },
      ],
      failureClass: "ci",
      diffDigest: "d3",
    }),
    { action: "escalate", nextRound: 3, reason: "repeated_failure" },
  );
  assert.deepEqual(
    decideLoopRepair({
      maxRepairRounds: 4,
      history: [{ round: 1, failureClass: "ci", diffDigest: "d1" }],
      failureClass: "lint",
      diffDigest: "d1",
    }),
    { action: "escalate", nextRound: 2, reason: "same_diff" },
  );
});

test("GitHub Loop intake only parses open loop:ready contract blocks", () => {
  const body = [
    "untrusted prose",
    "<!-- loop-contract:start -->",
    "```json",
    JSON.stringify(
      contract({
        identity: { taskId: "loop_issue_1", project: "loop", title: "Issue task", revision: 1 },
      }),
    ),
    "```",
    "<!-- loop-contract:end -->",
  ].join("\n");
  const parsed = parseLoopGitHubIssue({
    number: 42,
    title: "Issue task",
    body,
    state: "open",
    labels: [{ name: "loop:ready" }],
  });
  assert.equal(parsed.ready, true);
  assert.equal(parsed.contract?.identity.taskId, "loop_issue_1");
  assert.equal(parsed.diagnostics.length, 0);
  assert.equal(
    parseLoopGitHubIssue({ number: 43, title: "Nope", body, state: "open", labels: [] }).ready,
    false,
  );
  const malformed = parseLoopGitHubIssue({
    number: 44,
    title: "Malformed",
    body: "<!-- loop-contract:start -->{}<!-- loop-contract:end -->",
    state: "open",
    labels: [{ name: "loop:ready" }],
  });
  assert.equal(malformed.diagnostics[0]?.code, "E_CONTRACT_SHAPE");
  assert.match(
    renderLoopStatusComment({
      taskId: "loop_issue_1",
      runId: "run-1",
      generation: 1,
      phase: "REVIEWING",
      summary: "waiting for review",
    }),
    /loop-status task=loop_issue_1 run=run-1 generation=1/,
  );
  assert.deepEqual(parseLoopGitHubCommand("@loop dispatch"), {
    command: "dispatch",
    arguments: "",
  });
  assert.deepEqual(parseLoopGitHubCommand("status\n@loop stop"), undefined);
  assert.deepEqual(parseLoopGitHubCommand("@LOOP retry add regression test"), {
    command: "retry",
    arguments: "add regression test",
  });
});

test("run records are idempotent and keep Workflow lifecycle queryable", async () => {
  const store = new InMemoryLoopRunStore();
  const input = {
    runId: "loop-run-1",
    taskId: "loop_task_1",
    attempt: 1,
    generation: 1,
    expectedVersion: 4,
    startedAt: "2026-07-13T00:00:00.000Z",
  } as const;
  const created = await store.create(input);
  const replay = await store.create(input);
  assert.deepEqual(replay, created);
  const reviewing = await store.update(created.runId, {
    status: "reviewing",
    updatedAt: "2026-07-13T00:10:00.000Z",
    providerLeaseId: "lease-1",
    nextAttemptAt: "2026-07-13T00:20:00.000Z",
    providerReason: "capacity",
    attempt: 2,
    generation: 2,
  });
  assert.equal(reviewing.status, "reviewing");
  assert.equal(reviewing.model, LOOP_DEVIN_MODEL);
  assert.equal(reviewing.attempt, 2);
  assert.equal(reviewing.generation, 2);
  assert.equal(reviewing.cancellationGeneration, 1);
  const cleared = await store.update(created.runId, {
    status: "executing",
    updatedAt: "2026-07-13T00:11:00.000Z",
    clearProviderLease: true,
    clearNextAttemptAt: true,
    clearProviderReason: true,
  });
  assert.equal(cleared.providerLeaseId, undefined);
  assert.equal(cleared.nextAttemptAt, undefined);
  assert.equal(cleared.providerReason, undefined);
  assert.deepEqual(
    (await store.list("loop_task_1")).map((run) => run.runId),
    ["loop-run-1"],
  );
});

test("Devin capacity starts at two, ramps within a configured ceiling, and recovers stale slots", () => {
  assert.deepEqual(normalizeLoopDevinArgs(undefined), ["--model", LOOP_DEVIN_MODEL, "acp"]);
  assert.deepEqual(normalizeLoopDevinArgs(["acp", "--verbose"]), [
    "--model",
    LOOP_DEVIN_MODEL,
    "acp",
    "--verbose",
  ]);
  assert.throws(() => normalizeLoopDevinArgs(["--model", "SWE-1.6", "acp"]), /SWE-1.7/);

  const coordinator = new InMemoryLoopProviderCapacityCoordinator();
  const now = "2026-07-13T00:00:00.000Z";
  const first = coordinator.acquire({
    taskId: "task-1",
    runId: "run-1",
    generation: 1,
    model: LOOP_DEVIN_MODEL,
    now,
  });
  const second = coordinator.acquire({
    taskId: "task-2",
    runId: "run-2",
    generation: 1,
    model: LOOP_DEVIN_MODEL,
    now,
  });
  assert.equal(first.status, "acquired");
  assert.equal(second.status, "acquired");
  const waiting = coordinator.acquire({
    taskId: "task-3",
    runId: "run-3",
    generation: 1,
    model: LOOP_DEVIN_MODEL,
    now,
  });
  assert.equal(waiting.status, "waiting");
  if (waiting.status === "waiting") assert.equal(waiting.reason, "capacity");
  if (first.status !== "acquired") throw new Error("first lease was not acquired");
  assert.equal(
    coordinator.release({ leaseId: first.lease.leaseId, runId: "run-1", generation: 1, now }),
    "released",
  );
  assert.equal(
    coordinator.acquire({
      taskId: "task-3",
      runId: "run-3",
      generation: 1,
      model: LOOP_DEVIN_MODEL,
      now,
    }).status,
    "acquired",
  );
  const reclaimed = coordinator.acquire({
    taskId: "task-4",
    runId: "run-4",
    generation: 1,
    model: LOOP_DEVIN_MODEL,
    now: "2026-07-13T00:02:00.000Z",
  });
  assert.equal(reclaimed.status, "acquired");

  const adaptive = new InMemoryLoopProviderCapacityCoordinator({ maxConcurrent: 4 });
  assert.equal(adaptive.state.maxConcurrent, 4);
  assert.equal(adaptive.state.admissionLimit, 2);
  for (let index = 0; index < 4; index += 1)
    adaptive.success({ now: `2026-07-13T00:0${index}:00.000Z` });
  assert.equal(adaptive.state.admissionLimit, 3);
  adaptive.cooldown({ until: "2026-07-13T01:00:00.000Z", reason: "rate_limited" });
  assert.equal(adaptive.state.admissionLimit, 1);
  assert.equal(adaptive.state.rateLimitCount, 1);
});

test("durable checkpoints retain only a digest in control state and support latest handoff lookup", async () => {
  const store = new InMemoryLoopRunCheckpointStore();
  await store.put({
    checkpointId: "checkpoint-1",
    runId: "run-checkpoint-1",
    taskId: "task-checkpoint-1",
    generation: 1,
    cancellationGeneration: 1,
    taskRevision: 1,
    model: LOOP_DEVIN_MODEL,
    contractHash: "sha256:checkpoint",
    sessionIdDigest: "digest-1",
    status: "rate_limited",
    phase: "devin",
    handoff: "resume after the provider window",
    retryAt: "2026-07-13T01:00:00.000Z",
    updatedAt: "2026-07-13T00:00:00.000Z",
  });
  const latest = await store.latest("run-checkpoint-1");
  assert.equal(latest?.sessionIdDigest, "digest-1");
  assert.equal("sessionId" in (latest ?? {}), false);
});

test("repository writer and path leases fence overlapping writers and stale generations", () => {
  const now = "2026-07-13T00:00:00.000Z";
  assert.equal(normalizeLoopLeasePath("src\\loop\\**"), "src/loop/**");
  assert.throws(() => normalizeLoopLeasePath("../outside"), /not safe/);
  let state = createLoopRepositoryLeaseState();
  const first = acquireLoopRepositoryLease(state, {
    leaseId: "writer-1",
    taskId: "task-1",
    runId: "run-1",
    generation: 1,
    paths: ["src/loop/**", "src/loop/application.ts"],
    now,
    leaseSeconds: 60,
  });
  assert.equal(first.result.status, "acquired");
  state = first.state;
  const conflict = acquireLoopRepositoryLease(state, {
    leaseId: "writer-2",
    taskId: "task-2",
    runId: "run-2",
    generation: 1,
    paths: ["src/loop/application.ts"],
    now,
  });
  assert.equal(conflict.result.status, "conflict");
  if (conflict.result.status === "conflict")
    assert.deepEqual(conflict.result.conflict.conflictingPaths, ["src/loop/application.ts"]);
  const renewed = renewLoopRepositoryLease(state, {
    leaseId: "writer-1",
    taskId: "task-1",
    runId: "run-1",
    generation: 1,
    now: "2026-07-13T00:00:30.000Z",
  });
  assert.equal(renewed.result.status, "renewed");
  const stale = releaseLoopRepositoryLease(renewed.state, {
    leaseId: "writer-1",
    taskId: "task-1",
    runId: "run-1",
    generation: 2,
    now: "2026-07-13T00:00:31.000Z",
  });
  assert.equal(stale.result.status, "stale");
  const released = releaseLoopRepositoryLease(renewed.state, {
    leaseId: "writer-1",
    taskId: "task-1",
    runId: "run-1",
    generation: 1,
    now: "2026-07-13T00:00:31.000Z",
  });
  assert.equal(released.result.status, "released");
});

test("Loop Runner uses a fenced ACP boundary and requires a matching result file", async () => {
  const directory = mkdtempSync(join(tmpdir(), "loop-runner-"));
  try {
    execFileSync("git", ["init", "--quiet"], { cwd: directory });
    execFileSync("git", ["config", "user.email", "loop@example.test"], { cwd: directory });
    execFileSync("git", ["config", "user.name", "Loop Test"], { cwd: directory });
    writeFileSync(join(directory, "README.md"), "runner fixture\n");
    execFileSync("git", ["add", "README.md"], { cwd: directory });
    execFileSync("git", ["commit", "--quiet", "-m", "fixture"], { cwd: directory });
    const baseSha = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: directory,
      encoding: "utf8",
    }).trim();
    const resultPath = join(directory, ".loop", "outbox", "result.json");
    const checkpointPath = join(directory, ".loop", "checkpoints", "run_runner_1.json");
    const contractHash = "sha256:runner-contract";
    const result = {
      schema_version: 1,
      status: "candidate_complete",
      task_revision: 1,
      contract_hash: contractHash,
      acceptance_criteria: [
        { id: "AC-1", claimed_status: "satisfied", evidence_paths: ["README.md"] },
      ],
      commands_run: [{ command: "pnpm run check", exit_code: 0 }],
      assumptions: [],
      blockers: [],
      scope_deviations: [],
      risks_discovered: [],
    };
    const resultDirectory = join(directory, ".loop", "outbox");
    mkdirSync(resultDirectory, { recursive: true });
    writeFileSync(resultPath, JSON.stringify(result));
    const events: string[] = [];
    let shutdown = false;
    const runner = new LoopRunner({
      workspaceRoot: directory,
      taskId: "loop_runner_1",
      runId: "run_runner_1",
      boxId: "bx_runner_1",
      generation: 3,
      taskRevision: 1,
      contractHash,
      baseSha,
      requiredGateNames: ["AC-1"],
      prompt: "Implement only the approved task.",
      resultPath,
      checkpointPath,
      emit(event) {
        events.push(event.type);
      },
      runtimeFactory() {
        return {
          runtime: {
            async initialize() {
              return {
                info: { protocolVersion: 1 },
                capabilities: { continueSession: false, loadSession: false },
                async createSession(input: { cwd: string }) {
                  return { id: "session-runner-1", cwd: input.cwd };
                },
                async prompt() {
                  return {
                    sessionId: "session-runner-1",
                    stopReason: "end_turn",
                    outputText: "done",
                  } as const;
                },
                async cancel() {},
              };
            },
          },
          async shutdown() {
            shutdown = true;
          },
        };
      },
    });
    const execution = await runner.run();
    assert.equal(execution.result.status, "candidate_complete");
    assert.equal(execution.sessionId, "session-runner-1");
    assert.deepEqual(events, [
      "runner-registered",
      "runner-heartbeat",
      "runner-heartbeat",
      "agent-result",
    ]);
    const checkpoint = await readLoopRunnerCheckpoint(checkpointPath);
    assert.equal(checkpoint?.model, LOOP_DEVIN_MODEL);
    assert.equal(checkpoint?.sessionId, "session-runner-1");
    assert.equal(shutdown, true);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("runner registration fences stale generations and heartbeats", async () => {
  const store = new InMemoryLoopRunnerRegistrationStore();
  assert.equal(
    await store.register({
      runId: "run-register-1",
      taskId: "loop_register_1",
      boxId: "bx-register-1",
      generation: 2,
      phase: "starting",
      processAlive: true,
      registeredAt: "2026-07-13T00:00:00.000Z",
    }),
    "accepted",
  );
  assert.equal(
    await store.register({
      runId: "run-register-1",
      taskId: "loop_register_1",
      boxId: "bx-register-1",
      generation: 1,
      phase: "starting",
      processAlive: true,
      registeredAt: "2026-07-13T00:01:00.000Z",
    }),
    "stale",
  );
  assert.equal(
    await store.heartbeat({
      runId: "run-register-1",
      taskId: "loop_register_1",
      boxId: "bx-register-1",
      generation: 2,
      phase: "devin",
      processAlive: true,
      timestamp: "2026-07-13T00:02:00.000Z",
    }),
    "accepted",
  );
  assert.equal((await store.get("run-register-1"))?.phase, "devin");
});

test("deterministic runner publication fences paths, secrets, branch races, and PR identity", async () => {
  const commands: string[] = [];
  let headReads = 0;
  const publisher = createLoopRunnerPublisher({
    workspaceRoot: "/tmp/loop-publication",
    contract: contract({
      identity: {
        taskId: "loop_publish_runner",
        project: "loop",
        title: "Publish runner output",
        revision: 1,
      },
      expectedPaths: ["src/**"],
      forbiddenPaths: ["src/secrets/**"],
    }),
    executor: {
      async execute(input) {
        commands.push(`${input.command} ${input.args.join(" ")}`);
        const args = input.args;
        if (args.join(" ") === "diff --name-only")
          return { exitCode: 0, stdout: "src/change.ts\n", stderr: "" };
        if (args.join(" ") === "diff --cached --name-only")
          return { exitCode: 0, stdout: "", stderr: "" };
        if (args.join(" ") === "ls-files --others --exclude-standard")
          return { exitCode: 0, stdout: "", stderr: "" };
        if (args.join(" ") === "rev-parse HEAD") {
          headReads += 1;
          return {
            exitCode: 0,
            stdout: `${headReads === 1 ? "abc1234" : "def5678"}\n`,
            stderr: "",
          };
        }
        if (args.join(" ") === "branch --show-current")
          return { exitCode: 0, stdout: "\n", stderr: "" };
        if (args[0] === "show-ref") return { exitCode: 1, stdout: "", stderr: "" };
        if (args[0] === "diff" && args.includes("--unified=0"))
          return { exitCode: 0, stdout: "+safe change\n", stderr: "" };
        if (args.join(" ") === "diff --cached --quiet")
          return { exitCode: 1, stdout: "", stderr: "" };
        if (args[0] === "ls-remote") return { exitCode: 0, stdout: "", stderr: "" };
        return { exitCode: 0, stdout: "", stderr: "" };
      },
    },
    github: {
      async request(input) {
        if (input.method === "GET") return [];
        return {
          number: 17,
          html_url: "https://github.com/example/repo/pull/17",
          head: { sha: "def5678" },
        };
      },
    },
  });
  const published = await publisher.publish();
  assert.equal(published.headSha, "def5678");
  assert.equal(published.pullRequestNumber, 17);
  assert.ok(commands.some((command) => command.startsWith("git push")));
  assert.ok(commands.some((command) => command.includes("force-with-lease")));
});

test("reconciliation identifies stale runners, runs, and unacknowledged Box intents", () => {
  const plan = planLoopReconciliation({
    now: "2026-07-13T14:00:00.000Z",
    runs: [
      {
        runId: "run-stale-runner",
        taskId: "task-1",
        attempt: 1,
        generation: 1,
        cancellationGeneration: 1,
        expectedVersion: 2,
        model: LOOP_DEVIN_MODEL,
        status: "executing",
        startedAt: "2026-07-13T00:00:00.000Z",
        updatedAt: "2026-07-13T13:59:00.000Z",
      },
      {
        runId: "run-old",
        taskId: "task-2",
        attempt: 1,
        generation: 1,
        cancellationGeneration: 1,
        expectedVersion: 2,
        model: LOOP_DEVIN_MODEL,
        status: "waiting_box",
        startedAt: "2026-07-13T00:00:00.000Z",
        updatedAt: "2026-07-13T00:00:00.000Z",
      },
    ],
    runners: [
      {
        runId: "run-stale-runner",
        taskId: "task-1",
        boxId: "box-1",
        generation: 1,
        phase: "devin",
        processAlive: true,
        registeredAt: "2026-07-13T00:00:00.000Z",
        lastSeenAt: "2026-07-13T13:56:00.000Z",
      },
    ],
    allocations: [
      {
        allocationId: "allocation-expired",
        taskId: "task-3",
        runId: "run-3",
        attempt: 1,
        provider: "ascii-box",
        deterministicName: "loop-task-3",
        status: "intent",
        createdAt: "2026-07-13T00:00:00.000Z",
        updatedAt: "2026-07-13T00:00:00.000Z",
        expiresAt: "2026-07-13T13:00:00.000Z",
      },
    ],
  });
  assert.deepEqual(plan.staleRunnerIds, ["run-stale-runner"]);
  assert.deepEqual([...plan.staleRunIds].sort(), ["run-old", "run-stale-runner"]);
  assert.deepEqual(plan.expiredAllocationIds, ["allocation-expired"]);
});

test("self-healing plans one bounded retry and preserves shadow as observe-only", async () => {
  const app = new LoopApplication();
  const created = await app.createDraft(
    contract({
      identity: { taskId: "loop_heal_1", project: "loop", title: "Heal me", revision: 1 },
      budget: { ...contract().budget, maxBuilderAttempts: 2 },
    }),
  );
  let task = (await app.validate(created.taskId)).state;
  task = await app.approve(task.taskId, { expectedVersion: task.version });
  task = await app.advance(task.taskId, "ALLOCATING", { expectedVersion: task.version });
  const plan = planLoopSelfHealing({
    now: "2026-07-14T00:00:00.000Z",
    tasks: [task],
    runs: [
      {
        runId: "run-heal-1",
        taskId: task.taskId,
        attempt: 1,
        generation: 1,
        cancellationGeneration: 1,
        expectedVersion: task.version,
        model: LOOP_DEVIN_MODEL,
        status: "executing",
        startedAt: "2026-07-13T00:00:00.000Z",
        updatedAt: "2026-07-13T00:00:00.000Z",
      },
    ],
    runners: [],
    allocations: [],
    rolloutMode: "controlled",
  });
  assert.equal(plan.actions[0]?.action, "retry");
  assert.equal(
    planLoopSelfHealing({ ...planInputForTest(task), rolloutMode: "shadow" }).observedOnly,
    true,
  );
});

function planInputForTest(task: LoopTaskState) {
  return {
    now: "2026-07-14T00:00:00.000Z",
    tasks: [task],
    runs: [],
    runners: [],
    allocations: [],
  };
}

test("Loop issue publisher keeps drafts inert and emits the ready label explicitly", async () => {
  const requests: unknown[] = [];
  const publisher = new GitHubLoopIssuePublisher({
    async request(input) {
      requests.push(input);
      return input.path.endsWith("/labels")
        ? []
        : { number: 9, html_url: "https://github.com/example/repo/issues/9" };
    },
  });
  const draft = await publisher.createIssue({
    contract: contract({
      identity: { taskId: "issue-1", project: "loop", title: "Draft", revision: 1 },
    }),
  });
  assert.equal(draft.draft, true);
  assert.match(
    String((requests[0] as { body: { body: string } }).body.body),
    /loop-contract:start/,
  );
  await publisher.markIssueReady({ owner: "example", repository: "repo", issueNumber: 9 });
  assert.deepEqual((requests[1] as { body: { labels: string[] } }).body.labels, ["loop:ready"]);
  assert.match(renderLoopContractBlock(contract()), /loop-contract:end/);
});

test("execution coordinator persists the Box-to-review lifecycle", async () => {
  const app = new LoopApplication();
  let stopped = false;
  const coordinator = new LoopExecutionCoordinator({
    application: app,
    repository: {
      async resolveSnapshot() {
        return { baseSha: "abc1234" };
      },
      async publish() {
        return { headSha: "def5678", headBranch: "loop/loop_orchestrated" };
      },
    },
    workspace: {
      async acquire(input) {
        return {
          workspace: { id: "cbx_0123456789ab", provider: "ascii-box" },
          sourceDir: input.sourceDir,
        };
      },
      async sync() {},
      async collect() {},
      async stop() {
        stopped = true;
      },
    },
    agent: {
      async execute() {
        return { headBranch: "loop/loop_orchestrated", summary: "implemented", artifacts: [] };
      },
    },
    verifier: {
      async verify() {
        return [
          { criterionId: "AC-1", passed: true, summary: "integration proof" },
          { criterionId: "AC-2", passed: true, summary: "stale-head proof" },
        ];
      },
    },
    reviewer: {
      async review() {
        return { verdict: "approved", findings: [] };
      },
    },
  });
  const result = await coordinator.run({
    contract: contract({
      identity: {
        taskId: "loop_orchestrated",
        project: "loop",
        title: "Orchestrated task",
        revision: 1,
      },
    }),
    sourceDir: "/tmp/repo",
  });
  assert.equal(result.state.phase, "HUMAN_ACCEPTANCE");
  assert.equal(result.state.headSha, "def5678");
  assert.equal(result.state.gates["AC-1"]?.state, "PASSED");
  assert.equal(stopped, true);
  const completed = await coordinator.approveAndComplete(result.state.taskId, result.state.version);
  assert.equal(completed.phase, "COMPLETE");
});

test("execution coordinator can verify from a fresh clean-head workspace", async () => {
  const app = new LoopApplication();
  let verifierWorkspace = "";
  let verifierStopped = false;
  const verificationWorkspace = {
    async acquire(input: { contract: LoopTaskContract; sourceDir: string }) {
      return {
        workspace: { id: "cbx_fedcba987654", provider: "ascii-box" as const },
        sourceDir: input.sourceDir,
      };
    },
    async sync(lease: { workspace: { id: string; provider: "ascii-box" }; sourceDir: string }) {
      verifierWorkspace = lease.workspace.id;
    },
    async collect() {},
    async stop() {
      verifierStopped = true;
    },
  };
  const coordinator = new LoopExecutionCoordinator({
    application: app,
    repository: {
      async resolveSnapshot() {
        return { baseSha: "abc1234" };
      },
      async publish() {
        return { headSha: "def5678", headBranch: "loop/fresh-review" };
      },
    },
    workspace: {
      async acquire(input) {
        return {
          workspace: { id: "cbx_0123456789ab", provider: "ascii-box" },
          sourceDir: input.sourceDir,
        };
      },
      async sync() {},
      async collect() {},
      async stop() {},
    },
    verificationWorkspace,
    agent: {
      async execute() {
        return { headBranch: "loop/fresh-review", summary: "implemented", artifacts: [] };
      },
    },
    verifier: {
      async verify(input) {
        verifierWorkspace = `${verifierWorkspace}:${input.lease.workspace.id}`;
        return [
          { criterionId: "AC-1", passed: true, summary: "clean-head proof" },
          { criterionId: "AC-2", passed: true, summary: "clean-head proof" },
        ];
      },
    },
    reviewer: {
      async review() {
        return { verdict: "approved", findings: [] };
      },
    },
  });
  const result = await coordinator.run({
    contract: contract({
      identity: {
        taskId: "loop_fresh_review",
        project: "loop",
        title: "Fresh review",
        revision: 1,
      },
    }),
    sourceDir: "/tmp/repo",
  });
  assert.equal(result.state.phase, "HUMAN_ACCEPTANCE");
  assert.equal(verifierWorkspace, "cbx_fedcba987654:cbx_fedcba987654");
  assert.equal(verifierStopped, true);
});

test("execution coordinator re-enters bounded repair rounds after review findings", async () => {
  const app = new LoopApplication();
  let executions = 0;
  let reviews = 0;
  const coordinator = new LoopExecutionCoordinator({
    application: app,
    repository: {
      async resolveSnapshot() {
        return { baseSha: "abc1234" };
      },
      async publish() {
        return {
          headSha: executions === 1 ? "def5678" : "fed7654",
          headBranch: "loop/loop_repair_cycle",
        };
      },
    },
    workspace: {
      async acquire(input) {
        return {
          workspace: { id: "cbx_repair_cycle", provider: "ascii-box" },
          sourceDir: input.sourceDir,
        };
      },
      async sync() {},
      async collect() {},
      async stop() {},
    },
    agent: {
      async execute() {
        executions += 1;
        return { headBranch: "loop/loop_repair_cycle", summary: "implemented", artifacts: [] };
      },
    },
    verifier: {
      async verify() {
        return [
          { criterionId: "AC-1", passed: true, summary: "verification pass" },
          { criterionId: "AC-2", passed: true, summary: "verification pass" },
        ];
      },
    },
    reviewer: {
      async review() {
        reviews += 1;
        return reviews === 1
          ? {
              verdict: "changes_requested" as const,
              findings: [
                {
                  id: "F-1",
                  severity: "P2" as const,
                  title: "Add the missing regression test",
                  body: "The first candidate needs one more regression test.",
                  status: "open" as const,
                },
              ],
            }
          : { verdict: "approved" as const, findings: [] };
      },
    },
  });
  const result = await coordinator.run({
    contract: contract({
      identity: {
        taskId: "loop_repair_cycle",
        project: "loop",
        title: "Repair cycle",
        revision: 1,
      },
      budget: {
        maxBoxSeconds: 60,
        maxBuilderAttempts: 1,
        maxRepairRounds: 1,
        maxVerifierAttempts: 1,
        maximumLifetimeHours: 1,
      },
    }),
    sourceDir: "/tmp/repo",
  });
  assert.equal(executions, 2);
  assert.equal(reviews, 2);
  assert.equal(result.state.phase, "HUMAN_ACCEPTANCE");
  assert.equal(result.state.headSha, "fed7654");
  assert.equal(result.review?.verdict, "approved");
});
