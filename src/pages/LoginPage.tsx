import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { authService } from '../services/api';
import { useAppDispatch } from '../hooks/redux';
import { setUser } from '../store';

export function LoginPage() {
  const [email, setEmail] = useState('traveler@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setError('');
      const user = await authService.login(email, password);
      dispatch(setUser(user));
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Помилка авторизації');
    }
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-black">Вхід</h1>
        <p className="mt-2 text-slate-500">Увійди до свого TravelUA акаунта.</p>

        <form onSubmit={submit} className="mt-7 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Пароль</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

          {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          <Button type="submit" className="w-full">
            Увійти
          </Button>
        </form>
      </Card>
    </section>
  );
}
