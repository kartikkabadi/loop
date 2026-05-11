const ACTIVE_RUN_STATUSES = new Set(["queued", "in_progress", "waiting", "requested", "pending"]);
const TERMINAL_BAD_CONCLUSIONS = new Set(["failure", "timed_out", "action_required"]);
const EVENT_LIMIT = 200;
const AVERAGE_LIMIT = 8;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.hostname.includes("-ingest.") && url.pathname !== "/api/events" && url.pathname !== "/api/health") {
      return json({ error: "not_found" }, 404);
    }
    if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
    if (url.pathname === "/api/health") return json({ ok: true, service: "clawsweeper-status" });
    if (url.pathname === "/api/events" && request.method === "POST") return ingestEvent(request, env);
    if (url.pathname === "/api/status") return json(await statusSnapshot(env, ctx));
    if (url.pathname === "/" || url.pathname === "/index.html") return html(dashboardHtml());
    return json({ error: "not_found" }, 404);
  },
};

async function ingestEvent(request, env) {
  const token = bearerToken(request);
  if (!env.INGEST_TOKEN || token !== env.INGEST_TOKEN) return json({ error: "unauthorized" }, 401);
  if (!env.STATUS_STORE) return json({ error: "STATUS_STORE is not configured" }, 500);
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return json({ error: "invalid_json" }, 400);
  const event = normalizeEvent(body);
  const current = await readEvents(env);
  const events = [event, ...current].slice(0, EVENT_LIMIT);
  await env.STATUS_STORE.put("events", JSON.stringify(events));
  await env.STATUS_STORE.put("latest-event", JSON.stringify(event));
  return json({ ok: true, event });
}

async function statusSnapshot(env, ctx) {
  const ttl = numberFrom(env.CACHE_TTL_SECONDS, 20);
  const cached = await readCachedSnapshot(env, ttl);
  if (cached) return cached;

  const generatedAt = new Date().toISOString();
  const errors = [];
  const repo = env.CLAWSWEEPER_REPO || "openclaw/clawsweeper";
  const targetRepos = String(env.TARGET_REPOS || "openclaw/openclaw").split(",").map((value) => value.trim()).filter(Boolean);
  const budget = numberFrom(env.WORKER_BUDGET, 80);
  const runs = await githubJson(env, `/repos/${repo}/actions/runs?per_page=100`).catch((error) => {
    errors.push(`workflow runs: ${error.message}`);
    return null;
  });
  const workflowRuns = Array.isArray(runs?.workflow_runs) ? runs.workflow_runs : [];
  const activeRuns = workflowRuns.filter((run) => ACTIVE_RUN_STATUSES.has(String(run.status)));
  const failedRuns = workflowRuns.filter(
    (run) => run.status === "completed" && TERMINAL_BAD_CONCLUSIONS.has(String(run.conclusion)),
  );
  const activeJobs = await estimateActiveCodexJobs(env, repo, activeRuns.slice(0, 16));
  errors.push(...activeJobs.errors);
  const pipeline = await pipelineItems(env, activeRuns.slice(0, 30));
  const automerge = await recentAutomerge(env, targetRepos[0] || "openclaw/openclaw").catch((error) => {
    errors.push(`automerge timing: ${error.message}`);
    return { average_ms: null, samples: 0, items: [] };
  });
  const events = await readEvents(env);

  const snapshot = {
    schema_version: 1,
    generated_at: generatedAt,
    source: {
      clawsweeper_repo: repo,
      target_repositories: targetRepos,
    },
    fleet: {
      worker_budget: budget,
      active_workflow_runs: activeRuns.length,
      queued_workflow_runs: activeRuns.filter((run) => run.status !== "in_progress").length,
      active_codex_jobs: activeJobs.count,
      failed_recent_runs: failedRuns.length,
      budget_used_percent: budget > 0 ? Math.round((activeJobs.count / budget) * 100) : 0,
    },
    averages: {
      automerge_command_to_merge_ms: automerge.average_ms,
      automerge_samples: automerge.samples,
    },
    pipeline,
    recent: {
      automerge: automerge.items,
      events: events.slice(0, 25),
      failed_runs: failedRuns.slice(0, 10).map((run) => workflowRunSummary(run)),
    },
    diagnostics: {
      active_job_sample: activeJobs.sample,
      github_rate: activeJobs.rate,
      errors: errors.slice(0, 20),
    },
  };
  if (env.STATUS_STORE) {
    ctx?.waitUntil?.(env.STATUS_STORE.put("snapshot", JSON.stringify(snapshot)));
  }
  return snapshot;
}

