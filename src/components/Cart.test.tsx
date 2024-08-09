import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import store from '../reducers/root/rootReduces';
import Cart from './Cart';
import { render, screen } from '@testing-library/react';

const MockedCart = () => {
  return (
    <Provider store={store}>
      <Cart />
    </Provider>
  );
};

beforeEach(() => {
  vi.mock('react-router-dom', async () => {
    const router = await vi.importActual('react-router-dom');
    const mockSavedToCart = { 1: 'bulbasaur', 2: 'charmander' };
    const mockSomethingInCart = true;

    return {
      ...router,
      handleButtonClick: vi.fn(),
      useDispatch: vi.fn(),
      useSelector: vi.fn((selector) =>
        selector({ cart: { savedCartData: mockSavedToCart, somethingInCart: mockSomethingInCart } })
      ),
    };
  });
});

describe('PokemonCard Component', () => {
  it('renders without crashing', () => {
    render(<MockedCart />);
  });

  it('renders cart component with saved items', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.queryByText('Here is your cart'));
    expect(screen.queryByText('Remove'));
    expect(screen.queryByText('bulbasaur'));
  });
});
