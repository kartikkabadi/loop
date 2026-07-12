/**
 * Strict ACP stdio JSON-RPC transport (protocol version 1).
 * Newline-delimited UTF-8 JSON-RPC over local stdio. Node built-ins only.
 */
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { TextDecoder } from "node:util";
import {
  CONTROLLED_RPC_MESSAGES,
  ControlledAcpRpcError,
  type ControlledAcpRpcCode,
} from "./devin-acp-host-services.js";

export type AcpTransportErrorCode =
  | "E_ACP_SPAWN"
  | "E_ACP_PROTOCOL"
  | "E_ACP_LINE_LIMIT"
  | "E_ACP_TIMEOUT"
  | "E_ACP_EXIT"
  | "E_ACP_CLOSED"
  | "E_ACP_HOST_REQUEST";

export class AcpTransportError extends Error {
  readonly code: AcpTransportErrorCode;

  constructor(code: AcpTransportErrorCode, message: string) {
    super(message);
    this.name = "AcpTransportError";
    this.code = code;
  }
}

/** Peer JSON-RPC error: numeric code only; message is static. */
export class AcpPeerRpcError extends Error {
  readonly code: number;

  constructor(code: number) {
    super("ACP peer RPC error");
    this.name = "AcpPeerRpcError";
    this.code = code;
  }
}

export type AcpClientRequestHandler = (method: string, params: unknown) => Promise<unknown>;

export type AcpNotificationHandler = (method: string, params: unknown) => void | Promise<void>;

export type AcpProcessExitInfo = Readonly<{
  exitCode: number | null;
  signal: NodeJS.Signals | null;
}>;

export type AcpStdioTransportOptions = Readonly<{
  command: string;
  args: readonly string[];
  cwd: string;
  env: Readonly<NodeJS.ProcessEnv>;
  requestTimeoutMs?: number;
  shutdownGraceMs?: number;
  maxLineBytes?: number;
  hostRequestTimeoutMs?: number;
  maxInFlightHostRequests?: number;
  requestHandler: AcpClientRequestHandler;
  notificationHandler?: AcpNotificationHandler;
  stderrHandler?: (chunk: string) => void;
  onProcessExit?: (info: AcpProcessExitInfo) => void;
}>;

export interface AcpStdioTransport {
  readonly pid: number | null;
  readonly lastExit: AcpProcessExitInfo | null;
  start(): Promise<void>;
  request(method: string, params: unknown): Promise<unknown>;
  notify(method: string, params: unknown): Promise<void>;
  shutdown(): Promise<void>;
}

const DEFAULT_REQUEST_TIMEOUT_MS = 180_000;
const DEFAULT_SHUTDOWN_GRACE_MS = 3_000;
const DEFAULT_MAX_LINE_BYTES = 1_048_576;
const DEFAULT_HOST_REQUEST_TIMEOUT_MS = 30_000;
const DEFAULT_MAX_IN_FLIGHT_HOST_REQUESTS = 16;

type JsonRpcId = string | number;

type PendingRequest = {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
  timer: NodeJS.Timeout;
};

type InFlightHost = {
  timer: NodeJS.Timeout;
  generation: number;
  settled: boolean;
};

type ValidatedEnvelope =
  | Readonly<{
      kind: "request";
      id: JsonRpcId;
      method: string;
      params: unknown;
    }>
  | Readonly<{
      kind: "notification";
      method: string;
      params: unknown;
    }>
  | Readonly<{
      kind: "response";
      id: JsonRpcId;
      result: unknown;
    }>
  | Readonly<{
      kind: "error-response";
      id: JsonRpcId;
      error: Readonly<{ code: number; message: string; data?: unknown }>;
    }>;

const CONTROLLED_CODES = new Set<number>([-32601, -32602, -32603, -32800]);
const CONTROLLED_MESSAGES = new Set<string>(Object.values(CONTROLLED_RPC_MESSAGES));

function assertPositiveSafeInt(label: string, value: number): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new AcpTransportError("E_ACP_SPAWN", `${label} must be a positive safe integer`);
  }
  return value;
}

