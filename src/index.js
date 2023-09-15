import initPage from "./init";
import "./style.css";

initPage();

const form = document.querySelector("form");
const search = document.querySelector("#search");
const location = document.querySelector("#location");
const condition = document.querySelector("#condition");
const temp = document.querySelector("#temp");
const wind = document.querySelector("#wind");
const searchError = document.querySelector(".searchError");

async function fetchWeatherObj(input) {
  const api = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=f8f39e42a5384acc86121758230509&q=${input}&aqi=no`,
    { mode: "cors" },
  );
  return api.json();
}

const parseWeatherInfo = async (obj) => ({
  location: `${obj.location.name}, ${obj.location.region}`,
  tempC: obj.current.temp_c,
  tempF: obj.current.temp_f,
  condition: obj.current.condition.text,
  windMph: obj.current.wind_mph,
  windKph: obj.current.wind_kph,
});

const updateDom = (obj) => {
  location.textContent = obj.location;
  condition.textContent = obj.condition;
  temp.textContent = obj.tempF;
  wind.textContent = obj.windMph;
};

async function updateWeather(input) {
  try {
    const weatherObj = await fetchWeatherObj(input);
    const parsedInfo = await parseWeatherInfo(weatherObj);
    updateDom(parsedInfo);
  } catch (error) {
    console.log(error);
    searchError.classList.add("visible");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(searchError.classList);
  searchError.classList.remove("visible");
  updateWeather(search.value);
});

updateWeather("estacada, oregon");

// create mph/kph/c/f conversion button
//   add a button?
//   store current search in variable?
// catch error notification, and stop process
