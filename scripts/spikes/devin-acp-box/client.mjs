#!/usr/bin/env node
/**
 * Loop Phase 0B — self-contained Devin ACP spike client (Node built-ins only).
 *
 * Topology (must run inside ASCII Box):
 *   node client.mjs  ↔  stdio JSON-RPC  ↔  local `devin acp`
 *
 * Usage:
 *   node client.mjs --outdir <dir> --cwd <canary-abs-dir> [--devin-bin devin]
 *
 * Writes: capabilities.json, transcript.jsonl, stderr.log, summary.json
 */

import { spawn } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import {
  createWriteStream,
  mkdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
  existsSync,
  openSync,
  closeSync,
  fstatSync,
} from "node:fs";
import { open as fsOpen } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import readline from "node:readline";
import { setTimeout as delay } from "node:timers/promises";

const CLIENT_VERSION = "0.1.0-phase0b";
const PROTOCOL_VERSION = 1;
const REQUEST_TIMEOUT_MS = 180_000;
const PROCESS_TIMEOUT_MS = 420_000;
const KILL_GRACE_MS = 3_000;
const CANCEL_WAIT_MS = 60_000;

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
];

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

const CANCEL_CMD = "sh";
const CANCEL_ARGS = ["-lc", "sleep 30; printf SHOULD_NOT_COMPLETE"];

function usage() {
  console.error("Usage: node client.mjs --outdir <dir> --cwd <canary-abs-dir> [--devin-bin devin]");
  process.exit(2);
}

function parseArgs(argv) {
  const out = { outdir: null, cwd: null, devinBin: "devin" };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--outdir") out.outdir = argv[++i];
    else if (a === "--cwd") out.cwd = argv[++i];
    else if (a === "--devin-bin") out.devinBin = argv[++i];
    else usage();
  }
  if (!out.outdir || !out.cwd) usage();
  return out;
}

function sha256Text(s) {
  return createHash("sha256").update(String(s)).digest("hex");
}

function sha256File(p) {
  return createHash("sha256").update(readFileSync(p)).digest("hex");
}

function nowIso() {
  return new Date().toISOString();
}

function monotonicMs() {
  return Number(process.hrtime.bigint() / 1_000_000n);
}

function buildChildEnv(parentEnv) {
  const env = {};
  for (const key of Object.keys(parentEnv)) {
    if (FORBIDDEN_ENV_EXACT.has(key)) continue;
    if (FORBIDDEN_ENV_PREFIXES.some((p) => key.startsWith(p))) continue;
    if (!ALLOWED_ENV_KEYS.has(key) && !key.startsWith("XDG_")) continue;
    env[key] = parentEnv[key];
  }
  // Ensure PATH/HOME exist
  if (!env.PATH && parentEnv.PATH) env.PATH = parentEnv.PATH;
  if (!env.HOME && parentEnv.HOME) env.HOME = parentEnv.HOME;
  return env;
}

function assertEnvSafe(env) {
  const violations = [];
  for (const key of Object.keys(env)) {
    if (FORBIDDEN_ENV_EXACT.has(key)) violations.push(key);
    if (FORBIDDEN_ENV_PREFIXES.some((p) => key.startsWith(p))) violations.push(key);
  }
  if (violations.length) {
    throw new Error(`Forbidden env keys reached child: ${violations.join(",")}`);
  }
}

function resolveJailRoot(cwd) {
  return realpathSync(path.resolve(cwd));
}

function assertInsideJail(jailRoot, candidate) {
  const abs = path.resolve(candidate);
  let real;
  try {
    real = realpathSync(existsSync(abs) ? abs : path.dirname(abs));
    if (!existsSync(abs)) real = path.join(real, path.basename(abs));
  } catch {
    real = abs;
  }
  const root = jailRoot.endsWith(path.sep) ? jailRoot : jailRoot + path.sep;
  if (real !== jailRoot && !real.startsWith(root)) {
    throw new Error(`path escapes canary jail: ${candidate}`);
  }
  return abs;
}

function normalizeCmd(command, args) {
  const c = String(command || "");
  const a = Array.isArray(args) ? args.map(String) : [];
  return { command: c, args: a, joined: [c, ...a].join("\0") };
}

