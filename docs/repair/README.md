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

Last dashboard update: Apr 29, 2026, 20:18 UTC

<!-- clawsweeper-repair-dashboard:start -->
State: Failed clusters need inspection

Scope: 268 active latest cluster reports. 1 policy-archived cluster(s) are excluded from health stats; run attempts are tracked as audit history only.

| Metric | Count | Rate |
| --- | ---: | ---: |
| Latest clusters reviewed | 268 | 100% |
| Policy-archived clusters | 1 | audit |
| Clean completed clusters | 100 | 37.3% |
| Needs-human clusters | 40 | 14.9% |
| Latest successful clusters | 243 | 90.7% |
| Latest failed clusters | 4 | 1.5% |
| Latest cancelled clusters | 0 | 0.0% |
| Run attempts archived | 512 | audit |
| Fix action attempts | 181 | audit |
| Fix actions executed | 0 | 0.0% |
| Fix actions failed | 35 | 19.3% |
| Fix actions blocked | 51 | 28.2% |
| Latest clusters with fix failures | 45 | 16.8% |
| Distinct PRs touched | 841 | 100% |
| Open PRs tracked | 273 | 32.5% |
| Closed unmerged PRs tracked | 463 | 55.1% |
| Completed close actions | 30 | 10.2% |
| Completed merge actions | 23 | 7.8% |
| Duplicate closes | 22 | 73.3% |
| Superseded closes | 0 | 0.0% |
| Fixed-by-candidate closes | 0 | 0.0% |
| Low-signal PR closes | 0 | 0.0% |
| Blocked mutation attempts | 122 | 41.5% |
| Skipped mutation attempts | 119 | 40.5% |

### Clusters Needing Inspection

