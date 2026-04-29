declare global {
  type JsonPrimitive = string | number | boolean | null;
  type StrictJsonObject = { [key: string]: StrictJsonValue | undefined };
  type StrictJsonArray = StrictJsonValue[];
  type StrictJsonValue = JsonPrimitive | StrictJsonObject | StrictJsonArray;
  type JsonValue = ReturnType<typeof JSON.parse>;
  type JsonObject = Record<string, JsonValue>;
  type JsonArray = JsonValue[];
  type LooseRecord = JsonValue;
}

export {};
