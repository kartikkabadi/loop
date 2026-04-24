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

Last dashboard update: Apr 24, 2026, 21:38 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 11548 |
| Fresh reviewed issues in the last 7 days | 8981 |
| Proposed issue closes | 4475 (49.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6451 |
| Fresh reviewed PRs in the last 7 days | 4914 |
| Proposed PR closes | 1344 (27.4% of reviewed PRs) |
| Open items total | 17999 |
| Reviewed files | 13895 |
| Archived closed files | 1173 |
| Fresh verified reviews in the last 7 days | 13895 |
| Proposed closes awaiting apply | 5819 (41.9% of fresh reviews) |
| Closed by Codex apply | 883 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 4104 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#64190](https://github.com/openclaw/openclaw/issues/64190) | [Feature]: Batch ack reactions when inbound debounce is active | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64190.md) | complete | Apr 24, 2026, 21:37 UTC |
| [#64212](https://github.com/openclaw/openclaw/issues/64212) | [Bug]: Image tool fails with \"Request was aborted\" for NVIDIA Kimi K2.5 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64212.md) | complete | Apr 24, 2026, 21:36 UTC |
| [#64216](https://github.com/openclaw/openclaw/issues/64216) | CLI browser commands hang 30-60s after output (WSL2/Linux, not just Windows) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64216.md) | complete | Apr 24, 2026, 21:35 UTC |
| [#64211](https://github.com/openclaw/openclaw/issues/64211) | [Bug] openclaw cron add command hangs/times out on Windows | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64211.md) | complete | Apr 24, 2026, 21:35 UTC |
| [#64193](https://github.com/openclaw/openclaw/pull/64193) | Plugins/StepFun: refine onboarding UX | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64193.md) | complete | Apr 24, 2026, 21:35 UTC |
| [#64233](https://github.com/openclaw/openclaw/issues/64233) | benchmarks: add GPT-5.4 vs Opus 4.6 agentic parity harness and release gate | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64233.md) | complete | Apr 24, 2026, 21:34 UTC |
| [#64195](https://github.com/openclaw/openclaw/issues/64195) | [Bug]: dirty data from old session when /new start a new session in 4.5 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64195.md) | complete | Apr 24, 2026, 21:34 UTC |
| [#64226](https://github.com/openclaw/openclaw/issues/64226) | WhatsApp media send silently fails in 2026.4.5+ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64226.md) | complete | Apr 24, 2026, 21:34 UTC |
| [#64117](https://github.com/openclaw/openclaw/issues/64117) | [Bug]: voice-call tool/CLI always hits EADDRINUSE | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64117.md) | complete | Apr 24, 2026, 21:34 UTC |
| [#64187](https://github.com/openclaw/openclaw/issues/64187) | [Bug]: Windows memory search hits EBUSY during sqlite atomic reindex swap | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64187.md) | complete | Apr 24, 2026, 21:34 UTC |
| [#64197](https://github.com/openclaw/openclaw/pull/64197) | feat(gateway): add skills.download and skills.remove RPC methods | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64197.md) | complete | Apr 24, 2026, 21:34 UTC |
| [#64182](https://github.com/openclaw/openclaw/pull/64182) | Reply: allow authorized group command sessions to receive tool updates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64182.md) | complete | Apr 24, 2026, 21:34 UTC |
| [#64136](https://github.com/openclaw/openclaw/pull/64136) | fix(config): dedupe repeated warning logs on unchanged reloads | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64136.md) | complete | Apr 24, 2026, 21:34 UTC |
| [#64177](https://github.com/openclaw/openclaw/pull/64177) | fix(tts): pass configured voice into tts tool | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64177.md) | complete | Apr 24, 2026, 21:34 UTC |
| [#64213](https://github.com/openclaw/openclaw/issues/64213) | [Bug] Custom provider models with input: [\"text\", \"image\"] are treated as text-only when missing from gateway model catalog | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64213.md) | complete | Apr 24, 2026, 21:34 UTC |
| [#64153](https://github.com/openclaw/openclaw/issues/64153) | [Bug]: TTS tool ignores edge.voice config | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64153.md) | complete | Apr 24, 2026, 21:33 UTC |
| [#64201](https://github.com/openclaw/openclaw/issues/64201) | [Bug]: OpenClaw: Crash loop on plugin config reload (ECONNREFUSED on loopback port 18789) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64201.md) | complete | Apr 24, 2026, 21:33 UTC |
| [#64169](https://github.com/openclaw/openclaw/issues/64169) | [Bug] MCP stdio server processes accumulate as children of gateway — never reaped when new session spawns fresh pool | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64169.md) | complete | Apr 24, 2026, 21:33 UTC |
| [#64217](https://github.com/openclaw/openclaw/issues/64217) | [Bug]: Source-dependent instructions/tools drift invalidates OpenAI prompt cache within the same session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64217.md) | complete | Apr 24, 2026, 21:33 UTC |
| [#64179](https://github.com/openclaw/openclaw/pull/64179) | Agents: add localized tool summaries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64179.md) | complete | Apr 24, 2026, 21:33 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. In workflow apply mode, the dashboard is left to the proposal publisher so apply and review lanes can push concurrently without racing on `README.md`. Apply runs also cap total processed items separately from fresh closes, with enough scan room to skip changed or already-closed records and still reach fresh closures. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 15-second close delay, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded.

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
