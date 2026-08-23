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
const themeBar = document.getElementById("theme-bar");

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

const THEME_KEY = "chromeTerminal.theme";
const THEMES = {
  night: {
    emoji: "🌑",
    label: "Night",
    ui: {
      bg: "#0f1115",
      chrome: "#1c1f26",
      menu: "#161920",
      blurb: "#12151c",
      chip: "#12141a",
      page: "#000000",
      border: "#2a2f3a",
      text: "#e8eaed",
      muted: "#9aa0a6",
      accent: "#8ab4f8",
      "accent-2": "#81c995",
    },
    term: {
      background: "#0f1115",
      foreground: "#e8eaed",
      cursor: "#8ab4f8",
      selectionBackground: "#3c4048",
      black: "#0f1115",
      red: "#f28b82",
      green: "#81c995",
      yellow: "#fdd663",
      blue: "#8ab4f8",
      magenta: "#c58af9",
      cyan: "#78d9ec",
      white: "#e8eaed",
      brightBlack: "#9aa0a6",
      brightRed: "#f6aea9",
      brightGreen: "#a8dab5",
      brightYellow: "#fde293",
      brightBlue: "#aecbfa",
      brightMagenta: "#d7aefb",
      brightCyan: "#a1e4f2",
      brightWhite: "#ffffff",
    },
  },
  contrast: {
    emoji: "⬛",
    label: "High contrast",
    ui: {
      bg: "#000000",
      chrome: "#000000",
      menu: "#0a0a0a",
      blurb: "#111111",
      chip: "#1a1a1a",
      page: "#000000",
      border: "#ffffff",
      text: "#ffffff",
      muted: "#e6e6e6",
      accent: "#ffff00",
      "accent-2": "#00ffff",
    },
    term: {
      background: "#000000",
      foreground: "#ffffff",
      cursor: "#ffff00",
      selectionBackground: "#ffff00",
      selectionForeground: "#000000",
      black: "#000000",
      red: "#ff6b6b",
      green: "#4cfc73",
      yellow: "#ffe66d",
      blue: "#74c0fc",
      magenta: "#e599f7",
      cyan: "#66ffff",
      white: "#ffffff",
      brightBlack: "#c0c0c0",
      brightRed: "#ff8a8a",
      brightGreen: "#8aff9e",
      brightYellow: "#fff3a3",
      brightBlue: "#a5d8ff",
      brightMagenta: "#f3c0ff",
      brightCyan: "#b3ffff",
      brightWhite: "#ffffff",
    },
  },
  paper: {
    emoji: "⬜",
    label: "Paper",
    ui: {
      bg: "#ffffff",
      chrome: "#f4f4f4",
      menu: "#ececec",
      blurb: "#f7f7f7",
      chip: "#ffffff",
      page: "#ffffff",
      border: "#1a1a1a",
      text: "#111111",
      muted: "#333333",
      accent: "#0b57d0",
      "accent-2": "#0d7a32",
    },
    term: {
      background: "#ffffff",
      foreground: "#111111",
      cursor: "#0b57d0",
      selectionBackground: "#c6dafc",
      black: "#111111",
      red: "#b3261e",
      green: "#0d7a32",
      yellow: "#8c5000",
      blue: "#0b57d0",
      magenta: "#7b1fa2",
      cyan: "#007a7a",
      white: "#333333",
      brightBlack: "#5f6368",
      brightRed: "#d93025",
      brightGreen: "#188038",
      brightYellow: "#b06000",
      brightBlue: "#185abc",
      brightMagenta: "#9c27b0",
      brightCyan: "#00838f",
      brightWhite: "#000000",
    },
  },
  forest: {
    emoji: "🌲",
    label: "Forest",
    ui: {
      bg: "#03160a",
      chrome: "#06210f",
      menu: "#051a0c",
      blurb: "#041408",
      chip: "#072814",
      page: "#010b05",
      border: "#3dff8a",
      text: "#d8ffe8",
      muted: "#9fdfb6",
      accent: "#5dff9f",
      "accent-2": "#b8ff00",
    },
    term: {
      background: "#03160a",
      foreground: "#d8ffe8",
      cursor: "#5dff9f",
      selectionBackground: "#145c32",
      black: "#03160a",
      red: "#ff8a80",
      green: "#5dff9f",
      yellow: "#e6ff7a",
      blue: "#8ad4ff",
      magenta: "#d4a5ff",
      cyan: "#7dffe8",
      white: "#d8ffe8",
      brightBlack: "#7fbb94",
      brightRed: "#ffb4ab",
      brightGreen: "#9dffc0",
      brightYellow: "#f3ffb0",
      brightBlue: "#b3e3ff",
      brightMagenta: "#e6c8ff",
      brightCyan: "#b0fff2",
      brightWhite: "#ffffff",
    },
  },
  ocean: {
    emoji: "🌊",
    label: "Ocean",
    ui: {
      bg: "#02131f",
      chrome: "#062033",
      menu: "#041827",
      blurb: "#03121d",
      chip: "#08263c",
      page: "#010c14",
      border: "#4cc9f0",
      text: "#e7f7ff",
      muted: "#9ec9dc",
      accent: "#7dd3fc",
      "accent-2": "#67e8f9",
    },
    term: {
      background: "#02131f",
      foreground: "#e7f7ff",
      cursor: "#7dd3fc",
      selectionBackground: "#164e63",
      black: "#02131f",
      red: "#fb7185",
      green: "#5eead4",
      yellow: "#fde68a",
      blue: "#7dd3fc",
      magenta: "#c4b5fd",
      cyan: "#67e8f9",
      white: "#e7f7ff",
      brightBlack: "#7aa0b5",
      brightRed: "#fda4af",
      brightGreen: "#99f6e4",
      brightYellow: "#fef08a",
      brightBlue: "#bae6fd",
      brightMagenta: "#ddd6fe",
      brightCyan: "#a5f3fc",
      brightWhite: "#ffffff",
    },
  },
  amber: {
    emoji: "🟠",
    label: "Amber",
    ui: {
      bg: "#1a1003",
      chrome: "#261806",
      menu: "#1f1405",
      blurb: "#160e02",
      chip: "#2e1c07",
      page: "#120b01",
      border: "#ffb020",
      text: "#ffe7b3",
      muted: "#e0c07a",
      accent: "#ffcc66",
      "accent-2": "#ffd166",
    },
    term: {
      background: "#1a1003",
      foreground: "#ffe7b3",
      cursor: "#ffcc66",
      selectionBackground: "#5c3d0a",
      black: "#1a1003",
      red: "#ff8a65",
      green: "#c5e063",
      yellow: "#ffcc66",
      blue: "#8ecae6",
      magenta: "#e0aaff",
      cyan: "#80ffdb",
      white: "#ffe7b3",
      brightBlack: "#c9a35a",
      brightRed: "#ffab91",
      brightGreen: "#d8ed8a",
      brightYellow: "#ffe08a",
      brightBlue: "#bde0fe",
      brightMagenta: "#efc3ff",
      brightCyan: "#b0fff0",
      brightWhite: "#fff8e7",
    },
  },
  grape: {
    emoji: "🟣",
    label: "Grape",
    ui: {
      bg: "#16041f",
      chrome: "#240832",
      menu: "#1c0628",
      blurb: "#120319",
      chip: "#2c0a3d",
      page: "#0d0214",
      border: "#e879f9",
      text: "#fae8ff",
      muted: "#e9b4ff",
      accent: "#f0abfc",
      "accent-2": "#c4b5fd",
    },
    term: {
      background: "#16041f",
      foreground: "#fae8ff",
      cursor: "#f0abfc",
      selectionBackground: "#6b21a8",
      black: "#16041f",
      red: "#fb7185",
      green: "#86efac",
      yellow: "#fde047",
      blue: "#93c5fd",
      magenta: "#e879f9",
      cyan: "#67e8f9",
      white: "#fae8ff",
      brightBlack: "#c084fc",
      brightRed: "#fda4af",
      brightGreen: "#bbf7d0",
      brightYellow: "#fef08a",
      brightBlue: "#bfdbfe",
      brightMagenta: "#f5d0fe",
      brightCyan: "#a5f3fc",
      brightWhite: "#ffffff",
    },
  },
};

