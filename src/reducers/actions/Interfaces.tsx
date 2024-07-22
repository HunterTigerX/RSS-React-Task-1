interface Language {
  name: string;
  url: string;
}

interface Name {
  language: Language;
  name: string;
}

export interface PokemonSpecies {
  name: string;
  url: string;
}

export interface ISearchData {
  id: number;
  name: string;
  names: Name[];
  pokemon_species: PokemonSpecies[];
  input: string;
  pokemonsPerPage: number;
  totalPokemons: number;
  pokemonId: string;
}

export interface ISearchPayload {
  data: ISearchData;
}

export interface IPayload {
  error: IErrorMessage;
}

interface FlavorTextEntry {
  flavor_text: string;
}

export interface IPokemonCard {
  flavor_text_entries: FlavorTextEntry[];
  id: number;
  name: string;
  pokemonId: string;
}

export interface IPokemonCardData {
  data: IPokemonCard;
}

export interface IErrorMessage {
  message: string;
}
