import axios from "axios";
import { config } from "./config.js";

export const getWeather = async (ctx) => {
  try {
    let locationLatitude = ctx.message.location.latitude;
    let locationLongitude = ctx.message.location.longitude;

    // 🔥 Просто заменили строку запроса на OpenWeatherMap:
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locationLatitude}&lon=${locationLongitude}&appid=${config.weatherApiKey}&units=metric`
    );

    // 🧩 Дальше можешь оставить, как у тебя было:
    console.log(response.data.weather[0].description);

     console.log(response.data);

    let text = `${response.data.name}: temperature ${response.data.main.temp}°C, ${response.data.weather[0].description}`;
    console.log(text);
    return text;
    
  } catch (error) {
    console.error("Ошибка при получении погоды:", error);
    return "Не удалось получить погоду 😿";
  }
  
};
