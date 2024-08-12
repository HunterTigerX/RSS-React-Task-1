import Main from '@components/Main/Main';
import UncontrolledForm from '@components/UncontrolledForm/UncontrolledForm';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: 'uncontrolled-form',
        element: <UncontrolledForm />,
      },
      {
        path: 'hook-form',
        element: <UncontrolledForm />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes, { basename: '/' });
