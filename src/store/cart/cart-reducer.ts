import {createEntityAdapter, createReducer, EntityAdapter} from '@reduxjs/toolkit';
import {
  createProductInCart,
  updateProductCountInCart,
  deleteProductInCart,
  setCouponPostStatus,
  setCouponValidityStatus,
  setCoupon,
  setDiscount
} from './cart-actions';
import {CartState} from '../../types/state';
import {ProductInCart} from '../../types/product';
import {CouponValidityType, StatusType} from '../../common/enums';

const productsAdapter: EntityAdapter<ProductInCart> = createEntityAdapter();

const cartInitialState: CartState = {
  products: productsAdapter.getInitialState(),
  couponPostStatus: StatusType.Idle,
  couponValidityStatus: CouponValidityType.Unknown,
  coupon: '',
  discount: 0,
};

const cartReducer = createReducer(cartInitialState, (builder) => {
  builder
    .addCase(createProductInCart, (state, action) => {
      productsAdapter.addOne(state.products, Object.assign({}, action.payload.product, {count: 1}));
    })
    .addCase(updateProductCountInCart, (state, action) => {
      productsAdapter.updateOne(state.products, {
        id: action.payload.productId,
        changes: {count: action.payload.count},
      });
    })
    .addCase(deleteProductInCart, (state, action) => {
      productsAdapter.removeOne(state.products, action.payload.productId);
    })
    .addCase(setCouponPostStatus, (state, action) => {
      state.couponPostStatus = action.payload.postStatus;
    })
    .addCase(setCouponValidityStatus, (state, action) => {
      state.couponValidityStatus = action.payload.validityStatus;
    })
    .addCase(setCoupon, (state, action) => {
      state.coupon = action.payload.coupon;
    })
    .addCase(setDiscount, (state, action) => {
      state.discount = action.payload.discount;
    });
});

export {productsAdapter, cartInitialState, cartReducer};
