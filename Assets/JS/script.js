// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am  again presented with current and future conditions for that city


// This is all ES5

// this is the key
var key = '76bed644bbb6bf7b66cb2167b944672f';
var city = 'Salt Lake City';



// current time and date

var date = moment().format('dddd, MMMM Do YYYY');
var dateTime = moment().format('YYYY-MM-DD HH:MM:SS')


// when search for a city we get the city by name and we get the forecast 
var search = document.querySelector('#search-city');
var displayWeather = function (cityName) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (currentData) {
            // ? if it dose not exist will throw an error
            console.log(currentData);
            var cityName = document.querySelector('#city');
            cityName.textContent = currentData?.name;
            var humidity = document.querySelector("#humidity");
            humidity.textContent = currentData?.main.humidity;
            // var date = document.querySelector('#date');
            //date.textContent = currentData
            var temp = document.querySelector('#temp');
            temp.textContent = currentData.main?.temp;

        })
    var urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=imperial`;

    var x = 1

    fetch(urlForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (forecastData) {
            // console.log(forecastData);
            var forecast = forecastData.list
            for (let i = 4; i < forecast.length; i = i + 8) {
                console.log(forecast[i]);

                // I need to fetch the forecast
                // how to fitch every city in one cars
                // var cardOne = document.forecastData
                var card = document.querySelector('#day-' + x);
                card.textContent = forecast[i].main?.temp;
                var wind = document.querySelector('#wind-' + x);
                wind.textContent = forecast[i].wind.speed;
                var hum = document.querySelector('#hum-' + x);
                hum.textContent = forecast[i].main.humidity
                x++;
            }
        })

}

search.addEventListener('click', function (event) {
    event.preventDefault(); // prevent page refresh
    var cityName = document.querySelector('#city-name');
    displayWeather(cityName.value)

});



