import type { Transaction } from '../types'

export async function fetchMonobankTransactions(): Promise<Omit<Transaction, 'id'>[]> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const today = new Date().toISOString().split('T')[0]

  return [
    { type: 'expense', amount: 150, categoryId: 'c-1', description: 'Кава (Monobank)', date: today },
    { type: 'expense', amount: 420, categoryId: 'c-2', description: 'Таксі (Monobank)', date: today },
    { type: 'income', amount: 2000, categoryId: 'c-6', description: 'Переказ (Monobank)', date: today },
  ]
}
