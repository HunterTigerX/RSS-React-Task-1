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

export interface ICurrentUrlData {
  color: string | null;
  page: number;
}
