import { render, screen } from '@testing-library/react';
import store from '@/app/reducers/root/rootReduces';
import { ThemeProvider } from '@/app/themes/themeContect';
import { Provider } from 'react-redux';
import { describe, it, expect, vi } from 'vitest';
import Home from './page';
import '@testing-library/jest-dom';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));
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
