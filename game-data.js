// WHISKERWOOD RAPID CONTENT FILE
// Most child-requested changes should happen ONLY in this file.
// Add/move/change buildings, animals, messages, rewards, quests, colors, and speed here.
window.WHISKERWOOD={
  schema:1,
  build:"rapid-4",
  viewport:{w:480,h:270},
  player:{
    start:{x:240,y:170},
    speed:1.7,
    interactRadius:58
  },
  ui:{
    title:"🐱 WHISKERWOOD",
    startMessage:"Go to school! 🎒",
    questHeading:"TODAY:"
  },
  palette:{
    grass:"#8fbd79",
    path:"#dfc18c",
    panel:"#fff1cddd",
    ink:"#3b2d28",
    good:"#39724b",
    door:"#7b553d"
  },

  // Rectangle paths. Add another object to make a new road instantly.
  paths:[
    {x:213,y:0,w:54,h:270},
    {x:0,y:145,w:480,h:46}
  ],

  // Quests are completed by interactions that reference completeQuest:"quest-id".
  quests:[
    {id:"school",text:"Go to school"}
  ],

  // Buildings / destinations.
  locations:[
    {
      id:"school",label:"SCHOOL",x:240,y:62,w:100,h:54,color:"#d89c72",emoji:"🕘",
      interaction:{message:"You made it to school! ⭐ Welcome, kitty!",completeQuest:"school",coins:5,once:true}
    },
    {id:"slide",label:"SLIDE",x:325,y:92,w:44,h:30,color:"#e6c74f",emoji:"🛝",interaction:{message:"Wheeee! You zoom down the slide! 🛝",coins:1,once:true}},
    {id:"swings",label:"SWINGS",x:370,y:62,w:48,h:28,color:"#78a7ce",emoji:"🎠",interaction:{message:"Back and forth... higher and higher! Wheee!"}},
    {id:"sandbox",label:"SAND",x:150,y:105,w:50,h:30,color:"#e7cb82",emoji:"🏖️",interaction:{message:"You make a tiny sand castle with cat ears! 🏰"}},
    {id:"drawing-table",label:"DRAW",x:185,y:65,w:44,h:28,color:"#c88cc9",emoji:"🎨",interaction:{message:"Drawing time! 🎨",action:"draw"}},
    {id:"wood-pile",label:"WOOD",x:120,y:145,w:42,h:25,color:"#a9774e",emoji:"🪵",interaction:{message:"You picked up some wood! 🪵",item:"wood"}},
    {id:"build-spot",label:"BUILD",x:165,y:145,w:46,h:25,color:"#9e8a6b",emoji:"🔨",interaction:{message:"Open your backpack and build something here!",action:"build"}},
    {
      id:"home",label:"MY HOUSE",x:85,y:78,w:90,h:58,color:"#d8b17a",emoji:"🏠",
      interaction:{message:"Home sweet home! 🏠"}
    },
    {
      id:"market",label:"MARKET",x:385,y:105,w:78,h:48,color:"#d8798e",emoji:"🧁",
      interaction:{message:"The market smells like cupcakes! 🧁"}
    },
    {
      id:"lake",label:"LAKE",x:390,y:210,w:92,h:48,color:"#71aeca",emoji:"🐟",
      interaction:{message:"A frog waves from a lily pad! 🐸"}
    },
    {
      id:"forest",label:"FOREST",x:80,y:210,w:105,h:52,color:"#56825b",emoji:"🌲",
      interaction:{message:"A squirrel wants to play! 🐿️"}
    }
  ],

  // Town characters are data-only so new friends can be added instantly.
  characters:[
    {id:"miss-maple",name:"Miss Maple",x:265,y:110,coat:"#c98252",shirt:"#8a69a8",interaction:{message:"Miss Maple: Good morning! Drawing time is after playground! 🎨"}},
    {id:"milo",name:"Milo",x:300,y:137,coat:"#e4b86d",shirt:"#5d8dbb",interaction:{message:"Milo: Race you to the slide! 🛝"}},
    {id:"luna",name:"Luna",x:344,y:132,coat:"#d9d7d2",shirt:"#d47d9b",interaction:{message:"Luna: I love the swings! Want to play? 💕"}},
    {id:"pepper",name:"Pepper",x:405,y:143,coat:"#56545b",shirt:"#d49b55",interaction:{message:"Pepper: The market has the BEST cupcakes. 🧁"}},
    {id:"ginger",name:"Ginger",x:355,y:196,coat:"#d47743",shirt:"#72a56d",interaction:{message:"Ginger: I saw a frog at the lake! 🐸"}},
    {id:"snowball",name:"Snowball",x:205,y:202,coat:"#f0eee8",shirt:"#73a4bd",interaction:{message:"Snowball: I'm collecting flowers for my room! 🌼"}},
    {id:"mochi",name:"Mochi",x:110,y:176,coat:"#c6a886",shirt:"#b6769d",interaction:{message:"Mochi: We can build things together if we find wood! 🪵"}},
    {id:"bean",name:"Bean",x:62,y:128,coat:"#9b765e",shirt:"#7d9c58",interaction:{message:"Bean: Hi! I live right around the corner! 🏠"}}
  ],

  // Animals are intentionally data-only. To add one, copy a single line.
  animals:[
    {id:"bird",x:310,y:151,emoji:"🐦",interaction:{message:"Chirp chirp! The little bird likes you."}},
    {id:"frog",x:426,y:218,emoji:"🐸",interaction:{message:"Ribbit! The frog gives you a tiny wave."}},
    {id:"squirrel",x:120,y:218,emoji:"🐿️",interaction:{message:"The squirrel zooms around your paws!"}},
    {id:"apple-critter",x:56,y:198,emoji:"🍎",foodCreature:true,drop:"apple",interaction:{message:"A wiggly apple-creature bounces around!"}},
    {id:"toast-critter",x:92,y:202,emoji:"🍞",foodCreature:true,drop:"toast",interaction:{message:"The toast-creature goes boing!"}},
    {id:"carrot-critter",x:52,y:224,emoji:"🥕",foodCreature:true,drop:"carrot",interaction:{message:"The carrot-creature hops away!"}}
  ],

  // Simple scenery. Supported types: tree, flower, rock, bench.
  decorations:[
    {type:"tree",x:20,y:32},{type:"tree",x:68,y:32},{type:"tree",x:116,y:32},{type:"tree",x:164,y:32},
    {type:"tree",x:308,y:32},{type:"tree",x:356,y:32},{type:"tree",x:404,y:32},{type:"tree",x:452,y:32},
    {type:"tree",x:20,y:250},{type:"tree",x:68,y:250},{type:"tree",x:116,y:250},{type:"tree",x:164,y:250},
    {type:"tree",x:308,y:250},{type:"tree",x:356,y:250},{type:"tree",x:404,y:250},{type:"tree",x:452,y:250},
    {type:"flower",x:180,y:118},{type:"flower",x:290,y:118},{type:"rock",x:325,y:205}
  ]
};
