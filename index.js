import TelegramBot from "node-telegram-bot-api";
import express from "express";

const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;

if (!BOT_TOKEN) {
  console.error("BOT_TOKEN missing");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const app = express();
app.get("/", (req, res) => {
  res.send("Pay2Call Telegram Bot is LIVE ✅");
});

bot.on("message", (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "✅ Pay2Call Bot Online\nSession system coming soon"
  );
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
