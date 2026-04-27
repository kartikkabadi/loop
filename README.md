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

Last dashboard update: Apr 27, 2026, 01:40 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 01:40 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 488. Item numbers: 10356,18860,33975,39245,40209,40215,40247,40252,40255,40392,40522,40945,43793,44395,46303,46812,47604,47994,49431,50818,50982,52115,52861,52894,52928,52963,52972,53008,53023,53032,53056,53088,53092,53107,53145,53168,53185,53186,53198,53208,53228,53242,53250,53268,53274,53286,53308,53311,53319,53321,53345,53376,53378,53387,53390,53399,53406,53408,53416,53430,53439,53447,53469,53475,53482,53486,53500,53525,53531,53540,53548,53550,53556,53590,53599,53600,53628,53639,53641,53645,53654,53669,53678,53679,53684,53732,53742,53745,53760,53763,53772,53774,53783,53786,53798,53810,53852,53858,53881,53889,53890,53895,53917,53926,53932,53941,53942,53943,53958,53969,53982,53989,53998,54014,54041,54128,54138,54142,54149,54150,54153,54155,54157,54164,54166,54176,54177,54178,54192,54199,54200,54207,54224,54227,54240,54243,54253,54254,54278,54289,54296,54299,54300,54310,54311,54342,54373,54378,54381,54383,54397,54405,54408,54413,54416,54435,54439,54463,54470,54488,54496,54504,54507,54508,54518,54519,54524,54529,54531,54535,54559,54565,54577,54578,54607,54622,54634,54635,54658,54663,54665,54710,54714,54732,54736,54740,54743,54757,54792,54794,54799,54810,54812,54825,54837,54841,54853,54854,54864,54877,54878,54879,54882,54895,54909,54918,54919,54928,54972,54996,55027,55036,55044,55046,55047,55059,55063,55071,55074,55095,55099,55126,55163,55196,55208,56532,58808,58823,60406,62872,62874,62877,62890,62891,62906,62910,62917,62924,62927,62937,62938,62939,62944,62950,62954,62957,62962,62966,62976,62981,62985,62989,62991,63003,63007,63011,63025,63030,63037,63038,63045,63046,63050,63057,63061,63062,63073,63082,63096,63112,63120,63125,63133,63418,64318,64500,64953,65302,65824,66399,66792,66911,66912,66913,67020,67463,67509,68280,68554,69051,69310,69312,69379,69400,69527,69799,69894,70014,70056,70110,70156,70191,70280,70296,70301,70309,70319,70330,70334,70368,70434,70440,70451,70472,70493,70512,70518,70563,70568,70584,70586,70623,70628,70682,70733,70734,70757,70790,70811,70812,70813,70823,70856,70857,70876,70877,70884,70886,70888,70895,70900,70903,70905,70918,70928,70934,70941,70960,70971,70986,70990,70991,71027,71063,71066,71069,71099,71116,71132,71136,71140,71142,71148,71154,71156,71157,71170,71185,71190,71195,71203,71211,71216,71227,71235,71237,71243,71249,71273,71285,71301,71324,71326,71327,71329,71335,71336,71349,71350,71354,71382,71398,71412,71416,71417,71428,71429,71452,71459,71469,71487,71491,71495,71503,71517,71536,71537,71545,71546,71550,71553,71555,71563,71566,71568,71569,71573,71575,71581,71582,71583,71586,71592,71593,71594,71605,71609,71611,71619,71626,71630,71631,71633,71638,71646,71648,71651,71652,71653,71656,71669,71671,71677,71678,71682,71689,71696,71848,71857,71948,71964,71988,72005,72019,72021,72027,72053,72076,72084,72097,72121,72128,72139,72158,72159,72162,72209,72229,72239,72245,72266,72268,72281,72287,72297,72301,72314,72319,72342,72343,72351,72352,72355,72357,72361,72364,72366,72367,72373,72376,72381,72382,72383,72384,72386,72423,72428,72432,72434,72436.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24971849359](https://github.com/openclaw/clawsweeper/actions/runs/24971849359)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3683 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3555 |
| Open items total | 7238 |
| Reviewed files | 7114 |
| Unreviewed open items | 124 |
| Archived closed files | 12667 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3657 |
| Proposed issue closes | 24 (0.7% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3455 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7112 |
| Proposed closes awaiting apply | 26 (0.4% of fresh reviews) |
| Closed by Codex apply | 10025 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 208/766 current (558 due, 27.2%) |
| Hourly hot item cadence (<7d) | 208/766 current (558 due, 27.2%) |
| Daily cadence coverage | 4127/4461 current (334 due, 92.5%) |
| Daily PR cadence | 2867/3029 current (162 due, 94.7%) |
| Daily new issue cadence (<30d) | 1260/1432 current (172 due, 88%) |
| Weekly older issue cadence | 1887/1887 current (0 due, 100%) |
| Due now by cadence | 1016 |

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

Latest review: Apr 27, 2026, 01:24 UTC. Latest close: Apr 27, 2026, 01:05 UTC. Latest comment sync: Apr 27, 2026, 01:40 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 487 | 10 |
| Last hour | 500 | 29 | 471 | 0 | 7 | 494 | 10 |
| Last 24 hours | 8634 | 1770 | 6864 | 0 | 2010 | 2547 | 14 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72430](https://github.com/openclaw/openclaw/issues/72430) | [Bug]: Windows: Slack channel fails to start with ESM URL error (`c:` protocol) in v2026.4.24 | already implemented on main | Apr 27, 2026, 01:05 UTC | [closed/72430.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72430.md) |
| [#72429](https://github.com/openclaw/openclaw/issues/72429) | [Bug]: Duplication of messages with minmax 2.7 | already implemented on main | Apr 27, 2026, 01:05 UTC | [closed/72429.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72429.md) |
| [#72395](https://github.com/openclaw/openclaw/issues/72395) | [Bug]: [Windows] ERR_UNSUPPORTED_ESM_URL_SCHEME — Discord channel and browser plugin fail to load on v2026.4.24 | already implemented on main | Apr 27, 2026, 01:05 UTC | [closed/72395.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72395.md) |
| [#72184](https://github.com/openclaw/openclaw/issues/72184) | delivery-recovery on restart sends raw session context blob instead of original message | already implemented on main | Apr 27, 2026, 01:05 UTC | [closed/72184.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72184.md) |
| [#71860](https://github.com/openclaw/openclaw/pull/71860) | fix(heartbeat): keep successful exec completions internal | duplicate or superseded | Apr 27, 2026, 01:05 UTC | [closed/71860.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71860.md) |
| [#71084](https://github.com/openclaw/openclaw/issues/71084) | Question: should CLI-backed agents be allowed to trigger memoryFlush / preflightCompaction? | duplicate or superseded | Apr 27, 2026, 01:05 UTC | [closed/71084.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71084.md) |
| [#71018](https://github.com/openclaw/openclaw/issues/71018) | openclaw-lark 插件工具执行步骤不显示（工具執行区域始终显示'暂无工具步骤'） | already implemented on main | Apr 27, 2026, 01:05 UTC | [closed/71018.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71018.md) |
| [#72420](https://github.com/openclaw/openclaw/issues/72420) | Bonjour plugin crash-loops gateway on hosts without working multicast (2026.4.24) | already implemented on main | Apr 27, 2026, 00:02 UTC | [closed/72420.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72420.md) |
| [#72415](https://github.com/openclaw/openclaw/issues/72415) | [Bug]: ERR_MODULE_NOT_FOUND 'openclaw' still happening on 2026.4.22 (Telegram channel + scheduled cron) — same root cause as #71484, fix appears incomplete on upgrade path | already implemented on main | Apr 27, 2026, 00:02 UTC | [closed/72415.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72415.md) |
| [#72403](https://github.com/openclaw/openclaw/pull/72403) | Feature/bucky jarvis phase1 | belongs on ClawHub | Apr 27, 2026, 00:02 UTC | [closed/72403.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72403.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71592](https://github.com/openclaw/openclaw/issues/71592) | TUI local mode advertises /status and /compact but falls through to model text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71592.md) | complete | Apr 27, 2026, 01:24 UTC |
| [#70812](https://github.com/openclaw/openclaw/pull/70812) | fix: ignore trajectory sidecars in orphan transcript scans (Fixes #70680) | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/items/70812.md) | complete | Apr 27, 2026, 01:22 UTC |
| [#72383](https://github.com/openclaw/openclaw/pull/72383) | [plugin sdk] Add workflow action, outbound, scheduler, and retry host seams | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72383.md) | complete | Apr 27, 2026, 01:22 UTC |
| [#71157](https://github.com/openclaw/openclaw/issues/71157) | [Feature]: Support WhatsApp disappearing-message expiration for outbound replies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71157.md) | complete | Apr 27, 2026, 01:22 UTC |
| [#72266](https://github.com/openclaw/openclaw/pull/72266) | [tts][personality] Gateway display + status surfaces for emotion mode (#69051 PR-D of 4) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72266.md) | complete | Apr 27, 2026, 01:22 UTC |
| [#72139](https://github.com/openclaw/openclaw/issues/72139) | Control UI auth retry loop + blocking chat.history causes Slack Socket Mode disconnects | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72139.md) | complete | Apr 27, 2026, 01:22 UTC |
| [#70876](https://github.com/openclaw/openclaw/pull/70876) | fix: include MCP server tools in /tools inventory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70876.md) | complete | Apr 27, 2026, 01:22 UTC |
| [#71569](https://github.com/openclaw/openclaw/issues/71569) | Mattermost streaming config: documented but not implemented + notification UX bug | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71569.md) | complete | Apr 27, 2026, 01:21 UTC |
| [#71652](https://github.com/openclaw/openclaw/pull/71652) | fix: refuse local tsgo under host pressure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71652.md) | complete | Apr 27, 2026, 01:21 UTC |
| [#71626](https://github.com/openclaw/openclaw/pull/71626) | test(cli-runner): bound argv length for large Claude system prompts (#71600) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71626.md) | complete | Apr 27, 2026, 01:21 UTC |

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
