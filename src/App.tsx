import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { authService } from './services/api';
import { useAppDispatch } from './hooks/redux';
import { setUser, logout } from './store';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const ToursPage = lazy(() => import('./pages/ToursPage').then((module) => ({ default: module.ToursPage })));
const TourDetailsPage = lazy(() => import('./pages/TourDetailsPage').then((module) => ({ default: module.TourDetailsPage })));
const HotelsPage = lazy(() => import('./pages/HotelsPage').then((module) => ({ default: module.HotelsPage })));
const RoutesPage = lazy(() => import('./pages/RoutesPage').then((module) => ({ default: module.RoutesPage })));
const WeatherPage = lazy(() => import('./pages/WeatherPage').then((module) => ({ default: module.WeatherPage })));
const CommunityPage = lazy(() => import('./pages/CommunityPage').then((module) => ({ default: module.CommunityPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then((module) => ({ default: module.LoginPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then((module) => ({ default: module.ProfilePage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      dispatch(setUser(user));
    }

    const handleLogout = () => dispatch(logout());
    window.addEventListener('auth:logout', handleLogout);

    return () => window.removeEventListener('auth:logout', handleLogout);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout />
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="animate-pulse font-semibold text-blue-600">Завантаження...</div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:id" element={<TourDetailsPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
