import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
// Project emits JS without .d.ts; runtime values come from dist, types from src.
// @ts-expect-error -- no declaration emit for dist/*.js (same as Phase 2A/2B tests)
import { createCrabboxCliWorkspaceHost } from "../dist/crabbox-workspace-host.js";
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

const BOX_CLI = "/Users/user/.ascii/bin/box";
const WORKSPACE_ID = "loop-phase-2c-workspace";
const SOURCE_DIR = "/tmp/loop-phase-2c-source";

type RecordingExecutor = CrabboxCommandExecutor & {
  readonly calls: CrabboxCommandInvocation[];
};

function recordingExecutor(
  outcome: CrabboxCommandOutcome = { exitCode: 0, stdout: "ok", stderr: "" },
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

function workspaceRef(id = WORKSPACE_ID): CrabboxWorkspaceRef {
  return { id, provider: "ascii-box" };
}

function assertAsciiBoxCommon(
  invocation: CrabboxCommandInvocation,
  expectedCommand: string,
  identityFlag: "--id" | "--slug",
): void {
  assert.equal(invocation.command, "crabbox");
  assert.equal(invocation.args[0], expectedCommand);
  const args = [...invocation.args];
  assert.ok(args.includes("--provider"));
  assert.equal(args[args.indexOf("--provider") + 1], "ascii-box");
  assert.ok(args.includes("--ascii-box-cli"));
  assert.equal(args[args.indexOf("--ascii-box-cli") + 1], BOX_CLI);
  assert.ok(args.includes(identityFlag));
  assert.equal(args[args.indexOf(identityFlag) + 1], WORKSPACE_ID);
}

test("complete lifecycle ordering records six invocations", async () => {
  const executor = recordingExecutor({ exitCode: 0, stdout: "lifecycle", stderr: "" });
  const host = createHost(executor);
  const artifacts: CrabboxArtifactDownload[] = [
    { remotePath: "out/result.json", localPath: "/tmp/result.json", required: true },
  ];

  const acquired = await host.acquire({ workspaceId: WORKSPACE_ID });
  assert.deepEqual(acquired.workspace, workspaceRef());
  await host.sync({ workspace: acquired.workspace, sourceDir: SOURCE_DIR });
  await host.launch({
    workspace: acquired.workspace,
    sourceDir: SOURCE_DIR,
    command: "node worker.js",
  });
  await host.observe({ workspace: acquired.workspace });
  await host.collect({
    workspace: acquired.workspace,
    sourceDir: SOURCE_DIR,
    artifacts,
  });
  await host.stop({ workspace: acquired.workspace });

  assert.equal(executor.calls.length, 6);
  assert.deepEqual(
    executor.calls.map((call) => call.args[0]),
    ["warmup", "run", "run", "status", "run", "stop"],
  );

  assertAsciiBoxCommon(executor.calls[0]!, "warmup", "--slug");
  assertAsciiBoxCommon(executor.calls[1]!, "run", "--id");
  assertAsciiBoxCommon(executor.calls[2]!, "run", "--id");
  assertAsciiBoxCommon(executor.calls[3]!, "status", "--id");
  assertAsciiBoxCommon(executor.calls[4]!, "run", "--id");
  assertAsciiBoxCommon(executor.calls[5]!, "stop", "--id");
});

test("acquire maps to warmup without --lease-output and forwards outcome", async () => {
  const outcome: CrabboxCommandOutcome = {
    exitCode: 7,
    stdout: "warmup-out",
    stderr: "warmup-err",
  };
  const executor = recordingExecutor(outcome);
  const host = createHost(executor);
  const result = await host.acquire({ workspaceId: WORKSPACE_ID });

  assert.deepEqual(result.workspace, workspaceRef());
  assert.equal(result.outcome, outcome);
  assert.deepEqual(executor.calls[0], {
    command: "crabbox",
    args: ["warmup", "--provider", "ascii-box", "--ascii-box-cli", BOX_CLI, "--slug", WORKSPACE_ID],
  });
  assert.ok(!executor.calls[0]!.args.includes("--lease-output"));
  assert.ok(!executor.calls[0]!.args.includes("--id"));
});

test("sync maps to run --sync-only with cwd and no artifact flags", async () => {
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
      WORKSPACE_ID,
      "--sync-only",
    ],
    cwd: SOURCE_DIR,
  });
  const args = executor.calls[0]!.args;
  assert.ok(!args.includes("--require-artifact"));
  assert.ok(!args.includes("--download"));
  assert.ok(!args.includes("--shell"));
  assert.ok(!("stdin" in (executor.calls[0] as object)));
  assert.ok(!("input" in (executor.calls[0] as object)));
});

