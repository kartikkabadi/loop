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

Last dashboard update: Apr 24, 2026, 12:54 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12554 |
| Fresh reviewed issues in the last 7 days | 5726 |
| Proposed issue closes | 3193 (55.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6608 |
| Fresh reviewed PRs in the last 7 days | 3053 |
| Proposed PR closes | 1020 (33.4% of reviewed PRs) |
| Open items total | 19162 |
| Reviewed files | 8779 |
| Fresh verified reviews in the last 7 days | 8779 |
| Proposed closes awaiting apply | 4213 (48% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 10383 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#52660](https://github.com/openclaw/openclaw/issues/52660) | Feature Request: Agent Spawn Context Hooks — auto-inject knowledge base context on subagent creation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52660.md) | complete | Apr 24, 2026, 12:54 UTC |
| [#52647](https://github.com/openclaw/openclaw/issues/52647) | CLI `devices list` fails with 'missing scope: operator.read' on loopback with token auth | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52647.md) | complete | Apr 24, 2026, 12:54 UTC |
| [#52692](https://github.com/openclaw/openclaw/issues/52692) | Proactive Compaction Configuration & Scheduler (OpenClaw #41963) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52692.md) | complete | Apr 24, 2026, 12:54 UTC |
| [#52679](https://github.com/openclaw/openclaw/issues/52679) | SSE streaming: empty/missing data event causes JSON parse failure (Unexpected end of JSON input) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52679.md) | complete | Apr 24, 2026, 12:54 UTC |
| [#52664](https://github.com/openclaw/openclaw/pull/52664) | feat: expose rawBody on user messages in plugin hook events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52664.md) | complete | Apr 24, 2026, 12:53 UTC |
| [#52648](https://github.com/openclaw/openclaw/issues/52648) | google-vertex provider authentication fails when running through proxychains | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52648.md) | complete | Apr 24, 2026, 12:53 UTC |
| [#52650](https://github.com/openclaw/openclaw/issues/52650) | [Feature Request] Add user avatar support in WebUI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52650.md) | complete | Apr 24, 2026, 12:53 UTC |
| [#52649](https://github.com/openclaw/openclaw/issues/52649) | [Bug]: Model switch in control panel does not apply to Feishu messages for the same session | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52649.md) | complete | Apr 24, 2026, 12:53 UTC |
| [#52663](https://github.com/openclaw/openclaw/issues/52663) | [Bug]: Response service status awareness | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52663.md) | complete | Apr 24, 2026, 12:53 UTC |
| [#52667](https://github.com/openclaw/openclaw/issues/52667) | WhatsApp group mention detection fails with LID (Linked ID) format | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52667.md) | complete | Apr 24, 2026, 12:53 UTC |
| [#52680](https://github.com/openclaw/openclaw/issues/52680) | tools.read: out-of-range offset should not abort runs (clamp or return diagnostic) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52680.md) | complete | Apr 24, 2026, 12:53 UTC |
| [#52696](https://github.com/openclaw/openclaw/issues/52696) | OpenClaw: ToolResultCompactor — Design Review and Integration Path | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52696.md) | complete | Apr 24, 2026, 12:52 UTC |
| [#52673](https://github.com/openclaw/openclaw/issues/52673) | Webchat: Image paste/send fails - image only visible to sender, agent cannot receive | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52673.md) | complete | Apr 24, 2026, 12:52 UTC |
| [#52656](https://github.com/openclaw/openclaw/pull/52656) | feat(control-ui): add chat agent selector | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52656.md) | complete | Apr 24, 2026, 12:52 UTC |
| [#52672](https://github.com/openclaw/openclaw/pull/52672) | Fix channel removal in configure wizard | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52672.md) | complete | Apr 24, 2026, 12:52 UTC |
| [#52699](https://github.com/openclaw/openclaw/issues/52699) | Discussion: AlertPipe & HealthPipe - Workspace Reliability Tools | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52699.md) | complete | Apr 24, 2026, 12:52 UTC |
| [#52693](https://github.com/openclaw/openclaw/issues/52693) | Pulse Health Dashboard (OpenClaw #50371) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52693.md) | complete | Apr 24, 2026, 12:52 UTC |
| [#52587](https://github.com/openclaw/openclaw/issues/52587) | [Bug] Feishu channel fails to send images via read tool | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52587.md) | complete | Apr 24, 2026, 12:52 UTC |
| [#52632](https://github.com/openclaw/openclaw/issues/52632) | Channel removal incomplete: WhatsApp credentials cause channel to reappear on restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52632.md) | complete | Apr 24, 2026, 12:52 UTC |
| [#52685](https://github.com/openclaw/openclaw/pull/52685) | Fix/Add chat run tracking for active session management | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52685.md) | complete | Apr 24, 2026, 12:52 UTC |

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
