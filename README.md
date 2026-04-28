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

Last dashboard update: Apr 28, 2026, 22:59 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4391 |
| Open PRs | 3462 |
| Open items total | 7853 |
| Reviewed files | 7463 |
| Unreviewed open items | 390 |
| Due now by cadence | 2093 |
| Proposed closes awaiting apply | 4 |
| Closed by Codex apply | 10575 |
| Failed or stale reviews | 10 |
| Archived closed files | 13811 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6937 | 6554 | 383 | 2033 | 4 | 10572 | Apr 28, 2026, 22:45 UTC | Apr 28, 2026, 22:45 UTC | 918 |
| [ClawHub](https://github.com/openclaw/clawhub) | 916 | 909 | 7 | 60 | 0 | 3 | Apr 28, 2026, 22:36 UTC | Apr 28, 2026, 22:18 UTC | 40 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 22:59 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25080654372) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 28, 2026, 22:41 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25081399336) |

### Fleet Activity

Latest review: Apr 28, 2026, 22:45 UTC. Latest close: Apr 28, 2026, 22:45 UTC. Latest comment sync: Apr 28, 2026, 22:59 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 1 | 486 | 2 |
| Last hour | 583 | 15 | 568 | 3 | 19 | 958 | 5 |
| Last 24 hours | 6206 | 362 | 5844 | 7 | 742 | 1790 | 24 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73816](https://github.com/openclaw/openclaw/issues/73816) | [Bug] Cron job reports status 'ok' immediately after sessions_yield, before subagent completes | duplicate or superseded | Apr 28, 2026, 22:53 UTC | [records/openclaw-openclaw/closed/73816.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73816.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73705](https://github.com/openclaw/openclaw/issues/73705) | [Bug]: 2026.4.25+ macOS startup hot loop / 100% CPU in bundled plugin path | already implemented on main | Apr 28, 2026, 22:53 UTC | [records/openclaw-openclaw/closed/73705.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73705.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49080](https://github.com/openclaw/openclaw/issues/49080) | Live channel sessions keep stale policy context after durable rule changes | already implemented on main | Apr 28, 2026, 22:53 UTC | [records/openclaw-openclaw/closed/49080.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49080.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#23718](https://github.com/openclaw/openclaw/issues/23718) | [Feature]: Fallback chain support for heartbeat.model | duplicate or superseded | Apr 28, 2026, 22:53 UTC | [records/openclaw-openclaw/closed/23718.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/23718.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55518](https://github.com/openclaw/openclaw/pull/55518) | feat(docker): add OPENCLAW_SKIP_ONBOARDING env to skip onboarding during Docker setup | closed externally after review | Apr 28, 2026, 22:50 UTC | [records/openclaw-openclaw/closed/55518.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55518.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51282](https://github.com/openclaw/openclaw/pull/51282) | feat(gateway): make handshake timeout configurable via gateway.handshakeTimeoutMs | closed externally after review | Apr 28, 2026, 22:50 UTC | [records/openclaw-openclaw/closed/51282.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51282.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73776](https://github.com/openclaw/openclaw/pull/73776) | fix(cli): make crestodian exit non-zero on no-TTY (#73646) | closed externally after review | Apr 28, 2026, 22:45 UTC | [records/openclaw-openclaw/closed/73776.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73776.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73175](https://github.com/openclaw/openclaw/pull/73175) | Plugins: list Kudosity SMS in community plugins | belongs on ClawHub | Apr 28, 2026, 22:38 UTC | [records/openclaw-openclaw/closed/73175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73175.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73838](https://github.com/openclaw/openclaw/issues/73838) | [Bug]: Control UI intermittently loses webchat state and renders NO_REPLY as NO | already implemented on main | Apr 28, 2026, 22:35 UTC | [records/openclaw-openclaw/closed/73838.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73838.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71069](https://github.com/openclaw/openclaw/issues/71069) | [Bug]: Gemma4-26b-a4-it-gguf override is rejected and reverts to gpt-4o | closed externally after review | Apr 28, 2026, 22:33 UTC | [records/openclaw-openclaw/closed/71069.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71069.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73844](https://github.com/openclaw/openclaw/pull/73844) | fix(failover): improve internal server error classification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73844.md) | complete | Apr 28, 2026, 22:45 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73710](https://github.com/openclaw/openclaw/pull/73710) | feat(chat/ios): inline image resize + EXIF metadata strip for attachments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73710.md) | complete | Apr 28, 2026, 22:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73843](https://github.com/openclaw/openclaw/pull/73843) | feat(rls): add weekly Supabase RLS leak scanner | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73843.md) | complete | Apr 28, 2026, 22:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73609](https://github.com/openclaw/openclaw/issues/73609) | ACPX stale child session can respawn and inject old task output into Telegram thread | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73609.md) | failed | Apr 28, 2026, 22:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48265](https://github.com/openclaw/openclaw/pull/48265) | feat: [[SPLIT]] directive + @mention context enrichment | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48265.md) | complete | Apr 28, 2026, 22:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73842](https://github.com/openclaw/openclaw/pull/73842) | feat(runpr): add weekly outreach automation pipeline | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73842.md) | complete | Apr 28, 2026, 22:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73648](https://github.com/openclaw/openclaw/pull/73648) | fix(channels): release zombie task on stopChannel timeout (#71412) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73648.md) | complete | Apr 28, 2026, 22:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49791](https://github.com/openclaw/openclaw/issues/49791) | Feishu group chat: @Bot /think medium is normalized correctly but returns no reply, while the same command works in p2p | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49791.md) | complete | Apr 28, 2026, 22:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73841](https://github.com/openclaw/openclaw/pull/73841) | fix(gateway): align dedupe eviction with entry timestamp | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73841.md) | complete | Apr 28, 2026, 22:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73840](https://github.com/openclaw/openclaw/pull/73840) | test(ci): add kitchen-sink npm plugin prerelease lane | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73840.md) | complete | Apr 28, 2026, 22:42 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 22:59 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 484. Item numbers: 6457,7057,12678,13597,13962,13968,14376,14593,15022,15032,15591,15634,15840,16351,16711,17098,17217,17311,17424,17684,18160,18860,18915,19328,19330,19362,19482,20802,23096,23718,24754,25222,25295,25789,26772,27771,29387,30142,30529,30828,31407,32296,32558,33724,33845,33975,34528,34542,34581,35119,35241,36614,36630,37446,37625,37656,37746,37804,37841,37842,37902,38161,38162,38237,38302,38327,38420,38439,38467,38502,38789,38808,38836,38876,38991,39102,39115,39127,39137,39244,39245,39284,39317,39322,39323,39349,39350,39428,39476,39485,39487,39489,39496,39497,39498,39520,39523,39528,39555,39558,39565,39566,39568,39569,39581,39583,39588,39589,39597,39599,39602,39604,39653,39683,39692,39703,39715,39726,39745,39766,39772,39806,39825,39826,39891,39923,39957,39982,39999,40009,40044,40067,40155,40165,40194,40209,40215,40230,40247,40252,40277,40287,40366,40387,40392,40402,40423,40463,40472,40522,40560,40611,40641,40673,40694,40716,40744,40829,40874,40875,40877,40878,40982,41025,41058,41082,41088,41111,41120,41135,41168,41195,41199,41259,41265,41272,41296,41299,41304,41306,41346,41355,41366,41372,41398,41410,41418,41444,41461,41483,41494,41495,41501,41517,41548,41555,41572,41583,41588,41594,41608,41609,41619,41624,41649,41651,41657,41670,41671,41685,41718,41722,41740,41744,41803,41833,41837,41858,41879,41882,41892,41897,41899,41933,41940,41954,41957,41965,41983,41986,42001,42007,42011,42014,42039,42052,42065,42079,42099,42106,42156,42174,42196,42201,42243,42252,42258,42259,42271,42303,42304,42327,42330,42391,42592,42631,42636,42637,42675,42690,42820,42904,42961,43068,43117,43367,45003,45662,45902,46641,46647,46810,46830,46899,46919,46935,46938,47167,47444,47496,47561,47591,47805,47811,47849,47852,47865,47884,47887,47941,47951,47979,48042,48082,48104,48138,48159,48179,48220,48229,48241,48253,48279,48304,48306,48321,48338,48368,48377,48379,48404,48435,48442,48450,48466,48471,48488,48503,48514,48516,48517,48519,48520,48532,48534,48556,48573,48579,48580,48620,48623,48628,48641,48671,48680,48708,48711,48788,48810,48834,48867,48874,48887,48897,48902,48915,48918,48942,48946,48947,48949,48979,49010,49012,49019,49028,49036,49046,49055,49063,49069,49077,49078,49080,49086,49104,49157,49162,49166,49175,49178,49183,49185,49190,49205,49223,49225,49250,49251,49257,49259,49273,49286,49310,49315,49317,49350,49376,49380,49381,49408,49409,49423,49502,49507,49517,49523,49524,49550,49567,49574,49577,49591,49599,49603,49609,49665,49704,49708,49740,49747,49763,49776,49788,49791,49793,49800,49804,49828,49841,49855,49864,49876,49879,49889,49909,49915,49918,50584,50621,51208,51333,51596,52497,53821,53822,54646,55886,56394,59382,60773,61610,62164,68596,69022,70993,71856,72115,72276,72338,72866,72950,73465,73506,73533,73586,73594,73609,73620,73638,73639,73643,73646,73648,73655,73668,73699,73700,73705,73710,73717,73738,73740,73743,73746,73747,73753,73754,73755,73756,73757,73785,73792,73793,73794,73795,73796,73797,73798,73799,73800,73801,73802,73812,73813,73814,73816,73817,73820,73823.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25080654372](https://github.com/openclaw/clawsweeper/actions/runs/25080654372)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3514 |
| Open PRs | 3423 |
| Open items total | 6937 |
| Reviewed files | 6554 |
| Unreviewed open items | 383 |
| Archived closed files | 13799 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3331 |
| Proposed issue closes | 4 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3213 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6544 |
| Proposed closes awaiting apply | 4 (0.1% of fresh reviews) |
| Closed by Codex apply | 10572 |
| Failed or stale reviews | 10 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 74/857 current (783 due, 8.6%) |
| Hourly hot item cadence (<7d) | 74/857 current (783 due, 8.6%) |
| Daily cadence coverage | 3011/3876 current (865 due, 77.7%) |
| Daily PR cadence | 2231/2711 current (480 due, 82.3%) |
| Daily new issue cadence (<30d) | 780/1165 current (385 due, 67%) |
| Weekly older issue cadence | 1819/1821 current (2 due, 99.9%) |
| Due now by cadence | 2033 |

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

Latest review: Apr 28, 2026, 22:45 UTC. Latest close: Apr 28, 2026, 22:45 UTC. Latest comment sync: Apr 28, 2026, 22:59 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 1 | 486 | 2 |
| Last hour | 543 | 15 | 528 | 3 | 18 | 918 | 5 |
| Last 24 hours | 5285 | 359 | 4926 | 7 | 730 | 1299 | 24 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73816](https://github.com/openclaw/openclaw/issues/73816) | [Bug] Cron job reports status 'ok' immediately after sessions_yield, before subagent completes | duplicate or superseded | Apr 28, 2026, 22:53 UTC | [records/openclaw-openclaw/closed/73816.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73816.md) |
| [#73705](https://github.com/openclaw/openclaw/issues/73705) | [Bug]: 2026.4.25+ macOS startup hot loop / 100% CPU in bundled plugin path | already implemented on main | Apr 28, 2026, 22:53 UTC | [records/openclaw-openclaw/closed/73705.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73705.md) |
| [#49080](https://github.com/openclaw/openclaw/issues/49080) | Live channel sessions keep stale policy context after durable rule changes | already implemented on main | Apr 28, 2026, 22:53 UTC | [records/openclaw-openclaw/closed/49080.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49080.md) |
| [#23718](https://github.com/openclaw/openclaw/issues/23718) | [Feature]: Fallback chain support for heartbeat.model | duplicate or superseded | Apr 28, 2026, 22:53 UTC | [records/openclaw-openclaw/closed/23718.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/23718.md) |
| [#55518](https://github.com/openclaw/openclaw/pull/55518) | feat(docker): add OPENCLAW_SKIP_ONBOARDING env to skip onboarding during Docker setup | closed externally after review | Apr 28, 2026, 22:50 UTC | [records/openclaw-openclaw/closed/55518.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55518.md) |
| [#51282](https://github.com/openclaw/openclaw/pull/51282) | feat(gateway): make handshake timeout configurable via gateway.handshakeTimeoutMs | closed externally after review | Apr 28, 2026, 22:50 UTC | [records/openclaw-openclaw/closed/51282.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51282.md) |
| [#73776](https://github.com/openclaw/openclaw/pull/73776) | fix(cli): make crestodian exit non-zero on no-TTY (#73646) | closed externally after review | Apr 28, 2026, 22:45 UTC | [records/openclaw-openclaw/closed/73776.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73776.md) |
| [#73175](https://github.com/openclaw/openclaw/pull/73175) | Plugins: list Kudosity SMS in community plugins | belongs on ClawHub | Apr 28, 2026, 22:38 UTC | [records/openclaw-openclaw/closed/73175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73175.md) |
| [#73838](https://github.com/openclaw/openclaw/issues/73838) | [Bug]: Control UI intermittently loses webchat state and renders NO_REPLY as NO | already implemented on main | Apr 28, 2026, 22:35 UTC | [records/openclaw-openclaw/closed/73838.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73838.md) |
| [#71069](https://github.com/openclaw/openclaw/issues/71069) | [Bug]: Gemma4-26b-a4-it-gguf override is rejected and reverts to gpt-4o | closed externally after review | Apr 28, 2026, 22:33 UTC | [records/openclaw-openclaw/closed/71069.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71069.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73844](https://github.com/openclaw/openclaw/pull/73844) | fix(failover): improve internal server error classification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73844.md) | complete | Apr 28, 2026, 22:45 UTC |
| [#73710](https://github.com/openclaw/openclaw/pull/73710) | feat(chat/ios): inline image resize + EXIF metadata strip for attachments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73710.md) | complete | Apr 28, 2026, 22:44 UTC |
| [#73843](https://github.com/openclaw/openclaw/pull/73843) | feat(rls): add weekly Supabase RLS leak scanner | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73843.md) | complete | Apr 28, 2026, 22:44 UTC |
| [#73609](https://github.com/openclaw/openclaw/issues/73609) | ACPX stale child session can respawn and inject old task output into Telegram thread | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73609.md) | failed | Apr 28, 2026, 22:43 UTC |
| [#48265](https://github.com/openclaw/openclaw/pull/48265) | feat: [[SPLIT]] directive + @mention context enrichment | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48265.md) | complete | Apr 28, 2026, 22:43 UTC |
| [#73842](https://github.com/openclaw/openclaw/pull/73842) | feat(runpr): add weekly outreach automation pipeline | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73842.md) | complete | Apr 28, 2026, 22:43 UTC |
| [#73648](https://github.com/openclaw/openclaw/pull/73648) | fix(channels): release zombie task on stopChannel timeout (#71412) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73648.md) | complete | Apr 28, 2026, 22:42 UTC |
| [#49791](https://github.com/openclaw/openclaw/issues/49791) | Feishu group chat: @Bot /think medium is normalized correctly but returns no reply, while the same command works in p2p | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49791.md) | complete | Apr 28, 2026, 22:42 UTC |
| [#73841](https://github.com/openclaw/openclaw/pull/73841) | fix(gateway): align dedupe eviction with entry timestamp | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73841.md) | complete | Apr 28, 2026, 22:42 UTC |
| [#73840](https://github.com/openclaw/openclaw/pull/73840) | test(ci): add kitchen-sink npm plugin prerelease lane | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73840.md) | complete | Apr 28, 2026, 22:42 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 22:57 UTC

State: Hot intake in progress

Hot intake planned 20 items across 20 shards. Capacity is 20 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25081925119](https://github.com/openclaw/clawsweeper/actions/runs/25081925119)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 877 |
| Open PRs | 39 |
| Open items total | 916 |
| Reviewed files | 909 |
| Unreviewed open items | 7 |
| Archived closed files | 12 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 876 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 909 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 0/53 current (53 due, 0%) |
| Hourly hot item cadence (<7d) | 0/53 current (53 due, 0%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 633/633 current (0 due, 100%) |
| Due now by cadence | 60 |

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

Latest review: Apr 28, 2026, 22:36 UTC. Latest close: Apr 28, 2026, 22:18 UTC. Latest comment sync: Apr 28, 2026, 22:38 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 40 | 0 | 40 | 0 | 1 | 40 | 0 |
| Last 24 hours | 921 | 3 | 918 | 0 | 12 | 491 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |
| [#1699](https://github.com/openclaw/clawhub/issues/1699) | Plugin search returns 500, and plugin catalog breaks after page 2 | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/1699.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1699.md) |
| [#85](https://github.com/openclaw/clawhub/issues/85) | Clawhub Sort feature shows wrong results | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/85.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/85.md) |
| [#1736](https://github.com/openclaw/clawhub/pull/1736) | Align hover stats with denormalized counters and fix seed digest stat drift | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1736.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1736.md) |
| [#1324](https://github.com/openclaw/clawhub/pull/1324) | feat: add --dry-run flag to package publish command | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1324.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1007](https://github.com/openclaw/clawhub/issues/1007) | FFmpeg Master Pro Skill Falsely Reported | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1007.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1003](https://github.com/openclaw/clawhub/issues/1003) | [False Positive] inter-agent-communication & feishu-group-helper | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1003.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1026](https://github.com/openclaw/clawhub/issues/1026) | False Positive: google-drive-service-account uses OAuth and service-account auth as intentional compatibility fallbacks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1026.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1069](https://github.com/openclaw/clawhub/issues/1069) | Title: \"False positive: crypto-portfolio-analyzer-pro flagged as suspicious\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1069.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1193](https://github.com/openclaw/clawhub/issues/1193) | clawhub login succeeds but whoami returns unknown and publish fails with \"Personal publisher not found\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1193.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1028](https://github.com/openclaw/clawhub/issues/1028) | [False Positive Appeal] baidu-netdisk-skill Flagged as Suspicious - Request Review | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1028.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1024](https://github.com/openclaw/clawhub/issues/1024) | Security scan guidance request: suspicious flag on microsoft-365-graph-openclaw | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1024.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1222](https://github.com/openclaw/clawhub/issues/1222) | Publish skill fails with Github API rate limit exceeded | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1222.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1121](https://github.com/openclaw/clawhub/issues/1121) | False positive suspicions: yt-description-autoposter | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1121.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1044](https://github.com/openclaw/clawhub/issues/1044) | False Positive: ifly-speed-transcription is  safe, official iFlytek transcription tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1044.md) | complete | Apr 28, 2026, 22:35 UTC |

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
