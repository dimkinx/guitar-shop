import {State} from '../../types/state';
import {Product} from '../../types/product';
import {StatusType} from '../../common/enums';
import {createSelector} from 'reselect';

const getProduct = (state: State): Product | null => state.product.product;
const getProductStatus = (state: State): StatusType => state.product.status;

const isProductIdle = createSelector(
  getProductStatus,
  (status: StatusType): boolean => status === StatusType.Idle,
);

const isProductLoading = createSelector(
  getProductStatus,
  (status: StatusType): boolean => status === StatusType.Loading,
);

const isProductFailure = createSelector(
  getProductStatus,
  (status: StatusType): boolean => status === StatusType.Failure,
);

const isProductNotFound = createSelector(
  getProductStatus,
  (status: StatusType): boolean => status === StatusType.NotFound,
);

export {getProduct, isProductIdle, isProductLoading, isProductFailure, isProductNotFound};
