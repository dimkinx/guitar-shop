import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import CartFooter from './cart-footer';
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

describe('Component: CartFooter', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <CartFooter />
      </Provider>);

    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });
});
