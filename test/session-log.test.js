// Extracts the pure session-log helpers straight out of public/app.js (no build step, no
// exports in that file) and exercises them in a sandboxed vm context with a tiny in-memory
// localStorage shim, so the actual shipped implementation is what's under test.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appJsSource = fs.readFileSync(path.join(__dirname, "..", "public", "app.js"), "utf8");

function extractBetween(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  assert.ok(start !== -1, `could not find "${startMarker}" in public/app.js`);
  assert.ok(end !== -1, `could not find "${endMarker}" in public/app.js`);
  return source.slice(start, end);
}

const sessionLogCode = extractBetween(
  appJsSource,
  "function stripAnsi(text) {",
  "function renderSessionLogModal() {"
);

function makeLocalStorage() {
  const store = new Map();
  return {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
  };
}

function loadSessionLogContext() {
  const localStorage = makeLocalStorage();
  const ctx = vm.createContext({ localStorage, console });
  vm.runInContext(sessionLogCode, ctx);
  return ctx;
}

test("stripAnsi removes CSI color/cursor sequences", () => {
  const ctx = loadSessionLogContext();
  const result = vm.runInContext(
    String.raw`stripAnsi("\x1b[32mhello\x1b[0m \x1b[1;31mworld\x1b[0m")`,
    ctx
  );
  assert.equal(result, "hello world");
});

test("stripAnsi removes OSC title sequences (BEL and ST terminated)", () => {
  const ctx = loadSessionLogContext();
  const bel = vm.runInContext(String.raw`stripAnsi("\x1b]0;my title\x07prompt$ ")`, ctx);
  assert.equal(bel, "prompt$ ");
  const st = vm.runInContext(String.raw`stripAnsi("\x1b]0;my title\x1b\\prompt$ ")`, ctx);
  assert.equal(st, "prompt$ ");
});

test("stripAnsi strips carriage returns but keeps newlines", () => {
  const ctx = loadSessionLogContext();
  const result = vm.runInContext(String.raw`stripAnsi("line one\r\nline two\r\n")`, ctx);
  assert.equal(result, "line one\nline two\n");
});

test("stripAnsi leaves plain text untouched", () => {
  const ctx = loadSessionLogContext();
  const result = vm.runInContext(`stripAnsi("hello-session-log-test")`, ctx);
  assert.equal(result, "hello-session-log-test");
});

test("todaySessionLogKey is namespaced per calendar day", () => {
  const ctx = loadSessionLogContext();
  const key = vm.runInContext("todaySessionLogKey()", ctx);
  const today = new Date().toISOString().slice(0, 10);
  assert.equal(key, `chromeTerminal.sessionLog.${today}`);
});

test("appendSessionLog strips ANSI and accumulates under today's key", () => {
  const ctx = loadSessionLogContext();
  vm.runInContext(String.raw`appendSessionLog("\x1b[32mfirst\x1b[0m ")`, ctx);
  vm.runInContext(`appendSessionLog("second")`, ctx);
  const stored = vm.runInContext("localStorage.getItem(todaySessionLogKey())", ctx);
  assert.equal(stored, "first second");
});

test("appendSessionLog caps stored length and keeps the most recent tail", () => {
  const ctx = loadSessionLogContext();
  const cap = vm.runInContext("SESSION_LOG_MAX_CHARS", ctx);
  vm.runInContext(`appendSessionLog("a".repeat(${cap}))`, ctx);
  vm.runInContext(`appendSessionLog("TAIL")`, ctx);
  const stored = vm.runInContext("localStorage.getItem(todaySessionLogKey())", ctx);
  assert.equal(stored.length, cap);
  assert.ok(stored.endsWith("TAIL"), "should keep the newest data, not the oldest");
});

test("appendSessionLog is a no-op for empty/whitespace-free-of-content chunks", () => {
  const ctx = loadSessionLogContext();
  vm.runInContext(`appendSessionLog("")`, ctx);
  const stored = vm.runInContext("localStorage.getItem(todaySessionLogKey())", ctx);
  assert.equal(stored, null);
});
