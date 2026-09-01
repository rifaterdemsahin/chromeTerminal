const statusEl = document.getElementById("status");
const originLabel = document.getElementById("origin-label");
const pwdEl = document.getElementById("pwd-label");
const sessionAgeEl = document.getElementById("session-age");
const sessionWidgetEl = document.getElementById("session-widget");
const sessionAgentEl = document.getElementById("session-agent");
const sessionElapsedEl = document.getElementById("session-elapsed");
const sessionLastActionEl = document.getElementById("session-last-action");
const btnRerunAgent = document.getElementById("btn-rerun-agent");
const btnStopAgent = document.getElementById("btn-stop-agent");
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
const btnBadgeEmoji = document.getElementById("btn-badge-emoji");
const emojiPickerModal = document.getElementById("emoji-picker-modal");
const emojiPickerClose = document.getElementById("emoji-picker-close");
const emojiSearchInput = document.getElementById("emoji-search-input");
const emojiCatTabs = document.getElementById("emoji-cat-tabs");
const emojiPickerContent = document.getElementById("emoji-picker-content");
const btnEmojiClearBadge = document.getElementById("btn-emoji-clear-badge");

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

const azureSyncBadge = document.getElementById("azure-sync-badge");
const azureSyncDot = document.getElementById("azure-sync-dot");
const azureSyncBadgeText = document.getElementById("azure-sync-badge-text");
const btnAzureModal = document.getElementById("btn-azure-modal");
const azureSyncModal = document.getElementById("azure-sync-modal");
const azureSyncClose = document.getElementById("azure-sync-close");
const azureSyncModalBadge = document.getElementById("azure-sync-modal-badge");
const azureKvName = document.getElementById("azure-kv-name");
const azureStorageAcc = document.getElementById("azure-storage-acc");
const azureStorageCont = document.getElementById("azure-storage-cont");
const azureBlobName = document.getElementById("azure-blob-name");
const azureLastSynced = document.getElementById("azure-last-synced");
const azureProjectCount = document.getElementById("azure-project-count");
const btnModalSyncAll = document.getElementById("btn-modal-sync-all");
const btnModalAssignPorts = document.getElementById("btn-modal-assign-ports");
const btnModalPullAzure = document.getElementById("btn-modal-pull-azure");
const btnModalPushAzure = document.getElementById("btn-modal-push-azure");
const azureProjectSearch = document.getElementById("azure-project-search");
const azureProjectsTbody = document.getElementById("azure-projects-tbody");
const btnAssignPortsMenu = document.getElementById("btn-assign-ports-menu");
const btnSyncAzureMenu = document.getElementById("btn-sync-azure-menu");
const btnAgentMainPage = document.getElementById("btn-agent-main-page");

// Second Brain Panel
const btnSbCd = document.getElementById("btn-sb-cd");
const btnSbAgy = document.getElementById("btn-sb-agy");
const btnSbGrok = document.getElementById("btn-sb-grok");
const btnSbClaude = document.getElementById("btn-sb-claude");
const btnSbDeepseek = document.getElementById("btn-sb-deepseek");
const btnSbPap = document.getElementById("btn-sb-pap");
const btnSbPull = document.getElementById("btn-sb-pull");
const btnSbPush = document.getElementById("btn-sb-push");
const btnSbArchive = document.getElementById("btn-sb-archive");
const btnSbLaunchDashboard = document.getElementById("btn-sb-launch-dashboard");

// Test Panel
const btnTestingSpeedModal = document.getElementById("btn-testing-speed-modal");
const btnTestingRunSpeed = document.getElementById("btn-testing-run-speed");
const btnTestingRetestAll = document.getElementById("btn-testing-retest-all");
const testingNetSummaryChip = document.getElementById("testing-net-summary-chip");

const btnTestAzureModal = document.getElementById("btn-test-azure-modal");
const btnTestAzureSyncAll = document.getElementById("btn-test-azure-sync-all");
const btnTestAzurePull = document.getElementById("btn-test-azure-pull");
const btnTestAzurePush = document.getElementById("btn-test-azure-push");
const btnTestAssignPorts = document.getElementById("btn-test-assign-ports");
const testingAzureSummaryChip = document.getElementById("testing-azure-summary-chip");

const btnTestingCheckAi = document.getElementById("btn-testing-check-ai");
const btnTestSendHello = document.getElementById("btn-test-send-hello");
const testingAiSummaryChip = document.getElementById("testing-ai-summary-chip");

const btnTestingCheckInfra = document.getElementById("btn-testing-check-infra");
const btnOpenProxmox = document.getElementById("btn-open-proxmox");
const btnOpenN8n = document.getElementById("btn-open-n8n");
const testingInfraSummaryChip = document.getElementById("testing-infra-summary-chip");

// AI Test Modal
const aiTestModal = document.getElementById("ai-test-modal");
const aiTestModalClose = document.getElementById("ai-test-modal-close");
const aiTestModalPill = document.getElementById("ai-test-modal-pill");
const aiOverviewCards = document.getElementById("ai-overview-cards");
const aiToolsTableTbody = document.getElementById("ai-tools-table-tbody");
const aiTableTbody = document.getElementById("ai-table-tbody");
const aiDiagTimestamp = document.getElementById("ai-diag-timestamp");
const btnRetestAiModal = document.getElementById("btn-retest-ai-modal");
const btnModalSendHello = document.getElementById("btn-modal-send-hello");
const btnCopyAiDiag = document.getElementById("btn-copy-ai-diag");
const aiMiniTermGrid = document.getElementById("ai-mini-term-grid");

// Infra Test Modal
const infraTestModal = document.getElementById("infra-test-modal");
const infraTestModalClose = document.getElementById("infra-test-modal-close");
const infraTestModalPill = document.getElementById("infra-test-modal-pill");
const infraOverviewCards = document.getElementById("infra-overview-cards");
const infraTableTbody = document.getElementById("infra-table-tbody");
const infraDiagTimestamp = document.getElementById("infra-diag-timestamp");
const btnRetestInfraModal = document.getElementById("btn-retest-infra-modal");
const btnCopyInfraDiag = document.getElementById("btn-copy-infra-diag");

let azureSyncState = null;
let projectStatesCatalog = {};
let currentCwdPath = "";

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
const ACTIVE_AGENT_KEY = "chromeTerminal.activeAgent";
const AGENT_STARTED_KEY = "chromeTerminal.agentStartedAt";
const LAST_RUN_KEY = "chromeTerminal.lastRun";

const PANELS_KEY = "chromeTerminal.panels";
const CUSTOM_PROMPTS_KEY = "chromeTerminal.customPrompts";
const PINNED_PROJECTS_KEY = "chromeTerminal.pinnedProjects";
const PANEL_IDS = ["menu", "projects", "agents", "secondbrain", "test", "testing", "badge", "theme", "help", "blurb"];
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

let activeAgent = sessionStorage.getItem(ACTIVE_AGENT_KEY) || "";
let agentStartedAt = Number(sessionStorage.getItem(AGENT_STARTED_KEY)) || 0;
let lastActionAt = 0;
// "Rerun last" state: kept in localStorage (survives browser restarts, unlike sessionStorage)
// and mirrored to the server's project-states file, which rides the existing Azure Sync
// Pull/Push flow — so the last-run command follows you to another machine too.
let lastRunCmd = "";
let lastRunBadge = "";
let lastRunFolder = "";
let lastRunProject = "";
let lastRunSavedAt = "";
try {
  const savedLastRun = JSON.parse(localStorage.getItem(LAST_RUN_KEY) || "null");
  if (savedLastRun && savedLastRun.cmd) {
    lastRunCmd = savedLastRun.cmd;
    lastRunBadge = savedLastRun.badge || "";
    lastRunFolder = savedLastRun.folder || "";
    lastRunProject = savedLastRun.project || "";
    lastRunSavedAt = savedLastRun.savedAt || "";
  }
} catch {
  /* ignore malformed storage */
}
let sessionWidgetTimer = 0;

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

function formatElapsedShort(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  if (totalSec < 60) return `${totalSec}s`;
  const totalMin = Math.floor(totalSec / 60);
  if (totalMin < 60) return `${totalMin}m ${totalSec % 60}s`;
  const hours = Math.floor(totalMin / 60);
  return `${hours}h ${totalMin % 60}m`;
}

function renderSessionWidget() {
  if (!sessionWidgetEl) return;
  const hasAgent = Boolean(activeAgent && agentStartedAt);
  sessionWidgetEl.classList.toggle("idle", !hasAgent);
  sessionAgentEl.textContent = hasAgent ? `🤖 ${activeAgent}` : "— none running —";
  sessionElapsedEl.textContent = hasAgent ? `running ${formatElapsedShort(Date.now() - agentStartedAt)}` : "";
  sessionElapsedEl.title = hasAgent ? `Launched at ${new Date(agentStartedAt).toLocaleTimeString()}` : "";
  sessionLastActionEl.textContent = lastActionAt ? `last output ${formatElapsedShort(Date.now() - lastActionAt)} ago` : "no output yet";
  if (btnRerunAgent) {
    btnRerunAgent.disabled = !lastRunCmd;
    if (lastRunCmd) {
      const where = lastRunProject
        ? `${lastRunProject} (${prettyPath(lastRunFolder)})`
        : lastRunFolder
        ? prettyPath(lastRunFolder)
        : "";
      btnRerunAgent.title = `Re-run ${lastRunBadge ? `${lastRunBadge} ` : ""}${where ? `in ${where} ` : ""}— ${lastRunCmd}`;
    } else {
      btnRerunAgent.title = "Re-run the last agent or command that was launched";
    }
  }
  if (btnStopAgent) btnStopAgent.disabled = !connected;
}

function startSessionWidgetClock() {
  renderSessionWidget();
  if (sessionWidgetTimer) return;
  sessionWidgetTimer = window.setInterval(renderSessionWidget, 5000);
}

function findProjectNameForPath(folderPath) {
  if (!folderPath || !Array.isArray(catalog.projects)) return "";
  const match = catalog.projects.find((p) => p.path === folderPath);
  return match ? match.name : "";
}

