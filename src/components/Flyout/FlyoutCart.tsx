import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'reducers/root/rootReduces';
import { MouseEventHandler } from 'react';
import { savePokemonsList } from 'reducers/actions/actions';
import { toggleCart } from 'reducers/actions/cartActions';
import { ICartData, IState } from 'reducers/reducers/Interfaces';
import './FlyoutCart.css';

const FlyoutCart = () => {
  const savedToCart = useSelector((state: IState) => state.cart.savedCartData);
  const somethingInCart = useSelector((state: IState) => state.cart.somethingInCart);
  const dispatch = useDispatch<AppDispatch>();

  const unselectAll: MouseEventHandler<HTMLButtonElement> = () => {
    for (const [key] of Object.entries(savedToCart)) {
      dispatch(toggleCart(key, false));
    }
    dispatch(savePokemonsList());
  };

  const downloadAll: MouseEventHandler<HTMLButtonElement> = async () => {
    const fileName = `${Object.keys(savedToCart).length}_pokemons.csv`;

    const download = (data: BlobPart) => {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
    };

    const jsonToCsv = (jsonObject: ICartData) => {
      const description = `P.S. there were 2 variants of CSV markup, but I chose this\n`;
      const header = `Pokemon name;Pokemon number\n`;
      const keys = Object.keys(jsonObject);
      const data = keys.map((key) => `"${jsonObject[key]}";"${key}"`).join('\n');
      return `${description}${header}${data}`;
    };

    const get = async () => {
      const csvdata = jsonToCsv(savedToCart);
      download(csvdata);
    };
    await get();
  };

  return (
    <>
      {somethingInCart && (
        <div className="flyout_cart">
          <button onClick={unselectAll}>Unselect all</button>
          <div>You have {Object.keys(savedToCart).length} selected items</div>
          <button onClick={downloadAll}>Download</button>
        </div>
      )}
    </>
  );
};

export default FlyoutCart;
