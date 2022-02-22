import {createAction} from '@reduxjs/toolkit';
import {ActionType, StatusType} from '../../common/enums';
import {Product} from '../../types/product';

const setProduct = createAction(
  ActionType.SetProduct,
  (product: Product) => ({
    payload: {
      product,
    },
  }),
);

const setProductStatus = createAction(
  ActionType.SetProductStatus,
  (status: StatusType) => ({
    payload: {
      status,
    },
  }),
);

export {setProduct, setProductStatus};
