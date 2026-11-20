export type WeatherLocation = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type WeatherData = {
  location: WeatherLocation;
  current: {
    temperature: number;
    apparentTemperature: number;
    weatherCode: number;
    windSpeed: number;
    precipitation: number;
  };
  hourly: Array<{
    time: string;
    temperature: number;
    weatherCode: number;
    precipitationProbability: number;
  }>;
  daily: Array<{
    date: string;
    min: number;
    max: number;
    weatherCode: number;
    windSpeed: number;
    precipitationProbability: number;
  }>;
  sunrise: string;
  sunset: string;
};

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export async function searchCities(query: string): Promise<WeatherLocation[]> {
  if (query.trim().length < 2) return [];

  const params = new URLSearchParams({
    name: query.trim(),
    count: '8',
    language: 'uk',
    format: 'json',
  });

  const response = await fetch(`${GEOCODING_URL}?${params}`);

  if (!response.ok) {
    throw new Error('Не вдалося знайти місто');
  }

  const data = await response.json();

  return (data.results ?? []).map(
    (city: {
      id: number;
      name: string;
      country: string;
      latitude: number;
      longitude: number;
    }) => ({
      id: city.id,
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    }),
  );
}

export async function getWeather(
  latitude: number,
  longitude: number,
  location: WeatherLocation,
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    timezone: 'auto',
    forecast_days: '6',
    current:
      'temperature_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation',
    hourly:
      'temperature_2m,weather_code,precipitation_probability',
    daily:
      'weather_code,temperature_2m_min,temperature_2m_max,wind_speed_10m_max,precipitation_probability_max,sunrise,sunset',
  });

  const response = await fetch(`${WEATHER_URL}?${params}`);

  if (!response.ok) {
    throw new Error('Не вдалося завантажити погоду');
  }

  const data = await response.json();

  const hourlyIndexes = data.hourly.time
    .map((_: string, index: number) => index)
    .filter((index: number) => {
      const hour = new Date(data.hourly.time[index]).getHours();
      return [3, 6, 9, 12, 15, 18, 21].includes(hour);
    })
    .slice(0, 7);

  return {
    location,
    current: {
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      precipitation: data.current.precipitation,
    },
    hourly: hourlyIndexes.map((index: number) => ({
      time: data.hourly.time[index],
      temperature: data.hourly.temperature_2m[index],
      weatherCode: data.hourly.weather_code[index],
      precipitationProbability:
        data.hourly.precipitation_probability[index],
    })),
    daily: data.daily.time.map((date: string, index: number) => ({
      date,
      min: data.daily.temperature_2m_min[index],
      max: data.daily.temperature_2m_max[index],
      weatherCode: data.daily.weather_code[index],
      windSpeed: data.daily.wind_speed_10m_max[index],
      precipitationProbability:
        data.daily.precipitation_probability_max[index],
    })),
    sunrise: data.daily.sunrise[0],
    sunset: data.daily.sunset[0],
  };
}

export function weatherIcon(code: number): string {
  if (code === 0) return '☀️';
  if ([1, 2].includes(code)) return '🌤️';
  if (code === 3) return '☁️';
  if ([45, 48].includes(code)) return '🌫️';
  if ([51, 53, 55, 56, 57].includes(code)) return '🌦️';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return '🌧️';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return '🌨️';
  if ([95, 96, 99].includes(code)) return '⛈️';
  return '🌤️';
}

export function weatherDescription(code: number): string {
  if (code === 0) return 'Ясно';
  if ([1, 2].includes(code)) return 'Малохмарно';
  if (code === 3) return 'Хмарно';
  if ([45, 48].includes(code)) return 'Туман';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Мряка';
  if ([61, 63, 65, 80, 81, 82].includes(code)) return 'Дощ';
  if ([66, 67].includes(code)) return 'Крижаний дощ';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Сніг';
  if ([95, 96, 99].includes(code)) return 'Гроза';
  return 'Мінлива хмарність';
}
