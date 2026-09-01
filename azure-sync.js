import { execFile } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const HOME_DIR = os.homedir();
const CONFIG_DIR = path.join(HOME_DIR, ".chromeTerminal");
const LOCAL_STATE_FILE = path.join(CONFIG_DIR, "project-states.json");
const PROJECTS_DIR = process.env.PROJECTS_DIR || path.join(HOME_DIR, "projects");

const DEFAULT_VAULT_NAME = process.env.AZURE_KEYVAULT_NAME || "dp-kv-deliverypilot";
const DEFAULT_BLOB_NAME = "chromeTerminal-projectstates.json";
const BASE_PORT = 30001;
const MAX_PORT = 39999;

let cachedVaultCredentials = null;
let lastSyncStatus = {
  status: "idle", // 'idle' | 'syncing' | 'synced' | 'error'
  lastSyncedAt: null,
  vaultName: DEFAULT_VAULT_NAME,
  storageAccount: "dpprojects",
  container: "states",
  blobName: DEFAULT_BLOB_NAME,
  error: null,
  itemCount: 0,
  syncSource: "local",
};

// Ensure local storage directory exists
function ensureConfigDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

/**
 * Load states from local JSON file
 */
export function loadLocalProjectStates() {
  ensureConfigDir();
  try {
    if (fs.existsSync(LOCAL_STATE_FILE)) {
      const raw = fs.readFileSync(LOCAL_STATE_FILE, "utf8");
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : { projects: {}, meta: {} };
    }
  } catch (err) {
    console.error("[azure-sync] Error reading local state:", err.message);
  }
  return { projects: {}, meta: {} };
}

/**
 * Save states to local JSON file
 */
export function saveLocalProjectStates(data) {
  ensureConfigDir();
  const payload = {
    meta: {
      version: "1.0",
      updatedAt: new Date().toISOString(),
      source: "chromeTerminal",
      ...data.meta,
    },
    projects: data.projects || {},
  };
  fs.writeFileSync(LOCAL_STATE_FILE, JSON.stringify(payload, null, 2), "utf8");
  return payload;
}

/**
 * Inspect a project directory to guess framework and default start command
 */
function inspectProject(dirPath, assignedPort) {
  let framework = "Generic / Static";
  let startCommand = `python3 -m http.server ${assignedPort}`;
  let initialPath = "/";

  const pkgJsonPath = path.join(dirPath, "package.json");
  const pyReqPath = path.join(dirPath, "requirements.txt");
  const pyProjPath = path.join(dirPath, "pyproject.toml");
  const goModPath = path.join(dirPath, "go.mod");
  const cargoPath = path.join(dirPath, "Cargo.toml");
  const indexHtmlPath = path.join(dirPath, "index.html");

  if (fs.existsSync(pkgJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
      const scripts = pkg.scripts || {};
      const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

      if (deps.next) {
        framework = "Next.js";
        startCommand = `PORT=${assignedPort} npm run dev -- -p ${assignedPort}`;
      } else if (deps.vite) {
        framework = "Vite";
        startCommand = `npm run dev -- --port ${assignedPort}`;
      } else if (deps.remotion) {
        framework = "Remotion";
        startCommand = `npm start -- --port ${assignedPort}`;
      } else if (deps.express) {
        framework = "Express.js";
        startCommand = `PORT=${assignedPort} npm start`;
      } else if (scripts.dev) {
        framework = "Node.js (dev)";
        startCommand = `PORT=${assignedPort} npm run dev`;
      } else if (scripts.start) {
        framework = "Node.js (start)";
        startCommand = `PORT=${assignedPort} npm start`;
      } else if (scripts.serve) {
        framework = "Node.js (serve)";
        startCommand = `PORT=${assignedPort} npm run serve`;
      } else {
        framework = "Node.js";
        startCommand = `PORT=${assignedPort} node index.js`;
      }
    } catch {
      framework = "Node.js";
      startCommand = `PORT=${assignedPort} npm start`;
    }
  } else if (fs.existsSync(pyReqPath) || fs.existsSync(pyProjPath) || fs.existsSync(path.join(dirPath, "main.py")) || fs.existsSync(path.join(dirPath, "app.py"))) {
    framework = "Python";
    if (fs.existsSync(path.join(dirPath, "app.py"))) {
      startCommand = `PORT=${assignedPort} python3 app.py`;
    } else if (fs.existsSync(path.join(dirPath, "main.py"))) {
      startCommand = `PORT=${assignedPort} python3 main.py`;
    } else if (fs.existsSync(path.join(dirPath, "manage.py"))) {
      framework = "Django";
      startCommand = `python3 manage.py runserver ${assignedPort}`;
    } else {
      startCommand = `python3 -m http.server ${assignedPort}`;
    }
  } else if (fs.existsSync(goModPath)) {
    framework = "Go";
    startCommand = `PORT=${assignedPort} go run .`;
  } else if (fs.existsSync(cargoPath)) {
    framework = "Rust";
    startCommand = `PORT=${assignedPort} cargo run`;
  } else if (fs.existsSync(indexHtmlPath)) {
    framework = "Static HTML";
    startCommand = `python3 -m http.server ${assignedPort}`;
  }

  return {
    framework,
    startCommand,
    initialPage: `http://localhost:${assignedPort}${initialPath}`,
  };
}

