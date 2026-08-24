const statusEl = document.getElementById("status");
const originLabel = document.getElementById("origin-label");
const pwdEl = document.getElementById("pwd-label");
const sessionAgeEl = document.getElementById("session-age");
const termHost = document.getElementById("terminal");
const reconnectBtn = document.getElementById("reconnect");
const saveBtn = document.getElementById("btn-save");
const dictateBtn = document.getElementById("btn-dictate");
const newTabBtn = document.getElementById("btn-new-tab");
const projectBar = document.getElementById("project-bar");
const projectFilter = document.getElementById("project-filter");
const guideEl = document.getElementById("guide");
const guideBtn = document.getElementById("btn-guide");
const guideClose = document.getElementById("guide-close");
const promptsEl = document.getElementById("prompts");
const promptsBtn = document.getElementById("btn-prompts");
const promptsClose = document.getElementById("prompts-close");
const promptListEl = document.getElementById("prompt-list");
const themeBar = document.getElementById("theme-bar");
const watermarkEl = document.getElementById("watermark");
const watermarkInput = document.getElementById("watermark-input");

const netQualityBadge = document.getElementById("net-quality-badge");
const btnNetModal = document.getElementById("btn-net-modal");
const netModalEl = document.getElementById("net-modal");
const netModalClose = document.getElementById("net-modal-close");

const netIndicatorDot = document.getElementById("net-indicator-dot");
const netBadgePing = document.getElementById("net-badge-ping");
const netBadgeDns = document.getElementById("net-badge-dns");
const netBadgeSpeed = document.getElementById("net-badge-speed");
const netBadgeLabel = document.getElementById("net-badge-label");

const netModalOverallPill = document.getElementById("net-modal-overall-pill");
const netCardPing = document.getElementById("net-card-ping");
const netCardPingSub = document.getElementById("net-card-ping-sub");
const netCardDns = document.getElementById("net-card-dns");
const netCardDnsSub = document.getElementById("net-card-dns-sub");
const netCardSpeed = document.getElementById("net-card-speed");
const netCardSpeedSub = document.getElementById("net-card-speed-sub");
const netCardQuality = document.getElementById("net-card-quality");
const netCardQualitySub = document.getElementById("net-card-quality-sub");

const btnRunSpeedTest = document.getElementById("btn-run-speed-test");
const btnRetestAll = document.getElementById("btn-retest-all");
const netSpeedBarFill = document.getElementById("net-speed-bar-fill");
const netSpeedProgressText = document.getElementById("net-speed-progress-text");
const netSpeedTransferredText = document.getElementById("net-speed-transferred-text");

const netPingGrade = document.getElementById("net-ping-grade");
const pingRowLocal = document.getElementById("ping-row-local");
const pingTagLocal = document.getElementById("ping-tag-local");
const pingRowCf = document.getElementById("ping-row-cf");
const pingTagCf = document.getElementById("ping-tag-cf");
const pingRowGoogle = document.getElementById("ping-row-google");
const pingTagGoogle = document.getElementById("ping-tag-google");

const netDnsGrade = document.getElementById("net-dns-grade");
const netDnsTableBody = document.getElementById("net-dns-table-body");

const netDiagConnectionType = document.getElementById("net-diag-connection-type");
const netDiagTimestamp = document.getElementById("net-diag-timestamp");
const btnCopyNetDiag = document.getElementById("btn-copy-net-diag");

const LS5_CMD = "ls -ant | awk 'NR==1 || n<5 { if (NR>1) n++; print }'";
const DOUBLE_CTRL_C_MS = 800;
const PUSH_OK = "CHROME_TERMINAL_PUSH_OK";
const PUSH_FAIL = "CHROME_TERMINAL_PUSH_FAIL";
const PUSH_WAIT_MS = 180000;
const PUSH_LEAVE_DELAY_MS = 8000;

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
  grok: {
    emoji: "🤖",
    label: "Grok Night",
    ui: {
      bg: "#121214",
      chrome: "#1a1a1e",
      menu: "#16161a",
      blurb: "#101012",
      chip: "#222228",
      page: "#0c0c0e",
      border: "#3a3a44",
      text: "#ececef",
      muted: "#9a9aa8",
      accent: "#c77dff",
      "accent-2": "#7d4bc6",
    },
    term: {
      background: "#121214",
      foreground: "#ececef",
      cursor: "#c77dff",
      selectionBackground: "#3d2a52",
      black: "#121214",
      red: "#e85d75",
      green: "#6bcf8e",
      yellow: "#e6c36a",
      blue: "#7aa2f7",
      magenta: "#c77dff",
      cyan: "#5fd4e0",
      white: "#ececef",
      brightBlack: "#9a9aa8",
      brightRed: "#ff8b9a",
      brightGreen: "#8ee4a8",
      brightYellow: "#f3d48a",
      brightBlue: "#a4c2ff",
      brightMagenta: "#e0b0ff",
      brightCyan: "#8eeaf0",
      brightWhite: "#ffffff",
    },
  },
  grokday: {
    emoji: "🌤️",
    label: "Grok Day",
    ui: {
      bg: "#f4f2f7",
      chrome: "#ebe6f2",
      menu: "#e4ddec",
      blurb: "#f7f5fa",
      chip: "#ffffff",
      page: "#faf8fc",
      border: "#5b4a70",
      text: "#1c1424",
      muted: "#4a3f55",
      accent: "#7d4bc6",
      "accent-2": "#0d7a32",
    },
    term: {
      background: "#f4f2f7",
      foreground: "#1c1424",
      cursor: "#7d4bc6",
      selectionBackground: "#d9c6f0",
      black: "#1c1424",
      red: "#c42b3c",
      green: "#1a7f3c",
      yellow: "#8a5a00",
      blue: "#2f64d2",
      magenta: "#7d4bc6",
      cyan: "#0c7a8a",
      white: "#4a3f55",
      brightBlack: "#6b6278",
      brightRed: "#e85d75",
      brightGreen: "#2ea043",
      brightYellow: "#b8860b",
      brightBlue: "#3d7eff",
      brightMagenta: "#9b5de5",
      brightCyan: "#0f87a2",
      brightWhite: "#000000",
    },
  },
  agy: {
    emoji: "✨",
    label: "Antigravity",
    ui: {
      bg: "#002b36",
      chrome: "#073642",
      menu: "#00313d",
      blurb: "#00212b",
      chip: "#073642",
      page: "#001e26",
      border: "#2aa198",
      text: "#fdf6e3",
      muted: "#93a1a1",
      accent: "#268bd2",
      "accent-2": "#859900",
    },
    term: {
      background: "#002b36",
      foreground: "#839496",
      cursor: "#268bd2",
      selectionBackground: "#073642",
      black: "#073642",
      red: "#dc322f",
      green: "#859900",
      yellow: "#b58900",
      blue: "#268bd2",
      magenta: "#d33682",
      cyan: "#2aa198",
      white: "#eee8d5",
      brightBlack: "#586e75",
      brightRed: "#cb4b16",
      brightGreen: "#859900",
      brightYellow: "#b58900",
      brightBlue: "#268bd2",
      brightMagenta: "#6c71c4",
      brightCyan: "#2aa198",
      brightWhite: "#fdf6e3",
    },
  },
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
  document.documentElement.style.setProperty("--lint-error", theme.term.red);
  document.documentElement.style.setProperty("--lint-warn", theme.term.yellow);
  document.documentElement.style.setProperty("--lint-ok", theme.term.green);
  document.documentElement.style.setProperty("--lint-info", theme.term.cyan);
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
const SESSION_STARTED_KEY = "chromeTerminal.sessionStartedAt";
const WATERMARK_KEY = "chromeTerminal.watermark";

