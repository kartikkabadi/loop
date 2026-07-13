import {
  createLoopToolRouter,
  LoopToolAuthorizationError,
  type LoopCapacityReader,
  type LoopRunDispatcher,
  type LoopToolRequest,
} from "./tool-router.js";
import type { LoopApplication } from "./application.js";
import type { LoopPrincipal } from "./tool-router.js";
import type { LoopRolloutMode } from "./rollout-policy.js";
import type { LoopGitHubIssuePublisher } from "./github-adapter.js";

export type LoopMcpId = string | number | null;
export type LoopMcpMessage = Readonly<{
  jsonrpc?: unknown;
  id?: unknown;
  method?: unknown;
  params?: unknown;
}>;
export type LoopMcpResponse = Readonly<{
  jsonrpc: "2.0";
  id?: LoopMcpId;
  result?: unknown;
  error?: Readonly<{ code: number; message: string }>;
}>;

export type LoopMcpOptions = Readonly<{
  resourceMetadata?: string;
  rolloutMode?: LoopRolloutMode;
  githubIssues?: LoopGitHubIssuePublisher;
  capacity?: LoopCapacityReader;
}>;

export const LOOP_MCP_SERVER_INFO = { name: "loop", version: "0.1.0" } as const;
export const LOOP_MCP_PROTOCOL_VERSION = "2025-03-26" as const;
export const LOOP_MCP_INSTRUCTIONS = [
  "Loop is an authenticated, intent-level work orchestration service.",
  "Start with loop.tasks.list or loop.tasks.get before changing state.",
  "Create and validate a task draft before approval; include expectedVersion and idempotencyKey on writes.",
  "Use review and evidence tools to inspect outcomes. Loop does not expose shell, raw provider controls, or merge operations.",
  "ChatGPT is the planning, approval, steering, and review surface; durable execution runs through Loop's isolated workspace and provider adapters.",
].join("\n");

