import {useSelector} from 'react-redux';
import {getDiscountCoast, getProductsCoastInCart} from '../../../../store/cart/cart-selectors';
import CartCoupon from '../cart-coupon/cart-coupon';
import {addClassModifier} from '../../../../utils/utils';
import {APP_LOCALE} from '../../../../common/constants';

function CartFooter(): JSX.Element {
  const coast = useSelector(getProductsCoastInCart);
  const discountCoast = useSelector(getDiscountCoast);

  return (
    <div className="cart__footer">
      <CartCoupon />
      <div className="cart__total-info">
        <p className="cart__total-item">
          <span className="cart__total-value-name">Всего:</span>
          <span className="cart__total-value">
            {`${(coast).toLocaleString(APP_LOCALE)} ₽`}
          </span>
        </p>
        <p className="cart__total-item">
          <span className="cart__total-value-name">Скидка:</span>
          <span className={addClassModifier(Boolean(discountCoast), 'cart__total-value', 'bonus')}>
            {`${discountCoast ? '- ' : ''}${(discountCoast).toLocaleString(APP_LOCALE)} ₽`}
          </span>
        </p>
        <p className="cart__total-item">
          <span className="cart__total-value-name">К оплате:</span>
          <span className="cart__total-value cart__total-value--payment">
            {`${(coast - discountCoast).toLocaleString(APP_LOCALE)} ₽`}
          </span>
        </p>
        <button className="button button--red button--big cart__order-button">Оформить заказ</button>
      </div>
    </div>
  );
}

export default CartFooter;