export function createAcpStdioTransport(options: AcpStdioTransportOptions): AcpStdioTransport {
  const requestTimeoutMs = assertPositiveSafeInt(
    "requestTimeoutMs",
    options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS,
  );
  const shutdownGraceMs = assertPositiveSafeInt(
    "shutdownGraceMs",
    options.shutdownGraceMs ?? DEFAULT_SHUTDOWN_GRACE_MS,
  );
  const maxLineBytes = assertPositiveSafeInt(
    "maxLineBytes",
    options.maxLineBytes ?? DEFAULT_MAX_LINE_BYTES,
  );
  const hostRequestTimeoutMs = assertPositiveSafeInt(
    "hostRequestTimeoutMs",
    options.hostRequestTimeoutMs ?? DEFAULT_HOST_REQUEST_TIMEOUT_MS,
  );
  const maxInFlightHostRequests = assertPositiveSafeInt(
    "maxInFlightHostRequests",
    options.maxInFlightHostRequests ?? DEFAULT_MAX_IN_FLIGHT_HOST_REQUESTS,
  );
  const requestHandler = options.requestHandler;
  const notificationHandler = options.notificationHandler;
  const stderrHandler = options.stderrHandler;
  const onProcessExit = options.onProcessExit;

  let child: ChildProcessWithoutNullStreams | undefined;
  let nextId = 1;
  let started = false;
  let closed = false;
  let shuttingDown = false;
  let stdoutBuffer = Buffer.alloc(0);
  let fatalError: AcpTransportError | undefined;
  let shutdownPromise: Promise<void> | undefined;
  let exitPromise: Promise<AcpProcessExitInfo> | undefined;
  let lastExit: AcpProcessExitInfo | null = null;
  let hostGeneration = 0;
  let observedExitEmitted = false;

  const pending = new Map<JsonRpcId, PendingRequest>();
  const inFlightHost = new Map<JsonRpcId, InFlightHost>();

  function failTransport(error: AcpTransportError): void {
    if (fatalError) return;
    fatalError = error;
    rejectAllPending(error);
    rejectAllHostInFlight();
    if (!shuttingDown && child) {
      void shutdown().catch(() => undefined);
    }
  }

  function rejectAllPending(error: AcpTransportError): void {
    for (const entry of pending.values()) {
      clearTimeout(entry.timer);
      entry.reject(error);
    }
    pending.clear();
  }

  function rejectAllHostInFlight(): void {
    for (const entry of inFlightHost.values()) {
      clearTimeout(entry.timer);
      entry.settled = true;
    }
    inFlightHost.clear();
  }

  function assertWritable(): void {
    if (closed || shuttingDown || fatalError) {
      throw fatalError ?? new AcpTransportError("E_ACP_CLOSED", "ACP transport is closed");
    }
    if (!child || !child.stdin.writable || child.stdin.destroyed || child.stdin.writableEnded) {
      throw new AcpTransportError("E_ACP_CLOSED", "ACP transport stdin is not writable");
    }
  }

  function writeMessage(message: Record<string, unknown>): void {
    assertWritable();
    const line = `${JSON.stringify(message)}\n`;
    child!.stdin.write(line);
  }

  function tryWriteHostMessage(message: Record<string, unknown>): boolean {
    if (!child || closed || fatalError) return false;
    if (!child.stdin.writable || child.stdin.destroyed || child.stdin.writableEnded) return false;
    try {
      child.stdin.write(`${JSON.stringify(message)}\n`);
      return true;
    } catch {
      return false;
    }
  }

  function sendHostResult(id: JsonRpcId, result: unknown, generation: number): void {
    const entry = inFlightHost.get(id);
    if (!entry || entry.settled || entry.generation !== generation) return;
    entry.settled = true;
    clearTimeout(entry.timer);
    inFlightHost.delete(id);
    if (!tryWriteHostMessage({ jsonrpc: "2.0", id, result })) {
      failTransport(
        new AcpTransportError("E_ACP_HOST_REQUEST", "Failed to write host request result"),
      );
    }
  }

  function sendHostError(id: JsonRpcId, code: number, message: string, generation: number): void {
    const entry = inFlightHost.get(id);
    if (!entry || entry.settled || entry.generation !== generation) return;
    entry.settled = true;
    clearTimeout(entry.timer);
    inFlightHost.delete(id);
    if (
      !tryWriteHostMessage({
        jsonrpc: "2.0",
        id,
        error: { code, message },
      })
    ) {
      failTransport(
        new AcpTransportError("E_ACP_HOST_REQUEST", "Failed to write host request error"),
      );
    }
  }

  async function handleInboundRequest(
    id: JsonRpcId,
    method: string,
    params: unknown,
  ): Promise<void> {
    if (inFlightHost.size >= maxInFlightHostRequests) {
      tryWriteHostMessage({
        jsonrpc: "2.0",
        id,
        error: {
          code: -32603,
          message: CONTROLLED_RPC_MESSAGES.HOST_REQUEST_FAILED,
        },
      });
      return;
    }

    const generation = ++hostGeneration;
    const timer = setTimeout(() => {
      sendHostError(id, -32603, CONTROLLED_RPC_MESSAGES.HOST_REQUEST_FAILED, generation);
    }, hostRequestTimeoutMs);
    timer.unref();
    inFlightHost.set(id, { timer, generation, settled: false });

    try {
      const result = await requestHandler(method, params);
      sendHostResult(id, result, generation);
    } catch (error) {
      const mapped = mapHandlerError(error);
      sendHostError(id, mapped.code, mapped.message, generation);
    }
  }

  function handleInboundNotification(method: string, params: unknown): void {
    if (!notificationHandler) return;
    void Promise.resolve()
      .then(() => notificationHandler(method, params))
      .catch(() => {
        // Notification handler failures must not crash the transport.
      });
  }

  function handleValidated(envelope: ValidatedEnvelope): void {
    switch (envelope.kind) {
      case "request":
        void handleInboundRequest(envelope.id, envelope.method, envelope.params);
        return;
      case "notification":
        handleInboundNotification(envelope.method, envelope.params);
        return;
      case "response": {
        const entry = pending.get(envelope.id);
        if (!entry) {
          failTransport(
            new AcpTransportError("E_ACP_PROTOCOL", "ACP response id is unknown or duplicate"),
          );
          return;
        }
        pending.delete(envelope.id);
        clearTimeout(entry.timer);
        entry.resolve(envelope.result);
        return;
      }
      case "error-response": {
        const entry = pending.get(envelope.id);
        if (!entry) {
          failTransport(
            new AcpTransportError("E_ACP_PROTOCOL", "ACP response id is unknown or duplicate"),
          );
          return;
        }
        pending.delete(envelope.id);
        clearTimeout(entry.timer);
        entry.reject(new AcpPeerRpcError(envelope.error.code));
        return;
      }
      default: {
        const _exhaustive: never = envelope;
        return _exhaustive;
      }
    }
  }

  function processStdoutLine(lineBytes: Buffer): void {
    if (lineBytes.length === 0) return;
    if (lineBytes.length > maxLineBytes) {
      failTransport(
        new AcpTransportError("E_ACP_LINE_LIMIT", "ACP stdout line exceeds maxLineBytes"),
      );
      return;
    }

    let text: string;
    try {
      text = decodeUtf8Strict(lineBytes);
    } catch {
      failTransport(new AcpTransportError("E_ACP_PROTOCOL", "ACP stdout line is not valid UTF-8"));
      return;
    }

    if (text.trim().length === 0) return;

    let parsed: unknown;
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      failTransport(new AcpTransportError("E_ACP_PROTOCOL", "ACP stdout line is not valid JSON"));
      return;
    }

    const validated = validateJsonRpcEnvelope(parsed);
    if (!validated.ok) {
      failTransport(
        new AcpTransportError("E_ACP_PROTOCOL", `ACP stdout envelope invalid: ${validated.reason}`),
      );
      return;
    }

    handleValidated(validated.envelope);
  }

  function onStdoutData(chunk: Buffer): void {
    if (fatalError) return;
    stdoutBuffer = Buffer.concat([stdoutBuffer, chunk]);

    while (true) {
      const newlineIndex = stdoutBuffer.indexOf(0x0a);
      if (newlineIndex < 0) {
        if (stdoutBuffer.length > maxLineBytes) {
          failTransport(
            new AcpTransportError(
              "E_ACP_LINE_LIMIT",
              "ACP stdout unterminated line exceeds maxLineBytes",
            ),
          );
        }
        return;
      }

      const lineBytes = stdoutBuffer.subarray(0, newlineIndex);
      stdoutBuffer = stdoutBuffer.subarray(newlineIndex + 1);
      processStdoutLine(lineBytes);
      if (fatalError) return;
    }
  }

  function onStderrData(chunk: Buffer): void {
    if (!stderrHandler) return;
    try {
      stderrHandler(chunk.toString("utf8"));
    } catch {
      // stderr diagnostics must not crash the transport
    }
  }

  function emitProcessExit(info: AcpProcessExitInfo): void {
    if (observedExitEmitted) return;
    observedExitEmitted = true;
    lastExit = info;
    try {
      onProcessExit?.(info);
    } catch {
      // exit callback must not crash transport
    }
  }

  function attachChild(processChild: ChildProcessWithoutNullStreams): void {
    child = processChild;
    exitPromise = new Promise((resolveExit) => {
      processChild.once("close", (code, signal) => {
        const info: AcpProcessExitInfo = {
          exitCode: typeof code === "number" ? code : null,
          signal: typeof signal === "string" ? (signal as NodeJS.Signals) : null,
        };
        emitProcessExit(info);
        resolveExit(info);
      });
    });

    processChild.stdout.on("data", (chunk: Buffer) => {
      onStdoutData(chunk);
    });
    processChild.stderr.on("data", (chunk: Buffer) => {
      onStderrData(chunk);
    });
    processChild.stdin.on("error", () => {
      // Ignore stdin errors during shutdown races.
    });
    processChild.on("error", () => {
      failTransport(new AcpTransportError("E_ACP_SPAWN", "ACP child process error"));
    });
    processChild.on("exit", () => {
      if (shuttingDown || closed) {
        rejectAllPending(new AcpTransportError("E_ACP_CLOSED", "ACP transport shut down"));
        rejectAllHostInFlight();
        return;
      }
      closed = true;
      failTransport(new AcpTransportError("E_ACP_EXIT", "ACP child process exited"));
    });
  }

  async function start(): Promise<void> {
    if (started) {
      throw new AcpTransportError("E_ACP_SPAWN", "ACP transport already started");
    }
    if (closed || shuttingDown) {
      throw new AcpTransportError("E_ACP_CLOSED", "ACP transport is closed");
    }
    started = true;

    let processChild: ChildProcessWithoutNullStreams;
    try {
      processChild = spawn(options.command, [...options.args], {
        cwd: options.cwd,
        env: { ...options.env },
        stdio: ["pipe", "pipe", "pipe"],
        shell: false,
        detached: process.platform !== "win32",
        windowsHide: true,
      });
    } catch {
      started = false;
      throw new AcpTransportError("E_ACP_SPAWN", "Failed to spawn ACP process");
    }

    attachChild(processChild);
  }

  async function request(method: string, params: unknown): Promise<unknown> {
    assertWritable();
    const id = nextId;
    nextId += 1;
    const message = { jsonrpc: "2.0", id, method, params };

    return await new Promise<unknown>((resolve, reject) => {
      const timer = setTimeout(() => {
        pending.delete(id);
        reject(
          new AcpTransportError(
            "E_ACP_TIMEOUT",
            `ACP request timed out after ${requestTimeoutMs}ms`,
          ),
        );
      }, requestTimeoutMs);
      timer.unref();

      pending.set(id, { resolve, reject, timer });
      try {
        writeMessage(message);
      } catch (error) {
        clearTimeout(timer);
        pending.delete(id);
        reject(error);
      }
    });
  }

  async function notify(method: string, params: unknown): Promise<void> {
    assertWritable();
    writeMessage({ jsonrpc: "2.0", method, params });
  }

  async function shutdown(): Promise<void> {
    if (shutdownPromise) return shutdownPromise;
    shuttingDown = true;
    closed = true;

    shutdownPromise = (async () => {
      const shutdownError = new AcpTransportError("E_ACP_CLOSED", "ACP transport shut down");
      rejectAllPending(shutdownError);
      rejectAllHostInFlight();

      const active = child;
      if (!active) return;

      try {
        if (!active.stdin.destroyed && !active.stdin.writableEnded) {
          active.stdin.end();
        }
      } catch {
        // ignore
      }

      signalProcessGroup(active, "SIGTERM");
      await waitForExitOrTimeout(active, exitPromise, shutdownGraceMs);
      if (active.exitCode === null && active.signalCode === null && !lastExit) {
        signalProcessGroup(active, "SIGKILL");
        await waitForExitOrTimeout(active, exitPromise, shutdownGraceMs);
      }

      if (active.exitCode === null && active.signalCode === null && !lastExit) {
        active.stdout.removeAllListeners("data");
        active.stderr.removeAllListeners("data");
        active.removeAllListeners("error");
        active.removeAllListeners("exit");
        child = undefined;
        throw new AcpTransportError("E_ACP_CLOSED", "ACP child process did not exit");
      }

      active.stdout.removeAllListeners("data");
      active.stderr.removeAllListeners("data");
      active.removeAllListeners("error");
      active.removeAllListeners("exit");
      child = undefined;
    })();

    return shutdownPromise;
  }

  return {
    get pid(): number | null {
      return child?.pid ?? null;
    },
    get lastExit(): AcpProcessExitInfo | null {
      return lastExit;
    },
    start,
    request,
    notify,
    shutdown,
  };
}

