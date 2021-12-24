import {combineReducers} from '@reduxjs/toolkit';
import {productsReducer} from './products/products-reducer';
import {Namespace} from '../constants';

const rootReducer = combineReducers({
  [Namespace.Products]: productsReducer,
  // search: searchReducer,
});

export {rootReducer};
