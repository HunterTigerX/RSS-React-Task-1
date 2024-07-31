import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { changePage } from '@/reducers/actions/actions';
import store from '@/reducers/root/rootReduces';
import Pagination from './Pagination';

const MockedPagination = () => {
  return (
    <Provider store={store}>
      <Pagination />
    </Provider>
  );
};

describe('Pagination Component', () => {
  it('renders without crashing', () => {
    render(<MockedPagination />);
  });

  it('test'),
    () => {
      const mockDispatch = vi.fn();
      const mockUseSelector = vi.fn();

      vi.mock('react-router-dom', async () => {
        const router = await vi.importActual('react-router-dom');
        const mockSavedToCart = { 1: 'bulbasaur', 2: 'charmander' };
        const mockSomethingInCart = true;

        return {
          ...router,
          ...vi.importActual('react-router-dom'),
          handleButtonClick: vi.fn(),
          useDispatch: vi.fn(),
          useSelector: vi.fn((selector) =>
            selector({ cart: { savedCartData: mockSavedToCart, somethingInCart: mockSomethingInCart } })
          ),
        };
      });

      mockUseSelector.mockReturnValueOnce({
        searchMain: {
          maxPages: 5,
          savedInput: 'type=electric',
          pokemonsOnPage: [{ id: 1, name: 'Pikachu' }],
          currentPage: 1,
        },
      });

      render(<MockedPagination />);
      const nextButton = screen.getByTestId('ulPagination');
      expect(nextButton).toBe('1');
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith(changePage(2));
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'SAVE_CURRENT_POKEMONS', payload: true });
      expect(screen.getByText('2').parentElement).toHaveClass('boldPagination');
    };
});
