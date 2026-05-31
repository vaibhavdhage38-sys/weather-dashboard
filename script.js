// Weather Dashboard JavaScript

// API Configuration
const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Get from https://openweathermap.org/api
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const errorMsg = document.getElementById('errorMsg');
const cityName = document.getElementById('cityName');
const date = document.getElementById('date');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const visibility = document.getElementById('visibility');
const pressure = document.getElementById('pressure');
const feelsLike = document.getElementById('feelsLike');
const uvIndex = document.getElementById('uvIndex');
const forecastCards = document.getElementById('forecastCards');
const recentList = document.getElementById('recentList');

// State Management
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        searchWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            searchWeather(city);
        }
    }
});

locationBtn.addEventListener('click', () => {
    getLocationWeather();
});

// Load weather on page load
window.addEventListener('load', () => {
    updateRecentSearches();
    // Try to load last searched city or default city
    const lastCity = localStorage.getItem('lastCity') || 'London';
    searchWeather(lastCity);
});

/**
 * Search weather by city name
 */
async function searchWeather(city) {
    try {
        clearError();
        showLoading();

        // Get coordinates from city name
        const geoResponse = await fetch(`${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`);
        
        if (!geoResponse.ok) {
            throw new Error('City not found');
        }

        const geoData = await geoResponse.json();
        if (geoData.length === 0) {
            throw new Error('City not found');
        }

        const { lat, lon, name, state, country } = geoData[0];
        
        // Fetch weather data
        await fetchWeatherData(lat, lon, name, state, country);
        
        // Save to recent searches
        addToRecentSearches(name);
        localStorage.setItem('lastCity', name);
        
    } catch (error) {
        showError(error.message || 'Failed to fetch weather data');
        console.error('Error:', error);
    }
}

/**
 * Get weather using geolocation
 */
async function getLocationWeather() {
    try {
        clearError();
        showLoading();

        if (!navigator.geolocation) {
            throw new Error('Geolocation is not supported by your browser');
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                // Reverse geocoding to get city name
                try {
                    const geoResponse = await fetch(
                        `${GEO_URL}/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
                    );
                    
                    const geoData = await geoResponse.json();
                    const city = geoData[0]?.name || 'Current Location';
                    const state = geoData[0]?.state || '';
                    const country = geoData[0]?.country || '';
                    
                    await fetchWeatherData(latitude, longitude, city, state, country);
                    addToRecentSearches(city);
                } catch (error) {
                    await fetchWeatherData(latitude, longitude, 'Your Location', '', '');
                }
            },
            (error) => {
                showError('Unable to access your location. ' + error.message);
                console.error('Geolocation error:', error);
            }
        );
    } catch (error) {
        showError(error.message);
        console.error('Error:', error);
    }
}

/**
 * Fetch weather data from API
 */
async function fetchWeatherData(lat, lon, name, state, country) {
    try {
        // Current weather
        const currentResponse = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        
        // Forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        // UV Index
        const uvResponse = await fetch(
            `${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        const uvData = await uvResponse.json();

        // Update UI with weather data
        updateCurrentWeather(currentData, name, state, country);
        updateForecast(forecastData);
        
        // Update UV Index if available
        if (uvData.value !== undefined) {
            uvIndex.textContent = Math.round(uvData.value);
        }

        hideLoading();
        clearError();

    } catch (error) {
        showError(error.message || 'Failed to fetch weather data');
        console.error('Error:', error);
        hideLoading();
    }
}

/**
 * Update current weather display
 */
function updateCurrentWeather(data, name, state, country) {
    // City name
    const statePart = state ? `, ${state}` : '';
    cityName.textContent = `${name}${statePart}, ${country}`;

    // Date
    const now = new Date();
    date.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    weatherIcon.alt = data.weather[0].description;

    // Temperature and description
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;

    // Details
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
    visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    pressure.textContent = `${data.main.pressure} hPa`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
}

/**
 * Update 5-day forecast display
 */
function updateForecast(data) {
    // Get forecast for every 24 hours (API returns data every 3 hours)
    const dailyForecasts = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
        }
    });

    // Convert to array and get first 5 days
    const forecasts = Object.values(dailyForecasts).slice(0, 5);

    forecastCards.innerHTML = forecasts.map(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        const dayName = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
        const dateStr = forecastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const iconCode = forecast.weather[0].icon;
        const temp = Math.round(forecast.main.temp);
        const desc = forecast.weather[0].description;

        return `
            <div class="forecast-card">
                <div class="forecast-date">${dayName}, ${dateStr}</div>
                <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" 
                     alt="${desc}" class="forecast-icon">
                <div class="forecast-temp">${temp}°C</div>
                <div class="forecast-desc">${desc}</div>
            </div>
        `;
    }).join('');
}

/**
 * Add city to recent searches
 */
function addToRecentSearches(city) {
    // Remove duplicates and keep unique searches
    recentSearches = recentSearches.filter(c => c !== city);
    recentSearches.unshift(city);
    
    // Keep only last 5 searches
    if (recentSearches.length > 5) {
        recentSearches.pop();
    }

    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    updateRecentSearches();
}

/**
 * Update recent searches display
 */
function updateRecentSearches() {
    if (recentSearches.length === 0) {
        recentList.innerHTML = '<p class="no-recent">No recent searches</p>';
        return;
    }

    recentList.innerHTML = recentSearches.map(city => `
        <div class="recent-item" onclick="searchWeather('${city}')">
            ${city}
        </div>
    `).join('');
}

/**
 * Show error message
 */
function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.add('show');
}

/**
 * Clear error message
 */
function clearError() {
    errorMsg.classList.remove('show');
    errorMsg.textContent = '';
}

/**
 * Show loading state
 */
function showLoading() {
    document.querySelector('.current-weather').classList.add('loading');
}

/**
 * Hide loading state
 */
function hideLoading() {
    document.querySelector('.current-weather').classList.remove('loading');
}

/**
 * Format temperature based on user preference (can be extended)
 */
function formatTemperature(celsius, unit = 'C') {
    if (unit === 'F') {
        return Math.round((celsius * 9/5) + 32) + '°F';
    }
    return Math.round(celsius) + '°C';
}
