export interface User {
  id: string
  email: string
  name: string
}

export type TransactionType = 'income' | 'expense'

export interface Category {
  id: string
  name: string
  type: TransactionType
  color: string
  budgetLimit?: number
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  categoryId: string
  description: string
  date: string
}

export type AssetType = 'stock' | 'crypto' | 'deposit' | 'bond' | 'etf'

export interface Asset {
  id: string
  name: string
  type: AssetType
  ticker?: string
  quantity: number
  purchasePrice: number
  currentPrice: number
}
