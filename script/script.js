let updatedDate = document.querySelector(".today-date");
let now = new Date();
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let today = day[now.getDay()];
let currentMonth = month[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();

updatedDate.innerHTML = `${today} ${currentMonth} ${date}, ${year} ${hours}:${minutes}`;
if (minutes < 10) {
  updatedDate.innerHTML = `${today} ${currentMonth} ${date}, ${year} ${hours}:0${minutes}`;
}

function updateCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-input");
  let displayCity = document.querySelector("h2");
  displayCity.innerHTML = `${newCity.value}`;

  let apiKey = "0b3e60b3ftc9e5b1a243b344bf94oe49";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${newCity.value}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCurrentLocationTemp);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", updateCity);

function showCurrentLocationTemp(response) {
  farhenheitTemperature = response.data.temperature.current;
  let iconId = response.data.condition.icon_url;
  let currentTemp = Math.round(response.data.temperature.current);
  let todayCurrent = document.querySelector("#today-current");
  let city = response.data.city;
  let country = response.data.country;
  let todayFeelsLike = document.querySelector("#today-feels-like");
  let todayWeatherDescrip = document.querySelector("#today-weather");
  let todayTempFeelsLike = Math.round(response.data.temperature.feels_like);
  let todayWeatherValue = response.data.condition.description;
  let todayIcon = document.querySelector("#today-icon");
  todayCurrent.innerHTML = `Current temperature: ${currentTemp}°F`;
  todayFeelsLike.innerHTML = `Feels like: ${todayTempFeelsLike}°F`;
  todayWeatherDescrip.innerHTML = `${todayWeatherValue}`;
  let displayCity = document.querySelector("h2");
  displayCity.innerHTML = `${city}, ${country}`;
  todayIcon.setAttribute("src", `${iconId}`);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0b3e60b3ftc9e5b1a243b344bf94oe49";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentLocationTemp);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentLocation);

function displayFarhenheit() {
  let todayCurrent = document.querySelector("#today-current");
  todayCurrent.innerHTML = Math.round(farhenheitTemperature);
}

let farhenheitLink = document.querySelector("#farhenheit-link");
farhenheitLink.addEventListener("click", displayFarhenheit);

function displayCelcius(event) {
  event.preventDefault();
  let todayCurrent = document.querySelector("#today-current");
  let celciusTemperature = (farhenheitTemperature - 32) * (5 / 9);
  todayCurrent.innerHTML = Math.round(celciusTemperature);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelcius);

let farhenheitTemperature = null;
