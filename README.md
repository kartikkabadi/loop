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

Last dashboard update: Apr 29, 2026, 01:09 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4399 |
| Open PRs | 3468 |
| Open items total | 7867 |
| Reviewed files | 7482 |
| Unreviewed open items | 385 |
| Due now by cadence | 2076 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 3 |
| Closed by Codex apply | 10604 |
| Failed or stale reviews | 19 |
| Archived closed files | 13860 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6951 | 6572 | 379 | 2024 | 0 | 3 | 10599 | Apr 29, 2026, 01:07 UTC | Apr 29, 2026, 01:07 UTC | 872 |
| [ClawHub](https://github.com/openclaw/clawhub) | 916 | 910 | 6 | 52 | 0 | 0 | 5 | Apr 29, 2026, 00:42 UTC | Apr 29, 2026, 00:32 UTC | 429 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply in progress | Apr 29, 2026, 01:09 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25085845608) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake in progress | Apr 29, 2026, 01:07 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25085826123) |

### Fleet Activity

Latest review: Apr 29, 2026, 01:07 UTC. Latest close: Apr 29, 2026, 01:07 UTC. Latest comment sync: Apr 29, 2026, 01:08 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 16 | 1 | 15 | 1 | 3 | 124 | 0 |
| Last hour | 629 | 9 | 620 | 13 | 14 | 1301 | 3 |
| Last 24 hours | 6477 | 385 | 6092 | 16 | 791 | 2280 | 27 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73885](https://github.com/openclaw/openclaw/issues/73885) | Feature: Implement Selenium/Puppeteer browser automation | belongs on ClawHub | Apr 29, 2026, 01:07 UTC | [records/openclaw-openclaw/closed/73885.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73885.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48220](https://github.com/openclaw/openclaw/issues/48220) | [Bug]: Looks like a gui bug in openclaw Dashboard. | already implemented on main | Apr 29, 2026, 01:07 UTC | [records/openclaw-openclaw/closed/48220.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48220.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73906](https://github.com/openclaw/openclaw/issues/73906) | [Bug]: Runtime context message leaked into assistant public reply and persisted to downstream LCM | already implemented on main | Apr 29, 2026, 01:06 UTC | [records/openclaw-openclaw/closed/73906.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73906.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73896](https://github.com/openclaw/openclaw/pull/73896) | feat(skills): add integration-notion skill for Notion setup | already closed before apply | Apr 29, 2026, 00:49 UTC | [records/openclaw-openclaw/closed/73896.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73896.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73893](https://github.com/openclaw/openclaw/pull/73893) | fix(gateway): honor configured image capability for provider models | already implemented on main | Apr 29, 2026, 00:48 UTC | [records/openclaw-openclaw/closed/73893.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73893.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65178](https://github.com/openclaw/openclaw/pull/65178) | fix: case-insensitive model lookup for image support resolution | closed externally after review | Apr 29, 2026, 00:43 UTC | [records/openclaw-openclaw/closed/65178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65178.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73851](https://github.com/openclaw/openclaw/pull/73851) | Fix heartbeat exec-event routing and Telegram thread retry coverage | closed externally after review | Apr 29, 2026, 00:40 UTC | [records/openclaw-openclaw/closed/73851.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73851.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62191](https://github.com/openclaw/openclaw/pull/62191) | fix(imessage): strip U+FFFD garbage chars from echo text key normalization | closed externally after review | Apr 29, 2026, 00:34 UTC | [records/openclaw-openclaw/closed/62191.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62191.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50479](https://github.com/openclaw/openclaw/pull/50479) | fix(install.sh): warn about .npmrc prefix override and sudo npm incom… | closed externally after review | Apr 29, 2026, 00:34 UTC | [records/openclaw-openclaw/closed/50479.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50479.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73872](https://github.com/openclaw/openclaw/pull/73872) | Route sensitive group commands to the owner privately | closed externally after review | Apr 29, 2026, 00:27 UTC | [records/openclaw-openclaw/closed/73872.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73872.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73879](https://github.com/openclaw/openclaw/issues/73879) | Heartbeat / cron / exec wakeups submit empty user prompt to model providers in 4.25, causing 400 INVALID_ARGUMENT on Vertex/Gemini | already implemented on main | Apr 29, 2026, 00:13 UTC | [records/openclaw-openclaw/closed/73879.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73879.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73905](https://github.com/openclaw/openclaw/issues/73905) | Feature: Configurable subagent notify policy for cron jobs | medium | candidate | Apr 29, 2026, 01:03 UTC | [records/openclaw-openclaw/items/73905.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73905.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73903](https://github.com/openclaw/openclaw/issues/73903) | openclaw doctor: Claude CLI section reports irrelevant info for non-Claude-CLI agents | medium | candidate | Apr 29, 2026, 01:01 UTC | [records/openclaw-openclaw/items/73903.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73903.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73898](https://github.com/openclaw/openclaw/issues/73898) | [Feature]: Control app option to auto-play assistant TTS audio | medium | candidate | Apr 29, 2026, 00:56 UTC | [records/openclaw-openclaw/items/73898.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73898.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73787](https://github.com/openclaw/openclaw/pull/73787) | fix(memory-lancedb): reject envelope metadata sludge from auto-capture and recall | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73787.md) | complete | Apr 29, 2026, 01:07 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73717](https://github.com/openclaw/openclaw/pull/73717) | fix(cli): canonicalize infer model run refs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73717.md) | complete | Apr 29, 2026, 01:06 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73894](https://github.com/openclaw/openclaw/pull/73894) | Add Control UI notification controls and web push test fixes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73894.md) | failed | Apr 29, 2026, 01:05 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73788](https://github.com/openclaw/openclaw/pull/73788) | feat(memory-lancedb): add memory_refresh tool for atomic replace and conflict preview | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73788.md) | complete | Apr 29, 2026, 01:05 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68280](https://github.com/openclaw/openclaw/pull/68280) | fix(gateway): fail fast on missing local probe auth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68280.md) | complete | Apr 29, 2026, 01:04 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73905](https://github.com/openclaw/openclaw/issues/73905) | Feature: Configurable subagent notify policy for cron jobs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73905.md) | complete | Apr 29, 2026, 01:03 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73904](https://github.com/openclaw/openclaw/pull/73904) | [AI-assisted] fix(agents): initialize context engines before subagent spawn prep | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73904.md) | complete | Apr 29, 2026, 01:01 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73823](https://github.com/openclaw/openclaw/pull/73823) | fix(whatsapp): gate pairing access-control on extractable inbound user content (#73797) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73823.md) | complete | Apr 29, 2026, 01:01 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73903](https://github.com/openclaw/openclaw/issues/73903) | openclaw doctor: Claude CLI section reports irrelevant info for non-Claude-CLI agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73903.md) | complete | Apr 29, 2026, 01:01 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73892](https://github.com/openclaw/openclaw/pull/73892) | fix(agents/process): honor AbortSignal in process.poll busy-wait loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73892.md) | complete | Apr 29, 2026, 01:01 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 01:09 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 2 fresh all closes. Close reasons: all. Existing Codex automated review comments are updated in place when closing or when comment-only sync is stale by 7 day(s); checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=48220,73885.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25085845608](https://github.com/openclaw/clawsweeper/actions/runs/25085845608)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3523 |
| Open PRs | 3428 |
| Open items total | 6951 |
| Reviewed files | 6572 |
| Unreviewed open items | 379 |
| Archived closed files | 13847 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3340 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3220 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6560 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 3 |
| Closed by Codex apply | 10599 |
| Failed or stale reviews | 12 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 78/895 current (817 due, 8.7%) |
| Hourly hot item cadence (<7d) | 78/895 current (817 due, 8.7%) |
| Daily cadence coverage | 3035/3860 current (825 due, 78.6%) |
| Daily PR cadence | 2257/2701 current (444 due, 83.6%) |
| Daily new issue cadence (<30d) | 778/1159 current (381 due, 67.1%) |
| Weekly older issue cadence | 1815/1818 current (3 due, 99.8%) |
| Due now by cadence | 2023 |

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

Latest review: Apr 29, 2026, 01:07 UTC. Latest close: Apr 29, 2026, 01:07 UTC. Latest comment sync: Apr 29, 2026, 01:08 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 16 | 1 | 15 | 1 | 3 | 124 | 0 |
| Last hour | 548 | 9 | 539 | 6 | 13 | 872 | 3 |
| Last 24 hours | 5552 | 382 | 5170 | 9 | 776 | 1438 | 27 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73885](https://github.com/openclaw/openclaw/issues/73885) | Feature: Implement Selenium/Puppeteer browser automation | belongs on ClawHub | Apr 29, 2026, 01:07 UTC | [records/openclaw-openclaw/closed/73885.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73885.md) |
| [#48220](https://github.com/openclaw/openclaw/issues/48220) | [Bug]: Looks like a gui bug in openclaw Dashboard. | already implemented on main | Apr 29, 2026, 01:07 UTC | [records/openclaw-openclaw/closed/48220.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48220.md) |
| [#73906](https://github.com/openclaw/openclaw/issues/73906) | [Bug]: Runtime context message leaked into assistant public reply and persisted to downstream LCM | already implemented on main | Apr 29, 2026, 01:06 UTC | [records/openclaw-openclaw/closed/73906.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73906.md) |
| [#73896](https://github.com/openclaw/openclaw/pull/73896) | feat(skills): add integration-notion skill for Notion setup | already closed before apply | Apr 29, 2026, 00:49 UTC | [records/openclaw-openclaw/closed/73896.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73896.md) |
| [#73893](https://github.com/openclaw/openclaw/pull/73893) | fix(gateway): honor configured image capability for provider models | already implemented on main | Apr 29, 2026, 00:48 UTC | [records/openclaw-openclaw/closed/73893.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73893.md) |
| [#65178](https://github.com/openclaw/openclaw/pull/65178) | fix: case-insensitive model lookup for image support resolution | closed externally after review | Apr 29, 2026, 00:43 UTC | [records/openclaw-openclaw/closed/65178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65178.md) |
| [#73851](https://github.com/openclaw/openclaw/pull/73851) | Fix heartbeat exec-event routing and Telegram thread retry coverage | closed externally after review | Apr 29, 2026, 00:40 UTC | [records/openclaw-openclaw/closed/73851.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73851.md) |
| [#62191](https://github.com/openclaw/openclaw/pull/62191) | fix(imessage): strip U+FFFD garbage chars from echo text key normalization | closed externally after review | Apr 29, 2026, 00:34 UTC | [records/openclaw-openclaw/closed/62191.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62191.md) |
| [#50479](https://github.com/openclaw/openclaw/pull/50479) | fix(install.sh): warn about .npmrc prefix override and sudo npm incom… | closed externally after review | Apr 29, 2026, 00:34 UTC | [records/openclaw-openclaw/closed/50479.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50479.md) |
| [#73872](https://github.com/openclaw/openclaw/pull/73872) | Route sensitive group commands to the owner privately | closed externally after review | Apr 29, 2026, 00:27 UTC | [records/openclaw-openclaw/closed/73872.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73872.md) |
| [#73879](https://github.com/openclaw/openclaw/issues/73879) | Heartbeat / cron / exec wakeups submit empty user prompt to model providers in 4.25, causing 400 INVALID_ARGUMENT on Vertex/Gemini | already implemented on main | Apr 29, 2026, 00:13 UTC | [records/openclaw-openclaw/closed/73879.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73879.md) |
| [#73881](https://github.com/openclaw/openclaw/issues/73881) | openclaw infer model run (without --gateway) hangs indefinitely on 4.26; same prompt completes immediately in 4.25 | already implemented on main | Apr 29, 2026, 00:13 UTC | [records/openclaw-openclaw/closed/73881.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73881.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#73905](https://github.com/openclaw/openclaw/issues/73905) | Feature: Configurable subagent notify policy for cron jobs | medium | candidate | Apr 29, 2026, 01:03 UTC | [records/openclaw-openclaw/items/73905.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73905.md) |
| [#73903](https://github.com/openclaw/openclaw/issues/73903) | openclaw doctor: Claude CLI section reports irrelevant info for non-Claude-CLI agents | medium | candidate | Apr 29, 2026, 01:01 UTC | [records/openclaw-openclaw/items/73903.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73903.md) |
| [#73898](https://github.com/openclaw/openclaw/issues/73898) | [Feature]: Control app option to auto-play assistant TTS audio | medium | candidate | Apr 29, 2026, 00:56 UTC | [records/openclaw-openclaw/items/73898.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73898.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73787](https://github.com/openclaw/openclaw/pull/73787) | fix(memory-lancedb): reject envelope metadata sludge from auto-capture and recall | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73787.md) | complete | Apr 29, 2026, 01:07 UTC |
| [#73717](https://github.com/openclaw/openclaw/pull/73717) | fix(cli): canonicalize infer model run refs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73717.md) | complete | Apr 29, 2026, 01:06 UTC |
| [#73894](https://github.com/openclaw/openclaw/pull/73894) | Add Control UI notification controls and web push test fixes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73894.md) | failed | Apr 29, 2026, 01:05 UTC |
| [#73788](https://github.com/openclaw/openclaw/pull/73788) | feat(memory-lancedb): add memory_refresh tool for atomic replace and conflict preview | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73788.md) | complete | Apr 29, 2026, 01:05 UTC |
| [#68280](https://github.com/openclaw/openclaw/pull/68280) | fix(gateway): fail fast on missing local probe auth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68280.md) | complete | Apr 29, 2026, 01:04 UTC |
| [#73905](https://github.com/openclaw/openclaw/issues/73905) | Feature: Configurable subagent notify policy for cron jobs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73905.md) | complete | Apr 29, 2026, 01:03 UTC |
| [#73904](https://github.com/openclaw/openclaw/pull/73904) | [AI-assisted] fix(agents): initialize context engines before subagent spawn prep | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73904.md) | complete | Apr 29, 2026, 01:01 UTC |
| [#73823](https://github.com/openclaw/openclaw/pull/73823) | fix(whatsapp): gate pairing access-control on extractable inbound user content (#73797) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73823.md) | complete | Apr 29, 2026, 01:01 UTC |
| [#73903](https://github.com/openclaw/openclaw/issues/73903) | openclaw doctor: Claude CLI section reports irrelevant info for non-Claude-CLI agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73903.md) | complete | Apr 29, 2026, 01:01 UTC |
| [#73892](https://github.com/openclaw/openclaw/pull/73892) | fix(agents/process): honor AbortSignal in process.poll busy-wait loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73892.md) | complete | Apr 29, 2026, 01:01 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 01:08 UTC

State: Audit finished

Refreshed README Audit Health from a full live openclaw/clawhub state audit. Normal review/apply dashboard heartbeats preserve this block without rerunning the audit scan.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25085857207](https://github.com/openclaw/clawsweeper/actions/runs/25085857207)
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
| Archived closed files | 15 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 869 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 903 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 0 |
| Closed by Codex apply | 5 |
| Failed or stale reviews | 7 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 15/54 current (39 due, 27.8%) |
| Hourly hot item cadence (<7d) | 15/54 current (39 due, 27.8%) |
| Daily cadence coverage | 221/222 current (1 due, 99.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 200/201 current (1 due, 99.5%) |
| Weekly older issue cadence | 628/634 current (6 due, 99.1%) |
| Due now by cadence | 52 |

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

Latest review: Apr 29, 2026, 00:42 UTC. Latest close: Apr 29, 2026, 00:32 UTC. Latest comment sync: Apr 29, 2026, 00:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 81 | 0 | 81 | 7 | 1 | 429 | 0 |
| Last 24 hours | 925 | 3 | 922 | 7 | 15 | 842 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |
| [#1699](https://github.com/openclaw/clawhub/issues/1699) | Plugin search returns 500, and plugin catalog breaks after page 2 | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/1699.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1699.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |  |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1874.md) | complete | Apr 29, 2026, 00:42 UTC |
| [#1589](https://github.com/openclaw/clawhub/issues/1589) | [Security] wechat-helper: unvalidated $MESSAGE passed directly to browser automation tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1589.md) | failed | Apr 29, 2026, 00:19 UTC |
| [#1860](https://github.com/openclaw/clawhub/pull/1860) | docs: document trademark takedown reports | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1860.md) | complete | Apr 29, 2026, 00:19 UTC |
| [#1228](https://github.com/openclaw/clawhub/issues/1228) | Theme toggle: re-enable switching between system, light, and dark modes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1228.md) | complete | Apr 29, 2026, 00:17 UTC |
| [#863](https://github.com/openclaw/clawhub/issues/863) | False positive security scan: bria-ai skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/863.md) | complete | Apr 29, 2026, 00:17 UTC |
| [#959](https://github.com/openclaw/clawhub/issues/959) | spider: skill has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/959.md) | complete | Apr 29, 2026, 00:17 UTC |
| [#914](https://github.com/openclaw/clawhub/issues/914) | False positive: zalo-agent skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/914.md) | complete | Apr 29, 2026, 00:16 UTC |
| [#642](https://github.com/openclaw/clawhub/issues/642) | False Positive — Skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/642.md) | complete | Apr 29, 2026, 00:16 UTC |
| [#782](https://github.com/openclaw/clawhub/issues/782) | False positive: clawsy flagged as suspicious — v0.9.35 is docs-only (zero executable code) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/782.md) | complete | Apr 29, 2026, 00:16 UTC |
| [#1063](https://github.com/openclaw/clawhub/issues/1063) | False positive: freeguard-setup skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1063.md) | complete | Apr 29, 2026, 00:16 UTC |

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
