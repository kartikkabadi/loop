#!/usr/bin/env node
/**
 * Loop Phase 0C — session recovery, structured review, security spike (Node built-ins only).
 *
 * Topology (runs inside ASCII Box):
 *   node phase0c.mjs  ↔  stdio JSON-RPC  ↔  local `devin acp`
 *
 * Modes:
 *   --mode continuity          P0C-13 same-session second prompt
 *   --mode restart-load        P0C-14 kill/restart ACP + session/load
 *   --mode after-resume        P0C-15 load after Box stop/resume
 *   --mode structured-review   P0C-16 structured JSON + host validator
 *   --mode exact-head-review   P0C-17 independent reviewer
 *   --mode security-probe      P0C-18 sentinel env isolation
 *   --mode cancel-continue     steer fallback: cancel + same-session prompt
 *   --mode builder-suite       continuity → restart-load → structured → security → cancel-continue
 *
 * Writes under --outdir: capabilities.json, transcript.jsonl, stderr.log, summary.json,
 * and mode-specific artifacts (review-result.json, validator-report.json, …).
 */

import { spawn, execFileSync } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import {
  createWriteStream,
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  realpathSync,
  rmSync,
} from "node:fs";
import path from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const CLIENT_VERSION = "0.1.0-phase0c";
const PROTOCOL_VERSION = 1;
const REQUEST_TIMEOUT_MS = 180_000;
const PROCESS_TIMEOUT_MS = 600_000;
const KILL_GRACE_MS = 3_000;
const MAX_TERMINAL_OUTPUT_BYTES = 256 * 1024;
const VERSION_TIMEOUT_MS = 15_000;

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

const SENTINEL_KEYS = [
  "GITHUB_TOKEN",
  "CLAWSWEEPER_APP_PRIVATE_KEY",
  "ASCII_BOX_API_KEY",
  "CRABBOX_COORDINATOR_TOKEN",
  "CLOUDFLARE_API_TOKEN",
  "OPENAI_API_KEY",
];

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
function digest16(s) {
  return sha256Text(s).slice(0, 16);
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

function validateJsonRpcEnvelope(msg) {
  if (!msg || typeof msg !== "object" || Array.isArray(msg)) {
    return { ok: false, reason: "not_object" };
  }
  if (msg.jsonrpc !== "2.0") return { ok: false, reason: "bad_jsonrpc" };
  const hasId = Object.prototype.hasOwnProperty.call(msg, "id");
  const hasMethod = typeof msg.method === "string" && msg.method.length > 0;
  const hasResult = Object.prototype.hasOwnProperty.call(msg, "result");
  const hasError = Object.prototype.hasOwnProperty.call(msg, "error");
  if (hasMethod && hasId && !hasResult && !hasError) return { ok: true, kind: "request" };
  if (hasMethod && !hasId && !hasResult && !hasError) return { ok: true, kind: "notification" };
  if (hasId && !hasMethod && hasResult !== hasError) {
    if (hasResult && hasError) return { ok: false, reason: "result_and_error" };
    return { ok: true, kind: "response" };
  }
  if (hasId && !hasMethod && hasResult && hasError)
    return { ok: false, reason: "result_and_error" };
  return { ok: false, reason: "unknown_shape" };
}

function assertInsideJail(jailRoot, candidate) {
  if (candidate == null || candidate === "") throw new Error("empty path");
  const rootReal = realpathSync(jailRoot);
  const abs = path.isAbsolute(candidate)
    ? path.resolve(candidate)
    : path.resolve(rootReal, candidate);
  let real;
  if (existsSync(abs)) real = realpathSync(abs);
  else {
    let cur = abs;
    const missing = [];
    while (!existsSync(cur)) {
      missing.unshift(path.basename(cur));
      const parent = path.dirname(cur);
      if (parent === cur) break;
      cur = parent;
    }
    real = path.join(realpathSync(cur), ...missing);
  }
  const prefix = rootReal.endsWith(path.sep) ? rootReal : rootReal + path.sep;
  if (real !== rootReal && !real.startsWith(prefix)) {
    throw new Error(`path escapes canary jail: ${candidate}`);
  }
  return real;
}

function clampOutputByteLimit(requested) {
  if (requested == null || requested === "") {
    return { effective: MAX_TERMINAL_OUTPUT_BYTES, source: "host_default", requested: null };
  }
  const n = Number(requested);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n <= 0) {
    return { effective: MAX_TERMINAL_OUTPUT_BYTES, source: "invalid_fallback_host", requested };
  }
  if (n > MAX_TERMINAL_OUTPUT_BYTES) {
    return {
      effective: MAX_TERMINAL_OUTPUT_BYTES,
      source: "clamped_to_host_max",
      requested: n,
    };
  }
  return { effective: n, source: "agent_requested", requested: n };
}

