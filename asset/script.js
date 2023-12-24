// declare a variables from HTML
var searchBtn = document.querySelector(".search-btn"); // search Button
var cityInput = document.getElementById("city-input"); // user input
var weatherCards = document.querySelector(".weather-cards");
var currentWeather = document.querySelector(".current-weather");
var currentLocation = document.querySelector(".location-btn");

var apiKey = `6206f5efcffcfd21d75777ccfcbb6a1f`;

//starter function
async function getCity(event) {
  // event.preventDefault();
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
    getLatAndLon(cityName, lat, lon);
  } catch (error) {
    console.log(`Error fetching data:`, error);
  }
}

// this gets the latitude and longitude
async function getLatAndLon(cityName, lat, lon) {
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

    // clear previous weather data
    weatherCards.innerHTML = "";
    cityInput.value = "";
    currentWeather.innerHTML = "";

    // creating weather cards and adding them to the DOM
    fiveDayForecast.forEach((weatherItems, index) => {
      if (index === 0) {
        currentWeather.insertAdjacentHTML(
          "beforeend",
          createWeatherCard(cityName, weatherItems, index)
        );
      } else {
        weatherCards.insertAdjacentHTML(
          "beforeend",
          createWeatherCard(cityName, weatherItems, index)
        );
      }
    });
  } catch (error) {
    console.log(`Error occurred while fetching for weather forecast`, error);
  }
}

// create weather cards
function createWeatherCard(cityName, weatherItems, index) {
  if (index === 0) {
    // HTML for main card
    return `<div class="details">
              <h2>${cityName} (${weatherItems.dt_txt.split(" ")[0]})</h2>
              <h4>Temperature: ${(weatherItems.main.temp - 273.15).toFixed(
                2
              )} °C</h4>
              <h4>Wind:  ${weatherItems.wind.speed} M/S</h4>
              <h4>Humidity: ${weatherItems.main.humidity}%</h4>
            </div>
            <div class="icon">
              <img
                src="https://openweathermap.org/img/wn/${
                  weatherItems.weather[0].icon
                }@4x.png"
                alt="weather-icon"
              />
              <h4>${weatherItems.weather[0].description}</h4>
            </div>`;
  } else {
    // HTML for 5 weather forecast
    return `<li class="card">
              <h3>(${weatherItems.dt_txt.split(" ")[0]})</h3>
              <img
                src="https://openweathermap.org/img/wn/${
                  weatherItems.weather[0].icon
                }@2x.png"
                alt="weather-icon"/>
              <h4>Temp: ${(weatherItems.main.temp - 273.15).toFixed(2)}°C</h4>
              <h4>Wind: ${weatherItems.wind.speed} M/S</h4>
              <h4>Humidity: ${weatherItems.main.humidity}%</h4>
            </li>`;
  }
}

const getUserCoordinate = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const Geolocation_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
      // Get city name from coordinate using reverse geocoding API
      fetch(Geolocation_URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          debugger
          const cityName = data[0].name;
          getLatAndLon( cityName, latitude, longitude);
        })
        .catch(() => {
          alert(`An error occurred while fetching the city!`);
        });
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        alert(
          `Geolocation request denied. Please reset location permission to grant access again.`
        );
      }
    }
  );
};

currentLocation.addEventListener("click", getUserCoordinate);
searchBtn.addEventListener("click", getCity);
cityInput.addEventListener("keyup", (e) => {
  // console.log("Key pressed:", e.key);
  if (e.key === "Enter") {
    getCity();
  }
});