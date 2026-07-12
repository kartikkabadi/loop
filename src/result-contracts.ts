/**
 * Host-owned structured result contracts.
 *
 * Runtime-neutral: parses exactly one JSON object and validates it against the
 * repository JSON Schema sources of truth. Does not invoke Codex, Devin, or any
 * agent runtime.
 */
import { Ajv2020, type ErrorObject, type ValidateFunction } from "ajv/dist/2020.js";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export type ResultContractName = "clawsweeper-decision" | "repair-result";

export type ContractError = {
  code: string;
  instancePath: string;
  keyword?: string;
  message: string;
};

export type ParseSuccess = { ok: true; value: Record<string, unknown> };
export type ParseFailure = { ok: false; error: ContractError };
export type ParseResult = ParseSuccess | ParseFailure;

export type ValidationSuccess = { ok: true; value: Record<string, unknown> };
export type ValidationFailure = { ok: false; errors: ContractError[] };
export type ValidationResult = ValidationSuccess | ValidationFailure;

export type ParseAndValidationResult =
  | { ok: true; value: Record<string, unknown> }
  | { ok: false; stage: "parse"; error: ContractError }
  | { ok: false; stage: "schema"; errors: ContractError[] };

/** Default UTF-8 byte limit for model-produced result text (1 MiB). */
export const DEFAULT_RESULT_MAX_BYTES = 1_048_576;

/**
 * Maximum object/array nesting depth for the host JSON boundary scanner.
 * Enforced with an iterative stack so model-controlled nesting cannot overflow
 * the JavaScript call stack.
 */
export const MAX_JSON_NESTING_DEPTH = 64;

const SCHEMA_FILES: Record<ResultContractName, string> = {
  "clawsweeper-decision": "clawsweeper-decision.schema.json",
  "repair-result": join("repair", "codex-result.schema.json"),
};

const MODULE_DIR = dirname(fileURLToPath(import.meta.url));

function resolveSchemaDirectory(): string {
  const candidates = [join(MODULE_DIR, "..", "schema"), join(MODULE_DIR, "..", "..", "schema")];
  for (const dir of candidates) {
    try {
      readFileSync(join(dir, SCHEMA_FILES["clawsweeper-decision"]), "utf8");
      return dir;
    } catch {
      /* try next */
    }
  }
  throw new Error(
    `unable to resolve schema directory from module location ${MODULE_DIR}; tried: ${candidates.join(", ")}`,
  );
}

const SCHEMA_DIR = resolveSchemaDirectory();

const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
  validateSchema: true,
  coerceTypes: false,
  useDefaults: false,
  removeAdditional: false,
});

const validators = new Map<ResultContractName, ValidateFunction>();

function loadValidator(contract: ResultContractName): ValidateFunction {
  const cached = validators.get(contract);
  if (cached) return cached;
  const schemaPath = join(SCHEMA_DIR, SCHEMA_FILES[contract]);
  const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as object;
  const validate = ajv.compile(schema);
  validators.set(contract, validate);
  return validate;
}

function parseErrorCode(keyword: string | undefined): string {
  switch (keyword) {
    case "required":
      return "E_RESULT_SCHEMA_REQUIRED";
    case "additionalProperties":
      return "E_RESULT_SCHEMA_ADDITIONAL";
    case "enum":
    case "const":
      return "E_RESULT_SCHEMA_ENUM";
    case "type":
      return "E_RESULT_SCHEMA_TYPE";
    case "minItems":
    case "maxItems":
    case "minLength":
    case "maxLength":
    case "minimum":
    case "maximum":
    case "pattern":
      return "E_RESULT_SCHEMA_CONSTRAINT";
    default:
      return "E_RESULT_SCHEMA";
  }
}

