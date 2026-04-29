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
  `queue_fix_pr` candidates for manual ProjectClownfish promotion; ClawSweeper
  itself does not open implementation PRs.
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
- **Clownfish repair dispatch:** commit reports with `result: findings` can
  dispatch to Clownfish, where a separate intake writes an audit record and only
  creates a PR when the finding is narrow, non-security, and still relevant on
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

Last dashboard update: Apr 29, 2026, 03:54 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4409 |
| Open PRs | 3486 |
| Open items total | 7895 |
| Reviewed files | 7503 |
| Unreviewed open items | 392 |
| Due now by cadence | 2251 |
| Proposed closes awaiting apply | 4 |
| Work candidates awaiting promotion | 343 |
| Closed by Codex apply | 10643 |
| Failed or stale reviews | 34 |
| Archived closed files | 13968 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6977 | 6593 | 384 | 2177 | 4 | 306 | 10637 | Apr 29, 2026, 03:41 UTC | Apr 29, 2026, 03:39 UTC | 540 |
| [ClawHub](https://github.com/openclaw/clawhub) | 918 | 910 | 8 | 74 | 0 | 37 | 6 | Apr 29, 2026, 03:33 UTC | Apr 29, 2026, 03:02 UTC | 429 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 29, 2026, 03:54 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25089122777) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 29, 2026, 03:09 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25087398444) |

### Fleet Activity

Latest review: Apr 29, 2026, 03:41 UTC. Latest close: Apr 29, 2026, 03:39 UTC. Latest comment sync: Apr 29, 2026, 03:54 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 4 | 0 | 4 | 0 | 2 | 485 | 0 |
| Last hour | 556 | 12 | 544 | 11 | 32 | 969 | 1 |
| Last 24 hours | 6709 | 410 | 6299 | 31 | 725 | 1962 | 29 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72245](https://github.com/openclaw/openclaw/pull/72245) | perf(plugins): cache provider hook plugin lookups | duplicate or superseded | Apr 29, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/72245.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72245.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72137](https://github.com/openclaw/openclaw/pull/72137) | fix(gateway): collapse phantom diff entries from empty-container normalization (#72061) | duplicate or superseded | Apr 29, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/72137.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72137.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72051](https://github.com/openclaw/openclaw/pull/72051) | fix(tasks): harden taskflow timestamps and control runtime packaging | already implemented on main | Apr 29, 2026, 03:50 UTC | [records/openclaw-openclaw/closed/72051.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72051.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#37813](https://github.com/openclaw/openclaw/issues/37813) | [Bug]: Unrecognised model IDs silently fall back to primary default — bypasses configured fallback chain and tool permissions | already implemented on main | Apr 29, 2026, 03:50 UTC | [records/openclaw-openclaw/closed/37813.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/37813.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67986](https://github.com/openclaw/openclaw/issues/67986) | [Bug]: Gateway wedges silently mid-session after 2026.4.15 — only recovers on WhatsApp 408 + health monitor restart | closed externally after review | Apr 29, 2026, 03:46 UTC | [records/openclaw-openclaw/closed/67986.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/67986.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74037](https://github.com/openclaw/openclaw/pull/74037) | docs: add Clownfish replacement smoke typo | closed externally after review | Apr 29, 2026, 03:46 UTC | [records/openclaw-openclaw/closed/74037.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74037.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74045](https://github.com/openclaw/openclaw/pull/74045) | fix(gateway): skip model pricing fetches when mode is replace | already closed before apply | Apr 29, 2026, 03:44 UTC | [records/openclaw-openclaw/closed/74045.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74045.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74043](https://github.com/openclaw/openclaw/issues/74043) | Gateway memory leak: RPC becomes unresponsive after ~24 hours | duplicate or superseded | Apr 29, 2026, 03:43 UTC | [records/openclaw-openclaw/closed/74043.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74043.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49317](https://github.com/openclaw/openclaw/issues/49317) | [Bug]: WhatsApp group @mentions not detected when LID mentions are present (wasMentioned=false even though normalizedMentionedJids matches selfE164) | closed externally after review | Apr 29, 2026, 03:39 UTC | [records/openclaw-openclaw/closed/49317.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49317.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73453](https://github.com/openclaw/openclaw/pull/73453) | fix(whatsapp): detect group @mentions when self is in allowFrom (#49317) | kept open | Apr 29, 2026, 03:39 UTC | [records/openclaw-openclaw/closed/73453.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73453.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74039](https://github.com/openclaw/openclaw/issues/74039) | [Bug] Gateway crashes with unhandled 'CIAO ANNOUNCEMENT CANCELLED' promise rejection during Bonjour restart | already implemented on main | Apr 29, 2026, 03:38 UTC | [records/openclaw-openclaw/closed/74039.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74039.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74034](https://github.com/openclaw/openclaw/issues/74034) | Heartbeat + auth fallback + message tool creates cascading delivery-mirror feedback loop | already implemented on main | Apr 29, 2026, 03:23 UTC | [records/openclaw-openclaw/closed/74034.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74034.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74017](https://github.com/openclaw/openclaw/issues/74017) | oc llm scorer incorrectly marks correct MCQ final answers wrong when ambiguity_flag=true | not actionable in this repository | Apr 29, 2026, 03:21 UTC | [records/openclaw-openclaw/closed/74017.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74017.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74022](https://github.com/openclaw/openclaw/pull/74022) | feat(skills): add persist flag and trustedSources config for commercial use | closed externally after review | Apr 29, 2026, 03:21 UTC | [records/openclaw-openclaw/closed/74022.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74022.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69423](https://github.com/openclaw/openclaw/issues/69423) | [Bug]: A single broken plugin's malformed tool schema crashes every Anthropic agent run | already implemented on main | Apr 29, 2026, 03:21 UTC | [records/openclaw-openclaw/closed/69423.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69423.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69196](https://github.com/openclaw/openclaw/issues/69196) | Control UI microphone does not capture speech in Chrome on Mac mini | already implemented on main | Apr 29, 2026, 03:21 UTC | [records/openclaw-openclaw/closed/69196.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69196.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69126](https://github.com/openclaw/openclaw/issues/69126) | Feature: Global sessionCompactionLimit in openclaw.json (agents.defaults) | already implemented on main | Apr 29, 2026, 03:21 UTC | [records/openclaw-openclaw/closed/69126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69126.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69030](https://github.com/openclaw/openclaw/issues/69030) | Feature: `infer model run` should have a `--raw` mode that bypasses the agent runtime | already implemented on main | Apr 29, 2026, 03:21 UTC | [records/openclaw-openclaw/closed/69030.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69030.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74036](https://github.com/openclaw/openclaw/issues/74036) | Bug: corpus=sessions memory_search returns 0 results for many keywords despite data being indexed | high | candidate | Apr 29, 2026, 03:32 UTC | [records/openclaw-openclaw/items/74036.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74036.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 03:30 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69708](https://github.com/openclaw/openclaw/issues/69708) | auth-profiles.json rejects \"type\": \"aws-sdk\" as invalid_type since 2026.4.1 — breaks Bedrock on EC2 (IMDS) | high | candidate | Apr 29, 2026, 03:29 UTC | [records/openclaw-openclaw/items/69708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69708.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#38907](https://github.com/openclaw/openclaw/issues/38907) | ACP bridge sessions fail with acp_session_init_failed (echo + end_turn, no chunks) | high | candidate | Apr 29, 2026, 03:29 UTC | [records/openclaw-openclaw/items/38907.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38907.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#38817](https://github.com/openclaw/openclaw/issues/38817) | [Bug]: Volcengine/Kimi models fail parameter validation due to unsupported minLength keyword / 火山引擎/Kimi系列模型因不支持minLength关键字导致参数校验失败 | high | candidate | Apr 29, 2026, 03:29 UTC | [records/openclaw-openclaw/items/38817.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38817.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39223](https://github.com/openclaw/openclaw/issues/39223) | [Bug]: Configure wizard hangs at Gateway selection - blocks OAuth auth flow | high | candidate | Apr 29, 2026, 03:28 UTC | [records/openclaw-openclaw/items/39223.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39223.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39032](https://github.com/openclaw/openclaw/issues/39032) | Subagent completion output leaks internal tool-failure reasoning to requester session | high | candidate | Apr 29, 2026, 03:27 UTC | [records/openclaw-openclaw/items/39032.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39032.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#27445](https://github.com/openclaw/openclaw/issues/27445) | [Feature]: `announceTarget` option for sub-agent completion announce routing | high | candidate | Apr 29, 2026, 03:26 UTC | [records/openclaw-openclaw/items/27445.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/27445.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#38721](https://github.com/openclaw/openclaw/issues/38721) | [Bug] gateway shutdown timed out: node report shows active child process handle; leaves dirty shutdown + lane wait | high | candidate | Apr 29, 2026, 03:26 UTC | [records/openclaw-openclaw/items/38721.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38721.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#32868](https://github.com/openclaw/openclaw/issues/32868) | Block streaming: block replies not delivered before tool execution (same-channel) | high | candidate | Apr 29, 2026, 03:25 UTC | [records/openclaw-openclaw/items/32868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/32868.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#30381](https://github.com/openclaw/openclaw/issues/30381) | chatCompletions: ignore request model when x-openclaw-agent-id header is present | high | candidate | Apr 29, 2026, 03:24 UTC | [records/openclaw-openclaw/items/30381.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/30381.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#37661](https://github.com/openclaw/openclaw/issues/37661) | [Bug]: LLM streaming output infinite loop - same phrase repeated 40+ times | high | candidate | Apr 29, 2026, 03:24 UTC | [records/openclaw-openclaw/items/37661.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/37661.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#16387](https://github.com/openclaw/openclaw/issues/16387) | Feature: Dynamic header templating for custom LLM providers (enables Fireworks.ai prompt caching) | high | candidate | Apr 29, 2026, 03:23 UTC | [records/openclaw-openclaw/items/16387.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/16387.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#20756](https://github.com/openclaw/openclaw/issues/20756) | message tool should auto-select the only enabled account | high | candidate | Apr 29, 2026, 03:23 UTC | [records/openclaw-openclaw/items/20756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/20756.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#7406](https://github.com/openclaw/openclaw/issues/7406) | [Feature]: Human-readable Telegram topic names in session dropdown | high | candidate | Apr 29, 2026, 03:22 UTC | [records/openclaw-openclaw/items/7406.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/7406.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74040](https://github.com/openclaw/openclaw/pull/74040) | fix: guard against empty prompt race in runEmbeddedPiAgent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74040.md) | complete | Apr 29, 2026, 03:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74041](https://github.com/openclaw/openclaw/pull/74041) | [codex] Fix async media double delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74041.md) | complete | Apr 29, 2026, 03:40 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69307](https://github.com/openclaw/openclaw/issues/69307) | Feature request: before_tts modifying hook for per-message voice routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69307.md) | complete | Apr 29, 2026, 03:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67472](https://github.com/openclaw/openclaw/pull/67472) | fix(backup): gracefully skip session files deleted during backup create | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67472.md) | complete | Apr 29, 2026, 03:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73779](https://github.com/openclaw/openclaw/pull/73779) | fix(ui): debounce sessions.list reload after sessions.changed push events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73779.md) | complete | Apr 29, 2026, 03:38 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69494](https://github.com/openclaw/openclaw/pull/69494) | fix: resolve SecretRef keychain tokens in desktop app browser proxy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69494.md) | complete | Apr 29, 2026, 03:38 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74024](https://github.com/openclaw/openclaw/pull/74024) | [AI-assisted] fix(config): allow custom skill entry fields | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74024.md) | complete | Apr 29, 2026, 03:38 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39343](https://github.com/openclaw/openclaw/issues/39343) | Feature Request: Image batching / media group buffering at gateway layer | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39343.md) | complete | Apr 29, 2026, 03:37 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72351](https://github.com/openclaw/openclaw/pull/72351) | fix(tui): handle zero history limit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72351.md) | complete | Apr 29, 2026, 03:37 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73928](https://github.com/openclaw/openclaw/pull/73928) | fix(cli): set non-zero exit code when crestodian detects non-TTY [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73928.md) | failed | Apr 29, 2026, 03:37 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 03:54 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 482. Item numbers: 6457,6599,6615,6792,6946,7057,7338,7359,7379,7403,7406,7424,7433,7661,8724,9394,9465,9607,9865,10029,10137,10213,10354,10467,10872,10960,11040,11055,11414,11473,11489,11517,11655,11665,11703,11747,11955,11960,12008,12047,12198,12219,12398,12441,12505,12508,12512,12554,12602,12756,12831,12931,13175,13219,13241,13271,13304,13337,13362,13387,13417,13440,13479,13487,13543,13570,13583,13593,13613,13615,13616,13617,13620,13627,13634,13676,13700,13736,13744,13751,13870,13911,13948,14079,14151,14206,14207,14251,14317,14344,14438,14526,14601,14629,14747,14785,14804,14850,14861,14874,14968,15073,15828,16085,16121,16142,16387,16555,16670,16896,17213,17215,17683,17810,17840,17876,17925,17931,18548,18571,18967,18985,19289,19680,19859,19929,20173,20230,20237,20321,20460,20756,20786,20837,20934,20935,20950,21207,22021,22358,22438,22439,22676,22770,22774,23014,23353,23451,23585,23896,23906,23916,23926,24107,24118,24196,24943,25493,25621,25883,26037,26137,26370,26428,26517,26926,27137,27445,27482,27526,27574,28025,28300,28303,28669,28847,28913,28965,29100,29132,29195,29369,29372,29384,29442,29487,29552,29707,29725,29736,29907,29945,30067,30381,30389,30452,30518,30759,30861,31172,31331,31379,31396,31583,32188,32438,32473,32496,32515,32530,32868,33102,33413,33478,33624,33838,33962,34129,34400,35406,35447,35735,35754,35799,35835,36212,36314,36525,36617,37131,37487,37584,37589,37626,37634,37661,37711,37748,37813,37816,37843,37855,37878,37943,37966,38066,38069,38076,38091,38138,38204,38212,38222,38235,38246,38255,38259,38260,38309,38346,38349,38364,38501,38520,38547,38570,38573,38580,38597,38601,38603,38604,38622,38625,38626,38650,38657,38661,38670,38683,38685,38714,38716,38721,38729,38730,38731,38744,38745,38762,38775,38780,38781,38806,38817,38829,38844,38846,38853,38881,38897,38907,38923,38924,38931,38932,38939,38945,38966,38981,39000,39001,39013,39022,39031,39032,39038,39060,39075,39097,39117,39120,39126,39141,39142,39168,39189,39223,39231,39269,39305,39307,39330,39341,39343,39365,39372,39373,39389,39400,39406,39457,39461,39513,39605,42245,43190,51088,51849,53638,54306,55840,58808,59330,61443,62120,63098,64732,65867,66225,66911,67174,67472,67509,68280,68341,69030,69102,69110,69118,69123,69126,69135,69168,69186,69192,69196,69197,69212,69242,69268,69271,69307,69310,69312,69319,69337,69344,69363,69394,69401,69423,69426,69442,69494,69513,69544,69567,69582,69608,69618,69675,69701,69708,69729,69932,69961,69982,69999,70046,70255,71072,71582,71830,72004,72045,72051,72055,72101,72108,72126,72135,72137,72138,72149,72153,72161,72163,72213,72215,72216,72218,72225,72245,72251,72254,72281,72301,72350,72351,72352,72361,72387,72449,72454,72612,72645,72797,72807,72817,72818,72819,72973,73008,73174,73216,73334,73440,73456,73474,73476,73501,73533,73536,73538,73543,73554,73566,73594,73616,73710,73711,73755,73768,73775,73779,73785,73794,73798,73799,73822,73830,73839,73841,73844,73864,73867,73893,73911,73921,73923,73925,73928,73929,73930,73939,73943,73945,73950,73952.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25089122777](https://github.com/openclaw/clawsweeper/actions/runs/25089122777)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3531 |
| Open PRs | 3446 |
| Open items total | 6977 |
| Reviewed files | 6593 |
| Unreviewed open items | 384 |
| Archived closed files | 13950 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3340 |
| Proposed issue closes | 1 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3240 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6580 |
| Proposed closes awaiting apply | 4 (0.1% of fresh reviews) |
| Work candidates awaiting promotion | 306 |
| Closed by Codex apply | 10637 |
| Failed or stale reviews | 13 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 125/973 current (848 due, 12.8%) |
| Hourly hot item cadence (<7d) | 125/973 current (848 due, 12.8%) |
| Daily cadence coverage | 2866/3806 current (940 due, 75.3%) |
| Daily PR cadence | 2189/2661 current (472 due, 82.3%) |
| Daily new issue cadence (<30d) | 677/1145 current (468 due, 59.1%) |
| Weekly older issue cadence | 1809/1814 current (5 due, 99.7%) |
| Due now by cadence | 2177 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 29, 2026, 01:08 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72536,72537,72539`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6951 |
| Missing eligible open records | 218 |
| Missing maintainer-authored open records | 68 |
| Missing protected open records | 1 |
| Missing recently-created open records | 93 |
| Archived records that are open again | 0 |
| Stale item records | 2 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 4 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
| [#72527](https://github.com/openclaw/openclaw/issues/72527) | Missing eligible open | [Bug]: Downgrading from 2026.4.x to 2026.3.2 leaves openclaw.json in invalid/broken state with no warning | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 03:41 UTC. Latest close: Apr 29, 2026, 03:39 UTC. Latest comment sync: Apr 29, 2026, 03:54 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 4 | 0 | 4 | 0 | 2 | 485 | 0 |
| Last hour | 535 | 12 | 523 | 7 | 31 | 540 | 1 |
| Last 24 hours | 5781 | 407 | 5374 | 10 | 707 | 1037 | 29 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72245](https://github.com/openclaw/openclaw/pull/72245) | perf(plugins): cache provider hook plugin lookups | duplicate or superseded | Apr 29, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/72245.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72245.md) |
| [#72137](https://github.com/openclaw/openclaw/pull/72137) | fix(gateway): collapse phantom diff entries from empty-container normalization (#72061) | duplicate or superseded | Apr 29, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/72137.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72137.md) |
| [#72051](https://github.com/openclaw/openclaw/pull/72051) | fix(tasks): harden taskflow timestamps and control runtime packaging | already implemented on main | Apr 29, 2026, 03:50 UTC | [records/openclaw-openclaw/closed/72051.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72051.md) |
| [#37813](https://github.com/openclaw/openclaw/issues/37813) | [Bug]: Unrecognised model IDs silently fall back to primary default — bypasses configured fallback chain and tool permissions | already implemented on main | Apr 29, 2026, 03:50 UTC | [records/openclaw-openclaw/closed/37813.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/37813.md) |
| [#67986](https://github.com/openclaw/openclaw/issues/67986) | [Bug]: Gateway wedges silently mid-session after 2026.4.15 — only recovers on WhatsApp 408 + health monitor restart | closed externally after review | Apr 29, 2026, 03:46 UTC | [records/openclaw-openclaw/closed/67986.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/67986.md) |
| [#74037](https://github.com/openclaw/openclaw/pull/74037) | docs: add Clownfish replacement smoke typo | closed externally after review | Apr 29, 2026, 03:46 UTC | [records/openclaw-openclaw/closed/74037.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74037.md) |
| [#74045](https://github.com/openclaw/openclaw/pull/74045) | fix(gateway): skip model pricing fetches when mode is replace | already closed before apply | Apr 29, 2026, 03:44 UTC | [records/openclaw-openclaw/closed/74045.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74045.md) |
| [#74043](https://github.com/openclaw/openclaw/issues/74043) | Gateway memory leak: RPC becomes unresponsive after ~24 hours | duplicate or superseded | Apr 29, 2026, 03:43 UTC | [records/openclaw-openclaw/closed/74043.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74043.md) |
| [#49317](https://github.com/openclaw/openclaw/issues/49317) | [Bug]: WhatsApp group @mentions not detected when LID mentions are present (wasMentioned=false even though normalizedMentionedJids matches selfE164) | closed externally after review | Apr 29, 2026, 03:39 UTC | [records/openclaw-openclaw/closed/49317.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49317.md) |
| [#73453](https://github.com/openclaw/openclaw/pull/73453) | fix(whatsapp): detect group @mentions when self is in allowFrom (#49317) | kept open | Apr 29, 2026, 03:39 UTC | [records/openclaw-openclaw/closed/73453.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73453.md) |
| [#74039](https://github.com/openclaw/openclaw/issues/74039) | [Bug] Gateway crashes with unhandled 'CIAO ANNOUNCEMENT CANCELLED' promise rejection during Bonjour restart | already implemented on main | Apr 29, 2026, 03:38 UTC | [records/openclaw-openclaw/closed/74039.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74039.md) |
| [#74034](https://github.com/openclaw/openclaw/issues/74034) | Heartbeat + auth fallback + message tool creates cascading delivery-mirror feedback loop | already implemented on main | Apr 29, 2026, 03:23 UTC | [records/openclaw-openclaw/closed/74034.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74034.md) |
| [#74017](https://github.com/openclaw/openclaw/issues/74017) | oc llm scorer incorrectly marks correct MCQ final answers wrong when ambiguity_flag=true | not actionable in this repository | Apr 29, 2026, 03:21 UTC | [records/openclaw-openclaw/closed/74017.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74017.md) |
| [#74022](https://github.com/openclaw/openclaw/pull/74022) | feat(skills): add persist flag and trustedSources config for commercial use | closed externally after review | Apr 29, 2026, 03:21 UTC | [records/openclaw-openclaw/closed/74022.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74022.md) |
| [#69423](https://github.com/openclaw/openclaw/issues/69423) | [Bug]: A single broken plugin's malformed tool schema crashes every Anthropic agent run | already implemented on main | Apr 29, 2026, 03:21 UTC | [records/openclaw-openclaw/closed/69423.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69423.md) |
| [#69196](https://github.com/openclaw/openclaw/issues/69196) | Control UI microphone does not capture speech in Chrome on Mac mini | already implemented on main | Apr 29, 2026, 03:21 UTC | [records/openclaw-openclaw/closed/69196.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69196.md) |
| [#69126](https://github.com/openclaw/openclaw/issues/69126) | Feature: Global sessionCompactionLimit in openclaw.json (agents.defaults) | already implemented on main | Apr 29, 2026, 03:21 UTC | [records/openclaw-openclaw/closed/69126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69126.md) |
| [#69030](https://github.com/openclaw/openclaw/issues/69030) | Feature: `infer model run` should have a `--raw` mode that bypasses the agent runtime | already implemented on main | Apr 29, 2026, 03:21 UTC | [records/openclaw-openclaw/closed/69030.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69030.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74036](https://github.com/openclaw/openclaw/issues/74036) | Bug: corpus=sessions memory_search returns 0 results for many keywords despite data being indexed | high | candidate | Apr 29, 2026, 03:32 UTC | [records/openclaw-openclaw/items/74036.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74036.md) |
| [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 03:30 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [#69708](https://github.com/openclaw/openclaw/issues/69708) | auth-profiles.json rejects \"type\": \"aws-sdk\" as invalid_type since 2026.4.1 — breaks Bedrock on EC2 (IMDS) | high | candidate | Apr 29, 2026, 03:29 UTC | [records/openclaw-openclaw/items/69708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69708.md) |
| [#38907](https://github.com/openclaw/openclaw/issues/38907) | ACP bridge sessions fail with acp_session_init_failed (echo + end_turn, no chunks) | high | candidate | Apr 29, 2026, 03:29 UTC | [records/openclaw-openclaw/items/38907.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38907.md) |
| [#38817](https://github.com/openclaw/openclaw/issues/38817) | [Bug]: Volcengine/Kimi models fail parameter validation due to unsupported minLength keyword / 火山引擎/Kimi系列模型因不支持minLength关键字导致参数校验失败 | high | candidate | Apr 29, 2026, 03:29 UTC | [records/openclaw-openclaw/items/38817.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38817.md) |
| [#39223](https://github.com/openclaw/openclaw/issues/39223) | [Bug]: Configure wizard hangs at Gateway selection - blocks OAuth auth flow | high | candidate | Apr 29, 2026, 03:28 UTC | [records/openclaw-openclaw/items/39223.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39223.md) |
| [#39032](https://github.com/openclaw/openclaw/issues/39032) | Subagent completion output leaks internal tool-failure reasoning to requester session | high | candidate | Apr 29, 2026, 03:27 UTC | [records/openclaw-openclaw/items/39032.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39032.md) |
| [#27445](https://github.com/openclaw/openclaw/issues/27445) | [Feature]: `announceTarget` option for sub-agent completion announce routing | high | candidate | Apr 29, 2026, 03:26 UTC | [records/openclaw-openclaw/items/27445.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/27445.md) |
| [#38721](https://github.com/openclaw/openclaw/issues/38721) | [Bug] gateway shutdown timed out: node report shows active child process handle; leaves dirty shutdown + lane wait | high | candidate | Apr 29, 2026, 03:26 UTC | [records/openclaw-openclaw/items/38721.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38721.md) |
| [#32868](https://github.com/openclaw/openclaw/issues/32868) | Block streaming: block replies not delivered before tool execution (same-channel) | high | candidate | Apr 29, 2026, 03:25 UTC | [records/openclaw-openclaw/items/32868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/32868.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74040](https://github.com/openclaw/openclaw/pull/74040) | fix: guard against empty prompt race in runEmbeddedPiAgent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74040.md) | complete | Apr 29, 2026, 03:41 UTC |
| [#74041](https://github.com/openclaw/openclaw/pull/74041) | [codex] Fix async media double delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74041.md) | complete | Apr 29, 2026, 03:40 UTC |
| [#69307](https://github.com/openclaw/openclaw/issues/69307) | Feature request: before_tts modifying hook for per-message voice routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69307.md) | complete | Apr 29, 2026, 03:39 UTC |
| [#67472](https://github.com/openclaw/openclaw/pull/67472) | fix(backup): gracefully skip session files deleted during backup create | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67472.md) | complete | Apr 29, 2026, 03:39 UTC |
| [#73779](https://github.com/openclaw/openclaw/pull/73779) | fix(ui): debounce sessions.list reload after sessions.changed push events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73779.md) | complete | Apr 29, 2026, 03:38 UTC |
| [#69494](https://github.com/openclaw/openclaw/pull/69494) | fix: resolve SecretRef keychain tokens in desktop app browser proxy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69494.md) | complete | Apr 29, 2026, 03:38 UTC |
| [#74024](https://github.com/openclaw/openclaw/pull/74024) | [AI-assisted] fix(config): allow custom skill entry fields | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74024.md) | complete | Apr 29, 2026, 03:38 UTC |
| [#39343](https://github.com/openclaw/openclaw/issues/39343) | Feature Request: Image batching / media group buffering at gateway layer | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39343.md) | complete | Apr 29, 2026, 03:37 UTC |
| [#72351](https://github.com/openclaw/openclaw/pull/72351) | fix(tui): handle zero history limit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72351.md) | complete | Apr 29, 2026, 03:37 UTC |
| [#73928](https://github.com/openclaw/openclaw/pull/73928) | fix(cli): set non-zero exit code when crestodian detects non-TTY [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73928.md) | failed | Apr 29, 2026, 03:37 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 03:45 UTC

State: Review publish complete

Merged review artifacts for run 25087398444. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25087398444](https://github.com/openclaw/clawsweeper/actions/runs/25087398444)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 878 |
| Open PRs | 40 |
| Open items total | 918 |
| Reviewed files | 910 |
| Unreviewed open items | 8 |
| Archived closed files | 18 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 858 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 891 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 35 |
| Closed by Codex apply | 6 |
| Failed or stale reviews | 19 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 6/52 current (46 due, 11.5%) |
| Hourly hot item cadence (<7d) | 6/52 current (46 due, 11.5%) |
| Daily cadence coverage | 224/224 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 203/203 current (0 due, 100%) |
| Weekly older issue cadence | 614/634 current (20 due, 96.8%) |
| Due now by cadence | 74 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 29, 2026, 01:08 UTC

Status: **Passing**

Targeted review input: _none_

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 916 |
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

Latest review: Apr 29, 2026, 03:47 UTC. Latest close: Apr 29, 2026, 03:02 UTC. Latest comment sync: Apr 29, 2026, 03:47 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 21 | 0 | 21 | 4 | 1 | 429 | 0 |
| Last 24 hours | 928 | 3 | 925 | 21 | 18 | 925 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | kept open | Apr 29, 2026, 03:02 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 03:21 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 03:16 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 03:14 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 03:13 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 03:12 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 03:12 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |
| [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 03:12 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 03:12 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 02:47 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 02:46 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1879](https://github.com/openclaw/clawhub/pull/1879) | fix(slug): enforce length, pattern, and reserved-word rules on skill & soul slugs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1879.md) | complete | Apr 29, 2026, 03:47 UTC |
| [#1685](https://github.com/openclaw/clawhub/issues/1685) | Skill flagged — suspicious patterns detected deepdive OSINT | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1685.md) | failed | Apr 29, 2026, 03:44 UTC |
| [#1571](https://github.com/openclaw/clawhub/issues/1571) | tender-search \"Skill flagged — suspicious patterns detected\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1571.md) | complete | Apr 29, 2026, 03:37 UTC |
| [#1519](https://github.com/openclaw/clawhub/issues/1519) | False: Skill flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1519.md) | complete | Apr 29, 2026, 03:35 UTC |
| [#1427](https://github.com/openclaw/clawhub/issues/1427) | Credential Auditor Skill Incorrectly Flagged as Suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1427.md) | complete | Apr 29, 2026, 03:34 UTC |
| [#1219](https://github.com/openclaw/clawhub/issues/1219) | Readdy.ai WebSite Builder | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1219.md) | failed | Apr 29, 2026, 03:33 UTC |
| [#1404](https://github.com/openclaw/clawhub/issues/1404) | Skill Strategy Consultation: Page Icon Meanings and Search Recall Issues | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1404.md) | complete | Apr 29, 2026, 03:32 UTC |
| [#1425](https://github.com/openclaw/clawhub/issues/1425) | Skill marked as suspicious: skills-audit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1425.md) | complete | Apr 29, 2026, 03:30 UTC |
| [#1299](https://github.com/openclaw/clawhub/issues/1299) | Request hard delete of soft-deleted skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1299.md) | failed | Apr 29, 2026, 03:30 UTC |
| [#1812](https://github.com/openclaw/clawhub/issues/1812) | Skill be flagged as suspicious and being marked hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1812.md) | complete | Apr 29, 2026, 03:29 UTC |

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
- Finding reports are dispatched to Clownfish when
  `CLAWSWEEPER_CLOWNFISH_COMMIT_FINDINGS_ENABLED` is not `false`. Clownfish owns
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
- `OPENCLAW_GH_TOKEN`: optional fallback GitHub token for read-heavy target
  scans and artifact publish reconciliation when the GitHub App token is
  unavailable.
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
  context, falling back to `OPENCLAW_GH_TOKEN` only if app secrets are absent.
- Apply mode uses the app token for review comments and closes, so GitHub
  attributes mutations to `clawsweeper[bot]`.
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
