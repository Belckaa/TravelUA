import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Star } from 'lucide-react';
import { tourService } from '../services/api';
import type { Tour } from '../types';
import { Button } from '../components/ui/Button';

export function TourDetailsPage() {
  const { id } = useParams();
  const [tour, setTour] = useState<Tour>();

  useEffect(() => {
    if (id) tourService.getTour(id).then(setTour);
  }, [id]);

  if (!tour) {
    return <div className="mx-auto max-w-7xl px-4 py-20">Завантаження...</div>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <Link to="/tours" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
        <ArrowLeft size={16} /> Назад до турів
      </Link>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <img src={tour.image} alt={tour.title} className="h-[420px] w-full object-cover" />
        <div className="p-8 lg:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
              {tour.category}
            </span>
            <span className="flex items-center gap-1 font-bold">
              <Star size={17} className="fill-current text-amber-500" />
              {tour.rating}
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-black">{tour.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{tour.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5">
              <MapPin className="text-blue-600" />
              <div className="mt-2 text-sm text-slate-500">Локація</div>
              <div className="font-bold">{tour.city}, {tour.country}</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <Calendar className="text-blue-600" />
              <div className="mt-2 text-sm text-slate-500">Тривалість</div>
              <div className="font-bold">{tour.duration} днів</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <Star className="text-blue-600" />
              <div className="mt-2 text-sm text-slate-500">Рейтинг</div>
              <div className="font-bold">{tour.rating}/5</div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <div>
              <div className="text-3xl font-black">€{tour.price}</div>
              <div className="text-sm text-slate-500">за мандрівника</div>
            </div>
            <Button onClick={() => alert('Бронювання демо-туру успішно створено!')}>
              Забронювати тур
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
