//Global variables
let lon = null;
let lat = null;
let celsiusTemperature = null;
let min = null;
let max = null;
let apiKey = "ac3c02e9439b2a5f701addd7d8527168";

//Add Paris as the default city.
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);


function formatDate(time) {
  //Feature #1
  let dateFunc = new Date(time);

  let monthFunc = [
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
    "December"
  ];

  let month = monthFunc[dateFunc.getUTCMonth()];

  let date = dateFunc.getUTCDate();

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
  let currentDateFunc = `Last Updated: <br/> ${month}, ${date}. <br/> ${dayFunc}, ${dateHour}:${dateMinutes}`;
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
    return dayName;
  }
  
  //Feature 1
  
  //Convert from Celsius to Farenheit


  function converttoCelsius(fahr) {
    let celsius = Math.round((fahr - 32) * (5 / 9));
    return celsius;
  }
  
  function converttoFahrenheit(celsius) {
    let fahr = Math.round((celsius * 9) / 5 + 32);
    return fahr;
  }
  
  function displayCelsius(event) {
    event.preventDefault();
    let celsius = document.querySelector("#tempe");
    celsius.innerHTML = celsiusTemperature;

  
    let minFahr = document.querySelectorAll(".minimum");
    minFahr.forEach(function (min) {
      let minFahrHtml = parseInt(min.innerHTML, 10);
      let minCelsHtml = converttoCelsius(minFahrHtml);
      console.log(`The min Cels is: ${minCelsHtml}`);
      min.innerHTML = minCelsHtml;
    });
  
    let maxFahr = document.querySelectorAll(".maximum");
    maxFahr.forEach(function (max) {
      let maxFahrHtml = parseInt(max.innerHTML, 10);
      let maxCelsHtml = converttoCelsius(maxFahrHtml);
      console.log(`The min Cels is: ${maxCelsHtml}`);
      max.innerHTML = maxCelsHtml;
    });
  
    celsiusDegree.removeEventListener("click", displayCelsius);
    fahrenheitDegree.addEventListener("click", displayFahrenheit);
  
    celsiusDegree.classList.add("active");
    fahrenheitDegree.classList.remove("active");
  }
  
  let celsiusDegree = document.querySelector("#celsius");
  celsiusDegree.addEventListener("click", displayCelsius);
  
  function displayFahrenheit(event) {
    event.preventDefault();
    let fahr = converttoFahrenheit(celsiusTemperature);
    let fahrenh = document.querySelector("#tempe");
    fahrenh.innerHTML = fahr;
  
    let minCels = document.querySelectorAll(".minimum");
    minCels.forEach(function (min) {
      let minCelsHtml = parseInt(min.innerHTML, 10);
      let minFahrHtml = converttoFahrenheit(minCelsHtml);
      console.log(`The min FAHR is: ${minFahrHtml}`);
      min.innerHTML = minFahrHtml;
    });
  
    let maxCels = document.querySelectorAll(".maximum");
    maxCels.forEach(function (max) {
      let maxCelsHtml = parseInt(max.innerHTML, 10);
      let maxFahrHtml = converttoFahrenheit(maxCelsHtml);
      console.log(`The min FAHR is: ${maxFahrHtml}`);
      max.innerHTML = maxFahrHtml;
    });
  
    celsiusDegree.addEventListener("click", displayCelsius); //Add eventListener because I removed it before in displayCelsius, so I have to add it again.
    fahrenheitDegree.removeEventListener("click", displayFahrenheit); //Remove event listener so that it doesn't keep overriding the html with the convertToFarenheit function.
  

    fahrenheitDegree.classList.add("active");
    celsiusDegree.classList.remove("active");
  }
  
  let fahrenheitDegree = document.querySelector("#fahrenheit");
  fahrenheitDegree.addEventListener("click", displayFahrenheit);
  
  
//Get API and change inner HTML

//Forecast 

function displayTempEveryThreeHours(response) {
  let detailedInfoTitle = document.querySelector(".weather-throughout-the-day");
  detailedInfoTitle.innerHTML = "Temperature";
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

    forecastHtml.innerHTML += `
    <div class="col-xl-2 col-2" id="col-temp">
  <br/>
  <span> ${hour} </span>
  <br/>
  <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon" width = "70%">
  <br/>
  <div class="degree">
  <span class="smaller-numbers maximum"> ${max}°</span>|<span class="smaller-numbers minimum">${min}° </span>
  </div>
  </div>
  `;
  }
}

