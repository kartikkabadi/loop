import type { JsonValue } from "./json-types.js";

export function shouldCloseSupersededSourcePrs(value: JsonValue) {
  return parseBooleanEnv(value, true);
}

export function shouldSeedReplacementBranchFromSource(fixArtifact: JsonValue) {
  return String(fixArtifact?.repair_strategy ?? "") === "replace_uneditable_branch";
}

function parseBooleanEnv(value: JsonValue, fallback: boolean) {
  if (value == null || value === "") return fallback;
  if (/^(1|true|yes|on)$/i.test(String(value))) return true;
  if (/^(0|false|no|off)$/i.test(String(value))) return false;
  return fallback;
}
