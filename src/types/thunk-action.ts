import {Action, ThunkAction} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ProductsState, SearchState} from './state';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, {products: ProductsState; search: SearchState}, AxiosInstance, Action>;

export type {ThunkActionResult};