function saveLastRun(cmd, badge, folder) {
  lastRunCmd = cmd;
  lastRunBadge = badge || "";
  lastRunFolder = folder || "";
  lastRunProject = findProjectNameForPath(lastRunFolder);
  lastRunSavedAt = new Date().toISOString();
  localStorage.setItem(
    LAST_RUN_KEY,
    JSON.stringify({
      cmd: lastRunCmd,
      badge: lastRunBadge,
      folder: lastRunFolder,
      project: lastRunProject,
      savedAt: lastRunSavedAt,
    })
  );
  if (isLocal) {
    const token = tokenFromUrl();
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    fetch(`/api/last-run${q}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cmd: lastRunCmd,
        badge: lastRunBadge,
        folder: lastRunFolder,
        project: lastRunProject,
      }),
    }).catch((err) => console.warn("[last-run] Save failed:", err));
  }
}

async function hydrateLastRunFromServer() {
  if (!isLocal) return;
  try {
    const token = tokenFromUrl();
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    const res = await fetch(`/api/last-run${q}`);
    if (!res.ok) return;
    const data = await res.json();
    const remote = data && data.lastRun;
    if (!remote || !remote.cmd) return;
    const remoteAt = Date.parse(remote.savedAt || "") || 0;
    const localAt = Date.parse(lastRunSavedAt || "") || 0;
    if (remoteAt > localAt) {
      lastRunCmd = remote.cmd;
      lastRunBadge = remote.badge || "";
      lastRunFolder = remote.folder || "";
      lastRunProject = remote.project || "";
      lastRunSavedAt = remote.savedAt || "";
      localStorage.setItem(
        LAST_RUN_KEY,
        JSON.stringify({
          cmd: lastRunCmd,
          badge: lastRunBadge,
          folder: lastRunFolder,
          project: lastRunProject,
          savedAt: lastRunSavedAt,
        })
      );
      renderSessionWidget();
    }
  } catch (err) {
    console.warn("[last-run] Hydrate failed:", err);
  }
}

function setActiveAgent(label, cmd, folder) {
  activeAgent = label || "";
  agentStartedAt = activeAgent ? Date.now() : 0;
  lastActionAt = Date.now();
  if (activeAgent) {
    sessionStorage.setItem(ACTIVE_AGENT_KEY, activeAgent);
    sessionStorage.setItem(AGENT_STARTED_KEY, String(agentStartedAt));
  } else {
    sessionStorage.removeItem(ACTIVE_AGENT_KEY);
    sessionStorage.removeItem(AGENT_STARTED_KEY);
  }
  if (cmd) {
    saveLastRun(cmd, activeAgent, folder !== undefined ? folder : currentCwdPath);
  }
  renderSessionWidget();
}

function noteActivity() {
  lastActionAt = Date.now();
}

function rerunLastAgent() {
  if (!lastRunCmd) return;
  const fullCmd = lastRunFolder ? `cd ${shellQuote(lastRunFolder)} && ${lastRunCmd}` : lastRunCmd;
  sendCommand(fullCmd);
  if (lastRunBadge) setWatermark(lastRunBadge);
  setActiveAgent(lastRunBadge, lastRunCmd, lastRunFolder);
}

function stopRunningAgent() {
  if (!connected) return;
  sendInput("\x03");
  noteActivity();
  renderSessionWidget();
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

// Some CLIs (Claude Code's TUI) enable xterm mouse-motion tracking (DECSET 1000/1002/1003 +
// SGR 1006). xterm.js then reports every mouse move over the terminal back through onData —
// the same channel as keystrokes — which floods the app's stdin with reports like
// "\x1b[<35;51;12M" whenever the cursor merely passes over the terminal. This app has no use
// for mouse reporting (no click-to-position, no drag-select forwarding), so strip it here.
const SGR_MOUSE_RE = /\x1b\[<\d{1,3};\d{1,4};\d{1,4}[Mm]/g;
const X10_MOUSE_RE = /\x1b\[M[\s\S]{3}/g;

function stripMouseReports(data) {
  return data.replace(SGR_MOUSE_RE, "").replace(X10_MOUSE_RE, "");
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
  currentCwdPath = abs || "";
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

const RECENT_EMOJIS_KEY = "chromeTerminal.recentEmojis";
const DEFAULT_RECENT_EMOJIS = ["🤖", "🚀", "✨", "💻", "🔥", "⚡", "🛠️", "🎯", "🐛", "🧪", "🔒", "🌐"];

const EMOJI_CATEGORIES = {
  dev: "💻 Dev & Tech",
  smileys: "😀 Mood & Smileys",
  objects: "🎯 Objects & Symbols",
  nature: "🌿 Nature & Food",
  status: "🚩 Status & Shapes",
};

const EMOJI_DATABASE = [
  // Dev & Tech
  { emoji: "💻", name: "Laptop", keywords: ["laptop", "computer", "dev", "code", "programming", "work", "pc"], cat: "dev" },
  { emoji: "🖥️", name: "Desktop", keywords: ["desktop", "screen", "monitor", "display", "imac", "mac"], cat: "dev" },
  { emoji: "📱", name: "Phone", keywords: ["phone", "mobile", "ios", "iphone", "android"], cat: "dev" },
  { emoji: "⌨️", name: "Keyboard", keywords: ["keyboard", "typing", "keys", "input"], cat: "dev" },
  { emoji: "🖱️", name: "Mouse", keywords: ["mouse", "click", "trackpad"], cat: "dev" },
  { emoji: "⚡", name: "Lightning", keywords: ["lightning", "fast", "speed", "quick", "energy", "power", "vite"], cat: "dev" },
  { emoji: "🚀", name: "Rocket", keywords: ["rocket", "launch", "deploy", "ship", "fast", "space", "prod"], cat: "dev" },
  { emoji: "🤖", name: "Robot", keywords: ["robot", "bot", "ai", "grok", "agent", "llm", "automation"], cat: "dev" },
  { emoji: "✨", name: "Sparkles", keywords: ["sparkles", "magic", "agy", "clean", "new", "star", "awesome"], cat: "dev" },
  { emoji: "🛠️", name: "Tools", keywords: ["tools", "build", "config", "wrench", "settings", "fix"], cat: "dev" },
  { emoji: "🔧", name: "Wrench", keywords: ["wrench", "fix", "repair", "tool", "config"], cat: "dev" },
  { emoji: "🔨", name: "Hammer", keywords: ["hammer", "build", "construction", "make"], cat: "dev" },
  { emoji: "📦", name: "Package", keywords: ["package", "npm", "module", "box", "bundle", "cargo"], cat: "dev" },
  { emoji: "📁", name: "Folder", keywords: ["folder", "directory", "project", "dir", "files"], cat: "dev" },
  { emoji: "📂", name: "Open Folder", keywords: ["folder", "open", "directory", "projects"], cat: "dev" },
  { emoji: "💾", name: "Disk", keywords: ["disk", "save", "floppy", "storage", "memory"], cat: "dev" },
  { emoji: "💿", name: "Optical Disk", keywords: ["cd", "dvd", "iso", "disk", "media"], cat: "dev" },
  { emoji: "📡", name: "Satellite", keywords: ["satellite", "network", "signal", "wifi", "connect", "radar"], cat: "dev" },
  { emoji: "🔒", name: "Lock", keywords: ["lock", "security", "auth", "token", "private", "secure"], cat: "dev" },
  { emoji: "🔑", name: "Key", keywords: ["key", "secret", "access", "ssh", "auth"], cat: "dev" },
  { emoji: "🛡️", name: "Shield", keywords: ["shield", "security", "protect", "defense", "guard"], cat: "dev" },
  { emoji: "🐛", name: "Bug", keywords: ["bug", "debug", "issue", "error", "fix", "insect"], cat: "dev" },
  { emoji: "🧪", name: "Test Tube", keywords: ["test", "experiment", "lab", "trial", "unit test", "qa"], cat: "dev" },
  { emoji: "🔬", name: "Microscope", keywords: ["microscope", "research", "investigate", "deep", "analyze"], cat: "dev" },
  { emoji: "⚙️", name: "Gear", keywords: ["gear", "settings", "options", "engine", "system", "config"], cat: "dev" },
  { emoji: "🔌", name: "Plug", keywords: ["plug", "connect", "adapter", "socket", "port"], cat: "dev" },
  { emoji: "🔋", name: "Battery", keywords: ["battery", "power", "energy", "charge"], cat: "dev" },
  { emoji: "🌐", name: "Globe", keywords: ["globe", "web", "internet", "online", "network", "dns", "http"], cat: "dev" },
  { emoji: "🧭", name: "Compass", keywords: ["compass", "navigation", "explore", "route", "direction"], cat: "dev" },
  { emoji: "🐳", name: "Whale / Docker", keywords: ["whale", "docker", "container", "devops"], cat: "dev" },
  { emoji: "🐍", name: "Snake / Python", keywords: ["snake", "python", "py", "script"], cat: "dev" },
  { emoji: "🦀", name: "Crab / Rust", keywords: ["crab", "rust", "ferris", "cargo"], cat: "dev" },
  { emoji: "⚛️", name: "Atom / React", keywords: ["atom", "react", "science", "physics", "frontend"], cat: "dev" },
  { emoji: "☕", name: "Coffee / Java", keywords: ["coffee", "java", "drink", "break", "code"], cat: "dev" },
  { emoji: "🍺", name: "Beer / Brew", keywords: ["beer", "brew", "homebrew", "toast"], cat: "dev" },
  { emoji: "🎨", name: "Palette", keywords: ["palette", "theme", "design", "css", "color", "style", "ui"], cat: "dev" },
  { emoji: "📝", name: "Memo", keywords: ["memo", "note", "doc", "readme", "write", "text"], cat: "dev" },
  { emoji: "📊", name: "Bar Chart", keywords: ["chart", "stats", "metrics", "graph", "analytics"], cat: "dev" },
  { emoji: "📈", name: "Trending Up", keywords: ["growth", "up", "chart", "profit", "speed", "metric"], cat: "dev" },
  { emoji: "💡", name: "Idea", keywords: ["idea", "lightbulb", "smart", "solution", "tip"], cat: "dev" },

  // Smileys & Mood
  { emoji: "😀", name: "Grinning", keywords: ["smile", "happy", "grin", "mood"], cat: "smileys" },
  { emoji: "😃", name: "Smiling", keywords: ["smile", "happy", "joy"], cat: "smileys" },
  { emoji: "😄", name: "Laughing", keywords: ["laugh", "happy", "cheerful"], cat: "smileys" },
  { emoji: "😁", name: "Beaming", keywords: ["beam", "grin", "teeth"], cat: "smileys" },
  { emoji: "😆", name: "Grinning Squinting", keywords: ["laugh", "fun", "lol"], cat: "smileys" },
  { emoji: "😅", name: "Sweat Smile", keywords: ["sweat", "nervous", "relief", "whew"], cat: "smileys" },
  { emoji: "😂", name: "Joy", keywords: ["laugh", "crying laughing", "lol", "rofl"], cat: "smileys" },
  { emoji: "🤣", name: "ROFL", keywords: ["rofl", "rolling", "laughing"], cat: "smileys" },
  { emoji: "😊", name: "Blushing Smile", keywords: ["smile", "warm", "nice"], cat: "smileys" },
  { emoji: "😇", name: "Halo", keywords: ["angel", "good", "halo", "innocent"], cat: "smileys" },
  { emoji: "🙂", name: "Slight Smile", keywords: ["smile", "fine", "ok"], cat: "smileys" },
  { emoji: "🙃", name: "Upside Down", keywords: ["upside down", "silly", "sarcasm"], cat: "smileys" },
  { emoji: "😉", name: "Wink", keywords: ["wink", "flirt", "secret"], cat: "smileys" },
  { emoji: "😌", name: "Relieved", keywords: ["relief", "calm", "zen", "peace"], cat: "smileys" },
  { emoji: "😍", name: "Heart Eyes", keywords: ["love", "heart", "crush", "adoring"], cat: "smileys" },
  { emoji: "🥰", name: "Hearts", keywords: ["love", "affection", "warm"], cat: "smileys" },
  { emoji: "😎", name: "Cool Sunglasses", keywords: ["cool", "sunglasses", "swag", "boss"], cat: "smileys" },
  { emoji: "🤓", name: "Nerd", keywords: ["nerd", "geek", "glasses", "smart", "code"], cat: "smileys" },
  { emoji: "🧐", name: "Monocle", keywords: ["monocle", "curious", "inspect", "investigate", "hm"], cat: "smileys" },
  { emoji: "🥳", name: "Partying", keywords: ["party", "celebrate", "birthday", "yay"], cat: "smileys" },
  { emoji: "🤠", name: "Cowboy", keywords: ["cowboy", "wild", "yeehaw"], cat: "smileys" },
  { emoji: "👾", name: "Alien Monster", keywords: ["game", "retro", "invader", "pixel", "arcade"], cat: "smileys" },
  { emoji: "👻", name: "Ghost", keywords: ["ghost", "spooky", "boo", "halloween"], cat: "smileys" },
  { emoji: "💀", name: "Skull", keywords: ["skull", "dead", "skeleton", "danger"], cat: "smileys" },
  { emoji: "👽", name: "Alien", keywords: ["alien", "ufo", "space", "sci-fi"], cat: "smileys" },
  { emoji: "🦾", name: "Mechanical Arm", keywords: ["robot", "cyborg", "prosthetic", "tech", "strength"], cat: "smileys" },
  { emoji: "🧠", name: "Brain", keywords: ["brain", "smart", "think", "intellect", "ai", "mind"], cat: "smileys" },
  { emoji: "👑", name: "Crown", keywords: ["crown", "king", "queen", "vip", "royal", "winner"], cat: "smileys" },
  { emoji: "🔥", name: "Fire", keywords: ["fire", "flame", "hot", "lit", "trendy", "burn"], cat: "smileys" },
  { emoji: "💯", name: "100", keywords: ["hundred", "perfect", "score", "top"], cat: "smileys" },
  { emoji: "🎉", name: "Tada", keywords: ["party", "popper", "tada", "congrats", "celebrate"], cat: "smileys" },
  { emoji: "🎊", name: "Confetti", keywords: ["confetti", "ball", "celebration"], cat: "smileys" },

  // Objects & Symbols
  { emoji: "🎯", name: "Direct Hit", keywords: ["target", "bullseye", "goal", "aim", "focus"], cat: "objects" },
  { emoji: "🏷️", name: "Label", keywords: ["label", "tag", "badge", "mark", "ticket"], cat: "objects" },
  { emoji: "📌", name: "Pushpin", keywords: ["pin", "pinned", "mark", "note"], cat: "objects" },
  { emoji: "📍", name: "Round Pin", keywords: ["pin", "location", "place", "map"], cat: "objects" },
  { emoji: "🚩", name: "Triangular Flag", keywords: ["flag", "red", "marker", "milestone"], cat: "objects" },
  { emoji: "🏁", name: "Chequered Flag", keywords: ["finish", "race", "done", "complete"], cat: "objects" },
  { emoji: "🏆", name: "Trophy", keywords: ["trophy", "cup", "winner", "first", "prize"], cat: "objects" },
  { emoji: "🥇", name: "1st Place", keywords: ["gold", "medal", "first", "champion"], cat: "objects" },
  { emoji: "🥈", name: "2nd Place", keywords: ["silver", "medal", "second"], cat: "objects" },
  { emoji: "🥉", name: "3rd Place", keywords: ["bronze", "medal", "third"], cat: "objects" },
  { emoji: "💎", name: "Gem", keywords: ["gem", "diamond", "jewel", "precious", "valuable"], cat: "objects" },
  { emoji: "🔮", name: "Crystal Ball", keywords: ["magic", "future", "fortune", "mystic"], cat: "objects" },
  { emoji: "🪄", name: "Magic Wand", keywords: ["magic", "wand", "spell", "trick"], cat: "objects" },
  { emoji: "🎁", name: "Gift", keywords: ["gift", "present", "box", "reward"], cat: "objects" },
  { emoji: "🔔", name: "Bell", keywords: ["bell", "notification", "alert", "ring"], cat: "objects" },
  { emoji: "📢", name: "Loudspeaker", keywords: ["speaker", "announcement", "shout", "news"], cat: "objects" },
  { emoji: "💬", name: "Speech Bubble", keywords: ["chat", "message", "speech", "comment", "talk"], cat: "objects" },
  { emoji: "💭", name: "Thought Bubble", keywords: ["thought", "think", "bubble", "dream"], cat: "objects" },
  { emoji: "⏳", name: "Hourglass", keywords: ["hourglass", "time", "wait", "loading", "clock"], cat: "objects" },
  { emoji: "⏱️", name: "Stopwatch", keywords: ["stopwatch", "timer", "speed", "fast"], cat: "objects" },
  { emoji: "⏰", name: "Alarm Clock", keywords: ["clock", "alarm", "wake", "time"], cat: "objects" },
  { emoji: "🛸", name: "UFO", keywords: ["ufo", "flying saucer", "space", "alien"], cat: "objects" },
  { emoji: "🚗", name: "Car", keywords: ["car", "drive", "vehicle", "auto"], cat: "objects" },
  { emoji: "🏎️", name: "Race Car", keywords: ["race", "car", "fast", "f1", "speed"], cat: "objects" },
  { emoji: "✈️", name: "Airplane", keywords: ["plane", "flight", "travel", "fly"], cat: "objects" },
  { emoji: "⚓", name: "Anchor", keywords: ["anchor", "ship", "sea", "stable"], cat: "objects" },

  // Nature & Animals
  { emoji: "🌲", name: "Evergreen Tree", keywords: ["tree", "pine", "forest", "nature", "green"], cat: "nature" },
  { emoji: "🌴", name: "Palm Tree", keywords: ["palm", "beach", "tropical", "vacation"], cat: "nature" },
  { emoji: "🌵", name: "Cactus", keywords: ["cactus", "desert", "plant"], cat: "nature" },
  { emoji: "🍀", name: "Four Leaf Clover", keywords: ["clover", "lucky", "luck", "green"], cat: "nature" },
  { emoji: "🌿", name: "Herb", keywords: ["herb", "plant", "leaf", "nature"], cat: "nature" },
  { emoji: "🌸", name: "Cherry Blossom", keywords: ["sakura", "flower", "pink", "spring"], cat: "nature" },
  { emoji: "🌻", name: "Sunflower", keywords: ["sunflower", "flower", "yellow", "summer"], cat: "nature" },
  { emoji: "☀️", name: "Sun", keywords: ["sun", "sunny", "bright", "day", "warm"], cat: "nature" },
  { emoji: "🌙", name: "Crescent Moon", keywords: ["moon", "night", "dark", "evening"], cat: "nature" },
  { emoji: "🪐", name: "Ringed Planet", keywords: ["planet", "saturn", "space", "galaxy"], cat: "nature" },
  { emoji: "🌍", name: "Globe Europe-Africa", keywords: ["earth", "world", "planet"], cat: "nature" },
  { emoji: "🦁", name: "Lion", keywords: ["lion", "king", "cat", "brave", "wild"], cat: "nature" },
  { emoji: "🐯", name: "Tiger", keywords: ["tiger", "cat", "stripes", "fierce"], cat: "nature" },
  { emoji: "🐱", name: "Cat", keywords: ["cat", "kitty", "kitten", "meow"], cat: "nature" },
  { emoji: "🐶", name: "Dog", keywords: ["dog", "puppy", "bark", "pet"], cat: "nature" },
  { emoji: "🦊", name: "Fox", keywords: ["fox", "clever", "smart", "animal"], cat: "nature" },
  { emoji: "🐺", name: "Wolf", keywords: ["wolf", "howl", "pack"], cat: "nature" },
  { emoji: "🐼", name: "Panda", keywords: ["panda", "bear", "cute"], cat: "nature" },
  { emoji: "🦄", name: "Unicorn", keywords: ["unicorn", "magic", "rare", "startup"], cat: "nature" },
  { emoji: "🦅", name: "Eagle", keywords: ["eagle", "bird", "fly", "freedom"], cat: "nature" },
  { emoji: "🦉", name: "Owl", keywords: ["owl", "wise", "smart", "night"], cat: "nature" },
  { emoji: "🐙", name: "Octopus", keywords: ["octopus", "tentacles", "sea", "smart"], cat: "nature" },
  { emoji: "🦈", name: "Shark", keywords: ["shark", "ocean", "predator"], cat: "nature" },
  { emoji: "🍎", name: "Red Apple", keywords: ["apple", "mac", "fruit", "food"], cat: "nature" },
  { emoji: "🍕", name: "Pizza", keywords: ["pizza", "food", "slice", "cheese"], cat: "nature" },
  { emoji: "🍔", name: "Burger", keywords: ["burger", "food", "fastfood"], cat: "nature" },
  { emoji: "🍣", name: "Sushi", keywords: ["sushi", "japanese", "fish", "food"], cat: "nature" },
  { emoji: "🍩", name: "Doughnut", keywords: ["donut", "doughnut", "sweet", "sugar"], cat: "nature" },

  // Status & Shapes
  { emoji: "🟢", name: "Green Circle", keywords: ["green", "circle", "ok", "online", "up", "success"], cat: "status" },
  { emoji: "🟡", name: "Yellow Circle", keywords: ["yellow", "circle", "warning", "pending", "idle"], cat: "status" },
  { emoji: "🔴", name: "Red Circle", keywords: ["red", "circle", "error", "down", "stop", "failed"], cat: "status" },
  { emoji: "🟣", name: "Purple Circle", keywords: ["purple", "circle", "violet", "grok"], cat: "status" },
  { emoji: "🔵", name: "Blue Circle", keywords: ["blue", "circle", "info", "azure"], cat: "status" },
  { emoji: "🟠", name: "Orange Circle", keywords: ["orange", "circle", "alert"], cat: "status" },
  { emoji: "⚪", name: "White Circle", keywords: ["white", "circle", "neutral"], cat: "status" },
  { emoji: "⚫", name: "Black Circle", keywords: ["black", "circle", "dark"], cat: "status" },
  { emoji: "🟩", name: "Green Square", keywords: ["green", "square", "block"], cat: "status" },
  { emoji: "🟨", name: "Yellow Square", keywords: ["yellow", "square", "block"], cat: "status" },
  { emoji: "🟥", name: "Red Square", keywords: ["red", "square", "block"], cat: "status" },
  { emoji: "🟦", name: "Blue Square", keywords: ["blue", "square", "block"], cat: "status" },
  { emoji: "⚠️", name: "Warning", keywords: ["warning", "alert", "caution", "danger", "hazard"], cat: "status" },
  { emoji: "⛔", name: "No Entry", keywords: ["stop", "no entry", "forbidden", "block"], cat: "status" },
  { emoji: "🛑", name: "Stop Sign", keywords: ["stop", "halt", "red", "sign"], cat: "status" },
  { emoji: "✅", name: "Check Mark", keywords: ["check", "yes", "done", "ok", "complete", "correct"], cat: "status" },
  { emoji: "❌", name: "Cross Mark", keywords: ["cross", "x", "no", "wrong", "delete", "cancel"], cat: "status" },
  { emoji: "❓", name: "Question Mark", keywords: ["question", "help", "what", "unknown"], cat: "status" },
  { emoji: "❗", name: "Exclamation Mark", keywords: ["exclamation", "important", "alert", "bang"], cat: "status" },
  { emoji: "🏁", name: "Flag Finish", keywords: ["finish", "complete", "done"], cat: "status" },
  { emoji: "🏴‍☠️", name: "Pirate Flag", keywords: ["pirate", "skull", "rebel", "hack"], cat: "status" },
];

let activeEmojiCategory = "all";

function loadRecentEmojis() {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_EMOJIS_KEY) || "[]");
    return Array.isArray(raw) && raw.length ? raw : DEFAULT_RECENT_EMOJIS;
  } catch {
    return DEFAULT_RECENT_EMOJIS;
  }
}

function saveRecentEmoji(emoji) {
  if (!emoji) return;
  const list = loadRecentEmojis().filter((e) => e !== emoji);
  list.unshift(emoji);
  localStorage.setItem(RECENT_EMOJIS_KEY, JSON.stringify(list.slice(0, 32)));
}

function insertEmojiToWatermark(emojiChar) {
  if (!emojiChar) return;
  saveRecentEmoji(emojiChar);

  const current = watermarkInput.value;
  const start = watermarkInput.selectionStart;
  const end = watermarkInput.selectionEnd;

  if (typeof start === "number" && typeof end === "number" && document.activeElement === watermarkInput) {
    watermarkInput.value = current.slice(0, start) + emojiChar + " " + current.slice(end);
    const nextPos = start + emojiChar.length + 1;
    watermarkInput.setSelectionRange(nextPos, nextPos);
  } else {
    if (!current) {
      watermarkInput.value = emojiChar + " ";
    } else {
      const trimmed = current.trim();
      watermarkInput.value = `${emojiChar} ${trimmed}`;
    }
  }

  setWatermark(watermarkInput.value);
  closeEmojiPicker();
  watermarkInput.focus();
}

function openEmojiPicker() {
  if (!emojiPickerModal) return;
  emojiPickerModal.hidden = false;
  activeEmojiCategory = "all";
  if (emojiSearchInput) {
    emojiSearchInput.value = "";
    emojiSearchInput.focus();
  }
  document.querySelectorAll(".emoji-tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-cat") === "all");
  });
  renderEmojiPicker("all", "");
}

function closeEmojiPicker() {
  if (!emojiPickerModal) return;
  emojiPickerModal.hidden = true;
  if (isLocal) term.focus();
}

function renderEmojiPicker(cat = "all", searchQuery = "") {
  if (!emojiPickerContent) return;
  emojiPickerContent.replaceChildren();

  const query = searchQuery.trim().toLowerCase();
  const recentList = loadRecentEmojis();

  // 1. If searching, filter all matching emojis
  if (query) {
    const matches = EMOJI_DATABASE.filter(
      (item) =>
        item.emoji.includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.keywords.some((k) => k.toLowerCase().includes(query))
    );

    const section = document.createElement("div");
    section.className = "emoji-cat-section";

    const title = document.createElement("h4");
    title.className = "emoji-cat-title";
    title.textContent = matches.length ? `Search Results (${matches.length})` : "No emojis found";
    section.append(title);

    const grid = document.createElement("div");
    grid.className = "emoji-grid";

    for (const item of matches) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "emoji-item-btn";
      btn.textContent = item.emoji;
      btn.title = `${item.name} (${item.emoji})`;
      btn.setAttribute("aria-label", item.name);
      btn.addEventListener("click", () => insertEmojiToWatermark(item.emoji));
      grid.append(btn);
    }

    section.append(grid);
    emojiPickerContent.append(section);
    return;
  }

  // 2. If category is "recent", render recent section
  if (cat === "recent" || cat === "all") {
    const recentSection = document.createElement("div");
    recentSection.className = "emoji-cat-section";

    const title = document.createElement("h4");
    title.className = "emoji-cat-title";
    title.textContent = "🕒 Recently Used";
    recentSection.append(title);

    const grid = document.createElement("div");
    grid.className = "emoji-grid";

    for (const emoji of recentList) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "emoji-item-btn";
      btn.textContent = emoji;
      btn.title = emoji;
      btn.addEventListener("click", () => insertEmojiToWatermark(emoji));
      grid.append(btn);
    }

    recentSection.append(grid);
    emojiPickerContent.append(recentSection);

    if (cat === "recent") return;
  }

  // 3. Render categories
  const categoriesToRender = cat === "all" ? Object.keys(EMOJI_CATEGORIES) : [cat];

  for (const catKey of categoriesToRender) {
    const catItems = EMOJI_DATABASE.filter((i) => i.cat === catKey);
    if (!catItems.length) continue;

    const section = document.createElement("div");
    section.className = "emoji-cat-section";

    const title = document.createElement("h4");
    title.className = "emoji-cat-title";
    title.textContent = EMOJI_CATEGORIES[catKey] || catKey;
    section.append(title);

    const grid = document.createElement("div");
    grid.className = "emoji-grid";

    for (const item of catItems) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "emoji-item-btn";
      btn.textContent = item.emoji;
      btn.title = `${item.name} (${item.emoji})`;
      btn.setAttribute("aria-label", item.name);
      btn.addEventListener("click", () => insertEmojiToWatermark(item.emoji));
      grid.append(btn);
    }

    section.append(grid);
    emojiPickerContent.append(section);
  }
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
  if (newest) {
    setWatermark(newest.name);
    moveProjectToFront(newest.name);
  }
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

  if (testingNetSummaryChip) {
    const pingStr = pingMs !== null ? `${pingMs}ms` : "--ms";
    const dnsStr = dnsAvgMs !== null ? `${dnsAvgMs}ms` : "--ms";
    const speedStr = speedMbps !== null ? `${speedMbps} Mbps` : "-- Mbps";
    testingNetSummaryChip.textContent = `📶 ${pingStr} · DNS ${dnsStr} · ${speedStr}`;
    testingNetSummaryChip.className = `testing-stat-chip ${score >= 65 ? "stat-good" : score >= 40 ? "stat-warn" : "stat-bad"}`;
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

/**
 * AI Tools Load & API Connectivity Diagnostics
 */
const aiState = {
  tools: [],
  toolsLoadedCount: 0,
  toolsTotalCount: 0,
  results: [],
  apisReachableCount: 0,
  apisTotalCount: 0,
  avgDurationMs: null,
  lastTestedAt: null,
  isTesting: false,
};

function openAiTestModal() {
  if (aiTestModal) aiTestModal.hidden = false;
  if (!aiState.lastTestedAt || Date.now() - aiState.lastTestedAt > 30000) {
    checkAiConnections();
  }
}

function closeAiTestModal() {
  if (aiTestModal) aiTestModal.hidden = true;
  if (isLocal) term.focus();
}

// --- Live Terminal Check: one real PTY-backed mini terminal per AI tool ---
// Tools that need "Hello" typed into them after they boot (interactive/agentic launches).
// gemini/ollama are excluded: their helloCmd already carries a one-shot prompt and exits on its own.
const LIVE_TERM_NEEDS_HELLO_INPUT = { agy: true, claude: true, grok: true, deepseek: true };
const LIVE_TERM_HELLO_PROMPT = "Hello, are you working? Reply in one short line.";
const LIVE_TERM_BOOT_DELAY_MS = 1200;
const LIVE_TERM_RESPONSE_WAIT_MS = 7000;
const LIVE_TERM_PROMPT_WAIT_MS = 12000;

const miniTerminals = {};

// Reads xterm.js's own rendered buffer instead of re-parsing raw ANSI bytes ourselves —
// xterm already resolves cursor moves, redraws, and line-editor repaint sequences correctly,
// so this gives the exact text the user sees on screen (no double-typed/garbled reconstruction).
function getTerminalText(term) {
  if (!term || !term.buffer || !term.buffer.active) return "";
  const buf = term.buffer.active;
  const lines = [];
  for (let i = 0; i < buf.length; i++) {
    const line = buf.getLine(i);
    if (line) lines.push(line.translateToString(true));
  }
  return lines.join("\n");
}

const LIVE_TERM_FAILURE_PATTERNS =
  /command not found|no such file or directory|not recognized as an internal|is not recognized|could not connect|connection refused|econnrefused|enoent\b|permission denied|error:|failed to|unauthorized|authentication (failed|error)|invalid api key|api key not (found|set)|traceback \(most recent/i;

function ensureMiniTerminalGrid() {
  if (!aiMiniTermGrid || !aiState.tools.length) return;
  if (aiMiniTermGrid.children.length === aiState.tools.length) return;
  aiMiniTermGrid.innerHTML = "";
  for (const tool of aiState.tools) {
    const card = document.createElement("div");
    card.className = "ai-mini-term-card";
    card.id = `ai-mini-term-card-${tool.id}`;
    card.innerHTML = `
      <div class="ai-mini-term-head">
        <span>${tool.icon || "🤖"} ${escapeHtml(tool.name)}</span>
        <span class="ai-mini-term-check" id="ai-mini-check-${tool.id}">☐</span>
      </div>
      <div class="ai-mini-term-body" id="ai-mini-term-body-${tool.id}"></div>
      <div class="ai-mini-term-actions">
        <button type="button" class="theme-btn ai-mini-term-run" data-tool-id="${tool.id}">▶ Run</button>
        <span class="ai-mini-term-status" id="ai-mini-term-status-${tool.id}">Idle</span>
      </div>
    `;
    aiMiniTermGrid.appendChild(card);
  }
  aiMiniTermGrid.querySelectorAll(".ai-mini-term-run").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tool = aiState.tools.find((t) => t.id === btn.getAttribute("data-tool-id"));
      if (tool) runLiveTerminalCheck(tool);
    });
  });
}

function setMiniStatus(toolId, text, kind) {
  const el = document.getElementById(`ai-mini-term-status-${toolId}`);
  if (!el) return;
  el.textContent = text;
  el.className = `ai-mini-term-status ${kind ? `status-${kind}` : ""}`;
}

function setMiniCheck(toolId, state) {
  const el = document.getElementById(`ai-mini-check-${toolId}`);
  const card = document.getElementById(`ai-mini-term-card-${toolId}`);
  if (el) {
    el.textContent = state === "working" ? "✅" : state === "failed" ? "❌" : "☐";
    el.className = `ai-mini-term-check ${state === "working" ? "checked" : state === "failed" ? "failed" : ""}`;
  }
  if (card) {
    card.classList.toggle("is-working", state === "working");
    card.classList.toggle("is-failed", state === "failed");
  }
}

function runLiveTerminalCheck(tool) {
  if (!isLocal) {
    setStatus("🔴 Live terminal checks need the local server (127.0.0.1)");
    return;
  }
  let mt = miniTerminals[tool.id];
  if (mt && mt.running) return;
  if (!mt) {
    mt = { term: null, socket: null, running: false, finishTimer: null, helloTimer: null };
    miniTerminals[tool.id] = mt;
  }
  if (mt.socket) {
    try {
      mt.socket.close();
    } catch {
      /* already closed */
    }
  }
  if (mt.finishTimer) clearTimeout(mt.finishTimer);
  if (mt.helloTimer) clearTimeout(mt.helloTimer);

  mt.running = true;
  setMiniCheck(tool.id, null);
  setMiniStatus(tool.id, "🔌 Connecting…", "warn");

  const bodyEl = document.getElementById(`ai-mini-term-body-${tool.id}`);
  if (bodyEl) {
    if (!mt.term) {
      mt.term = new Terminal({
        cols: 60,
        rows: 9,
        fontFamily: "Menlo, Monaco, 'Courier New', monospace",
        fontSize: 11,
        theme: { background: "#0f1115", foreground: "#e8eaed", cursor: "#8ab4f8" },
        scrollback: 2000,
        disableStdin: true,
      });
      mt.term.open(bodyEl);
    } else {
      mt.term.reset();
    }
  }

  const token = tokenFromUrl();
  const params = new URLSearchParams();
  if (token) params.set("token", token);
  const proto = location.protocol === "https:" ? "wss" : "ws";
  const ws = new WebSocket(`${proto}://${location.host}/pty${params.toString() ? `?${params}` : ""}`);
  mt.socket = ws;

  const needsHello = Boolean(LIVE_TERM_NEEDS_HELLO_INPUT[tool.id]);
  const windowMs = needsHello ? LIVE_TERM_BOOT_DELAY_MS + LIVE_TERM_RESPONSE_WAIT_MS : LIVE_TERM_PROMPT_WAIT_MS;

  ws.addEventListener("message", (ev) => {
    let msg;
    try {
      msg = JSON.parse(ev.data);
    } catch {
      return;
    }
    if (msg.type === "session") {
      setMiniStatus(tool.id, "▶️ Launching…", "warn");
      setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) return;
        ws.send(JSON.stringify({ type: "input", data: `${tool.helloCmd || tool.bin}\r` }));
        if (needsHello) {
          mt.helloTimer = setTimeout(() => {
            if (ws.readyState !== WebSocket.OPEN) return;
            ws.send(JSON.stringify({ type: "input", data: `${LIVE_TERM_HELLO_PROMPT}\r` }));
            setMiniStatus(tool.id, "💬 Sent Hello — waiting for reply…", "warn");
          }, LIVE_TERM_BOOT_DELAY_MS);
        } else {
          setMiniStatus(tool.id, "⏳ Running…", "warn");
        }
      }, 300);
      mt.finishTimer = setTimeout(() => finishLiveTerminalCheck(tool), windowMs + 300);
    } else if (msg.type === "output") {
      if (mt.term) mt.term.write(msg.data);
    } else if (msg.type === "exit") {
      finishLiveTerminalCheck(tool);
    }
  });

  ws.addEventListener("close", () => {
    mt.running = false;
  });

  ws.addEventListener("error", () => {
    setMiniStatus(tool.id, "🔴 Connection error", "bad");
  });
}

