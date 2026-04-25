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

Last dashboard update: Apr 25, 2026, 22:12 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 22:12 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24941898995](https://github.com/openclaw/clawsweeper/actions/runs/24941898995)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5512 |
| Fresh reviewed issues in the last 7 days | 5486 |
| Proposed issue closes | 259 (4.7% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4273 |
| Fresh reviewed PRs in the last 7 days | 4202 |
| Proposed PR closes | 46 (1.1% of reviewed PRs) |
| Open items total | 9785 |
| Reviewed files | 9688 |
| Unreviewed open items | 97 |
| Archived closed files | 9609 |
| Fresh verified reviews in the last 7 days | 9688 |
| Proposed closes awaiting apply | 305 (3.1% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 6368/6918 current (550 due, 92%) |
| Daily PR cadence | 3947/4202 current (255 due, 93.9%) |
| Daily new issue cadence (<30d) | 2421/2716 current (295 due, 89.1%) |
| Weekly older issue cadence | 2770/2770 current (0 due, 100%) |
| Due now by cadence | 647 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#37804](https://github.com/openclaw/openclaw/issues/37804) | RFC: treat models.providers-injected models as first-class forward-compat models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37804.md) | complete | Apr 25, 2026, 22:11 UTC |
| [#37815](https://github.com/openclaw/openclaw/issues/37815) | Feature Request: Native prompt scrubbing / PII redaction before sending to LLM providers | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37815.md) | complete | Apr 25, 2026, 22:11 UTC |
| [#35028](https://github.com/openclaw/openclaw/issues/35028) | ACP sessions: sessions_spawn(acp) produces empty sessions_history; identity reconcile fails; transcriptPath null | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/35028.md) | complete | Apr 25, 2026, 22:10 UTC |
| [#37647](https://github.com/openclaw/openclaw/issues/37647) | [Bug]: TUI doesn't display assistant replies, but webchat works fine | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37647.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#37487](https://github.com/openclaw/openclaw/issues/37487) | [Feature]: Feature request: Per-agent isolated browser instances with per-profile proxy support (concurrent execution) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37487.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#35568](https://github.com/openclaw/openclaw/issues/35568) | Request: Retain support for the imsg iMessage integration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/35568.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#37651](https://github.com/openclaw/openclaw/issues/37651) | Feature request: Add lightweight shell payload type for cron jobs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37651.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#37833](https://github.com/openclaw/openclaw/issues/37833) | Feature Request: `agent:turn:end` internal hook event | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37833.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#37718](https://github.com/openclaw/openclaw/issues/37718) | [Bug]: Gateway health check fails when using secrets reference format for channel credentials (cfg?.appId?.trim is not a function) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37718.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#37446](https://github.com/openclaw/openclaw/issues/37446) | Sub-agent timeout recovery creates duplicate API posts (idempotency gap) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37446.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#37626](https://github.com/openclaw/openclaw/issues/37626) | [feishu plugin] wiki spaceNode.list 分页不生效，只返回前20条记录 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37626.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#37659](https://github.com/openclaw/openclaw/issues/37659) | docs: improve safe-mode agent instructions for token updates and OAuth re-auth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37659.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#35573](https://github.com/openclaw/openclaw/issues/35573) | [Feature]: Native fal.ai provider support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35573.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#34252](https://github.com/openclaw/openclaw/issues/34252) | [Feature]: Allow multiple Ollama Providers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/34252.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#35515](https://github.com/openclaw/openclaw/issues/35515) | Request: Android APK release | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35515.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#37816](https://github.com/openclaw/openclaw/issues/37816) | [Feature]: Telegram — full agent activity visibility (Web UI parity) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37816.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#34493](https://github.com/openclaw/openclaw/issues/34493) | [RFC] Memory Consolidation via Zettelkasten-Linked Graph + PPR Retrieval + Sleep Consolidation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/34493.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#37705](https://github.com/openclaw/openclaw/issues/37705) | [Bug]: Gateway Launch Failure:  Label cannot be longer than 63 bytes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37705.md) | complete | Apr 25, 2026, 22:09 UTC |
| [#37746](https://github.com/openclaw/openclaw/issues/37746) | [Feature]: Sandboxed skill functions for remote heartbeat instructions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37746.md) | complete | Apr 25, 2026, 22:08 UTC |
| [#36101](https://github.com/openclaw/openclaw/issues/36101) | [Feature]: Per-chat-type model routing (DM vs Group Chat) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/36101.md) | complete | Apr 25, 2026, 22:08 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes during review. `apply_existing=true` is the only workflow mode that comments or closes items.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Pre-hydrates compact related issue/PR context referenced from the item body, comments, timeline, or PR review comments.
5. Runs Codex with `gpt-5.5`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
6. Writes `items/<number>.md` with the decision, proposed close comment, review runtime (`review_model`, `review_reasoning_effort`, sandbox, service tier), and a GitHub snapshot hash.
7. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, runs Codex without the nested Linux sandbox that blocks shell inspection on GitHub runners, checks the checkout again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. A review policy change, including model, reasoning effort, sandbox, service tier, prompt, or schema changes, also makes old reports due again. When more items are due than fit in a run, the planner prioritizes active items first, then policy-stale reports, then PRs, then new issues, then older weekly reviews. The dashboard reports local cadence coverage for daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Transient GitHub API/network failures use shorter retries so long scans can survive connection resets or gateway errors. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

`npm run audit` compares live open GitHub items with the generated `items/` and `closed/` records without moving files. It reports missing open records, open records still archived under `closed/`, stale `items/` records that no longer appear open, duplicate markdown records, protected-label proposed closes, and stale review-status records. Use `--output audit-report.json` for the full report, `--sample-limit N` to control console samples, and `--strict` to exit non-zero when state drift is present.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 50 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run audit -- --max-pages 250 --sample-limit 25
npm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later.

## Checks

```bash
npm run check
npm run oxformat
```

`oxformat` is an alias for `oxfmt`; there is no separate `oxformat` npm package.

## GitHub Actions Setup

Required secrets:

- `OPENAI_API_KEY`: OpenAI API key used to log Codex in before review shards run.
- `CODEX_API_KEY`: optional compatibility alias for the same key during the login check.
- `OPENCLAW_GH_TOKEN`: GitHub token with write access to `openclaw/openclaw` issues and PRs.

The workflow logs Codex in with `OPENAI_API_KEY`, then runs review shards without OpenAI, Codex, or GitHub token environment variables. Parent ClawSweeper code uses `OPENCLAW_GH_TOKEN` to gather target and related GitHub context before invoking Codex. `codex exec` uses the prepared login state, and the shard fails instead of writing fallback review markdown if Codex auth/output fails. It uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
