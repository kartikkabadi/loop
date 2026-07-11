#!/usr/bin/env node
/**
 * Loop Phase 0B.1 — hardened Devin ACP spike client (Node built-ins only).
 *
 * Topology (must run inside ASCII Box):
 *   node client.mjs  ↔  stdio JSON-RPC  ↔  local `devin acp`
 *
 * Usage:
 *   node client.mjs --outdir <dir> --cwd <canary-abs-dir> [--devin-bin devin]
 *   node client.mjs --self-check --cwd <canary-abs-dir>
 *
 * Writes: capabilities.json, transcript.jsonl, stderr.log, summary.json
 * Digests: artifactDigests for non-summary files; summaryPayloadSha256 over
 * canonical summary with digest fields omitted (NOT sha256 of final file).
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
  symlinkSync,
  rmSync,
  mkdtempSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";

const CLIENT_VERSION = "0.1.8-phase0b1";
const PROTOCOL_VERSION = 1;
const REQUEST_TIMEOUT_MS = 180_000;
const PROCESS_TIMEOUT_MS = 420_000;
const KILL_GRACE_MS = 3_000;
const CANCEL_WAIT_MS = 60_000;
const VERSION_TIMEOUT_MS = 15_000;
const MAX_TERMINAL_OUTPUT_BYTES = 256 * 1024;
const TERMINAL_EXIT_WAIT_MS = 15_000;

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
const PWD_CMD = { command: "pwd", args: [] };

function usage() {
  console.error(
    "Usage: node client.mjs --outdir <dir> --cwd <canary-abs-dir> [--devin-bin devin]\n" +
      "       node client.mjs --self-check --cwd <canary-abs-dir>",
  );
  process.exit(2);
}

function parseArgs(argv) {
  const out = {
    outdir: null,
    cwd: null,
    devinBin: "devin",
    selfCheck: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--outdir") out.outdir = argv[++i];
    else if (a === "--cwd") out.cwd = argv[++i];
    else if (a === "--devin-bin") out.devinBin = argv[++i];
    else if (a === "--self-check") out.selfCheck = true;
    else usage();
  }
  if (!out.cwd) usage();
  if (!out.selfCheck && !out.outdir) usage();
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

/** Resolve candidate relative to jailRoot; reject escapes / symlink escapes. */
function assertInsideJail(jailRoot, candidate) {
  if (candidate == null || candidate === "") {
    throw new Error("empty path");
  }
  const rootReal = realpathSync(jailRoot);
  const abs = path.isAbsolute(candidate)
    ? path.resolve(candidate)
    : path.resolve(rootReal, candidate);

  let real;
  try {
    if (existsSync(abs)) {
      real = realpathSync(abs);
    } else {
      // Walk up to nearest existing parent, then rejoin remaining segments.
      let cur = abs;
      const missing = [];
      while (!existsSync(cur)) {
        missing.unshift(path.basename(cur));
        const parent = path.dirname(cur);
        if (parent === cur) break;
        cur = parent;
      }
      const parentReal = realpathSync(cur);
      real = path.join(parentReal, ...missing);
    }
  } catch (err) {
    throw new Error(`path resolve failed: ${candidate}: ${err.message || err}`);
  }

  const root = rootReal.endsWith(path.sep) ? rootReal : rootReal + path.sep;
  if (real !== rootReal && !real.startsWith(root)) {
    throw new Error(`path escapes canary jail: ${candidate}`);
  }
  return abs;
}

function clampOutputByteLimit(requested) {
  if (
    requested === undefined ||
    requested === null ||
    requested === "" ||
    !Number.isFinite(Number(requested)) ||
    !Number.isInteger(Number(requested)) ||
    Number(requested) <= 0
  ) {
    return { effective: MAX_TERMINAL_OUTPUT_BYTES, source: "host_default" };
  }
  const n = Number(requested);
  if (n > MAX_TERMINAL_OUTPUT_BYTES) {
    return {
      effective: MAX_TERMINAL_OUTPUT_BYTES,
      source: "clamped_to_host_max",
      requested: n,
    };
  }
  return { effective: n, source: "agent_requested", requested: n };
}

function normalizeCmd(command, args) {
  const c = String(command || "");
  const a = Array.isArray(args) ? args.map(String) : [];
  return { command: c, args: a };
}

function cmdsEqual(a, b) {
  return (
    a.command === b.command &&
    a.args.length === b.args.length &&
    a.args.every((x, i) => x === b.args[i])
  );
}

/** Exact cancel canary variants Devin may emit (sh or bash). */
function cancelAllowlistEntries() {
  return [
    { command: CANCEL_CMD, args: CANCEL_ARGS },
    { command: "bash", args: CANCEL_ARGS },
  ];
}

function isCancelAllowlisted(n) {
  return cancelAllowlistEntries().some((b) => cmdsEqual(n, b));
}

function isAllowlistedTerminal(command, args, mode) {
  const n = normalizeCmd(command, args);
  if (isCancelAllowlisted(n)) return mode === "cancel" || mode === "any";
  const basic = [
    PWD_CMD,
    { command: "cat", args: ["transport-input.txt"] },
    { command: "sha256sum", args: ["transport-input.txt"] },
    { command: "sh", args: ["-lc", "pwd"] },
    { command: "sh", args: ["-lc", "cat transport-input.txt"] },
    { command: "sh", args: ["-lc", "sha256sum transport-input.txt"] },
    { command: "bash", args: ["-lc", "pwd"] },
    { command: "bash", args: ["-lc", "cat transport-input.txt"] },
    { command: "bash", args: ["-lc", "sha256sum transport-input.txt"] },
  ];
  if (mode === "basic" || mode === "any") {
    return basic.some((b) => cmdsEqual(n, b));
  }
  return false;
}

function allowlistRuleName(command, args, mode) {
  const n = normalizeCmd(command, args);
  if (isCancelAllowlisted(n)) return "cancel_sleep";
  if (cmdsEqual(n, PWD_CMD)) return "pwd";
  if (isAllowlistedTerminal(command, args, mode)) return "basic_inspect";
  return null;
}

/**
 * Extract a terminal command from ACP toolCall / rawInput shapes observed
 * from Devin and the ACP v1 ToolCallUpdate schema (rawInput is unknown).
 */