function extractTerminalCommand(toolCall) {
  const raw = toolCall?.rawInput ?? toolCall?.input ?? null;
  const out = { command: null, args: [], pathHint: null, shape: "none", rawKeys: [] };
  if (!raw || typeof raw !== "object") return out;
  out.rawKeys = Object.keys(raw).sort();
  out.pathHint = raw.path || raw.file || null;
  if (Array.isArray(raw.command) && raw.command.length) {
    out.command = String(raw.command[0]);
    out.args = raw.command.slice(1).map(String);
    out.shape = "command_argv";
    return out;
  }
  const argsFrom =
    (Array.isArray(raw.args) && raw.args.map(String)) ||
    (Array.isArray(raw.arguments) && raw.arguments.map(String)) ||
    null;
  const exe =
    (typeof raw.command === "string" && raw.command) ||
    (typeof raw.cmd === "string" && raw.cmd) ||
    null;
  if (exe && argsFrom) {
    out.command = exe;
    out.args = argsFrom;
    out.shape = "command_plus_args";
    return out;
  }
  if (exe) {
    const trimmed = exe.trim();
    if (!/\s/.test(trimmed)) {
      out.command = trimmed;
      out.args = [];
      out.shape = "bare_command";
      return out;
    }
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
    // Simple argv shell-line without sh -lc, e.g. "node --test test/math.test.js"
    // or "git -C <cwd> diff --stat <base> <head>"
    const parts = trimmed.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
    if (parts.length) {
      out.command = parts[0].replace(/^['"]|['"]$/g, "");
      out.args = parts.slice(1).map((p) => p.replace(/^['"]|['"]$/g, ""));
      out.shape = "split_shell_line";
      return out;
    }
  }
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
    } else base[k] = v;
  }
  return base;
}

function findAllowOption(options) {
  return (
    options.find((o) => o.kind === "allow_once" || o.optionId === "allow-once") ||
    options.find((o) => o.kind === "allow_always") ||
    options.find((o) => String(o.kind || "").startsWith("allow")) ||
    null
  );
}
function findRejectOption(options) {
  return (
    options.find((o) => String(o.kind || "").startsWith("reject")) ||
    options.find((o) => /reject|deny|cancel/i.test(String(o.optionId || ""))) ||
    null
  );
}

function isAllowlistedTerminal(command, args, mode) {
  const c = String(command || "");
  const a = Array.isArray(args) ? args.map(String) : [];
  const eq = (x, y) =>
    x.command === y.command &&
    x.args.length === y.args.length &&
    x.args.every((v, i) => v === y.args[i]);
  const n = { command: c, args: a };
  if (mode === "cancel" || mode === "any") {
    if (
      eq(n, { command: "sh", args: ["-lc", "sleep 30; printf SHOULD_NOT_COMPLETE"] }) ||
      eq(n, { command: "bash", args: ["-lc", "sleep 30; printf SHOULD_NOT_COMPLETE"] })
    ) {
      return true;
    }
  }
  if (mode === "basic" || mode === "any" || mode === "review") {
    const basic = [
      { command: "pwd", args: [] },
      { command: "node", args: ["--test", "test/math.test.js"] },
      { command: "node", args: ["--test"] },
      { command: "sh", args: ["-lc", "pwd"] },
      { command: "sh", args: ["-lc", "node --test"] },
      { command: "sh", args: ["-lc", "node --test test/math.test.js"] },
      { command: "cat", args: ["src/math.js"] },
      { command: "cat", args: ["test/math.test.js"] },
      { command: "git", args: ["diff", "--stat"] },
      { command: "git", args: ["status", "--short"] },
      { command: "git", args: ["rev-parse", "HEAD"] },
      { command: "git", args: ["log", "--oneline", "-5"] },
      { command: "ls", args: ["-la"] },
      { command: "ls", args: ["-la", "."] },
    ];
    if (basic.some((b) => eq(n, b))) return true;
    // Allow git diff base..head when both are 40-hex
    if (c === "git" && a[0] === "diff" && a.length >= 2) {
      const range = a[1];
      if (/^[0-9a-f]{40}\.\.[0-9a-f]{40}$/.test(range)) return true;
      // git diff --stat <base> <head>
      if (
        a[1] === "--stat" &&
        a.length === 4 &&
        /^[0-9a-f]{40}$/.test(a[2]) &&
        /^[0-9a-f]{40}$/.test(a[3])
      ) {
        return true;
      }
      if (a.length === 3 && /^[0-9a-f]{40}$/.test(a[1]) && /^[0-9a-f]{40}$/.test(a[2])) {
        return true;
      }
    }
    // git -C <jail> …
    if (c === "git" && a[0] === "-C" && a.length >= 3) {
      const rest = a.slice(2);
      return isAllowlistedTerminal("git", rest, mode);
    }
    // ls -la <jail-or-relative>
    if (c === "ls" && a[0] === "-la" && a.length <= 2) return true;
  }
  return false;
}

function normalizeTerminalInvocation(command, args) {
  const rawArgs = Array.isArray(args) ? args : [];
  if (typeof command === "string" && rawArgs.length === 0 && /\s/.test(command)) {
    const extracted = extractTerminalCommand({ rawInput: { command } });
    if (extracted.command) {
      return { command: extracted.command, args: extracted.args, shape: extracted.shape };
    }
  }
  return { command: String(command || ""), args: rawArgs.map(String), shape: "passthrough" };
}

function readProcEnvironKeys(pid) {
  try {
    const raw = readFileSync(`/proc/${pid}/environ`);
    const keys = raw
      .toString("utf8")
      .split("\0")
      .filter(Boolean)
      .map((e) => e.split("=")[0])
      .sort();
    return { ok: true, keys };
  } catch (err) {
    return { ok: false, error: String(err.message || err), keys: [] };
  }
}

function scanArtifactsForSecrets(outdir, extraForbidden = []) {
  const findings = [];
  const patterns = [
    /-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----/,
    /\bBearer\s+[A-Za-z0-9._\-]{20,}/,
    /\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}/,
    /\bsk-[A-Za-z0-9]{20,}/,
    /\bbox_[A-Za-z0-9_\-]{20,}/,
  ];
  for (const name of [
    "transcript.jsonl",
    "stderr.log",
    "summary.json",
    "review-result.json",
    "capabilities.json",
  ]) {
    const p = path.join(outdir, name);
    if (!existsSync(p)) continue;
    const text = readFileSync(p, "utf8");
    for (const key of [...FORBIDDEN_ENV_EXACT, ...extraForbidden]) {
      if (text.includes(`${key}=`) || text.includes(`"${key}"`)) {
        // key name alone in envKeyNames lists is OK; look for value assignment patterns
        if (new RegExp(`${key}\\s*[=:]\\s*[^\\s"]{4,}`).test(text)) {
          findings.push({ file: name, kind: "env_assignment", key });
        }
      }
    }
    for (const re of patterns) {
      if (re.test(text)) findings.push({ file: name, kind: "pattern", pattern: String(re) });
    }
  }
  return { ok: findings.length === 0, findings };
}

function computeSummaryPayloadSha256(summary) {
  const clone = structuredClone(summary);
  delete clone.summaryPayloadSha256;
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

function extractJsonObject(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
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
    this.byteLimit = byteLimit;
    this.pid = child.pid;
    this.waiters = [];
    child.stdout?.on("data", (buf) => this.#append(buf.toString("utf8")));
    child.stderr?.on("data", (buf) => this.#append(buf.toString("utf8")));
    child.on("exit", (code, signal) => {
      this.exited = true;
      this.exitCode = code;
      this.signal = signal;
      for (const w of this.waiters.splice(0)) w({ exitCode: code, signal });
    });
  }
  #append(s) {
    if (this.truncated) return;
    const next = this.output + s;
    if (Buffer.byteLength(next) > this.byteLimit) {
      this.output = next.slice(0, this.byteLimit);
      this.truncated = true;
    } else this.output = next;
  }
  waitForExit() {
    if (this.exited) return Promise.resolve({ exitCode: this.exitCode, signal: this.signal });
    return new Promise((resolve) => this.waiters.push(resolve));
  }
  kill(sig = "SIGTERM") {
    if (this.exited) return;
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
    if (this.exited) return;
    this.kill("SIGTERM");
    await Promise.race([this.waitForExit(), delay(KILL_GRACE_MS)]);
    if (!this.exited) {
      this.kill("SIGKILL");
      await Promise.race([this.waitForExit(), delay(KILL_GRACE_MS)]);
    }
  }
}

class AcpClient {
  constructor({ outdir, cwd, devinBin, childEnv, terminalMode = "basic" }) {
    this.outdir = outdir;
    this.cwd = realpathSync(cwd);
    this.devinBin = devinBin;
    this.childEnv = childEnv;
    this.terminalMode = terminalMode;
    this.child = null;
    this.childExited = false;
    this.childExitCode = null;
    this.childSignal = null;
    this.childPid = null;
    this.nextId = 1;
    this.pending = new Map();
    this.buffer = "";
    this.transcriptPath = path.join(outdir, "transcript.jsonl");
    this.stderrPath = path.join(outdir, "stderr.log");
    this.stderrStream = createWriteStream(this.stderrPath, { flags: "a" });
    this.stderrClosed = new Promise((r) => this.stderrStream.on("close", r));
    this.updates = [];
    this.clientRequests = [];
    this.permissionDecisions = [];
    this.terminals = new Map();
    this.terminalHistory = [];
    this.toolCallCache = new Map();
    this.activeSessionId = null;
    this.envelopeViolations = [];
    this.stdoutJsonRpcOk = true;
    this.protocolErrors = [];
    this.effectiveOutputLimits = [];
    this.agentStoppedEvents = [];
    /** Resolves when a cancel-mode terminal is created (for fast cancel). */
    this.activeTerminalWaiter = null;
    /** Sync hook invoked after terminal/create response is written. */
    this.syncCancelOnCreate = null;
    /** When set, defer answering wait_for_exit until this promise settles. */
    this.cancelGate = null;
  }

  writeTranscript(obj) {
    writeFileSync(this.transcriptPath, JSON.stringify(obj) + "\n", { flag: "a" });
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

  #safeStdinWrite(obj) {
    if (
      !this.child ||
      this.childExited ||
      !this.child.stdin ||
      this.child.stdin.destroyed ||
      this.child.stdin.writableEnded
    ) {
      this.protocolErrors.push({ type: "stdin_closed", message: String(obj?.method || obj?.id) });
      return false;
    }
    try {
      this.child.stdin.write(JSON.stringify(obj) + "\n");
      return true;
    } catch (err) {
      this.protocolErrors.push({ type: "stdin_write", message: String(err.message || err) });
      return false;
    }
  }

  async start() {
    this.child = spawn(this.devinBin, ["acp"], {
      cwd: this.cwd,
      env: this.childEnv,
      stdio: ["pipe", "pipe", "pipe"],
      detached: true,
    });
    this.childPid = this.child.pid;
    this.child.stderr.on("data", (buf) => this.stderrStream.write(buf));
    this.child.stdout.setEncoding("utf8");
    this.child.stdout.on("data", (chunk) => this.#onStdout(chunk));
    this.child.stdin.on("error", (err) => {
      this.protocolErrors.push({ type: "stdin_error", message: String(err.message || err) });
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
      } catch {
        this.stdoutJsonRpcOk = false;
        this.protocolErrors.push({ type: "non_json_stdout", sample: line.slice(0, 120) });
        continue;
      }
      const env = validateJsonRpcEnvelope(msg);
      if (!env.ok) {
        this.stdoutJsonRpcOk = false;
        this.envelopeViolations.push({ reason: env.reason, sample: line.slice(0, 160) });
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
            Object.assign(new Error(msg.error?.message || "rpc error"), { rpc: msg.error }),
          );
        } else pending.resolve(msg.result);
      }
      return;
    }
    if (msg.method && hasId) {
      void this.#handleClientRequest(msg);
      return;
    }
    if (msg.method === "session/update") {
      const update = msg.params?.update || {};
      const sid = msg.params?.sessionId || null;
      const toolCallId = update.toolCallId || null;
      if (
        toolCallId &&
        (update.sessionUpdate === "tool_call" || update.sessionUpdate === "tool_call_update")
      ) {
        this.toolCallCache.set(
          toolCallId,
          mergeToolCall(this.toolCallCache.get(toolCallId), update),
        );
      }
      this.updates.push({
        t: nowIso(),
        sessionUpdate: update.sessionUpdate || null,
        toolCallId,
        kind: update.kind || null,
        title: update.title || null,
        sessionIdDigest: sid ? digest16(sid) : null,
        text:
          update.content?.text ||
          update.content?.content?.text ||
          (typeof update.content === "string" ? update.content : null),
      });
    } else if (msg.method === "_cognition.ai/agent_stopped") {
      this.agentStoppedEvents.push({
        t: nowIso(),
        cause: msg.params?.cause || null,
      });
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
        reject(new Error(`stdin closed before ${method}`));
      }
    });
  }

  notify(method, params) {
    const msg = { jsonrpc: "2.0", method, params };
    this.writeTranscript({ dir: "out", t: nowIso(), msg: this.#sanitizeMsg(msg) });
    this.#safeStdinWrite(msg);
  }

  async #handleClientRequest(msg) {
    const { id, method, params } = msg;
    this.clientRequests.push({ t: nowIso(), method, monoMs: monotonicMs() });
    try {
      let result;
      switch (method) {
        case "session/request_permission":
          result = this.#handlePermission(params);
          break;
        case "fs/read_text_file": {
          const p = assertInsideJail(this.cwd, params.path);
          const text = readFileSync(p, "utf8");
          const lines = text.split(/\r?\n/);
          result = {
            content:
              typeof params.limit === "number" ? lines.slice(0, params.limit).join("\n") : text,
          };
          break;
        }
        case "fs/write_text_file":
          throw Object.assign(new Error("write not advertised"), { code: -32601 });
        case "terminal/create":
          result = this.#handleTerminalCreate(params);
          break;
        case "terminal/output": {
          const t =
            this.terminals.get(params.terminalId) ||
            this.terminalHistory.find((x) => x.id === params.terminalId);
          if (!t) throw new Error("unknown terminal");
          result = { output: t.output, truncated: t.truncated };
          if (t.exited) result.exitStatus = { exitCode: t.exitCode, signal: t.signal };
          break;
        }
        case "terminal/wait_for_exit": {
          const t = this.terminals.get(params.terminalId);
          if (!t) throw new Error("unknown terminal");
          // If a cancel gate is active, wait for the prompt cancel path to settle
          // before answering — answering wait_for_exit immediately after a local
          // SIGTERM during cancel crashes Devin ACP ("receiver dropped").
          if (this.cancelGate) {
            try {
              await this.cancelGate;
            } catch {
              /* ignore */
            }
          }
          const st = await t.waitForExit();
          result = { exitCode: st.exitCode, signal: st.signal };
          break;
        }
        case "terminal/kill": {
          const t = this.terminals.get(params.terminalId);
          if (!t) throw new Error("unknown terminal");
          await t.terminateBounded();
          result = {};
          break;
        }
        case "terminal/release": {
          const t = this.terminals.get(params.terminalId);
          if (!t) {
            result = {};
            break;
          }
          if (!t.exited) await t.terminateBounded();
          this.terminalHistory.push({
            id: t.id,
            output: t.output,
            exitCode: t.exitCode,
            signal: t.signal,
            exited: t.exited,
            pid: t.pid,
          });
          this.terminals.delete(params.terminalId);
          result = {};
          break;
        }
        default:
          throw Object.assign(new Error(`Method not found: ${method}`), { code: -32601 });
      }
      const resp = { jsonrpc: "2.0", id, result };
      this.writeTranscript({ dir: "out", t: nowIso(), msg: this.#sanitizeMsg(resp) });
      this.#safeStdinWrite(resp);
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

  #handlePermission(params) {
    const options = Array.isArray(params?.options) ? params.options : [];
    const incoming = params?.toolCall || {};
    const toolCallId = incoming.toolCallId || null;
    const toolCall = mergeToolCall(
      toolCallId ? this.toolCallCache.get(toolCallId) : null,
      incoming,
    );
    if (toolCallId) this.toolCallCache.set(toolCallId, toolCall);
    const extracted = extractTerminalCommand(toolCall);
    const reject = (reason) => {
      const rejectOpt = findRejectOption(options);
      this.permissionDecisions.push({
        t: nowIso(),
        decision: "reject",
        reason,
        matchedRule: null,
        mode: this.terminalMode,
        extractShape: extracted.shape,
      });
      if (rejectOpt) return { outcome: { outcome: "selected", optionId: rejectOpt.optionId } };
      return { outcome: { outcome: "cancelled" } };
    };
    if (!params || !options.length) return reject("incomplete_permission_request");
    if (params.sessionId && this.activeSessionId && params.sessionId !== this.activeSessionId) {
      return reject("session_mismatch");
    }
    const kind = String(toolCall.kind || "");
    const title = String(toolCall.title || "");
    if (/write|edit|delete|network|fetch|install/i.test(kind) || /write|edit|delete/i.test(title)) {
      return reject("disallowed_tool_kind");
    }
    if (
      extracted.command &&
      isAllowlistedTerminal(extracted.command, extracted.args, this.terminalMode)
    ) {
      const allowOpt = findAllowOption(options);
      if (!allowOpt) return reject("no_allow_option_present");
      this.permissionDecisions.push({
        t: nowIso(),
        decision: "allow",
        reason: "allowlist_command_match",
        matchedRule: `${extracted.command} ${extracted.args.join(" ")}`.trim(),
        mode: this.terminalMode,
        extractShape: extracted.shape,
        command: extracted.command,
        args: extracted.args,
      });
      return { outcome: { outcome: "selected", optionId: allowOpt.optionId } };
    }
    if (extracted.pathHint) {
      try {
        assertInsideJail(this.cwd, extracted.pathHint);
        const allowOpt = findAllowOption(options);
        if (!allowOpt) return reject("no_allow_option_present");
        if (this.terminalMode === "review" || this.terminalMode === "basic") {
          this.permissionDecisions.push({
            t: nowIso(),
            decision: "allow",
            reason: "allowlist_jailed_read",
            matchedRule: "jailed_read",
            mode: this.terminalMode,
          });
          return { outcome: { outcome: "selected", optionId: allowOpt.optionId } };
        }
      } catch {
        return reject("path_outside_jail");
      }
    }
    return reject(extracted.command ? "no_allowlist_match" : "missing_structured_command");
  }

  #handleTerminalCreate(params) {
    const cwd = params.cwd ? assertInsideJail(this.cwd, params.cwd) : this.cwd;
    const normalized = normalizeTerminalInvocation(params.command, params.args);
    if (!isAllowlistedTerminal(normalized.command, normalized.args, this.terminalMode)) {
      throw new Error(
        `terminal command denied: ${params.command} (normalized=${normalized.command} ${normalized.args.join(" ")})`,
      );
    }
    const clamp = clampOutputByteLimit(params.outputByteLimit);
    this.effectiveOutputLimits.push(clamp);
    const id = `term_${randomBytes(4).toString("hex")}`;
    const child = spawn(normalized.command, normalized.args, {
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
    handle.command = normalized.command;
    handle.args = normalized.args;
    this.terminals.set(id, handle);
    if (this.terminalMode === "cancel" && typeof this.activeTerminalWaiter === "function") {
      const waiter = this.activeTerminalWaiter;
      this.activeTerminalWaiter = null;
      waiter({
        t: nowIso(),
        monoMs: monotonicMs(),
        kind: "terminal_create_live",
        terminalId: id,
        pid: child.pid,
        command: normalized.command,
        args: normalized.args,
      });
    }
    return { terminalId: id };
  }

  async initialize() {
    const result = await this.request("initialize", {
      protocolVersion: PROTOCOL_VERSION,
      clientCapabilities: {
        fs: { readTextFile: true, writeTextFile: false },
        terminal: true,
      },
      clientInfo: {
        name: "loop-phase0c-spike",
        title: "Loop Phase 0C ACP Spike",
        version: CLIENT_VERSION,
      },
    });
    writeFileSync(
      path.join(this.outdir, "capabilities.json"),
      JSON.stringify(result, null, 2) + "\n",
    );
    return result;
  }

  async newSession() {
    const result = await this.request("session/new", { cwd: this.cwd, mcpServers: [] });
    this.activeSessionId = result.sessionId;
    return {
      sessionId: result.sessionId,
      digest: sha256Text(result.sessionId),
      redacted: digest16(result.sessionId),
    };
  }

  async loadSession(sessionId) {
    // ACP v1: session/load { sessionId, cwd, mcpServers }
    const result = await this.request("session/load", {
      sessionId,
      cwd: this.cwd,
      mcpServers: [],
    });
    this.activeSessionId = sessionId;
    return result;
  }

  prompt(sessionId, text, timeoutMs = REQUEST_TIMEOUT_MS) {
    this.activeSessionId = sessionId;
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

  collectAgentText(sinceIndex = 0) {
    return this.updates
      .slice(sinceIndex)
      .filter((u) => u.sessionUpdate === "agent_message_chunk" || !u.sessionUpdate)
      .map((u) => u.text || "")
      .filter(Boolean)
      .join("");
  }

  collectAgentMessageText(sinceIndex = 0) {
    return this.updates
      .slice(sinceIndex)
      .filter((u) => u.sessionUpdate === "agent_message_chunk")
      .map((u) => u.text || "")
      .filter(Boolean)
      .join("");
  }

  remainingLiveTerminals() {
    return [...this.terminals.values()].filter((t) => !t.exited).length;
  }

  async shutdown(force = false) {
    if (this.processTimer) clearTimeout(this.processTimer);
    for (const t of this.terminals.values()) {
      try {
        await t.terminateBounded();
      } catch {
        /* ignore */
      }
    }
    if (this.child && !this.childExited) {
      try {
        process.kill(-this.child.pid, "SIGTERM");
      } catch {
        try {
          this.child.kill("SIGTERM");
        } catch {
          /* ignore */
        }
      }
      await Promise.race([new Promise((r) => this.child.once("exit", r)), delay(KILL_GRACE_MS)]);
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
        await Promise.race([new Promise((r) => this.child.once("exit", r)), delay(KILL_GRACE_MS)]);
      }
    }
    try {
      this.stderrStream.end();
    } catch {
      /* ignore */
    }
    await Promise.race([this.stderrClosed, delay(1000)]);
    return {
      exited: this.childExited,
      exitCode: this.childExitCode,
      signal: this.childSignal,
      pid: this.childPid,
      force,
    };
  }
}

async function runDevinVersion(devinBin, env) {
  return await new Promise((resolve, reject) => {
    const child = spawn(devinBin, ["version"], { env, stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    let err = "";
    const timer = setTimeout(() => {
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
      }, 1000);
      reject(new Error("devin version timeout"));
    }, VERSION_TIMEOUT_MS);
    child.stdout.on("data", (b) => (out += b));
    child.stderr.on("data", (b) => (err += b));
    child.on("error", reject);
    child.on("exit", (code) => {
      clearTimeout(timer);
      const text = (out || err).trim();
      if (code !== 0 || !text) reject(new Error(`devin version failed: ${code} ${text}`));
      else resolve(text.split("\n")[0]);
    });
  });
}

function parseArgs(argv) {
  const out = {
    mode: "builder-suite",
    outdir: null,
    cwd: null,
    devinBin: "devin",
    sessionId: null,
    nonce: null,
    baseSha: null,
    headSha: null,
    taskId: "phase0c-task",
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--mode") out.mode = argv[++i];
    else if (a === "--outdir") out.outdir = argv[++i];
    else if (a === "--cwd") out.cwd = argv[++i];
    else if (a === "--devin-bin") out.devinBin = argv[++i];
    else if (a === "--session-id") out.sessionId = argv[++i];
    else if (a === "--nonce") out.nonce = argv[++i];
    else if (a === "--base-sha") out.baseSha = argv[++i];
    else if (a === "--head-sha") out.headSha = argv[++i];
    else if (a === "--task-id") out.taskId = argv[++i];
    else {
      console.error("Unknown arg", a);
      process.exit(2);
    }
  }
  if (!out.outdir || !out.cwd) {
    console.error(
      "Usage: node phase0c.mjs --mode <mode> --outdir <dir> --cwd <jail> [--session-id ...] [--nonce ...] [--base-sha ...] [--head-sha ...]",
    );
    process.exit(2);
  }
  return out;
}

function recordRow(rows, id, status, detail) {
  rows.push({ id, status, detail, t: nowIso() });
}

async function withClient(args, terminalMode, fn) {
  const childEnv = buildChildEnv(process.env);
  const client = new AcpClient({
    outdir: args.outdir,
    cwd: args.cwd,
    devinBin: args.devinBin,
    childEnv,
    terminalMode,
  });
  const ctx = {
    client,
    childEnv,
    envKeys: Object.keys(childEnv).sort(),
    rows: [],
  };
  try {
    await client.start();
    const init = await client.initialize();
    ctx.init = init;
    return await fn(ctx);
  } finally {
    await client.shutdown(false);
  }
}

async function modeContinuity(args, state) {
  return withClient(args, "basic", async ({ client, rows, init, envKeys }) => {
    const nonce = args.nonce || randomBytes(16).toString("hex");
    const nonceHash = sha256Text(nonce);
    const session = await client.newSession();
    const t1 = monotonicMs();
    const r1 = await client.prompt(
      session.sessionId,
      [
        `Remember this exact nonce for later turns: ${nonce}`,
        "Reply with exactly LOOP_P0C13_ACK and do not use any tools.",
      ].join(" "),
      120_000,
    );
    const text1 = client.collectAgentText();
    const d1 = monotonicMs() - t1;
    const ok1 =
      r1?.stopReason === "end_turn" &&
      text1.includes("LOOP_P0C13_ACK") &&
      client.clientRequests.length === 0;

    const before = client.updates.length;
    const t2 = monotonicMs();
    const r2 = await client.prompt(
      session.sessionId,
      [
        "Do not use any tools.",
        "Return the exact nonce I asked you to remember earlier.",
        "Reply with exactly: LOOP_P0C13_NONCE=<nonce>",
      ].join(" "),
      120_000,
    );
    const text2 = client.collectAgentText(before);
    const d2 = monotonicMs() - t2;
    const ok2 =
      r2?.stopReason === "end_turn" &&
      text2.includes(`LOOP_P0C13_NONCE=${nonce}`) &&
      client.clientRequests.length === 0;

    recordRow(
      rows,
      "P0C-13",
      ok1 && ok2 ? "PASS" : "FAIL",
      JSON.stringify({
        ok1,
        ok2,
        d1,
        d2,
        stop1: r1?.stopReason,
        stop2: r2?.stopReason,
        sessionDigest: session.digest,
        nonceHash,
        toolRequests: client.clientRequests.map((r) => r.method),
      }),
    );

    state.sessionId = session.sessionId;
    state.sessionDigest = session.digest;
    state.nonce = nonce;
    state.nonceHash = nonceHash;
    state.capabilities = init;
    state.envKeys = envKeys;
    state.continuity = { ok1, ok2, d1, d2, rows };
    return { rows, session, nonce, nonceHash, init, envKeys };
  });
}

async function modeRestartLoad(args, state) {
  const sessionId = args.sessionId || state.sessionId;
  const nonce = args.nonce || state.nonce;
  if (!sessionId || !nonce) throw new Error("restart-load requires --session-id and --nonce");

  // First ensure prior process is gone is caller's job; this mode starts fresh ACP and loads.
  return withClient(args, "basic", async ({ client, rows, init }) => {
    const pid = client.childPid;
    let loadOk = false;
    let loadError = null;
    let loadResult = null;
    const tLoad = monotonicMs();
    try {
      loadResult = await client.loadSession(sessionId);
      loadOk = true;
    } catch (err) {
      loadError = String(err.message || err);
      recordRow(rows, "P0C-14", "FAIL", JSON.stringify({ loadOk: false, loadError, pid }));
      state.restartLoad = {
        loadOk: false,
        loadError,
        pid,
        advertisedLoadSession: !!init?.agentCapabilities?.loadSession,
      };
      return { rows, loadOk: false, loadError, init };
    }
    const loadMs = monotonicMs() - tLoad;
    const before = client.updates.length;
    const tPrompt = monotonicMs();
    const result = await client.prompt(
      sessionId,
      [
        "Do not use any tools.",
        "From the loaded session memory only, return the exact nonce.",
        "Do not invent a new nonce.",
        "Reply with exactly: LOOP_P0C14_NONCE=<nonce>",
      ].join(" "),
      120_000,
    );
    const text = client.collectAgentText(before);
    const promptMs = monotonicMs() - tPrompt;
    const ok =
      loadOk && result?.stopReason === "end_turn" && text.includes(`LOOP_P0C14_NONCE=${nonce}`);
    recordRow(
      rows,
      "P0C-14",
      ok ? "PASS" : "FAIL",
      JSON.stringify({
        loadOk,
        loadMs,
        promptMs,
        stopReason: result?.stopReason,
        noncePresent: text.includes(`LOOP_P0C14_NONCE=${nonce}`),
        pid,
        loadResultType: loadResult === null ? "null" : typeof loadResult,
        advertisedLoadSession: !!init?.agentCapabilities?.loadSession,
      }),
    );
    state.restartLoad = {
      loadOk,
      ok,
      pid,
      loadMs,
      promptMs,
      advertisedLoadSession: !!init?.agentCapabilities?.loadSession,
    };
    state.sessionId = sessionId;
    return { rows, loadOk, ok, init, pid };
  });
}

async function modeAfterResume(args, state) {
  // Same as restart-load but records as P0C-15
  const sessionId = args.sessionId || state.sessionId;
  const nonce = args.nonce || state.nonce;
  if (!sessionId || !nonce) throw new Error("after-resume requires --session-id and --nonce");
  return withClient(args, "basic", async ({ client, rows, init }) => {
    let loadOk = false;
    let loadError = null;
    const tLoad = monotonicMs();
    try {
      await client.loadSession(sessionId);
      loadOk = true;
    } catch (err) {
      loadError = String(err.message || err);
    }
    const loadMs = monotonicMs() - tLoad;
    const before = client.updates.length;
    let result = null;
    let text = "";
    let promptMs = null;
    if (loadOk) {
      const tPrompt = monotonicMs();
      result = await client.prompt(
        sessionId,
        [
          "Do not use any tools.",
          "From the loaded session memory only, return the exact nonce.",
          "Reply with exactly: LOOP_P0C15_NONCE=<nonce>",
        ].join(" "),
        120_000,
      );
      text = client.collectAgentText(before);
      promptMs = monotonicMs() - tPrompt;
    }
    const ok =
      loadOk && result?.stopReason === "end_turn" && text.includes(`LOOP_P0C15_NONCE=${nonce}`);
    recordRow(
      rows,
      "P0C-15",
      ok ? "PASS" : "FAIL",
      JSON.stringify({
        loadOk,
        loadError,
        loadMs,
        promptMs,
        stopReason: result?.stopReason || null,
        noncePresent: text.includes(`LOOP_P0C15_NONCE=${nonce}`),
        fallback:
          "Box recovery unsupported: persist checkpoint outside Box, provision fresh Box, fresh session, rehydrate with bounded host-owned context.",
        advertisedLoadSession: !!init?.agentCapabilities?.loadSession,
      }),
    );
    state.afterResume = { ok, loadOk, loadError, loadMs, promptMs };
    return { rows, ok, loadOk, loadError, init };
  });
}

async function modeStructuredReview(args, state) {
  const baseSha = args.baseSha;
  const headSha = args.headSha;
  if (!baseSha || !headSha) throw new Error("structured-review requires --base-sha and --head-sha");
  return withClient(args, "review", async ({ client, rows, init }) => {
    const session = await client.newSession();
    const prompt = [
      "You are a deterministic code reviewer.",
      `taskId=${args.taskId}`,
      `baseSha=${baseSha}`,
      `headSha=${headSha}`,
      "Inspect the repository at HEAD and run relevant tests if needed.",
      "Return EXACTLY one JSON object as your final message (no markdown fences) matching:",
      JSON.stringify({
        schemaVersion: 1,
        taskId: args.taskId,
        role: "reviewer",
        baseSha,
        headSha,
        outcome: "pass-or-fail",
        summary: "non-empty",
        findings: [
          {
            severity: "P0|P1|P2|P3",
            path: "repo-relative",
            line: 1,
            message: "non-empty",
            evidence: "non-empty",
          },
        ],
      }),
      "Use outcome fail if you find defects.",
      "Do not write files. Put the JSON only in the agent message.",
    ].join("\n");
    const t0 = monotonicMs();
    const before = client.updates.length;
    const result = await client.prompt(session.sessionId, prompt, 300_000);
    const text = client.collectAgentMessageText(before);
    const ms = monotonicMs() - t0;
    const obj = extractJsonObject(text);
    const reviewPath = path.join(args.outdir, "review-result.json");
    let validator = { ok: false, errors: [{ code: "E_NO_JSON", message: "no JSON extracted" }] };
    if (obj) {
      // Force host-expected SHAs into a copy only for validation after checking model values?
      // Spec: model must return exact base/head; validator enforces.
      writeFileSync(reviewPath, JSON.stringify(obj, null, 2) + "\n");
      try {
        const out = execFileSync(
          process.execPath,
          [fileURLToPath(new URL("./validate-result.mjs", import.meta.url)), reviewPath],
          { encoding: "utf8" },
        );
        validator = JSON.parse(out);
      } catch (err) {
        const stdout = err.stdout?.toString?.() || "";
        try {
          validator = JSON.parse(stdout);
        } catch {
          validator = {
            ok: false,
            errors: [{ code: "E_VALIDATOR", message: String(err.message || err) }],
          };
        }
      }
    }
    writeFileSync(
      path.join(args.outdir, "validator-report.json"),
      JSON.stringify(validator, null, 2) + "\n",
    );
    const shaMatch = obj && obj.baseSha === baseSha && obj.headSha === headSha;
    const ok =
      result?.stopReason === "end_turn" && !!obj && validator.ok === true && shaMatch === true;
    recordRow(
      rows,
      "P0C-16",
      ok ? "PASS" : "FAIL",
      JSON.stringify({
        stopReason: result?.stopReason,
        ms,
        extracted: !!obj,
        validatorOk: validator.ok,
        shaMatch,
        reviewHash: existsSync(reviewPath) ? sha256File(reviewPath) : null,
      }),
    );
    state.structured = { ok, obj, validator, ms, sessionDigest: session.digest };
    return { rows, ok, obj, validator, init };
  });
}

async function modeExactHeadReview(args, state) {
  // Same structured review but asserts clean exact head context from env files written by host.
  const status = execFileSync("git", ["status", "--short", "--untracked-files=no"], {
    cwd: args.cwd,
    encoding: "utf8",
  });
  const head = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: args.cwd,
    encoding: "utf8",
  }).trim();
  const base = args.baseSha;
  if (head !== args.headSha) {
    const rows = [];
    recordRow(
      rows,
      "P0C-17",
      "FAIL",
      JSON.stringify({ reason: "head_mismatch", head, expected: args.headSha }),
    );
    state.exactHead = { ok: false, head, status };
    return { rows, ok: false };
  }
  if (status.trim()) {
    const rows = [];
    recordRow(rows, "P0C-17", "FAIL", JSON.stringify({ reason: "dirty_worktree", status }));
    state.exactHead = { ok: false, head, status };
    return { rows, ok: false };
  }
  const structured = await modeStructuredReview(args, state);
  const findings = structured.obj?.findings || [];
  const seededHit = findings.some(
    (f) =>
      typeof f.path === "string" &&
      f.path.includes("math") &&
      typeof f.message === "string" &&
      /add|sum|subtract|incorrect|wrong/i.test(f.message),
  );
  const ok =
    structured.ok &&
    structured.obj?.role === "reviewer" &&
    structured.obj?.baseSha === base &&
    structured.obj?.headSha === args.headSha &&
    seededHit;
  recordRow(
    structured.rows,
    "P0C-17",
    ok ? "PASS" : "FAIL",
    JSON.stringify({
      head,
      clean: !status.trim(),
      seededHit,
      findingCount: findings.length,
      validatorOk: structured.validator?.ok,
      sessionDigest: state.structured?.sessionDigest,
    }),
  );
  state.exactHead = { ok, head, status: status.trim(), seededHit, findings };
  return structured;
}

async function modeSecurityProbe(args, state) {
  return withClient(args, "basic", async ({ client, rows, childEnv, envKeys }) => {
    const parentHasSentinels = SENTINEL_KEYS.filter((k) => process.env[k]);
    const childHas = SENTINEL_KEYS.filter((k) => Object.prototype.hasOwnProperty.call(childEnv, k));
    const proc = client.childPid ? readProcEnvironKeys(client.childPid) : { ok: false, keys: [] };
    const procHas = SENTINEL_KEYS.filter((k) => proc.keys.includes(k));
    // Spawn a trivial allowlisted terminal to inspect child env if possible
    const session = await client.newSession();
    await client.prompt(session.sessionId, "Do not use tools. Reply with LOOP_P0C18_OK.", 60_000);
    const livePid = client.childPid;
    const after = livePid ? readProcEnvironKeys(livePid) : proc;
    const scan = scanArtifactsForSecrets(args.outdir, SENTINEL_KEYS);
    const ok =
      childHas.length === 0 && procHas.length === 0 && scan.ok && parentHasSentinels.length > 0; // prove we injected into parent
    recordRow(
      rows,
      "P0C-18",
      ok ? "PASS" : "FAIL",
      JSON.stringify({
        parentSentinelKeysPresent: parentHasSentinels,
        childEnvForbiddenKeys: childHas,
        procForbiddenKeys: procHas,
        procReadOk: after.ok,
        artifactScanOk: scan.ok,
        findings: scan.findings,
        envKeyNames: envKeys,
      }),
    );
    state.security = { ok, parentHasSentinels, childHas, procHas, scan };
    return { rows, ok };
  });
}

async function modeCancelContinue(args, state) {
  return withClient(args, "cancel", async ({ client, rows }) => {
    const session = await client.newSession();
    let cancelGateResolve;
    client.cancelGate = new Promise((r) => {
      cancelGateResolve = r;
    });

    let saw = null;
    let cancelSentAtMono = null;
    client.syncCancelOnCreate = (info) => {
      saw = info;
      cancelSentAtMono = monotonicMs();
      client.cancelSession(session.sessionId);
    };
    const sawPromise = new Promise((resolve) => {
      client.activeTerminalWaiter = (info) => resolve(info);
    });

    const promptPromise = client
      .prompt(
        session.sessionId,
        [
          "You must use the terminal tool.",
          "Execute exactly this command and no other:",
          "sh -lc 'sleep 30; printf SHOULD_NOT_COMPLETE'",
          "Do not modify the command.",
        ].join(" "),
        180_000,
      )
      .then((r) => ({ ok: true, result: r }))
      .catch((e) => ({ ok: false, error: String(e.message || e) }));

    saw = (await Promise.race([sawPromise, delay(90_000).then(() => null)])) || saw;
    client.activeTerminalWaiter = null;
    client.syncCancelOnCreate = null;

    if (!saw || cancelSentAtMono == null) {
      cancelGateResolve?.();
      client.cancelGate = null;
      await Promise.race([promptPromise, delay(5000)]);
      recordRow(rows, "steer", "FAIL", "no active terminal before cancel");
      state.steer = {
        strategy: "cancel+fresh-session-checkpoint-rehydrate",
        ok: false,
        nativeSteerObserved: false,
        reason: "no_active_terminal",
      };
      return { rows, ok: false };
    }

    // Let ACP cancel settle before answering wait_for_exit / local kill.
    const outcome = await Promise.race([
      promptPromise,
      delay(90_000).then(() => ({ ok: false, error: "timeout" })),
    ]);
    cancelGateResolve?.();
    client.cancelGate = null;

    for (const t of client.terminals.values()) {
      try {
        await t.terminateBounded();
      } catch {
        /* ignore */
      }
    }

    let cont = null;
    let text = "";
    let continueError = null;
    if (outcome.ok && outcome.result?.stopReason === "cancelled" && !client.childExited) {
      try {
        await delay(200);
        const before = client.updates.length;
        cont = await client.prompt(
          session.sessionId,
          "Cancellation complete. Do not use tools. Reply with exactly LOOP_P0C_STEER_OK.",
          120_000,
        );
        text = client.collectAgentText(before);
      } catch (err) {
        continueError = String(err.message || err);
      }
    }

    const sameSessionOk =
      outcome.ok &&
      outcome.result?.stopReason === "cancelled" &&
      cont?.stopReason === "end_turn" &&
      text.includes("LOOP_P0C_STEER_OK");

    let strategy = "cancel+continued-prompt-same-session";
    let ok = sameSessionOk;
    if (!sameSessionOk) {
      // Empirically, same-process continue after cancel may crash ACP.
      // Phase 2 fallback: cancel + fresh session with host checkpoint rehydration.
      strategy = "cancel+fresh-session-checkpoint-rehydrate";
      ok = outcome.ok && outcome.result?.stopReason === "cancelled";
    }

    recordRow(
      rows,
      "steer",
      ok ? "PASS" : "FAIL",
      JSON.stringify({
        strategy,
        sameSessionContinueOk: sameSessionOk,
        cancelStop: outcome.result?.stopReason || outcome.error,
        continueStop: cont?.stopReason || null,
        continueError,
        marker: text.includes("LOOP_P0C_STEER_OK"),
        nativeSteerObserved: false,
      }),
    );
    state.steer = {
      strategy,
      ok,
      sameSessionContinueOk: sameSessionOk,
      nativeSteerObserved: false,
      continueError,
    };
    return { rows, ok };
  });
}

function persistHostState(outdir, state) {
  writeFileSync(
    path.join(outdir, "host-state.json"),
    JSON.stringify(
      {
        sessionId: state.sessionId || null,
        sessionDigest: state.sessionDigest || null,
        nonce: state.nonce || null,
        nonceHash: state.nonceHash || (state.nonce ? sha256Text(state.nonce) : null),
        updatedAt: nowIso(),
      },
      null,
      2,
    ) + "\n",
  );
}

async function modeBuilderSuite(args, state) {
  mkdirSync(args.outdir, { recursive: true });
  writeFileSync(path.join(args.outdir, "transcript.jsonl"), "");
  const allRows = [];

  const c1 = await modeContinuity(args, state);
  allRows.push(...c1.rows);
  persistHostState(args.outdir, state);

  args.sessionId = state.sessionId;
  args.nonce = state.nonce;
  await delay(500);
  const c2 = await modeRestartLoad(args, state);
  allRows.push(...c2.rows);
  persistHostState(args.outdir, state);

  if (args.baseSha && args.headSha) {
    try {
      const c3 = await modeStructuredReview(args, state);
      allRows.push(...c3.rows);
    } catch (err) {
      recordRow(allRows, "P0C-16", "FAIL", String(err.message || err));
    }
  } else {
    recordRow(allRows, "P0C-16", "SKIP", "no base/head provided to builder-suite");
  }

  try {
    const c4 = await modeSecurityProbe(args, state);
    allRows.push(...c4.rows);
  } catch (err) {
    recordRow(allRows, "P0C-18", "FAIL", String(err.message || err));
  }

  try {
    const c5 = await modeCancelContinue(args, state);
    allRows.push(...c5.rows);
  } catch (err) {
    recordRow(allRows, "steer", "FAIL", String(err.message || err));
    state.steer = {
      strategy: "cancel+fresh-session-checkpoint-rehydrate",
      ok: false,
      nativeSteerObserved: false,
      error: String(err.message || err),
    };
  }

  persistHostState(args.outdir, state);
  return { rows: allRows };
}

async function finalize(args, state, rows) {
  const summary = {
    clientVersion: CLIENT_VERSION,
    mode: args.mode,
    nodeVersion: process.version,
    startedAt: state.startedAt,
    endedAt: nowIso(),
    sessionDigest: state.sessionDigest || null,
    nonceHash: state.nonceHash || (state.nonce ? sha256Text(state.nonce) : null),
    capabilitiesAdvertised: state.capabilities?.agentCapabilities || null,
    loadSessionAdvertised: !!state.capabilities?.agentCapabilities?.loadSession,
    rows,
    continuity: state.continuity || null,
    restartLoad: state.restartLoad || null,
    afterResume: state.afterResume || null,
    structured: state.structured
      ? {
          ok: state.structured.ok,
          validatorOk: state.structured.validator?.ok,
          ms: state.structured.ms,
        }
      : null,
    exactHead: state.exactHead
      ? {
          ok: state.exactHead.ok,
          head: state.exactHead.head,
          seededHit: state.exactHead.seededHit,
        }
      : null,
    security: state.security
      ? {
          ok: state.security.ok,
          parentSentinelKeysPresent: state.security.parentHasSentinels,
          childForbidden: state.security.childHas,
          procForbidden: state.security.procHas,
        }
      : null,
    steer: state.steer || null,
    artifactDigests: {},
    summaryPayloadSha256: null,
    summaryDigestScheme:
      "summaryPayloadSha256 = sha256(canonical JSON of summary with summaryPayloadSha256 omitted); NOT sha256 of final summary.json file",
    secretScan: null,
  };

  for (const name of [
    "capabilities.json",
    "transcript.jsonl",
    "stderr.log",
    "review-result.json",
    "validator-report.json",
  ]) {
    const p = path.join(args.outdir, name);
    if (existsSync(p)) summary.artifactDigests[name] = sha256File(p);
  }
  summary.secretScan = scanArtifactsForSecrets(args.outdir, SENTINEL_KEYS);
  summary.summaryPayloadSha256 = computeSummaryPayloadSha256(summary);
  writeFileSync(path.join(args.outdir, "summary.json"), JSON.stringify(summary, null, 2) + "\n");
  // persist state for host orchestration (session id kept only on box / tmp, not docs)
  writeFileSync(
    path.join(args.outdir, "host-state.json"),
    JSON.stringify(
      {
        sessionId: state.sessionId || null,
        sessionDigest: state.sessionDigest || null,
        nonce: state.nonce || null,
        nonceHash: state.nonceHash || null,
      },
      null,
      2,
    ) + "\n",
  );
  const failed = rows.some((r) => r.status === "FAIL");
  process.exitCode = failed ? 1 : 0;
}

async function main() {
  const args = parseArgs(process.argv);
  mkdirSync(args.outdir, { recursive: true });
  if (!existsSync(path.join(args.outdir, "transcript.jsonl"))) {
    writeFileSync(path.join(args.outdir, "transcript.jsonl"), "");
  }
  const state = { startedAt: nowIso() };
  let rows = [];

  try {
    try {
      state.devinVersion = await runDevinVersion(args.devinBin, buildChildEnv(process.env));
    } catch (err) {
      state.devinVersion = null;
      recordRow(rows, "devin-version", "FAIL", String(err.message || err));
    }

    switch (args.mode) {
      case "continuity": {
        const r = await modeContinuity(args, state);
        rows = r.rows;
        break;
      }
      case "restart-load": {
        const r = await modeRestartLoad(args, state);
        rows = r.rows;
        break;
      }
      case "after-resume": {
        const r = await modeAfterResume(args, state);
        rows = r.rows;
        break;
      }
      case "structured-review": {
        const r = await modeStructuredReview(args, state);
        rows = r.rows;
        break;
      }
      case "exact-head-review": {
        const r = await modeExactHeadReview(args, state);
        rows = r.rows;
        break;
      }
      case "security-probe": {
        const r = await modeSecurityProbe(args, state);
        rows = r.rows;
        break;
      }
      case "cancel-continue": {
        const r = await modeCancelContinue(args, state);
        rows = r.rows;
        break;
      }
      case "builder-suite": {
        const r = await modeBuilderSuite(args, state);
        rows = r.rows;
        break;
      }
      default:
        console.error("Unknown mode", args.mode);
        process.exit(2);
    }
  } catch (err) {
    recordRow(rows, "fatal", "FAIL", String(err.message || err));
    console.error(err);
  }

  await finalize(args, state, rows);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
