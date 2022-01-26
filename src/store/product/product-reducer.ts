import {createReducer} from '@reduxjs/toolkit';
import {setProduct, setProductStatus} from './product-actions';
import {StatusType} from '../../enums';
import {ProductState} from '../../types/state';

const productInitialState: ProductState = {
  product: null,
  status: StatusType.Idle,
};

const productReducer = createReducer(productInitialState, (builder) => {
  builder
    .addCase(setProduct, (state, action) => {
      state.product = action.payload.product;
    })
    .addCase(setProductStatus, (state, action) => {
      state.status = action.payload.status;
    });
});

export {productInitialState, productReducer};
