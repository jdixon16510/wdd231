const apiKey = "20d7c303d7045bf62ea7b94225fb20b4";
const lat = 40.40;
const lon = -105.08;
const units = "imperial";

async function getWeather() {
  const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentURL),
      fetch(forecastURL)
    ]);

    if (!currentRes.ok || !forecastRes.ok) throw Error("Weather data fetch failed");

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    // === CURRENT WEATHER ===
    document.getElementById("current-temp").textContent = `${currentData.main.temp.toFixed(1)} °F`;

    const weatherFigure = document.getElementById("weather-figure");
    weatherFigure.innerHTML = "";

    const iconImg = document.createElement("img");
    iconImg.src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;
    iconImg.alt = currentData.weather[0].description;
    iconImg.id = "weather-icon";

    const figcaption = document.createElement("figcaption");
    figcaption.id = "weather-desc";
    figcaption.textContent = currentData.weather[0].description;

    weatherFigure.appendChild(iconImg);
    weatherFigure.appendChild(figcaption);

    // === SUNRISE & SUNSET ===
    const sunrise = new Date(currentData.sys.sunrise * 1000);
    const sunset = new Date(currentData.sys.sunset * 1000);
    const timeOptions = { hour: '2-digit', minute: '2-digit' };

    const sunInfo = document.createElement("p");
    sunInfo.innerHTML = `
      🌅 <strong>Sunrise:</strong> ${sunrise.toLocaleTimeString([], timeOptions)}<br>
      🌇 <strong>Sunset:</strong> ${sunset.toLocaleTimeString([], timeOptions)}
    `;
    document.getElementById("weather-container").appendChild(sunInfo);

    // === FORECAST (3 days) ===
    const forecastWrapper = document.getElementById("forecast");
    forecastWrapper.innerHTML = "";

    // Prefer noon forecasts; fallback every 8 steps
    let filtered = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));
    if (filtered.length < 3) {
      filtered = forecastData.list.filter((_, i) => i % 8 === 4);
    }

    const forecastContainer = document.createElement("div");
    forecastContainer.classList.add("forecast");

    filtered.slice(0, 3).forEach(day => {
      const date = new Date(day.dt_txt);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const temp = day.main.temp.toFixed(1);
      const icon = day.weather[0].icon;
      const desc = day.weather[0].description;

      const card = document.createElement("div");
      card.classList.add("forecast-day");
      card.innerHTML = `
        <strong>${dayName}</strong><br>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" /><br>
        ${temp} °F<br>
        <small>${desc}</small>
      `;
      forecastContainer.appendChild(card);
    });

    forecastWrapper.appendChild(forecastContainer);

  } catch (error) {
    console.error("Weather API error:", error);
  }
}

getWeather();
