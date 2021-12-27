import {combineReducers} from '@reduxjs/toolkit';
import {productsReducer} from './products/products-reducer';
import {searchReducer} from './search/search-reducer';
import {Namespace} from '../constants';

const rootReducer = combineReducers({
  [Namespace.Products]: productsReducer,
  [Namespace.Search]: searchReducer,
});

export {rootReducer};
