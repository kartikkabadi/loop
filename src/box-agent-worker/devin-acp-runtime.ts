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
  InitializedAgentSessionRuntime,
  InitializedAgentSessionRuntimeBoth,
  InitializedAgentSessionRuntimeContinueOnly,
  LoadAgentSessionInput,
} from "../agent-session-runtime.js";
import {
  AcpPeerRpcError,
  AcpTransportError,
  createAcpStdioTransport,
  type AcpStdioTransport,
} from "./acp-stdio-transport.js";
import {
  ControlledAcpRpcError,
  denyAllDevinAcpHostServices,
  DevinAcpToolCallCache,
  hostRequestFailedError,
  invalidParamsError,
  mergePermissionParamsWithToolCallCache,
  parseDevinAcpHostRequest,
  type DevinAcpHostRequest,
  type DevinAcpHostServices,
  type DevinAcpPermissionParams,
  type DevinAcpTerminalCreateParams,
} from "./devin-acp-host-services.js";

const PROTOCOL_VERSION = 1 as const;
const DEFAULT_REQUEST_TIMEOUT_MS = 180_000;
const DEFAULT_SHUTDOWN_GRACE_MS = 3_000;
const DEFAULT_MAX_LINE_BYTES = 1_048_576;
const DEFAULT_MAX_OUTPUT_BYTES = 1_048_576;
const DEFAULT_CANCEL_WAIT_MS = 30_000;
const DEFAULT_HOST_REQUEST_TIMEOUT_MS = 30_000;
const DEFAULT_MAX_IN_FLIGHT_HOST_REQUESTS = 16;

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

const KNOWN_UPDATE_KINDS = new Set([
  "user_message_chunk",
  "agent_message_chunk",
  "agent_thought_chunk",
  "tool_call",
  "tool_call_update",
  "plan",
  "available_commands_update",
  "current_mode_update",
  "config_option_update",
  "session_info_update",
  "usage_update",
]);

const KNOWN_STOP_REASONS = new Set([
  "end_turn",
  "max_tokens",
  "max_turn_requests",
  "refusal",
  "cancelled",
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
  hostRequestTimeoutMs?: number;
  maxInFlightHostRequests?: number;
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

type NegotiatedCaps =
  | { continueSession: true; loadSession: true }
  | { continueSession: true; loadSession: false };

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
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new DevinAcpRuntimeError(
      "E_DEVIN_ACP_VALIDATION",
      `${label} must be a positive safe integer`,
    );
  }
  return value;
}

function digestSessionId(sessionId: string): string {
  return createHash("sha256").update(sessionId).digest("hex").slice(0, 16);
}

function sanitizeAgentMeta(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  if (value.length === 0) return undefined;
  // Fail-closed: lowercase ASCII token only — peer-controlled mixed-case/prompt text omitted.
  if (!/^[a-z0-9][a-z0-9._+-]{0,127}$/.test(value)) return undefined;
  return value;
}

function mapUpdateKind(raw: unknown): string {
  if (typeof raw !== "string") return "unknown";
  return KNOWN_UPDATE_KINDS.has(raw) ? raw : "unknown";
}

function mapStopReasonForEvent(raw: unknown): string {
  if (typeof raw !== "string") return "unknown";
  return KNOWN_STOP_REASONS.has(raw) ? raw : "unknown";
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
  return update.sessionUpdate === "agent_message_chunk";
}

function isThoughtUpdate(update: Record<string, unknown>): boolean {
  return update.sessionUpdate === "agent_thought_chunk";
}

export function scrubDevinAcpChildEnv(parentEnv: Readonly<NodeJS.ProcessEnv>): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const key of Object.keys(parentEnv)) {
    if (FORBIDDEN_ENV_EXACT.has(key)) continue;
    if (FORBIDDEN_ENV_PREFIXES.some((prefix) => key.startsWith(prefix))) continue;
    if (!ALLOWED_ENV_KEYS.has(key)) continue;
    const value = parentEnv[key];
    if (value !== undefined) env[key] = value;
  }
  if (!env.PATH && parentEnv.PATH) env.PATH = parentEnv.PATH;
  if (!env.HOME && parentEnv.HOME) env.HOME = parentEnv.HOME;
  return env;
}

