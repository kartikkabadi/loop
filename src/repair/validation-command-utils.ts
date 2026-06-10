export type PackageScriptRequirement = {
  command: string;
  name: string;
};

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

export function uniqueStrings(values: Iterable<unknown>): string[] {
  return [...new Set([...values].filter(Boolean).map(String))];
}

export function parseAllowedValidationCommand(command: unknown): string[] {
  const text = String(command ?? "").trim();
  if (!text) throw new Error("empty validation command");
  const parts = normalizeLocalScriptInvocation(
    normalizeEnvInvocation(tokenizeValidationCommand(text)),
  );
  const executable = validationExecutable(parts);
  if (!executable || !isAllowedValidationCommand(parts, executable)) {
    throw new Error(`unsupported validation command: ${text}`);
  }
  return parts;
}

export function renderValidationCommand(parts: readonly string[]): string {
  return parts.map(renderValidationArgument).join(" ");
}

export function stripEnvPrefix(parts: readonly string[]): string[] {
  let index = parts[0] === "env" ? 1 : 0;
  while (index < parts.length && isEnvAssignment(parts[index])) index += 1;
  return parts.slice(index);
}

function renderValidationArgument(value: string): string {
  if (/^[A-Za-z0-9_./:@%+=,\\-]+$/.test(value)) return value;
  return `'${value.replaceAll("'", `'"'"'`)}'`;
}

function validationExecutable(parts: readonly string[]) {
  const commandParts = stripEnvPrefix(parts);
  const strippedCount = parts.length - commandParts.length - (parts[0] === "env" ? 1 : 0);
  if (parts[0] === "env" && strippedCount === 0) return "";
  return commandParts[0] ?? "";
}

function isAllowedValidationCommand(parts: readonly string[], executable: string) {
  const commandParts = stripEnvPrefix(parts);
  if (executable === "pnpm") return isAllowedPnpmCommand(commandParts);
  if (executable === "npm") return isAllowedNpmCommand(commandParts);
  if (executable === "bun") return isAllowedBunCommand(commandParts);
  if (executable === "node") return isAllowedNodeCommand(commandParts);
  if (executable === "git") {
    return commandParts[1] === "diff" && commandParts.includes("--check");
  }
  if (executable === "go") return isAllowedGoTestCommand(commandParts);
  if (executable === "dotnet") {
    return ["build", "restore", "test"].includes(commandParts[1] ?? "");
  }
  if (executable === "pwsh") {
    return commandParts[1] === "-File" && isLocalPowerShellScript(commandParts[2]);
  }
  return executable === "scripts/run-opengrep.sh" || executable === "./scripts/run-opengrep.sh";
}

function isEnvAssignment(value: unknown) {
  return /^[A-Za-z_][A-Za-z0-9_]*=.*/.test(String(value ?? ""));
}

function normalizeEnvInvocation(parts: readonly string[]): string[] {
  if (parts[0] === "env" || !isEnvAssignment(parts[0])) return [...parts];
  return ["env", ...parts];
}

function normalizeLocalScriptInvocation(parts: readonly string[]): string[] {
  const commandParts = stripEnvPrefix(parts);
  const executable = commandParts[0] ?? "";
  if (!isLocalPowerShellScript(executable)) return [...parts];
  const prefixLength = parts.length - commandParts.length;
  return [...parts.slice(0, prefixLength), "pwsh", "-File", executable, ...commandParts.slice(1)];
}

function isLocalPowerShellScript(value: unknown): boolean {
  const text = String(value ?? "").replaceAll("\\", "/");
  return (
    /^(?:\.\/)?[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)*\.ps1$/i.test(text) &&
    !text.split("/").includes("..")
  );
}

function isAllowedPnpmCommand(parts: readonly string[]): boolean {
  let index = 1;
  if (parts[index] === "-s" || parts[index] === "--silent") index += 1;
  if (parts[index] === "run") index += 1;
  const script = parts[index] ?? "";
  return (
    Boolean(script) && !["exec", "dlx", "install", "add", "remove", "publish"].includes(script)
  );
}