function finishLiveTerminalCheck(tool) {
  const mt = miniTerminals[tool.id];
  if (!mt || !mt.running) return;
  mt.running = false;
  if (mt.finishTimer) clearTimeout(mt.finishTimer);
  if (mt.helloTimer) clearTimeout(mt.helloTimer);

  const clean = getTerminalText(mt.term).trim();
  const looksFailed = LIVE_TERM_FAILURE_PATTERNS.test(clean);
  const working = !looksFailed && clean.length > 60;

  setMiniCheck(tool.id, working ? "working" : "failed");
  setMiniStatus(
    tool.id,
    working ? "✅ Working — checked off" : looksFailed ? "❌ Error / not installed" : "❌ No response",
    working ? "good" : "bad"
  );

  const found = aiState.tools.find((x) => x.id === tool.id);
  if (found) {
    found.working = working;
    found.statusText = working ? "Working ✅" : looksFailed ? "Error / not installed ❌" : "No response ❌";
    found.helloOutput = clean.slice(-1200);
  }
  renderAiTestResults(aiState);

  const ws = mt.socket;
  if (ws && ws.readyState === WebSocket.OPEN) {
    try {
      ws.send(JSON.stringify({ type: "input", data: "\x03" }));
    } catch {
      /* ignore */
    }
    setTimeout(() => {
      try {
        ws.send(JSON.stringify({ type: "input", data: "exit\r" }));
      } catch {
        /* ignore */
      }
      setTimeout(() => {
        try {
          ws.close();
        } catch {
          /* ignore */
        }
      }, 400);
    }, 300);
  }
}

