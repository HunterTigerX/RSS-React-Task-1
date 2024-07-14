import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { Main, NotFound, ErrorPage } from '../../pages';

const routes: RouteObject[] = [
  {
    children: [
      {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'contacts/:contactId',
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
