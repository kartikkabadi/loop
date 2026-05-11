import assert from "node:assert/strict";
import test from "node:test";

import worker from "../dashboard/worker.js";

class MemoryKv {
  private values = new Map<string, string>();

  async get(key: string) {
    return this.values.get(key) ?? null;
  }

  async put(key: string, value: string) {
    this.values.set(key, value);
  }
}

class MemoryCache {
  private values = new Map<string, Response>();

  async match(request: Request) {
    return this.values.get(request.url)?.clone();
  }

  async put(request: Request, response: Response) {
    this.values.set(request.url, response.clone());
  }
}

test("dashboard reads stored CI status for active PR rows", async () => {
  const originalFetch = globalThis.fetch;
  const originalCaches = globalThis.caches;
  Object.defineProperty(globalThis, "caches", {
    configurable: true,
    value: {
      default: {
        match: async () => undefined,
        put: async () => undefined,
      },
    },
  });
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url.includes("/repos/openclaw/clawsweeper/actions/runs")) {
      return jsonResponse({
        workflow_runs: [
          {
            id: 1,
            name: "ClawSweeper",
            display_title: "Review event item openclaw/openclaw#80609",
            status: "in_progress",
            conclusion: null,
            html_url: "https://github.com/openclaw/clawsweeper/actions/runs/1",
            created_at: new Date(Date.now() - 60_000).toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
      });
    }
    if (url.includes("/search/issues")) return jsonResponse({ items: [] });
    throw new Error(`unexpected fetch ${url}`);
  };

  try {
    const env = {
      INGEST_TOKEN: "test-token",
      STATUS_STORE: new MemoryKv(),
      CLAWSWEEPER_REPO: "openclaw/clawsweeper",
      TARGET_REPOS: "openclaw/openclaw",
      CACHE_TTL_SECONDS: "0",
    };
    const ingest = await worker.fetch(
      new Request("<private-ingest-endpoint>", {
        method: "POST",
        headers: {
          Authorization: "Bearer test-token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: "ci.status",
          repository: "openclaw/openclaw",
          item_number: 80609,
          status: "green",
          ci: {
            repository: "openclaw/openclaw",
            item_number: 80609,
            state: "green",
            source: "github-checks",
            total: 12,
            failing: 0,
            pending: 0,
          },
        }),
      }),
      env,
    );
    assert.equal(ingest.status, 200);

    const response = await worker.fetch(
      new Request("https://clawsweeper.openclaw.ai/api/status"),
      env,
      {
        waitUntil: () => undefined,
      },
    );
    const status = await response.json();
    assert.equal(status.pipeline[0].repository, "openclaw/openclaw");
    assert.equal(status.pipeline[0].item_number, 80609);
    assert.equal(status.pipeline[0].ci.state, "green");
    assert.equal(status.pipeline[0].ci.source, "github-checks");
    assert.equal(status.pipeline[0].ci.total, 12);
  } finally {
    globalThis.fetch = originalFetch;
    Object.defineProperty(globalThis, "caches", { configurable: true, value: originalCaches });
  }
});

test("dashboard falls back to edge cache storage when KV is not bound", async () => {
  const originalFetch = globalThis.fetch;
  const originalCaches = globalThis.caches;
  Object.defineProperty(globalThis, "caches", {
    configurable: true,
    value: {
      default: new MemoryCache(),
    },
  });
  globalThis.fetch = activePrFetch;

  try {
    const env = {
      INGEST_TOKEN: "test-token",
      CLAWSWEEPER_REPO: "openclaw/clawsweeper",
      TARGET_REPOS: "openclaw/openclaw",
      CACHE_TTL_SECONDS: "0",
    };
    const ingest = await worker.fetch(
      new Request("<private-ingest-endpoint>", {
        method: "POST",
        headers: {
          Authorization: "Bearer test-token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: "ci.status",
          repository: "openclaw/openclaw",
          item_number: 80609,
          ci: {
            repository: "openclaw/openclaw",
            item_number: 80609,
            state: "pending",
            source: "github-checks",
            total: 12,
            failing: 0,
            pending: 2,
          },
        }),
      }),
      env,
    );
    assert.equal(ingest.status, 200);

    const response = await worker.fetch(
      new Request("https://clawsweeper.openclaw.ai/api/status"),
      env,
      {
        waitUntil: () => undefined,
      },
    );
    const status = await response.json();
    assert.equal(status.pipeline[0].ci.state, "pending");
    assert.equal(status.pipeline[0].ci.source, "github-checks");
    assert.equal(status.pipeline[0].ci.pending, 2);
  } finally {
    globalThis.fetch = originalFetch;
    Object.defineProperty(globalThis, "caches", { configurable: true, value: originalCaches });
  }
});

test("dashboard keeps workflow CI status when live PR checks fail", async () => {
  const originalFetch = globalThis.fetch;
  const originalCaches = globalThis.caches;
  Object.defineProperty(globalThis, "caches", {
    configurable: true,
    value: {
      default: {
        match: async () => undefined,
        put: async () => undefined,
      },
    },
  });
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url.includes("/repos/openclaw/clawsweeper/actions/runs")) {
      return jsonResponse({
        workflow_runs: [
          {
            id: 1,
            name: "ClawSweeper",
            display_title: "Review event item openclaw/openclaw#80609",
            status: "in_progress",
            conclusion: null,
            html_url: "https://github.com/openclaw/clawsweeper/actions/runs/1",
            created_at: new Date(Date.now() - 60_000).toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
      });
    }
    if (url.includes("/repos/openclaw/openclaw/pulls/80609")) {
      return new Response(JSON.stringify({ message: "rate limited" }), { status: 403 });
    }
    if (url.includes("/search/issues")) return jsonResponse({ items: [] });
    throw new Error(`unexpected fetch ${url}`);
  };

  try {
    const response = await worker.fetch(
      new Request("https://clawsweeper.openclaw.ai/api/status"),
      {
        CLAWSWEEPER_REPO: "openclaw/clawsweeper",
        TARGET_REPOS: "openclaw/openclaw",
        CACHE_TTL_SECONDS: "0",
        INCLUDE_CI_STATUS: "1",
      },
      {
        waitUntil: () => undefined,
      },
    );
    const status = await response.json();
    assert.equal(status.pipeline[0].ci.state, "pending");
    assert.equal(status.pipeline[0].ci.source, "workflow");
  } finally {
    globalThis.fetch = originalFetch;
    Object.defineProperty(globalThis, "caches", { configurable: true, value: originalCaches });
  }
});

async function activePrFetch(input: RequestInfo | URL) {
  const url = String(input);
  if (url.includes("/repos/openclaw/clawsweeper/actions/runs")) {
    return jsonResponse({
      workflow_runs: [
        {
          id: 1,
          name: "ClawSweeper",
          display_title: "Review event item openclaw/openclaw#80609",
          status: "in_progress",
          conclusion: null,
          html_url: "https://github.com/openclaw/clawsweeper/actions/runs/1",
          created_at: new Date(Date.now() - 60_000).toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
    });
  }
  if (url.includes("/search/issues")) return jsonResponse({ items: [] });
  throw new Error(`unexpected fetch ${url}`);
}

function jsonResponse(value: unknown) {
  return new Response(JSON.stringify(value), {
    headers: {
      "content-type": "application/json",
    },
  });
}
