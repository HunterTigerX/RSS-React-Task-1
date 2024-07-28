import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import store from 'reducers/root/rootReduces';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from './NotFound';

vi.mock('react-router-dom');

const MockedNotFound = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    </Provider>
  );
};

describe('NotFound Component', () => {
  it('renders without crashing', () => {
    render(<MockedNotFound />);
  });
});
