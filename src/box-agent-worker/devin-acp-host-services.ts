/**
 * Devin ACP host-service boundary for server→client requests.
 * No filesystem or terminal execution. Fail-closed deny-all default.
 */

export type ControlledAcpRpcCode = -32601 | -32602 | -32603 | -32800;

export const CONTROLLED_RPC_MESSAGES = {
  METHOD_NOT_FOUND: "Method not found",
  INVALID_PARAMS: "Invalid params",
  HOST_REQUEST_FAILED: "Host request failed",
  REQUEST_CANCELLED: "Request cancelled",
} as const;

export function messageForControlledCode(code: ControlledAcpRpcCode): string {
  switch (code) {
    case -32601:
      return CONTROLLED_RPC_MESSAGES.METHOD_NOT_FOUND;
    case -32602:
      return CONTROLLED_RPC_MESSAGES.INVALID_PARAMS;
    case -32603:
      return CONTROLLED_RPC_MESSAGES.HOST_REQUEST_FAILED;
    case -32800:
      return CONTROLLED_RPC_MESSAGES.REQUEST_CANCELLED;
    default: {
      const _exhaustive: never = code;
      return _exhaustive;
    }
  }
}

const CONTROLLED_CODES = new Set<number>([-32601, -32602, -32603, -32800]);

export class ControlledAcpRpcError extends Error {
  readonly code: ControlledAcpRpcCode;
  #controlled = true;

  constructor(code: ControlledAcpRpcCode) {
    super(messageForControlledCode(code));
    this.name = "ControlledAcpRpcError";
    this.code = code;
  }

  static getControlledCode(error: unknown): ControlledAcpRpcCode | undefined {
    try {
      if (error instanceof ControlledAcpRpcError && (error as ControlledAcpRpcError).#controlled) {
        const descriptor = Object.getOwnPropertyDescriptor(error, "code");
        if (
          descriptor &&
          "value" in descriptor &&
          typeof descriptor.value === "number" &&
          CONTROLLED_CODES.has(descriptor.value)
        ) {
          return descriptor.value as ControlledAcpRpcCode;
        }
      }
    } catch {
      // Any throw from a proxy or hostile getter is treated as uncontrolled.
    }
    return undefined;
  }
}

export function methodNotFoundError(): ControlledAcpRpcError {
  return new ControlledAcpRpcError(-32601);
}

export function invalidParamsError(): ControlledAcpRpcError {
  return new ControlledAcpRpcError(-32602);
}

export function hostRequestFailedError(): ControlledAcpRpcError {
  return new ControlledAcpRpcError(-32603);
}

export function requestCancelledError(): ControlledAcpRpcError {
  return new ControlledAcpRpcError(-32800);
}

export const DEVIN_ACP_HOST_METHODS = {
  permission: "session/request_permission",
  filesystemRead: "fs/read_text_file",
  filesystemWrite: "fs/write_text_file",
  terminalCreate: "terminal/create",
  terminalOutput: "terminal/output",
  terminalWaitForExit: "terminal/wait_for_exit",
  terminalRelease: "terminal/release",
  terminalKill: "terminal/kill",
} as const;

export type DevinAcpPermissionKind =
  | "allow_once"
  | "allow_always"
  | "reject_once"
  | "reject_always";

export type DevinAcpPermissionOption = Readonly<{
  optionId: string;
  name: string;
  kind: DevinAcpPermissionKind;
}>;

export type DevinAcpPermissionParams = Readonly<{
  sessionId: string;
  options: readonly DevinAcpPermissionOption[];
  toolCall: Readonly<{ toolCallId: string } & Record<string, unknown>>;
}>;

export type DevinAcpFilesystemReadParams = Readonly<{
  sessionId: string;
  path: string;
  line?: number;
  limit?: number;
}>;

export type DevinAcpFilesystemWriteParams = Readonly<{
  sessionId: string;
  path: string;
  content: string;
}>;

export type DevinAcpTerminalEnvEntry = Readonly<{ name: string; value: string }>;

