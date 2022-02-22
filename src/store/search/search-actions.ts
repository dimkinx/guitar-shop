import {createAction} from '@reduxjs/toolkit';
import {Product} from '../../types/product';
import {ActionType, StatusType} from '../../common/enums';

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
