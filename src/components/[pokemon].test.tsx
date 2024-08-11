import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockedIdSearch } from '../__mocks__/mockedPokemons';
import PokemonPage from '../../pages/page/[page]/pokemon/[pokemon]';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => 'http://localhost:3000/page/1/pokemon/114'),
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
    const { getByText } = render(<PokemonPage data={mockedIdSearch} oldUrl={''} />);
    expect(getByText(/Enable/i)).toBeInTheDocument();
  });
});
