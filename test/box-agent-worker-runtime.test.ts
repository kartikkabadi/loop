import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";

import {
  createDevinAcpRuntimeController as createDevinAcpRuntimeControllerJs,
  scrubDevinAcpChildEnv as scrubDevinAcpChildEnvJs,
  DevinAcpRuntimeError as DevinAcpRuntimeErrorJs,
  AcpTransportError as AcpTransportErrorJs,
} from "../dist/box-agent-worker/devin-acp-runtime.js";
import {
  denyAllDevinAcpHostServices as denyAllDevinAcpHostServicesJs,
  DevinAcpToolCallCache as DevinAcpToolCallCacheJs,
  DEVIN_ACP_HOST_METHODS as DEVIN_ACP_HOST_METHODS_JS,
  classifyDevinAcpHostRequest as classifyDevinAcpHostRequestJs,
  parseDevinAcpHostRequest as parseDevinAcpHostRequestJs,
  mergePermissionParamsWithToolCallCache as mergePermissionParamsWithToolCallCacheJs,
  ControlledAcpRpcError as ControlledAcpRpcErrorJs,
  CONTROLLED_RPC_MESSAGES as CONTROLLED_RPC_MESSAGES_JS,
} from "../dist/box-agent-worker/devin-acp-host-services.js";
import type {
  DevinAcpHostCapabilities,
  DevinAcpHostRequest,
  DevinAcpHostServices,
} from "../src/box-agent-worker/devin-acp-host-services.js";
import type {
  DevinAcpRuntimeController,
  DevinAcpRuntimeEvent,
  DevinAcpRuntimeOptions,
} from "../src/box-agent-worker/devin-acp-runtime.js";
import type * as RuntimeMod from "../src/box-agent-worker/devin-acp-runtime.js";
import type * as HostMod from "../src/box-agent-worker/devin-acp-host-services.js";

const createDevinAcpRuntimeController =
  createDevinAcpRuntimeControllerJs as typeof RuntimeMod.createDevinAcpRuntimeController;
const scrubDevinAcpChildEnv = scrubDevinAcpChildEnvJs as typeof RuntimeMod.scrubDevinAcpChildEnv;
const DevinAcpRuntimeError = DevinAcpRuntimeErrorJs as typeof RuntimeMod.DevinAcpRuntimeError;
const AcpTransportError = AcpTransportErrorJs as typeof RuntimeMod.AcpTransportError;
const denyAllDevinAcpHostServices =
  denyAllDevinAcpHostServicesJs as typeof HostMod.denyAllDevinAcpHostServices;
const DevinAcpToolCallCache =
  DevinAcpToolCallCacheJs as unknown as typeof HostMod.DevinAcpToolCallCache;
const DEVIN_ACP_HOST_METHODS = DEVIN_ACP_HOST_METHODS_JS as typeof HostMod.DEVIN_ACP_HOST_METHODS;
const classifyDevinAcpHostRequest =
  classifyDevinAcpHostRequestJs as typeof HostMod.classifyDevinAcpHostRequest;
const parseDevinAcpHostRequest =
  parseDevinAcpHostRequestJs as typeof HostMod.parseDevinAcpHostRequest;
const mergePermissionParamsWithToolCallCache =
  mergePermissionParamsWithToolCallCacheJs as typeof HostMod.mergePermissionParamsWithToolCallCache;
const ControlledAcpRpcError = ControlledAcpRpcErrorJs as typeof HostMod.ControlledAcpRpcError;
const CONTROLLED_RPC_MESSAGES =
  CONTROLLED_RPC_MESSAGES_JS as typeof HostMod.CONTROLLED_RPC_MESSAGES;

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FIXTURE = path.join(HERE, "fixtures", "fake-devin-acp.mjs");
const REPO_ROOT = path.resolve(HERE, "..");
const SECRET = "FAKE_SECRET_SENTINEL_XYZ";
const SESSION_ID = "sess-redact-FAKE_SECRET_SENTINEL_XYZ";
const THOUGHT_TEXT = "secret-thought-should-exclude";

type FakeArgExtra = {
  hostResponsePath?: string;
  pidPath?: string;
  auditPath?: string;
  delayMs?: number;
  outputChunks?: string;
  lineBytes?: number;
  secretSentinel?: string;
  loadSession?: boolean;
  cwd?: string;
  secondSessionId?: string;
};

type RecordingHost = DevinAcpHostServices & {
  readonly requests: DevinAcpHostRequest[];
};

type HostResponseLine = {
  jsonrpc?: string;
  id?: unknown;
  result?: unknown;
  error?: { code?: number; message?: string };
};

function digest(sessionId: string): string {
  return createHash("sha256").update(sessionId).digest("hex").slice(0, 16);
}

function makeWorkspace(): string {
  const dir = mkdtempSync(path.join(tmpdir(), "loop-devin-acp-"));
  return realpathSync(dir);
}

function fakeArgs(scenario: string, extra: FakeArgExtra = {}): string[] {
  const args = [FIXTURE, `--scenario=${scenario}`, `--session-id=${SESSION_ID}`];
  if (extra.hostResponsePath) args.push(`--host-response-path=${extra.hostResponsePath}`);
  if (extra.auditPath) args.push(`--audit-path=${extra.auditPath}`);
  if (extra.pidPath) args.push(`--pid-path=${extra.pidPath}`);
  if (extra.delayMs !== undefined) args.push(`--delay-ms=${extra.delayMs}`);
  if (extra.outputChunks) args.push(`--output-chunks=${extra.outputChunks}`);
  if (extra.lineBytes !== undefined) args.push(`--line-bytes=${extra.lineBytes}`);
  if (extra.secretSentinel) args.push(`--secret-sentinel=${extra.secretSentinel}`);
  if (extra.loadSession === false) args.push("--load-session=false");
  if (extra.secondSessionId) args.push(`--second-session-id=${extra.secondSessionId}`);
  if (extra.cwd !== undefined) args.push(`--cwd=${extra.cwd}`);
  return args;
}

function baseOptions(
  workspaceRoot: string,
  overrides: Partial<DevinAcpRuntimeOptions> = {},
): DevinAcpRuntimeOptions {
  return {
    workspaceRoot,
    parentEnv: process.env,
    devinCommand: process.execPath,
    devinArgs: fakeArgs("happy", { outputChunks: "ok" }),
    requestTimeoutMs: 5_000,
    shutdownGraceMs: 1_000,
    maxProtocolLineBytes: 64 * 1024,
    maxOutputBytes: 64 * 1024,
    ...overrides,
  };
}

async function withController(
  options: DevinAcpRuntimeOptions,
  fn: (controller: DevinAcpRuntimeController, events: DevinAcpRuntimeEvent[]) => Promise<void>,
): Promise<void> {
  const events: DevinAcpRuntimeEvent[] = [];
  const controller = createDevinAcpRuntimeController({
    ...options,
    eventSink: (event) => {
      events.push(event);
      options.eventSink?.(event);
    },
  });
  try {
    await fn(controller, events);
  } finally {
    await controller.shutdown();
  }
}

function recordingHost(
  handler?: (request: DevinAcpHostRequest) => Promise<unknown>,
  capabilities: DevinAcpHostCapabilities = {
    readTextFile: true,
    writeTextFile: true,
    terminal: true,
  },
): RecordingHost {
  const requests: DevinAcpHostRequest[] = [];
  return {
    capabilities,
    requests,
    async handle(request) {
      requests.push(request);
      if (handler) return handler(request);
      if (request.kind === "permission") {
        return { outcome: { outcome: "cancelled" } };
      }
      return { ok: true, echoKind: request.kind };
    },
  };
}

function assertNoSecret(value: unknown): void {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  assert.equal(text.includes(SECRET), false, `secret leaked: ${text.slice(0, 200)}`);
}

function processAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function readHostResponses(hostResponsePath: string): HostResponseLine[] {
  const raw = readFileSync(hostResponsePath, "utf8").trim();
  if (!raw) return [];
  return raw.split("\n").map((line) => JSON.parse(line) as HostResponseLine);
}

