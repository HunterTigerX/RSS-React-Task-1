import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../reducers/root/rootReduces';
import Pagination from './Pagination';
import { mockedColorSearch } from '~/__mocks__/mockedPokemons';

const MockedPagination = () => {
  return (
    <Provider store={store}>
      <Pagination data={mockedColorSearch} error={false} />
    </Provider>
  );
};

describe('Pagination Component', () => {
  it('renders without crashing', () => {
    render(<MockedPagination />);
  });
});
