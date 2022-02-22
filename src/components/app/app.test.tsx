import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import App from './app';
import {createMockProduct, createMockProducts} from '../../mocks/products';
import {createMockReviews} from '../../mocks/reviews';
import 'intersection-observer';
import {AppRoute, Namespace} from '../../common/constants';
import {StatusType} from '../../common/enums';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockProducts = createMockProducts();
const mockProduct = createMockProduct();
const mockReviews = createMockReviews();

const store = mockStore({
  [Namespace.Product]: {
    product: mockProduct,
    status: StatusType.Success,
  },
  [Namespace.Reviews]: {
    reviews: mockReviews,
    totalCount: mockReviews.length,
    status: StatusType.Success,
    postStatus: StatusType.Success,
  },
  [Namespace.Products]: {
    products: mockProducts,
    totalCount: mockProducts.length,
    status: StatusType.Success,
  },
  [Namespace.Search]: {
    foundProducts: [],
    status: StatusType.Idle,
  },
  [Namespace.Sort]: {
    sortType: null,
    orderType: null,
  },
  [Namespace.Filter]: {
    priceRange: {
      min: 0,
      max: Infinity,
    },
    status: StatusType.Idle,
  },
});

const FakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  store.dispatch = jest.fn();

  it('should redirect to "CatalogScreen" when user navigate to "/"', () => {
    history.push(AppRoute.MainScreen);
    render(FakeApp);

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(/Каталог гитар/i);
  });

  it('should render "CatalogScreen" when user navigate to "/catalog"', () => {
    history.push(AppRoute.CatalogScreen);
    render(FakeApp);

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(/Каталог гитар/i);
  });

  it('should render "ProductScreen" when user navigate to "/products/:productId"', () => {
    history.push(AppRoute.ProductScreenPrefix.concat(mockProduct.id.toString()));
    render(FakeApp);

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(new RegExp(mockProduct.name,'i'));
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(FakeApp);

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(/404/i);
  });
});