function isTransportOrRuntimeReject(error: unknown): boolean {
  assertNoSecret(error);
  if (error instanceof AcpTransportError) {
    assert.ok(
      [
        "E_ACP_PROTOCOL",
        "E_ACP_LINE_LIMIT",
        "E_ACP_TIMEOUT",
        "E_ACP_EXIT",
        "E_ACP_SPAWN",
        "E_ACP_CLOSED",
        "E_ACP_HOST_REQUEST",
      ].includes(error.code),
    );
    return true;
  }
  if (error instanceof DevinAcpRuntimeError) {
    assertNoSecret(error.message);
    return true;
  }
  assertNoSecret(error);
  return true;
}

// ---------------------------------------------------------------------------
// A. Initialization and capability shape
// ---------------------------------------------------------------------------

test("A: initialize negotiates protocol 1 and both capabilities", async () => {
  const workspace = makeWorkspace();
  try {
    await withController(baseOptions(workspace), async (controller, events) => {
      assert.equal(typeof controller.runtime.initialize, "function");
      assert.equal(Object.keys(controller.runtime).filter((k) => k !== "initialize").length, 0);

      const initialized = await controller.runtime.initialize();
      assert.equal(initialized.info.protocolVersion, 1);
      assert.equal(initialized.capabilities.continueSession, true);
      assert.equal(initialized.capabilities.loadSession, true);
      assert.equal(typeof initialized.continueSession, "function");
      assert.equal(typeof initialized.loadSession, "function");
      assert.equal(typeof initialized.createSession, "function");
      assert.equal(typeof initialized.prompt, "function");
      assert.equal(typeof initialized.cancel, "function");
      assert.equal(initialized.info.agentName, "fake-devin-acp");
      assert.equal(
        "steer" in initialized || "closeSession" in initialized || "listSessions" in initialized,
        false,
      );

      await assert.rejects(
        () => controller.runtime.initialize(),
        (error: unknown) =>
          error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_STATE",
      );

      assert.ok(events.some((e) => e.type === "initialized" && e.protocolVersion === 1));
      const scrub = events.find((e) => e.type === "environment_scrubbed");
      assert.ok(scrub && scrub.type === "environment_scrubbed");
      assert.equal(typeof scrub.allowedKeyCount, "number");
      assert.equal("allowedKeys" in scrub, false);
    });
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("A: no-load-session returns ContinueOnly without loadSession method", async () => {
  const workspace = makeWorkspace();
  try {
    await withController(
      baseOptions(workspace, {
        devinArgs: fakeArgs("no-load-session", { outputChunks: "ok", loadSession: false }),
      }),
      async (controller) => {
        const initialized = await controller.runtime.initialize();
        assert.equal(initialized.capabilities.continueSession, true);
        assert.equal(initialized.capabilities.loadSession, false);
        assert.equal(typeof initialized.continueSession, "function");
        assert.equal("loadSession" in initialized, false);
        assert.equal(typeof (initialized as { loadSession?: unknown }).loadSession, "undefined");
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("A: deny-all host advertises client capabilities false", () => {
  assert.deepEqual(denyAllDevinAcpHostServices.capabilities, {
    readTextFile: false,
    writeTextFile: false,
    terminal: false,
  });
});

test("A: recording terminal-only host capabilities", () => {
  const host = recordingHost(undefined, {
    readTextFile: false,
    writeTextFile: false,
    terminal: true,
  });
  assert.deepEqual(host.capabilities, {
    readTextFile: false,
    writeTextFile: false,
    terminal: true,
  });
});

test("A: safe integer rejection for requestTimeoutMs", () => {
  const workspace = makeWorkspace();
  try {
    for (const bad of [Number.NaN, 0, -1, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
      assert.throws(
        () => createDevinAcpRuntimeController(baseOptions(workspace, { requestTimeoutMs: bad })),
        (error: unknown) =>
          error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_VALIDATION",
      );
    }
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// B. Create, prompt, continuation, loading
// ---------------------------------------------------------------------------

test("B: create/prompt/continue/load and guards", async () => {
  const workspace = makeWorkspace();
  try {
    const events: DevinAcpRuntimeEvent[] = [];
    const controller = createDevinAcpRuntimeController(
      baseOptions(workspace, {
        devinArgs: fakeArgs("continue", { outputChunks: "turn1:" }),
        eventSink: (e) => events.push(e),
      }),
    );

    const initialized = await controller.runtime.initialize();
    const session = await initialized.createSession({ cwd: workspace });
    assert.equal(session.id, SESSION_ID);
    assert.equal(session.cwd, workspace);

    const first = await initialized.prompt({ sessionId: session.id, text: "hi" });
    assert.equal(first.sessionId, session.id);
    assert.equal(first.stopReason, "end_turn");
    assert.equal(first.outputText, "turn1:");
    assert.equal(first.outputText.includes("THOUGHT"), false);

    const second = await initialized.continueSession!({
      sessionId: session.id,
      text: "again",
    });
    assert.equal(second.sessionId, session.id);
    assert.equal(second.outputText, "turn2:");

    await assert.rejects(
      () => initialized.prompt({ sessionId: "missing", text: "x" }),
      (error: unknown) =>
        error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_SESSION",
    );

    const p1 = initialized.prompt({ sessionId: session.id, text: "c1" });
    await assert.rejects(
      () => initialized.prompt({ sessionId: session.id, text: "c2" }),
      (error: unknown) =>
        error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_STATE",
    );
    await p1;

    await assert.rejects(
      () => initialized.createSession({ cwd: path.join(workspace, "..", "escape") }),
      (error: unknown) =>
        error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_VALIDATION",
    );

    await controller.shutdown();

    const loadController = createDevinAcpRuntimeController(
      baseOptions(workspace, {
        devinArgs: fakeArgs("load", { outputChunks: "loaded" }),
      }),
    );
    const loadedRuntime = await loadController.runtime.initialize();
    const loaded = await loadedRuntime.loadSession!({
      sessionId: SESSION_ID,
      cwd: workspace,
    });
    assert.equal(loaded.id, SESSION_ID);
    const loadedPrompt = await loadedRuntime.prompt({
      sessionId: loaded.id,
      text: "after-load",
    });
    assert.equal(loadedPrompt.outputText, "loaded");
    await loadController.shutdown();

    assert.ok(events.some((e) => e.type === "session_created"));
    assert.equal(
      events.some((e) => e.type === "session_created" && "sessionId" in e),
      false,
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("B: symlink escape reject", async () => {
  const workspace = makeWorkspace();
  try {
    await withController(baseOptions(workspace), async (controller) => {
      const runtime = await controller.runtime.initialize();
      const outside = mkdtempSync(path.join(tmpdir(), "loop-acp-out-"));
      const link = path.join(workspace, "escape-link");
      symlinkSync(outside, link);
      await assert.rejects(
        () =>
          runtime.createSession({
            cwd: path.join(link, "nested"),
          }),
        (error: unknown) =>
          error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_VALIDATION",
      );
      rmSync(outside, { recursive: true, force: true });
    });
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("B: canonical cwd uses realpath for in-jail symlink", async () => {
  const workspace = makeWorkspace();
  try {
    const realDir = path.join(workspace, "real-dir");
    mkdirSync(realDir);
    const linkDir = path.join(workspace, "link-dir");
    symlinkSync(realDir, linkDir);
    const expected = realpathSync(realDir);

    await withController(baseOptions(workspace), async (controller) => {
      const runtime = await controller.runtime.initialize();
      const session = await runtime.createSession({ cwd: linkDir });
      assert.equal(session.cwd, expected);
      assert.notEqual(session.cwd, linkDir);
    });
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("B: create missing child under in-jail parent returns canonical path", async () => {
  const workspace = makeWorkspace();
  try {
    const child = path.join(workspace, "missing", "nested");
    await withController(baseOptions(workspace), async (controller) => {
      const runtime = await controller.runtime.initialize();
      const session = await runtime.createSession({ cwd: child });
      assert.equal(session.cwd, path.join(realpathSync(workspace), "missing", "nested"));
    });
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("B: chunks concatenate in order and thoughts excluded", async () => {
  const workspace = makeWorkspace();
  try {
    await withController(
      baseOptions(workspace, {
        devinArgs: fakeArgs("chunks", { outputChunks: "a,b,c" }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "go" });
        assert.equal(result.outputText, "abc");
        assert.equal(result.outputText.includes("THOUGHT"), false);
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// C. Cancellation
// ---------------------------------------------------------------------------

test("C: cancel settles with cancelled stopReason", async () => {
  const workspace = makeWorkspace();
  try {
    await withController(
      baseOptions(workspace, {
        devinArgs: fakeArgs("cancel"),
        requestTimeoutMs: 5_000,
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const promptPromise = runtime.prompt({
          sessionId: session.id,
          text: "long",
        });
        await delay(30);
        await runtime.cancel({ sessionId: session.id });
        const result = await promptPromise;
        assert.equal(result.stopReason, "cancelled");
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("C: continueSession after cancel rejects with E_DEVIN_ACP_STATE", async () => {
  const workspace = makeWorkspace();
  try {
    await withController(
      baseOptions(workspace, {
        devinArgs: fakeArgs("cancel"),
        requestTimeoutMs: 5_000,
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const promptPromise = runtime.prompt({
          sessionId: session.id,
          text: "long",
        });
        await delay(30);
        await runtime.cancel({ sessionId: session.id });
        await promptPromise;

        await assert.rejects(
          () => runtime.continueSession!({ sessionId: session.id, text: "nope" }),
          (error: unknown) =>
            error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_STATE",
        );
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("C: prompt after cancel rejects with E_DEVIN_ACP_STATE", async () => {
  const workspace = makeWorkspace();
  try {
    await withController(
      baseOptions(workspace, {
        devinArgs: fakeArgs("prompt-after-cancel-probe", { outputChunks: "partial" }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const first = await runtime.prompt({ sessionId: session.id, text: "first" });
        assert.equal(first.stopReason, "cancelled");

        await assert.rejects(
          () => runtime.prompt({ sessionId: session.id, text: "second" }),
          (error: unknown) =>
            error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_STATE",
        );
        await assert.rejects(
          () => runtime.continueSession!({ sessionId: session.id, text: "cont" }),
          (error: unknown) =>
            error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_STATE",
        );
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// D. Host-service dispatch
// ---------------------------------------------------------------------------

test("D: permission with cache merge and valid name fields", async () => {
  const workspace = makeWorkspace();
  try {
    const host = recordingHost(async (request) => {
      if (request.kind === "permission") {
        assert.ok(request.params.toolCall.rawInput);
        assert.equal((request.params.toolCall.rawInput as { command?: string }).command, "pwd");
        assert.ok(
          request.params.options.every((o) => typeof o.name === "string" && o.name.length > 0),
        );
        return { outcome: { outcome: "cancelled" } };
      }
      return { handled: request.kind };
    });

    await withController(
      baseOptions(workspace, {
        hostServices: host,
        devinArgs: fakeArgs("permission", { outputChunks: "p" }),
      }),
      async (controller, events) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "perm" });
        assert.equal(result.outputText, "p");
        assert.ok(host.requests.some((r) => r.kind === "permission"));
        assert.ok(events.some((e) => e.type === "host_request" && e.requestKind === "permission"));
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("D: deny-all permission selects reject_once", async () => {
  const workspace = makeWorkspace();
  const hostResponsePath = path.join(workspace, "host-responses.ndjson");
  try {
    await withController(
      baseOptions(workspace, {
        hostServices: denyAllDevinAcpHostServices,
        devinArgs: fakeArgs("permission", {
          outputChunks: "d",
          hostResponsePath,
        }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "deny-perm" });
        assert.equal(result.stopReason, "end_turn");
        const responses = readHostResponses(hostResponsePath);
        const perm = responses.find((r) => r.id === "host-perm-1");
        assert.ok(perm?.result);
        assert.deepEqual(perm?.result, {
          outcome: { outcome: "selected", optionId: "reject-once" },
        });
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("D: deny-all adversarial permission option selection", async () => {
  const allowWithCancelId = await denyAllDevinAcpHostServices.handle({
    kind: "permission",
    method: DEVIN_ACP_HOST_METHODS.permission,
    params: {
      sessionId: "s",
      options: [{ optionId: "cancel-me-not", name: "Allow once", kind: "allow_once" }],
      toolCall: { toolCallId: "t1" },
    },
  });
  assert.deepEqual(allowWithCancelId, { outcome: { outcome: "cancelled" } });

  const allowAlwaysWithRejectId = await denyAllDevinAcpHostServices.handle({
    kind: "permission",
    method: DEVIN_ACP_HOST_METHODS.permission,
    params: {
      sessionId: "s",
      options: [{ optionId: "reject-sounding-allow", name: "Allow always", kind: "allow_always" }],
      toolCall: { toolCallId: "t2" },
    },
  });
  assert.deepEqual(allowAlwaysWithRejectId, { outcome: { outcome: "cancelled" } });

  const onlyRejectAlways = await denyAllDevinAcpHostServices.handle({
    kind: "permission",
    method: DEVIN_ACP_HOST_METHODS.permission,
    params: {
      sessionId: "s",
      options: [{ optionId: "rej-always", name: "Reject always", kind: "reject_always" }],
      toolCall: { toolCallId: "t3" },
    },
  });
  assert.deepEqual(onlyRejectAlways, {
    outcome: { outcome: "selected", optionId: "rej-always" },
  });
});

test("D: parse throws ControlledAcpRpcError for missing name or bad kind", () => {
  assert.throws(
    () =>
      parseDevinAcpHostRequest(DEVIN_ACP_HOST_METHODS.permission, {
        sessionId: "s",
        options: [{ optionId: "x", kind: "allow_once" }],
        toolCall: { toolCallId: "t" },
      }),
    (error: unknown) =>
      error instanceof ControlledAcpRpcError &&
      error.code === -32602 &&
      error.message === CONTROLLED_RPC_MESSAGES.INVALID_PARAMS,
  );

  assert.throws(
    () =>
      parseDevinAcpHostRequest(DEVIN_ACP_HOST_METHODS.permission, {
        sessionId: "s",
        options: [{ optionId: "x", name: "X", kind: "not_a_kind" }],
        toolCall: { toolCallId: "t" },
      }),
    (error: unknown) => error instanceof ControlledAcpRpcError && error.code === -32602,
  );

  assert.equal(classifyDevinAcpHostRequest("nope", {}), null);
  assert.throws(
    () => classifyDevinAcpHostRequest(DEVIN_ACP_HOST_METHODS.filesystemRead, { sessionId: "s" }),
    (error: unknown) => error instanceof ControlledAcpRpcError && error.code === -32602,
  );
});

test("D: fs and terminal dispatch with valid absolute paths and sessionId", async () => {
  const workspace = makeWorkspace();
  try {
    const fsHost = recordingHost();
    await withController(
      baseOptions(workspace, {
        hostServices: fsHost,
        devinArgs: fakeArgs("fs", { outputChunks: "f" }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        await runtime.prompt({ sessionId: session.id, text: "fs" });
        const readReq = fsHost.requests.find((r) => r.kind === "filesystem-read");
        assert.ok(readReq);
        assert.equal(readReq.method, DEVIN_ACP_HOST_METHODS.filesystemRead);
        assert.equal(readReq.params.sessionId, SESSION_ID);
        assert.equal(readReq.params.path, "/tmp/README.md");
        assert.equal(readReq.params.line, 0);
        assert.equal(readReq.params.limit, 0);
      },
    );

    const termHost = recordingHost();
    await withController(
      baseOptions(workspace, {
        hostServices: termHost,
        devinArgs: fakeArgs("terminal", { outputChunks: "t", cwd: workspace }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        await runtime.prompt({ sessionId: session.id, text: "term" });
        const createReq = termHost.requests.find((r) => r.kind === "terminal-create");
        assert.ok(createReq);
        assert.equal(createReq.params.sessionId, SESSION_ID);
        assert.equal(createReq.params.cwd, workspace);
        assert.equal(createReq.params.outputByteLimit, 0);
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("D: malformed host params return -32602 and never call handler", async () => {
  const workspace = makeWorkspace();
  try {
    for (const scenario of [
      "malformed-permission",
      "malformed-fs",
      "malformed-terminal",
      "malformed-terminal-env",
      "malformed-terminal-env-nul",
    ] as const) {
      let calls = 0;
      const host = recordingHost(async () => {
        calls += 1;
        return { ok: true };
      });
      const hostResponsePath = path.join(workspace, `${scenario}-host.ndjson`);
      writeFileSync(hostResponsePath, "", "utf8");

      await withController(
        baseOptions(workspace, {
          hostServices: host,
          devinArgs: fakeArgs(scenario, { outputChunks: "m", hostResponsePath }),
        }),
        async (controller) => {
          const runtime = await controller.runtime.initialize();
          const session = await runtime.createSession({ cwd: workspace });
          const result = await runtime.prompt({ sessionId: session.id, text: scenario });
          assert.equal(result.stopReason, "end_turn");
          assert.equal(calls, 0);
          assert.equal(host.requests.length, 0);
          const responses = readHostResponses(hostResponsePath);
          assert.ok(responses.some((r) => r.error?.code === -32602));
          assertNoSecret(responses);
        },
      );
    }
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("D: host-secret-throw redacts error message on host-response-path", async () => {
  const workspace = makeWorkspace();
  const hostResponsePath = path.join(workspace, "secret-throw.ndjson");
  try {
    const secretPath = "/home/user/.config/devin/credentials.toml";
    const host: DevinAcpHostServices = {
      capabilities: { readTextFile: true, writeTextFile: true, terminal: true },
      async handle() {
        throw new Error(`${SECRET} ${secretPath}`);
      },
    };

    await withController(
      baseOptions(workspace, {
        hostServices: host,
        devinArgs: fakeArgs("host-secret-throw", {
          outputChunks: "e",
          hostResponsePath,
          secretSentinel: SECRET,
        }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "err" });
        assert.equal(result.outputText, "e");

        const responses = readHostResponses(hostResponsePath);
        const err = responses.find((r) => r.id === "host-secret-1");
        assert.equal(err?.error?.code, -32603);
        assert.equal(err?.error?.message, CONTROLLED_RPC_MESSAGES.HOST_REQUEST_FAILED);
        assertNoSecret(responses);
        assert.equal(JSON.stringify(responses).includes(secretPath), false);
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("D: host-hang times out host request but prompt completes", async () => {
  const workspace = makeWorkspace();
  const hostResponsePath = path.join(workspace, "host-hang.ndjson");
  try {
    const host = recordingHost(async () => {
      await new Promise(() => {
        /* never resolves */
      });
      return { ok: false };
    });

    await withController(
      baseOptions(workspace, {
        hostServices: host,
        hostRequestTimeoutMs: 200,
        requestTimeoutMs: 5_000,
        devinArgs: fakeArgs("host-hang", {
          outputChunks: "hung",
          hostResponsePath,
          cwd: workspace,
        }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "hang" });
        assert.equal(result.outputText, "hung");
        const responses = readHostResponses(hostResponsePath);
        assert.ok(
          responses.some(
            (r) =>
              r.id === "host-hang-1" &&
              r.error?.code === -32603 &&
              r.error.message === CONTROLLED_RPC_MESSAGES.HOST_REQUEST_FAILED,
          ),
        );
        assertNoSecret(responses);
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("D: host-concurrency caps in-flight host requests", async () => {
  const workspace = makeWorkspace();
  const hostResponsePath = path.join(workspace, "host-conc.ndjson");
  try {
    const host = recordingHost(async () => {
      await delay(500);
      return { ok: true };
    });

    await withController(
      baseOptions(workspace, {
        hostServices: host,
        maxInFlightHostRequests: 2,
        hostRequestTimeoutMs: 5_000,
        requestTimeoutMs: 5_000,
        devinArgs: fakeArgs("host-concurrency", { outputChunks: "c", hostResponsePath }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "conc" });
        assert.equal(result.outputText, "c");
        const responses = readHostResponses(hostResponsePath);
        const rejected = responses.filter((r) => r.error?.code === -32603);
        assert.ok(rejected.length >= 1, "excess host requests should get -32603");
        assertNoSecret(responses);
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("D: cross-session-cache does not leak POISON secret into permission toolCall", async () => {
  const workspace = makeWorkspace();
  try {
    const host = recordingHost(async (request) => {
      if (request.kind === "permission") {
        const serialized = JSON.stringify(request.params.toolCall);
        assert.equal(serialized.includes(`POISON_${SECRET}`), false);
        assert.equal(serialized.includes(SECRET), false);
        return { outcome: { outcome: "cancelled" } };
      }
      return { ok: true };
    });

    await withController(
      baseOptions(workspace, {
        hostServices: host,
        devinArgs: fakeArgs("cross-session-cache", {
          outputChunks: "x",
          secretSentinel: SECRET,
        }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        await runtime.prompt({ sessionId: session.id, text: "cross" });
        assert.ok(host.requests.some((r) => r.kind === "permission"));
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("D: unknown host method returns -32601 Method not found", async () => {
  const workspace = makeWorkspace();
  const hostResponsePath = path.join(workspace, "unknown-method.ndjson");
  try {
    await withController(
      baseOptions(workspace, {
        hostServices: recordingHost(),
        devinArgs: fakeArgs("unknown-method", {
          outputChunks: "u",
          hostResponsePath,
          secretSentinel: SECRET,
        }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "unk" });
        assert.equal(result.outputText, "u");
        const responses = readHostResponses(hostResponsePath);
        const unknown = responses.find((r) => r.id === "host-unknown-1");
        assert.equal(unknown?.error?.code, -32601);
        assert.equal(unknown?.error?.message, CONTROLLED_RPC_MESSAGES.METHOD_NOT_FOUND);
        assertNoSecret(responses);
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("D: session-scoped tool-call cache isolates same toolCallId across sessions", () => {
  const cache = new DevinAcpToolCallCache({ maxEntries: 8 });
  cache.merge("sess-a", "tc_shared", { rawInput: { command: "from-a" } });
  cache.merge("sess-b", "tc_shared", { rawInput: { command: "from-b" } });
  assert.deepEqual(cache.get("sess-a", "tc_shared")?.rawInput, { command: "from-a" });
  assert.deepEqual(cache.get("sess-b", "tc_shared")?.rawInput, { command: "from-b" });
  cache.clear();
  assert.equal(cache.size, 0);
});

test("D: auth -32000 maps to E_DEVIN_ACP_AUTH", async () => {
  const workspace = makeWorkspace();
  try {
    await withController(
      baseOptions(workspace, {
        devinArgs: fakeArgs("auth-required", { secretSentinel: SECRET }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        await assert.rejects(
          () => runtime.createSession({ cwd: workspace }),
          (error: unknown) => {
            assertNoSecret(error);
            return error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_AUTH";
          },
        );
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// E. Framing / transport hardening
// ---------------------------------------------------------------------------

test("E: framing hardening rejects bad envelopes without secret leak", async () => {
  const workspace = makeWorkspace();
  try {
    for (const scenario of [
      "malformed-json",
      "non-object-json",
      "bad-envelope",
      "result-and-error",
      "response-with-method",
      "invalid-id-type",
      "unsafe-integer-id",
      "duplicate-response-id",
      "unknown-response-id",
      "oversized-line",
      "unterminated-oversize",
      "timeout",
      "exit-during",
    ] as const) {
      const controller = createDevinAcpRuntimeController(
        baseOptions(workspace, {
          devinArgs: fakeArgs(scenario, {
            delayMs: scenario === "timeout" ? 300 : 0,
            lineBytes: 200_000,
            secretSentinel: SECRET,
          }),
          requestTimeoutMs: scenario === "timeout" ? 200 : 5_000,
          maxProtocolLineBytes: 8_192,
          shutdownGraceMs: 500,
        }),
      );
      try {
        await assert.rejects(async () => {
          const runtime = await controller.runtime.initialize();
          // duplicate/unknown may resolve initialize before fatal; next op must fail
          await runtime.createSession({ cwd: workspace });
        }, isTransportOrRuntimeReject);
      } finally {
        await controller.shutdown();
      }
    }
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// F. Output bounds
// ---------------------------------------------------------------------------

test("F: excess multibyte over limit yields E_DEVIN_ACP_OUTPUT_LIMIT", async () => {
  const workspace = makeWorkspace();
  try {
    await withController(
      baseOptions(workspace, {
        maxOutputBytes: 100,
        devinArgs: fakeArgs("excess-output"),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        await assert.rejects(
          () => runtime.prompt({ sessionId: session.id, text: "big" }),
          (error: unknown) =>
            error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_OUTPUT_LIMIT",
        );
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("F: exact byte boundary for ascii chunks succeeds", async () => {
  const workspace = makeWorkspace();
  try {
    const limit = Buffer.byteLength("ab", "utf8");
    await withController(
      baseOptions(workspace, {
        maxOutputBytes: limit,
        devinArgs: fakeArgs("exact-bytes", { outputChunks: "ab" }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "ok" });
        assert.equal(result.outputText, "ab");
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("F: exact multibyte boundary succeeds; over-limit fails", async () => {
  const workspace = makeWorkspace();
  try {
    await withController(
      baseOptions(workspace, {
        maxOutputBytes: 3,
        devinArgs: fakeArgs("exact-bytes", { outputChunks: "文" }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "one" });
        assert.equal(result.outputText, "文");
        assert.equal(Buffer.byteLength(result.outputText, "utf8"), 3);
      },
    );

    await withController(
      baseOptions(workspace, {
        maxOutputBytes: 3,
        devinArgs: fakeArgs("exact-bytes", { outputChunks: "文文" }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        await assert.rejects(
          () => runtime.prompt({ sessionId: session.id, text: "two" }),
          (error: unknown) =>
            error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_OUTPUT_LIMIT",
        );
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// G. Environment isolation
// ---------------------------------------------------------------------------

test("G: environment scrub allowlist and forbidden prefixes", async () => {
  const workspace = makeWorkspace();
  const auditPath = path.join(workspace, "env-audit.txt");
  try {
    const parentEnv: NodeJS.ProcessEnv = {
      ...process.env,
      PATH: process.env.PATH ?? "/usr/bin",
      HOME: process.env.HOME ?? workspace,
      XDG_CONFIG_HOME: path.join(workspace, "xdg-config"),
      XDG_SECRET_TOKEN: SECRET,
      XDG_GITHUB_BACKUP: SECRET,
      LC_SECRET_TOKEN: SECRET,
      GH_TOKEN: SECRET,
      GITHUB_TOKEN: SECRET,
      CLAWSWEEPER_APP_PRIVATE_KEY: SECRET,
      CLAWSWEEPER_APP_ID: SECRET,
      ASCII_BOX_API_KEY: SECRET,
      CRABBOX_ASCII_BOX_API_KEY: SECRET,
      CRABBOX_COORDINATOR_TOKEN: SECRET,
      CLOUDFLARE_API_TOKEN: SECRET,
      CLOUDFLARE_ACCOUNT_ID: SECRET,
      AWS_ACCESS_KEY_ID: SECRET,
      AWS_SECRET_ACCESS_KEY: SECRET,
      AWS_SESSION_TOKEN: SECRET,
      OPENAI_API_KEY: SECRET,
      CODEX_API_KEY: SECRET,
      CODEX_ACCESS_TOKEN: SECRET,
      GITHUB_EXTRA: SECRET,
      CLAWSWEEPER_FOO: SECRET,
      CRABBOX_FOO: SECRET,
      ASCII_BOX_FOO: SECRET,
      CLOUDFLARE_FOO: SECRET,
      CF_FOO: SECRET,
      AWS_FOO: SECRET,
      OPENAI_FOO: SECRET,
      CODEX_FOO: SECRET,
    };
    const parentSnapshot = { ...parentEnv };

    const scrubbed = scrubDevinAcpChildEnv(parentEnv);
    assert.equal(scrubbed.GH_TOKEN, undefined);
    assert.equal(scrubbed.GITHUB_TOKEN, undefined);
    assert.equal(scrubbed.XDG_SECRET_TOKEN, undefined);
    assert.equal(scrubbed.XDG_GITHUB_BACKUP, undefined);
    assert.equal(scrubbed.LC_SECRET_TOKEN, undefined);
    assert.equal(scrubbed.PATH, parentEnv.PATH);
    assert.equal(scrubbed.HOME, parentEnv.HOME);
    assert.equal(scrubbed.XDG_CONFIG_HOME, parentEnv.XDG_CONFIG_HOME);
    assert.deepEqual(parentEnv, parentSnapshot);

    await withController(
      baseOptions(workspace, {
        parentEnv,
        devinArgs: fakeArgs("env-audit", {
          auditPath,
          outputChunks: "env",
        }),
      }),
      async (controller, events) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        await runtime.prompt({ sessionId: session.id, text: "env" });

        const observed = JSON.parse(readFileSync(auditPath, "utf8")) as string[];
        assert.ok(Array.isArray(observed));
        const forbidden = [
          "GH_TOKEN",
          "GITHUB_TOKEN",
          "XDG_SECRET_TOKEN",
          "XDG_GITHUB_BACKUP",
          "LC_SECRET_TOKEN",
          "CLAWSWEEPER_APP_PRIVATE_KEY",
          "ASCII_BOX_API_KEY",
          "CRABBOX_COORDINATOR_TOKEN",
          "CLOUDFLARE_API_TOKEN",
          "AWS_ACCESS_KEY_ID",
          "OPENAI_API_KEY",
          "CODEX_API_KEY",
          "GITHUB_EXTRA",
          "CLAWSWEEPER_FOO",
          "CRABBOX_FOO",
          "ASCII_BOX_FOO",
          "CLOUDFLARE_FOO",
          "CF_FOO",
          "AWS_FOO",
          "OPENAI_FOO",
          "CODEX_FOO",
        ];
        for (const key of forbidden) {
          assert.equal(observed.includes(key), false, `forbidden key reached child: ${key}`);
        }
        assert.ok(observed.includes("PATH"));
        assert.ok(observed.includes("HOME"));
        assert.ok(observed.includes("XDG_CONFIG_HOME"));

        assertNoSecret(events);
        const scrubEvent = events.find((e) => e.type === "environment_scrubbed");
        assert.ok(scrubEvent && scrubEvent.type === "environment_scrubbed");
        assert.equal(typeof scrubEvent.allowedKeyCount, "number");
        assert.equal("allowedKeys" in scrubEvent, false);
        assertNoSecret(scrubEvent);
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// H. Process cleanup
// ---------------------------------------------------------------------------

test("H: shutdown terminates child and is idempotent", async () => {
  const workspace = makeWorkspace();
  const pidPath = path.join(workspace, "child.pid");
  try {
    const controller = createDevinAcpRuntimeController(
      baseOptions(workspace, {
        devinArgs: fakeArgs("happy", { pidPath, outputChunks: "bye" }),
        shutdownGraceMs: 1_000,
      }),
    );
    const runtime = await controller.runtime.initialize();
    const session = await runtime.createSession({ cwd: workspace });
    await runtime.prompt({ sessionId: session.id, text: "x" });

    const pid = Number(readFileSync(pidPath, "utf8").trim());
    assert.ok(Number.isInteger(pid) && pid > 0);
    assert.equal(processAlive(pid), true);

    await controller.shutdown();
    await delay(100);
    assert.equal(processAlive(pid), false);

    await controller.shutdown();
    await assert.rejects(
      () => controller.runtime.initialize(),
      (error: unknown) =>
        error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_STATE",
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("H: spontaneous-exit emits process_exited once and later ops fail", async () => {
  const workspace = makeWorkspace();
  try {
    const events: DevinAcpRuntimeEvent[] = [];
    const controller = createDevinAcpRuntimeController(
      baseOptions(workspace, {
        devinArgs: fakeArgs("spontaneous-exit"),
        eventSink: (e) => events.push(e),
      }),
    );
    try {
      const runtime = await controller.runtime.initialize();
      const deadline = Date.now() + 2_000;
      while (
        Date.now() < deadline &&
        !events.some((e) => e.type === "process_exited" && e.exitCode === 42)
      ) {
        await delay(20);
      }
      const exits = events.filter((e) => e.type === "process_exited");
      assert.equal(exits.length, 1);
      assert.equal(exits[0]?.type === "process_exited" && exits[0].exitCode, 42);

      await assert.rejects(
        () => runtime.createSession({ cwd: workspace }),
        (error: unknown) =>
          error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_STATE",
      );
    } finally {
      await controller.shutdown();
    }
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// I. Event redaction
// ---------------------------------------------------------------------------

test("I: events redact secrets, session ids, prompts, and untrusted metadata", async () => {
  const workspace = makeWorkspace();
  try {
    const events: DevinAcpRuntimeEvent[] = [];
    const promptText = `PROMPT_${SECRET}`;
    await withController(
      baseOptions(workspace, {
        parentEnv: {
          ...process.env,
          OPENAI_API_KEY: SECRET,
          HOME: process.env.HOME,
          PATH: process.env.PATH,
        },
        hostServices: recordingHost(),
        devinArgs: fakeArgs("untrusted-events", {
          outputChunks: `OUT_${SECRET}`,
          secretSentinel: SECRET,
        }),
        eventSink: (e) => events.push(e),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: promptText });
        assert.equal(result.stopReason, "end_turn");
      },
    );

    const serialized = JSON.stringify(events);
    assert.equal(serialized.includes(SECRET), false);
    assert.equal(serialized.includes(promptText), false);
    assert.equal(serialized.includes(SESSION_ID), false);
    assert.equal(serialized.includes(THOUGHT_TEXT), false);

    const expectedDigest = digest(SESSION_ID);
    assert.equal(expectedDigest.length, 16);
    assert.match(expectedDigest, /^[0-9a-f]{16}$/);
    assert.ok(serialized.includes(expectedDigest));

    assert.ok(events.some((e) => e.type === "session_update" && e.updateKind === "unknown"));
    const completed = events.find((e) => e.type === "prompt_completed");
    assert.ok(completed && completed.type === "prompt_completed");
    assert.equal(completed.stopReason, "end_turn");
    assert.equal(completed.sessionIdDigest, expectedDigest);
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// J. Source boundary
// ---------------------------------------------------------------------------

test("J: source boundary — no Crabbox/Codex/GitHub imports or call sites", () => {
  const productionFiles = [
    "src/box-agent-worker/acp-stdio-transport.ts",
    "src/box-agent-worker/devin-acp-host-services.ts",
    "src/box-agent-worker/devin-acp-runtime.ts",
  ];
  const forbidden = [
    "CrabboxWorkspaceHost",
    "crabbox-workspace-host",
    "codex-process",
    "CodexProcess",
    "octokit",
    "cloudflare",
    "result-contracts",
    "devin -p",
    "child_process.exec",
    "shell: true",
    "fetch(",
    "http.request",
    "https.request",
  ];

  for (const rel of productionFiles) {
    const text = readFileSync(path.join(REPO_ROOT, rel), "utf8");
    for (const needle of forbidden) {
      assert.equal(text.includes(needle), false, `${rel} unexpectedly references ${needle}`);
    }
    if (rel.endsWith("devin-acp-runtime.ts")) {
      assert.equal(text.includes("process.env"), false);
    }
  }

  const srcFiles = readdirSync(path.join(REPO_ROOT, "src"), { withFileTypes: true });
  const walk: string[] = [];
  function collect(dir: string): void {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "box-agent-worker") continue;
        collect(full);
      } else if (entry.name.endsWith(".ts")) {
        walk.push(full);
      }
    }
  }
  for (const entry of srcFiles) {
    const full = path.join(REPO_ROOT, "src", entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "box-agent-worker") continue;
      collect(full);
    } else if (entry.name.endsWith(".ts")) {
      walk.push(full);
    }
  }

  for (const file of walk) {
    const text = readFileSync(file, "utf8");
    assert.equal(
      text.includes("devin-acp-runtime"),
      false,
      `production call site imports runtime: ${file}`,
    );
    assert.equal(
      text.includes("box-agent-worker/"),
      false,
      `production call site imports box-agent-worker: ${file}`,
    );
  }
});

test("validation rejects empty/NUL and relative workspaceRoot", () => {
  assert.throws(
    () =>
      createDevinAcpRuntimeController({
        workspaceRoot: "relative",
        parentEnv: process.env,
      }),
    (error: unknown) =>
      error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_VALIDATION",
  );
  assert.throws(
    () =>
      createDevinAcpRuntimeController({
        workspaceRoot: `/tmp/acp-\0-bad`,
        parentEnv: process.env,
      }),
    (error: unknown) =>
      error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_VALIDATION",
  );
  assert.throws(
    () =>
      createDevinAcpRuntimeController({
        workspaceRoot: "",
        parentEnv: process.env,
      }),
    (error: unknown) =>
      error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_VALIDATION",
  );
});

// ---------------------------------------------------------------------------
// K. Phase 3A.2 hardening
// ---------------------------------------------------------------------------

test("K: controlled-error message bypass is sanitized", async () => {
  const workspace = makeWorkspace();
  const hostResponsePath = path.join(workspace, "controlled-throw.ndjson");
  try {
    const secretPath = "/home/user/.config/devin/credentials.toml";

    class EvilControlledError extends ControlledAcpRpcError {
      constructor() {
        super(-32603);
        this.message = `${SECRET} ${secretPath}`;
      }
    }

    const host: DevinAcpHostServices = {
      capabilities: { readTextFile: true, writeTextFile: true, terminal: true },
      async handle() {
        throw new EvilControlledError();
      },
    };

    await withController(
      baseOptions(workspace, {
        hostServices: host,
        devinArgs: fakeArgs("host-secret-throw", {
          outputChunks: "e",
          hostResponsePath,
          secretSentinel: SECRET,
        }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "err" });
        assert.equal(result.outputText, "e");

        const responses = readHostResponses(hostResponsePath);
        const err = responses.find((r) => r.id === "host-secret-1");
        assert.equal(err?.error?.code, -32603);
        assert.equal(err?.error?.message, CONTROLLED_RPC_MESSAGES.HOST_REQUEST_FAILED);
        assertNoSecret(responses);
        assert.equal(JSON.stringify(responses).includes(secretPath), false);
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("K: duplicate inbound host-request IDs reject before second handler", async () => {
  const workspace = makeWorkspace();
  const hostResponsePath = path.join(workspace, "host-dup.ndjson");
  try {
    let calls = 0;
    const host = recordingHost(async () => {
      calls += 1;
      await delay(50);
      return { ok: true };
    });

    await withController(
      baseOptions(workspace, {
        hostServices: host,
        hostRequestTimeoutMs: 500,
        requestTimeoutMs: 5_000,
        devinArgs: fakeArgs("duplicate-host", { outputChunks: "d", hostResponsePath }),
      }),
      async (controller, events) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });

        await assert.rejects(
          () => runtime.prompt({ sessionId: session.id, text: "dup" }),
          (error: unknown) => {
            assertNoSecret(error);
            return error instanceof AcpTransportError && error.code === "E_ACP_PROTOCOL";
          },
        );

        assert.equal(calls, 1);
        assert.equal(host.requests.length, 1);

        // Wait for the fatal shutdown to complete and the child to exit.
        await controller.shutdown();

        const responses = readHostResponses(hostResponsePath);
        const dupResponses = responses.filter((r) => r.id === "host-dup-1");
        assert.equal(
          dupResponses.length,
          0,
          "no response may be written for a duplicated host request id",
        );
        assert.ok(
          events.some((e) => e.type === "process_exited"),
          "peer must be terminated after duplicate host id",
        );
        assert.ok(
          !events.some((e) => e.type === "prompt_completed"),
          "prompt must not complete after duplicate host id",
        );
        assertNoSecret(events);

        // Shutdown must remain idempotent after the fatal transport state.
        await controller.shutdown();
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("K: unsolicited host requests are rejected outside active prompts", async () => {
  const workspace = makeWorkspace();
  const hostResponsePath = path.join(workspace, "unsolicited.ndjson");
  try {
    const host = recordingHost(async () => ({ ok: true }));

    await withController(
      baseOptions(workspace, {
        hostServices: host,
        devinArgs: fakeArgs("unsolicited-before-prompt", {
          outputChunks: "u",
          hostResponsePath,
        }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "u" });
        assert.equal(result.outputText, "u");
        assert.equal(host.requests.length, 0);

        const responses = readHostResponses(hostResponsePath);
        const unsolicited = responses.find((r) => r.id === "host-unsolicited-before");
        assert.equal(unsolicited?.error?.code, -32602);
        assertNoSecret(responses);
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("K: host requests for other registered sessions are rejected", async () => {
  const workspace = makeWorkspace();
  const secondSessionId = "sess-other-002";
  const hostResponsePath = path.join(workspace, "other-session.ndjson");
  try {
    const host = recordingHost(async () => ({ ok: true }));

    await withController(
      baseOptions(workspace, {
        hostServices: host,
        devinArgs: fakeArgs("other-session", {
          outputChunks: "o",
          hostResponsePath,
          secondSessionId,
        }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const first = await runtime.createSession({ cwd: workspace });
        await runtime.loadSession!({ sessionId: secondSessionId, cwd: workspace });
        const result = await runtime.prompt({ sessionId: first.id, text: "o" });
        assert.equal(result.outputText, "o");
        assert.equal(host.requests.length, 0);

        const responses = readHostResponses(hostResponsePath);
        const other = responses.find((r) => r.id === "host-other-session");
        assert.equal(other?.error?.code, -32602);
        assertNoSecret(responses);
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("K: stale same-session tool-call update does not poison next prompt", async () => {
  const workspace = makeWorkspace();
  const hostResponsePath = path.join(workspace, "stale-cache.ndjson");
  try {
    const host = recordingHost(async (request) => {
      if (request.kind === "permission") {
        const raw = request.params.toolCall.rawInput as { command?: string } | undefined;
        if (request.params.toolCall.toolCallId === "tc_shared") {
          assert.equal(raw?.command, "second");
          assert.equal(JSON.stringify(request.params.toolCall).includes(`STALE_${SECRET}`), false);
          assertNoSecret(request.params.toolCall);
        }
        return { outcome: { outcome: "cancelled" } };
      }
      return { ok: true };
    });

    await withController(
      baseOptions(workspace, {
        hostServices: host,
        devinArgs: fakeArgs("stale-cache", {
          outputChunks: "s",
          hostResponsePath,
          secretSentinel: SECRET,
        }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const first = await runtime.prompt({ sessionId: session.id, text: "first" });
        assert.equal(first.outputText, "first");

        await delay(150);

        const second = await runtime.continueSession!({ sessionId: session.id, text: "second" });
        assert.equal(second.outputText, "second");
        assert.ok(host.requests.some((r) => r.kind === "permission"));
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("K: tool-call cache bounds final merged entry", () => {
  const cache = new DevinAcpToolCallCache({ maxEntries: 8, maxEntryBytes: 64 });
  const toolCallId = "tc_grow";
  for (let i = 0; i < 10; i += 1) {
    cache.merge("sess-1", toolCallId, {
      toolCallId,
      sessionUpdate: "tool_call_update",
      rawInput: { [`key${i}`]: "a".repeat(16) },
    });
  }
  const stored = cache.get("sess-1", toolCallId);
  assert.ok(stored);
  assert.equal(
    JSON.stringify(stored).includes("key9"),
    false,
    "oversized merged content must be discarded",
  );
  assert.equal(
    stored.rawInput,
    undefined,
    "rawInput must be dropped when merged entry exceeds limit",
  );
  assert.equal(stored.toolCallId, "tc_grow");
});

test("K: parse host request rejects invalid ACP schema", () => {
  const baseFs = {
    sessionId: "s",
    path: "/tmp/x",
  };

  for (const bad of [Number.NaN, -1, 1.5, Number.MAX_SAFE_INTEGER + 1, "x"]) {
    assert.throws(
      () =>
        parseDevinAcpHostRequest(DEVIN_ACP_HOST_METHODS.filesystemRead, { ...baseFs, line: bad }),
      (error: unknown) => error instanceof ControlledAcpRpcError && error.code === -32602,
    );
    assert.throws(
      () =>
        parseDevinAcpHostRequest(DEVIN_ACP_HOST_METHODS.filesystemRead, { ...baseFs, limit: bad }),
      (error: unknown) => error instanceof ControlledAcpRpcError && error.code === -32602,
    );
  }

  const fsZero = parseDevinAcpHostRequest(DEVIN_ACP_HOST_METHODS.filesystemRead, {
    ...baseFs,
    line: 0,
    limit: null,
  });
  assert.equal(fsZero.kind === "filesystem-read" && fsZero.params.line, 0);
  const fsNull = parseDevinAcpHostRequest(DEVIN_ACP_HOST_METHODS.filesystemRead, {
    ...baseFs,
    line: null,
    limit: 0,
  });
  assert.equal(fsNull.kind === "filesystem-read" && fsNull.params.limit, 0);

  const termNoCwd = parseDevinAcpHostRequest(DEVIN_ACP_HOST_METHODS.terminalCreate, {
    sessionId: "s",
    command: "pwd",
    outputByteLimit: 0,
  });
  assert.equal(termNoCwd.kind === "terminal-create" && termNoCwd.params.cwd, undefined);
  assert.throws(
    () =>
      parseDevinAcpHostRequest(DEVIN_ACP_HOST_METHODS.terminalCreate, {
        sessionId: "s",
        command: "pwd",
        cwd: "relative",
      }),
    (error: unknown) => error instanceof ControlledAcpRpcError && error.code === -32602,
  );
  assert.throws(
    () =>
      parseDevinAcpHostRequest(DEVIN_ACP_HOST_METHODS.terminalCreate, {
        sessionId: "s",
        command: "pwd",
        env: [{ name: "A=B", value: "v" }],
      }),
    (error: unknown) => error instanceof ControlledAcpRpcError && error.code === -32602,
  );
  assert.throws(
    () =>
      parseDevinAcpHostRequest(DEVIN_ACP_HOST_METHODS.terminalCreate, {
        sessionId: "s",
        command: "pwd",
        env: [{ name: "A", value: "v\u0000" }],
      }),
    (error: unknown) => error instanceof ControlledAcpRpcError && error.code === -32602,
  );
});

test("K: terminal cwd falls back to session cwd and rejects escapes", async () => {
  const workspace = makeWorkspace();
  const outside = mkdtempSync(path.join(tmpdir(), "loop-acp-out-"));
  try {
    const fallbackHost = recordingHost();
    await withController(
      baseOptions(workspace, {
        hostServices: fallbackHost,
        devinArgs: fakeArgs("terminal", { outputChunks: "fb" }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "fb" });
        assert.equal(result.outputText, "fb");
        const createReq = fallbackHost.requests.find((r) => r.kind === "terminal-create");
        assert.ok(createReq);
        assert.equal(createReq.params.cwd, session.cwd);
      },
    );

    const escapeHost = recordingHost();
    const escapeResponsePath = path.join(workspace, "term-escape.ndjson");
    await withController(
      baseOptions(workspace, {
        hostServices: escapeHost,
        devinArgs: fakeArgs("terminal", {
          outputChunks: "e",
          cwd: outside,
          hostResponsePath: escapeResponsePath,
        }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "e" });
        assert.equal(result.outputText, "e");
        assert.equal(escapeHost.requests.length, 0);
        const responses = readHostResponses(escapeResponsePath);
        const err = responses.find((r) => r.id === "host-term-1");
        assert.equal(err?.error?.code, -32602);
        assertNoSecret(responses);
      },
    );

    const realDir = path.join(workspace, "real-dir");
    mkdirSync(realDir);
    const linkDir = path.join(workspace, "link-dir");
    symlinkSync(realDir, linkDir);
    const expected = realpathSync(realDir);

    const canonicalHost = recordingHost();
    const canonicalResponsePath = path.join(workspace, "term-canonical.ndjson");
    await withController(
      baseOptions(workspace, {
        hostServices: canonicalHost,
        devinArgs: fakeArgs("terminal", {
          outputChunks: "c",
          cwd: linkDir,
          hostResponsePath: canonicalResponsePath,
        }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "c" });
        assert.equal(result.outputText, "c");
        const createReq = canonicalHost.requests.find((r) => r.kind === "terminal-create");
        assert.ok(createReq);
        assert.equal(createReq.params.cwd, expected);
        assert.notEqual(createReq.params.cwd, linkDir);
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
    rmSync(outside, { recursive: true, force: true });
  }
});

test("K: exact stop-reason union rejects unknown values", async () => {
  const workspace = makeWorkspace();
  const events: DevinAcpRuntimeEvent[] = [];
  try {
    await withController(
      baseOptions(workspace, {
        devinArgs: fakeArgs("bad-stop-reason", { outputChunks: "x", secretSentinel: SECRET }),
        eventSink: (e) => events.push(e),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        await assert.rejects(
          () => runtime.prompt({ sessionId: session.id, text: "bad" }),
          (error: unknown) => {
            assertNoSecret(error);
            return error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_PROTOCOL";
          },
        );
      },
    );

    const serialized = JSON.stringify(events);
    assert.equal(serialized.includes(SECRET), false);
    assert.equal(
      events.some((e) => e.type === "prompt_completed"),
      false,
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
});

test("K: workspaceRoot resolution failure redacts path", () => {
  const missing = `/tmp/loop-acp-missing-${SECRET}`;
  try {
    assert.throws(
      () =>
        createDevinAcpRuntimeController({
          workspaceRoot: missing,
          parentEnv: process.env,
        }),
      (error: unknown) => {
        assertNoSecret(error);
        return error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_VALIDATION";
      },
    );
  } finally {
    /* path never created, nothing to clean */
  }
});

// ---------------------------------------------------------------------------
// L. Phase 3A.3 final boundary gaps
// ---------------------------------------------------------------------------

test("L: cache bounds the exact object delivered to permission handler", () => {
  const cache = new DevinAcpToolCallCache({ maxEntries: 8, maxEntryBytes: 64 });
  const toolCallId = "tc_bound";

  for (let i = 0; i < 5; i += 1) {
    cache.merge("sess-1", toolCallId, {
      toolCallId,
      sessionUpdate: "tool_call_update",
      rawInput: { [`chunk${i}`]: "a".repeat(12) },
    });
  }

  const stored = cache.get("sess-1", toolCallId);
  assert.ok(stored);
  const storedBytes = Buffer.byteLength(JSON.stringify(stored), "utf8");
  assert.ok(storedBytes <= 64, `stored entry must be <= 64 bytes, got ${storedBytes}`);
  assert.equal(stored.rawInput, undefined, "rawInput must be dropped when merged entry exceeds cap");

  const params: HostMod.DevinAcpPermissionParams = {
    sessionId: "sess-1",
    options: [{ optionId: "reject-once", name: "Reject", kind: "reject_once" }],
    toolCall: { toolCallId },
  };

  const merged = mergePermissionParamsWithToolCallCache(params, cache);
  const mergedBytes = Buffer.byteLength(JSON.stringify(merged.toolCall), "utf8");
  assert.ok(
    mergedBytes <= 64,
    `toolCall delivered to handler must be <= 64 bytes, got ${mergedBytes}`,
  );
  assert.equal(merged.toolCall.rawInput, undefined, "handler must not receive oversized rawInput");
  assert.equal(merged.toolCall.toolCallId, "tc_bound");
});

test("L: oversized direct permission toolCall is bounded or rejected", () => {
  const cache = new DevinAcpToolCallCache({ maxEntries: 8, maxEntryBytes: 64 });

  const normal: HostMod.DevinAcpPermissionParams = {
    sessionId: "sess-1",
    options: [{ optionId: "reject-once", name: "Reject", kind: "reject_once" }],
    toolCall: {
      toolCallId: "tc_huge_raw",
      rawInput: { command: "x".repeat(256) },
    },
  };

  const bounded = mergePermissionParamsWithToolCallCache(normal, cache);
  const boundedBytes = Buffer.byteLength(JSON.stringify(bounded.toolCall), "utf8");
  assert.ok(boundedBytes <= 64, `bounded toolCall must be <= 64 bytes, got ${boundedBytes}`);
  assert.equal(bounded.toolCall.rawInput, undefined);
  assert.equal(bounded.toolCall.toolCallId, "tc_huge_raw");

  const hugeId = "x".repeat(96);
  const invalid: HostMod.DevinAcpPermissionParams = {
    sessionId: "sess-1",
    options: [{ optionId: "reject-once", name: "Reject", kind: "reject_once" }],
    toolCall: { toolCallId: hugeId },
  };

  assert.throws(
    () => mergePermissionParamsWithToolCallCache(invalid, cache),
    (error: unknown) =>
      error instanceof ControlledAcpRpcError && error.code === -32602,
  );
});

test("L: huge safe metadata fields cannot exceed cache cap", () => {
  const cache = new DevinAcpToolCallCache({ maxEntries: 8, maxEntryBytes: 64 });
  const hugeId = "x".repeat(96);
  const hugeSession = "tool_call_update_".repeat(10);
  const hugeTitle = "y".repeat(200);

  assert.equal(
    cache.mergeAndGet("sess-1", hugeId, { toolCallId: hugeId, sessionUpdate: hugeSession }),
    undefined,
    "huge toolCallId/sessionUpdate must be rejected entirely",
  );

  assert.equal(
    cache.mergeAndGet("sess-1", "tc_title", {
      toolCallId: "tc_title",
      sessionUpdate: "tool_call",
      title: hugeTitle,
    }),
    undefined,
    "huge safe title must be rejected entirely",
  );

  assert.equal(cache.get("sess-1", "tc_title"), undefined);
  assert.equal(cache.size, 0);
});

test("L: serialized cache entries and handler-visible toolCall fit within maxEntryBytes", () => {
  const cache = new DevinAcpToolCallCache({ maxEntries: 4, maxEntryBytes: 64 });

  for (let i = 0; i < 20; i += 1) {
    cache.merge("sess-1", "t", {
      toolCallId: "t",
      sessionUpdate: "u",
      rawInput: { step: i, payload: "b".repeat(24) },
    });
  }

  const stored = cache.get("sess-1", "t");
  assert.ok(stored);
  assert.ok(Buffer.byteLength(JSON.stringify(stored), "utf8") <= 64);

  const params: HostMod.DevinAcpPermissionParams = {
    sessionId: "sess-1",
    options: [{ optionId: "reject-once", name: "Reject", kind: "reject_once" }],
    toolCall: { toolCallId: "t" },
  };
  const merged = mergePermissionParamsWithToolCallCache(params, cache);
  assert.ok(Buffer.byteLength(JSON.stringify(merged.toolCall), "utf8") <= 64);
});

test("L: workspaceRoot is immutable after construction", async () => {
  const workspace = makeWorkspace();
  const outside = mkdtempSync(path.join(tmpdir(), "loop-acp-out-"));
  const hostResponsePath = path.join(workspace, "root-replace.ndjson");
  try {
    const host = recordingHost(async () => ({ ok: true }));

    await withController(
      baseOptions(workspace, {
        hostServices: host,
        devinArgs: fakeArgs("terminal", { outputChunks: "r", cwd: workspace, hostResponsePath }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();

        // Before replacement: session creation works.
        const first = await runtime.createSession({ cwd: workspace });
        assert.equal(first.cwd, workspace);

        // Replace the workspace root path with a symlink to an outside directory.
        rmSync(workspace, { recursive: true, force: true });
        symlinkSync(outside, workspace);

        // New sessions through the replaced path must reject the outside destination.
        await assert.rejects(
          () => runtime.createSession({ cwd: workspace }),
          (error: unknown) => {
            assertNoSecret(error);
            return error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_VALIDATION";
          },
        );

        // Terminal cwd through the replaced path must also reject.
        const result = await runtime.prompt({ sessionId: first.id, text: "r" });
        assert.equal(result.outputText, "r");
        assert.equal(host.requests.length, 0);
        const responses = readHostResponses(hostResponsePath);
        const err = responses.find((r) => r.id === "host-term-1");
        assert.equal(err?.error?.code, -32602);
        assertNoSecret(responses);
      },
    );
  } finally {
    rmSync(workspace, { recursive: true, force: true });
    rmSync(outside, { recursive: true, force: true });
  }
});
