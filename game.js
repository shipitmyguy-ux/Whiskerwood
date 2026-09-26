(()=>{
"use strict";
const CFG=window.WHISKERWOOD;
if(!CFG)throw new Error("Missing WHISKERWOOD data");

const c=document.getElementById("c");
const g=c.getContext("2d");
g.imageSmoothingEnabled=false;

const WORLD_W=CFG.viewport.w,WORLD_H=CFG.viewport.h;
let W=WORLD_W,H=WORLD_H,worldOffsetX=0,worldOffsetY=0;

const key=Object.create(null);
const state={
  p:{x:CFG.player.start.x,y:CFG.player.start.y},
  message:CFG.ui.startMessage,
  coins:0,
  completed:new Set(),
  rewarded:new Set(),
  inventory:{wood:0,"cat sword":1},
  removed:new Set(),
  built:0
};

function fitGame(){
  const vv=window.visualViewport;
  const vw=Math.max(1,vv?vv.width:innerWidth);
  const vh=Math.max(1,vv?vv.height:innerHeight);
  const aspect=vw/vh;
  const baseAspect=WORLD_W/WORLD_H;

  // Match the device aspect ratio without stretching any game art.
  // We extend the logical world on the long axis instead.
  if(aspect>=baseAspect){
    H=WORLD_H;
    W=Math.max(WORLD_W,Math.round(H*aspect));
  }else{
    W=WORLD_W;
    H=Math.max(WORLD_H,Math.round(W/aspect));
  }

  worldOffsetX=Math.floor((W-WORLD_W)/2);
  worldOffsetY=Math.floor((H-WORLD_H)/2);
  c.width=W;
  c.height=H;
  g.imageSmoothingEnabled=false;
  // Canvas bitmap and CSS box use the same aspect ratio. Never independently
  // force width/height from CSS, which would distort the world.
  const cssScale=Math.min(vw/W,vh/H);
  c.style.width=Math.ceil(W*cssScale)+"px";
  c.style.height=Math.ceil(H*cssScale)+"px";
}
addEventListener("resize",fitGame);
addEventListener("orientationchange",()=>setTimeout(fitGame,120));
if(window.visualViewport){
  visualViewport.addEventListener("resize",fitGame);
  visualViewport.addEventListener("scroll",fitGame);
}
fitGame();

addEventListener("keydown",e=>{key[e.key]=1});
addEventListener("keyup",e=>{key[e.key]=0});
document.querySelectorAll(".btn").forEach(b=>{
  const k=b.dataset.k;
  const down=e=>{e.preventDefault();key[k]=1;b.setPointerCapture?.(e.pointerId)};
  const up=e=>{e.preventDefault();key[k]=0};
  b.addEventListener("pointerdown",down);
  b.addEventListener("pointerup",up);
  b.addEventListener("pointercancel",up);
  b.addEventListener("lostpointercapture",up);
});
document.addEventListener("contextmenu",e=>e.preventDefault());

const rect=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h)};
function txt(t,x,y,size=10,col=CFG.palette.ink,align="left"){
  g.fillStyle=col;g.font=`bold ${size}px monospace`;g.textAlign=align;g.fillText(t,x,y);g.textAlign="left";
}
function emoji(t,x,y,size=16){
  g.font=`${size}px system-ui, sans-serif`;g.textAlign="center";g.fillText(t,x,y);g.textAlign="left";
}
function tree(x,y){
  rect(x-5,y-18,10,20,"#795a3c");
  g.fillStyle="#3f754c";g.beginPath();g.arc(x,y-20,18,0,Math.PI*2);g.fill();
  g.fillStyle="#6a9a62";g.beginPath();g.arc(x-8,y-26,9,0,Math.PI*2);g.fill();
}
function flower(x,y){
  rect(x-1,y-7,2,8,"#4f7b45");
  emoji("🌼",x,y-5,11);
}
function rock(x,y){
  g.fillStyle="#78807b";g.beginPath();g.ellipse(x,y,7,5,0,0,Math.PI*2);g.fill();
}
function bench(x,y){
  rect(x-12,y-5,24,5,"#9a6b43");rect(x-10,y,3,7,"#765136");rect(x+7,y,3,7,"#765136");
}
const decorDrawers={tree,flower,rock,bench};

