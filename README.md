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

Last dashboard update: Apr 24, 2026, 03:39 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19148 |
| Reviewed / proposed closes | 1286 / 569 |
| Reviewed files | 1286 |
| Fresh verified reviews in the last 7 days | 1286 |
| Proposed closes awaiting apply | 569 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 17862 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#37857](https://github.com/openclaw/openclaw/issues/37857) | feishu-plugin-onboard doctor --fix disables most stock plugins (OpenClaw 2026.3.2) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37857.md) | complete | Apr 24, 2026, 03:39 UTC |
| [#37914](https://github.com/openclaw/openclaw/pull/37914) | fix(gateway): retry transient local rpc closes during startup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37914.md) | complete | Apr 24, 2026, 03:39 UTC |
| [#37930](https://github.com/openclaw/openclaw/pull/37930) | fix(cron): fsync store writes across rename/copy durability windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37930.md) | complete | Apr 24, 2026, 03:38 UTC |
| [#37856](https://github.com/openclaw/openclaw/pull/37856) | [codex] Surface google-gemini-cli provider stalls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37856.md) | complete | Apr 24, 2026, 03:38 UTC |
| [#37865](https://github.com/openclaw/openclaw/issues/37865) | [Bug]: TUI and web UI: streaming text does not actually stream when using tools, it only shows up when finalized | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37865.md) | complete | Apr 24, 2026, 03:38 UTC |
| [#37898](https://github.com/openclaw/openclaw/pull/37898) | fix(discord): ignore synthetic thread starter messages in text-channel threads | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37898.md) | complete | Apr 24, 2026, 03:38 UTC |
| [#37869](https://github.com/openclaw/openclaw/issues/37869) | [Bug] ACP/acpx session accepted but never closes the loop; no history, no announce, no stream log | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37869.md) | complete | Apr 24, 2026, 03:38 UTC |
| [#37892](https://github.com/openclaw/openclaw/pull/37892) | fix(telegram): suppress bare Reasoning: prefix leak during Gemini streaming | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37892.md) | complete | Apr 24, 2026, 03:38 UTC |
| [#37904](https://github.com/openclaw/openclaw/pull/37904) | fix(reply): suppress JSON/channelData NO_REPLY action payloads | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37904.md) | complete | Apr 24, 2026, 03:38 UTC |
| [#37874](https://github.com/openclaw/openclaw/issues/37874) | TUI incorrectly tags messages with channel: telegram causing cross-delivery | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37874.md) | complete | Apr 24, 2026, 03:37 UTC |
| [#37907](https://github.com/openclaw/openclaw/issues/37907) | Mutating tool warning fires even when agent successfully recovered in the same turn | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37907.md) | complete | Apr 24, 2026, 03:37 UTC |
| [#37847](https://github.com/openclaw/openclaw/pull/37847) | feat(cron): support 'default' as special model value for runtime resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37847.md) | complete | Apr 24, 2026, 03:37 UTC |
| [#37885](https://github.com/openclaw/openclaw/pull/37885) | feat: add cron event support to Internal Hooks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37885.md) | complete | Apr 24, 2026, 03:37 UTC |
| [#37863](https://github.com/openclaw/openclaw/pull/37863) | fix(sessions): preserve idle reset timestamp in updateLastRoute | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37863.md) | complete | Apr 24, 2026, 03:37 UTC |
| [#37855](https://github.com/openclaw/openclaw/issues/37855) | [Feature]: Extend Internal Hooks to support cron lifecycle events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37855.md) | complete | Apr 24, 2026, 03:37 UTC |
| [#37846](https://github.com/openclaw/openclaw/issues/37846) | EROFS: Isolated cron session sandbox tries to write /file.lock at root (read-only), crashes before script executes | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37846.md) | complete | Apr 24, 2026, 03:37 UTC |
| [#37913](https://github.com/openclaw/openclaw/issues/37913) | [Bug]: Chrome extension relay: tab not found when using remote gateway + macOS node proxy (browser.proxy) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37913.md) | complete | Apr 24, 2026, 03:37 UTC |
| [#37813](https://github.com/openclaw/openclaw/issues/37813) | [Bug]: Unrecognised model IDs silently fall back to primary default — bypasses configured fallback chain and tool permissions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37813.md) | complete | Apr 24, 2026, 03:37 UTC |
| [#37834](https://github.com/openclaw/openclaw/issues/37834) | Session context corruption: orphaned tool_use ID causes permanent 400 loop after abort | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37834.md) | complete | Apr 24, 2026, 03:37 UTC |
| [#37833](https://github.com/openclaw/openclaw/issues/37833) | Feature Request: `agent:turn:end` internal hook event | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37833.md) | complete | Apr 24, 2026, 03:36 UTC |

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
npm run plan -- --batch-size 5 --shard-count 20 --max-pages 250 --codex-model gpt-5.4 --codex-reasoning-effort medium --codex-service-tier fast
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
