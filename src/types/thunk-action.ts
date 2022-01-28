import {Action, ThunkAction} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ProductState, ReviewsState, ProductsState, SearchState, SortState, FilterState} from './state';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, {
  product: ProductState;
  reviews: ReviewsState;
  products: ProductsState;
  search: SearchState;
  sort: SortState,
  filter: FilterState
}, AxiosInstance, Action>;

export type {ThunkActionResult};
