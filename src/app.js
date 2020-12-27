function showWeather(response) {
  let apiCityName = (document.querySelector("#city").innerHTML =
    response.data.name);
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = (document.querySelector(
    `#number`
  ).innerHTML = Math.round(celsiusTemperature));
  let description = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let windspeed = (document.querySelector("#windspeed").innerHTML =
    response.data.wind.speed);
  let humidity = (document.querySelector("#humidity").innerHTML =
    response.data.main.humidity);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "94b9970cd6a6ba265c6a061d30640040";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector(`#city-input`).value;
  search(city);
}

let cityInput = document.querySelector(`#search-form`);
cityInput.addEventListener("submit", submitCity);

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "94b9970cd6a6ba265c6a061d30640040";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector(`#location-button`);
currentLocation.addEventListener("click", getCurrentLocation);

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#number`);
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 31;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#number`);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let celsiusClick = document.querySelector(`#celsius`);
celsiusClick.addEventListener("click", convertCelsius);

let fahrenheitClick = document.querySelector(`#fahrenheit`);
fahrenheitClick.addEventListener("click", convertFahrenheit);

let dateNow = new Date();

let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];

let currentDay = days[dateNow.getDay()];

let currentMonth = months[dateNow.getMonth()];

let hours = dateNow.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = dateNow.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hours}:${minutes}`;

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${dateNow.getDate()} ${currentMonth}`;

let weekDay = document.querySelector("#current-day");
weekDay.innerHTML = `${currentDay}`;

search("London");
