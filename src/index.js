let lon = null;
let lat = null;
let celsiusTemperature = null;
let min = null;
let max = null;
let apiKey = "ac3c02e9439b2a5f701addd7d8527168";


function formatDate(time) {
  //Feature #1
  let dateFunc = new Date(time);
  let daysFunc = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let dayFunc = daysFunc[dateFunc.getUTCDay()];

  let dateHour = dateFunc.getUTCHours();
  if (dateHour < 10) {
    dateHour = `0${dateHour}`;
  }
  let dateMinutes = dateFunc.getUTCMinutes();
  if (dateMinutes < 10) {
    dateMinutes = `0${dateMinutes}`;
  }
  let currentDateFunc = `Last Updated: ${dayFunc}, ${dateHour}:${dateMinutes}`;
  return currentDateFunc;
}
  
  let currentTime = new Date();
  
  let time = document.querySelector(".current-day-and-time");
  time.innerHTML = formatDate(currentTime);

  function convertDtToHours(dt) {
    
    let day = new Date(dt * 1000); 
    let dayHour = day.getUTCHours();
    let dayMinutes = day.getUTCMinutes();
    if (dayHour < 10) {
      dayHour = `0${dayHour}`;
    } else {
      dayHour = `${dayHour}`;
    }
  
    if (dayMinutes < 10) {
      dayMinutes = `0${dayMinutes}`;
    } else {
      dayMinutes = `${dayMinutes}`;
    }
  
    let timeMinutesHour = `${dayHour}:${dayMinutes}`;
    return timeMinutesHour;
  
  }

  function convertDtToDays(dt) {
    var allDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
    let day = new Date(dt * 1000); // to get the DateTime.
    let dayName = allDays[day.getDay()]; // It will give day index, and based on index we can get day name from the array.
    console.log(dayName);
    return dayName;
  }
  
  //Feature 1
  //Convert from Celsius to Farenheit


function displayCelsius(event) {
  event.preventDefault();
  //console.log(`The celsius teperature is ${celsiusTemperature}`);
  let celsius = document.querySelector("#tempe");
  celsius.innerHTML = celsiusTemperature;
  celsiusDegree.classList.add("active");
  farenheitDegree.classList.remove("active");
}

let celsiusDegree = document.querySelector("#celsius");
celsiusDegree.addEventListener("click", displayCelsius);

function convertToFarenheit(event) {
  event.preventDefault();
  //console.log(`The celsius teperature is ${celsiusTemperature}`);
  let fahr = Math.round((celsiusTemperature * 9) / 5 + 32);
  let farenh = document.querySelector("#tempe");
  farenh.innerHTML = fahr;
  farenheitDegree.classList.add("active");
  celsiusDegree.classList.remove("active");
}

let farenheitDegree = document.querySelector("#farenheit");
farenheitDegree.addEventListener("click", convertToFarenheit);
  
//Get API and change inner HTML

//Forecast 

function displayTempEveryThreeHours(response) {
  let detailedInfoTitle = document.querySelector(".weather-throughout-the-day");
  detailedInfoTitle.innerHTML = "Temperature";
  console.log(response.data);
  let forecastHtml = document.querySelector("#detailed-information");
  forecastHtml.innerHTML = null;
  let detailedInformation = null;

  for (let index = 0; index < 8; index++) {
    detailedInformation = response.data.list[index];
    let dt = detailedInformation.dt + response.data.city.timezone;
    let hour = convertDtToHours(dt);
    let icon = detailedInformation.weather[0].icon;
    min = Math.round(detailedInformation.main.temp_min);
    max = Math.round(detailedInformation.main.temp_max);
    console.log(`min and max are ${min}, ${max}`);

    forecastHtml.innerHTML += `
  <div class="col">
  <span> ${hour} </span>
  <br/>
  <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon" width = "70%">
  <br/>
  <div class="degree">
  <span class="min-max minimum"> ${max}° </span>|<span class="min-max maximum"> ${min}° </span>
  </div>
  </div>
  `;
  }
}

