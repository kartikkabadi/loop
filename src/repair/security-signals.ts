import type { JsonValue, LooseRecord } from "./json-types.js";

const SECURITY_SIGNAL_PATTERN =
  /\b(vulnerabilit(?:y|ies)|cve-\d+|ghsa|exploit|ssrf|xss|csrf|rce|(?:sql|command|code|prompt)\s*injection|auth(?:entication)?\s*bypass|privilege\s+escalation|sensitive\s+data|security\s+(?:issue|bug|fix|patch|advisory|triage)|(?:secretref|secret|credential|api[-_\s]?key|private[-_\s]?key|token).{0,80}(?:leak(?:ed|age)?|expos(?:e|ed|ure)|plaintext|plain[-_\s]?text)|(?:leak(?:ed|age)?|expos(?:e|ed|ure)|plaintext|plain[-_\s]?text).{0,80}(?:secretref|secret|credential|api[-_\s]?key|private[-_\s]?key|token))\b/i;
const SECURITY_LABEL_PATTERN =
  /^(?:security|security[-_: ]sensitive|security[:/].+|type:\s*security|kind:\s*security)$/i;
const STRUCTURED_SECURITY_MARKER_PATTERN =
  /<!--\s*clawsweeper-(?:security|route|verdict)\s*:\s*(?:security|security-sensitive|sensitive|route-security|central-security)\b[^>]*-->/i;

export function hasSecuritySignalText(...values: LooseRecord[]) {
  const text = values.flatMap(flattenSecurityText).join("\n");
  return SECURITY_SIGNAL_PATTERN.test(text);
}

export function hasDeterministicSecuritySignal({ labels = [], comments = [] }: LooseRecord = {}) {
  const labelTexts = flattenSecurityText(labels).map((label) => label.trim());
  if (labelTexts.some((label) => SECURITY_LABEL_PATTERN.test(label))) return true;
  const commentText = comments.flatMap(flattenSecurityText).join("\n");
  return STRUCTURED_SECURITY_MARKER_PATTERN.test(commentText);
}

function flattenSecurityText(value: JsonValue): string[] {
  if (Array.isArray(value)) return value.flatMap(flattenSecurityText);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(flattenSecurityText);
  }
  return [String(value ?? "")];
}
