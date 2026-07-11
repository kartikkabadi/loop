# Loop / ClawSweeper → Devin Port — Implementation Tasks

Derived from `DEVIN_PORT_MAP.md` on `/Users/user/Developer/loop` (`kartikkabadi/loop`).

**Status:** Planning checklist only. Implementation has not begun.

Approved architecture (do not redesign): Phase 0 ACP+Box proof first; Box-hosted ACP client beside `devin acp`; session/capability `AgentSessionRuntime`; separate `CrabboxWorkspaceHost`; no production Devin on GHA; Devin auth only on Box; fresh-session + clean exact-head review isolation; `devin -p` diagnostic only; capability-gated optional ACP ops; no greenfield control plane; preserve #494 pinned-base post-sync review.

---

## Global invariants

- Models never receive GitHub write credentials, App private keys, Box API keys, or Cloudflare admin tokens.
- Host validators remain authoritative.
- Never push to `openclaw/clawsweeper`.
- Do not delete Codex until `DEVIN_PORT_MAP.md` §13 criteria pass.

---

## Phase 0 — Empirical ACP + Box + Crabbox proof

### PR 0A — Box / Crabbox provisioning and transport proof

| Field | Content |
|---|---|
| **Goal** | Prove ASCII Box acquire/sync/launch/collect/stop via Crabbox and/or `box` CLI; document stdin limitations (`ssh -n`, `ReadAll`). |
| **In-scope files** | `docs/repair/devin-acp-box-spike.md` (new); optional notes under `docs/repair/`; no production source |
| **Non-goals** | No ACP client yet; no ClawSweeper workflow cutover; no Devin production path |
| **Preserved behavior** | Existing hydrate/AWS Crabbox paths untouched |
| **Tests** | Manual canary checklist recorded in spike doc; no CI gate required |
| **Acceptance** | Recorded Box id lifecycle; sync of a known file; artifact round-trip; stop/release; explicit statement that stream SSH is not duplex ACP |
| **Dependencies** | ASCII Box account; Crabbox ascii-box provider and/or `box` CLI |
| **Rollback** | Delete spike doc / stop Boxes |
| **Risks** | Quota/TTL; confusing hydrate with production workers |

### PR 0B — Minimal ACP client protocol proof (inside Box)

| Field | Content |
|---|---|
| **Goal** | Run a minimal ACP client **on Box** that spawns local `devin acp` and exercises `initialize`, auth-as-needed, `session/new`, `session/prompt`, `session/update`, `session/cancel`. |
| **In-scope files** | Spike harness under `scripts/spikes/devin-acp-box/` (or docs-only transcripts if harness kept out-of-tree); update spike doc |
| **Non-goals** | No permanent `AgentSessionRuntime`; no workflow wiring; no `devin -p` as architecture |
| **Preserved behavior** | Production Codex lanes unchanged |
| **Tests** | Pass/fail matrix rows for initialize/new/prompt/update/cancel; capture exact capability JSON |
| **Acceptance** | Capability dump committed (redacted); cancel during a tool op demonstrated or explicitly failed |
| **Dependencies** | PR 0A; Devin Pro credentials on Box |
| **Rollback** | Remove spike harness |
| **Risks** | Editor-oriented ACP docs ≠ headless; auth surprises |

### PR 0C — Session recovery, reviewer isolation, security proof

| Field | Content |
|---|---|
| **Goal** | Prove second prompt; process restart load/resume **if advertised**; Box stop/resume recovery **if advertised**; independent review on clean exact-head checkout; env audit that Devin lacks GitHub/Box control secrets; structured JSON artifact + host validation script. |
| **In-scope files** | Spike doc matrix completion; tiny host validator script under `scripts/spikes/` validating a fixture schema subset |
| **Non-goals** | Do not claim `--agent-type review` adequacy unless measured; no production cutover |
| **Preserved behavior** | Host schema semantics unchanged |
| **Tests** | Matrix rows 13–20 from `DEVIN_PORT_MAP.md` §12 |
| **Acceptance** | Written go/no-go for Phase 2 API shape; steer strategy chosen from measured capabilities |
| **Dependencies** | PR 0B |
| **Rollback** | Spike-only |
| **Risks** | Missing resume/close capabilities force product fallbacks |

