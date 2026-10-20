# Whiskerwood: rules for AI agents

Kids' tap-to-play browser game, deployed by GitHub Pages from the repo root. No build step, no npm, no bundler.
Requests come from children, so keep changes tiny and visible.

## Where things live
- `game-data.js` - ALL content as `window.GAME_DATA`: town buildings, people, trees, roads, rooms and their objects, items, clothes, messages, rewards, colours, emoji, positions, tap tuning, title.
- `engine.js` - mechanics only. Reads everything from `GAME_DATA`.
- `index.html` - markup and CSS. Loads `gate.js`, `game-data.js`, `engine.js` (the last two with `?v=Date.now()` cache-busting).
- `gate.js` - family password screen. Do not change unless asked.

## Rules
1. Almost every request is a data edit: change ONLY `game-data.js`. Copy a neighbouring entry and adjust it; each block's comment explains the fields.
2. Never hardcode names, emoji, colours, positions, prices or messages in `engine.js`. If a request needs new behaviour, add a small generic option to the engine and put its values in data.
3. Coordinates: world is 480x270, (x,y) is an object's centre, w/h its size. Keep things inside the world.
4. A new building needs a matching room with the same id in `rooms` and an exit object (`kind: "exit"`).
5. No new dependencies or build tooling. Keep 480x270 internal resolution.
6. Keep `game-data.js` valid JavaScript (commas, quotes). A syntax error blanks the game.
7. Every change (content or engine) is committed straight to `main` after the checks pass, so Pages puts it live; no pull requests (Mike decided 2026-10-20). One commit per batch of kid requests (see the kid-change skill).

## Checking
Serve the folder (`python3 -m http.server`) and open `index.html`. The password gate is skipped by setting localStorage `familyGamesUnlock` to the hash in `gate.js`.
