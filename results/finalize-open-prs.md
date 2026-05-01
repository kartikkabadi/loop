# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-01T01:01:36.348Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 8 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 2 |
| mergeability_unknown | 0 |
| needs_checks | 1 |
| needs_review | 0 |
| needs_merge_preflight | 8 |
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
| [#75315](https://github.com/openclaw/openclaw/pull/75315) | fix: Windows stale-import guard still generates an invalid PowerShell regex, so the intended... | clawsweeper-commit-openclaw-openclaw-52bf20b07d6e | MERGEABLE | UNSTABLE | CANCELLED:3 SKIPPED:13 SUCCESS:65 FAILURE:2; blockers:2 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-core:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#75293](https://github.com/openclaw/openclaw/pull/75293) | fix: macOS-only Parallels smoke harness regression | clawsweeper-commit-openclaw-openclaw-af5a1fbddb14 | CONFLICTING | DIRTY | CANCELLED:3 SKIPPED:13 SUCCESS:67 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75282](https://github.com/openclaw/openclaw/pull/75282) | fix: TTS fallback fix removes the global plugin-disable guard for every capability provider... | clawsweeper-commit-openclaw-openclaw-1d74ecd71f0f | MERGEABLE | CLEAN | CANCELLED:3 SKIPPED:24 SUCCESS:75 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75223](https://github.com/openclaw/openclaw/pull/75223) | fix: CLI auth status/probe path regression | clawsweeper-commit-openclaw-openclaw-581fbea1d653 | CONFLICTING | DIRTY | CANCELLED:4 SKIPPED:13 SUCCESS:73 NEUTRAL:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75213](https://github.com/openclaw/openclaw/pull/75213) | fix: Codex app-server silence timeout reliability issue | clawsweeper-commit-openclaw-openclaw-54e6e3d7daf5 | MERGEABLE | CLEAN | CANCELLED:1 SKIPPED:13 SUCCESS:67 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75173](https://github.com/openclaw/openclaw/pull/75173) | fix(discord): document mention formatting guidance | automerge-openclaw-openclaw-74506 | MERGEABLE | CLEAN | CANCELLED:4 SKIPPED:26 SUCCESS:70 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75148](https://github.com/openclaw/openclaw/pull/75148) | fix: fallback path user-visible bug | clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | MERGEABLE | CLEAN | CANCELLED:3 SKIPPED:25 SUCCESS:75 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75146](https://github.com/openclaw/openclaw/pull/75146) | fix: opt-in compaction precheck path mid-turn retry regression | clawsweeper-commit-openclaw-openclaw-b85147ff7615 | MERGEABLE | CLEAN | CANCELLED:4 SKIPPED:26 SUCCESS:76 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