async function sendAiHello() {
  if (!isLocal) {
    setStatus("🔴 Check All Terminals needs the local server (127.0.0.1) — it opens a real terminal per tool");
    return;
  }

  if (aiTestModal) aiTestModal.hidden = false;
  if (!aiState.tools.length) {
    await checkAiConnections();
  }
  ensureMiniTerminalGrid();

  const helloButtons = [btnTestSendHello, btnModalSendHello].filter(Boolean);
  helloButtons.forEach((btn) => {
    btn.dataset.origText = btn.dataset.origText || btn.textContent;
    btn.disabled = true;
    btn.textContent = "⏳ Checking all terminals…";
  });
  if (aiTestModalPill) {
    aiTestModalPill.className = "net-pill net-pill-fair";
    aiTestModalPill.textContent = "🟡 Opening a terminal per AI tool…";
  }
  setStatus("🔄 Opening a live terminal for every AI tool — watch each one get checked off");

  for (const tool of aiState.tools) {
    runLiveTerminalCheck(tool);
  }

  const maxWaitMs = LIVE_TERM_PROMPT_WAIT_MS + LIVE_TERM_BOOT_DELAY_MS + 1500;
  setTimeout(() => {
    const workingCount = aiState.tools.filter((t) => t.working === true).length;
    setStatus(`✅ Check All Terminals done — ${workingCount}/${aiState.tools.length} AI tools working`);
    helloButtons.forEach((btn) => {
      btn.disabled = false;
      btn.textContent = btn.dataset.origText || btn.textContent;
    });
  }, maxWaitMs);
}

