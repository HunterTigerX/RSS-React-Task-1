import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import PokemonCard from './PokemonCard';
import store from '../reducers/root/rootReduces';
import { mockedIdSearch } from '../__mocks__/mockedPokemons';
import { ThemeProvider } from '~/themes/themeContect';
import { BrowserRouter } from 'react-router-dom';

const MockedPokemonCard = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <div className={'light'}>
            <PokemonCard data={mockedIdSearch} oldUrl={'color/1'} error={false} />
          </div>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

describe('PokemonCard Component', () => {
  it('renders without crashing', () => {
    render(<MockedPokemonCard />);
  });
});
