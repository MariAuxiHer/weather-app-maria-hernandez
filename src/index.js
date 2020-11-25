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
  //Get days
  console.log(response);
  let dt = null;
  for (let index = 0; index < 8; index++) {
    dt = response.data.daily[index].dt;
    console.log(dt);

    //Convert dt to days
    var allDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = new Date(dt * 1000); // to get the DateTime.
    let dayName = allDays[day.getDay()]; // It will give day index, and based on index we can get day name from the array.
    console.log(dayName);
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
  
    let sunrise = response.data.sys.sunrise;
    let sunriseHtml = document.querySelector("#sunrise");
    sunriseHtml.innerHTML = `Sunrise: ${sunrise}`;
  
    let sunset = response.data.sys.sunset;
    let sunsetHtml = document.querySelector("#sunset");
    sunsetHtml.innerHTML = `Sunset: ${sunset}`;
  
    //Figure out later what means the numbers in Sunrise and Sunset, and how to add precipitation.

    //Forecast
  let lon = response.data.coord.lon;
  let lat = response.data.coord.lat;
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
  
    let sunrise = response.data.sys.sunrise;
    let sunriseHtml = document.querySelector("#sunrise");
    sunriseHtml.innerHTML = `Sunrise: ${sunrise}`;
  
    let sunset = response.data.sys.sunset;
    let sunsetHtml = document.querySelector("#sunset");
    sunsetHtml.innerHTML = `Sunset: ${sunset}`;
  }
  
  function getApiLocation(position) {
    //console.log(position.coords.latitude);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
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

