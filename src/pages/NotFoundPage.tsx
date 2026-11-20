import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-black text-blue-600">404</div>
      <h1 className="mt-4 text-3xl font-black">Сторінку не знайдено</h1>
      <p className="mt-3 text-slate-500">Можливо, адреса була введена неправильно.</p>
      <Link to="/" className="mt-7">
        <Button>На головну</Button>
      </Link>
    </section>
  );
}