export type DevinAcpTerminalCreateParams = Readonly<{
  sessionId: string;
  command: string;
  args: readonly string[];
  cwd?: string;
  env?: readonly DevinAcpTerminalEnvEntry[];
  outputByteLimit?: number;
}>;

export type DevinAcpTerminalIdParams = Readonly<{
  sessionId: string;
  terminalId: string;
}>;

export type DevinAcpHostRequest =
  | Readonly<{
      kind: "permission";
      method: typeof DEVIN_ACP_HOST_METHODS.permission;
      params: DevinAcpPermissionParams;
    }>
  | Readonly<{
      kind: "filesystem-read";
      method: typeof DEVIN_ACP_HOST_METHODS.filesystemRead;
      params: DevinAcpFilesystemReadParams;
    }>
  | Readonly<{
      kind: "filesystem-write";
      method: typeof DEVIN_ACP_HOST_METHODS.filesystemWrite;
      params: DevinAcpFilesystemWriteParams;
    }>
  | Readonly<{
      kind: "terminal-create";
      method: typeof DEVIN_ACP_HOST_METHODS.terminalCreate;
      params: DevinAcpTerminalCreateParams;
    }>
  | Readonly<{
      kind: "terminal-output";
      method: typeof DEVIN_ACP_HOST_METHODS.terminalOutput;
      params: DevinAcpTerminalIdParams;
    }>
  | Readonly<{
      kind: "terminal-wait-for-exit";
      method: typeof DEVIN_ACP_HOST_METHODS.terminalWaitForExit;
      params: DevinAcpTerminalIdParams;
    }>
  | Readonly<{
      kind: "terminal-release";
      method: typeof DEVIN_ACP_HOST_METHODS.terminalRelease;
      params: DevinAcpTerminalIdParams;
    }>
  | Readonly<{
      kind: "terminal-kill";
      method: typeof DEVIN_ACP_HOST_METHODS.terminalKill;
      params: DevinAcpTerminalIdParams;
    }>;

export type DevinAcpHostCapabilities = Readonly<{
  readTextFile: boolean;
  writeTextFile: boolean;
  terminal: boolean;
}>;

export interface DevinAcpHostServices {
  readonly capabilities: DevinAcpHostCapabilities;
  handle(request: DevinAcpHostRequest): Promise<unknown>;
}

const MAX_WRITE_CONTENT_BYTES = 1_048_576;
const PERMISSION_KINDS = new Set<string>([
  "allow_once",
  "allow_always",
  "reject_once",
  "reject_always",
]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertNonEmptySafeString(value: unknown): string {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) {
    throw invalidParamsError();
  }
  return value;
}

function assertAbsolutePath(value: unknown): string {
  const pathValue = assertNonEmptySafeString(value);
  if (!pathValue.startsWith("/")) {
    throw invalidParamsError();
  }
  return pathValue;
}

function assertNonNegativeSafeInt(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
    throw invalidParamsError();
  }
  return value;
}

function assertNulSafeString(value: unknown): string {
  if (typeof value !== "string" || value.includes("\0")) {
    throw invalidParamsError();
  }
  return value;
}

function parsePermissionParams(params: unknown): DevinAcpPermissionParams {
  if (!isPlainObject(params)) throw invalidParamsError();
  const sessionId = assertNonEmptySafeString(params.sessionId);
  if (!Array.isArray(params.options) || params.options.length === 0) {
    throw invalidParamsError();
  }
  const options: DevinAcpPermissionOption[] = [];
  for (const entry of params.options) {
    if (!isPlainObject(entry)) throw invalidParamsError();
    const optionId = assertNonEmptySafeString(entry.optionId);
    const name = assertNonEmptySafeString(entry.name);
    if (typeof entry.kind !== "string" || !PERMISSION_KINDS.has(entry.kind)) {
      throw invalidParamsError();
    }
    options.push({
      optionId,
      name,
      kind: entry.kind as DevinAcpPermissionKind,
    });
  }
  if (!isPlainObject(params.toolCall)) throw invalidParamsError();
  const toolCallId = assertNonEmptySafeString(params.toolCall.toolCallId);
  return {
    sessionId,
    options,
    toolCall: { ...params.toolCall, toolCallId },
  };
}

