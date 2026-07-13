# Loop testing model

Loop uses the same testing shape that works well in the surrounding systems:
many narrow tests, deterministic fakes at external boundaries, and a small
number of opt-in live checks. The goal is not a large coverage number. The goal
is to prove that a task cannot skip a gate, lose its durable handoff, or mutate
the wrong repository after a failure.

## Test layers

### 1. Pure policy tests

Test validators, state transitions, capacity decisions, review status, URL
safety, and rendering with ordinary `node:test` cases. These tests should be
fast and should assert the exact diagnostic or transition that matters.

### 2. Boundary contract tests

Use small in-memory doubles for D1/R2/event stores, Box commands, GitHub
publication, agent runtimes, and workflow dispatch. Record every call and
return deterministic results. Assert both the result and the calls that were
allowed or forbidden.

Important boundary contracts include:

- expected-version and idempotency behavior;
- exact repository head binding;
- execution provider and model selection, using the configured deployment
  provider and model;
- workspace bootstrap and required tools;
- GitHub draft and review-ready transitions;
- MCP scopes and schemas;
- checkpoint and cancellation-generation fencing.

### 3. Scenario tests

Build one complete task fixture and drive it through named scenarios:

- happy path from draft to human acceptance;
- invalid contract and missing authority;
- provider rate limit and cooldown;
- workspace interruption and resume;
- stale runner result;
- changed head after verification;
- review findings and bounded repair;
- duplicate webhook or retried MCP write;
- unauthorized or malformed tool call.

Each scenario should assert the durable state, visible status, external calls,
and the next human action. A model's prose is never the source of truth.

### 4. Worker and deployment checks

Run TypeScript builds, lint, format, Wrangler dry-runs, migration checks, and
workflow-surface checks. These catch wiring errors that unit tests cannot see.

### 5. Opt-in live checks

Live Box, GitHub, Cloudflare, browser, and artifact tests are separate from the
default suite. They require explicit environment configuration, use unique
names, have bounded timeouts, and clean up their resources. A missing live
configuration is a skip, not a fake pass.

The Loop gateway smoke test is enabled with:

```bash
LOOP_LIVE_URL=https://your-loop-gateway.example pnpm run test:loop
```

It checks health, MCP catalog reachability, and the unauthenticated write
boundary. It does not create tasks or mutate GitHub.

## Fixture rules

- Use a builder with valid defaults and small overrides.
- Use fixed timestamps, SHAs, task IDs, and provider responses.
- Use a fake clock when retry or cooldown time matters.
- Keep command fakes strict. Unknown commands should fail the test instead of
  returning a permissive empty result.
- Keep storage fakes close to the production interface, including delete,
  prefix listing, and atomic take behavior.
- Prefer exact call assertions over snapshots of large objects.
- Put generated or verbose evidence behind bounded assertions.

## Required assertions for a new lifecycle feature

Every new lifecycle feature should add coverage for:

1. the valid transition;
2. the nearest invalid transition;
3. a retry or duplicate invocation;
4. a stale or conflicting version;
5. an external failure and its durable recovery state;
6. the human-readable status and next action;
7. the security scope or authorization boundary;
8. the exact evidence required before completion.

## Commands

```bash
pnpm run test:loop
pnpm run check
```

`test:loop` is the fast feedback lane for the Loop control plane and ChatGPT
Project surface. `check` remains the handoff gate because it includes the
ClawSweeper and repair surfaces that share this repository.
