import {createSelector} from 'reselect';
import {productsAdapter} from './cart-reducer';
import {State} from '../../types/state';
import {ProductInCart} from '../../types/product';

const {
  selectById: selectProductById,
  selectAll: selectAllProducts,
} = productsAdapter.getSelectors((state: State) => state.cart.products);

const getProductInCart = (id: number) => (state: State): ProductInCart | undefined => selectProductById(state, id);
const getProductsInCart = (state: State): ProductInCart[] => selectAllProducts(state);

const isProductInCart = (id: number) => createSelector(
  getProductInCart(id),
  (product: ProductInCart | undefined): boolean => Boolean(product),
);

const getProductsCountInCart = createSelector(
  getProductsInCart,
  (products: ProductInCart[]): number => products.reduce((sum, {count}) => sum + Number(count), 0),
);

export {getProductInCart, getProductsInCart, isProductInCart, getProductsCountInCart};
