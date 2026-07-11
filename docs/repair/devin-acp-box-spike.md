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
