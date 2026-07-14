import assert from "node:assert/strict";
import { test } from "node:test";
import {
  bootstrapLoopBox,
  LOOP_REQUIRED_SFW_VERSION,
  type LoopBoxCommandResult,
} from "../dist/loop/index.js";

function result(stdout = "", stderr = "", exitCode = 0): LoopBoxCommandResult {
  return { stdout, stderr, exitCode };
}

test("Box bootstrap installs pinned sfw from the verified Linux release", async () => {
  const calls: string[] = [];
  let sfwChecks = 0;
  const executor = {
    async execute(input: { command: string; args: readonly string[] }) {
      calls.push(`${input.command} ${input.args.join(" ")}`);
      if (input.command === "node") return result("v24.15.0\n");
      if (input.command === "npm") return result("11.12.1\n");
      if (input.command === "git") return result("git version 2.43.0\n");
      if (input.command === "uname") return result("x86_64\n");
      if (input.command === "sfw" && input.args[0] === "--version") {
        sfwChecks += 1;
        return sfwChecks === 1
          ? result("", "sfw is not installed\n", 1)
          : result("Socket Firewall Free, version 1.13.1\n");
      }
      if (input.command === "sha256sum")
        return result("4dc46b626a7c5b81c0b54e1984ee53be5a628dbfb2f55ab14e9b04c8a134db6a  file\n");
      if (input.command === "pnpm") return result("11.10.0\n");
      if (input.command === "devin") return result("devin 3000.1.27\n");
      if (input.command === "agent-browser" && input.args[0] === "--version")
        return result("0.31.1\n");
      return result();
    },
  };

  const report = await bootstrapLoopBox({ executor });
  assert.equal(report.manifest, "loop-box-bootstrap.v2");
  assert.equal(report.ready, true);
  assert.ok(
    (report.tools.find((tool) => tool.name === "sfw")?.version ?? "").includes(
      LOOP_REQUIRED_SFW_VERSION,
    ),
  );
  assert.ok(calls.some((call) => call.startsWith("curl --fail")));
  assert.ok(calls.some((call) => call.startsWith("chmod 0755")));
  assert.ok(calls.some((call) => call.startsWith("mv -f")));
});

test("pinned package installs are routed through sfw", async () => {
  const calls: Array<{ command: string; args: readonly string[] }> = [];
  let pnpmChecks = 0;
  const executor = {
    async execute(input: { command: string; args: readonly string[] }) {
      calls.push(input);
      if (input.command === "node") return result("v24.15.0\n");
      if (input.command === "npm") return result("11.12.1\n");
      if (input.command === "git") return result("git version 2.43.0\n");
      if (input.command === "sfw") return result("Socket Firewall Free, version 1.13.1\n");
      if (input.command === "pnpm") {
        pnpmChecks += 1;
        return result(`${pnpmChecks === 1 ? "10.0.0" : "11.10.0"}\n`);
      }
      if (input.command === "devin") return result("devin 3000.1.27\n");
      if (input.command === "agent-browser" && input.args[0] === "--version")
        return result("0.31.1\n");
      return result();
    },
  };

  const report = await bootstrapLoopBox({ executor });
  assert.equal(report.ready, true);
  assert.deepEqual(calls.find((call) => call.command === "sfw" && call.args[0] === "npm")?.args, [
    "npm",
    "install",
    "--global",
    "pnpm@11.10.0",
  ]);
});
