export interface IHooksFormData extends IData {
  image: File;
}

export interface IDataImageString extends IData {
  image: string | ArrayBuffer;
}

export interface IData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted: boolean;
  country: string;
}
