import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import FlyoutCart from './FlyoutCart';
import store from '@/reducers/root/rootReduces';

const MockedFlyoutCart = () => {
  return (
    <Provider store={store}>
      <FlyoutCart />
    </Provider>
  );
};

describe('FlyoutCart Component', () => {
  it('renders without crashing', () => {
    render(<MockedFlyoutCart />);
  });
});