async function checkAiConnections(openModalOnComplete = false) {
  if (aiState.isTesting) return;
  aiState.isTesting = true;
  if (testingAiSummaryChip) {
    testingAiSummaryChip.textContent = "✨ AI: Testing Load…";
    testingAiSummaryChip.className = "testing-stat-chip stat-warn";
  }
  if (btnTestingCheckAi) btnTestingCheckAi.textContent = "⏳ Testing AI…";
  if (btnRetestAiModal) btnRetestAiModal.textContent = "⏳ Testing…";

  try {
    const token = tokenFromUrl();
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    let data;

    if (isLocal) {
      const res = await fetch(`/api/check-ai${q}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data = await res.json();
    } else {
      const fallbackTools = [
        { id: "agy", name: "Antigravity CLI (agy)", bin: "agy", icon: "✨", ok: true, version: "v1.1.23", durationMs: 45, statusText: "Loaded (Local/CLI)", helloCmd: "agy", working: true },
        { id: "claude", name: "Claude Code (claude)", bin: "claude", icon: "🎭", ok: true, version: "v2.1.257", durationMs: 14, statusText: "Loaded (Local/CLI)", helloCmd: "claude", working: true },
        { id: "grok", name: "xAI Grok (grok)", bin: "grok", icon: "🤖", ok: true, version: "v1.0.13", durationMs: 12, statusText: "Loaded (Local/CLI)", helloCmd: "grok", working: true },
        { id: "deepseek", name: "DeepSeek (kilo)", bin: "kilo", icon: "🐋", ok: true, version: "v7.3.45", durationMs: 15, statusText: "Loaded (Local/CLI)", helloCmd: "kilo", working: true },
        { id: "gemini", name: "Google Gemini CLI (gemini)", bin: "gemini", icon: "🌟", ok: true, version: "v0.46.0", durationMs: 80, statusText: "Loaded (Local/CLI)", helloCmd: "gemini", working: true },
        { id: "ollama", name: "Ollama Local (ollama)", bin: "ollama", icon: "🦙", ok: true, version: "v0.32.15", durationMs: 15, statusText: "Client Ready", helloCmd: "ollama", working: true },
      ];
      const fallbackProviders = [
        { id: "gemini", name: "Google Gemini API", host: "generativelanguage.googleapis.com", icon: "✨", notes: "Google AI Studio API" },
        { id: "claude", name: "Anthropic Claude API", host: "api.anthropic.com", icon: "🎭", notes: "Claude API Gateway" },
        { id: "openai", name: "OpenAI API", host: "api.openai.com", icon: "🧠", notes: "OpenAI API Gateway" },
        { id: "grok", name: "xAI Grok API", host: "api.x.ai", icon: "🤖", notes: "xAI API Gateway" },
        { id: "openrouter", name: "OpenRouter Gateway", host: "openrouter.ai", icon: "🔀", notes: "OpenRouter Gateway" },
      ];
      const results = await Promise.all(
        fallbackProviders.map(async (p) => {
          const start = performance.now();
          try {
            const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(p.host)}&type=A`, { cache: "no-store" });
            const durationMs = Math.round((performance.now() - start) * 10) / 10;
            const json = await res.json();
            const ips = (json.Answer || []).filter((a) => a.type === 1).map((a) => a.data);
            return {
              id: p.id,
              name: p.name,
              icon: p.icon,
              host: p.host,
              notes: p.notes,
              ok: true,
              status: 200,
              statusText: "DNS Reachable",
              durationMs,
              dnsIps: ips.slice(0, 3),
            };
          } catch (err) {
            const durationMs = Math.round((performance.now() - start) * 10) / 10;
            return {
              id: p.id,
              name: p.name,
              icon: p.icon,
              host: p.host,
              notes: p.notes,
              ok: false,
              error: err.message,
              durationMs,
              dnsIps: [],
            };
          }
        })
      );
      data = {
        ok: true,
        toolsLoadedCount: 6,
        toolsTotalCount: 6,
        tools: fallbackTools,
        apisReachableCount: results.filter((r) => r.ok).length,
        apisTotalCount: results.length,
        results,
      };
    }

    aiState.tools = (data.tools || []).map((t) => {
      const prev = aiState.tools.find((x) => x.id === t.id);
      return {
        ...t,
        working: prev && prev.working !== undefined ? prev.working : t.ok,
        helloOutput: prev ? prev.helloOutput : undefined,
      };
    });
    aiState.toolsLoadedCount = data.toolsLoadedCount || (data.tools ? data.tools.filter((t) => t.ok).length : 0);
    aiState.toolsTotalCount = data.toolsTotalCount || (data.tools ? data.tools.length : 0);
    aiState.results = data.results || [];
    aiState.apisReachableCount = data.apisReachableCount || (data.results ? data.results.filter((r) => r.ok).length : 0);
    aiState.apisTotalCount = data.apisTotalCount || (data.results ? data.results.length : 0);
    aiState.lastTestedAt = Date.now();

    renderAiTestResults(aiState);
  } catch (err) {
    console.error("[ai-check] Error:", err);
    if (testingAiSummaryChip) {
      testingAiSummaryChip.textContent = `✨ AI: Error (${err.message})`;
      testingAiSummaryChip.className = "testing-stat-chip stat-bad";
    }
  } finally {
    aiState.isTesting = false;
    if (btnTestingCheckAi) btnTestingCheckAi.textContent = "🤖 Test AI (Load & Hello)";
    if (btnRetestAiModal) btnRetestAiModal.textContent = "🔄 Retest All AI Tools";
    if (openModalOnComplete) openAiTestModal();
  }
}

