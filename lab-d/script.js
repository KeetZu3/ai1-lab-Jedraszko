function getWeather() {
    const apiKey = '7ded80d91f2b280ec979100cc8bbba94';
    const addressInput = document.getElementById('addressInput').value;

    // Pobierz bieżącą pogodę
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${addressInput}&appid=${apiKey}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', currentWeatherUrl, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log('Odpowiedź API dla bieżącej pogody:', response);

            const currentWeatherDiv = document.getElementById('currentWeather');
            const temperatureCelsius = (response.main.temp - 273.15).toFixed(1);

            currentWeatherDiv.innerHTML = `
        <h2>Aktualna pogoda w ${addressInput}</h2>
        <p>${translateWeatherDescription(response.weather[0].description)}</p>
        <p>Temperatura: ${temperatureCelsius}°C</p>
        <p>Temperatura Odczuwalna: ${(response.main.feels_like - 273.15).toFixed(1)}°C</p>
        <img class="current-weather-icon" src="https://openweathermap.org/img/w/${response.weather[0].icon}.png" alt="${translateWeatherDescription(response.weather[0].description)}">
      `;
        } else {
            console.error('Błąd pobierania bieżącej pogody');
            const currentWeatherDiv = document.getElementById('currentWeather');
            currentWeatherDiv.innerHTML = `<p>Nie można pobrać danych dla ${addressInput}. Sprawdź poprawność wprowadzonej miejscowości.</p>`;
        }
    };

    xhr.send();

    // Pobierz prognozę 5-dniową z danymi co 3 godziny
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${addressInput}&appid=${apiKey}`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Odpowiedź API dla prognozy:', data);

            const forecastDiv = document.getElementById('forecast');
            forecastDiv.innerHTML = '<h2>Prognoza na 5 dni</h2>';

            data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const day = date.toLocaleDateString('pl-PL', { weekday: 'short' });
                const time = date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
                const temperature = (item.main.temp - 273.15).toFixed(1);
                const feelsLike = (item.main.feels_like - 273.15).toFixed(1);
                const weatherDescription = translateWeatherDescription(item.weather[0].description);

                forecastDiv.innerHTML += `
          <div class="forecast-tile">
            <p>${day}, ${time}</p>
            <p>Temperatura: ${temperature}°C</p>
            <p>Odczuwalna: ${feelsLike}°C</p>
            <p>${weatherDescription}</p>
          </div>
        `;
            });
        })
        .catch(error => {
            console.error('Błąd pobierania prognozy');
            const forecastDiv = document.getElementById('forecast');
            forecastDiv.innerHTML = `<p>Nie można pobrać prognozy dla ${addressInput}. Sprawdź poprawność wprowadzonej miejscowości.</p>`;
        });
}

function translateWeatherDescription(description) {
    const translations = {
        'Clear': 'Bezchmurnie',
        'Clouds': 'Zachmurzenie',
        'Drizzle': 'Mżawka',
        'Rain': 'Deszcz',
        'Snow': 'Śnieg',
        'Thunderstorm': 'Burza',
        'Mist': 'Mgła',
        'Smoke': 'Zadymienie',
        'Haze': 'Mgła',
        'Dust': 'Zapylenie',
        'Fog': 'Mgła',
        'Sand': 'Piaszczyste',
        'Ash': 'Popiół',
        'Squall': 'Szkwał',
        'Tornado': 'Tornado'
    };

    return translations[description] || description;
}
