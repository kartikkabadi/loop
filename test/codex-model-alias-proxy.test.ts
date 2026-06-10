import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  createRedactionTransform,
  redactResponseBody,
  redactResponseHeaders,
  rewriteRequestBody,
} from "../scripts/codex-model-alias-proxy.mjs";

test("model alias proxy rewrites only the public model alias", () => {
  const rewritten = JSON.parse(
    rewriteRequestBody(JSON.stringify({ model: "internal", input: "test" }), "private-model"),
  );

  assert.equal(rewritten.model, "private-model");
  assert.throws(
    () => rewriteRequestBody(JSON.stringify({ model: "other" }), "private-model"),
    /internal model alias/,
  );
});

test("model alias proxy removes the internal model from upstream responses", () => {
  const response = JSON.stringify({
    type: "response.completed",
    response: { model: "private-model", output: [{ text: "src/internal/file.ts" }] },
  });

  assert.equal(redactResponseBody(response, "private-model").includes("private-model"), false);
  assert.match(redactResponseBody(response, "private-model"), /"model":"internal"/);
  assert.match(redactResponseBody(response, "private-model"), /src\/internal\/file\.ts/);
});

test("model alias proxy removes the internal model from upstream headers", () => {
  const headers = redactResponseHeaders(
    {
      "content-type": "application/json",
      "openai-model": "private-model",
      "x-openai-model": "private-model",
      "x-debug-info": "served-by=private-model",
      "x-codex-turn-state": "turn-private-model",
      "x-reasoning-included": "true",
      "x-models-etag": "etag-private-model",
    },
    "private-model",
  );

  assert.equal(headers["openai-model"], "internal");
  assert.equal(headers["x-openai-model"], "internal");
  assert.equal(headers["x-debug-info"], undefined);
  assert.equal(headers["x-codex-turn-state"], "turn-internal");
  assert.equal(headers["x-reasoning-included"], "true");
  assert.equal(headers["x-models-etag"], "etag-internal");
  assert.equal(JSON.stringify(headers).includes("private-model"), false);
});

test("model alias proxy redacts generated model literals without failing the response", () => {
  const response = JSON.stringify({
    model: "private-model",
    output: [{ content: [{ type: "output_text", text: "Keep private-model literal." }] }],
  });
  const redacted = redactResponseBody(response, "private-model");

  assert.match(redacted, /"model":"internal"/);
  assert.match(redacted, /Keep internal literal/);
});

test("model alias proxy preserves structured error fields while redacting model literals", () => {
  const response = JSON.stringify({
    error: {
      type: "server_error",
      code: "context_length_exceeded",
      param: "input",
      message: "private-model exceeded the context limit",
    },
  });
  const redacted = JSON.parse(redactResponseBody(response, "private-model"));

  assert.deepEqual(redacted.error, {
    type: "server_error",
    code: "context_length_exceeded",
    param: "input",
    message: "internal exceeded the context limit",
  });
});

test("model alias proxy redacts model literals from flat streaming errors", () => {
  const response =
    'data: {"type":"error","code":"rate_limit_exceeded","message":"private-model TPM exceeded"}\n\n';
  const redacted = redactResponseBody(response, "private-model", "text/event-stream");

  assert.match(redacted, /"type":"error"/);
  assert.match(redacted, /"code":"rate_limit_exceeded"/);
  assert.match(redacted, /"message":"internal TPM exceeded"/);
  assert.equal(redacted.includes("private-model"), false);
});

test("model alias proxy redacts model names split across stream chunks", async () => {
  const redactor = createRedactionTransform("private-model", "text/event-stream");
  const chunks = [];
  redactor.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
  redactor.write('data: {"model":"private-');
  redactor.write('model","path":"src/internal/file.ts"}\n\n');
  redactor.end();
  await new Promise((resolve, reject) => {
    redactor.once("end", resolve);
    redactor.once("error", reject);
  });

  const result = Buffer.concat(chunks).toString("utf8");
  assert.equal(result.includes("private-model"), false);
  assert.match(result, /"model":"internal"/);
  assert.match(result, /src\/internal\/file\.ts/);
});

test("model alias proxy redacts model literals split across SSE delta events", async () => {
  const redactor = createRedactionTransform("private-model", "text/event-stream");
  const chunks = [];
  redactor.on("data", (chunk) => chunks.push(Buffer.from(chunk)));

  redactor.write('data: {"type":"response.output_text.delta","delta":"private-"}\n\n');
  redactor.end('data: {"type":"response.output_text.delta","delta":"model"}\n\n');
  await new Promise((resolve, reject) => {
    redactor.once("end", resolve);
    redactor.once("error", reject);
  });

  const result = Buffer.concat(chunks).toString("utf8");
  assert.equal(result.includes("private-model"), false);
  assert.match(result, /"delta":"internal"/);
});

