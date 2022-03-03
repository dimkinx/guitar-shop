import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import CartItem from './cart-item';
import {createMockProduct} from '../../../../mocks/products';
import {Namespace} from '../../../../common/constants';
import {CouponValidityType, StatusType} from '../../../../common/enums';
import {productsAdapter} from '../../../../store/cart/cart-reducer';

const mockProduct = {...createMockProduct(), count: 1};
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

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <CartItem
          onCurrentProductSelect={jest.fn()}
          onModalCartDeleteOpenClick={jest.fn()}
          product={mockProduct}
        />
      </Provider>);

    expect(screen.getByText(new RegExp(mockProduct.name,'i'))).toBeInTheDocument();
  });
});
