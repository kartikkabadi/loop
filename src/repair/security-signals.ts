import type { JsonValue, LooseRecord } from "./json-types.js";

export type SecuritySignalInput = {
  labels?: LooseRecord[];
  comments?: LooseRecord[];
  text?: LooseRecord[];
  frontmatter?: LooseRecord;
};

const SECURITY_LABELS = new Set([
  "security",
  "security-sensitive",
  "security sensitive",
  "type: security",
  "type:security",
  "kind: security",
  "kind:security",
]);

const SECURITY_LABEL_PREFIXES = ["security:", "security/"];
const SECURITY_MARKERS = [
  "clawsweeper-security:security",
  "clawsweeper-security:security-sensitive",
  "clawsweeper-security:sensitive",
  "clawsweeper-route:security",
  "clawsweeper-route:route-security",
  "clawsweeper-route:central-security",
  "clawsweeper-verdict:security",
  "clawsweeper-verdict:security-sensitive",
];

export function hasSecuritySignalText(...values: LooseRecord[]) {
  return hasSecuritySignal({ text: values });
}

export function hasDeterministicSecuritySignal({ labels = [], comments = [] }: LooseRecord = {}) {
  return hasSecuritySignal({ labels, comments });
}

export function hasSecuritySignal({
  labels = [],
  comments = [],
  text = [],
  frontmatter = {},
}: SecuritySignalInput = {}) {
  return (
    hasSecurityFrontmatter(frontmatter) ||
    hasSecurityLabel([...labels, ...text]) ||
    [...comments, ...text].some(hasStructuredSecurityText)
  );
}

function hasSecurityFrontmatter(frontmatter: LooseRecord) {
  return (
    frontmatter.security_sensitive === true ||
    String(frontmatter.route ?? "").toLowerCase() === "security" ||
    String(frontmatter.verdict ?? "").toLowerCase() === "security"
  );
}

function hasSecurityLabel(labels: LooseRecord[]) {
  return labels.flatMap(labelTexts).some(isSecurityLabel);
}

function labelTexts(value: JsonValue): string[] {
  if (Array.isArray(value)) return value.flatMap(labelTexts);
  if (value && typeof value === "object") {
    const record = value as Record<string, JsonValue>;
    return [record.name, record.label, record.value].flatMap(labelTexts);
  }
  return [String(value ?? "")];
}

function isSecurityLabel(value: string) {
  const normalized = normalizeToken(value);
  return (
    SECURITY_LABELS.has(normalized) ||
    SECURITY_LABEL_PREFIXES.some((prefix) => normalized.startsWith(prefix))
  );
}

function hasStructuredSecurityText(value: JsonValue): boolean {
  return flattenSecurityText(value).some((entry) => {
    const normalized = normalizeToken(entry);
    return (
      SECURITY_MARKERS.some((marker) => normalized.includes(marker)) ||
      containsAdvisoryIdentifier(normalized)
    );
  });
}

function containsAdvisoryIdentifier(value: string) {
  return value.split(/[^a-z0-9-]+/i).some((part) => {
    const token = part.toLowerCase();
    return (
      /^cve-\d{4}-\d{4,}$/.test(token) || /^ghsa-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/.test(token)
    );
  });
}

function normalizeToken(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function flattenSecurityText(value: JsonValue): string[] {
  if (Array.isArray(value)) return value.flatMap(flattenSecurityText);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(flattenSecurityText);
  }
  return [String(value ?? "")];
}
