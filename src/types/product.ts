import {EntityId} from '@reduxjs/toolkit';
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
  comments?: Review[];
};

type ProductInCart = Product & {
  id: EntityId;
  count: number;
};

export type {Product, ProductInCart};
