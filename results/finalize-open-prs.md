# Open ClawSweeper Repair PR Finalizer

Generated: 2026-04-30T04:12:24.366Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 19 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 8 |
| mergeability_unknown | 0 |
| needs_checks | 7 |
| needs_review | 0 |
| needs_merge_preflight | 19 |
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
| [#74805](https://github.com/openclaw/openclaw/pull/74805) | fix: production/test-runtime contract mismatch in the observe-only prepared-turn path | clawsweeper-commit-openclaw-openclaw-bbf932fd7d69 | MERGEABLE | CLEAN | CANCELLED:2 SKIPPED:12 SUCCESS:73 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#74795](https://github.com/openclaw/openclaw/pull/74795) | fix: fixed condition order prefers a top-level require export before a node condition, which... | clawsweeper-commit-openclaw-openclaw-6877360218c9 | MERGEABLE | CLEAN | CANCELLED:3 SKIPPED:24 SUCCESS:75 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#74792](https://github.com/openclaw/openclaw/pull/74792) | fix: provider-based bundled runtime dependency selection regression | clawsweeper-commit-openclaw-openclaw-09310931cf94 | MERGEABLE | CLEAN | CANCELLED:3 SKIPPED:24 SUCCESS:75 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#74789](https://github.com/openclaw/openclaw/pull/74789) | fix(ci): committed Plugin SDK API baseline hash is not reproducible from the committed source... | clawsweeper-commit-openclaw-openclaw-db1832355101 | CONFLICTING | DIRTY | CANCELLED:3 SKIPPED:10 SUCCESS:68 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74770](https://github.com/openclaw/openclaw/pull/74770) | fix: package entry-file validation regression | clawsweeper-commit-openclaw-openclaw-df4faac71fd9 | CONFLICTING | DIRTY | CANCELLED:1 SKIPPED:12 SUCCESS:73 NEUTRAL:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74764](https://github.com/openclaw/openclaw/pull/74764) | fix: commit exposes max in the Bedrock Opus 4.7 thinking profile, but the current runtime pat... | clawsweeper-commit-openclaw-openclaw-b07c7f6ab3e0 | MERGEABLE | CLEAN | CANCELLED:1 SKIPPED:12 SUCCESS:67 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#74762](https://github.com/openclaw/openclaw/pull/74762) | fix: gateway model catalog cache regression | clawsweeper-commit-openclaw-openclaw-6421e1f36a3c | MERGEABLE | CLEAN | CANCELLED:1 SKIPPED:11 SUCCESS:74 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#74755](https://github.com/openclaw/openclaw/pull/74755) | fix: Slack select value cap likely regression | clawsweeper-commit-openclaw-openclaw-fc8fafbd2f59 | MERGEABLE | CLEAN | CANCELLED:3 SKIPPED:13 SUCCESS:67 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#74714](https://github.com/openclaw/openclaw/pull/74714) | fix: Google Vertex manifest evidence accepts the Windows %APPDATA% ADC path, but the Google V... | clawsweeper-commit-openclaw-openclaw-3bd6b54f0b3a | MERGEABLE | CLEAN | CANCELLED:3 SKIPPED:12 SUCCESS:67 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#74703](https://github.com/openclaw/openclaw/pull/74703) | fix: Windows-specific reliability gap in the new timeout cleanup path | clawsweeper-commit-openclaw-openclaw-5a631e1ee9fa | MERGEABLE | UNSTABLE | CANCELLED:4 SKIPPED:13 SUCCESS:65 FAILURE:2; blockers:2 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-support-boundary:FAILURE; CI / checks-node-core:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74699](https://github.com/openclaw/openclaw/pull/74699) | fix: Codex app-server steering path regression | clawsweeper-commit-openclaw-openclaw-30a2b3049ae0 | CONFLICTING | DIRTY | SUCCESS:68 SKIPPED:10 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74697](https://github.com/openclaw/openclaw/pull/74697) | fix(sdk): treat terminal wait timeouts as timed out | clawsweeper-commit-openclaw-openclaw-29de89a8d98c | CONFLICTING | DIRTY | SUCCESS:68 SKIPPED:9 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74696](https://github.com/openclaw/openclaw/pull/74696) | fix: environment edge case launcher regression | clawsweeper-commit-openclaw-openclaw-52b57d095341 | MERGEABLE | UNSTABLE | CANCELLED:3 SKIPPED:12 SUCCESS:63 FAILURE:3; blockers:3 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-core-support-boundary:FAILURE; CI / checks-node-core:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74667](https://github.com/openclaw/openclaw/pull/74667) | fix: configs that used the previously documented WhatsApp exposeErrorText key now fail valida... | clawsweeper-commit-openclaw-openclaw-4cba08df01ea | MERGEABLE | UNSTABLE | CANCELLED:2 SKIPPED:12 SUCCESS:66 FAILURE:2; blockers:2 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-agentic-commands-models:FAILURE; CI / checks-node-core:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74585](https://github.com/openclaw/openclaw/pull/74585) | fix(ci): Found one CI reliability regression risk in the install-smoke Doc | clawsweeper-commit-openclaw-openclaw-dac72374944f | CONFLICTING | DIRTY | CANCELLED:3 SKIPPED:11 SUCCESS:68 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74564](https://github.com/openclaw/openclaw/pull/74564) | fix: use agent auth scope in /models provider data | automerge-openclaw-openclaw-74525 | CONFLICTING | DIRTY | CANCELLED:2 SKIPPED:10 SUCCESS:63 FAILURE:5; blockers:5 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / check-lint:FAILURE; CI / checks-node-channels:FAILURE; CI / checks-node-core-support-boundary:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74528](https://github.com/openclaw/openclaw/pull/74528) | fix: Found one compatibility regression in the new global Codex dynami | clawsweeper-commit-openclaw-openclaw-09baec68eac7 | CONFLICTING | DIRTY | CANCELLED:1 SKIPPED:14 SUCCESS:62 FAILURE:5; blockers:5 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI / checks-node-channels:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74522](https://github.com/openclaw/openclaw/pull/74522) | fix: Found one concrete regression in the new lock-owner disambiguatio | clawsweeper-commit-openclaw-openclaw-2d885a240272 | MERGEABLE | UNSTABLE | CANCELLED:3 SKIPPED:12 SUCCESS:62 FAILURE:5; blockers:5 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI / checks-node-channels:FAILURE, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74521](https://github.com/openclaw/openclaw/pull/74521) | fix: Found two concrete regressions in the shared helper extraction. T | clawsweeper-commit-openclaw-openclaw-0519107bd3e2 | CONFLICTING | DIRTY | CANCELLED:2 SKIPPED:13 SUCCESS:63 FAILURE:5; blockers:5 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI / checks-node-channels:FAILURE, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