---

## Phase 1 — Host-owned result contracts

### PR 1 — Host result-contract tests

| Field | Content |
|---|---|
| **Goal** | Prove decision/repair JSON enforceable without Codex `--output-schema`. |
| **In-scope files** | `test/repair/structured-result-contract.test.ts` (new); fixtures under `test/fixtures/`; exercise `schema/clawsweeper-decision.schema.json`, `schema/repair/codex-result.schema.json`, `src/repair/review-results.ts` |
| **Non-goals** | No schema semantic weakening; no Devin code |
| **Preserved behavior** | Live Codex still uses `--output-schema` |
| **Tests** | Valid accept; missing fields reject; `merge_preflight.codex_review` failures stable |
| **Acceptance** | Tests pass without model binary |
| **Dependencies** | None (can parallel Phase 0) |
| **Rollback** | Remove tests/fixtures |
| **Risks** | Overfitting evidence regex (`/review\|codex review`) |

---

## Phase 2 — Runtime and host seams

### PR 2A — `AgentSessionRuntime` contracts

| Field | Content |
|---|---|
| **Goal** | Introduce session/capability-oriented TypeScript contracts shaped by Phase 0 capability dump. |
| **In-scope files** | `src/agent-session-runtime.ts` (types + interface only); unit tests with fake capability sets |
| **Non-goals** | No Codex behavior change; no Devin implementation; no permanent `run()` interface |
| **Preserved behavior** | All production paths still call Codex modules directly until 2B |
| **Tests** | Compile-time/type tests; fake capability gating for optional methods |
| **Acceptance** | Optional methods absent unless capability flag set in fake |
| **Dependencies** | PR 0C go decision; PR 1 preferred |
| **Rollback** | Revert types |
| **Risks** | Designing beyond measured capabilities |

### PR 2B — `CodexProcessAdapter` (behavior-preserving)

| Field | Content |
|---|---|
| **Goal** | Wrap `runCodexProcess` / app-server selection behind a transitional adapter used by existing call sites. |
| **In-scope files** | `src/codex-process-adapter.ts`; wire `clawsweeper.ts`, `commit-sweeper.ts`, `pr-close-coverage-proof.ts`, `repair/run-worker.ts`, `repair/execute-fix-artifact.ts`; `test/codex-process.test.ts` updates |
| **Non-goals** | Do not pretend adapter is `AgentSessionRuntime`; no workflow changes |
| **Preserved behavior** | Identical argv, env scrub, steerable path, timeouts, #494 review loops |
| **Tests** | Existing Codex process tests green; fake `CODEX_BIN` parity |
| **Acceptance** | `pnpm run build:all && pnpm run test:repair` green; no `.github/workflows` diff |
| **Dependencies** | PR 2A |
| **Rollback** | Revert adapter; restore direct `runCodexProcess` imports |
| **Risks** | Missed call sites; async mismatch |

### PR 2C — `CrabboxWorkspaceHost` boundary

| Field | Content |
|---|---|
| **Goal** | Narrow host interface for acquire/sync/launch/observe/collect/stop without owning ACP. |
| **In-scope files** | `src/crabbox-workspace-host.ts` (interface + thin CLI wrapper stubs); tests with fake shell |
| **Non-goals** | No production workflow switch; no ACP tunneling |
| **Preserved behavior** | Existing Crabbox hydrate unchanged |
| **Tests** | Fake host records lifecycle calls in order |
| **Acceptance** | Interface documents stdin non-duplex constraint |
| **Dependencies** | PR 0A findings |
| **Rollback** | Revert module |
| **Risks** | Over-abstracting into a fleet platform |

---

## Phase 3 — Box-hosted worker

### PR 3 — Box-hosted Devin ACP worker

