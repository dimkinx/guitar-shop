import {State} from '../../types/state';
import {Product} from '../../types/product';
import {StatusType} from '../../enums';

const getFoundProducts = (state: State): Product[] => state.search.foundProducts;
const getFoundProductsStatus = (state: State): StatusType => state.search.status;

export {getFoundProducts, getFoundProductsStatus};
