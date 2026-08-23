const statusEl = document.getElementById("status");
const termHost = document.getElementById("terminal");
const reconnectBtn = document.getElementById("reconnect");
const projectBar = document.getElementById("project-bar");
const projectFilter = document.getElementById("project-filter");

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

let socket;
let connected = false;
let catalog = { home: "", projectsDir: "", projects: [] };

function setStatus(text) {
  statusEl.textContent = text;
}

function tokenFromUrl() {
  return new URLSearchParams(window.location.search).get("token") || "";
}

function wsUrl() {
  const proto = location.protocol === "https:" ? "wss" : "ws";
  const token = tokenFromUrl();
  const q = token ? `?token=${encodeURIComponent(token)}` : "";
  return `${proto}://${location.host}/pty${q}`;
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
  try {
    fitAddon.fit();
    send({ type: "resize", cols: term.cols, rows: term.rows });
  } catch {
    // terminal not ready
  }
}

function connect() {
  if (socket) {
    socket.onclose = null;
    socket.close();
  }

  setStatus("connecting…");
  socket = new WebSocket(wsUrl());

  socket.addEventListener("open", () => {
    connected = true;
    setStatus("connected · " + new Date().toLocaleTimeString());
    fit();
    term.focus();
  });

  socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.type === "output") term.write(msg.data);
    if (msg.type === "exit") {
      term.write(`\r\n\x1b[33mshell exited (${msg.exitCode ?? "?"})\x1b[0m\r\n`);
      setStatus("disconnected");
    }
  });

  socket.addEventListener("close", () => {
    connected = false;
    setStatus("disconnected");
  });

  socket.addEventListener("error", () => {
    setStatus("error");
  });
}

function renderProjects() {
  const q = (projectFilter.value || "").trim().toLowerCase();
  const matches = catalog.projects.filter((p) => p.name.toLowerCase().includes(q));
  projectBar.replaceChildren();

  if (!matches.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = q ? `No project matches “${q}”` : "No projects found";
    projectBar.append(empty);
    return;
  }

  for (const project of matches.slice(0, 200)) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = project.name;
    btn.title = project.path;
    btn.addEventListener("click", () => cdTo(project.path));
    projectBar.append(btn);
  }
}

async function loadProjects() {
  const token = tokenFromUrl();
  const q = token ? `?token=${encodeURIComponent(token)}` : "";
  const res = await fetch(`/api/projects${q}`);
  if (!res.ok) throw new Error(`projects ${res.status}`);
  catalog = await res.json();
  renderProjects();
}

term.onData((data) => {
  if (!connected) return;
  send({ type: "input", data });
});

window.addEventListener("resize", fit);
reconnectBtn.addEventListener("click", () => {
  term.reset();
  connect();
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

window.addEventListener("load", () => {
  fit();
  connect();
  loadProjects().catch((err) => {
    projectBar.textContent = err.message;
  });
});
