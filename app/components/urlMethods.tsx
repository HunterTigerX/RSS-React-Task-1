import { MouseEventHandler } from 'react';
import { ICartData, IPokemonSpecies, ISearchMainResults } from '~/interfaces/interfaces';

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
  const data = [];
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

export function returnPokemonList(
  numberOfPokemons: number,
  pokemonsPerPage: number,
  currentPage: number,
  pokemonsList: IPokemonSpecies[],
  savedCartIds: string[]
) {
  const resultList: ISearchMainResults[] = [];
  const start = (currentPage - 1) * pokemonsPerPage;
  const isArray = Array.isArray(pokemonsList);
  if (isArray && pokemonsList.length > 0) {
    for (let i = start; i < start + numberOfPokemons; i += 1) {
      if (pokemonsList[i]) {
        const pokemonId = getPokemonId(pokemonsList[i].url);
        resultList.push({
          name: pokemonsList[i].name,
          id: pokemonId,
          checkBox: savedCartIds.includes(pokemonId) ? true : false,
        });
      }
    }
  }
  return resultList;
}

export async function returnPokemonData(pokemonId: string, pokemonData: ICartData) {
  if (!Object.prototype.hasOwnProperty.call(pokemonData, pokemonId)) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
      const data = await res.json();
      return data;
    } catch {
      return {
        props: { error: 'The pokemon you were looking were not found' },
      };
    }
  }
}