function extractTerminalCommand(toolCall) {
  const raw = toolCall?.rawInput ?? toolCall?.input ?? null;
  const pathHint =
    (raw && typeof raw === "object" && (raw.path || raw.file || raw.filepath)) || null;
  const out = {
    command: null,
    args: [],
    pathHint: pathHint ? String(pathHint) : null,
    shape: "none",
    rawKeys: raw && typeof raw === "object" && !Array.isArray(raw) ? Object.keys(raw).sort() : [],
  };

  if (Array.isArray(raw)) {
    if (raw.length > 0) {
      out.command = String(raw[0]);
      out.args = raw.slice(1).map(String);
      out.shape = "raw_argv_array";
    }
    return out;
  }

  if (!raw || typeof raw !== "object") {
    // Fall back to title patterns only for diagnostics; caller must not allow on title alone.
    out.shape = "no_raw_input";
    return out;
  }

  if (Array.isArray(raw.command) && raw.command.length > 0) {
    out.command = String(raw.command[0]);
    out.args = raw.command.slice(1).map(String);
    out.shape = "command_argv";
    return out;
  }
  if (Array.isArray(raw.argv) && raw.argv.length > 0) {
    out.command = String(raw.argv[0]);
    out.args = raw.argv.slice(1).map(String);
    out.shape = "argv";
    return out;
  }
  if (Array.isArray(raw.cmd) && raw.cmd.length > 0) {
    out.command = String(raw.cmd[0]);
    out.args = raw.cmd.slice(1).map(String);
    out.shape = "cmd_argv";
    return out;
  }

  const argsFrom =
    (Array.isArray(raw.args) && raw.args.map(String)) ||
    (Array.isArray(raw.arguments) && raw.arguments.map(String)) ||
    null;

  const exe =
    (typeof raw.command === "string" && raw.command) ||
    (typeof raw.cmd === "string" && raw.cmd) ||
    (typeof raw.executable === "string" && raw.executable) ||
    (typeof raw.bin === "string" && raw.bin) ||
    null;

  if (exe && argsFrom) {
    out.command = exe;
    out.args = argsFrom;
    out.shape = "command_plus_args";
    return out;
  }

  if (exe && !argsFrom) {
    // Single string may be either bare "pwd" or a shell line.
    const trimmed = exe.trim();
    if (!/\s/.test(trimmed)) {
      out.command = trimmed;
      out.args = [];
      out.shape = "bare_command";
      return out;
    }
    // Exact canary shell forms: `sh -lc '…'` / `bash -lc "…"`
    const m = trimmed.match(/^(sh|bash)\s+-lc\s+(.*)$/s);
    if (m) {
      let script = m[2].trim();
      if (
        (script.startsWith("'") && script.endsWith("'")) ||
        (script.startsWith('"') && script.endsWith('"'))
      ) {
        script = script.slice(1, -1);
      }
      out.command = m[1];
      out.args = ["-lc", script];
      out.shape = "shell_line";
      return out;
    }
    out.command = trimmed;
    out.args = [];
    out.shape = "unparsed_command_line";
    return out;
  }

  out.shape = "unknown_raw_input";
  return out;
}

function mergeToolCall(cached, incoming) {
  const base = { ...(cached || {}) };
  if (!incoming || typeof incoming !== "object") return base;
  for (const [k, v] of Object.entries(incoming)) {
    if (v === undefined || v === null) continue;
    if (
      k === "rawInput" &&
      v &&
      typeof v === "object" &&
      base.rawInput &&
      typeof base.rawInput === "object"
    ) {
      base.rawInput = { ...base.rawInput, ...v };
    } else {
      base[k] = v;
    }
  }
  return base;
}

function findAllowOption(options) {
  return (
    options.find((o) => o.kind === "allow_once" || o.optionId === "allow-once") ||
    options.find((o) => o.kind === "allow_always" || o.optionId === "allow-always") ||
    options.find((o) => String(o.kind || "").startsWith("allow")) ||
    null
  );
}

function findRejectOption(options) {
  return (
    options.find((o) => o.kind === "reject_once" || o.optionId === "reject-once") ||
    options.find((o) => o.kind === "reject_always" || o.optionId === "reject-always") ||
    options.find((o) => String(o.kind || "").startsWith("reject")) ||
    options.find((o) => /reject|deny|cancel/i.test(String(o.optionId || ""))) ||
    null
  );
}

/**
 * Devin's terminal/create often sends a single shell-line in `command` with
 * `args` omitted/null (e.g. "sh -lc 'sleep 30; …'"). Normalize to argv form
 * before allowlist checks and spawn.
 */
function normalizeTerminalInvocation(command, args) {
  const rawArgs = Array.isArray(args) ? args : [];
  if (typeof command !== "string") {
    return { command: String(command || ""), args: rawArgs.map(String), shape: "non_string" };
  }
  if (rawArgs.length > 0) {
    return { command, args: rawArgs.map(String), shape: "command_plus_args" };
  }
  const extracted = extractTerminalCommand({ rawInput: { command } });
  if (extracted.command) {
    return {
      command: extracted.command,
      args: extracted.args,
      shape: extracted.shape,
    };
  }
  return { command, args: [], shape: "passthrough" };
}

/** Validate JSON-RPC 2.0 envelope shape. */
function validateJsonRpcEnvelope(msg) {
  if (!msg || typeof msg !== "object" || Array.isArray(msg)) {
    return { ok: false, reason: "not_object" };
  }
  if (msg.jsonrpc !== "2.0") return { ok: false, reason: "bad_jsonrpc" };
  const hasId = Object.prototype.hasOwnProperty.call(msg, "id");
  const hasMethod = typeof msg.method === "string" && msg.method.length > 0;
  const hasResult = Object.prototype.hasOwnProperty.call(msg, "result");
  const hasError = Object.prototype.hasOwnProperty.call(msg, "error");

  if (hasMethod && hasId && !hasResult && !hasError) {
    return { ok: true, kind: "request" };
  }
  if (hasMethod && !hasId && !hasResult && !hasError) {
    return { ok: true, kind: "notification" };
  }
  if (hasId && !hasMethod && hasResult !== hasError) {
    // exactly one of result/error
    if (hasResult && hasError) return { ok: false, reason: "result_and_error" };
    return { ok: true, kind: "response" };
  }
  if (hasId && !hasMethod && hasResult && hasError) {
    return { ok: false, reason: "result_and_error" };
  }
  return { ok: false, reason: "unknown_shape" };
}

