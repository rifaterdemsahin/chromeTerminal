import { execFile } from "node:child_process";
import dns from "node:dns";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
import express from "express";
import { WebSocketServer } from "ws";
import pty from "node-pty";
import {
  loadLocalProjectStates,
  saveLocalProjectStates,
  syncAndAssignUniquePorts,
  getSyncStatus,
  pushProjectStatesToAzure,
  pullProjectStatesFromAzure,
  syncProjectStates,
  openPageInChrome,
} from "./azure-sync.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 30847;
const HOST = process.env.HOST || "127.0.0.1";
const SHELL =
  process.env.SHELL ||
  (process.platform === "win32" ? "powershell.exe" : "/bin/zsh");
const TOKEN = process.env.TERMINAL_TOKEN || "";

const app = express();
app.use(express.json({ limit: "200kb" }));
app.use(express.static(path.join(__dirname, "public")));

const USER_PROMPTS_FILE = path.join(__dirname, "public", "prompts-user.json");

function readUserPrompts() {
  try {
    const data = JSON.parse(fs.readFileSync(USER_PROMPTS_FILE, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeUserPrompts(list) {
  fs.writeFileSync(USER_PROMPTS_FILE, JSON.stringify(list, null, 2) + "\n");
}

app.get("/api/prompts-user", (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  res.json({ prompts: readUserPrompts() });
});

app.post("/api/prompts-user", (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const title = String(req.body?.title || "").trim();
  const text = String(req.body?.text || "").trim();
  const emoji = String(req.body?.emoji || "💬").trim() || "💬";
  if (!title || !text) {
    res.status(400).json({ error: "title and text required" });
    return;
  }
  const list = readUserPrompts();
  const prompt = { id: "u-" + Date.now(), emoji, title, text };
  list.push(prompt);
  writeUserPrompts(list);
  res.json({ ok: true, prompt, prompts: list });
});

const PROJECTS_DIR = process.env.PROJECTS_DIR || path.join(os.homedir(), "projects");

function authorizedHttp(req) {
  if (!TOKEN) return true;
  return req.query.token === TOKEN;
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, shell: SHELL, host: HOST, port: PORT, projectsDir: PROJECTS_DIR });
});

app.get("/api/net-ping", (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.json({ ok: true, timestamp: Date.now() });
});

app.get("/api/net-dns", async (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  const testHosts = [
    { host: "google.com", label: "Google" },
    { host: "cloudflare.com", label: "Cloudflare" },
    { host: "github.com", label: "GitHub" },
    { host: "apple.com", label: "Apple" },
    { host: "wikipedia.org", label: "Wikipedia" },
  ];

  const results = await Promise.all(
    testHosts.map(async ({ host, label }) => {
      const start = performance.now();
      try {
        const addresses = await dns.promises.resolve4(host);
        const durationMs = Math.round((performance.now() - start) * 100) / 100;
        return { host, label, ok: true, durationMs, addresses: addresses.slice(0, 4) };
      } catch (err) {
        const durationMs = Math.round((performance.now() - start) * 100) / 100;
        return { host, label, ok: false, durationMs, error: err.message };
      }
    })
  );

  let systemServers = [];
  try {
    systemServers = dns.getServers();
  } catch {
    systemServers = [];
  }

  const successful = results.filter((r) => r.ok);
  const avgDnsMs =
    successful.length > 0
      ? Math.round(
          (successful.reduce((sum, r) => sum + r.durationMs, 0) / successful.length) * 10
        ) / 10
      : null;

  res.json({
    ok: true,
    servers: systemServers,
    avgDnsMs,
    results,
    timestamp: Date.now(),
  });
});

app.get("/api/net-speed", (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const requestedMb = Math.min(Math.max(Number(req.query.mb) || 2, 0.5), 10);
  const bytesCount = Math.round(requestedMb * 1024 * 1024);

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Length", bytesCount);
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  const chunkSize = 64 * 1024;
  const chunk = Buffer.alloc(chunkSize, 0x41);
  let bytesRemaining = bytesCount;

  function sendNext() {
    while (bytesRemaining > 0) {
      const toSend = Math.min(bytesRemaining, chunkSize);
      bytesRemaining -= toSend;
      const canContinue = res.write(toSend === chunkSize ? chunk : chunk.subarray(0, toSend));
      if (!canContinue) {
        res.once("drain", sendNext);
        return;
      }
    }
    res.end();
  }

  sendNext();
});

app.get("/api/check-ai", async (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  const providers = [
    {
      id: "gemini",
      name: "Google Gemini",
      host: "generativelanguage.googleapis.com",
      url: "https://generativelanguage.googleapis.com",
      icon: "✨",
      notes: "Google AI Studio & Gemini API",
    },
    {
      id: "claude",
      name: "Anthropic Claude",
      host: "api.anthropic.com",
      url: "https://api.anthropic.com",
      icon: "🎭",
      notes: "Claude Sonnet & Opus Models",
    },
    {
      id: "openai",
      name: "OpenAI",
      host: "api.openai.com",
      url: "https://api.openai.com",
      icon: "🧠",
      notes: "GPT-4o, o1, o3-mini & Realtime API",
    },
    {
      id: "grok",
      name: "xAI Grok",
      host: "api.x.ai",
      url: "https://api.x.ai",
      icon: "🤖",
      notes: "Grok 2 / Grok 3 Reasoning Models",
    },
    {
      id: "openrouter",
      name: "OpenRouter",
      host: "openrouter.ai",
      url: "https://openrouter.ai/api/v1/models",
      icon: "🔀",
      notes: "Unified LLM Gateway",
    },
    {
      id: "ollama",
      name: "Ollama (Local)",
      host: "127.0.0.1",
      url: "http://127.0.0.1:11434/api/tags",
      icon: "🦙",
      notes: "Local LLM Inference Engine",
    },
  ];

  const results = await Promise.all(
    providers.map(async (p) => {
      const start = performance.now();
      let dnsIps = [];
      try {
        if (p.host !== "127.0.0.1" && p.host !== "localhost") {
          dnsIps = await dns.promises.resolve4(p.host);
        } else {
          dnsIps = ["127.0.0.1"];
        }
      } catch (dnsErr) {
        // DNS lookup may fail if host offline
      }

      try {
        const response = await fetch(p.url, {
          method: "GET",
          signal: AbortSignal.timeout(4500),
          headers: { "User-Agent": "chromeTerminal-ai-check/1.0" },
        });
        const durationMs = Math.round((performance.now() - start) * 10) / 10;
        return {
          id: p.id,
          name: p.name,
          icon: p.icon,
          url: p.url,
          host: p.host,
          notes: p.notes,
          ok: true,
          status: response.status,
          statusText: response.statusText,
          durationMs,
          dnsIps: dnsIps.slice(0, 3),
        };
      } catch (err) {
        const durationMs = Math.round((performance.now() - start) * 10) / 10;
        return {
          id: p.id,
          name: p.name,
          icon: p.icon,
          url: p.url,
          host: p.host,
          notes: p.notes,
          ok: false,
          error: err.message || "Unreachable",
          durationMs,
          dnsIps: dnsIps.slice(0, 3),
        };
      }
    })
  );

  const reachableCount = results.filter((r) => r.ok).length;
  const avgDurationMs =
    reachableCount > 0
      ? Math.round(
          (results.filter((r) => r.ok).reduce((sum, r) => sum + r.durationMs, 0) / reachableCount) *
            10
        ) / 10
      : null;

  res.json({
    ok: true,
    timestamp: Date.now(),
    reachableCount,
    totalCount: results.length,
    avgDurationMs,
    results,
  });
});

app.get("/api/check-infra", async (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  const services = [
    {
      id: "proxmox",
      name: "Proxmox Virtual Environment",
      url: "https://proxmox.rifaterdemsahin.com",
      host: "proxmox.rifaterdemsahin.com",
      icon: "🖥️",
      notes: "Proxmox VE & Backup Remote",
    },
    {
      id: "n8n",
      name: "n8n Automation Engine",
      url: "https://n8n.rifaterdemsahin.com",
      host: "n8n.rifaterdemsahin.com",
      icon: "⚡",
      notes: "Workflow & Webhook Automation",
    },
    {
      id: "secondbrain_dash",
      name: "Second Brain Dashboard",
      url: "http://localhost:8899",
      host: "127.0.0.1",
      icon: "🧠",
      notes: "Vault Dashboard & Graph Server",
    },
    {
      id: "terminal_pty",
      name: "chromeTerminal PTY Backend",
      url: `http://localhost:${PORT}/health`,
      host: "127.0.0.1",
      icon: "💻",
      notes: "Local macOS Login Shell Daemon",
    },
  ];

  const results = await Promise.all(
    services.map(async (s) => {
      const start = performance.now();
      let dnsIps = [];
      try {
        if (s.host !== "127.0.0.1" && s.host !== "localhost") {
          dnsIps = await dns.promises.resolve4(s.host);
        } else {
          dnsIps = ["127.0.0.1"];
        }
      } catch (dnsErr) {
        // dns error
      }

      try {
        const response = await fetch(s.url, {
          method: "GET",
          signal: AbortSignal.timeout(4500),
          headers: { "User-Agent": "chromeTerminal-infra-check/1.0" },
        });
        const durationMs = Math.round((performance.now() - start) * 10) / 10;
        return {
          id: s.id,
          name: s.name,
          icon: s.icon,
          url: s.url,
          host: s.host,
          notes: s.notes,
          ok: true,
          status: response.status,
          statusText: response.statusText,
          durationMs,
          dnsIps: dnsIps.slice(0, 3),
        };
      } catch (err) {
        const durationMs = Math.round((performance.now() - start) * 10) / 10;
        return {
          id: s.id,
          name: s.name,
          icon: s.icon,
          url: s.url,
          host: s.host,
          notes: s.notes,
          ok: false,
          error: err.message || "Unreachable",
          durationMs,
          dnsIps: dnsIps.slice(0, 3),
        };
      }
    })
  );

  const onlineCount = results.filter((r) => r.ok).length;
  res.json({
    ok: true,
    timestamp: Date.now(),
    onlineCount,
    totalCount: results.length,
    results,
  });
});

app.post("/api/secondbrain/launch-dashboard", async (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const dashboardUrl = req.body?.url || "http://localhost:8899";
  const result = await openPageInChrome(dashboardUrl);
  res.json({ ok: true, url: dashboardUrl, ...result });
});

app.get("/api/projects", (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  let entries = [];
  try {
    const states = loadLocalProjectStates()?.projects || {};
    entries = fs
      .readdirSync(PROJECTS_DIR, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => {
        const full = path.join(PROJECTS_DIR, e.name);
        let mtimeMs = 0;
        try {
          mtimeMs = fs.statSync(full).mtimeMs;
        } catch {
          mtimeMs = 0;
        }
        const state = states[e.name] || {};
        return {
          name: e.name,
          path: full,
          mtimeMs,
          port: state.port || null,
          framework: state.framework || "Generic / Static",
          startCommand: state.startCommand || null,
          initialPage: state.initialPage || (state.port ? `http://localhost:${state.port}/` : null),
          agentPrompt: state.agentPrompt || null,
          pinned: state.pinned || false,
          notes: state.notes || "",
          lastRunAt: state.lastRunAt || null,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
  } catch (err) {
    res.status(500).json({ error: err.message, projectsDir: PROJECTS_DIR });
    return;
  }

  res.json({
    home: os.homedir(),
    projectsDir: PROJECTS_DIR,
    projects: entries,
    syncStatus: getSyncStatus(),
  });
});

app.get("/api/azure-sync/status", (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  res.json(getSyncStatus());
});

app.post("/api/azure-sync/sync", async (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  try {
    const result = await syncProjectStates();
    res.json(result);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message, syncStatus: getSyncStatus() });
  }
});

app.post("/api/azure-sync/pull", async (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  try {
    const result = await pullProjectStatesFromAzure();
    res.json(result);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message, syncStatus: getSyncStatus() });
  }
});

