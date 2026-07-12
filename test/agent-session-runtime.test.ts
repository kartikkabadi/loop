import assert from "node:assert/strict";
import { test } from "node:test";
import {
  supportsContinueSession as supportsContinueSessionValue,
  supportsLoadSession as supportsLoadSessionValue,
} from "../dist/agent-session-runtime.js";
import type {
  AgentCancelInput,
  AgentPromptInput,
  AgentPromptResult,
  AgentSession,
  AgentSessionRuntime,
  CreateAgentSessionInput,
  InitializedAgentSessionRuntime,
  InitializedAgentSessionRuntimeBoth,
  InitializedAgentSessionRuntimeContinueOnly,
  InitializedAgentSessionRuntimeCoreOnly,
  InitializedAgentSessionRuntimeLoadOnly,
  LoadAgentSessionInput,
} from "../src/agent-session-runtime.js";

function supportsContinueSession(
  runtime: InitializedAgentSessionRuntime,
): runtime is InitializedAgentSessionRuntimeContinueOnly | InitializedAgentSessionRuntimeBoth {
  return supportsContinueSessionValue(runtime);
}

function supportsLoadSession(
  runtime: InitializedAgentSessionRuntime,
): runtime is InitializedAgentSessionRuntimeLoadOnly | InitializedAgentSessionRuntimeBoth {
  return supportsLoadSessionValue(runtime);
}

const INFO = { protocolVersion: 1, agentName: "fake-runtime" } as const;

function promptResult(
  sessionId: string,
  outputText: string,
  stopReason: AgentPromptResult["stopReason"] = "end_turn",
): AgentPromptResult {
  return { sessionId, stopReason, outputText };
}

function fakeCoreOnly(): AgentSessionRuntime {
  return {
    async initialize(): Promise<InitializedAgentSessionRuntimeCoreOnly> {
      return {
        info: INFO,
        capabilities: { continueSession: false, loadSession: false },
        async createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
          return { id: "sess-core", cwd: input.cwd };
        },
        async prompt(input: AgentPromptInput): Promise<AgentPromptResult> {
          if (input.text === "cancel-me") {
            return promptResult(input.sessionId, "interrupted", "cancelled");
          }
          return promptResult(input.sessionId, input.text);
        },
        async cancel(_input: AgentCancelInput): Promise<void> {},
      };
    },
  };
}

function fakeContinueOnly(): AgentSessionRuntime {
  return {
    async initialize(): Promise<InitializedAgentSessionRuntimeContinueOnly> {
      return {
        info: INFO,
        capabilities: { continueSession: true, loadSession: false },
        async createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
          return { id: "sess-continue", cwd: input.cwd };
        },
        async prompt(input: AgentPromptInput): Promise<AgentPromptResult> {
          return promptResult(input.sessionId, `turn1:${input.text}`);
        },
        async continueSession(input: AgentPromptInput): Promise<AgentPromptResult> {
          return promptResult(input.sessionId, `turn2:${input.text}`);
        },
        async cancel(_input: AgentCancelInput): Promise<void> {},
      };
    },
  };
}

function fakeLoadOnly(): AgentSessionRuntime {
  return {
    async initialize(): Promise<InitializedAgentSessionRuntimeLoadOnly> {
      return {
        info: INFO,
        capabilities: { continueSession: false, loadSession: true },
        async createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
          return { id: "sess-new", cwd: input.cwd };
        },
        async loadSession(input: LoadAgentSessionInput): Promise<AgentSession> {
          return { id: input.sessionId, cwd: input.cwd };
        },
        async prompt(input: AgentPromptInput): Promise<AgentPromptResult> {
          return promptResult(input.sessionId, input.text);
        },
        async cancel(_input: AgentCancelInput): Promise<void> {},
      };
    },
  };
}

