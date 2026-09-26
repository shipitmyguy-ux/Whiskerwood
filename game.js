(()=>{
"use strict";
const CFG=window.WHISKERWOOD;
if(!CFG)throw new Error("Missing WHISKERWOOD data");

const c=document.getElementById("c");
const g=c.getContext("2d");
g.imageSmoothingEnabled=false;

const W=CFG.viewport.w,H=CFG.viewport.h;
c.width=W;c.height=H;

const key=Object.create(null);
const state={
  p:{x:CFG.player.start.x,y:CFG.player.start.y},
  message:CFG.ui.startMessage,
  coins:0,
  completed:new Set(),
  rewarded:new Set(),
  inventory:Object.create(null)
};

function fitGame(){
  const vv=window.visualViewport;
  const vw=Math.max(1,vv?vv.width:innerWidth);
  const vh=Math.max(1,vv?vv.height:innerHeight);
  const scale=Math.max(vw/W,vh/H);
  c.style.width=Math.floor(W*scale)+"px";
  c.style.height=Math.floor(H*scale)+"px";
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
    ...CFG.animals.map(o=>({...o,kind:"animal"}))
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
  }
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
  state.p.x=Math.max(12,Math.min(W-12,state.p.x));
  state.p.y=Math.max(45,Math.min(H-42,state.p.y));
  const a=!!(key.e||key.Enter||key[" "]);
  if(a&&!actWas)interact();
  actWas=a;
}

function drawWorld(){
  rect(0,0,W,H,CFG.palette.grass);
  for(const p of CFG.paths)rect(p.x,p.y,p.w,p.h,CFG.palette.path);
  for(const d of CFG.decorations){
    const fn=decorDrawers[d.type];
    if(fn)fn(d.x,d.y);
  }
  for(const s of CFG.locations)drawLocation(s);
  for(const a of CFG.animals)emoji(a.emoji,a.x,a.y,15);
  cat();
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
function loop(){update();draw();requestAnimationFrame(loop)}
loop();
})();
