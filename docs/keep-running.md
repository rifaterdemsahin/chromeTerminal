# Keeping chromeTerminal always running (macOS login)

This documents how the app was set up to run continuously and to auto-start
every time you log in to this Mac. Done on 2026-09-02.

## What "always on" means here

Two layers of supervision:

1. **launchd LaunchAgent** — starts the app at login (`RunAtLoad`) and relaunches
   it if the process dies (`KeepAlive`). Runs as *your* user, not root.
2. **keep-alive.js** — the LaunchAgent doesn't run `server.js` directly; it runs
   `scripts/keep-alive.js`, which spawns the server, polls
   `http://127.0.0.1:3847/health` every few seconds, and restarts the server if
   the port dies or health fails.

So even if the server crashes, keep-alive restarts it; if keep-alive itself dies,
launchd restarts keep-alive. Survives logout/login and reboot (at next login).

## Steps performed

```bash
cd /Users/rifaterdemsahin/Projects/chromeTerminal

# 1. Install dependencies (also runs postinstall -> fix-pty-helper.js)
npm install

# 2. Install + load the macOS LaunchAgent (starts it now AND at every login)
npm run macos-install
```

`npm run macos-install` writes and loads:

| | |
|---|---|
| Label | `com.rifaterdemsahin.chrometerminal` |
| Plist | `~/Library/LaunchAgents/com.rifaterdemsahin.chrometerminal.plist` |
| Command | `/bin/zsh -lc 'cd <repo> && exec node scripts/keep-alive.js'` |
| Env | `HOST=127.0.0.1`, `PORT=3847` |
| Starts | At login (`RunAtLoad`) |
| Restarts | `KeepAlive` (launchd) + health polling (keep-alive.js) |
| Logs | `~/Library/Logs/chromeTerminal.out.log` / `.err.log` |

`/bin/zsh -lc` is used so a login shell puts the right `node` on `PATH`.

## Verify it's running

```bash
# Health endpoint should return {"ok":true,...}
curl -s http://127.0.0.1:3847/health

# launchd should show state = running with a pid
launchctl print gui/$(id -u)/com.rifaterdemsahin.chrometerminal | grep -E "state|pid"

# Open the UI
open -a "Google Chrome" http://127.0.0.1:3847
```

Verified on install: health returned `{"ok":true,...}` and launchd reported
`state = running`.

## Tail the logs

```bash
tail -f ~/Library/Logs/chromeTerminal.out.log
tail -f ~/Library/Logs/chromeTerminal.err.log
```

## Stop / restart / uninstall

```bash
# Restart now (launchd will relaunch because of KeepAlive)
launchctl kickstart -k gui/$(id -u)/com.rifaterdemsahin.chrometerminal

# Uninstall (bootout + delete the plist) — app will no longer start at login
npm run macos-uninstall
```

## Gotcha

If the LaunchAgent is loaded, do **not** also run `npm start` in a terminal —
two keepers will fight over port 3847. Uninstall first for a manual session.
