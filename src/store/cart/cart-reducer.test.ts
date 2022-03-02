import {cartInitialState, cartReducer, productsAdapter} from './cart-reducer';
import {createMockProduct} from '../../mocks/products';
import {CouponValidityType, StatusType} from '../../common/enums';
import {
  createProductInCart,
  deleteProductInCart,
  setCoupon,
  setCouponPostStatus,
  setCouponValidityStatus,
  setDiscount,
  updateProductCountInCart
} from './cart-actions';
import {datatype, lorem} from 'faker';

const mockActionType = 'UNKNOWN_ACTION';
const mockProduct = {...createMockProduct(), count: 1};
const mockFetchStatus = StatusType.Success;
const mockValidStatus = CouponValidityType.Valid;
const mockCoupon = lorem.word();
const mockDiscount = datatype.number(100);

describe('Reducer: cart', () => {
  it('without additional parameters should return initial state', () => {
    expect(cartReducer(void 0, {type: mockActionType}))
      .toEqual(cartInitialState);
  });

  it('should create product in cart', () => {
    expect(cartReducer(cartInitialState, createProductInCart(mockProduct)))
      .toEqual({
        ...cartInitialState,
        products: {
          ids: [mockProduct.id],
          entities: {
            [mockProduct.id]: mockProduct,
          },
        },
      });
  });

  it('should update product count in cart', () => {
    const mockCount = datatype.number({max: 99});
    const state = {
      ...cartInitialState,
      products: productsAdapter.addOne(cartInitialState.products, {...mockProduct, count: mockCount}),
    };

    expect(cartReducer(state, updateProductCountInCart(mockProduct.id, mockCount)))
      .toEqual({
        ...cartInitialState,
        products: {
          ids: [mockProduct.id],
          entities: {
            [mockProduct.id]: {
              ...mockProduct,
              count: mockCount,
            },
          },
        },
      });
  });

  it('should delete product in cart', () => {
    const state = {
      ...cartInitialState,
      products: productsAdapter.addOne(cartInitialState.products, mockProduct),
    };

    expect(cartReducer(state, deleteProductInCart(mockProduct.id)))
      .toEqual(cartInitialState);
  });

  it('should set coupon post status in cart', () => {
    expect(cartReducer(cartInitialState, setCouponPostStatus(mockFetchStatus)))
      .toEqual({
        ...cartInitialState,
        couponPostStatus: mockFetchStatus,
      });
  });

  it('should set coupon validity status in cart', () => {
    expect(cartReducer(cartInitialState, setCouponValidityStatus(mockValidStatus)))
      .toEqual({
        ...cartInitialState,
        couponValidityStatus: mockValidStatus,
      });
  });

  it('should set coupon value in cart', () => {
    expect(cartReducer(cartInitialState, setCoupon(mockCoupon)))
      .toEqual({
        ...cartInitialState,
        coupon: mockCoupon,
      });
  });

  it('should set discount value in cart', () => {
    expect(cartReducer(cartInitialState, setDiscount(mockDiscount)))
      .toEqual({
        ...cartInitialState,
        discount: mockDiscount,
      });
  });
});
