import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import CartScreen from './cart-screen';
import {CouponValidityType, StatusType} from '../../common/enums';
import {Namespace} from '../../common/constants';
import {productsAdapter} from '../../store/cart/cart-reducer';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  [Namespace.Search]: {
    foundProducts: [],
    status: StatusType.Idle,
  },
  [Namespace.Cart]: {
    products: productsAdapter.getInitialState(),
    couponPostStatus: StatusType.Idle,
    couponValidityStatus: CouponValidityType.Unknown,
    coupon: '',
    discount: 0,
  },
});

describe('Component: CartScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CartScreen />
        </Router>
      </Provider>);

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(/Корзина/i);
    expect(screen.getByRole('heading', {level: 3})).toHaveTextContent(/В корзине пока нет товаров/i);
  });
});
