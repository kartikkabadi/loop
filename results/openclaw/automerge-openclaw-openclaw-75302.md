---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75302"
mode: "autonomous"
run_id: "25195458983"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25195458983"
head_sha: "5e9fc30229dd49254c644ac79df3a311e55ecb04"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T00:23:01.719Z"
canonical: "https://github.com/openclaw/openclaw/pull/75302"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75302"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75302

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25195458983](https://github.com/openclaw/clawsweeper/actions/runs/25195458983)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75302

## Summary

PR #75302 is the calibrated canonical repair target. It is open, same-repo branch writable, and useful, but not merge-ready: ClawSweeper review requested three narrow test/type repairs and CI has relevant failures in check-additional/runtime-topology-architecture and check-test-types. Merge and close are blocked by job policy, so the safe next action is to repair the contributor branch and rerun review/check gates.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75302 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75302 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75302 | fix_needed | planned | canonical | Canonical PR is useful and writable, but it has unresolved ClawSweeper review findings and failing relevant checks. |
| cluster:automerge-openclaw-openclaw-75302 | build_fix_artifact | planned |  | Produce an executable repair plan for the canonical contributor PR branch. |

## Needs Human

- none
