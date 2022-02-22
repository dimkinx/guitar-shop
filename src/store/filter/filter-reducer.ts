import {createReducer} from '@reduxjs/toolkit';
import {setPriceRangeMin, setPriceRangeMax, setPriceRangeStatus} from './filter-actions';
import {FilterState} from '../../types/state';
import {StatusType} from '../../common/enums';

const filterInitialState: FilterState = {
  priceRange: {
    min: 0,
    max: Infinity,
  },
  status: StatusType.Idle,
};

const filterReducer = createReducer(filterInitialState, (builder) => {
  builder
    .addCase(setPriceRangeMin, (state, action) => {
      state.priceRange.min = action.payload.priceRangeMin;
    })
    .addCase(setPriceRangeMax, (state, action) => {
      state.priceRange.max = action.payload.priceRangeMax;
    })
    .addCase(setPriceRangeStatus, (state, action) => {
      state.status = action.payload.status;
    });
});

export {filterInitialState, filterReducer};
