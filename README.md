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

Last dashboard update: Apr 29, 2026, 11:01 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4240 |
| Open PRs | 3278 |
| Open items total | 7518 |
| Reviewed files | 7518 |
| Unreviewed open items | 0 |
| Due now by cadence | 2301 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 625 |
| Closed by Codex apply | 10760 |
| Failed or stale reviews | 28 |
| Archived closed files | 14221 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6597 | 6597 | 0 | 2232 | 0 | 579 | 10752 | Apr 29, 2026, 11:00 UTC | Apr 29, 2026, 10:59 UTC | 49 |
| [ClawHub](https://github.com/openclaw/clawhub) | 921 | 921 | 0 | 69 | 0 | 46 | 8 | Apr 29, 2026, 10:19 UTC | Apr 29, 2026, 08:25 UTC | 1 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 29, 2026, 11:01 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25105106594) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 29, 2026, 11:00 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25104969290) |

### Fleet Activity

Latest review: Apr 29, 2026, 11:00 UTC. Latest close: Apr 29, 2026, 10:59 UTC. Latest comment sync: Apr 29, 2026, 11:00 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 1 | 19 | 0 | 8 | 21 | 0 |
| Last hour | 49 | 3 | 46 | 0 | 24 | 50 | 0 |
| Last 24 hours | 6463 | 444 | 6019 | 23 | 745 | 2390 | 25 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73474](https://github.com/openclaw/openclaw/pull/73474) | fix(gateway,proxy): bypass Windows proxy for localhost gateway connections | closed externally after review | Apr 29, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73474.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73474.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74281](https://github.com/openclaw/openclaw/issues/74281) | [Bug]: Custom watchdog kills healthy gateway during slow startup (2026.4.26 + 20 plugin deps) | not actionable in this repository | Apr 29, 2026, 10:59 UTC | [records/openclaw-openclaw/closed/74281.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74281.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66920](https://github.com/openclaw/openclaw/issues/66920) | WhatsApp group inbound messages silently drop after repeated 408 reconnect cycles (DMs survive) | closed externally after review | Apr 29, 2026, 10:55 UTC | [records/openclaw-openclaw/closed/66920.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66920.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63855](https://github.com/openclaw/openclaw/issues/63855) | WhatsApp: stale socket causes silent message loss (connection appears live but drops inbound messages) | closed externally after review | Apr 29, 2026, 10:55 UTC | [records/openclaw-openclaw/closed/63855.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63855.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60444](https://github.com/openclaw/openclaw/pull/60444) | fix: replace structuredClone with JSON cloning in session store cache | closed externally after review | Apr 29, 2026, 10:53 UTC | [records/openclaw-openclaw/closed/60444.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60444.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41561](https://github.com/openclaw/openclaw/pull/41561) | fix(thinking): support xhigh through aliases and proxy refs | closed externally after review | Apr 29, 2026, 10:48 UTC | [records/openclaw-openclaw/closed/41561.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41561.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39115](https://github.com/openclaw/openclaw/pull/39115) | feat(config): add reasoningDefault to agents.defaults | closed externally after review | Apr 29, 2026, 10:47 UTC | [records/openclaw-openclaw/closed/39115.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/39115.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#16035](https://github.com/openclaw/openclaw/issues/16035) | [Feature]: Make OpenClaw agents to identify themselves as agent, clearly, in Github profile | closed externally after review | Apr 29, 2026, 10:47 UTC | [records/openclaw-openclaw/closed/16035.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/16035.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74267](https://github.com/openclaw/openclaw/pull/74267) | fix(ui): make control prompts real modals | closed externally after review | Apr 29, 2026, 10:46 UTC | [records/openclaw-openclaw/closed/74267.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74267.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71112](https://github.com/openclaw/openclaw/pull/71112) | feat(memory-lancedb): support query cmd for llm CLI | closed externally after review | Apr 29, 2026, 10:42 UTC | [records/openclaw-openclaw/closed/71112.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71112.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74262](https://github.com/openclaw/openclaw/issues/74262) | Update QA lab parity gate for GPT-5.5 vs Opus 4.7 and harden preflight | high | candidate | Apr 29, 2026, 09:44 UTC | [records/openclaw-openclaw/items/74262.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74262.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74245](https://github.com/openclaw/openclaw/issues/74245) | [Bug]: deepseek extension missing provider-policy-api.ts — contextWindow and cost default to wrong values | high | candidate | Apr 29, 2026, 09:22 UTC | [records/openclaw-openclaw/items/74245.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74245.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63343](https://github.com/openclaw/openclaw/issues/63343) | Browser bridge: \"tab not found\" race in ensureTabAvailable when wsUrl lags CDP discovery | high | candidate | Apr 29, 2026, 08:47 UTC | [records/openclaw-openclaw/items/63343.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63343.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46080](https://github.com/openclaw/openclaw/issues/46080) | Bug: Anthropic tool_result succeeds but final assistant content is empty, causing 'No reply from agent' | high | candidate | Apr 29, 2026, 08:46 UTC | [records/openclaw-openclaw/items/46080.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46080.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73532](https://github.com/openclaw/openclaw/issues/73532) | Plugin loader hot loop: prepareBundledPluginRuntimeDistMirror + JSON5 manifest parsing saturate gateway and starve event loop | high | candidate | Apr 29, 2026, 08:46 UTC | [records/openclaw-openclaw/items/73532.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73532.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#47229](https://github.com/openclaw/openclaw/issues/47229) | [Bug]: Anthropic SDK path missing large-integer precision guard (tool_use input) | high | candidate | Apr 29, 2026, 08:46 UTC | [records/openclaw-openclaw/items/47229.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/47229.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74159](https://github.com/openclaw/openclaw/issues/74159) | github-copilot: Gemini models route to unsupported /responses endpoint, and openai-completions transport bypasses Copilot IDE auth headers | high | candidate | Apr 29, 2026, 08:46 UTC | [records/openclaw-openclaw/items/74159.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74159.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#38945](https://github.com/openclaw/openclaw/pull/38945) | fix(memory): Unicode support for MMR and FTS tokenizers | high | candidate | Apr 29, 2026, 08:45 UTC | [records/openclaw-openclaw/items/38945.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38945.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45926](https://github.com/openclaw/openclaw/issues/45926) | sessions_send: announce step skipped on timeout (should run async) | high | candidate | Apr 29, 2026, 08:45 UTC | [records/openclaw-openclaw/items/45926.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45926.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74175](https://github.com/openclaw/openclaw/pull/74175) | fix(memory): add LIKE fallback when FTS5 MATCH throws and log silent search errors | high | candidate | Apr 29, 2026, 08:45 UTC | [records/openclaw-openclaw/items/74175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74175.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45759](https://github.com/openclaw/openclaw/issues/45759) | Telegram typing keepalive loop lacks circuit breaker, causes gateway crash on network failure | high | candidate | Apr 29, 2026, 08:45 UTC | [records/openclaw-openclaw/items/45759.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45759.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46252](https://github.com/openclaw/openclaw/issues/46252) | Cost dashboard omits .jsonl.reset.<timestamp> archive files, severely undercounting daily spend for users of /new | high | candidate | Apr 29, 2026, 08:44 UTC | [records/openclaw-openclaw/items/46252.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46252.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40611](https://github.com/openclaw/openclaw/issues/40611) | Heartbeat drift fix (PR #39182) causes aggressive retry that blocks Telegram during active conversations | high | candidate | Apr 29, 2026, 08:44 UTC | [records/openclaw-openclaw/items/40611.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/40611.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39032](https://github.com/openclaw/openclaw/issues/39032) | Subagent completion output leaks internal tool-failure reasoning to requester session | high | candidate | Apr 29, 2026, 08:44 UTC | [records/openclaw-openclaw/items/39032.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39032.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44354](https://github.com/openclaw/openclaw/issues/44354) | Bug: openclaw health --json reports stale Discord state | high | candidate | Apr 29, 2026, 08:44 UTC | [records/openclaw-openclaw/items/44354.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44354.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73749](https://github.com/openclaw/openclaw/pull/73749) | fix(tui): recover stale streaming status after unbound final | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73749.md) | complete | Apr 29, 2026, 11:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72677](https://github.com/openclaw/openclaw/pull/72677) | fix(cron): warn on main heartbeat handoff ghost runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72677.md) | complete | Apr 29, 2026, 10:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73959](https://github.com/openclaw/openclaw/pull/73959) | fix(amazon-bedrock): add modelContextWindowOverrides for per-model context window config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73959.md) | complete | Apr 29, 2026, 10:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74285](https://github.com/openclaw/openclaw/issues/74285) | Telegram: Assistant reply silently dropped after long audio transcription + subagent spawn | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74285.md) | complete | Apr 29, 2026, 10:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74282](https://github.com/openclaw/openclaw/pull/74282) | fix: add Vercel AI Gateway thinking profile | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74282.md) | complete | Apr 29, 2026, 10:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74276](https://github.com/openclaw/openclaw/pull/74276) | Fix GitHub Copilot model picker catalog | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74276.md) | complete | Apr 29, 2026, 10:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74246](https://github.com/openclaw/openclaw/pull/74246) | fix(plugins): simplify bundled runtime deps staging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74246.md) | complete | Apr 29, 2026, 10:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45438](https://github.com/openclaw/openclaw/issues/45438) | perf: structuredClone in session store cache causes native memory leak (~1GB/min) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45438.md) | complete | Apr 29, 2026, 10:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74284](https://github.com/openclaw/openclaw/issues/74284) | [Bug]: heartbeat session at agent:main:main pins model from creation time, ignores openclaw.json edits across runs (follow-up to #51677) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74284.md) | complete | Apr 29, 2026, 10:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74216](https://github.com/openclaw/openclaw/pull/74216) | fix(plugins): install runtime deps for library extensions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74216.md) | complete | Apr 29, 2026, 10:55 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 11:01 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25105106594](https://github.com/openclaw/clawsweeper/actions/runs/25105106594)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3352 |
| Open PRs | 3245 |
| Open items total | 6597 |
| Reviewed files | 6597 |
| Unreviewed open items | 0 |
| Archived closed files | 14197 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3346 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3233 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6579 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 579 |
| Closed by Codex apply | 10752 |
| Failed or stale reviews | 17 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 32/1047 current (1015 due, 3.1%) |
| Hourly hot item cadence (<7d) | 32/1047 current (1015 due, 3.1%) |
| Daily cadence coverage | 2537/3749 current (1212 due, 67.7%) |
| Daily PR cadence | 1902/2624 current (722 due, 72.5%) |
| Daily new issue cadence (<30d) | 635/1125 current (490 due, 56.4%) |
| Weekly older issue cadence | 1796/1801 current (5 due, 99.7%) |
| Due now by cadence | 2232 |

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

Latest review: Apr 29, 2026, 11:00 UTC. Latest close: Apr 29, 2026, 10:59 UTC. Latest comment sync: Apr 29, 2026, 11:00 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 1 | 19 | 0 | 8 | 21 | 0 |
| Last hour | 48 | 3 | 45 | 0 | 24 | 49 | 0 |
| Last 24 hours | 5530 | 444 | 5086 | 12 | 732 | 1590 | 25 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73474](https://github.com/openclaw/openclaw/pull/73474) | fix(gateway,proxy): bypass Windows proxy for localhost gateway connections | closed externally after review | Apr 29, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73474.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73474.md) |
| [#74281](https://github.com/openclaw/openclaw/issues/74281) | [Bug]: Custom watchdog kills healthy gateway during slow startup (2026.4.26 + 20 plugin deps) | not actionable in this repository | Apr 29, 2026, 10:59 UTC | [records/openclaw-openclaw/closed/74281.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74281.md) |
| [#66920](https://github.com/openclaw/openclaw/issues/66920) | WhatsApp group inbound messages silently drop after repeated 408 reconnect cycles (DMs survive) | closed externally after review | Apr 29, 2026, 10:55 UTC | [records/openclaw-openclaw/closed/66920.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66920.md) |
| [#63855](https://github.com/openclaw/openclaw/issues/63855) | WhatsApp: stale socket causes silent message loss (connection appears live but drops inbound messages) | closed externally after review | Apr 29, 2026, 10:55 UTC | [records/openclaw-openclaw/closed/63855.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63855.md) |
| [#60444](https://github.com/openclaw/openclaw/pull/60444) | fix: replace structuredClone with JSON cloning in session store cache | closed externally after review | Apr 29, 2026, 10:53 UTC | [records/openclaw-openclaw/closed/60444.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60444.md) |
| [#41561](https://github.com/openclaw/openclaw/pull/41561) | fix(thinking): support xhigh through aliases and proxy refs | closed externally after review | Apr 29, 2026, 10:48 UTC | [records/openclaw-openclaw/closed/41561.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41561.md) |
| [#39115](https://github.com/openclaw/openclaw/pull/39115) | feat(config): add reasoningDefault to agents.defaults | closed externally after review | Apr 29, 2026, 10:47 UTC | [records/openclaw-openclaw/closed/39115.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/39115.md) |
| [#16035](https://github.com/openclaw/openclaw/issues/16035) | [Feature]: Make OpenClaw agents to identify themselves as agent, clearly, in Github profile | closed externally after review | Apr 29, 2026, 10:47 UTC | [records/openclaw-openclaw/closed/16035.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/16035.md) |
| [#74267](https://github.com/openclaw/openclaw/pull/74267) | fix(ui): make control prompts real modals | closed externally after review | Apr 29, 2026, 10:46 UTC | [records/openclaw-openclaw/closed/74267.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74267.md) |
| [#71112](https://github.com/openclaw/openclaw/pull/71112) | feat(memory-lancedb): support query cmd for llm CLI | closed externally after review | Apr 29, 2026, 10:42 UTC | [records/openclaw-openclaw/closed/71112.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71112.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74262](https://github.com/openclaw/openclaw/issues/74262) | Update QA lab parity gate for GPT-5.5 vs Opus 4.7 and harden preflight | high | candidate | Apr 29, 2026, 09:44 UTC | [records/openclaw-openclaw/items/74262.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74262.md) |
| [#74245](https://github.com/openclaw/openclaw/issues/74245) | [Bug]: deepseek extension missing provider-policy-api.ts — contextWindow and cost default to wrong values | high | candidate | Apr 29, 2026, 09:22 UTC | [records/openclaw-openclaw/items/74245.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74245.md) |
| [#63343](https://github.com/openclaw/openclaw/issues/63343) | Browser bridge: \"tab not found\" race in ensureTabAvailable when wsUrl lags CDP discovery | high | candidate | Apr 29, 2026, 08:47 UTC | [records/openclaw-openclaw/items/63343.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63343.md) |
| [#46080](https://github.com/openclaw/openclaw/issues/46080) | Bug: Anthropic tool_result succeeds but final assistant content is empty, causing 'No reply from agent' | high | candidate | Apr 29, 2026, 08:46 UTC | [records/openclaw-openclaw/items/46080.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46080.md) |
| [#73532](https://github.com/openclaw/openclaw/issues/73532) | Plugin loader hot loop: prepareBundledPluginRuntimeDistMirror + JSON5 manifest parsing saturate gateway and starve event loop | high | candidate | Apr 29, 2026, 08:46 UTC | [records/openclaw-openclaw/items/73532.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73532.md) |
| [#47229](https://github.com/openclaw/openclaw/issues/47229) | [Bug]: Anthropic SDK path missing large-integer precision guard (tool_use input) | high | candidate | Apr 29, 2026, 08:46 UTC | [records/openclaw-openclaw/items/47229.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/47229.md) |
| [#74159](https://github.com/openclaw/openclaw/issues/74159) | github-copilot: Gemini models route to unsupported /responses endpoint, and openai-completions transport bypasses Copilot IDE auth headers | high | candidate | Apr 29, 2026, 08:46 UTC | [records/openclaw-openclaw/items/74159.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74159.md) |
| [#38945](https://github.com/openclaw/openclaw/pull/38945) | fix(memory): Unicode support for MMR and FTS tokenizers | high | candidate | Apr 29, 2026, 08:45 UTC | [records/openclaw-openclaw/items/38945.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38945.md) |
| [#45926](https://github.com/openclaw/openclaw/issues/45926) | sessions_send: announce step skipped on timeout (should run async) | high | candidate | Apr 29, 2026, 08:45 UTC | [records/openclaw-openclaw/items/45926.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45926.md) |
| [#74175](https://github.com/openclaw/openclaw/pull/74175) | fix(memory): add LIKE fallback when FTS5 MATCH throws and log silent search errors | high | candidate | Apr 29, 2026, 08:45 UTC | [records/openclaw-openclaw/items/74175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74175.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73749](https://github.com/openclaw/openclaw/pull/73749) | fix(tui): recover stale streaming status after unbound final | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73749.md) | complete | Apr 29, 2026, 11:00 UTC |
| [#72677](https://github.com/openclaw/openclaw/pull/72677) | fix(cron): warn on main heartbeat handoff ghost runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72677.md) | complete | Apr 29, 2026, 10:59 UTC |
| [#73959](https://github.com/openclaw/openclaw/pull/73959) | fix(amazon-bedrock): add modelContextWindowOverrides for per-model context window config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73959.md) | complete | Apr 29, 2026, 10:59 UTC |
| [#74285](https://github.com/openclaw/openclaw/issues/74285) | Telegram: Assistant reply silently dropped after long audio transcription + subagent spawn | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74285.md) | complete | Apr 29, 2026, 10:58 UTC |
| [#74282](https://github.com/openclaw/openclaw/pull/74282) | fix: add Vercel AI Gateway thinking profile | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74282.md) | complete | Apr 29, 2026, 10:58 UTC |
| [#74276](https://github.com/openclaw/openclaw/pull/74276) | Fix GitHub Copilot model picker catalog | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74276.md) | complete | Apr 29, 2026, 10:58 UTC |
| [#74246](https://github.com/openclaw/openclaw/pull/74246) | fix(plugins): simplify bundled runtime deps staging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74246.md) | complete | Apr 29, 2026, 10:57 UTC |
| [#45438](https://github.com/openclaw/openclaw/issues/45438) | perf: structuredClone in session store cache causes native memory leak (~1GB/min) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45438.md) | complete | Apr 29, 2026, 10:57 UTC |
| [#74284](https://github.com/openclaw/openclaw/issues/74284) | [Bug]: heartbeat session at agent:main:main pins model from creation time, ignores openclaw.json edits across runs (follow-up to #51677) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74284.md) | complete | Apr 29, 2026, 10:56 UTC |
| [#74216](https://github.com/openclaw/openclaw/pull/74216) | fix(plugins): install runtime deps for library extensions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74216.md) | complete | Apr 29, 2026, 10:55 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 11:01 UTC

State: Hot intake in progress

Hot intake planned 20 items across 20 shards. Capacity is 20 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25105070757](https://github.com/openclaw/clawsweeper/actions/runs/25105070757)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 888 |
| Open PRs | 33 |
| Open items total | 921 |
| Reviewed files | 921 |
| Unreviewed open items | 0 |
| Archived closed files | 23 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 878 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 910 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 46 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 11 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 1/59 current (58 due, 1.7%) |
| Hourly hot item cadence (<7d) | 1/59 current (58 due, 1.7%) |
| Daily cadence coverage | 207/212 current (5 due, 97.6%) |
| Daily PR cadence | 20/21 current (1 due, 95.2%) |
| Daily new issue cadence (<30d) | 187/191 current (4 due, 97.9%) |
| Weekly older issue cadence | 644/650 current (6 due, 99.1%) |
| Due now by cadence | 69 |

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

Latest review: Apr 29, 2026, 10:19 UTC. Latest close: Apr 29, 2026, 08:25 UTC. Latest comment sync: Apr 29, 2026, 10:19 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| Last 24 hours | 933 | 0 | 933 | 11 | 13 | 800 | 0 |

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
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 08:43 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 08:35 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 08:35 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 08:35 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [#1278](https://github.com/openclaw/clawhub/issues/1278) | [Search / Indexing] Skill completely invisible in search after update — tjefferson/stock-price-query | high | candidate | Apr 29, 2026, 08:34 UTC | [records/openclaw-clawhub/items/1278.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1278.md) |
| [#1126](https://github.com/openclaw/clawhub/issues/1126) | openclaw-checkpoint skill missing from search results despite existing in registry | high | candidate | Apr 29, 2026, 08:33 UTC | [records/openclaw-clawhub/items/1126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1126.md) |
| [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 08:33 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [#874](https://github.com/openclaw/clawhub/issues/874) | Publish silently drops extensionless files and .tsv files | high | candidate | Apr 29, 2026, 08:32 UTC | [records/openclaw-clawhub/items/874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/874.md) |
| [#371](https://github.com/openclaw/clawhub/issues/371) | Add appeal link for VirusTotal false positives in UI | high | candidate | Apr 29, 2026, 08:32 UTC | [records/openclaw-clawhub/items/371.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/371.md) |
| [#379](https://github.com/openclaw/clawhub/issues/379) | VirusTotal badge shows 'Suspicious' despite 0/54 clean scan | high | candidate | Apr 29, 2026, 08:31 UTC | [records/openclaw-clawhub/items/379.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/379.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1895](https://github.com/openclaw/clawhub/issues/1895) | OpenClaw Performance Issue | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1895.md) | complete | Apr 29, 2026, 10:19 UTC |
| [#1894](https://github.com/openclaw/clawhub/issues/1894) | Search ranking question: high-download skill ranks very low | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1894.md) | complete | Apr 29, 2026, 09:52 UTC |
| [#1893](https://github.com/openclaw/clawhub/issues/1893) | False positive: @lbs-amap/amap-lbs-skill and @lbs-amap/amap-cli-skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1893.md) | complete | Apr 29, 2026, 09:48 UTC |
| [#1892](https://github.com/openclaw/clawhub/issues/1892) | False positive: krillbloc flagged as suspicious — battle royale game with in-game terminology | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1892.md) | complete | Apr 29, 2026, 09:45 UTC |
| [#1526](https://github.com/openclaw/clawhub/issues/1526) | pop-pay flagged suspicious — capability-based classification, no malicious code found. Verified publisher path? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1526.md) | failed | Apr 29, 2026, 08:51 UTC |
| [#1678](https://github.com/openclaw/clawhub/issues/1678) | clawhub package publish — two issues with org namespaces and monorepo subdirectories | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1678.md) | complete | Apr 29, 2026, 08:47 UTC |
| [#1514](https://github.com/openclaw/clawhub/issues/1514) | False duplicate flag: claude-to-free is not a duplicate of model-migration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1514.md) | complete | Apr 29, 2026, 08:47 UTC |
| [#1451](https://github.com/openclaw/clawhub/issues/1451) | Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1451.md) | failed | Apr 29, 2026, 08:46 UTC |
| [#1576](https://github.com/openclaw/clawhub/issues/1576) | False positive: DCL Sentinel Trace flagged as Suspicious — webhook is the product, not a risk | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1576.md) | complete | Apr 29, 2026, 08:46 UTC |
| [#1336](https://github.com/openclaw/clawhub/issues/1336) | \"Sign in with GitHub\"按钮点击无反应，可能是 GitHub OAuth  Client ID 未配置或配置错误。 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1336.md) | complete | Apr 29, 2026, 08:46 UTC |

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

Required `openclaw-ci` app permissions:

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
