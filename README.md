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

Last dashboard update: Apr 24, 2026, 09:33 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12526 |
| Fresh reviewed issues in the last 7 days | 3980 |
| Proposed issue closes | 2184 (54.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6593 |
| Fresh reviewed PRs in the last 7 days | 2006 |
| Proposed PR closes | 694 (34.6% of reviewed PRs) |
| Open items total | 19119 |
| Reviewed files | 5986 |
| Fresh verified reviews in the last 7 days | 5986 |
| Proposed closes awaiting apply | 2878 (48.1% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 13133 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#47617](https://github.com/openclaw/openclaw/pull/47617) | fix: add node-addon-api to dependencies for sharp native build | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47617.md) | complete | Apr 24, 2026, 09:32 UTC |
| [#47540](https://github.com/openclaw/openclaw/pull/47540) | fix(ui): split higher-rate threshold hints from model context limits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47540.md) | complete | Apr 24, 2026, 09:31 UTC |
| [#47683](https://github.com/openclaw/openclaw/issues/47683) | Plugin-registered tools via registerTool not surfaced to agent runtime | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47683.md) | complete | Apr 24, 2026, 09:30 UTC |
| [#47673](https://github.com/openclaw/openclaw/issues/47673) | Feature request: first-class ACPX support for Telegram topic/thread sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47673.md) | complete | Apr 24, 2026, 09:30 UTC |
| [#47635](https://github.com/openclaw/openclaw/pull/47635) | fix(gateway): proactive session archive cleanup at startup and on timer | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47635.md) | complete | Apr 24, 2026, 09:30 UTC |
| [#47606](https://github.com/openclaw/openclaw/issues/47606) | Execution anti-drift guards: artifact-gated status, escalation timers, and no-idle-after-green | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47606.md) | complete | Apr 24, 2026, 09:30 UTC |
| [#47613](https://github.com/openclaw/openclaw/pull/47613) | feat(agents): emit reasoning stream to gateway clients without channel callback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47613.md) | complete | Apr 24, 2026, 09:30 UTC |
| [#47608](https://github.com/openclaw/openclaw/issues/47608) | cron: script payload timeoutSeconds not enforced | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47608.md) | complete | Apr 24, 2026, 09:30 UTC |
| [#47612](https://github.com/openclaw/openclaw/issues/47612) | Add Common Pitfalls Reference to skill-creator | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47612.md) | complete | Apr 24, 2026, 09:30 UTC |
| [#47668](https://github.com/openclaw/openclaw/issues/47668) | Context/memory accumulates too quickly causing frequent session resets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47668.md) | complete | Apr 24, 2026, 09:29 UTC |
| [#47675](https://github.com/openclaw/openclaw/issues/47675) | Agent narrates tool calls with trailing colon, resulting in empty/incomplete messages delivered to users | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47675.md) | complete | Apr 24, 2026, 09:29 UTC |
| [#47649](https://github.com/openclaw/openclaw/issues/47649) | Discord PDF attachment over Nitro size limit crashes message listener | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47649.md) | complete | Apr 24, 2026, 09:29 UTC |
| [#47680](https://github.com/openclaw/openclaw/pull/47680) | fix: set Nested lane concurrency to prevent sessions_send serialization | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47680.md) | complete | Apr 24, 2026, 09:29 UTC |
| [#47457](https://github.com/openclaw/openclaw/issues/47457) | Feature request: mode=\"session\" without thread binding for headless sub-agent orchestration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47457.md) | complete | Apr 24, 2026, 09:29 UTC |
| [#47663](https://github.com/openclaw/openclaw/pull/47663) | fix(messages): add `unscheduledReminderNote` config to disable reminder guard note | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47663.md) | complete | Apr 24, 2026, 09:29 UTC |
| [#47627](https://github.com/openclaw/openclaw/pull/47627) | Cron: honor isolated agentTurn payload.model override (#47592) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47627.md) | complete | Apr 24, 2026, 09:29 UTC |
| [#47652](https://github.com/openclaw/openclaw/pull/47652) | fix(feishu): isolate per-account credential resolution to prevent full plugin crash | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47652.md) | complete | Apr 24, 2026, 09:29 UTC |
| [#47643](https://github.com/openclaw/openclaw/issues/47643) | [Bug]: Persistent Telegram Channel Issues: Sync Failures, Loops, and Config Changes Not Applying on Windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47643.md) | complete | Apr 24, 2026, 09:28 UTC |
| [#47619](https://github.com/openclaw/openclaw/pull/47619) | feat(skills): ClawTrust v1.13.0 — multi-chain Base Sepolia + SKALE Testnet (18 live contracts) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47619.md) | complete | Apr 24, 2026, 09:28 UTC |
| [#47524](https://github.com/openclaw/openclaw/issues/47524) | [Bug]: Cron delivery.mode=\"announce\" silently fails with multi-channel configurations | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47524.md) | complete | Apr 24, 2026, 09:28 UTC |

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
