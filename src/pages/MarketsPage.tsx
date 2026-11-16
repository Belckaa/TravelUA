import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshCw, TrendingUp, TrendingDown, Info } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Label } from 'recharts'
import { Button } from '../components/Button'
import { fetchCurrencyRates, generateHistoricalData, mockNews, type CurrencyRate } from '../services/marketService'

export function MarketsPage() {
  const { t } = useTranslation()
  const [rates, setRates] = useState<CurrencyRate[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')

  const loadRates = async () => {
    setLoading(true)
    const data = await fetchCurrencyRates()
    setRates(data)
    setLoading(false)
  }

  useEffect(() => { loadRates() }, [])

  const currentRateObj = rates.find(r => r.cc === selectedCurrency)
  const currentRate = currentRateObj?.rate || 45.0
  const chartData = useMemo(() => generateHistoricalData(currentRate), [currentRate])

  const filteredNews = mockNews.filter(n => n.currency === selectedCurrency || n.currency === 'ALL')

  const chartNews = filteredNews.map(n => {
    const dataPoint = chartData.find(d => d.date === n.date)
    return dataPoint ? { ...n, x: dataPoint.displayDate, y: dataPoint.rate } : null
  }).filter(Boolean)

  const currencies = [
    { cc: 'USD', label: 'Долар США' },
    { cc: 'EUR', label: 'Євро' },
    { cc: 'GBP', label: 'Фунт' },
    { cc: 'PLN', label: 'Злотий' },
  ]

  return (
    <div className="page">
      <header className="page__header page__header--row">
        <div>
          <h1 className="page__title">{t('markets.title')}</h1>
          <p className="page__subtitle">{t('markets.subtitle')}</p>
        </div>
        <Button variant="secondary" onClick={loadRates} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'spin' : ''} /> {t('markets.load')}
        </Button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <section className="card">
            <h2 className="card__title">{t('markets.rates')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {rates.map((r) => (
                <div key={r.cc} className="list-item" onClick={() => setSelectedCurrency(r.cc)} style={{ cursor: 'pointer', background: selectedCurrency === r.cc ? 'var(--bg-hover)' : 'transparent', padding: '12px', borderRadius: '8px' }}>
                  <div className="list-item__avatar" style={{ backgroundColor: selectedCurrency === r.cc ? 'var(--accent)' : 'var(--bg-hover)', color: selectedCurrency === r.cc ? '#fff' : 'var(--text-muted)' }}>{r.cc[0]}</div>
                  <div className="list-item__body">
                    <div className="list-item__title">{r.txt} ({r.cc})</div>
                    <div className="list-item__subtitle">Офіційний курс НБУ</div>
                  </div>
                  <div className="list-item__amount">{r.rate.toFixed(2)} ₴</div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h2 className="card__title" style={{ marginBottom: '8px' }}>Поточний курс {selectedCurrency}</h2>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-1.5px', color: 'var(--text)' }}>{currentRate.toFixed(2)}</span>
                  <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-secondary)' }}>₴</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {currencies.map(c => (
                  <button key={c.cc} onClick={() => setSelectedCurrency(c.cc)} className={`btn btn--sm ${selectedCurrency === c.cc ? 'btn--primary' : 'btn--ghost'}`} style={{ padding: '4px 8px', fontSize: '11px' }}>{c.cc}</button>
                ))}
              </div>
            </div>
            
            <div style={{ height: '220px', width: '100%', marginTop: '10px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="displayDate" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis domain={['auto', 'auto']} stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => val.toFixed(1)} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: 'var(--shadow)' }} formatter={(value: number) => [`${value.toFixed(2)} ₴`, 'Курс']} />
                  <Area type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                  
                  {chartNews.map((n, i) => (
                    <ReferenceDot key={i} x={n!.x} y={n!.y} r={5} fill="#f59e0b" stroke="var(--bg-elevated)" strokeWidth={2}>
                      <Label value="!" position="top" fill="#f59e0b" fontSize={14} fontWeight="bold" />
                    </ReferenceDot>
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

        </div>

        <section className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <h2 className="card__title" style={{ margin: 0 }}>{t('markets.news')} ({selectedCurrency})</h2>
            <Info size={16} color="var(--text-muted)" />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>Новини, що вплинули на курс обраної валюти (позначені на графіку).</p>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredNews.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '20px' }}>Немає новин для цієї валюти</p>
            ) : (
              filteredNews.map((n) => (
                <div key={n.id} className="list-item" style={{ alignItems: 'flex-start', padding: '16px 0' }}>
                  <div className="list-item__avatar" style={{ backgroundColor: n.impact === 'up' ? 'var(--accent)' : n.impact === 'down' ? 'var(--danger)' : '#f59e0b', color: '#fff', marginTop: '4px' }}>
                    {n.impact === 'up' ? <TrendingUp size={18} /> : n.impact === 'down' ? <TrendingDown size={18} /> : <Info size={18} />}
                  </div>
                  <div className="list-item__body">
                    <div className="list-item__title">{n.title}</div>
                    <div className="list-item__subtitle">{n.source} · {new Date(n.date).toLocaleDateString('uk-UA')}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  )
}