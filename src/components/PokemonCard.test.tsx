import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import PokemonCard from './PokemonCard';
import store from '@/reducers/root/rootReduces';

const MockedPokemonCard = () => {
  return (
    <Provider store={store}>
      <PokemonCard />
    </Provider>
  );
};

describe('PokemonCard Component', () => {
  it('renders without crashing', () => {
    render(<MockedPokemonCard />);
  });
});
