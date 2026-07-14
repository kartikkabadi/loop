import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
// Project emits JS without .d.ts; runtime values come from dist, types from src.
import { createCrabboxCliWorkspaceHost as createCrabboxCliWorkspaceHostJs } from "../dist/crabbox-workspace-host.js";
import type {
  CrabboxArtifactDownload,
  CrabboxCliWorkspaceHostOptions,
  CrabboxCommandExecutor,
  CrabboxCommandInvocation,
  CrabboxCommandOutcome,
  CrabboxWorkspaceHost,
  CrabboxWorkspaceRef,
  LaunchCrabboxWorkspaceInput,
} from "../src/crabbox-workspace-host.js";
import type * as CrabboxWorkspaceHostModule from "../src/crabbox-workspace-host.js";

const createCrabboxCliWorkspaceHost =
  createCrabboxCliWorkspaceHostJs as typeof CrabboxWorkspaceHostModule.createCrabboxCliWorkspaceHost;

const BOX_CLI = "box";
const REQUESTED_SLUG = "My Worker";
const CANONICAL_ID = "cbx_0123456789ab";
const ACTUAL_SLUG = "my-worker-a1b2";
const SOURCE_DIR = "/tmp/loop-phase-2c-source";

type RecordingExecutor = CrabboxCommandExecutor & {
  readonly calls: CrabboxCommandInvocation[];
};

function timingStderr(overrides: Record<string, unknown> = {}): string {
  return `${JSON.stringify({
    provider: "ascii-box",
    leaseId: CANONICAL_ID,
    slug: ACTUAL_SLUG,
    exitCode: 0,
    totalMs: 12,
    ...overrides,
  })}\n`;
}

function recordingExecutor(
  outcome: CrabboxCommandOutcome = {
    exitCode: 0,
    stdout: "ok",
    stderr: timingStderr(),
  },
): RecordingExecutor {
  const calls: CrabboxCommandInvocation[] = [];
  return {
    calls,
    async execute(invocation) {
      calls.push(invocation);
      return outcome;
    },
  };
}

function sequenceExecutor(outcomes: readonly CrabboxCommandOutcome[]): RecordingExecutor {
  const calls: CrabboxCommandInvocation[] = [];
  let index = 0;
  return {
    calls,
    async execute(invocation) {
      calls.push(invocation);
      const outcome = outcomes[index] ?? outcomes[outcomes.length - 1]!;
      index += 1;
      return outcome;
    },
  };
}

function rejectingExecutor(error: Error): RecordingExecutor {
  const calls: CrabboxCommandInvocation[] = [];
  return {
    calls,
    async execute(invocation) {
      calls.push(invocation);
      throw error;
    },
  };
}

function createHost(
  executor: CrabboxCommandExecutor,
  overrides: Partial<CrabboxCliWorkspaceHostOptions> = {},
): CrabboxWorkspaceHost {
  return createCrabboxCliWorkspaceHost({
    executor,
    asciiBoxCliPath: BOX_CLI,
    ...overrides,
  });
}

function workspaceRef(
  id = CANONICAL_ID,
  slug: string | undefined = ACTUAL_SLUG,
): CrabboxWorkspaceRef {
  return slug === undefined ? { id, provider: "ascii-box" } : { id, slug, provider: "ascii-box" };
}

function assertAsciiBoxCommon(
  invocation: CrabboxCommandInvocation,
  expectedCommand: string,
  identityFlag: "--id" | "--slug",
  identityValue: string,
): void {
  assert.equal(invocation.command, "crabbox");
  assert.equal(invocation.args[0], expectedCommand);
  const args = [...invocation.args];
  assert.ok(args.includes("--provider"));
  assert.equal(args[args.indexOf("--provider") + 1], "ascii-box");
  assert.ok(args.includes("--ascii-box-cli"));
  assert.equal(args[args.indexOf("--ascii-box-cli") + 1], BOX_CLI);
  assert.ok(args.includes(identityFlag));
  assert.equal(args[args.indexOf(identityFlag) + 1], identityValue);
}

