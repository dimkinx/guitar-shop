import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import CatalogScreen from './catalog-screen';
import {Namespace} from '../../common/constants';
import {StatusType} from '../../common/enums';
import {productsAdapter} from '../../store/cart/cart-reducer';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  [Namespace.Products]: {
    products: [],
    totalCount: 0,
    status: StatusType.Idle,
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
  [Namespace.Cart]: {
    products: productsAdapter.getInitialState(),
  },
});

describe('Component: CatalogScreen', () => {
  store.dispatch = jest.fn();

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogScreen />
        </Router>
      </Provider>);

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(/Каталог гитар/i);
  });
});
