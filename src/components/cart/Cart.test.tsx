import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import store from 'reducers/root/rootReduces';
import Cart from '@components/cart/Cart';
import { render, screen } from '@testing-library/react';

const MockedCart = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    </Provider>
  );
};

beforeEach(() => {
  vi.mock('react-router-dom', async () => {
    const router = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
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