function runJailSelfChecks() {
  const root = mkdtempSync(path.join(tmpdir(), "loop-0b1-jail-"));
  const results = [];
  try {
    writeFileSync(path.join(root, "ok.txt"), "ok\n");
    const outside = mkdtempSync(path.join(tmpdir(), "loop-0b1-out-"));
    writeFileSync(path.join(outside, "secret.txt"), "nope\n");
    symlinkSync(outside, path.join(root, "escape-link"));

    const check = (name, fn) => {
      try {
        fn();
        results.push({ name, ok: true });
      } catch (err) {
        results.push({ name, ok: false, error: String(err.message || err) });
      }
    };

    check("relative_in_jail_accepted", () => {
      const p = assertInsideJail(root, "ok.txt");
      if (!p.endsWith(`${path.sep}ok.txt`)) throw new Error(`unexpected ${p}`);
    });
    check("absolute_in_jail_accepted", () => {
      assertInsideJail(root, path.join(root, "ok.txt"));
    });
    check("dotdot_escape_rejected", () => {
      try {
        assertInsideJail(root, "../ok.txt");
        throw new Error("should have rejected");
      } catch (err) {
        if (String(err.message).includes("should have rejected")) throw err;
        if (!String(err.message).includes("escapes")) throw err;
      }
    });
    check("symlink_escape_rejected", () => {
      try {
        assertInsideJail(root, path.join("escape-link", "secret.txt"));
        throw new Error("should have rejected");
      } catch (err) {
        if (String(err.message).includes("should have rejected")) throw err;
        if (!String(err.message).includes("escapes")) throw err;
      }
    });
    check("missing_child_under_symlink_escape_rejected", () => {
      try {
        assertInsideJail(root, path.join("escape-link", "missing-child.txt"));
        throw new Error("should have rejected");
      } catch (err) {
        if (String(err.message).includes("should have rejected")) throw err;
        if (!String(err.message).includes("escapes")) throw err;
      }
    });

    rmSync(outside, { recursive: true, force: true });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    throw new Error(`jail self-check failed: ${JSON.stringify(failed)}`);
  }
  return results;
}

class TerminalHandle {
  constructor({ id, child, cwd, byteLimit }) {
    this.id = id;
    this.child = child;
    this.cwd = cwd;
    this.output = "";
    this.truncated = false;
    this.exitCode = null;
    this.signal = null;
    this.exited = false;
    this.released = false;
    this.waiters = [];
    this.byteLimit = byteLimit;
    this.pid = child.pid;
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
    while (Buffer.byteLength(this.output, "utf8") > this.byteLimit) {
      this.output = this.output.slice(1);
      this.truncated = true;
    }
  }

  waitForExit(timeoutMs = TERMINAL_EXIT_WAIT_MS) {
    if (this.exited) {
      return Promise.resolve({
        exitCode: this.exitCode,
        signal: this.signal,
      });
    }
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`terminal ${this.id} exit timeout`));
      }, timeoutMs);
      this.waiters.push((st) => {
        clearTimeout(timer);
        resolve(st);
      });
    });
  }

  kill(sig = "SIGTERM") {
    if (this.exited) return;
    if (!this.child?.pid) return;
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

  async terminateBounded() {
    if (this.exited) return { exitCode: this.exitCode, signal: this.signal };
    this.kill("SIGTERM");
    const deadline = monotonicMs() + KILL_GRACE_MS;
    while (!this.exited && monotonicMs() < deadline) {
      await delay(50);
    }
    if (!this.exited) {
      this.kill("SIGKILL");
      await this.waitForExit(KILL_GRACE_MS).catch(() => null);
    }
    return { exitCode: this.exitCode, signal: this.signal };
  }
}

class AcpClient {
  constructor({ outdir, cwd, devinBin, childEnv }) {
    this.outdir = outdir;
    this.cwd = resolveJailRoot(cwd);
    this.devinBin = devinBin;
    this.childEnv = childEnv;
    this.child = null;
    this.childExited = false;
    this.childExitCode = null;
    this.childSignal = null;
    this.nextId = 1;
    this.pending = new Map();
    this.transcriptPath = path.join(outdir, "transcript.jsonl");
    this.stderrPath = path.join(outdir, "stderr.log");
    this.stderrStream = createWriteStream(this.stderrPath, { flags: "w" });
    this.stderrClosed = new Promise((resolve) => {
      this.stderrStream.on("close", resolve);
    });
    this.buffer = "";
    this.stdoutJsonRpcOk = true;
    this.envelopeViolations = [];
    this.nonJsonStdout = [];
    this.updates = [];
    this.clientRequests = [];
    this.permissionDecisions = [];
    this.terminals = new Map(); // live
    this.terminalHistory = []; // retained after release
    this.terminalMode = "any";
    this.activeSessionId = null;
    this.activeToolEvidence = [];
    /** @type {Map<string, object>} toolCallId → merged ToolCallUpdate fields */
    this.toolCallCache = new Map();
    this.protocolErrors = [];
    this.assertions = [];
    this.startedAt = nowIso();
    this.initializeResult = null;
    this.authInfo = { mechanism: "unknown", methods: [], authenticated: false };
    this.sessions = [];
    this.effectiveOutputLimits = [];
    /** When set, terminal/wait_for_exit responses are deferred until this resolves. */
    this.cancelGate = null;
    this.agentStoppedEvents = [];
    /** Resolves when a cancel-mode terminal is created (for fast cancel). */
    this.activeTerminalWaiter = null;
    /** Optional sync hook invoked inside terminal/create before the RPC returns. */
    this.syncCancelOnCreate = null;
  }

  recordAssertion(id, ok, detail) {
    this.assertions.push({ id, ok: !!ok, detail: detail || "" });
  }

  writeTranscript(obj) {
    writeFileSync(this.transcriptPath, JSON.stringify(obj) + "\n", { flag: "a" });
  }

