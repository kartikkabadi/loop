import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.LOOP_LIVE_URL?.trim();

const REQUEST_TIMEOUT_MS = 10_000;

async function getJson(url: URL): Promise<{ response: Response; body: unknown }> {
  const response = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  return { response, body: await response.json() };
}

test(
  "live Loop gateway exposes health, MCP catalog, and an unauthenticated write boundary",
  { skip: !baseUrl },
  async () => {
    const root = new URL(baseUrl!);
    const health = await getJson(new URL("/healthz", root));
    assert.equal(health.response.status, 200);
    assert.deepEqual(health.body, {
      status: "ok",
      service: "loop-gateway",
      rolloutMode: (health.body as { rolloutMode?: unknown }).rolloutMode,
      time: (health.body as { time?: unknown }).time,
    });
    assert.equal(typeof (health.body as { time?: unknown }).time, "string");

    const mcp = await getJson(new URL("/mcp", root));
    assert.equal(mcp.response.status, 200);
    const catalog = mcp.body as {
      protocol?: unknown;
      protocolVersion?: unknown;
      serverInfo?: { name?: unknown; version?: unknown };
      tools?: readonly { name?: unknown }[];
    };
    assert.equal(catalog.protocol, "loop-intent-tools-v1");
    assert.equal(typeof catalog.protocolVersion, "string");
    assert.deepEqual(catalog.serverInfo, { name: "loop", version: "0.1.0" });
    assert.ok(catalog.tools?.some((tool) => tool.name === "loop.workday.get"));

    const unauthenticated = await fetch(new URL("/mcp", root), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list", params: {} }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    assert.equal(unauthenticated.status, 401);
    assert.match(unauthenticated.headers.get("www-authenticate") ?? "", /^Bearer /);
    assert.deepEqual(await unauthenticated.json(), {
      error: "unauthorized",
      message: "a verified OAuth principal is required",
    });
  },
);
