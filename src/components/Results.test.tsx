import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Results from './Results';
import store from '../reducers/root/rootReduces';
import { mockedColorSearch } from '../__mocks__/mockedPokemons';

const MockedResults = () => {
  return (
    <Provider store={store}>
      <Results pokemonId={'1'} searchData={mockedColorSearch} />
    </Provider>
  );
};

describe('Results Component', () => {
  it('renders without crashing', () => {
    render(<MockedResults />);
  });
});
