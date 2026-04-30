---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-74472"
mode: "autonomous"
run_id: "25179871788"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25179871788"
head_sha: "c6aa2541d42a927df1a768a12d4a24bc119362bf"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T17:46:58.563Z"
canonical: "https://github.com/openclaw/openclaw/pull/74472"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/74472"
actions_total: 2
fix_executed: 1
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-74472

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25179871788](https://github.com/openclaw/clawsweeper/actions/runs/25179871788)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/74472

## Summary

PR #74472 is the canonical narrow gateway fix, but it is not merge-ready because the hydrated preflight shows `checks-node-channels` failing and `maintainer_can_modify=false`, so ClawSweeper cannot safely repair the contributor branch directly. Plan a credited replacement fix artifact carrying forward #74472's implementation and attribution.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
| Fix executed | 1 |
| Fix failed | 0 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| execute_fix | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] src/gateway/operator-approvals-client.test.ts: core test [check:changed] src/gateway/operator-approvals-client.ts: core production [check:changed] src/gateway/server.silent-scope-upgrade-reconnect.poc.test.ts: core test [check:changed] conflict markers [check:changed] changelog attributions [check:changed] guarded extension wildcard re-exports [check:changed] plugin-sdk wildcard re-exports [check:changed] duplicate scan target coverage [check:changed] typecheck core [check:changed] typecheck core tests [check:changed] lint core [check:changed] summary 488ms ok conflict markers 159ms ok changelog attributions 176ms ok guarded extension wildcard re-exports 168ms ok plugin-sdk wildcard re-exports 184ms ok duplicate scan target coverage 1.11s ok typecheck core 1.80s ok typecheck core tests 8.09s failed:1 lint core > openclaw@2026.4.27 check:changed /tmp/clawsweeper-repair-fix-xt1UP0/openclaw-openclaw > node scripts/check-changed.mjs > openclaw@2026.4.27 check:no-conflict-markers /tmp/clawsweeper-repair-fix-xt1UP0/openclaw-openclaw > node scripts/check-no-conflict-markers.mjs > openclaw@2026.4.27 check:changelog-attributions... |
| automerge_repair_outcome_comment | executed | #74472 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74472 | fix_needed | planned | canonical | Canonical PR is useful and narrow but needs CI repair through a replacement branch because the original branch is not maintainer-modifiable in the hydrated artifact. |
| cluster:automerge-openclaw-openclaw-74472 | build_fix_artifact | planned | canonical | Build a narrow credited replacement PR because fix PRs are allowed, merge/close are blocked, and the source branch cannot be updated safely by this worker. |

## Needs Human

- none
