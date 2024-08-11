import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Search from './Search';
import store from '../reducers/root/rootReduces';
import { mockedColorSearch } from '../__mocks__/mockedPokemons';

vi.mock('next/navigation', () => ({
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

const MockedSearch = () => {
  return (
    <Provider store={store}>
      <Search data={mockedColorSearch} error={false} lastSearch="color/1" />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockedSearch />);
  });
});
