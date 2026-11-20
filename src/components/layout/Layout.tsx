import { Link, NavLink, Outlet } from 'react-router-dom';
import { Compass, ShoppingBag, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getBookingsCount } from '../../services/bookingCart';

const links = [
  ['Тури', '/tours'],
  ['Готелі', '/hotels'],
  ['Маршрути', '/routes'],
  ['Погода', '/weather'],
  ['Спільнота', '/community'],
];

export function Layout() {
  const [bookingCount, setBookingCount] = useState(getBookingsCount());

  useEffect(() => {
    const refresh = () => setBookingCount(getBookingsCount());
    window.addEventListener('bookings:updated', refresh);
    return () => window.removeEventListener('bookings:updated', refresh);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4 lg:px-8">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 text-xl font-black text-blue-600"
          >
            <Compass size={27} />
            TravelUA
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-5 md:flex">
            {links.map(([label, href]) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) =>
                  `text-sm font-bold transition ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-slate-600 hover:text-blue-600'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/bookings"
              className="relative rounded-xl p-2.5 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              aria-label="Мої бронювання"
            >
              <ShoppingBag size={21} />

              {bookingCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[11px] font-black text-white">
                  {bookingCount}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className="rounded-xl p-2.5 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              aria-label="Профіль"
            >
              <UserRound size={21} />
            </Link>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 TravelUA. Плануй. Подорожуй. Відкривай.</p>
          <Link to="/bookings" className="font-bold text-blue-600">
            Мої бронювання
          </Link>
        </div>
      </footer>
    </div>
  );
}