async function estimateActiveCodexJobs(env, repo, runs) {
  let count = 0;
  const sample = [];
  const errors = [];
  let rate = null;
  for (const run of runs) {
    const jobs = await githubJson(env, `/repos/${repo}/actions/runs/${run.id}/jobs?per_page=100`).catch((error) => {
      errors.push(`jobs for run ${run.id}: ${error.message}`);
      return null;
    });
    rate = jobs?.rate ?? rate;
    const active = Array.isArray(jobs?.jobs)
      ? jobs.jobs.filter((job) => ACTIVE_RUN_STATUSES.has(String(job.status)) && codexJobName(String(job.name || "")))
      : [];
    count += active.length;
    for (const job of active.slice(0, 8)) {
      sample.push({
        run_url: run.html_url,
        run_title: run.display_title || run.name,
        job: job.name,
        status: job.status,
        started_at: job.started_at,
      });
    }
  }
  return { count, sample: sample.slice(0, 25), rate, errors };
}

async function pipelineItems(env, runs) {
  const items = [];
  const prCandidates = [];
  for (const run of runs) {
    const item = classifyRun(run);
    if (item.item_number && item.repository) prCandidates.push(item);
    items.push(item);
  }
  await Promise.all(prCandidates.slice(0, 8).map((item) => attachCiStatus(env, item)));
  return items.sort((left, right) => laneRank(left.mode) - laneRank(right.mode) || Date.parse(right.started_at || "") - Date.parse(left.started_at || ""));
}

function classifyRun(run) {
  const title = String(run.display_title || run.name || "");
  const workflow = String(run.name || "");
  const extracted = title.match(/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)#(\d+)/);
  const lower = `${workflow} ${title}`.toLowerCase();
  let mode = "background-review";
  let stage = "running";
  if (lower.includes("automerge")) {
    mode = "automerge";
    stage = lower.includes("repair") ? "repairing" : "reviewing";
  } else if (lower.includes("repair cluster")) {
    mode = "repair";
    stage = "repairing";
  } else if (lower.includes("review event item")) {
    mode = "exact-review";
    stage = "reviewing";
  } else if (lower.includes("apply clawsweeper closures")) {
    mode = "apply";
    stage = "closing";
  } else if (lower.includes("commit review")) {
    mode = "commit-review";
    stage = "reviewing";
  } else if (lower.includes("hot")) {
    mode = "hot-review";
    stage = "reviewing";
  }
  return {
    id: run.id,
    mode,
    stage,
    status: run.status,
    conclusion: run.conclusion,
    repository: extracted?.[1] || null,
    item_number: extracted?.[2] ? Number(extracted[2]) : null,
    title,
    workflow,
    run_url: run.html_url,
    started_at: run.created_at,
    updated_at: run.updated_at,
    elapsed_ms: Date.now() - Date.parse(run.created_at || new Date().toISOString()),
    ci: null,
  };
}

async function attachCiStatus(env, item) {
  try {
    const pr = await githubJson(env, `/repos/${item.repository}/pulls/${item.item_number}`);
    if (!pr?.head?.sha) return;
    const checks = await githubJson(env, `/repos/${item.repository}/commits/${pr.head.sha}/check-runs?per_page=100`);
    const runs = Array.isArray(checks?.check_runs) ? checks.check_runs : [];
    const failing = runs.filter((check) => check.status === "completed" && !["success", "neutral", "skipped"].includes(String(check.conclusion)));
    const pending = runs.filter((check) => check.status !== "completed");
    item.ci = {
      state: failing.length ? "red" : pending.length ? "pending" : "green",
      head_sha: pr.head.sha,
      total: runs.length,
      failing: failing.length,
      pending: pending.length,
    };
  } catch (error) {
    item.ci = { state: "unknown", error: String(error?.message || error) };
  }
}

