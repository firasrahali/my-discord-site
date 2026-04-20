const userID = "1350859677470163026";

// 🔥 Open Discord profile
function openDiscord() {
  window.open(`https://discord.com/users/${userID}`, "_blank");
}

// 📋 Copy ID
function copyID() {
  navigator.clipboard.writeText(userID);
  alert("ID Copied: " + userID);
}

// 🟢 Fetch live Discord status (Lanyard API)
async function loadDiscord() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userID}`);
    const data = await res.json();

    const d = data.data;

    // avatar
    document.getElementById("avatar").src =
      `https://cdn.discordapp.com/avatars/${userID}/${d.discord_user.avatar}.png`;

    // status
    let status = d.discord_status;

    let emoji = "🟢";
    if (status === "idle") emoji = "🟡";
    if (status === "dnd") emoji = "🔴";
    if (status === "offline") emoji = "⚫";

    document.getElementById("status").innerText =
      `${emoji} Status: ${status}`;

  } catch (e) {
    document.getElementById("status").innerText =
      "⚠️ Failed to load status";
  }
}

loadDiscord();