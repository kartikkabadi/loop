# ClawSweeper

ClawSweeper is the conservative OpenClaw maintenance bot for
`openclaw/openclaw`.

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

## Dashboard

Last dashboard update: Apr 27, 2026, 03:57 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 03:57 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 403. Item numbers: 19330,24754,25222,31407,39115,39137,42213,42637,42669,42819,45280,48512,50103,50799,51767,52249,52747,52776,54959,56582,56604,56613,56706,57326,58114,59245,60127,60602,60743,61076,61536,62956,62968,62974,63005,63015,63024,63034,63035,63069,63098,63101,63106,63107,63118,63121,63135,63139,63141,63145,63146,63148,63149,63167,63181,63263,63352,63356,63398,63411,63425,63432,63454,63460,63463,63481,63486,63488,63492,63497,63530,63535,63536,63552,63556,63558,63572,63578,63588,63591,63593,63610,63612,63626,63633,63634,63651,63652,63655,63663,63664,63666,63673,63680,63685,63691,63697,63700,63710,63734,63740,63757,63758,63759,63760,63769,63779,63780,63786,63803,63807,63819,63829,63840,63845,63855,63864,63870,63871,63881,63884,63892,63893,63901,63904,63919,63920,63924,63940,63941,63956,63959,63978,63990,63992,63998,64004,64015,64016,64022,64026,64027,64028,64030,64037,64044,64060,64065,64081,64102,64103,64112,64121,64126,64129,64139,64148,64150,64168,64175,64179,64181,64182,64187,64193,64199,64201,64205,64212,64213,64217,64220,64224,64236,64253,64260,64262,64267,64268,64271,64274,64281,64293,64294,64299,64301,64310,64315,64317,64322,64327,64334,64344,64347,64362,64365,64375,64383,64384,64399,64400,64408,64411,64413,64416,64426,64427,64429,64438,64443,64448,64463,64472,64473,64483,64486,64490,64503,64507,64530,64540,64541,64545,64546,64555,64556,64559,64593,64604,64607,64609,64611,64613,64622,64624,64625,64633,64639,64640,64647,64649,64651,64653,64656,64658,64664,64673,64676,64684,64695,64696,64699,64703,64707,64708,64714,64715,64717,64718,64719,64720,64721,64726,64733,64734,64749,64758,64760,64767,64768,64773,64782,64783,64784,64800,64805,64807,64810,64813,64818,64820,64825,64830,64831,64832,64846,64874,64879,64881,64883,64887,64891,64901,64902,64903,64921,64929,64934,64946,64950,64957,64960,64962,64970,64973,64983,64986,64988,64993,65005,65007,65011,65013,65030,65036,65037,65040,65058,65059,65066,65095,65109,65111,65123,65130,65131,65134,65141,65143,65149,65156,65161,65164,65165,65168,65169,65177,65178,65179,65180,65185,65187,65190,65194,65198,65199,65201,65209,65212,65213,65223,65235,65239,65242,65251,65252,65258,65260,65262,65270,65271,65279,65284,65293,65301,65305,65307,65312,65316,65317,65326,65329,65331,65333,65345,65353,65355,65358,65359,65364,65370,65374,65375,65381,65382,65383,65384,65398,65404,65405,65408,65409,65414,65423,65425,65433,65435,65438,65444,65445,65452,65477,65480,65502,65506,65509,65522,65525,65536,65538,65541,65544,65547,65553,65557,65563,65565,65567,65574,65575,65600,65606,65619,65623,65624,65636,65637,65640,65641,65642,65643,65650,65655,65656,65668,65669,65686,65689,65692,65704,65707,65720,65729,65733,65736,65737,65741,65745,65746,65751,65767,65768,65770,65773,65776,65782,65783,65786,65792,65799,65802,65825,65839,65851,65859,65860,65862,65868,65870,65886,65892,65894,65898,65906,65914,65923,65936,65937,65939,65957,65958,66020,66023,66041,66115,66123,66184,66252,66459,68845,69548,69998,71235,71924,71961,72149,72189,72201,72219,72220.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24975161672](https://github.com/openclaw/clawsweeper/actions/runs/24975161672)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3655 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3549 |
| Open items total | 7204 |
| Reviewed files | 7014 |
| Unreviewed open items | 190 |
| Archived closed files | 12767 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3590 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3412 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7002 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10103 |
| Failed or stale reviews | 7 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 38/749 current (711 due, 5.1%) |
| Hourly hot item cadence (<7d) | 38/749 current (711 due, 5.1%) |
| Daily cadence coverage | 3968/4401 current (433 due, 90.2%) |
| Daily PR cadence | 2775/3002 current (227 due, 92.4%) |
| Daily new issue cadence (<30d) | 1193/1399 current (206 due, 85.3%) |
| Weekly older issue cadence | 1864/1864 current (0 due, 100%) |
| Due now by cadence | 1334 |

### Audit Health

<!-- clawsweeper-audit:start -->
Last audit: Apr 27, 2026, 01:06 UTC

Status: **Action needed**

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 7235 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 85 |
| Missing protected open records | 2 |
| Missing recently-created open records | 26 |
| Archived records that are open again | 0 |
| Stale item records | 7 |
| Duplicate records | 0 |
| Protected proposed closes | 2 |
| Stale reviews | 5 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#57413](https://github.com/openclaw/openclaw/pull/57413) | Protected proposed close | feat(whatsapp): add reply quoting via replyToMode | closed/57413.md |
| [#60460](https://github.com/openclaw/openclaw/pull/60460) | Protected proposed close | Enforce browser profile CDP policy | closed/60460.md |
| [#40945](https://github.com/openclaw/openclaw/issues/40945) | Stale review | Control UI chat markdown only renders data URI images, not remote https image URLs | items/40945.md |
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 27, 2026, 03:41 UTC. Latest close: Apr 27, 2026, 02:30 UTC. Latest comment sync: Apr 27, 2026, 03:57 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 403 | 1 |
| Last hour | 540 | 5 | 535 | 0 | 0 | 440 | 4 |
| Last 24 hours | 8294 | 1625 | 6669 | 4 | 1675 | 2220 | 9 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#70597](https://github.com/openclaw/openclaw/pull/70597) | yuanbao channel | belongs on ClawHub | Apr 27, 2026, 03:51 UTC | [closed/70597.md](https://github.com/openclaw/clawsweeper/blob/main/closed/70597.md) |
| [#65669](https://github.com/openclaw/openclaw/pull/65669) | feat: support custom job IDs in cron add command | duplicate or superseded | Apr 27, 2026, 03:50 UTC | [closed/65669.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65669.md) |
| [#64653](https://github.com/openclaw/openclaw/pull/64653) | fix: honor provider-prefixed configured model ids for routed providers | already implemented on main | Apr 27, 2026, 03:50 UTC | [closed/64653.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64653.md) |
| [#64201](https://github.com/openclaw/openclaw/issues/64201) | [Bug]: OpenClaw: Crash loop on plugin config reload (ECONNREFUSED on loopback port 18789) | already implemented on main | Apr 27, 2026, 03:50 UTC | [closed/64201.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64201.md) |
| [#63779](https://github.com/openclaw/openclaw/issues/63779) | ACP completion delivery-mirror message (assistant role) does not activate next turn after sessions_yield | already implemented on main | Apr 27, 2026, 03:50 UTC | [closed/63779.md](https://github.com/openclaw/clawsweeper/blob/main/closed/63779.md) |
| [#65938](https://github.com/openclaw/openclaw/pull/65938) | docs(providers): add Bedrock Mantle to provider index pages | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65938.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65938.md) |
| [#65813](https://github.com/openclaw/openclaw/issues/65813) | openai-codex auth profile rotation burns through both profiles before escalating to model fallback | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65813.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65813.md) |
| [#65724](https://github.com/openclaw/openclaw/issues/65724) | [Windows] DeprecationWarning: Passing args to child process with shell option true | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65724.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65724.md) |
| [#65675](https://github.com/openclaw/openclaw/pull/65675) | docs: add 2MB size limit note for avatar images | duplicate or superseded | Apr 27, 2026, 02:30 UTC | [closed/65675.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65675.md) |
| [#65589](https://github.com/openclaw/openclaw/pull/65589) | feat(memory-core): dreaming circuit breaker to prevent runaway cost and data corruption | duplicate or superseded | Apr 27, 2026, 02:30 UTC | [closed/65589.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65589.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#65655](https://github.com/openclaw/openclaw/pull/65655) | fix: harden Mattermost slash callback auth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65655.md) | complete | Apr 27, 2026, 03:41 UTC |
| [#65374](https://github.com/openclaw/openclaw/issues/65374) | Bug: Built-in dreaming system contaminates agent identity in multi-agent setups | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65374.md) | complete | Apr 27, 2026, 03:41 UTC |
| [#66041](https://github.com/openclaw/openclaw/pull/66041) | fix(telegram): keep ack reactions without mentions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66041.md) | complete | Apr 27, 2026, 03:41 UTC |
| [#65906](https://github.com/openclaw/openclaw/pull/65906) | feat: Add {context} and {contextPercent} template variables for response prefix | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65906.md) | complete | Apr 27, 2026, 03:41 UTC |
| [#65692](https://github.com/openclaw/openclaw/pull/65692) | tool result microcompress | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65692.md) | complete | Apr 27, 2026, 03:41 UTC |
| [#72189](https://github.com/openclaw/openclaw/pull/72189) | fix(voice-call): Google Live tool responses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72189.md) | complete | Apr 27, 2026, 03:40 UTC |
| [#65870](https://github.com/openclaw/openclaw/issues/65870) | [Bug]: Brave Search docs URL in code points to legacy path instead of canonical location | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65870.md) | complete | Apr 27, 2026, 03:40 UTC |
| [#65279](https://github.com/openclaw/openclaw/issues/65279) | [Bug]: MiniMax-M2.7 10+ second delay in message preprocessing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65279.md) | complete | Apr 27, 2026, 03:40 UTC |
| [#65860](https://github.com/openclaw/openclaw/issues/65860) | [Bug]: Error message references nonexistent docs anchor `tools/plugin#runtime-helpers` | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65860.md) | complete | Apr 27, 2026, 03:40 UTC |
| [#65733](https://github.com/openclaw/openclaw/issues/65733) | [Bug]: Plugin discovery via safeRealpathSync takes ~20 minutes during gateway startup on Windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65733.md) | complete | Apr 27, 2026, 03:40 UTC |

</details>

## How It Works

ClawSweeper is split into a scheduler, a review lane, and an apply lane.

### Scheduler

The scheduler decides what to scan and how often. New and active items get more
attention; older quiet items fall back to a slower cadence.

- hot/new and recently active items are checked hourly, with a 5-minute intake
  schedule for the newest queue edge
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
- Each shard checks out `openclaw/openclaw` at `main`.
- Codex reviews with `gpt-5.5`, high reasoning, fast service tier, and a
  10-minute per-item timeout.
- Each item becomes `items/<number>.md` with the decision, evidence, suggested
  comment, runtime metadata, and GitHub snapshot hash.
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
- Moves closed or already-closed reports to `closed/<number>.md`.
- Moves reopened archived reports back to `items/<number>.md` as stale.
- Commits checkpoints and dashboard heartbeats during long runs.

Apply wakes every 15 minutes, no-ops when there are no unchanged
high-confidence close proposals, and narrows scheduled runs to the currently
eligible proposal list so idle runs do not scan unrelated keep-open records.
It defaults to all item kinds, no age floor, a 2-second close delay, and 50
fresh closes per checkpoint. If it reaches the requested limit, it queues
another apply run with the same settings.

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
- CI makes the OpenClaw checkout read-only for reviews.
- Reviews fail if Codex leaves tracked or untracked changes behind.
- Snapshot changes block apply unless the only change is the bot’s own review
  comment.

### Audit

`npm run audit` compares live GitHub state with generated records without moving
files. It reports missing open records, archived open records, stale records,
duplicates, protected-label proposed closes, and stale review-status records.
Missing open records are classified as eligible, maintainer-authored, protected,
or recently created so strict audit mode can flag actionable drift without
treating expected queue lag or excluded items as failures.
Use `--update-dashboard` to publish the latest audit health into this README
without making every normal dashboard heartbeat scan all open GitHub items.
The workflow refreshes Audit Health on a separate six-hour schedule, and it can
be run manually with `audit_dashboard=true`.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 100 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run audit -- --max-pages 250 --sample-limit 25 --update-dashboard
npm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20 --apply-kind all
```

Sync durable review comments without closing:

```bash
source ~/.profile
npm run apply-decisions -- --sync-comments-only --comment-sync-min-age-days 7 --processed-limit 1000 --limit 0
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later. Scheduled apply runs process both issues and pull requests by default; pass `apply_kind=issue` or `apply_kind=pull_request` to narrow a manual run.

## Checks

```bash
npm run check
npm run oxformat
```

`oxformat` is an alias for `oxfmt`; there is no separate `oxformat` npm package.

## GitHub Actions Setup

Required secrets:

- `OPENAI_API_KEY`: OpenAI API key used to log Codex in before review shards run.
- `CODEX_API_KEY`: optional compatibility alias for the same key during the login check.
- `OPENCLAW_GH_TOKEN`: optional fallback GitHub token for read-heavy `openclaw/openclaw` scans and artifact publish reconciliation when the GitHub App token is unavailable.
- `CLAWSWEEPER_APP_ID`: GitHub App ID for `openclaw-ci`. Currently `3306130`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `openclaw-ci`; plan/review jobs use a short-lived GitHub App installation token for read-heavy `openclaw/openclaw` API calls, and apply/comment-sync jobs use the app token for comments and closes.

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
- write access to `openclaw/openclaw` issues and pull requests
- optional Actions write on `openclaw/clawsweeper` for app-token-based run
  cancellation or dispatch