const PANELS_KEY = "chromeTerminal.panels";
const CUSTOM_PROMPTS_KEY = "chromeTerminal.customPrompts";
const PINNED_PROJECTS_KEY = "chromeTerminal.pinnedProjects";
const PANEL_IDS = ["menu", "projects", "badge", "theme", "blurb"];
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
let pushWatch = null;
let sessionStartedAt = Number(sessionStorage.getItem(SESSION_STARTED_KEY)) || 0;
let sessionAgeTimer = 0;

function setStatus(text) {
  statusEl.textContent = text;
}

function formatSessionAge(ms) {
  const totalMin = Math.max(0, Math.floor(ms / 60000));
  const hours = Math.floor(totalMin / 60);
  const minutes = totalMin % 60;
  return `⏱ ${hours}h ${String(minutes).padStart(2, "0")}m`;
}

function renderSessionAge() {
  if (!sessionAgeEl) return;
  if (!sessionStartedAt) {
    sessionAgeEl.textContent = "⏱ —";
    sessionAgeEl.title = "How long this shell session has been on";
    return;
  }
  const elapsed = Date.now() - sessionStartedAt;
  sessionAgeEl.textContent = formatSessionAge(elapsed);
  sessionAgeEl.title = `Session on since ${new Date(sessionStartedAt).toLocaleString()}`;
}

function startSessionAgeClock(startedAt) {
  const ts = Number(startedAt) || 0;
  if (ts) {
    sessionStartedAt = ts;
    sessionStorage.setItem(SESSION_STARTED_KEY, String(ts));
  }
  renderSessionAge();
  if (sessionAgeTimer) return;
  sessionAgeTimer = window.setInterval(renderSessionAge, 15000);
}

function clearSessionAge() {
  sessionStartedAt = 0;
  sessionStorage.removeItem(SESSION_STARTED_KEY);
  if (sessionAgeTimer) {
    clearInterval(sessionAgeTimer);
    sessionAgeTimer = 0;
  }
  renderSessionAge();
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

const SpeechRec =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;
let speechRec = null;
let dictating = false;
let dictateInterim = "";

function focusTerminalCursor() {
  term.focus();
  term.scrollToBottom();
  const ta = term.textarea;
  if (!ta) return;
  ta.focus({ preventScroll: true });
  try {
    const len = ta.value.length;
    ta.setSelectionRange(len, len);
  } catch {
    /* xterm may keep the helper textarea empty */
  }
}

function setDictateUi(on) {
  dictating = on;
  if (!dictateBtn) return;
  dictateBtn.classList.toggle("dictating", on);
  dictateBtn.textContent = on ? "🛑 Stop dictate" : "🎤 Dictate";
  dictateBtn.setAttribute("aria-pressed", on ? "true" : "false");
}

function stopDictation() {
  if (speechRec) {
    try {
      speechRec.stop();
    } catch {
      /* already stopped */
    }
  }
  dictateInterim = "";
  setDictateUi(false);
  focusTerminalCursor();
  setStatus(connected ? "🟢 connected" : statusEl.textContent);
}

function startDictation() {
  focusTerminalCursor();
  if (!connected) {
    setStatus("🔴 connect first, then dictate");
    return;
  }
  if (!SpeechRec) {
    setStatus("🎤 cursor in shell — double-tap Fn to dictate");
    return;
  }
  if (dictating) {
    stopDictation();
    return;
  }

  speechRec = new SpeechRec();
  speechRec.continuous = true;
  speechRec.interimResults = true;
  speechRec.lang = navigator.language || "en-US";

  speechRec.onstart = () => {
    setDictateUi(true);
    focusTerminalCursor();
    setStatus("🎤 listening — speak, or double-tap Fn");
  };

  speechRec.onerror = (event) => {
    if (event.error === "aborted" || event.error === "no-speech") return;
    setStatus("🔴 dictate: " + event.error);
  };

  speechRec.onend = () => {
    if (dictating) {
      try {
        speechRec.start();
        return;
      } catch {
        /* fall through and stop */
      }
    }
    stopDictation();
  };

  speechRec.onresult = (event) => {
    let finalChunk = "";
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const text = result[0].transcript;
      if (result.isFinal) finalChunk += text;
      else interim += text;
    }
    if (finalChunk) {
      dictateInterim = "";
      sendInput(finalChunk.replace(/\s+$/, "") + " ");
      focusTerminalCursor();
    } else {
      dictateInterim = interim;
    }
  };

  try {
    speechRec.start();
  } catch (err) {
    setStatus("🔴 dictate: " + (err.message || err));
    setDictateUi(false);
  }
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function sendCommand(command) {
  sendInput(`${command}\n`);
}

function prettyPath(abs, home) {
  if (!abs) return "~";
  const base = home || catalog.home;
  if (base && abs === base) return "~";
  if (base && abs.startsWith(base + "/")) return "~" + abs.slice(base.length);
  return abs;
}

function applyCwd(abs, home) {
  if (home) catalog.home = home;
  const pretty = prettyPath(abs, catalog.home);
  pwdEl.textContent = pretty;
  pwdEl.title = abs || pretty;
  const base = (abs || pretty).replace(/\/$/, "").split("/").filter(Boolean).pop() || pretty;
  setWatermark(pretty.length > 36 ? `~/${base}` : pretty, false);
}

function setWatermark(text, persist = true) {
  const label = String(text || "").trim();
  watermarkEl.textContent = label;
  watermarkInput.value = label;
  if (persist) {
    if (label) sessionStorage.setItem(WATERMARK_KEY, label);
    else sessionStorage.removeItem(WATERMARK_KEY);
  }
  document.title = label ? `${label} · chromeTerminal` : "chromeTerminal";
}

function cdTo(dirPath, badge) {
  sendCommand(`cd ${shellQuote(dirPath)}`);
  if (badge) setWatermark(badge);
}

function goLastProject() {
  const root = catalog.projectsDir || `${catalog.home || "$HOME"}/projects`;
  sendCommand(
    `cd ${shellQuote(root)} && ls -ant && newest=$(ls -1td */ 2>/dev/null | head -n 1) && if [ -n "$newest" ]; then cd -- "$newest" && printf '\\n📂 last project → %s\\n' "$PWD"; else printf '\\n(no project folders)\\n'; fi`
  );
  const newest = [...(catalog.projects || [])].sort((a, b) => (b.mtimeMs || 0) - (a.mtimeMs || 0))[0];
  if (newest) setWatermark(newest.name);
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

let builtinPrompts = [];

function openGuide() {
  guideEl.hidden = false;
}

const netState = {
  pingMs: null,
  pingAvg: null,
  pingMin: null,
  pingMax: null,
  jitterMs: null,
  pingHistory: [],
  cfPingMs: null,
  googlePingMs: null,
  dnsAvgMs: null,
  dnsResults: [],
  dnsServers: [],
  speedMbps: null,
  lastTestedAt: null,
  isTestingSpeed: false,
  isTestingAll: false,
};

function openNetModal() {
  if (netModalEl) netModalEl.hidden = false;
  if (!netState.lastTestedAt || Date.now() - netState.lastTestedAt > 25000) {
    runAllNetworkTests();
  }
}

function closeNetModal() {
  if (netModalEl) netModalEl.hidden = true;
  if (isLocal) term.focus();
}

async function measureEndpointPing(url, timeoutMs = 4000) {
  const start = performance.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      mode: url.startsWith("http") && !url.includes(location.host) ? "cors" : "same-origin",
    });
    clearTimeout(timer);
    const duration = Math.round(performance.now() - start);
    return { ok: res.ok || res.type === "opaque", duration };
  } catch (err) {
    clearTimeout(timer);
    const duration = Math.round(performance.now() - start);
    if (err.name !== "AbortError" && duration < timeoutMs) {
      return { ok: true, duration };
    }
    return { ok: false, duration: null, error: err.message };
  }
}