  async start() {
    assertEnvSafe(this.childEnv);
    this.child = spawn(this.devinBin, ["acp"], {
      cwd: this.cwd,
      env: this.childEnv,
      stdio: ["pipe", "pipe", "pipe"],
      detached: true,
    });
    this.child.stderr.on("data", (buf) => this.stderrStream.write(buf));
    this.child.stdout.setEncoding("utf8");
    this.child.stdout.on("data", (chunk) => this.#onStdout(chunk));
    this.child.stdin.on("error", (err) => {
      this.protocolErrors.push({
        type: "stdin_error",
        message: String(err.message || err),
      });
    });
    this.child.on("error", (err) => {
      this.protocolErrors.push({ type: "spawn", message: String(err) });
    });
    this.child.on("exit", (code, signal) => {
      this.childExited = true;
      this.childExitCode = code;
      this.childSignal = signal;
      for (const [id, pending] of this.pending) {
        clearTimeout(pending.timer);
        pending.reject(new Error(`devin acp exited during ${pending.method} id=${id}`));
      }
      this.pending.clear();
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
        this.stdoutJsonRpcOk = false;
        this.nonJsonStdout.push(line.slice(0, 200));
        this.protocolErrors.push({
          type: "non_json_stdout",
          message: String(e),
          sample: line.slice(0, 120),
        });
        continue;
      }
      const env = validateJsonRpcEnvelope(msg);
      if (!env.ok) {
        this.stdoutJsonRpcOk = false;
        this.envelopeViolations.push({ reason: env.reason, sample: line.slice(0, 160) });
        this.protocolErrors.push({
          type: "bad_jsonrpc_envelope",
          reason: env.reason,
        });
        continue;
      }
      this.#dispatch(msg);
    }
  }

  #dispatch(msg) {
    this.writeTranscript({ dir: "in", t: nowIso(), msg: this.#sanitizeMsg(msg) });
    const hasId = Object.prototype.hasOwnProperty.call(msg, "id");
    const hasResult = Object.prototype.hasOwnProperty.call(msg, "result");
    const hasError = Object.prototype.hasOwnProperty.call(msg, "error");

    if (hasId && (hasResult || hasError) && !msg.method) {
      const pending = this.pending.get(msg.id);
      if (pending) {
        this.pending.delete(msg.id);
        clearTimeout(pending.timer);
        if (hasError) {
          pending.reject(
            Object.assign(new Error(msg.error?.message || "rpc error"), {
              rpc: msg.error,
            }),
          );
        } else pending.resolve(msg.result);
      }
      return;
    }
    if (msg.method && hasId) {
      void this.#handleClientRequest(msg);
      return;
    }
    if (msg.method && !hasId) {
      if (msg.method === "session/update") {
        const update = msg.params?.update || {};
        const sid = msg.params?.sessionId || null;
        const toolCallId = update.toolCallId || null;
        if (
          toolCallId &&
          (update.sessionUpdate === "tool_call" || update.sessionUpdate === "tool_call_update")
        ) {
          const prev = this.toolCallCache.get(toolCallId) || {};
          this.toolCallCache.set(toolCallId, mergeToolCall(prev, update));
        }
        this.updates.push({
          t: nowIso(),
          sessionIdDigest: sid ? sha256Text(sid).slice(0, 16) : null,
          sessionUpdate: update.sessionUpdate || update.type || null,
          toolCallId,
          status: update.status || null,
          kind: update.kind || null,
          title: update.title || null,
        });
        if (
          this.activeSessionId &&
          sid === this.activeSessionId &&
          (update.sessionUpdate === "tool_call" ||
            update.sessionUpdate === "tool_call_update" ||
            update.status === "in_progress")
        ) {
          this.activeToolEvidence.push({
            t: nowIso(),
            monoMs: monotonicMs(),
            sessionUpdate: update.sessionUpdate,
            status: update.status,
            toolCallId,
            kind: update.kind,
            title: update.title,
            sessionScoped: true,
          });
        }
      } else if (msg.method === "_cognition.ai/agent_stopped") {
        this.agentStoppedEvents.push({
          t: nowIso(),
          monoMs: monotonicMs(),
          cause: msg.params?.cause || null,
          sessionIdDigest: msg.params?.sessionId
            ? sha256Text(msg.params.sessionId).slice(0, 16)
            : null,
        });
      }
    }
  }

  #sanitizeMsg(msg) {
    const s = JSON.stringify(msg);
    const redacted = s
      .replace(/("sessionId"\s*:\s*")[^"]{8,}(")/g, "$1***REDACTED***$2")
      .replace(/("terminalId"\s*:\s*")[^"]+(")/g, "$1***$2")
      .replace(/("userMessageId"\s*:\s*")[^"]+(")/g, "$1***$2");
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
      if (!this.#safeStdinWrite(msg)) {
        clearTimeout(timer);
        this.pending.delete(id);
        reject(new Error(`stdin closed before ${method} id=${id}`));
      }
    });
  }

  notify(method, params) {
    const msg = { jsonrpc: "2.0", method, params };
    this.writeTranscript({ dir: "out", t: nowIso(), msg: this.#sanitizeMsg(msg) });
    this.#safeStdinWrite(msg);
  }

  #safeStdinWrite(obj) {
    if (
      !this.child ||
      this.childExited ||
      !this.child.stdin ||
      this.child.stdin.destroyed ||
      this.child.stdin.writableEnded
    ) {
      this.protocolErrors.push({
        type: "stdin_closed",
        message: `cannot write ${obj?.method || obj?.id || "msg"}`,
      });
      return false;
    }
    try {
      return this.child.stdin.write(JSON.stringify(obj) + "\n");
    } catch (err) {
      this.protocolErrors.push({
        type: "stdin_write",
        message: String(err.message || err),
      });
      return false;
    }
  }

  async #handleClientRequest(msg) {
    const { id, method, params } = msg;
    this.clientRequests.push({
      t: nowIso(),
      method,
      monoMs: monotonicMs(),
      sessionIdDigest: params?.sessionId ? sha256Text(params.sessionId).slice(0, 16) : null,
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
          throw Object.assign(new Error("write not advertised"), { code: -32601 });
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
          result = await this.#handleTerminalKill(params);
          break;
        case "terminal/release":
          result = await this.#handleTerminalRelease(params);
          break;
        default:
          throw Object.assign(new Error(`Method not found: ${method}`), {
            code: -32601,
          });
      }
      const resp = { jsonrpc: "2.0", id, result };
      this.writeTranscript({ dir: "out", t: nowIso(), msg: this.#sanitizeMsg(resp) });
      this.#safeStdinWrite(resp);
      // After terminal/create is acknowledged, run cancel hook so Devin sees
      // create success before session/cancel (cancel-during-create crashes ACP).
      if (
        method === "terminal/create" &&
        this.terminalMode === "cancel" &&
        typeof this.syncCancelOnCreate === "function" &&
        result?.terminalId
      ) {
        const handle = this.terminals.get(result.terminalId);
        if (handle) {
          try {
            this.syncCancelOnCreate({
              t: nowIso(),
              monoMs: monotonicMs(),
              kind: "terminal_create_live",
              terminalId: handle.id,
              pid: handle.child?.pid || handle.pid || null,
              command: handle.command,
              args: handle.args,
              rawCommand: handle.rawCommand,
            });
          } catch (hookErr) {
            this.protocolErrors.push({
              type: "sync_cancel_hook",
              message: String(hookErr.message || hookErr),
            });
          }
        }
      }
    } catch (err) {
      const resp = {
        jsonrpc: "2.0",
        id,
        error: { code: err.code || -32000, message: String(err.message || err) },
      };
      this.writeTranscript({ dir: "out", t: nowIso(), msg: resp });
      this.#safeStdinWrite(resp);
    }
  }

  /**
   * Fail-closed permission handler.
   * Allow only when structured request matches an exact allowlisted canary action
   * for the current terminal mode / session.
   *
   * ACP permission requests may carry only toolCallId; merge with cached
   * session/update tool_call fields before inspecting rawInput.
   */
  #handlePermission(params) {
    const options = Array.isArray(params?.options) ? params.options : [];
    const incoming = params?.toolCall || {};
    const toolCallId = incoming.toolCallId || incoming.toolCallID || null;
    const cached = toolCallId ? this.toolCallCache.get(toolCallId) : null;
    const toolCall = mergeToolCall(cached, incoming);
    if (toolCallId) this.toolCallCache.set(toolCallId, toolCall);

    const title = String(toolCall.title || "");
    const kind = String(toolCall.kind || "");
    const extracted = extractTerminalCommand(toolCall);
    const { command, args, pathHint, shape, rawKeys } = extracted;

    const reject = (reason) => {
      const rejectOpt = findRejectOption(options);
      const decision = {
        t: nowIso(),
        method: "session/request_permission",
        toolCallDigest: toolCallId ? sha256Text(toolCallId).slice(0, 16) : null,
        decision: "reject",
        reason,
        matchedRule: null,
        kind,
        title: title.slice(0, 80),
        extractShape: shape,
        rawKeys,
        mode: this.terminalMode,
      };
      this.permissionDecisions.push(decision);
      if (rejectOpt) {
        return { outcome: { outcome: "selected", optionId: rejectOpt.optionId } };
      }
      return { outcome: { outcome: "cancelled" } };
    };

    if (!params || !options.length) {
      return reject("incomplete_permission_request");
    }

    if (params.sessionId && this.activeSessionId && params.sessionId !== this.activeSessionId) {
      return reject("session_mismatch");
    }

    // Writes / network / install / unknown dangerous kinds: reject
    if (
      /write|edit|delete|move|network|fetch|install/i.test(kind) ||
      /write|edit|delete|npm |pip |curl |wget |gh /i.test(title)
    ) {
      return reject("disallowed_tool_kind");
    }

    // Exact terminal allowlist match via structured command
    if (command && isAllowlistedTerminal(command, args, this.terminalMode)) {
      const rule = allowlistRuleName(command, args, this.terminalMode);
      const allowOpt = findAllowOption(options);
      if (!allowOpt) return reject("no_allow_option_present");
      this.permissionDecisions.push({
        t: nowIso(),
        method: "session/request_permission",
        toolCallDigest: toolCallId ? sha256Text(toolCallId).slice(0, 16) : null,
        decision: "allow",
        reason: "allowlist_command_match",
        matchedRule: rule,
        kind,
        title: title.slice(0, 80),
        extractShape: shape,
        rawKeys,
        mode: this.terminalMode,
        command,
        args,
      });
      return { outcome: { outcome: "selected", optionId: allowOpt.optionId } };
    }

    // Exact jailed read of transport-input.txt
    if (pathHint) {
      try {
        const p = assertInsideJail(this.cwd, pathHint);
        if (path.basename(p) === "transport-input.txt" && this.terminalMode !== "cancel") {
          const allowOpt = findAllowOption(options);
          if (!allowOpt) return reject("no_allow_option_present");
          this.permissionDecisions.push({
            t: nowIso(),
            method: "session/request_permission",
            toolCallDigest: toolCallId ? sha256Text(toolCallId).slice(0, 16) : null,
            decision: "allow",
            reason: "allowlist_jailed_read",
            matchedRule: "read_transport_input",
            kind,
            title: title.slice(0, 80),
            extractShape: shape,
            rawKeys,
            mode: this.terminalMode,
          });
          return { outcome: { outcome: "selected", optionId: allowOpt.optionId } };
        }
      } catch {
        return reject("path_outside_jail");
      }
    }

    // Never allow on title alone — require structured command / path match.
    if (!command) {
      return reject("missing_structured_command");
    }
    return reject("no_allowlist_match");
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
    const normalized = normalizeTerminalInvocation(params.command, params.args);
    const command = normalized.command;
    const args = normalized.args;
    if (!isAllowlistedTerminal(command, args, this.terminalMode)) {
      throw new Error(
        `terminal command denied by allowlist: ${params.command} ` +
          `(normalized=${command} ${args.join(" ")}; shape=${normalized.shape})`,
      );
    }
    if (params.sessionId && this.activeSessionId && params.sessionId !== this.activeSessionId) {
      throw new Error("terminal create session mismatch");
    }
    const clamp = clampOutputByteLimit(params.outputByteLimit);
    this.effectiveOutputLimits.push(clamp);
    const id = `term_${randomUUID().slice(0, 8)}`;
    const child = spawn(command, args, {
      cwd,
      env: this.childEnv,
      stdio: ["ignore", "pipe", "pipe"],
      detached: true,
      shell: false,
    });
    const handle = new TerminalHandle({
      id,
      child,
      cwd,
      byteLimit: clamp.effective,
    });
    handle.command = command;
    handle.args = args;
    handle.rawCommand = params.command;
    handle.normalizeShape = normalized.shape;
    this.terminals.set(id, handle);
    const evidence = {
      t: nowIso(),
      monoMs: monotonicMs(),
      kind: "terminal_create",
      terminalId: id,
      command,
      args,
      rawCommand: params.command,
      normalizeShape: normalized.shape,
      cwd,
      outputByteLimit: clamp.effective,
      sessionScoped: true,
    };
    this.activeToolEvidence.push(evidence);
    const last = this.clientRequests.at(-1);
    if (last) {
      last.command = command;
      last.args = args;
      last.rawCommand = params.command;
      last.normalizeShape = normalized.shape;
    }
    if (this.terminalMode === "cancel" && typeof this.activeTerminalWaiter === "function") {
      const waiter = this.activeTerminalWaiter;
      this.activeTerminalWaiter = null;
      waiter({
        t: evidence.t,
        monoMs: evidence.monoMs,
        kind: "terminal_create_live",
        terminalId: id,
        pid: child.pid,
        command,
        args,
        rawCommand: params.command,
      });
    }
    return { terminalId: id };
  }

  #handleTerminalOutput(params) {
    const t = this.terminals.get(params.terminalId) || this.#historyTerminal(params.terminalId);
    if (!t) throw new Error("unknown terminal");
    const result = { output: t.output, truncated: t.truncated };
    if (t.exited) {
      result.exitStatus = { exitCode: t.exitCode, signal: t.signal };
    }
    return result;
  }

  #historyTerminal(id) {
    return this.terminalHistory.find((t) => t.id === id) || null;
  }

  async #handleTerminalWait(params) {
    const t = this.terminals.get(params.terminalId);
    if (!t) throw new Error("unknown terminal");
    const st = await t.waitForExit();
    return { exitCode: st.exitCode, signal: st.signal };
  }

  async #handleTerminalKill(params) {
    const t = this.terminals.get(params.terminalId);
    if (!t) throw new Error("unknown terminal");
    await t.terminateBounded();
    return {};
  }

  async #handleTerminalRelease(params) {
    const t = this.terminals.get(params.terminalId);
    if (!t) return {};
    if (!t.exited) {
      await t.terminateBounded();
    }
    t.released = true;
    this.terminalHistory.push({
      id: t.id,
      cwd: t.cwd,
      output: t.output,
      truncated: t.truncated,
      exitCode: t.exitCode,
      signal: t.signal,
      exited: t.exited,
      byteLimit: t.byteLimit,
      command: t.command,
      args: t.args,
    });
    this.terminals.delete(params.terminalId);
    return {};
  }

  remainingLiveTerminals() {
    return [...this.terminals.values()].filter((t) => !t.exited).length;
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
    this.activeSessionId = sessionId;
    this.activeToolEvidence = [];
    return { sessionId, digest, redacted: this.sessions.at(-1).redacted };
  }

  async prompt(sessionId, text, timeoutMs = REQUEST_TIMEOUT_MS) {
    this.activeSessionId = sessionId;
    return this.request(
      "session/prompt",
      { sessionId, prompt: [{ type: "text", text }] },
      timeoutMs,
    );
  }

  cancelSession(sessionId) {
    this.notify("session/cancel", { sessionId });
  }

  collectAgentText() {
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
      await t.terminateBounded();
      this.terminalHistory.push({
        id: t.id,
        cwd: t.cwd,
        output: t.output,
        truncated: t.truncated,
        exitCode: t.exitCode,
        signal: t.signal,
        exited: t.exited,
        byteLimit: t.byteLimit,
      });
    }
    this.terminals.clear();

    if (!this.child) {
      this.stderrStream.end();
      await this.stderrClosed;
      return { exitCode: this.childExitCode, signal: this.childSignal, exited: true };
    }

    try {
      this.child.stdin.end();
    } catch {
      /* ignore */
    }

    if (!this.childExited) {
      try {
        this.child.kill("SIGTERM");
      } catch {
        try {
          process.kill(-this.child.pid, "SIGTERM");
        } catch {
          /* ignore */
        }
      }
      const deadline = monotonicMs() + (force ? 500 : KILL_GRACE_MS);
      while (!this.childExited && monotonicMs() < deadline) {
        await delay(50);
      }
    }
    if (!this.childExited) {
      try {
        process.kill(-this.child.pid, "SIGKILL");
      } catch {
        try {
          this.child.kill("SIGKILL");
        } catch {
          /* ignore */
        }
      }
      const deadline = monotonicMs() + KILL_GRACE_MS;
      while (!this.childExited && monotonicMs() < deadline) {
        await delay(50);
      }
    }

    this.stderrStream.end();
    await this.stderrClosed;
    return {
      exitCode: this.childExitCode,
      signal: this.childSignal,
      exited: this.childExited,
    };
  }
}

