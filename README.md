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

Last dashboard update: Apr 24, 2026, 08:07 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12515 |
| Fresh reviewed issues in the last 7 days | 3224 |
| Proposed issue closes | 1725 (53.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6580 |
| Fresh reviewed PRs in the last 7 days | 1562 |
| Proposed PR closes | 520 (33.3% of reviewed PRs) |
| Open items total | 19095 |
| Reviewed files | 4786 |
| Fresh verified reviews in the last 7 days | 4786 |
| Proposed closes awaiting apply | 2245 (46.9% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 14309 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#45224](https://github.com/openclaw/openclaw/issues/45224) | Unhandled Playwright assertion error in CRSession._onMessage crashes Gateway | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45224.md) | complete | Apr 24, 2026, 08:07 UTC |
| [#45212](https://github.com/openclaw/openclaw/issues/45212) | [Feature]: Per-topic/session fixed context injection | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45212.md) | complete | Apr 24, 2026, 08:07 UTC |
| [#45216](https://github.com/openclaw/openclaw/pull/45216) | fix(agents): handle FastAPI `detail` error payloads to prevent raw JSON leaking to chat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45216.md) | complete | Apr 24, 2026, 08:06 UTC |
| [#45221](https://github.com/openclaw/openclaw/issues/45221) | [Bug]: image tool ignores current imageModel and uses stale runtime image/fallback state | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45221.md) | complete | Apr 24, 2026, 08:06 UTC |
| [#45202](https://github.com/openclaw/openclaw/issues/45202) | [Bug]: [Bug] Telegram Multi-Account Not Working - Only Default Bot Starts | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45202.md) | complete | Apr 24, 2026, 08:06 UTC |
| [#45187](https://github.com/openclaw/openclaw/issues/45187) | [Bug]: Chat panel can be covered by oversized empty-state SVG during render/send, and may sometimes stay stuck queued until full page reload | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45187.md) | complete | Apr 24, 2026, 08:06 UTC |
| [#45222](https://github.com/openclaw/openclaw/issues/45222) | [Bug]: Intermittent local gateway websocket handshake failures on loopback (ws://127.0.0.1:18789) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45222.md) | complete | Apr 24, 2026, 08:06 UTC |
| [#45179](https://github.com/openclaw/openclaw/issues/45179) | Feature: temp artifact provenance + durable-path guardrails to prevent /tmp chaos | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45179.md) | complete | Apr 24, 2026, 08:06 UTC |
| [#45208](https://github.com/openclaw/openclaw/issues/45208) | [Feature]: Help us cross the wall! Request for proxy relay support for China 🇨🇳 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45208.md) | complete | Apr 24, 2026, 08:06 UTC |
| [#45191](https://github.com/openclaw/openclaw/issues/45191) | ReferenceError: Cannot access 'ANTHROPIC_MODEL_ALIASES' before initialization on config load (v2026.3.12) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45191.md) | complete | Apr 24, 2026, 08:05 UTC |
| [#45227](https://github.com/openclaw/openclaw/issues/45227) | [Bug]: 422 status code (no body) with mistral | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45227.md) | complete | Apr 24, 2026, 08:05 UTC |
| [#45193](https://github.com/openclaw/openclaw/pull/45193) | fix(outbound): suppress ANNOUNCE_SKIP / REPLY_SKIP from external delivery | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45193.md) | complete | Apr 24, 2026, 08:05 UTC |
| [#45220](https://github.com/openclaw/openclaw/pull/45220) | fix: skip state migration preflight for logs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45220.md) | complete | Apr 24, 2026, 08:05 UTC |
| [#45199](https://github.com/openclaw/openclaw/issues/45199) | [Bug]: ANTHROPIC_MODEL_ALIASES ReferenceError on config load after upgrade to 2026.3.12 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45199.md) | complete | Apr 24, 2026, 08:05 UTC |
| [#45149](https://github.com/openclaw/openclaw/issues/45149) | [Bug]: Unable to trigger the CLI command in tools.media.audio.models | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45149.md) | complete | Apr 24, 2026, 08:05 UTC |
| [#45194](https://github.com/openclaw/openclaw/issues/45194) | Control UI chat page shows giant OpenClaw logo / blank pane on v2026.3.12 despite successful chat.history | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45194.md) | complete | Apr 24, 2026, 08:05 UTC |
| [#45201](https://github.com/openclaw/openclaw/issues/45201) | [Bug] Web UI: Gigantic background logo taking over the chat screen after upgrading to 2026.3.12 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45201.md) | complete | Apr 24, 2026, 08:05 UTC |
| [#45158](https://github.com/openclaw/openclaw/issues/45158) | [Bug]: 飞书多 Agent 路由问题 - 所有消息都路由到同一个 agent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45158.md) | complete | Apr 24, 2026, 08:05 UTC |
| [#45209](https://github.com/openclaw/openclaw/pull/45209) | feat(feishu): add configuration toggle for Bitable tools | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45209.md) | complete | Apr 24, 2026, 08:05 UTC |
| [#45214](https://github.com/openclaw/openclaw/pull/45214) | docs: add n8n-as-code community plugin listing | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45214.md) | complete | Apr 24, 2026, 08:05 UTC |

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
