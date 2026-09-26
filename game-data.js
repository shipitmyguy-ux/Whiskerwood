// WHISKERWOOD RAPID CONTENT FILE
// Most child-requested changes should happen ONLY in this file.
// Add/move/change buildings, animals, messages, rewards, quests, colors, and speed here.
window.WHISKERWOOD={
  schema:1,
  build:"rapid-2",
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
