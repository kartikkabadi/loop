<img width="1584" height="672" alt="clawsweeper_banner" src="https://github.com/user-attachments/assets/6b2a0d0f-aca8-47e5-8a1f-eb266c760646" />

# 🐠 ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer tool for one-cluster issue and PR cleanup.

It takes a curated GitHub issue/PR cluster, asks a Codex worker to classify the items, and applies only narrow, auditable cleanup actions when the evidence is strong. It shares the same ClawSweeper repo and GitHub App as the commit and backlog sweepers, but runs as a separate repair lane with stricter mutation gates.

Allowed automated close reasons:

- duplicate of a clear canonical thread
- superseded by a clear canonical thread
- fixed by a specific candidate fix

Manual backlog-cleanup jobs may also use
[`instructions/low-signal-prs.md`](instructions/low-signal-prs.md) for
drive-by PRs that are clearly blank-template, docs-only discoverability churn,
test-only coverage spam, refactor-only noise, third-party capabilities that
belong on ClawHub, risky unapproved infra, or dirty branches. This policy is
opt-in per job and should return `needs_human` for plausible bug fixes or
anything with active maintainer signal.

Everything else stays open or is escalated for maintainer review.

Security-sensitive reports are deliberately out of scope. ClawSweeper
routes those refs to central OpenClaw security handling and keeps processing
unrelated ordinary bugs, provider gaps, and duplicate cleanup in the same
cluster. It follows OpenClaw `SECURITY.md`: trusted-operator exec behavior,
provider gaps, feature gaps, and hardening-only parity drift are not treated as
vulnerabilities unless there is a real trust-boundary bypass.

## Status

The repair lane is intentionally narrower than the sweep lanes. The sweepers scan OpenClaw commits and backlog items on a cadence; repair handles targeted clusters that were already grouped by a human, gitcrawl, or another dedupe tool.

