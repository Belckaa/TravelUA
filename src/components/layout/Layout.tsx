import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut, Menu, Plane, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { authService } from '../../services/api';
import { logout } from '../../store';

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate('/');
  };

  const nav = [
    ['/', 'Головна'],
    ['/tours', 'Тури'],
    ['/hotels', 'Готелі'],
    ['/routes', 'Маршрути'],
    ['/weather', 'Погода'],
    ['/community', 'Спільнота'],
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-black">
            <Plane className="text-blue-600" />
            TravelUA
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map(([path, label]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-sm font-semibold ${
                    isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 text-sm font-semibold">
                  <UserCircle size={20} />
                  {user?.name || 'Профіль'}
                </Link>
                <Button variant="secondary" onClick={handleLogout}>
                  <span className="flex items-center gap-2">
                    <LogOut size={16} />
                    Вийти
                  </span>
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button>Увійти</Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Відкрити меню"
          >
            <Menu />
          </button>
        </div>

        {mobileOpen && (
          <nav className="border-t border-slate-200 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {nav.map(([path, label]) => (
                <NavLink key={path} to={path} onClick={() => setMobileOpen(false)}>
                  {label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-20 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-500 lg:px-8">
          © 2026 TravelUA — туристична платформа.
        </div>
      </footer>
    </div>
  );
}
