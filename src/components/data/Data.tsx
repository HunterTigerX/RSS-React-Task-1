import { IPokemonData } from './interfaces';

export class Data {
  private static instance: Data;
  data: string;
  lastSearch: string | null;
  lastInput: string;
  lastFoundStatus: string | null;
  foundStatus: boolean;
  pages: number;
  cardInfo: IPokemonData;
  hideRightPage: boolean;
  private constructor() {
    this.data = '';
    this.lastSearch = localStorage.getItem('lastInput');
    this.lastInput = this.lastSearch ? JSON.parse(this.lastSearch) : '';
    this.lastFoundStatus = localStorage.getItem('searchFound');
    this.foundStatus = this.lastFoundStatus ? JSON.parse(this.lastFoundStatus) : false;
    this.pages = 1;
    this.cardInfo = { name: '', description: '', image: '' };
    this.hideRightPage = true;
  }

  public static checkData() {
    if (!Data.instance) {
      Data.instance = new Data();
    }
    return Data.instance;
  }

  public updateCard(newData: IPokemonData) {
    this.cardInfo.name = newData.name;
    this.cardInfo.description = newData.description;
    this.cardInfo.image = newData.image;
  }

  public updateData(newData: string, status: boolean, numberOfPages: number) {
    this.data = newData;
    this.foundStatus = status;
    this.pages = numberOfPages;
  }

  public updateLastInput(lastSearched: string) {
    this.lastInput = lastSearched;
    localStorage.setItem('lastInput', JSON.stringify(lastSearched));
  }
}
