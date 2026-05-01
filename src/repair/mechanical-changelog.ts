import fs from "node:fs";
import path from "node:path";

import type { JsonValue, LooseRecord } from "./json-types.js";

export function applyMechanicalChangelogFix({
  fixArtifact,
  targetDir,
}: LooseRecord): LooseRecord | null {
  if (!isChangelogOnlyFix(fixArtifact)) return null;
  const entry = mechanicalChangelogEntry(fixArtifact);
  if (!entry) return null;

  const changelogPath = path.join(String(targetDir), "CHANGELOG.md");
  if (!fs.existsSync(changelogPath)) return null;

  const content = fs.readFileSync(changelogPath, "utf8");
  if (content.includes(entry) || changelogAlreadyMentionsTitle(content, fixArtifact)) {
    return { status: "already_present", file: "CHANGELOG.md", entry };
  }

  const next = insertIntoUnreleasedFixes(content, entry);
  if (!next || next === content) return null;
  fs.writeFileSync(changelogPath, next);
  return { status: "applied", file: "CHANGELOG.md", entry };
}

function isChangelogOnlyFix(fixArtifact: LooseRecord) {
  if (fixArtifact?.changelog_required !== true) return false;
  const likelyFiles = (fixArtifact.likely_files ?? [])
    .map((file: JsonValue) => String(file ?? "").trim())
    .filter(Boolean);
  if (likelyFiles.length === 0) return false;
  return likelyFiles.every((file: string) => file === "CHANGELOG.md");
}

function mechanicalChangelogEntry(fixArtifact: LooseRecord) {
  const title = String(fixArtifact?.pr_title ?? "").trim();
  if (!title) return "";
  const parsed = parseConventionalTitle(title);
  if (!parsed.subject) return "";
  const area = parsed.scope ? formatScope(parsed.scope) : "Runtime";
  return `- ${area}: ${sentenceFragment(parsed.subject)}.`;
}

function parseConventionalTitle(title: string) {
  const scoped = title.match(/^[a-z]+(?:\([^)]+\))?!?:\s*(.+)$/i);
  const scope = title.match(/^[a-z]+\(([^)]+)\)!?:/i)?.[1] ?? "";
  return {
    scope,
    subject: (scoped?.[1] ?? title).trim(),
  };
}

function formatScope(scope: string) {
  return scope
    .split(/[/-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("/");
}

function sentenceFragment(subject: string) {
  return subject
    .replace(/\s+/g, " ")
    .replace(/[.。]+$/u, "")
    .trim();
}

function changelogAlreadyMentionsTitle(content: string, fixArtifact: LooseRecord) {
  const subject = sentenceFragment(
    parseConventionalTitle(String(fixArtifact?.pr_title ?? "")).subject,
  );
  if (!subject) return false;
  return content.toLowerCase().includes(subject.toLowerCase());
}

function insertIntoUnreleasedFixes(content: string, entry: string) {
  const trailingNewline = content.endsWith("\n");
  const lines = content.split(/\r?\n/);
  if (trailingNewline) lines.pop();

  const unreleased = lines.findIndex((line) => /^##\s+Unreleased\b/i.test(line.trim()));
  if (unreleased < 0) return "";
  const nextRelease = findNextHeading(lines, unreleased + 1, 2);
  const sectionEnd = nextRelease < 0 ? lines.length : nextRelease;
  const fixes = findHeading(lines, unreleased + 1, sectionEnd, 3, "Fixes");
  if (fixes < 0) return "";

  let insertion = fixes + 1;
  while (insertion < sectionEnd && lines[insertion]?.trim() === "") insertion += 1;
  lines.splice(insertion, 0, entry);
  return `${lines.join("\n")}${trailingNewline ? "\n" : ""}`;
}

function findHeading(lines: string[], start: number, end: number, level: number, title: string) {
  const marker = "#".repeat(level);
  for (let index = start; index < end; index += 1) {
    if (lines[index]?.trim().toLowerCase() === `${marker} ${title}`.toLowerCase()) return index;
  }
  return -1;
}

function findNextHeading(lines: string[], start: number, level: number) {
  const marker = "#".repeat(level);
  for (let index = start; index < lines.length; index += 1) {
    if (lines[index]?.startsWith(`${marker} `)) return index;
  }
  return -1;
}
