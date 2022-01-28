import {OrderType, SortType, StatusType} from '../enums';
import {Product} from './product';
import {Review} from './review';
import {Namespace} from '../constants';

type ProductState = {
  product: Product | null,
  status: StatusType,
};

type ReviewsState = {
  reviews: Review[],
  totalCount: number,
  status: StatusType,
  postStatus: StatusType,
};

type ProductsState = {
  products: Product[],
  totalCount: number,
  status: StatusType,
};

type SearchState = {
  foundProducts: Product[],
  status: StatusType,
};

type SortState = {
  sortType: SortType | null,
  orderType: OrderType | null,
};

type PriceRangeState = {
  min: number,
  max: number,
};

type FilterState = {
  priceRange: PriceRangeState,
  status: StatusType,
};

type State = {
  [Namespace.Product]: ProductState,
  [Namespace.Reviews]: ReviewsState,
  [Namespace.GetProducts]: ProductsState,
  [Namespace.Search]: SearchState,
  [Namespace.Sort]: SortState,
  [Namespace.Filter]: FilterState,
};

export type {ProductState, ReviewsState, ProductsState, SearchState, SortState, PriceRangeState, FilterState, State};
