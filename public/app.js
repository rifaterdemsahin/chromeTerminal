const statusEl = document.getElementById("status");
const originLabel = document.getElementById("origin-label");
const termHost = document.getElementById("terminal");
const reconnectBtn = document.getElementById("reconnect");
const saveBtn = document.getElementById("btn-save");
const newTabBtn = document.getElementById("btn-new-tab");
const projectBar = document.getElementById("project-bar");
const projectFilter = document.getElementById("project-filter");
const guideEl = document.getElementById("guide");
const guideBtn = document.getElementById("btn-guide");
const guideClose = document.getElementById("guide-close");

const LS5_CMD = "ls -ant | awk 'NR==1 || n<5 { if (NR>1) n++; print }'";
const DOUBLE_CTRL_C_MS = 800;

const isLocal =
  location.hostname === "127.0.0.1" || location.hostname === "localhost";

const term = new Terminal({
  cursorBlink: true,
  fontFamily: "Menlo, Monaco, 'Courier New', monospace",
  fontSize: 13,
  theme: {
    background: "#0f1115",
    foreground: "#e8eaed",
    cursor: "#8ab4f8",
    selectionBackground: "#3c4048",
  },
});

const fitAddon = new FitAddon.FitAddon();
const linksAddon = new WebLinksAddon.WebLinksAddon();
term.loadAddon(fitAddon);
term.loadAddon(linksAddon);
term.open(termHost);

const SESSION_KEY = "chromeTerminal.session";

let socket;
let connected = false;
let catalog = { home: "", projectsDir: "", projects: [] };
let lastCtrlCAt = 0;
let wakeTimer = 0;
let pingTimer = 0;
let allowAutoResume = true;
let resumeAttempts = 0;

function setStatus(text) {
  statusEl.textContent = text;
}

function tokenFromUrl() {
  return new URLSearchParams(window.location.search).get("token") || "";
}

function wsUrl() {
  const proto = location.protocol === "https:" ? "wss" : "ws";
  const params = new URLSearchParams();
  const token = tokenFromUrl();
  const session = sessionStorage.getItem(SESSION_KEY);
  if (token) params.set("token", token);
  if (session) params.set("session", session);
  const q = params.toString();
  return `${proto}://${location.host}/pty${q ? `?${q}` : ""}`;
}

function send(obj) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(obj));
  }
}

function sendInput(data) {
  if (!connected) return;
  send({ type: "input", data });
  term.focus();
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function sendCommand(command) {
  sendInput(`${command}\n`);
}

function cdTo(dirPath) {
  sendCommand(`cd ${shellQuote(dirPath)}`);
}

function fit() {
  if (document.hidden) return;
  if (termHost.clientWidth < 40 || termHost.clientHeight < 40) return;
  try {
    fitAddon.fit();
    if (term.cols >= 20 && term.rows >= 5) {
      send({ type: "resize", cols: term.cols, rows: term.rows });
    }
    term.refresh(0, Math.max(0, term.rows - 1));
  } catch {
    // terminal not ready
  }
}

function socketOpen() {
  return socket && socket.readyState === WebSocket.OPEN;
}

function startPing() {
  stopPing();
  pingTimer = window.setInterval(() => {
    if (document.hidden) return;
    if (socketOpen()) send({ type: "ping" });
  }, 15000);
}

function stopPing() {
  if (pingTimer) {
    clearInterval(pingTimer);
    pingTimer = 0;
  }
}

function wakeTerminal() {
  if (document.hidden || !isLocal || !allowAutoResume) return;
  if (wakeTimer) clearTimeout(wakeTimer);
  const delay = socketOpen() ? 50 : Math.min(4000, 200 * 2 ** resumeAttempts);
  wakeTimer = window.setTimeout(() => {
    if (document.hidden || !allowAutoResume) return;
    if (!socketOpen()) {
      resumeAttempts += 1;
      connect({ reset: false });
    } else {
      fit();
      term.focus();
      send({ type: "ping" });
    }
  }, delay);
}

function openGuide() {
  guideEl.hidden = false;
}

function closeGuide() {
  guideEl.hidden = true;
  if (isLocal) term.focus();
}

function connect(opts = {}) {
  if (!isLocal) {
    setStatus("docs only · GitHub Pages");
    term.write(
      "\x1b[33mGitHub Pages cannot open your Mac shell.\x1b[0m\r\n" +
        "Clone the repo, run \x1b[1mnpm start\x1b[0m, then open http://127.0.0.1:3847\r\n" +
        "Use the Guide button in the top menu for the full walkthrough.\r\n"
    );
    return;
  }

  if (opts.reset) sessionStorage.removeItem(SESSION_KEY);

  if (socket) {
    socket.onclose = null;
    socket.close();
  }

  setStatus("🟡 connecting…");
  socket = new WebSocket(wsUrl());

  socket.addEventListener("open", () => {
    connected = true;
    allowAutoResume = true;
    resumeAttempts = 0;
    lastCtrlCAt = 0;
    setStatus("🟢 connected · " + new Date().toLocaleTimeString());
    startPing();
    fit();
    term.focus();
  });

  socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.type === "session" && msg.id) sessionStorage.setItem(SESSION_KEY, msg.id);
    if (msg.type === "pong") return;
    if (msg.type === "output") term.write(msg.data);
    if (msg.type === "exit") {
      sessionStorage.removeItem(SESSION_KEY);
      stopPing();
      term.write(`\r\n\x1b[33m👋 shell exited (${msg.exitCode ?? "?"})\x1b[0m\r\n`);
      setStatus("⚪ disconnected");
    }
  });

  socket.addEventListener("close", () => {
    connected = false;
    stopPing();
    setStatus("⚪ disconnected");
    if (!document.hidden && allowAutoResume) wakeTerminal();
  });

  socket.addEventListener("error", () => {
    setStatus("🔴 error");
  });
}

