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
  trusted Clownfish repair loop. See
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

Last dashboard update: Apr 29, 2026, 06:58 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4409 |
| Open PRs | 3485 |
| Open items total | 7894 |
| Reviewed files | 7514 |
| Unreviewed open items | 380 |
| Due now by cadence | 1991 |
| Proposed closes awaiting apply | 3 |
| Work candidates awaiting promotion | 521 |
| Closed by Codex apply | 10716 |
| Failed or stale reviews | 29 |
| Archived closed files | 14092 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6972 | 6599 | 373 | 1939 | 3 | 484 | 10709 | Apr 29, 2026, 06:54 UTC | Apr 29, 2026, 06:57 UTC | 474 |
| [ClawHub](https://github.com/openclaw/clawhub) | 922 | 915 | 7 | 52 | 0 | 37 | 7 | Apr 29, 2026, 06:28 UTC | Apr 29, 2026, 05:31 UTC | 759 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review publish complete | Apr 29, 2026, 06:57 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25094339151) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 06:42 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25093676944) |

### Fleet Activity

Latest review: Apr 29, 2026, 06:54 UTC. Latest close: Apr 29, 2026, 06:57 UTC. Latest comment sync: Apr 29, 2026, 06:54 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 220 | 3 | 217 | 4 | 11 | 20 | 0 |
| Last hour | 1379 | 18 | 1361 | 22 | 33 | 1233 | 3 |
| Last 24 hours | 6929 | 440 | 6489 | 25 | 755 | 2275 | 28 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73621](https://github.com/openclaw/openclaw/issues/73621) | [Bug]: Control UI — queued message silently lost when switching to another session | closed externally after review | Apr 29, 2026, 06:57 UTC | [records/openclaw-openclaw/closed/73621.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73621.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73679](https://github.com/openclaw/openclaw/pull/73679) | fix(ui): preserve queued chat messages across session switches | closed externally after review | Apr 29, 2026, 06:57 UTC | [records/openclaw-openclaw/closed/73679.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73679.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74152](https://github.com/openclaw/openclaw/pull/74152) | feat(gateway): make chat-delta broadcast throttle configurable via OPENCLAW_CHAT_DELTA_THROTTLE_MS | closed externally after review | Apr 29, 2026, 06:53 UTC | [records/openclaw-openclaw/closed/74152.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74152.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74110](https://github.com/openclaw/openclaw/pull/74110) | feat(agents): add OPENCLAW_LOG_ABORT_SOURCES diagnostic for embedded run aborts | closed externally after review | Apr 29, 2026, 06:53 UTC | [records/openclaw-openclaw/closed/74110.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74110.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73794](https://github.com/openclaw/openclaw/pull/73794) | perf(capability-provider): reuse active registry on non-memory/non-speech lookups | closed externally after review | Apr 29, 2026, 06:52 UTC | [records/openclaw-openclaw/closed/73794.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73794.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73908](https://github.com/openclaw/openclaw/issues/73908) | [Bug]: Gateway unconditionally probes all 115 manifest providers and external CLI credentials at startup — causing 50s+ blocking even with 1 configured provider | closed externally after review | Apr 29, 2026, 06:52 UTC | [records/openclaw-openclaw/closed/73908.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73908.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73793](https://github.com/openclaw/openclaw/issues/73793) | Capability-provider lookups bypass cache when plugins.entries is non-empty (~25-30s latency per turn) | closed externally after review | Apr 29, 2026, 06:52 UTC | [records/openclaw-openclaw/closed/73793.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73793.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73835](https://github.com/openclaw/openclaw/issues/73835) | Idle gateway high CPU/RSS on VPS; CPU profile points to repeated plugin/model registry + bundled runtime mirror work | closed externally after review | Apr 29, 2026, 06:52 UTC | [records/openclaw-openclaw/closed/73835.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73835.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73729](https://github.com/openclaw/openclaw/issues/73729) | resolvePluginCapabilityProviders triggers redundant full plugin loads per message (image/video/music generation) | closed externally after review | Apr 29, 2026, 06:52 UTC | [records/openclaw-openclaw/closed/73729.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73729.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73853](https://github.com/openclaw/openclaw/pull/73853) | [AI-assisted] fix(plugins): reduce startup provider registry reloads | closed externally after review | Apr 29, 2026, 06:52 UTC | [records/openclaw-openclaw/closed/73853.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73853.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39032](https://github.com/openclaw/openclaw/issues/39032) | Subagent completion output leaks internal tool-failure reasoning to requester session | high | candidate | Apr 29, 2026, 06:49 UTC | [records/openclaw-openclaw/items/39032.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39032.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#32868](https://github.com/openclaw/openclaw/issues/32868) | Block streaming: block replies not delivered before tool execution (same-channel) | high | candidate | Apr 29, 2026, 06:47 UTC | [records/openclaw-openclaw/items/32868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/32868.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44734](https://github.com/openclaw/openclaw/issues/44734) | [Bug]: Memory Multimodal Indexing - Gemini API rejects OGG/Opus audio files | high | candidate | Apr 29, 2026, 06:47 UTC | [records/openclaw-openclaw/items/44734.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44734.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44354](https://github.com/openclaw/openclaw/issues/44354) | Bug: openclaw health --json reports stale Discord state | high | candidate | Apr 29, 2026, 06:45 UTC | [records/openclaw-openclaw/items/44354.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44354.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74159](https://github.com/openclaw/openclaw/issues/74159) | github-copilot: Gemini models route to unsupported /responses endpoint, and openai-completions transport bypasses Copilot IDE auth headers | high | candidate | Apr 29, 2026, 06:45 UTC | [records/openclaw-openclaw/items/74159.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74159.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45326](https://github.com/openclaw/openclaw/issues/45326) | [Bug]: TUI: Input typed during model generation is swallowed and incorrectly queued for the next turn (Interrupt failure) | high | candidate | Apr 29, 2026, 06:45 UTC | [records/openclaw-openclaw/items/45326.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45326.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44148](https://github.com/openclaw/openclaw/issues/44148) | [Bug]:WhatsApp: Pause bot when human operator replies manually (outgoing message detection | high | candidate | Apr 29, 2026, 06:44 UTC | [records/openclaw-openclaw/items/44148.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44148.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44179](https://github.com/openclaw/openclaw/issues/44179) | GLM-5 token leak: stripModelSpecialTokens not applied to main output path | high | candidate | Apr 29, 2026, 06:44 UTC | [records/openclaw-openclaw/items/44179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44179.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45573](https://github.com/openclaw/openclaw/issues/45573) | Group chat sessions not persisted — only 1 session from 166+ messages | high | candidate | Apr 29, 2026, 06:44 UTC | [records/openclaw-openclaw/items/45573.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45573.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44502](https://github.com/openclaw/openclaw/issues/44502) | [Bug]: Discord routing / mention-gating issue in OpenClaw | high | candidate | Apr 29, 2026, 06:43 UTC | [records/openclaw-openclaw/items/44502.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44502.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44584](https://github.com/openclaw/openclaw/issues/44584) | [Bug]: Discord threads - volatile metadata re-injection + CLI routing to wrong session | high | candidate | Apr 29, 2026, 06:43 UTC | [records/openclaw-openclaw/items/44584.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44584.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44428](https://github.com/openclaw/openclaw/issues/44428) | [Bug]: Isolated cron with delivery.bestEffort:true blocks for full timeout when fire-and-forget subagents are active | high | candidate | Apr 29, 2026, 06:43 UTC | [records/openclaw-openclaw/items/44428.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44428.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39223](https://github.com/openclaw/openclaw/issues/39223) | [Bug]: Configure wizard hangs at Gateway selection - blocks OAuth auth flow | high | candidate | Apr 29, 2026, 06:43 UTC | [records/openclaw-openclaw/items/39223.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39223.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#38570](https://github.com/openclaw/openclaw/issues/38570) | Inter-agent sessions_send: sender attributed as wrong agent (missing identity name) | high | candidate | Apr 29, 2026, 06:42 UTC | [records/openclaw-openclaw/items/38570.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38570.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44448](https://github.com/openclaw/openclaw/issues/44448) | [Bug] v2026.3.11: CLI 'openclaw agent --channel discord --to' routes to agent:*:main instead of live channel session | high | candidate | Apr 29, 2026, 06:41 UTC | [records/openclaw-openclaw/items/44448.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44448.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45709](https://github.com/openclaw/openclaw/issues/45709) | [Bug]: Usage header is doubled (v2 UI) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45709.md) | complete | Apr 29, 2026, 06:54 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74146](https://github.com/openclaw/openclaw/pull/74146) | fix(feishu): use snapshot mode for block payloads to dedup overlap (#74143) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74146.md) | complete | Apr 29, 2026, 06:53 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63244](https://github.com/openclaw/openclaw/pull/63244) | [Feat] surface spawnedBy in chat and agent broadcast payloads | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63244.md) | complete | Apr 29, 2026, 06:53 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69633](https://github.com/openclaw/openclaw/pull/69633) | feat(ui): add SPA-side support for WebView2 native bridge | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69633.md) | complete | Apr 29, 2026, 06:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45501](https://github.com/openclaw/openclaw/issues/45501) | Feature: `session.resetPrompt` — configurable session startup message | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45501.md) | complete | Apr 29, 2026, 06:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64316](https://github.com/openclaw/openclaw/pull/64316) | fix(agents): release bundle MCP runtime on mid-run session reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64316.md) | complete | Apr 29, 2026, 06:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74163](https://github.com/openclaw/openclaw/pull/74163) | docs: refresh Microsoft ecosystem tracker | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74163.md) | complete | Apr 29, 2026, 06:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40768](https://github.com/openclaw/openclaw/issues/40768) | Feishu: @mention not recognized in group when multiple bots share the same group (open_id app-scoped mismatch) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/40768.md) | complete | Apr 29, 2026, 06:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74162](https://github.com/openclaw/openclaw/pull/74162) | fix(providers): accept moonshotai as alias for direct moonshot provider (#73876) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74162.md) | complete | Apr 29, 2026, 06:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73711](https://github.com/openclaw/openclaw/pull/73711) | feat(chat/ios): photos-picker-style attachment thumbnails with persistent add-more tile | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73711.md) | complete | Apr 29, 2026, 06:50 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 06:57 UTC

State: Review publish complete

Merged review artifacts for run 25094339151. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25094339151](https://github.com/openclaw/clawsweeper/actions/runs/25094339151)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3526 |
| Open PRs | 3446 |
| Open items total | 6972 |
| Reviewed files | 6599 |
| Unreviewed open items | 373 |
| Archived closed files | 14071 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3340 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3245 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6585 |
| Proposed closes awaiting apply | 3 (0% of fresh reviews) |
| Work candidates awaiting promotion | 484 |
| Closed by Codex apply | 10709 |
| Failed or stale reviews | 14 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 342/1011 current (669 due, 33.8%) |
| Hourly hot item cadence (<7d) | 342/1011 current (669 due, 33.8%) |
| Daily cadence coverage | 2895/3789 current (894 due, 76.4%) |
| Daily PR cadence | 2173/2648 current (475 due, 82.1%) |
| Daily new issue cadence (<30d) | 722/1141 current (419 due, 63.3%) |
| Weekly older issue cadence | 1796/1799 current (3 due, 99.8%) |
| Due now by cadence | 1939 |

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

Latest review: Apr 29, 2026, 06:54 UTC. Latest close: Apr 29, 2026, 06:57 UTC. Latest comment sync: Apr 29, 2026, 06:54 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 220 | 3 | 217 | 4 | 11 | 20 | 0 |
| Last hour | 972 | 18 | 954 | 7 | 33 | 474 | 3 |
| Last 24 hours | 6003 | 440 | 5563 | 10 | 741 | 1450 | 28 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73621](https://github.com/openclaw/openclaw/issues/73621) | [Bug]: Control UI — queued message silently lost when switching to another session | closed externally after review | Apr 29, 2026, 06:57 UTC | [records/openclaw-openclaw/closed/73621.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73621.md) |
| [#73679](https://github.com/openclaw/openclaw/pull/73679) | fix(ui): preserve queued chat messages across session switches | closed externally after review | Apr 29, 2026, 06:57 UTC | [records/openclaw-openclaw/closed/73679.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73679.md) |
| [#74152](https://github.com/openclaw/openclaw/pull/74152) | feat(gateway): make chat-delta broadcast throttle configurable via OPENCLAW_CHAT_DELTA_THROTTLE_MS | closed externally after review | Apr 29, 2026, 06:53 UTC | [records/openclaw-openclaw/closed/74152.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74152.md) |
| [#74110](https://github.com/openclaw/openclaw/pull/74110) | feat(agents): add OPENCLAW_LOG_ABORT_SOURCES diagnostic for embedded run aborts | closed externally after review | Apr 29, 2026, 06:53 UTC | [records/openclaw-openclaw/closed/74110.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74110.md) |
| [#73794](https://github.com/openclaw/openclaw/pull/73794) | perf(capability-provider): reuse active registry on non-memory/non-speech lookups | closed externally after review | Apr 29, 2026, 06:52 UTC | [records/openclaw-openclaw/closed/73794.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73794.md) |
| [#73908](https://github.com/openclaw/openclaw/issues/73908) | [Bug]: Gateway unconditionally probes all 115 manifest providers and external CLI credentials at startup — causing 50s+ blocking even with 1 configured provider | closed externally after review | Apr 29, 2026, 06:52 UTC | [records/openclaw-openclaw/closed/73908.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73908.md) |
| [#73793](https://github.com/openclaw/openclaw/issues/73793) | Capability-provider lookups bypass cache when plugins.entries is non-empty (~25-30s latency per turn) | closed externally after review | Apr 29, 2026, 06:52 UTC | [records/openclaw-openclaw/closed/73793.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73793.md) |
| [#73835](https://github.com/openclaw/openclaw/issues/73835) | Idle gateway high CPU/RSS on VPS; CPU profile points to repeated plugin/model registry + bundled runtime mirror work | closed externally after review | Apr 29, 2026, 06:52 UTC | [records/openclaw-openclaw/closed/73835.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73835.md) |
| [#73729](https://github.com/openclaw/openclaw/issues/73729) | resolvePluginCapabilityProviders triggers redundant full plugin loads per message (image/video/music generation) | closed externally after review | Apr 29, 2026, 06:52 UTC | [records/openclaw-openclaw/closed/73729.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73729.md) |
| [#73853](https://github.com/openclaw/openclaw/pull/73853) | [AI-assisted] fix(plugins): reduce startup provider registry reloads | closed externally after review | Apr 29, 2026, 06:52 UTC | [records/openclaw-openclaw/closed/73853.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73853.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#39032](https://github.com/openclaw/openclaw/issues/39032) | Subagent completion output leaks internal tool-failure reasoning to requester session | high | candidate | Apr 29, 2026, 06:49 UTC | [records/openclaw-openclaw/items/39032.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39032.md) |
| [#32868](https://github.com/openclaw/openclaw/issues/32868) | Block streaming: block replies not delivered before tool execution (same-channel) | high | candidate | Apr 29, 2026, 06:47 UTC | [records/openclaw-openclaw/items/32868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/32868.md) |
| [#44734](https://github.com/openclaw/openclaw/issues/44734) | [Bug]: Memory Multimodal Indexing - Gemini API rejects OGG/Opus audio files | high | candidate | Apr 29, 2026, 06:47 UTC | [records/openclaw-openclaw/items/44734.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44734.md) |
| [#44354](https://github.com/openclaw/openclaw/issues/44354) | Bug: openclaw health --json reports stale Discord state | high | candidate | Apr 29, 2026, 06:45 UTC | [records/openclaw-openclaw/items/44354.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44354.md) |
| [#74159](https://github.com/openclaw/openclaw/issues/74159) | github-copilot: Gemini models route to unsupported /responses endpoint, and openai-completions transport bypasses Copilot IDE auth headers | high | candidate | Apr 29, 2026, 06:45 UTC | [records/openclaw-openclaw/items/74159.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74159.md) |
| [#45326](https://github.com/openclaw/openclaw/issues/45326) | [Bug]: TUI: Input typed during model generation is swallowed and incorrectly queued for the next turn (Interrupt failure) | high | candidate | Apr 29, 2026, 06:45 UTC | [records/openclaw-openclaw/items/45326.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45326.md) |
| [#44148](https://github.com/openclaw/openclaw/issues/44148) | [Bug]:WhatsApp: Pause bot when human operator replies manually (outgoing message detection | high | candidate | Apr 29, 2026, 06:44 UTC | [records/openclaw-openclaw/items/44148.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44148.md) |
| [#44179](https://github.com/openclaw/openclaw/issues/44179) | GLM-5 token leak: stripModelSpecialTokens not applied to main output path | high | candidate | Apr 29, 2026, 06:44 UTC | [records/openclaw-openclaw/items/44179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44179.md) |
| [#45573](https://github.com/openclaw/openclaw/issues/45573) | Group chat sessions not persisted — only 1 session from 166+ messages | high | candidate | Apr 29, 2026, 06:44 UTC | [records/openclaw-openclaw/items/45573.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45573.md) |
| [#44502](https://github.com/openclaw/openclaw/issues/44502) | [Bug]: Discord routing / mention-gating issue in OpenClaw | high | candidate | Apr 29, 2026, 06:43 UTC | [records/openclaw-openclaw/items/44502.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44502.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#45709](https://github.com/openclaw/openclaw/issues/45709) | [Bug]: Usage header is doubled (v2 UI) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45709.md) | complete | Apr 29, 2026, 06:54 UTC |
| [#74146](https://github.com/openclaw/openclaw/pull/74146) | fix(feishu): use snapshot mode for block payloads to dedup overlap (#74143) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74146.md) | complete | Apr 29, 2026, 06:53 UTC |
| [#63244](https://github.com/openclaw/openclaw/pull/63244) | [Feat] surface spawnedBy in chat and agent broadcast payloads | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63244.md) | complete | Apr 29, 2026, 06:53 UTC |
| [#69633](https://github.com/openclaw/openclaw/pull/69633) | feat(ui): add SPA-side support for WebView2 native bridge | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69633.md) | complete | Apr 29, 2026, 06:52 UTC |
| [#45501](https://github.com/openclaw/openclaw/issues/45501) | Feature: `session.resetPrompt` — configurable session startup message | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45501.md) | complete | Apr 29, 2026, 06:52 UTC |
| [#64316](https://github.com/openclaw/openclaw/pull/64316) | fix(agents): release bundle MCP runtime on mid-run session reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64316.md) | complete | Apr 29, 2026, 06:51 UTC |
| [#74163](https://github.com/openclaw/openclaw/pull/74163) | docs: refresh Microsoft ecosystem tracker | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74163.md) | complete | Apr 29, 2026, 06:51 UTC |
| [#40768](https://github.com/openclaw/openclaw/issues/40768) | Feishu: @mention not recognized in group when multiple bots share the same group (open_id app-scoped mismatch) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/40768.md) | complete | Apr 29, 2026, 06:50 UTC |
| [#74162](https://github.com/openclaw/openclaw/pull/74162) | fix(providers): accept moonshotai as alias for direct moonshot provider (#73876) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74162.md) | complete | Apr 29, 2026, 06:50 UTC |
| [#73711](https://github.com/openclaw/openclaw/pull/73711) | feat(chat/ios): photos-picker-style attachment thumbnails with persistent add-more tile | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73711.md) | complete | Apr 29, 2026, 06:50 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 06:42 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 403. Item numbers: 17,65,95,102,134,137,162,173,236,248,265,279,287,288,290,321,340,345,348,351,386,387,392,393,402,410,424,425,437,438,442,447,448,451,459,469,471,474,478,479,480,481,482,485,489,495,498,504,531,539,541,566,573,580,581,586,604,613,614,618,619,621,625,635,642,646,647,650,651,652,653,655,658,662,664,666,667,669,670,672,673,675,676,678,679,681,683,692,694,700,701,705,706,708,711,712,713,716,717,722,730,731,733,734,737,745,747,752,755,756,758,760,761,762,764,765,767,768,769,770,779,780,784,786,789,791,792,794,800,804,807,808,809,811,817,819,822,823,824,834,835,838,845,846,847,849,850,851,852,853,854,856,858,860,861,862,863,867,868,869,870,871,873,874,875,876,878,879,880,881,882,883,887,889,890,892,895,899,900,901,903,904,906,907,908,909,910,911,912,913,914,915,917,920,921,922,923,925,927,928,930,932,933,935,936,937,938,939,941,943,946,951,954,958,959,960,962,963,966,967,969,970,971,972,974,975,984,985,987,989,990,994,995,998,999,1001,1002,1003,1004,1005,1009,1010,1013,1016,1018,1020,1024,1026,1027,1028,1033,1035,1038,1039,1040,1041,1043,1044,1045,1048,1049,1062,1063,1069,1072,1075,1079,1080,1081,1082,1083,1084,1089,1090,1091,1092,1094,1098,1100,1102,1104,1105,1107,1109,1110,1112,1114,1116,1118,1119,1120,1121,1122,1124,1129,1132,1133,1136,1137,1140,1142,1147,1148,1149,1152,1153,1154,1155,1169,1170,1171,1172,1173,1175,1176,1177,1180,1181,1182,1184,1186,1188,1193,1195,1197,1199,1201,1204,1206,1207,1211,1212,1217,1218,1219,1221,1222,1228,1248,1261,1266,1268,1290,1294,1299,1301,1326,1354,1391,1394,1398,1403,1418,1434,1476,1480,1495,1511,1528,1542,1551,1553,1554,1558,1563,1575,1581,1591,1649,1672,1677,1685,1707,1718,1734,1735,1743,1751,1768,1771,1772,1783,1787,1789,1797,1798,1808,1813,1815,1818,1819,1821,1823,1828,1833,1840,1848,1849,1857,1860,1863,1876,1877,1884.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25093676944](https://github.com/openclaw/clawsweeper/actions/runs/25093676944)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 883 |
| Open PRs | 39 |
| Open items total | 922 |
| Reviewed files | 915 |
| Unreviewed open items | 7 |
| Archived closed files | 21 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 867 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 900 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 37 |
| Closed by Codex apply | 7 |
| Failed or stale reviews | 15 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 26/56 current (30 due, 46.4%) |
| Hourly hot item cadence (<7d) | 26/56 current (30 due, 46.4%) |
| Daily cadence coverage | 218/218 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 197/197 current (0 due, 100%) |
| Weekly older issue cadence | 626/641 current (15 due, 97.7%) |
| Due now by cadence | 52 |

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

Latest review: Apr 29, 2026, 06:28 UTC. Latest close: Apr 29, 2026, 05:31 UTC. Latest comment sync: Apr 29, 2026, 06:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 407 | 0 | 407 | 15 | 0 | 759 | 0 |
| Last 24 hours | 926 | 0 | 926 | 15 | 14 | 825 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1881](https://github.com/openclaw/clawhub/pull/1881) | chore(ci): update package publish artifact action | closed externally after review | Apr 29, 2026, 05:31 UTC | [records/openclaw-clawhub/closed/1881.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1881.md) |
| [#1880](https://github.com/openclaw/clawhub/pull/1880) | feat: add featured plugin curation | kept open | Apr 29, 2026, 05:13 UTC | [records/openclaw-clawhub/closed/1880.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1880.md) |
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | closed externally after review | Apr 29, 2026, 04:24 UTC | [records/openclaw-clawhub/closed/1871.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1871.md) |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | kept open | Apr 29, 2026, 03:02 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 06:28 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 06:27 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 06:25 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 06:19 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 06:18 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 06:18 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 06:17 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 06:16 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 06:16 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [#960](https://github.com/openclaw/clawhub/issues/960) | Published skill not indexed in search (amazon-seller-research) | high | candidate | Apr 29, 2026, 06:15 UTC | [records/openclaw-clawhub/items/960.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/960.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) | complete | Apr 29, 2026, 06:28 UTC |
| [#1863](https://github.com/openclaw/clawhub/issues/1863) | /skills search is not stable for English queries: `scienceclaw` returns 3 results while `ScienceClaw` returns 6` | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1863.md) | complete | Apr 29, 2026, 06:28 UTC |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#1089](https://github.com/openclaw/clawhub/issues/1089) | False Positive Flag Report: kling-image-generate | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1089.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#1808](https://github.com/openclaw/clawhub/issues/1808) | Re-evaluation request: topview-skill (official Topview AI client) — medium-suspicious verdict triggered by emoji ZWJ false positive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1808.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#1035](https://github.com/openclaw/clawhub/issues/1035) | risk-sentiment-scanner skill flagged  申请误标记接触 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1035.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#1301](https://github.com/openclaw/clawhub/issues/1301) | Question: Publisher verification path for active code plugin contributors? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1301.md) | failed | Apr 29, 2026, 06:27 UTC |
| [#1040](https://github.com/openclaw/clawhub/issues/1040) | False Positive: ifly-voiceclone-tts is  safe, official iFlytek voice clone tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1040.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#1173](https://github.com/openclaw/clawhub/issues/1173) | Cannot publish: Personal publisher not found / pagination error | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1173.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#1772](https://github.com/openclaw/clawhub/issues/1772) | Skill flagged as suspicious — docx-builder | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1772.md) | complete | Apr 29, 2026, 06:27 UTC |

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
  Clownfish repair loop; see
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
