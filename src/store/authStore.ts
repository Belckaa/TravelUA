import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types'

interface AuthState {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email, password) => {
        if (!email || password.length < 6) return false
        await new Promise((r) => setTimeout(r, 250))
        set({ user: { id: crypto.randomUUID(), email, name: email.split('@')[0] } })
        return true
      },
      register: async (email, password, name) => {
        if (!email || password.length < 6 || !name) return false
        await new Promise((r) => setTimeout(r, 250))
        set({ user: { id: crypto.randomUUID(), email, name } })
        return true
      },
      logout: () => set({ user: null }),
    }),
    { name: 'fintrack-auth' },
  ),
)
