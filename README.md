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

Last dashboard update: Apr 28, 2026, 10:45 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4407 |
| Open PRs | 3488 |
| Open items total | 7895 |
| Reviewed files | 7444 |
| Unreviewed open items | 451 |
| Due now by cadence | 3965 |
| Proposed closes awaiting apply | 1 |
| Closed by Codex apply | 10295 |
| Failed or stale reviews | 51 |
| Archived closed files | 13437 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6985 | 6541 | 444 | 3906 | 1 | 10290 | Apr 28, 2026, 09:59 UTC | Apr 28, 2026, 10:39 UTC | 20 |
| [ClawHub](https://github.com/openclaw/clawhub) | 910 | 903 | 7 | 59 | 0 | 3 | Apr 28, 2026, 09:59 UTC | Apr 28, 2026, 08:18 UTC | 507 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review in progress | Apr 28, 2026, 10:45 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25046595038) |
| [ClawHub](https://github.com/openclaw/clawhub) | Apply throttled | Apr 28, 2026, 10:16 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25046846753) |

### Fleet Activity

Latest review: Apr 28, 2026, 09:59 UTC. Latest close: Apr 28, 2026, 10:39 UTC. Latest comment sync: Apr 28, 2026, 10:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 10 | 0 | 0 |
| Last hour | 399 | 2 | 397 | 1 | 21 | 527 | 0 |
| Last 24 hours | 2985 | 85 | 2900 | 10 | 397 | 1087 | 20 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67181](https://github.com/openclaw/openclaw/issues/67181) | [Bug] Discord async completion leaks internal resume-fallback message even when the command succeeds | closed externally after review | Apr 28, 2026, 10:39 UTC | [records/openclaw-openclaw/closed/67181.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/67181.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69916](https://github.com/openclaw/openclaw/issues/69916) | [Bug]: Telegram exec approvals ignore targets.accountId and fan out across all bot accounts | closed externally after review | Apr 28, 2026, 10:39 UTC | [records/openclaw-openclaw/closed/69916.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69916.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59162](https://github.com/openclaw/openclaw/issues/59162) | [Bug]: Telegram/mobile approvals can resolve as \"unknown or expired approval id\" after pending approval creation | closed externally after review | Apr 28, 2026, 10:38 UTC | [records/openclaw-openclaw/closed/59162.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59162.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71609](https://github.com/openclaw/openclaw/issues/71609) | Control UI device token mismatch loop after scope upgrade causes rate-limit lockout | closed externally after review | Apr 28, 2026, 10:38 UTC | [records/openclaw-openclaw/closed/71609.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71609.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63035](https://github.com/openclaw/openclaw/issues/63035) | [Bug]: `JSON.stringify` silently drops UUID keys from array-typed `pending.json`, breaking all device pairing | closed externally after review | Apr 28, 2026, 10:38 UTC | [records/openclaw-openclaw/closed/63035.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63035.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53482](https://github.com/openclaw/openclaw/issues/53482) | [Bug]: Gateway silently fails without warning when using legacy CLAWDBOT_* env variables | closed externally after review | Apr 28, 2026, 10:37 UTC | [records/openclaw-openclaw/closed/53482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53482.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70259](https://github.com/openclaw/openclaw/pull/70259) | gateway/chat: honor per-agent thinkingDefault in chat.history fallback | closed externally after review | Apr 28, 2026, 10:36 UTC | [records/openclaw-openclaw/closed/70259.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70259.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63418](https://github.com/openclaw/openclaw/pull/63418) | fix(gateway): align thinking defaults for sessions and history | closed externally after review | Apr 28, 2026, 10:34 UTC | [records/openclaw-openclaw/closed/63418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63418.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58124](https://github.com/openclaw/openclaw/pull/58124) | feat: add GPU passthrough for Docker sandbox | closed externally after review | Apr 28, 2026, 10:34 UTC | [records/openclaw-openclaw/closed/58124.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58124.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57976](https://github.com/openclaw/openclaw/issues/57976) | feat: GPU passthrough for Docker sandbox | closed externally after review | Apr 28, 2026, 10:33 UTC | [records/openclaw-openclaw/closed/57976.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57976.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1574](https://github.com/openclaw/clawhub/issues/1574) | clawhub explore --json returns empty items[] (authenticated, all sort modes) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1574.md) | complete | Apr 28, 2026, 10:42 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1576](https://github.com/openclaw/clawhub/issues/1576) | False positive: DCL Sentinel Trace flagged as Suspicious — webhook is the product, not a risk | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1576.md) | complete | Apr 28, 2026, 10:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1543](https://github.com/openclaw/clawhub/issues/1543) | False Positive Security Flag for VCF Log Insight Skill (vcf-loginsight-sddc-errors) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1543.md) | complete | Apr 28, 2026, 10:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1430](https://github.com/openclaw/clawhub/issues/1430) | Skill marked as suspicious: fnnas-download | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1430.md) | complete | Apr 28, 2026, 10:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1749](https://github.com/openclaw/clawhub/issues/1749) | False positive on skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1749.md) | complete | Apr 28, 2026, 10:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73476](https://github.com/openclaw/openclaw/pull/73476) | Feat/tool direct reply：feat(agents): add directReply flag to tool results for bypassing LLM inference | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73476.md) | complete | Apr 28, 2026, 10:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1428](https://github.com/openclaw/clawhub/issues/1428) | Credential Auditor Skill Incorrectly Flagged as Suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1428.md) | complete | Apr 28, 2026, 10:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1515](https://github.com/openclaw/clawhub/issues/1515) | Appeal: nebula-distill and valkyrie-distill falsely flagged as template spam | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1515.md) | complete | Apr 28, 2026, 10:41 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1586](https://github.com/openclaw/clawhub/issues/1586) | ClawHub Security flagged skill as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1586.md) | complete | Apr 28, 2026, 10:40 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1588](https://github.com/openclaw/clawhub/issues/1588) | False positive ban — `guytogay` account locked after legitimate skill publish | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1588.md) | complete | Apr 28, 2026, 10:40 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 10:45 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25046595038](https://github.com/openclaw/clawsweeper/actions/runs/25046595038)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3534 |
| Open PRs | 3451 |
| Open items total | 6985 |
| Reviewed files | 6541 |
| Unreviewed open items | 444 |
| Archived closed files | 13427 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3325 |
| Proposed issue closes | 1 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3166 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6491 |
| Proposed closes awaiting apply | 1 (0% of fresh reviews) |
| Closed by Codex apply | 10292 |
| Failed or stale reviews | 50 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 21/649 current (628 due, 3.2%) |
| Hourly hot item cadence (<7d) | 21/649 current (628 due, 3.2%) |
| Daily cadence coverage | 1230/4056 current (2826 due, 30.3%) |
| Daily PR cadence | 957/2812 current (1855 due, 34%) |
| Daily new issue cadence (<30d) | 273/1244 current (971 due, 21.9%) |
| Weekly older issue cadence | 1828/1836 current (8 due, 99.6%) |
| Due now by cadence | 3906 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 09:59 UTC. Latest close: Apr 28, 2026, 10:39 UTC. Latest comment sync: Apr 28, 2026, 10:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 10 | 0 | 0 |
| Last hour | 379 | 2 | 377 | 1 | 21 | 20 | 0 |
| Last 24 hours | 2072 | 82 | 1990 | 9 | 387 | 383 | 20 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#67181](https://github.com/openclaw/openclaw/issues/67181) | [Bug] Discord async completion leaks internal resume-fallback message even when the command succeeds | closed externally after review | Apr 28, 2026, 10:39 UTC | [records/openclaw-openclaw/closed/67181.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/67181.md) |
| [#69916](https://github.com/openclaw/openclaw/issues/69916) | [Bug]: Telegram exec approvals ignore targets.accountId and fan out across all bot accounts | closed externally after review | Apr 28, 2026, 10:39 UTC | [records/openclaw-openclaw/closed/69916.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69916.md) |
| [#59162](https://github.com/openclaw/openclaw/issues/59162) | [Bug]: Telegram/mobile approvals can resolve as \"unknown or expired approval id\" after pending approval creation | closed externally after review | Apr 28, 2026, 10:38 UTC | [records/openclaw-openclaw/closed/59162.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59162.md) |
| [#71609](https://github.com/openclaw/openclaw/issues/71609) | Control UI device token mismatch loop after scope upgrade causes rate-limit lockout | closed externally after review | Apr 28, 2026, 10:38 UTC | [records/openclaw-openclaw/closed/71609.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71609.md) |
| [#63035](https://github.com/openclaw/openclaw/issues/63035) | [Bug]: `JSON.stringify` silently drops UUID keys from array-typed `pending.json`, breaking all device pairing | closed externally after review | Apr 28, 2026, 10:38 UTC | [records/openclaw-openclaw/closed/63035.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63035.md) |
| [#53482](https://github.com/openclaw/openclaw/issues/53482) | [Bug]: Gateway silently fails without warning when using legacy CLAWDBOT_* env variables | closed externally after review | Apr 28, 2026, 10:37 UTC | [records/openclaw-openclaw/closed/53482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53482.md) |
| [#70259](https://github.com/openclaw/openclaw/pull/70259) | gateway/chat: honor per-agent thinkingDefault in chat.history fallback | closed externally after review | Apr 28, 2026, 10:36 UTC | [records/openclaw-openclaw/closed/70259.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70259.md) |
| [#63418](https://github.com/openclaw/openclaw/pull/63418) | fix(gateway): align thinking defaults for sessions and history | closed externally after review | Apr 28, 2026, 10:34 UTC | [records/openclaw-openclaw/closed/63418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63418.md) |
| [#58124](https://github.com/openclaw/openclaw/pull/58124) | feat: add GPU passthrough for Docker sandbox | closed externally after review | Apr 28, 2026, 10:34 UTC | [records/openclaw-openclaw/closed/58124.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58124.md) |
| [#57976](https://github.com/openclaw/openclaw/issues/57976) | feat: GPU passthrough for Docker sandbox | closed externally after review | Apr 28, 2026, 10:33 UTC | [records/openclaw-openclaw/closed/57976.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57976.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73476](https://github.com/openclaw/openclaw/pull/73476) | Feat/tool direct reply：feat(agents): add directReply flag to tool results for bypassing LLM inference | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73476.md) | complete | Apr 28, 2026, 10:41 UTC |
| [#73492](https://github.com/openclaw/openclaw/pull/73492) | feat: expose sessionId and sessionKey to provider createStreamFn plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73492.md) | complete | Apr 28, 2026, 10:40 UTC |
| [#73483](https://github.com/openclaw/openclaw/pull/73483) | fix(message): preserve asVoice on shared sends | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73483.md) | complete | Apr 28, 2026, 10:40 UTC |
| [#73490](https://github.com/openclaw/openclaw/pull/73490) | fix: sanitize subprocess call in DebugHandler.kt | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73490.md) | complete | Apr 28, 2026, 10:38 UTC |
| [#71820](https://github.com/openclaw/openclaw/pull/71820) | feat(bluebubbles): add reply-context API fallback for cache misses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71820.md) | complete | Apr 28, 2026, 10:38 UTC |
| [#73466](https://github.com/openclaw/openclaw/pull/73466) | fix(ui): stop Google Live browser audio on interruption | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73466.md) | complete | Apr 28, 2026, 10:38 UTC |
| [#73489](https://github.com/openclaw/openclaw/pull/73489) | fix(signal): harden signal-cli archive download with SSRF guard, timeout, and size cap (#54153) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73489.md) | complete | Apr 28, 2026, 10:37 UTC |
| [#73159](https://github.com/openclaw/openclaw/pull/73159) | Add tool-call failure guardrails | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73159.md) | complete | Apr 28, 2026, 10:37 UTC |
| [#73451](https://github.com/openclaw/openclaw/pull/73451) | fix(media): fallback to original buffer when image optimization fails | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73451.md) | complete | Apr 28, 2026, 10:02 UTC |
| [#71156](https://github.com/openclaw/openclaw/pull/71156) | docs: add AGENTS.md for secrets and pairing high-privilege zones | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71156.md) | failed | Apr 28, 2026, 09:59 UTC |
| [#72762](https://github.com/openclaw/openclaw/pull/72762) | docs: Add a note regarding the unreadable QR code caused by font limi… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72762.md) | complete | Apr 28, 2026, 09:56 UTC |
| [#73469](https://github.com/openclaw/openclaw/issues/73469) | Streaming cards don't send @mention notifications when agent writes <at> tags in text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73469.md) | complete | Apr 28, 2026, 09:56 UTC |
| [#73470](https://github.com/openclaw/openclaw/issues/73470) | Feature: Mandatory completeness scan guardrail for read/search operations | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73470.md) | complete | Apr 28, 2026, 09:54 UTC |
| [#67244](https://github.com/openclaw/openclaw/issues/67244) | Explicit ACP agent runs: embedded backend visibility failure and stale final JSON state after sessions_yield | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67244.md) | complete | Apr 28, 2026, 09:53 UTC |
| [#67509](https://github.com/openclaw/openclaw/pull/67509) | fix: add root guard to prevent CLI execution as root (#67478) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67509.md) | complete | Apr 28, 2026, 09:52 UTC |
| [#53745](https://github.com/openclaw/openclaw/issues/53745) | Gateway freezes after nested subagent activity, stops all Telegram polling | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53745.md) | complete | Apr 28, 2026, 09:52 UTC |
| [#67472](https://github.com/openclaw/openclaw/pull/67472) | fix(backup): gracefully skip session files deleted during backup create | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67472.md) | complete | Apr 28, 2026, 09:52 UTC |
| [#67394](https://github.com/openclaw/openclaw/issues/67394) | [Bug]: WhatsApp group auto-reply silently fails — agent reply generates but never delivers to WhatsApp group | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67394.md) | complete | Apr 28, 2026, 09:52 UTC |
| [#65914](https://github.com/openclaw/openclaw/pull/65914) | fix(memory): respect qmd status timeout and skip checkpoint exports | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65914.md) | complete | Apr 28, 2026, 09:52 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 10:16 UTC

State: Apply throttled

GitHub throttled while applying close decisions. Last throttled command: `gh api repos/openclaw/clawhub/issues?state=open&sort=created&direction=asc&per_page=100&page=1`. Retry 5/11 in 480s.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25046846753](https://github.com/openclaw/clawsweeper/actions/runs/25046846753)
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
| Hourly cadence coverage | 0/51 current (51 due, 0%) |
| Hourly hot item cadence (<7d) | 0/51 current (51 due, 0%) |
| Daily cadence coverage | 225/225 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 204/204 current (0 due, 100%) |
| Weekly older issue cadence | 626/627 current (1 due, 99.8%) |
| Due now by cadence | 59 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 10:42 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 09:58 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 20 | 0 | 20 | 0 | 0 | 507 | 0 |
| Last 24 hours | 913 | 3 | 910 | 1 | 10 | 704 | 0 |

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
| [#1574](https://github.com/openclaw/clawhub/issues/1574) | clawhub explore --json returns empty items[] (authenticated, all sort modes) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1574.md) | complete | Apr 28, 2026, 10:42 UTC |
| [#1576](https://github.com/openclaw/clawhub/issues/1576) | False positive: DCL Sentinel Trace flagged as Suspicious — webhook is the product, not a risk | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1576.md) | complete | Apr 28, 2026, 10:41 UTC |
| [#1543](https://github.com/openclaw/clawhub/issues/1543) | False Positive Security Flag for VCF Log Insight Skill (vcf-loginsight-sddc-errors) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1543.md) | complete | Apr 28, 2026, 10:41 UTC |
| [#1430](https://github.com/openclaw/clawhub/issues/1430) | Skill marked as suspicious: fnnas-download | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1430.md) | complete | Apr 28, 2026, 10:41 UTC |
| [#1749](https://github.com/openclaw/clawhub/issues/1749) | False positive on skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1749.md) | complete | Apr 28, 2026, 10:41 UTC |
| [#1428](https://github.com/openclaw/clawhub/issues/1428) | Credential Auditor Skill Incorrectly Flagged as Suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1428.md) | complete | Apr 28, 2026, 10:41 UTC |
| [#1515](https://github.com/openclaw/clawhub/issues/1515) | Appeal: nebula-distill and valkyrie-distill falsely flagged as template spam | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1515.md) | complete | Apr 28, 2026, 10:41 UTC |
| [#1586](https://github.com/openclaw/clawhub/issues/1586) | ClawHub Security flagged skill as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1586.md) | complete | Apr 28, 2026, 10:40 UTC |
| [#1588](https://github.com/openclaw/clawhub/issues/1588) | False positive ban — `guytogay` account locked after legitimate skill publish | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1588.md) | complete | Apr 28, 2026, 10:40 UTC |
| [#1569](https://github.com/openclaw/clawhub/issues/1569) | How can I transfer \"personal skills\" to \"organization skills\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1569.md) | complete | Apr 28, 2026, 10:40 UTC |

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