function hostSchemaMessage(keyword: string | undefined): string {
  switch (keyword) {
    case "required":
      return "required field missing";
    case "additionalProperties":
      return "additional property rejected";
    case "enum":
    case "const":
      return "value is not in the allowed set";
    case "type":
      return "value has the wrong type";
    case "minItems":
    case "maxItems":
    case "minLength":
    case "maxLength":
    case "minimum":
    case "maximum":
    case "pattern":
      return "schema constraint failed";
    default:
      return "schema validation failed";
  }
}

function normalizeAjvErrors(errors: ErrorObject[] | null | undefined): ContractError[] {
  const out: ContractError[] = [];
  for (const err of errors ?? []) {
    const instancePath = err.instancePath || "/";
    const keyword = err.keyword;
    out.push({
      code: parseErrorCode(keyword),
      instancePath,
      keyword,
      message: hostSchemaMessage(keyword),
    });
  }
  out.sort((a, b) => {
    if (a.instancePath !== b.instancePath) return a.instancePath < b.instancePath ? -1 : 1;
    const ak = a.keyword ?? "";
    const bk = b.keyword ?? "";
    if (ak !== bk) return ak < bk ? -1 : 1;
    if (a.code !== b.code) return a.code < b.code ? -1 : 1;
    if (a.message !== b.message) return a.message < b.message ? -1 : 1;
    return 0;
  });
  return out;
}

function contractError(code: string, message: string): ContractError {
  return { code, instancePath: "/", message };
}

function isPositiveSafeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

function resolveMaxBytes(options?: { maxBytes?: number }): number | ParseFailure {
  if (options === undefined || options.maxBytes === undefined) {
    return DEFAULT_RESULT_MAX_BYTES;
  }
  if (!isPositiveSafeInteger(options.maxBytes)) {
    return {
      ok: false,
      error: contractError("E_RESULT_MAX_BYTES", "maxBytes must be a finite positive safe integer"),
    };
  }
  return options.maxBytes;
}

/** RFC 8259 JSON whitespace only: space, tab, CR, LF. */
function isJsonWs(ch: string | undefined): boolean {
  return ch === " " || ch === "\t" || ch === "\r" || ch === "\n";
}

function skipJsonWs(text: string, i: number): number {
  while (i < text.length && isJsonWs(text[i])) i += 1;
  return i;
}

type ScanOk = { ok: true; end: number };
type ScanFail = { ok: false; code: "E_RESULT_JSON" | "E_RESULT_TOO_DEEP"; message: string };
type ScanResult = ScanOk | ScanFail;

type ContainerFrame =
  | { kind: "array"; expect: "value-or-end" | "comma-or-end" }
  | { kind: "object"; expect: "key-or-end" | "colon" | "value" | "comma-or-end" };

function scanFail(code: ScanFail["code"], message: string): ScanFail {
  return { ok: false, code, message };
}

function scanString(text: string, start: number): ScanResult {
  // start points at opening quote
  let i = start + 1;
  while (i < text.length) {
    const ch = text[i]!;
    if (ch === '"') return { ok: true, end: i + 1 };
    if (ch === "\\") {
      if (i + 1 >= text.length) return scanFail("E_RESULT_JSON", "malformed JSON");
      const esc = text[i + 1]!;
      if ('"\\/bfnrt'.includes(esc)) {
        i += 2;
        continue;
      }
      if (esc === "u") {
        if (i + 5 >= text.length) return scanFail("E_RESULT_JSON", "malformed JSON");
        for (let k = 2; k <= 5; k += 1) {
          const h = text[i + k]!;
          const ok = (h >= "0" && h <= "9") || (h >= "a" && h <= "f") || (h >= "A" && h <= "F");
          if (!ok) return scanFail("E_RESULT_JSON", "malformed JSON");
        }
        i += 6;
        continue;
      }
      return scanFail("E_RESULT_JSON", "malformed JSON");
    }
    // Unescaped control characters are invalid in JSON strings.
    if (ch.charCodeAt(0) < 0x20) return scanFail("E_RESULT_JSON", "malformed JSON");
    i += 1;
  }
  return scanFail("E_RESULT_JSON", "malformed JSON");
}

