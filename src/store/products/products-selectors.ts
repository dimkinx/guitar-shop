import {State} from '../../types/state';
import {Product} from '../../types/product';
import {StatusType} from '../../enums';

const getProducts = (state: State): Product[] => state.products.products;
const getProductsStatus = (state: State): StatusType => state.products.status;

export {getProducts, getProductsStatus};
