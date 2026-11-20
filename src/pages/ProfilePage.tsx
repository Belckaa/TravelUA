import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <Card className="p-8">
        <h1 className="text-3xl font-black">Профіль</h1>
        <div className="mt-6 rounded-2xl bg-slate-50 p-6">
          <div className="text-sm text-slate-500">Користувач</div>
          <div className="mt-1 text-xl font-bold">{user?.name || 'Мандрівник'}</div>
          <div className="mt-1 text-slate-600">{user?.email || 'Не авторизовано'}</div>
        </div>

        <div className="mt-7 flex gap-3">
          <Link to="/tours"><Button>Знайти тур</Button></Link>
          <Link to="/routes"><Button variant="secondary">Маршрути</Button></Link>
        </div>
      </Card>
    </section>
  );
}
