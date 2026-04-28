# ClawSweeper

ClawSweeper is the conservative maintenance bot for OpenClaw repositories. It
currently sweeps `openclaw/openclaw` and `openclaw/clawhub`.

It keeps one markdown report per open issue or PR, publishes one durable Codex
automated review comment when useful, and only closes items when the evidence is
strong.

## Guardrails

ClawSweeper may propose a close only when the item is clearly one of these:

- implemented on current `main`
- not reproducible on current `main`
- better suited for ClawHub skill/plugin work than core
- duplicate or superseded by a canonical issue/PR
- concrete but not actionable in this source repo
- incoherent enough that no action can be taken
- stale issue older than 60 days with too little data to verify

Maintainer-authored items are never auto-closed. Everything else stays open.
Issues with an open PR that references them using GitHub closing syntax such as
`Fixes #123` stay open until that PR merges or is closed.
Open issue/PR pairs from the same author stay open together unless the paired
item is already resolved or a maintainer explicitly asks to close one side.

Repository profiles can further narrow apply. ClawHub is intentionally stricter:
it reviews every issue and PR, but apply may close only PRs where current `main`
already implements the proposed change with source-backed evidence.

## Dashboard

Last dashboard update: Apr 28, 2026, 11:15 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4230 |
| Open PRs | 3244 |
| Open items total | 7474 |
| Reviewed files | 7474 |
| Unreviewed open items | 0 |
| Due now by cadence | 3431 |
| Proposed closes awaiting apply | 3 |
| Closed by Codex apply | 10304 |
| Failed or stale reviews | 50 |
| Archived closed files | 13451 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6571 | 6571 | 0 | 3428 | 3 | 10301 | Apr 28, 2026, 11:13 UTC | Apr 28, 2026, 11:05 UTC | 473 |
| [ClawHub](https://github.com/openclaw/clawhub) | 903 | 903 | 0 | 3 | 0 | 3 | Apr 28, 2026, 11:02 UTC | Apr 28, 2026, 08:18 UTC | 422 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 28, 2026, 11:15 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25049625649) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 28, 2026, 11:03 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25046784787) |

### Fleet Activity

Latest review: Apr 28, 2026, 11:13 UTC. Latest close: Apr 28, 2026, 11:05 UTC. Latest comment sync: Apr 28, 2026, 11:13 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 57 | 2 | 55 | 0 | 3 | 391 | 0 |
| Last hour | 1121 | 12 | 1109 | 1 | 30 | 895 | 2 |
| Last 24 hours | 3013 | 88 | 2925 | 9 | 391 | 1027 | 14 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73509](https://github.com/openclaw/openclaw/issues/73509) | [Windows] Feishu channel crashes with ESM path error | already implemented on main | Apr 28, 2026, 11:05 UTC | [records/openclaw-openclaw/closed/73509.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73509.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73507](https://github.com/openclaw/openclaw/issues/73507) | plugin runtime config.loadConfig() is deprecated warning | already implemented on main | Apr 28, 2026, 11:03 UTC | [records/openclaw-openclaw/closed/73507.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73507.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73392](https://github.com/openclaw/openclaw/pull/73392) | fix(line): persist inbound media to ~/.openclaw/media/inbound/ via saveMediaBuffer | already implemented on main | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73392.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73392.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73364](https://github.com/openclaw/openclaw/pull/73364) | fix: reduce mirror lock hold time on slow filesystems (fixes #73339) | already implemented on main | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73364.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73498](https://github.com/openclaw/openclaw/pull/73498) | ci: shard config codeql quality | closed externally after review | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73498.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73498.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68634](https://github.com/openclaw/openclaw/issues/68634) | [Bug]: CLI commands repeatedly trigger scope-upgrade requests + Telegram Native Approvals fails with pairing required, generating persistent pending approvals | closed externally after review | Apr 28, 2026, 10:56 UTC | [records/openclaw-openclaw/closed/68634.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68634.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65486](https://github.com/openclaw/openclaw/issues/65486) | [Bug]: Gateway restart does not invalidate approval-pending session tool results - stale approval IDs cause INVALID_REQUEST loop on resume | closed externally after review | Apr 28, 2026, 10:56 UTC | [records/openclaw-openclaw/closed/65486.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65486.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73494](https://github.com/openclaw/openclaw/issues/73494) | [Feature]: Real-time Stock Data Access for Trading Assistant | belongs on ClawHub | Apr 28, 2026, 10:50 UTC | [records/openclaw-openclaw/closed/73494.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73494.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73490](https://github.com/openclaw/openclaw/pull/73490) | fix: sanitize subprocess call in DebugHandler.kt | cannot reproduce on current main | Apr 28, 2026, 10:50 UTC | [records/openclaw-openclaw/closed/73490.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73490.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73482](https://github.com/openclaw/openclaw/issues/73482) | Active Memory embedded run times out despite configured fast recall model | duplicate or superseded | Apr 28, 2026, 10:49 UTC | [records/openclaw-openclaw/closed/73482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73482.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73515](https://github.com/openclaw/openclaw/issues/73515) | Ollama provider: /think menu only shows 'off' for reasoning-capable models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73515.md) | complete | Apr 28, 2026, 11:13 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73503](https://github.com/openclaw/openclaw/pull/73503) | fix(cli): clarify mcp list registry scope | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73503.md) | complete | Apr 28, 2026, 11:11 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73499](https://github.com/openclaw/openclaw/pull/73499) | feat(agents): add mid-turn compaction precheck | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73499.md) | complete | Apr 28, 2026, 11:11 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73514](https://github.com/openclaw/openclaw/pull/73514) | fix(feishu): support form_value in card action callbacks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73514.md) | complete | Apr 28, 2026, 11:10 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73492](https://github.com/openclaw/openclaw/pull/73492) | feat: expose sessionId and sessionKey to provider createStreamFn plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73492.md) | complete | Apr 28, 2026, 11:10 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73419](https://github.com/openclaw/openclaw/pull/73419) | fix(onboarding): skip redundant install prompt when only one source e… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73419.md) | complete | Apr 28, 2026, 11:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73513](https://github.com/openclaw/openclaw/pull/73513) | fix: decode web fetch legacy charsets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73513.md) | complete | Apr 28, 2026, 11:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73493](https://github.com/openclaw/openclaw/pull/73493) | fix(memory-core): retry dreaming cron startup reconciliation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73493.md) | complete | Apr 28, 2026, 11:07 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73486](https://github.com/openclaw/openclaw/pull/73486) | fix(gateway): defer pricing refresh until ready | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73486.md) | complete | Apr 28, 2026, 11:07 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73275.md) | complete | Apr 28, 2026, 11:06 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 11:15 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25049625649](https://github.com/openclaw/clawsweeper/actions/runs/25049625649)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3358 |
| Open PRs | 3213 |
| Open items total | 6571 |
| Reviewed files | 6571 |
| Unreviewed open items | 0 |
| Archived closed files | 13441 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3331 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3191 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6522 |
| Proposed closes awaiting apply | 3 (0% of fresh reviews) |
| Closed by Codex apply | 10301 |
| Failed or stale reviews | 49 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 84/682 current (598 due, 12.3%) |
| Hourly hot item cadence (<7d) | 84/682 current (598 due, 12.3%) |
| Daily cadence coverage | 1231/4053 current (2822 due, 30.4%) |
| Daily PR cadence | 960/2811 current (1851 due, 34.2%) |
| Daily new issue cadence (<30d) | 271/1242 current (971 due, 21.8%) |
| Weekly older issue cadence | 1828/1836 current (8 due, 99.6%) |
| Due now by cadence | 3428 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 11:13 UTC. Latest close: Apr 28, 2026, 11:05 UTC. Latest comment sync: Apr 28, 2026, 11:13 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 26 | 2 | 24 | 0 | 3 | 391 | 0 |
| Last hour | 555 | 12 | 543 | 0 | 30 | 473 | 2 |
| Last 24 hours | 2100 | 85 | 2015 | 8 | 381 | 597 | 14 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73509](https://github.com/openclaw/openclaw/issues/73509) | [Windows] Feishu channel crashes with ESM path error | already implemented on main | Apr 28, 2026, 11:05 UTC | [records/openclaw-openclaw/closed/73509.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73509.md) |
| [#73507](https://github.com/openclaw/openclaw/issues/73507) | plugin runtime config.loadConfig() is deprecated warning | already implemented on main | Apr 28, 2026, 11:03 UTC | [records/openclaw-openclaw/closed/73507.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73507.md) |
| [#73392](https://github.com/openclaw/openclaw/pull/73392) | fix(line): persist inbound media to ~/.openclaw/media/inbound/ via saveMediaBuffer | already implemented on main | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73392.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73392.md) |
| [#73364](https://github.com/openclaw/openclaw/pull/73364) | fix: reduce mirror lock hold time on slow filesystems (fixes #73339) | already implemented on main | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73364.md) |
| [#73498](https://github.com/openclaw/openclaw/pull/73498) | ci: shard config codeql quality | closed externally after review | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73498.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73498.md) |
| [#68634](https://github.com/openclaw/openclaw/issues/68634) | [Bug]: CLI commands repeatedly trigger scope-upgrade requests + Telegram Native Approvals fails with pairing required, generating persistent pending approvals | closed externally after review | Apr 28, 2026, 10:56 UTC | [records/openclaw-openclaw/closed/68634.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68634.md) |
| [#65486](https://github.com/openclaw/openclaw/issues/65486) | [Bug]: Gateway restart does not invalidate approval-pending session tool results - stale approval IDs cause INVALID_REQUEST loop on resume | closed externally after review | Apr 28, 2026, 10:56 UTC | [records/openclaw-openclaw/closed/65486.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65486.md) |
| [#73494](https://github.com/openclaw/openclaw/issues/73494) | [Feature]: Real-time Stock Data Access for Trading Assistant | belongs on ClawHub | Apr 28, 2026, 10:50 UTC | [records/openclaw-openclaw/closed/73494.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73494.md) |
| [#73490](https://github.com/openclaw/openclaw/pull/73490) | fix: sanitize subprocess call in DebugHandler.kt | cannot reproduce on current main | Apr 28, 2026, 10:50 UTC | [records/openclaw-openclaw/closed/73490.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73490.md) |
| [#73482](https://github.com/openclaw/openclaw/issues/73482) | Active Memory embedded run times out despite configured fast recall model | duplicate or superseded | Apr 28, 2026, 10:49 UTC | [records/openclaw-openclaw/closed/73482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73482.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73515](https://github.com/openclaw/openclaw/issues/73515) | Ollama provider: /think menu only shows 'off' for reasoning-capable models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73515.md) | complete | Apr 28, 2026, 11:13 UTC |
| [#73503](https://github.com/openclaw/openclaw/pull/73503) | fix(cli): clarify mcp list registry scope | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73503.md) | complete | Apr 28, 2026, 11:11 UTC |
| [#73499](https://github.com/openclaw/openclaw/pull/73499) | feat(agents): add mid-turn compaction precheck | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73499.md) | complete | Apr 28, 2026, 11:11 UTC |
| [#73514](https://github.com/openclaw/openclaw/pull/73514) | fix(feishu): support form_value in card action callbacks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73514.md) | complete | Apr 28, 2026, 11:10 UTC |
| [#73492](https://github.com/openclaw/openclaw/pull/73492) | feat: expose sessionId and sessionKey to provider createStreamFn plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73492.md) | complete | Apr 28, 2026, 11:10 UTC |
| [#73419](https://github.com/openclaw/openclaw/pull/73419) | fix(onboarding): skip redundant install prompt when only one source e… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73419.md) | complete | Apr 28, 2026, 11:09 UTC |
| [#73513](https://github.com/openclaw/openclaw/pull/73513) | fix: decode web fetch legacy charsets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73513.md) | complete | Apr 28, 2026, 11:08 UTC |
| [#73493](https://github.com/openclaw/openclaw/pull/73493) | fix(memory-core): retry dreaming cron startup reconciliation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73493.md) | complete | Apr 28, 2026, 11:07 UTC |
| [#73486](https://github.com/openclaw/openclaw/pull/73486) | fix(gateway): defer pricing refresh until ready | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73486.md) | complete | Apr 28, 2026, 11:07 UTC |
| [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73275.md) | complete | Apr 28, 2026, 11:06 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 11:03 UTC

State: Review publish complete

Merged review artifacts for run 25046784787. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25046784787](https://github.com/openclaw/clawsweeper/actions/runs/25046784787)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 872 |
| Open PRs | 31 |
| Open items total | 903 |
| Reviewed files | 903 |
| Unreviewed open items | 0 |
| Archived closed files | 10 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 871 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 31 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 902 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 1 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 49/51 current (2 due, 96.1%) |
| Hourly hot item cadence (<7d) | 49/51 current (2 due, 96.1%) |
| Daily cadence coverage | 225/225 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 204/204 current (0 due, 100%) |
| Weekly older issue cadence | 626/627 current (1 due, 99.8%) |
| Due now by cadence | 3 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 11:02 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 10:53 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 31 | 0 | 31 | 0 | 0 | 0 | 0 |
| Last hour | 566 | 0 | 566 | 1 | 0 | 422 | 0 |
| Last 24 hours | 913 | 3 | 910 | 1 | 10 | 430 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |
| [#1699](https://github.com/openclaw/clawhub/issues/1699) | Plugin search returns 500, and plugin catalog breaks after page 2 | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/1699.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1699.md) |
| [#85](https://github.com/openclaw/clawhub/issues/85) | Clawhub Sort feature shows wrong results | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/85.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/85.md) |
| [#1736](https://github.com/openclaw/clawhub/pull/1736) | Align hover stats with denormalized counters and fix seed digest stat drift | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1736.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1736.md) |
| [#1324](https://github.com/openclaw/clawhub/pull/1324) | feat: add --dry-run flag to package publish command | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1324.md) |
| [#1240](https://github.com/openclaw/clawhub/pull/1240) | fix: use esbuild minification for safari builds | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1240.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1240.md) |
| [#1842](https://github.com/openclaw/clawhub/pull/1842) | fix: constrain plugin catalog queries | closed externally after review | Apr 28, 2026, 05:05 UTC | [records/openclaw-clawhub/closed/1842.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1842.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1302](https://github.com/openclaw/clawhub/issues/1302) | wentbackward/remote-claws | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1302.md) | complete | Apr 28, 2026, 11:02 UTC |
| [#1766](https://github.com/openclaw/clawhub/issues/1766) | False Positive: Liuyao Divination Skill Flagged as Suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1766.md) | complete | Apr 28, 2026, 11:02 UTC |
| [#1840](https://github.com/openclaw/clawhub/pull/1840) | fix: support org-owned skill publishes via API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1840.md) | complete | Apr 28, 2026, 11:02 UTC |
| [#1347](https://github.com/openclaw/clawhub/issues/1347) | ClawHub网站登录失败：GitHub OAuth回调后登录信息不刷新 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1347.md) | complete | Apr 28, 2026, 11:01 UTC |
| [#1257](https://github.com/openclaw/clawhub/issues/1257) | False positive flag of create-mcp-server skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1257.md) | complete | Apr 28, 2026, 11:01 UTC |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) | complete | Apr 28, 2026, 11:01 UTC |
| [#1326](https://github.com/openclaw/clawhub/issues/1326) | False positive: amber-voice-assistant v5.5.7 (slug: batthis/amber-voice-assistant) flagged as suspicious — all findings are normal telephony bridge patterns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1326.md) | complete | Apr 28, 2026, 11:01 UTC |
| [#1222](https://github.com/openclaw/clawhub/issues/1222) | Publish skill fails with Github API rate limit exceeded | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1222.md) | complete | Apr 28, 2026, 11:01 UTC |
| [#1857](https://github.com/openclaw/clawhub/pull/1857) | fix(security): tighten crypto capability swap detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1857.md) | complete | Apr 28, 2026, 11:01 UTC |
| [#1249](https://github.com/openclaw/clawhub/issues/1249) | [Request] Remove Suspicious Flag from memory-palace skill (lanzhou3/memory-palace) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1249.md) | complete | Apr 28, 2026, 11:01 UTC |

</details>

## How It Works

ClawSweeper is split into a scheduler, a review lane, and an apply lane.

### Scheduler

The scheduler decides what to scan and how often. New and active items get more
attention; older quiet items fall back to a slower cadence.

- hot/new and recently active items are checked hourly, with a 5-minute intake
  schedule for the newest queue edge
- target repositories can forward issue and PR events with
  `repository_dispatch`; those exact item runs use a dedicated single job to
  review one item, sync the durable comment, and apply only safe close
  proposals for that same item
- pull requests and issues younger than 30 days are checked daily once they
  leave the hot window
- older inactive issues are checked weekly
- apply wakes every 15 minutes and exits quickly when there are no unchanged
  high-confidence close proposals

### Review Lane

Review is proposal-only. It never closes items.

- A planner scans open issues and PRs, then assigns exact item numbers to shards.
- Manual runs can pass `item_number` or comma-separated `item_numbers` to review
  exact Audit Health findings without scanning for a normal batch.
- Each shard checks out the selected target repository at `main`.
- Codex reviews with `gpt-5.5`, high reasoning, fast service tier, and a
  10-minute per-item timeout.
- Each item becomes a flat report under
  `records/<repo-slug>/items/<number>.md` with the decision, evidence,
  suggested comment, runtime metadata, and GitHub snapshot hash.
- High-confidence allowed close decisions become `proposed_close`.
- After publish, the lane checks the selected items' single marker-backed Codex
  review comment. Missing comments and missing metadata are synced immediately;
  existing comments are refreshed only when stale, currently weekly.

### Apply Lane

Apply reads existing reports and mutates GitHub only when the stored review is
still valid.

- Updates the single marker-backed Codex automated review comment in place.
- Closes only unchanged high-confidence proposals.
- Reuses the review comment when closing; no duplicate close comment.
- Moves closed or already-closed reports to
  `records/<repo-slug>/closed/<number>.md`.
- Moves reopened archived reports back to the repo’s `items/` folder as stale.
- Commits checkpoints and dashboard heartbeats during long runs.

Apply wakes every 15 minutes, no-ops when there are no unchanged
high-confidence close proposals, and narrows scheduled runs to the currently
eligible proposal list so idle runs do not scan unrelated keep-open records.
It defaults to all item kinds, no age floor, a 2-second close delay, and 50
fresh closes per checkpoint. If it reaches the requested limit, it queues
another apply run with the same settings.

Exact event runs skip the bulk planner, shard matrix, artifact upload, and
separate publish job. They still use the same review and apply code paths, but
only for the selected item number and only with immediate-safe reasons enabled
by default: `implemented_on_main` and `duplicate_or_superseded`.
`stale_insufficient_info` is never applied to young items; apply requires those
issue reports to be at least 30 days old unless a manual run explicitly changes
the threshold.

The README dashboard is fleet-scoped. Each configured repository gets its own
record folder, workflow status marker, audit-health marker, cadence counts, and
recent activity section. The top dashboard aggregates those repository snapshots
so event runs from one repo do not hide the state of another.

There is still one deterministic apply path for writes. Review can propose and
sync stale public review comments, but closing remains guarded by apply so a
fresh GitHub snapshot, labels, maintainer-authorship, and unchanged item state
are checked immediately before mutation.

### Safety Model

- Maintainer-authored items are excluded from automated closes.
- Protected labels block close proposals.
- Open PRs with GitHub closing references block issue closes until the PR is
  resolved.
- Open same-author issue/PR pairs block one-sided closes.
- Codex runs without GitHub write tokens.
- Event jobs create target write and report-push credentials only after Codex
  exits.
- CI makes the target checkout read-only for reviews.
- Reviews fail if Codex leaves tracked or untracked changes behind.
- Snapshot changes block apply unless the only change is the bot’s own review
  comment.

### Audit

`pnpm run audit` compares live GitHub state with generated records without moving
files. It reports missing open records, archived open records, stale records,
duplicates, protected-label proposed closes, and stale review-status records.
Protected proposed closes are reported only for active repo `items/` records
because archived repo `closed/` records are historical and cannot be applied.
Missing open records are classified as eligible, maintainer-authored, protected,
or recently created so strict audit mode can flag actionable drift without
treating expected queue lag or excluded items as failures.
Use `--update-dashboard` to publish the latest audit health into this README
without making every normal dashboard heartbeat scan all open GitHub items.
Audit Health includes a copyable `item_numbers` input for reviewable findings
such as missing eligible records, reopened archived records, and stale reviews.
The workflow refreshes Audit Health on a separate six-hour schedule, and it can
be run manually with `audit_dashboard=true`.

## Local Run

Requires Node 24.

```bash
source ~/.profile
corepack enable
pnpm install
pnpm run build
pnpm run plan -- --target-repo openclaw/openclaw --batch-size 5 --shard-count 100 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
pnpm run review -- --target-repo openclaw/openclaw --target-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
pnpm run apply-artifacts -- --target-repo openclaw/openclaw --artifact-dir artifacts/reviews
pnpm run audit -- --target-repo openclaw/openclaw --max-pages 250 --sample-limit 25 --update-dashboard
pnpm run reconcile -- --target-repo openclaw/openclaw --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
corepack enable
pnpm run apply-decisions -- --target-repo openclaw/openclaw --limit 20 --apply-kind all
```

Sync durable review comments without closing:

```bash
source ~/.profile
corepack enable
pnpm run apply-decisions -- --target-repo openclaw/openclaw --sync-comments-only --comment-sync-min-age-days 7 --processed-limit 1000 --limit 0
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later. Scheduled apply runs process both issues and pull requests by default, subject to the selected repository profile; pass `target_repo`, `apply_kind=issue`, or `apply_kind=pull_request` to narrow a manual run.

Scheduled runs cover both configured profiles. `openclaw/openclaw` keeps the
existing cadence; `openclaw/clawhub` runs on offset review/apply/audit crons so
its reports live under `records/openclaw-clawhub/` without colliding with
default repo records.

Target repositories can opt into event-level latency by installing the
dispatcher workflow in [docs/target-dispatcher.md](docs/target-dispatcher.md).
The dispatcher sends `repository_dispatch` events to this repository with the
target repo and exact item number; ClawSweeper then runs one event job that
reviews, comments, and checks immediate safe apply instead of waiting for the
next hot-intake cron or bulk publish lane.

## Checks

```bash
pnpm run check
pnpm run oxformat
```

`oxformat` is an alias for `oxfmt`; there is no separate `oxformat` pnpm package.
The `CI` GitHub Actions workflow runs `pnpm run check` on pushes, pull requests,
and manual dispatches.

## GitHub Actions Setup

Required secrets:

- `OPENAI_API_KEY`: OpenAI API key used to log Codex in before review shards run.
- `CODEX_API_KEY`: optional compatibility alias for the same key during the login check.
- `OPENCLAW_GH_TOKEN`: optional fallback GitHub token for read-heavy target scans and artifact publish reconciliation when the GitHub App token is unavailable.
- `CLAWSWEEPER_APP_CLIENT_ID`: public GitHub App client ID for `openclaw-ci`. Currently `Iv23liOECG0slfuhz093`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `openclaw-ci`; plan/review jobs use a short-lived GitHub App installation token for read-heavy target API calls, and apply/comment-sync jobs use the app token for comments and closes.
  Keep App credentials scoped to the `actions/create-github-app-token` step.
  Review shards run Codex over attacker-controlled issue/PR text, so
  `codexEnv()` also strips these App variables before spawning Codex.

Token flow:

- Review shards log Codex in with `OPENAI_API_KEY`, then run without OpenAI or
  Codex token environment variables.
- ClawSweeper uses the `openclaw-ci` GitHub App token for read-heavy target
  context, falling back to `OPENCLAW_GH_TOKEN` only if app secrets are absent.
- Apply mode uses the app token for review comments and closes, so GitHub
  attributes mutations to `clawsweeper[bot]`.
- The built-in `GITHUB_TOKEN` commits generated reports back to this repo.

Required app permissions:

- read access for target scan context
- write access to target repository issues and pull requests
- optional Actions write on `openclaw/clawsweeper` for app-token-based run
  cancellation or dispatch