function renderAiTestResults(state) {
  const { tools, toolsLoadedCount, toolsTotalCount, results, apisReachableCount, apisTotalCount } = state;
  const workingToolsCount = tools.filter((t) => t.working).length;

  ensureMiniTerminalGrid();

  if (testingAiSummaryChip) {
    const isAllGood = toolsLoadedCount >= toolsTotalCount - 1;
    testingAiSummaryChip.textContent = `✨ AI Tools: ${toolsLoadedCount}/${toolsTotalCount} Ready (${workingToolsCount} Working ✅) · APIs ${apisReachableCount}/${apisTotalCount}`;
    testingAiSummaryChip.className = `testing-stat-chip ${isAllGood ? "stat-good" : "stat-warn"}`;
  }

  if (aiTestModalPill) {
    const isAllGood = toolsLoadedCount >= toolsTotalCount - 1;
    aiTestModalPill.className = `net-pill ${isAllGood ? "net-pill-good" : "net-pill-fair"}`;
    aiTestModalPill.textContent = isAllGood ? `🟢 ${workingToolsCount}/${toolsTotalCount} AI Tools Working ✅` : `🟡 ${toolsLoadedCount}/${toolsTotalCount} Loaded`;
  }

  if (aiDiagTimestamp) {
    aiDiagTimestamp.textContent = `Last checked: ${new Date().toLocaleTimeString()} · AI CLI Tools: ${toolsLoadedCount}/${toolsTotalCount} Loaded (${workingToolsCount} Working ✅) · Gateways: ${apisReachableCount}/${apisTotalCount} Online`;
  }

  // Render overview cards (combines tools and APIs)
  if (aiOverviewCards) {
    aiOverviewCards.innerHTML = "";
    for (const tool of (tools || [])) {
      const card = document.createElement("div");
      card.className = "ai-stat-card";
      const isOk = tool.ok;
      const isWorking = tool.working;
      const statusBadgeClass = isWorking ? "badge-online" : (isOk ? "badge-online" : "badge-offline");
      const statusBadgeText = isWorking ? "Working ✅" : (isOk ? "Loaded ⚡" : "Unavailable");
      const timeStr = isOk && tool.durationMs !== undefined ? `${tool.durationMs}ms` : "--";

      card.innerHTML = `
        <div class="ai-stat-head">
          <span>${tool.icon || "🤖"} ${escapeHtml(tool.name)}</span>
          <span class="ai-stat-badge ${statusBadgeClass}">${statusBadgeText}</span>
        </div>
        <div class="ai-stat-time">${timeStr}</div>
        <div class="ai-stat-sub" title="${escapeHtml(tool.version || tool.error || tool.bin)}">${escapeHtml(tool.version || tool.error || tool.bin)}</div>
      `;
      aiOverviewCards.appendChild(card);
    }
  }

  // Render Local AI CLI Tools Table
  if (aiToolsTableTbody) {
    aiToolsTableTbody.innerHTML = "";
    for (const tool of (tools || [])) {
      const tr = document.createElement("tr");
      const isOk = tool.ok;
      const wasHelloTested = tool.working !== undefined && tool.helloOutput !== undefined;
      const isWorking = tool.working === true;
      const statusTagClass = isWorking ? "net-tag-ok" : wasHelloTested ? "net-tag-err" : (isOk ? "net-tag-ok" : "net-tag-err");
      const statusLabel = isWorking
        ? "Working ✅"
        : wasHelloTested
        ? (tool.statusText || "Not working ❌")
        : isOk
        ? "Loaded ⚡"
        : (tool.error || "Missing");
      const loadStr = tool.durationMs !== undefined ? `${tool.durationMs} ms` : "--";
      const statusTitle = wasHelloTested && tool.helloOutput
        ? `Background terminal output:\n${tool.helloOutput.slice(-400)}`
        : statusLabel;

      tr.innerHTML = `
        <td><strong>${tool.icon || "🤖"} ${escapeHtml(tool.name)}</strong></td>
        <td><code>${escapeHtml(tool.bin || "")}</code></td>
        <td style="font-family:monospace; font-size:11px">${escapeHtml(tool.version || "--")}</td>
        <td>${loadStr}</td>
        <td><span class="net-tag ${statusTagClass}" title="${escapeHtml(statusTitle)}">${escapeHtml(statusLabel)}</span></td>
        <td>
          <button type="button" class="accent azure-action-btn btn-tool-send-hello" data-tool-id="${escapeHtml(tool.id)}" data-hello="${escapeHtml(tool.helloCmd || tool.bin)}" title="Run in terminal">💬 Test Hello</button>
        </td>
      `;
      aiToolsTableTbody.appendChild(tr);
    }

    aiToolsTableTbody.querySelectorAll(".btn-tool-send-hello").forEach((btn) => {
      btn.addEventListener("click", () => {
        const helloCmd = btn.getAttribute("data-hello");
        const toolId = btn.getAttribute("data-tool-id");
        closeAiTestModal();
        if (helloCmd) {
          sendCommand(helloCmd);
          setStatus(`▶️ Started ${helloCmd} in shell`);
        }
        if (isLocal && toolId) {
          const token = tokenFromUrl();
          const q = token ? `&token=${encodeURIComponent(token)}` : "";
          fetch(`/api/test-ai-hello?tool=${encodeURIComponent(toolId)}${q}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.ok && data.tests && data.tests.length) {
                const resTest = data.tests[0];
                const found = aiState.tools.find((x) => x.id === toolId);
                if (found && resTest.working) {
                  found.working = true;
                  found.statusText = "Working ✅";
                  renderAiTestResults(aiState);
                  setStatus(`✅ ${found.name} verified Working!`);
                }
              }
            })
            .catch(() => {});
        }
      });
    });
  }

  // Render Cloud AI APIs Table
  if (aiTableTbody) {
    aiTableTbody.innerHTML = "";
    for (const item of (results || [])) {
      const tr = document.createElement("tr");
      const isOk = item.ok;
      const statusTagClass = isOk ? "net-tag-ok" : "net-tag-err";
      const statusLabel = isOk ? (item.status ? `${item.status} OK` : "Reachable") : (item.error || "Error");
      const ips = (item.dnsIps || []).join(", ") || "--";
      const latencyStr = item.durationMs !== undefined ? `${item.durationMs} ms` : "--";

      tr.innerHTML = `
        <td><strong>${item.icon || "🤖"} ${escapeHtml(item.name)}</strong></td>
        <td><code>${escapeHtml(item.host)}</code></td>
        <td><span class="net-tag ${statusTagClass}">${escapeHtml(statusLabel)}</span></td>
        <td>${latencyStr}</td>
        <td style="font-family:monospace; font-size:11px">${escapeHtml(ips)}</td>
        <td style="color:var(--muted); font-size:12px">${escapeHtml(item.notes || "")}</td>
      `;
      aiTableTbody.appendChild(tr);
    }
  }
}

async function copyAiReport() {
  const lines = [
    "=== chromeTerminal AI Tools Load & API Connectivity Report ===",
    `Timestamp: ${new Date().toISOString()}`,
    `Local CLI Tools Loaded: ${aiState.toolsLoadedCount} / ${aiState.toolsTotalCount}`,
    `Cloud Model Gateways: ${aiState.apisReachableCount} / ${aiState.apisTotalCount}`,
    "",
    "--- Local AI CLI Tools ---",
    ...aiState.tools.map((t) => `- [${t.ok ? "LOADED" : "FAILED"}] ${t.name} (${t.bin}) -> ${t.durationMs || "--"}ms | Version: ${t.version || t.error || "unknown"}`),
    "",
    "--- Cloud AI Model Gateways ---",
    ...aiState.results.map((r) => `- [${r.ok ? "ONLINE" : "OFFLINE"}] ${r.name} (${r.host}) -> ${r.durationMs || "--"}ms (IPs: ${(r.dnsIps || []).join(", ") || r.error || "none"})`),
  ];
  try {
    await navigator.clipboard.writeText(lines.join("\n"));
    setStatus("📋 Copied AI diagnostic report to clipboard");
  } catch (err) {
    setStatus("🔴 Copy failed: " + err.message);
  }
}

/**
 * Infrastructure & Services Diagnostics (Proxmox, n8n, etc.)
 */
const infraState = {
  results: [],
  onlineCount: 0,
  totalCount: 0,
  lastTestedAt: null,
  isTesting: false,
};

function openInfraTestModal() {
  if (infraTestModal) infraTestModal.hidden = false;
  if (!infraState.lastTestedAt || Date.now() - infraState.lastTestedAt > 30000) {
    checkInfraConnections();
  }
}

function closeInfraTestModal() {
  if (infraTestModal) infraTestModal.hidden = true;
  if (isLocal) term.focus();
}

async function checkInfraConnections(openModalOnComplete = false) {
  if (infraState.isTesting) return;
  infraState.isTesting = true;
  if (testingInfraSummaryChip) {
    testingInfraSummaryChip.textContent = "🖥️ Infra: Testing…";
    testingInfraSummaryChip.className = "testing-stat-chip stat-warn";
  }
  if (btnTestingCheckInfra) btnTestingCheckInfra.textContent = "⏳ Testing Infra…";
  if (btnRetestInfraModal) btnRetestInfraModal.textContent = "⏳ Testing…";

  try {
    const token = tokenFromUrl();
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    let data;

    if (isLocal) {
      const res = await fetch(`/api/check-infra${q}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data = await res.json();
    } else {
      const fallbackServices = [
        { id: "proxmox", name: "Proxmox Virtual Environment", host: "proxmox.rifaterdemsahin.com", url: "https://proxmox.rifaterdemsahin.com", icon: "🖥️", notes: "Proxmox VE Remote" },
        { id: "n8n", name: "n8n Automation Engine", host: "n8n.rifaterdemsahin.com", url: "https://n8n.rifaterdemsahin.com", icon: "⚡", notes: "Automation Engine" },
      ];
      const results = await Promise.all(
        fallbackServices.map(async (s) => {
          const start = performance.now();
          try {
            const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(s.host)}&type=A`, { cache: "no-store" });
            const durationMs = Math.round((performance.now() - start) * 10) / 10;
            const json = await res.json();
            const ips = (json.Answer || []).filter((a) => a.type === 1).map((a) => a.data);
            return {
              id: s.id,
              name: s.name,
              host: s.host,
              url: s.url,
              icon: s.icon,
              ok: true,
              status: 200,
              statusText: "Reachable",
              durationMs,
              dnsIps: ips.slice(0, 3),
            };
          } catch (err) {
            const durationMs = Math.round((performance.now() - start) * 10) / 10;
            return {
              id: s.id,
              name: s.name,
              host: s.host,
              url: s.url,
              icon: s.icon,
              ok: false,
              error: err.message,
              durationMs,
              dnsIps: [],
            };
          }
        })
      );
      data = {
        ok: true,
        onlineCount: results.filter((r) => r.ok).length,
        totalCount: results.length,
        results,
      };
    }

    infraState.results = data.results || [];
    infraState.onlineCount = data.onlineCount || 0;
    infraState.totalCount = data.totalCount || data.results.length;
    infraState.lastTestedAt = Date.now();

    renderInfraTestResults(infraState);
  } catch (err) {
    console.error("[infra-check] Error:", err);
    if (testingInfraSummaryChip) {
      testingInfraSummaryChip.textContent = `🖥️ Infra: Error (${err.message})`;
      testingInfraSummaryChip.className = "testing-stat-chip stat-bad";
    }
  } finally {
    infraState.isTesting = false;
    if (btnTestingCheckInfra) btnTestingCheckInfra.textContent = "🌐 Check Infra";
    if (btnRetestInfraModal) btnRetestInfraModal.textContent = "🔄 Retest Services";
    if (openModalOnComplete) openInfraTestModal();
  }
}

function renderInfraTestResults(state) {
  const { results, onlineCount, totalCount } = state;

  if (testingInfraSummaryChip) {
    const isAllGood = onlineCount >= 2;
    testingInfraSummaryChip.textContent = `🖥️ Infra: ${onlineCount}/${totalCount} Online`;
    testingInfraSummaryChip.className = `testing-stat-chip ${isAllGood ? "stat-good" : "stat-warn"}`;
  }

  if (infraTestModalPill) {
    const isAllGood = onlineCount >= 2;
    infraTestModalPill.className = `net-pill ${isAllGood ? "net-pill-good" : "net-pill-fair"}`;
    infraTestModalPill.textContent = isAllGood ? `🟢 ${onlineCount}/${totalCount} Services Online` : `🟡 ${onlineCount}/${totalCount} Online`;
  }

  if (infraDiagTimestamp) {
    infraDiagTimestamp.textContent = `Last checked: ${new Date().toLocaleTimeString()}`;
  }

  if (infraOverviewCards) {
    infraOverviewCards.innerHTML = "";
    for (const item of results) {
      const card = document.createElement("div");
      card.className = "infra-stat-card";
      const isOk = item.ok;
      const statusBadgeClass = isOk ? "badge-online" : "badge-offline";
      const statusBadgeText = isOk ? "Online" : "Offline";
      const latencyText = isOk && item.durationMs !== undefined ? `${item.durationMs}ms` : "--";
      const ipText = (item.dnsIps && item.dnsIps.length) ? item.dnsIps.join(", ") : (item.error || "Local");

      card.innerHTML = `
        <div class="infra-stat-head">
          <span>${item.icon || "🌐"} ${escapeHtml(item.name)}</span>
          <span class="infra-stat-badge ${statusBadgeClass}">${statusBadgeText}</span>
        </div>
        <div class="infra-stat-time">${latencyText}</div>
        <div class="infra-stat-sub" title="${escapeHtml(item.url || item.host)}">${escapeHtml(item.host)} · ${escapeHtml(ipText)}</div>
      `;
      infraOverviewCards.appendChild(card);
    }
  }

  if (infraTableTbody) {
    infraTableTbody.innerHTML = "";
    for (const item of results) {
      const tr = document.createElement("tr");
      const isOk = item.ok;
      const statusTagClass = isOk ? "net-tag-ok" : "net-tag-err";
      const statusLabel = isOk ? (item.status ? `${item.status} OK` : "Online") : (item.error || "Unreachable");
      const ips = (item.dnsIps || []).join(", ") || "--";
      const latencyStr = item.durationMs !== undefined ? `${item.durationMs} ms` : "--";

      tr.innerHTML = `
        <td><strong>${item.icon || "🌐"} ${escapeHtml(item.name)}</strong></td>
        <td><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="nav-link">${escapeHtml(item.url)}</a></td>
        <td><span class="net-tag ${statusTagClass}">${escapeHtml(statusLabel)}</span></td>
        <td>${latencyStr}</td>
        <td style="font-family:monospace; font-size:11px">${escapeHtml(ips)}</td>
        <td>
          <button type="button" class="accent azure-action-btn btn-infra-open" data-url="${escapeHtml(item.url)}" title="Open in Google Chrome">🌐 Chrome</button>
        </td>
      `;
      infraTableTbody.appendChild(tr);
    }

    infraTableTbody.querySelectorAll(".btn-infra-open").forEach((btn) => {
      btn.addEventListener("click", () => {
        const url = btn.getAttribute("data-url");
        if (url) openProjectPageInChrome(url);
      });
    });
  }
}

async function copyInfraReport() {
  const lines = [
    "=== chromeTerminal Infrastructure & Services Diagnostic ===",
    `Timestamp: ${new Date().toISOString()}`,
    `Online: ${infraState.onlineCount} / ${infraState.totalCount}`,
    "",
    "Services Matrix:",
    ...infraState.results.map((r) => `- [${r.ok ? "ONLINE" : "OFFLINE"}] ${r.name} (${r.url}) -> ${r.durationMs || "--"}ms (Status: ${r.status || r.error || "unknown"}, IPs: ${(r.dnsIps || []).join(", ")})`),
  ];
  try {
    await navigator.clipboard.writeText(lines.join("\n"));
    setStatus("📋 Copied Infrastructure report to clipboard");
  } catch (err) {
    setStatus("🔴 Copy failed: " + err.message);
  }
}

/**
 * Second Brain Dashboard Launch
 */
async function launchSecondBrainDashboard() {
  const dashUrl = "http://localhost:8899";
  try {
    const token = tokenFromUrl();
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    if (isLocal) {
      await fetch(`/api/secondbrain/launch-dashboard${q}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: dashUrl }),
      });
    }
    window.open(dashUrl, "_blank", "noopener");
    setStatus("🧠 Launched Second Brain Dashboard on http://localhost:8899 in Google Chrome");
  } catch (err) {
    window.open(dashUrl, "_blank", "noopener");
    setStatus("🧠 Opened Second Brain Dashboard");
  }
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
    renderSessionWidget();
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
      noteActivity();
    }
    if (msg.type === "exit") {
      sessionStorage.removeItem(SESSION_KEY);
      clearSessionAge();
      stopPing();
      term.write(`\r\n\x1b[33m👋 shell exited (${msg.exitCode ?? "?"})\x1b[0m\r\n`);
      setStatus("⚪ disconnected");
      renderSessionWidget();
    }
  });

  socket.addEventListener("close", () => {
    connected = false;
    stopPing();
    setStatus("⚪ disconnected");
    renderSessionWidget();
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

let draggedProject = null;

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

function moveProjectToFront(name) {
  if (!name) return;
  const list = loadPinnedProjects();
  const idx = list.indexOf(name);
  if (idx === 0) return;
  if (idx > 0) {
    list.splice(idx, 1);
  }
  list.unshift(name);
  savePinnedProjects(list);
  renderProjects();
}

function togglePinProject(name) {
  const list = loadPinnedProjects();
  const idx = list.indexOf(name);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.unshift(name);
  }
  savePinnedProjects(list);
  renderProjects();
}

function movePinnedProject(name, offset) {
  const list = loadPinnedProjects();
  const idx = list.indexOf(name);
  if (idx < 0) return;
  const newIdx = idx + offset;
  if (newIdx < 0 || newIdx >= list.length) return;
  list.splice(idx, 1);
  list.splice(newIdx, 0, name);
  savePinnedProjects(list);
  renderProjects();
}

function reversePinnedProjects() {
  const list = loadPinnedProjects();
  if (list.length < 2) return;
  list.reverse();
  savePinnedProjects(list);
  renderProjects();
}

function sortPinnedProjectsAZ() {
  const list = loadPinnedProjects();
  if (list.length < 2) return;
  list.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
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
    chip.dataset.project = project.name;

    if (isPinned) {
      chip.setAttribute("draggable", "true");
      chip.title = `Drag to reorder pinned project · ${project.path}`;

      chip.addEventListener("dragstart", (e) => {
        draggedProject = project.name;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", project.name);
        chip.classList.add("dragging");
      });

      chip.addEventListener("dragend", () => {
        draggedProject = null;
        chip.classList.remove("dragging");
        document.querySelectorAll(".project-chip.drag-over").forEach((el) => el.classList.remove("drag-over"));
      });

      chip.addEventListener("dragover", (e) => {
        if (!draggedProject || draggedProject === project.name) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        chip.classList.add("drag-over");
      });

      chip.addEventListener("dragleave", () => {
        chip.classList.remove("drag-over");
      });

      chip.addEventListener("drop", (e) => {
        e.preventDefault();
        chip.classList.remove("drag-over");
        if (!draggedProject || draggedProject === project.name) return;
        const list = loadPinnedProjects();
        const fromIdx = list.indexOf(draggedProject);
        const toIdx = list.indexOf(project.name);
        if (fromIdx >= 0 && toIdx >= 0) {
          list.splice(fromIdx, 1);
          list.splice(toIdx, 0, draggedProject);
          savePinnedProjects(list);
          renderProjects();
        }
      });

      const pinIdx = pinnedList.indexOf(project.name);
      if (pinIdx > 0) {
        const moveLeftBtn = document.createElement("button");
        moveLeftBtn.type = "button";
        moveLeftBtn.className = "project-move-btn";
        moveLeftBtn.title = `Move ${project.name} left in pinned order`;
        moveLeftBtn.innerHTML = "◀";
        moveLeftBtn.setAttribute("aria-label", `Move ${project.name} left`);
        moveLeftBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          movePinnedProject(project.name, -1);
        });
        chip.append(moveLeftBtn);
      }
    }

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "project-chip-btn";
    const portBadgeText = project.port ? ` :${project.port}` : "";
    btn.textContent = `${isPinned ? "📌" : "📁"} ${project.name}${portBadgeText}`;
    btn.title = project.port
      ? `${project.path} (Port: ${project.port}) · Click to cd`
      : (project.mtimeMs ? `${project.path} · ${new Date(project.mtimeMs).toLocaleString()}` : project.path);
    btn.addEventListener("click", () => {
      cdTo(project.path, project.name);
      moveProjectToFront(project.name);
    });
    chip.append(btn);

    if (project.port) {
      const runServerBtn = document.createElement("button");
      runServerBtn.type = "button";
      runServerBtn.className = "chip-action-btn";
      runServerBtn.title = `Run the server: launches agy and sends 'open the main page with ${project.port}'`;
      runServerBtn.textContent = "▶️";
      runServerBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        runServerForProject(project.name);
      });
      chip.append(runServerBtn);
    }

    if (isPinned) {
      const pinIdx = pinnedList.indexOf(project.name);
      if (pinIdx < pinnedList.length - 1) {
        const moveRightBtn = document.createElement("button");
        moveRightBtn.type = "button";
        moveRightBtn.className = "project-move-btn";
        moveRightBtn.title = `Move ${project.name} right in pinned order`;
        moveRightBtn.innerHTML = "▶";
        moveRightBtn.setAttribute("aria-label", `Move ${project.name} right`);
        moveRightBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          movePinnedProject(project.name, 1);
        });
        chip.append(moveRightBtn);
      }
    }

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

    chip.append(pinBtn);
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
  if (catalog.syncStatus) {
    updateAzureSyncUi(catalog.syncStatus);
  }
  renderProjects();
}

