#!/usr/bin/env node
/**
 * Deterministic fake Devin ACP server for Phase 3A tests.
 * Newline-delimited JSON-RPC over stdio. No network. No Devin. No production imports.
 *
 * Argv flags (not env secrets):
 *   --scenario=<name>
 *   --audit-path=<path>
 *   --pid-path=<path>
 *   --host-response-path=<path>  (records host JSON-RPC responses)
 *   --delay-ms=<n>
 *   --output-chunks=a,b,c
 *   --session-id=<id>
 *   --line-bytes=<n>
 *   --max-output-chars=<n>
 *   --secret-sentinel=<text>
 *   --load-session=<true|false>
 *   --ignore-sigterm=<true|false>
 */

import { appendFileSync, closeSync, writeFileSync } from "node:fs";
import process from "node:process";

function parseArgs(argv) {
  const out = {
    scenario: "happy",
    auditPath: null,
    pidPath: null,
    hostResponsePath: null,
    delayMs: 0,
    outputChunks: ["Hello ", "world"],
    sessionId: "sess_fake_001",
    secondSessionId: "sess_second_001",
    lineBytes: 2_000_000,
    maxOutputChars: null,
    secretSentinel: "FAKE_SECRET_SENTINEL_XYZ",
    loadSession: true,
    ignoreSigterm: false,
    cwd: null,
  };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith("--scenario=")) out.scenario = arg.slice("--scenario=".length);
    else if (arg.startsWith("--audit-path=")) out.auditPath = arg.slice("--audit-path=".length);
    else if (arg.startsWith("--pid-path=")) out.pidPath = arg.slice("--pid-path=".length);
    else if (arg.startsWith("--host-response-path=")) {
      out.hostResponsePath = arg.slice("--host-response-path=".length);
    } else if (arg.startsWith("--delay-ms=")) out.delayMs = Number(arg.slice("--delay-ms=".length));
    else if (arg.startsWith("--output-chunks=")) {
      out.outputChunks = arg.slice("--output-chunks=".length).split(",");
    } else if (arg.startsWith("--session-id=")) out.sessionId = arg.slice("--session-id=".length);
    else if (arg.startsWith("--second-session-id=")) {
      out.secondSessionId = arg.slice("--second-session-id=".length);
    } else if (arg.startsWith("--line-bytes="))
      out.lineBytes = Number(arg.slice("--line-bytes=".length));
    else if (arg.startsWith("--max-output-chars=")) {
      out.maxOutputChars = Number(arg.slice("--max-output-chars=".length));
    } else if (arg.startsWith("--secret-sentinel=")) {
      out.secretSentinel = arg.slice("--secret-sentinel=".length);
    } else if (arg.startsWith("--load-session=")) {
      out.loadSession = arg.slice("--load-session=".length) !== "false";
    } else if (arg.startsWith("--ignore-sigterm=")) {
      out.ignoreSigterm = arg.slice("--ignore-sigterm=".length) === "true";
    } else if (arg.startsWith("--cwd=")) {
      out.cwd = arg.slice("--cwd=".length);
    }
  }
  return out;
}

const args = parseArgs(process.argv);

if (args.ignoreSigterm) {
  process.on("SIGTERM", () => {
    /* ignore for shutdown-stuck scenario */
  });
}

if (args.pidPath) {
  writeFileSync(args.pidPath, String(process.pid), "utf8");
}
if (args.auditPath) {
  writeFileSync(args.auditPath, JSON.stringify(Object.keys(process.env).sort()) + "\n", "utf8");
}
if (args.hostResponsePath) {
  writeFileSync(args.hostResponsePath, "", "utf8");
}

if (args.scenario === "stderr-diag") {
  process.stderr.write(`diag:${args.secretSentinel}\n`);
}

let buffer = "";
let promptCount = 0;
let cancelRequested = false;
let initialized = false;
const seenResponseIds = new Set();

