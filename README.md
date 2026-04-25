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

Last dashboard update: Apr 25, 2026, 07:01 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 07:01 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24925241718](https://github.com/openclaw/clawsweeper/actions/runs/24925241718)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 8858 |
| Fresh reviewed issues in the last 7 days | 8563 |
| Proposed issue closes | 3194 (37.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6045 |
| Fresh reviewed PRs in the last 7 days | 6314 |
| Proposed PR closes | 1532 (24.3% of reviewed PRs) |
| Open items total | 14903 |
| Reviewed files | 14877 |
| Archived closed files | 3561 |
| Fresh verified reviews in the last 7 days | 14877 |
| Proposed closes awaiting apply | 4726 (31.8% of fresh reviews) |
| Closed by Codex apply | 2757 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 26 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#41983](https://github.com/openclaw/openclaw/pull/41983) | fix(gateway): isolate control-plane write rate limits by connection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41983.md) | complete | Apr 25, 2026, 07:00 UTC |
| [#42022](https://github.com/openclaw/openclaw/pull/42022) | Fix Codex OAuth proxy dispatcher handling | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42022.md) | complete | Apr 25, 2026, 07:00 UTC |
| [#41866](https://github.com/openclaw/openclaw/pull/41866) | fix(agents): strip leaked to=... JSON tool-call prefixes in user-faci… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41866.md) | complete | Apr 25, 2026, 07:00 UTC |
| [#41854](https://github.com/openclaw/openclaw/pull/41854) | feat: add groq provider support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41854.md) | complete | Apr 25, 2026, 07:00 UTC |
| [#42027](https://github.com/openclaw/openclaw/pull/42027) | fix: resolve exec PATH fallback, layered browser diagnostics, and cron force-run deadlock | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42027.md) | complete | Apr 25, 2026, 06:59 UTC |
| [#41964](https://github.com/openclaw/openclaw/pull/41964) | fix(tui): render external-channel session messages live | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41964.md) | complete | Apr 25, 2026, 06:59 UTC |
| [#41834](https://github.com/openclaw/openclaw/pull/41834) | feat: add Mistral as web_search provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41834.md) | complete | Apr 25, 2026, 06:59 UTC |
| [#41864](https://github.com/openclaw/openclaw/pull/41864) | feat: add generative-hmi-custom-ui skill | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41864.md) | complete | Apr 25, 2026, 06:59 UTC |
| [#41943](https://github.com/openclaw/openclaw/pull/41943) | fix(feishu): add HTTPS_PROXY support for Axios HTTP requests | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41943.md) | complete | Apr 25, 2026, 06:59 UTC |
| [#41929](https://github.com/openclaw/openclaw/pull/41929) | test(doctor): cover multi-account Telegram tokenFile summary | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41929.md) | complete | Apr 25, 2026, 06:59 UTC |
| [#41936](https://github.com/openclaw/openclaw/pull/41936) | feat(models): support provider connect timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41936.md) | complete | Apr 25, 2026, 06:59 UTC |
| [#41892](https://github.com/openclaw/openclaw/pull/41892) | feat(control-ui): add cron calendar timeline view | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41892.md) | complete | Apr 25, 2026, 06:58 UTC |
| [#41941](https://github.com/openclaw/openclaw/pull/41941) | fix(gateway):TUI Model Display Not Updating After session_status Switch | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41941.md) | complete | Apr 25, 2026, 06:58 UTC |
| [#41810](https://github.com/openclaw/openclaw/pull/41810) | feat: add configurable FTS5 tokenizer for CJK text support | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41810.md) | complete | Apr 25, 2026, 06:58 UTC |
| [#41897](https://github.com/openclaw/openclaw/pull/41897) | fix(web-fetch): cap error detail for access-denied responses (401/403/407/451) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41897.md) | complete | Apr 25, 2026, 06:58 UTC |
| [#41816](https://github.com/openclaw/openclaw/pull/41816) | plugins: preserve config includes on install writes | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41816.md) | complete | Apr 25, 2026, 06:58 UTC |
| [#41809](https://github.com/openclaw/openclaw/pull/41809) | feat(config): add agents.defaults.reasoningDefault config key | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41809.md) | complete | Apr 25, 2026, 06:58 UTC |
| [#41956](https://github.com/openclaw/openclaw/pull/41956) | fix(telegram): split watchdog stability fixes from #41883 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41956.md) | complete | Apr 25, 2026, 06:58 UTC |
| [#41803](https://github.com/openclaw/openclaw/pull/41803) | fix(agents): suppress unrecognized errors from user surface | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41803.md) | complete | Apr 25, 2026, 06:58 UTC |
| [#41565](https://github.com/openclaw/openclaw/pull/41565) | feat(cards): add shared adaptive card rendering for all channels | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41565.md) | complete | Apr 25, 2026, 06:58 UTC |

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
