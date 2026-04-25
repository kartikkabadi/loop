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

Last dashboard update: Apr 25, 2026, 02:38 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 02:38 UTC

State: Review in progress

Planned 200 items across 40 shards. Capacity is 200 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24920593780](https://github.com/openclaw/clawsweeper/actions/runs/24920593780)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 10314 |
| Fresh reviewed issues in the last 7 days | 8439 |
| Proposed issue closes | 3753 (44.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6348 |
| Fresh reviewed PRs in the last 7 days | 5149 |
| Proposed PR closes | 1397 (27.1% of reviewed PRs) |
| Open items total | 16662 |
| Reviewed files | 13588 |
| Archived closed files | 2239 |
| Fresh verified reviews in the last 7 days | 13588 |
| Proposed closes awaiting apply | 5150 (37.9% of fresh reviews) |
| Closed by Codex apply | 1483 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 3074 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#65523](https://github.com/openclaw/openclaw/issues/65523) | [Feature]: Auto-purge soft-deleted session files (.deleted.*) after configurable retention period | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65523.md) | complete | Apr 25, 2026, 02:36 UTC |
| [#65493](https://github.com/openclaw/openclaw/issues/65493) | Bug: delivery-mirror duplicates messages sent via message(action=send) tool | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65493.md) | complete | Apr 25, 2026, 02:35 UTC |
| [#65519](https://github.com/openclaw/openclaw/issues/65519) | sessions_spawn model override silently ignored — sub-agents always use primary model | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65519.md) | complete | Apr 25, 2026, 02:35 UTC |
| [#65499](https://github.com/openclaw/openclaw/issues/65499) | [Bug]: --force-reset-cross-signing sends malformed UIA response to device_signing/upload | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65499.md) | complete | Apr 25, 2026, 02:35 UTC |
| [#65486](https://github.com/openclaw/openclaw/issues/65486) | [Bug]: Gateway restart does not invalidate approval-pending session tool results - stale approval IDs cause INVALID_REQUEST loop on resume | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65486.md) | complete | Apr 25, 2026, 02:35 UTC |
| [#65468](https://github.com/openclaw/openclaw/issues/65468) | [Bug] MEDIA: directive delivers audio attachment twice on Telegram (duplicate voice notes) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65468.md) | complete | Apr 25, 2026, 02:35 UTC |
| [#65497](https://github.com/openclaw/openclaw/pull/65497) | fix: reuse gateway provider registry in worker sessions (#62051) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65497.md) | complete | Apr 25, 2026, 02:35 UTC |
| [#65498](https://github.com/openclaw/openclaw/issues/65498) | [Bug]: Main-session user task can lose final reply after heartbeat or exec-completion interrupt | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65498.md) | complete | Apr 25, 2026, 02:35 UTC |
| [#65470](https://github.com/openclaw/openclaw/issues/65470) | Bug: CommandLane.Nested maxConcurrent defaults to 1, serializing all sessions_send agent runs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65470.md) | complete | Apr 25, 2026, 02:35 UTC |
| [#65490](https://github.com/openclaw/openclaw/issues/65490) | Running an OpenClaw agent in production: the execution discipline gap | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65490.md) | complete | Apr 25, 2026, 02:35 UTC |
| [#65502](https://github.com/openclaw/openclaw/issues/65502) | feat(agents): resilient model fallback with retry + context-aware safe mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65502.md) | complete | Apr 25, 2026, 02:35 UTC |
| [#65466](https://github.com/openclaw/openclaw/issues/65466) | openclaw capability image describe returns empty across all providers | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65466.md) | complete | Apr 25, 2026, 02:34 UTC |
| [#65475](https://github.com/openclaw/openclaw/issues/65475) | Google Lyria music generation returns 404: baseUrl double-includes /v1beta API version | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65475.md) | complete | Apr 25, 2026, 02:34 UTC |
| [#65494](https://github.com/openclaw/openclaw/issues/65494) | iMessage channel fails with ReferenceError: accountInfo is not defined | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65494.md) | complete | Apr 25, 2026, 02:34 UTC |
| [#65480](https://github.com/openclaw/openclaw/issues/65480) | QMD regression: collection patterns fall back to **/*.md because qmd-manager prefers --glob over --mask | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65480.md) | complete | Apr 25, 2026, 02:34 UTC |
| [#65488](https://github.com/openclaw/openclaw/issues/65488) | [Bug]: Issue with context with Heartbeat turns | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65488.md) | complete | Apr 25, 2026, 02:34 UTC |
| [#65479](https://github.com/openclaw/openclaw/issues/65479) | Feishu channel: footer and threadSession config fields removed in v3.28+ causing validation errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65479.md) | complete | Apr 25, 2026, 02:34 UTC |
| [#65504](https://github.com/openclaw/openclaw/issues/65504) | Live gateway false Anthropic timeouts and responsiveness degradation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65504.md) | complete | Apr 25, 2026, 02:34 UTC |
| [#65474](https://github.com/openclaw/openclaw/issues/65474) | Feature Request: Skills Index Mode - Reduce system prompt Token usage | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65474.md) | complete | Apr 25, 2026, 02:34 UTC |
| [#65507](https://github.com/openclaw/openclaw/issues/65507) | LCM hot-path scheduling and post-turn latency amplify live gateway timeouts | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65507.md) | complete | Apr 25, 2026, 02:34 UTC |

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
