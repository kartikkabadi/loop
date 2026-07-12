/**
 * Provider-neutral agent session runtime contracts.
 *
 * Models a session-oriented runtime shaped by empirically proven operations:
 * initialize, createSession, prompt, and cancel are mandatory. Same-session
 * continuation and session loading are capability-gated. Native mid-turn steer
 * and cancel-then-continue in the same process remain unsupported.
 *
 * This module is contracts and type guards only. It does not spawn processes,
 * touch the filesystem, read environment variables, own credentials or
 * workspaces, mutate GitHub, validate structured results, or implement
 * retries, timeouts, or permission policy.
 *
 * Raw final text returned by prompt/continueSession is host-validated outside
 * this boundary (see result-contract validation).
 */

export type AgentSessionId = string;

export type AgentRuntimeCapabilities =
  | {
      continueSession: false;
      loadSession: false;
    }
  | {
      continueSession: true;
      loadSession: false;
    }
  | {
      continueSession: false;
      loadSession: true;
    }
  | {
      continueSession: true;
      loadSession: true;
    };

export type AgentRuntimeInfo = Readonly<{
  protocolVersion: string | number;
  agentName?: string;
  agentVersion?: string;
}>;

export type AgentSession = Readonly<{
  id: AgentSessionId;
  cwd: string;
}>;

export type CreateAgentSessionInput = Readonly<{
  cwd: string;
}>;

export type LoadAgentSessionInput = Readonly<{
  sessionId: AgentSessionId;
  cwd: string;
}>;

export type AgentPromptInput = Readonly<{
  sessionId: AgentSessionId;
  text: string;
}>;

export type AgentCancelInput = Readonly<{
  sessionId: AgentSessionId;
}>;

export type AgentPromptStopReason = "end_turn" | "cancelled" | (string & {});

export type AgentPromptResult = Readonly<{
  sessionId: AgentSessionId;
  stopReason: AgentPromptStopReason;
  outputText: string;
}>;

type InitializedCore<C extends AgentRuntimeCapabilities> = {
  readonly info: AgentRuntimeInfo;
  readonly capabilities: C;

  createSession(input: CreateAgentSessionInput): Promise<AgentSession>;

  /**
   * Starts a prompt turn for a created or loaded session.
   * Resolves with raw final text and a stop reason.
   * Structured-result validation is a separate host concern.
   */
  prompt(input: AgentPromptInput): Promise<AgentPromptResult>;

  /**
   * Requests cancellation of an active prompt.
   * Does not promise continued usability of the same runtime process.
   *
   * Invariant: cancel() requests cancellation. The authoritative cancellation
   * outcome is observed when the active prompt settles with
   * stopReason === "cancelled".
   */
  cancel(input: AgentCancelInput): Promise<void>;
};

/** Core-only initialized runtime: no continuation or loading methods. */
export type InitializedAgentSessionRuntimeCoreOnly = InitializedCore<{
  continueSession: false;
  loadSession: false;
}> & {
  continueSession?: never;
  loadSession?: never;
};

/**
 * Continuation-enabled initialized runtime.
 *
 * `continueSession` is another completed prompt turn in the same live session.
 * It does not imply survival after process restart and must not be used after a
 * cancelled process has exited.
 */
export type InitializedAgentSessionRuntimeContinueOnly = InitializedCore<{
  continueSession: true;
  loadSession: false;
}> & {
  /**
   * Later turn in the same live session. Available only when
   * `continueSession: true`. Does not imply survival after process restart.
   * Must not be used after a cancelled process has exited.
   */
  continueSession(input: AgentPromptInput): Promise<AgentPromptResult>;
  loadSession?: never;
};

/**
 * Loading-enabled initialized runtime.
 *
 * `loadSession` reloads a previously created session into a newly initialized
 * runtime process. The caller supplies the intended working directory. This
 * does not imply workspace lifecycle ownership.
 */
export type InitializedAgentSessionRuntimeLoadOnly = InitializedCore<{
  continueSession: false;
  loadSession: true;
}> & {
  continueSession?: never;
  /**
   * Reloads a persisted session into a new initialized runtime.
   * Available only when `loadSession: true`. Requires the caller to supply
   * the intended working directory. Does not imply workspace lifecycle
   * ownership.
   */
  loadSession(input: LoadAgentSessionInput): Promise<AgentSession>;
};

/** Continuation and loading both enabled. */
export type InitializedAgentSessionRuntimeBoth = InitializedCore<{
  continueSession: true;
  loadSession: true;
}> & {
  /**
   * Later turn in the same live session. Available only when
   * `continueSession: true`. Does not imply survival after process restart.
   * Must not be used after a cancelled process has exited.
   */
  continueSession(input: AgentPromptInput): Promise<AgentPromptResult>;
  /**
   * Reloads a persisted session into a new initialized runtime.
   * Available only when `loadSession: true`. Requires the caller to supply
   * the intended working directory. Does not imply workspace lifecycle
   * ownership.
   */
  loadSession(input: LoadAgentSessionInput): Promise<AgentSession>;
};

export type InitializedAgentSessionRuntime =
  | InitializedAgentSessionRuntimeCoreOnly
  | InitializedAgentSessionRuntimeContinueOnly
  | InitializedAgentSessionRuntimeLoadOnly
  | InitializedAgentSessionRuntimeBoth;

/**
 * Uninitialized session runtime. Exposes only initialization as a state
 * transition into an initialized runtime with a concrete capability set.
 */
export interface AgentSessionRuntime {
  initialize(): Promise<InitializedAgentSessionRuntime>;
}

/**
 * Narrows to runtimes that advertise and implement same-session continuation.
 */
export function supportsContinueSession(
  runtime: InitializedAgentSessionRuntime,
): runtime is InitializedAgentSessionRuntimeContinueOnly | InitializedAgentSessionRuntimeBoth {
  return (
    runtime.capabilities.continueSession === true &&
    typeof (runtime as { continueSession?: unknown }).continueSession === "function"
  );
}

/**
 * Narrows to runtimes that advertise and implement session loading.
 */
export function supportsLoadSession(
  runtime: InitializedAgentSessionRuntime,
): runtime is InitializedAgentSessionRuntimeLoadOnly | InitializedAgentSessionRuntimeBoth {
  return (
    runtime.capabilities.loadSession === true &&
    typeof (runtime as { loadSession?: unknown }).loadSession === "function"
  );
}
