import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi, describe, it, expect } from 'vitest';
import { mockedColorSearch } from '~/__mocks__/mockedPokemons';
import ResultsPage from '~/components/ResultsPage';
import store from '~/reducers/root/rootReduces';
import { BrowserRouter } from 'react-router-dom';

vi.mock('react-router', () => ({
  usePathname: vi.fn(() => 'http://localhost:3000/color/1/pokemon/114'),
  useRouter: vi.fn(),
  useNavigate: vi.fn(),
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
      <BrowserRouter>
        <Provider store={store}>
          <ResultsPage data={mockedColorSearch} error={false} lastSearch={'color/1'} />
        </Provider>
      </BrowserRouter>
    );
    expect(getByText(/Enable/i)).toBeInTheDocument();
  });
});