async function checkPing() {
  const token = tokenFromUrl();
  const q = token ? `?token=${encodeURIComponent(token)}&_=${Date.now()}` : `?_=${Date.now()}`;

  let localResult;
  if (isLocal) {
    localResult = await measureEndpointPing(`/api/net-ping${q}`);
  } else {
    localResult = await measureEndpointPing(`index.html?_=${Date.now()}`);
  }

  if (localResult.ok && localResult.duration !== null) {
    netState.pingMs = localResult.duration;
    netState.pingHistory.push(localResult.duration);
    if (netState.pingHistory.length > 20) netState.pingHistory.shift();

    const sum = netState.pingHistory.reduce((a, b) => a + b, 0);
    netState.pingAvg = Math.round(sum / netState.pingHistory.length);
    netState.pingMin = Math.min(...netState.pingHistory);
    netState.pingMax = Math.max(...netState.pingHistory);

    if (netState.pingHistory.length > 1) {
      let diffSum = 0;
      for (let i = 1; i < netState.pingHistory.length; i++) {
        diffSum += Math.abs(netState.pingHistory[i] - netState.pingHistory[i - 1]);
      }
      netState.jitterMs = Math.round(diffSum / (netState.pingHistory.length - 1));
    } else {
      netState.jitterMs = 0;
    }
  }

  measureEndpointPing("https://cloudflare.com/cdn-cgi/trace")
    .then((res) => {
      if (res.ok) netState.cfPingMs = res.duration;
      updateNetUI();
    })
    .catch(() => {});

  measureEndpointPing("https://dns.google/resolve?name=google.com&type=A")
    .then((res) => {
      if (res.ok) netState.googlePingMs = res.duration;
      updateNetUI();
    })
    .catch(() => {});

  updateNetUI();
}

async function checkDns() {
  const token = tokenFromUrl();
  const q = token ? `?token=${encodeURIComponent(token)}&_=${Date.now()}` : `?_=${Date.now()}`;

  if (isLocal) {
    try {
      const res = await fetch(`/api/net-dns${q}`);
      if (res.ok) {
        const data = await res.json();
        netState.dnsAvgMs = data.avgDnsMs;
        netState.dnsResults = data.results || [];
        netState.dnsServers = data.servers || [];
        updateNetUI();
        return;
      }
    } catch {
      // fallback to DoH
    }
  }

  const testDomains = [
    { host: "google.com", label: "Google", resolver: "Cloudflare 1.1.1.1 DoH" },
    { host: "cloudflare.com", label: "Cloudflare", resolver: "Cloudflare 1.1.1.1 DoH" },
    { host: "github.com", label: "GitHub", resolver: "Google 8.8.8.8 DoH" },
    { host: "apple.com", label: "Apple", resolver: "Google 8.8.8.8 DoH" },
    { host: "wikipedia.org", label: "Wikipedia", resolver: "Cloudflare 1.1.1.1 DoH" },
  ];

  const results = await Promise.all(
    testDomains.map(async (item) => {
      const start = performance.now();
      try {
        let apiUrl = "";
        if (item.resolver.startsWith("Cloudflare")) {
          apiUrl = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(item.host)}&type=A`;
        } else {
          apiUrl = `https://dns.google/resolve?name=${encodeURIComponent(item.host)}&type=A`;
        }
        const res = await fetch(apiUrl, {
          headers: { Accept: "application/dns-json" },
          cache: "no-store",
        });
        const durationMs = Math.round((performance.now() - start) * 10) / 10;
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const addresses = (data.Answer || [])
          .filter((ans) => ans.type === 1)
          .map((ans) => ans.data);
        return {
          host: item.host,
          label: item.label,
          resolver: item.resolver,
          ok: true,
          durationMs,
          addresses: addresses.length ? addresses.slice(0, 4) : ["Resolved"],
        };
      } catch (err) {
        const durationMs = Math.round((performance.now() - start) * 10) / 10;
        return {
          host: item.host,
          label: item.label,
          resolver: item.resolver,
          ok: false,
          durationMs,
          error: err.message,
        };
      }
    })
  );

  const successful = results.filter((r) => r.ok);
  netState.dnsAvgMs =
    successful.length > 0
      ? Math.round(
          (successful.reduce((sum, r) => sum + r.durationMs, 0) / successful.length) * 10
        ) / 10
      : null;
  netState.dnsResults = results;
  updateNetUI();
}

