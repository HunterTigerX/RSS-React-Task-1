import { IPokemonData } from 'components/results/interfaces';
import { PokemonSpecies } from 'reducers/actions/Interfaces';

export interface ISideAction {
  type: string;
}

export interface IState {
  searchSide: IStateSide;
  searchMain: IStateMain;
}

export interface IStateSide {
  loadingRight: boolean;
  error: null | string;
  pokemonName: string;
  pokemonImage: string;
  pokemonDescription: string;
}

export interface IStateMain {
  pokemonData: null | string;
  isLoading: boolean;
  loadingRight: boolean;
  error: null | string;
  currentPage: number;
  maxPages: number;
  totalPokemons: number;
  colorId: number;
  pokemonsList: PokemonSpecies[];
  pokemonsOnPage: IPokemonData[];
  input: string;
  pokemonsPerPage: number;
  currentPokemonId: number;
  showRightPanel: boolean;
  hasError: boolean;
}

export interface ISearchMainResults {
  name: string;
  id: string;
}
