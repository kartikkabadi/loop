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

Last dashboard update: Apr 25, 2026, 23:41 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 23:41 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24943429075](https://github.com/openclaw/clawsweeper/actions/runs/24943429075)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5505 |
| Fresh reviewed issues in the last 7 days | 5464 |
| Proposed issue closes | 602 (11% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4259 |
| Fresh reviewed PRs in the last 7 days | 4172 |
| Proposed PR closes | 45 (1.1% of reviewed PRs) |
| Open items total | 9764 |
| Reviewed files | 9638 |
| Unreviewed open items | 126 |
| Archived closed files | 9659 |
| Fresh verified reviews in the last 7 days | 9636 |
| Proposed closes awaiting apply | 647 (6.7% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 2 |
| Daily cadence coverage | 6322/6873 current (551 due, 92%) |
| Daily PR cadence | 3917/4174 current (257 due, 93.8%) |
| Daily new issue cadence (<30d) | 2405/2699 current (294 due, 89.1%) |
| Weekly older issue cadence | 2765/2765 current (0 due, 100%) |
| Due now by cadence | 677 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#49060](https://github.com/openclaw/openclaw/issues/49060) | ACP server stdout corruption when logging subsystem writes to stdout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49060.md) | complete | Apr 25, 2026, 23:40 UTC |
| [#49057](https://github.com/openclaw/openclaw/issues/49057) | [Bug]: WhatsApp Web listener flaps / logs out on 2026.3.13 causing cron + message delivery failures (“No active WhatsApp Web listener”) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49057.md) | complete | Apr 25, 2026, 23:40 UTC |
| [#49010](https://github.com/openclaw/openclaw/issues/49010) | Add opt-in message-level signing for mcporter stdio transport | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49010.md) | complete | Apr 25, 2026, 23:40 UTC |
| [#48897](https://github.com/openclaw/openclaw/issues/48897) | [Bug] TUI input breaks on German keyboard layout: duplicated printable characters and broken AltGr (@, €) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48897.md) | complete | Apr 25, 2026, 23:39 UTC |
| [#48943](https://github.com/openclaw/openclaw/issues/48943) | Telegram typingMode: 'never' not working - sendChatAction 401 errors persist | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48943.md) | complete | Apr 25, 2026, 23:39 UTC |
| [#49073](https://github.com/openclaw/openclaw/issues/49073) | [Feature]: Telegram thread/topic support for sub-agent spawning | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49073.md) | complete | Apr 25, 2026, 23:39 UTC |
| [#49019](https://github.com/openclaw/openclaw/issues/49019) | [Feature]: Add an optional result-return mode for /hooks/agent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49019.md) | complete | Apr 25, 2026, 23:39 UTC |
| [#49071](https://github.com/openclaw/openclaw/issues/49071) | Duplicate workspaces created when switching to Feishu client after successful config or using /new after lag | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49071.md) | complete | Apr 25, 2026, 23:39 UTC |
| [#49086](https://github.com/openclaw/openclaw/issues/49086) | [Bug/Template]: LLM hallucinates Unix timestamps when writing heartbeat-state.json — causes skipped or over-triggered checks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49086.md) | complete | Apr 25, 2026, 23:39 UTC |
| [#48947](https://github.com/openclaw/openclaw/issues/48947) | [Bug]: Openclaw is stupid again: 200000 tool calls, no feedback, interruptions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48947.md) | complete | Apr 25, 2026, 23:39 UTC |
| [#49170](https://github.com/openclaw/openclaw/issues/49170) | [Bug]: Daily session reset wipes actively used sessions at the daily boundary | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49170.md) | complete | Apr 25, 2026, 23:39 UTC |
| [#49031](https://github.com/openclaw/openclaw/issues/49031) | [Bug]: macOS companion app node missing system.run.prepare — exec completely broken on local mode | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49031.md) | complete | Apr 25, 2026, 23:39 UTC |
| [#48979](https://github.com/openclaw/openclaw/issues/48979) | Telegram channel cannot send images via read tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48979.md) | complete | Apr 25, 2026, 23:39 UTC |
| [#48695](https://github.com/openclaw/openclaw/issues/48695) | [Bug]: Browser automation with OpenClaw on VPS — unable to advance in dynamic web app (AVA ERP | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48695.md) | complete | Apr 25, 2026, 23:38 UTC |
| [#48894](https://github.com/openclaw/openclaw/issues/48894) | [Feature]: Support MESSAGE_UPDATE for new @mention detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48894.md) | complete | Apr 25, 2026, 23:38 UTC |
| [#49185](https://github.com/openclaw/openclaw/issues/49185) | [Feature]: Configurable maxRetries per provider for model API calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49185.md) | complete | Apr 25, 2026, 23:38 UTC |
| [#49012](https://github.com/openclaw/openclaw/issues/49012) | [Bug]: The OpenClaw gateway is \"frozen\" and experiencing \"port conflicts,\" preventing web pages from loading. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49012.md) | complete | Apr 25, 2026, 23:38 UTC |
| [#48600](https://github.com/openclaw/openclaw/issues/48600) | Feature Request: FTS5 full-text session search with LLM summarization for cross-session recall | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48600.md) | complete | Apr 25, 2026, 23:38 UTC |
| [#48996](https://github.com/openclaw/openclaw/issues/48996) | feat(webchat): 支持 mermaid 渲染 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48996.md) | complete | Apr 25, 2026, 23:38 UTC |
| [#48992](https://github.com/openclaw/openclaw/issues/48992) | Gateway LaunchAgent not updated on non-git installs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48992.md) | complete | Apr 25, 2026, 23:38 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes during review. `apply_existing=true` is the only workflow mode that comments or closes items.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Pre-hydrates compact related issue/PR context referenced from the item body, comments, timeline, or PR review comments, plus a small best-effort local title search over existing reports for likely duplicates/superseded work.
5. Runs Codex with `gpt-5.5`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
6. Writes `items/<number>.md` with the decision, proposed close comment, review runtime (`review_model`, `review_reasoning_effort`, sandbox, service tier), and a GitHub snapshot hash.
7. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, runs Codex without the nested Linux sandbox that blocks shell inspection on GitHub runners, checks the checkout again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. A review policy change, including model, reasoning effort, sandbox, service tier, prompt, or schema changes, also makes old reports due again. When more items are due than fit in a run, the planner prioritizes active items first, then policy-stale reports, then PRs, then new issues, then older weekly reviews. The dashboard reports local cadence coverage for daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Transient GitHub API/network failures use shorter retries so long scans can survive connection resets or gateway errors. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

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

The workflow logs Codex in with `OPENAI_API_KEY`, then runs review shards without OpenAI, Codex, or GitHub token environment variables. Parent ClawSweeper code uses `OPENCLAW_GH_TOKEN` to gather target and related GitHub context before invoking Codex. `codex exec` uses the prepared login state, and the shard fails instead of writing fallback review markdown if Codex auth/output fails. It uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
