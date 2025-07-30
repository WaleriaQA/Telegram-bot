require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express(); // ⬅️ Перенесён выше для аккуратности

// Запускаем Express-сервер для UptimeRobot
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Бот работает и не спит 💤');
});
app.listen(PORT, () => {
  console.log(`Сервер Express слушает на порту ${PORT}`);
});

// --- Telegram-бот ---
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const allowedUserId = 752407857;

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text?.toLowerCase();

  console.log(`Новое сообщение от ${userId}:`, text);

  if (userId !== allowedUserId || !text) return;

  if (text.includes('как дела')) {
    bot.sendMessage(chatId, 'Хорошо.');
  } else if (text.includes('что делаешь')) {
    bot.sendMessage(chatId, 'Занята.');
  } else if (text.includes('выспалась')) {
    bot.sendMessage(chatId, 'Почти.');
  }
});
