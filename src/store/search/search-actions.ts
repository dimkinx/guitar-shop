import {createAction} from '@reduxjs/toolkit';
import {ActionType, StatusType} from '../../enums';
import {Product} from '../../types/product';

const setFoundProducts = createAction(
  ActionType.SetFoundProducts,
  (foundProducts: Product[]) => ({
    payload: {
      foundProducts,
    },
  }),
);

const setFoundProductsStatus = createAction(
  ActionType.SetFoundProductsStatus,
  (status: StatusType) => ({
    payload: {
      status,
    },
  }),
);

export {setFoundProducts, setFoundProductsStatus};
