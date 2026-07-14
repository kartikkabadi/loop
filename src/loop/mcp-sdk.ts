import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";
import {
  LOOP_MCP_INSTRUCTIONS,
  LOOP_MCP_PROTOCOL_VERSION,
  LOOP_MCP_SERVER_INFO,
  loopMcpToolDefinitions,
} from "./mcp.js";
import type { LoopApplication } from "./application.js";
import {
  createLoopToolRouter,
  LoopToolAuthorizationError,
  type LoopCapacityReader,
  type LoopPrincipal,
  type LoopRunDispatcher,
} from "./tool-router.js";
import type { LoopRolloutMode } from "./rollout-policy.js";
import type { LoopGitHubIssuePublisher } from "./github-adapter.js";

type LoopSdkOptions = Readonly<{
  application: LoopApplication;
  principal: LoopPrincipal;
  dispatcher?: LoopRunDispatcher;
  rolloutMode?: LoopRolloutMode;
  resourceMetadata?: string;
  githubIssues?: LoopGitHubIssuePublisher;
  capacity?: LoopCapacityReader;
}>;

const taskId = z.string().min(1);
const objectKey = z.string().min(1);
const reason = z.string().min(1);
const writeMetadata = {
  expectedVersion: z.number().int().nonnegative().optional(),
  idempotencyKey: z.string().min(1).optional(),
};
const contract = z.record(z.string(), z.unknown());
const findings = z.array(z.record(z.string(), z.unknown()));

function stringValue(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function inputShape(name: string): Record<string, z.ZodType> {
  switch (name) {
    case "loop.tasks.list":
    case "loop.capacity.get":
    case "loop.runs.list":
    case "loop.review.queue":
      return {};
    case "loop.tasks.get":
    case "loop.review.get":
    case "loop.evidence.list":
      return { taskId };
    case "loop.evidence.get":
      return { taskId, objectKey };
    case "loop.tasks.create_draft":
      return { ...writeMetadata, contract };
    case "loop.issues.create":
      return { ...writeMetadata, contract, draft: z.boolean().optional() };
    case "loop.tasks.validate":
    case "loop.tasks.approve":
    case "loop.runs.start":
    case "loop.runs.resume":
    case "loop.tasks.approve_completion":
    case "loop.tasks.complete":
      return { ...writeMetadata, taskId };
    case "loop.runs.advance":
      return {
        ...writeMetadata,
        taskId,
        phase: z.enum([
          "ALLOCATING",
          "PREPARING",
          "EXECUTING",
          "PUBLISHING",
          "VERIFYING",
          "REVIEWING",
        ]),
      };
    case "loop.runs.pause":
    case "loop.runs.cancel":
    case "loop.runs.recover":
    case "loop.runs.escalate":
      return { ...writeMetadata, taskId, reason };
    case "loop.issues.mark_ready":
      return {
        ...writeMetadata,
        owner: z.string().min(1),
        repository: z.string().min(1),
        issueNumber: z.number().int().positive(),
      };
    case "loop.runs.request_repair":
      return { ...writeMetadata, taskId, reason };
    case "loop.runs.set_head":
      return { ...writeMetadata, taskId, headSha: z.string().min(1) };
    case "loop.review.submit":
      return {
        ...writeMetadata,
        taskId,
        verdict: z.enum(["approved", "changes_requested", "replan_required"]),
        findings,
      };
    default:
      return {};
  }
}

function compact(value: unknown, depth = 0): unknown {
  if (depth > 8 || value === null || value === undefined) return value;
  if (typeof value === "string")
    return value.length <= 30_000 ? value : `${value.slice(0, 30_000)}\n...[truncated]`;
  if (Array.isArray(value)) return value.map((entry) => compact(entry, depth + 1));
  if (typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
      key,
      compact(entry, depth + 1),
    ]),
  );
}

function toolResult(value: unknown): {
  content: [{ type: "text"; text: string }];
  structuredContent: Record<string, unknown>;
} {
  const compacted = compact(value);
  const structuredContent =
    compacted && typeof compacted === "object" && !Array.isArray(compacted)
      ? (compacted as Record<string, unknown>)
      : { value: compacted };
  return {
    content: [{ type: "text", text: JSON.stringify(compacted) ?? "null" }],
    structuredContent,
  };
}

/**
 * Official MCP SDK transport for authenticated Worker requests. The domain
 * router remains the policy boundary; the SDK owns protocol negotiation,
 * JSON-RPC validation, Streamable HTTP, and session/header semantics.
 */
export async function handleLoopSdkMcpRequest(
  request: Request,
  options: LoopSdkOptions,
): Promise<Response> {
  const server = new McpServer(LOOP_MCP_SERVER_INFO, { instructions: LOOP_MCP_INSTRUCTIONS });
  for (const definition of loopMcpToolDefinitions()) {
    const name = stringValue(definition.name, "loop.unknown");
    const requiredScope = stringValue(
      (definition._meta as Record<string, unknown> | undefined)?.[
        "io.modelcontextprotocol/required-scope"
      ] ?? "loop:read",
      "loop:read",
    );
    server.registerTool(
      name,
      {
        description: stringValue(definition.description, "Loop intent tool"),
        inputSchema: inputShape(name),
        annotations: definition.annotations as {
          readOnlyHint?: boolean;
          destructiveHint?: boolean;
          idempotentHint?: boolean;
          openWorldHint?: boolean;
        },
        _meta: definition._meta as Record<string, unknown>,
      },
      async (args) => {
        const raw = args as Record<string, unknown>;
        const { expectedVersion, idempotencyKey, ...toolArguments } = raw;
        try {
          const value = await createLoopToolRouter(
            options.application,
            options.principal,
            options.dispatcher,
            {
              ...(options.rolloutMode ? { rolloutMode: options.rolloutMode } : {}),
              ...(options.githubIssues ? { githubIssues: options.githubIssues } : {}),
              ...(options.capacity ? { capacity: options.capacity } : {}),
            },
          ).invoke({
            name,
            arguments: toolArguments,
            ...(typeof expectedVersion === "number" ? { expectedVersion } : {}),
            ...(typeof idempotencyKey === "string" ? { idempotencyKey } : {}),
          });
          return toolResult(value.value);
        } catch (error) {
          if (error instanceof LoopToolAuthorizationError) {
            return {
              ...toolResult({ error: "forbidden", message: "required scope is missing" }),
              isError: true,
              _meta: {
                "mcp/www_authenticate": `Bearer scope="${requiredScope}"${
                  options.resourceMetadata
                    ? `, resource_metadata="${options.resourceMetadata}"`
                    : ""
                }`,
              },
            };
          }
          return {
            ...toolResult({ error: "invalid_request", message: "request rejected" }),
            isError: true,
          };
        }
      },
    );
  }
  const transport = new WebStandardStreamableHTTPServerTransport({
    enableJsonResponse: true,
  });
  await server.connect(transport);
  try {
    const response = await transport.handleRequest(request);
    return new Response(response.body, {
      status: response.status,
      headers: {
        ...Object.fromEntries(response.headers.entries()),
        "access-control-expose-headers": "Mcp-Session-Id, MCP-Protocol-Version",
      },
    });
  } finally {
    await server.close();
  }
}

export { LOOP_MCP_PROTOCOL_VERSION };
