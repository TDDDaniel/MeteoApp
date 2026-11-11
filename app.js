// ===== Pagina principală: formularul de căutare =====

// Locul din pagină unde afișăm vremea.
const weatherResult = document.getElementById("weather-result");

// Se execută când utilizatorul trimite formularul (click pe „Vezi vremea” sau tasta Enter).
async function handleFormSubmit(event) {
    // Oprim comportamentul implicit al formularului: reîncărcarea paginii.
    event.preventDefault();

    const city = document.getElementById("city").value;

    // 1. Căutăm orașul ca să aflăm unde se află (latitudine și longitudine).
    const placeResponse = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city);
    const placeData = await placeResponse.json();
    const place = placeData.results[0]; // primul oraș găsit

    // 2. Cerem vremea de acum pentru acele coordonate.
    const weatherUrl = "https://api.open-meteo.com/v1/forecast"
        + "?latitude=" + place.latitude
        + "&longitude=" + place.longitude
        + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m";
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    const weather = weatherData.current;

    // 3. Afișăm rezultatul în pagină.
    weatherResult.innerHTML =
        "<h3>" + place.name + "</h3>" +
        "<p>Temperatură: " + weather.temperature_2m + " °C</p>" +
        "<p>Umiditate: " + weather.relative_humidity_2m + "%</p>" +
        "<p>Vânt: " + weather.wind_speed_10m + " km/h</p>";
}

// ===== Pornirea aplicației =====

const locationForm = document.getElementById("location-form");
locationForm.addEventListener("submit", handleFormSubmit);
