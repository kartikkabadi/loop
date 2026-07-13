import { stableJson } from "../stable-json.js";
import { sha256Hex } from "./sha256.js";

export type LoopRiskLevel = "R0" | "R1" | "R2" | "R3" | "R4";
export type LoopRepositoryMode = "owned" | "external-contribution";
export type LoopVerificationProfile =
  | "docs-only"
  | "low-risk"
  | "feature"
  | "secure-feature"
  | "migration"
  | "native-macos";

export type LoopProofMechanism =
  | "unit_test"
  | "integration_test"
  | "adversarial_test"
  | "runtime_flow"
  | "configuration_check"
  | "command"
  | "manual_evidence"
  | "review";

export type LoopTaskContract = Readonly<{
  version: 1;
  identity: Readonly<{
    taskId: string;
    project: string;
    title: string;
    revision: number;
  }>;
  repository: Readonly<{
    owner: string;
    name: string;
    baseBranch: string;
    baseSha?: string;
    mode: LoopRepositoryMode;
    fork?: Readonly<{ owner: string; name: string; headBranch: string }>;
    existingPullRequest?: number;
  }>;
  problem: Readonly<{ statement: string; desiredOutcome: string }>;
  authority: Readonly<{ documents: readonly string[] }>;
  context: Readonly<{
    decisions: readonly string[];
    openQuestions: readonly string[];
    relevantPaths: readonly string[];
  }>;
  scope: Readonly<{ include: readonly string[]; exclude: readonly string[] }>;
  constraints: Readonly<{ required: readonly string[]; forbidden: readonly string[] }>;
  expectedPaths: readonly string[];
  forbiddenPaths: readonly string[];
  acceptanceCriteria: readonly Readonly<{
    id: string;
    statement: string;
    proof: readonly LoopProofMechanism[];
  }>[];
  risk: Readonly<{ declared: LoopRiskLevel; reasons: readonly string[] }>;
  verification: Readonly<{
    profile: LoopVerificationProfile;
    runtimeFlows: readonly string[];
  }>;
  rollback: Readonly<{ strategy: string }>;
  budget: Readonly<{
    maxBoxSeconds: number;
    maxBuilderAttempts: number;
    maxRepairRounds: number;
    maxVerifierAttempts: number;
    maximumLifetimeHours: number;
  }>;
  approval: Readonly<{
    solReview: boolean;
    humanAcceptance: boolean;
    automaticMerge: false;
  }>;
}>;

export type LoopContractDiagnostic = Readonly<{
  severity: "error" | "warning";
  code: string;
  path: string;
  message: string;
}>;

export type LoopContractValidation = Readonly<{
  ok: boolean;
  diagnostics: readonly LoopContractDiagnostic[];
  contractHash: string;
}>;

const RISK_ORDER: Record<LoopRiskLevel, number> = { R0: 0, R1: 1, R2: 2, R3: 3, R4: 4 };
const SUBJECTIVE_LANGUAGE =
  /\b(?:works properly|handles everything|production ready|looks good|robust|fully secure)\b/i;
const RISK_FLOOR_PATTERNS: readonly Readonly<{ minimum: LoopRiskLevel; pattern: RegExp }>[] = [
  { minimum: "R4", pattern: /credential|secret|security\s+policy/i },
  { minimum: "R3", pattern: /auth|permission|migration|billing|infrastructure/i },
  { minimum: "R3", pattern: /cross[- ]cutting|architecture/i },
];

