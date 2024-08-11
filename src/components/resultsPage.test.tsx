import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockedColorSearch } from '../__mocks__/mockedPokemons';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import ResultsPage, { getServerSideProps } from '@/pages/color/results';

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

describe('ResultsPage', () => {
  it('renders Main component with correct props', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ResultsPage data={mockedColorSearch} error={false} lastSearch="color/1" />
      </Provider>
    );
    expect(getByText(/Enable/i)).toBeInTheDocument();
  });

  it('should return data and oldUrl when fetch is successful', async () => {
    const context = {
      query: { page: '1' },
      params: { page: 1 },
    };
    const result = await getServerSideProps(context);
    expect(result).toEqual({
      props: {
        currentPage: 1,
        data: {
          id: 1,
          name: 'black',
          names: [
            {
              language: {
                name: 'ja-Hrkt',
                url: 'https://pokeapi.co/api/v2/language/1/',
              },
              name: 'くろいろ',
            },
          ],
          pokemonId: '1',
          pokemon_species: [
            {
              name: 'murkrow',
              url: 'https://pokeapi.co/api/v2/pokemon-species/198/',
            },
          ],
        },
      },
    });
  });
});
