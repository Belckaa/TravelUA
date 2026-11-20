import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import {
  getBookings,
  getBookingsTotal,
  removeBooking,
} from '../../services/bookingCart';
import { useEffect, useState } from 'react';
import type { BookingItem } from '../../types/booking';

export function BookingCart() {
  const [items, setItems] = useState<BookingItem[]>(() => getBookings());

  function refresh() {
    setItems(getBookings());
  }

  useEffect(() => {
    window.addEventListener('bookings:updated', refresh);
    return () => window.removeEventListener('bookings:updated', refresh);
  }, []);

  const total = getBookingsTotal();

  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <div className="text-5xl">🧳</div>
        <h2 className="mt-4 text-2xl font-black text-slate-900">
          Бронювань поки немає
        </h2>
        <p className="mt-2 text-slate-500">
          Додай готель або тур — вони зʼявляться тут.
        </p>
        <Link
          to="/hotels"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"
        >
          Переглянути готелі
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase text-blue-600">
                  {item.type === 'hotel' ? 'Готель' : 'Тур'}
                </span>

                <h3 className="mt-3 text-xl font-black text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-slate-500">{item.subtitle}</p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                  {item.guests && <span>👤 {item.guests} гостей</span>}
                  <span>📅 {item.quantity} ночей/од.</span>
                </div>
              </div>

              <button
                onClick={() => removeBooking(item.id)}
                className="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                aria-label={`Видалити ${item.title}`}
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4 text-right">
              <span className="text-sm text-slate-500">Сума: </span>
              <strong className="text-xl text-blue-600">
                {(item.price * item.quantity).toLocaleString('uk-UA')} грн
              </strong>
            </div>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-3xl bg-slate-950 p-6 text-white">
        <p className="text-sm text-slate-400">Підсумок</p>
        <h2 className="mt-2 text-4xl font-black">
          {total.toLocaleString('uk-UA')} грн
        </h2>

        <p className="mt-3 text-sm text-slate-400">
          Фінальне оформлення можна підключити до платіжного API.
        </p>

        <button className="mt-6 w-full rounded-xl bg-blue-500 px-5 py-3 font-bold hover:bg-blue-400">
          Перейти до оформлення
        </button>
      </aside>
    </div>
  );
}
