import {
  LoopToolAuthorizationError,
  createLoopToolRouter,
  type LoopCapacityReader,
  type LoopPrincipal,
  type LoopToolRequest,
} from "./tool-router.js";
import type { LoopApplication } from "./application.js";
import {
  handleLoopMcpMessage,
  loopMcpToolDefinitions,
  LOOP_MCP_INSTRUCTIONS,
  LOOP_MCP_PROTOCOL_VERSION,
  LOOP_MCP_SERVER_INFO,
} from "./mcp.js";
import type { LoopRunDispatcher } from "./tool-router.js";
import type { LoopRolloutMode } from "./rollout-policy.js";
import type { LoopGitHubIssuePublisher } from "./github-adapter.js";

export type LoopGatewayRequest = Readonly<{
  method: "GET" | "POST";
  path: string;
  headers: Readonly<Record<string, string | undefined>>;
  body?: unknown;
}>;

export type LoopGatewayResponse = Readonly<{
  status: number;
  headers: Readonly<Record<string, string>>;
  body: unknown;
}>;

export interface LoopGatewayAuthenticator {
  authenticate(
    headers: Readonly<Record<string, string | undefined>>,
  ): Promise<LoopPrincipal | null>;
}

export type LoopProtectedResourceMetadata = Readonly<{
  resource: string;
  resource_metadata?: string;
  authorization_servers: readonly string[];
  scopes_supported: readonly string[];
  resource_documentation: string;
}>;

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

function response(
  status: number,
  body: unknown,
  headers: Readonly<Record<string, string>> = JSON_HEADERS,
): LoopGatewayResponse {
  return { status, headers, body };
}

function errorResponse(status: number, code: string, message: string): LoopGatewayResponse {
  return response(status, { error: code, message });
}

function decodeRestToolName(path: string): string | undefined {
  const prefix = "/v1/tools/";
  if (!path.startsWith(prefix)) return undefined;
  const encoded = path.slice(prefix.length);
  if (!encoded) return undefined;
  try {
    const name = decodeURIComponent(encoded);
    return name.startsWith("loop.") && name.length > 5 ? name : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Transport-neutral gateway contract for a Cloudflare Worker or local HTTP
 * adapter. Authentication is injected; this module never parses or stores
 * bearer tokens and never exposes raw execution capabilities.
 */
export function createLoopGateway(
  options: Readonly<{
    application: LoopApplication;
    authenticator: LoopGatewayAuthenticator;
    metadata: LoopProtectedResourceMetadata;
    dispatcher?: LoopRunDispatcher;
    rolloutMode?: LoopRolloutMode;
    githubIssues?: LoopGitHubIssuePublisher;
    capacity?: LoopCapacityReader;
  }>,
) {
  return {
    async handle(request: LoopGatewayRequest): Promise<LoopGatewayResponse> {
      if (request.method === "GET" && request.path === "/.well-known/oauth-protected-resource")
        return response(200, options.metadata);
      if (request.method === "GET" && request.path === "/mcp") {
        return response(200, {
          protocol: "loop-intent-tools-v1",
          protocolVersion: LOOP_MCP_PROTOCOL_VERSION,
          serverInfo: LOOP_MCP_SERVER_INFO,
          instructions: LOOP_MCP_INSTRUCTIONS,
          ...(options.rolloutMode ? { rolloutMode: options.rolloutMode } : {}),
          tools: loopMcpToolDefinitions(),
        });
      }
      if (request.method === "GET" && request.path === "/docs/mcp") {
        return response(200, {
          name: LOOP_MCP_SERVER_INFO.name,
          version: LOOP_MCP_SERVER_INFO.version,
          endpoint: "/mcp",
          restEndpoint: "/v1/tools/{tool-name}",
          protocolVersion: LOOP_MCP_PROTOCOL_VERSION,
          scopes: options.metadata.scopes_supported,
          tools: loopMcpToolDefinitions(),
          policy:
            "Loop exposes intent-level task, run, evidence, and review operations. It never exposes raw shell, credentials, arbitrary agent prompts, or merge operations.",
        });
      }
      const restToolName = decodeRestToolName(request.path);
      if (request.method !== "POST" || (request.path !== "/mcp" && !restToolName))
        return errorResponse(404, "not_found", "Loop endpoint not found");

      const principal = await options.authenticator.authenticate(request.headers);
      if (!principal) {
        const challenge = options.metadata.resource_metadata
          ? {
              "www-authenticate": `Bearer resource_metadata="${options.metadata.resource_metadata}"`,
            }
          : {};
        return response(
          401,
          { error: "unauthorized", message: "a verified OAuth principal is required" },
          {
            ...JSON_HEADERS,
            ...challenge,
          },
        );
      }
      try {
        const body = request.body;
        if (!body || typeof body !== "object" || Array.isArray(body))
          return errorResponse(400, "invalid_request", "request body must be an object");
        const payload = body as Record<string, unknown>;
        if (payload.jsonrpc === "2.0") {
          if (request.path !== "/mcp")
            return errorResponse(400, "invalid_request", "JSON-RPC is only supported at /mcp");
          const mcpResponse = await handleLoopMcpMessage(
            options.application,
            principal,
            payload,
            options.dispatcher,
            {
              ...(options.metadata.resource_metadata
                ? { resourceMetadata: options.metadata.resource_metadata }
                : {}),
              ...(options.rolloutMode ? { rolloutMode: options.rolloutMode } : {}),
              ...(options.githubIssues ? { githubIssues: options.githubIssues } : {}),
              ...(options.capacity ? { capacity: options.capacity } : {}),
            },
          );
          return mcpResponse ? response(200, mcpResponse) : response(202, null);
        }
        const toolName = restToolName ?? (typeof payload.name === "string" ? payload.name : null);
        if (!toolName) return errorResponse(400, "invalid_request", "tool name is required");
        const toolRequest: LoopToolRequest = {
          name: toolName,
          arguments: payload.arguments,
          ...(typeof payload.expectedVersion === "number"
            ? { expectedVersion: payload.expectedVersion }
            : {}),
          ...(typeof payload.idempotencyKey === "string"
            ? { idempotencyKey: payload.idempotencyKey }
            : {}),
        };
        const router = createLoopToolRouter(options.application, principal, options.dispatcher, {
          ...(options.rolloutMode ? { rolloutMode: options.rolloutMode } : {}),
          ...(options.githubIssues ? { githubIssues: options.githubIssues } : {}),
          ...(options.capacity ? { capacity: options.capacity } : {}),
        });
        return response(200, await router.invoke(toolRequest));
      } catch (error) {
        if (error instanceof LoopToolAuthorizationError)
          return errorResponse(403, "forbidden", error.message);
        if (
          error instanceof Error &&
          /version conflict|stale|terminal|invalid phase|must be/.test(error.message)
        )
          return errorResponse(409, "conflict", error.message);
        return errorResponse(
          400,
          "invalid_request",
          error instanceof Error ? error.message : "request failed",
        );
      }
    },
  };
}