async function recentAutomerge(env, repo) {
  const search = await githubJson(
    env,
    `/search/issues?q=${encodeURIComponent(`repo:${repo} is:pr is:merged label:clawsweeper:automerge sort:updated-desc`)}&per_page=${AVERAGE_LIMIT}`,
  );
  const items = [];
  for (const issue of Array.isArray(search?.items) ? search.items : []) {
    const number = issue.number;
    const [pr, comments] = await Promise.all([
      githubJson(env, `/repos/${repo}/pulls/${number}`),
      githubJson(env, `/repos/${repo}/issues/${number}/comments?per_page=100`),
    ]);
    const commandAt = firstAutomergeCommandAt(comments);
    const mergedAt = pr?.merged_at || null;
    const durationMs = commandAt && mergedAt ? Date.parse(mergedAt) - Date.parse(commandAt) : null;
    items.push({
      url: issue.html_url,
      title: issue.title,
      number,
      command_at: commandAt,
      merged_at: mergedAt,
      duration_ms: durationMs,
      merge_commit_sha: pr?.merge_commit_sha || null,
    });
  }
  const durations = items.map((item) => item.duration_ms).filter((value) => Number.isFinite(value) && value >= 0);
  return {
    average_ms: durations.length ? Math.round(durations.reduce((sum, value) => sum + value, 0) / durations.length) : null,
    samples: durations.length,
    items,
  };
}

function firstAutomergeCommandAt(comments) {
  if (!Array.isArray(comments)) return null;
  const command = comments.find((comment) => /@clawsweeper\s+auto\s*-?\s*merge|@clawsweeper\s+automerge|\/clawsweeper\s+auto\s*-?\s*merge|\/clawsweeper\s+automerge/i.test(String(comment.body || "")));
  return command?.created_at || null;
}

async function readCachedSnapshot(env, ttlSeconds) {
  if (!env.STATUS_STORE) return null;
  const text = await env.STATUS_STORE.get("snapshot");
  if (!text) return null;
  const snapshot = JSON.parse(text);
  if (Date.now() - Date.parse(snapshot.generated_at || "") > ttlSeconds * 1000) return null;
  return snapshot;
}

async function readEvents(env) {
  if (!env.STATUS_STORE) return [];
  const text = await env.STATUS_STORE.get("events");
  if (!text) return [];
  const parsed = JSON.parse(text);
  return Array.isArray(parsed) ? parsed : [];
}

async function githubJson(env, path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "openclaw-clawsweeper-status",
      ...(env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}),
    },
  });
  if (!response.ok) throw new Error(`GitHub ${response.status} for ${path}`);
  return response.json();
}

function normalizeEvent(body) {
  return {
    id: crypto.randomUUID(),
    received_at: new Date().toISOString(),
    event_type: stringField(body.event_type, "status.event"),
    mode: stringField(body.mode, "unknown"),
    stage: stringField(body.stage, "unknown"),
    status: stringField(body.status, "unknown"),
    repository: nullableString(body.repository),
    item_url: nullableString(body.item_url),
    run_url: nullableString(body.run_url),
    title: nullableString(body.title),
    duration_ms: numberOrNull(body.duration_ms),
    note: nullableString(body.note),
  };
}

function workflowRunSummary(run) {
  return {
    id: run.id,
    workflow: run.name,
    title: run.display_title || run.name,
    status: run.status,
    conclusion: run.conclusion,
    url: run.html_url,
    started_at: run.created_at,
    updated_at: run.updated_at,
  };
}

function codexJobName(name) {
  return /review|codex|repair|worker|commit/i.test(name);
}

function laneRank(mode) {
  return {
    automerge: 0,
    repair: 1,
    "exact-review": 2,
    "hot-review": 3,
    apply: 4,
    "commit-review": 5,
    "background-review": 6,
  }[mode] ?? 9;
}

function bearerToken(request) {
  const header = request.headers.get("authorization") || "";
  return header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
}

function stringField(value, fallback) {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function nullableString(value) {
  const text = String(value ?? "").trim();
  return text || null;
}

function numberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function numberFrom(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function json(value, status = 200) {
  return cors(
    new Response(JSON.stringify(value, null, 2), {
      status,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    }),
  );
}

function html(value) {
  return new Response(value, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=30",
    },
  });
}

function cors(response) {
  response.headers.set("access-control-allow-origin", "*");
  response.headers.set("access-control-allow-methods", "GET,POST,OPTIONS");
  response.headers.set("access-control-allow-headers", "authorization,content-type");
  return response;
}

