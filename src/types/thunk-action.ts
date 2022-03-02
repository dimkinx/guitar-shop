import {Action, ThunkAction} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ProductState, ReviewsState, ProductsState, SearchState, SortState, FilterState, CartState} from './state';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, {
  product: ProductState;
  reviews: ReviewsState;
  products: ProductsState;
  search: SearchState;
  sort: SortState;
  filter: FilterState;
  cart: CartState;
}, AxiosInstance, Action>;

export type {ThunkActionResult};