function parseFilesystemReadParams(params: unknown): DevinAcpFilesystemReadParams {
  if (!isPlainObject(params)) throw invalidParamsError();
  const sessionId = assertNonEmptySafeString(params.sessionId);
  const pathValue = assertAbsolutePath(params.path);
  const out: {
    sessionId: string;
    path: string;
    line?: number;
    limit?: number;
  } = { sessionId, path: pathValue };
  if (Object.prototype.hasOwnProperty.call(params, "line") && params.line !== null) {
    out.line = assertNonNegativeSafeInt(params.line);
  }
  if (Object.prototype.hasOwnProperty.call(params, "limit") && params.limit !== null) {
    out.limit = assertNonNegativeSafeInt(params.limit);
  }
  return out;
}

function parseFilesystemWriteParams(params: unknown): DevinAcpFilesystemWriteParams {
  if (!isPlainObject(params)) throw invalidParamsError();
  const sessionId = assertNonEmptySafeString(params.sessionId);
  const pathValue = assertAbsolutePath(params.path);
  if (typeof params.content !== "string") throw invalidParamsError();
  if (Buffer.byteLength(params.content, "utf8") > MAX_WRITE_CONTENT_BYTES) {
    throw invalidParamsError();
  }
  return { sessionId, path: pathValue, content: params.content };
}

function parseTerminalCreateParams(params: unknown): DevinAcpTerminalCreateParams {
  if (!isPlainObject(params)) throw invalidParamsError();
  const sessionId = assertNonEmptySafeString(params.sessionId);
  const command = assertNonEmptySafeString(params.command);
  let args: string[] = [];
  if (Object.prototype.hasOwnProperty.call(params, "args")) {
    if (!Array.isArray(params.args)) throw invalidParamsError();
    args = params.args.map((entry) => {
      if (typeof entry !== "string" || entry.includes("\0")) throw invalidParamsError();
      return entry;
    });
  }
  const out: {
    sessionId: string;
    command: string;
    args: string[];
    cwd?: string;
    env?: DevinAcpTerminalEnvEntry[];
    outputByteLimit?: number;
  } = { sessionId, command, args };
  if (Object.prototype.hasOwnProperty.call(params, "cwd") && params.cwd !== null) {
    out.cwd = assertAbsolutePath(params.cwd);
  }
  if (Object.prototype.hasOwnProperty.call(params, "env")) {
    if (!Array.isArray(params.env)) throw invalidParamsError();
    out.env = params.env.map((entry) => {
      if (!isPlainObject(entry)) throw invalidParamsError();
      const name = assertNonEmptySafeString(entry.name);
      if (name.includes("=")) throw invalidParamsError();
      return {
        name,
        value: assertNulSafeString(entry.value),
      };
    });
  }
  if (
    Object.prototype.hasOwnProperty.call(params, "outputByteLimit") &&
    params.outputByteLimit !== null
  ) {
    out.outputByteLimit = assertNonNegativeSafeInt(params.outputByteLimit);
  }
  return out;
}

function parseTerminalIdParams(params: unknown): DevinAcpTerminalIdParams {
  if (!isPlainObject(params)) throw invalidParamsError();
  return {
    sessionId: assertNonEmptySafeString(params.sessionId),
    terminalId: assertNonEmptySafeString(params.terminalId),
  };
}

/**
 * Validate and classify a host method. Unknown → -32601. Bad params → -32602.
 */
