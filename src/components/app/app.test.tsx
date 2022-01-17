import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import App from './app';
import {AppRoute, Namespace} from '../../constants';
import {StatusType} from '../../enums';
import {createMockProducts} from '../../mocks/products';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockProducts = createMockProducts();

const store = mockStore({
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

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(FakeApp);

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(/404/i);
  });
});
