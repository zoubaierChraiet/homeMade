export interface IUser {
  _id?: string;
  photo?: string;
  firstName: string;
  lastName: string;
  gender?: string;
  type?: string;
  userName?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IDish {
  _id: string;
  photo: string;
  name: string;
  ingridient: string[];
  description: string;
  price: number;
  type: string;
  target: string;
  chef: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMenu {
  _id: string;
  dishes: IDish[];
  available: string[];
  cover: string;
  name: string;
  coockTime: string;
  chef: IUser;
  description: string;
  day: Date;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
