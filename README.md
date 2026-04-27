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

Last dashboard update: Apr 27, 2026, 04:26 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 04:26 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 404. Item numbers: 10356,18860,33975,39245,39604,40209,40215,40247,40252,40255,40392,40522,40560,40945,43793,44395,46303,46812,47604,49431,50818,50982,52115,52861,52894,52928,52963,52972,53008,53023,53056,53088,53092,53107,53145,53185,53186,53198,53208,53228,53242,53250,53268,53274,53286,53308,53311,53319,53321,53345,53376,53378,53387,53390,53399,53406,53408,53439,53447,53469,53475,53482,53486,53525,53531,53540,53548,53550,53556,53590,53599,53600,53628,53639,53641,53645,53654,53669,53678,53684,53732,53742,53745,53760,53763,53772,53774,53783,53786,53798,53810,53852,53858,53881,53889,53890,53895,53917,53932,53941,53942,53943,53958,53969,53982,53989,53998,54014,54041,54138,54149,54153,54155,54157,54164,54166,54176,54177,54178,54192,54200,54207,54224,54227,54240,54243,54253,54278,54289,54296,54299,54300,54310,54311,54342,54373,54378,54383,54397,54405,54408,54416,54435,54439,54463,54470,54488,54496,54504,54507,54508,54518,54519,54524,54529,54531,54559,54565,54577,54578,54607,54622,54634,54635,54663,54665,54710,54714,54732,54736,54740,54757,54792,54794,54799,54810,54812,54825,54841,54853,54864,54877,54878,54879,54882,54895,54909,54918,54919,54928,54972,54996,55027,55036,55044,55046,55047,55071,55099,55126,55196,55208,55652,56532,58808,58823,60406,60409,60497,60848,62548,62872,62874,62877,62891,62906,62910,62917,62924,62927,62937,62938,62939,62944,62950,62954,62957,62962,62966,62976,62981,62985,62989,63003,63007,63011,63025,63030,63037,63038,63050,63057,63061,63062,63073,63082,63096,63112,63120,63125,63133,63418,64318,64500,64953,65023,65039,65097,65302,65486,65490,65504,65592,65670,65685,65687,65691,65726,65727,65750,65771,65772,65774,65777,65824,65828,65852,65855,65933,65940,65962,65974,65983,65991,65992,66000,66010,66067,66091,66093,66110,66126,66147,66399,66546,66792,66865,66911,66912,66913,67020,67157,67463,67509,68280,68554,68920,69051,69310,69312,69379,69527,69799,69894,70014,70056,70110,70156,70191,70280,70296,70301,70309,70319,70330,70334,70368,70434,70440,70451,70472,70493,70512,70518,70563,70568,70584,70586,70623,70628,70682,70733,70734,70757,70790,70811,70812,70813,70823,70856,70857,70876,70877,70884,70886,70888,70895,70900,70903,70905,70918,70928,70934,70941,70960,70971,70986,70990,70991,71027,71063,71066,71069,71099,71116,71132,71136,71140,71142,71154,71156,71157,71170,71185,71190,71195,71203,71211,71216,71227,71237,71243,71249,71273,71285,71301,71324,71326,71327,71329,71335,71336,71349,71350,71382,71396,71398,71412,71416,71417,71428,71429,71452,71459,71469,71487,71491,71495,71503,71517,71536,71537,71545,71546,71550,71553,71555,71563,71566,71568,71569,71573,71575,71581,71582,71583,71586,71590,71592,71593,71594,71605,71609,71611,71619,71626,71630,71631,71633,71638,71646,71648,71651,71652,71653,71656,71669,71671,71677,71678,71682,71689,71696,71857,71948,71964,71988,72019,72021,72027,72028,72053,72076,72084,72097,72121,72128,72139,72159,72209,72229,72239,72245,72266,72268,72281,72287,72294,72297,72301,72314,72319,72342,72343,72351,72352,72355,72357,72361,72367.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24975806525](https://github.com/openclaw/clawsweeper/actions/runs/24975806525)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3657 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3551 |
| Open items total | 7208 |
| Reviewed files | 7004 |
| Unreviewed open items | 204 |
| Archived closed files | 12777 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3589 |
| Proposed issue closes | 2 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3411 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7000 |
| Proposed closes awaiting apply | 4 (0.1% of fresh reviews) |
| Closed by Codex apply | 10103 |
| Failed or stale reviews | 4 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 204/747 current (543 due, 27.3%) |
| Hourly hot item cadence (<7d) | 204/747 current (543 due, 27.3%) |
| Daily cadence coverage | 3714/4393 current (679 due, 84.5%) |
| Daily PR cadence | 2632/2997 current (365 due, 87.8%) |
| Daily new issue cadence (<30d) | 1082/1396 current (314 due, 77.5%) |
| Weekly older issue cadence | 1864/1864 current (0 due, 100%) |
| Due now by cadence | 1426 |

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

Latest review: Apr 27, 2026, 04:10 UTC. Latest close: Apr 27, 2026, 03:51 UTC. Latest comment sync: Apr 27, 2026, 04:25 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 404 | 4 |
| Last hour | 1007 | 9 | 998 | 0 | 3 | 827 | 7 |
| Last 24 hours | 7974 | 1583 | 6391 | 1 | 1535 | 2462 | 13 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#70597](https://github.com/openclaw/openclaw/pull/70597) | yuanbao channel | belongs on ClawHub | Apr 27, 2026, 03:51 UTC | [closed/70597.md](https://github.com/openclaw/clawsweeper/blob/main/closed/70597.md) |
| [#65669](https://github.com/openclaw/openclaw/pull/65669) | feat: support custom job IDs in cron add command | duplicate or superseded | Apr 27, 2026, 03:50 UTC | [closed/65669.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65669.md) |
| [#64653](https://github.com/openclaw/openclaw/pull/64653) | fix: honor provider-prefixed configured model ids for routed providers | already implemented on main | Apr 27, 2026, 03:50 UTC | [closed/64653.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64653.md) |
| [#65938](https://github.com/openclaw/openclaw/pull/65938) | docs(providers): add Bedrock Mantle to provider index pages | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65938.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65938.md) |
| [#65813](https://github.com/openclaw/openclaw/issues/65813) | openai-codex auth profile rotation burns through both profiles before escalating to model fallback | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65813.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65813.md) |
| [#65724](https://github.com/openclaw/openclaw/issues/65724) | [Windows] DeprecationWarning: Passing args to child process with shell option true | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65724.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65724.md) |
| [#65675](https://github.com/openclaw/openclaw/pull/65675) | docs: add 2MB size limit note for avatar images | duplicate or superseded | Apr 27, 2026, 02:30 UTC | [closed/65675.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65675.md) |
| [#65589](https://github.com/openclaw/openclaw/pull/65589) | feat(memory-core): dreaming circuit breaker to prevent runaway cost and data corruption | duplicate or superseded | Apr 27, 2026, 02:30 UTC | [closed/65589.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65589.md) |
| [#71848](https://github.com/openclaw/openclaw/issues/71848) | [SRE] Gateway SIGABRT (134) on macOS launchd (mini-lobby) | already implemented on main | Apr 27, 2026, 02:04 UTC | [closed/71848.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71848.md) |
| [#71148](https://github.com/openclaw/openclaw/issues/71148) | Memory leak: Ajv `.compile()` per call in `sharedAjv` (and `ajv`) leaks SchemaEnv/run closures | already implemented on main | Apr 27, 2026, 02:04 UTC | [closed/71148.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71148.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71429](https://github.com/openclaw/openclaw/issues/71429) | [Bug] Telegram gateway drops in-flight messages on sendChatAction network failure during hot reload | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71429.md) | complete | Apr 27, 2026, 04:10 UTC |
| [#71417](https://github.com/openclaw/openclaw/issues/71417) | `openclaw agent` defaults --channel to last, silently resumes most recent session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71417.md) | complete | Apr 27, 2026, 04:10 UTC |
| [#71066](https://github.com/openclaw/openclaw/issues/71066) | Telegram subsystem: getUpdates polling silently non-functional despite reachable API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71066.md) | complete | Apr 27, 2026, 04:09 UTC |
| [#72209](https://github.com/openclaw/openclaw/pull/72209) | Add passive session recovery checkpoints | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72209.md) | complete | Apr 27, 2026, 04:09 UTC |
| [#71653](https://github.com/openclaw/openclaw/pull/71653) | refactor: trim reply prompt hot path plumbing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71653.md) | complete | Apr 27, 2026, 04:09 UTC |
| [#71195](https://github.com/openclaw/openclaw/issues/71195) | feat(talk/macOS): add OpenAI Realtime (speech-to-speech) path for Talk Mode — parity with the voice-call plugin's phone experience | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71195.md) | complete | Apr 27, 2026, 04:08 UTC |
| [#71546](https://github.com/openclaw/openclaw/issues/71546) | Discord ingest lag of 100–400 s on stable connection persists after PR #68159 / 2026.4.1 reconnect-ownership change | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71546.md) | complete | Apr 27, 2026, 04:08 UTC |
| [#71327](https://github.com/openclaw/openclaw/pull/71327) | fix(line): require explicit wildcard for open DMs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71327.md) | complete | Apr 27, 2026, 04:08 UTC |
| [#71677](https://github.com/openclaw/openclaw/issues/71677) | [Feature]: | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71677.md) | complete | Apr 27, 2026, 04:08 UTC |
| [#71682](https://github.com/openclaw/openclaw/issues/71682) | long model timeouts . | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71682.md) | complete | Apr 27, 2026, 04:08 UTC |

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
