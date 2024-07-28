import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Results from '@components/results/Results';
import PokemonCard from '@components/card/PokemonCard';
import { Main, NotFound } from '@pages';
import { describe, it } from 'vitest';
import { Provider } from 'react-redux';
import store from 'reducers/root/rootReduces';

describe('Router', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders Results component on /page/:pageId path', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/page/1?black']}>
          <Routes>
            <Route path="page/:pageId" element={<Results />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders PokemonCard component on /page/:pageId/pokemon/:pokemonId path', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/page/1/pokemon/25']}>
          <Routes>
            <Route path="page/:pageId/pokemon/:pokemonId" element={<PokemonCard />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders NotFound component on unknown path', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown']}>
          <Routes>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
});
