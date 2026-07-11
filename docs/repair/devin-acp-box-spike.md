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

**Date:** 2026-07-11
**Docs access date:** 2026-07-11
**Loop base SHA:** `ad932cff9161508235249179ae6cb56345d857fa` (PR #2 / Phase 0A merge)
**Phase 0A merge SHA:** `ad932cff9161508235249179ae6cb56345d857fa`
**Crabbox:** CLI `0.37.1` · source `3134f34eea72c4a8a5790b0531d740d46c548e8c`
**Box CLI:** `0.1.123-ascii-prod1`
**Devin CLI (inside Box):** `3000.1.27 (0d4bf12e)`
**Node (inside Box):** `v24.15.0`
**ACP specification:** v1 (`protocolVersion` requested and selected: `1`)
**ACP TypeScript SDK inspected:** `@agentclientprotocol/sdk` release `v1.2.1` (reference only; spike client is dependency-free)

## 1. Scope and non-goals

### Objective

Prove a small Node client running **inside** an ASCII Box can launch local `devin acp` and speak newline-delimited JSON-RPC over stdio for initialize, session/new, session/prompt, session/update, terminal client requests, and session/cancel.

### Non-goals

- No production `AgentSessionRuntime`
- No ClawSweeper source/workflow/schema/prompt/dependency changes
- No Codex lane cutover
- No Phase 0C
- No ACP tunneling over Crabbox SSH stdin
- No `devin -p` as architecture
- No committing raw transcripts or credentials

## 2. Topology

```text
Local Cursor → Crabbox → ASCII Box
  → node scripts/spikes/devin-acp-box/client.mjs
      ↔ stdio JSON-RPC
        ↔ local `devin acp`
```

Canary workspace (disposable git repo, not Loop checkout):
`/home/user/crabbox/cbx_b66390f165e1/loop-phase-0b-1VhIbE`
Local canary commit: `993fe48ff584af7dc03b2789f8e9e14b351c6518`
Marker digest: `42f441918ff6688e7c2a476ec69f3ad62fd737179e223f8f1d215ee5e825ae68`

## 3. Box lifecycle (sanitized)

| Field | Value |
|---|---|
| Lease | `cbx_b66390f165e1` |
| Slug | `violet-prawn` |
| Box | `bx_8ezbf3vk` |
| Host | `46.224.51.6` |
| Warmup | **19.689s** (wall ~19.9s) |
| Stop/delete | **20.353s** → status not found (exit 4); `box info` 404 |

## 4. Authentication (no values)

| Observation | Detail |
|---|---|
| Pre-existing Box credential file | `~/.local/share/devin/credentials.toml` present before install |
| Install | Official `curl -fsSL https://cli.devin.ai/install.sh \| bash` on Box |
| `devin auth status` | Logged in (via Devin); Pro tier — values not logged beyond account email already shown by CLI |
| ACP `authMethods` | `[{ id: "devin-browser", name: "Log in with browser" }]` |
| Mechanism used | **stored CLI credentials** |
| Failed approach (recorded) | Calling ACP `authenticate` with `devin-browser` starts PKCE and hangs headless (~180s), then blocks `session/new`. Spike client now skips browser-only authenticate. |
| stderr policy note | `ACP_BACKEND not set. Will accept host credentials if provided, otherwise fall back to env vars and stored CLI credentials.` |

## 5. Exact initialize request shape

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": 1,
    "clientCapabilities": {
      "fs": { "readTextFile": true, "writeTextFile": false },
      "terminal": true
    },
    "clientInfo": {
      "name": "loop-phase0b-spike",
      "title": "Loop Phase 0B ACP Spike",
      "version": "0.1.0-phase0b"
    }
  }
}
```

## 6. Sanitized initialize response (full capability structure)

```json
{
  "protocolVersion": 1,
  "agentCapabilities": {
    "loadSession": true,
    "promptCapabilities": { "image": true, "audio": false, "embeddedContext": true },
    "mcpCapabilities": { "http": false, "sse": false },
    "sessionCapabilities": { "list": {}, "additionalDirectories": {} },
    "_meta": {
      "cognition.ai/multiRootWorkspace": true,
      "cognition.ai/sessionRename": true,
      "cognition.ai/documentLifecycle": true,
      "cognition.ai/terminalLifecycle": true
    }
  },
  "authMethods": [
    { "id": "devin-browser", "name": "Log in with browser", "description": "Sign in via your browser" }
  ],
  "agentInfo": { "name": "affogato", "title": "Affogato Agent", "version": "0.0.0-dev" },
  "_meta": { "mcpConfigPath": "/home/user/.config/devin/config.json" }
}
```

### Advertised vs absent (do not assume for Phase 0C without use)

| Capability | Observed |
|---|---|
| `loadSession` | **true** (advertised; not exercised in 0B) |
| `sessionCapabilities.list` | present (empty object) |
| mid-turn steer | **not** observed / not claimed |
| session close/delete/fork | **not** claimed from this spike |
| MCP http/sse | false |
| terminal (client) | used successfully |

## 7. Session creation

Three `session/new` calls succeeded. Session ID digests (SHA-256):

1. `6b5be7d6eda25f7c0c60b208efd5d60dc762d5ab262387810d2dccd5de87cd9d`
2. `eb0c0ba06d48a0d8beedb9e15bc4451dfa040d7295c79a631fd4c966cf0fa432`
3. `1c89a9b138ec583edcc0dc2e36f090f0be4d1ee916e2064c17204bcd5257fa0f`

## 8. Basic prompt + updates

- Prompt: `Reply with exactly LOOP_ACP_BASIC_OK and do not use any tools.`
- Result: `stopReason=end_turn`; marker present in agent message stream
- Duration: **1422ms**
- Update types observed: `config_option_update`, `current_mode_update`, `available_commands_update`, `session_info_update`, `agent_thought_chunk`, `agent_message_chunk`, `usage_update`

## 9. Safe terminal request sequence

Client-directed methods (in order family):
`terminal/create` → `terminal/wait_for_exit` → `terminal/output` → `terminal/release`
Allowlisted command: `pwd`
Result: `stopReason=end_turn`; duration **2926ms**

## 10. Cancellation timeline

| Event | Evidence |
|---|---|
| Active tool observed | `terminal/create` for allowlisted `sh -lc 'sleep 30; printf SHOULD_NOT_COMPLETE'` |
| `session/cancel` sent | immediately after terminal create evidence |
| Cancel latency | **44ms** until prompt returned |
| Prompt outcome | `stopReason: cancelled` |
| `SHOULD_NOT_COMPLETE` emitted? | **No** |
| Remaining terminals | **0** |

## 11. JSON-RPC framing

- stdout: newline-delimited JSON-RPC only (`P0B-05` PASS; no non-JSON samples)
- stderr: separate diagnostic log (Devin/chisel INFO lines)
- Concurrent request IDs correlated by client

## 12. Environment boundary

Child env key names only:
`HOME`, `LANG`, `LC_ALL`, `LOGNAME`, `PATH`, `SHELL`, `USER`, `XDG_DATA_DIRS`, `XDG_RUNTIME_DIR`, `XDG_SESSION_CLASS`, `XDG_SESSION_ID`, `XDG_SESSION_TYPE`

Forbidden keys audit: **passed** (no `GITHUB_*`, `ASCII_BOX_*`, `OPENAI_*`, `CODEX_*`, etc.)

## 13. Evidence artifacts (not committed)

Collected via Crabbox `--download` to `/tmp/loop-phase-0b-artifacts/` (wiped after docs):

| File | Bytes | SHA-256 |
|---|---:|---|
| `capabilities.json` | 883 | `1c936a93ecf3fe8e57d297c5ed564244b330ae5aead9b9b28e8a6dd632615538` |
| `transcript.jsonl` | 247715 | `f0282fa06050b3b292d477fe6180af004a87cdfa1bba71a4d0c56932d65e3236` |
| `stderr.log` | 6765 | `5dfc115cda926cff3ee7bd82131fd81da337ec8ab806c20a803ed055b4625bce` |
| `summary.json` | 5195 | `5cc5a743c7696b4a72307b18b94765d24a8a8426050e1b342e988a01712cb2cf` |

## 14. Failures / retries / deviations

1. **First ACP run:** called `authenticate` with `devin-browser` → PKCE hang → `session/new` timeout. Client updated to skip browser-only ACP authenticate and rely on stored CLI credentials.
2. **Orphan probe false positive:** `pgrep -af 'devin acp'` matched the wrapping `bash -lc` command line; dedicated `pgrep -x devin` / awk filter showed **no** leftover Devin processes after client exit.
3. **`pkill` cleanup run** before retry returned crabbox exit 255 once (no matching process); lease remained healthy.

## 15. Pass/fail matrix

| ID | Result | Evidence |
|---|---|---|
| P0B-01 Node available inside Box | **PASS** | `v24.15.0` via nvm |
| P0B-02 Devin CLI available inside Box | **PASS** | `devin 3000.1.27` after official install |
| P0B-03 Devin Box-side authentication succeeds | **PASS** | `devin auth status` logged in; stored credentials |
| P0B-04 `devin acp` starts | **PASS** | stderr ACP server PID; client spawn |
| P0B-05 stdout JSON-RPC only | **PASS** | assertion + empty nonJsonSamples |
| P0B-06 initialize succeeds | **PASS** | 94ms; capabilities.json |
| P0B-07 protocol version negotiated | **PASS** | selected `1` |
| P0B-08 exact capability response captured | **PASS** | capabilities.json hash above |
| P0B-09 authentication requirement handled | **PASS** | skipped browser PKCE; stored CLI creds |
| P0B-10 session/new succeeds | **PASS** | 3 session digests |
| P0B-11 session/prompt succeeds | **PASS** | basic + terminal prompts |
| P0B-12 session/update stream observed | **PASS** | update types listed above |
| P0B-13 basic response completes correctly | **PASS** | `LOOP_ACP_BASIC_OK` |
| P0B-14 safe terminal client request handled | **PASS** | terminal/* sequence for `pwd` |
| P0B-15 cancel after active tool | **PASS** | terminal_create then cancel |
| P0B-16 cancelled op does not complete | **PASS** | no `SHOULD_NOT_COMPLETE` |
| P0B-17 cancel within bound | **PASS** | 44ms ≪ 60s |
| P0B-18 no forbidden credentials reach Devin | **PASS** | env key audit |
| P0B-19 evidence collected/verified | **PASS** | hashes above; JSON parse |
| P0B-20 no orphan terminal/Devin process | **PASS** | `NO_DEVIN_PROCS` after exit |
| P0B-21 Box stopped/deleted | **PASS** | lease released; 404; absent from list |

## 16. Go / no-go for Phase 0C

**GO for Phase 0C** (session recovery / reviewer isolation / security proofs), with constraints:

- Core rows P0B-03–P0B-13 and P0B-15–P0B-21 all PASS; P0B-14 PASS.
- Do not call headless `authenticate(devin-browser)`; use Box-local stored CLI credentials.
- Treat `loadSession: true` as advertised only — prove resume/load empirically in 0C before depending on it.
- Keep ACP client colocated with `devin acp` inside Box; Crabbox remains transport only.
- Production runtime implementation has **not** begun.
