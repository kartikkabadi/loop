declare global {
  type JsonValue = ReturnType<typeof JSON.parse>;
  type LooseRecord = JsonValue;
}

export {};
