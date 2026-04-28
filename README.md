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

Last dashboard update: Apr 28, 2026, 17:39 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4429 |
| Open PRs | 3450 |
| Open items total | 7879 |
| Reviewed files | 7487 |
| Unreviewed open items | 392 |
| Due now by cadence | 2336 |
| Proposed closes awaiting apply | 31 |
| Closed by Codex apply | 10476 |
| Failed or stale reviews | 6 |
| Archived closed files | 13654 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6965 | 6580 | 385 | 2314 | 31 | 10473 | Apr 28, 2026, 17:24 UTC | Apr 28, 2026, 17:24 UTC | 722 |
| [ClawHub](https://github.com/openclaw/clawhub) | 914 | 907 | 7 | 22 | 0 | 3 | Apr 28, 2026, 17:04 UTC | Apr 28, 2026, 08:18 UTC | 38 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 17:38 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25066900589) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake in progress | Apr 28, 2026, 17:23 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25067584269) |

### Fleet Activity

Latest review: Apr 28, 2026, 17:24 UTC. Latest close: Apr 28, 2026, 17:24 UTC. Latest comment sync: Apr 28, 2026, 17:38 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 1 | 1 | 0 | 1 | 291 | 0 |
| Last hour | 939 | 48 | 891 | 2 | 23 | 760 | 1 |
| Last 24 hours | 5038 | 279 | 4759 | 3 | 585 | 1605 | 16 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73701](https://github.com/openclaw/openclaw/issues/73701) | [Bug]: `openclaw models --agent <id> auth login` writes OAuth tokens to the default agent's profile, ignoring `--agent` | already implemented on main | Apr 28, 2026, 17:24 UTC | [records/openclaw-openclaw/closed/73701.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73701.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73644](https://github.com/openclaw/openclaw/issues/73644) | Feature Request: Add option to disable missed jobs catch-up on gateway restart | duplicate or superseded | Apr 28, 2026, 17:23 UTC | [records/openclaw-openclaw/closed/73644.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73644.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73630](https://github.com/openclaw/openclaw/pull/73630) | test: drop spurious await + redundant cast on plugin.register call sites | closed externally after review | Apr 28, 2026, 17:10 UTC | [records/openclaw-openclaw/closed/73630.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73630.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70853](https://github.com/openclaw/openclaw/issues/70853) | Telegram DM session continuity lost after session reset/rebind on stable session key | closed externally after review | Apr 28, 2026, 17:01 UTC | [records/openclaw-openclaw/closed/70853.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70853.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60839](https://github.com/openclaw/openclaw/pull/60839) | [Fix] Don't deny local reverse proxy | already implemented on main | Apr 28, 2026, 17:00 UTC | [records/openclaw-openclaw/closed/60839.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60839.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60819](https://github.com/openclaw/openclaw/issues/60819) | doctor/status memory false positive after mem0 runtime recovery | duplicate or superseded | Apr 28, 2026, 17:00 UTC | [records/openclaw-openclaw/closed/60819.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60819.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60664](https://github.com/openclaw/openclaw/pull/60664) | fix: Edit tool false positive 'failed' error | already implemented on main | Apr 28, 2026, 17:00 UTC | [records/openclaw-openclaw/closed/60664.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60664.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60520](https://github.com/openclaw/openclaw/pull/60520) | fix: normalize routed reply directives and thread transport | already implemented on main | Apr 28, 2026, 16:59 UTC | [records/openclaw-openclaw/closed/60520.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60520.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60500](https://github.com/openclaw/openclaw/pull/60500) | feat(web): support PDF file uploads in web chat UI | already implemented on main | Apr 28, 2026, 16:59 UTC | [records/openclaw-openclaw/closed/60500.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60500.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60022](https://github.com/openclaw/openclaw/pull/60022) | fix: restore MS Teams file sending functionality | not actionable in this repository | Apr 28, 2026, 16:59 UTC | [records/openclaw-openclaw/closed/60022.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60022.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73702](https://github.com/openclaw/openclaw/issues/73702) | sessions_send reply forwarding creates cross-session prompt-injection vector | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73702.md) | complete | Apr 28, 2026, 17:24 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72910](https://github.com/openclaw/openclaw/pull/72910) | fix(cli): allow slower completion cache refreshes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72910.md) | complete | Apr 28, 2026, 17:23 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73551](https://github.com/openclaw/openclaw/issues/73551) | [Bug]: plugins enable <nonexistent-id> writes a stale plugin config entry and exits 0 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73551.md) | complete | Apr 28, 2026, 17:23 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62710](https://github.com/openclaw/openclaw/pull/62710) | fix(auth): stop new sessions inheriting auto-selected auth profile overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62710.md) | complete | Apr 28, 2026, 17:22 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73652](https://github.com/openclaw/openclaw/issues/73652) | Gateway accepts connections before ready signal, causing handshake timeouts on startup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73652.md) | complete | Apr 28, 2026, 17:22 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73586](https://github.com/openclaw/openclaw/issues/73586) | [Bug]: sandbox.mode: \"off\" still triggers Docker capability probe for cron/heartbeat/sub-agent sessions — causes failures when Docker daemon is unavailable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73586.md) | complete | Apr 28, 2026, 17:21 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62288](https://github.com/openclaw/openclaw/issues/62288) | Browser: prefer managed openclaw lane; existing-session attach brittle at DevToolsActivePort; improve fallback and diagnostics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62288.md) | complete | Apr 28, 2026, 17:21 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62481](https://github.com/openclaw/openclaw/pull/62481) | fix: filter phantom provider groups inferred from OpenRouter model IDs [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62481.md) | complete | Apr 28, 2026, 17:21 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73647](https://github.com/openclaw/openclaw/issues/73647) | [Bug]: 2026.4.26 Telegram-only gateway spins CPU in channel runtime / staged runtime deps | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73647.md) | complete | Apr 28, 2026, 17:21 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61432](https://github.com/openclaw/openclaw/issues/61432) | Bug: event.messages.push() on message:received has no effect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/61432.md) | complete | Apr 28, 2026, 17:21 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 17:38 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 288. Item numbers: 25592,27061,35203,37967,38248,40463,42713,42798,42987,43231,43300,43469,43750,44441,44695,45320,45417,45612,45643,45739,45782,45783,45808,45832,45902,47090,47264,47277,47776,47816,47984,48021,48100,48130,48194,48270,48278,48285,48320,48324,48325,48328,48334,48336,48375,48387,48391,48396,48433,48520,48570,48585,48588,48643,48681,48682,48690,48724,48742,48807,48845,48868,48940,48945,48958,48960,48976,49058,49064,49082,49085,49107,49112,49117,49120,49216,49221,49349,49361,49401,49430,49434,49511,49569,49579,49750,49769,49796,49840,49869,49870,49875,49936,49958,49967,50076,50096,50141,50147,50152,50160,50200,50244,50269,50320,50357,50359,50643,50675,50875,50936,50979,51124,51197,51347,51413,51451,51553,51762,51860,51926,52025,52357,54567,55973,58479,58789,58808,58822,58838,58889,58947,59022,59088,59151,59361,59509,59528,59613,59710,59718,59740,59745,59782,59798,59808,59817,59859,59881,59913,59933,59945,59966,60034,60035,60041,60078,60084,60087,60103,60113,60143,60154,60190,60191,60204,60225,60247,60256,60274,60275,60332,60334,60339,60342,60344,60362,60379,60380,60381,60382,60388,60398,60422,60423,60427,60448,60450,60453,60482,60490,60506,60509,60521,60546,60572,60582,60593,60612,60620,60652,60657,60659,60662,60693,60694,60712,60713,60719,60736,60741,60745,60748,60759,60763,60767,60780,60782,60799,60812,60814,60816,60824,60827,60832,60841,60844,60850,60861,60864,60868,60875,60885,60902,60917,60937,60946,60955,60961,60967,60979,60982,61001,61005,61006,61009,61010,61012,61019,61034,61041,61046,61051,61058,61070,61073,61075,61078,61080,61095,61105,61112,61119,61128,61137,61145,61167,61177,61182,61183,61187,61190,61192,61203,61213,61237,61238,61245,61278,61289,61298,61304,61316,61321,61322,61329,61338,61341,61345,61347,61349,61366,61368,61374,61389,61413,61416,61418,61422,61423,61426,61430,61432,61433,61441,61443,61444,61445,61446,61447,61464,61469,61483,61484,61496,61500,61502,61518,61520,61521,61522,61550,61569,61572,61576,61612,61616,61621,61633,61649,61659,61661,61667,61668,61673,61675,61683,61694,61697,61704,61716,61723,61725,61735,61740,61764,61775,61807,61831,61834,61840,61850,61864,61865,61885,61895,61949,61961,61966,61973,61986,62022,62029,62042,62056,62057,62060,62066,62070,62077,62092,62095,62100,62101,62102,62103,62109,62120,62121,62123,62126,62145,62157,62164,62167,62187,62191,62201,62206,62212,62249,62261,62276,62284,62288,62294,62298,62303,62307,62317,62322,62328,62338,62339,62346,62387,62391,62403,62416,62417,62420,62432,62438,62440,62441,62454,62464,62466,62481,62485,62505,62509,62512,62513,62514,62528,62532,62536,62542,62552,62597,62648,62665,62682,62701,62710,62721,62722,62733,62740,62741,62775,62790,62802,62810,62841,63550,63829,64490,65200,65374,66010,66287,66646,67509,67511,68339,68350,68997,69292,69310,69312,71155,71384,72585,72645,72817,73323,73455,73483,73533,73551,73557,73563,73586,73592,73593,73594,73595,73635,73637,73638,73639,73640,73642,73643,73644,73646,73647,73648,73649,73650,73652,73653,73654,73655,73656,73657,73659,73660.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25066900589](https://github.com/openclaw/clawsweeper/actions/runs/25066900589)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3553 |
| Open PRs | 3412 |
| Open items total | 6965 |
| Reviewed files | 6580 |
| Unreviewed open items | 385 |
| Archived closed files | 13644 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3377 |
| Proposed issue closes | 23 (0.7% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3197 |
| Proposed PR closes | 8 (0.3% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6574 |
| Proposed closes awaiting apply | 31 (0.5% of fresh reviews) |
| Closed by Codex apply | 10473 |
| Failed or stale reviews | 6 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 92/794 current (702 due, 11.6%) |
| Hourly hot item cadence (<7d) | 92/794 current (702 due, 11.6%) |
| Daily cadence coverage | 2718/3944 current (1226 due, 68.9%) |
| Daily PR cadence | 2013/2736 current (723 due, 73.6%) |
| Daily new issue cadence (<30d) | 705/1208 current (503 due, 58.4%) |
| Weekly older issue cadence | 1841/1842 current (1 due, 99.9%) |
| Due now by cadence | 2314 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 28, 2026, 12:54 UTC

Status: **Action needed**

Targeted review input: `64563,65635,72522,72527,72529,72531,72532,72535,72536,72537`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6974 |
| Missing eligible open records | 117 |
| Missing maintainer-authored open records | 74 |
| Missing protected open records | 1 |
| Missing recently-created open records | 237 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 4 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#64563](https://github.com/openclaw/openclaw/pull/64563) | Missing eligible open | fix(whatsapp): lazy default auth dir for profile state (#64555) | eligible |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 17:24 UTC. Latest close: Apr 28, 2026, 17:24 UTC. Latest comment sync: Apr 28, 2026, 17:38 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 1 | 1 | 0 | 1 | 291 | 0 |
| Last hour | 901 | 48 | 853 | 2 | 23 | 722 | 1 |
| Last 24 hours | 4121 | 276 | 3845 | 3 | 575 | 1285 | 16 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73701](https://github.com/openclaw/openclaw/issues/73701) | [Bug]: `openclaw models --agent <id> auth login` writes OAuth tokens to the default agent's profile, ignoring `--agent` | already implemented on main | Apr 28, 2026, 17:24 UTC | [records/openclaw-openclaw/closed/73701.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73701.md) |
| [#73644](https://github.com/openclaw/openclaw/issues/73644) | Feature Request: Add option to disable missed jobs catch-up on gateway restart | duplicate or superseded | Apr 28, 2026, 17:23 UTC | [records/openclaw-openclaw/closed/73644.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73644.md) |
| [#73630](https://github.com/openclaw/openclaw/pull/73630) | test: drop spurious await + redundant cast on plugin.register call sites | closed externally after review | Apr 28, 2026, 17:10 UTC | [records/openclaw-openclaw/closed/73630.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73630.md) |
| [#70853](https://github.com/openclaw/openclaw/issues/70853) | Telegram DM session continuity lost after session reset/rebind on stable session key | closed externally after review | Apr 28, 2026, 17:01 UTC | [records/openclaw-openclaw/closed/70853.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70853.md) |
| [#60839](https://github.com/openclaw/openclaw/pull/60839) | [Fix] Don't deny local reverse proxy | already implemented on main | Apr 28, 2026, 17:00 UTC | [records/openclaw-openclaw/closed/60839.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60839.md) |
| [#60819](https://github.com/openclaw/openclaw/issues/60819) | doctor/status memory false positive after mem0 runtime recovery | duplicate or superseded | Apr 28, 2026, 17:00 UTC | [records/openclaw-openclaw/closed/60819.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60819.md) |
| [#60664](https://github.com/openclaw/openclaw/pull/60664) | fix: Edit tool false positive 'failed' error | already implemented on main | Apr 28, 2026, 17:00 UTC | [records/openclaw-openclaw/closed/60664.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60664.md) |
| [#60520](https://github.com/openclaw/openclaw/pull/60520) | fix: normalize routed reply directives and thread transport | already implemented on main | Apr 28, 2026, 16:59 UTC | [records/openclaw-openclaw/closed/60520.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60520.md) |
| [#60500](https://github.com/openclaw/openclaw/pull/60500) | feat(web): support PDF file uploads in web chat UI | already implemented on main | Apr 28, 2026, 16:59 UTC | [records/openclaw-openclaw/closed/60500.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60500.md) |
| [#60022](https://github.com/openclaw/openclaw/pull/60022) | fix: restore MS Teams file sending functionality | not actionable in this repository | Apr 28, 2026, 16:59 UTC | [records/openclaw-openclaw/closed/60022.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60022.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73702](https://github.com/openclaw/openclaw/issues/73702) | sessions_send reply forwarding creates cross-session prompt-injection vector | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73702.md) | complete | Apr 28, 2026, 17:24 UTC |
| [#72910](https://github.com/openclaw/openclaw/pull/72910) | fix(cli): allow slower completion cache refreshes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72910.md) | complete | Apr 28, 2026, 17:23 UTC |
| [#73551](https://github.com/openclaw/openclaw/issues/73551) | [Bug]: plugins enable <nonexistent-id> writes a stale plugin config entry and exits 0 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73551.md) | complete | Apr 28, 2026, 17:23 UTC |
| [#62710](https://github.com/openclaw/openclaw/pull/62710) | fix(auth): stop new sessions inheriting auto-selected auth profile overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62710.md) | complete | Apr 28, 2026, 17:22 UTC |
| [#73652](https://github.com/openclaw/openclaw/issues/73652) | Gateway accepts connections before ready signal, causing handshake timeouts on startup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73652.md) | complete | Apr 28, 2026, 17:22 UTC |
| [#73586](https://github.com/openclaw/openclaw/issues/73586) | [Bug]: sandbox.mode: \"off\" still triggers Docker capability probe for cron/heartbeat/sub-agent sessions — causes failures when Docker daemon is unavailable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73586.md) | complete | Apr 28, 2026, 17:21 UTC |
| [#62288](https://github.com/openclaw/openclaw/issues/62288) | Browser: prefer managed openclaw lane; existing-session attach brittle at DevToolsActivePort; improve fallback and diagnostics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62288.md) | complete | Apr 28, 2026, 17:21 UTC |
| [#62481](https://github.com/openclaw/openclaw/pull/62481) | fix: filter phantom provider groups inferred from OpenRouter model IDs [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62481.md) | complete | Apr 28, 2026, 17:21 UTC |
| [#73647](https://github.com/openclaw/openclaw/issues/73647) | [Bug]: 2026.4.26 Telegram-only gateway spins CPU in channel runtime / staged runtime deps | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73647.md) | complete | Apr 28, 2026, 17:21 UTC |
| [#61432](https://github.com/openclaw/openclaw/issues/61432) | Bug: event.messages.push() on message:received has no effect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/61432.md) | complete | Apr 28, 2026, 17:21 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 17:27 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 1027,1381,1382,1383,1384,1385,1392,1395,1397,1401,1408,1410,1412,1413,1414,1422,1445,1477,1591,1672.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25067584269](https://github.com/openclaw/clawsweeper/actions/runs/25067584269)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 876 |
| Open PRs | 38 |
| Open items total | 914 |
| Reviewed files | 907 |
| Unreviewed open items | 7 |
| Archived closed files | 10 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 875 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 907 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 37/52 current (15 due, 71.2%) |
| Hourly hot item cadence (<7d) | 37/52 current (15 due, 71.2%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 632/632 current (0 due, 100%) |
| Due now by cadence | 22 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 28, 2026, 12:54 UTC

Status: **Passing**

Targeted review input: `756`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 912 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 7 |
| Missing protected open records | 0 |
| Missing recently-created open records | 0 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 1 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| _None_ |  |  |  |
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 17:25 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 17:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 38 | 0 | 38 | 0 | 0 | 38 | 0 |
| Last 24 hours | 917 | 3 | 914 | 0 | 10 | 320 | 0 |

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
| [#1422](https://github.com/openclaw/clawhub/issues/1422) | ai-capability-analyzer has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1422.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1413](https://github.com/openclaw/clawhub/issues/1413) | Skill: threadline (by @vidursharma202-del) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1413.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1408](https://github.com/openclaw/clawhub/issues/1408) | Skill 页面可访问但搜索无法找到 - 搜索索引问题 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1408.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1397](https://github.com/openclaw/clawhub/issues/1397) | [Skill flagged]: False Positive High Confidence Security Flag - dxm-agent-wallet Skill (https://clawhub.ai/guofeng007/dxm-agent-wallet) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1397.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1445](https://github.com/openclaw/clawhub/issues/1445) | False positive: context-slimming flagged as suspicious — benign workspace optimization skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1445.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1382](https://github.com/openclaw/clawhub/issues/1382) | Login issue | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1382.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1401](https://github.com/openclaw/clawhub/issues/1401) | tv-indicators-analysis 错误标记 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1401.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1381](https://github.com/openclaw/clawhub/issues/1381) | delet skills | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1381.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1477](https://github.com/openclaw/clawhub/issues/1477) | [Appeal] Account \"clawgrid\" locked after skill flagged — requesting account restoration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1477.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1672](https://github.com/openclaw/clawhub/issues/1672) | Security scan findings: credential-pattern and remote-exec hits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1672.md) | complete | Apr 28, 2026, 17:25 UTC |

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
