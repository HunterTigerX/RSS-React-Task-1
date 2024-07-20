import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from 'reducers/root/rootReduces.tsx';
import App from './app/App.tsx';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary.tsx';
import { ThemeProvider } from 'components/themes/themeContect';

import './main.css';

const root = document.getElementById('root');

if (root) {
  const dom = ReactDOM.createRoot(root);
  dom.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}
