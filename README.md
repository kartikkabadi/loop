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

Last dashboard update: Apr 25, 2026, 03:21 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 03:21 UTC

State: Review in progress

Planned 200 items across 40 shards. Capacity is 200 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24921373016](https://github.com/openclaw/clawsweeper/actions/runs/24921373016)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 10080 |
| Fresh reviewed issues in the last 7 days | 8678 |
| Proposed issue closes | 3807 (43.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6329 |
| Fresh reviewed PRs in the last 7 days | 5358 |
| Proposed PR closes | 1437 (26.8% of reviewed PRs) |
| Open items total | 16409 |
| Reviewed files | 14036 |
| Archived closed files | 2391 |
| Fresh verified reviews in the last 7 days | 14036 |
| Proposed closes awaiting apply | 5244 (37.4% of fresh reviews) |
| Closed by Codex apply | 1633 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 2373 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#66580](https://github.com/openclaw/openclaw/pull/66580) | fix(heartbeat): relay exec payload in prompts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66580.md) | complete | Apr 25, 2026, 03:19 UTC |
| [#66552](https://github.com/openclaw/openclaw/pull/66552) | fix: recover reasoning-only Ollama turns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66552.md) | complete | Apr 25, 2026, 03:18 UTC |
| [#66543](https://github.com/openclaw/openclaw/pull/66543) | fix(cron): strip internal whitespace from model IDs in cron job normalization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66543.md) | complete | Apr 25, 2026, 03:18 UTC |
| [#66544](https://github.com/openclaw/openclaw/pull/66544) | fix(gateway): exclude heartbeat sender ID from session display name | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66544.md) | complete | Apr 25, 2026, 03:18 UTC |
| [#66597](https://github.com/openclaw/openclaw/issues/66597) | [webchat] User message flickers after sending (v2026.4.12) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66597.md) | complete | Apr 25, 2026, 03:17 UTC |
| [#66496](https://github.com/openclaw/openclaw/issues/66496) | Heartbeat/cron system events arrive as role:user — model mistakes them for human messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66496.md) | complete | Apr 25, 2026, 03:17 UTC |
| [#66508](https://github.com/openclaw/openclaw/issues/66508) | Dream Diary: Timestamp tabs show red strikethrough on click | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66508.md) | complete | Apr 25, 2026, 03:17 UTC |
| [#66608](https://github.com/openclaw/openclaw/issues/66608) | Bug: Z.ai glm-4.6v vision model always aborts with 'Request was aborted' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66608.md) | complete | Apr 25, 2026, 03:16 UTC |
| [#66576](https://github.com/openclaw/openclaw/issues/66576) | [Feature]: Configurable workspace file inclusion/exclusion (bootstrapFiles) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66576.md) | complete | Apr 25, 2026, 03:16 UTC |
| [#66530](https://github.com/openclaw/openclaw/issues/66530) | [Feature]: Primary model should be probed for recovery after fallback due to timeout | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66530.md) | complete | Apr 25, 2026, 03:16 UTC |
| [#66577](https://github.com/openclaw/openclaw/issues/66577) | [Feature]:  Add optional hard context truncation mode that keeps only a fixed recent portion of max context | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66577.md) | complete | Apr 25, 2026, 03:16 UTC |
| [#66537](https://github.com/openclaw/openclaw/pull/66537) | Fix: Issue 66397 silent final answer loss | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66537.md) | complete | Apr 25, 2026, 03:16 UTC |
| [#66551](https://github.com/openclaw/openclaw/pull/66551) | fix(media): allow host-read text document fallback mimes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66551.md) | complete | Apr 25, 2026, 03:16 UTC |
| [#66523](https://github.com/openclaw/openclaw/issues/66523) | [Bug]:  OPENCLAW_STATE_DIR Environment Variable Ignored on Windows | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66523.md) | complete | Apr 25, 2026, 03:16 UTC |
| [#66558](https://github.com/openclaw/openclaw/issues/66558) | [Bug] sessions_spawn / sessions_send not available in main agent session despite tools.profile: \"coding\ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66558.md) | complete | Apr 25, 2026, 03:16 UTC |
| [#66486](https://github.com/openclaw/openclaw/issues/66486) | [Bug]: [Bug] image tool 报 Unknown model 当 本地模型 被设为 imageModel 而非主模型时 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66486.md) | complete | Apr 25, 2026, 03:16 UTC |
| [#66549](https://github.com/openclaw/openclaw/issues/66549) | [Bug]: openclaw message send --dry-run still delivers the message via gateway | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66549.md) | complete | Apr 25, 2026, 03:16 UTC |
| [#66546](https://github.com/openclaw/openclaw/pull/66546) | feat(sessions): add transcriptRotateBytes and transcriptMaxLines to cap .jsonl growth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66546.md) | complete | Apr 25, 2026, 03:16 UTC |
| [#66531](https://github.com/openclaw/openclaw/issues/66531) | [Feature]: Add agent.abort RPC to cancel embedded agent runs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66531.md) | complete | Apr 25, 2026, 03:16 UTC |
| [#66487](https://github.com/openclaw/openclaw/issues/66487) | Heartbeat exec-event prompt drops actual completion payload | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66487.md) | complete | Apr 25, 2026, 03:16 UTC |

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
