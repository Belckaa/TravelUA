import { useState, type FormEvent } from 'react'
import { Plus, Trash2, Download, FileText } from 'lucide-react'
import { useBudgetStore } from '../store/budgetStore'
import { Button } from '../components/Button'
import type { TransactionType } from '../types'
import { fetchMonobankTransactions } from '../services/monobank'

export function BudgetPage() {
  const { transactions, categories, addTransaction, deleteTransaction } = useBudgetStore()
  const [showForm, setShowForm] = useState(false)
  const [type, setType] = useState<TransactionType>('expense')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [isImporting, setIsImporting] = useState(false)

  const fmt = (n: number) => `${n.toLocaleString('uk-UA')} ₴`
  const filteredCats = categories.filter((c) => c.type === type)
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date))

  const expenseByCategory = categories.filter(c => c.type === 'expense').map(cat => {
    const spent = transactions.filter(t => t.type === 'expense' && t.categoryId === cat.id).reduce((sum, t) => sum + t.amount, 0)
    return { ...cat, spent }
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!amount || !description || !categoryId) return
    addTransaction({ type, amount: Number(amount), description, categoryId, date: new Date().toISOString().split('T')[0] })
    setAmount(''); setDescription(''); setCategoryId(''); setShowForm(false)
  }

  const handleImport = async () => {
    try {
      setIsImporting(true)
      const imported = await fetchMonobankTransactions()
      imported.forEach(t => addTransaction(t))
    } catch (e) { console.error(e) } finally { setIsImporting(false) }
  }

  const handleExportCSV = () => {
    const headers = ['Date', 'Type', 'Amount', 'Category', 'Description']
    const rows = sorted.map(t => [t.date, t.type, t.amount, categories.find(c => c.id === t.categoryId)?.name || '', t.description])
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n')
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'transactions.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="page">
      <header className="page__header page__header--row">
        <div>
          <h1 className="page__title">Бюджет</h1>
          <p className="page__subtitle">Керуйте своїми доходами та витратами</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="ghost" onClick={handleExportCSV} title="Експорт CSV"><FileText size={16} /></Button>
          <Button variant="secondary" onClick={handleImport} disabled={isImporting}><Download size={16} /> {isImporting ? 'Імпорт...' : 'Імпорт з Monobank'}</Button>
          <Button onClick={() => setShowForm((v) => !v)}><Plus size={16} /> Додати</Button>
        </div>
      </header>

      {showForm && (
        <form className="card" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="field"><span className="field__label">Тип</span><select className="input" value={type} onChange={(e) => { setType(e.target.value as TransactionType); setCategoryId('') }}><option value="expense">Витрата</option><option value="income">Дохід</option></select></label>
            <label className="field"><span className="field__label">Сума (₴)</span><input className="input" type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} required /></label>
            <label className="field"><span className="field__label">Категорія</span><select className="input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required><option value="">Оберіть…</option>{filteredCats.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}</select></label>
            <label className="field"><span className="field__label">Опис</span><input className="input" value={description} onChange={(e) => setDescription(e.target.value)} required /></label>
          </div>
          <Button type="submit">Зберегти</Button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <section className="card">
          <h2 className="card__title">Ліміти витрат</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {expenseByCategory.filter(c => c.budgetLimit).map(cat => {
              const percent = Math.min((cat.spent / cat.budgetLimit!) * 100, 100)
              const isWarning = percent >= 70 && percent < 90
              const isDanger = percent >= 90
              const color = isDanger ? 'var(--danger)' : isWarning ? '#f59e0b' : 'var(--accent)'
              return (
                <div key={cat.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span>{cat.name}</span>
                    <span style={{ color: isDanger ? 'var(--danger)' : 'var(--text-secondary)' }}>{fmt(cat.spent)} / {fmt(cat.budgetLimit!)}</span>
                  </div>
                  <div className="progress-bg"><div className="progress-fill" style={{ width: `${percent}%`, backgroundColor: color }} /></div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="card">
          <h2 className="card__title">Усі транзакції</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {sorted.map((t) => {
              const cat = categories.find((c) => c.id === t.categoryId)
              return (
                <div key={t.id} className="list-item">
                  <div className="list-item__avatar" style={{ backgroundColor: cat?.color ?? '#333', color: '#fff' }}>{t.description[0]}</div>
                  <div className="list-item__body">
                    <div className="list-item__title">{t.description}</div>
                    <div className="list-item__subtitle">{cat?.name} · {new Date(t.date).toLocaleDateString('uk-UA')}</div>
                  </div>
                  <div className="list-item__amount" style={{ color: t.type === 'income' ? 'var(--accent)' : 'var(--text)' }}>
                    {t.type === 'income' ? '+' : '−'}{fmt(t.amount)}
                  </div>
                  <button className="icon-btn" onClick={() => deleteTransaction(t.id)}><Trash2 size={14} /></button>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}