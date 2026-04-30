# Open ClawSweeper Repair PR Finalizer

Generated: 2026-04-30T00:34:20.333Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 11 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 5 |
| mergeability_unknown | 0 |
| needs_checks | 9 |
| needs_review | 0 |
| needs_merge_preflight | 11 |
| needs_result_backfill | 2 |

## Dispatch

Enabled: no

Status: report_only

| PR | Cluster | Job | Mode | Blockers |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Open PRs

| PR | Title | Cluster | Mergeable | Merge State | Checks | Blockers | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#74697](https://github.com/openclaw/openclaw/pull/74697) | fix(sdk): treat terminal wait timeouts as timed out | clawsweeper-commit-openclaw-openclaw-29de89a8d98c | MERGEABLE | UNSTABLE | CANCELLED:3 SKIPPED:11 SUCCESS:16 IN_PROGRESS:44; blockers:44 | needs_merge_state:UNSTABLE, needs_checks:CI / build-artifacts:IN_PROGRESS; CI / checks-fast-bundled:IN_PROGRESS; CI / checks-fast-contracts-plugins-a:IN_PROGRESS, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74696](https://github.com/openclaw/openclaw/pull/74696) | fix: environment edge case launcher regression | clawsweeper-commit-openclaw-openclaw-52b57d095341 | MERGEABLE | UNSTABLE | CANCELLED:3 SKIPPED:12 SUCCESS:62 FAILURE:2 IN_PROGRESS:1; blockers:3 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-auto-reply-reply-dispatch:IN_PROGRESS; CI / checks-node-core-support-boundary:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74673](https://github.com/openclaw/openclaw/pull/74673) | fix: compatibility gaps in the new Google Vertex ADC manifest evidence | clawsweeper-commit-openclaw-openclaw-dec5de8a2cda | MERGEABLE | UNSTABLE | CANCELLED:3 SKIPPED:11 SUCCESS:67 FAILURE:2; blockers:2 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-agentic-commands-models:FAILURE; CI / checks-node-core:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74672](https://github.com/openclaw/openclaw/pull/74672) | fix: changed explicit-path handling regression | clawsweeper-commit-openclaw-openclaw-78f347036848 | MERGEABLE | UNSTABLE | CANCELLED:3 SKIPPED:12 SUCCESS:66 FAILURE:2; blockers:2 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-agentic-commands-models:FAILURE; CI / checks-node-core:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74670](https://github.com/openclaw/openclaw/pull/74670) | fix: production change appears intentional, but an existing focused test file still asserts t... | clawsweeper-commit-openclaw-openclaw-a0cf07ec1066 | CONFLICTING | DIRTY | CANCELLED:3 SKIPPED:13 SUCCESS:67 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74667](https://github.com/openclaw/openclaw/pull/74667) | fix: configs that used the previously documented WhatsApp exposeErrorText key now fail valida... | clawsweeper-commit-openclaw-openclaw-4cba08df01ea | MERGEABLE | UNSTABLE | CANCELLED:2 SKIPPED:12 SUCCESS:66 FAILURE:2; blockers:2 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-agentic-commands-models:FAILURE; CI / checks-node-core:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74585](https://github.com/openclaw/openclaw/pull/74585) | fix(ci): Found one CI reliability regression risk in the install-smoke Doc | clawsweeper-commit-openclaw-openclaw-dac72374944f | CONFLICTING | DIRTY | CANCELLED:3 SKIPPED:11 SUCCESS:68 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74564](https://github.com/openclaw/openclaw/pull/74564) | fix: use agent auth scope in /models provider data | automerge-openclaw-openclaw-74525 | CONFLICTING | DIRTY | CANCELLED:2 SKIPPED:10 SUCCESS:63 FAILURE:5; blockers:5 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / check-lint:FAILURE; CI / checks-node-channels:FAILURE; CI / checks-node-core-support-boundary:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74528](https://github.com/openclaw/openclaw/pull/74528) | fix: Found one compatibility regression in the new global Codex dynami | clawsweeper-commit-openclaw-openclaw-09baec68eac7 | CONFLICTING | DIRTY | CANCELLED:1 SKIPPED:14 SUCCESS:62 FAILURE:5; blockers:5 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI / checks-node-channels:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74522](https://github.com/openclaw/openclaw/pull/74522) | fix: Found one concrete regression in the new lock-owner disambiguatio | clawsweeper-commit-openclaw-openclaw-2d885a240272 | MERGEABLE | UNSTABLE | CANCELLED:3 SKIPPED:12 SUCCESS:62 FAILURE:5; blockers:5 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI / checks-node-channels:FAILURE, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74521](https://github.com/openclaw/openclaw/pull/74521) | fix: Found two concrete regressions in the shared helper extraction. T | clawsweeper-commit-openclaw-openclaw-0519107bd3e2 | CONFLICTING | DIRTY | CANCELLED:2 SKIPPED:13 SUCCESS:63 FAILURE:5; blockers:5 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI / checks-node-channels:FAILURE, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