test("complete lifecycle ordering records six invocations with shared sourceDir", async () => {
  const ok: CrabboxCommandOutcome = { exitCode: 0, stdout: "ok", stderr: "" };
  const executor = sequenceExecutor([
    { exitCode: 0, stdout: "leased", stderr: timingStderr() },
    ok,
    ok,
    ok,
    ok,
    ok,
  ]);
  const host = createHost(executor);
  const artifacts: CrabboxArtifactDownload[] = [
    { remotePath: "out/result.json", localPath: "/tmp/result.json", required: true },
  ];

  const acquired = await host.acquire({
    requestedSlug: REQUESTED_SLUG,
    sourceDir: SOURCE_DIR,
  });
  assert.equal(acquired.status, "acquired");
  assert.deepEqual(acquired.workspace, workspaceRef());
  await host.sync({ workspace: acquired.workspace!, sourceDir: SOURCE_DIR });
  await host.launch({
    workspace: acquired.workspace!,
    sourceDir: SOURCE_DIR,
    command: "node worker.js",
  });
  await host.observe({ workspace: acquired.workspace! });
  await host.collect({
    workspace: acquired.workspace!,
    sourceDir: SOURCE_DIR,
    artifacts,
  });
  await host.stop({ workspace: acquired.workspace! });

  assert.equal(executor.calls.length, 6);
  assert.deepEqual(
    executor.calls.map((call) => call.args[0]),
    ["warmup", "run", "run", "status", "run", "stop"],
  );
  assert.equal(executor.calls[0]!.cwd, SOURCE_DIR);
  assert.equal(executor.calls[1]!.cwd, SOURCE_DIR);
  assert.equal(executor.calls[2]!.cwd, SOURCE_DIR);
  assert.equal(executor.calls[4]!.cwd, SOURCE_DIR);

  assertAsciiBoxCommon(executor.calls[0]!, "warmup", "--slug", REQUESTED_SLUG);
  assertAsciiBoxCommon(executor.calls[1]!, "run", "--id", CANONICAL_ID);
  assertAsciiBoxCommon(executor.calls[2]!, "run", "--id", CANONICAL_ID);
  assertAsciiBoxCommon(executor.calls[3]!, "status", "--id", CANONICAL_ID);
  assertAsciiBoxCommon(executor.calls[4]!, "run", "--id", CANONICAL_ID);
  assertAsciiBoxCommon(executor.calls[5]!, "stop", "--id", CANONICAL_ID);

  for (const call of executor.calls.slice(1)) {
    assert.ok(!call.args.includes(REQUESTED_SLUG));
    assert.ok(!call.args.includes(ACTUAL_SLUG) || call.args.includes("--id"));
    assert.equal(call.args[call.args.indexOf("--id") + 1], CANONICAL_ID);
  }
});

test("acquire uses sourceDir cwd, --timing-json, and returns canonical identity", async () => {
  const outcome: CrabboxCommandOutcome = {
    exitCode: 0,
    stdout: "leased My Worker\nready\n",
    stderr: `noise line\n${timingStderr()}`,
  };
  const executor = recordingExecutor(outcome);
  const host = createHost(executor);
  const result = await host.acquire({
    requestedSlug: REQUESTED_SLUG,
    sourceDir: SOURCE_DIR,
  });

  assert.equal(result.status, "acquired");
  assert.deepEqual(result.workspace, {
    id: CANONICAL_ID,
    slug: ACTUAL_SLUG,
    provider: "ascii-box",
  });
  assert.equal(result.outcome, outcome);
  assert.notEqual(result.workspace!.id, REQUESTED_SLUG);
  assert.deepEqual(executor.calls[0], {
    command: "crabbox",
    args: [
      "warmup",
      "--provider",
      "ascii-box",
      "--ascii-box-cli",
      BOX_CLI,
      "--slug",
      REQUESTED_SLUG,
      "--timing-json",
    ],
    cwd: SOURCE_DIR,
  });
  assert.ok(!executor.calls[0]!.args.includes("--lease-output"));
  assert.ok(!executor.calls[0]!.args.includes("--id"));
});

