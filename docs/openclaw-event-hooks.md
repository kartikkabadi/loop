# OpenClaw Event Hooks

ClawSweeper can forward important automation events to OpenClaw through the
Gateway hook API. The pattern is generic: a deterministic ClawSweeper workflow
detects an event, posts a small authenticated payload to OpenClaw, and OpenClaw
runs the configured agent in a separate hook session. The agent then delivers
the user-facing message to Discord or another configured channel.

Use this path for operational notifications that should be explained by an
OpenClaw agent, not for safety-critical GitHub mutations. GitHub mutation still
belongs in deterministic ClawSweeper scripts.

## Shape

The normal event flow is:

1. A ClawSweeper workflow produces a durable event source, such as
   `repair-apply-report.json`.
2. A small notifier script filters the event source and writes a local report.
3. The notifier checks a durable ledger before sending anything.
4. The notifier posts `POST /hooks/agent` to the OpenClaw Gateway with bearer
   authentication.
5. OpenClaw starts an isolated agent turn for the requested `agentId`.
6. The agent sends the final message to the configured delivery target.
7. ClawSweeper records successful sends in the ledger and publishes it to
   `openclaw/clawsweeper-state`.

The hook call is best-effort by default. A Discord outage or Gateway outage
must not make an already-completed GitHub mutation roll back or fail the state
publish job unless that event explicitly opts into strict mode.

## OpenClaw Gateway

Enable hooks on the OpenClaw host that owns the target agent and channel
credentials:

```js
hooks: {
  enabled: true,
  path: "/hooks",
  token: "...",
  defaultSessionKey: "hook:clawsweeper-events",
  allowRequestSessionKey: false,
  allowedSessionKeyPrefixes: ["hook:"],
  allowedAgentIds: ["clawsweeper"]
}
```

Use a dedicated hook token. Do not reuse the Gateway auth token or any Discord
token. Expose only the hook path through HTTPS, tailnet, or another trusted
reverse proxy.

`POST /hooks/agent` accepts the fields ClawSweeper normally needs:

```json
{
  "agentId": "clawsweeper",
  "message": "Summarize the event and send one Discord notification.",
  "deliver": true,
  "channel": "discord",
  "to": "channel:1499243561407741994",
  "idempotencyKey": "clawsweeper:merge:openclaw/openclaw:123:abc123",
  "thinking": "low",
  "timeoutSeconds": 300
}
```

Keep `allowRequestSessionKey` off for ClawSweeper events. With a configured
`defaultSessionKey`, hook turns remain separate from the normal interactive
Discord session while still being scoped to the `clawsweeper` agent. If a future
event class needs caller-selected session keys, constrain them with
`allowedSessionKeyPrefixes`.

## ClawSweeper Configuration

Each hook-backed event should use this repository configuration shape:

- `CLAWSWEEPER_OPENCLAW_HOOK_URL` secret: OpenClaw hook base URL or full
  `/hooks/agent` URL.
- `CLAWSWEEPER_OPENCLAW_HOOK_TOKEN` secret: bearer token for the hook.
- `CLAWSWEEPER_OPENCLAW_AGENT_ID` variable: target agent id, usually
  `clawsweeper`.
- event-specific delivery variable, such as `CLAWSWEEPER_DISCORD_TARGET`.

Notifier scripts should accept a base URL ending in `/hooks` or a full URL
ending in `/hooks/agent`. They should normalize the URL instead of requiring
operators to remember the exact form.

## Notifier Contract

A ClawSweeper notifier should be deterministic around everything except the
OpenClaw call itself:

- read a durable event source, not live GitHub state, when possible;
- filter only events this notifier owns;
- skip historical catch-up rows unless the operator explicitly asks to replay;
- build a stable idempotency key from event identity and the final mutation
  result, such as repo, PR number, action, and merge commit SHA;
- check a durable ledger before sending;
- write a report for attempted, skipped, sent, and failed notifications;
- write the ledger only after OpenClaw accepted the request;
- publish the report and ledger with the normal result state.

The message sent to OpenClaw should be explicit enough that the agent does not
need to inspect GitHub before posting a notification. Include the repository,
item number, title, URL, action, reason, timestamp, commit SHA, workflow run,
and any cluster or job id that helps later debugging.

## Failure Semantics

Default behavior:

- missing hook URL, token, or delivery target: skip notification and keep the
  workflow green;
- OpenClaw HTTP failure: record the failed attempt and keep the workflow green;
- rerun after failure: retry because no success ledger entry exists;
- rerun after success: skip because the ledger contains the event key.

Strict mode is allowed for events whose notification is the product of the
workflow. Strict mode should fail on OpenClaw delivery errors, but it still
should not retry an event already recorded as sent.

## Adding A New Event

When adding another ClawSweeper-to-OpenClaw event:

1. Define the event source and the exact rows that count as newly actionable.
2. Add an event-specific notifier script under `src/repair/` or the owning lane.
3. Add tests for filtering, missing config, URL normalization, successful send,
   failed send, ledger dedupe, and rerun behavior.
4. Add the workflow step after the durable event source exists and before the
   state commit that publishes the ledger.
5. Publish the event report and ledger path to `openclaw/clawsweeper-state`.
6. Document required secrets, variables, target channel, and replay behavior.

Do not send directly from every worker. Send once from the publish/finalizer job
after deterministic apply has produced a single authoritative report.

## Current Event: PR Merged

The repair publish workflow sends Discord notifications for PRs that
ClawSweeper actually merged. The notifier reads `repair-apply-report.json`,
filters executed `merge_candidate` and `merge_canonical` rows, skips catch-up
rows whose reason is `already merged`, and posts the event through
`/hooks/agent`.

Successful sends are recorded in:

```text
notifications/clawsweeper-merge-ledger.json
```

The current delivery target is the OpenClaw Discord `#clawsweeper` channel via
`CLAWSWEEPER_DISCORD_TARGET`.