app.post("/api/azure-sync/push", async (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  try {
    const result = await pushProjectStatesToAzure();
    res.json(result);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message, syncStatus: getSyncStatus() });
  }
});

app.get("/api/project-states", (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const state = loadLocalProjectStates();
  res.json({
    ok: true,
    ...state,
    syncStatus: getSyncStatus(),
  });
});

app.post("/api/project-states/assign-ports", async (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  try {
    const autoPush = req.body?.push !== false;
    let result;
    if (autoPush) {
      result = await syncProjectStates();
    } else {
      const state = syncAndAssignUniquePorts();
      result = { ok: true, state, syncStatus: getSyncStatus() };
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post("/api/project-states/update", async (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const { name, port, startCommand, initialPage, notes, pinned } = req.body || {};
  if (!name) {
    res.status(400).json({ error: "Project name is required" });
    return;
  }

  const state = loadLocalProjectStates();
  const current = state.projects[name] || { name, path: path.join(PROJECTS_DIR, name) };

  if (port !== undefined) current.port = Number(port);
  if (startCommand !== undefined) current.startCommand = String(startCommand);
  if (initialPage !== undefined) current.initialPage = String(initialPage);
  if (notes !== undefined) current.notes = String(notes);
  if (pinned !== undefined) current.pinned = Boolean(pinned);
  current.updatedAt = new Date().toISOString();
  if (current.port) {
    current.agentPrompt = `cd "${current.path}" && ${current.startCommand || `PORT=${current.port} npm start`}; open -a "Google Chrome" "${current.initialPage || `http://localhost:${current.port}/`}"`;
  }

  state.projects[name] = current;
  saveLocalProjectStates(state);

  // Background push if possible
  pushProjectStatesToAzure().catch(() => {});

  res.json({ ok: true, project: current, syncStatus: getSyncStatus() });
});

app.post("/api/project-states/launch-agent", async (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const { name, openBrowser, agentType = "agy" } = req.body || {};
  if (!name) {
    res.status(400).json({ error: "Project name is required" });
    return;
  }

  const state = loadLocalProjectStates();
  const proj = state.projects[name];
  if (!proj) {
    res.status(404).json({ error: `Project "${name}" not found` });
    return;
  }

  const assignedPort = proj.port || 30080;
  proj.lastRunAt = new Date().toISOString();
  saveLocalProjectStates(state);

  const initialUrl = proj.initialPage || `http://localhost:${assignedPort}/`;

  // Construct structured agent prompt reminding the agent of the port mandate
  const promptInstruction = `I am working on project "${name}" in ${proj.path}.
Assigned server port: ${assignedPort} (URL: ${initialUrl}).
Server command: ${proj.startCommand || `PORT=${assignedPort} npm run dev`}
Rule Mandate: Local servers must run on port ${assignedPort} (>30,000) to prevent port collisions.
Always open pages in Google Chrome with: open -a "Google Chrome" "${initialUrl}"`;

  let browserResult = null;
  if (openBrowser) {
    browserResult = await openPageInChrome(initialUrl);
  }

  res.json({
    ok: true,
    project: proj,
    assignedPort,
    initialUrl,
    promptInstruction,
    agentType,
    browserResult,
  });
});

app.post("/api/project-states/open-page", async (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  const { url } = req.body || {};
  if (!url) {
    res.status(400).json({ error: "URL is required" });
    return;
  }
  const result = await openPageInChrome(url);
  res.json(result);
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/pty" });
const sessions = new Map();
const SESSION_TTL_MS = 30 * 60 * 1000;

async function readCwd(pid) {
  if (!pid) return "";
  if (process.platform === "darwin") {
    const { stdout } = await execFileAsync("lsof", ["-a", "-p", String(pid), "-d", "cwd", "-Fn", "-w"], {
      timeout: 1200,
    });
    const line = stdout.split("\n").find((row) => row.startsWith("n"));
    return line ? line.slice(1) : "";
  }
  try {
    return fs.readlinkSync(`/proc/${pid}/cwd`);
  } catch {
    return "";
  }
}

function emitCwd(session) {
  const live = session.ws;
  if (!live || live.readyState !== live.OPEN) return;
  live.send(
    JSON.stringify({
      type: "cwd",
      path: session.lastCwd || "",
      home: os.homedir(),
    })
  );
}

function startCwdWatch(session) {
  if (session.cwdTimer) return;
  const tick = async () => {
    try {
      const cwd = await readCwd(session.pty?.pid);
      if (cwd && cwd !== session.lastCwd) {
        session.lastCwd = cwd;
        emitCwd(session);
      }
    } catch {
      // lsof miss
    }
  };
  tick();
  session.cwdTimer = setInterval(tick, 1200);
}

function stopCwdWatch(session) {
  if (session.cwdTimer) {
    clearInterval(session.cwdTimer);
    session.cwdTimer = null;
  }
}

function authorized(req) {
  if (!TOKEN) return true;
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    return url.searchParams.get("token") === TOKEN;
  } catch {
    return false;
  }
}

function spawnSession() {
  const id = crypto.randomUUID();
  const ptyProcess = pty.spawn(SHELL, ["-l"], {
    name: "xterm-256color",
    cols: 120,
    rows: 36,
    cwd: os.homedir(),
    env: {
      ...process.env,
      TERM: "xterm-256color",
      COLORTERM: "truecolor",
    },
  });

  const session = {
    id,
    pty: ptyProcess,
    ws: null,
    killTimer: null,
    cwdTimer: null,
    lastCwd: os.homedir(),
    startedAt: Date.now(),
  };
  ptyProcess.onData((data) => {
    const live = session.ws;
    if (live && live.readyState === live.OPEN) {
      live.send(JSON.stringify({ type: "output", data }));
    }
  });
  ptyProcess.onExit(({ exitCode, signal }) => {
    const live = session.ws;
    sessions.delete(id);
    stopCwdWatch(session);
    if (session.killTimer) clearTimeout(session.killTimer);
    if (live && live.readyState === live.OPEN) {
      live.send(JSON.stringify({ type: "exit", exitCode, signal }));
      live.close();
    }
  });
  sessions.set(id, session);
  return session;
}

function attachSocket(session, ws) {
  if (session.killTimer) {
    clearTimeout(session.killTimer);
    session.killTimer = null;
  }
  if (session.ws && session.ws !== ws) {
    try {
      session.ws.close();
    } catch {
      // replaced
    }
  }
  session.ws = ws;
  if (!session.startedAt) session.startedAt = Date.now();
  if (ws.readyState === ws.OPEN) {
    ws.send(
      JSON.stringify({
        type: "session",
        id: session.id,
        home: os.homedir(),
        startedAt: session.startedAt,
      })
    );
    emitCwd(session);
  }
  startCwdWatch(session);
}

function parkSession(session) {
  stopCwdWatch(session);
  session.ws = null;
  if (session.killTimer) clearTimeout(session.killTimer);
  session.killTimer = setTimeout(() => {
    sessions.delete(session.id);
    try {
      session.pty.kill();
    } catch {
      // already gone
    }
  }, SESSION_TTL_MS);
}

wss.on("connection", (ws, req) => {
  if (!authorized(req)) {
    ws.close(4401, "unauthorized");
    return;
  }

  let url;
  try {
    url = new URL(req.url, `http://${req.headers.host}`);
  } catch {
    ws.close();
    return;
  }

  const resumeId = url.searchParams.get("session");
  let session = resumeId ? sessions.get(resumeId) : null;

  try {
    if (!session) session = spawnSession();
  } catch (err) {
    const message = `failed to start shell: ${err.message}\r\n`;
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: "output", data: `\x1b[31m${message}\x1b[0m` }));
      ws.close();
    }
    console.error(err);
    return;
  }

  attachSocket(session, ws);

  ws.on("message", (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      return;
    }

    if (msg.type === "ping") {
      if (ws.readyState === ws.OPEN) ws.send(JSON.stringify({ type: "pong" }));
      return;
    }

    if (msg.type === "input" && typeof msg.data === "string") {
      session.pty.write(msg.data);
    } else if (msg.type === "resize") {
      const cols = Number(msg.cols);
      const rows = Number(msg.rows);
      if (cols >= 20 && rows >= 5) session.pty.resize(cols, rows);
    }
  });

  ws.on("close", () => {
    if (session.ws === ws) parkSession(session);
  });
});

server.on("error", (err) => {
  console.error("listen failed:", err.message);
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  const url = `http://${HOST}:${PORT}`;
  console.log(`chromeTerminal listening on ${url}`);
  console.log(`shell: ${SHELL}`);
  if (TOKEN) console.log("auth: TERMINAL_TOKEN is required as ?token=");
  else console.log("auth: none (localhost only — do not bind 0.0.0.0 without a token)");
});
