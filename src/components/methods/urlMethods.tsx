import { ICartData } from '@components/interfaces/interfaces';

export const makeNameCapital = (name: string) => {
  if (name.length > 0) {
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

export const jsonToCsv = (jsonObject: ICartData) => {
  const description = `P.S. there were 2 variants of CSV markup, but I chose this\n`;
  const header = `Pokemon number;Pokemon name;Description;URL to Data\n`;
  const keys = Object.keys(jsonObject);
  const data = keys
    .map((key) => {
      const result = `"${key}";"${jsonObject[key].replace(/&&/g, '";"').replace(/\n/g, ' ')}"`;
      return result;
    })
    .join('\n');
  return `${description}${header}${data}`;
};

export const downloadAll = async (savedToCart: ICartData) => {
  const fileName = `${Object.keys(savedToCart).length}_pokemons.csv`;
  const get = async () => {
    const csvdata = jsonToCsv(savedToCart);
    download(csvdata, fileName);
  };
  await get();
};

export function returnOnlyName(string: string) {
  const splittedName: string = string.split('&&')[0];
  return splittedName;
}