export function parseDevinAcpHostRequest(method: string, params: unknown): DevinAcpHostRequest {
  switch (method) {
    case DEVIN_ACP_HOST_METHODS.permission:
      return {
        kind: "permission",
        method: DEVIN_ACP_HOST_METHODS.permission,
        params: parsePermissionParams(params),
      };
    case DEVIN_ACP_HOST_METHODS.filesystemRead:
      return {
        kind: "filesystem-read",
        method: DEVIN_ACP_HOST_METHODS.filesystemRead,
        params: parseFilesystemReadParams(params),
      };
    case DEVIN_ACP_HOST_METHODS.filesystemWrite:
      return {
        kind: "filesystem-write",
        method: DEVIN_ACP_HOST_METHODS.filesystemWrite,
        params: parseFilesystemWriteParams(params),
      };
    case DEVIN_ACP_HOST_METHODS.terminalCreate:
      return {
        kind: "terminal-create",
        method: DEVIN_ACP_HOST_METHODS.terminalCreate,
        params: parseTerminalCreateParams(params),
      };
    case DEVIN_ACP_HOST_METHODS.terminalOutput:
      return {
        kind: "terminal-output",
        method: DEVIN_ACP_HOST_METHODS.terminalOutput,
        params: parseTerminalIdParams(params),
      };
    case DEVIN_ACP_HOST_METHODS.terminalWaitForExit:
      return {
        kind: "terminal-wait-for-exit",
        method: DEVIN_ACP_HOST_METHODS.terminalWaitForExit,
        params: parseTerminalIdParams(params),
      };
    case DEVIN_ACP_HOST_METHODS.terminalRelease:
      return {
        kind: "terminal-release",
        method: DEVIN_ACP_HOST_METHODS.terminalRelease,
        params: parseTerminalIdParams(params),
      };
    case DEVIN_ACP_HOST_METHODS.terminalKill:
      return {
        kind: "terminal-kill",
        method: DEVIN_ACP_HOST_METHODS.terminalKill,
        params: parseTerminalIdParams(params),
      };
    default:
      throw methodNotFoundError();
  }
}

/** @deprecated Prefer parseDevinAcpHostRequest — kept for tests; returns null for unknown. */
export function classifyDevinAcpHostRequest(
  method: string,
  params: unknown,
): DevinAcpHostRequest | null {
  try {
    return parseDevinAcpHostRequest(method, params);
  } catch (error) {
    if (error instanceof ControlledAcpRpcError && error.code === -32601) return null;
    throw error;
  }
}

function denyPermission(options: readonly DevinAcpPermissionOption[]): Readonly<{
  outcome: Readonly<{ outcome: "cancelled" }> | Readonly<{ outcome: "selected"; optionId: string }>;
}> {
  const rejectOnce = options.find((option) => option.kind === "reject_once");
  if (rejectOnce) {
    return { outcome: { outcome: "selected", optionId: rejectOnce.optionId } };
  }
  const rejectAlways = options.find((option) => option.kind === "reject_always");
  if (rejectAlways) {
    return { outcome: { outcome: "selected", optionId: rejectAlways.optionId } };
  }
  return { outcome: { outcome: "cancelled" } };
}

export const denyAllDevinAcpHostServices: DevinAcpHostServices = {
  capabilities: {
    readTextFile: false,
    writeTextFile: false,
    terminal: false,
  },
  async handle(request: DevinAcpHostRequest): Promise<unknown> {
    switch (request.kind) {
      case "permission":
        return denyPermission(request.params.options);
      case "filesystem-read":
      case "filesystem-write":
      case "terminal-create":
      case "terminal-output":
      case "terminal-wait-for-exit":
      case "terminal-release":
      case "terminal-kill":
        throw hostRequestFailedError();
      default: {
        const _exhaustive: never = request;
        throw _exhaustive;
      }
    }
  },
};

export type ToolCallCacheEntry = Readonly<Record<string, unknown>>;

const DEFAULT_TOOL_CALL_CACHE_MAX_ENTRIES = 256;
const DEFAULT_TOOL_CALL_CACHE_MAX_ENTRY_BYTES = 65_536;

export class DevinAcpToolCallCache {
  private readonly maxEntries: number;
  private readonly maxEntryBytes: number;
  private readonly entries = new Map<string, Record<string, unknown>>();

