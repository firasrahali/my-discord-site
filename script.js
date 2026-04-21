const userID = "1350859677470163026";

/* 🚀 open discord profile */
function openDiscord() {
  window.open(`https://discord.com/users/${userID}`, "_blank");
}

/* 📋 copy ID */
function copyID() {
  navigator.clipboard.writeText(userID)
    .then(() => alert("ID Copied ✅"))
    .catch(() => alert("Copy failed ❌"));
}

/* 🟢 load discord status (Lanyard API) */
async function loadDiscord() {

  const statusEl = document.getElementById("status");
  const avatarEl = document.getElementById("avatar");

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userID}`);

    if (!res.ok) throw new Error("API error");

    const json = await res.json();
    const d = json?.data;

    if (!d) return;

    /* 🖼️ avatar */
    if (avatarEl) {
      const avatar = d.discord_user?.avatar;
      const id = d.discord_user?.id;

      avatarEl.src = avatar
        ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
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
      statusEl.textContent =
        statusMap[d.discord_status] ?? "⚫ Unknown";
    }

  } catch (err) {
    console.log("Discord fetch error:", err);

    if (statusEl) statusEl.textContent = "⚠️ Discord unavailable";
    if (avatarEl) avatarEl.src = "https://cdn.discordapp.com/embed/avatars/0.png";
  }
}

/* 🚀 start */
loadDiscord();

/* 🔄 refresh كل 20 ثانية */
setInterval(loadDiscord, 20000);