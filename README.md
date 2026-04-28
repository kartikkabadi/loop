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

Last dashboard update: Apr 28, 2026, 08:59 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4416 |
| Open PRs | 3502 |
| Open items total | 7918 |
| Reviewed files | 7473 |
| Unreviewed open items | 445 |
| Due now by cadence | 3748 |
| Proposed closes awaiting apply | 1 |
| Closed by Codex apply | 10281 |
| Failed or stale reviews | 41 |
| Archived closed files | 13385 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 7008 | 6570 | 438 | 3690 | 1 | 10278 | Apr 28, 2026, 08:57 UTC | Apr 28, 2026, 08:53 UTC | 59 |
| [ClawHub](https://github.com/openclaw/clawhub) | 910 | 903 | 7 | 58 | 0 | 3 | Apr 28, 2026, 08:46 UTC | Apr 28, 2026, 05:18 UTC | 20 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Event review applied | Apr 28, 2026, 08:59 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25043546141) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 08:47 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25041191333) |

### Fleet Activity

Latest review: Apr 28, 2026, 08:57 UTC. Latest close: Apr 28, 2026, 08:53 UTC. Latest comment sync: Apr 28, 2026, 08:59 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 32 | 1 | 31 | 0 | 2 | 53 | 4 |
| Last hour | 559 | 4 | 555 | 1 | 3 | 79 | 6 |
| Last 24 hours | 3317 | 111 | 3206 | 17 | 59 | 1639 | 27 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73383](https://github.com/openclaw/openclaw/pull/73383) | feat(line): persist inbound media to ~/.openclaw/media/inbound/ | already implemented on main | Apr 28, 2026, 08:53 UTC | [records/openclaw-openclaw/closed/73383.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73383.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73418](https://github.com/openclaw/openclaw/issues/73418) | memory-wiki bridge still imports 0 artifacts with QMD backend on 2026.4.26 | duplicate or superseded | Apr 28, 2026, 08:45 UTC | [records/openclaw-openclaw/closed/73418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73418.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73413](https://github.com/openclaw/openclaw/issues/73413) | [Bug]: When the sub-agent compresses, the session yield incorrectly returns intermediate results, causing the system to fail to produce the correct outcome once compression is complete and execution proceeds. | already implemented on main | Apr 28, 2026, 08:38 UTC | [records/openclaw-openclaw/closed/73413.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73413.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73313](https://github.com/openclaw/openclaw/pull/73313) | fix #73204: release session write lock during LLM summarization to prevent message drops | already implemented on main | Apr 28, 2026, 07:50 UTC | [records/openclaw-openclaw/closed/73313.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73313.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73353](https://github.com/openclaw/openclaw/issues/73353) | 60s startup hang in sidecars.channels — synchronous plugin manifest re-discovery on every cold start (v2026.4.26) | already implemented on main | Apr 28, 2026, 07:06 UTC | [records/openclaw-openclaw/closed/73353.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73353.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73352](https://github.com/openclaw/openclaw/issues/73352) | MCP Client: Add OAuth2 Authorization Code Flow support for HTTP-based MCP servers | duplicate or superseded | Apr 28, 2026, 07:05 UTC | [records/openclaw-openclaw/closed/73352.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73352.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73348](https://github.com/openclaw/openclaw/issues/73348) | openclaw update can succeed while the running gateway stays on an older version, causing plugin/config version skew | already implemented on main | Apr 28, 2026, 06:50 UTC | [records/openclaw-openclaw/closed/73348.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73348.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73344](https://github.com/openclaw/openclaw/issues/73344) | [Bug]: /new on openai-codex/* (Responses API) returns \"One of input/previous_response_id/prompt/conversation_id must be provided\" — regression in 2026.4.26 | already implemented on main | Apr 28, 2026, 06:45 UTC | [records/openclaw-openclaw/closed/73344.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73344.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73331](https://github.com/openclaw/openclaw/issues/73331) | v2026.4.26: Gateway busy-loops on bundled openai SDK directory walk; stops accepting connections | already implemented on main | Apr 28, 2026, 06:22 UTC | [records/openclaw-openclaw/closed/73331.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73331.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73329](https://github.com/openclaw/openclaw/issues/73329) | [Bug]: Gateway hard-couples to OpenRouter + LiteLLM pricing fetches at boot; no opt-out | duplicate or superseded | Apr 28, 2026, 06:20 UTC | [records/openclaw-openclaw/closed/73329.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73329.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73432](https://github.com/openclaw/openclaw/issues/73432) | [Bug]: qmd embedding is never triggered per memory.qmd.update.interval/embedInterval | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73432.md) | complete | Apr 28, 2026, 08:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73351](https://github.com/openclaw/openclaw/pull/73351) | fix(cli-runner): transfer bundle-MCP cleanup to live session lifecycle (#73244) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73351.md) | complete | Apr 28, 2026, 08:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72645](https://github.com/openclaw/openclaw/pull/72645) | feat(diagnostics-otel): add per-message end-to-end OTel tracing across run/skill/tool/model | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72645.md) | complete | Apr 28, 2026, 08:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73365](https://github.com/openclaw/openclaw/pull/73365) | fix: allow steer messages during active non-streaming runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73365.md) | complete | Apr 28, 2026, 08:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71884](https://github.com/openclaw/openclaw/pull/71884) | fix: allow safe Windows companion node commands | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71884.md) | complete | Apr 28, 2026, 08:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 28, 2026, 08:49 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73429](https://github.com/openclaw/openclaw/pull/73429) | fix(plugin-sdk): backfill reasoning_content on all DeepSeek V4 assistant messages | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73429.md) | complete | Apr 28, 2026, 08:48 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71027](https://github.com/openclaw/openclaw/pull/71027) | build(deps): bump useblacksmith/build-push-action from 2.1.0 to 2.2.0 in the actions group across 1 directory | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71027.md) | complete | Apr 28, 2026, 08:48 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41991](https://github.com/openclaw/openclaw/pull/41991) | Google: show detailed Gemini CLI OAuth extraction failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41991.md) | complete | Apr 28, 2026, 08:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73419](https://github.com/openclaw/openclaw/pull/73419) | fix(onboarding): skip redundant install prompt when only one source e… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73419.md) | complete | Apr 28, 2026, 08:47 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 08:59 UTC

State: Review publish complete

Reviewed event item #73432, synced durable comment(s): 1, closed safe proposal(s): 0. Close reasons enabled: implemented_on_main,duplicate_or_superseded.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25043546141](https://github.com/openclaw/clawsweeper/actions/runs/25043546141)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3543 |
| Open PRs | 3465 |
| Open items total | 7008 |
| Reviewed files | 6570 |
| Unreviewed open items | 438 |
| Archived closed files | 13375 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3344 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3186 |
| Proposed PR closes | 1 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6530 |
| Proposed closes awaiting apply | 1 (0% of fresh reviews) |
| Closed by Codex apply | 10277 |
| Failed or stale reviews | 37 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 26/651 current (625 due, 4%) |
| Hourly hot item cadence (<7d) | 26/651 current (625 due, 4%) |
| Daily cadence coverage | 1455/4075 current (2620 due, 35.7%) |
| Daily PR cadence | 1075/2825 current (1750 due, 38.1%) |
| Daily new issue cadence (<30d) | 380/1250 current (870 due, 30.4%) |
| Weekly older issue cadence | 1837/1844 current (7 due, 99.6%) |
| Due now by cadence | 3690 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 08:57 UTC. Latest close: Apr 28, 2026, 08:53 UTC. Latest comment sync: Apr 28, 2026, 08:59 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 18 | 1 | 17 | 0 | 2 | 33 | 4 |
| Last hour | 58 | 4 | 54 | 0 | 3 | 59 | 6 |
| Last 24 hours | 2404 | 108 | 2296 | 16 | 56 | 1386 | 26 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73383](https://github.com/openclaw/openclaw/pull/73383) | feat(line): persist inbound media to ~/.openclaw/media/inbound/ | already implemented on main | Apr 28, 2026, 08:53 UTC | [records/openclaw-openclaw/closed/73383.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73383.md) |
| [#73418](https://github.com/openclaw/openclaw/issues/73418) | memory-wiki bridge still imports 0 artifacts with QMD backend on 2026.4.26 | duplicate or superseded | Apr 28, 2026, 08:45 UTC | [records/openclaw-openclaw/closed/73418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73418.md) |
| [#73413](https://github.com/openclaw/openclaw/issues/73413) | [Bug]: When the sub-agent compresses, the session yield incorrectly returns intermediate results, causing the system to fail to produce the correct outcome once compression is complete and execution proceeds. | already implemented on main | Apr 28, 2026, 08:38 UTC | [records/openclaw-openclaw/closed/73413.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73413.md) |
| [#73313](https://github.com/openclaw/openclaw/pull/73313) | fix #73204: release session write lock during LLM summarization to prevent message drops | already implemented on main | Apr 28, 2026, 07:50 UTC | [records/openclaw-openclaw/closed/73313.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73313.md) |
| [#73353](https://github.com/openclaw/openclaw/issues/73353) | 60s startup hang in sidecars.channels — synchronous plugin manifest re-discovery on every cold start (v2026.4.26) | already implemented on main | Apr 28, 2026, 07:06 UTC | [records/openclaw-openclaw/closed/73353.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73353.md) |
| [#73352](https://github.com/openclaw/openclaw/issues/73352) | MCP Client: Add OAuth2 Authorization Code Flow support for HTTP-based MCP servers | duplicate or superseded | Apr 28, 2026, 07:05 UTC | [records/openclaw-openclaw/closed/73352.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73352.md) |
| [#73348](https://github.com/openclaw/openclaw/issues/73348) | openclaw update can succeed while the running gateway stays on an older version, causing plugin/config version skew | already implemented on main | Apr 28, 2026, 06:50 UTC | [records/openclaw-openclaw/closed/73348.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73348.md) |
| [#73344](https://github.com/openclaw/openclaw/issues/73344) | [Bug]: /new on openai-codex/* (Responses API) returns \"One of input/previous_response_id/prompt/conversation_id must be provided\" — regression in 2026.4.26 | already implemented on main | Apr 28, 2026, 06:45 UTC | [records/openclaw-openclaw/closed/73344.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73344.md) |
| [#73331](https://github.com/openclaw/openclaw/issues/73331) | v2026.4.26: Gateway busy-loops on bundled openai SDK directory walk; stops accepting connections | already implemented on main | Apr 28, 2026, 06:22 UTC | [records/openclaw-openclaw/closed/73331.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73331.md) |
| [#73329](https://github.com/openclaw/openclaw/issues/73329) | [Bug]: Gateway hard-couples to OpenRouter + LiteLLM pricing fetches at boot; no opt-out | duplicate or superseded | Apr 28, 2026, 06:20 UTC | [records/openclaw-openclaw/closed/73329.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73329.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73432](https://github.com/openclaw/openclaw/issues/73432) | [Bug]: qmd embedding is never triggered per memory.qmd.update.interval/embedInterval | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73432.md) | complete | Apr 28, 2026, 08:57 UTC |
| [#73351](https://github.com/openclaw/openclaw/pull/73351) | fix(cli-runner): transfer bundle-MCP cleanup to live session lifecycle (#73244) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73351.md) | complete | Apr 28, 2026, 08:55 UTC |
| [#72645](https://github.com/openclaw/openclaw/pull/72645) | feat(diagnostics-otel): add per-message end-to-end OTel tracing across run/skill/tool/model | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72645.md) | complete | Apr 28, 2026, 08:52 UTC |
| [#73365](https://github.com/openclaw/openclaw/pull/73365) | fix: allow steer messages during active non-streaming runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73365.md) | complete | Apr 28, 2026, 08:52 UTC |
| [#71884](https://github.com/openclaw/openclaw/pull/71884) | fix: allow safe Windows companion node commands | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71884.md) | complete | Apr 28, 2026, 08:51 UTC |
| [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 28, 2026, 08:49 UTC |
| [#73429](https://github.com/openclaw/openclaw/pull/73429) | fix(plugin-sdk): backfill reasoning_content on all DeepSeek V4 assistant messages | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73429.md) | complete | Apr 28, 2026, 08:48 UTC |
| [#71027](https://github.com/openclaw/openclaw/pull/71027) | build(deps): bump useblacksmith/build-push-action from 2.1.0 to 2.2.0 in the actions group across 1 directory | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71027.md) | complete | Apr 28, 2026, 08:48 UTC |
| [#41991](https://github.com/openclaw/openclaw/pull/41991) | Google: show detailed Gemini CLI OAuth extraction failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41991.md) | complete | Apr 28, 2026, 08:47 UTC |
| [#73419](https://github.com/openclaw/openclaw/pull/73419) | fix(onboarding): skip redundant install prompt when only one source e… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73419.md) | complete | Apr 28, 2026, 08:47 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 08:59 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 463. Item numbers: 3,15,17,18,23,26,32,33,48,49,51,52,60,62,65,72,77,79,84,86,88,95,96,97,99,100,102,115,117,120,127,128,129,131,134,137,151,156,162,169,170,171,173,174,178,184,192,205,208,211,224,225,226,227,228,231,234,236,237,238,243,248,256,265,268,275,277,279,284,287,288,290,314,321,323,328,329,330,337,340,345,348,349,351,353,364,367,369,371,373,374,378,379,380,382,385,386,387,388,390,392,393,397,402,406,410,420,423,424,425,426,437,438,442,443,447,448,449,450,451,454,455,459,463,469,471,474,478,479,480,481,482,484,485,487,488,489,494,495,498,501,503,504,509,516,528,531,532,535,539,541,549,553,563,566,567,568,573,574,575,576,579,580,581,586,589,593,600,604,606,609,613,614,615,618,619,621,625,630,631,635,636,637,642,645,646,647,650,651,652,653,654,655,656,657,658,661,662,664,666,667,668,669,670,672,673,674,675,676,677,678,679,680,681,683,686,692,694,699,700,701,702,705,706,707,708,711,712,713,716,717,718,722,723,729,730,731,733,734,737,740,745,747,752,755,756,758,760,761,762,764,765,767,768,769,770,772,779,780,784,785,786,789,791,792,794,798,800,804,807,808,809,811,816,817,819,822,823,824,834,835,838,845,846,847,848,849,850,851,852,853,854,856,858,860,861,862,863,865,867,868,869,870,871,873,874,875,876,878,879,880,881,882,883,886,887,888,889,890,892,895,896,897,899,900,901,903,904,905,906,907,908,909,910,911,912,914,915,917,920,921,923,925,928,930,933,935,937,939,940,941,946,951,952,954,958,959,960,963,966,967,969,970,971,972,974,975,984,985,987,988,990,992,993,994,995,997,998,999,1001,1003,1004,1005,1006,1007,1010,1011,1015,1017,1018,1020,1024,1027,1028,1032,1033,1035,1036,1037,1039,1040,1041,1042,1043,1044,1045,1048,1049,1051,1052,1053,1054,1059,1062,1063,1068,1072,1080,1085,1088,1089,1090,1092,1094,1100,1103,1110,1114,1116,1119,1121,1122,1125,1129,1132,1133,1147,1148,1152,1153,1155,1156,1164,1168,1179,1180,1181,1186,1199,1201,1207,1208,1212,1217,1228,1230,1233,1256,1275,1287,1292,1368,1370,1371,1374,1376,1377,1378,1379,1381,1382,1383,1384,1385,1387,1389,1391,1392,1393,1394,1395,1396,1397,1398,1400,1401,1402,1403,1404,1405,1406,1407,1408,1409,1410,1411,1649,1671,1682,1690.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25041446779](https://github.com/openclaw/clawsweeper/actions/runs/25041446779)
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
| Daily cadence coverage | 229/229 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 208/208 current (0 due, 100%) |
| Weekly older issue cadence | 622/623 current (1 due, 99.8%) |
| Due now by cadence | 58 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 08:46 UTC. Latest close: Apr 28, 2026, 05:18 UTC. Latest comment sync: Apr 28, 2026, 08:59 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 14 | 0 | 14 | 0 | 0 | 20 | 0 |
| Last hour | 501 | 0 | 501 | 1 | 0 | 20 | 0 |
| Last 24 hours | 913 | 3 | 910 | 1 | 3 | 253 | 1 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1736](https://github.com/openclaw/clawhub/pull/1736) | Align hover stats with denormalized counters and fix seed digest stat drift | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1736.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1736.md) |
| [#1324](https://github.com/openclaw/clawhub/pull/1324) | feat: add --dry-run flag to package publish command | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1324.md) |
| [#1240](https://github.com/openclaw/clawhub/pull/1240) | fix: use esbuild minification for safari builds | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1240.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1240.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1376](https://github.com/openclaw/clawhub/issues/1376) | False positive: openclaw-workspace-sync flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1376.md) | complete | Apr 28, 2026, 08:46 UTC |
| [#1063](https://github.com/openclaw/clawhub/issues/1063) | False positive: freeguard-setup skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1063.md) | complete | Apr 28, 2026, 08:46 UTC |
| [#1379](https://github.com/openclaw/clawhub/issues/1379) | cogvideox-generator 发布失败 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1379.md) | complete | Apr 28, 2026, 08:46 UTC |
| [#994](https://github.com/openclaw/clawhub/issues/994) | [False positive flag on skill] VirusTotal shows \"Suspicious\" but 0/64 engines detect anything | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/994.md) | complete | Apr 28, 2026, 08:45 UTC |
| [#1052](https://github.com/openclaw/clawhub/issues/1052) | why Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1052.md) | complete | Apr 28, 2026, 08:45 UTC |
| [#933](https://github.com/openclaw/clawhub/issues/933) | new-stock-analyzer as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/933.md) | complete | Apr 28, 2026, 08:45 UTC |
| [#967](https://github.com/openclaw/clawhub/issues/967) | dianping-search flagged as suspicious - request manual review | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/967.md) | complete | Apr 28, 2026, 08:45 UTC |
| [#1152](https://github.com/openclaw/clawhub/issues/1152) | False Positive: temporal-kg-synthesizer flagged due to Cron Job (Background Memory Engine) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1152.md) | complete | Apr 28, 2026, 08:45 UTC |
| [#1400](https://github.com/openclaw/clawhub/issues/1400) | [Skill flagged] — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1400.md) | complete | Apr 28, 2026, 08:45 UTC |
| [#1015](https://github.com/openclaw/clawhub/issues/1015) | Why was skill Tavily Search (tavily-websearch) flagged as suspicious? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1015.md) | complete | Apr 28, 2026, 08:45 UTC |

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
