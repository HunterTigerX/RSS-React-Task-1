import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon-species/:id', ({ params }) => {
    const { id } = params;
    if (id <= '0' || id >= '1026') {
      return HttpResponse.json('No results found', { status: 500 });
    }
    return HttpResponse.json('mockedIdSearch', { status: 200 });
  }),

  http.get('https://pokeapi.co/api/v2/pokemon-color/:id', ({ params }) => {
    const { id } = params;
    if (id <= '0' || id > '10') {
      return HttpResponse.json('No results found', { status: 500 });
    }
    return HttpResponse.json('mockedColorSearch', { status: 200 });
  }),
];
