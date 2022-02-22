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
      productsAdapter.addOne(state.products, action.payload.product);
    });
});

export {productsAdapter, cartReducer};
