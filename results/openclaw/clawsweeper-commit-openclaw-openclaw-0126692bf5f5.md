---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-0126692bf5f5"
mode: "autonomous"
run_id: "25124606198"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25124606198"
head_sha: "7ea202eaffda8ccbd1ece766c421d4d04c50922e"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-29T17:58:39.924Z"
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

# clawsweeper-commit-openclaw-openclaw-0126692bf5f5

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25124606198](https://github.com/openclaw/clawsweeper/actions/runs/25124606198)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one medium-confidence docs deployment compatibility risk: the checker now allows `th`, but current official Mintlify schema docs do not list `th` as a supported `navigation.languages[].language` code.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74512 | clawsweeper/clawsweeper-commit-openclaw-openclaw-0126692bf5f5 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74512 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-0126692bf5f5 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
