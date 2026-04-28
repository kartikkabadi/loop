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

Last dashboard update: Apr 28, 2026, 10:52 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4406 |
| Open PRs | 3485 |
| Open items total | 7891 |
| Reviewed files | 7459 |
| Unreviewed open items | 432 |
| Due now by cadence | 3941 |
| Proposed closes awaiting apply | 2 |
| Closed by Codex apply | 10300 |
| Failed or stale reviews | 50 |
| Archived closed files | 13444 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6981 | 6556 | 425 | 3883 | 2 | 10297 | Apr 28, 2026, 10:50 UTC | Apr 28, 2026, 10:50 UTC | 59 |
| [ClawHub](https://github.com/openclaw/clawhub) | 910 | 903 | 7 | 58 | 0 | 3 | Apr 28, 2026, 10:45 UTC | Apr 28, 2026, 08:18 UTC | 236 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply in progress | Apr 28, 2026, 10:52 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25048610259) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 10:46 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25048225923) |

### Fleet Activity

Latest review: Apr 28, 2026, 10:50 UTC. Latest close: Apr 28, 2026, 10:50 UTC. Latest comment sync: Apr 28, 2026, 10:51 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 138 | 6 | 132 | 0 | 12 | 73 | 1 |
| Last hour | 485 | 6 | 479 | 1 | 26 | 295 | 1 |
| Last 24 hours | 3011 | 91 | 2920 | 9 | 393 | 901 | 18 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73494](https://github.com/openclaw/openclaw/issues/73494) | [Feature]: Real-time Stock Data Access for Trading Assistant | belongs on ClawHub | Apr 28, 2026, 10:50 UTC | [records/openclaw-openclaw/closed/73494.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73494.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73490](https://github.com/openclaw/openclaw/pull/73490) | fix: sanitize subprocess call in DebugHandler.kt | cannot reproduce on current main | Apr 28, 2026, 10:50 UTC | [records/openclaw-openclaw/closed/73490.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73490.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73482](https://github.com/openclaw/openclaw/issues/73482) | Active Memory embedded run times out despite configured fast recall model | duplicate or superseded | Apr 28, 2026, 10:49 UTC | [records/openclaw-openclaw/closed/73482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73482.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73479](https://github.com/openclaw/openclaw/pull/73479) | update | duplicate or superseded | Apr 28, 2026, 10:48 UTC | [records/openclaw-openclaw/closed/73479.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73479.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41108](https://github.com/openclaw/openclaw/pull/41108) | fix(msteams): detect implicit mentions in thread replies via conversation.id | closed externally after review | Apr 28, 2026, 10:48 UTC | [records/openclaw-openclaw/closed/41108.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41108.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73443](https://github.com/openclaw/openclaw/pull/73443) | feat(channel) add yuanbao docs entrance | kept open | Apr 28, 2026, 10:47 UTC | [records/openclaw-openclaw/closed/73443.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73443.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67181](https://github.com/openclaw/openclaw/issues/67181) | [Bug] Discord async completion leaks internal resume-fallback message even when the command succeeds | closed externally after review | Apr 28, 2026, 10:39 UTC | [records/openclaw-openclaw/closed/67181.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/67181.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69916](https://github.com/openclaw/openclaw/issues/69916) | [Bug]: Telegram exec approvals ignore targets.accountId and fan out across all bot accounts | closed externally after review | Apr 28, 2026, 10:39 UTC | [records/openclaw-openclaw/closed/69916.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69916.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59162](https://github.com/openclaw/openclaw/issues/59162) | [Bug]: Telegram/mobile approvals can resolve as \"unknown or expired approval id\" after pending approval creation | closed externally after review | Apr 28, 2026, 10:38 UTC | [records/openclaw-openclaw/closed/59162.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59162.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71609](https://github.com/openclaw/openclaw/issues/71609) | Control UI device token mismatch loop after scope upgrade causes rate-limit lockout | closed externally after review | Apr 28, 2026, 10:38 UTC | [records/openclaw-openclaw/closed/71609.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71609.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73486](https://github.com/openclaw/openclaw/pull/73486) | fix(gateway): defer pricing refresh until ready | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73486.md) | complete | Apr 28, 2026, 10:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73243](https://github.com/openclaw/openclaw/pull/73243) | fix(diagnostics): abort stuck sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73243.md) | complete | Apr 28, 2026, 10:49 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73264](https://github.com/openclaw/openclaw/pull/73264) | fix(security): prevent workspace PATH injection via service env and trash helpers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73264.md) | complete | Apr 28, 2026, 10:49 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72917](https://github.com/openclaw/openclaw/pull/72917) | fix(agents): canonicalize provider aliases in byProvider tool policy lookup [AI] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72917.md) | complete | Apr 28, 2026, 10:49 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73493](https://github.com/openclaw/openclaw/pull/73493) | fix(memory-core): retry dreaming cron startup reconciliation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73493.md) | complete | Apr 28, 2026, 10:48 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72921](https://github.com/openclaw/openclaw/pull/72921) | fix(agents): validate caller groupId against session context in resolveGroupToolPolicy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72921.md) | complete | Apr 28, 2026, 10:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73419](https://github.com/openclaw/openclaw/pull/73419) | fix(onboarding): skip redundant install prompt when only one source e… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73419.md) | complete | Apr 28, 2026, 10:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68634](https://github.com/openclaw/openclaw/issues/68634) | [Bug]: CLI commands repeatedly trigger scope-upgrade requests + Telegram Native Approvals fails with pairing required, generating persistent pending approvals | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68634.md) | complete | Apr 28, 2026, 10:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73495](https://github.com/openclaw/openclaw/pull/73495) | fix(telegram): document and warn when replyToMode silently disables tool-progress preview | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73495.md) | complete | Apr 28, 2026, 10:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73480](https://github.com/openclaw/openclaw/issues/73480) | [Bug]: Matrix cannot be recovered using the recovery key. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73480.md) | complete | Apr 28, 2026, 10:46 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 10:52 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 2 fresh all closes. Close reasons: all. Existing Codex automated review comments are updated in place when closing or when comment-only sync is stale by 7 day(s); checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=73490,73494.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25048610259](https://github.com/openclaw/clawsweeper/actions/runs/25048610259)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3533 |
| Open PRs | 3448 |
| Open items total | 6981 |
| Reviewed files | 6556 |
| Unreviewed open items | 425 |
| Archived closed files | 13434 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3327 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3180 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6507 |
| Proposed closes awaiting apply | 2 (0% of fresh reviews) |
| Closed by Codex apply | 10297 |
| Failed or stale reviews | 49 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 38/665 current (627 due, 5.7%) |
| Hourly hot item cadence (<7d) | 38/665 current (627 due, 5.7%) |
| Daily cadence coverage | 1232/4055 current (2823 due, 30.4%) |
| Daily PR cadence | 959/2811 current (1852 due, 34.1%) |
| Daily new issue cadence (<30d) | 273/1244 current (971 due, 21.9%) |
| Weekly older issue cadence | 1828/1836 current (8 due, 99.6%) |
| Due now by cadence | 3883 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 10:50 UTC. Latest close: Apr 28, 2026, 10:50 UTC. Latest comment sync: Apr 28, 2026, 10:51 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 52 | 6 | 46 | 0 | 12 | 53 | 1 |
| Last hour | 62 | 6 | 56 | 0 | 26 | 59 | 1 |
| Last 24 hours | 2098 | 88 | 2010 | 8 | 383 | 407 | 18 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73494](https://github.com/openclaw/openclaw/issues/73494) | [Feature]: Real-time Stock Data Access for Trading Assistant | belongs on ClawHub | Apr 28, 2026, 10:50 UTC | [records/openclaw-openclaw/closed/73494.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73494.md) |
| [#73490](https://github.com/openclaw/openclaw/pull/73490) | fix: sanitize subprocess call in DebugHandler.kt | cannot reproduce on current main | Apr 28, 2026, 10:50 UTC | [records/openclaw-openclaw/closed/73490.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73490.md) |
| [#73482](https://github.com/openclaw/openclaw/issues/73482) | Active Memory embedded run times out despite configured fast recall model | duplicate or superseded | Apr 28, 2026, 10:49 UTC | [records/openclaw-openclaw/closed/73482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73482.md) |
| [#73479](https://github.com/openclaw/openclaw/pull/73479) | update | duplicate or superseded | Apr 28, 2026, 10:48 UTC | [records/openclaw-openclaw/closed/73479.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73479.md) |
| [#41108](https://github.com/openclaw/openclaw/pull/41108) | fix(msteams): detect implicit mentions in thread replies via conversation.id | closed externally after review | Apr 28, 2026, 10:48 UTC | [records/openclaw-openclaw/closed/41108.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41108.md) |
| [#73443](https://github.com/openclaw/openclaw/pull/73443) | feat(channel) add yuanbao docs entrance | kept open | Apr 28, 2026, 10:47 UTC | [records/openclaw-openclaw/closed/73443.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73443.md) |
| [#67181](https://github.com/openclaw/openclaw/issues/67181) | [Bug] Discord async completion leaks internal resume-fallback message even when the command succeeds | closed externally after review | Apr 28, 2026, 10:39 UTC | [records/openclaw-openclaw/closed/67181.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/67181.md) |
| [#69916](https://github.com/openclaw/openclaw/issues/69916) | [Bug]: Telegram exec approvals ignore targets.accountId and fan out across all bot accounts | closed externally after review | Apr 28, 2026, 10:39 UTC | [records/openclaw-openclaw/closed/69916.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69916.md) |
| [#59162](https://github.com/openclaw/openclaw/issues/59162) | [Bug]: Telegram/mobile approvals can resolve as \"unknown or expired approval id\" after pending approval creation | closed externally after review | Apr 28, 2026, 10:38 UTC | [records/openclaw-openclaw/closed/59162.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59162.md) |
| [#71609](https://github.com/openclaw/openclaw/issues/71609) | Control UI device token mismatch loop after scope upgrade causes rate-limit lockout | closed externally after review | Apr 28, 2026, 10:38 UTC | [records/openclaw-openclaw/closed/71609.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71609.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73486](https://github.com/openclaw/openclaw/pull/73486) | fix(gateway): defer pricing refresh until ready | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73486.md) | complete | Apr 28, 2026, 10:50 UTC |
| [#73243](https://github.com/openclaw/openclaw/pull/73243) | fix(diagnostics): abort stuck sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73243.md) | complete | Apr 28, 2026, 10:49 UTC |
| [#73264](https://github.com/openclaw/openclaw/pull/73264) | fix(security): prevent workspace PATH injection via service env and trash helpers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73264.md) | complete | Apr 28, 2026, 10:49 UTC |
| [#72917](https://github.com/openclaw/openclaw/pull/72917) | fix(agents): canonicalize provider aliases in byProvider tool policy lookup [AI] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72917.md) | complete | Apr 28, 2026, 10:49 UTC |
| [#73493](https://github.com/openclaw/openclaw/pull/73493) | fix(memory-core): retry dreaming cron startup reconciliation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73493.md) | complete | Apr 28, 2026, 10:48 UTC |
| [#72921](https://github.com/openclaw/openclaw/pull/72921) | fix(agents): validate caller groupId against session context in resolveGroupToolPolicy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72921.md) | complete | Apr 28, 2026, 10:47 UTC |
| [#73419](https://github.com/openclaw/openclaw/pull/73419) | fix(onboarding): skip redundant install prompt when only one source e… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73419.md) | complete | Apr 28, 2026, 10:47 UTC |
| [#68634](https://github.com/openclaw/openclaw/issues/68634) | [Bug]: CLI commands repeatedly trigger scope-upgrade requests + Telegram Native Approvals fails with pairing required, generating persistent pending approvals | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68634.md) | complete | Apr 28, 2026, 10:47 UTC |
| [#73495](https://github.com/openclaw/openclaw/pull/73495) | fix(telegram): document and warn when replyToMode silently disables tool-progress preview | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73495.md) | complete | Apr 28, 2026, 10:46 UTC |
| [#73480](https://github.com/openclaw/openclaw/issues/73480) | [Bug]: Matrix cannot be recovered using the recovery key. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73480.md) | complete | Apr 28, 2026, 10:46 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 10:46 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 1090,1111,1112,1113,1138,1145,1146,1167,1205,1208,1210,1213,1220,1223,1282,1290,1296,1314,1320,1345.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25048225923](https://github.com/openclaw/clawsweeper/actions/runs/25048225923)
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
| Hourly cadence coverage | 1/51 current (50 due, 2%) |
| Hourly hot item cadence (<7d) | 1/51 current (50 due, 2%) |
| Daily cadence coverage | 225/225 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 204/204 current (0 due, 100%) |
| Weekly older issue cadence | 626/627 current (1 due, 99.8%) |
| Due now by cadence | 58 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 10:45 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 10:46 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 86 | 0 | 86 | 0 | 0 | 20 | 0 |
| Last hour | 423 | 0 | 423 | 1 | 0 | 236 | 0 |
| Last 24 hours | 913 | 3 | 910 | 1 | 10 | 494 | 0 |

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
| [#1146](https://github.com/openclaw/clawhub/issues/1146) | False positive: rotifer-evolving-agent flagged as suspicious — standard npx MCP pattern with full transparency | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1146.md) | complete | Apr 28, 2026, 10:45 UTC |
| [#1090](https://github.com/openclaw/clawhub/issues/1090) | Appeal: yinxiang-notes skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1090.md) | complete | Apr 28, 2026, 10:45 UTC |
| [#1220](https://github.com/openclaw/clawhub/issues/1220) | False positive: clawgo-clone skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1220.md) | complete | Apr 28, 2026, 10:44 UTC |
| [#1345](https://github.com/openclaw/clawhub/issues/1345) | Request to update skill summary for \"auto-create-ai-team\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1345.md) | complete | Apr 28, 2026, 10:44 UTC |
| [#1290](https://github.com/openclaw/clawhub/issues/1290) | [incorrectly flagged] Why does the build-working-memory skill been flagged as suspicious? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1290.md) | complete | Apr 28, 2026, 10:44 UTC |
| [#1314](https://github.com/openclaw/clawhub/issues/1314) | VirusTotal Suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1314.md) | complete | Apr 28, 2026, 10:44 UTC |
| [#1145](https://github.com/openclaw/clawhub/issues/1145) | Request to Remove False Positive Flag from \"ict\" (formerly skill-ict) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1145.md) | complete | Apr 28, 2026, 10:44 UTC |
| [#1296](https://github.com/openclaw/clawhub/issues/1296) | how can the tellers skill not be flagged? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1296.md) | complete | Apr 28, 2026, 10:44 UTC |
| [#1210](https://github.com/openclaw/clawhub/issues/1210) | Weixin Claw Bot Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1210.md) | complete | Apr 28, 2026, 10:44 UTC |
| [#1208](https://github.com/openclaw/clawhub/issues/1208) | False positive: CISO Agent Security skill flagged as suspicious -- defensive security framework, not offensive tooling | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1208.md) | complete | Apr 28, 2026, 10:44 UTC |

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
