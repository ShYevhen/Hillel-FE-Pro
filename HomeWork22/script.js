const ICON_LINK = "https://openweathermap.org/img/wn/{{iconCode}}@2x.png";
const WEATHER_LINK = "https://api.openweathermap.org/data/2.5/weather?q={{cityName}}&appid={{apiKey}}&units=metric";
let mainContainer;

document.addEventListener("DOMContentLoaded", initConfiguration);

function initConfiguration() {
    mainContainer = document.querySelector(".mainContainer");
    const btn = document.querySelector(".header button");
    btn.addEventListener("click", obtainWeather);
    obtainWeather();
}

function obtainWeather() {
    const inputEl = document.querySelector(".header input");
    let cityName = inputEl.value.trim();
    if (!isValidInput(cityName)) {
        console.error("Wrong city name");
        return;
    }
    inputEl.value = "";
    fetchWeather(WEATHER_LINK.replace("{{cityName}}", cityName).replace("{{apiKey}}", 'youApiKey'));
}

function isValidInput(cityName) {
    return cityName.length > 1;
}

function fetchWeather(weatherLink) {
    fetch(weatherLink)
        .then((resp) => resp.json())
        .then((data) => processWeatherResult(data))
        .catch((error) => console.error(error));
}

function processWeatherResult(data) {
    if (data.cod !== 200) {
        throw Error(data.message);
    }
    mainContainer.classList.remove("hidden");
    for (let child_i of mainContainer.children) {
        if (child_i.id === "details") {
            processDetails(child_i.firstElementChild.children, data);
        } else if (child_i.classList.contains("mainRight")) {
            processMain(child_i.children, data);
        }
    }
}

function processDetails(nodeList, data) {
    for (let child_i of nodeList) {
        if (child_i.nodeName.toLowerCase() === "dd") {
            setValueToNode(child_i, data);
        }
    }
}

function setValueToNode(node, data) {
    if (node.id === "city") {
        node.textContent = data.name;
    } else if (node.id === "country") {
        node.textContent = data.sys.country;
    } else if (node.id === "wind") {
        node.textContent = data.wind.speed;
    } else if (node.id === "cloudines") {
        node.textContent = data.clouds.all;
    } else if (node.id === "humidity") {
        node.textContent = data.main.humidity;
    } else if (node.id === "pressure") {
        node.textContent = data.main.pressure;
    } else if (node.id === "weather") {
        node.textContent = data.weather[0].main;
    } else if (node.id === "temp") {
        node.innerHTML = Math.round(+data.main.temp) + "<sup>o</sup>C";
    } else if (node.nodeName.toLowerCase() === "img") {
        node.setAttribute("src", ICON_LINK.replace("{{iconCode}}", data.weather[0].icon));
    }
}

function processMain(nodeList, data) {
    for (let child_i of nodeList) {
        if (child_i.id === "weather" || child_i.id === "temp") {
            setValueToNode(child_i, data);
        } else if (child_i.classList.contains("todayIcon")) {
            setValueToNode(child_i.firstElementChild.firstElementChild, data);
        }
    }
}
