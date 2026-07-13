#!/usr/bin/env node

import { createHash, createHmac } from "node:crypto";
import { execFile as execFileCallback } from "node:child_process";
import { appendFile, readFile } from "node:fs/promises";
import process from "node:process";
import { promisify } from "node:util";
import { createDevinAcpRuntimeController } from "../dist/box-agent-worker/devin-acp-runtime.js";
import {
  LoopRunner,
  createLoopRunnerPublisher,
  readLoopRunnerCheckpoint,
} from "../dist/loop-runner/index.js";
import { buildLoopAgentContextPack, prependLoopAgentContext } from "../dist/loop/environment.js";
import { bootstrapLoopBox } from "../dist/loop/box-bootstrap.js";
import { createLoopGitHubAppClient } from "../dist/loop/github-adapter.js";
import { assertValidLoopTaskContract } from "../dist/loop/task-contract.js";

const execFile = promisify(execFileCallback);

function usage(message, exitCode = 2) {
  if (message) console.error(`loop-runner: ${message}`);
  console.error(
    "usage: loop-runner --workspace DIR --task-id ID --run-id ID --box-id ID " +
      "--generation N --task-revision N --contract-hash HASH --prompt-file FILE " +
      "--result-file FILE [--devin-bin PATH] [--devin-args-json JSON] " +
      "[--base-sha SHA] [--required-gates-json JSON] [--cancellation-generation N] " +
      "[--checkpoint-file FILE] [--provider-lease-id ID] [--repository-lease-id ID] " +
      "[--resume] [--events-file FILE] [--event-url URL] [--event-secret-file FILE] " +
      "[--publication-contract-file FILE --publish] [--dangerous] [--skip-bootstrap]",
  );
  process.exit(exitCode);
}

function required(args, name) {
  const value = args.get(name);
  if (!value) usage(`missing ${name}`);
  return value;
}

function positive(value, name) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) usage(`${name} must be positive`);
  return parsed;
}

