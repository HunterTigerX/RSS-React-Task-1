import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'reducers/root/rootReduces';
import App from './App';
import { ThemeProvider } from 'components/themes/themeContect';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

const MockedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<MockedApp />);
  });
  it('renders the App component without crashing', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });
});