function isAllowlistedTerminal(command, args, mode) {
  const n = normalizeCmd(command, args);
  // Exact cancel canary
  if (
    n.command === CANCEL_CMD &&
    n.args.length === 2 &&
    n.args[0] === "-lc" &&
    n.args[1] === CANCEL_ARGS[1]
  ) {
    return mode === "cancel" || mode === "any";
  }
  // Basic inspection allowlist
  const basic = [
    { command: "pwd", args: [] },
    { command: "cat", args: ["transport-input.txt"] },
    { command: "sha256sum", args: ["transport-input.txt"] },
    { command: "sh", args: ["-lc", "pwd"] },
    { command: "sh", args: ["-lc", "cat transport-input.txt"] },
    {
      command: "sh",
      args: ["-lc", "sha256sum transport-input.txt"],
    },
    { command: "bash", args: ["-lc", "pwd"] },
    { command: "bash", args: ["-lc", "cat transport-input.txt"] },
    {
      command: "bash",
      args: ["-lc", "sha256sum transport-input.txt"],
    },
  ];
  if (mode === "basic" || mode === "any") {
    return basic.some(
      (b) =>
        b.command === n.command &&
        b.args.length === n.args.length &&
        b.args.every((x, i) => x === n.args[i]),
    );
  }
  return false;
}

class TerminalHandle {
  constructor({ id, child, cwd }) {
    this.id = id;
    this.child = child;
    this.cwd = cwd;
    this.output = "";
    this.truncated = false;
    this.exitCode = null;
    this.signal = null;
    this.exited = false;
    this.waiters = [];
    this.byteLimit = 256 * 1024;
    child.stdout?.on("data", (buf) => this.#append(buf.toString("utf8")));
    child.stderr?.on("data", (buf) => this.#append(buf.toString("utf8")));
    child.on("exit", (code, signal) => {
      this.exited = true;
      this.exitCode = code;
      this.signal = signal;
      for (const w of this.waiters.splice(0)) w({ exitCode: code, signal });
    });
  }

  #append(chunk) {
    this.output += chunk;
    if (Buffer.byteLength(this.output, "utf8") > this.byteLimit) {
      // truncate from start at char boundary
      while (Buffer.byteLength(this.output, "utf8") > this.byteLimit) {
        this.output = this.output.slice(1);
      }
      this.truncated = true;
    }
  }

  waitForExit() {
    if (this.exited) {
      return Promise.resolve({
        exitCode: this.exitCode,
        signal: this.signal,
      });
    }
    return new Promise((resolve) => this.waiters.push(resolve));
  }

  kill(sig = "SIGTERM") {
    if (!this.exited && this.child.pid) {
      try {
        process.kill(-this.child.pid, sig);
      } catch {
        try {
          this.child.kill(sig);
        } catch {
          /* ignore */
        }
      }
    }
  }
}

class AcpClient {
  constructor({ outdir, cwd, devinBin, childEnv }) {
    this.outdir = outdir;
    this.cwd = resolveJailRoot(cwd);
    this.devinBin = devinBin;
    this.childEnv = childEnv;
    this.child = null;
    this.nextId = 1;
    this.pending = new Map();
    this.transcriptPath = path.join(outdir, "transcript.jsonl");
    this.stderrPath = path.join(outdir, "stderr.log");
    this.stderrStream = createWriteStream(this.stderrPath, { flags: "w" });
    this.buffer = "";
    this.stdoutJsonOnly = true;
    this.nonJsonStdout = [];
    this.updates = [];
    this.clientRequests = [];
    this.terminals = new Map();
    this.terminalMode = "any"; // basic | cancel | any
    this.activeToolEvidence = [];
    this.protocolErrors = [];
    this.assertions = [];
    this.startedAt = nowIso();
    this.startMono = monotonicMs();
    this.initializeResult = null;
    this.authInfo = { mechanism: "unknown", methods: [], authenticated: false };
    this.sessions = [];
    this.cancelledPrompt = null;
  }

  recordAssertion(id, ok, detail) {
    this.assertions.push({ id, ok: !!ok, detail: detail || "" });
  }

  writeTranscript(obj) {
    writeFileSync(this.transcriptPath, JSON.stringify(obj) + "\n", {
      flag: "a",
    });
  }

