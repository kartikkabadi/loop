---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-82ca6ecdde80"
mode: "autonomous"
run_id: "25170490125"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25170490125"
head_sha: "d5085bb77dc49a57a6ca048d327aba9b76ee4cc7"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T15:55:30.433Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-82ca6ecdde80

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25170490125](https://github.com/openclaw/clawsweeper/actions/runs/25170490125)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one user-visible bug in the new fallback path: some channel flows still keep replies private even when the `message` tool is unavailable, so the intended “surface private group replies” behavior is bypassed.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75148 | clawsweeper/clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75148 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
