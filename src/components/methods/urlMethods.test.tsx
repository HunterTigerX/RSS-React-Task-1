import {
  download,
  downloadAll,
  getPokemonId,
  jsonToCsv,
  makeNameCapital,
  returnOnlyName,
  setResults,
} from './urlMethods';
import { describe, it, expect, vi } from 'vitest';

const mockedCart = {
  '1': 'bulbasaur',
};
const expectedCcvContent =
  'P.S. there were 2 variants of CSV markup, but I chose this\nPokemon number;Pokemon name;Description;URL to Data\n"1";"bulbasaur"';
const expectedDownloadData =
  'data P.S. there were 2 variants of CSV markup, but I chose this\nPokemon number;Pokemon name;Description;URL to Data\n"breloom";"286"\n"roselia";"315"';

describe('download', () => {
  global.URL.createObjectURL = vi.fn();
  it('test', () => {
    global.URL.createObjectURL = vi.fn(() => 'details');
  });
});

describe('Location Data Functions', () => {
  it('should return undefined for an empty string', () => {
    const result = makeNameCapital('bulbasaur');
    expect(result).toBe('Bulbasaur');
  });

  it('should return pokemon id from url', () => {
    const result = getPokemonId('https://pokeapi.co/api/v2/pokemon-species/1/');
    expect(result).toBe('1');
  });
  it('should return pokemon id from url', () => {
    const result = jsonToCsv(mockedCart);
    expect(result).toBe(expectedCcvContent);
  });

  it('download calls download with correct parameters', async () => {
    const data = new Blob([expectedDownloadData], { type: 'text/csv' });
    const fileName = 'test.csv';
    const createElementSpy = vi.spyOn(document, 'createElement');
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click');
    download(data, fileName);
    expect(createElementSpy).toBeCalledWith('a');
    expect(clickSpy).toHaveBeenCalledTimes(1);
    createElementSpy.mockRestore();
    clickSpy.mockRestore();
  });

  it('downloads all data', async () => {
    await downloadAll(mockedCart);
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click');
    expect(clickSpy).toHaveBeenCalledTimes(0);
  });

  it('downloads all data', async () => {
    const mockValue = 'mockedCart&&notImportant';
    const expectedResult = 'mockedCart';
    const result = returnOnlyName(mockValue);
    expect(result).toBe(expectedResult);
  });

  it('should return an array of elements with correct structure', () => {
    const savedToCart = {
      name: 'bulbasaur',
    };

    const handleButtonClick = vi.fn();

    const result = setResults(savedToCart, handleButtonClick);
    expect(result).toHaveLength(Object.keys(savedToCart).length);

    result.forEach((element) => {
      expect(element.type).toBe('div');
      expect(element.props.className).toBe('cart-element-wrapper');
      const button = element.props.children[0];
      expect(button.type).toBe('button');
      expect(button.props.className).toBe('remove-from-cart');
      expect(button.props['data-value']).toBe(`stored-name`);
      expect(button.props.onClick).toBe(handleButtonClick);
      const div = element.props.children[1];
      expect(div.type).toBe('div');
    });
  });
});
