import fs from "node:fs";

import type { JsonValue } from "./json-types.js";

export function readJsonFile(filePath: string): JsonValue {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function readJsonFileIfExists(filePath: string): JsonValue | null {
  return fs.existsSync(filePath) ? readJsonFile(filePath) : null;
}
