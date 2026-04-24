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

Last dashboard update: Apr 24, 2026, 05:32 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19098 |
| Reviewed / proposed closes | 2586 / 1184 |
| Reviewed files | 2586 |
| Fresh verified reviews in the last 7 days | 2586 |
| Proposed closes awaiting apply | 1184 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 16512 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#40976](https://github.com/openclaw/openclaw/issues/40976) | Background exec completion may not auto-reply reliably in Telegram forum topics | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40976.md) | complete | Apr 24, 2026, 05:32 UTC |
| [#40980](https://github.com/openclaw/openclaw/issues/40980) | [Bug]: Browser Relay extension overrides page color scheme (dark → light) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40980.md) | complete | Apr 24, 2026, 05:30 UTC |
| [#40975](https://github.com/openclaw/openclaw/issues/40975) | [Bug]: Error: Unsafe fallback OpenClaw temp dir | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40975.md) | complete | Apr 24, 2026, 05:29 UTC |
| [#40894](https://github.com/openclaw/openclaw/pull/40894) | Codex/fix 40880 media staging max bytes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40894.md) | complete | Apr 24, 2026, 05:29 UTC |
| [#41014](https://github.com/openclaw/openclaw/issues/41014) | [Bug] 5-second fixed delay between pressing Enter and sending text to LLM (regression since v2026.2.26) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41014.md) | complete | Apr 24, 2026, 05:29 UTC |
| [#40982](https://github.com/openclaw/openclaw/issues/40982) | feat: raise (or remove) 3-minute no-output watchdog cap on CLI requests | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40982.md) | complete | Apr 24, 2026, 05:29 UTC |
| [#40899](https://github.com/openclaw/openclaw/pull/40899) | fix(discord): suppress leaked tool transcript blocks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40899.md) | complete | Apr 24, 2026, 05:29 UTC |
| [#40960](https://github.com/openclaw/openclaw/issues/40960) | [Bug]: Chat page does not auto-refresh new messages | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40960.md) | complete | Apr 24, 2026, 05:28 UTC |
| [#40991](https://github.com/openclaw/openclaw/issues/40991) | Telegram inbound video can degrade to <media:video> placeholder with no attachment and no error when getFile() fails | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40991.md) | complete | Apr 24, 2026, 05:28 UTC |
| [#41025](https://github.com/openclaw/openclaw/pull/41025) | fix: render remote https/http images inline in Control UI chat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41025.md) | complete | Apr 24, 2026, 05:28 UTC |
| [#40992](https://github.com/openclaw/openclaw/pull/40992) | fix(acp): forward inbound media attachments through ACP topic binding turns | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40992.md) | complete | Apr 24, 2026, 05:28 UTC |
| [#40952](https://github.com/openclaw/openclaw/issues/40952) | [Feature]: Slack statusReactions support (lifecycle reaction parity with Telegram/Discord) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40952.md) | complete | Apr 24, 2026, 05:28 UTC |
| [#41019](https://github.com/openclaw/openclaw/issues/41019) | [Feature Request] Browser tool support headless mode | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41019.md) | complete | Apr 24, 2026, 05:28 UTC |
| [#40962](https://github.com/openclaw/openclaw/issues/40962) | Google Chat channel: 'Cannot convert undefined or null to object' on typing indicator and message send | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40962.md) | complete | Apr 24, 2026, 05:28 UTC |
| [#41013](https://github.com/openclaw/openclaw/pull/41013) | fix: strip leading <session-recap> blocks from user-visible messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41013.md) | complete | Apr 24, 2026, 05:28 UTC |
| [#40949](https://github.com/openclaw/openclaw/pull/40949) | Fix: Telegram sendPayload oversized message crash | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40949.md) | complete | Apr 24, 2026, 05:28 UTC |
| [#41020](https://github.com/openclaw/openclaw/issues/41020) | [Feature Request] Feishu message reactions (emoji responses) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41020.md) | complete | Apr 24, 2026, 05:28 UTC |
| [#41004](https://github.com/openclaw/openclaw/issues/41004) | Telegram ACP mismatch: /acp spawn works in-topic, but sessions_spawn(runtime:\"acp\", thread:true) fails (child vs current placement) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41004.md) | complete | Apr 24, 2026, 05:28 UTC |
| [#40986](https://github.com/openclaw/openclaw/issues/40986) | [Feature] Share memory between different sessions of the same agent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40986.md) | complete | Apr 24, 2026, 05:28 UTC |
| [#41027](https://github.com/openclaw/openclaw/pull/41027) | fix(discord): break resume loop on consecutive 1005 close failures | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41027.md) | complete | Apr 24, 2026, 05:28 UTC |

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
