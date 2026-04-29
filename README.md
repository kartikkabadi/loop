# ClawSweeper

ClawSweeper is the conservative maintenance bot for OpenClaw repositories. It
currently covers `openclaw/openclaw` and `openclaw/clawhub`.

It has two independent lanes:

- issue/PR sweeper: keeps one markdown report per open issue or PR, publishes
  one durable Codex automated review comment when useful, and only closes items
  when the evidence is strong
- commit sweeper: reviews code-bearing commits that land on `main`, writes one
  canonical markdown report per commit, and optionally publishes a GitHub Check
  Run for that commit

## Capabilities

- **Repository profiles:** per-repository rules live in
  `src/repository-profiles.ts`, so OpenClaw and ClawHub can share the same
  engine while keeping different apply limits.
- **Issue and PR intake:** scheduled runs scan open issues and pull requests,
  while target repositories can forward exact issue/PR events with
  `repository_dispatch` for low-latency one-item reviews.
- **Codex review reports:** each issue or PR becomes
  `records/<repo-slug>/items/<number>.md` with the decision, evidence, proposed
  maintainer-facing comment, runtime metadata, and GitHub snapshot hash.
- **Durable review comments:** ClawSweeper syncs one marker-backed public review
  comment per item and edits it in place instead of posting repeated comments.
  Pull request comments include hidden verdict markers, and actionable PR
  follow-up includes a hidden `clawsweeper-action:fix-required` marker for the
  trusted ClawSweeper repair loop. See
  [`docs/pr-review-comments.md`](docs/pr-review-comments.md).
- **Guarded apply:** apply mode re-fetches live GitHub state, checks labels,
  maintainer authorship, paired issue/PR state, snapshot drift, and repository
  profile rules before commenting or closing anything.
- **Archive and reopen handling:** closed or already-closed reports move to
  `records/<repo-slug>/closed/<number>.md`; reopened archived items move back to
  `items/` as stale work.
- **Dashboard:** this README contains the generated fleet dashboard with current
  run state, cadence health, recent reviews, recent closes, and work candidates.
- **Workflow status markers:** `pnpm run status` updates per-repository README
  status blocks so long-running workflows can publish progress without changing
  report data.
- **Audit:** `pnpm run audit` compares live GitHub state with report storage and
  can publish Audit Health into this README without mutating issues or PRs.
- **Reconcile:** `pnpm run reconcile` repairs report placement drift such as
  reopened archived records or closed items still sitting in `items/`.
- **Work candidates:** valid, narrow items can be marked as
  `queue_fix_pr` candidates for manual ClawSweeper repair promotion.
- **Commit review:** push events on target `main` branches can dispatch to
  `.github/workflows/commit-review.yml`, which expands the commit range, skips
  non-code-only commits cheaply, starts one Codex worker per code-bearing
  commit, and writes `records/<repo-slug>/commits/<sha>.md`.
- **Manual reruns and backfills:** both lanes support manual workflow dispatch.
  Commit review supports exact SHAs, historic ranges with `before_sha`, and an
  `additional_prompt` input for one-off review instructions.
- **Commit report queries:** `pnpm commit-reports -- --since 24h`,
  `--findings`, `--non-clean`, `--repo`, and `--author` make the flat per-SHA
  commit storage easy to review by time window without date folders.
- **Optional commit checks:** commit reports are the source of truth; target
  commit Check Runs are disabled by default and can be enabled per run or repo.
- **ClawSweeper repair dispatch:** commit reports with `result: findings` can
  dispatch to the repair intake, where an audit record is written and a PR is
  created only when the finding is narrow, non-security, and still relevant on
  latest `main`.

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