function displayWindEveryThreeHours(response) {
  let detailedInfoTitle = document.querySelector(".weather-throughout-the-day");
  detailedInfoTitle.innerHTML = "Wind";
  console.log(response.data);
  let forecastHtml = document.querySelector("#detailed-information");
  forecastHtml.innerHTML = null;
  let detailedInformation = null;

  for (let index = 0; index < 8; index++) {
    detailedInformation = response.data.list[index];
    let dt = detailedInformation.dt + response.data.city.timezone;
    let hour = convertDtToHours(dt);
    let degree = detailedInformation.wind.deg;
    let wind = detailedInformation.wind.speed;

    forecastHtml.innerHTML += `
  <div class="col">
  <span> ${hour} </span>
  <br/>
  <span class="min-max"> ${degree}° </span>
  <br/>
  <div class="degree">
  <span class="min-max"> ${wind}km/hr </span>
  </div>
  </div>
  `;
  }
}

function displayHumidityEveryThreeHours(response) {
  let detailedInfoTitle = document.querySelector(".weather-throughout-the-day");
  detailedInfoTitle.innerHTML = "Humidity";
  console.log(response.data);
  let forecastHtml = document.querySelector("#detailed-information");
  forecastHtml.innerHTML = null;
  let detailedInformation = null;

  for (let index = 0; index < 8; index++) {
    detailedInformation = response.data.list[index];
    let dt = detailedInformation.dt + response.data.city.timezone;
    let hour = convertDtToHours(dt);
    let humidity = detailedInformation.main.humidity;

    forecastHtml.innerHTML += `
  <div class="col">
  <span> ${hour} </span>
  <br/>
  
  <br/>
  <div class="degree">
  <span class="min-max"> ${humidity}% </span>
  </div>
  </div>
  `;
  }
}

