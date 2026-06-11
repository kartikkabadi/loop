export type PackageScriptRequirement = {
  command: string;
  name: string;
};

const VITEST_BOOLEAN_OPTIONS = new Set([
  "-h",
  "-w",
  "--allowOnly",
  "--cache",
  "--clearCache",
  "--clearScreen",
  "--coverage",
  "--dangerouslyIgnoreUnhandledErrors",
  "--detectAsyncLeaks",
  "--disableConsoleIntercept",
  "--dom",
  "--expandSnapshotDiff",
  "--fileParallelism",
  "--globals",
  "--help",
  "--hideSkippedTests",
  "--includeTaskLocation",
  "--isolate",
  "--logHeapUsage",
  "--open",
  "--passWithNoTests",
  "--printConsoleTrace",
  "--run",
  "--standalone",
  "--strictTags",
  "--typecheck",
  "--ui",
  "--watch",
]);

export function packageScriptRequirement(
  parts: readonly string[],
): PackageScriptRequirement | null {
  const commandParts = stripEnvPrefix(parts);
  if (commandParts[0] === "npm" && commandParts[1] === "run" && commandParts[2]) {
    return { name: commandParts[2], command: commandParts.slice(0, 3).join(" ") };
  }
  if (commandParts[0] === "bun" && commandParts[1] === "run" && commandParts[2]) {
    return { name: commandParts[2], command: commandParts.slice(0, 3).join(" ") };
  }
  if (commandParts[0] !== "pnpm") return null;
  let index = 1;
  if (commandParts[index] === "-s" || commandParts[index] === "--silent") index += 1;
  if (commandParts[index] === "run") index += 1;
  const script = commandParts[index];
  if (!script || ["exec", "dlx", "install", "add", "remove"].includes(script)) return null;
  return { name: script, command: ["pnpm", script].join(" ") };
}

export function isExpensivePnpmValidation(
  parts: readonly string[],
  commandStart: number,
  allowExpensiveValidation: boolean,
): boolean {
  if (allowExpensiveValidation) return false;
  const script = String(parts[commandStart] ?? "");
  if (script === "check" || script === "test:all") return true;
  if (script === "openclaw" && parts[commandStart + 1] === "qa") return true;
  if (script === "vitest" && parts[commandStart + 1] === "run") {
    return vitestPathFilterIndexes(parts.slice(commandStart + 2)).length === 0;
  }
  if (
    script === "exec" &&
    parts[commandStart + 1] === "vitest" &&
    parts[commandStart + 2] === "run"
  ) {
    return vitestPathFilterIndexes(parts.slice(commandStart + 3)).length === 0;
  }
  if (script === "test" || script === "test:serial") {
    return !parts.slice(commandStart + 1).some(looksLikePathArgument);
  }
  return /^(?:test:(?:e2e|live|docker|install:e2e|parallels)(?::|$)|qa:e2e$|android:test:integration$)/.test(
    script,
  );
}

export function looksLikePathArgument(value: unknown): boolean {
  const text = String(value ?? "");
  return (
    !text.startsWith("-") &&
    (text.includes("/") || /\.(?:[cm]?[jt]sx?|json|md|yml|yaml)$/.test(text))
  );
}

export function isTestFile(value: unknown): boolean {
  return /(?:^|\/)[^/]*(?:test|spec|e2e)\.[cm]?[jt]sx?$/.test(String(value));
}

export function vitestPositionalFilterIndexes(args: readonly string[]): number[] {
  const indexes: number[] = [];
  let optionValue = false;
  let positionalOnly = false;
  for (const [index, arg] of args.entries()) {
    if (optionValue) {
      optionValue = false;
      continue;
    }
    if (!positionalOnly && arg === "--") {
      positionalOnly = true;
      continue;
    }
    if (!positionalOnly && arg.startsWith("-")) {
      const option = arg.split("=", 1)[0]!;
      // Vitest optional-value flags such as --update consume the following
      // token too. Only documented boolean flags leave it positional.
      optionValue =
        !arg.includes("=") && !option.startsWith("--no-") && !VITEST_BOOLEAN_OPTIONS.has(option);
      continue;
    }
    indexes.push(index);
  }
  return indexes;
}

export function vitestPathFilterIndexes(args: readonly string[]): number[] {
  return vitestPositionalFilterIndexes(args).filter((index) => looksLikePathArgument(args[index]));
}

export function uniqueStrings(values: Iterable<unknown>): string[] {
  return [...new Set([...values].filter(Boolean).map(String))];
}

export function parseAllowedValidationCommand(command: unknown): string[] {
  const text = String(command ?? "").trim();
  if (!text) throw new Error("empty validation command");
  const safetyText = text.replace(
    /\$\{[A-Z_][A-Z0-9_]*(?::-[A-Za-z0-9_./:-]+)?\}/g,
    "SHELL_DEFAULT",
  );
  if (/[`$;&|<>()[\]{}*?~]/.test(safetyText)) {
    throw new Error(`unsafe validation command: ${text}`);
  }
  const parts = normalizeEnvInvocation(text.split(/\s+/));
  const executable = validationExecutable(parts);
  if (!executable || !isAllowedValidationExecutable(executable)) {
    throw new Error(`unsupported validation command: ${text}`);
  }
  return parts;
}

export function stripEnvPrefix(parts: readonly string[]): string[] {
  let index = parts[0] === "env" ? 1 : 0;
  while (index < parts.length && isEnvAssignment(parts[index])) index += 1;
  return parts.slice(index);
}

function validationExecutable(parts: readonly string[]) {
  const commandParts = stripEnvPrefix(parts);
  const strippedCount = parts.length - commandParts.length - (parts[0] === "env" ? 1 : 0);
  if (parts[0] === "env" && strippedCount === 0) return "";
  return commandParts[0] ?? "";
}

function isAllowedValidationExecutable(executable: string) {
  return (
    ["pnpm", "npm", "bun", "node", "git"].includes(executable) ||
    executable === "scripts/run-opengrep.sh" ||
    executable === "./scripts/run-opengrep.sh"
  );
}

function isEnvAssignment(value: unknown) {
  return /^[A-Za-z_][A-Za-z0-9_]*=.*/.test(String(value ?? ""));
}

function normalizeEnvInvocation(parts: readonly string[]): string[] {
  if (parts[0] === "env" || !isEnvAssignment(parts[0])) return [...parts];
  return ["env", ...parts];
}
