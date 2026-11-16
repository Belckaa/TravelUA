import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Category, Transaction } from '../types'

interface BudgetState {
  categories: Category[]
  transactions: Transaction[]
  addTransaction: (t: Omit<Transaction, 'id'>) => void
  deleteTransaction: (id: string) => void
  addCategory: (c: Omit<Category, 'id'>) => void
}

const seedCategories: Category[] = [
  { id: 'c-1', name: 'Їжа', type: 'expense', color: '#ef4444', budgetLimit: 8000 },
  { id: 'c-2', name: 'Транспорт', type: 'expense', color: '#f59e0b', budgetLimit: 2000 },
  { id: 'c-3', name: 'Розваги', type: 'expense', color: '#8b5cf6', budgetLimit: 3000 },
  { id: 'c-4', name: 'Комунальні', type: 'expense', color: '#06b6d4', budgetLimit: 2500 },
  { id: 'c-5', name: 'Зарплата', type: 'income', color: '#10b981' },
  { id: 'c-6', name: 'Фріланс', type: 'income', color: '#22c55e' },
]

const today = new Date()
const isoDate = (d: Date) => d.toISOString().split('T')[0]
const daysAgo = (n: number) => isoDate(new Date(today.getTime() - n * 86400000))

const seedTransactions: Transaction[] = [
  { id: 't-1', type: 'income', amount: 25000, categoryId: 'c-5', description: 'Зарплата листопад', date: daysAgo(5) },
  { id: 't-2', type: 'expense', amount: 1200, categoryId: 'c-1', description: 'Продукти', date: daysAgo(4) },
  { id: 't-3', type: 'expense', amount: 350, categoryId: 'c-2', description: 'Метро', date: daysAgo(3) },
  { id: 't-4', type: 'expense', amount: 800, categoryId: 'c-3', description: 'Кіно з друзями', date: daysAgo(2) },
  { id: 't-5', type: 'income', amount: 3500, categoryId: 'c-6', description: 'Фріланс проєкт', date: daysAgo(1) },
  { id: 't-6', type: 'expense', amount: 2400, categoryId: 'c-4', description: 'Світло + інтернет', date: daysAgo(1) },
]

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set) => ({
      categories: seedCategories,
      transactions: seedTransactions,
      addTransaction: (t) =>
        set((s) => ({ transactions: [{ ...t, id: crypto.randomUUID() }, ...s.transactions] })),
      deleteTransaction: (id) =>
        set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) })),
      addCategory: (c) =>
        set((s) => ({ categories: [...s.categories, { ...c, id: crypto.randomUUID() }] })),
    }),
    { name: 'fintrack-budget' },
  ),
)
