import {createAction} from '@reduxjs/toolkit';
import {ActionType, OrderType, SortType} from '../../common/enums';

const setSortType = createAction(
  ActionType.SetSortType,
  (sortType: SortType) => ({
    payload: {
      sortType,
    },
  }),
);

const setOrderType = createAction(
  ActionType.SetOrderType,
  (orderType: OrderType) => ({
    payload: {
      orderType,
    },
  }),
);

export {setSortType, setOrderType};
