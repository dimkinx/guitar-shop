const enum StatusType {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failure = 'failure',
}

const enum ActionType {
  SetProducts = 'products/setProducts',
  SetProductsStatus = 'products/setProductsStatus',
  SetFoundProducts = 'search/setFoundProducts',
  SetFoundProductsStatus = 'search/setFoundProductsStatus',
  SetSortType = 'sort/setSortType',
  SetOrderType = 'sort/setOrderType',
  SetPriceRangeMin = 'filter/setPriceRangeMin',
  SetPriceRangeMax = 'filter/setPriceRangeMax',
  SetPriceRangeStatus = 'filter/setPriceRangeStatus',
}

const enum SortType {
  Price = 'price',
  Rating = 'rating',
}

const enum OrderType {
  Ascending = 'asc',
  Descending = 'desc',
}

export {StatusType, ActionType, SortType, OrderType};
