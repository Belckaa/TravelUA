import { Search, Wind, Sunrise, Sunset, Droplets, Loader2 } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import {
  getWeather,
  searchCities,
  weatherDescription,
  weatherIcon,
  type WeatherData,
  type WeatherLocation,
} from '../services/weather';

const kyiv: WeatherLocation = {
  id: 703448,
  name: 'Київ',
  country: 'Україна',
  latitude: 50.4501,
  longitude: 30.5234,
};

const formatTemp = (value: number) => `${Math.round(value)}°`;

const formatHour = (value: string) =>
  new Intl.DateTimeFormat('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

const formatDay = (value: string) =>
  new Intl.DateTimeFormat('uk-UA', {
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
  }).format(new Date(`${value}T12:00:00`));

export default function WeatherPage() {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<WeatherLocation[]>([]);
  const [location, setLocation] = useState(kyiv);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    getWeather(location.latitude, location.longitude, location)
      .then((data) => {
        if (!cancelled) setWeather(data);
      })
      .catch(() => {
        if (!cancelled) setError('Не вдалося завантажити актуальну погоду.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [location]);

  useEffect(() => {
    if (query.trim().length < 2) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSearching(true);

      searchCities(query)
        .then(setCities)
        .catch(() => setCities([]))
        .finally(() => setSearching(false));
    }, 350);

    return () => window.clearTimeout(timer);
  }, [query]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 px-4 py-10 text-white md:px-8 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="relative max-w-2xl">
            <div className="flex items-center rounded-2xl bg-white/95 px-4 py-3 shadow-xl">
              <Search className="mr-3 text-blue-600" size={21} />
              <input
                id="weather-city-search"
                name="city"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Знайти місто..."
                className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                autoComplete="off"
              />
              {searching && (
                <Loader2 className="animate-spin text-blue-600" size={20} />
              )}
            </div>

            {cities.length > 0 && (
              <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl bg-white shadow-2xl">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => {
                      setLocation(city);
                      setQuery('');
                      setCities([]);
                    }}
                    className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-blue-50"
                  >
                    <span className="font-bold text-slate-900">
                      {city.name}
                    </span>
                    <span className="text-sm text-slate-500">
                      {city.country}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {weather && (
            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-lg font-semibold text-blue-100">
                  Актуальна погода
                </p>

                <h1 className="mt-1 text-5xl font-black tracking-tight md:text-7xl">
                  {weather.location.name}
                </h1>

                <p className="mt-2 text-lg text-blue-100">
                  {weather.location.country}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <span className="text-7xl">
                    {weatherIcon(weather.current.weatherCode)}
                  </span>

                  <div>
                    <div className="text-6xl font-black">
                      {formatTemp(weather.current.temperature)}
                    </div>
                    <p className="mt-1 text-lg text-blue-100">
                      {weatherDescription(weather.current.weatherCode)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[520px]">
                <WeatherStat
                  icon={<Wind size={20} />}
                  label="Вітер"
                  value={`${Math.round(weather.current.windSpeed)} км/год`}
                />
                <WeatherStat
                  icon={<Droplets size={20} />}
                  label="Опади"
                  value={`${Math.round(weather.current.precipitation)} мм`}
                />
                <WeatherStat
                  icon={<Sunrise size={20} />}
                  label="Схід"
                  value={formatHour(weather.sunrise)}
                />
                <WeatherStat
                  icon={<Sunset size={20} />}
                  label="Захід"
                  value={formatHour(weather.sunset)}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        {loading && (
          <div className="flex items-center justify-center rounded-3xl bg-white py-16 shadow-sm">
            <Loader2 className="mr-3 animate-spin text-blue-600" />
            Завантаження актуальної погоди...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
          </div>
        )}

        {weather && !loading && (
          <>
            <section>
              <div className="mb-4">
                <h2 className="text-2xl font-black text-slate-900">
                  Сьогодні
                </h2>
                <p className="text-slate-500">
                  Прогноз оновлюється автоматично
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-4 lg:grid-cols-7">
                {weather.hourly.map((hour) => (
                  <div
                    key={hour.time}
                    className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
                  >
                    <p className="text-sm font-bold text-slate-500">
                      {formatHour(hour.time)}
                    </p>
                    <div className="my-3 text-3xl">
                      {weatherIcon(hour.weatherCode)}
                    </div>
                    <p className="text-xl font-black text-slate-900">
                      {formatTemp(hour.temperature)}
                    </p>
                    <p className="mt-1 text-xs text-blue-600">
                      {hour.precipitationProbability}% опадів
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-black text-slate-900">
                Наступні 5 днів
              </h2>

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {weather.daily.slice(1, 6).map((day) => (
                  <div
                    key={day.date}
                    className="grid grid-cols-2 gap-4 border-b border-slate-100 p-5 last:border-0 sm:grid-cols-5 sm:items-center"
                  >
                    <div>
                      <p className="font-black text-slate-900">
                        {formatDay(day.date)}
                      </p>
                    </div>

                    <div className="text-3xl">{weatherIcon(day.weatherCode)}</div>

                    <div>
                      <span className="font-black text-slate-900">
                        {formatTemp(day.max)}
                      </span>
                      <span className="ml-2 text-sm text-slate-400">
                        / {formatTemp(day.min)}
                      </span>
                    </div>

                    <div className="text-sm text-slate-500">
                      <strong className="text-slate-900">
                        {Math.round(day.windSpeed)} км/год
                      </strong>{' '}
                      вітер
                    </div>

                    <div className="text-sm font-bold text-blue-600">
                      {day.precipitationProbability}% опадів
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}

function WeatherStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
      <div className="flex items-center gap-2 text-blue-100">
        {icon}
        <span className="text-xs font-semibold uppercase">{label}</span>
      </div>
      <p className="mt-2 text-lg font-black">{value}</p>
    </div>
  );
}
