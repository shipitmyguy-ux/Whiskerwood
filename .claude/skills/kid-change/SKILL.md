---
name: kid-change
description: Use when the kids ask for a change to this game (a new building, animal, person, message, colour, reward or item). Edits only game-data.js and puts it live.
---
1. List every request in the message; do them all in one pass.
2. Hand the edits to the `chores` helper: change only `game-data.js`, copying a neighbouring entry and following the comments above each block. A new building also needs its room (same id) with an exit.
3. If a request needs new behaviour the data can't express, stop and say so; that is an engine change for the `implementer` on a branch.
4. Check: `node --check game-data.js` must pass.
5. Commit once ("Kid request: <short list>") and `git push origin main`.
6. Confirm the "Deploy Whiskerwood" Pages run for that commit succeeds, then tell the parent to reload the game.
