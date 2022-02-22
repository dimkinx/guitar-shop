import {createAction} from '@reduxjs/toolkit';
import {ActionType, StatusType} from '../../common/enums';
import {Product} from '../../types/product';

const setProducts = createAction(
  ActionType.SetProducts,
  (products: Product[]) => ({
    payload: {
      products,
    },
  }),
);

const setProductsTotalCount = createAction(
  ActionType.SetProductsTotalCount,
  (totalCount: number) => ({
    payload: {
      totalCount,
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

export {setProducts, setProductsTotalCount, setProductsStatus};
