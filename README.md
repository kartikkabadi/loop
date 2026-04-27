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

Last dashboard update: Apr 27, 2026, 08:56 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 08:56 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 433. Item numbers: 10356,17098,18860,19330,24754,31407,33845,33975,38162,39245,39604,40209,40215,40247,40252,40392,40522,40560,42425,42606,42637,42820,42937,42986,43020,43170,43216,43217,43239,43243,43246,43254,43292,43295,43306,43348,43357,43367,43374,43383,43410,43411,43416,43443,43447,43454,43455,43456,43462,43481,43493,43529,43549,43563,43567,43570,43573,43574,43605,43609,43614,43618,43659,43679,43730,43735,43737,43747,43750,43760,43765,43770,43790,43793,43795,43797,43803,43810,43816,43821,43827,43895,43903,43910,43911,43912,43919,43935,43942,43950,43975,43976,43982,43996,44015,44027,44395,46303,46812,47604,48512,49431,49692,50103,50506,50818,50982,51767,52115,52249,52747,52861,52875,52894,52928,52963,52972,53008,53023,53056,53088,53092,53107,53145,53185,53186,53198,53208,53228,53242,53250,53268,53274,53286,53308,53311,53319,53321,53345,53376,53378,53387,53390,53399,53406,53408,53439,53447,53469,53482,53486,53525,53531,53540,53548,53550,53556,53590,53599,53628,53639,53669,53678,53684,53732,53742,53745,53763,53772,53774,53783,53786,53798,53852,53858,53881,53889,53890,53895,53932,53941,53942,53958,53982,53998,54014,54138,54149,54153,54155,54157,54164,54166,54176,54177,54178,54192,54200,54207,54224,54227,54240,54243,54253,54278,54289,54296,54299,54300,54310,54311,54373,54378,54383,54397,54405,54408,54435,54439,54463,54470,54504,54507,54508,54518,54524,54531,54559,54565,54607,54622,54635,54663,54714,54732,54740,54757,54794,54825,54841,54853,54864,54877,54878,54879,54882,54909,54918,54919,54959,54972,55027,55037,55044,55046,55099,55196,55208,55652,55654,55757,56532,56604,56613,57326,58808,59330,60127,60406,60409,60602,60848,60860,61076,62877,62917,62937,62938,62950,62954,62957,62966,62974,62989,63005,63007,63024,63037,63061,63098,63112,63118,63135,63141,63146,63149,63263,63352,63356,63398,63411,63432,63460,63463,63486,63488,63492,63497,63535,63556,63588,63591,63610,63612,63633,63634,63651,63655,63663,63664,63666,63673,63685,63691,63697,63700,63734,63757,63758,63759,63760,63780,63786,63829,63840,63845,63855,63864,63870,63881,63884,63892,63901,63904,63920,63924,63941,63990,63998,64004,64015,64022,64026,64028,64030,64037,64044,64081,64103,64112,64121,64126,64129,64139,64148,64168,64175,64179,64181,64182,64199,64205,64212,64213,64217,64220,64224,64236,64253,64260,64262,64267,64268,64274,64281,64293,64294,64299,64301,64310,64315,64317,64322,64327,64334,64344,64347,64362,64365,64375,64383,64384,64399,64400,64408,64411,64413,64416,64426,64427,64429,64438,64443,64448,64472,64473,64483,64486,64490,64503,64507,64530,64540,64546,64555,64556,64559,64593,64604,64607,64609,64611,64613,64622,64624,64625,64633,64639,64640,64647,64649,64651,64656,64658,64664,64673,64676,64684,64695,64696,64699,64703,64707,64715,64717,64718,64719,64783,64953,65551,65670,65687,65909,66093,66147,66551,67728,67784,67868,67976,67986,67988,68010,68264,69201,69310,70597,70864,71792,71857,72154,72225,72301,72363,72383,72384,72401,72426,72428,72436.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24984300925](https://github.com/openclaw/clawsweeper/actions/runs/24984300925)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3595 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3499 |
| Open items total | 7094 |
| Reviewed files | 6850 |
| Unreviewed open items | 244 |
| Archived closed files | 12948 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3519 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3322 |
| Proposed PR closes | 1 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6841 |
| Proposed closes awaiting apply | 1 (0% of fresh reviews) |
| Closed by Codex apply | 10180 |
| Failed or stale reviews | 11 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 25/710 current (685 due, 3.5%) |
| Hourly hot item cadence (<7d) | 25/710 current (685 due, 3.5%) |
| Daily cadence coverage | 2249/4287 current (2038 due, 52.5%) |
| Daily PR cadence | 1283/2925 current (1642 due, 43.9%) |
| Daily new issue cadence (<30d) | 966/1362 current (396 due, 70.9%) |
| Weekly older issue cadence | 1852/1853 current (1 due, 99.9%) |
| Due now by cadence | 2968 |

### Audit Health

<!-- clawsweeper-audit:start -->
Last audit: Apr 27, 2026, 07:11 UTC

Status: **Action needed**

Targeted review input: `64563,65635,56915,61960,62112,62431,64150,71072`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 7132 |
| Missing eligible open records | 2 |
| Missing maintainer-authored open records | 94 |
| Missing protected open records | 1 |
| Missing recently-created open records | 149 |
| Archived records that are open again | 0 |
| Stale item records | 1 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 6 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#64563](https://github.com/openclaw/openclaw/pull/64563) | Missing eligible open | fix(whatsapp): lazy default auth dir for profile state (#64555) | eligible |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#56915](https://github.com/openclaw/openclaw/issues/56915) | Stale review | [Bug]: [Bug] Skills scanner ignores subdirectories under ~/.openclaw/skills/ | items/56915.md |
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 27, 2026, 08:41 UTC. Latest close: Apr 27, 2026, 08:23 UTC. Latest comment sync: Apr 27, 2026, 08:56 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 433 | 1 |
| Last hour | 558 | 0 | 558 | 2 | 12 | 885 | 2 |
| Last 24 hours | 5503 | 785 | 4718 | 7 | 673 | 2076 | 11 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#43288](https://github.com/openclaw/openclaw/issues/43288) | CLI backend: pickSessionId accepts non-UUID strings like 'rate-limited' causing resume failure | already implemented on main | Apr 27, 2026, 08:23 UTC | [closed/43288.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43288.md) |
| [#42680](https://github.com/openclaw/openclaw/pull/42680) | fix(cron): start job timeout after execution begins, not at enqueue time | already implemented on main | Apr 27, 2026, 08:23 UTC | [closed/42680.md](https://github.com/openclaw/clawsweeper/blob/main/closed/42680.md) |
| [#42531](https://github.com/openclaw/openclaw/pull/42531) | fix(memory-lancedb): preserve dimensions for baseUrl embeddings | already implemented on main | Apr 27, 2026, 08:23 UTC | [closed/42531.md](https://github.com/openclaw/clawsweeper/blob/main/closed/42531.md) |
| [#40446](https://github.com/openclaw/openclaw/pull/40446) | feat(agents): add passive execution health monitoring for death spiral detection | belongs on ClawHub | Apr 27, 2026, 08:23 UTC | [closed/40446.md](https://github.com/openclaw/clawsweeper/blob/main/closed/40446.md) |
| [#72460](https://github.com/openclaw/openclaw/pull/72460) | fix(gateway): align UI thinking default with runtime resolver | already implemented on main | Apr 27, 2026, 08:02 UTC | [closed/72460.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72460.md) |
| [#72458](https://github.com/openclaw/openclaw/pull/72458) | Fix/skills snapshot stale after restart | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72458.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72458.md) |
| [#72457](https://github.com/openclaw/openclaw/pull/72457) | Fix/onboard trim typeerror | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72457.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72457.md) |
| [#72456](https://github.com/openclaw/openclaw/pull/72456) | Fix/minimax m2.7 vlm support | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72456.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72456.md) |
| [#72453](https://github.com/openclaw/openclaw/pull/72453) | Fix/freebsd homebrew onboard | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72453.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72453.md) |
| [#72451](https://github.com/openclaw/openclaw/pull/72451) | Fix/exec approvals source field | already implemented on main | Apr 27, 2026, 08:01 UTC | [closed/72451.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72451.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#70624](https://github.com/openclaw/openclaw/pull/70624) | feat(qqbot): group chat support, C2C streaming, chunked media upload, and architecture refactor | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70624.md) | complete | Apr 27, 2026, 08:43 UTC |
| [#72467](https://github.com/openclaw/openclaw/pull/72467) | fix(discord/security-audit): include top-level allowFrom in ownerAllowFromConfigured | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72467.md) | complete | Apr 27, 2026, 08:43 UTC |
| [#72266](https://github.com/openclaw/openclaw/pull/72266) | [tts][personality] Gateway display + status surfaces for emotion mode (#69051 PR-D of 4) | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/items/72266.md) | complete | Apr 27, 2026, 08:43 UTC |
| [#69998](https://github.com/openclaw/openclaw/pull/69998) | fix(gateway): redact secrets in skills.update response | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69998.md) | complete | Apr 27, 2026, 08:43 UTC |
| [#72301](https://github.com/openclaw/openclaw/pull/72301) | fix(lcm): strip temperature for claude-opus-4-7 in all transport paths | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72301.md) | complete | Apr 27, 2026, 08:43 UTC |
| [#72276](https://github.com/openclaw/openclaw/pull/72276) | [codex] Consolidate embedded runner structural splits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72276.md) | complete | Apr 27, 2026, 08:43 UTC |
| [#72466](https://github.com/openclaw/openclaw/pull/72466) | Add denylist support for exec approvals (block high-risk commands by pattern) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/72466.md) | complete | Apr 27, 2026, 08:43 UTC |
| [#72373](https://github.com/openclaw/openclaw/issues/72373) | OpenShell should fail fast on malformed generated commands and hard-abort repeated tool loops | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72373.md) | stale_local_checkout_blocked | Apr 27, 2026, 08:42 UTC |
| [#72333](https://github.com/openclaw/openclaw/pull/72333) | [plugin sdk] Add host-hook examples and recipes (#72287 follow-up) | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/items/72333.md) | complete | Apr 27, 2026, 08:42 UTC |
| [#72239](https://github.com/openclaw/openclaw/pull/72239) | [tts][personality] voice.md SOUL.md-aware ElevenLabs v3 tag filter (#69051 PR-C of 4) | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/items/72239.md) | complete | Apr 27, 2026, 08:42 UTC |

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
