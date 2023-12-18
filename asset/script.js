// declare a variables from HTML
var userInput = document.getElementById("input");
var searchBtn = document.querySelector("search-btn");
var citiesNames = document.querySelector("cities"); //ul add list in it
var cityNameForecast = document.querySelector("city-name");
var temp = document.querySelector("temp");
var wind = document.querySelector("wind");
var humidity = document.querySelector("humidity");


// API Key
var apiKey = `76bed644bbb6bf7b66cb2167b944672f`;
var city = document.getElementById("input").value;
// API URL with the query parameter
var queryURl = `https://api.openweathermap.org/data/2.5/weather?q=${saltlake}&appid=${apiKey}`;

fetch(queryURl).then(function (response) {
  console.log(response);
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  }
});


async function cityNameHandler (event) {
    event.preventDefault();

    var city = userInput.value.trim();
    if (city) {
        getCityData(city);
        userInput.texContent = '';

    } 
}