function write(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

function respond(id, result) {
  write({ jsonrpc: "2.0", id, result });
}

function respondError(id, code, message) {
  write({ jsonrpc: "2.0", id, error: { code, message } });
}

function recordHostResponse(msg) {
  if (!args.hostResponsePath) return;
  appendFileSync(args.hostResponsePath, JSON.stringify(msg) + "\n", "utf8");
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function emitAgentChunks(sessionId, chunks, includeThought = true) {
  if (includeThought) {
    write({
      jsonrpc: "2.0",
      method: "session/update",
      params: {
        sessionId,
        update: {
          sessionUpdate: "agent_thought_chunk",
          content: { type: "text", text: "secret-thought-should-exclude" },
        },
      },
    });
  }
  for (const chunk of chunks) {
    write({
      jsonrpc: "2.0",
      method: "session/update",
      params: {
        sessionId,
        update: {
          sessionUpdate: "agent_message_chunk",
          content: { type: "text", text: chunk },
        },
      },
    });
  }
}

function emitUntrustedMetadata(sessionId) {
  write({
    jsonrpc: "2.0",
    method: "session/update",
    params: {
      sessionId,
      update: {
        sessionUpdate: `evil_update_${args.secretSentinel}`,
        toolCallId: "tc_evil",
        title: `title_${args.secretSentinel}`,
        rawInput: { secret: args.secretSentinel },
      },
    },
  });
}

async function handleInitialize(id) {
  if (args.scenario === "exit-during") {
    process.exit(7);
  }
  if (args.scenario === "spontaneous-exit") {
    respond(id, {
      protocolVersion: 1,
      agentInfo: { name: "fake-devin-acp", version: "0.0.0-test" },
      agentCapabilities: { loadSession: true },
      authMethods: [],
    });
    initialized = true;
    setTimeout(() => process.exit(42), 50);
    return;
  }
  if (args.scenario === "malformed-json") {
    process.stdout.write(`{not-json ${args.secretSentinel}\n`);
    return;
  }
  if (args.scenario === "non-object-json") {
    process.stdout.write(`["array",${JSON.stringify(args.secretSentinel)}]\n`);
    return;
  }
  if (args.scenario === "result-and-error") {
    write({
      jsonrpc: "2.0",
      id,
      result: { ok: true },
      error: { code: -32000, message: args.secretSentinel },
    });
    return;
  }
  if (args.scenario === "response-with-method") {
    write({
      jsonrpc: "2.0",
      id,
      method: "initialize",
      result: { protocolVersion: 1, secret: args.secretSentinel },
    });
    return;
  }
  if (args.scenario === "invalid-id-type") {
    write({
      jsonrpc: "2.0",
      id: { bad: true },
      result: { protocolVersion: 1, secret: args.secretSentinel },
    });
    return;
  }
  if (args.scenario === "unsafe-integer-id") {
    write({
      jsonrpc: "2.0",
      id: Number.MAX_SAFE_INTEGER + 1,
      result: { protocolVersion: 1, secret: args.secretSentinel },
    });
    return;
  }
  if (args.scenario === "duplicate-response-id") {
    respond(id, {
      protocolVersion: 1,
      agentInfo: { name: "fake-devin-acp", version: "0.0.0-test" },
      agentCapabilities: { loadSession: true },
      authMethods: [],
    });
    // Duplicate response for same id
    respond(id, { protocolVersion: 1, secret: args.secretSentinel });
    return;
  }
  if (args.scenario === "unknown-response-id") {
    respond(id, {
      protocolVersion: 1,
      agentInfo: { name: "fake-devin-acp", version: "0.0.0-test" },
      agentCapabilities: { loadSession: true },
      authMethods: [],
    });
    respond(999999, { secret: args.secretSentinel });
    return;
  }
  if (args.scenario === "bad-envelope") {
    write({
      jsonrpc: "1.0",
      id,
      result: { secret: args.secretSentinel },
    });
    return;
  }
  if (args.scenario === "oversized-line") {
    const pad = "x".repeat(Math.max(1, args.lineBytes));
    process.stdout.write(
      `{"jsonrpc":"2.0","id":${JSON.stringify(id)},"result":{"pad":"${pad}","secret":"${args.secretSentinel}"}}\n`,
    );
    return;
  }
  if (args.scenario === "unterminated-oversize") {
    const pad = "y".repeat(Math.max(1, args.lineBytes));
    process.stdout.write(`{"jsonrpc":"2.0","id":${JSON.stringify(id)},"result":{"pad":"${pad}"`);
    return;
  }
  if (args.delayMs > 0 && args.scenario === "timeout") {
    await delay(args.delayMs);
  }
  const agentCapabilities = {};
  if (args.loadSession && args.scenario !== "no-load-session") {
    agentCapabilities.loadSession = true;
  } else if (args.scenario === "no-load-session") {
    agentCapabilities.loadSession = false;
  }

  const agentInfo =
    args.scenario === "untrusted-events"
      ? {
          name: `agent_${args.secretSentinel}`,
          version: `ver_${args.secretSentinel}`,
        }
      : { name: "fake-devin-acp", version: "0.0.0-test" };

  respond(id, {
    protocolVersion: 1,
    agentInfo,
    agentCapabilities,
    authMethods:
      args.scenario === "auth-required"
        ? [{ id: "stored-token", name: "Stored token" }]
        : [{ id: "devin-browser", name: "Browser" }],
  });
  initialized = true;
}

async function handleSessionNew(id, params) {
  if (args.scenario === "auth-required") {
    respondError(id, -32000, `Authentication required ${args.secretSentinel}`);
    return;
  }
  const sessionId = args.sessionId;
  if (args.scenario === "unsolicited-before-prompt") {
    write({
      jsonrpc: "2.0",
      id: "host-unsolicited-before",
      method: "terminal/create",
      params: { sessionId, command: "pwd", args: [] },
    });
    await waitForHostResponse("host-unsolicited-before");
  }
  if (args.scenario === "stdin-close") {
    respond(id, { sessionId, cwd: params?.cwd ?? null });
    closeSync(0);
    setInterval(() => {}, 1_000);
    return;
  }
  respond(id, { sessionId, cwd: params?.cwd ?? null });
}

async function handleSessionLoad(id, params) {
  if (args.scenario === "auth-required") {
    respondError(id, -32000, `Authentication required ${args.secretSentinel}`);
    return;
  }
  const sessionId = params?.sessionId ?? args.sessionId;
  respond(id, { sessionId, cwd: params?.cwd ?? null });
}

async function settlePrompt(id, sessionId, stopReason, chunks) {
  if (args.scenario === "untrusted-events") {
    emitUntrustedMetadata(sessionId);
    emitAgentChunks(sessionId, chunks, false);
    respond(id, { stopReason: "end_turn", sessionId });
    return;
  }
  if (args.scenario === "bad-stop-reason") {
    emitAgentChunks(sessionId, ["bad"], false);
    respond(id, { stopReason: args.secretSentinel, sessionId });
    return;
  }
  emitAgentChunks(sessionId, chunks, args.scenario !== "excess-output");
  if (args.scenario === "excess-output") {
    const count = args.maxOutputChars ?? 80;
    const big = "文".repeat(count);
    emitAgentChunks(sessionId, [big], false);
  }
  respond(id, { stopReason, sessionId });
}

async function waitForHostResponse(hostId, timeoutMs = 5_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (seenResponseIds.has(hostId)) {
      return true;
    }
    await delay(10);
  }
  return false;
}

async function handleSessionPrompt(id, params) {
  const sessionId = params?.sessionId ?? args.sessionId;
  promptCount += 1;
  cancelRequested = false;

  if (args.scenario === "auth-required") {
    respondError(id, -32000, `Authentication required ${args.secretSentinel}`);
    return;
  }

  if (args.scenario === "prompt-after-cancel-probe") {
    // First prompt cancels; second should never arrive if runtime enforces restart.
    if (promptCount === 1) {
      await settlePrompt(id, sessionId, "cancelled", ["partial"]);
      return;
    }
    await settlePrompt(id, sessionId, "end_turn", ["SHOULD_NOT_RUN"]);
    return;
  }

  if (args.scenario === "cross-session-cache") {
    const otherSession = "sess-other-poison";
    write({
      jsonrpc: "2.0",
      method: "session/update",
      params: {
        sessionId: otherSession,
        update: {
          sessionUpdate: "tool_call",
          toolCallId: "tc_shared",
          title: "Poison",
          rawInput: { command: `POISON_${args.secretSentinel}` },
        },
      },
    });
    write({
      jsonrpc: "2.0",
      method: "session/update",
      params: {
        sessionId,
        update: {
          sessionUpdate: "tool_call",
          toolCallId: "tc_shared",
          title: "Safe",
          rawInput: { command: "safe" },
        },
      },
    });
    write({
      jsonrpc: "2.0",
      id: "host-perm-cross",
      method: "session/request_permission",
      params: {
        sessionId,
        options: [
          { optionId: "allow-once", name: "Allow", kind: "allow_once" },
          { optionId: "reject-once", name: "Reject", kind: "reject_once" },
        ],
        toolCall: { toolCallId: "tc_shared", title: "Safe" },
      },
    });
    await waitForHostResponse("host-perm-cross");
  }

  if (args.scenario === "permission") {
    write({
      jsonrpc: "2.0",
      method: "session/update",
      params: {
        sessionId,
        update: {
          sessionUpdate: "tool_call",
          toolCallId: "tc_perm_1",
          title: "Run command",
          kind: "execute",
          rawInput: { command: "pwd", args: [] },
        },
      },
    });
    write({
      jsonrpc: "2.0",
      id: "host-perm-1",
      method: "session/request_permission",
      params: {
        sessionId,
        options: [
          { optionId: "allow-once", name: "Allow once", kind: "allow_once" },
          { optionId: "reject-once", name: "Reject once", kind: "reject_once" },
        ],
        toolCall: { toolCallId: "tc_perm_1", title: "Run command" },
      },
    });
    await waitForHostResponse("host-perm-1");
  }

  if (args.scenario === "malformed-permission") {
    write({
      jsonrpc: "2.0",
      id: "host-bad-perm",
      method: "session/request_permission",
      params: {
        sessionId,
        options: [{ optionId: "cancel-warning-but-actually-allow", kind: "allow_once" }],
        toolCall: { toolCallId: "tc1" },
      },
    });
    await waitForHostResponse("host-bad-perm");
  }

  if (args.scenario === "malformed-fs") {
    write({
      jsonrpc: "2.0",
      id: "host-bad-fs",
      method: "fs/read_text_file",
      params: { sessionId, path: "relative.md" },
    });
    await waitForHostResponse("host-bad-fs");
  }

  if (args.scenario === "malformed-terminal") {
    write({
      jsonrpc: "2.0",
      id: "host-bad-term",
      method: "terminal/create",
      params: { sessionId, command: "pwd", cwd: "relative" },
    });
    await waitForHostResponse("host-bad-term");
  }

  if (args.scenario === "malformed-terminal-env") {
    write({
      jsonrpc: "2.0",
      id: "host-bad-term-env",
      method: "terminal/create",
      params: {
        sessionId,
        command: "pwd",
        cwd: null,
        env: [{ name: "BAD=NAME", value: "v" }],
      },
    });
    await waitForHostResponse("host-bad-term-env");
  }

  if (args.scenario === "malformed-terminal-env-nul") {
    write({
      jsonrpc: "2.0",
      id: "host-bad-term-env-nul",
      method: "terminal/create",
      params: {
        sessionId,
        command: "pwd",
        cwd: null,
        env: [{ name: "VALID", value: "v\u0000" }],
      },
    });
    await waitForHostResponse("host-bad-term-env-nul");
  }

  if (args.scenario === "fs") {
    write({
      jsonrpc: "2.0",
      id: "host-fs-1",
      method: "fs/read_text_file",
      params: {
        sessionId,
        path: "/tmp/README.md",
        line: 0,
        limit: 0,
        secret: args.secretSentinel,
      },
    });
    await waitForHostResponse("host-fs-1");
  }

  if (args.scenario === "terminal") {
    const params = {
      sessionId,
      command: "pwd",
      args: [],
      outputByteLimit: 0,
      secret: args.secretSentinel,
    };
    if (args.cwd !== null) {
      params.cwd = args.cwd;
    }
    write({
      jsonrpc: "2.0",
      id: "host-term-1",
      method: "terminal/create",
      params,
    });
    await waitForHostResponse("host-term-1");
  }

  if (args.scenario === "host-hang") {
    const params = {
      sessionId,
      command: "sleep",
      args: ["999"],
    };
    if (args.cwd !== null) {
      params.cwd = args.cwd;
    }
    write({
      jsonrpc: "2.0",
      id: "host-hang-1",
      method: "terminal/create",
      params,
    });
    await waitForHostResponse("host-hang-1", 10_000);
  }

  if (args.scenario === "duplicate-host") {
    for (let i = 0; i < 5; i += 1) {
      write({
        jsonrpc: "2.0",
        id: "host-dup-1",
        method: "fs/read_text_file",
        params: { sessionId, path: "/tmp/duplicate.md" },
      });
    }
    // Do not settle the prompt. The duplicated host ID is a fatal protocol
    // violation; the runtime must reject the prompt and terminate the peer.
    return;
  }

  if (args.scenario === "other-session") {
    write({
      jsonrpc: "2.0",
      id: "host-other-session",
      method: "terminal/create",
      params: {
        sessionId: args.secondSessionId,
        command: "pwd",
        args: [],
        cwd: null,
      },
    });
    await waitForHostResponse("host-other-session");
  }

  if (args.scenario === "unsolicited-between-prompts") {
    if (promptCount === 1) {
      await settlePrompt(id, sessionId, "end_turn", ["first"]);
      await delay(50);
      write({
        jsonrpc: "2.0",
        id: "host-between",
        method: "fs/read_text_file",
        params: { sessionId, path: "/tmp/between.md" },
      });
      await waitForHostResponse("host-between");
      return;
    }
    if (promptCount === 2) {
      await settlePrompt(id, sessionId, "end_turn", ["second"]);
      return;
    }
  }

  if (args.scenario === "stale-cache") {
    if (promptCount === 1) {
      // First prompt: cache a tool_call, request permission, then finish.
      write({
        jsonrpc: "2.0",
        method: "session/update",
        params: {
          sessionId,
          update: {
            sessionUpdate: "tool_call",
            toolCallId: "tc_shared",
            rawInput: { command: "first" },
          },
        },
      });
      write({
        jsonrpc: "2.0",
        id: "host-perm-stale-1",
        method: "session/request_permission",
        params: {
          sessionId,
          options: [{ optionId: "reject-once", name: "Reject", kind: "reject_once" }],
          toolCall: { toolCallId: "tc_shared" },
        },
      });
      await waitForHostResponse("host-perm-stale-1");
      await settlePrompt(id, sessionId, "end_turn", ["first"]);
      await delay(50);
      // Late stale update after the prompt has finished.
      write({
        jsonrpc: "2.0",
        method: "session/update",
        params: {
          sessionId,
          update: {
            sessionUpdate: "tool_call_update",
            toolCallId: "tc_shared",
            rawInput: { command: `STALE_${args.secretSentinel}` },
          },
        },
      });
      return;
    }
    if (promptCount === 2) {
      write({
        jsonrpc: "2.0",
        method: "session/update",
        params: {
          sessionId,
          update: {
            sessionUpdate: "tool_call",
            toolCallId: "tc_shared",
            rawInput: { command: "second" },
          },
        },
      });
      write({
        jsonrpc: "2.0",
        id: "host-perm-stale-2",
        method: "session/request_permission",
        params: {
          sessionId,
          options: [{ optionId: "reject-once", name: "Reject", kind: "reject_once" }],
          toolCall: { toolCallId: "tc_shared" },
        },
      });
      await waitForHostResponse("host-perm-stale-2");
      await settlePrompt(id, sessionId, "end_turn", ["second"]);
      return;
    }
  }

  if (args.scenario === "host-secret-throw") {
    write({
      jsonrpc: "2.0",
      id: "host-secret-1",
      method: "fs/read_text_file",
      params: {
        sessionId,
        path: "/tmp/x",
      },
    });
    await waitForHostResponse("host-secret-1");
  }

  if (args.scenario === "controlled-map") {
    for (let i = 1; i <= 6; i += 1) {
      write({
        jsonrpc: "2.0",
        id: `host-map-${i}`,
        method: "fs/read_text_file",
        params: { sessionId, path: `/tmp/map-${i}` },
      });
      await waitForHostResponse(`host-map-${i}`);
    }
  }

  if (args.scenario === "host-concurrency") {
    for (let i = 0; i < 20; i += 1) {
      write({
        jsonrpc: "2.0",
        id: `host-conc-${i}`,
        method: "terminal/output",
        params: { sessionId, terminalId: `t${i}` },
      });
    }
    await delay(100);
  }

  if (args.scenario === "unknown-method") {
    write({
      jsonrpc: "2.0",
      id: "host-unknown-1",
      method: "totally/unknown",
      params: { secret: args.secretSentinel },
    });
    await waitForHostResponse("host-unknown-1");
  }

  if (args.scenario === "cancel") {
    const deadline = Date.now() + 5_000;
    while (!cancelRequested && Date.now() < deadline) {
      await delay(20);
    }
    await settlePrompt(id, sessionId, "cancelled", ["partial"]);
    return;
  }

  if (args.delayMs > 0 && args.scenario === "timeout") {
    await delay(args.delayMs);
  }

  const chunks =
    args.scenario === "chunks" || args.scenario === "happy" || args.scenario === "continue"
      ? args.outputChunks
      : args.scenario === "load"
        ? ["loaded"]
        : args.outputChunks;

  if (args.scenario === "continue" && promptCount === 2) {
    await settlePrompt(id, sessionId, "end_turn", ["turn2:"]);
    return;
  }

  if (args.scenario === "exact-bytes") {
    await settlePrompt(id, sessionId, "end_turn", args.outputChunks);
    return;
  }

  await settlePrompt(id, sessionId, "end_turn", chunks);
}

async function handleRequest(msg) {
  const { id, method, params } = msg;
  switch (method) {
    case "initialize":
      await handleInitialize(id);
      return;
    case "session/new":
      await handleSessionNew(id, params);
      return;
    case "session/load":
      await handleSessionLoad(id, params);
      return;
    case "session/prompt":
      await handleSessionPrompt(id, params);
      return;
    default:
      respondError(id, -32601, `Method not found: ${method}`);
  }
}

function handleNotification(msg) {
  if (msg.method === "session/cancel") {
    cancelRequested = true;
  }
}

function handleHostResponse(msg) {
  if (Object.prototype.hasOwnProperty.call(msg, "id")) {
    seenResponseIds.add(msg.id);
  }
  recordHostResponse(msg);
}

async function onLine(line) {
  if (!line.trim()) return;

  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return;
  }

  const hasId = Object.prototype.hasOwnProperty.call(msg, "id");
  const hasMethod = typeof msg.method === "string";
  const hasResult = Object.prototype.hasOwnProperty.call(msg, "result");
  const hasError = Object.prototype.hasOwnProperty.call(msg, "error");

  if (hasMethod && hasId && !hasResult && !hasError) {
    await handleRequest(msg);
    return;
  }

  if (hasMethod && !hasId) {
    handleNotification(msg);
    return;
  }

  if (hasId && (hasResult || hasError)) {
    handleHostResponse(msg);
  }
}

process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let idx;
  while ((idx = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, idx);
    buffer = buffer.slice(idx + 1);
    void onLine(line);
  }
});

process.stdin.on("end", () => {
  if (initialized && args.scenario === "ignore-sigterm") {
    // stay alive until SIGKILL
    return;
  }
  process.exit(0);
});
