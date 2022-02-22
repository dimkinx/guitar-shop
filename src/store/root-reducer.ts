import {combineReducers} from '@reduxjs/toolkit';
import {productReducer} from './product/product-reducer';
import {reviewsReducer} from './reviews/reviews-reducer';
import {productsReducer} from './products/products-reducer';
import {searchReducer} from './search/search-reducer';
import {sortReducer} from './sort/sort-reducer';
import {cartReducer} from './cart/cart-reducer';
import {filterReducer} from './filter/filter-reducer';
import {Namespace} from '../common/constants';

const rootReducer = combineReducers({
  [Namespace.Product]: productReducer,
  [Namespace.Reviews]: reviewsReducer,
  [Namespace.Products]: productsReducer,
  [Namespace.Search]: searchReducer,
  [Namespace.Sort]: sortReducer,
  [Namespace.Filter]: filterReducer,
  [Namespace.Cart]: cartReducer,
});

export {rootReducer};
