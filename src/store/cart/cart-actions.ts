import {createAction} from '@reduxjs/toolkit';
import {ActionType, CouponValidityType, StatusType} from '../../common/enums';
import {Product} from '../../types/product';
import {Coupon, Discount} from '../../types/coupon';

const createProductInCart = createAction(
  ActionType.CreateProductInCart,
  (product: Product) => ({
    payload: {
      product,
    },
  }),
);

const updateProductCountInCart = createAction(
  ActionType.UpdateProductCountInCart,
  (productId: number, count: number) => ({
    payload: {
      productId,
      count,
    },
  }),
);

const deleteProductInCart = createAction(
  ActionType.DeleteProductInCart,
  (productId: number) => ({
    payload: {
      productId,
    },
  }),
);

const setCouponPostStatus = createAction(
  ActionType.SetCouponPostStatus,
  (postStatus: StatusType) => ({
    payload: {
      postStatus,
    },
  }),
);

const setCouponValidityStatus = createAction(
  ActionType.SetCouponValidityStatus,
  (validityStatus: CouponValidityType) => ({
    payload: {
      validityStatus,
    },
  }),
);

const setCoupon = createAction(
  ActionType.SetCoupon,
  (coupon: Coupon) => ({
    payload: {
      coupon,
    },
  }),
);

const setDiscount = createAction(
  ActionType.SetDiscount,
  (discount: Discount) => ({
    payload: {
      discount,
    },
  }),
);

export {
  createProductInCart,
  updateProductCountInCart,
  deleteProductInCart,
  setCouponPostStatus,
  setCouponValidityStatus,
  setCoupon,
  setDiscount
};
