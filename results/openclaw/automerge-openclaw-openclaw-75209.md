---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75209"
mode: "autonomous"
run_id: "25185078489"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25185078489"
head_sha: "bf8f139d3d325824be0fc8baef1333d63bc3fde2"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-04-30T19:31:03.503Z"
canonical: "https://github.com/openclaw/openclaw/pull/75209"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75209"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75209

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25185078489](https://github.com/openclaw/clawsweeper/actions/runs/25185078489)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75209

## Summary

#75209 is the canonical automerge PR and is repairable in place because the same-repo head branch is writable. The ClawSweeper review passed for head ec48bda063a3cb55ef0309868bd9909f213bcdce, but the parity gate failed, so the executor should repair/revalidate the contributor branch rather than merge or close anything. #70055 remains an open related follow-up for the broader user-facing config/env opt-out and is not covered by this PR.

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
| #75209 | fix_needed | planned | canonical | The PR is useful and repairable, but it is not merge-ready because a relevant parity gate is failing. |
| #70055 | keep_related | planned | related | Related follow-up, not a duplicate and not fixed by #75209. |
| cluster:automerge-openclaw-openclaw-75209 | build_fix_artifact | planned |  | Create an executable repair plan for the writable source branch; do not open a replacement PR unless branch update fails. |

## Needs Human

- none