function readForecast(response) {
  let forecastHtml = document.querySelector("#forecast");
  forecastHtml.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 8; index++) {
    forecast = response.data.daily[index];
    let dt = forecast.dt + response.data.timezone_offset;
    let day = convertDtToDays(dt);
    let icon = forecast.weather[0].icon;
    let min = Math.round(forecast.temp.min);
    let max = Math.round(forecast.temp.max);

    forecastHtml.innerHTML += `
  <div class="col">
  <span> ${day} </span>
  <br/>
  <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon" width = "70%">
  <br/>
  <div class="degree">
  <span class="min-max"> ${max}° </span>|<span class="min-max"> ${min}° </span>
  </div>
  </div>
  `;
}
}

  function displayTemperature(response) {
    
    let date = response.data.dt + response.data.timezone;
    let time = document.querySelector(".current-day-and-time");
    time.innerHTML = formatDate(date * 1000);

    celsiusTemperature = Math.round(response.data.main.temp);
    let temperatureHtml = document.querySelector("#tempe");
    temperatureHtml.innerHTML = celsiusTemperature;
  
    let description = response.data.weather[0].description;
    let descriptionHtml = document.querySelector("#description");
    descriptionHtml.innerHTML = `${description}`;
  
    let iconWeather = response.data.weather[0].icon;
    let iconHtml = document.querySelector("#icon");
    iconHtml.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconWeather}@2x.png`
  );
  iconHtml.setAttribute(
    "alt",
    description
  );

    let humidity = response.data.main.humidity;
    let humidityHtml = document.querySelector("#humidity");
    humidityHtml.innerHTML = `Humidity: ${humidity}%`;
  
    let wind = Math.round(response.data.wind.speed);
    let windHtml = document.querySelector("#wind");
    windHtml.innerHTML = `Wind: ${wind}km/hr`;
  
    let sunriseAPI = response.data.sys.sunrise + response.data.timezone;
    let sunrise = convertDtToHours(sunriseAPI);
    let sunriseHtml = document.querySelector("#sunrise");
    sunriseHtml.innerHTML = `Sunrise: ${sunrise}`;
  
    let sunsetAPI = response.data.sys.sunset + response.data.timezone;
    let sunset = convertDtToHours(sunsetAPI);
    let sunsetHtml = document.querySelector("#sunset");
    sunsetHtml.innerHTML = `Sunset: ${sunset}`;
  
    //Figure out later what means the numbers in Sunrise and Sunset, and how to add precipitation.

  //Forecast
  lon = response.data.coord.lon;
  lat = response.data.coord.lat;
  console.log(lon);
  console.log(lat);

  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(readForecast);

  let apiUrlThreeHoursTemp = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlThreeHoursTemp).then(displayTempEveryThreeHours);

  }
  
  function changeCityName(event) {
    event.preventDefault();
    let currentCity = document.querySelector("#enter-city");
    let enterCity = document.querySelector(".city");
    let city = currentCity.value;
    enterCity.innerHTML = city;
  
    let apiKey = "ac3c02e9439b2a5f701addd7d8527168";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    //console.log(apiUrl);
    axios.get(apiUrl).then(displayTemperature);
  }

  function searchButtonWind(event) {
    event.preventDefault();
    let apiUrlThreeHoursWind = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlThreeHoursWind).then(displayWindEveryThreeHours);
  }
  
  function searchButtonHumidity(event) {
    event.preventDefault();
    let apiUrlThreeHoursHumidity = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlThreeHoursHumidity).then(displayHumidityEveryThreeHours);
  }
  
  function searchButtonTemperature(event) {
    event.preventDefault();
    let apiUrlThreeHoursTemp = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlThreeHoursTemp).then(displayTempEveryThreeHours);
  }

//Event Listeners

  let changeCity = document.querySelector("#submit-city");
  changeCity.addEventListener("submit", changeCityName);

  let windClick = document.querySelector("#wind-button");
  windClick.addEventListener("click", searchButtonWind);

  let humidityClick = document.querySelector("#humidity-button");
  humidityClick.addEventListener("click", searchButtonHumidity);

  let temperatureClick = document.querySelector("#temperature-button");
  temperatureClick.addEventListener("click", searchButtonTemperature);
  
  //Bonus Feature
  function displayCurrentLocation(response) {

    let date = response.data.dt + response.data.timezone;
    let time = document.querySelector(".current-day-and-time");
    time.innerHTML = formatDate(date * 1000);

    let currentPlace = response.data.name;
    let enterCity = document.querySelector(".city");
    enterCity.innerHTML = `You are in ${currentPlace}`;
  
    celsiusTemperature = Math.round(response.data.main.temp);
    let temperatureHtml = document.querySelector("#tempe");
    temperatureHtml.innerHTML = celsiusTemperature;
  
    let description = response.data.weather[0].description;
    let descriptionHtml = document.querySelector("#description");
    descriptionHtml.innerHTML = `${description}`;

    let iconWeather = response.data.weather[0].icon;
    let iconHtml = document.querySelector("#icon");
    iconHtml.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconWeather}@2x.png`
  );
  iconHtml.setAttribute(
    "alt",
    description
  );
  
    //let precipitation = response.data.main.precipitation;
    //console.log(response.data);
    //let precipitationHtml = document.querySelector("#precipitation");
    //precipitationHtml.innerHTML = `Precipitation: ${precipitation}%`;
  
    let humidity = response.data.main.humidity;
    let humidityHtml = document.querySelector("#humidity");
    humidityHtml.innerHTML = `Humidity: ${humidity}%`;
  
    let wind = Math.round(response.data.wind.speed);
    let windHtml = document.querySelector("#wind");
    windHtml.innerHTML = `Wind: ${wind}km/hr`;
  
    let sunriseAPI = response.data.sys.sunrise + response.data.timezone;
    let sunrise = convertDtToHours(sunriseAPI);
    let sunriseHtml = document.querySelector("#sunrise");
    sunriseHtml.innerHTML = `Sunrise: ${sunrise}`;
  
    let sunsetAPI = response.data.sys.sunset + response.data.timezone;
    let sunset = convertDtToHours(sunsetAPI);
    let sunsetHtml = document.querySelector("#sunset");
    sunsetHtml.innerHTML = `Sunset: ${sunset}`;

    let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
    axios.get(apiUrlForecast).then(readForecast);

    let apiUrlThreeHoursTemp = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlThreeHoursTemp).then(displayTempEveryThreeHours);
  }
  
  function getApiLocation(position) {
    //console.log(position.coords.latitude);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    let apiKey = "ac3c02e9439b2a5f701addd7d8527168";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    //console.log(apiUrl);
    axios.get(apiUrl).then(displayCurrentLocation);
  }
  
  function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getApiLocation);
  }
  
  let locationButton = document.querySelector("#location-button");
  locationButton.addEventListener("click", getLocation);

