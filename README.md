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

Last dashboard update: Apr 24, 2026, 11:46 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12546 |
| Fresh reviewed issues in the last 7 days | 5095 |
| Proposed issue closes | 2820 (55.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6602 |
| Fresh reviewed PRs in the last 7 days | 2684 |
| Proposed PR closes | 908 (33.8% of reviewed PRs) |
| Open items total | 19148 |
| Reviewed files | 7779 |
| Fresh verified reviews in the last 7 days | 7779 |
| Proposed closes awaiting apply | 3728 (47.9% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 11369 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#50866](https://github.com/openclaw/openclaw/issues/50866) | Telegram 429 rate limit causes crash spiral when multiple agents/crons post simultaneously | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50866.md) | complete | Apr 24, 2026, 11:45 UTC |
| [#50880](https://github.com/openclaw/openclaw/issues/50880) | Steer queue mode silently degrades to followup — messages never injected mid-turn at tool call boundaries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50880.md) | complete | Apr 24, 2026, 11:45 UTC |
| [#50873](https://github.com/openclaw/openclaw/issues/50873) | Feature: Display subscription/API usage limits in Control UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50873.md) | complete | Apr 24, 2026, 11:45 UTC |
| [#50850](https://github.com/openclaw/openclaw/pull/50850) | fix(delivery-queue): add TTL expiry and ack failure logging to prevent infinite re-delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50850.md) | complete | Apr 24, 2026, 11:44 UTC |
| [#50809](https://github.com/openclaw/openclaw/issues/50809) | Add sms.read command and SMS as a messaging channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50809.md) | complete | Apr 24, 2026, 11:43 UTC |
| [#50874](https://github.com/openclaw/openclaw/pull/50874) | feat(slack): add requireMentionInThreads config to disable implicit thread mentions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50874.md) | complete | Apr 24, 2026, 11:43 UTC |
| [#50867](https://github.com/openclaw/openclaw/issues/50867) | TypeError: Cannot read properties of undefined (reading 'includes') with local Ollama model | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50867.md) | complete | Apr 24, 2026, 11:43 UTC |
| [#50840](https://github.com/openclaw/openclaw/pull/50840) | fix: resolve axios missing module on startup (#50800) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50840.md) | complete | Apr 24, 2026, 11:43 UTC |
| [#50829](https://github.com/openclaw/openclaw/pull/50829) | Docs: fix broken internal links across documentation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50829.md) | complete | Apr 24, 2026, 11:43 UTC |
| [#50828](https://github.com/openclaw/openclaw/issues/50828) | Docs: broken internal links across documentation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50828.md) | complete | Apr 24, 2026, 11:43 UTC |
| [#50872](https://github.com/openclaw/openclaw/issues/50872) | Telegram: native reply threading inconsistent + message.react fails with 'messageId required' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50872.md) | complete | Apr 24, 2026, 11:43 UTC |
| [#50875](https://github.com/openclaw/openclaw/pull/50875) | feat: add before_identity_resolve plugin hook | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50875.md) | complete | Apr 24, 2026, 11:43 UTC |
| [#50790](https://github.com/openclaw/openclaw/issues/50790) | Feature request: session-scoped reset / forget for chat and group contexts | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50790.md) | complete | Apr 24, 2026, 11:43 UTC |
| [#50892](https://github.com/openclaw/openclaw/issues/50892) | [Bug]: Discord collect-mode auto-reply drain causes duplicate message delivery | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50892.md) | complete | Apr 24, 2026, 11:43 UTC |
| [#50797](https://github.com/openclaw/openclaw/issues/50797) | Heartbeat ACK overrides normal reply when gateway poll and user message arrive simultaneously | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50797.md) | complete | Apr 24, 2026, 11:43 UTC |
| [#50876](https://github.com/openclaw/openclaw/issues/50876) | Feature: bootstrapFiles config key to extend workspace injection set | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50876.md) | complete | Apr 24, 2026, 11:43 UTC |
| [#50881](https://github.com/openclaw/openclaw/pull/50881) | fix(slack): silently ignore already_reacted / no_reaction errors (#50733) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50881.md) | complete | Apr 24, 2026, 11:43 UTC |
| [#50891](https://github.com/openclaw/openclaw/issues/50891) | Session reset hooks: idle/daily reset do not trigger session-memory save | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50891.md) | complete | Apr 24, 2026, 11:42 UTC |
| [#50779](https://github.com/openclaw/openclaw/issues/50779) | [Bug]: Control UI does not render tool-returned images inline in Chat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50779.md) | complete | Apr 24, 2026, 11:42 UTC |
| [#50895](https://github.com/openclaw/openclaw/pull/50895) | whatsapp: normalize BR ninth-digit variants | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50895.md) | complete | Apr 24, 2026, 11:42 UTC |

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