  async start() {
    assertEnvSafe(this.childEnv);
    this.child = spawn(this.devinBin, ["acp"], {
      cwd: this.cwd,
      env: this.childEnv,
      stdio: ["pipe", "pipe", "pipe"],
      detached: true,
    });
    this.child.stderr.on("data", (buf) => {
      this.stderrStream.write(buf);
    });
    this.child.stdout.setEncoding("utf8");
    this.child.stdout.on("data", (chunk) => this.#onStdout(chunk));
    this.child.on("error", (err) => {
      this.protocolErrors.push({ type: "spawn", message: String(err) });
    });
    this.processTimer = setTimeout(() => {
      this.protocolErrors.push({
        type: "process_timeout",
        message: `exceeded ${PROCESS_TIMEOUT_MS}ms`,
      });
      void this.shutdown(true);
    }, PROCESS_TIMEOUT_MS);
  }

  #onStdout(chunk) {
    this.buffer += chunk;
    let idx;
    while ((idx = this.buffer.indexOf("\n")) >= 0) {
      const line = this.buffer.slice(0, idx);
      this.buffer = this.buffer.slice(idx + 1);
      if (!line.trim()) continue;
      let msg;
      try {
        msg = JSON.parse(line);
      } catch (e) {
        this.stdoutJsonOnly = false;
        this.nonJsonStdout.push(line.slice(0, 200));
        this.protocolErrors.push({
          type: "non_json_stdout",
          message: String(e),
          sample: line.slice(0, 120),
        });
        continue;
      }
      this.#dispatch(msg);
    }
  }

  #dispatch(msg) {
    this.writeTranscript({ dir: "in", t: nowIso(), msg: this.#sanitizeMsg(msg) });
    if (
      Object.prototype.hasOwnProperty.call(msg, "id") &&
      (msg.result !== undefined || msg.error !== undefined)
    ) {
      const pending = this.pending.get(msg.id);
      if (pending) {
        this.pending.delete(msg.id);
        clearTimeout(pending.timer);
        if (msg.error)
          pending.reject(
            Object.assign(new Error(msg.error.message || "rpc error"), { rpc: msg.error }),
          );
        else pending.resolve(msg.result);
      }
      return;
    }
    if (msg.method && Object.prototype.hasOwnProperty.call(msg, "id")) {
      void this.#handleClientRequest(msg);
      return;
    }
    if (msg.method && !Object.prototype.hasOwnProperty.call(msg, "id")) {
      if (msg.method === "session/update") {
        const update = msg.params?.update || {};
        this.updates.push({
          t: nowIso(),
          sessionIdDigest: msg.params?.sessionId
            ? sha256Text(msg.params.sessionId).slice(0, 16)
            : null,
          sessionUpdate: update.sessionUpdate || update.type || null,
          toolCallId: update.toolCallId || null,
          status: update.status || null,
          kind: update.kind || null,
          title: update.title || null,
        });
        if (
          update.sessionUpdate === "tool_call" ||
          update.sessionUpdate === "tool_call_update" ||
          update.status === "in_progress"
        ) {
          this.activeToolEvidence.push({
            t: nowIso(),
            monoMs: monotonicMs(),
            sessionUpdate: update.sessionUpdate,
            status: update.status,
            toolCallId: update.toolCallId,
            kind: update.kind,
            title: update.title,
          });
        }
      }
      return;
    }
  }

  #sanitizeMsg(msg) {
    // Deep-ish sanitize: redact long session IDs and env-looking strings
    const s = JSON.stringify(msg);
    const redacted = s
      .replace(/("sessionId"\s*:\s*")[^"]{8,}(")/g, "$1***REDACTED***$2")
      .replace(/("terminalId"\s*:\s*")[^"]+(")/g, "$1***$2");
    try {
      return JSON.parse(redacted);
    } catch {
      return { sanitized: true };
    }
  }

  request(method, params, timeoutMs = REQUEST_TIMEOUT_MS) {
    const id = this.nextId++;
    const msg = { jsonrpc: "2.0", id, method, params };
    this.writeTranscript({ dir: "out", t: nowIso(), msg: this.#sanitizeMsg(msg) });
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`timeout waiting for ${method} id=${id}`));
      }, timeoutMs);
      this.pending.set(id, { resolve, reject, timer, method });
      this.child.stdin.write(JSON.stringify(msg) + "\n");
    });
  }

