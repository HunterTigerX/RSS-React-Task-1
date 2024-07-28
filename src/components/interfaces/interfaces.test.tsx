import {
  IPokemonData,
  IPokemonSpecies,
  IErrorMessage,
  onPageChangedFunction,
  onCardChangedFunction,
} from '@components/interfaces/interfaces';
import { describe, it, expect } from 'vitest';

describe('Type and Interface Tests', () => {
  it('should create a valid IPokemonData object', () => {
    const pokemonData: IPokemonData = {
      id: '1',
      name: 'Pikachu',
      location: 'Kanto',
      checkBox: true,
      description: '2',
      image: '3',
    };

    expect(typeof pokemonData.id).toBe('string');
    expect(pokemonData.name).toBe('Pikachu');
    expect(pokemonData.location).toBe('Kanto');
    expect(pokemonData.checkBox).toBe(true);
    expect(pokemonData.description).toBe('2');
    expect(pokemonData.image).toBe('3');
  });

  it('should create a valid IPokemonSpecies object', () => {
    const pokemonSpecies: IPokemonSpecies = {
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    };

    expect(pokemonSpecies.name).toBe('Pikachu');
    expect(pokemonSpecies.url).toBe('https://pokeapi.co/api/v2/pokemon/25/');
  });

  it('should create a valid IErrorMessage object', () => {
    const errorMessage: IErrorMessage = {
      message: 'An error occurred',
    };

    expect(errorMessage.message).toBe('An error occurred');
  });
});

describe('onPageChangedFunction type', () => {
  it('should be a function', () => {
    const onPageChanged: onPageChangedFunction = () => {};

    expect(typeof onPageChanged).toBe('function');
  });
});

describe('onPageChangedFunction type', () => {
  it('should be a function', () => {
    const onCardChanged: onCardChangedFunction = () => {};

    expect(typeof onCardChanged).toBe('function');
  });
});
