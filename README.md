# Whiskerwood

A tap-to-play kitty town game for kids. It runs straight from the repo root on GitHub Pages: no build step, no npm, no bundler.

Built for **rapid child-directed iteration**: a kid asks for something, we change one small file, push, reload.

## Fast path

For almost every request, edit only **`game-data.js`**. Examples:
- "add a dog by the school" -> add a line to `town.people` (or a new object in a room)
- "make the market pink" -> change `color` on the market in `town.buildings`
- add or move a building, room, object, tree or road
- change a message, an emoji, a price, a reward, an item, a clothes colour
- change how forgiving taps are (`tapping`) or where the kitty starts (`player`)

Every block in `game-data.js` has a comment saying what it does and how to add one more.

## Files

- **`game-data.js`** - all content and tuning, as `window.GAME_DATA`. Edit this.
- **`engine.js`** - the game mechanics: drawing, tapping, panels, scaling. It reads everything from `GAME_DATA`. Only change it for new kinds of behaviour.
- **`index.html`** - page markup and CSS. Loads `gate.js`, then `game-data.js`, then `engine.js`, adding `?v=<time>` to the last two on every load so a fresh push shows on reload.
- **`gate.js`** - family password screen, shared across all family games.
- **`.github/workflows/pages.yml`** - static GitHub Pages deployment.

## Rules

1. Prefer a one-file change to `game-data.js`.
2. If a new idea needs new behaviour, add a small generic option to the engine and put its values in data (never hardcode a name, emoji, colour or position in `engine.js`).
3. No dependencies for simple features.
4. One commit per requested change when practical.
5. Keep the 480x270 internal resolution and aspect-correct scaling.
6. If the game shows "game-data.js did not load", look for a missing comma or quote.

The goal is request -> tiny patch -> Pages deploy -> reload.
