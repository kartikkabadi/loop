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

Last dashboard update: Apr 28, 2026, 02:28 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 28, 2026, 02:28 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 405. Item numbers: 10356,12678,18860,19328,19330,29387,31407,33845,33975,38162,39245,40247,40252,40560,40874,40877,40878,41308,41965,42014,42079,42106,42131,42213,42327,42476,42482,42510,42606,42707,42797,42809,42841,42858,42873,42961,43005,43009,43020,43061,43097,43165,43170,43216,43217,43231,43239,43246,43254,43291,43292,43295,43300,43357,43374,43383,43447,43454,43455,43462,43480,43493,43549,43557,43562,43564,43567,43573,43614,43673,43679,43712,43730,43747,43750,43760,43765,43770,43790,43793,43794,43795,43803,43827,43895,43903,43910,43911,43912,43975,43978,43982,43984,44011,44015,44395,44625,46303,46812,48512,48908,49431,49488,49692,50103,50483,50506,50818,50982,50998,51011,51469,51767,52249,52401,52776,52861,52972,53056,53107,53145,53185,53198,53208,53242,53250,53268,53274,53286,53308,53319,53321,53345,53376,53378,53399,53406,53469,53482,53486,53497,53525,53531,53548,53556,53590,53599,53628,53639,53669,53678,53745,53763,53772,53774,53783,53786,53798,53852,53858,53890,53932,53941,53942,53958,53982,54149,54155,54166,54177,54178,54200,54207,54227,54243,54253,54289,54296,54299,54300,54311,54378,54397,54405,54408,54439,54470,54475,54504,54507,54593,54607,54622,54635,54646,54732,54757,54758,54774,54825,54864,54877,54878,54879,54904,54918,54919,55037,55099,55196,55208,55334,55652,55654,55757,56502,56532,56604,56613,57326,58142,58189,58242,58567,58808,59324,59330,59477,59898,60127,60406,60409,60602,61076,61701,61788,62267,62877,62917,62938,62950,62957,62966,62989,63005,63007,63037,63061,63098,63118,63135,63141,63146,63149,63229,63244,63263,63356,63398,63463,63486,63488,63492,63556,63588,63610,63634,63664,63666,63685,63691,63697,63700,63757,63758,63760,63780,63786,63829,63845,63855,63864,63870,63881,63884,63892,63904,63941,64022,64028,64103,64112,64139,64148,64168,64175,64179,64205,64217,64220,64224,64253,64260,64281,64293,64315,64317,64322,64334,64362,64375,64383,64384,64413,64426,64429,64472,64486,64540,64546,64555,64556,64593,64607,64613,64622,64758,65187,65886,65914,65957,66551,66875,66911,66912,66913,66985,67177,67181,67243,67333,67350,67431,67444,67460,67509,67551,67572,67593,67621,67623,67629,67660,67690,67727,67759,68112,68164,68186,68280,68483,69056,69312,69472,69634,70149,70268,70586,70811,70812,70857,70864,71058,71127,71142,71156,71185,71396,71417,71449,71459,71550,71731,71736,71744,71792,71820,71840,71841,71853,71857,72015,72016,72037,72044,72101,72115,72129,72132,72154,72171,72201,72237,72245,72268,72293,72294,72297,72338,72343,72363,72376,72480,72491.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25029853459](https://github.com/openclaw/clawsweeper/actions/runs/25029853459)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3580 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3462 |
| Open items total | 7042 |
| Reviewed files | 6630 |
| Unreviewed open items | 412 |
| Archived closed files | 13201 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3408 |
| Proposed issue closes | 4 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3219 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6627 |
| Proposed closes awaiting apply | 7 (0.1% of fresh reviews) |
| Closed by Codex apply | 10226 |
| Failed or stale reviews | 3 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 50/624 current (574 due, 8%) |
| Hourly hot item cadence (<7d) | 50/624 current (574 due, 8%) |
| Daily cadence coverage | 1501/4150 current (2649 due, 36.2%) |
| Daily PR cadence | 941/2869 current (1928 due, 32.8%) |
| Daily new issue cadence (<30d) | 560/1281 current (721 due, 43.7%) |
| Weekly older issue cadence | 1856/1856 current (0 due, 100%) |
| Due now by cadence | 3635 |

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

Latest review: Apr 28, 2026, 02:15 UTC. Latest close: Apr 28, 2026, 02:00 UTC. Latest comment sync: Apr 28, 2026, 02:28 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 56 | 4 | 52 | 0 | 0 | 405 | 5 |
| Last hour | 416 | 8 | 408 | 0 | 1 | 426 | 6 |
| Last 24 hours | 2474 | 150 | 2324 | 1 | 90 | 1584 | 16 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72376](https://github.com/openclaw/openclaw/pull/72376) | feat(memory-core): default to WAL journal mode | already implemented on main | Apr 28, 2026, 02:26 UTC | [closed/72376.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72376.md) |
| [#70149](https://github.com/openclaw/openclaw/issues/70149) | [Bug]: WhatsApp login times out over ambient proxy-agent, while explicit HttpsProxyAgent can open the same WSS endpoint | already implemented on main | Apr 28, 2026, 02:26 UTC | [closed/70149.md](https://github.com/openclaw/clawsweeper/blob/main/closed/70149.md) |
| [#69472](https://github.com/openclaw/openclaw/pull/69472) | auto-reply: suppress reasoning-prefaced silent replies | duplicate or superseded | Apr 28, 2026, 02:25 UTC | [closed/69472.md](https://github.com/openclaw/clawsweeper/blob/main/closed/69472.md) |
| [#66875](https://github.com/openclaw/openclaw/issues/66875) | Webchat race: chat final / session.message / sessions.changed triggers eager chat.history reload, causing flicker, collapse, or duplicate bubbles | already implemented on main | Apr 28, 2026, 02:25 UTC | [closed/66875.md](https://github.com/openclaw/clawsweeper/blob/main/closed/66875.md) |
| [#61701](https://github.com/openclaw/openclaw/issues/61701) | v2026.4.5: gateway process 100% CPU after upgrade from v2026.4.2 | already implemented on main | Apr 28, 2026, 02:25 UTC | [closed/61701.md](https://github.com/openclaw/clawsweeper/blob/main/closed/61701.md) |
| [#59477](https://github.com/openclaw/openclaw/pull/59477) | fix(sessions_send): allow cross-agent messaging for sandboxed agents with a2a enabled | duplicate or superseded | Apr 28, 2026, 02:25 UTC | [closed/59477.md](https://github.com/openclaw/clawsweeper/blob/main/closed/59477.md) |
| [#58567](https://github.com/openclaw/openclaw/issues/58567) | Session ending with assistant message causes infinite prefill error loop with Opus 4.6 | already implemented on main | Apr 28, 2026, 02:25 UTC | [closed/58567.md](https://github.com/openclaw/clawsweeper/blob/main/closed/58567.md) |
| [#52291](https://github.com/openclaw/openclaw/pull/52291) | fix(ui): make ui:build work on Windows | already implemented on main | Apr 28, 2026, 02:00 UTC | [closed/52291.md](https://github.com/openclaw/clawsweeper/blob/main/closed/52291.md) |
| [#72468](https://github.com/openclaw/openclaw/pull/72468) | fix(plugins): hard-fail invalid hook and memory capability registrations | already implemented on main | Apr 28, 2026, 01:24 UTC | [closed/72468.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72468.md) |
| [#62482](https://github.com/openclaw/openclaw/pull/62482) | fix: refresh subsystem file loggers across daily log rollovers [AI-assisted] | already implemented on main | Apr 28, 2026, 01:24 UTC | [closed/62482.md](https://github.com/openclaw/clawsweeper/blob/main/closed/62482.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#72129](https://github.com/openclaw/openclaw/pull/72129) | feat(huggingface): add text-to-image generation via hf-inference Inference Providers route | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72129.md) | complete | Apr 28, 2026, 02:15 UTC |
| [#71820](https://github.com/openclaw/openclaw/pull/71820) | feat(bluebubbles): add reply-context API fallback for cache misses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71820.md) | complete | Apr 28, 2026, 02:15 UTC |
| [#67572](https://github.com/openclaw/openclaw/pull/67572) | [Feat] Gateway: offload non-image attachments on chat.send | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67572.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#71736](https://github.com/openclaw/openclaw/issues/71736) | [RFC] Control UI plugin contribution slots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71736.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#69056](https://github.com/openclaw/openclaw/pull/69056) | fix(gateway): handle SIGUSR1 gracefully on Windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69056.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#63463](https://github.com/openclaw/openclaw/issues/63463) | MLX routing fails: model_not_found + fallback despite direct MLX API success | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63463.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#71744](https://github.com/openclaw/openclaw/issues/71744) | [Bug]: Watchdog fallback chain silently drops primary-failure root cause when fallback also fails — only terminal error surfaces in runtime_events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71744.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#66985](https://github.com/openclaw/openclaw/pull/66985) | fix(agents): resolve requestedNode to canonical ID before boundNode comparison | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66985.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#68280](https://github.com/openclaw/openclaw/pull/68280) | fix(gateway): fail fast on missing local probe auth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68280.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#70586](https://github.com/openclaw/openclaw/pull/70586) | fix(slack): fire trackEvent from message events for socket-health liveness (follow-up to #69833) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70586.md) | complete | Apr 28, 2026, 02:14 UTC |

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

`pnpm run audit` compares live GitHub state with generated records without moving
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
corepack enable
pnpm install
pnpm run build
pnpm run plan -- --batch-size 5 --shard-count 100 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
pnpm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
pnpm run apply-artifacts -- --artifact-dir artifacts/reviews
pnpm run audit -- --max-pages 250 --sample-limit 25 --update-dashboard
pnpm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
corepack enable
pnpm run apply-decisions -- --limit 20 --apply-kind all
```

Sync durable review comments without closing:

```bash
source ~/.profile
corepack enable
pnpm run apply-decisions -- --sync-comments-only --comment-sync-min-age-days 7 --processed-limit 1000 --limit 0
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later. Scheduled apply runs process both issues and pull requests by default; pass `apply_kind=issue` or `apply_kind=pull_request` to narrow a manual run.

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
