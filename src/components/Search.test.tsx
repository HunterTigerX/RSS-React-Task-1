import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Search from './Search';
import store from '@/reducers/root/rootReduces';

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
