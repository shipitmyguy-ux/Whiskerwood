// WHISKERWOOD CONTENT. This is the file to edit for almost every change.
// Everything here is plain data: names, emoji, colours, positions, messages, prices.
// The game itself (engine.js) just reads this file, so a small edit here changes the game.
//
// HOW POSITIONS WORK: the world is 480 wide and 270 tall. x goes right, y goes down.
// (x, y) is the CENTRE of a thing. w and h are its width and height.
// HOW COLOURS WORK: "#rrggbb" codes, like "#d8798e" (pink). Search "hex colour picker" to find more.
// Careful: keep every comma and quote, or the game will show an error message instead.

window.GAME_DATA = {

  // ---- Title ----
  // tabTitle is the browser tab name. The bar at the top shows icon + hudTitle + the coin counter.
  title: { tabTitle: "Whiskerwood", icon: "🐱", hudTitle: "WHISKERWOOD", coinIcon: "⭐" },

  // ---- Our kitty and where she starts ----
  // Optional img: "assets/player.png" draws a picture instead of the colours (shirt colour then won't show).
  player: {
    start: { x: 240, y: 170, coins: 0, shirt: "#7396c8" }, // where she starts, coins, shirt colour
    enterRoomAt: { x: 240, y: 205 },   // where she stands after walking into a building
    leaveRoomAt: { x: 240, y: 170 },   // where she stands after coming back out to town
    fur: "#f0e2cb", earLeft: "#e28a55", earRight: "#888888", eyes: "#222222"
  },

  // ---- Words shown in the message bar at the bottom ----
  // {room}, {wood}, {item}, {food} are filled in by the game.
  messages: {
    start: "Tap anything to interact! 🐾",
    tapNothing: "Tap an object, character, building, or door! 🐾",
    enterRoom: "You went into {room}!",
    backInTown: "Back in Whiskerwood! Tap a building to go inside.",
    woodSuffix: " 🪵 Wood: {wood}",       // added after a tree message
    treeAlreadyChopped: "That tree is already chopped.",
    critterHint: " Use your Cat Sword!",   // added after a food-creature message
    defaultUse: "You use it!",
    swordSwish: "Your Cat Sword goes SWISH! ✨",
    swordNothingNear: "No food-creature close enough!",
    swordPoof: "POOF! It turned into {food} food! ✨",
    ate: "Yum! You ate the {item}! 😺",
    changedOutfit: "Cute! You changed your outfit! 👗"
  },

  // ---- Backpack ----
  // To add an item: copy one line, give it a new id and label.
  //   use: "build" (needs wood), "sword" (the Cat Sword), or "eat" (gives coins when eaten).
  //   start: how many you begin with.  button: the words on its button.
  //   coins: how many coins one gives when eaten.
  // To make a creature drop a new food, give a creature in a room food: "<that item's id>".
  items: [
    { id: "wood",   label: "🪵 Wood",      use: "build", button: "BUILD", start: 0 },
    { id: "sword",  label: "⚔️ Cat Sword", use: "sword", button: "USE",   start: 1 },
    { id: "apple",  label: "🍎 Apple",     use: "eat",   button: "EAT",   start: 0, coins: 1 },
    { id: "toast",  label: "🍞 Toast",     use: "eat",   button: "EAT",   start: 0, coins: 1 },
    { id: "carrot", label: "🥕 Carrot",    use: "eat",   button: "EAT",   start: 0, coins: 1 }
  ],

  // ---- Building tiny cat houses from wood ----
  build: {
    item: "wood", cost: 3,
    icon: "🏠", firstX: 214, spacing: 18, y: 132, size: 16,   // where the little houses appear in town
    done: "You built a tiny cat house! 🏠",
    notEnough: "You need 3 wood to build!"
  },

  // ---- Buttons and panel words ----
  ui: {
    bagButtonIcon: "🎒", swordButtonIcon: "⚔️",
    bagTitle: "🎒 BACKPACK", buildButton: "🪵 BUILD WITH 3 WOOD",
    drawTitle: "🎨 DRAWING TIME", drawHelp: "Draw with your finger!", clearButton: "Clear",
    closetTitle: "👗 MY CLOSET", closetHelp: "Pick your kitty's clothes!",
    pawIcon: "🐾",            // the little paw on things you can tap
    closeIcon: "✕"
  },

  // ---- Closet ----
  // To add a colour: copy one line and change the label and colour.
  clothes: [
    { label: "💙 Blue",   color: "#7396c8" },
    { label: "🩷 Pink",   color: "#d47d9b" },
    { label: "💜 Purple", color: "#8a69a8" },
    { label: "💚 Green",  color: "#72a56d" },
    { label: "🧡 Orange", color: "#d49b55" },
    { label: "🤍 White",  color: "#f0eee8" }
  ],

  // ---- Drawing panel ----
  drawing: { penColor: "#6d4a83", penWidth: 5, paper: "#ffffff" },

  // ---- How forgiving taps are (bigger numbers = easier to hit things) ----
  tapping: {
    townPadding: 20,    // extra tap area around a town building
    townReach: 80,      // tapping this near a building still picks it
    roomPadding: 24,    // extra tap area around things inside rooms
    roomReach: 72,
    personRadius: 44,   // how close a tap must be to a townsperson
    swordReach: 60,     // how close a food-creature must be to the cat for the sword to work
    debounceMs: 120
  },

  // ---- The town ----
  town: {
    name: "TOWN",
    grass: "#8fbd79",

    // Roads are rectangles. To add a road, copy a line.
    roads: [
      { x: 213, y: 0,   w: 54,  h: 270, color: "#dfc18c" },
      { x: 0,   y: 145, w: 480, h: 46,  color: "#dfc18c" }
    ],

    // Trees for decoration. To add a tree, copy a line and change x and y.
    treeStyle: { trunk: "#795a3c", leaves: "#4f8055" },
    trees: [
      { x: 20, y: 32 },  { x: 68, y: 32 },  { x: 116, y: 32 },  { x: 164, y: 32 },
      { x: 308, y: 32 }, { x: 356, y: 32 }, { x: 404, y: 32 },  { x: 452, y: 32 },
      { x: 20, y: 250 }, { x: 68, y: 250 }, { x: 116, y: 250 }, { x: 164, y: 250 },
      { x: 308, y: 250 },{ x: 356, y: 250 },{ x: 404, y: 250 }, { x: 452, y: 250 }
    ],

    // Buildings you can tap to go inside.
    // To add one: copy a line, give it a new id, and add a room with the SAME id in "rooms" below.
    //   room: which room it opens.  firstVisitCoins: coins for the very first visit (optional).
    doorColor: "#7b553d",
    buildings: [
      { id: "home",   label: "MY HOUSE", x: 76,  y: 76,  w: 86,  h: 54, color: "#d8b17a", icon: "🏠", room: "home" },
      { id: "school", label: "SCHOOL",   x: 238, y: 58,  w: 104, h: 56, color: "#d89c72", icon: "🏫", room: "school", firstVisitCoins: 5 },
      { id: "market", label: "MARKET",   x: 390, y: 106, w: 76,  h: 46, color: "#d8798e", icon: "🧁", room: "market" },
      { id: "park",   label: "PARK",     x: 346, y: 202, w: 90,  h: 48, color: "#79a96a", icon: "🌳", room: "park" },
      { id: "lake",   label: "LAKE",     x: 432, y: 205, w: 72,  h: 44, color: "#71aeca", icon: "🐟", room: "lake" },
      { id: "forest", label: "FOREST",   x: 83,  y: 211, w: 102, h: 50, color: "#56825b", icon: "🌲", room: "forest" }
    ],

    // Townspeople and animals. Tap one to hear what they say.
    // To add one: copy a line. coat = fur colour, shirt = shirt colour. Optional img: "assets/<id>.png".
    people: [
      { name: "Miss Maple", x: 265, y: 112, coat: "#c98252", shirt: "#8a69a8", msg: "Miss Maple: Come inside school! 🎨" },
      { name: "Milo",       x: 300, y: 138, coat: "#e4b86d", shirt: "#5d8dbb", msg: "Milo: The park has a giant slide!" },
      { name: "Luna",       x: 344, y: 132, coat: "#d9d7d2", shirt: "#d47d9b", msg: "Luna: Meet me at the swings!" },
      { name: "Pepper",     x: 405, y: 146, coat: "#56545b", shirt: "#d49b55", msg: "Pepper: Let's get cupcakes!" },
      { name: "Mochi",      x: 110, y: 176, coat: "#c6a886", shirt: "#b6769d", msg: "Mochi: We can build things with wood!" }
    ]
  },

  // ---- Rooms (the places inside buildings) ----
  // Each room has a name, a floor colour, a wall colour and a list of things (objects).
  // Every object has: id (also its little label), x, y, w, h, color, icon, msg (what it says).
  // To add something: copy a line inside "objects" and change it.
  // Optional extras on an object:
  //   label: "DOG"          words above it (otherwise the id is used)
  //   kind: what it does when tapped. One of:
  //     "exit"    door back to town
  //     "goto"    walk to another room (to: "park")
  //     "draw"    opens the drawing panel
  //     "closet"  opens the closet
  //     "tree"    gives wood (wood: 2) and disappears
  //     "critter" a food-creature to catch with the sword (food: "apple")
  //   moveTo: { x, y }                 the kitty jumps here after tapping
  //   moveBy: { y: -28, minY: 60 }     the kitty hops up or down (but not above minY)
  //   countLabel: "Castle"             counts how many times it was tapped ("Castle #3!")
  rooms: {
    home: { name: "MY HOUSE", floor: "#d9c39b", wall: "#b98263", objects: [
      { id: "bed",    x: 95,  y: 88,  w: 78, h: 40, color: "#d999aa", icon: "🛏️", msg: "Bounce bounce! Your bed is super cozy!" },
      { id: "closet", x: 380, y: 82,  w: 55, h: 48, color: "#9a6b4d", icon: "👗", kind: "closet", msg: "Pick your own clothes!" },
      { id: "toybox", x: 335, y: 185, w: 58, h: 40, color: "#d6a94d", icon: "🧸", msg: "You found your favorite toy!" },
      { id: "exit",   x: 240, y: 238, w: 72, h: 28, color: "#805c43", icon: "🚪", kind: "exit" }
    ]},
    school: { name: "SCHOOL", floor: "#e6d2a7", wall: "#b96f62", objects: [
      { id: "desk",     x: 115, y: 90,  w: 74, h: 42, color: "#b7895d", icon: "📚", msg: "Your school desk!" },
      { id: "draw",     x: 250, y: 92,  w: 72, h: 42, color: "#c88cc9", icon: "🎨", kind: "draw", msg: "Drawing time!" },
      { id: "books",    x: 385, y: 90,  w: 62, h: 48, color: "#7d91bb", icon: "📖", msg: "You read a silly cat story!" },
      { id: "snack",    x: 115, y: 182, w: 66, h: 38, color: "#d89b68", icon: "🍎", msg: "Snack time! Yum!" },
      { id: "playdoor", x: 365, y: 184, w: 82, h: 38, color: "#74a96c", icon: "🛝", kind: "goto", to: "park", msg: "Let's go to the playground!" },
      { id: "exit",     x: 240, y: 238, w: 72, h: 28, color: "#805c43", icon: "🚪", kind: "exit" }
    ]},
    market: { name: "MARKET", floor: "#e9c9b0", wall: "#b96e80", objects: [
      { id: "cupcakes", x: 110, y: 98,  w: 76, h: 44, color: "#d8798e", icon: "🧁", msg: "You got a pretend cupcake! 🧁" },
      { id: "fruit",    x: 240, y: 100, w: 72, h: 42, color: "#d6a65c", icon: "🍎", msg: "Fresh fruit!" },
      { id: "counter",  x: 365, y: 110, w: 72, h: 48, color: "#9a6b4d", icon: "🐱", msg: "Shopkeeper: Welcome!" },
      { id: "exit",     x: 240, y: 238, w: 72, h: 28, color: "#805c43", icon: "🚪", kind: "exit" }
    ]},
    park: { name: "SUNNY PAW PARK", floor: "#91c97c", wall: "#4f8055", objects: [
      { id: "slide",   x: 95,  y: 95,  w: 58, h: 72, color: "#e6c74f", icon: "🛝", moveTo: { x: 95, y: 170 },  msg: "WHEEEE! You zoom down the slide!" },
      { id: "swings",  x: 210, y: 88,  w: 72, h: 58, color: "#78a7ce", icon: "🎠", moveTo: { x: 210, y: 120 }, msg: "Higher! Higher! Wheee!" },
      { id: "sandbox", x: 340, y: 100, w: 82, h: 56, color: "#e7cb82", icon: "🏖️", countLabel: "Castle", msg: "You build a cat-ear sand castle!" },
      { id: "seesaw",  x: 125, y: 185, w: 82, h: 34, color: "#d98568", icon: "↕️", moveBy: { y: -28, minY: 60 }, msg: "Up! Down! Up! Down!" },
      { id: "climber", x: 300, y: 185, w: 78, h: 44, color: "#8d74b5", icon: "🧗", moveTo: { x: 300, y: 95 },  msg: "You climb all the way to the top!" },
      { id: "exit",    x: 420, y: 232, w: 62, h: 28, color: "#805c43", icon: "🚪", kind: "exit" }
    ]},
    forest: { name: "FOREST", floor: "#6f9d62", wall: "#396246", objects: [
      { id: "tree1",  x: 95,  y: 92,  w: 54, h: 64, color: "#4f8055", icon: "🌳", kind: "tree", wood: 2, msg: "CHOP! The tree fell and gave you wood!" },
      { id: "tree2",  x: 165, y: 115, w: 54, h: 64, color: "#4f8055", icon: "🌲", kind: "tree", wood: 2, msg: "CHOP! More wood for building!" },
      { id: "tree3",  x: 105, y: 185, w: 54, h: 64, color: "#4f8055", icon: "🌳", kind: "tree", wood: 2, msg: "Timber! You got wood!" },
      { id: "apple",  x: 235, y: 90,  w: 48, h: 44, color: "#668b50", icon: "🍎", kind: "critter", food: "apple",  msg: "A wiggly apple-creature!" },
      { id: "toast",  x: 335, y: 145, w: 48, h: 44, color: "#c49c65", icon: "🍞", kind: "critter", food: "toast",  msg: "A bouncy toast-creature!" },
      { id: "carrot", x: 185, y: 188, w: 48, h: 44, color: "#d58d52", icon: "🥕", kind: "critter", food: "carrot", msg: "A hopping carrot-creature!" },
      { id: "exit",   x: 420, y: 232, w: 62, h: 28, color: "#805c43", icon: "🚪", kind: "exit" }
    ]},
    lake: { name: "LAKE", floor: "#90bd79", wall: "#5c8fb0", objects: [
      { id: "dock", x: 120, y: 120, w: 95, h: 42, color: "#9b714b", icon: "🎣", msg: "You sit on the dock and watch the water." },
      { id: "frog", x: 275, y: 95,  w: 48, h: 38, color: "#6da55c", icon: "🐸", msg: "Ribbit! The frog waves at you!" },
      { id: "boat", x: 355, y: 165, w: 72, h: 40, color: "#bd8255", icon: "🛶", msg: "You rock gently in the little boat!" },
      { id: "exit", x: 420, y: 232, w: 62, h: 28, color: "#805c43", icon: "🚪", kind: "exit" }
    ]}
  }
};
