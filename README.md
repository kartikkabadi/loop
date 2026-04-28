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

Last dashboard update: Apr 28, 2026, 09:45 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4409 |
| Open PRs | 3492 |
| Open items total | 7901 |
| Reviewed files | 7451 |
| Unreviewed open items | 450 |
| Due now by cadence | 3882 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10290 |
| Failed or stale reviews | 49 |
| Archived closed files | 13415 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6991 | 6548 | 443 | 3842 | 0 | 10287 | Apr 28, 2026, 09:42 UTC | Apr 28, 2026, 09:41 UTC | 24 |
| [ClawHub](https://github.com/openclaw/clawhub) | 910 | 903 | 7 | 40 | 0 | 3 | Apr 28, 2026, 09:39 UTC | Apr 28, 2026, 08:18 UTC | 467 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Hot intake publish complete | Apr 28, 2026, 09:44 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25045269752) |
| [ClawHub](https://github.com/openclaw/clawhub) | Event review applied | Apr 28, 2026, 09:39 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25044728445) |

### Fleet Activity

Latest review: Apr 28, 2026, 09:42 UTC. Latest close: Apr 28, 2026, 09:41 UTC. Latest comment sync: Apr 28, 2026, 09:41 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 25 | 0 | 25 | 0 | 16 | 5 | 0 |
| Last hour | 584 | 9 | 575 | 0 | 55 | 491 | 5 |
| Last 24 hours | 3072 | 104 | 2968 | 11 | 420 | 1562 | 23 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66367](https://github.com/openclaw/openclaw/pull/66367) | fix: expose qwen3.6-plus on Coding Plan endpoints | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/66367.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66367.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63654](https://github.com/openclaw/openclaw/issues/63654) | Qwen: qwen3.6-plus image understanding blocked on Coding Plan endpoint despite model supporting vision | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/63654.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63654.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73429](https://github.com/openclaw/openclaw/pull/73429) | fix(plugin-sdk): backfill reasoning_content on all DeepSeek V4 assistant messages | closed externally after item changed | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/73429.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73429.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73417](https://github.com/openclaw/openclaw/issues/73417) | DeepSeek V4: ensureDeepSeekV4ToolCallReasoningContent 未覆盖无 tool_calls 的 assistant 消息 | closed externally after item changed | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/73417.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73417.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73372](https://github.com/openclaw/openclaw/pull/73372) | fix(cron): clarify local timezone cron expressions | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/73372.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73372.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73361](https://github.com/openclaw/openclaw/pull/73361) | fix(ui): confirm button-triggered new session resets | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/73361.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73361.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56611](https://github.com/openclaw/openclaw/issues/56611) | Control UI: + button easily confused with attachment — add option to hide or reposition | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/56611.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56611.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53669](https://github.com/openclaw/openclaw/issues/53669) | [Bug]: CronCreate: timezone mismatch — local tz set but UTC offset applied to cron expression | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/53669.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53669.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53667](https://github.com/openclaw/openclaw/pull/53667) | fix: warn when legacy CLAWDBOT_*/MOLTBOT_* env vars are detected | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/53667.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53667.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51969](https://github.com/openclaw/openclaw/pull/51969) | Agents/cron tool: document IANA tz for cron schedules (#51922) (#51922) | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/51969.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51969.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73323](https://github.com/openclaw/openclaw/issues/73323) | [Bug]: Gateway runtime degradation: pricing fetch 60s timeouts, Telegram polling stalls, slow RPC — chronic across 4.23/4.25/4.26 on Windows 11 + Node 24 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73323.md) | complete | Apr 28, 2026, 09:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73378](https://github.com/openclaw/openclaw/pull/73378) | feat(line): add native sticker send support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73378.md) | complete | Apr 28, 2026, 09:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71156](https://github.com/openclaw/openclaw/pull/71156) | docs: add AGENTS.md for secrets and pairing high-privilege zones | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71156.md) | complete | Apr 28, 2026, 09:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73369](https://github.com/openclaw/openclaw/pull/73369) | fix(skills/discord): clarify message.send is sideband-only to prevent autoThread duplicate replies (#73278) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73369.md) | complete | Apr 28, 2026, 09:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73334](https://github.com/openclaw/openclaw/pull/73334) | refactor(feishu): unify document link parsing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73334.md) | complete | Apr 28, 2026, 09:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70253](https://github.com/openclaw/openclaw/issues/70253) | [Bug]: Message Streaming in Mattermost active even if disabled in config file. Also Bot-to-Bot communication disabled but allowed in config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70253.md) | complete | Apr 28, 2026, 09:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71992](https://github.com/openclaw/openclaw/issues/71992) | [Bug]: Control UI webchat duplicates every assistant reply on 2026.4.21 — regression from #5964/#39469 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71992.md) | complete | Apr 28, 2026, 09:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73315](https://github.com/openclaw/openclaw/pull/73315) | feat(desktop): add Tauri desktop companion MVP | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73315.md) | complete | Apr 28, 2026, 09:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71582](https://github.com/openclaw/openclaw/pull/71582) | Fix heartbeat exec-event delivery source routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71582.md) | complete | Apr 28, 2026, 09:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73345](https://github.com/openclaw/openclaw/pull/73345) | GRO-448: propagate hooks/agent thread to delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73345.md) | complete | Apr 28, 2026, 09:41 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 09:44 UTC

State: Hot intake publish complete

Merged hot intake artifacts for run 25045269752. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25045269752](https://github.com/openclaw/clawsweeper/actions/runs/25045269752)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3536 |
| Open PRs | 3455 |
| Open items total | 6991 |
| Reviewed files | 6548 |
| Unreviewed open items | 443 |
| Archived closed files | 13405 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3330 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3170 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6500 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10287 |
| Failed or stale reviews | 48 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 38/646 current (608 due, 5.9%) |
| Hourly hot item cadence (<7d) | 38/646 current (608 due, 5.9%) |
| Daily cadence coverage | 1280/4064 current (2784 due, 31.5%) |
| Daily PR cadence | 988/2818 current (1830 due, 35.1%) |
| Daily new issue cadence (<30d) | 292/1246 current (954 due, 23.4%) |
| Weekly older issue cadence | 1831/1838 current (7 due, 99.6%) |
| Due now by cadence | 3842 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 09:42 UTC. Latest close: Apr 28, 2026, 09:41 UTC. Latest comment sync: Apr 28, 2026, 09:41 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 24 | 0 | 24 | 0 | 16 | 4 | 0 |
| Last hour | 550 | 9 | 541 | 0 | 55 | 24 | 5 |
| Last 24 hours | 2159 | 101 | 2058 | 10 | 410 | 881 | 23 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#66367](https://github.com/openclaw/openclaw/pull/66367) | fix: expose qwen3.6-plus on Coding Plan endpoints | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/66367.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66367.md) |
| [#63654](https://github.com/openclaw/openclaw/issues/63654) | Qwen: qwen3.6-plus image understanding blocked on Coding Plan endpoint despite model supporting vision | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/63654.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63654.md) |
| [#73429](https://github.com/openclaw/openclaw/pull/73429) | fix(plugin-sdk): backfill reasoning_content on all DeepSeek V4 assistant messages | closed externally after item changed | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/73429.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73429.md) |
| [#73417](https://github.com/openclaw/openclaw/issues/73417) | DeepSeek V4: ensureDeepSeekV4ToolCallReasoningContent 未覆盖无 tool_calls 的 assistant 消息 | closed externally after item changed | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/73417.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73417.md) |
| [#73372](https://github.com/openclaw/openclaw/pull/73372) | fix(cron): clarify local timezone cron expressions | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/73372.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73372.md) |
| [#73361](https://github.com/openclaw/openclaw/pull/73361) | fix(ui): confirm button-triggered new session resets | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/73361.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73361.md) |
| [#56611](https://github.com/openclaw/openclaw/issues/56611) | Control UI: + button easily confused with attachment — add option to hide or reposition | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/56611.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56611.md) |
| [#53669](https://github.com/openclaw/openclaw/issues/53669) | [Bug]: CronCreate: timezone mismatch — local tz set but UTC offset applied to cron expression | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/53669.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53669.md) |
| [#53667](https://github.com/openclaw/openclaw/pull/53667) | fix: warn when legacy CLAWDBOT_*/MOLTBOT_* env vars are detected | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/53667.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53667.md) |
| [#51969](https://github.com/openclaw/openclaw/pull/51969) | Agents/cron tool: document IANA tz for cron schedules (#51922) (#51922) | closed externally after review | Apr 28, 2026, 09:41 UTC | [records/openclaw-openclaw/closed/51969.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51969.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73323](https://github.com/openclaw/openclaw/issues/73323) | [Bug]: Gateway runtime degradation: pricing fetch 60s timeouts, Telegram polling stalls, slow RPC — chronic across 4.23/4.25/4.26 on Windows 11 + Node 24 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73323.md) | complete | Apr 28, 2026, 09:42 UTC |
| [#73378](https://github.com/openclaw/openclaw/pull/73378) | feat(line): add native sticker send support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73378.md) | complete | Apr 28, 2026, 09:41 UTC |
| [#71156](https://github.com/openclaw/openclaw/pull/71156) | docs: add AGENTS.md for secrets and pairing high-privilege zones | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71156.md) | complete | Apr 28, 2026, 09:41 UTC |
| [#73369](https://github.com/openclaw/openclaw/pull/73369) | fix(skills/discord): clarify message.send is sideband-only to prevent autoThread duplicate replies (#73278) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73369.md) | complete | Apr 28, 2026, 09:41 UTC |
| [#73334](https://github.com/openclaw/openclaw/pull/73334) | refactor(feishu): unify document link parsing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73334.md) | complete | Apr 28, 2026, 09:41 UTC |
| [#70253](https://github.com/openclaw/openclaw/issues/70253) | [Bug]: Message Streaming in Mattermost active even if disabled in config file. Also Bot-to-Bot communication disabled but allowed in config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70253.md) | complete | Apr 28, 2026, 09:41 UTC |
| [#71992](https://github.com/openclaw/openclaw/issues/71992) | [Bug]: Control UI webchat duplicates every assistant reply on 2026.4.21 — regression from #5964/#39469 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71992.md) | complete | Apr 28, 2026, 09:41 UTC |
| [#73315](https://github.com/openclaw/openclaw/pull/73315) | feat(desktop): add Tauri desktop companion MVP | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73315.md) | complete | Apr 28, 2026, 09:41 UTC |
| [#71582](https://github.com/openclaw/openclaw/pull/71582) | Fix heartbeat exec-event delivery source routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71582.md) | complete | Apr 28, 2026, 09:41 UTC |
| [#73345](https://github.com/openclaw/openclaw/pull/73345) | GRO-448: propagate hooks/agent thread to delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73345.md) | complete | Apr 28, 2026, 09:41 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 09:39 UTC

State: Event review applied

Reviewed event item #652, synced durable comment(s): 1, closed safe proposal(s): 0. Close reasons enabled: implemented_on_main,duplicate_or_superseded.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25044728445](https://github.com/openclaw/clawsweeper/actions/runs/25044728445)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 873 |
| Open PRs | 37 |
| Open items total | 910 |
| Reviewed files | 903 |
| Unreviewed open items | 7 |
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
| Hourly cadence coverage | 19/51 current (32 due, 37.3%) |
| Hourly hot item cadence (<7d) | 19/51 current (32 due, 37.3%) |
| Daily cadence coverage | 228/228 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 207/207 current (0 due, 100%) |
| Weekly older issue cadence | 623/624 current (1 due, 99.8%) |
| Due now by cadence | 40 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 09:39 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 09:39 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| Last hour | 34 | 0 | 34 | 0 | 0 | 467 | 0 |
| Last 24 hours | 913 | 3 | 910 | 1 | 10 | 681 | 0 |

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
| [#652](https://github.com/openclaw/clawhub/issues/652) | Use GitHub user as commit author | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/652.md) | complete | Apr 28, 2026, 09:39 UTC |
| [#1840](https://github.com/openclaw/clawhub/pull/1840) | fix: support org-owned skill publishes via API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1840.md) | complete | Apr 28, 2026, 09:05 UTC |
| [#1828](https://github.com/openclaw/clawhub/issues/1828) | Operon-Guard | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1828.md) | complete | Apr 28, 2026, 09:05 UTC |
| [#1770](https://github.com/openclaw/clawhub/issues/1770) | [Request] Purge soft-deleted slug \"creator-scraper-cv\" to allow rename | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1770.md) | complete | Apr 28, 2026, 09:05 UTC |
| [#1785](https://github.com/openclaw/clawhub/issues/1785) | Appeal: opsrobot skill falsely flagged as suspicious by VirusTotal | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1785.md) | complete | Apr 28, 2026, 09:05 UTC |
| [#1771](https://github.com/openclaw/clawhub/issues/1771) | Suspicous flag wrongly placed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1771.md) | complete | Apr 28, 2026, 09:05 UTC |
| [#1852](https://github.com/openclaw/clawhub/issues/1852) | Multi-agent trust boundaries for claw | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1852.md) | complete | Apr 28, 2026, 09:05 UTC |
| [#1769](https://github.com/openclaw/clawhub/issues/1769) | Review request: jettyd skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1769.md) | complete | Apr 28, 2026, 09:04 UTC |
| [#1812](https://github.com/openclaw/clawhub/issues/1812) | Skill be flagged as suspicious and being marked hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1812.md) | complete | Apr 28, 2026, 09:04 UTC |
| [#1808](https://github.com/openclaw/clawhub/issues/1808) | Re-evaluation request: topview-skill (official Topview AI client) — medium-suspicious verdict triggered by emoji ZWJ false positive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1808.md) | complete | Apr 28, 2026, 09:04 UTC |

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
- `CLAWSWEEPER_APP_ID`: GitHub App ID for `openclaw-ci`. Currently `3306130`.
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
