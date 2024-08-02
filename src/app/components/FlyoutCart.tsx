'use client';
import { IState } from '@/app/interfaces/interfaces';
import { savePokemonsList } from '@/app/reducers/actions/actions';
import { addToCart } from '@/app/reducers/actions/cartActions';
import { AppDispatch } from '@/app/reducers/root/rootReduces';
import { MouseEventHandler } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { downloadAll } from './urlMethods';

const FlyoutCart = () => {
  const savedToCart = useSelector((state: IState) => state.cart.savedCartData);
  const somethingInCart = useSelector((state: IState) => state.cart.somethingInCart);
  const savedCartIds = useSelector((state: IState) => state.searchMain.savedCartIds);
  const dispatch = useDispatch<AppDispatch>();

  const downloadAllX: MouseEventHandler<HTMLButtonElement> = () => {
    downloadAll(savedCartIds, savedToCart);
  };

  const unselectAll: MouseEventHandler<HTMLButtonElement> = () => {
    for (let i = 0; i < savedCartIds.length; i += 1) {
      dispatch(addToCart(savedCartIds[i], false));
    }
    dispatch(savePokemonsList());
  };

  return (
    <>
      {somethingInCart && (
        <div className="flyout_cart">
          <button onClick={unselectAll}>Unselect all</button>
          <div>You have {savedCartIds.length} selected items</div>
          <button onClick={downloadAllX}>Download</button>
        </div>
      )}
    </>
  );
};

export default FlyoutCart;
