import fs from "node:fs";
import path from "node:path";

import type { JsonValue, LooseRecord } from "./json-types.js";
import { readJsonFile as readJson } from "./json-file.js";

export function readRunRecords(root: string): LooseRecord[] {
  const dir = path.join(root, "results", "runs");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name: string) => name.endsWith(".json"))
    .map((name: string) => readJson(path.join(dir, name)))
    .sort((left: JsonValue, right: JsonValue) =>
      String(left.run_id ?? "").localeCompare(String(right.run_id ?? "")),
    );
}

export function readExistingRunRecord(root: string, runId: string): LooseRecord | null {
  const filePath = path.join(root, "results", "runs", `${runId}.json`);
  if (!fs.existsSync(filePath)) return null;
  return readJson(filePath);
}

export function readArchivedClusters(root: string): Set<string> {
  const filePath = path.join(root, "results", "archived-clusters.json");
  if (!fs.existsSync(filePath)) return new Set<string>();
  const data = readJson(filePath);
  const rows = Array.isArray(data) ? data : data.archived_clusters;
  return new Set(
    (Array.isArray(rows) ? rows : [])
      .map((row: JsonValue) => String(row.cluster_id ?? row))
      .filter(Boolean),
  );
}

export function latestClusterRecords(records: LooseRecord[]): LooseRecord[] {
  const byCluster = new Map<string, LooseRecord>();
  for (const record of records) {
    const clusterId = String(record.cluster_id ?? "");
    if (!clusterId) continue;
    const previous = byCluster.get(clusterId);
    if (!previous || String(record.published_at).localeCompare(String(previous.published_at)) > 0) {
      byCluster.set(clusterId, record);
    }
  }
  return [...byCluster.values()];
}

export function findResultPaths(inputPath: string): string[] {
  if (!fs.existsSync(inputPath)) return [];
  if (fs.statSync(inputPath).isFile()) {
    return path.basename(inputPath) === "result.json" ? [inputPath] : [];
  }
  const out: string[] = [];
  for (const entry of fs.readdirSync(inputPath, { recursive: true })) {
    const candidate = path.join(inputPath, String(entry));
    if (path.basename(candidate) === "result.json" && fs.statSync(candidate).isFile()) {
      out.push(candidate);
    }
  }
  return preferFinalResultPaths(out);
}

export function readSiblingJson(runDir: string, filename: string): LooseRecord | null {
  const direct = path.join(runDir, filename);
  if (fs.existsSync(direct)) return readJson(direct);
  for (const entry of fs.readdirSync(runDir, { recursive: true })) {
    const candidate = path.join(runDir, String(entry));
    if (path.basename(candidate) === filename && fs.statSync(candidate).isFile()) {
      return readJson(candidate);
    }
  }
  return null;
}

export function readRunMetadata(filePath: unknown): Map<string, LooseRecord> {
  if (!filePath || typeof filePath !== "string" || !fs.existsSync(filePath)) {
    return new Map<string, LooseRecord>();
  }
  const data = readJson(filePath);
  const rows = Array.isArray(data) ? data : [data];
  return new Map(
    rows.map((row: LooseRecord) => [String(row.databaseId ?? row.run_id ?? row.id), row]),
  );
}

export function inferRunId(filePath: string): string | null {
  const match = String(filePath).match(/clawsweeper-repair(?:-worker)?-(\d+)-\d+/);
  return match?.[1] ?? null;
}

function preferFinalResultPaths(paths: string[]) {
  const byRunAndCluster = new Map<string, string>();
  for (const resultPath of paths.sort()) {
    const runId = inferRunId(resultPath);
    const clusterId = readResultClusterId(resultPath);
    const key = runId && clusterId ? `${runId}:${clusterId}` : resultPath;
    const previous = byRunAndCluster.get(key);
    if (!previous || resultPathScore(resultPath) > resultPathScore(previous)) {
      byRunAndCluster.set(key, resultPath);
    }
  }
  return [...byRunAndCluster.values()].sort();
}

function resultPathScore(resultPath: string) {
  const runDir = path.dirname(resultPath);
  let score = 0;
  if (fs.existsSync(path.join(runDir, "fix-execution-report.json"))) score += 8;
  if (fs.existsSync(path.join(runDir, "post-flight-report.json"))) score += 4;
  if (fs.existsSync(path.join(runDir, "apply-report.json"))) score += 2;
  if (!resultPath.includes("clawsweeper-repair-worker-")) score += 1;
  return score;
}

function readResultClusterId(resultPath: string) {
  try {
    return String(readJson(resultPath).cluster_id ?? "");
  } catch {
    return "";
  }
}