  constructor(options?: { maxEntries?: number; maxEntryBytes?: number }) {
    const maxEntries = options?.maxEntries ?? DEFAULT_TOOL_CALL_CACHE_MAX_ENTRIES;
    const maxEntryBytes = options?.maxEntryBytes ?? DEFAULT_TOOL_CALL_CACHE_MAX_ENTRY_BYTES;
    if (!Number.isSafeInteger(maxEntries) || maxEntries <= 0) {
      throw new RangeError("maxEntries must be a positive safe integer");
    }
    if (!Number.isSafeInteger(maxEntryBytes) || maxEntryBytes <= 0) {
      throw new RangeError("maxEntryBytes must be a positive safe integer");
    }
    this.maxEntries = maxEntries;
    this.maxEntryBytes = maxEntryBytes;
  }

  private key(sessionId: string, toolCallId: string): string {
    return `${sessionId}\0${toolCallId}`;
  }

  merge(sessionId: string, toolCallId: string, update: Record<string, unknown>): void {
    this.mergeAndGet(sessionId, toolCallId, update);
  }

  mergeAndGet(
    sessionId: string,
    toolCallId: string,
    update: Record<string, unknown>,
  ): ToolCallCacheEntry | undefined {
    if (sessionId.length === 0 || toolCallId.length === 0) return undefined;

    const bounded = boundCacheUpdate(update, this.maxEntryBytes);
    if (!bounded) return undefined;

    const cacheKey = this.key(sessionId, toolCallId);
    const previous = this.entries.get(cacheKey);
    const merged = mergeToolCallEntry(previous, bounded);

    const stored = boundCacheUpdate(merged, this.maxEntryBytes);
    if (!stored) return undefined;

    if (previous === undefined) {
      while (this.entries.size >= this.maxEntries) {
        const oldest = this.entries.keys().next().value;
        if (oldest === undefined) break;
        this.entries.delete(oldest);
      }
    }
    this.entries.set(cacheKey, stored);
    return stored;
  }

  get(sessionId: string, toolCallId: string): ToolCallCacheEntry | undefined {
    return this.entries.get(this.key(sessionId, toolCallId));
  }

  clear(): void {
    this.entries.clear();
  }

  get size(): number {
    return this.entries.size;
  }
}

function boundCacheUpdate(
  update: Record<string, unknown>,
  maxEntryBytes: number,
): Record<string, unknown> | null {
  let serialized: string;
  try {
    serialized = JSON.stringify(update);
  } catch {
    return null;
  }
  if (Buffer.byteLength(serialized, "utf8") <= maxEntryBytes) {
    return update;
  }

  // Truncate to safe metadata only — never expose oversized content.
  // If even the safe metadata exceeds the cap, reject the whole entry.
  const safe: Record<string, unknown> = {};
  if (typeof update.toolCallId === "string") safe.toolCallId = update.toolCallId;
  if (typeof update.sessionUpdate === "string") safe.sessionUpdate = update.sessionUpdate;
  if (typeof update.title === "string") safe.title = update.title;

  const safeSerialized = JSON.stringify(safe);
  if (Buffer.byteLength(safeSerialized, "utf8") > maxEntryBytes) {
    return null;
  }
  return safe;
}

function mergeToolCallEntry(
  cached: Record<string, unknown> | undefined,
  incoming: Record<string, unknown>,
): Record<string, unknown> {
  const base: Record<string, unknown> = cached ? { ...cached } : {};
  for (const [key, value] of Object.entries(incoming)) {
    if (value === undefined || value === null) continue;
    if (key === "rawInput" && isPlainObject(value) && isPlainObject(base.rawInput)) {
      base.rawInput = { ...base.rawInput, ...value };
    } else {
      base[key] = value;
    }
  }
  return base;
}

/**
 * Merge cached tool_call fields into a permission request so rawInput from
 * session/update is available when the permission request omits it.
 * Session-scoped: never merges across sessions.
 */
export function mergePermissionParamsWithToolCallCache(
  params: DevinAcpPermissionParams,
  cache: DevinAcpToolCallCache,
): DevinAcpPermissionParams {
  const bounded = cache.mergeAndGet(params.sessionId, params.toolCall.toolCallId, params.toolCall);
  if (!bounded) {
    throw invalidParamsError();
  }
  return { ...params, toolCall: bounded as DevinAcpPermissionParams["toolCall"] };
}
