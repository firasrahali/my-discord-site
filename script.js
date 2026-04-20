const userID = "1350859677470163026";

// 🔥 Open Discord profile
function openDiscord() {
  window.open(`https://discord.com/users/${userID}`, "_blank");
}

// 📋 Copy ID (safe + modern)
function copyID() {
  navigator.clipboard.writeText(userID)
    .then(() => {
      alert("ID Copied: " + userID);
    })
    .catch(() => {
      alert("Failed to copy ID");
    });
}

// 🟢 Load Discord status (Lanyard API)
async function loadDiscord() {
  const statusEl = document.getElementById("status");
  const avatarEl = document.getElementById("avatar");

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userID}`);

    if (!res.ok) throw new Error("API error");

    const json = await res.json();
    const d = json.data;

    // 🖼️ avatar safe check
    if (d.discord_user.avatar && avatarEl) {
      avatarEl.src =
        `https://cdn.discordapp.com/avatars/${userID}/${d.discord_user.avatar}.png`;
    }

    // 🟢 status mapping
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

    const statusEl = document.getElementById("status");
    if (statusEl) {
      statusEl.innerText = "⚠️ Status unavailable";
    }
  }
}

// 🚀 auto load
loadDiscord();