import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {createMockProduct} from '../../mocks/products';
import ProductScreen from './product-screen';
import {Namespace} from '../../constants';
import {StatusType} from '../../enums';
import 'intersection-observer';

const mockProduct = createMockProduct();
const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  [Namespace.Product]: {
    product: mockProduct,
    status: StatusType.Success,
  },
  [Namespace.Reviews]: {
    reviews: [],
    totalCount: 0,
    status: StatusType.Idle,
    postStatus: StatusType.Idle,
  },
  [Namespace.Search]: {
    foundProducts: [],
    status: StatusType.Idle,
  },
});

describe('Component: ProductScreen', () => {
  store.dispatch = jest.fn();

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductScreen />
        </Router>
      </Provider>);

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(new RegExp(mockProduct.name,'i'));
  });
});
