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

Last dashboard update: Apr 24, 2026, 19:56 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 11947 |
| Fresh reviewed issues in the last 7 days | 8691 |
| Proposed issue closes | 4596 (52.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6535 |
| Fresh reviewed PRs in the last 7 days | 4671 |
| Proposed PR closes | 1363 (29.2% of reviewed PRs) |
| Open items total | 18482 |
| Reviewed files | 13362 |
| Archived closed files | 706 |
| Fresh verified reviews in the last 7 days | 13362 |
| Proposed closes awaiting apply | 5959 (44.6% of fresh reviews) |
| Closed by Codex apply | 420 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 5120 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#62522](https://github.com/openclaw/openclaw/issues/62522) | [Bug]: openclaw status loads ALL channel plugins regardless of enabled state | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62522.md) | complete | Apr 24, 2026, 19:55 UTC |
| [#62511](https://github.com/openclaw/openclaw/issues/62511) | [Bug]: External plugins fail to load on 2026.4.5: normalizeAccountId is not a function | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62511.md) | complete | Apr 24, 2026, 19:54 UTC |
| [#62466](https://github.com/openclaw/openclaw/issues/62466) | [Bug] read tool allows offset beyond file length causing crash | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62466.md) | complete | Apr 24, 2026, 19:54 UTC |
| [#62565](https://github.com/openclaw/openclaw/pull/62565) | Sophia discord rollout | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62565.md) | complete | Apr 24, 2026, 19:54 UTC |
| [#62486](https://github.com/openclaw/openclaw/issues/62486) | [Bug]: 2026.4.2 版本三个影响体验的问题 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62486.md) | complete | Apr 24, 2026, 19:54 UTC |
| [#62579](https://github.com/openclaw/openclaw/issues/62579) | [Windows] QMD collection name mismatch: creates memory-root-main but queries memory-alt-main | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62579.md) | complete | Apr 24, 2026, 19:54 UTC |
| [#62560](https://github.com/openclaw/openclaw/issues/62560) | Bug: SSRF guard blocks ALL external URLs when using local proxy (affects Telegram media/WeChat/web_fetch) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62560.md) | complete | Apr 24, 2026, 19:54 UTC |
| [#62567](https://github.com/openclaw/openclaw/issues/62567) | [Bug] 2026.4.5: ComfyUI Provider image workflow config schema conflict | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62567.md) | complete | Apr 24, 2026, 19:54 UTC |
| [#62476](https://github.com/openclaw/openclaw/pull/62476) | feat(exec): add Zsh dangerous commands and process substitution detection | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62476.md) | complete | Apr 24, 2026, 19:54 UTC |
| [#62552](https://github.com/openclaw/openclaw/pull/62552) | fix(acp): stabilize bridge session keys | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62552.md) | complete | Apr 24, 2026, 19:53 UTC |
| [#62469](https://github.com/openclaw/openclaw/issues/62469) | [Bug] workflow agent runs causing nested timeout cascading failures | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62469.md) | complete | Apr 24, 2026, 19:53 UTC |
| [#62480](https://github.com/openclaw/openclaw/issues/62480) | [Bug] memory-tdai plugin repeatedly re-registering causing log spam (OpenClaw 2026.4.5) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62480.md) | complete | Apr 24, 2026, 19:53 UTC |
| [#62576](https://github.com/openclaw/openclaw/issues/62576) | [Bug]: Telegram approval/system messages may be broadcast to multiple authorized users instead of the originating chat | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62576.md) | complete | Apr 24, 2026, 19:53 UTC |
| [#62468](https://github.com/openclaw/openclaw/issues/62468) | [Bug] Feishu message delivery fails with 'Unknown target jaydenli' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62468.md) | complete | Apr 24, 2026, 19:53 UTC |
| [#62478](https://github.com/openclaw/openclaw/issues/62478) | [Feature]: Background sub-agent spawn mode — parent session completes immediately while children run async | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62478.md) | complete | Apr 24, 2026, 19:53 UTC |
| [#62498](https://github.com/openclaw/openclaw/issues/62498) | [Bug]: Media download failed in v2026.4.5 (Re-occurrence of #32326) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62498.md) | complete | Apr 24, 2026, 19:53 UTC |
| [#62484](https://github.com/openclaw/openclaw/issues/62484) | openclaw tui -h causes 100% CPU hang and never exits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62484.md) | complete | Apr 24, 2026, 19:53 UTC |
| [#62527](https://github.com/openclaw/openclaw/pull/62527) | fix(cron): add jobId to payload.model warning log emission | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62527.md) | complete | Apr 24, 2026, 19:53 UTC |
| [#62463](https://github.com/openclaw/openclaw/issues/62463) | [Regression][v2026.4.5] session-recovery drops assistant messages with incomplete thinking | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62463.md) | complete | Apr 24, 2026, 19:53 UTC |
| [#62503](https://github.com/openclaw/openclaw/pull/62503) | feat: add devcontainer for cross-platform development | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62503.md) | complete | Apr 24, 2026, 19:53 UTC |

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
