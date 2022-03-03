import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import CardList from './card-list';
import {createMockProducts} from '../../../../mocks/products';
import {Namespace} from '../../../../common/constants';
import {StatusType} from '../../../../common/enums';
import {productsAdapter} from '../../../../store/cart/cart-reducer';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockProducts = createMockProducts();

const store = mockStore({
  [Namespace.Products]: {
    products: mockProducts,
    totalCount: mockProducts.length,
    status: StatusType.Success,
  },
  [Namespace.Cart]: {
    products: productsAdapter.getInitialState(),
  },
});

describe('Component: CardList', () => {
  it('should render correctly', () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CardList />
        </Router>
      </Provider>);

    expect(screen.getAllByText(/Цена/i)).toHaveLength(mockProducts.length);
  });
});
