const userID="1350859677470163026";

/* 🎵 MUSIC */
const music = document.getElementById("music");

function setVolume(v){
  music.volume = v;
}

/* 🖱️ cursor */
const cursor=document.createElement("div");
cursor.className="cursor";
document.body.appendChild(cursor);

document.addEventListener("mousemove",(e)=>{
  cursor.style.left=e.clientX+"px";
  cursor.style.top=e.clientY+"px";

  const dot=document.createElement("div");
  dot.className="trail";
  dot.style.left=e.clientX+"px";
  dot.style.top=e.clientY+"px";
  document.body.appendChild(dot);

  setTimeout(()=>dot.remove(),400);
});

/* 🌌 3D stars canvas */
const canvas=document.createElement("canvas");
document.body.appendChild(canvas);
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let stars=[];

for(let i=0;i<200;i++){
  stars.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    z:Math.random()*1000
  });
}

let mouseX=0;
let mouseY=0;

document.addEventListener("mousemove",(e)=>{
  mouseX=e.clientX;
  mouseY=e.clientY;
});

function draw(){
  ctx.fillStyle="black";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  for(let s of stars){
    s.z-=2;
    if(s.z<=0) s.z=1000;

    let k=128/s.z;
    let x=s.x*k + (mouseX- canvas.width/2)*0.02;
    let y=s.y*k + (mouseY- canvas.height/2)*0.02;

    let size=(1-s.z/1000)*3;

    ctx.fillStyle="#00f7ff";
    ctx.fillRect(x,y,size,size);
  }

  requestAnimationFrame(draw);
}
draw();

/* 🟢 Discord status */
async function loadDiscord(){
  try{
    const res=await fetch(`https://api.lanyard.rest/v1/users/${userID}`);
    const d=(await res.json()).data;

    status.innerText=d.discord_status;
    avatar.src=`https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.png`;
  }catch{}
}
loadDiscord();
setInterval(loadDiscord,20000);