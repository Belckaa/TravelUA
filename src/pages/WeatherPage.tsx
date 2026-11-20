import { useState } from 'react';
import { CloudSun, Droplets, Wind } from 'lucide-react';
import { weatherService } from '../services/api';
import type { Weather } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function WeatherPage() {
  const [city, setCity] = useState('Львів');
  const [weather, setWeather] = useState<Weather>();

  const search = async () => {
    setWeather(await weatherService.getWeather(city));
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-black">Погода</h1>
      <p className="mt-2 text-slate-600">Перевір погодні умови перед подорожжю.</p>

      <div className="mt-8 flex gap-3">
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
          placeholder="Введіть місто"
        />
        <Button onClick={search}>Перевірити</Button>
      </div>

      {weather && (
        <Card className="mt-8 p-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <div className="text-sm font-semibold text-slate-500">{weather.city}</div>
              <div className="mt-2 text-6xl font-black">{weather.temperature}°</div>
              <div className="mt-2 text-lg">{weather.condition}</div>
            </div>
            <CloudSun size={80} className="text-blue-500" />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <Droplets className="text-blue-600" />
              <div className="mt-2 text-sm text-slate-500">Вологість</div>
              <div className="font-bold">{weather.humidity}%</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <Wind className="text-blue-600" />
              <div className="mt-2 text-sm text-slate-500">Вітер</div>
              <div className="font-bold">{weather.wind} м/с</div>
            </div>
          </div>
        </Card>
      )}
    </section>
  );
}
