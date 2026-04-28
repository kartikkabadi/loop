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

Last dashboard update: Apr 28, 2026, 22:10 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4395 |
| Open PRs | 3462 |
| Open items total | 7857 |
| Reviewed files | 7465 |
| Unreviewed open items | 392 |
| Due now by cadence | 2062 |
| Proposed closes awaiting apply | 8 |
| Closed by Codex apply | 10563 |
| Failed or stale reviews | 8 |
| Archived closed files | 13795 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6940 | 6555 | 385 | 2026 | 8 | 10560 | Apr 28, 2026, 22:08 UTC | Apr 28, 2026, 22:09 UTC | 32 |
| [ClawHub](https://github.com/openclaw/clawhub) | 917 | 910 | 7 | 36 | 0 | 3 | Apr 28, 2026, 21:50 UTC | Apr 28, 2026, 18:47 UTC | 5 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply in progress | Apr 28, 2026, 22:10 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25080243604) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake in progress | Apr 28, 2026, 22:09 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25080214846) |

### Fleet Activity

Latest review: Apr 28, 2026, 22:08 UTC. Latest close: Apr 28, 2026, 22:09 UTC. Latest comment sync: Apr 28, 2026, 22:09 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 203 | 11 | 192 | 1 | 3 | 12 | 2 |
| Last hour | 587 | 19 | 568 | 1 | 24 | 37 | 3 |
| Last 24 hours | 6190 | 352 | 5838 | 5 | 726 | 946 | 21 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73622](https://github.com/openclaw/openclaw/issues/73622) | [Bug]: agent can read BOOTSTRAP.md on clean install | closed externally after proposed_close | Apr 28, 2026, 22:09 UTC | [records/openclaw-openclaw/closed/73622.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73622.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73826](https://github.com/openclaw/openclaw/issues/73826) | [Feature]: Webchat: TTS MEDIA: audio attachments render as download cards — no inline audio player | already implemented on main | Apr 28, 2026, 22:08 UTC | [records/openclaw-openclaw/closed/73826.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73826.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73829](https://github.com/openclaw/openclaw/issues/73829) | Auto-compaction produces empty-content assistant messages that hard-kill sessions (Venice HTTP 400) | already implemented on main | Apr 28, 2026, 22:05 UTC | [records/openclaw-openclaw/closed/73829.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73829.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73824](https://github.com/openclaw/openclaw/issues/73824) | openclaw status does not show active Telegram channel because status command does not load plugin registry | already implemented on main | Apr 28, 2026, 21:55 UTC | [records/openclaw-openclaw/closed/73824.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73824.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73741](https://github.com/openclaw/openclaw/pull/73741) | test(ci): route plugin prerelease coverage to plugin shard | closed externally after review | Apr 28, 2026, 21:52 UTC | [records/openclaw-openclaw/closed/73741.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73741.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73819](https://github.com/openclaw/openclaw/issues/73819) | [Bug]: ESM import of chokidar fails in plugin runtime deps, causing embeddings \"not ready\ | already implemented on main | Apr 28, 2026, 21:48 UTC | [records/openclaw-openclaw/closed/73819.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73819.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73637](https://github.com/openclaw/openclaw/pull/73637) | fix(agents): preserve extraSystemPrompt under systemPromptOverride (#73624) | closed externally after review | Apr 28, 2026, 21:45 UTC | [records/openclaw-openclaw/closed/73637.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73637.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73815](https://github.com/openclaw/openclaw/issues/73815) | OPENCLAW_PLUGIN_STAGE_DIR with two paths: memory status fails on missing chokidar in second path | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73815.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73815.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73811](https://github.com/openclaw/openclaw/issues/73811) | [Bug]: sessions_spawn model parameter ignored due to write/read field mismatch | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73811.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73811.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73702](https://github.com/openclaw/openclaw/issues/73702) | sessions_send reply forwarding creates cross-session prompt-injection vector | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73702.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73702.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58808](https://github.com/openclaw/openclaw/pull/58808) | feat: pass requesterSenderId and senderIsOwner to ChannelAgentToolFactory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58808.md) | complete | Apr 28, 2026, 22:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69312](https://github.com/openclaw/openclaw/pull/69312) | fix: prevent MEDIA: false-positive extraction from indented code blocks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69312.md) | complete | Apr 28, 2026, 22:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67509](https://github.com/openclaw/openclaw/pull/67509) | fix: add root guard to prevent CLI execution as root (#67478) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67509.md) | complete | Apr 28, 2026, 22:07 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73831](https://github.com/openclaw/openclaw/issues/73831) | [Bug]: undici HTTP/2 hang on Windows extends from Telegram polling into the LLM model dispatcher (related to #66885) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73831.md) | complete | Apr 28, 2026, 22:06 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64731](https://github.com/openclaw/openclaw/pull/64731) | fix(telegram): show model fallback notices outside verbose mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64731.md) | complete | Apr 28, 2026, 22:05 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73830](https://github.com/openclaw/openclaw/pull/73830) | docs: add -s -- flags to curl\|bash install to prevent stdin consumption | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73830.md) | complete | Apr 28, 2026, 22:04 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73767](https://github.com/openclaw/openclaw/pull/73767) | [codex] Finalize RuntimePlan embedded-runner cleanup stack | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73767.md) | complete | Apr 28, 2026, 22:04 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51040](https://github.com/openclaw/openclaw/issues/51040) | Voice wake mode should respect selected session target in macOS app | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51040.md) | complete | Apr 28, 2026, 22:03 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73828](https://github.com/openclaw/openclaw/pull/73828) | feat(slack): wake on configured subteam mentions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73828.md) | complete | Apr 28, 2026, 22:02 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50584](https://github.com/openclaw/openclaw/pull/50584) | feat(hooks): add LLM synthesis mode and canonical daily file for session-memory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50584.md) | failed | Apr 28, 2026, 22:02 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 22:10 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 8 fresh all closes. Close reasons: all. Existing Codex automated review comments are updated in place when closing or when comment-only sync is stale by 7 day(s); checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=51345,51404,51691,52499,52632,52840,56370,66617.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25080243604](https://github.com/openclaw/clawsweeper/actions/runs/25080243604)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3518 |
| Open PRs | 3422 |
| Open items total | 6940 |
| Reviewed files | 6555 |
| Unreviewed open items | 385 |
| Archived closed files | 13784 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3337 |
| Proposed issue closes | 7 (0.2% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3210 |
| Proposed PR closes | 1 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6547 |
| Proposed closes awaiting apply | 8 (0.1% of fresh reviews) |
| Closed by Codex apply | 10560 |
| Failed or stale reviews | 8 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 77/852 current (775 due, 9%) |
| Hourly hot item cadence (<7d) | 77/852 current (775 due, 9%) |
| Daily cadence coverage | 3011/3876 current (865 due, 77.7%) |
| Daily PR cadence | 2231/2711 current (480 due, 82.3%) |
| Daily new issue cadence (<30d) | 780/1165 current (385 due, 67%) |
| Weekly older issue cadence | 1826/1827 current (1 due, 99.9%) |
| Due now by cadence | 2026 |

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

Latest review: Apr 28, 2026, 22:08 UTC. Latest close: Apr 28, 2026, 22:09 UTC. Latest comment sync: Apr 28, 2026, 22:09 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 203 | 11 | 192 | 1 | 3 | 12 | 2 |
| Last hour | 529 | 19 | 510 | 1 | 24 | 32 | 3 |
| Last 24 hours | 5269 | 349 | 4920 | 5 | 715 | 455 | 21 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73622](https://github.com/openclaw/openclaw/issues/73622) | [Bug]: agent can read BOOTSTRAP.md on clean install | closed externally after proposed_close | Apr 28, 2026, 22:09 UTC | [records/openclaw-openclaw/closed/73622.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73622.md) |
| [#73826](https://github.com/openclaw/openclaw/issues/73826) | [Feature]: Webchat: TTS MEDIA: audio attachments render as download cards — no inline audio player | already implemented on main | Apr 28, 2026, 22:08 UTC | [records/openclaw-openclaw/closed/73826.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73826.md) |
| [#73829](https://github.com/openclaw/openclaw/issues/73829) | Auto-compaction produces empty-content assistant messages that hard-kill sessions (Venice HTTP 400) | already implemented on main | Apr 28, 2026, 22:05 UTC | [records/openclaw-openclaw/closed/73829.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73829.md) |
| [#73824](https://github.com/openclaw/openclaw/issues/73824) | openclaw status does not show active Telegram channel because status command does not load plugin registry | already implemented on main | Apr 28, 2026, 21:55 UTC | [records/openclaw-openclaw/closed/73824.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73824.md) |
| [#73741](https://github.com/openclaw/openclaw/pull/73741) | test(ci): route plugin prerelease coverage to plugin shard | closed externally after review | Apr 28, 2026, 21:52 UTC | [records/openclaw-openclaw/closed/73741.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73741.md) |
| [#73819](https://github.com/openclaw/openclaw/issues/73819) | [Bug]: ESM import of chokidar fails in plugin runtime deps, causing embeddings \"not ready\ | already implemented on main | Apr 28, 2026, 21:48 UTC | [records/openclaw-openclaw/closed/73819.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73819.md) |
| [#73637](https://github.com/openclaw/openclaw/pull/73637) | fix(agents): preserve extraSystemPrompt under systemPromptOverride (#73624) | closed externally after review | Apr 28, 2026, 21:45 UTC | [records/openclaw-openclaw/closed/73637.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73637.md) |
| [#73815](https://github.com/openclaw/openclaw/issues/73815) | OPENCLAW_PLUGIN_STAGE_DIR with two paths: memory status fails on missing chokidar in second path | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73815.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73815.md) |
| [#73811](https://github.com/openclaw/openclaw/issues/73811) | [Bug]: sessions_spawn model parameter ignored due to write/read field mismatch | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73811.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73811.md) |
| [#73702](https://github.com/openclaw/openclaw/issues/73702) | sessions_send reply forwarding creates cross-session prompt-injection vector | already implemented on main | Apr 28, 2026, 21:41 UTC | [records/openclaw-openclaw/closed/73702.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73702.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#58808](https://github.com/openclaw/openclaw/pull/58808) | feat: pass requesterSenderId and senderIsOwner to ChannelAgentToolFactory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58808.md) | complete | Apr 28, 2026, 22:08 UTC |
| [#69312](https://github.com/openclaw/openclaw/pull/69312) | fix: prevent MEDIA: false-positive extraction from indented code blocks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69312.md) | complete | Apr 28, 2026, 22:08 UTC |
| [#67509](https://github.com/openclaw/openclaw/pull/67509) | fix: add root guard to prevent CLI execution as root (#67478) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67509.md) | complete | Apr 28, 2026, 22:07 UTC |
| [#73831](https://github.com/openclaw/openclaw/issues/73831) | [Bug]: undici HTTP/2 hang on Windows extends from Telegram polling into the LLM model dispatcher (related to #66885) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73831.md) | complete | Apr 28, 2026, 22:06 UTC |
| [#64731](https://github.com/openclaw/openclaw/pull/64731) | fix(telegram): show model fallback notices outside verbose mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64731.md) | complete | Apr 28, 2026, 22:05 UTC |
| [#73830](https://github.com/openclaw/openclaw/pull/73830) | docs: add -s -- flags to curl\|bash install to prevent stdin consumption | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73830.md) | complete | Apr 28, 2026, 22:04 UTC |
| [#73767](https://github.com/openclaw/openclaw/pull/73767) | [codex] Finalize RuntimePlan embedded-runner cleanup stack | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73767.md) | complete | Apr 28, 2026, 22:04 UTC |
| [#51040](https://github.com/openclaw/openclaw/issues/51040) | Voice wake mode should respect selected session target in macOS app | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51040.md) | complete | Apr 28, 2026, 22:03 UTC |
| [#73828](https://github.com/openclaw/openclaw/pull/73828) | feat(slack): wake on configured subteam mentions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73828.md) | complete | Apr 28, 2026, 22:02 UTC |
| [#50584](https://github.com/openclaw/openclaw/pull/50584) | feat(hooks): add LLM synthesis mode and canonical daily file for session-memory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50584.md) | failed | Apr 28, 2026, 22:02 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 22:09 UTC

State: Hot intake in progress

Hot intake planned 20 items across 20 shards. Capacity is 20 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25080214846](https://github.com/openclaw/clawsweeper/actions/runs/25080214846)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 877 |
| Open PRs | 40 |
| Open items total | 917 |
| Reviewed files | 910 |
| Unreviewed open items | 7 |
| Archived closed files | 11 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 876 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 910 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 25/54 current (29 due, 46.3%) |
| Hourly hot item cadence (<7d) | 25/54 current (29 due, 46.3%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 633/633 current (0 due, 100%) |
| Due now by cadence | 36 |

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

Latest review: Apr 28, 2026, 21:50 UTC. Latest close: Apr 28, 2026, 18:47 UTC. Latest comment sync: Apr 28, 2026, 21:51 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 58 | 0 | 58 | 0 | 0 | 5 | 0 |
| Last 24 hours | 921 | 3 | 918 | 0 | 11 | 491 | 0 |

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
| [#1011](https://github.com/openclaw/clawhub/issues/1011) | New Skill Submission: Manusilized - OpenClaw Supercharger | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1011.md) | complete | Apr 28, 2026, 21:50 UTC |
| [#1868](https://github.com/openclaw/clawhub/issues/1868) | False positive: skill felipematos/max-auth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1868.md) | complete | Apr 28, 2026, 21:46 UTC |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1869.md) | complete | Apr 28, 2026, 21:45 UTC |
| [#1866](https://github.com/openclaw/clawhub/issues/1866) | False positive: skill \"snaplii\" flagged for defensive security patterns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1866.md) | complete | Apr 28, 2026, 21:45 UTC |
| [#1867](https://github.com/openclaw/clawhub/pull/1867) | feat: Device Flow auth for headless environments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1867.md) | complete | Apr 28, 2026, 21:42 UTC |
| [#1806](https://github.com/openclaw/clawhub/pull/1806) | feat(cli): add per-skill pinning | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1806.md) | complete | Apr 28, 2026, 21:11 UTC |
| [#1838](https://github.com/openclaw/clawhub/issues/1838) | False positive: agentcloud skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1838.md) | complete | Apr 28, 2026, 21:11 UTC |
| [#1856](https://github.com/openclaw/clawhub/pull/1856) | fix(cli): preserve root skill manifest during publish | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1856.md) | complete | Apr 28, 2026, 21:11 UTC |
| [#1831](https://github.com/openclaw/clawhub/issues/1831) | Application to Remove adb-assistant & testcase-template | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1831.md) | complete | Apr 28, 2026, 21:11 UTC |
| [#1706](https://github.com/openclaw/clawhub/issues/1706) | Skill flagged as suspicious - GroupMe (groupme@1.0.1) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1706.md) | complete | Apr 28, 2026, 21:11 UTC |

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
