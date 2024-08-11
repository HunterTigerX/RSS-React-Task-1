export type onCardChangedFunction = () => void;

export interface IPokemonData {
  name: string;
  description: string;
  image: string;
}

export interface IPokemonData {
  id: string;
  name: string;
  location: string;
  checkBox: boolean;
}

export type onPageChangedFunction = () => void;

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

export interface ISearchData extends ISearchDataBasic {
  pokemonId: string;
}

export interface ISearchDataBasic {
  id: number;
  name: string;
  names: Name[];
  pokemon_species: PokemonSpecies[];
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

export interface IPokemonCard extends IPokemonCardBasic {
  pokemonId: string;
}

export interface IColor {
  name: string;
}

export interface IPokemonCardBasic {
  flavor_text_entries: FlavorTextEntry[];
  id: number;
  name: string;
  color: IColor;
}

export interface IPokemonCardData {
  data: IPokemonCard;
}

export interface IErrorMessage {
  message: string;
}

export interface ISideAction {
  type: string;
}

export interface IState {
  searchSide: IStateSide;
  searchMain: IStateMain;
  cart: IStateCart;
}

export interface IStateCart {
  savedCartData: ICartData;
  somethingInCart: boolean;
}

export interface ICartData {
  [id: string]: string;
}

export interface IStateSide {
  linkClicked: boolean;
  loadingRight: boolean;
  overlayStatus: boolean;
  error: null | string;
  pokemonName: string;
  pokemonImage: string;
  pokemonDescription: string;
}

export interface IStateMain {
  pokemonData: null | string;
  isLoading: boolean;
  error: null | string;
  currentPage: number;
  maxPages: number;
  totalPokemons: number;
  colorId: number;
  pokemonsList: PokemonSpecies[];
  pokemonsOnPage: IPokemonData[];
  savedInput: string;
  pokemonsPerPage: number;
  currentPokemonId: number;
  showRightPanel: boolean;
  hasError: boolean;
  savedCartIds: string[];
  currentInput: string;
}

export interface ISearchMainResults {
  name: string;
  id: string;
  checkBox: boolean;
}

export interface ICartPayload {
  pokemonId: string;
  pokemonName: string;
  action: boolean;
  flavor_text_entries: FlavorTextEntry[];
  id: number;
  name: string;
}

interface ILanguage {
  name: string;
  url: string;
}

interface IName {
  language: ILanguage;
  name: string;
}

export interface IPokemon {
  id: number;
  name: string;
  names: IName[];
  pokemon_species: IPokemonSpecies[];
}

export interface ICheckboxData {
  checked: boolean;
  pokemonId: string | null;
}

export interface MainProps {
  pageId: string | string[] | undefined;
  pokemonId: string | string[] | undefined;
  searchData: ISearchDataBasic;
}

export interface SideProps {
  pokemonId: string | string[] | undefined;
  searchData: ISearchDataBasic;
  error: boolean;
}

export interface SearchProps {
  data: ISearchDataBasic;
  error: boolean;
  lastSearch: string;
}

export interface IPageContextQuery {
  [key: string]: string;
}
