import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { Main, NotFound } from '../../pages';

const routes: RouteObject[] = [
  {
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes, { basename: '/' });
