const DISCORD_WEBHOOK_URL = "ISI_WEBHOOK_DISCORD_KAMU";

function sendToDiscord(o) {
  const message = {
    content: `
🏍️ **NAKAMA MOTORCYCLE CLUB**
📦 **ORDER BARU MASUK**

👤 Member : ${o.name}
🏴 Chapter: ${o.chapter}

🛒 Produk : ${o.product}
📦 Jumlah : ${o.qty}
💰 Harga  : Rp ${o.price.toLocaleString()}
💵 Total  : Rp ${o.total.toLocaleString()}

🔥 Status : ${o.status}
    `
  };

  fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  });
}