  notify(method, params) {
    const msg = { jsonrpc: "2.0", method, params };
    this.writeTranscript({ dir: "out", t: nowIso(), msg: this.#sanitizeMsg(msg) });
    this.child.stdin.write(JSON.stringify(msg) + "\n");
  }

  async #handleClientRequest(msg) {
    const { id, method, params } = msg;
    this.clientRequests.push({
      t: nowIso(),
      method,
      monoMs: monotonicMs(),
    });
    try {
      let result;
      switch (method) {
        case "session/request_permission":
          result = this.#handlePermission(params);
          break;
        case "fs/read_text_file":
          result = await this.#handleReadFile(params);
          break;
        case "fs/write_text_file":
          throw Object.assign(new Error("write not advertised"), {
            code: -32601,
          });
        case "terminal/create":
          result = this.#handleTerminalCreate(params);
          break;
        case "terminal/output":
          result = this.#handleTerminalOutput(params);
          break;
        case "terminal/wait_for_exit":
          result = await this.#handleTerminalWait(params);
          break;
        case "terminal/kill":
          result = this.#handleTerminalKill(params);
          break;
        case "terminal/release":
          result = this.#handleTerminalRelease(params);
          break;
        default:
          throw Object.assign(new Error(`Method not found: ${method}`), {
            code: -32601,
          });
      }
      const resp = { jsonrpc: "2.0", id, result };
      this.writeTranscript({ dir: "out", t: nowIso(), msg: this.#sanitizeMsg(resp) });
      this.child.stdin.write(JSON.stringify(resp) + "\n");
    } catch (err) {
      const resp = {
        jsonrpc: "2.0",
        id,
        error: {
          code: err.code || -32000,
          message: String(err.message || err),
        },
      };
      this.writeTranscript({ dir: "out", t: nowIso(), msg: resp });
      this.child.stdin.write(JSON.stringify(resp) + "\n");
    }
  }

  #handlePermission(params) {
    const options = params?.options || [];
    const allow =
      options.find((o) => o.kind === "allow_once" || o.optionId === "allow-once") ||
      options.find((o) => String(o.kind || "").startsWith("allow"));
    if (!allow) {
      const reject = options.find((o) => String(o.kind || "").startsWith("reject")) || options[0];
      return {
        outcome: reject
          ? { outcome: "selected", optionId: reject.optionId }
          : { outcome: "cancelled" },
      };
    }
    return { outcome: { outcome: "selected", optionId: allow.optionId } };
  }

  async #handleReadFile(params) {
    const p = assertInsideJail(this.cwd, params.path);
    const text = readFileSync(p, "utf8");
    const limit = params.limit;
    const lines = text.split(/\r?\n/);
    const slice = typeof limit === "number" ? lines.slice(0, limit).join("\n") : text;
    return { content: slice };
  }

  #handleTerminalCreate(params) {
    const cwd = params.cwd ? assertInsideJail(this.cwd, params.cwd) : this.cwd;
    const command = params.command;
    const args = params.args || [];
    if (!isAllowlistedTerminal(command, args, this.terminalMode)) {
      throw new Error(`terminal command denied by allowlist: ${command} ${(args || []).join(" ")}`);
    }
    const id = `term_${randomUUID().slice(0, 8)}`;
    const child = spawn(command, args, {
      cwd,
      env: this.childEnv,
      stdio: ["ignore", "pipe", "pipe"],
      detached: true,
      shell: false,
    });
    const handle = new TerminalHandle({ id, child, cwd });
    if (params.outputByteLimit) handle.byteLimit = params.outputByteLimit;
    this.terminals.set(id, handle);
    this.activeToolEvidence.push({
      t: nowIso(),
      monoMs: monotonicMs(),
      kind: "terminal_create",
      terminalId: id,
      command,
      args,
    });
    return { terminalId: id };
  }

  #handleTerminalOutput(params) {
    const t = this.terminals.get(params.terminalId);
    if (!t) throw new Error("unknown terminal");
    const result = {
      output: t.output,
      truncated: t.truncated,
    };
    if (t.exited) {
      result.exitStatus = { exitCode: t.exitCode, signal: t.signal };
    }
    return result;
  }

