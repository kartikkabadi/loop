# ClawSweeper

ClawSweeper is the conservative maintenance bot for OpenClaw repositories. It
currently sweeps `openclaw/openclaw` and `openclaw/clawhub`.

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

Repository profiles can further narrow apply. ClawHub is intentionally stricter:
it reviews every issue and PR, but apply may close only PRs where current `main`
already implements the proposed change with source-backed evidence.

## Dashboard

Last dashboard update: Apr 28, 2026, 15:17 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4418 |
| Open PRs | 3440 |
| Open items total | 7858 |
| Reviewed files | 7450 |
| Unreviewed open items | 408 |
| Due now by cadence | 2761 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10432 |
| Failed or stale reviews | 5 |
| Archived closed files | 13602 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6945 | 6544 | 401 | 2710 | 0 | 10429 | Apr 28, 2026, 15:15 UTC | Apr 28, 2026, 15:16 UTC | 393 |
| [ClawHub](https://github.com/openclaw/clawhub) | 913 | 906 | 7 | 51 | 0 | 3 | Apr 28, 2026, 14:22 UTC | Apr 28, 2026, 08:18 UTC | 20 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply finished | Apr 28, 2026, 15:17 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25061299265) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 28, 2026, 15:12 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25061130507) |

### Fleet Activity

Latest review: Apr 28, 2026, 15:15 UTC. Latest close: Apr 28, 2026, 15:16 UTC. Latest comment sync: Apr 28, 2026, 15:16 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 27 | 2 | 25 | 0 | 27 | 52 | 3 |
| Last hour | 1095 | 52 | 1043 | 0 | 51 | 413 | 4 |
| Last 24 hours | 4462 | 209 | 4253 | 2 | 537 | 1709 | 16 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59571](https://github.com/openclaw/openclaw/issues/59571) | [Bug]: feishu_doc 插件加载正常，但工具未暴露给 agent 调用 | already implemented on main | Apr 28, 2026, 15:16 UTC | [records/openclaw-openclaw/closed/59571.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59571.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59435](https://github.com/openclaw/openclaw/issues/59435) | [Bug] openclaw update 命令会错误覆盖 ai.openclaw.gateway.plist 的配置路径 | already implemented on main | Apr 28, 2026, 15:16 UTC | [records/openclaw-openclaw/closed/59435.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59435.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59422](https://github.com/openclaw/openclaw/pull/59422) | feat(feishu): add ignoreAtAll configuration option | already implemented on main | Apr 28, 2026, 15:16 UTC | [records/openclaw-openclaw/closed/59422.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59422.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59319](https://github.com/openclaw/openclaw/issues/59319) | [Bug]: [2026.4.1] boot-md injects DAILY.md multiple times per message | already implemented on main | Apr 28, 2026, 15:16 UTC | [records/openclaw-openclaw/closed/59319.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59319.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72620](https://github.com/openclaw/openclaw/pull/72620) | fix(active-memory): preserve setup time outside recall timeout | closed externally after review | Apr 28, 2026, 15:15 UTC | [records/openclaw-openclaw/closed/72620.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72620.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59070](https://github.com/openclaw/openclaw/issues/59070) | [Bug]: GatewayRequestError: invalid config: agents: Unrecognized key: \"defaultId\" + permanent \"unsaved config changes\" when changing model on new agent | duplicate or superseded | Apr 28, 2026, 15:13 UTC | [records/openclaw-openclaw/closed/59070.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59070.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59057](https://github.com/openclaw/openclaw/pull/59057) | perf(gateway): cap delta overlap search to prevent O(n*m) freeze on repeated chars | already implemented on main | Apr 28, 2026, 15:13 UTC | [records/openclaw-openclaw/closed/59057.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59057.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59020](https://github.com/openclaw/openclaw/pull/59020) | fix(cron): persist fresh isolated session transcript file | already implemented on main | Apr 28, 2026, 15:13 UTC | [records/openclaw-openclaw/closed/59020.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59020.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58975](https://github.com/openclaw/openclaw/pull/58975) | fix(agents): suppress memory flush UI leakage (#58956) | already implemented on main | Apr 28, 2026, 15:13 UTC | [records/openclaw-openclaw/closed/58975.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58975.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58946](https://github.com/openclaw/openclaw/pull/58946) | Fix node.invoke timeout misclassified as API rate limit | already implemented on main | Apr 28, 2026, 15:13 UTC | [records/openclaw-openclaw/closed/58946.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58946.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73624](https://github.com/openclaw/openclaw/issues/73624) | Bug: subagent spawns drop task instructions when systemPromptOverride is set | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73624.md) | complete | Apr 28, 2026, 15:15 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73275.md) | complete | Apr 28, 2026, 15:15 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72807](https://github.com/openclaw/openclaw/pull/72807) | feat(agents): allow opting out of git init on agents.create | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72807.md) | complete | Apr 28, 2026, 15:15 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73611](https://github.com/openclaw/openclaw/pull/73611) | fix: gate startup context for sandboxed spawned sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73611.md) | complete | Apr 28, 2026, 15:12 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 28, 2026, 15:12 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42400](https://github.com/openclaw/openclaw/pull/42400) | feat(channels): add neverReply config for group message suppression | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42400.md) | complete | Apr 28, 2026, 15:12 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73622](https://github.com/openclaw/openclaw/issues/73622) | [Bug]: agent can read BOOTSTRAP.md on clean install | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73622.md) | complete | Apr 28, 2026, 15:12 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73623](https://github.com/openclaw/openclaw/pull/73623) | fix: validate plugin id before writing config in plugins enable/disable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73623.md) | complete | Apr 28, 2026, 15:11 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73619](https://github.com/openclaw/openclaw/issues/73619) | Default `message` tool `accountId` to the calling agent's own Slack account when omitted | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73619.md) | complete | Apr 28, 2026, 15:10 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72819](https://github.com/openclaw/openclaw/pull/72819) | test: tighten QA provider and plugin registry fixtures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72819.md) | complete | Apr 28, 2026, 15:10 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 15:17 UTC

State: Apply finished

Apply/comment-sync run finished with 4 fresh closes out of requested limit 20. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25061299265](https://github.com/openclaw/clawsweeper/actions/runs/25061299265)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3543 |
| Open PRs | 3402 |
| Open items total | 6945 |
| Reviewed files | 6544 |
| Unreviewed open items | 401 |
| Archived closed files | 13592 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3363 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3177 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6540 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10429 |
| Failed or stale reviews | 4 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 124/738 current (614 due, 16.8%) |
| Hourly hot item cadence (<7d) | 124/738 current (614 due, 16.8%) |
| Daily cadence coverage | 2278/3972 current (1694 due, 57.4%) |
| Daily PR cadence | 1824/2750 current (926 due, 66.3%) |
| Daily new issue cadence (<30d) | 454/1222 current (768 due, 37.2%) |
| Weekly older issue cadence | 1833/1834 current (1 due, 99.9%) |
| Due now by cadence | 2710 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 28, 2026, 12:54 UTC

Status: **Action needed**

Targeted review input: `64563,65635,72522,72527,72529,72531,72532,72535,72536,72537`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6974 |
| Missing eligible open records | 117 |
| Missing maintainer-authored open records | 74 |
| Missing protected open records | 1 |
| Missing recently-created open records | 237 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 4 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#64563](https://github.com/openclaw/openclaw/pull/64563) | Missing eligible open | fix(whatsapp): lazy default auth dir for profile state (#64555) | eligible |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 15:15 UTC. Latest close: Apr 28, 2026, 15:16 UTC. Latest comment sync: Apr 28, 2026, 15:16 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 27 | 2 | 25 | 0 | 27 | 52 | 3 |
| Last hour | 1075 | 52 | 1023 | 0 | 51 | 393 | 4 |
| Last 24 hours | 3546 | 206 | 3340 | 1 | 527 | 928 | 16 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#59571](https://github.com/openclaw/openclaw/issues/59571) | [Bug]: feishu_doc 插件加载正常，但工具未暴露给 agent 调用 | already implemented on main | Apr 28, 2026, 15:16 UTC | [records/openclaw-openclaw/closed/59571.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59571.md) |
| [#59435](https://github.com/openclaw/openclaw/issues/59435) | [Bug] openclaw update 命令会错误覆盖 ai.openclaw.gateway.plist 的配置路径 | already implemented on main | Apr 28, 2026, 15:16 UTC | [records/openclaw-openclaw/closed/59435.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59435.md) |
| [#59422](https://github.com/openclaw/openclaw/pull/59422) | feat(feishu): add ignoreAtAll configuration option | already implemented on main | Apr 28, 2026, 15:16 UTC | [records/openclaw-openclaw/closed/59422.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59422.md) |
| [#59319](https://github.com/openclaw/openclaw/issues/59319) | [Bug]: [2026.4.1] boot-md injects DAILY.md multiple times per message | already implemented on main | Apr 28, 2026, 15:16 UTC | [records/openclaw-openclaw/closed/59319.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59319.md) |
| [#72620](https://github.com/openclaw/openclaw/pull/72620) | fix(active-memory): preserve setup time outside recall timeout | closed externally after review | Apr 28, 2026, 15:15 UTC | [records/openclaw-openclaw/closed/72620.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72620.md) |
| [#59070](https://github.com/openclaw/openclaw/issues/59070) | [Bug]: GatewayRequestError: invalid config: agents: Unrecognized key: \"defaultId\" + permanent \"unsaved config changes\" when changing model on new agent | duplicate or superseded | Apr 28, 2026, 15:13 UTC | [records/openclaw-openclaw/closed/59070.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59070.md) |
| [#59057](https://github.com/openclaw/openclaw/pull/59057) | perf(gateway): cap delta overlap search to prevent O(n*m) freeze on repeated chars | already implemented on main | Apr 28, 2026, 15:13 UTC | [records/openclaw-openclaw/closed/59057.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59057.md) |
| [#59020](https://github.com/openclaw/openclaw/pull/59020) | fix(cron): persist fresh isolated session transcript file | already implemented on main | Apr 28, 2026, 15:13 UTC | [records/openclaw-openclaw/closed/59020.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59020.md) |
| [#58975](https://github.com/openclaw/openclaw/pull/58975) | fix(agents): suppress memory flush UI leakage (#58956) | already implemented on main | Apr 28, 2026, 15:13 UTC | [records/openclaw-openclaw/closed/58975.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58975.md) |
| [#58946](https://github.com/openclaw/openclaw/pull/58946) | Fix node.invoke timeout misclassified as API rate limit | already implemented on main | Apr 28, 2026, 15:13 UTC | [records/openclaw-openclaw/closed/58946.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58946.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73624](https://github.com/openclaw/openclaw/issues/73624) | Bug: subagent spawns drop task instructions when systemPromptOverride is set | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73624.md) | complete | Apr 28, 2026, 15:15 UTC |
| [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73275.md) | complete | Apr 28, 2026, 15:15 UTC |
| [#72807](https://github.com/openclaw/openclaw/pull/72807) | feat(agents): allow opting out of git init on agents.create | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72807.md) | complete | Apr 28, 2026, 15:15 UTC |
| [#73611](https://github.com/openclaw/openclaw/pull/73611) | fix: gate startup context for sandboxed spawned sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73611.md) | complete | Apr 28, 2026, 15:12 UTC |
| [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 28, 2026, 15:12 UTC |
| [#42400](https://github.com/openclaw/openclaw/pull/42400) | feat(channels): add neverReply config for group message suppression | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42400.md) | complete | Apr 28, 2026, 15:12 UTC |
| [#73622](https://github.com/openclaw/openclaw/issues/73622) | [Bug]: agent can read BOOTSTRAP.md on clean install | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73622.md) | complete | Apr 28, 2026, 15:12 UTC |
| [#73623](https://github.com/openclaw/openclaw/pull/73623) | fix: validate plugin id before writing config in plugins enable/disable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73623.md) | complete | Apr 28, 2026, 15:11 UTC |
| [#73619](https://github.com/openclaw/openclaw/issues/73619) | Default `message` tool `accountId` to the calling agent's own Slack account when omitted | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73619.md) | complete | Apr 28, 2026, 15:10 UTC |
| [#72819](https://github.com/openclaw/openclaw/pull/72819) | test: tighten QA provider and plugin registry fixtures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72819.md) | complete | Apr 28, 2026, 15:10 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 15:12 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25061130507](https://github.com/openclaw/clawsweeper/actions/runs/25061130507)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 875 |
| Open PRs | 38 |
| Open items total | 913 |
| Reviewed files | 906 |
| Unreviewed open items | 7 |
| Archived closed files | 10 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 873 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 905 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 1 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 9/52 current (43 due, 17.3%) |
| Hourly hot item cadence (<7d) | 9/52 current (43 due, 17.3%) |
| Daily cadence coverage | 222/222 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 201/201 current (0 due, 100%) |
| Weekly older issue cadence | 631/632 current (1 due, 99.8%) |
| Due now by cadence | 51 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 28, 2026, 12:54 UTC

Status: **Passing**

Targeted review input: `756`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 912 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 7 |
| Missing protected open records | 0 |
| Missing recently-created open records | 0 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 1 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| _None_ |  |  |  |
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 14:22 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 14:24 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 20 | 0 | 20 | 0 | 0 | 20 | 0 |
| Last 24 hours | 916 | 3 | 913 | 1 | 10 | 781 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |
| [#1699](https://github.com/openclaw/clawhub/issues/1699) | Plugin search returns 500, and plugin catalog breaks after page 2 | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/1699.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1699.md) |
| [#85](https://github.com/openclaw/clawhub/issues/85) | Clawhub Sort feature shows wrong results | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/85.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/85.md) |
| [#1736](https://github.com/openclaw/clawhub/pull/1736) | Align hover stats with denormalized counters and fix seed digest stat drift | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1736.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1736.md) |
| [#1324](https://github.com/openclaw/clawhub/pull/1324) | feat: add --dry-run flag to package publish command | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1324.md) |
| [#1240](https://github.com/openclaw/clawhub/pull/1240) | fix: use esbuild minification for safari builds | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1240.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1240.md) |
| [#1842](https://github.com/openclaw/clawhub/pull/1842) | fix: constrain plugin catalog queries | closed externally after review | Apr 28, 2026, 05:05 UTC | [records/openclaw-clawhub/closed/1842.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1842.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1799](https://github.com/openclaw/clawhub/issues/1799) | ZenQuote Skill False Positive - VirusTotal Misidentification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1799.md) | complete | Apr 28, 2026, 14:22 UTC |
| [#1653](https://github.com/openclaw/clawhub/issues/1653) | add skill: robert0812/maton-browse-plan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1653.md) | complete | Apr 28, 2026, 14:22 UTC |
| [#1586](https://github.com/openclaw/clawhub/issues/1586) | ClawHub Security flagged skill as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1586.md) | complete | Apr 28, 2026, 14:22 UTC |
| [#1738](https://github.com/openclaw/clawhub/issues/1738) | False Positive: SkillWiki skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1738.md) | complete | Apr 28, 2026, 14:22 UTC |
| [#1811](https://github.com/openclaw/clawhub/issues/1811) | Skill flagged — suspicious patterns detected (trade-router, re-bruce-wayne) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1811.md) | complete | Apr 28, 2026, 14:22 UTC |
| [#1744](https://github.com/openclaw/clawhub/issues/1744) | Request: delete stale plugin entries claw-pay-plugin (v0.27, v0.25) from Publisher Plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1744.md) | complete | Apr 28, 2026, 14:21 UTC |
| [#1858](https://github.com/openclaw/clawhub/pull/1858) | fix(ui): resolve relative skill README links | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1858.md) | complete | Apr 28, 2026, 14:21 UTC |
| [#1705](https://github.com/openclaw/clawhub/issues/1705) | Skill flagged as suspicious - share-onetime-link | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1705.md) | complete | Apr 28, 2026, 14:21 UTC |
| [#1576](https://github.com/openclaw/clawhub/issues/1576) | False positive: DCL Sentinel Trace flagged as Suspicious — webhook is the product, not a risk | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1576.md) | complete | Apr 28, 2026, 14:21 UTC |
| [#1808](https://github.com/openclaw/clawhub/issues/1808) | Re-evaluation request: topview-skill (official Topview AI client) — medium-suspicious verdict triggered by emoji ZWJ false positive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1808.md) | complete | Apr 28, 2026, 14:21 UTC |

</details>

## How It Works

ClawSweeper is split into a scheduler, a review lane, and an apply lane.

### Scheduler

The scheduler decides what to scan and how often. New and active items get more
attention; older quiet items fall back to a slower cadence.

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

### Safety Model

- Maintainer-authored items are excluded from automated closes.
- Protected labels block close proposals.
- Open PRs with GitHub closing references block issue closes until the PR is
  resolved.
- Open same-author issue/PR pairs block one-sided closes.
- Codex runs without GitHub write tokens.
- Event jobs create target write and report-push credentials only after Codex
  exits.
- CI makes the target checkout read-only for reviews.
- Reviews fail if Codex leaves tracked or untracked changes behind.
- Snapshot changes block apply unless the only change is the bot’s own review
  comment.

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

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later. Scheduled apply runs process both issues and pull requests by default, subject to the selected repository profile; pass `target_repo`, `apply_kind=issue`, or `apply_kind=pull_request` to narrow a manual run.

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
- `OPENCLAW_GH_TOKEN`: optional fallback GitHub token for read-heavy target scans and artifact publish reconciliation when the GitHub App token is unavailable.
- `CLAWSWEEPER_APP_CLIENT_ID`: public GitHub App client ID for `openclaw-ci`. Currently `Iv23liOECG0slfuhz093`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `openclaw-ci`; plan/review jobs use a short-lived GitHub App installation token for read-heavy target API calls, and apply/comment-sync jobs use the app token for comments and closes.
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
- The built-in `GITHUB_TOKEN` commits generated reports back to this repo.

Required app permissions:

- read access for target scan context
- write access to target repository issues and pull requests
- optional Actions write on `openclaw/clawsweeper` for app-token-based run
  cancellation or dispatch
