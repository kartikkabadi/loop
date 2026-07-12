/**
 * Production Devin ACP AgentSessionRuntime.
 *
 * Speaks ACP v1 over local stdio with `devin acp`. Does not provision Boxes,
 * contact Crabbox, mutate GitHub, or validate structured results.
 */

import { createHash } from "node:crypto";
import { existsSync, realpathSync } from "node:fs";
import path from "node:path";
import type {
  AgentCancelInput,
  AgentPromptInput,
  AgentPromptResult,
  AgentSession,
  AgentSessionRuntime,
  CreateAgentSessionInput,
  InitializedAgentSessionRuntimeBoth,
  LoadAgentSessionInput,
} from "../agent-session-runtime.js";
import {
  AcpTransportError,
  createAcpStdioTransport,
  type AcpStdioTransport,
} from "./acp-stdio-transport.js";
import {
  classifyDevinAcpHostRequest,
  denyAllDevinAcpHostServices,
  DevinAcpToolCallCache,
  mergePermissionParamsWithToolCallCache,
  type DevinAcpHostServices,
} from "./devin-acp-host-services.js";

const PROTOCOL_VERSION = 1 as const;
const DEFAULT_REQUEST_TIMEOUT_MS = 180_000;
const DEFAULT_SHUTDOWN_GRACE_MS = 3_000;
const DEFAULT_MAX_LINE_BYTES = 1_048_576;
const DEFAULT_MAX_OUTPUT_BYTES = 1_048_576;
const DEFAULT_CANCEL_WAIT_MS = 30_000;

const FORBIDDEN_ENV_EXACT = new Set([
  "GH_TOKEN",
  "GITHUB_TOKEN",
  "CLAWSWEEPER_APP_PRIVATE_KEY",
  "CLAWSWEEPER_APP_ID",
  "ASCII_BOX_API_KEY",
  "CRABBOX_ASCII_BOX_API_KEY",
  "CRABBOX_COORDINATOR_TOKEN",
  "CLOUDFLARE_API_TOKEN",
  "CLOUDFLARE_ACCOUNT_ID",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_SESSION_TOKEN",
  "OPENAI_API_KEY",
  "CODEX_API_KEY",
  "CODEX_ACCESS_TOKEN",
]);

const FORBIDDEN_ENV_PREFIXES = [
  "GITHUB_",
  "CLAWSWEEPER_",
  "CRABBOX_",
  "ASCII_BOX_",
  "CLOUDFLARE_",
  "CF_",
  "AWS_",
  "OPENAI_",
  "CODEX_",
] as const;

const ALLOWED_ENV_KEYS = new Set([
  "PATH",
  "HOME",
  "USER",
  "LOGNAME",
  "SHELL",
  "TMPDIR",
  "TMP",
  "TEMP",
  "LANG",
  "LC_ALL",
  "LC_CTYPE",
  "TERM",
  "COLORTERM",
  "XDG_DATA_HOME",
  "XDG_CONFIG_HOME",
  "XDG_STATE_HOME",
  "XDG_CACHE_HOME",
  "XDG_RUNTIME_DIR",
]);

export type DevinAcpRuntimeErrorCode =
  | "E_DEVIN_ACP_VALIDATION"
  | "E_DEVIN_ACP_STATE"
  | "E_DEVIN_ACP_AUTH"
  | "E_DEVIN_ACP_PROTOCOL"
  | "E_DEVIN_ACP_OUTPUT_LIMIT"
  | "E_DEVIN_ACP_SESSION"
  | "E_DEVIN_ACP_CANCEL";

export class DevinAcpRuntimeError extends Error {
  readonly code: DevinAcpRuntimeErrorCode;

  constructor(code: DevinAcpRuntimeErrorCode, message: string) {
    super(message);
    this.name = "DevinAcpRuntimeError";
    this.code = code;
  }
}

