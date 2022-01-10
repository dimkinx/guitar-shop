import {combineReducers} from '@reduxjs/toolkit';
import {Namespace} from '../constants';
import {productsReducer} from './products/products-reducer';
import {searchReducer} from './search/search-reducer';
import {sortReducer} from './sort/sort-reducer';
import {filterReducer} from './filter/filter-reducer';

const rootReducer = combineReducers({
  [Namespace.Products]: productsReducer,
  [Namespace.Search]: searchReducer,
  [Namespace.Sort]: sortReducer,
  [Namespace.Filter]: filterReducer,
});

export {rootReducer};
