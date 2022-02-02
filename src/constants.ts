const APP_LOCALE = 'ru-RU';
const MAX_STARS_COUNT = 5;
const PRODUCTS_COUNT_PER_PAGE = 9;
const REVIEWS_COUNT_PER_STEP = 3;
const BACKEND_BASE_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
const RESPONSE_HEADER_X_TOTAL_COUNT = 'x-total-count';
const REQUEST_TIMEOUT = 5000;
const DEBOUNCE_DELAY = 500;

const APIRoute = {
  GetProducts: () => '/guitars',
  GetProduct: (id: number) => `/guitars/${id}`,
  GetReviews: (id: number) => `/guitars/${id}/comments`,
  PostReview: () => '/comments',
} as const;

const AppRoute = {
  MainScreen: '/',
  CatalogScreen: '/catalog',
  CatalogScreenWithPageId: '/catalog/page_:pageId',
  CatalogScreenPrefix: '/catalog/page',
  ProductScreenWithProductId: '/products/:productId',
  ProductScreenPrefix: '/products/',
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
  Product: 'product',
  Reviews: 'reviews',
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
  FailedToLoadProduct: 'Не удалось загрузить запрашиваемый товар',
  FailedToLoadReviews: 'Не удалось загрузить отзывы',
  FailedToPostReview: 'Не удалось отправить отзыв',
  FailedToPostInvalidReview: 'Форма заполнена неверно!',
  FailedToLoadProducts: 'Не удалось загрузить запрашиваемые товары',
  FailedToLoadSearchRequest: 'Не удалось загрузить поисковый запрос',
  FailedToLoadPriceRangeRequest: 'Не удалось загрузить диапазон цен для фильтра',
} as const;

const KeyAttributeValue = {
  ArrowDown: 'ArrowDown',
  ArrowUp: 'ArrowUp',
  Enter: 'Enter',
  Escape: 'Escape',
} as const;

const LoaderParam = {
  Color: '#000',
  Size: {
    Width: 100,
    Height: 100,
  },
} as const;

const GuitarTypeTranslation = {
  Acoustic: 'Акустические гитара',
  Electric: 'Электрогитара',
  Ukulele: 'Укулеле',
} as const;

export {
  APP_LOCALE,
  MAX_STARS_COUNT,
  PRODUCTS_COUNT_PER_PAGE,
  REVIEWS_COUNT_PER_STEP,
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
  KeyAttributeValue,
  LoaderParam,
  GuitarTypeTranslation
};
