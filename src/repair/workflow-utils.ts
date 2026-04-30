#!/usr/bin/env node
import type { JsonValue, LooseRecord } from "./json-types.js";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "./lib.js";
import { isJsonObject } from "./json-types.js";

type ApplyAction = {
  action: string;
};

const args = parseArgs(process.argv.slice(2));

if (isCliEntrypoint()) runCli();

function runCli(): void {
  const command = args._[0];
  if (!command) throw new Error("workflow utility command is required");

  switch (command) {
    case "plan-output":
      printPlanOutput();
      break;
    case "classify-output":
      printClassifyOutput();
      break;
    case "artifact-item-numbers":
      process.stdout.write(artifactItemNumbers(requiredString("artifact-dir")).join(","));
      break;
    case "count-csv":
      console.log(csvItems(optionalString("items")).length);
      break;
    case "count-report":
      console.log(countActions(requiredString("report"), ""));
      break;
    case "count-actions":
      console.log(countActions(requiredString("report"), requiredString("action")));
      break;
    case "proposed-item-numbers":
      process.stdout.write(proposedItemNumbers(proposedItemOptions()).join(","));
      break;
    case "merge-apply-reports":
      mergeApplyReports(requiredString("dir"), requiredString("output"));
      break;
    default:
      throw new Error(`unknown workflow utility command: ${command}`);
  }
}

function printPlanOutput(): void {
  const plan = readJsonObject(requiredString("plan"));
  const matrix = Array.isArray(plan.matrix) ? plan.matrix : [];
  const candidates = Array.isArray(plan.candidates) ? plan.candidates : [];
  const batchSize = positiveNumber(optionalString("batch-size"), 5);
  const shardCount = positiveNumber(optionalString("shard-count"), 100);
  const planCapacity = Number(plan.capacity);
  printOutput({
    matrix: JSON.stringify(matrix),
    planned_count: String(candidates.length),
    planned_capacity: String(Number.isFinite(planCapacity) ? planCapacity : batchSize * shardCount),
    planned_item_numbers: plannedItemNumberCsv(plan),
    planned_shards: String(matrix.length),
  });
}

export function plannedItemNumberCsv(plan: LooseRecord): string {
  const candidates: JsonValue[] = Array.isArray(plan.candidates) ? plan.candidates : [];
  return candidates
    .map((candidate) => candidateItemNumber(candidate))
    .filter((number): number is number => typeof number === "number")
    .join(",");
}

function candidateItemNumber(candidate: JsonValue): number | null {
  if (!isJsonObject(candidate)) return null;
  const number = Number(candidate.number);
  return Number.isInteger(number) && number > 0 ? number : null;
}

function printClassifyOutput(): void {
  const classified = readJsonObject(requiredString("classify"));
  const review = stringArray(classified.review);
  const skipped = Array.isArray(classified.skipped) ? classified.skipped : [];
  printOutput({
    matrix: JSON.stringify(review.map((sha) => ({ sha }))),
    planned_count: String(review.length),
    skipped_count: String(skipped.length),
    has_more: optionalString("has-more") || "false",
    next_offset: optionalString("next-offset") || "0",
  });
}

export function artifactItemNumbers(artifactDir: string): number[] {
  if (!fs.existsSync(artifactDir)) return [];
  return fs
    .readdirSync(artifactDir, { recursive: true })
    .map((name) => path.basename(String(name), ".md").match(/(\d+)$/)?.[1])
    .filter((value): value is string => Boolean(value))
    .map(Number)
    .filter((value) => Number.isInteger(value) && value > 0)
    .sort((left, right) => left - right);
}

export function countActions(reportPath: string, action: string): number {
  if (!action) return readApplyActions(reportPath).length;
  return readApplyActions(reportPath).filter((entry) => entry.action === action).length;
}

export function mergeApplyReports(reportDir: string, outputPath: string): void {
  const reports = fs.existsSync(reportDir)
    ? fs
        .readdirSync(reportDir)
        .filter((name) => /^apply-report-\d+\.json$/.test(name))
        .sort((left, right) => checkpointNumber(left) - checkpointNumber(right))
    : [];
  const combined = reports.flatMap((name) => readApplyActions(path.join(reportDir, name)));
  fs.writeFileSync(outputPath, `${JSON.stringify(combined, null, 2)}\n`);
}

type ProposedItemOptions = {
  targetRepo: string;
  applyKind: string;
  applyCloseReasons: string;
  staleMinAgeDays: number;
  minAgeDays: number;
  minAgeMinutes: number | null;
};

