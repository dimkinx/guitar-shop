import {createSelector} from 'reselect';
import {productsAdapter} from './cart-reducer';
import {State} from '../../types/state';
import {ProductInCart} from '../../types/product';
import {Coupon, Discount} from '../../types/coupon';
import {CouponValidityType, StatusType} from '../../common/enums';

const {
  selectById: selectProductById,
  selectAll: selectAllProducts,
} = productsAdapter.getSelectors((state: State) => state.cart.products);

const getProductInCart = (id: number) => (state: State): ProductInCart | undefined => selectProductById(state, id);
const getProductsInCart = (state: State): ProductInCart[] => selectAllProducts(state);
const getCouponPostStatus = (state: State): StatusType => state.cart.couponPostStatus;
const getCouponValidityStatus = (state: State): CouponValidityType => state.cart.couponValidityStatus;
const getCoupon = (state: State): Coupon => state.cart.coupon;
const getDiscount = (state: State): Discount => state.cart.discount;

const isProductInCart = (id: number) => createSelector(
  getProductInCart(id),
  (product: ProductInCart | undefined): boolean => Boolean(product),
);

const getProductsCountInCart = createSelector(
  getProductsInCart,
  (products: ProductInCart[]): number => products.reduce((sum, {count}) => sum + Number(count), 0),
);

const getProductsCoastInCart = createSelector(
  getProductsInCart,
  (products: ProductInCart[]): number => products
    .reduce((coast, {price, count}): number => price * count + coast, 0),
);

const getDiscountCoast = createSelector(
  [getDiscount, getProductsCoastInCart],
  (discount, productsCoast): number => discount / 100 * productsCoast,
);

const isCouponLoading = createSelector(
  getCouponPostStatus,
  (status: StatusType): boolean => status === StatusType.Loading,
);

const isCouponValid = createSelector(
  getCouponValidityStatus,
  (status: CouponValidityType): boolean => status === CouponValidityType.Valid,
);

const isCouponInvalid = createSelector(
  getCouponValidityStatus,
  (status: CouponValidityType): boolean => status === CouponValidityType.Invalid,
);

export {
  getProductInCart,
  getProductsInCart,
  getCouponPostStatus,
  getCouponValidityStatus,
  getCoupon,
  getDiscount,
  isProductInCart,
  getProductsCountInCart,
  getProductsCoastInCart,
  getDiscountCoast,
  isCouponLoading,
  isCouponValid,
  isCouponInvalid
};
