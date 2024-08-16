import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from 'reducers/root/rootReduces.tsx';
import { router } from '@router';
import { RouterProvider } from 'react-router-dom';
import './main.css';

const mockElement: HTMLElement = document.createElement('div');
const root = document.getElementById('root');

export function renderPage(rootElement: HTMLElement) {
  const dom = ReactDOM.createRoot(rootElement);
  dom.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
  return '1';
}
renderPage(root ? root : mockElement);
