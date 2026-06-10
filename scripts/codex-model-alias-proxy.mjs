#!/usr/bin/env node
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { StringDecoder } from "node:string_decoder";
import { pathToFileURL } from "node:url";

const PUBLIC_MODEL_ALIAS = "internal";
const MODEL_IDENTIFYING_HEADERS = new Set(["openai-model", "x-openai-model"]);
const SAFE_RESPONSE_HEADERS = new Set([
  "cache-control",
  "content-type",
  "date",
  "openai-processing-ms",
  "openai-request-id",
  "request-id",
  "retry-after",
  "x-request-id",
]);

export function rewriteRequestBody(body, internalModel) {
  const payload = JSON.parse(body);
  if (payload.model !== PUBLIC_MODEL_ALIAS) {
    throw new Error("Codex request did not use the internal model alias");
  }
  payload.model = internalModel;
  return JSON.stringify(payload);
}

export function redactResponseBody(body, internalModel, contentType = "application/json") {
  if (!internalModel) throw new Error("internal model is required");
  const text = String(body);
  if (isEventStream(contentType)) return redactSseBody(text, internalModel);
  return redactJsonBody(text, internalModel);
}

export function redactResponseHeaders(headers, internalModel) {
  if (!internalModel) throw new Error("internal model is required");
  const redacted = {};
  for (const [name, value] of Object.entries(headers)) {
    const lowerName = name.toLowerCase();
    if (MODEL_IDENTIFYING_HEADERS.has(lowerName)) {
      redacted[name] = PUBLIC_MODEL_ALIAS;
      continue;
    }
    if (
      SAFE_RESPONSE_HEADERS.has(lowerName) ||
      lowerName.startsWith("x-ratelimit-") ||
      lowerName.startsWith("x-codex-") ||
      lowerName.startsWith("x-reasoning-") ||
      lowerName === "x-models-etag"
    ) {
      redacted[name] = redactHeaderValue(value, internalModel);
    }
  }
  return redacted;
}

function redactHeaderValue(value, internalModel) {
  if (Array.isArray(value)) {
    return value.map((entry) => redactText(String(entry), internalModel));
  }
  return typeof value === "string" ? redactText(value, internalModel) : value;
}