| Field | Content |
|---|---|
| **Goal** | Ship worker entry that runs on ASCII Box, drives `devin acp`, writes results/evidence/heartbeats. |
| **In-scope files** | `src/box-agent-worker/` (or `src/repair/box-agent-worker.ts` + helpers); implements `AgentSessionRuntime` for Devin ACP; permission policy; artifact writer |
| **Non-goals** | Full lane cutover; GHA-hosted Devin; `devin -p` production path |
| **Preserved behavior** | Codex lanes default |
| **Tests** | Fake ACP server fixtures; optional recorded Box canary notes |
| **Acceptance** | Canary: Box up → ACP session → validated JSON → collect → stop; env scrub verified |
| **Dependencies** | PR 0C, 2A, 2C |
| **Rollback** | Flag off; unused worker |
| **Risks** | Permission loops; credential leakage; incomplete cancel |

---

## Phase 4 — Crabbox execution integration

### PR 4 — Opt-in Crabbox execution path beside Codex

| Field | Content |
|---|---|
| **Goal** | Wire coordinator to CrabboxWorkspaceHost for flagged jobs while Codex remains default. |
| **In-scope files** | `repair-cluster-worker.yml` (conditional steps only); thin glue in `src/repair/workflow-utils.ts` or new `src/repair/box-dispatch.ts`; secrets docs for `ASCII_BOX_API_KEY` |
| **Non-goals** | Replacing Blacksmith defaults; `setup-devin` on GHA |
| **Preserved behavior** | Default Codex path identical |
| **Tests** | Workflow structure tests; dry-run dispatch unit tests |
| **Acceptance** | Flagged job completes via Box worker; default job still Codex |
| **Dependencies** | PR 3 |
| **Rollback** | Disable flag |
| **Risks** | Secret placement mistakes; quota |

---

## Phase 5 — Role cutover

### PR 5A — Planning lane → Devin ACP

| Field | Content |
|---|---|
| **Goal** | Plan worker uses Box ACP path when flagged; still emits `result.json` for `review-results.ts`. |
| **In-scope** | `src/repair/run-worker.ts`; prompts addendum only if required for JSON artifact path; flag plumbing |
| **Non-goals** | Execute/review cutover |
| **Preserved** | Schema + `repairResultIfNeeded` host loop |
| **Tests** | `run-worker.test.ts` with fake runtime; contract tests |
| **Acceptance** | Flagged plan produces review-results-clean JSON |
| **Dependencies** | PR 4, PR 1 |
| **Rollback** | Flag off |
| **Risks** | Structured output reliability |

### PR 5B — Builder/write lane → Devin ACP

| Field | Content |
|---|---|
| **Goal** | `execute-fix-artifact` edit loops call Devin ACP worker when flagged. |
| **In-scope** | `src/repair/execute-fix-artifact.ts` write/reconcile paths; timeout budgets unchanged |
| **Non-goals** | Independent review cutover in same PR |
| **Preserved** | Target validation allowlists; GitHub mutation isolation |
| **Tests** | Source tests for sequencing; security-boundary |
| **Acceptance** | Flagged execute edits land; tokens scrubbed |
| **Dependencies** | PR 5A |
| **Rollback** | Flag off |
| **Risks** | Permission mode too open |

### PR 5C — Independent reviewer lane

| Field | Content |
|---|---|
| **Goal** | Independent review uses fresh session + clean exact-head worktree (preferred separate Box); preserve #494 `reviewAfterFinalBaseSync`. |
| **In-scope** | `execute-fix-artifact.ts` review helpers; `execution-finalization.ts` call sites; optional dual-accept evidence strings with tests |
| **Non-goals** | Session-ID-only isolation; assuming `--agent-type review` without Phase 0 proof |
| **Preserved** | Pinned-base gate; post-flight merge preflight validation |
| **Tests** | Finalization tests; isolation checklist canary |
| **Acceptance** | Review bound to base+head; new review after material head change |
| **Dependencies** | PR 5B, PR 0C |
| **Rollback** | Codex `/review` path |
| **Risks** | Insufficient isolation; evidence regex breakage |

### PR 5D — Structured-result repair on Devin

| Field | Content |
|---|---|
| **Goal** | `repairResultIfNeeded` uses Devin ACP when plan lane is Devin. |
| **In-scope** | `src/repair/run-worker.ts` |
| **Non-goals** | Schema changes |
| **Preserved** | Attempt/timeout env semantics |
| **Tests** | Invalid→valid repair fixture with fake runtime |
| **Acceptance** | Same artifacts naming; validator exit 0 |
| **Dependencies** | PR 5A |
| **Rollback** | Codex repair pass |
| **Risks** | Infinite low-quality repairs |

