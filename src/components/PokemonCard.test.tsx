import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import PokemonCard from './PokemonCard';
import store from '../reducers/root/rootReduces';
import { mockedIdSearch } from '../__mocks__/mockedPokemons';

const MockedPokemonCard = () => {
  return (
    <Provider store={store}>
      <PokemonCard data={mockedIdSearch} oldUrl={''} />
    </Provider>
  );
};

describe('PokemonCard Component', () => {
  it('renders without crashing', () => {
    render(<MockedPokemonCard />);
  });
});
