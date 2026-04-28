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

Last dashboard update: Apr 28, 2026, 10:26 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4233 |
| Open PRs | 3229 |
| Open items total | 7462 |
| Reviewed files | 7462 |
| Unreviewed open items | 0 |
| Due now by cadence | 3495 |
| Proposed closes awaiting apply | 1 |
| Closed by Codex apply | 10293 |
| Failed or stale reviews | 51 |
| Archived closed files | 13419 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6559 | 6559 | 0 | 3452 | 1 | 10290 | Apr 28, 2026, 09:59 UTC | Apr 28, 2026, 10:01 UTC | 33 |
| [ClawHub](https://github.com/openclaw/clawhub) | 903 | 903 | 0 | 43 | 0 | 3 | Apr 28, 2026, 09:59 UTC | Apr 28, 2026, 08:18 UTC | 507 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 28, 2026, 10:26 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25047553807) |
| [ClawHub](https://github.com/openclaw/clawhub) | Apply throttled | Apr 28, 2026, 10:16 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25046846753) |

### Fleet Activity

Latest review: Apr 28, 2026, 09:59 UTC. Latest close: Apr 28, 2026, 10:01 UTC. Latest comment sync: Apr 28, 2026, 10:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 574 | 4 | 570 | 1 | 20 | 540 | 1 |
| Last 24 hours | 3016 | 102 | 2914 | 10 | 388 | 1099 | 20 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72700](https://github.com/openclaw/openclaw/pull/72700) | feat(openrouter): add video generation provider | closed externally after review | Apr 28, 2026, 10:01 UTC | [records/openclaw-openclaw/closed/72700.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72700.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73441](https://github.com/openclaw/openclaw/issues/73441) | Discord DM: single message processed twice (normal + spurious queued replay) | already implemented on main | Apr 28, 2026, 09:48 UTC | [records/openclaw-openclaw/closed/73441.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73441.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73450](https://github.com/openclaw/openclaw/issues/73450) | [Bug]: Telegram /new can trigger empty Codex Responses request and expose provider error | already implemented on main | Apr 28, 2026, 09:45 UTC | [records/openclaw-openclaw/closed/73450.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73450.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73429](https://github.com/openclaw/openclaw/pull/73429) | fix(plugin-sdk): backfill reasoning_content on all DeepSeek V4 assistant messages | closed externally after item changed | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/73429.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73429.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73417](https://github.com/openclaw/openclaw/issues/73417) | DeepSeek V4: ensureDeepSeekV4ToolCallReasoningContent 未覆盖无 tool_calls 的 assistant 消息 | closed externally after item changed | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/73417.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73417.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73372](https://github.com/openclaw/openclaw/pull/73372) | fix(cron): clarify local timezone cron expressions | closed externally after review | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/73372.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73372.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73361](https://github.com/openclaw/openclaw/pull/73361) | fix(ui): confirm button-triggered new session resets | closed externally after review | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/73361.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73361.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66367](https://github.com/openclaw/openclaw/pull/66367) | fix: expose qwen3.6-plus on Coding Plan endpoints | closed externally after review | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/66367.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66367.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63654](https://github.com/openclaw/openclaw/issues/63654) | Qwen: qwen3.6-plus image understanding blocked on Coding Plan endpoint despite model supporting vision | closed externally after review | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/63654.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63654.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56611](https://github.com/openclaw/openclaw/issues/56611) | Control UI: + button easily confused with attachment — add option to hide or reposition | closed externally after review | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/56611.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56611.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71156](https://github.com/openclaw/openclaw/pull/71156) | docs: add AGENTS.md for secrets and pairing high-privilege zones | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71156.md) | failed | Apr 28, 2026, 09:59 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1742](https://github.com/openclaw/clawhub/issues/1742) | False Positive Appeal -- hk-stock-morning-report flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1742.md) | complete | Apr 28, 2026, 09:59 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1755](https://github.com/openclaw/clawhub/issues/1755) | AgentID flagged wrongly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1755.md) | complete | Apr 28, 2026, 09:59 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1741](https://github.com/openclaw/clawhub/issues/1741) | Skill 'voc-amazon-reviews' incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1741.md) | complete | Apr 28, 2026, 09:59 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1734](https://github.com/openclaw/clawhub/issues/1734) | Haah shows as suspicious what can I improve | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1734.md) | complete | Apr 28, 2026, 09:59 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1725](https://github.com/openclaw/clawhub/issues/1725) | [Skill Review] weiliaozi-skill flagged as suspicious due to prompt pattern — likely false positive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1725.md) | complete | Apr 28, 2026, 09:59 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1719](https://github.com/openclaw/clawhub/issues/1719) | False positive: skill flagged as suspicious - caveman-soul-optimizer | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1719.md) | complete | Apr 28, 2026, 09:59 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1738](https://github.com/openclaw/clawhub/issues/1738) | False Positive: SkillWiki skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1738.md) | complete | Apr 28, 2026, 09:58 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1748](https://github.com/openclaw/clawhub/issues/1748) | False positive security flag on skill: zim (v3.0.2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1748.md) | complete | Apr 28, 2026, 09:58 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1735](https://github.com/openclaw/clawhub/issues/1735) | Peeps shows up as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1735.md) | complete | Apr 28, 2026, 09:58 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 10:26 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25047553807](https://github.com/openclaw/clawsweeper/actions/runs/25047553807)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3361 |
| Open PRs | 3198 |
| Open items total | 6559 |
| Reviewed files | 6559 |
| Unreviewed open items | 0 |
| Archived closed files | 13409 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3334 |
| Proposed issue closes | 1 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3175 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6509 |
| Proposed closes awaiting apply | 1 (0% of fresh reviews) |
| Closed by Codex apply | 10290 |
| Failed or stale reviews | 50 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 43/653 current (610 due, 6.6%) |
| Hourly hot item cadence (<7d) | 43/653 current (610 due, 6.6%) |
| Daily cadence coverage | 1234/4068 current (2834 due, 30.3%) |
| Daily PR cadence | 959/2819 current (1860 due, 34%) |
| Daily new issue cadence (<30d) | 275/1249 current (974 due, 22%) |
| Weekly older issue cadence | 1830/1838 current (8 due, 99.6%) |
| Due now by cadence | 3452 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 09:59 UTC. Latest close: Apr 28, 2026, 10:01 UTC. Latest comment sync: Apr 28, 2026, 10:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 534 | 4 | 530 | 1 | 20 | 33 | 1 |
| Last 24 hours | 2103 | 99 | 2004 | 9 | 378 | 395 | 20 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72700](https://github.com/openclaw/openclaw/pull/72700) | feat(openrouter): add video generation provider | closed externally after review | Apr 28, 2026, 10:01 UTC | [records/openclaw-openclaw/closed/72700.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72700.md) |
| [#73441](https://github.com/openclaw/openclaw/issues/73441) | Discord DM: single message processed twice (normal + spurious queued replay) | already implemented on main | Apr 28, 2026, 09:48 UTC | [records/openclaw-openclaw/closed/73441.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73441.md) |
| [#73450](https://github.com/openclaw/openclaw/issues/73450) | [Bug]: Telegram /new can trigger empty Codex Responses request and expose provider error | already implemented on main | Apr 28, 2026, 09:45 UTC | [records/openclaw-openclaw/closed/73450.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73450.md) |
| [#73429](https://github.com/openclaw/openclaw/pull/73429) | fix(plugin-sdk): backfill reasoning_content on all DeepSeek V4 assistant messages | closed externally after item changed | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/73429.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73429.md) |
| [#73417](https://github.com/openclaw/openclaw/issues/73417) | DeepSeek V4: ensureDeepSeekV4ToolCallReasoningContent 未覆盖无 tool_calls 的 assistant 消息 | closed externally after item changed | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/73417.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73417.md) |
| [#73372](https://github.com/openclaw/openclaw/pull/73372) | fix(cron): clarify local timezone cron expressions | closed externally after review | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/73372.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73372.md) |
| [#73361](https://github.com/openclaw/openclaw/pull/73361) | fix(ui): confirm button-triggered new session resets | closed externally after review | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/73361.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73361.md) |
| [#66367](https://github.com/openclaw/openclaw/pull/66367) | fix: expose qwen3.6-plus on Coding Plan endpoints | closed externally after review | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/66367.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66367.md) |
| [#63654](https://github.com/openclaw/openclaw/issues/63654) | Qwen: qwen3.6-plus image understanding blocked on Coding Plan endpoint despite model supporting vision | closed externally after review | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/63654.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63654.md) |
| [#56611](https://github.com/openclaw/openclaw/issues/56611) | Control UI: + button easily confused with attachment — add option to hide or reposition | closed externally after review | Apr 28, 2026, 09:43 UTC | [records/openclaw-openclaw/closed/56611.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56611.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71156](https://github.com/openclaw/openclaw/pull/71156) | docs: add AGENTS.md for secrets and pairing high-privilege zones | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71156.md) | failed | Apr 28, 2026, 09:59 UTC |
| [#72762](https://github.com/openclaw/openclaw/pull/72762) | docs: Add a note regarding the unreadable QR code caused by font limi… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72762.md) | complete | Apr 28, 2026, 09:56 UTC |
| [#73469](https://github.com/openclaw/openclaw/issues/73469) | Streaming cards don't send @mention notifications when agent writes <at> tags in text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73469.md) | complete | Apr 28, 2026, 09:56 UTC |
| [#73470](https://github.com/openclaw/openclaw/issues/73470) | Feature: Mandatory completeness scan guardrail for read/search operations | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73470.md) | complete | Apr 28, 2026, 09:54 UTC |
| [#67244](https://github.com/openclaw/openclaw/issues/67244) | Explicit ACP agent runs: embedded backend visibility failure and stale final JSON state after sessions_yield | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67244.md) | complete | Apr 28, 2026, 09:53 UTC |
| [#72621](https://github.com/openclaw/openclaw/pull/72621) | fix(whatsapp): recover stale listener after auth conflict churn | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72621.md) | complete | Apr 28, 2026, 09:52 UTC |
| [#67509](https://github.com/openclaw/openclaw/pull/67509) | fix: add root guard to prevent CLI execution as root (#67478) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67509.md) | complete | Apr 28, 2026, 09:52 UTC |
| [#53745](https://github.com/openclaw/openclaw/issues/53745) | Gateway freezes after nested subagent activity, stops all Telegram polling | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53745.md) | complete | Apr 28, 2026, 09:52 UTC |
| [#67472](https://github.com/openclaw/openclaw/pull/67472) | fix(backup): gracefully skip session files deleted during backup create | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67472.md) | complete | Apr 28, 2026, 09:52 UTC |
| [#67394](https://github.com/openclaw/openclaw/issues/67394) | [Bug]: WhatsApp group auto-reply silently fails — agent reply generates but never delivers to WhatsApp group | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67394.md) | complete | Apr 28, 2026, 09:52 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 10:16 UTC

State: Apply throttled

GitHub throttled while applying close decisions. Last throttled command: `gh api repos/openclaw/clawhub/issues?state=open&sort=created&direction=asc&per_page=100&page=1`. Retry 5/11 in 480s.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25046846753](https://github.com/openclaw/clawsweeper/actions/runs/25046846753)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 872 |
| Open PRs | 31 |
| Open items total | 903 |
| Reviewed files | 903 |
| Unreviewed open items | 0 |
| Archived closed files | 10 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 871 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 31 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 902 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 1 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 9/51 current (42 due, 17.6%) |
| Hourly hot item cadence (<7d) | 9/51 current (42 due, 17.6%) |
| Daily cadence coverage | 226/226 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 205/205 current (0 due, 100%) |
| Weekly older issue cadence | 625/626 current (1 due, 99.8%) |
| Due now by cadence | 43 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 09:59 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 10:00 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 40 | 0 | 40 | 0 | 0 | 507 | 0 |
| Last 24 hours | 913 | 3 | 910 | 1 | 10 | 704 | 0 |

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
| [#1742](https://github.com/openclaw/clawhub/issues/1742) | False Positive Appeal -- hk-stock-morning-report flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1742.md) | complete | Apr 28, 2026, 09:59 UTC |
| [#1755](https://github.com/openclaw/clawhub/issues/1755) | AgentID flagged wrongly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1755.md) | complete | Apr 28, 2026, 09:59 UTC |
| [#1741](https://github.com/openclaw/clawhub/issues/1741) | Skill 'voc-amazon-reviews' incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1741.md) | complete | Apr 28, 2026, 09:59 UTC |
| [#1734](https://github.com/openclaw/clawhub/issues/1734) | Haah shows as suspicious what can I improve | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1734.md) | complete | Apr 28, 2026, 09:59 UTC |
| [#1725](https://github.com/openclaw/clawhub/issues/1725) | [Skill Review] weiliaozi-skill flagged as suspicious due to prompt pattern — likely false positive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1725.md) | complete | Apr 28, 2026, 09:59 UTC |
| [#1719](https://github.com/openclaw/clawhub/issues/1719) | False positive: skill flagged as suspicious - caveman-soul-optimizer | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1719.md) | complete | Apr 28, 2026, 09:59 UTC |
| [#1738](https://github.com/openclaw/clawhub/issues/1738) | False Positive: SkillWiki skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1738.md) | complete | Apr 28, 2026, 09:58 UTC |
| [#1748](https://github.com/openclaw/clawhub/issues/1748) | False positive security flag on skill: zim (v3.0.2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1748.md) | complete | Apr 28, 2026, 09:58 UTC |
| [#1735](https://github.com/openclaw/clawhub/issues/1735) | Peeps shows up as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1735.md) | complete | Apr 28, 2026, 09:58 UTC |
| [#1733](https://github.com/openclaw/clawhub/issues/1733) | Fixed All issues but still show susipcious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1733.md) | complete | Apr 28, 2026, 09:58 UTC |

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