function fakeBoth(): AgentSessionRuntime {
  return {
    async initialize(): Promise<InitializedAgentSessionRuntimeBoth> {
      return {
        info: INFO,
        capabilities: { continueSession: true, loadSession: true },
        async createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
          return { id: "sess-both", cwd: input.cwd };
        },
        async loadSession(input: LoadAgentSessionInput): Promise<AgentSession> {
          return { id: input.sessionId, cwd: input.cwd };
        },
        async prompt(input: AgentPromptInput): Promise<AgentPromptResult> {
          return promptResult(input.sessionId, `prompt:${input.text}`);
        },
        async continueSession(input: AgentPromptInput): Promise<AgentPromptResult> {
          return promptResult(input.sessionId, `continue:${input.text}`);
        },
        async cancel(_input: AgentCancelInput): Promise<void> {},
      };
    },
  };
}

function hasMethod(runtime: object, name: string): boolean {
  return typeof (runtime as Record<string, unknown>)[name] === "function";
}

test("core only: mandatory methods exist; optional methods absent; guards false", async () => {
  const runtime = await fakeCoreOnly().initialize();
  assert.equal(runtime.capabilities.continueSession, false);
  assert.equal(runtime.capabilities.loadSession, false);
  assert.equal(hasMethod(runtime, "createSession"), true);
  assert.equal(hasMethod(runtime, "prompt"), true);
  assert.equal(hasMethod(runtime, "cancel"), true);
  assert.equal(hasMethod(runtime, "continueSession"), false);
  assert.equal(hasMethod(runtime, "loadSession"), false);
  assert.equal(supportsContinueSession(runtime), false);
  assert.equal(supportsLoadSession(runtime), false);
});

test("continuation only: continueSession present; loadSession absent; same session id", async () => {
  const runtime = await fakeContinueOnly().initialize();
  assert.equal(runtime.capabilities.continueSession, true);
  assert.equal(runtime.capabilities.loadSession, false);
  assert.equal(hasMethod(runtime, "continueSession"), true);
  assert.equal(hasMethod(runtime, "loadSession"), false);
  assert.equal(supportsContinueSession(runtime), true);
  assert.equal(supportsLoadSession(runtime), false);

  const session = await runtime.createSession({ cwd: "/tmp/work" });
  const first = await runtime.prompt({ sessionId: session.id, text: "hello" });
  assert.equal(first.sessionId, session.id);
  assert.equal(first.outputText, "turn1:hello");

  if (!supportsContinueSession(runtime)) {
    assert.fail("expected continueSession support");
  }
  const second = await runtime.continueSession({ sessionId: session.id, text: "again" });
  assert.equal(second.sessionId, session.id);
  assert.equal(second.outputText, "turn2:again");
});

test("loading only: loadSession present; continueSession absent; preserves id and cwd", async () => {
  const runtime = await fakeLoadOnly().initialize();
  assert.equal(runtime.capabilities.continueSession, false);
  assert.equal(runtime.capabilities.loadSession, true);
  assert.equal(hasMethod(runtime, "loadSession"), true);
  assert.equal(hasMethod(runtime, "continueSession"), false);
  assert.equal(supportsContinueSession(runtime), false);
  assert.equal(supportsLoadSession(runtime), true);

  if (!supportsLoadSession(runtime)) {
    assert.fail("expected loadSession support");
  }
  const loaded = await runtime.loadSession({
    sessionId: "persisted-42",
    cwd: "/tmp/loaded",
  });
  assert.equal(loaded.id, "persisted-42");
  assert.equal(loaded.cwd, "/tmp/loaded");
});

test("both: continueSession and loadSession present; guards narrow", async () => {
  const runtime = await fakeBoth().initialize();
  assert.equal(runtime.capabilities.continueSession, true);
  assert.equal(runtime.capabilities.loadSession, true);
  assert.equal(hasMethod(runtime, "continueSession"), true);
  assert.equal(hasMethod(runtime, "loadSession"), true);
  assert.equal(supportsContinueSession(runtime), true);
  assert.equal(supportsLoadSession(runtime), true);

  if (!supportsContinueSession(runtime) || !supportsLoadSession(runtime)) {
    assert.fail("expected both capabilities");
  }
  const loaded = await runtime.loadSession({ sessionId: "both-1", cwd: "/tmp/both" });
  const continued = await runtime.continueSession({
    sessionId: loaded.id,
    text: "next",
  });
  assert.equal(continued.sessionId, "both-1");
  assert.equal(continued.outputText, "continue:next");
});

