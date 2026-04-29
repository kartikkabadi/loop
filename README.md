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

Last dashboard update: Apr 29, 2026, 03:42 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4411 |
| Open PRs | 3486 |
| Open items total | 7897 |
| Reviewed files | 7501 |
| Unreviewed open items | 396 |
| Due now by cadence | 2148 |
| Proposed closes awaiting apply | 4 |
| Work candidates awaiting promotion | 343 |
| Closed by Codex apply | 10642 |
| Failed or stale reviews | 34 |
| Archived closed files | 13968 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6979 | 6591 | 388 | 2082 | 4 | 306 | 10636 | Apr 29, 2026, 03:39 UTC | Apr 29, 2026, 03:39 UTC | 105 |
| [ClawHub](https://github.com/openclaw/clawhub) | 918 | 910 | 8 | 66 | 0 | 37 | 6 | Apr 29, 2026, 03:33 UTC | Apr 29, 2026, 03:02 UTC | 429 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review publish complete | Apr 29, 2026, 03:41 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25089122777) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 29, 2026, 03:09 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25087398444) |

### Fleet Activity

Latest review: Apr 29, 2026, 03:39 UTC. Latest close: Apr 29, 2026, 03:39 UTC. Latest comment sync: Apr 29, 2026, 03:39 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 218 | 6 | 212 | 7 | 3 | 9 | 0 |
| Last hour | 796 | 26 | 770 | 16 | 41 | 534 | 1 |
| Last 24 hours | 6718 | 411 | 6307 | 31 | 742 | 1489 | 29 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49317](https://github.com/openclaw/openclaw/issues/49317) | [Bug]: WhatsApp group @mentions not detected when LID mentions are present (wasMentioned=false even though normalizedMentionedJids matches selfE164) | closed externally after review | Apr 29, 2026, 03:39 UTC | [records/openclaw-openclaw/closed/49317.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49317.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73453](https://github.com/openclaw/openclaw/pull/73453) | fix(whatsapp): detect group @mentions when self is in allowFrom (#49317) | closed externally after review | Apr 29, 2026, 03:39 UTC | [records/openclaw-openclaw/closed/73453.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73453.md) |
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
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69307](https://github.com/openclaw/openclaw/issues/69307) | Feature request: before_tts modifying hook for per-message voice routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69307.md) | complete | Apr 29, 2026, 03:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67472](https://github.com/openclaw/openclaw/pull/67472) | fix(backup): gracefully skip session files deleted during backup create | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67472.md) | complete | Apr 29, 2026, 03:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73779](https://github.com/openclaw/openclaw/pull/73779) | fix(ui): debounce sessions.list reload after sessions.changed push events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73779.md) | complete | Apr 29, 2026, 03:38 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69494](https://github.com/openclaw/openclaw/pull/69494) | fix: resolve SecretRef keychain tokens in desktop app browser proxy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69494.md) | complete | Apr 29, 2026, 03:38 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74024](https://github.com/openclaw/openclaw/pull/74024) | [AI-assisted] fix(config): allow custom skill entry fields | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74024.md) | complete | Apr 29, 2026, 03:38 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39343](https://github.com/openclaw/openclaw/issues/39343) | Feature Request: Image batching / media group buffering at gateway layer | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39343.md) | complete | Apr 29, 2026, 03:37 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72351](https://github.com/openclaw/openclaw/pull/72351) | fix(tui): handle zero history limit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72351.md) | complete | Apr 29, 2026, 03:37 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73928](https://github.com/openclaw/openclaw/pull/73928) | fix(cli): set non-zero exit code when crestodian detects non-TTY [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73928.md) | failed | Apr 29, 2026, 03:37 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#38604](https://github.com/openclaw/openclaw/issues/38604) | [Security] Sandbox containers have no default pidsLimit - vulnerable to fork bomb attacks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38604.md) | complete | Apr 29, 2026, 03:36 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72817](https://github.com/openclaw/openclaw/pull/72817) | fix: harden bundled plugin public surface loading | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72817.md) | complete | Apr 29, 2026, 03:36 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 03:41 UTC

State: Review publish complete

Merged review artifacts for run 25089122777. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25089122777](https://github.com/openclaw/clawsweeper/actions/runs/25089122777)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3533 |
| Open PRs | 3446 |
| Open items total | 6979 |
| Reviewed files | 6591 |
| Unreviewed open items | 388 |
| Archived closed files | 13950 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3340 |
| Proposed issue closes | 1 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3238 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6578 |
| Proposed closes awaiting apply | 4 (0.1% of fresh reviews) |
| Work candidates awaiting promotion | 306 |
| Closed by Codex apply | 10636 |
| Failed or stale reviews | 13 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 215/971 current (756 due, 22.1%) |
| Hourly hot item cadence (<7d) | 215/971 current (756 due, 22.1%) |
| Daily cadence coverage | 2873/3806 current (933 due, 75.5%) |
| Daily PR cadence | 2195/2661 current (466 due, 82.5%) |
| Daily new issue cadence (<30d) | 678/1145 current (467 due, 59.2%) |
| Weekly older issue cadence | 1809/1814 current (5 due, 99.7%) |
| Due now by cadence | 2082 |

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

Latest review: Apr 29, 2026, 03:39 UTC. Latest close: Apr 29, 2026, 03:39 UTC. Latest comment sync: Apr 29, 2026, 03:39 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 217 | 6 | 211 | 7 | 3 | 8 | 0 |
| Last hour | 642 | 26 | 616 | 7 | 39 | 105 | 1 |
| Last 24 hours | 5790 | 408 | 5382 | 10 | 724 | 564 | 29 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#49317](https://github.com/openclaw/openclaw/issues/49317) | [Bug]: WhatsApp group @mentions not detected when LID mentions are present (wasMentioned=false even though normalizedMentionedJids matches selfE164) | closed externally after review | Apr 29, 2026, 03:39 UTC | [records/openclaw-openclaw/closed/49317.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49317.md) |
| [#73453](https://github.com/openclaw/openclaw/pull/73453) | fix(whatsapp): detect group @mentions when self is in allowFrom (#49317) | closed externally after review | Apr 29, 2026, 03:39 UTC | [records/openclaw-openclaw/closed/73453.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73453.md) |
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
| [#69307](https://github.com/openclaw/openclaw/issues/69307) | Feature request: before_tts modifying hook for per-message voice routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69307.md) | complete | Apr 29, 2026, 03:39 UTC |
| [#67472](https://github.com/openclaw/openclaw/pull/67472) | fix(backup): gracefully skip session files deleted during backup create | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67472.md) | complete | Apr 29, 2026, 03:39 UTC |
| [#73779](https://github.com/openclaw/openclaw/pull/73779) | fix(ui): debounce sessions.list reload after sessions.changed push events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73779.md) | complete | Apr 29, 2026, 03:38 UTC |
| [#69494](https://github.com/openclaw/openclaw/pull/69494) | fix: resolve SecretRef keychain tokens in desktop app browser proxy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69494.md) | complete | Apr 29, 2026, 03:38 UTC |
| [#74024](https://github.com/openclaw/openclaw/pull/74024) | [AI-assisted] fix(config): allow custom skill entry fields | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74024.md) | complete | Apr 29, 2026, 03:38 UTC |
| [#39343](https://github.com/openclaw/openclaw/issues/39343) | Feature Request: Image batching / media group buffering at gateway layer | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39343.md) | complete | Apr 29, 2026, 03:37 UTC |
| [#72351](https://github.com/openclaw/openclaw/pull/72351) | fix(tui): handle zero history limit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72351.md) | complete | Apr 29, 2026, 03:37 UTC |
| [#73928](https://github.com/openclaw/openclaw/pull/73928) | fix(cli): set non-zero exit code when crestodian detects non-TTY [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73928.md) | failed | Apr 29, 2026, 03:37 UTC |
| [#38604](https://github.com/openclaw/openclaw/issues/38604) | [Security] Sandbox containers have no default pidsLimit - vulnerable to fork bomb attacks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38604.md) | complete | Apr 29, 2026, 03:36 UTC |
| [#72817](https://github.com/openclaw/openclaw/pull/72817) | fix: harden bundled plugin public surface loading | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72817.md) | complete | Apr 29, 2026, 03:36 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 03:09 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
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
| Fresh reviewed issues in the last 7 days | 855 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 889 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 37 |
| Closed by Codex apply | 6 |
| Failed or stale reviews | 21 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 14/52 current (38 due, 26.9%) |
| Hourly hot item cadence (<7d) | 14/52 current (38 due, 26.9%) |
| Daily cadence coverage | 224/224 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 203/203 current (0 due, 100%) |
| Weekly older issue cadence | 614/634 current (20 due, 96.8%) |
| Due now by cadence | 66 |

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

Latest review: Apr 29, 2026, 03:33 UTC. Latest close: Apr 29, 2026, 03:02 UTC. Latest comment sync: Apr 29, 2026, 03:33 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| Last hour | 154 | 0 | 154 | 9 | 2 | 429 | 0 |
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
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 02:47 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 02:46 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 02:45 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 02:44 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 02:44 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 02:43 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 02:43 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 02:37 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [#960](https://github.com/openclaw/clawhub/issues/960) | Published skill not indexed in search (amazon-seller-research) | high | candidate | Apr 29, 2026, 02:35 UTC | [records/openclaw-clawhub/items/960.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/960.md) |
| [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 02:35 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1879](https://github.com/openclaw/clawhub/pull/1879) | fix(slug): enforce length, pattern, and reserved-word rules on skill & soul slugs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1879.md) | complete | Apr 29, 2026, 03:33 UTC |
| [#1824](https://github.com/openclaw/clawhub/issues/1824) | Namespace/security review request: `clawsec` slug conflicts with official ClawSec suite | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1824.md) | failed | Apr 29, 2026, 03:02 UTC |
| [#1072](https://github.com/openclaw/clawhub/issues/1072) | false flag visual-qa | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1072.md) | complete | Apr 29, 2026, 02:56 UTC |
| [#1476](https://github.com/openclaw/clawhub/issues/1476) | [Appeal] Skill flagged suspicious: clevrpay | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1476.md) | complete | Apr 29, 2026, 02:56 UTC |
| [#975](https://github.com/openclaw/clawhub/issues/975) | False positive: 'vibe-reading' and 'vibe-reading-cn' skills flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/975.md) | complete | Apr 29, 2026, 02:55 UTC |
| [#992](https://github.com/openclaw/clawhub/issues/992) | False positive flag on telegram-whisper-transcribe skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/992.md) | failed | Apr 29, 2026, 02:54 UTC |
| [#1551](https://github.com/openclaw/clawhub/issues/1551) | feishu-quick-setup skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1551.md) | complete | Apr 29, 2026, 02:54 UTC |
| [#1581](https://github.com/openclaw/clawhub/issues/1581) | [Auth] GitHub OAuth callback redirects to 127.0.0.1 instead of Convex production URL | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1581.md) | complete | Apr 29, 2026, 02:54 UTC |
| [#1022](https://github.com/openclaw/clawhub/issues/1022) | False positive flag on mind-security skill — legitimate AI security toolkit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1022.md) | failed | Apr 29, 2026, 02:54 UTC |
| [#1085](https://github.com/openclaw/clawhub/issues/1085) | PII-Redactor skill flagged as suspicious despite 0/66 VirusTotal Score | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1085.md) | failed | Apr 29, 2026, 02:54 UTC |

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
