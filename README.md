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

Last dashboard update: Apr 29, 2026, 02:41 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4412 |
| Open PRs | 3484 |
| Open items total | 7896 |
| Reviewed files | 7461 |
| Unreviewed open items | 435 |
| Due now by cadence | 2159 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 235 |
| Closed by Codex apply | 10616 |
| Failed or stale reviews | 29 |
| Archived closed files | 13925 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6977 | 6551 | 426 | 2098 | 0 | 217 | 10611 | Apr 29, 2026, 02:39 UTC | Apr 29, 2026, 02:41 UTC | 78 |
| [ClawHub](https://github.com/openclaw/clawhub) | 919 | 910 | 9 | 61 | 0 | 18 | 5 | Apr 29, 2026, 02:00 UTC | Apr 29, 2026, 01:22 UTC | 501 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply finished | Apr 29, 2026, 02:41 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25087807513) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 29, 2026, 02:02 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25087242097) |

### Fleet Activity

Latest review: Apr 29, 2026, 02:39 UTC. Latest close: Apr 29, 2026, 02:41 UTC. Latest comment sync: Apr 29, 2026, 02:41 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 16 | 1 | 15 | 0 | 19 | 24 | 0 |
| Last hour | 622 | 8 | 614 | 6 | 48 | 579 | 1 |
| Last 24 hours | 6523 | 394 | 6129 | 26 | 719 | 1375 | 27 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73944](https://github.com/openclaw/openclaw/issues/73944) | [Feature Request] Auto-remove spaces between Chinese and English characters in file paths | belongs on ClawHub | Apr 29, 2026, 02:41 UTC | [records/openclaw-openclaw/closed/73944.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73944.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73886](https://github.com/openclaw/openclaw/pull/73886) | docs(plugins): add Camofox Browser community plugin | belongs on ClawHub | Apr 29, 2026, 02:41 UTC | [records/openclaw-openclaw/closed/73886.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73886.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63897](https://github.com/openclaw/openclaw/issues/63897) | [Bug]: `sessions cleanup --fix-missing` wants to prune valid session entries because `sessionFile` paths are stale/mismatched | duplicate or superseded | Apr 29, 2026, 02:40 UTC | [records/openclaw-openclaw/closed/63897.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63897.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63743](https://github.com/openclaw/openclaw/issues/63743) | [Feature]: Gateway does not support IPv6 listening | duplicate or superseded | Apr 29, 2026, 02:40 UTC | [records/openclaw-openclaw/closed/63743.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63743.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51865](https://github.com/openclaw/openclaw/issues/51865) | Security audit: false positive on valid node denyCommands (camera.snap, screen.record, etc.) | already implemented on main | Apr 29, 2026, 02:40 UTC | [records/openclaw-openclaw/closed/51865.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51865.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#43065](https://github.com/openclaw/openclaw/pull/43065) | fix: interpolate responsePrefix template variables in heartbeat replies | closed externally after review | Apr 29, 2026, 02:37 UTC | [records/openclaw-openclaw/closed/43065.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/43065.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72027](https://github.com/openclaw/openclaw/pull/72027) | fix(gateway): reduce pricing fetch timeout from 60s to 10s | closed externally after review | Apr 29, 2026, 02:37 UTC | [records/openclaw-openclaw/closed/72027.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72027.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73707](https://github.com/openclaw/openclaw/pull/73707) | feat(skills): add persist flag and trustedSources config for commercial use | closed externally after review | Apr 29, 2026, 02:37 UTC | [records/openclaw-openclaw/closed/73707.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73707.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73977](https://github.com/openclaw/openclaw/issues/73977) | ACP Codex auth regression: acpx wrapper forces isolated CODEX_HOME and breaks reuse of valid Codex OAuth | duplicate or superseded | Apr 29, 2026, 02:37 UTC | [records/openclaw-openclaw/closed/73977.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73977.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73932](https://github.com/openclaw/openclaw/pull/73932) | fix(cli): validate plugin ID before enabling | closed externally after item changed | Apr 29, 2026, 02:36 UTC | [records/openclaw-openclaw/closed/73932.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73932.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73990](https://github.com/openclaw/openclaw/issues/73990) | Bug: local Llama/OpenAI-compatible sessions can show 0% context when usage telemetry is missing | high | candidate | Apr 29, 2026, 02:38 UTC | [records/openclaw-openclaw/items/73990.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73990.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51441](https://github.com/openclaw/openclaw/issues/51441) | feat: expose resolved backend model in session_status and agent runtime | high | candidate | Apr 29, 2026, 02:00 UTC | [records/openclaw-openclaw/items/51441.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51441.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73619](https://github.com/openclaw/openclaw/issues/73619) | Default `message` tool `accountId` to the calling agent's own Slack account when omitted | high | candidate | Apr 29, 2026, 01:55 UTC | [records/openclaw-openclaw/items/73619.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73619.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61278](https://github.com/openclaw/openclaw/issues/61278) | [Feature]: Gateway startup is too slow due to hook initialization blocking | high | candidate | Apr 29, 2026, 01:54 UTC | [records/openclaw-openclaw/items/61278.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/61278.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59287](https://github.com/openclaw/openclaw/issues/59287) | [Bug]: openclaw health --json reports telegram.running=false while probe succeeds and status --deep shows Telegram OK | high | candidate | Apr 29, 2026, 01:54 UTC | [records/openclaw-openclaw/items/59287.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59287.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73878](https://github.com/openclaw/openclaw/issues/73878) | infer model run --gateway fails 'No callable tools remain' when modelRun:true + tools.allow has explicit entries (4.25) | high | candidate | Apr 29, 2026, 01:54 UTC | [records/openclaw-openclaw/items/73878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73878.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73376](https://github.com/openclaw/openclaw/issues/73376) | [Bug] CLI命令(openclaw status/cron list)卡住不动 | high | candidate | Apr 29, 2026, 01:53 UTC | [records/openclaw-openclaw/items/73376.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73376.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52757](https://github.com/openclaw/openclaw/issues/52757) | GPT-5.4 default parameter values break message tool (poll, components, media path) | high | candidate | Apr 29, 2026, 01:53 UTC | [records/openclaw-openclaw/items/52757.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52757.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67235](https://github.com/openclaw/openclaw/issues/67235) | [Bug]: `models status --probe --agent <id>` uses main auth store instead of the target agent auth store | high | candidate | Apr 29, 2026, 01:53 UTC | [records/openclaw-openclaw/items/67235.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67235.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52496](https://github.com/openclaw/openclaw/issues/52496) | feat: sessions_send should refuse (or warn) when target is a thread session key | high | candidate | Apr 29, 2026, 01:52 UTC | [records/openclaw-openclaw/items/52496.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52496.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51133](https://github.com/openclaw/openclaw/issues/51133) | Model enters infinite loop in OpenClaw | high | candidate | Apr 29, 2026, 01:52 UTC | [records/openclaw-openclaw/items/51133.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51133.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52421](https://github.com/openclaw/openclaw/issues/52421) | LLM API error: unexpected tool_use_id in tool_result blocks causes session disruption | high | candidate | Apr 29, 2026, 01:52 UTC | [records/openclaw-openclaw/items/52421.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52421.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52130](https://github.com/openclaw/openclaw/issues/52130) | [Bug]: restart storm from telegram.retry.jitter type mismatch + misleading doctor SecretRef for Telegram token | high | candidate | Apr 29, 2026, 01:52 UTC | [records/openclaw-openclaw/items/52130.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52130.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51511](https://github.com/openclaw/openclaw/issues/51511) | [Bug]: Bug Report: Cursor Support Assistant Hijacks Custom Agent Session | high | candidate | Apr 29, 2026, 01:51 UTC | [records/openclaw-openclaw/items/51511.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51511.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52045](https://github.com/openclaw/openclaw/issues/52045) | [Bug]: Enable browser hosting and check the browser status; it indicates that the gateway is not enabled | high | candidate | Apr 29, 2026, 01:51 UTC | [records/openclaw-openclaw/items/52045.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52045.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73954](https://github.com/openclaw/openclaw/issues/73954) | [Bug]: Agent outputs /approve <shell-command> instead of /approve <slug> <decision> | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73954.md) | complete | Apr 29, 2026, 02:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72819](https://github.com/openclaw/openclaw/pull/72819) | test: tighten QA provider and plugin registry fixtures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72819.md) | complete | Apr 29, 2026, 02:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73978](https://github.com/openclaw/openclaw/issues/73978) | [Bug] Discord plugin slash commands miss 3s ack deadline (regression of #60880 for plugin-registered commands) — \"Unknown interaction\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73978.md) | complete | Apr 29, 2026, 02:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72752](https://github.com/openclaw/openclaw/pull/72752) | fix(telegram): show full provider/model label for nested OpenRouter ids | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72752.md) | complete | Apr 29, 2026, 02:38 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72818](https://github.com/openclaw/openclaw/pull/72818) | fix: start configured channel plugins absent from registry | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72818.md) | complete | Apr 29, 2026, 02:38 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73990](https://github.com/openclaw/openclaw/issues/73990) | Bug: local Llama/OpenAI-compatible sessions can show 0% context when usage telemetry is missing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73990.md) | complete | Apr 29, 2026, 02:38 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72709](https://github.com/openclaw/openclaw/pull/72709) | fix: remove outdated \"(Telegram only)\" from reasoning stream ack [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72709.md) | complete | Apr 29, 2026, 02:38 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72797](https://github.com/openclaw/openclaw/pull/72797) | feat(plugin-sdk): add resolve_exec_env hook for channel-specific env injection [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72797.md) | complete | Apr 29, 2026, 02:38 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73971](https://github.com/openclaw/openclaw/issues/73971) | [Feature]: 在页面上新增其他可用大模型的序号和实际报错不一致 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73971.md) | complete | Apr 29, 2026, 02:37 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73968](https://github.com/openclaw/openclaw/pull/73968) | fix(cron): keep system events on session route | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73968.md) | complete | Apr 29, 2026, 02:37 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 02:41 UTC

State: Apply finished

Apply/comment-sync run finished with 5 fresh closes out of requested limit 5. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25087807513](https://github.com/openclaw/clawsweeper/actions/runs/25087807513)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3534 |
| Open PRs | 3443 |
| Open items total | 6977 |
| Reviewed files | 6551 |
| Unreviewed open items | 426 |
| Archived closed files | 13909 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3344 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3197 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6541 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 217 |
| Closed by Codex apply | 10611 |
| Failed or stale reviews | 10 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 66/907 current (841 due, 7.3%) |
| Hourly hot item cadence (<7d) | 66/907 current (841 due, 7.3%) |
| Daily cadence coverage | 2998/3826 current (828 due, 78.4%) |
| Daily PR cadence | 2229/2672 current (443 due, 83.4%) |
| Daily new issue cadence (<30d) | 769/1154 current (385 due, 66.6%) |
| Weekly older issue cadence | 1815/1818 current (3 due, 99.8%) |
| Due now by cadence | 2098 |

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

Latest review: Apr 29, 2026, 02:39 UTC. Latest close: Apr 29, 2026, 02:41 UTC. Latest comment sync: Apr 29, 2026, 02:41 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 16 | 1 | 15 | 0 | 19 | 24 | 0 |
| Last hour | 544 | 8 | 536 | 1 | 48 | 78 | 1 |
| Last 24 hours | 5597 | 391 | 5206 | 7 | 703 | 532 | 27 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73944](https://github.com/openclaw/openclaw/issues/73944) | [Feature Request] Auto-remove spaces between Chinese and English characters in file paths | belongs on ClawHub | Apr 29, 2026, 02:41 UTC | [records/openclaw-openclaw/closed/73944.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73944.md) |
| [#73886](https://github.com/openclaw/openclaw/pull/73886) | docs(plugins): add Camofox Browser community plugin | belongs on ClawHub | Apr 29, 2026, 02:41 UTC | [records/openclaw-openclaw/closed/73886.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73886.md) |
| [#63897](https://github.com/openclaw/openclaw/issues/63897) | [Bug]: `sessions cleanup --fix-missing` wants to prune valid session entries because `sessionFile` paths are stale/mismatched | duplicate or superseded | Apr 29, 2026, 02:40 UTC | [records/openclaw-openclaw/closed/63897.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63897.md) |
| [#63743](https://github.com/openclaw/openclaw/issues/63743) | [Feature]: Gateway does not support IPv6 listening | duplicate or superseded | Apr 29, 2026, 02:40 UTC | [records/openclaw-openclaw/closed/63743.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63743.md) |
| [#51865](https://github.com/openclaw/openclaw/issues/51865) | Security audit: false positive on valid node denyCommands (camera.snap, screen.record, etc.) | already implemented on main | Apr 29, 2026, 02:40 UTC | [records/openclaw-openclaw/closed/51865.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51865.md) |
| [#43065](https://github.com/openclaw/openclaw/pull/43065) | fix: interpolate responsePrefix template variables in heartbeat replies | closed externally after review | Apr 29, 2026, 02:37 UTC | [records/openclaw-openclaw/closed/43065.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/43065.md) |
| [#72027](https://github.com/openclaw/openclaw/pull/72027) | fix(gateway): reduce pricing fetch timeout from 60s to 10s | closed externally after review | Apr 29, 2026, 02:37 UTC | [records/openclaw-openclaw/closed/72027.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72027.md) |
| [#73707](https://github.com/openclaw/openclaw/pull/73707) | feat(skills): add persist flag and trustedSources config for commercial use | closed externally after review | Apr 29, 2026, 02:37 UTC | [records/openclaw-openclaw/closed/73707.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73707.md) |
| [#73977](https://github.com/openclaw/openclaw/issues/73977) | ACP Codex auth regression: acpx wrapper forces isolated CODEX_HOME and breaks reuse of valid Codex OAuth | duplicate or superseded | Apr 29, 2026, 02:37 UTC | [records/openclaw-openclaw/closed/73977.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73977.md) |
| [#73932](https://github.com/openclaw/openclaw/pull/73932) | fix(cli): validate plugin ID before enabling | closed externally after item changed | Apr 29, 2026, 02:36 UTC | [records/openclaw-openclaw/closed/73932.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73932.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#73990](https://github.com/openclaw/openclaw/issues/73990) | Bug: local Llama/OpenAI-compatible sessions can show 0% context when usage telemetry is missing | high | candidate | Apr 29, 2026, 02:38 UTC | [records/openclaw-openclaw/items/73990.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73990.md) |
| [#51441](https://github.com/openclaw/openclaw/issues/51441) | feat: expose resolved backend model in session_status and agent runtime | high | candidate | Apr 29, 2026, 02:00 UTC | [records/openclaw-openclaw/items/51441.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51441.md) |
| [#73619](https://github.com/openclaw/openclaw/issues/73619) | Default `message` tool `accountId` to the calling agent's own Slack account when omitted | high | candidate | Apr 29, 2026, 01:55 UTC | [records/openclaw-openclaw/items/73619.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73619.md) |
| [#61278](https://github.com/openclaw/openclaw/issues/61278) | [Feature]: Gateway startup is too slow due to hook initialization blocking | high | candidate | Apr 29, 2026, 01:54 UTC | [records/openclaw-openclaw/items/61278.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/61278.md) |
| [#59287](https://github.com/openclaw/openclaw/issues/59287) | [Bug]: openclaw health --json reports telegram.running=false while probe succeeds and status --deep shows Telegram OK | high | candidate | Apr 29, 2026, 01:54 UTC | [records/openclaw-openclaw/items/59287.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59287.md) |
| [#73878](https://github.com/openclaw/openclaw/issues/73878) | infer model run --gateway fails 'No callable tools remain' when modelRun:true + tools.allow has explicit entries (4.25) | high | candidate | Apr 29, 2026, 01:54 UTC | [records/openclaw-openclaw/items/73878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73878.md) |
| [#73376](https://github.com/openclaw/openclaw/issues/73376) | [Bug] CLI命令(openclaw status/cron list)卡住不动 | high | candidate | Apr 29, 2026, 01:53 UTC | [records/openclaw-openclaw/items/73376.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73376.md) |
| [#52757](https://github.com/openclaw/openclaw/issues/52757) | GPT-5.4 default parameter values break message tool (poll, components, media path) | high | candidate | Apr 29, 2026, 01:53 UTC | [records/openclaw-openclaw/items/52757.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52757.md) |
| [#67235](https://github.com/openclaw/openclaw/issues/67235) | [Bug]: `models status --probe --agent <id>` uses main auth store instead of the target agent auth store | high | candidate | Apr 29, 2026, 01:53 UTC | [records/openclaw-openclaw/items/67235.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67235.md) |
| [#52496](https://github.com/openclaw/openclaw/issues/52496) | feat: sessions_send should refuse (or warn) when target is a thread session key | high | candidate | Apr 29, 2026, 01:52 UTC | [records/openclaw-openclaw/items/52496.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52496.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73954](https://github.com/openclaw/openclaw/issues/73954) | [Bug]: Agent outputs /approve <shell-command> instead of /approve <slug> <decision> | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73954.md) | complete | Apr 29, 2026, 02:39 UTC |
| [#72819](https://github.com/openclaw/openclaw/pull/72819) | test: tighten QA provider and plugin registry fixtures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72819.md) | complete | Apr 29, 2026, 02:39 UTC |
| [#73978](https://github.com/openclaw/openclaw/issues/73978) | [Bug] Discord plugin slash commands miss 3s ack deadline (regression of #60880 for plugin-registered commands) — \"Unknown interaction\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73978.md) | complete | Apr 29, 2026, 02:39 UTC |
| [#72752](https://github.com/openclaw/openclaw/pull/72752) | fix(telegram): show full provider/model label for nested OpenRouter ids | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72752.md) | complete | Apr 29, 2026, 02:38 UTC |
| [#72818](https://github.com/openclaw/openclaw/pull/72818) | fix: start configured channel plugins absent from registry | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72818.md) | complete | Apr 29, 2026, 02:38 UTC |
| [#73990](https://github.com/openclaw/openclaw/issues/73990) | Bug: local Llama/OpenAI-compatible sessions can show 0% context when usage telemetry is missing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73990.md) | complete | Apr 29, 2026, 02:38 UTC |
| [#72709](https://github.com/openclaw/openclaw/pull/72709) | fix: remove outdated \"(Telegram only)\" from reasoning stream ack [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72709.md) | complete | Apr 29, 2026, 02:38 UTC |
| [#72797](https://github.com/openclaw/openclaw/pull/72797) | feat(plugin-sdk): add resolve_exec_env hook for channel-specific env injection [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72797.md) | complete | Apr 29, 2026, 02:38 UTC |
| [#73971](https://github.com/openclaw/openclaw/issues/73971) | [Feature]: 在页面上新增其他可用大模型的序号和实际报错不一致 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73971.md) | complete | Apr 29, 2026, 02:37 UTC |
| [#73968](https://github.com/openclaw/openclaw/pull/73968) | fix(cron): keep system events on session route | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73968.md) | complete | Apr 29, 2026, 02:37 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 02:02 UTC

State: Review in progress

Planned 427 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25087242097](https://github.com/openclaw/clawsweeper/actions/runs/25087242097)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 878 |
| Open PRs | 41 |
| Open items total | 919 |
| Reviewed files | 910 |
| Unreviewed open items | 9 |
| Archived closed files | 16 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 858 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 891 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 18 |
| Closed by Codex apply | 5 |
| Failed or stale reviews | 19 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 17/53 current (36 due, 32.1%) |
| Hourly hot item cadence (<7d) | 17/53 current (36 due, 32.1%) |
| Daily cadence coverage | 215/223 current (8 due, 96.4%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 194/202 current (8 due, 96%) |
| Weekly older issue cadence | 626/634 current (8 due, 98.7%) |
| Due now by cadence | 61 |

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

Latest review: Apr 29, 2026, 02:00 UTC. Latest close: Apr 29, 2026, 01:22 UTC. Latest comment sync: Apr 29, 2026, 02:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 78 | 0 | 78 | 5 | 0 | 501 | 0 |
| Last 24 hours | 926 | 3 | 923 | 19 | 16 | 843 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 01:46 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1432](https://github.com/openclaw/clawhub/issues/1432) | False 'suspicious' flag: registry metadata not extracting openclaw.requires.env from published files | high | candidate | Apr 29, 2026, 01:21 UTC | [records/openclaw-clawhub/items/1432.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1432.md) |
| [#1521](https://github.com/openclaw/clawhub/issues/1521) | Embedding failed 500 error blocks skill publication + request to remove flagged versions | high | candidate | Apr 29, 2026, 01:19 UTC | [records/openclaw-clawhub/items/1521.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1521.md) |
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 01:19 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 01:17 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |
| [#371](https://github.com/openclaw/clawhub/issues/371) | Add appeal link for VirusTotal false positives in UI | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/371.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/371.md) |
| [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 01:15 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1528](https://github.com/openclaw/clawhub/issues/1528) | Help, fit-converter skill is officially skill but flagged as suspicious after scanning | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1528.md) | failed | Apr 29, 2026, 02:00 UTC |
| [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) | failed | Apr 29, 2026, 02:00 UTC |
| [#1563](https://github.com/openclaw/clawhub/issues/1563) | Skill flagged suspicious, scan tagged benign | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1563.md) | complete | Apr 29, 2026, 01:53 UTC |
| [#1558](https://github.com/openclaw/clawhub/issues/1558) | False positive: TrencherAI skill flagged for undeclared credentials | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1558.md) | complete | Apr 29, 2026, 01:52 UTC |
| [#1568](https://github.com/openclaw/clawhub/issues/1568) | False positive: 错敏信息检测 (ucap-sensitive-check-skill v1.0.1) incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1568.md) | complete | Apr 29, 2026, 01:52 UTC |
| [#1572](https://github.com/openclaw/clawhub/issues/1572) | False positive: @daririnch/dcl-policy-enforcer flagged as suspicious (MEDIUM) — transmits to author's own webhook | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1572.md) | complete | Apr 29, 2026, 01:52 UTC |
| [#1516](https://github.com/openclaw/clawhub/issues/1516) | False positive: multi-engine-websearch flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1516.md) | complete | Apr 29, 2026, 01:52 UTC |
| [#1503](https://github.com/openclaw/clawhub/issues/1503) | False positive: axonflow/governance-policies flagged as suspicious — security policy templates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1503.md) | complete | Apr 29, 2026, 01:52 UTC |
| [#1639](https://github.com/openclaw/clawhub/issues/1639) | Request for Early Publishing Permission - Xiaohongshu Viral Title Generator | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1639.md) | complete | Apr 29, 2026, 01:52 UTC |
| [#1690](https://github.com/openclaw/clawhub/issues/1690) | False positive flag: eolas-openclaw-mcp is a legitimate DeFi trading plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1690.md) | complete | Apr 29, 2026, 01:52 UTC |

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
