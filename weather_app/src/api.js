// Frontend client for our own serverless API (which proxies OpenWeather).
// The browser never sees the OpenWeather API key.
import { DEMO_LOCATIONS, DEMO_WEATHER } from "./demoData";

export { DEMO_HOME_LOCATION } from "./demoData";

const DEMO_FLAG_VALUES = new Set(["1", "true", "yes", "on"]);
const COORD_TOLERANCE = 0.01;
const MPH_PER_METER_PER_SECOND = 2.236936;

export function isDemoMode() {
  return DEMO_FLAG_VALUES.has(String(import.meta.env.VITE_DEMO_MODE).toLowerCase());
}

function clone(data) {
  return structuredClone(data);
}

function celsiusToFahrenheit(value) {
  return (value * 9) / 5 + 32;
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function searchableLocation(place) {
  return [place.name, place.state, place.country].join(" ").toLowerCase();
}

function isSameCoord(value, expected) {
  return Math.abs(Number(value) - expected) < COORD_TOLERANCE;
}

function findDemoWeather({ lat, lon, q }) {
  const query = normalize(q);
  const weather = query
    ? DEMO_WEATHER.find((item) => normalize(item.name) === query)
    : DEMO_WEATHER.find(
        (item) => isSameCoord(lat, item.coord.lat) && isSameCoord(lon, item.coord.lon)
      );

  if (!weather) {
    throw new Error("Demo weather is not available for this location.");
  }
  return weather;
}

function withDemoUnits(weather, units) {
  const data = clone(weather);
  if (units !== "imperial") return data;

  data.main.temp = celsiusToFahrenheit(data.main.temp);
  data.main.feels_like = celsiusToFahrenheit(data.main.feels_like);
  data.main.temp_min = celsiusToFahrenheit(data.main.temp_min);
  data.main.temp_max = celsiusToFahrenheit(data.main.temp_max);
  data.wind.speed *= MPH_PER_METER_PER_SECOND;
  return data;
}

function searchDemoLocations(q, limit) {
  const query = normalize(q);
  const results = DEMO_LOCATIONS.filter((place) => searchableLocation(place).includes(query));
  return clone(results.slice(0, limit));
}

async function get(path, params) {
  const url = new URL(path, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message = data?.error || `Request failed (${res.status})`;
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }
  return data;
}

// Options are passed as an object so the optional `units` / `lang` pair cannot
// be mixed up positionally. `lang` asks OpenWeather to localise the weather
// description itself.
export async function getWeatherByCoords(lat, lon, { units = "metric", lang } = {}) {
  if (isDemoMode()) {
    return withDemoUnits(findDemoWeather({ lat, lon }), units);
  }
  return get("/api/weather", { lat, lon, units, lang });
}

export async function getWeatherByQuery(q, { units = "metric", lang } = {}) {
  if (isDemoMode()) {
    return withDemoUnits(findDemoWeather({ q }), units);
  }
  return get("/api/weather", { q, units, lang });
}

export async function searchLocations(q, limit = 5) {
  if (isDemoMode()) {
    return searchDemoLocations(q, limit);
  }
  return get("/api/geocode", { q, limit });
}