function diagnostic(
  code: string,
  path: string,
  message: string,
  severity: LoopContractDiagnostic["severity"] = "error",
): LoopContractDiagnostic {
  return { severity, code, path, message };
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && !value.includes("\0");
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

function isArrayOfStrings(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every(isNonEmptyString);
}

function hasPathOverlap(left: readonly string[], right: readonly string[]): string | undefined {
  const rightSet = new Set(right);
  return left.find((path) => rightSet.has(path));
}

function declaredRiskFloor(contract: LoopTaskContract): LoopRiskLevel {
  const text = [
    contract.problem.statement,
    contract.problem.desiredOutcome,
    ...contract.scope.include,
    ...contract.constraints.required,
    ...contract.risk.reasons,
  ].join(" ");
  let floor: LoopRiskLevel = "R0";
  for (const entry of RISK_FLOOR_PATTERNS) {
    if (entry.pattern.test(text) && RISK_ORDER[entry.minimum] > RISK_ORDER[floor]) {
      floor = entry.minimum;
    }
  }
  if (contract.scope.include.length > 3 && RISK_ORDER.R2 > RISK_ORDER[floor]) floor = "R2";
  return floor;
}

export function validateLoopTaskContract(contract: LoopTaskContract): LoopContractValidation {
  const diagnostics: LoopContractDiagnostic[] = [];
  if (contract.version !== 1) {
    diagnostics.push(
      diagnostic("E_CONTRACT_VERSION", "version", "only contract version 1 is supported"),
    );
  }
  if (!isNonEmptyString(contract.identity.taskId)) {
    diagnostics.push(diagnostic("E_CONTRACT_TASK_ID", "identity.taskId", "taskId is required"));
  }
  if (!isNonEmptyString(contract.identity.project)) {
    diagnostics.push(diagnostic("E_CONTRACT_PROJECT", "identity.project", "project is required"));
  }
  if (!isNonEmptyString(contract.identity.title)) {
    diagnostics.push(diagnostic("E_CONTRACT_TITLE", "identity.title", "title is required"));
  }
  if (!isPositiveInteger(contract.identity.revision)) {
    diagnostics.push(
      diagnostic("E_CONTRACT_REVISION", "identity.revision", "revision must be positive"),
    );
  }

  const repository = contract.repository;
  for (const [path, value] of [
    ["repository.owner", repository.owner],
    ["repository.name", repository.name],
    ["repository.baseBranch", repository.baseBranch],
  ] as const) {
    if (!isNonEmptyString(value))
      diagnostics.push(diagnostic("E_CONTRACT_REPOSITORY", path, `${path} is required`));
  }
  if (repository.mode === "external-contribution") {
    if (!repository.fork) {
      diagnostics.push(
        diagnostic(
          "E_EXTERNAL_FORK_REQUIRED",
          "repository.fork",
          "external contributions require a fork",
        ),
      );
    } else if (
      ![repository.fork.owner, repository.fork.name, repository.fork.headBranch].every(
        isNonEmptyString,
      )
    ) {
      diagnostics.push(
        diagnostic(
          "E_EXTERNAL_FORK_INVALID",
          "repository.fork",
          "fork owner, name, and headBranch are required",
        ),
      );
    }
  }
  if (
    repository.existingPullRequest !== undefined &&
    !isPositiveInteger(repository.existingPullRequest)
  ) {
    diagnostics.push(
      diagnostic(
        "E_CONTRACT_PULL_REQUEST",
        "repository.existingPullRequest",
        "pull request number must be positive",
      ),
    );
  }

  if (!isNonEmptyString(contract.problem.statement)) {
    diagnostics.push(
      diagnostic("E_CONTRACT_PROBLEM", "problem.statement", "problem statement is required"),
    );
  }
  if (!isNonEmptyString(contract.problem.desiredOutcome)) {
    diagnostics.push(
      diagnostic("E_CONTRACT_OUTCOME", "problem.desiredOutcome", "desired outcome is required"),
    );
  }
  if (
    !isArrayOfStrings(contract.authority.documents) ||
    contract.authority.documents.length === 0
  ) {
    diagnostics.push(
      diagnostic(
        "E_CONTRACT_AUTHORITY",
        "authority.documents",
        "at least one authority document is required",
      ),
    );
  }
  const context = contract.context as
    | Readonly<{
        decisions?: unknown;
        openQuestions?: unknown;
        relevantPaths?: unknown;
      }>
    | undefined;
  if (
    !context ||
    !isArrayOfStrings(context.decisions) ||
    !isArrayOfStrings(context.openQuestions) ||
    !isArrayOfStrings(context.relevantPaths)
  ) {
    diagnostics.push(
      diagnostic(
        "E_CONTRACT_CONTEXT",
        "context",
        "decisions, openQuestions, and relevantPaths must be string arrays",
      ),
    );
  }
  if (!isArrayOfStrings(contract.scope.include) || contract.scope.include.length === 0) {
    diagnostics.push(
      diagnostic(
        "E_CONTRACT_SCOPE",
        "scope.include",
        "scope.include must contain one or more items",
      ),
    );
  }
  if (!isArrayOfStrings(contract.scope.exclude)) {
    diagnostics.push(
      diagnostic("E_CONTRACT_SCOPE", "scope.exclude", "scope.exclude must be an array of strings"),
    );
  }
  if (
    !isArrayOfStrings(contract.constraints.required) ||
    !isArrayOfStrings(contract.constraints.forbidden)
  ) {
    diagnostics.push(
      diagnostic(
        "E_CONTRACT_CONSTRAINTS",
        "constraints",
        "required and forbidden constraints must be string arrays",
      ),
    );
  }
  const pathOverlap = hasPathOverlap(contract.expectedPaths, contract.forbiddenPaths);
  if (pathOverlap) {
    diagnostics.push(
      diagnostic(
        "E_CONTRACT_PATH_CONFLICT",
        "forbiddenPaths",
        `path is both expected and forbidden: ${pathOverlap}`,
      ),
    );
  }

  if (!Array.isArray(contract.acceptanceCriteria) || contract.acceptanceCriteria.length === 0) {
    diagnostics.push(
      diagnostic(
        "E_CONTRACT_ACCEPTANCE",
        "acceptanceCriteria",
        "at least one acceptance criterion is required",
      ),
    );
  } else {
    const ids = new Set<string>();
    for (const [index, criterion] of contract.acceptanceCriteria.entries()) {
      const path = `acceptanceCriteria[${index}]`;
      if (!isNonEmptyString(criterion.id) || ids.has(criterion.id)) {
        diagnostics.push(
          diagnostic(
            "E_CONTRACT_ACCEPTANCE_ID",
            `${path}.id`,
            "criterion ids must be non-empty and unique",
          ),
        );
      }
      ids.add(criterion.id);
      if (!isNonEmptyString(criterion.statement)) {
        diagnostics.push(
          diagnostic(
            "E_CONTRACT_ACCEPTANCE_STATEMENT",
            `${path}.statement`,
            "criterion statement is required",
          ),
        );
      } else if (SUBJECTIVE_LANGUAGE.test(criterion.statement)) {
        diagnostics.push(
          diagnostic(
            "E_SUBJECTIVE_ACCEPTANCE",
            `${path}.statement`,
            "acceptance criteria must describe observable behavior",
          ),
        );
      }
      if (!Array.isArray(criterion.proof) || criterion.proof.length === 0) {
        diagnostics.push(
          diagnostic(
            "E_CONTRACT_PROOF",
            `${path}.proof`,
            "each criterion needs at least one proof mechanism",
          ),
        );
      }
    }
  }

  if (!Object.hasOwn(contract.verification, "profile")) {
    diagnostics.push(
      diagnostic(
        "E_CONTRACT_VERIFICATION",
        "verification.profile",
        "verification profile is required",
      ),
    );
  }
  if (
    !isArrayOfStrings(contract.verification.runtimeFlows) ||
    contract.verification.runtimeFlows.length === 0
  ) {
    diagnostics.push(
      diagnostic(
        "E_CONTRACT_RUNTIME_FLOWS",
        "verification.runtimeFlows",
        "runtimeFlows must contain one or more flows",
      ),
    );
  }
  if (!isNonEmptyString(contract.rollback.strategy)) {
    diagnostics.push(
      diagnostic("E_CONTRACT_ROLLBACK", "rollback.strategy", "rollback strategy is required"),
    );
  }
  for (const [path, value] of [
    ["budget.maxBoxSeconds", contract.budget.maxBoxSeconds],
    ["budget.maxBuilderAttempts", contract.budget.maxBuilderAttempts],
    ["budget.maxRepairRounds", contract.budget.maxRepairRounds],
    ["budget.maxVerifierAttempts", contract.budget.maxVerifierAttempts],
    ["budget.maximumLifetimeHours", contract.budget.maximumLifetimeHours],
  ] as const) {
    if (!isPositiveInteger(value))
      diagnostics.push(diagnostic("E_CONTRACT_BUDGET", path, `${path} must be positive`));
  }
  if (contract.approval.automaticMerge !== false) {
    diagnostics.push(
      diagnostic(
        "E_AUTOMATIC_MERGE_FORBIDDEN",
        "approval.automaticMerge",
        "Loop v1 does not expose automatic merge",
      ),
    );
  }

  const floor = declaredRiskFloor(contract);
  if (RISK_ORDER[contract.risk.declared] < RISK_ORDER[floor]) {
    diagnostics.push(
      diagnostic(
        "E_RISK_BELOW_FLOOR",
        "risk.declared",
        `declared risk ${contract.risk.declared} is below required floor ${floor}`,
      ),
    );
  }
  if (!isArrayOfStrings(contract.risk.reasons) || contract.risk.reasons.length === 0) {
    diagnostics.push(
      diagnostic("E_RISK_REASON", "risk.reasons", "at least one risk reason is required"),
    );
  }

  return {
    ok: diagnostics.every((entry) => entry.severity !== "error"),
    diagnostics,
    contractHash: hashLoopTaskContract(contract),
  };
}

export function hashLoopTaskContract(contract: LoopTaskContract): string {
  return sha256Hex(stableJson(contract));
}

export function assertValidLoopTaskContract(contract: LoopTaskContract): string {
  const result = validateLoopTaskContract(contract);
  if (!result.ok) {
    const summary = result.diagnostics
      .map((entry) => `${entry.code} at ${entry.path}: ${entry.message}`)
      .join("; ");
    throw new Error(`invalid Loop task contract: ${summary}`);
  }
  return result.contractHash;
}
