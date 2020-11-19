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
  function displayTemperature(response) {
    //console.log(response.data.main.temp);
    let temperature = Math.round(response.data.main.temp);
    let temperatureHtml = document.querySelector("#tempe");
    temperatureHtml.innerHTML = temperature;
  
    let description = response.data.weather[0].main;
    let descriptionHtml = document.querySelector("#description");
    descriptionHtml.innerHTML = `${description}`;
  
    //let precipitation = response.data.main.precipitation;
    //console.log(response.data);
    //let precipitationHtml = document.querySelector("#precipitation");
    //precipitationHtml.innerHTML = `Precipitation: ${precipitation}%`;
  
    let humidity = response.data.main.humidity;
    let humidityHtml = document.querySelector("#humidity");
    humidityHtml.innerHTML = `Humidity: ${humidity}%`;
  
    let wind = response.data.wind.speed;
    let windHtml = document.querySelector("#wind");
    windHtml.innerHTML = `Wind: ${wind}km/hr`;
  
    let sunrise = response.data.sys.sunrise;
    let sunriseHtml = document.querySelector("#sunrise");
    sunriseHtml.innerHTML = `Sunrise: ${sunrise}`;
  
    let sunset = response.data.sys.sunset;
    let sunsetHtml = document.querySelector("#sunset");
    sunsetHtml.innerHTML = `Sunset: ${sunset}`;
  
    //Figure out later what means the numbers in Sunrise and Sunset, and how to add precipitation.
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
  
    let temperature = Math.round(response.data.main.temp);
    let temperatureHtml = document.querySelector("#tempe");
    temperatureHtml.innerHTML = temperature;
  
    let description = response.data.weather[0].main;
    let descriptionHtml = document.querySelector("#description");
    descriptionHtml.innerHTML = `${description}`;
  
    //let precipitation = response.data.main.precipitation;
    //console.log(response.data);
    //let precipitationHtml = document.querySelector("#precipitation");
    //precipitationHtml.innerHTML = `Precipitation: ${precipitation}%`;
  
    let humidity = response.data.main.humidity;
    let humidityHtml = document.querySelector("#humidity");
    humidityHtml.innerHTML = `Humidity: ${humidity}%`;
  
    let wind = response.data.wind.speed;
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
  