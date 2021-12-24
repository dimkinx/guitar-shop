import {createReducer} from '@reduxjs/toolkit';
import {setProducts, setProductsStatus} from './products-actions';
import {StatusType} from '../../enums';
import {ProductsState} from '../../types/state';

const productsInitialState: ProductsState = {
  products: [],
  status: StatusType.Idle,
};

const productsReducer = createReducer(productsInitialState, (builder) => {
  builder
    .addCase(setProducts, (state, action) => {
      state.products = action.payload.products;
    })
    .addCase(setProductsStatus, (state, action) => {
      state.status = action.payload.status;
    });
});

export {productsReducer};
