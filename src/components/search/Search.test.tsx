import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'reducers/root/rootReduces';
import Search from '@components/search/Search';

const MockedSearch = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockedSearch />);
  });
});
