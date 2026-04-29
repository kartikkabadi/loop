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

Last dashboard update: Apr 29, 2026, 11:31 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4417 |
| Open PRs | 3459 |
| Open items total | 7876 |
| Reviewed files | 7528 |
| Unreviewed open items | 348 |
| Due now by cadence | 2609 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 626 |
| Closed by Codex apply | 10764 |
| Failed or stale reviews | 33 |
| Archived closed files | 14230 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6949 | 6607 | 342 | 2574 | 0 | 582 | 10756 | Apr 29, 2026, 11:29 UTC | Apr 29, 2026, 11:26 UTC | 54 |
| [ClawHub](https://github.com/openclaw/clawhub) | 927 | 921 | 6 | 35 | 0 | 44 | 8 | Apr 29, 2026, 11:30 UTC | Apr 29, 2026, 08:25 UTC | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 29, 2026, 11:11 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25105492281) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 29, 2026, 11:31 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25105492281) |

### Fleet Activity

Latest review: Apr 29, 2026, 11:30 UTC. Latest close: Apr 29, 2026, 11:26 UTC. Latest comment sync: Apr 29, 2026, 11:30 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 329 | 3 | 326 | 12 | 1 | 19 | 3 |
| Last hour | 555 | 6 | 549 | 12 | 23 | 54 | 4 |
| Last 24 hours | 6480 | 446 | 6034 | 27 | 750 | 1905 | 29 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74304](https://github.com/openclaw/openclaw/issues/74304) | [Feature]: Support before_reset hook for automatic daily session reset | duplicate or superseded | Apr 29, 2026, 11:26 UTC | [records/openclaw-openclaw/closed/74304.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74304.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74294](https://github.com/openclaw/openclaw/pull/74294) | fix(plugins): close file descriptor on openBoundaryFileSync error path | already closed before apply | Apr 29, 2026, 11:15 UTC | [records/openclaw-openclaw/closed/74294.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74294.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74156](https://github.com/openclaw/openclaw/pull/74156) | fix(auth): scope external CLI auth status overlays | kept open | Apr 29, 2026, 11:12 UTC | [records/openclaw-openclaw/closed/74156.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74156.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74282](https://github.com/openclaw/openclaw/pull/74282) | fix: add Vercel AI Gateway thinking profile | kept open | Apr 29, 2026, 11:07 UTC | [records/openclaw-openclaw/closed/74282.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74282.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59795](https://github.com/openclaw/openclaw/pull/59795) | fix(messaging): skip reply suppression for media-only messaging tool sends | closed externally after review | Apr 29, 2026, 11:07 UTC | [records/openclaw-openclaw/closed/59795.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59795.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55104](https://github.com/openclaw/openclaw/pull/55104) | feat: land harness engineering control plane | closed externally after review | Apr 29, 2026, 11:07 UTC | [records/openclaw-openclaw/closed/55104.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55104.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59787](https://github.com/openclaw/openclaw/pull/59787) | fix: only suppress text reply when messaging tool sent text (not media-only) | closed externally after review | Apr 29, 2026, 11:07 UTC | [records/openclaw-openclaw/closed/59787.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59787.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55573](https://github.com/openclaw/openclaw/pull/55573) | feat: complete p5 role-scoped build loop | closed externally after review | Apr 29, 2026, 11:06 UTC | [records/openclaw-openclaw/closed/55573.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55573.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73749](https://github.com/openclaw/openclaw/pull/73749) | fix(tui): recover stale streaming status after unbound final | kept open | Apr 29, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73749.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73749.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73474](https://github.com/openclaw/openclaw/pull/73474) | fix(gateway,proxy): bypass Windows proxy for localhost gateway connections | closed externally after review | Apr 29, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73474.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73474.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | high | candidate | Apr 29, 2026, 11:21 UTC | [records/openclaw-clawhub/items/1575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 11:20 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 11:20 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 11:19 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 11:19 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 11:18 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 11:18 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 11:18 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1675](https://github.com/openclaw/clawhub/issues/1675) | Skills: support org ownership and transfer to org | high | candidate | Apr 29, 2026, 11:18 UTC | [records/openclaw-clawhub/items/1675.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1675.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 11:18 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 11:17 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#960](https://github.com/openclaw/clawhub/issues/960) | Published skill not indexed in search (amazon-seller-research) | high | candidate | Apr 29, 2026, 11:16 UTC | [records/openclaw-clawhub/items/960.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/960.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 11:14 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 11:13 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 11:13 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1631](https://github.com/openclaw/clawhub/issues/1631) | Appealing \"Suspicious\" Flag on AI Control Protocol (Anti-Sycophancy & Zero-BS) v4.3.5 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1631.md) | complete | Apr 29, 2026, 11:30 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1799](https://github.com/openclaw/clawhub/issues/1799) | ZenQuote Skill False Positive - VirusTotal Misidentification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1799.md) | complete | Apr 29, 2026, 11:30 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) | failed | Apr 29, 2026, 11:30 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1624](https://github.com/openclaw/clawhub/issues/1624) | Skill `power-oracle` flagged as suspicious - incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1624.md) | failed | Apr 29, 2026, 11:30 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1823](https://github.com/openclaw/clawhub/issues/1823) | False positive: wangbatochn/gstack-dev v1.0.1 safety docs flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1823.md) | complete | Apr 29, 2026, 11:30 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74293](https://github.com/openclaw/openclaw/pull/74293) | fix(control-ui): make chat divider accessible | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74293.md) | complete | Apr 29, 2026, 11:29 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1755](https://github.com/openclaw/clawhub/issues/1755) | AgentID flagged wrongly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1755.md) | failed | Apr 29, 2026, 11:29 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1829](https://github.com/openclaw/clawhub/issues/1829) | superbased flagged as suspicious — VT clean, markdown-only developer toolkit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1829.md) | complete | Apr 29, 2026, 11:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74306](https://github.com/openclaw/openclaw/pull/74306) | fix: catch croner errors in cron gateway handlers and fix false-positive allowlist error | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74306.md) | complete | Apr 29, 2026, 11:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74297](https://github.com/openclaw/openclaw/issues/74297) | auth-profiles.json: `type: \"token\"` breaks Anthropic Enterprise accounts (529 errors) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74297.md) | failed | Apr 29, 2026, 11:29 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 11:11 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25105492281](https://github.com/openclaw/clawsweeper/actions/runs/25105492281)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3529 |
| Open PRs | 3420 |
| Open items total | 6949 |
| Reviewed files | 6607 |
| Unreviewed open items | 342 |
| Archived closed files | 14207 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3353 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3235 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6588 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 582 |
| Closed by Codex apply | 10756 |
| Failed or stale reviews | 19 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 43/1059 current (1016 due, 4.1%) |
| Hourly hot item cadence (<7d) | 43/1059 current (1016 due, 4.1%) |
| Daily cadence coverage | 2536/3747 current (1211 due, 67.7%) |
| Daily PR cadence | 1900/2621 current (721 due, 72.5%) |
| Daily new issue cadence (<30d) | 636/1126 current (490 due, 56.5%) |
| Weekly older issue cadence | 1796/1801 current (5 due, 99.7%) |
| Due now by cadence | 2574 |

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

Latest review: Apr 29, 2026, 11:29 UTC. Latest close: Apr 29, 2026, 11:26 UTC. Latest comment sync: Apr 29, 2026, 11:30 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 21 | 3 | 18 | 1 | 1 | 19 | 3 |
| Last hour | 55 | 6 | 49 | 1 | 23 | 54 | 4 |
| Last 24 hours | 5547 | 446 | 5101 | 13 | 737 | 1604 | 29 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74304](https://github.com/openclaw/openclaw/issues/74304) | [Feature]: Support before_reset hook for automatic daily session reset | duplicate or superseded | Apr 29, 2026, 11:26 UTC | [records/openclaw-openclaw/closed/74304.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74304.md) |
| [#74294](https://github.com/openclaw/openclaw/pull/74294) | fix(plugins): close file descriptor on openBoundaryFileSync error path | already closed before apply | Apr 29, 2026, 11:15 UTC | [records/openclaw-openclaw/closed/74294.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74294.md) |
| [#74156](https://github.com/openclaw/openclaw/pull/74156) | fix(auth): scope external CLI auth status overlays | kept open | Apr 29, 2026, 11:12 UTC | [records/openclaw-openclaw/closed/74156.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74156.md) |
| [#74282](https://github.com/openclaw/openclaw/pull/74282) | fix: add Vercel AI Gateway thinking profile | kept open | Apr 29, 2026, 11:07 UTC | [records/openclaw-openclaw/closed/74282.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74282.md) |
| [#59795](https://github.com/openclaw/openclaw/pull/59795) | fix(messaging): skip reply suppression for media-only messaging tool sends | closed externally after review | Apr 29, 2026, 11:07 UTC | [records/openclaw-openclaw/closed/59795.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59795.md) |
| [#55104](https://github.com/openclaw/openclaw/pull/55104) | feat: land harness engineering control plane | closed externally after review | Apr 29, 2026, 11:07 UTC | [records/openclaw-openclaw/closed/55104.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55104.md) |
| [#59787](https://github.com/openclaw/openclaw/pull/59787) | fix: only suppress text reply when messaging tool sent text (not media-only) | closed externally after review | Apr 29, 2026, 11:07 UTC | [records/openclaw-openclaw/closed/59787.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59787.md) |
| [#55573](https://github.com/openclaw/openclaw/pull/55573) | feat: complete p5 role-scoped build loop | closed externally after review | Apr 29, 2026, 11:06 UTC | [records/openclaw-openclaw/closed/55573.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55573.md) |
| [#73749](https://github.com/openclaw/openclaw/pull/73749) | fix(tui): recover stale streaming status after unbound final | kept open | Apr 29, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73749.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73749.md) |
| [#73474](https://github.com/openclaw/openclaw/pull/73474) | fix(gateway,proxy): bypass Windows proxy for localhost gateway connections | closed externally after review | Apr 29, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73474.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73474.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74286](https://github.com/openclaw/openclaw/issues/74286) | Bug: sub-agent announce completion causes parent session to generate out-of-context replies | high | candidate | Apr 29, 2026, 11:01 UTC | [records/openclaw-openclaw/items/74286.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74286.md) |
| [#74262](https://github.com/openclaw/openclaw/issues/74262) | Update QA lab parity gate for GPT-5.5 vs Opus 4.7 and harden preflight | high | candidate | Apr 29, 2026, 09:44 UTC | [records/openclaw-openclaw/items/74262.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74262.md) |
| [#74245](https://github.com/openclaw/openclaw/issues/74245) | [Bug]: deepseek extension missing provider-policy-api.ts — contextWindow and cost default to wrong values | high | candidate | Apr 29, 2026, 09:22 UTC | [records/openclaw-openclaw/items/74245.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74245.md) |
| [#63343](https://github.com/openclaw/openclaw/issues/63343) | Browser bridge: \"tab not found\" race in ensureTabAvailable when wsUrl lags CDP discovery | high | candidate | Apr 29, 2026, 08:47 UTC | [records/openclaw-openclaw/items/63343.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63343.md) |
| [#46080](https://github.com/openclaw/openclaw/issues/46080) | Bug: Anthropic tool_result succeeds but final assistant content is empty, causing 'No reply from agent' | high | candidate | Apr 29, 2026, 08:46 UTC | [records/openclaw-openclaw/items/46080.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46080.md) |
| [#73532](https://github.com/openclaw/openclaw/issues/73532) | Plugin loader hot loop: prepareBundledPluginRuntimeDistMirror + JSON5 manifest parsing saturate gateway and starve event loop | high | candidate | Apr 29, 2026, 08:46 UTC | [records/openclaw-openclaw/items/73532.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73532.md) |
| [#47229](https://github.com/openclaw/openclaw/issues/47229) | [Bug]: Anthropic SDK path missing large-integer precision guard (tool_use input) | high | candidate | Apr 29, 2026, 08:46 UTC | [records/openclaw-openclaw/items/47229.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/47229.md) |
| [#74159](https://github.com/openclaw/openclaw/issues/74159) | github-copilot: Gemini models route to unsupported /responses endpoint, and openai-completions transport bypasses Copilot IDE auth headers | high | candidate | Apr 29, 2026, 08:46 UTC | [records/openclaw-openclaw/items/74159.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74159.md) |
| [#38945](https://github.com/openclaw/openclaw/pull/38945) | fix(memory): Unicode support for MMR and FTS tokenizers | high | candidate | Apr 29, 2026, 08:45 UTC | [records/openclaw-openclaw/items/38945.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38945.md) |
| [#45926](https://github.com/openclaw/openclaw/issues/45926) | sessions_send: announce step skipped on timeout (should run async) | high | candidate | Apr 29, 2026, 08:45 UTC | [records/openclaw-openclaw/items/45926.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45926.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74293](https://github.com/openclaw/openclaw/pull/74293) | fix(control-ui): make chat divider accessible | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74293.md) | complete | Apr 29, 2026, 11:29 UTC |
| [#74306](https://github.com/openclaw/openclaw/pull/74306) | fix: catch croner errors in cron gateway handlers and fix false-positive allowlist error | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74306.md) | complete | Apr 29, 2026, 11:29 UTC |
| [#74297](https://github.com/openclaw/openclaw/issues/74297) | auth-profiles.json: `type: \"token\"` breaks Anthropic Enterprise accounts (529 errors) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74297.md) | failed | Apr 29, 2026, 11:29 UTC |
| [#74295](https://github.com/openclaw/openclaw/pull/74295) | fix(whatsapp): use sender lid for ack reactions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74295.md) | complete | Apr 29, 2026, 11:29 UTC |
| [#72677](https://github.com/openclaw/openclaw/pull/72677) | fix(cron): warn on main heartbeat handoff ghost runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72677.md) | complete | Apr 29, 2026, 11:28 UTC |
| [#74305](https://github.com/openclaw/openclaw/issues/74305) | [Bug]: ACPX Codex worker fails when model/thinking overrides are configured | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74305.md) | complete | Apr 29, 2026, 11:27 UTC |
| [#74291](https://github.com/openclaw/openclaw/pull/74291) | test(plugins): cover dead-PID stale runtime-deps lock removal | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74291.md) | complete | Apr 29, 2026, 11:27 UTC |
| [#72724](https://github.com/openclaw/openclaw/pull/72724) | fix(status): add gateway delivery health telemetry | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72724.md) | complete | Apr 29, 2026, 11:27 UTC |
| [#74303](https://github.com/openclaw/openclaw/pull/74303) | fix(discord): disambiguate allow-from DM targets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74303.md) | complete | Apr 29, 2026, 11:25 UTC |
| [#74302](https://github.com/openclaw/openclaw/pull/74302) | fix(security): block untrusted workspace providers in startup discovery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74302.md) | complete | Apr 29, 2026, 11:24 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 11:31 UTC

State: Review publish complete

Merged review artifacts for run 25105492281. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25105492281](https://github.com/openclaw/clawsweeper/actions/runs/25105492281)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 888 |
| Open PRs | 39 |
| Open items total | 927 |
| Reviewed files | 921 |
| Unreviewed open items | 6 |
| Archived closed files | 23 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 874 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 907 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 44 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 14 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 44/59 current (15 due, 74.6%) |
| Hourly hot item cadence (<7d) | 44/59 current (15 due, 74.6%) |
| Daily cadence coverage | 205/212 current (7 due, 96.7%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 184/191 current (7 due, 96.3%) |
| Weekly older issue cadence | 643/650 current (7 due, 98.9%) |
| Due now by cadence | 35 |

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

Latest review: Apr 29, 2026, 11:30 UTC. Latest close: Apr 29, 2026, 08:25 UTC. Latest comment sync: Apr 29, 2026, 10:19 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 308 | 0 | 308 | 11 | 0 | 0 | 0 |
| Last hour | 500 | 0 | 500 | 11 | 0 | 0 | 0 |
| Last 24 hours | 933 | 0 | 933 | 14 | 13 | 301 | 0 |

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
| [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | high | candidate | Apr 29, 2026, 11:21 UTC | [records/openclaw-clawhub/items/1575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 11:20 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 11:20 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |
| [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 11:19 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 11:19 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 11:18 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 11:18 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 11:18 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1675](https://github.com/openclaw/clawhub/issues/1675) | Skills: support org ownership and transfer to org | high | candidate | Apr 29, 2026, 11:18 UTC | [records/openclaw-clawhub/items/1675.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1675.md) |
| [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 11:18 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1631](https://github.com/openclaw/clawhub/issues/1631) | Appealing \"Suspicious\" Flag on AI Control Protocol (Anti-Sycophancy & Zero-BS) v4.3.5 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1631.md) | complete | Apr 29, 2026, 11:30 UTC |
| [#1799](https://github.com/openclaw/clawhub/issues/1799) | ZenQuote Skill False Positive - VirusTotal Misidentification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1799.md) | complete | Apr 29, 2026, 11:30 UTC |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) | failed | Apr 29, 2026, 11:30 UTC |
| [#1624](https://github.com/openclaw/clawhub/issues/1624) | Skill `power-oracle` flagged as suspicious - incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1624.md) | failed | Apr 29, 2026, 11:30 UTC |
| [#1823](https://github.com/openclaw/clawhub/issues/1823) | False positive: wangbatochn/gstack-dev v1.0.1 safety docs flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1823.md) | complete | Apr 29, 2026, 11:30 UTC |
| [#1755](https://github.com/openclaw/clawhub/issues/1755) | AgentID flagged wrongly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1755.md) | failed | Apr 29, 2026, 11:29 UTC |
| [#1829](https://github.com/openclaw/clawhub/issues/1829) | superbased flagged as suspicious — VT clean, markdown-only developer toolkit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1829.md) | complete | Apr 29, 2026, 11:29 UTC |
| [#1814](https://github.com/openclaw/clawhub/issues/1814) | Allow publishing new versions of org-owned skills via REST/CLI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1814.md) | complete | Apr 29, 2026, 11:29 UTC |
| [#1856](https://github.com/openclaw/clawhub/pull/1856) | fix(cli): preserve root skill manifest during publish | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1856.md) | complete | Apr 29, 2026, 11:29 UTC |
| [#1268](https://github.com/openclaw/clawhub/issues/1268) | Security scan flags skills as suspicious due to missing registry metadata fields (env vars, install spec) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1268.md) | complete | Apr 29, 2026, 11:29 UTC |

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
