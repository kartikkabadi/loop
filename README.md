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

Last dashboard update: Apr 28, 2026, 10:53 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4406 |
| Open PRs | 3486 |
| Open items total | 7892 |
| Reviewed files | 7451 |
| Unreviewed open items | 441 |
| Due now by cadence | 3970 |
| Proposed closes awaiting apply | 1 |
| Closed by Codex apply | 10295 |
| Failed or stale reviews | 51 |
| Archived closed files | 13438 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6982 | 6548 | 434 | 3912 | 1 | 10292 | Apr 28, 2026, 10:41 UTC | Apr 28, 2026, 10:39 UTC | 15 |
| [ClawHub](https://github.com/openclaw/clawhub) | 910 | 903 | 7 | 58 | 0 | 3 | Apr 28, 2026, 10:42 UTC | Apr 28, 2026, 08:18 UTC | 611 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Hot intake in progress | Apr 28, 2026, 10:42 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25047553807) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 10:53 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25046382084) |

### Fleet Activity

Latest review: Apr 28, 2026, 10:42 UTC. Latest close: Apr 28, 2026, 10:39 UTC. Latest comment sync: Apr 28, 2026, 10:53 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 72 | 1 | 71 | 0 | 5 | 413 | 1 |
| Last hour | 417 | 1 | 416 | 2 | 20 | 626 | 1 |
| Last 24 hours | 2993 | 86 | 2907 | 10 | 387 | 1273 | 21 |

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
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63035](https://github.com/openclaw/openclaw/issues/63035) | [Bug]: `JSON.stringify` silently drops UUID keys from array-typed `pending.json`, breaking all device pairing | closed externally after review | Apr 28, 2026, 10:38 UTC | [records/openclaw-openclaw/closed/63035.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63035.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53482](https://github.com/openclaw/openclaw/issues/53482) | [Bug]: Gateway silently fails without warning when using legacy CLAWDBOT_* env variables | closed externally after review | Apr 28, 2026, 10:37 UTC | [records/openclaw-openclaw/closed/53482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53482.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70259](https://github.com/openclaw/openclaw/pull/70259) | gateway/chat: honor per-agent thinkingDefault in chat.history fallback | closed externally after review | Apr 28, 2026, 10:36 UTC | [records/openclaw-openclaw/closed/70259.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70259.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63418](https://github.com/openclaw/openclaw/pull/63418) | fix(gateway): align thinking defaults for sessions and history | kept open | Apr 28, 2026, 10:34 UTC | [records/openclaw-openclaw/closed/63418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63418.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58124](https://github.com/openclaw/openclaw/pull/58124) | feat: add GPU passthrough for Docker sandbox | closed externally after review | Apr 28, 2026, 10:34 UTC | [records/openclaw-openclaw/closed/58124.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58124.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57976](https://github.com/openclaw/openclaw/issues/57976) | feat: GPU passthrough for Docker sandbox | closed externally after review | Apr 28, 2026, 10:33 UTC | [records/openclaw-openclaw/closed/57976.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57976.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 28, 2026, 10:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73496](https://github.com/openclaw/openclaw/issues/73496) | [Bug]: Embedded runtime hangs after `embedded run start`, agent never produces reply (WhatsApp channel) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73496.md) | complete | Apr 28, 2026, 10:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73342](https://github.com/openclaw/openclaw/pull/73342) | refactor(memory-host): replace core runtime bridge with services | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73342.md) | complete | Apr 28, 2026, 10:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73497](https://github.com/openclaw/openclaw/pull/73497) | fix(plugins): regenerate bundled wrappers with correct specifier in staged runtime root | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73497.md) | complete | Apr 28, 2026, 10:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73486](https://github.com/openclaw/openclaw/pull/73486) | fix(gateway): defer pricing refresh until ready | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73486.md) | complete | Apr 28, 2026, 10:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73243](https://github.com/openclaw/openclaw/pull/73243) | fix(diagnostics): abort stuck sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73243.md) | complete | Apr 28, 2026, 10:49 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73264](https://github.com/openclaw/openclaw/pull/73264) | fix(security): prevent workspace PATH injection via service env and trash helpers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73264.md) | complete | Apr 28, 2026, 10:49 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72917](https://github.com/openclaw/openclaw/pull/72917) | fix(agents): canonicalize provider aliases in byProvider tool policy lookup [AI] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72917.md) | complete | Apr 28, 2026, 10:49 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73493](https://github.com/openclaw/openclaw/pull/73493) | fix(memory-core): retry dreaming cron startup reconciliation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73493.md) | complete | Apr 28, 2026, 10:48 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72921](https://github.com/openclaw/openclaw/pull/72921) | fix(agents): validate caller groupId against session context in resolveGroupToolPolicy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72921.md) | complete | Apr 28, 2026, 10:47 UTC |

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

State: Apply finished

Apply/comment-sync run finished with 0 fresh closes out of requested limit 2. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25048610259](https://github.com/openclaw/clawsweeper/actions/runs/25048610259)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3533 |
| Open PRs | 3449 |
| Open items total | 6982 |
| Reviewed files | 6548 |
| Unreviewed open items | 434 |
| Archived closed files | 13428 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3325 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3173 |
| Proposed PR closes | 1 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6498 |
| Proposed closes awaiting apply | 1 (0% of fresh reviews) |
| Closed by Codex apply | 10292 |
| Failed or stale reviews | 50 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 12/656 current (644 due, 1.8%) |
| Hourly hot item cadence (<7d) | 12/656 current (644 due, 1.8%) |
| Daily cadence coverage | 1230/4056 current (2826 due, 30.3%) |
| Daily PR cadence | 957/2812 current (1855 due, 34%) |
| Daily new issue cadence (<30d) | 273/1244 current (971 due, 21.9%) |
| Weekly older issue cadence | 1828/1836 current (8 due, 99.6%) |
| Due now by cadence | 3912 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 10:41 UTC. Latest close: Apr 28, 2026, 10:39 UTC. Latest comment sync: Apr 28, 2026, 10:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 6 | 1 | 5 | 0 | 5 | 10 | 1 |
| Last hour | 14 | 1 | 13 | 1 | 20 | 15 | 1 |
| Last 24 hours | 2080 | 83 | 1997 | 9 | 377 | 376 | 21 |

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
| [#63035](https://github.com/openclaw/openclaw/issues/63035) | [Bug]: `JSON.stringify` silently drops UUID keys from array-typed `pending.json`, breaking all device pairing | closed externally after review | Apr 28, 2026, 10:38 UTC | [records/openclaw-openclaw/closed/63035.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63035.md) |
| [#53482](https://github.com/openclaw/openclaw/issues/53482) | [Bug]: Gateway silently fails without warning when using legacy CLAWDBOT_* env variables | closed externally after review | Apr 28, 2026, 10:37 UTC | [records/openclaw-openclaw/closed/53482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53482.md) |
| [#70259](https://github.com/openclaw/openclaw/pull/70259) | gateway/chat: honor per-agent thinkingDefault in chat.history fallback | closed externally after review | Apr 28, 2026, 10:36 UTC | [records/openclaw-openclaw/closed/70259.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70259.md) |
| [#63418](https://github.com/openclaw/openclaw/pull/63418) | fix(gateway): align thinking defaults for sessions and history | kept open | Apr 28, 2026, 10:34 UTC | [records/openclaw-openclaw/closed/63418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63418.md) |
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

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 10:53 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 403. Item numbers: 503,568,581,604,647,651,655,656,664,679,683,692,694,700,707,711,712,713,716,717,731,733,737,745,752,755,756,758,761,762,767,768,770,779,780,784,786,791,794,798,800,804,807,808,809,817,819,823,834,838,850,851,852,853,854,858,860,862,863,867,868,878,880,881,883,887,888,889,895,896,897,900,901,903,904,905,906,907,911,915,920,923,925,928,930,933,935,937,940,941,951,954,960,963,966,967,969,970,971,972,974,975,984,985,987,988,990,992,993,994,995,997,998,999,1001,1003,1006,1010,1011,1015,1017,1018,1020,1024,1027,1028,1032,1033,1035,1037,1039,1040,1041,1043,1044,1045,1048,1049,1051,1052,1053,1054,1059,1063,1068,1072,1080,1085,1088,1089,1092,1094,1100,1103,1110,1114,1116,1119,1121,1122,1125,1129,1132,1133,1147,1148,1152,1153,1155,1156,1164,1168,1179,1180,1181,1186,1199,1201,1207,1212,1217,1228,1230,1233,1256,1275,1287,1292,1368,1370,1371,1374,1376,1377,1378,1379,1381,1382,1383,1384,1385,1387,1389,1391,1392,1393,1394,1395,1396,1397,1398,1400,1401,1402,1403,1404,1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1420,1421,1422,1423,1424,1425,1426,1427,1428,1430,1431,1432,1433,1434,1435,1437,1440,1442,1443,1444,1445,1446,1447,1448,1450,1451,1452,1457,1462,1463,1465,1471,1472,1473,1476,1477,1480,1483,1494,1495,1500,1501,1503,1509,1511,1514,1515,1516,1518,1519,1520,1521,1522,1523,1524,1525,1526,1528,1529,1530,1533,1534,1535,1538,1539,1540,1541,1542,1543,1551,1552,1553,1554,1557,1558,1559,1563,1565,1568,1569,1571,1572,1574,1575,1576,1577,1578,1580,1581,1582,1583,1584,1585,1586,1587,1588,1589,1591,1592,1594,1595,1614,1617,1620,1621,1624,1631,1632,1639,1649,1653,1654,1657,1658,1659,1662,1666,1667,1668,1669,1670,1671,1672,1673,1674,1675,1676,1677,1678,1679,1680,1681,1682,1683,1684,1685,1689,1690,1691,1692,1694,1695,1702,1703,1705,1706,1707,1710,1711,1712,1717,1718,1719,1720,1721,1725,1726,1733,1734,1735,1738,1741,1742,1743,1744,1745,1746,1747,1748,1749,1751,1755,1853.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25046382084](https://github.com/openclaw/clawsweeper/actions/runs/25046382084)
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

Latest review: Apr 28, 2026, 10:42 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 10:53 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 66 | 0 | 66 | 0 | 0 | 403 | 0 |
| Last hour | 403 | 0 | 403 | 1 | 0 | 611 | 0 |
| Last 24 hours | 913 | 3 | 910 | 1 | 10 | 897 | 0 |

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