function waitForExitOrTimeout(
  child: ChildProcessWithoutNullStreams,
  exitPromise: Promise<AcpProcessExitInfo> | undefined,
  timeoutMs: number,
): Promise<void> {
  if (child.exitCode !== null || child.signalCode !== null) {
    return Promise.resolve();
  }
  if (!exitPromise) return Promise.resolve();
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, timeoutMs);
    timer.unref();
    void exitPromise.then(() => {
      clearTimeout(timer);
      resolve();
    });
  });
}

function signalProcessGroup(child: ChildProcessWithoutNullStreams, signal: NodeJS.Signals): void {
  if (!child.pid) return;
  if (process.platform === "win32") {
    try {
      child.kill(signal);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ESRCH") {
        // ignore shutdown races
      }
    }
    return;
  }
  try {
    process.kill(-child.pid, signal);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ESRCH") {
      try {
        child.kill(signal);
      } catch {
        // ignore
      }
    }
  }
}

function decodeUtf8Strict(bytes: Buffer): string {
  const decoder = new TextDecoder("utf-8", { fatal: true });
  return decoder.decode(bytes);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isJsonRpcId(value: unknown): value is JsonRpcId {
  if (typeof value === "string") return value.length > 0;
  return typeof value === "number" && Number.isSafeInteger(value);
}

function hasOwn(value: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function validateJsonRpcEnvelope(
  value: unknown,
): { ok: true; envelope: ValidatedEnvelope } | { ok: false; reason: string } {
  if (!isPlainObject(value)) return { ok: false, reason: "not_object" };
  if (value.jsonrpc !== "2.0") return { ok: false, reason: "bad_jsonrpc" };

  const hasId = hasOwn(value, "id");
  const hasMethod = hasOwn(value, "method");
  const hasResult = hasOwn(value, "result");
  const hasError = hasOwn(value, "error");
  const hasParams = hasOwn(value, "params");

  if (hasMethod && (hasResult || hasError)) {
    return { ok: false, reason: "method_with_response_fields" };
  }
  if (hasResult && hasError) {
    return { ok: false, reason: "result_and_error" };
  }

  if (hasMethod) {
    if (typeof value.method !== "string" || value.method.length === 0) {
      return { ok: false, reason: "bad_method" };
    }
    const params = hasParams ? value.params : undefined;
    if (hasId) {
      if (!isJsonRpcId(value.id)) return { ok: false, reason: "bad_id" };
      return {
        ok: true,
        envelope: {
          kind: "request",
          id: value.id,
          method: value.method,
          params,
        },
      };
    }
    return {
      ok: true,
      envelope: {
        kind: "notification",
        method: value.method,
        params,
      },
    };
  }

  if (hasId && hasResult && !hasError) {
    if (!isJsonRpcId(value.id)) return { ok: false, reason: "bad_id" };
    return {
      ok: true,
      envelope: { kind: "response", id: value.id, result: value.result },
    };
  }

  if (hasId && hasError && !hasResult) {
    if (!isJsonRpcId(value.id)) return { ok: false, reason: "bad_id" };
    const errorValue = value.error;
    if (!isPlainObject(errorValue)) return { ok: false, reason: "bad_error" };
    if (typeof errorValue.code !== "number" || !Number.isSafeInteger(errorValue.code)) {
      return { ok: false, reason: "bad_error_code" };
    }
    if (typeof errorValue.message !== "string") {
      return { ok: false, reason: "bad_error_message" };
    }
    const error: { code: number; message: string; data?: unknown } = {
      code: errorValue.code,
      message: errorValue.message,
    };
    if (hasOwn(errorValue, "data")) {
      error.data = errorValue.data;
    }
    return {
      ok: true,
      envelope: { kind: "error-response", id: value.id, error },
    };
  }

  return { ok: false, reason: "unknown_shape" };
}

function mapHandlerError(error: unknown): { code: ControlledAcpRpcCode; message: string } {
  if (error instanceof ControlledAcpRpcError) {
    return { code: error.code, message: error.message };
  }
  if (typeof error === "object" && error !== null) {
    const record = error as { code?: unknown; message?: unknown };
    if (
      typeof record.code === "number" &&
      CONTROLLED_CODES.has(record.code) &&
      typeof record.message === "string" &&
      CONTROLLED_MESSAGES.has(record.message)
    ) {
      return {
        code: record.code as ControlledAcpRpcCode,
        message: record.message,
      };
    }
  }
  return { code: -32603, message: CONTROLLED_RPC_MESSAGES.HOST_REQUEST_FAILED };
}
