import { readFile } from "node:fs/promises";

export type LoopRunnerResultStatus =
  | "candidate_complete"
  | "candidate_unknown"
  | "blocked"
  | "failed";

export type LoopRunnerResult = Readonly<{
  schemaVersion: 1;
  status: LoopRunnerResultStatus;
  taskRevision: number;
  contractHash: string;
  acceptanceCriteria: readonly Readonly<{
    id: string;
    claimedStatus: "satisfied" | "unsatisfied" | "unknown";
    evidencePaths: readonly string[];
  }>[];
  commandsRun: readonly Readonly<{ command: string; exitCode: number }>[];
  assumptions: readonly string[];
  blockers: readonly string[];
  scopeDeviations: readonly string[];
  risksDiscovered: readonly string[];
}>;

function object(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label} must be an object`);
  return value as Record<string, unknown>;
}

function string(value: unknown, label: string): string {
  if (typeof value !== "string" || !value || value.includes("\0"))
    throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function stringArray(value: unknown, label: string): readonly string[] {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  return value.map((entry, index) => string(entry, `${label}[${index}]`));
}

function criteria(value: unknown): LoopRunnerResult["acceptanceCriteria"] {
  if (!Array.isArray(value)) throw new Error("acceptanceCriteria must be an array");
  return value.map((entry, index) => {
    const item = object(entry, `acceptanceCriteria[${index}]`);
    const claimedStatus = item.claimed_status;
    if (
      claimedStatus !== "satisfied" &&
      claimedStatus !== "unsatisfied" &&
      claimedStatus !== "unknown"
    )
      throw new Error(`acceptanceCriteria[${index}].claimed_status is invalid`);
    return {
      id: string(item.id, `acceptanceCriteria[${index}].id`),
      claimedStatus,
      evidencePaths: stringArray(
        item.evidence_paths,
        `acceptanceCriteria[${index}].evidence_paths`,
      ),
    };
  });
}

function commands(value: unknown): LoopRunnerResult["commandsRun"] {
  if (!Array.isArray(value)) throw new Error("commands_run must be an array");
  return value.map((entry, index) => {
    const item = object(entry, `commands_run[${index}]`);
    if (typeof item.exit_code !== "number" || !Number.isSafeInteger(item.exit_code))
      throw new Error(`commands_run[${index}].exit_code is invalid`);
    return {
      command: string(item.command, `commands_run[${index}].command`),
      exitCode: item.exit_code,
    };
  });
}

export function parseLoopRunnerResult(
  value: unknown,
  expected: Readonly<{ taskRevision: number; contractHash: string }>,
): LoopRunnerResult {
  const input = object(value, "runner result");
  if (input.schema_version !== 1) throw new Error("runner result schema_version is unsupported");
  if (input.task_revision !== expected.taskRevision)
    throw new Error("runner result task revision mismatch");
  if (input.contract_hash !== expected.contractHash)
    throw new Error("runner result contract hash mismatch");
  if (
    input.status !== "candidate_complete" &&
    input.status !== "candidate_unknown" &&
    input.status !== "blocked" &&
    input.status !== "failed"
  )
    throw new Error("runner result status is invalid");
  const result: LoopRunnerResult = {
    schemaVersion: 1,
    status: input.status,
    taskRevision: expected.taskRevision,
    contractHash: expected.contractHash,
    acceptanceCriteria: criteria(input.acceptance_criteria),
    commandsRun: commands(input.commands_run),
    assumptions: stringArray(input.assumptions, "assumptions"),
    blockers: stringArray(input.blockers, "blockers"),
    scopeDeviations: stringArray(input.scope_deviations, "scope_deviations"),
    risksDiscovered: stringArray(input.risks_discovered, "risks_discovered"),
  };
  if (result.status === "candidate_complete") {
    if (result.acceptanceCriteria.length === 0)
      throw new Error("candidate_complete requires acceptance criteria");
    if (result.acceptanceCriteria.some((criterion) => criterion.claimedStatus !== "satisfied"))
      throw new Error("candidate_complete requires every acceptance criterion to be satisfied");
    if (result.commandsRun.length === 0)
      throw new Error("candidate_complete requires at least one verification command");
    if (result.commandsRun.some((command) => command.exitCode !== 0))
      throw new Error("candidate_complete requires every verification command to pass");
    if (result.blockers.length > 0) throw new Error("candidate_complete cannot include blockers");
    if (result.scopeDeviations.length > 0)
      throw new Error("candidate_complete cannot include scope deviations");
  }
  return result;
}

export function candidateUnknownResult(
  expected: Readonly<{ taskRevision: number; contractHash: string }>,
  blocker: string,
): LoopRunnerResult {
  return {
    schemaVersion: 1,
    status: "candidate_unknown",
    taskRevision: expected.taskRevision,
    contractHash: expected.contractHash,
    acceptanceCriteria: [],
    commandsRun: [],
    assumptions: [],
    blockers: [string(blocker, "blocker")],
    scopeDeviations: [],
    risksDiscovered: [],
  };
}

export async function readLoopRunnerResult(
  path: string,
  expected: Readonly<{ taskRevision: number; contractHash: string }>,
): Promise<LoopRunnerResult> {
  try {
    return parseLoopRunnerResult(JSON.parse(await readFile(path, "utf8")), expected);
  } catch (error) {
    return candidateUnknownResult(
      expected,
      error instanceof Error ? error.message : "runner result could not be read",
    );
  }
}
