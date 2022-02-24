import {createEntityAdapter, createReducer, EntityAdapter} from '@reduxjs/toolkit';
import {addProductToCart} from './cart-actions';
import {CartState} from '../../types/state';
import {Product} from '../../types/product';

const productsAdapter: EntityAdapter<Product> = createEntityAdapter();

const cartInitialState: CartState = {
  products: productsAdapter.getInitialState(),
};

const cartReducer = createReducer(cartInitialState, (builder) => {
  builder
    .addCase(addProductToCart, (state, action) => {
      const product: Product | undefined = productsAdapter
        .getSelectors()
        .selectById(state.products, action.payload.product.id);

      productsAdapter.addOne(state.products, action.payload.product);
      productsAdapter.updateOne(state.products, {
        id: action.payload.product.id,
        changes: {count: product?.count ? product.count + 1 : 1},
      });
    });
});

export {productsAdapter, cartReducer};
