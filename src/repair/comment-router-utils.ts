import type { JsonValue, LooseRecord } from "./json-types.js";
import fs from "node:fs";
import path from "node:path";

const PASSING_CHECK_CONCLUSIONS = new Set(["SUCCESS", "SKIPPED", "NEUTRAL"]);
const DEFAULT_IGNORED_CHECKS = ["auto-response", "Labeler", "Stale"];

export function summarizeChecks(checks: LooseRecord[]) {
  const ignored = ignoredCheckNames();
  const counts: Record<string, number> = {};
  const blockers: LooseRecord[] = [];
  for (const check of checks) {
    const name = String(check.name ?? check.context ?? "unknown check");
    const workflow = String(check.workflowName ?? "");
    const ignoredCheck = ignored.has(name.toLowerCase()) || ignored.has(workflow.toLowerCase());
    const status = String(check.status ?? check.state ?? "").toUpperCase();
    const conclusion = String(check.conclusion ?? "").toUpperCase();
    const key = conclusion || status || "UNKNOWN";
    counts[key] = (counts[key] ?? 0) + 1;
    if (ignoredCheck) continue;
    if (status && !["COMPLETED", "SUCCESS"].includes(status)) blockers.push(`${name}:${status}`);
    if (conclusion && !PASSING_CHECK_CONCLUSIONS.has(conclusion))
      blockers.push(`${name}:${conclusion}`);
  }
  return { total: checks.length, counts, blockers };
}

export function shouldSuppressProcessedCommentVersion(entry: LooseRecord) {
  const status = String(entry.status ?? "").toLowerCase();
  if (!["executed", "skipped"].includes(status)) return false;
  const intent = String(entry.intent ?? "");
  if (
    status === "skipped" &&
    (intent === "clawsweeper_auto_merge" || intent === "maintainer_approve_automerge")
  ) {
    return false;
  }
  return true;
}

export function isAllowedMutationActor(login: JsonValue, trustedBots: Iterable<string>) {
  const actor = normalizeGitHubActor(login);
  if (!actor) return false;
  for (const trustedBot of trustedBots) {
    if (normalizeGitHubActor(trustedBot) === actor) return true;
  }
  return false;
}

export function normalizeGitHubActor(login: JsonValue) {
  return String(login ?? "")
    .trim()
    .toLowerCase()
    .replace(/\[bot\]$/i, "");
}

export function isGitHubAppIntegrationAuthError(message: JsonValue) {
  const text = String(message ?? "").toLowerCase();
  return (
    text.includes("resource not accessible by integration") &&
    (text.includes("http 403") || text.includes('"status":"403"') || text.includes("status: 403"))
  );
}

function ignoredCheckNames() {
  return commaSet(
    process.env.CLAWSWEEPER_COMMENT_ROUTER_IGNORE_CHECKS ?? DEFAULT_IGNORED_CHECKS.join(","),
  );
}

export function readLedger(file: JsonValue) {
  if (!fs.existsSync(file)) return { updated_at: null, commands: [] };
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return {
      updated_at: data.updated_at ?? null,
      commands: Array.isArray(data.commands) ? data.commands : [],
    };
  } catch {
    return { updated_at: null, commands: [] };
  }
}

export function appendLedger(current: LooseRecord, entries: LooseRecord[]) {
  const compact = entries
    .filter((entry: JsonValue) => ["executed", "skipped"].includes(entry.status))
    .map((entry: JsonValue) => ({
      idempotency_key: entry.idempotency_key,
      comment_id: entry.comment_id,
      comment_version_key: entry.comment_version_key ?? null,
      comment_url: entry.comment_url,
      comment_created_at: entry.comment_created_at ?? null,
      comment_updated_at: entry.comment_updated_at ?? null,
      repo: entry.repo,
      issue_number: entry.issue_number,
      author: entry.author,
      author_association: entry.author_association,
      trigger: entry.trigger,
      command: entry.command,
      intent: entry.intent,
      trusted_bot: Boolean(entry.trusted_bot),
      trusted_bot_author: entry.trusted_bot_author ?? null,
      automation_source: entry.automation_source ?? null,
      repair_reason: entry.repair_reason ?? null,
      expected_head_sha: entry.expected_head_sha ?? null,
      finding_id: entry.finding_id ?? null,
      status: entry.status,
      processed_at: new Date().toISOString(),
      target: entry.target
        ? {
            kind: entry.target.kind,
            branch: entry.target.branch,
            head_sha: entry.target.head_sha,
            cluster_id: entry.target.cluster_id,
            job_path: entry.target.job_path,
          }
        : null,
    }));
  const byCommentVersion = new Map(
    (current.commands ?? []).map((entry: JsonValue) => [ledgerEntryKey(entry), entry]),
  );
  for (const entry of compact) byCommentVersion.set(ledgerEntryKey(entry), entry);
  current.updated_at = new Date().toISOString();
  current.commands = [...byCommentVersion.values()].slice(-1000);
}

function ledgerEntryKey(entry: LooseRecord) {
  return (
    entry.comment_version_key ??
    `${entry.comment_id ?? "unknown"}:${entry.comment_updated_at ?? "unknown"}`
  );
}

export function writeLedger(file: JsonValue, current: LooseRecord) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(current, null, 2)}\n`);
}

export function writeReportFile(root: string, data: LooseRecord) {
  const file = path.join(root, "results", "comment-router-latest.json");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

export function writePayload(root: string, name: string, payload: LooseRecord) {
  const dir = path.join(root, ".clawsweeper-repair", "payloads");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${safeName(name)}.json`);
  fs.writeFileSync(file, `${JSON.stringify(payload)}\n`);
  return file;
}

export function issueNumberFromUrl(value: JsonValue) {
  const match = String(value ?? "").match(/\/issues\/(\d+)$/);
  return match ? Number(match[1]) : 0;
}

export function positiveInteger(value: JsonValue, name: string) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1)
    throw new Error(`${name} must be a positive integer`);
  return number;
}

export function commaSet(value: JsonValue) {
  return new Set(
    String(value ?? "")
      .split(",")
      .map((item: JsonValue) => item.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function stripAnsi(text: string) {
  return String(text ?? "").replace(
    new RegExp(`${String.fromCharCode(27)}\\[[0-?]*[ -/]*[@-~]`, "g"),
    "",
  );
}

export function assertRepo(value: JsonValue, name: string) {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(value))
    throw new Error(`${name} must be owner/repo`);
}

function safeName(value: JsonValue) {
  return String(value)
    .replace(/[^A-Za-z0-9_.-]+/g, "-")
    .slice(0, 120);
}
