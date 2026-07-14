import { LoopApplication, type LoopWriteOptions } from "./application.js";
import type { LoopTaskContract } from "./task-contract.js";
import type { LoopFinding } from "./task-state.js";
import type { LoopGitHubIssuePublisher } from "./github-adapter.js";
import { buildLoopWorkdayView } from "./human-summary.js";
import {
  assertLoopWorkflowAllowed,
  parseLoopRolloutMode,
  type LoopRolloutMode,
} from "./rollout-policy.js";

export type LoopScope =
  | "loop:read"
  | "loop:plan"
  | "loop:dispatch"
  | "loop:repair"
  | "loop:approve";
export type LoopPrincipal = Readonly<{ subject: string; scopes: readonly LoopScope[] }>;

export const LOOP_TOOL_SCOPES: Readonly<Record<string, LoopScope>> = {
  "loop.tasks.list": "loop:read",
  "loop.workday.get": "loop:read",
  "loop.capacity.get": "loop:read",
  "loop.tasks.get": "loop:read",
  "loop.review.get": "loop:read",
  "loop.evidence.list": "loop:read",
  "loop.evidence.get": "loop:read",
  "loop.tasks.create_draft": "loop:plan",
  "loop.issues.create": "loop:plan",
  "loop.tasks.validate": "loop:plan",
  "loop.tasks.approve": "loop:dispatch",
  "loop.runs.advance": "loop:dispatch",
  "loop.runs.start": "loop:dispatch",
  "loop.runs.pause": "loop:dispatch",
  "loop.runs.resume": "loop:dispatch",
  "loop.runs.cancel": "loop:dispatch",
  "loop.runs.recover": "loop:dispatch",
  "loop.runs.escalate": "loop:dispatch",
  "loop.issues.mark_ready": "loop:dispatch",
  "loop.runs.request_repair": "loop:repair",
  "loop.runs.set_head": "loop:dispatch",
  "loop.review.submit": "loop:approve",
  "loop.tasks.approve_completion": "loop:approve",
  "loop.tasks.complete": "loop:approve",
};

const LOOP_SCOPES = new Set<LoopScope>([
  "loop:read",
  "loop:plan",
  "loop:dispatch",
  "loop:repair",
  "loop:approve",
]);
const MAX_TOOL_INPUT_BYTES = 256 * 1024;
const MAX_TOOL_INPUT_DEPTH = 12;
const MAX_TOOL_INPUT_NODES = 5_000;
const MAX_TOOL_STRING_LENGTH = 64 * 1024;

export type LoopToolRequest = Readonly<{
  name: string;
  arguments: unknown;
  expectedVersion?: number;
  idempotencyKey?: string;
}>;

export type LoopToolResponse = Readonly<{ name: string; subject: string; value: unknown }>;

export interface LoopRunDispatcher {
  start(
    input: Readonly<{ taskId: string; expectedVersion: number }>,
  ): Promise<Readonly<{ workflowId: string }>>;
  signal?(
    input: Readonly<{
      taskId: string;
      type: "cancelled";
      cancellationGeneration: number;
      reason?: string;
    }>,
  ): Promise<void>;
}

export interface LoopCapacityReader {
  get(): Promise<unknown>;
}

export class LoopToolAuthorizationError extends Error {
  readonly requiredScope: LoopScope | undefined;

  constructor(message: string, requiredScope?: LoopScope) {
    super(message);
    this.name = "LoopToolAuthorizationError";
    this.requiredScope = requiredScope;
  }
}

