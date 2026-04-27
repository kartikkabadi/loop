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

Last dashboard update: Apr 27, 2026, 04:54 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 04:54 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 441. Item numbers: 17311,23096,33845,33914,38161,38162,42606,44886,47814,49692,50429,50506,51706,52875,54128,55037,55654,55757,58481,58775,59101,60981,61175,61279,62024,62099,64046,64086,64127,64436,64512,65319,65909,65919,65945,65963,66056,66081,66098,66101,66119,66138,66146,66150,66160,66169,66174,66178,66196,66198,66199,66200,66213,66225,66235,66238,66251,66255,66257,66263,66267,66272,66278,66279,66285,66287,66299,66303,66305,66312,66327,66339,66341,66344,66366,66367,66377,66385,66391,66392,66400,66409,66414,66415,66432,66436,66465,66467,66468,66478,66479,66489,66494,66498,66499,66509,66512,66515,66517,66521,66532,66534,66535,66543,66551,66552,66561,66573,66605,66612,66614,66631,66638,66646,66650,66656,66670,66672,66673,66675,66684,66685,66686,66687,66700,66701,66702,66705,66716,66720,66732,66744,66746,66747,66748,66749,66755,66761,66766,66769,66771,66773,66781,66783,66785,66786,66791,66795,66802,66804,66807,66828,66830,66832,66836,66838,66841,66846,66847,66862,66867,66874,66875,66891,66894,66904,66915,66920,66924,66926,66933,66934,66936,66937,66944,66946,66957,66977,66979,66988,66992,67000,67011,67016,67019,67031,67035,67036,67041,67050,67052,67053,67055,67060,67062,67063,67065,67069,67077,67088,67089,67090,67092,67097,67103,67108,67111,67113,67115,67116,67118,67122,67129,67136,67137,67152,67154,67175,67177,67181,67191,67192,67195,67197,67202,67203,67207,67209,67236,67243,67244,67248,67252,67259,67260,67273,67288,67290,67292,67304,67305,67306,67314,67328,67331,67332,67333,67335,67341,67345,67350,67363,67366,67369,67376,67378,67379,67381,67393,67394,67398,67403,67404,67405,67407,67413,67417,67419,67420,67423,67429,67431,67432,67433,67434,67438,67444,67446,67451,67460,67461,67466,67472,67477,67478,67480,67488,67493,67497,67503,67506,67511,67532,67539,67547,67551,67552,67568,67569,67572,67584,67587,67593,67594,67595,67618,67621,67623,67626,67629,67631,67637,67639,67655,67659,67660,67661,67662,67664,67669,67670,67671,67672,67680,67682,67687,67690,67692,67693,67694,67701,67702,67703,67706,67709,67716,67727,67728,67731,67734,67735,67750,67751,67758,67759,67761,67764,67766,67779,67781,67782,67783,67784,67792,67793,67796,67805,67817,67826,67832,67836,67841,67842,67843,67868,67872,67889,67910,67915,67916,67917,67924,67929,67935,67943,67946,67952,67959,67966,67967,67970,67971,67976,67977,67986,67988,67990,68010,68015,68019,68037,68041,68045,68046,68047,68054,68060,68061,68064,68065,68066,68070,68089,68101,68103,68105,68106,68109,68112,68113,68115,68116,68124,68126,68127,68129,68146,68149,68152,68154,68155,68160,68161,68162,68164,68170,68176,68179,68180,68181,68188,68196,68197,68204,68209,68222,68226,68227,68240,68257,68258,68264,68267,68276,68278,68279,68283,68293,68298,68300,68304,68307,68309,68311,68317,68338,68352,68381,68423,68780,68848,68942,69084,69583,70624,70638,70651,71040,71820,71902,72005,72069,72138,72216,72237,72251,72253,72254,72265,72276,72278,72284,72285,72286,72310,72315,72333,72350,72358,72369,72372,72396,72404,72416,72432.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24976502570](https://github.com/openclaw/clawsweeper/actions/runs/24976502570)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3658 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3556 |
| Open items total | 7214 |
| Reviewed files | 7000 |
| Unreviewed open items | 214 |
| Archived closed files | 12781 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3589 |
| Proposed issue closes | 16 (0.4% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3409 |
| Proposed PR closes | 11 (0.3% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6998 |
| Proposed closes awaiting apply | 27 (0.4% of fresh reviews) |
| Closed by Codex apply | 10103 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 224/743 current (519 due, 30.1%) |
| Hourly hot item cadence (<7d) | 224/743 current (519 due, 30.1%) |
| Daily cadence coverage | 4047/4392 current (345 due, 92.1%) |
| Daily PR cadence | 2734/2994 current (260 due, 91.3%) |
| Daily new issue cadence (<30d) | 1313/1398 current (85 due, 93.9%) |
| Weekly older issue cadence | 1865/1865 current (0 due, 100%) |
| Due now by cadence | 1078 |

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

Latest review: Apr 27, 2026, 04:39 UTC. Latest close: Apr 27, 2026, 03:51 UTC. Latest comment sync: Apr 27, 2026, 04:54 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 441 | 1 |
| Last hour | 995 | 27 | 968 | 0 | 0 | 939 | 5 |
| Last 24 hours | 8197 | 1567 | 6630 | 0 | 1404 | 2737 | 11 |

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
| [#41956](https://github.com/openclaw/openclaw/pull/41956) | fix(telegram): split watchdog stability fixes from #41883 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41956.md) | complete | Apr 27, 2026, 04:40 UTC |
| [#41957](https://github.com/openclaw/openclaw/pull/41957) | fix(auto-reply): split typing-timeout stability fix from #41883 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41957.md) | complete | Apr 27, 2026, 04:40 UTC |
| [#42052](https://github.com/openclaw/openclaw/pull/42052) | fix(backup): treat non-existent output paths as directories | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42052.md) | complete | Apr 27, 2026, 04:39 UTC |
| [#68283](https://github.com/openclaw/openclaw/pull/68283) | fix(approvals): back off native handler bootstrap retries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68283.md) | complete | Apr 27, 2026, 04:39 UTC |
| [#72315](https://github.com/openclaw/openclaw/issues/72315) | [Bug]: npm grammyjs   npm anthropic frequent disturbance shell popup in windows every 15 seconds | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72315.md) | complete | Apr 27, 2026, 04:39 UTC |
| [#42065](https://github.com/openclaw/openclaw/pull/42065) | UI: add global locale switch and complete zh-CN dashboard translations | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42065.md) | complete | Apr 27, 2026, 04:39 UTC |
| [#42007](https://github.com/openclaw/openclaw/pull/42007) | feat(feishu): add mentionTriggers support for text-based keyword triggers in groups | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42007.md) | complete | Apr 27, 2026, 04:39 UTC |
| [#42258](https://github.com/openclaw/openclaw/pull/42258) | fix: recover stuck Control UI chat runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42258.md) | complete | Apr 27, 2026, 04:39 UTC |
| [#41308](https://github.com/openclaw/openclaw/pull/41308) | feat(exec): add cloud execution provider (host=\"cloud\") | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41308.md) | complete | Apr 27, 2026, 04:39 UTC |
| [#41265](https://github.com/openclaw/openclaw/pull/41265) | fix(discord): preserve content-type and skip optimization for animated/WebP images | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41265.md) | complete | Apr 27, 2026, 04:39 UTC |

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
Protected proposed closes are reported only for active `items/` records because
archived `closed/` records are historical and cannot be applied.
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
