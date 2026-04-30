# Open ClawSweeper Repair PR Finalizer

Generated: 2026-04-30T18:45:25.926Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 5 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 2 |
| mergeability_unknown | 0 |
| needs_checks | 1 |
| needs_review | 0 |
| needs_merge_preflight | 5 |
| needs_result_backfill | 0 |

## Dispatch

Enabled: no

Status: report_only

| PR | Cluster | Job | Mode | Blockers |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Open PRs

| PR | Title | Cluster | Mergeable | Merge State | Checks | Blockers | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#75173](https://github.com/openclaw/openclaw/pull/75173) | fix(discord): document mention formatting guidance | automerge-openclaw-openclaw-74506 | MERGEABLE | CLEAN | CANCELLED:4 SKIPPED:26 SUCCESS:70 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75148](https://github.com/openclaw/openclaw/pull/75148) | fix: fallback path user-visible bug | clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | MERGEABLE | CLEAN | CANCELLED:3 SKIPPED:25 SUCCESS:75 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75146](https://github.com/openclaw/openclaw/pull/75146) | fix: opt-in compaction precheck path mid-turn retry regression | clawsweeper-commit-openclaw-openclaw-b85147ff7615 | MERGEABLE | CLEAN | CANCELLED:4 SKIPPED:26 SUCCESS:76 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#74699](https://github.com/openclaw/openclaw/pull/74699) | fix: Codex app-server steering path regression | clawsweeper-commit-openclaw-openclaw-30a2b3049ae0 | CONFLICTING | DIRTY | SUCCESS:68 SKIPPED:10 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74564](https://github.com/openclaw/openclaw/pull/74564) | fix: use agent auth scope in /models provider data | automerge-openclaw-openclaw-74525 | CONFLICTING | DIRTY | CANCELLED:2 SKIPPED:10 SUCCESS:63 FAILURE:5; blockers:5 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / check-lint:FAILURE; CI / checks-node-channels:FAILURE; CI / checks-node-core-support-boundary:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
