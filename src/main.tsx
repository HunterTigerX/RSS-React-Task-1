import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import store from 'reducers/root/rootReduces.tsx';
import './index.css';

const root = document.getElementById('root');

if (root) {
  const dom = ReactDOM.createRoot(root);
  dom.render(
    <React.StrictMode>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </React.StrictMode>
  );
}
