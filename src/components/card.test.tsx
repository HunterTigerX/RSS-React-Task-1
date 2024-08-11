import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PokemonPage, { getServerSideProps } from '@/pages/color/pokemon/card';
import { mockedIdSearch } from '@/__mocks__/mockedPokemons';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => 'http://localhost:3000/color/1/pokemon/114'),
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
    const { getByText } = render(<PokemonPage data={mockedIdSearch} error={false} oldUrl={'/color/1'} />);
    expect(getByText(/Enable/i)).toBeInTheDocument();
  });

  it('should return data and oldUrl when fetch is successful', async () => {
    const context = {
      query: { pokemon: 'pikachu' },
      resolvedUrl: '/pokemon/pikachu',
    };
    const result = await getServerSideProps(context);
    expect(result).toEqual({
      props: {
        data: 'No results found',
        error: false,
        oldUrl: '/',
      },
    });
  });
});
