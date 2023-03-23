// Get Data
// Variable to store Element
// Function to get Data from Weather API
// Manipulate the variable of already created element 


let data;

const inputBox = document.getElementById("inputBox");
const stateName = document.getElementById("stateName");
const cityName = document.getElementById("cityName");
const humidity = document.getElementById("humidity");
const temprature = document.getElementById("temprature");
const logoImage = document.getElementById("logoImage");
const weatherStatus = document.getElementById("weatherStatus");
const updateTime = document.getElementById("updatetime");
const feelsLike = document.getElementById("feelslike");
const wind = document.getElementById("wind");
const barometer = document.getElementById("barometer");
const moderate = document.getElementById("moderate");
const dewPoint = document.getElementById("dewPoint");
const qIndex = document.getElementById("qIndex");
const bodyImage = document.querySelector("body");

const getData = async (event) => {
  event.preventDefault();

  if (!inputBox.value) {
    alert("Please Enter Your City Name");
    return;
  }

  const city = inputBox.value;

  const fetchApi = await fetch(`
      https://api.weatherapi.com/v1/current.json?key=75bb658e74af4d398f644110230703&q=${city}&aqi=yes`
  );

  const orgData = await fetchApi.json();
  data = orgData;

  stateName.innerHTML = data.location.region;
  cityName.innerHTML = `${data.location.name},`;
  humidity.innerHTML = data.current.condition.text;
  temprature.innerHTML = data.current.temp_c;
  logoImage.src = data.current.condition.icon;
  weatherStatus.innerHTML = data.current.condition.text;
  updateTime.innerHTML = `last updated as of ${data.current.last_updated}`;
  feelsLike.innerHTML = `Feels Like ${data.current.feelslike_c}`;
  wind.innerHTML = `Wind < ${data.current.wind_kph}`;
  barometer.innerHTML = `Barometer ${data.current.pressure_mb}`;
  dewPoint.innerHTML = `Dew Point ${data.current.dewpoint_c}`;
  bodyImage.style.backgroundImage = data.current.condition.code;

  let severity = "";
  if (data.current.temp_c > 30 || data.current.feelslike_c > 30){
    severity = 'Bad';
  }else if (data.current.wind_kph > 30){
    severity = 'Bad';
  }else if( data.current.precip_mm > 10){
    severity = 'Low';
  }else {
    severity = 'Good';
  }
  
  moderate.innerHTML = `Severity ${severity} Air Quality`;



  if (data.current.condition.code >= 1000 && data.current.condition.code === 1000) {
    bodyImage.style.backgroundImage = "url('./assets/Sunny.jpg')";
    setTimeout(() => {
      alert("Sunny Weather");;
    }, "1000");
  } else if (data.current.condition.code >= 1003 && data.current.condition.code <= 1009) {
    bodyImage.style.backgroundImage = "url('./assets/Cloudy.jpg')";
    setTimeout(() => {
      alert("Cloudy Weather");
    }, "1000");
  } else if (data.current.condition.code >= 1030 && data.current.condition.code <= 1063) {
    bodyImage.style.backgroundImage = "url('./assets/Rainy.jpg')";
    setTimeout(() => {
      alert("Cloudy Weather");
    }, "1000");
  } else if (data.current.condition.code >= 1066 && data.current.condition.code <= 1171) {
    bodyImage.style.backgroundImage = "url('./assets/Snow.jpg')";
    setTimeout(() => {
      alert("Snowy Weather");
    }, "1000");

  }else if (data.current.condition.code >= 1180 && data.current.condition.code <= 1201) {
    bodyImage.style.backgroundImage = "url('./assets/Rainy.jpg')";
    setTimeout(() => {
      alert("Moderate or heavy freezing rain")
    }, "1000");
  }else if (data.current.condition.code >= 1204 && data.current.condition.code <= 1237) {
    bodyImage.style.backgroundImage = "url('./assets/Snow.jpg')";
    setTimeout(() => {
      alert("Moderate or heavy sleet")
    }, "1000");
  }else if (data.current.condition.code >= 1240 && data.current.condition.code <= 1246) {
    bodyImage.style.backgroundImage = "url('./assets/Rainy.jpg')";
    setTimeout(() => {
      alert("Moderate or heavy freezing rain")
  }, "1000");
  }else if (data.current.condition.code >= 1249 && data.current.condition.code <= 1264) {
    bodyImage.style.backgroundImage = "url('./assets/Snow.jpg')";
    setTimeout(() => {
      alert("Moderate or heavy showers of ice pellets")
  }, "1000");
  }else if (data.current.condition.code >= 1273 && data.current.condition.code <= 1282) {
    bodyImage.style.backgroundImage = "url('./assets/Thunder.jpg')";
    setTimeout(() => {
      alert("Patchy light rain with thunder")
  }, "1000");
  }
  

  let roundQIndex = Math.round(data.current.air_quality.pm2_5);
  qIndex.innerHTML = `Air Quality Index ${roundQIndex}`;

  if (roundQIndex >= 0 && roundQIndex <= 50) {
    qIndex.style.backgroundColor = "green";
  } else if (roundQIndex >= 51 && roundQIndex <= 100) {
    qIndex.style.backgroundColor = "yellow";
  } else if (roundQIndex >= 101 && roundQIndex <= 150) {
    qIndex.style.backgroundColor = "orange";
  } else if (roundQIndex >= 151 && roundQIndex <= 200) {
    qIndex.style.backgroundColor = "red";
  } else if (roundQIndex >= 201 && roundQIndex <= 300) {
    qIndex.style.backgroundColor = "purple";
  } else if (roundQIndex > 300) {
    qIndex.style.backgroundColor = "maroon";
  }

}

const refreshBtn = document.getElementById("refreshBtn")
refreshBtn.addEventListener('click', () => {
  location.reload();
});