  async #handleTerminalWait(params) {
    const t = this.terminals.get(params.terminalId);
    if (!t) throw new Error("unknown terminal");
    const st = await t.waitForExit();
    return { exitCode: st.exitCode, signal: st.signal };
  }

  #handleTerminalKill(params) {
    const t = this.terminals.get(params.terminalId);
    if (!t) throw new Error("unknown terminal");
    t.kill("SIGTERM");
    setTimeout(() => t.kill("SIGKILL"), 1000).unref?.();
    return {};
  }

  #handleTerminalRelease(params) {
    const t = this.terminals.get(params.terminalId);
    if (t) {
      if (!t.exited) t.kill("SIGTERM");
      this.terminals.delete(params.terminalId);
    }
    return {};
  }

  async initialize() {
    const result = await this.request("initialize", {
      protocolVersion: PROTOCOL_VERSION,
      clientCapabilities: {
        fs: { readTextFile: true, writeTextFile: false },
        terminal: true,
      },
      clientInfo: {
        name: "loop-phase0b-spike",
        title: "Loop Phase 0B ACP Spike",
        version: CLIENT_VERSION,
      },
    });
    this.initializeResult = result;
    writeFileSync(
      path.join(this.outdir, "capabilities.json"),
      JSON.stringify(result, null, 2) + "\n",
    );
    return result;
  }

  async authenticateIfNeeded() {
    const methods = this.initializeResult?.authMethods || [];
    this.authInfo.methods = methods.map((m) => m.id || m.name || m.method || JSON.stringify(m));
    // Headless Box spike: do NOT start browser PKCE (`devin-browser`).
    // Devin ACP stderr documents fallback to stored CLI credentials when
    // ACP_BACKEND is unset. Calling authenticate(devin-browser) hangs without
    // a browser and blocks subsequent session/new.
    const browserOnly =
      methods.length > 0 &&
      methods.every((m) => {
        const id = String(m.id || m.method || m.name || "");
        return id.includes("browser") || id.includes("pkce");
      });
    if (!methods.length || browserOnly) {
      this.authInfo.mechanism = "stored_cli_credentials";
      this.authInfo.authenticated = true;
      this.authInfo.note =
        methods.length === 0
          ? "no authMethods advertised"
          : "skipped ACP authenticate for browser-only methods; relying on Box-local stored CLI credentials";
      return { skipped: true, reason: this.authInfo.note };
    }
    const methodId = methods[0].id || methods[0].method || methods[0].name || null;
    if (!methodId) {
      this.authInfo.mechanism = "auth_methods_present_but_unusable";
      this.authInfo.authenticated = false;
      return { skipped: false, error: "no method id" };
    }
    try {
      const result = await this.request("authenticate", { methodId }, 30_000);
      this.authInfo.mechanism = "acp_authenticate";
      this.authInfo.authenticated = true;
      return { skipped: false, result };
    } catch (err) {
      this.authInfo.mechanism = "acp_authenticate_failed_try_stored";
      this.authInfo.authenticated = false;
      this.authInfo.error = String(err.message || err);
      return { skipped: false, error: String(err.message || err) };
    }
  }

  async newSession() {
    const result = await this.request("session/new", {
      cwd: this.cwd,
      mcpServers: [],
    });
    const sessionId = result.sessionId;
    const digest = sha256Text(sessionId);
    this.sessions.push({
      digest,
      redacted: sessionId.slice(0, 6) + "…" + sessionId.slice(-4),
    });
    return { sessionId, digest, redacted: this.sessions.at(-1).redacted };
  }

  async prompt(sessionId, text, timeoutMs = REQUEST_TIMEOUT_MS) {
    return this.request(
      "session/prompt",
      {
        sessionId,
        prompt: [{ type: "text", text }],
      },
      timeoutMs,
    );
  }

  cancelSession(sessionId) {
    this.notify("session/cancel", { sessionId });
  }

  collectAgentText() {
    // Best-effort: scan transcript for agent_message_chunk text
    const lines = readFileSync(this.transcriptPath, "utf8").split("\n").filter(Boolean);
    let text = "";
    for (const line of lines) {
      try {
        const row = JSON.parse(line);
        const upd = row.msg?.params?.update;
        if (!upd) continue;
        if (upd.sessionUpdate === "agent_message_chunk" || upd.sessionUpdate === "agent_message") {
          const c = upd.content;
          if (typeof c === "string") text += c;
          else if (c?.text) text += c.text;
          else if (Array.isArray(c)) {
            for (const part of c) {
              if (typeof part === "string") text += part;
              else if (part?.text) text += part.text;
            }
          }
        }
      } catch {
        /* ignore */
      }
    }
    return text;
  }

  async shutdown(force = false) {
    if (this.processTimer) clearTimeout(this.processTimer);
    for (const t of this.terminals.values()) {
      t.kill("SIGTERM");
    }
    if (!this.child || this.child.killed) {
      this.stderrStream.end();
      return { exitCode: this.child?.exitCode ?? null };
    }
    try {
      this.child.stdin.end();
    } catch {
      /* ignore */
    }
    if (!force) {
      try {
        this.child.kill("SIGTERM");
      } catch {
        /* ignore */
      }
      const deadline = monotonicMs() + KILL_GRACE_MS;
      while (monotonicMs() < deadline && this.child.exitCode === null && !this.child.killed) {
        await delay(50);
      }
    }
    if (this.child.exitCode === null) {
      try {
        process.kill(-this.child.pid, "SIGKILL");
      } catch {
        try {
          this.child.kill("SIGKILL");
        } catch {
          /* ignore */
        }
      }
    }
    await delay(100);
    this.stderrStream.end();
    return { exitCode: this.child.exitCode, signal: this.child.signalCode };
  }

  remainingTerminals() {
    return [...this.terminals.values()].filter((t) => !t.exited).length;
  }
}

