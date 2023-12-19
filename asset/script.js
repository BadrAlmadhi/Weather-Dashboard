// declare a variables from HTML
var searchBtn = document.querySelector(".search-btn");
var cityInput = document.getElementById("city-input");

// var cityName = cityInput.value.trim();
// API Key
var apiKey = `544df32abd3d80b6cd05d312a48dfefd`;

const getWeatherDetails = (cityName, lat, lon) => {
  debugger
  const API_URL_Forecast = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  debugger
  fetch(API_URL_Forecast)
    .then((res) => res.json())
    .then((data) => {
      debugger
      console.log(data);
    })
    .catch(() => {
      alert("Error occurred while fetching for weather forecast");
    });
};

const getCityCoordinate = (event) => {
  event.preventDefault(); // prevent default to lose info
  debugger
  const cityName = cityInput.value.trim(); // git red of extra spaces
  if (!cityName) return; // return if cityName is empty
  const apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

  // This fetch gets the city coordinate (latitude, longitude, and name) from API JSON data
  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) return alert(`No coordinate found for ${cityName}`);
      const { name, lat, lon } = data[0]; // in json data all info needed is under data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("Error occurred while fetching for coordinate");
    });
};

searchBtn.addEventListener("click", getCityCoordinate);
