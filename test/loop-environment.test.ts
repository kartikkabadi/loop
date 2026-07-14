import assert from "node:assert/strict";
import test from "node:test";

import {
  buildLoopAgentContextPack,
  hashLoopEnvironmentContext,
  prependLoopAgentContext,
  validateLoopEnvironmentContext,
  type LoopEnvironmentContext,
} from "../dist/loop/environment.js";

function environment(overrides: Partial<LoopEnvironmentContext> = {}): LoopEnvironmentContext {
  return {
    version: 1,
    platform: "linux-box",
    packageManager: "pnpm",
    requiredTools: ["node", "pnpm", "git", "devin", "agent-browser", "sfw"],
    authorityFiles: ["README.md", "AGENTS.md"],
    instructionFiles: ["CONTRIBUTING.md"],
    verificationCommands: ["pnpm run check", "pnpm run test:e2e"],
    networkPolicy: "allowlisted",
    browserAvailable: true,
    humanGates: ["plan", "dispatch", "review", "acceptance"],
    provider: { executor: "devin", model: "SWE-1.7", reviewer: "human" },
    knownConstraints: ["do not change production secrets", "do not merge"],
    ...overrides,
  };
}

function pack() {
  return buildLoopAgentContextPack({
    taskId: "task-environment-1",
    project: "sample-project",
    repository: {
      owner: "example",
      name: "sample-project",
      baseBranch: "main",
      baseSha: "abcdef1234567",
    },
    decisions: ["keep the change reviewable"],
    openQuestions: ["which staging URL should be used?"],
    relevantPaths: ["src/", "test/"],
    environment: environment(),
  });
}

test("environment context requires authority, verification, and human gates", () => {
  const diagnostics = validateLoopEnvironmentContext(
    environment({
      authorityFiles: [],
      verificationCommands: [],
      humanGates: ["plan", "dispatch"],
      provider: { executor: "devin", model: "SWE-1.7", reviewer: "claude" },
    }),
  );
  assert.match(diagnostics.join("\n"), /authority file/);
  assert.match(diagnostics.join("\n"), /verification command/);
  assert.match(diagnostics.join("\n"), /review/);
  assert.match(diagnostics.join("\n"), /acceptance/);
});

test("agent context packs are deterministic and expose the environment boundary", () => {
  const first = pack();
  const second = pack();
  assert.equal(first.environmentHash, second.environmentHash);
  assert.match(first.text, /AUTHORITY FILES/);
  assert.match(first.text, /agent-browser/);
  assert.match(first.text, /pnpm run check/);
  assert.match(first.text, /Never merge/);
  assert.match(first.text, /SWE-1\.7/);
});

test("environment hashes change when the tool contract changes", () => {
  assert.notEqual(
    hashLoopEnvironmentContext(environment()),
    hashLoopEnvironmentContext(
      environment({
        browserAvailable: false,
      }),
    ),
  );
});

test("agent context is prepended before the task prompt", () => {
  const result = prependLoopAgentContext("Implement the requested change.", pack());
  assert.ok(result.indexOf("LOOP AGENT ENVIRONMENT CONTEXT") < result.indexOf("TASK PROMPT"));
  assert.match(result, /Implement the requested change\./);
});

test("agent context refuses prompts that would exceed the bounded envelope", () => {
  assert.throws(
    () => prependLoopAgentContext("x".repeat(24_000), pack()),
    /combined agent prompt exceeds/,
  );
});
