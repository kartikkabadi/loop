import { isJsonObject } from "./json-types.js";

export type OpenClawHookConfig = {
  hookUrl: string;
  token: string;
  agentId: string;
  channel: string;
  discordTarget: string;
  thinking: string;
  timeoutSeconds: number;
};

export type OpenClawHookPost = {
  name: string;
  message: string;
  idempotencyKey: string;
  deliver: boolean;
};

export type OpenClawHookPostResult = {
  runId: string | null;
};

const DEFAULT_AGENT_ID = "clawsweeper";
const DEFAULT_CHANNEL = "discord";
const DEFAULT_THINKING = "low";
const DEFAULT_TIMEOUT_SECONDS = 60;

export function resolveOpenClawHookConfig(env: NodeJS.ProcessEnv): OpenClawHookConfig | null {
  const hookUrl = normalizeString(env.CLAWSWEEPER_OPENCLAW_HOOK_URL);
  const token = normalizeString(env.CLAWSWEEPER_OPENCLAW_HOOK_TOKEN);
  const discordTarget = normalizeString(env.CLAWSWEEPER_DISCORD_TARGET);
  if (!hookUrl || !token || !discordTarget) return null;
  return {
    hookUrl: resolveHookAgentUrl(hookUrl),
    token,
    agentId: normalizeString(env.CLAWSWEEPER_OPENCLAW_AGENT_ID) ?? DEFAULT_AGENT_ID,
    channel: normalizeString(env.CLAWSWEEPER_OPENCLAW_HOOK_CHANNEL) ?? DEFAULT_CHANNEL,
    discordTarget,
    thinking: normalizeString(env.CLAWSWEEPER_OPENCLAW_HOOK_THINKING) ?? DEFAULT_THINKING,
    timeoutSeconds: positiveInt(
      env.CLAWSWEEPER_OPENCLAW_HOOK_TIMEOUT_SECONDS,
      DEFAULT_TIMEOUT_SECONDS,
    ),
  };
}

export function resolveHookAgentUrl(raw: string): string {
  const url = new URL(raw);
  const trimmed = url.pathname.replace(/\/+$/, "");
  if (trimmed.endsWith("/agent")) {
    url.pathname = trimmed;
  } else {
    url.pathname = `${trimmed || ""}/agent`;
  }
  return url.toString();
}

export async function postOpenClawAgentHook({
  config,
  fetcher,
  post,
}: {
  config: OpenClawHookConfig;
  fetcher: typeof fetch;
  post: OpenClawHookPost;
}): Promise<OpenClawHookPostResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), (config.timeoutSeconds + 15) * 1000);
  try {
    const response = await fetcher(config.hookUrl, {
      method: "POST",
      signal: controller.signal,
      headers: {
        authorization: `Bearer ${config.token}`,
        "content-type": "application/json",
        "idempotency-key": post.idempotencyKey,
      },
      body: JSON.stringify({
        name: post.name,
        agentId: config.agentId,
        deliver: post.deliver,
        channel: config.channel,
        to: config.discordTarget,
        idempotencyKey: post.idempotencyKey,
        thinking: config.thinking,
        timeoutSeconds: config.timeoutSeconds,
        message: post.message,
      }),
    });
    const body = await response.text();
    if (!response.ok) {
      throw new Error(`OpenClaw hook returned ${response.status}: ${body.slice(0, 500)}`);
    }
    return { runId: readHookRunId(body) };
  } finally {
    clearTimeout(timeout);
  }
}

export function readHookRunId(body: string): string | null {
  try {
    const parsed = JSON.parse(body);
    if (!isJsonObject(parsed)) return null;
    return stringOrNull(parsed.runId) ?? stringOrNull(parsed.run_id);
  } catch {
    return null;
  }
}

export function positiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function boolEnv(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  if (/^(1|true|yes|on)$/i.test(value)) return true;
  if (/^(0|false|no|off)$/i.test(value)) return false;
  return fallback;
}

export function stringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function stringArg(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function normalizeString(value: string | undefined): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