export function proposedItemNumbers(options: ProposedItemOptions): number[] {
  const targetSlug = options.targetRepo
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const itemsDir = path.join("records", targetSlug, "items");
  if (!fs.existsSync(itemsDir)) return [];

  const allowedReasons = new Set([
    "cannot_reproduce",
    "clawhub",
    "duplicate_or_superseded",
    "incoherent",
    "implemented_on_main",
    "not_actionable_in_repo",
    "stale_insufficient_info",
  ]);
  const allowedCloseReasons =
    options.applyCloseReasons === "all"
      ? null
      : new Set(
          options.applyCloseReasons
            .split(",")
            .map((reason) => reason.trim())
            .filter(Boolean),
        );
  const minAgeMs =
    options.minAgeMinutes === null
      ? options.minAgeDays * 24 * 60 * 60 * 1000
      : options.minAgeMinutes * 60 * 1000;

  return fs
    .readdirSync(itemsDir)
    .filter((name) => /(?:^|[a-z0-9-]-)\d+\.md$/.test(name))
    .flatMap((name) => {
      const markdown = fs.readFileSync(path.join(itemsDir, name), "utf8");
      if (repoFor(markdown, name) !== options.targetRepo) return [];
      const type = frontMatterValue(markdown, "type");
      if (options.applyKind !== "all" && type && type !== options.applyKind) return [];
      if (frontMatterValue(markdown, "decision") !== "close") return [];
      if (frontMatterValue(markdown, "confidence") !== "high") return [];
      if (frontMatterValue(markdown, "action_taken") !== "proposed_close") return [];
      const reason = frontMatterValue(markdown, "close_reason");
      if (!allowedForTarget(options.targetRepo, type, reason, allowedReasons)) return [];
      if (allowedCloseReasons && !allowedCloseReasons.has(reason)) return [];
      if (
        reason === "stale_insufficient_info" &&
        !olderThan(
          frontMatterValue(markdown, "item_created_at"),
          options.staleMinAgeDays * 24 * 60 * 60 * 1000,
        )
      ) {
        return [];
      }
      if (!olderThan(frontMatterValue(markdown, "item_created_at"), minAgeMs)) return [];
      return [numberFor(name)];
    })
    .sort((left, right) => left - right);
}

function proposedItemOptions(): ProposedItemOptions {
  return {
    targetRepo: requiredString("target-repo"),
    applyKind: optionalString("apply-kind") || "all",
    applyCloseReasons: optionalString("apply-close-reasons") || "all",
    staleMinAgeDays: numberArg("stale-min-age-days", 30),
    minAgeDays: numberArg("min-age-days", 0),
    minAgeMinutes: optionalString("min-age-minutes") ? numberArg("min-age-minutes", 0) : null,
  };
}

function readApplyActions(reportPath: string): ApplyAction[] {
  const parsed: unknown = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  if (!Array.isArray(parsed)) throw new Error(`${reportPath} must contain an array`);
  return parsed.map((entry) => {
    if (!isJsonObject(entry) || typeof entry.action !== "string") return { action: "" };
    return { action: entry.action };
  });
}

function readJsonObject(filePath: string): LooseRecord {
  const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!isJsonObject(parsed)) throw new Error(`${filePath} must contain a JSON object`);
  return parsed;
}

function printOutput(values: Record<string, string>): void {
  for (const [key, value] of Object.entries(values)) console.log(`${key}=${value}`);
}

function requiredString(name: string): string {
  const value = optionalString(name);
  if (!value) throw new Error(`--${name} is required`);
  return value;
}

function optionalString(name: string): string {
  const value = args[name];
  return typeof value === "string" ? value : "";
}

function numberArg(name: string, fallback: number): number {
  const value = optionalString(name);
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) throw new Error(`--${name} must be numeric`);
  return parsed;
}

function positiveNumber(value: string, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function stringArray(value: JsonValue): string[] {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string")
    : [];
}

function csvItems(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function checkpointNumber(name: string): number {
  return Number(name.match(/\d+/)?.[0] ?? 0);
}

function frontMatterValue(markdown: string, key: string): string {
  return (
    markdown
      .match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]
      ?.trim()
      .replace(/^"|"$/g, "") ?? ""
  );
}

function repoFor(markdown: string, name: string): string {
  return (
    frontMatterValue(markdown, "repository") || (/^\d+\.md$/.test(name) ? "openclaw/openclaw" : "")
  );
}

function numberFor(name: string): number {
  return Number(name.match(/(\d+)\.md$/)?.[1] || 0);
}

function allowedForTarget(
  targetRepo: string,
  type: string,
  reason: string,
  allowedReasons: ReadonlySet<string>,
): boolean {
  if (targetRepo === "openclaw/clawhub")
    return type === "pull_request" && reason === "implemented_on_main";
  if (type === "pull_request" && reason === "stale_insufficient_info") return false;
  return allowedReasons.has(reason);
}

function olderThan(iso: string, milliseconds: number): boolean {
  if (milliseconds <= 0) return true;
  const parsed = Date.parse(iso);
  return Number.isFinite(parsed) && Date.now() - parsed > milliseconds;
}

function isCliEntrypoint(): boolean {
  const entrypoint = process.argv[1];
  return Boolean(entrypoint && import.meta.url === pathToFileURL(entrypoint).href);
}
