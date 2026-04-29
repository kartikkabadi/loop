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

Last dashboard update: Apr 29, 2026, 02:01 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4407 |
| Open PRs | 3461 |
| Open items total | 7868 |
| Reviewed files | 7481 |
| Unreviewed open items | 387 |
| Due now by cadence | 2084 |
| Proposed closes awaiting apply | 1 |
| Work candidates awaiting promotion | 120 |
| Closed by Codex apply | 10610 |
| Failed or stale reviews | 26 |
| Archived closed files | 13892 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6952 | 6571 | 381 | 2044 | 1 | 102 | 10602 | Apr 29, 2026, 01:49 UTC | Apr 29, 2026, 01:42 UTC | 35 |
| [ClawHub](https://github.com/openclaw/clawhub) | 916 | 910 | 6 | 40 | 0 | 18 | 5 | Apr 29, 2026, 01:49 UTC | Apr 29, 2026, 01:22 UTC | 503 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 29, 2026, 01:49 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25086924387) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 02:01 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25085973133) |

### Fleet Activity

Latest review: Apr 29, 2026, 01:49 UTC. Latest close: Apr 29, 2026, 01:42 UTC. Latest comment sync: Apr 29, 2026, 02:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 47 | 0 | 47 | 3 | 0 | 506 | 0 |
| Last hour | 1036 | 5 | 1031 | 19 | 20 | 538 | 1 |
| Last 24 hours | 6492 | 388 | 6104 | 23 | 672 | 1803 | 28 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49879](https://github.com/openclaw/openclaw/issues/49879) | Feature: agents.defaults.responseUsage config key for global usage footer | duplicate or superseded | Apr 29, 2026, 02:00 UTC | [records/openclaw-openclaw/closed/49879.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49879.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58216](https://github.com/openclaw/openclaw/pull/58216) | fix(discord): suppress reconnect-exhausted error during health-monitor stale-socket restart | closed externally after review | Apr 29, 2026, 01:58 UTC | [records/openclaw-openclaw/closed/58216.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58216.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49569](https://github.com/openclaw/openclaw/pull/49569) | fix(telegram): retry setMyCommands on 429 rate-limit with retry_after backoff | closed externally after review | Apr 29, 2026, 01:58 UTC | [records/openclaw-openclaw/closed/49569.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49569.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64060](https://github.com/openclaw/openclaw/pull/64060) | fix: cron text payload silently ignores model override | closed externally after review | Apr 29, 2026, 01:58 UTC | [records/openclaw-openclaw/closed/64060.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64060.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55619](https://github.com/openclaw/openclaw/pull/55619) | fix(feishu): exponential backoff + PingInterval guard for WS reconnect | closed externally after review | Apr 29, 2026, 01:57 UTC | [records/openclaw-openclaw/closed/55619.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55619.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39703](https://github.com/openclaw/openclaw/pull/39703) | fix: use LRU eviction for cron schedule cache instead of FIFO | closed externally after review | Apr 29, 2026, 01:56 UTC | [records/openclaw-openclaw/closed/39703.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/39703.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49981](https://github.com/openclaw/openclaw/pull/49981) | memory: thread timeoutMs through remote embedding batch HTTP calls | closed externally after review | Apr 29, 2026, 01:55 UTC | [records/openclaw-openclaw/closed/49981.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49981.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50164](https://github.com/openclaw/openclaw/pull/50164) | fix(feishu): fallback to type=media when file download returns 502 | closed externally after review | Apr 29, 2026, 01:55 UTC | [records/openclaw-openclaw/closed/50164.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50164.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73453](https://github.com/openclaw/openclaw/pull/73453) | fix(whatsapp): detect group @mentions when self is in allowFrom (#49317) | closed externally after review | Apr 29, 2026, 01:54 UTC | [records/openclaw-openclaw/closed/73453.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73453.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73927](https://github.com/openclaw/openclaw/pull/73927) | [AI-assisted] fix(telegram): soft-fail benign delete errors | duplicate or superseded | Apr 29, 2026, 01:53 UTC | [records/openclaw-openclaw/closed/73927.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73927.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 01:46 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73926](https://github.com/openclaw/openclaw/issues/73926) | Bug: `/new` produces empty prompt → Anthropic API 400 \"messages: at least one message is required\ | high | candidate | Apr 29, 2026, 01:41 UTC | [records/openclaw-openclaw/items/73926.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73926.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1432](https://github.com/openclaw/clawhub/issues/1432) | False 'suspicious' flag: registry metadata not extracting openclaw.requires.env from published files | high | candidate | Apr 29, 2026, 01:21 UTC | [records/openclaw-clawhub/items/1432.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1432.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1521](https://github.com/openclaw/clawhub/issues/1521) | Embedding failed 500 error blocks skill publication + request to remove flagged versions | high | candidate | Apr 29, 2026, 01:19 UTC | [records/openclaw-clawhub/items/1521.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1521.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 01:19 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46899](https://github.com/openclaw/openclaw/issues/46899) | [Bug]: Cron Job Delivery Channel Mismatch - Telegram Configured but Feishu Used | high | candidate | Apr 29, 2026, 01:17 UTC | [records/openclaw-openclaw/items/46899.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46899.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 01:17 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#371](https://github.com/openclaw/clawhub/issues/371) | Add appeal link for VirusTotal false positives in UI | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/371.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/371.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73859](https://github.com/openclaw/openclaw/issues/73859) | [Bug]: Built-in plugins (minimax, google, talk-voice) fail with RangeError: Maximum call stack size exceeded on Windows | high | candidate | Apr 29, 2026, 01:13 UTC | [records/openclaw-openclaw/items/73859.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73859.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48514](https://github.com/openclaw/openclaw/issues/48514) | WebChat UI freezes and becomes unresponsive with accumulated session history | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/48514.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48514.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73865](https://github.com/openclaw/openclaw/issues/73865) | [Bug]: Gateway startup hangs indefinitely at pre-sidecar readiness path (never reaches 'ready') | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/73865.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73865.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41296](https://github.com/openclaw/openclaw/pull/41296) | fix(gateway): improve shutdown error visibility and add close timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41296.md) | complete | Apr 29, 2026, 01:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73942](https://github.com/openclaw/openclaw/pull/73942) | fix(imessage): normalize leading echoed text corruption | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73942.md) | complete | Apr 29, 2026, 01:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73939](https://github.com/openclaw/openclaw/issues/73939) | [v1.4.9] skills.entries custom fields rejected by schema validation at runtime | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73939.md) | complete | Apr 29, 2026, 01:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73438](https://github.com/openclaw/openclaw/pull/73438) | feat: add proxy validation command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73438.md) | complete | Apr 29, 2026, 01:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73935](https://github.com/openclaw/openclaw/pull/73935) | fix(amazon-bedrock): add modelContextWindowOverrides for per-model context window config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73935.md) | complete | Apr 29, 2026, 01:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73931](https://github.com/openclaw/openclaw/pull/73931) | [Slack] fix Slack action thread target normalization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73931.md) | complete | Apr 29, 2026, 01:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73932](https://github.com/openclaw/openclaw/pull/73932) | fix(cli): validate plugin ID before enabling | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73932.md) | complete | Apr 29, 2026, 01:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73930](https://github.com/openclaw/openclaw/pull/73930) | fix(agents): fail fast when openai-codex Responses receives empty messages (#73820) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73930.md) | complete | Apr 29, 2026, 01:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73334](https://github.com/openclaw/openclaw/pull/73334) | refactor(feishu): unify document link parsing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73334.md) | complete | Apr 29, 2026, 01:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73514](https://github.com/openclaw/openclaw/pull/73514) | fix(feishu): support form_value in card action callbacks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73514.md) | complete | Apr 29, 2026, 01:52 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 02:01 UTC

State: Apply finished

Apply/comment-sync run finished with 1 fresh closes out of requested limit 1. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25087175513](https://github.com/openclaw/clawsweeper/actions/runs/25087175513)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3531 |
| Open PRs | 3421 |
| Open items total | 6952 |
| Reviewed files | 6571 |
| Unreviewed open items | 381 |
| Archived closed files | 13863 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3344 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3213 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6557 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 102 |
| Closed by Codex apply | 10605 |
| Failed or stale reviews | 9 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 64/898 current (834 due, 7.1%) |
| Hourly hot item cadence (<7d) | 64/898 current (834 due, 7.1%) |
| Daily cadence coverage | 3028/3854 current (826 due, 78.6%) |
| Daily PR cadence | 2253/2696 current (443 due, 83.6%) |
| Daily new issue cadence (<30d) | 775/1158 current (383 due, 66.9%) |
| Weekly older issue cadence | 1816/1819 current (3 due, 99.8%) |
| Due now by cadence | 2044 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 29, 2026, 01:08 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72536,72537,72539`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6951 |
| Missing eligible open records | 218 |
| Missing maintainer-authored open records | 68 |
| Missing protected open records | 1 |
| Missing recently-created open records | 93 |
| Archived records that are open again | 0 |
| Stale item records | 2 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 4 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
| [#72527](https://github.com/openclaw/openclaw/issues/72527) | Missing eligible open | [Bug]: Downgrading from 2026.4.x to 2026.3.2 leaves openclaw.json in invalid/broken state with no warning | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 01:59 UTC. Latest close: Apr 29, 2026, 02:00 UTC. Latest comment sync: Apr 29, 2026, 02:00 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 6 | 0 |
| Last hour | 533 | 5 | 528 | 2 | 19 | 35 | 1 |
| Last 24 hours | 5566 | 385 | 5181 | 6 | 656 | 960 | 28 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#49879](https://github.com/openclaw/openclaw/issues/49879) | Feature: agents.defaults.responseUsage config key for global usage footer | duplicate or superseded | Apr 29, 2026, 02:00 UTC | [records/openclaw-openclaw/closed/49879.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49879.md) |
| [#58216](https://github.com/openclaw/openclaw/pull/58216) | fix(discord): suppress reconnect-exhausted error during health-monitor stale-socket restart | closed externally after review | Apr 29, 2026, 01:58 UTC | [records/openclaw-openclaw/closed/58216.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58216.md) |
| [#49569](https://github.com/openclaw/openclaw/pull/49569) | fix(telegram): retry setMyCommands on 429 rate-limit with retry_after backoff | closed externally after review | Apr 29, 2026, 01:58 UTC | [records/openclaw-openclaw/closed/49569.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49569.md) |
| [#64060](https://github.com/openclaw/openclaw/pull/64060) | fix: cron text payload silently ignores model override | closed externally after review | Apr 29, 2026, 01:58 UTC | [records/openclaw-openclaw/closed/64060.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64060.md) |
| [#55619](https://github.com/openclaw/openclaw/pull/55619) | fix(feishu): exponential backoff + PingInterval guard for WS reconnect | closed externally after review | Apr 29, 2026, 01:57 UTC | [records/openclaw-openclaw/closed/55619.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55619.md) |
| [#39703](https://github.com/openclaw/openclaw/pull/39703) | fix: use LRU eviction for cron schedule cache instead of FIFO | closed externally after review | Apr 29, 2026, 01:56 UTC | [records/openclaw-openclaw/closed/39703.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/39703.md) |
| [#49981](https://github.com/openclaw/openclaw/pull/49981) | memory: thread timeoutMs through remote embedding batch HTTP calls | closed externally after review | Apr 29, 2026, 01:55 UTC | [records/openclaw-openclaw/closed/49981.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49981.md) |
| [#50164](https://github.com/openclaw/openclaw/pull/50164) | fix(feishu): fallback to type=media when file download returns 502 | closed externally after review | Apr 29, 2026, 01:55 UTC | [records/openclaw-openclaw/closed/50164.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50164.md) |
| [#73453](https://github.com/openclaw/openclaw/pull/73453) | fix(whatsapp): detect group @mentions when self is in allowFrom (#49317) | closed externally after review | Apr 29, 2026, 01:54 UTC | [records/openclaw-openclaw/closed/73453.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73453.md) |
| [#73927](https://github.com/openclaw/openclaw/pull/73927) | [AI-assisted] fix(telegram): soft-fail benign delete errors | duplicate or superseded | Apr 29, 2026, 01:53 UTC | [records/openclaw-openclaw/closed/73927.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73927.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#73926](https://github.com/openclaw/openclaw/issues/73926) | Bug: `/new` produces empty prompt → Anthropic API 400 \"messages: at least one message is required\ | high | candidate | Apr 29, 2026, 01:41 UTC | [records/openclaw-openclaw/items/73926.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73926.md) |
| [#46899](https://github.com/openclaw/openclaw/issues/46899) | [Bug]: Cron Job Delivery Channel Mismatch - Telegram Configured but Feishu Used | high | candidate | Apr 29, 2026, 01:17 UTC | [records/openclaw-openclaw/items/46899.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46899.md) |
| [#73859](https://github.com/openclaw/openclaw/issues/73859) | [Bug]: Built-in plugins (minimax, google, talk-voice) fail with RangeError: Maximum call stack size exceeded on Windows | high | candidate | Apr 29, 2026, 01:13 UTC | [records/openclaw-openclaw/items/73859.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73859.md) |
| [#48514](https://github.com/openclaw/openclaw/issues/48514) | WebChat UI freezes and becomes unresponsive with accumulated session history | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/48514.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48514.md) |
| [#73865](https://github.com/openclaw/openclaw/issues/73865) | [Bug]: Gateway startup hangs indefinitely at pre-sidecar readiness path (never reaches 'ready') | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/73865.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73865.md) |
| [#49185](https://github.com/openclaw/openclaw/issues/49185) | [Feature]: Configurable maxRetries per provider for model API calls | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/49185.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49185.md) |
| [#73646](https://github.com/openclaw/openclaw/issues/73646) | [Bug]: `openclaw crestodian` exits 0 with \"needs interactive TTY\" error in non-TTY contexts; sibling subcommands correctly exit non-zero on the same input | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/73646.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73646.md) |
| [#72338](https://github.com/openclaw/openclaw/issues/72338) | Gateway CPU spin causes Telegram replies to stall and status probe to time out | high | candidate | Apr 29, 2026, 01:11 UTC | [records/openclaw-openclaw/items/72338.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72338.md) |
| [#49250](https://github.com/openclaw/openclaw/issues/49250) | [Feature] Handle prompt/heartbeat race conflicts without losing the prompt | high | candidate | Apr 29, 2026, 01:11 UTC | [records/openclaw-openclaw/items/49250.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49250.md) |
| [#47444](https://github.com/openclaw/openclaw/issues/47444) | Workflow responses leak internal <function_calls> scaffolding into user-visible chat | high | candidate | Apr 29, 2026, 01:11 UTC | [records/openclaw-openclaw/items/47444.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/47444.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#41296](https://github.com/openclaw/openclaw/pull/41296) | fix(gateway): improve shutdown error visibility and add close timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41296.md) | complete | Apr 29, 2026, 01:59 UTC |
| [#73942](https://github.com/openclaw/openclaw/pull/73942) | fix(imessage): normalize leading echoed text corruption | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73942.md) | complete | Apr 29, 2026, 01:59 UTC |
| [#73939](https://github.com/openclaw/openclaw/issues/73939) | [v1.4.9] skills.entries custom fields rejected by schema validation at runtime | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73939.md) | complete | Apr 29, 2026, 01:59 UTC |
| [#73438](https://github.com/openclaw/openclaw/pull/73438) | feat: add proxy validation command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73438.md) | complete | Apr 29, 2026, 01:58 UTC |
| [#73935](https://github.com/openclaw/openclaw/pull/73935) | fix(amazon-bedrock): add modelContextWindowOverrides for per-model context window config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73935.md) | complete | Apr 29, 2026, 01:58 UTC |
| [#73931](https://github.com/openclaw/openclaw/pull/73931) | [Slack] fix Slack action thread target normalization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73931.md) | complete | Apr 29, 2026, 01:56 UTC |
| [#73932](https://github.com/openclaw/openclaw/pull/73932) | fix(cli): validate plugin ID before enabling | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73932.md) | complete | Apr 29, 2026, 01:55 UTC |
| [#73930](https://github.com/openclaw/openclaw/pull/73930) | fix(agents): fail fast when openai-codex Responses receives empty messages (#73820) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73930.md) | complete | Apr 29, 2026, 01:55 UTC |
| [#73334](https://github.com/openclaw/openclaw/pull/73334) | refactor(feishu): unify document link parsing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73334.md) | complete | Apr 29, 2026, 01:55 UTC |
| [#73514](https://github.com/openclaw/openclaw/pull/73514) | fix(feishu): support form_value in card action callbacks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73514.md) | complete | Apr 29, 2026, 01:52 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 02:01 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 500. Item numbers: 3,15,17,18,23,26,32,33,48,49,51,52,60,62,72,77,79,84,88,96,97,100,102,115,117,120,127,128,129,131,151,156,162,169,170,171,173,174,178,184,192,205,208,211,224,225,226,227,228,231,234,237,238,243,256,268,275,277,284,290,314,323,328,329,330,337,348,349,353,364,367,369,371,373,374,378,380,385,388,390,397,420,423,425,443,450,454,455,463,484,487,488,494,501,509,532,535,553,567,576,579,600,609,615,657,661,668,677,702,723,740,772,786,798,888,905,982,988,997,1006,1008,1011,1015,1017,1021,1030,1032,1036,1037,1042,1046,1047,1050,1051,1052,1053,1058,1059,1061,1064,1070,1088,1097,1098,1099,1103,1106,1111,1113,1114,1116,1125,1126,1131,1138,1141,1145,1146,1159,1164,1167,1168,1205,1208,1210,1213,1219,1220,1223,1224,1226,1229,1230,1231,1233,1235,1236,1237,1239,1243,1244,1247,1248,1249,1250,1253,1254,1256,1257,1260,1261,1264,1265,1266,1267,1268,1269,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1282,1283,1285,1287,1288,1289,1292,1293,1294,1296,1298,1299,1300,1301,1302,1307,1308,1309,1310,1312,1313,1314,1315,1316,1318,1320,1325,1326,1327,1329,1334,1336,1338,1341,1345,1347,1350,1351,1353,1354,1358,1359,1361,1364,1366,1367,1368,1370,1371,1374,1376,1377,1378,1379,1381,1382,1383,1384,1385,1387,1389,1391,1392,1393,1394,1395,1396,1397,1400,1401,1402,1404,1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1420,1421,1422,1423,1424,1425,1426,1427,1428,1430,1431,1432,1433,1434,1435,1437,1440,1442,1443,1444,1445,1446,1447,1448,1450,1451,1452,1457,1462,1463,1465,1471,1472,1473,1476,1477,1480,1483,1494,1495,1500,1501,1503,1509,1511,1514,1515,1516,1518,1519,1520,1521,1522,1523,1524,1525,1526,1528,1529,1530,1533,1534,1535,1538,1539,1540,1541,1543,1551,1552,1554,1557,1558,1559,1563,1565,1568,1569,1571,1572,1574,1575,1576,1577,1578,1580,1582,1583,1584,1585,1586,1587,1588,1589,1592,1594,1595,1614,1617,1620,1621,1624,1631,1632,1639,1653,1654,1657,1658,1659,1662,1666,1667,1668,1669,1670,1671,1673,1674,1675,1676,1677,1678,1679,1680,1681,1682,1683,1684,1685,1689,1690,1691,1692,1694,1695,1702,1703,1705,1706,1707,1710,1711,1712,1717,1719,1720,1721,1725,1726,1733,1734,1735,1738,1741,1742,1744,1745,1746,1747,1748,1749,1755,1756,1757,1758,1760,1761,1764,1766,1767,1769,1770,1781,1785,1788,1798,1799,1806,1808,1811,1812,1813,1814,1816,1817,1826,1829,1831,1834,1838,1840,1848,1852,1853,1854,1855,1856,1858,1859,1862,1863,1864,1865,1866,1867,1868.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25085973133](https://github.com/openclaw/clawsweeper/actions/runs/25085973133)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 876 |
| Open PRs | 40 |
| Open items total | 916 |
| Reviewed files | 910 |
| Unreviewed open items | 6 |
| Archived closed files | 16 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 860 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 893 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 18 |
| Closed by Codex apply | 5 |
| Failed or stale reviews | 17 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 34/54 current (20 due, 63%) |
| Hourly hot item cadence (<7d) | 34/54 current (20 due, 63%) |
| Daily cadence coverage | 216/222 current (6 due, 97.3%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 195/201 current (6 due, 97%) |
| Weekly older issue cadence | 626/634 current (8 due, 98.7%) |
| Due now by cadence | 40 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 29, 2026, 01:08 UTC

Status: **Passing**

Targeted review input: _none_

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 916 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 6 |
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

Latest review: Apr 29, 2026, 01:49 UTC. Latest close: Apr 29, 2026, 01:22 UTC. Latest comment sync: Apr 29, 2026, 02:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 45 | 0 | 45 | 3 | 0 | 500 | 0 |
| Last hour | 503 | 0 | 503 | 17 | 1 | 503 | 0 |
| Last 24 hours | 926 | 3 | 923 | 17 | 16 | 843 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 01:46 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1432](https://github.com/openclaw/clawhub/issues/1432) | False 'suspicious' flag: registry metadata not extracting openclaw.requires.env from published files | high | candidate | Apr 29, 2026, 01:21 UTC | [records/openclaw-clawhub/items/1432.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1432.md) |
| [#1521](https://github.com/openclaw/clawhub/issues/1521) | Embedding failed 500 error blocks skill publication + request to remove flagged versions | high | candidate | Apr 29, 2026, 01:19 UTC | [records/openclaw-clawhub/items/1521.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1521.md) |
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 01:19 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 01:17 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |
| [#371](https://github.com/openclaw/clawhub/issues/371) | Add appeal link for VirusTotal false positives in UI | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/371.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/371.md) |
| [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1742](https://github.com/openclaw/clawhub/issues/1742) | False Positive Appeal -- hk-stock-morning-report flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1742.md) | complete | Apr 29, 2026, 01:49 UTC |
| [#1659](https://github.com/openclaw/clawhub/issues/1659) | My skill just disappeared, and I can't log in again. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1659.md) | complete | Apr 29, 2026, 01:49 UTC |
| [#1585](https://github.com/openclaw/clawhub/issues/1585) | Bc Calc flagged with 'suspicious patterns' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1585.md) | complete | Apr 29, 2026, 01:49 UTC |
| [#1557](https://github.com/openclaw/clawhub/issues/1557) | False positive: humanizer-de v1.1.2 flagged as suspicious (fs.readFileSync/writeFileSync for text correction) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1557.md) | complete | Apr 29, 2026, 01:49 UTC |
| [#1865](https://github.com/openclaw/clawhub/issues/1865) | [False Positive] Request to remove \"suspicious\" flag for skill: bitopro-skills-hub | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1865.md) | complete | Apr 29, 2026, 01:49 UTC |
| [#1684](https://github.com/openclaw/clawhub/issues/1684) | Search plugins but return Server Error | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1684.md) | complete | Apr 29, 2026, 01:49 UTC |
| [#1798](https://github.com/openclaw/clawhub/issues/1798) | False Positive: Skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1798.md) | complete | Apr 29, 2026, 01:49 UTC |
| [#1614](https://github.com/openclaw/clawhub/issues/1614) | Error when using Plugins search: Something went wrong Server Error | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1614.md) | complete | Apr 29, 2026, 01:49 UTC |
| [#1816](https://github.com/openclaw/clawhub/issues/1816) | False positive: mimotts25-plus flagged as SUSPICIOUS by AI scanner | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1816.md) | complete | Apr 29, 2026, 01:49 UTC |
| [#1769](https://github.com/openclaw/clawhub/issues/1769) | Review request: jettyd skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1769.md) | complete | Apr 29, 2026, 01:49 UTC |

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
