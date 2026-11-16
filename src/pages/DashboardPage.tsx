import { useMemo } from 'react'
import { TrendingUp, TrendingDown, Wallet, Target, MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { useBudgetStore } from '../store/budgetStore'
import { useTranslation } from 'react-i18next'

export function DashboardPage() {
  const { t } = useTranslation()
  const { transactions, categories } = useBudgetStore()

  const stats = useMemo(() => {
    const now = new Date()
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const monthly = transactions.filter((t) => t.date.startsWith(monthKey))
    const income = monthly.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const expense = monthly.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    return { income, expense, balance: income - expense, savingsRate: income > 0 ? ((income - expense) / income) * 100 : 0 }
  }, [transactions])

  const chartData = useMemo(() => {
    const months = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру']
    const now = new Date()
    const data = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      const monthTxns = transactions.filter((t) => t.date.startsWith(monthKey))
      const inc = monthTxns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
      const exp = monthTxns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
      data.push({
        name: months[d.getMonth()],
        income: inc || (i > 0 ? 20000 + Math.random() * 5000 : 0),
        expense: exp || (i > 0 ? 10000 + Math.random() * 5000 : 0),
      })
    }
    return data
  }, [transactions])

  const fmt = (n: number) => `${n.toLocaleString('uk-UA')} ₴`
  const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4)

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1 className="page__title">{t('dashboard.title')}</h1>
          <p className="page__subtitle">{t('dashboard.subtitle')}</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
             <MoreHorizontal size={20} cursor="pointer" />
          </div>
        </div>
      </header>

      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi__header"><span className="kpi__label">Доходи <TrendingUp size={14} /></span></div>
          <div className="kpi__value">{fmt(stats.income)}</div>
          <div className="kpi__trend">
            <span className="trend-pill trend-pill--up"><ArrowUpRight size={12} /> +22.2%</span>
            <span className="kpi__period">Останні 30 днів</span>
          </div>
        </div>

        <div className="kpi">
          <div className="kpi__header"><span className="kpi__label">Витрати <TrendingDown size={14} /></span></div>
          <div className="kpi__value">{fmt(stats.expense)}</div>
          <div className="kpi__trend">
            <span className="trend-pill trend-pill--down"><ArrowDownRight size={12} /> -12.2%</span>
            <span className="kpi__period">Останні 30 днів</span>
          </div>
        </div>

        <div className="kpi">
          <div className="kpi__header"><span className="kpi__label">Баланс <Wallet size={14} /></span></div>
          <div className="kpi__value">{fmt(stats.balance)}</div>
          <div className="kpi__trend">
            <span className="trend-pill trend-pill--up"><ArrowUpRight size={12} /> +8.4%</span>
            <span className="kpi__period">Останні 30 днів</span>
          </div>
        </div>

        <div className="kpi">
          <div className="kpi__header"><span className="kpi__label">Норма заощаджень <Target size={14} /></span></div>
          <div className="kpi__value">{stats.savingsRate.toFixed(1)}%</div>
          <div className="kpi__trend">
            <span className="trend-pill trend-pill--up"><ArrowUpRight size={12} /> +2.1%</span>
            <span className="kpi__period">Останні 30 днів</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <section className="card">
          <div className="card__header"><h2 className="card__title">Транзакції (Динаміка)</h2></div>
          <div style={{ height: '220px', width: '100%', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: 'var(--shadow)' }} formatter={(value: number) => fmt(value)} />
                <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card">
          <div className="card__header"><h2 className="card__title">Витрати по місяцях</h2></div>
          <div style={{ height: '220px', width: '100%', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '12px' }} />
                <Bar dataKey="expense" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {chartData.map((_, index) => (<Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#10b981' : 'var(--bg-hover)'} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="bottom-grid">
        <section className="card">
          <div className="card__header"><h2 className="card__title">Останні транзакції</h2></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recent.map((t) => {
              const cat = categories.find((c) => c.id === t.categoryId)
              return (
                <div key={t.id} className="list-item">
                  <div className="list-item__avatar" style={{ backgroundColor: cat?.color ?? '#333', color: '#fff' }}>{t.description[0]}</div>
                  <div className="list-item__body">
                    <div className="list-item__title">{t.description}</div>
                    <div className="list-item__subtitle">{new Date(t.date).toLocaleDateString('uk-UA')}</div>
                  </div>
                  <div className="list-item__amount" style={{ color: t.type === 'income' ? 'var(--accent)' : 'var(--text)' }}>
                    {t.type === 'income' ? '+' : '−'}{fmt(t.amount)}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="card">
           <div className="card__header"><h2 className="card__title">Цілі та заощадження</h2></div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
             <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Поточний прогрес</div>
             <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{stats.savingsRate.toFixed(1)}%</div>
             <div className="progress-bg" style={{ height: '12px' }}><div className="progress-fill" style={{ width: `${stats.savingsRate}%`, backgroundColor: 'var(--accent)' }} /></div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '13px' }}>
               <span style={{ color: 'var(--text-secondary)' }}>Заощаджено</span>
               <span style={{ fontWeight: 'bold' }}>{fmt(stats.balance)}</span>
             </div>
          </div>
        </section>

        <section className="card">
          <div className="card__header"><h2 className="card__title">Поточний баланс</h2></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}><span style={{ color: 'var(--text-secondary)' }}>UAH</span><span style={{ fontWeight: '600' }}>{fmt(stats.balance)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}><span style={{ color: 'var(--text-secondary)' }}>USD</span><span style={{ fontWeight: '600' }}>${(stats.balance / 45).toFixed(2)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}><span style={{ color: 'var(--text-secondary)' }}>EUR</span><span style={{ fontWeight: '600' }}>€{(stats.balance / 50).toFixed(2)}</span></div>
          </div>
        </section>
      </div>
    </div>
  )
}