import { useState, type FormEvent } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Button } from '../components/Button'

export function LoginPage() {
  const user = useAuthStore((s) => s.user)
  const { login, register } = useAuthStore()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('demo@fintrack.app')
  const [password, setPassword] = useState('demo1234')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  if (user) return <Navigate to="/" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    const ok = mode === 'login' ? await login(email, password) : await register(email, password, name)
    if (ok) navigate('/')
    else setError('Перевірте введені дані (пароль мінімум 6 символів)')
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <div className="auth__brand">
          <span className="auth__logo">₴</span>
          <h1>FinTrack</h1>
        </div>
        <p className="auth__subtitle">
          {mode === 'login' ? 'Увійдіть у свій акаунт' : 'Створіть новий акаунт'}
        </p>
        <form className="auth__form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label className="field">
              <span className="field__label">Ім'я</span>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          )}
          <label className="field">
            <span className="field__label">Email</span>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="field">
            <span className="field__label">Пароль</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <div className="alert alert--error">{error}</div>}
          <Button type="submit" className="w-full">
            {mode === 'login' ? 'Увійти' : 'Зареєструватися'}
          </Button>
        </form>
        <button
          className="auth__toggle"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? 'Немає акаунту? Зареєструватися' : 'Вже маєте акаунт? Увійти'}
        </button>
      </div>
    </div>
  )
}
