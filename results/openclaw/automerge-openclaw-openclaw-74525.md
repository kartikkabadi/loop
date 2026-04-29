---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-74525"
mode: "autonomous"
run_id: "25127265443"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25127265443"
head_sha: "ddd034c11f13d7bf4e939ef42a2b855d2973b948"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-29T19:10:40.486Z"
canonical: "https://github.com/openclaw/openclaw/pull/74525"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/74525"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-74525

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25127265443](https://github.com/openclaw/clawsweeper/actions/runs/25127265443)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/74525

## Summary

PR #74525 is the canonical repair candidate for the `/models` agent-scoped auth regression, but the hydrated ClawSweeper review requires a narrow follow-up change before merge. The PR branch cannot be safely updated by this worker because `maintainer_can_modify` is false, and merge/close are blocked by job policy, so the correct autonomous output is a credited replacement fix artifact rather than a merge or closure plan.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 1 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74564 | clawsweeper/automerge-openclaw-openclaw-74525 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74564 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74525 | fix_needed | planned | canonical | Canonical PR is useful but not merge-ready, and the branch cannot be safely repaired in place because `maintainer_can_modify` is false. |
| cluster:automerge-openclaw-openclaw-74525 | build_fix_artifact | planned |  | A replacement fix PR is allowed by the job and is safer than attempting to update an unmodifiable PR branch. |
| #74423 | keep_closed | skipped | fixed_by_candidate | Already closed context item; no mutation should be emitted. |

## Needs Human

- none
