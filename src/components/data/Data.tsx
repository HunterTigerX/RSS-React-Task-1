export class Data {
  private static instance: Data;
  data: string;
  lastSearch: string | null;
  lastInput: string;
  lastFoundStatus: string | null;
  foundStatus: boolean;
  private constructor() {
    this.data = '';
    this.lastSearch = localStorage.getItem('lastInput');
    this.lastInput = this.lastSearch ? JSON.parse(this.lastSearch) : '';
    this.lastFoundStatus = localStorage.getItem('searchFound');
    this.foundStatus = this.lastFoundStatus ? JSON.parse(this.lastFoundStatus) : false;
  }

  public static checkData() {
    if (!Data.instance) {
      Data.instance = new Data();
    }
    return Data.instance;
  }

  public updateData(newData: string, status: boolean) {
    this.data = newData;
    this.foundStatus = status;
  }

  public updateLastInput(lastSearched: string) {
    this.lastInput = lastSearched;
    localStorage.setItem('lastInput', JSON.stringify(lastSearched));
  }
}
