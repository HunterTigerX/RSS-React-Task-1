import { render, screen } from '@testing-library/react';
import { beforeEach, describe, it, vi } from 'vitest';
import { ErrorPage } from './ErrorPage';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import store from '@/reducers/root/rootReduces';

vi.mock('react-router-dom');

const MockedErrorPage = () => {
  return (
    <Provider store={store}>
      <ErrorPage />
    </Provider>
  );
};

describe('ErrorPage Component', () => {
  beforeEach(() => {
    render(<MockedErrorPage />);
  });

  it('renders without crashing', () => {
    const errorHeading = screen.getByRole('heading', { name: /Oops!/i });
    const errorMessage = screen.getByText(/sorry, an unexpected error has occurred/i);

    expect(errorHeading).to.exist;
    expect(errorMessage).to.exist;
  });
});
