import {createEntityAdapter, createReducer, EntityAdapter} from '@reduxjs/toolkit';
import {createProductInCart, updateProductInCart, deleteProductInCart} from './cart-actions';
import {CartState} from '../../types/state';
import {ProductInCart} from '../../types/product';

const productsAdapter: EntityAdapter<ProductInCart> = createEntityAdapter();

const cartInitialState: CartState = {
  products: productsAdapter.getInitialState(),
};

const cartReducer = createReducer(cartInitialState, (builder) => {
  builder
    .addCase(createProductInCart, (state, action) => {
      productsAdapter.addOne(state.products, Object.assign({}, action.payload.product, {count: 1}));
    })
    .addCase(updateProductInCart, (state, action) => {
      productsAdapter.updateOne(state.products, {
        id: action.payload.productId,
        changes: {count: action.payload.count},
      });
    })
    .addCase(deleteProductInCart, (state, action) => {
      productsAdapter.removeOne(state.products, action.payload.productId);
    });
});

export {productsAdapter, cartReducer};