test("requested slug is never reused as operational --id after normalization", async () => {
  const executor = sequenceExecutor([
    {
      exitCode: 0,
      stdout: "leased",
      stderr: timingStderr({ leaseId: CANONICAL_ID, slug: ACTUAL_SLUG }),
    },
    { exitCode: 0, stdout: "synced", stderr: "" },
    { exitCode: 0, stdout: "ran", stderr: "" },
    { exitCode: 0, stdout: "status", stderr: "" },
    { exitCode: 0, stdout: "collected", stderr: "" },
    { exitCode: 0, stdout: "stopped", stderr: "" },
  ]);
  const host = createHost(executor);
  const acquired = await host.acquire({
    requestedSlug: REQUESTED_SLUG,
    sourceDir: SOURCE_DIR,
  });
  assert.equal(acquired.status, "acquired");
  const workspace = acquired.workspace!;
  assert.equal(workspace.id, CANONICAL_ID);
  assert.equal(workspace.slug, ACTUAL_SLUG);

  await host.sync({ workspace, sourceDir: SOURCE_DIR });
  await host.launch({ workspace, sourceDir: SOURCE_DIR, command: "true" });
  await host.observe({ workspace });
  await host.collect({
    workspace,
    sourceDir: SOURCE_DIR,
    artifacts: [{ remotePath: "out/x", localPath: "/tmp/x", required: true }],
  });
  await host.stop({ workspace });

  for (const call of executor.calls.slice(1)) {
    assert.ok(call.args.includes("--id"));
    assert.equal(call.args[call.args.indexOf("--id") + 1], CANONICAL_ID);
    assert.ok(!call.args.includes(REQUESTED_SLUG));
    assert.ok(!call.args.includes("--slug"));
  }
});

test("nonzero warmup produces failed acquire with null workspace", async () => {
  const outcome: CrabboxCommandOutcome = {
    exitCode: 7,
    stdout: "warmup-out",
    stderr: timingStderr({ exitCode: 7 }),
  };
  const executor = recordingExecutor(outcome);
  const host = createHost(executor);
  const result = await host.acquire({
    requestedSlug: REQUESTED_SLUG,
    sourceDir: SOURCE_DIR,
  });

  assert.equal(result.status, "failed");
  assert.equal(result.workspace, null);
  assert.equal(result.reason, "command_failed");
  assert.equal(result.outcome, outcome);
});

test("malformed or missing timing record produces identity_unavailable", async () => {
  const cases: Array<{ name: string; stderr: string }> = [
    { name: "empty stderr", stderr: "" },
    { name: "human leased line only", stderr: "leased cbx_0123456789ab my-worker\n" },
    { name: "malformed json", stderr: "{not-json\n" },
    {
      name: "array timing",
      stderr: '[{"leaseId":"cbx_0123456789ab","provider":"ascii-box","exitCode":0}]\n',
    },
    { name: "primitive timing", stderr: '"cbx_0123456789ab"\n' },
    {
      name: "missing leaseId",
      stderr: '{"provider":"ascii-box","slug":"x","exitCode":0}\n',
    },
    {
      name: "non-canonical leaseId",
      stderr: '{"provider":"ascii-box","leaseId":"My Worker","slug":"x","exitCode":0}\n',
    },
    {
      name: "non-integer exitCode",
      stderr: '{"provider":"ascii-box","leaseId":"cbx_0123456789ab","exitCode":1.5}\n',
    },
  ];

  for (const testCase of cases) {
    const outcome: CrabboxCommandOutcome = {
      exitCode: 0,
      stdout: "ok",
      stderr: testCase.stderr,
    };
    const executor = recordingExecutor(outcome);
    const host = createHost(executor);
    const result = await host.acquire({
      requestedSlug: REQUESTED_SLUG,
      sourceDir: SOURCE_DIR,
    });
    assert.equal(result.status, "failed", testCase.name);
    assert.equal(result.workspace, null, testCase.name);
    assert.equal(result.reason, "identity_unavailable", testCase.name);
    assert.equal(result.outcome, outcome, testCase.name);
    // Host-owned reason only — raw timing diagnostics must not appear in reason.
    assert.doesNotMatch(result.reason, /cbx_|leased|not-json|warmup/i);
  }
});

test("wrong provider timing record is rejected", async () => {
  const outcome: CrabboxCommandOutcome = {
    exitCode: 0,
    stdout: "ok",
    stderr: timingStderr({ provider: "aws" }),
  };
  const executor = recordingExecutor(outcome);
  const host = createHost(executor);
  const result = await host.acquire({
    requestedSlug: REQUESTED_SLUG,
    sourceDir: SOURCE_DIR,
  });
  assert.equal(result.status, "failed");
  assert.equal(result.workspace, null);
  assert.equal(result.reason, "identity_unavailable");
});

