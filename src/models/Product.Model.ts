export enum LoadState {
  Initial,
  Loading,
  LoadSuccessful,
  LoadFailed,
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  createdAt?: string;
}

export enum SortColumnName {
  name = 'name',
  price = 'price',
  createdAt = 'createdAt'
}

export enum OrderBy {
  asc = 'asc',
  desc = 'desc'
}

export const PageLimit = 5;

export interface IUser {
  email: string;
  password: string;
}