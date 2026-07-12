#!/usr/bin/env node
/**
 * Deterministic fake Devin ACP server for Phase 3A tests.
 * Newline-delimited JSON-RPC over stdio. No network. No Devin. No production imports.
 *
 * Argv flags (not env secrets):
 *   --scenario=<name>
 *   --audit-path=<path>
 *   --pid-path=<path>
 *   --delay-ms=<n>
 *   --output-chunks=a,b,c
 *   --session-id=<id>
 *   --line-bytes=<n>
 *   --max-output-chars=<n>
 *   --secret-sentinel=<text>  (embedded in malformed frames for redaction tests)
 */

import { writeFileSync } from "node:fs";
import process from "node:process";

function parseArgs(argv) {
  const out = {
    scenario: "happy",
    auditPath: null,
    pidPath: null,
    delayMs: 0,
    outputChunks: ["Hello ", "world"],
    sessionId: "sess_fake_001",
    lineBytes: 2_000_000,
    maxOutputChars: null,
    secretSentinel: "FAKE_SECRET_SENTINEL_XYZ",
  };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith("--scenario=")) out.scenario = arg.slice("--scenario=".length);
    else if (arg.startsWith("--audit-path=")) out.auditPath = arg.slice("--audit-path=".length);
    else if (arg.startsWith("--pid-path=")) out.pidPath = arg.slice("--pid-path=".length);
    else if (arg.startsWith("--delay-ms=")) out.delayMs = Number(arg.slice("--delay-ms=".length));
    else if (arg.startsWith("--output-chunks=")) {
      out.outputChunks = arg.slice("--output-chunks=".length).split(",");
    } else if (arg.startsWith("--session-id=")) out.sessionId = arg.slice("--session-id=".length);
    else if (arg.startsWith("--line-bytes="))
      out.lineBytes = Number(arg.slice("--line-bytes=".length));
    else if (arg.startsWith("--max-output-chars=")) {
      out.maxOutputChars = Number(arg.slice("--max-output-chars=".length));
    } else if (arg.startsWith("--secret-sentinel=")) {
      out.secretSentinel = arg.slice("--secret-sentinel=".length);
    }
  }
  return out;
}

const args = parseArgs(process.argv);

if (args.pidPath) {
  writeFileSync(args.pidPath, String(process.pid), "utf8");
}
if (args.auditPath) {
  writeFileSync(args.auditPath, JSON.stringify(Object.keys(process.env).sort()) + "\n", "utf8");
}

if (args.scenario === "stderr-diag") {
  process.stderr.write(`diag:${args.secretSentinel}\n`);
}

let buffer = "";
let promptCount = 0;
let cancelRequested = false;

function write(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

function respond(id, result) {
  write({ jsonrpc: "2.0", id, result });
}

function respondError(id, code, message) {
  write({ jsonrpc: "2.0", id, error: { code, message } });
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

async function handleInitialize(id) {
  if (args.scenario === "exit-during") {
    process.exit(7);
  }
  if (args.scenario === "malformed-json") {
    process.stdout.write(`{not-json ${args.secretSentinel}\n`);
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
  respond(id, {
    protocolVersion: 1,
    agentInfo: { name: "fake-devin-acp", version: "0.0.0-test" },
    agentCapabilities: {
      loadSession: true,
    },
    authMethods: [{ id: "devin-browser", name: "Browser" }],
  });
}

async function handleSessionNew(id, params) {
  const sessionId = args.sessionId;
  respond(id, { sessionId, cwd: params?.cwd ?? null });
}

async function handleSessionLoad(id, params) {
  const sessionId = params?.sessionId ?? args.sessionId;
  respond(id, { sessionId, cwd: params?.cwd ?? null });
}

async function settlePrompt(id, sessionId, stopReason, chunks) {
  emitAgentChunks(sessionId, chunks, args.scenario !== "excess-output");
  if (args.scenario === "excess-output") {
    // Keep the JSON line small enough for protocol framing; still exceed typical
    // host output caps via multibyte characters (文 = 3 UTF-8 bytes).
    const count = args.maxOutputChars ?? 80;
    const big = "文".repeat(count);
    emitAgentChunks(sessionId, [big], false);
  }
  respond(id, { stopReason, sessionId });
}

async function handleSessionPrompt(id, params) {
  const sessionId = params?.sessionId ?? args.sessionId;
  promptCount += 1;
  cancelRequested = false;

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
          { optionId: "allow-once", kind: "allow_once" },
          { optionId: "reject-once", kind: "reject_once" },
        ],
        toolCall: { toolCallId: "tc_perm_1", title: "Run command" },
      },
    });
    await delay(20);
  }

  if (args.scenario === "fs") {
    write({
      jsonrpc: "2.0",
      id: "host-fs-1",
      method: "fs/read_text_file",
      params: { path: "README.md", secret: args.secretSentinel },
    });
    await delay(20);
  }

  if (args.scenario === "terminal") {
    write({
      jsonrpc: "2.0",
      id: "host-term-1",
      method: "terminal/create",
      params: { command: "pwd", args: [], cwd: ".", secret: args.secretSentinel },
    });
    await delay(20);
  }

  if (args.scenario === "unknown-method") {
    write({
      jsonrpc: "2.0",
      id: "host-unknown-1",
      method: "totally/unknown",
      params: { secret: args.secretSentinel },
    });
    await delay(20);
  }

  if (args.scenario === "cancel") {
    // Wait until cancel notification arrives, then settle cancelled.
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

function handleHostResponse(_msg) {
  // Host responses to our server→client requests; ignore content.
}

async function onLine(line) {
  if (!line.trim()) return;

  if (args.scenario === "malformed-json" && line.includes("initialize")) {
    // Respond after initialize is attempted with a bad frame on next tick via special path.
  }

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
  process.exit(0);
});
