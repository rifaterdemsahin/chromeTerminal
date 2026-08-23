# chromeTerminal

A local web terminal for macOS. The browser talks to a Node server on localhost; the server spawns your real shell (`zsh` by default) in a PTY so you can run commands as if you were in Terminal.app.

**This is your machine.** It is bound to `127.0.0.1` on purpose. Do not expose it to the internet.

## Run

```bash
npm install
npm start
```

Then open [http://127.0.0.1:3847](http://127.0.0.1:3847) in Chrome. Use the **Guide** button in the top menu for the in-app walkthrough.

## GitHub Pages

The UI and guide are published at [https://rifaterdemsahin.github.io/chromeTerminal/](https://rifaterdemsahin.github.io/chromeTerminal/). That site is static: it explains the app and shows the chrome. It does **not** attach to your Mac. The live PTY is only `npm start` on localhost. A GitHub Actions workflow deploys `public/` on every push to `main`.

```bash
open -a "Google Chrome" http://127.0.0.1:3847
```

## Optional token

```bash
TERMINAL_TOKEN=secret npm start
# open http://127.0.0.1:3847/?token=secret
```

## Notes

- Shell defaults to `$SHELL`, usually `/bin/zsh`.
- Working directory is your home folder.
- Each browser tab is its own PTY session.
- `node-pty` uses a native addon. After `npm install`, `postinstall` marks `spawn-helper` executable (npm often drops the +x bit on macOS).
- If spawn still fails, run `xcode-select --install` and `npm rebuild node-pty`.