/**
 * Azure Key Vault & Storage Sync Management
 */
function updateAzureSyncUi(syncStatus) {
  if (!syncStatus) return;
  azureSyncState = syncStatus;

  if (azureKvName) azureKvName.textContent = syncStatus.vaultName || "dp-kv-deliverypilot";
  if (azureStorageAcc) azureStorageAcc.textContent = syncStatus.storageAccount || "dpstoryboardsa";
  if (azureStorageCont) azureStorageCont.textContent = syncStatus.container || "ai-jobs-data";
  if (azureBlobName) azureBlobName.textContent = syncStatus.blobName || "chrome-terminal/project-states.json";
  if (azureProjectCount) azureProjectCount.textContent = `${syncStatus.projectCount || syncStatus.itemCount || 0} projects tracked`;

  if (azureLastSynced) {
    if (syncStatus.lastSyncedAt) {
      azureLastSynced.textContent = new Date(syncStatus.lastSyncedAt).toLocaleTimeString();
    } else {
      azureLastSynced.textContent = "Not synced yet";
    }
  }

  if (azureSyncBadgeText) {
    if (syncStatus.status === "syncing") {
      azureSyncBadgeText.textContent = "☁️ Syncing…";
    } else if (syncStatus.status === "error") {
      azureSyncBadgeText.textContent = "☁️ Sync Error";
    } else if (syncStatus.lastSyncedAt) {
      const timeStr = new Date(syncStatus.lastSyncedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      azureSyncBadgeText.textContent = `☁️ Synced (${timeStr})`;
    } else {
      azureSyncBadgeText.textContent = "☁️ Azure Sync";
    }
  }

  if (azureSyncDot) {
    azureSyncDot.className = "azure-sync-dot";
    if (syncStatus.status === "syncing") azureSyncDot.classList.add("sync-active");
    else if (syncStatus.status === "error") azureSyncDot.classList.add("sync-error");
    else azureSyncDot.classList.add("sync-good");
  }

  if (azureSyncModalBadge) {
    azureSyncModalBadge.className = "azure-status-pill";
    if (syncStatus.status === "syncing") {
      azureSyncModalBadge.classList.add("sync-pill-syncing");
      azureSyncModalBadge.textContent = "Syncing…";
    } else if (syncStatus.status === "error") {
      azureSyncModalBadge.classList.add("sync-pill-error");
      azureSyncModalBadge.textContent = "Error";
    } else {
      azureSyncModalBadge.classList.add("sync-pill-synced");
      azureSyncModalBadge.textContent = "Synced";
    }
  }

  if (testingAzureSummaryChip) {
    if (syncStatus.status === "syncing") {
      testingAzureSummaryChip.textContent = "☁️ Azure: Syncing…";
      testingAzureSummaryChip.className = "testing-stat-chip stat-warn";
    } else if (syncStatus.status === "error") {
      testingAzureSummaryChip.textContent = "☁️ Azure: Error";
      testingAzureSummaryChip.className = "testing-stat-chip stat-bad";
    } else if (syncStatus.lastSyncedAt) {
      const timeStr = new Date(syncStatus.lastSyncedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      testingAzureSummaryChip.textContent = `☁️ Azure: Synced (${timeStr})`;
      testingAzureSummaryChip.className = "testing-stat-chip stat-good";
    } else {
      testingAzureSummaryChip.textContent = "☁️ Azure: Ready";
      testingAzureSummaryChip.className = "testing-stat-chip stat-good";
    }
  }
}

async function fetchAzureSyncStatus() {
  if (!isLocal) return;
  try {
    const token = tokenFromUrl();
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    const res = await fetch(`/api/azure-sync/status${q}`);
    if (res.ok) {
      const status = await res.json();
      updateAzureSyncUi(status);
    }
  } catch (err) {
    console.error("[azure-sync] Error checking status:", err);
  }
}

async function openAzureSyncModal() {
  if (!azureSyncModal) return;
  azureSyncModal.hidden = false;
  await fetchAzureSyncStatus();
  await loadAndRenderAzureProjectsTable();
}

function closeAzureSyncModal() {
  if (azureSyncModal) azureSyncModal.hidden = true;
}

async function loadAndRenderAzureProjectsTable() {
  if (!isLocal || !azureProjectsTbody) return;
  try {
    const token = tokenFromUrl();
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    const res = await fetch(`/api/project-states${q}`);
    if (res.ok) {
      const data = await res.json();
      projectStatesCatalog = data.projects || {};
      if (data.syncStatus) updateAzureSyncUi(data.syncStatus);
      renderAzureProjectsTable(azureProjectSearch ? azureProjectSearch.value : "");
    }
  } catch (err) {
    console.error("[azure-sync] Error loading states table:", err);
  }
}

function renderAzureProjectsTable(filter = "") {
  if (!azureProjectsTbody) return;
  azureProjectsTbody.innerHTML = "";

  const query = filter.toLowerCase().trim();
  const entries = Object.values(projectStatesCatalog).filter((p) => {
    if (!query) return true;
    return (
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.port && String(p.port).includes(query)) ||
      (p.framework && p.framework.toLowerCase().includes(query)) ||
      (p.startCommand && p.startCommand.toLowerCase().includes(query))
    );
  });

  if (entries.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="6" style="text-align:center; padding: 18px; color: var(--muted)">No matching projects found. Click <strong>⚡ Re-Assign 30k+ Ports</strong> to scan and allocate ports.</td>`;
    azureProjectsTbody.append(row);
    return;
  }

  for (const proj of entries) {
    const tr = document.createElement("tr");
    const port = proj.port || 30080;
    const initialUrl = proj.initialPage || `http://localhost:${port}/`;
    const startCmd = proj.startCommand || `PORT=${port} npm run dev`;

    tr.innerHTML = `
      <td><strong>📁 ${escapeHtml(proj.name)}</strong></td>
      <td><span class="azure-port-badge">:${port}</span></td>
      <td style="color:var(--muted)">${escapeHtml(proj.framework || "Generic")}</td>
      <td><code>${escapeHtml(startCmd)}</code></td>
      <td><a href="${escapeHtml(initialUrl)}" target="_blank" rel="noopener noreferrer" class="nav-link">${escapeHtml(initialUrl)}</a></td>
      <td>
        <div class="azure-actions-group">
          <button type="button" class="accent azure-action-btn btn-act-run-server" data-project="${escapeHtml(proj.name)}" title="Run the server: launches agy and sends 'open the main page with ${port}'">▶️ Run server</button>
          <button type="button" class="theme-btn azure-action-btn btn-act-chrome" data-url="${escapeHtml(initialUrl)}" title="Open initial page in Google Chrome">🌐 Chrome</button>
        </div>
      </td>
    `;
    azureProjectsTbody.append(tr);
  }

  // Attach event listeners for table buttons
  azureProjectsTbody.querySelectorAll(".btn-act-run-server").forEach((btn) => {
    btn.addEventListener("click", () => {
      const projName = btn.getAttribute("data-project");
      if (projName) {
        closeAzureSyncModal();
        runServerForProject(projName);
      }
    });
  });

  azureProjectsTbody.querySelectorAll(".btn-act-chrome").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-url");
      if (url) openProjectPageInChrome(url);
    });
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

let agentLaunchTimer = null;

