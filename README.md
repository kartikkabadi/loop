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

Last dashboard update: Apr 25, 2026, 04:39 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 04:40 UTC

State: Apply in progress

Checkpoint 3 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 150/500. Result records in checkpoint: 53.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24920756833](https://github.com/openclaw/clawsweeper/actions/runs/24920756833)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 9639 |
| Fresh reviewed issues in the last 7 days | 8902 |
| Proposed issue closes | 3691 (41.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6237 |
| Fresh reviewed PRs in the last 7 days | 5720 |
| Proposed PR closes | 1497 (26.2% of reviewed PRs) |
| Open items total | 15876 |
| Reviewed files | 14622 |
| Archived closed files | 2805 |
| Fresh verified reviews in the last 7 days | 14622 |
| Proposed closes awaiting apply | 5188 (35.5% of fresh reviews) |
| Closed by Codex apply | 2033 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 1254 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#68326](https://github.com/openclaw/openclaw/issues/68326) | [Bug]: Sub-agents default to amazon-bedrock instead of custom Anthropic provider, causes credit use; Need default model setup guidance | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68326.md) | complete | Apr 25, 2026, 04:27 UTC |
| [#68325](https://github.com/openclaw/openclaw/pull/68325) | telegram: add allowBots parity for inbound filtering | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68325.md) | complete | Apr 25, 2026, 04:27 UTC |
| [#68306](https://github.com/openclaw/openclaw/pull/68306) | fix(telegram): reject zero and negative replyToMessageId values | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68306.md) | complete | Apr 25, 2026, 04:27 UTC |
| [#68329](https://github.com/openclaw/openclaw/issues/68329) | cli-backend never triggers compaction (native or plugin) — context grows unbounded | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68329.md) | complete | Apr 25, 2026, 04:27 UTC |
| [#68305](https://github.com/openclaw/openclaw/issues/68305) | Reasoning stream warning incorrectly says 'Telegram only' but works in Lark/Feishu | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68305.md) | complete | Apr 25, 2026, 04:27 UTC |
| [#68341](https://github.com/openclaw/openclaw/pull/68341) | fix: remediate critical vulnerabilities and logic regressions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68341.md) | complete | Apr 25, 2026, 04:26 UTC |
| [#68321](https://github.com/openclaw/openclaw/pull/68321) | feat(elevenlabs): register eleven_v3 in TTS model allowlist | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68321.md) | complete | Apr 25, 2026, 04:26 UTC |
| [#68316](https://github.com/openclaw/openclaw/pull/68316) | Preserve unsent media payloads after block streaming | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68316.md) | complete | Apr 25, 2026, 04:26 UTC |
| [#68297](https://github.com/openclaw/openclaw/issues/68297) | [Feature]: Add --daemon-env flag to openclaw node install | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68297.md) | complete | Apr 25, 2026, 04:26 UTC |
| [#68251](https://github.com/openclaw/openclaw/issues/68251) | Memory search embed timeout — model not found for embeddings | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68251.md) | complete | Apr 25, 2026, 04:26 UTC |
| [#68337](https://github.com/openclaw/openclaw/pull/68337) | docs(acp): Add explicit warning on Docker deployment for ACP tools | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68337.md) | complete | Apr 25, 2026, 04:26 UTC |
| [#68303](https://github.com/openclaw/openclaw/issues/68303) | [OpenClaw][Dashboard] GUI accepts and buffers user messages with no UI indicator when sandbox SSH channel goes stale; flush arrives minutes later | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68303.md) | complete | Apr 25, 2026, 04:26 UTC |
| [#68301](https://github.com/openclaw/openclaw/pull/68301) | feat(node): add --daemon-env flag to openclaw node install | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68301.md) | complete | Apr 25, 2026, 04:26 UTC |
| [#68271](https://github.com/openclaw/openclaw/issues/68271) | feature: per-agent write-tool path allow/deny list | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68271.md) | complete | Apr 25, 2026, 04:26 UTC |
| [#68296](https://github.com/openclaw/openclaw/pull/68296) | fix(agents): add file and filePath aliases to read tool diagnostic path check | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68296.md) | complete | Apr 25, 2026, 04:26 UTC |
| [#68344](https://github.com/openclaw/openclaw/issues/68344) | [Bug]: Ollama integration issues: context window ignored + tool support blocking local models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68344.md) | complete | Apr 25, 2026, 04:26 UTC |
| [#68307](https://github.com/openclaw/openclaw/pull/68307) | fix(commands): emit WARN when bootstrap files are truncated | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68307.md) | complete | Apr 25, 2026, 04:26 UTC |
| [#68295](https://github.com/openclaw/openclaw/issues/68295) | Transcript jsonl stops appending mid-chat for telegram sessions (v2026.4.15) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68295.md) | complete | Apr 25, 2026, 04:26 UTC |
| [#68249](https://github.com/openclaw/openclaw/issues/68249) | [Bug]: Brave plugin enabled in config but not loaded at runtime — web_search tool unavailable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68249.md) | complete | Apr 25, 2026, 04:25 UTC |
| [#68340](https://github.com/openclaw/openclaw/issues/68340) | Gateway config.patch restart kills in-flight agent turn, causing corrupted session history and response loop | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68340.md) | complete | Apr 25, 2026, 04:25 UTC |

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

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

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
