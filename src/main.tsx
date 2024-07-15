import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';

import './index.css';

const root = document.getElementById('root');

if (root) {
  const dom = ReactDOM.createRoot(root);
  dom.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
