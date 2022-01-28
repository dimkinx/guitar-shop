import {combineReducers} from '@reduxjs/toolkit';
import {Namespace} from '../constants';
import {productReducer} from './product/product-reducer';
import {reviewsReducer} from './reviews/reviews-reducer';
import {productsReducer} from './products/products-reducer';
import {searchReducer} from './search/search-reducer';
import {sortReducer} from './sort/sort-reducer';
import {filterReducer} from './filter/filter-reducer';

const rootReducer = combineReducers({
  [Namespace.Product]: productReducer,
  [Namespace.Reviews]: reviewsReducer,
  [Namespace.GetProducts]: productsReducer,
  [Namespace.Search]: searchReducer,
  [Namespace.Sort]: sortReducer,
  [Namespace.Filter]: filterReducer,
});

export {rootReducer};
