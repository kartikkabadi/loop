# Loop / ClawSweeper → Devin Port — Implementation Tasks

Derived from `DEVIN_PORT_MAP.md` on `/Users/user/Developer/loop` (`kartikkabadi/loop`).

**Status:** Planning document only. **Not an approved implementation start.**
**PR:** https://github.com/kartikkabadi/loop/pull/1 — documentation correction; **do not merge until architecture review passes.**

This revision supersedes earlier drafts that:

- treated a process-shaped `run()` as the permanent runtime;
- extracted the interface before ACP-on-Box proof;
- planned production Devin on GitHub Actions / `setup-devin`;
- assumed `crabbox run` was a duplex ACP transport;
- treated `devin -p` or `--agent-type review` as settled production mechanisms.

---

## Fixed architectural requirements

- **Loop** is the product (`kartikkabadi/loop`).
- **ClawSweeper** is the retained autonomous foundation.
- **Crabbox** is the remote execution layer; **ASCII Box** is the provider.
- **Devin** is the only intelligent runtime in the final deployed system.
- **No OpenAI API and no Codex runtime** in the final deployed system.
- **Devin ACP** (`devin acp` local stdio JSON-RPC) is the durable programmatic runtime.
- ACP client and `devin acp` are **colocated inside Box** by default.
- GitHub Actions coordinate Crabbox and deterministic CI/mutations; they **do not host production Devin**.
- Devin credentials live **on Box**, not in Actions for production execution.
- `devin -p` is diagnostic/smoke/temporary spike only.
- Independent review = **fresh session + isolated exact-head checkout** (preferred: separate verifier Box).
- Do not invent a greenfield Loop control plane.
- Preserve deterministic validators and #494 pinned-base post-sync review.
- Permanent TypeScript API is **frozen only after Phase 0**.

---

## Global invariants

- Models never receive GitHub write credentials, App private keys, Box API keys, or Cloudflare admin tokens.
- Host validators remain authoritative.
- Optional ACP operations are capability-gated from `initialize`.
- Never push to `openclaw/clawsweeper`.
- Do not delete Codex until `DEVIN_PORT_MAP.md` §12 criteria pass.

---

## Phase overview (required order)

| Phase | Goal |
|---|---|
| **0** | Empirical ACP + Box + Crabbox topology proof |
| **1** | Host-owned result-contract harness |
| **2** | Session runtime + Crabbox host seams (informed by Phase 0); Codex adapter transitional |
| **3** | Box-hosted Devin ACP worker |
| **4** | Crabbox execution integration |
| **5** | Role cutover (plan → build → review → repairs) |
| **6** | Workflow + credential cutover (no GHA-hosted Devin) |
| **7** | Autonomous convergence + soak |
| **8** | Remove Codex / OpenAI |

---

## Phase 0 — Empirical ACP + Box + Crabbox topology proof

### Goal
Prove the production topology on a real ASCII Box **before** freezing `AgentSessionRuntime`.

### Topology under test

```text
coordinator → Crabbox → ASCII Box → (ACP client + devin acp) → artifacts → validators
```

### In-scope
- Spike notes (e.g. `docs/repair/devin-acp-box-spike.md`) with redacted transcripts
- Minimal ACP client harness executed **inside** Box
- Pass/fail matrix covering items 1–20 in `DEVIN_PORT_MAP.md` §11 Phase 0
- Exact capture of Devin `initialize` capabilities
- Env audit proving control credentials absent from Devin
- Optional labeled `devin -p` install/auth smoke only (non-architecture)

### Non-goals
- No production source cutover
- No permanent API freeze before matrix review
- No assumption that `crabbox run` is a live ACP pipe
- No claim that `--agent-type review` is adequate until measured

### Acceptance
- Written pass/fail matrix checked into docs
- Explicit go/no-go for Phase 2 API shape
- Steer strategy chosen only from measured capabilities (native vs cancel+reprompt)

### Dependencies
- Devin Pro auth; ASCII Box; Crabbox ascii-box provider and/or `box` CLI

### Risks
- Editor-oriented ACP docs ≠ headless worker
- Missing load/resume/close capabilities
- Sandbox / permission surprises

---

## Phase 1 — Host-owned result-contract harness

### Goal
Prove decision and repair outputs are enforceable by host validators without Codex `--output-schema`.

### In-scope
- Fixture tests against `schema/clawsweeper-decision.schema.json` and `schema/repair/codex-result.schema.json`
- `review-results.ts` / decision-parser contract coverage
- Prefer **tests only**

### Non-goals
- Do not change schema semantics merely to ease Devin
- No Devin production wiring

### Acceptance
- Invalid fixtures fail deterministically without invoking any model binary

---

## Phase 2 — Runtime and host seams (informed by Phase 0)

### Goal
Implement seams matching **measured** capabilities while preserving Codex production behavior.

### In-scope
- `AgentSessionRuntime` (session/capability-oriented; optional methods capability-gated)
- Temporary `CodexProcessAdapter` wrapping `runCodexProcess` / app-server path — **not** the final contract
- `CrabboxWorkspaceHost` boundary where needed (acquire/sync/launch/observe/collect/stop)
- Sanitized child-env construction inside implementations (no public raw `ProcessEnv` contract)

