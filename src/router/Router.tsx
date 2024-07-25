import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { NotFound, ErrorPage, Main } from '@pages';
import PokemonCard from '@components/card/PokemonCard';
import Results from '@components/results/Results';

const routes: RouteObject[] = [
  {
    children: [
      {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'page/:pageId',
            element: <Results />,
            children: [
              {
                path: 'pokemon/:pokemonId',
                element: <PokemonCard />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes, { basename: '/' });
