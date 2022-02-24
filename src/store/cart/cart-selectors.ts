import {createSelector} from 'reselect';
import {productsAdapter} from './cart-reducer';
import {State} from '../../types/state';
import {Product} from '../../types/product';

const {
  selectById: selectProductById,
  selectAll: selectAllProducts,
} = productsAdapter.getSelectors((state: State) => state.cart.products);

const getProductFromCart = (id: number) => (state: State): Product | undefined => selectProductById(state, id);
const getProductsFromCart = (state: State): Product[] => selectAllProducts(state);

const isProductInCart = (id: number) => createSelector(
  getProductFromCart(id),
  (product: Product | undefined): boolean => Boolean(product),
);

const getProductsCountInCart = createSelector(
  getProductsFromCart,
  (products: Product[]): number => products.reduce((sum, {count}) => sum + Number(count), 0),
);

export {isProductInCart, getProductsCountInCart};
