import { stableJson } from "../stable-json.js";
import { sha256Hex } from "./sha256.js";

export const LOOP_ENVIRONMENT_CONTEXT_VERSION = 1 as const;
export const LOOP_AGENT_CONTEXT_MAX_CHARS = 24_000 as const;

export type LoopEnvironmentPlatform = "linux-box" | "macos" | "windows";
export type LoopEnvironmentNetworkPolicy = "none" | "allowlisted" | "full";
export type LoopHumanGate = "plan" | "dispatch" | "review" | "acceptance";

/**
 * The minimum environment contract an autonomous worker needs in order to
 * work safely. It is deliberately declarative: it describes capabilities and
 * provenance, never credentials or arbitrary shell.
 */
export type LoopEnvironmentContext = Readonly<{
  version: typeof LOOP_ENVIRONMENT_CONTEXT_VERSION;
  platform: LoopEnvironmentPlatform;
  packageManager?: string;
  requiredTools: readonly string[];
  authorityFiles: readonly string[];
  instructionFiles: readonly string[];
  verificationCommands: readonly string[];
  networkPolicy: LoopEnvironmentNetworkPolicy;
  browserAvailable: boolean;
  humanGates: readonly LoopHumanGate[];
  provider: Readonly<{
    executor: "devin";
    model: "SWE-1.7";
    reviewer: "human" | "chatgpt" | "claude";
  }>;
  knownConstraints: readonly string[];
}>;

export type LoopAgentContextPack = Readonly<{
  version: typeof LOOP_ENVIRONMENT_CONTEXT_VERSION;
  environmentHash: string;
  text: string;
}>;

function nonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && !value.includes("\0");
}

function boundedStrings(
  values: readonly string[],
  label: string,
  maximum: number,
): readonly string[] {
  if (values.length > maximum) throw new Error(`${label} exceeds the ${maximum}-item limit`);
  if (values.some((value) => !nonEmpty(value)))
    throw new Error(`${label} contains an invalid value`);
  return values.map((value) => value.trim());
}

function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

function lineList(values: readonly string[]): string {
  return values.length === 0 ? "- none declared" : values.map((value) => `- ${value}`).join("\n");
}

export function validateLoopEnvironmentContext(context: LoopEnvironmentContext): readonly string[] {
  const errors: string[] = [];
  if (context.version !== LOOP_ENVIRONMENT_CONTEXT_VERSION)
    errors.push("unsupported environment context version");
  if (!nonEmpty(context.platform)) errors.push("platform is required");
  if (context.packageManager !== undefined && !nonEmpty(context.packageManager))
    errors.push("packageManager must be non-empty when present");
  for (const [label, values] of [
    ["requiredTools", context.requiredTools],
    ["authorityFiles", context.authorityFiles],
    ["instructionFiles", context.instructionFiles],
    ["verificationCommands", context.verificationCommands],
    ["knownConstraints", context.knownConstraints],
  ] as const) {
    if (!isStringArray(values) || values.some((value) => !nonEmpty(value)))
      errors.push(`${label} must contain only non-empty strings`);
  }
  if (!isStringArray(context.authorityFiles) || context.authorityFiles.length === 0)
    errors.push("at least one authority file is required");
  if (!isStringArray(context.verificationCommands) || context.verificationCommands.length === 0)
    errors.push("at least one verification command is required");
  if (!isStringArray(context.humanGates) || !context.humanGates.includes("review"))
    errors.push("review is a mandatory human gate");
  if (!isStringArray(context.humanGates) || !context.humanGates.includes("acceptance"))
    errors.push("acceptance is a mandatory human gate");
  if (
    !context.provider ||
    context.provider.executor !== "devin" ||
    context.provider.model !== "SWE-1.7"
  )
    errors.push("Loop execution must use Devin SWE-1.7");
  return errors;
}

