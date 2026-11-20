import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star } from 'lucide-react';
import { tourService } from '../services/api';
import type { Tour } from '../types';
import { Card } from '../components/ui/Card';

export function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Усі');

  useEffect(() => {
    tourService.getTours().then(setTours);
  }, []);

  const categories = ['Усі', ...new Set(tours.map((tour) => tour.category))];

  const filtered = useMemo(
    () =>
      tours.filter((tour) => {
        const matchesQuery = `${tour.title} ${tour.city} ${tour.country}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory = category === 'Усі' || tour.category === category;
        return matchesQuery && matchesCategory;
      }),
    [tours, query, category],
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-black">Тури</h1>
        <p className="mt-2 text-slate-600">Обери напрямок для наступної подорожі.</p>
      </div>

      <div className="mb-8 flex flex-col gap-3 md:flex-row">
        <label className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Пошук туру..."
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none focus:border-blue-500"
          />
        </label>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tour) => (
          <Card key={tour.id} className="overflow-hidden">
            <img src={tour.image} alt={tour.title} className="h-56 w-full object-cover" />
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {tour.category}
                </span>
                <span className="flex items-center gap-1 text-sm font-bold">
                  <Star size={16} className="fill-current text-amber-500" />
                  {tour.rating}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-bold">{tour.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{tour.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <div className="text-xl font-black">€{tour.price}</div>
                  <div className="text-xs text-slate-500">{tour.duration} днів</div>
                </div>
                <Link
                  to={`/tours/${tour.id}`}
                  className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                >
                  Деталі
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
