import {State} from '../../types/state';
import {Product} from '../../types/product';
import {StatusType} from '../../enums';
import {createSelector} from 'reselect';

const getProducts = (state: State): Product[] => state.products.products;
const getProductsTotalCount = (state: State): number => state.products.totalCount;
const getProductsStatus = (state: State): StatusType => state.products.status;

const isProductsLoading = createSelector(
  getProductsStatus,
  (status: StatusType): boolean => status === StatusType.Loading,
);

const isProductsSuccess = createSelector(
  getProductsStatus,
  (status: StatusType): boolean => status === StatusType.Success,
);

const isProductsFailure = createSelector(
  getProductsStatus,
  (status: StatusType): boolean => status === StatusType.Failure,
);

export {getProducts, getProductsTotalCount, isProductsLoading, isProductsSuccess, isProductsFailure};
