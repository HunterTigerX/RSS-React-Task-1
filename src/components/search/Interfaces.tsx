export interface IPokemonData {
  name: string;
  description: string;
  image: string;
}

export interface IPokemonSpecies {
  name: string;
  url: string;
}

export type OnSearchEndFunction = () => void;