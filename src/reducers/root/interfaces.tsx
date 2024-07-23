interface ILanguage {
  name: string;
  url: string;
}

interface IName {
  language: ILanguage;
  name: string;
}

interface IPokemonSpecies {
  name: string;
  url: string;
}

export interface IPokemon {
  id: number;
  name: string;
  names: IName[];
  pokemon_species: IPokemonSpecies[];
}
