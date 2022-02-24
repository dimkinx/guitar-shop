import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../../common/enums';
import {Product} from '../../types/product';

const createProductInCart = createAction(
  ActionType.CreateProductInCart,
  (product: Product) => ({
    payload: {
      product,
    },
  }),
);

const updateProductInCart = createAction(
  ActionType.UpdateProductInCart,
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

export {createProductInCart, updateProductInCart, deleteProductInCart};
