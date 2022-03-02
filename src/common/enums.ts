const enum StatusType {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failure = 'failure',
  NotFound = 'notFound',
}

const enum ActionType {
  SetProduct = 'product/setProduct',
  SetProductStatus = 'product/setProductStatus',
  SetReview = 'reviews/setReview',
  SetReviewStatus = 'reviews/setReviewStatus',
  SetReviews = 'reviews/setReviews',
  SetFetchedReviews = 'reviews/setFetchedReviews',
  SetReviewsStatus = 'reviews/setReviewsStatus',
  SetReviewsTotalCount = 'reviews/setReviewsTotalCount',
  SetProducts = 'products/setProducts',
  SetProductsTotalCount = 'products/setProductsTotalCount',
  SetProductsStatus = 'products/setProductsStatus',
  SetFoundProducts = 'search/setFoundProducts',
  SetFoundProductsStatus = 'search/setFoundProductsStatus',
  SetSortType = 'sort/setSortType',
  SetOrderType = 'sort/setOrderType',
  SetPriceRangeMin = 'filter/setPriceRangeMin',
  SetPriceRangeMax = 'filter/setPriceRangeMax',
  SetPriceRangeStatus = 'filter/setPriceRangeStatus',
  CreateProductInCart = 'cart/createProductInCart',
  UpdateProductCountInCart = 'cart/updateProductCountInCart',
  DeleteProductInCart = 'cart/deleteProductInCart',
  SetCouponPostStatus = 'cart/setCouponPostStatus',
  SetCouponValidityStatus = 'cart/setCouponValidityStatus',
  SetCoupon = 'cart/setCoupon',
  SetDiscount = 'cart/setDiscount',
}

const enum SortType {
  Price = 'price',
  Rating = 'rating',
  Date = 'createAt',
}

const enum OrderType {
  Ascending = 'asc',
  Descending = 'desc',
}

const enum GuitarType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

const enum StringCountType {
  Four = '4',
  Six = '6',
  Seven = '7',
  Twelve = '12',
}

const enum EssenceType {
  Current = 'current',
  Available = 'available',
  StateMap = 'stateMap',
}

const enum CouponValidityType {
  Valid = 'valid',
  Invalid = 'invalid',
  Unknown = 'unknown',
}

export {StatusType, ActionType, SortType, OrderType, GuitarType, StringCountType, EssenceType, CouponValidityType};