function scanNumber(text: string, start: number): ScanResult {
  let i = start;
  if (text[i] === "-") i += 1;
  if (i >= text.length) return scanFail("E_RESULT_JSON", "malformed JSON");
  if (text[i] === "0") {
    i += 1;
    // Leading zeros are invalid (e.g. 01).
    if (i < text.length && text[i]! >= "0" && text[i]! <= "9") {
      return scanFail("E_RESULT_JSON", "malformed JSON");
    }
  } else if (text[i]! >= "1" && text[i]! <= "9") {
    i += 1;
    while (i < text.length && text[i]! >= "0" && text[i]! <= "9") i += 1;
  } else {
    return scanFail("E_RESULT_JSON", "malformed JSON");
  }
  if (text[i] === ".") {
    i += 1;
    if (i >= text.length || text[i]! < "0" || text[i]! > "9") {
      return scanFail("E_RESULT_JSON", "malformed JSON");
    }
    while (i < text.length && text[i]! >= "0" && text[i]! <= "9") i += 1;
  }
  if (text[i] === "e" || text[i] === "E") {
    i += 1;
    if (text[i] === "+" || text[i] === "-") i += 1;
    if (i >= text.length || text[i]! < "0" || text[i]! > "9") {
      return scanFail("E_RESULT_JSON", "malformed JSON");
    }
    while (i < text.length && text[i]! >= "0" && text[i]! <= "9") i += 1;
  }
  return { ok: true, end: i };
}

function scanLiteral(text: string, start: number, literal: string): ScanResult {
  if (text.startsWith(literal, start)) return { ok: true, end: start + literal.length };
  return scanFail("E_RESULT_JSON", "malformed JSON");
}

/**
 * Iterative RFC 8259 boundary scan for the first JSON value starting at `start`.
 * Uses an explicit stack; never recurses on model-controlled nesting.
 */
