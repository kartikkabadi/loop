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

Last dashboard update: Apr 24, 2026, 20:34 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 11833 |
| Fresh reviewed issues in the last 7 days | 8848 |
| Proposed issue closes | 4599 (52% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6520 |
| Fresh reviewed PRs in the last 7 days | 4777 |
| Proposed PR closes | 1360 (28.5% of reviewed PRs) |
| Open items total | 18353 |
| Reviewed files | 13625 |
| Archived closed files | 841 |
| Fresh verified reviews in the last 7 days | 13625 |
| Proposed closes awaiting apply | 5959 (43.7% of fresh reviews) |
| Closed by Codex apply | 551 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 4728 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#63152](https://github.com/openclaw/openclaw/issues/63152) | [Bug]: Distillation pipeline edit race condition causing offset mismatch errors | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63152.md) | complete | Apr 24, 2026, 20:34 UTC |
| [#63194](https://github.com/openclaw/openclaw/issues/63194) | Built-in exec from Control UI always fails with \"pairing required\" on local Windows gateway, even with auth disabled and full local exec approvals | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63194.md) | complete | Apr 24, 2026, 20:33 UTC |
| [#63201](https://github.com/openclaw/openclaw/issues/63201) | Audio transcription silently fails with HTTP 400 when using undici's fetch dispatcher (FormData Content-Type not set) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63201.md) | complete | Apr 24, 2026, 20:33 UTC |
| [#63187](https://github.com/openclaw/openclaw/issues/63187) | [Feature]: 需要能够获取模型推理的TTFT | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63187.md) | complete | Apr 24, 2026, 20:33 UTC |
| [#63142](https://github.com/openclaw/openclaw/issues/63142) | [Bug]: mac-calendar skill: AppleScript queries miss iCloud-synced events on headless Mac servers | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63142.md) | complete | Apr 24, 2026, 20:33 UTC |
| [#63173](https://github.com/openclaw/openclaw/issues/63173) | [Bug]:  Kimi Code (Moonshot) Provider enters an infinite loop during tasks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63173.md) | complete | Apr 24, 2026, 20:33 UTC |
| [#63168](https://github.com/openclaw/openclaw/pull/63168) | plugins: preserve gateway-bindable hook runner | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63168.md) | complete | Apr 24, 2026, 20:32 UTC |
| [#63085](https://github.com/openclaw/openclaw/issues/63085) | [Bug]:OpenClaw and Ollama remote server (in local network) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63085.md) | complete | Apr 24, 2026, 20:31 UTC |
| [#63135](https://github.com/openclaw/openclaw/issues/63135) | [Bug]: Agents respond they are working on a request but then fail to perform any actions. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63135.md) | complete | Apr 24, 2026, 20:31 UTC |
| [#63193](https://github.com/openclaw/openclaw/pull/63193) | [codex] finish android release handoff | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63193.md) | complete | Apr 24, 2026, 20:31 UTC |
| [#63116](https://github.com/openclaw/openclaw/issues/63116) | Delivery-mirror session token overflow (204k > 200k) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63116.md) | complete | Apr 24, 2026, 20:31 UTC |
| [#63166](https://github.com/openclaw/openclaw/issues/63166) | [Bug]: Plugin loader can overwrite gateway-bindable hook runner during later default plugin loads | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63166.md) | complete | Apr 24, 2026, 20:31 UTC |
| [#63190](https://github.com/openclaw/openclaw/issues/63190) | [Bug]: Telegram voice note saved to inbound but not sent to ASR pipeline | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63190.md) | complete | Apr 24, 2026, 20:31 UTC |
| [#63189](https://github.com/openclaw/openclaw/issues/63189) | [Bug]: Streaming never ends (UI stuck) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63189.md) | complete | Apr 24, 2026, 20:31 UTC |
| [#63148](https://github.com/openclaw/openclaw/pull/63148) | feat(feishu): scope DM topic sessions + per-topic dispatch parallelism | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63148.md) | complete | Apr 24, 2026, 20:31 UTC |
| [#63200](https://github.com/openclaw/openclaw/issues/63200) | Idle-stream timeout (v3.31+) breaks local models with heavy context - PR #55072 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63200.md) | complete | Apr 24, 2026, 20:31 UTC |
| [#63107](https://github.com/openclaw/openclaw/issues/63107) | cron: systemEvent on main session silently ignores shell commands in payload text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63107.md) | complete | Apr 24, 2026, 20:31 UTC |
| [#63075](https://github.com/openclaw/openclaw/issues/63075) | Discord stale slash commands remain visible when channels.discord.commands.native=false | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63075.md) | complete | Apr 24, 2026, 20:31 UTC |
| [#63167](https://github.com/openclaw/openclaw/pull/63167) | fix(memory): report missing qmd workspace cwd | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63167.md) | complete | Apr 24, 2026, 20:31 UTC |
| [#63178](https://github.com/openclaw/openclaw/issues/63178) | Bug: Per-session /model override lost after compaction/fallback | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63178.md) | complete | Apr 24, 2026, 20:31 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. In workflow apply mode, the dashboard is left to the proposal publisher so apply and review lanes can push concurrently without racing on `README.md`. Apply runs also cap total processed items separately from fresh closes, which keeps recovery-heavy runs bounded. Apply mode defaults to `apply_min_age_days=30`, so new items are not auto-closed.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

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
