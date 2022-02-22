import {createAction} from '@reduxjs/toolkit';
import {ActionType, StatusType} from '../../common/enums';

const setPriceRangeMin = createAction(
  ActionType.SetPriceRangeMin,
  (priceRangeMin: number) => ({
    payload: {
      priceRangeMin,
    },
  }),
);

const setPriceRangeMax = createAction(
  ActionType.SetPriceRangeMax,
  (priceRangeMax: number) => ({
    payload: {
      priceRangeMax,
    },
  }),
);

const setPriceRangeStatus = createAction(
  ActionType.SetPriceRangeStatus,
  (status: StatusType) => ({
    payload: {
      status,
    },
  }),
);

export {setPriceRangeMin, setPriceRangeMax, setPriceRangeStatus};