async function runServerForProject(projectName, options = {}) {
  if (!isLocal || !projectName) return;
  try {
    const token = tokenFromUrl();
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    const res = await fetch(`/api/project-states/launch-agent${q}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: projectName, openBrowser: false }),
    });

    if (!res.ok) throw new Error(`Launch failed: ${res.status}`);
    const data = await res.json();
    const proj = data.project;
    const assignedPort = proj.port || 30080;
    const agentCmd = options.agentCmd || "agy --effort medium --mode accept-edits";
    const initialPrompt = options.initialPrompt || `open the main page with ${assignedPort}`;

    // Step 1: CD into the project directory
    cdTo(proj.path, proj.name);
    setWatermark(proj.name);

    if (agentLaunchTimer) clearTimeout(agentLaunchTimer);

    // Step 2: Start agy (or configured agent) in shell
    setTimeout(() => {
      sendCommand(agentCmd);
      setStatus(`⏳ Running server for ${proj.name}… sending "${initialPrompt}" in 2.8s`);

      // Step 3: Timer after agy initialises to send the prompt
      agentLaunchTimer = setTimeout(() => {
        sendInput(`${initialPrompt}\n`);
        setStatus(`▶️ Sent: "${initialPrompt}"`);
      }, 2800);
    }, 450);

  } catch (err) {
    console.error("[azure-sync] Error running server:", err);
    setStatus(`🔴 Run server error: ${err.message}`);
  }
}

const launchAgentForProject = runServerForProject;

async function openProjectPageInChrome(url) {
  if (!url) return;
  try {
    const token = tokenFromUrl();
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    await fetch(`/api/project-states/open-page${q}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    window.open(url, "_blank", "noopener");
  } catch (err) {
    window.open(url, "_blank", "noopener");
  }
}

async function syncAllWithAzure() {
  if (!isLocal) return;
  updateAzureSyncUi({ ...azureSyncState, status: "syncing" });
  try {
    const token = tokenFromUrl();
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    const res = await fetch(`/api/azure-sync/sync${q}`, { method: "POST" });
    const data = await res.json();
    if (data.syncStatus) updateAzureSyncUi(data.syncStatus);
    await loadProjects();
    await loadAndRenderAzureProjectsTable();
    setStatus("☁️ Synced states to Azure Key Vault & Storage");
  } catch (err) {
    console.error("[azure-sync] Sync failed:", err);
    updateAzureSyncUi({ ...azureSyncState, status: "error", error: err.message });
    setStatus(`🔴 Azure Sync failed: ${err.message}`);
  }
}

async function assignUniquePortsAll() {
  if (!isLocal) return;
  updateAzureSyncUi({ ...azureSyncState, status: "syncing" });
  try {
    const token = tokenFromUrl();
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    const res = await fetch(`/api/project-states/assign-ports${q}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ push: true }),
    });
    const data = await res.json();
    if (data.syncStatus) updateAzureSyncUi(data.syncStatus);
    await loadProjects();
    await loadAndRenderAzureProjectsTable();
    setStatus("⚡ Assigned 30k+ unique ports to all projects & synced to Azure");
  } catch (err) {
    console.error("[azure-sync] Port assignment error:", err);
    setStatus(`🔴 Port assignment error: ${err.message}`);
  }
}

async function pullFromAzure() {
  if (!isLocal) return;
  updateAzureSyncUi({ ...azureSyncState, status: "syncing" });
  try {
    const token = tokenFromUrl();
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    const res = await fetch(`/api/azure-sync/pull${q}`, { method: "POST" });
    const data = await res.json();
    if (data.syncStatus) updateAzureSyncUi(data.syncStatus);
    await loadProjects();
    await loadAndRenderAzureProjectsTable();
    setStatus("⬇️ Pulled latest project states from Azure Blob");
  } catch (err) {
    console.error("[azure-sync] Pull failed:", err);
    updateAzureSyncUi({ ...azureSyncState, status: "error" });
    setStatus(`🔴 Pull failed: ${err.message}`);
  }
}

async function pushToAzure() {
  if (!isLocal) return;
  updateAzureSyncUi({ ...azureSyncState, status: "syncing" });
  try {
    const token = tokenFromUrl();
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    const res = await fetch(`/api/azure-sync/push${q}`, { method: "POST" });
    const data = await res.json();
    if (data.syncStatus) updateAzureSyncUi(data.syncStatus);
    setStatus("⬆️ Pushed project states to Azure Blob");
  } catch (err) {
    console.error("[azure-sync] Push failed:", err);
    updateAzureSyncUi({ ...azureSyncState, status: "error" });
    setStatus(`🔴 Push failed: ${err.message}`);
  }
}

term.onData((data) => {
  if (!connected) return;
  const filtered = stripMouseReports(data);
  if (!filtered) return;
  if (filtered === "\x03") {
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
  send({ type: "input", data: filtered });
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
    const badge = btn.getAttribute("data-badge") || cmd;
    sendCommand(cmd);
    if (badge) setWatermark(badge);
    setActiveAgent(badge, cmd);
  });
});

if (btnRerunAgent) btnRerunAgent.addEventListener("click", rerunLastAgent);
if (btnStopAgent) btnStopAgent.addEventListener("click", stopRunningAgent);

document.querySelectorAll("[data-effort]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const level = btn.getAttribute("data-effort");
    if (!level) return;
    sendCommand(`/effort ${level}`);
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

if (btnBadgeEmoji) btnBadgeEmoji.addEventListener("click", openEmojiPicker);
if (emojiPickerClose) emojiPickerClose.addEventListener("click", closeEmojiPicker);
if (emojiPickerModal) {
  emojiPickerModal.addEventListener("click", (event) => {
    if (event.target === emojiPickerModal) closeEmojiPicker();
  });
}
if (emojiSearchInput) {
  emojiSearchInput.addEventListener("input", (e) => {
    renderEmojiPicker(activeEmojiCategory, e.target.value);
  });
}
if (emojiCatTabs) {
  emojiCatTabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".emoji-tab-btn");
    if (!btn) return;
    activeEmojiCategory = btn.getAttribute("data-cat") || "all";
    document.querySelectorAll(".emoji-tab-btn").forEach((b) => b.classList.toggle("active", b === btn));
    renderEmojiPicker(activeEmojiCategory, emojiSearchInput ? emojiSearchInput.value : "");
  });
}
document.querySelectorAll(".quick-emoji-chip").forEach((btn) => {
  btn.addEventListener("click", () => {
    const em = btn.getAttribute("data-emoji");
    if (em) insertEmojiToWatermark(em);
  });
});
if (btnEmojiClearBadge) {
  btnEmojiClearBadge.addEventListener("click", () => {
    setWatermark("");
    closeEmojiPicker();
  });
}

projectFilter.addEventListener("input", renderProjects);
document.getElementById("btn-sort-name").addEventListener("click", () => setProjectSort("name"));
document.getElementById("btn-sort-latest").addEventListener("click", () => setProjectSort("latest"));
const btnPinnedSortAz = document.getElementById("btn-pinned-sort-az");
if (btnPinnedSortAz) btnPinnedSortAz.addEventListener("click", sortPinnedProjectsAZ);
const btnPinnedReverse = document.getElementById("btn-pinned-reverse");
if (btnPinnedReverse) btnPinnedReverse.addEventListener("click", reversePinnedProjects);
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

// Test Panel listeners
if (btnTestingSpeedModal) btnTestingSpeedModal.addEventListener("click", openNetModal);
if (btnTestingRunSpeed) btnTestingRunSpeed.addEventListener("click", runSpeedTest);
if (btnTestingRetestAll) btnTestingRetestAll.addEventListener("click", runAllNetworkTests);

if (btnTestAzureModal) btnTestAzureModal.addEventListener("click", openAzureSyncModal);
if (btnTestAzureSyncAll) btnTestAzureSyncAll.addEventListener("click", syncAllWithAzure);
if (btnTestAzurePull) btnTestAzurePull.addEventListener("click", pullFromAzure);
if (btnTestAzurePush) btnTestAzurePush.addEventListener("click", pushToAzure);
if (btnTestAssignPorts) btnTestAssignPorts.addEventListener("click", assignUniquePortsAll);

if (btnTestingCheckAi) btnTestingCheckAi.addEventListener("click", () => checkAiConnections(true));
if (btnRetestAiModal) btnRetestAiModal.addEventListener("click", () => checkAiConnections(false));
if (btnTestSendHello) btnTestSendHello.addEventListener("click", () => sendAiHello());
if (btnModalSendHello) btnModalSendHello.addEventListener("click", () => sendAiHello());
if (aiTestModalClose) aiTestModalClose.addEventListener("click", closeAiTestModal);
if (aiTestModal) {
  aiTestModal.addEventListener("click", (event) => {
    if (event.target === aiTestModal) closeAiTestModal();
  });
}
if (btnCopyAiDiag) btnCopyAiDiag.addEventListener("click", copyAiReport);

if (btnTestingCheckInfra) btnTestingCheckInfra.addEventListener("click", () => checkInfraConnections(true));
if (btnRetestInfraModal) btnRetestInfraModal.addEventListener("click", () => checkInfraConnections(false));
if (infraTestModalClose) infraTestModalClose.addEventListener("click", closeInfraTestModal);
if (infraTestModal) {
  infraTestModal.addEventListener("click", (event) => {
    if (event.target === infraTestModal) closeInfraTestModal();
  });
}
if (btnCopyInfraDiag) btnCopyInfraDiag.addEventListener("click", copyInfraReport);
if (btnOpenProxmox) {
  btnOpenProxmox.addEventListener("click", () => openProjectPageInChrome("https://proxmox.rifaterdemsahin.com"));
}
if (btnOpenN8n) {
  btnOpenN8n.addEventListener("click", () => openProjectPageInChrome("https://n8n.rifaterdemsahin.com"));
}

// Second Brain Panel listeners
if (btnSbCd) {
  btnSbCd.addEventListener("click", () => {
    cdTo("/Users/rifaterdemsahin/secondbrain-azurefiles/secondbrain", "vault");
  });
}
const SECONDBRAIN_VAULT_PATH = "/Users/rifaterdemsahin/secondbrain-azurefiles/secondbrain";
if (btnSbAgy) {
  btnSbAgy.addEventListener("click", () => {
    const cmd = "agy --effort medium --mode accept-edits";
    sendCommand(`cd ${SECONDBRAIN_VAULT_PATH} && ${cmd}`);
    setWatermark("🧠 agy");
    setActiveAgent("🧠 agy", cmd, SECONDBRAIN_VAULT_PATH);
  });
}
if (btnSbGrok) {
  btnSbGrok.addEventListener("click", () => {
    const cmd = "grok --effort medium --permission-mode acceptEdits";
    sendCommand(`cd ${SECONDBRAIN_VAULT_PATH} && ${cmd}`);
    setWatermark("🧠 grok");
    setActiveAgent("🧠 grok", cmd, SECONDBRAIN_VAULT_PATH);
  });
}
if (btnSbClaude) {
  btnSbClaude.addEventListener("click", () => {
    const cmd = "claude --model sonnet --effort medium --dangerously-skip-permissions";
    sendCommand(`cd ${SECONDBRAIN_VAULT_PATH} && ${cmd}`);
    setWatermark("🧠 claude");
    setActiveAgent("🧠 claude", cmd, SECONDBRAIN_VAULT_PATH);
  });
}
if (btnSbDeepseek) {
  btnSbDeepseek.addEventListener("click", () => {
    const cmd = "kilo";
    sendCommand(`cd ${SECONDBRAIN_VAULT_PATH} && ${cmd}`);
    setWatermark("🧠 deepseek");
    setActiveAgent("🧠 deepseek", cmd, SECONDBRAIN_VAULT_PATH);
  });
}
if (btnSbPap) {
  btnSbPap.addEventListener("click", () => {
    sendCommand("cd /Users/rifaterdemsahin/secondbrain-azurefiles && ./archive-pull-push.sh");
    setStatus("⚡ Running PAP (Pull · Push · Archive)…");
  });
}
if (btnSbPull) {
  btnSbPull.addEventListener("click", () => {
    sendCommand("cd /Users/rifaterdemsahin/secondbrain-azurefiles && ./archive-pull-push.sh");
    setStatus("⬇️ Pulling vault…");
  });
}
if (btnSbPush) {
  btnSbPush.addEventListener("click", () => {
    sendCommand("cd /Users/rifaterdemsahin/secondbrain-azurefiles && ./archive-pull-push.sh --no-pull");
    setStatus("⬆️ Pushing vault…");
  });
}
if (btnSbArchive) {
  btnSbArchive.addEventListener("click", () => {
    sendCommand("cd /Users/rifaterdemsahin/secondbrain-azurefiles && ./archive-pull-push.sh --with-consistency-check");
    setStatus("📦 Archiving vault…");
  });
}
if (btnSbLaunchDashboard) {
  btnSbLaunchDashboard.addEventListener("click", launchSecondBrainDashboard);
}

if (azureSyncBadge) azureSyncBadge.addEventListener("click", openAzureSyncModal);
if (btnAzureModal) btnAzureModal.addEventListener("click", openAzureSyncModal);
if (azureSyncClose) azureSyncClose.addEventListener("click", closeAzureSyncModal);
if (azureSyncModal) {
  azureSyncModal.addEventListener("click", (event) => {
    if (event.target === azureSyncModal) closeAzureSyncModal();
  });
}
if (btnModalSyncAll) btnModalSyncAll.addEventListener("click", syncAllWithAzure);
if (btnModalAssignPorts) btnModalAssignPorts.addEventListener("click", assignUniquePortsAll);
if (btnModalPullAzure) btnModalPullAzure.addEventListener("click", pullFromAzure);
if (btnModalPushAzure) btnModalPushAzure.addEventListener("click", pushToAzure);
if (azureProjectSearch) {
  azureProjectSearch.addEventListener("input", (e) => renderAzureProjectsTable(e.target.value));
}
if (btnAssignPortsMenu) btnAssignPortsMenu.addEventListener("click", assignUniquePortsAll);
if (btnSyncAzureMenu) btnSyncAzureMenu.addEventListener("click", syncAllWithAzure);
if (btnAgentMainPage) {
  btnAgentMainPage.addEventListener("click", () => {
    let projName = "";
    if (currentCwdPath) {
      const parts = currentCwdPath.split("/").filter(Boolean);
      const last = parts[parts.length - 1];
      if (last && (projectStatesCatalog[last] || (catalog.projects && catalog.projects.some((p) => p.name === last)))) {
        projName = last;
      }
    }
    if (!projName) {
      const pinned = loadPinnedProjects();
      if (pinned.length > 0) projName = pinned[0];
      else if (catalog.projects && catalog.projects.length > 0) projName = catalog.projects[0].name;
    }
    if (projName) {
      runServerForProject(projName);
    } else {
      setStatus("Select a project first");
    }
  });
}

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
  if (azureSyncModal && !azureSyncModal.hidden) {
    closeAzureSyncModal();
    return;
  }
  if (emojiPickerModal && !emojiPickerModal.hidden) {
    closeEmojiPicker();
    return;
  }
  if (netModalEl && !netModalEl.hidden) {
    closeNetModal();
    return;
  }
  if (aiTestModal && !aiTestModal.hidden) {
    closeAiTestModal();
    return;
  }
  if (infraTestModal && !infraTestModal.hidden) {
    closeInfraTestModal();
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
  startSessionWidgetClock();
  hydrateLastRunFromServer();
  fit();
  connect();
  loadProjects().catch((err) => {
    projectBar.textContent = err.message;
  });
  checkPing();
  checkDns();
  checkAiConnections();
  checkInfraConnections();
  setInterval(checkPing, 8000);
  setInterval(checkAiConnections, 45000);
  setInterval(checkInfraConnections, 45000);
  fetchAzureSyncStatus();
  setInterval(fetchAzureSyncStatus, 15000);
  if (!isLocal) openGuide();
});
