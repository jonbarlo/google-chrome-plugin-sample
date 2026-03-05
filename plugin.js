// WMO weather codes → short description (Open-Meteo uses these)
const WEATHER_LABELS = {
  0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Depositing rime fog',
  51: 'Light drizzle', 53: 'Drizzle', 55: 'Dense drizzle',
  61: 'Slight rain', 63: 'Rain', 65: 'Heavy rain',
  71: 'Slight snow', 73: 'Snow', 75: 'Heavy snow',
  80: 'Slight showers', 81: 'Showers', 82: 'Violent showers',
  95: 'Thunderstorm', 96: 'Thunderstorm + hail', 99: 'Thunderstorm + heavy hail'
};

function getWeatherLabel(code) {
  return WEATHER_LABELS[code] ?? `Code ${code}`;
}

async function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m'
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function getBrowserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err),
      { timeout: 10000, maximumAge: 300000 }
    );
  });
}

const FALLBACK_LAT = 9.93;
const FALLBACK_LON = -84.08;

function setStateMessage(message, isError = false) {
  const el = document.getElementById('weatherStateMessage');
  const state = document.getElementById('weatherState');
  el.textContent = message;
  state.classList.toggle('error', isError);
}

function showResult(data, usedFallback) {
  const widget = document.getElementById('weatherWidget');
  const cur = data.current;
  const units = data.current_units || {};

  document.getElementById('weatherCondition').textContent = getWeatherLabel(cur.weather_code);
  document.getElementById('weatherTemp').innerHTML =
    `${Math.round(cur.temperature_2m)}<span class="weather-temp-unit">${units.temperature_2m || '°C'}</span>`;
  document.getElementById('weatherHumidity').textContent = `${cur.relative_humidity_2m}%`;
  document.getElementById('weatherWind').textContent =
    `${cur.wind_speed_10m} ${units.wind_speed_10m || 'km/h'}`;

  const fallbackNote = document.getElementById('weatherFallbackNote');
  fallbackNote.classList.toggle('show', !!usedFallback);

  widget.classList.add('has-result');
}

function showError(message) {
  setStateMessage(message, true);
  document.getElementById('weatherWidget').classList.remove('has-result');
}

document.getElementById('callApi').addEventListener('click', async () => {
  const btn = document.getElementById('callApi');
  btn.disabled = true;
  setStateMessage('Getting location…', false);

  try {
    let lat, lon, usedFallback = false;
    try {
      const loc = await getBrowserLocation();
      lat = loc.lat;
      lon = loc.lon;
    } catch (e) {
      usedFallback = true;
      lat = FALLBACK_LAT;
      lon = FALLBACK_LON;
    }

    setStateMessage('Loading…', false);
    const data = await fetchWeather(lat, lon);
    showResult(data, usedFallback);
  } catch (err) {
    showError(err.message || 'Something went wrong');
  } finally {
    btn.disabled = false;
  }
});