/**
 * Scan all projects in ~/projects and assign unique 30,000+ ports
 */
export function syncAndAssignUniquePorts() {
  const current = loadLocalProjectStates();
  const existingProjects = current.projects || {};

  // Track used ports (must be >= BASE_PORT)
  const usedPorts = new Set();
  for (const p of Object.values(existingProjects)) {
    if (p.port && Number(p.port) >= BASE_PORT && Number(p.port) <= MAX_PORT) {
      usedPorts.add(Number(p.port));
    }
  }

  let nextPortCandidate = BASE_PORT;
  function getNextAvailablePort() {
    while (usedPorts.has(nextPortCandidate) && nextPortCandidate <= MAX_PORT) {
      nextPortCandidate++;
    }
    usedPorts.add(nextPortCandidate);
    return nextPortCandidate;
  }

  let dirs = [];
  try {
    dirs = fs
      .readdirSync(PROJECTS_DIR, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => e.name);
  } catch (err) {
    console.error("[azure-sync] Error listing projects dir:", err.message);
  }

  const updatedProjects = { ...existingProjects };

  for (const dirName of dirs) {
    const fullPath = path.join(PROJECTS_DIR, dirName);
    let assignedPort = existingProjects[dirName]?.port;

    if (!assignedPort || Number(assignedPort) < BASE_PORT) {
      assignedPort = getNextAvailablePort();
    }

    const { framework, startCommand, initialPage } = inspectProject(fullPath, assignedPort);

    let mtimeMs = 0;
    try {
      mtimeMs = fs.statSync(fullPath).mtimeMs;
    } catch {
      mtimeMs = 0;
    }

    updatedProjects[dirName] = {
      name: dirName,
      path: fullPath,
      port: Number(assignedPort),
      framework: existingProjects[dirName]?.framework || framework,
      startCommand: existingProjects[dirName]?.startCommand || startCommand,
      initialPage: existingProjects[dirName]?.initialPage || initialPage,
      pinned: existingProjects[dirName]?.pinned || false,
      notes: existingProjects[dirName]?.notes || "",
      lastRunAt: existingProjects[dirName]?.lastRunAt || null,
      mtimeMs,
      updatedAt: new Date().toISOString(),
      agentPrompt: `cd "${fullPath}" && ${startCommand}; open -a "Google Chrome" "${initialPage}"`,
    };
  }

  const result = saveLocalProjectStates({
    meta: {
      ...current.meta,
      totalProjects: Object.keys(updatedProjects).length,
      lastPortAssigned: nextPortCandidate,
      scannedAt: new Date().toISOString(),
    },
    projects: updatedProjects,
  });

  return result;
}

/**
 * Fetch keys from Azure Key Vault
 */
