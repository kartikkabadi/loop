# Open ClawSweeper Repair PR Finalizer

Generated: 2026-04-30T16:24:12.423Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 7 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 4 |
| mergeability_unknown | 0 |
| needs_checks | 5 |
| needs_review | 0 |
| needs_merge_preflight | 7 |
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
| [#75148](https://github.com/openclaw/openclaw/pull/75148) | fix: fallback path user-visible bug | clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | MERGEABLE | CLEAN | CANCELLED:3 SKIPPED:25 SUCCESS:75 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75146](https://github.com/openclaw/openclaw/pull/75146) | fix: opt-in compaction precheck path mid-turn retry regression | clawsweeper-commit-openclaw-openclaw-b85147ff7615 | MERGEABLE | UNSTABLE | CANCELLED:4 IN_PROGRESS:1 SKIPPED:26 SUCCESS:75 NEUTRAL:1; blockers:1 | needs_merge_state:UNSTABLE, needs_checks:Parity gate / Run the OpenAI / Opus 4.6 parity gate against the qa-lab mock:IN_PROGRESS, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74699](https://github.com/openclaw/openclaw/pull/74699) | fix: Codex app-server steering path regression | clawsweeper-commit-openclaw-openclaw-30a2b3049ae0 | CONFLICTING | DIRTY | SUCCESS:68 SKIPPED:10 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74564](https://github.com/openclaw/openclaw/pull/74564) | fix: use agent auth scope in /models provider data | automerge-openclaw-openclaw-74525 | CONFLICTING | DIRTY | CANCELLED:2 SKIPPED:10 SUCCESS:63 FAILURE:5; blockers:5 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / check-lint:FAILURE; CI / checks-node-channels:FAILURE; CI / checks-node-core-support-boundary:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74528](https://github.com/openclaw/openclaw/pull/74528) | fix: Found one compatibility regression in the new global Codex dynami | clawsweeper-commit-openclaw-openclaw-09baec68eac7 | CONFLICTING | DIRTY | CANCELLED:1 SKIPPED:14 SUCCESS:62 FAILURE:5; blockers:5 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI / checks-node-channels:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74522](https://github.com/openclaw/openclaw/pull/74522) | fix: Found one concrete regression in the new lock-owner disambiguatio | clawsweeper-commit-openclaw-openclaw-2d885a240272 | MERGEABLE | UNSTABLE | CANCELLED:3 SKIPPED:12 SUCCESS:62 FAILURE:5; blockers:5 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI / checks-node-channels:FAILURE, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74521](https://github.com/openclaw/openclaw/pull/74521) | fix: Found two concrete regressions in the shared helper extraction. T | clawsweeper-commit-openclaw-openclaw-0519107bd3e2 | CONFLICTING | DIRTY | CANCELLED:2 SKIPPED:13 SUCCESS:63 FAILURE:5; blockers:5 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI / checks-node-channels:FAILURE, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
