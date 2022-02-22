import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../../common/enums';
import {Product} from '../../types/product';

const addProductToCart = createAction(
  ActionType.AddProductToCart,
  (product: Product) => ({
    payload: {
      product,
    },
  }),
);

export {addProductToCart};
