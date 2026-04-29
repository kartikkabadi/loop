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

Last dashboard update: Apr 29, 2026, 08:31 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4417 |
| Open PRs | 3489 |
| Open items total | 7906 |
| Reviewed files | 7532 |
| Unreviewed open items | 374 |
| Due now by cadence | 2062 |
| Proposed closes awaiting apply | 3 |
| Work candidates awaiting promotion | 590 |
| Closed by Codex apply | 10737 |
| Failed or stale reviews | 21 |
| Archived closed files | 14129 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6982 | 6615 | 367 | 2043 | 3 | 549 | 10726 | Apr 29, 2026, 08:17 UTC | Apr 29, 2026, 08:13 UTC | 776 |
| [ClawHub](https://github.com/openclaw/clawhub) | 924 | 917 | 7 | 19 | 0 | 41 | 7 | Apr 29, 2026, 08:13 UTC | Apr 29, 2026, 07:52 UTC | 483 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 29, 2026, 08:31 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25097192351) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 29, 2026, 08:13 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25097222195) |

### Fleet Activity

Latest review: Apr 29, 2026, 08:17 UTC. Latest close: Apr 29, 2026, 08:13 UTC. Latest comment sync: Apr 29, 2026, 08:30 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 317 | 0 |
| Last hour | 999 | 9 | 990 | 12 | 19 | 1259 | 1 |
| Last 24 hours | 6970 | 449 | 6521 | 17 | 740 | 2144 | 26 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40352](https://github.com/openclaw/openclaw/issues/40352) | [Bug]: Control UI Model Selection dropdown shows stale model after config reload | closed externally after review | Apr 29, 2026, 08:26 UTC | [records/openclaw-openclaw/closed/40352.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40352.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74000](https://github.com/openclaw/openclaw/pull/74000) | fix(ui): keep control UI select values stable on load | closed externally after review | Apr 29, 2026, 08:26 UTC | [records/openclaw-openclaw/closed/74000.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74000.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74208](https://github.com/openclaw/openclaw/issues/74208) | [Bug]: The 2026.4.26 version has difficulties in using the local model. | duplicate or superseded | Apr 29, 2026, 08:22 UTC | [records/openclaw-openclaw/closed/74208.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74208.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73893](https://github.com/openclaw/openclaw/pull/73893) | fix(gateway): honor configured image capability for provider models | already implemented on main | Apr 29, 2026, 08:22 UTC | [records/openclaw-openclaw/closed/73893.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73893.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70779](https://github.com/openclaw/openclaw/issues/70779) | [Regression] OpenAI-compatible Gemini backend enters streaming mode but completes immediately with no incremental content updates (4.19 OK, 4.21+/4.22 broken) | duplicate or superseded | Apr 29, 2026, 08:22 UTC | [records/openclaw-openclaw/closed/70779.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70779.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69326](https://github.com/openclaw/openclaw/issues/69326) | [Bug] Replies not routed back to WeChat when message originates from webchat UI | duplicate or superseded | Apr 29, 2026, 08:22 UTC | [records/openclaw-openclaw/closed/69326.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69326.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74206](https://github.com/openclaw/openclaw/issues/74206) | MiniMax API error 2013 'chat content is empty' on new session (v2026.4.26, regressed from v2026.4.23) | duplicate or superseded | Apr 29, 2026, 08:13 UTC | [records/openclaw-openclaw/closed/74206.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74206.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74067](https://github.com/openclaw/openclaw/pull/74067) | fix: Found one bug in the new compile-cache prune path: it removes a d | closed externally after review | Apr 29, 2026, 08:13 UTC | [records/openclaw-openclaw/closed/74067.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74067.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74201](https://github.com/openclaw/openclaw/pull/74201) | ci: add Knip dependency check | closed externally after review | Apr 29, 2026, 08:10 UTC | [records/openclaw-openclaw/closed/74201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74201.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73983](https://github.com/openclaw/openclaw/pull/73983) | fix(browser): ignore Playwright dialog race rejections | kept open | Apr 29, 2026, 08:08 UTC | [records/openclaw-openclaw/closed/73983.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73983.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71710](https://github.com/openclaw/openclaw/issues/71710) | [Bug]: openclaw-agent ignores SIGTERM under cron, accumulates hung process chains and exhausts host RAM/swap | high | candidate | Apr 29, 2026, 08:08 UTC | [records/openclaw-openclaw/items/71710.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71710.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 08:08 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70306](https://github.com/openclaw/openclaw/pull/70306) | fix(acp+gateway): clean final emit, fallback visibility, legacy unit resolve | high | candidate | Apr 29, 2026, 08:07 UTC | [records/openclaw-openclaw/items/70306.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70306.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71178](https://github.com/openclaw/openclaw/issues/71178) | `openclaw update` run mid-turn causes total message loss on Telegram (and likely Discord) | high | candidate | Apr 29, 2026, 08:07 UTC | [records/openclaw-openclaw/items/71178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71178.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71482](https://github.com/openclaw/openclaw/pull/71482) | fix(memory-core): skip orphan archival when session store is empty | high | candidate | Apr 29, 2026, 08:06 UTC | [records/openclaw-openclaw/items/71482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71482.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70533](https://github.com/openclaw/openclaw/issues/70533) | Plugin discovery loads all dist/extensions/ manifests at boot regardless of tools.allow (~500 MB structural heap) | high | candidate | Apr 29, 2026, 08:06 UTC | [records/openclaw-openclaw/items/70533.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70533.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 08:06 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69778](https://github.com/openclaw/openclaw/issues/69778) | [Bug]: Gateway restart resurrects ancient interrupted CLI subagent tasks regardless of age — old prompts auto-execute | high | candidate | Apr 29, 2026, 08:06 UTC | [records/openclaw-openclaw/items/69778.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69778.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70643](https://github.com/openclaw/openclaw/issues/70643) | Concurrent writes to openclaw.json produce invalid (concatenated) JSON; gateway refuses config until auto-restore | high | candidate | Apr 29, 2026, 08:05 UTC | [records/openclaw-openclaw/items/70643.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70643.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71803](https://github.com/openclaw/openclaw/issues/71803) | CLI watchdog kills sessions that are correctly idle while waiting on a Monitor task | high | candidate | Apr 29, 2026, 08:05 UTC | [records/openclaw-openclaw/items/71803.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71803.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71865](https://github.com/openclaw/openclaw/issues/71865) | Auth login blocked by size-drop guard when openclaw.json was created by PowerShell (verbose/BOM format) | high | candidate | Apr 29, 2026, 08:05 UTC | [records/openclaw-openclaw/items/71865.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71865.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69599](https://github.com/openclaw/openclaw/issues/69599) | [Bug]: Control UI /new, /reset, and New Session do not create the same true fresh session as direct session creation | high | candidate | Apr 29, 2026, 08:05 UTC | [records/openclaw-openclaw/items/69599.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69599.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69954](https://github.com/openclaw/openclaw/pull/69954) | fix: fall back to canonical session transcripts during cleanup | high | candidate | Apr 29, 2026, 08:05 UTC | [records/openclaw-openclaw/items/69954.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69954.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70347](https://github.com/openclaw/openclaw/issues/70347) | Cron outer timeout should emit lifecycle.error so sessions.json finalizes immediately | high | candidate | Apr 29, 2026, 08:05 UTC | [records/openclaw-openclaw/items/70347.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70347.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74203](https://github.com/openclaw/openclaw/issues/74203) | [Bug]: Telegram safe-send retry misses grammY Network request failed envelope | high | candidate | Apr 29, 2026, 08:04 UTC | [records/openclaw-openclaw/items/74203.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74203.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73536](https://github.com/openclaw/openclaw/pull/73536) | fix(agents/bundle-mcp): pass configured timeout to MCP callTool requests (#60967) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73536.md) | complete | Apr 29, 2026, 08:17 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73499](https://github.com/openclaw/openclaw/pull/73499) | feat(agents): add mid-turn compaction precheck | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73499.md) | complete | Apr 29, 2026, 08:17 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71915](https://github.com/openclaw/openclaw/issues/71915) | [Bug]: Gateway 100% CPU / infinite loop with DeepSeek V4 models on 2026.4.24 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71915.md) | complete | Apr 29, 2026, 08:14 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72276](https://github.com/openclaw/openclaw/pull/72276) | [codex] Consolidate embedded runner structural splits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72276.md) | complete | Apr 29, 2026, 08:14 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74135](https://github.com/openclaw/openclaw/issues/74135) | Gateway intermittently stalls: WebSocket preauth handshakes time out late during model catalog/provider discovery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74135.md) | complete | Apr 29, 2026, 08:13 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74205](https://github.com/openclaw/openclaw/issues/74205) | [Bug]: kimi/k2p6 returns incomplete terminal response and gateway status probe times out | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74205.md) | complete | Apr 29, 2026, 08:13 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1662](https://github.com/openclaw/clawhub/issues/1662) | Appealing Suspicious Tag on Agent-Changelog Skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1662.md) | failed | Apr 29, 2026, 08:13 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69478](https://github.com/openclaw/openclaw/issues/69478) | [Bug]: enqueueSystemEvent not deduplicated by runId/contextKey — agents cascade duplicate exec approval prompts under new IDs, locking ecosystem | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69478.md) | complete | Apr 29, 2026, 08:12 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1817](https://github.com/openclaw/clawhub/issues/1817) | False positive: trustboost-pii-sanitizer flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1817.md) | complete | Apr 29, 2026, 08:11 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1711](https://github.com/openclaw/clawhub/issues/1711) | Request: Change skill display name from 'skill' to 'Relic Soul Chip' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1711.md) | complete | Apr 29, 2026, 08:11 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 08:31 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 315. Item numbers: 6792,7057,7338,7359,7403,7433,8724,9394,9465,9607,10029,10137,10354,10872,11414,11473,11489,11517,11655,11665,11703,11960,12008,12047,12198,12219,12398,12441,12512,12554,13241,13271,13304,13337,13362,13417,13440,13479,13543,13570,13613,13616,13620,13744,13751,14251,14438,14526,14601,14850,14874,16896,17098,17213,17810,17876,17925,18985,20321,22021,22438,23585,27137,28300,32438,37589,38714,39060,39115,39343,47452,48920,50040,50611,51421,52457,53650,53676,54105,58808,58971,60946,63188,63193,63195,63196,63208,63210,63216,63223,63234,63257,63261,63265,63266,63269,63279,63289,63295,63308,63312,63321,63324,63330,63335,63339,63343,63347,63371,63373,63380,63392,63413,63423,63427,63474,63475,63571,63589,63636,63637,63644,63666,63696,63770,63806,63826,63877,63905,64036,64078,64673,65509,65525,65536,65538,65541,65547,65557,65563,65567,65574,65575,65606,65619,65623,65624,65636,65637,65640,65641,65642,65643,65650,65656,65668,65686,65689,65707,65720,65729,65741,65751,65767,65768,65770,65773,65776,65782,65783,65786,65792,65799,65802,65839,65859,65862,65868,65892,65898,65923,65936,65937,65939,65958,66020,66023,66115,66123,66252,66459,67472,67509,67916,68845,69118,69121,69123,69139,69159,69165,69172,69182,69190,69199,69220,69245,69249,69260,69269,69270,69307,69310,69312,69315,69322,69326,69327,69328,69346,69355,69364,69371,69372,69374,69386,69399,69408,69413,69417,69422,69428,69443,69451,69454,69463,69467,69475,69478,69486,69491,69492,69494,69495,69505,69519,69525,69529,69533,69536,69541,69542,69546,69548,69562,69567,69570,69572,69599,69605,69627,69629,69647,69668,69669,69678,69690,69696,69697,69700,69701,69704,69707,69727,69737,69740,69748,69754,69755,69759,69768,69777,69778,69793,69806,69822,69835,69849,69859,69904,69926,69928,69943,69954,69966,69972,69975,69978,69988,70002,70005,70024,70033,70040,70043,70050,70051,70058,70061,70072,70105,70133,70134,70164,70192,70202,70221,70228,70229,70230,70266,70278,70279,70286,70287,70288,70290,70306,70330,70332,70333,70341,70344,70347,70348,70363,70372,70407,70409,70418,70420,70439,70443,70453,70459,70466,70471,70473,70474,70477,70508,70515,70529,70533,70540,70541,70559,70575,70578,70596,70598,70609,70616,70629,70630,70634,70638,70643,70647,70664,70667,70676,70680,70681,70694,70729,70739,70755,70779,70788,70789,70795,70797,70799,70801,70805,70821,70822,70851,70879,70882,70892,70894,70915,70944,70953,71012,71024,71049,71062,71112,71113,71135,71141,71178,71205,71235,71280,71330,71396,71399,71400,71463,71482,71589,71619,71699,71709,71710,71711,71712,71721,71738,71770,71775,71783,71786,71787,71792,71803,71817,71831,71837,71849,71862,71863,71865,71867,71885,71886,71887,71889,71898,71899,71915,71921,71930,71932,71940,71941,71947,71950,71953,71973,72001,72033,72294,72341,72351,72449,72534,72796,72913,73563,73671,73779,73855,73860,73893,73928,73945,74008,74009,74010,74051,74079,74113,74114,74115,74116,74117,74118,74120,74121,74122,74123,74124,74125,74128,74131,74135,74136,74137,74138,74139,74141,74142,74144,74149,74151.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25097192351](https://github.com/openclaw/clawsweeper/actions/runs/25097192351)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3533 |
| Open PRs | 3449 |
| Open items total | 6982 |
| Reviewed files | 6615 |
| Unreviewed open items | 367 |
| Archived closed files | 14101 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3351 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3249 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6600 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 549 |
| Closed by Codex apply | 10730 |
| Failed or stale reviews | 12 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 239/1023 current (784 due, 23.4%) |
| Hourly hot item cadence (<7d) | 239/1023 current (784 due, 23.4%) |
| Daily cadence coverage | 2896/3787 current (891 due, 76.5%) |
| Daily PR cadence | 2174/2648 current (474 due, 82.1%) |
| Daily new issue cadence (<30d) | 722/1139 current (417 due, 63.4%) |
| Weekly older issue cadence | 1804/1805 current (1 due, 99.9%) |
| Due now by cadence | 2043 |

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

Latest review: Apr 29, 2026, 08:17 UTC. Latest close: Apr 29, 2026, 08:13 UTC. Latest comment sync: Apr 29, 2026, 08:30 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 317 | 0 |
| Last hour | 560 | 9 | 551 | 3 | 18 | 776 | 1 |
| Last 24 hours | 6041 | 449 | 5592 | 8 | 728 | 1650 | 26 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#40352](https://github.com/openclaw/openclaw/issues/40352) | [Bug]: Control UI Model Selection dropdown shows stale model after config reload | closed externally after review | Apr 29, 2026, 08:26 UTC | [records/openclaw-openclaw/closed/40352.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40352.md) |
| [#74000](https://github.com/openclaw/openclaw/pull/74000) | fix(ui): keep control UI select values stable on load | closed externally after review | Apr 29, 2026, 08:26 UTC | [records/openclaw-openclaw/closed/74000.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74000.md) |
| [#74208](https://github.com/openclaw/openclaw/issues/74208) | [Bug]: The 2026.4.26 version has difficulties in using the local model. | duplicate or superseded | Apr 29, 2026, 08:22 UTC | [records/openclaw-openclaw/closed/74208.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74208.md) |
| [#73893](https://github.com/openclaw/openclaw/pull/73893) | fix(gateway): honor configured image capability for provider models | already implemented on main | Apr 29, 2026, 08:22 UTC | [records/openclaw-openclaw/closed/73893.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73893.md) |
| [#70779](https://github.com/openclaw/openclaw/issues/70779) | [Regression] OpenAI-compatible Gemini backend enters streaming mode but completes immediately with no incremental content updates (4.19 OK, 4.21+/4.22 broken) | duplicate or superseded | Apr 29, 2026, 08:22 UTC | [records/openclaw-openclaw/closed/70779.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70779.md) |
| [#69326](https://github.com/openclaw/openclaw/issues/69326) | [Bug] Replies not routed back to WeChat when message originates from webchat UI | duplicate or superseded | Apr 29, 2026, 08:22 UTC | [records/openclaw-openclaw/closed/69326.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69326.md) |
| [#74206](https://github.com/openclaw/openclaw/issues/74206) | MiniMax API error 2013 'chat content is empty' on new session (v2026.4.26, regressed from v2026.4.23) | duplicate or superseded | Apr 29, 2026, 08:13 UTC | [records/openclaw-openclaw/closed/74206.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74206.md) |
| [#74067](https://github.com/openclaw/openclaw/pull/74067) | fix: Found one bug in the new compile-cache prune path: it removes a d | closed externally after review | Apr 29, 2026, 08:13 UTC | [records/openclaw-openclaw/closed/74067.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74067.md) |
| [#74201](https://github.com/openclaw/openclaw/pull/74201) | ci: add Knip dependency check | closed externally after review | Apr 29, 2026, 08:10 UTC | [records/openclaw-openclaw/closed/74201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74201.md) |
| [#73983](https://github.com/openclaw/openclaw/pull/73983) | fix(browser): ignore Playwright dialog race rejections | kept open | Apr 29, 2026, 08:08 UTC | [records/openclaw-openclaw/closed/73983.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73983.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#71710](https://github.com/openclaw/openclaw/issues/71710) | [Bug]: openclaw-agent ignores SIGTERM under cron, accumulates hung process chains and exhausts host RAM/swap | high | candidate | Apr 29, 2026, 08:08 UTC | [records/openclaw-openclaw/items/71710.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71710.md) |
| [#70306](https://github.com/openclaw/openclaw/pull/70306) | fix(acp+gateway): clean final emit, fallback visibility, legacy unit resolve | high | candidate | Apr 29, 2026, 08:07 UTC | [records/openclaw-openclaw/items/70306.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70306.md) |
| [#71178](https://github.com/openclaw/openclaw/issues/71178) | `openclaw update` run mid-turn causes total message loss on Telegram (and likely Discord) | high | candidate | Apr 29, 2026, 08:07 UTC | [records/openclaw-openclaw/items/71178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71178.md) |
| [#71482](https://github.com/openclaw/openclaw/pull/71482) | fix(memory-core): skip orphan archival when session store is empty | high | candidate | Apr 29, 2026, 08:06 UTC | [records/openclaw-openclaw/items/71482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71482.md) |
| [#70533](https://github.com/openclaw/openclaw/issues/70533) | Plugin discovery loads all dist/extensions/ manifests at boot regardless of tools.allow (~500 MB structural heap) | high | candidate | Apr 29, 2026, 08:06 UTC | [records/openclaw-openclaw/items/70533.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70533.md) |
| [#69778](https://github.com/openclaw/openclaw/issues/69778) | [Bug]: Gateway restart resurrects ancient interrupted CLI subagent tasks regardless of age — old prompts auto-execute | high | candidate | Apr 29, 2026, 08:06 UTC | [records/openclaw-openclaw/items/69778.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69778.md) |
| [#70643](https://github.com/openclaw/openclaw/issues/70643) | Concurrent writes to openclaw.json produce invalid (concatenated) JSON; gateway refuses config until auto-restore | high | candidate | Apr 29, 2026, 08:05 UTC | [records/openclaw-openclaw/items/70643.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70643.md) |
| [#71803](https://github.com/openclaw/openclaw/issues/71803) | CLI watchdog kills sessions that are correctly idle while waiting on a Monitor task | high | candidate | Apr 29, 2026, 08:05 UTC | [records/openclaw-openclaw/items/71803.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71803.md) |
| [#71865](https://github.com/openclaw/openclaw/issues/71865) | Auth login blocked by size-drop guard when openclaw.json was created by PowerShell (verbose/BOM format) | high | candidate | Apr 29, 2026, 08:05 UTC | [records/openclaw-openclaw/items/71865.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71865.md) |
| [#69599](https://github.com/openclaw/openclaw/issues/69599) | [Bug]: Control UI /new, /reset, and New Session do not create the same true fresh session as direct session creation | high | candidate | Apr 29, 2026, 08:05 UTC | [records/openclaw-openclaw/items/69599.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69599.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73536](https://github.com/openclaw/openclaw/pull/73536) | fix(agents/bundle-mcp): pass configured timeout to MCP callTool requests (#60967) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73536.md) | complete | Apr 29, 2026, 08:17 UTC |
| [#73499](https://github.com/openclaw/openclaw/pull/73499) | feat(agents): add mid-turn compaction precheck | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73499.md) | complete | Apr 29, 2026, 08:17 UTC |
| [#71915](https://github.com/openclaw/openclaw/issues/71915) | [Bug]: Gateway 100% CPU / infinite loop with DeepSeek V4 models on 2026.4.24 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71915.md) | complete | Apr 29, 2026, 08:14 UTC |
| [#72276](https://github.com/openclaw/openclaw/pull/72276) | [codex] Consolidate embedded runner structural splits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72276.md) | complete | Apr 29, 2026, 08:14 UTC |
| [#74135](https://github.com/openclaw/openclaw/issues/74135) | Gateway intermittently stalls: WebSocket preauth handshakes time out late during model catalog/provider discovery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74135.md) | complete | Apr 29, 2026, 08:13 UTC |
| [#74205](https://github.com/openclaw/openclaw/issues/74205) | [Bug]: kimi/k2p6 returns incomplete terminal response and gateway status probe times out | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74205.md) | complete | Apr 29, 2026, 08:13 UTC |
| [#69478](https://github.com/openclaw/openclaw/issues/69478) | [Bug]: enqueueSystemEvent not deduplicated by runId/contextKey — agents cascade duplicate exec approval prompts under new IDs, locking ecosystem | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69478.md) | complete | Apr 29, 2026, 08:12 UTC |
| [#71770](https://github.com/openclaw/openclaw/issues/71770) | Feature Request: Automatic Token-Based Model Failover | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71770.md) | complete | Apr 29, 2026, 08:10 UTC |
| [#65509](https://github.com/openclaw/openclaw/pull/65509) | feat(workspace): respect OPENCLAW_STATE_DIR for workspace base path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65509.md) | complete | Apr 29, 2026, 08:10 UTC |
| [#69822](https://github.com/openclaw/openclaw/pull/69822) | feat(session-message-events) socket.drain | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69822.md) | failed | Apr 29, 2026, 08:09 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 08:27 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25097826795](https://github.com/openclaw/clawsweeper/actions/runs/25097826795)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 884 |
| Open PRs | 40 |
| Open items total | 924 |
| Reviewed files | 917 |
| Unreviewed open items | 7 |
| Archived closed files | 22 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 875 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 909 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 41 |
| Closed by Codex apply | 7 |
| Failed or stale reviews | 9 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 53/56 current (3 due, 94.6%) |
| Hourly hot item cadence (<7d) | 53/56 current (3 due, 94.6%) |
| Daily cadence coverage | 215/218 current (3 due, 98.6%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 194/197 current (3 due, 98.5%) |
| Weekly older issue cadence | 637/643 current (6 due, 99.1%) |
| Due now by cadence | 19 |

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

Latest review: Apr 29, 2026, 08:25 UTC. Latest close: Apr 29, 2026, 07:52 UTC. Latest comment sync: Apr 29, 2026, 08:26 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 439 | 0 | 439 | 9 | 1 | 483 | 0 |
| Last 24 hours | 929 | 0 | 929 | 9 | 12 | 494 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1889](https://github.com/openclaw/clawhub/pull/1889) | fix: restore ClawHub public UI | closed externally after review | Apr 29, 2026, 07:52 UTC | [records/openclaw-clawhub/closed/1889.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1889.md) |
| [#1881](https://github.com/openclaw/clawhub/pull/1881) | chore(ci): update package publish artifact action | closed externally after review | Apr 29, 2026, 05:31 UTC | [records/openclaw-clawhub/closed/1881.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1881.md) |
| [#1880](https://github.com/openclaw/clawhub/pull/1880) | feat: add featured plugin curation | kept open | Apr 29, 2026, 05:13 UTC | [records/openclaw-clawhub/closed/1880.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1880.md) |
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | closed externally after review | Apr 29, 2026, 04:24 UTC | [records/openclaw-clawhub/closed/1871.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1871.md) |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | kept open | Apr 29, 2026, 03:02 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 08:08 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 08:06 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 08:01 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 07:59 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 07:59 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 07:59 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 07:58 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 07:58 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 07:57 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 07:57 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1891](https://github.com/openclaw/clawhub/pull/1891) | [codex] remove card link hover underlines | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1891.md) | complete | Apr 29, 2026, 08:25 UTC |
| [#1662](https://github.com/openclaw/clawhub/issues/1662) | Appealing Suspicious Tag on Agent-Changelog Skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1662.md) | failed | Apr 29, 2026, 08:13 UTC |
| [#1817](https://github.com/openclaw/clawhub/issues/1817) | False positive: trustboost-pii-sanitizer flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1817.md) | complete | Apr 29, 2026, 08:11 UTC |
| [#1711](https://github.com/openclaw/clawhub/issues/1711) | Request: Change skill display name from 'skill' to 'Relic Soul Chip' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1711.md) | complete | Apr 29, 2026, 08:11 UTC |
| [#1639](https://github.com/openclaw/clawhub/issues/1639) | Request for Early Publishing Permission - Xiaohongshu Viral Title Generator | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1639.md) | failed | Apr 29, 2026, 08:10 UTC |
| [#1690](https://github.com/openclaw/clawhub/issues/1690) | False positive flag: eolas-openclaw-mcp is a legitimate DeFi trading plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1690.md) | complete | Apr 29, 2026, 08:10 UTC |
| [#1673](https://github.com/openclaw/clawhub/issues/1673) | False positive: @kansodata/kansodata-mongodb-plugin still flagged Suspicious after 0.1.2 metadata fixes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1673.md) | complete | Apr 29, 2026, 08:10 UTC |
| [#1856](https://github.com/openclaw/clawhub/pull/1856) | fix(cli): preserve root skill manifest during publish | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1856.md) | complete | Apr 29, 2026, 08:09 UTC |
| [#1783](https://github.com/openclaw/clawhub/issues/1783) | False Positive Malware Detection for @nimsuite/openclaw-nim-channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1783.md) | failed | Apr 29, 2026, 08:09 UTC |
| [#1666](https://github.com/openclaw/clawhub/issues/1666) | Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1666.md) | complete | Apr 29, 2026, 08:09 UTC |

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
  `CLAWSWEEPER_REPAIR_COMMIT_FINDINGS_ENABLED` is not `false`. ClawSweeper owns
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

Manual review runs are proposal-only even if `--apply-closures` or workflow
input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged
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
- `CODEX_API_KEY`: optional compatibility alias for the same key during the
  login check.
- `CLAWSWEEPER_APP_CLIENT_ID`: public GitHub App client ID for `openclaw-ci`.
  Currently `Iv23liOECG0slfuhz093`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `openclaw-ci`; plan/review
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
- ClawSweeper uses the `openclaw-ci` GitHub App token for read-heavy target
  context.
- Apply mode uses the same app token for review comments and closes, so GitHub
  attributes mutations to the app bot account instead of a PAT user.
- Commit review passes Codex only a read-scoped target token as `GH_TOKEN` for
  issue/PR/workflow/commit hydration, then creates write/check credentials only
  after Codex exits.
- The built-in `GITHUB_TOKEN` commits generated reports back to this repo.

Required app permissions:

- read access for target scan context
- write access to target repository issues and pull requests
- optional Checks write on target repositories for commit Check Runs
- optional Actions write on `openclaw/clawsweeper` for app-token-based run
  cancellation, dispatch, or commit-review continuations

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
