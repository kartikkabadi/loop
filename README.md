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

Last dashboard update: Apr 28, 2026, 19:15 UTC

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 19:31 UTC

State: Apply throttled

GitHub throttled while applying close decisions. Last throttled command: `gh api repos/openclaw/openclaw/issues?state=open&sort=created&direction=asc&per_page=100&page=1`. Retry 6/11 in 600s.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25072705696](https://github.com/openclaw/clawsweeper/actions/runs/25072705696)
<!-- clawsweeper-status:openclaw-openclaw:end -->

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 19:23 UTC

State: Apply throttled

GitHub throttled while applying close decisions. Last throttled command: `gh api repos/openclaw/openclaw/issues?state=open&sort=created&direction=asc&per_page=100&page=1`. Retry 5/11 in 480s.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25072705696](https://github.com/openclaw/clawsweeper/actions/runs/25072705696)
<!-- clawsweeper-status:openclaw-openclaw:end -->

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 19:19 UTC

State: Apply throttled

GitHub throttled while applying close decisions. Last throttled command: `gh api repos/openclaw/openclaw/issues?state=open&sort=created&direction=asc&per_page=100&page=1`. Retry 4/11 in 240s.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25072705696](https://github.com/openclaw/clawsweeper/actions/runs/25072705696)
<!-- clawsweeper-status:openclaw-openclaw:end -->

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 19:16 UTC

State: Apply throttled

GitHub throttled while applying close decisions. Last throttled command: `gh api repos/openclaw/openclaw/issues?state=open&sort=created&direction=asc&per_page=100&page=1`. Retry 2/11 in 60s.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25072705696](https://github.com/openclaw/clawsweeper/actions/runs/25072705696)
<!-- clawsweeper-status:openclaw-openclaw:end -->

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4415 |
| Open PRs | 3457 |
| Open items total | 7872 |
| Reviewed files | 7481 |
| Unreviewed open items | 391 |
| Due now by cadence | 2289 |
| Proposed closes awaiting apply | 3 |
| Closed by Codex apply | 10517 |
| Failed or stale reviews | 10 |
| Archived closed files | 13717 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6959 | 6575 | 384 | 2280 | 3 | 10514 | Apr 28, 2026, 19:14 UTC | Apr 28, 2026, 19:28 UTC | 178 |
| [ClawHub](https://github.com/openclaw/clawhub) | 913 | 906 | 7 | 9 | 0 | 3 | Apr 28, 2026, 19:07 UTC | Apr 28, 2026, 18:47 UTC | 20 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review in progress | Apr 28, 2026, 19:41 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25071658124) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake in progress | Apr 28, 2026, 19:15 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25072675470) |

### Fleet Activity

Latest review: Apr 28, 2026, 19:14 UTC. Latest close: Apr 28, 2026, 19:28 UTC. Latest comment sync: Apr 28, 2026, 19:15 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 2 | 0 | 0 |
| Last hour | 1083 | 6 | 1077 | 2 | 16 | 198 | 3 |
| Last 24 hours | 5218 | 295 | 4923 | 7 | 648 | 591 | 21 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72482](https://github.com/openclaw/openclaw/pull/72482) | fix(telegram): suppress tool progress in non-streaming mode | closed externally after review | Apr 28, 2026, 19:28 UTC | [records/openclaw-openclaw/closed/72482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72482.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72363](https://github.com/openclaw/openclaw/issues/72363) | Reasoning/thinking tokens and tool call intermediates leak into Telegram chat (GLM, MiniMax) | closed externally after review | Apr 28, 2026, 19:28 UTC | [records/openclaw-openclaw/closed/72363.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72363.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45271](https://github.com/openclaw/openclaw/issues/45271) | [Bug]: Model does \"tool calling narrations\" since 2026.3.7 | closed externally after review | Apr 28, 2026, 19:17 UTC | [records/openclaw-openclaw/closed/45271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/45271.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73626](https://github.com/openclaw/openclaw/issues/73626) | Bug: Discord channel can remain bound to stale agent session after routing changes | closed externally after review | Apr 28, 2026, 19:09 UTC | [records/openclaw-openclaw/closed/73626.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73626.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73608](https://github.com/openclaw/openclaw/pull/73608) | fix(discord): deduplicate accounts sharing the same bot token | closed externally after review | Apr 28, 2026, 19:08 UTC | [records/openclaw-openclaw/closed/73608.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73608.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73752](https://github.com/openclaw/openclaw/issues/73752) | [Bug]: Windows 2026.4.26 gateway/WebChat/TUI handshake timeouts + stuck agent:main:main queue | duplicate or superseded | Apr 28, 2026, 18:54 UTC | [records/openclaw-openclaw/closed/73752.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73752.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73742](https://github.com/openclaw/openclaw/pull/73742) | ci: shard channel codeql quality | closed externally after review | Apr 28, 2026, 18:52 UTC | [records/openclaw-openclaw/closed/73742.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73742.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73748](https://github.com/openclaw/openclaw/issues/73748) | MemOS stopped capturing after 4.26 upgrade - fix: hooks.allowConversationAccess | already implemented on main | Apr 28, 2026, 18:48 UTC | [records/openclaw-openclaw/closed/73748.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73748.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62789](https://github.com/openclaw/openclaw/pull/62789) | cron: add command payload execution engine | belongs on ClawHub | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/62789.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62789.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42400](https://github.com/openclaw/openclaw/pull/42400) | feat(channels): add neverReply config for group message suppression | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42400.md) | complete | Apr 28, 2026, 19:14 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73746](https://github.com/openclaw/openclaw/pull/73746) | feat(tasks): add intermediate active task states | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73746.md) | complete | Apr 28, 2026, 19:13 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68559](https://github.com/openclaw/openclaw/pull/68559) | fix(memory-host-sdk): index only primary session transcripts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68559.md) | complete | Apr 28, 2026, 19:12 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41745](https://github.com/openclaw/openclaw/pull/41745) | fix(session): defer systemSent persistence until LLM response succeeds | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41745.md) | complete | Apr 28, 2026, 19:12 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73756](https://github.com/openclaw/openclaw/issues/73756) | Telegram dmPolicy=open bypasses visible allowFrom allowlist and can expose bots publicly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73756.md) | complete | Apr 28, 2026, 19:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73294](https://github.com/openclaw/openclaw/pull/73294) | Add Discord response watchdog | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73294.md) | complete | Apr 28, 2026, 19:09 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1261](https://github.com/openclaw/clawhub/issues/1261) | False Skill flagged — suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1261.md) | complete | Apr 28, 2026, 19:07 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73755](https://github.com/openclaw/openclaw/pull/73755) | fix(gateway): preserve external Tailscale Funnel routes in serve mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73755.md) | complete | Apr 28, 2026, 19:06 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1080](https://github.com/openclaw/clawhub/issues/1080) | skill has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1080.md) | complete | Apr 28, 2026, 19:06 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73594](https://github.com/openclaw/openclaw/pull/73594) | feat(openrouter): inject cache_control for closed-source qwen models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73594.md) | complete | Apr 28, 2026, 19:05 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 19:41 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25071658124](https://github.com/openclaw/clawsweeper/actions/runs/25071658124)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3540 |
| Open PRs | 3419 |
| Open items total | 6959 |
| Reviewed files | 6575 |
| Unreviewed open items | 384 |
| Archived closed files | 13706 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3363 |
| Proposed issue closes | 2 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3203 |
| Proposed PR closes | 1 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6566 |
| Proposed closes awaiting apply | 3 (0% of fresh reviews) |
| Closed by Codex apply | 10514 |
| Failed or stale reviews | 9 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 68/827 current (759 due, 8.2%) |
| Hourly hot item cadence (<7d) | 68/827 current (759 due, 8.2%) |
| Daily cadence coverage | 2769/3905 current (1136 due, 70.9%) |
| Daily PR cadence | 2074/2724 current (650 due, 76.1%) |
| Daily new issue cadence (<30d) | 695/1181 current (486 due, 58.8%) |
| Weekly older issue cadence | 1842/1843 current (1 due, 99.9%) |
| Due now by cadence | 2280 |

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

Latest review: Apr 28, 2026, 19:14 UTC. Latest close: Apr 28, 2026, 19:28 UTC. Latest comment sync: Apr 28, 2026, 19:15 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 2 | 0 | 0 |
| Last hour | 563 | 6 | 557 | 1 | 15 | 178 | 3 |
| Last 24 hours | 4301 | 292 | 4009 | 6 | 637 | 562 | 21 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72482](https://github.com/openclaw/openclaw/pull/72482) | fix(telegram): suppress tool progress in non-streaming mode | closed externally after review | Apr 28, 2026, 19:28 UTC | [records/openclaw-openclaw/closed/72482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72482.md) |
| [#72363](https://github.com/openclaw/openclaw/issues/72363) | Reasoning/thinking tokens and tool call intermediates leak into Telegram chat (GLM, MiniMax) | closed externally after review | Apr 28, 2026, 19:28 UTC | [records/openclaw-openclaw/closed/72363.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72363.md) |
| [#45271](https://github.com/openclaw/openclaw/issues/45271) | [Bug]: Model does \"tool calling narrations\" since 2026.3.7 | closed externally after review | Apr 28, 2026, 19:17 UTC | [records/openclaw-openclaw/closed/45271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/45271.md) |
| [#73626](https://github.com/openclaw/openclaw/issues/73626) | Bug: Discord channel can remain bound to stale agent session after routing changes | closed externally after review | Apr 28, 2026, 19:09 UTC | [records/openclaw-openclaw/closed/73626.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73626.md) |
| [#73608](https://github.com/openclaw/openclaw/pull/73608) | fix(discord): deduplicate accounts sharing the same bot token | closed externally after review | Apr 28, 2026, 19:08 UTC | [records/openclaw-openclaw/closed/73608.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73608.md) |
| [#73752](https://github.com/openclaw/openclaw/issues/73752) | [Bug]: Windows 2026.4.26 gateway/WebChat/TUI handshake timeouts + stuck agent:main:main queue | duplicate or superseded | Apr 28, 2026, 18:54 UTC | [records/openclaw-openclaw/closed/73752.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73752.md) |
| [#73742](https://github.com/openclaw/openclaw/pull/73742) | ci: shard channel codeql quality | closed externally after review | Apr 28, 2026, 18:52 UTC | [records/openclaw-openclaw/closed/73742.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73742.md) |
| [#73748](https://github.com/openclaw/openclaw/issues/73748) | MemOS stopped capturing after 4.26 upgrade - fix: hooks.allowConversationAccess | already implemented on main | Apr 28, 2026, 18:48 UTC | [records/openclaw-openclaw/closed/73748.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73748.md) |
| [#62789](https://github.com/openclaw/openclaw/pull/62789) | cron: add command payload execution engine | belongs on ClawHub | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/62789.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62789.md) |
| [#73585](https://github.com/openclaw/openclaw/issues/73585) | [Bug]: Discord /gateway/bot metadata lookup times out at 10s starting ~2026-04-27 (raw HTTP latency is fine) | closed externally after review | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/73585.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73585.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#42400](https://github.com/openclaw/openclaw/pull/42400) | feat(channels): add neverReply config for group message suppression | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42400.md) | complete | Apr 28, 2026, 19:14 UTC |
| [#73746](https://github.com/openclaw/openclaw/pull/73746) | feat(tasks): add intermediate active task states | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73746.md) | complete | Apr 28, 2026, 19:13 UTC |
| [#68559](https://github.com/openclaw/openclaw/pull/68559) | fix(memory-host-sdk): index only primary session transcripts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68559.md) | complete | Apr 28, 2026, 19:12 UTC |
| [#41745](https://github.com/openclaw/openclaw/pull/41745) | fix(session): defer systemSent persistence until LLM response succeeds | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41745.md) | complete | Apr 28, 2026, 19:12 UTC |
| [#73756](https://github.com/openclaw/openclaw/issues/73756) | Telegram dmPolicy=open bypasses visible allowFrom allowlist and can expose bots publicly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73756.md) | complete | Apr 28, 2026, 19:09 UTC |
| [#73294](https://github.com/openclaw/openclaw/pull/73294) | Add Discord response watchdog | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73294.md) | complete | Apr 28, 2026, 19:09 UTC |
| [#73755](https://github.com/openclaw/openclaw/pull/73755) | fix(gateway): preserve external Tailscale Funnel routes in serve mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73755.md) | complete | Apr 28, 2026, 19:06 UTC |
| [#73594](https://github.com/openclaw/openclaw/pull/73594) | feat(openrouter): inject cache_control for closed-source qwen models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73594.md) | complete | Apr 28, 2026, 19:05 UTC |
| [#73595](https://github.com/openclaw/openclaw/issues/73595) | Runtime injection tags (`<system-reminder>`, `<previous_response>`) leak verbatim to delivery channels when model is in degraded state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73595.md) | complete | Apr 28, 2026, 19:05 UTC |
| [#73700](https://github.com/openclaw/openclaw/pull/73700) | fix(cli): tolerate deleted cwd in shouldLoadCliDotEnv (#73676) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73700.md) | complete | Apr 28, 2026, 19:05 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 19:15 UTC

State: Hot intake in progress

Hot intake planned 20 items across 20 shards. Capacity is 20 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25072675470](https://github.com/openclaw/clawsweeper/actions/runs/25072675470)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 875 |
| Open PRs | 38 |
| Open items total | 913 |
| Reviewed files | 906 |
| Unreviewed open items | 7 |
| Archived closed files | 11 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 873 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 905 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 1 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 49/50 current (1 due, 98%) |
| Hourly hot item cadence (<7d) | 49/50 current (1 due, 98%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 632/633 current (1 due, 99.8%) |
| Due now by cadence | 9 |

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

Latest review: Apr 28, 2026, 19:07 UTC. Latest close: Apr 28, 2026, 18:47 UTC. Latest comment sync: Apr 28, 2026, 18:48 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 520 | 0 | 520 | 1 | 1 | 20 | 0 |
| Last 24 hours | 917 | 3 | 914 | 1 | 11 | 29 | 0 |

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
| [#1261](https://github.com/openclaw/clawhub/issues/1261) | False Skill flagged — suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1261.md) | complete | Apr 28, 2026, 19:07 UTC |
| [#1080](https://github.com/openclaw/clawhub/issues/1080) | skill has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1080.md) | complete | Apr 28, 2026, 19:06 UTC |
| [#1435](https://github.com/openclaw/clawhub/issues/1435) | [False Positive] lobster-says v1.1.0 — legitimate emotional companion skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1435.md) | complete | Apr 28, 2026, 19:04 UTC |
| [#1852](https://github.com/openclaw/clawhub/issues/1852) | Multi-agent trust boundaries for claw | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1852.md) | complete | Apr 28, 2026, 19:04 UTC |
| [#1371](https://github.com/openclaw/clawhub/issues/1371) | Request: delete unraidclaw skill listing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1371.md) | complete | Apr 28, 2026, 19:04 UTC |
| [#1816](https://github.com/openclaw/clawhub/issues/1816) | False positive: mimotts25-plus flagged as SUSPICIOUS by AI scanner | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1816.md) | complete | Apr 28, 2026, 19:04 UTC |
| [#1576](https://github.com/openclaw/clawhub/issues/1576) | False positive: DCL Sentinel Trace flagged as Suspicious — webhook is the product, not a risk | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1576.md) | complete | Apr 28, 2026, 19:03 UTC |
| [#1812](https://github.com/openclaw/clawhub/issues/1812) | Skill be flagged as suspicious and being marked hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1812.md) | complete | Apr 28, 2026, 19:03 UTC |
| [#1425](https://github.com/openclaw/clawhub/issues/1425) | Skill marked as suspicious: skills-audit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1425.md) | complete | Apr 28, 2026, 19:03 UTC |
| [#1856](https://github.com/openclaw/clawhub/pull/1856) | fix(cli): preserve root skill manifest during publish | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1856.md) | complete | Apr 28, 2026, 19:03 UTC |

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