export async function getAzureKeyVaultCredentials(vaultName = DEFAULT_VAULT_NAME, forceRefresh = false) {
  if (cachedVaultCredentials && !forceRefresh) {
    return cachedVaultCredentials;
  }

  try {
    // 1. Get Storage Account Name
    let storageAccount = "dpprojects";
    try {
      const { stdout: accOut } = await execFileAsync("az", [
        "keyvault",
        "secret",
        "show",
        "--vault-name",
        vaultName,
        "--name",
        "azure-storage-jobs-account",
        "--query",
        "value",
        "-o",
        "tsv",
      ]);
      if (accOut.trim()) storageAccount = accOut.trim();
    } catch (e) {
      // fallback
    }

    // 2. Get Storage Container Name
    let container = "states";
    try {
      const { stdout: contOut } = await execFileAsync("az", [
        "keyvault",
        "secret",
        "show",
        "--vault-name",
        vaultName,
        "--name",
        "azure-storage-jobs-container",
        "--query",
        "value",
        "-o",
        "tsv",
      ]);
      if (contOut.trim()) container = contOut.trim();
    } catch (e) {
      // fallback
    }

    // 3. Get Account Key
    let accountKey = "";
    try {
      const { stdout: keyOut } = await execFileAsync("az", [
        "keyvault",
        "secret",
        "show",
        "--vault-name",
        vaultName,
        "--name",
        "azure-storage-account-key",
        "--query",
        "value",
        "-o",
        "tsv",
      ]);
      accountKey = keyOut.trim();
    } catch (e) {
      // fallback
    }

    // Fallback: If accountKey not present in keyvault secret, retrieve directly via az storage account keys
    if (!accountKey) {
      try {
        const { stdout: dirKey } = await execFileAsync("az", [
          "storage",
          "account",
          "keys",
          "list",
          "--account-name",
          storageAccount,
          "--query",
          "[0].value",
          "-o",
          "tsv",
        ]);
        accountKey = dirKey.trim();
      } catch (e) {
        // failed
      }
    }

    cachedVaultCredentials = {
      vaultName,
      storageAccount,
      container,
      accountKey,
      blobName: DEFAULT_BLOB_NAME,
      fetchedAt: new Date().toISOString(),
    };

    return cachedVaultCredentials;
  } catch (err) {
    throw new Error(`Failed to retrieve credentials from Azure Key Vault "${vaultName}": ${err.message}`);
  }
}

/**
 * Upload local project states to Azure Blob storage
 */
export async function pushProjectStatesToAzure() {
  lastSyncStatus.status = "syncing";
  try {
    const creds = await getAzureKeyVaultCredentials();
    if (!creds.accountKey) {
      throw new Error("Could not obtain Azure Storage account key from Azure Key Vault");
    }

    const state = loadLocalProjectStates();
    const tempFile = path.join(os.tmpdir(), `project-states-${Date.now()}.json`);
    fs.writeFileSync(tempFile, JSON.stringify(state, null, 2), "utf8");

    try {
      await execFileAsync("az", [
        "storage",
        "blob",
        "upload",
        "--account-name",
        creds.storageAccount,
        "--account-key",
        creds.accountKey,
        "--container-name",
        creds.container,
        "--name",
        creds.blobName,
        "--file",
        tempFile,
        "--overwrite",
        "true",
        "-o",
        "json",
      ]);
    } finally {
      if (fs.existsSync(tempFile)) {
        try {
          fs.unlinkSync(tempFile);
        } catch {}
      }
    }

    lastSyncStatus = {
      status: "synced",
      lastSyncedAt: new Date().toISOString(),
      vaultName: creds.vaultName,
      storageAccount: creds.storageAccount,
      container: creds.container,
      blobName: creds.blobName,
      error: null,
      itemCount: Object.keys(state.projects || {}).length,
      syncSource: "azure-blob",
    };

    return { ok: true, syncStatus: lastSyncStatus, state };
  } catch (err) {
    lastSyncStatus.status = "error";
    lastSyncStatus.error = err.message;
    console.error("[azure-sync] Upload error:", err);
    throw err;
  }
}

/**
 * Download project states from Azure Blob storage
 */
