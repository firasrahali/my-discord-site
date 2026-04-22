const userID = "1350859677470163026";

/* 🔥 hacking cinematic */
const text = [
"Connecting...",
"Access granted...",
"Loading user FIRAS...",
"Decrypting data...",
"Welcome..."
];

let i=0;
let j=0;

function type(){
  if(i<text.length){
    if(j<text[i].length){
      document.getElementById("hackText").innerHTML+=text[i][j];
      j++;
      setTimeout(type,30);
    }else{
      document.getElementById("hackText").innerHTML+="\n";
      i++; j=0;
      setTimeout(type,200);
    }
  }else{
    setTimeout(startSite,800);
  }
}

/* 🚀 start main */
function startSite(){
  document.getElementById("intro").style.display="none";
  document.getElementById("main").style.display="flex";
  document.getElementById("bgMusic").play();
}

type();

/* 🔗 discord */
function openDiscord(){
  document.getElementById("clickSound").play();
  window.open(`https://discord.com/users/${userID}`,"_blank");
}

/* 🟢 discord status */
async function loadDiscord(){
  try{
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userID}`);
    const data = (await res.json()).data;

    document.getElementById("status").innerText = data.discord_status;

    document.getElementById("avatar").src =
      `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`;

  }catch(e){
    document.getElementById("status").innerText = "offline";
  }
}

loadDiscord();
setInterval(loadDiscord,20000);

/* 🖱️ cursor neon */
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

  setTimeout(()=>dot.remove(),500);
});