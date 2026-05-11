import { automergeChangelogBlockReason } from "./comment-router-core.js";
import type { JsonValue, LooseRecord } from "./json-types.js";

export function deterministicAutomergeResult({
  job,
  mode,
  clusterPlan,
}: LooseRecord): LooseRecord | null {
  if (String(job?.frontmatter?.source ?? "") !== "pr_automerge") return null;
  if (!["autonomous", "execute"].includes(String(mode ?? ""))) return null;
  if (job?.frontmatter?.allow_fix_pr !== true) return null;
  if (job?.frontmatter?.allow_merge === true) return null;

  const repo = String(clusterPlan?.repo ?? job?.frontmatter?.repo ?? "");
  const canonical = firstCanonicalPullItem({ job, clusterPlan });
  if (!canonical) return null;
  if (canonical.state !== "open") return null;
  if (canonical.security_sensitive === true || canonical.security_repair_allowed === true) {
    return null;
  }
  if (canonical.pull_request?.branch_writable !== true) return null;
  if (canonical.pull_request?.files_truncated > 0) return null;

  const files = (canonical.pull_request?.files ?? [])
    .map((file: JsonValue) => file?.filename ?? file?.path ?? file)
    .filter(Boolean);
  const changelogReason = automergeChangelogBlockReason({
    repo,
    title: canonical.title,
    files,
  });
  if (!changelogReason) return null;

  const number = Number(canonical.number);
  if (!Number.isInteger(number) || number <= 0) return null;
  const ref = `#${number}`;
  const prUrl = `https://github.com/${repo}/pull/${number}`;
  const title = String(canonical.title ?? `fix: update ${ref}`).trim();
  const summary = `Deterministic automerge repair: add the missing CHANGELOG.md entry for ${ref}.`;
  const fixArtifact = {
    summary,
    affected_surfaces: ["CHANGELOG.md"],
    likely_files: ["CHANGELOG.md"],
    linked_refs: [ref],
    validation_commands: ["git diff --check"],
    changelog_required: true,
    credit_notes: [`Source PR: ${prUrl}`],
    pr_title: title,
    pr_body: `Adds the required CHANGELOG.md entry for ${prUrl} before ClawSweeper automerge.`,
    source_prs: [prUrl],
    repair_strategy: "repair_contributor_branch",
    allow_no_pr: false,
    branch_update_blockers: [],
  };

  return {
    status: "planned",
    repo,
    cluster_id: String(clusterPlan?.cluster_id ?? job?.frontmatter?.cluster_id ?? ""),
    mode,
    summary,
    actions: [
      {
        target: ref,
        action: "build_fix_artifact",
        status: "planned",
        idempotency_key: `${clusterPlan?.cluster_id ?? "automerge"}:${number}:changelog-repair`,
        classification: "canonical",
        target_kind: "pull_request",
        target_updated_at: canonical.updated_at ?? null,
        canonical: ref,
        duplicate_of: null,
        candidate_fix: ref,
        comment: null,
        evidence: [changelogReason, `Source PR: ${prUrl}`],
        reason: changelogReason,
      },
    ],
    needs_human: [],
    canonical: ref,
    canonical_issue: null,
    canonical_pr: ref,
    merge_preflight: [],
    fix_artifact: fixArtifact,
  };
}

function firstCanonicalPullItem({ job, clusterPlan }: LooseRecord): LooseRecord | null {
  const canonicalNumbers = new Set(
    (job?.frontmatter?.canonical ?? [])
      .map((ref: JsonValue) => Number(String(ref ?? "").replace(/^#/, "")))
      .filter((number: number) => Number.isInteger(number) && number > 0),
  );
  for (const item of clusterPlan?.items ?? []) {
    if (item?.kind !== "pull_request") continue;
    const number = Number(item.number);
    if (canonicalNumbers.size > 0 && !canonicalNumbers.has(number)) continue;
    return item;
  }
  return null;
}
