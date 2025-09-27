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

    const response = await axios.get(url);

    ctx.reply(`${response.data.name} : ${Math.round(response.data.main.temp)}°C`);

    const icon = response.data.weather[0].icon;
    const emoji = weatherEmoji[icon] || "";
    const description = response.data.weather[0].description;

    ctx.reply(`${emoji} ${description}`);
  }
});

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      await bot.handleUpdate(req.body);
    } catch (err) {
      console.error("Error handling update", err);
    }
    return res.status(200).send("ok");
  }
  res.status(200).send("Bot is running");
};
