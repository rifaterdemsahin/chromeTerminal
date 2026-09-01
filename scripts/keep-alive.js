import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PORT) || 30847;
const HOST = process.env.HOST || "127.0.0.1";
const HEALTH_URL = `http://${HOST}:${PORT}/health`;
const HEALTH_EVERY_MS = 4000;
const START_GRACE_MS = 2500;
const BACKOFF_MIN_MS = 800;
const BACKOFF_MAX_MS = 15000;

let child = null;
let stopping = false;
let backoffMs = BACKOFF_MIN_MS;
let startedAt = 0;
let restartTimer = null;
let healthTimer = null;

function log(msg) {
  console.log(`[keep-alive ${new Date().toISOString()}] ${msg}`);
}

function startServer() {
  if (stopping || child) return;
  startedAt = Date.now();
  child = spawn(process.execPath, ["server.js"], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });
  log(`started server.js pid=${child.pid} on ${HOST}:${PORT}`);

  child.on("exit", (code, signal) => {
    const pid = child?.pid;
    child = null;
    if (stopping) {
      log(`server pid=${pid} stopped (${signal || code})`);
      return;
    }
    log(`server pid=${pid} down (code=${code} signal=${signal}) — restarting in ${backoffMs}ms`);
    scheduleRestart(backoffMs);
    backoffMs = Math.min(BACKOFF_MAX_MS, Math.floor(backoffMs * 1.6));
  });
}

function scheduleRestart(delay) {
  if (stopping || restartTimer) return;
  restartTimer = setTimeout(() => {
    restartTimer = null;
    startServer();
  }, delay);
}

function killServer(reason) {
  if (!child) return;
  log(`${reason} — stopping pid=${child.pid}`);
  try {
    child.kill("SIGTERM");
  } catch {
    // already gone
  }
  setTimeout(() => {
    if (child && !child.killed) {
      try {
        child.kill("SIGKILL");
      } catch {
        // gone
      }
    }
  }, 1500);
}

async function healthy() {
  try {
    const res = await fetch(HEALTH_URL, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
}

async function checkHealth() {
  if (stopping || !child) return;
  if (Date.now() - startedAt < START_GRACE_MS) return;
  if (await healthy()) {
    backoffMs = BACKOFF_MIN_MS;
    return;
  }
  log(`health check failed at ${HEALTH_URL}`);
  killServer("port/health down");
}

function shutdown() {
  if (stopping) return;
  stopping = true;
  if (restartTimer) clearTimeout(restartTimer);
  if (healthTimer) clearInterval(healthTimer);
  killServer("keep-alive exiting");
  setTimeout(() => process.exit(0), 400);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

log(`watching ${HEALTH_URL} — auto-restart if the process or port ${PORT} is down`);
startServer();
healthTimer = setInterval(checkHealth, HEALTH_EVERY_MS);
