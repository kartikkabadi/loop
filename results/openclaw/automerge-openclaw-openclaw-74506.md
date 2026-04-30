---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-74506"
mode: "autonomous"
run_id: "25178164849"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25178164849"
head_sha: "748ecea34a3fcf2c97c34061c394998ea87cb7b6"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T17:12:12.718Z"
canonical: "https://github.com/openclaw/openclaw/pull/74506"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/74506"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-74506

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25178164849](https://github.com/openclaw/clawsweeper/actions/runs/25178164849)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/74506

## Summary

PR #74506 is the canonical automerge candidate, but it is not merge-ready: the hydrated artifact shows current failing checks and the source branch has maintainer_can_modify=false. Merge and close actions are blocked by job policy, so the safe path is a narrow credited replacement fix artifact for the Discord mention-formatting guidance.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75173 | clawsweeper/automerge-openclaw-openclaw-74506 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75173 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74506 | fix_needed | planned | canonical | Canonical PR #74506 needs repair/replacement before automerge because current checks are failing and the branch is not safely editable by maintainers. |
| cluster:automerge-openclaw-openclaw-74506 | build_fix_artifact | planned |  | Create a narrow credited replacement PR because the useful source PR cannot be safely updated and has failing current checks. |

## Needs Human

- none