function scanJsonValue(text: string, start: number): ScanResult {
  const stack: ContainerFrame[] = [];
  let i = start;
  let needValue = true;

  while (i < text.length || stack.length > 0) {
    if (needValue) {
      if (i >= text.length) return scanFail("E_RESULT_JSON", "malformed JSON");
      const ch = text[i]!;

      if (ch === "{") {
        if (stack.length + 1 > MAX_JSON_NESTING_DEPTH) {
          return scanFail("E_RESULT_TOO_DEEP", `JSON nesting exceeds ${MAX_JSON_NESTING_DEPTH}`);
        }
        stack.push({ kind: "object", expect: "key-or-end" });
        i = skipJsonWs(text, i + 1);
        needValue = false;
        continue;
      }
      if (ch === "[") {
        if (stack.length + 1 > MAX_JSON_NESTING_DEPTH) {
          return scanFail("E_RESULT_TOO_DEEP", `JSON nesting exceeds ${MAX_JSON_NESTING_DEPTH}`);
        }
        stack.push({ kind: "array", expect: "value-or-end" });
        i = skipJsonWs(text, i + 1);
        needValue = false;
        continue;
      }
      if (ch === '"') {
        const s = scanString(text, i);
        if (!s.ok) return s;
        i = s.end;
        needValue = false;
      } else if (ch === "-" || (ch >= "0" && ch <= "9")) {
        const n = scanNumber(text, i);
        if (!n.ok) return n;
        i = n.end;
        needValue = false;
      } else if (ch === "t") {
        const lit = scanLiteral(text, i, "true");
        if (!lit.ok) return lit;
        i = lit.end;
        needValue = false;
      } else if (ch === "f") {
        const lit = scanLiteral(text, i, "false");
        if (!lit.ok) return lit;
        i = lit.end;
        needValue = false;
      } else if (ch === "n") {
        const lit = scanLiteral(text, i, "null");
        if (!lit.ok) return lit;
        i = lit.end;
        needValue = false;
      } else {
        return scanFail("E_RESULT_JSON", "malformed JSON");
      }

      if (stack.length === 0) return { ok: true, end: i };

      const top = stack[stack.length - 1]!;
      if (top.kind === "array") top.expect = "comma-or-end";
      else top.expect = "comma-or-end";
      i = skipJsonWs(text, i);
      continue;
    }

    // Container structural state (not expecting a bare value).
    if (stack.length === 0) return { ok: true, end: i };
    const frame = stack[stack.length - 1]!;
    if (i >= text.length) return scanFail("E_RESULT_JSON", "malformed JSON");

    if (frame.kind === "array") {
      if (frame.expect === "value-or-end") {
        if (text[i] === "]") {
          stack.pop();
          i += 1;
          if (stack.length === 0) return { ok: true, end: i };
          const parent = stack[stack.length - 1]!;
          parent.expect = "comma-or-end";
          i = skipJsonWs(text, i);
          continue;
        }
        needValue = true;
        continue;
      }
      // comma-or-end
      if (text[i] === "]") {
        stack.pop();
        i += 1;
        if (stack.length === 0) return { ok: true, end: i };
        const parent = stack[stack.length - 1]!;
        parent.expect = "comma-or-end";
        i = skipJsonWs(text, i);
        continue;
      }
      if (text[i] === ",") {
        i = skipJsonWs(text, i + 1);
        needValue = true;
        continue;
      }
      return scanFail("E_RESULT_JSON", "malformed JSON");
    }

    // object
    if (frame.expect === "key-or-end") {
      if (text[i] === "}") {
        stack.pop();
        i += 1;
        if (stack.length === 0) return { ok: true, end: i };
        const parent = stack[stack.length - 1]!;
        parent.expect = "comma-or-end";
        i = skipJsonWs(text, i);
        continue;
      }
      if (text[i] !== '"') return scanFail("E_RESULT_JSON", "malformed JSON");
      const key = scanString(text, i);
      if (!key.ok) return key;
      i = skipJsonWs(text, key.end);
      frame.expect = "colon";
      continue;
    }
    if (frame.expect === "colon") {
      if (text[i] !== ":") return scanFail("E_RESULT_JSON", "malformed JSON");
      i = skipJsonWs(text, i + 1);
      frame.expect = "value";
      needValue = true;
      continue;
    }
    // comma-or-end
    if (text[i] === "}") {
      stack.pop();
      i += 1;
      if (stack.length === 0) return { ok: true, end: i };
      const parent = stack[stack.length - 1]!;
      parent.expect = "comma-or-end";
      i = skipJsonWs(text, i);
      continue;
    }
    if (text[i] === ",") {
      i = skipJsonWs(text, i + 1);
      frame.expect = "key-or-end";
      // After a comma, next must be a key (not end). Force key path.
      if (i >= text.length || text[i] === "}") {
        return scanFail("E_RESULT_JSON", "malformed JSON");
      }
      continue;
    }
    return scanFail("E_RESULT_JSON", "malformed JSON");
  }

  return scanFail("E_RESULT_JSON", "malformed JSON");
}

function classifyValueStart(text: string): ParseFailure | null {
  const ch = text[0];
  if (!ch) return { ok: false, error: contractError("E_RESULT_EMPTY", "empty output") };

  if (ch === "+") {
    return { ok: false, error: contractError("E_RESULT_JSON", "malformed JSON") };
  }

  if (ch === "t") {
    if (text.startsWith("true")) return null;
    if ("true".startsWith(text) || text.startsWith("tru")) {
      return { ok: false, error: contractError("E_RESULT_JSON", "malformed JSON") };
    }
    return { ok: false, error: contractError("E_RESULT_EXTRA_TEXT", "leading non-JSON text") };
  }
  if (ch === "f") {
    if (text.startsWith("false")) return null;
    if ("false".startsWith(text) || text.startsWith("fals")) {
      return { ok: false, error: contractError("E_RESULT_JSON", "malformed JSON") };
    }
    return { ok: false, error: contractError("E_RESULT_EXTRA_TEXT", "leading non-JSON text") };
  }
  if (ch === "n") {
    if (text.startsWith("null")) return null;
    if ("null".startsWith(text) || text.startsWith("nul")) {
      return { ok: false, error: contractError("E_RESULT_JSON", "malformed JSON") };
    }
    return { ok: false, error: contractError("E_RESULT_EXTRA_TEXT", "leading non-JSON text") };
  }

  if (ch === "{" || ch === "[" || ch === '"' || ch === "-" || (ch >= "0" && ch <= "9")) {
    return null;
  }

  return { ok: false, error: contractError("E_RESULT_EXTRA_TEXT", "leading non-JSON text") };
}

