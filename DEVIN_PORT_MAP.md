# Loop / ClawSweeper → Devin Port Map

**Audit date:** 2026-07-11 (PR #1 architecture correction)
**Canonical repository:** [`kartikkabadi/loop`](https://github.com/kartikkabadi/loop) (private)
**Canonical local path:** `/Users/user/Developer/loop`
**PR:** https://github.com/kartikkabadi/loop/pull/1
**Scope:** DOCUMENTATION ONLY — no production behavior changed; **do not merge until architecture review passes**.

---

## 0. Repository identity (authoritative)

| Check | Required | Observed |
|---|---|---|
| Product repo | `kartikkabadi/loop` | `https://github.com/kartikkabadi/loop` |
| Local path | `/Users/user/Developer/loop` | Full non-shallow clone |
| `origin` | `kartikkabadi/loop` | `https://github.com/kartikkabadi/loop.git` |
| `upstream` | `openclaw/clawsweeper` | `https://github.com/openclaw/clawsweeper.git` |
| Shallow? | No | `false` |
| Default branch | `main` | Tracks `origin/main` |
| Push to upstream | Never | Only `origin` |

**Baseline SHA (docs branch parent):** `a0a3b241af5c11b040d601b6fd117d2d451f9fbe`
**Original temporary-audit SHA:** `ef7a067f7170b422d40d03094cc69b2803c1ab2f`
**Upstream delta:** `#494` pinned-base Codex review + post-flight token renew; pnpm release-age chore. See prior PR #1 body for file list.

---

## 1. Executive conclusion

Loop retains ClawSweeper’s autonomous GitHub lifecycle and replaces the Codex/OpenAI **agent** with **Devin**, driven through **Devin ACP** (`devin acp` as a local stdio JSON-RPC subprocess).

**Corrected architecture (this revision):**

```text
GitHub Actions / ClawSweeper coordinator
        │
        │ Crabbox provision, sync, launch, collect, stop
        ▼
ASCII Box
        │
        ├── Box-hosted Loop agent worker
        │       ├── ACP client
        │       ├── spawns `devin acp` locally
        │       ├── validates/writes result artifacts
        │       └── emits heartbeat and evidence
        │
        └── repository checkout / worktree

GitHub Actions
        │
        ├── receives artifacts
        ├── runs or observes deterministic CI
        └── performs authorized GitHub mutations
```

**Hard corrections vs earlier drafts of this document:**

1. The permanent agent contract is **session/capability-oriented**, not a single `run() → stdout/stderr` process wrapper. A process-shaped adapter may exist only as a **temporary Codex compatibility shim**.
2. **Phase 0 empirical ACP-on-Box proof comes first.** Do not freeze the permanent TypeScript API before measuring Devin’s advertised ACP capabilities.
3. The ACP client and `devin acp` are **colocated inside the Box** by default. Do not assume `crabbox run` is a live duplex ACP pipe (`ssh -n` / no-input streaming; input helpers `ReadAll` before launch — see Crabbox `internal/cli/ssh.go` `runSSHStreamResult` / `runSSHInput`).
4. **Production Devin does not run on GitHub-hosted runners.** Devin credentials live on Box. Actions coordinate Crabbox and deterministic CI/mutations.
5. Independent review requires a **fresh session and an isolated exact-head checkout** (preferred: separate verifier Box). A different session ID alone is insufficient.
6. `devin -p` is diagnostic/smoke only — never the autonomous production path.
7. `devin acp --agent-type review` is **observed on the installed CLI** (`devin 3000.1.27`) but **not proven** as Loop’s independent-review mechanism until Phase 0.

Do **not** invent a greenfield Cloudflare control plane. Preserve ClawSweeper deterministic orchestration and validators, including #494 pinned-base post-sync review (`src/repair/execution-finalization.ts`, `execute-fix-artifact.ts`).

---

## 2. Evidence classes for capability claims

Every Devin/ACP claim in this document is tagged:

| Tag | Meaning |
|---|---|
| **official** | Stated in current Devin docs or ACP schema docs |
| **cli-observed** | Seen from installed `devin 3000.1.27` help/status |
| **phase0** | Must be proven on Box; not yet proven |
| **generic-acp** | Present in ACP protocol; **not** a Devin guarantee until advertised in `initialize` |
| **unknown** | Not established |

### Installed CLI snapshot (2026-07-11)

```text
devin 3000.1.27 (0d4bf12e)
devin acp --help → stdio ACP server; --agent-type summarizer|review
devin auth status → Logged in (via Devin); credentials.toml present; Sandbox: optional
```

Official Devin docs: `devin acp` is intended to be invoked by an ACP-aware client as a subprocess speaking JSON-RPC over stdin/stdout — not interactive. (**official**)

---

## 3. Current ClawSweeper architecture (Codex today)

```text
GitHub events / schedule / comments
  → GitHub Actions (Blacksmith / ubuntu-latest)
      → setup-codex + App token mint
      → Node CLIs
          → clawsweeper.ts / run-worker.ts / execute-fix-artifact.ts
          → runCodexProcess (src/codex-process.ts)
              → codex-process-worker.ts  OR  codex-app-server-worker.ts
          → deterministic apply-result / post-flight / validators
  → openclaw/clawsweeper-state
```

**Structural Codex hotspots:** `src/codex-*.ts`, `src/clawsweeper.ts` `runCodex`, `src/repair/run-worker.ts`, `src/repair/execute-fix-artifact.ts` (incl. pinned-base `runCodexReview`), `.github/actions/setup-codex/action.yml`, `src/repair/spam-scanner.ts` (direct OpenAI Responses API).

**Security invariant today:** `codexEnv()` (`src/codex-env.ts`) strips GitHub write tokens and App keys from the model subprocess. Loop must preserve an equivalent scrub at the Devin boundary.

---

## 4. Lexical Codex/OpenAI inventory (recomputed)

### 4.1 Command (tracked files; excludes audit docs)

```bash
git ls-files -z \
  | xargs -0 git grep -l -i -E 'codex|openai|OPENAI_API_KEY|CODEX_HOME|app-server|output-schema|output-last-message' -- \
  | grep -Ev '^(DEVIN_PORT_MAP\.md|TASKS\.md|CHANGELOG\.md)$' \
  | sort -u
```

**Result on `a0a3b241af`:** **142 tracked files matching the Codex/OpenAI lexical audit patterns** (not a semantic coupling count).
Delta vs prior extension-limited scan (141): includes `assets/pr-eggs/openclaw-clawsweeper/74479.png` via `git ls-files`.

### 4.2 Classification (manual buckets; overlapping possible)

| Bucket | Approx. | Examples |
|---|---:|---|
| Structural runtime coupling | ~15–25 | `src/codex-*.ts`, `clawsweeper.ts` `runCodex`, `run-worker.ts`, `execute-fix-artifact.ts`, `spam-scanner.ts`, `collect-codex-debug.ts`, `process-env.ts` |
| Workflow/auth coupling | 13 | `.github/actions/setup-codex`, workflows passing `OPENAI_API_KEY` / `setup-codex` |
| Schema/result coupling | 2+ validators | `schema/*.json`, `review-results.ts` `codex_review` field |
| Tests enforcing Codex behavior | 54 | `test/codex-*.ts`, `test/repair/*codex*`, many `CODEX_BIN` stubs |
| Terminology/documentation only | ~25+ | `docs/**`, `README.md`, `AGENTS.md`, prompts mentioning Codex |

Use lexical counts for search completeness; use structural buckets for port planning.

---

## 5. Target topology (ACP client inside Box)

### 5.1 Intended production flow

```text
ClawSweeper workflow
    ↓
Crabbox acquires ASCII Box and syncs repository (+ worker bundle)
    ↓
Box-hosted Loop agent worker starts
    ↓
worker spawns `devin acp` locally
    ↓
worker acts as ACP client over local stdio
    ↓
worker writes structured result + evidence
    ↓
Crabbox collects artifacts
    ↓
ClawSweeper deterministic validators and GitHub mutation code continue
```

### 5.2 Why not tunnel ACP through `crabbox run`

| Fact | Source | Implication |
|---|---|---|
| Streaming SSH runs use `sshArgsNoInput` / `-n` | Crabbox `internal/cli/ssh.go` `runSSHStreamResult` | Stdin disabled — not a live duplex JSON-RPC pipe |
| Input helper reads entire stdin before launch | `runSSHInput` → `io.ReadAll(input)` | One-shot payload, not interactive ACP |
| ACP requires persistent bidirectional JSON-RPC | ACP overview (**official**); Devin `devin acp` (**official**) | Client must keep a live stdio session with the agent |

**Default design:** ACP client **inside** Box beside `devin acp`.
**Non-default:** remote duplex ACP transport only if Phase 0 empirically proves a safe channel. Do not assume it.

### 5.3 Role split

| Layer | Owns |
|---|---|
| GitHub Actions / ClawSweeper | Orchestration, job identity, Crabbox invoke, artifact intake, deterministic validation, authorized GitHub mutations, CI observation |
| `CrabboxWorkspaceHost` | Box lease acquire/reuse, sync, launch worker, heartbeat observe, collect artifacts, stop/release |
| Box-hosted agent worker | ACP client, spawn `devin acp`, permission policy, result/evidence files, heartbeats |
| Deterministic TS modules | Unchanged validators/mutators (`review-results`, `apply-result`, `post-flight`, `execution-finalization`, …) |

Do not invent a new Cloudflare scheduler/event store/fleet platform.

---

## 6. Runtime boundary (session-oriented; capability-driven)

### 6.1 What is **not** the permanent contract

Earlier drafts proposed:

```ts
interface AgentRuntime {
  run(...): AgentRuntimeResult | Promise<AgentRuntimeResult>;
}
```

That shape mirrors today’s `runCodexProcess` (`src/codex-process.ts`) and may describe an **internal transitional Codex process adapter**. It must **not** be documented or implemented as Loop’s final agent-runtime contract. It cannot express capability negotiation, streamed events, permission requests, cancellation of an active turn, session load/resume/close, or structured stop reasons.

### 6.2 Required semantic operations (final contract)

Exact TypeScript names remain **subject to Phase 0**. Required operations:

```text
initialize and negotiate capabilities
authenticate when required
create a session
load or resume a session when advertised
submit a prompt turn
stream normalized runtime events
handle permission requests under host policy
cancel the active turn
close the session when supported
capture transcript/evidence
report structured stop reason and failure category
```

### 6.3 Provisional conceptual shape (documentation only — not code)

```ts
interface AgentSessionRuntime {
  initialize(request: RuntimeInitializeRequest): Promise<RuntimeCapabilities>;

  createSession(request: CreateAgentSessionRequest): Promise<AgentSession>;

  loadSession?(request: LoadAgentSessionRequest): Promise<AgentSession>;

  resumeSession?(request: ResumeAgentSessionRequest): Promise<AgentSession>;

  prompt(
    request: AgentPromptRequest,
    events: AgentEventSink,
  ): Promise<AgentTurnResult>;

  cancel(request: CancelAgentTurnRequest): Promise<void>;

  closeSession?(request: CloseAgentSessionRequest): Promise<void>;
}
```

**Rules:**

- Optional methods are **capability-gated** from `initialize` / session advertisements.
- Do **not** assume Devin supports `session/load`, `session/resume`, `session/list`, or `session/close` until Phase 0 records them in the `initialize` response. Those methods exist in **generic ACP** (**generic-acp**), not as Devin guarantees.
- Baseline ACP methods Agents must support: `session/new`, `session/prompt`, `session/cancel`, `session/update` (**official** ACP schema baseline). Whether Devin’s ACP server implements the full baseline is **phase0**.
- Do not expose raw Codex argv on the generic contract.
- Do not put raw `NodeJS.ProcessEnv` on the public request contract. Implementations construct their own sanitized child environment.
- GitHub write credentials must never enter the Devin process environment.
- Turn/session results must normalize at least: session ID, stop reason, failure class, artifact paths, transcript/evidence refs, capability info, resumability flag.

### 6.4 Temporary compatibility adapter (separate)

```text
CodexProcessAdapter
```

- Wraps current `runCodexProcess` / app-server worker behavior.
- Exists only to preserve Codex production behavior during migration.
- Is **not** `AgentSessionRuntime`.
- May present a narrow process-shaped internal API used solely by the Codex lane.

### 6.5 Execution-host boundary (separate from ACP)

```text
CrabboxWorkspaceHost
  acquire or reuse Box lease
  synchronize repository and worker bundle
  launch Box-hosted worker
  observe process and heartbeat
  collect result/evidence artifacts
  stop or release Box
```

Runtime owns ACP sessions. Crabbox owns machines/transport. Workflows own orchestration and GitHub mutations.

---

## 7. Credential placement (final)

### GitHub Actions / coordinator may hold

- GitHub App credentials (`CLAWSWEEPER_APP_PRIVATE_KEY`, …)
- Crabbox controller credentials (as required by Crabbox)
- ASCII Box API key (`ASCII_BOX_API_KEY` / `CRABBOX_ASCII_BOX_API_KEY`)
- State/publishing / status-ingest / hook credentials

### Box controller / worker process may receive

- Narrow task assignment
- Repository source / sync
- Explicitly allowed non-production task-specific test secrets

### Devin process may receive

- Devin authentication (credentials file / ACP `authenticate` when required) (**official** / **cli-observed**)
- Sanitized task environment
- **No** GitHub write token
- **No** GitHub App private key
- **No** ASCII Box API key
- **No** Cloudflare administrative token
- **No** unrestricted PAT

### Explicit non-goals for production

- Do **not** plan `setup-devin` as the final GitHub Actions design for hosting production Devin.
- Do **not** install/authenticate production Devin on Blacksmith / `ubuntu-latest`.
- Actions may install/invoke **Crabbox**; model execution occurs **inside Box**.
- Local or GHA-hosted Devin may exist only as a **diagnostic experiment**, not production architecture.

---

## 8. Independent-review isolation

Independent review requires **all** of:

```text
fresh top-level Devin session
no builder conversation or transcript
clean checkout/worktree of the exact candidate head
approved base SHA available
read-only initial policy
no GitHub write credentials
separate result artifact
review bound to exact base and head
new review after every material head change
pinned-base post-sync review preserved (#494)
```

**Preferred deployment:** separate verifier Box.
**Cost-saving fallback:** same Box + separate clean worktree + fresh session + strict credential/transcript separation.

A fresh session alone is **not** sufficient independence.

### About `devin acp --agent-type review`

| Claim | Class |
|---|---|
| Flag exists with value `review` (“code-review agent with read-only + shell tools”) | **cli-observed** (`devin acp --help`) |
| Adequate for Loop merge_preflight / pinned-base gate | **unknown** / **phase0** |
| Exists in Devin docs as Loop’s reviewer | not established as product guarantee |

Until Phase 0 proves behavior, treat it as an **unknown candidate mechanism**, not a design dependency.

---

## 9. Codex → Devin capability matrix (corrected)

| Requirement | Codex today | Proposed Devin | Evidence class | Notes |
|---|---|---|---|---|
| Process / server startup | `codex` / app-server workers | Box worker spawns `devin acp` | **official** + **phase0** | Colocated stdio |
| Auth | Responses proxy / login | Stored creds on Box; ACP `authenticate` if required | **official** / **cli-observed** / **phase0** | No GHA production auth |
| Session create | `thread/start` or new exec | ACP `session/new` | **generic-acp** + **phase0** | Must see Devin advertise |
| Load / resume / close / list | thread state + cache | Only if advertised | **generic-acp** → **phase0** | Do not assume |
| Prompt turn | `turn/start` / exec stdin | ACP `session/prompt` | **generic-acp** + **phase0** | |
| Stream events | JSONL / app-server deltas | ACP `session/update` | **generic-acp** + **phase0** | |
| Cancel | `turn/interrupt` / SIGTERM | ACP `session/cancel` + process kill | **generic-acp** + **phase0** | |
| Mid-turn steer | `turn/steer` | **unknown** | **unknown** | Fallback: cancel + resume/prompt with steer text **if** resume proven |
| Permissions | Codex approval/sandbox flags | ACP permission requests under host policy | **generic-acp** + **phase0** | |
| Structured output | `--output-schema` | Host schema validation of agent-written JSON | **phase0** | No Devin CLI schema flag proven |
| Independent review | Codex `/review` + pinned base | Fresh session + clean exact-head tree (+ optional review agent type) | **phase0** | |
| Remote host | GHA Blacksmith | Crabbox → ASCII Box | **phase0** | Crabbox ascii-box provider exists in sibling repo |
| `devin -p` | n/a | Diagnostic only | **cli-observed** | Not production |
| OS `--sandbox` | Codex sandboxes | Devin `--sandbox` research preview; team setting “optional” | **cli-observed** / **unknown** on Box | Re-test in Phase 0 |

---

## 10. Model-neutral systems to preserve

Unchanged classification intent from prior audit: intake, jobs, scheduling, lanes, concurrency, dedup, target/exact-head validation, clustering, deterministic validators, comment routing, GitHub mutations, post-flight, ledgers, automerge, dashboards/state publish, limits, Crabbox transport, `execution-finalization.ts`.

Structurally Codex-coupled layers remain the spawn/app-server/setup-codex/spam-OpenAI paths listed in §3–§4.

---

## 11. Implementation sequence (corrected)

### Phase 0 — Empirical ACP + Box + Crabbox topology proof (**first**)

Before freezing the permanent runtime API. Real ASCII Box + Devin Pro auth. Prove and record a pass/fail matrix for:

1. Box provisioning (Crabbox and/or official `box` CLI)
2. Repository/worker synchronization
3. Minimal ACP client **running inside Box**
4. `devin acp` as local subprocess
5. Exact `initialize` response (protocol version, auth methods, agent/session/prompt capabilities, modes/config)
6. Stored-credential auth behavior
7. Runtime `authenticate` only if required
8. `session/new`
9. `session/prompt`
10. Streamed `session/update`
11. Every client-side request Devin sends (permissions, fs, terminal, extensions)
12. Cancel during an active tool operation
13. Second prompt in the same session
14. Process restart → load/resume **when advertised**
15. Box stop/resume → session recovery **when advertised**
16. Structured JSON artifact + host validation script
17. Clean independent-review session on exact-head checkout
18. Env audit: GitHub/Box control credentials absent from Devin
19. Artifact collection through Crabbox
20. Box stop/release cleanup

No production source cutover.

### Phase 1 — Host-owned result-contract harness

Prove decision/repair JSON validated without model-native schema enforcement. Prefer tests only; do not weaken schema semantics for Devin convenience.

### Phase 2 — Runtime and host seams informed by Phase 0

Implement session-oriented `AgentSessionRuntime` (shaped by measured capabilities), temporary `CodexProcessAdapter`, and `CrabboxWorkspaceHost` where needed. Preserve Codex behavior. No production Devin cutover unless a separate focused PR.

### Phase 3 — Box-hosted Devin ACP worker

Worker inside ASCII Box driving `devin acp`. Fake ACP fixtures + real Box canary.

### Phase 4 — Crabbox execution integration

Wire orchestration: acquire → sync → launch → observe → collect → stop/release. Keep Codex lane as migration rollback.

### Phase 5 — Role cutover (controlled order)

1. planning
2. builder/write
3. independent reviewer
4. structured-result repair
5. CI/review-feedback repair

Preserve deterministic gates and #494 pinned-base final review.

### Phase 6 — Workflow and credential cutover

Workflows invoke Crabbox/Box-backed Devin. They do **not** host Devin. Remove OpenAI requirements per lane as that lane cuts over. **No production `setup-devin` on GHA.**

### Phase 7 — Autonomous convergence and soak

Issue→PR, CI repair, reviewer repair, upstream feedback, exact-head invalidation, bounded retries, Box cleanup, eligible merges. Bounded rollback retained.

### Phase 8 — Remove Codex and OpenAI

Only after deletion criteria (below) pass.

---

## 12. Safe deletion criteria for Codex / OpenAI

Delete only when:

1. Phase 0 matrix accepted; production uses Box-hosted ACP worker.
2. `AgentSessionRuntime` + Codex adapter exist; Devin path is default for cut-over lanes.
3. No production workflow hosts Devin on GHA; no `OPENAI_API_KEY` needed for cut-over lanes (spam resolved).
4. Independent-review isolation proven (session + clean checkout).
5. Pinned-base post-sync review proven on Devin path.
6. Steerable/Codex app-server either replaced by proven ACP ops or explicitly retired.
7. Tests green; Codex-only tests removed/quarantined.
8. Rollback path retained through soak.
9. Secrets removed after soak.

Until then: do not delete `src/codex-*.ts` or `setup-codex`.

---

## 13. Unsupported / downgraded claims (this correction)

| Prior implication | Correction |
|---|---|
| Permanent `AgentRuntime.run()` | Removed as final contract; Codex process adapter only transitional |
| Extract interface before ACP proof | Replaced: Phase 0 first |
| Production Devin on GHA / `setup-devin` | Removed from final design |
| `crabbox run` as ACP transport | Rejected as default; stdin disabled on stream path |
| `devin -p` as durable runtime | Diagnostic only |
| `--agent-type review` as proven reviewer | **cli-observed** flag only; adequacy **unknown** |
| Session load/resume/close guaranteed | **generic-acp** until Phase 0 |
| Session persistence across Box stop | **phase0** / **unknown** |
| OS sandbox on Box | **unknown** until Phase 0 |
| “141 coupled files” as semantic count | Now **142 lexical matches**; classify structurally |

---

## 14. Baseline reminder (canonical clone)

Recorded on bootstrap of PR #1 (unchanged by this docs correction):

| Command | Exit | Notes |
|---|---:|---|
| `pnpm install` / `build:all` / `lint` / `format:check` / surface / limits | 0 | Node 24.14.1 |
| `test:unit` | 1 | 805/807; Bash 3.2 `${TARGET_REPO,,}` env failure |
| `test:repair` | 0 | 705/705 |

This documentation PR does not re-run or “fix” those failures.
