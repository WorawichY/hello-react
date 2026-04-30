import { useState, useEffect } from "react";
import styles from "./WeatherInfo.module.css";

function WeatherInfo() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const city = "Chiang Mai";

  useEffect(() => {
    if (!apiKey || apiKey === "your_api_key_here") {
      setLoading(false);
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.main) {
          setWeather({
            temp: data.main.temp,
            desc: data.weather[0].description,
            icon: data.weather[0].main,
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [apiKey]);

  if (loading) return null;

  if (!weather) {
    return (
      <div className={styles.weather}>
        <span className={styles.icon}>📍</span>
        <span>{city}, Thailand (Add API Key to see weather)</span>
      </div>
    );
  }

  const getEmoji = (icon) => {
    const map = { Clear: "☀️", Clouds: "☁️", Rain: "🌧️", Thunderstorm: "⛈️", Snow: "❄️" };
    return map[icon] || "🌤️";
  };

  return (
    <div className={styles.weather}>
      <span className={styles.icon}>{getEmoji(weather.icon)}</span>
      <div>
        <strong>{city}</strong>: <span className={styles.temp}>{Math.round(weather.temp)}°C</span>, {weather.desc}
      </div>
    </div>
  );
}

export default WeatherInfo;
