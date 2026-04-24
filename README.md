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

Last dashboard update: Apr 24, 2026, 06:55 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12502 |
| Fresh reviewed issues in the last 7 days | 2610 |
| Proposed issue closes | 1364 (52.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6579 |
| Fresh reviewed PRs in the last 7 days | 1176 |
| Proposed PR closes | 377 (32.1% of reviewed PRs) |
| Open items total | 19081 |
| Reviewed files | 3786 |
| Fresh verified reviews in the last 7 days | 3786 |
| Proposed closes awaiting apply | 1741 (46% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 15295 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#43383](https://github.com/openclaw/openclaw/issues/43383) | [Bug]: Sandboxed non-main sessions expose host skill paths that are unreadable inside the sandbox | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43383.md) | complete | Apr 24, 2026, 06:55 UTC |
| [#43347](https://github.com/openclaw/openclaw/pull/43347) | fix(tests): vitest 4.x mock compatibility and type safety | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43347.md) | complete | Apr 24, 2026, 06:54 UTC |
| [#43400](https://github.com/openclaw/openclaw/issues/43400) | Fix: Fallback mechanism never triggers due to per-model timeout equaling global run timeout | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43400.md) | complete | Apr 24, 2026, 06:54 UTC |
| [#43372](https://github.com/openclaw/openclaw/issues/43372) | Embedded agent error: 'No tool call found for function call output with call_id' under tool-heavy / retry conditions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43372.md) | complete | Apr 24, 2026, 06:53 UTC |
| [#43320](https://github.com/openclaw/openclaw/pull/43320) | fix(ui): increase tool card preview max-height to show full commands | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43320.md) | complete | Apr 24, 2026, 06:53 UTC |
| [#43376](https://github.com/openclaw/openclaw/issues/43376) | feat(agents): dynamic store override based on provider metadata | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43376.md) | complete | Apr 24, 2026, 06:53 UTC |
| [#43367](https://github.com/openclaw/openclaw/issues/43367) | Multi-agent orchestration is unstable: concurrent agents add/config overwrites, session-lock failures, and detached child work | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43367.md) | complete | Apr 24, 2026, 06:53 UTC |
| [#43300](https://github.com/openclaw/openclaw/issues/43300) | [Bug]: | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43300.md) | complete | Apr 24, 2026, 06:53 UTC |
| [#43388](https://github.com/openclaw/openclaw/pull/43388) | fix(feishu): harden voice reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43388.md) | complete | Apr 24, 2026, 06:52 UTC |
| [#43256](https://github.com/openclaw/openclaw/issues/43256) | [Bug]: gpt-5.4 agents refuse exec/curl for Telegram Bot API file delivery due to overly broad system prompt interpretation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43256.md) | complete | Apr 24, 2026, 06:52 UTC |
| [#43313](https://github.com/openclaw/openclaw/issues/43313) | fix(media): classify audio-only MP4/M4A containers as audio, not video | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43313.md) | complete | Apr 24, 2026, 06:52 UTC |
| [#43368](https://github.com/openclaw/openclaw/issues/43368) | [Bug]: iClawd iOS 2.0.1 ElevenLabs TTS fails with 'Cannot read property Base64 of undefined' | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43368.md) | complete | Apr 24, 2026, 06:52 UTC |
| [#43348](https://github.com/openclaw/openclaw/pull/43348) | feat(acp): add acp_send tool and sessions_cancel tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43348.md) | complete | Apr 24, 2026, 06:52 UTC |
| [#43283](https://github.com/openclaw/openclaw/issues/43283) | [Bug]: Tools unavailable despite correct config | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43283.md) | complete | Apr 24, 2026, 06:52 UTC |
| [#43317](https://github.com/openclaw/openclaw/pull/43317) | feat(sandbox): pluggable provider interface + Docker/gVisor backends | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43317.md) | complete | Apr 24, 2026, 06:52 UTC |
| [#43340](https://github.com/openclaw/openclaw/pull/43340) | docs: add troubleshooting note for upstream 403 blocked responses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43340.md) | complete | Apr 24, 2026, 06:52 UTC |
| [#43301](https://github.com/openclaw/openclaw/issues/43301) | [Feature] Add ClawHub skill search in Control UI Skills panel | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43301.md) | complete | Apr 24, 2026, 06:52 UTC |
| [#43290](https://github.com/openclaw/openclaw/issues/43290) | Browser tool should support multi-session reuse of a single CDP instance (avoid SingletonLock conflicts) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43290.md) | complete | Apr 24, 2026, 06:52 UTC |
| [#43402](https://github.com/openclaw/openclaw/issues/43402) | Feature Request: Pass TELEGRAM_MESSAGE_THREAD_ID to Skills | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43402.md) | complete | Apr 24, 2026, 06:52 UTC |
| [#43398](https://github.com/openclaw/openclaw/issues/43398) | [Feature]: Parallel Web Search as Built-in web_search and web_fetch | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43398.md) | complete | Apr 24, 2026, 06:52 UTC |

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
