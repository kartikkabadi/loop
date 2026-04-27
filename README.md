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

Last dashboard update: Apr 27, 2026, 05:51 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 05:51 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 386. Item numbers: 10356,18860,19330,24754,31407,33975,39245,39604,40209,40215,40247,40252,40255,40392,40522,40560,40945,42637,43793,44395,46303,46812,48512,49431,50103,50818,50982,51767,52115,52249,52747,52861,52894,52928,52963,52972,53008,53023,53056,53088,53092,53107,53145,53185,53186,53208,53228,53242,53250,53268,53274,53286,53308,53311,53319,53321,53345,53376,53378,53387,53390,53399,53406,53408,53439,53447,53469,53475,53482,53486,53525,53531,53540,53548,53550,53556,53590,53599,53628,53639,53645,53669,53684,53732,53742,53745,53763,53772,53774,53783,53786,53798,53852,53858,53881,53889,53890,53895,53932,53941,53942,53958,53982,53998,54014,54138,54149,54155,54157,54164,54166,54177,54178,54192,54224,54240,54253,54289,54299,54300,54310,54311,54373,54378,54383,54397,54435,54439,54463,54470,54504,54507,54508,54559,54565,54622,54714,54732,54740,54794,54841,54853,54877,54878,54879,54882,54909,54959,55027,55044,55046,55099,55208,55652,56532,56604,56613,57326,58808,60127,60406,60409,60602,60848,61076,62938,62974,63005,63024,63061,63098,63112,63118,63120,63135,63141,63146,63149,63263,63352,63356,63398,63411,63425,63432,63460,63463,63486,63488,63492,63497,63535,63556,63578,63588,63591,63610,63612,63633,63634,63651,63655,63663,63664,63666,63673,63685,63691,63697,63700,63734,63740,63757,63758,63759,63760,63780,63786,63829,63840,63845,63855,63864,63870,63871,63881,63884,63892,63901,63904,63920,63924,63941,63990,63998,64004,64015,64022,64026,64028,64030,64037,64044,64081,64102,64103,64112,64121,64126,64129,64139,64148,64150,64168,64175,64179,64181,64182,64193,64199,64205,64212,64213,64217,64220,64224,64236,64253,64260,64262,64267,64268,64274,64281,64293,64294,64299,64301,64310,64315,64317,64322,64327,64334,64344,64347,64362,64365,64375,64383,64384,64399,64400,64408,64411,64413,64416,64426,64427,64429,64438,64443,64448,64463,64472,64473,64483,64486,64490,64503,64507,64530,64540,64546,64555,64556,64559,64593,64604,64607,64609,64611,64613,64622,64624,64625,64633,64639,64640,64647,64649,64651,64656,64658,64664,64673,64676,64684,64695,64696,64699,64703,64707,64714,64715,64717,64718,64719,64720,64721,64726,64733,64734,64749,64758,64760,64767,64768,64773,64782,64783,64784,64800,64805,64807,64810,64813,64818,64820,64825,64830,64831,64832,64846,64874,64879,64881,64883,64887,64891,64901,64902,64903,64921,64929,64934,64946,64950,64957,64960,64962,64970,64973,64983,64986,64988,64993,65005,65007,65011,65013,65030,65036,65037,65040,65058,65059,65066,65095,65109,65111,65123,65130,65131,65134,65141,65149,65156,65161,65164,65165,65168,65169,65177,65178,65179,65180,65185,65187,65190,65194,65198,65199,65201,65209,65212,65213,65223,65235,65239,65242,65251,65252,65258,65260,65262,65270,65271,65279,65284,65293,65301,65305,65307,65312,65316,65317,65326,65329,65331,65333,65345,65353,65355,65358,65359,65364,65370,65374,65375,65381,65382,65383,65384,65398,65404,65405,65408,65409,65414,65423,65425,65433,65435,65438,65444,65445,65452,65477,65480,65502,65506,65565,65727,65750,65852,66184,66865,69310,69998.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24977997539](https://github.com/openclaw/clawsweeper/actions/runs/24977997539)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3636 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3531 |
| Open items total | 7167 |
| Reviewed files | 6936 |
| Unreviewed open items | 231 |
| Archived closed files | 12845 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3561 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3366 |
| Proposed PR closes | 1 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6927 |
| Proposed closes awaiting apply | 1 (0% of fresh reviews) |
| Closed by Codex apply | 10151 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 3/732 current (729 due, 0.4%) |
| Hourly hot item cadence (<7d) | 3/732 current (729 due, 0.4%) |
| Daily cadence coverage | 3995/4347 current (352 due, 91.9%) |
| Daily PR cadence | 2699/2965 current (266 due, 91%) |
| Daily new issue cadence (<30d) | 1296/1382 current (86 due, 93.8%) |
| Weekly older issue cadence | 1857/1857 current (0 due, 100%) |
| Due now by cadence | 1312 |

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

Latest review: Apr 27, 2026, 05:35 UTC. Latest close: Apr 27, 2026, 05:25 UTC. Latest comment sync: Apr 27, 2026, 05:51 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 386 | 1 |
| Last hour | 998 | 25 | 973 | 0 | 19 | 910 | 6 |
| Last 24 hours | 8015 | 1435 | 6580 | 0 | 1226 | 2737 | 14 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#65750](https://github.com/openclaw/openclaw/pull/65750) | fix(control-ui): stop reloading history after clear (#65719) | cannot reproduce on current main | Apr 27, 2026, 05:46 UTC | [closed/65750.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65750.md) |
| [#63871](https://github.com/openclaw/openclaw/pull/63871) | fix(cron): honor deleteAfterRun for recurring jobs | duplicate or superseded | Apr 27, 2026, 05:46 UTC | [closed/63871.md](https://github.com/openclaw/clawsweeper/blob/main/closed/63871.md) |
| [#71190](https://github.com/openclaw/openclaw/issues/71190) | [Bug]: mergeOrphanedTrailingUserPrompt snowballs queued messages after abort — model re-answers on every turn | already implemented on main | Apr 27, 2026, 05:25 UTC | [closed/71190.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71190.md) |
| [#68293](https://github.com/openclaw/openclaw/pull/68293) | fix(systemd): use resolveSystemdServiceName in activate/uninstall | already implemented on main | Apr 27, 2026, 05:25 UTC | [closed/68293.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68293.md) |
| [#68227](https://github.com/openclaw/openclaw/pull/68227) | fix(protocol): require hello-ok auth | duplicate or superseded | Apr 27, 2026, 05:25 UTC | [closed/68227.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68227.md) |
| [#68154](https://github.com/openclaw/openclaw/issues/68154) | [Bug]: security audit false positive: plugins.allow_phantom_entries flags bundled plugins as phantom | already implemented on main | Apr 27, 2026, 05:24 UTC | [closed/68154.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68154.md) |
| [#67970](https://github.com/openclaw/openclaw/issues/67970) | Feature: built-in memory should support automatic context extraction and daily-log writing | already implemented on main | Apr 27, 2026, 05:24 UTC | [closed/67970.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67970.md) |
| [#67764](https://github.com/openclaw/openclaw/issues/67764) | [Feature]: Sessions UI should expose per-turn raw context and assembled model input | already implemented on main | Apr 27, 2026, 05:24 UTC | [closed/67764.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67764.md) |
| [#43954](https://github.com/openclaw/openclaw/pull/43954) | feat(feishu): add feishu_card tool for sending and updating interactive cards | belongs on ClawHub | Apr 27, 2026, 05:18 UTC | [closed/43954.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43954.md) |
| [#43901](https://github.com/openclaw/openclaw/pull/43901) | fix: remove L1 bootstrap snapshot cache to fix workspace file staleness | duplicate or superseded | Apr 27, 2026, 05:18 UTC | [closed/43901.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43901.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#56538](https://github.com/openclaw/openclaw/pull/56538) | fix: use TextDecoder for proper GBK encoding support on Windows | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56538.md) | complete | Apr 27, 2026, 05:46 UTC |
| [#17098](https://github.com/openclaw/openclaw/pull/17098) | docs: add xCloud hosting guide | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/17098.md) | complete | Apr 27, 2026, 05:45 UTC |
| [#68449](https://github.com/openclaw/openclaw/issues/68449) | [Bug]: Dreaming plugin: stopword list too narrow and no filter for cron-triggered sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68449.md) | complete | Apr 27, 2026, 05:45 UTC |
| [#60860](https://github.com/openclaw/openclaw/pull/60860) | feat(google): add Google Vertex AI provider with ADC auth and global endpoint routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60860.md) | complete | Apr 27, 2026, 05:45 UTC |
| [#66551](https://github.com/openclaw/openclaw/pull/66551) | fix(media): allow host-read text document fallback mimes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66551.md) | complete | Apr 27, 2026, 05:45 UTC |
| [#71027](https://github.com/openclaw/openclaw/pull/71027) | chore(deps): bump useblacksmith/build-push-action from 2.1.0 to 2.2.0 in the actions group across 1 directory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71027.md) | complete | Apr 27, 2026, 05:45 UTC |
| [#71336](https://github.com/openclaw/openclaw/pull/71336) | fix(webchat): persist chat queue to localStorage with drain-on-reconnect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71336.md) | complete | Apr 27, 2026, 05:45 UTC |
| [#71142](https://github.com/openclaw/openclaw/issues/71142) | Feature Request: Configurable upload size limit for Control UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71142.md) | complete | Apr 27, 2026, 05:45 UTC |
| [#72421](https://github.com/openclaw/openclaw/issues/72421) | Discord channel lanes intermittently held after run completes — \"lane wait exceeded\" with stale per-session jsonl mtime | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72421.md) | complete | Apr 27, 2026, 05:45 UTC |
| [#72432](https://github.com/openclaw/openclaw/pull/72432) | Add structured Matrix approval metadata | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72432.md) | complete | Apr 27, 2026, 05:45 UTC |

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