### PR 5E — CI / review-feedback repair

| Field | Content |
|---|---|
| **Goal** | Post-CI / review-thread repair loops on Devin path. |
| **In-scope** | Relevant branches of `execute-fix-artifact.ts`, `post-flight.ts` integration points only as needed |
| **Non-goals** | Automerge policy redesign |
| **Preserved** | Deterministic merge gates |
| **Tests** | Post-flight + execute source tests |
| **Acceptance** | Flagged CI-repair canary |
| **Dependencies** | PR 5C |
| **Rollback** | Codex |
| **Risks** | Flaky CI interaction |

---

## Phase 6 — Workflow and credential cutover

### PR 6 — Workflow/credential cutover (no GHA Devin)

| Field | Content |
|---|---|
| **Goal** | Production flagged lanes invoke Crabbox/Box only; remove OpenAI secrets from cut-over lanes; update dashboard Codex assumptions. |
| **In-scope** | `.github/workflows/repair-cluster-worker.yml`, `sweep.yml` (as lanes cut); `dashboard/worker.ts`; secret inventory docs in `docs/repair/` |
| **Non-goals** | `setup-devin` as final GHA design; deleting Codex source yet |
| **Preserved** | App/state/status secrets on GHA; Codex rollback lane until soak |
| **Tests** | Workflow tests; dashboard tests |
| **Acceptance** | Cut-over lanes run without Actions-hosted Devin or OpenAI for those lanes |
| **Dependencies** | PR 5A–5E as applicable |
| **Rollback** | Re-enable Codex job steps |
| **Risks** | Secret mis-scoping; dashboard false idle |

---

## Phase 7 — Autonomous soak

### PR 7 — Autonomous convergence soak harness

| Field | Content |
|---|---|
| **Goal** | Prove issue→PR, CI repair, reviewer repair, upstream feedback, exact-head invalidation, bounded retries, Box cleanup, eligible merge on owned repos. |
| **In-scope** | Soak checklist doc; optional metrics script under `scripts/`; no broad product changes |
| **Non-goals** | Deleting Codex mid-soak |
| **Preserved** | Bounded rollback path |
| **Tests** | Recorded canaries + existing e2e-ish workflow tests |
| **Acceptance** | Signed soak report linked from docs |
| **Dependencies** | PR 6 |
| **Rollback** | Codex default |
| **Risks** | Incomplete cleanup leaking Boxes |

---

## Phase 8 — Remove Codex / OpenAI

### PR 8 — Delete Codex and OpenAI dependencies

| Field | Content |
|---|---|
| **Goal** | Remove Codex CLI integration, Responses proxy, OpenAI spam path, and related secrets after soak. |
| **In-scope** | `src/codex-*.ts`, `setup-codex`, `check-local-codex.mjs`, Codex-only tests, spam-scanner replacement, `codex_review`→`agent_review` after dual-read, workflow secret removals, CI grep guards |
| **Non-goals** | Rewriting validator semantics |
| **Preserved** | Host gates and mutation isolation |
| **Tests** | Full `pnpm run check` on Node 24; grep guards |
| **Acceptance** | `DEVIN_PORT_MAP.md` §13 checklist complete; rollback tag retained |
| **Dependencies** | PR 7 soak complete |
| **Rollback** | Revert deletion commit; restore secrets |
| **Risks** | Missed sparse-checkout paths; external forks |

---

## Explicitly rejected

- Permanent `AgentRuntime.run()` product contract
- Interface extraction before Phase 0
- Production Devin on GitHub-hosted runners / final `setup-devin`
- `crabbox run` as live ACP transport
- `devin -p` as autonomous worker
- Declaring `--agent-type review` proven without Phase 0
- Fresh session without clean exact-head checkout as independent review
- Vague “location TBD” / “wire integration” without file boundaries
- Greenfield Loop control plane replacing ClawSweeper orchestration

---

## PR count

**17 proposed implementation PRs** (0A, 0B, 0C, 1, 2A, 2B, 2C, 3, 4, 5A, 5B, 5C, 5D, 5E, 6, 7, 8).
