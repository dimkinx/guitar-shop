import {createReducer} from '@reduxjs/toolkit';
import {setFoundProducts, setFoundProductsStatus} from './search-actions';
import {SearchState} from '../../types/state';
import {StatusType} from '../../common/enums';

const searchInitialState: SearchState = {
  foundProducts: [],
  status: StatusType.Idle,
};

const searchReducer = createReducer(searchInitialState, (builder) => {
  builder
    .addCase(setFoundProducts, (state, action) => {
      state.foundProducts = action.payload.foundProducts;
    })
    .addCase(setFoundProductsStatus, (state, action) => {
      state.status = action.payload.status;
    });
});

export {searchInitialState, searchReducer};
