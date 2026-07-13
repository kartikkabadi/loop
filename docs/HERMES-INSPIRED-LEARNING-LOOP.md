# Hermes-inspired learning loop for Loop

Status: design note only. This document does not change Loop production behavior.

Research checked 2026-07-13 against the official [Hermes Agent repository](https://github.com/NousResearch/hermes-agent) and the official [Hermes Skills System documentation](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills/). The recommendations below are adaptations, not a proposal to copy Hermes code, branding, or storage format.

## Executive summary

The useful idea to borrow is a closed loop around durable, reviewable evidence:

```text
run evidence -> candidate lesson -> evaluation -> proposed memory/skill -> human approval -> next run
```

Loop should keep the proposal stage separate from the apply/close lane. A lesson may improve future review quality, but it must never grant authority to close an item, bypass repository policy, or mutate a foreign branch. The minimum viable version is repository-agnostic JSON or Markdown records with explicit provenance, bounded content, deterministic evaluation, and an approval state.

## What Hermes currently does

The Hermes repository presents a built-in learning loop that creates and improves skills from experience, nudges itself to persist knowledge, and searches prior conversations. Its README distinguishes short durable memory from procedural skills and describes FTS5 session search for on-demand historical recall.

The official Skills System documentation adds these concrete behaviors:

- Skills are progressively disclosed: an index first, full skill content only when needed, and individual reference files on demand.
- A skill is procedural memory. The agent can create, patch, edit, delete, or add supporting files after complex work, a recovered dead end, a user correction, or discovery of a non-trivial workflow.
- `/learn` turns source material into a reusable `SKILL.md`; the result is still saved through the normal skill-management path.
- Skills can come from bundled, official, trusted, or community sources. Community installs are scanned for prompt injection, exfiltration, destructive commands, and supply-chain risks; dangerous verdicts cannot be overridden.
- The Skills Hub records source identifiers and content hashes, and can detect upstream drift on later checks.
- `skills.write_approval` stages every skill write when enabled. Pending changes survive restarts and can be diffed, approved, or rejected.

The official Persistent Memory documentation describes a complementary design: bounded curated memory for facts that should always be available, separate from unlimited on-demand session search. Memory is injected as a session-start snapshot, does not silently compact when full, rejects duplicates, scans writes for injection/exfiltration patterns, and has its own approval gate. A background review after a turn may propose or write memories and skills; notifications are separate from whether the write is allowed.

These are observed upstream behaviors, not claims about Loop's current implementation.

## Worth adapting to Loop

### 1. Separate facts from procedures

Use two records with different retrieval policies:

- **Memory**: small, durable facts such as a repository rule, a verified workflow quirk, or a stable failure signature. Retrieve only high-value, relevant entries; do not inject the whole corpus into every run.
- **Skill proposal**: a bounded procedure with preconditions, steps, expected evidence, failure modes, and rollback/stop conditions. Load it only for matching repository/task contexts.

This maps well to ClawSweeper's conservative model: memories can inform review, while skills can suggest checks, but neither can independently authorize apply or close.

### 2. Learn from corrections and recovered failures

The strongest candidates are repeated maintainer corrections, a reproducible failure with a verified workaround, and a workflow that succeeded across more than one comparable run. A single surprising model output is an observation, not a lesson.

### 3. Progressive disclosure

Keep the always-loaded index small: name, purpose, scope, status, and trust level. Fetch the full proposal only after repository/profile matching. This controls prompt cost and reduces accidental activation of irrelevant procedures.

### 4. Provenance and drift detection

Every candidate should point to the run IDs, item URLs, source snapshots, evaluator version, and evidence hashes that support it. Re-evaluate when the source, repository profile, or evaluator changes. A changed upstream skill or changed local policy should invalidate approval rather than silently updating behavior.

### 5. Human approval as a durable state transition

Stage proposed memories and skills, show a diff plus evidence, and require an explicit approve/reject decision. Persist pending proposals across restarts. Approval should be scoped to the exact content hash and scope; edits create a new proposal.

## Not worth adapting, or unsafe for Loop

- **Autonomous writes by default.** Hermes permits free writes by default, but Loop's review and apply lanes have higher operational consequences. Loop should default to proposal-only and approval-required.
- **Conversation history as authoritative truth.** Session search is useful discovery, but chat transcripts can be stale, mistaken, or superseded by repository state. Current GitHub snapshots, repository profiles, and workflow evidence must win.
- **Unbounded or generic user modeling.** Loop needs repository/task-scoped operational knowledge, not a broad profile of people or private preferences.
- **Marketplace installation as a core learning path.** External skills expand supply-chain risk and are unnecessary for a first design. If considered later, use an allowlist, scanner, immutable source reference, and sandboxed evaluation.
- **Self-modification of production policy.** No learned artifact may alter close eligibility, protected-label handling, locks, snapshot drift rules, credentials, workflow triggers, or apply commands.
- **Learning from successful outcome alone.** A closed item or green command does not prove that a proposed procedure caused the result. Require causal or comparative evidence where possible.

## Minimal repository-agnostic design

### Records

Store append-only proposal records in a durable, access-controlled store. A portable record can be represented as Markdown with front matter or JSON:

```yaml
id: lesson-2026-07-13-001
kind: memory | skill
scope:
  repository: openclaw/clawsweeper | "*"
  task_types: [review, apply]
status: proposed | approved | rejected | superseded
content_hash: sha256:...
provenance:
  run_ids: [run-...]
  item_urls: [https://github.com/owner/repo/issues/123]
  source_snapshots: [sha256:...]
  evaluator: evaluator-v1
evidence:
  observations: []
  counterexamples: []
  verification_commands: []
approval:
  actor: null
  approved_at: null
  approved_hash: null
```

The `skill` content should remain declarative: trigger/context, goal, preconditions, read-only checks, expected evidence, stop conditions, and known failure modes. It should not contain credentials, arbitrary executable payloads, or permission to close items.

### Loop

1. **Capture:** record structured run facts, decisions, corrections, failures, and outputs. Redact secrets and avoid storing raw transcripts by default.
2. **Propose:** after a run or periodic batch, derive a candidate only when the evidence meets a threshold such as repeated confirmation, explicit maintainer correction, or a verified workaround.
3. **Evaluate:** replay the candidate against held-out historical cases and adversarial cases. Measure precision, false-positive rate, policy violations, unnecessary tool calls, and whether it improves reviewer time or proof quality.
4. **Stage:** write the candidate as `proposed` with a content hash and complete provenance. Do not make it active.
5. **Approve:** a human reviews the exact diff, scope, evidence, and counterexamples. Approval binds to the hash; any edit returns to `proposed`.
6. **Use:** approved artifacts are retrieved by explicit scope and surfaced as suggestions/checklists. The normal review/apply policy remains authoritative.
7. **Audit:** record which artifact versions were loaded and whether the suggestion was accepted, ignored, or contradicted. Supersede stale artifacts instead of rewriting history.

### Initial evaluation gates

Do not activate a candidate unless it has: at least two independent supporting observations or one explicit maintainer correction; no unresolved counterexample; a reproducible verification command or clear evidence recipe; a bounded scope; and a security/policy scan with no high-severity finding. For skills that could influence apply decisions, require a human reviewer with repository-maintainer authority and a separate dry-run evaluation.

## Recommended first slice for Loop

Implement no runtime behavior in this slice. When implementation is later authorized, start with an offline proposal ledger and evaluator that consumes existing run artifacts. Add one read-only dashboard/report view for pending proposals, provenance, diff, evaluation results, and approve/reject status. Only after that proves useful should approved memories be made retrievable by review workers. Keep skill execution out of scope until the memory path, audit trail, and approval semantics are stable.

## Sources

- NousResearch, [Hermes Agent repository README](https://github.com/NousResearch/hermes-agent), especially the learning-loop, memory, skills, and session-search overview.
- NousResearch, [Hermes Skills System](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills/), especially progressive disclosure, agent-managed skills, write approval, skill provenance, drift checks, and security scanning.
- NousResearch, [Hermes Persistent Memory](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory), especially bounded memory, session search, background review, write approval, and notification semantics.
