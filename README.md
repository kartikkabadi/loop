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

Last dashboard update: Apr 24, 2026, 17:20 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12517 |
| Fresh reviewed issues in the last 7 days | 7962 |
| Proposed issue closes | 4458 (56% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6614 |
| Fresh reviewed PRs in the last 7 days | 4165 |
| Proposed PR closes | 1311 (31.5% of reviewed PRs) |
| Open items total | 19131 |
| Reviewed files | 12127 |
| Archived closed files | 52 |
| Fresh verified reviews in the last 7 days | 12127 |
| Proposed closes awaiting apply | 5769 (47.6% of fresh reviews) |
| Closed by Codex apply | 40 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 7004 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#59099](https://github.com/openclaw/openclaw/issues/59099) | [Bug]: Too many arguments error when running openclaw browser extension install/path | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59099.md) | complete | Apr 24, 2026, 17:14 UTC |
| [#59102](https://github.com/openclaw/openclaw/issues/59102) | [Design Feedback] Exec approval UX breaks Telegram mobile-first experience | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59102.md) | complete | Apr 24, 2026, 17:13 UTC |
| [#59020](https://github.com/openclaw/openclaw/pull/59020) | fix(cron): persist fresh isolated session transcript file | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59020.md) | complete | Apr 24, 2026, 17:12 UTC |
| [#58957](https://github.com/openclaw/openclaw/issues/58957) | Model switch can fail silently when carried-over session context is too large | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58957.md) | complete | Apr 24, 2026, 17:11 UTC |
| [#59076](https://github.com/openclaw/openclaw/issues/59076) | JSON parse error leaked to Discord when streaming tool calls with long CJK text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59076.md) | complete | Apr 24, 2026, 17:11 UTC |
| [#59064](https://github.com/openclaw/openclaw/issues/59064) | Bug: Silent failure and fallback override when OpenAI usage limit (429) is hit | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59064.md) | complete | Apr 24, 2026, 17:10 UTC |
| [#59104](https://github.com/openclaw/openclaw/issues/59104) | Inbound image processing hangs silently in WSL2 due to GNOME Keyring blocking | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59104.md) | complete | Apr 24, 2026, 17:10 UTC |
| [#59024](https://github.com/openclaw/openclaw/issues/59024) | [Bug]: FailoverError — CLI timeout after 600s with no output, failover never triggers, TUI/webchat unresponsive | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59024.md) | complete | Apr 24, 2026, 17:10 UTC |
| [#59095](https://github.com/openclaw/openclaw/issues/59095) | [Proposal] Built-in Adaptive Memory: hierarchical memory management as a core feature | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59095.md) | complete | Apr 24, 2026, 17:10 UTC |
| [#59073](https://github.com/openclaw/openclaw/issues/59073) | memory_search falls back because qmd managed collection memory-alt-main is missing and repair does not recreate it | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59073.md) | complete | Apr 24, 2026, 17:09 UTC |
| [#59097](https://github.com/openclaw/openclaw/issues/59097) | Bug: buffered block dispatcher splits messages at ~4000 chars, breaking non-chunked channels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59097.md) | complete | Apr 24, 2026, 17:09 UTC |
| [#59056](https://github.com/openclaw/openclaw/issues/59056) | Cron runningAtMs zombie state regression — cleared state returns after gateway restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59056.md) | complete | Apr 24, 2026, 17:09 UTC |
| [#59083](https://github.com/openclaw/openclaw/pull/59083) | fix(media-understanding): avoid audio upload path leaks and missing-filename crashes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59083.md) | complete | Apr 24, 2026, 17:09 UTC |
| [#59124](https://github.com/openclaw/openclaw/issues/59124) | security config option not included in openclaw configure wizard | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59124.md) | complete | Apr 24, 2026, 17:09 UTC |
| [#59057](https://github.com/openclaw/openclaw/pull/59057) | perf(gateway): cap delta overlap search to prevent O(n*m) freeze on repeated chars | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59057.md) | complete | Apr 24, 2026, 17:09 UTC |
| [#59080](https://github.com/openclaw/openclaw/issues/59080) | Tool call JSON parse errors exposed to user after session compaction | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59080.md) | complete | Apr 24, 2026, 17:09 UTC |
| [#59105](https://github.com/openclaw/openclaw/issues/59105) | Token count not displayed in TUI status bar for openai-completions API providers | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59105.md) | complete | Apr 24, 2026, 17:08 UTC |
| [#58876](https://github.com/openclaw/openclaw/issues/58876) | [Bug] macOS WebChat screenshot shows locally but image not sent to AI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58876.md) | complete | Apr 24, 2026, 17:08 UTC |
| [#59002](https://github.com/openclaw/openclaw/issues/59002) | Gmail hook sessions / Signal inbox notifications stop working after update to 2026.3.31 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59002.md) | complete | Apr 24, 2026, 17:08 UTC |
| [#59082](https://github.com/openclaw/openclaw/pull/59082) | Add OpenClaw harness workflow and public contribution bundle | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59082.md) | complete | Apr 24, 2026, 17:08 UTC |

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

Parallel workflow shards only receive planned item numbers. The final job merges artifacts and updates this README so the dashboard reflects progress. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking.

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
