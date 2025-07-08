require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// Вставь сюда свой токен:
const token = process.env.BOT_TOKEN;

// Создаём бота в режиме polling
const bot = new TelegramBot(token, { polling: true });

// ID пользователя, которому будем автоматически отвечать
const allowedUserId = 752407857;

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text?.toLowerCase();

  console.log(`Новое сообщение от ${userId}:`, text);

  // Реагируем только на нужного человека
  if (userId !== allowedUserId || !text) return;

  // Примитивная система автоответов
  if (text.includes('как дела')) {
    bot.sendMessage(chatId, 'Хорошо.');
  } else if (text.includes('что делаешь')) {
    bot.sendMessage(chatId, 'Занята.');
  } else if (text.includes('выспалась')) {
    bot.sendMessage(chatId, 'Почти.');
  }
});


// 🚀 Добавляем минимальный Express-сервер для UptimeRobot
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Бот работает и не спит 💤');
});

app.listen(PORT, () => {
  console.log(`Сервер слушает на порту ${PORT}`);
});
