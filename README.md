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

Last dashboard update: Apr 24, 2026, 18:04 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12506 |
| Fresh reviewed issues in the last 7 days | 8355 |
| Proposed issue closes | 4676 (56% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6613 |
| Fresh reviewed PRs in the last 7 days | 4362 |
| Proposed PR closes | 1353 (31% of reviewed PRs) |
| Open items total | 19119 |
| Reviewed files | 12717 |
| Archived closed files | 62 |
| Fresh verified reviews in the last 7 days | 12717 |
| Proposed closes awaiting apply | 6029 (47.4% of fresh reviews) |
| Closed by Codex apply | 50 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 6402 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#60182](https://github.com/openclaw/openclaw/issues/60182) | OpenAI OAuth re-onboard only updates main agent auth-profiles.json, leaving non-main agents with stale auth | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60182.md) | complete | Apr 24, 2026, 18:00 UTC |
| [#60149](https://github.com/openclaw/openclaw/issues/60149) | [Bug]: Gateway fails to start when creating new agent via wizard with Feishu account binding | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60149.md) | complete | Apr 24, 2026, 18:00 UTC |
| [#60151](https://github.com/openclaw/openclaw/issues/60151) | [Feature] Configurable exec tool timeout upper bound in openclaw.json | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60151.md) | complete | Apr 24, 2026, 18:00 UTC |
| [#60164](https://github.com/openclaw/openclaw/issues/60164) | CLI console.log output captured in structured log file, bypassing logging.level | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60164.md) | complete | Apr 24, 2026, 17:59 UTC |
| [#60152](https://github.com/openclaw/openclaw/issues/60152) | Feature Request: Config-based skill disabling (skills.disabled) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60152.md) | complete | Apr 24, 2026, 17:59 UTC |
| [#60180](https://github.com/openclaw/openclaw/issues/60180) | Gateway hangs on shutdown when Telegram API is unreachable | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60180.md) | complete | Apr 24, 2026, 17:59 UTC |
| [#60170](https://github.com/openclaw/openclaw/pull/60170) | fix: add crash loop circuit breaker to prevent infinite restart loops | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60170.md) | complete | Apr 24, 2026, 17:59 UTC |
| [#60154](https://github.com/openclaw/openclaw/issues/60154) | [Feature]: Per-account media inbound directory for multi-account Feishu | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60154.md) | complete | Apr 24, 2026, 17:59 UTC |
| [#60157](https://github.com/openclaw/openclaw/pull/60157) | fix(agents): add null guards to prevent TypeError on undefined .replace() calls | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60157.md) | complete | Apr 24, 2026, 17:59 UTC |
| [#60113](https://github.com/openclaw/openclaw/issues/60113) | TypeError: Cannot read properties of undefined (reading \"replace\") during embedded agent run (v2026.4.1) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60113.md) | complete | Apr 24, 2026, 17:59 UTC |
| [#60105](https://github.com/openclaw/openclaw/issues/60105) | Control UI web: image attachments not received by agent | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60105.md) | complete | Apr 24, 2026, 17:59 UTC |
| [#60174](https://github.com/openclaw/openclaw/issues/60174) | fix(providers): Claude on GitHub Copilot should default to anthropic-messages API for prompt caching | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60174.md) | complete | Apr 24, 2026, 17:58 UTC |
| [#60101](https://github.com/openclaw/openclaw/issues/60101) | [Bug] Ollama adapter drops tool_calls when response includes thinking field | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60101.md) | complete | Apr 24, 2026, 17:58 UTC |
| [#60082](https://github.com/openclaw/openclaw/issues/60082) | [Bug]: 异步工具执行结果无法显示在回复中 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60082.md) | complete | Apr 24, 2026, 17:58 UTC |
| [#60088](https://github.com/openclaw/openclaw/issues/60088) | [Bug]: Telegram Channel Stops Responding After First Message | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60088.md) | complete | Apr 24, 2026, 17:58 UTC |
| [#60143](https://github.com/openclaw/openclaw/issues/60143) | Plugin config error causes hard gateway crash instead of graceful disable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60143.md) | complete | Apr 24, 2026, 17:57 UTC |
| [#60142](https://github.com/openclaw/openclaw/issues/60142) | Gateway crash loop: no backoff or circuit-breaker on auto-restart | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60142.md) | complete | Apr 24, 2026, 17:57 UTC |
| [#60103](https://github.com/openclaw/openclaw/issues/60103) | [Feishu] Auto-normalize @mention syntax across message formats (card/text/post) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60103.md) | complete | Apr 24, 2026, 17:57 UTC |
| [#60118](https://github.com/openclaw/openclaw/issues/60118) | [Bug]: voice-call responseModel config ignored — LiveSessionModelSwitchError overrides to global default | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60118.md) | complete | Apr 24, 2026, 17:57 UTC |
| [#60165](https://github.com/openclaw/openclaw/issues/60165) | [功能建议] exec 工具应自动加载用户的 shell 配置文件（如 ~/.zshrc） | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60165.md) | complete | Apr 24, 2026, 17:57 UTC |

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
