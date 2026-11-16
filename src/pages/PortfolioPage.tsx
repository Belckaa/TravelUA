import { useState, useEffect } from 'react'
import { Plus, Trash2, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { usePortfolioStore } from '../store/portfolioStore'
import { fetchCurrencyRates } from '../services/marketService'
import { Button } from '../components/Button'
import type { AssetType } from '../types'

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444']

export function PortfolioPage() {
  const { assets, addAsset, removeAsset } = usePortfolioStore()
  const [showForm, setShowForm] = useState(false)
  const [usdRate, setUsdRate] = useState(45.0)
  
  const [name, setName] = useState('')
  const [type, setType] = useState<AssetType>('stock')
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')

  useEffect(() => {
    const loadRate = async () => {
      const rates = await fetchCurrencyRates()
      const usd = rates.find(r => r.cc === 'USD')
      if (usd) setUsdRate(usd.rate)
    }
    loadRate()
  }, [])

  const fmt = (n: number) => `${n.toLocaleString('uk-UA', { maximumFractionDigits: 2 })} $`
  const fmtUAH = (n: number) => `${(n * usdRate).toLocaleString('uk-UA', { maximumFractionDigits: 2 })} ₴`

  const totalValue = assets.reduce((sum, a) => sum + a.quantity * a.currentPrice, 0)
  const totalCost = assets.reduce((sum, a) => sum + a.quantity * a.purchasePrice, 0)
  const totalProfit = totalValue - totalCost
  const totalProfitPercent = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0

  const pieData = assets.map((a) => ({ name: a.name, value: a.quantity * a.currentPrice }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !quantity || !purchasePrice || !currentPrice) return
    addAsset({ name, type, quantity: Number(quantity), purchasePrice: Number(purchasePrice), currentPrice: Number(currentPrice) })
    setName(''); setQuantity(''); setPurchasePrice(''); setCurrentPrice(''); setShowForm(false)
  }

  return (
    <div className="page">
      <header className="page__header page__header--row">
        <div>
          <h1 className="page__title">Портфель</h1>
          <p className="page__subtitle">Ваші інвестиції та активи (Курс: {usdRate.toFixed(2)} ₴)</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}><Plus size={16} /> Додати актив</Button>
      </header>

      <div className="kpi-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="kpi">
          <div className="kpi__header"><span className="kpi__label">Загальна вартість (USD) <DollarSign size={14} /></span></div>
          <div className="kpi__value">{fmt(totalValue)}</div>
          <div className="kpi__trend"><span className="kpi__period">≈ {fmtUAH(totalValue)}</span></div>
        </div>
        <div className="kpi">
          <div className="kpi__header"><span className="kpi__label">Прибуток / Збиток {totalProfit >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}</span></div>
          <div className="kpi__value" style={{ color: totalProfit >= 0 ? 'var(--accent)' : 'var(--danger)' }}>{totalProfit >= 0 ? '+' : ''}{fmt(totalProfit)}</div>
          <div className="kpi__trend">
             <span className={`trend-pill ${totalProfit >= 0 ? 'trend-pill--up' : 'trend-pill--down'}`}>{totalProfitPercent.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      {showForm && (
        <form className="card" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="field"><span className="field__label">Назва</span><input className="input" value={name} onChange={(e) => setName(e.target.value)} required /></label>
            <label className="field"><span className="field__label">Тип</span><select className="input" value={type} onChange={(e) => setType(e.target.value as AssetType)}><option value="stock">Акція</option><option value="crypto">Криптовалюта</option><option value="deposit">Депозит</option><option value="bond">Облигація</option><option value="etf">ETF</option></select></label>
            <label className="field"><span className="field__label">Кількість</span><input className="input" type="number" step="any" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /></label>
            <label className="field"><span className="field__label">Ціна купівлі ($)</span><input className="input" type="number" step="any" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} required /></label>
            <label className="field"><span className="field__label">Поточна ціна ($)</span><input className="input" type="number" step="any" value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} required /></label>
          </div>
          <Button type="submit">Зберегти</Button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <section className="card">
          <h2 className="card__title">Розподіл активів</h2>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                  {pieData.map((_, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                </Pie>
                <Tooltip formatter={(value: number) => fmt(value)} contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card">
          <h2 className="card__title">Мої активи</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {assets.map((a) => {
              const profit = a.quantity * (a.currentPrice - a.purchasePrice)
              return (
                <div key={a.id} className="list-item">
                  <div className="list-item__avatar" style={{ backgroundColor: a.currentPrice >= a.purchasePrice ? 'var(--accent)' : 'var(--danger)', color: '#fff' }}>{a.ticker ? a.ticker[0] : a.name[0]}</div>
                  <div className="list-item__body">
                    <div className="list-item__title">{a.name} {a.ticker && `(${a.ticker})`}</div>
                    <div className="list-item__subtitle">{a.quantity} шт. × {fmt(a.currentPrice)}</div>
                  </div>
                  <div className="list-item__amount" style={{ color: profit >= 0 ? 'var(--accent)' : 'var(--danger)' }}>
                    {profit >= 0 ? '+' : ''}{fmt(profit)}
                  </div>
                  <button className="icon-btn" onClick={() => removeAsset(a.id)}><Trash2 size={14} /></button>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}