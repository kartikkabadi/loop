/**
 * Transitional Codex-specific process adapter.
 *
 * Routes existing call sites through app-server selection + runCodexProcess
 * without changing argv, env scrubbing, timeouts, or result semantics.
 * Not an AgentSessionRuntime implementation.
 */
import {
  codexAppServerProcessOptionsFromEnv,
  runCodexProcess,
  type CodexAppServerProcessOptions,
  type CodexProcessResult,
} from "./codex-process.js";

export type CodexProcessAdapterSelection =
  | Readonly<{ kind: "process" }>
  | Readonly<{
      kind: "app-server";
      appServer: CodexAppServerProcessOptions;
    }>;

export type CodexProcessAdapterOptions = Omit<Parameters<typeof runCodexProcess>[0], "appServer"> &
  Readonly<{
    label: string;
  }>;

export function selectCodexProcessAdapter(
  input: Readonly<{
    label: string;
    env: NodeJS.ProcessEnv;
  }>,
): CodexProcessAdapterSelection {
  const appServer = codexAppServerProcessOptionsFromEnv(input.label, input.env);
  if (!appServer) return { kind: "process" };
  return { kind: "app-server", appServer };
}

export function runCodexProcessAdapter(
  options: CodexProcessAdapterOptions,
  selection?: CodexProcessAdapterSelection,
): CodexProcessResult {
  const resolved =
    selection ??
    selectCodexProcessAdapter({
      label: options.label,
      env: options.env,
    });
  const { label: _label, ...forward } = options;
  if (resolved.kind === "app-server") {
    return runCodexProcess({ ...forward, appServer: resolved.appServer });
  }
  return runCodexProcess(forward);
}