export function createRedactionTransform(internalModel, contentType = "application/json") {
  if (!internalModel) throw new Error("internal model is required");
  const decoder = new StringDecoder("utf8");
  let pending = "";
  const eventStream = isEventStream(contentType);
  const streamState = { pendingDeltaRecord: null, pendingDeltaText: "", pendingDeltaScope: "" };

  return new Transform({
    transform(chunk, encoding, callback) {
      try {
        pending += decoder.write(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
        if (eventStream) {
          const split = completeSsePrefix(pending);
          if (split.length > 0) {
            this.push(
              redactSseBodyWithState(pending.slice(0, split.length), internalModel, streamState),
            );
            pending = pending.slice(split.length);
          }
        }
        callback();
      } catch (error) {
        callback(error);
      }
    },
    flush(callback) {
      try {
        pending += decoder.end();
        if (eventStream) {
          const rendered = redactSseBodyWithState(pending, internalModel, streamState, true);
          if (rendered) this.push(rendered);
        } else if (pending) {
          this.push(redactResponseBody(pending, internalModel, contentType));
        }
        callback();
      } catch (error) {
        callback(error);
      }
    },
  });
}

async function main() {
  // Target validation runs trusted main-branch code, but must not activate Node's inspector.
  process.on("SIGUSR1", () => {});
  const options = parseArgs(process.argv.slice(2));
  const internalModel = (await readStdin()).trim();
  if (!internalModel) throw new Error("internal model is required on stdin");
  const upstream = new URL(requiredOption(options, "upstream"));
  const serverInfo = requiredOption(options, "server-info");

  const server = http.createServer(async (request, response) => {
    try {
      const requestBody = rewriteRequestBody(await readBody(request), internalModel);
      const upstreamUrl = new URL(upstream);
      const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
      upstreamUrl.pathname = `${upstream.pathname.replace(/\/$/, "")}${requestUrl.pathname}`;
      upstreamUrl.search = requestUrl.search;
      await forwardRequest({
        request,
        requestBody,
        upstreamUrl,
        response,
        internalModel,
      });
    } catch {
      if (!response.headersSent) {
        response.writeHead(502, { "content-type": "application/json" });
        response.end(JSON.stringify({ error: { message: "internal model proxy request failed" } }));
      } else if (!response.destroyed) {
        response.destroy();
      }
    }
  });

  server.listen(0, "127.0.0.1", () => {
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("proxy address unavailable");
    const pendingServerInfo = `${serverInfo}.${process.pid}.tmp`;
    fs.writeFileSync(pendingServerInfo, `${JSON.stringify({ port: address.port })}\n`, {
      mode: 0o600,
    });
    fs.renameSync(pendingServerInfo, serverInfo);
  });
}

function forwardRequest({ request, requestBody, upstreamUrl, response, internalModel }) {
  return new Promise((resolve, reject) => {
    const client = upstreamUrl.protocol === "https:" ? https : http;
    const headers = { ...request.headers };
    delete headers.host;
    delete headers["accept-encoding"];
    headers["content-length"] = String(Buffer.byteLength(requestBody));
    let upstreamResponse;
    let settled = false;
    const finish = (error) => {
      if (settled) return;
      settled = true;
      request.off("aborted", abort);
      response.off("close", abort);
      if (error) reject(error);
      else resolve();
    };
    const abort = () => {
      if (settled || response.writableEnded) return;
      upstreamRequest.destroy();
      upstreamResponse?.destroy();
      finish(new Error("downstream disconnected"));
    };
    const upstreamRequest = client.request(
      upstreamUrl,
      {
        method: request.method,
        headers,
      },
      (receivedResponse) => {
        upstreamResponse = receivedResponse;
        const responseHeaders = redactResponseHeaders(receivedResponse.headers, internalModel);
        delete responseHeaders["content-encoding"];
        delete responseHeaders["content-length"];
        delete responseHeaders["transfer-encoding"];
        response.writeHead(receivedResponse.statusCode ?? 502, responseHeaders);
        pipeline(
          receivedResponse,
          createRedactionTransform(
            internalModel,
            String(receivedResponse.headers["content-type"] ?? ""),
          ),
          response,
        ).then(
          () => finish(),
          (error) => finish(error),
        );
      },
    );
    request.once("aborted", abort);
    response.once("close", abort);
    upstreamRequest.on("error", finish);
    upstreamRequest.end(requestBody);
  });
}

function isEventStream(contentType) {
  return String(contentType).toLowerCase().includes("text/event-stream");
}

function redactJsonBody(body, internalModel) {
  try {
    return JSON.stringify(redactProtocolValue(JSON.parse(body), internalModel));
  } catch {
    return JSON.stringify({
      error: { message: "internal model proxy received an invalid JSON response" },
    });
  }
}

function redactSseBody(body, internalModel, includeFinalFrame = false) {
  const streamState = { pendingDeltaRecord: null, pendingDeltaText: "", pendingDeltaScope: "" };
  return redactSseBodyWithState(body, internalModel, streamState, includeFinalFrame);
}

function redactSseBodyWithState(body, internalModel, streamState, includeFinalFrame = false) {
  let output = "";
  let offset = 0;
  for (const frame of sseFrames(body)) {
    output += redactSseFrame(frame.value, frame.separator, internalModel, streamState);
    offset = frame.end;
  }
  const tail = body.slice(offset);
  if (includeFinalFrame && tail) {
    output += redactSseFrame(tail, "", internalModel, streamState);
    return output + flushPendingDelta(streamState, internalModel);
  }
  if (includeFinalFrame) output += flushPendingDelta(streamState, internalModel);
  return output + tail;
}

function redactSseFrame(frame, separator, internalModel, streamState) {
  const newline = frame.includes("\r\n") ? "\r\n" : "\n";
  const lines = frame.split(/\r?\n/);
  const dataIndexes = [];
  const data = [];
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^data:(?: ?)(.*)$/);
    if (!match) continue;
    dataIndexes.push(index);
    data.push(match[1] ?? "");
  }
  if (dataIndexes.length === 0) return frame + separator;
  const payload = data.join("\n");
  if (payload === "[DONE]") {
    return flushPendingDelta(streamState, internalModel) + frame + separator;
  }

  let parsed;
  try {
    parsed = JSON.parse(payload);
  } catch {
    parsed = {
      type: "error",
      error: { message: "internal model proxy received an invalid response event" },
    };
  }
  const record = { lines, dataIndexes, newline, separator, parsed };
  if (isRedactableStringDelta(parsed)) {
    return redactStringDelta(record, internalModel, streamState);
  }
  return flushPendingDelta(streamState, internalModel) + renderSseRecord(record, internalModel);
}

function redactStringDelta(record, internalModel, streamState) {
  const scope = stringDeltaScope(record.parsed);
  const prefix =
    streamState.pendingDeltaScope && streamState.pendingDeltaScope !== scope
      ? flushPendingDelta(streamState, internalModel)
      : "";
  const combined = `${streamState.pendingDeltaText}${record.parsed.delta}`;
  const holdLength = modelPrefixSuffixLength(combined, internalModel);
  const ready = combined.slice(0, combined.length - holdLength);
  const pending = holdLength > 0 ? combined.slice(-holdLength) : "";
  const template = streamState.pendingDeltaRecord ?? record;
  streamState.pendingDeltaRecord = pending ? record : null;
  streamState.pendingDeltaText = pending;
  streamState.pendingDeltaScope = pending ? scope : "";
  if (!ready) return prefix;
  template.parsed.delta = redactText(ready, internalModel);
  return prefix + renderSseRecord(template, internalModel);
}

