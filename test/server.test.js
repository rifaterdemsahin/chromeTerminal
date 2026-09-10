// Black-box smoke tests: boot the real server.js as a child process on a scratch port and hit
// its HTTP surface, so these exercise the actual server (routing, static files, JSON shape)
// rather than a re-implementation of it.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..");
const PORT = 39811;
const BASE_URL = `http://127.0.0.1:${PORT}`;

let serverProcess;

async function waitForServer(timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${BASE_URL}/health`);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  throw new Error("server did not become ready in time");
}

before(async () => {
  serverProcess = spawn(process.execPath, ["server.js"], {
    cwd: repoRoot,
    env: { ...process.env, PORT: String(PORT), HOST: "127.0.0.1" },
    stdio: "pipe",
  });
  await waitForServer();
});

after(async () => {
  if (!serverProcess) return;
  serverProcess.kill();
  await new Promise((resolve) => serverProcess.once("exit", resolve));
});

test("GET /health reports ok with the expected shape", async () => {
  const res = await fetch(`${BASE_URL}/health`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.ok, true);
  assert.equal(body.port, PORT);
  assert.ok(typeof body.shell === "string" && body.shell.length > 0);
});

test("GET / serves the terminal shell with the core UI wired up", async () => {
  const res = await fetch(`${BASE_URL}/`);
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.match(html, /id="terminal"/);
  assert.match(html, /id="btn-save"/);
  assert.match(html, /id="btn-session-log"/);
  assert.match(html, /id="session-log-modal"/);
});

test("GET /app.js serves the client script with the session-log feature intact", async () => {
  const res = await fetch(`${BASE_URL}/app.js`);
  assert.equal(res.status, 200);
  const js = await res.text();
  assert.match(js, /function appendSessionLog/);
  assert.match(js, /function stripAnsi/);
  assert.match(js, /onSelectionChange/);
});

test("GET /api/projects returns the projects list shape", async () => {
  const res = await fetch(`${BASE_URL}/api/projects`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body.projects));
  assert.ok(typeof body.projectsDir === "string");
});

test("GET /api/last-run returns ok", async () => {
  const res = await fetch(`${BASE_URL}/api/last-run`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.ok, true);
});

test("unknown API route returns 404", async () => {
  const res = await fetch(`${BASE_URL}/api/does-not-exist`);
  assert.equal(res.status, 404);
});
