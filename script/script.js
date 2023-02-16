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

  axios.get(apiUrl).then(showLocationTemp);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", updateCity);

function showLocationTemp(response) {
  farhenheitTemperature = response.data.temperature.current;
  let iconId = response.data.condition.icon_url;
  let currentTemp = Math.round(response.data.temperature.current);
  let todayCurrent = document.querySelector("#today-current");
  let city = response.data.city;
  let country = response.data.country;
  let todayWindSpeed = document.querySelector("#today-wind-speed");
  let todayWeatherDescrip = document.querySelector("#today-weather");
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let todayWeatherValue = response.data.condition.description;
  let todayIcon = document.querySelector("#today-icon");
  todayCurrent.innerHTML = `${currentTemp}`;
  todayWindSpeed.innerHTML = `${currentWindSpeed}`;
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
  axios.get(apiUrl).then(showLocationTemp);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentLocation);

function displayFarhenheit(event) {
  event.preventDefault();
  let todayCurrent = document.querySelector("#today-current");
  todayCurrent.innerHTML = Math.round(farhenheitTemperature);
  celciusLink.classList.remove("inactivate-link");
  farhenheitLink.classList.add("inactivate-link");
}

let farhenheitLink = document.querySelector("#farhenheit-link");
farhenheitLink.addEventListener("click", displayFarhenheit);

function displayCelcius(event) {
  event.preventDefault();
  let todayCurrent = document.querySelector("#today-current");
  let celciusTemperature = (farhenheitTemperature - 32) * (5 / 9);
  todayCurrent.innerHTML = Math.round(celciusTemperature);
  celciusLink.classList.add("inactivate-link");
  farhenheitLink.classList.remove("inactivate-link");
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelcius);

let farhenheitTemperature = null;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  forecastHTML = `<div class="col-6">`;
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  day.forEach(function (days) {
    forecastHTML =
      forecastHTML +
      `<div class="card mb-3" style="max-width: 540px">
            <div class="row g-0 forecast">
              <div class="col-md-4 forecast-img">
                <img
                  src="images/sunny-cold.jpg"
                  class="img-fluid rounded-start"
                  alt="Sunny but cold."
                  max-width="50px"
                />
              </div>
              <div class="col-md-8 forecast-body">
                <div class="card-body">
                  <h5 class="card-title">${days}<h5>
                  <p class="card-text">
                    High temp: 20°F
                    <br />
                    Low temp: 18°F
                    <br />
                    Chance of preciptation: 13%
                  </p>
                </div>
              </div>
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
