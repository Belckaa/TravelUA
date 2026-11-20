import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Hotel, Map, CloudSun } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <span className="mb-5 inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-bold text-blue-300">
              Твоя наступна пригода
            </span>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl">
              Відкривай світ
              <span className="block text-blue-400">по-своєму</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Знаходь цікаві тури, бронюй готелі, плануй маршрути та отримуй
              актуальну інформацію про погоду в одному місці.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/tours">
                <Button>Знайти подорож <ArrowRight className="ml-2 inline" size={18} /></Button>
              </Link>
              <Link to="/routes">
                <Button variant="secondary">Дослідити маршрути</Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Тури', 'Пошук пригод', Compass],
              ['Готелі', 'Комфортний відпочинок', Hotel],
              ['Маршрути', 'Плануй подорож', Map],
              ['Погода', 'Будь готовий', CloudSun],
            ].map(([title, description, Icon]) => {
              const Component = Icon as typeof Compass;
              return (
                <Card key={title as string} className="border-white/10 bg-white/10 p-6 text-white backdrop-blur">
                  <Component className="mb-5 text-blue-400" size={30} />
                  <h3 className="text-xl font-bold">{title as string}</h3>
                  <p className="mt-2 text-sm text-slate-300">{description as string}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-7">
            <div className="text-4xl font-black text-blue-600">100+</div>
            <p className="mt-2 text-slate-600">цікавих напрямків</p>
          </Card>
          <Card className="p-7">
            <div className="text-4xl font-black text-blue-600">500+</div>
            <p className="mt-2 text-slate-600">готелів та помешкань</p>
          </Card>
          <Card className="p-7">
            <div className="text-4xl font-black text-blue-600">24/7</div>
            <p className="mt-2 text-slate-600">доступ до планування</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
