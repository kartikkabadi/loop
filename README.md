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

Last dashboard update: Apr 24, 2026, 19:46 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 11950 |
| Fresh reviewed issues in the last 7 days | 8627 |
| Proposed issue closes | 4567 (52.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6537 |
| Fresh reviewed PRs in the last 7 days | 4646 |
| Proposed PR closes | 1359 (29.3% of reviewed PRs) |
| Open items total | 18487 |
| Reviewed files | 13273 |
| Archived closed files | 706 |
| Fresh verified reviews in the last 7 days | 13273 |
| Proposed closes awaiting apply | 5926 (44.6% of fresh reviews) |
| Closed by Codex apply | 420 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 5214 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#62397](https://github.com/openclaw/openclaw/issues/62397) | [Bug]: Cron runs finish with status ok but delivery is lost (not-delivered) and gateway throws \"Agent listener invoked outside active run\ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62397.md) | complete | Apr 24, 2026, 19:46 UTC |
| [#62344](https://github.com/openclaw/openclaw/issues/62344) | Model state bleeds from cron sessions to parent session | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62344.md) | complete | Apr 24, 2026, 19:44 UTC |
| [#62362](https://github.com/openclaw/openclaw/issues/62362) | Gateway crashes with 'Agent listener invoked outside active run' unhandled promise rejection | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62362.md) | complete | Apr 24, 2026, 19:44 UTC |
| [#62356](https://github.com/openclaw/openclaw/issues/62356) | [Bug]: CLI enters CPU 100% infinite loop on unknown/unregistered subcommands (v2026.4.5) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62356.md) | complete | Apr 24, 2026, 19:44 UTC |
| [#62349](https://github.com/openclaw/openclaw/pull/62349) | fix(logging): invalidate cached subsystem file loggers on date roll | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62349.md) | complete | Apr 24, 2026, 19:44 UTC |
| [#62367](https://github.com/openclaw/openclaw/issues/62367) | [Bug] GPT-5.4 nano no longer survives as nano in Codex runtime (2026.4.5) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62367.md) | complete | Apr 24, 2026, 19:44 UTC |
| [#62360](https://github.com/openclaw/openclaw/issues/62360) | [Bug] Subagent task stays in 'running' state forever when /approve is never given | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62360.md) | complete | Apr 24, 2026, 19:44 UTC |
| [#62342](https://github.com/openclaw/openclaw/issues/62342) | [Bug]: Agent listener invoked outside active run causes Gateway crash | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62342.md) | complete | Apr 24, 2026, 19:44 UTC |
| [#62336](https://github.com/openclaw/openclaw/issues/62336) | Webchat: 图片上传后回复 HEARTBEAT_OK，图片消息被吞掉 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62336.md) | complete | Apr 24, 2026, 19:44 UTC |
| [#62378](https://github.com/openclaw/openclaw/issues/62378) | Gateway crashes when background PTY output arrives after run is no longer active | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62378.md) | complete | Apr 24, 2026, 19:43 UTC |
| [#62375](https://github.com/openclaw/openclaw/issues/62375) | Auth key rotation not triggered by 400 billing errors (out of extra usage) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62375.md) | complete | Apr 24, 2026, 19:43 UTC |
| [#62346](https://github.com/openclaw/openclaw/pull/62346) | Avoid prefilling incomplete assistant text during recovery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62346.md) | complete | Apr 24, 2026, 19:43 UTC |
| [#62352](https://github.com/openclaw/openclaw/pull/62352) | fix(minimax): resolve env-style apiKey for TTS provider config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62352.md) | complete | Apr 24, 2026, 19:43 UTC |
| [#62395](https://github.com/openclaw/openclaw/issues/62395) | TUI can stay stuck in streaming state after reply is finished | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62395.md) | complete | Apr 24, 2026, 19:43 UTC |
| [#62364](https://github.com/openclaw/openclaw/issues/62364) | Slow startup with multiple providers (models.list takes 30+ seconds) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62364.md) | complete | Apr 24, 2026, 19:43 UTC |
| [#62292](https://github.com/openclaw/openclaw/issues/62292) | Telegram inbound images use describer-only path; never attached as native vision blocks (model receives `<media:image>` placeholder text) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62292.md) | complete | Apr 24, 2026, 19:43 UTC |
| [#62390](https://github.com/openclaw/openclaw/issues/62390) | [Bug]: buildQualifiedChatModelValue ignores provider when model already contains slash | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62390.md) | complete | Apr 24, 2026, 19:43 UTC |
| [#62384](https://github.com/openclaw/openclaw/issues/62384) | Subagents spawned via sessions_spawn cannot use browser, web_search, web_fetch despite alsoAllow config | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62384.md) | complete | Apr 24, 2026, 19:43 UTC |
| [#62370](https://github.com/openclaw/openclaw/issues/62370) | Skill 环境变量未注入到 exec 子进程 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62370.md) | complete | Apr 24, 2026, 19:43 UTC |
| [#62301](https://github.com/openclaw/openclaw/issues/62301) | [Bug]: Unhandled promise rejection \"Agent listener invoked outside active run\" with openai-codex/gpt-5.4 provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62301.md) | complete | Apr 24, 2026, 19:43 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. In workflow apply mode, the dashboard is left to the proposal publisher so apply and review lanes can push concurrently without racing on `README.md`. Apply runs also cap total processed items separately from fresh closes, which keeps recovery-heavy runs bounded.

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
