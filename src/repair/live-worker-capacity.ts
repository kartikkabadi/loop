import { ghJson } from "./github-cli.js";
import type { JsonValue, LooseRecord } from "./json-types.js";
import { REPAIR_CLUSTER_WORKFLOW } from "./constants.js";
import { currentProjectRepo } from "./project-repo.js";
import { sleepMs } from "./timing.js";

const DEFAULT_MAX_LIVE_WORKERS = 50;
export const MAX_LIVE_WORKERS = 100;
const DEFAULT_CAPACITY_POLL_MS = 30_000;
const DEFAULT_CAPACITY_TIMEOUT_MS = 30 * 60 * 1000;
const ACTIVE_WORKFLOW_STATUSES = ["queued", "in_progress", "waiting", "requested", "pending"];

export function readMaxLiveWorkers(args: LooseRecord = {}) {
  return readMaxLiveWorkerLimit(
    args["max-live-workers"] ??
      args.max_live_workers ??
      process.env.CLAWSWEEPER_MAX_LIVE_WORKERS ??
      DEFAULT_MAX_LIVE_WORKERS,
  );
}

export function liveWorkerCapacity({
  repo = currentProjectRepo(),
  workflow = REPAIR_CLUSTER_WORKFLOW,
  requested = 1,
  maxLiveWorkers = DEFAULT_MAX_LIVE_WORKERS,
  runNamePrefix = "",
  excludeRunNamePrefix = "",
}: LooseRecord = {}) {
  const requestedCount = readNonNegativeInteger(requested, "requested");
  const max = readMaxLiveWorkerLimit(maxLiveWorkers);
  const activeRuns = listActiveWorkflowRuns({
    repo,
    workflow,
    runNamePrefix,
    excludeRunNamePrefix,
  });
  return {
    repo,
    workflow,
    ...(runNamePrefix ? { run_name_prefix: runNamePrefix } : {}),
    ...(excludeRunNamePrefix ? { exclude_run_name_prefix: excludeRunNamePrefix } : {}),
    active: activeRuns.length,
    requested: requestedCount,
    max_live_workers: max,
    available: Math.max(0, max - activeRuns.length),
    active_runs: activeRuns,
  };
}

export function assertLiveWorkerCapacity(options: LooseRecord = {}) {
  const capacity = liveWorkerCapacity(options);
  if (capacity.requested > capacity.max_live_workers) {
    throw new Error(
      `refusing dispatch: requested ${capacity.requested} ${capacity.workflow} workers exceeds max-live-workers=${capacity.max_live_workers}`,
    );
  }
  if (capacity.active + capacity.requested > capacity.max_live_workers) {
    throw new Error(
      `refusing dispatch: ${capacity.active} active ${capacity.workflow} workers + ${capacity.requested} requested would exceed max-live-workers=${capacity.max_live_workers}`,
    );
  }
  return capacity;
}

export function waitForLiveWorkerCapacity(options: LooseRecord = {}) {
  const requestedCount = readNonNegativeInteger(options.requested ?? 1, "requested");
  const max = readMaxLiveWorkerLimit(options.maxLiveWorkers ?? DEFAULT_MAX_LIVE_WORKERS);
  if (requestedCount > max) {
    throw new Error(
      `refusing dispatch: requested ${requestedCount} ${options.workflow ?? REPAIR_CLUSTER_WORKFLOW} workers exceeds max-live-workers=${max}`,
    );
  }
  const pollMs = readPositiveInteger(
    options.pollMs ??
      process.env.CLAWSWEEPER_LIVE_WORKER_CAPACITY_POLL_MS ??
      DEFAULT_CAPACITY_POLL_MS,
    "capacity poll ms",
  );
  const timeoutMs = readPositiveInteger(
    options.timeoutMs ??
      process.env.CLAWSWEEPER_LIVE_WORKER_CAPACITY_TIMEOUT_MS ??
      DEFAULT_CAPACITY_TIMEOUT_MS,
    "capacity timeout ms",
  );
  const deadline = Date.now() + timeoutMs;
  let latest = null;

  while (Date.now() <= deadline) {
    latest = liveWorkerCapacity(options);
    if (
      latest.requested <= latest.max_live_workers &&
      latest.active + latest.requested <= latest.max_live_workers
    ) {
      return latest;
    }
    sleepMs(Math.min(pollMs, Math.max(1, deadline - Date.now())));
  }

  throw new Error(
    `timed out waiting for ${options.workflow ?? REPAIR_CLUSTER_WORKFLOW} capacity: ${latest?.active ?? "unknown"} active + ${requestedCount} requested exceeds max-live-workers=${max}`,
  );
}

export function listActiveWorkflowRuns({
  repo = currentProjectRepo(),
  workflow = REPAIR_CLUSTER_WORKFLOW,
  runNamePrefix = "",
  excludeRunNamePrefix = "",
}: LooseRecord = {}) {
  const runs: LooseRecord[] = [];
  for (const status of ACTIVE_WORKFLOW_STATUSES) {
    const workflowRuns = ghJson([
      "api",
      "--method",
      "GET",
      `repos/${repo}/actions/workflows/${encodeURIComponent(workflow)}/runs`,
      "-f",
      `status=${status}`,
      "-f",
      "per_page=100",
      "--jq",
      ".workflow_runs",
    ]);
    if (Array.isArray(workflowRuns))
      runs.push(...workflowRuns.map((run: JsonValue) => normalizeWorkflowRun(run, status)));
  }
  return [
    ...new Map(runs.map((run: JsonValue) => [String(run.databaseId ?? run.id), run])).values(),
  ]
    .filter((run: JsonValue) => runMatchesNameFilter(run, runNamePrefix, excludeRunNamePrefix))
    .sort(
      (left: JsonValue, right: JsonValue) =>
        Date.parse(right.createdAt ?? "") - Date.parse(left.createdAt ?? ""),
    );
}

function runMatchesNameFilter(
  run: LooseRecord,
  runNamePrefix: JsonValue,
  excludeRunNamePrefix: JsonValue,
) {
  const title = String(run.displayTitle ?? "");
  const includePrefix = String(runNamePrefix ?? "");
  const excludePrefix = String(excludeRunNamePrefix ?? "");
  if (includePrefix && !title.startsWith(includePrefix)) return false;
  if (excludePrefix && title.startsWith(excludePrefix)) return false;
  return true;
}

function normalizeWorkflowRun(run: LooseRecord, fallbackStatus: string) {
  return {
    databaseId: run.databaseId ?? run.database_id ?? run.id,
    status: run.status ?? fallbackStatus,
    conclusion: run.conclusion ?? null,
    createdAt: run.createdAt ?? run.created_at ?? null,
    url: run.url ?? run.html_url ?? null,
    displayTitle: run.displayTitle ?? run.display_title ?? run.name ?? null,
  };
}

function readPositiveInteger(value: JsonValue, name: string) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1) {
    throw new Error(`${name} must be a positive integer`);
  }
  return number;
}

function readMaxLiveWorkerLimit(value: JsonValue) {
  const max = readPositiveInteger(value, "max-live-workers");
  if (max > MAX_LIVE_WORKERS) {
    throw new Error(`max-live-workers must be <= ${MAX_LIVE_WORKERS}`);
  }
  return max;
}

function readNonNegativeInteger(value: JsonValue, name: string) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0) {
    throw new Error(`${name} must be a non-negative integer`);
  }
  return number;
}
