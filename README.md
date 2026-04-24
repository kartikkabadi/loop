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

Last dashboard update: Apr 24, 2026, 06:01 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19081 |
| Reviewed / proposed closes | 2986 / 1377 |
| Reviewed files | 2986 |
| Fresh verified reviews in the last 7 days | 2986 |
| Proposed closes awaiting apply | 1377 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 16095 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#41788](https://github.com/openclaw/openclaw/issues/41788) | Google Chat DM threading broken - each response creates new thread | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41788.md) | complete | Apr 24, 2026, 06:01 UTC |
| [#41753](https://github.com/openclaw/openclaw/issues/41753) | [Bug]: Intermittent Inbound Telegram DM Delivery Failure Persists in v2026.3. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41753.md) | complete | Apr 24, 2026, 05:58 UTC |
| [#41746](https://github.com/openclaw/openclaw/issues/41746) | [BUG]: 粘贴图片发送后图片数据丢失 Image Data Lost After Sending | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41746.md) | complete | Apr 24, 2026, 05:58 UTC |
| [#41739](https://github.com/openclaw/openclaw/issues/41739) | [Bug]: [Bug] Telegram replies are routed to the Web UI session instead of the  source channel | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41739.md) | complete | Apr 24, 2026, 05:58 UTC |
| [#41764](https://github.com/openclaw/openclaw/issues/41764) | [Bug] Cron job reports lastError even when message was delivered | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41764.md) | complete | Apr 24, 2026, 05:58 UTC |
| [#41779](https://github.com/openclaw/openclaw/issues/41779) | [Bug]: message action \"send\" silently ignores buffer/filename for Telegram attachments and returns ok=true | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41779.md) | complete | Apr 24, 2026, 05:58 UTC |
| [#41756](https://github.com/openclaw/openclaw/pull/41756) | fix: allow spawnedBy and spawnDepth for acp:* sessions (#41751) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41756.md) | complete | Apr 24, 2026, 05:57 UTC |
| [#41737](https://github.com/openclaw/openclaw/pull/41737) | vLLM: add endpoint lifecycle management, multi-endpoint selection, and stale default cleanup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41737.md) | complete | Apr 24, 2026, 05:57 UTC |
| [#41791](https://github.com/openclaw/openclaw/issues/41791) | Feature Request: Isolated Mode Filesystem Permissions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41791.md) | complete | Apr 24, 2026, 05:57 UTC |
| [#41770](https://github.com/openclaw/openclaw/pull/41770) | fix(memory): honor env proxy for remote embedding fetch | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41770.md) | complete | Apr 24, 2026, 05:57 UTC |
| [#41778](https://github.com/openclaw/openclaw/issues/41778) | openclaw-message OOM on 4GB servers since v2026.3.7 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41778.md) | complete | Apr 24, 2026, 05:57 UTC |
| [#41786](https://github.com/openclaw/openclaw/pull/41786) | add config restore command | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41786.md) | complete | Apr 24, 2026, 05:57 UTC |
| [#41749](https://github.com/openclaw/openclaw/issues/41749) | [Feature]: External AI Collaboration Framework with Human-Authorized Feedback for Complex Multi-Agent Projects like SkyCetus | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41749.md) | complete | Apr 24, 2026, 05:57 UTC |
| [#41708](https://github.com/openclaw/openclaw/issues/41708) | [Bug]:   Telegram fails on Sonnet 4.6, related to thinking blocks | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41708.md) | complete | Apr 24, 2026, 05:57 UTC |
| [#41757](https://github.com/openclaw/openclaw/issues/41757) | [Bug]: Custom plugin tool is not surfaced to sandboxed agent sessions, but appears immediately when sandbox is removed | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41757.md) | complete | Apr 24, 2026, 05:57 UTC |
| [#41755](https://github.com/openclaw/openclaw/issues/41755) | [Bug]: Chat button state not restored after page refresh during active streaming | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41755.md) | complete | Apr 24, 2026, 05:56 UTC |
| [#41769](https://github.com/openclaw/openclaw/issues/41769) | sharp module fails to load on macOS ARM64 (v0.2.14) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41769.md) | complete | Apr 24, 2026, 05:56 UTC |
| [#41799](https://github.com/openclaw/openclaw/pull/41799) | fix(outbound): tolerate legacy plugin target normalizers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41799.md) | complete | Apr 24, 2026, 05:56 UTC |
| [#41758](https://github.com/openclaw/openclaw/pull/41758) | fix: detect and kill zombie Chrome processes before launch (#41750) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41758.md) | complete | Apr 24, 2026, 05:56 UTC |
| [#41654](https://github.com/openclaw/openclaw/issues/41654) | Cron subagent API errors (e.g. thinking block rejection) leak as visible channel messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41654.md) | complete | Apr 24, 2026, 05:56 UTC |

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
