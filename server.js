import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
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
      .map((e) => ({
        name: e.name,
        path: path.join(PROJECTS_DIR, e.name),
      }))
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

function authorized(req) {
  if (!TOKEN) return true;
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    return url.searchParams.get("token") === TOKEN;
  } catch {
    return false;
  }
}

wss.on("connection", (ws, req) => {
  if (!authorized(req)) {
    ws.close(4401, "unauthorized");
    return;
  }

  let ptyProcess;
  try {
    ptyProcess = pty.spawn(SHELL, ["-l"], {
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
  } catch (err) {
    const message = `failed to start shell: ${err.message}\r\n`;
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: "output", data: `\x1b[31m${message}\x1b[0m` }));
      ws.close();
    }
    console.error(err);
    return;
  }

  ptyProcess.onData((data) => {
    if (ws.readyState === ws.OPEN) ws.send(JSON.stringify({ type: "output", data }));
  });

  ptyProcess.onExit(({ exitCode, signal }) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(
        JSON.stringify({
          type: "exit",
          exitCode,
          signal,
        })
      );
      ws.close();
    }
  });

  ws.on("message", (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      return;
    }

    if (msg.type === "input" && typeof msg.data === "string") {
      ptyProcess.write(msg.data);
    } else if (msg.type === "resize") {
      const cols = Number(msg.cols) || 80;
      const rows = Number(msg.rows) || 24;
      ptyProcess.resize(Math.max(2, cols), Math.max(1, rows));
    }
  });

  ws.on("close", () => {
    try {
      ptyProcess.kill();
    } catch {
      // already gone
    }
  });
});

server.listen(PORT, HOST, () => {
  const url = `http://${HOST}:${PORT}`;
  console.log(`chromeTerminal listening on ${url}`);
  console.log(`shell: ${SHELL}`);
  if (TOKEN) console.log("auth: TERMINAL_TOKEN is required as ?token=");
  else console.log("auth: none (localhost only — do not bind 0.0.0.0 without a token)");
});