async function runSpeedTest() {
  if (netState.isTestingSpeed) return;
  netState.isTestingSpeed = true;
  if (netIndicatorDot) netIndicatorDot.className = "net-indicator-dot net-testing";
  if (netSpeedProgressText) netSpeedProgressText.textContent = "Testing bandwidth throughput…";
  if (btnRunSpeedTest) {
    btnRunSpeedTest.disabled = true;
    btnRunSpeedTest.textContent = "⏳ Testing…";
  }

  const token = tokenFromUrl();
  const mbToDownload = isLocal ? 3 : 1;
  const q = token
    ? `?token=${encodeURIComponent(token)}&mb=${mbToDownload}&_=${Date.now()}`
    : `?mb=${mbToDownload}&_=${Date.now()}`;

  const speedUrl = isLocal ? `/api/net-speed${q}` : `style.css?_=${Date.now()}`;

  try {
    let transferredBytes = 0;
    const startTime = performance.now();
    const res = await fetch(speedUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const contentLength = Number(res.headers.get("Content-Length")) || mbToDownload * 1024 * 1024;
    const reader = res.body ? res.body.getReader() : null;

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        transferredBytes += value.byteLength;
        const progress = Math.min(Math.round((transferredBytes / contentLength) * 100), 100);
        if (netSpeedBarFill) netSpeedBarFill.style.width = `${progress}%`;
        if (netSpeedTransferredText) {
          netSpeedTransferredText.textContent = `${(transferredBytes / (1024 * 1024)).toFixed(1)} / ${(contentLength / (1024 * 1024)).toFixed(1)} MB`;
        }
        const elapsedSec = (performance.now() - startTime) / 1000;
        if (elapsedSec > 0.05) {
          const currentMbps = Math.round(((transferredBytes * 8) / (elapsedSec * 1000 * 1000)) * 10) / 10;
          if (netSpeedProgressText) netSpeedProgressText.textContent = `Streaming: ${currentMbps} Mbps (${progress}%)`;
        }
      }
    } else {
      const blob = await res.blob();
      transferredBytes = blob.size;
    }

    const totalDurationSec = (performance.now() - startTime) / 1000;
    const calculatedMbps =
      totalDurationSec > 0
        ? Math.round(((transferredBytes * 8) / (totalDurationSec * 1000 * 1000)) * 10) / 10
        : 0;

    netState.speedMbps = calculatedMbps;
    if (netSpeedBarFill) netSpeedBarFill.style.width = "100%";
    if (netSpeedProgressText) netSpeedProgressText.textContent = `Completed: ${calculatedMbps} Mbps throughput`;
  } catch (err) {
    if (navigator.connection && navigator.connection.downlink) {
      netState.speedMbps = navigator.connection.downlink;
      if (netSpeedProgressText) netSpeedProgressText.textContent = `Estimated: ${navigator.connection.downlink} Mbps (Network API)`;
    } else {
      if (netSpeedProgressText) netSpeedProgressText.textContent = `Speed test error: ${err.message}`;
    }
  } finally {
    netState.isTestingSpeed = false;
    if (btnRunSpeedTest) {
      btnRunSpeedTest.disabled = false;
      btnRunSpeedTest.textContent = "⚡ Test Speed";
    }
    updateNetUI();
  }
}

async function runAllNetworkTests() {
  if (netState.isTestingAll) return;
  netState.isTestingAll = true;
  if (btnRetestAll) {
    btnRetestAll.disabled = true;
    btnRetestAll.textContent = "⏳ Testing…";
  }

  await checkPing();
  await checkDns();
  await runSpeedTest();

  netState.lastTestedAt = Date.now();
  netState.isTestingAll = false;
  if (btnRetestAll) {
    btnRetestAll.disabled = false;
    btnRetestAll.textContent = "🔄 Retest All";
  }
  updateNetUI();
}

function calculateQualityGrade(ping, dns, speed) {
  let score = 100;
  if (ping !== null) {
    if (ping > 150) score -= 35;
    else if (ping > 80) score -= 20;
    else if (ping > 40) score -= 10;
  }
  if (dns !== null) {
    if (dns > 150) score -= 30;
    else if (dns > 80) score -= 15;
    else if (dns > 40) score -= 5;
  }
  if (speed !== null) {
    if (speed < 5) score -= 35;
    else if (speed < 15) score -= 20;
    else if (speed < 30) score -= 10;
  }
  score = Math.max(0, Math.min(100, score));

  let grade = "Good";
  let dotClass = "net-good";
  let pillClass = "net-pill-good";

  if (score >= 85) {
    grade = "Excellent";
    dotClass = "net-good";
    pillClass = "net-pill-good";
  } else if (score >= 65) {
    grade = "Good";
    dotClass = "net-good";
    pillClass = "net-pill-good";
  } else if (score >= 40) {
    grade = "Fair";
    dotClass = "net-fair";
    pillClass = "net-pill-fair";
  } else {
    grade = "Poor";
    dotClass = "net-poor";
    pillClass = "net-pill-poor";
  }

  return { score, grade, dotClass, pillClass };
}

