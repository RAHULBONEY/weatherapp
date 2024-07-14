const button = document.getElementById('search-button');
const input = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemp = document.getElementById('city-temp');

async function getData(city) {
    const resq = await fetch(`http://api.weatherapi.com/v1/current.json?key=a63c483d7bf34a0aa76145525241407&q=${city}&aqi=yes`);
    return await resq.json();
}

async function updateWeather(city) {
    const result = await getData(city);
    cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
    cityTime.innerText = result.location.localtime;
    cityTemp.innerText = `${result.current.temp_c}°C`;
}

button.addEventListener("click", async () => {
    const value = input.value;
    await updateWeather(value);
});

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const result = await getData(`${lat},${lon}`);
            cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
            cityTime.innerText = result.location.localtime;
            cityTemp.innerText = `${result.current.temp_c}°C`;
        }, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

window.onload = getLocation;