async function runDevinVersion(bin, env) {
  return await new Promise((resolve) => {
    const child = spawn(bin, ["version"], { env, stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    child.stdout.on("data", (b) => (out += b.toString("utf8")));
    child.stderr.on("data", (b) => (out += b.toString("utf8")));
    child.on("close", () => resolve(out.trim().split("\n")[0] || "unknown"));
  });
}

async function main() {
  const args = parseArgs(process.argv);
  mkdirSync(args.outdir, { recursive: true });
  // truncate transcript
  writeFileSync(path.join(args.outdir, "transcript.jsonl"), "");

  const childEnv = buildChildEnv(process.env);
  assertEnvSafe(childEnv);
  const envKeys = Object.keys(childEnv).sort();

  const client = new AcpClient({
    outdir: args.outdir,
    cwd: args.cwd,
    devinBin: args.devinBin,
    childEnv,
  });

  const summary = {
    clientVersion: CLIENT_VERSION,
    nodeVersion: process.version,
    devinVersion: null,
    protocolVersionRequested: PROTOCOL_VERSION,
    protocolVersionSelected: null,
    agentInfo: null,
    agentCapabilities: null,
    authMethodNames: [],
    authMechanism: null,
    sessionIdDigests: [],
    updateTypesObserved: [],
    clientDirectedRequestMethods: [],
    promptResults: {},
    cancellation: null,
    childExit: null,
    protocolErrors: [],
    assertionResults: [],
    artifactDigests: {},
    envKeyNames: envKeys,
    forbiddenEnvAudit: { passed: true, violations: [] },
    startedAt: client.startedAt,
    endedAt: null,
    durationsMs: {},
  };

  const t0 = monotonicMs();
  try {
    summary.devinVersion = await runDevinVersion(args.devinBin, childEnv);
    await client.start();
    client.recordAssertion("P0B-04", true, "devin acp spawned");

    const tInit = monotonicMs();
    const init = await client.initialize();
    summary.durationsMs.initialize = monotonicMs() - tInit;
    summary.protocolVersionSelected = init.protocolVersion;
    summary.agentInfo = init.agentInfo || null;
    summary.agentCapabilities = init.agentCapabilities || null;
    client.recordAssertion("P0B-06", true, "initialize ok");
    client.recordAssertion(
      "P0B-07",
      init.protocolVersion === PROTOCOL_VERSION,
      `selected=${init.protocolVersion}`,
    );
    client.recordAssertion("P0B-08", !!init, "capabilities.json written");

    const auth = await client.authenticateIfNeeded();
    summary.authMethodNames = client.authInfo.methods;
    summary.authMechanism = client.authInfo.mechanism;
    // Auth may be stored; success judged by subsequent session/new
    client.recordAssertion(
      "P0B-09",
      true,
      `mechanism=${client.authInfo.mechanism}; methods=${client.authInfo.methods.join("|") || "none"}`,
    );

    // --- Basic prompt session ---
    client.terminalMode = "basic";
    const basicSession = await client.newSession();
    summary.sessionIdDigests.push(basicSession.digest);
    client.recordAssertion("P0B-10", !!basicSession.sessionId, basicSession.redacted);

    const tPrompt = monotonicMs();
    const basicResult = await client.prompt(
      basicSession.sessionId,
      "Reply with exactly LOOP_ACP_BASIC_OK and do not use any tools.",
      120_000,
    );
    summary.durationsMs.basicPrompt = monotonicMs() - tPrompt;
    summary.promptResults.basic = {
      stopReason: basicResult?.stopReason || basicResult,
      textIncludesMarker: client.collectAgentText().includes("LOOP_ACP_BASIC_OK"),
    };
    client.recordAssertion("P0B-11", true, "session/prompt returned");
    const updateTypes = [...new Set(client.updates.map((u) => u.sessionUpdate).filter(Boolean))];
    summary.updateTypesObserved = updateTypes;
    client.recordAssertion("P0B-12", updateTypes.length > 0, updateTypes.join(","));
    client.recordAssertion(
      "P0B-13",
      summary.promptResults.basic.textIncludesMarker ||
        JSON.stringify(basicResult).includes("LOOP_ACP_BASIC_OK"),
      "marker present in stream or result",
    );

    // --- Safe terminal session ---
    client.terminalMode = "basic";
    const termSession = await client.newSession();
    summary.sessionIdDigests.push(termSession.digest);
    const updatesBeforeTerm = client.clientRequests.length;
    const tTerm = monotonicMs();
    let termResult = null;
    let termError = null;
    try {
      termResult = await client.prompt(
        termSession.sessionId,
        [
          "You must use the terminal tool exactly once.",
          "Run exactly this command with no arguments: pwd",
          "Do not run any other command.",
          "After you see the output, reply with LOOP_ACP_TERM_OK and the working directory.",
        ].join(" "),
        180_000,
      );
    } catch (e) {
      termError = String(e.message || e);
    }
    summary.durationsMs.terminalPrompt = monotonicMs() - tTerm;
    const termMethods = client.clientRequests.slice(updatesBeforeTerm).map((r) => r.method);
    summary.promptResults.terminal = {
      stopReason: termResult?.stopReason || termResult || null,
      error: termError,
      clientMethods: termMethods,
      sawTerminalCreate: termMethods.includes("terminal/create"),
    };
    const termOk =
      termMethods.includes("terminal/create") || termMethods.includes("session/request_permission");
    client.recordAssertion(
      "P0B-14",
      termOk,
      `methods=${termMethods.join(",") || "none"}; err=${termError || "none"}`,
    );

    // --- Cancellation session ---
    client.terminalMode = "cancel";
    client.activeToolEvidence = [];
    const cancelSession = await client.newSession();
    summary.sessionIdDigests.push(cancelSession.digest);
    const cancelPromptText = [
      "You must use the terminal tool.",
      "Execute exactly this command and no other:",
      "sh -lc 'sleep 30; printf SHOULD_NOT_COMPLETE'",
      "Do not modify the command.",
    ].join(" ");

    let cancelPromptPromise;
    const cancelPromptStarted = monotonicMs();
    cancelPromptPromise = client
      .prompt(cancelSession.sessionId, cancelPromptText, CANCEL_WAIT_MS + 90_000)
      .then((r) => ({ ok: true, result: r }))
      .catch((e) => ({ ok: false, error: String(e.message || e) }));

    // Wait until terminal create or in_progress tool evidence
    let sawActive = null;
    const waitActiveDeadline = monotonicMs() + 90_000;
    while (monotonicMs() < waitActiveDeadline) {
      sawActive =
        client.activeToolEvidence.find((e) => e.kind === "terminal_create") ||
        client.activeToolEvidence.find(
          (e) =>
            e.sessionUpdate === "tool_call" || e.status === "in_progress" || e.kind === "execute",
        );
      if (sawActive) break;
      // also check client requests
      if (client.clientRequests.some((r) => r.method === "terminal/create")) {
        sawActive = {
          t: nowIso(),
          monoMs: monotonicMs(),
          kind: "terminal_create_via_request",
        };
        break;
      }
      await delay(100);
    }

    const cancelRecord = {
      sawActiveTool: !!sawActive,
      activeEvidence: sawActive || null,
      cancelSentAt: null,
      cancelLatencyMs: null,
      promptOutcome: null,
      outputContainedShouldNotComplete: false,
      remainingTerminalsAfter: null,
    };

    if (sawActive) {
      const sentAt = monotonicMs();
      cancelRecord.cancelSentAt = nowIso();
      client.cancelSession(cancelSession.sessionId);
      // Also kill local terminals
      for (const t of client.terminals.values()) t.kill("SIGTERM");
      const outcome = await Promise.race([
        cancelPromptPromise,
        delay(CANCEL_WAIT_MS).then(() => ({ ok: false, error: "cancel_wait_timeout" })),
      ]);
      cancelRecord.cancelLatencyMs = monotonicMs() - sentAt;
      cancelRecord.promptOutcome = outcome;
      const allOut = [...client.terminals.values()].map((t) => t.output).join("");
      cancelRecord.outputContainedShouldNotComplete = allOut.includes("SHOULD_NOT_COMPLETE");
      cancelRecord.remainingTerminalsAfter = client.remainingTerminals();
      client.recordAssertion("P0B-15", true, JSON.stringify(sawActive));
      client.recordAssertion(
        "P0B-16",
        !cancelRecord.outputContainedShouldNotComplete,
        `output_has_marker=${cancelRecord.outputContainedShouldNotComplete}`,
      );
      client.recordAssertion(
        "P0B-17",
        cancelRecord.cancelLatencyMs != null && cancelRecord.cancelLatencyMs < CANCEL_WAIT_MS,
        `latencyMs=${cancelRecord.cancelLatencyMs}`,
      );
    } else {
      // Cancel anyway to avoid hanging, but mark fail
      client.cancelSession(cancelSession.sessionId);
      await Promise.race([cancelPromptPromise, delay(10_000)]);
      cancelRecord.promptOutcome = { ok: false, error: "no_active_tool_observed" };
      client.recordAssertion("P0B-15", false, "no terminal/tool activity observed before cancel");
      client.recordAssertion("P0B-16", false, "cannot verify without active tool");
      client.recordAssertion("P0B-17", false, "cancel not proven against active tool");
    }
    summary.cancellation = cancelRecord;

    client.recordAssertion("P0B-05", client.stdoutJsonOnly, {
      nonJsonSamples: client.nonJsonStdout.slice(0, 3),
    });
    client.recordAssertion("P0B-18", true, `envKeys=${envKeys.join(",")}`);

    summary.clientDirectedRequestMethods = [...new Set(client.clientRequests.map((r) => r.method))];
  } catch (err) {
    summary.protocolErrors.push({ type: "fatal", message: String(err.stack || err) });
    client.protocolErrors.push({ type: "fatal", message: String(err.message || err) });
    client.recordAssertion("fatal", false, String(err.message || err));
  } finally {
    const exit = await client.shutdown(false);
    summary.childExit = exit;
    summary.protocolErrors = client.protocolErrors;
    summary.assertionResults = client.assertions;
    summary.endedAt = nowIso();
    summary.durationsMs.total = monotonicMs() - t0;
    summary.authMechanism = client.authInfo.mechanism;

    // Artifact digests
    for (const name of ["capabilities.json", "transcript.jsonl", "stderr.log", "summary.json"]) {
      const p = path.join(args.outdir, name);
      if (name === "summary.json") continue;
      if (existsSync(p)) summary.artifactDigests[name] = sha256File(p);
    }

    writeFileSync(path.join(args.outdir, "summary.json"), JSON.stringify(summary, null, 2) + "\n");
    summary.artifactDigests["summary.json"] = sha256File(path.join(args.outdir, "summary.json"));
    // rewrite with digests including self
    writeFileSync(path.join(args.outdir, "summary.json"), JSON.stringify(summary, null, 2) + "\n");

    const failed =
      client.assertions.some((a) => !a.ok) || client.protocolErrors.some((e) => e.type === "fatal");
    process.exitCode = failed ? 1 : 0;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
