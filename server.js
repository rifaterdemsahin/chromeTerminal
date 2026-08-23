import { execFile } from "node:child_process";
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3847;
const HOST = process.env.HOST || "127.0.0.1";
const SHELL =
  process.env.SHELL ||
  (process.platform === "win32" ? "powershell.exe" : "/bin/zsh");
const TOKEN = process.env.TERMINAL_TOKEN || "";

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const PROJECTS_DIR = process.env.PROJECTS_DIR || path.join(os.homedir(), "projects");

function authorizedHttp(req) {
  if (!TOKEN) return true;
  return req.query.token === TOKEN;
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, shell: SHELL, host: HOST, port: PORT, projectsDir: PROJECTS_DIR });
});

app.get("/api/projects", (req, res) => {
  if (!authorizedHttp(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  let entries = [];
  try {
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
        return { name: e.name, path: full, mtimeMs };
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
  });
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
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify({ type: "session", id: session.id, home: os.homedir() }));
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
