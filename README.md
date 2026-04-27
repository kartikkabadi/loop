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

Last dashboard update: Apr 27, 2026, 02:32 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 02:32 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 493. Item numbers: 48512,56582,57326,58114,61076,61320,62956,63002,63005,63109,63139,63187,63227,63260,63263,63352,63356,63398,63401,63411,63425,63432,63454,63460,63463,63481,63486,63488,63492,63497,63530,63535,63536,63552,63556,63558,63572,63578,63588,63591,63593,63606,63610,63612,63626,63633,63634,63651,63652,63655,63663,63664,63666,63673,63680,63685,63688,63691,63697,63700,63710,63713,63723,63734,63740,63757,63758,63759,63760,63769,63773,63779,63780,63786,63803,63807,63819,63829,63840,63845,63855,63864,63870,63871,63881,63884,63892,63893,63901,63904,63919,63920,63924,63940,63941,63956,63959,63978,63990,63992,63994,63998,64004,64015,64016,64022,64026,64027,64028,64030,64037,64044,64060,64065,64081,64086,64102,64103,64112,64121,64126,64129,64139,64148,64150,64168,64175,64179,64181,64182,64187,64193,64199,64201,64205,64212,64213,64217,64220,64224,64236,64253,64260,64262,64267,64268,64271,64274,64281,64289,64293,64294,64296,64299,64301,64310,64315,64317,64319,64321,64322,64327,64334,64344,64347,64362,64365,64375,64383,64384,64399,64400,64408,64411,64413,64416,64426,64427,64429,64438,64443,64448,64463,64472,64473,64483,64486,64490,64503,64507,64530,64540,64541,64545,64546,64549,64555,64556,64559,64593,64604,64606,64607,64608,64609,64611,64613,64622,64624,64625,64633,64639,64640,64647,64649,64651,64653,64656,64658,64661,64664,64672,64673,64676,64684,64695,64696,64699,64703,64707,64708,64709,64714,64715,64717,64718,64719,64720,64721,64726,64733,64734,64744,64745,64749,64758,64760,64767,64768,64773,64782,64783,64784,64787,64800,64805,64807,64810,64813,64818,64820,64825,64830,64831,64832,64836,64846,64874,64879,64881,64883,64887,64891,64901,64902,64903,64921,64927,64929,64934,64946,64950,64957,64960,64962,64970,64973,64983,64986,64988,64993,65005,65007,65011,65013,65023,65030,65036,65037,65039,65040,65058,65059,65066,65081,65095,65109,65111,65123,65130,65131,65134,65141,65143,65149,65156,65161,65164,65165,65168,65169,65176,65177,65178,65179,65180,65185,65187,65190,65194,65195,65198,65199,65209,65212,65213,65223,65235,65239,65242,65251,65252,65258,65260,65262,65270,65271,65279,65284,65293,65301,65305,65307,65312,65316,65317,65326,65329,65331,65333,65345,65353,65355,65358,65359,65364,65370,65374,65375,65381,65382,65383,65384,65398,65404,65405,65408,65409,65414,65423,65425,65433,65435,65438,65444,65445,65452,65457,65477,65480,65481,65486,65490,65494,65497,65502,65504,65506,65509,65522,65525,65536,65538,65541,65544,65547,65553,65557,65563,65565,65567,65574,65575,65589,65592,65600,65606,65619,65623,65624,65636,65637,65640,65641,65642,65643,65650,65655,65656,65669,65670,65675,65685,65686,65687,65689,65692,65704,65707,65720,65724,65726,65727,65729,65733,65736,65737,65741,65745,65746,65751,65767,65768,65770,65772,65773,65774,65776,65782,65783,65786,65792,65799,65802,65813,65825,65828,65839,65851,65852,65855,65859,65860,65862,65868,65870,65886,65892,65894,65898,65906,65914,65923,65933,65936,65937,65938,65939,65957,65958,66020,66023,66041,66067,66115,66123,66252,67157,68845,71235.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24973067071](https://github.com/openclaw/clawsweeper/actions/runs/24973067071)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3639 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3552 |
| Open items total | 7191 |
| Reviewed files | 7078 |
| Unreviewed open items | 113 |
| Archived closed files | 12703 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3624 |
| Proposed issue closes | 24 (0.7% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3448 |
| Proposed PR closes | 14 (0.4% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7072 |
| Proposed closes awaiting apply | 38 (0.5% of fresh reviews) |
| Closed by Codex apply | 10054 |
| Failed or stale reviews | 6 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 18/762 current (744 due, 2.4%) |
| Hourly hot item cadence (<7d) | 18/762 current (744 due, 2.4%) |
| Daily cadence coverage | 4378/4448 current (70 due, 98.4%) |
| Daily PR cadence | 2966/3025 current (59 due, 98%) |
| Daily new issue cadence (<30d) | 1412/1423 current (11 due, 99.2%) |
| Weekly older issue cadence | 1868/1868 current (0 due, 100%) |
| Due now by cadence | 927 |

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

Latest review: Apr 27, 2026, 02:16 UTC. Latest close: Apr 27, 2026, 02:04 UTC. Latest comment sync: Apr 27, 2026, 02:32 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 493 | 2 |
| Last hour | 634 | 44 | 590 | 0 | 18 | 795 | 12 |
| Last 24 hours | 8855 | 1773 | 7082 | 4 | 2011 | 3045 | 17 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#65938](https://github.com/openclaw/openclaw/pull/65938) | docs(providers): add Bedrock Mantle to provider index pages | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65938.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65938.md) |
| [#65813](https://github.com/openclaw/openclaw/issues/65813) | openai-codex auth profile rotation burns through both profiles before escalating to model fallback | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65813.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65813.md) |
| [#65724](https://github.com/openclaw/openclaw/issues/65724) | [Windows] DeprecationWarning: Passing args to child process with shell option true | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65724.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65724.md) |
| [#65675](https://github.com/openclaw/openclaw/pull/65675) | docs: add 2MB size limit note for avatar images | duplicate or superseded | Apr 27, 2026, 02:30 UTC | [closed/65675.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65675.md) |
| [#65589](https://github.com/openclaw/openclaw/pull/65589) | feat(memory-core): dreaming circuit breaker to prevent runaway cost and data corruption | duplicate or superseded | Apr 27, 2026, 02:30 UTC | [closed/65589.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65589.md) |
| [#65497](https://github.com/openclaw/openclaw/pull/65497) | fix: reuse gateway provider registry in worker sessions (#62051) | already implemented on main | Apr 27, 2026, 02:29 UTC | [closed/65497.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65497.md) |
| [#65494](https://github.com/openclaw/openclaw/issues/65494) | iMessage channel fails with ReferenceError: accountInfo is not defined | already implemented on main | Apr 27, 2026, 02:29 UTC | [closed/65494.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65494.md) |
| [#65457](https://github.com/openclaw/openclaw/pull/65457) | fix(gateway): stop dropping repeated markdown tokens in chat stream merge | duplicate or superseded | Apr 27, 2026, 02:29 UTC | [closed/65457.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65457.md) |
| [#65195](https://github.com/openclaw/openclaw/issues/65195) | exec/runtime cannot reach LAN host on macOS while interactive shell can | duplicate or superseded | Apr 27, 2026, 02:29 UTC | [closed/65195.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65195.md) |
| [#65176](https://github.com/openclaw/openclaw/pull/65176) | fix: improve SSRF resolved-IP error message with remediation hint (#65153) | duplicate or superseded | Apr 27, 2026, 02:29 UTC | [closed/65176.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65176.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#65486](https://github.com/openclaw/openclaw/issues/65486) | [Bug]: Gateway restart does not invalidate approval-pending session tool results - stale approval IDs cause INVALID_REQUEST loop on resume | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65486.md) | complete | Apr 27, 2026, 02:15 UTC |
| [#65490](https://github.com/openclaw/openclaw/issues/65490) | Running an OpenClaw agent in production: the execution discipline gap | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65490.md) | complete | Apr 27, 2026, 02:15 UTC |
| [#65687](https://github.com/openclaw/openclaw/issues/65687) | [Bug]: Discord voice conversations break after one successful back and forth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65687.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65592](https://github.com/openclaw/openclaw/pull/65592) | feat(searxng): show JSON format setup note during onboarding | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65592.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65933](https://github.com/openclaw/openclaw/pull/65933) | fix(exec): respect configured security=full as floor; model args cannot downgrade | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65933.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#67157](https://github.com/openclaw/openclaw/pull/67157) | Add stable tarball upgrade workflow | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67157.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65670](https://github.com/openclaw/openclaw/pull/65670) | feat: keep vite-plus companion bin on daemon PATH | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65670.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65855](https://github.com/openclaw/openclaw/pull/65855) | chore: add qqbot to channel contract guardrails and fix synology-chat labeler | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65855.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#66067](https://github.com/openclaw/openclaw/pull/66067) | fix(tui): preserve spaces between thinking fragments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66067.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65726](https://github.com/openclaw/openclaw/issues/65726) | ACP bindings: add notifyPolicy config + dedup guard for bound threads | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65726.md) | complete | Apr 27, 2026, 02:14 UTC |

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
