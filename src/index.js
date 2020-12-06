let lon = null;
let lat = null;
let apiKey = "ac3c02e9439b2a5f701addd7d8527168";

function formatDate(dateFunc) {
    //Feature #1
  
    let daysFunc = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let dayFunc = daysFunc[dateFunc.getDay()];
  
    let dateHour = dateFunc.getHours();
    if (dateHour < 10) {
      dateHour = `0${dateHour}`;
    }
    let dateMinutes = dateFunc.getMinutes();
    if (dateMinutes < 10) {
      dateMinutes = `0${dateMinutes}`;
    }
    let currentDateFunc = ` ${dayFunc}, ${dateHour}:${dateMinutes}`;
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

  let celsiusTemperature = null;

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
    //console.log(response.data.main.temp);

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
  
    //Figure out later what means the numbers in Sunrise and Sunset, and how to add precipitation.

  //Forecast
  lon = response.data.coord.lon;
  lat = response.data.coord.lat;
  console.log(lon);
  console.log(lat);

  let apiKey = "ac3c02e9439b2a5f701addd7d8527168";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(readForecast);

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
  let changeCity = document.querySelector("#submit-city");
  changeCity.addEventListener("submit", changeCityName);
  
  //Bonus Feature
  function displayCurrentLocation(response) {
    console.log(lon,lat);
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

