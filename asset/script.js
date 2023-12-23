// declare a variables from HTML
var searchBtn = document.querySelector(".search-btn"); // search Button
var cityInput = document.getElementById("city-input"); // user input
var weatherCards = document.querySelector(".weather-cards");

var apiKey = `6206f5efcffcfd21d75777ccfcbb6a1f`;

//starter function
async function getCity(event) {
  event.preventDefault();
  try {
    var cityName = cityInput.value.trim();
    var cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    var result = await fetch(cityURL);
    var data = await result.json();
    if (!data.name) {
      return alert(`No coordinate found for ${cityName}`);
    }
    // console.log(data);
    const { lat, lon } = data.coord;
    getLatAndLon(lat, lon);
  } catch (error) {
    console.log(`Error fetching data:`, error);
  }
}

// this gets the latitude and longitude
async function getLatAndLon(lat, lon) {
  debugger
  try {
    var cityUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    var result = await fetch(cityUrl);
    var data = await result.json();

    // filter the forecast to get only one forecast per day
    var uniqueForecastDays = [];
    var fiveDayForecast = data.list.filter((forecast) => {
      var forecastDate = new Date(forecast.dt_txt).getDate();
      if (!uniqueForecastDays.includes(forecastDate)) {
        return uniqueForecastDays.push(forecastDate);
      }
    });

    console.log(fiveDayForecast);
    fiveDayForecast.forEach((weatherItems) => {
      weatherCards.insertAdjacentHTML("beforeend", createWeatherCard(weatherItems));
    });
  } catch (error) {
    console.log(`Error occurred while fetching for weather forecast`, error);
  }
}

// create weather cards
async function createWeatherCard(weatherItems) {
  debugger
  try {
    return `<li class="card">
              <h3>(${weatherItems.dt.text.split(" ")[0]})</h3>
              <img
                src="https://openweathermap.org/img/wn/${weatherItems.weather[0].icon}@2x.png"
                alt="weather-icon"/>
              <h4>Temp: ${(weatherItems.main.temp - 273.15).toFixed(2)}°C</h4>
              <h4>Wind: ${weatherItems.wind.speed} M/S</h4>
              <h4>Humidity: ${weatherItems.main.humidity}%</h4>
            </li>`;
  } catch (error) {
    console.log(`Error occurred while creating forecast cards`);
  }
}

searchBtn.addEventListener("click", getCity);
