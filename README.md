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

Last dashboard update: Apr 24, 2026, 03:03 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19135 |
| Reviewed / proposed closes | 986 / 435 |
| Reviewed files | 986 |
| Fresh verified reviews in the last 7 days | 986 |
| Proposed closes awaiting apply | 435 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 18149 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#33017](https://github.com/openclaw/openclaw/issues/33017) | [Feature]: Plugin API for Dynamic Context Pruning | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/33017.md) | complete | Apr 24, 2026, 03:02 UTC |
| [#32932](https://github.com/openclaw/openclaw/issues/32932) | [Feature]: Suggestion for scheduled task,  WebHook URL function | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/32932.md) | complete | Apr 24, 2026, 03:01 UTC |
| [#32473](https://github.com/openclaw/openclaw/issues/32473) | [Bug]: control ui requires device identity (use HTTPS or localhost secure context) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/32473.md) | complete | Apr 24, 2026, 03:00 UTC |
| [#32515](https://github.com/openclaw/openclaw/issues/32515) | Feature Request: One-click Anthropic authentication (OAuth flow) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/32515.md) | complete | Apr 24, 2026, 03:00 UTC |
| [#32369](https://github.com/openclaw/openclaw/issues/32369) | [Feature]: Set models without retyping api key | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/32369.md) | complete | Apr 24, 2026, 03:00 UTC |
| [#32621](https://github.com/openclaw/openclaw/issues/32621) | Feature request: hook point inside message tool (message_sending only catches implicit replies) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/32621.md) | complete | Apr 24, 2026, 03:00 UTC |
| [#32530](https://github.com/openclaw/openclaw/issues/32530) | [Feature]: Auto-discovery of agent configurations from external workspaces | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/32530.md) | complete | Apr 24, 2026, 03:00 UTC |
| [#32603](https://github.com/openclaw/openclaw/issues/32603) | [Feature]: Set environment before /ace launch Claude Code | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/32603.md) | complete | Apr 24, 2026, 03:00 UTC |
| [#32438](https://github.com/openclaw/openclaw/issues/32438) | [Feature]: Add a formatted log file when JSON logs are hard to read and Control UI is unusable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/32438.md) | complete | Apr 24, 2026, 03:00 UTC |
| [#32460](https://github.com/openclaw/openclaw/issues/32460) | [Feature]: Plugin API: emit tool:before for embedded agent native tools | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/32460.md) | complete | Apr 24, 2026, 03:00 UTC |
| [#32558](https://github.com/openclaw/openclaw/pull/32558) | MSTeams: add upload session fallback for large files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/32558.md) | complete | Apr 24, 2026, 03:00 UTC |
| [#32296](https://github.com/openclaw/openclaw/issues/32296) | [Bug]: Agent replies to previous message instead of current message (session context confusion) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/32296.md) | complete | Apr 24, 2026, 03:00 UTC |
| [#32607](https://github.com/openclaw/openclaw/issues/32607) | [Bug]: Moonshot CN users get 401 after onboard — models.json uses api.moonshot.ai instead of api.moonshot.cn | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/32607.md) | complete | Apr 24, 2026, 03:00 UTC |
| [#32694](https://github.com/openclaw/openclaw/issues/32694) | [Feature]: Reformate it's setting UI 🫥 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/32694.md) | complete | Apr 24, 2026, 03:00 UTC |
| [#32638](https://github.com/openclaw/openclaw/issues/32638) | [Bug]: Groq + reasoning models fail with 400: reasoning_effort must be none or default | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/32638.md) | complete | Apr 24, 2026, 02:59 UTC |
| [#32618](https://github.com/openclaw/openclaw/issues/32618) | {Feature Request] Add Feishu Mail and Calendar API Integrationure]: | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/32618.md) | complete | Apr 24, 2026, 02:59 UTC |
| [#32864](https://github.com/openclaw/openclaw/issues/32864) | 🔥🔥🔥 Enhanced LanceDB memory plugin for OpenClaw | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/32864.md) | complete | Apr 24, 2026, 02:59 UTC |
| [#32869](https://github.com/openclaw/openclaw/issues/32869) | OpenClaw Skills官方技能库中文翻译 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/32869.md) | complete | Apr 24, 2026, 02:59 UTC |
| [#32868](https://github.com/openclaw/openclaw/issues/32868) | Block streaming: block replies not delivered before tool execution (same-channel) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/32868.md) | complete | Apr 24, 2026, 02:59 UTC |
| [#31396](https://github.com/openclaw/openclaw/issues/31396) | [Feature]: Whenever I ask him to switch models or connect to a new model on his own, it often freezes. How can I avoid this? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/31396.md) | complete | Apr 24, 2026, 02:59 UTC |

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
