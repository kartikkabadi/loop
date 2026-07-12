/**
 * Devin ACP host-service boundary for server→client requests.
 * No filesystem or terminal execution. Fail-closed deny-all default.
 */

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

export type DevinAcpHostRequest =
  | Readonly<{
      kind: "permission";
      method: typeof DEVIN_ACP_HOST_METHODS.permission;
      params: unknown;
    }>
  | Readonly<{
      kind: "filesystem-read";
      method: typeof DEVIN_ACP_HOST_METHODS.filesystemRead;
      params: unknown;
    }>
  | Readonly<{
      kind: "filesystem-write";
      method: typeof DEVIN_ACP_HOST_METHODS.filesystemWrite;
      params: unknown;
    }>
  | Readonly<{
      kind: "terminal-create";
      method: typeof DEVIN_ACP_HOST_METHODS.terminalCreate;
      params: unknown;
    }>
  | Readonly<{
      kind: "terminal-output";
      method: typeof DEVIN_ACP_HOST_METHODS.terminalOutput;
      params: unknown;
    }>
  | Readonly<{
      kind: "terminal-wait-for-exit";
      method: typeof DEVIN_ACP_HOST_METHODS.terminalWaitForExit;
      params: unknown;
    }>
  | Readonly<{
      kind: "terminal-release";
      method: typeof DEVIN_ACP_HOST_METHODS.terminalRelease;
      params: unknown;
    }>
  | Readonly<{
      kind: "terminal-kill";
      method: typeof DEVIN_ACP_HOST_METHODS.terminalKill;
      params: unknown;
    }>;

export interface DevinAcpHostServices {
  handle(request: DevinAcpHostRequest): Promise<unknown>;
}

export function classifyDevinAcpHostRequest(
  method: string,
  params: unknown,
): DevinAcpHostRequest | null {
  switch (method) {
    case DEVIN_ACP_HOST_METHODS.permission:
      return {
        kind: "permission",
        method: DEVIN_ACP_HOST_METHODS.permission,
        params,
      };
    case DEVIN_ACP_HOST_METHODS.filesystemRead:
      return {
        kind: "filesystem-read",
        method: DEVIN_ACP_HOST_METHODS.filesystemRead,
        params,
      };
    case DEVIN_ACP_HOST_METHODS.filesystemWrite:
      return {
        kind: "filesystem-write",
        method: DEVIN_ACP_HOST_METHODS.filesystemWrite,
        params,
      };
    case DEVIN_ACP_HOST_METHODS.terminalCreate:
      return {
        kind: "terminal-create",
        method: DEVIN_ACP_HOST_METHODS.terminalCreate,
        params,
      };
    case DEVIN_ACP_HOST_METHODS.terminalOutput:
      return {
        kind: "terminal-output",
        method: DEVIN_ACP_HOST_METHODS.terminalOutput,
        params,
      };
    case DEVIN_ACP_HOST_METHODS.terminalWaitForExit:
      return {
        kind: "terminal-wait-for-exit",
        method: DEVIN_ACP_HOST_METHODS.terminalWaitForExit,
        params,
      };
    case DEVIN_ACP_HOST_METHODS.terminalRelease:
      return {
        kind: "terminal-release",
        method: DEVIN_ACP_HOST_METHODS.terminalRelease,
        params,
      };
    case DEVIN_ACP_HOST_METHODS.terminalKill:
      return {
        kind: "terminal-kill",
        method: DEVIN_ACP_HOST_METHODS.terminalKill,
        params,
      };
    default:
      return null;
  }
}

class HostServiceDeniedError extends Error {
  readonly code = -32000;

  constructor(message: string) {
    super(message);
    this.name = "HostServiceDeniedError";
  }
}

function denyPermission(params: unknown): Readonly<{
  outcome: Readonly<{ outcome: "cancelled" }> | Readonly<{ outcome: "selected"; optionId: string }>;
}> {
  const options = extractPermissionOptions(params);
  const rejectOption = findRejectOption(options);
  if (rejectOption) {
    return { outcome: { outcome: "selected", optionId: rejectOption.optionId } };
  }
  return { outcome: { outcome: "cancelled" } };
}

