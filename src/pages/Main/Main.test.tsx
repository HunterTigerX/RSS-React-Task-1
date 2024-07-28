import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import store from 'reducers/root/rootReduces';
import { BrowserRouter } from 'react-router-dom';
import { Main } from './Main';

vi.mock('react-router-dom');

const MockedMain = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
};

describe('Main Component', () => {
  it('renders without crashing', () => {
    render(<MockedMain />);
  });
});
