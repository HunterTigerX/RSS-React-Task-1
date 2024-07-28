import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'reducers/root/rootReduces';
import { MouseEventHandler } from 'react';
import { setResults } from '@components/methods/urlMethods';
import { savePokemonsList } from 'reducers/actions/actions';
import { addToCart } from 'reducers/actions/cartActions';
import { IState } from '@components/interfaces/interfaces';
import './Cart.css';

const Cart = () => {
  const selectedCheckboxes = useSelector((state: IState) => state.searchMain.savedCartIds);
  const savedToCartData = useSelector((state: IState) => state.cart.savedCartData);
  const somethingInCart = useSelector((state: IState) => state.cart.somethingInCart);

  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const hiddenId = event.currentTarget.getAttribute('data-value');
    if (hiddenId) {
      const pokemonId = hiddenId.replace('stored-', '');
      dispatch(addToCart(pokemonId, false));
      dispatch(savePokemonsList());
    }
  };

  return (
    <>
      {' '}
      {somethingInCart && (
        <div className="cart">
          <h2>Here is your cart</h2>
          {somethingInCart && setResults(selectedCheckboxes, savedToCartData, handleButtonClick)}
        </div>
      )}
    </>
  );
};

export default Cart;
