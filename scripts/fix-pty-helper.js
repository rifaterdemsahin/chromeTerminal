import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const prebuilds = path.join(root, "node_modules", "node-pty", "prebuilds");

if (!fs.existsSync(prebuilds)) process.exit(0);

for (const dir of fs.readdirSync(prebuilds)) {
  const helper = path.join(prebuilds, dir, "spawn-helper");
  if (!fs.existsSync(helper)) continue;
  try {
    fs.chmodSync(helper, 0o755);
  } catch (err) {
    console.warn("could not chmod", helper, err.message);
  }
}
