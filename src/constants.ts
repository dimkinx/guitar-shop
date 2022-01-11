const APP_LOCALE = 'ru-RU';
const MAX_STARS_COUNT = 5;
const NUM_PRODUCTS_PER_PAGE = 9;
const BACKEND_BASE_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
const RESPONSE_HEADER_X_TOTAL_COUNT = 'x-total-count';
const REQUEST_TIMEOUT = 5000;
const DEBOUNCE_DELAY = 500;

const APIRoute = {
  Products: '/guitars',
} as const;

const AppRoute = {
  MainScreen: '/',
  CatalogScreen: '/catalog',
  CatalogScreenWithPageId: '/catalog/page_:pageId',
  CatalogPagination: '/catalog/page',
} as const;

const SearchParamKey = {
  Name: 'name',
  Price: 'price',
  Type: 'type',
  StringCount: 'stringCount',
} as const;

const SearchParamPostfix = {
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
  Sort: 'sort',
  Filter: 'filter',
} as const;

const ToastParam = {
  Theme: 'colored',
  Position: 'top-right',
} as const;

const ErrorMessage = {
  FailedToLoadProducts: 'Не удалось загрузить запрашиваемые товары',
  FailedToLoadSearchRequest: 'Не удалось загрузить поисковый запрос',
  FailedToLoadPriceRangeRequest: 'Не удалось загрузить диапазон цен для фильтра',
} as const;

const KeyAttributeValue = {
  ArrowDown: 'ArrowDown',
  ArrowUp: 'ArrowUp',
  Enter: 'Enter',
} as const;

export {
  APP_LOCALE,
  MAX_STARS_COUNT,
  NUM_PRODUCTS_PER_PAGE,
  BACKEND_BASE_URL,
  RESPONSE_HEADER_X_TOTAL_COUNT,
  REQUEST_TIMEOUT,
  DEBOUNCE_DELAY,
  APIRoute,
  AppRoute,
  SearchParamKey,
  SearchParamPostfix,
  Namespace,
  ToastParam,
  ErrorMessage,
  KeyAttributeValue
};
