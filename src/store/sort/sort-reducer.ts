import {createReducer} from '@reduxjs/toolkit';
import {setSortType, setOrderType} from './sort-actions';
import {SortState} from '../../types/state';

const sortInitialState: SortState = {
  sortType: null,
  orderType: null,
};

const sortReducer = createReducer(sortInitialState, (builder) => {
  builder
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload.sortType;
    })
    .addCase(setOrderType, (state, action) => {
      state.orderType = action.payload.orderType;
    });
});

export {sortReducer};
