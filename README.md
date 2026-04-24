# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 24, 2026, 10:31 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12537 |
| Fresh reviewed issues in the last 7 days | 4459 |
| Proposed issue closes | 2447 (54.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6595 |
| Fresh reviewed PRs in the last 7 days | 2324 |
| Proposed PR closes | 794 (34.2% of reviewed PRs) |
| Open items total | 19132 |
| Reviewed files | 6783 |
| Fresh verified reviews in the last 7 days | 6783 |
| Proposed closes awaiting apply | 3241 (47.8% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 12349 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#49045](https://github.com/openclaw/openclaw/issues/49045) | [Bug]: gateway connect failed: Error: gateway closed (1000): | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49045.md) | complete | Apr 24, 2026, 10:30 UTC |
| [#49080](https://github.com/openclaw/openclaw/issues/49080) | Live channel sessions keep stale policy context after durable rule changes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49080.md) | complete | Apr 24, 2026, 10:30 UTC |
| [#49033](https://github.com/openclaw/openclaw/issues/49033) | [Bug]: missing dependencies | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49033.md) | complete | Apr 24, 2026, 10:30 UTC |
| [#49049](https://github.com/openclaw/openclaw/pull/49049) | fix: increase DEFAULT_HANDSHAKE_TIMEOUT_MS from 3s to 10s | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49049.md) | complete | Apr 24, 2026, 10:30 UTC |
| [#49068](https://github.com/openclaw/openclaw/pull/49068) | fix(agent): suppress silent gateway wait summaries | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49068.md) | complete | Apr 24, 2026, 10:29 UTC |
| [#49047](https://github.com/openclaw/openclaw/issues/49047) | [Bug]: # `agent.wait` emits misleading `No reply from agent.` | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49047.md) | complete | Apr 24, 2026, 10:29 UTC |
| [#49064](https://github.com/openclaw/openclaw/pull/49064) | feat(cli): add `openclaw usage` command for token and cost summaries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49064.md) | complete | Apr 24, 2026, 10:29 UTC |
| [#49042](https://github.com/openclaw/openclaw/pull/49042) | Plugins: expose structured finalLlmOutcome on agent_end | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49042.md) | complete | Apr 24, 2026, 10:29 UTC |
| [#49052](https://github.com/openclaw/openclaw/pull/49052) | fix: pass sessionKey to buildEmbeddedExtensionFactories | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49052.md) | complete | Apr 24, 2026, 10:29 UTC |
| [#49036](https://github.com/openclaw/openclaw/issues/49036) | openclaw doctor should detect stale gateway lock files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49036.md) | complete | Apr 24, 2026, 10:29 UTC |
| [#49023](https://github.com/openclaw/openclaw/issues/49023) | Telegram: duplicate session race condition when messages arrive during session initialization | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49023.md) | complete | Apr 24, 2026, 10:29 UTC |
| [#49043](https://github.com/openclaw/openclaw/issues/49043) | [Bug]: Agent to agent, Cross Session Identity Issue | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49043.md) | complete | Apr 24, 2026, 10:28 UTC |
| [#49073](https://github.com/openclaw/openclaw/issues/49073) | [Feature]: Telegram thread/topic support for sub-agent spawning | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49073.md) | complete | Apr 24, 2026, 10:28 UTC |
| [#49028](https://github.com/openclaw/openclaw/pull/49028) | feat(i18n): add Vietnamese (vi) locale and translations | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49028.md) | complete | Apr 24, 2026, 10:28 UTC |
| [#49003](https://github.com/openclaw/openclaw/pull/49003) | Fix CLI init TDZ from channel registry imports | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49003.md) | complete | Apr 24, 2026, 10:28 UTC |
| [#49054](https://github.com/openclaw/openclaw/issues/49054) | ReferenceError: _skey is not defined — cron jobs crash intermittently | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49054.md) | complete | Apr 24, 2026, 10:28 UTC |
| [#49039](https://github.com/openclaw/openclaw/issues/49039) | google-vertex provider sends authenticated sentinel as literal API key, causing 401 on Vertex AI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49039.md) | complete | Apr 24, 2026, 10:28 UTC |
| [#48979](https://github.com/openclaw/openclaw/issues/48979) | Telegram channel cannot send images via read tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48979.md) | complete | Apr 24, 2026, 10:28 UTC |
| [#49056](https://github.com/openclaw/openclaw/issues/49056) | [Feature]: MemorySpark - Session Reset Protection with Auto-Recovery | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49056.md) | complete | Apr 24, 2026, 10:28 UTC |
| [#49069](https://github.com/openclaw/openclaw/pull/49069) | feat: add configurable timestamps to TUI chat messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49069.md) | complete | Apr 24, 2026, 10:28 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written.

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
