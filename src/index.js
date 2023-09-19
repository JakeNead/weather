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
const unitToggle = document.querySelector("#unitToggle");

let units = "f";
let currentWeather;

async function fetchWeatherObj(input) {
  const api = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=f8f39e42a5384acc86121758230509&q=${input}&aqi=no`,
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
  if (units === "f") {
    temp.textContent = `Temperature: ${obj.tempF} °F`;
    wind.textContent = `Wind speed: ${obj.windMph} mph`;
  } else {
    temp.textContent = `Temperature: ${obj.tempC} °C`;
    wind.textContent = `Wind speed: ${obj.windKph} kph`;
  }
};

async function updateWeather(input) {
  try {
    const weatherObj = await fetchWeatherObj(input);
    const parsedInfo = await parseWeatherInfo(weatherObj);
    currentWeather = parsedInfo;
    updateDom(parsedInfo);
  } catch (error) {
    console.log(error);
    searchError.classList.add("visible");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchError.classList.remove("visible");
  updateWeather(search.value);
});

unitToggle.addEventListener("change", () => {
  console.log(unitToggle.checked);
  if (units === "f") {
    units = "c";
    updateDom(currentWeather);
  } else {
    units = "f";
    updateDom(currentWeather);
  }
});

updateWeather("bishop, california");