export async function pullProjectStatesFromAzure() {
  lastSyncStatus.status = "syncing";
  try {
    const creds = await getAzureKeyVaultCredentials();
    if (!creds.accountKey) {
      throw new Error("Could not obtain Azure Storage account key from Azure Key Vault");
    }

    const tempFile = path.join(os.tmpdir(), `project-states-pull-${Date.now()}.json`);
    try {
      await execFileAsync("az", [
        "storage",
        "blob",
        "download",
        "--account-name",
        creds.storageAccount,
        "--account-key",
        creds.accountKey,
        "--container-name",
        creds.container,
        "--name",
        creds.blobName,
        "--file",
        tempFile,
        "-o",
        "json",
      ]);

      if (fs.existsSync(tempFile)) {
        const remoteData = JSON.parse(fs.readFileSync(tempFile, "utf8"));
        const localData = loadLocalProjectStates();

        // Merge remote and local. lastRun is special-cased: whichever side actually ran
        // something more recently wins, instead of always favoring local (which would make
        // "rerun last" never pick up what another machine just ran).
        const remoteMeta = remoteData.meta || {};
        const localMeta = localData.meta || {};
        let lastRun = localMeta.lastRun || remoteMeta.lastRun || null;
        if (remoteMeta.lastRun && localMeta.lastRun) {
          const remoteAt = new Date(remoteMeta.lastRun.savedAt || 0).getTime();
          const localAt = new Date(localMeta.lastRun.savedAt || 0).getTime();
          lastRun = remoteAt > localAt ? remoteMeta.lastRun : localMeta.lastRun;
        }

        const mergedProjects = { ...(remoteData.projects || {}), ...(localData.projects || {}) };
        const mergedState = saveLocalProjectStates({
          meta: {
            ...remoteMeta,
            ...localMeta,
            lastRun,
            lastPulledAt: new Date().toISOString(),
          },
          projects: mergedProjects,
        });

        lastSyncStatus = {
          status: "synced",
          lastSyncedAt: new Date().toISOString(),
          vaultName: creds.vaultName,
          storageAccount: creds.storageAccount,
          container: creds.container,
          blobName: creds.blobName,
          error: null,
          itemCount: Object.keys(mergedProjects).length,
          syncSource: "azure-blob",
        };

        return { ok: true, syncStatus: lastSyncStatus, state: mergedState };
      }
    } finally {
      if (fs.existsSync(tempFile)) {
        try {
          fs.unlinkSync(tempFile);
        } catch {}
      }
    }
  } catch (err) {
    lastSyncStatus.status = "error";
    lastSyncStatus.error = err.message;
    console.error("[azure-sync] Download error:", err);
    throw err;
  }
}

/**
 * Full bidirectional sync: Assign ports, save locally, push to Azure Key Vault storage
 */
export async function syncProjectStates() {
  const localAssigned = syncAndAssignUniquePorts();
  try {
    const result = await pushProjectStatesToAzure();
    return result;
  } catch (err) {
    return {
      ok: false,
      warning: "Assigned ports saved locally, but Azure upload failed.",
      error: err.message,
      syncStatus: lastSyncStatus,
      state: localAssigned,
    };
  }
}

/**
 * Get current sync status and project list
 */
export function getSyncStatus() {
  const localState = loadLocalProjectStates();
  return {
    ...lastSyncStatus,
    localFile: LOCAL_STATE_FILE,
    projectCount: Object.keys(localState.projects || {}).length,
  };
}

/**
 * Launch initial page in Google Chrome
 */
export async function openPageInChrome(url) {
  if (!url) return { ok: false, error: "URL is required" };
  try {
    if (process.platform === "darwin") {
      await execFileAsync("open", ["-a", "Google Chrome", url]);
    } else if (process.platform === "win32") {
      await execFileAsync("cmd.exe", ["/c", "start", "chrome", url]);
    } else {
      await execFileAsync("google-chrome", [url]);
    }
    return { ok: true, url };
  } catch (err) {
    console.error("[azure-sync] Error opening URL in Chrome:", err.message);
    return { ok: false, error: err.message };
  }
}
