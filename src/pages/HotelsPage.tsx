import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { hotelService } from '../services/api';
import type { Hotel } from '../types';
import { Card } from '../components/ui/Card';

export function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    hotelService.getHotels().then(setHotels);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-black">Готелі</h1>
      <p className="mt-2 text-slate-600">Знайди комфортне місце для проживання.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden">
            <img src={hotel.image} alt={hotel.name} className="h-56 w-full object-cover" />
            <div className="p-5">
              <div className="flex justify-between gap-4">
                <h2 className="text-xl font-bold">{hotel.name}</h2>
                <span className="flex items-center gap-1 font-bold">
                  <Star size={16} className="fill-current text-amber-500" />
                  {hotel.rating}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{hotel.city}, {hotel.country}</p>
              <p className="mt-3 text-sm text-slate-600">{hotel.description}</p>
              <div className="mt-5 text-xl font-black">€{hotel.pricePerNight}<span className="text-sm font-normal text-slate-500"> / ніч</span></div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
