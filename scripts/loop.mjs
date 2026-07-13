#!/usr/bin/env node

import { execFile as execFileCallback } from "node:child_process";
import { readFile } from "node:fs/promises";
import process from "node:process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFile = promisify(execFileCallback);
const DEFAULT_GATEWAY = "https://loop-gateway.1kartikkabadi1.workers.dev";
let requestId = 0;

function usage(message, exitCode = 2) {
  if (message) console.error(`loop: ${message}`);
  console.error(`usage:
  loop login [--gateway URL] [--token-file FILE]
  loop doctor [--gateway URL] [--token-file FILE]
  loop task create --contract-file FILE [--idempotency-key KEY]
  loop task import-issue --contract-file FILE
  loop task inspect --task-id ID
  loop task validate|approve|dispatch|supersede --task-id ID [--expected-version N]
  loop run list
  loop run inspect --task-id ID
  loop run pause|resume|cancel|repair --task-id ID [--reason TEXT] [--expected-version N]
  loop box list|stop|cleanup [options]
  loop evidence list|open --task-id ID [--object-key KEY]
  loop findings list --task-id ID
  loop review queue
  loop budget|audit

Options:
  --gateway URL       Loop gateway URL (default: LOOP_GATEWAY_URL or ${DEFAULT_GATEWAY})
  --token-file FILE   Read an OAuth access token from a protected local file
  --json              Print machine-readable JSON where supported
  --help              Show this help
`);
  process.exit(exitCode);
}

function parse(argv) {
  const positionals = [];
  const flags = new Map();
  const booleanFlags = new Set(["confirm"]);
  let json = false;
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--help" || token === "-h") usage(undefined, 0);
    if (token === "--json") {
      json = true;
      continue;
    }
    if (token?.startsWith("--")) {
      if (booleanFlags.has(token.slice(2))) {
        flags.set(token.slice(2), "true");
        continue;
      }
      if (index + 1 >= argv.length || argv[index + 1].startsWith("--"))
        usage(`missing value for ${token}`);
      flags.set(token.slice(2), argv[++index]);
      continue;
    }
    positionals.push(token);
  }
  return { positionals, flags, json };
}

function required(flags, name) {
  const value = flags.get(name);
  if (!value) usage(`missing --${name}`);
  return value;
}

function gatewayUrl(flags) {
  const raw = flags.get("gateway") ?? process.env.LOOP_GATEWAY_URL ?? DEFAULT_GATEWAY;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1")
      usage("--gateway must use HTTPS unless it targets localhost");
    return url.toString().replace(/\/$/, "");
  } catch {
    usage("--gateway must be a valid URL");
  }
}

async function accessToken(flags) {
  if (process.env.LOOP_ACCESS_TOKEN) return process.env.LOOP_ACCESS_TOKEN.trim();
  const file = flags.get("token-file");
  if (!file) return undefined;
  const token = (await readFile(file, "utf8")).trim();
  if (!token) usage("--token-file is empty");
  return token;
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const body = await response.json().catch(() => null);
  return { response, body };
}

function print(value, json) {
  if (json) {
    console.log(JSON.stringify(value, null, 2));
    return;
  }
  if (typeof value === "string") {
    console.log(value);
    return;
  }
  console.log(JSON.stringify(value, null, 2));
}

async function mcpCall(baseUrl, token, name, args = {}) {
  const headers = {
    "content-type": "application/json",
    accept: "application/json, text/event-stream",
    "MCP-Protocol-Version": "2025-03-26",
  };
  if (token) headers.authorization = `Bearer ${token}`;
  const initialize = await requestJson(`${baseUrl}/mcp`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: ++requestId,
      method: "initialize",
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "loop-cli", version: "0.1.0" },
      },
    }),
  });
  if (!initialize.response.ok) throwGatewayError(initialize.response, initialize.body);
  const result = await requestJson(`${baseUrl}/mcp`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: ++requestId,
      method: "tools/call",
      params: { name, arguments: args },
    }),
  });
  if (!result.response.ok) throwGatewayError(result.response, result.body);
  if (result.body?.error) throw new Error(result.body.error.message ?? "MCP request failed");
  const content = result.body?.result;
  if (content?.isError)
    throw new Error(
      content.structuredContent?.message ?? content.content?.[0]?.text ?? "tool call failed",
    );
  return content?.structuredContent ?? content;
}

function throwGatewayError(response, body) {
  const message = body?.message ?? body?.error ?? `gateway returned HTTP ${response.status}`;
  if (response.status === 401) {
    throw new Error(
      `${message}; configure an OAuth access token with --token-file or LOOP_ACCESS_TOKEN`,
    );
  }
  throw new Error(message);
}

function writeArgs(flags, taskId, extra = {}) {
  const args = { taskId, ...extra };
  if (flags.has("expected-version"))
    args.expectedVersion = Number(required(flags, "expected-version"));
  args.idempotencyKey =
    flags.get("idempotency-key") ?? `loop-cli:${taskId}:${Object.keys(extra).join(",") || "write"}`;
  return args;
}

async function runBox(args) {
  const result = await execFile(
    process.execPath,
    [fileURLToPath(new URL("./loop-box.mjs", import.meta.url)), ...args],
    {
      cwd: process.cwd(),
      maxBuffer: 8 * 1024 * 1024,
    },
  );
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
}

