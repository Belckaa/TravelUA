import { useEffect, useState } from 'react';
import { Clock, Mountain, Route as RouteIcon } from 'lucide-react';
import { routeService } from '../services/api';
import type { Route } from '../types';
import { Card } from '../components/ui/Card';

export function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    routeService.getRoutes().then(setRoutes);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-black">Маршрути</h1>
      <p className="mt-2 text-slate-600">Плануй піші пригоди та відкривай нові місця.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {routes.map((route) => (
          <Card key={route.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Mountain />
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase">
                {route.difficulty}
              </span>
            </div>
            <h2 className="mt-5 text-xl font-bold">{route.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{route.description}</p>
            <div className="mt-5 flex gap-5 text-sm font-semibold">
              <span className="flex items-center gap-1"><RouteIcon size={16} /> {route.distance} км</span>
              <span className="flex items-center gap-1"><Clock size={16} /> {route.duration} год.</span>
            </div>
            <div className="mt-5 space-y-2">
              {route.points.map((point, index) => (
                <div key={point} className="flex items-center gap-3 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  {point}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
