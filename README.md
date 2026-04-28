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

Last dashboard update: Apr 28, 2026, 21:43 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4212 |
| Open PRs | 3243 |
| Open items total | 7455 |
| Reviewed files | 7455 |
| Unreviewed open items | 0 |
| Due now by cadence | 1822 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10559 |
| Failed or stale reviews | 12 |
| Archived closed files | 13788 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6547 | 6547 | 0 | 1820 | 0 | 10556 | Apr 28, 2026, 21:41 UTC | Apr 28, 2026, 21:41 UTC | 77 |
| [ClawHub](https://github.com/openclaw/clawhub) | 908 | 908 | 0 | 2 | 0 | 3 | Apr 28, 2026, 21:42 UTC | Apr 28, 2026, 18:47 UTC | 479 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 28, 2026, 21:43 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25079240917) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 28, 2026, 21:12 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25077718449) |

### Fleet Activity

Latest review: Apr 28, 2026, 21:42 UTC. Latest close: Apr 28, 2026, 21:41 UTC. Latest comment sync: Apr 28, 2026, 21:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 9 | 2 | 7 | 0 | 12 | 23 | 0 |
| Last hour | 1170 | 19 | 1151 | 2 | 28 | 556 | 1 |
| Last 24 hours | 5794 | 335 | 5459 | 8 | 719 | 1023 | 19 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73815](https://github.com/openclaw/openclaw/issues/73815) | OPENCLAW_PLUGIN_STAGE_DIR with two paths: memory status fails on missing chokidar in second path | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73815.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73815.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73811](https://github.com/openclaw/openclaw/issues/73811) | [Bug]: sessions_spawn model parameter ignored due to write/read field mismatch | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73811.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73811.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73702](https://github.com/openclaw/openclaw/issues/73702) | sessions_send reply forwarding creates cross-session prompt-injection vector | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73702.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73702.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73647](https://github.com/openclaw/openclaw/issues/73647) | [Bug]: 2026.4.26 Telegram-only gateway spins CPU in channel runtime / staged runtime deps | duplicate or superseded | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73647.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73647.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73595](https://github.com/openclaw/openclaw/issues/73595) | Runtime injection tags (`<system-reminder>`, `<previous_response>`) leak verbatim to delivery channels when model is in degraded state | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73595.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73595.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50989](https://github.com/openclaw/openclaw/issues/50989) | Suppress intermediate text output before tool calls in group channels | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/50989.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50989.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50468](https://github.com/openclaw/openclaw/issues/50468) | [Bug]: Skills file watcher broken due to chokidar v5 glob incompatibility — installed skills not detected in existing sessions | already implemented on main | Apr 28, 2026, 21:40 UTC | [records/openclaw-openclaw/closed/50468.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50468.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50213](https://github.com/openclaw/openclaw/issues/50213) | [Feature]: add web search provider baseurl for gemini, so we could use Third-party GEMINI API provider | duplicate or superseded | Apr 28, 2026, 21:40 UTC | [records/openclaw-openclaw/closed/50213.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50213.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50211](https://github.com/openclaw/openclaw/issues/50211) | [Bug]: Shared CI regressions in loader, Feishu, and Google OAuth tests are failing unrelated PRs | already implemented on main | Apr 28, 2026, 21:40 UTC | [records/openclaw-openclaw/closed/50211.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50211.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50154](https://github.com/openclaw/openclaw/issues/50154) | [Bug]: macOS LaunchAgent gateway fails to push to LAN GitLab over SSH, foreground gateway works | duplicate or superseded | Apr 28, 2026, 21:40 UTC | [records/openclaw-openclaw/closed/50154.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50154.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1867](https://github.com/openclaw/clawhub/pull/1867) | feat: Device Flow auth for headless environments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1867.md) | complete | Apr 28, 2026, 21:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71203](https://github.com/openclaw/openclaw/pull/71203) | Refresh configured agent models.json caches during startup warmup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71203.md) | complete | Apr 28, 2026, 21:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73816](https://github.com/openclaw/openclaw/issues/73816) | [Bug] Cron job reports status 'ok' immediately after sessions_yield, before subagent completes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73816.md) | complete | Apr 28, 2026, 21:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72276](https://github.com/openclaw/openclaw/pull/72276) | [codex] Consolidate embedded runner structural splits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72276.md) | complete | Apr 28, 2026, 21:40 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72936](https://github.com/openclaw/openclaw/pull/72936) | Wire diagnostics through the core chat command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72936.md) | complete | Apr 28, 2026, 21:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73813](https://github.com/openclaw/openclaw/issues/73813) | [Bug] Cron job reports status 'ok' immediately after sessions_yield, before subagent completes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73813.md) | complete | Apr 28, 2026, 21:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73812](https://github.com/openclaw/openclaw/pull/73812) | Fix restart continuations in group topics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73812.md) | complete | Apr 28, 2026, 21:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73802](https://github.com/openclaw/openclaw/issues/73802) | Discord exec approval card/buttons not delivered in v2026.4.26 (regression after #71804) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73802.md) | complete | Apr 28, 2026, 21:15 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73801](https://github.com/openclaw/openclaw/issues/73801) | Active Memory with Cerebras gpt-oss-120b times out and can pin gateway CPU | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73801.md) | complete | Apr 28, 2026, 21:14 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71924](https://github.com/openclaw/openclaw/pull/71924) | fix: add GPT-5.5 capabilities to GitHub Copilot provider catalog | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71924.md) | complete | Apr 28, 2026, 21:14 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 21:43 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25079240917](https://github.com/openclaw/clawsweeper/actions/runs/25079240917)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3337 |
| Open PRs | 3210 |
| Open items total | 6547 |
| Reviewed files | 6547 |
| Unreviewed open items | 0 |
| Archived closed files | 13777 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3331 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3204 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6535 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10556 |
| Failed or stale reviews | 12 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 55/845 current (790 due, 6.5%) |
| Hourly hot item cadence (<7d) | 55/845 current (790 due, 6.5%) |
| Daily cadence coverage | 2850/3877 current (1027 due, 73.5%) |
| Daily PR cadence | 2121/2711 current (590 due, 78.2%) |
| Daily new issue cadence (<30d) | 729/1166 current (437 due, 62.5%) |
| Weekly older issue cadence | 1822/1825 current (3 due, 99.8%) |
| Due now by cadence | 1820 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 28, 2026, 18:46 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72536,72537,72539`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6948 |
| Missing eligible open records | 179 |
| Missing maintainer-authored open records | 72 |
| Missing protected open records | 1 |
| Missing recently-created open records | 125 |
| Archived records that are open again | 0 |
| Stale item records | 6 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 7 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
| [#72527](https://github.com/openclaw/openclaw/issues/72527) | Missing eligible open | [Bug]: Downgrading from 2026.4.x to 2026.3.2 leaves openclaw.json in invalid/broken state with no warning | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 21:41 UTC. Latest close: Apr 28, 2026, 21:41 UTC. Latest comment sync: Apr 28, 2026, 21:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 8 | 2 | 6 | 0 | 12 | 22 | 0 |
| Last hour | 503 | 19 | 484 | 2 | 28 | 77 | 1 |
| Last 24 hours | 4875 | 332 | 4543 | 8 | 708 | 534 | 19 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73815](https://github.com/openclaw/openclaw/issues/73815) | OPENCLAW_PLUGIN_STAGE_DIR with two paths: memory status fails on missing chokidar in second path | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73815.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73815.md) |
| [#73811](https://github.com/openclaw/openclaw/issues/73811) | [Bug]: sessions_spawn model parameter ignored due to write/read field mismatch | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73811.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73811.md) |
| [#73702](https://github.com/openclaw/openclaw/issues/73702) | sessions_send reply forwarding creates cross-session prompt-injection vector | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73702.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73702.md) |
| [#73647](https://github.com/openclaw/openclaw/issues/73647) | [Bug]: 2026.4.26 Telegram-only gateway spins CPU in channel runtime / staged runtime deps | duplicate or superseded | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73647.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73647.md) |
| [#73595](https://github.com/openclaw/openclaw/issues/73595) | Runtime injection tags (`<system-reminder>`, `<previous_response>`) leak verbatim to delivery channels when model is in degraded state | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73595.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73595.md) |
| [#50989](https://github.com/openclaw/openclaw/issues/50989) | Suppress intermediate text output before tool calls in group channels | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/50989.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50989.md) |
| [#50468](https://github.com/openclaw/openclaw/issues/50468) | [Bug]: Skills file watcher broken due to chokidar v5 glob incompatibility — installed skills not detected in existing sessions | already implemented on main | Apr 28, 2026, 21:40 UTC | [records/openclaw-openclaw/closed/50468.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50468.md) |
| [#50213](https://github.com/openclaw/openclaw/issues/50213) | [Feature]: add web search provider baseurl for gemini, so we could use Third-party GEMINI API provider | duplicate or superseded | Apr 28, 2026, 21:40 UTC | [records/openclaw-openclaw/closed/50213.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50213.md) |
| [#50211](https://github.com/openclaw/openclaw/issues/50211) | [Bug]: Shared CI regressions in loader, Feishu, and Google OAuth tests are failing unrelated PRs | already implemented on main | Apr 28, 2026, 21:40 UTC | [records/openclaw-openclaw/closed/50211.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50211.md) |
| [#50154](https://github.com/openclaw/openclaw/issues/50154) | [Bug]: macOS LaunchAgent gateway fails to push to LAN GitLab over SSH, foreground gateway works | duplicate or superseded | Apr 28, 2026, 21:40 UTC | [records/openclaw-openclaw/closed/50154.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50154.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71203](https://github.com/openclaw/openclaw/pull/71203) | Refresh configured agent models.json caches during startup warmup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71203.md) | complete | Apr 28, 2026, 21:41 UTC |
| [#73816](https://github.com/openclaw/openclaw/issues/73816) | [Bug] Cron job reports status 'ok' immediately after sessions_yield, before subagent completes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73816.md) | complete | Apr 28, 2026, 21:41 UTC |
| [#72276](https://github.com/openclaw/openclaw/pull/72276) | [codex] Consolidate embedded runner structural splits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72276.md) | complete | Apr 28, 2026, 21:40 UTC |
| [#72936](https://github.com/openclaw/openclaw/pull/72936) | Wire diagnostics through the core chat command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72936.md) | complete | Apr 28, 2026, 21:39 UTC |
| [#73813](https://github.com/openclaw/openclaw/issues/73813) | [Bug] Cron job reports status 'ok' immediately after sessions_yield, before subagent completes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73813.md) | complete | Apr 28, 2026, 21:39 UTC |
| [#73812](https://github.com/openclaw/openclaw/pull/73812) | Fix restart continuations in group topics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73812.md) | complete | Apr 28, 2026, 21:39 UTC |
| [#73802](https://github.com/openclaw/openclaw/issues/73802) | Discord exec approval card/buttons not delivered in v2026.4.26 (regression after #71804) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73802.md) | complete | Apr 28, 2026, 21:15 UTC |
| [#73801](https://github.com/openclaw/openclaw/issues/73801) | Active Memory with Cerebras gpt-oss-120b times out and can pin gateway CPU | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73801.md) | complete | Apr 28, 2026, 21:14 UTC |
| [#71924](https://github.com/openclaw/openclaw/pull/71924) | fix: add GPT-5.5 capabilities to GitHub Copilot provider catalog | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71924.md) | complete | Apr 28, 2026, 21:14 UTC |
| [#71839](https://github.com/openclaw/openclaw/pull/71839) | fix(telegram): avoid routine reply quoting | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71839.md) | complete | Apr 28, 2026, 21:13 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 21:12 UTC

State: Review publish complete

Merged review artifacts for run 25077718449. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25077718449](https://github.com/openclaw/clawsweeper/actions/runs/25077718449)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 875 |
| Open PRs | 33 |
| Open items total | 908 |
| Reviewed files | 908 |
| Unreviewed open items | 0 |
| Archived closed files | 11 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 875 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 908 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 50/52 current (2 due, 96.2%) |
| Hourly hot item cadence (<7d) | 50/52 current (2 due, 96.2%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 633/633 current (0 due, 100%) |
| Due now by cadence | 2 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 28, 2026, 18:45 UTC

Status: **Passing**

Targeted review input: _none_

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 914 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 7 |
| Missing protected open records | 0 |
| Missing recently-created open records | 0 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 0 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| _None_ |  |  |  |
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 21:42 UTC. Latest close: Apr 28, 2026, 18:47 UTC. Latest comment sync: Apr 28, 2026, 21:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| Last hour | 667 | 0 | 667 | 0 | 0 | 479 | 0 |
| Last 24 hours | 919 | 3 | 916 | 0 | 11 | 489 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |
| [#1699](https://github.com/openclaw/clawhub/issues/1699) | Plugin search returns 500, and plugin catalog breaks after page 2 | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/1699.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1699.md) |
| [#85](https://github.com/openclaw/clawhub/issues/85) | Clawhub Sort feature shows wrong results | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/85.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/85.md) |
| [#1736](https://github.com/openclaw/clawhub/pull/1736) | Align hover stats with denormalized counters and fix seed digest stat drift | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1736.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1736.md) |
| [#1324](https://github.com/openclaw/clawhub/pull/1324) | feat: add --dry-run flag to package publish command | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1324.md) |
| [#1240](https://github.com/openclaw/clawhub/pull/1240) | fix: use esbuild minification for safari builds | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1240.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1240.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1867](https://github.com/openclaw/clawhub/pull/1867) | feat: Device Flow auth for headless environments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1867.md) | complete | Apr 28, 2026, 21:42 UTC |
| [#1806](https://github.com/openclaw/clawhub/pull/1806) | feat(cli): add per-skill pinning | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1806.md) | complete | Apr 28, 2026, 21:11 UTC |
| [#1838](https://github.com/openclaw/clawhub/issues/1838) | False positive: agentcloud skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1838.md) | complete | Apr 28, 2026, 21:11 UTC |
| [#1856](https://github.com/openclaw/clawhub/pull/1856) | fix(cli): preserve root skill manifest during publish | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1856.md) | complete | Apr 28, 2026, 21:11 UTC |
| [#1831](https://github.com/openclaw/clawhub/issues/1831) | Application to Remove adb-assistant & testcase-template | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1831.md) | complete | Apr 28, 2026, 21:11 UTC |
| [#1706](https://github.com/openclaw/clawhub/issues/1706) | Skill flagged as suspicious - GroupMe (groupme@1.0.1) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1706.md) | complete | Apr 28, 2026, 21:11 UTC |
| [#1047](https://github.com/openclaw/clawhub/issues/1047) | why Skill flagged — suspicious patterns detected #979 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1047.md) | complete | Apr 28, 2026, 21:11 UTC |
| [#1424](https://github.com/openclaw/clawhub/issues/1424) | booking-manager skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1424.md) | complete | Apr 28, 2026, 21:11 UTC |
| [#1813](https://github.com/openclaw/clawhub/issues/1813) | Skill being flagged as suspicious. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1813.md) | complete | Apr 28, 2026, 21:11 UTC |
| [#1146](https://github.com/openclaw/clawhub/issues/1146) | False positive: rotifer-evolving-agent flagged as suspicious — standard npx MCP pattern with full transparency | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1146.md) | complete | Apr 28, 2026, 21:11 UTC |

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
