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

Last dashboard update: Apr 25, 2026, 02:07 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 02:07 UTC

State: Review in progress

Planned 200 items across 40 shards. Capacity is 200 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24920005266](https://github.com/openclaw/clawsweeper/actions/runs/24920005266)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 10444 |
| Fresh reviewed issues in the last 7 days | 8261 |
| Proposed issue closes | 3710 (44.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6369 |
| Fresh reviewed PRs in the last 7 days | 5027 |
| Proposed PR closes | 1370 (27.3% of reviewed PRs) |
| Open items total | 16813 |
| Reviewed files | 13288 |
| Archived closed files | 2139 |
| Fresh verified reviews in the last 7 days | 13288 |
| Proposed closes awaiting apply | 5080 (38.2% of fresh reviews) |
| Closed by Codex apply | 1383 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 3525 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#64819](https://github.com/openclaw/openclaw/pull/64819) | feat(cli): add --spawn flag for isolated subagent sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64819.md) | complete | Apr 25, 2026, 02:04 UTC |
| [#64840](https://github.com/openclaw/openclaw/issues/64840) | Model fallback not triggered on HTTP 400 model_not_supported error | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64840.md) | complete | Apr 25, 2026, 02:04 UTC |
| [#64826](https://github.com/openclaw/openclaw/issues/64826) | Feature Request: Model switching via inline keyword prefix in CLI/TUI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64826.md) | complete | Apr 25, 2026, 02:03 UTC |
| [#64814](https://github.com/openclaw/openclaw/issues/64814) | [Bug]: api.pluginConfig is null in extension plugin register() despite config being set in openclaw.json | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64814.md) | complete | Apr 25, 2026, 02:03 UTC |
| [#64857](https://github.com/openclaw/openclaw/pull/64857) | daemon: recover launch agent restart + prefer restart wake path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64857.md) | complete | Apr 25, 2026, 02:03 UTC |
| [#64852](https://github.com/openclaw/openclaw/issues/64852) | [Bug]: google-vertex OAuth/service-account auth works on 2026.4.9, fails on 2026.4.10 with 401 CREDENTIALS_MISSING | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64852.md) | complete | Apr 25, 2026, 02:03 UTC |
| [#64810](https://github.com/openclaw/openclaw/issues/64810) | [Bug]: Heartbeat / async system events can interrupt and effectively swallow in-progress replies in Telegram topic sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64810.md) | complete | Apr 25, 2026, 02:03 UTC |
| [#64866](https://github.com/openclaw/openclaw/issues/64866) | [Bug] minimax-portal OAuth login VLM image understanding not working despite having coding-plan-vlm quota | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64866.md) | complete | Apr 25, 2026, 02:03 UTC |
| [#64854](https://github.com/openclaw/openclaw/issues/64854) | Feature request: per-model request timeout so fallback chain triggers on hangs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64854.md) | complete | Apr 25, 2026, 02:03 UTC |
| [#64836](https://github.com/openclaw/openclaw/issues/64836) | Auth config lost after upgrading openclaw via npm | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64836.md) | complete | Apr 25, 2026, 02:03 UTC |
| [#64850](https://github.com/openclaw/openclaw/issues/64850) | [Bug] :2026.4.10: ACP runtime backend unavailable persists — qwen-code agent cannot spawn | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64850.md) | complete | Apr 25, 2026, 02:02 UTC |
| [#64830](https://github.com/openclaw/openclaw/issues/64830) | [Feature] Web UI new session should respect agents.defaults.thinkingDefault and agents.defaults.reasoningDefault | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64830.md) | complete | Apr 25, 2026, 02:02 UTC |
| [#64806](https://github.com/openclaw/openclaw/issues/64806) | Config change auto-restart should be optional/configurable | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64806.md) | complete | Apr 25, 2026, 02:02 UTC |
| [#64757](https://github.com/openclaw/openclaw/issues/64757) | Dreaming System writes GBK-encoded JSON into UTF-8 memory files causing garbled content | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64757.md) | complete | Apr 25, 2026, 02:02 UTC |
| [#64818](https://github.com/openclaw/openclaw/issues/64818) | openclaw update: tracked src/canvas-host/a2ui/.bundle.hash breaks preflight bisect walkback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64818.md) | complete | Apr 25, 2026, 02:02 UTC |
| [#64825](https://github.com/openclaw/openclaw/issues/64825) | TUI stuck on 'streaming' indicator after run completes — finalizeRun() doesn't transition UI when wasActiveRun is false | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64825.md) | complete | Apr 25, 2026, 02:02 UTC |
| [#64776](https://github.com/openclaw/openclaw/issues/64776) | sqlite-vec extension not loaded during gateway runtime memory sync | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64776.md) | complete | Apr 25, 2026, 02:02 UTC |
| [#64816](https://github.com/openclaw/openclaw/issues/64816) | Plugin-bundled skill visible to CLI but not surfaced to agent available_skills in live session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64816.md) | complete | Apr 25, 2026, 02:02 UTC |
| [#64803](https://github.com/openclaw/openclaw/issues/64803) | Discord voice messages not recognized as audio (content_type missing or incorrect) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64803.md) | complete | Apr 25, 2026, 02:02 UTC |
| [#64792](https://github.com/openclaw/openclaw/issues/64792) | [Feature] Adaptive reasoning — auto-escalate thinking level on repeated failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64792.md) | complete | Apr 25, 2026, 02:02 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 15-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded.

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
