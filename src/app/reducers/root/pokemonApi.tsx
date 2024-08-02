import { ISearchData, IPokemonCard } from '@/app/interfaces/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  endpoints: (builder) => ({
    getPokemonByColor: builder.query<ISearchData, string>({
      query: (color) => `/pokemon-color/${color.toLowerCase()}`,
    }),
    getPokemonById: builder.query<IPokemonCard, string>({
      query: (id) => `/pokemon-species/${id.toLowerCase()}`,
    }),
  }),
});

export const { useGetPokemonByColorQuery } = pokemonApi;
export const { useGetPokemonByIdQuery } = pokemonApi;
