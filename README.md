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

Last dashboard update: Apr 24, 2026, 13:53 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12565 |
| Fresh reviewed issues in the last 7 days | 6265 |
| Proposed issue closes | 3515 (56.1% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6615 |
| Fresh reviewed PRs in the last 7 days | 3314 |
| Proposed PR closes | 1092 (33% of reviewed PRs) |
| Open items total | 19180 |
| Reviewed files | 9579 |
| Fresh verified reviews in the last 7 days | 9579 |
| Proposed closes awaiting apply | 4607 (48.1% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 9601 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#54275](https://github.com/openclaw/openclaw/pull/54275) | docs: replace stale docs:build script references | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54275.md) | complete | Apr 24, 2026, 13:52 UTC |
| [#54254](https://github.com/openclaw/openclaw/issues/54254) | Telegram: bot gets stuck in 'typing' during long model inference, /stop unresponsive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54254.md) | complete | Apr 24, 2026, 13:52 UTC |
| [#54253](https://github.com/openclaw/openclaw/issues/54253) | [Bug]: OpenClaw returns \"run Error : LLM Request Failed\" on RISC-V64 System. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54253.md) | complete | Apr 24, 2026, 13:52 UTC |
| [#54300](https://github.com/openclaw/openclaw/issues/54300) | Low-risk: Docker Go template injection, thread-ownership URL path injection, TLS env bypass | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54300.md) | complete | Apr 24, 2026, 13:52 UTC |
| [#54299](https://github.com/openclaw/openclaw/issues/54299) | Bug: OAuth token exchange silently proceeds without client_secret + hardcoded redirect port | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54299.md) | complete | Apr 24, 2026, 13:51 UTC |
| [#54197](https://github.com/openclaw/openclaw/issues/54197) | [Bug]: Control UI chat missing message tool even though gateway catalog and Discord CLI actions work | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54197.md) | complete | Apr 24, 2026, 13:51 UTC |
| [#54296](https://github.com/openclaw/openclaw/issues/54296) | Bug: Non-atomic write of exec-approvals file + unbounded transcript readFileSync | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54296.md) | complete | Apr 24, 2026, 13:51 UTC |
| [#54308](https://github.com/openclaw/openclaw/pull/54308) | Fix/discord teardown final | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54308.md) | complete | Apr 24, 2026, 13:50 UTC |
| [#54220](https://github.com/openclaw/openclaw/issues/54220) | `[Bug]: Discord inbound reply delivery bypasses message_sending plugin hook` | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54220.md) | complete | Apr 24, 2026, 13:50 UTC |
| [#54284](https://github.com/openclaw/openclaw/issues/54284) | [Bug]: Regression in 2026.3.23(-2): openai-codex OAuth succeeds but model becomes unusable with refresh_token_reused | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54284.md) | complete | Apr 24, 2026, 13:50 UTC |
| [#54239](https://github.com/openclaw/openclaw/pull/54239) | cron/heartbeat: add preHook gate for pre-run script checks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54239.md) | complete | Apr 24, 2026, 13:50 UTC |
| [#54291](https://github.com/openclaw/openclaw/issues/54291) | Security: Information leakage via unfiltered error object serialization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54291.md) | complete | Apr 24, 2026, 13:50 UTC |
| [#54255](https://github.com/openclaw/openclaw/issues/54255) | [Bug]: Control UI renders NO_REPLY as \"NO_\" instead of suppressing it | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54255.md) | complete | Apr 24, 2026, 13:50 UTC |
| [#54246](https://github.com/openclaw/openclaw/issues/54246) | [Feature]: Configurable session reset prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54246.md) | complete | Apr 24, 2026, 13:50 UTC |
| [#54309](https://github.com/openclaw/openclaw/pull/54309) | feat(infra): add AgentProcessFactory for plugin-driven worker process spawning | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54309.md) | complete | Apr 24, 2026, 13:50 UTC |
| [#54188](https://github.com/openclaw/openclaw/issues/54188) | Cron jobs with delivery.mode='none' get false 'Message failed' errors | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54188.md) | complete | Apr 24, 2026, 13:50 UTC |
| [#54279](https://github.com/openclaw/openclaw/issues/54279) | [Bug]: memory_search with Gemini embeddings does not honor HTTP(S) proxy in 2026.3.23-2 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54279.md) | complete | Apr 24, 2026, 13:50 UTC |
| [#54242](https://github.com/openclaw/openclaw/issues/54242) | [Bug]: backup archives can contain hardlink targets with '..' that fail broad extraction on macOS tar | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54242.md) | complete | Apr 24, 2026, 13:50 UTC |
| [#54297](https://github.com/openclaw/openclaw/issues/54297) | Bug: WhatsApp encrypted media temp files not cleaned up on failure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54297.md) | complete | Apr 24, 2026, 13:49 UTC |
| [#54218](https://github.com/openclaw/openclaw/issues/54218) | [Bug]: Token Usage Data Drops Between pi-ai Stream and Session Persistence | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54218.md) | complete | Apr 24, 2026, 13:49 UTC |

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
