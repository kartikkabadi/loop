import type { JsonValue, LooseRecord } from "./json-types.js";
import {
  earlierIso,
  githubIssueInfo,
  githubIssueUrl,
  githubPullInfo,
  githubPullUrl,
  isPullUrl,
  normalizePullState,
  parseGithubIssueRef,
  parseGithubPullRef,
} from "./publish-github-info.js";

export function buildTrackedPrRows(
  records: LooseRecord[],
  mergeApplicatorActions: ReadonlySet<string>,
): LooseRecord[] {
  const byPull = new Map<string, LooseRecord>();
  for (const record of records) {
    addTrackedPrRef(byPull, record, record.canonical_pr, {
      source: "canonical_pr",
      explicitPull: true,
    });
    addTrackedPrRef(byPull, record, record.canonical, {
      source: "canonical",
      explicitPull: isPullUrl(record.canonical),
    });

    for (const action of record.actions ?? []) {
      const title = action.title ?? action.target_title ?? action.pr_title ?? null;
      addTrackedPrRef(byPull, record, action.target, {
        source: "target",
        explicitPull: false,
        title,
      });
      addTrackedPrRef(byPull, record, action.canonical, {
        source: "canonical",
        explicitPull: isPullUrl(action.canonical),
        title,
      });
      addTrackedPrRef(byPull, record, action.candidate_fix, {
        source: "candidate_fix",
        explicitPull: isPullUrl(action.candidate_fix),
        title,
      });
    }

    for (const action of record.apply_actions ?? []) {
      const actionName = String(action.action ?? "");
      const title = action.title ?? action.target_title ?? action.pr_title ?? null;
      const projectClawSweeperMerged =
        mergeApplicatorActions.has(actionName) && action.status === "executed";
      addTrackedPrRef(byPull, record, action.target, {
        source: "apply_target",
        explicitPull: false,
        title,
        assumedMerged: projectClawSweeperMerged,
        projectClawSweeperMerged,
        projectClawSweeperMergedAt: action.merged_at ?? null,
        merged_at: projectClawSweeperMerged ? (action.merged_at ?? null) : null,
      });
      addTrackedPrRef(byPull, record, action.canonical, {
        source: "apply_canonical",
        explicitPull: isPullUrl(action.canonical),
        title,
      });
      addTrackedPrRef(byPull, record, action.candidate_fix, {
        source: "apply_candidate_fix",
        explicitPull: isPullUrl(action.candidate_fix),
        title,
      });
    }
  }

  return hydrateTrackedPrRows([...byPull.values()]).sort(sortNewestPrRowFirst);
}

export function hydrateClosureRows(rows: LooseRecord[]): LooseRecord[] {
  const infoByIssue = githubIssueInfo(rows);
  return rows.map((row: JsonValue) => {
    const target = parseGithubIssueRef(row.record.repo, row.action.target);
    const info = target ? infoByIssue.get(`${target.repo}#${target.number}`) : null;
    return {
      ...row,
      kind: info?.kind ?? "issue_or_pr",
      title:
        info?.title ??
        row.action.title ??
        row.action.reason ??
        String(row.action.target ?? "closed target"),
      url: info?.html_url ?? (target ? githubIssueUrl(target.repo, target.number) : ""),
      closed_at:
        info?.closed_at ??
        row.action.closed_at ??
        row.record.workflow_updated_at ??
        row.record.published_at ??
        null,
    };
  });
}

export function sortNewestPrRowFirst(left: JsonValue, right: JsonValue): number {
  return String(right.merged_at ?? right.record.published_at ?? "").localeCompare(
    String(left.merged_at ?? left.record.published_at ?? ""),
  );
}

export function sortNewestClosureRowFirst(left: JsonValue, right: JsonValue): number {
  return String(right.closed_at ?? right.record.published_at ?? "").localeCompare(
    String(left.closed_at ?? left.record.published_at ?? ""),
  );
}

function addTrackedPrRef(
  byPull: Map<string, LooseRecord>,
  record: LooseRecord,
  value: JsonValue,
  options: JsonValue = {},
) {
  const pull = parseGithubPullRef(record.repo, value);
  if (!pull) return;
  addTrackedPrRow(byPull, {
    record,
    repo: pull.repo,
    number: pull.number,
    title: options.title ?? null,
    assumedMerged: Boolean(options.assumedMerged),
    merged_at: options.merged_at ?? null,
    first_seen_at: record.workflow_created_at ?? record.published_at ?? null,
    projectClawSweeperMerged: Boolean(options.projectClawSweeperMerged),
    projectClawSweeperMergedAt: options.projectClawSweeperMergedAt ?? null,
    sources: new Set([options.source ?? "ref"]),
    explicitPull: Boolean(options.explicitPull),
  });
}

function addTrackedPrRow(byPull: Map<string, LooseRecord>, row: LooseRecord) {
  const key = `${row.repo}#${row.number}`;
  const previous = byPull.get(key);
  if (!previous || preferTrackedPrRow(row, previous)) {
    byPull.set(key, mergeTrackedPrRows(row, previous));
  } else if (previous) {
    byPull.set(key, mergeTrackedPrRows(previous, row));
  }
}

function mergeTrackedPrRows(primary: JsonValue, secondary: JsonValue): LooseRecord {
  if (!secondary) return primary;
  return {
    ...primary,
    title: primary.title ?? secondary.title ?? null,
    assumedMerged: Boolean(primary.assumedMerged || secondary.assumedMerged),
    merged_at: primary.merged_at ?? secondary.merged_at ?? null,
    first_seen_at: earlierIso(primary.first_seen_at, secondary.first_seen_at),
    projectClawSweeperMerged: Boolean(
      primary.projectClawSweeperMerged || secondary.projectClawSweeperMerged,
    ),
    projectClawSweeperMergedAt:
      primary.projectClawSweeperMergedAt ?? secondary.projectClawSweeperMergedAt ?? null,
    sources: new Set([...(primary.sources ?? []), ...(secondary.sources ?? [])]),
    explicitPull: Boolean(primary.explicitPull || secondary.explicitPull),
  };
}

function preferTrackedPrRow(candidate: LooseRecord, current: LooseRecord): boolean {
  if (candidate.assumedMerged && !current.assumedMerged) return true;
  if (!candidate.assumedMerged && current.assumedMerged) return false;
  return (
    String(candidate.record.published_at ?? "").localeCompare(
      String(current.record.published_at ?? ""),
    ) > 0
  );
}

function hydrateTrackedPrRows(rows: LooseRecord[]): LooseRecord[] {
  const infoByPull = githubPullInfo(rows);
  return rows
    .map((row: JsonValue) => {
      const info = infoByPull.get(`${row.repo}#${row.number}`);
      if (!info && !row.explicitPull) return null;
      const projectClawSweeperMerged = Boolean(row.projectClawSweeperMerged);
      const merged = Boolean(row.merged_at || info?.merged);
      const mergedAt = row.merged_at ?? info?.merged_at ?? null;
      const state = merged ? "merged" : (normalizePullState(info?.state) ?? "tracked");
      return {
        ...row,
        title: row.title ?? info?.title ?? `PR #${row.number}`,
        url: info?.html_url ?? githubPullUrl(row.repo, row.number),
        state,
        merged,
        merged_at: mergedAt,
        projectClawSweeperMerged,
        projectClawSweeperMergedAt: row.projectClawSweeperMergedAt ?? null,
      };
    })
    .filter(Boolean);
}
