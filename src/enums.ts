const enum StatusType {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failure = 'failure',
}

const enum ActionType {
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
}

const enum SortType {
  Price = 'price',
  Rating = 'rating',
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

export {StatusType, ActionType, SortType, OrderType, GuitarType, StringCountType};
