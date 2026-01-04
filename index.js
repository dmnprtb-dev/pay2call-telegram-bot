import express from "express";

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;

// Root test
app.get("/", (req, res) => {
  res.send("Pay2Call Telegram Bot is LIVE ✅");
});

// Telegram webhook
app.post("/webhook", async (req, res) => {
  const update = req.body;

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text || "";

    let reply = "Welcome to Pay2Call 🚀";

    if (text === "/start") {
      reply = "✅ Pay2Call Bot Active\nUse /menu";
    }

    if (text === "/menu") {
      reply = "📞 Pay2Call Menu\n\n1️⃣ Talk to Caller\n2️⃣ Wallet\n3️⃣ History";
    }

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply,
      }),
    });
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Bot running on port", PORT);
});
