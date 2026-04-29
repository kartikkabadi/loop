import fs from "node:fs";
import path from "node:path";

import type { JsonValue, LooseRecord } from "./json-types.js";
import { markdownLink, quote } from "./publish-markdown.js";

export function renderClusterReport(report: LooseRecord) {
  const actions = report.actions
    .slice(0, 80)
    .map(
      (action: JsonValue) =>
        `| ${action.target || ""} | ${action.action || ""} | ${action.status || ""} | ${action.classification || ""} | ${action.reason || ""} |`,
    )
    .join("\n");
  const applyActions = report.apply_actions
    .map(
      (action: JsonValue) =>
        `| ${action.target || ""} | ${action.action || ""} | ${action.status || ""} | ${action.classification || ""} | ${action.reason || ""} |`,
    )
    .join("\n");
  const fixActions = (report.fix_actions ?? [])
    .map(
      (action: JsonValue) =>
        `| ${action.action || ""} | ${action.status || ""} | ${action.target || action.pr || ""} | ${action.branch || ""} | ${action.reason || ""} |`,
    )
    .join("\n");
  const needsHuman =
    report.needs_human.length > 0
      ? report.needs_human.map((item: JsonValue) => `- ${item}`).join("\n")
      : "- none";
  return `---
repo: ${quote(report.repo)}
cluster_id: ${quote(report.cluster_id)}
mode: ${quote(report.mode)}
run_id: ${quote(report.run_id)}
run_url: ${quote(report.run_url)}
head_sha: ${quote(report.head_sha)}
workflow_conclusion: ${quote(report.workflow_conclusion)}
result_status: ${quote(report.result_status)}
published_at: ${quote(report.published_at)}
canonical: ${quote(report.canonical)}
canonical_issue: ${quote(report.canonical_issue)}
canonical_pr: ${quote(report.canonical_pr)}
actions_total: ${report.actions.length}
fix_executed: ${report.fix_counts.executed ?? 0}
fix_failed: ${report.fix_counts.failed ?? 0}
fix_blocked: ${report.fix_counts.blocked ?? 0}
apply_executed: ${report.apply_counts.executed ?? 0}
apply_blocked: ${report.apply_counts.blocked ?? 0}
apply_skipped: ${report.apply_counts.skipped ?? 0}
needs_human_count: ${report.needs_human.length}
---

# ${report.cluster_id}

Repo: ${report.repo}

Run: ${report.run_url ? markdownLink(report.run_url, report.run_url) : "unknown"}

Workflow conclusion: ${report.workflow_conclusion || "unknown"}

Worker result: ${report.result_status || "unknown"}

Canonical: ${report.canonical || report.canonical_issue || report.canonical_pr || "unknown"}

## Summary

${report.summary || "_No summary emitted._"}

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | ${report.actions.length} |
| Fix executed | ${report.fix_counts.executed ?? 0} |
| Fix failed | ${report.fix_counts.failed ?? 0} |
| Fix blocked | ${report.fix_counts.blocked ?? 0} |
| Applied executions | ${report.apply_counts.executed ?? 0} |
| Apply blocked | ${report.apply_counts.blocked ?? 0} |
| Apply skipped | ${report.apply_counts.skipped ?? 0} |
| Needs human | ${report.needs_human.length} |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
${fixActions || "| _None_ |  |  |  |  |"}

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
${applyActions || "| _None_ |  |  |  |  |"}

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
${actions || "| _None_ |  |  |  |  |"}

## Needs Human

${needsHuman}
`;
}

export function writeClosedRecord({
  report,
  action,
  owner,
  root,
}: {
  report: LooseRecord;
  action: LooseRecord;
  owner: string;
  root: string;
}) {
  const targetNumber = String(action.target ?? "").replace(/^#/, "");
  if (!/^\d+$/.test(targetNumber)) return;
  const closedDir = path.join(root, "jobs", owner, "closed");
  fs.mkdirSync(closedDir, { recursive: true });
  const body = `---
repo: ${quote(report.repo)}
cluster_id: ${quote(report.cluster_id)}
run_id: ${quote(report.run_id)}
target: ${quote(action.target)}
action: ${quote(action.action)}
classification: ${quote(action.classification)}
closed_at: ${quote(report.published_at)}
---

# ${action.target} closed by ${report.cluster_id}

Run: ${report.run_url ? markdownLink(report.run_url, report.run_url) : "unknown"}

Reason: ${action.reason || "closed by ClawSweeper Repair applicator"}
`;
  fs.writeFileSync(path.join(closedDir, `${targetNumber}.md`), body, "utf8");
}