export type DevinAcpRuntimeEvent =
  | { type: "process_started"; pid: number }
  | {
      type: "initialized";
      protocolVersion: 1;
      agentName?: string;
      agentVersion?: string;
    }
  | { type: "session_created"; sessionIdDigest: string }
  | { type: "session_loaded"; sessionIdDigest: string }
  | { type: "prompt_started"; sessionIdDigest: string }
  | { type: "session_update"; sessionIdDigest: string; updateKind: string }
  | { type: "host_request"; requestKind: string; outcome: "handled" | "rejected" }
  | {
      type: "prompt_completed";
      sessionIdDigest: string;
      stopReason: string;
      outputBytes: number;
    }
  | { type: "process_exited"; exitCode: number | null; signal: string | null }
  | {
      type: "environment_scrubbed";
      allowedKeyCount: number;
      allowedKeys: readonly string[];
    };

export type DevinAcpRuntimeOptions = Readonly<{
  workspaceRoot: string;
  parentEnv: Readonly<NodeJS.ProcessEnv>;
  hostServices?: DevinAcpHostServices;
  devinCommand?: string;
  devinArgs?: readonly string[];
  requestTimeoutMs?: number;
  shutdownGraceMs?: number;
  maxProtocolLineBytes?: number;
  maxOutputBytes?: number;
  eventSink?: (event: DevinAcpRuntimeEvent) => void;
}>;

export type DevinAcpRuntimeController = Readonly<{
  runtime: AgentSessionRuntime;
  shutdown(): Promise<void>;
}>;

type LiveSession = {
  id: string;
  cwd: string;
  lastStopReason: string | null;
};

type ActivePrompt = {
  sessionId: string;
  outputText: string;
  outputBytes: number;
  outputLimitError: DevinAcpRuntimeError | null;
  settle: {
    resolve: (value: AgentPromptResult) => void;
    reject: (error: Error) => void;
  } | null;
  promptPromise: Promise<AgentPromptResult>;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertSafeString(label: string, value: string): void {
  if (!value || value.includes("\0")) {
    throw new DevinAcpRuntimeError("E_DEVIN_ACP_VALIDATION", `${label} is empty or contains NUL`);
  }
}

function assertFinitePositiveInt(
  label: string,
  value: number | undefined,
  fallback: number,
): number {
  if (value === undefined) return fallback;
  if (!Number.isFinite(value) || !Number.isInteger(value) || value <= 0) {
    throw new DevinAcpRuntimeError("E_DEVIN_ACP_VALIDATION", `${label} must be a positive integer`);
  }
  return value;
}

function digestSessionId(sessionId: string): string {
  return createHash("sha256").update(sessionId).digest("hex");
}

function extractTextContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (isPlainObject(content) && typeof content.text === "string") return content.text;
  if (Array.isArray(content)) {
    let out = "";
    for (const part of content) {
      if (typeof part === "string") out += part;
      else if (isPlainObject(part) && typeof part.text === "string") out += part.text;
    }
    return out;
  }
  return "";
}

function isAssistantMessageUpdate(update: Record<string, unknown>): boolean {
  const kind = update.sessionUpdate;
  return kind === "agent_message_chunk" || kind === "agent_message";
}

function isThoughtUpdate(update: Record<string, unknown>): boolean {
  const kind = update.sessionUpdate;
  return (
    kind === "agent_thought_chunk" ||
    kind === "agent_thought" ||
    kind === "thought_chunk" ||
    kind === "reasoning"
  );
}

export function scrubDevinAcpChildEnv(parentEnv: Readonly<NodeJS.ProcessEnv>): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const key of Object.keys(parentEnv)) {
    if (FORBIDDEN_ENV_EXACT.has(key)) continue;
    if (FORBIDDEN_ENV_PREFIXES.some((prefix) => key.startsWith(prefix))) continue;
    if (!ALLOWED_ENV_KEYS.has(key) && !key.startsWith("LC_") && !key.startsWith("XDG_")) {
      continue;
    }
    const value = parentEnv[key];
    if (value !== undefined) env[key] = value;
  }
  if (!env.PATH && parentEnv.PATH) env.PATH = parentEnv.PATH;
  if (!env.HOME && parentEnv.HOME) env.HOME = parentEnv.HOME;
  return env;
}