function terminalPlainText() {
  const buf = term.buffer.active;
  const lines = [];
  for (let i = 0; i < buf.length; i++) {
    const line = buf.getLine(i);
    lines.push(line ? line.translateToString(true) : "");
  }
  return lines.join("\n").replace(/\s+$/, "\n");
}

function saveTerminalText() {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const blob = new Blob([terminalPlainText()], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `chromeTerminal-${stamp}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function disconnectSession(reason) {
  allowAutoResume = false;
  stopPing();
  sessionStorage.removeItem(SESSION_KEY);
  term.write(`\r\n\x1b[33m🚪 ${reason}\x1b[0m\r\n`);
  if (socket) {
    socket.onclose = null;
    socket.close();
  }
  connected = false;
  lastCtrlCAt = 0;
  setStatus("⚪ disconnected");
}

function renderProjects() {
  const q = (projectFilter.value || "").trim().toLowerCase();
  const matches = catalog.projects.filter((p) => p.name.toLowerCase().includes(q));
  projectBar.replaceChildren();

  if (!matches.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = q
      ? `🔍 No project matches “${q}”`
      : isLocal
        ? "📂 No projects found"
        : "📂 Project chips load only from the local server";
    projectBar.append(empty);
    return;
  }

  for (const project of matches.slice(0, 200)) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = `📁 ${project.name}`;
    btn.title = project.path;
    btn.addEventListener("click", () => cdTo(project.path));
    projectBar.append(btn);
  }
}

async function loadProjects() {
  if (!isLocal) {
    renderProjects();
    return;
  }
  const token = tokenFromUrl();
  const q = token ? `?token=${encodeURIComponent(token)}` : "";
  const res = await fetch(`/api/projects${q}`);
  if (!res.ok) throw new Error(`projects ${res.status}`);
  catalog = await res.json();
  renderProjects();
}

term.onData((data) => {
  if (!connected) return;
  if (data === "\x03") {
    const now = Date.now();
    if (lastCtrlCAt && now - lastCtrlCAt < DOUBLE_CTRL_C_MS) {
      lastCtrlCAt = 0;
      disconnectSession("left with Ctrl+C Ctrl+C");
      return;
    }
    lastCtrlCAt = now;
  } else {
    lastCtrlCAt = 0;
  }
  send({ type: "input", data });
});

window.addEventListener("resize", fit);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) wakeTerminal();
});
window.addEventListener("pageshow", wakeTerminal);
window.addEventListener("focus", wakeTerminal);
window.addEventListener("online", wakeTerminal);
termHost.addEventListener("click", () => term.focus());
reconnectBtn.addEventListener("click", () => {
  allowAutoResume = true;
  term.reset();
  connect({ reset: true });
});

saveBtn.addEventListener("click", saveTerminalText);

newTabBtn.addEventListener("click", () => {
  const url = new URL(location.href);
  url.searchParams.delete("session");
  window.open(url.toString(), "_blank", "noopener");
});

document.getElementById("btn-ls5").addEventListener("click", () => {
  sendCommand(LS5_CMD);
});

document.querySelectorAll("[data-cd]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-cd") === "$HOME" ? catalog.home || "$HOME" : btn.getAttribute("data-cd");
    cdTo(target);
  });
});

document.getElementById("btn-projects").addEventListener("click", () => {
  cdTo(catalog.projectsDir || `${catalog.home}/projects`);
});

document.querySelectorAll("[data-run]").forEach((btn) => {
  btn.addEventListener("click", () => sendCommand(btn.getAttribute("data-run")));
});

document.querySelectorAll("[data-key]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-key");
    if (key === "tab") sendInput("\t");
    if (key === "shift-tab") sendInput("\x1b[Z");
  });
});

projectFilter.addEventListener("input", renderProjects);
guideBtn.addEventListener("click", openGuide);
guideClose.addEventListener("click", closeGuide);
guideEl.addEventListener("click", (event) => {
  if (event.target === guideEl) closeGuide();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !guideEl.hidden) closeGuide();
});

window.addEventListener("load", () => {
  originLabel.textContent = isLocal ? "🔒 localhost" : "📄 GitHub Pages";
  fit();
  connect();
  loadProjects().catch((err) => {
    projectBar.textContent = err.message;
  });
  if (!isLocal) openGuide();
});
