#!/usr/bin/env node

import { execFile as execFileCallback } from "node:child_process";
import process from "node:process";
import { promisify } from "node:util";
import {
  bootstrapLoopBox,
  createCrabboxLoopBoxBootstrapExecutor,
  createCrabboxLoopBoxClient,
} from "../dist/loop/index.js";

const execFile = promisify(execFileCallback);

function usage(message, exitCode = 2) {
  if (message) console.error(`loop-box: ${message}`);
  console.error(
    "usage: loop-box list | bootstrap --box-id ID [--allow-system-package-install] | stop --box-id ID | delete --box-id ID | " +
      "cleanup --name-prefix PREFIX --confirm",
  );
  process.exit(exitCode);
}

function required(args, name) {
  const value = args.get(name);
  if (!value) usage(`missing --${name}`);
  return value;
}

function parse(argv) {
  const [operation, ...rest] = argv;
  const args = new Map();
  let confirm = false;
  let allowSystemPackageInstall = false;
  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (token === "--confirm") {
      confirm = true;
      continue;
    }
    if (token === "--allow-system-package-install") {
      allowSystemPackageInstall = true;
      continue;
    }
    if (!token?.startsWith("--") || index + 1 >= rest.length)
      usage(`invalid argument ${token ?? ""}`);
    args.set(token.slice(2), rest[++index]);
  }
  return { operation, args, confirm, allowSystemPackageInstall };
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) usage(undefined, 0);
  const { operation, args, confirm, allowSystemPackageInstall } = parse(argv);
  if (!operation) return usage("an operation is required");
  const asciiBoxCliPath = process.env.ASCII_BOX_CLI_PATH ?? `${process.env.HOME}/.ascii/bin/box`;
  const client = createCrabboxLoopBoxClient({
    asciiBoxCliPath,
    ...(process.env.CRABBOX_COMMAND ? { crabboxCommand: process.env.CRABBOX_COMMAND } : {}),
    executor: {
      async execute(input) {
        try {
          const result = await execFile(input.command, [...input.args], {
            cwd: input.cwd,
            maxBuffer: 8 * 1024 * 1024,
          });
          return { exitCode: 0, stdout: result.stdout, stderr: result.stderr };
        } catch (error) {
          const failure = error && typeof error === "object" ? error : {};
          return {
            exitCode: typeof failure.code === "number" ? failure.code : 1,
            stdout: typeof failure.stdout === "string" ? failure.stdout : "",
            stderr: typeof failure.stderr === "string" ? failure.stderr : String(error),
          };
        }
      },
    },
  });
  if (operation === "bootstrap") {
    const boxId = required(args, "box-id");
    const report = await bootstrapLoopBox({
      executor: createCrabboxLoopBoxBootstrapExecutor({
        boxId,
        executor: clientExecutor(),
        boxCommand: asciiBoxCliPath,
      }),
      allowSystemPackageInstall,
    });
    console.log(JSON.stringify(report, null, 2));
    if (!report.ready) process.exitCode = 1;
    return;
  }
  if (operation === "list") {
    console.log(JSON.stringify(await client.list(), null, 2));
    return;
  }
  if (operation === "stop") {
    await client.stop(required(args, "box-id"));
    return;
  }
  if (operation === "delete") {
    await client.delete(required(args, "box-id"));
    return;
  }
  if (operation === "cleanup") {
    const prefix = required(args, "name-prefix");
    if (!confirm) return usage("cleanup requires --confirm");
    if (!prefix.startsWith("loop-")) return usage("cleanup prefix must start with loop-");
    const resources = await client.list();
    const matches = resources.filter((resource) => resource.deterministicName.startsWith(prefix));
    for (const resource of matches) {
      if (resource.status === "running") await client.stop(resource.boxId);
      await client.delete(resource.boxId);
      console.log(`deleted ${resource.boxId} ${resource.deterministicName}`);
    }
    return;
  }
  return usage(`unsupported operation: ${operation}`);
}

function clientExecutor() {
  return {
    async execute(input) {
      try {
        const result = await execFile(input.command, [...input.args], {
          cwd: input.cwd,
          maxBuffer: 8 * 1024 * 1024,
        });
        return { exitCode: 0, stdout: result.stdout, stderr: result.stderr };
      } catch (error) {
        const failure = error && typeof error === "object" ? error : {};
        return {
          exitCode: typeof failure.code === "number" ? failure.code : 1,
          stdout: typeof failure.stdout === "string" ? failure.stdout : "",
          stderr: typeof failure.stderr === "string" ? failure.stderr : String(error),
        };
      }
    },
  };
}

await main();
