import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Ruler,
  Star,
  CloudSun,
  Hotel as HotelIcon,
} from 'lucide-react';
import { travelRoutes } from '../data/routes';
import { hotels } from '../data/hotels';
import { HotelCard } from '../components/hotels/HotelCard';
import { RouteMap } from '../components/routes/RouteMap';
import { getWeather, weatherDescription, weatherIcon } from '../services/weather';
import type { WeatherData } from '../services/weather';

const weatherCities: Record<string, string> = {
  Карпати: 'Буковель',
  Львів: 'Львів',
  Одеса: 'Одеса',
};

const hotelRegions: Record<string, string[]> = {
  Карпати: ['Буковель, Україна'],
  Львів: ['Львів, Україна'],
  Одеса: ['Одеса, Україна'],
};

export function RouteDetailsPage() {
  const { id } = useParams();
  const route = travelRoutes.find((item) => item.id === id);

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(false);

  const nearbyHotels = useMemo(
    () =>
      hotels.filter((hotel) =>
        hotelRegions[route?.region ?? '']?.includes(hotel.city),
      ),
    [route?.region],
  );

  useEffect(() => {
    if (!route) return;

    let cancelled = false;

    const loadWeather = async () => {
      setWeatherLoading(true);
      setWeatherError(false);

      try {
        const city =
          weatherCities[route.region] ??
          route.points[0]?.name ??
          'Київ';

        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=uk&format=json`,
        );

        if (!response.ok) {
          throw new Error('Geocoding request failed');
        }

        const data = (await response.json()) as {
          results?: Array<{
            latitude: number;
            longitude: number;
            name: string;
            country: string;
          }>;
        };

        const location = data.results?.[0];

        if (!location) {
          throw new Error('Location not found');
        }

        const result = await getWeather(
          location.latitude,
          location.longitude,
          {
            id: Math.round(location.latitude * 10000 + location.longitude * 10000),
            name: location.name,
            country: location.country,
            latitude: location.latitude,
            longitude: location.longitude,
          },
        );

        if (!cancelled) {
          setWeather(result);
        }
      } catch {
        if (!cancelled) {
          setWeatherError(true);
        }
      } finally {
        if (!cancelled) {
          setWeatherLoading(false);
        }
      }
    };

    void loadWeather();

    return () => {
      cancelled = true;
    };
  }, [route]);

  if (!route) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20">
        <h1 className="text-3xl font-black">Маршрут не знайдено</h1>

        <Link
          to="/routes"
          className="mt-4 inline-block text-blue-600 underline"
        >
          Повернутися до маршрутів
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#26384e] px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/routes"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-blue-300"
          >
            <ArrowLeft size={16} />
            Усі маршрути
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-bold text-blue-400">{route.region}</p>

              <h1 className="mt-2 text-4xl font-black sm:text-5xl">
                {route.title}
              </h1>

              <p className="mt-4 max-w-2xl text-slate-300">
                {route.description}
              </p>
            </div>

            <div className="flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 font-bold text-amber-300">
              <Star size={16} fill="currentColor" />
              {route.rating}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <Clock className="text-blue-600" />
            <p className="mt-3 text-xs text-slate-400">Тривалість</p>
            <p className="font-black text-slate-900">{route.duration}</p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <Ruler className="text-blue-600" />
            <p className="mt-3 text-xs text-slate-400">Відстань</p>
            <p className="font-black text-slate-900">{route.distance}</p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <MapPin className="text-blue-600" />
            <p className="mt-3 text-xs text-slate-400">Складність</p>
            <p className="font-black text-slate-900">{route.difficulty}</p>
          </div>
        </div>

        <RouteMap points={route.points} />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">
              Точки маршруту
            </h2>

            <div className="mt-5 space-y-4">
              {route.points.map((point, index) => (
                <div
                  key={point.name}
                  className="flex gap-4 rounded-2xl border border-slate-100 p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black text-white">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {point.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <CloudSun size={18} />
              Погода на маршруті
            </div>

            {weatherLoading ? (
              <p className="mt-6 text-slate-500">
                Завантаження прогнозу...
              </p>
            ) : weatherError || !weather ? (
              <p className="mt-6 text-slate-500">
                Не вдалося завантажити погоду.
              </p>
            ) : (
              <>
                <p className="mt-5 text-sm text-slate-500">
                  {weather.location.name}
                </p>

                <div className="mt-2 flex items-center gap-4">
                  <span className="text-5xl">
                    {weatherIcon(weather.current.weatherCode)}
                  </span>

                  <div>
                    <div className="text-4xl font-black">
                      {Math.round(weather.current.temperature)}°
                    </div>

                    <div className="text-slate-500">
                      {weatherDescription(weather.current.weatherCode)}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-slate-500">Вітер</div>

                    <div className="mt-1 font-bold">
                      {Math.round(weather.current.windSpeed)} км/год
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-slate-500">Опади</div>

                    <div className="mt-1 font-bold">
                      {weather.current.precipitation} мм
                    </div>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
                <HotelIcon size={18} />
                Готелі поруч
              </div>

              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Де зупинитися після маршруту
              </h2>
            </div>

            <Link
              to="/hotels"
              className="font-bold text-blue-600 hover:text-blue-700"
            >
              Усі готелі →
            </Link>
          </div>

          {nearbyHotels.length === 0 ? (
            <p className="mt-6 text-slate-500">
              Поруч із цим маршрутом поки немає готелів.
            </p>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {nearbyHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
