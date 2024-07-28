import { render, screen } from '@testing-library/react';
import { beforeEach, describe, it, vi } from 'vitest';
import { ErrorPage } from './ErrorPage';
import { Provider } from 'react-redux';
import store from 'reducers/root/rootReduces';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'chai';

vi.mock('react-router-dom');

beforeEach(() => {
  render(<MockedErrorPage />);
});

const MockedErrorPage = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    </Provider>
  );
};

describe('ErrorPage Component', () => {
  it('renders without crashing', () => {
    render(<MockedErrorPage />);
  });
  it('renders without crashing', () => {
    render(<ErrorPage />);
    const errorHeading = screen.getByRole('heading', { name: /oops!/i });
    const errorMessage = screen.getByText(/sorry, an unexpected error has occurred/i);

    expect(errorHeading).to.exist;
    expect(errorMessage).to.exist;
  });
});
