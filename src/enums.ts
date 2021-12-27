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
}

export {StatusType, ActionType};