test("timing parser selects the final valid timing JSON object", async () => {
  const stderr = [
    "warmup starting",
    timingStderr({ leaseId: "cbx_aaaaaaaaaaaa", slug: "first" }).trim(),
    "still warming",
    "{broken",
    timingStderr({ leaseId: CANONICAL_ID, slug: ACTUAL_SLUG }).trim(),
    "",
  ].join("\n");
  const executor = recordingExecutor({ exitCode: 0, stdout: "", stderr });
  const host = createHost(executor);
  const result = await host.acquire({
    requestedSlug: REQUESTED_SLUG,
    sourceDir: SOURCE_DIR,
  });
  assert.equal(result.status, "acquired");
  assert.equal(result.workspace!.id, CANONICAL_ID);
  assert.equal(result.workspace!.slug, ACTUAL_SLUG);
});

test("sync maps to run --sync-only with cwd and without --no-sync", async () => {
  const executor = recordingExecutor();
  const host = createHost(executor);
  const workspace = workspaceRef();
  await host.sync({ workspace, sourceDir: SOURCE_DIR });

  assert.deepEqual(executor.calls[0], {
    command: "crabbox",
    args: [
      "run",
      "--provider",
      "ascii-box",
      "--ascii-box-cli",
      BOX_CLI,
      "--id",
      CANONICAL_ID,
      "--sync-only",
    ],
    cwd: SOURCE_DIR,
  });
  const args = executor.calls[0]!.args;
  assert.ok(!args.includes("--no-sync"));
  assert.ok(!args.includes("--require-artifact"));
  assert.ok(!args.includes("--download"));
  assert.ok(!args.includes("--shell"));
  assert.ok(!("stdin" in (executor.calls[0] as object)));
  assert.ok(!("input" in (executor.calls[0] as object)));
});

test("launch maps worker shell command with --no-sync and rejects duplex fields", async () => {
  const outcome: CrabboxCommandOutcome = {
    exitCode: 0,
    stdout: "worker-done",
    stderr: "",
  };
  const executor = recordingExecutor(outcome);
  const host = createHost(executor);
  const workspace = workspaceRef();
  const result = await host.launch({
    workspace,
    sourceDir: SOURCE_DIR,
    command: "node ./box-worker.js --once",
  });

  assert.equal(result, outcome);
  assert.deepEqual(executor.calls[0], {
    command: "crabbox",
    args: [
      "run",
      "--provider",
      "ascii-box",
      "--ascii-box-cli",
      BOX_CLI,
      "--id",
      CANONICAL_ID,
      "--no-sync",
      "--shell",
      "--",
      "node ./box-worker.js --once",
    ],
    cwd: SOURCE_DIR,
  });
  assert.ok(!("stdin" in (executor.calls[0] as object)));
  assert.ok(!("input" in (executor.calls[0] as object)));

  if (false as boolean) {
    const bad = null as unknown as LaunchCrabboxWorkspaceInput;
    // @ts-expect-error launch input must not accept stdin
    void host.launch({ ...bad, stdin: "x" });
    // @ts-expect-error launch input must not accept input
    void host.launch({ ...bad, input: "x" });
    // @ts-expect-error launch input must not accept sessionId
    void host.launch({ ...bad, sessionId: "s" });
    // @ts-expect-error launch input must not accept acpMessages
    void host.launch({ ...bad, acpMessages: [] });
  }
});

test("observe maps to status for the exact canonical workspace", async () => {
  const executor = recordingExecutor({ exitCode: 0, stdout: "ready", stderr: "" });
  const host = createHost(executor);
  await host.observe({ workspace: workspaceRef() });
  assert.deepEqual(executor.calls[0], {
    command: "crabbox",
    args: ["status", "--provider", "ascii-box", "--ascii-box-cli", BOX_CLI, "--id", CANONICAL_ID],
  });
});

test("collect maps to --no-sync no-op run with require/download for every artifact", async () => {
  const executor = recordingExecutor();
  const host = createHost(executor);
  const artifacts: CrabboxArtifactDownload[] = [
    { remotePath: "a/required.json", localPath: "/tmp/a.json", required: true },
    { remotePath: "c/needed.txt", localPath: "/tmp/c.txt", required: true },
  ];
  await host.collect({
    workspace: workspaceRef(),
    sourceDir: SOURCE_DIR,
    artifacts,
  });

  assert.deepEqual(executor.calls[0], {
    command: "crabbox",
    args: [
      "run",
      "--provider",
      "ascii-box",
      "--ascii-box-cli",
      BOX_CLI,
      "--id",
      CANONICAL_ID,
      "--no-sync",
      "--require-artifact",
      "a/required.json",
      "--download",
      "a/required.json=/tmp/a.json",
      "--require-artifact",
      "c/needed.txt",
      "--download",
      "c/needed.txt=/tmp/c.txt",
      "--shell",
      "--",
      "true",
    ],
    cwd: SOURCE_DIR,
  });

  if (false as boolean) {
    const bad: CrabboxArtifactDownload = {
      remotePath: "b/optional.log",
      localPath: "/tmp/b.log",
      // @ts-expect-error optional downloads are not part of the contract
      required: false,
    };
    void bad;
  }
});

