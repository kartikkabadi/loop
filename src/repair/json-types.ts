export type JsonPrimitive = string | number | boolean | null;
export type StrictJsonObject = { [key: string]: StrictJsonValue | undefined };
export type StrictJsonArray = StrictJsonValue[];
export type StrictJsonValue = JsonPrimitive | StrictJsonObject | StrictJsonArray;

export type JsonValue = ReturnType<typeof JSON.parse>;
export type JsonObject = Record<string, JsonValue>;
export type JsonArray = JsonValue[];
export type LooseRecord = JsonValue;

export function isJsonObject(value: unknown): value is JsonObject {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function asJsonObject(value: unknown): JsonObject {
  return isJsonObject(value) ? value : {};
}
