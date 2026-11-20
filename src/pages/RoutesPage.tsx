import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import { travelRoutes } from '../data/routes';

export function RoutesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold text-cyan-300">TravelUA Routes</p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            Обирай свій маршрут
          </h1>
          <p className="mt-4 max-w-2xl text-blue-100">
            Клікай на маршрут, переглядай точки та відкривай його на
            інтерактивній карті.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {travelRoutes.map((route) => (
            <Link
              key={route.id}
              to={`/routes/${route.id}`}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                  {route.region}
                </span>

                <span className="flex items-center gap-1 text-sm font-bold text-amber-500">
                  <Star size={15} fill="currentColor" />
                  {route.rating}
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-black text-slate-900">
                {route.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {route.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
                <span>🥾 {route.difficulty}</span>
                <span>⏱ {route.duration}</span>
                <span>📏 {route.distance}</span>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-blue-600">
                <span className="flex items-center gap-2 text-sm font-bold">
                  <MapPin size={17} />
                  {route.points.length} точки
                </span>

                <ArrowRight
                  size={20}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
