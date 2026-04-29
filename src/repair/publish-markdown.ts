import { slug } from "./text-utils.js";
import type { JsonValue, LooseRecord } from "./json-types.js";

export function clusterReportPath(record: LooseRecord) {
  const owner = String(record.repo ?? "").split("/")[0] || "openclaw";
  return `results/${owner}/${slug(record.cluster_id)}.md`;
}

export function markdownTableLink(label: string, url: string) {
  const safeLabel = tableCell(label || "unknown");
  return url ? `[${safeLabel}](${url})` : safeLabel;
}

export function tableCell(value: JsonValue) {
  return truncate(
    String(value ?? "")
      .replaceAll("|", "\\|")
      .replace(/\s+/g, " ")
      .trim(),
    140,
  );
}

export function truncate(value: JsonValue, maxLength: number) {
  const text = String(value ?? "");
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

export function quote(value: JsonValue) {
  if (value === null || value === undefined || value === "") return "null";
  return JSON.stringify(String(value));
}

export function markdownLink(label: string, url: string) {
  return `[${String(label).replaceAll("|", "\\|")}](${url})`;
}

export function formatTimestamp(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "unknown";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(date);
}