function drawLocation(s){
  rect(s.x-s.w/2,s.y-s.h/2,s.w,s.h,s.color);
  rect(s.x-s.w/2+8,s.y+s.h/2-13,s.w-16,13,CFG.palette.door);
  txt(s.label,s.x,s.y-4,9,"#fff","center");
  if(s.emoji)emoji(s.emoji,s.x,s.y+15,14);
}
function cat(){
  const x=state.p.x,y=state.p.y;
  rect(x-8,y-11,16,16,"#f0e2cb");
  rect(x-7,y-16,5,6,"#e28a55");
  rect(x+2,y-16,5,6,"#888");
  rect(x-5,y-8,2,2,"#333");
  rect(x+3,y-8,2,2,"#333");
  rect(x-9,y+3,18,10,"#7396c8");
  rect(x-5,y+13,4,5,"#eee");
  rect(x+2,y+13,4,5,"#eee");
}

function allInteractables(){
  return [
    ...CFG.locations.map(o=>({...o,kind:"location"})),
    ...CFG.animals.filter(o=>!state.removed.has(o.id)).map(o=>({...o,kind:"animal"}))
  ];
}
function nearestInteractable(){
  let best=null,bestD=Infinity;
  for(const o of allInteractables()){
    const d=Math.hypot(state.p.x-o.x,state.p.y-o.y);
    const radius=o.interaction?.radius??(o.kind==="animal"?34:CFG.player.interactRadius);
    if(d<=radius&&d<bestD){best=o;bestD=d}
  }
  return best;
}
function applyInteraction(o){
  const a=o.interaction||{};
  const rewardKey=o.id+":"+(a.completeQuest||"interact");
  if(a.completeQuest)state.completed.add(a.completeQuest);
  if(a.coins&&!state.rewarded.has(rewardKey)){
    state.coins+=a.coins;
    if(a.once!==false)state.rewarded.add(rewardKey);
  }
  if(a.item){
    state.inventory[a.item]=(state.inventory[a.item]||0)+1;
    renderBag();
  }
  if(a.action==="draw")openDrawing();
  if(a.action==="build")openBag();
  if(a.teleport){
    state.p.x=a.teleport.x;
    state.p.y=a.teleport.y;
  }
  state.message=a.message||("You interact with "+(o.label||o.id)+".");
}
function interact(){
  const o=nearestInteractable();
  if(!o){state.message="Nothing to interact with here.";return}
  applyInteraction(o);
}

let actWas=false;
function update(){
  const sp=CFG.player.speed;
  state.p.x+=(key.ArrowRight||key.d?sp:0)-(key.ArrowLeft||key.a?sp:0);
  state.p.y+=(key.ArrowDown||key.s?sp:0)-(key.ArrowUp||key.w?sp:0);
  state.p.x=Math.max(12-worldOffsetX,Math.min(WORLD_W-12+worldOffsetX,state.p.x));
  state.p.y=Math.max(12-worldOffsetY,Math.min(WORLD_H-12+worldOffsetY,state.p.y));
  const a=!!(key.e||key.Enter||key[" "]);
  if(a&&!actWas)interact();
  actWas=a;
}

