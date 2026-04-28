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

Last dashboard update: Apr 28, 2026, 18:14 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4412 |
| Open PRs | 3444 |
| Open items total | 7855 |
| Reviewed files | 7467 |
| Unreviewed open items | 388 |
| Due now by cadence | 2376 |
| Proposed closes awaiting apply | 1 |
| Closed by Codex apply | 10506 |
| Failed or stale reviews | 8 |
| Archived closed files | 13690 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6941 | 6560 | 381 | 2318 | 1 | 10503 | Apr 28, 2026, 18:00 UTC | Apr 28, 2026, 17:57 UTC | 723 |
| [ClawHub](https://github.com/openclaw/clawhub) | 914 | 907 | 7 | 58 | 0 | 3 | Apr 28, 2026, 17:25 UTC | Apr 28, 2026, 08:18 UTC | 20 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 18:14 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25068369931) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake in progress | Apr 28, 2026, 17:59 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25069266554) |

### Fleet Activity

Latest review: Apr 28, 2026, 18:00 UTC. Latest close: Apr 28, 2026, 17:57 UTC. Latest comment sync: Apr 28, 2026, 18:14 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 3 | 0 | 3 | 0 | 0 | 386 | 0 |
| Last hour | 914 | 32 | 882 | 2 | 36 | 743 | 2 |
| Last 24 hours | 5052 | 281 | 4771 | 5 | 619 | 1522 | 18 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57210](https://github.com/openclaw/openclaw/issues/57210) | [Feature Request] Multi-Session / New Chat Support | duplicate or superseded | Apr 28, 2026, 18:07 UTC | [records/openclaw-openclaw/closed/57210.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57210.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72171](https://github.com/openclaw/openclaw/pull/72171) | fix(onboard): detect vision-capable models for custom providers | closed externally after review | Apr 28, 2026, 18:05 UTC | [records/openclaw-openclaw/closed/72171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72171.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73712](https://github.com/openclaw/openclaw/issues/73712) | Telegram /new sends empty OpenAI/Codex Responses request after reset | already implemented on main | Apr 28, 2026, 17:57 UTC | [records/openclaw-openclaw/closed/73712.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73712.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63700](https://github.com/openclaw/openclaw/issues/63700) | Feature: infer model run — multimodal support (--file for vision) | closed externally after review | Apr 28, 2026, 17:53 UTC | [records/openclaw-openclaw/closed/63700.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63700.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65271](https://github.com/openclaw/openclaw/pull/65271) | shell: support custom shells on Windows | closed externally after review | Apr 28, 2026, 17:52 UTC | [records/openclaw-openclaw/closed/65271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65271.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68997](https://github.com/openclaw/openclaw/issues/68997) | Bug: `task-registry-control.runtime.{js,ts}` missing from published npm tarballs, breaks `openclaw tasks cancel` | already implemented on main | Apr 28, 2026, 17:47 UTC | [records/openclaw-openclaw/closed/68997.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68997.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65200](https://github.com/openclaw/openclaw/issues/65200) | /new and /reset should clear session model overrides | duplicate or superseded | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/65200.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65200.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62810](https://github.com/openclaw/openclaw/pull/62810) | fix: add error logging to empty catch blocks in Config IO | duplicate or superseded | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/62810.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62810.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62741](https://github.com/openclaw/openclaw/pull/62741) | fix(memory-lancedb): guard against empty embeddings response | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/62741.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62741.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61850](https://github.com/openclaw/openclaw/issues/61850) | Slack file_share events silently dropped after upgrade from 2026.3.31 to 2026.4.5 | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/61850.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61850.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44695](https://github.com/openclaw/openclaw/pull/44695) | feat(onboarding): complete zh-CN locale onboarding bundle + review fixes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44695.md) | complete | Apr 28, 2026, 18:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73614](https://github.com/openclaw/openclaw/pull/73614) | fix(logging): expand leading tilde in logging.file (#73587) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73614.md) | complete | Apr 28, 2026, 18:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73216](https://github.com/openclaw/openclaw/pull/73216) | feat(copilot): dynamic model catalog from /models API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73216.md) | complete | Apr 28, 2026, 17:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57364](https://github.com/openclaw/openclaw/pull/57364) | fix(msteams): delete FileConsentCard after user accepts, declines, or upload expires | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/57364.md) | complete | Apr 28, 2026, 17:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52012](https://github.com/openclaw/openclaw/pull/52012) | feat(compaction): add modelFallbacks for compaction model resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52012.md) | complete | Apr 28, 2026, 17:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73715](https://github.com/openclaw/openclaw/issues/73715) | [Bug]: --model anthropic/CLAUDE-OPUS-4-7 (case-mismatched model name) is accepted by CLI catalog and dispatched to the provider, surfacing as misleading \"No text output returned\" — provider name is case-insensitive but model name is not | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73715.md) | complete | Apr 28, 2026, 17:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73674](https://github.com/openclaw/openclaw/pull/73674) | fix(memory): resolve QMD Windows cmd shims | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73674.md) | complete | Apr 28, 2026, 17:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73713](https://github.com/openclaw/openclaw/issues/73713) | openclaw infer embedding create fails with TypeError: fetch failed on Node 24 despite valid Voyage credential; underlying cause is swallowed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73713.md) | complete | Apr 28, 2026, 17:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73122](https://github.com/openclaw/openclaw/pull/73122) | fix claude-cli runtime harness registration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73122.md) | complete | Apr 28, 2026, 17:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51462](https://github.com/openclaw/openclaw/pull/51462) | fix: emit assistant update for tool-call-only messages from OpenAI-compatible providers [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51462.md) | complete | Apr 28, 2026, 17:57 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 18:14 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 379. Item numbers: 6457,7057,12678,14593,15591,17098,17311,17684,18160,18860,18915,19328,19330,19362,19482,20802,23096,24754,25222,25295,25789,27771,29387,30142,30529,31407,32558,33845,33975,34542,34581,36630,38161,38162,38327,38502,38789,38808,38876,39102,39115,39137,39245,39350,39555,39558,39604,39683,39692,39703,39715,39726,39772,39891,40044,40067,40155,40165,40194,40209,40215,40230,40247,40252,40277,40287,40366,40387,40392,40402,40423,40472,40522,40560,40611,40641,40673,40694,40716,40744,40829,40874,40875,40877,40878,40982,41025,41058,41082,41088,41111,41120,41135,41168,41195,41199,41259,41265,41272,41296,41299,41304,41306,41346,41355,41366,41372,41410,41418,41444,41461,41483,41494,41495,41501,41517,41546,41548,41555,41572,41583,41588,41594,41608,41609,41619,41624,41649,41651,41657,41670,41671,41685,41718,41722,41740,41744,41745,41803,41833,41837,41858,41879,41882,41892,41897,41899,41933,41940,41954,41965,41983,41986,42001,42007,42011,42014,42039,42052,42065,42079,42099,42106,42156,42157,42174,42196,42201,42243,42252,42258,42259,42271,42303,42304,42327,42330,42391,42592,42631,42636,42637,42675,42690,42820,42961,42999,43068,43117,43367,45662,48368,48442,48466,48556,48834,48867,48902,48942,48946,49028,49063,49069,49166,49286,49310,49315,49409,49423,49502,49550,49574,49704,49793,49800,49841,49945,49968,49980,49981,49987,50046,50051,50054,50116,50136,50164,50172,50177,50193,50210,50217,50221,50249,50250,50267,50278,50300,50361,50381,50392,50399,50425,50454,50463,50479,50515,50516,50520,50584,50631,50662,50682,50692,50696,50720,50745,50751,50755,50757,50760,50777,50837,50881,50883,50895,50933,50943,50955,50960,50965,50978,50981,50992,51001,51024,51077,51079,51121,51125,51128,51156,51163,51179,51180,51196,51257,51282,51286,51288,51303,51311,51318,51319,51327,51375,51388,51389,51448,51462,51513,51515,51528,51546,51563,51565,51584,51603,51623,51653,51668,51672,51675,51695,51708,51737,51775,51777,51802,51803,51822,51823,51849,51868,51930,51940,51970,52012,52027,52036,52052,52059,52109,52120,52121,52125,52154,52200,52234,52252,52275,52767,54164,54397,55253,55354,55358,55365,55372,55381,55401,55420,55459,55462,55484,55501,55520,55532,55563,55592,55600,55619,55640,55678,55691,55718,55723,55743,55766,55770,55771,55789,55790,55792,55806,55807,55831,55840,55850,55851,55858,55870,55880,55882,55884,55888,55893,55896,55901,55913,55914,55915,55917,55927,55928,55935,55940,55944,55966,55970,55982,56023,56031,56034,56036,56072,56078,56081,56083,56092,56096,56102,56106,56110,56118,56130,56131,56132,56145,56152,56157,56167,56228,56442,56594,56621,56692,56813,56862,56897,56994,56997,57019,57031,57086,57119,57123,57126,57143,57192,57199,57202,57204,57210,57236,57239,57241,57256,57259,57260,57270,57271,57276,57278,57281,57284,57296,57297,57300,57307,57309,57313,57335,57349,57360,57364,57369,57376,57387,57389,57404,57408,58034,73243,73382,73394,73407,73452,73515,73574,73581,73602,73616,73618,73619,73620,73621,73622,73623,73624,73626,73629,73651,73658,73662,73663,73664,73667,73671,73673.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25068369931](https://github.com/openclaw/clawsweeper/actions/runs/25068369931)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3536 |
| Open PRs | 3406 |
| Open items total | 6941 |
| Reviewed files | 6560 |
| Unreviewed open items | 381 |
| Archived closed files | 13678 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3359 |
| Proposed issue closes | 1 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3193 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6552 |
| Proposed closes awaiting apply | 1 (0% of fresh reviews) |
| Closed by Codex apply | 10503 |
| Failed or stale reviews | 8 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 97/805 current (708 due, 12%) |
| Hourly hot item cadence (<7d) | 97/805 current (708 due, 12%) |
| Daily cadence coverage | 2683/3911 current (1228 due, 68.6%) |
| Daily PR cadence | 2002/2726 current (724 due, 73.4%) |
| Daily new issue cadence (<30d) | 681/1185 current (504 due, 57.5%) |
| Weekly older issue cadence | 1843/1844 current (1 due, 99.9%) |
| Due now by cadence | 2318 |

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

Latest review: Apr 28, 2026, 18:00 UTC. Latest close: Apr 28, 2026, 17:57 UTC. Latest comment sync: Apr 28, 2026, 18:14 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 3 | 0 | 3 | 0 | 0 | 386 | 0 |
| Last hour | 894 | 32 | 862 | 2 | 36 | 723 | 2 |
| Last 24 hours | 4135 | 278 | 3857 | 5 | 609 | 1202 | 18 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#57210](https://github.com/openclaw/openclaw/issues/57210) | [Feature Request] Multi-Session / New Chat Support | duplicate or superseded | Apr 28, 2026, 18:07 UTC | [records/openclaw-openclaw/closed/57210.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57210.md) |
| [#72171](https://github.com/openclaw/openclaw/pull/72171) | fix(onboard): detect vision-capable models for custom providers | closed externally after review | Apr 28, 2026, 18:05 UTC | [records/openclaw-openclaw/closed/72171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72171.md) |
| [#73712](https://github.com/openclaw/openclaw/issues/73712) | Telegram /new sends empty OpenAI/Codex Responses request after reset | already implemented on main | Apr 28, 2026, 17:57 UTC | [records/openclaw-openclaw/closed/73712.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73712.md) |
| [#63700](https://github.com/openclaw/openclaw/issues/63700) | Feature: infer model run — multimodal support (--file for vision) | closed externally after review | Apr 28, 2026, 17:53 UTC | [records/openclaw-openclaw/closed/63700.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63700.md) |
| [#65271](https://github.com/openclaw/openclaw/pull/65271) | shell: support custom shells on Windows | closed externally after review | Apr 28, 2026, 17:52 UTC | [records/openclaw-openclaw/closed/65271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65271.md) |
| [#68997](https://github.com/openclaw/openclaw/issues/68997) | Bug: `task-registry-control.runtime.{js,ts}` missing from published npm tarballs, breaks `openclaw tasks cancel` | already implemented on main | Apr 28, 2026, 17:47 UTC | [records/openclaw-openclaw/closed/68997.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68997.md) |
| [#65200](https://github.com/openclaw/openclaw/issues/65200) | /new and /reset should clear session model overrides | duplicate or superseded | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/65200.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65200.md) |
| [#62810](https://github.com/openclaw/openclaw/pull/62810) | fix: add error logging to empty catch blocks in Config IO | duplicate or superseded | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/62810.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62810.md) |
| [#62741](https://github.com/openclaw/openclaw/pull/62741) | fix(memory-lancedb): guard against empty embeddings response | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/62741.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62741.md) |
| [#61850](https://github.com/openclaw/openclaw/issues/61850) | Slack file_share events silently dropped after upgrade from 2026.3.31 to 2026.4.5 | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/61850.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61850.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#44695](https://github.com/openclaw/openclaw/pull/44695) | feat(onboarding): complete zh-CN locale onboarding bundle + review fixes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44695.md) | complete | Apr 28, 2026, 18:00 UTC |
| [#73614](https://github.com/openclaw/openclaw/pull/73614) | fix(logging): expand leading tilde in logging.file (#73587) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73614.md) | complete | Apr 28, 2026, 18:00 UTC |
| [#73216](https://github.com/openclaw/openclaw/pull/73216) | feat(copilot): dynamic model catalog from /models API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73216.md) | complete | Apr 28, 2026, 17:59 UTC |
| [#57364](https://github.com/openclaw/openclaw/pull/57364) | fix(msteams): delete FileConsentCard after user accepts, declines, or upload expires | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/57364.md) | complete | Apr 28, 2026, 17:59 UTC |
| [#52012](https://github.com/openclaw/openclaw/pull/52012) | feat(compaction): add modelFallbacks for compaction model resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52012.md) | complete | Apr 28, 2026, 17:59 UTC |
| [#73715](https://github.com/openclaw/openclaw/issues/73715) | [Bug]: --model anthropic/CLAUDE-OPUS-4-7 (case-mismatched model name) is accepted by CLI catalog and dispatched to the provider, surfacing as misleading \"No text output returned\" — provider name is case-insensitive but model name is not | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73715.md) | complete | Apr 28, 2026, 17:59 UTC |
| [#73674](https://github.com/openclaw/openclaw/pull/73674) | fix(memory): resolve QMD Windows cmd shims | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73674.md) | complete | Apr 28, 2026, 17:58 UTC |
| [#73713](https://github.com/openclaw/openclaw/issues/73713) | openclaw infer embedding create fails with TypeError: fetch failed on Node 24 despite valid Voyage credential; underlying cause is swallowed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73713.md) | complete | Apr 28, 2026, 17:58 UTC |
| [#73122](https://github.com/openclaw/openclaw/pull/73122) | fix claude-cli runtime harness registration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73122.md) | complete | Apr 28, 2026, 17:58 UTC |
| [#51462](https://github.com/openclaw/openclaw/pull/51462) | fix: emit assistant update for tool-call-only messages from OpenAI-compatible providers [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51462.md) | complete | Apr 28, 2026, 17:57 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 18:04 UTC

State: Review publish complete

Merged review artifacts for run 25069191786. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25069191786](https://github.com/openclaw/clawsweeper/actions/runs/25069191786)
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
| Hourly cadence coverage | 0/51 current (51 due, 0%) |
| Hourly hot item cadence (<7d) | 0/51 current (51 due, 0%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 633/633 current (0 due, 100%) |
| Due now by cadence | 58 |

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

Latest review: Apr 28, 2026, 18:04 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 17:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 20 | 0 | 20 | 0 | 0 | 20 | 0 |
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
| [#1569](https://github.com/openclaw/clawhub/issues/1569) | How can I transfer \"personal skills\" to \"organization skills\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1569.md) | complete | Apr 28, 2026, 18:04 UTC |
| [#1690](https://github.com/openclaw/clawhub/issues/1690) | False positive flag: eolas-openclaw-mcp is a legitimate DeFi trading plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1690.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1812](https://github.com/openclaw/clawhub/issues/1812) | Skill be flagged as suspicious and being marked hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1812.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1826](https://github.com/openclaw/clawhub/issues/1826) | False positives: powerloom-bot/powerloom-bds-univ3 flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1826.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1748](https://github.com/openclaw/clawhub/issues/1748) | False positive security flag on skill: zim (v3.0.2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1748.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1563](https://github.com/openclaw/clawhub/issues/1563) | Skill flagged suspicious, scan tagged benign | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1563.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1770](https://github.com/openclaw/clawhub/issues/1770) | [Request] Purge soft-deleted slug \"creator-scraper-cv\" to allow rename | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1770.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1855](https://github.com/openclaw/clawhub/pull/1855) | feat(cli): show skill moderation in inspect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1855.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1472](https://github.com/openclaw/clawhub/issues/1472) | Why is my skill flagged as suspicious even after reaching benign status? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1472.md) | complete | Apr 28, 2026, 18:02 UTC |
| [#1595](https://github.com/openclaw/clawhub/issues/1595) | Proposal: native Apple Notes skill for macOS agents (osascript, no memo dependency) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1595.md) | complete | Apr 28, 2026, 18:02 UTC |

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
