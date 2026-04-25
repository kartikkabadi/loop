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

Last dashboard update: Apr 25, 2026, 05:44 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 05:44 UTC

State: Review publish complete

Merged review artifacts for run 24923660131. Dashboard reflects the latest files and proposed closes from completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24923660131](https://github.com/openclaw/clawsweeper/actions/runs/24923660131)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 9245 |
| Fresh reviewed issues in the last 7 days | 8877 |
| Proposed issue closes | 3511 (39.6% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6186 |
| Fresh reviewed PRs in the last 7 days | 6009 |
| Proposed PR closes | 1557 (25.9% of reviewed PRs) |
| Open items total | 15431 |
| Reviewed files | 14886 |
| Archived closed files | 3167 |
| Fresh verified reviews in the last 7 days | 14886 |
| Proposed closes awaiting apply | 5068 (34% of fresh reviews) |
| Closed by Codex apply | 2383 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 545 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#69328](https://github.com/openclaw/openclaw/pull/69328) | fix(acp): avoid false zero-diff failures and append session messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69328.md) | complete | Apr 25, 2026, 05:44 UTC |
| [#69323](https://github.com/openclaw/openclaw/pull/69323) | feat: add per-agent TTS configuration override support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69323.md) | complete | Apr 25, 2026, 05:43 UTC |
| [#69366](https://github.com/openclaw/openclaw/pull/69366) | fix(ui): hide async exec system events and heartbeat acks from chat transcript | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69366.md) | complete | Apr 25, 2026, 05:43 UTC |
| [#69344](https://github.com/openclaw/openclaw/pull/69344) | fix(tui): increase token chunking limit and preserve code-like fragments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69344.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#69340](https://github.com/openclaw/openclaw/pull/69340) | fix(tui): preserve hyphen-separated tokens from line-wrap splitting | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69340.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#69337](https://github.com/openclaw/openclaw/pull/69337) | fix(tui): show commentary-phase text when no final_answer blocks present | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69337.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#40919](https://github.com/openclaw/openclaw/issues/40919) | [Bug]: Performance degradation in session memory sync: full delete-reinsert pattern for growing JSONL files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40919.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#69355](https://github.com/openclaw/openclaw/pull/69355) | feat(doctor): detect local rebuild vs pristine npm release | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69355.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#40802](https://github.com/openclaw/openclaw/issues/40802) | [Bug]: Feishu channel cannot send replies after upgrading to 3.7 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40802.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#69385](https://github.com/openclaw/openclaw/pull/69385) | Extensions: add aj-router plugin for classifier-driven model selection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69385.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#69319](https://github.com/openclaw/openclaw/pull/69319) | gateway: register skills.uninstall RPC (mirror of skills.install) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69319.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#40934](https://github.com/openclaw/openclaw/issues/40934) | SECURITY: Malicious skill 'openclaw-email-bypass' in community skills repo — covert email backdoor | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40934.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#69356](https://github.com/openclaw/openclaw/pull/69356) | fix(tasks): clamp createdAt to startedAt on task creation (#69229) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69356.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#40894](https://github.com/openclaw/openclaw/pull/40894) | Codex/fix 40880 media staging max bytes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40894.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#69318](https://github.com/openclaw/openclaw/pull/69318) | github-copilot: expand default model list with Opus 4.7, 4.5, Haiku 4.5, Gemini 2.5 Pro | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69318.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#40814](https://github.com/openclaw/openclaw/pull/40814) | fix(telegram): accept @bot suffix in inline directives | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40814.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#40899](https://github.com/openclaw/openclaw/pull/40899) | fix(discord): suppress leaked tool transcript blocks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40899.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#40806](https://github.com/openclaw/openclaw/issues/40806) | [Bug]: Agent tool calls (exec, cron) are isolated and don't affect real filesystem | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40806.md) | complete | Apr 25, 2026, 05:42 UTC |
| [#40871](https://github.com/openclaw/openclaw/pull/40871) | fix: include reset archive transcripts in usage/cost calculations | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40871.md) | complete | Apr 25, 2026, 05:41 UTC |
| [#69305](https://github.com/openclaw/openclaw/pull/69305) | CLI: complete positional args in zsh completion | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69305.md) | complete | Apr 25, 2026, 05:41 UTC |

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