function drawWorld(){
  // Fill newly exposed screen area with world background, then center
  // the original 480x270 authored playfield inside it.
  rect(0,0,W,H,CFG.palette.grass);
  g.save();
  g.translate(worldOffsetX,worldOffsetY);
  for(const p of CFG.paths)rect(p.x,p.y,p.w,p.h,CFG.palette.path);
  for(const d of CFG.decorations){
    const fn=decorDrawers[d.type];
    if(fn)fn(d.x,d.y);
  }
  for(const s of CFG.locations)drawLocation(s);
  for(const a of CFG.animals)if(!state.removed.has(a.id))emoji(a.emoji,a.x,a.y,15);
  for(let i=0;i<state.built;i++){rect(205+i*18,124,14,18,"#b47a4b");emoji("🏠",212+i*18,138,15)}
  cat();
  g.restore();
}
function drawUi(){
  rect(5,5,W-10,27,CFG.palette.panel);
  txt(CFG.ui.title,12,22,11);
  txt("⭐ "+state.coins,W-24,22,11,CFG.palette.ink,"right");

  const qh=18+CFG.quests.length*13;
  rect(7,36,190,qh,CFG.palette.panel);
  txt(CFG.ui.questHeading,14,50,8);
  CFG.quests.forEach((q,i)=>{
    const done=state.completed.has(q.id);
    txt((done?"✓ ":"□ ")+q.text,14,64+i*13,9,done?CFG.palette.good:CFG.palette.ink);
  });

  rect(8,H-32,W-16,25,CFG.palette.panel);
  txt(state.message,15,H-15,8);
  txt(CFG.build,W-12,H-10,6,"#6b6259","right");
}
function draw(){drawWorld();drawUi()}

const bagPanel=document.getElementById("bagPanel");
const bagItems=document.getElementById("bagItems");
const drawPanel=document.getElementById("drawPanel");
function renderBag(){
  bagItems.innerHTML="";
  const items=Object.entries(state.inventory);
  if(!items.length)bagItems.textContent="Your backpack is empty.";
  for(const [name,count] of items){
    const row=document.createElement("div");row.className="bagRow";
    const a=document.createElement("span");a.textContent=name==="wood"?"🪵 Wood":name==="cat sword"?"⚔️ Cat Sword":"🍽️ "+name;
    const b=document.createElement("b");b.textContent="× "+count;
    row.append(a,b);bagItems.appendChild(row);
  }
}
function openBag(){renderBag();bagPanel.classList.add("open")}
function closeBag(){bagPanel.classList.remove("open")}
function openDrawing(){drawPanel.classList.add("open")}
function closeDrawing(){drawPanel.classList.remove("open")}
document.getElementById("bagBtn").addEventListener("click",openBag);
document.getElementById("bagClose").addEventListener("click",closeBag);
document.getElementById("drawClose").addEventListener("click",closeDrawing);
document.getElementById("buildBtn").addEventListener("click",()=>{
  if((state.inventory.wood||0)<3){state.message="You need 3 wood to build a tiny cat house!";closeBag();return}
  state.inventory.wood-=3;state.built++;state.message="You built a tiny cat house! 🏠✨";renderBag();closeBag();
});
document.getElementById("swordBtn").addEventListener("click",()=>{
  const target=nearestInteractable();
  if(!target||!target.foodCreature){state.message="Swish! Your cat sword sparkles. ✨";return}
  state.removed.add(target.id);
  const food=target.drop||"snack";
  state.inventory[food]=(state.inventory[food]||0)+1;
  state.message="POOF! The "+food+" critter turned into food for your backpack! ✨";
  renderBag();
});

const dc=document.getElementById("drawing"),dg=dc.getContext("2d");
dg.fillStyle="#fff";dg.fillRect(0,0,dc.width,dc.height);dg.lineCap="round";dg.lineWidth=5;dg.strokeStyle="#6d4a83";
let drawing=false,last=null;
function drawPoint(e){
  const r=dc.getBoundingClientRect(),x=(e.clientX-r.left)*dc.width/r.width,y=(e.clientY-r.top)*dc.height/r.height;
  if(last){dg.beginPath();dg.moveTo(last.x,last.y);dg.lineTo(x,y);dg.stroke()}
  last={x,y};
}
dc.addEventListener("pointerdown",e=>{drawing=true;last=null;dc.setPointerCapture?.(e.pointerId);drawPoint(e)});
dc.addEventListener("pointermove",e=>{if(drawing)drawPoint(e)});
for(const ev of ["pointerup","pointercancel","lostpointercapture"])dc.addEventListener(ev,()=>{drawing=false;last=null});
document.getElementById("clearDrawing").addEventListener("click",()=>{dg.fillStyle="#fff";dg.fillRect(0,0,dc.width,dc.height)});

renderBag();
function loop(){update();draw();requestAnimationFrame(loop)}
loop();
})();