test("stop maps to stop for the exact workspace only", async () => {
  const executor = recordingExecutor();
  const host = createHost(executor);
  await host.stop({ workspace: workspaceRef() });
  assert.deepEqual(executor.calls[0], {
    command: "crabbox",
    args: ["stop", "--provider", "ascii-box", "--ascii-box-cli", BOX_CLI, "--id", CANONICAL_ID],
  });
  assert.ok(!executor.calls[0]!.args.includes("--reclaim"));
  assert.ok(!executor.calls[0]!.args.includes("--all"));
});

test("validation failures reject before calling the executor", async () => {
  const cases: Array<{
    name: string;
    run: (host: CrabboxWorkspaceHost, executor: RecordingExecutor) => Promise<unknown>;
    message: RegExp;
  }> = [
    {
      name: "empty crabbox command",
      run: async () => {
        const executor = recordingExecutor();
        createCrabboxCliWorkspaceHost({
          executor,
          crabboxCommand: "",
          asciiBoxCliPath: BOX_CLI,
        });
        assert.equal(executor.calls.length, 0);
      },
      message: /Crabbox command must be non-empty/,
    },
    {
      name: "empty ASCII Box CLI path",
      run: async () => {
        const executor = recordingExecutor();
        createCrabboxCliWorkspaceHost({
          executor,
          asciiBoxCliPath: "",
        });
        assert.equal(executor.calls.length, 0);
      },
      message: /ASCII Box CLI path must be non-empty/,
    },
    {
      name: "NUL in Crabbox command",
      run: async () => {
        createCrabboxCliWorkspaceHost({
          executor: recordingExecutor(),
          crabboxCommand: "crab\0box",
          asciiBoxCliPath: BOX_CLI,
        });
      },
      message: /Crabbox command must not contain NUL bytes/,
    },
    {
      name: "NUL in ASCII Box CLI path",
      run: async () => {
        createCrabboxCliWorkspaceHost({
          executor: recordingExecutor(),
          asciiBoxCliPath: "/bad\0/box",
        });
      },
      message: /ASCII Box CLI path must not contain NUL bytes/,
    },
    {
      name: "empty requested slug",
      run: (host) => host.acquire({ requestedSlug: "", sourceDir: SOURCE_DIR }),
      message: /Requested slug must be non-empty/,
    },
    {
      name: "NUL in requested slug",
      run: (host) => host.acquire({ requestedSlug: "bad\0id", sourceDir: SOURCE_DIR }),
      message: /Requested slug must not contain NUL bytes/,
    },
    {
      name: "empty source directory on acquire",
      run: (host) => host.acquire({ requestedSlug: REQUESTED_SLUG, sourceDir: "" }),
      message: /Source directory must be non-empty/,
    },
    {
      name: "NUL in source directory on acquire",
      run: (host) => host.acquire({ requestedSlug: REQUESTED_SLUG, sourceDir: "a\0b" }),
      message: /Source directory must not contain NUL bytes/,
    },
    {
      name: "empty source directory on sync",
      run: (host) => host.sync({ workspace: workspaceRef(), sourceDir: "" }),
      message: /Source directory must be non-empty/,
    },
    {
      name: "NUL in source directory on sync",
      run: (host) => host.sync({ workspace: workspaceRef(), sourceDir: "a\0b" }),
      message: /Source directory must not contain NUL bytes/,
    },
    {
      name: "empty launch command",
      run: (host) => host.launch({ workspace: workspaceRef(), sourceDir: SOURCE_DIR, command: "" }),
      message: /Launch command must be non-empty/,
    },
    {
      name: "NUL in launch command",
      run: (host) =>
        host.launch({
          workspace: workspaceRef(),
          sourceDir: SOURCE_DIR,
          command: "echo\0x",
        }),
      message: /Launch command must not contain NUL bytes/,
    },
    {
      name: "non-canonical workspace id on sync",
      run: (host) =>
        host.sync({
          workspace: { id: "My Worker", provider: "ascii-box" },
          sourceDir: SOURCE_DIR,
        }),
      message: /Workspace ID must be a canonical cbx_ lease ID/,
    },
    {
      name: "mismatched workspace provider",
      run: (host) =>
        host.observe({
          workspace: {
            id: CANONICAL_ID,
            provider: "aws" as "ascii-box",
          },
        }),
      message: /Workspace provider must be "ascii-box"/,
    },
    {
      name: "empty artifact list",
      run: (host) =>
        host.collect({ workspace: workspaceRef(), sourceDir: SOURCE_DIR, artifacts: [] }),
      message: /Artifact list must be non-empty/,
    },
    {
      name: "empty remote artifact path",
      run: (host) =>
        host.collect({
          workspace: workspaceRef(),
          sourceDir: SOURCE_DIR,
          artifacts: [{ remotePath: "", localPath: "/tmp/x", required: true }],
        }),
      message: /Artifact remote path must be non-empty/,
    },
    {
      name: "empty local artifact path",
      run: (host) =>
        host.collect({
          workspace: workspaceRef(),
          sourceDir: SOURCE_DIR,
          artifacts: [{ remotePath: "out/x", localPath: "", required: true }],
        }),
      message: /Artifact local path must be non-empty/,
    },
    {
      name: "absolute remote artifact path",
      run: (host) =>
        host.collect({
          workspace: workspaceRef(),
          sourceDir: SOURCE_DIR,
          artifacts: [{ remotePath: "/abs/x", localPath: "/tmp/x", required: true }],
        }),
      message: /Artifact remote path must be relative/,
    },
    {
      name: "remote path with .. segment",
      run: (host) =>
        host.collect({
          workspace: workspaceRef(),
          sourceDir: SOURCE_DIR,
          artifacts: [{ remotePath: "a/../b", localPath: "/tmp/x", required: true }],
        }),
      message: /Artifact remote path must not contain '\.' or '\.\.' segments/,
    },
    {
      name: "remote path with . segment",
      run: (host) =>
        host.collect({
          workspace: workspaceRef(),
          sourceDir: SOURCE_DIR,
          artifacts: [{ remotePath: "a/./b", localPath: "/tmp/x", required: true }],
        }),
      message: /Artifact remote path must not contain '\.' or '\.\.' segments/,
    },
    {
      name: "remote path contains =",
      run: (host) =>
        host.collect({
          workspace: workspaceRef(),
          sourceDir: SOURCE_DIR,
          artifacts: [{ remotePath: "a=b", localPath: "/tmp/x", required: true }],
        }),
      message: /Artifact path must not contain '='/,
    },
    {
      name: "local path contains =",
      run: (host) =>
        host.collect({
          workspace: workspaceRef(),
          sourceDir: SOURCE_DIR,
          artifacts: [{ remotePath: "a/b", localPath: "/tmp/x=y", required: true }],
        }),
      message: /Artifact path must not contain '='/,
    },
    {
      name: "duplicate remote artifact mapping",
      run: (host) =>
        host.collect({
          workspace: workspaceRef(),
          sourceDir: SOURCE_DIR,
          artifacts: [
            { remotePath: "out/x", localPath: "/tmp/1", required: true },
            { remotePath: "out/x", localPath: "/tmp/2", required: true },
          ],
        }),
      message: /Duplicate artifact remote path/,
    },
    {
      name: "duplicate local artifact destination",
      run: (host) =>
        host.collect({
          workspace: workspaceRef(),
          sourceDir: SOURCE_DIR,
          artifacts: [
            { remotePath: "out/a", localPath: "/tmp/same", required: true },
            { remotePath: "out/b", localPath: "/tmp/same", required: true },
          ],
        }),
      message: /Duplicate artifact local path/,
    },
    {
      name: "required false rejected at runtime",
      run: (host) =>
        host.collect({
          workspace: workspaceRef(),
          sourceDir: SOURCE_DIR,
          artifacts: [
            {
              remotePath: "b/optional.log",
              localPath: "/tmp/b.log",
              required: false as true,
            },
          ],
        }),
      message: /Artifact downloads must be required/,
    },
  ];

  for (const testCase of cases) {
    const executor = recordingExecutor();
    const host = createHost(executor);
    await assert.rejects(
      async () => {
        await testCase.run(host, executor);
      },
      testCase.message,
      testCase.name,
    );
    assert.equal(executor.calls.length, 0, `${testCase.name} must not call executor`);
  }
});