test("mandatory method behavior: initialize, createSession, prompt, cancel, cancelled", async () => {
  const uninitialized = fakeCoreOnly();
  const runtime = await uninitialized.initialize();
  assert.equal(runtime.info.protocolVersion, 1);

  const session = await runtime.createSession({ cwd: "/tmp/core" });
  assert.deepEqual(session, { id: "sess-core", cwd: "/tmp/core" });

  const result = await runtime.prompt({ sessionId: session.id, text: "raw final" });
  assert.equal(result.outputText, "raw final");
  assert.equal(result.stopReason, "end_turn");
  // Fake runtime returns raw text only; no host schema validation here.
  assert.equal(typeof result.outputText, "string");

  const cancelled = await runtime.prompt({ sessionId: session.id, text: "cancel-me" });
  assert.equal(cancelled.stopReason, "cancelled");

  const cancelReturn = await runtime.cancel({ sessionId: session.id });
  assert.equal(cancelReturn, undefined);
});

test("compile-time capability and shape assertions", () => {
  // Reachable so the test runner counts it; bodies are compile-only.
  compileTimeAssertions();
});

function compileTimeAssertions(): void {
  const coreCaps = { continueSession: false, loadSession: false } as const;
  const continueCaps = { continueSession: true, loadSession: false } as const;
  const loadCaps = { continueSession: false, loadSession: true } as const;
  const bothCaps = { continueSession: true, loadSession: true } as const;

  coreCaps satisfies { continueSession: false; loadSession: false };
  continueCaps satisfies { continueSession: true; loadSession: false };
  loadCaps satisfies { continueSession: false; loadSession: true };
  bothCaps satisfies { continueSession: true; loadSession: true };

  if (false as boolean) {
    const core = null as unknown as InitializedAgentSessionRuntimeCoreOnly;
    const cont = null as unknown as InitializedAgentSessionRuntimeContinueOnly;
    const load = null as unknown as InitializedAgentSessionRuntimeLoadOnly;
    const both = null as unknown as InitializedAgentSessionRuntimeBoth;
    const anyInit = null as unknown as InitializedAgentSessionRuntime;

    // @ts-expect-error loadSession is absent when loadSession: false
    void core.loadSession({ sessionId: "x", cwd: "/" });
    // @ts-expect-error continueSession is absent when continueSession: false
    void core.continueSession({ sessionId: "x", text: "nope" });

    // @ts-expect-error loadSession is absent on continuation-only
    void cont.loadSession({ sessionId: "x", cwd: "/" });
    // @ts-expect-error continueSession is absent on loading-only
    void load.continueSession({ sessionId: "x", text: "nope" });

    void cont.continueSession({ sessionId: "x", text: "ok" });
    void load.loadSession({ sessionId: "x", cwd: "/" });
    void both.continueSession({ sessionId: "x", text: "ok" });
    void both.loadSession({ sessionId: "x", cwd: "/" });

    if (supportsContinueSession(anyInit)) {
      void anyInit.continueSession({ sessionId: "x", text: "ok" });
    }
    if (supportsLoadSession(anyInit)) {
      void anyInit.loadSession({ sessionId: "x", cwd: "/" });
    }

    const missingContinue = {
      info: INFO,
      capabilities: continueCaps,
      async createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
        return { id: "1", cwd: input.cwd };
      },
      async prompt(input: AgentPromptInput): Promise<AgentPromptResult> {
        return promptResult(input.sessionId, input.text);
      },
      async cancel(): Promise<void> {},
    };
    // @ts-expect-error true continueSession capability requires continueSession method
    missingContinue satisfies InitializedAgentSessionRuntimeContinueOnly;

    const missingLoad = {
      info: INFO,
      capabilities: loadCaps,
      async createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
        return { id: "1", cwd: input.cwd };
      },
      async prompt(input: AgentPromptInput): Promise<AgentPromptResult> {
        return promptResult(input.sessionId, input.text);
      },
      async cancel(): Promise<void> {},
    };
    // @ts-expect-error true loadSession capability requires loadSession method
    missingLoad satisfies InitializedAgentSessionRuntimeLoadOnly;

    const falseContinueWithMethod = {
      info: INFO,
      capabilities: coreCaps,
      async createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
        return { id: "1", cwd: input.cwd };
      },
      async prompt(input: AgentPromptInput): Promise<AgentPromptResult> {
        return promptResult(input.sessionId, input.text);
      },
      async cancel(): Promise<void> {},
      async continueSession(input: AgentPromptInput): Promise<AgentPromptResult> {
        return promptResult(input.sessionId, input.text);
      },
    };
    // @ts-expect-error continueSession method forbidden when continueSession: false
    falseContinueWithMethod satisfies InitializedAgentSessionRuntimeCoreOnly;

    const falseLoadWithMethod = {
      info: INFO,
      capabilities: coreCaps,
      async createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
        return { id: "1", cwd: input.cwd };
      },
      async prompt(input: AgentPromptInput): Promise<AgentPromptResult> {
        return promptResult(input.sessionId, input.text);
      },
      async cancel(): Promise<void> {},
      async loadSession(input: LoadAgentSessionInput): Promise<AgentSession> {
        return { id: input.sessionId, cwd: input.cwd };
      },
    };
    // @ts-expect-error loadSession method forbidden when loadSession: false
    falseLoadWithMethod satisfies InitializedAgentSessionRuntimeCoreOnly;

    ({
      info: INFO,
      capabilities: coreCaps,
      async createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
        return { id: "1", cwd: input.cwd };
      },
      async prompt(input: AgentPromptInput): Promise<AgentPromptResult> {
        return promptResult(input.sessionId, input.text);
      },
      async cancel(): Promise<void> {},
      // @ts-expect-error permanent run() abstraction is not part of the contract
      async run(): Promise<string> {
        return "nope";
      },
    }) satisfies InitializedAgentSessionRuntimeCoreOnly;

    ({
      info: INFO,
      capabilities: coreCaps,
      async createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
        return { id: "1", cwd: input.cwd };
      },
      async prompt(input: AgentPromptInput): Promise<AgentPromptResult> {
        return promptResult(input.sessionId, input.text);
      },
      async cancel(): Promise<void> {},
      // @ts-expect-error native steer is unsupported
      async steer(): Promise<void> {},
    }) satisfies InitializedAgentSessionRuntimeCoreOnly;

    ({
      info: INFO,
      capabilities: coreCaps,
      async createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
        return { id: "1", cwd: input.cwd };
      },
      async prompt(input: AgentPromptInput): Promise<AgentPromptResult> {
        return promptResult(input.sessionId, input.text);
      },
      async cancel(): Promise<void> {},
      // @ts-expect-error session closing is unsupported
      async closeSession(): Promise<void> {},
    }) satisfies InitializedAgentSessionRuntimeCoreOnly;

    ({
      info: INFO,
      capabilities: coreCaps,
      async createSession(input: CreateAgentSessionInput): Promise<AgentSession> {
        return { id: "1", cwd: input.cwd };
      },
      async prompt(input: AgentPromptInput): Promise<AgentPromptResult> {
        return promptResult(input.sessionId, input.text);
      },
      async cancel(): Promise<void> {},
      // @ts-expect-error session listing is unsupported
      async listSessions(): Promise<AgentSession[]> {
        return [];
      },
    }) satisfies InitializedAgentSessionRuntimeCoreOnly;
  }
}
