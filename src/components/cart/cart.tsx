import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'reducers/root/rootReduces';
import { MouseEventHandler } from 'react';
import { makeNameCapital, returnOnlyName } from '@components/methods/urlMethods';
import { savePokemonsList } from 'reducers/actions/actions';
import { toggleCart } from 'reducers/actions/cartActions';
import { IState } from '@components/interfaces/interfaces';
import './Cart.css';

const Cart = () => {
  const savedToCart = useSelector((state: IState) => state.cart.savedCartData);
  const somethingInCart = useSelector((state: IState) => state.cart.somethingInCart);

  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const hiddenId = event.currentTarget.getAttribute('data-value');
    if (hiddenId) {
      const pokemonId = hiddenId.replace('stored-', '');
      dispatch(toggleCart(pokemonId, false));
      dispatch(savePokemonsList());
    }
  };

  const setResults = () => {
    const results = [];
    for (const [key, value] of Object.entries(savedToCart)) {
      const capitalizedName = makeNameCapital(value) || '';
      results.push(
        <div key={`cart${key}${value}`} className="cart-element-wrapper">
          <button className="remove-from-cart" data-value={`stored-${key}`} onClick={handleButtonClick}>
            Remove
          </button>
          <div>{returnOnlyName(capitalizedName)}</div>
        </div>
      );
    }
    return results;
  };

  return (
    <>
      {' '}
      {somethingInCart && (
        <div className="cart">
          <h2>Here is your cart</h2>
          {setResults()}
        </div>
      )}
    </>
  );
};

export default Cart;