async function runDevinVersion(bin, env) {
  return await new Promise((resolve, reject) => {
    let settled = false;
    const child = spawn(bin, ["version"], {
      env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let out = "";
    const timer = setTimeout(() => {
      if (settled) return;
      try {
        child.kill("SIGTERM");
      } catch {
        /* ignore */
      }
      setTimeout(() => {
        try {
          child.kill("SIGKILL");
        } catch {
          /* ignore */
        }
      }, 500).unref?.();
      settled = true;
      reject(new Error("devin version timeout"));
    }, VERSION_TIMEOUT_MS);
    child.stdout.on("data", (b) => (out += b.toString("utf8")));
    child.stderr.on("data", (b) => (out += b.toString("utf8")));
    child.on("error", (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(err);
    });
    child.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      const line = out.trim().split("\n")[0] || "";
      if (code !== 0 || !line) {
        reject(new Error(`devin version failed code=${code} out=${line.slice(0, 80)}`));
        return;
      }
      resolve(line);
    });
  });
}

function scanArtifactsForSecrets(outdir) {
  const findings = [];
  const patterns = [
    /ASCII_BOX_API_KEY\s*=/,
    /OPENAI_API_KEY\s*=/,
    /CODEX_API_KEY\s*=/,
    /GITHUB_TOKEN\s*=/,
    /ghp_[A-Za-z0-9]{20,}/,
    /github_pat_[A-Za-z0-9_]{20,}/,
    /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
    /Bearer [A-Za-z0-9\-._~+/]+=*/,
  ];
  for (const name of ["capabilities.json", "transcript.jsonl", "stderr.log", "summary.json"]) {
    const p = path.join(outdir, name);
    if (!existsSync(p)) continue;
    const text = readFileSync(p, "utf8");
    for (const re of patterns) {
      if (re.test(text)) findings.push({ file: name, pattern: String(re) });
    }
    // Full session IDs should be redacted in transcript; flag long sess_ values
    if (/sess_[A-Za-z0-9]{20,}/.test(text) && name !== "summary.json") {
      // summary should not contain full ids either
      findings.push({ file: name, pattern: "possible_full_session_id" });
    }
  }
  return { ok: findings.length === 0, findings };
}