function dashboardHtml() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ClawSweeper Live</title>
<style>
:root {
  color-scheme: dark;
  --bg: #090d13;
  --panel: #111821;
  --panel-2: #151f2b;
  --line: #2a3646;
  --text: #e7edf5;
  --muted: #9aa8ba;
  --blue: #67b7ff;
  --green: #4ed891;
  --amber: #f3b759;
  --red: #f46d75;
  --violet: #b99cff;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text); font: 14px/1.45 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; letter-spacing: 0; }
main { width: min(1440px, calc(100vw - 32px)); margin: 0 auto; padding: 24px 0 48px; }
header { display: flex; align-items: end; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
h1 { margin: 0; font-size: 28px; line-height: 1.1; letter-spacing: 0; }
h2 { margin: 28px 0 10px; font-size: 16px; }
.muted { color: var(--muted); }
.grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; }
.metric { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 12px; min-height: 84px; }
.metric strong { display: block; font-size: 26px; line-height: 1.1; margin-top: 8px; }
.metric span { color: var(--muted); font-size: 12px; text-transform: uppercase; }
.band { height: 6px; margin-top: 10px; background: #1f2a36; border-radius: 999px; overflow: hidden; }
.band > i { display: block; height: 100%; background: var(--blue); width: 0; }
table { width: 100%; border-collapse: collapse; background: var(--panel); border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
th, td { padding: 9px 10px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
th { color: var(--muted); font-size: 12px; text-transform: uppercase; background: #0d131b; }
tr:last-child td { border-bottom: 0; }
a { color: var(--blue); text-decoration: none; }
a:hover { text-decoration: underline; }
.pill { display: inline-flex; align-items: center; gap: 6px; min-height: 22px; padding: 2px 8px; border-radius: 999px; background: #202c3a; color: var(--text); font-size: 12px; white-space: nowrap; }
.green { color: var(--green); }
.amber { color: var(--amber); }
.red { color: var(--red); }
.violet { color: var(--violet); }
.split { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(320px, .7fr); gap: 16px; }
.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; }
.empty { padding: 18px; color: var(--muted); background: var(--panel); border: 1px solid var(--line); border-radius: 8px; }
@media (max-width: 1000px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .split { grid-template-columns: 1fr; } header { align-items: start; flex-direction: column; } }
@media (max-width: 560px) { main { width: min(100vw - 20px, 1440px); padding-top: 16px; } .grid { grid-template-columns: 1fr; } th:nth-child(4), td:nth-child(4), th:nth-child(6), td:nth-child(6) { display: none; } }
</style>
</head>
<body>
<main>
  <header>
    <div>
      <h1>ClawSweeper Live</h1>
      <div class="muted" id="subtitle">Loading pipeline state...</div>
    </div>
    <div class="muted mono" id="updated"></div>
  </header>
  <section class="grid" id="metrics"></section>
  <section class="split">
    <div>
      <h2>Pipeline</h2>
      <div id="pipeline"></div>
    </div>
    <div>
      <h2>Automerge Timing</h2>
      <div id="automerge"></div>
      <h2>Recent Events</h2>
      <div id="events"></div>
    </div>
  </section>
</main>
<script>
const fmt = new Intl.NumberFormat();
const rel = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
function elapsed(ms) {
  if (!Number.isFinite(ms)) return "unknown";
  const s = Math.round(ms / 1000);
  if (s < 90) return s + "s";
  const m = Math.round(s / 60);
  if (m < 90) return m + "m";
  return Math.round(m / 60) + "h";
}
function since(iso) {
  const diff = Date.parse(iso) - Date.now();
  const minutes = Math.round(diff / 60000);
  if (Math.abs(minutes) < 90) return rel.format(minutes, "minute");
  return rel.format(Math.round(minutes / 60), "hour");
}
function esc(value) {
  return String(value ?? "").replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
}
function link(url, label) {
  return url ? '<a href="' + esc(url) + '">' + esc(label || url) + '</a>' : esc(label || "");
}
function metric(label, value, sub, pct, color) {
  return '<div class="metric"><span>' + esc(label) + '</span><strong>' + esc(value) + '</strong><div class="muted">' + esc(sub || "") + '</div><div class="band"><i style="width:' + Math.max(0, Math.min(100, pct || 0)) + '%;background:' + (color || "var(--blue)") + '"></i></div></div>';
}
function ciBadge(ci) {
  if (!ci) return '<span class="pill">ci unknown</span>';
  const cls = ci.state === "green" ? "green" : ci.state === "red" ? "red" : ci.state === "pending" ? "amber" : "";
  return '<span class="pill ' + cls + '">' + esc(ci.state) + ' ' + esc(ci.failing || 0) + '/' + esc(ci.pending || 0) + '/' + esc(ci.total || 0) + '</span>';
}
async function load() {
  const response = await fetch("/api/status", { cache: "no-store" });
  const data = await response.json();
  document.getElementById("subtitle").textContent = data.source.target_repositories.join(", ");
  document.getElementById("updated").textContent = "Updated " + since(data.generated_at);
  const fleet = data.fleet;
  document.getElementById("metrics").innerHTML = [
    metric("Active Codex", fmt.format(fleet.active_codex_jobs), "budget " + fleet.worker_budget, fleet.budget_used_percent, "var(--green)"),
    metric("Workflow Runs", fmt.format(fleet.active_workflow_runs), "active", Math.min(100, fleet.active_workflow_runs * 3), "var(--blue)"),
    metric("Queued", fmt.format(fleet.queued_workflow_runs), "waiting/requested", Math.min(100, fleet.queued_workflow_runs * 10), "var(--amber)"),
    metric("Recent Failures", fmt.format(fleet.failed_recent_runs), "last fetched page", Math.min(100, fleet.failed_recent_runs * 15), fleet.failed_recent_runs ? "var(--red)" : "var(--green)"),
    metric("Automerge Avg", data.averages.automerge_command_to_merge_ms ? elapsed(data.averages.automerge_command_to_merge_ms) : "n/a", data.averages.automerge_samples + " samples", 60, "var(--violet)"),
    metric("Budget Used", fleet.budget_used_percent + "%", "estimated", fleet.budget_used_percent, "var(--green)")
  ].join("");
  renderPipeline(data.pipeline || []);
  renderAutomerge(data.recent.automerge || []);
  renderEvents(data.recent.events || []);
}
function renderPipeline(rows) {
  if (!rows.length) {
    document.getElementById("pipeline").innerHTML = '<div class="empty">No active pipeline rows.</div>';
    return;
  }
  document.getElementById("pipeline").innerHTML = '<table><thead><tr><th>Mode</th><th>Item</th><th>Stage</th><th>CI</th><th>Elapsed</th><th>Run</th></tr></thead><tbody>' + rows.map(row => {
    const item = row.repository && row.item_number ? link("https://github.com/" + row.repository + "/pull/" + row.item_number, row.repository + "#" + row.item_number) : esc(row.title);
    return '<tr><td><span class="pill">' + esc(row.mode) + '</span></td><td>' + item + '<div class="muted">' + esc(row.title) + '</div></td><td>' + esc(row.stage) + '<div class="muted">' + esc(row.status) + '</div></td><td>' + ciBadge(row.ci) + '</td><td>' + elapsed(row.elapsed_ms) + '</td><td>' + link(row.run_url, "run") + '</td></tr>';
  }).join("") + '</tbody></table>';
}
function renderAutomerge(rows) {
  if (!rows.length) {
    document.getElementById("automerge").innerHTML = '<div class="empty">No recent automerge samples.</div>';
    return;
  }
  document.getElementById("automerge").innerHTML = '<table><thead><tr><th>PR</th><th>Duration</th><th>Merged</th></tr></thead><tbody>' + rows.map(row => '<tr><td>' + link(row.url, "#" + row.number) + '<div class="muted">' + esc(row.title) + '</div></td><td>' + (row.duration_ms ? elapsed(row.duration_ms) : "unknown") + '</td><td>' + (row.merged_at ? since(row.merged_at) : "") + '</td></tr>').join("") + '</tbody></table>';
}
function renderEvents(rows) {
  if (!rows.length) {
    document.getElementById("events").innerHTML = '<div class="empty">No explicit status events received yet.</div>';
    return;
  }
  document.getElementById("events").innerHTML = '<table><thead><tr><th>Stage</th><th>Status</th><th>When</th></tr></thead><tbody>' + rows.map(row => '<tr><td>' + esc(row.mode) + " / " + esc(row.stage) + '<div class="muted">' + (row.item_url ? link(row.item_url, row.title || row.item_url) : esc(row.title || row.event_type)) + '</div></td><td>' + esc(row.status) + '</td><td>' + since(row.received_at) + '</td></tr>').join("") + '</tbody></table>';
}
load().catch(error => {
  document.getElementById("subtitle").textContent = "Failed to load status: " + error.message;
});
setInterval(load, 15000);
</script>
</body>
</html>`;
}
