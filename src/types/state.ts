import {StatusType} from '../enums';
import {Product} from './product';

type ProductsState = {
  products: Product[],
  status: StatusType,
};

type SearchState = {
  products: Product[],
  status: StatusType,
};

type State = {
  products: ProductsState,
  search: SearchState,
};

export type {ProductsState, SearchState, State};
