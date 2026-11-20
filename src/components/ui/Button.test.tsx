import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Подорожувати</Button>);
    expect(screen.getByRole('button', { name: 'Подорожувати' })).toBeInTheDocument();
  });

  it('handles click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Тест</Button>);
    await user.click(screen.getByRole('button', { name: 'Тест' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
