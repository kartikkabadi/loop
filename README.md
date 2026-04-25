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

Last dashboard update: Apr 25, 2026, 07:16 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 07:16 UTC

State: Review in progress

Planned 200 items across 40 shards. Capacity is 200 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24925476754](https://github.com/openclaw/clawsweeper/actions/runs/24925476754)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 8848 |
| Fresh reviewed issues in the last 7 days | 8562 |
| Proposed issue closes | 3193 (37.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5917 |
| Fresh reviewed PRs in the last 7 days | 6226 |
| Proposed PR closes | 1457 (23.4% of reviewed PRs) |
| Open items total | 14765 |
| Reviewed files | 14788 |
| Archived closed files | 3650 |
| Fresh verified reviews in the last 7 days | 14788 |
| Proposed closes awaiting apply | 4650 (31.4% of fresh reviews) |
| Closed by Codex apply | 2812 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 0 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#42853](https://github.com/openclaw/openclaw/pull/42853) | feat(daemon): auto-detect Node.js heap limit; add gateway.nodeMaxOldSpaceMb config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42853.md) | complete | Apr 25, 2026, 07:13 UTC |
| [#42895](https://github.com/openclaw/openclaw/pull/42895) | fix(infra): derive home directory from PREFIX on Android/Termux | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42895.md) | complete | Apr 25, 2026, 07:13 UTC |
| [#42995](https://github.com/openclaw/openclaw/pull/42995) | feat: cross-channel memory sharing for unified agent experience | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42995.md) | complete | Apr 25, 2026, 07:13 UTC |
| [#42925](https://github.com/openclaw/openclaw/pull/42925) | fix(gateway): bootstrap macOS LaunchAgent when gateway start sees not-loaded service | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42925.md) | complete | Apr 25, 2026, 07:13 UTC |
| [#42927](https://github.com/openclaw/openclaw/pull/42927) | fix(discord): add @snazzah/davey dependency for DAVE encryption | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42927.md) | complete | Apr 25, 2026, 07:13 UTC |
| [#42976](https://github.com/openclaw/openclaw/pull/42976) | Fix regex safety and enhance session log redaction | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42976.md) | complete | Apr 25, 2026, 07:13 UTC |
| [#42894](https://github.com/openclaw/openclaw/pull/42894) | fix(auth): add bailian provider to env API key candidates | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42894.md) | complete | Apr 25, 2026, 07:13 UTC |
| [#42770](https://github.com/openclaw/openclaw/pull/42770) | Canvas: add baseline security headers | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42770.md) | complete | Apr 25, 2026, 07:13 UTC |
| [#42921](https://github.com/openclaw/openclaw/pull/42921) | fix(cron): respect OPENCLAW_STATE_DIR for cron store path at runtime | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42921.md) | complete | Apr 25, 2026, 07:12 UTC |
| [#42933](https://github.com/openclaw/openclaw/pull/42933) | feat: session-level circuit breaker (pause after N consecutive model errors) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42933.md) | complete | Apr 25, 2026, 07:12 UTC |
| [#42590](https://github.com/openclaw/openclaw/pull/42590) | Fix/nodes run timeout propagation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42590.md) | complete | Apr 25, 2026, 07:12 UTC |
| [#42728](https://github.com/openclaw/openclaw/pull/42728) | fix(feishu): apply dedup check to single-entry flush path (#42681) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42728.md) | complete | Apr 25, 2026, 07:12 UTC |
| [#42772](https://github.com/openclaw/openclaw/pull/42772) | UI: Fix WebChat real-time message refresh by supporting sessionKey alias matching | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42772.md) | complete | Apr 25, 2026, 07:12 UTC |
| [#42978](https://github.com/openclaw/openclaw/pull/42978) | fix(auth): add bailian to PROVIDER_ENV_API_KEY_CANDIDATES | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42978.md) | complete | Apr 25, 2026, 07:12 UTC |
| [#42962](https://github.com/openclaw/openclaw/pull/42962) | fix(agents): suppress gateway schema lookup warning noise | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42962.md) | complete | Apr 25, 2026, 07:12 UTC |
| [#42810](https://github.com/openclaw/openclaw/pull/42810) | feat(acp): add audit logging system for control plane security | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42810.md) | complete | Apr 25, 2026, 07:12 UTC |
| [#42961](https://github.com/openclaw/openclaw/pull/42961) | Respect cacheRetention for OpenRouter Anthropic models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42961.md) | complete | Apr 25, 2026, 07:12 UTC |
| [#42904](https://github.com/openclaw/openclaw/pull/42904) | fix(logs): find active log file across date boundaries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42904.md) | complete | Apr 25, 2026, 07:12 UTC |
| [#42677](https://github.com/openclaw/openclaw/pull/42677) | Keep bundled session-memory behavior consistent across automatic session rollover | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42677.md) | complete | Apr 25, 2026, 07:12 UTC |
| [#42898](https://github.com/openclaw/openclaw/pull/42898) | fix(agents): classify compound read-only gateway actions correctly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42898.md) | complete | Apr 25, 2026, 07:12 UTC |

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

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. When more items are due than fit in a run, the planner prioritizes active items first, then PRs, then new issues, then older weekly reviews.

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
