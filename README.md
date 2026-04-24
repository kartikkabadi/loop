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

Last dashboard update: Apr 24, 2026, 18:58 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12382 |
| Fresh reviewed issues in the last 7 days | 8637 |
| Proposed issue closes | 4777 (55.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6613 |
| Fresh reviewed PRs in the last 7 days | 4560 |
| Proposed PR closes | 1398 (30.7% of reviewed PRs) |
| Open items total | 18995 |
| Reviewed files | 13197 |
| Archived closed files | 182 |
| Fresh verified reviews in the last 7 days | 13197 |
| Proposed closes awaiting apply | 6175 (46.8% of fresh reviews) |
| Closed by Codex apply | 170 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 5798 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#61252](https://github.com/openclaw/openclaw/issues/61252) | [cli-backend] Codex companion plugin hijacks session ID → FailoverError after 2 turns | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61252.md) | complete | Apr 24, 2026, 18:57 UTC |
| [#61240](https://github.com/openclaw/openclaw/issues/61240) | [Bug]: BREW NEEDS TO BE REMOVE AS THE MAIN INSTALLER | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61240.md) | complete | Apr 24, 2026, 18:55 UTC |
| [#61200](https://github.com/openclaw/openclaw/pull/61200) | Claude/add openclaw aave arbitrage | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61200.md) | complete | Apr 24, 2026, 18:55 UTC |
| [#61186](https://github.com/openclaw/openclaw/issues/61186) | Cron timer tick crash: ReferenceError: fs$1 is not defined (v2026.4.2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61186.md) | complete | Apr 24, 2026, 18:54 UTC |
| [#61205](https://github.com/openclaw/openclaw/issues/61205) | [Feature] Telegram-first OpenAI/Codex reconnect workflow with device-auth fallback | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61205.md) | complete | Apr 24, 2026, 18:54 UTC |
| [#61248](https://github.com/openclaw/openclaw/pull/61248) | docs: add Gemini AI Cloud free model provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61248.md) | complete | Apr 24, 2026, 18:54 UTC |
| [#61137](https://github.com/openclaw/openclaw/issues/61137) | Intermittent JSON parse error \"Expected ',' or ']' after array element\" on arm64 (Raspberry Pi 5) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61137.md) | complete | Apr 24, 2026, 18:54 UTC |
| [#61242](https://github.com/openclaw/openclaw/pull/61242) | Improve managed child-task flow UX for long-running tasks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61242.md) | complete | Apr 24, 2026, 18:54 UTC |
| [#61238](https://github.com/openclaw/openclaw/issues/61238) | [Bug]: Critical Data Loss Due to Silent Daily Session Reset (No user warning, no opt-out discovery) #42100 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61238.md) | complete | Apr 24, 2026, 18:53 UTC |
| [#61173](https://github.com/openclaw/openclaw/pull/61173) | Fix provider discovery contract drift | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61173.md) | complete | Apr 24, 2026, 18:53 UTC |
| [#61250](https://github.com/openclaw/openclaw/issues/61250) | [Bug] WhatsApp outbound fails: \"No active WhatsApp Web listener\" despite successful CLI login | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61250.md) | complete | Apr 24, 2026, 18:53 UTC |
| [#61219](https://github.com/openclaw/openclaw/issues/61219) | LINE channel fails to start after upgrading to v2026.4.2. Error: \"Bundled plugin public surface access blocked for line via line/runtime-api.js: no bundled plugin manifest found for line\ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61219.md) | complete | Apr 24, 2026, 18:53 UTC |
| [#61247](https://github.com/openclaw/openclaw/pull/61247) | fix(utils): add missing test coverage for sliceUtf16Safe and truncateUtf16Safe | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61247.md) | complete | Apr 24, 2026, 18:53 UTC |
| [#61232](https://github.com/openclaw/openclaw/pull/61232) | feat(android): add always-on location access | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61232.md) | complete | Apr 24, 2026, 18:53 UTC |
| [#61269](https://github.com/openclaw/openclaw/pull/61269) | fix(android): allow onboarding finish when operator is offline | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61269.md) | complete | Apr 24, 2026, 18:52 UTC |
| [#61226](https://github.com/openclaw/openclaw/pull/61226) | fix(telegram): finalize the latest matching partial preview | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61226.md) | complete | Apr 24, 2026, 18:52 UTC |
| [#61142](https://github.com/openclaw/openclaw/issues/61142) | [Bug]: Telegram photo captions arrive as [object Object] | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61142.md) | complete | Apr 24, 2026, 18:52 UTC |
| [#61259](https://github.com/openclaw/openclaw/issues/61259) | Bundled channel plugins cause stack overflow via jiti module loading | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61259.md) | complete | Apr 24, 2026, 18:52 UTC |
| [#61182](https://github.com/openclaw/openclaw/issues/61182) | openclaw memory search CLI hangs indefinitely | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61182.md) | complete | Apr 24, 2026, 18:52 UTC |
| [#61249](https://github.com/openclaw/openclaw/issues/61249) | Feishu: Support native voice message bubbles (OGG/Opus) for TTS | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61249.md) | complete | Apr 24, 2026, 18:52 UTC |

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
