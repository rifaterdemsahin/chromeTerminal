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

function shQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function stripAnsi(input) {
  return String(input)
    .replace(/\x1B\][^\x07\x1B]*(?:\x07|\x1B\\)/g, "") // OSC sequences
    .replace(/\x1B\[[0-9;?]*[a-zA-Z]/g, "") // CSI sequences
    .replace(/\x1B[()][A-Za-z0-9]/g, "") // charset select
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ""); // other control chars (keep \n \t)
}

const HELLO_PROMPT = "Hello, are you working? Reply in one short line.";

const HELLO_FAILURE_PATTERNS =
  /command not found|no such file or directory|not recognized as an internal|is not recognized|could not connect|connection refused|econnrefused|enoent\b|permission denied|error:|failed to|unauthorized|authentication (failed|error)|invalid api key|api key not (found|set)|traceback \(most recent/i;

// mode "prompt": one-shot non-interactive CLI invocations that answer and exit on their own.
// mode "observe": interactive/agentic TUIs — launched for real (same command the Run buttons use)
// but never fed further keystrokes, so a background health-check can never trigger autonomous
// file edits even with an accept-edits/skip-permissions flag baked into the launch command.
const HELLO_TEST_TOOLS = [
  {
    id: "agy",
    name: "Antigravity CLI (agy)",
    bin: "agy",
    icon: "✨",
    mode: "observe",
    cmd: "agy --effort medium --mode accept-edits",
  },
  {
    id: "claude",
    name: "Claude Code (claude)",
    bin: "claude",
    icon: "🎭",
    mode: "prompt",
    cmd: `claude --model sonnet -p ${shQuote(HELLO_PROMPT)}`,
  },
  {
    id: "grok",
    name: "xAI Grok (grok)",
    bin: "grok",
    icon: "🤖",
    mode: "observe",
    cmd: "grok --effort medium --permission-mode acceptEdits",
  },
  {
    id: "deepseek",
    name: "DeepSeek (kilo)",
    bin: "kilo",
    icon: "🐋",
    mode: "observe",
    cmd: "kilo",
  },
  {
    id: "gemini",
    name: "Google Gemini CLI (gemini)",
    bin: "gemini",
    icon: "🌟",
    mode: "prompt",
    cmd: `gemini -p ${shQuote(HELLO_PROMPT)}`,
  },
  {
    id: "ollama",
    name: "Ollama Local (ollama)",
    bin: "ollama",
    icon: "🦙",
    mode: "prompt",
    cmd: `ollama run llama3 ${shQuote("Hello")}`,
  },
];

// Opens a real background PTY terminal (same login shell the visible tab uses), types the
// tool's actual launch command into it, lets it run untouched for a window, then kills it —
// so "working" reflects the tool's real startup/response output, not just `--version`.
function runHelloBgTest(tool, customEnv) {
  return new Promise((resolve) => {
    const start = performance.now();
    let output = "";
    let ptyProcess;

    try {
      ptyProcess = pty.spawn(SHELL, ["-l"], {
        name: "xterm-color",
        cols: 100,
        rows: 30,
        cwd: os.homedir(),
        env: customEnv,
      });
    } catch (err) {
      resolve({
        id: tool.id,
        name: tool.name,
        icon: tool.icon,
        bin: tool.bin,
        helloCmd: tool.cmd,
        working: false,
        statusText: "Spawn failed ❌",
        durationMs: 0,
        error: err.message,
        output: "",
      });
      return;
    }

    ptyProcess.onData((data) => {
      output += data;
      if (output.length > 20000) output = output.slice(-20000);
    });

    const runDelay = 400;
    const windowMs = tool.mode === "prompt" ? 12000 : 7000;
    let settled = false;

    const settle = (killFirst) => {
      if (settled) return;
      settled = true;
      clearTimeout(runTimer);
      clearTimeout(finishTimer);
      const durationMs = Math.round(performance.now() - start);
      if (killFirst) {
        try {
          ptyProcess.write("\x03");
        } catch {
          /* already exited */
        }
        try {
          ptyProcess.kill();
        } catch {
          /* already gone */
        }
      }

      const clean = stripAnsi(output).trim();
      const looksFailed = HELLO_FAILURE_PATTERNS.test(clean);
      const working = !looksFailed && clean.length > 60;

      resolve({
        id: tool.id,
        name: tool.name,
        icon: tool.icon,
        bin: tool.bin,
        helloCmd: tool.cmd,
        working,
        statusText: working ? "Working ✅" : looksFailed ? "Error / not installed ❌" : "No response ❌",
        durationMs,
        output: clean.slice(-1200),
      });
    };

    const runTimer = setTimeout(() => {
      try {
        ptyProcess.write(`${tool.cmd}\r`);
      } catch {
        /* pty may already be gone */
      }
    }, runDelay);

    // Command finished (or the shell died) before the window elapsed — resolve early, no kill needed.
    ptyProcess.onExit(() => settle(false));

    const finishTimer = setTimeout(() => settle(true), runDelay + windowMs);
  });
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

  // 1. Local AI CLI Tools Load & Version Diagnostic
  const customEnv = {
    ...process.env,
    PATH: `${process.env.PATH || ""}:${os.homedir()}/.nvm/versions/node/v22.22.0/bin:${os.homedir()}/.local/bin:${os.homedir()}/.grok/bin:/opt/homebrew/bin:/usr/local/bin`,
  };

  const cliTools = [
    {
      id: "agy",
      name: "Antigravity CLI (agy)",
      bin: "agy",
      args: ["--version"],
      icon: "✨",
      helloCmd: "agy --effort medium --mode accept-edits",
      desc: "Antigravity Agentic Pair Programmer",
    },
    {
      id: "claude",
      name: "Claude Code (claude)",
      bin: "claude",
      args: ["--version"],
      icon: "🎭",
      helloCmd: "claude --model sonnet --effort medium --dangerously-skip-permissions",
      desc: "Anthropic Claude Code CLI",
    },
    {
      id: "grok",
      name: "xAI Grok (grok)",
      bin: "grok",
      args: ["--version"],
      icon: "🤖",
      helloCmd: "grok --effort medium --permission-mode acceptEdits",
      desc: "xAI Grok TUI & Agentic CLI",
    },
    {
      id: "deepseek",
      name: "DeepSeek (kilo)",
      bin: "kilo",
      args: ["--version"],
      icon: "🐋",
      helloCmd: "kilo",
      desc: "DeepSeek via Kilo Code Agent",
    },
    {
      id: "gemini",
      name: "Google Gemini CLI (gemini)",
      bin: "gemini",
      args: ["--version"],
      icon: "🌟",
      helloCmd: "gemini -p 'Hello from chromeTerminal!'",
      desc: "Google Gemini CLI",
    },
    {
      id: "ollama",
      name: "Ollama Local (ollama)",
      bin: "ollama",
      args: ["--version"],
      icon: "🦙",
      helloCmd: "ollama run llama3 'Hello'",
      desc: "Local Model Inference Engine",
    },
  ];

  const toolsResults = await Promise.all(
    cliTools.map(async (t) => {
      const start = performance.now();
      try {
        const { stdout, stderr } = await execFileAsync(t.bin, t.args, {
          env: customEnv,
          timeout: 3500,
        });
        const durationMs = Math.round((performance.now() - start) * 10) / 10;
        const versionOutput = (stdout || stderr || "").trim().split("\n")[0] || "Installed";
        return {
          id: t.id,
          name: t.name,
          bin: t.bin,
          icon: t.icon,
          desc: t.desc,
          helloCmd: t.helloCmd,
          ok: true,
          version: versionOutput,
          durationMs,
          statusText: `Loaded in ${durationMs}ms`,
        };
      } catch (err) {
        const durationMs = Math.round((performance.now() - start) * 10) / 10;
        return {
          id: t.id,
          name: t.name,
          bin: t.bin,
          icon: t.icon,
          desc: t.desc,
          helloCmd: t.helloCmd,
          ok: false,
          error: err.message || "Not installed / failed",
          durationMs,
          statusText: "Unavailable",
        };
      }
    })
  );

  // 2. Cloud AI Model API Connectivity
  const providers = [
    {
      id: "gemini",
      name: "Google Gemini API",
      host: "generativelanguage.googleapis.com",
      url: "https://generativelanguage.googleapis.com",
      icon: "✨",
      notes: "Google AI Studio & Gemini API",
    },
    {
      id: "claude",
      name: "Anthropic Claude API",
      host: "api.anthropic.com",
      url: "https://api.anthropic.com",
      icon: "🎭",
      notes: "Claude Sonnet & Opus Models",
    },
    {
      id: "openai",
      name: "OpenAI API",
      host: "api.openai.com",
      url: "https://api.openai.com",
      icon: "🧠",
      notes: "GPT-4o, o1, o3-mini & Realtime API",
    },
    {
      id: "grok",
      name: "xAI Grok API",
      host: "api.x.ai",
      url: "https://api.x.ai",
      icon: "🤖",
      notes: "Grok 2 / Grok 3 Reasoning Models",
    },
    {
      id: "openrouter",
      name: "OpenRouter Gateway",
      host: "openrouter.ai",
      url: "https://openrouter.ai/api/v1/models",
      icon: "🔀",
      notes: "Unified LLM Gateway",
    },
  ];

  const providerResults = await Promise.all(
    providers.map(async (p) => {
      const start = performance.now();
      let dnsIps = [];
      try {
        dnsIps = await dns.promises.resolve4(p.host);
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

  const toolsLoadedCount = toolsResults.filter((t) => t.ok).length;
  const apisReachableCount = providerResults.filter((p) => p.ok).length;

  res.json({
    ok: true,
    timestamp: Date.now(),
    toolsLoadedCount,
    toolsTotalCount: toolsResults.length,
    tools: toolsResults,
    apisReachableCount,
    apisTotalCount: providerResults.length,
    results: providerResults,
  });
});

app.get("/api/test-ai-hello", async (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  const customEnv = {
    ...process.env,
    PATH: `${process.env.PATH || ""}:${os.homedir()}/.nvm/versions/node/v22.22.0/bin:${os.homedir()}/.local/bin:${os.homedir()}/.grok/bin:/opt/homebrew/bin:/usr/local/bin`,
  };

  const toolId = req.query.tool || "all";
  const targetTools = toolId === "all" ? HELLO_TEST_TOOLS : HELLO_TEST_TOOLS.filter((t) => t.id === toolId);

  const tests = await Promise.all(targetTools.map((t) => runHelloBgTest(t, customEnv)));

  res.json({
    ok: true,
    timestamp: Date.now(),
    testedCount: tests.length,
    workingCount: tests.filter((t) => t.working).length,
    tests,
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
