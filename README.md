# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per open item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 24, 2026, 16:13 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12570 |
| Fresh reviewed issues in the last 7 days | 7451 |
| Proposed issue closes | 4171 (56% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6622 |
| Fresh reviewed PRs in the last 7 days | 3917 |
| Proposed PR closes | 1258 (32.1% of reviewed PRs) |
| Open items total | 19192 |
| Reviewed files | 11368 |
| Archived closed files | 11 |
| Fresh verified reviews in the last 7 days | 11368 |
| Proposed closes awaiting apply | 5429 (47.8% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 7824 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#57506](https://github.com/openclaw/openclaw/issues/57506) | tts tool ignores messages.tts.openai.baseUrl — hardcoded to Edge TTS regardless of config | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57506.md) | complete | Apr 24, 2026, 16:12 UTC |
| [#57512](https://github.com/openclaw/openclaw/issues/57512) | [slack] Configurable WebSocket reconnect attempts for socket-mode (code 1005 crash) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57512.md) | complete | Apr 24, 2026, 16:12 UTC |
| [#57468](https://github.com/openclaw/openclaw/pull/57468) | refactor(models): centralize model metadata and provider-aware resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57468.md) | complete | Apr 24, 2026, 16:12 UTC |
| [#57531](https://github.com/openclaw/openclaw/pull/57531) | feat(i18n): add Korean locale for control UI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57531.md) | complete | Apr 24, 2026, 16:11 UTC |
| [#57522](https://github.com/openclaw/openclaw/issues/57522) | [Feature]: Discord: stream tool-call activity as live status updates (edit-in-place or thread events) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57522.md) | complete | Apr 24, 2026, 16:11 UTC |
| [#57413](https://github.com/openclaw/openclaw/pull/57413) | feat(whatsapp): add reply quoting via replyToMode | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57413.md) | complete | Apr 24, 2026, 16:10 UTC |
| [#57384](https://github.com/openclaw/openclaw/issues/57384) | [Bug]: openclaw-weixin may lose the final reply after multi-tool agent turns | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57384.md) | complete | Apr 24, 2026, 16:10 UTC |
| [#57501](https://github.com/openclaw/openclaw/issues/57501) | isolated session 模型切换死循环 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57501.md) | complete | Apr 24, 2026, 16:10 UTC |
| [#57499](https://github.com/openclaw/openclaw/pull/57499) | fix: strip reasoning replay for Azure OpenAI Responses API | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57499.md) | complete | Apr 24, 2026, 16:10 UTC |
| [#57479](https://github.com/openclaw/openclaw/pull/57479) | AuthVault: Secure Isolated Sandbox for Secrets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57479.md) | complete | Apr 24, 2026, 16:10 UTC |
| [#57448](https://github.com/openclaw/openclaw/issues/57448) | [Feature]: DM conversation handoff for ACP agent sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57448.md) | complete | Apr 24, 2026, 16:10 UTC |
| [#57513](https://github.com/openclaw/openclaw/issues/57513) | Bug: agent-level  overrides entire tool profile instead of adding to it | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57513.md) | complete | Apr 24, 2026, 16:10 UTC |
| [#57491](https://github.com/openclaw/openclaw/issues/57491) | Cron delivery fails with 'Unknown Channel' when multiple channels configured | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57491.md) | complete | Apr 24, 2026, 16:10 UTC |
| [#57502](https://github.com/openclaw/openclaw/pull/57502) | fix: add Discord targetResolver to fix user:<id> delivery in isolated cron sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57502.md) | complete | Apr 24, 2026, 16:10 UTC |
| [#57425](https://github.com/openclaw/openclaw/issues/57425) | Feature: Graceful Gateway Restart with Session Recovery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57425.md) | complete | Apr 24, 2026, 16:10 UTC |
| [#57509](https://github.com/openclaw/openclaw/issues/57509) | [Bug]: Telegram helper-agent slash:<user> session keys are incorrectly mapped to group:<group_id>:topic:1 sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57509.md) | complete | Apr 24, 2026, 16:09 UTC |
| [#57521](https://github.com/openclaw/openclaw/issues/57521) | [Bug]: Heartbeat 触发时会话名称显示为 \"heartbeat\" 而非 Agent 身份名称 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57521.md) | complete | Apr 24, 2026, 16:09 UTC |
| [#57436](https://github.com/openclaw/openclaw/issues/57436) | [Bug]: agent kb returns hallucinated answers / pseudo-tool calls while memory search returns correct docs result | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57436.md) | complete | Apr 24, 2026, 16:09 UTC |
| [#57535](https://github.com/openclaw/openclaw/issues/57535) | Proposal: Add security warning for untrusted skills loaded from local sources | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57535.md) | complete | Apr 24, 2026, 16:09 UTC |
| [#57534](https://github.com/openclaw/openclaw/issues/57534) | sessions.list slow due to inline skillsSnapshot bloat in session store | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57534.md) | complete | Apr 24, 2026, 16:09 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking.

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
