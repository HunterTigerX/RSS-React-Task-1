import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ResultsPage from './[page]';
import { mockedColorSearch } from '../__mocks__/mockedPokemons';
import { Provider } from 'react-redux';
import store from '../reducers/root/rootReduces';

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

describe('ResultsPage', () => {
  it('renders Main component with correct props', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ResultsPage data={mockedColorSearch} error={''} />
      </Provider>
    );
    expect(getByText(/Enable/i)).toBeInTheDocument();
  });
});