test("model alias proxy redacts split model literals in the final SSE frame", async () => {
  const redactor = createRedactionTransform("private-model", "text/event-stream");
  const chunks = [];
  redactor.on("data", (chunk) => chunks.push(Buffer.from(chunk)));

  redactor.write('data: {"type":"response.output_text.delta","delta":"private-"}\n\n');
  redactor.end('data: {"type":"response.output_text.delta","delta":"model"}');
  await new Promise((resolve, reject) => {
    redactor.once("end", resolve);
    redactor.once("error", reject);
  });

  const result = Buffer.concat(chunks).toString("utf8");
  assert.equal(result.includes("private-model"), false);
  assert.match(result, /"delta":"internal"/);
});

test("model alias proxy forwards non-text events after bounded delta buffering", async () => {
  const redactor = createRedactionTransform("private-model", "text/event-stream");
  const chunks = [];
  redactor.on("data", (chunk) => chunks.push(Buffer.from(chunk)));

  redactor.write('data: {"type":"response.output_text.delta","delta":"private-"}\n\n');
  redactor.write(
    'data: {"type":"response.function_call_arguments.delta","delta":"{\\"path\\":\\"x\\"}"}\n\n',
  );
  const result = Buffer.concat(chunks).toString("utf8");

  assert.match(result, /"delta":"private-"/);
  assert.match(result, /response\.function_call_arguments\.delta/);
  redactor.end();
  await new Promise((resolve, reject) => {
    redactor.once("end", resolve);
    redactor.once("error", reject);
  });
});

test("model alias proxy preserves model literals split across tool-input deltas", async () => {
  const redactor = createRedactionTransform("private-model", "text/event-stream");
  const chunks = [];
  redactor.on("data", (chunk) => chunks.push(Buffer.from(chunk)));

  redactor.write(
    'data: {"type":"response.function_call_arguments.delta","item_id":"call-1","delta":"private-"}\n\n',
  );
  redactor.end(
    'data: {"type":"response.function_call_arguments.delta","item_id":"call-1","delta":"model"}\n\n',
  );
  await new Promise((resolve, reject) => {
    redactor.once("end", resolve);
    redactor.once("error", reject);
  });

  const result = Buffer.concat(chunks).toString("utf8");
  assert.match(result, /"delta":"private-"/);
  assert.match(result, /"delta":"model"/);
  assert.doesNotMatch(result, /"delta":"internal"/);
});

test("model alias proxy preserves completed function-call arguments", () => {
  const result = redactResponseBody(
    JSON.stringify({
      model: "private-model",
      output: [
        {
          type: "function_call",
          name: "search",
          arguments: '{"query":"private-model"}',
        },
      ],
    }),
    "private-model",
  );

  assert.match(result, /"model":"internal"/);
  assert.match(result, /\\"query\\":\\"private-model\\"/);
});

