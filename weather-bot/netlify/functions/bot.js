if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { Telegraf } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);

const weatherEmoji = {
  "01d": "☀️", "01n": "🌙", "02d": "🌤️", "02n": "☁️🌙",
  "03d": "☁️", "03n": "☁️", "04d": "☁️", "04n": "☁️",
  "09d": "🌧️", "09n": "🌧️", "10d": "🌦️", "10n": "🌧️",
  "11d": "⛈️", "11n": "⛈️", "13d": "❄️", "13n": "❄️",
  "50d": "🌫️", "50n": "🌫️"
};



bot.start((ctx) => ctx.reply("Hello, send me your location 🌍"));

bot.on("message", async (ctx) => {
  if (ctx.message.location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    console.log(url);
    
    const response = await axios.get(url);

    ctx.reply(`${response.data.name} : ${Math.round(response.data.main.temp)}°C`);

    const icon = response.data.weather[0].icon;
    const emoji = weatherEmoji[icon] || "";
    const description = response.data.weather[0].description;

    ctx.reply(`${emoji} ${description}`);
  }
});

// === Netlify Function ===
exports.handler = async (event, context) => {
  console.log("Webhook called:", event.httpMethod);

  // Проверка переменных окружения
  if (!process.env.BOT_TOKEN || !process.env.WEATHER_API_KEY) {
    console.error("⚠️ Missing environment variables!");
    return { statusCode: 500, body: "Missing environment variables" };
  }

  // Обработка обновлений от Telegram
  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body);
      await bot.handleUpdate(body);
      return { statusCode: 200, body: "ok" };
    } catch (err) {
      console.error("Error handling update:", err);
      return { statusCode: 500, body: "Error handling update" };
    }
  }

  // Ответ на GET-запрос (проверка, что функция жива)
  const catEmojis = ["🐱","😺","😸","😹","😻","😼","😽","🙀","😿","😾"];
  const randomCat = catEmojis[Math.floor(Math.random() * catEmojis.length)];
  return { statusCode: 200, body: `Bot is running ${randomCat} 🚀` };
};