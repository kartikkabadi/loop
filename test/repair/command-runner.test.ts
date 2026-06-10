import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { resolveCommandInvocation, runCommand } from "../../dist/repair/command-runner.js";

test("runCommand handles validation output larger than Node's sync spawn default", () => {
  const output = runCommand(process.execPath, [
    "-e",
    "process.stdout.write('x'.repeat(2 * 1024 * 1024))",
  ]);

  assert.equal(output.length, 2 * 1024 * 1024);
});

test("runCommand reports command timeouts with the rendered command", () => {
  assert.throws(
    () =>
      runCommand(process.execPath, ["-e", "setTimeout(() => process.stdout.write('done'), 1000)"], {
        timeoutMs: 10,
      }),
    /command timed out after 10ms: .*node.* -e/,
  );
});

test("Windows command resolution runs npm-style shell shims through bash", () => {
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-windows-shim-"));
  const shim = path.join(binDir, "codex");
  fs.writeFileSync(shim, '#!/bin/sh\nexec node "$@"\n');

  assert.deepEqual(
    resolveCommandInvocation("codex", ["exec", "--json"], {
      env: { Path: binDir },
      platform: "win32",
    }),
    {
      command: "bash",
      args: [shim, "exec", "--json"],
    },
  );
  assert.deepEqual(
    resolveCommandInvocation("git", ["status"], {
      env: { PATH: binDir },
      platform: "win32",
    }),
    {
      command: "git",
      args: ["status"],
    },
  );
});
