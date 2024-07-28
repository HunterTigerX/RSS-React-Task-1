import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'reducers/root/rootReduces';
import FlyoutCart from '@components/flyout/FlyoutCart';

const MockedFlyoutCart = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <FlyoutCart />
      </BrowserRouter>
    </Provider>
  );
};

describe('FlyoutCart Component', () => {
  it('renders without crashing', () => {
    render(<MockedFlyoutCart />);
  });
});