test("launch maps worker shell command and rejects duplex fields at compile time", async () => {
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
      WORKSPACE_ID,
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

test("observe maps to status for the exact workspace", async () => {
  const executor = recordingExecutor({ exitCode: 0, stdout: "ready", stderr: "" });
  const host = createHost(executor);
  await host.observe({ workspace: workspaceRef() });
  assert.deepEqual(executor.calls[0], {
    command: "crabbox",
    args: ["status", "--provider", "ascii-box", "--ascii-box-cli", BOX_CLI, "--id", WORKSPACE_ID],
  });
});

test("collect maps to no-op run with require/download flags in input order", async () => {
  const executor = recordingExecutor();
  const host = createHost(executor);
  const artifacts: CrabboxArtifactDownload[] = [
    { remotePath: "a/required.json", localPath: "/tmp/a.json", required: true },
    { remotePath: "b/optional.log", localPath: "/tmp/b.log", required: false },
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
      WORKSPACE_ID,
      "--require-artifact",
      "a/required.json",
      "--download",
      "a/required.json=/tmp/a.json",
      "--download",
      "b/optional.log=/tmp/b.log",
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
});

test("stop maps to stop for the exact workspace only", async () => {
  const executor = recordingExecutor();
  const host = createHost(executor);
  await host.stop({ workspace: workspaceRef() });
  assert.deepEqual(executor.calls[0], {
    command: "crabbox",
    args: ["stop", "--provider", "ascii-box", "--ascii-box-cli", BOX_CLI, "--id", WORKSPACE_ID],
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
      run: async (_host, _executor) => {
        const executor = recordingExecutor();
        const host = createCrabboxCliWorkspaceHost({
          executor,
          crabboxCommand: "",
          asciiBoxCliPath: BOX_CLI,
        });
        await host.observe({ workspace: workspaceRef() });
        assert.equal(executor.calls.length, 0);
      },
      message: /Crabbox command must be non-empty/,
    },
    {
      name: "empty ASCII Box CLI path",
      run: async () => {
        const executor = recordingExecutor();
        const host = createCrabboxCliWorkspaceHost({
          executor,
          asciiBoxCliPath: "",
        });
        await host.observe({ workspace: workspaceRef() });
        assert.equal(executor.calls.length, 0);
      },
      message: /ASCII Box CLI path must be non-empty/,
    },
    {
      name: "NUL in Crabbox command",
      run: async () => {
        const host = createCrabboxCliWorkspaceHost({
          executor: recordingExecutor(),
          crabboxCommand: "crab\0box",
          asciiBoxCliPath: BOX_CLI,
        });
        await host.observe({ workspace: workspaceRef() });
      },
      message: /Crabbox command must not contain NUL bytes/,
    },
    {
      name: "NUL in ASCII Box CLI path",
      run: async () => {
        const host = createCrabboxCliWorkspaceHost({
          executor: recordingExecutor(),
          asciiBoxCliPath: "/bad\0/box",
        });
        await host.observe({ workspace: workspaceRef() });
      },
      message: /ASCII Box CLI path must not contain NUL bytes/,
    },
    {
      name: "empty workspace ID",
      run: (host) => host.acquire({ workspaceId: "" }),
      message: /Workspace ID must be non-empty/,
    },
    {
      name: "NUL in workspace ID",
      run: (host) => host.acquire({ workspaceId: "bad\0id" }),
      message: /Workspace ID must not contain NUL bytes/,
    },
    {
      name: "empty source directory",
      run: (host) => host.sync({ workspace: workspaceRef(), sourceDir: "" }),
      message: /Source directory must be non-empty/,
    },
    {
      name: "NUL in source directory",
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
            { remotePath: "out/x", localPath: "/tmp/2", required: false },
          ],
        }),
      message: /Duplicate artifact remote path/,
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
  const executor = recordingExecutor();
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

  await host.acquire({ workspaceId: WORKSPACE_ID });
  await host.sync({ workspace, sourceDir: SOURCE_DIR });
  await host.launch(launchInput);
  await host.observe({ workspace });
  await host.collect({ workspace, sourceDir: SOURCE_DIR, artifacts });
  await host.stop({ workspace });

  assert.equal(options.asciiBoxCliPath, BOX_CLI);
  assert.equal(workspace.id, WORKSPACE_ID);
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
