import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const label = "com.rifaterdemsahin.chrometerminal";
const uid = process.getuid?.() ?? os.userInfo().uid;
const domain = `gui/${uid}`;
const agentsDir = path.join(os.homedir(), "Library", "LaunchAgents");
const plistPath = path.join(agentsDir, `${label}.plist`);
const logDir = path.join(os.homedir(), "Library", "Logs");
const outLog = path.join(logDir, "chromeTerminal.out.log");
const errLog = path.join(logDir, "chromeTerminal.err.log");
const uninstall = process.argv.includes("--uninstall");

function launchctl(args) {
  return spawnSync("launchctl", args, { encoding: "utf8" });
}

function xmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function bootout() {
  launchctl(["bootout", `${domain}/${label}`]);
  launchctl(["bootout", domain, plistPath]);
}

if (uninstall) {
  bootout();
  try {
    fs.unlinkSync(plistPath);
  } catch {
    // already gone
  }
  console.log(`removed LaunchAgent ${label}`);
  process.exit(0);
}

fs.mkdirSync(agentsDir, { recursive: true });
fs.mkdirSync(logDir, { recursive: true });

const startCmd = `cd ${JSON.stringify(root)} && exec node scripts/keep-alive.js`;

const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${xmlEscape(label)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/zsh</string>
    <string>-lc</string>
    <string>${xmlEscape(startCmd)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${xmlEscape(root)}</string>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>5</integer>
  <key>StandardOutPath</key>
  <string>${xmlEscape(outLog)}</string>
  <key>StandardErrorPath</key>
  <string>${xmlEscape(errLog)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOST</key>
    <string>127.0.0.1</string>
    <key>PORT</key>
    <string>3847</string>
  </dict>
</dict>
</plist>
`;

fs.writeFileSync(plistPath, plist);
bootout();
const loaded = launchctl(["bootstrap", domain, plistPath]);
if (loaded.status !== 0) {
  console.error(loaded.stderr || loaded.stdout || "launchctl bootstrap failed");
  process.exit(loaded.status || 1);
}

console.log(`LaunchAgent installed: ${plistPath}`);
console.log("Starts at login (your user session) and relaunches if it dies.");
console.log(`Open http://127.0.0.1:3847`);
console.log(`Logs: ${outLog}`);
console.log("Remove with: npm run macos-uninstall");
