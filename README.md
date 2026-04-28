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

Last dashboard update: Apr 28, 2026, 11:42 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4421 |
| Open PRs | 3488 |
| Open items total | 7909 |
| Reviewed files | 7482 |
| Unreviewed open items | 427 |
| Due now by cadence | 3857 |
| Proposed closes awaiting apply | 3 |
| Closed by Codex apply | 10307 |
| Failed or stale reviews | 50 |
| Archived closed files | 13455 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6998 | 6579 | 419 | 3846 | 3 | 10304 | Apr 28, 2026, 11:41 UTC | Apr 28, 2026, 11:42 UTC | 480 |
| [ClawHub](https://github.com/openclaw/clawhub) | 911 | 903 | 8 | 11 | 0 | 3 | Apr 28, 2026, 11:41 UTC | Apr 28, 2026, 08:18 UTC | 403 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 28, 2026, 11:23 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25049943284) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake publish complete | Apr 28, 2026, 11:42 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25049943284) |

### Fleet Activity

Latest review: Apr 28, 2026, 11:41 UTC. Latest close: Apr 28, 2026, 11:42 UTC. Latest comment sync: Apr 28, 2026, 11:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 36 | 2 | 34 | 1 | 2 | 19 | 1 |
| Last hour | 1082 | 14 | 1068 | 1 | 17 | 883 | 2 |
| Last 24 hours | 3027 | 91 | 2936 | 9 | 395 | 1010 | 14 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73527](https://github.com/openclaw/openclaw/issues/73527) | [Bug][Regression] memorySearch provider \"gemini\" unknown after steipete@3eb2a9d | already implemented on main | Apr 28, 2026, 11:42 UTC | [records/openclaw-openclaw/closed/73527.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73527.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73518](https://github.com/openclaw/openclaw/issues/73518) | [Bug]: `openclaw status` doesn't show channel list | already implemented on main | Apr 28, 2026, 11:40 UTC | [records/openclaw-openclaw/closed/73518.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73518.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73516](https://github.com/openclaw/openclaw/issues/73516) | [Bug] openclaw update 后旧 runtime-deps 残留导致 Gateway crash-loop 5小时 | already closed before apply | Apr 28, 2026, 11:18 UTC | [records/openclaw-openclaw/closed/73516.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73516.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73493](https://github.com/openclaw/openclaw/pull/73493) | fix(memory-core): retry dreaming cron startup reconciliation | kept open | Apr 28, 2026, 11:08 UTC | [records/openclaw-openclaw/closed/73493.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73493.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73509](https://github.com/openclaw/openclaw/issues/73509) | [Windows] Feishu channel crashes with ESM path error | already implemented on main | Apr 28, 2026, 11:05 UTC | [records/openclaw-openclaw/closed/73509.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73509.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73507](https://github.com/openclaw/openclaw/issues/73507) | plugin runtime config.loadConfig() is deprecated warning | already implemented on main | Apr 28, 2026, 11:03 UTC | [records/openclaw-openclaw/closed/73507.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73507.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73392](https://github.com/openclaw/openclaw/pull/73392) | fix(line): persist inbound media to ~/.openclaw/media/inbound/ via saveMediaBuffer | already implemented on main | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73392.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73392.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73364](https://github.com/openclaw/openclaw/pull/73364) | fix: reduce mirror lock hold time on slow filesystems (fixes #73339) | already implemented on main | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73364.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73498](https://github.com/openclaw/openclaw/pull/73498) | ci: shard config codeql quality | closed externally after review | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73498.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73498.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68634](https://github.com/openclaw/openclaw/issues/68634) | [Bug]: CLI commands repeatedly trigger scope-upgrade requests + Telegram Native Approvals fails with pairing required, generating persistent pending approvals | closed externally after review | Apr 28, 2026, 10:56 UTC | [records/openclaw-openclaw/closed/68634.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68634.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1658](https://github.com/openclaw/clawhub/issues/1658) | 我的SKILL被误认为可疑 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1658.md) | complete | Apr 28, 2026, 11:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1589](https://github.com/openclaw/clawhub/issues/1589) | [Security] wechat-helper: unvalidated $MESSAGE passed directly to browser automation tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1589.md) | complete | Apr 28, 2026, 11:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1518](https://github.com/openclaw/clawhub/issues/1518) | [Appeal] Skill Wrongly Flagged: anson125chen/data-sentinel-pro | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1518.md) | complete | Apr 28, 2026, 11:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#756](https://github.com/openclaw/clawhub/issues/756) | False positive: ppio-sandbox and novita-sandbox flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/756.md) | stale_local_checkout_blocked | Apr 28, 2026, 11:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1553](https://github.com/openclaw/clawhub/issues/1553) | Re-scan jarviyin/clawpk v5.0.0 — remove suspicious flag | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1553.md) | complete | Apr 28, 2026, 11:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1678](https://github.com/openclaw/clawhub/issues/1678) | clawhub package publish — two issues with org namespaces and monorepo subdirectories | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1678.md) | complete | Apr 28, 2026, 11:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1528](https://github.com/openclaw/clawhub/issues/1528) | Help, fit-converter skill is officially skill but flagged as suspicious after scanning | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1528.md) | complete | Apr 28, 2026, 11:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1707](https://github.com/openclaw/clawhub/issues/1707) | Bug Summary: Missing Token in search and explore Commands | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1707.md) | complete | Apr 28, 2026, 11:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1587](https://github.com/openclaw/clawhub/issues/1587) | Skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1587.md) | complete | Apr 28, 2026, 11:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1591](https://github.com/openclaw/clawhub/issues/1591) | Is there an avenue to appeal for the removal of a Skill that was registered in bad faith, corresponding to another party's valid trademark? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1591.md) | complete | Apr 28, 2026, 11:41 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 11:42 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 3 fresh all closes. Close reasons: all. Existing Codex automated review comments are updated in place when closing or when comment-only sync is stale by 7 day(s); checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=41473,46472,46992.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25049622963](https://github.com/openclaw/clawsweeper/actions/runs/25049622963)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3547 |
| Open PRs | 3451 |
| Open items total | 6998 |
| Reviewed files | 6579 |
| Unreviewed open items | 419 |
| Archived closed files | 13445 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3334 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3196 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6530 |
| Proposed closes awaiting apply | 3 (0% of fresh reviews) |
| Closed by Codex apply | 10304 |
| Failed or stale reviews | 49 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 89/689 current (600 due, 12.9%) |
| Hourly hot item cadence (<7d) | 89/689 current (600 due, 12.9%) |
| Daily cadence coverage | 1232/4051 current (2819 due, 30.4%) |
| Daily PR cadence | 961/2812 current (1851 due, 34.2%) |
| Daily new issue cadence (<30d) | 271/1239 current (968 due, 21.9%) |
| Weekly older issue cadence | 1831/1839 current (8 due, 99.6%) |
| Due now by cadence | 3846 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 11:41 UTC. Latest close: Apr 28, 2026, 11:42 UTC. Latest comment sync: Apr 28, 2026, 11:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 16 | 2 | 14 | 0 | 2 | 19 | 1 |
| Last hour | 563 | 14 | 549 | 0 | 17 | 480 | 2 |
| Last 24 hours | 2114 | 88 | 2026 | 8 | 385 | 599 | 14 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73527](https://github.com/openclaw/openclaw/issues/73527) | [Bug][Regression] memorySearch provider \"gemini\" unknown after steipete@3eb2a9d | already implemented on main | Apr 28, 2026, 11:42 UTC | [records/openclaw-openclaw/closed/73527.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73527.md) |
| [#73518](https://github.com/openclaw/openclaw/issues/73518) | [Bug]: `openclaw status` doesn't show channel list | already implemented on main | Apr 28, 2026, 11:40 UTC | [records/openclaw-openclaw/closed/73518.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73518.md) |
| [#73516](https://github.com/openclaw/openclaw/issues/73516) | [Bug] openclaw update 后旧 runtime-deps 残留导致 Gateway crash-loop 5小时 | already closed before apply | Apr 28, 2026, 11:18 UTC | [records/openclaw-openclaw/closed/73516.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73516.md) |
| [#73493](https://github.com/openclaw/openclaw/pull/73493) | fix(memory-core): retry dreaming cron startup reconciliation | kept open | Apr 28, 2026, 11:08 UTC | [records/openclaw-openclaw/closed/73493.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73493.md) |
| [#73509](https://github.com/openclaw/openclaw/issues/73509) | [Windows] Feishu channel crashes with ESM path error | already implemented on main | Apr 28, 2026, 11:05 UTC | [records/openclaw-openclaw/closed/73509.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73509.md) |
| [#73507](https://github.com/openclaw/openclaw/issues/73507) | plugin runtime config.loadConfig() is deprecated warning | already implemented on main | Apr 28, 2026, 11:03 UTC | [records/openclaw-openclaw/closed/73507.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73507.md) |
| [#73392](https://github.com/openclaw/openclaw/pull/73392) | fix(line): persist inbound media to ~/.openclaw/media/inbound/ via saveMediaBuffer | already implemented on main | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73392.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73392.md) |
| [#73364](https://github.com/openclaw/openclaw/pull/73364) | fix: reduce mirror lock hold time on slow filesystems (fixes #73339) | already implemented on main | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73364.md) |
| [#73498](https://github.com/openclaw/openclaw/pull/73498) | ci: shard config codeql quality | closed externally after review | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73498.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73498.md) |
| [#68634](https://github.com/openclaw/openclaw/issues/68634) | [Bug]: CLI commands repeatedly trigger scope-upgrade requests + Telegram Native Approvals fails with pairing required, generating persistent pending approvals | closed externally after review | Apr 28, 2026, 10:56 UTC | [records/openclaw-openclaw/closed/68634.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68634.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73419](https://github.com/openclaw/openclaw/pull/73419) | fix(onboarding): Improve the dynamic import UX. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73419.md) | complete | Apr 28, 2026, 11:41 UTC |
| [#73536](https://github.com/openclaw/openclaw/pull/73536) | fix(agents/bundle-mcp): pass configured timeout to MCP callTool requests (#60967) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73536.md) | complete | Apr 28, 2026, 11:40 UTC |
| [#67011](https://github.com/openclaw/openclaw/pull/67011) | fix: avoid false circular detection for shared references | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67011.md) | complete | Apr 28, 2026, 11:39 UTC |
| [#73521](https://github.com/openclaw/openclaw/pull/73521) | fix: Discord read/search timeout, session-key fallback, and gateway execution mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73521.md) | complete | Apr 28, 2026, 11:39 UTC |
| [#73526](https://github.com/openclaw/openclaw/pull/73526) | [plugin sdk] plan-mode parity follow-ups: 6 seams stacked on #73384 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73526.md) | complete | Apr 28, 2026, 11:39 UTC |
| [#73535](https://github.com/openclaw/openclaw/issues/73535) | [Bug]: local status/gateway status false-negative regression starts in 2026.4.24; --require-rpc and 2026.4.23 client still succeed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73535.md) | complete | Apr 28, 2026, 11:38 UTC |
| [#73533](https://github.com/openclaw/openclaw/pull/73533) | fix(infra): skip POSIX /tmp preferred path on Windows (#60713) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73533.md) | complete | Apr 28, 2026, 11:38 UTC |
| [#73532](https://github.com/openclaw/openclaw/issues/73532) | Plugin loader hot loop: prepareBundledPluginRuntimeDistMirror + JSON5 manifest parsing saturate gateway and starve event loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73532.md) | complete | Apr 28, 2026, 11:38 UTC |
| [#73523](https://github.com/openclaw/openclaw/pull/73523) | fix(browser): make existing-session status checks non-spawning | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73523.md) | complete | Apr 28, 2026, 11:38 UTC |
| [#73525](https://github.com/openclaw/openclaw/issues/73525) | [Bug]: openclaw status shows empty Channels table while openclaw channels status shows channels correctly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73525.md) | complete | Apr 28, 2026, 11:38 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 11:42 UTC

State: Hot intake publish complete

Merged hot intake artifacts for run 25049943284. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25049943284](https://github.com/openclaw/clawsweeper/actions/runs/25049943284)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 874 |
| Open PRs | 37 |
| Open items total | 911 |
| Reviewed files | 903 |
| Unreviewed open items | 8 |
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
| Due now by cadence | 11 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 11:41 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 10:53 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 0 | 20 | 1 | 0 | 0 | 0 |
| Last hour | 519 | 0 | 519 | 1 | 0 | 403 | 0 |
| Last 24 hours | 913 | 3 | 910 | 1 | 10 | 411 | 0 |

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
| [#1658](https://github.com/openclaw/clawhub/issues/1658) | 我的SKILL被误认为可疑 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1658.md) | complete | Apr 28, 2026, 11:41 UTC |
| [#1589](https://github.com/openclaw/clawhub/issues/1589) | [Security] wechat-helper: unvalidated $MESSAGE passed directly to browser automation tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1589.md) | complete | Apr 28, 2026, 11:41 UTC |
| [#1518](https://github.com/openclaw/clawhub/issues/1518) | [Appeal] Skill Wrongly Flagged: anson125chen/data-sentinel-pro | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1518.md) | complete | Apr 28, 2026, 11:41 UTC |
| [#756](https://github.com/openclaw/clawhub/issues/756) | False positive: ppio-sandbox and novita-sandbox flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/756.md) | stale_local_checkout_blocked | Apr 28, 2026, 11:41 UTC |
| [#1553](https://github.com/openclaw/clawhub/issues/1553) | Re-scan jarviyin/clawpk v5.0.0 — remove suspicious flag | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1553.md) | complete | Apr 28, 2026, 11:41 UTC |
| [#1678](https://github.com/openclaw/clawhub/issues/1678) | clawhub package publish — two issues with org namespaces and monorepo subdirectories | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1678.md) | complete | Apr 28, 2026, 11:41 UTC |
| [#1528](https://github.com/openclaw/clawhub/issues/1528) | Help, fit-converter skill is officially skill but flagged as suspicious after scanning | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1528.md) | complete | Apr 28, 2026, 11:41 UTC |
| [#1707](https://github.com/openclaw/clawhub/issues/1707) | Bug Summary: Missing Token in search and explore Commands | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1707.md) | complete | Apr 28, 2026, 11:41 UTC |
| [#1587](https://github.com/openclaw/clawhub/issues/1587) | Skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1587.md) | complete | Apr 28, 2026, 11:41 UTC |
| [#1591](https://github.com/openclaw/clawhub/issues/1591) | Is there an avenue to appeal for the removal of a Skill that was registered in bad faith, corresponding to another party's valid trademark? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1591.md) | complete | Apr 28, 2026, 11:41 UTC |

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
