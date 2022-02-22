import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import Reviews from './reviews';
import {createMockProduct} from '../../../../mocks/products';
import {StatusType} from '../../../../common/enums';
import {Namespace} from '../../../../common/constants';
import 'intersection-observer';

const mockProduct = createMockProduct();
const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  [Namespace.Reviews]: {
    reviews: [],
    totalCount: 0,
    status: StatusType.Idle,
    postStatus: StatusType.Idle,
  },
});

describe('Component: Reviews', () => {
  store.dispatch = jest.fn();

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Reviews
            productId={mockProduct.id}
            productName={mockProduct.name}
          />
        </Router>
      </Provider>);

    expect(screen.getByRole('heading', {level: 3})).toHaveTextContent(/Отзывы/i);
  });
});
