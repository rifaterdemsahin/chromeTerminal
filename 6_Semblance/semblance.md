# Semblance: Collapse all was not fixed on the first run

> **Incident Classification:** Semblance / Agent miss  
> **Source:** chromeTerminal panels toolbar, `📦 Collapse all` / `📂 Expand all`  
> **Timestamp:** 2026-09-27  
> **Fix commit:** `b4e807e` on `main`

---

## What was asked

The first request was: the Collapse all button does not work. Fix it and push.

The button in question is the panels control in `public/index.html`:

```html
<button type="button" id="btn-collapse-all" title="Hide all collapsible panels">📦 Collapse all</button>
<button type="button" id="btn-expand-all" title="Show every chrome panel">📂 Expand all</button>
```

The failure that mattered was a two-step sequence: Expand all opens every strip, and Collapse all has to undo that.

## What the first run did

The first pass treated “does not work” as “the click does nothing.” It opened the local app and clicked Collapse all while the strips were already open. Menu, Projects, Agents, Second Brain, Test, Badge, Theme, Help, and About all hid, and the closed state survived a reload. The file-tree Collapse all was checked as well and closed every folder.

That looked like a working button. The code was left unchanged and nothing was pushed. `main` already matched `origin/main`.

## Why that looked like success

Three checks were the wrong checks for this bug.

1. **The starting state was already “open.”** Collapse all was tested as a hide action, not as the undo of Expand all. Expand all was tried later, from an already collapsed page, and was not immediately followed by Collapse all.
2. **The button always looked selected.** It had `class="accent"`, so the border and label stayed in the accent color even while the strips were still open. A blue Collapse all next to a plain Expand all reads as “this control is on,” which is the same picture as a click that did not revert anything.
3. **The hide path could skip the screen.** `setAllPanels` wrote `localStorage` before it applied the closed class. If that write threw (a full session log can fill the quota), the strips never updated. Expand all uses the same save, so a quota failure would have blocked both buttons. The first browser profile was empty, so the throw never happened and the gap stayed hidden.

## What was missed until the screenshot

The follow-up was explicit: Expand all works, and Collapse all does not revert that operation. The screenshot was the panels pair, with Collapse all filled blue and Expand all not.

That sequence is the one that had to pass: click Expand all, confirm every strip is open, click Collapse all, confirm every strip is hidden. The first run never locked the test to that pair of clicks.

## What the second run changed

Commit `b4e807e` (`Make Collapse all hide the panels that Expand all opened.`):

- The panels bar handles both buttons, and each button calls `setAllPanels` itself.
- The strips are hidden with the `collapsed` class and the `hidden` attribute. Both are `display: none !important`, so a later `display: flex` rule cannot leave them on screen.
- The screen updates before the state is saved. A storage error no longer cancels the hide.
- `📦 Collapse all` is no longer permanently accent-colored. It looks selected only when every strip is closed. `📂 Expand all` looks selected only when every strip is open.

Verified in the browser: Expand all opens the strips and marks itself pressed. Collapse all then hides them and marks itself pressed. Opening Menu alone and clicking Collapse all hides Menu again.

## How to avoid the same miss

When a control is a pair, test the pair in order. “Collapse all works” means Expand all, then Collapse all, and the second click undoes the first. A button that is styled as active all the time is not evidence that the click landed.
