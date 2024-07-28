import { ICartData } from '@components/interfaces/interfaces';
import { MouseEventHandler } from 'react';

export const makeNameCapital = (name: string) => {
  if (name && name.length > 0) {
    return name[0].toUpperCase() + name.slice(1);
  }
};

export const getPokemonId = (url: string) => {
  const filter = url.replace('https://pokeapi.co/api/v2/pokemon-species/', '');
  const filtered = filter.slice(0, filter.length - 1);
  return filtered;
};

export const download = (data: BlobPart, fileName: string) => {
  const blob = new Blob([data], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
};

export const jsonToCsv = (cartIDs: string[], jsonObject: ICartData) => {
  const description = `P.S. there were 2 variants of CSV markup, but I chose this\n`;
  const header = `Pokemon number;Pokemon name;Description;URL to Data\n`;
  let data = [];
  for (let i = 0; i < cartIDs.length; i += 1) {
    data.push(`"${jsonObject[cartIDs[i]].replace(/&&/g, '";"').replace(/\n/g, ' ')}"`);
  }

  return `${description}${header}${data.join('\n')}`;
};

export const downloadAll = async (cartIDs: string[], savedToCart: ICartData) => {
  const fileName = `${cartIDs.length}_pokemons.csv`;
  const get = async () => {
    const csvdata = jsonToCsv(cartIDs, savedToCart);
    download(csvdata, fileName);
  };
  await get();
};

export function returnOnlyName(string: string) {
  const splittedName: string = string.split('&&')[0];
  return splittedName;
}

export const setResults = (
  selectedCheckboxes: string[],
  savedToCart: ICartData,
  handleButtonClick: MouseEventHandler<HTMLButtonElement>
) => {
  const results = [];
  for (let i = 0; i < selectedCheckboxes.length; i += 1) {
    const id = selectedCheckboxes[i];
    const value = savedToCart[id];
    const capitalizedName = makeNameCapital(value) || '';
    results.push(
      <div key={`cart${selectedCheckboxes[i]}${value}`} className="cart-element-wrapper">
        <button className="remove-from-cart" data-value={`stored-${id}`} onClick={handleButtonClick}>
          Remove
        </button>
        <div>{returnOnlyName(capitalizedName)}</div>
      </div>
    );
  }
  return results;
};