function displayWindEveryThreeHours(response) {
  let detailedInfoTitle = document.querySelector(".weather-throughout-the-day");
  detailedInfoTitle.innerHTML = "Wind";
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
  <div class="col-xl-2 col-2">
  <br/>
  <span> ${hour} </span>
  <br/>
  <br/>
  <span> ${degree}° </span>
  <br/>
  <br/>
  <div class="degree">
  <span class="smaller-numbers"> ${wind}km/hr </span>
  </div>
  </div>
  `;
  }
}

function displayHumidityEveryThreeHours(response) {
  let detailedInfoTitle = document.querySelector(".weather-throughout-the-day");
  detailedInfoTitle.innerHTML = "Humidity";
  let forecastHtml = document.querySelector("#detailed-information");
  forecastHtml.innerHTML = null;
  let detailedInformation = null;

  for (let index = 0; index < 8; index++) {
    detailedInformation = response.data.list[index];
    let dt = detailedInformation.dt + response.data.city.timezone;
    let hour = convertDtToHours(dt);
    let humidity = detailedInformation.main.humidity;

    forecastHtml.innerHTML += `
    <div class="col-xl-2 col-2">
  <br/>
  <span> ${hour} </span>
  <br/>
  
  <br/>
  <div class="degree">
  <span> ${humidity}% </span>
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
  <div class="col-xl-1.5 col-2">
  <br/>
  <span> ${day} </span>
  <br/>
  <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon" width = "70%">
  <br/>
  <div class="degree">
  <span class="smaller-numbers maximum"> ${max}°</span>|<span class="smaller-numbers minimum">${min}° </span>
  </div>
  </div>
  `;
}
}

  function displayTemperature(response) {

    let enterCity = document.querySelector(".city");
    let city = response.data.name;
    enterCity.innerHTML = city;
    
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
    iconHtml.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconWeather}@2x.png" alt="weather-icon" width = "50%">` ;

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

  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(readForecast);

  let apiUrlThreeHoursTemp = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlThreeHoursTemp).then(displayTempEveryThreeHours);

  }
  
  function changeCityName(event) {
    event.preventDefault();
    let currentCity = document.querySelector("#enter-city");
    let city = currentCity.value;
  
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

  //Call API for every city
function caracas(event) {
  event.preventDefault();
  let city = "Caracas";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
 
}

function nashville(event) {
  event.preventDefault();
  let city = "Nashville";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function nairobi(event) {
  event.preventDefault();
  let city = "Nairobi";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function tokyo(event) {
  event.preventDefault();
  let city = "Tokyo";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function madrid(event) {
  event.preventDefault();
  let city = "Madrid";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function fiji(event) {
  event.preventDefault();
  let city = "Fiji";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
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

  //Event Listeners for specific cities.

  let caracasClick = document.querySelector("#Caracas");
  caracasClick.addEventListener("click", caracas);

  let nashvilleClick = document.querySelector("#Nashville");
  nashvilleClick.addEventListener("click", nashville);

  let nairobiClick = document.querySelector("#Nairobi");
  nairobiClick.addEventListener("click", nairobi);

  let tokyoClick = document.querySelector("#Tokyo");
  tokyoClick.addEventListener("click", tokyo);

  let madridClick = document.querySelector("#Madrid");
  madridClick.addEventListener("click", madrid);

  let fijiClick = document.querySelector("#Fiji");
  fijiClick.addEventListener("click", fiji);
  
  //Bonus Feature
  function displayCurrentLocation(response) {

    let date = response.data.dt + response.data.timezone;
    let time = document.querySelector(".current-day-and-time");
    time.innerHTML = formatDate(date * 1000);

    let currentPlace = response.data.name;
    let enterCity = document.querySelector(".city");
    enterCity.innerHTML = `You are <br> in <br> <strong> ${currentPlace} </strong>`;
  
    celsiusTemperature = Math.round(response.data.main.temp);
    let temperatureHtml = document.querySelector("#tempe");
    temperatureHtml.innerHTML = celsiusTemperature;
  
    let description = response.data.weather[0].description;
    let descriptionHtml = document.querySelector("#description");
    descriptionHtml.innerHTML = `${description}`;

    let iconWeather = response.data.weather[0].icon;
    let iconHtml = document.querySelector("#icon");
    iconHtml.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconWeather}@2x.png" alt="weather-icon" width = "50%">` ;
  
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

    lat = position.coords.latitude;
    lon = position.coords.longitude;
    let apiKey = "ac3c02e9439b2a5f701addd7d8527168";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayCurrentLocation);
  }
  
  function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getApiLocation);
  }
  
  let locationButton = document.querySelector("#location-button");
  locationButton.addEventListener("click", getLocation);

