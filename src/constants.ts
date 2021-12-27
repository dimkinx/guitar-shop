const MAX_STARS_COUNT = 5;
const NUM_PRODUCTS_PER_PAGE = 9;
const BACKEND_BASE_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
const REQUEST_TIMEOUT = 5000;
const DEBOUNCE_DELAY = 500;

const APIRoute = {
  Products: '/guitars',
} as const;

const AppRoute = {
  MainScreen: '/',
  CatalogScreen: '/catalog',
} as const;

const QueryParam = {
  Sort: '_sort',
  Order: '_order',
  Start: '_start',
  End: '_end',
  Limit: '_limit',
  Gte: '_gte',
  Lte: '_lte',
  Like: '_like',
  Embed: '_embed',
} as const;

const Namespace = {
  Products: 'products',
  Comments: 'comments',
  Search: 'search',
} as const;

const ToastParam = {
  Theme: 'colored',
  Position: 'top-right',
} as const;

const ErrorMessage = {
  FailedToLoadProducts: 'Не удалось загрузить запрашиваемые товары',
  FailedToLoadSearchRequest: 'Не удалось загрузить поисковый запрос',
} as const;

const KeyAttributeValue = {
  ArrowDown: 'ArrowDown',
  ArrowUp: 'ArrowUp',
  Enter: 'Enter',
} as const;

export {
  MAX_STARS_COUNT,
  NUM_PRODUCTS_PER_PAGE,
  BACKEND_BASE_URL,
  REQUEST_TIMEOUT,
  DEBOUNCE_DELAY,
  APIRoute,
  AppRoute,
  QueryParam,
  Namespace,
  ToastParam,
  ErrorMessage,
  KeyAttributeValue
};
