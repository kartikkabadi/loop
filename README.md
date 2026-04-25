# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per open item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 25, 2026, 08:05 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 08:05 UTC

State: Apply finished

Apply run finished with 500 fresh closes out of requested limit 500. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24924985336](https://github.com/openclaw/clawsweeper/actions/runs/24924985336)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 8817 |
| Fresh reviewed issues in the last 7 days | 8755 |
| Proposed issue closes | 3265 (37.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5655 |
| Fresh reviewed PRs in the last 7 days | 5873 |
| Proposed PR closes | 1118 (19% of reviewed PRs) |
| Open items total | 14472 |
| Reviewed files | 14628 |
| Archived closed files | 4008 |
| Fresh verified reviews in the last 7 days | 14628 |
| Proposed closes awaiting apply | 4383 (30% of fresh reviews) |
| Closed by Codex apply | 3107 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 0 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#69790](https://github.com/openclaw/openclaw/issues/69790) | Telegram inbound can fail with persistent session write lock on existing DM session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69790.md) | complete | Apr 25, 2026, 07:56 UTC |
| [#69829](https://github.com/openclaw/openclaw/issues/69829) | Tool-heavy agent sessions can enter failure cascades before compaction/recovery kicks in | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69829.md) | complete | Apr 25, 2026, 07:56 UTC |
| [#69777](https://github.com/openclaw/openclaw/issues/69777) | [Bug]: Assistant returns audio replies instead of text in dashboard without user request | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69777.md) | complete | Apr 25, 2026, 07:56 UTC |
| [#69776](https://github.com/openclaw/openclaw/issues/69776) | Support multi-file config loading (base + local overlay) for cross-machine setups | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69776.md) | complete | Apr 25, 2026, 07:56 UTC |
| [#69865](https://github.com/openclaw/openclaw/issues/69865) | [Ballast] Draft 'How We Vet' page — customer-facing vetting rubric | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69865.md) | complete | Apr 25, 2026, 07:56 UTC |
| [#69889](https://github.com/openclaw/openclaw/issues/69889) | Cron runs record status=ok when model returns empty content + errorMessage (should be status=error) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69889.md) | complete | Apr 25, 2026, 07:55 UTC |
| [#69807](https://github.com/openclaw/openclaw/issues/69807) | [Meta] `message_sending` plugin hook does not fire on Telegram agent-reply path in 2026.4.15 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69807.md) | complete | Apr 25, 2026, 07:55 UTC |
| [#69843](https://github.com/openclaw/openclaw/issues/69843) | Internal thinking tags (<think>) are leaked to user | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69843.md) | complete | Apr 25, 2026, 07:55 UTC |
| [#69805](https://github.com/openclaw/openclaw/issues/69805) | [Bug] openclaw status/cron list hangs with SIGKILL on Windows (Node v22+) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69805.md) | complete | Apr 25, 2026, 07:55 UTC |
| [#69856](https://github.com/openclaw/openclaw/issues/69856) | Add threadId support to /hooks/agent endpoint | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69856.md) | complete | Apr 25, 2026, 07:55 UTC |
| [#69892](https://github.com/openclaw/openclaw/issues/69892) | Active Memory sub-agent receives all tools instead of toolsAllow filter (toolsAllow not forwarded in runEmbeddedPiAgent) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69892.md) | complete | Apr 25, 2026, 07:55 UTC |
| [#69809](https://github.com/openclaw/openclaw/issues/69809) | Telegram status reaction ends on error emoji (😱) despite successful message delivery — Codex OAuth | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69809.md) | complete | Apr 25, 2026, 07:55 UTC |
| [#69804](https://github.com/openclaw/openclaw/issues/69804) | Sidecar plugin config inheritance: warnWhenAllowlistIsOpen fires before config normalization completes, causing ~106s delay on every restart | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69804.md) | complete | Apr 25, 2026, 07:55 UTC |
| [#69808](https://github.com/openclaw/openclaw/issues/69808) | Telegram image attachments stored but not passed to LLM as vision input | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69808.md) | complete | Apr 25, 2026, 07:55 UTC |
| [#69871](https://github.com/openclaw/openclaw/issues/69871) | [Bug] Image tool uses openai-completions instead of provider-zai-endpoint, causing 404 on zai VL models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69871.md) | complete | Apr 25, 2026, 07:54 UTC |
| [#69739](https://github.com/openclaw/openclaw/issues/69739) | Agent lane task fails with ENOENT: mkdir '/home/node' on macOS | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69739.md) | complete | Apr 25, 2026, 07:54 UTC |
| [#69849](https://github.com/openclaw/openclaw/issues/69849) | ACP SDK: Missing default values for optional array parameters cause Claude tool schema validation to fail | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69849.md) | complete | Apr 25, 2026, 07:54 UTC |
| [#69768](https://github.com/openclaw/openclaw/issues/69768) | gemini-2.5-flash rejects cron tool payloads with HTTP 400 no-body since ~2026-04-15 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69768.md) | complete | Apr 25, 2026, 07:54 UTC |
| [#69755](https://github.com/openclaw/openclaw/issues/69755) | Post-restart suggestion to run `openclaw doctor --non-interactive` is not always actionable in heartbeat / approval-constrained contexts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69755.md) | complete | Apr 25, 2026, 07:54 UTC |
| [#69640](https://github.com/openclaw/openclaw/issues/69640) | [Bug]: Notion skill available in Dashboard runtime but unavailable in Telegram runtime (“skill bridge isn’t active”) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69640.md) | complete | Apr 25, 2026, 07:54 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.4`, medium reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, checks it again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. When more items are due than fit in a run, the planner prioritizes active items first, then PRs, then new issues, then older weekly reviews. The dashboard reports local cadence coverage for daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 40 --max-pages 250 --codex-model gpt-5.4 --codex-reasoning-effort medium --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.4 --codex-reasoning-effort medium --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20
```

Manual review runs can set `--apply-closures` or workflow input `apply_closures=true`, but the safer path is proposal first, then `apply_existing=true`.

## Checks

```bash
npm run check
npm run oxformat
```

`oxformat` is an alias for `oxfmt`; there is no separate `oxformat` npm package.

## GitHub Actions Setup

Required secrets:

- `OPENAI_API_KEY`: OpenAI API key used by Codex.
- `CODEX_API_KEY`: same API key for `codex exec` CI auth.
- `OPENCLAW_GH_TOKEN`: GitHub token with write access to `openclaw/openclaw` issues and PRs.

The workflow logs Codex in with `OPENAI_API_KEY`, passes `CODEX_API_KEY` to `codex exec`, and fails the shard instead of writing fallback review markdown if Codex auth/output fails. It uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
