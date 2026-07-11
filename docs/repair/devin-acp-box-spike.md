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

| Component | Value |
|---|---|
| Loop `main` / spike base | `fa9c5cc79968719395a443707521db04077fb6cd` (PR #1 merge) |
| Crabbox source inspection | `3134f34eea72c4a8a5790b0531d740d46c548e8c` |
| Crabbox CLI | `0.37.1` (`/opt/homebrew/bin/crabbox`) |
| ASCII Box CLI | `box 0.1.123-ascii-prod1` (`/Users/user/.ascii/bin/box`) |

## 3. Local environment and tool versions

| Item | Value |
|---|---|
| OS | macOS 26.5.1 (Build 25F80), Darwin 25.5.0 arm64 |
| `uname -a` | Darwin … RELEASE_ARM64_T6000 arm64 |
| `git` | 2.50.1 (Apple Git-155) |
| `ssh` | OpenSSH_10.2p1, LibreSSL 3.3.6 |
| `rsync` | openrsync protocol version 29 |
| `crabbox` | 0.37.1 |
| `box` | 0.1.123-ascii-prod1 |

Note: interactive shells wrap `box` as a zsh function; Crabbox was pointed at the real binary with `--ascii-box-cli /Users/user/.ascii/bin/box` (and `PATH` included `~/.ascii/bin` for direct `box` calls).

## 4. Credential-presence results (no values)

| Check | Result |
|---|---|
| `ASCII_BOX_API_KEY` env initially | unset |
| `CRABBOX_ASCII_BOX_API_KEY` env initially | unset |
| `box status --json` | healthy API; account `active`; plan `Trial` |
| Box CLI config present | yes (`~/Library/Application Support/ascii/box/config.json`) |
| Config fields present (names only) | `api_url`, `token`, `channel` |
| Auth used for spike | exported `ASCII_BOX_API_KEY` from the existing Box CLI `token` field into the shell environment for Crabbox (value never printed/logged) |

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

| Phase | Identity / evidence | Duration |
|---|---|---|
| Provision / warm | lease `cbx_c8544e598772`, slug `amber-lobster`, box `bx_4vtcg552`, host `91.98.92.236`, state `ready` | **11.829s** (CLI `total=`); wall **11.910s** |
| SSH ready | `ready ssh=user@91.98.92.236:22` in warmup output | included in warmup |
| Status | `state=idle ready=true has_host=true` | **1.701s** |
| Sync (run1) | `1 files, 40 B` → `/home/user/crabbox/cbx_c8544e598772/loop-phase-0a-sFBtYa` | **18.631s** |
| Command (run1) | wrote `transport-output.json`; digest matched | **6.147s** |
| Artifact collect | `--require-artifact` + `--download`; local file 468 B | included in run1 |
| Run1 total (Crabbox) | exit 0 | **37.901s** (wall **49.938s**) |
| Reuse (run2) | same lease/slug/box/IP; `sync_skipped=true` | sync **8.286s** (skip), cmd **6.662s**, total **16.962s** |
| Stop/delete | `released lease=cbx_c8544e598772 box=bx_4vtcg552` | **20.391s** |
| Post-stop status | not found (exit 4) | — |
| Post-stop `box info` | HTTP 404 `not_found` | — |

Observable usage/cost: Box plan `Trial`; no dollar cost printed by CLI. Pre-existing unrelated Boxes (`bx_p98ch…` stopped, `bx_7hzfw…` stopped, `bx_vryu5…` ready) were left untouched. Canary `bx_4vtcg552` was absent after stop.

## 7. Pass/fail table

| ID | Check | Result | Evidence |
|---|---|---|---|
| P0A-01 | Crabbox CLI available | **PASS** | `crabbox --version` → `0.37.1` |
| P0A-02 | ASCII Box CLI available | **PASS** | `box --version` → `0.1.123-ascii-prod1` |
| P0A-03 | Credential recognized | **PASS** | `box status` healthy; Crabbox provisioned with `ASCII_BOX_API_KEY` set from Box CLI token |
| P0A-04 | Box provisioned | **PASS** | warmup created `bx_4vtcg552` / lease `cbx_c8544e598772` |
| P0A-05 | SSH became ready | **PASS** | warmup `ready ssh=user@91.98.92.236:22` |
| P0A-06 | Known file synchronized | **PASS** | run1 sync of `transport-input.txt` (40 B); remote `test -f` succeeded |
| P0A-07 | Remote command executed | **PASS** | run1 printed matching digest; exit 0 |
| P0A-08 | Artifact returned | **PASS** | downloaded `/tmp/.../transport-output.json` (468 B) |
| P0A-09 | Artifact integrity verified | **PASS** | remote `marker_digest` == local `MARKER_DIGEST`; artifact SHA-256 `7fce35967ac4b973b6b7052f8faaa7cafcf89798b2f2a7b44ad439cca9935068` |
| P0A-10 | Existing lease reused | **PASS** | run2 same lease/slug/box/IP via status + `box info` |
| P0A-11 | Stop/delete completed | **PASS** | `released lease=… box=…`; subsequent status not found |
| P0A-12 | No orphan Box remained | **PASS** | canary absent from `box list`; not running |
| P0A-13 | Crabbox command transport is not duplex ACP | **PASS** | source inspection below |

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

| Field | Value |
|---|---|
| Local marker digest | `43826202b86dc916de8c057825f119cd46afbfbf11ad2a2e6bc58de4cc064d8e` |
| Artifact file SHA-256 | `7fce35967ac4b973b6b7052f8faaa7cafcf89798b2f2a7b44ad439cca9935068` |
| Canary commit | `43c87af10483926d9d212ceb18da440897f8523e` |

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

| Symbol | Lines | Behavior |
|---|---|---|
| `runSSHInput` | 459–484 | `io.ReadAll(input)` then `cmd.Stdin = bytes.NewReader(data)` — full input buffered before/at launch; not a live bidirectional RPC pipe |
| `runSSHStreamResult` | 517–536 | uses `sshArgsNoInput(...)` |
| `sshArgsNoInputWithOptions` | 589–595 | appends SSH **`-n`** (redirect stdin from `/dev/null`) |

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

| Field | Value |
|---|---|
| Lease | `cbx_f937aae38537` |
| Slug | `blue-prawn` |
| Box | `bx_wt5kzg3a` |
| Host | `188.245.81.138` |
| Warmup | **14.761s** |
| Canary commit | `ace47296fe14d135b21d23c3a7cd804c2c2bc202` |
| Marker digest | `95f226f4a0c0fdbc88ee7a30419b769cb75187748a5daba6a2301e9cf83257ed` |
| Stop/delete | lease released; `bx_wt5kzg3a` / `blue-prawn` absent from Box list; orphan probe empty |

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

| Metric | Value |
|---|---|
| Active evidence | live terminal for allowlisted cancel sleep |
| `session/cancel` | sent only after create RPC was acknowledged (cancel-during-create crashes Devin with `receiver dropped`) |
| Local kill | deferred until after prompt result (immediate SIGTERM+wait_for_exit answer also crashes ACP) |
| `msActiveToCancelSend` | **0** |
| `msCancelSendToPromptResult` | **37** |
| `msCancelSendToTerminalExit` | **87** |
| `stopReason` | **`cancelled`** |
| `SHOULD_NOT_COMPLETE` | absent |
| Remaining spike terminals | **0** |
| `_cognition.ai/agent_stopped.cause` | `cancelled` |

### Digest scheme (corrected)

The first-run `summary.json` self-SHA was **invalid** (hash inserted then rewritten). Authoritative scheme:

- `artifactDigests` for non-summary files only;
- `summaryPayloadSha256` = SHA-256 of canonical summary JSON with `summaryPayloadSha256` omitted (**not** the SHA-256 of the final file);
- external final-file SHA-256 recorded in docs/PR after script exit.

| File | Bytes | SHA-256 |
|---|---:|---|
| `capabilities.json` | 883 | `1c936a93ecf3fe8e57d297c5ed564244b330ae5aead9b9b28e8a6dd632615538` |
| `transcript.jsonl` | 314507 | `fd3698df36d8453b4e6be4ddb4d791f9d57d62c3852f7e31965b3e931f422920` |
| `stderr.log` | 7653 | `c84b9524bf3019097007a6bf23032f9f38038522a4cf4b6a554eba7ecf04ded6` |
| `summary.json` (final file) | 9287 | `4b877ae5808e3d707d0d2e03cbf105a48938c7900a68d8df7b1ebba24b651a32` |
| `summaryPayloadSha256` | — | `4199e9e5fa4eec9bb4b77d3e27638e894d0c7657ffba06586b8f7a8d7aef469a` |

Secret scan: **PASS** (`findings=[]`). Non-summary digests matched final files.

### Process / Box cleanup

- Spike terminals: exited (`SIGTERM`); remaining live count **0**.
- `devin acp`: exited (`SIGTERM`); post-run `pgrep -x devin` empty; post-stop orphan probe empty.
- Box `bx_wt5kzg3a` / slug `blue-prawn` released and absent from inventory.

### Hardened P0B matrix (authoritative)

| ID | Result | Evidence |
|---|---|---|
| P0B-01 Node available inside Box | **PASS** | `v24.15.0` |
| P0B-02 Devin CLI available inside Box | **PASS** | `3000.1.27` |
| P0B-03 Devin Box-side authentication succeeds | **PASS** | stored CLI credentials |
| P0B-04 `devin acp` starts | **PASS** | spawn + stderr ACP server |
| P0B-05 stdout JSON-RPC envelopes | **PASS** | strict envelope validation; 0 violations |
| P0B-06 initialize succeeds | **PASS** | 117ms |
| P0B-07 protocol version negotiated | **PASS** | selected `1` |
| P0B-08 exact capability response captured | **PASS** | capabilities hash above |
| P0B-09 authentication requirement handled | **PASS** | stored CLI; skip browser PKCE |
| P0B-10 session/new succeeds | **PASS** | 3 digests |
| P0B-11 session/prompt succeeds | **PASS** | basic + terminal + cancel |
| P0B-12 session/update stream observed | **PASS** | thought/message/usage/… |
| P0B-13 basic response completes correctly | **PASS** | marker + `end_turn` |
| P0B-14 safe terminal lifecycle | **PASS** | create→wait→output→release; `pwd`; exit 0 |
| P0B-15 cancel after active tool | **PASS** | live terminal then cancel |
| P0B-16 cancelled op does not complete | **PASS** | no `SHOULD_NOT_COMPLETE`; terminals exited |
| P0B-17 cancel stopReason + timings | **PASS** | `cancelled` in 37ms; term exit 87ms |
| P0B-18 no forbidden credentials reach Devin | **PASS** | env key audit |
| P0B-19 evidence collected/verified | **PASS** | parse + digests + secret scan |
| P0B-20 no orphan terminal/Devin process | **PASS** | cleanup proven |
| P0B-21 Box stopped/deleted | **PASS** | lease released; absent from list |

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
