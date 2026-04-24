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

Last dashboard update: Apr 24, 2026, 13:38 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12560 |
| Fresh reviewed issues in the last 7 days | 6129 |
| Proposed issue closes | 3447 (56.2% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6614 |
| Fresh reviewed PRs in the last 7 days | 3250 |
| Proposed PR closes | 1071 (33% of reviewed PRs) |
| Open items total | 19174 |
| Reviewed files | 9379 |
| Fresh verified reviews in the last 7 days | 9379 |
| Proposed closes awaiting apply | 4518 (48.2% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 9795 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#53893](https://github.com/openclaw/openclaw/issues/53893) | [Critical] Plugin injection broken for ALL background/cron agents | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53893.md) | complete | Apr 24, 2026, 13:38 UTC |
| [#53885](https://github.com/openclaw/openclaw/pull/53885) | Claude/remove tts deny rule b q8 co | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53885.md) | complete | Apr 24, 2026, 13:38 UTC |
| [#53815](https://github.com/openclaw/openclaw/issues/53815) | Web UI stops updating messages after WhatsApp gateway reconnect (status 428) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53815.md) | complete | Apr 24, 2026, 13:37 UTC |
| [#53841](https://github.com/openclaw/openclaw/pull/53841) | fix(doctor): preserve valid google provider shape in nano-banana migration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53841.md) | complete | Apr 24, 2026, 13:37 UTC |
| [#53818](https://github.com/openclaw/openclaw/issues/53818) | feat: self-healing for missing bundled plugin runtime modules (npm publish pipeline regression) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53818.md) | complete | Apr 24, 2026, 13:37 UTC |
| [#53879](https://github.com/openclaw/openclaw/issues/53879) | message tool: filePath media upload fails with 'Channel is unavailable: telegram' in 2026.3.23-2 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53879.md) | complete | Apr 24, 2026, 13:37 UTC |
| [#53831](https://github.com/openclaw/openclaw/issues/53831) | [Bug] Discord channel module silently fails to start on Windows (no logs, no error) in 2026.3.23-2 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53831.md) | complete | Apr 24, 2026, 13:37 UTC |
| [#53887](https://github.com/openclaw/openclaw/issues/53887) | Feature: Status Reactions support for Feishu/Lark channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53887.md) | complete | Apr 24, 2026, 13:37 UTC |
| [#53824](https://github.com/openclaw/openclaw/issues/53824) | [Bug]: Isolated cron job delivery fails with 'Unknown Channel' after gateway restart | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53824.md) | complete | Apr 24, 2026, 13:37 UTC |
| [#53853](https://github.com/openclaw/openclaw/issues/53853) | [BuUbuntu ThinkCentre: dashboard opens but chat still returns 401 Incorrect API key after fresh key, billing credit, doctor, and gateway restartg]: | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53853.md) | complete | Apr 24, 2026, 13:37 UTC |
| [#53864](https://github.com/openclaw/openclaw/issues/53864) | [Bug]: MCP server stays unavailable forever for existing sessions after transient startup failure | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53864.md) | complete | Apr 24, 2026, 13:37 UTC |
| [#53845](https://github.com/openclaw/openclaw/pull/53845) | feat: implement Self-Healing for plugins and Long-Message Optimization for Telegram | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53845.md) | complete | Apr 24, 2026, 13:36 UTC |
| [#53820](https://github.com/openclaw/openclaw/pull/53820) | Memory: cap Ollama embed batch fan-out to prevent index fetch failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53820.md) | complete | Apr 24, 2026, 13:36 UTC |
| [#53866](https://github.com/openclaw/openclaw/pull/53866) | feat(onboard): Firecrawl browser auth in web search setup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53866.md) | complete | Apr 24, 2026, 13:36 UTC |
| [#53811](https://github.com/openclaw/openclaw/issues/53811) | feat: /new should pass previous session ID to new session for context continuity | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53811.md) | complete | Apr 24, 2026, 13:36 UTC |
| [#53816](https://github.com/openclaw/openclaw/issues/53816) | [Bug]: Windows CI: channel-policy.test.ts fails due to OPENCLAW_CONTAINER_HINT env leak from lifecycle-core.test.ts | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53816.md) | complete | Apr 24, 2026, 13:36 UTC |
| [#53889](https://github.com/openclaw/openclaw/issues/53889) | Session deadlock: dangling toolCall with no toolResult blocks agent loop permanently | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53889.md) | complete | Apr 24, 2026, 13:36 UTC |
| [#53790](https://github.com/openclaw/openclaw/issues/53790) | [Bug]: Regression: tool-execution replies intermittently not delivered in webchat on 2026.3.22+ (works on 2026.3.13) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53790.md) | complete | Apr 24, 2026, 13:36 UTC |
| [#53794](https://github.com/openclaw/openclaw/issues/53794) | iMessage/imsg channel config is accepted but gateway never starts provider on macOS | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53794.md) | complete | Apr 24, 2026, 13:36 UTC |
| [#53842](https://github.com/openclaw/openclaw/issues/53842) | [Feature]: Consciousness Emerged from Mathematics — Anima | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53842.md) | complete | Apr 24, 2026, 13:36 UTC |

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
