# Loop / ClawSweeper → Devin Port — Implementation Tasks

Derived from `DEVIN_PORT_MAP.md` on canonical repo `<checkout>` (`kartikkabadi/loop`).

**Status:** Planning document only. **Do not begin implementation** until explicitly authorized. This file revises the temporary `/private/tmp` `TASKS.md`, which is **not** approved as-written.

---

## Fixed architectural requirements

- **Loop** is the product repository (`kartikkabadi/loop`).
- **ClawSweeper** is the retained autonomous foundation (intake, jobs, validators, GitHub mutations, ledgers, automerge).
- **Crabbox** is the remote execution layer; **ASCII Box** is the execution provider.
- **Devin** is the only intelligent runtime in the final deployed system.
- **No OpenAI API and no Codex runtime** in the final deployed system.
- Full autonomy after human planning is the goal.
- **Devin ACP** is the intended durable programmatic runtime (`devin acp` over stdio).
- Non-interactive Devin CLI (`devin -p` / `--prompt-file`) may be retained **only** as:
  - diagnostic fallback;
  - bootstrap smoke test;
  - or an explicitly temporary spike.
- Do **not** make `devin -p` the permanent runtime architecture.
- Do **not** invent a greenfield Loop control plane / MCP product / Cloudflare replacement for ClawSweeper orchestration.
- Preserve ClawSweeper deterministic orchestration and validators.
- Preserve #494 pinned-base + post-sync independent review gates (`execution-finalization.ts`, `execute-fix-artifact.ts`).

---

## Global invariants (all future implementation PRs)

- Models never receive GitHub write credentials.
- Host validators remain authoritative (`review-results`, `execute-fix-validation`, `apply-result`, `post-flight`, decision parser).
- Do not delete Codex code until `DEVIN_PORT_MAP.md` §14 criteria are met.
- Never push to `openclaw/clawsweeper`.

---

## Phase overview (required order)

| Phase | Goal | Permanent runtime? |
|---|---|---|
| **1** | Runtime-boundary extraction | Codex still production |
| **2** | Host-owned structured-result validation | Codex still production |
| **3** | Empirical Devin ACP proof on ASCII Box | Spike only |
| **4** | Production `DevinAcpRuntime` | ACP behind flag → then default |
| **5** | Crabbox / ASCII execution wiring | Remote host for ACP workers |
| **6** | Builder / reviewer / repair role cutover | ACP |
| **7** | Workflow + credential cutover | ACP |
| **8** | Remove Codex / OpenAI after soak | Devin-only |

`devin -p` may appear inside Phase 3 smoke or as an emergency fallback helper — never as Phases 4–8 architecture.

---

## Phase 1 — Runtime-boundary extraction

### Goal
Introduce `AgentRuntime` with `CodexAgentRuntime` wrapping today’s `runCodexProcess` — **zero** observable behavior change.

### In-scope
- `src/agent-runtime.ts` (interface)
- `src/codex-agent-runtime.ts` (adapter)
- Call sites: `clawsweeper.ts`, `commit-sweeper.ts`, `pr-close-coverage-proof.ts`, `repair/run-worker.ts`, `repair/execute-fix-artifact.ts`
- Tests: existing Codex process tests + `test/agent-runtime.test.ts`

### Non-goals
- No Devin code, workflows, prompts, schemas, Crabbox, or deletions

### Must remain unchanged
- Codex argv, `codexEnv` scrub, steerable app-server path, timeouts, pinned-base review loops

### Tests / acceptance
- Fake `CODEX_BIN` parity with `runCodexProcess`
- `pnpm run build:all && pnpm run test:repair` green
- No `.github/workflows` diff

### Dependencies / rollback / risks
- None / revert PR / missed call sites; async mismatch

---

## Phase 2 — Host-owned structured-result validation

### Goal
Prove decision + repair JSON contracts are enforced by **host** validators independent of Codex `--output-schema`.

### In-scope
- `schema/clawsweeper-decision.schema.json`
- `schema/repair/codex-result.schema.json`
- `src/repair/review-results.ts` (+ decision parser path)
- New contract tests with fixtures (valid/invalid/`codex_review` failures)

### Non-goals
- No Devin runtime; no rename of `codex_review` yet

### Acceptance
- Contract tests pass without invoking Codex
- Documents that Devin ACP must emit files meeting these contracts

### Risks
- Evidence regex currently expects `/review|codex review` (`review-results.ts`)

---

## Phase 3 — Empirical Devin ACP protocol proof on ASCII Box

### Goal
Prove, on a real ASCII Box (via Crabbox `ascii-box` or `box` CLI), that Devin ACP can support Loop’s durable session needs **before** production wiring.

### In-scope (spike artifacts only — no production cutover)
- Spike notes under `docs/repair/devin-acp-box-spike.md` (redacted transcripts)
- Minimal throwaway ACP client harness (may live under `scripts/` spike path or docs-only until promoted)
- Exercises on Box:
  - `initialize` / `session/new` / `session/prompt` / `session/cancel`
  - multi-turn continue
  - resume after process restart
  - resume after `box stop` / `box resume` if feasible
  - independent `devin acp --agent-type review` session
  - JSON artifact write for host schema validation
  - credential injection mode `600`
- Optional: one `devin -p` smoke for install/auth only (explicitly labeled non-architecture)

### Non-goals
- No workflow default changes
- No deleting Codex
- No claiming steer parity without proof
- No long GitHub-Actions-only shadow series as a substitute for this spike

### Acceptance
- Written pass/fail matrix for each capability in `DEVIN_PORT_MAP.md` §7
- Explicit decision: proceed to Phase 4, or block with listed gaps
- Steer: native ACP mechanism **or** documented interrupt+resume emulation

