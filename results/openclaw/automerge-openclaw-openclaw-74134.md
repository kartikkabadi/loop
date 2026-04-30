---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-74134"
mode: "autonomous"
run_id: "25145015721"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25145015721"
head_sha: "3014dd725b08204c81c0b8f91cb1327228272722"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-04-30T03:11:33.462Z"
canonical: "https://github.com/openclaw/openclaw/pull/74742"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/74742"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-74134

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25145015721](https://github.com/openclaw/clawsweeper/actions/runs/25145015721)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/74742

## Summary

#74742 is the canonical repair path for the adopted #74134 work. Merge and close remain blocked by job policy. The hydrated artifact shows #74742 is open, dirty against current main, and has a fresh maintainer rebase request after prior ClawSweeper branch repairs, so the next executable action is a narrow branch refresh of #74742 with no feature-scope expansion.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74134 | close_superseded | blocked | superseded | Superseded closeout is blocked by job policy (`blocked_actions: close`, `require_human_for: close`) and should wait for maintainer approval after the canonical path is finalized. |
| #74742 | fix_needed | planned | canonical | Refresh the existing canonical ClawSweeper repair branch against current main and rerun the required review/check gate before any later maintainer merge decision. |
| cluster:automerge-openclaw-openclaw-74134 | build_fix_artifact | planned |  | A narrow repair artifact is needed because #74742 is canonical but dirty/stale and final merge is disabled. |

## Needs Human

- none
