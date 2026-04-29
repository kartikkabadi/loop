export type PackageScriptRequirement = {
  command: string;
  name: string;
};

export function packageScriptRequirement(
  parts: readonly string[],
): PackageScriptRequirement | null {
  if (parts[0] === "npm" && parts[1] === "run" && parts[2]) {
    return { name: parts[2], command: parts.slice(0, 3).join(" ") };
  }
  if (parts[0] !== "pnpm") return null;
  let index = 1;
  if (parts[index] === "-s" || parts[index] === "--silent") index += 1;
  if (parts[index] === "run") index += 1;
  const script = parts[index];
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
  if (/[`$;&|<>()[\]{}*?~]/.test(text)) {
    throw new Error(`unsafe validation command: ${text}`);
  }
  const parts = text.split(/\s+/);
  const executable = parts[0];
  if (!executable || !["pnpm", "npm", "node", "git"].includes(executable)) {
    throw new Error(`unsupported validation command: ${text}`);
  }
  return parts;
}