test("model alias proxy forwards the Codex responses path without exposing the model", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-model-alias-"));
  const serverInfo = path.join(tmp, "server.json");
  let upstreamPath = "";
  let upstreamModel = "";
  const upstream = http.createServer((request, response) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    request.on("end", () => {
      upstreamPath = request.url ?? "";
      upstreamModel = JSON.parse(Buffer.concat(chunks).toString("utf8")).model;
      response.writeHead(200, {
        "content-type": "application/json",
        "openai-model": "private-model",
        "x-openai-model": "private-model",
        "x-debug-info": "served-by=private-model",
      });
      response.end(JSON.stringify({ id: "response", model: "private-model" }));
    });
  });
  await new Promise((resolve) => upstream.listen(0, "127.0.0.1", resolve));
  const address = upstream.address();
  assert.ok(address && typeof address !== "string");

  const proxy = spawn(
    process.execPath,
    [
      "scripts/codex-model-alias-proxy.mjs",
      "--upstream",
      `http://127.0.0.1:${address.port}`,
      "--server-info",
      serverInfo,
    ],
    { stdio: ["pipe", "ignore", "pipe"] },
  );
  proxy.stdin.end("private-model");
  let proxyStderr = "";
  proxy.stderr.on("data", (chunk) => {
    proxyStderr += Buffer.from(chunk).toString("utf8");
  });

  try {
    for (let attempt = 0; attempt < 100 && !fs.existsSync(serverInfo); attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    const proxyPort = JSON.parse(fs.readFileSync(serverInfo, "utf8")).port;
    proxy.kill("SIGUSR1");
    await new Promise((resolve) => setTimeout(resolve, 50));
    assert.doesNotMatch(proxyStderr, /Debugger listening/);
    const response = await fetch(`http://127.0.0.1:${proxyPort}/v1/responses`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: "internal", input: "test" }),
    });
    const payload = await response.json();

    assert.equal(upstreamPath, "/v1/responses");
    assert.equal(upstreamModel, "private-model");
    assert.equal(payload.model, "internal");
    assert.equal(response.headers.get("openai-model"), "internal");
    assert.equal(response.headers.get("x-openai-model"), "internal");
    assert.equal(response.headers.get("x-debug-info"), null);
    assert.equal(JSON.stringify([...response.headers]).includes("private-model"), false);
  } finally {
    proxy.kill("SIGTERM");
    upstream.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("model alias proxy streams responses before the upstream request completes", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-model-stream-"));
  const serverInfo = path.join(tmp, "server.json");
  let finishUpstream: () => void = () => {};
  const upstreamCanFinish = new Promise<void>((resolve) => {
    finishUpstream = resolve;
  });
  const upstream = http.createServer((request, response) => {
    request.resume();
    request.on("end", async () => {
      response.writeHead(200, {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      });
      response.write('data: {"type":"response.created","response":{"model":"private-model"}}\n\n');
      await upstreamCanFinish;
      response.end(
        'data: {"type":"response.output_text.delta","delta":"src/internal/file.ts"}\n\ndata: [DONE]\n\n',
      );
    });
  });
  await new Promise((resolve) => upstream.listen(0, "127.0.0.1", resolve));
  const address = upstream.address();
  assert.ok(address && typeof address !== "string");

  const proxy = spawn(
    process.execPath,
    [
      "scripts/codex-model-alias-proxy.mjs",
      "--upstream",
      `http://127.0.0.1:${address.port}`,
      "--server-info",
      serverInfo,
    ],
    { stdio: ["pipe", "ignore", "pipe"] },
  );
  proxy.stdin.end("private-model");

  try {
    for (let attempt = 0; attempt < 100 && !fs.existsSync(serverInfo); attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    const proxyPort = JSON.parse(fs.readFileSync(serverInfo, "utf8")).port;
    const response = await fetch(`http://127.0.0.1:${proxyPort}/v1/responses`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: "internal", input: "test", stream: true }),
    });
    assert.ok(response.body);
    const reader = response.body.getReader();
    const first = await Promise.race([
      reader.read(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("proxy did not stream the first response chunk")), 500),
      ),
    ]);
    assert.equal(first.done, false);
    const firstText = Buffer.from(first.value).toString("utf8");
    assert.match(firstText, /response\.created/);
    assert.equal(firstText.includes("private-model"), false);

    finishUpstream();
    const remaining = [];
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      remaining.push(Buffer.from(next.value));
    }
    const result = firstText + Buffer.concat(remaining).toString("utf8");
    assert.equal(result.includes("private-model"), false);
    assert.match(result, /"model":"internal"/);
    assert.match(result, /src\/internal\/file\.ts/);
  } finally {
    finishUpstream?.();
    proxy.kill("SIGTERM");
    upstream.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("model alias proxy cancels the upstream response after a client disconnect", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-model-cancel-"));
  const serverInfo = path.join(tmp, "server.json");
  let resolveUpstreamClosed: () => void = () => {};
  const upstreamClosed = new Promise<void>((resolve) => {
    resolveUpstreamClosed = resolve;
  });
  const upstream = http.createServer((request, response) => {
    request.resume();
    request.on("end", () => {
      response.writeHead(200, { "content-type": "text/event-stream" });
      response.write("data: keepalive\n\n");
      response.once("close", resolveUpstreamClosed);
    });
  });
  await new Promise((resolve) => upstream.listen(0, "127.0.0.1", resolve));
  const address = upstream.address();
  assert.ok(address && typeof address !== "string");

  const proxy = spawn(
    process.execPath,
    [
      "scripts/codex-model-alias-proxy.mjs",
      "--upstream",
      `http://127.0.0.1:${address.port}`,
      "--server-info",
      serverInfo,
    ],
    { stdio: ["pipe", "ignore", "pipe"] },
  );
  proxy.stdin.end("private-model");

  try {
    for (let attempt = 0; attempt < 100 && !fs.existsSync(serverInfo); attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    const proxyPort = JSON.parse(fs.readFileSync(serverInfo, "utf8")).port;
    const response = await fetch(`http://127.0.0.1:${proxyPort}/v1/responses`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: "internal", input: "test", stream: true }),
    });
    assert.ok(response.body);
    const reader = response.body.getReader();
    const first = await reader.read();
    assert.equal(first.done, false);
    await reader.cancel();
    await Promise.race([
      upstreamClosed,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("proxy did not cancel the upstream response")), 500),
      ),
    ]);
  } finally {
    proxy.kill("SIGTERM");
    upstream.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
