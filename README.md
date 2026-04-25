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

Last dashboard update: Apr 25, 2026, 08:24 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 08:24 UTC

State: Apply in progress

Checkpoint 3 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 150/500. Result records in checkpoint: 53.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24926354430](https://github.com/openclaw/clawsweeper/actions/runs/24926354430)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 8820 |
| Fresh reviewed issues in the last 7 days | 8864 |
| Proposed issue closes | 3306 (37.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5504 |
| Fresh reviewed PRs in the last 7 days | 5719 |
| Proposed PR closes | 960 (16.8% of reviewed PRs) |
| Open items total | 14324 |
| Reviewed files | 14583 |
| Unreviewed open items | 0 |
| Archived closed files | 4167 |
| Fresh verified reviews in the last 7 days | 14583 |
| Proposed closes awaiting apply | 4266 (29.3% of fresh reviews) |
| Closed by Codex apply | 3257 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 11158/11158 current (0 due, 100%) |
| Daily PR cadence | 5504/5504 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 5654/5654 current (0 due, 100%) |
| Weekly older issue cadence | 3210/3210 current (0 due, 100%) |
| Due now by cadence | 0 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#70238](https://github.com/openclaw/openclaw/issues/70238) | [Bug]: Gateway OpenCLAW spawns flashing command prompt windows in background on Windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70238.md) | complete | Apr 25, 2026, 08:12 UTC |
| [#70242](https://github.com/openclaw/openclaw/issues/70242) | wiki.bridge.import returns 0 artifacts on 4.21 despite memory-core publicArtifacts registered | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70242.md) | complete | Apr 25, 2026, 08:11 UTC |
| [#70209](https://github.com/openclaw/openclaw/issues/70209) | [Bug]: lark typing reaction applied to main thread message when customer reply in a thread | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70209.md) | complete | Apr 25, 2026, 08:11 UTC |
| [#70264](https://github.com/openclaw/openclaw/issues/70264) | ACP spawn + streamTo=parent does not wake parent session on child completion (heartbeat enabled; distinct from #52249) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70264.md) | complete | Apr 25, 2026, 08:11 UTC |
| [#70076](https://github.com/openclaw/openclaw/issues/70076) | [Ballast] Journal page — health magazine/digest design and setup | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70076.md) | complete | Apr 25, 2026, 08:11 UTC |
| [#70277](https://github.com/openclaw/openclaw/issues/70277) | [Bug]: [Bug]: Signal inbound media path rejected by image tool allowed-root check on 2026.4.21 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70277.md) | complete | Apr 25, 2026, 08:10 UTC |
| [#70171](https://github.com/openclaw/openclaw/issues/70171) | [Bug]: idk where to start, so i won't | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70171.md) | complete | Apr 25, 2026, 08:10 UTC |
| [#70116](https://github.com/openclaw/openclaw/issues/70116) | Investigate netplan config permission denied on K8s nodes | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70116.md) | complete | Apr 25, 2026, 08:10 UTC |
| [#69960](https://github.com/openclaw/openclaw/issues/69960) | [Bug]:  plugins install --profile X writes to default extensions dir instead of profile's state dir | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69960.md) | complete | Apr 25, 2026, 08:10 UTC |
| [#70274](https://github.com/openclaw/openclaw/issues/70274) | Memory Dreaming Promotion cron can timeout repeatedly without tracked success state | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70274.md) | complete | Apr 25, 2026, 08:10 UTC |
| [#70253](https://github.com/openclaw/openclaw/issues/70253) | [Bug]: Message Streaming in Mattermost active even if disabled in config file. Also Bot-to-Bot communication disabled but allowed in config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70253.md) | complete | Apr 25, 2026, 08:10 UTC |
| [#70263](https://github.com/openclaw/openclaw/issues/70263) | Feature: openclaw wiki compile - Karpathy-style browsable synthesis from workspace memory | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70263.md) | complete | Apr 25, 2026, 08:10 UTC |
| [#70223](https://github.com/openclaw/openclaw/issues/70223) | gateway launchd plist missing WorkingDirectory → ENOENT on every agent turn (relative agentDir resolves under cwd=/) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70223.md) | complete | Apr 25, 2026, 08:10 UTC |
| [#70260](https://github.com/openclaw/openclaw/issues/70260) | video_generate model override inconsistently ignored — falls back to MiniMax default | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70260.md) | complete | Apr 25, 2026, 08:09 UTC |
| [#70249](https://github.com/openclaw/openclaw/issues/70249) | [Feature]: Support multiple Ollama hosts by decoupling provider keys from API types | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70249.md) | complete | Apr 25, 2026, 08:09 UTC |
| [#70191](https://github.com/openclaw/openclaw/issues/70191) | Proposal: native /health/deep probe endpoint for external model-contract verification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70191.md) | complete | Apr 25, 2026, 08:09 UTC |
| [#70197](https://github.com/openclaw/openclaw/issues/70197) | bug(gateway): @homebridge/ciao's arp -a probe flashes cmd.exe window every ~15s on Windows (missing windowsHide) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70197.md) | complete | Apr 25, 2026, 08:09 UTC |
| [#69991](https://github.com/openclaw/openclaw/issues/69991) | Proposal: `lima-sandbox` — a hypervisor-isolated sandbox backend | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69991.md) | complete | Apr 25, 2026, 08:09 UTC |
| [#70097](https://github.com/openclaw/openclaw/issues/70097) | [Bug]: Vertex AI rejects user_id after upgrade to 2026.4.21 — \"appears to contain an email address\ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70097.md) | complete | Apr 25, 2026, 08:09 UTC |
| [#70060](https://github.com/openclaw/openclaw/issues/70060) | Feature: 微信通道支持语音气泡消息 (asVoice 参数) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70060.md) | complete | Apr 25, 2026, 08:09 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.4`, medium reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, checks it again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. When more items are due than fit in a run, the planner prioritizes active items first, then PRs, then new issues, then older weekly reviews. The dashboard reports local cadence coverage for daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

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
