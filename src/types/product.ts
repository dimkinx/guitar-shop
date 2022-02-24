import {Review} from './review';

type Product = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
  count?: number;
  comments?: Review[];
}

export type {Product};
