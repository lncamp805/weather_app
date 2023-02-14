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
//console.log(citySearch);
citySearch.addEventListener("submit", updateCity);

function showCurrentLocationTemp(response) {
  let iconId = response.data.weather[0].icon;
  let currentTemp = Math.round(response.data.main.temp);
  let todayCurrent = document.querySelector("#today-current");
  let city = response.data.name;
  let todayHigh = document.querySelector("#today-high");
  let todayLow = document.querySelector("#today-low");
  let todayWeatherDescrip = document.querySelector("#today-weather");
  let todayTempMax = Math.round(response.data.main.temp_max);
  let todayTempMin = Math.round(response.data.main.temp_min);
  let todayWeatherValue = response.data.weather[0].description;
  let todayIcon = document.querySelector("#today-icon");
  todayCurrent.innerHTML = `Current temperature: ${currentTemp}°F`;
  todayHigh.innerHTML = `High temp: ${todayTempMax}°F`;
  todayLow.innerHTML = `Low temp: ${todayTempMin}°F`;
  todayWeatherDescrip.innerHTML = `${todayWeatherValue}`;
  let displayCity = document.querySelector("h2");
  displayCity.innerHTML = `${city}`;
  todayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconId}@2x.png`
  );
}

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);

  let apiKey = "0b3e60b3ftc9e5b1a243b344bf94oe49";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentLocationTemp);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentLocation);
