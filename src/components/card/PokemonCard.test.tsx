import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import PokemonCard from '@components/card/PokemonCard';

import { Provider } from 'react-redux';
import store from 'reducers/root/rootReduces';

const MockedPokemonCard = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PokemonCard />
      </BrowserRouter>
    </Provider>
  );
};

describe('PokemonCard Component', () => {
  it('renders without crashing', () => {
    render(<MockedPokemonCard />);
  });
});
