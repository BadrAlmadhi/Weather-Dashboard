// declare a variables from HTML
var searchBtn = document.querySelector(".search-btn"); // search Button
var cityInput = document.getElementById("city-input"); // user input

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
    console.log(data);
    const { lat, lon } = data.coord;
    getLatAndLon(lat, lon);
  } catch (error) {
    console.log(`Error fetching data:`, error);
  }
}

async function getLatAndLon(lat, lon) {
  try {
    var cityUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    var result = await fetch(cityUrl);
    var data = await result.json();
    console.log(data);
  } catch (error) {
    console.log(`Error getting latitude and longitude`, error);
  }
}

searchBtn.addEventListener("click", getCity);
