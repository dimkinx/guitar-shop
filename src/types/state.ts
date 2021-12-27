import {StatusType} from '../enums';
import {Product} from './product';
import {Namespace} from '../constants';

type ProductsState = {
  products: Product[],
  status: StatusType,
};

type SearchState = {
  foundProducts: Product[],
  status: StatusType,
};

type State = {
  [Namespace.Products]: ProductsState,
  [Namespace.Search]: SearchState,
};

export type {ProductsState, SearchState, State};