Last dashboard update: Apr 29, 2026, 12:33 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4421 |
| Open PRs | 3459 |
| Open items total | 7880 |
| Reviewed files | 7513 |
| Unreviewed open items | 367 |
| Due now by cadence | 2643 |
| Proposed closes awaiting apply | 2 |
| Work candidates awaiting promotion | 639 |
| Closed by Codex apply | 10772 |
| Failed or stale reviews | 25 |
| Archived closed files | 14265 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6953 | 6591 | 362 | 2587 | 2 | 595 | 10764 | Apr 29, 2026, 12:19 UTC | Apr 29, 2026, 12:12 UTC | 403 |
| [ClawHub](https://github.com/openclaw/clawhub) | 927 | 922 | 5 | 56 | 0 | 44 | 8 | Apr 29, 2026, 12:12 UTC | Apr 29, 2026, 08:25 UTC | 736 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 29, 2026, 12:33 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25107301634) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 29, 2026, 12:18 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25107385637) |

### Fleet Activity

Latest review: Apr 29, 2026, 12:19 UTC. Latest close: Apr 29, 2026, 12:12 UTC. Latest comment sync: Apr 29, 2026, 12:33 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 333 | 0 |
| Last hour | 1003 | 5 | 998 | 8 | 17 | 1139 | 0 |
| Last 24 hours | 6380 | 412 | 5968 | 19 | 736 | 2230 | 27 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74216](https://github.com/openclaw/openclaw/pull/74216) | fix(plugins): install runtime deps for library extensions | closed externally after review | Apr 29, 2026, 12:12 UTC | [records/openclaw-openclaw/closed/74216.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74216.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74322](https://github.com/openclaw/openclaw/pull/74322) | Fix provider-scoped manifest model picker | kept open | Apr 29, 2026, 12:09 UTC | [records/openclaw-openclaw/closed/74322.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74322.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51311](https://github.com/openclaw/openclaw/pull/51311) | fix(ios): guard sendPing continuation against double-resume crash | closed externally after review | Apr 29, 2026, 12:08 UTC | [records/openclaw-openclaw/closed/51311.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51311.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41653](https://github.com/openclaw/openclaw/pull/41653) | fix: guard WebSocketTaskBox.sendPing against double continuation resume | closed externally after review | Apr 29, 2026, 12:08 UTC | [records/openclaw-openclaw/closed/41653.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41653.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74318](https://github.com/openclaw/openclaw/issues/74318) | Integration: Adding prompt injection protection and audit logging to OpenClaw with Ombre[Feature]: | belongs on ClawHub | Apr 29, 2026, 12:06 UTC | [records/openclaw-openclaw/closed/74318.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74318.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74055](https://github.com/openclaw/openclaw/issues/74055) | [Bug]: v2026.4.26: OAuth Refresh Lock Fails in Multi-Agent Swarm (401 refresh_token_reused) | closed externally after review | Apr 29, 2026, 12:05 UTC | [records/openclaw-openclaw/closed/74055.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74055.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74319](https://github.com/openclaw/openclaw/pull/74319) | fix(agents): keep PI telemetry on model provider | kept open | Apr 29, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/74319.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74319.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73607](https://github.com/openclaw/openclaw/issues/73607) | agents.defaults.params and agents.defaults.models[].params stripped from openclaw.json by gateway runtime (v2026.4.26) | closed externally after review | Apr 29, 2026, 12:02 UTC | [records/openclaw-openclaw/closed/73607.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73607.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74293](https://github.com/openclaw/openclaw/pull/74293) | fix(control-ui): make chat divider accessible | kept open | Apr 29, 2026, 12:02 UTC | [records/openclaw-openclaw/closed/74293.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74293.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74179](https://github.com/openclaw/openclaw/pull/74179) | fix(subagent-announce-delivery): prefer parent session binding for completion announce | already implemented on main | Apr 29, 2026, 11:54 UTC | [records/openclaw-openclaw/closed/74179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74179.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74155](https://github.com/openclaw/openclaw/pull/74155) | fix(slack): make download-file fileId requirement self-evident to LLMs | high | candidate | Apr 29, 2026, 12:18 UTC | [records/openclaw-openclaw/items/74155.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74155.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 12:12 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65668](https://github.com/openclaw/openclaw/issues/65668) | [Bug]: SIGUSR1/config.patch restart orphans gateway under custom supervisors → EADDRINUSE crash loop (workaround: OPENCLAW_NO_RESPAWN=1) | high | candidate | Apr 29, 2026, 12:10 UTC | [records/openclaw-openclaw/items/65668.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65668.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64732](https://github.com/openclaw/openclaw/issues/64732) | [Bug]: openclaw tool/help CLI surfaces break when plugins.allow omits synthetic command ids | high | candidate | Apr 29, 2026, 12:10 UTC | [records/openclaw-openclaw/items/64732.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64732.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72338](https://github.com/openclaw/openclaw/issues/72338) | Gateway CPU spin causes Telegram replies to stall and status probe to time out | high | candidate | Apr 29, 2026, 12:10 UTC | [records/openclaw-openclaw/items/72338.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72338.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71784](https://github.com/openclaw/openclaw/issues/71784) | Bug: memory search live embedding fails ~20–40% with `fetch failed \| other side closed` (provider-agnostic; upstream healthy) | high | candidate | Apr 29, 2026, 12:09 UTC | [records/openclaw-openclaw/items/71784.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71784.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69249](https://github.com/openclaw/openclaw/issues/69249) | Gateway restart can silently abort an in-flight Discord turn, with no automatic recovery message to the user | high | candidate | Apr 29, 2026, 12:09 UTC | [records/openclaw-openclaw/items/69249.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69249.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63269](https://github.com/openclaw/openclaw/issues/63269) | [Bug]: Mattermost: group/public channel messages not received via WebSocket (regression in 2026.4.8) | high | candidate | Apr 29, 2026, 12:09 UTC | [records/openclaw-openclaw/items/63269.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63269.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65656](https://github.com/openclaw/openclaw/issues/65656) | # [Bug]: LINE reply — table flex messages silently dropped with 429 when text + table are returned together | high | candidate | Apr 29, 2026, 12:08 UTC | [records/openclaw-openclaw/items/65656.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65656.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74321](https://github.com/openclaw/openclaw/issues/74321) | [Bug]: Delivery-recovery retries indefinitely on permanent HTTP 400 errors (message too long, auth, not-found) — should classify and halt on non-transient failures | high | candidate | Apr 29, 2026, 12:06 UTC | [records/openclaw-openclaw/items/74321.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74321.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69708](https://github.com/openclaw/openclaw/issues/69708) | auth-profiles.json rejects \"type\": \"aws-sdk\" as invalid_type since 2026.4.1 — breaks Bedrock on EC2 (IMDS) | high | candidate | Apr 29, 2026, 12:06 UTC | [records/openclaw-openclaw/items/69708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69708.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54392](https://github.com/openclaw/openclaw/pull/54392) | fix: clamp compaction max_tokens to model output limit | high | candidate | Apr 29, 2026, 12:06 UTC | [records/openclaw-openclaw/items/54392.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54392.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53809](https://github.com/openclaw/openclaw/pull/53809) | fix(agents): protect shared workspace from deletion | high | candidate | Apr 29, 2026, 12:05 UTC | [records/openclaw-openclaw/items/53809.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53809.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63261](https://github.com/openclaw/openclaw/issues/63261) | [Bug]: Discord owner auth ignores channels.discord.allowFrom, hiding owner-only tools | high | candidate | Apr 29, 2026, 12:05 UTC | [records/openclaw-openclaw/items/63261.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63261.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63210](https://github.com/openclaw/openclaw/issues/63210) | [Feature]: Detect and recover from output truncation (stopReason:\"length\") in main agent sessions | high | candidate | Apr 29, 2026, 12:04 UTC | [records/openclaw-openclaw/items/63210.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63210.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74325](https://github.com/openclaw/openclaw/issues/74325) | [Bug]: gateway restart blocks main thread for ~75s — `sidecars.channels` takes 45s, then a second ~28s freeze right after \"gateway ready\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74325.md) | complete | Apr 29, 2026, 12:19 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73567](https://github.com/openclaw/openclaw/pull/73567) | fix(qqbot): re-evaluate routing bindings per inbound message | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73567.md) | complete | Apr 29, 2026, 12:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59859](https://github.com/openclaw/openclaw/pull/59859) | feat: cute GTK-native Linux App (#75) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59859.md) | complete | Apr 29, 2026, 12:17 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63195](https://github.com/openclaw/openclaw/issues/63195) | Bug: Control UI and TUI sessions intermittently disappear during normal use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63195.md) | failed | Apr 29, 2026, 12:17 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69192](https://github.com/openclaw/openclaw/issues/69192) | Hook gateway returns 4xx with no journal entry — breaks diagnosability | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69192.md) | complete | Apr 29, 2026, 12:16 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73243](https://github.com/openclaw/openclaw/pull/73243) | fix(diagnostics): abort stuck sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73243.md) | complete | Apr 29, 2026, 12:16 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72201](https://github.com/openclaw/openclaw/pull/72201) | feat(events): add audience field for hidden runtime-context system events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72201.md) | complete | Apr 29, 2026, 12:15 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55840](https://github.com/openclaw/openclaw/issues/55840) | [Feature]: Bring back Chrome Extension Relay support (removed in 2026.3.22) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55840.md) | failed | Apr 29, 2026, 12:14 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74311](https://github.com/openclaw/openclaw/pull/74311) | docs: classify media decode overhead as performance-only | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74311.md) | complete | Apr 29, 2026, 12:13 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73554](https://github.com/openclaw/openclaw/pull/73554) | fix(cli): reject missing plugin ids before config writes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73554.md) | complete | Apr 29, 2026, 12:13 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 12:33 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 330. Item numbers: 6792,7057,7338,7359,7403,7433,8724,9394,9465,9607,10029,10137,10354,10872,11414,11473,11489,11517,11655,11665,11703,11960,12008,12047,12198,12219,12398,12441,12512,12554,13241,13271,13304,13337,13362,13417,13440,13479,13543,13570,13613,13616,13620,13744,13751,14251,14438,14526,14601,14850,16896,17098,17213,17810,17876,17925,18985,20321,22021,22438,23585,27137,28300,32438,37589,38716,38729,38817,39038,39060,39343,40355,40756,44859,45706,45952,46023,46058,46109,46544,46548,46637,46656,46701,46733,46786,46809,46844,47095,47143,47235,47335,47441,47452,47487,47534,47540,47555,47562,47565,47613,47643,47651,47663,47690,47706,47710,47712,47723,47739,47743,47834,47840,47856,47910,47961,47975,47983,47992,47996,48045,48133,48200,48260,48486,48510,48684,48709,48780,48785,48786,48793,48814,48920,49099,49931,49944,50040,50081,50090,50093,50126,50145,50165,50184,50186,50195,50199,50245,50248,50268,50274,50276,50277,50287,50291,50374,50404,50442,50481,50482,50490,50530,50561,50563,50565,50590,50611,50619,50630,50642,50677,50681,50690,50719,50739,50762,50768,50776,50795,50798,50809,50880,50887,50900,50972,51088,51421,51455,51594,51849,52192,52207,52244,52276,52342,52400,52434,52448,52457,52480,52515,52521,52571,52588,52601,52614,52627,52636,52640,52642,52655,52727,52751,52759,52762,52801,52803,52832,52912,52921,52943,52993,53015,53021,53030,53108,53209,53243,53259,53262,53281,53288,53302,53316,53326,53329,53410,53436,53441,53445,53454,53473,53496,53520,53522,53524,53526,53528,53533,53557,53607,53629,53638,53650,53660,53670,53676,53677,53682,53716,53718,53720,53728,53736,53738,53741,53762,53779,53780,53784,53787,53809,53922,53961,53965,53997,54032,54085,54132,54159,54165,54242,54306,54308,54315,54343,54354,54361,54374,54375,54386,54392,54406,54414,54471,54549,54574,54585,54591,54600,54602,54647,55840,58971,59118,59330,60808,60946,61443,62120,63098,63193,63195,63196,63208,63210,63216,63223,63234,63257,63261,63265,63266,63269,63279,63289,63295,63308,63312,63321,63324,63330,63335,63339,63347,63371,63380,63392,63413,63423,63475,63571,63589,63636,63637,63644,63666,63696,63770,63806,63826,63877,63905,64036,64651,64673,64732,65525,65536,65541,65547,65557,65567,65574,65606,65619,65623,65624,65636,65637,65640,65641,65642,65643,65656,65668,65686,65707,65720,65729,65741,65751,65767,65768,65770,65773,65782,65783,65792,65799,65802,65839,65862,65868,65892,65898,65923,65937,65939,66020,66115,66225,66252,66459,66911,68280,68341,68656,68845,69051,69102,69110,69121,69123,69139,69182,69186,69192,69197,69199,69212,69242,69249,69260,69268,69269,69270,69271,69315,69319,69337,69374,69394,69401,69408,69413,69417,69426,69442,69443,69463,69525,69529,69542,69544,69546,69548,69567,69582,69605,69608,69618,69647,69675,69678,69696,69700,69701,69708,69755,69904,69926,69928,70002,70192,70497,70598,70888,70936,71582,71784,72229,72239,72266,72338,72782,73551,73593,73775,73813,73953,73972,74078,74081,74082,74083,74084,74086,74089,74094,74095,74096,74097,74155,74187,74192,74195,74199,74200.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25107301634](https://github.com/openclaw/clawsweeper/actions/runs/25107301634)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3533 |
| Open PRs | 3420 |
| Open items total | 6953 |
| Reviewed files | 6591 |
| Unreviewed open items | 362 |
| Archived closed files | 14242 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3351 |
| Proposed issue closes | 2 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3221 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6572 |
| Proposed closes awaiting apply | 2 (0% of fresh reviews) |
| Work candidates awaiting promotion | 595 |
| Closed by Codex apply | 10764 |
| Failed or stale reviews | 19 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 86/1048 current (962 due, 8.2%) |
| Hourly hot item cadence (<7d) | 86/1048 current (962 due, 8.2%) |
| Daily cadence coverage | 2483/3742 current (1259 due, 66.4%) |
| Daily PR cadence | 1866/2617 current (751 due, 71.3%) |
| Daily new issue cadence (<30d) | 617/1125 current (508 due, 54.8%) |
| Weekly older issue cadence | 1797/1801 current (4 due, 99.8%) |
| Due now by cadence | 2587 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 29, 2026, 07:05 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72536,72537,72539`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6973 |
| Missing eligible open records | 264 |
| Missing maintainer-authored open records | 63 |
| Missing protected open records | 1 |
| Missing recently-created open records | 43 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 7 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
| [#72527](https://github.com/openclaw/openclaw/issues/72527) | Missing eligible open | [Bug]: Downgrading from 2026.4.x to 2026.3.2 leaves openclaw.json in invalid/broken state with no warning | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 12:19 UTC. Latest close: Apr 29, 2026, 12:12 UTC. Latest comment sync: Apr 29, 2026, 12:33 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 333 | 0 |
| Last hour | 571 | 5 | 566 | 2 | 17 | 403 | 0 |
| Last 24 hours | 5446 | 412 | 5034 | 13 | 723 | 1451 | 27 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74216](https://github.com/openclaw/openclaw/pull/74216) | fix(plugins): install runtime deps for library extensions | closed externally after review | Apr 29, 2026, 12:12 UTC | [records/openclaw-openclaw/closed/74216.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74216.md) |
| [#74322](https://github.com/openclaw/openclaw/pull/74322) | Fix provider-scoped manifest model picker | kept open | Apr 29, 2026, 12:09 UTC | [records/openclaw-openclaw/closed/74322.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74322.md) |
| [#51311](https://github.com/openclaw/openclaw/pull/51311) | fix(ios): guard sendPing continuation against double-resume crash | closed externally after review | Apr 29, 2026, 12:08 UTC | [records/openclaw-openclaw/closed/51311.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51311.md) |
| [#41653](https://github.com/openclaw/openclaw/pull/41653) | fix: guard WebSocketTaskBox.sendPing against double continuation resume | closed externally after review | Apr 29, 2026, 12:08 UTC | [records/openclaw-openclaw/closed/41653.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41653.md) |
| [#74318](https://github.com/openclaw/openclaw/issues/74318) | Integration: Adding prompt injection protection and audit logging to OpenClaw with Ombre[Feature]: | belongs on ClawHub | Apr 29, 2026, 12:06 UTC | [records/openclaw-openclaw/closed/74318.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74318.md) |
| [#74055](https://github.com/openclaw/openclaw/issues/74055) | [Bug]: v2026.4.26: OAuth Refresh Lock Fails in Multi-Agent Swarm (401 refresh_token_reused) | closed externally after review | Apr 29, 2026, 12:05 UTC | [records/openclaw-openclaw/closed/74055.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74055.md) |
| [#74319](https://github.com/openclaw/openclaw/pull/74319) | fix(agents): keep PI telemetry on model provider | kept open | Apr 29, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/74319.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74319.md) |
| [#73607](https://github.com/openclaw/openclaw/issues/73607) | agents.defaults.params and agents.defaults.models[].params stripped from openclaw.json by gateway runtime (v2026.4.26) | closed externally after review | Apr 29, 2026, 12:02 UTC | [records/openclaw-openclaw/closed/73607.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73607.md) |
| [#74293](https://github.com/openclaw/openclaw/pull/74293) | fix(control-ui): make chat divider accessible | kept open | Apr 29, 2026, 12:02 UTC | [records/openclaw-openclaw/closed/74293.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74293.md) |
| [#74179](https://github.com/openclaw/openclaw/pull/74179) | fix(subagent-announce-delivery): prefer parent session binding for completion announce | already implemented on main | Apr 29, 2026, 11:54 UTC | [records/openclaw-openclaw/closed/74179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74179.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74155](https://github.com/openclaw/openclaw/pull/74155) | fix(slack): make download-file fileId requirement self-evident to LLMs | high | candidate | Apr 29, 2026, 12:18 UTC | [records/openclaw-openclaw/items/74155.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74155.md) |
| [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 12:12 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [#65668](https://github.com/openclaw/openclaw/issues/65668) | [Bug]: SIGUSR1/config.patch restart orphans gateway under custom supervisors → EADDRINUSE crash loop (workaround: OPENCLAW_NO_RESPAWN=1) | high | candidate | Apr 29, 2026, 12:10 UTC | [records/openclaw-openclaw/items/65668.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65668.md) |
| [#64732](https://github.com/openclaw/openclaw/issues/64732) | [Bug]: openclaw tool/help CLI surfaces break when plugins.allow omits synthetic command ids | high | candidate | Apr 29, 2026, 12:10 UTC | [records/openclaw-openclaw/items/64732.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64732.md) |
| [#72338](https://github.com/openclaw/openclaw/issues/72338) | Gateway CPU spin causes Telegram replies to stall and status probe to time out | high | candidate | Apr 29, 2026, 12:10 UTC | [records/openclaw-openclaw/items/72338.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72338.md) |
| [#71784](https://github.com/openclaw/openclaw/issues/71784) | Bug: memory search live embedding fails ~20–40% with `fetch failed \| other side closed` (provider-agnostic; upstream healthy) | high | candidate | Apr 29, 2026, 12:09 UTC | [records/openclaw-openclaw/items/71784.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71784.md) |
| [#69249](https://github.com/openclaw/openclaw/issues/69249) | Gateway restart can silently abort an in-flight Discord turn, with no automatic recovery message to the user | high | candidate | Apr 29, 2026, 12:09 UTC | [records/openclaw-openclaw/items/69249.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69249.md) |
| [#63269](https://github.com/openclaw/openclaw/issues/63269) | [Bug]: Mattermost: group/public channel messages not received via WebSocket (regression in 2026.4.8) | high | candidate | Apr 29, 2026, 12:09 UTC | [records/openclaw-openclaw/items/63269.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63269.md) |
| [#65656](https://github.com/openclaw/openclaw/issues/65656) | # [Bug]: LINE reply — table flex messages silently dropped with 429 when text + table are returned together | high | candidate | Apr 29, 2026, 12:08 UTC | [records/openclaw-openclaw/items/65656.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65656.md) |
| [#74321](https://github.com/openclaw/openclaw/issues/74321) | [Bug]: Delivery-recovery retries indefinitely on permanent HTTP 400 errors (message too long, auth, not-found) — should classify and halt on non-transient failures | high | candidate | Apr 29, 2026, 12:06 UTC | [records/openclaw-openclaw/items/74321.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74321.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74325](https://github.com/openclaw/openclaw/issues/74325) | [Bug]: gateway restart blocks main thread for ~75s — `sidecars.channels` takes 45s, then a second ~28s freeze right after \"gateway ready\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74325.md) | complete | Apr 29, 2026, 12:19 UTC |
| [#73567](https://github.com/openclaw/openclaw/pull/73567) | fix(qqbot): re-evaluate routing bindings per inbound message | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73567.md) | complete | Apr 29, 2026, 12:18 UTC |
| [#59859](https://github.com/openclaw/openclaw/pull/59859) | feat: cute GTK-native Linux App (#75) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59859.md) | complete | Apr 29, 2026, 12:17 UTC |
| [#63195](https://github.com/openclaw/openclaw/issues/63195) | Bug: Control UI and TUI sessions intermittently disappear during normal use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63195.md) | failed | Apr 29, 2026, 12:17 UTC |
| [#69192](https://github.com/openclaw/openclaw/issues/69192) | Hook gateway returns 4xx with no journal entry — breaks diagnosability | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69192.md) | complete | Apr 29, 2026, 12:16 UTC |
| [#73243](https://github.com/openclaw/openclaw/pull/73243) | fix(diagnostics): abort stuck sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73243.md) | complete | Apr 29, 2026, 12:16 UTC |
| [#72201](https://github.com/openclaw/openclaw/pull/72201) | feat(events): add audience field for hidden runtime-context system events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72201.md) | complete | Apr 29, 2026, 12:15 UTC |
| [#55840](https://github.com/openclaw/openclaw/issues/55840) | [Feature]: Bring back Chrome Extension Relay support (removed in 2026.3.22) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55840.md) | failed | Apr 29, 2026, 12:14 UTC |
| [#74311](https://github.com/openclaw/openclaw/pull/74311) | docs: classify media decode overhead as performance-only | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74311.md) | complete | Apr 29, 2026, 12:13 UTC |
| [#73554](https://github.com/openclaw/openclaw/pull/73554) | fix(cli): reject missing plugin ids before config writes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73554.md) | complete | Apr 29, 2026, 12:13 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 12:18 UTC

State: Review in progress

Planned 245 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25107385637](https://github.com/openclaw/clawsweeper/actions/runs/25107385637)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 888 |
| Open PRs | 39 |
| Open items total | 927 |
| Reviewed files | 922 |
| Unreviewed open items | 5 |
| Archived closed files | 23 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 882 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 916 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 44 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 6 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 15/60 current (45 due, 25%) |
| Hourly hot item cadence (<7d) | 15/60 current (45 due, 25%) |
| Daily cadence coverage | 209/211 current (2 due, 99.1%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 188/190 current (2 due, 98.9%) |
| Weekly older issue cadence | 647/651 current (4 due, 99.4%) |
| Due now by cadence | 56 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 29, 2026, 07:05 UTC

Status: **Passing**

Targeted review input: _none_

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 922 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 6 |
| Missing protected open records | 0 |
| Missing recently-created open records | 0 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 0 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| _None_ |  |  |  |
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 12:12 UTC. Latest close: Apr 29, 2026, 08:25 UTC. Latest comment sync: Apr 29, 2026, 12:17 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 432 | 0 | 432 | 6 | 0 | 736 | 0 |
| Last 24 hours | 934 | 0 | 934 | 6 | 13 | 779 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1891](https://github.com/openclaw/clawhub/pull/1891) | [codex] remove card link hover underlines | kept open | Apr 29, 2026, 08:25 UTC | [records/openclaw-clawhub/closed/1891.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1891.md) |
| [#1889](https://github.com/openclaw/clawhub/pull/1889) | fix: restore ClawHub public UI | closed externally after review | Apr 29, 2026, 07:52 UTC | [records/openclaw-clawhub/closed/1889.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1889.md) |
| [#1881](https://github.com/openclaw/clawhub/pull/1881) | chore(ci): update package publish artifact action | closed externally after review | Apr 29, 2026, 05:31 UTC | [records/openclaw-clawhub/closed/1881.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1881.md) |
| [#1880](https://github.com/openclaw/clawhub/pull/1880) | feat: add featured plugin curation | kept open | Apr 29, 2026, 05:13 UTC | [records/openclaw-clawhub/closed/1880.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1880.md) |
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | closed externally after review | Apr 29, 2026, 04:24 UTC | [records/openclaw-clawhub/closed/1871.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1871.md) |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | kept open | Apr 29, 2026, 03:02 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 11:59 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 11:55 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 11:53 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 11:51 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1126](https://github.com/openclaw/clawhub/issues/1126) | openclaw-checkpoint skill missing from search results despite existing in registry | high | candidate | Apr 29, 2026, 11:50 UTC | [records/openclaw-clawhub/items/1126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1126.md) |
| [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 11:49 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [#874](https://github.com/openclaw/clawhub/issues/874) | Publish silently drops extensionless files and .tsv files | high | candidate | Apr 29, 2026, 11:48 UTC | [records/openclaw-clawhub/items/874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/874.md) |
| [#379](https://github.com/openclaw/clawhub/issues/379) | VirusTotal badge shows 'Suspicious' despite 0/54 clean scan | high | candidate | Apr 29, 2026, 11:48 UTC | [records/openclaw-clawhub/items/379.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/379.md) |
| [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 11:47 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [#371](https://github.com/openclaw/clawhub/issues/371) | Add appeal link for VirusTotal false positives in UI | high | candidate | Apr 29, 2026, 11:47 UTC | [records/openclaw-clawhub/items/371.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/371.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#723](https://github.com/openclaw/clawhub/issues/723) | [False Positive Appeal] sudo-gold by FMouseBoy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/723.md) | complete | Apr 29, 2026, 12:12 UTC |
| [#1514](https://github.com/openclaw/clawhub/issues/1514) | False duplicate flag: claude-to-free is not a duplicate of model-migration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1514.md) | complete | Apr 29, 2026, 12:05 UTC |
| [#1483](https://github.com/openclaw/clawhub/issues/1483) | Allow to view security from CLI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1483.md) | complete | Apr 29, 2026, 12:03 UTC |
| [#1452](https://github.com/openclaw/clawhub/issues/1452) | [Bug] Cannot sign in with GitHub after deleting account (OAuth binding not cleared) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1452.md) | failed | Apr 29, 2026, 12:03 UTC |
| [#1440](https://github.com/openclaw/clawhub/issues/1440) | skill incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1440.md) | failed | Apr 29, 2026, 12:02 UTC |
| [#1404](https://github.com/openclaw/clawhub/issues/1404) | Skill Strategy Consultation: Page Icon Meanings and Search Recall Issues | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1404.md) | complete | Apr 29, 2026, 12:02 UTC |
| [#1395](https://github.com/openclaw/clawhub/issues/1395) | [Skill Flagged] openclaw-health-guardian - False Positive Appeal | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1395.md) | complete | Apr 29, 2026, 12:02 UTC |
| [#1501](https://github.com/openclaw/clawhub/issues/1501) | Ownership Transfer: baidu-netdisk-storage -> @BaiduNetdiskAIBot | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1501.md) | complete | Apr 29, 2026, 12:02 UTC |
| [#1415](https://github.com/openclaw/clawhub/issues/1415) | Skill \"apple-health-skills\" is incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1415.md) | complete | Apr 29, 2026, 12:01 UTC |
| [#1327](https://github.com/openclaw/clawhub/issues/1327) | 不要标记可疑可以吗，我这里没有敏感的 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1327.md) | failed | Apr 29, 2026, 12:01 UTC |

</details>

## How It Works

ClawSweeper is split into two operational systems:

- issue/PR sweeper: scheduler, review lane, apply lane, audit, reconcile, and
  dashboard publishing
- commit sweeper: main-branch commit dispatch, cheap code/non-code
  classification, one Codex review worker per code-bearing commit, report
  publishing, and optional target commit checks

### Scheduler

The issue/PR scheduler decides what to scan and how often. New and active items
get more attention; older quiet items fall back to a slower cadence.

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
- PR review comments use hidden verdict/action markers for the trusted
  ClawSweeper repair loop; see
  [`docs/pr-review-comments.md`](docs/pr-review-comments.md).

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

### Commit Review Lane

Commit review is intentionally separate from issue/PR cleanup. It never closes
items, writes comments, or fixes code.

- Target repositories forward `push` events from `main` with
  `repository_dispatch`.
- Manual runs can pass `commit_sha`, optional `before_sha`, optional
  `additional_prompt`, `enabled`, and `create_checks`.
- The receiver verifies the selected commits are reachable from `origin/main`.
- The plan job expands ranges, pages large backfills at GitHub's matrix limit,
  and classifies each commit before Codex starts.
- Pure documentation, changelog, README/license, and asset-only commits get a
  skipped report without spending Codex time.
- Mixed commits and code-bearing commits start one Codex worker per commit.
- Codex is prompted to read beyond the diff: changed files, callers/callees,
  runtime entry points, adjacent tests/docs, dependency manifests, release
  notes, advisories, web sources, and focused live tests when useful.
- Each commit writes exactly one report at
  `records/<repo-slug>/commits/<40-char-sha>.md`.
- Reruns overwrite the same report, including reruns with an
  `additional_prompt`.
- Report results are `nothing_found`, `findings`, `inconclusive`, `failed`, or
  `skipped_non_code`.
- Optional GitHub Checks use the `ClawSweeper Commit Review` name on the target
  commit. Clean or skipped reports are green; high-confidence high/critical
  findings fail; lower-severity, inconclusive, and failed reviews are neutral.
- Finding reports are dispatched to the repair intake when
  `CLAWSWEEPER_COMMIT_FINDINGS_ENABLED` is not `false`. ClawSweeper owns
  the audit log and any repair PR.

Use `pnpm commit-reports -- --since 24h` to review recent reports and add
`--findings`, `--non-clean`, `--repo`, or `--author` to narrow the list. The
storage stays flat so a rerun can overwrite exactly one file for a commit
without rediscovering a date bucket.

### Safety Model

- Maintainer-authored items are excluded from automated closes.
- Protected labels block close proposals.
- Open PRs with GitHub closing references block issue closes until the PR is
  resolved.
- Open same-author issue/PR pairs block one-sided closes.
- Codex runs without GitHub write tokens.
- Issue/PR event jobs create target write and report-push credentials only after
  Codex exits.
- Commit review workers give Codex only a read-scoped target token as `GH_TOKEN`
  so it can inspect mentioned issues, PRs, workflow runs, and commit metadata.
- Commit write/check credentials are created only after Codex exits.
- CI makes the target checkout read-only for reviews.
- Reviews fail if Codex leaves tracked or untracked changes behind.
- Snapshot changes block apply unless the only change is the bot’s own review
  comment.
- Commit Check Runs are optional and disabled by default.

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

Issue/PR sweeper:

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

List commit reports:

```bash
source ~/.profile
corepack enable
pnpm run build
pnpm commit-reports -- --since 24h
pnpm commit-reports -- --since 24h --findings
pnpm commit-reports -- --repo openclaw/openclaw --author steipete --since 7d
```

Manually rerun commit review through GitHub Actions:

```bash
gh workflow run commit-review.yml \
  --repo openclaw/clawsweeper \
  --ref main \
  -f target_repo=openclaw/openclaw \
  -f commit_sha=<commit-sha> \
  -f before_sha=<parent-or-range-start-sha> \
  -f create_checks=false \
  -f enabled=true \
  -f additional_prompt='Optional extra review focus.'
```

Omit `before_sha` for a single-commit review. Pass `before_sha` to review the
historic range `before_sha..commit_sha`.

Manual review runs are proposal-only. Use `apply_existing=true` to apply unchanged
proposals later. Scheduled apply runs process both issues and pull requests by
default, subject to the selected repository profile; pass `target_repo`,
`apply_kind=issue`, or `apply_kind=pull_request` to narrow a manual run.

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

Target repositories can opt into main-branch commit review with
[docs/commit-dispatcher.md](docs/commit-dispatcher.md). That dispatcher sends
push ranges to this repository, where ClawSweeper expands the range and writes
one commit report per SHA.

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
- `CLAWSWEEPER_APP_CLIENT_ID`: public GitHub App client ID for `clawsweeper`.
  Currently `Iv23liOECG0slfuhz093`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `clawsweeper`; plan/review
  jobs use a short-lived GitHub App installation token for read-heavy target API
  calls, commit review uses a read-scoped target token while Codex runs, and
  apply/comment-sync/check jobs use the app token for comments, closes, and
  optional checks.
  Keep App credentials scoped to the `actions/create-github-app-token` step.
  Review shards run Codex over attacker-controlled issue/PR text, so
  `codexEnv()` also strips these App variables before spawning Codex.

Token flow:

- Review shards log Codex in with `OPENAI_API_KEY`, then run without OpenAI or
  Codex token environment variables.
- ClawSweeper uses the `clawsweeper` GitHub App token for read-heavy target
  context.
- Apply mode uses the same app token for review comments and closes, so GitHub
  attributes mutations to the app bot account instead of a PAT user.
- Commit review passes Codex only a read-scoped target token as `GH_TOKEN` for
  issue/PR/workflow/commit hydration, then creates write/check credentials only
  after Codex exits.
- The built-in `GITHUB_TOKEN` commits generated reports back to this repo.

Required `clawsweeper` app permissions:

- Contents: read/write, for report commits, repair branches, and repository
  dispatch inputs that need a contents-scoped installation token.
- Issues: read/write, for issue comments, labels, closes, and maintainer command
  authorization context.
- Pull requests: read/write, for PR comments, labels, merge readiness, repair PRs,
  and guarded automerge.
- Actions: read/write on `openclaw/clawsweeper`, for run cancellation, manual
  dispatch, self-heal, and commit-review continuations.
- Checks: write on target repositories when commit Check Runs should be
  published.

ClawSweeper no longer falls back to PAT-based write tokens. If the GitHub App
installation does not grant the requested permission set, the workflow fails at
token creation instead of silently switching identity.

Target repository setup:

- install the issue/PR dispatcher from
  [docs/target-dispatcher.md](docs/target-dispatcher.md) for exact item event
  reviews
- install the commit dispatcher from
  [docs/commit-dispatcher.md](docs/commit-dispatcher.md) for `main` commit
  reviews
- set `CLAWSWEEPER_COMMIT_REVIEW_ENABLED=false` to disable commit dispatch
  without code changes
- set `CLAWSWEEPER_COMMIT_REVIEW_CREATE_CHECKS=true` only if commit Check Runs
  should be published
