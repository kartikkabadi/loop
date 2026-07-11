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

function normalizeAjvErrors(errors: ErrorObject[] | null | undefined): ContractError[] {
  const out: ContractError[] = [];
  for (const err of errors ?? []) {
    const instancePath = err.instancePath || "/";
    const keyword = err.keyword;
    const message = err.message ? String(err.message) : "schema validation failed";
    out.push({
      code: parseErrorCode(keyword),
      instancePath,
      keyword,
      message,
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

/**
 * Parse exactly one JSON object from model-produced text.
 * Measures the raw input in UTF-8 bytes; trims surrounding whitespace only.
 */
export function parseExactJsonObject(text: string, options?: { maxBytes?: number }): ParseResult {
  if (typeof text !== "string") {
    return {
      ok: false,
      error: {
        code: "E_RESULT_JSON",
        instancePath: "/",
        message: "input must be a string",
      },
    };
  }

  const maxBytes = options?.maxBytes ?? DEFAULT_RESULT_MAX_BYTES;
  const byteLength = Buffer.byteLength(text, "utf8");
  if (byteLength > maxBytes) {
    return {
      ok: false,
      error: {
        code: "E_RESULT_TOO_LARGE",
        instancePath: "/",
        message: `input exceeds ${maxBytes} UTF-8 bytes (got ${byteLength})`,
      },
    };
  }

  const trimmed = text.trim();
  if (!trimmed) {
    return {
      ok: false,
      error: {
        code: "E_RESULT_EMPTY",
        instancePath: "/",
        message: "empty output",
      },
    };
  }

  if (trimmed.startsWith("```")) {
    return {
      ok: false,
      error: {
        code: "E_RESULT_EXTRA_TEXT",
        instancePath: "/",
        message: "markdown fence rejected",
      },
    };
  }

  let value: unknown;
  try {
    value = JSON.parse(trimmed);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    if (/[{[]/.test(trimmed)) {
      return {
        ok: false,
        error: {
          code: "E_RESULT_EXTRA_TEXT",
          instancePath: "/",
          message: `JSON with surrounding text or multiple values: ${detail}`,
        },
      };
    }
    return {
      ok: false,
      error: {
        code: "E_RESULT_JSON",
        instancePath: "/",
        message: detail,
      },
    };
  }

  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return {
      ok: false,
      error: {
        code: "E_RESULT_NOT_OBJECT",
        instancePath: "/",
        message: "root must be a non-null object",
      },
    };
  }

  return { ok: true, value: value as Record<string, unknown> };
}

export function validateResultContract(
  contract: ResultContractName,
  value: unknown,
): ValidationResult {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return {
      ok: false,
      errors: [
        {
          code: "E_RESULT_NOT_OBJECT",
          instancePath: "/",
          message: "root must be a non-null object",
        },
      ],
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
