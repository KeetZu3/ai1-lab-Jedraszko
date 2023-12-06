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
            currentWeatherDiv.innerHTML = `
        <p>Bieżąca pogoda w ${addressInput}: ${response.weather[0].description}</p>
        <img class="current-weather-icon" src="https://openweathermap.org/img/w/${response.weather[0].icon}.png" alt="${response.weather[0].description}">
      `;
        } else {
            console.error('Błąd pobierania bieżącej pogody');
            const currentWeatherDiv = document.getElementById('currentWeather');
            currentWeatherDiv.innerHTML = `<p>Nie można pobrać danych dla ${addressInput}. Sprawdź poprawność wprowadzonej miejscowości.</p>`;
        }
    };

    xhr.send();

    // Pobierz prognozę 5-dniową
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${addressInput}&appid=${apiKey}`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Odpowiedź API dla prognozy:', data);

            const forecastDiv = document.getElementById('forecast');
            forecastDiv.innerHTML = '<p>Prognoza na 5 dni:</p>';

            data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const day = date.toLocaleDateString('en-US', { weekday: 'short' });

                forecastDiv.innerHTML += `
          <div class="forecast-day">
            <img class="weather-icon" src="https://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
            <div class="forecast-details">
              <p>${day}: ${item.weather[0].description}</p>
            </div>
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
