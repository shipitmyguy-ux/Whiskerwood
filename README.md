# Whiskerwood

Whiskerwood is optimized for **rapid child-directed iteration**.

## Fast path

For almost every gameplay/content request, edit only **`game-data.js`** and commit to `main`.

Examples that should be data-only:
- add/remove/move a building
- add an animal
- change a message
- add a quest
- change a reward
- change player speed
- recolor an area
- move a road
- add basic scenery

## Files

- **`game-data.js`** — child-facing content and tuning. Preferred edit target.
- **`game.js`** — stable engine: movement, input, interaction, drawing, UI, scaling.
- **`index.html`** — stable shell and controls. Cache-busts JS on every load so fresh edits show immediately.
- **`.github/workflows/pages.yml`** — static GitHub Pages deployment. No npm, build step, bundler, or transpiler.

## Iteration rules

1. Prefer a one-file change to `game-data.js`.
2. Do not introduce dependencies for simple features.
3. Keep the engine generic; put behavior parameters in data.
4. Make one commit per requested iteration when practical.
5. Preserve 480x270 internal resolution and aspect-correct scaling.
6. Favor working, immediately visible changes over architectural complexity.

The goal is request → tiny patch → Pages deploy → reload.
