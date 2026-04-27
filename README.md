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

Last dashboard update: Apr 27, 2026, 06:18 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 06:18 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 497. Item numbers: 17311,23096,33845,33914,38161,38162,42606,44886,47604,47814,49692,50429,50506,51706,52875,53198,53600,53641,53654,53678,53760,53810,53943,53969,53989,54041,54128,54153,54176,54200,54207,54227,54243,54278,54296,54342,54405,54408,54416,54488,54496,54518,54519,54524,54529,54531,54577,54578,54607,54634,54635,54663,54665,54710,54736,54757,54792,54799,54810,54812,54825,54864,54895,54918,54919,54928,54972,54996,55036,55037,55047,55071,55126,55196,55654,55757,58481,58775,58823,59101,60497,60981,61175,61279,62024,62099,62872,62874,62877,62891,62906,62910,62917,62924,62927,62937,62939,62944,62950,62954,62957,62962,62966,62976,62981,62985,62989,63003,63007,63011,63025,63030,63037,63038,63050,63057,63062,63073,63082,63096,63125,63133,63418,64046,64086,64127,64318,64436,64500,64512,64953,65023,65039,65097,65302,65319,65486,65490,65504,65592,65670,65685,65687,65691,65726,65771,65774,65777,65824,65828,65855,65909,65919,65933,65940,65945,65962,65963,65974,65983,65991,65992,66000,66010,66056,66067,66081,66091,66093,66098,66101,66110,66119,66126,66138,66146,66147,66150,66160,66169,66174,66178,66196,66198,66199,66200,66213,66225,66235,66238,66251,66255,66257,66263,66272,66278,66279,66285,66287,66299,66303,66305,66312,66327,66339,66341,66344,66366,66367,66377,66385,66391,66392,66399,66400,66409,66414,66415,66436,66465,66467,66468,66478,66479,66489,66498,66499,66509,66512,66515,66517,66532,66534,66535,66543,66546,66561,66573,66605,66612,66614,66631,66638,66646,66650,66656,66670,66672,66673,66675,66684,66685,66686,66687,66700,66701,66702,66705,66716,66720,66732,66744,66746,66747,66748,66749,66755,66761,66766,66769,66773,66781,66783,66785,66786,66791,66792,66795,66802,66804,66807,66828,66830,66832,66836,66838,66841,66846,66847,66862,66867,66874,66875,66894,66904,66911,66912,66913,66915,66920,66924,66933,66936,66937,66944,66946,66957,66977,66979,66988,66992,67000,67011,67016,67020,67031,67041,67050,67052,67053,67055,67060,67062,67063,67069,67077,67088,67089,67090,67092,67097,67103,67108,67111,67113,67115,67129,67136,67137,67152,67154,67157,67192,67195,67197,67203,67207,67236,67243,67252,67288,67290,67292,67304,67305,67306,67314,67328,67331,67369,67379,67381,67398,67403,67405,67407,67413,67417,67419,67420,67423,67429,67431,67432,67433,67438,67446,67451,67463,67478,67480,67497,67503,67509,67511,67539,67572,67618,67637,67659,67660,67664,67671,67672,67735,67915,68060,68280,68554,68920,69051,69312,69379,69527,69799,69894,70014,70056,70110,70156,70191,70280,70296,70301,70309,70319,70330,70334,70368,70434,70440,70451,70472,70493,70512,70518,70563,70568,70584,70586,70623,70628,70682,70733,70734,70757,70790,70811,70812,70813,70823,70856,70857,70876,70877,70884,70886,70888,70895,70900,70903,70905,70918,70928,70934,70941,70960,70971,70986,70990,70991,71063,71066,71069,71099,71116,71132,71136,71140,71154,71156,71157,71170,71185,71195,71203,71211,71216,71227,71237,71243,71249,71273,71285,71301,71324,71326,71327,71329,71335,71349,71350,71382,71396,71398,71412,72016,72080,72171,72178.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24978808427](https://github.com/openclaw/clawsweeper/actions/runs/24978808427)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3633 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3526 |
| Open items total | 7159 |
| Reviewed files | 6927 |
| Unreviewed open items | 232 |
| Archived closed files | 12854 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3561 |
| Proposed issue closes | 1 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3364 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6925 |
| Proposed closes awaiting apply | 4 (0.1% of fresh reviews) |
| Closed by Codex apply | 10151 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 115/730 current (615 due, 15.8%) |
| Hourly hot item cadence (<7d) | 115/730 current (615 due, 15.8%) |
| Daily cadence coverage | 3940/4339 current (399 due, 90.8%) |
| Daily PR cadence | 2646/2958 current (312 due, 89.5%) |
| Daily new issue cadence (<30d) | 1294/1381 current (87 due, 93.7%) |
| Weekly older issue cadence | 1858/1858 current (0 due, 100%) |
| Due now by cadence | 1246 |

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

Latest review: Apr 27, 2026, 06:04 UTC. Latest close: Apr 27, 2026, 05:46 UTC. Latest comment sync: Apr 27, 2026, 06:18 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 4 | 0 | 4 | 0 | 0 | 497 | 3 |
| Last hour | 1020 | 6 | 1014 | 0 | 8 | 1027 | 6 |
| Last 24 hours | 7809 | 1283 | 6526 | 0 | 1228 | 2758 | 13 |

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
| [#72016](https://github.com/openclaw/openclaw/issues/72016) | [Feature]: doctor api/extendability | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72016.md) | complete | Apr 27, 2026, 06:04 UTC |
| [#71170](https://github.com/openclaw/openclaw/pull/71170) | fix(auto-reply): add reminderGuard opt-out for external schedulers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71170.md) | complete | Apr 27, 2026, 06:04 UTC |
| [#71216](https://github.com/openclaw/openclaw/issues/71216) | Config schema: add `sandbox`, `routing.rules`, `instances`, and `gateway.nodes.denyPaths` | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71216.md) | complete | Apr 27, 2026, 06:04 UTC |
| [#71069](https://github.com/openclaw/openclaw/issues/71069) | [Bug]: Gemma4-26b-a4-it-gguf override is rejected and reverts to gpt-4o | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71069.md) | complete | Apr 27, 2026, 06:04 UTC |
| [#70584](https://github.com/openclaw/openclaw/pull/70584) | fix: clamp effort=low/minimal to medium for claude-opus-4.7 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70584.md) | complete | Apr 27, 2026, 06:03 UTC |
| [#66828](https://github.com/openclaw/openclaw/issues/66828) | Cron lane remapped to Nested and subagent cleanup packaging regression in v2026.4.12 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66828.md) | complete | Apr 27, 2026, 06:03 UTC |
| [#70568](https://github.com/openclaw/openclaw/pull/70568) | fix(telegram): scope ambiguous exec approvals to one account | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70568.md) | complete | Apr 27, 2026, 06:03 UTC |
| [#71243](https://github.com/openclaw/openclaw/pull/71243) | Improve Control UI onboarding UX | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71243.md) | complete | Apr 27, 2026, 06:03 UTC |
| [#71396](https://github.com/openclaw/openclaw/pull/71396) | fix(feishu): stop automatic mention cascades | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71396.md) | complete | Apr 27, 2026, 06:03 UTC |
| [#70734](https://github.com/openclaw/openclaw/issues/70734) | [Bug]: Fresh-session `[object Object]` hallucination persists after session/database wipe on fix branch for #69079 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70734.md) | complete | Apr 27, 2026, 06:03 UTC |

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