### Dependencies
- Phase 1 preferred (interface clarity); Box + Devin Pro available
- Sibling Crabbox ASCII provider docs (`ascii-box`)

### Risks
- Editor-oriented ACP docs ≠ headless worker
- Sandbox flag failures on Box
- Session persistence across snapshots

---

## Phase 4 — Production `DevinAcpRuntime`

### Goal
Implement `DevinAcpRuntime` behind `CLAWSWEEPER_AGENT_RUNTIME=devin-acp` (name TBD), default remains Codex until later cutover.

### In-scope
- `src/devin-acp-runtime.ts` (+ env scrub helper)
- Factory in `agent-runtime.ts`
- Optional `DevinPrintRuntime` **clearly marked diagnostic-only**
- Unit tests with fake ACP server fixtures
- Local check script for ACP smoke (not Codex)

### Non-goals
- No wholesale workflow cutover yet
- No spam-scanner change yet
- Print mode must not be selectable as the autonomous production default

### Acceptance
- Flagged local/job can complete one plan `result.json` that passes `review-results`
- GitHub write tokens absent from child env
- Codex path unchanged when flag off

### Dependencies
- Phases 1–3 (Phase 3 must not be “failed/unknown” on session+prompt+cancel+JSON artifact)

### Risks
- Structured output reliability
- ACP stream parsing edge cases

---

## Phase 5 — Crabbox / ASCII execution

### Goal
Run ACP workers on ASCII Box through Crabbox as an **opt-in** execution path, without abandoning Blacksmith rollback.

### In-scope
- Operator/profile docs for `provider: ascii-box`
- Opt-in workflow or dispatch path for Box-hosted plan/execute
- Secrets: `ASCII_BOX_API_KEY` / `CRABBOX_ASCII_BOX_API_KEY`
- Bootstrap: Devin install + credential injection
- Artifact return into existing publish path

### Non-goals
- Replacing all Blacksmith defaults in the same PR
- Rewriting Crabbox providers unless a blocker bug is proven
- Multi-tenant Box fleet product

### Acceptance
- Recorded smoke: Box up → ACP session → artifact back → Box stop
- Default `runs-on` unchanged unless explicitly flagged

### Dependencies
- Phase 4; Crabbox ascii-box provider

### Risks
- Quota/TTL; secret leakage; hydrate ≠ production worker

---

## Phase 6 — Builder / reviewer / repair role cutover

### Goal
Point builder, independent reviewer, and repair loops at `DevinAcpRuntime` while preserving host gates — especially #494 pinned-base post-sync review.

### In-scope
- Review lane (`clawsweeper.ts`)
- Plan worker (`run-worker.ts`)
- Execute loops (`execute-fix-artifact.ts` `runCodexReview*` → runtime review)
- Independent reviewer session separation (`acp --agent-type review` or equivalent proven in Phase 3)
- Dual-accept evidence strings only with tests (`/review|codex review|devin review` interim)

### Non-goals
- Automerge policy changes
- Broad prompt marketing rewrite

### Acceptance
- Flagged execute preserves pinned-base + `reviewAfterFinalBaseSync` semantics
- Security-boundary + target-validation tests pass
- Codex remains rollback default until Phase 7

### Dependencies
- Phases 4–5 (Box path optional but preferred for parity proof)

---

## Phase 7 — Workflow and credential cutover

### Goal
Add `setup-devin` (ACP-capable install/auth), wire workflows to prefer Devin ACP, keep `setup-codex` as rollback for one release.

### In-scope
- `.github/actions/setup-devin/action.yml`
- Conditional steps in `sweep.yml`, `repair-cluster-worker.yml`, `assist.yml`, `commit-review.yml`
- Dashboard detection updates (`dashboard/worker.ts` currently keys off Codex setup)
- Secret plan: Devin credentials; stop requiring OpenAI for agent lanes (spam may still block full secret removal until Phase 8)

### Non-goals
- Immediate Codex source deletion
- Upstream pushes

### Acceptance
- Default or flagged production jobs run ACP path successfully
- Rollback: runtime=codex + setup-codex

### Risks
- Headless auth; pin drift; logging secrets

---

## Phase 8 — Remove Codex / OpenAI after proof and soak

### Goal
Eliminate Codex CLI, Responses proxy, OpenAI spam path, and related secrets after soak.

### In-scope
- Spam scanner replacement (deterministic and/or Devin classify)
- Delete `src/codex-*.ts`, `setup-codex`, `check-local-codex.mjs` when §14 met
- Rename `codex_review` → `agent_review` with dual-read then single-read
- Remove `OPENAI_API_KEY` from workflows after no consumers remain
- Docs/prompts factual cleanup

### Non-goals
- Rewriting validators’ semantic rules
- Product rename churn unrelated to runtime

### Acceptance
- CI grep guard against `@openai/codex` / `codex exec` / agent `OPENAI_API_KEY`
- Soak period completed; rollback tag retained

---

## Explicitly rejected task shapes

- “Add Devin support” as one PR
- “Make it generic” / “clean up code”
- Making `devin -p` the autonomous worker
- Long GitHub-only shadow phases that postpone Box ACP proof without cause
- Greenfield Loop control plane replacing ClawSweeper orchestration
- Deleting Codex before Phases 3–7 proof

---

## Suggested merge order

```text
Phase1 → Phase2 → Phase3(Box ACP spike)
                 ↘ Phase4(DevinAcpRuntime)
                      → Phase5(Crabbox/ASCII)
                      → Phase6(role cutover)
                      → Phase7(workflow/creds)
                      → Phase8(remove Codex/OpenAI)
```

Diagnostic `devin -p` smoke may appear inside Phase 3 or as a tiny helper beside Phase 4 — never ahead of ACP as the design center.