function resolveInsideWorkspace(workspaceRoot: string, candidate: string): string {
  assertSafeString("path", candidate);
  const rootReal = realpathSync(workspaceRoot);
  const abs = path.isAbsolute(candidate)
    ? path.resolve(candidate)
    : path.resolve(rootReal, candidate);

  let real: string;
  try {
    if (existsSync(abs)) {
      real = realpathSync(abs);
    } else {
      let cur = abs;
      const missing: string[] = [];
      while (!existsSync(cur)) {
        missing.unshift(path.basename(cur));
        const parent = path.dirname(cur);
        if (parent === cur) break;
        cur = parent;
      }
      const parentReal = realpathSync(cur);
      real = path.join(parentReal, ...missing);
    }
  } catch (error) {
    throw new DevinAcpRuntimeError(
      "E_DEVIN_ACP_VALIDATION",
      `path resolve failed: ${error instanceof Error ? error.message : "unknown"}`,
    );
  }

  const rootPrefix = rootReal.endsWith(path.sep) ? rootReal : `${rootReal}${path.sep}`;
  if (real !== rootReal && !real.startsWith(rootPrefix)) {
    throw new DevinAcpRuntimeError("E_DEVIN_ACP_VALIDATION", "path escapes workspace root");
  }
  return abs;
}

class MethodNotFoundError extends Error {
  readonly code = -32601;
  constructor(method: string) {
    super(`Method not found: ${method}`);
    this.name = "MethodNotFoundError";
  }
}

class DevinAcpRuntimeImpl implements AgentSessionRuntime {
  readonly #workspaceRoot: string;
  readonly #childEnv: NodeJS.ProcessEnv;
  readonly #hostServices: DevinAcpHostServices;
  readonly #command: string;
  readonly #args: readonly string[];
  readonly #requestTimeoutMs: number;
  readonly #shutdownGraceMs: number;
  readonly #maxLineBytes: number;
  readonly #maxOutputBytes: number;
  readonly #eventSink: ((event: DevinAcpRuntimeEvent) => void) | undefined;
  readonly #sessions = new Map<string, LiveSession>();
  readonly #toolCallCache = new DevinAcpToolCallCache();

  #transport: AcpStdioTransport | null = null;
  #initialized = false;
  #shutDown = false;
  #processExited = false;
  #continuationDisabled = false;
  #activePrompt: ActivePrompt | null = null;
  #info: InitializedAgentSessionRuntimeBoth["info"] | null = null;

  constructor(options: DevinAcpRuntimeOptions) {
    assertSafeString("workspaceRoot", options.workspaceRoot);
    if (!path.isAbsolute(options.workspaceRoot)) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_VALIDATION", "workspaceRoot must be absolute");
    }
    this.#workspaceRoot = realpathSync(options.workspaceRoot);

    const command = options.devinCommand ?? "devin";
    assertSafeString("devinCommand", command);
    const args = options.devinArgs ?? ["acp"];
    for (const arg of args) assertSafeString("devinArgs", arg);