function updateNetUI() {
  const { pingMs, pingAvg, pingMin, jitterMs, dnsAvgMs, dnsResults, speedMbps, cfPingMs, googlePingMs } = netState;
  const { score, grade, dotClass, pillClass } = calculateQualityGrade(pingAvg ?? pingMs, dnsAvgMs, speedMbps);

  if (netIndicatorDot && !netState.isTestingSpeed && !netState.isTestingAll) {
    netIndicatorDot.className = `net-indicator-dot ${dotClass}`;
  }
  if (netBadgePing) {
    netBadgePing.textContent = pingMs !== null ? `⚡ ${pingMs}ms` : "⚡ --ms";
  }
  if (netBadgeDns) {
    netBadgeDns.textContent = dnsAvgMs !== null ? `· DNS ${dnsAvgMs}ms` : "· DNS --ms";
  }
  if (netBadgeSpeed) {
    netBadgeSpeed.textContent = speedMbps !== null ? `· ${speedMbps} Mbps` : "· -- Mbps";
  }
  if (netBadgeLabel) {
    netBadgeLabel.textContent = grade;
  }

  if (netModalOverallPill) {
    netModalOverallPill.className = `net-pill ${pillClass}`;
    netModalOverallPill.textContent = `${grade === "Poor" ? "🔴" : grade === "Fair" ? "🟡" : "🟢"} ${grade}`;
  }

  if (netCardPing) {
    netCardPing.innerHTML = pingMs !== null ? `${pingMs} <small>ms</small>` : `-- <small>ms</small>`;
  }
  if (netCardPingSub) {
    const jitterText = jitterMs !== null ? `${jitterMs}ms` : "--ms";
    const avgText = pingAvg !== null ? `${pingAvg}ms` : "--ms";
    const minText = pingMin !== null ? `${pingMin}ms` : "--ms";
    netCardPingSub.textContent = `Jitter: ${jitterText} · Avg: ${avgText} · Min: ${minText}`;
  }

  if (netCardDns) {
    netCardDns.innerHTML = dnsAvgMs !== null ? `${dnsAvgMs} <small>ms</small>` : `-- <small>ms</small>`;
  }
  if (netCardDnsSub) {
    const statusText = dnsAvgMs === null ? "--" : dnsAvgMs < 40 ? "Fast ⚡" : dnsAvgMs < 100 ? "Normal" : "Slow";
    const resolverInfo = isLocal ? "Local OS Resolver" : "DoH Gateway";
    netCardDnsSub.textContent = `Status: ${statusText} · Resolver: ${resolverInfo}`;
  }

  if (netCardSpeed) {
    netCardSpeed.innerHTML = speedMbps !== null ? `${speedMbps} <small>Mbps</small>` : `-- <small>Mbps</small>`;
  }
  if (netCardSpeedSub) {
    const quality = speedMbps === null ? "--" : speedMbps > 50 ? "Ultra High 🚀" : speedMbps > 20 ? "High ⚡" : "Standard 📶";
    netCardSpeedSub.textContent = `Throughput: ${quality}`;
  }

  if (netCardQuality) {
    netCardQuality.textContent = grade;
  }
  if (netCardQualitySub) {
    netCardQualitySub.textContent = `Health Score: ${score} / 100`;
  }

  if (netPingGrade) {
    netPingGrade.textContent = pingMs !== null ? (pingMs < 30 ? "Fast 🟢" : pingMs < 80 ? "Good 🟡" : "High Latency 🔴") : "--";
  }
  if (pingRowLocal) {
    pingRowLocal.textContent = pingMs !== null ? `${pingMs} ms` : "-- ms";
  }
  if (pingTagLocal) {
    if (pingMs !== null) {
      pingTagLocal.className = `net-tag ${pingMs < 40 ? "net-tag-ok" : pingMs < 100 ? "net-tag-warn" : "net-tag-err"}`;
      pingTagLocal.textContent = pingMs < 40 ? "Low Latency" : pingMs < 100 ? "Moderate" : "High";
    }
  }

  if (pingRowCf) {
    pingRowCf.textContent = cfPingMs !== null ? `${cfPingMs} ms` : "-- ms";
  }
  if (pingTagCf) {
    if (cfPingMs !== null) {
      pingTagCf.className = `net-tag ${cfPingMs < 60 ? "net-tag-ok" : cfPingMs < 120 ? "net-tag-warn" : "net-tag-err"}`;
      pingTagCf.textContent = cfPingMs < 60 ? "Optimal" : "Reachable";
    }
  }

  if (pingRowGoogle) {
    pingRowGoogle.textContent = googlePingMs !== null ? `${googlePingMs} ms` : "-- ms";
  }
  if (pingTagGoogle) {
    if (googlePingMs !== null) {
      pingTagGoogle.className = `net-tag ${googlePingMs < 60 ? "net-tag-ok" : googlePingMs < 120 ? "net-tag-warn" : "net-tag-err"}`;
      pingTagGoogle.textContent = googlePingMs < 60 ? "Optimal" : "Reachable";
    }
  }

  if (netDnsGrade) {
    netDnsGrade.textContent = dnsAvgMs !== null ? (dnsAvgMs < 40 ? "Fast 🟢" : dnsAvgMs < 100 ? "Normal 🟡" : "Slow 🔴") : "--";
  }
  if (netDnsTableBody && dnsResults && dnsResults.length > 0) {
    netDnsTableBody.innerHTML = "";
    for (const item of dnsResults) {
      const tr = document.createElement("tr");
      const statusTagClass = !item.ok ? "net-tag-err" : item.durationMs < 30 ? "net-tag-ok" : item.durationMs < 80 ? "net-tag-warn" : "net-tag-err";
      const statusLabel = !item.ok ? "Failed ✗" : item.durationMs < 30 ? "Fast ⚡" : item.durationMs < 80 ? "Good" : "Slow";
      const ips = (item.addresses || []).join(", ") || (item.error ? `<span style="color:#ef4444">${item.error}</span>` : "--");
      const resolver = item.resolver || (isLocal ? "System DNS" : "Cloudflare / Google");

      tr.innerHTML = `
        <td><strong>${item.host}</strong> (${item.label || item.host})</td>
        <td>${resolver}</td>
        <td>${item.durationMs !== undefined ? item.durationMs + " ms" : "--"}</td>
        <td style="font-family:monospace; font-size:11px">${ips}</td>
        <td><span class="net-tag ${statusTagClass}">${statusLabel}</span></td>
      `;
      netDnsTableBody.appendChild(tr);
    }
  }

  if (netDiagConnectionType) {
    const conn = navigator.connection;
    const connType = conn ? `${conn.effectiveType || "Online"} (rtt ~${conn.rtt || "--"}ms)` : "Online";
    netDiagConnectionType.textContent = `Network: ${connType}`;
  }
  if (netDiagTimestamp) {
    netDiagTimestamp.textContent = `Last checked: ${new Date().toLocaleTimeString()}`;
  }
}

