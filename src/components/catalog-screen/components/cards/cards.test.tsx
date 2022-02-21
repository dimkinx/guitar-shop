import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import Cards from './cards';
import {createMockProducts} from '../../../../mocks/products';
import {Namespace} from '../../../../constants';
import {StatusType} from '../../../../enums';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockProducts = createMockProducts();

const loadingStore = mockStore({
  [Namespace.Products]: {
    products: [],
    totalCount: 0,
    status: StatusType.Loading,
  },
  [Namespace.Sort]: {
    sortType: null,
    orderType: null,
  },
});

const successStore = mockStore({
  [Namespace.Products]: {
    products: mockProducts,
    totalCount: mockProducts.length,
    status: StatusType.Success,
  },
  [Namespace.Sort]: {
    sortType: null,
    orderType: null,
  },
});

const emptyStore = mockStore({
  [Namespace.Products]: {
    products: [],
    totalCount: 0,
    status: StatusType.Success,
  },
  [Namespace.Sort]: {
    sortType: null,
    orderType: null,
  },
});

describe('Component: CatalogCards', () => {
  it('should render correctly on load', () => {
    loadingStore.dispatch = jest.fn();

    render(
      <Provider store={loadingStore}>
        <Router history={history}>
          <Cards />
        </Router>
      </Provider>);

    expect(screen.getByTestId(/loading-cards/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/success-cards/i)).toBeNull();
  });

  it('should display correctly on successful upload and availability of products', () => {
    successStore.dispatch = jest.fn();

    render(
      <Provider store={successStore}>
        <Router history={history}>
          <Cards />
        </Router>
      </Provider>);

    expect(screen.getByTestId(/success-cards/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/loading-cards/i)).toBeNull();
  });

  it('should display correctly on successful upload and no products', () => {
    emptyStore.dispatch = jest.fn();

    render(
      <Provider store={emptyStore}>
        <Router history={history}>
          <Cards />
        </Router>
      </Provider>);

    expect(screen.getByRole('heading', {level: 3})).toHaveTextContent(/Запрашиваемые товары не найдены/i);
  });
});
