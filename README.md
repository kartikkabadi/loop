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

Last dashboard update: Apr 24, 2026, 21:21 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 11561 |
| Fresh reviewed issues in the last 7 days | 8852 |
| Proposed issue closes | 4418 (49.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6455 |
| Fresh reviewed PRs in the last 7 days | 4855 |
| Proposed PR closes | 1333 (27.5% of reviewed PRs) |
| Open items total | 18016 |
| Reviewed files | 13707 |
| Archived closed files | 1161 |
| Fresh verified reviews in the last 7 days | 13707 |
| Proposed closes awaiting apply | 5751 (42% of fresh reviews) |
| Closed by Codex apply | 871 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 4309 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#63847](https://github.com/openclaw/openclaw/pull/63847) | fix(cli): load plugins for memory commands so embedding providers register | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63847.md) | complete | Apr 24, 2026, 21:21 UTC |
| [#63813](https://github.com/openclaw/openclaw/issues/63813) | [Bug]: | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63813.md) | complete | Apr 24, 2026, 21:21 UTC |
| [#63820](https://github.com/openclaw/openclaw/issues/63820) | Daily session reset (mode=daily) does not fire for channel sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63820.md) | complete | Apr 24, 2026, 21:20 UTC |
| [#63815](https://github.com/openclaw/openclaw/issues/63815) | npm package missing qa/ assets causes completion cache failure | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63815.md) | complete | Apr 24, 2026, 21:20 UTC |
| [#63812](https://github.com/openclaw/openclaw/issues/63812) | WebUI skill toggle triggers stale schema validation error for tools.web.search | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63812.md) | complete | Apr 24, 2026, 21:19 UTC |
| [#63851](https://github.com/openclaw/openclaw/issues/63851) | Groq audio transcription sends JSON instead of multipart/form-data (v2026.4.9) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63851.md) | complete | Apr 24, 2026, 21:19 UTC |
| [#63805](https://github.com/openclaw/openclaw/issues/63805) | [Bug] Isolated cron agentTurn jobs with explicit timeoutSeconds still hard-killed at ~300s despite fix in v2026.4.9 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63805.md) | complete | Apr 24, 2026, 21:19 UTC |
| [#63787](https://github.com/openclaw/openclaw/issues/63787) | QA scenario pack path resolution fails in completion command | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63787.md) | complete | Apr 24, 2026, 21:19 UTC |
| [#63751](https://github.com/openclaw/openclaw/issues/63751) | [Bug]: models.mode: \"replace\" does not suppress Bedrock auto-discovered models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63751.md) | complete | Apr 24, 2026, 21:19 UTC |
| [#63811](https://github.com/openclaw/openclaw/issues/63811) | [Bug]: Telegram Plugin Auto-Restart Loop in 2026.4.9 — Bot Receives Messages But Never Responds | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63811.md) | complete | Apr 24, 2026, 21:19 UTC |
| [#63830](https://github.com/openclaw/openclaw/issues/63830) | Plugin services registered/loaded after runtime start may never receive host service.start() | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63830.md) | complete | Apr 24, 2026, 21:19 UTC |
| [#63826](https://github.com/openclaw/openclaw/pull/63826) | security: fix HIGH/CRITICAL vulns in skill scanner, SSRF, hook priority, and token verification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63826.md) | complete | Apr 24, 2026, 21:19 UTC |
| [#63773](https://github.com/openclaw/openclaw/issues/63773) | Bug: Subagent session JSONL does not record token usage (usage fields always 0) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63773.md) | complete | Apr 24, 2026, 21:18 UTC |
| [#63848](https://github.com/openclaw/openclaw/pull/63848) | fix: pass cfg to getMemoryEmbeddingProvider in memory-search resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63848.md) | complete | Apr 24, 2026, 21:18 UTC |
| [#63786](https://github.com/openclaw/openclaw/pull/63786) | fix: restore Copilot replay sanitization and ACP thread guards | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63786.md) | complete | Apr 24, 2026, 21:18 UTC |
| [#63806](https://github.com/openclaw/openclaw/pull/63806) | fix(exec): expand ~ in workdir and error on invalid path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63806.md) | complete | Apr 24, 2026, 21:18 UTC |
| [#63794](https://github.com/openclaw/openclaw/pull/63794) | fix: repair missing bin symlink after npm global update | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63794.md) | complete | Apr 24, 2026, 21:18 UTC |
| [#63845](https://github.com/openclaw/openclaw/issues/63845) | Tool granularity vs server-side aggregation — best practices for high-count skills / tools (65+)? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63845.md) | complete | Apr 24, 2026, 21:18 UTC |
| [#63819](https://github.com/openclaw/openclaw/issues/63819) | [Bug]: Session stuck in \"running\" status persists in v2026.4.9 — phaseBeforeAbort fix no longer sufficient | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63819.md) | complete | Apr 24, 2026, 21:18 UTC |
| [#63784](https://github.com/openclaw/openclaw/issues/63784) | Session lock file not released after LLM idle timeout (no gateway restart) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63784.md) | complete | Apr 24, 2026, 21:18 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. In workflow apply mode, the dashboard is left to the proposal publisher so apply and review lanes can push concurrently without racing on `README.md`. Apply runs also cap total processed items separately from fresh closes, which keeps recovery-heavy runs bounded. Apply mode defaults to `apply_min_age_days=30` and `apply_kind=issue`, so new items and PRs are not auto-closed by the issue cleanup lane.

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