function record(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label} must be an object`);
  return value as Record<string, unknown>;
}

function stringField(input: Record<string, unknown>, name: string): string {
  const value = input[name];
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.length > MAX_TOOL_STRING_LENGTH ||
    value.includes("\0")
  )
    throw new Error(`${name} must be a non-empty string`);
  return value;
}

function contractField(input: Record<string, unknown>): LoopTaskContract {
  const value = record(input.contract, "contract");
  const requiredObjects = [
    "identity",
    "repository",
    "problem",
    "authority",
    "scope",
    "constraints",
    "risk",
    "verification",
    "rollback",
    "budget",
    "approval",
  ];
  if (
    value.version !== 1 ||
    requiredObjects.some(
      (name) => !value[name] || typeof value[name] !== "object" || Array.isArray(value[name]),
    ) ||
    !Array.isArray(value.acceptanceCriteria)
  ) {
    throw new Error("contract is missing required task-contract sections");
  }
  return value as unknown as LoopTaskContract;
}

function findingsField(value: unknown): readonly LoopFinding[] {
  if (!Array.isArray(value)) throw new Error("findings must be an array");
  return value.map((entry, index) => {
    const finding = record(entry, `findings[${index}]`);
    const severity = finding.severity;
    const status = finding.status;
    if (typeof severity !== "string" || !["P0", "P1", "P2", "P3"].includes(severity))
      throw new Error(`findings[${index}].severity is invalid`);
    if (typeof status !== "string" || !["open", "addressed", "rejected"].includes(status))
      throw new Error(`findings[${index}].status is invalid`);
    return {
      id: stringField(finding, "id"),
      severity: severity as LoopFinding["severity"],
      title: stringField(finding, "title"),
      body: stringField(finding, "body"),
      status: status as LoopFinding["status"],
    };
  });
}

function writeOptions(request: LoopToolRequest): LoopWriteOptions {
  if (
    request.expectedVersion !== undefined &&
    (!Number.isSafeInteger(request.expectedVersion) || request.expectedVersion < 0)
  ) {
    throw new Error("expectedVersion must be a non-negative safe integer");
  }
  if (
    request.idempotencyKey !== undefined &&
    (!request.idempotencyKey ||
      request.idempotencyKey.length > 1024 ||
      request.idempotencyKey.includes("\0"))
  ) {
    throw new Error("idempotencyKey must be a non-empty NUL-free string");
  }
  return {
    ...(request.expectedVersion === undefined ? {} : { expectedVersion: request.expectedVersion }),
    ...(request.idempotencyKey === undefined ? {} : { idempotencyKey: request.idempotencyKey }),
  };
}

function assertSafeToolInput(value: unknown, depth = 0, state = { nodes: 0 }): void {
  if (depth === 0) {
    let serialized: string;
    try {
      serialized = JSON.stringify(value);
    } catch {
      throw new Error("tool arguments exceed safety limits");
    }
    if (
      serialized === undefined ||
      new TextEncoder().encode(serialized).byteLength > MAX_TOOL_INPUT_BYTES
    )
      throw new Error("tool arguments exceed safety limits");
  }
  if (++state.nodes > MAX_TOOL_INPUT_NODES || depth > MAX_TOOL_INPUT_DEPTH)
    throw new Error("tool arguments exceed safety limits");
  if (typeof value === "string") {
    if (value.length > MAX_TOOL_STRING_LENGTH)
      throw new Error("tool arguments exceed safety limits");
    return;
  }
  if (Array.isArray(value)) {
    for (const entry of value) assertSafeToolInput(entry, depth + 1, state);
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      if (key.length > 1024) throw new Error("tool arguments exceed safety limits");
      assertSafeToolInput(entry, depth + 1, state);
    }
  }
}

function validatePrincipal(principal: LoopPrincipal): void {
  if (
    typeof principal.subject !== "string" ||
    principal.subject.length === 0 ||
    principal.subject.length > 1024 ||
    principal.subject.includes("\0") ||
    !Array.isArray(principal.scopes) ||
    principal.scopes.some((scope) => !LOOP_SCOPES.has(scope))
  )
    throw new Error("invalid authenticated principal");
}

function taskId(request: LoopToolRequest): string {
  return stringField(record(request.arguments, "arguments"), "taskId");
}

/**
 * Intent-level tool adapter. It is transport-neutral: an HTTP or MCP gateway
 * authenticates a request, constructs the principal, and delegates here.
 * There is intentionally no shell, secret, provider, or raw-agent operation.
 */
export function createLoopToolRouter(
  application: LoopApplication,
  principal: LoopPrincipal,
  dispatcher?: LoopRunDispatcher,
  routerOptions: Readonly<{
    rolloutMode?: LoopRolloutMode;
    githubIssues?: LoopGitHubIssuePublisher;
    capacity?: LoopCapacityReader;
  }> = {},
) {
  validatePrincipal(principal);
  const scopes = new Set(principal.scopes);
  const rolloutMode = routerOptions.rolloutMode ?? parseLoopRolloutMode(undefined);
  return {
    async invoke(request: LoopToolRequest): Promise<LoopToolResponse> {
      assertSafeToolInput(request.arguments);
      const required = LOOP_TOOL_SCOPES[request.name];
      if (!required) throw new Error(`unknown Loop tool: ${request.name}`);
      if (!scopes.has(required))
        throw new LoopToolAuthorizationError(
          `subject ${principal.subject} lacks ${required}`,
          required,
        );
      const args = record(request.arguments, "arguments");
      const options = { ...writeOptions(request), actorSubject: principal.subject };
      switch (request.name) {
        case "loop.tasks.list":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.listTasks(),
          };
        case "loop.workday.get":
          return {
            name: request.name,
            subject: principal.subject,
            value: buildLoopWorkdayView(
              await application.listTasks(),
              new Date().toISOString(),
              routerOptions.capacity ? await routerOptions.capacity.get() : undefined,
            ),
          };
        case "loop.capacity.get":
          if (!routerOptions.capacity) throw new Error("provider capacity is not configured");
          return {
            name: request.name,
            subject: principal.subject,
            value: await routerOptions.capacity.get(),
          };
        case "loop.tasks.get":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.getTask(taskId(request)),
          };
        case "loop.review.get":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.getReviewPacket(taskId(request)),
          };
        case "loop.evidence.list":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.listEvidence(taskId(request)),
          };
        case "loop.evidence.get":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.getEvidence(taskId(request), stringField(args, "objectKey")),
          };
        case "loop.tasks.create_draft":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.createDraft(contractField(args), options),
          };
        case "loop.issues.create": {
          if (!routerOptions.githubIssues)
            throw new Error("GitHub issue publication is not configured");
          const contract = contractField(args);
          const draft = args.draft === undefined ? true : args.draft;
          if (typeof draft !== "boolean") throw new Error("draft must be a boolean");
          return {
            name: request.name,
            subject: principal.subject,
            value: await routerOptions.githubIssues.createIssue({ contract, draft }),
          };
        }
        case "loop.tasks.validate":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.validate(taskId(request), options),
          };
        case "loop.tasks.approve":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.approve(taskId(request), options),
          };
        case "loop.runs.advance":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.advance(
              taskId(request),
              stringField(args, "phase") as Parameters<LoopApplication["advance"]>[1],
              options,
            ),
          };
        case "loop.runs.start": {
          if (!dispatcher) throw new Error("workflow dispatcher is not configured");
          if (options.expectedVersion === undefined)
            throw new Error("expectedVersion is required to start a run");
          const task = await application.getTask(taskId(request));
          assertLoopWorkflowAllowed(task.contract, rolloutMode);
          const workflow = await dispatcher.start({
            taskId: task.taskId,
            expectedVersion: options.expectedVersion,
          });
          return {
            name: request.name,
            subject: principal.subject,
            value: workflow,
          };
        }
        case "loop.runs.pause":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.pause(taskId(request), options),
          };
        case "loop.runs.resume":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.resume(taskId(request), options),
          };
        case "loop.runs.cancel": {
          const value = await application.cancel(
            taskId(request),
            stringField(args, "reason"),
            options,
          );
          await dispatcher?.signal?.({
            taskId: value.taskId,
            type: "cancelled",
            cancellationGeneration: value.cancellationGeneration,
            reason: String(args.reason),
          });
          return {
            name: request.name,
            subject: principal.subject,
            value,
          };
        }
        case "loop.runs.recover":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.recover(taskId(request), stringField(args, "reason"), options),
          };
        case "loop.runs.escalate":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.escalate(
              taskId(request),
              stringField(args, "reason"),
              options,
            ),
          };
        case "loop.issues.mark_ready": {
          if (!routerOptions.githubIssues)
            throw new Error("GitHub issue publication is not configured");
          const issueNumber = args.issueNumber;
          if (
            typeof issueNumber !== "number" ||
            !Number.isSafeInteger(issueNumber) ||
            issueNumber < 1
          )
            throw new Error("issueNumber must be a positive integer");
          return {
            name: request.name,
            subject: principal.subject,
            value: await routerOptions.githubIssues.markIssueReady({
              owner: stringField(args, "owner"),
              repository: stringField(args, "repository"),
              issueNumber,
            }),
          };
        }
        case "loop.runs.request_repair":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.requestRepair(
              taskId(request),
              stringField(args, "reason"),
              options,
            ),
          };
        case "loop.runs.set_head":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.setHead(
              taskId(request),
              stringField(args, "headSha"),
              options,
            ),
          };
        case "loop.review.submit": {
          const verdict = stringField(args, "verdict");
          if (
            verdict !== "approved" &&
            verdict !== "changes_requested" &&
            verdict !== "replan_required"
          )
            throw new Error("invalid review verdict");
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.submitReview(
              taskId(request),
              verdict,
              findingsField(args.findings),
              options,
            ),
          };
        }
        case "loop.tasks.approve_completion":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.approveCompletion(taskId(request), options),
          };
        case "loop.tasks.complete":
          return {
            name: request.name,
            subject: principal.subject,
            value: await application.completeTask(taskId(request), options),
          };
        default:
          throw new Error(`unsupported Loop tool: ${request.name}`);
      }
    },
  };
}
