---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-29de89a8d98c"
mode: "autonomous"
run_id: "25140090515"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25140090515"
head_sha: "bdb4f5f81092fd637f0cb02d22729c9dcbcae87a"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T00:01:51.069Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-29de89a8d98c

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25140090515](https://github.com/openclaw/clawsweeper/actions/runs/25140090515)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one SDK regression in the new wait-status mapping.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| execute_fix | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=all [check:changed] extension-impacting surface; extension typecheck included [check:changed] packages/sdk/src/client.ts: core production [check:changed] packages/sdk/src/index.test.ts: core test [check:changed] pnpm-lock.yaml: root config/package surface [check:changed] conflict markers [check:changed] changelog attributions [check:changed] guarded extension wildcard re-exports [check:changed] plugin-sdk wildcard re-exports [check:changed] duplicate scan target coverage [check:changed] runtime sidecar loader guard [check:changed] typecheck all [check:changed] lint [oxlint:core] starting [oxlint:extensions] starting [oxlint:scripts] starting [oxlint:scripts] finished [oxlint:core] finished [oxlint:extensions] finished [check:changed] summary 445ms ok conflict markers 179ms ok changelog attributions 195ms ok guarded extension wildcard re-exports 183ms ok plugin-sdk wildcard re-exports 197ms ok duplicate scan target coverage 3.33s ok runtime sidecar loader guard 24.67s ok typecheck all 26.28s failed:1 lint |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-29de89a8d98c | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
