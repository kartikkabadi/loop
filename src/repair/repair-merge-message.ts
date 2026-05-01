import fs from "node:fs";
import path from "node:path";

import type { JsonValue, LooseRecord } from "./json-types.js";
import { repoRoot } from "./lib.js";
import { compactText } from "./text-utils.js";

export function buildRepairSquashMergeMessage({
  target,
  title,
  headSha,
  preflight,
  reason,
}: LooseRecord): LooseRecord {
  const number = Number(target);
  const rawTitle = String(title ?? `PR #${number}`).trim();
  const subject = rawTitle.includes(`#${number}`) ? rawTitle : `${rawTitle} (#${number})`;
  const summaryLines = [
    `Merged ${rawTitle} after ClawSweeper validated the repair.`,
    ...stringList(preflight?.codex_review?.evidence).slice(0, 3),
  ];
  const fixupLines = repairFixupLines(preflight);
  const validationLines = [
    ...stringList(preflight?.validation_commands).map((command) => `Validated with ${command}.`),
    reason ? `Merge gate: ${reason}.` : "",
    headSha ? `Prepared head SHA: ${headSha}.` : "",
  ].filter(Boolean);
  const body = [
    "Summary:",
    ...summaryLines.map((line) => `- ${line}`),
    "",
    "ClawSweeper fixups:",
    ...fixupLines.map((line) => `- ${line}`),
    "",
    "Validation:",
    ...validationLines.map((line) => `- ${line}`),
  ].join("\n");
  return { subject, body: body.trimEnd(), summaryLines, fixupLines };
}

export function writeRepairSquashMergeBody(target: JsonValue, headSha: JsonValue, body: string) {
  const dir = path.join(repoRoot(), ".clawsweeper-repair", "payloads");
  fs.mkdirSync(dir, { recursive: true });
  const name = `repair-merge-body-${target}-${headSha ?? "head"}`
    .replace(/[^A-Za-z0-9_.-]+/g, "-")
    .slice(0, 180);
  const file = path.join(dir, `${name}.txt`);
  fs.writeFileSync(file, `${body.trimEnd()}\n`);
  return file;
}

function repairFixupLines(preflight: LooseRecord): string[] {
  const lines = [
    "Ran the ClawSweeper repair loop before merge.",
    preflight?.comments_status === "resolved"
      ? "Resolved human review comments named in repair context."
      : "",
    preflight?.bot_comments_status === "resolved"
      ? "Resolved ClawSweeper/review-bot findings before merge."
      : "",
    preflight?.final_base_sync ? "Synced the branch with latest main before merge." : "",
  ].filter(Boolean);
  return lines.length > 0 ? lines : ["No separate repair fixups were recorded."];
}

function stringList(value: JsonValue): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => compactText(item, 220))
    .map((item) => item.trim())
    .filter(Boolean);
}