function parseArgs(argv) {
  const args = new Map();
  let dangerous = false;
  let publish = false;
  let skipBootstrap = false;
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--dangerous") {
      dangerous = true;
      continue;
    }
    if (token === "--publish") {
      publish = true;
      continue;
    }
    if (token === "--skip-bootstrap") {
      skipBootstrap = true;
      continue;
    }
    if (!token?.startsWith("--") || index + 1 >= argv.length)
      usage(`invalid argument ${token ?? ""}`);
    args.set(token.slice(2), argv[++index]);
  }
  return { args, dangerous, publish, skipBootstrap };
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) usage(undefined, 0);
  const { args, dangerous, publish: shouldPublish, skipBootstrap } = parseArgs(argv);
  const workspace = required(args, "workspace");
  const taskId = required(args, "task-id");
  const runId = required(args, "run-id");
  const boxId = required(args, "box-id");
  const generation = positive(required(args, "generation"), "generation");
  const cancellationGeneration = args.has("cancellation-generation")
    ? positive(args.get("cancellation-generation"), "cancellation-generation")
    : 1;
  const taskRevision = positive(required(args, "task-revision"), "task-revision");
  const contractHash = required(args, "contract-hash");
  let prompt = await readFile(required(args, "prompt-file"), "utf8");
  const resultPath = required(args, "result-file");
  const checkpointPath = args.get("checkpoint-file") ?? `.loop/checkpoints/${runId}.json`;
  let resumeSessionId;
  if (args.has("resume")) {
    const checkpoint = await readLoopRunnerCheckpoint(checkpointPath);
    if (!checkpoint) usage(`no valid checkpoint found at ${checkpointPath}`);
    if (
      checkpoint.taskId !== taskId ||
      checkpoint.runId !== runId ||
      checkpoint.taskRevision !== taskRevision ||
      checkpoint.contractHash !== contractHash ||
      checkpoint.cancellationGeneration !== cancellationGeneration
    )
      usage("checkpoint identity does not match this run");
    resumeSessionId = checkpoint.sessionId;
  }
  let devinArgs;
  if (args.has("devin-args-json")) {
    try {
      devinArgs = JSON.parse(args.get("devin-args-json"));
    } catch {
      usage("devin-args-json must be valid JSON");
    }
    if (!Array.isArray(devinArgs) || devinArgs.some((value) => typeof value !== "string"))
      usage("devin-args-json must be an array of strings");
  }
  const baseSha = args.get("base-sha");
  if (baseSha && !/^[0-9a-f]{7,64}$/i.test(baseSha)) usage("base-sha must be a git SHA");
  let requiredGateNames;
  if (args.has("required-gates-json")) {
    try {
      requiredGateNames = JSON.parse(args.get("required-gates-json"));
    } catch {
      usage("required-gates-json must be valid JSON");
    }
    if (
      !Array.isArray(requiredGateNames) ||
      requiredGateNames.length === 0 ||
      requiredGateNames.some((value) => typeof value !== "string" || value.length === 0)
    )
      usage("required-gates-json must be a non-empty array of strings");
  }
  const eventsFile = args.get("events-file");
  const eventUrl = args.get("event-url");
  const eventSecret =
    process.env.LOOP_WORKFLOW_EVENT_SECRET ??
    (eventUrl && args.get("event-secret-file")
      ? (await readFile(args.get("event-secret-file"), "utf8")).trim()
      : undefined);
  let publish;
  let publicationContract;
  if (shouldPublish) {
    const contractPath = required(args, "publication-contract-file");
    try {
      publicationContract = JSON.parse(await readFile(contractPath, "utf8"));
      assertValidLoopTaskContract(publicationContract);
    } catch (error) {
      usage(
        `publication contract is invalid: ${error instanceof Error ? error.message : "invalid JSON"}`,
      );
    }
    if (publicationContract.identity.taskId !== taskId)
      usage("publication contract task id does not match --task-id");
    if (publicationContract.identity.revision !== taskRevision)
      usage("publication contract revision does not match --task-revision");
    if (publicationContract.repository.baseSha !== baseSha)
      usage("publication contract base SHA does not match --base-sha");
    if (publicationContract.context.environment) {
      const contextPack = buildLoopAgentContextPack({
        taskId,
        project: publicationContract.identity.project,
        repository: publicationContract.repository,
        decisions: publicationContract.context.decisions,
        openQuestions: publicationContract.context.openQuestions,
        relevantPaths: publicationContract.context.relevantPaths,
        environment: publicationContract.context.environment,
      });
      prompt = prependLoopAgentContext(prompt, contextPack);
    }
    const appId = process.env.LOOP_GITHUB_APP_ID;
    const installationId = process.env.LOOP_GITHUB_INSTALLATION_ID;
    const privateKeyPem = process.env.LOOP_GITHUB_APP_PRIVATE_KEY;
    if (!appId || !installationId || !privateKeyPem)
      usage(
        "GitHub App publication requires LOOP_GITHUB_APP_ID, LOOP_GITHUB_INSTALLATION_ID, and LOOP_GITHUB_APP_PRIVATE_KEY",
      );
    const github = createLoopGitHubAppClient({ appId, installationId, privateKeyPem });
    publish = createLoopRunnerPublisher({
      github,
      contract: publicationContract,
      workspaceRoot: workspace,
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
    }).publish;
  }
  const emit = async (event) => {
    const envelope = JSON.stringify({ taskId, type: event.type, payload: event });
    const line = JSON.stringify(event);
    if (eventsFile) await appendFile(eventsFile, `${line}\n`, "utf8");
    if (eventUrl) {
      if (!eventSecret) throw new Error("LOOP_WORKFLOW_EVENT_SECRET is required with --event-url");
      const response = await fetch(eventUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-loop-signature-256": `sha256=${createHmac("sha256", eventSecret).update(envelope).digest("hex")}`,
        },
        body: envelope,
      });
      if (!response.ok) throw new Error(`workflow event rejected with HTTP ${response.status}`);
    } else if (!eventsFile) console.error(line);
  };
  const runner = new LoopRunner({
    workspaceRoot: workspace,
    taskId,
    runId,
    boxId,
    generation,
    cancellationGeneration,
    taskRevision,
    contractHash,
    ...(baseSha ? { baseSha } : {}),
    ...(requiredGateNames ? { requiredGateNames } : {}),
    prompt,
    resultPath,
    checkpointPath,
    ...(args.get("provider-lease-id") ? { providerLeaseId: args.get("provider-lease-id") } : {}),
    ...(args.get("repository-lease-id")
      ? { repositoryLeaseId: args.get("repository-lease-id") }
      : {}),
    ...(publish ? { publish } : {}),
    ...(skipBootstrap
      ? {}
      : {
          bootstrap: async () =>
            bootstrapLoopBox({
              executor: {
                async execute(input) {
                  const allowed = new Set([
                    "node",
                    "npm",
                    "pnpm",
                    "sfw",
                    "git",
                    "devin",
                    "agent-browser",
                    "test",
                    "mkdir",
                    "ln",
                    "curl",
                    "sha256sum",
                    "bash",
                    "uname",
                    "chmod",
                    "mv",
                  ]);
                  if (!allowed.has(input.command))
                    throw new Error(`bootstrap command is not allowlisted: ${input.command}`);
                  const result = await execFile(input.command, [...input.args], {
                    cwd: workspace,
                    maxBuffer: 4 * 1024 * 1024,
                  })
                    .then((value) => ({
                      exitCode: 0,
                      stdout: value.stdout,
                      stderr: value.stderr,
                    }))
                    .catch((error) => {
                      const failure = error && typeof error === "object" ? error : {};
                      return {
                        exitCode: typeof failure.code === "number" ? failure.code : 1,
                        stdout: typeof failure.stdout === "string" ? failure.stdout : "",
                        stderr: typeof failure.stderr === "string" ? failure.stderr : String(error),
                      };
                    });
                  return result;
                },
              },
              allowSystemPackageInstall: false,
            }),
        }),
    ...(resumeSessionId ? { resumeSessionId } : {}),
    ...(args.get("devin-bin") ? { devinCommand: args.get("devin-bin") } : {}),
    ...(devinArgs ? { devinArgs } : {}),
    runtimeFactory({ workspaceRoot, hostServices, devinCommand, devinArgs }) {
      return createDevinAcpRuntimeController({
        workspaceRoot,
        parentEnv: process.env,
        hostServices,
        ...(devinCommand ? { devinCommand } : {}),
        ...(devinArgs ? { devinArgs } : {}),
      });
    },
    ...(dangerous
      ? {
          commandPolicy: {
            allowTerminal() {
              return true;
            },
          },
        }
      : {}),
    emit,
  });
  try {
    const execution = await runner.run();
    const sessionIdDigest = createHash("sha256")
      .update(execution.sessionId)
      .digest("hex")
      .slice(0, 16);
    console.log(
      JSON.stringify({
        status: execution.result.status,
        taskRevision: execution.result.taskRevision,
        contractHash: execution.result.contractHash,
        stopReason: execution.prompt.stopReason,
        sessionIdDigest,
      }),
    );
    if (execution.result.status !== "candidate_complete") process.exitCode = 1;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "runner failed");
    process.exitCode = 1;
  }
}

await main();
