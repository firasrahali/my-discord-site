const userID = "1350859677470163026";

/* 🔥 open discord */
function openDiscord() {
  window.open(`https://discord.com/users/${userID}`, "_blank");
}

/* 📋 copy ID */
function copyID() {
  navigator.clipboard.writeText(userID)
    .then(() => alert("ID Copied ✅"))
    .catch(() => alert("Copy failed ❌"));
}

/* 🟢 load discord status */
async function loadDiscord() {

  const statusEl = document.getElementById("status");
  const avatarEl = document.getElementById("avatar");

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userID}`);
    const json = await res.json();
    const d = json.data;

    if (!d) return;

    /* 🖼️ avatar safe */
    if (avatarEl) {
      const avatar = d.discord_user.avatar;

      avatarEl.src = avatar
        ? `https://cdn.discordapp.com/avatars/${d.discord_user.id}/${avatar}.png`
        : "https://cdn.discordapp.com/embed/avatars/0.png";
    }

    /* 🟢 status */
    const statusMap = {
      online: "🟢 Online",
      idle: "🟡 Idle",
      dnd: "🔴 Do Not Disturb",
      offline: "⚫ Offline"
    };

    if (statusEl) {
      statusEl.innerText =
        statusMap[d.discord_status] || "⚫ Unknown";
    }

  } catch (err) {
    console.log(err);

    if (statusEl) {
      statusEl.innerText = "⚠️ Offline / API error";
    }
  }
}

/* 🚀 init */
loadDiscord();

/* 🔄 refresh safer */
setInterval(loadDiscord, 15000);