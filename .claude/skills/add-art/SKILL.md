---
name: add-art
description: Use when Mike wants a picture (Gemini art) instead of an emoji for a building, room object, townsperson, the player cat or other drawn thing in the game.
---
Rule: Claude never opens or views image files. Trust the size printed by fit-art.py.

1. Give Mike this Gemini prompt, filling in the subject:
   "A single <subject> for a cute kids' game, flat cartoon style, thick dark outline, soft colours, centred, facing the viewer, plain transparent background (or plain white if transparency is unavailable), no text, no shadow, square 512x512."
   Keep the wording identical for every character so the style matches.
   For a person or the cat, say "standing, full body, facing the viewer" and keep max size 128.
2. Mike saves the file as `assets/incoming/<id>.png` and tells you the id (the entry's id in `game-data.js`; or `player` for the cat; for people use their name, e.g. `miss-maple`).
3. Hand the rest to the `chores` helper:
   - `python3 tools/fit-art.py assets/incoming/<id>.png assets/<id>.png` (optional 3rd arg: max size, default 128).
   - In `game-data.js`, add `img: "assets/<id>.png"` to the matching entry (next to its `icon`; for `player` put it in the `player` block, for a person on their line). The emoji (or the colour rectangles for characters) stays as the fallback. A picture hides the cat's shirt colour; that's fine.
   - `node --check game-data.js` must pass.
   - Commit "Art: <id>" (only `assets/<id>.png` and `game-data.js`; incoming originals are git-ignored) and `git push origin main`, like the kid-change skill.
4. Tell Mike to reload the game.