Cluster discovery currently comes from [openclaw/gitcrawl](https://github.com/openclaw/gitcrawl).

<img width="3582" height="2160" alt="image" src="https://github.com/user-attachments/assets/20b816cc-72ab-479e-bc18-84f5b2b53745" />

The default workflow is proposal-first. It does not comment or close unless a job is explicitly promoted and the deterministic applicator confirms live GitHub state has not changed.

## State Boundaries

`jobs/` and `results/` are durable operational state, not generated source. They may contain historical run text, dashboard rows, and audit evidence. Active code, prompts, workflows, docs, schemas, and tests are covered by `pnpm run check:active-surface`, which rejects retired project names and old token variables before the full gate runs.

## Dashboard

Last dashboard update: May 1, 2026, 04:49 UTC

<!-- clawsweeper-repair-dashboard:start -->
State: Failed clusters need inspection

Scope: 355 active latest cluster reports. 1 policy-archived cluster(s) are excluded from health stats; run attempts are tracked as audit history only.

| Metric | Count | Rate |
| --- | ---: | ---: |
| Latest clusters reviewed | 355 | 100% |
| Policy-archived clusters | 1 | audit |
| Clean completed clusters | 102 | 28.7% |
| Needs-human clusters | 42 | 11.8% |
| Latest successful clusters | 325 | 91.5% |
| Latest failed clusters | 7 | 2.0% |
| Latest cancelled clusters | 2 | 0.6% |
| Run attempts archived | 623 | audit |
| Fix action attempts | 282 | audit |
| Fix actions executed | 8 | 2.8% |
| Fix actions failed | 39 | 13.8% |
| Fix actions blocked | 69 | 24.5% |
| Latest clusters with fix failures | 58 | 16.3% |
| Distinct PRs touched | 919 | 100% |
| Open PRs tracked | 258 | 28.1% |
| Closed unmerged PRs tracked | 501 | 54.5% |
| Completed close actions | 30 | 8.2% |
| Completed merge actions | 23 | 6.3% |
| Duplicate closes | 22 | 73.3% |
| Superseded closes | 0 | 0.0% |
| Fixed-by-candidate closes | 0 | 0.0% |
| Low-signal PR closes | 0 | 0.0% |
| Blocked mutation attempts | 190 | 52.2% |
| Skipped mutation attempts | 121 | 33.2% |

### Clusters Needing Inspection

| Cluster | State | Source job | Reason | Report | Run |
| --- | --- | --- | --- | --- | --- |
| [automerge-openclaw-openclaw-74506](results/openclaw/automerge-openclaw-openclaw-74506.md) | apply blocked | jobs/openclaw/inbox/automerge-openclaw-openclaw-74506.md | job does not allow merge | [report](results/openclaw/automerge-openclaw-openclaw-74506.md) | [25202544672](https://github.com/openclaw/clawsweeper/actions/runs/25202544672) |
| [clawsweeper-commit-openclaw-openclaw-3e67ee63b4e0](results/openclaw/clawsweeper-commit-openclaw-openclaw-3e67ee63b4e0.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-3e67ee63b4e0.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-3e67ee63b4e0.md) | [25200994696](https://github.com/openclaw/clawsweeper/actions/runs/25200994696) |
| [clawsweeper-commit-openclaw-openclaw-45b86450795d](results/openclaw/clawsweeper-commit-openclaw-openclaw-45b86450795d.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-45b86450795d.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-45b86450795d.md) | [25200785766](https://github.com/openclaw/clawsweeper/actions/runs/25200785766) |
| [clawsweeper-commit-openclaw-openclaw-60bdb96f2c4c](results/openclaw/clawsweeper-commit-openclaw-openclaw-60bdb96f2c4c.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-60bdb96f2c4c.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-60bdb96f2c4c.md) | [25200786346](https://github.com/openclaw/clawsweeper/actions/runs/25200786346) |
| [clawsweeper-commit-openclaw-openclaw-354084b1b320](results/openclaw/clawsweeper-commit-openclaw-openclaw-354084b1b320.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-354084b1b320.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-354084b1b320.md) | [25200785151](https://github.com/openclaw/clawsweeper/actions/runs/25200785151) |
| [clawsweeper-commit-openclaw-openclaw-e0fe02fb0970](results/openclaw/clawsweeper-commit-openclaw-openclaw-e0fe02fb0970.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-e0fe02fb0970.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-e0fe02fb0970.md) | [25200786950](https://github.com/openclaw/clawsweeper/actions/runs/25200786950) |
| [clawsweeper-commit-openclaw-openclaw-8989ceee50ab](results/openclaw/clawsweeper-commit-openclaw-openclaw-8989ceee50ab.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-8989ceee50ab.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-8989ceee50ab.md) | [25200467866](https://github.com/openclaw/clawsweeper/actions/runs/25200467866) |
| [clawsweeper-commit-openclaw-openclaw-df0ee092f017](results/openclaw/clawsweeper-commit-openclaw-openclaw-df0ee092f017.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-df0ee092f017.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-df0ee092f017.md) | [25200373309](https://github.com/openclaw/clawsweeper/actions/runs/25200373309) |
| [automerge-openclaw-openclaw-75326](results/openclaw/automerge-openclaw-openclaw-75326.md) | apply blocked | jobs/openclaw/inbox/automerge-openclaw-openclaw-75326.md | job does not allow merge | [report](results/openclaw/automerge-openclaw-openclaw-75326.md) | [25198747424](https://github.com/openclaw/clawsweeper/actions/runs/25198747424) |
| [clawsweeper-commit-openclaw-openclaw-b277ae3f4c40](results/openclaw/clawsweeper-commit-openclaw-openclaw-b277ae3f4c40.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-b277ae3f4c40.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-b277ae3f4c40.md) | [25198053576](https://github.com/openclaw/clawsweeper/actions/runs/25198053576) |
| [clawsweeper-commit-openclaw-openclaw-a102f4dede6a](results/openclaw/clawsweeper-commit-openclaw-openclaw-a102f4dede6a.md) | fix blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-a102f4dede6a.md | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests [check:changed] src/agents/agent-command.ts: core p... | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-a102f4dede6a.md) | [25197023690](https://github.com/openclaw/clawsweeper/actions/runs/25197023690) |
| [automerge-openclaw-openclaw-75302](results/openclaw/automerge-openclaw-openclaw-75302.md) | apply blocked | jobs/openclaw/inbox/automerge-openclaw-openclaw-75302.md | job does not allow merge | [report](results/openclaw/automerge-openclaw-openclaw-75302.md) | [25196881228](https://github.com/openclaw/clawsweeper/actions/runs/25196881228) |
| [clawsweeper-commit-openclaw-openclaw-52bf20b07d6e](results/openclaw/clawsweeper-commit-openclaw-openclaw-52bf20b07d6e.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-52bf20b07d6e.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-52bf20b07d6e.md) | [25195746048](https://github.com/openclaw/clawsweeper/actions/runs/25195746048) |
| [clawsweeper-commit-openclaw-openclaw-ef799fd57a77](results/openclaw/clawsweeper-commit-openclaw-openclaw-ef799fd57a77.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-ef799fd57a77.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-ef799fd57a77.md) | [25195271001](https://github.com/openclaw/clawsweeper/actions/runs/25195271001) |
| [clawsweeper-commit-openclaw-openclaw-af5a1fbddb14](results/openclaw/clawsweeper-commit-openclaw-openclaw-af5a1fbddb14.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-af5a1fbddb14.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-af5a1fbddb14.md) | [25192772436](https://github.com/openclaw/clawsweeper/actions/runs/25192772436) |
| [automerge-openclaw-openclaw-74716](results/openclaw/automerge-openclaw-openclaw-74716.md) | fix failed | jobs/openclaw/inbox/automerge-openclaw-openclaw-74716.md | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, extensions, extensionTests, apps, docs [check:chan... | [report](results/openclaw/automerge-openclaw-openclaw-74716.md) | [25192389369](https://github.com/openclaw/clawsweeper/actions/runs/25192389369) |
| [clawsweeper-commit-openclaw-openclaw-1d74ecd71f0f](results/openclaw/clawsweeper-commit-openclaw-openclaw-1d74ecd71f0f.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-1d74ecd71f0f.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-1d74ecd71f0f.md) | [25191267120](https://github.com/openclaw/clawsweeper/actions/runs/25191267120) |
| [clawsweeper-commit-openclaw-openclaw-027ea5f08bd9](results/openclaw/clawsweeper-commit-openclaw-openclaw-027ea5f08bd9.md) | fix blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-027ea5f08bd9.md | Codex /review did not pass after 2 attempt(s): Merge is blocked by one incomplete repair. The branch is narrow and `pnpm check:changed` p... | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-027ea5f08bd9.md) | [25187047448](https://github.com/openclaw/clawsweeper/actions/runs/25187047448) |
| [automerge-openclaw-openclaw-75209](results/openclaw/automerge-openclaw-openclaw-75209.md) | apply blocked | jobs/openclaw/inbox/automerge-openclaw-openclaw-75209.md | job does not allow merge | [report](results/openclaw/automerge-openclaw-openclaw-75209.md) | [25186718052](https://github.com/openclaw/clawsweeper/actions/runs/25186718052) |
| [clawsweeper-commit-openclaw-openclaw-581fbea1d653](results/openclaw/clawsweeper-commit-openclaw-openclaw-581fbea1d653.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-581fbea1d653.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-581fbea1d653.md) | [25183870132](https://github.com/openclaw/clawsweeper/actions/runs/25183870132) |
| [clawsweeper-commit-openclaw-openclaw-54e6e3d7daf5](results/openclaw/clawsweeper-commit-openclaw-openclaw-54e6e3d7daf5.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-54e6e3d7daf5.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-54e6e3d7daf5.md) | [25183184702](https://github.com/openclaw/clawsweeper/actions/runs/25183184702) |
| [automerge-openclaw-openclaw-74472](results/openclaw/automerge-openclaw-openclaw-74472.md) | apply blocked | jobs/openclaw/inbox/automerge-openclaw-openclaw-74472.md | job does not allow merge | [report](results/openclaw/automerge-openclaw-openclaw-74472.md) | [25182390249](https://github.com/openclaw/clawsweeper/actions/runs/25182390249) |
| [clawsweeper-commit-openclaw-openclaw-82ca6ecdde80](results/openclaw/clawsweeper-commit-openclaw-openclaw-82ca6ecdde80.md) | fix blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-82ca6ecdde80.md | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-82ca6ecdde80.md) | [25176627885](https://github.com/openclaw/clawsweeper/actions/runs/25176627885) |
| [clawsweeper-commit-openclaw-openclaw-ac599c9e539f](results/openclaw/clawsweeper-commit-openclaw-openclaw-ac599c9e539f.md) | fix blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-ac599c9e539f.md | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests [check:changed] src/plugins/bundled-runtime-deps-se... | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-ac599c9e539f.md) | [25171874076](https://github.com/openclaw/clawsweeper/actions/runs/25171874076) |
| [clawsweeper-commit-openclaw-openclaw-b85147ff7615](results/openclaw/clawsweeper-commit-openclaw-openclaw-b85147ff7615.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-b85147ff7615.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-b85147ff7615.md) | [25174074406](https://github.com/openclaw/clawsweeper/actions/runs/25174074406) |

### Fix Failure Queue

| Cluster | Status | Target | Branch/PR | Reason | Run |
| --- | --- | --- | --- | --- | --- |
| [clawsweeper-commit-openclaw-openclaw-a102f4dede6a](results/openclaw/clawsweeper-commit-openclaw-openclaw-a102f4dede6a.md) | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests [check:changed] src/agents/agent-command.ts: core p... | [25197023690](https://github.com/openclaw/clawsweeper/actions/runs/25197023690) |
| [automerge-openclaw-openclaw-74716](results/openclaw/automerge-openclaw-openclaw-74716.md) | failed |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, extensions, extensionTests, apps, docs [check:chan... | [25192389369](https://github.com/openclaw/clawsweeper/actions/runs/25192389369) |
| [automerge-openclaw-openclaw-74716](results/openclaw/automerge-openclaw-openclaw-74716.md) | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, extensions, extensionTests, apps, docs [check:chan... | [25192389369](https://github.com/openclaw/clawsweeper/actions/runs/25192389369) |
| [clawsweeper-commit-openclaw-openclaw-027ea5f08bd9](results/openclaw/clawsweeper-commit-openclaw-openclaw-027ea5f08bd9.md) | blocked |  |  | Codex /review did not pass after 2 attempt(s): Merge is blocked by one incomplete repair. The branch is narrow and `pnpm check:changed` p... | [25187047448](https://github.com/openclaw/clawsweeper/actions/runs/25187047448) |
| [clawsweeper-commit-openclaw-openclaw-82ca6ecdde80](results/openclaw/clawsweeper-commit-openclaw-openclaw-82ca6ecdde80.md) | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 | [25176627885](https://github.com/openclaw/clawsweeper/actions/runs/25176627885) |
| [clawsweeper-commit-openclaw-openclaw-ac599c9e539f](results/openclaw/clawsweeper-commit-openclaw-openclaw-ac599c9e539f.md) | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests [check:changed] src/plugins/bundled-runtime-deps-se... | [25171874076](https://github.com/openclaw/clawsweeper/actions/runs/25171874076) |
| [clawsweeper-commit-openclaw-openclaw-3c9437ae547a](results/openclaw/clawsweeper-commit-openclaw-openclaw-3c9437ae547a.md) | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 | [25149929229](https://github.com/openclaw/clawsweeper/actions/runs/25149929229) |
| [clawsweeper-commit-openclaw-openclaw-0142c791232e](results/openclaw/clawsweeper-commit-openclaw-openclaw-0142c791232e.md) | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 | [25147836943](https://github.com/openclaw/clawsweeper/actions/runs/25147836943) |
| [clawsweeper-commit-openclaw-openclaw-d7396d4ffa2f](results/openclaw/clawsweeper-commit-openclaw-openclaw-d7396d4ffa2f.md) | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 | [25147023250](https://github.com/openclaw/clawsweeper/actions/runs/25147023250) |
| [automerge-openclaw-openclaw-74638](results/openclaw/automerge-openclaw-openclaw-74638.md) | failed |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] src/config/config.schema-regr... | [25146762143](https://github.com/openclaw/clawsweeper/actions/runs/25146762143) |
| [automerge-openclaw-openclaw-74638](results/openclaw/automerge-openclaw-openclaw-74638.md) | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] src/config/config.schema-regr... | [25146762143](https://github.com/openclaw/clawsweeper/actions/runs/25146762143) |
| [clawsweeper-commit-openclaw-openclaw-25d2e9bdace3](results/openclaw/clawsweeper-commit-openclaw-openclaw-25d2e9bdace3.md) | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=apps [check:changed] apps/macos/Sources/OpenClaw/GatewayLaunchAgent... | [25145494152](https://github.com/openclaw/clawsweeper/actions/runs/25145494152) |
| [clawsweeper-commit-openclaw-openclaw-58153d38af57](results/openclaw/clawsweeper-commit-openclaw-openclaw-58153d38af57.md) | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, extensions, extensionTests [check:changed] extensi... | [25143847817](https://github.com/openclaw/clawsweeper/actions/runs/25143847817) |
| [clawsweeper-commit-openclaw-openclaw-0b59964ec945](results/openclaw/clawsweeper-commit-openclaw-openclaw-0b59964ec945.md) | blocked |  |  | Codex /review failed: structured output was not written to replacement-codex-review-1.json; stdout={"type":"thread.started","thread_id":"... | [25140762037](https://github.com/openclaw/clawsweeper/actions/runs/25140762037) |
| [automerge-openclaw-openclaw-74528](results/openclaw/automerge-openclaw-openclaw-74528.md) | blocked |  |  | Codex /review failed: structured output was not written to replacement-codex-review-1.json; stdout={"type":"thread.started","thread_id":"... | [25139586999](https://github.com/openclaw/clawsweeper/actions/runs/25139586999) |
| [clawsweeper-commit-openclaw-openclaw-db6951088a19](results/openclaw/clawsweeper-commit-openclaw-openclaw-db6951088a19.md) | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, extensions, extensionTests [check:changed] extensi... | [25128072554](https://github.com/openclaw/clawsweeper/actions/runs/25128072554) |
| [clawsweeper-commit-openclaw-openclaw-6a4c866b6a8b](results/openclaw/clawsweeper-commit-openclaw-openclaw-6a4c866b6a8b.md) | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 | [25094690632](https://github.com/openclaw/clawsweeper/actions/runs/25094690632) |
| [ghcrawl-166004-agentic-merge](results/openclaw/ghcrawl-166004-agentic-merge.md) | blocked |  |  | Codex /review did not pass after 2 attempt(s): Cannot perform the review without inspecting the repository diff and validation state. | [25087637821](https://github.com/openclaw/clawsweeper/actions/runs/25087637821) |
| [ghcrawl-156717-autonomous-smoke](results/openclaw/ghcrawl-156717-autonomous-smoke.md) | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] ui/src/styles/chat/layout.css... | [25085937628](https://github.com/openclaw/clawsweeper/actions/runs/25085937628) |
| [ghcrawl-156593-autonomous-smoke](results/openclaw/ghcrawl-156593-autonomous-smoke.md) | failed |  |  | To https://github.com/LiaoyuanNing/openclaw.git ! [remote rejected] HEAD -> fix/feishu-p2p-thread-reply (refusing to allow a GitHub App t... | [25084314903](https://github.com/openclaw/clawsweeper/actions/runs/25084314903) |
| [ghcrawl-156593-autonomous-smoke](results/openclaw/ghcrawl-156593-autonomous-smoke.md) | blocked |  |  | Codex /review did not pass after 2 attempt(s): Blocked. The diff is narrow and has no visible secret, dependency, workflow, install, or s... | [25084314903](https://github.com/openclaw/clawsweeper/actions/runs/25084314903) |
| [ghcrawl-156627-autonomous-smoke](results/openclaw/ghcrawl-156627-autonomous-smoke.md) | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 | [25070489790](https://github.com/openclaw/clawsweeper/actions/runs/25070489790) |
| [ghcrawl-156585-autonomous-smoke](results/openclaw/ghcrawl-156585-autonomous-smoke.md) | failed |  |  | Codex produced no target repo changes after 3 edit attempt(s). | [25069725706](https://github.com/openclaw/clawsweeper/actions/runs/25069725706) |
| [ghcrawl-156585-autonomous-smoke](results/openclaw/ghcrawl-156585-autonomous-smoke.md) | blocked |  |  | Codex produced no target repo changes after 3 edit attempt(s). | [25069725706](https://github.com/openclaw/clawsweeper/actions/runs/25069725706) |
| [ghcrawl-156586-autonomous-smoke](results/openclaw/ghcrawl-156586-autonomous-smoke.md) | blocked |  |  | Codex /review failed: structured output was not written to replacement-codex-review-1.json; stdout={"type":"thread.started","thread_id":"... | [25069727471](https://github.com/openclaw/clawsweeper/actions/runs/25069727471) |

### Top Blocked Reasons

| Reason | Latest count | Example cluster |
| --- | ---: | --- |
| action status is blocked | 89 | [ghcrawl-156636-autonomous-smoke](results/openclaw/ghcrawl-156636-autonomous-smoke.md) |
| job does not allow merge | 85 | [automerge-openclaw-openclaw-74506](results/openclaw/automerge-openclaw-openclaw-74506.md) |
| close requires ClawSweeper Repair fix PR opened/pushed or merge executed first | 13 | [ghcrawl-156593-autonomous-smoke](results/openclaw/ghcrawl-156593-autonomous-smoke.md) |
| merge requires CLAWSWEEPER_ALLOW_MERGE=1; labeled for human review | 10 | [ghcrawl-156679-autonomous-smoke](results/openclaw/ghcrawl-156679-autonomous-smoke.md) |
| merge state status is UNSTABLE | 10 | [ghcrawl-156647-autonomous-smoke](results/openclaw/ghcrawl-156647-autonomous-smoke.md) |
| target changed since worker review | 9 | [ghcrawl-156624-autonomous-smoke](results/openclaw/ghcrawl-156624-autonomous-smoke.md) |
| mergeable state is CONFLICTING | 5 | [ghcrawl-156651-autonomous-smoke](results/openclaw/ghcrawl-156651-autonomous-smoke.md) |
| target is not listed in job candidates | 4 | [ghcrawl-156682-autonomous-smoke](results/openclaw/ghcrawl-156682-autonomous-smoke.md) |
| canonical is not listed in job refs | 2 | [ghcrawl-156658-autonomous-smoke](results/openclaw/ghcrawl-156658-autonomous-smoke.md) |
| Clearly superseded by the canonical PR path, but closure is blocked until the canonical fix lands. | 2 | [ghcrawl-156879-autonomous-smoke](results/openclaw/ghcrawl-156879-autonomous-smoke.md) |
| Fix-first policy blocks superseded closeout until #49430 is repaired and merged. | 2 | [ghcrawl-156585-autonomous-smoke](results/openclaw/ghcrawl-156585-autonomous-smoke.md) |
| maintainer issue comment blocks low-signal auto-close | 2 | [low-signal-pr-sweep-20260425T2346-01](results/openclaw/low-signal-pr-sweep-20260425t2346-01.md) |
| require_fix_before_close blocks superseded PR closeout until the canonical fix path is landed or opened as a concrete fix PR. | 2 | [ghcrawl-156789-autonomous-smoke](results/openclaw/ghcrawl-156789-autonomous-smoke.md) |
| Blocked on the canonical fix path landing; job policy does not allow unmerged fix closeout. | 1 | [automerge-openclaw-openclaw-74666](results/openclaw/automerge-openclaw-openclaw-74666.md) |
| candidate fix is not merged | 1 | [ghcrawl-191459-agentic-merge](results/openclaw/ghcrawl-191459-agentic-merge.md) |

### Open PR Finalizer Queue

| PR | Title | Cluster | Branch | Blockers | Next action |
| --- | --- | --- | --- | --- | --- |
| [#75404](https://github.com/openclaw/openclaw/pull/75404) | fix(ci): target workflow’s pre-dispatch grep drops an alias that the ClawSweeper receiver exp... | clawsweeper-commit-openclaw-openclaw-3e67ee63b4e0 | clawsweeper/clawsweeper-commit-openclaw-openclaw-3e67ee63b4e0 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75403](https://github.com/openclaw/openclaw/pull/75403) | fix: making typing start fire-and-forget allows cleanup/idle to run before a persistent typin... | clawsweeper-commit-openclaw-openclaw-45b86450795d | clawsweeper/clawsweeper-commit-openclaw-openclaw-45b86450795d | needs_merge_state:UNSTABLE, needs_checks:CodeQL / Security High (core-auth-secrets):IN_PROGRESS; CodeQL / Security High (plugin-trust-bou... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#75399](https://github.com/openclaw/openclaw/pull/75399) | fix: media-generation tool availability gate regression | clawsweeper-commit-openclaw-openclaw-60bdb96f2c4c | clawsweeper/clawsweeper-commit-openclaw-openclaw-60bdb96f2c4c | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75397](https://github.com/openclaw/openclaw/pull/75397) | fix: targeted hook resolution/cache path provider-runtime regressions | clawsweeper-commit-openclaw-openclaw-354084b1b320 | clawsweeper/clawsweeper-commit-openclaw-openclaw-354084b1b320 | needs_merge_state:UNSTABLE, needs_checks:CodeQL / Security High (network-ssrf-boundary):IN_PROGRESS; CodeQL / Security High (plugin-trust... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#75396](https://github.com/openclaw/openclaw/pull/75396) | fix: One low-severity contract mismatch remains on current main | clawsweeper-commit-openclaw-openclaw-e0fe02fb0970 | clawsweeper/clawsweeper-commit-openclaw-openclaw-e0fe02fb0970 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75388](https://github.com/openclaw/openclaw/pull/75388) | fix: commit removes the runtime warning for the default group/channel private-reply behavior... | clawsweeper-commit-openclaw-openclaw-8989ceee50ab | clawsweeper/clawsweeper-commit-openclaw-openclaw-8989ceee50ab | needs_merge_state:UNSTABLE, needs_checks:CodeQL / Security High (channel-runtime-boundary):IN_PROGRESS; CodeQL / Security High (plugin-tr... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#75383](https://github.com/openclaw/openclaw/pull/75383) | fix: Gateway send.asVoice field is accepted and converted to audioAsVoice, but Telegram’s out... | clawsweeper-commit-openclaw-openclaw-df0ee092f017 | clawsweeper/clawsweeper-commit-openclaw-openclaw-df0ee092f017 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75344](https://github.com/openclaw/openclaw/pull/75344) | fix: regression where commitment safety handling can disable tools for unrelated due heartbea... | clawsweeper-commit-openclaw-openclaw-b277ae3f4c40 | clawsweeper/clawsweeper-commit-openclaw-openclaw-b277ae3f4c40 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75315](https://github.com/openclaw/openclaw/pull/75315) | fix: Windows stale-import guard still generates an invalid PowerShell regex, so the intended... | clawsweeper-commit-openclaw-openclaw-52bf20b07d6e | clawsweeper/clawsweeper-commit-openclaw-openclaw-52bf20b07d6e | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-core:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#75293](https://github.com/openclaw/openclaw/pull/75293) | fix: macOS-only Parallels smoke harness regression | clawsweeper-commit-openclaw-openclaw-af5a1fbddb14 | clawsweeper/clawsweeper-commit-openclaw-openclaw-af5a1fbddb14 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75282](https://github.com/openclaw/openclaw/pull/75282) | fix: TTS fallback fix removes the global plugin-disable guard for every capability provider... | clawsweeper-commit-openclaw-openclaw-1d74ecd71f0f | clawsweeper/clawsweeper-commit-openclaw-openclaw-1d74ecd71f0f | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75223](https://github.com/openclaw/openclaw/pull/75223) | fix: CLI auth status/probe path regression | clawsweeper-commit-openclaw-openclaw-581fbea1d653 | clawsweeper/clawsweeper-commit-openclaw-openclaw-581fbea1d653 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75213](https://github.com/openclaw/openclaw/pull/75213) | fix: Codex app-server silence timeout reliability issue | clawsweeper-commit-openclaw-openclaw-54e6e3d7daf5 | clawsweeper/clawsweeper-commit-openclaw-openclaw-54e6e3d7daf5 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75173](https://github.com/openclaw/openclaw/pull/75173) | fix(discord): document mention formatting guidance | automerge-openclaw-openclaw-74506 | clawsweeper/automerge-openclaw-openclaw-74506 | needs_merge_state:UNSTABLE, needs_checks:CI / build-artifacts:IN_PROGRESS; CodeQL Critical Quality / Critical Quality (channel-runtime-bo... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#75148](https://github.com/openclaw/openclaw/pull/75148) | fix: fallback path user-visible bug | clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | clawsweeper/clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75146](https://github.com/openclaw/openclaw/pull/75146) | fix: opt-in compaction precheck path mid-turn retry regression | clawsweeper-commit-openclaw-openclaw-b85147ff7615 | clawsweeper/clawsweeper-commit-openclaw-openclaw-b85147ff7615 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |

### Latest ClawSweeper Repair Closures

| Target | Type | Title | Closed | Action | Cluster | Report | Run |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#59439](https://github.com/openclaw/openclaw/pull/59439) | pull_request | Use daemon auth for unmanaged restart probes | Apr 28, 2026, 05:25 UTC | close_superseded | [ghcrawl-207050-agentic-merge](results/openclaw/ghcrawl-207050-agentic-merge.md) | [report](results/openclaw/ghcrawl-207050-agentic-merge.md) | [25035228706](https://github.com/openclaw/clawsweeper/actions/runs/25035228706) |
| [#59431](https://github.com/openclaw/openclaw/pull/59431) | pull_request | fix(feishu): correct Chinese filename encoding in attachments | Apr 28, 2026, 05:23 UTC | close_superseded | [ghcrawl-199239-agentic-merge](results/openclaw/ghcrawl-199239-agentic-merge.md) | [report](results/openclaw/ghcrawl-199239-agentic-merge.md) | [25035231796](https://github.com/openclaw/clawsweeper/actions/runs/25035231796) |
| [#59409](https://github.com/openclaw/openclaw/issues/59409) | issue | [Bug]: Feishu plugin: Chinese filenames in attachments display as garbled (Latin-1 encoding issue) | Apr 28, 2026, 05:23 UTC | close_fixed_by_candidate | [ghcrawl-199239-agentic-merge](results/openclaw/ghcrawl-199239-agentic-merge.md) | [report](results/openclaw/ghcrawl-199239-agentic-merge.md) | [25035231796](https://github.com/openclaw/clawsweeper/actions/runs/25035231796) |
| [#50435](https://github.com/openclaw/openclaw/pull/50435) | pull_request | fix(feishu): recover Chinese filenames from Latin-1 mojibake in Content-Disposition | Apr 28, 2026, 05:23 UTC | close_superseded | [ghcrawl-199239-agentic-merge](results/openclaw/ghcrawl-199239-agentic-merge.md) | [report](results/openclaw/ghcrawl-199239-agentic-merge.md) | [25035231796](https://github.com/openclaw/clawsweeper/actions/runs/25035231796) |
| [#48388](https://github.com/openclaw/openclaw/issues/48388) | issue | [Bug]: Feishu file names with Chinese characters are garbled (UTF-8 encoding issue) | Apr 28, 2026, 05:23 UTC | close_fixed_by_candidate | [ghcrawl-199239-agentic-merge](results/openclaw/ghcrawl-199239-agentic-merge.md) | [report](results/openclaw/ghcrawl-199239-agentic-merge.md) | [25035231796](https://github.com/openclaw/clawsweeper/actions/runs/25035231796) |
| [#61016](https://github.com/openclaw/openclaw/pull/61016) | pull_request | fix(media): anchor sanitizeMimeType regex and make case-insensitive per RFC 2045 | Apr 28, 2026, 04:48 UTC | close_superseded | [ghcrawl-156640-autonomous-smoke](results/openclaw/ghcrawl-156640-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-156640-autonomous-smoke.md) | [25034019917](https://github.com/openclaw/clawsweeper/actions/runs/25034019917) |
| [#49961](https://github.com/openclaw/openclaw/pull/49961) | pull_request | fix: restore compact JS placeholders in session export template | Apr 28, 2026, 04:36 UTC | close_superseded | [ghcrawl-156664-autonomous-smoke](results/openclaw/ghcrawl-156664-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-156664-autonomous-smoke.md) | [25033552424](https://github.com/openclaw/clawsweeper/actions/runs/25033552424) |
| [#49957](https://github.com/openclaw/openclaw/issues/49957) | issue | Bug: Session export HTML is empty due to reformatted JS placeholders in template | Apr 28, 2026, 04:36 UTC | close_duplicate | [ghcrawl-156664-autonomous-smoke](results/openclaw/ghcrawl-156664-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-156664-autonomous-smoke.md) | [25033552424](https://github.com/openclaw/clawsweeper/actions/runs/25033552424) |
| [#54429](https://github.com/openclaw/openclaw/issues/54429) | issue | Gateway Service Installation Failure: Missing systemd Service File | Apr 26, 2026, 03:04 UTC | close_duplicate | [ghcrawl-166002-agentic-merge](results/openclaw/ghcrawl-166002-agentic-merge.md) | [report](results/openclaw/ghcrawl-166002-agentic-merge.md) | [24946559138](https://github.com/openclaw/clawsweeper-repair/actions/runs/24946559138) |
| [#67622](https://github.com/openclaw/openclaw/issues/67622) | issue | [Feature Request] Support file/image upload in browser Control UI (webchat) | Apr 26, 2026, 03:03 UTC | close_duplicate | [ghcrawl-165992-agentic-merge](results/openclaw/ghcrawl-165992-agentic-merge.md) | [report](results/openclaw/ghcrawl-165992-agentic-merge.md) | [24946558493](https://github.com/openclaw/clawsweeper-repair/actions/runs/24946558493) |
| [#63094](https://github.com/openclaw/openclaw/issues/63094) | issue | [Feature Request] WebChat/Control UI support file upload | Apr 26, 2026, 03:03 UTC | close_duplicate | [ghcrawl-165992-agentic-merge](results/openclaw/ghcrawl-165992-agentic-merge.md) | [report](results/openclaw/ghcrawl-165992-agentic-merge.md) | [24946558493](https://github.com/openclaw/clawsweeper-repair/actions/runs/24946558493) |
| [#56298](https://github.com/openclaw/openclaw/issues/56298) | issue | [Feature Request] Webchat supports image/attachment upload in UI | Apr 26, 2026, 03:03 UTC | close_duplicate | [ghcrawl-165992-agentic-merge](results/openclaw/ghcrawl-165992-agentic-merge.md) | [report](results/openclaw/ghcrawl-165992-agentic-merge.md) | [24946558493](https://github.com/openclaw/clawsweeper-repair/actions/runs/24946558493) |
| [#43242](https://github.com/openclaw/openclaw/issues/43242) | issue | [Feature Request] Add file upload support to Control UI (Web) | Apr 26, 2026, 03:03 UTC | close_duplicate | [ghcrawl-165992-agentic-merge](results/openclaw/ghcrawl-165992-agentic-merge.md) | [report](results/openclaw/ghcrawl-165992-agentic-merge.md) | [24946558493](https://github.com/openclaw/clawsweeper-repair/actions/runs/24946558493) |
| [#41992](https://github.com/openclaw/openclaw/issues/41992) | issue | [Feature Request] WebChat file upload support | Apr 26, 2026, 03:03 UTC | close_duplicate | [ghcrawl-165992-agentic-merge](results/openclaw/ghcrawl-165992-agentic-merge.md) | [report](results/openclaw/ghcrawl-165992-agentic-merge.md) | [24946558493](https://github.com/openclaw/clawsweeper-repair/actions/runs/24946558493) |
| [#67406](https://github.com/openclaw/openclaw/issues/67406) | issue | image tool doesn't recognise Ollama cloud vision models | Apr 25, 2026, 19:58 UTC | close_duplicate | [ghcrawl-143816-autonomous-smoke](results/openclaw/ghcrawl-143816-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-143816-autonomous-smoke.md) | [24939009401](https://github.com/openclaw/clawsweeper-repair/actions/runs/24939009401) |
| [#66758](https://github.com/openclaw/openclaw/issues/66758) | issue | Image tool fails with 'Unknown model' for all ollama/ provider models despite #59943 fix | Apr 25, 2026, 19:57 UTC | close_duplicate | [ghcrawl-143816-autonomous-smoke](results/openclaw/ghcrawl-143816-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-143816-autonomous-smoke.md) | [24939009401](https://github.com/openclaw/clawsweeper-repair/actions/runs/24939009401) |
| [#65832](https://github.com/openclaw/openclaw/issues/65832) | issue | [Bug]: image tool fails with custom provider — ModelRegistry doesn't recognize custom providers from models.json | Apr 25, 2026, 19:57 UTC | close_duplicate | [ghcrawl-143816-autonomous-smoke](results/openclaw/ghcrawl-143816-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-143816-autonomous-smoke.md) | [24939009401](https://github.com/openclaw/clawsweeper-repair/actions/runs/24939009401) |
| [#70180](https://github.com/openclaw/openclaw/issues/70180) | issue | Bug: Image tool reports 'Unknown model' for all custom providers | Apr 25, 2026, 19:57 UTC | close_duplicate | [ghcrawl-143816-autonomous-smoke](results/openclaw/ghcrawl-143816-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-143816-autonomous-smoke.md) | [24939009401](https://github.com/openclaw/clawsweeper-repair/actions/runs/24939009401) |
| [#71133](https://github.com/openclaw/openclaw/issues/71133) | issue | memory-core: narrative session cleanup fails with missing scope: operator.admin | Apr 25, 2026, 19:53 UTC | close_duplicate | [ghcrawl-143819-autonomous-smoke](results/openclaw/ghcrawl-143819-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-143819-autonomous-smoke.md) | [24939011554](https://github.com/openclaw/clawsweeper-repair/actions/runs/24939011554) |
| [#70395](https://github.com/openclaw/openclaw/issues/70395) | issue | memory-core dreaming cleanup requires operator.admin and logs failure despite successful promotion | Apr 25, 2026, 19:53 UTC | close_duplicate | [ghcrawl-143819-autonomous-smoke](results/openclaw/ghcrawl-143819-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-143819-autonomous-smoke.md) | [24939011554](https://github.com/openclaw/clawsweeper-repair/actions/runs/24939011554) |
| [#70353](https://github.com/openclaw/openclaw/issues/70353) | issue | memory-core: dreaming subagent lacks operator.admin to delete its own session | Apr 25, 2026, 19:53 UTC | close_duplicate | [ghcrawl-143819-autonomous-smoke](results/openclaw/ghcrawl-143819-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-143819-autonomous-smoke.md) | [24939011554](https://github.com/openclaw/clawsweeper-repair/actions/runs/24939011554) |
| [#69886](https://github.com/openclaw/openclaw/issues/69886) | issue | memory-core narrative session cleanup fails with missing scope: operator.admin | Apr 25, 2026, 19:53 UTC | close_duplicate | [ghcrawl-143819-autonomous-smoke](results/openclaw/ghcrawl-143819-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-143819-autonomous-smoke.md) | [24939011554](https://github.com/openclaw/clawsweeper-repair/actions/runs/24939011554) |
| [#67029](https://github.com/openclaw/openclaw/issues/67029) | issue | [Bug]: memory-core dreaming: narrative session cleanup fails with missing scope operator.admin | Apr 25, 2026, 19:53 UTC | close_duplicate | [ghcrawl-143819-autonomous-smoke](results/openclaw/ghcrawl-143819-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-143819-autonomous-smoke.md) | [24939011554](https://github.com/openclaw/clawsweeper-repair/actions/runs/24939011554) |
| [#50691](https://github.com/openclaw/openclaw/issues/50691) | issue | openclaw status reports missing operator.read while gateway is healthy; gateway probe times out on same loopback endpoint | Apr 25, 2026, 19:46 UTC | close_duplicate | [ghcrawl-143815-autonomous-smoke](results/openclaw/ghcrawl-143815-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-143815-autonomous-smoke.md) | [24939008778](https://github.com/openclaw/clawsweeper-repair/actions/runs/24939008778) |
| [#50541](https://github.com/openclaw/openclaw/issues/50541) | issue | [Bug]: CLI cannot connect to Gateway (missing scope: operator.read) - Downgrade to 2026.3.11 works | Apr 25, 2026, 19:46 UTC | close_duplicate | [ghcrawl-143815-autonomous-smoke](results/openclaw/ghcrawl-143815-autonomous-smoke.md) | [report](results/openclaw/ghcrawl-143815-autonomous-smoke.md) | [24939008778](https://github.com/openclaw/clawsweeper-repair/actions/runs/24939008778) |
<!-- clawsweeper-repair-dashboard:end -->

## How It Works

For a maintainer-facing architecture map of the automation lanes, see
[`docs/INTERNAL_FEATURES.md`](docs/INTERNAL_FEATURES.md).

For the ClawSweeper feedback loop that updates existing generated PRs, see
[`docs/repair/auto-update-prs.md`](auto-update-prs.md).

That loop is marker-driven. ClawSweeper comments use hidden
`clawsweeper-verdict:*` markers, and only actionable PR feedback includes
`clawsweeper-action:fix-required`. ClawSweeper skips stale head SHAs and caps
automatic repairs at ten per PR and one per PR head SHA.

Maintainers can opt an existing PR into the bounded repair-only loop with
`/clawsweeper autofix`, or into the bounded merge loop with
`/clawsweeper automerge`. Autofix adds `clawsweeper:autofix`, dispatches
ClawSweeper for the current head, and lets ClawSweeper repair trusted
`needs-changes` findings for up to ten rounds without merging. Automerge adds
`clawsweeper:automerge` and can merge only after a trusted pass verdict for the
exact current head plus a non-draft PR, green checks, clean mergeability, and
explicit `CLAWSWEEPER_ALLOW_MERGE=1` and `CLAWSWEEPER_ALLOW_AUTOMERGE=1` gates.

ClawSweeper commit findings have a separate intake lane. A
`clawsweeper_commit_finding` dispatch fetches the latest markdown commit report,
writes an audit record under `results/commit-findings/`, and only sends the
finding into the PR executor when the issue is narrow, non-security, and still
worth repairing on latest `main`.

Each cluster job:

1. Starts from one markdown job file under `jobs/`.
2. Hydrates the listed issue/PR refs and first-hop linked refs.
3. Builds a cluster plan and fix artifact for autonomous jobs.
4. Runs Codex with repo-local policy prompts and JSON output schema in a read-only sandbox.
5. Writes structured run artifacts under `.clawsweeper-repair/runs/`.
6. Reviews the worker artifact with deterministic safety checks.
7. Executes credited fix artifacts through `scripts/execute-fix-artifact.ts` when the fix gate is open: repair a writable contributor branch first, treating same-repo head branches as writable even when GitHub reports `maintainer_can_modify=false`; otherwise raise a narrow replacement PR, copy source labels, add non-bot source PR authors as replacement co-authors, and close the uneditable source PR after the replacement push succeeds.
8. Applies guarded close/comment and explicit merge actions through `scripts/apply-result.ts`.
9. Publishes a sanitized result ledger back to this repo under `results/`, `jobs/openclaw/closed/`, `repair-apply-report.json`, and this repair dashboard.

Codex does not receive a GitHub token during classification. The runner preflights GitHub state before model execution, then Codex receives those artifacts and returns JSON only. When a reviewed fix artifact is executed, Codex gets a temporary target checkout without GitHub credentials; the deterministic executor owns commit, push, PR creation, and source-PR closeout using the short-lived GitHub App token exposed to the executor as `GH_TOKEN`. Commit author metadata defaults to `clawsweeper-repair` and can be overridden with `CLAWSWEEPER_GIT_USER_NAME` and `CLAWSWEEPER_GIT_USER_EMAIL`; this is separate from the GitHub token used to push. The applicator re-fetches the target item, checks `updated_at`, blocks unsafe closeouts, writes idempotent close comments, closes supported duplicate/superseded/fixed-by-candidate actions, and can squash-merge explicitly allowed clean PR actions.

Merge is deliberately harder than closeout. A merge action must include `merge_preflight` proving security clearance, resolved human comments, resolved review-bot findings, a passed Codex `/review`, addressed review findings, and clean validation commands. The fix executor runs an agentic edit/review loop before it writes a fix PR: edit, validate, Codex `/review`, address findings, revalidate, and resolve PR review threads when permitted. The applicator also checks live unresolved GitHub review threads immediately before merge.

Replacement fix work uses a recoverable target branch named `clawsweeper/<cluster-id>`. The executor resumes that branch if it already exists and pushes checkpoint commits after agent edits and review-fix edits, adding `Co-authored-by` trailers for non-bot source PR authors when a contributor PR is replaced. It then opens or updates the PR only after validation and Codex `/review` pass. If `/review` still blocks the merge after retries, the run writes a blocked fix report and leaves the checkpoint branch recoverable instead of losing the patch.

Runs for the same job path and mode are queued instead of running concurrently. The workflow uses Node 24, `blacksmith-4vcpu-ubuntu-2404` for cluster planning/review, and `blacksmith-16vcpu-ubuntu-2404` for fix/apply execution. Fix execution prepares the target checkout with Corepack and the target `pnpm` package manager before validation; the execution job caches Codex, npm, Corepack, and the target pnpm store. Fix validation is pinned to OpenClaw's fast changed-lane posture by default: `pnpm check:changed` plus diff checks are the hard local gate, and target validation commands normalize to `pnpm check:changed` unless `CLAWSWEEPER_TARGET_VALIDATION_MODE=strict` or `CLAWSWEEPER_STRICT_TARGET_VALIDATION=1` is explicitly set. Unrelated flaky main CI, broad `pnpm check`, full tests, live, docker, and e2e lanes do not block narrow ClawSweeper Repair fixes by default.

Full worker prompts, Codex transcripts, and raw artifacts stay in GitHub Actions. The committed ledger keeps only the cluster summary, run URL, action counts, apply outcomes, closed targets, and human-review entries.

## Modes

- `plan`: produces recommendations only.
- `execute`: can apply reviewed safe close and explicit clean merge actions from structured JSON.
- `autonomous`: adds live cluster preflight and fix-artifact generation. It may recommend and drive a canonical fix path; direct mutation still goes through the fix executor and applicator gates.
- `route_security`: quarantines true security-sensitive refs without poisoning unrelated cluster work.
- `needs_human`: only product-direction, trust-boundary, canonical-choice, merge-path, or contributor-credit decisions that remain unclear after the hydrated artifact and single-item review/check/decide pass.
- Automated reviewer feedback must be cleared during autonomous PR work. Greptile, Codex, Asile, CodeRabbit, Copilot, and similar bot comments must be addressed, proven non-actionable, or escalated before any merge or post-merge closeout recommendation.
- Merge preflight: no PR can merge until `CLAWSWEEPER_ALLOW_MERGE=1`, security issues are cleared, comments are resolved, Codex `/review` has passed, findings are addressed, and changed-surface validation is clean. With the merge gate closed, ClawSweeper Repair labels merge-ready targets for human review instead of merging.
- Final base sync: before pushing a repaired branch, ClawSweeper fetches latest `origin/main`. If main moved after validation, the worker rebases again; conflict resolution goes back through Codex, then validation and Codex `/review` rerun before the branch can be pushed.
- Repair ladder: make the useful contributor PR mergeable when its branch is writable; same-repo PRs are writable by the GitHub App contents permission even when the raw maintainer-edit flag is false. Otherwise replace draft, stale, unmergeable, uneditable, or unsafe branches with a narrow credited fix PR. When fix PR mode is enabled, "wait or replace" is already answered: replace, preserve credit and labels, then supersede only the source PR that could not be safely updated.

## Maintainer Comment Commands

ClawSweeper can route maintainer comments from target repositories back into the
cloud repair workflow. It recognizes both command styles:

```text
/clawsweeper status
@openclaw-clawsweeper status
@clawsweeper status
```

Accepted mentions are `@clawsweeper`, `@clawsweeper[bot]`,
`@openclaw-clawsweeper`, or `@openclaw-clawsweeper[bot]`.

Only maintainers can trigger it. The router checks GitHub `author_association`
and accepts `OWNER`, `MEMBER`, and `COLLABORATOR` by default. Contributor and
unknown comments are ignored without a reply.

Supported commands:

```text
/review
/clawsweeper status
/clawsweeper re-review
/clawsweeper fix ci
/clawsweeper address review
/clawsweeper rebase
/clawsweeper autofix
/clawsweeper automerge
/clawsweeper approve
/clawsweeper explain
/clawsweeper stop
@clawsweeper re-review
@clawsweeper review
@openclaw-clawsweeper fix ci
@clawsweeper why did automerge stop here?
```

`status` and `explain` post a short status reply. `review` and `re-review`
dispatch ClawSweeper review again for an open issue or PR. `fix ci`, `address review`,
and `rebase` dispatch the normal `repair-cluster-worker.yml` repair path, but only for
existing ClawSweeper PRs identified by the `clawsweeper/*` branch.
Freeform maintainer mentions such as `@clawsweeper why did automerge stop here?`
dispatch a read-only assist review. The answer lands in the next ClawSweeper
comment; action-looking prose can only become existing structured
recommendations and still passes the normal deterministic gates.
`autofix` opts an open PR into the bounded review/fix loop and never merges.
`automerge` opts an open PR into the bounded review/fix/merge loop, but draft
PRs stay fix-only until GitHub marks them ready for review. `approve` is
maintainer-only exact-head approval after a human-review pause; it clears pause
labels and merges only when the normal automerge readiness checks and merge
gates pass. `stop` labels the item for human review.

The router writes an idempotency marker into each reply and records processed
comments in `results/comment-router.json`. The scheduled workflow is dry by
default; set `CLAWSWEEPER_COMMENT_ROUTER_EXECUTE=1` to let scheduled runs post
replies and dispatch workers.

## Local Run

Requires Node 24.

```bash
# Validate all job files.
pnpm run repair:validate

# Render a plan-mode prompt without running Codex.
pnpm run repair:render -- jobs/openclaw/inbox/cluster-example.md --mode plan

# Dry-run a worker without calling Codex.
pnpm run repair:worker -- jobs/openclaw/inbox/cluster-example.md --mode plan --dry-run

# Build an offline autonomous cluster/fix artifact.
pnpm run repair:build-fix-artifact -- jobs/openclaw/inbox/autonomous-example.md --offline

# Stage low-signal PR sweep jobs from local gitcrawl data.
pnpm run repair:import-gitcrawl-low-signal -- --limit 20 --batch-size 5 --mode autonomous --sort stale

# Stage the next largest active gitcrawl clusters, skipping already-imported and
# fully security-sensitive clusters by default. Mixed clusters can route security
# refs while continuing ordinary bug/dedupe work.
pnpm run repair:import-gitcrawl -- --from-gitcrawl --limit 40 --mode autonomous --suffix autonomous-smoke --allow-instant-close --allow-merge --allow-fix-pr --allow-post-merge-close

# Dispatch reviewed jobs. Dispatch, requeue, and self-heal refuse to exceed
# 50 live cluster-worker runs by default; tune with CLAWSWEEPER_MAX_LIVE_WORKERS
# or --max-live-workers. With --wait-for-capacity, dispatch can drain a larger
# file list in capacity-sized waves instead of refusing the whole batch.
CLAWSWEEPER_MAX_LIVE_WORKERS=50 pnpm run repair:dispatch -- jobs/openclaw/inbox/cluster-example.md \
  --mode autonomous \
  --runner blacksmith-4vcpu-ubuntu-2404 \
  --execution-runner blacksmith-16vcpu-ubuntu-2404

# Find failed cluster jobs that have not been superseded by a later success.
pnpm run repair:self-heal

# Resolve a job from a run id or job path and show the requeue plan.
pnpm run repair:requeue -- 24947178021

# Requeue one reviewed job/run into the live queue. This briefly opens both
# write gates when the job is execute/autonomous, waits for the run to start,
# then closes the gates.
pnpm run repair:requeue -- 24947178021 --execute --open-execute-window \
  --runner blacksmith-4vcpu-ubuntu-2404 \
  --execution-runner blacksmith-16vcpu-ubuntu-2404

# Execute a reviewed fix artifact locally. Requires both execution gates and a write token.
CLAWSWEEPER_ALLOW_EXECUTE=1 CLAWSWEEPER_ALLOW_FIX_PR=1 pnpm run repair:execute-fix -- jobs/openclaw/inbox/cluster-example.md --latest --dry-run

# Rebuild the open ClawSweeper PR finalization report without mutating GitHub.
pnpm run repair:finalize-open-prs -- --write-report

# Dry-run maintainer comment routing. Recognizes `/clawsweeper ...`,
# `@clawsweeper ...`, and `@openclaw-clawsweeper ...` in recent issue/PR comments.
pnpm run repair:comment-router -- --repo openclaw/openclaw --lookback-minutes 180

# Execute maintainer comment routing: post replies, dispatch re-reviews, and
# dispatch repair workers for existing ClawSweeper PRs when maintainers ask for
# `fix ci`, `address review`, or `rebase`.
pnpm run repair:comment-router -- --repo openclaw/openclaw --execute --wait-for-capacity

# Dry-run job hygiene: classify old smoke jobs, outbox-ready jobs, unprocessed
# jobs, and requeue candidates without deleting, moving, or dispatching.
pnpm run repair:sweep-openclaw-jobs -- --live

# Apply reviewed job hygiene. This deletes old smoke jobs, moves finalized jobs
# to jobs/openclaw/outbox/finalized, and parks never-run backlog in
# jobs/openclaw/outbox/stuck; it never dispatches workers.
pnpm run repair:sweep-openclaw-jobs -- --live --apply-delete-tests --apply-outbox --apply-stuck

# Dry-run a parked-backlog promotion from outbox/stuck back into inbox.
pnpm run repair:promote-stuck-jobs -- --limit 20

# Promote the largest parked-backlog jobs into the active queue.
pnpm run repair:promote-stuck-jobs -- --sort size --limit 20 --apply

# Promote every parked-backlog job, largest clusters first.
pnpm run repair:promote-stuck-jobs -- --sort size --limit all --apply

# Dry-run the ClawSweeper label backfill. This verifies live GitHub state and
# reports the exact PRs/issues that would receive the "clawsweeper" label.
pnpm run repair:tag-clawsweeper -- --live

# Apply the label backfill after reviewing the dry-run report.
CLAWSWEEPER_ALLOW_EXECUTE=1 pnpm run repair:tag-clawsweeper -- --live --apply

# Retry failed jobs once. This briefly opens the execution gate, waits for the
# dispatched workers to start, records the self-heal ledger, and closes the gate.
pnpm run repair:self-heal -- --execute --open-execute-window --max-jobs 5 \
  --max-live-workers 50 \
  --runner blacksmith-4vcpu-ubuntu-2404 \
  --execution-runner blacksmith-16vcpu-ubuntu-2404
```

## Checks

```bash
pnpm run repair:validate
pnpm run check
pnpm run repair:review-results -- .clawsweeper-repair/runs
pnpm run repair:publish-result -- .clawsweeper-repair/runs
git diff --check
```

## GitHub Actions Setup

The workflow needs:

- Codex/OpenAI authentication for model execution
- a read-only GitHub token for worker inspection
- a separate write-scoped GitHub token for the deterministic applicator
- execution gates that default closed: set `CLAWSWEEPER_ALLOW_EXECUTE=1` and `CLAWSWEEPER_ALLOW_FIX_PR=1` only for an intentional execution window; otherwise execute/autonomous dispatches render plan-only output and skip mutation steps
- merge is separately gated by `CLAWSWEEPER_ALLOW_MERGE`; automerge additionally requires `CLAWSWEEPER_ALLOW_AUTOMERGE`; both default to `0`, and merge-ready PRs are labeled `clawsweeper:human-review` and `clawsweeper:merge-ready` for a maintainer to merge manually
- optional `CLAWSWEEPER_CODEX_CLI_VERSION` variable to pin and refresh the cached Codex CLI
- optional `CLAWSWEEPER_MODEL` override for dispatch scripts; default Codex model is `gpt-5.5`
- optional `CLAWSWEEPER_MAX_LIVE_WORKERS` variable for dispatch/requeue/self-heal worker fan-out; default is `50`
- optional `CLAWSWEEPER_MAX_ACTIVE_PRS_PER_AREA` variable for replacement PR backpressure; default is `50` open ClawSweeper PRs per touched area, `0` disables the area cap, and common changelog/release-note files are ignored for this check
- ClawSweeper commit-finding repair PRs are labeled `clawsweeper:commit-finding`
- optional `CLAWSWEEPER_CODEX_TIMEOUT_MS` and `CLAWSWEEPER_FIX_CODEX_TIMEOUT_MS` variables; worker planning defaults to 30 minutes, while fix execution defaults to a 20 minute Codex budget inside the 30 minute build-PR step so timeout artifacts can be written
- optional `CLAWSWEEPER_CODEX_REVIEW_ATTEMPTS` and `CLAWSWEEPER_RESOLVE_REVIEW_THREADS` variables for agentic merge-prep review loops
- optional `CLAWSWEEPER_MAX_REPAIRS_PER_PR` and
  `CLAWSWEEPER_MAX_REPAIRS_PER_HEAD` variables for trusted
  ClawSweeper review feedback; defaults are `10` automatic repair iterations per
  PR and `1` repair per PR head SHA. The per-PR cap is total across changing
  head SHAs and stops the automatic review/repair loop.
- optional `CLAWSWEEPER_COMMENT_ROUTER_EXECUTE=1` to let the scheduled comment
  router respond to maintainer-only `/clawsweeper ...` and
  `@clawsweeper ...` / `@openclaw-clawsweeper ...` commands. Without it,
  scheduled runs only write a dry report.

Keep exact secret names, token scopes, and execution-window procedures in private operations docs or repository settings notes. Do not put token values or live operational credentials in job files.
