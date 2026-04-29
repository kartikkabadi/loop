export function ghCliEnv(overrides: NodeJS.ProcessEnv = {}): NodeJS.ProcessEnv {
  return withoutColor({ ...process.env, ...overrides });
}

export function repairGhEnv(overrides: NodeJS.ProcessEnv = {}): NodeJS.ProcessEnv {
  return ghCliEnv(overrides);
}

export function codexSubprocessEnv(): NodeJS.ProcessEnv {
  const env = { ...process.env };
  delete env.GH_TOKEN;
  delete env.GITHUB_TOKEN;
  for (const key of Object.keys(env)) {
    if (/^CLAWSWEEPER_.*GH_TOKEN$/.test(key)) delete env[key];
  }
  if (process.env.GITHUB_ACTIONS === "true") {
    delete env.OPENAI_API_KEY;
  }
  return withoutColor(env);
}

function withoutColor(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  env.NO_COLOR = "1";
  env.CLICOLOR = "0";
  delete env.FORCE_COLOR;
  return env;
}
