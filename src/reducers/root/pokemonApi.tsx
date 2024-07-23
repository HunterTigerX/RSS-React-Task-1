import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISearchData } from 'reducers/actions/Interfaces';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  endpoints: (builder) => ({
    getPokemonByColor: builder.query<ISearchData, string>({
      query: (color) => `/pokemon-color/${color.toLowerCase()}`,
    }),
    getPokemonById: builder.query<ISearchData, string>({
      query: (id) => `/pokemon-species/${id.toLowerCase()}`,
    }),
  }),
});

export const { useGetPokemonByColorQuery } = pokemonApi;
export const { useGetPokemonByIdQuery } = pokemonApi;
