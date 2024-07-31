import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PokemonPage from './[pageId]/pokemon/[pokemonId]';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    query: {
      pageId: '1',
      pokemonId: '25',
    },
  })),
}));

describe('PokemonPage', () => {
  it('renders Main component with correct props', () => {
    const { getByText } = render(<PokemonPage />);
    expect(getByText(/Enable/i)).toBeInTheDocument();
  });
});
