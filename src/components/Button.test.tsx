import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button component', () => {
  it('renders children and handles click', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Тест</Button>)
    const btn = screen.getByText('Тест')
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
