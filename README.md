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

Last dashboard update: Apr 24, 2026, 06:28 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12496 |
| Fresh reviewed issues in the last 7 days | 2377 |
| Proposed issue closes | 1232 (51.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6583 |
| Fresh reviewed PRs in the last 7 days | 1009 |
| Proposed PR closes | 325 (32.2% of reviewed PRs) |
| Open items total | 19079 |
| Reviewed files | 3386 |
| Fresh verified reviews in the last 7 days | 3386 |
| Proposed closes awaiting apply | 1557 (46% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 15693 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#42529](https://github.com/openclaw/openclaw/issues/42529) | Feature: Cron pre-flight scripts (gate enforcement before agent turn) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42529.md) | complete | Apr 24, 2026, 06:27 UTC |
| [#42542](https://github.com/openclaw/openclaw/pull/42542) | Workspace: omit missing BOOTSTRAP.md from context report after onboarding | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42542.md) | complete | Apr 24, 2026, 06:27 UTC |
| [#42555](https://github.com/openclaw/openclaw/pull/42555) | feat(slack): add configurable typing status messages per agent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42555.md) | complete | Apr 24, 2026, 06:27 UTC |
| [#42545](https://github.com/openclaw/openclaw/issues/42545) | Feature Request: Support Multimodal Inputs (Images/Files) in the OpenAI /v1/chat/completions Endpoint | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42545.md) | complete | Apr 24, 2026, 06:26 UTC |
| [#42539](https://github.com/openclaw/openclaw/issues/42539) | Feature: TTS delivery mode option — separate text + voice messages on Telegram | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42539.md) | complete | Apr 24, 2026, 06:26 UTC |
| [#42531](https://github.com/openclaw/openclaw/pull/42531) | fix(memory-lancedb): preserve dimensions for baseUrl embeddings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42531.md) | complete | Apr 24, 2026, 06:26 UTC |
| [#42538](https://github.com/openclaw/openclaw/issues/42538) | Bug: health endpoint returns incorrect running=false for WhatsApp | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42538.md) | complete | Apr 24, 2026, 06:26 UTC |
| [#42515](https://github.com/openclaw/openclaw/issues/42515) | [Bug]: Provider 400 error causes session deadlock — no user notification, no auto-recovery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42515.md) | complete | Apr 24, 2026, 06:26 UTC |
| [#42567](https://github.com/openclaw/openclaw/pull/42567) | fix(setup): enable named account when patching config | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42567.md) | complete | Apr 24, 2026, 06:26 UTC |
| [#42573](https://github.com/openclaw/openclaw/issues/42573) | macOS app install/onboarding creates separate ai.openclaw.gateway LaunchAgent alongside ai.openclaw.mac | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42573.md) | complete | Apr 24, 2026, 06:26 UTC |
| [#42550](https://github.com/openclaw/openclaw/issues/42550) | Bug: TUI displays <relevant-memories> block in assistant responses | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42550.md) | complete | Apr 24, 2026, 06:26 UTC |
| [#42469](https://github.com/openclaw/openclaw/issues/42469) | Raw tool payloads leak into chat; fallback appears unreliable after provider errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42469.md) | complete | Apr 24, 2026, 06:25 UTC |
| [#42495](https://github.com/openclaw/openclaw/issues/42495) | Heartbeat polls overwrite session displayName, breaking control UI session selector | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42495.md) | complete | Apr 24, 2026, 06:25 UTC |
| [#42541](https://github.com/openclaw/openclaw/issues/42541) | Gemini OAuth token auto-refresh silently fails — bare catch {} in dispatch swallows refresh errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42541.md) | complete | Apr 24, 2026, 06:25 UTC |
| [#42514](https://github.com/openclaw/openclaw/issues/42514) | [Bug]: AnyClaw dashboard loads on :19001 but disconnects from gateway (1006), forced ws://localhost:18789 after update | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42514.md) | complete | Apr 24, 2026, 06:25 UTC |
| [#42508](https://github.com/openclaw/openclaw/issues/42508) | Subagent skill resolution: ~ resolves to workspace root instead of home directory | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42508.md) | complete | Apr 24, 2026, 06:25 UTC |
| [#42546](https://github.com/openclaw/openclaw/pull/42546) | fix(imessage): prevent self-echo message loop | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42546.md) | complete | Apr 24, 2026, 06:25 UTC |
| [#42581](https://github.com/openclaw/openclaw/pull/42581) | fix: preprocess inbound audio before ACP dispatch | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42581.md) | complete | Apr 24, 2026, 06:25 UTC |
| [#42446](https://github.com/openclaw/openclaw/issues/42446) | [Bug]: Internal tool calls and file write output leaking into chat response | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42446.md) | complete | Apr 24, 2026, 06:25 UTC |
| [#42504](https://github.com/openclaw/openclaw/issues/42504) | Control UI: upload agent avatars from Agents tab | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42504.md) | complete | Apr 24, 2026, 06:25 UTC |

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