function isAllowedNpmCommand(parts: readonly string[]): boolean {
  return parts[1] === "test" || (parts[1] === "run" && Boolean(parts[2]));
}

function isAllowedBunCommand(parts: readonly string[]): boolean {
  return parts[1] === "test" || (parts[1] === "run" && Boolean(parts[2]));
}

function isAllowedNodeCommand(parts: readonly string[]): boolean {
  const entry = parts[1] ?? "";
  return entry === "--test" || isLocalNodeScript(entry);
}

function isAllowedGoTestCommand(parts: readonly string[]): boolean {
  if (parts[1] !== "test") return false;
  const booleanFlags = new Set([
    "-benchmem",
    "-cover",
    "-failfast",
    "-json",
    "-race",
    "-short",
    "-v",
  ]);
  const valueFlags = new Set([
    "-bench",
    "-benchtime",
    "-count",
    "-covermode",
    "-coverpkg",
    "-cpu",
    "-list",
    "-parallel",
    "-run",
    "-shuffle",
    "-tags",
    "-timeout",
    "-vet",
  ]);

  for (let index = 2; index < parts.length; index += 1) {
    const argument = parts[index] ?? "";
    if (!argument.startsWith("-")) {
      if (!isGoPackagePattern(argument)) return false;
      continue;
    }

    const equalsIndex = argument.indexOf("=");
    const flag = equalsIndex >= 0 ? argument.slice(0, equalsIndex) : argument;
    if (booleanFlags.has(flag)) {
      if (equalsIndex >= 0) return false;
      continue;
    }
    if (!valueFlags.has(flag)) return false;
    if (equalsIndex >= 0) {
      if (!argument.slice(equalsIndex + 1)) return false;
      continue;
    }
    index += 1;
    if (!parts[index]) return false;
  }
  return true;
}

function isGoPackagePattern(value: string): boolean {
  return /^(?:\.{1,2}\/)?[A-Za-z0-9_.+~-]+(?:\/[A-Za-z0-9_.+~-]+)*(?:\/\.\.\.)?$/.test(value);
}

function isLocalNodeScript(value: unknown): boolean {
  const text = String(value ?? "").replaceAll("\\", "/");
  return (
    /^(?:\.\/)?[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)*\.[cm]?[jt]s$/i.test(text) &&
    !text.split("/").includes("..")
  );
}

function tokenizeValidationCommand(text: string): string[] {
  const parts: string[] = [];
  let token = "";
  let quote = "";
  let tokenStarted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index] ?? "";
    if (quote) {
      if (char === quote) {
        quote = "";
        tokenStarted = true;
      } else if (char === "\\" && quote === '"' && index + 1 < text.length) {
        const next = text[index + 1] ?? "";
        if (next === '"' || next === "\\") {
          index += 1;
          token += next;
        } else {
          token += char;
        }
        tokenStarted = true;
      } else {
        token += char;
        tokenStarted = true;
      }
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      tokenStarted = true;
      continue;
    }
    if (/\s/.test(char)) {
      if (tokenStarted) {
        parts.push(token);
        token = "";
        tokenStarted = false;
      }
      continue;
    }
    if (char === "\0" || /[;&|<>\r\n]/.test(char)) {
      throw new Error(`unsafe validation command: ${text}`);
    }
    if (char === "\\" && index + 1 < text.length) {
      const next = text[index + 1] ?? "";
      if (/[\s'"\\;&|<>]/.test(next)) {
        index += 1;
        token += next;
      } else {
        token += char;
      }
      tokenStarted = true;
      continue;
    }
    token += char;
    tokenStarted = true;
  }

  if (quote) throw new Error(`unsafe validation command: ${text}`);
  if (tokenStarted) parts.push(token);
  return parts;
}
