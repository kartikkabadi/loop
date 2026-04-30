---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-74134"
mode: "autonomous"
run_id: "25144807072"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25144807072"
head_sha: "3f3fcf7061e81b6ced8226113d5d269ea9fedd62"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T02:53:36.526Z"
canonical: "https://github.com/openclaw/openclaw/pull/74742"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/74742"
actions_total: 3
fix_executed: 1
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 1
needs_human_count: 0
---

# automerge-openclaw-openclaw-74134

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25144807072](https://github.com/openclaw/clawsweeper/actions/runs/25144807072)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/74742

## Summary

#74742 is the canonical repair path for the adopted #74134 work. Merge and close are disabled for this job. The hydrated artifact shows #74742 is open, dirty against main, and has a fresh maintainer `@clawsweeper rebase` command after the branch repair that addressed the prior ClawSweeper P3 finding, so the executable next step is a bounded repair of the existing #74742 branch.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
| Fix executed | 1 |
| Fix failed | 0 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 1 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| execute_fix | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 |
| automerge_repair_outcome_comment | executed | #74742 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74134 | close_superseded | skipped | superseded | Superseded by hydrated replacement PR #74742, but close is blocked by job policy (`blocked_actions: close`, `require_human_for: close`, and no post-merge close permission). |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74134 | close_superseded | blocked | superseded | Superseded by hydrated replacement PR #74742, but close is blocked by job policy (`blocked_actions: close`, `require_human_for: close`, and no post-merge close permission). |
| #74742 | fix_needed | planned | canonical | Canonical PR is useful but dirty/stale and has a fresh rebase request; repair the existing ClawSweeper branch and rerun validation/review. |
| cluster:automerge-openclaw-openclaw-74134 | build_fix_artifact | planned |  | Emit an executable branch-repair artifact for the deterministic executor. |

## Needs Human

- none