function extractPermissionOptions(
  params: unknown,
): ReadonlyArray<Readonly<{ optionId: string; kind?: string }>> {
  if (typeof params !== "object" || params === null || Array.isArray(params)) {
    return [];
  }
  const options = (params as { options?: unknown }).options;
  if (!Array.isArray(options)) return [];

  const out: Array<{ optionId: string; kind?: string }> = [];
  for (const entry of options) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) continue;
    const record = entry as { optionId?: unknown; kind?: unknown };
    if (typeof record.optionId !== "string" || record.optionId.length === 0) continue;
    if (typeof record.kind === "string") {
      out.push({ optionId: record.optionId, kind: record.kind });
    } else {
      out.push({ optionId: record.optionId });
    }
  }
  return out;
}

function findRejectOption(
  options: ReadonlyArray<Readonly<{ optionId: string; kind?: string }>>,
): Readonly<{ optionId: string; kind?: string }> | undefined {
  const byKind = options.find(
    (option) => option.kind === "reject_once" || option.kind === "reject_always",
  );
  if (byKind) return byKind;

  const byId = options.find(
    (option) => option.optionId === "reject-once" || option.optionId === "reject-always",
  );
  if (byId) return byId;

  const startsWithReject = options.find((option) =>
    typeof option.kind === "string" ? option.kind.startsWith("reject") : false,
  );
  if (startsWithReject) return startsWithReject;

  return options.find((option) => /reject|deny|cancel/i.test(option.optionId));
}

export const denyAllDevinAcpHostServices: DevinAcpHostServices = {
  async handle(request: DevinAcpHostRequest): Promise<unknown> {
    switch (request.kind) {
      case "permission":
        return denyPermission(request.params);
      case "filesystem-read":
      case "filesystem-write":
      case "terminal-create":
      case "terminal-output":
      case "terminal-wait-for-exit":
      case "terminal-release":
      case "terminal-kill":
        throw new HostServiceDeniedError("Host service denied");
      default: {
        const _exhaustive: never = request;
        throw _exhaustive;
      }
    }
  },
};

export type ToolCallCacheEntry = Readonly<Record<string, unknown>>;

const DEFAULT_TOOL_CALL_CACHE_MAX_ENTRIES = 256;

export class DevinAcpToolCallCache {
  private readonly maxEntries: number;
  private readonly entries = new Map<string, Record<string, unknown>>();

  constructor(options?: { maxEntries?: number }) {
    const maxEntries = options?.maxEntries ?? DEFAULT_TOOL_CALL_CACHE_MAX_ENTRIES;
    this.maxEntries = Math.max(1, maxEntries);
  }

  merge(toolCallId: string, update: Record<string, unknown>): void {
    if (toolCallId.length === 0) return;
    const previous = this.entries.get(toolCallId);
    const merged = mergeToolCallEntry(previous, update);

    if (previous !== undefined) {
      this.entries.set(toolCallId, merged);
      return;
    }

    while (this.entries.size >= this.maxEntries) {
      const oldest = this.entries.keys().next().value;
      if (oldest === undefined) break;
      this.entries.delete(oldest);
    }
    this.entries.set(toolCallId, merged);
  }

  get(toolCallId: string): ToolCallCacheEntry | undefined {
    const entry = this.entries.get(toolCallId);
    if (!entry) return undefined;
    return entry;
  }

  clear(): void {
    this.entries.clear();
  }

  get size(): number {
    return this.entries.size;
  }
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

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Merge cached tool_call fields into a permission request so rawInput from
 * session/update is available when the permission request omits it.
 */
export function mergePermissionParamsWithToolCallCache(
  params: unknown,
  cache: DevinAcpToolCallCache,
): unknown {
  if (!isPlainObject(params)) return params;
  const toolCall = params.toolCall;
  if (!isPlainObject(toolCall)) return params;
  const toolCallId =
    (typeof toolCall.toolCallId === "string" && toolCall.toolCallId) ||
    (typeof toolCall.toolCallID === "string" && toolCall.toolCallID) ||
    null;
  if (!toolCallId) return params;
  const cached = cache.get(toolCallId);
  if (!cached) {
    cache.merge(toolCallId, toolCall);
    return params;
  }
  const mergedToolCall = mergeToolCallEntry({ ...cached }, toolCall);
  cache.merge(toolCallId, toolCall);
  return { ...params, toolCall: mergedToolCall };
}
