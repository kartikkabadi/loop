# Phase 0A — ASCII Box transport through Crabbox

**Date:** 2026-07-11
**Loop base SHA:** `fa9c5cc79968719395a443707521db04077fb6cd`
**Crabbox SHA tested:** `3134f34eea72c4a8a5790b0531d740d46c548e8c` (clone `/Users/user/Developer/crabbox`, release CLI `0.37.1`)
**Scope:** Empirical transport spike only. Documentation evidence for PR 0A.

## 1. Objective and non-goals

### Objective

Prove the remote execution lifecycle:

```text
local coordinator → Crabbox → ASCII Box → repo sync → remote command → artifact collect → stop/delete
```

### Non-goals

- No Devin invocation
- No ACP client / `devin acp`
- No `AgentSessionRuntime`
- No production Loop source, workflow, schema, test, prompt, dependency, or lockfile changes
- No PR 0B

## 2. Commits tested

| Component                 | Value                                                    |
| ------------------------- | -------------------------------------------------------- |
| Loop `main` / spike base  | `fa9c5cc79968719395a443707521db04077fb6cd` (PR #1 merge) |
| Crabbox source inspection | `3134f34eea72c4a8a5790b0531d740d46c548e8c`               |
| Crabbox CLI               | `0.37.1` (`/opt/homebrew/bin/crabbox`)                   |
| ASCII Box CLI             | `box 0.1.123-ascii-prod1` (`/Users/user/.ascii/bin/box`) |

## 3. Local environment and tool versions

| Item       | Value                                           |
| ---------- | ----------------------------------------------- |
| OS         | macOS 26.5.1 (Build 25F80), Darwin 25.5.0 arm64 |
| `uname -a` | Darwin … RELEASE_ARM64_T6000 arm64              |
| `git`      | 2.50.1 (Apple Git-155)                          |
| `ssh`      | OpenSSH_10.2p1, LibreSSL 3.3.6                  |
| `rsync`    | openrsync protocol version 29                   |
| `crabbox`  | 0.37.1                                          |
| `box`      | 0.1.123-ascii-prod1                             |

Note: interactive shells wrap `box` as a zsh function; Crabbox was pointed at the real binary with `--ascii-box-cli /Users/user/.ascii/bin/box` (and `PATH` included `~/.ascii/bin` for direct `box` calls).

## 4. Credential-presence results (no values)

| Check                                     | Result                                                                                                                                   |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `ASCII_BOX_API_KEY` env initially         | unset                                                                                                                                    |
| `CRABBOX_ASCII_BOX_API_KEY` env initially | unset                                                                                                                                    |
| `box status --json`                       | healthy API; account `active`; plan `Trial`                                                                                              |
| Box CLI config present                    | yes (`~/Library/Application Support/ascii/box/config.json`)                                                                              |
| Config fields present (names only)        | `api_url`, `token`, `channel`                                                                                                            |
| Auth used for spike                       | exported `ASCII_BOX_API_KEY` from the existing Box CLI `token` field into the shell environment for Crabbox (value never printed/logged) |

No Devin credentials were loaded or inspected.

## 5. Exact commands run (sanitized)

Canary repo (disposable; not committed to Loop):

```bash
CANARY=$(mktemp -d /tmp/loop-phase-0a-XXXXXX)
# wrote transport-input.txt with marker loop-phase-0a-<UTC>-<rand>
# committed; LOCAL_SHA=43c87af10483926d9d212ceb18da440897f8523e
# MARKER_DIGEST=43826202b86dc916de8c057825f119cd46afbfbf11ad2a2e6bc58de4cc064d8e
```

Lifecycle:

```bash
export PATH="/Users/user/.ascii/bin:$PATH"
# ASCII_BOX_API_KEY set from Box CLI token (not shown)

crabbox warmup --provider ascii-box --ascii-box-cli /Users/user/.ascii/bin/box
crabbox status --provider ascii-box --ascii-box-cli /Users/user/.ascii/bin/box --id amber-lobster

cd "$CANARY"
crabbox run --provider ascii-box --ascii-box-cli /Users/user/.ascii/bin/box --id amber-lobster \
  --require-artifact transport-output.json \
  --download transport-output.json=/tmp/loop-phase-0a-artifacts/transport-output.json \
  --shell '<verify transport-input.txt; write transport-output.json>'

crabbox run --provider ascii-box --ascii-box-cli /Users/user/.ascii/bin/box --id amber-lobster \
  --shell 'echo reuse-ok; hostname; test -f transport-input.txt; sha256sum transport-input.txt'

crabbox stop --provider ascii-box --ascii-box-cli /Users/user/.ascii/bin/box --id amber-lobster
crabbox status --provider ascii-box --ascii-box-cli /Users/user/.ascii/bin/box --id amber-lobster
# → exit 4: ascii-box "amber-lobster" was not found
```

Failed first attempt (recorded): `crabbox warmup ... --lease-output` — flag not defined on `warmup` (exists on `run`). Retried without it.

## 6. Lifecycle timeline

| Phase                | Identity / evidence                                                                                   | Duration                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Provision / warm     | lease `cbx_c8544e598772`, slug `amber-lobster`, box `bx_4vtcg552`, host `91.98.92.236`, state `ready` | **11.829s** (CLI `total=`); wall **11.910s**              |
| SSH ready            | `ready ssh=user@91.98.92.236:22` in warmup output                                                     | included in warmup                                        |
| Status               | `state=idle ready=true has_host=true`                                                                 | **1.701s**                                                |
| Sync (run1)          | `1 files, 40 B` → `/home/user/crabbox/cbx_c8544e598772/loop-phase-0a-sFBtYa`                          | **18.631s**                                               |
| Command (run1)       | wrote `transport-output.json`; digest matched                                                         | **6.147s**                                                |
| Artifact collect     | `--require-artifact` + `--download`; local file 468 B                                                 | included in run1                                          |
| Run1 total (Crabbox) | exit 0                                                                                                | **37.901s** (wall **49.938s**)                            |
| Reuse (run2)         | same lease/slug/box/IP; `sync_skipped=true`                                                           | sync **8.286s** (skip), cmd **6.662s**, total **16.962s** |
| Stop/delete          | `released lease=cbx_c8544e598772 box=bx_4vtcg552`                                                     | **20.391s**                                               |
| Post-stop status     | not found (exit 4)                                                                                    | —                                                         |
| Post-stop `box info` | HTTP 404 `not_found`                                                                                  | —                                                         |

Observable usage/cost: Box plan `Trial`; no dollar cost printed by CLI. Pre-existing unrelated Boxes (`bx_p98ch…` stopped, `bx_7hzfw…` stopped, `bx_vryu5…` ready) were left untouched. Canary `bx_4vtcg552` was absent after stop.

## 7. Pass/fail table

| ID     | Check                                       | Result   | Evidence                                                                                                                             |
| ------ | ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| P0A-01 | Crabbox CLI available                       | **PASS** | `crabbox --version` → `0.37.1`                                                                                                       |
| P0A-02 | ASCII Box CLI available                     | **PASS** | `box --version` → `0.1.123-ascii-prod1`                                                                                              |
| P0A-03 | Credential recognized                       | **PASS** | `box status` healthy; Crabbox provisioned with `ASCII_BOX_API_KEY` set from Box CLI token                                            |
| P0A-04 | Box provisioned                             | **PASS** | warmup created `bx_4vtcg552` / lease `cbx_c8544e598772`                                                                              |
| P0A-05 | SSH became ready                            | **PASS** | warmup `ready ssh=user@91.98.92.236:22`                                                                                              |
| P0A-06 | Known file synchronized                     | **PASS** | run1 sync of `transport-input.txt` (40 B); remote `test -f` succeeded                                                                |
| P0A-07 | Remote command executed                     | **PASS** | run1 printed matching digest; exit 0                                                                                                 |
| P0A-08 | Artifact returned                           | **PASS** | downloaded `/tmp/.../transport-output.json` (468 B)                                                                                  |
| P0A-09 | Artifact integrity verified                 | **PASS** | remote `marker_digest` == local `MARKER_DIGEST`; artifact SHA-256 `7fce35967ac4b973b6b7052f8faaa7cafcf89798b2f2a7b44ad439cca9935068` |
| P0A-10 | Existing lease reused                       | **PASS** | run2 same lease/slug/box/IP via status + `box info`                                                                                  |
| P0A-11 | Stop/delete completed                       | **PASS** | `released lease=… box=…`; subsequent status not found                                                                                |
| P0A-12 | No orphan Box remained                      | **PASS** | canary absent from `box list`; not running                                                                                           |
| P0A-13 | Crabbox command transport is not duplex ACP | **PASS** | source inspection below                                                                                                              |

## 8. Artifact contents (sanitized)

Local path during spike (not committed): `/tmp/loop-phase-0a-artifacts/transport-output.json`

```json
{
  "marker_digest": "43826202b86dc916de8c057825f119cd46afbfbf11ad2a2e6bc58de4cc064d8e",
  "remote_cwd": "/home/user/crabbox/cbx_c8544e598772/loop-phase-0a-sFBtYa",
  "uname": "Linux agents-server-one-1783753139-627657 6.8.0-117-generic … x86_64 GNU/Linux",
  "user": "user",
  "timestamp_utc": "2026-07-11T07:17:00Z",
  "hostname": "agents-server-one-1783753139-627657",
  "phase": "0a-run1"
}
```

| Field                 | Value                                                              |
| --------------------- | ------------------------------------------------------------------ |
| Local marker digest   | `43826202b86dc916de8c057825f119cd46afbfbf11ad2a2e6bc58de4cc064d8e` |
| Artifact file SHA-256 | `7fce35967ac4b973b6b7052f8faaa7cafcf89798b2f2a7b44ad439cca9935068` |
| Canary commit         | `43c87af10483926d9d212ceb18da440897f8523e`                         |

## 9. Failures, retries, provider errors

1. **`--lease-output` on `warmup`** — undefined flag; exit 2; duration 0.190s. Retried without the flag → success.
2. **`box` not on non-interactive PATH** — zsh function only; fixed with `--ascii-box-cli /Users/user/.ascii/bin/box`.
3. **Env keys initially unset** — Box login token present in CLI config; exported as `ASCII_BOX_API_KEY` for Crabbox per provider docs.

No provider quota errors during the successful lifecycle.

## 10. Security observations

- Box API token never printed; temporary env helper `/tmp/loop-0a-env.sh` removed after the spike.
- Canary used a disposable temp git repo; not committed into Loop.
- Crabbox sync/run path did not require placing Devin credentials on the laptop or GHA.
- Desktop/stream URLs appeared in `box info`; not reproduced here beyond confirming Box identity fields.
- Pre-existing Boxes on the account were not stopped/deleted.

## 11. Transport limitation (source inspection)

Crabbox commit `3134f34eea72c4a8a5790b0531d740d46c548e8c`, file `internal/cli/ssh.go`:

| Symbol                      | Lines   | Behavior                                                                                                                               |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `runSSHInput`               | 459–484 | `io.ReadAll(input)` then `cmd.Stdin = bytes.NewReader(data)` — full input buffered before/at launch; not a live bidirectional RPC pipe |
| `runSSHStreamResult`        | 517–536 | uses `sshArgsNoInput(...)`                                                                                                             |
| `sshArgsNoInputWithOptions` | 589–595 | appends SSH **`-n`** (redirect stdin from `/dev/null`)                                                                                 |

Conclusion: the streaming SSH command path is **not** a persistent duplex ACP JSON-RPC transport. ACP clients must run **inside** the Box beside `devin acp`, matching `DEVIN_PORT_MAP.md` / `TASKS.md` Phase 0A acceptance.

## 12. Go / no-go for PR 0B

**GO for PR 0B** (minimal ACP client protocol proof **inside** Box), with constraints:

- Reuse Crabbox ascii-box provision/sync/collect/stop as proven here.
- Do not attempt to tunnel ACP over `crabbox run` SSH stdin.
- Keep Devin credentials on the Box only.
- Continue documentation-first; no production Loop cutover.

## 13. Cleanup confirmation

- Canary lease/slug removed (`amber-lobster` not found).
- Canary Box `bx_4vtcg552` deleted (404 on `box info`; absent from list).
- Local canary git directory removed.
- Temporary credential export file removed.
- Spike evidence under `/tmp/loop-phase-0a-artifacts` retained only long enough to author this document; not committed to Loop.

---

# Phase 0B — Devin ACP protocol inside ASCII Box

**Authoritative evidence:** hardened rerun (Prompt 0B.1) below.
**Historical first run:** retained in §H at the end of this Phase 0B section (pre-harden harness; weaker assertions / auto-allow permissions).

**Date:** 2026-07-11
**Docs access date:** 2026-07-11
**Loop branch / pre-commit HEAD:** `spike/phase-0b-devin-acp-protocol` @ `21bc84872cae9f6b35f38c87837ef11706ad2ee2`
**Loop base (Phase 0A merge):** `ad932cff9161508235249179ae6cb56345d857fa`
**Harness:** `scripts/spikes/devin-acp-box/client.mjs` `0.1.8-phase0b1`
**Crabbox:** CLI `0.37.1` · source `3134f34eea72c4a8a5790b0531d740d46c548e8c`
**Box CLI:** `0.1.123-ascii-prod1`
**Devin CLI (inside Box):** `3000.1.27 (0d4bf12e)`
**Node (inside Box):** `v24.15.0`
**ACP specification:** v1 (`protocolVersion` requested and selected: `1`)

## A. Scope and non-goals

Prove a hardened Node ACP client **inside** an ASCII Box can speak newline-delimited JSON-RPC with local `devin acp` under fail-closed permissions, host-owned output caps, strict envelope validation, exact terminal lifecycle, and authoritative cancel/cleanup proofs.

Non-goals unchanged: no `AgentSessionRuntime`, no production ClawSweeper changes, no Codex cutover, no Phase 0C implementation, no ACP-over-Crabbox stdin, no `devin -p` as architecture, no committed transcripts/credentials.

## B. Hardened Box lifecycle (authoritative)

| Field         | Value                                                                                 |
| ------------- | ------------------------------------------------------------------------------------- |
| Lease         | `cbx_f937aae38537`                                                                    |
| Slug          | `blue-prawn`                                                                          |
| Box           | `bx_wt5kzg3a`                                                                         |
| Host          | `188.245.81.138`                                                                      |
| Warmup        | **14.761s**                                                                           |
| Canary commit | `ace47296fe14d135b21d23c3a7cd804c2c2bc202`                                            |
| Marker digest | `95f226f4a0c0fdbc88ee7a30419b769cb75187748a5daba6a2301e9cf83257ed`                    |
| Stop/delete   | lease released; `bx_wt5kzg3a` / `blue-prawn` absent from Box list; orphan probe empty |

Topology unchanged: Crabbox transport only; ACP client colocated with `devin acp` inside Box; stored CLI credentials (no headless `authenticate(devin-browser)`).

## C. Permission policy (fail-closed)

- Never auto-select an allow option merely because one exists.
- Merge `session/request_permission.toolCall` with cached `session/update` tool_call fields (`rawInput` is often only on the update).
- Allow only exact allowlisted canary commands for the current mode (`basic` vs `cancel`), or jailed read of `transport-input.txt`.
- Reject network/install/write/unknown/incomplete requests; record every decision.

**Observed on authoritative run:** one allow — `cancel_sleep` for `sh -lc 'sleep 30; printf SHOULD_NOT_COMPLETE'` (`extractShape=shell_line`). `pwd` terminal session was cog-auto-allowed inside Devin (no ACP permission request). Unrelated commands (e.g. earlier `echo test` during failed retries) were denied by allowlist.

## D. Host-owned terminal output bound

- Host maximum: `MAX_TERMINAL_OUTPUT_BYTES = 262144` (256 KiB).
- Agent `outputByteLimit` may only reduce the limit.
- Authoritative effective limits recorded: `120000` (`source=agent_requested`) for both terminal sessions.

## E. Jail self-checks

All five startup/`--self-check` assertions **PASS**: relative in-jail accepted; absolute in-jail accepted; `../` escape rejected; symlink escape rejected; missing child under symlink escape rejected. Relative paths resolve from the canary jail root, not `process.cwd()` ambient.

## F. Strict JSON-RPC framing

Every non-empty stdout line validated as JSON-RPC 2.0 request / notification / response. Authoritative: `jsonRpcFraming.ok=true`, `violations=[]`, `lineCount=487`. Stderr remains the only diagnostic channel.

## G. Authoritative results

### Initialize / capabilities

Capability response unchanged vs first run (`capabilities.json` SHA-256 `1c936a93…615538`). Protocol `1`. Auth: stored CLI credentials; advertised `devin-browser` not invoked headless.

### Sessions / basic prompt

Three `session/new` digests:

1. `f46d2a84bc07b22240d0aee8b822fa536645e82942d8b6b049f88c7948252b59`
2. `d073d226a174b6ff933c0412ff33f0fd52154e99b05dcb60c5715e6371bc2702`
3. `37cfc4cf455dd498aef2a4d62453eca8bcadd0ab52ca359f02a994995f81d05d`

Basic: `stopReason=end_turn`, marker `LOOP_ACP_BASIC_OK`, **978ms**.

### Terminal lifecycle (P0B-14)

Exact sequence: `terminal/create` → `terminal/wait_for_exit` → `terminal/output` → `terminal/release`
Command: `pwd` (normalized); exit `0`; cwd matched canary; `LOOP_ACP_TERM_OK`; `stopReason=end_turn`; no unexpected client methods; no unrelated permission grants. Devin may send create as a single shell-line string; harness normalizes before allowlist/spawn.

### Cancellation (P0B-15…17)

| Metric                              | Value                                                                                                    |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Active evidence                     | live terminal for allowlisted cancel sleep                                                               |
| `session/cancel`                    | sent only after create RPC was acknowledged (cancel-during-create crashes Devin with `receiver dropped`) |
| Local kill                          | deferred until after prompt result (immediate SIGTERM+wait_for_exit answer also crashes ACP)             |
| `msActiveToCancelSend`              | **0**                                                                                                    |
| `msCancelSendToPromptResult`        | **37**                                                                                                   |
| `msCancelSendToTerminalExit`        | **87**                                                                                                   |
| `stopReason`                        | **`cancelled`**                                                                                          |
| `SHOULD_NOT_COMPLETE`               | absent                                                                                                   |
| Remaining spike terminals           | **0**                                                                                                    |
| `_cognition.ai/agent_stopped.cause` | `cancelled`                                                                                              |

### Digest scheme (corrected)

The first-run `summary.json` self-SHA was **invalid** (hash inserted then rewritten). Authoritative scheme:

- `artifactDigests` for non-summary files only;
- `summaryPayloadSha256` = SHA-256 of canonical summary JSON with `summaryPayloadSha256` omitted (**not** the SHA-256 of the final file);
- external final-file SHA-256 recorded in docs/PR after script exit.

| File                        |  Bytes | SHA-256                                                            |
| --------------------------- | -----: | ------------------------------------------------------------------ |
| `capabilities.json`         |    883 | `1c936a93ecf3fe8e57d297c5ed564244b330ae5aead9b9b28e8a6dd632615538` |
| `transcript.jsonl`          | 314507 | `fd3698df36d8453b4e6be4ddb4d791f9d57d62c3852f7e31965b3e931f422920` |
| `stderr.log`                |   7653 | `c84b9524bf3019097007a6bf23032f9f38038522a4cf4b6a554eba7ecf04ded6` |
| `summary.json` (final file) |   9287 | `4b877ae5808e3d707d0d2e03cbf105a48938c7900a68d8df7b1ebba24b651a32` |
| `summaryPayloadSha256`      |      — | `4199e9e5fa4eec9bb4b77d3e27638e894d0c7657ffba06586b8f7a8d7aef469a` |

Secret scan: **PASS** (`findings=[]`). Non-summary digests matched final files.

### Process / Box cleanup

- Spike terminals: exited (`SIGTERM`); remaining live count **0**.
- `devin acp`: exited (`SIGTERM`); post-run `pgrep -x devin` empty; post-stop orphan probe empty.
- Box `bx_wt5kzg3a` / slug `blue-prawn` released and absent from inventory.

### Hardened P0B matrix (authoritative)

| ID                                            | Result   | Evidence                                   |
| --------------------------------------------- | -------- | ------------------------------------------ |
| P0B-01 Node available inside Box              | **PASS** | `v24.15.0`                                 |
| P0B-02 Devin CLI available inside Box         | **PASS** | `3000.1.27`                                |
| P0B-03 Devin Box-side authentication succeeds | **PASS** | stored CLI credentials                     |
| P0B-04 `devin acp` starts                     | **PASS** | spawn + stderr ACP server                  |
| P0B-05 stdout JSON-RPC envelopes              | **PASS** | strict envelope validation; 0 violations   |
| P0B-06 initialize succeeds                    | **PASS** | 117ms                                      |
| P0B-07 protocol version negotiated            | **PASS** | selected `1`                               |
| P0B-08 exact capability response captured     | **PASS** | capabilities hash above                    |
| P0B-09 authentication requirement handled     | **PASS** | stored CLI; skip browser PKCE              |
| P0B-10 session/new succeeds                   | **PASS** | 3 digests                                  |
| P0B-11 session/prompt succeeds                | **PASS** | basic + terminal + cancel                  |
| P0B-12 session/update stream observed         | **PASS** | thought/message/usage/…                    |
| P0B-13 basic response completes correctly     | **PASS** | marker + `end_turn`                        |
| P0B-14 safe terminal lifecycle                | **PASS** | create→wait→output→release; `pwd`; exit 0  |
| P0B-15 cancel after active tool               | **PASS** | live terminal then cancel                  |
| P0B-16 cancelled op does not complete         | **PASS** | no `SHOULD_NOT_COMPLETE`; terminals exited |
| P0B-17 cancel stopReason + timings            | **PASS** | `cancelled` in 37ms; term exit 87ms        |
| P0B-18 no forbidden credentials reach Devin   | **PASS** | env key audit                              |
| P0B-19 evidence collected/verified            | **PASS** | parse + digests + secret scan              |
| P0B-20 no orphan terminal/Devin process       | **PASS** | cleanup proven                             |
| P0B-21 Box stopped/deleted                    | **PASS** | lease released; absent from list           |

### Failures during hardening (not concealed)

1. Auto-allow removal initially rejected cancel permissions until toolCall cache + shell-line `rawInput` parsing.
2. Devin `terminal/create` sends shell-line `command` with null `args` — require normalize-before-allowlist.
3. Cancel **before** create response, or answering `wait_for_exit` with immediate local SIGTERM during cancel, crashes Devin (`failed to send response, receiver dropped`) and omits prompt `stopReason`. Fix: cancel only after create ack; defer local kill until prompt settles.
4. Crabbox `set -e` + nonzero client exit can skip artifact download — wrapper now forces exit 0 after writing artifacts; pass/fail is in `summary.json` / `client.exit`.

## H. Historical first run (pre-harden; non-authoritative)

Prior lease `cbx_b66390f165e1` / slug `violet-prawn` / box `bx_8ezbf3vk` empirically negotiated ACP v1 and observed `stopReason=cancelled` (~44ms), but the committed harness could false-pass (weak P0B-05/14/17), auto-approve permissions, honor agent-raised output limits, treat `child.killed` as exit, and record an invalid summary self-digest. That run remains useful as transport/protocol smoke evidence only; **do not** treat its PASS table as the Phase 0C foundation.

## I. Go / no-go for Phase 0C

**GO for Phase 0C**, with constraints:

- Hardened rows P0B-01…P0B-21 all PASS on the authoritative rerun.
- Fail-closed permissions, host output cap, jail resolution, strict JSON-RPC envelopes, exact terminal lifecycle, and cancel `stopReason=cancelled` are proven by machine assertions.
- Do not call headless `authenticate(devin-browser)`; use Box-local stored CLI credentials.
- Treat `loadSession: true` as advertised only until 0C proves resume/load.
- Keep ACP client colocated with `devin acp` inside Box; Crabbox remains transport only.
- Production runtime implementation has **not** begun.

---

# Phase 0C.1 — authoritative session recovery / isolation rerun

**Date:** 2026-07-11
**Branch:** `spike/phase-0c-session-recovery` (PR https://github.com/kartikkabadi/loop/pull/4)
**Harness:** `scripts/spikes/devin-acp-box/phase0c.mjs` `0.1.1-phase0c1` + `validate-result.mjs`
**Frozen Phase 0B client:** `scripts/spikes/devin-acp-box/client.mjs` (untouched)
**Crabbox:** CLI `0.37.1`
**Box CLI:** `0.1.123-ascii-prod1`
**Devin CLI (inside Boxes):** `3000.1.27 (0d4bf12e)`
**Node (inside Boxes):** `v24.15.0`
**ACP:** v1; `session/load` with `{ sessionId, cwd, mcpServers }`

Prior Phase 0C (`0.1.0-phase0c`) matrix is superseded by this 0C.1 rerun. Do not treat older rows as authoritative.

## A. Scope and non-goals

Prove continuity, ACP restart load, Box stop/resume load, host structured validation, independent exact-head review, credential isolation, artifact digests, steer fallback, and cleanup.

Non-goals: no `AgentSessionRuntime`, no production ClawSweeper changes, no Codex cutover, no workflows/schemas/prompts/deps/lockfiles, no Devin on GHA, no `devin -p`, no ACP-over-Crabbox stdin.

## B. Box identities (sanitized)

| Role               | Lease              | Slug              | Box           | Notes                                                                 |
| ------------------ | ------------------ | ----------------- | ------------- | --------------------------------------------------------------------- |
| Builder / recovery | `cbx_bf6102222cf2` | `swift-lobster`   | `bx_u9pjq6ax` | subdomain `jowls-cloths-leaker`; IP after resume `188.34.195.254`     |
| Verifier           | `cbx_1809dad17086` | `harbor-crayfish` | `bx_r8vkrfd8` | distinct Box; no builder session material                             |

Session digests only (no raw session IDs):

| Context                   | Digest                                                             |
| ------------------------- | ------------------------------------------------------------------ |
| Continuity / load session | `34873be0924efc3ab7e918aad3a3ddafecfb490951f024f7eeaf15d9332837fa` |
| Verifier review session   | `fc0186fbd757b28a22c52b8005247c36b01f4b2c901c0cc4030262cff5bf494e` |
| Nonce hash                | `cd36ad1cf867d79b642422c4b3297a9ea4cc96201dedfcfe8ff8b3dc3c0908e1` |

## C. ACP contract inspection

| Layer                         | Result                                                                                                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Advertised                    | `loadSession: true`; prompt image/embeddedContext; session list/additionalDirectories objects; no mid-turn steer capability                                    |
| Spec methods                  | `session/new`, `session/load`, `session/prompt`, `session/cancel`, `session/update`                                                                            |
| Empirically accepted by Devin | `session/load` succeeds; subsequent prompt recovers exact nonce                                                                                                |
| Proven state preservation     | P0C-13 / P0C-14 / P0C-15 all recovered the nonce without re-supplying it                                                                                       |
| Steer                         | No native mid-turn steer. Cancel → `stopReason=cancelled`. Same-process continue after cancel crashes ACP (`receiver dropped`); select fresh-session fallback |

## D. Evidence matrix (authoritative 0C.1)

| ID         | Result   | Evidence                                                                                                                                                          | Timing                         | Fallback / runtime effect                                                                                |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| **P0C-13** | **PASS** | Same session digest; both `end_turn`; exact nonce on second prompt; zero tool requests                                                                            | d1=2993ms, d2=1947ms           | `continueSession` approved                                                                               |
| **P0C-14** | **PASS** | New ACP PID; `session/load` ok; nonce present                                                                                                                     | load=1476ms, prompt=1927ms     | Durable `loadSession` approved                                                                           |
| **P0C-15** | **PASS** | `box stop` → snapshot → `box resume` same Box ID/subdomain; IP changed; absolute `ln -sfn` Devin repair; `session/load` + nonce                                   | load=1038ms, prompt=2301ms     | Host must repair CLI symlink after resume                                                                |
| **P0C-16** | **PASS** | First suite attempt timed out without remote `.git` after `--fresh-sync`; rerun after git-bundle restore; validator ok; review hash `bc8e77b0…a0911b`               | 258116ms (rerun)               | Expand `--base-sha`/`--head-sha` on the **local** side; restore `.git` via bundle (Crabbox excludes it)  |
| **P0C-17** | **PASS** | Separate verifier Box; clean porcelain; exact head `1d53e668…`; seeded `src/math.js` P0 hit; validator ok                                                         | 39863ms structured             | Reviewer isolation mandatory                                                                             |
| **P0C-18** | **PASS** | Six parent sentinels present; ACP/terminal scrubbed env empty of secrets; terminal child inspected (`terminalProcOk`); `ACCESS_DENIED`; no secret leak            | rerun after harness harden     | Credential scrub + OS user boundary mandatory                                                            |
| **P0C-19** | **PASS** | Summaries, capabilities, transcripts, stderr, review/validator artifacts downloaded; payload digests recorded                                                     | —                              | Digests below                                                                                            |
| **P0C-20** | **PASS** | Both leases released via `crabbox stop`; spike Boxes absent from `box list` (404 on further stop); older unrelated stopped Boxes remain on the account            | —                              | Spike Boxes cleaned; leftover account Boxes noted                                                        |
| **steer**  | **PASS** | Cancel reached `cancelled`; same-process continue failed as expected; strategy `cancel+fresh-session-checkpoint-rehydrate`                                        | —                              | Option 4 selected                                                                                        |

### Canary SHAs

| Item              | Value                                      |
| ----------------- | ------------------------------------------ |
| Base (correct)    | `dcc053c3db4d560462e7149da44ff80e57240cbc` |
| Head (scripts)    | `1d53e668882d00ebee5489251e44b9f06a27bbcd` |
| Seeded defect     | `add()` returns `a - b`; path `src/math.js` (no seed label comment) |

### Authoritative artifact digests (selected)

| Artifact                         | SHA-256 / payload                                                      | Bytes |
| -------------------------------- | ---------------------------------------------------------------------- | ----- |
| builder capabilities             | `1c936a93ecf3fe8e57d297c5ed564244b330ae5aead9b9b28e8a6dd632615538`     | 883   |
| P0C-16 review-result             | `bc8e77b0e3a58aa37ca09973da8b8a91919e9194a8939f9730c7662a11a0911b`     | 671   |
| P0C-16 summary payload           | `c02e66169ebe42f240f2867eda25189ead254958fb2efd9a025f21fc7d434537`     | —     |
| P0C-18 summary payload           | `c5e8d35e98ea4ffdaead72359c3a07a1e041713b9aae15d3c5d5bd17d945ea1c`     | —     |
| steer summary payload            | `421849ca352bfc53c60fc6680f192b0fb8bf33aa8bbabcb87d7db1b2f2655e81`     | —     |
| P0C-15 summary payload           | `ad1f6309e0dc3918eba2bdb562553752666fae3dc86927ca327a2e7e26baa992`     | —     |
| verifier review-result           | `4bfd9948ee6a21528450e5509798b0c029d5655581e4901b6d47b23672f69e07`     | 598   |
| verifier summary payload         | `65d387f12905da2851688aee557e6a0bdd5e793bdd2c6b5e366e1a6b964767ca`     | —     |

Raw transcripts stay outside Git (`/tmp/loop-phase-0c1-evidence`).

## E. Steer strategy (chosen)

**Option 4:** `cancel + fresh session with host checkpoint rehydration`.

1. Native ACP mid-turn steer — **not observed**.
2. Cancel + same-process continue — **FAIL** (ACP exits after `cancelled`).
3. Cancel + fresh session + host checkpoint — **selected**.

## F. Phase 1 / Phase 2 runtime contract (empirically justified)

### Mandatory

```text
initialize
capabilities
createSession
prompt
cancel                    # expect stopReason=cancelled
```

### Capability-gated (proven)

```text
continueSession           # P0C-13
loadSession               # P0C-14, P0C-15
```

### Unsupported / fallback

```text
native mid-turn steer
cancel + same-process continue prompt
Box recovery if stop/resume unavailable → fresh Box + fresh session + host checkpoint
```

### Boundaries

- Host validation via `validate-result.mjs`; reject unknown fields.
- Credential boundary: Devin ACP/terminal env scrubbed; terminal runs as `loop-runner`; canary credentials file yields `ACCESS_DENIED`.
- Reviewer isolation: separate Box + clean exact head + no builder session material.
- Box recovery: stop/resume keeps Box ID + disk + creds; repair absolute Devin symlink; tolerate IP change.

## G. Go / no-go for Phase 1

**GO for Phase 1 design of `AgentSessionRuntime` against the contract above.**

All of P0C-13…P0C-20 and steer PASS on this 0C.1 harness. Production implementation has **not** begun in this PR.

## H. Hardening notes (0C.1)

1. Expand `--base-sha` / `--head-sha` on the **local** side into the remote command string (remote `$VAR` in single quotes is empty).
2. Devin re-escapes `sh -lc` scripts; allowlist uses `canonicalizeShellScript`, then spawn rewrites security/cancel probes to canonical scripts.
3. `sudo` children are root-owned; host attests `/proc/<pid>/environ` via `sudo cat` (does not weaken the isolation assertion).
4. Crabbox sync excludes `.git`; use a git bundle + restore before structured/exact-head modes. Avoid `--fresh-sync` afterward unless restoring git again.
5. After Box resume, force `ln -sfn` to the absolute Devin binary before ACP.