test("immutability: host does not mutate frozen options, workspace, artifacts, or launch input", async () => {
  const executor = sequenceExecutor([
    { exitCode: 0, stdout: "leased", stderr: timingStderr() },
    { exitCode: 0, stdout: "ok", stderr: "" },
    { exitCode: 0, stdout: "ok", stderr: "" },
    { exitCode: 0, stdout: "ok", stderr: "" },
    { exitCode: 0, stdout: "ok", stderr: "" },
    { exitCode: 0, stdout: "ok", stderr: "" },
  ]);
  const options = Object.freeze({
    executor,
    asciiBoxCliPath: BOX_CLI,
    crabboxCommand: "crabbox",
  } satisfies CrabboxCliWorkspaceHostOptions);
  const host = createCrabboxCliWorkspaceHost(options);
  const workspace = Object.freeze(workspaceRef());
  const artifact = Object.freeze({
    remotePath: "out/result.json",
    localPath: "/tmp/result.json",
    required: true,
  } satisfies CrabboxArtifactDownload);
  const artifacts = Object.freeze([artifact]);
  const launchInput = Object.freeze({
    workspace,
    sourceDir: SOURCE_DIR,
    command: "true",
  } satisfies LaunchCrabboxWorkspaceInput);

  const acquired = await host.acquire({
    requestedSlug: REQUESTED_SLUG,
    sourceDir: SOURCE_DIR,
  });
  assert.equal(acquired.status, "acquired");
  await host.sync({ workspace, sourceDir: SOURCE_DIR });
  await host.launch(launchInput);
  await host.observe({ workspace });
  await host.collect({ workspace, sourceDir: SOURCE_DIR, artifacts });
  await host.stop({ workspace });

  assert.equal(options.asciiBoxCliPath, BOX_CLI);
  assert.equal(workspace.id, CANONICAL_ID);
  assert.equal(artifact.remotePath, "out/result.json");
  assert.equal(artifacts.length, 1);
  assert.equal(launchInput.command, "true");
});

