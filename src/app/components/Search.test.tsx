import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Search from './Search';
import store from '@/app/reducers/root/rootReduces';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const MockedSearch = () => {
  return (
    <Provider store={store}>
      <Search />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockedSearch />);
  });
});
