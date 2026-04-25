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

Last dashboard update: Apr 25, 2026, 06:08 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 06:08 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24924317270](https://github.com/openclaw/clawsweeper/actions/runs/24924317270)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 9030 |
| Fresh reviewed issues in the last 7 days | 8670 |
| Proposed issue closes | 3300 (38.1% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6171 |
| Fresh reviewed PRs in the last 7 days | 6385 |
| Proposed PR closes | 1594 (25% of reviewed PRs) |
| Open items total | 15201 |
| Reviewed files | 15055 |
| Archived closed files | 3374 |
| Fresh verified reviews in the last 7 days | 15055 |
| Proposed closes awaiting apply | 4894 (32.5% of fresh reviews) |
| Closed by Codex apply | 2583 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 146 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#6457](https://github.com/openclaw/openclaw/pull/6457) | fix(telegram): register commands for group scope + preserve topic thread params | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/6457.md) | complete | Apr 25, 2026, 06:07 UTC |
| [#26700](https://github.com/openclaw/openclaw/pull/26700) | fix(security): strip leaked external untrusted-content wrappers from user-facing replies | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/26700.md) | complete | Apr 25, 2026, 06:06 UTC |
| [#71399](https://github.com/openclaw/openclaw/pull/71399) | feat(hooks): add agent:turn:end internal hook event | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71399.md) | complete | Apr 25, 2026, 06:06 UTC |
| [#18915](https://github.com/openclaw/openclaw/pull/18915) | fix(telegram): pass video width/height to sendVideo to prevent portra… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18915.md) | complete | Apr 25, 2026, 06:06 UTC |
| [#28183](https://github.com/openclaw/openclaw/pull/28183) | feat: add Avian as a named LLM provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/28183.md) | complete | Apr 25, 2026, 06:06 UTC |
| [#71394](https://github.com/openclaw/openclaw/pull/71394) | fix(telegram): use session model for /think menu choices | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71394.md) | complete | Apr 25, 2026, 06:06 UTC |
| [#71196](https://github.com/openclaw/openclaw/pull/71196) | refactor: keep runtime plan type contracts leaf-safe | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71196.md) | complete | Apr 25, 2026, 06:06 UTC |
| [#71324](https://github.com/openclaw/openclaw/pull/71324) | fix(webchat): hide legacy runtime transcript wrappers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71324.md) | complete | Apr 25, 2026, 06:06 UTC |
| [#71396](https://github.com/openclaw/openclaw/pull/71396) | fix(feishu): stop automatic mention cascades | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71396.md) | complete | Apr 25, 2026, 06:05 UTC |
| [#71327](https://github.com/openclaw/openclaw/pull/71327) | fix(line): require explicit wildcard for open DMs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71327.md) | complete | Apr 25, 2026, 06:05 UTC |
| [#19362](https://github.com/openclaw/openclaw/pull/19362) | feat(discord): clean up sessions when channel is deleted | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/19362.md) | complete | Apr 25, 2026, 06:05 UTC |
| [#25789](https://github.com/openclaw/openclaw/pull/25789) | tools(exec): add configurable approval timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/25789.md) | complete | Apr 25, 2026, 06:05 UTC |
| [#71332](https://github.com/openclaw/openclaw/pull/71332) | fix(models): reflect Claude CLI auth status | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71332.md) | complete | Apr 25, 2026, 06:05 UTC |
| [#27771](https://github.com/openclaw/openclaw/pull/27771) | ability to set config path for signal-cli | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/27771.md) | complete | Apr 25, 2026, 06:05 UTC |
| [#23096](https://github.com/openclaw/openclaw/pull/23096) | feat(secrets): add Bitwarden/Vaultwarden secret provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/23096.md) | complete | Apr 25, 2026, 06:05 UTC |
| [#21290](https://github.com/openclaw/openclaw/pull/21290) | feat(diagnostics-otel): OpenTelemetry diagnostics with GenAI semantic conventions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/21290.md) | complete | Apr 25, 2026, 06:05 UTC |
| [#71384](https://github.com/openclaw/openclaw/pull/71384) | fix(discord): use CJK-aware break-point fallback in splitLongLine | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71384.md) | complete | Apr 25, 2026, 06:05 UTC |
| [#71391](https://github.com/openclaw/openclaw/pull/71391) | fix: suppress silent cron exec completion noise | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71391.md) | complete | Apr 25, 2026, 06:05 UTC |
| [#16251](https://github.com/openclaw/openclaw/pull/16251) | docs: remove note about personal single-user access from trusted proxy auth guidance | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/16251.md) | complete | Apr 25, 2026, 06:05 UTC |
| [#17098](https://github.com/openclaw/openclaw/pull/17098) | docs: add xCloud hosting guide | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/17098.md) | complete | Apr 25, 2026, 06:05 UTC |

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
