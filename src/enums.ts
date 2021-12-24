const enum StatusType {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failure = 'failure',
}

const enum ActionType {
  SetProducts = 'products/setProducts',
  SetProductsStatus = 'products/setProductsStatus',
  SetAllProducts = 'search/setAllProducts',
  SetAllProductsStatus = 'search/setAllProductsStatus',
  ResetAllProducts = 'search/resetAllProducts',
}

export {StatusType, ActionType};