    this.#command = command;
    this.#args = args;
    this.#hostServices = options.hostServices ?? denyAllDevinAcpHostServices;
    this.#requestTimeoutMs = assertFinitePositiveInt(
      "requestTimeoutMs",
      options.requestTimeoutMs,
      DEFAULT_REQUEST_TIMEOUT_MS,
    );
    this.#shutdownGraceMs = assertFinitePositiveInt(
      "shutdownGraceMs",
      options.shutdownGraceMs,
      DEFAULT_SHUTDOWN_GRACE_MS,
    );
    this.#maxLineBytes = assertFinitePositiveInt(
      "maxProtocolLineBytes",
      options.maxProtocolLineBytes,
      DEFAULT_MAX_LINE_BYTES,
    );
    this.#maxOutputBytes = assertFinitePositiveInt(
      "maxOutputBytes",
      options.maxOutputBytes,
      DEFAULT_MAX_OUTPUT_BYTES,
    );
    this.#eventSink = options.eventSink;
    this.#childEnv = scrubDevinAcpChildEnv(options.parentEnv);
    this.#emit({
      type: "environment_scrubbed",
      allowedKeyCount: Object.keys(this.#childEnv).length,
      allowedKeys: Object.keys(this.#childEnv).sort(),
    });
  }

  async initialize(): Promise<InitializedAgentSessionRuntimeBoth> {
    this.#assertNotShutDown();
    if (this.#initialized) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_STATE", "runtime already initialized");
    }

    const transport = createAcpStdioTransport({
      command: this.#command,
      args: this.#args,
      cwd: this.#workspaceRoot,
      env: this.#childEnv,
      requestTimeoutMs: this.#requestTimeoutMs,
      shutdownGraceMs: this.#shutdownGraceMs,
      maxLineBytes: this.#maxLineBytes,
      requestHandler: (method, params) => this.#onHostRequest(method, params),
      notificationHandler: (method, params) => this.#onNotification(method, params),
      stderrHandler: () => {
        /* diagnostics only; never protocol, never logged into events */
      },
    });

    await transport.start();
    this.#transport = transport;
    if (typeof transport.pid === "number") {
      this.#emit({ type: "process_started", pid: transport.pid });
    }

    let initResult: unknown;
    try {
      initResult = await transport.request("initialize", {
        protocolVersion: PROTOCOL_VERSION,
        clientCapabilities: {
          fs: { readTextFile: true, writeTextFile: false },
          terminal: true,
        },
        clientInfo: {
          name: "loop-devin-acp",
          title: "Loop Devin ACP Runtime",
          version: "1.0.0",
        },
      });
    } catch (error) {
      await this.shutdown().catch(() => undefined);
      throw error;
    }

    if (!isPlainObject(initResult) || initResult.protocolVersion !== PROTOCOL_VERSION) {
      await this.shutdown().catch(() => undefined);
      throw new DevinAcpRuntimeError(
        "E_DEVIN_ACP_PROTOCOL",
        "ACP initialize did not negotiate protocol version 1",
      );
    }

    const agentInfo = isPlainObject(initResult.agentInfo) ? initResult.agentInfo : undefined;
    const agentName = agentInfo && typeof agentInfo.name === "string" ? agentInfo.name : undefined;
    const agentVersion =
      agentInfo && typeof agentInfo.version === "string" ? agentInfo.version : undefined;

    this.#assertStoredAuthUsable(initResult);

    this.#info = {
      protocolVersion: PROTOCOL_VERSION,
      ...(agentName !== undefined ? { agentName } : {}),
      ...(agentVersion !== undefined ? { agentVersion } : {}),
    };
    this.#initialized = true;
    this.#emit({
      type: "initialized",
      protocolVersion: PROTOCOL_VERSION,
      ...(agentName !== undefined ? { agentName } : {}),
      ...(agentVersion !== undefined ? { agentVersion } : {}),
    });

    return this.#initializedRuntime();
  }

  async shutdown(): Promise<void> {
    if (this.#shutDown) return;
    this.#shutDown = true;

    const transport = this.#transport;
    if (this.#activePrompt && transport && !this.#processExited) {
      try {
        await transport.notify("session/cancel", { sessionId: this.#activePrompt.sessionId });
        await Promise.race([
          this.#activePrompt.promptPromise.catch(() => undefined),
          delay(Math.min(this.#shutdownGraceMs, DEFAULT_CANCEL_WAIT_MS)),
        ]);
      } catch {
        /* best-effort */
      }
    }

    if (this.#activePrompt?.settle) {
      this.#activePrompt.settle.reject(
        new DevinAcpRuntimeError("E_DEVIN_ACP_STATE", "runtime shut down during prompt"),
      );
      this.#activePrompt.settle = null;
    }
    this.#activePrompt = null;
    this.#sessions.clear();
    this.#toolCallCache.clear();

    if (transport) {
      await transport.shutdown();
    }
    this.#transport = null;
    this.#processExited = true;
    this.#emit({ type: "process_exited", exitCode: null, signal: null });
  }

  #initializedRuntime(): InitializedAgentSessionRuntimeBoth {
    const info = this.#info;
    if (!info) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_STATE", "runtime is not initialized");
    }
    return {
      info,
      capabilities: { continueSession: true, loadSession: true },
      createSession: (input) => this.#createSession(input),
      prompt: (input) => this.#prompt(input, { isContinuation: false }),
      continueSession: (input) => this.#prompt(input, { isContinuation: true }),
      loadSession: (input) => this.#loadSession(input),
      cancel: (input) => this.#cancel(input),
    };
  }

  async #createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
    this.#assertReady();
    const cwd = resolveInsideWorkspace(this.#workspaceRoot, input.cwd);
    const result = await this.#transport!.request("session/new", {
      cwd,
      mcpServers: [],
    });
    if (!isPlainObject(result) || typeof result.sessionId !== "string" || !result.sessionId) {
      throw new DevinAcpRuntimeError(
        "E_DEVIN_ACP_SESSION",
        "session/new returned invalid sessionId",
      );
    }
    assertSafeString("sessionId", result.sessionId);
    this.#sessions.set(result.sessionId, { id: result.sessionId, cwd, lastStopReason: null });
    this.#emit({ type: "session_created", sessionIdDigest: digestSessionId(result.sessionId) });
    return { id: result.sessionId, cwd };
  }

  async #loadSession(input: LoadAgentSessionInput): Promise<AgentSession> {
    this.#assertReady();
    assertSafeString("sessionId", input.sessionId);
    const cwd = resolveInsideWorkspace(this.#workspaceRoot, input.cwd);
    const result = await this.#transport!.request("session/load", {
      sessionId: input.sessionId,
      cwd,
      mcpServers: [],
    });
    const returnedId =
      isPlainObject(result) && typeof result.sessionId === "string"
        ? result.sessionId
        : input.sessionId;
    if (returnedId !== input.sessionId) {
      throw new DevinAcpRuntimeError(
        "E_DEVIN_ACP_SESSION",
        "session/load returned a different sessionId",
      );
    }
    this.#sessions.set(input.sessionId, { id: input.sessionId, cwd, lastStopReason: null });
    this.#emit({ type: "session_loaded", sessionIdDigest: digestSessionId(input.sessionId) });
    return { id: input.sessionId, cwd };
  }

  async #prompt(
    input: AgentPromptInput,
    options: { isContinuation: boolean },
  ): Promise<AgentPromptResult> {
    this.#assertReady();
    assertSafeString("sessionId", input.sessionId);
    assertSafeString("text", input.text);
    if (Buffer.byteLength(input.text, "utf8") > this.#maxOutputBytes) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_VALIDATION", "prompt text exceeds byte limit");
    }

    const session = this.#sessions.get(input.sessionId);
    if (!session) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_SESSION", "unknown session");
    }
    if (this.#activePrompt) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_STATE", "concurrent prompt rejected");
    }
    if (this.#continuationDisabled || this.#processExited) {
      throw new DevinAcpRuntimeError(
        "E_DEVIN_ACP_STATE",
        "runtime process is no longer usable for prompts",
      );
    }
    if (options.isContinuation) {
      if (session.lastStopReason === null) {
        throw new DevinAcpRuntimeError(
          "E_DEVIN_ACP_STATE",
          "continuation requires a prior completed prompt",
        );
      }
      if (session.lastStopReason === "cancelled") {
        throw new DevinAcpRuntimeError(
          "E_DEVIN_ACP_STATE",
          "continuation after cancelled prompt is unsupported",
        );
      }
    }

    const digest = digestSessionId(input.sessionId);
    this.#emit({ type: "prompt_started", sessionIdDigest: digest });

    let settle!: {
      resolve: (value: AgentPromptResult) => void;
      reject: (error: Error) => void;
    };
    const promptPromise = new Promise<AgentPromptResult>((resolve, reject) => {
      settle = { resolve, reject };
    });
    // Absorb so settle.reject during the throw path is not an unhandled rejection.
    void promptPromise.then(
      () => undefined,
      () => undefined,
    );

    const active: ActivePrompt = {
      sessionId: input.sessionId,
      outputText: "",
      outputBytes: 0,
      outputLimitError: null,
      settle,
      promptPromise,
    };
    this.#activePrompt = active;

    try {
      const result = await this.#transport!.request("session/prompt", {
        sessionId: input.sessionId,
        prompt: [{ type: "text", text: input.text }],
      });

      if (active.outputLimitError) {
        throw active.outputLimitError;
      }

      if (!isPlainObject(result) || typeof result.stopReason !== "string") {
        throw new DevinAcpRuntimeError(
          "E_DEVIN_ACP_PROTOCOL",
          "session/prompt returned invalid stopReason",
        );
      }

      const promptResult: AgentPromptResult = {
        sessionId: input.sessionId,
        stopReason: result.stopReason,
        outputText: active.outputText,
      };
      session.lastStopReason = result.stopReason;
      this.#toolCallCache.clear();
      this.#emit({
        type: "prompt_completed",
        sessionIdDigest: digest,
        stopReason: result.stopReason,
        outputBytes: active.outputBytes,
      });
      settle.resolve(promptResult);
      return promptResult;
    } catch (error) {
      this.#toolCallCache.clear();
      if (this.#processExited) {
        this.#continuationDisabled = true;
      }
      const wrapped =
        error instanceof Error
          ? error
          : new DevinAcpRuntimeError("E_DEVIN_ACP_PROTOCOL", "prompt failed");
      if (active.settle) settle.reject(wrapped);
      throw wrapped;
    } finally {
      if (this.#activePrompt === active) this.#activePrompt = null;
      active.settle = null;
    }
  }

  async #cancel(input: AgentCancelInput): Promise<void> {
    this.#assertReady();
    assertSafeString("sessionId", input.sessionId);
    if (!this.#activePrompt || this.#activePrompt.sessionId !== input.sessionId) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_CANCEL", "no active prompt for session");
    }
    await this.#transport!.notify("session/cancel", { sessionId: input.sessionId });
  }

  async #onHostRequest(method: string, params: unknown): Promise<unknown> {
    const classified = classifyDevinAcpHostRequest(method, params);
    if (!classified) {
      throw new MethodNotFoundError(method);
    }

    let request = classified;
    if (classified.kind === "permission") {
      const merged = mergePermissionParamsWithToolCallCache(params, this.#toolCallCache);
      request = { ...classified, params: merged };
    }

    try {
      const result = await this.#hostServices.handle(request);
      this.#emit({ type: "host_request", requestKind: classified.kind, outcome: "handled" });
      return result;
    } catch (error) {
      this.#emit({ type: "host_request", requestKind: classified.kind, outcome: "rejected" });
      if (error instanceof MethodNotFoundError) throw error;
      if (error instanceof Error && "code" in error) throw error;
      const wrapped = new Error("host request denied");
      (wrapped as Error & { code: number }).code = -32000;
      throw wrapped;
    }
  }

  #onNotification(method: string, params: unknown): void {
    if (method !== "session/update") return;
    if (!isPlainObject(params)) return;
    const sessionId = typeof params.sessionId === "string" ? params.sessionId : "";
    const update = isPlainObject(params.update) ? params.update : null;
    if (!update) return;

    const updateKind =
      typeof update.sessionUpdate === "string"
        ? update.sessionUpdate
        : typeof update.type === "string"
          ? update.type
          : "unknown";

    if (sessionId) {
      this.#emit({
        type: "session_update",
        sessionIdDigest: digestSessionId(sessionId),
        updateKind,
      });
    }

    const toolCallId =
      typeof update.toolCallId === "string"
        ? update.toolCallId
        : typeof update.toolCallID === "string"
          ? update.toolCallID
          : null;
    if (
      toolCallId &&
      (update.sessionUpdate === "tool_call" || update.sessionUpdate === "tool_call_update")
    ) {
      this.#toolCallCache.merge(toolCallId, update);
    }

    if (!this.#activePrompt || !sessionId || this.#activePrompt.sessionId !== sessionId) {
      return;
    }
    if (isThoughtUpdate(update)) return;
    if (!isAssistantMessageUpdate(update)) return;

    const chunk = extractTextContent(update.content);
    if (!chunk) return;
    if (this.#activePrompt.outputLimitError) return;
    const nextBytes = this.#activePrompt.outputBytes + Buffer.byteLength(chunk, "utf8");
    if (nextBytes > this.#maxOutputBytes) {
      this.#activePrompt.outputLimitError = new DevinAcpRuntimeError(
        "E_DEVIN_ACP_OUTPUT_LIMIT",
        "assistant output exceeded host byte limit",
      );
      return;
    }
    this.#activePrompt.outputText += chunk;
    this.#activePrompt.outputBytes = nextBytes;
  }

  #assertStoredAuthUsable(initResult: Record<string, unknown>): void {
    const methods = Array.isArray(initResult.authMethods) ? initResult.authMethods : [];
    if (methods.length === 0) return;

    const methodId = (method: unknown): string => {
      if (!isPlainObject(method)) return "";
      if (typeof method.id === "string") return method.id;
      if (typeof method.method === "string") return method.method;
      if (typeof method.name === "string") return method.name;
      return "";
    };

    const browserOnly = methods.every((method) => {
      const id = methodId(method);
      return id.includes("browser") || id.includes("pkce") || id.includes("device");
    });
    if (browserOnly) return;

    // Non-browser auth methods present without an interactive path in this PR.
    // Phase 0 used stored credentials when browser-only; fail closed otherwise.
    const hasNonInteractive = methods.some((method) => {
      const id = methodId(method);
      return (
        id.length > 0 && !id.includes("browser") && !id.includes("pkce") && !id.includes("device")
      );
    });
    if (hasNonInteractive && !this.#childEnv.HOME && !this.#childEnv.XDG_DATA_HOME) {
      throw new DevinAcpRuntimeError(
        "E_DEVIN_ACP_AUTH",
        "stored Devin authentication is required but HOME/XDG auth directories are unavailable",
      );
    }
  }

  #assertNotShutDown(): void {
    if (this.#shutDown) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_STATE", "runtime is shut down");
    }
  }

  #assertReady(): void {
    this.#assertNotShutDown();
    if (!this.#initialized || !this.#transport) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_STATE", "runtime is not initialized");
    }
    if (this.#processExited) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_STATE", "ACP process has exited");
    }
  }

  #emit(event: DevinAcpRuntimeEvent): void {
    if (!this.#eventSink) return;
    try {
      this.#eventSink(event);
    } catch {
      /* event sink must not break protocol */
    }
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ms);
    timer.unref();
  });
}

export function createDevinAcpRuntimeController(
  options: DevinAcpRuntimeOptions,
): DevinAcpRuntimeController {
  const impl = new DevinAcpRuntimeImpl(options);
  return {
    runtime: impl,
    shutdown: () => impl.shutdown(),
  };
}

// Re-export transport error for tests that assert framing codes.
export { AcpTransportError };
