// WHISKERWOOD ENGINE: movement, tapping, drawing, panels. Content lives in game-data.js.
// Normally you do NOT need to edit this file: names, emoji, colours, positions,
// messages, items and rooms all come from window.GAME_DATA.
(function(){
"use strict";
var D=window.GAME_DATA;
if(!D){document.body.textContent="game-data.js did not load. Check it for a missing comma or quote.";return}

var BASE_W=480, BASE_H=270;
var T=D.tapping, P=D.player, M=D.messages, U=D.ui, B=D.build, TOWN=D.town, rooms=D.rooms;
var c=document.getElementById("game"), g=c.getContext("2d");
var W=BASE_W,H=BASE_H,offX=0,offY=0;
var p={x:P.start.x,y:P.start.y},coins=P.start.coins,msg=M.start,scene="town",shirt=P.start.shirt;
var inv={},visited={},removed={},chopped={},counts={},builtCount=0;
D.items.forEach(function(it){inv[it.id]=it.start||0});
var town=TOWN.buildings,people=TOWN.people;

function fmt(s,vars){return s.replace(/\{(\w+)\}/g,function(m,k){return vars&&k in vars?vars[k]:m})}
function gone(o){return (o.kind==="critter"&&removed[o.food])||(o.kind==="tree"&&chopped[o.id])}

// ---- page text from data ----
document.title=D.title.tabTitle;
function setText(id,t){document.getElementById(id).textContent=t}
setText("bagBtn",U.bagButtonIcon);setText("swordBtn",U.swordButtonIcon);
setText("bagTitle",U.bagTitle);setText("buildBtn",U.buildButton);
setText("drawTitle",U.drawTitle);setText("drawHelp",U.drawHelp);setText("clearDraw",U.clearButton);
setText("closetTitle",U.closetTitle);setText("closetHelp",U.closetHelp);
["bagClose","drawClose","closetClose"].forEach(function(id){setText(id,U.closeIcon)});

function fit(){
 var vv=window.visualViewport,vw=Math.max(1,vv?vv.width:innerWidth),vh=Math.max(1,vv?vv.height:innerHeight);
 var aspect=vw/vh,base=BASE_W/BASE_H;
 if(aspect>=base){H=BASE_H;W=Math.round(H*aspect)}else{W=BASE_W;H=Math.round(W/aspect)}
 offX=Math.floor((W-BASE_W)/2);offY=Math.floor((H-BASE_H)/2);
 c.width=W;c.height=H;g.imageSmoothingEnabled=false;c.style.width=vw+"px";c.style.height=vh+"px";
}
fit();addEventListener("resize",fit);addEventListener("orientationchange",function(){setTimeout(fit,100)});

function rect(x,y,w,h,col){g.fillStyle=col;g.fillRect(x,y,w,h)}
function text(t,x,y,size,col,align){g.fillStyle=col||"#3b2d28";g.font="bold "+(size||8)+"px monospace";g.textAlign=align||"left";g.fillText(t,x,y);g.textAlign="left"}
function emo(t,x,y,size){g.font=(size||14)+"px sans-serif";g.textAlign="center";g.fillText(t,x,y);g.textAlign="left"}
function tree(x,y){rect(x-4,y-16,8,18,TOWN.treeStyle.trunk);g.fillStyle=TOWN.treeStyle.leaves;g.beginPath();g.arc(x,y-19,15,0,Math.PI*2);g.fill()}
function npc(o){rect(o.x-7,o.y-12,14,13,o.coat);rect(o.x-6,o.y-16,5,6,o.coat);rect(o.x+1,o.y-16,5,6,o.coat);rect(o.x-4,o.y-8,2,2,"#222");rect(o.x+2,o.y-8,2,2,"#222");rect(o.x-8,o.y,16,10,o.shirt);text(o.name,o.x,o.y-20,6,"#3b2d28","center")}
function player(){rect(p.x-8,p.y-11,16,16,P.fur);rect(p.x-7,p.y-16,5,6,P.earLeft);rect(p.x+2,p.y-16,5,6,P.earRight);rect(p.x-5,p.y-8,2,2,P.eyes);rect(p.x+3,p.y-8,2,2,P.eyes);rect(p.x-9,p.y+3,18,10,shirt)}

function drawTown(){
 rect(0,0,BASE_W,BASE_H,TOWN.grass);
 TOWN.roads.forEach(function(r){rect(r.x,r.y,r.w,r.h,r.color)});
 TOWN.trees.forEach(function(t){tree(t.x,t.y)});
 town.forEach(function(o){rect(o.x-o.w/2,o.y-o.h/2,o.w,o.h,o.color);rect(o.x-o.w/2+7,o.y+o.h/2-11,o.w-14,11,TOWN.doorColor);text(o.label,o.x,o.y-3,8,"#fff","center");emo(o.icon,o.x,o.y+14,13)});
 people.forEach(npc);
}
function drawRoom(){
 var r=rooms[scene];rect(0,0,BASE_W,BASE_H,r.floor);rect(0,0,BASE_W,34,r.wall);text(r.name,240,23,13,"#fff","center");
 for(var i=0;i<r.objects.length;i++){var o=r.objects[i];if(gone(o))continue;rect(o.x-o.w/2,o.y-o.h/2,o.w,o.h,o.color);emo(o.icon,o.x,o.y+7,18);if(o.kind!=="exit"){text((o.label||o.id).toUpperCase(),o.x,o.y-o.h/2-4,6,"#3b2d28","center");text(U.pawIcon,o.x+o.w/2-8,o.y-o.h/2+8,7,"#3b2d28","center")}}
}
function world(){
 rect(0,0,W,H,"#26382d");g.save();g.translate(offX,offY);
 if(scene==="town")drawTown();else drawRoom();
 for(var i=0;i<builtCount;i++)emo(B.icon,B.firstX+i*B.spacing,B.y,B.size);
 player();g.restore();
}
function ui(){
 rect(5,5,W-10,27,"#fff1cddd");text(D.title.icon+" "+D.title.hudTitle,12,22,11);text(scene==="town"?TOWN.name:rooms[scene].name,W/2,22,8,"#3b2d28","center");text(D.title.coinIcon+" "+coins,W-18,22,10,"#3b2d28","right");
 rect(8,H-32,W-16,25,"#fff1cddd");text(msg,15,H-15,8);
}
function near(x,y,r){return Math.hypot(p.x-x,p.y-y)<r}
function enter(where){scene=where;p.x=P.enterRoomAt.x;p.y=P.enterRoomAt.y;msg=fmt(M.enterRoom,{room:rooms[where].name})}
function leave(){scene="town";p.x=P.leaveRoomAt.x;p.y=P.leaveRoomAt.y;msg=M.backInTown}
function hitTownAt(x,y){
 var best=null,bestD=999,pad=T.townPadding;
 for(var i=town.length-1;i>=0;i--){
   var o=town[i];
   if(x>=o.x-o.w/2-pad&&x<=o.x+o.w/2+pad&&y>=o.y-o.h/2-pad&&y<=o.y+o.h/2+pad)return o;
   var d=Math.hypot(x-o.x,y-o.y);if(d<bestD){best=o;bestD=d}
 }
 return bestD<T.townReach?best:null
}
function hitRoomAt(x,y){
 var arr=rooms[scene].objects,best=null,bestD=999,pad=T.roomPadding;
 for(var i=arr.length-1;i>=0;i--){
   var o=arr[i];
   if(gone(o))continue;
   if(x>=o.x-o.w/2-pad&&x<=o.x+o.w/2+pad&&y>=o.y-o.h/2-pad&&y<=o.y+o.h/2+pad)return o;
   var d=Math.hypot(x-o.x,y-o.y);
   if(d<bestD){best=o;bestD=d}
 }
 return bestD<T.roomReach?best:null
}
function useObject(o){
 if(!o)return;
 if(o.kind==="exit"){leave();return}
 if(o.kind==="goto"){scene=o.to;p.x=P.enterRoomAt.x;p.y=P.enterRoomAt.y;msg=o.msg;return}
 if(o.kind==="draw"){msg=o.msg;openDraw();return}
 if(o.kind==="closet"){msg=o.msg;openCloset();return}
 if(o.kind==="tree"){if(!chopped[o.id]){chopped[o.id]=true;inv[B.item]+=o.wood;msg=o.msg+fmt(M.woodSuffix,{wood:inv[B.item]})}else msg=M.treeAlreadyChopped;return}
 if(o.kind==="critter"){msg=o.msg+M.critterHint;return}
 msg=o.msg||M.defaultUse;
 if(o.countLabel){counts[o.id]=(counts[o.id]||0)+1;msg+=" "+o.countLabel+" #"+counts[o.id]+"!"}
 if(o.moveTo){p.x=o.moveTo.x;p.y=o.moveTo.y}
 if(o.moveBy){if(o.moveBy.x)p.x+=o.moveBy.x;if(o.moveBy.y)p.y=Math.max(o.moveBy.minY||0,p.y+o.moveBy.y)}
}

requestAnimationFrame(function loop(){world();ui();requestAnimationFrame(loop)});

var lastTapAt=0;
function tapGame(clientX,clientY){
 var now=Date.now();if(now-lastTapAt<T.debounceMs)return;lastTapAt=now;
 var r=c.getBoundingClientRect();
 if(!r.width||!r.height)return;
 var canvasX=(clientX-r.left)*(c.width/r.width);
 var canvasY=(clientY-r.top)*(c.height/r.height);
 var sx=canvasX-offX,sy=canvasY-offY;

 if(scene==="town"){
   for(var i=people.length-1;i>=0;i--){
     var n=people[i];
     if(Math.hypot(sx-n.x,sy-n.y)<T.personRadius){p.x=n.x;p.y=n.y+22;msg=n.msg;return}
   }
   var o=hitTownAt(sx,sy);
   if(o){
     p.x=o.x;p.y=o.y+o.h/2+18;
     enter(o.room);
     if(o.firstVisitCoins&&!visited[o.id]){visited[o.id]=true;coins+=o.firstVisitCoins}
     return
   }
 }else{
   var q=hitRoomAt(sx,sy);
   if(q){
     p.x=q.x;p.y=Math.min(235,q.y+q.h/2+18);
     useObject(q);
     return
   }
 }
 msg=M.tapNothing;
}
c.addEventListener("pointerdown",function(e){e.preventDefault();tapGame(e.clientX,e.clientY)});
c.addEventListener("click",function(e){tapGame(e.clientX,e.clientY)});

var bag=document.getElementById("bag"),items=document.getElementById("items");
function renderBag(){
 items.innerHTML="";
 D.items.forEach(function(it){
   var r=document.createElement("div");r.className="row";
   var label=document.createElement("span");label.textContent=it.label+" × "+inv[it.id];
   var b=document.createElement("button");b.type="button";
   b.textContent=it.button;
   if(inv[it.id]<=0&&it.use!=="sword")b.disabled=true;
   b.addEventListener("click",function(){useBagItem(it)});
   r.appendChild(label);r.appendChild(b);items.appendChild(r);
 });
}
function useBagItem(it){
 if(it.use==="sword"){closeBag();useSword();return}
 if(it.use==="build"){
   if(inv[it.id]<B.cost){msg=B.notEnough;closeBag();return}
   inv[it.id]-=B.cost;builtCount++;msg=B.done;renderBag();return;
 }
 if(it.use==="eat"){
   if(inv[it.id]<=0)return;
   inv[it.id]--;coins+=it.coins||0;msg=fmt(M.ate,{item:it.id});renderBag();return;
 }
}
function itemById(id){return D.items.filter(function(i){return i.id===id})[0]}
function openBag(){renderBag();bag.classList.add("open")}function closeBag(){bag.classList.remove("open")}
document.getElementById("bagBtn").onclick=openBag;document.getElementById("bagClose").onclick=closeBag;
document.getElementById("buildBtn").onclick=function(){useBagItem(itemById(B.item))};
function useSword(){
 var arr=scene==="town"?[]:rooms[scene].objects,hit=null,any=false;
 arr.forEach(function(o){if(o.kind==="critter"){any=true;if(!removed[o.food]&&near(o.x,o.y,T.swordReach))hit=o}});
 if(!any){msg=M.swordSwish;return}
 if(!hit){msg=M.swordNothingNear;return}
 removed[hit.food]=true;inv[hit.food]++;msg=fmt(M.swordPoof,{food:hit.food});
 renderBag();
}
document.getElementById("swordBtn").onclick=useSword;

var closetPanel=document.getElementById("closetPanel"),choices=document.getElementById("clothesChoices");
function openCloset(){closetPanel.classList.add("open")}function closeCloset(){closetPanel.classList.remove("open")}
document.getElementById("closetClose").onclick=closeCloset;
D.clothes.forEach(function(cl,i){
 if(i)choices.appendChild(document.createTextNode(" "));
 var b=document.createElement("button");b.textContent=cl.label;b.setAttribute("data-shirt",cl.color);
 b.addEventListener("click",function(){shirt=cl.color;msg=M.changedOutfit;closeCloset()});
 choices.appendChild(b);
});

var draw=document.getElementById("draw"),dc=document.getElementById("drawing"),dg=dc.getContext("2d"),drawing=false,last=null,DR=D.drawing;
function paper(){dg.fillStyle=DR.paper;dg.fillRect(0,0,dc.width,dc.height)}
function openDraw(){draw.classList.add("open")}function closeDraw(){draw.classList.remove("open")}
document.getElementById("drawClose").onclick=closeDraw;document.getElementById("clearDraw").onclick=paper;
paper();dg.strokeStyle=DR.penColor;dg.lineWidth=DR.penWidth;dg.lineCap="round";
dc.addEventListener("pointerdown",function(e){drawing=true;last=null;dc.setPointerCapture&&dc.setPointerCapture(e.pointerId)});
dc.addEventListener("pointermove",function(e){if(!drawing)return;var r=dc.getBoundingClientRect(),x=(e.clientX-r.left)*dc.width/r.width,y=(e.clientY-r.top)*dc.height/r.height;if(last){dg.beginPath();dg.moveTo(last.x,last.y);dg.lineTo(x,y);dg.stroke()}last={x:x,y:y}});
["pointerup","pointercancel","lostpointercapture"].forEach(function(ev){dc.addEventListener(ev,function(){drawing=false;last=null})});
})();
