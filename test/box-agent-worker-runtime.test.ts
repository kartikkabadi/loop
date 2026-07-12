import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, symlinkSync } from "node:fs";
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
} from "../dist/box-agent-worker/devin-acp-host-services.js";
import type {
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

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FIXTURE = path.join(HERE, "fixtures", "fake-devin-acp.mjs");
const REPO_ROOT = path.resolve(HERE, "..");
const SECRET = "FAKE_SECRET_SENTINEL_XYZ";
const SESSION_ID = "sess-redact-FAKE_SECRET_SENTINEL_XYZ";

type RecordingHost = DevinAcpHostServices & {
  readonly requests: DevinAcpHostRequest[];
};

function digest(sessionId: string): string {
  return createHash("sha256").update(sessionId).digest("hex");
}

function makeWorkspace(): string {
  const dir = mkdtempSync(path.join(tmpdir(), "loop-devin-acp-"));
  return realpathSync(dir);
}

function fakeArgs(scenario: string, extra: Record<string, string | number> = {}): string[] {
  const args = [FIXTURE, `--scenario=${scenario}`, `--session-id=${SESSION_ID}`];
  if (extra.auditPath) args.push(`--audit-path=${extra.auditPath}`);
  if (extra.pidPath) args.push(`--pid-path=${extra.pidPath}`);
  if (extra.delayMs !== undefined) args.push(`--delay-ms=${extra.delayMs}`);
  if (extra.outputChunks) args.push(`--output-chunks=${extra.outputChunks}`);
  if (extra.lineBytes !== undefined) args.push(`--line-bytes=${extra.lineBytes}`);
  if (extra.secretSentinel) args.push(`--secret-sentinel=${extra.secretSentinel}`);
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
): RecordingHost {
  const requests: DevinAcpHostRequest[] = [];
  return {
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
      assert.ok(events.some((e) => e.type === "environment_scrubbed"));
    });
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

    const outside = mkdtempSync(path.join(tmpdir(), "loop-acp-out-"));
    const link = path.join(workspace, "escape-link");
    symlinkSync(outside, link);
    await assert.rejects(
      () =>
        initialized.createSession({
          cwd: path.join(link, "nested"),
        }),
      (error: unknown) =>
        error instanceof DevinAcpRuntimeError && error.code === "E_DEVIN_ACP_VALIDATION",
    );
    rmSync(outside, { recursive: true, force: true });

    await controller.shutdown();

    // load in a fresh process
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

test("C: cancel settles with authoritative cancelled stopReason", async () => {
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

// ---------------------------------------------------------------------------
// D. Host-service dispatch
// ---------------------------------------------------------------------------

test("D: host-service dispatch, deny-all, and tool-call cache", async () => {
  const workspace = makeWorkspace();
  try {
    const host = recordingHost(async (request) => {
      if (request.kind === "permission") {
        const params = request.params as { toolCall?: { rawInput?: unknown } };
        assert.ok(params.toolCall?.rawInput);
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
        assert.ok(fsHost.requests.some((r) => r.kind === "filesystem-read"));
        assert.equal(
          fsHost.requests.find((r) => r.kind === "filesystem-read")?.method,
          DEVIN_ACP_HOST_METHODS.filesystemRead,
        );
      },
    );

    const termHost = recordingHost();
    await withController(
      baseOptions(workspace, {
        hostServices: termHost,
        devinArgs: fakeArgs("terminal", { outputChunks: "t" }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        await runtime.prompt({ sessionId: session.id, text: "term" });
        assert.ok(termHost.requests.some((r) => r.kind === "terminal-create"));
      },
    );

    await withController(
      baseOptions(workspace, {
        hostServices: denyAllDevinAcpHostServices,
        devinArgs: fakeArgs("fs", { outputChunks: "x" }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        // deny-all throws; transport returns JSON-RPC error to fake; prompt still completes
        const result = await runtime.prompt({ sessionId: session.id, text: "deny" });
        assert.equal(result.stopReason, "end_turn");
      },
    );

    await withController(
      baseOptions(workspace, {
        hostServices: recordingHost(),
        devinArgs: fakeArgs("unknown-method", { outputChunks: "u" }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "unk" });
        assert.equal(result.outputText, "u");
      },
    );

    const throwingHost: DevinAcpHostServices = {
      async handle() {
        throw new Error(`boom ${SECRET}`);
      },
    };
    await withController(
      baseOptions(workspace, {
        hostServices: throwingHost,
        devinArgs: fakeArgs("terminal", { outputChunks: "e" }),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        const result = await runtime.prompt({ sessionId: session.id, text: "err" });
        assert.equal(result.outputText, "e");
      },
    );

    assert.equal(classifyDevinAcpHostRequest("nope", {}), null);
    assert.equal(
      classifyDevinAcpHostRequest(DEVIN_ACP_HOST_METHODS.permission, {})?.kind,
      "permission",
    );

    const cache = new DevinAcpToolCallCache({ maxEntries: 2 });
    cache.merge("a", { rawInput: { x: 1 } });
    cache.merge("b", { rawInput: { y: 2 } });
    cache.merge("c", { rawInput: { z: 3 } });
    assert.equal(cache.size, 2);
    assert.equal(cache.get("a"), undefined);
    cache.clear();
    assert.equal(cache.size, 0);
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
      "bad-envelope",
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
        await assert.rejects(
          () => controller.runtime.initialize(),
          (error: unknown) => {
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
          },
        );
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

test("F: output byte bounds reject over-limit multibyte output", async () => {
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

    await withController(
      baseOptions(workspace, {
        maxOutputBytes: 3,
        devinArgs: fakeArgs("chunks", { outputChunks: "ab" }),
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

// ---------------------------------------------------------------------------
// G. Environment isolation
// ---------------------------------------------------------------------------

test("G: environment scrub isolates forbidden keys", async () => {
  const workspace = makeWorkspace();
  const auditPath = path.join(workspace, "env-audit.txt");
  try {
    const parentEnv: NodeJS.ProcessEnv = {
      ...process.env,
      PATH: process.env.PATH ?? "/usr/bin",
      HOME: process.env.HOME ?? workspace,
      XDG_CONFIG_HOME: path.join(workspace, "xdg-config"),
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

// ---------------------------------------------------------------------------
// I. Event redaction
// ---------------------------------------------------------------------------

test("I: events redact prompts, session ids, secrets, and payloads", async () => {
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
        devinArgs: fakeArgs("permission", {
          outputChunks: `OUT_${SECRET}`,
          secretSentinel: SECRET,
        }),
        eventSink: (e) => events.push(e),
      }),
      async (controller) => {
        const runtime = await controller.runtime.initialize();
        const session = await runtime.createSession({ cwd: workspace });
        await runtime.prompt({ sessionId: session.id, text: promptText });
      },
    );

    const serialized = JSON.stringify(events);
    assert.equal(serialized.includes(SECRET), false);
    assert.equal(serialized.includes(promptText), false);
    assert.equal(serialized.includes(SESSION_ID), false);
    assert.equal(serialized.includes("THOUGHT_SHOULD_NOT_APPEAR"), false);
    assert.ok(serialized.includes(digest(SESSION_ID)));
    assert.ok(events.some((e) => e.type === "prompt_completed"));
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
    // process.env must not be read outside the scrub input boundary.
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
});
