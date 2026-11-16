import { describe, it, expect } from 'vitest'
import { useAuthStore } from './authStore'

describe('Auth Store', () => {
  it('should login successfully with valid data', async () => {
    const store = useAuthStore.getState()
    const success = await store.login('test@test.com', 'password123')
    expect(success).toBe(true)
    expect(useAuthStore.getState().user?.email).toBe('test@test.com')
  })

  it('should fail login with short password', async () => {
    const store = useAuthStore.getState()
    const success = await store.login('test@test.com', '123')
    expect(success).toBe(false)
  })
})
