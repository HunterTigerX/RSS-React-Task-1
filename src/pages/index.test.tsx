import { render, screen } from '@testing-library/react';
import store from '@/reducers/root/rootReduces';
import { ThemeProvider } from '@/themes/themeContect';
import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';
import Home from '.';
import '@testing-library/jest-dom';

const MockedApp = () => {
  return <Home />;
};

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<MockedApp />);
  });
  it('renders the App component without crashing', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });
});
