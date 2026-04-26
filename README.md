# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per open item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- duplicate or superseded by a canonical issue/PR
- concrete but not actionable in this source repo
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 26, 2026, 00:34 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 26, 2026, 00:34 UTC

State: Apply finished

Apply/comment-sync run finished with 0 fresh closes out of requested limit 0. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24944317241](https://github.com/openclaw/clawsweeper/actions/runs/24944317241)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5441 |
| Fresh reviewed issues in the last 7 days | 5398 |
| Proposed issue closes | 802 (14.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4251 |
| Fresh reviewed PRs in the last 7 days | 4152 |
| Proposed PR closes | 42 (1% of reviewed PRs) |
| Open items total | 9692 |
| Reviewed files | 9562 |
| Unreviewed open items | 130 |
| Archived closed files | 9735 |
| Fresh verified reviews in the last 7 days | 9550 |
| Proposed closes awaiting apply | 844 (8.8% of fresh reviews) |
| Closed by Codex apply | 7535 |
| Failed or stale reviews | 12 |
| Hourly cadence coverage | 20/1076 current (1056 due, 1.9%) |
| Hourly hot item cadence (<7d) | 20/1076 current (1056 due, 1.9%) |
| Daily cadence coverage | 5215/5763 current (548 due, 90.5%) |
| Daily PR cadence | 3412/3669 current (257 due, 93%) |
| Daily new issue cadence (<30d) | 1803/2094 current (291 due, 86.1%) |
| Weekly older issue cadence | 2720/2723 current (3 due, 99.9%) |
| Due now by cadence | 1737 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#54472](https://github.com/openclaw/openclaw/issues/54472) | macOS app: UI freezes when scrolling conversations with large system messages | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54472.md) | complete | Apr 26, 2026, 00:26 UTC |
| [#54571](https://github.com/openclaw/openclaw/issues/54571) | [Feature]: | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54571.md) | complete | Apr 26, 2026, 00:25 UTC |
| [#54456](https://github.com/openclaw/openclaw/issues/54456) | replyToMode 'all' not working - applyReplyThreading missing currentMessageId parameter in followup runner | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54456.md) | complete | Apr 26, 2026, 00:25 UTC |
| [#54634](https://github.com/openclaw/openclaw/issues/54634) | Update 2026.3.24 silently drops config when HOME changes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54634.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54427](https://github.com/openclaw/openclaw/issues/54427) | Feature Request: Real-time Screen Sharing | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54427.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54559](https://github.com/openclaw/openclaw/issues/54559) | loopDetection: genericRepeat detector never escalates to critical — tools blocked only by warn-level only | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54559.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54577](https://github.com/openclaw/openclaw/issues/54577) | Add agent activity timeline view | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54577.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54383](https://github.com/openclaw/openclaw/issues/54383) | Compaction fails with 1M context: max_tokens 240000 > 128000 for Anthropic models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54383.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54535](https://github.com/openclaw/openclaw/issues/54535) | [Bug] openclaw browser CLI crashes Chrome 146 via Playwright connectOverCDP (EXC_BREAKPOINT/SIGTRAP) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54535.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54537](https://github.com/openclaw/openclaw/issues/54537) | Feature request: dangerouslyAllowHostNetwork escape hatch for sandbox Docker networking | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54537.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54587](https://github.com/openclaw/openclaw/issues/54587) | Feature request: dangerouslyAllowUnsandboxedSubagentSpawn escape hatch for cross-sandbox agent orchestration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54587.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54408](https://github.com/openclaw/openclaw/issues/54408) | [Bug]: Pre-compaction memory flush leaks into main session as user messages and causes compaction loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54408.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54518](https://github.com/openclaw/openclaw/issues/54518) | [Bug]: Agents should not be able to access or modify files outside their own working space. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54518.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54605](https://github.com/openclaw/openclaw/issues/54605) | WUI/TUI do not surface Telegram-appended messages from shared main session transcript | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54605.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54478](https://github.com/openclaw/openclaw/issues/54478) | [Feature]: Option to expand tool call output by default in webchat | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54478.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54467](https://github.com/openclaw/openclaw/issues/54467) | Bonjour: no config key for per-instance mDNS service name (multi-gateway same-host) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54467.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54580](https://github.com/openclaw/openclaw/issues/54580) | [Bug 反馈] 2026.3.23-2 飞书渠道两个严重问题：模块缺失 + 卡片创建失败 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54580.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54496](https://github.com/openclaw/openclaw/issues/54496) | [Feature]: Silent reasoning — exclude thinking content from session transcript | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54496.md) | complete | Apr 26, 2026, 00:24 UTC |
| [#54669](https://github.com/openclaw/openclaw/issues/54669) | [Field Report] Chrome 136+ binds CDP to [::1] (IPv6) on Windows — portproxy v4tov4 breaks silently | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54669.md) | complete | Apr 26, 2026, 00:23 UTC |
| [#54515](https://github.com/openclaw/openclaw/issues/54515) | Published package openclaw@2026.3.23-2 contains bundled metadata/extensions still marked 2026.3.14 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54515.md) | complete | Apr 26, 2026, 00:23 UTC |

## How It Works

The normal review workflow is proposal-only. It runs configurable parallel shards and never comments or closes during review. The apply/comment-sync workflow is separate; it updates the durable Codex automated review comment in place and closes only unchanged high-confidence proposals.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Pre-hydrates compact related issue/PR context referenced from the item body, comments, timeline, or PR review comments, plus a small best-effort local title search over existing reports for likely duplicates/superseded work.
5. Runs Codex with `gpt-5.5`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout. The review prompt requires source/docs/tests/history inspection, adjacent-code reading, and reason-specific evidence before Codex can mark a close as high-confidence.
6. Writes `items/<number>.md` with the decision, best possible solution, proposed review comment, review runtime (`review_model`, `review_reasoning_effort`, sandbox, service tier), and a GitHub snapshot hash.
7. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, runs Codex without the nested Linux sandbox that blocks shell inspection on GitHub runners, checks the checkout again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is hourly for items with activity since the last stored snapshot and for anything created in the last 7 days, daily for older PRs and issues younger than 30 days, and weekly for older inactive issues. A separate hot-intake lane runs every 5 minutes with `batch_size=1`, up to 20 shards, and a two-page newest/most-recently-updated scan so brand-new issues and PRs get individual review workers quickly. A review policy change, including model, reasoning effort, sandbox, service tier, prompt, or schema changes, also makes old reports due again. When more items are due than fit in a run, the planner prioritizes active items first, then policy-stale reports, then hot new items, then PRs, then recent issues, then older weekly reviews. The dashboard reports local cadence coverage for hourly hot items, daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To sync comments or close later without rerunning Codex, dispatch the workflow with `apply_existing=true` or let the scheduled apply lane run at minute 37 each hour. That mode reads existing `items/*.md`, refetches the issue/PR context, updates the single marker-backed Codex automated review comment in place, and only closes if nothing except that review comment changed since the proposal was written. It never posts a second close comment; closing reuses the durable review comment and then closes the item. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Transient GitHub API/network failures use shorter retries so long scans can survive connection resets or gateway errors. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

`npm run audit` compares live open GitHub items with the generated `items/` and `closed/` records without moving files. It reports missing open records, open records still archived under `closed/`, stale `items/` records that no longer appear open, duplicate markdown records, protected-label proposed closes, and stale review-status records. Use `--output audit-report.json` for the full report, `--sample-limit N` to control console samples, and `--strict` to exit non-zero when state drift is present.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 50 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run audit -- --max-pages 250 --sample-limit 25
npm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later.

## Checks

```bash
npm run check
npm run oxformat
```

`oxformat` is an alias for `oxfmt`; there is no separate `oxformat` npm package.

## GitHub Actions Setup

Required secrets:

- `OPENAI_API_KEY`: OpenAI API key used to log Codex in before review shards run.
- `CODEX_API_KEY`: optional compatibility alias for the same key during the login check.
- `OPENCLAW_GH_TOKEN`: GitHub token with write access to `openclaw/openclaw` issues and PRs.
- `CLAWSWEEPER_APP_ID`: optional GitHub App ID for the read-only OpenClaw scan token. Currently `3306130` for `openclaw-ci`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: optional private key for `openclaw-ci`; when present, plan/review jobs use a short-lived GitHub App installation token for read-heavy `openclaw/openclaw` API calls.

The workflow logs Codex in with `OPENAI_API_KEY`, then runs review shards without OpenAI or Codex token environment variables. Parent ClawSweeper code uses the `openclaw-ci` GitHub App installation token for read-heavy target and related GitHub context before invoking Codex, falling back to `OPENCLAW_GH_TOKEN` only if the App secrets are absent. `codex exec` uses the prepared login state, and the shard fails instead of writing fallback review markdown if Codex auth/output fails. Apply mode still uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