function resolveInsideWorkspace(workspaceRoot: string, candidate: string): string {
  assertSafeString("path", candidate);
  // workspaceRoot is the pinned, already-canonical root set during construction.
  const rootReal = workspaceRoot;
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
  } catch {
    throw new DevinAcpRuntimeError("E_DEVIN_ACP_VALIDATION", "path resolve failed");
  }

  const rootPrefix = rootReal.endsWith(path.sep) ? rootReal : `${rootReal}${path.sep}`;
  if (real !== rootReal && !real.startsWith(rootPrefix)) {
    throw new DevinAcpRuntimeError("E_DEVIN_ACP_VALIDATION", "path escapes workspace root");
  }
  return real;
}

function mapTransportOrPeerError(error: unknown): Error {
  if (error instanceof AcpPeerRpcError && error.code === -32000) {
    return new DevinAcpRuntimeError("E_DEVIN_ACP_AUTH", "Stored Devin authentication is required");
  }
  if (error instanceof Error) return error;
  return new DevinAcpRuntimeError("E_DEVIN_ACP_PROTOCOL", "prompt failed");
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
  readonly #hostRequestTimeoutMs: number;
  readonly #maxInFlightHostRequests: number;
  readonly #eventSink: ((event: DevinAcpRuntimeEvent) => void) | undefined;
  readonly #sessions = new Map<string, LiveSession>();
  readonly #toolCallCache = new DevinAcpToolCallCache();

  #transport: AcpStdioTransport | null = null;
  #initialized = false;
  #shutDown = false;
  #processExited = false;
  #requiresRestart = false;
  #exitObserved = false;
  #activePrompt: ActivePrompt | null = null;
  #info: InitializedAgentSessionRuntimeBoth["info"] | null = null;
  #negotiatedCaps: NegotiatedCaps | null = null;

  constructor(options: DevinAcpRuntimeOptions) {
    assertSafeString("workspaceRoot", options.workspaceRoot);
    if (!path.isAbsolute(options.workspaceRoot)) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_VALIDATION", "workspaceRoot must be absolute");
    }
    try {
      this.#workspaceRoot = realpathSync(options.workspaceRoot);
    } catch {
      throw new DevinAcpRuntimeError(
        "E_DEVIN_ACP_VALIDATION",
        "workspaceRoot could not be resolved",
      );
    }

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
    this.#hostRequestTimeoutMs = assertFinitePositiveInt(
      "hostRequestTimeoutMs",
      options.hostRequestTimeoutMs,
      DEFAULT_HOST_REQUEST_TIMEOUT_MS,
    );
    this.#maxInFlightHostRequests = assertFinitePositiveInt(
      "maxInFlightHostRequests",
      options.maxInFlightHostRequests,
      DEFAULT_MAX_IN_FLIGHT_HOST_REQUESTS,
    );
    this.#eventSink = options.eventSink;
    this.#childEnv = scrubDevinAcpChildEnv(options.parentEnv);
    this.#emit({
      type: "environment_scrubbed",
      allowedKeyCount: Object.keys(this.#childEnv).length,
    });
  }

  async initialize(): Promise<InitializedAgentSessionRuntime> {
    this.#assertNotShutDown();
    if (this.#initialized) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_STATE", "runtime already initialized");
    }

    const caps = this.#hostServices.capabilities;
    const transport = createAcpStdioTransport({
      command: this.#command,
      args: this.#args,
      cwd: this.#workspaceRoot,
      env: this.#childEnv,
      requestTimeoutMs: this.#requestTimeoutMs,
      shutdownGraceMs: this.#shutdownGraceMs,
      maxLineBytes: this.#maxLineBytes,
      hostRequestTimeoutMs: this.#hostRequestTimeoutMs,
      maxInFlightHostRequests: this.#maxInFlightHostRequests,
      requestHandler: (method, params) => this.#onHostRequest(method, params),
      notificationHandler: (method, params) => this.#onNotification(method, params),
      stderrHandler: () => {
        /* diagnostics only; never protocol, never logged into events */
      },
      onProcessExit: (info) => {
        this.#onProcessExit(info);
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
          fs: {
            readTextFile: caps.readTextFile === true,
            writeTextFile: caps.writeTextFile === true,
          },
          terminal: caps.terminal === true,
        },
        clientInfo: {
          name: "loop-devin-acp",
          title: "Loop Devin ACP Runtime",
          version: "1.0.0",
        },
      });
    } catch (error) {
      await this.shutdown().catch(() => undefined);
      throw mapTransportOrPeerError(error);
    }

    if (!isPlainObject(initResult) || initResult.protocolVersion !== PROTOCOL_VERSION) {
      await this.shutdown().catch(() => undefined);
      throw new DevinAcpRuntimeError(
        "E_DEVIN_ACP_PROTOCOL",
        "ACP initialize did not negotiate protocol version 1",
      );
    }

    const agentInfo = isPlainObject(initResult.agentInfo) ? initResult.agentInfo : undefined;
    const agentName = sanitizeAgentMeta(agentInfo?.name);
    const agentVersion = sanitizeAgentMeta(agentInfo?.version);

    const agentCapabilities = isPlainObject(initResult.agentCapabilities)
      ? initResult.agentCapabilities
      : {};
    const loadSession = agentCapabilities.loadSession === true;
    this.#negotiatedCaps = loadSession
      ? { continueSession: true, loadSession: true }
      : { continueSession: true, loadSession: false };

    this.#info = {
      protocolVersion: PROTOCOL_VERSION,
      ...(agentName !== undefined ? { agentName } : {}),
      ...(agentVersion !== undefined ? { agentVersion } : {}),
    };
    this.#initialized = true;
    // Events omit peer agentName/agentVersion — info may carry sanitized values only.
    this.#emit({
      type: "initialized",
      protocolVersion: PROTOCOL_VERSION,
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
      if (!this.#exitObserved) {
        const info = transport.lastExit ?? { exitCode: null, signal: null };
        this.#onProcessExit(info);
      }
    }
    this.#transport = null;
    this.#processExited = true;
  }

  #initializedRuntime(): InitializedAgentSessionRuntime {
    const info = this.#info;
    const caps = this.#negotiatedCaps;
    if (!info || !caps) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_STATE", "runtime is not initialized");
    }

    if (caps.loadSession) {
      const both: InitializedAgentSessionRuntimeBoth = {
        info,
        capabilities: { continueSession: true, loadSession: true },
        createSession: (input) => this.#createSession(input),
        prompt: (input) => this.#prompt(input, { isContinuation: false }),
        continueSession: (input) => this.#prompt(input, { isContinuation: true }),
        loadSession: (input) => this.#loadSession(input),
        cancel: (input) => this.#cancel(input),
      };
      return both;
    }

    const continueOnly: InitializedAgentSessionRuntimeContinueOnly = {
      info,
      capabilities: { continueSession: true, loadSession: false },
      createSession: (input) => this.#createSession(input),
      prompt: (input) => this.#prompt(input, { isContinuation: false }),
      continueSession: (input) => this.#prompt(input, { isContinuation: true }),
      cancel: (input) => this.#cancel(input),
    };
    return continueOnly;
  }

  async #createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
    this.#assertReady();
    this.#assertNotRequiresRestart();
    const cwd = resolveInsideWorkspace(this.#workspaceRoot, input.cwd);
    let result: unknown;
    try {
      result = await this.#transport!.request("session/new", {
        cwd,
        mcpServers: [],
      });
    } catch (error) {
      throw mapTransportOrPeerError(error);
    }
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
    this.#assertNotRequiresRestart();
    if (!this.#negotiatedCaps?.loadSession) {
      throw new DevinAcpRuntimeError("E_DEVIN_ACP_STATE", "loadSession was not negotiated");
    }
    assertSafeString("sessionId", input.sessionId);
    const cwd = resolveInsideWorkspace(this.#workspaceRoot, input.cwd);
    let result: unknown;
    try {
      result = await this.#transport!.request("session/load", {
        sessionId: input.sessionId,
        cwd,
        mcpServers: [],
      });
    } catch (error) {
      throw mapTransportOrPeerError(error);
    }
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
    this.#assertNotRequiresRestart();
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
    if (this.#processExited) {
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
      let result: unknown;
      try {
        result = await this.#transport!.request("session/prompt", {
          sessionId: input.sessionId,
          prompt: [{ type: "text", text: input.text }],
        });
      } catch (error) {
        throw mapTransportOrPeerError(error);
      }

      if (active.outputLimitError) {
        throw active.outputLimitError;
      }

      if (!isPlainObject(result) || typeof result.stopReason !== "string") {
        throw new DevinAcpRuntimeError(
          "E_DEVIN_ACP_PROTOCOL",
          "session/prompt returned invalid stopReason",
        );
      }
      if (!KNOWN_STOP_REASONS.has(result.stopReason)) {
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
      if (result.stopReason === "cancelled") {
        this.#requiresRestart = true;
      }
      this.#toolCallCache.clear();
      this.#emit({
        type: "prompt_completed",
        sessionIdDigest: digest,
        stopReason: mapStopReasonForEvent(result.stopReason),
        outputBytes: active.outputBytes,
      });
      settle.resolve(promptResult);
      return promptResult;
    } catch (error) {
      this.#toolCallCache.clear();
      if (this.#processExited) {
        this.#requiresRestart = true;
      }
      const wrapped = mapTransportOrPeerError(error);
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
    let request: DevinAcpHostRequest;
    try {
      request = parseDevinAcpHostRequest(method, params);
    } catch (error) {
      if (error instanceof ControlledAcpRpcError) throw error;
      throw invalidParamsError();
    }

    const active = this.#activePrompt;
    if (
      !active ||
      active.sessionId !== request.params.sessionId ||
      !this.#sessions.has(request.params.sessionId)
    ) {
      throw invalidParamsError();
    }

    if (request.kind === "permission") {
      const merged: DevinAcpPermissionParams = mergePermissionParamsWithToolCallCache(
        request.params,
        this.#toolCallCache,
      );
      request = { ...request, params: merged };
    } else if (request.kind === "terminal-create") {
      const session = this.#sessions.get(request.params.sessionId);
      if (!session) throw invalidParamsError();
      const resolved = this.#resolveTerminalCwd(request.params.cwd, session);
      request = {
        ...request,
        params: { ...request.params, cwd: resolved } as DevinAcpTerminalCreateParams,
      };
    }

    try {
      const result = await this.#hostServices.handle(request);
      this.#emit({ type: "host_request", requestKind: request.kind, outcome: "handled" });
      return result;
    } catch (error) {
      this.#emit({ type: "host_request", requestKind: request.kind, outcome: "rejected" });
      if (error instanceof ControlledAcpRpcError) throw error;
      throw hostRequestFailedError();
    }
  }

  #onNotification(method: string, params: unknown): void {
    if (method !== "session/update") return;
    if (!isPlainObject(params)) return;
    const sessionId = typeof params.sessionId === "string" ? params.sessionId : "";
    const update = isPlainObject(params.update) ? params.update : null;
    if (!update) return;

    const updateKind = mapUpdateKind(update.sessionUpdate);

    if (sessionId && this.#sessions.has(sessionId)) {
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
      sessionId &&
      this.#sessions.has(sessionId) &&
      (update.sessionUpdate === "tool_call" || update.sessionUpdate === "tool_call_update")
    ) {
      const active = this.#activePrompt;
      if (active && active.sessionId === sessionId) {
        this.#toolCallCache.merge(sessionId, toolCallId, update);
      }
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

  #onProcessExit(info: { exitCode: number | null; signal: string | null }): void {
    if (this.#exitObserved) return;
    this.#exitObserved = true;
    this.#processExited = true;
    this.#requiresRestart = true;
    this.#sessions.clear();
    this.#toolCallCache.clear();
    this.#emit({
      type: "process_exited",
      exitCode: info.exitCode,
      signal: info.signal,
    });
  }

  #resolveTerminalCwd(provided: string | undefined, session: LiveSession): string {
    if (provided === undefined) return session.cwd;
    try {
      return resolveInsideWorkspace(this.#workspaceRoot, provided);
    } catch {
      throw invalidParamsError();
    }
  }

  #assertNotRequiresRestart(): void {
    if (this.#requiresRestart) {
      throw new DevinAcpRuntimeError(
        "E_DEVIN_ACP_STATE",
        "runtime requires process restart after cancellation or exit",
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

export { AcpTransportError, AcpPeerRpcError };