function flushPendingDelta(streamState, internalModel) {
  const record = streamState.pendingDeltaRecord;
  const text = streamState.pendingDeltaText;
  streamState.pendingDeltaRecord = null;
  streamState.pendingDeltaText = "";
  streamState.pendingDeltaScope = "";
  if (!record || !text) return "";
  record.parsed.delta = redactText(text, internalModel);
  return renderSseRecord(record, internalModel);
}

function modelPrefixSuffixLength(value, internalModel) {
  const maximum = Math.min(value.length, Math.max(0, internalModel.length - 1));
  for (let length = maximum; length > 0; length -= 1) {
    if (value.endsWith(internalModel.slice(0, length))) return length;
  }
  return 0;
}

function renderSseRecord(record, internalModel) {
  const redacted = JSON.stringify(redactProtocolValue(record.parsed, internalModel));
  const firstDataIndex = record.dataIndexes[0];
  const skipped = new Set(record.dataIndexes.slice(1));
  const rendered = record.lines
    .filter((_, index) => !skipped.has(index))
    .map((line, index) => (index === firstDataIndex ? `data: ${redacted}` : line))
    .join(record.newline);
  return rendered + record.separator;
}

function isRedactableStringDelta(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    isRedactableTextDeltaType(value.type) &&
    typeof value.delta === "string"
  );
}

function isRedactableTextDeltaType(value) {
  return new Set([
    "response.output_text.delta",
    "response.reasoning_summary_text.delta",
    "response.reasoning_text.delta",
    "response.refusal.delta",
  ]).has(String(value ?? "").toLowerCase());
}

function stringDeltaScope(value) {
  return JSON.stringify([
    value.type ?? "",
    value.item_id ?? "",
    value.output_index ?? "",
    value.content_index ?? "",
    value.summary_index ?? "",
  ]);
}

function redactProtocolValue(value, internalModel, container = null, key = "") {
  if (typeof value === "string") {
    if (isToolPayloadField(container, key)) return value;
    return redactText(value, internalModel);
  }
  if (Array.isArray(value)) {
    return value.map((entry) => redactProtocolValue(entry, internalModel, container, key));
  }
  if (!value || typeof value !== "object") return value;

  const redacted = {};
  for (const [entryKey, entry] of Object.entries(value)) {
    if (isModelMetadataKey(entryKey)) {
      redacted[entryKey] = PUBLIC_MODEL_ALIAS;
      continue;
    }
    redacted[entryKey] = redactProtocolValue(entry, internalModel, value, entryKey);
  }
  return redacted;
}

function isToolPayloadField(container, key) {
  if (!container || typeof container !== "object") return false;
  const type = String(container.type ?? "").toLowerCase();
  const normalizedKey = String(key).toLowerCase();
  if (normalizedKey === "delta" && type.endsWith(".delta") && !isRedactableTextDeltaType(type)) {
    return true;
  }
  if (normalizedKey === "arguments" && type.includes("function_call")) return true;
  return (
    normalizedKey === "input" &&
    (type.includes("custom_tool_call") || type.includes("computer_call"))
  );
}

function redactText(value, internalModel) {
  return value.split(internalModel).join(PUBLIC_MODEL_ALIAS);
}

function isModelMetadataKey(key) {
  return ["model", "model_id", "model_name", "model_slug", "model_version"].includes(
    key.toLowerCase(),
  );
}

function completeSsePrefix(value) {
  let length = 0;
  for (const frame of sseFrames(value)) {
    length = frame.end;
  }
  return { length };
}

function* sseFrames(value) {
  const separatorPattern = /\r?\n\r?\n/g;
  let start = 0;
  for (const match of value.matchAll(separatorPattern)) {
    const index = match.index ?? 0;
    const separator = match[0];
    const end = index + separator.length;
    yield {
      value: value.slice(start, index),
      separator,
      end,
    };
    start = end;
  }
}

function readBody(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    stream.on("data", (chunk) => {
      size += chunk.length;
      if (size > 128 * 1024 * 1024) {
        reject(new Error("request body too large"));
        stream.destroy();
        return;
      }
      chunks.push(Buffer.from(chunk));
    });
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    stream.on("error", reject);
  });
}

function readStdin() {
  return readBody(process.stdin);
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (!key?.startsWith("--")) throw new Error(`unexpected argument: ${key}`);
    const value = argv[index + 1];
    if (!value) throw new Error(`missing value for ${key}`);
    options[key.slice(2)] = value;
    index += 1;
  }
  return options;
}

function requiredOption(options, key) {
  const value = options[key];
  if (!value) throw new Error(`--${key} is required`);
  return value;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
