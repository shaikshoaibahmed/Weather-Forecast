// script.js
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const cityInput = document.getElementById('city-input');
    const weatherResult = document.getElementById('weather-result');

    function displayWeather(data) {
        const { name, weather, main, wind } = data;
        const description = weather[0].description;
        const temperature = (main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius
        const windSpeed = wind.speed;

        const weatherHtml = `
            <div class="weather-info">
                <h3>${name}</h3>
                <p>Weather: ${description}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            </div>
        `;

        weatherResult.innerHTML = weatherHtml;
    }

    function displayError(message) {
        weatherResult.innerHTML = `<p class="error-message">${message}</p>`;
    }

    getWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();

        if (!city) {
            displayError("Please enter a city name.");
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod !== 200) {
                    displayError("City not found. Please try again.");
                } else {
                    displayWeather(data);
                }
            })
            .catch(() => {
                displayError("An error occurred. Please try again later.");
            });
    });

    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            getWeatherBtn.click();
        }
    });
});