function copyNetworkReport() {
  const report = [
    "=== chromeTerminal Connection Diagnostic Report ===",
    `Timestamp: ${new Date().toISOString()}`,
    `Overall Quality: ${netCardQuality ? netCardQuality.textContent : "--"}`,
    `Ping (Local Server): ${netState.pingMs !== null ? netState.pingMs + "ms" : "--"} (Avg: ${netState.pingAvg || "--"}ms, Jitter: ${netState.jitterMs || "--"}ms)`,
    `Cloudflare CDN Ping: ${netState.cfPingMs !== null ? netState.cfPingMs + "ms" : "--"}`,
    `Google DNS Ping: ${netState.googlePingMs !== null ? netState.googlePingMs + "ms" : "--"}`,
    `DNS Resolution Avg: ${netState.dnsAvgMs !== null ? netState.dnsAvgMs + "ms" : "--"}`,
    `Download Bandwidth: ${netState.speedMbps !== null ? netState.speedMbps + " Mbps" : "--"}`,
    "",
    "--- DNS Lookups ---",
    ...(netState.dnsResults || []).map(
      (r) => `${r.host}: ${r.durationMs}ms (${r.ok ? (r.addresses || []).join(", ") : r.error})`
    ),
  ].join("\n");

  navigator.clipboard.writeText(report).then(() => {
    if (btnCopyNetDiag) {
      const orig = btnCopyNetDiag.textContent;
      btnCopyNetDiag.textContent = "✅ Copied!";
      setTimeout(() => {
        btnCopyNetDiag.textContent = orig;
      }, 2000);
    }
  });
}

function openPrompts() {
  promptsEl.hidden = false;
  renderPromptLibrary();
}

function closePrompts() {
  promptsEl.hidden = true;
  if (isLocal) term.focus();
}

function loadCustomPrompts() {
  try {
    const raw = JSON.parse(localStorage.getItem(CUSTOM_PROMPTS_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function saveCustomPrompts(list) {
  localStorage.setItem(CUSTOM_PROMPTS_KEY, JSON.stringify(list));
}

async function persistPromptToProject(prompt) {
  if (!isLocal) return;
  try {
    await fetch("/api/prompts-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prompt),
    });
  } catch {
    // browser-only fallback
  }
}

function allPrompts() {
  return [
    ...builtinPrompts.map((p) => ({ ...p, custom: false })),
    ...loadCustomPrompts().map((p) => ({ ...p, custom: true })),
  ];
}

function sendPrompt(text, submit) {
  closePrompts();
  sendInput(submit ? `${text}\n` : text);
}

function renderPromptLibrary() {
  promptListEl.replaceChildren();
  const items = allPrompts();
  if (!items.length) {
    promptListEl.textContent = "No prompts yet.";
    return;
  }
  for (const prompt of items) {
    const card = document.createElement("article");
    card.className = "prompt-card";
    const title = document.createElement("h3");
    title.textContent = `${prompt.emoji || "💬"} ${prompt.title}`;
    const body = document.createElement("pre");
    body.textContent = prompt.text;
    const row = document.createElement("div");
    row.className = "row";
    const insert = document.createElement("button");
    insert.type = "button";
    insert.textContent = "📥 Insert";
    insert.addEventListener("click", () => sendPrompt(prompt.text, false));
    const send = document.createElement("button");
    send.type = "button";
    send.className = "accent";
    send.textContent = "📤 Send";
    send.addEventListener("click", () => sendPrompt(prompt.text, true));
    row.append(insert, send);
    if (prompt.custom) {
      const del = document.createElement("button");
      del.type = "button";
      del.textContent = "🗑️ Remove";
      del.addEventListener("click", () => {
        saveCustomPrompts(loadCustomPrompts().filter((p) => p.id !== prompt.id));
        renderPromptLibrary();
      });
      row.append(del);
    }
    card.append(title, body, row);
    promptListEl.append(card);
  }
}

async function loadBuiltinPrompts() {
  builtinPrompts = [];
  for (const file of ["prompts.json", "prompts-user.json"]) {
    try {
      const res = await fetch(file);
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data)) builtinPrompts.push(...data);
    } catch {
      // missing file
    }
  }
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

  if (opts.reset) {
    sessionStorage.removeItem(SESSION_KEY);
    clearSessionAge();
  }

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
    if (msg.type === "session" && msg.id) {
      sessionStorage.setItem(SESSION_KEY, msg.id);
      startSessionAgeClock(msg.startedAt || Date.now());
    }
    if (msg.type === "cwd") {
      applyCwd(msg.path, msg.home);
      return;
    }
    if (msg.type === "pong") return;
    if (msg.type === "output") {
      term.write(msg.data);
      notePushOutput(msg.data);
    }
    if (msg.type === "exit") {
      sessionStorage.removeItem(SESSION_KEY);
      clearSessionAge();
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

function stripAnsi(text) {
  return String(text).replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "").replace(/\r/g, "");
}

function clearPushWatch() {
  if (pushWatch?.timer) clearTimeout(pushWatch.timer);
  pushWatch = null;
  const btn = document.getElementById("btn-commit-push-leave");
  if (btn) btn.disabled = false;
}

function notePushOutput(chunk) {
  if (!pushWatch) return;
  pushWatch.buf = (pushWatch.buf + stripAnsi(chunk)).slice(-8000);
  if (pushWatch.buf.includes(PUSH_OK)) {
    clearPushWatch();
    scheduleLeaveAfterPush();
    return;
  }
  if (pushWatch.buf.includes(PUSH_FAIL)) {
    clearPushWatch();
    setStatus("🔴 commit/push failed · still connected");
  }
}

function scheduleLeaveAfterPush() {
  const seconds = Math.round(PUSH_LEAVE_DELAY_MS / 1000);
  let left = seconds;
  setStatus(`🟢 pushed · leaving in ${left}s`);
  term.write(`\r\n\x1b[32m✅ commit push completed — closing in ${left}s\x1b[0m\r\n`);
  const tick = setInterval(() => {
    left -= 1;
    if (left <= 0) {
      clearInterval(tick);
      return;
    }
    setStatus(`🟢 pushed · leaving in ${left}s`);
  }, 1000);
  setTimeout(() => {
    clearInterval(tick);
    disconnectSession("commit push completed — left");
  }, PUSH_LEAVE_DELAY_MS);
}

function startCommitPushLeave() {
  if (!connected) return;
  const raw = (document.getElementById("commit-msg")?.value || "").trim() || "Update from chromeTerminal";
  const btn = document.getElementById("btn-commit-push-leave");
  if (btn) btn.disabled = true;
  setStatus("⏳ commit · push…");
  clearPushWatch();
  pushWatch = {
    buf: "",
    timer: setTimeout(() => {
      clearPushWatch();
      setStatus("🔴 commit/push timed out · still connected");
    }, PUSH_WAIT_MS),
  };
  sendCommand(
    `git add -A && git commit -m ${shellQuote(raw)} && git push origin HEAD && printf '%s\\n' ${shellQuote(PUSH_OK)} || printf '%s\\n' ${shellQuote(PUSH_FAIL)}`
  );
}

function disconnectSession(reason) {
  clearPushWatch();
  allowAutoResume = false;
  stopPing();
  sessionStorage.removeItem(SESSION_KEY);
  clearSessionAge();
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

function loadPinnedProjects() {
  try {
    const raw = JSON.parse(localStorage.getItem(PINNED_PROJECTS_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function savePinnedProjects(list) {
  localStorage.setItem(PINNED_PROJECTS_KEY, JSON.stringify(list));
}

function togglePinProject(name) {
  const list = loadPinnedProjects();
  const idx = list.indexOf(name);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.push(name);
  }
  savePinnedProjects(list);
  renderProjects();
}

function renderProjects() {
  const q = (projectFilter.value || "").trim().toLowerCase();
  const pinnedList = loadPinnedProjects();
  const pinnedSet = new Set(pinnedList);

  const filtered = catalog.projects.filter((p) => p.name.toLowerCase().includes(q));

  const matches = filtered.slice().sort((a, b) => {
    const aPinned = pinnedSet.has(a.name);
    const bPinned = pinnedSet.has(b.name);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    if (aPinned && bPinned) {
      return pinnedList.indexOf(a.name) - pinnedList.indexOf(b.name);
    }
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
    const isPinned = pinnedSet.has(project.name);

    const chip = document.createElement("div");
    chip.className = `project-chip ${isPinned ? "pinned" : ""}`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "project-chip-btn";
    btn.textContent = `${isPinned ? "📌" : "📁"} ${project.name}`;
    btn.title = project.mtimeMs
      ? `${project.path} · ${new Date(project.mtimeMs).toLocaleString()}`
      : project.path;
    btn.addEventListener("click", () => cdTo(project.path, project.name));

    const pinBtn = document.createElement("button");
    pinBtn.type = "button";
    pinBtn.className = `project-pin-toggle ${isPinned ? "pinned" : ""}`;
    pinBtn.title = isPinned ? `Unpin ${project.name}` : `Pin ${project.name} to top`;
    pinBtn.innerHTML = isPinned ? "★" : "☆";
    pinBtn.setAttribute("aria-label", isPinned ? `Unpin ${project.name}` : `Pin ${project.name}`);
    pinBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePinProject(project.name);
    });

    chip.append(btn, pinBtn);
    projectBar.append(chip);
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
    const badge = btn.getAttribute("data-cd") === "$HOME" ? "home" : target;
    cdTo(target, badge);
  });
});

document.getElementById("btn-projects").addEventListener("click", () => {
  cdTo(catalog.projectsDir || `${catalog.home}/projects`, "projects");
});

document.getElementById("btn-last-project").addEventListener("click", goLastProject);

document.querySelectorAll("[data-run]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const cmd = btn.getAttribute("data-run");
    sendCommand(cmd);
    if (cmd) setWatermark(cmd);
  });
});

