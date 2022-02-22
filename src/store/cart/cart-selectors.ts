import {createSelector} from 'reselect';
import {productsAdapter} from './cart-reducer';
import {State} from '../../types/state';
import {Product} from '../../types/product';

const {
  selectById: selectProductById,
} = productsAdapter.getSelectors((state: State) => state.cart.products);

const selectProduct = (id: number) => (state: State): Product | undefined => selectProductById(state, id);

const isProductAdded = (id: number) => createSelector(
  selectProduct(id),
  (product: Product | undefined): boolean => Boolean(product),
);

export {isProductAdded};