const READ_ONLY_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;
const WRITE_ANNOTATIONS = {
  readOnlyHint: false,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

type JsonSchema = Readonly<Record<string, unknown>>;

const TASK_ID_SCHEMA = {
  type: "string",
  minLength: 1,
  description: "Loop task identifier.",
} as const;
const WRITE_METADATA_SCHEMA = {
  expectedVersion: {
    type: "integer",
    minimum: 0,
    description: "Expected task version for optimistic concurrency.",
  },
  idempotencyKey: {
    type: "string",
    minLength: 1,
    description: "Stable key that makes a write safe to retry.",
  },
} as const;

function schema(
  properties: Readonly<Record<string, unknown>> = {},
  required: readonly string[] = [],
): JsonSchema {
  return {
    type: "object",
    properties,
    ...(required.length > 0 ? { required } : {}),
    additionalProperties: false,
  };
}

type LoopMcpToolDefinition = Readonly<{
  name: string;
  description: string;
  inputSchema: JsonSchema;
  annotations: Readonly<Record<string, boolean>>;
  requiredScope: string;
}>;

function tool(
  name: string,
  description: string,
  requiredScope: string,
  inputSchema: JsonSchema,
  annotations: Readonly<Record<string, boolean>> = READ_ONLY_ANNOTATIONS,
): LoopMcpToolDefinition {
  return { name, description, requiredScope, inputSchema, annotations };
}

const TASK_WRITE_SCHEMA = {
  ...WRITE_METADATA_SCHEMA,
  taskId: TASK_ID_SCHEMA,
} as const;

const LOOP_MCP_TOOL_DEFINITIONS: readonly LoopMcpToolDefinition[] = [
  tool(
    "loop.workday.get",
    "Read one compact human-friendly view of active work, review items, blockers, and capacity.",
    "loop:read",
    schema(),
  ),
  tool(
    "loop.tasks.list",
    "List durable Loop tasks and their current lifecycle states.",
    "loop:read",
    schema(),
  ),
  tool(
    "loop.capacity.get",
    "Read current execution-provider admission, cooldown, and observed rate-limit telemetry.",
    "loop:read",
    schema(),
  ),
  tool(
    "loop.tasks.get",
    "Read one durable task, including its contract, phase, gates, and findings.",
    "loop:read",
    schema({ taskId: TASK_ID_SCHEMA }, ["taskId"]),
  ),
  tool(
    "loop.review.get",
    "Read the review packet for a task at its exact reviewed head.",
    "loop:read",
    schema({ taskId: TASK_ID_SCHEMA }, ["taskId"]),
  ),
  tool(
    "loop.evidence.list",
    "List evidence objects attached to a task.",
    "loop:read",
    schema({ taskId: TASK_ID_SCHEMA }, ["taskId"]),
  ),
  tool(
    "loop.evidence.get",
    "Read one bounded evidence object attached to a task.",
    "loop:read",
    schema({ taskId: TASK_ID_SCHEMA, objectKey: { type: "string", minLength: 1 } }, [
      "taskId",
      "objectKey",
    ]),
  ),
  tool(
    "loop.tasks.create_draft",
    "Create an idempotent task draft from a complete Loop task contract.",
    "loop:plan",
    schema({ ...WRITE_METADATA_SCHEMA, contract: { type: "object" } }, ["contract"]),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.issues.create",
    "Create a Loop GitHub issue from a validated plan. Draft issues stay inert until marked ready.",
    "loop:plan",
    schema({ ...WRITE_METADATA_SCHEMA, contract: { type: "object" }, draft: { type: "boolean" } }, [
      "contract",
    ]),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.tasks.validate",
    "Validate a task contract and persist actionable diagnostics.",
    "loop:plan",
    schema(TASK_WRITE_SCHEMA, ["taskId"]),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.tasks.approve",
    "Approve a validated task for execution dispatch.",
    "loop:dispatch",
    schema(TASK_WRITE_SCHEMA, ["taskId"]),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.runs.advance",
    "Advance a task through an explicit execution phase.",
    "loop:dispatch",
    schema(
      {
        ...TASK_WRITE_SCHEMA,
        phase: {
          type: "string",
          enum: ["ALLOCATING", "PREPARING", "EXECUTING", "PUBLISHING", "VERIFYING", "REVIEWING"],
        },
      },
      ["taskId", "phase"],
    ),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.runs.start",
    "Start the durable workflow for an approved task.",
    "loop:dispatch",
    schema(TASK_WRITE_SCHEMA, ["taskId"]),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.runs.pause",
    "Pause a task and fence delayed runner events from the paused generation.",
    "loop:dispatch",
    schema({ ...TASK_WRITE_SCHEMA, reason: { type: "string" } }, ["taskId"]),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.runs.resume",
    "Resume a paused task with a fresh fenced workflow generation.",
    "loop:dispatch",
    schema(TASK_WRITE_SCHEMA, ["taskId"]),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.runs.cancel",
    "Cancel a task and fence late workspace or agent events.",
    "loop:dispatch",
    schema({ ...TASK_WRITE_SCHEMA, reason: { type: "string" } }, ["taskId"]),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.runs.recover",
    "Requeue an active task after a bounded runtime recovery decision.",
    "loop:dispatch",
    schema({ ...TASK_WRITE_SCHEMA, reason: { type: "string", minLength: 1 } }, [
      "taskId",
      "reason",
    ]),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.runs.escalate",
    "Stop automatic recovery and leave an auditable human-escalation terminal state.",
    "loop:dispatch",
    schema({ ...TASK_WRITE_SCHEMA, reason: { type: "string", minLength: 1 } }, [
      "taskId",
      "reason",
    ]),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.issues.mark_ready",
    "Mark a draft Loop issue ready for webhook intake and task creation.",
    "loop:dispatch",
    schema(
      {
        ...WRITE_METADATA_SCHEMA,
        owner: { type: "string", minLength: 1 },
        repository: { type: "string", minLength: 1 },
        issueNumber: { type: "integer", minimum: 1 },
      },
      ["owner", "repository", "issueNumber"],
    ),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.runs.request_repair",
    "Route an existing finding or failed gate to a bounded repair attempt.",
    "loop:repair",
    schema({ ...TASK_WRITE_SCHEMA, reason: { type: "string", minLength: 1 } }, [
      "taskId",
      "reason",
    ]),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.runs.set_head",
    "Bind a task to the exact repository head whose evidence is being reviewed.",
    "loop:dispatch",
    schema({ ...TASK_WRITE_SCHEMA, headSha: { type: "string", minLength: 1 } }, [
      "taskId",
      "headSha",
    ]),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.review.submit",
    "Submit a structured review verdict and findings for a task.",
    "loop:approve",
    schema(
      {
        ...TASK_WRITE_SCHEMA,
        verdict: { type: "string", enum: ["approved", "changes_requested", "replan_required"] },
        findings: { type: "array", items: { type: "object" } },
      },
      ["taskId", "verdict", "findings"],
    ),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.tasks.approve_completion",
    "Approve a review-complete task for the final completion transition.",
    "loop:approve",
    schema(TASK_WRITE_SCHEMA, ["taskId"]),
    WRITE_ANNOTATIONS,
  ),
  tool(
    "loop.tasks.complete",
    "Record final task completion after all required approvals and gates pass.",
    "loop:approve",
    schema(TASK_WRITE_SCHEMA, ["taskId"]),
    WRITE_ANNOTATIONS,
  ),
];

export function loopMcpToolDefinitions(): readonly Record<string, unknown>[] {
  return LOOP_MCP_TOOL_DEFINITIONS.map((definition) => {
    const securitySchemes = [{ type: "oauth2", scopes: [definition.requiredScope] }];
    return {
      name: definition.name,
      description: definition.description,
      inputSchema: definition.inputSchema,
      annotations: definition.annotations,
      securitySchemes,
      _meta: {
        securitySchemes,
        "io.modelcontextprotocol/required-scope": definition.requiredScope,
      },
    };
  });
}

function object(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label} must be an object`);
  return value as Record<string, unknown>;
}

function response(id: LoopMcpId | undefined, result: unknown): LoopMcpResponse {
  return { jsonrpc: "2.0", ...(id === undefined ? {} : { id }), result };
}

function error(id: LoopMcpId | undefined, code: number, message: string): LoopMcpResponse {
  return { jsonrpc: "2.0", ...(id === undefined ? {} : { id }), error: { code, message } };
}

function jsonRpcId(value: unknown): LoopMcpId | undefined {
  if (
    typeof value === "string" ||
    (typeof value === "number" && Number.isSafeInteger(value)) ||
    value === null
  )
    return value;
  return undefined;
}

function toolCallRequest(params: Record<string, unknown>): LoopToolRequest {
  const name = params.name;
  if (typeof name !== "string") throw new Error("tools/call requires a tool name");
  const rawArguments = object(params.arguments ?? {}, "tools/call arguments");
  const { expectedVersion, idempotencyKey, ...argumentsWithoutWriteMetadata } = rawArguments;
  return {
    name,
    arguments: argumentsWithoutWriteMetadata,
    ...(typeof expectedVersion === "number" ? { expectedVersion } : {}),
    ...(typeof idempotencyKey === "string" ? { idempotencyKey } : {}),
  };
}

export async function handleLoopMcpMessage(
  application: LoopApplication,
  principal: LoopPrincipal,
  message: LoopMcpMessage,
  dispatcher?: LoopRunDispatcher,
  options: LoopMcpOptions = {},
): Promise<LoopMcpResponse | null> {
  const id = jsonRpcId(message.id);
  if (message.id !== undefined && id === undefined)
    return error(undefined, -32600, "invalid JSON-RPC id");
  if (message.jsonrpc !== "2.0" || typeof message.method !== "string")
    return error(id, -32600, "invalid JSON-RPC request");
  if (message.method === "notifications/initialized" || message.method.startsWith("notifications/"))
    return null;
  if (message.method === "initialize") {
    return response(id, {
      protocolVersion: LOOP_MCP_PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      serverInfo: LOOP_MCP_SERVER_INFO,
      instructions: LOOP_MCP_INSTRUCTIONS,
    });
  }
  if (message.method === "ping") return response(id, {});
  if (message.method === "tools/list") return response(id, { tools: loopMcpToolDefinitions() });
  if (message.method !== "tools/call")
    return error(id, -32601, `method not found: ${message.method}`);

  try {
    const request = toolCallRequest(object(message.params ?? {}, "tools/call params"));
    const result = await createLoopToolRouter(application, principal, dispatcher, {
      ...(options.rolloutMode ? { rolloutMode: options.rolloutMode } : {}),
      ...(options.githubIssues ? { githubIssues: options.githubIssues } : {}),
      ...(options.capacity ? { capacity: options.capacity } : {}),
    }).invoke(request);
    return response(id, {
      content: [{ type: "text", text: compactJson(result.value) }],
      structuredContent: compactValue(result.value),
      isError: false,
    });
  } catch (caught) {
    const messageText = caught instanceof Error ? caught.message : "tool call failed";
    if (caught instanceof LoopToolAuthorizationError) {
      return response(id, {
        content: [{ type: "text", text: messageText }],
        structuredContent: { error: "forbidden", message: messageText },
        isError: true,
        _meta: {
          "mcp/www_authenticate": mcpAuthChallenge(caught.requiredScope, options.resourceMetadata),
        },
      });
    }
    return response(id, {
      content: [{ type: "text", text: messageText }],
      structuredContent: { error: "invalid_request", message: messageText },
      isError: true,
    });
  }
}

const MCP_STRUCTURED_STRING_MAX_CHARS = 30_000;

function compactValue(value: unknown, depth = 0): unknown {
  if (depth > 8 || value === null || value === undefined) return value;
  if (typeof value === "string") {
    return value.length <= MCP_STRUCTURED_STRING_MAX_CHARS
      ? value
      : `${value.slice(0, MCP_STRUCTURED_STRING_MAX_CHARS)}\n...[truncated]`;
  }
  if (Array.isArray(value)) return value.map((entry) => compactValue(entry, depth + 1));
  if (typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
      key,
      compactValue(entry, depth + 1),
    ]),
  );
}

function compactJson(value: unknown): string {
  return JSON.stringify(compactValue(value)) ?? "null";
}

function mcpAuthChallenge(
  requiredScope: string | undefined,
  resourceMetadata: string | undefined,
): string {
  const params = [
    requiredScope ? `scope="${requiredScope}"` : undefined,
    resourceMetadata ? `resource_metadata="${resourceMetadata}"` : undefined,
  ].filter(Boolean);
  return `Bearer${params.length ? ` ${params.join(", ")}` : ""}`;
}
