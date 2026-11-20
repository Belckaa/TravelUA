import { HotelCard } from '../components/hotels/HotelCard';
import { hotels } from '../data/hotels';

export function HotelsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold text-blue-400">TravelUA Hotels</p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            Знайди місце для відпочинку
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Обирай готель, конкретний номер, кількість гостей і ночей.
            Додай бронювання до свого кошика.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>
    </main>
  );
}
