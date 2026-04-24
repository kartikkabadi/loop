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

Last dashboard update: Apr 24, 2026, 14:53 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12577 |
| Fresh reviewed issues in the last 7 days | 6792 |
| Proposed issue closes | 3792 (55.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6619 |
| Fresh reviewed PRs in the last 7 days | 3587 |
| Proposed PR closes | 1166 (32.5% of reviewed PRs) |
| Open items total | 19196 |
| Reviewed files | 10379 |
| Fresh verified reviews in the last 7 days | 10379 |
| Proposed closes awaiting apply | 4958 (47.8% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 8817 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#55750](https://github.com/openclaw/openclaw/pull/55750) | fix(model-auth): resolve provider config for -plan variants | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55750.md) | complete | Apr 24, 2026, 14:52 UTC |
| [#55767](https://github.com/openclaw/openclaw/pull/55767) | fix(hooks): reject internal session namespaces | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55767.md) | complete | Apr 24, 2026, 14:52 UTC |
| [#55769](https://github.com/openclaw/openclaw/issues/55769) | Subagents return empty responses with all external providers (OpenRouter, Google) — only default MiniMax provider works | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55769.md) | complete | Apr 24, 2026, 14:52 UTC |
| [#55763](https://github.com/openclaw/openclaw/issues/55763) | Discord WebSocket drops ~hourly with stale-socket; messages lost during reconnect window | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55763.md) | complete | Apr 24, 2026, 14:52 UTC |
| [#55800](https://github.com/openclaw/openclaw/pull/55800) | Build: fall back on Windows symlink errors | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55800.md) | complete | Apr 24, 2026, 14:51 UTC |
| [#55794](https://github.com/openclaw/openclaw/issues/55794) | [Bug]: WhatsApp group messages stopped routing to agent sessions (regression: March 12, 2026) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55794.md) | complete | Apr 24, 2026, 14:51 UTC |
| [#55797](https://github.com/openclaw/openclaw/issues/55797) | [Bug]: 2026.3.24 models auth login for openai-codex triggers openclaw.json.clobbered storm in containerized pod | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55797.md) | complete | Apr 24, 2026, 14:51 UTC |
| [#55770](https://github.com/openclaw/openclaw/pull/55770) | Add \"verbose limit\" support for configuring exec tool display truncat… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55770.md) | complete | Apr 24, 2026, 14:51 UTC |
| [#55689](https://github.com/openclaw/openclaw/issues/55689) | [Bug]: Gateway restart fails when executed from agent context on Windows (schtasks) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55689.md) | complete | Apr 24, 2026, 14:51 UTC |
| [#55757](https://github.com/openclaw/openclaw/pull/55757) | cli-runner: disable no-output watchdog when stdin is closed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55757.md) | complete | Apr 24, 2026, 14:51 UTC |
| [#55676](https://github.com/openclaw/openclaw/issues/55676) | [Feature]: ollama local model remote location | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55676.md) | complete | Apr 24, 2026, 14:51 UTC |
| [#55747](https://github.com/openclaw/openclaw/pull/55747) | fix(hooks): rebind routed session keys to target agent | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55747.md) | complete | Apr 24, 2026, 14:50 UTC |
| [#55735](https://github.com/openclaw/openclaw/issues/55735) | [Suggestion] The agent has no version-aware self-knowledge — it misdiagnoses intentional new behaviors as bugs after every upgrade | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55735.md) | complete | Apr 24, 2026, 14:50 UTC |
| [#55726](https://github.com/openclaw/openclaw/pull/55726) | fix(security): include dmPolicy in exposure matrix audit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55726.md) | complete | Apr 24, 2026, 14:50 UTC |
| [#55761](https://github.com/openclaw/openclaw/pull/55761) | fix(hooks): suppress silent shared-hook fallback while preserving error surfacing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55761.md) | complete | Apr 24, 2026, 14:50 UTC |
| [#55786](https://github.com/openclaw/openclaw/issues/55786) | REACTION_INVALID warnings surface as failed message alerts despite suppressToolErrors=true | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55786.md) | complete | Apr 24, 2026, 14:50 UTC |
| [#55748](https://github.com/openclaw/openclaw/pull/55748) | fix(utils): handle null/undefined in resolveUserPath | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55748.md) | complete | Apr 24, 2026, 14:50 UTC |
| [#55799](https://github.com/openclaw/openclaw/issues/55799) | Integrate Safe Browsing checks into OpenClaw core for default web resource screening | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55799.md) | complete | Apr 24, 2026, 14:50 UTC |
| [#55744](https://github.com/openclaw/openclaw/issues/55744) | [Bug]: Whatsapp/Telegram - Openclaw integration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55744.md) | complete | Apr 24, 2026, 14:50 UTC |
| [#55721](https://github.com/openclaw/openclaw/issues/55721) | [Bug]:  Telegram session: intent commits but tool execution does not dispatch (invoke-first no-op), despite healthy  gateway/channel | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55721.md) | complete | Apr 24, 2026, 14:50 UTC |

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
