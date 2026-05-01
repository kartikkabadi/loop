---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-8989ceee50ab"
mode: "autonomous"
run_id: "25200467866"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25200467866"
head_sha: "b6f9a88f7ef25867bcf0e4e517d7f9f5a2b65985"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T03:21:37.724Z"
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

# clawsweeper-commit-openclaw-openclaw-8989ceee50ab

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25200467866](https://github.com/openclaw/clawsweeper/actions/runs/25200467866)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one regression: the commit removes the runtime warning for the default group/channel private-reply behavior, but the new doctor warning only covers the narrower “message tool unavailable” mismatch. A common upgraded config with channels configured and the message tool available still gets no runtime warning and no doctor warning, while normal final replies remain private.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75388 | clawsweeper/clawsweeper-commit-openclaw-openclaw-8989ceee50ab |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75388 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-8989ceee50ab | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
