const userID = "1350859677470163026";

/* 🔥 Discord open */
function openDiscord() {
  window.open(`https://discord.com/users/${userID}`, "_blank");
}

/* 📋 copy ID */
function copyID() {
  navigator.clipboard.writeText(userID)
    .then(() => alert("ID Copied ✅"))
    .catch(() => alert("Copy failed ❌"));
}

/* 🟢 Discord status */
async function loadDiscord() {
  const statusEl = document.getElementById("status");
  const avatarEl = document.getElementById("avatar");

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userID}`);
    const json = await res.json();
    const d = json.data;

    if (!d) throw new Error("No data");

    /* 🖼️ avatar FIX */
    if (avatarEl && d.discord_user.avatar) {
      avatarEl.src = `https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.png`;
    }

    /* 🟢 status */
    const statusMap = {
      online: "🟢 Online",
      idle: "🟡 Idle",
      dnd: "🔴 Do Not Disturb",
      offline: "⚫ Offline"
    };

    if (statusEl) {
      statusEl.innerText = statusMap[d.discord_status] || "⚫ Unknown";
    }

  } catch (err) {
    console.log(err);

    if (statusEl) {
      statusEl.innerText = "⚠️ Discord offline";
    }
  }
}

/* 🚀 auto refresh (PRO feature) */
loadDiscord();
setInterval(loadDiscord, 10000);