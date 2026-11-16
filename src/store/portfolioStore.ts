import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Asset } from '../types'

interface PortfolioState {
  assets: Asset[]
  addAsset: (a: Omit<Asset, 'id'>) => void
  removeAsset: (id: string) => void
}

const seedAssets: Asset[] = [
  { id: 'a-1', name: 'Apple Inc.', type: 'stock', ticker: 'AAPL', quantity: 10, purchasePrice: 150, currentPrice: 180 },
  { id: 'a-2', name: 'Bitcoin', type: 'crypto', ticker: 'BTC', quantity: 0.05, purchasePrice: 60000, currentPrice: 65000 },
  { id: 'a-3', name: 'Ощадний рахунок', type: 'deposit', quantity: 1, purchasePrice: 10000, currentPrice: 10500 },
]

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      assets: seedAssets,
      addAsset: (a) => set((s) => ({ assets: [...s.assets, { ...a, id: crypto.randomUUID() }] })),
      removeAsset: (id) => set((s) => ({ assets: s.assets.filter((a) => a.id !== id) })),
    }),
    { name: 'fintrack-portfolio' },
  ),
)