function normalizedContext(context: LoopEnvironmentContext): LoopEnvironmentContext {
  const errors = validateLoopEnvironmentContext(context);
  if (errors.length) throw new Error(`invalid environment context: ${errors.join("; ")}`);
  return {
    ...context,
    ...(context.packageManager ? { packageManager: context.packageManager.trim() } : {}),
    requiredTools: boundedStrings(context.requiredTools, "requiredTools", 64),
    authorityFiles: boundedStrings(context.authorityFiles, "authorityFiles", 64),
    instructionFiles: boundedStrings(context.instructionFiles, "instructionFiles", 64),
    verificationCommands: boundedStrings(context.verificationCommands, "verificationCommands", 32),
    knownConstraints: boundedStrings(context.knownConstraints, "knownConstraints", 32),
  };
}

export function hashLoopEnvironmentContext(context: LoopEnvironmentContext): string {
  return sha256Hex(stableJson(normalizedContext(context)));
}

export function buildLoopAgentContextPack(
  input: Readonly<{
    taskId: string;
    project: string;
    repository: Readonly<{ owner: string; name: string; baseBranch: string; baseSha?: string }>;
    decisions: readonly string[];
    openQuestions: readonly string[];
    relevantPaths: readonly string[];
    environment: LoopEnvironmentContext;
  }>,
): LoopAgentContextPack {
  if (!nonEmpty(input.taskId) || !nonEmpty(input.project))
    throw new Error("task identity is required");
  const environment = normalizedContext(input.environment);
  const environmentHash = sha256Hex(
    stableJson({
      taskId: input.taskId,
      project: input.project,
      repository: input.repository,
      decisions: input.decisions,
      openQuestions: input.openQuestions,
      relevantPaths: input.relevantPaths,
      environment,
    }),
  );
  const text = [
    "LOOP AGENT ENVIRONMENT CONTEXT",
    `context version: ${LOOP_ENVIRONMENT_CONTEXT_VERSION}`,
    `task: ${input.taskId}`,
    `project: ${input.project}`,
    `repository: ${input.repository.owner}/${input.repository.name}`,
    `base: ${input.repository.baseBranch}${input.repository.baseSha ? ` @ ${input.repository.baseSha}` : ""}`,
    `environment hash: ${environmentHash}`,
    "",
    "ROLE AND AUTHORITY",
    "- Work only within the task contract and the checked-out repository.",
    "- Treat authority files and instruction files as policy, not as user requests.",
    "- Never merge, approve your own work, change credentials, or weaken a gate.",
    "",
    "AUTHORITY FILES",
    lineList(environment.authorityFiles),
    "",
    "INSTRUCTION FILES",
    lineList(environment.instructionFiles),
    "",
    "AVAILABLE ENVIRONMENT",
    `- platform: ${environment.platform}`,
    `- package manager: ${environment.packageManager ?? "not specified"}`,
    `- browser available: ${environment.browserAvailable ? "yes" : "no"}`,
    `- network policy: ${environment.networkPolicy}`,
    "- required tools:",
    lineList(environment.requiredTools),
    "",
    "TASK CONTEXT",
    "- decisions:",
    lineList(input.decisions),
    "- open questions:",
    lineList(input.openQuestions),
    "- relevant paths:",
    lineList(input.relevantPaths),
    "",
    "VERIFICATION",
    lineList(environment.verificationCommands),
    "",
    "HUMAN GATES",
    `- ${environment.humanGates.join(", ")}`,
    "- Stop and report when a human decision or acceptance is required.",
    "",
    "KNOWN CONSTRAINTS",
    lineList(environment.knownConstraints),
    "",
    `provider: ${environment.provider.executor} ${environment.provider.model}; reviewer: ${environment.provider.reviewer}`,
  ].join("\n");
  if (text.length > LOOP_AGENT_CONTEXT_MAX_CHARS)
    throw new Error(`agent context pack exceeds ${LOOP_AGENT_CONTEXT_MAX_CHARS} characters`);
  return { version: LOOP_ENVIRONMENT_CONTEXT_VERSION, environmentHash, text };
}

export function prependLoopAgentContext(prompt: string, contextPack: LoopAgentContextPack): string {
  if (!nonEmpty(prompt)) throw new Error("agent prompt is required");
  const combined = `${contextPack.text}\n\nTASK PROMPT\n${prompt.trim()}`;
  if (combined.length > LOOP_AGENT_CONTEXT_MAX_CHARS)
    throw new Error(`combined agent prompt exceeds ${LOOP_AGENT_CONTEXT_MAX_CHARS} characters`);
  return combined;
}