document.querySelectorAll("[data-key]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-key");
    if (key === "tab") sendInput("\t");
    if (key === "shift-tab") sendInput("\x1b[Z");
  });
});

let audioCtx = null;
let pick1Streak = 0;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(ctx, { type, freq, freqTo, start, duration, gain }) {
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (freqTo) osc.frequency.exponentialRampToValueAtTime(freqTo, start + duration * 0.45);
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(gain, start + 0.015);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(amp);
  amp.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function playChaChing() {
  try {
    const ctx = getAudioCtx();
    ctx.resume();
    const t = ctx.currentTime;
    playTone(ctx, { type: "triangle", freq: 880, freqTo: 1318.5, start: t, duration: 0.18, gain: 0.28 });
    playTone(ctx, { type: "square", freq: 1174.7, freqTo: 1760, start: t + 0.09, duration: 0.28, gain: 0.16 });
    playTone(ctx, { type: "sine", freq: 1975.5, freqTo: 2793.8, start: t + 0.16, duration: 0.42, gain: 0.22 });
    playTone(ctx, { type: "sine", freq: 2349, freqTo: 3136, start: t + 0.28, duration: 0.35, gain: 0.12 });
  } catch {
    /* no audio */
  }
}

function celebratePick1(btn) {
  pick1Streak += 1;
  playChaChing();
  btn.classList.remove("chaching-pop");
  void btn.offsetWidth;
  btn.classList.add("chaching-pop");
  window.setTimeout(() => btn.classList.remove("chaching-pop"), 560);

  const layer = document.getElementById("chaching-fx");
  if (!layer) return;
  const rect = btn.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  layer.style.setProperty("--fx-x", `${x}px`);
  layer.style.setProperty("--fx-y", `${y}px`);
  layer.classList.remove("flash");
  void layer.offsetWidth;
  layer.classList.add("flash");
  window.setTimeout(() => layer.classList.remove("flash"), 700);

  const glyphs = ["💰", "🪙", "✨", "💵", "⭐"];
  for (let i = 0; i < 12; i++) {
    const coin = document.createElement("span");
    coin.className = "chaching-coin";
    coin.textContent = glyphs[i % glyphs.length];
    const dx = (Math.random() - 0.5) * 220;
    const dy = -80 - Math.random() * 180;
    const spin = `${(Math.random() - 0.5) * 420}deg`;
    coin.style.left = `${x - 11}px`;
    coin.style.top = `${y - 11}px`;
    coin.style.setProperty("--dx", `${dx}px`);
    coin.style.setProperty("--dy", `${dy}px`);
    coin.style.setProperty("--spin", spin);
    coin.style.animationDuration = `${0.7 + Math.random() * 0.35}s`;
    layer.append(coin);
    coin.addEventListener("animationend", () => coin.remove());
  }

  const banner = document.createElement("div");
  banner.className = "chaching-banner";
  banner.textContent = pick1Streak > 1 ? `CHA-CHING ×${pick1Streak}` : "CHA-CHING!";
  layer.append(banner);
  banner.addEventListener("animationend", () => banner.remove());
}

document.querySelectorAll("[data-choice]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const n = btn.getAttribute("data-choice");
    if (!n) return;
    sendInput(`${n}\n`);
    if (n === "1") celebratePick1(btn);
  });
});