function validateTranscriptFile(transcriptPath) {
  const lines = readFileSync(transcriptPath, "utf8").split("\n").filter(Boolean);
  let ok = true;
  const violations = [];
  for (const line of lines) {
    let row;
    try {
      row = JSON.parse(line);
    } catch (e) {
      ok = false;
      violations.push({ reason: "jsonl_parse", sample: line.slice(0, 80) });
      continue;
    }
    if (!row.msg) continue;
    const env = validateJsonRpcEnvelope(row.msg);
    if (!env.ok) {
      ok = false;
      violations.push({ reason: env.reason });
    }
  }
  return { ok, violations, lineCount: lines.length };
}

function computeSummaryPayloadSha256(summary) {
  const clone = structuredClone(summary);
  delete clone.summaryPayloadSha256;
  delete clone.artifactDigests?.["summary.json"];
  // Stable stringify: sorted keys via JSON with replacer walk
  const stable = (v) => {
    if (Array.isArray(v)) return v.map(stable);
    if (v && typeof v === "object") {
      const out = {};
      for (const k of Object.keys(v).sort()) out[k] = stable(v[k]);
      return out;
    }
    return v;
  };
  return sha256Text(JSON.stringify(stable(clone)));
}

async function main() {
  const args = parseArgs(process.argv);

  // Jail self-checks always run
  const jailSelfChecks = runJailSelfChecks();
  if (args.selfCheck) {
    console.log(JSON.stringify({ jailSelfChecks }, null, 2));
    process.exit(0);
  }

  mkdirSync(args.outdir, { recursive: true });
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
    permissionDecisions: [],
    promptResults: {},
    cancellation: null,
    terminalLifecycle: null,
    childExit: null,
    protocolErrors: [],
    assertionResults: [],
    artifactDigests: {},
    summaryPayloadSha256: null,
    summaryDigestScheme:
      "summaryPayloadSha256 = sha256(canonical JSON of summary with summaryPayloadSha256 omitted); NOT sha256 of final summary.json file",
    envKeyNames: envKeys,
    forbiddenEnvAudit: { passed: true, violations: [] },
    jailSelfChecks,
    maxTerminalOutputBytes: MAX_TERMINAL_OUTPUT_BYTES,
    effectiveOutputLimits: [],
    jsonRpcFraming: null,
    secretScan: null,
    startedAt: client.startedAt,
    endedAt: null,
    durationsMs: {},
  };

  const t0 = monotonicMs();
  let cleanupProven = false;

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

    await client.authenticateIfNeeded();
    summary.authMethodNames = client.authInfo.methods;
    summary.authMechanism = client.authInfo.mechanism;
    client.recordAssertion(
      "P0B-09",
      true,
      `mechanism=${client.authInfo.mechanism}; methods=${client.authInfo.methods.join("|") || "none"}`,
    );

    // --- Basic prompt ---
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
    const basicText = client.collectAgentText();
    summary.promptResults.basic = {
      stopReason: basicResult?.stopReason || null,
      textIncludesMarker: basicText.includes("LOOP_ACP_BASIC_OK"),
    };
    client.recordAssertion("P0B-11", true, "session/prompt returned");
    const updateTypes = [...new Set(client.updates.map((u) => u.sessionUpdate).filter(Boolean))];
    summary.updateTypesObserved = updateTypes;
    client.recordAssertion("P0B-12", updateTypes.length > 0, updateTypes.join(","));
    client.recordAssertion(
      "P0B-13",
      summary.promptResults.basic.textIncludesMarker &&
        summary.promptResults.basic.stopReason === "end_turn",
      `marker=${summary.promptResults.basic.textIncludesMarker}; stop=${summary.promptResults.basic.stopReason}`,
    );

    // --- Safe terminal session (strict P0B-14) ---
    client.terminalMode = "basic";
    const termSession = await client.newSession();
    summary.sessionIdDigests.push(termSession.digest);
    const reqBefore = client.clientRequests.length;
    const histBefore = client.terminalHistory.length;
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

    const termReqs = client.clientRequests.slice(reqBefore);
    const termMethods = termReqs.map((r) => r.method);
    const createReq = termReqs.find((r) => r.method === "terminal/create");
    const newTerms = client.terminalHistory.slice(histBefore);
    // Also check live terminals that completed
    const allTermRecords = [
      ...newTerms,
      ...[...client.terminals.values()].map((t) => ({
        id: t.id,
        cwd: t.cwd,
        output: t.output,
        exitCode: t.exitCode,
        exited: t.exited,
      })),
    ];
    const pwdTerm = allTermRecords.find((t) => {
      const out = (t.output || "").trim();
      return t.exited && t.exitCode === 0 && out.includes(client.cwd);
    });

    const lifecycle = {
      methods: termMethods,
      hasCreate: termMethods.includes("terminal/create"),
      hasWait: termMethods.includes("terminal/wait_for_exit"),
      hasOutput: termMethods.includes("terminal/output"),
      hasRelease: termMethods.includes("terminal/release"),
      unexpectedMethods: termMethods.filter(
        (m) =>
          ![
            "terminal/create",
            "terminal/wait_for_exit",
            "terminal/output",
            "terminal/release",
            "session/request_permission",
            "fs/read_text_file",
          ].includes(m),
      ),
      createCommand: createReq?.command || null,
      createArgs: createReq?.args || null,
      pwdMatched: !!pwdTerm,
      exitCode: pwdTerm?.exitCode ?? null,
      stopReason: termResult?.stopReason || null,
      termMarker: client.collectAgentText().includes("LOOP_ACP_TERM_OK"),
      error: termError,
      permissionAllows: client.permissionDecisions.filter((d) => d.decision === "allow"),
    };
    summary.terminalLifecycle = lifecycle;
    summary.promptResults.terminal = lifecycle;

    const p14 =
      lifecycle.hasCreate &&
      lifecycle.hasWait &&
      lifecycle.hasOutput &&
      lifecycle.hasRelease &&
      cmdsEqual(
        { command: lifecycle.createCommand || "", args: lifecycle.createArgs || [] },
        PWD_CMD,
      ) &&
      lifecycle.pwdMatched &&
      lifecycle.exitCode === 0 &&
      lifecycle.stopReason === "end_turn" &&
      lifecycle.termMarker &&
      lifecycle.unexpectedMethods.length === 0 &&
      !termError;

    client.recordAssertion(
      "P0B-14",
      p14,
      JSON.stringify({
        methods: lifecycle.methods,
        create: [lifecycle.createCommand, lifecycle.createArgs],
        exitCode: lifecycle.exitCode,
        stopReason: lifecycle.stopReason,
        pwdMatched: lifecycle.pwdMatched,
        termMarker: lifecycle.termMarker,
        unexpected: lifecycle.unexpectedMethods,
        err: termError || "none",
      }),
    );

    // --- Cancellation (strict; scoped to this session) ---
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

    const cancelRecord = {
      sawActiveTool: false,
      activeEvidence: null,
      cancelSentAt: null,
      msActiveToCancelSend: null,
      msCancelSendToPromptResult: null,
      msCancelSendToTerminalExit: null,
      promptOutcome: null,
      stopReason: null,
      outputContainedShouldNotComplete: false,
      remainingLiveTerminalsAfter: null,
      terminalExit: null,
      localKillInitiated: false,
      agentStopped: [],
    };

    let sawActive = null;
    let cancelSentAtMono = null;
    client.syncCancelOnCreate = (info) => {
      sawActive = info;
      cancelRecord.sawActiveTool = true;
      cancelRecord.activeEvidence = info;
      cancelSentAtMono = monotonicMs();
      cancelRecord.cancelSentAt = nowIso();
      cancelRecord.msActiveToCancelSend = cancelSentAtMono - info.monoMs;
      client.cancelSession(cancelSession.sessionId);
    };

    const sawActivePromise = new Promise((resolve) => {
      client.activeTerminalWaiter = (info) => resolve(info);
    });

    const cancelPromptPromise = client
      .prompt(cancelSession.sessionId, cancelPromptText, CANCEL_WAIT_MS + 90_000)
      .then((r) => ({ ok: true, result: r }))
      .catch((e) => ({ ok: false, error: String(e.message || e) }));

    sawActive = await Promise.race([sawActivePromise, delay(90_000).then(() => null)]);
    client.activeTerminalWaiter = null;
    client.syncCancelOnCreate = null;

    if (sawActive && cancelSentAtMono != null) {
      const createOk = isCancelAllowlisted(
        normalizeCmd(sawActive.command || "", sawActive.args || []),
      );
      const liveTerms = [...client.terminals.values()].filter(
        (t) => t.id === sawActive.terminalId || !t.exited,
      );

      // Do NOT locally kill yet. Answering wait_for_exit with SIGTERM immediately
      // after session/cancel causes Devin ACP to crash ("receiver dropped") and
      // omit the session/prompt stopReason=cancelled result. Let ACP cancel first.
      const outcome = await Promise.race([
        cancelPromptPromise,
        delay(CANCEL_WAIT_MS).then(() => ({
          ok: false,
          error: "cancel_wait_timeout",
        })),
      ]);

      cancelRecord.msCancelSendToPromptResult = monotonicMs() - cancelSentAtMono;
      cancelRecord.promptOutcome = outcome;
      cancelRecord.stopReason = outcome?.result?.stopReason || null;
      cancelRecord.agentStopped = client.agentStoppedEvents
        .filter((e) => e.monoMs >= cancelSentAtMono)
        .map((e) => ({ cause: e.cause, t: e.t }));

      // Local cleanup after prompt settles (or timeout).
      cancelRecord.localKillInitiated = true;
      const exitStart = monotonicMs();
      for (const t of liveTerms) {
        try {
          await t.terminateBounded();
        } catch {
          /* ignore */
        }
      }
      cancelRecord.msCancelSendToTerminalExit = monotonicMs() - cancelSentAtMono;
      cancelRecord.terminalExit = liveTerms.map((t) => ({
        id: t.id,
        exited: t.exited,
        exitCode: t.exitCode,
        signal: t.signal,
      }));
      const allOut = liveTerms.map((t) => t.output).join("");
      cancelRecord.outputContainedShouldNotComplete = allOut.includes("SHOULD_NOT_COMPLETE");
      cancelRecord.remainingLiveTerminalsAfter = client.remainingLiveTerminals();

      client.recordAssertion(
        "P0B-15",
        !!sawActive && createOk && cancelRecord.cancelSentAt != null,
        JSON.stringify({ sawActive, createOk, cancelSent: !!cancelRecord.cancelSentAt }),
      );
      client.recordAssertion(
        "P0B-16",
        !cancelRecord.outputContainedShouldNotComplete &&
          cancelRecord.remainingLiveTerminalsAfter === 0 &&
          cancelRecord.terminalExit.every((t) => t.exited),
        JSON.stringify({
          marker: cancelRecord.outputContainedShouldNotComplete,
          remaining: cancelRecord.remainingLiveTerminalsAfter,
          exits: cancelRecord.terminalExit,
        }),
      );
      const p17 =
        outcome.ok === true &&
        cancelRecord.stopReason === "cancelled" &&
        cancelRecord.msCancelSendToPromptResult != null &&
        cancelRecord.msCancelSendToPromptResult < CANCEL_WAIT_MS &&
        cancelRecord.msCancelSendToTerminalExit != null &&
        cancelRecord.msCancelSendToTerminalExit < CANCEL_WAIT_MS;
      client.recordAssertion(
        "P0B-17",
        p17,
        JSON.stringify({
          stopReason: cancelRecord.stopReason,
          outcomeOk: outcome.ok,
          msPrompt: cancelRecord.msCancelSendToPromptResult,
          msTermExit: cancelRecord.msCancelSendToTerminalExit,
          error: outcome.error || null,
          agentStopped: cancelRecord.agentStopped,
          waitedMs: monotonicMs() - exitStart,
        }),
      );
    } else {
      client.cancelSession(cancelSession.sessionId);
      await Promise.race([cancelPromptPromise, delay(10_000)]);
      cancelRecord.promptOutcome = { ok: false, error: "no_active_tool_observed" };
      client.recordAssertion("P0B-15", false, "no live terminal in cancel session");
      client.recordAssertion("P0B-16", false, "cannot verify without active tool");
      client.recordAssertion("P0B-17", false, "cancel not proven against active tool");
    }
    summary.cancellation = cancelRecord;

    client.recordAssertion(
      "P0B-05",
      client.stdoutJsonRpcOk && client.envelopeViolations.length === 0,
      {
        nonJsonSamples: client.nonJsonStdout.slice(0, 3),
        envelopeViolations: client.envelopeViolations.slice(0, 5),
      },
    );
    client.recordAssertion("P0B-18", true, `envKeys=${envKeys.join(",")}`);

    summary.clientDirectedRequestMethods = [...new Set(client.clientRequests.map((r) => r.method))];
    summary.permissionDecisions = client.permissionDecisions;
    summary.effectiveOutputLimits = client.effectiveOutputLimits;
  } catch (err) {
    summary.protocolErrors.push({
      type: "fatal",
      message: String(err.stack || err),
    });
    client.protocolErrors.push({ type: "fatal", message: String(err.message || err) });
    client.recordAssertion("fatal", false, String(err.message || err));
  } finally {
    const exit = await client.shutdown(false);
    summary.childExit = exit;
    cleanupProven = exit.exited === true && client.remainingLiveTerminals() === 0;
    client.recordAssertion(
      "P0B-20",
      cleanupProven,
      JSON.stringify({
        childExited: exit.exited,
        childExitCode: exit.exitCode,
        childSignal: exit.signal,
        liveTerminals: client.remainingLiveTerminals(),
      }),
    );

    summary.protocolErrors = client.protocolErrors;
    summary.assertionResults = client.assertions;
    summary.endedAt = nowIso();
    summary.durationsMs.total = monotonicMs() - t0;
    summary.authMechanism = client.authInfo.mechanism;

    // Finalize transcript validation + hashes after streams closed
    const framing = validateTranscriptFile(client.transcriptPath);
    summary.jsonRpcFraming = framing;
    if (!framing.ok) {
      client.recordAssertion("P0B-05", false, framing.violations.slice(0, 5));
      // refresh assertion list
      summary.assertionResults = client.assertions;
    }

    for (const name of ["capabilities.json", "transcript.jsonl", "stderr.log"]) {
      const p = path.join(args.outdir, name);
      if (existsSync(p)) summary.artifactDigests[name] = sha256File(p);
    }

    summary.summaryPayloadSha256 = computeSummaryPayloadSha256(summary);
    writeFileSync(path.join(args.outdir, "summary.json"), JSON.stringify(summary, null, 2) + "\n");

    // Post-write validation
    JSON.parse(readFileSync(path.join(args.outdir, "capabilities.json"), "utf8"));
    JSON.parse(readFileSync(path.join(args.outdir, "summary.json"), "utf8"));
    const secretScan = scanArtifactsForSecrets(args.outdir);
    // Re-write summary with secret scan (payload hash excludes this if we recompute)
    summary.secretScan = secretScan;
    summary.summaryPayloadSha256 = computeSummaryPayloadSha256(summary);
    writeFileSync(path.join(args.outdir, "summary.json"), JSON.stringify(summary, null, 2) + "\n");

    // Verify non-summary digests still match
    for (const name of ["capabilities.json", "transcript.jsonl", "stderr.log"]) {
      const actual = sha256File(path.join(args.outdir, name));
      if (summary.artifactDigests[name] !== actual) {
        client.recordAssertion("P0B-19", false, `digest mismatch ${name}`);
        summary.assertionResults = client.assertions;
      }
    }
    client.recordAssertion(
      "P0B-19",
      secretScan.ok &&
        existsSync(path.join(args.outdir, "summary.json")) &&
        existsSync(path.join(args.outdir, "capabilities.json")),
      JSON.stringify(secretScan),
    );
    summary.assertionResults = client.assertions;

    // Final rewrite with P0B-19 included in payload hash
    summary.summaryPayloadSha256 = computeSummaryPayloadSha256(summary);
    writeFileSync(path.join(args.outdir, "summary.json"), JSON.stringify(summary, null, 2) + "\n");

    const failed = client.assertions.some((a) => !a.ok) || !cleanupProven;
    process.exitCode = failed ? 1 : 0;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
