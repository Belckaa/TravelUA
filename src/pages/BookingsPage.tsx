import { BookingCart } from '../components/bookings/BookingCart';

export function BookingsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold text-blue-400">TravelUA</p>
          <h1 className="mt-2 text-4xl font-black">Мої бронювання</h1>
          <p className="mt-3 text-slate-300">
            Тут зберігаються вибрані готелі та інші бронювання.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <BookingCart />
      </section>
    </main>
  );
}
