import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'reducers/root/rootReduces';
import { MouseEventHandler } from 'react';
import { savePokemonsList } from 'reducers/actions/actions';
import { toggleCart } from 'reducers/actions/cartActions';
import { IState } from '@components/interfaces/interfaces';
import { downloadAll } from '@components/methods/urlMethods';
import './FlyoutCart.css';

const FlyoutCart = () => {
  const savedToCart = useSelector((state: IState) => state.cart.savedCartData);
  const somethingInCart = useSelector((state: IState) => state.cart.somethingInCart);
  const dispatch = useDispatch<AppDispatch>();

  const downloadAllX: MouseEventHandler<HTMLButtonElement> = () => {
    downloadAll(savedToCart);
  };
  const unselectAll: MouseEventHandler<HTMLButtonElement> = () => {
    for (const [key] of Object.entries(savedToCart)) {
      dispatch(toggleCart(key, false));
    }
    dispatch(savePokemonsList());
  };

  return (
    <>
      {somethingInCart && (
        <div className="flyout_cart">
          <button onClick={unselectAll}>Unselect all</button>
          <div>You have {Object.keys(savedToCart).length} selected items</div>
          <button onClick={downloadAllX}>Download</button>
        </div>
      )}
    </>
  );
};

export default FlyoutCart;
