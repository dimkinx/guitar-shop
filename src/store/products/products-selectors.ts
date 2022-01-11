import {State} from '../../types/state';
import {Product} from '../../types/product';
import {StatusType} from '../../enums';

const getProducts = (state: State): Product[] => state.products.products;
const getProductsTotalCount = (state: State): number => state.products.totalCount;
const isProductsLoading = (state: State): boolean => state.products.status === StatusType.Loading;
const isProductsSuccess = (state: State): boolean => state.products.status === StatusType.Success;
const isProductsFailure = (state: State): boolean => state.products.status === StatusType.Failure;

export {getProducts, getProductsTotalCount, isProductsLoading, isProductsSuccess, isProductsFailure};
