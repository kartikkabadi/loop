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

Last dashboard update: Apr 28, 2026, 07:40 UTC

### Current Run

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4430 |
| Open PRs | 3505 |
| Open items total | 7935 |
| Reviewed files | 7465 |
| Unreviewed open items | 470 |
| Due now by cadence | 3654 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10277 |
| Failed or stale reviews | 33 |
| Archived closed files | 13339 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 7024 | 6560 | 464 | 3647 | 0 | 10274 | Apr 28, 2026, 07:38 UTC | Apr 28, 2026, 07:06 UTC | 384 |
| [ClawHub](https://github.com/openclaw/clawhub) | 911 | 905 | 6 | 7 | 0 | 3 | Apr 28, 2026, 07:00 UTC | Apr 28, 2026, 05:18 UTC | 390 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Event review applied | Apr 28, 2026, 07:40 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25039956229) |
| [ClawHub](https://github.com/openclaw/clawhub) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 28, 2026, 07:38 UTC. Latest close: Apr 28, 2026, 07:06 UTC. Latest comment sync: Apr 28, 2026, 07:40 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| Last hour | 729 | 23 | 706 | 3 | 4 | 774 | 14 |
| Last 24 hours | 3303 | 120 | 3183 | 14 | 69 | 2035 | 22 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73353](https://github.com/openclaw/openclaw/issues/73353) | 60s startup hang in sidecars.channels — synchronous plugin manifest re-discovery on every cold start (v2026.4.26) | already implemented on main | Apr 28, 2026, 07:06 UTC | [records/openclaw-openclaw/closed/73353.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73353.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73352](https://github.com/openclaw/openclaw/issues/73352) | MCP Client: Add OAuth2 Authorization Code Flow support for HTTP-based MCP servers | duplicate or superseded | Apr 28, 2026, 07:05 UTC | [records/openclaw-openclaw/closed/73352.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73352.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73348](https://github.com/openclaw/openclaw/issues/73348) | openclaw update can succeed while the running gateway stays on an older version, causing plugin/config version skew | already implemented on main | Apr 28, 2026, 06:50 UTC | [records/openclaw-openclaw/closed/73348.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73348.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73344](https://github.com/openclaw/openclaw/issues/73344) | [Bug]: /new on openai-codex/* (Responses API) returns \"One of input/previous_response_id/prompt/conversation_id must be provided\" — regression in 2026.4.26 | already implemented on main | Apr 28, 2026, 06:45 UTC | [records/openclaw-openclaw/closed/73344.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73344.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73331](https://github.com/openclaw/openclaw/issues/73331) | v2026.4.26: Gateway busy-loops on bundled openai SDK directory walk; stops accepting connections | already implemented on main | Apr 28, 2026, 06:22 UTC | [records/openclaw-openclaw/closed/73331.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73331.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73329](https://github.com/openclaw/openclaw/issues/73329) | [Bug]: Gateway hard-couples to OpenRouter + LiteLLM pricing fetches at boot; no opt-out | duplicate or superseded | Apr 28, 2026, 06:20 UTC | [records/openclaw-openclaw/closed/73329.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73329.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1736](https://github.com/openclaw/clawhub/pull/1736) | Align hover stats with denormalized counters and fix seed digest stat drift | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1736.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1736.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1324](https://github.com/openclaw/clawhub/pull/1324) | feat: add --dry-run flag to package publish command | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1324.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1240](https://github.com/openclaw/clawhub/pull/1240) | fix: use esbuild minification for safari builds | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1240.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1240.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72512](https://github.com/openclaw/openclaw/pull/72512) | fix(webchat): guard Enter-to-send when a request is already in flight (#72157) | already implemented on main | Apr 28, 2026, 03:52 UTC | [records/openclaw-openclaw/closed/72512.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72512.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51689](https://github.com/openclaw/openclaw/pull/51689) | docs: capitalize \"Thanks\" in changelog contributor attribution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51689.md) | complete | Apr 28, 2026, 07:38 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73357](https://github.com/openclaw/openclaw/pull/73357) | fix: handle ENOSPC file watcher errors gracefully | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73357.md) | complete | Apr 28, 2026, 07:10 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72645](https://github.com/openclaw/openclaw/pull/72645) | feat(diagnostics-otel): add per-message end-to-end OTel tracing across run/skill/tool/model | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72645.md) | complete | Apr 28, 2026, 07:10 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73355](https://github.com/openclaw/openclaw/pull/73355) | fix(cron): add .catch() re-arm and watchdog to prevent runtime timer chain death | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73355.md) | complete | Apr 28, 2026, 07:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73347](https://github.com/openclaw/openclaw/pull/73347) | fix(wizard): use setup token for onboarding health check | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73347.md) | complete | Apr 28, 2026, 07:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73346](https://github.com/openclaw/openclaw/pull/73346) | fix(agents/anthropic-transport): suppress default beta headers on custom Anthropic-compatible providers | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73346.md) | complete | Apr 28, 2026, 07:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69297](https://github.com/openclaw/openclaw/pull/69297) | fix(whatsapp): Add group admin privacy controls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69297.md) | complete | Apr 28, 2026, 07:00 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1860](https://github.com/openclaw/clawhub/pull/1860) | docs: document trademark takedown reports | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1860.md) | complete | Apr 28, 2026, 07:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72936](https://github.com/openclaw/openclaw/pull/72936) | Wire diagnostics through the core chat command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72936.md) | complete | Apr 28, 2026, 06:59 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1859](https://github.com/openclaw/clawhub/pull/1859) | docs: clarify optional skill environment variables | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1859.md) | complete | Apr 28, 2026, 06:59 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 07:40 UTC

State: Event review applied

Reviewed event item #51689, synced durable comment(s): 1, closed safe proposal(s): 0. Close reasons enabled: implemented_on_main,duplicate_or_superseded.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25039956229](https://github.com/openclaw/clawsweeper/actions/runs/25039956229)
<!-- clawsweeper-status:openclaw-openclaw:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3556 |
| Open PRs | 3468 |
| Open items total | 7024 |
| Reviewed files | 6560 |
| Unreviewed open items | 464 |
| Archived closed files | 13332 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3352 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3175 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6527 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10274 |
| Failed or stale reviews | 33 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 64/629 current (565 due, 10.2%) |
| Hourly hot item cadence (<7d) | 64/629 current (565 due, 10.2%) |
| Daily cadence coverage | 1473/4086 current (2613 due, 36%) |
| Daily PR cadence | 1055/2826 current (1771 due, 37.3%) |
| Daily new issue cadence (<30d) | 418/1260 current (842 due, 33.2%) |
| Weekly older issue cadence | 1840/1845 current (5 due, 99.7%) |
| Due now by cadence | 3647 |

### Audit Health

<!-- clawsweeper-audit:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Status: **Action needed**

Targeted review input: `64563,65635,56915,61960,62112,62431,64150,71072`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 7132 |
| Missing eligible open records | 2 |
| Missing maintainer-authored open records | 94 |
| Missing protected open records | 1 |
| Missing recently-created open records | 149 |
| Archived records that are open again | 0 |
| Stale item records | 1 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 6 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#64563](https://github.com/openclaw/openclaw/pull/64563) | Missing eligible open | fix(whatsapp): lazy default auth dir for profile state (#64555) | eligible |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#56915](https://github.com/openclaw/openclaw/issues/56915) | Stale review | [Bug]: [Bug] Skills scanner ignores subdirectories under ~/.openclaw/skills/ | records/openclaw-openclaw/items/56915.md |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 07:38 UTC. Latest close: Apr 28, 2026, 07:06 UTC. Latest comment sync: Apr 28, 2026, 07:40 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| Last hour | 347 | 23 | 324 | 3 | 4 | 384 | 13 |
| Last 24 hours | 2391 | 117 | 2274 | 14 | 66 | 1306 | 21 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73353](https://github.com/openclaw/openclaw/issues/73353) | 60s startup hang in sidecars.channels — synchronous plugin manifest re-discovery on every cold start (v2026.4.26) | already implemented on main | Apr 28, 2026, 07:06 UTC | [records/openclaw-openclaw/closed/73353.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73353.md) |
| [#73352](https://github.com/openclaw/openclaw/issues/73352) | MCP Client: Add OAuth2 Authorization Code Flow support for HTTP-based MCP servers | duplicate or superseded | Apr 28, 2026, 07:05 UTC | [records/openclaw-openclaw/closed/73352.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73352.md) |
| [#73348](https://github.com/openclaw/openclaw/issues/73348) | openclaw update can succeed while the running gateway stays on an older version, causing plugin/config version skew | already implemented on main | Apr 28, 2026, 06:50 UTC | [records/openclaw-openclaw/closed/73348.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73348.md) |
| [#73344](https://github.com/openclaw/openclaw/issues/73344) | [Bug]: /new on openai-codex/* (Responses API) returns \"One of input/previous_response_id/prompt/conversation_id must be provided\" — regression in 2026.4.26 | already implemented on main | Apr 28, 2026, 06:45 UTC | [records/openclaw-openclaw/closed/73344.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73344.md) |
| [#73331](https://github.com/openclaw/openclaw/issues/73331) | v2026.4.26: Gateway busy-loops on bundled openai SDK directory walk; stops accepting connections | already implemented on main | Apr 28, 2026, 06:22 UTC | [records/openclaw-openclaw/closed/73331.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73331.md) |
| [#73329](https://github.com/openclaw/openclaw/issues/73329) | [Bug]: Gateway hard-couples to OpenRouter + LiteLLM pricing fetches at boot; no opt-out | duplicate or superseded | Apr 28, 2026, 06:20 UTC | [records/openclaw-openclaw/closed/73329.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73329.md) |
| [#72512](https://github.com/openclaw/openclaw/pull/72512) | fix(webchat): guard Enter-to-send when a request is already in flight (#72157) | already implemented on main | Apr 28, 2026, 03:52 UTC | [records/openclaw-openclaw/closed/72512.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72512.md) |
| [#72507](https://github.com/openclaw/openclaw/issues/72507) | Bug: sessions.json grows unbounded due to static schema serialized into dynamic session state | duplicate or superseded | Apr 28, 2026, 03:52 UTC | [records/openclaw-openclaw/closed/72507.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72507.md) |
| [#72286](https://github.com/openclaw/openclaw/pull/72286) | Add Google Live browser Talk sessions | already implemented on main | Apr 28, 2026, 03:52 UTC | [records/openclaw-openclaw/closed/72286.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72286.md) |
| [#70597](https://github.com/openclaw/openclaw/pull/70597) | yuanbao channel | already implemented on main | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/70597.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70597.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#51689](https://github.com/openclaw/openclaw/pull/51689) | docs: capitalize \"Thanks\" in changelog contributor attribution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51689.md) | complete | Apr 28, 2026, 07:38 UTC |
| [#73357](https://github.com/openclaw/openclaw/pull/73357) | fix: handle ENOSPC file watcher errors gracefully | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73357.md) | complete | Apr 28, 2026, 07:10 UTC |
| [#72645](https://github.com/openclaw/openclaw/pull/72645) | feat(diagnostics-otel): add per-message end-to-end OTel tracing across run/skill/tool/model | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72645.md) | complete | Apr 28, 2026, 07:10 UTC |
| [#73355](https://github.com/openclaw/openclaw/pull/73355) | fix(cron): add .catch() re-arm and watchdog to prevent runtime timer chain death | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73355.md) | complete | Apr 28, 2026, 07:09 UTC |
| [#73347](https://github.com/openclaw/openclaw/pull/73347) | fix(wizard): use setup token for onboarding health check | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73347.md) | complete | Apr 28, 2026, 07:09 UTC |
| [#73346](https://github.com/openclaw/openclaw/pull/73346) | fix(agents/anthropic-transport): suppress default beta headers on custom Anthropic-compatible providers | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73346.md) | complete | Apr 28, 2026, 07:09 UTC |
| [#72936](https://github.com/openclaw/openclaw/pull/72936) | Wire diagnostics through the core chat command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72936.md) | complete | Apr 28, 2026, 06:59 UTC |
| [#73351](https://github.com/openclaw/openclaw/pull/73351) | fix(cli-runner): transfer bundle-MCP cleanup to live session lifecycle (#73244) | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73351.md) | complete | Apr 28, 2026, 06:59 UTC |
| [#73349](https://github.com/openclaw/openclaw/pull/73349) | feat(exec): inject OPENCLAW_SESSION_KEY and OPENCLAW_AGENT_ID env vars for child processes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73349.md) | complete | Apr 28, 2026, 06:59 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: unknown

State: Idle

No workflow status has been published yet.
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 874 |
| Open PRs | 37 |
| Open items total | 911 |
| Reviewed files | 905 |
| Unreviewed open items | 6 |
| Archived closed files | 7 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 874 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 31 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 905 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 52/53 current (1 due, 98.1%) |
| Hourly hot item cadence (<7d) | 52/53 current (1 due, 98.1%) |
| Daily cadence coverage | 230/230 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 209/209 current (0 due, 100%) |
| Weekly older issue cadence | 622/622 current (0 due, 100%) |
| Due now by cadence | 7 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 07:00 UTC. Latest close: Apr 28, 2026, 05:18 UTC. Latest comment sync: Apr 28, 2026, 07:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 382 | 0 | 382 | 0 | 0 | 390 | 1 |
| Last 24 hours | 912 | 3 | 909 | 0 | 3 | 729 | 1 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1736](https://github.com/openclaw/clawhub/pull/1736) | Align hover stats with denormalized counters and fix seed digest stat drift | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1736.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1736.md) |
| [#1324](https://github.com/openclaw/clawhub/pull/1324) | feat: add --dry-run flag to package publish command | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1324.md) |
| [#1240](https://github.com/openclaw/clawhub/pull/1240) | fix: use esbuild minification for safari builds | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1240.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1240.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1860](https://github.com/openclaw/clawhub/pull/1860) | docs: document trademark takedown reports | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1860.md) | complete | Apr 28, 2026, 07:00 UTC |
| [#1859](https://github.com/openclaw/clawhub/pull/1859) | docs: clarify optional skill environment variables | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1859.md) | complete | Apr 28, 2026, 06:59 UTC |
| [#1858](https://github.com/openclaw/clawhub/pull/1858) | fix(ui): resolve relative skill README links | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1858.md) | complete | Apr 28, 2026, 06:57 UTC |
| [#1856](https://github.com/openclaw/clawhub/pull/1856) | fix(cli): preserve root skill manifest during publish | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1856.md) | complete | Apr 28, 2026, 06:56 UTC |
| [#1857](https://github.com/openclaw/clawhub/pull/1857) | fix(security): tighten crypto capability swap detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1857.md) | complete | Apr 28, 2026, 06:56 UTC |
| [#1854](https://github.com/openclaw/clawhub/pull/1854) | fix(ui): use download icon for public skill stats | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1854.md) | complete | Apr 28, 2026, 06:56 UTC |
| [#1855](https://github.com/openclaw/clawhub/pull/1855) | feat(cli): show skill moderation in inspect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1855.md) | complete | Apr 28, 2026, 06:56 UTC |
| [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) | complete | Apr 28, 2026, 06:48 UTC |
| [#1760](https://github.com/openclaw/clawhub/issues/1760) | Exposed production API credentials in archived skill (skills/akkualle/akkualle-seo/SKILL.md) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1760.md) | complete | Apr 28, 2026, 06:48 UTC |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1830.md) | complete | Apr 28, 2026, 06:48 UTC |

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
