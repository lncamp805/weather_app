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

  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCurrentLocationTemp);
}

let citySearch = document.querySelector("#city-search");
console.log(citySearch);
citySearch.addEventListener("submit", updateCity);

function showCurrentLocationTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let todayHigh = document.querySelector("#today-high");
  let todayLow = document.querySelector("#today-low");
  let todayWeather = document.querySelector("#today-weather");
  let todayTempMax = Math.round(response.data.main.temp_max);
  let todayTempMin = Math.round(response.data.main.temp_min);
  let todayWeatherValue = response.data.weather[0].description;
  todayHigh.innerHTML = `High temp: ${todayTempMax}°F`;
  todayLow.innerHTML = `Low temp: ${todayTempMin}°F`;
  todayWeather.innerHTML = `${todayWeatherValue}`;
  let displayCity = document.querySelector("h2");
  displayCity.innerHTML = `${city}`;
}

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);

  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCurrentLocationTemp);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentLocation);
