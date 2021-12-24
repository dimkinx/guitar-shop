import {createAction} from '@reduxjs/toolkit';
import {ActionType, StatusType} from '../../enums';
import {Product} from '../../types/product';

const setProducts = createAction(
  ActionType.SetProducts,
  (products: Product[]) => ({
    payload: {
      products,
    },
  }),
);

const setProductsStatus = createAction(
  ActionType.SetProductsStatus,
  (status: StatusType) => ({
    payload: {
      status,
    },
  }),
);

export {setProducts, setProductsStatus};