### Non-goals
- Do not ship a permanent single `run()` agent interface
- Do not add production Devin execution in the same PR unless narrowly isolated and flagged off
- No `setup-devin` on GHA

### Acceptance
- Codex lane behavior unchanged by default
- Unit tests with fake ACP server reflecting Phase 0 capability set
- Document mapping from Phase 0 matrix → implemented methods

### Rollback
- Revert; Codex path remains sole production agent

---

## Phase 3 — Box-hosted Devin ACP worker

### Goal
Ship the worker that runs inside ASCII Box, spawns `devin acp`, drives ACP locally, writes results/evidence/heartbeats.

### In-scope
- Box worker package/entry (location TBD after Phase 0)
- Local stdio ACP client
- Host permission policy
- Structured artifact writer + host validation hook
- Fake ACP fixtures + real Box canary

### Non-goals
- Full lane cutover
- Tunneling ACP through Crabbox stdin

### Acceptance
- Canary: Box up → ACP session → validated JSON artifact → collect → Box stop
- Credential scrub verified in canary logs/env dump (redacted)

---

## Phase 4 — Crabbox execution integration

### Goal
Wire ClawSweeper orchestration to Crabbox workspace lifecycle for Devin jobs.

### In-scope
- Acquire / sync / launch worker / observe / collect / stop-release
- Opt-in flag beside existing Codex GHA lane (Codex = rollback)
- Secrets: Box/Crabbox controller credentials in Actions; Devin creds only on Box

### Non-goals
- Hosting Devin on Blacksmith
- Replacing all runners in one PR

### Acceptance
- Flagged job completes through Crabbox path
- Default remains Codex until Phase 5–6

---

## Phase 5 — Role cutover

### Goal
Move agent roles to Box-hosted Devin ACP in controlled order.

### Order
1. Planning (`run-worker` plan path)
2. Builder/write (`execute-fix-artifact` edit loops)
3. Independent reviewer (fresh session + clean exact-head checkout; preferred separate Box)
4. Structured-result repair
5. CI / review-feedback repair

### Must preserve
- Deterministic validators and GitHub mutation isolation
- #494 pinned-base + `reviewAfterFinalBaseSync` semantics
- Exact-head invalidation on material head changes

### Non-goals
- Automerge policy redesign
- Treating session-ID-only as reviewer isolation

### Acceptance
- Each role has explicit flag + rollback to Codex
- Reviewer isolation checklist from `DEVIN_PORT_MAP.md` §8 satisfied in canaries

---

## Phase 6 — Workflow and credential cutover

### Goal
Production workflows invoke Crabbox/Box-backed Devin; remove OpenAI requirements per completed lane.

### In-scope
- Workflow steps that call Crabbox (not `setup-devin` for production model hosting)
- Per-lane removal of `OPENAI_API_KEY` when that lane no longer needs Codex/OpenAI
- Dashboard/status text updates away from Codex-only assumptions as lanes cut over

### Explicitly rejected
- Final design centered on GitHub Actions `setup-devin`
- Production Devin auth on `ubuntu-latest` / Blacksmith

### Acceptance
- Cut-over lanes run without Actions-hosted Devin
- Codex/`setup-codex` retained only as rollback where still needed

---

## Phase 7 — Autonomous convergence and soak

### Goal
Prove end-to-end autonomy on eligible owned repositories with bounded retries and cleanup.

### Prove
- Issue → PR
- CI repair
- Reviewer repair
- Upstream feedback handling
- Exact-head invalidation
- Bounded retries
- Box cleanup
- Eligible merge

Retain bounded rollback through soak.

---

## Phase 8 — Remove Codex and OpenAI

### Goal
Delete Codex CLI integration, Responses proxy usage, OpenAI spam path, and related secrets after soak.

### Gate
All `DEVIN_PORT_MAP.md` §12 criteria.

### In-scope
- Remove `src/codex-*.ts`, `setup-codex`, Codex-only tests when safe
- Spam replacement (deterministic and/or Devin classify — product choice)
- Rename `codex_review` → `agent_review` after dual-read soak
- CI grep guards against reintroduction

---

## Explicitly rejected task shapes

- Permanent `AgentRuntime.run()` as the product contract
- Interface extraction before Phase 0
- Production Devin on GitHub-hosted runners / final `setup-devin`
- Assuming `crabbox run` is a live ACP transport
- Making `devin -p` the autonomous worker
- Declaring `--agent-type review` proven without Phase 0
- Fresh session without clean exact-head checkout as “independent review”
- Greenfield Loop control plane replacing ClawSweeper orchestration
- “Add Devin support” as a single PR

---

## Suggested merge order

```text
Phase0 (Box ACP proof)
  → Phase1 (host contracts)
  → Phase2 (session runtime + Codex adapter + Crabbox host seam)
  → Phase3 (Box worker)
  → Phase4 (Crabbox integration)
  → Phase5 (role cutover)
  → Phase6 (workflow/creds)
  → Phase7 (soak)
  → Phase8 (delete Codex/OpenAI)
```
