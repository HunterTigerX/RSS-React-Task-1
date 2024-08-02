import { handlers } from './handlers';
import { setupServer } from 'msw/node';
import { mockedIdSearch, mockedColorSearch } from './mockedPokemons';
import { beforeAll, afterAll, afterEach, describe, it, expect } from 'vitest';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Handlers', () => {
  it('should return mockedIdSearch for valid id in id endpoint', async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/1');
    const data = await response.json();
    expect(data).toEqual(mockedIdSearch);
  });

  it('should return mockedColorSearch for valid id in color endpoint', async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-color/1');
    const data = await response.json();
    expect(data).toEqual(mockedColorSearch);
  });

  it('should return error for invalid id in id endpoint', async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/0');
    expect(response.status).toBe(500);
  });

  it('should return error for invalid id in color endpoint', async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-color/11');
    expect(response.status).toBe(500);
  });
});