/**
 * Parse exactly one JSON object from model-produced text.
 * Measures the raw input in UTF-8 bytes; trims surrounding whitespace only.
 * Never returns raw JSON.parse exception text or rejected values in errors.
 */
export function parseExactJsonObject(text: string, options?: { maxBytes?: number }): ParseResult {
  try {
    if (typeof text !== "string") {
      return {
        ok: false,
        error: contractError("E_RESULT_JSON", "input must be a string"),
      };
    }

    const maxBytesOrErr = resolveMaxBytes(options);
    if (typeof maxBytesOrErr !== "number") return maxBytesOrErr;
    const maxBytes = maxBytesOrErr;

    const byteLength = Buffer.byteLength(text, "utf8");
    if (byteLength > maxBytes) {
      return {
        ok: false,
        error: contractError(
          "E_RESULT_TOO_LARGE",
          `input exceeds ${maxBytes} UTF-8 bytes (got ${byteLength})`,
        ),
      };
    }

    const trimmed = text.trim();
    if (!trimmed) {
      return {
        ok: false,
        error: contractError("E_RESULT_EMPTY", "empty output"),
      };
    }

    if (trimmed.startsWith("```")) {
      return {
        ok: false,
        error: contractError("E_RESULT_EXTRA_TEXT", "markdown fence rejected"),
      };
    }

    const startClass = classifyValueStart(trimmed);
    if (startClass) return startClass;

    const scanned = scanJsonValue(trimmed, 0);
    if (!scanned.ok) {
      return {
        ok: false,
        error: contractError(scanned.code, scanned.message),
      };
    }
    if (scanned.end !== trimmed.length) {
      return {
        ok: false,
        error: contractError("E_RESULT_EXTRA_TEXT", "trailing text or multiple JSON values"),
      };
    }

    let value: unknown;
    try {
      value = JSON.parse(trimmed);
    } catch {
      return {
        ok: false,
        error: contractError("E_RESULT_JSON", "malformed JSON"),
      };
    }

    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      return {
        ok: false,
        error: contractError("E_RESULT_NOT_OBJECT", "root must be a non-null object"),
      };
    }

    return { ok: true, value: value as Record<string, unknown> };
  } catch {
    // Public boundary: never let scanner bugs escape as RangeError/etc.
    return {
      ok: false,
      error: contractError("E_RESULT_JSON", "malformed JSON"),
    };
  }
}

export function validateResultContract(
  contract: ResultContractName,
  value: unknown,
): ValidationResult {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return {
      ok: false,
      errors: [contractError("E_RESULT_NOT_OBJECT", "root must be a non-null object")],
    };
  }

  const validate = loadValidator(contract);
  const ok = validate(value);
  if (ok) {
    return { ok: true, value: value as Record<string, unknown> };
  }
  return { ok: false, errors: normalizeAjvErrors(validate.errors) };
}

export function parseAndValidateResultContract(
  contract: ResultContractName,
  text: string,
  options?: { maxBytes?: number },
): ParseAndValidationResult {
  const parsed = parseExactJsonObject(text, options);
  if (!parsed.ok) {
    return { ok: false, stage: "parse", error: parsed.error };
  }
  const validated = validateResultContract(contract, parsed.value);
  if (!validated.ok) {
    return { ok: false, stage: "schema", errors: validated.errors };
  }
  return { ok: true, value: validated.value };
}
