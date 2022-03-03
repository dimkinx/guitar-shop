import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import CartCoupon from './cart-coupon';
import {Namespace} from '../../../../common/constants';
import {CouponValidityType, StatusType} from '../../../../common/enums';
import {productsAdapter} from '../../../../store/cart/cart-reducer';

const mockStore = configureMockStore();

const store = mockStore({
  [Namespace.Cart]: {
    products: productsAdapter.getInitialState(),
    couponPostStatus: StatusType.Idle,
    couponValidityStatus: CouponValidityType.Unknown,
    coupon: '',
    discount: 0,
  },
});

describe('Component: CartCoupon', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <CartCoupon />
      </Provider>);

    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(/Промокод на скидку/i);
  });
});
