import {State} from '../../types/state';
import {Product} from '../../types/product';
import {StatusType} from '../../enums';

const getFoundProducts = (state: State): Product[] => state.search.foundProducts;
const isFoundProductsLoading = (state: State): boolean => state.search.status === StatusType.Loading;
const isFoundProductsSuccess = (state: State): boolean => state.search.status === StatusType.Success;

export {getFoundProducts, isFoundProductsLoading, isFoundProductsSuccess};