test("executor failures propagate the exact error object", async () => {
  const sentinel = new Error("executor-sentinel");
  const executor = rejectingExecutor(sentinel);
  const host = createHost(executor);
  await assert.rejects(
    () => host.observe({ workspace: workspaceRef() }),
    (error: unknown) => {
      assert.equal(error, sentinel);
      return true;
    },
  );
});

test("scope and dependency audit for crabbox-workspace-host", () => {
  const sourcePath = join(process.cwd(), "src/crabbox-workspace-host.ts");
  const source = readFileSync(sourcePath, "utf8");
  const executable = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

  const forbiddenExecutable = [
    /from\s+["'].*agent-session-runtime/,
    /from\s+["'].*codex/,
    /from\s+["'].*devin/i,
    /child_process/,
    /process\.env/,
    /from\s+["'].*github/i,
    /cloudflare/i,
    /\bspawn\s*\(/,
    /\bexecFile\s*\(/,
    /\brunText\b/,
  ];
  for (const pattern of forbiddenExecutable) {
    assert.equal(pattern.test(executable), false, `source must not match ${pattern}`);
  }

  assert.match(source, /not a duplex ACP transport/);
  assert.match(source, /No method accepts protocol stdin/);
  assert.match(source, /one-shot/);
  assert.match(source, /Any ACP client must run locally inside the Box/);
  assert.match(source, /launches the Box worker and collects artifacts only/);
  assert.match(source, /--no-sync/);
  assert.match(source, /timing-json/);
  assert.doesNotMatch(executable, /stdin\s*:/);
  assert.doesNotMatch(executable, /stdio\s*:/);
  assert.doesNotMatch(executable, /createSession|prompt\(|continueSession/);

  const srcRoot = join(process.cwd(), "src");
  const productionFiles = walkTsFiles(srcRoot).filter(
    (path) => !path.endsWith("crabbox-workspace-host.ts"),
  );
  for (const file of productionFiles) {
    const text = readFileSync(file, "utf8");
    assert.equal(
      text.includes("crabbox-workspace-host"),
      false,
      `${file} must not import crabbox-workspace-host yet`,
    );
  }
});

function walkTsFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkTsFiles(path));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".ts")) {
      files.push(path);
    }
  }
  return files;
}
