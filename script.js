const userID = "1350859677470163026";

/* 🚀 enter site */
function enter(){
  document.getElementById("intro").style.display="none";
  document.getElementById("main").style.display="flex";
}

/* 🔗 open discord */
function openDiscord(){
  window.open(`https://discord.com/users/${userID}`,"_blank");
}

/* 🖱️ mouse trail ultra smooth */
document.addEventListener("mousemove",(e)=>{
  const dot = document.createElement("div");
  dot.className = "trail";

  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";

  document.body.appendChild(dot);

  setTimeout(()=>dot.remove(),600);
});

/* 🔥 optional: small intro delay effect */
window.onload = () => {
  document.body.style.opacity = "1";
};