import type { JsonValue, LooseRecord } from "./json-types.js";
import {
  clusterReportPath,
  formatTimestamp,
  markdownTableLink,
  tableCell,
  truncate,
} from "./publish-markdown.js";
import { normalizeRetiredTerms } from "./retired-terms.js";

type InspectionInput = {
  latestByCluster: LooseRecord[];
  latestFailedFixRows: LooseRecord[];
  latestBlockedRows: LooseRecord[];
  latestSkippedRows: LooseRecord[];
};

export function renderRecentClosureRows(rows: LooseRecord[]): string {
  if (rows.length === 0) return "| _None yet_ |  |  |  |  |  |  |  |";
  return rows
    .map((row: JsonValue) =>
      [
        markdownTableLink(row.action.target || "target", row.url),
        tableCell(row.kind),
        tableCell(row.title),
        tableCell(row.closed_at ? formatTimestamp(row.closed_at) : "executed"),
        tableCell(row.action.action),
        markdownTableLink(row.record.cluster_id, clusterReportPath(row.record)),
        markdownTableLink("report", clusterReportPath(row.record)),
        markdownTableLink(row.record.run_id || "run", row.record.run_url),
      ].join(" | "),
    )
    .map((row: string) => `| ${row} |`)
    .join("\n");
}

export function buildInspectionRows({
  latestByCluster,
  latestFailedFixRows,
  latestBlockedRows,
  latestSkippedRows,
}: InspectionInput): LooseRecord[] {
  const byCluster = new Map<string, LooseRecord>();
  for (const record of latestByCluster) {
    if (record.workflow_conclusion === "failure") {
      addInspectionRow(
        byCluster,
        record,
        "workflow failure",
        record.summary || "cluster worker failed",
      );
    }
    for (const item of record.needs_human ?? []) {
      addInspectionRow(byCluster, record, "needs human", inspectionReason(item) || record.summary);
    }
  }
  for (const row of latestFailedFixRows) {
    addInspectionRow(byCluster, row.record, `fix ${row.action.status}`, actionReason(row.action));
  }
  for (const row of [...latestBlockedRows, ...latestSkippedRows]) {
    addInspectionRow(byCluster, row.record, `apply ${row.action.status}`, actionReason(row.action));
  }
  return [...byCluster.values()].sort((left: JsonValue, right: JsonValue) =>
    String(right.record.published_at ?? "").localeCompare(String(left.record.published_at ?? "")),
  );
}

export function renderInspectionRows(rows: LooseRecord[]): string {
  if (rows.length === 0) return "| _None_ |  |  |  |  |  |";
  return rows
    .map(({ record, state, reason }: LooseRecord) =>
      [
        markdownTableLink(record.cluster_id, clusterReportPath(record)),
        tableCell(state),
        tableCell(record.source_job ?? ""),
        tableCell(reason),
        markdownTableLink("report", clusterReportPath(record)),
        markdownTableLink(record.run_id || "run", record.run_url),
      ].join(" | "),
    )
    .map((row: string) => `| ${row} |`)
    .join("\n");
}

export function renderFixFailureRows(rows: LooseRecord[]): string {
  if (rows.length === 0) return "| _None_ |  |  |  |  |  |";
  return rows
    .map(({ record, action }: LooseRecord) =>
      [
        markdownTableLink(record.cluster_id, clusterReportPath(record)),
        tableCell(action.status),
        tableCell(action.target ?? ""),
        tableCell(action.pr ?? action.url ?? action.branch ?? ""),
        tableCell(actionReason(action)),
        markdownTableLink(record.run_id || "run", record.run_url),
      ].join(" | "),
    )
    .map((row: string) => `| ${row} |`)
    .join("\n");
}

export function renderBlockedReasonRows(rows: LooseRecord[]): string {
  const counts = new Map<string, LooseRecord>();
  for (const row of rows) {
    const reason = compactReason(actionReason(row.action) || "unknown");
    const current = counts.get(reason);
    counts.set(reason, {
      reason,
      count: (current?.count ?? 0) + 1,
      record: current?.record ?? row.record,
    });
  }
  const ranked = [...counts.values()].sort(
    (left: JsonValue, right: JsonValue) =>
      right.count - left.count || left.reason.localeCompare(right.reason),
  );
  if (ranked.length === 0) return "| _None_ | 0 |  |";
  return ranked
    .slice(0, 15)
    .map((row: JsonValue) =>
      [
        tableCell(row.reason),
        row.count,
        markdownTableLink(row.record.cluster_id, clusterReportPath(row.record)),
      ].join(" | "),
    )
    .map((row: string) => `| ${row} |`)
    .join("\n");
}

export function renderFinalizerRows(report: LooseRecord): string {
  const prs = Array.isArray(report?.prs) ? report.prs : [];
  if (prs.length === 0) return "| _None_ |  |  |  |  |  |";
  return prs
    .slice(0, 25)
    .map((pr: JsonValue) =>
      [
        markdownTableLink(`#${pr.number}`, pr.url),
        tableCell(pr.title),
        tableCell(pr.cluster_id ?? ""),
        tableCell(pr.branch ?? ""),
        tableCell((pr.blockers ?? []).join(", ") || "ready"),
        tableCell(pr.recommended_next_action ?? ""),
      ].join(" | "),
    )
    .map((row: string) => `| ${row} |`)
    .join("\n");
}

function addInspectionRow(
  byCluster: Map<string, LooseRecord>,
  record: LooseRecord,
  state: string,
  reason: string,
) {
  if (!record?.cluster_id) return;
  const clusterId = String(record.cluster_id);
  const current = byCluster.get(clusterId);
  const next = {
    record,
    state,
    reason: compactReason(reason || record.summary || "inspection needed"),
  };
  if (!current || inspectionRank(next.state) > inspectionRank(current.state)) {
    byCluster.set(clusterId, next);
  }
}

function actionReason(action: LooseRecord): string {
  return compactReason([action?.code, action?.reason].filter(Boolean).join(": "));
}

function inspectionReason(item: LooseRecord): string {
  if (typeof item === "string") return item;
  if (!item || typeof item !== "object") return "";
  return item.reason ?? item.summary ?? item.title ?? item.ref ?? JSON.stringify(item);
}

function inspectionRank(state: string): number {
  if (String(state).startsWith("workflow")) return 5;
  if (String(state).startsWith("fix failed")) return 4;
  if (String(state).startsWith("fix blocked")) return 3;
  if (String(state).startsWith("apply blocked")) return 2;
  return 1;
}

function compactReason(value: unknown): string {
  return truncate(normalizeRetiredTerms(value).replace(/\s+/g, " ").trim(), 160);
}
