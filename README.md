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

Last dashboard update: Apr 25, 2026, 05:03 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 05:03 UTC

State: Apply in progress

Checkpoint 7 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 350/500. Result records in checkpoint: 51.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24920756833](https://github.com/openclaw/clawsweeper/actions/runs/24920756833)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 9441 |
| Fresh reviewed issues in the last 7 days | 8902 |
| Proposed issue closes | 3571 (40.1% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6220 |
| Fresh reviewed PRs in the last 7 days | 5913 |
| Proposed PR closes | 1518 (25.7% of reviewed PRs) |
| Open items total | 15661 |
| Reviewed files | 14815 |
| Archived closed files | 3012 |
| Fresh verified reviews in the last 7 days | 14815 |
| Proposed closes awaiting apply | 5089 (34.4% of fresh reviews) |
| Closed by Codex apply | 2233 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 846 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#68938](https://github.com/openclaw/openclaw/issues/68938) | Web UI: Voice input button fails + image upload broken (2026.4.15) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68938.md) | complete | Apr 25, 2026, 04:55 UTC |
| [#68977](https://github.com/openclaw/openclaw/issues/68977) | [Enhancement] Add scoped idempotency key support to enqueueSystemEvent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68977.md) | complete | Apr 25, 2026, 04:54 UTC |
| [#68969](https://github.com/openclaw/openclaw/issues/68969) | [Bug]:[WSL] The CPU usage of OpenClaw's gateway process spikes to 100%. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68969.md) | complete | Apr 25, 2026, 04:54 UTC |
| [#68993](https://github.com/openclaw/openclaw/pull/68993) | fix: handle partial DmChannel in slash command dispatch | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68993.md) | complete | Apr 25, 2026, 04:54 UTC |
| [#68931](https://github.com/openclaw/openclaw/issues/68931) | [Bug]: Webchat user messages disappear due to race condition between chat history reload and transcript persistence | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68931.md) | complete | Apr 25, 2026, 04:53 UTC |
| [#68950](https://github.com/openclaw/openclaw/issues/68950) | OAuth users cannot enable memory-lancedb auto-recall/capture without separate OPENAI_API_KEY | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68950.md) | complete | Apr 25, 2026, 04:53 UTC |
| [#68944](https://github.com/openclaw/openclaw/issues/68944) | CLI commands hang at WebSocket gateway handshake (OpenClaw 2026.4.15) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68944.md) | complete | Apr 25, 2026, 04:53 UTC |
| [#68966](https://github.com/openclaw/openclaw/issues/68966) | [Bug]: [WSL] openclaw browser command terminated by SIGKILL causing timeout | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68966.md) | complete | Apr 25, 2026, 04:53 UTC |
| [#68981](https://github.com/openclaw/openclaw/issues/68981) | [Enhancement] Session Management: Human-readable names, auto-cleanup, and grouped Control UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68981.md) | complete | Apr 25, 2026, 04:53 UTC |
| [#68980](https://github.com/openclaw/openclaw/issues/68980) | [Bug]: exec command triggers spawn taskkill ENOENT and crashes gateway | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68980.md) | complete | Apr 25, 2026, 04:53 UTC |
| [#68965](https://github.com/openclaw/openclaw/issues/68965) | Bug: models.mode: replace does not exclude implicit providers from bundled plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68965.md) | complete | Apr 25, 2026, 04:53 UTC |
| [#68992](https://github.com/openclaw/openclaw/issues/68992) | [Bug]: Control UI renders async exec system events in the visible chat transcript | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68992.md) | complete | Apr 25, 2026, 04:53 UTC |
| [#68979](https://github.com/openclaw/openclaw/issues/68979) | lobster embedded runner cannot reach llm-task tool | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68979.md) | complete | Apr 25, 2026, 04:53 UTC |
| [#68854](https://github.com/openclaw/openclaw/pull/68854) | fix(security): allow quoted heredocs in allowlist mode without extra approval | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68854.md) | complete | Apr 25, 2026, 04:53 UTC |
| [#68906](https://github.com/openclaw/openclaw/pull/68906) | fix(media): avoid double-prefixing qualified image models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68906.md) | complete | Apr 25, 2026, 04:52 UTC |
| [#68945](https://github.com/openclaw/openclaw/issues/68945) | [Bug]: Telegram: humanDelay is not applied between streamed block replies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68945.md) | complete | Apr 25, 2026, 04:52 UTC |
| [#68895](https://github.com/openclaw/openclaw/issues/68895) | [Bug] Bailian provider image model lookup fails due to double provider prefix | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68895.md) | complete | Apr 25, 2026, 04:52 UTC |
| [#68868](https://github.com/openclaw/openclaw/issues/68868) | fix(context-overflow-diag): jinja template \"No user query\" errors are misclassified as context overflow | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68868.md) | complete | Apr 25, 2026, 04:52 UTC |
| [#68929](https://github.com/openclaw/openclaw/issues/68929) | Feature: user interrupt during streaming / tool execution | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68929.md) | complete | Apr 25, 2026, 04:52 UTC |
| [#68936](https://github.com/openclaw/openclaw/pull/68936) | Autofix: add PR review autofix pipeline + Windows daemon | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68936.md) | complete | Apr 25, 2026, 04:52 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that selects the next open items once, starting from `#1`, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.4`, medium reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, checks it again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically.

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