| Cluster | State | Source job | Reason | Report | Run |
| --- | --- | --- | --- | --- | --- |
| [clawsweeper-commit-openclaw-openclaw-dac72374944f](results/openclaw/clawsweeper-commit-openclaw-openclaw-dac72374944f.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-dac72374944f.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-dac72374944f.md) | [25130221266](https://github.com/openclaw/clawsweeper/actions/runs/25130221266) |
| [clawsweeper-commit-openclaw-openclaw-323985f4caea](results/openclaw/clawsweeper-commit-openclaw-openclaw-323985f4caea.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-323985f4caea.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-323985f4caea.md) | [25129876483](https://github.com/openclaw/clawsweeper/actions/runs/25129876483) |
| [clawsweeper-commit-openclaw-openclaw-3059702687da](results/openclaw/clawsweeper-commit-openclaw-openclaw-3059702687da.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-3059702687da.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-3059702687da.md) | [25129224345](https://github.com/openclaw/clawsweeper/actions/runs/25129224345) |
| [automerge-openclaw-openclaw-74525](results/openclaw/automerge-openclaw-openclaw-74525.md) | apply blocked | jobs/openclaw/inbox/automerge-openclaw-openclaw-74525.md | job does not allow merge | [report](results/openclaw/automerge-openclaw-openclaw-74525.md) | [25129141344](https://github.com/openclaw/clawsweeper/actions/runs/25129141344) |
| [clawsweeper-commit-openclaw-openclaw-dabf76b3defd](results/openclaw/clawsweeper-commit-openclaw-openclaw-dabf76b3defd.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-dabf76b3defd.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-dabf76b3defd.md) | [25127795681](https://github.com/openclaw/clawsweeper/actions/runs/25127795681) |
| [clawsweeper-commit-openclaw-openclaw-57e4994caf6d](results/openclaw/clawsweeper-commit-openclaw-openclaw-57e4994caf6d.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-57e4994caf6d.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-57e4994caf6d.md) | [25128232401](https://github.com/openclaw/clawsweeper/actions/runs/25128232401) |
| [clawsweeper-commit-openclaw-openclaw-0126692bf5f5](results/openclaw/clawsweeper-commit-openclaw-openclaw-0126692bf5f5.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-0126692bf5f5.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-0126692bf5f5.md) | [25126940543](https://github.com/openclaw/clawsweeper/actions/runs/25126940543) |
| [clawsweeper-commit-openclaw-openclaw-db6951088a19](results/openclaw/clawsweeper-commit-openclaw-openclaw-db6951088a19.md) | fix blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-db6951088a19.md | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, extensions, extensionTests [check:changed] extensi... | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-db6951088a19.md) | [25128072554](https://github.com/openclaw/clawsweeper/actions/runs/25128072554) |
| [clawsweeper-commit-openclaw-openclaw-e69da9d5781c](results/openclaw/clawsweeper-commit-openclaw-openclaw-e69da9d5781c.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-e69da9d5781c.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-e69da9d5781c.md) | [25128116958](https://github.com/openclaw/clawsweeper/actions/runs/25128116958) |
| [clawsweeper-commit-openclaw-openclaw-d001c3436bbf](results/openclaw/clawsweeper-commit-openclaw-openclaw-d001c3436bbf.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-d001c3436bbf.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-d001c3436bbf.md) | [25128115424](https://github.com/openclaw/clawsweeper/actions/runs/25128115424) |
| [clawsweeper-commit-openclaw-openclaw-b54c642bd66a](results/openclaw/clawsweeper-commit-openclaw-openclaw-b54c642bd66a.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-b54c642bd66a.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-b54c642bd66a.md) | [25125778184](https://github.com/openclaw/clawsweeper/actions/runs/25125778184) |
| [clawsweeper-commit-openclaw-openclaw-43b084e5fa2e](results/openclaw/clawsweeper-commit-openclaw-openclaw-43b084e5fa2e.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-43b084e5fa2e.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-43b084e5fa2e.md) | [25125621579](https://github.com/openclaw/clawsweeper/actions/runs/25125621579) |
| [clawsweeper-commit-openclaw-openclaw-8c68e7535feb](results/openclaw/clawsweeper-commit-openclaw-openclaw-8c68e7535feb.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-8c68e7535feb.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-8c68e7535feb.md) | [25118636256](https://github.com/openclaw/clawsweeper/actions/runs/25118636256) |
| [clawsweeper-commit-openclaw-openclaw-587b537b4745](results/openclaw/clawsweeper-commit-openclaw-openclaw-587b537b4745.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-587b537b4745.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-587b537b4745.md) | [25115620740](https://github.com/openclaw/clawsweeper/actions/runs/25115620740) |
| [automerge-openclaw-clawsweeper-19](results/openclaw/automerge-openclaw-clawsweeper-19.md) | apply blocked | jobs/openclaw/inbox/automerge-openclaw-clawsweeper-19.md | job does not allow merge | [report](results/openclaw/automerge-openclaw-clawsweeper-19.md) | [25113267207](https://github.com/openclaw/clawsweeper/actions/runs/25113267207) |
| [clawsweeper-commit-openclaw-openclaw-fda8cc2a9d9a](results/openclaw/clawsweeper-commit-openclaw-openclaw-fda8cc2a9d9a.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-fda8cc2a9d9a.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-fda8cc2a9d9a.md) | [25095715904](https://github.com/openclaw/clawsweeper/actions/runs/25095715904) |
| [clawsweeper-commit-openclaw-openclaw-6a4c866b6a8b](results/openclaw/clawsweeper-commit-openclaw-openclaw-6a4c866b6a8b.md) | fix blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-6a4c866b6a8b.md | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-6a4c866b6a8b.md) | [25094690632](https://github.com/openclaw/clawsweeper/actions/runs/25094690632) |
| [clawsweeper-commit-openclaw-openclaw-4eba70b532f8](results/openclaw/clawsweeper-commit-openclaw-openclaw-4eba70b532f8.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-4eba70b532f8.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-4eba70b532f8.md) | [25093937673](https://github.com/openclaw/clawsweeper/actions/runs/25093937673) |
| [clawsweeper-commit-openclaw-openclaw-a887a512ef8e](results/openclaw/clawsweeper-commit-openclaw-openclaw-a887a512ef8e.md) | workflow failure | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-a887a512ef8e.md | Found one concrete CI regression. The commit adds duplicate `run_checks_node_extensions` keys in the workflow output map and manifest obj... | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-a887a512ef8e.md) | [25093541960](https://github.com/openclaw/clawsweeper/actions/runs/25093541960) |
| [clawsweeper-commit-openclaw-openclaw-5435591f6a1a](results/openclaw/clawsweeper-commit-openclaw-openclaw-5435591f6a1a.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-5435591f6a1a.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-5435591f6a1a.md) | [25090570865](https://github.com/openclaw/clawsweeper/actions/runs/25090570865) |
| [clawsweeper-commit-openclaw-openclaw-d130a77a3b1e](results/openclaw/clawsweeper-commit-openclaw-openclaw-d130a77a3b1e.md) | apply blocked | jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-d130a77a3b1e.md | job does not allow merge | [report](results/openclaw/clawsweeper-commit-openclaw-openclaw-d130a77a3b1e.md) | [25089704776](https://github.com/openclaw/clawsweeper/actions/runs/25089704776) |
| [ghcrawl-166004-agentic-merge](results/openclaw/ghcrawl-166004-agentic-merge.md) | fix blocked | jobs/openclaw/inbox/ghcrawl-166004-agentic-merge.md | Codex /review did not pass after 2 attempt(s): Cannot perform the review without inspecting the repository diff and validation state. | [report](results/openclaw/ghcrawl-166004-agentic-merge.md) | [25087637821](https://github.com/openclaw/clawsweeper/actions/runs/25087637821) |
| [ghcrawl-156863-autonomous-smoke](results/openclaw/ghcrawl-156863-autonomous-smoke.md) | apply blocked | jobs/openclaw/inbox/ghcrawl-156863-autonomous-smoke.md | merge requires CLAWSWEEPER_ALLOW_MERGE=1; labeled clawsweeper | [report](results/openclaw/ghcrawl-156863-autonomous-smoke.md) | [25086686616](https://github.com/openclaw/clawsweeper/actions/runs/25086686616) |
| [ghcrawl-156715-autonomous-smoke](results/openclaw/ghcrawl-156715-autonomous-smoke.md) | workflow failure | jobs/openclaw/inbox/ghcrawl-156715-autonomous-smoke.md | Hydrated preflight keeps #59752 as the non-security canonical repair path for the media-only same-target messaging reply suppression bug ... | [report](results/openclaw/ghcrawl-156715-autonomous-smoke.md) | [25085923969](https://github.com/openclaw/clawsweeper/actions/runs/25085923969) |
| [ghcrawl-156717-autonomous-smoke](results/openclaw/ghcrawl-156717-autonomous-smoke.md) | fix blocked | jobs/openclaw/inbox/ghcrawl-156717-autonomous-smoke.md | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] ui/src/styles/chat/layout.css... | [report](results/openclaw/ghcrawl-156717-autonomous-smoke.md) | [25085937628](https://github.com/openclaw/clawsweeper/actions/runs/25085937628) |

### Fix Failure Queue

| Cluster | Status | Target | Branch/PR | Reason | Run |
| --- | --- | --- | --- | --- | --- |
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
| [ghcrawl-156582-autonomous-smoke](results/openclaw/ghcrawl-156582-autonomous-smoke.md) | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=all [check:changed] extension-impacting surface; extension typechec... | [25069721873](https://github.com/openclaw/clawsweeper/actions/runs/25069721873) |
| [ghcrawl-156860-autonomous-smoke](results/openclaw/ghcrawl-156860-autonomous-smoke.md) | failed |  |  | base branch advanced after validation and clawsweeper-repair/repair-ghcrawl-156860-autonomous-smoke-53667 needs a fresh rebase pass: Reba... | [25043323244](https://github.com/openclaw/clawsweeper/actions/runs/25043323244) |
| [ghcrawl-156860-autonomous-smoke](results/openclaw/ghcrawl-156860-autonomous-smoke.md) | blocked |  |  | base branch advanced after validation and clawsweeper-repair/repair-ghcrawl-156860-autonomous-smoke-53667 needs a fresh rebase pass: Reba... | [25043323244](https://github.com/openclaw/clawsweeper/actions/runs/25043323244) |
| [ghcrawl-157006-autonomous-smoke](results/openclaw/ghcrawl-157006-autonomous-smoke.md) | failed |  |  | Codex /review failed: structured output was not written to repair-codex-review-1.json; stdout={"type":"thread.started","thread_id":"019dd... | [25040511075](https://github.com/openclaw/clawsweeper/actions/runs/25040511075) |
| [ghcrawl-157006-autonomous-smoke](results/openclaw/ghcrawl-157006-autonomous-smoke.md) | blocked |  |  | Codex /review failed: structured output was not written to repair-codex-review-1.json; stdout={"type":"thread.started","thread_id":"019dd... | [25040511075](https://github.com/openclaw/clawsweeper/actions/runs/25040511075) |
| [ghcrawl-156843-autonomous-smoke](results/openclaw/ghcrawl-156843-autonomous-smoke.md) | failed |  |  | base branch advanced after validation and clawsweeper-repair/repair-ghcrawl-156843-autonomous-smoke-49981 needs a fresh rebase pass: Reba... | [25039684300](https://github.com/openclaw/clawsweeper/actions/runs/25039684300) |
| [ghcrawl-156843-autonomous-smoke](results/openclaw/ghcrawl-156843-autonomous-smoke.md) | blocked |  |  | base branch advanced after validation and clawsweeper-repair/repair-ghcrawl-156843-autonomous-smoke-49981 needs a fresh rebase pass: Reba... | [25039684300](https://github.com/openclaw/clawsweeper/actions/runs/25039684300) |
| [ghcrawl-156832-autonomous-smoke](results/openclaw/ghcrawl-156832-autonomous-smoke.md) | failed |  |  | Codex /review did not pass after 2 attempt(s): Blocked: the branch is narrow and `pnpm check:changed` plus `git diff --check` pass, but t... | [25039623993](https://github.com/openclaw/clawsweeper/actions/runs/25039623993) |
| [ghcrawl-156832-autonomous-smoke](results/openclaw/ghcrawl-156832-autonomous-smoke.md) | blocked |  |  | Codex /review did not pass after 2 attempt(s): Blocked: the branch is narrow and `pnpm check:changed` plus `git diff --check` pass, but t... | [25039623993](https://github.com/openclaw/clawsweeper/actions/runs/25039623993) |
| [ghcrawl-156946-autonomous-smoke](results/openclaw/ghcrawl-156946-autonomous-smoke.md) | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 | [25040211577](https://github.com/openclaw/clawsweeper/actions/runs/25040211577) |
| [ghcrawl-156879-autonomous-smoke](results/openclaw/ghcrawl-156879-autonomous-smoke.md) | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 | [25039930706](https://github.com/openclaw/clawsweeper/actions/runs/25039930706) |
| [ghcrawl-156868-autonomous-smoke](results/openclaw/ghcrawl-156868-autonomous-smoke.md) | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 | [25039867359](https://github.com/openclaw/clawsweeper/actions/runs/25039867359) |
| [ghcrawl-156864-autonomous-smoke](results/openclaw/ghcrawl-156864-autonomous-smoke.md) | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 | [25039821052](https://github.com/openclaw/clawsweeper/actions/runs/25039821052) |
| [ghcrawl-156741-autonomous-smoke](results/openclaw/ghcrawl-156741-autonomous-smoke.md) | failed |  |  | base branch advanced after validation and clawsweeper-repair/repair-ghcrawl-156741-autonomous-smoke-59382 needs a fresh rebase pass: Reba... | [25039129783](https://github.com/openclaw/clawsweeper/actions/runs/25039129783) |
| [ghcrawl-156741-autonomous-smoke](results/openclaw/ghcrawl-156741-autonomous-smoke.md) | blocked |  |  | base branch advanced after validation and clawsweeper-repair/repair-ghcrawl-156741-autonomous-smoke-59382 needs a fresh rebase pass: Reba... | [25039129783](https://github.com/openclaw/clawsweeper/actions/runs/25039129783) |

### Top Blocked Reasons

| Reason | Latest count | Example cluster |
| --- | ---: | --- |
| action status is blocked | 89 | [ghcrawl-156636-autonomous-smoke](results/openclaw/ghcrawl-156636-autonomous-smoke.md) |
| job does not allow merge | 19 | [clawsweeper-commit-openclaw-openclaw-dac72374944f](results/openclaw/clawsweeper-commit-openclaw-openclaw-dac72374944f.md) |
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
| candidate fix is not merged | 1 | [ghcrawl-191459-agentic-merge](results/openclaw/ghcrawl-191459-agentic-merge.md) |
| Clear covered issue, but closeout is blocked on the canonical fix path landing. | 1 | [ghcrawl-156739-autonomous-smoke](results/openclaw/ghcrawl-156739-autonomous-smoke.md) |

### Open PR Finalizer Queue

| PR | Title | Cluster | Branch | Blockers | Next action |
| --- | --- | --- | --- | --- | --- |
| [#74585](https://github.com/openclaw/openclaw/pull/74585) | fix(ci): Found one CI reliability regression risk in the install-smoke Doc | clawsweeper-commit-openclaw-openclaw-dac72374944f | clawsweeper/clawsweeper-commit-openclaw-openclaw-dac72374944f | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#74584](https://github.com/openclaw/openclaw/pull/74584) | fix: Found one regression in the exported transcript mobile sidebar tr | clawsweeper-commit-openclaw-openclaw-323985f4caea | clawsweeper/clawsweeper-commit-openclaw-openclaw-323985f4caea | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#74582](https://github.com/openclaw/openclaw/pull/74582) | fix: Found one low-severity route-question recall regression in the co | clawsweeper-commit-openclaw-openclaw-8a3507e310c9 | clawsweeper/clawsweeper-commit-openclaw-openclaw-8a3507e310c9 | needs_merge_state:UNSTABLE, needs_checks:OpenGrep — PR Diff / Scan changed paths (precise):IN_PROGRESS, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74564](https://github.com/openclaw/openclaw/pull/74564) | fix: use agent auth scope in /models provider data | automerge-openclaw-openclaw-74525 | clawsweeper/automerge-openclaw-openclaw-74525 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / check-lint:FAILURE; CI / checks-node-channels:FAILURE; CI / checks-n... | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74563](https://github.com/openclaw/openclaw/pull/74563) | fix: Found one narrow regression risk in the new Ollama tool-call name | clawsweeper-commit-openclaw-openclaw-89f871679e8d | clawsweeper/clawsweeper-commit-openclaw-openclaw-89f871679e8d | needs_merge_state:UNSTABLE, needs_checks:CI / check-lint:FAILURE; CI / checks-node-channels:FAILURE; CI / checks-node-core-support-bounda... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74562](https://github.com/openclaw/openclaw/pull/74562) | fix: Found two release-validation regressions in the new focused live- | clawsweeper-commit-openclaw-openclaw-57e4994caf6d | clawsweeper/clawsweeper-commit-openclaw-openclaw-57e4994caf6d | needs_merge_state:UNSTABLE, needs_checks:CI / check-lint:FAILURE; CI / checks-node-channels:FAILURE; CI / checks-node-core-support-bounda... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74561](https://github.com/openclaw/openclaw/pull/74561) | fix: Found one low-severity diagnostics flag contract issue introduced | clawsweeper-commit-openclaw-openclaw-e69da9d5781c | clawsweeper/clawsweeper-commit-openclaw-openclaw-e69da9d5781c | needs_merge_state:UNSTABLE, needs_checks:CI / check-lint:FAILURE; CI / checks-node-channels:FAILURE; CI / checks-node-core-support-bounda... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74560](https://github.com/openclaw/openclaw/pull/74560) | fix: Found one low-severity compatibility regression in the diagnostic | clawsweeper-commit-openclaw-openclaw-d001c3436bbf | clawsweeper/clawsweeper-commit-openclaw-openclaw-d001c3436bbf | needs_merge_state:UNSTABLE, needs_checks:CI / check-lint:FAILURE; CI / checks-node-channels:FAILURE; CI / checks-node-core-support-bounda... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74533](https://github.com/openclaw/openclaw/pull/74533) | fix: Found one compatibility regression in the Discord public API barr | clawsweeper-commit-openclaw-openclaw-43b084e5fa2e | clawsweeper/clawsweeper-commit-openclaw-openclaw-43b084e5fa2e | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-channels:FAILURE; CI / checks-node-core-support-boundary:FAILURE; CI / checks-n... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74530](https://github.com/openclaw/openclaw/pull/74530) | fix: The one-line picker change hides unauthenticated catalog rows in | clawsweeper-commit-openclaw-openclaw-2bb16f771bb1 | clawsweeper/clawsweeper-commit-openclaw-openclaw-2bb16f771bb1 | needs_merge_state:UNSTABLE, needs_checks:Parity gate / Run the OpenAI / Opus 4.6 parity gate against the qa-lab mock:FAILURE; CI / check-... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74528](https://github.com/openclaw/openclaw/pull/74528) | fix: Found one compatibility regression in the new global Codex dynami | clawsweeper-commit-openclaw-openclaw-09baec68eac7 | clawsweeper/clawsweeper-commit-openclaw-openclaw-09baec68eac7 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-con... | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74527](https://github.com/openclaw/openclaw/pull/74527) | fix(ci): Found three actionable i18n regressions: the touched i18n test fi | clawsweeper-commit-openclaw-openclaw-297f4c6e603b | clawsweeper/clawsweeper-commit-openclaw-openclaw-297f4c6e603b | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI ... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74526](https://github.com/openclaw/openclaw/pull/74526) | fix: Found two actionable issues in the bundled runtime-deps staging c | clawsweeper-commit-openclaw-openclaw-8cf724a381a3 | clawsweeper/clawsweeper-commit-openclaw-openclaw-8cf724a381a3 | mergeability_unknown, merge_state_unknown, needs_checks:CI / build-artifacts:FAILURE; CI / checks-node-core-runtime-infra:FAILURE; CI / c... | refresh exact PR mergeability before deciding; do not merge while GitHub reports unknown |
| [#74525](https://github.com/openclaw/openclaw/pull/74525) | fix: Found one regression in the `/models` chat command path for agent | clawsweeper-commit-openclaw-openclaw-8a06db084d8a | clawsweeper/clawsweeper-commit-openclaw-openclaw-8a06db084d8a | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74524](https://github.com/openclaw/openclaw/pull/74524) | fix: Found one regression in model-list availability heuristics for pr | clawsweeper-commit-openclaw-openclaw-b418c08a2297 | clawsweeper/clawsweeper-commit-openclaw-openclaw-b418c08a2297 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI ... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74523](https://github.com/openclaw/openclaw/pull/74523) | fix: Found two heartbeat regressions in the changed behavior: default | clawsweeper-commit-openclaw-openclaw-3215ab6de5db | clawsweeper/clawsweeper-commit-openclaw-openclaw-3215ab6de5db | needs_merge_state:UNSTABLE, needs_checks:OpenGrep — PR Diff / Scan changed paths (precise):FAILURE; CI / check-lint:FAILURE; CI / checks-... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74522](https://github.com/openclaw/openclaw/pull/74522) | fix: Found one concrete regression in the new lock-owner disambiguatio | clawsweeper-commit-openclaw-openclaw-2d885a240272 | clawsweeper/clawsweeper-commit-openclaw-openclaw-2d885a240272 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI ... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74521](https://github.com/openclaw/openclaw/pull/74521) | fix: Found two concrete regressions in the shared helper extraction. T | clawsweeper-commit-openclaw-openclaw-0519107bd3e2 | clawsweeper/clawsweeper-commit-openclaw-openclaw-0519107bd3e2 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-con... | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74520](https://github.com/openclaw/openclaw/pull/74520) | fix: Found one reliability bug: the new Docker-daemon-unavailable bran | clawsweeper-commit-openclaw-openclaw-2dadc82cf453 | clawsweeper/clawsweeper-commit-openclaw-openclaw-2dadc82cf453 | needs_merge_state:UNSTABLE, needs_checks:Parity gate / Run the OpenAI / Opus 4.6 parity gate against the qa-lab mock:FAILURE; CI / checks... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74519](https://github.com/openclaw/openclaw/pull/74519) | fix: Found one remaining compatibility regression in the Discord publi | clawsweeper-commit-openclaw-openclaw-4e115c5dbb8a | clawsweeper/clawsweeper-commit-openclaw-openclaw-4e115c5dbb8a | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-con... | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#74518](https://github.com/openclaw/openclaw/pull/74518) | fix(ci): Found one low-severity formatting bug in the new loose-list parag | clawsweeper-commit-openclaw-openclaw-630629667c16 | clawsweeper/clawsweeper-commit-openclaw-openclaw-630629667c16 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI ... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74517](https://github.com/openclaw/openclaw/pull/74517) | fix: Found one regression in the runtime dependency staging cache. The | clawsweeper-commit-openclaw-openclaw-ca093d840292 | clawsweeper/clawsweeper-commit-openclaw-openclaw-ca093d840292 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI ... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74513](https://github.com/openclaw/openclaw/pull/74513) | fix(ci): Found one low-severity diagnostic bug in the new Full Release Val | clawsweeper-commit-openclaw-openclaw-9f213354628f | clawsweeper/clawsweeper-commit-openclaw-openclaw-9f213354628f | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-agentic-control-plane:FAILURE; CI ... | repair failing checks or document unrelated main flake with touched-surface proof |
| [#74512](https://github.com/openclaw/openclaw/pull/74512) | fix: Found one medium-confidence docs deployment compatibility risk: t | clawsweeper-commit-openclaw-openclaw-0126692bf5f5 | clawsweeper/clawsweeper-commit-openclaw-openclaw-0126692bf5f5 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-channels:FAILURE; CI / checks-node-core-support-boundary:FAILURE; CI / checks-n... | repair failing checks or document unrelated main flake with touched-surface proof |

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

Maintainers can opt an existing ClawSweeper PR into the bounded merge loop with
`/clawsweeper automerge`. That adds `clawsweeper:automerge`, dispatches
ClawSweeper for the current head, lets ClawSweeper repair trusted
`needs-changes` findings for up to ten rounds, and merges only after a trusted
pass verdict for the exact current head plus green checks, clean mergeability,
and explicit `CLAWSWEEPER_ALLOW_MERGE=1` and `CLAWSWEEPER_ALLOW_AUTOMERGE=1`
gates.

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
7. Executes credited fix artifacts through `scripts/execute-fix-artifact.ts` when the fix gate is open: repair a maintainer-editable contributor branch first, otherwise raise a narrow replacement PR, add non-bot source PR authors as replacement co-authors, and close the uneditable source PR after the replacement push succeeds.
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
- Repair ladder: make the useful contributor PR mergeable when its branch is maintainer-editable; otherwise replace draft, stale, unmergeable, uneditable, or unsafe branches with a narrow credited fix PR. When fix PR mode is enabled, "wait or replace" is already answered: replace, preserve credit, then supersede only the source PR that could not be safely updated.

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
`automerge` opts an open PR into the bounded review/fix/merge loop. `approve`
is maintainer-only exact-head approval after a human-review pause; it clears
pause labels and merges only when the normal automerge readiness checks and
merge gates pass. `stop` labels the item for human review.

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