function applyTheme(id) {
  const theme = THEMES[id] || THEMES.night;
  document.documentElement.dataset.theme = id in THEMES ? id : "night";
  for (const [key, value] of Object.entries(theme.ui)) {
    document.documentElement.style.setProperty(`--${key}`, value);
  }
  term.options.theme = theme.term;
  try {
    term.refresh(0, Math.max(0, term.rows - 1));
  } catch {
    // not fitted yet
  }
  localStorage.setItem(THEME_KEY, document.documentElement.dataset.theme);
  themeBar.querySelectorAll("[data-theme]").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-theme") === document.documentElement.dataset.theme);
  });
}

function renderThemes() {
  for (const [id, theme] of Object.entries(THEMES)) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-btn";
    btn.setAttribute("data-theme", id);
    btn.textContent = `${theme.emoji} ${theme.label}`;
    btn.title = `${theme.emoji} ${theme.label}`;
    btn.addEventListener("click", () => applyTheme(id));
    themeBar.append(btn);
  }
}

const SESSION_KEY = "chromeTerminal.session";
const SORT_KEY = "chromeTerminal.projectSort";
let projectSort = localStorage.getItem(SORT_KEY) === "latest" ? "latest" : "name";

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

function setProjectSort(mode) {
  projectSort = mode === "latest" ? "latest" : "name";
  localStorage.setItem(SORT_KEY, projectSort);
  document.getElementById("btn-sort-name")?.classList.toggle("active", projectSort === "name");
  document.getElementById("btn-sort-latest")?.classList.toggle("active", projectSort === "latest");
  renderProjects();
}

function renderProjects() {
  const q = (projectFilter.value || "").trim().toLowerCase();
  const matches = catalog.projects
    .filter((p) => p.name.toLowerCase().includes(q))
    .slice()
    .sort((a, b) => {
      if (projectSort === "latest") return (b.mtimeMs || 0) - (a.mtimeMs || 0);
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    });
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
    btn.title = project.mtimeMs
      ? `${project.path} · ${new Date(project.mtimeMs).toLocaleString()}`
      : project.path;
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
document.getElementById("btn-sort-name").addEventListener("click", () => setProjectSort("name"));
document.getElementById("btn-sort-latest").addEventListener("click", () => setProjectSort("latest"));
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
  renderThemes();
  applyTheme(localStorage.getItem(THEME_KEY) || "night");
  setProjectSort(projectSort);
  fit();
  connect();
  loadProjects().catch((err) => {
    projectBar.textContent = err.message;
  });
  if (!isLocal) openGuide();
});
