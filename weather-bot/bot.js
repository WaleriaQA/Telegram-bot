require("dotenv").config();

const { Telegraf } = require("telegraf");
const axios = require("axios");

const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token, { polling: true });

bot.start((ctx) => ctx.reply("Hello, send me your location 🌍"));
bot.on("message", async (ctx) => {
  if (ctx.message.location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=5f2f669bebc63e2eca24a4a72fdd0264&units=metric`;
    const response = await axios.get(url);

    ctx.reply(
      `${response.data.name} : ${Math.round(response.data.main.temp)} C`
    );

    const weatherEmoji = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "🌤️",
      "02n": "☁️🌙",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };

    const icon = response.data.weather[0].icon;
    const emoji = weatherEmoji[icon] || "";
    const description = response.data.weather[0].description;

    ctx.reply(`${emoji} ${description}`);
  }
});
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));