async function main() {
  const { positionals, flags, json } = parse(process.argv.slice(2));
  const [area, command] = positionals;
  if (!area) usage("a command is required");
  const baseUrl = gatewayUrl(flags);
  const token = await accessToken(flags);

  if (area === "login") {
    const metadata = await requestJson(`${baseUrl}/.well-known/oauth-protected-resource`);
    if (!metadata.response.ok) throwGatewayError(metadata.response, metadata.body);
    print(
      {
        gateway: baseUrl,
        authorizationServers: metadata.body?.authorization_servers ?? [],
        next: "Complete OAuth login with the advertised authorization server, then pass the access token via --token-file or LOOP_ACCESS_TOKEN. Loop never stores tokens.",
      },
      json,
    );
    return;
  }

  if (area === "doctor") {
    const [health, metadata, mcp] = await Promise.all([
      requestJson(`${baseUrl}/healthz`),
      requestJson(`${baseUrl}/.well-known/oauth-protected-resource`),
      requestJson(`${baseUrl}/mcp`),
    ]);
    print(
      {
        gateway: baseUrl,
        health: health.body,
        protectedResource: metadata.body,
        mcp: mcp.body
          ? { protocolVersion: mcp.body.protocolVersion, toolCount: mcp.body.tools?.length }
          : null,
        authenticated: Boolean(token),
      },
      json,
    );
    return;
  }

  if (area === "box") {
    const boxArgs = [command];
    for (const name of ["box-id", "name-prefix"]) {
      if (flags.has(name)) boxArgs.push(`--${name}`, required(flags, name));
    }
    if (flags.has("confirm")) boxArgs.push("--confirm");
    await runBox(boxArgs);
    return;
  }

  if (area === "task" && command === "create") {
    const contractFile = required(flags, "contract-file");
    const contract = JSON.parse(await readFile(contractFile, "utf8"));
    const taskId = contract?.identity?.taskId;
    if (typeof taskId !== "string") usage("contract identity.taskId is required");
    print(
      await mcpCall(baseUrl, token, "loop.tasks.create_draft", {
        contract,
        idempotencyKey:
          flags.get("idempotency-key") ?? `loop-cli:create:${taskId}:${contract.identity.revision}`,
      }),
      json,
    );
    return;
  }

  if (area === "task" && command === "import-issue") {
    const contractFile = required(flags, "contract-file");
    const contract = JSON.parse(await readFile(contractFile, "utf8"));
    const taskId = contract?.identity?.taskId;
    if (typeof taskId !== "string") usage("contract identity.taskId is required");
    print(
      await mcpCall(baseUrl, token, "loop.tasks.create_draft", {
        contract,
        idempotencyKey:
          flags.get("idempotency-key") ??
          `loop-cli:import-issue:${taskId}:${contract.identity.revision}`,
      }),
      json,
    );
    return;
  }

  if (area === "task" && command === "inspect") {
    print(
      await mcpCall(baseUrl, token, "loop.tasks.get", { taskId: required(flags, "task-id") }),
      json,
    );
    return;
  }
  if (area === "task" && ["validate", "approve", "dispatch", "supersede"].includes(command)) {
    const taskId = required(flags, "task-id");
    const tool = {
      validate: "loop.tasks.validate",
      approve: "loop.tasks.approve",
      dispatch: "loop.runs.start",
      supersede: "loop.tasks.approve",
    }[command];
    if (command === "supersede")
      usage("supersede requires a future task contract; use task create with a new revision");
    print(await mcpCall(baseUrl, token, tool, writeArgs(flags, taskId)), json);
    return;
  }

  if (area === "run" && command === "list") {
    print(await mcpCall(baseUrl, token, "loop.tasks.list"), json);
    return;
  }
  if (area === "run" && command === "inspect") {
    print(
      await mcpCall(baseUrl, token, "loop.tasks.get", { taskId: required(flags, "task-id") }),
      json,
    );
    return;
  }
  if (area === "run" && ["pause", "resume", "cancel", "repair"].includes(command)) {
    const taskId = required(flags, "task-id");
    const tool = {
      pause: "loop.runs.pause",
      resume: "loop.runs.resume",
      cancel: "loop.runs.cancel",
      repair: "loop.runs.request_repair",
    }[command];
    const extra = flags.has("reason") ? { reason: flags.get("reason") } : {};
    print(await mcpCall(baseUrl, token, tool, writeArgs(flags, taskId, extra)), json);
    return;
  }

  if (area === "evidence" && (command === "list" || command === "open")) {
    const taskId = required(flags, "task-id");
    const tool = command === "list" ? "loop.evidence.list" : "loop.evidence.get";
    const args =
      command === "list" ? { taskId } : { taskId, objectKey: required(flags, "object-key") };
    print(await mcpCall(baseUrl, token, tool, args), json);
    return;
  }

  if (area === "findings" && command === "list") {
    const task = await mcpCall(baseUrl, token, "loop.tasks.get", {
      taskId: required(flags, "task-id"),
    });
    print(task?.findings ?? task, json);
    return;
  }
  if (area === "review" && command === "queue") {
    print(await mcpCall(baseUrl, token, "loop.tasks.list"), json);
    return;
  }
  if (area === "budget" || area === "audit") {
    print(await mcpCall(baseUrl, token, "loop.tasks.list"), json);
    return;
  }
  usage(`unsupported command: ${positionals.join(" ")}`);
}

try {
  await main();
} catch (error) {
  console.error(`loop: ${error instanceof Error ? error.message : "command failed"}`);
  process.exitCode = 1;
}