if (dictateBtn) {
  dictateBtn.addEventListener("click", () => {
    if (dictating) stopDictation();
    else startDictation();
  });
}

document.getElementById("btn-commit-push-leave").addEventListener("click", startCommitPushLeave);
document.getElementById("commit-msg").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    startCommitPushLeave();
  }
});

document.getElementById("btn-watermark-set").addEventListener("click", () => {
  setWatermark(watermarkInput.value);
});
document.getElementById("btn-watermark-clear").addEventListener("click", () => setWatermark(""));
watermarkInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    setWatermark(watermarkInput.value);
    term.focus();
  }
});

projectFilter.addEventListener("input", renderProjects);
document.getElementById("btn-sort-name").addEventListener("click", () => setProjectSort("name"));
document.getElementById("btn-sort-latest").addEventListener("click", () => setProjectSort("latest"));
guideBtn.addEventListener("click", openGuide);
guideClose.addEventListener("click", closeGuide);
guideEl.addEventListener("click", (event) => {
  if (event.target === guideEl) closeGuide();
});

if (netQualityBadge) netQualityBadge.addEventListener("click", openNetModal);
if (btnNetModal) btnNetModal.addEventListener("click", openNetModal);
if (netModalClose) netModalClose.addEventListener("click", closeNetModal);
if (netModalEl) {
  netModalEl.addEventListener("click", (event) => {
    if (event.target === netModalEl) closeNetModal();
  });
}
if (btnRunSpeedTest) btnRunSpeedTest.addEventListener("click", runSpeedTest);
if (btnRetestAll) btnRetestAll.addEventListener("click", runAllNetworkTests);
if (btnCopyNetDiag) btnCopyNetDiag.addEventListener("click", copyNetworkReport);

promptsBtn.addEventListener("click", openPrompts);
promptsClose.addEventListener("click", closePrompts);
promptsEl.addEventListener("click", (event) => {
  if (event.target === promptsEl) closePrompts();
});
document.getElementById("prompt-add").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("prompt-new-title").value.trim();
  const text = document.getElementById("prompt-new-text").value.trim();
  if (!title || !text) return;
  const prompt = { id: "c-" + Date.now(), emoji: "💬", title, text };
  const list = loadCustomPrompts();
  list.push(prompt);
  saveCustomPrompts(list);
  persistPromptToProject(prompt);
  document.getElementById("prompt-add").reset();
  renderPromptLibrary();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (dictating) {
    stopDictation();
    return;
  }
  if (netModalEl && !netModalEl.hidden) {
    closeNetModal();
    return;
  }
  if (!promptsEl.hidden) {
    closePrompts();
    return;
  }
  if (!guideEl.hidden) closeGuide();
});

function loadPanelState() {
  try {
    const raw = JSON.parse(localStorage.getItem(PANELS_KEY) || "{}");
    return Object.fromEntries(PANEL_IDS.map((id) => [id, raw[id] !== false]));
  } catch {
    return Object.fromEntries(PANEL_IDS.map((id) => [id, true]));
  }
}

function savePanelState(state) {
  localStorage.setItem(PANELS_KEY, JSON.stringify(state));
}

function applyPanelState(state) {
  for (const id of PANEL_IDS) {
    const el = document.querySelector(`[data-panel="${id}"]`);
    const on = state[id] !== false;
    if (el) el.classList.toggle("collapsed", !on);
    document.querySelectorAll(`[data-panel-toggle="${id}"]`).forEach((btn) => {
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }
  fit();
}

function togglePanel(id) {
  const state = loadPanelState();
  state[id] = !state[id];
  savePanelState(state);
  applyPanelState(state);
}

function setAllPanels(on) {
  const state = Object.fromEntries(PANEL_IDS.map((id) => [id, on]));
  savePanelState(state);
  applyPanelState(state);
}

function isFullscreen() {
  return Boolean(document.fullscreenElement);
}

async function toggleFullscreen() {
  const root = document.querySelector(".chrome");
  try {
    if (isFullscreen()) await document.exitFullscreen();
    else await root.requestFullscreen();
  } catch (err) {
    setStatus("🔴 fullscreen: " + err.message);
  }
}

function syncFullscreenButton() {
  const btn = document.getElementById("btn-fullscreen");
  if (!btn) return;
  btn.textContent = isFullscreen() ? "⛶ Exit full" : "⛶ Fullscreen";
}

document.getElementById("panel-dock").addEventListener("click", (event) => {
  const btn = event.target.closest("[data-panel-toggle]");
  if (!btn) return;
  togglePanel(btn.getAttribute("data-panel-toggle"));
});

document.addEventListener("click", (event) => {
  const closeBtn = event.target.closest("[data-panel-close]");
  if (!closeBtn) return;
  const id = closeBtn.getAttribute("data-panel-close");
  const state = loadPanelState();
  state[id] = false;
  savePanelState(state);
  applyPanelState(state);
});

document.getElementById("btn-collapse-all").addEventListener("click", () => setAllPanels(false));
document.getElementById("btn-expand-all").addEventListener("click", () => setAllPanels(true));

document.getElementById("btn-focus").addEventListener("click", () => {
  const anyOpen = PANEL_IDS.some((id) => loadPanelState()[id]);
  setAllPanels(!anyOpen);
});

document.getElementById("btn-fullscreen").addEventListener("click", () => {
  toggleFullscreen();
});

document.addEventListener("fullscreenchange", () => {
  syncFullscreenButton();
  fit();
});

window.addEventListener("load", () => {
  originLabel.textContent = isLocal ? "🔒 localhost" : "📄 GitHub Pages";
  renderThemes();
  applyTheme(localStorage.getItem(THEME_KEY) || "night");
  setProjectSort(projectSort);
  setWatermark(sessionStorage.getItem(WATERMARK_KEY) || "", false);
  applyPanelState(loadPanelState());
  loadBuiltinPrompts();
  syncFullscreenButton();
  renderSessionAge();
  if (sessionStartedAt) startSessionAgeClock(sessionStartedAt);
  fit();
  connect();
  loadProjects().catch((err) => {
    projectBar.textContent = err.message;
  });
  checkPing();
  checkDns();
  setInterval(checkPing, 8000);
  if (!isLocal) openGuide();
});
